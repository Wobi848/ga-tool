---
title: Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann
title_en: Hydraulic Circuits — Single-Pipe, Two-Pipe and Tichelmann
slug: hydraulische-schaltungen
category: hydraulik
subcategory: schaltungen
tags:
  [
    einrohr,
    zweirohr,
    tichelmann,
    bypass,
    hydraulik,
    heizkreis,
    heizverteilung,
    differenzdruck,
    volumenstrom,
    druckverlust,
    rücklauf,
    pumpe,
    strang
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulischer-abgleich, motorventile, pid-regler, druckverlust, waermepumpe]
norm: [VDI 2035, EN 14336]
updated: 2026-05-14
lang: de
---

# Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann

Die hydraulische Schaltung bestimmt wie Wärme (oder Kälte) vom Erzeuger zu den Verbrauchern gelangt. Falsch dimensionierte oder falsch gebaute Schaltungen sind die häufigste Ursache für unzufriedene Nutzer, überhöhten Energieverbrauch und endlose Inbetriebnahme-Probleme.

## Einrohrheizung

### Prinzip

Alle Heizkörper liegen **in Reihe** auf einem gemeinsamen Rohr:

```
Vorlauf → HK1 → HK2 → HK3 → HK4 → Rücklauf
          ↑       ↑       ↑       ↑
     Bypass   Bypass  Bypass  Bypass
     Ventil   Ventil  Ventil  Ventil
```

Das Wasser fliesst durch jeden Heizkörper (oder am Bypass vorbei), kühlt sich dabei ab und gelangt mit niedrigerer Temperatur zum nächsten Heizkörper.

### Eigenschaften

| Eigenschaft        | Einrohr                                       |
| ------------------ | --------------------------------------------- |
| Verrohrungsaufwand | Gering (ein Rohr)                             |
| Temperaturgefälle  | Jeder nachfolgende HK bekommt kälteres Wasser |
| Regelbarkeit       | Schlecht (HK am Ende schwer regelbar)         |
| Hydraul. Abgleich  | Sehr aufwendig, Bypass-Einstellung kritisch   |
| Einsatz heute      | Kaum noch neu eingebaut                       |

### Bypass-Funktion

Ohne Bypass: Ventil geschlossen → Heizkreis unterbrochen → keine Zirkulation für nachfolgende HK.
Mit Bypass: Auch bei geschlossenem Ventil fliesst Wasser am HK vorbei → Zirkulation bleibt aufrecht.

**Problem:** Der Bypass schafft einen Kurzschluss. Dimensionierung ist kritisch — zu viel Bypass = kaum Durchfluss durch HK; zu wenig = kein Ausgleich.

> ⚠️ Einrohrsysteme eignen sich **nicht** für grosse Temperaturunterschiede zwischen den Heizkörpern und sind heute kaum noch Stand der Technik. Im Altbaubestand jedoch sehr häufig anzutreffen.

---

## Zweirohrheizung

### Prinzip

Vorlauf und Rücklauf laufen **parallel** zu allen Heizkörpern:

```
Vorlauf ─────────────────────────────────►
         │          │          │          │
        HK1        HK2        HK3        HK4
         │          │          │          │
Rücklauf◄─────────────────────────────────
```

Jeder Heizkörper bekommt **dieselbe Vorlauftemperatur** direkt vom Erzeuger. Das Rücklaufwasser misch sich im Rücklaufstrang.

### Eigenschaften

| Eigenschaft        | Zweirohr                              |
| ------------------ | ------------------------------------- |
| Verrohrungsaufwand | Höher (zwei Rohre)                    |
| Temperatur je HK   | Identisch (Vorlauftemperatur)         |
| Regelbarkeit       | Gut (jeder HK unabhängig regelbar)    |
| Hydraul. Abgleich  | Notwendig (Stränge verschieden lang!) |
| Einsatz heute      | Standard für alle neuen Anlagen       |

### Hydraulisches Problem Zweirohr

**Nahgelegene HK** haben deutlich weniger Widerstand als weit entfernte → bekommen überproportional viel Durchfluss → überwärmt, während entfernte HK zu wenig bekommen.

Lösung: Hydraulischer Abgleich (Voreinstellventile, DDR-Regelung).

---

## Tichelmann-Schaltung (Tichelmänn)

### Prinzip

Auch **Gleichstromschaltung** oder **Rücklauf-Rücklauf-Schaltung** genannt. Besonderheit: Vorlauf führt zum ersten HK, Rücklauf führt _umgekehrt_ vom letzten HK zurück.

```
Vorlauf ─────────────────────────────────►
         │          │          │          │
        HK1        HK2        HK3        HK4
         │          │          │          │
         ◄─────────────────────────────────
Rücklauf                      ◄── längster Rücklauf
```

Die Idee: Der HK mit dem kürzesten Vorlauf hat den längsten Rücklauf — und umgekehrt. Damit ist der **Gesamtdruckverlust für jeden HK gleich** (Vorlauf + Rücklauf).

### Eigenschaften

| Eigenschaft        | Tichelmann                                                  |
| ------------------ | ----------------------------------------------------------- |
| Verrohrungsaufwand | Höher als Zweirohr (längerer Rücklauf)                      |
| Selbstabgleich     | Nahezu selbstabgleichend (Druckverluste gleich)             |
| Hydraul. Abgleich  | Reduzierter Aufwand nötig                                   |
| Einsatz            | Fussbodenheizung, Flächenheizungen, grosse parallele Kreise |

### Wann Tichelmann?

- Viele gleichartige parallele Verbraucher (z.B. FBH-Kreise, Solarkollektor-Felder, Deckenkühlkreise)
- Wenn Leitungsführung die Rücklaufverlängerung nicht teurer macht als die Abgleich-Armaturen
- Nicht sinnvoll wenn Verbraucher sehr unterschiedliche Druckverlusteigenschaften haben

---

## Bypass-Schaltungen

### Pumpenbetrieb-Bypass

```
Erzeuger → Pumpe → ──────────── Verbraucher
                  │              │
                  └─── Bypass ───┘
                  (Differenzdruckregelventil)
```

Regelt den Differenzdruck wenn Verbraucher schliessen → verhindert Druckspitzen, schützt Pumpe.

### Erzeuger-Bypass (hydraulische Entkopplung)

**Vor-/Rücklaufverbindung mit Bypass zwischen Erzeugerkreis und Verteilerkreis:**

```
Erzeuger ─── Prim.pumpe ───► Vorlauf-Verteiler ───► Verbraucher
                              │
                         Kurzschlussrohr
                              │
                             ◄─── Rücklauf-Sammler ◄── Verbraucher
Rücklauf ◄── Prim.pumpe ────
```

**Zweck:** Primär- und Sekundärkreis hydraulisch entkoppeln → jeder Kreis hat eigene Pumpe, eigene Regelung. Wichtig bei Wärmepumpen (Mindestdurchfluss sicherstellen!).

### Bypass bei Wärmepumpe

Wärmepumpen haben einen **Mindestvolumenstrom** (sonst Abschaltung wegen Druckschienerüberwachung oder Frostschutz):

```
WP ──── Pumpe ──── Verteiler
              │
         Bypass-Ventil (thermostatisch oder motorisch)
              │
        Rücklauf
```

Öffnet wenn alle Heizkreis-Ventile schliessen → Mindestdurchfluss durch WP gewährleistet.

---

## Vergleich auf einen Blick

| Schaltung  | Verrohrung | Abgleich    | Gleichmässigkeit | Typischer Einsatz        |
| ---------- | ---------- | ----------- | ---------------- | ------------------------ |
| Einrohr    | Einfach    | Aufwendig   | Schlecht         | Altbau (Bestand)         |
| Zweirohr   | Mittel     | Nötig       | Gut              | Neubau Standard          |
| Tichelmann | Aufwendig  | Minimal     | Sehr gut         | FBH, Kollektoren, Decken |
| Mit Bypass | +Armatur   | Regelventil | —                | Mindestdurchfluss, Entk. |

---

## Typische Fehler in der Praxis

| Fehler                          | Symptom                                  | Ursache                                     |
| ------------------------------- | ---------------------------------------- | ------------------------------------------- |
| Zu langer Einrohrkreis          | Heizkörper am Ende kalt                  | Zu viel Temperaturgefälle                   |
| Bypass zu offen (Einrohr)       | Heizleistung zu tief                     | Kurzschluss — Wasser fliesst nicht durch HK |
| Zweirohr ohne Abgleich          | Nah-HK überhitzen, fern-HK kalt          | Druckdifferenz nicht kompensiert            |
| Tichelmann falsch dimensioniert | Trotzdem ungleichmässig                  | HK haben unterschiedliche Widerstände       |
| Fehlendes Überströmventil (WP)  | WP schaltet bei geschlossenen Kreisen ab | Kein Mindestvolumenstrom                    |

## Normen

- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **EN 14336** — Installation und Abnahme Heizungsanlagen in Gebäuden
- **SIA 384.201** — Heizungsanlagen in Gebäuden (Schweizer Norm)

<!-- EN -->

# Hydraulic Circuits — Single-Pipe, Two-Pipe and Tichelmann

The hydraulic circuit determines how heat (or cold) travels from the generator to the consumers. Incorrectly designed or built circuits are the most common cause of dissatisfied users, excessive energy consumption and endless commissioning problems.

## Single-Pipe System

### Principle

All radiators are connected **in series** on a single shared pipe:

```
Flow → R1 → R2 → R3 → R4 → Return
       ↑      ↑      ↑      ↑
    Bypass Bypass Bypass Bypass
    valve  valve  valve  valve
```

Water flows through each radiator (or bypasses it), cools down, and reaches the next radiator at a lower temperature.

### Characteristics

| Property             | Single-Pipe                                |
| -------------------- | ------------------------------------------ |
| Piping effort        | Low (one pipe)                             |
| Temperature gradient | Each downstream radiator gets cooler water |
| Controllability      | Poor (last radiators hard to control)      |
| Hydraulic balancing  | Very complex, bypass setting critical      |
| Use today            | Rarely installed new                       |

### Bypass Function

Without bypass: valve closed → heating circuit interrupted → no flow for downstream radiators.
With bypass: even with valve closed, water flows past the radiator → circulation is maintained.

**Problem:** The bypass creates a short-circuit. Sizing is critical — too much bypass = minimal flow through radiator; too little = no compensation.

> ⚠️ Single-pipe systems are **not** suitable for large temperature differences between radiators and are rarely current practice. However, still very common in existing older buildings.

---

## Two-Pipe System

### Principle

Flow and return run **in parallel** to all radiators:

```
Flow ─────────────────────────────────►
      │          │          │          │
      R1         R2         R3         R4
      │          │          │          │
Return◄─────────────────────────────────
```

Every radiator receives **the same flow temperature** directly from the generator. Return water mixes in the return manifold.

### Characteristics

| Property                 | Two-Pipe                                        |
| ------------------------ | ----------------------------------------------- |
| Piping effort            | Higher (two pipes)                              |
| Temperature per radiator | Identical (flow temperature)                    |
| Controllability          | Good (each radiator independently controllable) |
| Hydraulic balancing      | Necessary (branches of different lengths!)      |
| Use today                | Standard for all new installations              |

### Hydraulic Problem — Two-Pipe

**Nearby radiators** have significantly less resistance than distant ones → receive disproportionately more flow → overheat, while distant radiators receive too little.

Solution: Hydraulic balancing (pre-setting valves, DDR control).

---

## Tichelmann Circuit

### Principle

Also called **reverse-return circuit**. Key feature: flow reaches the first radiator, return runs _in reverse_ from the last radiator back.

```
Flow ─────────────────────────────────►
      │          │          │          │
      R1         R2         R3         R4
      │          │          │          │
      ◄─────────────────────────────────
Return                     ◄── longest return
```

The idea: the radiator with the shortest flow pipe has the longest return — and vice versa. This means the **total pressure drop is equal for every radiator** (flow + return).

### Characteristics

| Property            | Tichelmann                                                   |
| ------------------- | ------------------------------------------------------------ |
| Piping effort       | Higher than two-pipe (longer return)                         |
| Self-balancing      | Nearly self-balancing (equal pressure drops)                 |
| Hydraulic balancing | Reduced effort required                                      |
| Applications        | Underfloor heating, surface heating, large parallel circuits |

### When to Use Tichelmann?

- Many similar parallel consumers (e.g. UFH circuits, solar collector fields, chilled ceiling circuits)
- When pipe routing makes the return extension cheaper than balancing valves
- Not suitable when consumers have very different pressure drop characteristics

---

## Bypass Circuits

### Pump Differential Pressure Bypass

```
Generator → Pump → ──────────── Consumers
                  │              │
                  └─── Bypass ───┘
                  (differential pressure control valve)
```

Controls differential pressure when consumers close → prevents pressure spikes, protects pump.

### Generator Bypass (Hydraulic Decoupling)

**Flow/return connection with bypass between primary and secondary circuit:**

```
Generator ─── Primary pump ───► Flow manifold ───► Consumers
                                │
                           Short-circuit pipe
                                │
                               ◄─── Return collector ◄── Consumers
Return ◄── Primary pump ────
```

**Purpose:** Hydraulically decouple primary and secondary circuits → each circuit has its own pump, own control. Critical for heat pumps (ensure minimum flow!).

### Bypass for Heat Pumps

Heat pumps have a **minimum volume flow** requirement (otherwise shutdown via pressure switch or frost protection):

```
HP ──── Pump ──── Manifold
             │
        Bypass valve (thermostatic or motorised)
             │
         Return
```

Opens when all heating circuit valves close → ensures minimum flow through HP.

---

## Quick Comparison

| Circuit     | Piping  | Balancing     | Uniformity | Typical Use               |
| ----------- | ------- | ------------- | ---------- | ------------------------- |
| Single-pipe | Simple  | Complex       | Poor       | Existing buildings        |
| Two-pipe    | Medium  | Required      | Good       | New build standard        |
| Tichelmann  | Complex | Minimal       | Very good  | UFH, collectors, ceilings |
| With bypass | +valve  | Control valve | —          | Min. flow, decoupling     |

---

## Typical Field Faults

| Fault                         | Symptom                                     | Cause                                   |
| ----------------------------- | ------------------------------------------- | --------------------------------------- |
| Single-pipe circuit too long  | Radiators at end cold                       | Excessive temperature drop              |
| Bypass too open (single-pipe) | Too little heat output                      | Short-circuit — water bypasses radiator |
| Two-pipe without balancing    | Near radiators overheat, far radiators cold | Pressure difference not compensated     |
| Tichelmann incorrectly sized  | Still uneven                                | Radiators have different resistances    |
| Missing overflow valve (HP)   | HP shuts off when circuits close            | No minimum volume flow                  |

## Standards

- **VDI 2035** — Prevention of damage in hot water heating systems
- **EN 14336** — Installation and commissioning of heating systems in buildings
- **SIA 384.201** — Heating systems in buildings (Swiss standard)
