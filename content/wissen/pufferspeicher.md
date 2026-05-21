---
title: Pufferspeicher — Funktion, Einbindung und Schichtung
title_en: Buffer Storage — Function, Integration and Stratification
slug: pufferspeicher
category: heizung
subcategory: speicher
tags:
  [
    pufferspeicher,
    hydraulik,
    schichtung,
    warmwasser,
    solar,
    waermepumpe,
    heizkreis,
    temperatursensor,
    ddc,
    speicherladung,
    stratifikation,
    bypass,
    entkopplung,
    mindestvolumenstrom
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [waermepumpe, hydraulische-schaltungen, hydraulischer-abgleich, pid-regler, legionellen]
norm: [EN 12977, VDI 2035]
updated: 2026-05-14
lang: de
---

# Pufferspeicher — Funktion, Einbindung und Schichtung

Ein **Pufferspeicher** entkoppelt Wärmeerzeugung und Wärmeverbrauch. Er ist kein einfacher "Wassertank" — Schichtung, Einbindung und Regelung bestimmen ob er seinen Job erledigt oder Probleme macht.

## Warum ein Pufferspeicher?

### Problem 1: Mindestvolumenstrom (Wärmepumpe)

Eine Wärmepumpe braucht einen **Mindestvolumenstrom** durch den Verdampfer/Kondensator. Wenn alle Heizkreis-Thermostatventile schliessen → Durchfluss sinkt → WP schaltet ab (Schutzabschaltung).

Lösung: Puffer zwischen WP und Heizkreis → WP-Seite hat immer genug Durchfluss.

### Problem 2: Taktbetrieb (Wärmepumpe, Kessel)

Ohne Puffer startet Wärmepumpe sehr häufig (kurze Taktzeiten) → Verschleiss, schlechter COP.
Mit Puffer: WP läuft länger, seltener → bessere Effizienz.

### Problem 3: Solare Überschüsse

Solaranlage produziert mehr als gerade benötigt → Puffer speichert → Verbrauch später.

### Problem 4: Spitzenlast-Entkopplung

Wärmeerzeuger ist schwächer als Verbraucher-Spitze → Puffer gleicht aus.

---

## Schichtung (Stratifikation)

Der Pufferspeicher funktioniert wie ein natürlich geschichteter Körper:

```
Oben:   Warm (+60–80 °C) ← Eintritt Erzeuger (Vorlauf)
                              Entnahme Heizkreis (Vorlauf)
─────────────────────────────────────────────────
Mitte:  Mitteltemperatur (~45 °C)
─────────────────────────────────────────────────
Unten:  Kalt (+20–40 °C) ← Rücklauf Heizkreis
                              Austritt Erzeuger (Rücklauf)
```

**Warmes Wasser steigt auf, kaltes sinkt** — natürliche Schichtung. Gut geschichteter Puffer kann Erzeuger und Verbraucher bei unterschiedlichen Temperaturniveaus bedienen.

### Einbindung (Rohranschlüsse)

```
Vorlauf Erzeuger → [oben]
Vorlauf Verbraucher ← [oben bis Mitte je nach Temperatur]
Rücklauf Verbraucher → [unten bis Mitte]
Rücklauf Erzeuger ← [unten]
```

**Schichtungszerstörung vermeiden:**

- Rohranschlüsse **oben** und **unten** (nicht seitlich mittig)
- Einströmgeschwindigkeit gering halten (< 0.2 m/s im Speicher)
- Einströmung gegen Prallblech oder über Taucheinstutzen

---

## Puffergrösse

**Faustformel Wärmepumpe:**

```
V_Puffer ≥ 20–50 Liter pro kW WP-Leistung
```

Beispiel: 10 kW WP → 200–500 Liter Puffer

**Faustformel Solar:**

```
V_Puffer ≥ 50–75 Liter pro m² Kollektorfläche
```

**Zu klein:** Häufiges Takten, keine Entkopplung
**Zu gross:** Lange Aufheizzeit, Wärmeverluste, Legionellengefahr (wenn WW-Anteil)

---

## Temperatursensoren und Regelung

Typische Sensor-Positionen:

```
Puffer (vereinfacht):

[Sensor oben T_oben]     ←── Erzeuger Vorlauf
                              ←── Heizkreis Vorlauf
─────────────────────────────
[Sensor mitte T_mitte]
─────────────────────────────
[Sensor unten T_unten]   ←── Erzeuger Rücklauf
                              ←── Heizkreis Rücklauf
```

### Ladelogik Wärmepumpe

```
Wenn T_oben < Soll_Speicher (z.B. 55 °C):
  → WP starten, laden bis T_oben ≥ Soll + Hysterese (z.B. 57 °C)

Wenn T_oben ≥ Soll + Hysterese:
  → WP stoppen, Speicher hält Wärme vor
```

**Wichtig:** Speicher-Solltemperatur muss zur WP-Vorlauftemperatur passen (Effizienz!). Je höher der Sollwert, desto schlechter der COP.

### Heizkreis-Entnahme

```
Wenn T_oben > Heizkreis-Vorlauftemperatur:
  → Heizkreis direkt aus Speicher versorgt (kein Mischer nötig)

Wenn T_oben knapp über oder unter Heizkreis-Soll:
  → Mischventil oder 3-Wege-Ventil reduziert Temperatur
```

---

## Kombispeicher (Puffer + Warmwasser)

Kombispeicher enthält beides — **Heizungspuffer** und **Trinkwarmwasser**:

```
Aussen:  Heizungswasser (geschlossener Kreis)
Innen:   Edelstahl-Hygienespeicher für Trinkwasser (Wärmetauscher oder Rohrschlange)
```

**Vorteile:** Kompakt, ein Gerät
**Nachteile:** Warmwasser begrenzt durch Wärmetauscher-Fläche; Legionellen-Aspekte beachten!

---

## Pufferspeicher bei Wärmepumpe: typische GA-Regelung

```
DDC Heizung/WP:
  AI: T_Puffer_oben (PT1000)
  AI: T_Puffer_mitte (PT1000)
  AI: T_Puffer_unten (PT1000)
  AI: T_Aussenluft
  DI: WP-Betriebsmeldung
  DI: WP-Störung
  DO: WP-Freigabe (EIN/AUS)
  AO: Heizkreis-Mischventil (0–10 V)

Programm:
  1. Berechne Heizkreis-Solltemperatur (Heizkurve)
  2. Wenn T_Puffer_oben < Soll − 3 K → WP freigeben
  3. WP heizt Puffer bis T_Puffer_oben = Soll + 2 K
  4. Heizkreis-Pumpe und Mischventil regeln auf Vorlauf-Soll
```

## Normen

- **EN 12977** — Thermische Solaranlagen, Heizkessel, Pufferspeicher
- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **SIA 384.201** — Heizungsanlagen in Gebäuden (CH)

<!-- EN -->

## Buffer Storage — Function, Integration and Stratification

A **buffer storage tank** decouples heat generation from heat consumption. It is not a simple "water tank" — stratification, integration and control determine whether it does its job or causes problems.

## Why a Buffer Storage Tank?

### Problem 1: Minimum Flow Rate (Heat Pump)

A heat pump requires a **minimum flow rate** through the evaporator/condenser. When all heating circuit thermostatic valves close → flow drops → HP shuts down (safety cutout).

Solution: buffer between HP and heating circuits → HP side always has enough flow.

### Problem 2: Short Cycling (Heat Pump, Boiler)

Without a buffer the heat pump starts very frequently (short cycle times) → wear, poor COP.
With buffer: HP runs longer, less frequently → better efficiency.

### Problem 3: Solar Surplus

Solar system produces more than currently needed → buffer stores it → consumed later.

### Problem 4: Peak Load Decoupling

Heat generator is weaker than consumer peak → buffer compensates.

---

## Stratification

The buffer tank works as a naturally stratified body:

```
Top:    Hot (+60–80 °C) ← Generator supply (flow)
                             Heating circuit take-off (flow)
─────────────────────────────────────────────────────
Middle: Medium temperature (~45 °C)
─────────────────────────────────────────────────────
Bottom: Cold (+20–40 °C) ← Heating circuit return
                             Generator return
```

**Warm water rises, cold water sinks** — natural stratification. A well-stratified buffer can serve generator and consumers at different temperature levels.

### Pipe Connections

```
Generator flow → [top]
Consumer flow  ← [top to middle depending on temperature]
Consumer return → [bottom to middle]
Generator return ← [bottom]
```

**Avoid destroying stratification:**

- Pipe connections at **top** and **bottom** (not centrally on the side)
- Keep inflow velocity low (< 0.2 m/s inside tank)
- Inflow against baffle plate or via dip tube

---

## Buffer Tank Sizing

**Rule of thumb for heat pumps:**

```
V_buffer ≥ 20–50 litres per kW HP output
```

Example: 10 kW HP → 200–500 litre buffer

**Rule of thumb for solar:**

```
V_buffer ≥ 50–75 litres per m² collector area
```

**Too small:** frequent cycling, no decoupling
**Too large:** long heat-up time, heat losses, Legionella risk (if DHW component)

---

## Temperature Sensors and Control

Typical sensor positions:

```
Buffer tank (simplified):

[Sensor top T_top]      ←── Generator flow
                              ←── Heating circuit flow
─────────────────────────────
[Sensor mid T_mid]
─────────────────────────────
[Sensor bot T_bot]      ←── Generator return
                              ←── Heating circuit return
```

### Heat Pump Charging Logic

```
If T_top < setpoint (e.g. 55 °C):
  → Start HP, charge until T_top ≥ setpoint + hysteresis (e.g. 57 °C)

If T_top ≥ setpoint + hysteresis:
  → Stop HP, buffer maintains stored heat
```

**Important:** Buffer setpoint temperature must match HP flow temperature (efficiency!). The higher the setpoint, the worse the COP.

### Heating Circuit Take-off

```
If T_top > heating circuit flow temperature:
  → Heating circuit supplied directly from buffer (no mixer required)

If T_top just above or below heating circuit setpoint:
  → Mixing valve or 3-way valve reduces temperature
```

---

## Combi-Storage (Buffer + DHW)

Combi-storage contains both — **heating buffer** and **domestic hot water**:

```
Outside: Heating water (closed circuit)
Inside:  Stainless steel hygienic store for drinking water (heat exchanger or coil)
```

**Advantages:** Compact, single unit
**Disadvantages:** DHW limited by heat exchanger area; Legionella aspects must be observed!

---

## Buffer Tank with Heat Pump: Typical BA Control

```
DDC Heating/HP:
  AI: T_Buffer_top (PT1000)
  AI: T_Buffer_mid (PT1000)
  AI: T_Buffer_bot (PT1000)
  AI: T_OutdoorAir
  DI: HP operating status
  DI: HP fault
  DO: HP enable (ON/OFF)
  AO: Heating circuit mixing valve (0–10 V)

Programme:
  1. Calculate heating circuit setpoint (heating curve)
  2. If T_Buffer_top < setpoint − 3 K → enable HP
  3. HP heats buffer until T_Buffer_top = setpoint + 2 K
  4. Heating circuit pump and mixing valve control to flow setpoint
```

## Standards

- **EN 12977** — Thermal solar systems, boilers, buffer storage tanks
- **VDI 2035** — Prevention of damage in hot water heating systems
- **SIA 384.201** — Heating systems in buildings (CH)
