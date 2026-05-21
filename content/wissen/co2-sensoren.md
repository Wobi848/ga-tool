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
norm: [EN 16798-1, EN 13779, VDI 6022, ASHRAE 62.1, DIN EN ISO 16000-26]
updated: 2026-05-15
lang: de
---

# CO₂-Sensoren — NDIR-Messprinzip und GA-Integration

CO₂-Konzentration ist der wichtigste Indikator für die **Raumluftqualität** in belegten Räumen. Sie korreliert direkt mit der Personenanzahl und ist die Grundlage für die **bedarfsgeführte Lüftung** — eine der wirksamsten Energiesparmassnahmen in der GA.

---

## NDIR — Nicht-dispersive Infrarot-Absorption

Das Messprinzip aller gängigen CO₂-Raumsensoren:

```
IR-Quelle → [Messküvette mit Luft] → Schmalbandfilter → IR-Detektor
                    │
           CO₂ absorbiert IR bei 4,26 µm
           Absorption ∝ CO₂-Konzentration
```

1. IR-Quelle emittiert breitbandiges Infrarotlicht
2. Gas-Probe in Messküvette: CO₂ absorbiert einen Teil der IR-Strahlung bei 4,26 µm
3. Optischer Schmalbandfilter (4,26 µm) lässt nur relevante Wellenlänge durch
4. Detektor misst verbleibende IR-Intensität
5. Signal wird in ppm CO₂ umgerechnet (Beer-Lambert-Gesetz)

**Referenzkanal:** Zweiter Detektor/Kanal bei einer Wellenlänge, die CO₂ nicht absorbiert → Kompensation von IR-Quellen-Drift und Staubverschmutzung.

---

## Grenzwerte und Richtwerte

| CO₂-Konzentration | Bewertung                                               |
| ----------------- | ------------------------------------------------------- |
| 400–450 ppm       | Aussenluft (aktuell ~420 ppm global)                    |
| 450–800 ppm       | Sehr gute Raumluft                                      |
| 800–1000 ppm      | Gute Raumluft (Komfortkategorie II nach EN 16798)       |
| 1000–1400 ppm     | Mässige Raumluft (Kategorie III)                        |
| **> 1000 ppm**    | **Pettenkofer-Grenzwert** — Lüftungserhöhung empfohlen  |
| 1400–2000 ppm     | Schlechte Raumluft, Konzentrationsprobleme              |
| > 5000 ppm        | MAK-Wert (Arbeitsplatz) — technische Massnahmen Pflicht |

**GA-Sollwert:** 800–1000 ppm → aktiviert höhere Lüftungsstufe (Kategorie II nach EN 16798-1).

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

```
CO₂-Sensor (Raum) → DDC → VAV-Klappenantrieb → Luftmenge
     │                │
 800 ppm           Klappe 20% (Grundlüftung)
1000 ppm           Klappe 50%
1200 ppm           Klappe 80%
1500 ppm           Klappe 100% + Alarm
```

**Energiesparpotenzial DCV gegenüber Konstantlüftung:** 30–60% Ventilator-Energieeinsparung in teilbelegten Räumen (Büros, Konferenzräume).

---

## Integration in die DDC/GLT

**Typische DDC-Funktionen:**

- Grenzwert-Alarme (Warnung 1000 ppm, Alarm 1500 ppm)
- Regelkreis CO₂ → Zuluftvolumenstrom
- Trending (Historisierung für Betriebsoptimierung und Nachweise VDI 6022)
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

```
IR source → [measurement cell with air] → narrowband filter → IR detector
                    │
           CO₂ absorbs IR at 4.26 µm
           Absorption ∝ CO₂ concentration
```

1. IR source emits broadband infrared light
2. Gas sample in measurement cell: CO₂ absorbs part of the IR at 4.26 µm
3. Optical narrowband filter (4.26 µm) passes only the relevant wavelength
4. Detector measures remaining IR intensity
5. Signal is converted to ppm CO₂ (Beer-Lambert law)

**Reference channel:** Second detector at a wavelength not absorbed by CO₂ → compensates for IR source drift and dust contamination.

---

## Threshold and Reference Values

| CO₂ concentration | Assessment                                                    |
| ----------------- | ------------------------------------------------------------- |
| 400–450 ppm       | Outdoor air (~420 ppm globally)                               |
| 450–800 ppm       | Excellent indoor air quality                                  |
| 800–1000 ppm      | Good indoor air (category II per EN 16798)                    |
| 1000–1400 ppm     | Moderate indoor air (category III)                            |
| **> 1000 ppm**    | **Pettenkofer threshold** — increased ventilation recommended |
| 1400–2000 ppm     | Poor air quality, concentration problems                      |
| > 5000 ppm        | OEL (workplace limit) — technical measures mandatory          |

**BA setpoint:** 800–1000 ppm → activates higher ventilation stage (category II per EN 16798-1).

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

```
CO₂ sensor (room) → DDC → VAV damper actuator → air volume
     │                │
 800 ppm           Damper 20% (base ventilation)
1000 ppm           Damper 50%
1200 ppm           Damper 80%
1500 ppm           Damper 100% + alarm
```

**Energy savings potential DCV vs. constant volume:** 30–60% fan energy reduction in partially occupied spaces (offices, conference rooms).

---

## Integration into DDC / BMS

**Typical DDC functions:**

- Threshold alarms (warning 1000 ppm, alarm 1500 ppm)
- Control loop CO₂ → supply air volume flow
- Trending (historisation for operational optimisation and VDI 6022 records)
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
