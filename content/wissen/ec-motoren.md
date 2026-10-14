---
title: EC-Motoren — Elektronisch kommutierte Motoren
title_en: EC Motors — Electronically Commutated Motors
slug: ec-motoren
category: antriebe
subcategory: motoren
tags:
  [
    ec-motor,
    bldc,
    bürstenlos,
    elektronisch-kommutiert,
    wirkungsgrad,
    pwm,
    modbus,
    0-10v,
    ventilator,
    pumpe,
    ie-klasse,
    ie4,
    ie5,
    frequenzumrichter,
    ac-motor,
    vergleich
  ]
difficulty: fortgeschritten
area: [hlk, ga, elektro]
related: [frequenzumrichter, vav-cav, rlt-anlage, pid-regler, signaltypen]
norm: [IEC 60034-30-1, IEC TS 60034-30-2, VO (EU) 2019/1781]
updated: 2026-10-14
lang: de
---

# EC-Motoren — Elektronisch kommutierte Motoren

**EC-Motoren** (Electronically Commutated Motor, auch BLDC = Brushless DC) sind die moderne Alternative zu klassischen AC-Induktionsmotoren. In der Gebäudeautomation zunehmend Standard für Ventilatoren, Pumpen und Kompressoren — wegen deutlich höherem Wirkungsgrad und einfacher Regelbarkeit.

## Funktionsprinzip

### AC-Induktionsmotor (klassisch)

- Dreiphasen-Wechselstrom erzeugt drehendes Magnetfeld
- Rotor (Kurzschlussläufer) folgt dem Feld durch Induktion
- Schlupf nötig für Drehmoment → Wärmeverluste
- Drehzahlregelung nur über Frequenzumrichter (extern)

### EC-Motor (modern)

- Permanentmagnet-Rotor (kein Schlupf nötig!)
- Stator wird elektronisch (Transistoren, meist MOSFET) mit Gleichstrom gespeist
- Elektronik erkennt die Rotorposition, mit Hall-Sensoren oder sensorlos aus der Gegenspannung, und kommutiert passend
- **Drehzahlregelung integriert** in der Motor-Elektronik

Die Elektronik im Motor richtet die Netzspannung gleich und schaltet die Statorwicklungen passend zur Rotorstellung. Sie ist also Umrichter und Motorsteuerung in einem.

---

## Wirkungsgrad-Vergleich

IE = International Efficiency Class (IEC 60034-30-1):

| Klasse | Bezeichnung     | Typischer Wirkungsgrad | Technologie                 |
| ------ | --------------- | ---------------------- | --------------------------- |
| IE1    | Standard        | 85–88 %                | Alter AC-Motor              |
| IE2    | High Efficiency | 88–91 %                | Standard heute              |
| IE3    | Premium         | 91–93 %                | Verbesserte AC-Motoren      |
| IE4    | Super Premium   | 93–95 %                | EC-Motor oder IE4-AC mit FU |
| IE5    | Ultra Premium   | 95–97 %                | Beste EC-Motoren            |

**Ökodesign VO (EU) 2019/1781:** Seit Juli 2021 müssen Drehstrommotoren von 0.75 bis 1000 kW mindestens IE3 erreichen, von 0.12 bis 0.75 kW IE2. Seit Juli 2023 gilt für 75 bis 200 kW IE4. Die Schweiz hat die Anforderungen in der Energieeffizienzverordnung übernommen. IE5 ist in IEC TS 60034-30-2 für umrichtergespeiste Motoren definiert.

### Teillast

## Bei Teillast ist der Vorteil oft grösser als bei Nennlast, weil der Wirkungsgrad kleiner Asynchronmotoren bei Teillast stärker sinkt als der von Permanentmagnetmotoren. Wie gross der Unterschied ist, hängt von Baugrösse und Betriebspunkt ab. Für einen Vergleich die Systemwirkungsgrade aus den Herstellerdaten im tatsächlichen Betriebspunkt vergleichen, nicht die Nennwerte.

## Regelung / Schnittstellen

Der grosse Vorteil gegenüber klassischem AC-Motor + FU: EC-Motor hat Regelung **integriert**:

### Analoge Schnittstellen

| Signal      | Beschreibung                                       |
| ----------- | -------------------------------------------------- |
| **0–10 V**  | Drehzahlvorgabe 0–100 % (Eingang)                  |
| **4–20 mA** | Wie 0–10 V, störungsresistenter                    |
| **PWM**     | Pulsweitenmodulation (typisch 10 V, 100 Hz–10 kHz) |

### Digitale Schnittstellen

| Protokoll           | Vorteil                               |
| ------------------- | ------------------------------------- |
| **Modbus RTU**      | Drehzahl, Leistung, Stunden auslesbar |
| **0–10 V + Modbus** | Kombination für Soll + Diagnose       |
| **KNX**             | In Gebäude-HLK-Geräten                |
| **CANopen**         | Industriebereich                      |

### Rückmeldung

EC-Motoren liefern typisch:

- Drehzahl-Ist (U/min oder %)
- Leistungsaufnahme (W)
- Motortemperatur
- Betriebsstunden
- Fehlerstatus

---

## Vergleich EC-Motor vs. AC-Motor + FU

| Merkmal          | EC-Motor                                               | AC-Motor + Frequenzumrichter                      |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------- |
| Wirkungsgrad     | IE4–IE5 (93–97 %)                                      | IE2–IE3 (88–93 %)                                 |
| Kosten Motor     | Höher                                                  | Günstiger                                         |
| Kosten gesamt    | Meist günstiger                                        | Motor + FU = teurer                               |
| Platzbedarf      | Kompakt                                                | FU zusätzlich                                     |
| EMV              | Elektronik im Motor erzeugt ebenfalls Oberschwingungen | FU erzeugt Oberschwingungen, Filter je nach Gerät |
| Wartung          | bürstenlos, Lager als Verschleissteil                  | ebenfalls bürstenlos, Lager als Verschleissteil   |
| Anlaufstrom      | gering, elektronisch begrenzt                          | gering, der FU fährt über eine Rampe hoch         |
| Leistungsbereich | vor allem bis etwa 10–15 kW                            | ab wenigen kW bis in den MW-Bereich               |

**Fazit:** Für Ventilatoren und kleine Pumpen bis etwa 10 kW ist der EC-Motor meist die wirtschaftlichere Lösung. Bei grösseren Leistungen sind Asynchron- oder PM-Motoren mit separatem FU üblich.

---

## Typische GA-Anwendungen

| Anwendung          | Leistungsbereich | Schnittstelle      |
| ------------------ | ---------------- | ------------------ |
| RLT-Ventilator     | 0.1–30 kW        | 0–10 V, Modbus     |
| Fan-Coil Lüfter    | 20–500 W         | 0–10 V, PWM        |
| Heizungspumpe      | 50–2000 W        | 0–10 V, Modbus     |
| Kühldecken-Pumpe   | 50–500 W         | 0–10 V             |
| Kompressor (WP/KM) | 1–100 kW         | Modbus, proprietär |

---

## Häufige Fehler

| Fehler                          | Symptom                    | Ursache                                                        |
| ------------------------------- | -------------------------- | -------------------------------------------------------------- |
| 0–10 V Masseanbindung fehlt     | Motor dreht nicht/zufällig | Signal-GND nicht verbunden                                     |
| EMV-Störungen auf 0–10 V        | Drehzahl schwankt          | Kabel zu lang, keine Abschirmung                               |
| Falsches Protokoll konfiguriert | Modbus Kommunikation fehlt | Baudrate / Adresse falsch                                      |
| Überhitzung (schlechte Kühlung) | Motor schaltet ab          | Motorgehäuse freie Luftzirkulation                             |
| FI löst ohne Fehler aus         | Fehlauslösung              | Ableitströme der Elektronik, Summe mehrerer Geräte an einem FI |

> ⚠️ Die Elektronik erzeugt Ableitströme, und im Fehlerfall können Gleichfehlerströme auftreten. Bei dreiphasigen EC-Motoren braucht es einen RCD **Typ B**, bei einphasigen meist Typ F oder A nach Herstellerangabe.

## Normen

- **IEC 60034-30-1** — Wirkungsgradklassen IE1–IE4 für netzgespeiste Motoren
- **IEC TS 60034-30-2** — Wirkungsgradklassen bis IE5 für umrichtergespeiste Motoren
- **VO (EU) 2019/1781** — Ökodesign für Elektromotoren und FU
- **EN IEC 61800-9-2** — Energieeffizienz von Antriebssystemen

<!-- EN -->

**EC motors** (Electronically Commutated Motor, also BLDC = Brushless DC) are the modern alternative to classical AC induction motors. Increasingly the standard in building automation for fans, pumps, and compressors — due to significantly higher efficiency and simple speed control.

## Operating Principle

### AC Induction Motor (Classical)

- Three-phase AC creates a rotating magnetic field
- Rotor (squirrel cage) follows the field by induction
- Slip required for torque → heat losses
- Speed control only via external variable speed drive

### EC Motor (Modern)

- Permanent magnet rotor (no slip required!)
- Stator is electronically energised (transistors, usually MOSFETs) with DC
- Electronics detect the rotor position, with Hall sensors or sensorless from the back EMF, and commutate accordingly
- **Speed control integrated** in the motor electronics

The electronics in the motor rectify the mains voltage and switch the stator windings to match the rotor position. They are drive and motor control in one.

---

## Efficiency Comparison

IE = International Efficiency Class (IEC 60034-30-1):

| Class | Designation     | Typical efficiency | Technology                  |
| ----- | --------------- | ------------------ | --------------------------- |
| IE1   | Standard        | 85–88%             | Old AC motor                |
| IE2   | High efficiency | 88–91%             | Current standard            |
| IE3   | Premium         | 91–93%             | Improved AC motors          |
| IE4   | Super premium   | 93–95%             | EC motor or IE4 AC with VFD |
| IE5   | Ultra premium   | 95–97%             | Best EC motors              |

**Ecodesign Regulation (EU) 2019/1781:** since July 2021 three-phase motors from 0.75 to 1000 kW must reach at least IE3, from 0.12 to 0.75 kW IE2. Since July 2023 IE4 applies from 75 to 200 kW. Switzerland has adopted the requirements in its Energy Efficiency Ordinance. IE5 is defined in IEC TS 60034-30-2 for converter-fed motors.

### Part Load

## At part load the advantage is often larger than at rated load, because the efficiency of small induction motors drops more at part load than that of permanent magnet motors. How large the difference is depends on size and operating point. For a comparison, compare system efficiencies from manufacturer data at the actual operating point, not rated values.

## Control / Interfaces

The major advantage over a classical AC motor + VFD: the EC motor has control **integrated**:

### Analogue Interfaces

| Signal      | Description                                            |
| ----------- | ------------------------------------------------------ |
| **0–10 V**  | Speed setpoint 0–100% (input)                          |
| **4–20 mA** | Same as 0–10 V, more noise immune                      |
| **PWM**     | Pulse width modulation (typically 10 V, 100 Hz–10 kHz) |

### Digital Interfaces

| Protocol            | Advantage                              |
| ------------------- | -------------------------------------- |
| **Modbus RTU**      | Speed, power, hours readable           |
| **0–10 V + Modbus** | Combination for setpoint + diagnostics |
| **KNX**             | In building HVAC devices               |
| **CANopen**         | Industrial applications                |

### Feedback

EC motors typically provide:

- Actual speed (rpm or %)
- Power consumption (W)
- Motor temperature
- Operating hours
- Fault status

---

## EC Motor vs. AC Motor + VFD

| Feature           | EC motor                                        | AC motor + variable speed drive                       |
| ----------------- | ----------------------------------------------- | ----------------------------------------------------- |
| Efficiency        | IE4–IE5 (93–97%)                                | IE2–IE3 (88–93%)                                      |
| Motor cost        | Higher                                          | Lower                                                 |
| Total cost        | Usually lower                                   | Motor + VFD = more expensive                          |
| Space requirement | Compact                                         | VFD additional                                        |
| EMC               | electronics in the motor also produce harmonics | drive produces harmonics, filters depending on device |
| Maintenance       | brushless, bearings wear                        | also brushless, bearings wear                         |
| Starting current  | low, electronically limited                     | low, the drive ramps up                               |
| Power range       | mainly up to about 10–15 kW                     | from a few kW up to MW                                |

**Conclusion:** for fans and small pumps up to about 10 kW the EC motor is usually the more economical solution. At higher power, induction or PM motors with a separate drive are usual.

---

## Typical BA Applications

| Application                      | Power range | Interface           |
| -------------------------------- | ----------- | ------------------- |
| AHU fan                          | 0.1–30 kW   | 0–10 V, Modbus      |
| Fan-coil unit fan                | 20–500 W    | 0–10 V, PWM         |
| Heating pump                     | 50–2,000 W  | 0–10 V, Modbus      |
| Chilled ceiling pump             | 50–500 W    | 0–10 V              |
| Compressor (heat pump / chiller) | 1–100 kW    | Modbus, proprietary |

---

## Common Faults

| Fault                            | Symptom                           | Cause                                                                  |
| -------------------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| 0–10 V ground connection missing | Motor doesn't run / runs randomly | Signal GND not connected                                               |
| EMC interference on 0–10 V       | Speed fluctuates                  | Cable too long, no shielding                                           |
| Wrong protocol configured        | Modbus communication absent       | Wrong baud rate / address                                              |
| Overheating (poor cooling)       | Motor shuts down                  | Motor housing needs free air circulation                               |
| RCD trips without a fault        | nuisance tripping                 | leakage currents of the electronics, sum of several devices on one RCD |

> ⚠️ The electronics produce leakage currents, and DC fault currents can occur on a fault. Three-phase EC motors need a **type B** RCD, single-phase ones usually type F or A as specified by the manufacturer.

## Standards

- **IEC 60034-30-1** — Efficiency classes IE1–IE4 for line-operated motors
- **IEC TS 60034-30-2** — Efficiency classes up to IE5 for converter-fed motors
- **Regulation (EU) 2019/1781** — Ecodesign for electric motors and drives
- **EN IEC 61800-9-2** — Energy efficiency of drive systems
