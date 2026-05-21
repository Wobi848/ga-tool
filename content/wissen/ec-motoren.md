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
norm: [IEC 60034-30-1, ErP 2019/1781]
updated: 2026-05-14
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
- Elektronik erkennt Rotorposition (Hall-Sensoren) → kommutiert richtig
- **Drehzahlregelung integriert** in der Motor-Elektronik

```
Netz 230V AC → [Motor-Elektronik: Gleichrichter + Wechselrichter] → Motor (DC-artiger Betrieb)
```

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

**Pflichtanforderung EU (ErP 2021):** Motoren 0.75–1000 kW müssen IE3 entsprechen. EC-Motoren übertreffen IE3 deutlich.

### Praxisbeispiel Ventilator

| Antriebstyp           | Leistungsaufnahme bei 50 % Last |
| --------------------- | ------------------------------- |
| AC + FU (IE2)         | ~35 % der Nennleistung          |
| EC-Motor (integriert) | ~20–25 % der Nennleistung       |
| Ersparnis             | ~30–40 %                        |

---

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

| Merkmal                     | EC-Motor                       | AC-Motor + Frequenzumrichter  |
| --------------------------- | ------------------------------ | ----------------------------- |
| Wirkungsgrad                | IE4–IE5 (93–97 %)              | IE2–IE3 (88–93 %)             |
| Kosten Motor                | Höher                          | Günstiger                     |
| Kosten gesamt               | Meist günstiger                | Motor + FU = teurer           |
| Platzbedarf                 | Kompakt                        | FU zusätzlich                 |
| EMV                         | Motor-intern                   | FU erzeugt Oberwellen         |
| Wartung                     | Kein Bürstenverschleiss        | Bürstenloser Rotor            |
| Anlaufstrom                 | Gering (elektronisch geregelt) | Hoch (ohne Sanftanlauf)       |
| Eignung für grosse Leistung | Bis ~30 kW                     | Ab 5 kW oft günstiger (AC+FU) |

**Fazit:** Für Ventilatoren und kleine Pumpen (< 10 kW) ist EC-Motor die wirtschaftlichere Lösung. Für grosse Pumpen (> 15 kW) kann AC-Motor + FU noch wettbewerbsfähig sein.

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

| Fehler                          | Symptom                    | Ursache                                         |
| ------------------------------- | -------------------------- | ----------------------------------------------- |
| 0–10 V Masseanbindung fehlt     | Motor dreht nicht/zufällig | Signal-GND nicht verbunden                      |
| EMV-Störungen auf 0–10 V        | Drehzahl schwankt          | Kabel zu lang, keine Abschirmung                |
| Falsches Protokoll konfiguriert | Modbus Kommunikation fehlt | Baudrate / Adresse falsch                       |
| Überhitzung (schlechte Kühlung) | Motor schaltet ab          | Motorgehäuse freie Luftzirkulation              |
| Kurzschluss PE-Leiter           | FI löst aus                | EC-Motoren erzeugen Ableitströme → FI-Selektion |

> ⚠️ EC-Motoren können durch ihre Elektronik hohe Ableitströme erzeugen. FI-Schutzschalter (RCD) müssen für diese Anwendung geeignet sein (Typ B oder F für DC-Komponenten).

## Normen

- **IEC 60034-30-1** — Wirkungsgradklassen IE1–IE4 für Elektromotoren
- **ErP 2019/1781** (EU) — Ecodesign Anforderungen Elektromotoren und FU (IE3-Pflicht)
- **EN 50598** — Energieeffizienz Antriebssysteme

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
- Electronics detect rotor position (Hall sensors) → correct commutation
- **Speed control integrated** in the motor electronics

```
Mains 230 V AC → [Motor electronics: rectifier + inverter] → Motor (DC-like operation)
```

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

**EU mandatory requirement (ErP 2021):** Motors 0.75–1,000 kW must meet IE3. EC motors significantly exceed IE3.

### Practical Example: Fan

| Drive type            | Power consumption at 50% load |
| --------------------- | ----------------------------- |
| AC + VFD (IE2)        | ~35% of rated power           |
| EC motor (integrated) | ~20–25% of rated power        |
| Savings               | ~30–40%                       |

---

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

| Feature                    | EC motor                        | AC motor + variable speed drive  |
| -------------------------- | ------------------------------- | -------------------------------- |
| Efficiency                 | IE4–IE5 (93–97%)                | IE2–IE3 (88–93%)                 |
| Motor cost                 | Higher                          | Lower                            |
| Total cost                 | Usually lower                   | Motor + VFD = more expensive     |
| Space requirement          | Compact                         | VFD additional                   |
| EMC                        | Internal to motor               | VFD generates harmonics          |
| Maintenance                | No brush wear                   | Brushless rotor                  |
| Starting current           | Low (electronically controlled) | High (without soft starter)      |
| Suitability for high power | Up to ~30 kW                    | AC+VFD often cheaper above 15 kW |

**Conclusion:** For fans and small pumps (< 10 kW), the EC motor is the more cost-effective solution. For large pumps (> 15 kW), AC motor + VFD may still be competitive.

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

| Fault                            | Symptom                           | Cause                                               |
| -------------------------------- | --------------------------------- | --------------------------------------------------- |
| 0–10 V ground connection missing | Motor doesn't run / runs randomly | Signal GND not connected                            |
| EMC interference on 0–10 V       | Speed fluctuates                  | Cable too long, no shielding                        |
| Wrong protocol configured        | Modbus communication absent       | Wrong baud rate / address                           |
| Overheating (poor cooling)       | Motor shuts down                  | Motor housing needs free air circulation            |
| Short circuit to PE conductor    | RCD trips                         | EC motors generate leakage currents → RCD selection |

> ⚠️ EC motors can generate significant leakage currents due to their electronics. Residual current devices (RCDs) must be suitable for this application (Type B or F for DC components).

## Standards

- **IEC 60034-30-1** — Efficiency classes IE1–IE4 for electric motors
- **ErP 2019/1781** (EU) — Ecodesign requirements for electric motors and VFDs (IE3 mandatory)
- **EN 50598** — Energy efficiency of drive systems
