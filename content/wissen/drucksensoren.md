---
title: Drucksensoren in der GA — Messprinzipien und Anwendungen
title_en: Pressure Sensors in BA — Measurement Principles and Applications
slug: drucksensoren
category: sensoren
subcategory: druck
tags:
  [
    drucksensor,
    differenzdrucksensor,
    absolutdruck,
    relativdruck,
    piezoresistiv,
    kapazitiv,
    filterüberwachung,
    raumdruckhaltung,
    pumpenüberwachung,
    lüftung,
    kanaldruckmessung,
    pa-sensor,
    transmitter,
    4-20ma,
    0-10v
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [sensoren, signaltypen, zonendruckhaltung, druckverlust, pumpen, rlt-anlage]
rechner: []
norm: [EN 837, IEC 61298, VDMA 24007]
updated: 2026-05-15
lang: de
---

# Drucksensoren in der GA — Messprinzipien und Anwendungen

Druckmessung ist in der GA allgegenwärtig: Filterüberwachung, Ventilatorregelung, Raumdruckhaltung, Pumpenüberwachung, Leckageerkennung. Dieser Artikel erklärt die Messprinzipien, Messarten und typische GA-Anwendungen.

---

## Messarten

### Absolutdruck

Messung gegen das absolute Vakuum (0 Pa):

- Referenz: Vakuum
- Einheit: Pa (abs), bar (abs)
- GA-Anwendung: Meteorologische Stationen, Höhenmessung, selten in HVAC

### Relativdruck (Überdruck / Manometerdruck)

Messung gegen den **aktuellen Atmosphärendruck**:

- Referenz: Atmosphäre (variiert mit Höhe und Wetter)
- Einheit: Pa (rel), bar (rel), mbar
- GA-Anwendung: Heizungssystemdruck (Ausdehnungsgefäss-Überwachung), Wasserversorgungsdruck

### Differenzdruck

Messung der **Druckdifferenz zwischen zwei Messpunkten**:

- Referenz: keiner (zwei variable Messpunkte)
- Einheit: Pa, mbar
- GA-Anwendung: **Häufigste Messart in HVAC** — Filter, Ventilator, Kanaldruck, Durchfluss

---

## Messprinzipien

### Piezoresistiv (Dehnungsmessstreifen)

Ein Silizium-Chip verändert seinen elektrischen Widerstand unter Druckeinwirkung (piezoresistiver Effekt):

- Sehr hohe Genauigkeit (0,1–0,5% FS)
- Kompakt, kostengünstig
- Typisch: Differenzdrucksensoren 0–500 Pa für Lüftung

### Kapazitiv

Membran bewegt sich unter Druck, verändert den Plattenabstand eines Kondensators:

- Sehr empfindlich für kleine Differenzdrücke (0–10 Pa möglich)
- Guter Temperaturgang
- Typisch: Feinst-Differenzdrucksensoren Reinraum

### Piezoelektrisch

Quarz-Kristall erzeugt elektrische Ladung unter Druck — nur für **dynamische** Druckmessungen (Vibration, Stoss):

- Nicht für statischen Druck geeignet (kein DC-Signal)
- GA: kaum verwendet (Industriemessung, Motoren)

---

## Ausgangssignale

| Signal     | Bereich | Vorteil                                 | Einsatz         |
| ---------- | ------- | --------------------------------------- | --------------- |
| 4–20 mA    | 4–20 mA | Leitungsunabhängig, Kabelbrucherkennung | Standard-DDC    |
| 0–10 V     | 0–10 V  | Einfach, kostengünstig                  | Kurze Leitungen |
| 0–5 V      | 0–5 V   | Kompakte Sensoren                       | Raumgeräte      |
| Modbus RTU | RS-485  | Digitale Genauigkeit, Diagnose          | GLT-Integration |
| IO-Link    | IO-Link | Parametrierung, Diagnose                | Industrie       |

---

## Typische GA-Anwendungen

### Filterüberwachung Lüftungsanlage

<p class="formel">Δp<sub>Filter</sub> = p<sub>vor Filter</sub> − p<sub>nach Filter</sub></p>

| Zustand              | Druckdifferenz, Beispiel                             |
| -------------------- | ---------------------------------------------------- |
| neuer Filter         | Anfangsdruckdifferenz nach Datenblatt, oft 50–100 Pa |
| verschmutzt, Meldung | Enddruckdifferenz nach Hersteller, oft 200–300 Pa    |
| Filterbruch          | Druckdifferenz fällt plötzlich deutlich ab           |

Ein verschmutzter Filter ist ein Wartungsfall, kein Grund, die Anlage abzuschalten.

Sensor: Differenzdrucktransmitter 0–500 Pa, 4–20 mA

### Kanaldruck-Regelung (VAV)

| Element  | Beispiel                                           |
| -------- | -------------------------------------------------- |
| Sollwert | Kanaldruck 200 Pa, besser über Druck-Reset geführt |
| Messung  | Differenzdrucktransmitter 0–500 Pa                 |
| Regler   | PI, Stellgrösse Drehzahl des Ventilators über FU   |

### Raumdruckhaltung (Reinraum, OP)

<p class="formel">Δp<sub>Raum</sub> = p<sub>Raum</sub> − p<sub>Nachbarraum</sub></p>

| Raum                               | typische Druckdifferenz                             |
| ---------------------------------- | --------------------------------------------------- |
| Reinraum gegenüber tieferer Klasse | +10 bis +15 Pa                                      |
| OP gegenüber Nebenräumen           | Überdruck, Werte nach SWKI VA105-01 bzw. DIN 1946-4 |
| Isolierzimmer                      | Unterdruck, zum Beispiel −10 Pa                     |

Sensor: Hochgenauer Differenzdrucktransmitter 0–50 Pa (±0,5% FS)

### Systemdruck Heizung/Kühlung

| Wert       | Bedeutung                                                     |
| ---------- | ------------------------------------------------------------- |
| Fülldruck  | Vordruck des Ausdehnungsgefässes + 0.3 bar, im kalten Zustand |
| Alarm tief | unter Fülldruck: Leckage oder Gefäss defekt                   |
| Alarm hoch | knapp unter dem Ansprechdruck des Sicherheitsventils          |

Sensor: Relativdrucktransmitter 0–4 bar, 4–20 mA

### Pumpenüberwachung (Förderhöhe)

<p class="formel">Δp<sub>Pumpe</sub> = p<sub>Druckseite</sub> − p<sub>Saugseite</sub></p>

- **Δp sehr hoch** bei Pumpe mit fester Drehzahl: kein Durchfluss, etwa ein geschlossenes Absperrventil
- **Δp sehr tief** bei laufender Pumpe: keine Förderung, Luft im System oder Trockenlauf

Bei drehzahlgeregelten Pumpen mit Δp-Regelung ist der Δp konstant, hier sagt die Leistungsaufnahme oder ein Durchflussmesser mehr.

---

## Auswahl und Einbau

| Parameter              | Empfehlung                                                                   |
| ---------------------- | ---------------------------------------------------------------------------- |
| Messbereich            | ca. 2× erwarteter Maximalwert                                                |
| Genauigkeit            | ≤ 2% FS für Regelung, ≤ 0,5% für Reinraum                                    |
| Medienverträglichkeit  | Luft: keine Anforderungen; Wasser: Edelstahl; Glykol: Edelstahl              |
| Einbaulage             | Vertikal bevorzugt (kein Kondensat in Druckleitung)                          |
| Druckanschluss Lüftung | Entnahmebohrung ⌀ 6 mm, Kunststoffschlauch mit Gefälle weg von der Messzelle |
| Kabelführung           | 4–20 mA ist störfest; in der Nähe von Umrichtern trotzdem geschirmt verlegen |

---

## Häufige Fehler

| Problem                   | Ursache                     | Lösung                                              |
| ------------------------- | --------------------------- | --------------------------------------------------- |
| Nullpunkt-Drift           | Temperatur, Alterung        | Regelmässige Kalibrierung (1×/Jahr)                 |
| Falsche Messung           | Kondensat in Messschlauch   | Messschlauch mit Gefälle weg vom Sensor verlegen    |
| Sensor ausserhalb Bereich | Druckstoss beim Start       | Sensor mit Dämpfungsblock oder Snubber schützen     |
| Signalrauschen            | Turbulenz nah am Ventilator | Messort 5× Kanaldurchmesser vom Ventilator entfernt |

<!-- EN -->

Pressure measurement is ubiquitous in BA: filter monitoring, fan control, room pressure control, pump monitoring, leak detection. This article explains measurement principles, measurement types, and typical BA applications.

---

## Measurement Types

### Absolute Pressure

Measurement referenced to absolute vacuum (0 Pa):

- Reference: vacuum
- Unit: Pa (abs), bar (abs)
- BA application: meteorological stations, altitude measurement, rarely in HVAC

### Gauge Pressure (Relative / Manometric Pressure)

Measurement referenced to **current atmospheric pressure**:

- Reference: atmosphere (varies with altitude and weather)
- Unit: Pa (rel), bar (rel), mbar
- BA application: heating system pressure (expansion vessel monitoring), water supply pressure

### Differential Pressure

Measurement of the **pressure difference between two measurement points**:

- Reference: none (two variable measurement points)
- Unit: Pa, mbar
- BA application: **most common measurement type in HVAC** — filters, fans, duct pressure, flow

---

## Measurement Principles

### Piezoresistive (Strain Gauge)

A silicon chip changes its electrical resistance under pressure (piezoresistive effect):

- Very high accuracy (0.1–0.5% FS)
- Compact, low cost
- Typical: differential pressure sensors 0–500 Pa for ventilation

### Capacitive

Diaphragm deflects under pressure, changing the plate spacing of a capacitor:

- Very sensitive for small differential pressures (0–10 Pa possible)
- Good temperature characteristics
- Typical: ultra-fine differential pressure sensors for clean rooms

### Piezoelectric

Quartz crystal generates electrical charge under pressure — only for **dynamic** pressure measurements (vibration, shock):

- Not suitable for static pressure (no DC signal)
- BA: rarely used (industrial measurement, engines)

---

## Output Signals

| Signal     | Range   | Advantage                               | Application      |
| ---------- | ------- | --------------------------------------- | ---------------- |
| 4–20 mA    | 4–20 mA | Wire-independent, cable break detection | Standard DDC     |
| 0–10 V     | 0–10 V  | Simple, low cost                        | Short cable runs |
| 0–5 V      | 0–5 V   | Compact sensors                         | Room devices     |
| Modbus RTU | RS-485  | Digital accuracy, diagnostics           | BMS integration  |
| IO-Link    | IO-Link | Parameterisation, diagnostics           | Industry         |

---

## Typical BA Applications

### Filter Monitoring — Ventilation System

<p class="formel">Δp<sub>filter</sub> = p<sub>before filter</sub> − p<sub>after filter</sub></p>

| State          | Pressure drop, example                                 |
| -------------- | ------------------------------------------------------ |
| new filter     | initial pressure drop per data sheet, often 50–100 Pa  |
| dirty, message | final pressure drop per manufacturer, often 200–300 Pa |
| filter rupture | pressure drop falls suddenly and clearly               |

A dirty filter is a maintenance case, not a reason to shut down the plant.

Sensor: Differential pressure transmitter 0–500 Pa, 4–20 mA

### Duct Pressure Control (VAV)

| Element     | Example                                                  |
| ----------- | -------------------------------------------------------- |
| Setpoint    | duct pressure 200 Pa, better scheduled by pressure reset |
| Measurement | differential pressure transmitter 0–500 Pa               |
| Controller  | PI, output fan speed via drive                           |

### Room Pressure Control (Clean Room, Operating Theatre)

<p class="formel">Δp<sub>room</sub> = p<sub>room</sub> − p<sub>adjacent room</sub></p>

| Room                                 | typical pressure difference                          |
| ------------------------------------ | ---------------------------------------------------- |
| clean room vs. lower class           | +10 to +15 Pa                                        |
| operating theatre vs. adjacent rooms | overpressure, values per SWKI VA105-01 or DIN 1946-4 |
| isolation room                       | negative pressure, for example −10 Pa                |

Sensor: High-accuracy differential pressure transmitter 0–50 Pa (±0.5% FS)

### System Pressure — Heating/Cooling

| Value         | Meaning                                              |
| ------------- | ---------------------------------------------------- |
| Fill pressure | expansion vessel pre-charge + 0.3 bar, in cold state |
| Alarm low     | below fill pressure: leak or vessel faulty           |
| Alarm high    | just below the set pressure of the safety valve      |

Sensor: Gauge pressure transmitter 0–4 bar, 4–20 mA

### Pump Monitoring (Differential Head)

<p class="formel">Δp<sub>pump</sub> = p<sub>discharge</sub> − p<sub>suction</sub></p>

- **Δp very high** with a fixed-speed pump: no flow, for example a closed isolating valve
- **Δp very low** with the pump running: no delivery, air in the system or dry running

With variable-speed pumps under Δp control the Δp is constant; here power consumption or a flow meter says more.

---

## Selection and Installation

| Parameter                         | Recommendation                                                        |
| --------------------------------- | --------------------------------------------------------------------- |
| Measuring range                   | approx. 2× expected maximum                                           |
| Accuracy                          | ≤ 2% FS for control, ≤ 0.5% for clean rooms                           |
| Media compatibility               | Air: no requirements; water: stainless steel; glycol: stainless steel |
| Mounting position                 | Vertical preferred (no condensate in pressure tube)                   |
| Pressure connection (ventilation) | Tapping hole ⌀ 6 mm, plastic tube sloping away from the sensor        |
| Cable routing                     | 4–20 mA is robust; near drives still use shielded cable               |

---

## Common Faults

| Problem             | Cause                        | Remedy                                        |
| ------------------- | ---------------------------- | --------------------------------------------- |
| Zero-point drift    | Temperature, ageing          | Regular calibration (1×/year)                 |
| Incorrect reading   | Condensate in measuring tube | Route measuring tube sloping away from sensor |
| Sensor out of range | Pressure surge on start      | Protect sensor with snubber or damping block  |
| Signal noise        | Turbulence near fan          | Measure at least 5× duct diameter from fan    |
