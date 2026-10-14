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
norm: [EN 13053, VDI 3803, SIA 382/1]
updated: 2026-05-15
lang: de
---

# Adiabatische Kühlung — Prinzip und Einsatzgrenzen

Adiabatische Kühlung nutzt die **Verdunstungsenergie von Wasser** zur Luftkühlung — ohne Kältemaschine. Sie ist energieeffizient, aber nur bei trockener Aussenluft wirksam.

## Physikalisches Grundprinzip

Verdunstendes Wasser entzieht der Luft die Verdampfungswärme, rund 2450 kJ pro kg Wasser. Die Luft kühlt ab und wird feuchter, ihre Enthalpie bleibt dabei gleich.

Beispiel: Luft mit 32 °C und 20 % rF (Enthalpie rund 47 kJ/kg) kann adiabatisch bis auf etwa 22 °C und 60 % rF abgekühlt werden, bei gleicher Enthalpie. Das sind 10 K Abkühlung, dafür steigt der Wassergehalt von 5.9 auf 9.9 g/kg.

**Kühlgrenztemperatur (Feuchtkugeltemperatur Tw):** Die minimale erreichbare Temperatur:

Die tiefste erreichbare Temperatur ist die **Feuchtkugeltemperatur**, die Temperatur, bei der die Luft mit gleicher Enthalpie gesättigt wäre. Für 32 °C und 20 % rF liegt sie bei rund 17 °C. Berechnen lässt sie sich im [Psychrometrie-Rechner](/rechner/psychrometrie). Eine einfache Faustformel dafür gibt es nicht.

---

## Typen der adiabatischen Kühlung

### 1. Direktkühlung (Direkte Evaporativkühlung)

Wasser wird direkt in die Zuluft verdunstet:

Die Zuluft strömt durch benetzte Matten oder einen Sprühnebel und kühlt dabei ab, zum Beispiel von 32 °C und 20 % rF auf 22 °C und 60 % rF.

- Einfach, günstig
- Luft wird feuchter → nur für trockene Klimazonen oder RLT mit Nachkühlung
- Hygiene-Problematik (wie Befeuchter → VDI 6022)

### 2. Indirekte Evaporativkühlung

Adiabatische Kühlung auf der **Abluft-Seite** eines Wärmetauschers:

Die **Abluft** wird adiabatisch gekühlt, zum Beispiel von 25 °C und 55 % rF auf nahe 19 °C, und kühlt dann über einen Plattenwärmetauscher die Zuluft. Die Zuluft bekommt keine zusätzliche Feuchte.

- Besser für Anwendungen wo trockene Zuluft gewünscht
- Wirkungsgrad 40–70 %

### 3. Rückkühler-Vorkühlung (Recooler)

Adiabatische Kühlung des Rückkühlwassers für Kältemaschine:

Das Rückkühlwerk einer Kältemaschine wird an heissen, trockenen Tagen besprüht oder über benetzte Matten angeströmt. Die Luft am Rückkühler wird dadurch kühler, das Kühlwasser kommt kälter zurück, und die Kältemaschine arbeitet mit besserem EER.

---

## Effizienzvergleich

| Methode                     | COP / Einsparpotenzial            | Einschränkung                   |
| --------------------------- | --------------------------------- | ------------------------------- |
| Kältemaschine               | COP 2.5–4.5                       | Referenz, immer möglich         |
| Direkte Evaporativkühlung   | COP 20–50                         | Nur trocken < 40 % rF           |
| Indirekte Evaporativkühlung | COP 10–30                         | Trocken < 50 % rF               |
| Rückkühler-Vorkühlung       | +20–40 % Kältemaschine COP        | Spitzenlasttage, trocken        |
| Nachtauskühlung             | COP etwa 10–30 (nur Ventilatoren) | Nur nachts, Speichermasse nötig |

---

## Einsatzgrenzen

Auslegungstag Zürich, z.B. 32 °C und 35 % rF: Die Feuchtkugeltemperatur liegt bei rund 20.5 °C. Mit direkter Verdunstung sind also Zulufttemperaturen um 22 °C erreichbar, für Büros mit Zuluft von 16 bis 18 °C reicht das nicht allein. Sinnvoll ist adiabatische Kühlung hier als **Vorkühlung**, die die Kältemaschine entlastet, oder indirekt über die Abluft.

**Kritische Klimazonen:**

| Klima           | Adiabatische Kühlung | Begründung            |
| --------------- | -------------------- | --------------------- |
| Trocken/heiss   | Sehr geeignet        | Grosses Δ(T - Tw)     |
| Mitteleuropas   | Bedingt geeignet     | Im Sommer 40–60 % rF  |
| Feucht/tropisch | Nicht geeignet       | Tw ≈ T, keine Kühlung |

---

## Hygiene und Betrieb

Adiabatische Kühlung mit Wassereinbringung birgt **Hygiene-Risiken (Legionellen)**:

- **Wasser:** Trinkwasserqualität, bei Sprühsystemen enthärtet oder aus Umkehrosmose
- **Keine Stagnation:** Leitungen und Wannen bei Stillstand entleeren und trocknen lassen
- **Desinfektion:** z.B. UV-Anlage oder Dosierung nach Herstellerangabe
- **Kontrollen:** regelmässige Wasseranalysen, Hygiene nach VDI 6022 bzw. VDI 2047-2 bei Rückkühlwerken

---

## GA-Integration

Freigabe der adiabatischen Kühlung, wenn:

- Kühlbedarf besteht und die Aussentemperatur hoch ist, z.B. über 26 °C
- die Aussenluft trocken genug ist, sodass zwischen Luft- und Feuchtkugeltemperatur ein nutzbarer Abstand bleibt, z.B. über 6 K
- die Anlage nicht im Hygiene- oder Spülbetrieb ist

Abschalten, wenn die Bedingungen nicht mehr erfüllt sind, mit Hysterese, und die Wasserleitungen danach entleeren.

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
- **SIA 382/1** — Lüftungs- und Klimaanlagen (freie Kühlungsstrategien)

<!-- EN -->

Adiabatic cooling uses the **evaporation energy of water** to cool air — without a mechanical chiller. It is energy-efficient, but only effective when outdoor air is dry.

## Physical Principle

Evaporating water draws the heat of evaporation from the air, about 2450 kJ per kg of water. The air cools and becomes more humid; its enthalpy stays the same.

Example: air at 32 °C and 20 % RH (enthalpy about 47 kJ/kg) can be cooled adiabatically to about 22 °C and 60 % RH at the same enthalpy. That is 10 K of cooling, while the water content rises from 5.9 to 9.9 g/kg.

**Wet-bulb temperature (Tw):** The minimum achievable temperature:

The lowest achievable temperature is the **wet-bulb temperature**, the temperature at which the air would be saturated at the same enthalpy. For 32 °C and 20 % RH it is about 17 °C. Calculate it in the [psychrometrics calculator](/rechner/psychrometrie); there is no simple rule of thumb.

---

## Types of Adiabatic Cooling

### 1. Direct Evaporative Cooling

Water is evaporated directly into the supply air:

The supply air flows through wetted pads or a spray mist and cools down, for example from 32 °C and 20 % RH to 22 °C and 60 % RH.

- Simple, low cost
- Air becomes more humid → suitable only for dry climates or AHUs with post-cooling
- Hygiene concerns (like humidifiers → VDI 6022)

### 2. Indirect Evaporative Cooling

Adiabatic cooling applied to the **exhaust air side** of a heat exchanger:

The **extract air** is cooled adiabatically, for example from 25 °C and 55 % RH to close to 19 °C, and then cools the supply air via a plate heat exchanger. The supply air gains no extra moisture.

- Better for applications where dry supply air is desired
- Effectiveness 40–70%

### 3. Cooler Pre-Cooling (Recooler)

Adiabatic cooling of the recooling water for the chiller:

On hot, dry days the recooler of a chiller is sprayed or fed through wetted pads. The air at the recooler becomes cooler, the cooling water returns colder, and the chiller runs at a better EER.

---

## Efficiency Comparison

| Method                       | COP / Savings Potential     | Limitation                         |
| ---------------------------- | --------------------------- | ---------------------------------- |
| Mechanical chiller           | COP 2.5–4.5                 | Reference, always possible         |
| Direct evaporative cooling   | COP 20–50                   | Only dry < 40% RH                  |
| Indirect evaporative cooling | COP 10–30                   | Dry < 50% RH                       |
| Recooler pre-cooling         | +20–40% chiller COP         | Peak load days, dry conditions     |
| Night cooling                | COP about 10–30 (fans only) | Only at night, thermal mass needed |

---

## Application Limits

Design day Zurich, e.g. 32 °C and 35 % RH: the wet-bulb temperature is about 20.5 °C. Direct evaporation therefore reaches supply temperatures around 22 °C; for offices with 16 to 18 °C supply air that is not enough on its own. Here adiabatic cooling makes sense as **pre-cooling** that relieves the chiller, or indirectly via the extract air.

**Critical climate zones:**

| Climate          | Adiabatic Cooling      | Reason                    |
| ---------------- | ---------------------- | ------------------------- |
| Hot and dry      | Very suitable          | Large Δ(T − Tw)           |
| Central European | Conditionally suitable | 40–60% RH in summer       |
| Humid / tropical | Not suitable           | Tw ≈ T, no cooling effect |

---

## Hygiene and Operation

Adiabatic cooling with water introduction carries **hygiene risks (Legionella)**:

- **Water:** drinking water quality, softened or from reverse osmosis for spray systems
- **No stagnation:** drain and dry pipes and trays during shutdown
- **Disinfection:** e.g. UV unit or dosing per manufacturer
- **Checks:** regular water analyses, hygiene per VDI 6022 or VDI 2047-2 for recoolers

---

## BA Integration

Enable adiabatic cooling when:

- there is a cooling demand and the outdoor temperature is high, e.g. above 26 °C
- the outdoor air is dry enough that a usable gap remains between dry-bulb and wet-bulb temperature, e.g. above 6 K
- the system is not in hygiene or flushing mode

Switch off when the conditions are no longer met, with hysteresis, and drain the water lines afterwards.

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
- **SIA 382/1** — Ventilation and air conditioning systems (free cooling strategies)
