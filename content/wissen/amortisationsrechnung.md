---
title: Amortisationsrechnung GA-Massnahmen
title_en: Payback Calculation for BA Measures
slug: amortisationsrechnung
category: wirtschaftlichkeit
subcategory: investition
tags:
  [
    amortisation,
    wirtschaftlichkeit,
    investitionsrechnung,
    payback,
    roi,
    energieeinsparung,
    ga-massnahmen,
    kosten-nutzen,
    kapitalwert,
    npv,
    annuitäten,
    lebenszykluskosten,
    lcc,
    investition
  ]
difficulty: grundlagen
area: [ga, normen]
related: [ems-lastmanagement, en15232, energieausweis-kennzahlen, lebenszyklus-lcc]
norm: [VDI 2067, SIA 480, EN ISO 52120-1, ISO 50001]
updated: 2026-10-14
lang: de
---

# Amortisationsrechnung GA-Massnahmen

Jede GA-Investition braucht eine Wirtschaftlichkeitsrechnung. Sie begründet das Budget und zeigt, ob sich eine Massnahme lohnt.

## Einfache Amortisation (Payback)

<p class="formel">Amortisationszeit [a] = Investition [CHF] / jährliche Einsparung [CHF/a]</p>

**Beispiel Präsenzsteuerung der Beleuchtung:**

| Grösse                 | Wert                       |
| ---------------------- | -------------------------- |
| Investition            | 15'000 CHF                 |
| Energieeinsparung      | 3'000 CHF/a                |
| tiefere Betriebskosten | 500 CHF/a                  |
| Einsparung total       | 3'500 CHF/a                |
| Amortisationszeit      | 15'000 / 3'500 ≈ 4.3 Jahre |

**Faustregel:** Unter 5 Jahren wird eine Massnahme meist bewilligt, über 10 Jahre selten. Die einfache Amortisation übersieht aber, was nach der Amortisation passiert, und vergleicht Massnahmen mit verschiedener Lebensdauer schlecht. Dafür gibt es die Kapitalwertmethode.

## Grobe Erfahrungswerte

Die folgenden Werte sind grobe Richtwerte. Sie hängen stark vom Ausgangszustand, von den Energiepreisen und von der Nutzung ab und ersetzen keine Rechnung im Einzelfall.

| Massnahme                                  | Amortisation, grob                     |
| ------------------------------------------ | -------------------------------------- |
| Zeitprogramme und Sollwerte optimieren     | oft unter 1 Jahr, fast nur Arbeitszeit |
| Präsenzsteuerung Beleuchtung               | 2–5 Jahre                              |
| Nachtauskühlung als Softwarefunktion       | 1–3 Jahre                              |
| Hydraulischer Abgleich                     | 2–5 Jahre                              |
| Frequenzumrichter an Pumpe oder Ventilator | 2–5 Jahre                              |
| GLT-Nachrüstung im Bestand                 | 3–8 Jahre                              |

## Kapitalwertmethode

Der Kapitalwert berücksichtigt, dass künftige Einsparungen heute weniger wert sind:

<p class="formel">K<sub>0</sub> = −I<sub>0</sub> + Σ E<sub>t</sub> / (1 + i)<sup>t</sup></p>

I₀ Investition heute, E_t Einsparung im Jahr t, i Kalkulationszinssatz, t von 1 bis n Jahre. Ist K₀ grösser als null, lohnt sich die Investition.

Bei gleichbleibender Einsparung E vereinfacht sich die Summe mit dem Rentenbarwertfaktor:

<p class="formel">K<sub>0</sub> = −I<sub>0</sub> + E · (1 − (1 + i)<sup>−n</sup>) / i</p>

**Beispiel:** Investition 20'000 CHF, Einsparung 5'000 CHF/a, Zins 4 %, Betrachtung 10 Jahre:

<p class="formel">K<sub>0</sub> = −20'000 + 5'000 · 8.11 ≈ +20'550 CHF</p>

Die Massnahme lohnt sich deutlich. Der Betrachtungszeitraum sollte die Lebensdauer der Massnahme nicht übersteigen. Software und Elektronik halten oft 10 bis 15 Jahre, Leitungen und Feldgeräte länger.

## Einsparpotenzial nach EN ISO 52120-1

Die Norm, früher EN 15232, gibt **GA-Effizienzfaktoren f_BAC** je GA-Klasse an. Klasse C ist die Referenz mit f = 1. Für Bürogebäude:

| Klasse | f_BAC thermisch | f_BAC elektrisch |
| ------ | --------------- | ---------------- |
| A      | 0.70            | 0.87             |
| B      | 0.80            | 0.93             |
| C      | 1.00            | 1.00             |
| D      | 1.51            | 1.10             |

Die Einsparung von Klasse C auf B beim Wärmebedarf ist dann 1 − 0.80 = 20 %. Von D auf B ist es 1 − 0.80/1.51 ≈ 47 %. Die Faktoren werden **geteilt**, nicht die Prozente addiert.

**Beispiel:** Bürogebäude, Heizkosten 15'000 CHF/a in Klasse C. Ein Upgrade auf B spart rechnerisch 20 %, also 3'000 CHF/a. Bei 30'000 CHF Investition sind das 10 Jahre.

Die Faktoren sind Mittelwerte aus Simulationen. Im Einzelfall kann die Einsparung deutlich grösser oder kleiner sein. Für andere Gebäudetypen gibt die Norm eigene Werte an.

## Förderbeiträge

In der Schweiz fördern Bund und Kantone über das **Gebäudeprogramm** vor allem Hülle und Heizungsersatz. Für GA-Massnahmen und Betriebsoptimierung gibt es je nach Kanton und Energieversorger eigene Programme. Die aktuellen Bedingungen stehen auf den Seiten der Kantone und auf energiefranken.ch.

<p class="formel">Investition netto = Investition brutto − Förderbeitrag</p>

**Beispiel:** 20'000 CHF brutto, 25 % Förderung, also 15'000 CHF netto. Bei 4'000 CHF/a Einsparung sinkt die Amortisation von 5 auf rund 3.8 Jahre.

## CO₂-Abgabe

Die CO₂-Abgabe auf fossile Brennstoffe beträgt in der Schweiz **120 CHF pro Tonne CO₂**. Sie verbessert die Wirtschaftlichkeit von Massnahmen, die Öl oder Gas sparen.

**Beispiel:** Eine Ölheizung braucht 9'500 Liter Heizöl pro Jahr. Ein Liter erzeugt rund 2.65 kg CO₂:

<p class="formel">9'500 l · 2.65 kg/l ≈ 25 t CO₂ &nbsp; → &nbsp; 25 t · 120 CHF/t ≈ 3'000 CHF/a</p>

Diese 3'000 CHF entfallen ganz, wenn die Ölheizung durch eine Wärmepumpe ersetzt wird, und zu einem Teil, wenn die GA den Verbrauch senkt.

## Normen

- **VDI 2067** — Wirtschaftlichkeit gebäudetechnischer Anlagen
- **SIA 480** — Wirtschaftlichkeitsrechnung für Investitionen im Hochbau
- **EN ISO 52120-1** — Einfluss der GA auf die Energieeffizienz, Faktoren f_BAC
- **ISO 50001** — Energiemanagementsysteme

<!-- EN -->

Every BA investment needs an economic assessment. It justifies the budget and shows whether a measure pays off.

## Simple Payback

<p class="formel">Payback period [a] = investment [CHF] / annual saving [CHF/a]</p>

**Example: presence control for lighting:**

| Quantity              | Value                      |
| --------------------- | -------------------------- |
| Investment            | 15,000 CHF                 |
| Energy saving         | 3,000 CHF/a                |
| Lower operating costs | 500 CHF/a                  |
| Total saving          | 3,500 CHF/a                |
| Payback period        | 15,000 / 3,500 ≈ 4.3 years |

**Rule of thumb:** below 5 years a measure is usually approved, above 10 years rarely. Simple payback, however, ignores what happens after payback and compares measures with different lifetimes poorly. The net present value method addresses that.

## Rough Experience Values

The following values are rough guides. They depend heavily on the starting point, energy prices and use, and do not replace a calculation for the specific case.

| Measure                              | Payback, rough                          |
| ------------------------------------ | --------------------------------------- |
| Optimise schedules and setpoints     | often under 1 year, mostly working time |
| Presence control for lighting        | 2–5 years                               |
| Night purge as a software function   | 1–3 years                               |
| Hydraulic balancing                  | 2–5 years                               |
| Variable speed drive on pump or fan  | 2–5 years                               |
| BMS retrofit in an existing building | 3–8 years                               |

## Net Present Value

The net present value takes into account that future savings are worth less today:

<p class="formel">NPV = −I<sub>0</sub> + Σ E<sub>t</sub> / (1 + i)<sup>t</sup></p>

I₀ investment today, E_t saving in year t, i discount rate, t from 1 to n years. If NPV is greater than zero, the investment pays off.

With a constant saving E the sum simplifies with the annuity factor:

<p class="formel">NPV = −I<sub>0</sub> + E · (1 − (1 + i)<sup>−n</sup>) / i</p>

**Example:** investment 20,000 CHF, saving 5,000 CHF/a, interest 4 %, period 10 years:

<p class="formel">NPV = −20,000 + 5,000 · 8.11 ≈ +20,550 CHF</p>

The measure clearly pays off. The period considered should not exceed the lifetime of the measure. Software and electronics often last 10 to 15 years, cabling and field devices longer.

## Savings Potential per EN ISO 52120-1

The standard, formerly EN 15232, gives **BAC efficiency factors f_BAC** per BA class. Class C is the reference with f = 1. For office buildings:

| Class | f_BAC thermal | f_BAC electrical |
| ----- | ------------- | ---------------- |
| A     | 0.70          | 0.87             |
| B     | 0.80          | 0.93             |
| C     | 1.00          | 1.00             |
| D     | 1.51          | 1.10             |

The saving from class C to B in heat demand is then 1 − 0.80 = 20 %. From D to B it is 1 − 0.80/1.51 ≈ 47 %. The factors are **divided**, the percentages are not added.

**Example:** office building, heating costs 15,000 CHF/a in class C. An upgrade to B saves 20 % on paper, i.e. 3,000 CHF/a. With an investment of 30,000 CHF that is 10 years.

The factors are averages from simulations. In a specific case the saving can be considerably larger or smaller. The standard gives separate values for other building types.

## Subsidies

In Switzerland the federal government and cantons fund mainly the envelope and heating replacement through the **Buildings Programme**. For BA measures and operational optimisation, separate programmes exist depending on canton and utility. Current conditions are on the cantonal websites and energiefranken.ch.

<p class="formel">Net investment = gross investment − subsidy</p>

**Example:** 20,000 CHF gross, 25 % subsidy, i.e. 15,000 CHF net. With a saving of 4,000 CHF/a the payback drops from 5 to about 3.8 years.

## CO₂ Levy

The CO₂ levy on fossil fuels in Switzerland is **120 CHF per tonne of CO₂**. It improves the economics of measures that save oil or gas.

**Example:** an oil heating system uses 9,500 litres of heating oil per year. One litre produces about 2.65 kg of CO₂:

<p class="formel">9,500 l · 2.65 kg/l ≈ 25 t CO₂ &nbsp; → &nbsp; 25 t · 120 CHF/t ≈ 3,000 CHF/a</p>

These 3,000 CHF disappear entirely if the oil heating is replaced by a heat pump, and partly if the BA reduces consumption.

## Standards

- **VDI 2067** — Economic efficiency of building installations
- **SIA 480** — Economic calculation for investments in building construction
- **EN ISO 52120-1** — Contribution of BA to energy performance, factors f_BAC
- **ISO 50001** — Energy management systems
