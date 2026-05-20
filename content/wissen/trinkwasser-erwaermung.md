---
title: Trinkwasser-Erwärmung — Speicher, Durchfluss, Hygiene
title_en: Domestic Hot Water Heating — Storage, Instantaneous and Hygiene
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

<!-- EN -->

## Domestic Hot Water Heating — Storage, Instantaneous and Hygiene

Domestic hot water (DHW) combines comfort requirements with strict hygiene regulations. Temperatures below 60 °C in the storage tank or below 55 °C in the circulation system create a Legionella risk.

## System Types

### Central Storage System

```
Heat source (boiler / HP / district heat)
    ↓ Primary circuit
Heat exchanger (storage loading system)
    ↓
DHW storage tank (60 °C, top)
    ↓
Circulation pipe (> 55 °C)
    ↓
Draw-off points
```

- Suitable for multi-family dwellings, hotels, hospitals
- Storage volume: 30–80 l per person (residential)
- Large systems: sized to DVGW W551

### Instantaneous Water Heater (decentralised)

```
Cold water → heat exchanger → hot water immediately
(no storage, no hygiene problem)
```

- No Legionella risk (no standing hot water)
- Requires high connected load (electric: 18–30 kW for 1 draw-off point)
- Gas instantaneous heaters: more efficient, but CO risk (only in kitchen/bathroom with supply air)

---

## Temperatures and Hygiene

```
Critical temperature ranges:
  < 20 °C: Legionella die off (too cold to grow)
  20–45 °C: Optimal Legionella growth range!
  45–60 °C: Legionella grow slowly
  > 60 °C: Legionella die within minutes
  > 70 °C: Instantaneous kill
  
DVGW W551 requirements:
  Storage:             ≥ 60 °C (measured at top)
  Circulation:         ≥ 55 °C (everywhere)
  Draw-off temp.:      ≥ 55 °C after max. 60 s flow time
  Cold water:          ≤ 25 °C (permanent), ≤ 20 °C (recommended)
```

---

## Circulation System

```
DHW storage 60 °C
    ↓ Flow (60 °C)
    → Risers → Floor distribution → Draw-off points
    ← Return (> 55 °C)
    ↑ Circulation pump
    
Circulation temperature drops:
  OK: return temp. > 55 °C
  Not OK: return temp. < 55 °C → Legionella risk!
  → Cause: heat loss through poorly insulated pipes
```

**Circulation pump control:**

```
Time control:
  Operation: 06:00–23:00 (occupancy hours)
  Shutdown: 23:00–06:00 (if pipes insulated and short)
  
  CAUTION: Long pipes → at risk overnight too
  → Thermal operation: pump runs when T_return < 55 °C

Better: temperature control
  When T_return < 56 °C → pump ON
  When T_return > 58 °C → pump OFF (hysteresis)
```

---

## Thermal Disinfection

Periodic heating to kill all Legionella:

```
DVGW W551:
  Large systems (> 400 l storage or > 3 l per pipe section):
    → Weekly thermal disinfection
    → T_storage ≥ 70 °C
    → All draw-off points flushed 3 min at ≥ 70 °C
    
Small systems:
  Continuous operation at 60 °C (no periodic disinfection required)
```

**BA programme for thermal disinfection:**

```
Weekly (e.g. Monday 02:00):
  Storage setpoint: 70 °C
  Load until T_storage_top ≥ 70 °C
  Circulation: 100 % (maximum flow)
  Duration: hold at ≥ 70 °C for 30–60 min
  
  After completion:
    Return to normal setpoint 60 °C
    Log: date, time, temperature profile → compliance
```

---

## Scald Protection

Hot water > 60 °C at draw-off points is a scalding hazard:

```
Solution: thermostatic mixing valve at draw-off point
  3-way mixing valve: DHW 60 °C + CW → mixed 45 °C
  
Or: central mixing valve after storage
  Storage 60 °C → mixing valve → distribution 45 °C
  
CAUTION: Circulation must still maintain ≥ 55 °C
  → Mixing valve only at end of distribution, after circulation return connection
```

---

## BA Data Points DHW

| Data point | Type | Unit | Description |
|------------|------|------|-------------|
| DHW storage temp top | AI | °C | Hygiene monitoring |
| DHW storage temp mid | AI | °C | Charge state |
| DHW storage temp bot | AI | °C | Cold zone |
| DHW setpoint | AV | °C | Normal 60 °C / Disinfection 70 °C |
| Circulation return temp | AI | °C | Hygiene monitoring |
| Circulation pump | DO | — | ON/OFF |
| Loading pump | DO | — | ON/OFF |
| Loading valve | AO | % | 0–100 % |
| Disinfection active | DV | — | Weekly programme status |
| DHW draw-off volume | AI | l | Consumption measurement |

---

## Standards

- **DVGW W551** — Domestic hot water heating and piping systems (Legionella prevention)
- **DIN 1988** — Technical rules for drinking water installations
- **EN 806** — Specifications for installations inside buildings conveying water for human consumption
- **SIA 385/1** — Domestic hot water installations (Swiss standard)
- **ÖNORM B 5019** — Hygienic domestic hot water heating systems
