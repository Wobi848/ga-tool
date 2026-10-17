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
related: [pid-regler, heizkurve, luftfeuchtigkeit, klimasysteme]
norm: [EN ISO 13788, DIN 4108-3, SIA 180]
updated: 2026-10-17
lang: de
---

# Taupunkt & Bauteilkondensation

**Kondensation** entsteht, wenn eine Oberfläche kühler ist als die **Taupunkttemperatur** der umgebenden Luft. In der GA ist dies besonders relevant bei **Kühldecken**, **Kühlbalken**, **Kaltwasserleitungen** und im **Kühlbetrieb** allgemein.

## Psychrometrische Grundbegriffe

### Relative Feuchte (RH)

Verhältnis des tatsächlichen Wasserdampfpartialdrucks zum **Sättigungsdampfdruck** bei gleicher Temperatur:

<p class="formel">φ = p<sub>D</sub> / p<sub>D,s</sub>(T) · 100 %</p>

- φ = 100 %: Luft ist gesättigt, Kondensation beginnt
- φ = 50 %, 22 °C: typische Raumluft-Komfortbedingung

### Sättigungsdampfdruck (Magnus-Formel)

<p class="formel">p<sub>D,s</sub>(T) = 6.1078 · e<sup>17.269·T / (237.3 + T)</sup>   [hPa]</p>

(vereinfacht nach Magnus, gültig für 0–60 °C)

### Absolute Feuchte

Wasserdampfmasse pro Luftvolumen [g/m³]:

<p class="formel">a = 216.7 · p<sub>D,s</sub>(T) · φ / (T + 273.15)</p>

### Wassergehalt (Mischungsverhältnis)

Wasserdampfmasse pro Trockenlufmasse [g/kg]:

<p class="formel">x = 0.622 · p<sub>D,s</sub>(T)·φ / (p<sub>ges</sub> − p<sub>D,s</sub>(T)·φ)</p>

## Taupunkttemperatur

Die **Taupunkttemperatur** T_d ist jene Temperatur, bei der die Luft bei konstantem Wasserdampfgehalt den Sättigungszustand (φ = 100 %) erreicht.

### Näherungsformel (Magnus, gültig für T > 0 °C):

<p class="formel">T<sub>d</sub> = 237.3 · γ / (17.269 − γ)   mit   γ = ln(φ/100) + 17.269 · T / (237.3 + T)</p>

### Faustformel (grobe Näherung):

<p class="formel">T<sub>d</sub> ≈ T − (100 − φ) / 5</p>

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
| Fensterscheibe (einf. Verglasung) | Kondensation innen bei kalter Aussentemp. | Verglasung mit gutem U-Wert, Lüften        |
| Aussenluftdurchlässe              | Kalte Zuluft unter Taupunkt der Raumluft  | Vorwärmregister, Mischung                  |
| Kühlbalken (Induktionsgerät)      | Kondensation wenn Raumluft-RH zu hoch     | RH < 60 % sicherstellen                    |

## Taupunktwächter — GA-Integration

Ein **Taupunktwächter** misst Lufttemperatur und Luftfeuchte und berechnet den Taupunkt. Unterschreitet die Kühlwasser-Vorlauftemperatur den Taupunkt (minus Sicherheitsabstand), wird:

1. **Warnung ausgegeben** (Alarm in der GLT)
2. **Kühlwasser-Vorlauftemperatur erhöht** (via DDC-Regelung)
3. **Kühldecken gesperrt** bis Gefahr vorbei

### Typischer DDC-Regelkreis Kühldecke:

- Der Fühler misst Raumlufttemperatur und Feuchte, die DDC rechnet den Taupunkt.
- Mindest-Vorlauftemperatur = Taupunkt + Sicherheitsabstand.
- Liegt der Vorlauf darunter: Kühlventil schliessen oder Vorlauf anheben, Alarm.

**Sicherheitsabstand:** mindestens **+2 K** über Taupunkttemperatur, bei hoher Trägheit der Anlage **+3–5 K**.

### Vier Strategien bei Kühldecken

| Strategie                                   | Wie                                                                                  | Vor- und Nachteil                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| **Vorlauf nach Aussenluft-Taupunkt**        | zentraler Kühlvorlauf folgt dem Taupunkt aussen, der Abluft oder eines Referenzraums | günstig, aber grosse Sicherheitsreserve, weniger Kühlleistung |
| **Kondensationswächter pro Raum (Ein/Aus)** | Wächter am kältesten Punkt, beim Kaltwassereintritt, sperrt die Decke                | günstig, aber der Raum wird dann gar nicht mehr gekühlt       |
| **Zentral nach dem kritischen Raum**        | der Raum mit dem höchsten Taupunkt bestimmt den zentralen Vorlauf                    | gut, braucht eine Beimisch- oder Einspritzschaltung           |
| **Lokal pro Raum**                          | jeder Raum hebt seinen Vorlauf selbst über seinen Taupunkt                           | beste Kühlleistung, aufwendigste Hydraulik                    |

Bei Decken mit feuchteempfindlicher Oberfläche reicht ein reiner Ein/Aus-Wächter nicht. Mehr zu den Systemen in [Klimasysteme](/wissen/klimasysteme).

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

<p class="formel">f<sub>Rsi</sub> = (T<sub>si</sub> − T<sub>e</sub>) / (T<sub>i</sub> − T<sub>e</sub>) ≥ 0.7</p>

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

<p class="formel">φ = p<sub>D</sub> / p<sub>D,s</sub>(T) · 100 %</p>

- φ = 100 %: air is saturated, condensation begins
- φ = 50 %, 22 °C: typical room air comfort condition

### Saturation Vapour Pressure (Magnus Formula)

<p class="formel">p<sub>D,s</sub>(T) = 6.1078 · e<sup>17.269·T / (237.3 + T)</sup>   [hPa]</p>

(simplified after Magnus, valid for 0–60 °C)

### Absolute Humidity

Water vapour mass per air volume [g/m³]:

<p class="formel">a = 216.7 · p<sub>D,s</sub>(T) · φ / (T + 273.15)</p>

### Moisture Content (Mixing Ratio)

Water vapour mass per dry air mass [g/kg]:

<p class="formel">x = 0.622 · p<sub>D,s</sub>(T)·φ / (p<sub>total</sub> − p<sub>D,s</sub>(T)·φ)</p>

## Dew Point Temperature

The **dew point temperature** T_d is the temperature at which air reaches saturation (φ = 100 %) at constant water vapour content.

### Approximation Formula (Magnus, valid for T > 0 °C):

<p class="formel">T<sub>d</sub> = 237.3 · γ / (17.269 − γ)   with   γ = ln(φ/100) + 17.269 · T / (237.3 + T)</p>

### Rule of Thumb (rough approximation):

<p class="formel">T<sub>d</sub> ≈ T − (100 − φ) / 5</p>

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

- The sensor measures room air temperature and humidity; the DDC calculates the dew point.
- Minimum flow temperature = dew point + safety margin.
- If the flow is below that: close the cooling valve or raise the flow temperature, alarm.

**Safety margin:** at least **+2 K** above dew point temperature; with high system inertia **+3–5 K**.

### Four Strategies for Chilled Ceilings

| Strategy                                   | How                                                                                              | Pros and cons                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| **Flow by outdoor dew point**              | central chilled water flow follows the dew point outdoors, of the extract or of a reference room | cheap, but a large safety margin, less cooling output |
| **Condensation monitor per room (on/off)** | monitor at the coldest point, at the chilled water inlet, blocks the ceiling                     | cheap, but the room is then not cooled at all         |
| **Central by the critical room**           | the room with the highest dew point sets the central flow                                        | good, needs a mixing or injection circuit             |
| **Local per room**                         | each room raises its own flow above its dew point                                                | best cooling output, most complex hydraulics          |

For ceilings with a moisture-sensitive surface a pure on/off monitor is not enough. More on the systems in [Air-Conditioning Systems](/wissen/klimasysteme).

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

<p class="formel">f<sub>Rsi</sub> = (T<sub>si</sub> − T<sub>e</sub>) / (T<sub>i</sub> − T<sub>e</sub>) ≥ 0.7</p>

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
