---
title: Zonendruckhaltung — Reinräume, OP-Säle, Treppenhäuser
title_en: Zone Pressure Control — Clean Rooms, Operating Theatres and Stairwells
slug: zonendruckhaltung
category: lueftung
subcategory: druckregelung
tags:
  [
    zonendruckhaltung,
    reinraum,
    operationssaal,
    überdruck,
    unterdruck,
    druckdifferenz,
    druckkaskade,
    kaskadenregelung,
    iso14644,
    gmp,
    rlt,
    lüftung,
    krankenhaus,
    pharma,
    halbleiter
  ]
difficulty: experte
area: [hlk, ga]
related: [rlt-anlage, vav-cav, entrauchung-rwa, regelkreise, pid-regler, sensoren]
norm: [EN ISO 14644, EU GMP Annex 1, DIN 1946-4, VDI 2167, SIA 382.1]
updated: 2026-05-15
lang: de
---

# Zonendruckhaltung — Reinräume, OP-Säle, Treppenhäuser

Zonendruckhaltung verhindert, dass kontaminierte Luft in sensible Bereiche eindringt (Überdruck) oder dass gefährliche Stoffe austreten (Unterdruck). Sie ist in Krankenhäusern, Reinräumen und Pharmaproduktion sicherheitskritisch.

## Grundprinzip

```
Überdruck-Zone:
  P_innen > P_aussen → Luft strömt nach aussen
  → verhindert Eindringen von Keimen / Partikeln
  Einsatz: OP-Saal, Reinraum, Frühgeborenen-Station

Unterdruck-Zone:
  P_innen < P_aussen → Luft strömt nach innen
  → verhindert Austreten von Keimen / Chemikalien
  Einsatz: Infektionsstation, Chemielabor, Pathologie
```

**Typische Druckdifferenzen:**

| Bereich             | Typ               | Druckdifferenz |
| ------------------- | ----------------- | -------------- |
| Reinraum ISO 5      | Überdruck         | 10–15 Pa       |
| OP-Saal             | Überdruck         | 15–25 Pa       |
| Infektionsisolation | Unterdruck        | 8–12 Pa        |
| Treppenhaus Brand   | Überdruck         | 50 Pa          |
| Schleuse            | Neutral / Kaskade | 5–10 Pa        |

---

## Druckkaskade

Mehrere Räume bilden eine Kaskade — jede Stufe hat definierten Druck:

```
Korridor    →  Schleuse  →  Reinraum
  0 Pa      →  +5 Pa    →  +15 Pa

Stufung: je Schleuse +5...+10 Pa
Luft strömt immer vom saubereren in den weniger sauberen Bereich

Für Infektionsstation (umgekehrt):
  Korridor  →  Vorraum  →  Isolationszimmer
  0 Pa      →  −5 Pa   →  −12 Pa
```

---

## Regelung der Zonendruckhaltung

### VAV-Regelung (häufig)

```
Drucksensor DP im Raum (relativ zum Korridor):
  Istwert: +18 Pa
  Sollwert: +15 Pa
  Abweichung: +3 Pa → Zuluft-VAV schliessen / Abluft-VAV öffnen

Regelung:
  Zuluft-VAV: Volumenstrom-Regler (Istwert via Pitot)
  Abluft-VAV: Volumenstrom-Regler

  ΔV = V_Zuluft − V_Abluft → Druckdifferenz-Ergebnis

  Korrekt:
    V_Zuluft > V_Abluft → Überdruck aufgebaut
    Differenz: typisch 50–200 m³/h (je nach Raumgrösse)
```

### Kaskaden-Algorithmus im DDC

```
Stufe 1: Drucksensor DP1 (Reinraum vs. Schleuse)
  PID-1 → Zuluft-Sollwert anpassen

Stufe 2: Drucksensor DP2 (Schleuse vs. Korridor)
  PID-2 → Abluft-Sollwert anpassen

Kopplung: DP1 und DP2 interagieren → sorgfältige Entkopplung nötig
  Ti_1 ≠ Ti_2 (unterschiedliche Nachstellzeiten, keine Resonanz)
```

---

## Reinraumklassen (ISO 14644)

| ISO-Klasse   | Partikel ≥ 0.5 µm / m³ | Typischer Einsatz          |
| ------------ | ---------------------- | -------------------------- |
| ISO 5 (M3.5) | ≤ 3.520                | Kritischer OP, Aseptik     |
| ISO 6        | ≤ 35.200               | Pharma-Sterilabfüllung     |
| ISO 7        | ≤ 352.000              | Klasse C Pharma            |
| ISO 8        | ≤ 3.520.000            | Klasse D Pharma, Technikum |

**Luftwechsel OP-Saal (DIN 1946-4):** ≥ 1200 m³/h, LAF-Decke (Laminar Air Flow) 0,24–0,45 m/s.

---

## OP-Saal Druckhaltung

```
OP-Saal Lüftung nach DIN 1946-4:
  Überdruck: +15 Pa zum Korridor
  LAF-Decke (UDF = Unidirectional Air Flow): senkrecht nach unten
  Zuluft-Temperatur: 16–26 °C regelbar
  Zuluft-Feuchte: 30–60 % rF
  Luftwechsel: typ. 20–25 fach pro Stunde

GA-Freigabe:
  OP-Leuchte EIN → Lüftung auf 100 % Volumenstrom
  OP-Pause → Absenkbetrieb (50 %) mit Druckerhalt
  OP-Reinigung → Spülbetrieb 100 %, danach Freigabe
```

---

## GA-Datenpunkte Zonendruckhaltung

| Datenpunkt                        | Typ | Einheit | Beschreibung                   |
| --------------------------------- | --- | ------- | ------------------------------ |
| Druckdifferenz Raum               | AI  | Pa      | Raum vs. Referenz              |
| Druckdifferenz Sollwert           | AV  | Pa      | Vorgabe ±                      |
| Zuluft-Volumenstrom Ist           | AI  | m³/h    | Pitot-Messung                  |
| Abluft-Volumenstrom Ist           | AI  | m³/h    | Pitot-Messung                  |
| Zuluft-VAV Stellsignal            | AO  | %       | 0–100 %                        |
| Abluft-VAV Stellsignal            | AO  | %       | 0–100 %                        |
| Druckdifferenz Alarm              | DI  | —       | Grenzwert über-/unterschritten |
| Betriebsart (Normal/OP/Reinigung) | AV  | —       | Betriebsmodus                  |

---

## Herausforderungen und Praxishinweise

| Problem                        | Ursache                          | Lösung                         |
| ------------------------------ | -------------------------------- | ------------------------------ |
| Druckpendeln                   | PID zu aggressiv, Totzeit        | Ti erhöhen, Kaskade entkoppeln |
| Druckverlust bei Türöffnung    | VAV zu träge                     | Schnellregelung, Feed-Forward  |
| Undichte Bauhülle              | Fugen, Kabeleinführungen         | Luftdichtigkeitstest vor IBN   |
| Druckkoppelung zwischen Räumen | Gemeinsame Abluft-/Zuluftleitung | Getrennte Kreise, VAV je Raum  |
| Filterdruckabfall → weniger ΔV | Verschmutzter Filter             | Filteralarm, Delta-P-Wächter   |

---

## Normen

- **EN ISO 14644-1** — Reinräume: Klassifikation der Luftreinheit
- **EN ISO 14644-4** — Reinräume: Planung, Bau, Inbetriebnahme
- **EU GMP Annex 1** — Herstellung steriler Arzneimittel (Reinraumklassen A–D)
- **DIN 1946-4** — Raumlufttechnik in Gebäuden des Gesundheitswesens
- **VDI 2167** — Gebäudetechnik in Krankenhäusern

<!-- EN -->

Zone pressure control prevents contaminated air from entering sensitive areas (positive pressure) or hazardous substances from escaping (negative pressure). It is safety-critical in hospitals, clean rooms, and pharmaceutical production.

## Basic Principle

```
Positive pressure zone:
  P_inside > P_outside → air flows outward
  → prevents ingress of microorganisms / particles
  Application: operating theatre, clean room, neonatal unit

Negative pressure zone:
  P_inside < P_outside → air flows inward
  → prevents escape of microorganisms / chemicals
  Application: infectious isolation, chemistry lab, pathology
```

**Typical pressure differentials:**

| Area                 | Type              | Pressure differential |
| -------------------- | ----------------- | --------------------- |
| Clean room ISO 5     | Positive          | 10–15 Pa              |
| Operating theatre    | Positive          | 15–25 Pa              |
| Infectious isolation | Negative          | 8–12 Pa               |
| Stairwell (fire)     | Positive          | 50 Pa                 |
| Airlock              | Neutral / cascade | 5–10 Pa               |

---

## Pressure Cascade

Multiple rooms form a cascade — each level has a defined pressure:

```
Corridor    →  Airlock   →  Clean room
  0 Pa      →  +5 Pa    →  +15 Pa

Step: +5...+10 Pa per airlock
Air always flows from the cleaner into the less clean area

For infectious disease unit (reversed):
  Corridor  →  Anteroom →  Isolation room
  0 Pa      →  −5 Pa   →  −12 Pa
```

---

## Zone Pressure Control

### VAV Control (Most Common)

```
Differential pressure sensor in room (relative to corridor):
  Actual: +18 Pa
  Setpoint: +15 Pa
  Deviation: +3 Pa → close supply VAV / open extract VAV

Control:
  Supply VAV: volume flow controller (actual via Pitot)
  Extract VAV: volume flow controller

  ΔV = V_supply − V_extract → pressure differential result

  Correctly:
    V_supply > V_extract → positive pressure established
    Difference: typically 50–200 m³/h (depending on room size)
```

### Cascade Algorithm in DDC

```
Level 1: Pressure sensor DP1 (clean room vs. airlock)
  PID-1 → adjust supply setpoint

Level 2: Pressure sensor DP2 (airlock vs. corridor)
  PID-2 → adjust extract setpoint

Coupling: DP1 and DP2 interact → careful decoupling required
  Ti_1 ≠ Ti_2 (different reset times, avoid resonance)
```

---

## Clean Room Classes (ISO 14644)

| ISO class    | Particles ≥ 0.5 µm / m³ | Typical application            |
| ------------ | ----------------------- | ------------------------------ |
| ISO 5 (M3.5) | ≤ 3,520                 | Critical OR, aseptic filling   |
| ISO 6        | ≤ 35,200                | Pharmaceutical sterile filling |
| ISO 7        | ≤ 352,000               | Class C pharma                 |
| ISO 8        | ≤ 3,520,000             | Class D pharma, pilot plant    |

**Air changes — operating theatre (DIN 1946-4):** ≥ 1,200 m³/h, LAF ceiling (Laminar Air Flow) 0.24–0.45 m/s.

---

## Operating Theatre Pressure Control

```
OR ventilation per DIN 1946-4:
  Positive pressure: +15 Pa to corridor
  LAF ceiling (UDF = Unidirectional Air Flow): vertically downward
  Supply air temperature: 16–26 °C controllable
  Supply air humidity: 30–60 % RH
  Air changes: typically 20–25 per hour

BA enable:
  OR light ON → ventilation to 100 % volume flow
  OR pause → setback mode (50 %) maintaining pressure
  OR cleaning → purge mode 100 %, then enable
```

---

## BA Data Points — Zone Pressure Control

| Data point                          | Type | Unit | Description           |
| ----------------------------------- | ---- | ---- | --------------------- |
| Differential pressure room          | AI   | Pa   | Room vs. reference    |
| Differential pressure setpoint      | AV   | Pa   | Target ±              |
| Supply air volume flow actual       | AI   | m³/h | Pitot measurement     |
| Extract air volume flow actual      | AI   | m³/h | Pitot measurement     |
| Supply VAV control signal           | AO   | %    | 0–100 %               |
| Extract VAV control signal          | AO   | %    | 0–100 %               |
| Pressure differential alarm         | DI   | —    | Limit over-/undershot |
| Operating mode (normal/OR/cleaning) | AV   | —    | Operating mode        |

---

## Challenges and Practical Notes

| Problem                         | Cause                         | Solution                                |
| ------------------------------- | ----------------------------- | --------------------------------------- |
| Pressure hunting                | PID too aggressive, dead time | Increase Ti, decouple cascade           |
| Pressure loss on door opening   | VAV too slow                  | Fast control, feed-forward              |
| Leaky building envelope         | Joints, cable penetrations    | Air-tightness test before commissioning |
| Pressure coupling between rooms | Shared extract/supply duct    | Separate circuits, VAV per room         |
| Filter pressure drop → less ΔV  | Clogged filter                | Filter alarm, ΔP monitor                |

---

## Standards

- **EN ISO 14644-1** — Clean rooms: classification of air cleanliness
- **EN ISO 14644-4** — Clean rooms: design, construction, commissioning
- **EU GMP Annex 1** — Manufacture of sterile medicinal products (clean room classes A–D)
- **DIN 1946-4** — Ventilation in healthcare buildings
- **VDI 2167** — Building services in hospitals
