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
related: [glt-grundlagen, pid-regler, vav-cav, dali, bacnet, knx]
norm: [EN ISO 52120, EN 15232, VDI 3813]
updated: 2026-05-14
lang: de
---

# Raumautomation — RAUM-DDC und Raumregler

Die Raumautomation ist die unterste Ebene der Gebäudeautomation — direkt beim Nutzer. Hier werden Temperatur, Lüftung, Beleuchtung und Beschattung im einzelnen Raum geregelt. Gute Raumautomation ist unsichtbar: der Nutzer ist komfortabel und bemerkt nichts.

## Raumautomations-Konzept

```
Raumfunktionen:
  ├── Heizen/Kühlen (Fan-Coil, FBH, Kühldecke)
  ├── Lüftung (VAV-Box, Volumenstrom)
  ├── Beleuchtung (DALI, 0-10V, Schaltung)
  ├── Beschattung (Jalousie, Raffstore)
  └── Zugangskontrolle / Präsenz

Alle gesteuert von:
  RAUM-DDC (Raumregler / Raumcontroller)
```

---

## Fan-Coil Unit (FCU)

Ein **Fan-Coil** ist ein dezentrales Heiz-/Kühlgerät mit eigenem Ventilator:

```
Kühlwasser (6/12 °C) oder Heizwasser (45/40 °C)
    ↓
[Wärmetauscher-Register]
    ← Ventilator →
    ↓
Raumluft
```

### Regelung

| Stufe                         | Beschreibung                                  |
| ----------------------------- | --------------------------------------------- |
| **Temperaturregler**          | Misst Raumtemperatur, regelt über Ventil      |
| **Ventilator**                | 3 Stufen (Low/Mid/High) oder stufenlos via FU |
| **Ventil**                    | 2-Wege oder 3-Wege (Heizen / Kühlen)          |
| **Heizen/Kühlen Umschaltung** | DDC wählt je nach Jahreszeit / Anforderung    |

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

```
Zuluft-Kanal (zentrale RLT)
    ↓
VAV-Box (Volumenstromregler)
    ↓ Zuluft in den Raum
    Messung: Differenzdruck (→ Volumenstrom)
    Stellgrösse: Regelklappe

Raumregler steuert:
  - VAV-Box Volumenstrom (je nach CO₂, Präsenz, T)
  - Nachheizregister (elektrisch oder Warmwasser)
  - Kühlen via Zulufttemperatur (zentral oder lokal)
```

---

## Betriebsarten / Raumprofile

Gute Raumautomation kennt mehrere Profile:

| Profil           | Temperatur | Lüftung   | Licht   | Beschattung      |
| ---------------- | ---------- | --------- | ------- | ---------------- |
| **Komfort**      | 21 °C      | Normal    | Präsenz | Automatisch      |
| **Vorkomfort**   | 19 °C      | Reduziert | Aus     | Automatisch      |
| **Nacht**        | 16 °C      | Minimal   | Aus     | Zu (Sommer: auf) |
| **Abwesend**     | 16 °C      | Minimal   | Aus     | Aus              |
| **Sitzung**      | 21 °C      | 100 %     | 100 %   | Beschattet       |
| **Präsentation** | 21 °C      | Normal    | 30 %    | Beschattet       |

Übergang zwischen Profilen wird von Zeitprogramm, Präsenzsensor oder manuellem Eingriff ausgelöst.

---

## Präsenzerkennung

Die Präsenzerkennung ist zentral für die Energieeffizienz:

```
Präsenz erkannt → Komfortbetrieb
Keine Präsenz (5–15 min) → Standby
    ├── Licht: sofort aus
    ├── Lüftung: auf Minimum
    └── Heizung/Kühlung: Sollwert 2 K verschieben
```

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

```
Gast steckt Karte ein:
  → DI "Zimmer besetzt" = EIN
  → Temperatur: Komfort (21 °C)
  → Lüftung: Normal
  → Licht: vorhanden (manuelle Steuerung)

Gast entnimmt Karte:
  → DI "Zimmer besetzt" = AUS (nach 1 min)
  → Temperatur: Abwesend (18 °C Sommer, 16 °C Winter)
  → Lüftung: Minimum
  → Licht: aus
```

### DND / MUR (Do Not Disturb / Make Up Room)

```
DND-Taste gedrückt:
  → DO "DND-Lampe aussen" = EIN
  → GLT-Signal: kein Haushalt-Zutritt

MUR-Taste gedrückt:
  → DO "MUR-Lampe aussen" = EIN
  → GLT-Signal: Reinigung erwünscht
```

---

## Konstantlicht-Regelung (DALI + Raumregler)

```
Helligkeitssensor im Raum (Lux)
    ↓
Raumregler vergleicht mit Soll-Helligkeit (z.B. 500 Lux Schreibtisch)
    ↓
DALI-Dimmlevel anpassen
    ↓ Mehr Tageslicht → weniger künstliches Licht
```

Spart 30–50 % Beleuchtungsenergie in gut beleuchteten Räumen.

---

## Normen

- **EN ISO 52120** (früher EN 15232) — GA-Effizienzklassen, Raumautomation Klasse A
- **VDI 3813** — Raumautomationsfunktionen, Datenpunkte, Prozessbilder
- **EN 15232** — Einsparpotenziale durch GA (Raumebene = grösste Wirkung)
- **EN ISO 7730** — Ergonomie der thermischen Umgebung (Komfortparameter)

<!-- EN -->

# Room Automation — Room DDC and Room Controllers

Room automation is the lowest level of building automation — directly at the user. Here, temperature, ventilation, lighting and shading are controlled in each individual room. Good room automation is invisible: the user is comfortable and notices nothing.

## Room Automation Concept

```
Room functions:
  ├── Heating/cooling (fan-coil, UFH, chilled ceiling)
  ├── Ventilation (VAV box, volume flow)
  ├── Lighting (DALI, 0–10V, switching)
  ├── Shading (blind, louvre shutter)
  └── Access control / presence

All controlled by:
  Room DDC (room controller)
```

---

## Fan-Coil Unit (FCU)

A **fan-coil** is a decentralised heating/cooling device with its own fan:

```
Chilled water (6/12 °C) or heating water (45/40 °C)
    ↓
[Heat exchanger coil]
    ← Fan →
    ↓
Room air
```

### Control

| Stage                          | Description                                 |
| ------------------------------ | ------------------------------------------- |
| **Temperature controller**     | Measures room temp, controls via valve      |
| **Fan**                        | 3 speeds (Low/Mid/High) or variable via VFD |
| **Valve**                      | 2-way or 3-way (heating / cooling)          |
| **Heating/cooling switchover** | DDC selects based on season / demand        |

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

```
Supply air duct (central AHU)
    ↓
VAV box (volume flow controller)
    ↓ Supply air into room
    Measurement: differential pressure (→ volume flow)
    Controlled variable: damper

Room controller manages:
  - VAV box volume flow (based on CO₂, presence, T)
  - Reheat coil (electric or hot water)
  - Cooling via supply air temperature (central or local)
```

---

## Operating Modes / Room Profiles

Good room automation knows multiple profiles:

| Profile          | Temperature | Ventilation | Lighting | Shading               |
| ---------------- | ----------- | ----------- | -------- | --------------------- |
| **Comfort**      | 21 °C       | Normal      | Presence | Automatic             |
| **Pre-comfort**  | 19 °C       | Reduced     | Off      | Automatic             |
| **Night**        | 16 °C       | Minimum     | Off      | Closed (summer: open) |
| **Absent**       | 16 °C       | Minimum     | Off      | Off                   |
| **Meeting**      | 21 °C       | 100 %       | 100 %    | Shaded                |
| **Presentation** | 21 °C       | Normal      | 30 %     | Shaded                |

Transitions between profiles are triggered by time programs, presence sensors or manual input.

---

## Presence Detection

Presence detection is central to energy efficiency:

```
Presence detected → comfort mode
No presence (5–15 min) → standby
    ├── Lighting: off immediately
    ├── Ventilation: reduce to minimum
    └── Heating/cooling: shift setpoint by 2 K
```

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

```
Guest inserts card:
  → DI "room occupied" = ON
  → Temperature: comfort (21 °C)
  → Ventilation: normal
  → Lighting: available (manual control)

Guest removes card:
  → DI "room occupied" = OFF (after 1 min)
  → Temperature: absent (18 °C summer, 16 °C winter)
  → Ventilation: minimum
  → Lighting: off
```

### DND / MUR (Do Not Disturb / Make Up Room)

```
DND button pressed:
  → DO "DND lamp outside" = ON
  → BMS signal: no housekeeping access

MUR button pressed:
  → DO "MUR lamp outside" = ON
  → BMS signal: cleaning requested
```

---

## Constant Light Control (DALI + Room Controller)

```
Brightness sensor in room (lux)
    ↓
Room controller compares with target brightness (e.g. 500 lux at desk)
    ↓
Adjust DALI dim level
    ↓ More daylight → less artificial light
```

Saves 30–50 % lighting energy in well-daylit rooms.

---

## Standards

- **EN ISO 52120** (formerly EN 15232) — BA efficiency classes, room automation Class A
- **VDI 3813** — Room automation functions, data points, process diagrams
- **EN 15232** — Savings potential through BA (room level = greatest impact)
- **EN ISO 7730** — Ergonomics of the thermal environment (comfort parameters)
