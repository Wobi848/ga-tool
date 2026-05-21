---
title: Datenpunktliste (DPL) — Aufbau und Namenskonventionen
title_en: Data Point List (DPL) — Structure and Naming Conventions
slug: datenpunktliste
category: dokumentation
subcategory: ibn
tags:
  [
    datenpunktliste,
    dpl,
    namenskonventionen,
    msr-kürzel,
    tag,
    datapoint,
    bacnet,
    modbus,
    ibn,
    dokumentation,
    schnittstelle,
    planungsunterlage,
    abnahme
  ]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, bacnet, modbus, signaltypen, alarmmanagement]
norm: [VDI 3814, SIA 386.110, AMEV]
updated: 2026-05-14
lang: de
---

# Datenpunktliste (DPL) — Aufbau und Namenskonventionen

Die **Datenpunktliste (DPL)** ist das zentrale Dokument der Gebäudeautomation. Sie beschreibt jeden Datenpunkt der Anlage — was gemessen wird, wo es sich befindet, welches Signal es ist und wie es heisst. Ohne saubere DPL: Chaos bei IBN, Übergabe und Betrieb.

## Was ist ein Datenpunkt?

Ein Datenpunkt ist jede messbare, steuerbare oder überwachbare Grösse:

- Temperaturfühler → **AI** (Analog Input)
- Pumpen-Einschaltbefehl → **DO** (Digital Output)
- Ventilstellung → **AO** (Analog Output)
- Störmeldung → **DI** (Digital Input)
- Berechneter Wert → **AV/BV** (Analog/Binary Value, nur in Software)

---

## Aufbau einer DPL

### Pflichtfelder pro Datenpunkt

| Feld              | Beispiel                      | Beschreibung                       |
| ----------------- | ----------------------------- | ---------------------------------- |
| **ID / Tag**      | `HZG-K1-VL-T-IST`             | Eindeutige Bezeichnung             |
| **Signaltyp**     | AI                            | AI / AO / DI / DO / AV / BV        |
| **Einheit**       | °C                            | °C, bar, %, m³/h, kW, —            |
| **Bereich**       | −10 … 120                     | Physikalischer Bereich des Signals |
| **Protokoll**     | BACnet                        | BACnet / Modbus / KNX / physisch   |
| **Adresse**       | AI 1 (Instanz 1)              | Protokoll-spezifische Adresse      |
| **Anlage/System** | Heizung                       | Funktionsbereich                   |
| **Beschreibung**  | Vorlauftemperatur Heizkreis 1 | Klartextbeschreibung               |
| **Alarmgrenzen**  | Warnung 80 °C / Alarm 90 °C   | Optional aber empfohlen            |
| **GLT-Sichtbar**  | Ja                            | Erscheint in Visualisierung?       |
| **Trending**      | 15 min / COV                  | Historisierung?                    |

### Empfohlene Zusatzfelder

| Feld                 | Beschreibung                         |
| -------------------- | ------------------------------------ |
| IBN-Status           | Geplant / Verdrahtet / Getestet / OK |
| Schaltschrank        | Welcher UVT, welche Klemme           |
| Kabelbezeichnung     | Kabelliste-Referenz                  |
| Hersteller/Typ       | Sensortyp für Wartung                |
| Inbetriebnahme-Datum | Wann getestet                        |

---

## Namenskonventionen

### Schema: System-Kreis-Komponente-Signalart-Messgrösse

**Beispiel:** `HZG-K1-VL-T-IST`

| Teil   | Kürzel | Bedeutung  |
| ------ | ------ | ---------- |
| System | HZG    | Heizung    |
| Kreis  | K1     | Kreis 1    |
| Komp.  | VL     | Vorlauf    |
| Signal | T      | Temperatur |
| Art    | IST    | Istwert    |

### Häufige Systemkürzel

| Kürzel | System                         |
| ------ | ------------------------------ |
| HZG    | Heizung                        |
| KLT    | Kälte / Kühlung                |
| LFT    | Lüftung / RLT                  |
| SAN    | Sanitär / Warmwasser           |
| ELT    | Elektro / Beleuchtung          |
| BSC    | Beschattung                    |
| BSK    | Brandschutzklappe              |
| SIC    | Sicherheit / Zutrittskontrolle |
| EMS    | Energie / Zähler               |

### Häufige Signalkürzel

| Kürzel | Bedeutung            |
| ------ | -------------------- |
| T      | Temperatur           |
| P      | Druck                |
| F      | Durchfluss (Flow)    |
| H      | Feuchte (Humidity)   |
| L      | Licht / Helligkeit   |
| Q      | Wärmemenge / Energie |
| S      | Status / Störmeldung |
| Z      | Zähler               |

### Häufige Artenkürzel

| Kürzel | Bedeutung           |
| ------ | ------------------- |
| IST    | Istwert             |
| SOLL   | Sollwert            |
| EIN    | Einschaltsignal     |
| AUS    | Ausschaltsignal     |
| STR    | Störung             |
| LFG    | Laufmeldung (läuft) |
| HND    | Handstellung        |
| AUTO   | Automatikmeldung    |

---

## Beispiel-DPL (Heizkreis)

| ID                | Typ | Einheit | Protokoll | Adresse | Beschreibung                    |
| ----------------- | --- | ------- | --------- | ------- | ------------------------------- |
| HZG-K1-VL-T-IST   | AI  | °C      | BACnet    | AI 1    | Vorlauftemperatur Heizkreis 1   |
| HZG-K1-RL-T-IST   | AI  | °C      | BACnet    | AI 2    | Rücklauftemperatur Heizkreis 1  |
| HZG-K1-VL-T-SOLL  | AV  | °C      | BACnet    | AV 1    | Vorlauf-Sollwert (berechnet)    |
| HZG-K1-MV-SOLL    | AO  | %       | BACnet    | AO 1    | Mischventil Heizkreis 1 (0–10V) |
| HZG-K1-P1-EIN     | DO  | —       | BACnet    | BO 1    | Pumpe Heizkreis 1 EIN/AUS       |
| HZG-K1-P1-LFG     | DI  | —       | BACnet    | BI 1    | Pumpe Heizkreis 1 Laufmeldung   |
| HZG-K1-P1-STR     | DI  | —       | BACnet    | BI 2    | Pumpe Heizkreis 1 Störmeldung   |
| HZG-K1-T-SOLL-ABS | AV  | °C      | BACnet    | AV 2    | Vorlauf-Sollwert absolut (GLT)  |

---

## IBN-Status in der DPL

Die DPL ist auch Checkliste für die Inbetriebnahme:

| Status           | Bedeutung                                 |
| ---------------- | ----------------------------------------- |
| **Geplant**      | In DPL eingetragen, noch nicht verdrahtet |
| **Verdrahtet**   | Kabel liegt, noch nicht an DDC            |
| **Konfiguriert** | Adresse vergeben, DDC parametriert        |
| **Getestet**     | Messwert stimmt, Signal verifiziert       |
| **OK**           | Vollständig abgenommen                    |
| **Defekt**       | Sensor defekt, Ersatz nötig               |

---

## Datenpunkt-Qualität und Grenzwerte

Jeder analoge Datenpunkt sollte Grenzwerte für Plausibilitätsprüfung haben:

```
Datenpunkt: Aussentemperatur
  Physikalischer Bereich: −40 … +60 °C (PT1000 Bereich)
  Plausibel: −25 … +45 °C (realistischer Wertebereich CH)
  Alarm Untergrenze: −25 °C (Frostwarnung)
  Alarm Obergrenze: +40 °C (ungewöhnlich, Sensor prüfen)
  Fühlerbruch-Erkennung: < −40 °C oder > 100 °C = Kabelbruch
```

## Normen

- **VDI 3814** — Gebäudeautomation, MSR-Technik (Datenpunktstruktur)
- **SIA 386.110** (CH) — Gebäudeautomation
- **AMEV BACnet** — Empfehlung für BACnet-Datenpunkte in öffentlichen Gebäuden
- **VDI/VDE 3699** — Prozessführung mit Bildschirmen (Datenpunkt-Visualisierung)

<!-- EN -->

The **data point list (DPL)** is the central document in building automation. It describes every data point in the installation — what is measured, where it is located, what signal type it is, and what it is called. Without a clean DPL: chaos during commissioning, handover, and operation.

## What Is a Data Point?

A data point is any measurable, controllable, or monitored quantity:

- Temperature sensor → **AI** (Analogue Input)
- Pump start command → **DO** (Digital Output)
- Valve position → **AO** (Analogue Output)
- Fault signal → **DI** (Digital Input)
- Calculated value → **AV/BV** (Analogue/Binary Value, software only)

---

## DPL Structure

### Mandatory Fields per Data Point

| Field            | Example                              | Description                      |
| ---------------- | ------------------------------------ | -------------------------------- |
| **ID / Tag**     | `HTG-C1-SUP-T-ACT`                   | Unique identifier                |
| **Signal type**  | AI                                   | AI / AO / DI / DO / AV / BV      |
| **Unit**         | °C                                   | °C, bar, %, m³/h, kW, —          |
| **Range**        | −10 … 120                            | Physical signal range            |
| **Protocol**     | BACnet                               | BACnet / Modbus / KNX / physical |
| **Address**      | AI 1 (instance 1)                    | Protocol-specific address        |
| **System**       | Heating                              | Functional area                  |
| **Description**  | Supply temperature heating circuit 1 | Plain-text description           |
| **Alarm limits** | Warning 80 °C / Alarm 90 °C          | Optional but recommended         |
| **BMS visible**  | Yes                                  | Appears in visualisation?        |
| **Trending**     | 15 min / COV                         | Historisation?                   |

### Recommended Additional Fields

| Field              | Description                            |
| ------------------ | -------------------------------------- |
| IBN status         | Planned / Wired / Tested / OK          |
| Control panel      | Which sub-distribution, which terminal |
| Cable designation  | Cable schedule reference               |
| Manufacturer/type  | Sensor type for maintenance            |
| Commissioning date | When tested                            |

---

## Naming Conventions

### Pattern: System-Circuit-Component-Signal-Measure

**Example:** `HTG-C1-SUP-T-ACT`

| Part      | Abbreviation | Meaning      |
| --------- | ------------ | ------------ |
| System    | HTG          | Heating      |
| Circuit   | C1           | Circuit 1    |
| Component | SUP          | Supply       |
| Signal    | T            | Temperature  |
| Type      | ACT          | Actual value |

### Common System Abbreviations

| Abbrev. | System                        |
| ------- | ----------------------------- |
| HTG     | Heating                       |
| CLG     | Cooling / refrigeration       |
| VNT     | Ventilation / AHU             |
| SAN     | Sanitary / domestic hot water |
| LTG     | Electrical / lighting         |
| SHD     | Shading / blinds              |
| FDM     | Fire damper                   |
| SEC     | Security / access control     |
| EMS     | Energy / meters               |

### Common Signal Abbreviations

| Abbrev. | Meaning                |
| ------- | ---------------------- |
| T       | Temperature            |
| P       | Pressure               |
| F       | Flow                   |
| H       | Humidity               |
| L       | Light / illuminance    |
| Q       | Heat quantity / energy |
| S       | Status / fault         |
| Z       | Counter                |

### Common Type Abbreviations

| Abbrev. | Meaning         |
| ------- | --------------- |
| ACT     | Actual value    |
| SP      | Setpoint        |
| ON      | Start signal    |
| OFF     | Stop signal     |
| FLT     | Fault           |
| RUN     | Run feedback    |
| MAN     | Manual position |
| AUTO    | Automatic       |

---

## Example DPL (Heating Circuit)

| ID               | Type | Unit | Protocol | Address | Description                          |
| ---------------- | ---- | ---- | -------- | ------- | ------------------------------------ |
| HTG-C1-SUP-T-ACT | AI   | °C   | BACnet   | AI 1    | Supply temperature heating circuit 1 |
| HTG-C1-RET-T-ACT | AI   | °C   | BACnet   | AI 2    | Return temperature heating circuit 1 |
| HTG-C1-SUP-T-SP  | AV   | °C   | BACnet   | AV 1    | Supply setpoint (calculated)         |
| HTG-C1-MV-SP     | AO   | %    | BACnet   | AO 1    | Mixing valve circuit 1 (0–10 V)      |
| HTG-C1-P1-ON     | DO   | —    | BACnet   | BO 1    | Pump circuit 1 ON/OFF                |
| HTG-C1-P1-RUN    | DI   | —    | BACnet   | BI 1    | Pump circuit 1 run feedback          |
| HTG-C1-P1-FLT    | DI   | —    | BACnet   | BI 2    | Pump circuit 1 fault                 |
| HTG-C1-T-SP-ABS  | AV   | °C   | BACnet   | AV 2    | Supply setpoint absolute (BMS)       |

---

## Commissioning Status in the DPL

The DPL also serves as a commissioning checklist:

| Status         | Meaning                                   |
| -------------- | ----------------------------------------- |
| **Planned**    | Entered in DPL, not yet wired             |
| **Wired**      | Cable installed, not yet connected to DDC |
| **Configured** | Address assigned, DDC parameterised       |
| **Tested**     | Measured value correct, signal verified   |
| **OK**         | Fully accepted                            |
| **Defective**  | Sensor faulty, replacement needed         |

---

## Data Point Quality and Limits

Every analogue data point should have limits for plausibility checking:

```
Data point: Outdoor temperature
  Physical range: −40 … +60 °C (PT1000 range)
  Plausible: −25 … +45 °C (realistic value range CH)
  Low alarm: −25 °C (frost warning)
  High alarm: +40 °C (unusual, check sensor)
  Wire break detection: < −40 °C or > 100 °C = cable break
```

## Standards

- **VDI 3814** — Building automation, instrumentation and control (data point structure)
- **SIA 386.110** (CH) — Building automation
- **AMEV BACnet** — Recommendation for BACnet data points in public buildings
- **VDI/VDE 3699** — Process control with screens (data point visualisation)
