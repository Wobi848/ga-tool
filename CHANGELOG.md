# Changelog

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
