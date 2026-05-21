---
title: Taupunkt & Bauteilkondensation
title_en: Dew Point and Surface Condensation
slug: taupunkt
category: lueftung
subcategory: feuchtigkeit
tags:
  [
    taupunkt,
    taupunkttemperatur,
    kondensation,
    relative-feuchte,
    absolute-feuchte,
    kühldecke,
    kondensatwanne,
    bauteiltemperatur,
    fensterkondensation,
    sommerlicher-wärmeschutz,
    mollier
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [pid-regler, heizkurve]
norm: [EN ISO 13788, DIN 4108-3, SIA 180]
updated: 2026-05-14
lang: de
---

# Taupunkt & Bauteilkondensation

**Kondensation** entsteht, wenn eine Oberfläche kühler ist als die **Taupunkttemperatur** der umgebenden Luft. In der GA ist dies besonders relevant bei **Kühldecken**, **Kältebalkens**, **Kaltwasserleitungen** und im **Kühlbetrieb** allgemein.

## Psychrometrische Grundbegriffe

### Relative Feuchte (RH)

Verhältnis des tatsächlichen Wasserdampfpartialdrucks zum **Sättigungsdampfdruck** bei gleicher Temperatur:

$$\varphi = \frac{p_D}{p_{D,s}(T)} \cdot 100\%$$

- φ = 100 %: Luft ist gesättigt, Kondensation beginnt
- φ = 50 %, 22 °C: typische Raumluft-Komfortbedingung

### Sättigungsdampfdruck (Magnus-Formel)

$$p_{D,s}(T) = 6{,}1078 \cdot e^{\frac{17{,}269 \cdot T}{237{,}3 + T}} \quad [\text{hPa}]$$

(vereinfacht nach Magnus, gültig für 0–60 °C)

### Absolute Feuchte

Wasserdampfmasse pro Luftvolumen [g/m³]:

$$a = \frac{216{,}7 \cdot p_{D,s}(T) \cdot \varphi}{T + 273{,}15}$$

### Wassergehalt (Mischungsverhältnis)

Wasserdampfmasse pro Trockenlufmasse [g/kg]:

$$x = 0{,}622 \cdot \frac{p_{D,s}(T) \cdot \varphi}{p_{ges} - p_{D,s}(T) \cdot \varphi}$$

## Taupunkttemperatur

Die **Taupunkttemperatur** T_d ist jene Temperatur, bei der die Luft bei konstantem Wasserdampfgehalt den Sättigungszustand (φ = 100 %) erreicht.

### Näherungsformel (Magnus, gültig für T > 0 °C):

$$T_d = \frac{237{,}3 \cdot \left(\ln\frac{\varphi}{100} + \frac{17{,}269 \cdot T}{237{,}3 + T}\right)}{17{,}269 - \left(\ln\frac{\varphi}{100} + \frac{17{,}269 \cdot T}{237{,}3 + T}\right)}$$

### Faustformel (grobe Näherung):

$$T_d \approx T - \frac{100 - \varphi}{5}$$

**Beispiele:**

| T [°C] | φ [%] | T_d [°C] |
| ------ | ----- | -------- |
| 22     | 50    | ~11,1    |
| 26     | 60    | ~17,6    |
| 22     | 65    | ~15,0    |
| 28     | 70    | ~21,9    |

> ⚠️ **Sommerliches Büro:** 26 °C / 60 % RH → Taupunkt ~17,6 °C. Kühldecken-Vorlauftemperatur muss **über** diesem Wert bleiben — sonst tropft die Decke.

## Kondensation an Oberflächen

Kondensation entsteht, wenn **T_Oberfläche ≤ T_Taupunkt**.

### Kritische Situationen in der HLK

| Situation                         | Risiko                                    | Massnahme                                  |
| --------------------------------- | ----------------------------------------- | ------------------------------------------ |
| Kühldecke (Kaltwasser)            | Kondenswasser tropft auf Boden/Equipment  | Taupunktwächter, VL-Temperatur > T_d + 2 K |
| Kaltwasserleitung ungedämmt       | Kondensation auf Rohrmantel, Schimmel     | Dampfdiffusionsdichte Dämmung              |
| Fensterscheibe (einf. Verglasung) | Kondensation innen bei kalter Aussentemp. | Mindest-U-Wert einhalten                   |
| Aussenluftdurchlässe              | Kalte Zuluft unter Taupunkt der Raumluft  | Vorwärmregister, Mischung                  |
| Kühlbalken (Induktionsgerät)      | Kondensation wenn Raumluft-RH zu hoch     | RH < 60 % sicherstellen                    |

## Taupunktwächter — GA-Integration

Ein **Taupunktwächter** misst Lufttemperatur und Luftfeuchte und berechnet den Taupunkt. Unterschreitet die Kühlwasser-Vorlauftemperatur den Taupunkt (minus Sicherheitsabstand), wird:

1. **Warnung ausgegeben** (Alarm in der GLT)
2. **Kühlwasser-Vorlauftemperatur erhöht** (via DDC-Regelung)
3. **Kühldecken gesperrt** bis Gefahr vorbei

### Typischer DDC-Regelkreis Kühldecke:

```
Taupunktsensor (T_d) ───────────────────────────────┐
                                                      ↓
Raumluft T + RH → Taupunkt-Berechnung → T_d + 2K = T_VL,min
                                                      ↓
T_VL,Ist ──── Vergleich ──── Falls T_VL,Ist < T_VL,min → Kühlventil schliessen / Alarm
```

**Sicherheitsabstand:** mindestens **+2 K** über Taupunkttemperatur, bei hoher Trägheit der Anlage **+3–5 K**.

## Bauteilkondensation (Bauhülle)

### Glaser-Verfahren (vereinfacht, EN ISO 13788)

Prüft ob in einem Bauteilquerschnitt Kondensation entsteht:

1. Temperaturverlauf durch Bauteil linear interpolieren (je nach Schichtdicke & λ-Wert)
2. Sättigungsdampfdruckverlauf je Schichtgrenze berechnen
3. Dampfdruckverlauf durch Bauteil (je nach μ-Wert der Schichten)
4. Unterschreitet p_D den p_D,s → Kondensation in dieser Schicht

**Wichtig für:**

- Wärmedämmung Aussenwand (Dampfsperre richtig platzieren)
- Flachdach
- Bodenkonstruktionen bei Kühlräumen

## Schimmelgefahr

Schimmel wächst ab φ ≥ 80 % an der Oberfläche (nicht der Raumluft). Kritisch:

- **Wärmebrücken** (Fensterrahmen, Rollladenkästen, Ecken): lokale Oberflächentemperatur weit unter Raumtemperatur
- **Diffusionsdicht** sanierte Gebäude ohne ausreichende Lüftung

**Mindest-Oberflächentemperatur** (Deutschland, EN ISO 13788): Temperaturfaktor f_Rsi ≥ 0,7

$$f_{Rsi} = \frac{T_{si} - T_e}{T_i - T_e} \geq 0{,}7$$

## Mollier-h,x-Diagramm

Das **h,x-Diagramm** (psychrometrisches Diagramm) stellt alle Luftzustände grafisch dar:

- x-Achse: Wassergehalt x [g/kg]
- y-Achse: Enthalpie h [kJ/kg]
- Isothermen, Isoenthalpen, φ-Kurven, Taupunktlinie (φ = 100 %)

Für den GA-Alltag reicht der **Taschenrechner** (Taupunkt-Rechner im GA-Tool), das Diagramm ist gut für das Verständnis von Zustandsänderungen (Erwärmen, Kühlen, Befeuchten, Entfeuchten).

## Praktische Werte für den Alltag

| Zustand                            | T [°C] | RH [%] | T_d [°C] |
| ---------------------------------- | ------ | ------ | -------- |
| Winterluft aussen (CH Mittelland)  | −2     | 85     | ~−4      |
| Raumluft Komfort Winter            | 20     | 45     | ~7,8     |
| Raumluft Komfort Sommer            | 24     | 55     | ~14,2    |
| Büro Sommer (warm)                 | 26     | 60     | ~17,6    |
| Kritisch für Kühldecke (CH Sommer) | 28     | 65     | ~20,7    |

## Normen

- **EN ISO 13788** — Wärme- und feuchtetechnisches Verhalten (Kondensation, Glaser)
- **DIN 4108-3** — Klimabedingter Feuchteschutz
- **SIA 180** (Schweiz) — Wärme- und Feuchteschutz im Hochbau
- **EN ISO 7730** — Raumklima-Komfortbedingungen (PMV/PPD)

<!-- EN -->

**Condensation** forms when a surface is cooler than the **dew point temperature** of the surrounding air. In BA, this is particularly relevant for **chilled ceilings**, **chilled beams**, **cold water pipes**, and cooling operation in general.

## Psychrometric Fundamentals

### Relative Humidity (RH)

Ratio of the actual water vapour partial pressure to the **saturation vapour pressure** at the same temperature:

$$\varphi = \frac{p_D}{p_{D,s}(T)} \cdot 100\%$$

- φ = 100 %: air is saturated, condensation begins
- φ = 50 %, 22 °C: typical room air comfort condition

### Saturation Vapour Pressure (Magnus Formula)

$$p_{D,s}(T) = 6{.}1078 \cdot e^{\frac{17{.}269 \cdot T}{237{.}3 + T}} \quad [\text{hPa}]$$

(simplified after Magnus, valid for 0–60 °C)

### Absolute Humidity

Water vapour mass per air volume [g/m³]:

$$a = \frac{216{.}7 \cdot p_{D,s}(T) \cdot \varphi}{T + 273{.}15}$$

### Moisture Content (Mixing Ratio)

Water vapour mass per dry air mass [g/kg]:

$$x = 0{.}622 \cdot \frac{p_{D,s}(T) \cdot \varphi}{p_{total} - p_{D,s}(T) \cdot \varphi}$$

## Dew Point Temperature

The **dew point temperature** T_d is the temperature at which air reaches saturation (φ = 100 %) at constant water vapour content.

### Approximation Formula (Magnus, valid for T > 0 °C):

$$T_d = \frac{237{.}3 \cdot \left(\ln\frac{\varphi}{100} + \frac{17{.}269 \cdot T}{237{.}3 + T}\right)}{17{.}269 - \left(\ln\frac{\varphi}{100} + \frac{17{.}269 \cdot T}{237{.}3 + T}\right)}$$

### Rule of Thumb (rough approximation):

$$T_d \approx T - \frac{100 - \varphi}{5}$$

**Examples:**

| T [°C] | φ [%] | T_d [°C] |
| ------ | ----- | -------- |
| 22     | 50    | ~11.1    |
| 26     | 60    | ~17.6    |
| 22     | 65    | ~15.0    |
| 28     | 70    | ~21.9    |

> ⚠️ **Summer office:** 26 °C / 60 % RH → dew point ~17.6 °C. Chilled ceiling supply temperature must stay **above** this value — otherwise the ceiling drips.

## Condensation on Surfaces

Condensation forms when **T_surface ≤ T_dew point**.

### Critical Situations in HVAC

| Situation                     | Risk                                     | Measure                                    |
| ----------------------------- | ---------------------------------------- | ------------------------------------------ |
| Chilled ceiling (cold water)  | Condensate drips onto floor/equipment    | Dew point monitor, supply temp > T_d + 2 K |
| Uninsulated cold water pipe   | Condensation on pipe jacket, mould       | Vapour-diffusion-tight insulation          |
| Window pane (single glazing)  | Internal condensation in cold weather    | Minimum U-value must be met                |
| Outdoor air diffusers         | Cold supply air below room air dew point | Pre-heat coil, mixing                      |
| Chilled beam (induction unit) | Condensation when room RH too high       | Ensure RH < 60 %                           |

## Dew Point Monitor — BA Integration

A **dew point monitor** measures air temperature and humidity and calculates the dew point. If the chilled water supply temperature drops below the dew point (minus safety margin):

1. **Warning issued** (alarm in BMS)
2. **Chilled water supply temperature raised** (via DDC control)
3. **Chilled ceilings disabled** until hazard has passed

### Typical DDC Control Loop — Chilled Ceiling:

```
Dew point sensor (T_d) ──────────────────────────────────┐
                                                           ↓
Room air T + RH → dew point calculation → T_d + 2 K = T_supply,min
                                                           ↓
T_supply,actual ─── comparison ─── if T_supply,actual < T_supply,min → close cooling valve / alarm
```

**Safety margin:** at least **+2 K** above dew point temperature; with high system inertia **+3–5 K**.

## Building Fabric Condensation

### Glaser Method (simplified, EN ISO 13788)

Checks whether condensation forms within a building component cross-section:

1. Interpolate temperature profile through component linearly (based on layer thickness and λ-value)
2. Calculate saturation vapour pressure at each layer boundary
3. Calculate vapour pressure profile through component (based on µ-value of layers)
4. If p_D drops below p_D,s → condensation in that layer

**Relevant for:**

- External wall thermal insulation (correct placement of vapour barrier)
- Flat roof
- Floor constructions in cold rooms

## Mould Risk

Mould grows from φ ≥ 80 % at the surface (not in the room air). Critical:

- **Thermal bridges** (window frames, roller blind boxes, corners): local surface temperature well below room temperature
- **Vapour-tight** renovations without adequate ventilation

**Minimum surface temperature** (Germany, EN ISO 13788): temperature factor f_Rsi ≥ 0.7

$$f_{Rsi} = \frac{T_{si} - T_e}{T_i - T_e} \geq 0{.}7$$

## Mollier h,x Diagram

The **h,x diagram** (psychrometric chart) represents all air states graphically:

- x-axis: moisture content x [g/kg]
- y-axis: enthalpy h [kJ/kg]
- Isotherms, isenthalpic lines, φ-curves, dew point line (φ = 100 %)

For everyday BA work, the **calculator** (dew point calculator in the GA tool) is sufficient; the diagram is useful for understanding state changes (heating, cooling, humidifying, dehumidifying).

## Practical Values for Daily Use

| State                                    | T [°C] | RH [%] | T_d [°C] |
| ---------------------------------------- | ------ | ------ | -------- |
| Winter outdoor air (CH Midlands)         | −2     | 85     | ~−4      |
| Room air comfort winter                  | 20     | 45     | ~7.8     |
| Room air comfort summer                  | 24     | 55     | ~14.2    |
| Office summer (warm)                     | 26     | 60     | ~17.6    |
| Critical for chilled ceiling (CH summer) | 28     | 65     | ~20.7    |

## Standards

- **EN ISO 13788** — Hygrothermal behaviour of building components (condensation, Glaser)
- **DIN 4108-3** — Climate-related moisture protection
- **SIA 180** (Switzerland) — Thermal and moisture protection in building construction
- **EN ISO 7730** — Indoor climate comfort conditions (PMV/PPD)
