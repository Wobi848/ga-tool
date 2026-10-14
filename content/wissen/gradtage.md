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
updated: 2026-10-14
lang: de
---

# Gradtage und Gradtagzahlen

Gradtage sind ein einfaches Mass dafür, wie kalt ein Winter war. Mit ihnen lässt sich der Heizenergieverbrauch verschiedener Jahre oder Standorte vergleichen, ohne dass ein milder oder strenger Winter das Bild verzerrt.

## Definition

In der Schweiz sind die **Heizgradtage HGT 20/12** üblich:

<p class="formel">HGT<sub>20/12</sub> = Σ (20 °C − θ<sub>m</sub>) &nbsp; für alle Tage mit θ<sub>m</sub> &lt; 12 °C</p>

θ_m ist das Tagesmittel der Aussentemperatur. 20 °C steht für die Raumtemperatur, 12 °C für die Heizgrenze: Ist es im Tagesmittel wärmer, wird angenommen, dass nicht geheizt wird. Die Einheit ist Kelvin mal Tage, **Kd**.

Andere Länder rechnen anders:

| Bezeichnung                 | Raum    | Heizgrenze | Verwendung                                |
| --------------------------- | ------- | ---------- | ----------------------------------------- |
| **HGT 20/12**               | 20 °C   | 12 °C      | Schweiz                                   |
| **Gradtagzahl G 20/15**     | 20 °C   | 15 °C      | Deutschland, VDI 3807                     |
| **Heizgradtage G 15**       | 15 °C   | 15 °C      | Deutschland, nur Differenz zur Heizgrenze |
| **HDD nach EN ISO 15927-6** | wählbar | wählbar    | international                             |

Werte mit verschiedenen Definitionen lassen sich nicht direkt vergleichen. Immer angeben, welche Definition gemeint ist.

**Grössenordnung:** Für Zürich ergibt HGT 20/12 im langjährigen Mittel rund 3300 Kd. Orte im Tessin liegen deutlich tiefer, Bergorte deutlich höher. Die aktuellen Monats- und Jahreswerte der Messstationen veröffentlicht **MeteoSchweiz**.

## Anwendungen

### Jahresverbrauch grob abschätzen

<p class="formel">Q<sub>a</sub> ≈ Φ<sub>H</sub> · HGT · 24 h / (θ<sub>i</sub> − θ<sub>e</sub>)</p>

Φ_H ist die Norm-Heizlast, θ_i die Raumtemperatur, θ_e die Auslegungs-Aussentemperatur.

**Beispiel:** 15 kW Heizlast, θ_i = 20 °C, θ_e = −8 °C, HGT = 3300 Kd:

<p class="formel">Q<sub>a</sub> ≈ 15 kW · 3300 Kd · 24 h / 28 K ≈ 42'000 kWh</p>

Das ist eine obere Abschätzung. Interne Wärme und Sonne senken den Bedarf, und die Heizlast enthält oft Zuschläge. Für Warmwasser kommt ein eigener Anteil dazu.

### Witterungsbereinigung

Nur der **heizungsabhängige** Teil des Verbrauchs wird bereinigt, nicht Warmwasser oder Prozesswärme:

<p class="formel">Q<sub>bereinigt</sub> = Q<sub>gemessen</sub> · HGT<sub>Referenz</sub> / HGT<sub>Ist</sub></p>

**Beispiel:** Gemessen 45'000 kWh Heizung in einem Jahr mit 3600 Kd. Referenz ist das langjährige Mittel mit 3300 Kd:

<p class="formel">Q<sub>bereinigt</sub> = 45'000 · 3300 / 3600 ≈ 41'300 kWh</p>

Das Jahr war kälter als normal, deshalb liegt der bereinigte Wert tiefer. Ob das Gebäude effizienter geworden ist, zeigt erst der Vergleich mit dem bereinigten Wert des Vorjahrs.

### Energie-Signatur

Genauer als der Jahresvergleich ist die **Energie-Signatur**: Tages- oder Wochenverbrauch über der mittleren Aussentemperatur auftragen. Die Punkte liegen bei einem gut funktionierenden Gebäude auf einer Geraden. Steigung, Heizgrenze und Streuung zeigen Änderungen und Fehler, etwa eine Heizung, die im Sommer läuft.

## Kühlgradtage

Analog für Kühlung:

<p class="formel">KGT = Σ (θ<sub>m</sub> − θ<sub>Grenz</sub>) &nbsp; für alle Tage mit θ<sub>m</sub> &gt; θ<sub>Grenz</sub></p>

Die Grenztemperatur ist nicht einheitlich, oft 18 °C. Kühlgradtage taugen als grober Vergleich zwischen Jahren, bilden aber Sonne und interne Lasten nicht ab, die bei Bürogebäuden den Kühlbedarf dominieren.

## Klimawandel

Die Heizgradtage nehmen in der Schweiz seit Jahrzehnten ab, die Kühlgradtage zu. Für die Witterungsbereinigung sollte deshalb eine aktuelle Normperiode als Referenz dienen, heute 1991–2020. Auslegungen mit alten Klimadaten überschätzen den Heizbedarf und unterschätzen das Überhitzungsrisiko im Sommer.

## In der DDC berechnen

1. Tagesmittel der Aussentemperatur aus dem Trend berechnen, zum Beispiel aus Stundenwerten.
2. Nach Mitternacht: Liegt das Tagesmittel unter 12 °C, (20 − θ_m) zum Monats- und Jahreszähler addieren, sonst nichts.
3. Zähler monatlich und jährlich speichern und zurücksetzen.

Damit lässt sich der Verbrauch laufend witterungsbereinigt darstellen, und eine Meldung kann kommen, wenn der bereinigte Verbrauch deutlich über dem Vorjahr liegt.

Ein Aussenfühler, der in der Sonne hängt, verfälscht die Gradtage. Für das Energiecontrolling sind Werte einer nahen MeteoSchweiz-Station oft zuverlässiger.

## Quellen

- **MeteoSchweiz** — Heizgradtage und Klimanormwerte der Messstationen
- **SIA 2028** — Klimadaten für Bauphysik, Energie- und Gebäudetechnik
- **VDI 3807-1** — Verbrauchskennwerte für Gebäude, Gradtagzahlen (DE)
- **EN ISO 15927-6** — Wärme- und feuchtetechnisches Verhalten von Gebäuden, Berechnung der Gradtage

<!-- EN -->

Degree days are a simple measure of how cold a winter was. They allow heating energy use to be compared between years or locations without a mild or harsh winter distorting the picture.

## Definition

In Switzerland **heating degree days HGT 20/12** are common:

<p class="formel">HGT<sub>20/12</sub> = Σ (20 °C − θ<sub>m</sub>) &nbsp; for all days with θ<sub>m</sub> &lt; 12 °C</p>

θ_m is the daily mean outdoor temperature. 20 °C stands for room temperature, 12 °C for the heating limit: if the daily mean is warmer, it is assumed that no heating takes place. The unit is kelvin times days, **Kd**.

Other countries calculate differently:

| Name                       | Room       | Heating limit | Use                                           |
| -------------------------- | ---------- | ------------- | --------------------------------------------- |
| **HGT 20/12**              | 20 °C      | 12 °C         | Switzerland                                   |
| **Gradtagzahl G 20/15**    | 20 °C      | 15 °C         | Germany, VDI 3807                             |
| **Heizgradtage G 15**      | 15 °C      | 15 °C         | Germany, only difference to the heating limit |
| **HDD per EN ISO 15927-6** | selectable | selectable    | international                                 |

Values with different definitions cannot be compared directly. Always state which definition is meant.

**Order of magnitude:** for Zurich, HGT 20/12 is about 3300 Kd in the long-term mean. Places in Ticino are clearly lower, mountain locations clearly higher. Current monthly and annual values for the stations are published by **MeteoSwiss**.

## Applications

### Rough Estimate of Annual Consumption

<p class="formel">Q<sub>a</sub> ≈ Φ<sub>H</sub> · HGT · 24 h / (θ<sub>i</sub> − θ<sub>e</sub>)</p>

Φ_H is the design heat load, θ_i the room temperature, θ_e the design outdoor temperature.

**Example:** 15 kW heat load, θ_i = 20 °C, θ_e = −8 °C, HGT = 3300 Kd:

<p class="formel">Q<sub>a</sub> ≈ 15 kW · 3300 Kd · 24 h / 28 K ≈ 42,000 kWh</p>

This is an upper estimate. Internal and solar gains reduce the demand, and the heat load often includes margins. Domestic hot water comes on top.

### Weather Correction

Only the **weather-dependent** part of consumption is corrected, not hot water or process heat:

<p class="formel">Q<sub>corrected</sub> = Q<sub>measured</sub> · HGT<sub>reference</sub> / HGT<sub>actual</sub></p>

**Example:** measured 45,000 kWh for heating in a year with 3600 Kd. The reference is the long-term mean of 3300 Kd:

<p class="formel">Q<sub>corrected</sub> = 45,000 · 3300 / 3600 ≈ 41,300 kWh</p>

The year was colder than normal, so the corrected value is lower. Whether the building has become more efficient only shows when compared with the corrected value of the previous year.

### Energy Signature

More precise than the annual comparison is the **energy signature**: plot daily or weekly consumption against mean outdoor temperature. For a well-functioning building the points lie on a straight line. Slope, heating limit and scatter reveal changes and faults, such as heating running in summer.

## Cooling Degree Days

Analogous for cooling:

<p class="formel">CDD = Σ (θ<sub>m</sub> − θ<sub>limit</sub>) &nbsp; for all days with θ<sub>m</sub> &gt; θ<sub>limit</sub></p>

The limit is not standardised, often 18 °C. Cooling degree days work as a rough comparison between years but do not reflect solar and internal loads, which dominate cooling demand in office buildings.

## Climate Change

Heating degree days in Switzerland have been falling for decades, cooling degree days rising. For weather correction a current climate normal period should therefore serve as reference, today 1991–2020. Designs using old climate data overestimate heating demand and underestimate the risk of summer overheating.

## Calculating in the DDC

1. Calculate the daily mean outdoor temperature from the trend, for example from hourly values.
2. After midnight: if the daily mean is below 12 °C, add (20 − θ_m) to the monthly and annual counters, otherwise nothing.
3. Store and reset the counters monthly and annually.

This allows consumption to be shown continuously weather-corrected, and a message can be raised when the corrected consumption is clearly above the previous year.

An outdoor sensor that hangs in the sun distorts the degree days. For energy monitoring, values from a nearby MeteoSwiss station are often more reliable.

## Sources

- **MeteoSwiss** — heating degree days and climate normals for the stations
- **SIA 2028** — Climate data for building physics, energy and building services
- **VDI 3807-1** — Consumption benchmarks for buildings, degree days (DE)
- **EN ISO 15927-6** — Hygrothermal performance of buildings, calculation of degree days
