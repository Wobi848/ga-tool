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
related:
  [
    bacnet,
    modbus,
    knx,
    pid-regler,
    alarmmanagement,
    signaltypen,
    hand-0-auto,
    sps-grundlagen,
    visualisierung-hmi
  ]
norm: [EN ISO 52120, VDI 3814, SIA 386.110]
updated: 2026-10-14
lang: de
---

# GLT / DDC — Ebenen der Gebäudeautomation

Die Gebäudeautomation ist in drei Ebenen organisiert. Das Verständnis dieser Hierarchie ist der erste Schritt um eine GA-Anlage richtig zu planen, zu parametrieren und im Betrieb zu bedienen.

## Die drei Ebenen

| Ebene                      | Aufgaben                                                 | Beispiele                                                 |
| -------------------------- | -------------------------------------------------------- | --------------------------------------------------------- |
| **Managementebene (GLT)**  | Visualisierung, Alarme, Trends, Zeitprogramme, Reporting | Leitsystem, Webserver, Energiemanagement                  |
| **Automationsebene (DDC)** | Regeln, Steuern, Überwachen, Optimieren                  | Automationsstationen, Raumcontroller, BACnet, Modbus, KNX |
| **Feldebene**              | Messen und Stellen                                       | Fühler, Antriebe, Pt1000, 4–20 mA, 0–10 V, DI/DO          |

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

**Typische DDC-Hersteller:** Siemens (Desigo), Sauter (EY-modulo), Schneider Electric (EcoStruxure), Honeywell, Johnson Controls, Kieback&Peter, Distech u.a.

### Managementebene (GLT)

Übergeordnete Visualisierung und Bedienung:

- **Visualisierung:** grafische Darstellung der Anlage (Fliessschemata, Raumgrundrisse)
- **Alarmmanagement:** Alarme sammeln, priorisieren, eskalieren
- **Trendaufzeichnung:** Messwerte historisieren (Polling oder COV)
- **Zeitprogramme:** Betriebszeiten zentral einstellen
- **Reporting:** Energieverbrauch, Betriebsstunden, Alarmstatistik

> ⚠️ Wichtig: Die GLT **überwacht und bedient** — die eigentliche Regelung läuft im DDC. Bei GLT-Ausfall läuft die Anlage weiter (lokal im DDC). Fällt eine DDC aus, gehen ihre Ausgänge in den Ausfallzustand, siehe [Hand-0-Auto](/wissen/hand-0-auto).

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

- **H:** Pumpe läuft, unabhängig von der DDC
- **0:** Pumpe aus, auch wenn die DDC einschaltet
- **A:** Die DDC entscheidet

**Wichtig:** Hand-Modus bedeutet DDC hat keinen Einfluss. Damit wirken auch die Schutzfunktionen der DDC nicht, etwa das Frostschutzprogramm. Die fest verdrahtete Sicherheitskette mit Motorschutz und Frostschutzthermostat bleibt aber wirksam. Hand nur im Servicebetrieb und unter Aufsicht.

### Software Hand-0-Auto in der GLT

In der Visualisierung kann jeder Datenpunkt überschrieben werden:

Beispiel: Der Regler schaltet Pumpe 1 ein. Der Bediener übersteuert in der GLT auf Hand AUS. Die Pumpe geht aus, obwohl der Regler EIN verlangt.

**Protokollpflicht:** Wer hat wann was überschrieben? Warum? Gültigkeit bis wann?

---

## Betriebsarten / Betriebsprogramm

Neben HOA gibt es übergeordnete Betriebsarten die die gesamte Anlage beeinflussen:

| Betriebsart         | Beschreibung                                                                          |
| ------------------- | ------------------------------------------------------------------------------------- |
| **Komfort**         | Raum belegt, Komfortsollwerte                                                         |
| **Standby**         | Raum kurz nicht belegt, Sollwerte wenige Kelvin abgesenkt, schnell wieder auf Komfort |
| **Nacht / Economy** | längere Abwesenheit, stärker abgesenkt, Lüftung reduziert oder aus                    |
| **Gebäudeschutz**   | Frost- und Hitzeschutz, nur noch Schutz von Gebäude und Anlage                        |
| **Sonderbetrieb**   | manuell ausgelöst, etwa für Anlässe                                                   |

Die Begriffe entsprechen den HVAC-Betriebsarten von KNX und EN ISO 52120-1. Dazu kommen Zustände wie Aufheizen vor Nutzungsbeginn oder eine Sicherheitsabschaltung bei Störung.

**Automatischer Übergang:**

**Montag–Freitag:**

- 05:00 → Vorkomfort (Vorheizen)
- 07:00 → Komfort
- 18:00 → Nacht
  **Samstag/Sonntag:**

- Nacht, ausser Sonderbetrieb aktiviert

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
- Die Grenzen sind in der DDC fest eingestellt; der Nutzer kann sie nicht überschreiten

---

## DDC-Programm — Grundstruktur

Jedes DDC-Programm folgt demselben Ablauf:

- 1. Eingänge einlesen (Sensoren, Statusrückmeldungen)
- 2. Plausibilität prüfen (Fühlerbruch, Bereichsüberschreitung)
- 3. Betriebsart bestimmen (HOA-Status, Zeitprogramm)
- 4. Regelung berechnen (PID, Zweipunkt, Logik)
- 5. Ausgänge setzen (Ventile, Pumpen, FU)
- 6. Alarme auswerten (Grenzwerte, Laufzeiten)
- 7. Datenpunkte an GLT senden (COV oder Polling)
- Zykluszeit: typisch 1–5 Sekunden

---

## Typische DDC-Architektur (Heizkreis)

**Heizkreis-DDC:**

- AI: Vorlauf-Temperatur (PT1000)
- AI: Rücklauf-Temperatur (PT1000)
- AI: Aussen-Temperatur (PT1000)
- AI: Pumpe-Betriebsstrom (4-20 mA)
- DI: Pumpe-Laufmeldung
- DI: Pumpe-Störmeldung
- DI: Motorschutz
- AO: Mischventil (0-10 V)
- DO: Pumpe EIN/AUS

**Programm:**

- Witterungsgeführter Vorlauf (Heizkurve)
- Frostschutz (Mindest-VL)
- Nachtabsenkung (Zeitprogramm)
- Pumpen-Laufzeit-Überwachung
- Alarme: Pumpe Störung, Fühlerbruch, Kommunikation

## Normen

- **VDI 3814** — Gebäudeautomation, MSR-Technik in Gebäuden
- **EN ISO 52120-1** (früher EN 15232) — GA-Effizienzklassen
- **SIA 386.110** (CH) — Schweizer Ausgabe von EN 15232
- **EN ISO 16484** — Systeme der Gebäudeautomation, Teil 5 BACnet
- **IEC 61131-3** — Programmiersprachen für SPS/DDC

<!-- EN -->

# BMS / DDC — Levels of Building Automation

Building automation is organised in three levels. Understanding this hierarchy is the first step to correctly planning, parameterising and operating a BA system.

## The Three Levels

| Level                      | Tasks                                               | Examples                                                   |
| -------------------------- | --------------------------------------------------- | ---------------------------------------------------------- |
| **Management level (BMS)** | visualisation, alarms, trends, schedules, reporting | management system, web server, energy management           |
| **Automation level (DDC)** | control, switching, monitoring, optimisation        | automation stations, room controllers, BACnet, Modbus, KNX |
| **Field level**            | measuring and actuating                             | sensors, actuators, Pt1000, 4–20 mA, 0–10 V, DI/DO         |

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

**Typical DDC manufacturers:** Siemens (Desigo), Sauter (EY-modulo), Schneider Electric (EcoStruxure), Honeywell, Johnson Controls, Kieback&Peter, Distech and others

### Management Level (BMS)

Overarching visualisation and operation:

- **Visualisation:** graphical representation of plant (flow diagrams, floor plans)
- **Alarm management:** collect, prioritise and escalate alarms
- **Trend recording:** historise measured values (polling or COV)
- **Time programs:** set operating hours centrally
- **Reporting:** energy consumption, operating hours, alarm statistics

> ⚠️ Important: The BMS **monitors and operates** — actual control runs in the DDC. If the BMS fails, the plant keeps running (locally in the DDC). If a DDC fails, its outputs go to the failure state, see [Hand-Off-Auto](/wissen/hand-0-auto).

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

- **H:** pump runs, regardless of the DDC
- **0:** pump off, even if the DDC switches it on
- **A:** the DDC decides

**Important:** Hand mode means DDC has no influence. This also disables the DDC's protective functions, such as the frost protection program. The hard-wired safety chain with motor protection and frost thermostat remains effective, however. Use Hand only during service and under supervision.

### Software Hand-0-Auto in the BMS

In the visualisation, any data point can be overridden:

Example: the controller switches pump 1 on. The operator overrides it in the BMS to manual OFF. The pump stops even though the controller demands ON.

**Logging obligation:** Who overrode what, when and why? Valid until when?

---

## Operating Modes / Operating Programme

In addition to HOA, there are overarching operating modes that affect the entire plant:

| Mode                    | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| **Comfort**             | room occupied, comfort setpoints                                                    |
| **Standby**             | room briefly unoccupied, setpoints lowered by a few kelvin, quickly back to comfort |
| **Night / economy**     | longer absence, lowered further, ventilation reduced or off                         |
| **Building protection** | frost and heat protection, only protecting building and plant                       |
| **Special operation**   | triggered manually, for example for events                                          |

The terms correspond to the HVAC modes of KNX and EN ISO 52120-1. In addition there are states such as pre-heating before occupancy or a safety shutdown on a fault.

**Automatic transition:**

**Monday–Friday:**

- 05:00 → Pre-comfort (pre-heating)
- 07:00 → Comfort
- 18:00 → Night
  **Saturday/Sunday:**

- Standby, unless special mode activated

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
- The limits are fixed in the DDC; the user cannot exceed them

---

## DDC Programme — Basic Structure

Every DDC programme follows the same cycle:

- 1. Read inputs (sensors, status feedback)
- 2. Check plausibility (sensor break, range exceeded)
- 3. Determine operating mode (HOA status, time program)
- 4. Calculate control (PID, two-position, logic)
- 5. Set outputs (valves, pumps, VFD)
- 6. Evaluate alarms (limits, running times)
- 7. Send data points to BMS (COV or polling)
- Cycle time: typically 1–5 seconds

---

## Typical DDC Architecture (Heating Circuit)

**Heating circuit DDC:**

- AI: flow temperature (PT1000)
- AI: return temperature (PT1000)
- AI: outdoor temperature (PT1000)
- AI: pump operating current (4–20 mA)
- DI: pump run signal
- DI: pump fault signal
- DI: motor protection
- AO: mixing valve (0–10 V)
- DO: pump ON/OFF

**Programme:**

- Weather-compensated flow (heating curve)
- Frost protection (minimum flow temp)
- Night setback (time program)
- Pump runtime monitoring
- Alarms: pump fault, sensor break, communication

## Standards

- **VDI 3814** — Building automation, instrumentation and control in buildings
- **EN ISO 52120-1** (formerly EN 15232) — BA efficiency classes
- **SIA 386.110** (CH) — Swiss edition of EN 15232
- **EN ISO 16484** — Building automation and control systems, part 5 BACnet
- **IEC 61131-3** — Programming languages for PLC/DDC
