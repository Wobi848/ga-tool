---
title: Lebenszykluskosten LCC — Investition, Betrieb, Unterhalt
title_en: Life Cycle Costs LCC — Investment, Operation and Maintenance
slug: lebenszyklus-lcc
category: wirtschaftlichkeit
subcategory: investition
tags:
  [
    lcc,
    lebenszykluskosten,
    lifecycle-cost,
    investition,
    betriebskosten,
    unterhaltskosten,
    kapitalkosten,
    energiekosten,
    instandhaltung,
    ersatz,
    gesamtkosten,
    tco,
    total-cost-of-ownership,
    barwert
  ]
difficulty: fortgeschritten
area: [ga, normen]
related: [amortisationsrechnung, ems-lastmanagement, en15232, energieausweis-kennzahlen]
norm: [ISO 15686-5, EN 60300-3-3, SIA 469, SIA 480, VDI 2067]
updated: 2026-10-14
lang: de
---

# Lebenszykluskosten LCC — Investition, Betrieb, Unterhalt

Lebenszykluskosten (LCC = Life Cycle Costs) betrachten die **Gesamtkosten über die gesamte Nutzungsdauer** einer Anlage — nicht nur die Investition. Eine teure, energieeffiziente Anlage kann günstiger sein als eine günstige, energiehungrige.

## Grundformel

<p class="formel">LCC = Investitionskosten + Barwert aller zukünftigen Kosten</p>

<p class="formel">Barwert = Σ K<sub>t</sub> / (1 + r)<sup>t</sup></p>

- r: Kalkulationszins (typisch 3–4 %)
- t: Jahr (1 bis Nutzungsdauer n)
- n: Nutzungsdauer (GA: 15–25 Jahre, Gebäude: 50 Jahre)

---

## Kostenkomponenten

### 1. Investitionskosten (einmalig)

**Hardware:**

- DDC-Controller, Sensoren, Aktoren, Schaltschränke
- Kabel, Kanäle, Montage

**Software / Engineering:**

- Programmierung, Parametrierung
- IBN-Aufwand

**Dokumentation:**

- DPL, Schemen, Funktionsbeschreibungen

### 2. Betriebskosten (jährlich wiederkehrend)

**Energie:**

- Pumpenenergie, Ventilatorenergie (stark von GA-Klasse abhängig!)
- Hilfsenergie DDC, GLT-Server

**Wartung und Unterhalt:**

- Wartungsvertrag GA: 1–3 % der Investitionskosten/Jahr
- Filter, Verschleissteile
- Kalibrierung Sensoren (alle 2–5 Jahre)

**Betrieb:**

- Personal (Betriebsführung, Bedienung)
- Softwarelizenzen (manche GLT-Systeme: jährliche Lizenzkosten!)

### 3. Ersatzkosten (periodisch)

**Typische Lebenserwartungen:**

- DDC-Controller: 15–20 Jahre
- Sensoren (PT1000): 10–20 Jahre
- Ventile, Aktoren: 10–15 Jahre
- GLT-Server (Hardware): 7–10 Jahre
- GLT-Software: 10–15 Jahre (Lifecycle-Ende)

- Jede Ersatzinvestition als Barwert berechnen

---

## Praxisbeispiel: Vergleich zwei Regelsysteme

|                        | Variante A, Klasse C | Variante B, Klasse A |
| ---------------------- | -------------------- | -------------------- |
| Investition            | 30'000 CHF           | 55'000 CHF           |
| Energiekosten pro Jahr | 22'000 CHF           | 15'000 CHF           |
| Wartung pro Jahr       | 1'000 CHF            | 1'500 CHF            |
| Ersatz nach 15 Jahren  | 15'000 CHF           | 20'000 CHF           |

Betrachtung 15 Jahre, Zins 4 %. Der Rentenbarwertfaktor ist (1 − 1.04<sup>−15</sup>) / 0.04 ≈ 11.12, der Abzinsungsfaktor für das Jahr 15 ist 1 / 1.04<sup>15</sup> ≈ 0'555.

<p class="formel">LCC<sub>A</sub> = 30'000 + 23'000 · 11.12 + 15'000 · 0'555 ≈ 294'100 CHF</p>

<p class="formel">LCC<sub>B</sub> = 55'000 + 16'500 · 11.12 + 20'000 · 0'555 ≈ 249'600 CHF</p>

Variante B ist über 15 Jahre rund 44'500 CHF günstiger, obwohl sie 25'000 CHF mehr kostet.

Der Ersatz im Jahr 15 ist hier eingerechnet, sein Nutzen danach aber nicht. Sauberer ist es, entweder den Ersatz wegzulassen oder einen Restwert am Ende abzuziehen. Am Ergebnis ändert das hier wenig.

---

## Sensitivitätsanalyse

LCC-Ergebnisse hängen stark von Annahmen ab:

**Parameter und Einfluss auf LCC:**

**Energiepreis steigt 3 %/Jahr:**

- Variante B wird noch attraktiver
- Jede kWh-Einsparung ist wertvoller

**Kalkulationszins höher (z.B. 6 %):**

- Zukünftige Einsparungen weniger wert
- Amortisation der Mehrinvestition dauert länger

**Nutzungsdauer nur 10 Jahre:**

- Höhere Investition amortisiert sich schlechter
- Standardsystem kann besser sein

- Worst-Case / Best-Case analysieren → Robustheitsprüfung

---

## LCC in Ausschreibungen

In der öffentlichen Beschaffung (Vergaberecht) können LCC als Zuschlagskriterium verwendet werden:

**Ausschreibungskriterien:**

- 40 % Preis (Angebotspreis)
- 30 % LCC (berechnet nach VDI 2067 oder EN 60300)
- 20 % Qualität / Technik
- 10 % Service / Referenzen

**LCC-Berechnung durch Bieter:**

- Grundlage: standardisierte Betriebszeiten, Energiepreise
- Bewertung: niedrigster LCC → höhere Punktzahl

---

## LCC-Software und Tools

**Tools für LCC-Berechnung:**

- Excel-Template (VDI 2067 Ansatz)
- LEGEP (Spezialsoftware für Gebäude, DE)
- Tally / OneClick LCA (Ökobilanz + Kosten)

**Vereinfachte Methode für GA:**

- Tabellenkalkulationen mit:
  - Investitionszeilen
  - Jährliche Kosten (Energie, Wartung)
  - Ersatzkosten mit Barwertfaktoren
  - Vergleich Varianten → Beste LCC wählen

---

## Normen

- **ISO 15686** — Gebäude und bauliche Anlagen: Nutzungsdauer-Planung
- **EN 60300-3-3** — Dependability management: LCC-Analyse
- **VDI 2067** — Wirtschaftlichkeitsberechnungen Gebäudetechnik
- **SIA 469** — Erhaltung von Bauwerken
- **SIA 480** — Wirtschaftlichkeitsrechnung für Investitionen im Hochbau

<!-- EN -->

Life cycle costs (LCC) consider the **total costs over the entire service life** of a system — not just the investment. An expensive, energy-efficient system can be cheaper than a cheap, energy-hungry one.

## Basic Formula

<p class="formel">LCC = Capital cost + Present value of all future costs</p>

<p class="formel">Present value = Σ C<sub>t</sub> / (1 + r)<sup>t</sup></p>

- r: discount rate (typically 3–4 %)
- t: year (1 to service life n)
- n: service life (BA: 15–25 years, building: 50 years)

---

## Cost Components

### 1. Capital Costs (one-off)

**Hardware:**

- DDC controllers, sensors, actuators, control panels
- Cables, conduit, installation

**Software / engineering:**

- Programming, configuration
- Commissioning effort

**Documentation:**

- DPL, diagrams, functional descriptions

### 2. Operating Costs (annually recurring)

**Energy:**

- Pump energy, fan energy (highly dependent on BA class!)
- Auxiliary energy DDC, BMS server

**Maintenance:**

- BA maintenance contract: 1–3 % of capital cost/year
- Filters, wear parts
- Sensor calibration (every 2–5 years)

**Operation:**

- Personnel (facility management, operation)
- Software licences (some BMS systems: annual licence fees!)

### 3. Replacement Costs (periodic)

**Typical service lives:**

- DDC controller: 15–20 years
- Sensors (PT1000): 10–20 years
- Valves, actuators: 10–15 years
- BMS server (hardware): 7–10 years
- BMS software: 10–15 years (end-of-life)

- Calculate each replacement investment as a present value

---

## Practical Example: Comparison of Two Control Systems

|                            | Option A, class C | Option B, class A |
| -------------------------- | ----------------- | ----------------- |
| Investment                 | CHF 30,000        | CHF 55,000        |
| Energy cost per year       | CHF 22,000        | CHF 15,000        |
| Maintenance per year       | CHF 1,000         | CHF 1,500         |
| Replacement after 15 years | CHF 15,000        | CHF 20,000        |

Period 15 years, interest 4 %. The annuity factor is (1 − 1.04<sup>−15</sup>) / 0.04 ≈ 11.12, the discount factor for year 15 is 1 / 1.04<sup>15</sup> ≈ 0.555.

<p class="formel">LCC<sub>A</sub> = 30,000 + 23,000 · 11.12 + 15,000 · 0.555 ≈ CHF 294,100</p>

<p class="formel">LCC<sub>B</sub> = 55,000 + 16,500 · 11.12 + 20,000 · 0.555 ≈ CHF 249,600</p>

Over 15 years option B is about CHF 44,500 cheaper, although it costs CHF 25,000 more.

The replacement in year 15 is included here, but its benefit afterwards is not. It is cleaner either to leave out the replacement or to deduct a residual value at the end. Here this changes the result little.

---

## Sensitivity Analysis

LCC results depend strongly on assumptions:

**Parameter influence on LCC:**

**Energy price rises 3 %/year:**

- Option B becomes even more attractive
- Every kWh saved is more valuable

**Higher discount rate (e.g. 6 %):**

- Future savings are worth less
- Payback on additional investment takes longer

**Service life only 10 years:**

- Higher investment amortises less well
- Standard system may be better

- Analyse worst-case / best-case → robustness check

---

## LCC in Procurement

In public procurement (tendering law) LCC can be used as an award criterion:

**Award criteria:**

- 40 % Price (tender price)
- 30 % LCC (calculated to VDI 2067 or EN 60300)
- 20 % Quality / technology
- 10 % Service / references

**LCC calculation by tenderer:**

- Basis: standardised operating hours, energy prices
- Scoring: lowest LCC → higher score

---

## LCC Software and Tools

**Tools for LCC calculation:**

- Excel template (VDI 2067 approach)
- LEGEP (specialist software for buildings, DE)
- Tally / OneClick LCA (life cycle assessment + costs)

**Simplified method for BA:**

- Spreadsheets with:
  - Capital cost rows
  - Annual costs (energy, maintenance)
  - Replacement costs with present value factors
  - Comparison of options → select best LCC

---

## Standards

- **ISO 15686** — Buildings and constructed assets: service life planning
- **EN 60300-3-3** — Dependability management: LCC analysis
- **VDI 2067** — Economic efficiency calculations for building services
- **SIA 469** — Maintenance of structures (maintenance planning)
