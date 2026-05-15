---
title: Amortisationsrechnung GA-Massnahmen
slug: amortisationsrechnung
category: wirtschaftlichkeit
subcategory: investition
tags: [amortisation, wirtschaftlichkeit, investitionsrechnung, payback, roi, energieeinsparung, ga-massnahmen, kosten-nutzen, kapitalwert, npv, annuitäten, lebenszykluskosten, lcc, investition]
difficulty: grundlagen
area: [ga, normen]
related: [ems-lastmanagement, en15232, energieausweis-kennzahlen, lebenszyklus-lcc]
norm: [SIA 2040, EN 15232, ISO 50001, VDI 2067]
updated: 2026-05-15
lang: de
---

# Amortisationsrechnung GA-Massnahmen

Jede GA-Investition braucht eine Wirtschaftlichkeitsberechnung. Sie legitimiert das Budget und zeigt ob eine Massnahme lohnenswert ist.

## Einfache Amortisationsrechnung (Payback Period)

```
Amortisationszeit [Jahre] = Investitionskosten [CHF] / Jährliche Einsparung [CHF/a]

Beispiel: Automatische Beleuchtungssteuerung
  Investition:             15.000 CHF
  Energie-Einsparung:      3.000 CHF/a
  Betriebskosten-Senkung:    500 CHF/a
  Gesamteinsparung:         3.500 CHF/a
  
  Amortisationszeit = 15.000 / 3.500 = 4.3 Jahre
```

**Faustregel:** Bei Amortisationszeiten < 5 Jahre wird eine Massnahme meist genehmigt. Über 10 Jahre selten wirtschaftlich.

---

## Typische GA-Massnahmen mit Amortisationszeiten

| Massnahme                        | Investition | Einsparung/a | Amortisation |
|----------------------------------|-------------|--------------|-------------|
| Präsenzsteuerung Beleuchtung     | 500–2.000 CHF/Raum | 300–800 CHF | 2–4 Jahre |
| Nachtauskühlung (Softwarelogik)  | 2.000–5.000 CHF | 1.500–4.000 CHF | 1–3 Jahre |
| Witterungsgeführte Regelung     | 3.000–8.000 CHF | 2.000–5.000 CHF | 2–4 Jahre |
| Hydraulischer Abgleich           | 5.000–15.000 CHF | 2.000–6.000 CHF | 2–5 Jahre |
| Frequenzumrichter auf Pumpe      | 3.000–8.000 CHF | 2.000–5.000 CHF | 1–3 Jahre |
| Submetering (Messinfrastruktur)  | 10.000–30.000 CHF | 5.000–15.000 CHF | 2–4 Jahre |
| EN 15232 Klasse D → B Upgrade    | 20.000–50.000 CHF | 8.000–20.000 CHF | 2–4 Jahre |
| GLT-Nachrüstung Altbau           | 30.000–100.000 CHF | 10.000–25.000 CHF | 3–6 Jahre |

---

## Kapitalwertmethode (NPV)

Berücksichtigt Zeitwert des Geldes (zukünftige Einsparungen sind weniger wert als heutige):

```
NPV = −I₀ + Σ (Et / (1+r)^t)

I₀:  Investitionskosten heute [CHF]
Et:  Einsparung in Jahr t [CHF/a]
r:   Kalkulationszinssatz (typisch 3–5 % für öffentliche Bauten)
t:   Jahr (1, 2, 3, ... n)
n:   Betrachtungszeitraum [Jahre]

Entscheid: Wenn NPV > 0 → Investition rentabel
```

**Beispiel:**

```
Investition: 20.000 CHF
Einsparung: 5.000 CHF/a
Zinssatz: 4 %, Betrachtungszeitraum 10 Jahre

NPV = −20.000 + 5.000 × [(1 − (1.04)^−10) / 0.04]
NPV = −20.000 + 5.000 × 8.11
NPV = −20.000 + 40.550 = +20.550 CHF → rentabel
```

---

## EN 15232 Einsparpotenziale (Richtwerte)

Die Norm gibt Einsparpotenziale je Upgrade der GA-Klasse an:

| Gebäudetyp         | Klasse D → C | Klasse C → B | Klasse B → A |
|--------------------|-------------|--------------|-------------|
| Bürogebäude (Heiz.)| −18 %        | −14 %         | −9 %         |
| Bürogebäude (Kühl.)| −28 %        | −24 %         | −12 %        |
| Hotel               | −15 %        | −12 %         | −8 %         |
| Krankenhaus         | −17 %        | −11 %         | −8 %         |

```
Beispiel: Bürogebäude 2000 m², Heizkosten 15.000 CHF/a
  Upgrade D → B: Einsparung 18 % + 14 % = ~29 %
  → 15.000 × 0.29 = 4.350 CHF/a Einsparung
  
  Bei Investition 30.000 CHF: Amortisation 30.000 / 4.350 = 6.9 Jahre
```

---

## Förderbeiträge einrechnen

In der Schweiz gibt es kantonale und nationale Förderprogramme:

```
Relevante Förderprogramme (Stand 2026):
  Gebäudeprogramm (Bund + Kantone):
    Fassadendämmung: CHF 30/m²
    Heizsystem-Ersatz (WP): CHF 500–5.000
    
  KMU-Energieprogramm:
    Effizienzmassnahmen Industrie/Gewerbe: bis 50 %
    
Amortisation mit Förderung:
  Investition netto = Bruttokosten − Förderung
  → Kürzere Amortisationszeit
  
  Beispiel:
    Investition brutto: 20.000 CHF
    Förderung 25 %:     −5.000 CHF
    Investition netto:  15.000 CHF
    Bei 4.000 CHF/a: Amortisation 3.75 Jahre (statt 5 Jahre)
```

---

## CO₂-Kosten ab 2026

Steigende CO₂-Abgaben beeinflussen Wirtschaftlichkeit:

```
CO₂-Abgabe Schweiz 2026: CHF 120/t CO₂

Beispiel: Ölheizung 100 kW, 1000 Betriebsstunden/Jahr
  Heizöl: 100 kW × 1000 h / 10.5 kWh/l = 9524 l Öl
  CO₂ je Liter Öl: 2.65 kg
  CO₂ gesamt: 9524 × 2.65 kg = 25.2 t CO₂/a
  CO₂-Abgabe: 25.2 t × 120 CHF = 3.024 CHF/a
  
→ Ersatz durch Wärmepumpe spart nicht nur Energie, auch CO₂-Kosten
```

---

## Normen

- **VDI 2067** — Wirtschaftlichkeitsberechnungen gebäudetechnischer Anlagen
- **EN 15232** — Einsparpotenziale GA (Faktoren je Klasse)
- **SIA 2040** — Schweizer Standard Energie (Zielwerte)
- **ISO 50001** — Energiemanagementsystem, KPIs und Ziele
