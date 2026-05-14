---
title: Wärmepumpe — Grundlagen, Regelung & GA
slug: waermepumpe
category: heizung
subcategory: erzeuger
tags: [wärmepumpe, cop, scop, kältemittel, verdichter, verdampfer, verflüssiger, expansionsventil, sole-wasser, luft-wasser, wasser-wasser, inverter, heizstab, sperrzeiten, sg-ready]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizkurve, druckverlust, hydraulischer-abgleich]
norm: [EN 14511, EN 14825, VDI 4645]
updated: 2026-05-14
lang: de
---

# Wärmepumpe — Grundlagen, Regelung & GA

Die **Wärmepumpe** entzieht einer Wärmequelle (Luft, Erdreich, Wasser) Energie und hebt sie auf ein nutzbares Temperaturniveau. In der GA sind vor allem **Luft/Wasser-** und **Sole/Wasser-Wärmepumpen** relevant.

## Thermodynamisches Prinzip

```
Verdampfer (kalt) → Verdichter → Verflüssiger (warm) → Expansionsventil → Verdampfer
  Wärmequelle          (Strom)       Heizkreis         (Drossel)
```

1. **Verdampfer:** Kältemittel verdampft bei niedrigem Druck, nimmt Wärme aus der Quelle auf
2. **Verdichter:** Komprimiert das Kältemittelgas → Temperatur steigt
3. **Verflüssiger:** Kältemittel kondensiert, gibt Wärme an den Heizkreis ab
4. **Expansionsventil:** Druckabfall, Kältemittel wird kalt und flüssig

## Quellentypen

| Typ             | Wärmequelle    | COP (typisch)  | Bemerkungen                                  |
|-----------------|----------------|----------------|----------------------------------------------|
| **Luft/Wasser** | Aussenluft     | 2,5–4,5        | Einfache Installation, COP sinkt bei Kälte   |
| **Sole/Wasser** | Erdkollektor / Sonde | 3,5–5,0 | Konstantere Quelltemperatur, aufwändiger     |
| **Wasser/Wasser** | Grundwasser / Abwasser | 4,0–6,0 | Höchste Effizienz, Genehmigung nötig       |

> ⚠️ **Luft/Wasser bei −10 °C:** COP sinkt auf ~2,0 oder darunter. Oft mit **Heizstab** (Elektro-Direktheizung) als Notfallheizung kombiniert — dieser hat COP 1,0 und sollte möglichst selten laufen.

## Leistungskennzahlen

### COP (Coefficient of Performance)

**Momentan-Wirkungsgrad** bei einem Betriebspunkt:

$$\text{COP} = \frac{Q_{Heiz}}{P_{el}}$$

- `Q_Heiz` = abgegebene Heizleistung [kW]
- `P_el` = aufgenommene elektrische Leistung [kW]

**Normprüfpunkt** nach EN 14511 typisch: A7/W35 (Luft 7 °C, Vorlauf 35 °C)

### SCOP (Seasonal COP)

**Jahres-Wirkungsgrad** über die gesamte Heizperiode nach EN 14825 — praxisnäher als COP, denn er berücksichtigt:
- Verschiedene Aussentemperaturen
- Teillastbetrieb
- Abtauzyklen (bei L/W-WP)
- Hilfsenergie (Pumpen, Steuerung)

Typische SCOP-Werte:
- L/W-WP mit Niedertemperatur-Heizkreis: **3,0–4,5**
- Sole/W-WP: **4,0–5,5**

## Betriebsarten

| Betriebsart       | Beschreibung                                             |
|-------------------|----------------------------------------------------------|
| **Heizbetrieb**   | Raumheizung via Heizkurve (witterungsgeführt)            |
| **Kühlbetrieb**   | Aktiv (Kältemaschinen-Modus) oder passiv (Natural Cooling bei Sole/W) |
| **WW-Bereitung**  | Brauchwarmwasser, typisch bis 55 °C, bei Legionellenschutz bis 60 °C |
| **Abtauung**      | L/W-WP: Verdampfer vereist bei Aussentemp. ≤ 5 °C, WP reversiert kurz |
| **Standby**       | Frostschutz, minimale Zirkulation                        |

## Hydraulikschema (vereinfacht)

```
WP-Verflüssiger ── Pufferspeicher ── Mischer ── Heizkreise
                       │
                  Warmwasserspeicher (oben)
                       │
                  Zirkulationspumpe
```

- **Pufferspeicher:** Entkoppelt WP-Takt von Heizkreis, ermöglicht Mindestlaufzeit
- **Mindestlaufzeit:** 10–20 min, um den Verdichter zu schonen (Kurzzyklen schädlich!)
- **Hydraulische Weiche / Puffer:** Bei mehreren Heizkreisen mit verschiedenen Temperaturniveaus

> ⚠️ **Kurzzyklen** (< 3 min) schaden dem Verdichter massiv. Pufferspeicher dimensionieren!

## Regelung & GA-Integration

### Steuerungsparameter (GA-relevante Datenpunkte)

| Datenpunkt                  | Typ    | Beschreibung                                   |
|-----------------------------|--------|------------------------------------------------|
| Betriebsart                 | Soll   | Heizen / Kühlen / WW / Off                     |
| Vorlauf-Solltemperatur      | Soll   | Extern vorgeben (überschreibt Heizkurve)        |
| Vorlauf-Isttemperatur       | Ist    | Rückmeldung aktuell                            |
| Rücklauf-Isttemperatur      | Ist    | Differenz = Spreizung                          |
| Aussentemperatur            | Ist    | Für Heizkurve                                  |
| Verdichter Laufmeldung      | Ist    | Ein/Aus, Stufe oder Frequenz (Inverter)        |
| Heizstab aktiv              | Ist    | Zusatzheizung läuft                            |
| Störmeldung                 | Ist    | Fehlercode                                     |
| Speichertemperatur          | Ist    | Puffer oben/unten                              |
| SG-Ready-Eingang (1–4)      | Soll   | Smart-Grid-Steuerung                           |

### SG Ready (Smart Grid)

Deutsches Schnittstellenkonzept — 4 Zustände via 2 digitale Eingänge:

| Zustand | E1 | E2 | Bedeutung                                          |
|---------|----|----|----------------------------------------------------|
| 1       | 0  | 0  | Sperrzeit (EVU-Abschaltung)                        |
| 2       | 1  | 0  | **Normalbetrieb** (Standard)                       |
| 3       | 0  | 1  | **Einschaltempfehlung** (WP läuft, Speicher laden) |
| 4       | 1  | 1  | **Anlaufbefehl** (Überschuss PV, Billigstrom)      |

Die GA kann über digitale Ausgänge die SG-Ready-Eingänge setzen — z.B. zur PV-Überschussnutzung.

### Inverter-WP

Moderne WP mit **Frequenzumrichter** am Verdichter können die Leistung stufenlos regulieren (z.B. 20–100 %). Vorteile:
- Kein Takten, Verdichter läuft durch
- Effizienter im Teillastbetrieb
- Leiser

GA-Sicht: Meist ist dennoch nur On/Off + Sollwert-Vorgabe möglich; interne Regelung übernimmt die FU-Steuerung.

## Abtauung (Luft/Wasser)

Bei Verdampfertemperaturen ≤ 0 °C bildet sich Reif. Die WP erkennt Abtaubedarf über:
- Zeitintervall (z.B. alle 60 min)
- Druckdifferenz am Verdampfer
- Temperaturdifferenz Umluft – Verdampfer

**Abtauvorgang:** WP reversiert den Kreislauf kurz (~2–10 min), heisses Kältemittel taut Verdampfer auf. Heizkreis wird in dieser Zeit vom Puffer versorgt.

> Während Abtauung sinkt Vorlauftemperatur kurz — die GLT sollte Alarme in diesem Zeitfenster unterdrücken.

## Häufige Fehler & Diagnose

| Problem                         | Mögliche Ursache                                           |
|---------------------------------|------------------------------------------------------------|
| WP schaltet häufig kurz ein/aus | Pufferspeicher zu klein, Mindestlaufzeit nicht erreicht    |
| Hoher Heizstab-Anteil           | WP zu klein, Quellentemperatur zu niedrig, Abtaufehler     |
| WW nicht warm genug             | Nachheiztemperatur zu niedrig eingestellt (Legionellenschutz!) |
| Druckfehler Hochdruck           | Verflüssiger verschmutzt, Heizkreispumpe defekt            |
| Druckfehler Niederdruck         | Verdampfer vereist (Abtaufehler), Kältemittelmangel        |
| Keine Kälteleistung im Sommer   | Betriebsart Kühlen nicht aktiviert, Hydraulik nicht umgeschaltet |

## Normen

- **EN 14511** — Prüfnormen, Prüfpunkte für Wärmepumpen
- **EN 14825** — SCOP-Berechnung (saisonale Effizienz)
- **VDI 4645** — Planung und Dimensionierung von WP-Anlagen
- **EN 12831** — Heizlastberechnung (Basis für WP-Dimensionierung)
