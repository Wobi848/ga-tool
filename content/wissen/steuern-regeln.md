---
title: Steuern vs. Regeln — der fundamentale Unterschied
title_en: Control vs. Regulation — the fundamental difference
slug: steuern-regeln
category: regelung
subcategory: grundlagen
tags:
  [
    steuern,
    regeln,
    regelkreis,
    open-loop,
    closed-loop,
    rückführung,
    führungsgrösse,
    stellgrösse,
    regelgrösse,
    störgrösse,
    istwert,
    sollwert,
    pid
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, zweipunktregelung, kaskadenregelung, glt-grundlagen]
rechner: [pid-simulator]
norm: [IEC 60050-351]
updated: 2026-10-14
lang: de
---

# Steuern vs. Regeln — der fundamentale Unterschied

In der Praxis werden „steuern" und „regeln" oft verwechselt. Der Unterschied ist fundamental und bestimmt ob eine Anlage sicher und präzise funktioniert oder nicht.

## Steuern — Open Loop

**Steuern** bedeutet: Ein Eingang (Befehl) → ein Ausgang (Aktion), **ohne Rückmeldung**.

Der Befehl «Ventil 50 % öffnen» wird ausgeführt. Ob der Raum danach die gewünschte Temperatur hat, prüft niemand.

**Merkmale:**

- Keine Messung der Auswirkung
- Kein Ausgleich von Störungen
- Einfach, schnell, günstig
- Ungenau bei veränderlichen Bedingungen

**Beispiele Steuern:**

- Zeitschaltuhr: Pumpe läuft von 7–18 Uhr (egal ob Heizwärme benötigt wird)
- Licht: Taster drücken → Licht an (keine Helligkeitsmessung)
- Jalousie: Auf-Taste drücken → fährt hoch (keine Positionsrückmeldung)
- **Heizkurve:** Die Aussentemperatur bestimmt die Vorlauftemperatur. Ob der Raum warm genug ist, misst niemand. Für den Raum ist das eine Steuerung, auch wenn die Vorlauftemperatur selbst geregelt wird. Sie wirkt, weil sie die wichtigste Störgrösse, die Aussentemperatur, schon vorab berücksichtigt.

---

## Regeln — Closed Loop

**Regeln** bedeutet: Ist-Zustand wird gemessen, mit Sollwert verglichen, und die Abweichung wird ausgeregelt.

1. Der Fühler misst den Istwert, zum Beispiel 20 °C.
2. Der Regler vergleicht mit dem Sollwert, zum Beispiel 22 °C. Die Regeldifferenz ist 2 K.
3. Der Regler berechnet daraus die Stellgrösse, zum Beispiel Ventil 70 %.
4. Das Ventil öffnet, der Raum erwärmt sich.
5. Der Fühler misst den neuen Istwert, und alles beginnt von vorn.

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

<figure class="schema"><svg viewBox="0 0 600 200" role="img" aria-label="Regelkreis: Sollwert w, Vergleich, Regler, Stellglied, Strecke, Regelgrösse x und Rückführung über das Messglied" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M34 92L80 92"/><path d="M80 92L72.0 96.0L72.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="92" cy="92" r="10"/><path d="M85.0 85.0L99.0 99.0M85.0 99.0L99.0 85.0" stroke-width="1.2"/><path d="M102 92L140 92"/><path d="M140 92L132.0 96.0L132.0 88.0Z" fill="currentColor" stroke="none"/><rect x="140" y="68" width="100" height="48" rx="6"/><path d="M240 92L280 92"/><path d="M280 92L272.0 96.0L272.0 88.0Z" fill="currentColor" stroke="none"/><rect x="280" y="68" width="100" height="48" rx="6"/><path d="M380 92L420 92"/><path d="M420 92L412.0 96.0L412.0 88.0Z" fill="currentColor" stroke="none"/><rect x="420" y="68" width="100" height="48" rx="6"/><path d="M470 22L470 68"/><path d="M470 68L466.0 60.0L474.0 60.0Z" fill="currentColor" stroke="none"/><path d="M520 92L588 92"/><path d="M588 92L580.0 96.0L580.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="556" cy="92" r="3" fill="currentColor"/><path d="M556 92L556 168L380 168"/><path d="M380 168L388.0 164.0L388.0 172.0Z" fill="currentColor" stroke="none"/><rect x="280" y="146" width="100" height="44" rx="6"/><path d="M280 168L92 168L92 102"/><path d="M92 102L96.0 110.0L88.0 110.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="14" y="96" text-anchor="start" font-size="12" font-weight="600">w</text><text x="83" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="121" y="84" text-anchor="middle" font-size="12" font-style="italic">e</text><text x="190.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Regler</text><text x="260" y="84" text-anchor="middle" font-size="12" font-style="italic">y</text><text x="330.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Stellglied</text><text x="470.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Strecke</text><text x="478" y="30" text-anchor="start" font-size="11.5">Störgrösse z</text><text x="586" y="84" text-anchor="end" font-size="12" font-style="italic">x</text><text x="330.0" y="172.0" text-anchor="middle" font-size="12.5" font-weight="600">Messglied</text></g></svg><figcaption>Geschlossener Regelkreis: Der Regler vergleicht den Sollwert w mit dem gemessenen Istwert x und stellt über das Stellglied nach. Störgrössen z wirken auf die Strecke.</figcaption></figure>

Mehr dazu, zu Totzeit und Sprungantwort: [Regelkreise](/wissen/regelkreise).

| Element             | Symbol | Beispiel                        |
| ------------------- | ------ | ------------------------------- |
| Führungsgrösse      | W      | Soll-Raumtemperatur 22 °C       |
| Regelabweichung     | e      | 22 − 20 = 2 K                   |
| Stellgrösse         | Y      | Ventilöffnung 0–100 %           |
| Regelgrösse/Istwert | X      | Gemessene Raumtemperatur 20 °C  |
| Störgrösse          | Z      | Aussentemperatur, Fenster offen |
| Strecke             | S      | Raum mit Heizkörper             |

---

## Wann steuern, wann regeln?

| Situation                                                 | Steuern | Regeln |
| --------------------------------------------------------- | ------- | ------ |
| Eingang und Ausgang direkt proportional (keine Störungen) | ✅      | —      |
| Störungen müssen kompensiert werden                       | —       | ✅     |
| Genauigkeit wichtig                                       | —       | ✅     |
| Einfache EIN/AUS-Schaltung ohne Feedback                  | ✅      | —      |
| Temperatur, Druck, Durchfluss halten                      | —       | ✅     |
| Zeitprogramm (wann, nicht wie viel)                       | ✅      | —      |

**In der Praxis** wird beides kombiniert: Das Zeitprogramm **steuert** den Betriebsmodus (Komfort/Nacht), innerhalb des Modus **regelt** der PID-Regler die Temperatur.

---

## Normen

- **IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch, Leittechnik (DIN IEC 60050-351, früher DIN 19226)

<!-- EN -->

In practice, "control" (open-loop) and "regulation" (closed-loop) are often confused. The difference is fundamental and determines whether a system operates safely and precisely.

## Control — Open Loop

**Control** means: one input (command) → one output (action), **without feedback**.

The command "open valve 50 %" is executed. Nobody checks whether the room then reaches the desired temperature.

**Characteristics:**

- No measurement of the effect
- No compensation for disturbances
- Simple, fast, inexpensive
- Inaccurate under varying conditions

**Control examples:**

- Time switch: pump runs 7 am–6 pm (regardless of heating demand)
- Light: press button → light on (no brightness measurement)
- Blind: press UP → moves up (no position feedback)
- **Heating curve:** the outdoor temperature determines the flow temperature. Nobody measures whether the room is warm enough. For the room this is open-loop control, even though the flow temperature itself is closed-loop controlled. It works because it takes the most important disturbance, the outdoor temperature, into account in advance.

---

## Regulation — Closed Loop

**Regulation** means: actual state is measured, compared to the setpoint, and the deviation is corrected.

1. The sensor measures the actual value, for example 20 °C.
2. The controller compares it with the setpoint, for example 22 °C. The control error is 2 K.
3. From that the controller calculates the output, for example valve 70 %.
4. The valve opens, the room warms up.
5. The sensor measures the new actual value, and everything starts again.

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

<figure class="schema"><svg viewBox="0 0 600 200" role="img" aria-label="Control loop: setpoint w, comparison, controller, actuator, process, controlled variable x and feedback through the sensor" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M34 92L80 92"/><path d="M80 92L72.0 96.0L72.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="92" cy="92" r="10"/><path d="M85.0 85.0L99.0 99.0M85.0 99.0L99.0 85.0" stroke-width="1.2"/><path d="M102 92L140 92"/><path d="M140 92L132.0 96.0L132.0 88.0Z" fill="currentColor" stroke="none"/><rect x="140" y="68" width="100" height="48" rx="6"/><path d="M240 92L280 92"/><path d="M280 92L272.0 96.0L272.0 88.0Z" fill="currentColor" stroke="none"/><rect x="280" y="68" width="100" height="48" rx="6"/><path d="M380 92L420 92"/><path d="M420 92L412.0 96.0L412.0 88.0Z" fill="currentColor" stroke="none"/><rect x="420" y="68" width="100" height="48" rx="6"/><path d="M470 22L470 68"/><path d="M470 68L466.0 60.0L474.0 60.0Z" fill="currentColor" stroke="none"/><path d="M520 92L588 92"/><path d="M588 92L580.0 96.0L580.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="556" cy="92" r="3" fill="currentColor"/><path d="M556 92L556 168L380 168"/><path d="M380 168L388.0 164.0L388.0 172.0Z" fill="currentColor" stroke="none"/><rect x="280" y="146" width="100" height="44" rx="6"/><path d="M280 168L92 168L92 102"/><path d="M92 102L96.0 110.0L88.0 110.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="14" y="96" text-anchor="start" font-size="12" font-weight="600">w</text><text x="83" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="121" y="84" text-anchor="middle" font-size="12" font-style="italic">e</text><text x="190.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Controller</text><text x="260" y="84" text-anchor="middle" font-size="12" font-style="italic">y</text><text x="330.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Actuator</text><text x="470.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Process</text><text x="478" y="30" text-anchor="start" font-size="11.5">Disturbance z</text><text x="586" y="84" text-anchor="end" font-size="12" font-style="italic">x</text><text x="330.0" y="172.0" text-anchor="middle" font-size="12.5" font-weight="600">Sensor</text></g></svg><figcaption>Closed control loop: the controller compares the setpoint w with the measured value x and acts through the actuator. Disturbances z act on the process.</figcaption></figure>

More on this, on dead time and step response: [Control Loops](/wissen/regelkreise).

| Element           | Symbol | Example                          |
| ----------------- | ------ | -------------------------------- |
| Setpoint          | W      | Target room temperature 22 °C    |
| Control deviation | e      | 22 − 20 = 2 K                    |
| Control output    | Y      | Valve position 0–100%            |
| Actual value      | X      | Measured room temperature 20 °C  |
| Disturbance       | Z      | Outdoor temperature, window open |
| Process           | S      | Room with radiator               |

---

## When to Control, When to Regulate?

| Situation                                                | Control | Regulate |
| -------------------------------------------------------- | ------- | -------- |
| Input and output directly proportional (no disturbances) | ✅      | —        |
| Disturbances must be compensated                         | —       | ✅       |
| Accuracy is important                                    | —       | ✅       |
| Simple ON/OFF switching without feedback                 | ✅      | —        |
| Maintaining temperature, pressure, flow                  | —       | ✅       |
| Time schedule (when, not how much)                       | ✅      | —        |

**In practice** both are combined: the time schedule **controls** the operating mode (comfort/night), while within that mode the PID controller **regulates** the temperature.

---

## Standards

- **IEC 60050-351** — International Electrotechnical Vocabulary, control technology (DIN IEC 60050-351, formerly DIN 19226)
