# Architecture

Dieser Guide beschreibt die wichtigsten Strukturentscheidungen des GA-Tools, damit du (oder ein neuer Maintainer) dich schnell zurechtfindest.

## Stack

- **Framework:** SvelteKit 2 mit Svelte 5 (Runes)
- **Sprache:** TypeScript (strict)
- **Datenbank:** SQLite via Drizzle ORM (lokal als `local.db`)
- **Auth:** Better-Auth (Cookie-Session)
- **Tests:** Vitest
- **PWA:** vite-plugin-pwa
- **i18n:** svelte-i18n
- **Markdown:** marked (Wissens-Artikel) — gerendert via `{@html}` aus Repo-Dateien (kein User-Content)

## High-Level-Architektur

```
                    ┌──────────────────────┐
   Browser  ◄───►   │  SvelteKit (Node)    │  ◄───► SQLite (local.db)
                    │  + Better-Auth        │
                    └──────────────────────┘
                              ▲
                              │ build-time imports
                              │
                    ┌──────────────────────┐
                    │  content/wissen/*.md │ (statische Quelle)
                    └──────────────────────┘
```

Alle Wissens-Artikel, Rechner-Logik, Referenztabellen, Checklisten und Abkürzungen sind **statisch im Repo** (TypeScript-Daten oder Markdown). Nichts wird aus einer CMS-API geladen. Vorteile: deterministische Builds, PWA-tauglich, Volltextsuche via Fuse.js client-seitig.

User-Daten (Auth, Favoriten, Profil, Analytics-Events) leben in der SQLite-DB.

## Modul-Aufbau (`src/lib/`)

| Ordner          | Zweck                                                                            |
| --------------- | -------------------------------------------------------------------------------- |
| `abkuerzungen/` | Abkürzungstabelle (~230 Einträge), Gruppen-Mapping, Sprach-Logik                 |
| `bus-ibn/`      | Bus-IBN-Modul: Types, Konstanten, Geräte-Library, pure Logik + Tests             |
| `checklisten/`  | IBN-/Übergabe-Checklisten als TS-Daten + Persistenz-Helper                       |
| `components/`   | Shared Svelte-Komponenten (FavButton, SearchModal, PwaStatus)                    |
| `converters/`   | Einheiten-Konverter (Druck, Temperatur, Durchfluss, …)                           |
| `i18n/`         | DE/EN-Übersetzungen — beide Sprachen parallel pflegen                            |
| `pid/`          | PID-Simulator-Engine (Svelte 5 Klasse mit Runes, `@ts-nocheck`)                  |
| `rechner/`      | Pure Rechner-Logik (heizkurve, druckverlust, kvWert, heizlast, \_shared) + Tests |
| `referenz/`     | Referenztabellen (DN, Filter, Glykol, Kältemittel …)                             |
| `search/`       | Globale Volltextsuche über alle Inhaltstypen (Fuse.js)                           |
| `server/`       | Server-only Code: Auth, DB-Schemas, Rate-Limit, Location-Parsing                 |
| `stores/`       | Client-Stores: theme, favorites, recent, locale                                  |
| `wissen/`       | Artikel-Parser (`articles.ts`) — lädt `content/wissen/*.md` zur Build-Zeit       |

## Route-Aufbau (`src/routes/`)

Gruppierung über SvelteKit `(group)` Route-Gruppen:

- `(public)/` — `/login` — kein Auth nötig
- `(app)/` — alle User-Routen, hinter `+layout.server.ts`-Guard (optional je nach Route)
- `(admin)/` — `/admin/**` — `role === 'admin'` Pflicht (siehe `(admin)/+layout.server.ts:5-7`)
- `api/` — `/api/favorites`, `/api/track` — auth-aware

Hooks:

- `src/hooks.server.ts` — Session-Resolution via Better-Auth, setzt `locals.user`/`locals.session`

## Daten-Modell für Inhalte

### Wissens-Artikel (`content/wissen/*.md`)

YAML-Frontmatter + Markdown-Body. Pflichtfelder:

```yaml
---
slug: pid-regler # eindeutig, URL-segment
title: PID-Regler # DE-Titel
title_en: PID controller # EN-Titel (optional, fällt sonst auf DE)
category: regelung
subcategory: grundlagen
tags: [hlk, ga]
difficulty: grundlagen # grundlagen | fortgeschritten | experte
area: [hlk, ga] # Liste
related: [regelkreise, ...] # andere wissen-slugs
rechner: [pid-simulator] # rechner-slugs (bidirektional)
norm: [SIA 386]
updated: 2026-05-21
lang: de # primaere Sprache
---
# Markdown body...
```

Parser: `src/lib/wissen/articles.ts` — imports via Vite `?raw`, parst YAML manuell, sortiert nach Titel.

### Rechner

Metadaten in `src/lib/rechner/index.ts` (RechnerMeta-Array). Pro Rechner:

- Route: `src/routes/(app)/rechner/<slug>/+page.svelte`
- Logik: **idealerweise** in `src/lib/rechner/<slug>.ts` (extrahierbare reine Funktionen)
- Tests: `src/lib/rechner/<slug>.test.ts`

**Pattern für neue Rechner:** Erst die Mathematik in ein TS-Modul extrahieren, dann Tests schreiben, dann erst die Svelte-UI bauen. Das verhindert „stille Mathe-Bugs".

Aktuell extrahiert + getestet: `_shared`, `heizkurve`, `druckverlust`, `kvWert`, `heizlast`.
Logik noch inline: ausdehnungsgefaess, co2-regelung, gewichteter-mittelwert, leitungslaenge, psychrometrie (importiert `_shared`), pumpenkennlinie, taupunkt, u-wert, ventilautoritaet, waermeleistung, waermerueckgewinnung, dip-switch.

### Abkürzungen, Referenz, Checklisten, Konverter

Alle als statische TS-Arrays im jeweiligen `data/`-Ordner oder direkt im Modul. Cross-Referenzen über `slug`-Felder.

## i18n-Konvention

Alle UI-Strings über `$_('foo.bar.baz')` aus `svelte-i18n`. DE/EN strikt parallel (1013 = 1013 Keys, durch Skript prüfbar — siehe Mega-Check-Notizen).

Bei neuen Strings: **erst in `de.ts`, sofort in `en.ts` ergänzen**. Das Tool [`tools/i18n-check.ts`] existiert nicht — kann bei Bedarf gebaut werden.

Inhaltliche Übersetzungen (Wissens-Artikel) erlauben Fallback DE → EN: `title_en` ist optional.

## Auth + Routing-Schutz

- `(app)/+layout.server.ts` — kein Hard-Gate; einzelne Seiten checken `locals.user`
- `(admin)/+layout.server.ts:5-7` — `error(401)` ohne Login, `error(403)` ohne Admin-Rolle
- `api/favorites/+server.ts` — `error(401)` ohne Login
- `api/track/+server.ts` — anonym erlaubt, aber Rate-Limited (120 req/min)

User-Rollen: `user` (Default) und `admin`. Manuell in DB setzen via `drizzle-kit studio`.

## State-Persistence

Client-State persistiert in `localStorage`:

- `ga-theme` — auto/light/dark/oled
- `ga-locale` — de/en
- `ga-favorites` — Liste von `{type, slug}`
- `ga-recent` — letzte 20 besuchte Items
- `ga-bus-ibn-project` + `ga-bus-ibn-prefs` — Bus-IBN-Projekt
- `ga-dip-switch-prefs` — DIP-Switch Preset

Eingeloggte User können Favoriten zusätzlich via `/api/favorites` zur DB sync'n (sieht aus wie ein Spielraum für Multi-Device-Sync, ist aber aktuell pull-on-load + write-on-change).

## Build- und Runtime-Konfiguration

Env-Vars (`.env.example`):

- `DATABASE_URL` — SQLite-Pfad
- `ORIGIN` — Origin-URL (CSRF in Better-Auth)
- `BETTER_AUTH_SECRET` — 32-Zeichen-Secret für Sessions
- `RESEND_API_KEY` — optional, aktiviert E-Mail-Verifikation
- `RESEND_FROM` — Absender-Adresse

Build via `npm run build` → Node-Adapter (`@sveltejs/adapter-node`). Output in `build/`.

CI: `.github/workflows/ci.yml` läuft lint + check + test + build bei jedem Push/PR auf main/master.

## Bekannte Schuldposten

- **bus-ibn page.svelte** noch ~3700 Zeilen UI (Logik extrahiert, Komponenten-Split steht aus).
- **PID-Simulator** (`src/lib/pid/simulation.svelte.js`) hat `@ts-nocheck` — bewusst, da interne Sim-Variablen non-reactive sind.
- **Analytics-Events** wachsen unlimitiert in der DB — Aggregations-Job wäre sinnvoll wenn Traffic steigt.
- **Rechner ohne extrahierte Logik** (siehe oben) sollten bei nächster Berührung in `lib/rechner/<slug>.ts` umziehen.

## Quick-Navigation

- Neue Wissens-Datei: `content/wissen/<slug>.md` + Frontmatter
- Neuer Rechner: Logik in `src/lib/rechner/<slug>.ts` + Tests, dann Route in `src/routes/(app)/rechner/<slug>/+page.svelte`, dann Eintrag in `src/lib/rechner/index.ts`
- Neue Abkürzung: Eintrag in `src/lib/abkuerzungen/data.ts`
- Neuer Konverter: Modul in `src/lib/converters/<slug>.ts`, Eintrag in `src/lib/converters/index.ts`
- Neue Checkliste: Datei in `src/lib/checklisten/data/<slug>.ts`, Import in `src/lib/checklisten/index.ts`
