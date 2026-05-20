---
title: Signaltypen in der GA — AI, AO, DI, DO
title_en: Signal Types in BA — AI, AO, DI, DO
slug: signaltypen
category: signale
subcategory: grundlagen
tags: [ai, ao, di, do, analog-input, analog-output, digital-input, digital-output, 0-10v, 4-20ma, pwm, potentialfrei, namur, signaltyp, verdrahtung, sensoranschluss]
difficulty: grundlagen
area: [ga, elektro, hlk]
related: [frequenzumrichter, pid-regler, modbus]
norm: [IEC 60381, IEC 61131-2]
updated: 2026-05-14
lang: de
---

# Signaltypen in der GA — AI, AO, DI, DO

In der Gebäudeautomation kommunizieren Sensoren, Aktoren und DDCs über **standardisierte Signale**. Das Verständnis dieser Signaltypen ist Grundvoraussetzung für Planung, Verdrahtung und Inbetriebnahme.

## Übersicht der 4 Grundtypen

| Kürzel | Name            | Richtung          | Beispiele                                    |
|--------|-----------------|-------------------|----------------------------------------------|
| **AI** | Analog Input    | Sensor → DDC      | Temperaturfühler, Drucksensor, Feuchte       |
| **AO** | Analog Output   | DDC → Aktor       | Ventilstellantrieb, FU-Drehzahlvorgabe       |
| **DI** | Digital Input   | Sensor → DDC      | Störmeldung, Laufmeldung, Endschalter        |
| **DO** | Digital Output  | DDC → Aktor       | Pumpe Ein/Aus, Klappe Auf/Zu, Relais         |

---

## Analog Input (AI)

### 0–10 V

- Spannungssignal, 2-Draht oder 3-Draht
- **Vorteil:** Einfach, weit verbreitet
- **Nachteil:** Empfindlich auf Leitungswiderstand und EMV-Störungen (Spannungsabfall)
- **Leitungslänge:** max. ~100 m (je nach Quellwiderstand des Sensors)
- **Kabelbruch:** nicht erkennbar (0 V = Untergrenze oder Kabelbruch → unklar!)
- Typisch: Temperaturfühler mit Transmitter, Feuchte-/CO₂-Transmitter, Helligkeit

### 4–20 mA

- Stromsignal, 2-Draht (Zweidraht-Transmitter) oder 4-Draht
- **Vorteil:** Leitungswiderstand egal (Strom fliesst unabhängig), störungsresistent
- **Kabelbruch erkennbar:** 0 mA = Kabelbruch / Sensor-Fehler → Alarm möglich!
- **Leitungslänge:** bis mehrere hundert Meter
- **Empfehlung:** immer wenn Kabelbrucherkennung oder lange Leitungen nötig
- Typisch: Drucksensoren, Differenzdrucksensoren, hochwertige Transmitter

> 💡 **Merkregel:** 4–20 mA ist das professionellere Signal. 0 mA = Fehler (sicher erkennbar). 0 V bei 0–10 V kann Fehler oder echter Nullwert sein — unklar.

### Widerstandssignale (PT100 / PT1000 / NTC)

Kein Strom/Spannungssignal — direkter Widerstandsanschluss an DDC-Eingang:

| Typ    | Widerstand bei 0 °C | Typ. Einsatz                     |
|--------|---------------------|----------------------------------|
| PT100  | 100 Ω               | Industrie, Labor (genauer)       |
| PT1000 | 1000 Ω              | **GA Standard** (Raum, Kanal, Aussen) |
| NTC    | typisch 10 kΩ       | Einfache Raumfühler, Kostengünstig |

- **PT1000 hat 10× mehr Widerstandsänderung** als PT100 → weniger empfindlich auf Leitungswiderstand → besser für GA-Feldverdrahtung
- **4-Draht-Anschluss** (Kelvin) für höchste Genauigkeit (eliminiert Leitungswiderstand)
- **2-Draht** ist Standard in der GA (Fehler < 0,1 K bei typischen Leitungslängen mit PT1000)

---

## Analog Output (AO)

### 0–10 V Ausgang

- DDC gibt Spannung aus, Antrieb/FU empfängt Sollwert
- Ventilantrieb: 0 V = ganz zu, 10 V = ganz auf (oder umgekehrt — Handbuch!)
- FU: 0 V = 0 Hz, 10 V = 50 Hz (skalierbar)
- Kurzschlussfest an den meisten DDC-Ausgängen

### 4–20 mA Ausgang (seltener)

- Bei langen Leitungen oder wenn der Aktor 4–20 mA erwartet
- Benötigt oft aktiven Stromausgang an der DDC (nicht alle DDCs!)

> ⚠️ **Fail-safe Stellung:** Was macht der Antrieb wenn das Signal wegfällt (Stromausfall, Kabelbruch)? Stellantriebe haben eine parametrierbare Fail-safe-Stellung (z.B. Ventil zu bei Signalverlust). Immer projektieren und testen!

---

## Digital Input (DI)

### Potentialfreier Kontakt (Trockenkontakt)

- Einfachster DI: Relaiskontakt, Endschalter, Schwimmerschalter
- DDC speist eine Hilfsspannung ein (typisch 24 VDC), liest zurück ob Kontakt geschlossen (1) oder offen (0)
- **Kein Fremdpotenzial** anschliessen — nur den potentialfreien Kontakt!

```
DDC +24V ──── Kontakt ──── DDC DI-Eingang
```

### 24 VAC/DC-Signal

- Manche Geräte geben aktiv 24 V aus (z.B. Motorschutzschalter meldet „Störung" als 24 V-Signal)
- DDC-Eingang muss für aktive Signale geeignet sein (sink-Eingang)
- Vorsicht: AC oder DC? Polungsabhängig?

### NAMUR-Sensor (IEC 60947-5-6)

- Induktive Näherungsschalter für Ex-Bereiche
- Stromänderung: 1,2 mA (inaktiv) / 2,1 mA (aktiv)
- Braucht NAMUR-Auswerter an der DDC

### Puls / Zähler

- Wärmezähler, Wasserzähler, Windgenerator — geben Impulse aus
- DDC zählt Impulse → Volumen, Energie aus Puls-Wert berechnen
- Typisch: S0-Schnittstelle (IEC 62053-31), 1 Impuls = x kWh oder x Liter

---

## Digital Output (DO)

### Relaisausgang (potentialfrei)

- DDC schaltet internes Relais → Kontakt potentialfrei
- Anwendung: Pumpe Ein/Aus, Motorschütz ansteuern, Licht
- Max. Schaltstrom beachten (typisch 5–10 A bei 250 VAC)
- Für Motoren: immer Motorschütz dazwischen (nicht Motor direkt ans DDC-Relais!)

### 24 V-Transistorausgang (PNP/NPN)

- Für kleinere Lasten, schnelles Schalten
- PNP: schaltet +24 V durch; NPN: schaltet auf GND
- Typisch für Ventilmagnetspulen (24 VAC/DC), Signallampen

### Dreipunkt-Ausgang (3-Punkt)

- Zwei Ausgänge für Auf + Zu (z.B. Klappenantrieb oder 3-Weg-Ventil)
- Nie beide gleichzeitig aktiv → DDC-Verriegelung nötig

---

## Signalvergleich auf einen Blick

| Eigenschaft           | 0–10 V | 4–20 mA | PT1000 | Potentialfrei |
|-----------------------|--------|---------|--------|---------------|
| Kabelbrucherkennung   | ❌      | ✅       | ❌      | ❌             |
| EMV-Störfestigkeit    | Mittel | **Hoch** | Mittel | Mittel        |
| Leitungslänge         | ~100 m | >500 m  | ~100 m | >500 m        |
| Anschlussaufwand      | Gering | Mittel  | Mittel | Gering        |
| Kosten Sensor         | Gering | Mittel  | Gering | Gering        |

---

## Typische Verdrahtungsfehler

| Fehler                          | Symptom                                       | Ursache                              |
|---------------------------------|-----------------------------------------------|--------------------------------------|
| 0–10 V statt 4–20 mA parametriert | Wert immer 0 oder falsch skaliert           | Falscher Eingangstyp an DDC          |
| Kontakt an 230 V statt DDC-Hilfsspannung | DDC-Eingang zerstört              | Fremdpotenzial am DI                 |
| PT100 statt PT1000 eingebaut   | Temperatur massiv falsch (Faktor ~10)         | Falscher Fühlertyp                   |
| Schirmung beidseitig geerdet   | Brummschleife, Messwert schwankt              | Schirm nur einseitig erden!          |
| FU direkt ans DDC-Relais       | Relais brennt durch (Anlaufstrom!)            | Motorschütz zwischenschalten         |
| Fail-safe nicht projektiert    | Ventil bleibt offen bei Stromausfall          | Fail-safe-Stellung im Antrieb setzen |

## Normen

- **IEC 60381** — Analoge Signale für Prozessleittechnik
- **IEC 61131-2** — Signalpegel für SPS/DDC-Ein/Ausgänge
- **IEC 60947-5-6** — NAMUR-Sensoren
- **IEC 62053-31** — S0-Schnittstelle für Energiezähler

<!-- EN -->

In building automation, sensors, actuators and DDCs communicate via **standardised signals**. Understanding these signal types is a fundamental prerequisite for planning, wiring and commissioning.

## Overview of the 4 Basic Types

| Abbrev. | Name | Direction | Examples |
|---------|------|---------|---------|
| **AI** | Analogue Input | Sensor → DDC | Temperature sensor, pressure sensor, humidity |
| **AO** | Analogue Output | DDC → actuator | Valve actuator, VSD speed setpoint |
| **DI** | Digital Input | Sensor → DDC | Fault signal, run feedback, limit switch |
| **DO** | Digital Output | DDC → actuator | Pump on/off, damper open/close, relay |

---

## Analogue Input (AI)

### 0–10 V

- Voltage signal, 2-wire or 3-wire
- **Advantage:** Simple, widely used
- **Disadvantage:** Sensitive to cable resistance and EMC interference (voltage drop)
- **Cable length:** max. ~100 m (depending on sensor source impedance)
- **Cable break:** not detectable (0 V = lower range or cable break → ambiguous!)
- Typical: temperature sensors with transmitter, humidity/CO₂ transmitters, illuminance

### 4–20 mA

- Current signal, 2-wire (two-wire transmitter) or 4-wire
- **Advantage:** Cable resistance irrelevant (current flows independently), interference-resistant
- **Cable break detectable:** 0 mA = cable break / sensor fault → alarm possible!
- **Cable length:** up to several hundred metres
- **Recommendation:** always when cable break detection or long cable runs are needed
- Typical: pressure sensors, differential pressure sensors, high-quality transmitters

> 💡 **Rule of thumb:** 4–20 mA is the more professional signal. 0 mA = fault (clearly identifiable). 0 V with 0–10 V can be a fault or a genuine zero value — ambiguous.

### Resistance signals (PT100 / PT1000 / NTC)

Not a current/voltage signal — direct resistance connection to DDC input:

| Type | Resistance at 0 °C | Typical use |
|------|------------------|------------|
| PT100 | 100 Ω | Industry, laboratory (more accurate) |
| PT1000 | 1000 Ω | **BA standard** (room, duct, outdoor) |
| NTC | typically 10 kΩ | Simple room sensors, low cost |

- **PT1000 has 10× more resistance change** than PT100 → less sensitive to cable resistance → better for BA field wiring
- **4-wire connection** (Kelvin) for highest accuracy (eliminates cable resistance)
- **2-wire** is standard in BA (error < 0.1 K at typical cable lengths with PT1000)

---

## Analogue Output (AO)

### 0–10 V output

- DDC outputs voltage, actuator/VSD receives setpoint
- Valve actuator: 0 V = fully closed, 10 V = fully open (or reversed — check manual!)
- VSD: 0 V = 0 Hz, 10 V = 50 Hz (scalable)
- Short-circuit protected on most DDC outputs

### 4–20 mA output (less common)

- For long cable runs or when the actuator requires 4–20 mA
- Often requires an active current output at the DDC (not all DDCs support this!)

> ⚠️ **Fail-safe position:** What does the actuator do when the signal is lost (power failure, cable break)? Actuators have a configurable fail-safe position (e.g. valve closed on signal loss). Always specify and test!

---

## Digital Input (DI)

### Volt-free contact (dry contact)

- Simplest DI: relay contact, limit switch, float switch
- DDC supplies an auxiliary voltage (typically 24 VDC), reads back whether contact is closed (1) or open (0)
- **No external voltage** — connect only the volt-free contact!

```
DDC +24 V ──── Contact ──── DDC DI input
```

### 24 VAC/DC signal

- Some devices output an active 24 V signal (e.g. motor protection switch reports "fault" as a 24 V signal)
- DDC input must be suitable for active signals (sink input)
- Caution: AC or DC? Polarity-dependent?

### NAMUR sensor (IEC 60947-5-6)

- Inductive proximity switches for hazardous areas
- Current change: 1.2 mA (inactive) / 2.1 mA (active)
- Requires NAMUR evaluation unit at the DDC

### Pulse / counter

- Heat meters, water meters, wind generators — output pulses
- DDC counts pulses → calculates volume, energy from pulse value
- Typical: S0 interface (IEC 62053-31), 1 pulse = x kWh or x litres

---

## Digital Output (DO)

### Relay output (volt-free)

- DDC switches internal relay → volt-free contact
- Application: pump on/off, motor contactor control, lighting
- Observe max. switching current (typically 5–10 A at 250 VAC)
- For motors: always use a motor contactor in between (do not connect motor directly to DDC relay!)

### 24 V transistor output (PNP/NPN)

- For smaller loads, fast switching
- PNP: switches +24 V through; NPN: switches to GND
- Typical for valve solenoids (24 VAC/DC), signal lamps

### Three-position output (3-point)

- Two outputs for open + close (e.g. damper actuator or 3-way valve)
- Never activate both simultaneously → DDC interlock required

---

## Signal Comparison at a Glance

| Property | 0–10 V | 4–20 mA | PT1000 | Volt-free |
|---------|--------|---------|--------|----------|
| Cable break detection | ❌ | ✅ | ❌ | ❌ |
| EMC immunity | Medium | **High** | Medium | Medium |
| Cable length | ~100 m | >500 m | ~100 m | >500 m |
| Wiring effort | Low | Medium | Medium | Low |
| Sensor cost | Low | Medium | Low | Low |

---

## Typical Wiring Errors

| Error | Symptom | Cause |
|-------|---------|-------|
| 0–10 V configured instead of 4–20 mA | Value always 0 or wrong scaling | Wrong input type at DDC |
| Contact connected to 230 V instead of DDC auxiliary voltage | DDC input destroyed | External voltage on DI |
| PT100 installed instead of PT1000 | Temperature massively wrong (factor ~10) | Wrong sensor type |
| Shield earthed at both ends | Hum loop, measured value fluctuates | Earth shield at one end only! |
| VSD connected directly to DDC relay | Relay burns out (inrush current!) | Insert motor contactor |
| Fail-safe not configured | Valve stays open on power failure | Set fail-safe position in actuator |

## Standards

- **IEC 60381** — Analogue signals for process control
- **IEC 61131-2** — Signal levels for PLC/DDC inputs and outputs
- **IEC 60947-5-6** — NAMUR sensors
- **IEC 62053-31** — S0 interface for energy meters
