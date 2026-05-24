---
title: Temperaturfühler — RTD, NTC und aktive Spannungsfühler
title_en: Temperature Sensors — RTD, NTC and Active Voltage Sensors
slug: temperaturfuehler
category: sensoren
subcategory: temperatur
tags:
  [
    temperaturfuehler,
    rtd,
    pt100,
    pt1000,
    ni1000,
    ntc,
    lm135,
    lm235,
    lm335,
    kp10,
    spannungsfuehler,
    linearisierung,
    ddc
  ]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related: [sensoren, signaltypen, polynom-approximation, ntc-ptc]
rechner: [polynom-fit]
norm: [IEC 60751, DIN EN 60751, DIN 43760]
updated: 2026-05-24
lang: de
---

# Temperaturfühler — RTD, NTC und aktive Spannungsfühler

In der GA gibt es im Wesentlichen drei Fühler-Familien für Temperatur. Welche Familie verbaut ist, bestimmt die DDC-Konfiguration (Eingangsart, Kennlinie, Linearisierung) und wie man im Feld misst.

## 1. Passive Widerstandsfühler (RTD)

- 2-Draht-Anschluss (für lange Leitungen 3- oder 4-Draht)
- **Verpolungsunabhängig** — ein Widerstand hat keine Polarität
- Normen: **DIN EN 60751** (Platin), historisch **DIN 43760** (Nickel, 1987 zurückgezogen, aber in der GA weiterhin die Default-Referenz)
- DDC misst direkt den Widerstand und rechnet über die hinterlegte Kennlinie auf °C

| Typ    | 0 °C   | 100 °C   | Empfindlichkeit | Kennlinie          |
| ------ | ------ | -------- | --------------- | ------------------ |
| PT100  | 100 Ω  | 138.5 Ω  | 0.385 Ω/K       | annähernd linear   |
| PT1000 | 1000 Ω | 1385 Ω   | 3.85 Ω/K        | annähernd linear   |
| NI1000 | 1000 Ω | ≈ 1617 Ω | ≈ 6.18 Ω/K      | leicht nichtlinear |

**NI1000-Varianten beachten:** Es gibt zwei verbreitete Standards, die nicht kompatibel sind:

| Variante           | Kennzeichnung | 100 °C   | Verbreitung                 |
| ------------------ | ------------- | -------- | --------------------------- |
| TK6180 (klassisch) | DIN 43760     | ≈ 1617 Ω | GA-Standard                 |
| TK5000 (Landis)    | LG-Ni1000     | ≈ 1500 Ω | Landis & Staefa / Honeywell |

Falsche Variante in der DDC eingestellt → Messfehler bis ca. 10 K bei 100 °C. **Immer im Datenblatt des Fühlers prüfen**, welche TK-Variante verbaut ist.

**NI1000 vs PT1000:** NI1000 hat fast doppelte Empfindlichkeit (6.18 vs 3.85 Ω/K), ist aber leicht nichtlinear — über breite Bereiche (z.B. 0–150 °C) lohnt sich Linearisierung per Polynom Grad 2. Den Polynom-Fit-Rechner gibt's unter [/rechner/polynom-fit](/rechner/polynom-fit) — siehe auch [Polynom-Approximation](/wissen/polynom-approximation).

## 2. Aktive Spannungsfühler (z.B. KP10)

Statt eines Widerstands gibt der Fühler eine Spannung aus, die proportional zur **absoluten Temperatur in Kelvin** ist.

- 2-Draht-Anschluss (Versorgung und Signal über dasselbe Aderpaar, je nach Modell)
- **Verpolungsempfindlich** — aktiver Baustein braucht definierte Versorgungs-Polarität
- Ausgangssignal: **10 mV / Kelvin**
- Messung mit Multimeter im laufenden Betrieb möglich (DC Volt)

### Kennlinie

| Temperatur | Absolut (K) | Spannung |
| ---------- | ----------- | -------- |
| −50 °C     | 223 K       | 2.23 V   |
| 0 °C       | 273 K       | 2.73 V   |
| 20 °C      | 293 K       | 2.93 V   |
| 100 °C     | 373 K       | 3.73 V   |

### Umrechnung

```
°C = Spannung × 100 − 273

Beispiel: 2.93 V × 100 − 273 = 20 °C
```

(Mathematisch sauber: −273.15. In der GA-Praxis macht der Unterschied <0.2 K aus und wird üblicherweise weggelassen.)

### LMx35-Familie

Die meisten 10-mV/K-Fühler basieren auf der **LM135 / LM235 / LM335** — ursprünglich von National Semiconductor, heute Texas Instruments. Gleiche Kennlinie, Unterschied nur in Bereich und Genauigkeit:

| Typ   | Temperaturbereich | Genauigkeit | Bemerkung                   |
| ----- | ----------------- | ----------- | --------------------------- |
| LM135 | −55 … +150 °C     | ±0.5 K typ. | beste, teuerste             |
| LM235 | −40 … +125 °C     | mittel      | —                           |
| LM335 | −40 … +100 °C     | ±2–3 K      | günstig, für GA meist genug |

Der Kieback & Peter **KP10** ist ein typischer Vertreter dieser Familie für die GA.

## 3. NTC und andere gängige Typen

| Typ         | Signal     | Polarität   | Bemerkung                                     |
| ----------- | ---------- | ----------- | --------------------------------------------- |
| **NTC**     | Widerstand | unabhängig  | nichtlinear, günstig, oft in Heizungs-Reglern |
| **PTC**     | Widerstand | unabhängig  | meist als Selbstschutz/Schwellensensor        |
| **4–20 mA** | Strom      | empfindlich | leitungsunabhängig, oft Kombifühler T/rF      |
| **0–10 V**  | Spannung   | empfindlich | Kombifühler Temp/Feuchte, kürzere Strecken    |

**NTC-Linearisierung:** Bei breiten Bereichen reicht ein Polynom Grad 3 nicht mehr — dann besser **Steinhart-Hart-Gleichung** verwenden, siehe [Polynom-Approximation](/wissen/polynom-approximation) (Abschnitt "Grenzen der Methode").

## Welcher Fühler wofür?

| Anwendung                     | Empfehlung                                     |
| ----------------------------- | ---------------------------------------------- |
| Vor-/Rücklauf, Aussenfühler   | PT1000 (GA-Standard, robust, austauschbar)     |
| Lange Leitung (> 50 m)        | PT1000 mit 3- oder 4-Draht                     |
| Sehr lange Leitung, Industrie | PT100 nur mit 4-Draht                          |
| Einfache Raumfühler           | NTC oder NI1000                                |
| Bestandsanlage mit KP10       | Aktiv-Eingang in DDC nutzen, 10 mV/K-Kennlinie |
| Volumenstrom-Kombifühler      | 4–20 mA oder 0–10 V                            |

## Anschluss kurz zusammengefasst

- **2-Draht passiv:** kurzes Kabel (< 50 m bei PT1000), Polarität egal
- **3-Draht passiv:** Leitungswiderstand wird elektrisch kompensiert
- **4-Draht passiv (Kelvin):** Mess-Strom und Spannungs-Abgriff getrennt → Leitungswiderstand fällt komplett raus
- **2-Draht aktiv (10 mV/K):** Versorgungs-Polarität beachten, Messung im Betrieb mit Multimeter möglich

## Typische Fehler im Feld

- **Falsche Kennlinie in DDC** (PT1000 statt NI1000 oder TK6180 statt TK5000) → konstanter Offset oder skalierter Fehler
- **Anlegefühler nicht isoliert** → misst Mischung aus Rohr- und Raumtemperatur
- **Tauchhülse trocken** ohne Wärmeleitpaste → Trägheit + Offset
- **Aktivfühler ohne Versorgung** → 0 V Ausgang → DDC zeigt −273 °C
- **Lange PT100-Leitung in 2-Draht** → Leitungswiderstand verfälscht massiv (siehe [sensoren.md](/wissen/sensoren))
