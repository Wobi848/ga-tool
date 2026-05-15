---
title: Thermische Behaglichkeit — PMV, PPD und Komfortparameter
slug: thermische-behaglichkeit
category: komfort
subcategory: klima
tags: [pmv, ppd, behaglichkeit, komfort, operativtemperatur, lufttemperatur, strahlungstemperatur, luftgeschwindigkeit, feuchte, kleidung, aktivität, clo, met, iso7730, ashrae55, draught]
difficulty: fortgeschritten
area: [hlk, ga, normen]
related: [raumluftqualitaet, pid-regler, vav-cav, taupunkt, rlt-anlage]
norm: [EN ISO 7730, ASHRAE 55, EN 16798-1]
updated: 2026-05-14
lang: de
---

# Thermische Behaglichkeit — PMV, PPD und Komfortparameter

Thermische Behaglichkeit ist das subjektive Wohlbefinden in Bezug auf die thermische Umgebung. In der GA ist es das Ziel aller Regelung — nicht die Temperatur selbst, sondern das **Komfortempfinden** des Menschen.

## Die sechs Einflussparameter

Behaglichkeit hängt von **sechs Parametern** ab (nach Fanger):

### Physikalische Parameter (4)

| Parameter           | Symbol | Typischer Wert          | Einfluss                          |
|---------------------|--------|-------------------------|-----------------------------------|
| **Lufttemperatur**  | T_a    | 20–26 °C                | Direkt über Konvektion            |
| **Mittlere Strahlungstemperatur** | T_r | 18–26 °C    | Über Wärmestrahlung (Wände, Fenster) |
| **Luftgeschwindigkeit** | v  | < 0.2 m/s (Sitzen)     | Abkühlung durch Zugluft           |
| **Relative Luftfeuchte** | φ | 40–70 %                | Schweissregulation, Schleimhäute  |

### Personenbezogene Parameter (2)

| Parameter       | Symbol | Einheit | Typische Werte                 |
|-----------------|--------|---------|--------------------------------|
| **Aktivität (Metabolismus)** | M | met | 1.0 met = ruhig sitzend, 2.0 met = gehend |
| **Bekleidung**  | I_cl   | clo     | 0.5 clo = leicht, 1.0 clo = normal Winter |

**1 met** = 58.2 W/m² Körperoberfläche (ruhig sitzend)
**1 clo** = Wärmewiderstand von 0.155 m²K/W

---

## Operativtemperatur

Die **Operativtemperatur** kombiniert Luft- und Strahlungstemperatur:

```
T_op = (T_a + T_r) / 2   (vereinfacht, bei v < 0.2 m/s)
```

Beispiel: Raum 22 °C Lufttemperatur, kalte Fensterwand 14 °C (Strahlungstemperatur):
```
T_r (Mittel) ≈ 0.75 × 22 + 0.25 × 14 = 19.5 °C
T_op ≈ (22 + 19.5) / 2 = 20.75 °C  → gefühlt kühler als gemessen!
```

→ Kalte Fenster verringern die gefühlte Temperatur drastisch. Heizung muss kompensieren.

---

## PMV — Predicted Mean Vote

**PMV** (ISO 7730) ist ein Index der das mittlere Komfortempfinden einer Gruppe vorhersagt:

| PMV  | Empfinden         |
|------|-------------------|
| +3   | Sehr warm         |
| +2   | Warm              |
| +1   | Etwas warm        |
| **0** | **Neutral (ideal)** |
| −1   | Etwas kühl        |
| −2   | Kühl              |
| −3   | Kalt              |

**Komfortzone:** PMV zwischen −0.5 und +0.5

### PMV-Berechnung (vereinfacht)

PMV ist eine komplexe Funktion aller sechs Parameter (Fanger-Gleichung). Für die Praxis reicht oft:

- Büro, sitzend (1.2 met), normales Business-Outfit (1.0 clo):
  - Sommer (leicht, 0.5 clo): Komfort bei 24–26 °C
  - Winter (1.0 clo): Komfort bei 20–22 °C

---

## PPD — Predicted Percentage Dissatisfied

**PPD** gibt an wie viel Prozent einer Gruppe unzufrieden sind:

```
PPD = 100 − 95 × e^(−0.03353×PMV⁴ − 0.2179×PMV²)
```

| PMV     | PPD   |
|---------|-------|
| 0       | 5 %   |
| ±0.5    | ~10 % |
| ±1.0    | ~26 % |
| ±2.0    | ~77 % |

> **Minimum PPD = 5 %** — auch im idealen Raum sind 5 % der Menschen unzufrieden. Es gibt keine 100 % Zufriedenheit.

**Norm-Anforderung EN 16798-1:**
- Kategorie I: PPD < 6 % (PMV ±0.2)
- Kategorie II: PPD < 10 % (PMV ±0.5)
- Kategorie III: PPD < 15 % (PMV ±0.7)

---

## Zugluft (Draught)

Zugluft ist eine der häufigsten Komfortbeschwerden. Die **Zugluftrate (DR)** gibt die Wahrscheinlichkeit von Zugluftbeschwerden an:

```
DR = (34 − T_a) × (v̄ − 0.05)^0.62 × (0.37 × v̄ × TI + 3.14)
```

**Grenzwerte (EN ISO 7730):**

| Kategorie | DR max. | v̄ max. |
|-----------|---------|---------|
| A         | 10 %    | < 0.10 m/s |
| B         | 20 %    | < 0.16 m/s |
| C         | 30 %    | < 0.21 m/s |

**Praxis:** Zuluftströmungen > 0.2 m/s im Aufenthaltsbereich vermeiden. Auslässe entsprechend wählen (Weitwurfdüse statt Punktauslass auf den Kopf).

---

## Vertikale Temperaturschichtung

Unterschied zwischen Kopf- und Fusshöhe darf nicht zu gross sein:

| Differenz T (Kopf) − T (Fuss) | Kategorie | PPD |
|-------------------------------|-----------|-----|
| < 2 K                         | A         | < 3 % |
| < 3 K                         | B         | < 5 % |
| < 4 K                         | C         | < 10 % |

> Klassisches Problem: Konvektionsheizung mit Heizkörper unter dem Fenster → heisse Luft steigt auf → Kopf warm, Füsse kalt → vertikale Temperaturdifferenz > 4 K → unbehaglicher Raum.

---

## Komfort-Temperaturen nach Nutzung

| Nutzung                | Sommer-Soll | Winter-Soll | Grenzwerte         |
|------------------------|-------------|-------------|--------------------|
| Büro (sitzend)         | 24–25 °C    | 21–22 °C    | 19–26 °C (Norm)    |
| Wohnraum               | 24–25 °C    | 20–22 °C    | 18–26 °C           |
| Hotel Zimmer           | 24 °C       | 21 °C       | 19–25 °C           |
| Spitalsaal             | 24 °C       | 22 °C       | 22–26 °C (strenger)|
| Produktionshalle (körperlich) | 20–22 °C | 18–20 °C | 16–24 °C         |

---

## Adaptive Behaglichkeit

In natürlich belüfteten Gebäuden passt sich der Mensch an die Aussentemperatur an:

```
T_komfort = 0.33 × T_Aussenluft_gleitend + 18.8   [°C]
```

Bei heissem Sommer akzeptieren Menschen höhere Innentemperaturen als bei konstantem Klima. ASHRAE 55 Anhang I nutzt dieses Modell für natürliche Belüftung.

## Normen

- **EN ISO 7730** — Ergonomie der thermischen Umgebung, PMV/PPD Berechnung
- **EN 16798-1** — Raumkomfort, Kategorien I–III, Grenzwerte
- **ASHRAE 55** — Thermal Environmental Conditions for Human Occupancy (US)
- **SIA 382.1** — Lüftungs- und Klimaanlagen (CH, Temperaturanforderungen)
