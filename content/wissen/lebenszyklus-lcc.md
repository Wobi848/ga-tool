---
title: Lebenszykluskosten LCC — Investition, Betrieb, Unterhalt
slug: lebenszyklus-lcc
category: wirtschaftlichkeit
subcategory: investition
tags: [lcc, lebenszykluskosten, lifecycle-cost, investition, betriebskosten, unterhaltskosten, kapitalkosten, energiekosten, instandhaltung, ersatz, gesamtkosten, tco, total-cost-of-ownership, barwert]
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
