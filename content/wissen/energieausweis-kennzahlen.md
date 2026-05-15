---
title: Energieausweis und Gebäudekennzahlen — GEAK, Minergie, kWh/m²
slug: energieausweis-kennzahlen
category: energie
subcategory: kennzahlen
tags: [energieausweis, geak, minergie, kwh-m2, energiebezugsfläche, heizenergiebedarf, gesamtenergiebedarf, primärenergie, co2-emissionen, gebäudeenergieeffizienz, iso50001, energiekennzahl, eki, sia-380-1]
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
|--------|----------------------------|
| A      | ≤ 35                       |
| B      | 35–65                      |
| C      | 65–95                      |
| D      | 95–130                     |
| E      | 130–175                    |
| F      | 175–235                    |
| G      | > 235                      |

---

## Minergie (Schweiz)

Minergie ist ein Qualitätslabel für Gebäude mit tiefem Energieverbrauch:

| Label          | Anforderung Wärme | Besonderheit                      |
|----------------|-------------------|-----------------------------------|
| **Minergie**   | ≤ 38 kWh/m²a      | Kontrollierte Lüftung Pflicht     |
| **Minergie-P** | ≤ 15 kWh/m²a      | Passivhaus-Standard               |
| **Minergie-A** | Plusenergie        | Mehr Energie produziert als verbraucht |
| **Minergie-ECO**| + Minergie        | Zusätzlich Ökologie + Gesundheit  |

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
