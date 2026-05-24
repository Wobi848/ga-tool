# GA Tool

Deutschsprachige Wissensbasis und interaktive Rechner für Gebäudeautomation (HLK, BACnet, KNX, Modbus, DALI, Elektro, Normen).

- **118+ Wissens-Artikel** zu GA-Themen
- **20 Rechner** (Heizkurve, Druckverlust, Kv-Wert, Psychrometrie, U-Wert, Heizlast, …)
- **10 IBN-/Übergabe-Checklisten** mit CSV-Export
- **17 Referenz-Tabellen** (DN, Filter, Glykol, Kältemittel …)
- **233 Abkürzungen** bilingual DE ↔ EN
- **Bus-IBN-Adresskonfigurator** für BACnet MSTP/IP, Modbus RTU, KNX

## Stack

SvelteKit 2 · Svelte 5 (Runes) · TypeScript · SQLite (Drizzle ORM) · Better-Auth · PWA

## Installation

### Lokal entwickeln

```sh
git clone https://github.com/Wobi848/ga-tool.git
cd ga-tool
npm install
cp .env.example .env   # BETTER_AUTH_SECRET ausfüllen (openssl rand -hex 32)
npm run db:migrate     # SQLite-Schema initialisieren
npm run dev
```

Dev-Server läuft auf `http://localhost:5173`.

### Auf eigenem Server deployen

**Vollständige Anleitung in [DEPLOYMENT.md](DEPLOYMENT.md)** — inkl. systemd-Unit, nginx/Caddy + Reverse-Proxy, Backups, Updates, Troubleshooting.

Kurzfassung für Linux-Server mit Node 20+:

```sh
git clone https://github.com/Wobi848/ga-tool.git /opt/ga-tool
cd /opt/ga-tool
npm ci                 # devDeps werden fuer den Build gebraucht (vite, svelte-kit)
cp .env.example .env   # ORIGIN, BETTER_AUTH_SECRET, DATABASE_URL setzen
DATABASE_URL=/var/lib/ga-tool/local.db npm run db:migrate
npm run build
node build/index.js    # spaeter via systemd
```

> **Hinweis:** `--omit=dev` würde `vite` und `@sveltejs/kit` weglassen — die werden zum Build benötigt. Optional kannst du nach erfolgreichem Build `npm prune --omit=dev` ausführen, um devDeps zu entfernen.

### Updates

```sh
cd /opt/ga-tool
git pull
npm ci
npm run db:migrate
npm run build
sudo systemctl restart ga-tool
```

## Skripte

| Befehl                | Zweck                                |
| --------------------- | ------------------------------------ |
| `npm run dev`         | Dev-Server mit HMR                   |
| `npm run build`       | Produktions-Build (Node-Adapter)     |
| `npm run preview`     | Build lokal serven                   |
| `npm run check`       | svelte-check + TypeScript            |
| `npm run lint`        | prettier --check && eslint           |
| `npm run format`      | prettier --write                     |
| `npm run test`        | Vitest (Logic + Component)           |
| `npm run test:e2e`    | Playwright E2E gegen lokalen Build   |
| `npm run db:migrate`  | DB-Migrationen anwenden (TTY-frei)   |
| `npm run db:baseline` | Bestehende DB als migriert markieren |
| `npm run db:studio`   | Drizzle-Studio öffnen                |

## Dokumentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** — Modul-Aufbau, Daten-Modelle, i18n-Konvention
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — Workflow, Code-Konventionen, neue Rechner/Artikel hinzufügen
- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Produktiv-Setup auf eigenem Server (systemd, Reverse-Proxy, Backups)
- **[CHANGELOG.md](CHANGELOG.md)** — Versionshistorie

## Tests

Drei Ebenen:

- **Logic** (`src/**/*.test.ts`) — Pure Funktionen in Node-Environment
- **Component** (`src/**/*.svelte.test.ts`) — Vitest + jsdom + @testing-library/svelte
- **E2E** (`e2e/*.spec.ts`) — Playwright gegen `npm run preview`

CI läuft alle drei per GitHub Action (`.github/workflows/ci.yml`).

## Lizenz

Privat — kein öffentliches Lizenz-Statement.
