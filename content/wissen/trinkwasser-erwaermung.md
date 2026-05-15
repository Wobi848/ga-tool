---
title: Trinkwasser-Erwärmung — Speicher, Durchfluss, Hygiene
slug: trinkwasser-erwaermung
category: sanitaer
subcategory: warmwasser
tags: [trinkwasser-erwärmung, warmwasser, brauchwasser, speicher, durchflusserwärmer, zirkulation, legionellen, hygiene, zapftemperatur, dvgw, w551, wärmespeicher, tww, kombispeicher]
difficulty: fortgeschritten
area: [hlk, sanitaer, ga]
related: [legionellen, heizung-grundlagen, waermemengenzaehler, pufferspeicher]
norm: [DVGW W551, DIN 1988, EN 806, SIA 385/1, ÖNORM B 5019]
updated: 2026-05-15
lang: de
---

# Trinkwasser-Erwärmung — Speicher, Durchfluss, Hygiene

Trinkwarmwasser (TWW) verbindet Komfortanforderungen mit strengen Hygiene-Vorschriften. Temperaturen unter 60 °C im Speicher oder unter 55 °C im Zirkulationssystem führen zu Legionellen-Risiko.

## Systemtypen

### Zentrales Speichersystem

```
Wärmerzeuger (Kessel / WP / Fernwärme)
    ↓ Primärkreis
Wärmetauscher (Speicher-Ladesystem)
    ↓
Warmwasserspeicher (60 °C, oben)
    ↓
Zirkulationsleitung (> 55 °C)
    ↓
Zapfstellen
```

- Geeignet für Mehrfamilienhäuser, Hotels, Krankenhäuser
- Speichervolumen: 30–80 l pro Person (Wohngebäude)
- Großanlagen: nach DVGW W551 Dimensionierung

### Durchfluss-Erwärmer (dezentral)

```
Kaltwasser → Wärmetauscher → Warmwasser sofort
(kein Speicher, kein Hygieneproblem)
```

- Kein Legionellen-Risiko (kein stehendes Warmwasser)
- Benötigt hohe Anschlussleistung (Elektro: 18–30 kW für 1 Zapfstelle)
- Gasdurchlauferhitzer: effizienter, aber CO-Risiko (nur in Küchen/Bad mit Zuluft)

---

## Temperaturen und Hygiene

```
Kritische Temperaturbereiche:
  < 20 °C: Legionellen sterben ab (zu kalt zum Wachsen)
  20–45 °C: Optimales Wachstumsbereich Legionellen!
  45–60 °C: Legionellen wachsen langsam
  > 60 °C: Legionellen sterben innerhalb Minuten ab
  > 70 °C: Sofortige Abtötung
  
DVGW W551 Anforderungen:
  Speicher:            ≥ 60 °C (oben gemessen)
  Zirkulation:         ≥ 55 °C (überall)
  Zapftemperatur:      ≥ 55 °C nach max. 60 s Fliesszeit
  Kaltwasser:          ≤ 25 °C (dauerhaft), ≤ 20 °C (empfohlen)
```

---

## Zirkulationssystem

```
Warmwasserspeicher 60 °C
    ↓ Vorlauf (60 °C)
    → Steigetrassen → Stockwerkleitungen → Zapfstellen
    ← Rücklauf (> 55 °C)
    ↑ Zirkulationspumpe
    
Zirkulationstemperatur sinkt:
  OK: RL-Temp > 55 °C
  Nicht OK: RL-Temp < 55 °C → Legionellen-Risiko!
  → Ursache: Wärmeabgabe durch schlecht isolierte Leitungen
```

**Regelung Zirkulationspumpe:**

```
Zeitsteuerung:
  Betrieb: 06:00–23:00 (Nutzungszeiten)
  Abschaltung: 23:00–06:00 (wenn Leitungen isoliert und kurz)
  
  ACHTUNG: Bei langen Leitungen → auch nachts gefährdet
  → Thermischer Betrieb: Pumpe läuft wenn T_RL < 55 °C

Besser: Temperatur-Regelung
  Wenn T_RL < 56 °C → Pumpe EIN
  Wenn T_RL > 58 °C → Pumpe AUS (Hysterese)
```

---

## Thermische Desinfektion

Periodisches Aufheizen zum Abtöten aller Legionellen:

```
DVGW W551:
  Grosse Anlagen (> 400 l Speicher oder > 3 l je Leitungsabschnitt):
    → Wöchentliche thermische Desinfektion
    → T_Speicher ≥ 70 °C
    → Alle Zapfstellen 3 min auf ≥ 70 °C durchspülen
    
Kleine Anlagen:
  Dauerbetrieb 60 °C (keine periodische Desinfektion nötig)
```

**GA-Programm thermische Desinfektion:**

```
Wöchentlich (z.B. Montag 02:00):
  Speicher-Sollwert: 70 °C
  Ladung bis T_Speicher_Oben ≥ 70 °C
  Zirkulation: 100 % (Maximaldurchfluss)
  Dauer: 30–60 min bei ≥ 70 °C halten
  
  Nach Abschluss:
    Rückkehr auf Normal-Sollwert 60 °C
    Protokollierung: Datum, Zeit, Temperaturverlauf → Compliance
```

---

## Brühschutz / Verbrühschutz

Warmwasser > 60 °C an Zapfstellen ist eine Verbrühungsgefahr:

```
Lösung: Thermostat-Mischbatterie an Zapfstelle
  Mischventil 3-Wege: TWW 60 °C + KW → gemischt 45 °C
  
Oder: Zentrales Mischventil nach Speicher
  Speicher 60 °C → Mischventil → Verteilung 45 °C
  
ACHTUNG: Zirkulation muss trotzdem ≥ 55 °C haben
  → Mischventil nur am Ende der Verteilung, nach Zirkulations-Rücklauf-Anschluss
```

---

## GA-Datenpunkte TWW

| Datenpunkt                  | Typ | Einheit | Beschreibung                   |
|-----------------------------|-----|---------|--------------------------------|
| TWW-Speicher Temp Oben      | AI  | °C      | Hygiene-Monitoring             |
| TWW-Speicher Temp Mitte     | AI  | °C      | Ladezustand                    |
| TWW-Speicher Temp Unten     | AI  | °C      | Kaltzone                       |
| TWW-Sollwert                | AV  | °C      | Normal 60 °C / Desinf. 70 °C  |
| Zirkulations-RL Temperatur  | AI  | °C      | Hygiene-Überwachung            |
| Zirkulationspumpe           | DO  | —       | EIN/AUS                        |
| Ladepumpe                   | DO  | —       | EIN/AUS                        |
| Ladeventil                  | AO  | %       | 0–100 %                        |
| Desinfektion aktiv          | DV  | —       | Wochenprogramm-Status          |
| TWW-Zapfvolumen             | AI  | l       | Verbrauchsmessung              |

---

## Normen

- **DVGW W551** — Trinkwassererwärmungs- und Leitungsanlagen (Legionellenprophylaxe)
- **DIN 1988** — Technische Regeln für Trinkwasser-Installationen
- **EN 806** — Trinkwasser-Installationen in Gebäuden
- **SIA 385/1** — Anlagen für Trinkwarmwasser (Schweizer Norm)
- **ÖNORM B 5019** — Hygienisch einwandfreie Trinkwasser-Erwärmungsanlagen
