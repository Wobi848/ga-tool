---
title: TAB-Protokoll — Technische Abnahme Betrieb
title_en: TAB Protocol — Technical Commissioning Acceptance
slug: tab-protokoll
category: dokumentation
subcategory: ibn
tags:
  [
    tab,
    technische-abnahme,
    abnahme,
    protokoll,
    inbetriebnahme,
    übergabe,
    mängel,
    prüfung,
    regelkreis,
    alarm,
    visualisierung,
    dokumentation,
    funktionstest,
    abnahmeliste
  ]
difficulty: fortgeschritten
area: [ga]
related: [datenpunktliste, glt-grundlagen, alarmmanagement]
norm: [VDI 3814, SIA 386.110, SIA 118]
updated: 2026-05-14
lang: de
---

# TAB-Protokoll — Technische Abnahme Betrieb

Das **TAB-Protokoll** (Technische Abnahme Betrieb) ist das abschliessende Dokument der Gebäudeautomation-Inbetriebnahme. Es belegt dass alle Datenpunkte, Funktionen und Alarme geprüft und freigegeben wurden.

## Zweck des TAB-Protokolls

```
IBN fertig → TAB-Protokoll erstellen → Übergabe an Betreiber
                      ↑
              Beweisdokument:
              - Alles wurde geprüft
              - Wer hat was freigegeben
              - Offene Mängel dokumentiert
              - Grundlage für Abschlag-/Schlusszahlung
```

---

## Inhalt eines TAB-Protokolls

### Teil 1: Projektdaten

```
Projekt:          Neubau Verwaltungsgebäude Muster AG
Adresse:          Musterstrasse 1, 3000 Bern
IBN-Verantwortlicher: Max Mustermann, GA-Firma AG
Bauherr-Vertreter:    Maria Muster, Muster AG
Datum IBN:        12.05.2026 – 14.05.2026
Datum TAB:        14.05.2026
GA-System:        Siemens Desigo CC + PXC-Controller
Protokoll-Nr.:    TAB-2026-001
```

### Teil 2: Datenpunktliste mit Abnahme-Status

Jeder DPL-Eintrag wird abgehakt:

| ID               | Typ | Beschreibung            | Messwert | OK  | Bemerkung      |
| ---------------- | --- | ----------------------- | -------- | --- | -------------- |
| HZG-K1-VL-T-IST  | AI  | Vorlauftemp Heizkreis 1 | 45.3 °C  | ✓   |                |
| HZG-K1-P1-EIN    | DO  | Pumpe HK1 EIN/AUS       | EIN      | ✓   |                |
| HZG-K1-P1-LFG    | DI  | Pumpe HK1 Laufmeldung   | 1        | ✓   |                |
| HZG-K1-P1-STR    | DI  | Pumpe HK1 Störmeldung   | 0        | ✓   |                |
| LFT-RLT1-FA1-STR | DI  | Filter-Alarm RLT1       | 0        | ✗   | Filter neu, OK |

### Teil 3: Regelkreise

| Regelkreis             | Sollwert | Istwert | Abweichung | OK  | Bemerkung          |
| ---------------------- | -------- | ------- | ---------- | --- | ------------------ |
| Raumtemperatur EG Ost  | 22.0 °C  | 21.8 °C | −0.2 K     | ✓   | Innerhalb Toleranz |
| Vorlauf HK1            | 45.0 °C  | 44.9 °C | −0.1 K     | ✓   |                    |
| Zuluft RLT1            | 18.0 °C  | 18.5 °C | +0.5 K     | ✓   | OK                 |
| Differenzdruck Lüftung | 100 Pa   | 98 Pa   | −2 Pa      | ✓   |                    |

### Teil 4: Alarmprüfung

Jeder Alarm wird bewusst ausgelöst und geprüft:

| Alarm                   | Auslösung             | Meldung in GLT   | Eskalation | OK  |
| ----------------------- | --------------------- | ---------------- | ---------- | --- |
| Pumpe HK1 Störung       | Motorschutz ausgelöst | Kritisch → Email | −          | ✓   |
| Frostschutz RLT1        | Zuluft T < 5 °C       | Kritisch         | SMS        | ✓   |
| Filter verschmutzt RLT1 | Δp > 300 Pa           | Mittel           | −          | ✓   |
| Kommunikation DDC-01    | LAN-Kabel ziehen      | Hoch → 60s       | −          | ✓   |

### Teil 5: Visualisierung

Prüfung der GLT-Visualisierung:

| Bild               | Datenpunkte sichtbar | Aktuell | OK  |
| ------------------ | -------------------- | ------- | --- |
| Übersicht Heizung  | ✓                    | ✓       | ✓   |
| Detail Heizkreis 1 | ✓                    | ✓       | ✓   |
| Alarmliste         | ✓                    | ✓       | ✓   |
| Trendbilder        | ✓ (7 Trends)         | ✓       | ✓   |
| Zeitprogramme      | ✓                    | ✓       | ✓   |

### Teil 6: Dokumentation-Checkliste

- [ ] Datenpunktliste aktuell (As-Built)
- [ ] Schemen aktuell (R&I, Elektro)
- [ ] DDC-Programm-Backup (gesichert + abgegeben)
- [ ] GLT-Konfiguration Backup
- [ ] Passwörter-Dokument an Bauherrschaft
- [ ] Bedienungsanleitung GLT
- [ ] Anleitungen Feldinstrumente

### Teil 7: Mängelliste

| Nr. | Mangel                         | Verantwortlich | Termin     | Status |
| --- | ------------------------------ | -------------- | ---------- | ------ |
| 1   | Präsenzmelder Büro 205 falsch  | GA-Firma AG    | 28.05.2026 | Offen  |
| 2   | Trend Aussentemp fehlt in GLT  | GA-Firma AG    | 21.05.2026 | Offen  |
| 3   | Bedienungsanleitung ausstehend | GA-Firma AG    | 30.05.2026 | Offen  |

---

## Unterschriften

```
Inbetriebnahme abgenommen mit offenen Mängeln (siehe Mängelliste):

Inbetriebnehmer: _______________  Datum: 14.05.2026
                 Max Mustermann

Bauherr-Vertreter: _____________  Datum: 14.05.2026
                   Maria Muster
```

---

## Normen

- **VDI 3814** — GA, Abnahme und Übergabe
- **SIA 386.110** — GA-Norm Schweiz (Abnahmeanforderungen)
- **SIA 118** — Allgemeine Bedingungen für Bauarbeiten (Abnahme-Regelung)

<!-- EN -->

The **TAB protocol** (Technische Abnahme Betrieb — Technical Commissioning Acceptance) is the final document of a building automation commissioning. It proves that all data points, functions, and alarms have been tested and accepted.

## Purpose of the TAB Protocol

```
Commissioning complete → create TAB protocol → handover to operator
                                 ↑
                        Evidence document:
                        - Everything was tested
                        - Who approved what
                        - Open defects documented
                        - Basis for final payment
```

---

## Contents of a TAB Protocol

### Part 1: Project Data

```
Project:            New office building, Sample AG
Address:            Sample Street 1, 3000 Bern
Commissioning lead: Max Sample, BA Company Ltd
Client representative: Maria Sample, Sample AG
Commissioning date: 12.05.2026 – 14.05.2026
TAB date:           14.05.2026
BA system:          Siemens Desigo CC + PXC controllers
Protocol no.:       TAB-2026-001
```

### Part 2: Data Point List with Acceptance Status

Each DPL entry is checked off:

| ID               | Type | Description                 | Reading | OK  | Note           |
| ---------------- | ---- | --------------------------- | ------- | --- | -------------- |
| HTG-C1-FL-T-ACT  | AI   | Flow temp heating circuit 1 | 45.3 °C | ✓   |                |
| HTG-C1-P1-ON     | DO   | Pump HC1 ON/OFF             | ON      | ✓   |                |
| HTG-C1-P1-RUN    | DI   | Pump HC1 run feedback       | 1       | ✓   |                |
| HTG-C1-P1-FLT    | DI   | Pump HC1 fault              | 0       | ✓   |                |
| AHU-RLT1-FA1-FLT | DI   | Filter alarm AHU1           | 0       | ✗   | New filter, OK |

### Part 3: Control Loops

| Control Loop              | Setpoint | Actual  | Deviation | OK  | Notes            |
| ------------------------- | -------- | ------- | --------- | --- | ---------------- |
| Room temp GF East         | 22.0 °C  | 21.8 °C | −0.2 K    | ✓   | Within tolerance |
| Flow temp HC1             | 45.0 °C  | 44.9 °C | −0.1 K    | ✓   |                  |
| Supply air AHU1           | 18.0 °C  | 18.5 °C | +0.5 K    | ✓   | OK               |
| Duct pressure ventilation | 100 Pa   | 98 Pa   | −2 Pa     | ✓   |                  |

### Part 4: Alarm Testing

Each alarm is deliberately triggered and verified:

| Alarm                 | Trigger                  | Message in BMS   | Escalation | OK  |
| --------------------- | ------------------------ | ---------------- | ---------- | --- |
| Pump HC1 fault        | Motor protection tripped | Critical → Email | —          | ✓   |
| Frost protection AHU1 | Supply air T < 5 °C      | Critical         | SMS        | ✓   |
| Filter dirty AHU1     | Δp > 300 Pa              | Medium           | —          | ✓   |
| Communication DDC-01  | LAN cable unplugged      | High → 60 s      | —          | ✓   |

### Part 5: Visualisation

Check of BMS visualisation screens:

| Screen                   | Data points visible | Up to date | OK  |
| ------------------------ | ------------------- | ---------- | --- |
| Heating overview         | ✓                   | ✓          | ✓   |
| Heating circuit 1 detail | ✓                   | ✓          | ✓   |
| Alarm list               | ✓                   | ✓          | ✓   |
| Trend displays           | ✓ (7 trends)        | ✓          | ✓   |
| Time schedules           | ✓                   | ✓          | ✓   |

### Part 6: Documentation Checklist

- [ ] Data point list up to date (as-built)
- [ ] Schematics up to date (P&ID, electrical)
- [ ] DDC program backup (saved and handed over)
- [ ] BMS configuration backup
- [ ] Password document handed to client
- [ ] BMS operating manual
- [ ] Field instrument manuals

### Part 7: Defect List

| No. | Defect                                 | Responsible    | Deadline   | Status |
| --- | -------------------------------------- | -------------- | ---------- | ------ |
| 1   | Presence detector office 205 incorrect | BA Company Ltd | 28.05.2026 | Open   |
| 2   | Outdoor temp trend missing in BMS      | BA Company Ltd | 21.05.2026 | Open   |
| 3   | Operating manual outstanding           | BA Company Ltd | 30.05.2026 | Open   |

---

## Signatures

```
Commissioning accepted with open defects (see defect list):

Commissioning engineer: _______________  Date: 14.05.2026
                        Max Sample

Client representative:  _______________  Date: 14.05.2026
                        Maria Sample
```

---

## Standards

- **VDI 3814** — BA, acceptance and handover
- **SIA 386.110** — BA standard Switzerland (acceptance requirements)
- **SIA 118** — General conditions for construction work (acceptance provisions)
