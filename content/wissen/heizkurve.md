---
title: Heizkurve / Witterungsführung
title_en: Heating Curve / Weather Compensation
slug: heizkurve
category: regelung
subcategory: heizung
tags: [heizkurve, witterungsführung, neigung, niveau, steilheit, aussentemperaturkompensation, vorlauftemperatur, parallelverschiebung]
difficulty: grundlagen
area: [hlk]
related: [pid-regler, mischer, fussbodenheizung, radiatorheizung]
norm: [SIA 384/2]
updated: 2026-05-14
lang: de
---

# Heizkurve / Witterungsführung

Die **Heizkurve** (auch *Heizkennlinie*, *Witterungsführung*) bestimmt die **Vorlauftemperatur** in Abhängigkeit von der **Aussentemperatur**. Sie ist die wichtigste Vorsteuerung in einer Heizungsregelung — der PI-Raumregler korrigiert nur noch die feinen Abweichungen.

> ⚙️ **Tool:** Im [Heizkurven-Rechner](/rechner/heizkurve) kannst du die Kurve grafisch verstellen und siehst sofort den Vorlauf-Sollwert bei verschiedenen Aussentemperaturen.

## Prinzip

Je kälter es draussen ist, desto höher muss die Vorlauftemperatur sein, um die Wärmeverluste auszugleichen.

```
TV = T_Raum + Steigung × (T_Raum − TA) × Charakteristik + Niveau
```

Die *Charakteristik* hängt vom Heizsystem ab:

- **Radiatoren:** Exponent n ≈ 1.3 (degressive Kurve)
- **Fussbodenheizung:** Exponent n ≈ 1.1 (fast linear)
- **Deckenheizung:** ähnlich Fussboden

## Parameter

### Neigung / Steilheit

Bestimmt **wie stark** die Kurve ansteigt. Hersteller verwenden unterschiedliche Bereiche:

| Hersteller            | Parameter | Typischer Bereich |
|-----------------------|-----------|-------------------|
| Siemens DESIGO / RVS  | Neigung   | 0.2 – 3.5         |
| Viessmann Vitotronic  | Neigung   | 0.2 – 3.5         |
| Buderus / Bosch EMS   | Steilheit | 0.2 – 4.0         |
| Honeywell / Resideo   | 2-Punkte  | —                 |
| Sauter                | Neigung   | 0.2 – 4.0         |

Faustwerte:

- **Fussbodenheizung:** Neigung 0.4 – 0.8
- **Radiator-Niedertemp (50/40):** Neigung 1.0 – 1.4
- **Radiator-Standard (70/50):** Neigung 1.6 – 2.2
- **Altbau, schlecht gedämmt:** 2.0 – 3.0

### Niveau / Parallelverschiebung

Verschiebt die **gesamte Kurve** nach oben oder unten — typisch ± 15 K. Faustregel:

- "Es ist mir zu kalt" → Niveau +1 K (nicht Neigung verstellen!)
- "Bei Frost zu kalt, bei mild ok" → Neigung erhöhen
- "Bei mild zu warm, bei Frost ok" → Neigung verringern (und ggf. Niveau hoch)

### Heizgrenze

Aussentemperatur, oberhalb der die Heizung abschaltet. Üblich:

- Neubau / Passivhaus: 12 – 14 °C
- Standard: 16 – 18 °C
- Altbau: 18 – 20 °C

## Einstell-Hilfe

1. **Reine Vorsteuerung** — Raumregler aus, Aussenfühler aktiv
2. Bei kaltem Wetter (TA < 0 °C) prüfen: Raum erreicht Soll? → ok
3. Bei mildem Wetter (TA 5–10 °C) prüfen: Raum erreicht Soll? → ok
4. Falls **beide** ok aber zu warm/kalt → **Niveau** verstellen
5. Falls **nur ein Bereich** stimmt → **Neigung** verstellen

> 💡 **Goldene Regel:** Immer nur **einen** Parameter pro Tag verstellen, dann 24 h warten. Die Gebäudemasse ist träge.

## Norm-Aussentemperatur

Standortabhängig — Auswahl nach SIA 384/2. Im Schweizer Mittelland −7 bis −10 °C, in den Alpen bis −19 °C (Davos).

| Ort        | Norm-Aussentemp |
|------------|-----------------|
| Zürich     | −8 °C           |
| Bern       | −10 °C          |
| Basel      | −7 °C           |
| Chur       | −13 °C          |
| Davos      | −19 °C          |
| Lugano     | −5 °C           |

## Sonderfälle

- **Wärmepumpe:** Vorlauf so tief wie möglich (COP!) — Heizkurve flach halten, Niveau eher minus
- **Brennwert-Kessel:** Rücklauf muss unter Taupunkt (~55 °C) — flache Kurve, niedrige Heizkurve
- **Fernwärme:** Maximaler Vorlauf oft vom Versorger vorgegeben

<!-- EN -->

The **heating curve** (also *heating characteristic*, *weather compensation*) determines the **flow temperature** based on the **outdoor temperature**. It is the most important feedforward element in heating control — the PI room controller only compensates for fine residual deviations.

> ⚙️ **Tool:** In the [Heating Curve Calculator](/rechner/heizkurve) you can graphically adjust the curve and instantly see the flow setpoint at different outdoor temperatures.

## Principle

The colder it is outside, the higher the flow temperature must be to compensate for heat losses.

```
TV = T_Room + Slope × (T_Room − TA) × Characteristic + Level
```

The *characteristic* depends on the heating system:

- **Radiators:** Exponent n ≈ 1.3 (degressive curve)
- **Underfloor heating:** Exponent n ≈ 1.1 (nearly linear)
- **Ceiling heating:** similar to underfloor

## Parameters

### Slope / Steepness

Determines **how steeply** the curve rises. Manufacturers use different parameter ranges:

| Manufacturer | Parameter | Typical range |
|--------------|-----------|---------------|
| Siemens DESIGO / RVS | Slope | 0.2 – 3.5 |
| Viessmann Vitotronic | Slope | 0.2 – 3.5 |
| Buderus / Bosch EMS | Steepness | 0.2 – 4.0 |
| Honeywell / Resideo | 2-point | — |
| Sauter | Slope | 0.2 – 4.0 |

Typical values:

- **Underfloor heating:** Slope 0.4 – 0.8
- **Radiator low-temp (50/40):** Slope 1.0 – 1.4
- **Radiator standard (70/50):** Slope 1.6 – 2.2
- **Old building, poorly insulated:** 2.0 – 3.0

### Level / Parallel Shift

Shifts the **entire curve** up or down — typically ± 15 K. Rule of thumb:

- "It's too cold" → Level +1 K (do not adjust slope!)
- "Too cold during frost, ok when mild" → increase slope
- "Too warm when mild, ok during frost" → decrease slope (and possibly raise level)

### Heat Limit

Outdoor temperature above which heating switches off. Typical values:

- New build / passive house: 12 – 14 °C
- Standard: 16 – 18 °C
- Old building: 18 – 20 °C

## Adjustment Guide

1. **Pure feedforward mode** — room controller off, outdoor sensor active
2. Check during cold weather (TA < 0 °C): does room reach setpoint? → ok
3. Check during mild weather (TA 5–10 °C): does room reach setpoint? → ok
4. If **both** ok but too warm/cold overall → adjust **level**
5. If **only one condition** correct → adjust **slope**

> 💡 **Golden rule:** Always adjust only **one** parameter per day, then wait 24 h. Building mass responds slowly.

## Design Outdoor Temperature

Location-dependent — selected per SIA 384/2. In the Swiss Mittelland −7 to −10 °C, in the Alps down to −19 °C (Davos).

| Location | Design outdoor temp |
|----------|---------------------|
| Zürich | −8 °C |
| Bern | −10 °C |
| Basel | −7 °C |
| Chur | −13 °C |
| Davos | −19 °C |
| Lugano | −5 °C |

## Special Cases

- **Heat pump:** Flow as low as possible (COP!) — keep heating curve flat, level on the low side
- **Condensing boiler:** Return must stay below dew point (~55 °C) — flat curve, low heating curve
- **District heating:** Maximum flow temperature often specified by the supplier
