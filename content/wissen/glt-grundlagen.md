---
title: GLT / DDC — Ebenen der Gebäudeautomation
title_en: BMS / DDC — Levels of Building Automation
slug: glt-grundlagen
category: ga
subcategory: grundlagen
tags:
  [
    glt,
    ddc,
    gebäudeleittechnik,
    gebäudeautomation,
    feldebene,
    automationsebene,
    managementebene,
    hand-0-auto,
    betriebsarten,
    sollwert,
    raumautomation,
    bacnet,
    scada,
    leitebene
  ]
difficulty: grundlagen
area: [ga]
related: [bacnet, modbus, knx, pid-regler, alarmmanagement, signaltypen]
norm: [EN ISO 52120, VDI 3814, SIA 386.110]
updated: 2026-05-14
lang: de
---

# GLT / DDC — Ebenen der Gebäudeautomation

Die Gebäudeautomation ist in drei Ebenen organisiert. Das Verständnis dieser Hierarchie ist der erste Schritt um eine GA-Anlage richtig zu planen, zu parametrieren und im Betrieb zu bedienen.

## Die drei Ebenen

```
┌─────────────────────────────────────────────┐
│          MANAGEMENTEBENE (GLT)              │
│    Visualisierung · Alarmmanagement ·       │
│    Trendaufzeichnung · Reporting            │
│    Software: Siemens Desigo CC, Sauter Vision │
├─────────────────────────────────────────────┤
│         AUTOMATIONSEBENE (DDC)              │
│    Regelung · Steuerung · Optimierung       │
│    Hardware: DDC-Controller, Raumautomation │
│    Protokoll: BACnet, Modbus, KNX           │
├─────────────────────────────────────────────┤
│            FELDEBENE                        │
│    Sensoren · Aktoren · Armaturen           │
│    PT1000, 4–20 mA, 0–10 V, DI/DO          │
└─────────────────────────────────────────────┘
```

### Feldebene

Die unterste Schicht — direkte Verbindung zur physischen Anlage:

- **Sensoren:** Temperaturfühler, Drucksensoren, Durchflussmesser, CO₂, Feuchte
- **Aktoren:** Ventile, Klappen, Pumpen (über Schütz oder FU), Beleuchtung
- **Signaltypen:** AI (0–10V, 4–20mA, PT1000), DI (Kontakt), AO (0–10V), DO (Relais)
- **Verbindung zum DDC:** Kabel (bis 500 m), bei modernen Systemen auch Funk (EnOcean, KNX RF)

### Automationsebene (DDC)

Das Herz der Regelung — hier laufen die Programme:

- **DDC** (Direct Digital Control): Kleinstcomputer der die Anlage regelt
- Liest Sensoren, berechnet Sollwerte, stellt Aktoren an
- Läuft **autark** ohne Verbindung zur GLT (lokale Intelligenz)
- Kommuniziert mit GLT über BACnet, Modbus oder proprietäres Protokoll
- **Raumautomation:** kleiner DDC direkt im Raum (Fan-Coil, VAV-Box)

**Typische DDC-Hersteller:** Siemens (PXC), Sauter (modu8), Schneider (TAC Vista), Johnson Controls (Metasys), KMC, Distech

### Managementebene (GLT)

Übergeordnete Visualisierung und Bedienung:

- **Visualisierung:** grafische Darstellung der Anlage (Fließschemata, Raumgrundrisse)
- **Alarmmanagement:** Alarme sammeln, priorisieren, eskalieren
- **Trendaufzeichnung:** Messwerte historisieren (Polling oder COV)
- **Zeitprogramme:** Betriebszeiten zentral einstellen
- **Reporting:** Energieverbrauch, Betriebsstunden, Alarmstatistik

> ⚠️ Wichtig: Die GLT **überwacht und bedient** — die eigentliche Regelung läuft im DDC. Bei GLT-Ausfall läuft die Anlage weiter (lokal im DDC). Bei DDC-Ausfall funktioniert nichts mehr.

---

## Hand-0-Auto (HOA)

Jeder Aktor in der GA hat drei Betriebsarten:

| Modus    | Symbol | Beschreibung                                           |
| -------- | ------ | ------------------------------------------------------ |
| **Hand** | H      | Direkter manueller Eingriff — Programm ignoriert       |
| **0**    | 0      | Zwangsausschaltung — Aktor ist aus, Programm ignoriert |
| **Auto** | A      | Normalbetrieb — Programm regelt                        |

### Physische Hand-0-Auto-Schalter

An Schaltschränken oder Unterverteilungen:

```
Pumpe → [H - 0 - A] Schalter
H = Pumpe läuft immer (Hand)
0 = Pumpe aus (gesperrt)
A = DDC entscheidet
```

**Wichtig:** Hand-Modus bedeutet DDC hat keinen Einfluss. Gleichzeitig: kein Frostschutz, kein Überhitzungsschutz, kein automatischer Abschalter! → Nur im Service-Betrieb unter Aufsicht.

### Software Hand-0-Auto in der GLT

In der Visualisierung kann jeder Datenpunkt überschrieben werden:

```
Datenpunkt: Pumpe1 Auto = EIN (vom Regler)
  → GLT-Override: AUS (Hand zwingen)
  → Pumpe1 geht aus, obwohl Regler EIN sagt
```

**Protokollpflicht:** Wer hat wann was überschrieben? Warum? Gültigkeit bis wann?

---

## Betriebsarten / Betriebsprogramm

Neben HOA gibt es übergeordnete Betriebsarten die die gesamte Anlage beeinflussen:

| Betriebsart        | Beschreibung                                |
| ------------------ | ------------------------------------------- |
| **Komfort**        | Voller Betrieb, Normaltemperaturen          |
| **Vorkomfort**     | Aufwärmen vor Belegung (Morgens)            |
| **Nacht/Abwesend** | Abgesenkte Temperaturen, reduzierte Lüftung |
| **Standby**        | Minimalheizung (Frostschutz), Lüftung aus   |
| **Sonder/Hand**    | Sonderbetrieb, manuell ausgelöst            |
| **Störung**        | Sicherheitsabschaltung                      |

**Automatischer Übergang:**

```
Montag–Freitag:
  05:00 → Vorkomfort (Vorheizen)
  07:00 → Komfort
  18:00 → Nacht
  22:00 → Standby (Frostschutz)
Samstag/Sonntag:
  Standby, ausser Sonderbetrieb aktiviert
```

---

## Sollwertführung

Sollwerte können auf verschiedene Arten vorgegeben werden:

### Fixer Sollwert

- Raumtemperatur immer 22 °C
- Einfach, keine Interaktion nötig

### Gleitender Sollwert (witterungsgeführt)

- Vorlauftemperatur folgt Aussentemperatur (Heizkurve)
- Zulufttemperatur folgt Aussentemperatur

### Kaskaden-Sollwert

- Übergeordneter Regler gibt Sollwert für untergeordneten vor
- Beispiel: Raumtemperatur-Regler steuert Vorlauftemperatur-Regler

### Bediener-Eingriff

- Nutzer kann Sollwert ±2 K verstellen (innerhalb definierter Grenzen)
- GLT überwacht: Eingriffe ausserhalb Grenzen → Alarm

---

## DDC-Programm — Grundstruktur

Jedes DDC-Programm folgt demselben Ablauf:

```
1. Eingänge einlesen (Sensoren, Statusrückmeldungen)
2. Plausibilität prüfen (Fühlerbruch, Bereichsüberschreitung)
3. Betriebsart bestimmen (HOA-Status, Zeitprogramm)
4. Regelung berechnen (PID, Zweipunkt, Logik)
5. Ausgänge setzen (Ventile, Pumpen, FU)
6. Alarme auswerten (Grenzwerte, Laufzeiten)
7. Datenpunkte an GLT senden (COV oder Polling)
Zykluszeit: typisch 1–5 Sekunden
```

---

## Typische DDC-Architektur (Heizkreis)

```
Heizkreis-DDC:
  AI: Vorlauf-Temperatur (PT1000)
  AI: Rücklauf-Temperatur (PT1000)
  AI: Aussen-Temperatur (PT1000)
  AI: Pumpe-Betriebsstrom (4-20 mA)
  DI: Pumpe-Laufmeldung
  DI: Pumpe-Störmeldung
  DI: Motorschutz
  AO: Mischventil (0-10 V)
  DO: Pumpe EIN/AUS

Programm:
  - Witterungsgeführter Vorlauf (Heizkurve)
  - Frostschutz (Mindest-VL)
  - Nachtabsenkung (Zeitprogramm)
  - Pumpen-Laufzeit-Überwachung
  - Alarme: Pumpe Störung, Fühlerbruch, Kommunikation
```

## Normen

- **VDI 3814** — Gebäudeautomation, MSR-Technik in Gebäuden
- **EN ISO 52120** (früher EN 15232) — GA-Effizienzklassen
- **SIA 386.110** (CH) — Gebäudeautomation
- **IEC 61131-3** — Programmiersprachen für SPS/DDC

<!-- EN -->

# BMS / DDC — Levels of Building Automation

Building automation is organised in three levels. Understanding this hierarchy is the first step to correctly planning, parameterising and operating a BA system.

## The Three Levels

```
┌─────────────────────────────────────────────┐
│           MANAGEMENT LEVEL (BMS)            │
│    Visualisation · Alarm management ·       │
│    Trend recording · Reporting              │
│    Software: Siemens Desigo CC, Sauter Vision│
├─────────────────────────────────────────────┤
│          AUTOMATION LEVEL (DDC)             │
│    Control · Regulation · Optimisation      │
│    Hardware: DDC controllers, room automation│
│    Protocol: BACnet, Modbus, KNX            │
├─────────────────────────────────────────────┤
│               FIELD LEVEL                   │
│    Sensors · Actuators · Fittings           │
│    PT1000, 4–20 mA, 0–10 V, DI/DO          │
└─────────────────────────────────────────────┘
```

### Field Level

The lowest layer — direct connection to the physical plant:

- **Sensors:** temperature sensors, pressure sensors, flow meters, CO₂, humidity
- **Actuators:** valves, dampers, pumps (via contactor or VFD), lighting
- **Signal types:** AI (0–10V, 4–20mA, PT1000), DI (contact), AO (0–10V), DO (relay)
- **Connection to DDC:** cable (up to 500 m), modern systems also wireless (EnOcean, KNX RF)

### Automation Level (DDC)

The heart of control — programmes run here:

- **DDC** (Direct Digital Control): microcomputer that controls the plant
- Reads sensors, calculates setpoints, drives actuators
- Runs **autonomously** without BMS connection (local intelligence)
- Communicates with BMS via BACnet, Modbus or proprietary protocol
- **Room automation:** small DDC directly in the room (fan-coil, VAV box)

**Typical DDC manufacturers:** Siemens (PXC), Sauter (modu8), Schneider (TAC Vista), Johnson Controls (Metasys), KMC, Distech

### Management Level (BMS)

Overarching visualisation and operation:

- **Visualisation:** graphical representation of plant (flow diagrams, floor plans)
- **Alarm management:** collect, prioritise and escalate alarms
- **Trend recording:** historise measured values (polling or COV)
- **Time programs:** set operating hours centrally
- **Reporting:** energy consumption, operating hours, alarm statistics

> ⚠️ Important: The BMS **monitors and operates** — actual control runs in the DDC. If the BMS fails, the plant keeps running (locally in the DDC). If the DDC fails, nothing works.

---

## Hand-0-Auto (HOA)

Every actuator in BA has three operating modes:

| Mode     | Symbol | Description                                    |
| -------- | ------ | ---------------------------------------------- |
| **Hand** | H      | Direct manual intervention — programme ignored |
| **0**    | 0      | Forced off — actuator off, programme ignored   |
| **Auto** | A      | Normal operation — programme controls          |

### Physical Hand-0-Auto Switches

On switchboards or distribution panels:

```
Pump → [H - 0 - A] switch
H = pump always running (hand)
0 = pump off (locked)
A = DDC decides
```

**Important:** Hand mode means DDC has no influence. At the same time: no frost protection, no overheating protection, no automatic shutdown! → Use only during service under supervision.

### Software Hand-0-Auto in the BMS

In the visualisation, any data point can be overridden:

```
Data point: Pump1 Auto = ON (from controller)
  → BMS override: OFF (force off)
  → Pump1 turns off even though controller says ON
```

**Logging obligation:** Who overrode what, when and why? Valid until when?

---

## Operating Modes / Operating Programme

In addition to HOA, there are overarching operating modes that affect the entire plant:

| Operating mode     | Description                                         |
| ------------------ | --------------------------------------------------- |
| **Comfort**        | Full operation, normal temperatures                 |
| **Pre-comfort**    | Warm-up before occupancy (mornings)                 |
| **Night/Absent**   | Reduced temperatures, reduced ventilation           |
| **Standby**        | Minimum heating (frost protection), ventilation off |
| **Special/Manual** | Special operation, manually triggered               |
| **Fault**          | Safety shutdown                                     |

**Automatic transition:**

```
Monday–Friday:
  05:00 → Pre-comfort (pre-heating)
  07:00 → Comfort
  18:00 → Night
  22:00 → Standby (frost protection)
Saturday/Sunday:
  Standby, unless special mode activated
```

---

## Setpoint Control

Setpoints can be specified in different ways:

### Fixed Setpoint

- Room temperature always 22 °C
- Simple, no interaction required

### Sliding Setpoint (Weather-Compensated)

- Flow temperature follows outdoor temperature (heating curve)
- Supply air temperature follows outdoor temperature

### Cascade Setpoint

- Superior controller provides setpoint to subordinate controller
- Example: room temperature controller drives flow temperature controller

### Operator Intervention

- User can adjust setpoint ±2 K (within defined limits)
- BMS monitors: interventions outside limits → alarm

---

## DDC Programme — Basic Structure

Every DDC programme follows the same cycle:

```
1. Read inputs (sensors, status feedback)
2. Check plausibility (sensor break, range exceeded)
3. Determine operating mode (HOA status, time program)
4. Calculate control (PID, two-position, logic)
5. Set outputs (valves, pumps, VFD)
6. Evaluate alarms (limits, running times)
7. Send data points to BMS (COV or polling)
Cycle time: typically 1–5 seconds
```

---

## Typical DDC Architecture (Heating Circuit)

```
Heating circuit DDC:
  AI: flow temperature (PT1000)
  AI: return temperature (PT1000)
  AI: outdoor temperature (PT1000)
  AI: pump operating current (4–20 mA)
  DI: pump run signal
  DI: pump fault signal
  DI: motor protection
  AO: mixing valve (0–10 V)
  DO: pump ON/OFF

Programme:
  - Weather-compensated flow (heating curve)
  - Frost protection (minimum flow temp)
  - Night setback (time program)
  - Pump runtime monitoring
  - Alarms: pump fault, sensor break, communication
```

## Standards

- **VDI 3814** — Building automation, instrumentation and control in buildings
- **EN ISO 52120** (formerly EN 15232) — BA efficiency classes
- **SIA 386.110** (CH) — Building automation
- **IEC 61131-3** — Programming languages for PLC/DDC
