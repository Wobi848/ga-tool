---
title: Gradtage und Gradtagzahlen
title_en: Degree Days — Heating and Cooling Degree Days
slug: gradtage
category: energie
subcategory: heizung
tags:
  [
    gradtage,
    gradtagzahlen,
    heizgradtage,
    kühlgradtage,
    energiebedarf,
    klima,
    normaussentemperatur,
    heizperiode,
    jahresenergieverbrauch,
    energiekennzahl,
    verbrauchscontrolling
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [en12831, heizkurve, waermepumpe, energieausweis-kennzahlen, iso50001, heizung-grundlagen]
rechner: []
norm: [SIA 2028, EN ISO 15927-6, VDI 3807]
updated: 2026-05-15
lang: de
---

# Gradtage und Gradtagzahlen

Gradtage (GT) sind ein einfaches Mass für den klimatischen Heizbedarf eines Standorts. Sie ermöglichen den **Vergleich von Energieverbräuchen** zwischen verschiedenen Jahren oder Standorten, unabhängig von zufälligen Witterungsschwankungen.

## Definition Heizgradtag

Ein **Heizgradtag** [Kd] ist die Differenz zwischen der Heizgrenztemperatur und der mittleren Aussentemperatur eines Tages, wenn die Aussentemperatur unter der Heizgrenztemperatur liegt:

> **GT** = Σ (T_Grenz − T_Aussen,mittel) für alle Tage mit T_Aussen,mittel < T_Grenz

Die **Heizgrenztemperatur** ist in der Regel 12°C oder 15°C (je nach Norm/Land):

- **SIA 2028** (Schweiz): 12°C Heizgrenztemperatur
- **VDI 3807** (Deutschland): 15°C Heizgrenztemperatur
- **EN ISO 15927-6**: 15°C oder 18°C je nach Anwendung

## Berechnung und Einheit

```
Heizgradtage [Kd/a] = Σ max(0, T_grenz − T_tag_mittel)

Beispiel Zürich, Jahr 2024 (SIA 2028):
  Heizgradtage ≈ 2900 Kd/a
  Heizperiode: ca. Oktober–April
```

**Einheit**: Kelvin × Tage = Kd (Kelvin-Tage)

## Typische Heizgradtage Schweizer Standorte

| Standort   | Seehöhe | GT₁₂ [Kd/a] | GT₁₅ [Kd/a] | Klimazone  |
| ---------- | ------- | ----------- | ----------- | ---------- |
| Genf       | 375 m   | 2430        | 3150        | mild       |
| Basel      | 316 m   | 2560        | 3300        | mild       |
| Zürich     | 556 m   | 2880        | 3650        | gemässigt  |
| Bern       | 553 m   | 2980        | 3750        | gemässigt  |
| Luzern     | 454 m   | 2870        | 3640        | gemässigt  |
| St. Gallen | 776 m   | 3190        | 4010        | kühl       |
| Davos      | 1560 m  | 4790        | 5790        | alpin      |
| Lugano     | 299 m   | 1800        | 2490        | mediterran |
| Locarno    | 367 m   | 1620        | 2280        | mediterran |

Für Heizungen: GT₁₂ (SIA). Für Vergleich CH–DE: GT₁₅ (VDI).

## Verwendung in der Praxis

### 1. Jahresenergiebedarf abschätzen

```
Q_Heiz [kWh/a] = Q_Nenn [kW] × GT [Kd/a] × 24h/d / ΔT_Auslegung [K]
```

**Beispiel**: 15 kW Heizlast, Auslegung bei −10°C, Heizgrenztemperatur 20°C → ΔT = 30K, Zürich GT₁₂ = 2880 Kd:

```
Q = 15 kW × 2880 Kd × 24h / 30K = 34'560 kWh/a
```

### 2. Verbrauchscontrolling — Witterungsbereinigung

Warum hat das Gebäude 2023 mehr Energie verbraucht als 2022? War es ein kälterer Winter oder eine Fehlfunktion?

```
Bereinigter Verbrauch = Gemessener Verbrauch × GT_Referenz / GT_Ist
```

**Beispiel**: 2023 gemessen 45'000 kWh, GT₂₃ = 3200 Kd. Referenz GT_ref = 2880 Kd:

```
Bereinigt = 45'000 × 2880 / 3200 = 40'500 kWh
```

→ Der bereinigte Verbrauch ist tiefer als gemessen: 2023 war kälter als normal, das Gebäude war effizient.

### 3. Energiekennzahl (EKZ)

```
EKZ [kWh/(m²a)] = Q_Heiz / (GT_Ist / GT_Referenz) / A_E
```

Normiert auf Referenzklima → vergleichbar zwischen Jahren und Standorten.

## Kühlgradtage

Analog für Kühlung — wie viele Tage und Grad über der Kühlgrenztemperatur:

```
KGT = Σ max(0, T_tag_mittel − T_kühlgrenz)
```

Kühlgrenztemperatur: meist 18°C oder 22°C.

| Standort | KGT₁₈ [Kd/a] | KGT₂₂ [Kd/a] |
| -------- | ------------ | ------------ |
| Lugano   | 420          | 140          |
| Genf     | 290          | 80           |
| Zürich   | 200          | 40           |
| Davos    | 30           | 5            |

## Klimawandel und Trend

Heizgradtage nehmen in der Schweiz ab, Kühlgradtage zu:

| Periode             | GT₁₂ Zürich (Mittel) |
| ------------------- | -------------------- |
| 1961–1990           | ~3100 Kd/a           |
| 1991–2020           | ~2750 Kd/a           |
| 2050 (Szenario A1B) | ~2000–2300 Kd/a      |

Konsequenz: Auslegungsheizlasten nach altem Klimanormal überschätzen den zukünftigen Heizbedarf. Wärmepumpen werden wirtschaftlicher, Kühlung wichtiger.

## DDC-Anwendungen

**Jahresverbrauchscontrolling**: Gradtage automatisch aus Aussentemperaturtrend berechnen und täglich akkumulieren → Verbrauch immer witterungsbereinigt vergleichbar.

**Adaptiver Energievergleich**: Alarm wenn bereinigter Energieverbrauch > 10% über Vorjahreswert.

```
// Beispiel-Pseudocode DDC
IF T_aussen < 12.0 THEN
    gradtag_heute := 12.0 - T_aussen_mittel_tag;
END_IF
gradtage_jahr := gradtage_jahr + gradtag_heute;  // Akkumuliert
```

## Datenquellen

- **MeteoSchweiz**: ENET — offizielle Gradtage nach SIA 2028 kostenlos
- **DWD** (Deutschland): Gradtagzahlen nach VDI 3807, Klimastationen
- **open-meteo.com**: Historische Stundenwerte, selbst berechenbar
- **SIA 2028**: Klimadaten für Energieberechnungen (Normklima, Referenzjahr)

<!-- EN -->

Degree days (DD) are a simple measure of the climatic heating demand at a given location. They enable the **comparison of energy consumption** between different years or locations, independent of random weather fluctuations.

## Definition of Heating Degree Days

A **heating degree day** [Kd] is the difference between the base temperature and the daily mean outdoor temperature, for all days on which the mean outdoor temperature is below the base temperature:

> **HDD** = Σ (T_base − T_outdoor_mean) for all days where T_outdoor_mean < T_base

The **base temperature** is typically 12 °C or 15 °C (depending on standard/country):

- **SIA 2028** (Switzerland): 12 °C base temperature
- **VDI 3807** (Germany): 15 °C base temperature
- **EN ISO 15927-6**: 15 °C or 18 °C depending on application

## Calculation and Units

```
Heating degree days [Kd/year] = Σ max(0, T_base − T_daily_mean)

Example Zurich, 2024 (SIA 2028):
  Heating degree days ≈ 2,900 Kd/year
  Heating season: approx. October–April
```

**Unit**: Kelvin × days = Kd (kelvin-days)

## Typical Heating Degree Days — Swiss Locations

| Location   | Altitude | HDD₁₂ [Kd/year] | HDD₁₅ [Kd/year] | Climate zone  |
| ---------- | -------- | --------------- | --------------- | ------------- |
| Geneva     | 375 m    | 2,430           | 3,150           | Mild          |
| Basel      | 316 m    | 2,560           | 3,300           | Mild          |
| Zurich     | 556 m    | 2,880           | 3,650           | Temperate     |
| Bern       | 553 m    | 2,980           | 3,750           | Temperate     |
| Lucerne    | 454 m    | 2,870           | 3,640           | Temperate     |
| St. Gallen | 776 m    | 3,190           | 4,010           | Cool          |
| Davos      | 1,560 m  | 4,790           | 5,790           | Alpine        |
| Lugano     | 299 m    | 1,800           | 2,490           | Mediterranean |
| Locarno    | 367 m    | 1,620           | 2,280           | Mediterranean |

For heating systems: HDD₁₂ (SIA). For CH–DE comparison: HDD₁₅ (VDI).

## Practical Applications

### 1. Estimating Annual Energy Demand

```
Q_heat [kWh/year] = Q_rated [kW] × HDD [Kd/year] × 24h/d / ΔT_design [K]
```

**Example**: 15 kW heating load, design at −10 °C, base temperature 20 °C → ΔT = 30 K, Zurich HDD₁₂ = 2,880 Kd:

```
Q = 15 kW × 2,880 Kd × 24h / 30 K = 34,560 kWh/year
```

### 2. Consumption Monitoring — Weather Normalisation

Why did the building use more energy in 2023 than in 2022? Was it a colder winter or a fault?

```
Normalised consumption = Measured consumption × HDD_reference / HDD_actual
```

**Example**: 2023 measured 45,000 kWh, HDD₂₃ = 3,200 Kd. Reference HDD_ref = 2,880 Kd:

```
Normalised = 45,000 × 2,880 / 3,200 = 40,500 kWh
```

→ The normalised consumption is lower than measured: 2023 was colder than normal, the building was efficient.

### 3. Energy Performance Index (EPI)

```
EPI [kWh/(m²·year)] = Q_heat / (HDD_actual / HDD_reference) / A_floor
```

Normalised to reference climate → comparable across years and locations.

## Cooling Degree Days

Analogous for cooling — how many days and degrees above the cooling base temperature:

```
CDD = Σ max(0, T_daily_mean − T_cooling_base)
```

Cooling base temperature: typically 18 °C or 22 °C.

| Location | CDD₁₈ [Kd/year] | CDD₂₂ [Kd/year] |
| -------- | --------------- | --------------- |
| Lugano   | 420             | 140             |
| Geneva   | 290             | 80              |
| Zurich   | 200             | 40              |
| Davos    | 30              | 5               |

## Climate Change and Trends

Heating degree days are decreasing in Switzerland; cooling degree days are increasing:

| Period              | HDD₁₂ Zurich (mean)  |
| ------------------- | -------------------- |
| 1961–1990           | ~3,100 Kd/year       |
| 1991–2020           | ~2,750 Kd/year       |
| 2050 (scenario A1B) | ~2,000–2,300 Kd/year |

Consequence: Design heating loads based on old climate normals overestimate future heating demand. Heat pumps become more economical; cooling becomes more important.

## DDC Applications

**Annual consumption monitoring**: Calculate degree days automatically from the outdoor temperature trend and accumulate daily → consumption always weather-normalised for comparison.

**Adaptive energy comparison**: Alarm if normalised energy consumption is >10% above the previous year.

```
// Example pseudocode DDC
IF T_outdoor < 12.0 THEN
    degree_day_today := 12.0 - T_outdoor_daily_mean;
END_IF
degree_days_year := degree_days_year + degree_day_today;  // Accumulated
```

## Data Sources

- **MeteoSchweiz**: ENET — official degree days per SIA 2028, free of charge
- **DWD** (Germany): Degree day figures per VDI 3807, climate stations
- **open-meteo.com**: Historical hourly values, self-calculable
- **SIA 2028**: Climate data for energy calculations (standard climate, reference year)
