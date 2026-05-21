---
title: Fussbodenheizung — Aufbau, Regelung und Trägheit
title_en: Underfloor Heating — Construction, Control and Thermal Lag
slug: fussbodenheizung
category: heizung
subcategory: heizsysteme
tags:
  [
    fussbodenheizung,
    fbh,
    flächenheizung,
    trägheit,
    vorlauftemperatur,
    niedrigtemperatur,
    regelkreis,
    verteiler,
    estrich,
    hydraulischer-abgleich,
    wärmepumpe,
    raumfühler,
    auskühlzeit
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulische-schaltungen, hydraulischer-abgleich, waermepumpe, pid-regler, pufferspeicher]
norm: [EN 1264, EN 15377, SIA 384.201]
updated: 2026-05-14
lang: de
---

# Fussbodenheizung — Aufbau, Regelung und Trägheit

Die Fussbodenheizung ist ein Flächenheizsystem — die gesamte Bodenfläche ist der Heizkörper. Sie bietet hohen Komfort bei niedrigen Vorlauftemperaturen, hat aber besondere Regelungsanforderungen durch ihre grosse thermische Trägheit.

## Aufbau

```
Raumnutzfläche (Fliesen, Parkett, Vinylboden)
    ↑
Estrich (5–8 cm) ← Thermische Masse (Wärmespeicher)
    ↑
Heizrohr (PE-X oder PEX-AL-PEX, Ø16–20 mm, Abstand 10–25 cm)
    ↑
Trittschalldämmung / Wärmedämmung
    ↑
Tragkonstruktion
```

### Systemvarianten

| Variante       | Aufbauhöhe | Trägheit | Einsatz                          |
| -------------- | ---------- | -------- | -------------------------------- |
| Nassestrich    | 65–100 mm  | Hoch     | Neubau Standard                  |
| Trockenestrich | 30–50 mm   | Mittel   | Renovation, leichte Konstruktion |
| Dünnschicht    | < 30 mm    | Niedrig  | Renovation mit wenig Aufbauhöhe  |

---

## Vorlauftemperatur — Niedrigtemperatur-System

Die FBH benötigt deutlich **niedrigere Vorlauftemperaturen** als Heizkörper:

| System              | Vorlauftemperatur | Spreizung |
| ------------------- | ----------------- | --------- |
| Radiatoren (alt)    | 70–90 °C          | 20 K      |
| Radiatoren (modern) | 55–70 °C          | 15 K      |
| Fussbodenheizung    | **30–45 °C**      | 5–10 K    |

**Warum niedrig?** Fussbodentemperatur darf 29 °C (Wohnbereich) bzw. 33 °C (Randzonen) nicht überschreiten (Komfort + Hygiene).

**Ideal für Wärmepumpen:** Je niedriger die Vorlauftemperatur, desto höher der COP der Wärmepumpe. FBH + WP = optimale Kombination.

---

## Thermische Trägheit — das zentrale Problem

Der Estrich hat eine hohe thermische Masse (spezifische Wärmekapazität Beton ≈ 2.0 kJ/(kg·K)):

```
Estrich Masse: ~100–150 kg/m² (bei 6 cm Dicke)
Wärmeinhalt:   bei ΔT = 10 K → 200–300 kJ/m²
Aufheizzeit:   1–3 Stunden bis Vollleistung (nach Kaltstart)
Abkühlzeit:    4–8 Stunden nach Abschalten
```

### Konsequenzen für die Regelung

1. **Langsame Reaktion:** Raumtemperatur reagiert erst nach Stunden auf Ventilveränderungen
2. **Überschwingen:** Wenn Regler zu aggressiv → schwingt mit grosser Amplitude
3. **Aufheizoptimierung:** Vorheizen nötig (1–3 Stunden vor Belegung)
4. **Nachtabsenkung:** Wenig sinnvoll — Estrich gibt Wärme noch Stunden ab

---

## Regelung der Fussbodenheizung

### Raumtemperatur-Regelung (Standard)

```
Raumfühler → Raumregler → Stellantrieb (Thermoventil am Verteiler)
```

Problem: Rückkopplung durch Estrich-Trägheit → sehr langsamer Regelkreis.

**Empfehlung:** P-Regler oder PI-Regler mit **sehr langer Nachstellzeit** (Ti = 60–120 min) → sanfte Nachregelung.

### Witterungsgeführter Vorlauf (bevorzugt)

```
Aussentemperatur → Heizkurve → Vorlauf-Soll (30–45 °C)
    ↓
[Mischventil-Regler] → Mischventil
    ↑ Vorlauf-Ist
```

Die Heizkurve liefert kontinuierlich passende Vorlauftemperatur → Estrich wird gleichmässig temperiert → kaum Schwankungen.

### Kombination (optimal)

```
Heizkurve → Vorlauf-Basis-Soll
    +
Raumtemperatur → Korrektur ±3 K auf Vorlauf-Soll
    =
Vorlauf-Soll (kombiniert) → Mischventil
```

---

## Verteiler und Kreise

### Heizkreis-Verteiler

Jede FBH-Zone hat einen **Verteiler** mit individuellen Stellantrieben:

```
Vorlauf → [Verteiler] ─┬─ Kreis 1 (Wohnzimmer)
                        ├─ Kreis 2 (Küche)
                        ├─ Kreis 3 (Schlafzimmer)
                        └─ Kreis 4 (Bad)
                            ↓ alle zurück zum Verteiler-Rücklauf
```

Jeder Kreis hat:

- Einstellventil (hydraulischer Abgleich)
- Thermostatischer oder motorischer Stellantrieb (EIN/AUS oder stetig)
- Rücklauftemperatur-Anzeige (optional)

### Hydraulischer Abgleich FBH

Entscheidend! FBH-Kreise sind unterschiedlich lang → ohne Abgleich bekommen kurze Kreise zu viel Durchfluss:

```
Kreislänge 50 m → Δp gering → Ventil wenig öffnen
Kreislänge 120 m → Δp hoch → Ventil weiter öffnen
```

Voreinstellventile am Verteiler setzen den Durchfluss aller Kreise auf den gleichen Wert.

---

## Estrich-Aufheizprotokoll

Frischer Estrich muss **vor dem ersten Betrieb** konditioniert werden:

```
Tag 1: Vorlauf 25 °C (3 Tage halten)
Steigerung: täglich +5 K
Tag 5: Vorlauf 45 °C (4 Tage halten)
Abkühlung: täglich −5 K
Dokumentation: Temperaturen täglich aufzeichnen
```

**Warum:** Feuchtigkeitsabgabe des Estrichs (Trocknungsschwindung). Zu schnelles Aufheizen → Rissbildung.

---

## Typische Fehler

| Fehler                    | Symptom                         | Lösung                             |
| ------------------------- | ------------------------------- | ---------------------------------- |
| Vorlauf zu hoch (> 50 °C) | Boden zu warm, Schäden          | Heizkurve anpassen                 |
| Kein Aufheizprotokoll     | Estrichrisse                    | Protokoll nachholen (wenn möglich) |
| Kein hydr. Abgleich       | Ungleichmässige Erwärmung       | Voreinstellventile einstellen      |
| Regler zu aggressiv       | Raumtemperatur schwingt (±3 K)  | Nachstellzeit vergrössern          |
| Nachtabsenkung zu tief    | Aufheizung morgens nicht fertig | Absenkniveau erhöhen oder weg      |

## Normen

- **EN 1264** — Raumflächenintegrierte Heiz- und Kühlsysteme
- **EN 15377** — Heizungsanlagen in Gebäuden
- **SIA 384.201** (CH) — Heizungsanlagen in Gebäuden

<!-- EN -->

## Underfloor Heating — Construction, Control and Thermal Lag

Underfloor heating (UFH) is a radiant floor heating system — the entire floor surface acts as the heat emitter. It provides high comfort at low flow temperatures, but has specific control requirements due to its large thermal mass.

## Construction

```
Floor covering (tiles, parquet, vinyl)
    ↑
Screed (5–8 cm) ← Thermal mass (heat store)
    ↑
Heating pipe (PE-X or PEX-AL-PEX, Ø16–20 mm, spacing 10–25 cm)
    ↑
Impact sound insulation / thermal insulation
    ↑
Structural floor
```

### System Variants

| Variant    | Build-up height | Lag    | Application                             |
| ---------- | --------------- | ------ | --------------------------------------- |
| Wet screed | 65–100 mm       | High   | Standard new build                      |
| Dry screed | 30–50 mm        | Medium | Renovation, lightweight construction    |
| Thin-bed   | < 30 mm         | Low    | Renovation with minimal build-up height |

---

## Flow Temperature — Low-Temperature System

UFH requires significantly **lower flow temperatures** than radiators:

| System             | Flow temperature | Spread |
| ------------------ | ---------------- | ------ |
| Radiators (old)    | 70–90 °C         | 20 K   |
| Radiators (modern) | 55–70 °C         | 15 K   |
| Underfloor heating | **30–45 °C**     | 5–10 K |

**Why low?** Floor surface temperature must not exceed 29 °C (occupied zones) or 33 °C (perimeter zones) — comfort and hygiene.

**Ideal for heat pumps:** The lower the flow temperature, the higher the COP. UFH + HP = optimum combination.

---

## Thermal Lag — the Central Challenge

The screed has a high thermal mass (specific heat capacity of concrete ≈ 2.0 kJ/(kg·K)):

```
Screed mass:  ~100–150 kg/m² (at 6 cm depth)
Heat content: at ΔT = 10 K → 200–300 kJ/m²
Heat-up time: 1–3 hours to full output (from cold start)
Cool-down:    4–8 hours after shutdown
```

### Consequences for Control

1. **Slow response:** Room temperature only reacts hours after valve changes
2. **Overshoot:** Aggressive controller → large-amplitude oscillation
3. **Pre-heat optimisation:** Pre-heating required (1–3 hours before occupancy)
4. **Night setback:** Rarely worthwhile — screed continues radiating heat for hours

---

## Underfloor Heating Control

### Room Temperature Control (standard)

```
Room sensor → room controller → actuator (thermostatic valve at manifold)
```

Problem: feedback through screed lag → very slow control loop.

**Recommendation:** P-controller or PI-controller with **very long integral time** (Ti = 60–120 min) → gentle correction.

### Weather-Compensated Flow Control (preferred)

```
Outdoor temperature → heating curve → flow setpoint (30–45 °C)
    ↓
[Mixing valve controller] → mixing valve
    ↑ Flow actual
```

The heating curve continuously delivers the right flow temperature → screed is tempered evenly → minimal fluctuation.

### Combined (optimal)

```
Heating curve → flow base setpoint
    +
Room temperature → correction ±3 K on flow setpoint
    =
Flow setpoint (combined) → mixing valve
```

---

## Manifold and Circuits

### Heating Circuit Manifold

Each UFH zone has a **manifold** with individual actuators:

```
Flow → [Manifold] ─┬─ Circuit 1 (living room)
                    ├─ Circuit 2 (kitchen)
                    ├─ Circuit 3 (bedroom)
                    └─ Circuit 4 (bathroom)
                        ↓ all return to manifold return header
```

Each circuit has:

- Pre-setting valve (hydraulic balancing)
- Thermostatic or motorised actuator (on/off or modulating)
- Return temperature indicator (optional)

### Hydraulic Balancing for UFH

Critical! UFH circuits have different lengths — without balancing, short circuits get too much flow:

```
Circuit length 50 m → low Δp → close valve more
Circuit length 120 m → high Δp → open valve more
```

Pre-setting valves at the manifold set the flow rate of all circuits to the same value.

---

## Screed Heat-Up Protocol

Fresh screed must be **conditioned before first operation**:

```
Day 1: Flow 25 °C (hold 3 days)
Increase: +5 K per day
Day 5: Flow 45 °C (hold 4 days)
Cool-down: −5 K per day
Documentation: record temperatures daily
```

**Why:** Moisture release from screed (drying shrinkage). Too rapid heat-up → cracking.

---

## Typical Faults

| Fault                     | Symptom                          | Solution                         |
| ------------------------- | -------------------------------- | -------------------------------- |
| Flow too high (> 50 °C)   | Floor too warm, damage           | Adjust heating curve             |
| No heat-up protocol       | Screed cracks                    | Carry out protocol (if possible) |
| No hydraulic balancing    | Uneven warming                   | Set pre-setting valves           |
| Controller too aggressive | Room temp oscillates (±3 K)      | Increase integral time           |
| Night setback too deep    | Pre-heat not complete by morning | Raise setback level or disable   |

## Standards

- **EN 1264** — Floor heating systems and cooling — systems and components
- **EN 15377** — Heating systems in buildings
- **SIA 384.201** (CH) — Heating systems in buildings
