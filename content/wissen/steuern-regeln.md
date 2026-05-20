---
title: Steuern vs. Regeln — der fundamentale Unterschied
title_en: Control vs. Regulation — the fundamental difference
slug: steuern-regeln
category: regelung
subcategory: grundlagen
tags: [steuern, regeln, regelkreis, open-loop, closed-loop, rückführung, führungsgrösse, stellgrösse, regelgrösse, störgrösse, istwert, sollwert, pid]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, zweipunktregelung, kaskadenregelung, glt-grundlagen]
rechner: [pid-simulator]
norm: [DIN IEC 60050-351, VDI 3540]
updated: 2026-05-14
lang: de
---

# Steuern vs. Regeln — der fundamentale Unterschied

In der Praxis werden „steuern" und „regeln" oft verwechselt. Der Unterschied ist fundamental und bestimmt ob eine Anlage sicher und präzise funktioniert oder nicht.

## Steuern — Open Loop

**Steuern** bedeutet: Ein Eingang (Befehl) → ein Ausgang (Aktion), **ohne Rückmeldung**.

```
Befehl: "Ventil 50 % öffnen"
    ↓
Ventilantrieb öffnet auf 50 %
    
(Kein Sensor prüft ob die gewünschte Temperatur erreicht wurde)
```

**Merkmale:**
- Keine Messung der Auswirkung
- Kein Ausgleich von Störungen
- Einfach, schnell, günstig
- Ungenau bei veränderlichen Bedingungen

**Beispiele Steuern:**
- Zeitschaltuhr: Pumpe läuft von 7–18 Uhr (egal ob Heizwärme benötigt wird)
- Licht: Taster drücken → Licht an (keine Helligkeitsmessung)
- Jalousie: Auf-Taste drücken → fährt hoch (keine Positionsrückmeldung)

---

## Regeln — Closed Loop

**Regeln** bedeutet: Ist-Zustand wird gemessen, mit Sollwert verglichen, und die Abweichung wird ausgeregelt.

```
Sollwert (Soll-Temperatur: 22 °C)
    ↓
[Vergleich] ← Istwert (gemessene Temperatur: 20 °C)
    ↓
Regelabweichung: 22 − 20 = 2 K
    ↓
[Regler] berechnet Stellgrösse (z.B. Ventil 70 % öffnen)
    ↓
[Aktor] (Ventilantrieb öffnet)
    ↓
Wirkung auf [Strecke] (Raum erwärmt sich)
    ↓
Neuer Istwert → zurück zum Vergleich
```

**Merkmale:**
- Rückführung (Istwert-Messung)
- Ausgleich von Störungen (z.B. Fenster offen → Regler merkt Abkühlung → regelt nach)
- Präzise, selbstkorrigierend
- Aufwendiger (Sensor, Regler, Parametrierung)

**Beispiele Regeln:**
- Raumtemperatur-Regelung (Thermostat mit Rückmeldung)
- Druckregelung (Differenzdrucksensor → FU regelt Drehzahl)
- CO₂-geführte Lüftung (CO₂-Sensor → Volumenstrom)

---

## Regelkreis — Die Elemente

```
W (Führungsgrösse/Sollwert)
    ↓
[+] Summierpunkt
[−] ↑ (Rückführung)
    ↓ e (Regelabweichung = W − X)
[Regler R] → Y (Stellgrösse)
    ↓
[Stellglied] (Ventil, FU, Relais)
    ↓
[Strecke S] ← Z (Störgrösse, z.B. Aussentemperatur)
    ↓ X (Regelgrösse/Istwert)
[Messglied/Sensor]
    ↓
Rückführung → zurück zum Summierpunkt
```

| Element          | Symbol | Beispiel                            |
|------------------|--------|-------------------------------------|
| Führungsgrösse   | W      | Soll-Raumtemperatur 22 °C           |
| Regelabweichung  | e      | 22 − 20 = 2 K                       |
| Stellgrösse      | Y      | Ventilöffnung 0–100 %               |
| Regelgrösse/Istwert | X  | Gemessene Raumtemperatur 20 °C      |
| Störgrösse       | Z      | Aussentemperatur, Fenster offen     |
| Strecke          | S      | Raum mit Heizkörper                 |

---

## Wann steuern, wann regeln?

| Situation                              | Steuern | Regeln |
|----------------------------------------|---------|--------|
| Eingang und Ausgang direkt proportional (keine Störungen) | ✅ | — |
| Störungen müssen kompensiert werden    | —       | ✅     |
| Genauigkeit wichtig                    | —       | ✅     |
| Einfache EIN/AUS-Schaltung ohne Feedback | ✅   | —      |
| Temperatur, Druck, Durchfluss halten   | —       | ✅     |
| Zeitprogramm (wann, nicht wie viel)    | ✅       | —      |

**In der Praxis** wird beides kombiniert: Das Zeitprogramm **steuert** den Betriebsmodus (Komfort/Nacht), innerhalb des Modus **regelt** der PID-Regler die Temperatur.

---

## Normen

- **DIN IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch, Leittechnik
- **VDI 3540** — Regelungstechnik in der Heizungs-, Lüftungs- und Klimatechnik

<!-- EN -->

In practice, "control" (open-loop) and "regulation" (closed-loop) are often confused. The difference is fundamental and determines whether a system operates safely and precisely.

## Control — Open Loop

**Control** means: one input (command) → one output (action), **without feedback**.

```
Command: "Open valve 50%"
    ↓
Valve actuator opens to 50%

(No sensor checks whether the desired temperature was reached)
```

**Characteristics:**
- No measurement of the effect
- No compensation for disturbances
- Simple, fast, inexpensive
- Inaccurate under varying conditions

**Control examples:**
- Time switch: pump runs 7 am–6 pm (regardless of heating demand)
- Light: press button → light on (no brightness measurement)
- Blind: press UP → moves up (no position feedback)

---

## Regulation — Closed Loop

**Regulation** means: actual state is measured, compared to the setpoint, and the deviation is corrected.

```
Setpoint (target temperature: 22 °C)
    ↓
[Comparison] ← Actual value (measured temperature: 20 °C)
    ↓
Control deviation: 22 − 20 = 2 K
    ↓
[Controller] calculates output (e.g. open valve 70%)
    ↓
[Actuator] (valve opens)
    ↓
Effect on [Process] (room warms up)
    ↓
New actual value → back to comparison
```

**Characteristics:**
- Feedback (actual value measurement)
- Compensation for disturbances (e.g. window open → controller detects cooling → corrects)
- Precise, self-correcting
- More complex (sensor, controller, commissioning)

**Regulation examples:**
- Room temperature control (thermostat with feedback)
- Pressure control (differential pressure sensor → VFD controls speed)
- CO₂-guided ventilation (CO₂ sensor → air volume)

---

## Control Loop — The Elements

```
W (Setpoint / Reference)
    ↓
[+] Summing point
[−] ↑ (Feedback)
    ↓ e (Control deviation = W − X)
[Controller R] → Y (Control output)
    ↓
[Actuator] (valve, VFD, relay)
    ↓
[Process S] ← Z (Disturbance, e.g. outdoor temperature)
    ↓ X (Controlled variable / actual value)
[Sensor / Measuring element]
    ↓
Feedback → back to summing point
```

| Element | Symbol | Example |
|---------|--------|---------|
| Setpoint | W | Target room temperature 22 °C |
| Control deviation | e | 22 − 20 = 2 K |
| Control output | Y | Valve position 0–100% |
| Actual value | X | Measured room temperature 20 °C |
| Disturbance | Z | Outdoor temperature, window open |
| Process | S | Room with radiator |

---

## When to Control, When to Regulate?

| Situation | Control | Regulate |
|-----------|---------|----------|
| Input and output directly proportional (no disturbances) | ✅ | — |
| Disturbances must be compensated | — | ✅ |
| Accuracy is important | — | ✅ |
| Simple ON/OFF switching without feedback | ✅ | — |
| Maintaining temperature, pressure, flow | — | ✅ |
| Time schedule (when, not how much) | ✅ | — |

**In practice** both are combined: the time schedule **controls** the operating mode (comfort/night), while within that mode the PID controller **regulates** the temperature.

---

## Standards

- **DIN IEC 60050-351** — International Electrotechnical Vocabulary, Instrumentation and Control
- **VDI 3540** — Control engineering in heating, ventilation and air-conditioning technology
