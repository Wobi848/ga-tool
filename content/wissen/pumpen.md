---
title: Pumpen — Kennlinie, Regelung und EC-Pumpen
title_en: Pumps — Characteristic Curve, Control and EC Pumps
slug: pumpen
category: hydraulik
subcategory: pumpen
tags:
  [
    pumpe,
    pumpenkennlinie,
    arbeitspunkt,
    volumenstrom,
    förderhöhe,
    differenzdruck,
    ec-pumpe,
    nassläufer,
    trockenläufer,
    proportionaldruck,
    konstantdruck,
    frequenzumrichter,
    leistungszahl,
    cavitation,
    npsh
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [hydraulische-schaltungen, hydraulischer-abgleich, ec-motoren, frequenzumrichter, pid-regler]
norm: [EN ISO 9906, ErP 2012/622/EU]
updated: 2026-05-14
lang: de
---

# Pumpen — Kennlinie, Regelung und EC-Pumpen

Pumpen sind die "Herzen" von Heizungs-, Kühlungs- und Sanitäranlagen. Das Verständnis der Pumpenkennlinie und der richtigen Regelungsstrategie ist Grundlage für effiziente und zuverlässige Anlagen.

## Pumpenkennlinie und Anlagenkennlinie

### Pumpenkennlinie

Zeigt die **Förderhöhe H** (oder Differenzdruck Δp) in Abhängigkeit vom **Volumenstrom Q**:

```
H [m]
│\
│ \  Pumpenkennlinie
│  \
│   \___
│       \___
│           \___
└──────────────── Q [m³/h]
```

Bei Q = 0 (Nullförderung): maximale Förderhöhe (Abschalthöhe)
Bei H = 0 (Drucklosförderung): maximaler Volumenstrom (Freiausflussmenge)

### Anlagenkennlinie

Das Rohrleitungssystem hat einen Widerstand der mit Q² steigt:

```
H [m]
│         /  Anlagenkennlinie (∝ Q²)
│        /
│       /
│      /
│_____/  (Nullpunkt = statische Förderhöhe)
└──────────────── Q [m³/h]
```

### Arbeitspunkt

Der **Arbeitspunkt** ist der Schnittpunkt von Pumpen- und Anlagenkennlinie:

```
H [m]
│
│  Pumpe       ●  Arbeitspunkt
│     ↘      ↗
│       ↘  ↗  Anlage
│         ●
└──────────────── Q [m³/h]
             AP (Q_0, H_0)
```

---

## Regelungsstrategien

### Konstantdruck

Differenzdruck wird auf konstantem Wert gehalten, unabhängig vom Volumenstrom:

```
Q = 100 % → Δp = Soll
Q = 50 %  → Δp = Soll (Drehzahl reduziert!)
```

**Einsatz:** Trinkwasser, Brauchwasser, wenn alle Abnehmer gleichen Druck brauchen.

### Proportionaldruck (empfohlen für Heizung/Kühlung)

Differenzdruck-Sollwert sinkt proportional mit dem Volumenstrom:

```
Q = 100 % → Δp = Δp_max (z.B. 400 mbar)
Q = 50 %  → Δp = Δp_min + 50% × (Δp_max − Δp_min)
Q = 0 %   → Δp = Δp_min (z.B. 200 mbar)
```

**Vorteil:** Thermostatventile arbeiten mit geringerem Δp → weniger Geräusche, bessere Regelbarkeit.

**Warum Proportional und nicht Konstant?** Bei Konstantdruck und kleinem Volumenstrom: sehr hoher Differenzdruck → Thermostatventile öffnen minimal → Regelqualität schlecht + Geräusche.

### Kennlinienregelung nach Temperatur

Manche EC-Pumpen regeln ihre Drehzahl direkt nach der Systemtemperatur (kälter = kleiner Wärmeabnahme = weniger Drehzahl). Vereinfachte Variante für einfache Anlagen.

---

## EC-Pumpen (Hocheffizienz-Nassläufer)

Moderne Heizungsumwälzpumpen sind fast ausschliesslich **EC-Pumpen** (Electronically Commutated):

| Parameter                 | Alte AC-Pumpe  | EC-Pumpe         |
| ------------------------- | -------------- | ---------------- |
| Wirkungsgrad (nominal)    | 40–60 %        | 70–90 %          |
| Stromaufnahme (20 % Last) | 80 % von Nenn  | 15–25 % von Nenn |
| Jahresverbrauch (typ.)    | 500–1500 kWh/a | 50–200 kWh/a     |
| ErP 2015 Pflicht          | ❌             | ✅               |
| Integrierte Regelung      | ❌             | ✅               |

**ErP 2015:** In EU/CH müssen neue Nassläufer-Umwälzpumpen (1–200 kW) EC-Pumpen sein (Effizienzindex EEI ≤ 0.23).

### EC-Pumpen Schnittstellen für GA

| Signal              | Beschreibung                           |
| ------------------- | -------------------------------------- |
| 0–10 V (Eingang)    | Drehzahl / Δp-Sollwert von DDC         |
| 0–10 V (Ausgang)    | Istwert zurückmelden                   |
| Modbus RTU          | Vollständige Parametrierung + Diagnose |
| Analoge Störmeldung | DI auf Störkontakt                     |

---

## Pumpentypen im Überblick

| Typ               | Beschreibung                                | GA-Einsatz                  |
| ----------------- | ------------------------------------------- | --------------------------- |
| **Nassläufer**    | Motor läuft in Wasser (Permanentschmierung) | Heizung, Kühlung (Standard) |
| **Trockenläufer** | Motor getrennt vom Fördermedium             | Grosse Anlagen, Industrie   |
| **Inline-Pumpe**  | Im Rohr integriert (Flanschanschluss)       | Heizung, Kühlung            |
| **Blockpumpe**    | Pumpe + Motor als Block                     | Grosse Anlagen              |
| **Tauchpumpe**    | Im Medium eingetaucht                       | Entwässerung, Druckhaltung  |

---

## Pumpen-Überwachung in der GA

| Datenpunkt        | Typ | Beschreibung                         |
| ----------------- | --- | ------------------------------------ |
| Pumpe EIN/AUS     | DO  | Schaltbefehl                         |
| Laufmeldung       | DI  | Bestätigung läuft (Strömungswächter) |
| Störmeldung       | DI  | Motorschutz ausgelöst                |
| Differenzdruck    | AI  | Über Pumpe (optional)                |
| Drehzahl / Δp Ist | AI  | Von EC-Pumpe (0–10V oder Modbus)     |
| Drehzahl Soll     | AO  | Vorgabe an EC-Pumpe (0–10V)          |
| Betriebsstunden   | AV  | Aus Laufmeldung zählen               |

---

## Typische Fehler

| Fehler                       | Symptom                        | Ursache / Lösung                          |
| ---------------------------- | ------------------------------ | ----------------------------------------- |
| Pumpe läuft, kein Durchfluss | T-Differenz = 0, Anlage kalt   | Luftblase, Rückschlagventil klemmt        |
| Pump-Geräusche               | Pfeifendes/Zischendes Geräusch | Kavitation, Differenzdruck zu hoch        |
| Pumpe vibriert               | Mechanische Schwingung         | Arbeitspunkt zu weit rechts der Kennlinie |
| Motorschutz löst aus         | Pumpe schaltet ab              | Überlast, Wicklung heiss                  |
| Zu hoher Energieverbrauch    | Betriebsstunden × kW = viel    | Drehzahl zu hoch, Δp-Soll zu hoch         |

## Normen

- **EN ISO 9906** — Kreiselpumpen, hydraulische Leistungsprüfungen
- **ErP 2012/622/EU** — Ecodesign-Anforderungen Nassläufer-Umwälzpumpen
- **EN 16297** — Pumpen, Umwälzpumpen, Energieeffizienzindex

<!-- EN -->

Pumps are the "hearts" of heating, cooling and sanitary systems. Understanding the pump characteristic curve and the correct control strategy is the basis for efficient and reliable installations.

## Pump Characteristic Curve and System Curve

### Pump Characteristic Curve

Shows the **head H** (or differential pressure Δp) as a function of **volume flow Q**:

```
H [m]
│\
│ \  Pump curve
│  \
│   \___
│       \___
│           \___
└──────────────── Q [m³/h]
```

At Q = 0 (shut-off): maximum head (shut-off head)
At H = 0 (free delivery): maximum volume flow

### System Curve

The piping system has a resistance that increases with Q²:

```
H [m]
│         /  System curve (∝ Q²)
│        /
│       /
│      /
│_____/  (zero point = static head)
└──────────────── Q [m³/h]
```

### Operating Point

The **operating point** is the intersection of the pump and system curves:

```
H [m]
│
│  Pump       ●  Operating point
│     ↘      ↗
│       ↘  ↗  System
│         ●
└──────────────── Q [m³/h]
             OP (Q_0, H_0)
```

---

## Control Strategies

### Constant pressure

Differential pressure is maintained at a constant value regardless of volume flow:

```
Q = 100 % → Δp = setpoint
Q = 50 %  → Δp = setpoint (speed reduced!)
```

**Application:** Domestic cold water, service water, when all consumers require equal pressure.

### Proportional pressure (recommended for heating/cooling)

Differential pressure setpoint decreases proportionally with volume flow:

```
Q = 100 % → Δp = Δp_max (e.g. 400 mbar)
Q = 50 %  → Δp = Δp_min + 50% × (Δp_max − Δp_min)
Q = 0 %   → Δp = Δp_min (e.g. 200 mbar)
```

**Advantage:** Thermostatic valves operate at lower Δp → less noise, better controllability.

**Why proportional and not constant?** With constant pressure and low volume flow: very high differential pressure → thermostatic valves barely open → poor control quality + noise.

### Curve control based on temperature

Some EC pumps regulate their speed directly based on system temperature (colder = lower heat extraction = lower speed). Simplified variant for simple systems.

---

## EC Pumps (High-Efficiency Wet-Rotor Pumps)

Modern heating circulation pumps are almost exclusively **EC pumps** (Electronically Commutated):

| Parameter                    | Old AC pump    | EC pump          |
| ---------------------------- | -------------- | ---------------- |
| Efficiency (nominal)         | 40–60 %        | 70–90 %          |
| Current draw (20 % load)     | 80 % of rated  | 15–25 % of rated |
| Annual consumption (typical) | 500–1500 kWh/a | 50–200 kWh/a     |
| ErP 2015 mandatory           | ❌             | ✅               |
| Integrated control           | ❌             | ✅               |

**ErP 2015:** In the EU/CH, new wet-rotor circulation pumps (1–200 kW) must be EC pumps (energy efficiency index EEI ≤ 0.23).

### EC Pump Interfaces for BA

| Signal                | Description                         |
| --------------------- | ----------------------------------- |
| 0–10 V (input)        | Speed / Δp setpoint from DDC        |
| 0–10 V (output)       | Actual value feedback               |
| Modbus RTU            | Full parameterisation + diagnostics |
| Analogue fault signal | DI on fault contact                 |

---

## Pump Types Overview

| Type                 | Description                                 | BA application                 |
| -------------------- | ------------------------------------------- | ------------------------------ |
| **Wet-rotor**        | Motor runs in water (permanent lubrication) | Heating, cooling (standard)    |
| **Dry-rotor**        | Motor separated from fluid                  | Large systems, industry        |
| **Inline pump**      | Integrated in pipe (flanged)                | Heating, cooling               |
| **Block pump**       | Pump + motor as one unit                    | Large systems                  |
| **Submersible pump** | Immersed in medium                          | Drainage, pressure maintenance |

---

## Pump Monitoring in BA

| Data point            | Type | Description                        |
| --------------------- | ---- | ---------------------------------- |
| Pump ON/OFF           | DO   | Switch command                     |
| Run feedback          | DI   | Confirmation running (flow switch) |
| Fault signal          | DI   | Motor protection tripped           |
| Differential pressure | AI   | Across pump (optional)             |
| Speed / Δp actual     | AI   | From EC pump (0–10 V or Modbus)    |
| Speed setpoint        | AO   | Command to EC pump (0–10 V)        |
| Operating hours       | AV   | Counted from run feedback          |

---

## Typical Errors

| Error                        | Symptom                     | Cause / solution                           |
| ---------------------------- | --------------------------- | ------------------------------------------ |
| Pump runs, no flow           | ΔT = 0, system cold         | Air pocket, check valve stuck              |
| Pump noise                   | Whistling/hissing           | Cavitation, differential pressure too high |
| Pump vibrates                | Mechanical oscillation      | Operating point too far right of curve     |
| Motor protection trips       | Pump shuts off              | Overload, winding hot                      |
| Excessive energy consumption | Operating hours × kW = high | Speed too high, Δp setpoint too high       |

## Standards

- **EN ISO 9906** — Rotodynamic pumps, hydraulic performance tests
- **ErP 2012/622/EU** — Ecodesign requirements for wet-rotor circulation pumps
- **EN 16297** — Pumps, circulation pumps, energy efficiency index
