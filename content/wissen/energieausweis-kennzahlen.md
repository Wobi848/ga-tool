---
title: Energieausweis und Gebäudekennzahlen — GEAK, Minergie, kWh/m²
title_en: Energy Performance Certificates and Building Metrics — GEAK, Minergie, kWh/m²
slug: energieausweis-kennzahlen
category: energie
subcategory: kennzahlen
tags:
  [
    energieausweis,
    geak,
    minergie,
    kwh-m2,
    energiebezugsfläche,
    heizenergiebedarf,
    gesamtenergiebedarf,
    primärenergie,
    co2-emissionen,
    gebäudeenergieeffizienz,
    iso50001,
    energiekennzahl,
    eki,
    sia-380-1
  ]
difficulty: grundlagen
area: [hlk, ga, normen]
related: [ems-lastmanagement, energiemessung, en15232, en12831, waermepumpe]
norm: [SIA 380/1, GEAK, Minergie, EnEV (DE), GEG (DE), EPBD (EU)]
updated: 2026-05-15
lang: de
---

# Energieausweis und Gebäudekennzahlen — GEAK, Minergie, kWh/m²

Gebäudeenergiekennzahlen messen den Energiebedarf oder -verbrauch eines Gebäudes. Sie sind Grundlage für Optimierungen, Förderbeiträge und gesetzliche Anforderungen.

## Wichtigste Kennzahl: Heizenergiebedarf

### Spezifischer Heizwärmebedarf [kWh/(m²·a)]

```
Heizenergiebedarf / Energiebezugsfläche (EBF) = kWh/m²a

Energiebezugsfläche (EBF):
  = beheizte Bruttogeschossfläche
  (NICHT Nettofläche / Wohnfläche!)

Typische Werte Schweiz (SIA 380/1):
  Minergie-P:      ≤ 15 kWh/m²a
  Minergie:        ≤ 38 kWh/m²a  (Wohnen)
  Neubau Standard: 50–80 kWh/m²a
  Altbau saniert:  80–150 kWh/m²a
  Altbau unsaniert: 150–300 kWh/m²a
```

### Gesamtenergiebedarf (GED)

```
GED = Heizung + Warmwasser + Lüftung + Kühlung + Beleuchtung + Hilfsbetriebe

Energieträger-Wichtung (Primärenergie):
  Strom: Faktor 2.0 (Herstellungsverluste)
  Fernwärme (Holz): Faktor 0.5 (erneuerbar)
  Erdgas: Faktor 1.0
  Öl: Faktor 1.2
```

---

## GEAK — Gebäudeenergieausweis Kantone (Schweiz)

```
GEAK: Schweizer Energieausweis für Wohngebäude
Pflicht: Bei Verkauf oder Vermietung (kantonal unterschiedlich)
Klassen: A (beste) bis G (schlechteste)
Zwei Bewertungen:
  1. Gebäudehülle (Isolation, Fenster)
  2. Gesamtenergieeffizienz (inkl. HLK-System)
```

### GEAK-Klassen

| Klasse | Heizenergiebedarf [kWh/m²a] |
| ------ | --------------------------- |
| A      | ≤ 35                        |
| B      | 35–65                       |
| C      | 65–95                       |
| D      | 95–130                      |
| E      | 130–175                     |
| F      | 175–235                     |
| G      | > 235                       |

---

## Minergie (Schweiz)

Minergie ist ein Qualitätslabel für Gebäude mit tiefem Energieverbrauch:

| Label            | Anforderung Wärme | Besonderheit                           |
| ---------------- | ----------------- | -------------------------------------- |
| **Minergie**     | ≤ 38 kWh/m²a      | Kontrollierte Lüftung Pflicht          |
| **Minergie-P**   | ≤ 15 kWh/m²a      | Passivhaus-Standard                    |
| **Minergie-A**   | Plusenergie       | Mehr Energie produziert als verbraucht |
| **Minergie-ECO** | + Minergie        | Zusätzlich Ökologie + Gesundheit       |

**GA-Anforderungen für Minergie:**

- EN 15232 GA-Klasse B oder besser
- Energiemonitoring / Submetering
- Kontrollierte Wohnungslüftung mit WRG

---

## GEG / EnEV (Deutschland)

```
GEG (Gebäudeenergiegesetz, seit 2020):
  Ersetzt EnEV + EEWärmeG

Primärenergiebedarf [kWh/(m²a)]:
  Neubau: ≤ 75 % des Referenzgebäudes (2023)

  GEG 2024 (geplante Verschärfung):
  Neue Heizungsanlagen: mind. 65 % erneuerbare Energien

Energieausweis (DE):
  Bedarfsausweis: berechnet (Pflicht bei schlechten Gebäuden)
  Verbrauchsausweis: gemessen (3 Jahre Verbrauchsdaten nötig)
  Klassen A+ bis H (Buchstabenklassen)
```

---

## Energiekennzahlen in der GA nutzen

### Monitoring und Benchmarking

```
GLT / EMS berechnet laufend:
  Monatlicher Wärmeverbrauch [kWh]
    ÷ Energiebezugsfläche [m²]
    ÷ Heiztage (HGT, Heizgradtage)
  = Witterungsbereinigter Energiekennzahl [kWh/(m²HGT)]

Vergleich:
  Dieser Monat vs. Vorjahr (gleiche Periode)
  Dieses Gebäude vs. Benchmark (Gebäudekategorie)

Alarm: Verbrauch > 20 % über Vorjahr → Untersuchung
```

### Heizgradtage (HGT / Gradtage)

```
HGT = Anzahl Heiztage × (T_Raum − T_Aussen_Mittel)

Heizgrenztemperatur: typisch 12 °C (Schweiz SIA 381/1)
Basistemperatur: 20 °C

Jahres-HGT CH:
  Zürich:  3306 Kd (Kelvingrade)
  Bern:    3558 Kd
  Davos:   5380 Kd
  Lugano:  2062 Kd
```

---

## Submetering für Kennzahlen

```
Für aussagekräftige Kennzahlen:
  Wärmezähler Heizung → kWh/a
  Wärmezähler Warmwasser → kWh/a
  Stromzähler je Gewerk → kWh/a
  Gaszähler → m³/a → kWh/a (× Heizwert)

Aufteilung:
  Heizung: Wärmemenge-Zähler
  Lüftung: Strom-Teilzähler (FU-Ventilatoren)
  Kälte: Strom-Teilzähler (Kältekompressor)
  Beleuchtung: Strom-Teilzähler
```

---

## Normen

- **SIA 380/1** — Thermische Energie im Hochbau (Schweizer Grundnorm)
- **GEAK** — Gebäudeenergieausweis der Kantone (Schweiz)
- **Minergie** — Qualitätslabel (Anforderungskatalog, minergie.ch)
- **GEG** — Gebäudeenergiegesetz (Deutschland, seit 2020)
- **EPBD 2024** — EU-Gebäudeenergierichtlinie (Nullemissionsgebäude 2030/2050)

<!-- EN -->

## Energy Performance Certificates and Building Metrics — GEAK, Minergie, kWh/m²

Building energy metrics measure a building's energy demand or consumption. They are the basis for optimisation, subsidies and statutory requirements.

## Key Metric: Heating Energy Demand

### Specific Space Heating Demand [kWh/(m²·a)]

```
Heating energy demand / Energy reference area (ERA) = kWh/m²a

Energy reference area (ERA):
  = heated gross floor area
  (NOT net area / living area!)

Typical values Switzerland (SIA 380/1):
  Minergie-P:      ≤ 15 kWh/m²a
  Minergie:        ≤ 38 kWh/m²a  (residential)
  New build standard: 50–80 kWh/m²a
  Renovated existing: 80–150 kWh/m²a
  Unrenovated existing: 150–300 kWh/m²a
```

### Total Energy Demand (TED)

```
TED = Heating + DHW + Ventilation + Cooling + Lighting + Auxiliary

Energy carrier weighting (primary energy):
  Electricity: factor 2.0 (generation losses)
  District heat (wood): factor 0.5 (renewable)
  Natural gas: factor 1.0
  Oil: factor 1.2
```

---

## GEAK — Cantonal Building Energy Certificate (Switzerland)

```
GEAK: Swiss energy certificate for residential buildings
Mandatory: On sale or rental (varies by canton)
Classes: A (best) to G (worst)
Two assessments:
  1. Building envelope (insulation, windows)
  2. Overall energy efficiency (incl. HVAC system)
```

### GEAK Classes

| Class | Heating energy demand [kWh/m²a] |
| ----- | ------------------------------- |
| A     | ≤ 35                            |
| B     | 35–65                           |
| C     | 65–95                           |
| D     | 95–130                          |
| E     | 130–175                         |
| F     | 175–235                         |
| G     | > 235                           |

---

## Minergie (Switzerland)

Minergie is a quality label for buildings with low energy consumption:

| Label            | Heat requirement | Special feature                    |
| ---------------- | ---------------- | ---------------------------------- |
| **Minergie**     | ≤ 38 kWh/m²a     | Controlled ventilation mandatory   |
| **Minergie-P**   | ≤ 15 kWh/m²a     | Passive house standard             |
| **Minergie-A**   | Plus energy      | Produces more energy than consumed |
| **Minergie-ECO** | + Minergie       | Additionally ecology + health      |

**BA requirements for Minergie:**

- EN 15232 BA class B or better
- Energy monitoring / submetering
- Controlled residential ventilation with heat recovery

---

## GEG / EnEV (Germany)

```
GEG (Building Energy Act, since 2020):
  Replaces EnEV + EEWärmeG

Primary energy demand [kWh/(m²a)]:
  New builds: ≤ 75 % of reference building (2023)

  GEG 2024 (planned tightening):
  New heating systems: min. 65 % renewable energy

Energy certificate (DE):
  Demand certificate: calculated (mandatory for poor buildings)
  Consumption certificate: measured (3 years consumption data required)
  Classes A+ to H (letter classes)
```

---

## Using Energy Metrics in BA

### Monitoring and Benchmarking

```
BMS / EMS continuously calculates:
  Monthly heat consumption [kWh]
    ÷ Energy reference area [m²]
    ÷ Heating degree days (HDD)
  = Weather-corrected energy index [kWh/(m²·HDD)]

Comparison:
  This month vs. prior year (same period)
  This building vs. benchmark (building category)

Alert: consumption > 20 % above prior year → investigation
```

### Heating Degree Days (HDD)

```
HDD = Number of heating days × (T_room − T_outdoor_mean)

Heating limit temperature: typically 12 °C (Switzerland SIA 381/1)
Base temperature: 20 °C

Annual HDD CH:
  Zurich:  3306 Kd (Kelvin-days)
  Bern:    3558 Kd
  Davos:   5380 Kd
  Lugano:  2062 Kd
```

---

## Submetering for Metrics

```
For meaningful metrics:
  Heat meter heating → kWh/a
  Heat meter DHW → kWh/a
  Sub-electricity meter per system → kWh/a
  Gas meter → m³/a → kWh/a (× calorific value)

Breakdown:
  Heating: heat quantity meter
  Ventilation: sub-electricity meter (VFD fans)
  Cooling: sub-electricity meter (chiller compressor)
  Lighting: sub-electricity meter
```

---

## Standards

- **SIA 380/1** — Thermal energy in buildings (Swiss base standard)
- **GEAK** — Cantonal building energy certificate (Switzerland)
- **Minergie** — Quality label (requirements catalogue, minergie.ch)
- **GEG** — Building Energy Act (Germany, since 2020)
- **EPBD 2024** — EU Building Energy Performance Directive (zero-emission buildings 2030/2050)
