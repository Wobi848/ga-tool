# Changelog

## v0.9.5 — 2026-05-24

### Neue Rechner

- **k-Faktor-Rechner (Luft)** — Volumenstrom aus Wirkdruck: `Q = k·√ΔP`. Vier Modi (Q aus k+ΔP, ΔP aus Q+k, k aus Q+ΔP, k aus zwei Messpunkten). Optional Dichtekorrektur. Kennlinien-Chart mit Arbeitspunkt-Marker und gestrichelten Hilfslinien zu den Achsen.
- **Zeit-Konverter** — ms / s / min / h / d / Wo / Mt / a, mit Tests.

### Neue Wissens-Artikel

- **Luftfeuchtigkeit — Grundlagen für die GA** — rF vs absolute vs spezifische Feuchte, h-x-Diagramm-Operationen als Pfeile, Behaglichkeit nach EN 16798-1 / ISO 7730 / SIA 382/1, Symptome zu trocken/zu feucht und GA-Gegenmassnahmen.
- **k-Faktor — Volumenstrom aus Wirkdruck** — Bernoulli-Herleitung, typische k-Werte, IBN-Schritte, Filter-Hinweise gegen springende Werte.

### Psychrometrie-Rechner

- **Interaktives h-x-Diagramm** (Carrier-Style: x horizontal, T vertikal) — rF-Kurven 20 / 40 / 60 / 80 / 100 %, Arbeitspunkt wandert live mit deinen Eingaben, Taupunkt-Marker auf der Sättigungslinie.

### Dashboard

- **Neueste Einträge** — neue Sektion zwischen Favoriten und "Meist aufgerufen". Listet die 5 jüngsten Einträge quer über Wissensbasis, Referenz, Checklisten, Rechner und Konverter (sortiert nach `updated`-Datum, mit Typ-Badge + relativem Datum „heute / gestern / vor X Tagen").

### UI-Fixes

- **Referenz-Karten-Icons** — fünf fehlende Icons ergänzt (sun, code, bell, list, layers). Alarm-Richtwerte, BACnet-Objekttypen, DALI-Gerätetypen, KNX-DPT und Modbus-Codes zeigen jetzt eigene Icons statt Fallback-Quadrat.
- **Konverter-Karten-Icons** — clock + rotate-cw ergänzt, Zeit + Winkel hatten vorher den generischen Fallback.

---

## v0.9.4 — 2026-05-24

### Auth & Rollen

- **System-Admin-Rolle eingeführt** — Erster registrierter User wird automatisch `systemadmin`. Kann nicht geändert, gesperrt oder gelöscht werden (Schutz vor versehentlichem Selbst-Aussperren).
- **Self-Healing für bestehende Deployments** — Beim Server-Start wird automatisch der älteste Admin auf `systemadmin` hochgestuft, falls noch keiner existiert. Log-Eintrag: `[bootstrap] Promoted <email> to systemadmin`.
- **Admin-UI** — Systemadmin-Zeile zeigt roten Lock-Badge statt Dropdown, alle destruktiven Aktionen ausgeblendet. Sidebar-Link "System Admin" für die Rolle, Profile-Badge entsprechend.
- **Recovery-Pfad dokumentiert** in [DEPLOYMENT.md](DEPLOYMENT.md) — SQL-Varianten falls Account verloren.

### Wissensbasis

- **Neuer Artikel: Temperaturfühler** — RTD (PT100/PT1000/NI1000 mit TK6180 vs TK5000), aktive Spannungsfühler (LMx35-Familie 10 mV/K, K&P KP10), NTC + andere gängige Signaltypen. Mit Querverweis zum Polynom-Fit für NI1000-Linearisierung. Im Übersichts-Artikel `sensoren.md` ist jetzt ein Link auf das neue Detail.

### Checklisten

- **Fehlende Icons ergänzt** — DALI-2 (sun), Datenpunktlisten-Review (table), Funktionstest-Protokoll (check-square), plus droplets/snowflake/network — vorher zeigten 3 Checklisten den Fallback-Kasten statt eigenes Icon.

---

## v0.9.3 — 2026-05-24

### Abkürzungen

- **Sprach-Filter ist jetzt strikt** — DE und EN abwählen liess vorher den Filter komplett kippen und zeigte ALLE Einträge (DE+EN+INT). Jetzt: keine Sprache gewählt → nur sprachneutrale INT-Einträge (z.B. "0–10 V") bleiben. Default beim Öffnen folgt weiterhin der UI-Sprache.
- **Kein FOUC bei Hydration** — `selectedLangs` wird synchron beim Initialisieren auf die UI-Sprache gesetzt statt in `onMount`. Verhindert das kurze Aufblitzen einer falsch gefilterten Liste beim Seitenwechsel.

### CI

- **DB-Migration vor E2E-Tests** — Playwright-Server scheiterte an "no such table: analytics_event" weil die CI-DB nie migriert wurde. Migrate-Script läuft jetzt vor den E2E-Tests.

---

## v0.9.2 — 2026-05-24

### Polynom-Fit-Rechner

- **Notation umschaltbar** — neuer Dropdown zwischen Standard (`a₀, a₁, a₂ …`) und Block-Notation (`A·x² + B·x + C`). Bei Grad 1 wird `A = 0` als Hinweis gegraut angezeigt, bei Grad > 2 erscheint eine Warnung, dass das Schema nur Grad ≤ 2 abbildet. Copy-Button kopiert in der gewählten Notation und Reihenfolge.

### Wissens-Artikel: Polynom-Approximation

- **Praxis-Beispiel ergänzt** — Sollwertversteller mit Widerstands-Signal (1000–1175 Ω → ±3 K). Schritt-für-Schritt: Punkte eingeben, Grad 1, Notation umstellen, Werte ablesen. Inkl. Feinkorrektur-Tabelle für C und Filter-Hinweise gegen springende Werte.

---

## v0.9.1 — 2026-05-24

### UX

- **Versions-Badge nur noch in Top-Bar** — vorher erschien die Version auf Desktop doppelt (Sidebar-Footer + Top-Bar-Badge), auf Mobile nur in der Top-Bar. Sidebar-Link entfernt, einheitlich nur noch oben rechts.

---

## v0.9.0 — 2026-05-24

### Neue Features

- **Polynom-Fit-Rechner** — Least-Squares-Polynom-Approximation (Grad 1–5) aus Messpunkten. Eingabe von (x, y)-Paaren, Live-Plot, Koeffizienten-Tabelle mit Copy-Button, R²-Bestimmtheitsmass, Sub-Tool zum Auswerten an beliebigen x-Stellen. Default-Daten zeigen NTC-10k-Kennlinie. Erreichbar unter `/rechner/polynom-fit`.
- **Wissens-Artikel: Polynom-Approximation für Sensor-Kennlinien** — Theorie + Praxis: Wahl des Grades, R²-Interpretation, Anwendungen (NTC-Linearisierung, Differenzdruck → Volumenstrom, 4–20 mA Kalibrierung, Heizkurven), Overfitting-Vermeidung, Grenzen (Steinhart-Hart für extreme NTC-Bereiche). Direkt mit dem Rechner verknüpft.

### Mobile-Fixes (Wissensbasis)

- **Detail-Seiten überlaufen nicht mehr** — `.main-wrapper` mit `flex: 1` ohne `min-width: 0` liess sich vom Content nach rechts pushen, egal welche per-Page-Constraints. Jetzt `min-width: 0` + `overflow-x: clip` als sichere Untergrenze.
- **Display-Headings auf Mobile** — lange deutsche Komposita wie "ADIABATISCHE KÜHLUNG – PRINZIP UND GRENZEN" blieben in einer Zeile und überliefen. Jetzt `overflow-wrap: anywhere` + `hyphens: auto`, dazu auf ≤480 px Font-Size von 2 rem → 1.5 rem.
- **Code-Blöcke, Tabellen, Cards** — `<pre>` mit `max-width: 100%` (war nur `overflow-x: auto`, hat parent trotzdem geweitet), `<table>` als `display: block; overflow-x: auto` für wide tables, `.article-card` / `.tool-card` / `.related-card` mit `max-width: 100%` + `min-width: 0`.
- **Filter-Chips** — `.filter-label` belegt auf ≤480 px eine volle Zeile, Chips wrappen sauber drunter statt rechts geclippt zu werden.

---

## v0.8.3 — 2026-05-24

### Mobile + UX

- **Version-Badge in Top-Bar** — Versionsnummer ist jetzt auf allen Bildschirmgrössen sichtbar (vorher nur in der Sidebar, die auf Mobile versteckt ist). Klick öffnet Changelog.
- **Konsistente Seiten-Breite (720px)** — vorher: Dashboard 800, Wissen/Referenz/Abk 720, Rechner/Konverter 640, Konverter-Detail 480. Jetzt durchgängig 720px für alle Listen + Details → keine Layout-Sprünge beim Navigieren.

### Server-Tooling

- **`scripts/server-update.sh`** — Update-Script mit DB-Backup, `npm ci`, Migration, Build, Restart und Health-Check. `cd /opt/ga-tool && ./scripts/server-update.sh` ersetzt die manuelle Befehlskette.

---

## v0.8.2 — 2026-05-24

### Docs

- **Deployment-Befehle korrigiert** — `npm ci --omit=dev` würde `vite` + `@sveltejs/kit` weglassen, dann scheitert `npm run build` mit `vite: not found`. README und DEPLOYMENT.md nutzen jetzt `npm ci` (mit devDeps), optional `npm prune --omit=dev` nach erfolgreichem Build.

---

## v0.8.1 — 2026-05-24

### Fixes

- **Mobile iOS-Autozoom verhindert** — Inputs mit font-size < 16px lösten auf iPhones automatisches Reinzoomen aus. Globale Untergrenze von 16px unter 640px Viewport
- **Konsistente Seiten-Breite** — Rechner-Detailseiten waren auf 480px begrenzt während Listen 640px nutzten → Sprung beim Navigieren. Jetzt durchgehend 640px
- **Engere Mobile-Paddings** — `.calc-page` und `.calc-section` haben unter 480px reduziertes Padding für mehr horizontalen Platz

### Server-Deployment

- **`GET /api/health`** — Endpoint für Loadbalancer/Monitoring
- **`npm run db:migrate` / `db:baseline`** — TTY-freie DB-Migrationen
- **DEPLOYMENT.md** — Vollständige Server-Anleitung (systemd, Reverse-Proxy, Backups)
- **`window.gaTool`** — Browser-Console-Devtools für Power-User (`gaTool.help()`)

---

## v0.8.0 — 2026-05-17

### Neu

- **Vollständige EN-Übersetzung** — Alle Seiten, Rechner, Konverter, Referenz-Tabellen, Checklisten, Abkürzungen und Suchergebnisse vollständig bilingual (DE/EN)
- **Sprach-Filter Abkürzungen** — Filter-Chips 🇩🇪 DE / 🇬🇧 EN / 🌐 INT auf der Abkürzungsseite
- **Bus-IBN Einstellungen** — Adresskarte und Gruppierung werden persistent gespeichert

### Verbesserungen

- Dashboard neu gestaltet — Favouriten als Pills, Farbakzente auf Modul-Karten
- Suchmodal zeigt Titel und Beschreibungen in aktiver Sprache
- Kategorie-Labels auf allen Übersichtsseiten übersetzt
- Profil: Recently Used zeigt übersetzte Titel, Zeitangaben und Rollen

---

## v0.6.0 — 2026-05-15

### Neu

- **PID-Simulator** — Interaktiver Regelkreis-Simulator mit Heizen/Kühlen-Modus, Auto-Störgrösse (PT1-gefiltert, Zeitkonstante, Bias), SP-Automatik (Tag/Nacht-Umschaltung), Presets
- **Wissensbasis erweitert** — 7 neue Artikel: RS-485, CAN Bus, PROFIBUS, DMX512, Z-Wave, IEC 61850, Matter/Thread
- **Bidirektionale Verlinkung** — Wissensbasis ↔ Rechner (Artikel verlinken auf passende Tools und umgekehrt)
- **Changelog** — Diese Seite
- **Tastaturkürzel** — `1`–`7` für Navigation, `Ctrl+K` / `/` für Suche

### Verbesserungen

- Kühlen-Regelungsmodell korrigiert (PT1-Strecke kehrt korrekt zur Umgebungstemperatur zurück)
- Kreuz-Verlinkungen in bestehenden Artikeln ergänzt

---

## v0.5.0 — 2026-04-XX

### Neu

- **Abkürzungsverzeichnis** `/abkuerzungen` — durchsuchbar, filterbar, bilinguale Konzeptgruppen (GLT = BMS, SPS = PLC, …)
- **Referenz-Tabellen** `/referenz` — DN-Tabellen, Modbus-Codes, BACnet-Objekte, Kältemittel, Normaussentemperaturen, Alarm-Richtwerte

---

## v0.4.0 — 2026-03-XX

### Neu

- **Wissensbasis** `/wissen` — 80+ Artikel zu Regelung, Heizung, Lüftung, Klima, Sanitär, Protokolle, Antriebe, Alarm, Normen, IT, IBN
- **Fuse.js Volltextsuche** (`Ctrl+K`) über Artikel, Rechner, Konverter, Abkürzungen
- **Artikel-Detailseite** mit verwandten Artikeln und verlinkten Tools

---

## v0.2.0 — 2026-02-XX

### Neu

- **Rechner** `/rechner`: Heizkurve, Kv-Wert, Ausdehnungsgefäss, Druckverlust, Luftbedarf, Taupunkt, Wärmeleistung, Psychrometrie

---

## v0.1.0 — 2026-01-XX

### Neu

- **Konverter** `/konverter` — Druck, Temperatur, Durchfluss, Leistung, Energie, Luftmengen, Feuchte

---

## v0.0.1 — 2026-01-XX

### Grundgerüst

- SvelteKit + SQLite (better-sqlite3 + Drizzle ORM)
- Auth (Login/Logout, Admin/User-Rollen via better-auth)
- Sidebar-Navigation (Desktop) + Bottom-Nav (Mobile)
- Theme-System (Auto / Light / Dark / OLED)
- i18n Deutsch + Englisch
- Dashboard mit Schnellzugriff-Kacheln
- PWA (Manifest, Service Worker, Offline-Cache)

<!-- EN -->

# Changelog

## v0.8.0 — 2026-05-17

### New

- **Full EN translation** — All pages, calculators, converters, reference tables, checklists, abbreviations and search results fully bilingual (DE/EN)
- **Language filter for abbreviations** — Filter chips 🇩🇪 DE / 🇬🇧 EN / 🌐 INT on the abbreviations page
- **Bus commissioning settings** — Address map visibility and grouping are persisted across sessions

### Improvements

- Dashboard redesigned — favourites as pills, colour accents on module cards
- Search modal shows titles and descriptions in the active language
- Category labels translated on all overview pages
- Profile: Recently Used shows translated titles, timestamps and roles

---

## v0.6.0 — 2026-05-15

### New

- **PID Simulator** — Interactive control loop simulator with heating/cooling mode, auto disturbance (PT1-filtered, time constant, bias), SP automation (day/night switching), presets
- **Knowledge base extended** — 7 new articles: RS-485, CAN Bus, PROFIBUS, DMX512, Z-Wave, IEC 61850, Matter/Thread
- **Bidirectional linking** — Knowledge base ↔ Calculators (articles link to relevant tools and vice versa)
- **Changelog** — This page
- **Keyboard shortcuts** — `1`–`7` for navigation, `Ctrl+K` / `/` for search

### Improvements

- Cooling control model corrected (PT1 plant correctly returns to ambient temperature)
- Cross-links added to existing articles

---

## v0.5.0 — 2026-04-XX

### New

- **Abbreviation directory** `/abkuerzungen` — searchable, filterable, bilingual concept groups (GLT = BMS, SPS = PLC, …)
- **Reference tables** `/referenz` — DN tables, Modbus codes, BACnet objects, refrigerants, design outdoor temperatures, alarm thresholds

---

## v0.4.0 — 2026-03-XX

### New

- **Knowledge base** `/wissen` — 80+ articles on control, heating, ventilation, HVAC, plumbing, protocols, drives, alarms, standards, IT, commissioning
- **Fuse.js full-text search** (`Ctrl+K`) across articles, calculators, converters, abbreviations
- **Article detail page** with related articles and linked tools

---

## v0.2.0 — 2026-02-XX

### New

- **Calculators** `/rechner`: Heating curve, Kv value, expansion vessel, pressure drop, fresh air demand, dew point, heat output, psychrometrics

---

## v0.1.0 — 2026-01-XX

### New

- **Converters** `/konverter` — Pressure, temperature, flow rate, power, energy, air volumes, humidity

---

## v0.0.1 — 2026-01-XX

### Foundation

- SvelteKit + SQLite (better-sqlite3 + Drizzle ORM)
- Auth (login/logout, admin/user roles via better-auth)
- Sidebar navigation (desktop) + bottom nav (mobile)
- Theme system (Auto / Light / Dark / OLED)
- i18n German + English
- Dashboard with quick-access tiles
- PWA (manifest, service worker, offline cache)
