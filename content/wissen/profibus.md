---
title: PROFIBUS — Prozessfeldbus in der Gebäudetechnik
title_en: PROFIBUS — Process Field Bus in Building Technology
slug: profibus
category: kommunikation
subcategory: feldbus
tags:
  [
    profibus,
    profibus-dp,
    profibus-pa,
    profibus-fms,
    siemens,
    rs-485,
    gsd-datei,
    master-slave,
    prozessdaten,
    diagnose,
    frequenzumrichter,
    antriebe,
    industrie-4-0,
    profinet
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [rs485, modbus, bacnet, frequenzumrichter, ddc-programmierung]
rechner: []
norm: [IEC 61158, IEC 61784, EN 50170]
updated: 2026-05-15
lang: de
---

# PROFIBUS — Prozessfeldbus in der Gebäudetechnik

PROFIBUS (Process Field Bus) ist ein weit verbreiteter industrieller Feldbus, der ab den 1990er-Jahren auch in der technischen Gebäudeausrüstung Einzug hielt — vor allem in grösseren Anlagen mit Siemens-Komponenten. Während PROFIBUS in Neuinstallationen zunehmend von **PROFINET** (Ethernet-basiert) verdrängt wird, ist er im Bestand noch sehr präsent.

---

## PROFIBUS-Varianten

### PROFIBUS DP (Decentralized Periphery) — GA-relevant

Schnelles Austauschen von Prozessdaten zwischen Steuerungen und dezentralen E/A-Baugruppen. In der GA für die Anbindung von Frequenzumrichtern, Motorsteuerungen und dezentralen DDC-Baugruppen verwendet.

### PROFIBUS PA (Process Automation) — selten in GA

Für eigensichere Bereiche (Ex-Zonen). Nutzt MBP-Übertragungstechnik (Manchester Bus Powered), bei der die Feldgeräte über die Busleitung gespeist werden. In der GA kaum relevant.

### PROFIBUS FMS (Fieldbus Message Specification)

Veraltet, heute nicht mehr relevant.

---

## Physikalische Schicht PROFIBUS DP

PROFIBUS DP basiert auf **RS-485** (EIA-485):

| Parameter            | Wert                                     |
| -------------------- | ---------------------------------------- |
| Leitung              | 2-Draht, verdrilltes Paar, geschirmt     |
| Abschlusswiderstände | 220 Ω (aktiv, im Stecker integriert)     |
| Max. Teilnehmer      | 126 (Adresse 0–125)                      |
| Segmente             | Max. 9 (mit 8 Repeatern)                 |
| Segment-Länge        | 100 m (12 Mbit/s) bis 1200 m (9,6 kBaud) |

### Baudrate vs. Segmentlänge

| Baudrate    | Max. Segmentlänge |
| ----------- | ----------------- |
| 9,6 kBaud   | 1200 m            |
| 19,2 kBaud  | 1200 m            |
| 93,75 kBaud | 1000 m            |
| 187,5 kBaud | 1000 m            |
| 500 kBaud   | 400 m             |
| 1,5 MBaud   | 200 m             |
| 3–12 MBaud  | 100 m             |

---

## Busarbitration — Token-Passing

PROFIBUS DP verwendet ein **Token-Ring-Verfahren** für Master-Teilnehmer und **Master-Slave-Kommunikation** für den Datenaustausch:

1. Alle Master bilden einen logischen Token-Ring
2. Nur der Master mit dem Token darf aktiv senden
3. Jeder Master fragt zyklisch seine Slaves ab (Polling)
4. Slaves antworten nur auf Anfrage des Masters

---

## GSD-Dateien (Gerätestammdaten)

Jedes PROFIBUS-Gerät wird durch eine **GSD-Datei** (XML-Format) beschrieben:

- Verfügbare Module und E/A-Daten
- Baudratten-Unterstützung
- Diagnose-Informationen
- Parametrierdaten

GSD-Dateien werden vom Hersteller bereitgestellt und in das Engineering-Tool importiert (z.B. Siemens TIA Portal, Step 7).

---

## PROFIBUS DP in der GA — typische Anwendungen

### Frequenzumrichter-Anbindung

Der häufigste Anwendungsfall in der GA: Lüftungs- und Pumpenantriebe werden via PROFIBUS DP an die DDC angebunden.

```
Simatic S7 / PCS 7 (Master)
        │
   PROFIBUS DP (RS-485, 500 kBaud)
        ├── Siemens SINAMICS G120 (Lüftungsantrieb)
        ├── Siemens SINAMICS S120 (Pumpenantrieb)
        ├── ABB ACS880 (Kompressor)
        └── Dezentrale ET200 E/A-Baugruppe
```

### Gebäudeleittechnik Siemens Desigo

In älteren Siemens-Desigo-Anlagen kommuniziert die GLT via PROFIBUS DP mit:

- PXC Automation Station
- FLN-Field Level Network (PROFIBUS-basiert)
- Dezentralen MEC-Aktoren

---

## Diagnose und Fehlersuche

### Busdiagnose

PROFIBUS DP bietet eine integrierte Diagnosefunktion — jeder Slave meldet Fehler aktiv zurück:

- **Station Status 1–3:** Gerätezustand (Konfiguration, Parametrierung, Kommunikation)
- **Extended Diagnosis:** Gerätespezifische Fehlermeldungen (Übertemperatur, Überlast)
- **Module Status:** Zustand einzelner E/A-Module

### Analyse-Tools

- **Siemens STEP 7 / TIA Portal** — integrierte Online-Diagnose
- **Softing PROFIBUS Tester 6** — professionelles Analyse-Tool
- **ProfiTrace (Procentec)** — portabler Busanalysator
- **Multimeter** — Spannungsprüfung (A−B Differenz)

### Häufige Fehler

| Fehler                     | Ursache                       | Massnahme                                    |
| -------------------------- | ----------------------------- | -------------------------------------------- |
| Slave nicht erreichbar     | Adresse falsch                | Adresse am Gerät prüfen                      |
| Sporadische Ausfälle       | Fehlende Abschlusswiderstände | Aktive Abschlüsse in Bus-Steckern aktivieren |
| Gerät meldet Config-Fehler | GSD-Version falsch            | GSD-Datei erneuern                           |
| Hohe Zykluszeit            | Zu viele Slaves               | Baudrate erhöhen, Segmentierung              |
| EMV-Störungen              | Schirmung fehlerhaft          | Schirm einseitig am Master erden             |

---

## PROFIBUS → PROFINET Migration

Neue Anlagen werden heute fast ausschliesslich mit **PROFINET** (Ethernet-basiert, IEC 61158) projektiert. Für den Bestand:

| Szenario                                | Empfehlung                                   |
| --------------------------------------- | -------------------------------------------- |
| Neue Anlage                             | PROFINET wählen                              |
| Erweiterung bestehender PROFIBUS-Anlage | PROFIBUS beibehalten (IE/PB Link als Brücke) |
| Altanlage mit Problemen                 | Migration zu PROFINET evaluieren             |
| Geräteaustausch                         | PROFIBUS-Gerät als Drop-in falls verfügbar   |

PROFIBUS → PROFINET Proxy/Gateway: Siemens IE/PB Link PN IO oder Softing Gateway ermöglichen die Integration bestehender PROFIBUS-Geräte in neue PROFINET-Netze.

<!-- EN -->

PROFIBUS (Process Field Bus) is a widely used industrial fieldbus that entered technical building services from the 1990s onwards — particularly in larger installations with Siemens components. While PROFIBUS is increasingly being displaced by **PROFINET** (Ethernet-based) in new installations, it remains very present in existing buildings.

---

## PROFIBUS Variants

### PROFIBUS DP (Decentralised Periphery) — BA-relevant

Fast exchange of process data between controllers and decentralised I/O modules. In BA used for connecting variable speed drives, motor controllers, and decentralised DDC I/O modules.

### PROFIBUS PA (Process Automation) — rare in BA

For intrinsically safe areas (Ex zones). Uses MBP transmission technology (Manchester Bus Powered), where field devices are powered via the bus cable. Rarely relevant in BA.

### PROFIBUS FMS (Fieldbus Message Specification)

Obsolete, no longer relevant today.

---

## Physical Layer — PROFIBUS DP

PROFIBUS DP is based on **RS-485** (EIA-485):

| Parameter             | Value                                    |
| --------------------- | ---------------------------------------- |
| Cable                 | 2-wire, twisted pair, shielded           |
| Termination resistors | 220 Ω (active, integrated in connector)  |
| Max. participants     | 126 (address 0–125)                      |
| Segments              | Max. 9 (with 8 repeaters)                |
| Segment length        | 100 m (12 Mbit/s) to 1,200 m (9.6 kBaud) |

### Baud Rate vs. Segment Length

| Baud rate   | Max. segment length |
| ----------- | ------------------- |
| 9.6 kBaud   | 1,200 m             |
| 19.2 kBaud  | 1,200 m             |
| 93.75 kBaud | 1,000 m             |
| 187.5 kBaud | 1,000 m             |
| 500 kBaud   | 400 m               |
| 1.5 MBaud   | 200 m               |
| 3–12 MBaud  | 100 m               |

---

## Bus Arbitration — Token Passing

PROFIBUS DP uses a **token ring procedure** for master participants and **master-slave communication** for data exchange:

1. All masters form a logical token ring
2. Only the master holding the token may actively transmit
3. Each master cyclically polls its slaves
4. Slaves respond only on request from the master

---

## GSD Files (Device Master Data)

Every PROFIBUS device is described by a **GSD file** (XML format):

- Available modules and I/O data
- Supported baud rates
- Diagnostic information
- Parameter data

GSD files are supplied by the manufacturer and imported into the engineering tool (e.g. Siemens TIA Portal, Step 7).

---

## PROFIBUS DP in BA — Typical Applications

### Variable Speed Drive Integration

The most common use case in BA: ventilation and pump drives are connected to the DDC via PROFIBUS DP.

```
Simatic S7 / PCS 7 (master)
        │
   PROFIBUS DP (RS-485, 500 kBaud)
        ├── Siemens SINAMICS G120 (ventilation drive)
        ├── Siemens SINAMICS S120 (pump drive)
        ├── ABB ACS880 (compressor)
        └── Decentralised ET200 I/O module
```

### Building Management — Siemens Desigo

In older Siemens Desigo installations the BMS communicates via PROFIBUS DP with:

- PXC automation station
- FLN field level network (PROFIBUS-based)
- Decentralised MEC actuators

---

## Diagnostics and Troubleshooting

### Bus Diagnostics

PROFIBUS DP has an integrated diagnostics function — each slave actively reports faults:

- **Station Status 1–3:** Device state (configuration, parameterisation, communication)
- **Extended Diagnosis:** Device-specific fault messages (overtemperature, overload)
- **Module Status:** State of individual I/O modules

### Analysis Tools

- **Siemens STEP 7 / TIA Portal** — integrated online diagnostics
- **Softing PROFIBUS Tester 6** — professional analysis tool
- **ProfiTrace (Procentec)** — portable bus analyser
- **Multimeter** — voltage check (A−B differential)

### Common Faults

| Fault                       | Cause                         | Remedy                                        |
| --------------------------- | ----------------------------- | --------------------------------------------- |
| Slave unreachable           | Wrong address                 | Check address on device                       |
| Sporadic dropouts           | Missing termination resistors | Activate active termination in bus connectors |
| Device reports config error | Wrong GSD version             | Renew GSD file                                |
| High cycle time             | Too many slaves               | Increase baud rate, segment network           |
| EMC interference            | Incorrect shielding           | Ground shield at master end only              |

---

## PROFIBUS → PROFINET Migration

New installations today are almost exclusively engineered with **PROFINET** (Ethernet-based, IEC 61158). For existing systems:

| Scenario                                 | Recommendation                          |
| ---------------------------------------- | --------------------------------------- |
| New installation                         | Choose PROFINET                         |
| Extending existing PROFIBUS installation | Keep PROFIBUS (IE/PB Link as bridge)    |
| Legacy system with problems              | Evaluate migration to PROFINET          |
| Device replacement                       | PROFIBUS device as drop-in if available |

PROFIBUS → PROFINET proxy/gateway: Siemens IE/PB Link PN IO or Softing Gateway enable integration of existing PROFIBUS devices into new PROFINET networks.
