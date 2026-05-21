---
title: Zweipunktregelung vs. stetige Regelung
title_en: Two-Position Control vs. Continuous Control
slug: zweipunktregelung
category: regelung
subcategory: regler
tags:
  [
    zweipunktregelung,
    stetige-regelung,
    thermostat,
    hysterese,
    schaltdifferenz,
    pendeln,
    schalthäufigkeit,
    ein-aus,
    bang-bang,
    pid,
    proportional,
    dreipunktregelung
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, steuern-regeln, alarmmanagement, glt-grundlagen]
norm: [DIN IEC 60050-351, VDI 3540]
updated: 2026-05-14
lang: de
---

# Zweipunktregelung vs. stetige Regelung

In der GA werden zwei grundlegend verschiedene Regelungsarten eingesetzt: die einfache Zweipunktregelung und die stetige Regelung. Die Wahl bestimmt Regelgüte, Energieverbrauch und Anlagen-Lebenserwartung.

## Zweipunktregelung (EIN/AUS)

### Prinzip

Der Regler kennt nur zwei Zustände: **EIN** oder **AUS**. Eine Hysterese verhindert ständiges Schalten:

```
Sollwert: 22 °C, Hysterese: 1 K (→ Schaltpunkte: 21.5 und 22.5 °C)

Temperatur sinkt auf 21.5 °C → Heizung EIN
Temperatur steigt auf 22.5 °C → Heizung AUS
→ Schwingung zwischen 21.5 und 22.5 °C
```

### Hysterese (Schaltdifferenz)

Die Hysterese ist entscheidend für die Regelqualität:

| Hysterese | Effekt                                             |
| --------- | -------------------------------------------------- |
| Zu klein  | Sehr häufiges Schalten → Verschleiss               |
| Zu gross  | Grosse Temperaturschwankungen → schlechter Komfort |
| Optimal   | Seltenes Schalten, akzeptable Schwankung           |

**Faustformel:** Hysterese = 2–5 % des Messbereichs oder 1–3 K für Raumtemperatur.

### Vor- und Nachteile

| Vorteil                    | Nachteil                                    |
| -------------------------- | ------------------------------------------- |
| Einfach (nur 1 Bit)        | Schwingt permanent                          |
| Günstig (einfaches Relais) | Keine Präzision                             |
| Robust                     | Häufige Schaltvorgänge (Relais-Verschleiss) |
| Kein Regler-Tuning nötig   | Energieverschwendung (Überschwingen)        |

### Typische Anwendungen

- Einfache Thermostate (Wohnbereich, elektrische Fussbodenheizung)
- Frost-/Übertemperaturschutz (Grenzwert-Alarme ohne Regelgüte-Anforderung)
- Pumpen-Steuerung (EIN wenn Anforderung, AUS wenn keine)
- Lüftung: EIN/AUS Nachtbetrieb

---

## Stetige Regelung (proportional, PID)

### Prinzip

Der Reglerausgang ist stufenlos zwischen 0 und 100 % einstellbar. Die Stellgrösse ist proportional zur Regelabweichung (plus I- und D-Anteil bei PID):

```
Regelabweichung 5 K → Ventil öffnet auf 60 %
Regelabweichung 2 K → Ventil öffnet auf 30 %
Regelabweichung 0 K → Ventil auf Haltepunkt (I-Anteil)
```

### P-Regler (Proportional)

```
Y = Kp × e

Y = Stellgrösse (0–100 %)
Kp = Verstärkung
e = Regelabweichung (Soll − Ist)
```

**Problem P-Regler:** Bleibende Regelabweichung. Der Regler findet ein Gleichgewicht bei e ≠ 0 (sonst wäre Y = 0 und nichts heizen).

### PI-Regler (Proportional + Integral)

Der I-Anteil integriert die Abweichung über die Zeit → beseitigt die bleibende Abweichung:

```
Y = Kp × e + Ki × ∫e dt
```

Im eingeschwungenen Zustand: e = 0, Y ≠ 0 (gehalten durch Integrator).

→ **PI-Regler** ist der Standard für Temperatur- und Druckregelung in der GA.

---

## Dreipunktregelung

Erweiterung der Zweipunktregelung für motorische Antriebe:

```
Zu gross (> Soll + Δ): Signal "AUF" → Ventil öffnet
Zu klein (< Soll − Δ): Signal "ZU" → Ventil schliesst
Im Bereich: kein Signal → Ventil bleibt stehen (integrierendes Verhalten)
```

**Typisch für:** Motorische 3-Punkt-Antriebe ohne Rückmeldung (günstige Variante)

**Stellzeit:** Antrieb braucht Zeit für Auf/Zu (z.B. 60–120 s) → träges Regelverhalten.

---

## Vergleich auf einen Blick

| Merkmal             | Zweipunkt       | Dreipunkt      | Stetig (PI)             |
| ------------------- | --------------- | -------------- | ----------------------- |
| Ausgangssignal      | 0/1 (Relais)    | Auf/Zu/Stop    | 0–10 V / 4–20 mA        |
| Regelgüte           | Schlecht        | Mittel         | Gut                     |
| Kosten              | Sehr gering     | Gering         | Mittel                  |
| Ventil-/Antriebstyp | Schützschaltung | 3-Punkt-Motor  | Stetigantrieb           |
| Verschleiss         | Relais (hoch)   | Motor (mittel) | Antrieb (gering)        |
| Tuning              | Nur Hysterese   | Stellzeit      | Kp, Ti, Td              |
| Typischer Einsatz   | Thermostat      | Einfache HK    | Klima, Lüftung, Kühlung |

---

## Entscheidungshilfe

```
Frage 1: Muss präzise auf ±1 K geregelt werden?
  Ja → Stetige Regelung (PI)
  Nein → weiter

Frage 2: Haben wir einen motorischen Antrieb ohne Rückmeldung?
  Ja → Dreipunkt
  Nein → weiter

Frage 3: Ist ±2–3 K akzeptabel und Kosten minimieren?
  Ja → Zweipunkt mit Hysterese
```

## Normen

- **DIN IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch
- **VDI 3540** — Regelungstechnik für HLK-Anlagen

<!-- EN -->

Two fundamentally different control types are used in BA: the simple two-position control and continuous control. The choice determines control quality, energy consumption, and plant service life.

## Two-Position Control (ON/OFF)

### Principle

The controller has only two states: **ON** or **OFF**. A hysteresis band prevents constant switching:

```
Setpoint: 22 °C, hysteresis: 1 K (→ switching points: 21.5 and 22.5 °C)

Temperature falls to 21.5 °C → heating ON
Temperature rises to 22.5 °C → heating OFF
→ Oscillation between 21.5 and 22.5 °C
```

### Hysteresis (Switching Differential)

The hysteresis is decisive for control quality:

| Hysteresis | Effect                                     |
| ---------- | ------------------------------------------ |
| Too small  | Very frequent switching → wear             |
| Too large  | Large temperature swings → poor comfort    |
| Optimal    | Infrequent switching, acceptable variation |

**Rule of thumb:** Hysteresis = 2–5% of measuring range or 1–3 K for room temperature.

### Advantages and Disadvantages

| Advantage                     | Disadvantage                    |
| ----------------------------- | ------------------------------- |
| Simple (only 1 bit)           | Permanent oscillation           |
| Low cost (simple relay)       | No precision                    |
| Robust                        | Frequent switching (relay wear) |
| No controller tuning required | Energy waste (overshoot)        |

### Typical Applications

- Simple thermostats (residential, electric underfloor heating)
- Frost/overtemperature protection (limit alarms without precision requirement)
- Pump control (ON when demand, OFF when none)
- Ventilation: ON/OFF night operation

---

## Continuous Control (Proportional, PID)

### Principle

The controller output is continuously adjustable between 0 and 100%. The control output is proportional to the control error (plus I and D components for PID):

```
Control error 5 K → valve opens to 60%
Control error 2 K → valve opens to 30%
Control error 0 K → valve at hold position (I component)
```

### P Controller (Proportional)

```
Y = Kp × e

Y = control output (0–100%)
Kp = gain
e = control error (setpoint − actual)
```

**Problem with P controller:** Persistent offset. The controller settles at e ≠ 0 (otherwise Y = 0 and nothing heats).

### PI Controller (Proportional + Integral)

The I component integrates the error over time → eliminates the persistent offset:

```
Y = Kp × e + Ki × ∫e dt
```

At steady state: e = 0, Y ≠ 0 (maintained by integrator).

→ **PI controller** is the standard for temperature and pressure control in BA.

---

## Three-Position Control

Extension of two-position control for motorised actuators:

```
Too high (> setpoint + Δ): "OPEN" signal → valve opens
Too low (< setpoint − Δ):  "CLOSE" signal → valve closes
Within band: no signal → valve stays (integrating behaviour)
```

**Typical for:** Motorised 3-point actuators without position feedback (low-cost option)

**Stroke time:** Actuator requires time for open/close (e.g. 60–120 s) → sluggish control behaviour.

---

## Comparison at a Glance

| Feature             | Two-position        | Three-position         | Continuous (PI)            |
| ------------------- | ------------------- | ---------------------- | -------------------------- |
| Output signal       | 0/1 (relay)         | Open/close/stop        | 0–10 V / 4–20 mA           |
| Control quality     | Poor                | Medium                 | Good                       |
| Cost                | Very low            | Low                    | Medium                     |
| Valve/actuator type | Contactor switching | 3-point motor          | Modulating actuator        |
| Wear                | Relay (high)        | Motor (medium)         | Actuator (low)             |
| Tuning              | Hysteresis only     | Stroke time            | Kp, Ti, Td                 |
| Typical use         | Thermostat          | Simple heating circuit | HVAC, ventilation, cooling |

---

## Decision Guide

```
Question 1: Does control need to be precise to ±1 K?
  Yes → Continuous control (PI)
  No → continue

Question 2: Do we have a motorised actuator without position feedback?
  Yes → Three-position
  No → continue

Question 3: Is ±2–3 K acceptable and is cost minimisation the goal?
  Yes → Two-position with hysteresis
```

## Standards

- **DIN IEC 60050-351** — International electrotechnical vocabulary
- **VDI 3540** — Control engineering for HVAC systems
