# GA Tool — Projektstruktur

Ziel: Skalierbar, klar getrennt, kein Mega-File.
Jede Datei hat eine einzige Verantwortung.

---

## Übersicht

```text
ga-tool/
├── src/
│   ├── lib/                        # Shared code ($lib)
│   │   ├── components/             # UI-Komponenten
│   │   │   ├── ui/                 # Basis-Bausteine (atomar)
│   │   │   ├── layout/             # Seiten-Struktur
│   │   │   └── domain/             # Feature-spezifisch
│   │   ├── content/                # Artikel-Inhalte (Markdown)
│   │   │   ├── de/
│   │   │   └── en/
│   │   ├── data/                   # Statische Daten (TS-Objekte)
│   │   │   ├── abbreviations/
│   │   │   ├── checklists/
│   │   │   └── reference/
│   │   ├── converters/             # Konverter-Logik (pure functions)
│   │   ├── i18n/                   # Übersetzungen
│   │   ├── search/                 # Fuse.js Setup + Index
│   │   ├── stores/                 # Svelte Stores (theme, lang, user)
│   │   ├── utils/                  # Hilfsfunktionen
│   │   └── server/                 # NUR Server-Code (nie an Client)
│   │       ├── db/
│   │       └── auth.ts
│   ├── routes/                     # SvelteKit File-based Routing
│   │   ├── (app)/                  # Auth-geschützte Routen
│   │   ├── (public)/               # Öffentliche Routen
│   │   └── api/                    # API Endpoints
│   └── app.html                    # HTML-Shell
├── static/                         # Statische Assets
├── KONZEPT.md
├── STRUKTUR.md
├── CHANGELOG.md
├── package.json
├── svelte.config.js
├── vite.config.ts
└── tsconfig.json
```

---

## Detailstruktur

### `src/lib/components/`

Drei Ebenen — von generisch zu spezifisch:

```text
components/
├── ui/                         # Atomar, wiederverwendbar, kein Domain-Wissen
│   ├── Button.svelte
│   ├── Input.svelte
│   ├── Select.svelte
│   ├── Modal.svelte
│   ├── Card.svelte
│   ├── Badge.svelte
│   ├── Chip.svelte
│   ├── Toast.svelte
│   ├── Tooltip.svelte
│   ├── Spinner.svelte
│   └── index.ts                # Re-export aller UI-Komponenten
│
├── layout/                     # Seiten-Skelett
│   ├── Sidebar.svelte
│   ├── Header.svelte
│   ├── BottomNav.svelte        # Mobile
│   ├── PageHeader.svelte       # Titel + Breadcrumb pro Seite
│   └── ThemeProvider.svelte
│
└── domain/                     # Feature-Komponenten
    ├── converter/
    │   ├── ConverterInput.svelte
    │   └── ConverterResult.svelte
    ├── wissen/
    │   ├── ArticleCard.svelte
    │   ├── ArticleMeta.svelte  # Tags, Difficulty, Area
    │   └── RelatedArticles.svelte
    ├── checklists/
    │   ├── ChecklistTable.svelte
    │   └── CsvExportBtn.svelte
    ├── abbreviations/
    │   └── AbbreviationEntry.svelte
    └── search/
        ├── SearchModal.svelte
        └── SearchResult.svelte
```

**Regel:** `ui/` kennt keine GA-Begriffe. `domain/` kennt kein Layout.

---

### `src/lib/content/`

Markdown-Artikel mit Frontmatter. Pro Sprache ein Ordner,
dann nach Fachbereich gruppiert.

```text
content/
├── de/
│   ├── regelung/
│   │   ├── pid-regler.md
│   │   ├── regelkreise.md
│   │   └── hydraulische-schaltungen.md
│   ├── heizung/
│   │   ├── heizkurve.md
│   │   ├── waermepumpe.md
│   │   └── fernwaerme.md
│   ├── lueftung/
│   │   ├── rlt-anlage.md
│   │   ├── waermerueckgewinnung.md
│   │   └── vav-cav.md
│   ├── kaelte/
│   │   ├── kaeltetechnik-grundlagen.md
│   │   └── kaeltemittel.md
│   ├── sanitaer/
│   │   └── legionellen.md
│   ├── signale/
│   │   ├── signaltypen.md
│   │   └── 0-10v-vs-4-20ma.md
│   ├── protokolle/
│   │   ├── bacnet.md
│   │   ├── modbus.md
│   │   ├── knx.md
│   │   └── dali.md
│   ├── sensoren/
│   │   ├── temperatursensoren.md
│   │   └── drucksensoren.md
│   ├── antriebe/
│   │   ├── frequenzumrichter.md
│   │   └── motorventile.md
│   ├── ems/
│   │   ├── was-ist-ems.md
│   │   └── lastmanagement.md
│   ├── normen/
│   │   ├── en-15232.md
│   │   └── sia-386-110.md
│   ├── it/
│   │   ├── proxmox.md
│   │   └── netzwerk-ga.md
│   └── ibn/
│       ├── datenpunktliste.md
│       └── funktionsbeschreibung.md
└── en/
    └── ...                     # Gleiche Struktur, englische Inhalte
```

**Regel:** Ein Artikel = eine Datei. Ordner = Kategorie-Filter im UI.

---

### `src/lib/data/`

Strukturierte Daten als TypeScript-Objekte (kein Markdown nötig).

```text
data/
├── abbreviations/
│   ├── de.ts                   # { short, long, description, area, related }[]
│   └── en.ts
│
├── checklists/
│   ├── types.ts                # Interface ChecklistItem, ChecklistTemplate
│   ├── heizung-ibn.ts
│   ├── lueftung-ibn.ts
│   ├── kaelte-ibn.ts
│   └── sanitaer-ibn.ts
│
└── reference/
    ├── temperaturspreizungen.ts
    ├── kaeltemittel.ts
    ├── normen.ts
    └── druckbereiche.ts
```

---

### `src/lib/converters/`

Pure Functions — Input rein, Output raus. Kein State, kein UI.

```text
converters/
├── types.ts                    # Interface Converter, Unit
├── druck.ts                    # bar, kPa, mbar, Pa, psi, mmWS
├── temperatur.ts               # °C, K, °F
├── durchfluss.ts               # l/s, m³/h, l/min
├── leistung.ts                 # kW, W, kcal/h, BTU/h
├── energie.ts                  # kWh, MWh, GJ, MJ
├── luftmengen.ts               # m³/h, m³/s, l/s
├── feuchte.ts                  # %, g/kg, Taupunkt
└── index.ts                    # Re-export + Konverter-Registry
```

Jede Datei exportiert: `units[]`, `convert(value, from, to)`, `meta` (Name, Icon, Slug).

---

### `src/lib/i18n/`

```text
i18n/
├── types.ts                    # Interface Translation
├── de.ts                       # Deutsche UI-Strings
├── en.ts                       # Englische UI-Strings
└── index.ts                    # setLang(), t(), detectLang()
```

**Regel:** Keine Artikel-Inhalte hier — die sind in `content/`.
Nur UI-Strings (Buttons, Labels, Menü, Fehlermeldungen).

---

### `src/lib/stores/`

Svelte Stores — globaler Client-State.

```text
stores/
├── theme.ts                    # 'auto' | 'light' | 'dark' | 'oled'
├── lang.ts                     # 'de' | 'en' | ...
├── user.ts                     # Session / User-Objekt
└── search.ts                   # Suchindex, Query, Resultate
```

---

### `src/lib/utils/`

Kleine Hilfsfunktionen ohne Domain-Wissen.

```text
utils/
├── csv.ts                      # arrayToCsv(), downloadCsv()
├── format.ts                   # formatDate(), formatNumber()
├── clipboard.ts                # copyToClipboard()
├── slug.ts                     # slugify()
└── markdown.ts                 # parseMarkdown(), extractFrontmatter()
```

---

### `src/lib/server/`

**Nur Server-Code.** Wird nie an den Client gesendet.
SvelteKit verhindert das automatisch via `$lib/server`.

```text
server/
├── auth.ts                     # better-auth Setup
├── db/
│   ├── schema.ts               # SQLite Schema + Migrations
│   └── queries/
│       ├── users.ts            # User-Queries
│       └── config.ts           # Config-Queries
└── content.ts                  # Artikel laden + parsen (server-side)
```

---

### `src/routes/`

SvelteKit File-based Routing. Route-Gruppen für Auth-Guard.

```text
routes/
│
├── +layout.svelte              # Root Layout (Theme, Font, SW)
├── +layout.ts                  # Session laden
│
├── (public)/                   # Keine Auth nötig
│   └── login/
│       └── +page.svelte
│
├── (app)/                      # Auth-Guard: redirect zu /login wenn nicht eingeloggt
│   ├── +layout.svelte          # Sidebar + Header
│   ├── +layout.server.ts       # Auth-Check
│   │
│   ├── +page.svelte            # Dashboard /
│   │
│   ├── konverter/
│   │   ├── +page.svelte        # Übersicht
│   │   └── [slug]/
│   │       └── +page.svelte    # /konverter/druck etc.
│   │
│   ├── wissen/
│   │   ├── +page.svelte        # Artikelliste + Filter
│   │   └── [slug]/
│   │       └── +page.svelte    # /wissen/pid-regler
│   │
│   ├── checklisten/
│   │   ├── +page.svelte
│   │   └── [slug]/
│   │       └── +page.svelte
│   │
│   ├── abkuerzungen/
│   │   └── +page.svelte
│   │
│   ├── referenz/
│   │   └── +page.svelte
│   │
│   ├── settings/
│   │   └── +page.svelte
│   │
│   └── changelog/
│       └── +page.svelte
│
├── (admin)/                    # Nur Admin-Rolle
│   ├── +layout.server.ts       # Rollen-Check
│   └── admin/
│       └── +page.svelte
│
└── api/                        # API Endpoints (SvelteKit +server.ts)
    ├── auth/
    │   └── [...all]/
    │       └── +server.ts      # better-auth Handler
    └── export/
        └── +server.ts          # CSV-Export Endpoint
```

---

### `static/`

```text
static/
├── fonts/
│   ├── Rubik-Regular.woff2
│   └── ...
├── icons/
│   ├── icon.svg
│   └── icon-192.png
├── schematics/                 # SVG-Schemas (Lüftung, Heizung, etc.)
│   ├── rlt-anlage.svg
│   ├── heizung-zweirohr.svg
│   └── ...
├── manifest.webmanifest
└── sw.js
```

---

## Namenskonventionen

| Was                | Konvention           | Beispiel                |
| ------------------ | -------------------- | ----------------------- |
| Svelte-Komponenten | PascalCase           | `ArticleCard.svelte`    |
| TS-Dateien         | camelCase            | `formatDate.ts`         |
| Routen-Ordner      | kebab-case           | `pid-regler/`           |
| Markdown-Artikel   | kebab-case           | `pid-regler.md`         |
| Stores             | camelCase + `Store`  | `themeStore.ts`         |
| Interfaces / Types | PascalCase           | `interface ArticleMeta` |
| Konstanten         | SCREAMING_SNAKE_CASE | `DEFAULT_LANG`          |

---

## Skalierungsregeln

1. **Neues Wissensgebiet** → neuer Ordner in `content/de/[bereich]/`
2. **Neuer Konverter** → neue Datei in `converters/[name].ts` + Eintrag in `index.ts`
3. **Neue Abkürzungen** → Eintrag in `data/abbreviations/de.ts`
4. **Neue Checkliste** → neue Datei in `data/checklists/[name].ts`
5. **Neue Sprache** → neue Datei in `i18n/[lang].ts` + `content/[lang]/`
6. **Neue UI-Komponente** → in `components/ui/` (atomar) oder `components/domain/` (feature-spezifisch)

**Niemals:** Business-Logik in `.svelte`-Dateien. Logik in `lib/`, Darstellung in `routes/` und `components/`.

---

## Kein Express mehr

Mit SvelteKit entfällt der separate Express-Server.
SvelteKit übernimmt Routing, SSR und API-Endpoints (`+server.ts`).
SQLite läuft in `$lib/server/` — nur server-seitig, nie im Browser.

| Vorher (ottos-monitor) | GA Tool                |
| ---------------------- | ---------------------- |
| Express Router         | SvelteKit `+server.ts` |
| `src/routes/*.ts`      | `src/routes/api/**`    |
| `ts-node src/index.ts` | `vite build` + Node    |
