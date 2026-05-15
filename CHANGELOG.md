# Changelog

## v0.6.0 — 2026-05-15

### Neu
- **PID-Simulator** — Interaktiver Regelkreis-Simulator mit Heizen/Kühlen-Modus, Auto-Störgrösse (PT1-gefiltert, Zeitkonstante, Bias), SP-Automatik (Tag/Nacht-Umschaltung), Presets
- **Wissensbasis erweitert** — 7 neue Artikel: RS-485, CAN Bus, PROFIBUS, DMX512, Z-Wave, IEC 61850, Matter/Thread
- **Bidirektionale Verlinkung** — Wissensbasis ↔ Rechner (Artikel verlinken auf passende Tools und umgekehrt)
- **Changelog** — Diese Seite
- **Tastaturkürzel** — `1`–`7` für Navigation, `Ctrl+K` / `/` für Suche

### Verbesserungen
- Kühlen-Regelungsmodell korrigiert (PT1-Strecke kehrt korrekt zur Umgebungstemperatur zurück)
- Kreuz-Verlinkungen in bestehenden Artikeln ergänzt (Zigbee → Matter/Thread, DALI → DMX512, Frequenzumrichter → PROFIBUS/CAN, BACnet → IEC 61850)

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
- **Rechner** `/rechner`:
  - Heizkurven-Rechner (Siemens, Viessmann, Buderus, Honeywell, Sauter, generisch)
  - Kv-Wert Rechner
  - Ausdehnungsgefäss-Rechner
  - Druckverlust-Rechner
  - Luftbedarf-Rechner (EN 16798)
  - Taupunkt-Rechner
  - Wärmeleistungs-Rechner
  - Psychrometrie / h-x Rechner

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
- Settings-Seite
- PWA (Manifest, Service Worker, Offline-Cache)
