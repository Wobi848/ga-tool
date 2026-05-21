---
title: Feuchtesensoren — Messung der Luftfeuchte in der GA
title_en: Humidity Sensors — Measuring Air Humidity in BA
slug: feuchtesensoren
category: sensoren
subcategory: feuchte
tags:
  [
    feuchtesensor,
    relative-feuchte,
    absolute-feuchte,
    taupunktmessung,
    kapazitiv,
    psychrometer,
    chilled-mirror,
    feuchtewächter,
    kondensationsschutz,
    befeuchterregelung,
    entfeuchtung,
    sorptionsrotor,
    komfort,
    rh-sensor,
    feuchtigkeitsübertragung
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [befeuchter, taupunkt, sensoren, rlt-anlage, thermische-behaglichkeit, raumluftqualitaet]
rechner: [taupunkt]
norm: [EN ISO 16000-11, ASHRAE 55, VDI 6022, ISO 7726]
updated: 2026-05-15
lang: de
---

# Feuchtesensoren — Messung der Luftfeuchte in der GA

Luftfeuchte beeinflusst thermische Behaglichkeit, Schimmelrisiko, Materialschutz und Prozessbedingungen. In der GA werden Feuchtesensoren zur Befeuchterregelung, Entfeuchtung, Kondensationsschutz und Komfortüberwachung eingesetzt.

---

## Messarten: Relative vs. Absolute Feuchte

| Messart                   | Definition                                                                                | Einheit | GA-Einsatz                              |
| ------------------------- | ----------------------------------------------------------------------------------------- | ------- | --------------------------------------- |
| **Relative Feuchte** (rF) | Verhältnis des Wasserdampf-Partialdrucks zum Sättigungsdampfdruck bei gleicher Temperatur | % rH    | Standard: Behaglichkeit, Schimmelschutz |
| **Absolute Feuchte**      | Wasserdampfmasse pro Luftvolumen                                                          | g/m³    | Berechnet aus rF + T                    |
| **Wassergehalt**          | Wasserdampfmasse pro Masse trockener Luft                                                 | g/kg    | Psychrometrie, Befeuchterauslegung      |
| **Taupunkt**              | Temperatur, bei der Kondensation einsetzt                                                 | °C      | Kondensationsschutz, Kühlung            |

---

## Messprinzipien

### Kapazitiver Sensor (dominant in der GA)

Ein Polymer-Hygristor verändert seine elektrische Kapazität proportional zur Wasseraufnahme:

```
Polymer-Schicht absorbiert Wasserdampf
→ Dielektrizitätskonstante ε ändert sich
→ Kapazitätsänderung ∝ relative Feuchte
```

**Eigenschaften:**

- Messbereich: 0–100% rH
- Genauigkeit: ±2–3% rH (Standard), ±1% rH (Präzision)
- Reaktionszeit: 10–30 s
- Temperaturabhängig → integrierter Temperatursensor zur Kompensation erforderlich
- Drift: ca. 1% rH/Jahr — jährliche Kalibrierung empfohlen

**Bekannte Sensorfamilien:** Sensirion SHT3x/SHT4x, Honeywell HIH-6000, Vaisala INTERCAP/HUMICAP

### Chilled Mirror (Taupunktspiegel)

Hochpräzises Labormessgerät für Taupunktmessung:

1. Optisch polierter Spiegel wird gekühlt
2. Wenn Spiegeltemperatur = Taupunkt: Kondensation erscheint (Reflektion ändert sich)
3. Regelung hält Spiegel exakt am Taupunkt → direkte Taupunktmessung

- Genauigkeit: ±0,1°C Taupunkt
- Primärmethode, zur Kalibrierung anderer Sensoren
- Teuer, wartungsintensiv — nur in Labors oder als Referenz

### Psychrometer (Nass/Trocken-Thermometer)

Zwei Thermometer: eines trocken, eines mit feuchtem Docht umwickelt.
Verdunstungskälte senkt Temperatur des feuchten Thermometers:

```
rF = f(T_trocken, T_feucht)   [Magnus-Formel + Psychrometerkonstante]
```

- Einfach, robust, keine Drift
- Erfordert sauberes destilliertes Wasser für Docht
- Heute kaum in GA-Systemen (historisch, Wetterstation)

---

## Sensorbauformen für die GA

| Bauform                     | Einbau                 | Einsatz                                  |
| --------------------------- | ---------------------- | ---------------------------------------- |
| **Wandaufbau** (Raumgerät)  | Innenraum, 1,5 m Höhe  | Komfortüberwachung, Regelung             |
| **Kanalfühler** (Lüftung)   | In Zuluft-/Abluftkanal | Befeuchter, Wärmerückgewinnung           |
| **Aussenluftfühler**        | Geschützt aussen       | Witterungskompensation, Enthalpie-Tausch |
| **Wanddurchführungsfühler** | Kelleraussenwand       | Kondensations-/Schimmelschutz            |
| **Kombifühler** T + rF      | Überall                | Standard in GA-Raumgeräten               |

---

## Komfortwerte und Grenzwerte

| Bereich        | Relative Feuchte       | Bemerkung                                 |
| -------------- | ---------------------- | ----------------------------------------- |
| **Komfort**    | 40–60% rH              | ASHRAE 55, EN ISO 7726                    |
| Trockene Luft  | < 30% rH               | Reizung Schleimhäute, statische Aufladung |
| Zu feucht      | > 65% rH               | Schimmelrisiko an kalten Oberflächen      |
| Schimmelgrenze | > 80% rH an Oberfläche | Pilzwachstum ab 72h                       |
| Kondensation   | 100% rH                | Taupunkt erreicht                         |

**Kanalluft:** 10–95% rH möglich je nach Aussenluftbedingungen — keine Komfortwerte.

---

## Befeuchterregelung (Zuluft)

```
Fühler im Zuluftkanal:
  x_Ist (g/kg) = f(T_Zuluft, rF_Zuluft)

Soll: x_Soll = 8 g/kg (entspricht ~50% rH bei 20°C Raumtemp)

Wenn x_Ist < x_Soll → Befeuchter EIN (Dampf oder Verdunstung)
Wenn x_Ist > x_Soll + Hysterese → Befeuchter AUS
```

**Hysterese zwingend erforderlich** (z.B. ±0,5 g/kg) — sonst Pendelbetrieb.

---

## Kondensationsschutz Kühlung

Bei Kühldecken und Betonkernaktivierung: Gefahr der Kondensation wenn Oberflächentemperatur < Taupunkt der Raumluft.

```
T_Oberfläche < T_Taupunkt_Raum?
    → Kühlung absperren oder Vorlauftemperatur erhöhen
```

**DDC-Logik:**

```
T_Taupunkt = berechnet aus T_Raum + rF_Raum
Wenn T_Vorlauf_Kühlung < T_Taupunkt + 1 K:
    → Alarmierung + Vorlauftemp auf T_Taupunkt + 2 K anheben
```

---

## Kalibrierung und Wartung

| Intervall    | Massnahme                                                  |
| ------------ | ---------------------------------------------------------- |
| Jährlich     | Sichtkontrolle, Vergleichsmessung mit Referenzgerät        |
| Alle 2 Jahre | Kalibrierung gegen zertifiziertes Referenzgerät (VDI 6022) |
| Bei Verdacht | Vergleich zweier Sensoren im selben Raum                   |

**Kalibrierung im Feld:** Gesättigte Salzlösungen erzeugen definierte Feuchte:

- LiCl: 11% rH | MgCl₂: 33% rH | NaCl: 75% rH | K₂SO₄: 97% rH

<!-- EN -->

Air humidity influences thermal comfort, mould risk, material protection, and process conditions. In BA, humidity sensors are used for humidifier control, dehumidification, condensation protection, and comfort monitoring.

---

## Measurement Types: Relative vs. Absolute Humidity

| Type                       | Definition                                                                            | Unit | BA application                      |
| -------------------------- | ------------------------------------------------------------------------------------- | ---- | ----------------------------------- |
| **Relative humidity** (RH) | Ratio of water vapour partial pressure to saturation pressure at the same temperature | % RH | Standard: comfort, mould protection |
| **Absolute humidity**      | Water vapour mass per volume of air                                                   | g/m³ | Calculated from RH + T              |
| **Moisture content**       | Water vapour mass per mass of dry air                                                 | g/kg | Psychrometrics, humidifier sizing   |
| **Dew point**              | Temperature at which condensation begins                                              | °C   | Condensation protection, cooling    |

---

## Measurement Principles

### Capacitive Sensor (dominant in BA)

A polymer hygristor changes its electrical capacitance in proportion to water uptake:

```
Polymer layer absorbs water vapour
→ Dielectric constant ε changes
→ Capacitance change ∝ relative humidity
```

**Properties:**

- Measuring range: 0–100% RH
- Accuracy: ±2–3% RH (standard), ±1% RH (precision)
- Response time: 10–30 s
- Temperature-dependent → integrated temperature sensor required for compensation
- Drift: approx. 1% RH/year — annual calibration recommended

**Common sensor families:** Sensirion SHT3x/SHT4x, Honeywell HIH-6000, Vaisala INTERCAP/HUMICAP

### Chilled Mirror (Dew Point Mirror)

High-precision laboratory instrument for dew point measurement:

1. Optically polished mirror is cooled
2. When mirror temperature = dew point: condensation appears (reflection changes)
3. Control keeps mirror exactly at dew point → direct dew point measurement

- Accuracy: ±0.1 °C dew point
- Primary method, used for calibrating other sensors
- Expensive, maintenance-intensive — laboratory use or reference only

### Psychrometer (Wet/Dry Bulb Thermometer)

Two thermometers: one dry, one wrapped in a wet wick.
Evaporative cooling lowers the temperature of the wet bulb:

```
RH = f(T_dry, T_wet)   [Magnus formula + psychrometer constant]
```

- Simple, robust, no drift
- Requires clean distilled water for the wick
- Rarely used in BA systems today (historical, weather stations)

---

## Sensor Form Factors for BA

| Form factor                    | Installation              | Application                             |
| ------------------------------ | ------------------------- | --------------------------------------- |
| **Wall-mounted** (room device) | Indoors, 1.5 m height     | Comfort monitoring, control             |
| **Duct probe** (ventilation)   | In supply/return air duct | Humidifier, heat recovery               |
| **Outdoor air sensor**         | Protected outdoors        | Weather compensation, enthalpy exchange |
| **Wall penetration probe**     | Basement exterior wall    | Condensation/mould protection           |
| **Combination T + RH**         | Anywhere                  | Standard in BA room devices             |

---

## Comfort and Limit Values

| Range           | Relative humidity   | Note                                          |
| --------------- | ------------------- | --------------------------------------------- |
| **Comfort**     | 40–60% RH           | ASHRAE 55, EN ISO 7726                        |
| Dry air         | < 30% RH            | Irritation of mucous membranes, static charge |
| Too humid       | > 65% RH            | Mould risk at cold surfaces                   |
| Mould threshold | > 80% RH at surface | Fungal growth after 72 h                      |
| Condensation    | 100% RH             | Dew point reached                             |

**Duct air:** 10–95% RH possible depending on outdoor conditions — no comfort values apply.

---

## Humidifier Control (Supply Air)

```
Sensor in supply air duct:
  x_actual (g/kg) = f(T_supply, RH_supply)

Setpoint: x_setpoint = 8 g/kg (≈ 50% RH at 20 °C room temp)

If x_actual < x_setpoint → humidifier ON (steam or evaporation)
If x_actual > x_setpoint + hysteresis → humidifier OFF
```

**Hysteresis is essential** (e.g. ±0.5 g/kg) — otherwise continuous cycling.

---

## Condensation Protection for Cooling

With chilled ceilings and thermal mass activation: risk of condensation when surface temperature < dew point of room air.

```
T_surface < T_dew_point_room?
    → Close cooling or raise flow temperature
```

**DDC logic:**

```
T_dew_point = calculated from T_room + RH_room
If T_flow_cooling < T_dew_point + 1 K:
    → Alarm + raise flow temperature to T_dew_point + 2 K
```

---

## Calibration and Maintenance

| Interval       | Action                                                        |
| -------------- | ------------------------------------------------------------- |
| Annual         | Visual inspection, comparison with reference instrument       |
| Every 2 years  | Calibration against certified reference instrument (VDI 6022) |
| When suspected | Compare two sensors in the same room                          |

**Field calibration:** Saturated salt solutions generate defined humidity levels:

- LiCl: 11% RH | MgCl₂: 33% RH | NaCl: 75% RH | K₂SO₄: 97% RH
