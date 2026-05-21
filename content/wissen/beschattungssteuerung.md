---
title: Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne
title_en: Shading Control — Blinds, Wind and Sun
slug: beschattungssteuerung
category: komfort
subcategory: beschattung
tags:
  [
    beschattungssteuerung,
    jalousie,
    raffstore,
    sonnenautomatik,
    windautomatik,
    regenautomatik,
    sonnenstand,
    azimut,
    elevation,
    fassade,
    priorität,
    knx,
    dali,
    behaglichkeit,
    blend
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [knx, glt-grundlagen, thermische-behaglichkeit, rlt-anlage]
norm: [EN 15232, prEN 16153, SIA 382.1]
updated: 2026-05-14
lang: de
---

# Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne

Die Beschattungssteuerung beeinflusst Komfort, Energieverbrauch und Blendschutz. Zu viel Sonne → Überhitzung, zu wenig → schlechtes Tageslicht. Die GA regelt Jalousien und Raffstoren automatisch auf Basis von Sonnenstand, Wind, Regen und Nutzeranforderungen.

## Grundprinzipien

```
Eingaben:
  ├── Sonnenstand (Azimut + Elevation)
  ├── Globalstrahlung / Einstrahlung auf Fassade
  ├── Windgeschwindigkeit (Sicherheit!)
  ├── Regen (Sicherheit!)
  ├── Raumtemperatur
  └── Benutzerpräferenz (manuell übersteuern)

Ausgaben:
  ├── Raffstoren-Position (0–100 %)
  └── Lamellenwinkel (0–180°)
```

---

## Antriebstypen und Signale

| Signal                 | Beschreibung                          | Einsatz            |
| ---------------------- | ------------------------------------- | ------------------ |
| **230 V Motorantrieb** | Auf-/Ab-Signal (2 Ausgänge)           | Standard-Raffstore |
| **KNX-Antrieb**        | Bus-Steuerung, Positionsrückmeldung   | KNX-Integration    |
| **Modbus**             | Professionelle Antriebe, Volldiagnose | GLT-Anbindung      |
| **0–10 V**             | Lamellenwinkel (selten)               | Spezielle Antriebe |

**Verriegelung:** Auf- und Ab-Signal **niemals gleichzeitig** aktiv! Sonst Motorschaden. DDC-Verriegelung obligatorisch.

---

## Sonnenschutzautomatik

### Sonnenstand-Berechnung

Die GA berechnet den Sonnenstand aus:

- Geografische Koordinaten (Breitengrad, Längengrad)
- Datum und Uhrzeit

```
Azimut: Himmelsrichtung der Sonne (0° = Nord, 90° = Ost, 180° = Süd)
Elevation: Sonnenhöhe über Horizont (0° = Sonnenaufgang, 90° = Zenit)
```

### Fassaden-Exposition

Pro Fassade wird definiert:

- Ausrichtung (Azimut der Fassade: 180° = Südfassade)
- Aktivierungsbereich: Wenn Sonne auf diese Fassade scheint

**Beispiel Südfassade:**

| Bedingung             | Wert                              |
| --------------------- | --------------------------------- |
| Azimut Sonne in       | 120–240° (Sonne von Süden)        |
| Elevation Sonne ≥     | 20° (kein Schattenwurf niedriger) |
| Globalstrahlung ≥     | 200 W/m²                          |
| → Automatik aktiviert | Raffstoren fahren runter          |

### Lamellen-Optimierung (Blendschutz + Tageslicht)

Ziel: Direktes Sonnenlicht abhalten, aber diffuses Tageslicht reinlassen.

```
Lamellenwinkel = Elevation_Sonne + 15° (Puffer)

Beispiel: Sonne steht bei 45° Elevation
→ Lamellenwinkel = 45 + 15 = 60°
→ Direktes Licht wird reflektiert, indirektes Licht kommt rein
```

---

## Windautomatik (Sicherheit)

**Wind ist sicherheitsrelevant** — Beschattungsanlage kann bei Sturm beschädigt werden:

| Windgeschwindigkeit | Massnahme                                                 |
| ------------------- | --------------------------------------------------------- |
| < 6 m/s             | Normalbetrieb                                             |
| 6–10 m/s            | Warnung, keine Neuauslösung                               |
| > 10 m/s            | **Zwang: Alle Raffstoren fahren hoch** (sichere Position) |

**Totzeit nach Wind:** Nach Windabfall mind. 5–10 Minuten warten bevor Automatik wieder übernimmt.

> ⚠️ Windautomatik hat **absolute Priorität** über alle anderen Befehle — auch über manuelle Übersteuerung! Ein Nutzer kann keine beschädigte Jalousie bezahlen.

---

## Regenautomatik

Bei Regen können Holz-Lamellen oder spezielle Beschattungen beschädigt werden:

- Regensensor: Kapazitiv oder Heizfaden-Prinzip
- Bei Regen: Bestimmte Anlagentypen einfahren
- Für Standardraffstoren meist nicht nötig

---

## Prioritätensystem

In der GA gilt eine klare Hierarchie:

```
1. WIND-ALARM (höchste Priorität — Hardware)
2. Regen-Alarm
3. Manuell vom Nutzer (Taster, App)
4. Sonnenschutzautomatik
5. Zeitprogramm (z.B. Nacht: immer offen)
```

**Manuelle Übersteuerung:**

- Nutzer drückt Taster → manuelle Position 30 Minuten gültig
- Danach: Automatik übernimmt wieder
- Oder: Manuelle Sperre bis nächsten Tag

---

## Raumautomation: Jalousie + Konstantlicht

Kombination Beschattung + Beleuchtung für optimale Tageslichtnutzung:

```
Sensor: Raumhelligkeit (Lux)
Soll: 500 Lux auf Arbeitsplatz

Wenn Sonne scheint:
  → Jalousie runter (Blendschutz)
  → Lamellen: Tageslicht optimieren
  → Künstliches Licht: Ergänzung auf 500 Lux (DALI-Konstantlicht)

Wenn bewölkt:
  → Jalousie offen (max. Tageslicht)
  → Kunstlicht: Ergänzung auf 500 Lux
```

Spart 30–50 % Beleuchtungsenergie und verbessert Komfort.

---

## KNX-Beschattungssteuerung

KNX ist das häufigste System für Gebäude-Jalousien:

- Gruppenadresse "Jalousie AUF/AB" → DO-Ausgang (1 bit)
- Gruppenadresse "Position" → 0–100 % (1 Byte)
- Gruppenadresse "Lamelle" → 0–100 % (1 Byte)
- Gruppenadresse "Windalarm" → alle Jalousien synchron hoch

**GA-Integration:** GLT liest KNX-Bus über IP-Gateway → kann Zeitprogramme und Sonnenschutz zentral steuern.

---

## Typische GA-Datenpunkte

| Datenpunkt                  | Typ | Einheit | Beschreibung                   |
| --------------------------- | --- | ------- | ------------------------------ |
| Windgeschwindigkeit         | AI  | m/s     | Wetterstation                  |
| Globalstrahlung             | AI  | W/m²    | Pyranometer Dach               |
| Sonnen-Azimut berechnet     | AV  | °       | Berechnet aus Datum + Standort |
| Sonnen-Elevation berechnet  | AV  | °       | Berechnet                      |
| Jalousie Fassade N Position | AO  | %       | Sollposition 0–100 %           |
| Jalousie Fassade N Lamelle  | AO  | °       | Lamellenwinkel 0–180°          |
| Windalarm                   | DI  | —       | Bei > Grenzwert                |
| Manuelle Übersteuerung      | DI  | —       | Taster aktiv                   |

## Normen

- **EN 15232** — Energieeffizienz durch GA (Sonnenschutz = grosses Einsparpotenzial)
- **EN 14501** — Wärme- und Lichttransmission von Beschattungsprodukten
- **SIA 382.1** — Lüftungs- und Klimaanlagen (integrierte Beschattung)

<!-- EN -->

# Shading Control — Blinds, Wind and Sun

Shading control influences comfort, energy consumption and glare protection. Too much sun causes overheating; too little means poor daylight use. The BMS automatically controls blinds and roller shutters based on sun position, wind, rain and user requirements.

## Basic Principles

```
Inputs:
  ├── Sun position (azimuth + elevation)
  ├── Global irradiance / facade irradiance
  ├── Wind speed (safety!)
  ├── Rain (safety!)
  ├── Room temperature
  └── User preference (manual override)

Outputs:
  ├── Shutter position (0–100 %)
  └── Slat angle (0–180°)
```

---

## Drive Types and Signals

| Signal                | Description                           | Application              |
| --------------------- | ------------------------------------- | ------------------------ |
| **230 V motor drive** | Up/down signals (2 outputs)           | Standard roller shutters |
| **KNX drive**         | Bus control, position feedback        | KNX integration          |
| **Modbus**            | Professional drives, full diagnostics | BMS connection           |
| **0–10 V**            | Slat angle (rare)                     | Special drives           |

**Interlock:** Up and Down signals must **never** be active simultaneously — motor damage. DDC interlock is mandatory.

---

## Solar Protection Automation

### Sun Position Calculation

The BMS calculates sun position from:

- Geographic coordinates (latitude, longitude)
- Date and time

```
Azimuth: compass direction of sun (0° = North, 90° = East, 180° = South)
Elevation: sun height above horizon (0° = sunrise, 90° = zenith)
```

### Facade Exposure

For each facade, define:

- Orientation (facade azimuth: 180° = south facade)
- Activation range: when sun shines on this facade

**Example — South Facade:**

| Condition           | Value                              |
| ------------------- | ---------------------------------- |
| Sun azimuth in      | 120–240° (sun from south)          |
| Sun elevation ≥     | 20° (no shading effect below this) |
| Global irradiance ≥ | 200 W/m²                           |
| → Automation active | Shutters lower                     |

### Slat Optimisation (Glare + Daylight)

Goal: block direct sunlight while allowing diffuse daylight through.

```
Slat angle = sun elevation + 15° (buffer)

Example: sun at 45° elevation
→ Slat angle = 45 + 15 = 60°
→ Direct light is reflected, indirect light enters
```

---

## Wind Automation (Safety)

**Wind is safety-critical** — shading equipment can be damaged in storms:

| Wind speed | Action                                          |
| ---------- | ----------------------------------------------- |
| < 6 m/s    | Normal operation                                |
| 6–10 m/s   | Warning, no new triggering                      |
| > 10 m/s   | **Force: all shutters retract** (safe position) |

**Dead time after wind:** After wind subsides, wait at least 5–10 minutes before automation resumes.

> ⚠️ Wind automation has **absolute priority** over all other commands — including manual override. A damaged shutter is far more costly than a brief override refusal.

---

## Rain Automation

Rain can damage wooden slats or special shading types:

- Rain sensor: capacitive or heated-wire principle
- On rain: certain shading types retract
- For standard roller shutters, usually not required

---

## Priority System

The BMS enforces a clear hierarchy:

```
1. WIND ALARM (highest priority — hardware)
2. Rain alarm
3. Manual by user (button, app)
4. Solar protection automation
5. Time program (e.g. night: always open)
```

**Manual override:**

- User presses button → manual position valid for 30 minutes
- Then: automation resumes
- Or: manual lock until next day

---

## Room Automation: Shading + Constant Light

Combining shading and lighting for optimal daylight use:

```
Sensor: room brightness (lux)
Target: 500 lux at workstation

When sun shines:
  → Shutter down (glare protection)
  → Slats: optimise daylight
  → Artificial light: supplement to 500 lux (DALI constant light)

When overcast:
  → Shutter open (maximum daylight)
  → Artificial light: supplement to 500 lux
```

Saves 30–50 % lighting energy and improves comfort.

---

## KNX Shading Control

KNX is the most common system for building blinds:

- Group address "blind UP/DOWN" → DO output (1 bit)
- Group address "position" → 0–100 % (1 byte)
- Group address "slat" → 0–100 % (1 byte)
- Group address "wind alarm" → all blinds synchronously up

**BMS integration:** BMS reads KNX bus via IP gateway — enables centralised time programs and solar protection.

---

## Typical BMS Data Points

| Data Point                | Type | Unit | Description                     |
| ------------------------- | ---- | ---- | ------------------------------- |
| Wind speed                | AI   | m/s  | Weather station                 |
| Global irradiance         | AI   | W/m² | Roof pyranometer                |
| Sun azimuth (calc.)       | AV   | °    | Calculated from date + location |
| Sun elevation (calc.)     | AV   | °    | Calculated                      |
| Shutter facade N position | AO   | %    | Target position 0–100 %         |
| Shutter facade N slat     | AO   | °    | Slat angle 0–180°               |
| Wind alarm                | DI   | —    | Above threshold                 |
| Manual override           | DI   | —    | Button active                   |

## Standards

- **EN 15232** — Energy efficiency through BMS (solar shading = major saving potential)
- **EN 14501** — Thermal and visual transmittance of shading products
- **SIA 382.1** — Ventilation and air-conditioning systems (integrated shading)
