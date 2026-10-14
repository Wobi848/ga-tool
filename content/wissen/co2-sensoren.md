---
title: CO₂-Sensoren — NDIR-Messprinzip und GA-Integration
title_en: CO₂ Sensors — NDIR Measurement Principle and BA Integration
slug: co2-sensoren
category: sensoren
subcategory: luftqualität
tags:
  [
    co2-sensor,
    ndir,
    kohlendioxid,
    raumluftqualität,
    iaq,
    abc-kalibrierung,
    pettenkofer,
    en16798,
    vdi6022,
    bedarfsgeführte-lüftung,
    ddc-co2,
    ppm,
    co2-regelung,
    zuluft-regelung,
    kalibrierung,
    wandfühler,
    kanalfühler
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [raumluftqualitaet, vav-cav, sensoren, befeuchter, druckregelung-lueftung, rlt-anlage]
rechner: []
norm: [EN 16798-1, EN 16798-3, ASHRAE 62.1, EN ISO 16000-26]
updated: 2026-05-15
lang: de
---

# CO₂-Sensoren — NDIR-Messprinzip und GA-Integration

CO₂-Konzentration ist der wichtigste Indikator für die **Raumluftqualität** in belegten Räumen. Sie korreliert direkt mit der Personenanzahl und ist die Grundlage für die **bedarfsgeführte Lüftung** — eine der wirksamsten Energiesparmassnahmen in der GA.

---

## NDIR — Nicht-dispersive Infrarot-Absorption

Das Messprinzip aller gängigen CO₂-Raumsensoren:

Die Infrarotquelle durchstrahlt die Messküvette. CO₂ absorbiert bei 4.26 µm, und je mehr CO₂ in der Luft ist, desto weniger Licht kommt beim Detektor an.

1. IR-Quelle emittiert breitbandiges Infrarotlicht
2. Gas-Probe in Messküvette: CO₂ absorbiert einen Teil der IR-Strahlung bei 4,26 µm
3. Optischer Schmalbandfilter (4,26 µm) lässt nur relevante Wellenlänge durch
4. Detektor misst verbleibende IR-Intensität
5. Signal wird in ppm CO₂ umgerechnet (Beer-Lambert-Gesetz)

**Referenzkanal:** Zweiter Detektor/Kanal bei einer Wellenlänge, die CO₂ nicht absorbiert → Kompensation von IR-Quellen-Drift und Staubverschmutzung.

---

## Grenzwerte und Richtwerte

| CO₂-Konzentration | Bewertung                                                      |
| ----------------- | -------------------------------------------------------------- |
| rund 420 ppm      | Aussenluft                                                     |
| bis ≈ 970 ppm     | Kategorie I nach EN 16798-1 (≤ 550 ppm über aussen)            |
| bis ≈ 1220 ppm    | Kategorie II (≤ 800 ppm über aussen), normaler Neubau          |
| bis ≈ 1770 ppm    | Kategorie III (≤ 1350 ppm über aussen)                         |
| 1000 ppm          | **Pettenkofer-Zahl**, historischer Richtwert für gute Raumluft |
| über 2000 ppm     | deutlich schlechte Luft, Müdigkeit und Konzentrationsprobleme  |
| 5000 ppm          | MAK-Wert am Arbeitsplatz (Suva)                                |

Die absoluten Werte gelten für rund 420 ppm Aussenluft. EN 16798-1 rechnet immer mit der Differenz zur Aussenluft.

**GA-Sollwert:** In Büros meist 800 bis 1000 ppm als Beginn der Erhöhung, damit Kategorie II sicher eingehalten wird.

---

## Kalibrierung

### ABC-Kalibrierung (Automatic Baseline Correction)

Der Sensor nimmt an, dass die minimale CO₂-Konzentration über ca. 2 Wochen dem Aussenwert (400–450 ppm) entspricht (z.B. nachts/am Wochenende bei ungenutztem Gebäude):

- Automatisch, kein Eingriff nötig
- **Problem:** In durchgehend genutzten Räumen (Krankenhaus, 24/7-Betrieb) funktioniert ABC nicht korrekt
- Abhilfe: ABC deaktivieren, manuelle Kalibrierung

### Manuelle Kalibrierung (Frischluft-Kalibrierung)

Sensor für 20 min frischer Aussenluft (ohne direkten Atemzug) aussetzen, dann Nullpunkt setzen:

- Einmalig bei Inbetriebnahme empfohlen
- Wiederholungsintervall: alle 1–2 Jahre

---

## Sensortypen für die GA

| Typ                             | Einbau           | Einsatz                               |
| ------------------------------- | ---------------- | ------------------------------------- |
| **Wandfühler mit Display**      | Sichtbar im Raum | Büro, Konferenzraum                   |
| **Wandfühler ohne Display**     | Unauffällig      | Standardräume                         |
| **Kanalsensor**                 | Im Abluftkanal   | Zentrale Auswertung für mehrere Räume |
| **Kombisensor** CO₂ + Temp + rF | Wandmontage      | Raumklimastation                      |

**Kanal vs. Raumsensor:**

- Kanalsensor misst die gemischte Abluft → mittlere Raumluftqualität
- Raumsensor misst repräsentativen Punkt → direkter Raumwert
- Für Einzelraum-VAV: Raumsensor bevorzugt

---

## Bedarfsgeführte Lüftung (Demand Controlled Ventilation, DCV)

| CO₂ im Raum   | Volumenstrom                      |
| ------------- | --------------------------------- |
| unter 800 ppm | Mindestvolumenstrom, Grundlüftung |
| 800–1200 ppm  | stetig ansteigend                 |
| über 1200 ppm | Maximalvolumenstrom               |
| über 1500 ppm | zusätzlich Meldung an die GLT     |

Stetige Regelung zwischen zwei Schwellen ist ruhiger als feste Stufen. Die Werte sind Beispiele; sie folgen aus der geforderten Kategorie.

**Energiesparpotenzial DCV gegenüber Konstantlüftung:** 30–60% Ventilator-Energieeinsparung in teilbelegten Räumen (Büros, Konferenzräume).

---

## Integration in die DDC/GLT

**Typische DDC-Funktionen:**

- Grenzwert-Alarme (Warnung 1000 ppm, Alarm 1500 ppm)
- Regelkreis CO₂ → Zuluftvolumenstrom
- Trending (Historisierung für Betriebsoptimierung und als Nachweis der Raumluftqualität)
- Stufenlose oder mehrstufige Volumenstromregelung

**Ausgangssignale Sensor:**

- 0–10 V (0 V = 0 ppm, 10 V = 2000 ppm) — häufigste GA-Version
- 4–20 mA (4 mA = 0 ppm, 20 mA = 2000 ppm)
- Modbus RTU / RS-485 — für digitale Anbindung mit Diagnose

---

## Häufige Fehler und Lösungen

| Problem                                     | Ursache                                      | Lösung                                         |
| ------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| Sensor zeigt dauerhaft 400 ppm (Aussenluft) | ABC-Kalibrierung hat falsche Baseline        | ABC deaktivieren, manuell kalibrieren          |
| Messwert schwankt stark                     | Direkter Atemhauch (schlechter Montageort)   | Sensor mind. 1,5 m über Boden, nicht neben Tür |
| Zu hohe Werte trotz Lüftung                 | Kanalsensor misst rückgeführte Luft          | Frischluftanteil im Abluft-Mischpunkt prüfen   |
| Keine Reaktion auf Belegung                 | Signal falsch verknüpft / Schwellwert falsch | DDC-Parametrierung prüfen                      |

<!-- EN -->

CO₂ concentration is the most important indicator of **indoor air quality** in occupied rooms. It correlates directly with occupancy and forms the basis for **demand-controlled ventilation (DCV)** — one of the most effective energy-saving measures in building automation.

---

## NDIR — Non-Dispersive Infrared Absorption

The measurement principle used by all common CO₂ room sensors:

The infrared source shines through the measuring cell. CO₂ absorbs at 4.26 µm, and the more CO₂ in the air, the less light reaches the detector.

1. IR source emits broadband infrared light
2. Gas sample in measurement cell: CO₂ absorbs part of the IR at 4.26 µm
3. Optical narrowband filter (4.26 µm) passes only the relevant wavelength
4. Detector measures remaining IR intensity
5. Signal is converted to ppm CO₂ (Beer-Lambert law)

**Reference channel:** Second detector at a wavelength not absorbed by CO₂ → compensates for IR source drift and dust contamination.

---

## Threshold and Reference Values

| CO₂ concentration | Assessment                                                  |
| ----------------- | ----------------------------------------------------------- |
| about 420 ppm     | outdoor air                                                 |
| up to ≈ 970 ppm   | category I per EN 16798-1 (≤ 550 ppm above outdoor)         |
| up to ≈ 1220 ppm  | category II (≤ 800 ppm above outdoor), normal new building  |
| up to ≈ 1770 ppm  | category III (≤ 1350 ppm above outdoor)                     |
| 1000 ppm          | **Pettenkofer number**, historical guide value for good air |
| above 2000 ppm    | clearly poor air, tiredness and concentration problems      |
| 5000 ppm          | occupational exposure limit (Switzerland: Suva MAK)         |

The absolute values apply to about 420 ppm outdoor air. EN 16798-1 always works with the difference to outdoor air.

**BA setpoint:** in offices usually 800 to 1000 ppm as the start of the increase, so that category II is safely met.

---

## Calibration

### ABC Calibration (Automatic Baseline Correction)

The sensor assumes that the minimum CO₂ over ~2 weeks corresponds to the outdoor value (400–450 ppm — e.g. at night/weekends in unoccupied buildings):

- Automatic, no intervention required
- **Problem:** In continuously occupied spaces (hospitals, 24/7 operation), ABC does not work correctly
- Solution: Disable ABC, use manual calibration

### Manual Calibration (Fresh Air Calibration)

Expose sensor to fresh outdoor air for 20 min (not directly in a breath stream), then set the zero point:

- Recommended once during commissioning
- Repeat interval: every 1–2 years

---

## Sensor Types for BA

| Type                                   | Installation        | Application                               |
| -------------------------------------- | ------------------- | ----------------------------------------- |
| **Wall-mount with display**            | Visible in room     | Office, conference room                   |
| **Wall-mount without display**         | Unobtrusive         | Standard rooms                            |
| **Duct sensor**                        | In exhaust air duct | Centralised evaluation for multiple rooms |
| **Combination sensor** CO₂ + Temp + RH | Wall-mount          | Room climate station                      |

**Duct vs. room sensor:**

- Duct sensor measures mixed exhaust air → average room air quality
- Room sensor measures a representative point → direct room value
- For single-room VAV: room sensor preferred

---

## Demand Controlled Ventilation (DCV)

| CO₂ in room    | Air flow                       |
| -------------- | ------------------------------ |
| below 800 ppm  | minimum flow, base ventilation |
| 800–1200 ppm   | rising continuously            |
| above 1200 ppm | maximum flow                   |
| above 1500 ppm | additional message to the BMS  |

Modulating control between two thresholds is calmer than fixed stages. The values are examples; they follow from the required category.

**Energy savings potential DCV vs. constant volume:** 30–60% fan energy reduction in partially occupied spaces (offices, conference rooms).

---

## Integration into DDC / BMS

**Typical DDC functions:**

- Threshold alarms (warning 1000 ppm, alarm 1500 ppm)
- Control loop CO₂ → supply air volume flow
- Trending (historisation for operational optimisation and as proof of indoor air quality)
- Continuous or multi-stage volume flow control

**Sensor output signals:**

- 0–10 V (0 V = 0 ppm, 10 V = 2000 ppm) — most common BA version
- 4–20 mA (4 mA = 0 ppm, 20 mA = 2000 ppm)
- Modbus RTU / RS-485 — digital integration with diagnostics

---

## Common Errors and Solutions

| Problem                         | Cause                                       | Solution                                         |
| ------------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Sensor always reads 400 ppm     | ABC calibration has wrong baseline          | Disable ABC, calibrate manually                  |
| Reading fluctuates strongly     | Direct breath exposure (poor mounting)      | Mount min. 1.5 m above floor, not near door      |
| High values despite ventilation | Duct sensor measures recirculated air       | Check fresh air fraction at exhaust mixing point |
| No response to occupancy        | Signal incorrectly linked / wrong threshold | Check DDC parameterisation                       |
