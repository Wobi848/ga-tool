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
related:
  [
    befeuchter,
    taupunkt,
    sensoren,
    rlt-anlage,
    thermische-behaglichkeit,
    raumluftqualitaet,
    luftfeuchtigkeit
  ]
rechner: [taupunkt]
norm: [EN ISO 7726, EN 16798-1]
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

Eine dünne Polymerschicht zwischen zwei Elektroden nimmt Wasserdampf auf. Dadurch ändert sich ihre Dielektrizitätszahl und mit ihr die Kapazität. Die Elektronik rechnet daraus die relative Feuchte.

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

<p class="formel">φ = f(θ<sub>trocken</sub>, θ<sub>feucht</sub>)</p>

Die Auswertung nutzt die Psychrometerformel mit der Psychrometerkonstante und dem Sättigungsdruck nach Magnus.

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

| Bereich        | Relative Feuchte        | Bemerkung                                       |
| -------------- | ----------------------- | ----------------------------------------------- |
| **Komfort**    | etwa 30–60 % rF         | EN 16798-1, Auslegungswerte                     |
| Trockene Luft  | < 30% rH                | Reizung Schleimhäute, statische Aufladung       |
| Zu feucht      | > 65% rH                | Schimmelrisiko an kalten Oberflächen            |
| Schimmelgrenze | > 80 % rF an Oberfläche | Pilzwachstum, wenn das über mehrere Tage anhält |
| Kondensation   | 100% rH                 | Taupunkt erreicht                               |

**Kanalluft:** 10–95% rH möglich je nach Aussenluftbedingungen — keine Komfortwerte.

---

## Befeuchterregelung (Zuluft)

- Der Kanalfühler misst Temperatur und rF, die DDC rechnet daraus den Wassergehalt x.
- Sollwert zum Beispiel x = 7.3 g/kg, das entspricht 50 % rF bei 20 °C. 8 g/kg wären bei 20 °C schon rund 55 %.
- Dampfbefeuchter werden heute meist **stetig** geregelt. Bei Zweipunkt-Betrieb braucht es eine Schaltdifferenz, zum Beispiel 0.5 g/kg.
- **Maximalbegrenzung:** Ein zweiter Fühler oder Hygrostat nach dem Befeuchter begrenzt die Kanalfeuchte, typisch auf 80 bis 90 % rF. Sonst kondensiert Wasser im Kanal.

---

## Kondensationsschutz Kühlung

Bei Kühldecken und Betonkernaktivierung: Gefahr der Kondensation wenn Oberflächentemperatur < Taupunkt der Raumluft.

Ist die Oberflächentemperatur tiefer als der Taupunkt der Raumluft, kondensiert Wasser. Dann muss die Kühlung abgesperrt oder die Vorlauftemperatur angehoben werden.

**DDC-Logik:**

1. Die DDC berechnet den Taupunkt aus Raumtemperatur und rF.
2. Liegt der Kühlvorlauf weniger als 1 K über dem Taupunkt, wird gemeldet und der Vorlauf auf Taupunkt + 2 K angehoben.
3. Zusätzlich sitzt am Vorlauf oft ein **Taupunktwächter**, der bei Betauung direkt das Ventil schliesst, unabhängig von der Berechnung.

---

## Kalibrierung und Wartung

| Intervall    | Massnahme                                                 |
| ------------ | --------------------------------------------------------- |
| Jährlich     | Sichtkontrolle, Vergleichsmessung mit Referenzgerät       |
| Alle 2 Jahre | Kalibrierung gegen rückführbar kalibriertes Referenzgerät |
| Bei Verdacht | Vergleich zweier Sensoren im selben Raum                  |

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

A thin polymer layer between two electrodes absorbs water vapour. This changes its permittivity and with it the capacitance. The electronics calculate the relative humidity from it.

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

<p class="formel">φ = f(θ<sub>dry</sub>, θ<sub>wet</sub>)</p>

The evaluation uses the psychrometer formula with the psychrometer constant and the saturation pressure per Magnus.

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

| Range           | Relative humidity    | Note                                          |
| --------------- | -------------------- | --------------------------------------------- |
| **Comfort**     | about 30–60 % RH     | EN 16798-1, design values                     |
| Dry air         | < 30% RH             | Irritation of mucous membranes, static charge |
| Too humid       | > 65% RH             | Mould risk at cold surfaces                   |
| Mould threshold | > 80 % RH at surface | fungal growth if sustained over several days  |
| Condensation    | 100% RH              | Dew point reached                             |

**Duct air:** 10–95% RH possible depending on outdoor conditions — no comfort values apply.

---

## Humidifier Control (Supply Air)

- The duct sensor measures temperature and RH, the DDC calculates the moisture content x.
- Setpoint for example x = 7.3 g/kg, which is 50 % RH at 20 °C. 8 g/kg would already be about 55 % at 20 °C.
- Steam humidifiers are usually **modulating** today. On/off operation needs a switching differential, for example 0.5 g/kg.
- **High limit:** a second sensor or hygrostat after the humidifier limits duct humidity, typically to 80 to 90 % RH. Otherwise water condenses in the duct.

---

## Condensation Protection for Cooling

With chilled ceilings and thermal mass activation: risk of condensation when surface temperature < dew point of room air.

If the surface temperature is below the dew point of the room air, water condenses. Then cooling must be shut off or the flow temperature raised.

**DDC logic:**

1. The DDC calculates the dew point from room temperature and RH.
2. If the chilled water flow is less than 1 K above the dew point, a message is raised and the flow is raised to dew point + 2 K.
3. In addition, a **condensation sensor** often sits on the flow pipe and closes the valve directly on condensation, independent of the calculation.

---

## Calibration and Maintenance

| Interval       | Action                                                          |
| -------------- | --------------------------------------------------------------- |
| Annual         | Visual inspection, comparison with reference instrument         |
| Every 2 years  | Calibration against a traceably calibrated reference instrument |
| When suspected | Compare two sensors in the same room                            |

**Field calibration:** Saturated salt solutions generate defined humidity levels:

- LiCl: 11% RH | MgCl₂: 33% RH | NaCl: 75% RH | K₂SO₄: 97% RH
