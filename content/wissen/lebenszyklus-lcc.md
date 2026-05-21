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
norm: [ISO 15686, EN 60300-3-3, SIA 469, VDI 2067]
updated: 2026-05-15
lang: de
---

# Lebenszykluskosten LCC — Investition, Betrieb, Unterhalt

Lebenszykluskosten (LCC = Life Cycle Costs) betrachten die **Gesamtkosten über die gesamte Nutzungsdauer** einer Anlage — nicht nur die Investition. Eine teure, energieeffiziente Anlage kann günstiger sein als eine günstige, energiehungrige.

## Grundformel

```
LCC = Investitionskosten + Barwert aller zukünftigen Kosten

Barwert = Σ (Jährliche Kosten_t / (1+r)^t)

r: Kalkulationszins (typisch 3–4 %)
t: Jahr (1 bis Nutzungsdauer n)
n: Nutzungsdauer (GA: 15–25 Jahre, Gebäude: 50 Jahre)
```

---

## Kostenkomponenten

### 1. Investitionskosten (einmalig)

```
Hardware:
  DDC-Controller, Sensoren, Aktoren, Schaltschränke
  Kabel, Kanäle, Montage

Software / Engineering:
  Programmierung, Parametrierung
  IBN-Aufwand

Dokumentation:
  DPL, Schemen, Funktionsbeschreibungen
```

### 2. Betriebskosten (jährlich wiederkehrend)

```
Energie:
  Pumpenenergie, Ventilatorenergie (stark von GA-Klasse abhängig!)
  Hilfsenergie DDC, GLT-Server

Wartung und Unterhalt:
  Wartungsvertrag GA: 1–3 % der Investitionskosten/Jahr
  Filter, Verschleissteile
  Kalibrierung Sensoren (alle 2–5 Jahre)

Betrieb:
  Personal (Betriebsführung, Bedienung)
  Softwarelizenzen (manche GLT-Systeme: jährliche Lizenzkosten!)
```

### 3. Ersatzkosten (periodisch)

```
Typische Lebenserwartungen:
  DDC-Controller: 15–20 Jahre
  Sensoren (PT1000): 10–20 Jahre
  Ventile, Aktoren: 10–15 Jahre
  GLT-Server (Hardware): 7–10 Jahre
  GLT-Software: 10–15 Jahre (Lifecycle-Ende)

→ Jede Ersatzinvestition als Barwert berechnen
```

---

## Praxisbeispiel: Vergleich zwei Regelsysteme

```
Variante A: Einfaches System (Klasse C, EN 15232)
  Investition:              30.000 CHF
  Energiekosten/Jahr:       22.000 CHF
  Wartung/Jahr:              1.000 CHF
  Ersatz nach 15 Jahren:    15.000 CHF

Variante B: Intelligentes System (Klasse A, EN 15232)
  Investition:              55.000 CHF (+ 25.000 CHF)
  Energiekosten/Jahr:       15.000 CHF (−7.000 CHF/a = −32 %)
  Wartung/Jahr:              1.500 CHF
  Ersatz nach 15 Jahren:    20.000 CHF

LCC-Berechnung (15 Jahre, 4 % Zins):
  Annuitätenfaktor 15 J / 4 %: 11.12
  Barwert Ersatz 15 J: 1 / 1.04^15 = 0.555

Variante A:
  LCC = 30.000 + (22.000 + 1.000) × 11.12 + 15.000 × 0.555
  LCC = 30.000 + 255.760 + 8.325 = 294.085 CHF

Variante B:
  LCC = 55.000 + (15.000 + 1.500) × 11.12 + 20.000 × 0.555
  LCC = 55.000 + 183.480 + 11.100 = 249.580 CHF

→ Variante B ist über 15 Jahre 44.500 CHF günstiger!
```

---

## Sensitivitätsanalyse

LCC-Ergebnisse hängen stark von Annahmen ab:

```
Parameter und Einfluss auf LCC:

Energiepreis steigt 3 %/Jahr:
  → Variante B wird noch attraktiver
  → Jede kWh-Einsparung ist wertvoller

Kalkulationszins höher (z.B. 6 %):
  → Zukünftige Einsparungen weniger wert
  → Amortisation der Mehrinvestition dauert länger

Nutzungsdauer nur 10 Jahre:
  → Höhere Investition amortisiert sich schlechter
  → Standardsystem kann besser sein

Worst-Case / Best-Case analysieren → Robustheitsprüfung
```

---

## LCC in Ausschreibungen

In der öffentlichen Beschaffung (Vergaberecht) können LCC als Zuschlagskriterium verwendet werden:

```
Ausschreibungskriterien:
  40 % Preis (Angebotspreis)
  30 % LCC (berechnet nach VDI 2067 oder EN 60300)
  20 % Qualität / Technik
  10 % Service / Referenzen

LCC-Berechnung durch Bieter:
  Grundlage: standardisierte Betriebszeiten, Energiepreise
  Bewertung: niedrigster LCC → höhere Punktzahl
```

---

## LCC-Software und Tools

```
Tools für LCC-Berechnung:
  Excel-Template (VDI 2067 Ansatz)
  LEGEP (Spezialsoftware für Gebäude, DE)
  Tally / OneClick LCA (Ökobilanz + Kosten)

Vereinfachte Methode für GA:
  Tabellenkalkulationen mit:
    - Investitionszeilen
    - Jährliche Kosten (Energie, Wartung)
    - Ersatzkosten mit Barwertfaktoren
    - Vergleich Varianten → Beste LCC wählen
```

---

## Normen

- **ISO 15686** — Gebäude und bauliche Anlagen: Nutzungsdauer-Planung
- **EN 60300-3-3** — Dependability management: LCC-Analyse
- **VDI 2067** — Wirtschaftlichkeitsberechnungen Gebäudetechnik
- **SIA 469** — Instandhaltung von Bauwerken (Unterhaltsplanung)

<!-- EN -->

## Life Cycle Costs LCC — Investment, Operation and Maintenance

Life cycle costs (LCC) consider the **total costs over the entire service life** of a system — not just the investment. An expensive, energy-efficient system can be cheaper than a cheap, energy-hungry one.

## Basic Formula

```
LCC = Capital cost + Present value of all future costs

Present value = Σ (Annual cost_t / (1+r)^t)

r: discount rate (typically 3–4 %)
t: year (1 to service life n)
n: service life (BA: 15–25 years, building: 50 years)
```

---

## Cost Components

### 1. Capital Costs (one-off)

```
Hardware:
  DDC controllers, sensors, actuators, control panels
  Cables, conduit, installation

Software / engineering:
  Programming, configuration
  Commissioning effort

Documentation:
  DPL, diagrams, functional descriptions
```

### 2. Operating Costs (annually recurring)

```
Energy:
  Pump energy, fan energy (highly dependent on BA class!)
  Auxiliary energy DDC, BMS server

Maintenance:
  BA maintenance contract: 1–3 % of capital cost/year
  Filters, wear parts
  Sensor calibration (every 2–5 years)

Operation:
  Personnel (facility management, operation)
  Software licences (some BMS systems: annual licence fees!)
```

### 3. Replacement Costs (periodic)

```
Typical service lives:
  DDC controller: 15–20 years
  Sensors (PT1000): 10–20 years
  Valves, actuators: 10–15 years
  BMS server (hardware): 7–10 years
  BMS software: 10–15 years (end-of-life)

→ Calculate each replacement investment as a present value
```

---

## Practical Example: Comparison of Two Control Systems

```
Option A: Simple system (class C, EN 15232)
  Investment:              CHF 30,000
  Energy cost/year:        CHF 22,000
  Maintenance/year:        CHF 1,000
  Replacement after 15 y:  CHF 15,000

Option B: Intelligent system (class A, EN 15232)
  Investment:              CHF 55,000 (+CHF 25,000)
  Energy cost/year:        CHF 15,000 (−CHF 7,000/a = −32 %)
  Maintenance/year:        CHF 1,500
  Replacement after 15 y:  CHF 20,000

LCC calculation (15 years, 4 % discount rate):
  Annuity factor 15 y / 4 %: 11.12
  Present value factor 15 y: 1 / 1.04^15 = 0.555

Option A:
  LCC = 30,000 + (22,000 + 1,000) × 11.12 + 15,000 × 0.555
  LCC = 30,000 + 255,760 + 8,325 = CHF 294,085

Option B:
  LCC = 55,000 + (15,000 + 1,500) × 11.12 + 20,000 × 0.555
  LCC = 55,000 + 183,480 + 11,100 = CHF 249,580

→ Option B is CHF 44,500 cheaper over 15 years!
```

---

## Sensitivity Analysis

LCC results depend strongly on assumptions:

```
Parameter influence on LCC:

Energy price rises 3 %/year:
  → Option B becomes even more attractive
  → Every kWh saved is more valuable

Higher discount rate (e.g. 6 %):
  → Future savings are worth less
  → Payback on additional investment takes longer

Service life only 10 years:
  → Higher investment amortises less well
  → Standard system may be better

Analyse worst-case / best-case → robustness check
```

---

## LCC in Procurement

In public procurement (tendering law) LCC can be used as an award criterion:

```
Award criteria:
  40 % Price (tender price)
  30 % LCC (calculated to VDI 2067 or EN 60300)
  20 % Quality / technology
  10 % Service / references

LCC calculation by tenderer:
  Basis: standardised operating hours, energy prices
  Scoring: lowest LCC → higher score
```

---

## LCC Software and Tools

```
Tools for LCC calculation:
  Excel template (VDI 2067 approach)
  LEGEP (specialist software for buildings, DE)
  Tally / OneClick LCA (life cycle assessment + costs)

Simplified method for BA:
  Spreadsheets with:
    - Capital cost rows
    - Annual costs (energy, maintenance)
    - Replacement costs with present value factors
    - Comparison of options → select best LCC
```

---

## Standards

- **ISO 15686** — Buildings and constructed assets: service life planning
- **EN 60300-3-3** — Dependability management: LCC analysis
- **VDI 2067** — Economic efficiency calculations for building services
- **SIA 469** — Maintenance of structures (maintenance planning)
