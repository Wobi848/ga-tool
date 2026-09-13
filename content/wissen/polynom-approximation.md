---
title: Polynom-Approximation für Sensor-Kennlinien
title_en: Polynomial Approximation for Sensor Characteristic Curves
slug: polynom-approximation
category: regelung
subcategory: signalverarbeitung
tags:
  [polynom, fit, kleinste-quadrate, ntc, sensor, linearisierung, kennlinie, ddc, sollwertversteller]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related: [pid-regler, signaltypen, ntc-ptc]
rechner: [polynom-fit]
norm: []
updated: 2026-05-24
lang: de
---

# Polynom-Approximation für Sensor-Kennlinien

Viele Sensoren in der Gebäudeautomation liefern keine **lineare** Beziehung zwischen Messgrösse und Ausgangssignal. NTC-Widerstände, Drucksensoren mit Wurzel-Kennlinie, Volumenstrom aus Differenzdruck — alle haben **nicht-lineare Kennlinien**.

Damit die DDC oder SPS damit umgehen kann, muss die Kennlinie **linearisiert** oder zumindest als verwertbare mathematische Funktion vorliegen. Eine sehr robuste Methode dafür ist die **Polynom-Approximation** mit der Methode der kleinsten Quadrate.

## Grundidee

Aus n Messpunkten $(x_i, y_i)$ wird ein Polynom

$$y = a_0 + a_1 \cdot x + a_2 \cdot x^2 + \ldots + a_m \cdot x^m$$

so bestimmt, dass die Summe der quadrierten Abweichungen zwischen Polynom-Wert und gemessenem Wert minimal wird:

$$\sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \rightarrow \text{Minimum}$$

Der **Grad m** wird gewählt nach Komplexität der Kennlinie:

- **Grad 1 (linear):** für lineare Bereiche oder als Erstapproximation
- **Grad 2 (quadratisch):** Differenzdruck → Volumenstrom (Wurzel-Kennlinie linearisiert), leicht gekrümmte Kennlinien
- **Grad 3 (kubisch):** typische Sensor-Linearisierung (NTC, Pt1000 im weiten Bereich)
- **Grad 4–5:** wenn 3 nicht reicht, mit Vorsicht (Overfitting-Gefahr)

## Bestimmtheitsmass R²

Das **R²** (Bestimmtheitsmass) sagt wie gut das Polynom zu den Messpunkten passt:

- **R² = 1.0:** perfekter Fit (alle Punkte exakt auf der Kurve)
- **R² > 0.99:** sehr gut, für die meisten GA-Anwendungen ausreichend
- **R² > 0.95:** brauchbar, prüfe ob höherer Grad oder weniger Punkte besser passen
- **R² < 0.9:** Polynom passt nicht — Daten verrauscht, Grad falsch, oder Kennlinie nicht mit Polynom approximierbar

## Typische Anwendungen

### NTC-Widerstands-Temperatur-Kennlinie

Ein NTC 10k hat bei 25 °C einen Widerstand von 10 kΩ, der mit fallender Temperatur stark zunimmt. Aus 5–10 Datenpunkten des Herstellers kann ein Polynom Grad 3 die Kennlinie über einen Bereich von -20 °C bis +80 °C mit R² > 0.999 abbilden — gut genug für die meisten GA-Regelungen.

Wichtig: **immer auf den genutzten Bereich beschränken**. Ein Polynom-Fit für 0–50 °C extrapoliert ausserhalb dieses Bereichs schnell unbrauchbar.

### Differenzdruck → Volumenstrom

Bei Blenden oder Düsen gilt $\dot V \propto \sqrt{\Delta p}$. Ein quadratisches Polynom $\dot V = a_0 + a_1 \cdot \sqrt{\Delta p} + a_2 \cdot \Delta p$ approximiert das gut, wenn die DDC keine direkte Wurzel-Funktion hat.

### Kalibrierkurven von 4–20 mA-Signalen

Ein Drucktransmitter liefert 4–20 mA für 0–10 bar — aber die Kennlinie hat einen kleinen Offset und Drift. Mit 5 Kalibrier-Punkten und einem Polynom Grad 1 oder 2 wird das in der DDC kompensiert.

### Heizkurven aus Messreihen

Wenn man aus einem Gebäude eine "echte" Heizkurve über mehrere Heizperioden gemessen hat, kann ein Polynom Grad 2 oder 3 die optimale Vorlauftemperatur als Funktion der Aussentemperatur abbilden — robuster als der Hersteller-Default mit Steilheit + Niveau.

## Praxis-Hinweise

**Wahl der x-Werte:**

- Messpunkte über den **gesamten genutzten Bereich** verteilen, nicht alle in einer Ecke
- Bei stark gekrümmten Bereichen mehr Punkte einsetzen
- Mindestens **Grad + 2** Punkte verwenden (sonst keine echte Approximation)

**Overfitting vermeiden:**

Ein Polynom Grad 5 durch 6 Punkte trifft jeden Punkt exakt, schwingt aber dazwischen wild herum. R² ist dann 1.0, aber das Polynom ist unbrauchbar. **Faustregel:** mindestens doppelt so viele Punkte wie Koeffizienten (Grad + 1).

**Einheiten konsistent halten:**

Wenn dein Sensor 4–20 mA → 0–10 bar liefert, lege fest: x = mA (Roh-Signal), y = bar (Messgrösse). Oder umgekehrt — aber nicht im selben Polynom mischen.

**Im DDC-Code:**

Die meisten DDC-Hersteller (Siemens DESIGO, Sauter, Saia) erlauben Polynome bis Grad 3 oder 4 als Block. Die Koeffizienten aus dem Rechner lassen sich direkt eintragen. Bei höheren Graden Stützstellen-Tabellen mit linearer Interpolation als Alternative.

## Praxis-Beispiel: Sollwertversteller mit Widerstands-Signal

Ein typischer Drehknopf-Sollwertversteller (Wandgerät) verschiebt den Raumtemperatur-Sollwert um ±3 K. Der Knopf liefert keinen Temperatur-Offset direkt, sondern einen **Widerstandswert von 1000–1175 Ω**. Die DDC muss daraus den Kelvin-Offset rechnen — Schema `y = A·x² + B·x + C`, bei diesem Sensor reicht `A = 0` (linear).

### Signalbereich

| Widerstand | Stellung       | Offset |
| ---------- | -------------- | ------ |
| 1000 Ω     | Linksanschlag  | −3 K   |
| 1091 Ω     | Mittelstellung | 0 K    |
| 1175 Ω     | Rechtsanschlag | +3 K   |

### Mit dem Polynom-Fit-Rechner berechnen

1. Im Rechner die 3 Punkte eingeben: `(1000, -3)`, `(1091, 0)`, `(1175, 3)`
2. **Grad: 1** (linear — die 3 Punkte liegen praktisch auf einer Geraden)
3. **Notation: A·x² + B·x + C** im Dropdown wählen
4. Ergebnis: `B ≈ 0.03427`, `C ≈ -37.31`, `A = 0`
5. R² ≈ 0.9999 (sehr gut)

### Einstellwerte

| Parameter | Wert    | Bedeutung                         |
| --------- | ------- | --------------------------------- |
| A         | 0       | nicht gebraucht (lineares Signal) |
| B         | 0.03427 | Steigung (K pro Ω)                |
| C         | −37.31  | Verschiebung (Offset)             |

### Feinkorrektur über C

Wenn die Anzeige nach Inbetriebnahme einen kleinen Offset hat (z.B. zeigt −3.2 K statt −3.0 K am Linksanschlag), nur den **C-Wert** in 0.1er Schritten anpassen:

| Problem                           | Lösung            |
| --------------------------------- | ----------------- |
| Anzeige zu tief (−3.2 statt −3.0) | C um +0.2 erhöhen |
| Anzeige zu hoch (−2.8 statt −3.0) | C um −0.2 senken  |

**B nie anfassen** — der bestimmt die Spreizung (±3 K), die stimmt rechnerisch. Nur C verschiebt den ganzen Bereich gleichmässig.

### Wert-Springen verhindern (Filter)

Wenn der angezeigte Offset unruhig springt:

- **Filterzeit am AI-Objekt** (Analogeingang) auf 30–60 s setzen — die Station mittelt den Widerstand über diese Zeit. Empfohlen, weil ein Sollwertversteller nicht schnell reagieren muss.
- Falls am AI-Objekt kein Filter verfügbar: Mittelwert-Block zwischen AI und Polynom schalten.

## Grenzen der Methode

Polynome sind **glatte** Funktionen — sie können keine Sprünge, Knicks oder Plateaus exakt abbilden. Wenn deine Kennlinie sowas hat (z.B. Schaltschwelle, Sättigung), brauchst du **stückweise lineare Interpolation** oder **Spline-Funktionen** stattdessen.

Bei stark logarithmischen oder exponentiellen Verläufen (klassisches Beispiel: NTC bei tiefen Temperaturen → MΩ-Bereich) ist die **Steinhart-Hart-Gleichung** mathematisch besser geeignet:

$$\frac{1}{T} = A + B \ln(R) + C \ln(R)^3$$

Diese liefert über breite Temperaturbereiche genauere Werte als ein Polynom Grad 3, ist aber rechenaufwändiger im DDC.

## Zusammenfassung

| Schritt | Was tun                                                                      |
| ------- | ---------------------------------------------------------------------------- |
| 1       | Messpunkte sammeln (Datenblatt, Kalibrierung, eigene Messungen)              |
| 2       | Polynom-Grad wählen (klein anfangen, bei R² < 0.99 erhöhen)                  |
| 3       | Fit durchführen (Rechner-Tool oder Excel `LINEST` / Python `numpy.polyfit`)  |
| 4       | R² prüfen + Kurve visuell mit Datenpunkten vergleichen                       |
| 5       | Koeffizienten in die DDC/SPS übernehmen, im **genutzten Bereich** validieren |

<!-- EN -->

# Polynomial Approximation for Sensor Characteristic Curves

Many sensors in building automation do not deliver a **linear** relationship between the measured quantity and the output signal. NTC resistors, pressure sensors with a square-root characteristic, volume flow derived from differential pressure — all of them have **non-linear curves**.

For a DDC or PLC to work with them, the curve has to be **linearised**, or at least expressed as a usable mathematical function. A very robust method for this is **polynomial approximation** using least squares.

## Basic Idea

From n measured points $(x_i, y_i)$ a polynomial

$$y = a_0 + a_1 \cdot x + a_2 \cdot x^2 + \ldots + a_m \cdot x^m$$

is determined such that the sum of the squared deviations between the polynomial value and the measured value becomes minimal:

$$\sum_{i=1}^{n} (y_i - \hat{y}_i)^2 \rightarrow \text{minimum}$$

The **degree m** is chosen according to the complexity of the curve:

- **Degree 1 (linear):** for linear ranges or as a first approximation
- **Degree 2 (quadratic):** differential pressure → volume flow (square-root characteristic linearised), gently curved characteristics
- **Degree 3 (cubic):** typical sensor linearisation (NTC, Pt1000 over a wide range)
- **Degree 4–5:** when 3 is not enough — handle with care, risk of overfitting

## Coefficient of Determination R²

**R²** tells you how well the polynomial fits the measured points:

- **R² = 1.0:** perfect fit (every point exactly on the curve)
- **R² > 0.99:** very good, sufficient for most BA applications
- **R² > 0.95:** usable — check whether a higher degree or fewer points fit better
- **R² < 0.9:** the polynomial does not fit — noisy data, wrong degree, or a curve that cannot be approximated by a polynomial at all

## Typical Applications

### NTC Resistance–Temperature Curve

An NTC 10k has a resistance of 10 kΩ at 25 °C, rising steeply as the temperature falls. From 5–10 datasheet points a third-degree polynomial can represent the curve from −20 °C to +80 °C with R² > 0.999 — good enough for most BA control loops.

Important: **always restrict the fit to the range actually used**. A polynomial fitted for 0–50 °C becomes useless very quickly when extrapolated beyond that range.

### Differential Pressure → Volume Flow

For orifices and nozzles $\dot V \propto \sqrt{\Delta p}$ applies. A quadratic polynomial $\dot V = a_0 + a_1 \cdot \sqrt{\Delta p} + a_2 \cdot \Delta p$ approximates this well when the DDC has no direct square-root function.

### Calibration Curves of 4–20 mA Signals

A pressure transmitter delivers 4–20 mA for 0–10 bar — but the curve has a small offset and drift. With five calibration points and a polynomial of degree 1 or 2 this is compensated inside the DDC.

### Heating Curves from Measured Data

Once you have measured a building's "real" heating curve across several heating seasons, a polynomial of degree 2 or 3 can express the optimal flow temperature as a function of outdoor temperature — more robust than the manufacturer's default of slope plus level.

## Practical Notes

**Choosing the x values:**

- Distribute the measured points across the **entire range in use**, not all in one corner
- Use more points where the curve bends sharply
- Use at least **degree + 2** points (otherwise it is not an approximation at all)

**Avoiding overfitting:**

A fifth-degree polynomial through six points hits every point exactly but oscillates wildly in between. R² is then 1.0 while the polynomial is useless. **Rule of thumb:** at least twice as many points as coefficients (degree + 1).

**Keeping units consistent:**

If your sensor delivers 4–20 mA → 0–10 bar, decide once: x = mA (raw signal), y = bar (measured quantity). Or the other way round — but never mixed inside the same polynomial.

**In the DDC code:**

Most DDC manufacturers (Siemens DESIGO, Sauter, Saia) allow polynomials up to degree 3 or 4 as a block. The coefficients from the calculator can be entered directly. For higher degrees, look-up tables with linear interpolation are the alternative.

## Worked Example: Setpoint Adjuster with a Resistance Signal

A typical rotary setpoint adjuster (wall unit) shifts the room temperature setpoint by ±3 K. The knob does not deliver a temperature offset directly but a **resistance between 1000 and 1175 Ω**. The DDC has to turn that into a kelvin offset — scheme `y = A·x² + B·x + C`, and for this sensor `A = 0` is enough (linear).

### Signal Range

| Resistance | Position        | Offset |
| ---------- | --------------- | ------ |
| 1000 Ω     | full left stop  | −3 K   |
| 1091 Ω     | centre          | 0 K    |
| 1175 Ω     | full right stop | +3 K   |

### Calculating with the Polynomial Fit Tool

1. Enter the three points in the calculator: `(1000, -3)`, `(1091, 0)`, `(1175, 3)`
2. **Degree: 1** (linear — the three points lie practically on a straight line)
3. Select **notation: A·x² + B·x + C** in the dropdown
4. Result: `B ≈ 0.03427`, `C ≈ -37.31`, `A = 0`
5. R² ≈ 0.9999 (very good)

### Parameter Values

| Parameter | Value   | Meaning                    |
| --------- | ------- | -------------------------- |
| A         | 0       | not needed (linear signal) |
| B         | 0.03427 | slope (K per Ω)            |
| C         | −37.31  | shift (offset)             |

### Fine Correction via C

If the display shows a small offset after commissioning (e.g. −3.2 K instead of −3.0 K at the left stop), adjust **only the C value** in steps of 0.1:

| Problem                                 | Fix                |
| --------------------------------------- | ------------------ |
| Display too low (−3.2 instead of −3.0)  | increase C by +0.2 |
| Display too high (−2.8 instead of −3.0) | decrease C by −0.2 |

**Never touch B** — it sets the span (±3 K), which is mathematically correct. Only C shifts the whole range uniformly.

### Preventing Jumping Values (Filter)

If the displayed offset jumps around:

- **Set the filter time on the AI object** (analogue input) to 30–60 s — the station averages the resistance over that period. Recommended, because a setpoint adjuster does not need to react quickly.
- If the AI object has no filter available: insert an averaging block between the AI and the polynomial.

## Limits of the Method

Polynomials are **smooth** functions — they cannot reproduce steps, kinks or plateaus exactly. If your curve has any of those (a switching threshold, saturation), you need **piecewise linear interpolation** or **spline functions** instead.

For strongly logarithmic or exponential behaviour (the classic case: an NTC at low temperatures reaching the MΩ range) the **Steinhart–Hart equation** is mathematically better suited:

$$\frac{1}{T} = A + B \ln(R) + C \ln(R)^3$$

It gives more accurate values than a third-degree polynomial across wide temperature ranges, but is more demanding to compute inside the DDC.

## Summary

| Step | What to do                                                                               |
| ---- | ---------------------------------------------------------------------------------------- |
| 1    | Collect measured points (datasheet, calibration, your own measurements)                  |
| 2    | Choose the polynomial degree (start low, raise it when R² < 0.99)                        |
| 3    | Run the fit (calculator tool, Excel `LINEST` or Python `numpy.polyfit`)                  |
| 4    | Check R² and compare the curve visually against the data points                          |
| 5    | Transfer the coefficients into the DDC/PLC and validate them **within the range in use** |
