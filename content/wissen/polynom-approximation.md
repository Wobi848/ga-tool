---
title: Polynom-Approximation für Sensor-Kennlinien
title_en: Polynomial Approximation for Sensor Characteristic Curves
slug: polynom-approximation
category: regelung
subcategory: signalverarbeitung
tags: [polynom, fit, kleinste-quadrate, ntc, sensor, linearisierung, kennlinie, ddc]
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
