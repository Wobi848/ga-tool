---
title: Legionellen — Schutz in Trinkwasseranlagen
title_en: Legionella — Protection in Drinking Water Systems
slug: legionellen
category: sanitaer
subcategory: hygiene
tags: [legionellen, legionellose, trinkwasser, warmwasser, speicher, zirkulation, schutztemperatur, thermische-desinfektion, spuelung, stagnation, dvgw, vdi2035, w551, heizung]
difficulty: fortgeschritten
area: [sanitaer, ga, hlk]
related: [vdi6022, signaltypen, alarmmanagement]
norm: [DVGW W 551, VDI 6023, EN 806-5, WHO Guidelines, SWKI BT102-01]
updated: 2026-05-14
lang: de
---

# Legionellen — Schutz in Trinkwasseranlagen

**Legionellen** (Legionella pneumophila) sind Bakterien die bei 25–45 °C optimal gedeihen und beim Einatmen von Wassernebel (Aerosol) eine schwere Lungenentzündung (Legionellose) verursachen können. In der GA ist der Schutz vor Legionellenwachstum eine Kernaufgabe der Sanitärautomation.

## Wachstumsbedingungen

| Temperatur     | Verhalten                               |
|----------------|-----------------------------------------|
| < 20 °C        | Kein Wachstum (aber Überleben möglich)  |
| 25–45 °C       | **Optimales Wachstum**                  |
| 50 °C          | Wachstum gestoppt                       |
| 55 °C          | Absterben (langsam, nach Minuten)       |
| 60 °C          | Zuverlässiges Absterben                 |
| 70 °C          | Sofortiges Absterben                    |

> **Kritische Zone: 25–55 °C** — jeder Warmwasserspeicher oder jede Leitung in diesem Bereich ist ein Risiko.

## Übertragungsweg

**Nur Aerosol** ist gefährlich — nicht das Trinken von kontaminiertem Wasser:

- Duschen (feinste Tröpfchen)
- Whirlpool, Jacuzzi
- Luftbefeuchter (unkontrollierte Wassertemperatur!)
- Kühltürme (Verdunstungskühlung)
- Wasserhähne mit Perlator (Aerosolbildung)

## Schutzmassnahmen nach DVGW W 551

### Warmwasser-Speicher

| Kriterium          | Anforderung                              |
|--------------------|------------------------------------------|
| Speichertemperatur | **≥ 60 °C** dauerhaft                    |
| Vorlauftemperatur  | ≥ 60 °C                                  |
| Zirkulationsrücklauf | ≥ 55 °C (am kältesten Punkt!)           |
| Max. Abkühlzeit    | Kein Bereich unter 55 °C nach 5 min     |

### Zirkulationssystem

```
Speicher (≥60°C) → Vorlauf → Strang 1 → Strang 2 → Strang N
                              ↓           ↓           ↓
                           Zapfstelle  Zapfstelle  Zapfstelle
                              ↑           ↑           ↑
Rücklauf (≥55°C) ←───────────────────────────────────
```

Die Zirkulationspumpe muss laufen bis jeder Punkt im System ≥ 55 °C erreicht.

**Messung:** Rücklauftemperatur kontrollieren — wenn Rücklauf < 55 °C: Stagnation oder unzureichende Dämmung.

### Kaltwasser

| Kriterium          | Anforderung                              |
|--------------------|------------------------------------------|
| Kaltwassertemperatur | **≤ 25 °C** (dauerhaft < 20 °C optimal) |
| Kein Kontakt mit WW | Leitungsführung getrennt               |
| Keine Stagnation    | Wenig genutzte Leitungen regelmässig spülen |

> ⚠️ In schlecht gedämmten Gebäuden erwärmt sich Kaltwasser durch benachbarte Warmwasserleitungen auf > 25 °C — Legionellengefahr!

## Thermische Desinfektion

Einmalige oder periodische Erhitzung des gesamten Systems auf **≥ 70 °C** an jedem Punkt:

### Ablauf

1. Speicher auf 70–75 °C aufheizen (1–2 Stunden)
2. Jeden Zapfhahn einzeln öffnen bis 70 °C fliesst (mind. 3 Minuten)
3. Protokollierung: Datum, Uhrzeit, Punkt, Temperatur, Dauer
4. Systemtemperatur wieder auf Normalbetrieb zurücksetzen

### GA-Automatisierung

```
Wochenprogramm:
  Mo–Fr: Zirkulation aktiv (7–22 Uhr), WW-Speicher 60 °C
  Tägl. 22:00: Thermische Desinfektion
    → Speicher auf 70 °C
    → Zirkulation Vollast
    → 1 h halten
    → Rücklauftemperatur ≥ 65 °C? → OK
    → Alarm wenn nicht erreicht
```

**Tipp:** Thermische Desinfektion über Nacht automatisieren. Tageszeit wählen wenn Anlage nicht in Benutzung (Verbrühungsschutz beachten!).

## Stagnationsproblematik

**Stagnation** = stehendes Wasser → Brutstätte für Legionellen:

- Selten genutzte Leitungen (Gäste-WC, Ferienanlagen)
- Leitungsenden (blind ends)
- Leitungen nach Umbau still gelegt aber nicht entfernt

### Massnahmen gegen Stagnation

| Massnahme                    | Beschreibung                                           |
|------------------------------|--------------------------------------------------------|
| **Spülprogramme**            | Automatisch wenig genutzte Zapfstellen spülen         |
| **Zirkulation überprüfen**   | Alle Stränge müssen Rücklauftemperatur erreichen       |
| **Totstücke entfernen**      | Nicht genutzte Leitungsenden physisch trennen          |
| **Temperaturüberwachung**    | Mehrere Fühler im System → Alarm wenn < 55 °C (WW)    |

## Spülprogramm in der GA

Beispiel für automatisches Spülen von Seltennutzungs-Zapfstellen:

```
Täglich 06:00:
  Für jeden gesteuerten Zapfhahn:
    1. Magnetventil öffnen
    2. Durchfluss kontrollieren (DI vom Durchflusssensor)
    3. Temperatur ≥ 55 °C warten (max. 3 min)
    4. Wenn 55 °C erreicht: 60 s spülen
    5. Ventil schliessen
    6. Protokoll: Datum, Punkt, Temperatur, OK/NOK
    7. Alarm wenn Temperatur nicht erreicht
```

## Messstellen für GA

| Messstelle              | Sensor    | Grenzwert      | Alarm              |
|-------------------------|-----------|----------------|--------------------|
| Speicher Warmwasser     | PT1000    | ≥ 60 °C        | Alarm wenn < 58 °C |
| Zirkulation Rücklauf    | PT1000    | ≥ 55 °C        | Alarm wenn < 53 °C |
| Kaltwassereintritt      | PT1000    | ≤ 25 °C        | Warnung wenn > 22 °C |
| Vorlauf jeder Strang    | PT1000    | ≥ 55 °C        | optional           |

## Dokumentationspflicht

In vielen Ländern gesetzlich vorgeschrieben (CH: SWKI BT102-01):

- **Temperaturbuch:** täglich Speicher- und Zirkulationstemperaturen
- **Desinfektionsprotokoll:** Datum, Umfang, Messwerte
- **Wasseruntersuchungen:** je nach Anlagengrösse (Probenentnahme + Labor)
- **Wartungsberichte:** Filter, Wasserbehandlung, Armaturen

> Für gewerbliche Anlagen (Hotels, Spitäler, Sportanlagen) sind regelmässige Untersuchungen gesetzlich Pflicht. Die GA hilft diese Dokumentation zu automatisieren.

## Besondere Risikogruppen

- Hotels (viele selten genutzte Zimmer, wechselnde Belegung)
- Krankenhäuser / Altersheime (immungeschwächte Personen)
- Sportzentren (Duschen, Whirlpools)
- Grosse Wohnüberbauungen (lange Leitungswege)

## Normen

- **DVGW W 551** (DE) — Trinkwassererwärmungs- und Leitungsanlagen, Technische Massnahmen zur Verminderung des Legionellenwachstums
- **VDI 6023** — Hygiene in Trinkwasser-Installationen
- **EN 806-5** — Spülen, Desinfektion, Inbetriebnahme
- **SWKI BT102-01** (CH) — Hygiene von Raumlufttechnischen Anlagen (auch WW-Hygiene)
- **WHO Guidelines for Drinking Water Quality** — internationale Referenz

<!-- EN -->

**Legionella** (Legionella pneumophila) are bacteria that thrive optimally at 25–45 °C and can cause severe pneumonia (Legionnaires' disease) when water droplets (aerosol) are inhaled. In BA, protection against Legionella growth is a core task of sanitary automation.

## Growth Conditions

| Temperature | Behaviour |
|------------|----------|
| < 20 °C | No growth (but survival possible) |
| 25–45 °C | **Optimal growth** |
| 50 °C | Growth stopped |
| 55 °C | Die-off (slowly, after minutes) |
| 60 °C | Reliable die-off |
| 70 °C | Immediate die-off |

> **Critical zone: 25–55 °C** — any hot water storage or pipework in this range is a risk.

## Transmission Route

**Only aerosol** is hazardous — not drinking contaminated water:

- Showering (fine droplets)
- Whirlpool, Jacuzzi
- Humidifiers (uncontrolled water temperature!)
- Cooling towers (evaporative cooling)
- Tap aerators (aerosol formation)

## Protective Measures per DVGW W 551

### Hot Water Storage

| Criterion | Requirement |
|----------|------------|
| Storage temperature | **≥ 60 °C** continuously |
| Supply temperature | ≥ 60 °C |
| Circulation return | ≥ 55 °C (at the coldest point!) |
| Max. cool-down time | No area below 55 °C after 5 min |

### Circulation System

```
Storage (≥60 °C) → supply → riser 1 → riser 2 → riser N
                              ↓           ↓           ↓
                           Draw-off    Draw-off    Draw-off
                              ↑           ↑           ↑
Return (≥55 °C) ←───────────────────────────────────
```

The circulation pump must run until every point in the system reaches ≥ 55 °C.

**Measurement:** Monitor return temperature — if return < 55 °C: stagnation or insufficient insulation.

### Cold Water

| Criterion | Requirement |
|----------|------------|
| Cold water temperature | **≤ 25 °C** (continuously < 20 °C optimal) |
| No contact with HW | Separate pipe routing |
| No stagnation | Flush infrequently used pipework regularly |

> ⚠️ In poorly insulated buildings, cold water is warmed above 25 °C by adjacent hot water pipes — Legionella risk!

## Thermal Disinfection

Single or periodic heating of the entire system to **≥ 70 °C** at every point:

### Procedure

1. Heat storage to 70–75 °C (1–2 hours)
2. Open each draw-off point individually until 70 °C flows (minimum 3 minutes)
3. Record: date, time, point, temperature, duration
4. Return system temperature to normal operation

### BA Automation

```
Weekly programme:
  Mon–Fri: circulation active (07:00–22:00), HW storage 60 °C
  Daily 22:00: thermal disinfection
    → Storage to 70 °C
    → Circulation full load
    → Hold 1 h
    → Return temperature ≥ 65 °C? → OK
    → Alarm if not reached
```

**Tip:** Automate thermal disinfection overnight. Choose a time when the system is not in use (observe scalding protection!).

## Stagnation Problem

**Stagnation** = standing water → breeding ground for Legionella:

- Infrequently used pipework (guest WC, holiday facilities)
- Dead ends (blind ends)
- Pipework decommissioned after renovation but not removed

### Measures Against Stagnation

| Measure | Description |
|--------|------------|
| **Flushing programmes** | Automatically flush infrequently used draw-off points |
| **Circulation check** | All risers must reach return temperature |
| **Remove dead legs** | Physically disconnect unused pipe ends |
| **Temperature monitoring** | Multiple sensors in system → alarm if < 55 °C (HW) |

## Flushing Programme in BA

Example of automatic flushing for infrequently used draw-off points:

```
Daily 06:00:
  For each controlled tap:
    1. Open solenoid valve
    2. Check flow (DI from flow sensor)
    3. Wait for temperature ≥ 55 °C (max. 3 min)
    4. If 55 °C reached: flush for 60 s
    5. Close valve
    6. Record: date, point, temperature, OK/NOK
    7. Alarm if temperature not reached
```

## Measuring Points for BA

| Measuring point | Sensor | Limit value | Alarm |
|--------------|-------|-----------|------|
| Hot water storage | PT1000 | ≥ 60 °C | Alarm if < 58 °C |
| Circulation return | PT1000 | ≥ 55 °C | Alarm if < 53 °C |
| Cold water inlet | PT1000 | ≤ 25 °C | Warning if > 22 °C |
| Supply each riser | PT1000 | ≥ 55 °C | optional |

## Documentation Requirements

Legally required in many countries (CH: SWKI BT102-01):

- **Temperature log:** daily storage and circulation temperatures
- **Disinfection record:** date, scope, measured values
- **Water testing:** depending on system size (sampling + laboratory)
- **Maintenance reports:** filters, water treatment, fittings

> For commercial installations (hotels, hospitals, sports facilities), regular testing is a legal obligation. BA helps automate this documentation.

## Particularly At-Risk Groups

- Hotels (many infrequently used rooms, changing occupancy)
- Hospitals / care homes (immunocompromised persons)
- Sports centres (showers, whirlpools)
- Large residential complexes (long pipe runs)

## Standards

- **DVGW W 551** (DE) — Drinking water heating and piping systems, technical measures to reduce Legionella growth
- **VDI 6023** — Hygiene in drinking water installations
- **EN 806-5** — Flushing, disinfection, commissioning
- **SWKI BT102-01** (CH) — Hygiene of ventilation systems (also hot water hygiene)
- **WHO Guidelines for Drinking Water Quality** — international reference
