---
title: Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ
title_en: Electrical Energy Measurement — Active Power, Reactive Power, cos φ
slug: energiemessung
category: energie
subcategory: grundlagen
tags:
  [
    wirkleistung,
    blindleistung,
    scheinleistung,
    cos-phi,
    leistungsfaktor,
    kwh,
    kvar,
    kva,
    energiezähler,
    mbus,
    modbus,
    oberwellen,
    thd,
    powerfactor,
    q,
    p,
    s
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, waermemengenzaehler, mbus]
norm: [IEC 62053, EN 50160, IEC 61000-4-30]
updated: 2026-10-14
lang: de
---

# Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ

Elektrische Energiemessung in der GA liefert die Daten für EMS, ISO 50001 und Abrechnung. Das Verständnis von Wirk-, Blind- und Scheinleistung ist Grundlage für korrekte Messung und Bewertung.

## Die drei Leistungsarten

### Wirkleistung P [W, kW]

**Nutzbare Leistung** — die tatsächlich verbrauchte Energie:

<p class="formel">P = U · I · cos φ &nbsp; [W]</p>

Das gilt für einphasige, sinusförmige Grössen. Bei Drehstrom: P = √3 · U · I · cos φ mit der Aussenleiterspannung U.

- Heizt, dreht Motoren, leuchtet
- Vom Energieversorger abgerechnet
- Einheit: Watt (W), Kilowatt (kW)

### Blindleistung Q [var, kvar]

**Pendelt zwischen Generator und Last** — nötig für Magnetfelder (Motoren, Transformatoren), macht keine Nutzarbeit:

<p class="formel">Q = U · I · sin φ &nbsp; [var]</p>

- Belastet das Netz (Leitungen, Transformatoren)
- Wird vom Energieversorger oft separat verrechnet (Q-Tarif)
- Kapazitive Last (Kondensatoren): kompensiert Blindleistung

### Scheinleistung S [VA, kVA]

**Geometrische Summe** von Wirk- und Blindleistung:

<p class="formel">S = U · I = √(P² + Q²) &nbsp; [VA]</p>

- Bestimmt die Auslegung von Transformatoren, Kabeln, Sicherungen
- Einheit: Volt-Ampere (VA), Kilovolt-Ampere (kVA)

---

## Leistungsdreieck

<figure class="schema"><svg viewBox="0 0 470 190" role="img" aria-label="Leistungsdreieck mit Wirkleistung P, Blindleistung Q, Scheinleistung S und Winkel φ" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 160L290 160L290 35Z" stroke-width="2"/><path d="M278 160L278 148L290 148" stroke-width="1"/><path d="M66 160A46 46 0 0 0 61.7 140.7" stroke-width="1.2"/><g fill="currentColor" stroke="none"><text x="76" y="152" text-anchor="start" font-size="13" font-style="italic">φ</text><text x="155.0" y="180" text-anchor="middle" font-size="12" font-weight="600">Wirkleistung P (kW)</text><text x="300" y="101.5" text-anchor="start" font-size="12" font-weight="600">Blindleistung Q (kvar)</text><text x="105.0" y="65.5" text-anchor="middle" font-size="12" font-weight="600">Scheinleistung S (kVA)</text></g></svg><figcaption>Leistungsdreieck: cos φ = P / S, sin φ = Q / S, tan φ = Q / P.</figcaption></figure>

---

## Leistungsfaktor cos φ

Der **Leistungsfaktor** (auch λ oder PF = Power Factor) gibt an wie effizient Strom genutzt wird:

| cos φ | Bedeutung                                    |
| ----- | -------------------------------------------- | -------------------------------------------------------------------- |
| cos φ | Blindleistung im Verhältnis zur Wirkleistung | Bedeutung                                                            |
| ----- | -------------------------------------------- | -------------------------------------------                          |
| 1.0   | 0 %                                          | ideal, nur Wirkleistung                                              |
| 0.95  | rund 33 %                                    | gut                                                                  |
| 0.9   | rund 48 %                                    | häufige Grenze; darunter verrechnen viele Netzbetreiber Blindenergie |
| 0.8   | 75 %                                         | schlecht, Kompensation prüfen                                        |

**Praxiswerte:**

- Glühlampe: cos φ = 1.0
- Asynchronmotor (Vollast): cos φ = 0.85–0.95
- Asynchronmotor (Leerlauf): cos φ = 0.2–0.4 (schlecht!)
- FU + Motor: cos φ am FU-Eingang nahe 1, weil der Gleichrichter kaum Blindleistung zieht. Der **Leistungsfaktor λ** ist aber wegen der Oberschwingungen deutlich tiefer, ohne Drossel oft 0.6 bis 0.8.

**cos φ und λ sind nicht dasselbe.** cos φ beschreibt nur die Verschiebung der Grundschwingung. λ = P / S berücksichtigt auch die Oberschwingungen. Bei Geräten mit Elektronik ist λ der aussagekräftigere Wert.

---

## Oberwellen (THD)

Moderne Geräte mit Schaltnetzteilen und Frequenzumrichtern erzeugen **Oberwellen** (Harmonics):

Die Netzfrequenz von 50 Hz ist die Grundschwingung. Oberschwingungen sind ganzzahlige Vielfache davon: 150 Hz (3.), 250 Hz (5.), 350 Hz (7.) usw. Der **THD** (Total Harmonic Distortion) fasst sie zu einer Zahl zusammen.

**Problem:** Oberwellen belasten Transformatoren und Netz, können Messgeräte verfälschen.

**Messung:** Netzanalysatoren messen THD — für GA-Anlagen mit vielen FUs relevant.

---

## Zählertypen und Messgrössen

### Moderne elektronische Zähler (MID-konform)

| Messgrösse           | Einheit | Beschreibung                     |
| -------------------- | ------- | -------------------------------- |
| Wirkenergie Bezug    | kWh     | Verbrauch                        |
| Wirkenergie Einsp.   | kWh     | Einspeisung (PV)                 |
| Blindenergie kap.    | kvarh   | Kondensatoren, PV-Wechselrichter |
| Blindenergie ind.    | kvarh   | Motoren, Transformatoren         |
| Scheinenergie        | kVAh    |                                  |
| Leistungsfaktor      | —       | 0–1 (oder ±1 für Richtung)       |
| Wirkleistung aktuell | kW      | Momentan                         |
| Strom                | A       | Momentan (3 Phasen)              |
| Spannung             | V       | Momentan (3 Phasen)              |

### Kommunikationsschnittstellen

| Schnittstelle                       | Einsatz                                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| **M-Bus**                           | Wohngebäude, mehrere Zähler                                                                     |
| **Modbus RTU**                      | GA-Integration, DDC                                                                             |
| **Modbus TCP**                      | IP-Netzwerk, direkt an GLT                                                                      |
| **S0-Puls**                         | Einfache Impulszählung, 1 Impuls = x kWh                                                        |
| **Kundenschnittstelle Smart Meter** | je nach Netzbetreiber, in CH oft M-Bus oder Ethernet, in DE SML über die optische Schnittstelle |

---

## Energiemessung in der GA-Praxis

### Teilzählung und Submetering

- Hauptzähler am Netzanschluss
  - Teilzähler Heizung, etwa Wärmepumpe und Pumpen
  - Teilzähler Lüftung
  - Teilzähler Kälte
  - Teilzähler Beleuchtung
  - Teilzähler Bürogeräte und Steckdosen

**Submetering** ermöglicht:

- Energiebilanz je Gewerk
- Kostenstellen-Zuweisung
- Verbrauchsanomalien erkennen (z.B. Lüftung 40 % Anteil → optimierbar?)

### Spitzenwert-Monitoring

1. Die GLT oder das EMS liest die Wirkleistung im Abstand von 1 bis 5 Minuten oder die Zählerstände jede Viertelstunde.
2. Daraus entsteht der **15-Minuten-Mittelwert**, nach dem in der Schweiz Leistungstarife meist abgerechnet werden.
3. Zeichnet sich ab, dass die Viertelstunde über dem Limit endet, greift das Lastmanagement ein.

---

## Normen

- **IEC 62053** — Elektrizitätszähler, Genauigkeitsklassen 0.2S, 0.5S, 1, 2
- **EN 50470-3** — Elektronische Wirkenergiezähler unter der MID, Klassen A, B, C
- **EN 50160** — Merkmale der Spannung in öffentlichen Netzen
- **IEC 61000-4-30** — Messverfahren für Spannungsqualitätsparameter
- **MID 2014/32/EU** — Messgeräterichtlinie (Abrechnungszähler)

<!-- EN -->

## Electrical Energy Measurement — Active Power, Reactive Power, cos φ

Electrical energy measurement in BA provides the data for EMS, ISO 50001 and billing. Understanding active, reactive and apparent power is the foundation for correct measurement and assessment.

## The Three Types of Power

### Active Power P [W, kW]

**Usable power** — the energy actually consumed:

<p class="formel">P = U · I · cos φ &nbsp; [W]</p>

This applies to single-phase, sinusoidal quantities. For three-phase: P = √3 · U · I · cos φ with the line-to-line voltage U.

- Heats, drives motors, provides light
- Billed by the energy supplier
- Unit: watt (W), kilowatt (kW)

### Reactive Power Q [var, kvar]

**Oscillates between generator and load** — required for magnetic fields (motors, transformers), does no useful work:

<p class="formel">Q = U · I · sin φ &nbsp; [var]</p>

- Loads the network (cables, transformers)
- Often billed separately by energy supplier (Q tariff)
- Capacitive loads (capacitors): compensate reactive power

### Apparent Power S [VA, kVA]

**Geometric sum** of active and reactive power:

<p class="formel">S = U · I = √(P² + Q²) &nbsp; [VA]</p>

- Determines sizing of transformers, cables, fuses
- Unit: volt-ampere (VA), kilovolt-ampere (kVA)

---

## Power Triangle

<figure class="schema"><svg viewBox="0 0 470 190" role="img" aria-label="Power triangle with active power P, reactive power Q, apparent power S and angle φ" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 160L290 160L290 35Z" stroke-width="2"/><path d="M278 160L278 148L290 148" stroke-width="1"/><path d="M66 160A46 46 0 0 0 61.7 140.7" stroke-width="1.2"/><g fill="currentColor" stroke="none"><text x="76" y="152" text-anchor="start" font-size="13" font-style="italic">φ</text><text x="155.0" y="180" text-anchor="middle" font-size="12" font-weight="600">Active power P (kW)</text><text x="300" y="101.5" text-anchor="start" font-size="12" font-weight="600">Reactive power Q (kvar)</text><text x="105.0" y="65.5" text-anchor="middle" font-size="12" font-weight="600">Apparent power S (kVA)</text></g></svg><figcaption>Power triangle: cos φ = P / S, sin φ = Q / S, tan φ = Q / P.</figcaption></figure>

---

## Power Factor cos φ

The **power factor** (also λ or PF) indicates how efficiently current is used:

| cos φ | Meaning                                 |
| ----- | --------------------------------------- | --------------------------------------------------------------- |
| cos φ | Reactive power relative to active power | Meaning                                                         |
| ----- | --------------------------------------- | -------------------------------------------                     |
| 1.0   | 0 %                                     | ideal, active power only                                        |
| 0.95  | about 33 %                              | good                                                            |
| 0.9   | about 48 %                              | common limit; below it many grid operators bill reactive energy |
| 0.8   | 75 %                                    | poor, check compensation                                        |

**Practical values:**

- Incandescent lamp: cos φ = 1.0
- Induction motor (full load): cos φ = 0.85–0.95
- Induction motor (no load): cos φ = 0.2–0.4 (poor!)
- VFD + motor: cos φ at the VFD input close to 1, because the rectifier draws hardly any reactive power. The **power factor λ** is, however, clearly lower because of harmonics, without a choke often 0.6 to 0.8.

**cos φ and λ are not the same.** cos φ only describes the displacement of the fundamental. λ = P / S also takes harmonics into account. For electronic equipment λ is the more meaningful value.

---

## Harmonics (THD)

Modern devices with switch-mode power supplies and variable frequency drives generate **harmonics**:

The mains frequency of 50 Hz is the fundamental. Harmonics are integer multiples of it: 150 Hz (3rd), 250 Hz (5th), 350 Hz (7th) and so on. The **THD** (total harmonic distortion) sums them up in one number.

**Problem:** Harmonics load transformers and the network, can distort metering.

**Measurement:** Power analysers measure THD — relevant for BA systems with many VFDs.

---

## Meter Types and Measured Variables

### Modern Electronic Meters (MID-compliant)

| Measured variable          | Unit  | Description               |
| -------------------------- | ----- | ------------------------- |
| Active energy import       | kWh   | Consumption               |
| Active energy export       | kWh   | Feed-in (PV)              |
| Reactive energy cap.       | kvarh | Capacitors, PV inverters  |
| Reactive energy ind.       | kvarh | Motors, transformers      |
| Apparent energy            | kVAh  |                           |
| Power factor               | —     | 0–1 (or ±1 for direction) |
| Active power instantaneous | kW    | Current value             |
| Current                    | A     | Instantaneous (3 phases)  |
| Voltage                    | V     | Instantaneous (3 phases)  |

### Communication Interfaces

| Interface                          | Use                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| **M-Bus**                          | Residential, multiple meters                                                                     |
| **Modbus RTU**                     | BA integration, DDC                                                                              |
| **Modbus TCP**                     | IP network, direct to BMS                                                                        |
| **S0 pulse**                       | Simple pulse counting, 1 pulse = x kWh                                                           |
| **Smart meter customer interface** | depends on the grid operator, in CH often M-Bus or Ethernet, in DE SML via the optical interface |

---

## Energy Measurement in BA Practice

### Sub-billing and Submetering

- Main meter at the grid connection
  - Sub-meter heating, such as heat pump and pumps
  - Sub-meter ventilation
  - Sub-meter cooling
  - Sub-meter lighting
  - Sub-meter office equipment and sockets

**Submetering** enables:

- Energy balance per trade
- Cost centre allocation
- Identifying consumption anomalies (e.g. ventilation 40 % share → optimisable?)

### Peak Demand Monitoring

1. The BMS or EMS reads the active power every 1 to 5 minutes, or the meter readings every quarter hour.
2. This gives the **15-minute mean value**, which demand tariffs in Switzerland are usually billed on.
3. If the quarter hour looks set to end above the limit, load management intervenes.

---

## Standards

- **IEC 62053** — Electricity metering equipment, accuracy classes 0.2S, 0.5S, 1, 2
- **EN 50470-3** — Electronic active energy meters under the MID, classes A, B, C
- **EN 50160** — Voltage characteristics of electricity supplied by public networks
- **IEC 61000-4-30** — Testing methods for power quality parameters
- **MID 2014/32/EU** — Measuring Instruments Directive (billing meters)
