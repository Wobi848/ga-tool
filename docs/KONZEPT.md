# GA Tool — Konzept

Persönliches Web-Tool für Gebäudeautomation (HLKSE).
Ziel: Grosse Wissensdatenbank + Konverter + Utilities für die tägliche Arbeit.
Schnell, durchsuchbar, nachschlagbar — die GA-Referenz.

---

## Stack

| Schicht       | Tool                                        |
|---------------|---------------------------------------------|
| Fullstack     | SvelteKit + Vite (kein separates Express)   |
| Datenbank     | better-sqlite3 + Drizzle ORM (SQLite)       |
| Auth          | better-auth                                 |
| UI-Komponenten| shadcn-svelte (headless, copy-paste)        |
| Styling       | Tailwind CSS v4                             |
| i18n          | svelte-i18n (DE + EN, erweiterbar)          |
| Search        | Fuse.js (clientseitig, fuzzy)               |
| Schemen       | SVG (statisch in `/static/schematics/`)     |
| Deploy        | systemd (gleich wie ottos-monitor)          |

---

## Design-System

### Farben

| Token                   | Wert      | Verwendung                          |
|-------------------------|-----------|-------------------------------------|
| `--color-primary`       | `#ea580c` | Orange — Buttons, Links, Highlights |
| `--color-primary-hover` | `#c2410c` | Orange dunkler für Hover            |
| `--color-secondary`     | `#0d9488` | Teal — Icons, Badges, Status-Tags   |
| `--color-bg`            | `#f8fafc` | Hintergrund Light                   |
| `--color-surface`       | `#ffffff` | Karten, Sidebar Light               |
| `--color-border`        | `#e2e8f0` | Trennlinien Light                   |
| `--color-text`          | `#0f172a` | Haupttext Light                     |
| `--color-muted`         | `#64748b` | Nebentext, Labels                   |

**Dark-Mode** (`prefers-color-scheme: dark` / Klasse `dark`):

| Token            | Wert        |
|------------------|-------------|
| `--color-bg`     | `#0f172a`   |
| `--color-surface`| `#1e293b`   |
| `--color-border` | `#334155`   |
| `--color-text`   | `#f1f5f9`   |

**OLED**: `--color-bg: #000000`, `--color-surface: #0a0a0a`

### Typografie

- **Font**: Rubik (self-hosted, woff2)
- **Grössen**: 12 / 14 / 16 / 18 / 24 / 32 px
- **Gewichte**: 400 (normal), 500 (medium), 600 (semibold)

### Stil-Richtlinien

- Minimal, technisch-sauber — kein Skeuomorphismus
- Karten mit leichtem Schatten (`shadow-sm`) und `rounded-lg`
- Orange nur für interaktive Elemente (Buttons, Links, aktiver Nav-Eintrag)
- Teal für informative Elemente (Badges, Status, Icons)
- Keine grellen Farbflächen — Orange als Akzent, nicht als Hintergrund

---

## Sprache / i18n

- **Hauptsprache**: Deutsch (DE)
- **Weitere**: Englisch (EN) — erweiterbar auf FR, IT etc.
- Umschaltung via Language-Selector (Settings + Header)
- Alle UI-Strings, Artikel-Inhalte und Checklisten in i18n-Dateien
- Struktur: `/src/lib/i18n/de.ts`, `/src/lib/i18n/en.ts` etc.
- Neue Sprache = neue Datei, kein Code-Umbau nötig
- Gespeichert in `localStorage`, Auto-detect via `navigator.language`

---

## Themes

- **Auto** (folgt System: `prefers-color-scheme`)
- **Light**
- **Dark**
- **OLED** (reines Schwarz `#000`, für AMOLED-Displays)
- Umschaltung in Settings + optional im Header
- Gespeichert in `localStorage`
- CSS Custom Properties (gleicher Ansatz wie ottos-monitor)

---

## Navigation / Menu

**Desktop**: Sidebar links (fixiert, collapsible)

```text
┌─────────────────────────────────────┐
│ [Logo] GA Tool          [⚙] [DE|EN] │
├──────────┬──────────────────────────┤
│          │                          │
│ ⌂ Home   │   Inhalt / Seite         │
│ 🔄 Konv. │                          │
│ 🧮 Rechn.│                          │
│ 📚 Wissen│                          │
│ 📋 Check │                          │
│ 📊 Ref.  │                          │
│ 🔤 Abk.  │                          │
│          │                          │
│ ──────── │                          │
│ ⚙ Settings                          │
│ 👤 Account                          │
└──────────┴──────────────────────────┘
```

**Mobile**: Bottom-Nav (5 Icons) + Hamburger für Settings/Account/Referenz/Abkürzungen

```text
┌─────────────────┐
│  GA Tool     ⚙  │
│                 │
│   [Inhalt]      │
│                 │
├─────────────────┤
│ ⌂  🔄  🧮  📚  📋 │
└─────────────────┘
```

**Routen**:

- `/` — Dashboard / Startseite (Schnellzugriff-Kacheln, letzte Artikel, Tool-Übersicht)
- `/konverter` — Übersicht alle Konverter
- `/konverter/druck`
- `/konverter/temperatur`
- `/konverter/durchfluss`
- `/konverter/leistung`
- `/konverter/energie`
- `/konverter/luftmengen`
- `/konverter/feuchte`
- `/rechner` — Übersicht alle Rechner
- `/rechner/heizkurve`
- `/rechner/kv-wert`
- `/rechner/ausdehnungsgefaess`
- `/rechner/druckverlust`
- `/rechner/luftbedarf`
- `/rechner/taupunkt`
- `/rechner/waermeleistung`
- `/rechner/psychrometrie`
- `/wissen` — Artikelübersicht (durchsuchbar, filterbar)
- `/wissen/[slug]` — einzelner Artikel
- `/referenz` — Tabellen & Normen
- `/checklisten` — Übersicht
- `/checklisten/[slug]` — Vorschau + CSV-Export
- `/abkuerzungen` — Abkürzungsverzeichnis (durchsuchbar)
- `/settings` — Einstellungen
- `/admin` — Admin-Bereich (nur Admin-Rolle)
- `/login`
- `/changelog` — Versionshistorie

---

## Artikel-Metadaten (Frontmatter)

Jeder Artikel ist eine Markdown-Datei mit strukturierten Metadaten.
Diese Keys sind die Grundlage für Suche, Filter und Verlinkung.

```markdown
---
title: PID-Regler
slug: pid-regler
category: regelung
subcategory: regler
tags: [pid, p-regler, i-regler, d-regler, regelkreis, tuning]
difficulty: grundlagen        # grundlagen | fortgeschritten | experte
area: [hlk, ga]               # hlk | sanitaer | elektro | ga | it | normen
related: [regelkreise, frequenzumrichter, raumautomation]
norm: []                      # referenzierte Normen
updated: 2026-05-14
lang: de
---
```

**Pflicht-Keys für jeden Artikel:**

| Key          | Typ      | Beschreibung                              |
|--------------|----------|-------------------------------------------|
| `title`      | string   | Titel des Artikels                        |
| `slug`       | string   | URL-Pfad (`/wissen/pid-regler`)           |
| `category`   | string   | Hauptkategorie                            |
| `tags`       | string[] | Suchbegriffe, Synonyme, Abkürzungen       |
| `difficulty` | enum     | grundlagen / fortgeschritten / experte    |
| `area`       | string[] | Fachbereich (HLK, Sanitaer, Elektro, IT) |
| `related`    | string[] | Verwandte Artikel (Slugs)                 |
| `updated`    | date     | Letzte Änderung                           |
| `lang`       | string   | Sprache der Datei                         |

---

## Dashboard (Startseite `/`)

- **Schnellzugriff-Kacheln**: Konverter / Rechner / Wissen / Checklisten / Referenz / Abkürzungen
- **Zuletzt angesehen**: letzte 3–5 Artikel (aus `localStorage`)
- **Nützlich heute**: zufälliger Artikel-Tipp des Tages (aus der Wissensbasis)
- **Kurzlinks**: häufig genutzte Konverter (Druck, Temperatur) direkt auf dem Dashboard
- **Version + Changelog-Link** im Footer sichtbar

---

## Such- und Filtersystem

### Globale Suche (`Ctrl+K` / `/`)

- Fuzzy-Suche mit **Fuse.js** (clientseitig, kein Server-Trip)
- Durchsucht: Artikel-Titel, Tags, Abkürzungen, Konverter-Namen, Rechner-Namen, Referenz-Tabellen
- Ergebnisse gruppiert nach Typ (Artikel / Konverter / Rechner / Abkürzung / Referenz)
- Tastatur-Navigation in den Resultaten

```text
┌─────────────────────────────────┐
│ 🔍 Suche…                       │
├─────────────────────────────────┤
│ 📚 Artikel                      │
│   PID-Regler                    │
│   Regelkreise                   │
├─────────────────────────────────┤
│ 🔤 Abkürzungen                  │
│   PID — Proportional-Integral-… │
├─────────────────────────────────┤
│ 🔄 Konverter                    │
│   Druckkonverter                │
├─────────────────────────────────┤
│ 🧮 Rechner                      │
│   Heizkurven-Rechner            │
└─────────────────────────────────┘
```

### Wissensbasis-Filter (`/wissen`)

- **Fachbereich**: HLK / Sanitär / Elektro / GA / IT / Normen
- **Kategorie**: Regelung / Signale / Protokolle / Antriebe / Sensoren / …
- **Schwierigkeitsgrad**: Grundlagen / Fortgeschritten / Experte
- **Suche**: Volltextsuche über Titel + Tags
- **Sortierung**: A–Z / Neueste / Relevanz

### Abkürzungsverzeichnis (`/abkuerzungen`)

- Suche über Kürzel + Langform + Beschreibung
- Filter nach Fachbereich
- Alphabetische Schnellnavigation (A B C … Z)

---

## Wissensbasis — Vollständige Themenliste

### Regelung & Hydraulik

- Steuern vs. Regeln (fundamentaler Unterschied, in der Praxis oft verwechselt)
- PID-Regler (P, I, D — wann was, Sprungantwort, Tuning)
- Zweipunktregelung (Thermostat-Logik, Hysterese) vs. stetige Regelung
- Regelkreise (Sensor, Aktor, Regelgrösse, Stellgrösse, Totzeit)
- Kaskadenregelung (z.B. Aussentemp führt Vorlauf → Vorlauf führt Raum)
- Vorsteuerung / Aufschaltung (Störgrössenaufschaltung)
- Sollwertführung / gleitender Sollwert
- Hand-0-Auto (Handsteuerung, Notbetrieb — was passiert beim Ausfall)
- Hydraulischer Abgleich (Grundlage, Methoden, warum ohne es nie stimmt)
- Hydraulische Schaltungen (Einrohr, Zweirohr, Tichelmann, Bypass) + SVG-Schema
- Druckverlust in Rohrleitungen (Berechnung, Diagramme)
- Pumpen (Kennlinie, Regelung, EC-Motoren vs. AC)
- Motorventile (2-Wege, 3-Wege, Kv-Wert berechnen)
- Klappenantriebe (Luftklappen, Stellzeit, Charakteristik)

### Heizung

- Heizung Grundlagen (Aufbau, Komponenten) + SVG-Schema Zweirohr-Heizung
- Heizkurve / witterungsgeführte Regelung
- Fernwärme (Übergabestation, Primär/Sekundär) + Schema
- Wärmepumpe (Luft/Wasser, Sole/Wasser — Funktion, COP, JAZ) + Schema Kältekreislauf
- Fussbodenheizung (Aufbau, Regelung, Trägheit)
- Pufferspeicher (Funktion, Einbindung, Schichtung) + Schema
- Kesselregelung (Modulierend, gleitend)

### Lüftung

- RLT-Anlage Aufbau (Filter → Erhitzer → Kühler → Befeuchter → WRG) + SVG-Schema mit allen Komponenten beschriftet
- Wärmerückgewinnung (Rotations-WT, Platten-WT, Kreislaufverbund) + Schema je Typ
- VAV vs. CAV (Variable vs. Constant Air Volume) + Schema
- Druckregelung in Lüftungsanlagen
- Raumluftqualität (CO2, VOC, Partikel — Grenzwerte, Sensoren)
- Hygieneanforderungen Lüftung (VDI 6022)
- Befeuchter (Typen, Hygiene, Dampf vs. Verdunstung)

### Klima & Kälte

- Kältetechnik Grundlagen (Kreislauf, Verdichter, Verflüssiger, Verdampfer)
- Kältemittel Detail (R32, R410A, R744/CO₂, R290 — GWP, Einsatz, Phase-Out)
- Wärmepumpe vs. Kältemaschine (Abgrenzung, reversibel)
- Free Cooling (direkt, indirekt — wann sinnvoll)
- Adiabatische Kühlung (Prinzip, Einsatzgrenzen)
- COP und EER (Berechnung, Normbedingungen)

### Sanitär

- Legionellen (Schutztemperaturen, Schaltzeiten, Normen, Thermische Desinfektion)
- Trinkwasser-Erwärmung (Speicher, Durchfluss, Hygiene)
- Druckhaltung Heizung (Ausdehnungsgefäss, Vordruck)

### Signale & Verdrahtung

- Signaltypen Übersicht (AI, AO, DI, DO — was ist was)
- Analog: 0–10V vs. 4–20mA (Vor-/Nachteile, wann welches)
- Digital: potentialfrei, 24VAC/DC, Puls, PWM
- Warum 4–20mA störungsresistenter (Leitungswiderstand, Kabelbrucherkennung bei 0mA)
- Typische Sensoren und ihre Ausgänge (PT100, PT1000, NTC, 4–20mA, 0–10V)
- Schirmung und Erdung (wann, wie, warum)
- SELV / PELV (Schutzkleinspannung — was erlaubt was)

### Sensoren (vertieft)

- PT100 vs. PT1000 vs. NTC (Kennlinien, Genauigkeit, Einsatz)
- Drucksensoren (absolut / relativ / differenziell — Unterschied und Einsatz)
- Durchflussmessung (induktiv, Ultraschall, Coriolis — Prinzip, Vor-/Nachteile)
- CO2-Sensoren (NDIR-Prinzip, Kalibrierung, Grenzwerte)
- VOC-Sensoren (was messen sie, Grenzen)
- Feuchtesensoren (kapazitiv, Taupunkt, Messbereiche)
- Präsenz- und Bewegungsmelder (PIR, Radar — Unterschied)
- Helligkeitssensoren (Lux, spektral, Einsatz Beschattung)
- Wärmemengenzähler (Funktion, Einbau, Auslesung)

### Kommunikationsprotokolle

- BACnet (IP vs. MS/TP, Objekte, COV, Who-Is/I-Am)
- Modbus (RTU vs. TCP, Register-Typen, Coils — einfach erklärt)
- KNX (Topologie, Telegramme, Gruppenadressen, ETS)
- DALI / DALI-2 (Licht, Broadcast vs. Gruppe vs. Einzeln, Adressierung)
- M-Bus (Zähler, Wärmemengenzähler auslesen, Primär/Sekundär)
- LON (legacy, noch oft im Feld — was tun?)
- OPC UA (IT/OT-Schnittstelle, Informationsmodell)
- EnOcean (batterielos, Funk-Sensoren — sehr verbreitet im Feld, Prinzip, Einschränkungen)
- MQTT (pub/sub, Broker, Topics, QoS — IoT-Gateway in der GA, Node-RED, Home Assistant)
- Zigbee (Mesh-Netz, Koordinator, Router, Endgerät — Sensoren, Aktoren in Gebäuden)
- LoRa / LoRaWAN (Long Range, Low Power — Fernzähler, Aussenklima, Campus-Monitoring)
- Vergleichstabelle: welches Protokoll wofür

### Antriebe & Steuerung

- Frequenzumrichter (Funktionsprinzip, U/f-Kennlinie, Ansteuerung)
- Raumautomation / RAUM-DDC (Raumregler, Fan-Coil, VAV-Box)
- GLT / Leitsystem Grundlagen (Ebenen: Feld → Automation → Management)
- EC-Motoren (Vorteile, Regelung, Wirkungsgrad)
- DDC-Programmierung Grundlagen (IEC 61131-3, FBD, ST/Structured Text — für wer selber parametriert)
- Zonenkonzepte / Raumzonierung (Büro vs. Hotel vs. Spital — unterschiedliche Anforderungen)
- Messstellenbezeichnungen / Namenskonventionen (MSR-Kürzel, DPL-Struktur im Feld)

### Alarmmanagement

- Grundlagen Alarmphilosophie (1 Alarm = 1 klare Massnahme für Operator)
- Alarmprioritäten (4 Stufen: Kritisch / Hoch / Mittel / Niedrig — wann was)
- Alarmflut-Prävention (Alarm Flood — max. Alarme/10 min, EEMUA 191 Richtwert: ≤ 1/10 min)
- Nuisance Alarms / Chattering (Alarm der ständig wechselt — wie vermeiden)
- Alarm-Totzeit / Hysterese (Verzögerung + Hysterese richtig einstellen)
- Suppression / Shelving (temporäres Unterdrücken — wann erlaubt, wann gefährlich)
- Quittierung (ACK) — wann, wer, Unterschied ACK vs. Quittierung + Reset
- Eskalation (wer wird wann informiert — Email, SMS, Push)
- Alarm-KPIs (Standing Alarms, Alarms per Hour — wie messen, Zielwerte)
- Normierung: EEMUA 191, ISA-18.2, VDI 3814-4
- **Einstellhilfen — typische GA-Alarmgrenzen:**
  - Temperaturfühler: Fühlerbruch (< −50 °C / > 200 °C), Raum zu kalt (< 18 °C), zu warm (> 26 °C)
  - Differenzdruck Filter: Verschmutzungsalarm je nach Filterklasse (typisch 150–300 Pa)
  - Frost-Alarm Heizregister: < 5 °C mit 5 min Verzögerung (kein Chattering bei Kaltstart)
  - Motorschutz / Sammelstörung: sofort kritisch, keine Verzögerung
  - Kommunikationsfehler BACnet/Modbus: 30–60 s Timeout vor Alarm (Reboot-Toleranz)
  - Leckage-Erkennung: Durchfluss vorhanden ohne Pumpenanforderung → sofort kritisch
  - CO₂-Alarm: > 1000 ppm Warnung, > 1500 ppm Alarm
  - Frostschutz Lüftung: < 3 °C Zuluft → Klappe sofort zu, Pumpe auf 100 %

### Gebäude & Komfort

- Thermische Behaglichkeit (PMV/PPD nach EN ISO 7730 — Temperatur, Luftfeuchte, Luftgeschwindigkeit)
- Nachtauskühlung / freie Kühlung thermisch (Nachtlüftung, wann sinnvoll, Regelung)
- Beschattungssteuerung (Jalousie, Raffstore — Wind-/Sonnen-/Regenautomatik, Prioritäten)
- Beleuchtungssteuerung via GA (Konstantlichtregelung, Präsenz, Tageslichtkurve — Abgrenzung zu DALI)
- Brandschutzklappen (BSK) — Ansteuerung, Rückmeldung, Auslösung, Protokollierung
- Entrauchung / RWA (Rauchabzugsanlage — Auslösung, Steuerung, Verriegelung mit Lüftung)
- Zonendruckhaltung (Reinräume, Operationssäle, Treppenhäuser — Über-/Unterdruck)

### EMS / Energiemanagement

- Was ist ein EMS (Ziele, Aufbau, Abgrenzung zu GLT)
- Lastmanagement (Spitzenlast reduzieren, Schaltprioritäten)
- PV-Integration (Eigenverbrauchsoptimierung, Überschusssteuerung)
- Batteriespeicher in der GA (Steuerungsstrategien, SOC)
- Demand Response (was ist das, wann relevant)
- SG-Ready (Smart Grid Ready — Heizsystem + PV + Netz, 4 Betriebszustände)
- E-Mobility / Lademanagement (OCPP, Lastmanagement, Phasenbalancierung, Abrechnungsmodelle)
- ISO 50001 Grundlagen (Norm, Energiepolitik, KPIs)

### Energie & Zähler

- Energiemessung Grundlagen (Wirkleistung, Blindleistung, Scheinleistung, cos φ)
- Wärmemengenzähler (Formel: Q = m · cp · ΔT, Einbau, Auslesung via M-Bus)
- Energieausweis / Kennzahlen (kWh/m², GEAK, Minergie)

### Normen & Richtlinien

- EN 15232 (GA-Effizienzklassen A–D, Einsparpotenziale)
- SIA 386.110 (Schweizer GA-Norm, Anforderungen)
- VDI 3814 (MSR-Technik in der Gebäudeautomation)
- VDI 6022 (Hygiene Raumlufttechnische Anlagen)
- EN 16798 (Raumkomfort — Temperatur, CO₂, Feuchte, Grenzwerte)
- EN 12831 (Heizlastberechnung)
- SWKI-Richtlinien Übersicht

### IT / Server / Infrastruktur

- Proxmox (Virtualisierung, VMs, LXC-Container — für GA-Server)
- Netzwerk-Grundlagen GA (VLANs, Firewall-Zonen: OT vs. IT)
- Docker in der GA (Containerlösungen, typische Anwendungen)
- Backup-Strategien für GA-Systeme (3-2-1 Regel)
- Remote-Zugriff (VPN-Typen, sichere Fernwartung)
- Cybersecurity OT (IEC 62443, Angriffsvektoren, Schutzmassnahmen)

### Inbetriebnahme & Dokumentation

- Datenpunktliste (DPL) — Aufbau, Pflichtfelder, Namenskonventionen
- Funktionsbeschreibung schreiben (Aufbau, Sprache, Detailgrad)
- TAB-Protokoll (Technische Abnahme Betrieb — Ablauf, Inhalte)
- As-Built Dokumentation (was gehört rein, Formate)
- Inbetriebnahme-Vorbereitung (Checkliste, typische Fehler)
- GLT-Übergabe an Betreiber (was wird übergeben, Schulung, Abnahmepunkte)
- Trending / Historisierung einrichten (COV vs. Polling, Auflösung, Archivierungsdauer)
- Visualisierung / HMI-Symbole (GA-Symbole nach IEC/EN — Normierung, Farbcodes)

### Wirtschaftlichkeit

- Amortisationsrechnung GA-Massnahmen (einfach berechnet)
- Lebenszykluskosten LCC (Investition + Betrieb + Unterhalt)
- EN 15232 Einsparpotenziale (Klasse D → A, Zahlen)

---

## Abkürzungsverzeichnis

Eigene Seite `/abkuerzungen` — durchsuchbar, nach Fachbereich filterbar,
alphabetische Schnellnavigation.

Struktur pro Eintrag:

```typescript
{
  short: "PID",
  long: { de: "Proportional-Integral-Differential", en: "Proportional-Integral-Derivative" },
  description: { de: "Regelungsalgorithmus…", en: "Control algorithm…" },
  area: ["regelung", "ga"],
  related: ["pid-regler"],   // Link zum Artikel
}
```

Beispiele: AI, AO, DI, DO, DDC, GLT, HLK, HLKSE, RLT, TAB, IBN, MSR,
BACnet, KNX, DALI, M-Bus, LON, OPC, RTU, TCP, VAV, CAV, FCU, AHU,
PT100, PT1000, NTC, PTC, COP, EER, JAZ, GWP, GEAK, SIA, EN, VDI,
SELV, PELV, FU, WRG, WT, RLQ, EMS, GLT, SCADA, PLC, DDC, BSK, RWA …

---

## Module

### 1. Konverter

Schnelle Einheitenumrechnung — alle relevanten GA-Einheiten.
Alles clientseitig. Deep-linkbar. Copy-Button. Favoriten pinnbar.

- **Druck**: bar ↔ kPa ↔ mbar ↔ Pa ↔ psi ↔ mmWS
- **Temperatur**: °C ↔ K ↔ °F
- **Durchfluss**: l/s ↔ m³/h ↔ l/min ↔ m³/s
- **Leistung**: kW ↔ W ↔ kcal/h ↔ BTU/h ↔ kJ/h
- **Energie**: kWh ↔ MWh ↔ GJ ↔ MJ
- **Luftmengen**: m³/h ↔ m³/s ↔ l/s
- **Feuchte / Taupunkt**: relative % ↔ absolute g/kg

### 2. Wissensbasis

Markdown-Dateien mit Frontmatter-Metadaten. Statisch im Code.
Volltext-Suche + Filter nach Fachbereich / Kategorie / Schwierigkeit.

### 3. Referenz / Tabellen

- Temperaturspreizungen (Heizung, Kühlung)
- Druckbereiche
- Kältemittel-Tabelle (GWP, Einsatz, Phase-Out Datum)
- Normen-Übersicht
- DN-Tabelle Rohrdimensionen (DN15–DN200: Aussen-Ø, Innen-Ø, Wandstärke)
- Modbus Funktionscodes (01–06, 15, 16 — was macht was, Read/Write Coil/Register)
- BACnet Objekttypen (AI, AO, BI, BO, AV, BV, MSV, Trendlog, Schedule…)
- DALI Gerätetypen (DT0–DT8: Vorschaltgeräte, Notlicht, Farbe…)
- Steuerkabel-Querschnitte (0.5 / 0.75 / 1.0 / 1.5 mm² — wann was, Leitungslänge vs. Querschnitt)
- SIA-Raumtemperaturen nach Nutzungsart (Büro / Wohnen / Hotel / Lager / Spital)
- Normaussentemperaturen CH nach Ort (Zürich −8 °C, Bern −10 °C, Davos −22 °C…)
- Alarm-Richtwerte GA (Übersicht typische Grenzwerte — Ergänzung zum Alarmmanagement-Artikel)

### 4. Checklisten

Vorausgefüllte Vorlagen → CSV-Export → Excel.

- IBN Heizung
- IBN Lüftung / RLT
- IBN Kältemaschine
- IBN Sanitär (Legionellenschutz)
- GLT-Übergabe an Betreiber (Abnahmepunkte, Unterlagen, Schulungsthemen)
- KNX-Inbetriebnahme (ETS-Schritte, Gruppenadress-Test, Parametrierung)
- DALI-Inbetriebnahme (Adressierung, Gruppen, Szenen, Notlicht)
- Netzwerk GA-System (VLAN, Firewall-Regeln, IP-Schema, DNS)
- Datenpunktlisten-Review / -Abnahme (Vollständigkeit, Namenskonventionen, Ranges)
- Funktionstest-Protokoll (Regelkreise einzeln prüfen, Sollwerttest, Alarmtest)

### 5. Abkürzungsverzeichnis

Durchsuchbar, filterbar, verlinkt mit Artikeln.

**Bilinguales Konzept-Gruppen-System:**

- Jede Abkürzung hat eine optionale Sprache: `de` (default), `en`, `intl`
- Eine separate Datenstruktur `conceptGroups: string[][]` gruppiert Kürzel die *dieselbe* Sache meinen
  - Beispiel: `['GLT', 'BMS']` — die deutsche Abkürzung GLT und die englische BMS stehen für Building Management System
  - Beispiel: `['BHKW', 'KWK', 'CHP']` — drei Kürzel, ein Konzept
- Helper `equivalentShorts(short)` liefert automatisch alle anderen Mitglieder einer Gruppe — **bidirektional ohne doppelte Pflege**
- UI zeigt die Equivalents prominent in einer Box „Auch:" pro Karte, mit Flagge + Kürzel + Langform
- Klick auf Equivalent: scrollt zur entsprechenden Karte (clear filters wenn nötig)
- **Erweiterbar auf weitere Sprachen** (FR, IT, …) durch Hinzufügen weiterer Mitglieder zu Gruppen und Sprach-Override im `langMap`

**Datenmodell (vereinfacht):**

```ts
type AbbrLang = 'de' | 'en' | 'intl';

interface Abbreviation {
  short: string;        // 'GLT' / 'BMS'
  long: string;         // 'Gebäudeleittechnik' / 'Building Management System'
  lang?: AbbrLang;      // default 'de'
  description?: string;
  areas: Area[];        // ['ga', 'it']
  related?: string[];   // lose Beziehung (nicht Übersetzung)
  wissenSlug?: string;  // Link zu Wissensartikel
}

const conceptGroups: string[][] = [
  ['GLT', 'BMS'],
  ['SPS', 'PLC'],
  ['HLK', 'HVAC'],
  ['FU', 'VFD'],
  ['FBH', 'UFH'],
  // ...
];
```

### 6. Rechner

Ingenieurstechnische Berechnungen — Eingabe rein, Ergebnis raus, deep-linkbar.
Alles clientseitig. Zwischenschritte sichtbar (nachvollziehbar).

- **Heizkurven-Rechner** — Vorlauftemp aus Aussentemp, Hersteller wählbar:
  - *Siemens DESIGO / RVS / RVA*: Neigung (0.2–3.5) + Niveau ± 15 K + Normaussentemp
  - *Viessmann (Vitotronic)*: Neigung + Niveau, eigene Kurvencharakteristik
  - *Buderus / Bosch*: Steilheit (0.2–4.0) + Niveau
  - *Honeywell / Resideo*: 2-Punkte-Methode (TA₁→TV₁, TA₂→TV₂) — kein Steigungswert
  - *Sauter*: Neigung + Fußpunkt
  - *Generisch / Physikalisch*: `TV = T_Raum + (T_Raum − T_Norm_A) × s`
  - Einstellhilfe: Grenztemperatur (Heizbeginn), Max/Min Vorlauf, Parallelverschiebung
  - Grafische Kurvenanzeige (SVG), Normaussentemp nach CH-Ort wählbar
- **Kv-Wert Rechner** — Kv aus Δp + Durchfluss; oder Δp bei gegebenem Kv + Q
- **Ausdehnungsgefäss-Rechner** — Volumen aus Systeminhalt + Vor-/Enddruck
- **Druckverlust-Rohrnetz** — R [Pa/m] × L + Zeta → Gesamtdruckverlust, DN-Auswahl
- **Luftbedarf-Rechner** — nach Raumgrösse + Personenzahl + CO₂-Ziel (EN 16798), Route `/rechner/luftbedarf`
- **Taupunkt-Rechner** — aus Raumtemperatur + rel. Feuchte → Taupunkt + Warnung Kondensat
- **Wärmeleistung-Rechner** — Q = ṁ × cp × ΔT (Heizung/Kühlung/WMZ-Auslegung)
- **Psychrometrie / h-x Rechner** — Zustandsgrössen feuchte Luft (h, x, T, rF, Taupunkt)

---

## Auth / User

- Login mit Email + Passwort (better-auth)
- Session-basiert (SQLite)
- Rollen: **Admin** + **User**
- Erstmal: eigener Account, erweiterbar für Kollegen

---

## User-Profil (`/profil`)

Eigene Seite mit Profil-Daten und Übersicht — **kein Profilbild**, fachlich orientiert.

### Profil-Felder (alle optional, in DB gespeichert)

| Feld          | Typ      | Zweck / Effekt im Tool                                                                                |
|---------------|----------|-------------------------------------------------------------------------------------------------------|
| `name`        | string   | Anzeigename (von Auth, editierbar)                                                                    |
| `role`        | enum     | Servicetechniker / Projektleiter / Inbetriebnehmer / Planer / Lernender / Andere                      |
| `company`     | string   | Firma / Arbeitgeber                                                                                   |
| `disciplines` | string[] | Fachbereiche: HLK / Sanitär / Elektro / GA / IT / Normen — beeinflusst Wissens-Filter                 |
| `mfrPrefs`    | string[] | Bevorzugte Hersteller (Siemens/Viessmann/Buderus/Honeywell/Sauter/SE) — Default im Heizkurven-Rechner |
| `defaultCity` | string   | Standard-Standort (CH-Stadt) → setzt Normaussentemp automatisch                                       |
| `notes`       | text     | Eigene Notizen (Markdown erlaubt)                                                                     |

### Übersichts-Tab (`/profil` Startview)

- **Profil-Karte** oben: Name, E-Mail, Rolle, Firma, Fachbereiche-Chips
- **Zuletzt verwendet**: 5–10 letzte Rechner / Konverter / Wissens-Artikel (localStorage)
- **Schnelleinstellungen**: Theme + Sprache direkt im Panel (ergänzt `/settings`)
- **Gespeicherte Berechnungen** (v0.4+): benannte Rechner-Presets z.B. „MAG Schulhaus Stans", per Klick wieder laden

### Smart-Defaults aus Profil

- `defaultCity` → Normaussentemp im Heizkurven-Rechner
- `mfrPrefs[0]` → vorausgewählter Hersteller im Heizkurven-Rechner
- `disciplines` → Pre-Filter in `/wissen`

### DB-Schema (Erweiterung User-Tabelle)

via `better-auth` `additionalFields`:

```ts
role: text                   // bereits da (admin/user)
profileRole: text            // neu: berufliche Rolle
company: text
disciplines: text (json[])
mfrPrefs: text (json[])
defaultCity: text
notes: text
```

---

## Content / Collaboration

Inhalte sind Markdown-Dateien im GitHub-Repo.

- Neue Artikel: Datei erstellen → PR → Merge → live
- Mitautoren: Fork oder Contributor-Zugang → PR → Review → Merge
- Kein Admin-CMS — Git ist das CMS
- Später: GitHub Actions für Auto-Deploy bei Push auf `main`

---

## Cookie Banner

Nur Session-Cookies für Auth — kein Tracking, kein Analytics.
Kein Banner nötig (CH nDSG), aber kleiner Hinweis beim ersten Login.

---

## Versionierung / Changelog

- Version sichtbar im Footer + Settings
- `/changelog` Seite (CHANGELOG.md)
- Semantic Versioning: `MAJOR.MINOR.PATCH`
- "Was ist neu?" Banner nach Update (dismissable)

---

## PWA

- `manifest.webmanifest` + Icons
- Service Worker (Offline-Cache — wichtig auf der Baustelle)
- "Zu Homescreen hinzufügen" auf iOS/Android

---

## Settings

- Theme (Auto / Light / Dark / OLED)
- Sprache (DE / EN / …)
- Standard-Einheiten Konverter
- Normaussentemp-Ort (für Heizkurven-Rechner — Ort aus Liste wählen, z.B. Zürich −8 °C)
- Alles in `localStorage`

---

## Keyboard Shortcuts

| Shortcut   | Aktion                                          |
|------------|-------------------------------------------------|
| `Ctrl+K`   | Globale Suche öffnen                            |
| `Esc`      | Modal / Suche schliessen                        |
| `1`        | Home                                            |
| `2`        | Konverter                                       |
| `3`        | Rechner                                         |
| `4`        | Wissensbasis                                    |
| `5`        | Checklisten                                     |
| `6`        | Referenz                                        |
| `7`        | Abkürzungen                                     |

---

## Simulationen (v2)

### PID-Simulator

- P, I, D per Slider
- Sprungantwort live (SVG-Chart)
- Verschiedene Strecken wählbar (träge Heizung, schnelle Lüftung)

### Hydraulik-Simulator

- Schaltungen interaktiv (Einrohr, Zweirohr, Bypass)
- Ventilstellung → Durchfluss/Druck sichtbar

### Weitere (v3)

- Psychrometrie h-x Diagramm (Lüftung/Klima)
- Kältemaschinen log p-h Diagramm
- Wärmepumpen-Simulator (JAZ-Berechnung)

---

## Versionen

### v0.0.1 — Grundgerüst (Start)

- SvelteKit + better-sqlite3 + better-auth
- Auth (Login/Logout, Rollen: Admin + User)
- Sidebar-Navigation (Desktop) + Mobile Bottom-Nav
- Theme-System (Auto/Light/Dark/OLED)
- i18n (DE + EN)
- Dashboard (Startseite mit Kacheln)
- Settings-Seite

### v0.1 — Konverter

- Alle GA-Konverter, Favoriten, Copy-Button

### v0.2 — Rechner

- Heizkurven-Rechner (alle Hersteller, grafische Kurve)
- Kv-Wert Rechner, Taupunkt-Rechner, Wärmeleistung-Rechner
- Ausdehnungsgefäss, Druckverlust, Luftmengen-Rechner
- Psychrometrie / h-x Rechner

### v0.4 — Wissensbasis + Suche

- Artikel-System mit Frontmatter
- Erste Artikel (PID, Legionellen, Hydraulik, Signale, BACnet/Modbus, Alarmmanagement)
- Fuse.js Volltextsuche + Filter

### v0.5 — Abkürzungen + Referenz

- Abkürzungsverzeichnis (durchsuchbar)
- Referenz-Tabellen (inkl. DN-Tabelle, Modbus-Codes, BACnet-Objekte, Alarmgrenzen)

### v0.6 — Checklisten + PWA

- Checklisten + CSV-Export (IBN, GLT-Übergabe, KNX, DALI, Netzwerk, Funktionstest)
- Service Worker, Manifest
- Print-CSS, Keyboard Shortcuts, Changelog

### v1.0 — Launch

- Alle Basis-Module vollständig
- Sauberes Design, polished

### v2.0 — Simulationen

- PID-Simulator, Hydraulik-Simulator

### v3.0 — Erweitert

- Psychrometrie, Kälte-Diagramme
- Wärmepumpen-Simulator
