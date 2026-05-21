---
title: Druckregelung in Lüftungsanlagen
title_en: Duct Pressure Control in Ventilation Systems
slug: druckregelung-lueftung
category: lueftung
subcategory: regelung
tags:
  [
    druckregelung,
    kanaldruck,
    statischer-druck,
    differenzdruck,
    vav,
    pid-regler,
    frequenzumrichter,
    ventilator,
    druckfühler,
    energiesparmodus,
    konstantdruck,
    gleitdruckregelung,
    druckhaltung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [vav-cav, rlt-anlage, frequenzumrichter, pid-regler, ec-motoren, regelkreise]
rechner: [pid-simulator]
norm: [EN 16798, EN 13779, VDI 3803]
updated: 2026-05-15
lang: de
---

# Druckregelung in Lüftungsanlagen

Die Kanaldruck-Regelung hält den Luftdruck im Lüftungskanal konstant, damit alle VAV-Boxen (Variable Air Volume) mit korrekten Differenzdrücken arbeiten und der Ventilator effizient läuft.

## Warum Druckregelung?

```
VAV-System ohne Druckregelung:
  VAV-Box 1 schliesst → weniger Luftwiderstand im Netz
  → Ventilator fördert bei gleicher Drehzahl zu viel Luft
  → Druck steigt → andere VAV-Boxen erhalten zu viel Druck
  → Geräusche, Regelprobleme, Energieverschwendung

VAV-System MIT Druckregelung:
  VAV-Box 1 schliesst → Druck würde steigen
  → Druckregler erkennt Druckanstieg
  → FU reduziert Ventilator-Drehzahl
  → Druck bleibt konstant → alle VAV-Boxen arbeiten korrekt
```

---

## Druckfühler-Position

```
Position des Druckfühlers im Hauptkanal:

Empfehlung: 2/3 des Weges entlang des Hauptkanals

  Ventilator → [1/3] → [2/3 ← Fühler hier] → [Ende]

  Warum nicht am Anfang (nach Ventilator)?
    → Druck am Anfang immer hoch, VAV-Boxen am Ende zu wenig

  Warum nicht am Ende?
    → Fühler reagiert zu träge, Ventilator schwingt

  Richtig: 2/3 vom Ventilator → Representative Messung
```

---

## Regelstrategien

### Konstantdruck-Regelung

```
Drucksollwert: z.B. 150 Pa (fest eingestellt)

PID → FU-Sollwert:
  Ist < Soll → FU erhöhen
  Ist > Soll → FU reduzieren

Einfach, stabil. Nachteil: im Teillastbetrieb oft zu hoher Druck
→ Mehr Lärm, mehr Energie als nötig
```

### Gleitdruck-Regelung (besser, energiesparend)

```
Drucksollwert wird laufend angepasst:

  Alle VAV-Boxen melden Öffnungsgrad
  Wenn alle VAV-Boxen < 90 % geöffnet:
    → Drucksollwert um 5 Pa reduzieren (alle 2 min)
  Wenn eine VAV-Box 100 % geöffnet:
    → Drucksollwert um 5 Pa erhöhen

  Ziel: Immer genau eine VAV-Box auf 100 % geöffnet
    → Maximale Energieeinsparung bei vollem Komfort

Energieeinsparung vs. Konstantdruck: 10–25 %
```

---

## Zwei-Messbereich-Strategie

Für Anlagen mit stark wechselndem Bedarf:

```
Tag-Betrieb (hoher Bedarf):
  Drucksollwert: 180 Pa
  Ventilator: 60–100 %

Nacht-/Wochenend-Betrieb (Absenkung):
  Drucksollwert: 80 Pa
  Ventilator: 20–40 %

→ Bei tiefer Drehzahl: n³-Gesetz!
  Halbierte Drehzahl = 1/8 Leistung!
  50 % Drehzahl → 12.5 % Leistung
```

---

## Regelkreis-Einstellungen

```
Typische PID-Einstellwerte Druckregelung Lüftung:

Kp (Proportionalanteil): 0.5–2.0
  Zu hoch → Pendeln (Ventilator beschleunigt/bremst ständig)
  Zu niedrig → Träge Reaktion bei Druckänderungen

Ti (Nachstellzeit): 60–180 s
  Lüftungskanal hat relativ schnelle Dynamik
  Aber: FU-Beschleunigung begrenzen (Verschleiss!)

Td: meist 0 (kein D-Anteil bei Druckregelung)

Wichtig: FU hat eigene Rampe (Hoch- und Runterlauf)
  Rampe zu schnell → mechanischer Stress Ventilator
  Empfehlung: 20–60 s Hoch/Runterfahrzeit
```

---

## Mehrkanal-Systeme (Mehrzonensysteme)

```
Anlage mit Zu- und Abluft:

Zuluftventilator: Konstantdruck-Regelung
  Fühler: Zuluftkanal
  Ziel: Kanal-Sollwert halten

Abluftventilator: Volumenstrom-Kopplung
  Variante A: Drehzahl Abluft = Drehzahl Zuluft (1:1 Kopplung)
  Variante B: Abluft-Volumenstrom = Zuluft − Überströmmenge

Überdruckhaltung (leichter Überdruck Gebäude):
  Zuluft etwas mehr als Abluft → Gebäude leicht unter Überdruck
  Verhindert Einzug unkontrollierter Aussenluft (Zugluft)
```

---

## GA-Datenpunkte Druckregelung

| Datenpunkt             | Typ | Einheit | Beschreibung              |
| ---------------------- | --- | ------- | ------------------------- |
| Kanaldruck Ist         | AI  | Pa      | Druckfühler Kanal         |
| Kanaldruck Sollwert    | AV  | Pa      | Vorgabe (fest / gleitend) |
| FU Drehzahl Ist        | AI  | %       | Rückmeldung FU            |
| FU Drehzahl Soll       | AO  | %       | PID-Ausgang               |
| Druckalarm (zu tief)   | DI  | —       | < 50 Pa → Alarm           |
| Druckalarm (zu hoch)   | DI  | —       | > 350 Pa → Alarm          |
| Gleitdruck Optimierung | DV  | —       | Aktiv / Inaktiv           |

---

## Normen

- **EN 16798-3** — Energieeffizienz Lüftungsanlagen (Druckregelung)
- **EN 13779** — Lüftung Nichtwohngebäude (Systemanforderungen)
- **VDI 3803** — Lüftungsanlagen, Energiebedarf

<!-- EN -->

Duct pressure control maintains the air pressure in the ventilation duct at a constant level so that all VAV boxes (Variable Air Volume) operate at correct differential pressures and the fan runs efficiently.

## Why Pressure Control?

```
VAV system without pressure control:
  VAV box 1 closes → less air resistance in network
  → Fan delivers too much air at same speed
  → Pressure rises → other VAV boxes receive too much pressure
  → Noise, control problems, energy waste

VAV system WITH pressure control:
  VAV box 1 closes → pressure would rise
  → Pressure controller detects pressure increase
  → VSD reduces fan speed
  → Pressure remains constant → all VAV boxes work correctly
```

---

## Pressure Sensor Position

```
Pressure sensor position in main duct:

Recommendation: 2/3 of the way along the main duct

  Fan → [1/3] → [2/3 ← sensor here] → [end]

  Why not at the start (after fan)?
    → Pressure at start always high, VAV boxes at end get too little

  Why not at the end?
    → Sensor reacts too slowly, fan oscillates

  Correct: 2/3 from fan → representative measurement
```

---

## Control Strategies

### Constant Pressure Control

```
Pressure setpoint: e.g. 150 Pa (fixed)

PID → VSD setpoint:
  Actual < setpoint → increase VSD
  Actual > setpoint → reduce VSD

Simple, stable. Disadvantage: often too high pressure at part load
→ More noise, more energy than necessary
```

### Variable Pressure Control (Better, Energy-Saving)

```
Pressure setpoint is continuously adjusted:

  All VAV boxes report their opening degree
  If all VAV boxes < 90 % open:
    → Reduce pressure setpoint by 5 Pa (every 2 min)
  If any VAV box is 100 % open:
    → Increase pressure setpoint by 5 Pa

  Goal: always exactly one VAV box at 100 % open
    → Maximum energy saving at full comfort

Energy saving vs. constant pressure: 10–25 %
```

---

## Two-Range Strategy

For systems with strongly varying demand:

```
Day operation (high demand):
  Pressure setpoint: 180 Pa
  Fan: 60–100 %

Night/weekend operation (setback):
  Pressure setpoint: 80 Pa
  Fan: 20–40 %

→ At low speed: cube law!
  Halved speed = 1/8 power!
  50 % speed → 12.5 % power
```

---

## Control Loop Settings

```
Typical PID settings for duct pressure control:

Kp (proportional gain): 0.5–2.0
  Too high → oscillation (fan constantly accelerates/brakes)
  Too low → sluggish response to pressure changes

Ti (reset time): 60–180 s
  Ventilation duct has relatively fast dynamics
  But: limit VSD acceleration (wear!)

Td: usually 0 (no D-component for pressure control)

Important: VSD has its own ramp (acceleration and deceleration)
  Ramp too fast → mechanical stress on fan
  Recommendation: 20–60 s ramp-up/ramp-down time
```

---

## Multi-Duct Systems (Multi-Zone)

```
Installation with supply and extract:

Supply fan: constant pressure control
  Sensor: supply duct
  Goal: maintain duct setpoint

Extract fan: volume flow coupling
  Variant A: extract speed = supply speed (1:1 coupling)
  Variant B: extract volume flow = supply − transfer air

Positive pressure control (slight building overpressure):
  Supply slightly more than extract → building at slight overpressure
  Prevents uncontrolled outdoor air infiltration (draughts)
```

---

## BA Data Points — Pressure Control

| Data point                     | Type | Unit | Description               |
| ------------------------------ | ---- | ---- | ------------------------- |
| Duct pressure actual           | AI   | Pa   | Pressure sensor in duct   |
| Duct pressure setpoint         | AV   | Pa   | Target (fixed / variable) |
| VSD speed actual               | AI   | %    | VSD feedback              |
| VSD speed setpoint             | AO   | %    | PID output                |
| Pressure alarm (too low)       | DI   | —    | < 50 Pa → alarm           |
| Pressure alarm (too high)      | DI   | —    | > 350 Pa → alarm          |
| Variable pressure optimisation | AV   | —    | Active / inactive         |

---

## Standards

- **EN 16798-3** — Energy efficiency of ventilation systems (pressure control)
- **EN 13779** — Ventilation of non-residential buildings (system requirements)
- **VDI 3803** — Ventilation systems, energy demand
