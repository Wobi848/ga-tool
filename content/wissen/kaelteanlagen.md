---
title: Kälteanlagen — Grundlagen & GA
title_en: Refrigeration Systems — Fundamentals and BA
slug: kaelteanlagen
category: kaelte
subcategory: erzeuger
tags: [kältemaschine, kälteanlage, chiller, kältemittel, verdichter, verflüssiger, verdampfer, cop, eer, seer, free-cooling, rückkühler, kaltwassersatz, split, vrf, dx, r32, r290, r744, gwp, f-gase]
difficulty: fortgeschritten
area: [hlk, ga]
related: [waermepumpe, taupunkt, druckverlust]
norm: [EN 14511, EN 378, F-Gase-Verordnung, ChemRRV]
updated: 2026-05-14
lang: de
---

# Kälteanlagen — Grundlagen & GA

Kälteanlagen entziehen einem Bereich Wärme und geben sie an eine Wärmesenke ab. In der GA sind **Kaltwassersätze (Chiller)** und **direkt verdampfende Anlagen (DX/VRF)** relevant — für Klimatisierung, Prozesskühlung und Serverräume.

## Thermodynamisches Prinzip

Identisch mit der Wärmepumpe — nur der Nutzen liegt anders:

```
Verdampfer (kalt) → Verdichter → Verflüssiger (warm) → Expansionsventil → Verdampfer
  ↑                                    ↓
  Kühlleistung                    Abwärme (Rückkühler)
  (Nutzen)
```

| Grösse     | Wärmepumpe  | Kältemaschine |
|------------|-------------|----------------|
| Nutzen     | Verflüssiger (Heizung) | Verdampfer (Kühlung) |
| Abwärme    | Verdampfer (Quelle)    | Verflüssiger (Rückkühler) |
| Kennzahl   | COP         | EER / COP_c    |

## Leistungskennzahlen

### EER / COP (Momentan)

$$\text{EER} = \frac{Q_{Kalt}}{P_{el}}$$

- `Q_Kalt` = Kühlleistung [kW]
- `P_el` = aufgenommene Leistung [kW]
- **Typisch:** EER 3,0–6,0 (Kaltwassersatz bei Nennbedingungen)

**Normprüfpunkt** EN 14511: A35/W7 (Aussenluft 35 °C, Kaltwasser 7 °C)

### SEER (Seasonal EER)

Jahres-Wirkungsgrad nach EN 14825 — berücksichtigt Teillastbetrieb und Klimazone. Relevant für Energieausweis und F-Gase-Anforderungen.

### ESEER (European Seasonal EER)

Ältere Kennzahl mit 4 Betriebspunkten (100/75/50/25 % Last) — noch in vielen Ausschreibungen gefordert.

## Kältemittel

### HFKWs (F-Gase) — auslaufend

| Kältemittel | GWP    | Anwendung               | Status                    |
|-------------|--------|-------------------------|---------------------------|
| R134a       | 1430   | Kaltwassersätze, Kfz    | Phase-Down läuft          |
| R410A       | 2088   | Split-Klima, VRF        | Verboten ab 2025 (Neuanlagen) |
| R407C       | 1774   | Ersatz für R22          | Phase-Down                |
| R32         | 675    | Split-Klima (neu)       | Übergangs-Kältemittel     |

### Natürliche Kältemittel — Zukunft

| Kältemittel | GWP  | Anwendung                  | Besonderheit               |
|-------------|------|----------------------------|----------------------------|
| **R290** (Propan) | 3 | Split, kleine Chiller  | Brennbar (A3), Füllmengebegrenzt |
| **R744** (CO₂)    | 1 | Transkritische Systeme, Supermarkt | Hoher Betriebsdruck |
| **R717** (Ammoniak) | 0 | Industriekälte, grosse Chiller | Giftig (B2L), effizient |
| **R718** (Wasser) | 0 | Turbomaschinen > 200 kW   | Nur Hochtemperaturkühlung  |

> ⚠️ **F-Gase-Verordnung (EU):** Phase-Down von HFKWs bis 2050. Ab 2025 keine neuen Anlagen mit GWP > 750 in vielen Anwendungen. Schweiz: ChemRRV ähnlich.

## Anlagentypen

### Kaltwassersatz (Chiller)

- **Luftgekühlt:** Verflüssiger = Lamellenwärmetauscher mit Ventilatoren (kein Kühlturm nötig)
- **Wassergekühlt:** Verflüssiger = Plattenwärmetauscher, Wärmeabgabe über Rückkühlwerk
- Erzeugt **Kaltwasser** 6/12 °C (Standard) oder 10/16 °C (Kühldecken)
- Leistungsbereich: 10 kW bis mehrere MW

### Rückkühlung (wassergekühlt)

| Typ                | Beschreibung                                | Legionellen-Risiko |
|--------------------|---------------------------------------------|--------------------|
| **Trockenrückkühler** | Lamelle + Luft, kein Wasser in Kontakt mit Luft | Gering |
| **Nassrückkühler / Kühlturm** | Verdunstung, Aerosolbildung möglich | **Hoch** → VDI 2047 beachten! |
| **Hybridkühler**   | Trocken + Nass kombiniert                   | Mittel             |

> ⚠️ **Offene Kühltürme** (Nasskühler) sind nach VDI 2047-2 zu betreiben: regelmässige Wasseranalysen, Legionellen < 1000 KBE/100 ml, sonst Abschaltpflicht.

### DX-Anlage (Direct Expansion)

Kältemittel verdampft direkt im Raumgerät (kein Kaltwasser-Zwischenkreis):

| Typ         | Beschreibung                                    |
|-------------|-------------------------------------------------|
| **Split**   | Innen- + Aussengerät, 1:1, bis ~12 kW           |
| **Multi-Split** | 1 Aussengerät, mehrere Innengeräte         |
| **VRF/VRV** | Bis 64 Innengeräte pro Ausseneinheit, digitale Regelung, Bus-Protokoll |

### Free Cooling

Wenn Aussentemperatur < Kaltwassertemperatur: direkter Wärmetausch ohne Verdichter:

```
Kühllast → Kaltwassernetz → Trockenrückkühler → Aussenluft
```

- **Vollständiges Free Cooling:** 100 % Last ohne Verdichter
- **Teilweises Free Cooling (Economizer):** Verdichter läuft mit reduzierter Last
- **Break-even-Temperatur:** typisch Aussenluft < 10–14 °C je nach Anlage
- GA-Funktion: Umschaltlogik Free Cooling ↔ Maschinenkältebetrieb automatisieren

## Hydraulikschemata

### Kaltwassersystem mit Puffer

```
Chiller → Pufferspeicher → Verteiler → Verbraucher
                                   ├── Kühldecken (10/16 °C)
                                   ├── Klimalufttechnik (6/12 °C)
                                   └── Prozesskühlung
```

- **Primärkreis:** Chiller → Puffer (variabler Volumenstrom)
- **Sekundärkreis:** Puffer → Verbraucher (geregelter Volumenstrom per FU-Pumpe)
- **Mischer:** wenn verschiedene Temperaturebenen benötigt

## GA-Datenpunkte Kälteanlage

| Datenpunkt                     | Typ  | Beschreibung                           |
|--------------------------------|------|----------------------------------------|
| Betriebsart                    | Soll | Kühlen / Free-Cooling / Off / Standby  |
| Kaltwasser-Vorlauf Soll        | Soll | Sollwertvorgabe (z.B. 6 °C oder gleitend) |
| Kaltwasser-Vorlauf Ist         | Ist  | Rückmeldung                            |
| Kaltwasser-Rücklauf Ist        | Ist  | Temperatur Rücklauf                    |
| Verdichter Stufe / Frequenz    | Ist  | Laststufe oder FU-Frequenz             |
| Aktuelle Kühlleistung [kW]     | Ist  | Berechneter Wert (Δt × V̇ × cp)        |
| Kumulierte Kühlenergie [kWh]   | Ist  | Energiezähler                          |
| EER aktuell                    | Ist  | Berechneter Momentanwert               |
| Rückkühler Ventilatoren        | Ist  | Stufen oder Drehzahl                   |
| Hochdruckalarm                 | Ist  | Störmeldung                            |
| Niederdruckalarm               | Ist  | Störmeldung                            |
| Frostschutzalarm               | Ist  | Vorlauf < 4 °C → Notabschaltung        |
| Wartungsstunden                | Ist  | Betriebsstundenzähler                  |

## Gleitende Sollwertregelung (Chiller Reset)

Statt fixem Sollwert (z.B. immer 6 °C) wird der Kaltwasser-Sollwert **in Abhängigkeit der Last oder Aussentemperatur angehoben**:

```
Aussentemperatur 10 °C → Kaltwasser-Soll: 12 °C (EER steigt)
Aussentemperatur 35 °C → Kaltwasser-Soll: 6 °C (volle Last nötig)
```

**Energieeinsparung:** Jedes Kelvin höherer Verdampfungstemperatur verbessert EER um ~3 %.

## F-Gase-Pflichten (Betreiber)

| Füllmenge CO₂-Äquivalent | Pflicht                                |
|--------------------------|----------------------------------------|
| ≥ 5 t CO₂-Äq.           | Dichtheitsprüfung alle 12 Monate       |
| ≥ 50 t CO₂-Äq.          | Dichtheitsprüfung alle 6 Monate        |
| ≥ 500 t CO₂-Äq.         | Dichtheitsprüfung alle 3 Monate + Leckagedetektor |

**Beispiel:** 10 kg R410A (GWP 2088) = 20,88 t CO₂-Äquivalent → alle 12 Monate Prüfpflicht.

Logbuch führen, zertifizierter Kältetechniker für Wartung und Kältemittel-Handling.

## Normen

- **EN 14511** — Kältemaschinen und Wärmepumpen, Prüfbedingungen
- **EN 14825** — SEER/SCOP-Berechnung
- **EN 378** — Sicherheitstechnische Anforderungen, Kälteanlagen
- **EU F-Gase-Verordnung 517/2014** (Neufassung 2024) — Phase-Down HFKWs
- **ChemRRV** (CH) — Chemikalien-Risikoreduktions-Verordnung, Kältemittel
- **VDI 2047-2** — Hygiene von Verdunstungskühlanlagen (Kühltürme)

<!-- EN -->

## Refrigeration Systems — Fundamentals and BA

Refrigeration systems extract heat from an area and reject it to a heat sink. In BA **water chillers** and **direct expansion systems (DX/VRF)** are relevant — for air conditioning, process cooling and server rooms.

## Thermodynamic Principle

Identical to the heat pump — only the useful effect differs:

```
Evaporator (cold) → Compressor → Condenser (warm) → Expansion valve → Evaporator
  ↑                                    ↓
  Cooling output                  Rejected heat (dry cooler)
  (useful effect)
```

| Quantity | Heat pump | Chiller |
|---------|----------|---------|
| Useful effect | Condenser (heating) | Evaporator (cooling) |
| Rejected heat | Evaporator (source) | Condenser (dry cooler) |
| Performance metric | COP | EER / COP_c |

## Performance Metrics

### EER / COP (Instantaneous)

$$\text{EER} = \frac{Q_{cold}}{P_{el}}$$

- `Q_cold` = cooling output [kW]
- `P_el` = electrical input [kW]
- **Typical:** EER 3.0–6.0 (chiller at rated conditions)

**Standard test point** EN 14511: A35/W7 (outdoor air 35 °C, chilled water 7 °C)

### SEER (Seasonal EER)

Annual efficiency per EN 14825 — accounts for part-load operation and climate zone. Relevant for energy certificates and F-gas requirements.

### ESEER (European Seasonal EER)

Older metric with 4 operating points (100/75/50/25 % load) — still required in many specifications.

## Refrigerants

### HFCs (F-gases) — being phased out

| Refrigerant | GWP | Application | Status |
|------------|-----|------------|--------|
| R134a | 1430 | Chillers, automotive | Phase-down under way |
| R410A | 2088 | Split AC, VRF | Banned from 2025 (new systems) |
| R407C | 1774 | Replacement for R22 | Phase-down |
| R32 | 675 | Split AC (new) | Transitional refrigerant |

### Natural Refrigerants — the Future

| Refrigerant | GWP | Application | Special feature |
|------------|-----|------------|----------------|
| **R290** (Propane) | 3 | Split, small chillers | Flammable (A3), charge-limited |
| **R744** (CO₂) | 1 | Transcritical systems, supermarkets | High operating pressure |
| **R717** (Ammonia) | 0 | Industrial refrigeration, large chillers | Toxic (B2L), efficient |
| **R718** (Water) | 0 | Turbomachinery > 200 kW | High-temperature cooling only |

> **F-Gas Regulation (EU):** Phase-down of HFCs until 2050. From 2025 no new systems with GWP > 750 in many applications. Switzerland: ChemRRV similar.

## System Types

### Water Chiller

- **Air-cooled:** condenser = finned heat exchanger with fans (no cooling tower required)
- **Water-cooled:** condenser = plate heat exchanger, heat rejection via dry cooler
- Produces **chilled water** 6/12 °C (standard) or 10/16 °C (chilled ceilings)
- Output range: 10 kW to several MW

### Heat Rejection (water-cooled)

| Type | Description | Legionella risk |
|------|-------------|----------------|
| **Dry cooler** | Fins + air, no water contact with air | Low |
| **Wet cooler / cooling tower** | Evaporation, aerosol formation possible | **High** → follow VDI 2047! |
| **Hybrid cooler** | Dry + wet combined | Medium |

> **Open cooling towers** (wet coolers) must be operated to VDI 2047-2: regular water analysis, Legionella < 1000 CFU/100 ml, otherwise mandatory shutdown.

### DX System (Direct Expansion)

Refrigerant evaporates directly in the room unit (no chilled water intermediate circuit):

| Type | Description |
|------|-------------|
| **Split** | Indoor + outdoor unit, 1:1, up to ~12 kW |
| **Multi-split** | 1 outdoor unit, multiple indoor units |
| **VRF/VRV** | Up to 64 indoor units per outdoor unit, digital control, bus protocol |

### Free Cooling

When outdoor temperature < chilled water temperature: direct heat exchange without compressor:

```
Cooling load → chilled water network → dry cooler → outdoor air
```

- **Full free cooling:** 100 % load without compressor
- **Partial free cooling (economiser):** compressor runs at reduced load
- **Break-even temperature:** typically outdoor air < 10–14 °C depending on system
- BA function: automate switchover logic free cooling ↔ mechanical cooling

## Hydraulic Diagrams

### Chilled Water System with Buffer

```
Chiller → buffer tank → distribution → consumers
                                   ├── Chilled ceilings (10/16 °C)
                                   ├── Air handling units (6/12 °C)
                                   └── Process cooling
```

- **Primary circuit:** chiller → buffer (variable flow)
- **Secondary circuit:** buffer → consumers (controlled flow via VFD pump)
- **Mixing valve:** when different temperature levels are required

## BA Data Points Refrigeration System

| Data point | Type | Description |
|-----------|------|-------------|
| Operating mode | Setpoint | Cooling / free cooling / off / standby |
| Chilled water flow setpoint | Setpoint | e.g. 6 °C or sliding |
| Chilled water flow actual | Actual | Feedback |
| Chilled water return actual | Actual | Return temperature |
| Compressor stage / frequency | Actual | Load stage or VFD frequency |
| Current cooling output [kW] | Actual | Calculated (Δt × V̇ × cp) |
| Cumulative cooling energy [kWh] | Actual | Energy meter |
| EER current | Actual | Calculated instantaneous value |
| Dry cooler fans | Actual | Stages or speed |
| High pressure alarm | Actual | Fault |
| Low pressure alarm | Actual | Fault |
| Frost protection alarm | Actual | Flow < 4 °C → emergency shutdown |
| Maintenance hours | Actual | Operating hour meter |

## Sliding Setpoint Control (Chiller Reset)

Instead of a fixed setpoint (e.g. always 6 °C), the chilled water setpoint is **raised depending on load or outdoor temperature**:

```
Outdoor temperature 10 °C → chilled water setpoint: 12 °C (EER improves)
Outdoor temperature 35 °C → chilled water setpoint: 6 °C (full load required)
```

**Energy saving:** every kelvin higher evaporation temperature improves EER by ~3 %.

## F-Gas Obligations (Operator)

| Charge CO₂ equivalent | Obligation |
|-----------------------|-----------|
| ≥ 5 t CO₂-eq. | Leak check every 12 months |
| ≥ 50 t CO₂-eq. | Leak check every 6 months |
| ≥ 500 t CO₂-eq. | Leak check every 3 months + leak detector |

**Example:** 10 kg R410A (GWP 2088) = 20.88 t CO₂-eq. → annual check required.

Keep logbook; certified refrigeration technician required for maintenance and refrigerant handling.

## Standards

- **EN 14511** — Air conditioners, liquid chilling packages and heat pumps, test conditions
- **EN 14825** — SEER/SCOP calculation
- **EN 378** — Refrigerating systems and heat pumps, safety requirements
- **EU F-Gas Regulation 517/2014** (revised 2024) — HFC phase-down
- **ChemRRV** (CH) — Chemical Risk Reduction Ordinance, refrigerants
- **VDI 2047-2** — Hygiene of evaporative cooling systems (cooling towers)
