---
title: Druckverlust in Rohrleitungen
title_en: Pressure Loss in Piping Systems
slug: druckverlust
category: heizung
subcategory: hydraulik
tags: [druckverlust, rohrnetz, reibung, einzelwiderstand, zeta, lambda, reynolds, dimensionierung, dn]
difficulty: fortgeschritten
area: [hlk]
related: [kv-wert, pumpe, hydraulischer-abgleich]
norm: [SIA 384/2, SIA 384/3]
updated: 2026-05-14
lang: de
---

# Druckverlust in Rohrleitungen

Der **Druckverlust** in einem Rohrnetz bestimmt die nötige **Pumpenleistung** und die **Auslegung der Komponenten**. Zu viel = Pumpe zu gross + Geräusche. Zu wenig = Pumpe zu schwach, Wärme kommt nicht an.

> 🧮 **Tool:** Mit dem [Druckverlust-Rechner](/rechner/druckverlust) kannst du Strang-Druckverluste für Standard-DN durchrechnen.

## Zwei Anteile

```
Δp_total = Δp_Reibung + Δp_Einzelwiderstände
```

### 1. Reibungsdruckverlust Δp_L

```
Δp_L = λ × (L / d) × (ρ × v²) / 2
```

- **λ** — Reibungsbeiwert (dimensionslos)
- **L** — Länge der Rohrleitung [m]
- **d** — Innendurchmesser [m]
- **ρ** — Dichte des Mediums [kg/m³] (Wasser 20 °C: 998)
- **v** — Strömungsgeschwindigkeit [m/s]

### 2. Einzelwiderstände Δp_Z

```
Δp_Z = Σζ × (ρ × v²) / 2
```

Σζ ist die Summe aller **Widerstandsbeiwerte** für Bögen, T-Stücke, Ventile, etc.

## Reibungsbeiwert λ

Hängt von der **Reynolds-Zahl** Re ab:

```
Re = (v × d) / ν      // ν = kinematische Viskosität
```

| Bereich       | Re             | Formel für λ              |
|---------------|----------------|---------------------------|
| Laminar       | Re < 2300      | λ = 64 / Re               |
| Übergang      | 2300 < Re < 4000| undefiniert (vermeiden!)|
| Turbulent     | Re > 4000      | Colebrook-White (iterativ)|

In der Praxis nimmt man Tabellenwerte oder die **Swamee-Jain-Approximation**:

```
λ = 0.25 / [log₁₀(k/(3.7·d) + 5.74/Re^0.9)]²
```

## Faustwerte Strömungsgeschwindigkeit

| Anwendung                  | Empfohlen v [m/s] |
|----------------------------|-------------------|
| Verteiler / Hauptstrang    | 0.8 – 1.2         |
| Steigleitung               | 0.5 – 1.0         |
| Anbindeleitung Heizkörper  | 0.3 – 0.5         |
| Kupferrohr Trinkwasser     | ≤ 2.0             |
| Erdsonden-Sole             | 0.6 – 1.0         |

- **Zu schnell (> 1.5 m/s):** Geräusche, Erosion, hoher Druckverlust
- **Zu langsam (< 0.2 m/s):** Lufteinschluss, Sedimentation

## Widerstandsbeiwerte ζ (typisch)

| Element                       | ζ           |
|-------------------------------|-------------|
| 90° Bogen (R/d = 1)           | 0.5 – 0.8   |
| 90° Bogen (R/d ≥ 4)           | 0.2         |
| 45° Bogen                     | 0.2 – 0.3   |
| T-Stück (Durchgang)           | 0.3 – 0.6   |
| T-Stück (Abzweig)             | 1.0 – 1.5   |
| Rückschlagklappe              | 2.0 – 5.0   |
| Schmutzfänger (sauber)        | 1.0 – 2.0   |
| Kugelhahn (offen)             | 0.1 – 0.3   |
| Eckventil                     | 4 – 6       |

## Praktische Dimensionierung

**Faustwert:** Δp ≈ 100 – 200 Pa/m im Hauptstrang ist üblich.

Vorgehen:

1. Längen aller Stränge erfassen (inkl. Rücklauf!)
2. Volumenstrom pro Strang berechnen (aus Heizleistung Q = ṁ·cp·ΔT)
3. Erste DN-Auswahl nach Faustregel oder Tabelle (v ≈ 0.8 m/s)
4. Druckverlust rechnen, prüfen ob in Spec
5. **Ungünstigster Strang** definiert Förderhöhe der Pumpe
6. Andere Stränge mit **Strangregulierventilen** drosseln (hydraulischer Abgleich)

## Hydraulischer Abgleich

Ohne Abgleich: nahe Heizkörper werden heiss, ferne kalt. Lösung:

- **Thermostatventile** mit Voreinstellung (kv-Wert)
- **Strangregulierventile** (Cocon QTZ, Frese Optima, etc.)
- **Differenzdruckregler** an Strängen mit variablem Volumenstrom

## Häufige Fehler

1. **Rücklauf-Länge vergessen** → Druckverlust halbiert
2. **Einzelwiderstände unterschätzt** → bei kurzen Anlagen 50 % des Verlusts!
3. **Falsches Medium** → Sole hat 2× höhere Viskosität als Wasser
4. **Strangabgleich vergessen** → ungleichmässige Wärmeverteilung

## Siehe auch

- Kv-Wert (Ventilauslegung)
- Pumpenauslegung
- Hydraulischer Abgleich

<!-- EN -->

**Pressure loss** in a pipe network determines the required **pump head** and **component sizing**. Too high = oversized pump and noise. Too low = pump too weak, heat doesn't reach the end points.

> 🧮 **Tool:** Use the [Pressure Loss Calculator](/rechner/druckverlust) to calculate branch pressure drops for standard pipe sizes.

## Two Components

```
Δp_total = Δp_friction + Δp_fittings
```

### 1. Friction Pressure Loss Δp_L

```
Δp_L = λ × (L / d) × (ρ × v²) / 2
```

- **λ** — friction factor (dimensionless)
- **L** — pipe length [m]
- **d** — inner diameter [m]
- **ρ** — fluid density [kg/m³] (water at 20 °C: 998)
- **v** — flow velocity [m/s]

### 2. Fitting Losses Δp_Z

```
Δp_Z = Σζ × (ρ × v²) / 2
```

Σζ is the sum of all **resistance coefficients** for bends, tees, valves, etc.

## Friction Factor λ

Depends on the **Reynolds number** Re:

```
Re = (v × d) / ν      // ν = kinematic viscosity
```

| Range | Re | Formula for λ |
|-------|----|----|
| Laminar | Re < 2300 | λ = 64 / Re |
| Transitional | 2300 < Re < 4000 | undefined (avoid!) |
| Turbulent | Re > 4000 | Colebrook-White (iterative) |

In practice, use lookup tables or the **Swamee-Jain approximation**:

```
λ = 0.25 / [log₁₀(k/(3.7·d) + 5.74/Re^0.9)]²
```

## Recommended Flow Velocities

| Application | Recommended v [m/s] |
|-------------|---------------------|
| Distributor / main header | 0.8 – 1.2 |
| Riser | 0.5 – 1.0 |
| Radiator connection | 0.3 – 0.5 |
| Copper pipe drinking water | ≤ 2.0 |
| Ground source brine | 0.6 – 1.0 |

- **Too fast (> 1.5 m/s):** Noise, erosion, high pressure loss
- **Too slow (< 0.2 m/s):** Air pockets, sedimentation

## Fitting Resistance Coefficients ζ (typical)

| Element | ζ |
|---------|---|
| 90° bend (R/d = 1) | 0.5 – 0.8 |
| 90° bend (R/d ≥ 4) | 0.2 |
| 45° bend | 0.2 – 0.3 |
| Tee (straight through) | 0.3 – 0.6 |
| Tee (branch) | 1.0 – 1.5 |
| Check valve | 2.0 – 5.0 |
| Y-strainer (clean) | 1.0 – 2.0 |
| Ball valve (open) | 0.1 – 0.3 |
| Globe valve | 4 – 6 |

## Practical Sizing

**Rule of thumb:** Δp ≈ 100 – 200 Pa/m in the main header is typical.

Procedure:

1. Record all branch lengths (including return!)
2. Calculate flow rate per branch (from heating load Q = ṁ·cp·ΔT)
3. Initial pipe size selection from velocity table (v ≈ 0.8 m/s)
4. Calculate pressure loss, check against specification
5. **Most unfavourable branch** defines the pump head
6. Balance other branches with **circuit balancing valves**

## Hydraulic Balancing

Without balancing: nearby radiators overheat, distant ones stay cold. Solutions:

- **Thermostatic valves** with presetting (Kv value)
- **Circuit balancing valves** (Cocon QTZ, Frese Optima, etc.)
- **Differential pressure controllers** on variable flow branches

## Common Mistakes

1. **Forgetting return pipe length** → pressure loss halved
2. **Underestimating fitting losses** → can be 50 % of total in short systems!
3. **Wrong fluid** → brine has 2× higher viscosity than water
4. **Skipping hydraulic balancing** → uneven heat distribution

## See also

- Kv value (valve sizing)
- Pump sizing
- Hydraulic balancing
