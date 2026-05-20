---
title: Beleuchtungssteuerung via GA — Konstantlicht, Präsenz, Tageslichtkurve
title_en: Lighting Control via BA — Constant Light, Occupancy and Daylight Curve
slug: beleuchtungssteuerung
category: gebaeude
subcategory: beleuchtung
tags: [beleuchtungssteuerung, konstantlichtregelung, präsenzmelder, tageslichtsensor, lux, dali, knx, 1-10v, dimmen, energieeinsparung, tageslicht, helligkeitssensor, büro, beleuchtung, ga]
difficulty: fortgeschritten
area: [ga, elektro]
related: [dali, knx, beschattungssteuerung, raumautomation, en15232, thermische-behaglichkeit, praesenzsensoren, helligkeitssensoren]
norm: [EN 12464-1, EN 15232, DIN 5035, SIA 380/4]
updated: 2026-05-15
lang: de
---

# Beleuchtungssteuerung via GA — Konstantlicht, Präsenz, Tageslichtkurve

Beleuchtungssteuerung über die GA (GLT / DDC) kombiniert Licht-Komfort mit Energieeinsparung. Abgrenzung: DALI ist das Protokoll für Leuchten, die GA koordiniert das Gesamtsystem (Zeiten, Szenen, Beschattung, Präsenz).

## Steuerungsstrategien im Überblick

| Strategie              | Energieeinsparung | Komfort | Typischer Einsatz          |
|------------------------|------------------:|---------|----------------------------|
| Zeitsteuerung          | 20–30 %           | ★★☆     | Einfachste Lösung, Flure   |
| Präsenzsteuerung       | 30–50 %           | ★★★     | Einzelbüros, WC, Korridor  |
| Konstantlichtregelung  | 40–60 %           | ★★★     | Büros, Schulzimmer         |
| Tageslicht + Präsenz   | 60–70 %           | ★★★     | Best Practice Büro         |

---

## Konstantlichtregelung (Daylight Harvesting)

Ziel: Beleuchtungsstärke im Raum konstant halten, unabhängig vom Tageslicht:

```
Helligkeitssensor (Luxmeter) im Raum:
  Ist-Wert: 420 lux (Tageslicht + künstlich)
  Sollwert: 500 lux (Arbeitsplatz nach EN 12464)
  
  PID-Regler → DALI-Dimmsignal erhöhen
    ↓
  Dimmwert Leuchte: 30 % → 55 %
  (Tageslicht nimmt ab → künstliches Licht ergänzt)
```

**Lux-Sollwerte nach EN 12464-1:**

| Bereich                    | Empfohlene Beleuchtungsstärke |
|----------------------------|-------------------------------|
| Büro (Bildschirmarbeit)    | 500 lux                       |
| Schulzimmer                | 300–500 lux                   |
| Empfang / Foyer            | 200–300 lux                   |
| Korridor, Treppenhaus      | 100 lux                       |
| Parking                    | 75 lux                        |
| Lager                      | 100–200 lux                   |

---

## Präsenzsteuerung

```
PIR / Radar-Melder:
  Bewegung erkannt → Licht EIN
  Keine Bewegung für X Minuten → Licht dimmen → ausschalten
  
Typische Nachlaufzeiten:
  WC: 5–10 min
  Einzelbüro: 15–30 min
  Besprechung: 30 min
  Korridor: 5 min
```

**PIR vs. Radar:**
- PIR (Passiv-Infrarot): Erkennt Wärmebewegung, günstiger, reagiert nicht auf sehr langsame Bewegungen
- Radar (HF, Microwave): Erkennt auch minimale Bewegungen (z.B. tippende Person), teurer, durchdringt Wände leicht

**Totzone / Dead-Zone:** Wenn Präsenzmelder nach 20 min Inaktivität abschaltet und Person noch sitzt → Ärger. Lösung: Radar-Melder mit Empfindlichkeitsjustierung oder manuelle Verlängerungstaste.

---

## Tageslichtkurve / Circadian Tuning

Moderne Konzepte (HCL = Human Centric Lighting):

```
Morgens 07:00:  Kaltes Weisslicht 5500 K, 300 lux → Aktivierung
Mittag 12:00:   Neutralweiss 4000 K, 500 lux → Konzentration
Abends 17:00:   Warmweiss 3000 K, 200 lux → Entspannung
```

Erfordert DALI-2 (Farbtemperatur-Steuerung, Device Type 8) und Farbtemperatur-fähige Leuchten (TW = Tunable White).

---

## Szenensteuerung

DDC oder KNX definiert Lichtszenen für verschiedene Nutzungen:

```
Szene 1 "Präsentation": 
  Beamer-Bereich dunkel (0 %), Wandbeleuchtung 30 %
  
Szene 2 "Normal Büro":
  Alle Leuchten Konstantlicht 500 lux

Szene 3 "Reinigung":
  Alle Leuchten 100 %
  
Szene 4 "Nacht/Sicherheit":
  Notbeleuchtungspegel 10 lux an definierten Punkten
```

Auslösung via:
- Taster (KNX Gruppenadresse)
- Zeitprogramm (GLT)
- Präsenzmelder + Szenenlogik im DDC

---

## Schnittstellen und Protokolle

| Schnittstelle | Typischer Einsatz                           |
|---------------|---------------------------------------------|
| **DALI**      | Einzelleuchten, Gruppen, Statusrückmeldung  |
| **KNX**       | Raumautomation, Szenen, Taster-Integration  |
| **1–10 V**    | Einfaches Dimmen (kein Feedback)            |
| **Modbus**    | DALI-Gateway → DDC, Multizonen-Controller   |
| **EnOcean**   | Batterielose Taster (Wandschalter ohne Kabel)|

**Abgrenzung DALI ↔ GA:**
- DALI: steuert einzelne Leuchten (Dimmen, Ein/Aus, Gruppen, Szenen im Betriebsgerät)
- GA/DDC: koordiniert DALI-Kreise mit Präsenz, Zeit, Beschattung, HVAC-Betriebsarten

---

## GA-Datenpunkte Beleuchtung

| Datenpunkt               | Typ | Einheit | Beschreibung              |
|--------------------------|-----|---------|---------------------------|
| Beleuchtung Ist          | AI  | lux     | Helligkeitssensor Raum    |
| Beleuchtung Sollwert     | AV  | lux     | Vorgabe (z.B. 500 lux)    |
| DALI-Dimmwert            | AO  | %       | 0–100 % Dimmsignal        |
| Präsenz erkannt          | DI  | —       | PIR/Radar-Signal          |
| Beleuchtung Betriebsart  | AV  | —       | Normal / Szene / Manuell  |
| Beleuchtung Energie      | AI  | kWh     | Zähler (Submetering)      |

---

## Energieeinsparung EN 15232

Beleuchtungssteuerung trägt stark zur GA-Effizienzklasse A (EN 15232) bei:

| GA-Klasse | Beleuchtungsfunktion                              | Einsparung vs. D |
|-----------|---------------------------------------------------|-----------------|
| D         | Manuell EIN/AUS                                   | Referenz        |
| C         | Zeitsteuerung + manuelle Steuerung                | 10 %            |
| B         | Präsenz + manuelle Korrektur                      | 25 %            |
| A         | Präsenz + Konstantlicht + Tageslichtkopplung      | 35–50 %         |

---

## Normen

- **EN 12464-1** — Beleuchtung von Arbeitsstätten (Lux-Anforderungen)
- **EN 15232** — Einfluss GA auf Energieeffizienz (Beleuchtungssteuerung als Klasse-A-Funktion)
- **DIN 5035** — Innenraumbeleuchtung mit künstlichem Licht
- **SIA 380/4** — Elektrische Energie im Hochbau (Beleuchtungsplanung)

<!-- EN -->

Lighting control through the BA system (BMS / DDC) combines lighting comfort with energy savings. The distinction: DALI is the protocol for luminaires; the BA system coordinates the overall installation (scheduling, scenes, shading, occupancy).

## Control Strategies Overview

| Strategy | Energy saving | Comfort | Typical application |
|----------|-------------|---------|-------------------|
| Time scheduling | 20–30 % | ★★☆ | Simplest solution, corridors |
| Occupancy control | 30–50 % | ★★★ | Private offices, WC, corridors |
| Constant light control | 40–60 % | ★★★ | Offices, classrooms |
| Daylight + occupancy | 60–70 % | ★★★ | Best practice office |

---

## Constant Light Control (Daylight Harvesting)

Goal: maintain constant illuminance in the room regardless of daylight:

```
Illuminance sensor (lux meter) in room:
  Actual: 420 lux (daylight + artificial)
  Setpoint: 500 lux (workstation per EN 12464)
  
  PID controller → increase DALI dimming signal
    ↓
  Luminaire dimming level: 30 % → 55 %
  (daylight decreases → artificial light supplements)
```

**Lux setpoints per EN 12464-1:**

| Area | Recommended illuminance |
|------|------------------------|
| Office (screen work) | 500 lux |
| Classroom | 300–500 lux |
| Reception / lobby | 200–300 lux |
| Corridor, stairwell | 100 lux |
| Car park | 75 lux |
| Storage | 100–200 lux |

---

## Occupancy Control

```
PIR / radar detector:
  Movement detected → lights ON
  No movement for X minutes → dim lights → switch off
  
Typical hold-on times:
  WC: 5–10 min
  Private office: 15–30 min
  Meeting room: 30 min
  Corridor: 5 min
```

**PIR vs. radar:**
- PIR (passive infrared): detects heat movement, lower cost, does not detect very slow movements
- Radar (HF, microwave): detects even minimal movement (e.g. person typing), higher cost, slightly penetrates walls

**Dead zone:** If the occupancy detector switches off after 20 min of inactivity while someone is still seated → user frustration. Solution: radar detector with sensitivity adjustment or manual extension button.

---

## Daylight Curve / Circadian Tuning

Modern concepts (HCL = Human Centric Lighting):

```
Morning 07:00:  Cool white 5500 K, 300 lux → activation
Midday 12:00:   Neutral white 4000 K, 500 lux → concentration
Evening 17:00:  Warm white 3000 K, 200 lux → relaxation
```

Requires DALI-2 (colour temperature control, Device Type 8) and colour temperature-capable luminaires (TW = Tunable White).

---

## Scene Control

DDC or KNX defines lighting scenes for different uses:

```
Scene 1 "Presentation":
  Projector area dark (0 %), wall lighting 30 %
  
Scene 2 "Normal office":
  All luminaires constant light 500 lux

Scene 3 "Cleaning":
  All luminaires 100 %
  
Scene 4 "Night/security":
  Emergency lighting level 10 lux at defined points
```

Triggering via:
- Push-button (KNX group address)
- Time schedule (BMS)
- Occupancy detector + scene logic in DDC

---

## Interfaces and Protocols

| Interface | Typical application |
|----------|-------------------|
| **DALI** | Individual luminaires, groups, status feedback |
| **KNX** | Room automation, scenes, push-button integration |
| **1–10 V** | Simple dimming (no feedback) |
| **Modbus** | DALI gateway → DDC, multi-zone controller |
| **EnOcean** | Battery-free push-buttons (wireless wall switches) |

**Distinction DALI ↔ BA:**
- DALI: controls individual luminaires (dimming, on/off, groups, scenes in the ballast)
- BA/DDC: coordinates DALI circuits with occupancy, scheduling, shading, HVAC operating modes

---

## BA Data Points — Lighting

| Data point | Type | Unit | Description |
|-----------|------|------|------------|
| Illuminance actual | AI | lux | Room illuminance sensor |
| Illuminance setpoint | AV | lux | Target (e.g. 500 lux) |
| DALI dimming value | AO | % | 0–100 % dimming signal |
| Occupancy detected | DI | — | PIR/radar signal |
| Lighting operating mode | AV | — | Normal / scene / manual |
| Lighting energy | AI | kWh | Sub-metering counter |

---

## Energy Savings — EN 15232

Lighting control contributes strongly to BA efficiency class A (EN 15232):

| BA class | Lighting function | Saving vs. D |
|---------|-----------------|-------------|
| D | Manual on/off | Reference |
| C | Time scheduling + manual control | 10 % |
| B | Occupancy + manual correction | 25 % |
| A | Occupancy + constant light + daylight coupling | 35–50 % |

---

## Standards

- **EN 12464-1** — Lighting of workplaces (lux requirements)
- **EN 15232** — Influence of BA on energy efficiency (lighting control as class A function)
- **DIN 5035** — Interior lighting with artificial light
- **SIA 380/4** — Electrical energy in buildings (lighting design)
