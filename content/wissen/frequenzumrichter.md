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
related: [pid-regler, modbus, bacnet, profibus, can-bus, drehstrom]
norm: [IEC 61800-3, IEC 61800-5-1, EN IEC 61800-9-2]
updated: 2026-10-14
lang: de
---

# Frequenzumrichter (FU) in der HLK

Ein **Frequenzumrichter** (FU, auch VFD / Variable Frequency Drive) regelt die Drehzahl eines Drehstrommotors durch Veränderung von Frequenz und Spannung. In HLK-Anlagen an Pumpen und Ventilatoren eingesetzt, spart er erheblich Energie.

## Wirkprinzip

| Stufe              | Was passiert                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| **Gleichrichter**  | richtet die Netzspannung, 3 × 400 V, 50 Hz, gleich                                                        |
| **Zwischenkreis**  | Kondensatoren glätten, rund 540 V Gleichspannung                                                          |
| **Wechselrichter** | IGBT schalten im kHz-Takt und bilden per PWM eine Wechselspannung mit einstellbarer Frequenz und Spannung |
| **Motor**          | dreht mit der Frequenz, die der Umrichter vorgibt                                                         |

Der Wechselrichter erzeugt durch **Pulsweitenmodulation (PWM)** eine quasi-sinusförmige Ausgangsspannung mit einstellbarer Frequenz (in der HLK meist 20 bis 50 Hz; über 50 Hz nur, wenn Motor und Ventilator dafür ausgelegt sind).

## Affinitätsgesetze (Ähnlichkeitsgesetze)

Für Kreiselpumpen und Ventilatoren gelten die Ähnlichkeitsgesetze:

| Grösse       | Relation   | Bedeutung                                |
| ------------ | ---------- | ---------------------------------------- |
| Volumenstrom | V̇ ~ n      | Halbierung Drehzahl → halber Durchfluss  |
| Förderhöhe   | H ~ n²     | Halbierung Drehzahl → Viertel Förderhöhe |
| **Leistung** | **P ~ n³** | **Halbierung Drehzahl → 1/8 Leistung!**  |

> 💡 **Praxisbeispiel:** Ventilator bei 100 % Drehzahl: 7,5 kW. Bei 75 % Drehzahl: 7,5 × 0,75³ = **3,2 kW**. Energieeinsparung: 57 %!

Das macht FU-Regelung bei Ventilatoren und Pumpen so wirkungsvoll. **Aber:** Die dritte Potenz gilt nur, wenn die Anlagenkennlinie durch null geht. Wird auf konstanten Druck geregelt, etwa Kanaldruck oder Differenzdruck im Netz, sinkt die Förderhöhe nicht mit, und die Einsparung ist deutlich kleiner. Dazu kommen die Verluste von Motor und Umrichter bei Teillast.

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

1. Der Drucksensor, 4–20 mA, hängt am Analogeingang des Umrichters.
2. Der Sollwert, zum Beispiel 80 kPa Differenzdruck, ist als Parameter gesetzt oder kommt über den Bus.
3. Der Umrichter regelt die Drehzahl selbst, bis Ist- und Sollwert übereinstimmen.

### Motorsteuerungs-Varianten (U/f vs. Feldorientiert)

| Verfahren                     | Beschreibung                                                  | Einsatz                       |
| ----------------------------- | ------------------------------------------------------------- | ----------------------------- |
| **U/f (linear)**              | Spannung proportional zur Frequenz                            | Pumpen, Ventilatoren          |
| **U/f (quadratisch)**         | Spannung bei Teillast abgesenkt, passend zu Lasten mit M ~ n² | Ventilatoren, hohe Einsparung |
| **Sensorlose Vektorregelung** | Rechenmodell für Motor-Fluss                                  | Präzisere Drehmomentregelung  |
| **Closed-Loop-Vektor**        | Mit Encoder-Rückführung                                       | Aufzüge, Präzisionsantriebe   |

Für Asynchronmotoren an Pumpen und Ventilatoren reicht **U/f** meist aus. **Permanentmagnetmotoren** (PM, oft IE4 oder IE5) brauchen dagegen eine Vektorregelung; der Umrichter muss den Motortyp unterstützen.

## Wichtige Parametrierungsschritte

1. **Motordaten eingeben:** Nennspannung, Nennstrom, Nennfrequenz, cos φ, Polzahl
2. **Minimal-/Maximalfrequenz** festlegen (z.B. 15–50 Hz)
3. **Rampenzeiten** (Hochlauf / Auslauf): 5–30 s typisch — zu schnell → Überstrom / Störung
4. **PID-Parameter** einstellen falls integrierter Regler genutzt
5. **Busadresse** (Modbus Slave-ID, BACnet MS/TP MAC)
6. **Kommunikationsparameter** (Baudrate, Parität)
7. **Fehlerverhalten** (Auto-Reset, Fehleranzahl, Reaktionszeit)

> ⚠️ **Motordaten-Autotuning:** Viele FU bieten Autotuning an — meist im Stillstand, der Umrichter misst Widerstand und Induktivität des Motors. Das verbessert Regelung und Wirkungsgrad, vor allem bei Vektorregelung.

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

- **EMV-Filter** am Eingang, je nach Umgebung nach IEC 61800-3 Kategorie C1 oder C2. In Wohn- und Bürogebäuden ist C1 oder C2 nötig, das ist bei den meisten HLK-Umrichtern eingebaut
- **Motorleitung geschirmt**, Schirm beidseitig aufgelegt
- **Motorleitung kurz halten.** Bis zu welcher Länge die EMV-Kategorie eingehalten wird, steht in der Herstellerangabe, oft 25 bis 50 m. Darüber du/dt- oder Sinusfilter
- **FU und Steuerungsleitungen** getrennt führen (mind. 20 cm Abstand)
- **Separater Schutzleiter** FU → Motor (grün-gelb, mind. Querschnitt Aussenleiter)

> ⚠️ **RS-485 / Modbus neben FU:** Busleitung getrennt von Motorleitungen führen und den Schirm nach Herstellerangabe auflegen, bei Umrichtern meist beidseitig und mit gutem Potenzialausgleich. Sonst stören die Umrichter die Kommunikation. Siehe [Schirmung und Erdung](/wissen/schirmung-erdung).

> ⚠️ **Fehlerstromschutz:** Umrichter erzeugen glatte Gleichfehlerströme. Ein RCD Typ A kann dadurch blind werden. Wo ein RCD nötig ist, braucht es bei dreiphasigen Umrichtern **Typ B**. Typ F ist nur für einphasige Umrichter gedacht.

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
- **EN IEC 61800-9-2** — Energieeffizienz von Antriebssystemen, IE-Klassen für Umrichter (IE0–IE2) und für Antriebssysteme (IES0–IES2); ersetzt EN 50598-2
- **VO (EU) 2019/1781** — Ökodesign für Motoren und Umrichter, Umrichter mindestens IE2

<!-- EN -->

A **variable speed drive** (VSD, also VFD / Variable Frequency Drive) controls the speed of a three-phase motor by varying frequency and voltage. Used in HVAC installations on pumps and fans, it delivers significant energy savings.

## Operating Principle

| Stage         | What happens                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------ |
| **Rectifier** | rectifies the mains voltage, 3 × 400 V, 50 Hz                                                    |
| **DC link**   | capacitors smooth it, about 540 V DC                                                             |
| **Inverter**  | IGBTs switch at kHz rate and use PWM to form an AC voltage with adjustable frequency and voltage |
| **Motor**     | turns at the frequency set by the converter                                                      |

The inverter uses **pulse width modulation (PWM)** to generate a quasi-sinusoidal output voltage with adjustable frequency (in HVAC usually 20 to 50 Hz; above 50 Hz only if motor and fan are designed for it).

## Affinity Laws (Similarity Laws)

For centrifugal pumps and fans the affinity laws apply:

| Quantity  | Relationship | Meaning                        |
| --------- | ------------ | ------------------------------ |
| Flow rate | Q̇ ~ n        | Halving speed → half flow      |
| Head      | H ~ n²       | Halving speed → quarter head   |
| **Power** | **P ~ n³**   | **Halving speed → 1/8 power!** |

> 💡 **Practical example:** Fan at 100% speed: 7.5 kW. At 75% speed: 7.5 × 0.75³ = **3.2 kW**. Energy saving: 57%!

This is what makes VSD control so effective for fans and pumps. **However,** the cube law only holds if the system curve passes through zero. If the drive controls to a constant pressure, such as duct pressure or network differential pressure, the head does not fall with speed and the saving is much smaller. On top come the losses of motor and drive at part load.

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

1. The pressure sensor, 4–20 mA, is connected to the analogue input of the drive.
2. The setpoint, for example 80 kPa differential pressure, is set as a parameter or comes via the bus.
3. The drive controls the speed itself until actual and setpoint agree.

### Motor Control Variants (V/f vs. Field-Oriented)

| Method                 | Description                                           | Application                 |
| ---------------------- | ----------------------------------------------------- | --------------------------- |
| **V/f (linear)**       | Voltage proportional to frequency                     | Pumps, fans                 |
| **V/f (quadratic)**    | voltage reduced at part load, suits loads with T ~ n² | Fans, high savings          |
| **Sensorless vector**  | Computational model for motor flux                    | More precise torque control |
| **Closed-loop vector** | With encoder feedback                                 | Lifts, precision drives     |

For induction motors on pumps and fans **V/f** is usually enough. **Permanent magnet motors** (PM, often IE4 or IE5), on the other hand, need vector control; the drive must support the motor type.

## Key Commissioning Steps

1. **Enter motor data:** rated voltage, rated current, rated frequency, cos φ, pole count
2. **Set min./max. frequency** (e.g. 15–50 Hz)
3. **Ramp times** (acceleration / deceleration): 5–30 s typical — too fast → overcurrent / fault
4. **PID parameters** if integrated controller is used
5. **Bus address** (Modbus slave ID, BACnet MS/TP MAC)
6. **Communication parameters** (baud rate, parity)
7. **Fault behaviour** (auto-reset, fault count, response time)

> ⚠️ **Motor data auto-tuning:** Many VSDs offer auto-tuning — usually at standstill, the drive measures resistance and inductance of the motor. This improves control and efficiency, especially with vector control.

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

- **EMC filter** at the input, depending on the environment per IEC 61800-3 category C1 or C2. Residential and office buildings need C1 or C2, which is built into most HVAC drives
- **Motor cable shielded**, shield bonded at both ends
- **Keep the motor cable short.** The length up to which the EMC category is met is in the manufacturer data, often 25 to 50 m. Beyond that use a du/dt or sine filter
- **VSD and control cables** run separately (min. 20 cm clearance)
- **Separate protective conductor** VSD → motor (green-yellow, min. same cross-section as phase)

> ⚠️ **RS-485 / Modbus near a VSD:** route the bus cable separately from motor cables and terminate the shield as the manufacturer specifies, with drives usually at both ends and with good equipotential bonding. Otherwise the drives disturb communication. See [Shielding and Earthing](/wissen/schirmung-erdung).

> ⚠️ **Residual current protection:** drives produce smooth DC fault currents. A type A RCD can be blinded by them. Where an RCD is required, three-phase drives need **type B**. Type F is only intended for single-phase drives.

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
- **EN IEC 61800-9-2** — Energy efficiency of drive systems, IE classes for converters (IE0–IE2) and power drive systems (IES0–IES2); replaces EN 50598-2
- **Regulation (EU) 2019/1781** — Ecodesign for motors and drives, drives at least IE2
