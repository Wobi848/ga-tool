---
title: Kesselregelung — Modulierend, gleitend, zweistufig
title_en: Boiler Control — Modulating, Sliding and Two-Stage
slug: kesselregelung
category: heizung
subcategory: kessel
tags: [kesselregelung, modulierend, zweistufig, gleitend, brenner, therme, rücklauftemperatur, taupunkt, kondensation, heizwert, brennwert, kesselkreis, mischer, vorlauftemperatur, abgasverlust]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizkurve, heizung-grundlagen, pufferspeicher, hydraulische-schaltungen, kaskadenregelung]
norm: [EN 303, EN 12953, BImSchV, ÖNORM H 5170, SIA 384.201]
updated: 2026-05-15
lang: de
---

# Kesselregelung — Modulierend, gleitend, zweistufig

Die Kesselregelung bestimmt Vorlauftemperatur und Brennerleistung. Modernes Ziel: maximale Effizienz durch niedrige Kesseltemperatur und Kondensationsbetrieb.

## Brenner-Typen und Regelungsarten

### Einstufiger Brenner

```
Brenner: EIN oder AUS
  Takt: z.B. 10 min EIN / 5 min AUS

Nachteil:
  Hohe Taktzahl → Verschleiss
  Stets volle Leistung → Übertemperatur → Abtaktverluste
```

### Zweistufiger Brenner

```
Stufe 1 (Grundlast): 60 % Leistung
Stufe 2 (Volllast): 100 % Leistung

Regelung:
  Kesseltemperatur < Soll − 5 K: Stufe 1 einschalten
  Kesseltemperatur < Soll − 10 K: Stufe 2 einschalten
  Kesseltemperatur > Soll: AUS
```

### Modulierender Brenner (Modulating)

```
Leistungsbereich: 20–100 % (Modulationsbereich 1:5)
  
Regelung:
  Kesseltemperatur − Sollwert = Δ
  PID → Leistungssignal 20–100 %
  
Vorteil:
  Kein Takten, konstante Temperatur
  Besserer Wirkungsgrad im Teillastbetrieb
  Kondensationsbetrieb möglich (Abgastemperatur < 57 °C)
```

---

## Gleitende Kesselregelung (Witterungsgeführt)

Der Kessel-Sollwert wird aus der Aussentemperatur berechnet:

```
T_Kessel_Soll = f(T_Aussen)

Beispiel:
  T_Aussen = 0 °C   → T_Kessel = 70 °C
  T_Aussen = 10 °C  → T_Kessel = 55 °C
  T_Aussen = 20 °C  → T_Kessel = 40 °C (Grenztemperatur → Abschalten)
  
Vorteil: Kessel läuft immer auf minimaler nötiger Temperatur
→ Längere Brennerdauer pro Takt (weniger Taktverluste)
→ Bei Brennwertkesseln: mehr Kondensationsbetrieb
```

---

## Brennwert vs. Heizwert

```
Heizwert Hi: Energie ohne Kondensationswärme des Abgases
Brennwert Hs: Energie + Kondensationswärme (ca. +11 % bei Erdgas)

Kondensation tritt auf wenn:
  T_Abgas < Taupunkt Abgas ≈ 57 °C (bei Erdgas)
  
→ Brennwertkessel: Abgastemperatur absichtlich < 57 °C
→ Wirkungsgrad bezogen auf Hi: 95–109 %
→ Nur möglich mit tiefen Rücklauftemperaturen (< 50 °C)
```

**Rücklauftemperatur-Einfluss:**

| RL-Temperatur | Kondensation   | Wirkungsgrad |
|---------------|----------------|--------------|
| 30 °C         | Stark          | 107–109 %    |
| 45 °C         | Teilweise      | 103–105 %    |
| 55 °C         | Grenzbereich   | 100 %        |
| 70 °C         | Keine          | 93–95 %      |

---

## Kesselmindesttemperatur und Taupunktschutz

**Problem:** Bei zu tiefer Kesseltemperatur: Korrosion durch Säurekondensation (Heizwertkessel, Ölkessel).

```
Taupunktschutz:
  Heizwertkessel Öl: T_Kessel_min = 60–65 °C
  Heizwertkessel Gas: T_Kessel_min = 55 °C
  Brennwertkessel:    keine Mindesttemperatur (säurefest)
  
GA-Umsetzung:
  Wenn T_Kessel < T_min → Rücklaufbeimischung sperren
  → Kessel-Rücklauf = Kesselbeipass (Hochtemperaturrücklauf)
```

---

## Kaskadenregelung mehrerer Kessel

Grosse Anlagen mit mehreren Kesseln:

```
Wärmebedarf 500 kW, 3 Kessel à 200 kW:

  Leistung < 200 kW: Kessel 1 modulierend
  Leistung > 180 kW: Kessel 2 zuschalten
  Leistung > 380 kW: Kessel 3 zuschalten
  
Führungswechsel:
  Stunden-Zähler → Führungskessel wechselt täglich
  → gleichmässiger Verschleiss, Redundanz
  
Sperrsignal:
  Kessel 1 Störung → automatisch Kessel 2 übernimmt
```

---

## GA-Datenpunkte Kesselanlage

| Datenpunkt                 | Typ | Einheit | Beschreibung                  |
|----------------------------|-----|---------|-------------------------------|
| Kesseltemperatur VL Ist    | AI  | °C      | Vorlauf Kessel                |
| Kesseltemperatur RL Ist    | AI  | °C      | Rücklauf (Taupunktschutz)     |
| Kessel-Sollwert            | AV  | °C      | Vorgabe gleitend              |
| Brenner Freigabe           | DO  | —       | Freigabe EIN/AUS              |
| Brenner Leistungssignal    | AO  | %       | 0–10 V modulierend            |
| Brenner Betrieb            | DI  | —       | Laufmeldung                   |
| Brenner Störung            | DI  | —       | Übertemperatur, Abschaltung   |
| Gasventil Störung          | DI  | —       | Gasversorgung                 |
| Abgastemperatur            | AI  | °C      | Effizienz-Monitoring          |
| Wärmemenge Kessel          | AI  | kWh     | Zähler                        |

---

## Abgasverlust-Monitoring

```
Abgasverlust nach Siegert (näherungsweise):

  q_A = (q_CO2_max / q_CO2 − 1) × (t_A − t_L) × A2
  
  Vereinfacht: je 1 K Abgastemperatur > Optimum → ~0.3 % mehr Verlust
  
  Optimale Abgastemperatur Erdgas: 80–120 °C (Heizwert) / < 57 °C (Brennwert)
```

---

## Normen

- **EN 303** — Heizkessel (Gas- und Ölbrenner)
- **BImSchV (DE)** — Emissionsgrenzwerte, Abgasmessungen
- **SIA 384.201** — Heizungsanlagen (Auslegung, Kessel)
- **ÖNORM H 5170** — Kesselanlagen, Betrieb, Wartung

<!-- EN -->

## Boiler Control — Modulating, Sliding and Two-Stage

Boiler control determines flow temperature and burner output. The modern goal is maximum efficiency through low boiler temperature and condensing operation.

## Burner Types and Control Modes

### Single-Stage Burner

```
Burner: ON or OFF
  Cycling: e.g. 10 min ON / 5 min AUS

Disadvantage:
  High cycle count → wear
  Always full output → overtemperature → cyclic losses
```

### Two-Stage Burner

```
Stage 1 (base load): 60 % output
Stage 2 (full load): 100 % output

Control:
  Boiler temperature < setpoint − 5 K: switch on stage 1
  Boiler temperature < setpoint − 10 K: switch on stage 2
  Boiler temperature > setpoint: OFF
```

### Modulating Burner

```
Output range: 20–100 % (modulation ratio 1:5)
  
Control:
  Boiler temperature − setpoint = Δ
  PID → output signal 20–100 %
  
Advantage:
  No cycling, constant temperature
  Better part-load efficiency
  Condensing operation possible (flue gas temp < 57 °C)
```

---

## Sliding Boiler Control (Weather-Compensated)

The boiler setpoint is calculated from outdoor temperature:

```
T_boiler_setpoint = f(T_outdoor)

Example:
  T_outdoor = 0 °C   → T_boiler = 70 °C
  T_outdoor = 10 °C  → T_boiler = 55 °C
  T_outdoor = 20 °C  → T_boiler = 40 °C (limit → switch off)
  
Advantage: boiler always runs at the minimum required temperature
→ Longer burner run time per cycle (fewer cyclic losses)
→ In condensing boilers: more condensing operation
```

---

## Condensing vs. Standard (Gross/Net Calorific Value)

```
Net calorific value Hi: energy without condensation heat from flue gas
Gross calorific value Hs: energy + condensation heat (~+11 % for natural gas)

Condensation occurs when:
  T_flue gas < dew point of flue gas ≈ 57 °C (natural gas)
  
→ Condensing boiler: flue gas temperature intentionally < 57 °C
→ Efficiency based on Hi: 95–109 %
→ Only possible with low return temperatures (< 50 °C)
```

**Return temperature influence:**

| Return temp | Condensation | Efficiency |
|------------|-------------|-----------|
| 30 °C | Intensive | 107–109 % |
| 45 °C | Partial | 103–105 % |
| 55 °C | Borderline | 100 % |
| 70 °C | None | 93–95 % |

---

## Minimum Boiler Temperature and Dew Point Protection

**Problem:** Boiler temperature too low → corrosion from acid condensation (non-condensing boilers, oil boilers).

```
Dew point protection:
  Non-condensing oil boiler: T_boiler_min = 60–65 °C
  Non-condensing gas boiler: T_boiler_min = 55 °C
  Condensing boiler:         no minimum temperature (acid-resistant)
  
BA implementation:
  If T_boiler < T_min → block return blending
  → Boiler return = boiler bypass (high-temperature return)
```

---

## Cascade Control of Multiple Boilers

Large systems with multiple boilers:

```
Heat demand 500 kW, 3 boilers × 200 kW:

  Demand < 200 kW: boiler 1 modulating
  Demand > 180 kW: bring on boiler 2
  Demand > 380 kW: bring on boiler 3
  
Lead rotation:
  Hour counter → lead boiler changes daily
  → Even wear, redundancy
  
Lock-out signal:
  Boiler 1 fault → boiler 2 takes over automatically
```

---

## BA Data Points Boiler System

| Data point | Type | Unit | Description |
|-----------|------|------|-------------|
| Boiler flow temp actual | AI | °C | Boiler flow |
| Boiler return temp actual | AI | °C | Return (dew point protection) |
| Boiler setpoint | AV | °C | Sliding setpoint |
| Burner enable | DO | — | Enable ON/OFF |
| Burner output signal | AO | % | 0–10 V modulating |
| Burner running | DI | — | Run status |
| Burner fault | DI | — | Overtemperature, lockout |
| Gas valve fault | DI | — | Gas supply |
| Flue gas temperature | AI | °C | Efficiency monitoring |
| Boiler heat quantity | AI | kWh | Meter |

---

## Flue Gas Loss Monitoring

```
Flue gas loss after Siegert (approximation):

  q_A = (q_CO2_max / q_CO2 − 1) × (t_A − t_L) × A2
  
  Simplified: every 1 K flue gas temp above optimum → ~0.3 % more loss
  
  Optimum flue gas temperature natural gas: 80–120 °C (standard) / < 57 °C (condensing)
```

---

## Standards

- **EN 303** — Heating boilers (gas and oil burners)
- **BImSchV (DE)** — Emission limits, flue gas measurements
- **SIA 384.201** — Heating systems (design, boilers)
- **ÖNORM H 5170** — Boiler systems, operation, maintenance
