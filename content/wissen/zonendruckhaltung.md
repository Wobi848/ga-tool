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
norm: [EN ISO 14644, EU GMP Annex 1, DIN 1946-4, VDI 2167, SIA 382/1]
updated: 2026-05-15
lang: de
---

# Zonendruckhaltung — Reinräume, OP-Säle, Treppenhäuser

Zonendruckhaltung verhindert, dass kontaminierte Luft in sensible Bereiche eindringt (Überdruck) oder dass gefährliche Stoffe austreten (Unterdruck). Sie ist in Krankenhäusern, Reinräumen und Pharmaproduktion sicherheitskritisch.

## Grundprinzip

- **Überdruck:** Im Raum ist der Druck höher als ringsum, Luft strömt durch Fugen und offene Türen hinaus. Keime und Partikel kommen nicht hinein. Einsatz: OP-Säle, Reinräume, Neonatologie.
- **Unterdruck:** Der Druck ist tiefer, Luft strömt hinein. Was im Raum ist, bleibt drin. Einsatz: Infektionszimmer, Labore, Pathologie.

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

Mehrere Räume bilden eine Abstufung, jede Stufe einige Pascal auseinander. Die Luft strömt immer **vom saubereren zum weniger sauberen** Bereich:

- Reinraum: Korridor 0 Pa → Schleuse +5 Pa → Reinraum +15 Pa
- Infektionszimmer, umgekehrt: Korridor 0 Pa → Vorraum −5 Pa → Zimmer −12 Pa

Typisch sind 5 bis 15 Pa je Stufe.

---

## Regelung der Zonendruckhaltung

### VAV-Regelung (häufig)

Der Raumdruck entsteht aus der **Differenz von Zu- und Abluft**: mehr Zuluft heisst Überdruck. Beide Volumenströme werden von VAV-Reglern gehalten. Ein Drucksensor zwischen Raum und Referenz (meist Korridor) korrigiert die Differenz:

- Druck zu hoch: Zuluft etwas weniger oder Abluft etwas mehr
- Druck zu tief: umgekehrt

Wie viel Differenz nötig ist, hängt vor allem von der Dichtheit des Raums ab, bei üblichen Räumen einige zehn bis wenige hundert m³/h.

### Kaskaden-Algorithmus im DDC

Bei mehreren gekoppelten Stufen beeinflussen sich die Regelkreise gegenseitig. Bewährt: jede Stufe regelt einen eigenen Volumenstrom, die Regler bekommen deutlich verschiedene Geschwindigkeiten, und Türkontakte frieren die Regelung beim Öffnen kurz ein, statt nachzuregeln.

---

## Reinraumklassen (ISO 14644)

| ISO-Klasse   | Partikel ≥ 0.5 µm / m³ | Typischer Einsatz          |
| ------------ | ---------------------- | -------------------------- |
| ISO 5 (M3.5) | ≤ 3.520                | Kritischer OP, Aseptik     |
| ISO 6        | ≤ 35.200               | Pharma-Sterilabfüllung     |
| ISO 7        | ≤ 352.000              | Klasse C Pharma            |
| ISO 8        | ≤ 3.520.000            | Klasse D Pharma, Technikum |

---

## OP-Saal Druckhaltung

- **Betrieb:** volle Luftmenge, Überdruck zu den Nebenräumen
- **Pause, Nacht:** abgesenkt, der Überdruck bleibt erhalten
- **Reinigung:** volle Luftmenge, Freigabe erst nach Spülzeit

Luftmengen, Temperaturen und Feuchten richten sich nach der Raumklasse nach DIN 1946-4 (in der Schweiz SWKI 99-3) und dem Hygieneplan des Spitals. Raumklasse Ia hat über dem OP-Feld eine turbulenzarme Verdrängungsströmung mit entsprechend grossen Luftmengen.

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
- **SWKI 99-3** — Lüftung in Spitälern (CH)

<!-- EN -->

Zone pressure control prevents contaminated air from entering sensitive areas (positive pressure) or hazardous substances from escaping (negative pressure). It is safety-critical in hospitals, clean rooms, and pharmaceutical production.

## Basic Principle

- **Overpressure:** the pressure in the room is higher than around it; air flows out through gaps and open doors. Germs and particles stay out. Use: operating theatres, cleanrooms, neonatology.
- **Underpressure:** the pressure is lower; air flows in. Whatever is in the room stays in. Use: infection rooms, laboratories, pathology.

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

Several rooms form a gradation, each step a few pascals apart. Air always flows **from the cleaner to the less clean** area:

- Cleanroom: corridor 0 Pa → airlock +5 Pa → cleanroom +15 Pa
- Infection room, the other way round: corridor 0 Pa → anteroom −5 Pa → room −12 Pa

5 to 15 Pa per step is typical.

---

## Zone Pressure Control

### VAV Control (Most Common)

Room pressure results from the **difference between supply and extract**: more supply means overpressure. Both airflows are held by VAV controllers. A pressure sensor between room and reference (usually the corridor) corrects the difference:

- pressure too high: slightly less supply or slightly more extract
- pressure too low: the other way round

How much difference is needed depends mainly on the airtightness of the room, for usual rooms a few tens to a few hundred m³/h.

### Cascade Algorithm in DDC

With several coupled steps the control loops influence each other. Proven: each step controls its own airflow, the controllers get clearly different speeds, and door contacts freeze the control briefly while a door is open instead of chasing it.

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

- **Operation:** full airflow, overpressure towards adjacent rooms
- **Break, night:** reduced, overpressure maintained
- **Cleaning:** full airflow, release only after a purge time

Airflows, temperatures and humidities follow the room class per DIN 1946-4 (in Switzerland SWKI 99-3) and the hospital's hygiene plan. Room class Ia has a low-turbulence displacement flow over the operating field with correspondingly large airflows.

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
- **SWKI 99-3** — Ventilation in hospitals (CH)
