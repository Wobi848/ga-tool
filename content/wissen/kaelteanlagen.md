---
title: Kälteanlagen — Grundlagen & GA
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
