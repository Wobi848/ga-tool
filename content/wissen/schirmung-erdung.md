---
title: Schirmung und Erdung — EMV in der GA
title_en: Shielding and Earthing — EMC in Building Automation
slug: schirmung-erdung
category: signale
subcategory: emv
tags:
  [
    schirmung,
    erdung,
    emv,
    brummschleife,
    schirmanschluss,
    kabelschirm,
    potentialausgleich,
    entstörung,
    differenziell,
    gleichtakt,
    ferritkern,
    leitungsführung,
    messfehler
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [signaltypen, frequenzumrichter, modbus, netzwerk-ga, 5plus5-regeln, selv-pelv]
norm: [IEC 61000-5-2, EN 50174-2, NIN SN 411000]
updated: 2026-10-14
lang: de
---

# Schirmung und Erdung — EMV in der GA

Messfehler, Signalstörungen und unerklärliche Kommunikationsausfälle haben oft eine gemeinsame Ursache: falsche Schirmung oder Erdung. Die Regeln sind einfach — aber in der Praxis oft falsch umgesetzt.

## Das Problem: Elektromagnetische Einstreuung

Signalleitungen wirken als Antennen. Störquellen:

| Störquelle                  | Störmechanismus                   |
| --------------------------- | --------------------------------- |
| Frequenzumrichter           | Hohe Oberwellen, Schaltflanken    |
| Motorleitungen              | Elektromagnetische Induktion      |
| Netzspannung 50 Hz          | Kapazitive und induktive Kopplung |
| Beleuchtung (Schaltvorgang) | Impulsstörer                      |
| Mobilfunk, WLAN             | HF-Einstreuung                    |
| Potenzialunterschiede       | Ausgleichsströme über Schirm      |

---

## Schirm-Anschluss: Die Grundregel

Es gibt zwei Schulen, und beide haben ihren Platz.

### Beidseitig auflegen (heutige EMV-Praxis)

Gegen hochfrequente Störungen wirkt der Schirm nur, wenn er an **beiden Enden** niederohmig und möglichst **rundum (360°)** mit dem Gehäuse oder der Schirmschiene verbunden ist. Das empfehlen IEC 61000-5-2 und die meisten Hersteller von Umrichtern, Bus- und Netzwerkkomponenten. Ein Schirm, der über einen langen «Pigtail» angeschlossen ist, verliert bei hohen Frequenzen viel von seiner Wirkung.

**Voraussetzung ist ein guter Potenzialausgleich** zwischen den Enden. Sonst fliesst über den Schirm ein Ausgleichsstrom mit 50 Hz.

### Einseitig auflegen (Ausnahme bei Brumm)

Liegen die beiden Enden auf unterschiedlichem Potenzial, fliesst über einen beidseitig aufgelegten Schirm ein Ausgleichsstrom, und das kann bei empfindlichen **niederfrequenten Analogsignalen** brummen. Dann legt man den Schirm einseitig auf, meist im Schaltschrank, und nimmt die schlechtere HF-Wirkung in Kauf.

| Situation                                             | Schirm                                                     |
| ----------------------------------------------------- | ---------------------------------------------------------- |
| Bus, Ethernet, Leitungen in der Nähe von Umrichtern   | beidseitig, 360°, mit Potenzialausgleich                   |
| Motorleitung vom Umrichter                            | beidseitig, 360° an Umrichter und Motor                    |
| Analogsignal, kurze Strecke im selben Schrank         | einseitig im Schaltschrank genügt                          |
| Analogsignal mit 50-Hz-Brumm trotz Potenzialausgleich | einseitig, oder einseitig plus Kondensator am anderen Ende |

## **Herstellerangabe geht vor.** Manche Busse, etwa KNX, haben eigene Regeln für den Schirm oder den Beidraht.

## Brummschleife erkennen und beheben

**Symptome:**

- Messwert überlagert mit 50 Hz Zittern (im Trend sichtbar)
- Analoge Messung schwankt um einige Prozent
- Modbus-Kommunikation instabil (CRC-Fehler)

**Diagnose:**

1. Messsignal mit Oszilloskop prüfen (50 Hz aufmoduliert?)
2. Schirm an einem Ende öffnen → Störung weg? → Brummschleife bestätigt
3. Potenzialdifferenz zwischen zwei Erdungspunkten messen (Sollte < 100 mV sein)

**Lösung:**

1. Potenzialausgleich verbessern
2. Galvanische Trennung, etwa mit einem Trennverstärker
3. Erst wenn das nicht reicht: Schirm bei diesem Analogsignal nur einseitig auflegen

---

## Leitungsführung

### Kabelklassen

| Kabeltyp            | Zusammen verlegen?                                    |
| ------------------- | ----------------------------------------------------- |
| 230 V / 400 V       | NEIN — getrennt von Signalleitungen                   |
| Motorleitungen (FU) | NEIN — eigener Kabelweg, grosser Abstand              |
| Bus (Modbus, KNX)   | JA mit anderen Bus-Leitungen, getrennt von 230V       |
| Analoge Signale     | Getrennt von 230 V, möglichst getrennt von Bus        |
| Ethernet            | Getrennt von 230 V (PoE-Kabel haben eigene Schirmung) |

**Mindestabstände:**

- Signal zu 230 V: > 50 mm
- Signal zu Motorleitung (FU): > 200 mm (besser in eigenem Kanal)
- Kreuzen erlaubt (senkrecht), parallel so wenig wie möglich

### Kabelkanäle und Blenden

- Falsch: Steuerleitung über einen Meter parallel direkt neben der Motorleitung eines Umrichters
- Richtig: Trennsteg aus Metall im Kanal, Kreuzung im rechten Winkel oder mindestens 200 mm Abstand

---

## Analoge Signale — Differenzieller Eingang

Manche DDC- und SPS-Eingänge sind **differenziell**. Die meisten GA-Eingänge haben aber eine gemeinsame Masse.

Die Elektronik misst die Spannung zwischen der Plus- und der Minus-Ader. Eine Störung, die auf beiden Adern gleich ankommt, fällt dabei heraus.

Vorteil: Gleichtaktstörungen (auf beiden Adern gleich) werden ausgeblendet → besser als Single-Ended.

> ⚠️ Den Schirm nie als Signalleiter verwenden und nicht auf eine Signalklemme legen. Er gehört auf die Schirmschiene.

---

## Potenzialausgleich im Schaltschrank

An der Schirm- und PE-Schiene im Schaltschrank enden:

- die Schirme aller Signal- und Busleitungen, mit Schirmklemmen flächig aufgelegt
- das Gehäuse des Schaltschranks und die Montageplatte
- die Hutschienen
- der PE-Anschluss der DDC

Die Schirme laufen auf eine Schirmschiene nahe der Kabeleinführung, die gut leitend mit der Montageplatte verbunden ist. So fliessen Störströme ab, bevor sie in den Schrank gelangen.

---

## Normen

- **IEC 61000-5-2** — EMV, Installation und Abschwächungsrichtlinien, Erdung und Schirmung
- **EN 50174-2** — Informationstechnik, Kabelinstallation in Gebäuden
- **NIN (SN 411000)** — Niederspannungs-Installationsnorm der Schweiz, Schutzleiter und Potenzialausgleich. In Deutschland DIN VDE 0100-540
- **IEC 61131-2** — SPS/DDC-Signalpegel und Störfestigkeit

<!-- EN -->

Measurement errors, signal interference, and unexplained communication failures often share a common root cause: incorrect shielding or earthing. The rules are simple — but frequently misapplied in practice.

## The Problem: Electromagnetic Interference

Signal cables act as antennas. Sources of interference:

| Source                | Interference mechanism            |
| --------------------- | --------------------------------- |
| Variable speed drives | High harmonics, switching edges   |
| Motor cables          | Electromagnetic induction         |
| Mains voltage 50 Hz   | Capacitive and inductive coupling |
| Lighting (switching)  | Impulse interference              |
| Mobile phone, WLAN    | RF ingress                        |
| Potential differences | Equalisation currents via shield  |

---

## Shield Connection: The Fundamental Rule

There are two schools, and both have their place.

### Both Ends (Current EMC Practice)

Against high-frequency interference the shield only works if it is bonded at **both ends** with low impedance and preferably **all round (360°)** to the enclosure or shield bar. IEC 61000-5-2 and most manufacturers of drives, bus and network components recommend this. A shield connected via a long "pigtail" loses much of its effect at high frequencies.

**Good equipotential bonding** between the ends is a prerequisite. Otherwise a 50 Hz equalising current flows through the shield.

### One End (Exception for Hum)

If the two ends are at different potential, an equalising current flows through a shield bonded at both ends, and with sensitive **low-frequency analogue signals** this can cause hum. Then the shield is bonded at one end, usually in the control panel, accepting the poorer HF effect.

| Situation                                      | Shield                                          |
| ---------------------------------------------- | ----------------------------------------------- |
| Bus, Ethernet, cables near drives              | both ends, 360°, with equipotential bonding     |
| Motor cable from the drive                     | both ends, 360° at drive and motor              |
| Analogue signal, short run in the same panel   | one end in the panel is enough                  |
| Analogue signal with 50 Hz hum despite bonding | one end, or one end plus capacitor at the other |

## **Manufacturer instructions take precedence.** Some buses, such as KNX, have their own rules for the shield or drain wire.

## Identifying and Resolving Ground Loops

**Symptoms:**

- Measurement value overlaid with 50 Hz ripple (visible in trend)
- Analogue measurement fluctuates by a few percent
- Modbus communication unstable (CRC errors)

**Diagnosis:**

1. Check signal with oscilloscope (50 Hz superimposed?)
2. Open shield at one end → interference gone? → ground loop confirmed
3. Measure potential difference between two earth points (should be < 100 mV)

**Solution:**

1. Improve equipotential bonding
2. Galvanic isolation, for example with an isolating amplifier
3. Only if that is not enough: bond the shield of this analogue signal at one end only

---

## Cable Routing

### Cable Classes

| Cable type         | Route together?                                     |
| ------------------ | --------------------------------------------------- |
| 230 V / 400 V      | NO — separate from signal cables                    |
| Motor cables (VSD) | NO — dedicated cable tray, large clearance          |
| Bus (Modbus, KNX)  | YES with other bus cables, separate from 230 V      |
| Analogue signals   | Separate from 230 V, preferably separate from bus   |
| Ethernet           | Separate from 230 V (PoE cables have own shielding) |

**Minimum separations:**

- Signal to 230 V: > 50 mm
- Signal to motor cable (VSD): > 200 mm (better in dedicated trunking)
- Crossing allowed (perpendicular), parallel routing as short as possible

### Cable Trunking and Barriers

- Wrong: control cable running more than a metre directly alongside the motor cable of a drive
- Right: metal divider in the trunking, crossing at right angles, or at least 200 mm separation

---

## Analogue Signals — Differential Input

Some DDC and PLC inputs are **differential**. Most BA inputs, however, have a common ground.

The electronics measure the voltage between the plus and minus conductor. Interference that arrives equally on both conductors drops out.

Advantage: common-mode interference (identical on both conductors) is rejected → better than single-ended.

> ⚠️ Never use the shield as a signal conductor and do not land it on a signal terminal. It belongs on the shield bar.

---

## Equipotential Bonding in the Control Panel

The shield and PE bar in the control panel receives:

- the shields of all signal and bus cables, bonded over their full circumference with shield clamps
- the panel enclosure and the mounting plate
- the DIN rails
- the PE connection of the DDC

The shields land on a shield bar close to the cable entry, well bonded to the mounting plate. Interference currents are thus drained before they get into the panel.

---

## Standards

- **IEC 61000-5-2** — EMC, installation and attenuation guidelines, earthing and shielding
- **EN 50174-2** — Information technology, cabling installation in buildings
- **NIN (SN 411000)** — Swiss low-voltage installation standard, protective conductors and equipotential bonding. In Germany DIN VDE 0100-540
- **IEC 61131-2** — PLC/DDC signal levels and noise immunity
