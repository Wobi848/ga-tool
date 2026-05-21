---
title: Wärmerückgewinnung (WRG) in Lüftungsanlagen
title_en: Heat Recovery (HR) in Ventilation Systems
slug: waermerueckgewinnung
category: lueftung
subcategory: energie
tags:
  [
    wrg,
    wärmerückgewinnung,
    rotationstauscher,
    plattentauscher,
    kreislaufverbund,
    wärmerohr,
    wirkungsgrad,
    temperaturänderungsgrad,
    frost,
    bypass,
    gegenstrom,
    gleichstrom,
    kreuzstrom,
    rlt,
    hygiene
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vdi6022, frequenzumrichter, kaelteanlagen]
norm: [EN 13053, EN 308, SIA 382.1]
updated: 2026-05-14
lang: de
---

# Wärmerückgewinnung (WRG) in Lüftungsanlagen

Die **Wärmerückgewinnung** ist eine der wirkungsvollsten Energiesparmassnahmen in Lüftungsanlagen. Bis zu 85 % der Energie aus der Abluft kann zurückgewonnen werden — damit reduziert sich der Heizenergiebedarf der Lüftung dramatisch.

## Grundprinzip

```
Aussenluft (ODA) −10 °C  →  [WRG]  →  +15 °C Zuluft (Vorwärmung)
Abluft (ETA)     +22 °C  →  [WRG]  →  Fortluft (EHA) kühler
```

Die Abluft gibt ihre Wärme an die Aussenluft ab — ohne dass die Luftströme sich vermischen (ausser Rotationstauscher mit minimalem Übertrag).

## Leistungskennzahl: Temperaturänderungsgrad

```
ηT = (T_Zuluft_nach_WRG − T_Aussenluft) / (T_Abluft − T_Aussenluft) × 100 %
```

**Beispiel:** T_Außen = −5 °C, T_Abluft = 22 °C, T_Zuluft nach WRG = 18 °C

```
ηT = (18 − (−5)) / (22 − (−5)) × 100 % = 23 / 27 × 100 % = **85 %**
```

---

## Typen und Vergleich

### 1. Rotationstauscher (Drehrad)

```
        ↑ Abluft (ETA)
    ┌───┤                ├───┐
    │   │   Rotor dreht  │   │
    └───┤                ├───┘
        ↓ Aussenluft (ODA)
    → Abluft gibt Wärme an Rotor ab, Rotor dreht in Aussenluft → übergibt Wärme
```

**Eigenschaften:**

- Wirkungsgrad: **70–85 %**
- Feuchtewärme möglich (hygroskopisches Adsorbens)
- **Nachteil:** Geringe Überströmung (1–3 %) — Hygieneanforderung prüfen! (VDI 6022 Klasse A kritisch)
- Frostschutz: Drehzahl reduzieren oder Umluft-Bypass

### 2. Platten-Wärmetauscher (Kreuzgegenstrom)

```
    Abluft →→→→→→→→→→
                    ↕ (kein Kontakt, nur Wärmeleitung durch Blechwände)
    ← Zuluft ←←←←←←←
```

**Eigenschaften:**

- Wirkungsgrad: **55–75 %** (Kreuzstrom), bis 85 % (Gegenstrom)
- **Keine Überströmung** → hygienisch einwandfrei
- Kondensatbildung bei tiefen Temperaturen (→ Kondensatwanne + Ablauf vorsehen)
- **Frostschutz wichtig:** Kondensat gefriert → Vereisung → Leistungsverlust → Bypass aktivieren
- Einfach, wartungsarm, weit verbreitet

### 3. Kreislaufverbund (Wasser-Kreislauf)

```
Abluft → [Kühler A] → Fortluft
              ↑ Wasser-Kreislauf (Pumpe)
Aussenluft → [Erhitzer B] → Zuluft
```

**Eigenschaften:**

- Wirkungsgrad: **45–65 %** (geringer wegen 2 Wärmetauschern)
- **Kein Luftkontakt** möglich: ideal wenn Zuluft und Abluft weit getrennt sind
- Einsatz: Trennung von Gebäudeteilen, Renovierungen
- Frostschutz: Frostschutzmittel im Wasser (Glykol-Wasser-Gemisch)

### 4. Wärmerohr (Heat Pipe)

- Wärmerohr mit Kältemittel füllt sich auf warmer Seite (Abluft) und kondensiert auf kalter Seite (Aussenluft)
- Wirkungsgrad: **50–65 %**
- Keine beweglichen Teile — sehr wartungsarm
- Nur sensible Wärme (keine Feuchteübertragung)

---

## Vergleich auf einen Blick

| Typ               | Wirkungsgrad | Feuchteübertragung | Überströmung | Einsatz                      |
| ----------------- | ------------ | ------------------ | ------------ | ---------------------------- |
| Rotor             | 70–85 %      | Ja (optional)      | Minimal      | Standardfall, Komfort        |
| Platte Kreuzstrom | 55–75 %      | Nein               | Keine        | Hygiene-sensitiv             |
| Platte Gegenstrom | 75–85 %      | Nein               | Keine        | Hoher Wirkungsgrad gewünscht |
| Kreislaufverbund  | 45–65 %      | Nein               | Keine        | Getrennte Gebäudeteile       |
| Wärmerohr         | 50–65 %      | Nein               | Keine        | Wartungsarme Lösung          |

---

## Frostschutzstrategien

| Strategie              | Typ              | Beschreibung                              |
| ---------------------- | ---------------- | ----------------------------------------- |
| **Bypass-Klappe**      | Alle             | ODA am WRG vorbeiführen → kein Einfrieren |
| **Vorwärmung ODA**     | Alle             | Elektrischer oder WW-Erhitzer vor WRG     |
| **Rotorverlangsamung** | Rotor            | Weniger Wärmeübertrag → weniger Kondensat |
| **Abluft-Bypass**      | Platte           | Warme Abluft erwärmt WRG periodisch       |
| **Glykol-Wasser**      | Kreislaufverbund | Tiefere Einfrierpunkt-Temperatur          |

**Frostschutz-Grenzwert:** Sobald Abluft-Taupunkt unterschritten → Kondensat gefriert. Typisch: WRG-Bypass aktivieren ab ODA < −8 °C bis −15 °C (je nach System).

---

## WRG im Sommerbetrieb

Im Sommer dreht die WRG die Funktion um: Heisse Aussenluft wird durch die kühlere Abluft vorgekühlt:

```
Aussenluft 32 °C → [WRG] → 24 °C Zuluft (vorgekühlt)
Abluft 25 °C → Fortluft 33 °C
```

Wenn die Aussenluft kühler als die Abluft ist (z.B. kühle Nacht, freie Kühlung) → WRG optimal nutzen. Bypass aktivieren wenn ODA kühler als Raumtemperatur → direkte freie Kühlung.

---

## GA-Datenpunkte WRG

| Datenpunkt              | Typ | Beschreibung                                    |
| ----------------------- | --- | ----------------------------------------------- |
| ODA-Temperatur          | AI  | Vor WRG                                         |
| Zuluft nach WRG         | AI  | WRG-Wirkungsgrad berechnen                      |
| ETA-Temperatur          | AI  | Abluft-Eingang WRG                              |
| EHA-Temperatur          | AI  | Fortluft-Ausgang                                |
| WRG-Bypass-Klappe       | AO  | 0–100 %, Frostschutz                            |
| Rotor-Drehzahl          | AO  | 0–10 V (bei Rotor)                              |
| Frostschutz-Alarm       | DI  | Bei Eisbildung                                  |
| Temperaturänderungsgrad | AV  | Berechnet: (T_Zuluft − T_ODA) / (T_ETA − T_ODA) |

## Normen

- **EN 13053** — Lüftung von Gebäuden, Zentrale Lüftungsgeräte
- **EN 308** — Wärmeaustauscher, Prüfverfahren für Leistungsnachweis
- **SIA 382.1** — Lüftungs- und Klimaanlagen
- **VDI 6022** — Hygieneanforderungen (Rotationstauscher Klasse A: restriktiv)

<!-- EN -->

**Heat recovery** is one of the most effective energy-saving measures in ventilation systems. Up to 85 % of the energy from extract air can be recovered — dramatically reducing the heating energy demand for ventilation.

## Basic Principle

```
Outdoor air (ODA) −10 °C  →  [HR]  →  +15 °C supply air (pre-heated)
Extract air (ETA) +22 °C  →  [HR]  →  Exhaust air (EHA) cooler
```

The extract air transfers its heat to the outdoor air — without the two airstreams mixing (except for rotary heat exchangers with minimal carryover).

## Performance Indicator: Temperature Efficiency

```
ηT = (T_supply_after_HR − T_outdoor) / (T_extract − T_outdoor) × 100 %
```

**Example:** T_outdoor = −5 °C, T_extract = 22 °C, T_supply after HR = 18 °C

```
ηT = (18 − (−5)) / (22 − (−5)) × 100 % = 23 / 27 × 100 % = 85 %
```

---

## Types and Comparison

### 1. Rotary Heat Exchanger (Thermal Wheel)

```
        ↑ Extract air (ETA)
    ┌───┤                ├───┐
    │   │   Rotor turns  │   │
    └───┤                ├───┘
        ↓ Outdoor air (ODA)
    → Extract air heats rotor; rotor turns into outdoor air → transfers heat
```

**Characteristics:**

- Efficiency: **70–85 %**
- Latent heat recovery possible (hygroscopic adsorbent)
- **Disadvantage:** Minor carryover (1–3 %) — check hygiene requirements! (VDI 6022 Class A: critical)
- Frost protection: reduce speed or recirculation bypass

### 2. Plate Heat Exchanger (Cross-Counterflow)

```
    Extract air →→→→→→→→→→
                        ↕ (no contact, heat conduction through metal plates only)
    ← Supply air ←←←←←←←
```

**Characteristics:**

- Efficiency: **55–75 %** (cross-flow), up to 85 % (counterflow)
- **No carryover** → hygienically clean
- Condensate forms at low temperatures (→ provide condensate tray + drain)
- **Frost protection important:** condensate freezes → icing → performance loss → activate bypass
- Simple, low-maintenance, widely used

### 3. Run-Around Coil (Water Circuit)

```
Extract air → [Cooler A] → Exhaust air
                  ↑ Water circuit (pump)
Outdoor air → [Heater B] → Supply air
```

**Characteristics:**

- Efficiency: **45–65 %** (lower due to two heat exchangers)
- **No air contact** possible: ideal when supply and extract air are physically separated
- Application: separating building sections, retrofits
- Frost protection: antifreeze in water (glycol-water mixture)

### 4. Heat Pipe

- Heat pipe filled with refrigerant absorbs heat on warm side (extract air) and condenses on cool side (outdoor air)
- Efficiency: **50–65 %**
- No moving parts — very low maintenance
- Sensible heat only (no moisture transfer)

---

## Comparison at a Glance

| Type               | Efficiency | Moisture transfer | Carryover | Application                 |
| ------------------ | ---------- | ----------------- | --------- | --------------------------- |
| Rotary wheel       | 70–85 %    | Yes (optional)    | Minimal   | Standard, comfort           |
| Plate cross-flow   | 55–75 %    | No                | None      | Hygiene-sensitive           |
| Plate counter-flow | 75–85 %    | No                | None      | High efficiency required    |
| Run-around coil    | 45–65 %    | No                | None      | Separated building sections |
| Heat pipe          | 50–65 %    | No                | None      | Low-maintenance solution    |

---

## Frost Protection Strategies

| Strategy                  | Type       | Description                               |
| ------------------------- | ---------- | ----------------------------------------- |
| **Bypass damper**         | All        | Route ODA around HR → no freezing         |
| **ODA pre-heating**       | All        | Electric or HW heater before HR           |
| **Rotor speed reduction** | Rotary     | Less heat transfer → less condensate      |
| **Extract air bypass**    | Plate      | Warm extract air periodically re-heats HR |
| **Glycol-water**          | Run-around | Lower freezing point temperature          |

**Frost protection threshold:** Once extract air dew point is undercut → condensate freezes. Typically: activate HR bypass below ODA < −8 °C to −15 °C (system-dependent).

---

## HR in Summer Operation

In summer, the HR reverses its function: hot outdoor air is pre-cooled by the cooler extract air:

```
Outdoor air 32 °C → [HR] → 24 °C supply air (pre-cooled)
Extract air 25 °C → Exhaust air 33 °C
```

When outdoor air is cooler than extract air (e.g. cool night, free cooling) → make optimal use of HR. Activate bypass when ODA is cooler than room temperature → direct free cooling.

---

## BA Data Points — HR

| Data point             | Type | Description                                      |
| ---------------------- | ---- | ------------------------------------------------ |
| ODA temperature        | AI   | Before HR                                        |
| Supply air after HR    | AI   | For calculating HR efficiency                    |
| ETA temperature        | AI   | Extract air inlet to HR                          |
| EHA temperature        | AI   | Exhaust air outlet                               |
| HR bypass damper       | AO   | 0–100 %, frost protection                        |
| Rotor speed            | AO   | 0–10 V (rotary type)                             |
| Frost protection alarm | DI   | On ice formation                                 |
| Temperature efficiency | AV   | Calculated: (T_supply − T_ODA) / (T_ETA − T_ODA) |

## Standards

- **EN 13053** — Ventilation of buildings, central air handling units
- **EN 308** — Heat exchangers, test procedures for performance assessment
- **SIA 382.1** — Ventilation and air conditioning systems
- **VDI 6022** — Hygiene requirements (rotary exchanger Class A: restrictive)
