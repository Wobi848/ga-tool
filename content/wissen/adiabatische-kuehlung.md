---
title: Adiabatische Kühlung — Prinzip und Einsatzgrenzen
title_en: Adiabatic Cooling — Principle and Application Limits
slug: adiabatische-kuehlung
category: klima
subcategory: freie-kuehlung
tags:
  [
    adiabatische-kühlung,
    verdunstungskühlung,
    evaporative-cooling,
    zuluft-kühlung,
    wärmetauscher-vorkühlung,
    kühlgrenztemperatur,
    feuchtkugeltemperatur,
    ews,
    kühlenergie,
    recooler,
    rückkühler,
    verdunstung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, nachtauskuehlung, rlt-anlage, befeuchter, cop-eer, free-cooling]
norm: [EN 13053, VDI 3803, SIA 382.1]
updated: 2026-05-15
lang: de
---

# Adiabatische Kühlung — Prinzip und Einsatzgrenzen

Adiabatische Kühlung nutzt die **Verdunstungsenergie von Wasser** zur Luftkühlung — ohne Kältemaschine. Sie ist energieeffizient, aber nur bei trockener Aussenluft wirksam.

## Physikalisches Grundprinzip

```
Wasser verdunstet → entzieht der Luft Energie (Verdampfungswärme)
→ Luft kühlt sich ab, Feuchtegehalt steigt

Verdampfungswärme Wasser: ca. 2500 kJ/kg (bei 20 °C)

Beispiel:
  Zustand A: 32 °C, 20 % rF, h = 50 kJ/kg
  Wasser verdunstet adiabat (kein Wärmetausch mit Umgebung)
  Zustand B: 22 °C, 60 % rF, h = 50 kJ/kg (Enthalpie gleich!)

  → 10 K Abkühlung, aber 40 % mehr Feuchte
```

**Kühlgrenztemperatur (Feuchtkugeltemperatur Tw):** Die minimale erreichbare Temperatur:

```
Tw = T − (T − Td) × (1 − rF/100)
Grob: Tw ≈ T × (0.62 × rF/100)^0.52   [Magnus-Näherung]
```

---

## Typen der adiabatischen Kühlung

### 1. Direktkühlung (Direkte Evaporativkühlung)

Wasser wird direkt in die Zuluft verdunstet:

```
Zuluft 32 °C, 20 % rF
    → Wassersprühdüsen oder Befeuchterpads
    → Zuluft 22 °C, 60 % rF
```

- Einfach, günstig
- Luft wird feuchter → nur für trockene Klimazonen oder RLT mit Nachkühlung
- Hygiene-Problematik (wie Befeuchter → VDI 6022)

### 2. Indirekte Evaporativkühlung

Adiabatische Kühlung auf der **Abluft-Seite** eines Wärmetauschers:

```
Abluft (25 °C, 55 % rF)
    → adiabatisch befeuchtet → 18 °C, 100 % rF
    → kühlt Zuluft über Plattenwärmetauscher ohne direkte Befeuchtung

Zuluft bleibt trocken → keine Feuchteerhöhung auf Zuluftseite
```

- Besser für Anwendungen wo trockene Zuluft gewünscht
- Wirkungsgrad 40–70 %

### 3. Rückkühler-Vorkühlung (Recooler)

Adiabatische Kühlung des Rückkühlwassers für Kältemaschine:

```
Rückkühlwasser 30 °C (Kondensatorseite)
    → Sprühnebelkühlung am Rückkühler
    → Rückkühlwasser 24 °C
    → COP der Kältemaschine steigt deutlich

Einsatz: Spitzenlasttage wenn Luft trocken und heiss
```

---

## Effizienzvergleich

| Methode                     | COP / Einsparpotenzial     | Einschränkung                   |
| --------------------------- | -------------------------- | ------------------------------- |
| Kältemaschine               | COP 2.5–4.5                | Referenz, immer möglich         |
| Direkte Evaporativkühlung   | COP 20–50                  | Nur trocken < 40 % rF           |
| Indirekte Evaporativkühlung | COP 10–30                  | Trocken < 50 % rF               |
| Rückkühler-Vorkühlung       | +20–40 % Kältemaschine COP | Spitzenlasttage, trocken        |
| Nachtauskühlung             | COP > 100 (Lüfterenergie)  | Nur nachts, Speichermasse nötig |

---

## Einsatzgrenzen

```
Kühlgrenztemperatur-Analyse für Standort Zürich:
  Sommerdesigntag: 32 °C, 35 % rF → Tw = 21.5 °C

  Direkte Kühlung erreichbar bis: ~22 °C Zuluft
  Für Bürokühlung (Zuluft 16–18 °C) → nicht ausreichend

  → Adiabatische Kühlung als Teilkühlung, Restlast = Kältemaschine
  → Oder: Vorkühlung reduziert Kälteleistungsbedarf um 30–50 %
```

**Kritische Klimazonen:**

| Klima           | Adiabatische Kühlung | Begründung            |
| --------------- | -------------------- | --------------------- |
| Trocken/heiss   | Sehr geeignet        | Grosses Δ(T - Tw)     |
| Mitteleuropas   | Bedingt geeignet     | Im Sommer 40–60 % rF  |
| Feucht/tropisch | Nicht geeignet       | Tw ≈ T, keine Kühlung |

---

## Hygiene und Betrieb

Adiabatische Kühlung mit Wassereinbringung birgt **Hygiene-Risiken (Legionellen)**:

```
Schutzmassnahmen:
  1. Betriebswasser: Trinkwasserqualität oder Umkehrosmose
  2. Temperatur: Wassertemperatur nicht > 20 °C im Lager
  3. Stagnation: Tägliche Spülung, keine stehenden Wassertaschen
  4. Desinfektion: UV-Anlage oder periodische Dosierung
  5. Regelmässige Probenentnahme (Legionellen < 100 KBE/100 ml)
```

---

## GA-Integration

```
Freigabebedingungen adiabatische Kühlung:
  T_Aussen > 27 °C
  UND rF_Aussen < 50 %
  UND Kältemaschine läuft / Kälteleistungsbedarf aktiv

Abschalten wenn:
  T_Aussen < 25 °C (unnötig)
  ODER rF_Aussen > 65 % (unwirksam und Hygienerisiko)
  ODER Frost (Verstopfungsgefahr)
```

**GA-Datenpunkte:**

| Datenpunkt              | Typ | Einheit | Beschreibung            |
| ----------------------- | --- | ------- | ----------------------- |
| Adiabatik Freigabe      | DO  | —       | Pumpe / Sprühanlage EIN |
| Wassertemperatur Vorrat | AI  | °C      | Hygiene-Monitoring      |
| Wasserverbrauch         | AI  | l/h     | Monitoring              |
| T_Aussen                | AI  | °C      | Freigabebedingung       |
| rF_Aussen               | AI  | %       | Freigabebedingung       |

---

## Normen

- **EN 13053** — Zentrale RLT-Anlagen (Befeuchtung / indirekte Evaporativkühlung)
- **VDI 3803** — Raumlufttechnik, Energieverbrauch, adiabatische Kühlung
- **SIA 382.1** — Lüftungs- und Klimaanlagen (freie Kühlungsstrategien)

<!-- EN -->

Adiabatic cooling uses the **evaporation energy of water** to cool air — without a mechanical chiller. It is energy-efficient, but only effective when outdoor air is dry.

## Physical Principle

```
Water evaporates → extracts energy from the air (latent heat of evaporation)
→ Air cools down, moisture content rises

Latent heat of evaporation of water: approx. 2,500 kJ/kg (at 20 °C)

Example:
  State A: 32 °C, 20% RH, h = 50 kJ/kg
  Water evaporates adiabatically (no heat exchange with surroundings)
  State B: 22 °C, 60% RH, h = 50 kJ/kg (enthalpy unchanged!)

  → 10 K cooling, but 40% higher humidity
```

**Wet-bulb temperature (Tw):** The minimum achievable temperature:

```
Tw = T − (T − Td) × (1 − RH/100)
Approx: Tw ≈ T × (0.62 × RH/100)^0.52   [Magnus approximation]
```

---

## Types of Adiabatic Cooling

### 1. Direct Evaporative Cooling

Water is evaporated directly into the supply air:

```
Supply air 32 °C, 20% RH
    → Water spray nozzles or evaporative pads
    → Supply air 22 °C, 60% RH
```

- Simple, low cost
- Air becomes more humid → suitable only for dry climates or AHUs with post-cooling
- Hygiene concerns (like humidifiers → VDI 6022)

### 2. Indirect Evaporative Cooling

Adiabatic cooling applied to the **exhaust air side** of a heat exchanger:

```
Exhaust air (25 °C, 55% RH)
    → adiabatically humidified → 18 °C, 100% RH
    → cools supply air via plate heat exchanger without direct humidification

Supply air remains dry → no humidity increase on the supply side
```

- Better for applications where dry supply air is desired
- Effectiveness 40–70%

### 3. Cooler Pre-Cooling (Recooler)

Adiabatic cooling of the recooling water for the chiller:

```
Recooling water 30 °C (condenser side)
    → spray mist cooling at the recooler
    → Recooling water 24 °C
    → Chiller COP improves significantly

Application: peak load days when air is dry and hot
```

---

## Efficiency Comparison

| Method                       | COP / Savings Potential     | Limitation                        |
| ---------------------------- | --------------------------- | --------------------------------- |
| Mechanical chiller           | COP 2.5–4.5                 | Reference, always possible        |
| Direct evaporative cooling   | COP 20–50                   | Only dry < 40% RH                 |
| Indirect evaporative cooling | COP 10–30                   | Dry < 50% RH                      |
| Recooler pre-cooling         | +20–40% chiller COP         | Peak load days, dry conditions    |
| Night cooling                | COP > 100 (fan energy only) | Night only, thermal mass required |

---

## Application Limits

```
Wet-bulb temperature analysis for Zurich:
  Summer design day: 32 °C, 35% RH → Tw = 21.5 °C

  Direct cooling achievable down to: ~22 °C supply air
  For office cooling (supply air 16–18 °C) → insufficient

  → Adiabatic cooling as partial cooling; remaining load = chiller
  → Or: pre-cooling reduces chiller capacity demand by 30–50%
```

**Critical climate zones:**

| Climate          | Adiabatic Cooling      | Reason                    |
| ---------------- | ---------------------- | ------------------------- |
| Hot and dry      | Very suitable          | Large Δ(T − Tw)           |
| Central European | Conditionally suitable | 40–60% RH in summer       |
| Humid / tropical | Not suitable           | Tw ≈ T, no cooling effect |

---

## Hygiene and Operation

Adiabatic cooling with water introduction carries **hygiene risks (Legionella)**:

```
Protective measures:
  1. Process water: drinking water quality or reverse osmosis
  2. Temperature: water storage temperature not > 20 °C
  3. Stagnation: daily flushing, no standing water pockets
  4. Disinfection: UV system or periodic dosing
  5. Regular sampling (Legionella < 100 CFU/100 ml)
```

---

## BA Integration

```
Enable conditions for adiabatic cooling:
  T_outdoor > 27 °C
  AND RH_outdoor < 50%
  AND chiller running / cooling load active

Disable when:
  T_outdoor < 25 °C (unnecessary)
  OR RH_outdoor > 65% (ineffective and hygiene risk)
  OR frost (risk of blockage)
```

**BA data points:**

| Data point               | Type | Unit | Description            |
| ------------------------ | ---- | ---- | ---------------------- |
| Adiabatic enable         | DO   | —    | Pump / spray system ON |
| Water temperature (tank) | AI   | °C   | Hygiene monitoring     |
| Water consumption        | AI   | l/h  | Monitoring             |
| T_outdoor                | AI   | °C   | Enable condition       |
| RH_outdoor               | AI   | %    | Enable condition       |

---

## Standards

- **EN 13053** — Central AHU systems (humidification / indirect evaporative cooling)
- **VDI 3803** — HVAC systems, energy consumption, adiabatic cooling
- **SIA 382.1** — Ventilation and air conditioning systems (free cooling strategies)
