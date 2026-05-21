---
title: SPS — Speicherprogrammierbare Steuerung
title_en: PLC — Programmable Logic Controller
slug: sps-grundlagen
category: systeme
subcategory: steuerung
tags:
  [
    sps,
    plc,
    programmierbaresteuerung,
    iec61131,
    leitertechnik,
    strukturiertertext,
    funktionsbausteinplan,
    anweisungsliste,
    signalverarbeitung,
    zykluszelt,
    eingabe-ausgabe,
    feldbus
  ]
difficulty: grundlagen
area: [ga, hlk]
related:
  [ddc-programmierung, signaltypen, steuern-regeln, kaskadenregelung, pid-regler, profibus, modbus]
norm: [IEC 61131-1, IEC 61131-3]
updated: 2026-05-15
lang: de
---

# SPS — Speicherprogrammierbare Steuerung

Die Speicherprogrammierbare Steuerung (SPS), englisch **PLC** (Programmable Logic Controller), ist das Rückgrat industrieller und gebäudetechnischer Automatisierung. Sie ersetzt festverdrahtete Relaisschaltungen durch softwarebasierte Logik — die Funktion wird im Programm definiert, nicht in der Hardware.

## Grundprinzip

Eine SPS arbeitet in einem **Zyklus**:

```
┌─────────────────────────────────────────────┐
│  1. Eingaben lesen (Digitale + Analoge I)    │
│  2. Programm abarbeiten (Logik/Regelung)     │
│  3. Ausgaben schreiben (Digitale + Analoge O)│
│  4. Kommunikation (Feldbus, HMI, SCADA)      │
└─────────────────────────────────────────────┘
         Zykluszeit: 1 – 50 ms typisch
```

Alle Eingangswerte werden zu Beginn des Zyklus eingelesen und bleiben für den gesamten Zyklus konstant — das Programm arbeitet immer mit einem konsistenten Abbild.

## Hardware-Aufbau

| Modul                | Funktion                          | Beispiel GA                       |
| -------------------- | --------------------------------- | --------------------------------- |
| CPU                  | Programmausführung, Kommunikation | —                                 |
| DI (Digital Input)   | 24V-Signale einlesen              | Schaltstellung, Störmeldung       |
| DO (Digital Output)  | Relais/Transistor schalten        | Pumpe EIN/AUS, Ventil             |
| AI (Analog Input)    | 0–10V / 4–20mA messen             | Temp.-Sensor, Druckfühler         |
| AO (Analog Output)   | 0–10V / 4–20mA ausgeben           | Ventilstellung, Frequenzumrichter |
| Kommunikations-Modul | Feldbus-Schnittstelle             | BACnet, Modbus, Profibus          |

## Programmiersprachen nach IEC 61131-3

Die Norm definiert 5 Sprachen, die alle auf der gleichen SPS lauffähig sind:

### Kontaktplan (KOP / Ladder Diagram, LD)

Grafische Darstellung wie ein Stromkreis. Gut für einfache Schütz-/Verriegelungslogik, von Elektrikern bevorzugt.

```
|---[ ]---[ ]---( )|
| S1     S2     P  |   → Pumpe P läuft wenn Schalter S1 UND S2 geschlossen
```

### Funktionsbausteinsprache (FBS / Function Block Diagram, FBD)

Grafische Verbindung von Blöcken. Ideal für Regelkreise, Signalverarbeitung.

```
[AI_Temp]──→[PID]──→[AO_Ventil]
[SP_Temp]──→
```

### Strukturierter Text (ST / Structured Text)

Pascal-ähnliche Hochsprache. Mächtigste Sprache für komplexe Berechnungen.

```pascal
IF tRaum > tSollwert + 0.5 THEN
    stellgrad := stellgrad - 5.0;
ELSIF tRaum < tSollwert - 0.5 THEN
    stellgrad := stellgrad + 5.0;
END_IF;
stellgrad := LIMIT(0.0, stellgrad, 100.0);
```

### Anweisungsliste (AWL / Instruction List, IL)

Assembler-ähnlich, veraltet, wird selten neu eingesetzt.

### Ablaufsprache (AS / Sequential Function Chart, SFC)

Zustandsmaschine für sequentielle Abläufe (Anfahrsequenz, IBN).

## SPS vs. DDC in der Gebäudeautomation

| Merkmal        | SPS                 | DDC                  |
| -------------- | ------------------- | -------------------- |
| Zykluszeit     | 1–50 ms             | 100–500 ms           |
| Primäreinsatz  | Maschinen, Prozesse | Gebäude, HLK         |
| Normen         | IEC 61131           | BACnet, LON, KNX     |
| Skalierbarkeit | Mittel              | Gut (Netzwerk)       |
| Programmierung | IEC 61131-3         | Herstellerspezifisch |
| HVAC-Bausteine | Nachrüstbar         | Eingebaut            |

In der Praxis gibt es zunehmend Überschneidungen: Moderne DDC-Regler basieren auf SPS-Hardware und unterstützen IEC 61131-3; umgekehrt kommunizieren SPS über BACnet in GA-Netzwerke.

## Typische Anwendungen in der GA

**Lüftungsanlage (RLT):**

- Anfahrsequenz: Klappe öffnen → Ventilator starten → Regelung freigeben
- Schutzbedingungen: Frostschutz, Filterwächter, Brandschutz
- Regelung: Volumenstrom, Temperatur, Feuchte

**Kälteanlage:**

- Verdichter-Management: Zu/Abschalten nach Bedarf
- Sicherheitsverriegelungen: Hochdruckwächter, Ölwächter

**Heizungsanlage:**

- Kesselkaskade: Bedarfsabhängige Stufenzuschaltung
- Heizkurve: Witterungsgeführte Vorlauftemperatur

## Typische Fehlerquellen

| Problem                             | Ursache                                | Abhilfe                            |
| ----------------------------------- | -------------------------------------- | ---------------------------------- |
| Programm läuft, aber keine Reaktion | Falsches I/O-Mapping                   | Signalbild prüfen                  |
| Ausgang schaltet kurz und fällt ab  | Verriegelungsbedingung nicht erfüllt   | Logik mit Force-Funktion debuggen  |
| Analogsignal springt                | Masse-Potential / Schirmung            | Schirmung einseitig erden          |
| SPS geht in STOP                    | Programmfehler (Division durch 0 etc.) | Diagnosepuffer auslesen            |
| Zykluszeit zu lang                  | Zu viel Kommunikation im Zyklus        | Kommunikation asynchron entkoppeln |

## Sicherheitstechnik

Normale SPS sind **nicht sicherheitsgerichtet**. Für Sicherheitsfunktionen (SIL, PLe) werden spezielle Failsafe-SPS (z.B. Siemens S7-F, Pilz) eingesetzt, die nach IEC 62061 / ISO 13849 zertifiziert sind. In der GA betrifft das Brandschutzklappen, Entrauchung und Aufzüge.

## Wichtige Begriffe

| Begriff                 | Bedeutung                                         |
| ----------------------- | ------------------------------------------------- |
| Prozessabbild (PAE/PAA) | Kopie aller I/O am Zyklusstart                    |
| Merker / Flag           | Interne bool'sche Variable, keine I/O             |
| Datenbaustein (DB)      | Strukturierter Datenspeicher                      |
| Funktionsbaustein (FB)  | Wiederverwendbarer Codeblock mit eigenem Speicher |
| Watchdog                | Überwacht Zykluszeit, STOP bei Überschreitung     |
| Retain                  | Variablen bleiben bei Spannungsausfall erhalten   |

<!-- EN -->

The Programmable Logic Controller (PLC), German **SPS** (Speicherprogrammierbare Steuerung), is the backbone of industrial and building automation. It replaces hard-wired relay circuits with software-based logic — the function is defined in the program, not in the hardware.

## Basic Principle

A PLC operates in a **cycle**:

```
┌─────────────────────────────────────────────┐
│  1. Read inputs (digital + analogue I)       │
│  2. Execute program (logic / control)        │
│  3. Write outputs (digital + analogue O)     │
│  4. Communication (fieldbus, HMI, SCADA)    │
└─────────────────────────────────────────────┘
         Cycle time: 1 – 50 ms typical
```

All input values are read at the start of the cycle and remain constant for the entire cycle — the program always works with a consistent process image.

## Hardware Structure

| Module               | Function                         | BA Example                               |
| -------------------- | -------------------------------- | ---------------------------------------- |
| CPU                  | Program execution, communication | —                                        |
| DI (Digital Input)   | Read 24 V signals                | Switch position, fault message           |
| DO (Digital Output)  | Switch relay/transistor          | Pump ON/OFF, valve                       |
| AI (Analogue Input)  | Measure 0–10 V / 4–20 mA         | Temperature sensor, pressure transmitter |
| AO (Analogue Output) | Output 0–10 V / 4–20 mA          | Valve position, variable speed drive     |
| Communication module | Fieldbus interface               | BACnet, Modbus, Profibus                 |

## Programming Languages per IEC 61131-3

The standard defines 5 languages, all executable on the same PLC:

### Ladder Diagram (LD)

Graphical representation like a circuit diagram. Good for simple contactor/interlock logic, preferred by electricians.

```
|---[ ]---[ ]---( )|
| S1     S2     P  |   → Pump P runs when switch S1 AND S2 are closed
```

### Function Block Diagram (FBD)

Graphical connection of blocks. Ideal for control loops and signal processing.

```
[AI_Temp]──→[PID]──→[AO_Valve]
[SP_Temp]──→
```

### Structured Text (ST)

Pascal-like high-level language. Most powerful for complex calculations.

```pascal
IF tRoom > tSetpoint + 0.5 THEN
    controlSignal := controlSignal - 5.0;
ELSIF tRoom < tSetpoint - 0.5 THEN
    controlSignal := controlSignal + 5.0;
END_IF;
controlSignal := LIMIT(0.0, controlSignal, 100.0);
```

### Instruction List (IL)

Assembler-like, deprecated, rarely used in new projects.

### Sequential Function Chart (SFC)

State machine for sequential processes (start-up sequences, commissioning).

## PLC vs. DDC in Building Automation

| Feature              | PLC                 | DDC              |
| -------------------- | ------------------- | ---------------- |
| Cycle time           | 1–50 ms             | 100–500 ms       |
| Primary use          | Machines, processes | Buildings, HVAC  |
| Standards            | IEC 61131           | BACnet, LON, KNX |
| Scalability          | Medium              | Good (network)   |
| Programming          | IEC 61131-3         | Vendor-specific  |
| HVAC function blocks | Add-on              | Built-in         |

In practice the boundary is blurring: modern DDC controllers are based on PLC hardware and support IEC 61131-3; conversely, PLCs communicate via BACnet into BA networks.

## Typical Applications in BA

**Air handling unit (AHU):**

- Start-up sequence: open damper → start fan → enable control
- Protective interlocks: frost protection, filter monitor, fire damper
- Control: airflow, temperature, humidity

**Refrigeration plant:**

- Compressor management: stage on/off according to demand
- Safety interlocks: high-pressure switch, oil switch

**Heating plant:**

- Boiler cascade: demand-based stage switching
- Heating curve: weather-compensated flow temperature

## Common Fault Sources

| Problem                            | Cause                                  | Remedy                                |
| ---------------------------------- | -------------------------------------- | ------------------------------------- |
| Program runs but no response       | Wrong I/O mapping                      | Check process image                   |
| Output switches briefly then drops | Interlock condition not met            | Debug logic with force function       |
| Analogue signal jumps              | Ground potential / shielding           | Earth shield at one end only          |
| PLC goes to STOP                   | Program error (division by zero, etc.) | Read diagnostic buffer                |
| Cycle time too long                | Too much communication in cycle        | Decouple communication asynchronously |

## Safety Technology

Standard PLCs are **not safety-rated**. For safety functions (SIL, PLe) special failsafe PLCs (e.g. Siemens S7-F, Pilz) are used, certified to IEC 62061 / ISO 13849. In BA this applies to fire dampers, smoke extraction, and lifts.

## Key Terms

| Term                    | Meaning                               |
| ----------------------- | ------------------------------------- |
| Process image (PAI/PAO) | Copy of all I/O at cycle start        |
| Flag / marker           | Internal boolean variable, no I/O     |
| Data block (DB)         | Structured data store                 |
| Function block (FB)     | Reusable code block with own memory   |
| Watchdog                | Monitors cycle time, STOP if exceeded |
| Retain                  | Variables preserved on power loss     |
