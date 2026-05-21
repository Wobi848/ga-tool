---
title: Heizung Grundlagen — Aufbau und Komponenten
title_en: Heating Fundamentals — System Layout and Components
slug: heizung-grundlagen
category: heizung
subcategory: grundlagen
tags:
  [
    heizung,
    warmwasserheizung,
    vorlauf,
    rücklauf,
    heizkreis,
    pumpe,
    mischventil,
    ausdehnungsgefäss,
    sicherheitsventil,
    erzeuger,
    verteiler,
    verbraucher,
    heizkörper,
    fern-wärme,
    kesselregelung
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [
    hydraulische-schaltungen,
    hydraulischer-abgleich,
    heizkurve,
    waermepumpe,
    pufferspeicher,
    fussbodenheizung
  ]
norm: [EN 12828, VDI 2035, SIA 384.201]
updated: 2026-05-14
lang: de
---

# Heizung Grundlagen — Aufbau und Komponenten

Die Warmwasserheizung ist das häufigste Heizsystem in Gebäuden. Verstehen wie Wärmeerzeugung, Verteilung und Abgabe zusammenspielen ist Grundlage für jede GA-Arbeit im Heizungsbereich.

## System-Übersicht

```
ERZEUGER         VERTEILUNG           VERBRAUCHER
   │                  │                    │
[Kessel/WP]     [Pumpe + Rohrnetz]   [Heizkörper/FBH]
   │                  │                    │
Vorlauf (warm) ──────────────────────────────► Wärmeabgabe
Rücklauf (kalt) ◄────────────────────────────
   │
[Sicherheitsgruppe]
[Ausdehnungsgefäss]
[Mischventil (Heizkreis)]
```

---

## Erzeuger

### Kessel (Gas, Öl)

| Kesseltyp        | Wirkungsgrad | Vorlauf max. | Besonderheit                     |
| ---------------- | ------------ | ------------ | -------------------------------- |
| Niedertemperatur | 88–92 %      | 80 °C        | Muss immer > 55 °C RL            |
| Brennwert        | 97–105 %     | 80 °C        | Kondensiert → höher Wirkungsgrad |
| Heizkessel (alt) | 75–85 %      | 90 °C        | Veraltet, wenig effizient        |

**Brennwert:** Latente Wärme aus Kondensation wird genutzt → Wirkungsgrad > 100 % (bezogen auf Heizwert). Kondensatableitung nötig.

### Modulierende Kesselregelung

Moderner Brennwertkessel passt seine Leistung stufenlos an:

- Modulationsbereich: 20–100 % der Nennleistung
- Regelgrösse: Vorlauftemperatur (aus Heizkurve)
- Vorteile: weniger Taktbetrieb, besserer Jahreswirkungsgrad

---

## Sicherheitskomponenten

### Ausdehnungsgefäss (MAG)

Wasser dehnt sich beim Erwärmen aus (4 → 80 °C: ca. 3 % Volumenänderung). Das MAG nimmt diese Ausdehnung auf:

```
System kalt (20°C): MAG-Membran gedrückt, Luftvolumen maximal
System warm (80°C): Wasser dehnt sich aus → MAG-Membran gedrückt → Luftvolumen kleiner
```

**Dimensionierung:**

```
V_MAG ≥ V_Anlage × 0.04 (4 % Expansion)
Vordruck: = statische Anlage-Höhe + 0.2–0.5 bar
```

Zu kleines MAG → Sicherheitsventil öffnet → Wasserverlust.

### Sicherheitsventil

- Öffnet bei Überdruck (schützt System vor Bersten)
- Ansprechdruck: typisch 3 bar (Heizanlage)
- **Muss auf Auffangbehälter oder Ablauf pipen** (heisses Wasser/Dampf!)
- Prüfpflicht: jährlich manuell betätigen

### Füllautomat / Druckhaltestation

Hält den Systemdruck in definierten Grenzen:

- Unterschreitung: automatisches Nachfüllen (Wasseranschluss)
- Überschreitung: Sicherheitsventil öffnet

**GA-Überwachung:** Systemdruck AI → Alarm wenn < 1.0 bar oder > 3.0 bar.

---

## Verteiler und Heizkreise

### Verteiler/Sammler

```
Vorlauf ──────[Verteiler]──┬── HK1 (Radiatoren)
                             ├── HK2 (FBH)
                             ├── HK3 (Lufterhitzer)
                             └── WW  (Warmwasser-Speicher)
Rücklauf ◄────[Sammler]────┴── alle Rückläufe
```

Jeder Heizkreis hat eigene Pumpe + Mischventil oder nur Pumpe (mit Boilerventil).

### Mischventil pro Heizkreis

3-Wege-Ventil mischt Vorlauf + Rücklauf:

- Warmwasser-Heizkreis (75/65 °C): Ventil nahe Vorlauf-Position
- Fussbodenheizungs-Kreis (35/30 °C): Ventil deutlich gedrosselt (viel Rücklauf beigemischt)

---

## Betriebsparameter

### Systemdruck

| Anlagenhöhe | Mindestdruck | Maximaldruck    |
| ----------- | ------------ | --------------- |
| 0–10 m      | 1.0–1.5 bar  | 3.0 bar         |
| 10–20 m     | 1.5–2.0 bar  | 4.0 bar         |
| > 20 m      | 2.0+ bar     | abhängig Anlage |

**GA:** Systemdruck kontinuierlich überwachen. Druckabfall → Leck oder Entlüftung nötig.

### Temperaturspreizung

| System              | Vorlauf | Rücklauf | Spreizung |
| ------------------- | ------- | -------- | --------- |
| Radiatoren (alt)    | 90 °C   | 70 °C    | 20 K      |
| Radiatoren (modern) | 70 °C   | 55 °C    | 15 K      |
| Niedertemperatur    | 55 °C   | 40 °C    | 15 K      |
| FBH                 | 40 °C   | 30 °C    | 10 K      |
| FBH (Wärmepumpe)    | 35 °C   | 28 °C    | 7 K       |

Grössere Spreizung = mehr Wärme pro Liter Wasser = kleinere Pumpe nötig.

---

## GA-Datenpunkte Heizung Grundlagen

| Datenpunkt                | Typ | Einheit | Beschreibung              |
| ------------------------- | --- | ------- | ------------------------- |
| Erzeuger VL-Temp          | AI  | °C      | Heizkessel/WP Vorlauf     |
| Erzeuger RL-Temp          | AI  | °C      | Heizkessel/WP Rücklauf    |
| Systemdruck               | AI  | bar     | Drucküberwachung          |
| Aussentemperatur          | AI  | °C      | Für Heizkurve             |
| Erzeuger EIN/AUS          | DO  | —       | Freigabe Kessel/WP        |
| Erzeuger Störung          | DI  | —       | Sammelmeldung             |
| Erzeuger Leistung         | AI  | kW      | Aktuelle Wärmeleistung    |
| Primär-Pumpe              | DO  | —       | EIN/AUS                   |
| Pumpe Laufmeldung         | DI  | —       | Betriebsrückmeldung       |
| Sicherheitsventil Öffnung | DI  | —       | Alarmsignal (Druckventil) |

## Normen

- **EN 12828** — Heizungsanlagen in Gebäuden
- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **SIA 384.201** — Heizungsanlagen in Gebäuden (Schweizer Norm)
- **EN 14336** — Installation und Abnahme Heizungsanlagen

<!-- EN -->

The hot-water heating system is the most common heating system in buildings. Understanding how heat generation, distribution, and emission work together is the foundation for any BA work in the heating domain.

## System Overview

```
GENERATOR         DISTRIBUTION           EMITTERS
    │                   │                    │
[Boiler/HP]     [Pump + pipework]   [Radiators/UFH]
    │                   │                    │
Supply (warm) ──────────────────────────────► Heat output
Return (cool) ◄────────────────────────────
    │
[Safety group]
[Expansion vessel]
[Mixing valve (heating circuit)]
```

---

## Heat Generators

### Boiler (Gas, Oil)

| Boiler type        | Efficiency | Max. supply temp. | Note                            |
| ------------------ | ---------- | ----------------- | ------------------------------- |
| Low-temperature    | 88–92 %    | 80 °C             | Return must always be > 55 °C   |
| Condensing         | 97–105 %   | 80 °C             | Condensates → higher efficiency |
| Conventional (old) | 75–85 %    | 90 °C             | Outdated, low efficiency        |

**Condensing boiler:** Latent heat from condensation is utilised → efficiency > 100 % (relative to net calorific value). Condensate drainage required.

### Modulating Boiler Control

Modern condensing boilers adjust output continuously:

- Modulation range: 20–100 % of rated output
- Controlled variable: supply temperature (from heating curve)
- Benefits: less cycling, better seasonal efficiency

---

## Safety Components

### Expansion Vessel (EV)

Water expands when heated (4 → 80 °C: ~3 % volume change). The EV accommodates this expansion:

```
System cold (20°C): EV membrane pressed in, air volume maximum
System warm (80°C): water expands → EV membrane compressed → air volume reduced
```

**Sizing:**

```
V_EV ≥ V_system × 0.04 (4 % expansion)
Pre-charge pressure = static system height + 0.2–0.5 bar
```

Undersized EV → safety valve opens → water loss.

### Safety Valve

- Opens on overpressure (protects system from bursting)
- Set pressure: typically 3 bar (heating system)
- **Must pipe to a collecting vessel or drain** (hot water/steam!)
- Test requirement: actuate manually once a year

### Automatic Filling Unit / Pressurisation Station

Maintains system pressure within defined limits:

- Low pressure: automatic top-up (mains water connection)
- High pressure: safety valve opens

**BA monitoring:** System pressure AI → alarm if < 1.0 bar or > 3.0 bar.

---

## Distribution and Heating Circuits

### Manifold / Collector

```
Supply ──────[Manifold]──┬── HC1 (radiators)
                          ├── HC2 (UFH)
                          ├── HC3 (air heater)
                          └── DHW (hot water cylinder)
Return ◄────[Collector]──┴── all returns
```

Each heating circuit has its own pump + mixing valve, or just a pump (with cylinder valve).

### Mixing Valve per Heating Circuit

3-way valve mixes supply + return:

- Hot-water circuit (75/65 °C): valve near supply position
- Underfloor heating circuit (35/30 °C): valve clearly throttled (much return blended in)

---

## Operating Parameters

### System Pressure

| System height | Minimum pressure | Maximum pressure |
| ------------- | ---------------- | ---------------- |
| 0–10 m        | 1.0–1.5 bar      | 3.0 bar          |
| 10–20 m       | 1.5–2.0 bar      | 4.0 bar          |
| > 20 m        | 2.0+ bar         | System-dependent |

**BA:** Monitor system pressure continuously. Pressure drop → leak or venting required.

### Temperature Spread

| System             | Supply | Return | Spread |
| ------------------ | ------ | ------ | ------ |
| Radiators (old)    | 90 °C  | 70 °C  | 20 K   |
| Radiators (modern) | 70 °C  | 55 °C  | 15 K   |
| Low-temperature    | 55 °C  | 40 °C  | 15 K   |
| UFH                | 40 °C  | 30 °C  | 10 K   |
| UFH (heat pump)    | 35 °C  | 28 °C  | 7 K    |

Larger spread = more heat per litre of water = smaller pump required.

---

## BA Data Points — Heating Fundamentals

| Data point             | Type | Unit | Description             |
| ---------------------- | ---- | ---- | ----------------------- |
| Generator supply temp. | AI   | °C   | Boiler/HP supply        |
| Generator return temp. | AI   | °C   | Boiler/HP return        |
| System pressure        | AI   | bar  | Pressure monitoring     |
| Outdoor temperature    | AI   | °C   | For heating curve       |
| Generator ON/OFF       | DO   | —    | Boiler/HP enable        |
| Generator fault        | DI   | —    | Collective fault        |
| Generator output       | AI   | kW   | Current heat output     |
| Primary pump           | DO   | —    | ON/OFF                  |
| Pump run feedback      | DI   | —    | Run confirmation        |
| Safety valve open      | DI   | —    | Alarm (pressure relief) |

## Standards

- **EN 12828** — Heating systems in buildings
- **VDI 2035** — Prevention of damage in hot-water heating systems
- **SIA 384.201** — Heating systems in buildings (Swiss standard)
- **EN 14336** — Installation and commissioning of heating systems
