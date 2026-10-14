---
title: Raumautomation — RAUM-DDC und Raumregler
title_en: Room Automation — Room DDC and Room Controllers
slug: raumautomation
category: ga
subcategory: raumregelung
tags:
  [
    raumautomation,
    raum-ddc,
    raumregler,
    fan-coil,
    fancoil,
    fcu,
    vav-box,
    raumtemperatur,
    praesenz,
    konstantlicht,
    raumbus,
    bacnet,
    lon,
    konnektoren,
    hotelbetrieb,
    buroautomation,
    zone
  ]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related: [glt-grundlagen, pid-regler, vav-cav, dali, bacnet, knx, zonenkonzepte]
norm: [EN ISO 52120, EN 15232, VDI 3813]
updated: 2026-10-14
lang: de
---

# Raumautomation — RAUM-DDC und Raumregler

Die Raumautomation ist der Teil der Gebäudeautomation, der direkt beim Nutzer arbeitet. Hier werden Temperatur, Lüftung, Beleuchtung und Beschattung im einzelnen Raum geregelt. Gute Raumautomation ist unsichtbar: der Nutzer ist komfortabel und bemerkt nichts.

## Raumautomations-Konzept

Der Raumcontroller übernimmt im Raum:

- **Heizen und Kühlen** über Fan-Coil, Fussbodenheizung, Heizkörper oder Kühldecke
- **Lüftung** über den VAV-Regler
- **Beleuchtung** über DALI, KNX oder Schaltausgänge
- **Beschattung** über Jalousie- oder Raffstoreantriebe
- **Präsenz** als Eingang für alle Gewerke

---

## Fan-Coil Unit (FCU)

Ein **Fan-Coil** ist ein dezentrales Heiz-/Kühlgerät mit eigenem Ventilator:

Kalt- oder Heizwasser, zum Beispiel 6/12 °C oder 45/40 °C, fliesst durch das Register. Der Ventilator saugt Raumluft an, bläst sie durch das Register und zurück in den Raum.

### Regelung

| Stufe                         | Beschreibung                                       |
| ----------------------------- | -------------------------------------------------- |
| **Temperaturregler**          | Misst Raumtemperatur, regelt über Ventil           |
| **Ventilator**                | 3 Stufen oder stufenlos, meist EC-Motor mit 0–10 V |
| **Ventil**                    | 2-Wege oder 3-Wege (Heizen / Kühlen)               |
| **Heizen/Kühlen Umschaltung** | DDC wählt je nach Jahreszeit / Anforderung         |

### Typische DDC-Datenpunkte FCU

| Datenpunkt          | Typ | Beschreibung                   |
| ------------------- | --- | ------------------------------ |
| Raumtemperatur Ist  | AI  | PT1000                         |
| Raumtemperatur Soll | AV  | Vorgabe Nutzer oder GLT        |
| Ventilator Stufe    | AO  | 0–10 V für stufenlose Regelung |
| Kühlventil          | AO  | 0–10 V Stellsignal             |
| Heizventil          | AO  | 0–10 V Stellsignal             |
| Betriebsart         | AV  | Komfort / Nacht / Abwesend     |
| Präsenz             | DI  | PIR oder Karte (Hotel)         |

---

## VAV-Box im Raum

Ergänzt oder ersetzt den Fan-Coil wenn Lüftung zentral erfolgt:

- Die zentrale Lüftungsanlage liefert Zuluft in den Kanal.
- Der VAV-Regler misst den Volumenstrom über einen Differenzdruck und stellt die Klappe.
- Der Raumregler gibt den Volumenstrom-Sollwert vor, abhängig von CO₂, Präsenz und Temperatur.
- Optional regelt er ein Nachheizregister, elektrisch oder mit Warmwasser.

---

## Betriebsarten / Raumprofile

Gute Raumautomation kennt mehrere Profile:

| Profil             | Heizen   | Kühlen   | Lüftung          | Licht   |
| ------------------ | -------- | -------- | ---------------- | ------- |
| **Komfort**        | 21 °C    | 24–26 °C | normal           | Präsenz |
| **Standby**        | 19 °C    | 27 °C    | reduziert        | aus     |
| **Nacht, Economy** | 16–17 °C | 28 °C    | minimal oder aus | aus     |
| **Gebäudeschutz**  | 7–8 °C   | 35 °C    | aus              | aus     |

Die Werte sind Beispiele. Dazu kommen Szenen wie Sitzung oder Präsentation, die Licht und Beschattung anders einstellen. Die Profile entsprechen den HVAC-Betriebsarten von KNX und EN ISO 52120-1.

Übergang zwischen Profilen wird von Zeitprogramm, Präsenzsensor oder manuellem Eingriff ausgelöst.

---

## Präsenzerkennung

Die Präsenzerkennung ist zentral für die Energieeffizienz:

| Zustand                        | Reaktion                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------- |
| Präsenz erkannt                | Komfort                                                                         |
| keine Präsenz während 5–15 min | Standby: Licht aus, Lüftung auf Minimum, Temperatursollwert etwa 2 K verschoben |

**Sensortypen:** PIR (Bewegung), Radar (Millimeterwelle, auch statisch), Karte (Hotel), Tastendruck, GLT-Belegungsplan

---

## Raumbus-Systeme

Raumregler kommunizieren mit übergeordneter DDC oder direkt mit GLT:

| System           | Protokoll        | Besonderheit                        |
| ---------------- | ---------------- | ----------------------------------- |
| **KNX**          | KNX TP           | Flächendeckend, Taster integrierbar |
| **BACnet MS/TP** | RS-485           | Industrie-Standard, GA-üblich       |
| **LON**          | LON-Works        | Ältere Installationen, noch im Feld |
| **Modbus RTU**   | RS-485           | Einfach, günstig                    |
| **proprietär**   | Hersteller-spez. | Siemens PPS2, Sauter EY-modulo      |

---

## Hotel-Raumautomation

Hotels haben spezielle Anforderungen:

### Kartenleser-Integration

| Ereignis                          | Reaktion                                                                                            |
| --------------------------------- | --------------------------------------------------------------------------------------------------- |
| Gast steckt Karte ein             | Zimmer belegt: Komfort, Lüftung normal, Licht bedienbar                                             |
| Gast zieht Karte, nach etwa 1 min | Zimmer unbelegt: Heizsollwert etwa 17–18 °C, Kühlsollwert etwa 26–28 °C, Lüftung Minimum, Licht aus |
| Zimmer nicht vermietet            | stärker abgesenkt, nach Buchung rechtzeitig vorkonditioniert                                        |

### DND / MUR (Do Not Disturb / Make Up Room)

- **DND-Taste:** Lampe «Bitte nicht stören» an der Tür, Meldung an die GLT, die Reinigung kommt nicht.
- **MUR-Taste:** Lampe «Bitte reinigen», Meldung an die GLT oder das Hotelsystem.

---

## Konstantlicht-Regelung (DALI + Raumregler)

Ein Helligkeitssensor misst im Raum, der Raumcontroller vergleicht mit dem Sollwert, zum Beispiel 500 lx am Arbeitsplatz, und dimmt die Leuchten über DALI. Je mehr Tageslicht, desto weniger Kunstlicht. Siehe [Beleuchtungssteuerung](/wissen/beleuchtungssteuerung).

---

## Normen

- **EN ISO 52120** (früher EN 15232) — GA-Effizienzklassen, Raumautomation Klasse A
- **VDI 3813** — Raumautomationsfunktionen, Datenpunkte, Prozessbilder
- **EN ISO 7730** — Ergonomie der thermischen Umgebung (Komfortparameter)

<!-- EN -->

# Room Automation — Room DDC and Room Controllers

Room automation is the part of building automation that works directly at the user. Here, temperature, ventilation, lighting and shading are controlled in each individual room. Good room automation is invisible: the user is comfortable and notices nothing.

## Room Automation Concept

The room controller handles in the room:

- **heating and cooling** via fan coil, underfloor heating, radiator or chilled ceiling
- **ventilation** via the VAV controller
- **lighting** via DALI, KNX or switching outputs
- **shading** via blind actuators
- **presence** as an input for all services

---

## Fan-Coil Unit (FCU)

A **fan-coil** is a decentralised heating/cooling device with its own fan:

Chilled or hot water, for example 6/12 °C or 45/40 °C, flows through the coil. The fan draws in room air, blows it through the coil and back into the room.

### Control

| Stage                          | Description                                        |
| ------------------------------ | -------------------------------------------------- |
| **Temperature controller**     | Measures room temp, controls via valve             |
| **Fan**                        | 3 speeds or variable, usually EC motor with 0–10 V |
| **Valve**                      | 2-way or 3-way (heating / cooling)                 |
| **Heating/cooling switchover** | DDC selects based on season / demand               |

### Typical DDC Data Points — FCU

| Data Point                | Type | Description                 |
| ------------------------- | ---- | --------------------------- |
| Room temperature actual   | AI   | PT1000                      |
| Room temperature setpoint | AV   | User or BMS setting         |
| Fan speed                 | AO   | 0–10 V for variable control |
| Cooling valve             | AO   | 0–10 V control signal       |
| Heating valve             | AO   | 0–10 V control signal       |
| Operating mode            | AV   | Comfort / Night / Absent    |
| Presence                  | DI   | PIR or key card (hotel)     |

---

## VAV Box in the Room

Supplements or replaces the fan-coil when ventilation is handled centrally:

- The central air handling unit supplies air into the duct.
- The VAV controller measures air flow via a differential pressure and positions the damper.
- The room controller sets the air flow setpoint, depending on CO₂, presence and temperature.
- Optionally it controls a reheat coil, electric or hot water.

---

## Operating Modes / Room Profiles

Good room automation knows multiple profiles:

| Profile                 | Heating  | Cooling  | Ventilation    | Lighting |
| ----------------------- | -------- | -------- | -------------- | -------- |
| **Comfort**             | 21 °C    | 24–26 °C | normal         | presence |
| **Standby**             | 19 °C    | 27 °C    | reduced        | off      |
| **Night, economy**      | 16–17 °C | 28 °C    | minimum or off | off      |
| **Building protection** | 7–8 °C   | 35 °C    | off            | off      |

The values are examples. Scenes such as meeting or presentation come on top and set lighting and shading differently. The profiles correspond to the HVAC modes of KNX and EN ISO 52120-1.

Transitions between profiles are triggered by time programs, presence sensors or manual input.

---

## Presence Detection

Presence detection is central to energy efficiency:

| State                    | Response                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------- |
| presence detected        | comfort                                                                                |
| no presence for 5–15 min | standby: lights off, ventilation at minimum, temperature setpoint shifted by about 2 K |

**Sensor types:** PIR (motion), radar (millimetre wave, also detects stationary occupants), key card (hotel), button press, BMS occupancy schedule

---

## Room Bus Systems

Room controllers communicate with the overarching DDC or directly with the BMS:

| System           | Protocol              | Special feature                         |
| ---------------- | --------------------- | --------------------------------------- |
| **KNX**          | KNX TP                | Widespread, panel buttons integratable  |
| **BACnet MS/TP** | RS-485                | Industry standard, common in BA         |
| **LON**          | LON-Works             | Older installations, still in the field |
| **Modbus RTU**   | RS-485                | Simple, cost-effective                  |
| **Proprietary**  | Manufacturer-specific | Siemens PPS2, Sauter EY-modulo          |

---

## Hotel Room Automation

Hotels have special requirements:

### Key Card Integration

| Event                                 | Response                                                                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Guest inserts key card                | room occupied: comfort, ventilation normal, lighting available                                                     |
| Guest removes card, after about 1 min | room unoccupied: heating setpoint about 17–18 °C, cooling setpoint about 26–28 °C, ventilation minimum, lights off |
| Room not let                          | further setback, preconditioned in time after booking                                                              |

### DND / MUR (Do Not Disturb / Make Up Room)

- **DND button:** "do not disturb" lamp at the door, message to the BMS, housekeeping stays out.
- **MUR button:** "make up room" lamp, message to the BMS or hotel system.

---

## Constant Light Control (DALI + Room Controller)

A brightness sensor measures in the room, the room controller compares with the setpoint, for example 500 lx at the workplace, and dims the luminaires via DALI. The more daylight, the less artificial light. See [Lighting Control](/wissen/beleuchtungssteuerung).

---

## Standards

- **EN ISO 52120** (formerly EN 15232) — BA efficiency classes, room automation Class A
- **VDI 3813** — Room automation functions, data points, process diagrams
- **EN ISO 7730** — Ergonomics of the thermal environment (comfort parameters)
