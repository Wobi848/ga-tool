# Contributing

Dieser Guide ist für dich als zukünftigen Maintainer (oder einen Co-Maintainer) gedacht. Lies erst [ARCHITECTURE.md](ARCHITECTURE.md), dann das hier.

## Setup

```bash
git clone <repo>
cd ga-tool
npm install
cp .env.example .env       # BETTER_AUTH_SECRET ausfüllen (32+ Zeichen)
npm run db:push            # SQLite-Schema anlegen
npm run dev
```

App läuft auf `http://localhost:5173`.

## Skripte

| Befehl                  | Zweck                                    |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Dev-Server mit HMR                       |
| `npm run build`         | Produktions-Build (Node-Adapter)         |
| `npm run preview`       | Build lokal serven                       |
| `npm run check`         | svelte-check + TS-Check                  |
| `npm run lint`          | prettier --check && eslint               |
| `npm run format`        | prettier --write                         |
| `npm run test`          | Vitest einmal durchlaufen                |
| `npm run test:watch`    | Vitest im Watch-Modus                    |
| `npm run test:coverage` | mit Coverage-Report                      |
| `npm run db:push`       | Drizzle-Schema in DB pushen (dev)        |
| `npm run db:studio`     | Drizzle-Studio öffnen (Tabellen ansehen) |
| `npm run auth:schema`   | Better-Auth-Schemas regenerieren         |

## Workflow

1. **Branch erstellen** (oder direkt auf `master` wenn solo).
2. **Code ändern.**
3. **`npm run lint && npm run check && npm run test`** — muss grün sein vor Commit.
4. **Commit-Message** im Conventional-Commits-Stil (siehe unten).
5. **Push** — CI läuft (`.github/workflows/ci.yml`) und blockiert Merge bei Fehlern.

## Commit-Konventionen

Beobachtetes Muster in `git log`:

```
feat(scope): Was Neues
fix(scope): Bug-Fix
refactor(scope): Strukturänderung ohne Verhaltensänderung
chore(scope): Konfig, Tooling, Lint-Aufräumen
style: rein kosmetische Änderungen (Prettier)
test(scope): Tests hinzugefügt/geändert
security(scope): Härtung
ci: CI/CD-Änderungen
docs: Doku
a11y(scope): Accessibility
```

**Body**: erkläre **warum**, nicht **was** (das zeigt der Diff). Bei größeren Änderungen Auflistung der Teilschritte.

Beispiel:

```
fix(dashboard): Checklisten-Count dynamisch aus checklists.length

Zeigte hardcodiert '4' an, obwohl 10 Checklisten existieren. Andere
Module nutzen bereits .length — Checklisten war als einzige hardcodiert.
```

## Inhalte pflegen

### Wissens-Artikel hinzufügen

1. Datei `content/wissen/<slug>.md` mit Frontmatter (siehe [ARCHITECTURE.md](ARCHITECTURE.md#wissens-artikel)).
2. Beidsprachig: deutscher Body unter `---`-Frontmatter, optional englisches Pendant via `bodyEn`-Section oder `<slug>-en`-Pattern (siehe bestehende Artikel).
3. `related:`-Liste pflegen — alle referenzierten Slugs müssen existieren (CI prüft das aktuell noch nicht — manuell sicherstellen).
4. Wenn Artikel zu einem Rechner gehört: `rechner: [<rechner-slug>]` setzen. Die Rechner-Seite verlinkt automatisch zurück.

### Rechner hinzufügen

**Reihenfolge ist wichtig** — sie verhindert stille Mathe-Bugs:

1. **Logik extrahieren:** `src/lib/rechner/<slug>.ts` mit pure functions. Keine Svelte-Abhängigkeiten.
2. **Tests schreiben:** `src/lib/rechner/<slug>.test.ts` mit Referenzwerten aus Normen/Lehrbüchern. Mindestens: Grenzfälle (0, negative), Definitions-Identitäten, monotones Verhalten.
3. **i18n-Strings:** in `src/lib/i18n/de.ts` UND `src/lib/i18n/en.ts` ergänzen. Schlüssel-Pattern: `rechner.<slug>.name`, `rechner.<slug>Ui.<feldname>`.
4. **Route:** `src/routes/(app)/rechner/<slug>/+page.svelte` — importiert aus `$lib/rechner/<slug>`.
5. **Eintrag** in `src/lib/rechner/index.ts` (RechnerMeta-Array).

### Checkliste hinzufügen

1. Datei in `src/lib/checklisten/data/<slug>.ts` (siehe bestehende als Vorlage).
2. Import + Eintrag in `src/lib/checklisten/index.ts` (`checklists`-Array).

Dashboard-Counter und Suchindex aktualisieren sich automatisch über `checklists.length`.

### Abkürzung hinzufügen

Eintrag in `src/lib/abkuerzungen/data.ts`:

```ts
{
  short: 'PID',
  long: 'Proportional–Integral–Derivative',
  description: 'Standard-Reglertyp mit drei Anteilen…',
  descriptionEn: 'Standard controller type…',
  areas: ['hlk', 'ga'],
  related: ['PI', 'P']
}
```

Bei mehrsprachigen Begriffen (DE+EN-Variante): in `src/lib/abkuerzungen/groups.ts` als Konzept-Gruppe eintragen.

## Code-Konventionen

- **Svelte 5 Runes** (`$state`, `$derived`, `$effect`, `$props`) — nicht den alten `let`-Reaktivitäts-Stil.
- **Pure Funktionen** für Logik — Svelte-Code nur in `.svelte`-Dateien.
- **Keine Kommentare**, die beschreiben _was_ der Code tut. Kommentare nur für _warum_ (Workarounds, nicht-offensichtliche Constraints, Norm-Referenzen).
- **i18n strikt parallel** halten. Wenn ein Key in `de.ts` neu ist, muss er in `en.ts` direkt mit (ggf. identischem) Wert dazukommen.
- **Keine hardcoded Counts/Listen** im UI — immer `array.length` / iterieren.
- **Akzentfreie Commit-Messages** (Komitter-Mailclient hat Probleme mit Umlauten in manchen Setups; Bodies dürfen Umlaute haben).

## a11y

- Klickbare Elemente: `<button>` statt `<div onclick>`. Wenn unvermeidbar: `role="button" tabindex="0"` + `onkeydown` mit Enter/Space.
- Formular-Labels: entweder `<label for="id">` + `<input id="id">` ODER `<label>Text <input/></label>` (nested).
- Modal-Dialoge: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="<titel-id>"`, `tabindex="-1"`, Backdrop mit `role="presentation"`.
- Icon-only Buttons brauchen `aria-label`.

## Tests

- Frameworks: Vitest. JSDOM ist **nicht** konfiguriert — Tests sind aktuell rein für Logik-Module (`src/lib/**/*.test.ts`).
- Komponenten-Tests via `@testing-library/svelte` wären sinnvoll, sind aber noch nicht eingerichtet.
- **Mindeststandard für neue Logik:** Tests die _Verhalten_ beschreiben, nicht _Implementierung_. Nutze Referenzwerte aus Normen wo möglich (Recknagel, ASHRAE, SIA).

## Datenbank-Schema ändern

1. Migration in `src/lib/server/db/<schema>.ts` ergänzen.
2. `npm run db:generate` — generiert SQL-Migration in `drizzle/`.
3. `npm run db:push` — wendet auf lokale DB an.
4. Bei Auth-Schema-Änderungen: `npm run auth:schema` regeneriert Better-Auth-Tabellen.
5. **Produktiv**: backup vor `db:push`. SQLite hat keine eingebaute Migration-Versionierung — pflege das selbst.

## Sicherheits-Hygiene

- **Niemals `.env` committen** — `.gitignore` schließt `.env*` aus (außer `.env.example`).
- **`local.db` ist in `.gitignore`** — Auth-Daten bleiben lokal.
- **`{@html}`** nur für trusted Build-time-Inhalte (CHANGELOG.md, content/wissen/). Niemals für User-Input.
- **API-Endpoints**: jeder neue Endpoint muss entweder `locals.user` prüfen oder via `rateLimit()` aus `$lib/server/rateLimit` abgesichert sein.

## Versionierung

Aktuell ohne SemVer-Releases — `CHANGELOG.md` wird manuell gepflegt. Bei größeren Meilensteinen:

1. Eintrag in `CHANGELOG.md` mit Datum.
2. Optional Tag: `git tag vX.Y.Z && git push --tags`.

## Pre-Commit (manuell)

Es gibt keinen automatischen Pre-Commit-Hook. Disziplin:

```bash
npm run lint && npm run check && npm run test
```

Wenn etwas davon fehlschlägt: erst fixen, dann committen. CI fängt es sonst auf und blockiert.

## Wo um Hilfe fragen

- Domänen-/Inhaltsfragen (GA, Normen): du oder Fachkollegen.
- SvelteKit-Fragen: [SvelteKit-Docs](https://kit.svelte.dev/) — Svelte 5 Runes sind dort relativ neu, ggf. auch im Discord.
- Drizzle-Fragen: [Drizzle-Docs](https://orm.drizzle.team).
- Better-Auth: [Better-Auth-Docs](https://www.better-auth.com).
