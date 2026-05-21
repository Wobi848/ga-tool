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

```
24 V = AUF (Motor dreht gegen Feder)
0 V  = ZU (Feder schliesst Klappe automatisch)
```

**Anwendung:** Aussenluft-Klappe (fail-safe geschlossen). Bei Stromausfall → Klappe schliesst automatisch (Frostschutz!).

### 3-Punkt (Motorisch, ohne Rückmeldung)

```
Ausgang 1 = AUF → Motor dreht auf
Ausgang 2 = ZU  → Motor dreht zu
Beide = 0       → Motor steht (hält Position)
```

**Achtung:** Nie beide Ausgänge gleichzeitig! DDC-Verriegelung nötig.

**Anwendung:** Einfache Klappen ohne Positionsvorgabe.

### Stetig 0–10 V (mit Positionsrückmeldung)

```
Eingang 0–10 V → Klappe 0–100 % öffnen
Ausgang 0–10 V → Rückmeldung Ist-Position
```

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

```
M_Antrieb ≥ M_Klappe × Sicherheitsfaktor (1.5–2.0)

M_Klappe [Nm] = p_Diff [Pa] × A_Klappe [m²] × L_Hebelarm [m] / 2
```

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

```
Signal von DDC: DO (24 V = AUF)
Fail-Safe: Federrückstellung → ZU
Rückmeldung: DI Endschalter AUF + DI Endschalter ZU

Logik DDC:
  RLT startet → Klappe öffnen → warte auf Rückmeldung AUF → Ventilator freigeben
  RLT stoppt → Ventilator stoppen → warte 30 s → Klappe schliessen
```

> ⚠️ Ventilator **niemals starten** bevor Klappe geöffnet! Sonst Unterdruck → Klappe bläst wieder zu.

### Mischklappen (Umluft-Aussenluft)

```
Signal: AO 0–10 V
0 V = 100 % Aussenluft / 0 % Umluft
5 V = 50 % Aussenluft / 50 % Umluft
10 V = 0 % Aussenluft / 100 % Umluft

Gekoppelt: Aussenluft-Klappe + Umluft-Klappe mechanisch gegengekoppelt
(oder zwei separate Antriebe mit invertiertem Signal)
```

### VAV-Klappe

```
Volumenstrom-Regler DDC:
  Messeingang: Differenzdruck (→ Volumenstrom)
  Ausgang: 0–10 V → Klappen-Sollposition
  Rückmeldung: 0–10 V Klappenstellung-Ist

Regelziel: Volumenstrom = Soll (z.B. 200 m³/h)
```

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

- **EN ISO 6020-2** — Hydraulikzylinder (Analogie für Antriebe)
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

```
24 V = OPEN (motor turns against spring)
0 V  = CLOSED (spring closes damper automatically)
```

**Application:** Outdoor air damper (fail-safe closed). On power failure → damper closes automatically (frost protection!).

### 3-Position (Motorised, No Position Feedback)

```
Output 1 = OPEN → motor drives open
Output 2 = CLOSE → motor drives closed
Both = 0       → motor stops (holds position)
```

**Caution:** Never activate both outputs simultaneously! DDC interlock required.

**Application:** Simple dampers without position setpoint.

### Modulating 0–10 V (with Position Feedback)

```
Input 0–10 V → damper opens 0–100 %
Output 0–10 V → feedback of actual position
```

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

```
M_actuator ≥ M_damper × safety factor (1.5–2.0)

M_damper [Nm] = p_diff [Pa] × A_damper [m²] × L_lever [m] / 2
```

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

```
Signal from DDC: DO (24 V = OPEN)
Fail-safe: spring return → CLOSED
Feedback: DI end switch OPEN + DI end switch CLOSED

DDC logic:
  AHU starts → open damper → wait for OPEN feedback → enable fan
  AHU stops → stop fan → wait 30 s → close damper
```

> ⚠️ **Never start fan** before damper is open! Otherwise negative pressure → damper blows shut again.

### Mixing Dampers (Recirculated/Outdoor Air)

```
Signal: AO 0–10 V
0 V = 100 % outdoor air / 0 % recirculation
5 V = 50 % outdoor air / 50 % recirculation
10 V = 0 % outdoor air / 100 % recirculation

Coupled: outdoor air damper + recirculation damper mechanically cross-coupled
(or two separate actuators with inverted signal)
```

### VAV Damper

```
DDC volume flow controller:
  Measurement input: differential pressure (→ volume flow)
  Output: 0–10 V → damper position setpoint
  Feedback: 0–10 V actual damper position

Control objective: volume flow = setpoint (e.g. 200 m³/h)
```

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
