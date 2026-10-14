---
title: Klappenantriebe — Luftklappen in der GA
title_en: Damper Actuators — Air Dampers in Building Automation
slug: klappenantriebe
category: lueftung
subcategory: aktoren
tags:
  [
    klappenantrieb,
    luftklappe,
    stellzeit,
    dreipunkt,
    stetig,
    fail-safe,
    aussenluft,
    abluft,
    mischluft,
    vav,
    brandschutzklappe,
    rückmeldung,
    endschalter,
    nm,
    drehmoment
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vav-cav, signaltypen, motorventile, brandschutzklappen]
norm: [EN ISO 4254, EN 61010-2-201]
updated: 2026-05-14
lang: de
---

# Klappenantriebe — Luftklappen in der GA

Klappenantriebe setzen elektrische Signale in mechanische Klappenstellungen um. Sie steuern den Luftfluss in Lüftungskanälen — von der einfachen Aussenluft-Klappe bis zum präzisen VAV-Regler.

## Klappen-Typen

| Klappentyp            | Funktion                          | Einsatz                  |
| --------------------- | --------------------------------- | ------------------------ |
| **Aussenluft-Klappe** | Öffnen/Schliessen Aussenluft      | RLT-Anlage, Einlass      |
| **Abluft-Klappe**     | Öffnen/Schliessen Abluft/Fortluft | RLT-Anlage, Auslass      |
| **Mischluft-Klappe**  | Mischverhältnis Aussen/Umluft     | Energiesparen via Umluft |
| **Brandschutzklappe** | Brandfall-Absperrung              | Feuerschutz              |
| **Überström-Klappe**  | Druckausgleich                    | Bei Über-/Unterdruck     |
| **VAV-Klappe**        | Volumenstromregelung              | VAV-Boxen                |

---

## Antriebsarten und Signale

### 2-Punkt (Federrückstell)

- **24 V an:** Der Motor dreht die Klappe auf und spannt dabei die Feder.
- **24 V weg:** Die Feder schliesst die Klappe.

**Anwendung:** Aussenluft-Klappe (fail-safe geschlossen). Bei Stromausfall → Klappe schliesst automatisch (Frostschutz!).

### 3-Punkt (Motorisch, ohne Rückmeldung)

- **Ausgang AUF** aktiv: Der Motor dreht auf.
- **Ausgang ZU** aktiv: Der Motor dreht zu.
- **Beide aus:** Der Motor bleibt stehen und hält die Stellung.

**Achtung:** Nie beide Ausgänge gleichzeitig! DDC-Verriegelung nötig.

**Anwendung:** Einfache Klappen ohne Positionsvorgabe.

### Stetig 0–10 V (mit Positionsrückmeldung)

- **Eingang 0–10 V:** Sollstellung 0–100 %
- **Ausgang 0–10 V:** Rückmeldung der Iststellung

**Anwendung:** VAV-Boxen, Mischklappen, genaue Positionsregelung.

---

## Technische Kenngrössen

| Parameter        | Typische Werte         | Bedeutung                       |
| ---------------- | ---------------------- | ------------------------------- |
| **Drehmoment**   | 2–40 Nm                | Kraft zum Bewegen der Klappe    |
| **Stellzeit**    | 30–300 s (0–90°)       | Zeit für Vollaushub             |
| **Nennspannung** | 24 VAC/DC oder 230 VAC | Versorgungsspannung             |
| **Stellsignal**  | 2-Pkt, 3-Pkt, 0–10 V   | Art der Ansteuerung             |
| **Fail-Safe**    | AUF / ZU / Halten      | Sicherheitsstellung bei Ausfall |
| **Rückmeldung**  | Endschalter, 0–10 V    | Position zurückmelden           |

### Drehmoment berechnen

Hersteller geben das nötige Drehmoment **je m² Klappenfläche** an, abhängig von Klappenbauart, Dichtheitsklasse und Druck. Typisch sind etwa 5 bis 10 Nm/m², bei dicht schliessenden Klappen und hohen Drücken mehr. Den Antrieb mit etwas Reserve wählen.

Typische Faustregel: **4–8 Nm/m² Klappenfläche** (abhängig von Druckdifferenz und Klappentyp).

---

## Fail-Safe Stellung

| Fail-Safe  | Beschreibung                             | Anwendung                   |
| ---------- | ---------------------------------------- | --------------------------- |
| **ZU**     | Federrückstellung → schliesst            | Aussenluft-Klappe (Frost!)  |
| **AUF**    | Federrückstellung → öffnet               | Überdruckklappe, Sicherheit |
| **Halten** | Motor hält letzte Position (keine Feder) | VAV, Mischklappe            |

**Federrückstell-Antriebe** gehen bei Stromausfall automatisch in Fail-Safe-Position — bevorzugt für sicherheitskritische Klappen.

---

## Klappenantrieb in der RLT

### Aussenluft-Klappe (typisch)

- **Ansteuerung:** DO, 24 V = auf, Federrücklauf zu
- **Rückmeldung:** Endschalter AUF und ZU als DI
- **Start:** Klappe öffnen, auf die Rückmeldung AUF warten, dann den Ventilator freigeben
- **Stopp:** Ventilator aus, auslaufen lassen, dann Klappe schliessen

> ⚠️ Den Ventilator **nie gegen eine geschlossene Klappe** starten: Der Unterdruck oder Überdruck kann Kanäle und Gerätegehäuse verformen, und die Klappe lässt sich gegen den Druck schwer öffnen.

### Mischklappen (Umluft-Aussenluft)

- **Ansteuerung:** AO 0–10 V, z.B. 0 V = 100 % Aussenluft, 10 V = 100 % Umluft; die Richtung legt das Projekt fest
- **Kopplung:** Aussenluft- und Umluftklappe gegenläufig, mechanisch über ein Gestänge oder mit zwei Antrieben und invertiertem Signal

### VAV-Klappe

Der VAV-Regler misst den Wirkdruck, rechnet daraus den Volumenstrom und stellt die Klappe über 0–10 V nach, bis der Sollwert erreicht ist, zum Beispiel 200 m³/h. Die Klappenstellung meldet er zurück.

---

## Typische Fehler

| Fehler                           | Symptom                               | Lösung                              |
| -------------------------------- | ------------------------------------- | ----------------------------------- |
| Falsches Drehmoment              | Klappe klemmt, Antrieb überhitzt      | Antrieb austauschen                 |
| Klappe dreht in falsche Richtung | Vollständig verkehrt                  | Drehrichtung im Antrieb ändern      |
| 3-Punkt Verriegelung fehlt       | Antrieb zerstört (Gegenansteuerung)   | DDC-Verriegelung implementieren     |
| Fail-safe falsch (AUF statt ZU)  | Anlage heizt/kühlt Aussenluft unnötig | Antrieb mit richtiger Federstellung |
| Rückmeldung falsch verdrahtet    | DDC meldet falsche Position           | Endschalter-Anschluss prüfen        |

## Normen

- **EN 1751** — Aerodynamische Prüfung von Klappen, Dichtheitsklassen
- **Hersteller-Normen:** Belimo, Siemens, Sauter, Johnson Controls (je eigene Kennlinie und Montagevorschrift)

<!-- EN -->

Damper actuators convert electrical signals into mechanical damper positions. They control airflow in ventilation ducts — from a simple outdoor air damper to a precise VAV controller.

## Damper Types

| Damper type            | Function                           | Application                     |
| ---------------------- | ---------------------------------- | ------------------------------- |
| **Outdoor air damper** | Open/close outdoor air             | AHU, air inlet                  |
| **Extract air damper** | Open/close extract/exhaust air     | AHU, air outlet                 |
| **Mixing damper**      | Mix ratio outdoor/recirculated air | Energy saving via recirculation |
| **Fire damper**        | Closure in fire event              | Fire protection                 |
| **Relief damper**      | Pressure equalisation              | On over/under-pressure          |
| **VAV damper**         | Volume flow control                | VAV boxes                       |

---

## Actuator Types and Signals

### 2-Position (Spring Return)

- **24 V on:** the motor opens the damper and tensions the spring.
- **24 V off:** the spring closes the damper.

**Application:** Outdoor air damper (fail-safe closed). On power failure → damper closes automatically (frost protection!).

### 3-Position (Motorised, No Position Feedback)

- **Output OPEN** active: the motor drives open.
- **Output CLOSE** active: the motor drives closed.
- **Both off:** the motor stops and holds its position.

**Caution:** Never activate both outputs simultaneously! DDC interlock required.

**Application:** Simple dampers without position setpoint.

### Modulating 0–10 V (with Position Feedback)

- **Input 0–10 V:** target position 0–100 %
- **Output 0–10 V:** feedback of the actual position

**Application:** VAV boxes, mixing dampers, precise position control.

---

## Technical Parameters

| Parameter          | Typical values       | Meaning                    |
| ------------------ | -------------------- | -------------------------- |
| **Torque**         | 2–40 Nm              | Force to move the damper   |
| **Stroke time**    | 30–300 s (0–90°)     | Time for full travel       |
| **Supply voltage** | 24 VAC/DC or 230 VAC | Supply voltage             |
| **Control signal** | 2-pos, 3-pos, 0–10 V | Type of control            |
| **Fail-safe**      | OPEN / CLOSED / Hold | Safety position on failure |
| **Feedback**       | End switch, 0–10 V   | Position reporting         |

### Torque Calculation

Manufacturers state the required torque **per m² of damper area**, depending on damper design, leakage class and pressure. About 5 to 10 Nm/m² is typical, more for tight-closing dampers and high pressures. Choose the actuator with some margin.

Typical rule of thumb: **4–8 Nm/m² damper area** (depending on differential pressure and damper type).

---

## Fail-Safe Position

| Fail-safe  | Description                           | Application                 |
| ---------- | ------------------------------------- | --------------------------- |
| **CLOSED** | Spring return → closes                | Outdoor air damper (frost!) |
| **OPEN**   | Spring return → opens                 | Relief damper, safety       |
| **Hold**   | Motor holds last position (no spring) | VAV, mixing damper          |

**Spring-return actuators** automatically move to the fail-safe position on power failure — preferred for safety-critical dampers.

---

## Damper Actuator in the AHU

### Outdoor Air Damper (Typical)

- **Control:** DO, 24 V = open, spring return closed
- **Feedback:** end switches OPEN and CLOSED as DI
- **Start:** open the damper, wait for OPEN feedback, then enable the fan
- **Stop:** fan off, let it run down, then close the damper

> ⚠️ **Never start the fan against a closed damper:** the negative or positive pressure can deform ducts and unit casings, and the damper is hard to open against the pressure.

### Mixing Dampers (Recirculated/Outdoor Air)

- **Control:** AO 0–10 V, e.g. 0 V = 100 % outdoor air, 10 V = 100 % recirculation; the direction is set by the project
- **Coupling:** outdoor air and recirculation dampers opposed, mechanically via linkage or with two actuators and an inverted signal

### VAV Damper

The VAV controller measures the differential pressure, calculates the flow from it and adjusts the damper via 0–10 V until the setpoint is reached, for example 200 m³/h. It reports the damper position back.

---

## Typical Faults

| Fault                                    | Symptom                                      | Solution                              |
| ---------------------------------------- | -------------------------------------------- | ------------------------------------- |
| Wrong torque                             | Damper jams, actuator overheats              | Replace actuator                      |
| Damper rotates in wrong direction        | Completely reversed                          | Change rotation direction in actuator |
| 3-position interlock missing             | Actuator destroyed (opposing commands)       | Implement DDC interlock               |
| Wrong fail-safe (OPEN instead of CLOSED) | System heats/cools outdoor air unnecessarily | Actuator with correct spring position |
| Feedback wired incorrectly               | DDC reports wrong position                   | Check end switch wiring               |

## Standards

- **Manufacturer standards:** Belimo, Siemens, Sauter, Johnson Controls (each with own characteristic and installation instructions)
