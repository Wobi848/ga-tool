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

Ein Silizium-Chip verändert seinen elektrischen Widerstand unter Druckeinwirkung (piezoelektrischer Effekt):

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

```
ΔP_Filter = P_vor_Filter − P_nach_Filter

Neuer Filter: ΔP < 50 Pa
Alarm Verschmutzung: ΔP > 200 Pa (Filterklasse abhängig)
Sofortabschaltung: ΔP > 350 Pa (Filterdurchbruch-Schutz)
```

Sensor: Differenzdrucktransmitter 0–500 Pa, 4–20 mA

### Kanaldruck-Regelung (VAV)

```
P_Kanal_soll = 200 Pa (Sollwert)
Messung: 0–500 Pa Differenzdruck-Transmitter
Regelung: PID → Ventilator-Drehzahl (FU)
```

### Raumdruckhaltung (Reinraum, OP)

```
ΔP_Raum = P_Innen − P_Flur

Reinraum Klasse ISO 7: +10 bis +15 Pa
OP-Saal: +5 bis +10 Pa
Isolierraum (Infektionsschutz): −10 bis −15 Pa
```

Sensor: Hochgenauer Differenzdrucktransmitter 0–50 Pa (±0,5% FS)

### Systemdruck Heizung/Kühlung

```
P_System_soll = Vordruck + 0,2 bar (Reserve)
Alarm Druckabfall: P < P_min (Leckage)
Alarm Überdrück: P > P_max (Sicherheitsventil-Prüfung)
```

Sensor: Relativdrucktransmitter 0–4 bar, 4–20 mA

### Pumpenüberwachung (Förderhöhe)

```
ΔP_Pumpe = P_Druck − P_Saugseite

Kein Durchfluss bei laufender Pumpe:
  → ΔP sehr hoch → Alarm (geschlossenes Absperrventil)

Pumpe läuft ohne Förderung (Trockenlauf):
  → ΔP sehr niedrig → Alarm
```

---

## Auswahl und Einbau

| Parameter              | Empfehlung                                                             |
| ---------------------- | ---------------------------------------------------------------------- |
| Messbereich            | ca. 2× erwarteter Maximalwert                                          |
| Genauigkeit            | ≤ 2% FS für Regelung, ≤ 0,5% für Reinraum                              |
| Medienverträglichkeit  | Luft: keine Anforderungen; Wasser: Edelstahl; Glykol: Edelstahl        |
| Einbaulage             | Vertikal bevorzugt (kein Kondensat in Druckleitung)                    |
| Druckanschluss Lüftung | Entnahmebohrung ⌀ 6 mm, Kunststoffschlauch, kein Gefälle zur Messzelle |
| Kabelführung           | 4-20 mA: bis 500 m ohne Abschirmung möglich                            |

---

## Häufige Fehler

| Problem                   | Ursache                     | Lösung                                              |
| ------------------------- | --------------------------- | --------------------------------------------------- |
| Nullpunkt-Drift           | Temperatur, Alterung        | Regelmässige Kalibrierung (1×/Jahr)                 |
| Falsche Messung           | Kondensat in Messschlauch   | Messschlauch mit Gefälle verlegen                   |
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

```
ΔP_filter = P_before_filter − P_after_filter

New filter: ΔP < 50 Pa
Contamination alarm: ΔP > 200 Pa (filter class dependent)
Emergency shutdown: ΔP > 350 Pa (filter breakthrough protection)
```

Sensor: Differential pressure transmitter 0–500 Pa, 4–20 mA

### Duct Pressure Control (VAV)

```
P_duct_setpoint = 200 Pa
Measurement: 0–500 Pa differential pressure transmitter
Control: PID → fan speed (VSD)
```

### Room Pressure Control (Clean Room, Operating Theatre)

```
ΔP_room = P_inside − P_corridor

Clean room class ISO 7: +10 to +15 Pa
Operating theatre: +5 to +10 Pa
Isolation room (infection control): −10 to −15 Pa
```

Sensor: High-accuracy differential pressure transmitter 0–50 Pa (±0.5% FS)

### System Pressure — Heating/Cooling

```
P_system_setpoint = static pressure + 0.2 bar (reserve)
Pressure drop alarm: P < P_min (leakage)
Overpressure alarm: P > P_max (safety valve check)
```

Sensor: Gauge pressure transmitter 0–4 bar, 4–20 mA

### Pump Monitoring (Differential Head)

```
ΔP_pump = P_discharge − P_suction

No flow with pump running:
  → ΔP very high → alarm (closed isolation valve)

Pump running dry:
  → ΔP very low → alarm
```

---

## Selection and Installation

| Parameter                         | Recommendation                                                        |
| --------------------------------- | --------------------------------------------------------------------- |
| Measuring range                   | approx. 2× expected maximum                                           |
| Accuracy                          | ≤ 2% FS for control, ≤ 0.5% for clean rooms                           |
| Media compatibility               | Air: no requirements; water: stainless steel; glycol: stainless steel |
| Mounting position                 | Vertical preferred (no condensate in pressure tube)                   |
| Pressure connection (ventilation) | Tapping hole ⌀ 6 mm, plastic tube, no slope towards sensor            |
| Cable routing                     | 4–20 mA: up to 500 m without shielding possible                       |

---

## Common Faults

| Problem             | Cause                        | Remedy                                       |
| ------------------- | ---------------------------- | -------------------------------------------- |
| Zero-point drift    | Temperature, ageing          | Regular calibration (1×/year)                |
| Incorrect reading   | Condensate in measuring tube | Route measuring tube with slope              |
| Sensor out of range | Pressure surge on start      | Protect sensor with snubber or damping block |
| Signal noise        | Turbulence near fan          | Measure at least 5× duct diameter from fan   |
