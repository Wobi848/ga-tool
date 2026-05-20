---
title: COP und EER — Effizienz von Wärmepumpen und Kältemaschinen
title_en: COP and EER — Efficiency of Heat Pumps and Chillers
slug: cop-eer
category: klima
subcategory: effizienz
tags: [cop, eer, scop, seer, jar, jaz, kältemaschine, wärmepumpe, leistungszahl, effizienz, normbedingungen, jahresarbeitszahl, betaspunkt, exergie, carnot, hspf, eseer, iplv]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, waermepumpe, free-cooling, adiabatische-kuehlung, kaeltemittel]
norm: [EN 14511, EN 14825, EN ISO 13253, Ökodesign 2016/2281]
updated: 2026-05-15
lang: de
---

# COP und EER — Effizienz von Wärmepumpen und Kältemaschinen

COP und EER sind die wichtigsten Effizienzkennzahlen für Wärmepumpen und Kältemaschinen. Sie beschreiben das Verhältnis von Nutzenergie zu eingesetzter Antriebsenergie.

## Definitionen

### COP — Coefficient of Performance (Wärmepumpe)

```
COP = Q_Heiz / P_el   [dimensionslos]

Q_Heiz: abgegebene Heizleistung [kW]
P_el:   aufgenommene elektrische Leistung [kW]

Beispiel:
  Luft/Wasser-WP bei A7W35:
  COP = 12 kW / 3 kW = 4.0
  
  Interpretation: 1 kWh Strom → 4 kWh Wärme
  (1 kWh aus Strom + 3 kWh aus Umwelt)
```

### EER — Energy Efficiency Ratio (Kältemaschine)

```
EER = Q_Kalt / P_el   [dimensionslos]

Q_Kalt: abgegebene Kälteleistung [kW]
P_el:   aufgenommene elektrische Leistung [kW]

Beispiel:
  Kältemaschine bei W7W27 (Kaltwasser 7/12 °C, Kondensator 27/32 °C):
  EER = 100 kW / 30 kW = 3.33
```

**Zusammenhang COP und EER (reversible Wärmepumpe):**
```
COP_Heiz = EER_Kalt + 1
Physikalisch: Wärme = Kälte + Antriebsenergie
```

---

## Carnot-Grenzwert

Theoretisch maximaler Wirkungsgrad — nie erreichbar, aber Orientierung:

```
COP_Carnot = T_hoch / (T_hoch − T_tief)   [Kelvin!]

Beispiel A7W35 (Wärmepumpe Luft/Wasser):
  T_hoch = 35 + 273 = 308 K
  T_tief = 7 + 273  = 280 K
  COP_Carnot = 308 / (308 − 280) = 11.0
  
  Realer COP = 4.0 → Gütegrad = 4.0 / 11.0 = 36 %
  (Typisch: 35–55 % je nach Qualität der Maschine)
```

**Wichtig:** Je kleiner die Temperaturdifferenz (T_hoch − T_tief), desto effizienter.
→ Niedrige Vorlauftemperatur (Fussbodenheizung 35 °C statt Heizkörper 70 °C) verbessert COP deutlich.

---

## Normbedingungen (EN 14511)

Vergleichbarkeit erfordert definierte Prüfbedingungen:

| Anlagetype          | Bezeichnung | Quellentemperatur | Senketemperatur |
|---------------------|-------------|-------------------|-----------------|
| Luft/Wasser WP      | A7W35       | 7 °C Aussenluft   | 35 °C Vorlauf   |
| Luft/Wasser WP      | A-7W35      | −7 °C Aussenluft  | 35 °C Vorlauf   |
| Sole/Wasser WP      | B0W35       | 0 °C Sole         | 35 °C Vorlauf   |
| Wasser/Wasser WP    | W10W35      | 10 °C Grundwasser | 35 °C Vorlauf   |
| Kältemaschine       | W7W27       | 7/12 °C KW        | 27/32 °C        |

---

## Jahreskennzahlen

Punktwerte (COP/EER) sind wenig aussagekräftig — Jahreskennzahlen besser:

### SCOP — Seasonal COP (Wärmepumpe Heizen)

```
SCOP = Q_Heiz_gesamt [kWh/Jahr] / E_el_gesamt [kWh/Jahr]

Typische Werte Luft/Wasser WP in CH:
  SCOP = 2.8–4.5 je nach Standort und Vorlauftemp
  
Je kälter der Standort → weniger SCOP (mehr Betrieb bei −A7)
Je höher die Vorlauftemp → weniger SCOP
```

### SEER — Seasonal EER (Kältemaschine / WP Kühlen)

```
SEER = Q_Kalt_gesamt / E_el_gesamt

Moderne Kältemaschinen:
  SEER = 5–8 (bei Teillastbetrieb oft besser als EER bei Volllast!)
```

### JAZ — Jahresarbeitszahl (Schweizer Begrifflichkeit)

JAZ = SCOP im deutschen / Schweizer Sprachraum für Wärmepumpen.

---

## Teillastverhaltung (ESEER / IPLV)

Kältemaschinen laufen selten bei Volllast. Teillasteffizienz ist entscheidend:

```
ESEER (European Seasonal Energy Efficiency Ratio):
  Gewichteter Mittelwert aus 4 Betriebspunkten:
  
  100 % Last: Gewichtung  3 % (selten)
   75 % Last: Gewichtung 33 %
   50 % Last: Gewichtung 41 %  ← häufigster Betrieb!
   25 % Last: Gewichtung 23 %

Moderne VRF-Systeme: ESEER 5.0–7.0
```

---

## Praktische Einflussfaktoren auf COP/EER

| Faktor                        | Effekt auf COP/EER         |
|-------------------------------|----------------------------|
| Vorlauftemperatur ↑           | COP ↓ (jedes K kostet ~2 %)|
| Quellentemperatur ↓ (WP Luft) | COP ↓                      |
| Verschmutzter Kondensator     | EER ↓ (bis −30 %!)         |
| Teillastbetrieb (mit FU)      | EER oft ↑                  |
| Kältemittelmangel             | COP/EER ↓ stark            |
| Überhitzung / Unterkühlung falsch | EER ↓              |

---

## Monitoring in der GA

```
DDC berechnet laufend Real-COP/-EER:

  Q_WP = V_Heizung × 1.163 × ΔT_VL-RL   [kWh]
  P_el = aus Energiezähler               [kWh]
  
  COP_aktuell = Q_WP / P_el
  
  Trend: COP täglich mitteln → Degradationsanalyse
  Alarm: COP < 2.5 (Wärmepumpe defekt / verschmutzt)
```

---

## Normen

- **EN 14511** — Kältemaschinen, Wärmepumpen: Prüfbedingungen und Leistungsabnahme
- **EN 14825** — Teillastbedingungen für Klimatisierung, Heizen (SCOP/SEER)
- **Ökodesign-Richtlinie 2016/2281** — Mindest-SCOP für Heizwärmepumpen (EU-Markt)

<!-- EN -->

COP and EER are the most important efficiency metrics for heat pumps and chillers. They describe the ratio of useful energy delivered to drive energy consumed.

## Definitions

### COP — Coefficient of Performance (Heat Pump)

```
COP = Q_heat / P_el   [dimensionless]

Q_heat: heat output [kW]
P_el:   electrical power input [kW]

Example:
  Air-to-water heat pump at A7W35:
  COP = 12 kW / 3 kW = 4.0
  
  Interpretation: 1 kWh electricity → 4 kWh heat
  (1 kWh from grid + 3 kWh from the environment)
```

### EER — Energy Efficiency Ratio (Chiller)

```
EER = Q_cold / P_el   [dimensionless]

Q_cold: cooling capacity [kW]
P_el:   electrical power input [kW]

Example:
  Chiller at W7W27 (chilled water 7/12 °C, condenser 27/32 °C):
  EER = 100 kW / 30 kW = 3.33
```

**Relationship between COP and EER (reversible heat pump):**
```
COP_heating = EER_cooling + 1
Physics: heat = cooling + drive energy
```

---

## Carnot Limit

Theoretically maximum efficiency — never achievable, but a useful benchmark:

```
COP_Carnot = T_high / (T_high − T_low)   [Kelvin!]

Example A7W35 (air-to-water heat pump):
  T_high = 35 + 273 = 308 K
  T_low  = 7 + 273  = 280 K
  COP_Carnot = 308 / (308 − 280) = 11.0
  
  Actual COP = 4.0 → efficiency ratio = 4.0 / 11.0 = 36%
  (Typical: 35–55% depending on machine quality)
```

**Key insight:** The smaller the temperature differential (T_high − T_low), the higher the efficiency.
→ Lower flow temperature (underfloor heating at 35 °C vs. radiators at 70 °C) significantly improves COP.

---

## Standard Test Conditions (EN 14511)

Comparability requires defined test conditions:

| System type | Designation | Source temperature | Sink temperature |
|-------------|------------|-------------------|-----------------|
| Air-to-water heat pump | A7W35 | 7 °C outdoor air | 35 °C flow |
| Air-to-water heat pump | A-7W35 | −7 °C outdoor air | 35 °C flow |
| Brine-to-water heat pump | B0W35 | 0 °C brine | 35 °C flow |
| Water-to-water heat pump | W10W35 | 10 °C groundwater | 35 °C flow |
| Chiller | W7W27 | 7/12 °C chilled water | 27/32 °C |

---

## Seasonal Metrics

Point values (COP/EER) have limited meaning — seasonal metrics are more informative:

### SCOP — Seasonal COP (Heat Pump, Heating Mode)

```
SCOP = Q_heat_total [kWh/year] / E_el_total [kWh/year]

Typical values, air-to-water heat pump in CH:
  SCOP = 2.8–4.5 depending on location and flow temperature
  
Colder location → lower SCOP (more operation at −A7)
Higher flow temperature → lower SCOP
```

### SEER — Seasonal EER (Chiller / Heat Pump, Cooling Mode)

```
SEER = Q_cold_total / E_el_total

Modern chillers:
  SEER = 5–8 (part-load operation often better than full-load EER!)
```

### JAZ — Annual Performance Factor (German/Swiss term)

JAZ = SCOP in the German/Swiss context for heat pumps.

---

## Part-Load Performance (ESEER / IPLV)

Chillers rarely run at full load. Part-load efficiency is decisive:

```
ESEER (European Seasonal Energy Efficiency Ratio):
  Weighted average of 4 operating points:
  
  100% load: weighting  3% (rare)
   75% load: weighting 33%
   50% load: weighting 41%  ← most common operating point!
   25% load: weighting 23%

Modern VRF systems: ESEER 5.0–7.0
```

---

## Practical Factors Affecting COP/EER

| Factor | Effect on COP/EER |
|--------|------------------|
| Higher flow temperature | COP ↓ (approx. 2% per K) |
| Lower source temperature (air-to-water heat pump) | COP ↓ |
| Fouled condenser | EER ↓ (up to −30%!) |
| Part-load with VFD | EER often ↑ |
| Refrigerant undercharge | COP/EER ↓ significantly |
| Incorrect superheat / subcooling | EER ↓ |

---

## Monitoring in BA

```
DDC continuously calculates real-time COP/EER:

  Q_HP = V_heating × 1.163 × ΔT_supply-return   [kWh]
  P_el = from energy meter                        [kWh]
  
  COP_current = Q_HP / P_el
  
  Trend: daily average COP → degradation analysis
  Alarm: COP < 2.5 (heat pump faulty / fouled)
```

---

## Standards

- **EN 14511** — Chillers and heat pumps: test conditions and capacity testing
- **EN 14825** — Part-load conditions for air conditioning and heating (SCOP/SEER)
- **Ecodesign Regulation 2016/2281** — Minimum SCOP for heating heat pumps (EU market)
