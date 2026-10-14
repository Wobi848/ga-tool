---
title: SELV und PELV — Schutzkleinspannung in der GA
title_en: SELV and PELV — Protective Extra-Low Voltage in BA
slug: selv-pelv
category: elektro
subcategory: sicherheit
tags:
  [
    selv,
    pelv,
    schutzkleinspannung,
    24v,
    niederspannung,
    sicherheitsstromkreis,
    berührungsschutz,
    potentialtrennung,
    schutzisolation,
    ddc,
    sensor,
    aktor,
    schaltschrank
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [signaltypen, dali, knx, schirmung-erdung, nin-niv]
norm: [IEC 61140, IEC 60364-4-41, NIN SN 411000, EN 61558-2-6]
updated: 2026-10-14
lang: de
---

# SELV und PELV — Schutzkleinspannung in der GA

Fast alle GA-Feldgeräte arbeiten mit 24 V AC oder 24 V DC. Das ist Kleinspannung. Ob sie als Schutzmassnahme gegen elektrischen Schlag gilt, hängt davon ab, wie sie erzeugt und verlegt wird: als **SELV** oder als **PELV**.

## SELV und PELV

Beide setzen voraus:

- **Spannung** höchstens 50 V AC oder 120 V DC (oberwellenfrei)
- **Sichere Trennung** vom Netz, etwa durch einen Sicherheitstransformator nach EN 61558-2-6 oder ein Netzteil mit sicherer Trennung. Primär- und Sekundärseite sind durch doppelte oder verstärkte Isolierung getrennt.
- **Getrennte Verlegung** von Leitern höherer Spannung oder eine Isolierung, die für die höchste vorkommende Spannung reicht

Der Unterschied liegt in der Erdung:

| Merkmal                 | SELV                                   | PELV                                         |
| ----------------------- | -------------------------------------- | -------------------------------------------- |
| Deutsche Bezeichnung    | Schutzkleinspannung                    | Funktionskleinspannung mit sicherer Trennung |
| Spannungsgrenze         | 50 V AC / 120 V DC                     | 50 V AC / 120 V DC                           |
| Sichere Trennung        | ja                                     | ja                                           |
| Erdung des Stromkreises | nein, weder Leiter noch Körper geerdet | erlaubt, etwa G0 oder 0 V an PE              |
| Typisch in der GA       | Raumgeräte, Feldgeräte ohne Erdbezug   | Schaltschrank, wo der 0-V-Leiter geerdet ist |

In trockenen Räumen braucht es bis 25 V AC oder 60 V DC keinen Basisschutz, also keine Isolierung gegen direktes Berühren. In Bädern und anderen nassen Bereichen gelten tiefere Grenzen.

**In der GA** wird der 0-V-Leiter der 24-V-Versorgung im Schaltschrank häufig geerdet, damit Messsignale einen festen Bezug haben. Dann ist es PELV. Wird er nicht geerdet, kann es SELV sein, sofern alle Bedingungen erfüllt sind.

## Busse: nicht alles ist SELV

| Bus      | Spannung      | Einstufung                                                                                                                                                                                |
| -------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KNX TP   | etwa 29 V DC  | SELV, Busleitung getrennt von Netzleitungen verlegen                                                                                                                                      |
| M-Bus    | bis etwa 42 V | Kleinspannung, je nach Pegelwandler                                                                                                                                                       |
| **DALI** | etwa 16 V DC  | **nicht SELV.** Die DALI-Leitung gilt nur als basisisoliert und darf im selben Kabel wie 230 V geführt werden, etwa im 5-adrigen Kabel. Dafür muss sie wie Netzspannung behandelt werden. |

DALI-Geräte sind meist verpolungssicher. KNX dagegen hat eine Polarität (rot plus, schwarz minus).

## 24 V AC oder 24 V DC

| Merkmal     | 24 V AC                                                                                                                     | 24 V DC                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Verbreitung | viele Stellantriebe                                                                                                         | DDC, Bus-Netzteile, Sensoren                    |
| Versorgung  | Transformator                                                                                                               | Netzteil                                        |
| Messung     | Multimeter auf AC                                                                                                           | Multimeter auf DC                               |
| Polarität   | **wichtig, wenn G0 zugleich Bezug des 0–10-V-Signals ist.** G und G0 vertauscht verfälscht das Signal oder zerstört Geräte. | Plus und Minus vertauscht kann Geräte zerstören |

Viele Stellantriebe akzeptieren 24 V AC **und** 24 V DC. Das Datenblatt sagt es.

**AC- und DC-Kreise nicht verbinden.** Werden G0 eines Transformators und 0 V eines Netzteils zusammengeschlossen und auf beiden Seiten an verschiedenen Punkten geerdet, fliessen Ausgleichsströme. Signale werden verfälscht oder Geräte beschädigt.

## Netzteil auslegen

| Verbraucher              | Strom |
| ------------------------ | ----- |
| DDC                      | 1.5 A |
| 10 Stellantriebe à 0.1 A | 1.0 A |
| 4 Sensoren à 0.05 A      | 0.2 A |
| Summe                    | 2.7 A |
| mit 20 % Reserve         | 3.2 A |

Gewählt wird das nächstgrössere Netzteil, hier 5 A. Die Werte sind Beispiele. Bei Stellantrieben zählt der Wert für die Dimensionierung aus dem Datenblatt, nicht der Betriebswert, denn beim Anlaufen ziehen sie mehr. KNX hat eine eigene Spannungsversorgung mit Drossel und hängt nicht am 24-V-Netzteil.

## Kurzschluss und Spannungsfall

Auch bei 24 V können Kurzschlüsse Leitungen überhitzen:

- **Netzteil mit Strombegrenzung** oder elektronischer Abschaltung
- **Absicherung** der einzelnen 24-V-Abgänge, etwa 1 bis 4 A, damit ein Fehler im Feld nicht den ganzen Schrank lahmlegt
- **Spannungsfall** prüfen: Bei 24 V fallen 2 V Verlust schon ins Gewicht. Lange Leitungen zu Stellantrieben brauchen oft grössere Querschnitte, als der Strom allein verlangen würde.

## Typische Fehler

| Fehler                               | Folge                                      | Abhilfe                           |
| ------------------------------------ | ------------------------------------------ | --------------------------------- |
| 24-V-Gerät an 230 V angeschlossen    | Gerät zerstört, Brandgefahr                | Spannungsebenen klar kennzeichnen |
| G und G0 vertauscht                  | 0–10-V-Signal falsch, Gerät beschädigt     | Klemmenplan einhalten             |
| AC- und DC-Bezugspotenzial verbunden | Ausgleichsströme, falsche Werte            | Kreise getrennt halten            |
| Netzteil der Schutzklasse I ohne PE  | Gehäuse kann im Fehlerfall Spannung führen | PE anschliessen                   |
| DALI-Leitung als SELV behandelt      | Unzulässige Verlegung neben SELV-Leitungen | DALI wie Netzspannung behandeln   |
| 230 V auf einem Digitaleingang       | DDC-Eingang zerstört                       | Koppelrelais einsetzen            |

## Normen

- **IEC 61140** — Schutz gegen elektrischen Schlag, gemeinsame Anforderungen
- **IEC 60364-4-41** — Schutzmassnahmen, mit SELV und PELV. In der Schweiz umgesetzt in der **NIN (SN 411000)**, in Deutschland in DIN VDE 0100-410
- **EN 61558-2-6** — Sicherheitstransformatoren
- **IEC 62386-101** — DALI, Anforderungen an das System

<!-- EN -->

Almost all BA field devices run on 24 V AC or 24 V DC. That is extra-low voltage. Whether it counts as a protective measure against electric shock depends on how it is generated and installed: as **SELV** or as **PELV**.

## SELV and PELV

Both require:

- **Voltage** at most 50 V AC or 120 V DC (ripple-free)
- **Protective separation** from the mains, for example by a safety isolating transformer per EN 61558-2-6 or a power supply with protective separation. Primary and secondary are separated by double or reinforced insulation.
- **Separate routing** from conductors of higher voltage, or insulation rated for the highest voltage present

The difference lies in earthing:

| Feature                 | SELV                                                | PELV                                             |
| ----------------------- | --------------------------------------------------- | ------------------------------------------------ |
| Name                    | safety extra-low voltage                            | protective extra-low voltage                     |
| Voltage limit           | 50 V AC / 120 V DC                                  | 50 V AC / 120 V DC                               |
| Protective separation   | yes                                                 | yes                                              |
| Earthing of the circuit | no, neither conductors nor exposed parts            | permitted, e.g. G0 or 0 V to PE                  |
| Typical in BA           | room devices, field devices without earth reference | control panel where the 0 V conductor is earthed |

In dry locations no basic protection, i.e. no insulation against direct contact, is needed up to 25 V AC or 60 V DC. Bathrooms and other wet locations have lower limits.

**In BA** the 0 V conductor of the 24 V supply is often earthed in the control panel so that measuring signals have a fixed reference. Then it is PELV. If it is not earthed, it can be SELV, provided all conditions are met.

## Buses: Not Everything Is SELV

| Bus      | Voltage          | Classification                                                                                                                                                                |
| -------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| KNX TP   | about 29 V DC    | SELV, route the bus cable separately from mains cables                                                                                                                        |
| M-Bus    | up to about 42 V | extra-low voltage, depending on the level converter                                                                                                                           |
| **DALI** | about 16 V DC    | **not SELV.** The DALI line only has basic insulation and may run in the same cable as 230 V, for example in a 5-core cable. In return it must be treated like mains voltage. |

DALI devices are usually polarity-independent. KNX, on the other hand, has a polarity (red plus, black minus).

## 24 V AC or 24 V DC

| Feature     | 24 V AC                                                                                                                     | 24 V DC                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Prevalence  | many actuators                                                                                                              | DDC, bus power supplies, sensors            |
| Supply      | transformer                                                                                                                 | power supply unit                           |
| Measurement | multimeter on AC                                                                                                            | multimeter on DC                            |
| Polarity    | **matters when G0 is also the reference of the 0–10 V signal.** Swapping G and G0 falsifies the signal or destroys devices. | swapping plus and minus can destroy devices |

Many actuators accept 24 V AC **and** 24 V DC. The data sheet says so.

**Do not connect AC and DC circuits.** If G0 of a transformer and 0 V of a power supply are joined and earthed at different points on each side, equalising currents flow. Signals are falsified or devices damaged.

## Sizing the Power Supply

| Load                  | Current |
| --------------------- | ------- |
| DDC                   | 1.5 A   |
| 10 actuators at 0.1 A | 1.0 A   |
| 4 sensors at 0.05 A   | 0.2 A   |
| Total                 | 2.7 A   |
| with 20 % reserve     | 3.2 A   |

Choose the next larger power supply, here 5 A. The values are examples. For actuators use the sizing value from the data sheet, not the operating value, because they draw more when starting. KNX has its own power supply with choke and is not on the 24 V supply.

## Short Circuit and Voltage Drop

Even at 24 V, short circuits can overheat cables:

- **Power supply with current limiting** or electronic shutdown
- **Fusing** of the individual 24 V outgoing circuits, for example 1 to 4 A, so that a fault in the field does not take down the whole panel
- **Check voltage drop:** at 24 V, a 2 V loss already matters. Long cables to actuators often need larger cross-sections than the current alone would require.

## Typical Mistakes

| Mistake                               | Consequence                               | Remedy                        |
| ------------------------------------- | ----------------------------------------- | ----------------------------- |
| 24 V device connected to 230 V        | device destroyed, fire risk               | label voltage levels clearly  |
| G and G0 swapped                      | 0–10 V signal wrong, device damaged       | follow the terminal plan      |
| AC and DC reference potentials joined | equalising currents, wrong values         | keep circuits separate        |
| Class I power supply without PE       | enclosure may become live on a fault      | connect PE                    |
| DALI line treated as SELV             | impermissible routing next to SELV cables | treat DALI like mains voltage |
| 230 V on a digital input              | DDC input destroyed                       | use an interface relay        |

## Standards

- **IEC 61140** — Protection against electric shock, common aspects
- **IEC 60364-4-41** — Protective measures, including SELV and PELV. Implemented in Switzerland in the **NIN (SN 411000)**, in Germany in DIN VDE 0100-410
- **EN 61558-2-6** — Safety isolating transformers
- **IEC 62386-101** — DALI, system requirements
