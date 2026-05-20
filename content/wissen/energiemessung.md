---
title: Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ
title_en: Electrical Energy Measurement — Active Power, Reactive Power, cos φ
slug: energiemessung
category: energie
subcategory: grundlagen
tags: [wirkleistung, blindleistung, scheinleistung, cos-phi, leistungsfaktor, kwh, kvar, kva, energiezähler, mbus, modbus, oberwellen, thd, powerfactor, q, p, s]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, waermemengenzaehler, mbus]
norm: [IEC 62053, EN 50160, IEC 61000-4-30]
updated: 2026-05-14
lang: de
---

# Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ

Elektrische Energiemessung in der GA liefert die Daten für EMS, ISO 50001 und Abrechnung. Das Verständnis von Wirk-, Blind- und Scheinleistung ist Grundlage für korrekte Messung und Bewertung.

## Die drei Leistungsarten

### Wirkleistung P [W, kW]

**Nutzbare Leistung** — die tatsächlich verbrauchte Energie:

```
P = U × I × cos(φ)   [W]
```

- Heizt, dreht Motoren, leuchtet
- Vom Energieversorger abgerechnet
- Einheit: Watt (W), Kilowatt (kW)

### Blindleistung Q [var, kvar]

**Pendelt zwischen Generator und Last** — nötig für Magnetfelder (Motoren, Transformatoren), macht keine Nutzarbeit:

```
Q = U × I × sin(φ)   [var]
```

- Belastet das Netz (Leitungen, Transformatoren)
- Wird vom Energieversorger oft separat verrechnet (Q-Tarif)
- Kapazitive Last (Kondensatoren): kompensiert Blindleistung

### Scheinleistung S [VA, kVA]

**Geometrische Summe** von Wirk- und Blindleistung:

```
S = U × I = √(P² + Q²)   [VA]

S = P + jQ  (komplexe Darstellung)
```

- Bestimmt die Auslegung von Transformatoren, Kabeln, Sicherungen
- Einheit: Volt-Ampere (VA), Kilovolt-Ampere (kVA)

---

## Leistungsdreieck

```
         S (kVA)
        /│
       / │
      /  │ Q (kvar, Blindleistung)
     /φ  │
    └────┘
    P (kW, Wirkleistung)

cos φ = P / S   (Leistungsfaktor, power factor)
tan φ = Q / P
```

---

## Leistungsfaktor cos φ

Der **Leistungsfaktor** (auch λ oder PF = Power Factor) gibt an wie effizient Strom genutzt wird:

| cos φ | Bedeutung                                    |
|-------|----------------------------------------------|
| 1.0   | Ideal — nur Wirkleistung                     |
| 0.9   | Gut — 10 % Blindleistung                     |
| 0.8   | Akzeptabel — Grenzwert vieler Versorger      |
| 0.7   | Schlecht — Netz stark belastet               |
| 0.5   | Sehr schlecht — typisch ungefilterte FUs     |

**Praxiswerte:**
- Glühlampe: cos φ = 1.0
- Asynchronmotor (Vollast): cos φ = 0.85–0.95
- Asynchronmotor (Leerlauf): cos φ = 0.2–0.4 (schlecht!)
- FU + Motor: cos φ am FU-Eingang 0.7–0.9 (ohne Oberwellen-Filter)

---

## Oberwellen (THD)

Moderne Geräte mit Schaltnetzteilen und Frequenzumrichtern erzeugen **Oberwellen** (Harmonics):

```
Netzspannung: 50 Hz (Grundwelle)
Oberwellen: 150 Hz (3.), 250 Hz (5.), 350 Hz (7.) ...

THD = Total Harmonic Distortion (Gesamtklirr)
```

**Problem:** Oberwellen belasten Transformatoren und Netz, können Messgeräte verfälschen.

**Messung:** Netzanalysatoren messen THD — für GA-Anlagen mit vielen FUs relevant.

---

## Zählertypen und Messgrößen

### Moderne elektronische Zähler (MID-konform)

| Messgrösse         | Einheit | Beschreibung                        |
|--------------------|---------|-------------------------------------|
| Wirkenergie Bezug  | kWh     | Verbrauch                           |
| Wirkenergie Einsp. | kWh     | Einspeisung (PV)                    |
| Blindenergie kap.  | kvarh   | Kondensatoren, PV-Wechselrichter    |
| Blindenergie ind.  | kvarh   | Motoren, Transformatoren            |
| Scheinenergie      | kVAh    |                                     |
| Leistungsfaktor    | —       | 0–1 (oder ±1 für Richtung)         |
| Wirkleistung aktuell | kW    | Momentan                            |
| Strom              | A       | Momentan (3 Phasen)                 |
| Spannung           | V       | Momentan (3 Phasen)                 |

### Kommunikationsschnittstellen

| Schnittstelle | Einsatz                                    |
|---------------|--------------------------------------------|
| **M-Bus**     | Wohngebäude, mehrere Zähler                |
| **Modbus RTU** | GA-Integration, DDC                       |
| **Modbus TCP** | IP-Netzwerk, direkt an GLT               |
| **S0-Puls**   | Einfache Impulszählung, 1 Impuls = x kWh  |
| **SML (Smart Meter Language)** | Optische Schnittstelle Haus-Zähler |

---

## Energiemessung in der GA-Praxis

### Teilzählung und Submetering

```
Hauptzähler (Netz-Einspeisepunkt)
    ├── Teilzähler 1: Heizung (FU-Pumpen, Brenner)
    ├── Teilzähler 2: Lüftung (FU-Ventilatoren)
    ├── Teilzähler 3: Beleuchtung
    ├── Teilzähler 4: Bürogeräte
    └── Teilzähler 5: Kälte (Kältekompressoren)
```

**Submetering** ermöglicht:
- Energiebilanz je Gewerk
- Kostenstellen-Zuweisung
- Verbrauchsanomalien erkennen (z.B. Lüftung 40 % Anteil → optimierbar?)

### Spitzenwert-Monitoring

```
GLT liest alle 1–5 Minuten die Wirkleistung
    ↓
EMS berechnet 15-min-Mittelwerte
    ↓
Alarm wenn Leistungslimit überschritten
    ↓
Lastmanagement aktiviert
```

---

## Normen

- **IEC 62053** — Elektrizitätszähler (verschiedene Teile für Klassen A/B/C)
- **EN 50160** — Merkmale der Spannung in öffentlichen Netzen
- **IEC 61000-4-30** — Messverfahren für Spannungsqualitätsparameter
- **MID 2014/32/EU** — Messgeräterichtlinie (Abrechnungszähler)

<!-- EN -->

## Electrical Energy Measurement — Active Power, Reactive Power, cos φ

Electrical energy measurement in BA provides the data for EMS, ISO 50001 and billing. Understanding active, reactive and apparent power is the foundation for correct measurement and assessment.

## The Three Types of Power

### Active Power P [W, kW]

**Usable power** — the energy actually consumed:

```
P = U × I × cos(φ)   [W]
```

- Heats, drives motors, provides light
- Billed by the energy supplier
- Unit: watt (W), kilowatt (kW)

### Reactive Power Q [var, kvar]

**Oscillates between generator and load** — required for magnetic fields (motors, transformers), does no useful work:

```
Q = U × I × sin(φ)   [var]
```

- Loads the network (cables, transformers)
- Often billed separately by energy supplier (Q tariff)
- Capacitive loads (capacitors): compensate reactive power

### Apparent Power S [VA, kVA]

**Geometric sum** of active and reactive power:

```
S = U × I = √(P² + Q²)   [VA]

S = P + jQ  (complex representation)
```

- Determines sizing of transformers, cables, fuses
- Unit: volt-ampere (VA), kilovolt-ampere (kVA)

---

## Power Triangle

```
         S (kVA)
        /│
       / │
      /  │ Q (kvar, reactive power)
     /φ  │
    └────┘
    P (kW, active power)

cos φ = P / S   (power factor)
tan φ = Q / P
```

---

## Power Factor cos φ

The **power factor** (also λ or PF) indicates how efficiently current is used:

| cos φ | Meaning |
|-------|---------|
| 1.0 | Ideal — active power only |
| 0.9 | Good — 10 % reactive power |
| 0.8 | Acceptable — limit of many utilities |
| 0.7 | Poor — network heavily loaded |
| 0.5 | Very poor — typical unfiltered VFDs |

**Practical values:**
- Incandescent lamp: cos φ = 1.0
- Induction motor (full load): cos φ = 0.85–0.95
- Induction motor (no load): cos φ = 0.2–0.4 (poor!)
- VFD + motor: cos φ at VFD input 0.7–0.9 (without harmonic filter)

---

## Harmonics (THD)

Modern devices with switch-mode power supplies and variable frequency drives generate **harmonics**:

```
Mains voltage: 50 Hz (fundamental)
Harmonics: 150 Hz (3rd), 250 Hz (5th), 350 Hz (7th) ...

THD = Total Harmonic Distortion
```

**Problem:** Harmonics load transformers and the network, can distort metering.

**Measurement:** Power analysers measure THD — relevant for BA systems with many VFDs.

---

## Meter Types and Measured Variables

### Modern Electronic Meters (MID-compliant)

| Measured variable | Unit | Description |
|------------------|------|-------------|
| Active energy import | kWh | Consumption |
| Active energy export | kWh | Feed-in (PV) |
| Reactive energy cap. | kvarh | Capacitors, PV inverters |
| Reactive energy ind. | kvarh | Motors, transformers |
| Apparent energy | kVAh | |
| Power factor | — | 0–1 (or ±1 for direction) |
| Active power instantaneous | kW | Current value |
| Current | A | Instantaneous (3 phases) |
| Voltage | V | Instantaneous (3 phases) |

### Communication Interfaces

| Interface | Use |
|-----------|-----|
| **M-Bus** | Residential, multiple meters |
| **Modbus RTU** | BA integration, DDC |
| **Modbus TCP** | IP network, direct to BMS |
| **S0 pulse** | Simple pulse counting, 1 pulse = x kWh |
| **SML (Smart Meter Language)** | Optical interface on utility meter |

---

## Energy Measurement in BA Practice

### Sub-billing and Submetering

```
Main meter (grid connection point)
    ├── Sub-meter 1: Heating (VFD pumps, burner)
    ├── Sub-meter 2: Ventilation (VFD fans)
    ├── Sub-meter 3: Lighting
    ├── Sub-meter 4: Office equipment
    └── Sub-meter 5: Cooling (chiller compressors)
```

**Submetering** enables:
- Energy balance per trade
- Cost centre allocation
- Identifying consumption anomalies (e.g. ventilation 40 % share → optimisable?)

### Peak Demand Monitoring

```
BMS reads active power every 1–5 minutes
    ↓
EMS calculates 15-minute averages
    ↓
Alarm if power limit exceeded
    ↓
Load management activated
```

---

## Standards

- **IEC 62053** — Electricity metering equipment (various parts for classes A/B/C)
- **EN 50160** — Voltage characteristics of electricity supplied by public networks
- **IEC 61000-4-30** — Testing methods for power quality parameters
- **MID 2014/32/EU** — Measuring Instruments Directive (billing meters)
