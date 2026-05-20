---
title: Wärmepumpe — Grundlagen, Regelung & GA
title_en: Heat Pump — Fundamentals, Control and BA Integration
slug: waermepumpe
category: heizung
subcategory: erzeuger
tags: [wärmepumpe, cop, scop, kältemittel, verdichter, verdampfer, verflüssiger, expansionsventil, sole-wasser, luft-wasser, wasser-wasser, inverter, heizstab, sperrzeiten, sg-ready]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizkurve, druckverlust, hydraulischer-abgleich, sg-ready, pv-integration, ems-lastmanagement]
norm: [EN 14511, EN 14825, VDI 4645]
updated: 2026-05-14
lang: de
---

# Wärmepumpe — Grundlagen, Regelung & GA

Die **Wärmepumpe** entzieht einer Wärmequelle (Luft, Erdreich, Wasser) Energie und hebt sie auf ein nutzbares Temperaturniveau. In der GA sind vor allem **Luft/Wasser-** und **Sole/Wasser-Wärmepumpen** relevant.

## Thermodynamisches Prinzip

```
Verdampfer (kalt) → Verdichter → Verflüssiger (warm) → Expansionsventil → Verdampfer
  Wärmequelle          (Strom)       Heizkreis         (Drossel)
```

1. **Verdampfer:** Kältemittel verdampft bei niedrigem Druck, nimmt Wärme aus der Quelle auf
2. **Verdichter:** Komprimiert das Kältemittelgas → Temperatur steigt
3. **Verflüssiger:** Kältemittel kondensiert, gibt Wärme an den Heizkreis ab
4. **Expansionsventil:** Druckabfall, Kältemittel wird kalt und flüssig

## Quellentypen

| Typ             | Wärmequelle    | COP (typisch)  | Bemerkungen                                  |
|-----------------|----------------|----------------|----------------------------------------------|
| **Luft/Wasser** | Aussenluft     | 2,5–4,5        | Einfache Installation, COP sinkt bei Kälte   |
| **Sole/Wasser** | Erdkollektor / Sonde | 3,5–5,0 | Konstantere Quelltemperatur, aufwändiger     |
| **Wasser/Wasser** | Grundwasser / Abwasser | 4,0–6,0 | Höchste Effizienz, Genehmigung nötig       |

> ⚠️ **Luft/Wasser bei −10 °C:** COP sinkt auf ~2,0 oder darunter. Oft mit **Heizstab** (Elektro-Direktheizung) als Notfallheizung kombiniert — dieser hat COP 1,0 und sollte möglichst selten laufen.

## Leistungskennzahlen

### COP (Coefficient of Performance)

**Momentan-Wirkungsgrad** bei einem Betriebspunkt:

$$\text{COP} = \frac{Q_{Heiz}}{P_{el}}$$

- `Q_Heiz` = abgegebene Heizleistung [kW]
- `P_el` = aufgenommene elektrische Leistung [kW]

**Normprüfpunkt** nach EN 14511 typisch: A7/W35 (Luft 7 °C, Vorlauf 35 °C)

### SCOP (Seasonal COP)

**Jahres-Wirkungsgrad** über die gesamte Heizperiode nach EN 14825 — praxisnäher als COP, denn er berücksichtigt:
- Verschiedene Aussentemperaturen
- Teillastbetrieb
- Abtauzyklen (bei L/W-WP)
- Hilfsenergie (Pumpen, Steuerung)

Typische SCOP-Werte:
- L/W-WP mit Niedertemperatur-Heizkreis: **3,0–4,5**
- Sole/W-WP: **4,0–5,5**

## Betriebsarten

| Betriebsart       | Beschreibung                                             |
|-------------------|----------------------------------------------------------|
| **Heizbetrieb**   | Raumheizung via Heizkurve (witterungsgeführt)            |
| **Kühlbetrieb**   | Aktiv (Kältemaschinen-Modus) oder passiv (Natural Cooling bei Sole/W) |
| **WW-Bereitung**  | Brauchwarmwasser, typisch bis 55 °C, bei Legionellenschutz bis 60 °C |
| **Abtauung**      | L/W-WP: Verdampfer vereist bei Aussentemp. ≤ 5 °C, WP reversiert kurz |
| **Standby**       | Frostschutz, minimale Zirkulation                        |

## Hydraulikschema (vereinfacht)

```
WP-Verflüssiger ── Pufferspeicher ── Mischer ── Heizkreise
                       │
                  Warmwasserspeicher (oben)
                       │
                  Zirkulationspumpe
```

- **Pufferspeicher:** Entkoppelt WP-Takt von Heizkreis, ermöglicht Mindestlaufzeit
- **Mindestlaufzeit:** 10–20 min, um den Verdichter zu schonen (Kurzzyklen schädlich!)
- **Hydraulische Weiche / Puffer:** Bei mehreren Heizkreisen mit verschiedenen Temperaturniveaus

> ⚠️ **Kurzzyklen** (< 3 min) schaden dem Verdichter massiv. Pufferspeicher dimensionieren!

## Regelung & GA-Integration

### Steuerungsparameter (GA-relevante Datenpunkte)

| Datenpunkt                  | Typ    | Beschreibung                                   |
|-----------------------------|--------|------------------------------------------------|
| Betriebsart                 | Soll   | Heizen / Kühlen / WW / Off                     |
| Vorlauf-Solltemperatur      | Soll   | Extern vorgeben (überschreibt Heizkurve)        |
| Vorlauf-Isttemperatur       | Ist    | Rückmeldung aktuell                            |
| Rücklauf-Isttemperatur      | Ist    | Differenz = Spreizung                          |
| Aussentemperatur            | Ist    | Für Heizkurve                                  |
| Verdichter Laufmeldung      | Ist    | Ein/Aus, Stufe oder Frequenz (Inverter)        |
| Heizstab aktiv              | Ist    | Zusatzheizung läuft                            |
| Störmeldung                 | Ist    | Fehlercode                                     |
| Speichertemperatur          | Ist    | Puffer oben/unten                              |
| SG-Ready-Eingang (1–4)      | Soll   | Smart-Grid-Steuerung                           |

### SG Ready (Smart Grid)

Deutsches Schnittstellenkonzept — 4 Zustände via 2 digitale Eingänge:

| Zustand | E1 | E2 | Bedeutung                                          |
|---------|----|----|----------------------------------------------------|
| 1       | 0  | 0  | Sperrzeit (EVU-Abschaltung)                        |
| 2       | 1  | 0  | **Normalbetrieb** (Standard)                       |
| 3       | 0  | 1  | **Einschaltempfehlung** (WP läuft, Speicher laden) |
| 4       | 1  | 1  | **Anlaufbefehl** (Überschuss PV, Billigstrom)      |

Die GA kann über digitale Ausgänge die SG-Ready-Eingänge setzen — z.B. zur PV-Überschussnutzung.

### Inverter-WP

Moderne WP mit **Frequenzumrichter** am Verdichter können die Leistung stufenlos regulieren (z.B. 20–100 %). Vorteile:
- Kein Takten, Verdichter läuft durch
- Effizienter im Teillastbetrieb
- Leiser

GA-Sicht: Meist ist dennoch nur On/Off + Sollwert-Vorgabe möglich; interne Regelung übernimmt die FU-Steuerung.

## Abtauung (Luft/Wasser)

Bei Verdampfertemperaturen ≤ 0 °C bildet sich Reif. Die WP erkennt Abtaubedarf über:
- Zeitintervall (z.B. alle 60 min)
- Druckdifferenz am Verdampfer
- Temperaturdifferenz Umluft – Verdampfer

**Abtauvorgang:** WP reversiert den Kreislauf kurz (~2–10 min), heisses Kältemittel taut Verdampfer auf. Heizkreis wird in dieser Zeit vom Puffer versorgt.

> Während Abtauung sinkt Vorlauftemperatur kurz — die GLT sollte Alarme in diesem Zeitfenster unterdrücken.

## Häufige Fehler & Diagnose

| Problem                         | Mögliche Ursache                                           |
|---------------------------------|------------------------------------------------------------|
| WP schaltet häufig kurz ein/aus | Pufferspeicher zu klein, Mindestlaufzeit nicht erreicht    |
| Hoher Heizstab-Anteil           | WP zu klein, Quellentemperatur zu niedrig, Abtaufehler     |
| WW nicht warm genug             | Nachheiztemperatur zu niedrig eingestellt (Legionellenschutz!) |
| Druckfehler Hochdruck           | Verflüssiger verschmutzt, Heizkreispumpe defekt            |
| Druckfehler Niederdruck         | Verdampfer vereist (Abtaufehler), Kältemittelmangel        |
| Keine Kälteleistung im Sommer   | Betriebsart Kühlen nicht aktiviert, Hydraulik nicht umgeschaltet |

## Normen

- **EN 14511** — Prüfnormen, Prüfpunkte für Wärmepumpen
- **EN 14825** — SCOP-Berechnung (saisonale Effizienz)
- **VDI 4645** — Planung und Dimensionierung von WP-Anlagen
- **EN 12831** — Heizlastberechnung (Basis für WP-Dimensionierung)

<!-- EN -->

The **heat pump** extracts energy from a heat source (air, ground, water) and raises it to a usable temperature level. In BA, **air/water** and **brine/water heat pumps** are particularly relevant.

## Thermodynamic Principle

```
Evaporator (cold) → Compressor → Condenser (warm) → Expansion valve → Evaporator
  Heat source       (electricity)  Heating circuit    (throttle)
```

1. **Evaporator:** Refrigerant evaporates at low pressure, absorbs heat from source
2. **Compressor:** Compresses refrigerant gas → temperature rises
3. **Condenser:** Refrigerant condenses, transfers heat to heating circuit
4. **Expansion valve:** Pressure drops, refrigerant becomes cold and liquid

## Source Types

| Type | Heat source | COP (typical) | Notes |
|------|-----------|-------------|-------|
| **Air/water** | Outdoor air | 2.5–4.5 | Easy installation; COP drops in cold weather |
| **Brine/water** | Ground collector / borehole | 3.5–5.0 | More stable source temperature; more complex |
| **Water/water** | Groundwater / waste water | 4.0–6.0 | Highest efficiency; permit required |

> ⚠️ **Air/water at −10 °C:** COP drops to ~2.0 or below. Often combined with an **electric immersion heater** (direct electric heating) as backup — this has COP 1.0 and should run as infrequently as possible.

## Performance Indicators

### COP (Coefficient of Performance)

**Instantaneous efficiency** at one operating point:

$$\text{COP} = \frac{Q_{heat}}{P_{el}}$$

- `Q_heat` = heat output [kW]
- `P_el` = electrical power input [kW]

**Standard test point** per EN 14511 typically: A7/W35 (air 7 °C, supply 35 °C)

### SCOP (Seasonal COP)

**Annual efficiency** over the full heating season per EN 14825 — more realistic than COP, as it accounts for:
- Different outdoor temperatures
- Part-load operation
- Defrost cycles (for air/water HPs)
- Auxiliary energy (pumps, controls)

Typical SCOP values:
- Air/water HP with low-temperature circuit: **3.0–4.5**
- Brine/water HP: **4.0–5.5**

## Operating Modes

| Mode | Description |
|------|------------|
| **Heating** | Space heating via heating curve (weather-compensated) |
| **Cooling** | Active (chiller mode) or passive (natural cooling with brine/water) |
| **DHW heating** | Domestic hot water, typically to 55 °C; to 60 °C for Legionella protection |
| **Defrost** | Air/water HP: evaporator ices up at outdoor temp ≤ 5 °C; HP briefly reverses cycle |
| **Standby** | Frost protection, minimal circulation |

## Hydraulic Schematic (Simplified)

```
HP condenser ── Buffer tank ── Mixer ── Heating circuits
                    │
               DHW storage (upper section)
                    │
               Circulation pump
```

- **Buffer tank:** Decouples HP cycling from heating circuit; enables minimum run time
- **Minimum run time:** 10–20 min to protect the compressor (short-cycling is harmful!)
- **Hydraulic separator / buffer:** For multiple heating circuits at different temperature levels

> ⚠️ **Short-cycling** (< 3 min) severely damages the compressor. Size the buffer correctly!

## Control and BA Integration

### Control Parameters (BA-Relevant Data Points)

| Data point | Type | Description |
|-----------|------|------------|
| Operating mode | Setpoint | Heating / cooling / DHW / off |
| Supply temperature setpoint | Setpoint | External override (overrides heating curve) |
| Supply temperature actual | Actual | Current feedback |
| Return temperature actual | Actual | Difference = spread |
| Outdoor temperature | Actual | For heating curve |
| Compressor run signal | Actual | On/off, stage or frequency (inverter) |
| Immersion heater active | Actual | Backup heating running |
| Fault signal | Actual | Error code |
| Buffer tank temperature | Actual | Upper/lower |
| SG-Ready input (1–4) | Setpoint | Smart grid control |

### SG Ready (Smart Grid)

German interface concept — 4 states via 2 digital inputs:

| State | I1 | I2 | Meaning |
|-------|----|----|---------|
| 1 | 0 | 0 | Lockout (utility curtailment) |
| 2 | 1 | 0 | **Normal operation** (default) |
| 3 | 0 | 1 | **Switch-on recommendation** (HP runs, charge buffer) |
| 4 | 1 | 1 | **Start command** (PV surplus, cheap electricity) |

BA can set SG-Ready inputs via digital outputs — e.g. to utilise PV surplus.

### Inverter HP

Modern HPs with a **variable speed drive** on the compressor can modulate output continuously (e.g. 20–100 %). Advantages:
- No cycling; compressor runs continuously
- More efficient at part load
- Quieter

BA perspective: Usually only on/off + setpoint input is possible; internal control manages the VSD.

## Defrost (Air/Water)

At evaporator temperatures ≤ 0 °C, frost forms. The HP detects defrost demand via:
- Time interval (e.g. every 60 min)
- Differential pressure at evaporator
- Temperature difference between ambient air and evaporator

**Defrost cycle:** HP briefly reverses the circuit (~2–10 min); hot refrigerant thaws the evaporator. The buffer tank supplies the heating circuit during this period.

> During defrost, supply temperature drops briefly — the BMS should suppress alarms during this window.

## Common Faults and Diagnosis

| Problem | Possible cause |
|---------|---------------|
| HP cycles on/off frequently | Buffer too small; minimum run time not reached |
| High immersion heater usage | HP undersized; source temperature too low; defrost fault |
| DHW not warm enough | Reheat temperature set too low (Legionella protection!) |
| High-pressure fault | Condenser fouled; heating circuit pump failed |
| Low-pressure fault | Evaporator iced (defrost fault); refrigerant shortage |
| No cooling in summer | Cooling mode not activated; hydraulics not switched |

## Standards

- **EN 14511** — Test standards, test points for heat pumps
- **EN 14825** — SCOP calculation (seasonal efficiency)
- **VDI 4645** — Planning and sizing of heat pump systems
- **EN 12831** — Heating load calculation (basis for HP sizing)
