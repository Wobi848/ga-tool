---
title: DDC-Programmierung — IEC 61131-3 Grundlagen
title_en: DDC Programming — IEC 61131-3 Fundamentals
slug: ddc-programmierung
category: ga
subcategory: programmierung
tags:
  [
    ddc-programmierung,
    iec61131,
    fbd,
    ld,
    st,
    structured-text,
    funktionsbausteindiagramm,
    leiterdiagramm,
    sps,
    pid-baustein,
    timer,
    zähler,
    fb,
    fc,
    programm,
    zyklus
  ]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, pid-regler, signaltypen, steuern-regeln, hand-0-auto, sps-grundlagen]
norm: [IEC 61131-3, EN 61131-3]
updated: 2026-10-14
lang: de
---

# DDC-Programmierung — IEC 61131-3 Grundlagen

DDC-Steuerungen werden nach **IEC 61131-3** programmiert — dem internationalen Standard für SPS- und DDC-Programmiersprachen. Wer GA-Anlagen parametriert oder programmiert, begegnet diesen Sprachen täglich.

## IEC 61131-3 — Fünf Programmiersprachen

| Sprache                       | Kürzel | Art                          | Stärke                                  |
| ----------------------------- | ------ | ---------------------------- | --------------------------------------- |
| **Funktionsbausteindiagramm** | FBD    | Grafisch (Blöcke)            | Regelschleifen, GA-Logiken              |
| **Kontaktplan**               | LD     | Grafisch (Relais-ähnlich)    | Schaltlogiken, Verriegelungen           |
| **Strukturierter Text**       | ST     | Textuell (Pascal-ähnlich)    | Berechnungen, komplexe Logik            |
| Anweisungsliste               | IL     | Textuell (Assembler-ähnlich) | in der 3. Ausgabe als veraltet markiert |
| Ablaufsprache                 | SFC    | Grafisch (Zustandsmaschine)  | Sequenzielle Abläufe                    |

---

## FBD — Funktionsbausteindiagramm

In der GA am häufigsten. Verbindet vorgefertigte Bausteine mit "Drähten":

Zwei typische Verknüpfungen:

| Eingänge                                  | Baustein              | Ausgang           |
| ----------------------------------------- | --------------------- | ----------------- |
| Vorlauftemperatur AI, Vorlauf-Sollwert AV | PID, Kp 2.5, Tn 5 min | Mischventil AO    |
| Laufmeldung Pumpe DI                      | TON, Verzögerung 30 s | Störmeldung Pumpe |

**Vorgefertigte Bausteine (FB = Function Block):**

- `PID` — Proportional-Integral-Differential Regler
- `TON` — Timer On-Delay (Einschaltverzögerung)
- `TOF` — Timer Off-Delay (Ausschaltverzögerung)
- `CTU/CTD` — Aufwärts-/Abwärtszähler
- `SR/RS` — Set-Reset-Speicher (Verriegelungslogik)
- `SEL` — Auswahl (wenn-dann)
- `LIMIT` — Begrenzer (min/max)

---

## Structured Text (ST) — Beispiel

Vorlauftemperatur-Berechnung (Heizkurve):

```pascal
(* Heizkurve: Vorlauftemperatur aus Aussentemperatur *)
PROGRAM Heizkurve
VAR
  T_Aussen   : REAL;   (* Aussentemperatur °C *)
  T_VL_Soll  : REAL;   (* Berechneter Vorlauf-Sollwert *)
  Neigung    : REAL := 1.5;   (* Heizkurven-Steilheit *)
  T_Norm_A   : REAL := -10.0; (* Normaussentemperatur *)
  T_Raum_Soll: REAL := 21.0;  (* Raumsolltemperatur *)
END_VAR

(* Berechnung *)
T_VL_Soll := T_Raum_Soll + Neigung * (T_Raum_Soll - T_Aussen);

(* Begrenzen auf 20...80 °C *)
IF T_VL_Soll > 80.0 THEN
  T_VL_Soll := 80.0;
ELSIF T_VL_Soll < 20.0 THEN
  T_VL_Soll := 20.0;
END_IF;
```

---

## Ladder Diagram (LD) — Verriegelungsbeispiel

Pumpen-Verriegelung: Pumpe darf nur laufen wenn kein Frost und Betrieb freigegeben:

```
|--[ BetriebsFreigabe ]--[ /FrostAlarm ]--[ /PumpeStorung ]--( Pumpe_EIN )--|
```

- `[ ]` = Schliesskontakt (Bedingung erfüllt = 1)
- `[ / ]` = Öffnerkontakt (invertiert, Bedingung nicht erfüllt)
- `( )` = Ausgangs-Spule (setzt Ausgang)

Eine Selbsthaltung parallel über den ganzen Strompfad wäre hier falsch: Die Pumpe bliebe dann auch bei Frostalarm eingeschaltet.

Übersetzt: Pumpe ein wenn: BetriebsFreigabe = 1 UND FrostAlarm = 0 UND PumpeStorung = 0

---

## Zyklisches Programm

DDC-Programm läuft zyklisch:

In jedem Zyklus, zum Beispiel jede Sekunde:

1. Eingänge lesen (AI, DI)
2. Programm ausführen (Bausteine, Logik)
3. Ausgänge setzen (AO, DO)

Im nächsten Zyklus beginnt alles mit den neuen Eingangswerten von vorn.

**Zykluszeit:** Typisch 100 ms – 5 Sekunden für GA-Anwendungen (schnelle Regelungen: 100 ms, langsame Raumtemperaturen: 5–10 s).

---

## Typische GA-Bausteine

### PID-Baustein

| Anschluss     | Bedeutung                               |
| ------------- | --------------------------------------- |
| Istwert X     | Eingang, Messwert                       |
| Sollwert W    | Eingang                                 |
| Freigabe      | Eingang, Regler aktiv oder nicht        |
| Kp, Tn, Tv    | Parameter, zum Beispiel 2.5, 300 s, 0 s |
| Stellgrösse Y | Ausgang, 0–100 %                        |

Parameter:

- **Kp** (Verstärkung): Wie stark reagiert der Regler auf Abweichung
- **Ti** (Nachstellzeit): Wie lange integriert der I-Anteil
- **Td** (Vorhaltezeit): Wie weit schaut der D-Anteil voraus

### Wärmekurven-Baustein (Hersteller-FB)

Eingänge: Aussentemperatur, Steilheit (zum Beispiel 1.5), Raumsollwert (zum Beispiel 21 °C). Ausgang: Vorlauf-Sollwert.

Viele DDC-Plattformen bieten fertige Heizkurven-FBs mit Steilheit, Parallelverschiebung, Grenztemperatur.

---

## Hersteller-Spezifika

| Hersteller         | Plattform            | Sprache / Tool                 |
| ------------------ | -------------------- | ------------------------------ |
| Siemens            | Desigo PXC           | Desigo ABT (proprietär)        |
| Sauter             | EY-modulo            | CASE Suite                     |
| Schneider Electric | EcoStruxure Building | Function Block, Script         |
| Beckhoff           | CX / TwinCAT         | IEC 61131-3 (ST, FBD, LD)      |
| CODESYS            | Viele Hersteller     | CODESYS (IEC 61131-3 Standard) |

**Wichtig:** Programme sind meist **nicht portierbar** zwischen Herstellern. Auch wenn IEC 61131-3 Standard ist, gibt es herstellerspezifische Erweiterungen und Bibliotheken.

## Normen

- **IEC 61131-3** — Programmiersprachen für SPS
- **EN 61131-3** — Europäische Fassung
- **IEC 61131-1** — Allgemeine Informationen zu SPS

<!-- EN -->

DDC controllers are programmed to **IEC 61131-3** — the international standard for PLC and DDC programming languages. Anyone configuring or programming BA installations encounters these languages daily.

## IEC 61131-3 — Five Programming Languages

| Language                   | Abbrev. | Type                      | Strength                                |
| -------------------------- | ------- | ------------------------- | --------------------------------------- |
| **Function Block Diagram** | FBD     | Graphical (blocks)        | Control loops, BA logic                 |
| **Ladder Diagram**         | LD      | Graphical (relay-like)    | Switching logic, interlocks             |
| **Structured Text**        | ST      | Textual (Pascal-like)     | Calculations, complex logic             |
| Instruction List           | IL      | Textual (assembler-like)  | marked as deprecated in the 3rd edition |
| Sequential Function Chart  | SFC     | Graphical (state machine) | Sequential processes                    |

---

## FBD — Function Block Diagram

Most common in BA. Connects pre-built blocks with "wires":

Two typical connections:

| Inputs                                | Block                 | Output             |
| ------------------------------------- | --------------------- | ------------------ |
| flow temperature AI, flow setpoint AV | PID, Kp 2.5, Ti 5 min | mixing valve AO    |
| pump run status DI                    | TON, delay 30 s       | pump fault message |

**Pre-built blocks (FB = Function Block):**

- `PID` — Proportional-Integral-Derivative controller
- `TON` — Timer On-Delay
- `TOF` — Timer Off-Delay
- `CTU/CTD` — Up/down counter
- `SR/RS` — Set-Reset latch (interlock logic)
- `SEL` — Selector (if-then)
- `LIMIT` — Limiter (min/max)

---

## Structured Text (ST) — Example

Supply temperature calculation (heating curve):

```pascal
(* Heating curve: supply temperature from outdoor temperature *)
PROGRAM HeatingCurve
VAR
  T_Outdoor  : REAL;   (* Outdoor temperature °C *)
  T_SUP_SP   : REAL;   (* Calculated supply setpoint *)
  Slope      : REAL := 1.5;   (* Heating curve slope *)
  T_Design_A : REAL := -10.0; (* Design outdoor temperature *)
  T_Room_SP  : REAL := 21.0;  (* Room setpoint *)
END_VAR

(* Calculation *)
T_SUP_SP := T_Room_SP + Slope * (T_Room_SP - T_Outdoor);

(* Limit to 20...80 °C *)
IF T_SUP_SP > 80.0 THEN
  T_SUP_SP := 80.0;
ELSIF T_SUP_SP < 20.0 THEN
  T_SUP_SP := 20.0;
END_IF;
```

---

## Ladder Diagram (LD) — Interlock Example

Pump interlock: pump may only run if no frost alarm and operation enabled:

```
|--[ OperationEnable ]--[ /FrostAlarm ]--[ /PumpFault ]--( Pump_ON )--|
```

- `[ ]` = normally open contact (condition met = 1)
- `[ / ]` = normally closed contact (inverted, condition not met)
- `( )` = output coil (sets output)

A latching branch in parallel across the whole rung would be wrong here: the pump would then stay on even with a frost alarm.

Translated: pump on when: OperationEnable = 1 AND FrostAlarm = 0 AND PumpFault = 0

---

## Cyclic Program

DDC program runs cyclically:

In every cycle, for example every second:

1. Read inputs (AI, DI)
2. Execute the program (blocks, logic)
3. Set outputs (AO, DO)

In the next cycle everything starts again with the new input values.

**Cycle time:** Typically 100 ms – 5 seconds for BA applications (fast control loops: 100 ms, slow room temperatures: 5–10 s).

---

## Typical BA Function Blocks

### PID Block

| Connection | Meaning                                 |
| ---------- | --------------------------------------- |
| Actual X   | input, measured value                   |
| Setpoint W | input                                   |
| Enable     | input, controller active or not         |
| Kp, Ti, Td | parameters, for example 2.5, 300 s, 0 s |
| Output Y   | output, 0–100 %                         |

Parameters:

- **Kp** (gain): How strongly the controller reacts to deviation
- **Ti** (reset time): How long the I-component integrates
- **Td** (derivative time): How far ahead the D-component looks

### Heating Curve Block (Manufacturer FB)

Inputs: outdoor temperature, slope (for example 1.5), room setpoint (for example 21 °C). Output: flow setpoint.

Many DDC platforms offer ready-made heating curve FBs with slope, parallel shift, and limit temperature.

---

## Manufacturer Specifics

| Manufacturer       | Platform             | Language / tool                |
| ------------------ | -------------------- | ------------------------------ |
| Siemens            | Desigo PXC           | Desigo ABT (proprietary)       |
| Sauter             | EY-modulo            | CASE Suite                     |
| Schneider Electric | EcoStruxure Building | Function Block, Script         |
| Beckhoff           | CX / TwinCAT         | IEC 61131-3 (ST, FBD, LD)      |
| CODESYS            | Many manufacturers   | CODESYS (IEC 61131-3 standard) |

**Important:** Programs are usually **not portable** between manufacturers. Even though IEC 61131-3 is the standard, there are manufacturer-specific extensions and libraries.

## Standards

- **IEC 61131-3** — Programming languages for PLCs
- **EN 61131-3** — European version
- **IEC 61131-1** — General information on PLCs
