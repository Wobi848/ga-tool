---
title: Frequenzumrichter (FU) in der HLK
title_en: Variable Speed Drives (VSD) in HVAC
slug: frequenzumrichter
category: regelung
subcategory: antriebe
tags:
  [
    frequenzumrichter,
    fu,
    vfd,
    umrichter,
    drehzahlregelung,
    u-f-kennlinie,
    pid,
    motordrehzahl,
    pumpe,
    ventilator,
    emv,
    modbus,
    bacnet,
    anlaufstrom,
    energiesparen
  ]
difficulty: fortgeschritten
area: [hlk, elektro, ga]
related: [pid-regler, modbus, bacnet, profibus, can-bus]
norm: [IEC 61800, EN 55011, EN 61000, VDE 0160]
updated: 2026-05-14
lang: de
---

# Frequenzumrichter (FU) in der HLK

Ein **Frequenzumrichter** (FU, auch VFD / Variable Frequency Drive) regelt die Drehzahl eines Drehstrommotors durch Veränderung von Frequenz und Spannung. In HLK-Anlagen an Pumpen und Ventilatoren eingesetzt, spart er erheblich Energie.

## Wirkprinzip

```
Netz (50 Hz, 400 V)
  → Gleichrichter (AC→DC, Zwischenkreis)
  → Zwischenkreis (DC-Bus ~540 V)
  → Wechselrichter (IGBT, PWM)
  → Motor (variable Frequenz & Spannung)
```

Der Wechselrichter erzeugt durch **Pulsweitenmodulation (PWM)** eine quasi-sinusförmige Ausgangsspannung mit einstellbarer Frequenz (typisch 0–60 Hz, max. oft 120 Hz).

## Affinitätsgesetze (Ähnlichkeitsgesetze)

Für Kreiselpumpen und Ventilatoren gelten die Ähnlichkeitsgesetze:

| Grösse       | Relation   | Bedeutung                                |
| ------------ | ---------- | ---------------------------------------- |
| Volumenstrom | V̇ ~ n      | Halbierung Drehzahl → halber Durchfluss  |
| Förderhöhe   | H ~ n²     | Halbierung Drehzahl → Viertel Förderhöhe |
| **Leistung** | **P ~ n³** | **Halbierung Drehzahl → 1/8 Leistung!**  |

> 💡 **Praxisbeispiel:** Ventilator bei 100 % Drehzahl: 7,5 kW. Bei 75 % Drehzahl: 7,5 × 0,75³ = **3,2 kW**. Energieeinsparung: 57 %!

Das macht FU-Regelung bei Ventilatoren und Pumpen so wirkungsvoll.

## Regelungsmodi

### Drehzahl-Vorgabe (externe Sollwertvorgabe)

- **0–10 V** Analogsignal: 0 V = 0 Hz, 10 V = max. Frequenz
- **4–20 mA** Stromsignal (ausfallsicher, da 0 mA erkannt wird)
- **Digitale Protokolle:** Modbus RTU/TCP, BACnet MS/TP/IP, Profibus, PROFINET

### Integrierter PID-Regler

Die meisten modernen FU haben einen eiggebauten PID-Regler:

- **Istwert-Eingang:** Druckgeber, Temperatursensor (analog oder Bus)
- **Sollwert:** Fest parametriert oder über Analogeingang / Bus vorgegeben
- **Ausgang:** Interne Drehzahlregelung

Beispiel: Pumpendruckregelung ohne externe SPS:

```
Drucksensor (4–20 mA) → FU-Analogeingang
Drucksollwert (z.B. 2,5 bar) → FU-Parameter
FU regelt Drehzahl selbst, sodass p_ist = p_soll
```

### Motorsteuerungs-Varianten (U/f vs. Feldorientiert)

| Verfahren                     | Beschreibung                               | Einsatz                       |
| ----------------------------- | ------------------------------------------ | ----------------------------- |
| **U/f (linear)**              | Spannung proportional zur Frequenz         | Pumpen, Ventilatoren          |
| **U/f (quadratisch)**         | Spannung ~ f²: energieoptimiert für Lüfter | Ventilatoren, hohe Einsparung |
| **Sensorlose Vektorregelung** | Rechenmodell für Motor-Fluss               | Präzisere Drehmomentregelung  |
| **Closed-Loop-Vektor**        | Mit Encoder-Rückführung                    | Aufzüge, Präzisionsantriebe   |

Für HLK-Anwendungen reicht **U/f** in der Regel vollkommen aus.

## Wichtige Parametrierungsschritte

1. **Motordaten eingeben:** Nennspannung, Nennstrom, Nennfrequenz, cos φ, Polzahl
2. **Minimal-/Maximalfrequenz** festlegen (z.B. 15–50 Hz)
3. **Rampenzeiten** (Hochlauf / Auslauf): 5–30 s typisch — zu schnell → Überstrom / Störung
4. **PID-Parameter** einstellen falls integrierter Regler genutzt
5. **Busadresse** (Modbus Slave-ID, BACnet MS/TP MAC)
6. **Kommunikationsparameter** (Baudrate, Parität)
7. **Fehlerverhalten** (Auto-Reset, Fehleranzahl, Reaktionszeit)

> ⚠️ **Motordaten-Autotuning:** Viele FU bieten Autotuning an — Motor dreht kurz mit geringer Spannung, FU misst Widerstand/Induktivität. Verbessert die Regelgüte erheblich.

## Schutzfunktionen

| Schutz               | Beschreibung                                      |
| -------------------- | ------------------------------------------------- |
| Überstromschutz      | Abschaltung bei I > I_max                         |
| Überspannungsschutz  | DC-Bus zu hoch (z.B. bei generatorischem Betrieb) |
| Unterspannungsschutz | Netzausfall, zu niedrige Versorgung               |
| Übertemperaturschutz | FU-Innentemperatur, Motorthermistor (PTC)         |
| Blockierschutz       | Motor dreht nicht → Überstrom ohne Drehzahl       |
| Kurzschlussschutz    | Phasenkurzschluss am Ausgang                      |

## EMV — Elektromagnetische Verträglichkeit

FU erzeugen durch PWM erhebliche **leitungsgebundene und abgestrahlte Störungen**:

- **EMV-Filter** am Eingang (Netzdrossel + Entstörfilter) — bei CE-Konformität oft vorgeschrieben
- **Motorleitung geschirmt**, Schirm beidseitig aufgelegt
- **Motorleitung kurz halten** (<50 m ohne du/dt-Filter, >50 m du/dt-Filter)
- **FU und Steuerungsleitungen** getrennt führen (mind. 20 cm Abstand)
- **Separater Schutzleiter** FU → Motor (grün-gelb, mind. Querschnitt Aussenleiter)

> ⚠️ **RS-485 / Modbus neben FU:** Schirmung der Busleitung einseitig erden, räumlichen Abstand einhalten — FU-Störungen können Modbus-Kommunikation zerstören.

## Typische GA-Datenpunkte (Modbus)

Die meisten FU-Hersteller (Danfoss, ABB, Siemens, Schneider) bieten Modbus RTU:

| Datenpunkt            | Typ  | Typisches Register |
| --------------------- | ---- | ------------------ |
| Drehzahl-Sollwert     | Soll | Holding Register   |
| Drehzahl-Istwert      | Ist  | Input Register     |
| Ausgangsfrequenz [Hz] | Ist  | Input Register     |
| Ausgangsstrom [A]     | Ist  | Input Register     |
| Ausgangsleistung [kW] | Ist  | Input Register     |
| Betriebsstunden [h]   | Ist  | Input Register     |
| Statuswort            | Ist  | Input Register     |
| Fehlercode            | Ist  | Input Register     |
| Steuerung Start/Stop  | Soll | Holding Register   |

> **Statuswort** auswerten: Enthält typisch Betrieb, Drehzahl erreicht, Fehler, Handsteuerung aktiv — wichtig für Betriebsmeldung in der GLT.

## Häufige Fehler & Diagnose

| Fehlermeldung        | Ursache                                            | Massnahme                              |
| -------------------- | -------------------------------------------------- | -------------------------------------- |
| Überstrom (OC)       | Rampe zu kurz, Motor blockiert, Kabelkurzschluss   | Rampenzeit erhöhen, Motor prüfen       |
| Überspannung (OV)    | Auslaufzeit zu kurz (Generator-Betrieb), Netzspike | Bremsrampe verlängern, Bremswiderstand |
| Übertemperatur (OH)  | Lüftung blockiert, Umgebung zu heiss, FU zu klein  | Reinigen, Lüfter prüfen, FU ersetzen   |
| Motorübertemperatur  | PTC-Signal: Motor zu heiss                         | Belastung reduzieren, Kühlung prüfen   |
| Netzausfall (UV)     | Netzspannung zu gering                             | USV? Netz prüfen                       |
| Kommunikationsfehler | Busverbindung unterbrochen                         | Verdrahtung, Adresse, Terminierung     |

## Normen

- **IEC 61800-5-1** — FU-Sicherheitsanforderungen
- **IEC 61800-3** — EMV-Anforderungen für Antriebssysteme
- **EN 50598** — Energieeffizienz von Antriebssystemen (IE-Klassen für Umrichter: IES0–IES2)

<!-- EN -->

A **variable speed drive** (VSD, also VFD / Variable Frequency Drive) controls the speed of a three-phase motor by varying frequency and voltage. Used in HVAC installations on pumps and fans, it delivers significant energy savings.

## Operating Principle

```
Mains (50 Hz, 400 V)
  → Rectifier (AC→DC, DC link)
  → DC link (~540 V)
  → Inverter (IGBT, PWM)
  → Motor (variable frequency & voltage)
```

The inverter uses **pulse width modulation (PWM)** to generate a quasi-sinusoidal output voltage with adjustable frequency (typically 0–60 Hz, often max. 120 Hz).

## Affinity Laws (Similarity Laws)

For centrifugal pumps and fans the affinity laws apply:

| Quantity  | Relationship | Meaning                        |
| --------- | ------------ | ------------------------------ |
| Flow rate | Q̇ ~ n        | Halving speed → half flow      |
| Head      | H ~ n²       | Halving speed → quarter head   |
| **Power** | **P ~ n³**   | **Halving speed → 1/8 power!** |

> 💡 **Practical example:** Fan at 100% speed: 7.5 kW. At 75% speed: 7.5 × 0.75³ = **3.2 kW**. Energy saving: 57%!

This is what makes VSD control so effective for fans and pumps.

## Control Modes

### Speed Setpoint (External Setpoint Input)

- **0–10 V** analogue signal: 0 V = 0 Hz, 10 V = max. frequency
- **4–20 mA** current signal (fail-safe, since 0 mA is detected)
- **Digital protocols:** Modbus RTU/TCP, BACnet MS/TP/IP, PROFIBUS, PROFINET

### Integrated PID Controller

Most modern VSDs have a built-in PID controller:

- **Actual value input:** Pressure transmitter, temperature sensor (analogue or bus)
- **Setpoint:** Fixed parameter or via analogue input / bus
- **Output:** Internal speed control

Example: pump pressure control without external PLC:

```
Pressure sensor (4–20 mA) → VSD analogue input
Pressure setpoint (e.g. 2.5 bar) → VSD parameter
VSD controls speed so that p_actual = p_setpoint
```

### Motor Control Variants (V/f vs. Field-Oriented)

| Method                 | Description                             | Application                 |
| ---------------------- | --------------------------------------- | --------------------------- |
| **V/f (linear)**       | Voltage proportional to frequency       | Pumps, fans                 |
| **V/f (quadratic)**    | Voltage ~ f²: energy-optimised for fans | Fans, high savings          |
| **Sensorless vector**  | Computational model for motor flux      | More precise torque control |
| **Closed-loop vector** | With encoder feedback                   | Lifts, precision drives     |

For HVAC applications **V/f** is generally fully adequate.

## Key Commissioning Steps

1. **Enter motor data:** rated voltage, rated current, rated frequency, cos φ, pole count
2. **Set min./max. frequency** (e.g. 15–50 Hz)
3. **Ramp times** (acceleration / deceleration): 5–30 s typical — too fast → overcurrent / fault
4. **PID parameters** if integrated controller is used
5. **Bus address** (Modbus slave ID, BACnet MS/TP MAC)
6. **Communication parameters** (baud rate, parity)
7. **Fault behaviour** (auto-reset, fault count, response time)

> ⚠️ **Motor data auto-tuning:** Many VSDs offer auto-tuning — the motor briefly rotates at low voltage while the VSD measures resistance/inductance. Significantly improves control quality.

## Protection Functions

| Protection               | Description                                         |
| ------------------------ | --------------------------------------------------- |
| Overcurrent              | Shutdown when I > I_max                             |
| Overvoltage              | DC link too high (e.g. during regenerative braking) |
| Undervoltage             | Mains failure, supply too low                       |
| Overtemperature          | VSD internal temperature, motor thermistor (PTC)    |
| Stall protection         | Motor not rotating → overcurrent without speed      |
| Short-circuit protection | Phase short circuit at output                       |

## EMC — Electromagnetic Compatibility

VSDs generate significant **conducted and radiated interference** through PWM:

- **EMC filter** at input (line reactor + RFI filter) — often required for CE compliance
- **Motor cable shielded**, shield bonded at both ends
- **Keep motor cable short** (<50 m without du/dt filter; >50 m use du/dt filter)
- **VSD and control cables** run separately (min. 20 cm clearance)
- **Separate protective conductor** VSD → motor (green-yellow, min. same cross-section as phase)

> ⚠️ **RS-485 / Modbus near a VSD:** Ground bus cable shield at one end only, maintain physical distance — VSD interference can destroy Modbus communication.

## Typical BA Data Points (Modbus)

Most VSD manufacturers (Danfoss, ABB, Siemens, Schneider) offer Modbus RTU:

| Data point            | Type   | Typical register |
| --------------------- | ------ | ---------------- |
| Speed setpoint        | Output | Holding register |
| Actual speed          | Input  | Input register   |
| Output frequency [Hz] | Input  | Input register   |
| Output current [A]    | Input  | Input register   |
| Output power [kW]     | Input  | Input register   |
| Operating hours [h]   | Input  | Input register   |
| Status word           | Input  | Input register   |
| Fault code            | Input  | Input register   |
| Start/stop command    | Output | Holding register |

> **Status word:** Typically contains running, speed reached, fault, manual override active — important for operating status in the BMS.

## Common Faults and Diagnostics

| Fault message         | Cause                                                | Remedy                                    |
| --------------------- | ---------------------------------------------------- | ----------------------------------------- |
| Overcurrent (OC)      | Ramp too short, motor blocked, cable short           | Increase ramp time, check motor           |
| Overvoltage (OV)      | Deceleration too short (regenerative), mains spike   | Extend braking ramp, add braking resistor |
| Overtemperature (OH)  | Ventilation blocked, ambient too hot, VSD undersized | Clean, check fan, replace VSD             |
| Motor overtemperature | PTC signal: motor too hot                            | Reduce load, check cooling                |
| Mains failure (UV)    | Supply voltage too low                               | UPS? Check mains                          |
| Communication fault   | Bus connection interrupted                           | Wiring, address, termination              |

## Standards

- **IEC 61800-5-1** — VSD safety requirements
- **IEC 61800-3** — EMC requirements for drive systems
- **EN 50598** — Energy efficiency of drive systems (IE classes for drives: IES0–IES2)
