---
title: COP und EER — Effizienz von Wärmepumpen und Kältemaschinen
title_en: COP and EER — Efficiency of Heat Pumps and Chillers
slug: cop-eer
category: klima
subcategory: effizienz
tags:
  [
    cop,
    eer,
    scop,
    seer,
    jar,
    jaz,
    kältemaschine,
    wärmepumpe,
    leistungszahl,
    effizienz,
    normbedingungen,
    jahresarbeitszahl,
    betaspunkt,
    exergie,
    carnot,
    hspf,
    eseer,
    iplv
  ]
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

<p class="formel">COP = Q<sub>Heiz</sub> / P<sub>el</sub></p>

Beispiel: Eine Luft/Wasser-Wärmepumpe gibt bei A7/W35 12 kW Wärme ab und nimmt 3 kW Strom auf: COP = 4. Aus 1 kWh Strom werden 4 kWh Wärme, 3 kWh davon stammen aus der Umgebung.

### EER — Energy Efficiency Ratio (Kältemaschine)

<p class="formel">EER = Q<sub>Kälte</sub> / P<sub>el</sub></p>

Beispiel: Eine wassergekühlte Kältemaschine liefert bei Kaltwasser 12/7 °C und Kühlwasser 30/35 °C 100 kW Kälte bei 25 kW Strom: EER = 4.

**Zusammenhang COP und EER (reversible Wärmepumpe):**

<p class="formel">COP<sub>Heizen</sub> ≈ EER<sub>Kühlen</sub> + 1</p>

Die abgegebene Wärme ist die aufgenommene Kälte plus die Antriebsenergie. Das gilt bei gleichen Temperaturen und ohne Verluste.

---

## Carnot-Grenzwert

Theoretisch maximaler Wirkungsgrad — nie erreichbar, aber Orientierung:

<p class="formel">COP<sub>Carnot</sub> = T<sub>warm</sub> / (T<sub>warm</sub> − T<sub>kalt</sub>)   (Temperaturen in Kelvin)</p>

Beispiel A7/W35: 308 K / (308 K − 280 K) = 11. Ein realer COP von 4 entspricht einem Gütegrad von rund 36 %, typisch sind 35 bis 55 %. In Wirklichkeit liegen die Temperaturen im Kältekreis noch einige Kelvin weiter auseinander.

**Wichtig:** Je kleiner die Temperaturdifferenz (T_hoch − T_tief), desto effizienter.
→ Niedrige Vorlauftemperatur (Fussbodenheizung 35 °C statt Heizkörper 70 °C) verbessert COP deutlich.

---

## Normbedingungen (EN 14511)

Vergleichbarkeit erfordert definierte Prüfbedingungen:

| Anlagetype                   | Bezeichnung | Quellentemperatur  | Senketemperatur     |
| ---------------------------- | ----------- | ------------------ | ------------------- |
| Luft/Wasser WP               | A7W35       | 7 °C Aussenluft    | 35 °C Vorlauf       |
| Luft/Wasser WP               | A-7W35      | −7 °C Aussenluft   | 35 °C Vorlauf       |
| Sole/Wasser WP               | B0W35       | 0 °C Sole          | 35 °C Vorlauf       |
| Wasser/Wasser WP             | W10W35      | 10 °C Grundwasser  | 35 °C Vorlauf       |
| Kältemaschine, wassergekühlt | —           | Kaltwasser 12/7 °C | Kühlwasser 30/35 °C |
| Kältemaschine, luftgekühlt   | —           | Kaltwasser 12/7 °C | Luft 35 °C          |

---

## Jahreskennzahlen

Punktwerte (COP/EER) sind wenig aussagekräftig — Jahreskennzahlen besser:

### SCOP — Seasonal COP (Wärmepumpe Heizen)

<p class="formel">SCOP = Wärme pro Jahr / Strom pro Jahr</p>

Typisch für Luft/Wasser-Wärmepumpen in der Schweiz 2.8 bis 4.5, je nach Standort und Vorlauftemperatur.

### SEER — Seasonal EER (Kältemaschine / WP Kühlen)

<p class="formel">SEER = Kälte pro Jahr / Strom pro Jahr</p>

Moderne Kältemaschinen erreichen 5 bis 8. Bei Teillast arbeiten sie oft besser als bei Volllast.

### JAZ — Jahresarbeitszahl (Schweizer Begrifflichkeit)

Die **Jahresarbeitszahl (JAZ)** ist der gemessene Jahreswert einer realen Anlage, mit allen ihren Eigenheiten. Der **SCOP** wird nach EN 14825 für ein Normklima berechnet. Beide sagen Ähnliches, sind aber nicht dasselbe; die JAZ ist die ehrlichere Zahl.

---

## Teillastverhaltung (ESEER / IPLV)

Kältemaschinen laufen selten bei Volllast. Teillasteffizienz ist entscheidend:

Der ESEER (Eurovent) gewichtet vier Lastpunkte: 100 % Last mit 3 %, 75 % mit 33 %, 50 % mit 41 % und 25 % mit 23 %. Für Kaltwassersätze ist er inzwischen weitgehend durch den saisonalen Wert nach EN 14825 abgelöst, den auch die Ökodesign-Verordnung verwendet.

---

## Praktische Einflussfaktoren auf COP/EER

| Faktor                            | Effekt auf COP/EER          |
| --------------------------------- | --------------------------- |
| Vorlauftemperatur ↑               | COP ↓ (jedes K kostet ~2 %) |
| Quellentemperatur ↓ (WP Luft)     | COP ↓                       |
| Verschmutzter Kondensator         | EER ↓ (bis −30 %!)          |
| Teillastbetrieb (mit FU)          | EER oft ↑                   |
| Kältemittelmangel                 | COP/EER ↓ stark             |
| Überhitzung / Unterkühlung falsch | EER ↓                       |

---

## Monitoring in der GA

- Wärmemenge aus Wärmezähler, Strom aus Elektrozähler, beide über denselben Zeitraum
- **COP oder JAZ** = Wärme / Strom, täglich, monatlich und jährlich
- Sinkt der Wert über Wochen bei gleichen Bedingungen: Verschmutzung, Kältemittelverlust oder falsche Einstellungen prüfen
- Einen festen Alarmwert (z.B. COP < 2.5) nur mit Blick auf Aussen- und Vorlauftemperatur setzen, sonst alarmiert jeder kalte Tag

---

## Normen

- **EN 14511** — Kältemaschinen, Wärmepumpen: Prüfbedingungen und Leistungsabnahme
- **EN 14825** — Teillastbedingungen für Klimatisierung, Heizen (SCOP/SEER)
- **Ökodesign-Verordnungen** (EU) 813/2013 für Raumheizgeräte inkl. Wärmepumpen, (EU) 2016/2281 für Kaltwassersätze und Klimageräte

<!-- EN -->

COP and EER are the most important efficiency metrics for heat pumps and chillers. They describe the ratio of useful energy delivered to drive energy consumed.

## Definitions

### COP — Coefficient of Performance (Heat Pump)

<p class="formel">COP = Q<sub>heat</sub> / P<sub>el</sub></p>

Example: an air/water heat pump delivers 12 kW of heat at A7/W35 and draws 3 kW of electricity: COP = 4. 1 kWh of electricity becomes 4 kWh of heat, 3 kWh of which come from the environment.

### EER — Energy Efficiency Ratio (Chiller)

<p class="formel">EER = Q<sub>cold</sub> / P<sub>el</sub></p>

Example: a water-cooled chiller delivers 100 kW of cooling at chilled water 12/7 °C and cooling water 30/35 °C with 25 kW of electricity: EER = 4.

**Relationship between COP and EER (reversible heat pump):**

<p class="formel">COP<sub>heating</sub> ≈ EER<sub>cooling</sub> + 1</p>

The heat released is the cooling absorbed plus the drive energy. This holds at equal temperatures and without losses.

---

## Carnot Limit

Theoretically maximum efficiency — never achievable, but a useful benchmark:

<p class="formel">COP<sub>Carnot</sub> = T<sub>warm</sub> / (T<sub>warm</sub> − T<sub>cold</sub>)   (temperatures in kelvin)</p>

Example A7/W35: 308 K / (308 K − 280 K) = 11. A real COP of 4 corresponds to an efficiency grade of about 36 %; 35 to 55 % is typical. In reality the refrigerant circuit temperatures are a few kelvin further apart.

**Key insight:** The smaller the temperature differential (T_high − T_low), the higher the efficiency.
→ Lower flow temperature (underfloor heating at 35 °C vs. radiators at 70 °C) significantly improves COP.

---

## Standard Test Conditions (EN 14511)

Comparability requires defined test conditions:

| System type              | Designation | Source temperature    | Sink temperature       |
| ------------------------ | ----------- | --------------------- | ---------------------- |
| Air-to-water heat pump   | A7W35       | 7 °C outdoor air      | 35 °C flow             |
| Air-to-water heat pump   | A-7W35      | −7 °C outdoor air     | 35 °C flow             |
| Brine-to-water heat pump | B0W35       | 0 °C brine            | 35 °C flow             |
| Water-to-water heat pump | W10W35      | 10 °C groundwater     | 35 °C flow             |
| Chiller, water-cooled    | —           | chilled water 12/7 °C | cooling water 30/35 °C |
| Chiller, air-cooled      | —           | chilled water 12/7 °C | air 35 °C              |

---

## Seasonal Metrics

Point values (COP/EER) have limited meaning — seasonal metrics are more informative:

### SCOP — Seasonal COP (Heat Pump, Heating Mode)

<p class="formel">SCOP = heat per year / electricity per year</p>

Typical for air/water heat pumps in Switzerland 2.8 to 4.5, depending on location and flow temperature.

### SEER — Seasonal EER (Chiller / Heat Pump, Cooling Mode)

<p class="formel">SEER = cooling per year / electricity per year</p>

Modern chillers reach 5 to 8. At part load they often work better than at full load.

### JAZ — Annual Performance Factor (German/Swiss term)

The **seasonal performance factor (SPF, German JAZ)** is the measured annual value of a real system with all its peculiarities. **SCOP** is calculated per EN 14825 for a standard climate. Both say similar things but are not the same; the SPF is the more honest figure.

---

## Part-Load Performance (ESEER / IPLV)

Chillers rarely run at full load. Part-load efficiency is decisive:

ESEER (Eurovent) weights four load points: 100 % load at 3 %, 75 % at 33 %, 50 % at 41 % and 25 % at 23 %. For chillers it has largely been replaced by the seasonal value per EN 14825, which the Ecodesign regulation also uses.

---

## Practical Factors Affecting COP/EER

| Factor                                            | Effect on COP/EER        |
| ------------------------------------------------- | ------------------------ |
| Higher flow temperature                           | COP ↓ (approx. 2% per K) |
| Lower source temperature (air-to-water heat pump) | COP ↓                    |
| Fouled condenser                                  | EER ↓ (up to −30%!)      |
| Part-load with VFD                                | EER often ↑              |
| Refrigerant undercharge                           | COP/EER ↓ significantly  |
| Incorrect superheat / subcooling                  | EER ↓                    |

---

## Monitoring in BA

- heat from a heat meter, electricity from an electricity meter, both over the same period
- **COP or SPF** = heat / electricity, daily, monthly and yearly
- if the value drops over weeks under the same conditions: check fouling, refrigerant loss or wrong settings
- set a fixed alarm value (e.g. COP < 2.5) only with outdoor and flow temperature in mind, otherwise every cold day raises an alarm

---

## Standards

- **EN 14511** — Chillers and heat pumps: test conditions and capacity testing
- **EN 14825** — Part-load conditions for air conditioning and heating (SCOP/SEER)
- **Ecodesign regulations** (EU) 813/2013 for space heaters incl. heat pumps, (EU) 2016/2281 for chillers and air conditioners
