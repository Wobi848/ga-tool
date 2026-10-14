---
title: Lastarten — warum nicht jedes Relais jede Last schalten kann
title_en: Load Types — Why Not Every Relay Can Switch Every Load
slug: lastarten
category: elektro
subcategory: steuerung
tags:
  [
    lastart,
    gebrauchskategorie,
    ac-1,
    ac-3,
    ac-15,
    dc-13,
    einschaltstrom,
    led-treiber,
    ohmsche last,
    induktive last,
    kapazitive last,
    relais,
    schütz,
    halbleiterrelais,
    kontaktschweissen
  ]
difficulty: fortgeschritten
area: [elektro, ga]
related:
  [schuetzsteuerungen, schutzorgane, beleuchtungssteuerung, signaltypen, drehstrom, schemalesen]
norm: [EN 60947-4-1, EN 60947-5-1, EN 61810-1]
updated: 2026-10-14
lang: de
---

# Lastarten — warum nicht jedes Relais jede Last schalten kann

Auf dem Relais steht «10 A». Trotzdem klebt der Kontakt nach ein paar Wochen fest, obwohl am Ausgang nur LED-Leuchten mit zusammen 2 A hängen. Der Grund: **Die 10 A gelten für eine ohmsche Last.** Wie stark ein Kontakt belastet wird, hängt nicht nur vom Strom im Betrieb ab, sondern vor allem davon, was beim Ein- und Ausschalten passiert.

## Die drei Grundarten

| Lastart       | Beispiele in der GA                                   | Beim Einschalten                 | Beim Ausschalten                |
| ------------- | ----------------------------------------------------- | -------------------------------- | ------------------------------- |
| **Ohmsch**    | Elektroheizregister, Heizstäbe, Begleitheizung        | Strom gleich Nennstrom           | Unproblematisch                 |
| **Induktiv**  | Motoren, Schützspulen, Magnetventile, Transformatoren | Hoher Anlaufstrom (Motor, Trafo) | **Lichtbogen**, Spannungsspitze |
| **Kapazitiv** | LED-Treiber, Schaltnetzteile, EVG, Frequenzumrichter  | **Sehr hohe, kurze Stromspitze** | Unproblematisch                 |

Viele Geräte sind gemischt: Ein Netzteil ist beim Einschalten kapazitiv, ein Motor beim Anlauf und beim Ausschalten induktiv.

## Einschaltströme

Grobe Richtwerte. Verbindlich ist das Datenblatt des Geräts.

| Last                         | Einschaltstrom                                 | Dauer                    |
| ---------------------------- | ---------------------------------------------- | ------------------------ |
| Heizstab, Heizregister       | etwa 1 × Nennstrom                             | —                        |
| Drehstrommotor, Direktanlauf | typisch 5- bis 8-fach                          | bis der Motor dreht      |
| Glühlampe, Halogen           | bis etwa 15-fach (kalter Glühfaden)            | einige Millisekunden     |
| Transformator                | bis etwa 10- bis 15-fach, je nach Schaltmoment | wenige Netzperioden      |
| LED-Treiber, Netzteil        | Spitze oft **30 bis über 100 A je Gerät**      | unter einer Millisekunde |

Die LED-Treiber sind das eigentliche Problem der heutigen GA. Ihre Spitzen sind so kurz, dass kein Messgerät sie im Alltag zeigt, aber so hoch, dass sie Relaiskontakte anschweissen. Und sie **addieren sich**: Zehn Treiber an einem Kontakt heisst zehnmal die Spitze. Hersteller geben deshalb an, wie viele Treiber höchstens an einem LS oder einem Relais hängen dürfen.

## Gebrauchskategorien

Damit Schaltgeräte vergleichbar sind, gibt es genormte **Gebrauchskategorien**. Sie stehen im Datenblatt neben dem Strom.

### Schütze (EN 60947-4-1)

| Kategorie | Last                                              |
| --------- | ------------------------------------------------- |
| **AC-1**  | Ohmsche oder schwach induktive Last, Heizungen    |
| **AC-3**  | Käfigläufermotoren: Anlassen, Ausschalten im Lauf |
| **AC-4**  | Käfigläufermotoren: Tippen, Gegenstrombremsen     |
| **AC-5a** | Gasentladungslampen                               |
| **AC-5b** | Glühlampen                                        |
| **AC-6a** | Transformatoren                                   |
| **DC-1**  | Ohmsche Gleichstromlast                           |

### Relais und Hilfskontakte (EN 60947-5-1)

| Kategorie | Last                                                      |
| --------- | --------------------------------------------------------- |
| **AC-12** | Ohmsche Last, Halbleiterlast                              |
| **AC-15** | Elektromagnetische Last: Schützspulen, Magnetventile (AC) |
| **DC-12** | Ohmsche Gleichstromlast                                   |
| **DC-13** | Gleichstrom-Elektromagnete: Spulen, Magnetventile (DC)    |

**So liest man ein Datenblatt:** Ein Schütz mit «AC-1: 25 A, AC-3: 9 A» schaltet 25 A Heizung, aber nur einen Motor mit 9 A. Ein Relais mit «AC-1: 10 A, AC-15: 3 A» schaltet eine Schützspule nur bis 3 A. Wer nur die grösste Zahl liest, liest falsch.

## Gleichstrom ist schwerer zu schalten

Bei Wechselstrom geht der Strom 100-mal pro Sekunde durch null. Ein Lichtbogen beim Öffnen erlischt dort von selbst. **Bei Gleichstrom gibt es keinen Nulldurchgang**, der Lichtbogen brennt weiter, bis der Kontaktabstand gross genug ist.

Deshalb schaltet dasselbe Relais bei 24 VDC oft nur einen Bruchteil des Stroms, den es bei 230 VAC schafft, und bei 110 oder 220 VDC fast nichts mehr. Massgebend ist die **DC-Lastgrenzkurve** im Datenblatt.

Bei DC-Spulen und Magnetventilen kommt die Abschaltspitze dazu. Dagegen hilft eine **Freilaufdiode**, siehe [Schützsteuerungen](/wissen/schuetzsteuerungen).

## Welches Schaltgerät für welche Last

| Last                              | Geeignet                                                                                 |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| Elektroheizung, selten geschaltet | Schütz nach AC-1                                                                         |
| Elektroheizung, getaktet          | **Halbleiterrelais** mit Nullspannungsschalter: kein Verschleiss, kein Klicken           |
| Motor direkt                      | Schütz nach AC-3 mit Motorschutz                                                         |
| Motor am FU                       | Der FU schaltet. Zwischen FU und Motor nicht unter Last schalten                         |
| LED-Beleuchtung                   | Relais oder Schütz **für LED-Last** bzw. mit Einschaltstromangabe, Treiberzahl begrenzen |
| Schützspule, Magnetventil AC      | Koppelrelais nach AC-15                                                                  |
| Magnetventil DC                   | Relais nach DC-13, Freilaufdiode                                                         |
| Netzteil, Steuertrafo             | Relais mit hoher Einschaltfestigkeit, LS-Charakteristik C oder D                         |

**Kontaktmaterial:** Für hohe Einschaltströme gibt es Relais mit Kontakten aus **AgSnO₂** (Silber-Zinnoxid) statt des üblichen AgNi. Manche haben einen voreilenden **Wolfram-Kontakt**, der die Einschaltspitze übernimmt. Im Datenblatt steht das meist als «Inrush» oder «Lampenlast».

**Halbleiterrelais (SSR):** verschleissfrei und lautlos, ideal für oft getaktete Heizungen. Aber: Sie werden warm und brauchen einen Kühlkörper, sie haben einen kleinen Leckstrom im ausgeschalteten Zustand, und wenn sie kaputtgehen, dann meist **durchlegiert**, also dauernd eingeschaltet. Bei Heizungen gehört deshalb ein Sicherheitstemperaturbegrenzer dazu, der unabhängig abschaltet.

## Typisch in der GA

- **DDC-Relaisausgang direkt an der Last:** Die Ausgänge sind für Koppelrelais und kleine Lasten gedacht. Ein LED-Lichtband oder ein Motor gehört dahinter auf ein Koppelrelais oder Schütz.
- **Lichtschütz verschweisst** nach Umbau von Leuchtstoff- auf LED-Leuchten: Gleiche Leistung, aber ganz andere Einschaltspitzen. Schütz und Treiberzahl je Kreis prüfen.
- **Relais schaltet DC-Magnetventil und brennt ab:** auf AC-Daten ausgewählt, DC-Grenzkurve nicht beachtet, keine Freilaufdiode.
- **Ein Schütz für «16 A»** am 5,5-kW-Motor: Das war der AC-1-Wert. Für den Motor zählt AC-3.

## Normen

- **EN 60947-4-1** — Schütze und Motorstarter, Gebrauchskategorien AC-1 bis AC-8
- **EN 60947-5-1** — Steuergeräte und Schaltelemente, AC-15 und DC-13
- **EN 61810-1** — Elektromechanische Elementarrelais

<!-- EN -->

The relay says "10 A". Still the contact welds after a few weeks, although the output only drives LED luminaires drawing 2 A in total. The reason: **the 10 A apply to a resistive load.** How hard a contact is stressed depends not only on the running current, but above all on what happens when switching on and off.

## The Three Basic Types

| Load type      | BA examples                                             | When switching on                          | When switching off     |
| -------------- | ------------------------------------------------------- | ------------------------------------------ | ---------------------- |
| **Resistive**  | Electric heater batteries, heating rods, trace heating  | Current equals rated current               | No problem             |
| **Inductive**  | Motors, contactor coils, solenoid valves, transformers  | High starting current (motor, transformer) | **Arc**, voltage spike |
| **Capacitive** | LED drivers, switch-mode power supplies, ballasts, VFDs | **Very high, short current peak**          | No problem             |

Many devices are mixed: a power supply is capacitive at switch-on, a motor inductive at start and at switch-off.

## Inrush Currents

Rough guide values. The device datasheet is binding.

| Load                              | Inrush current                                            | Duration              |
| --------------------------------- | --------------------------------------------------------- | --------------------- |
| Heating rod, heater battery       | about 1 × rated current                                   | —                     |
| Three-phase motor, direct-on-line | typically 5 to 8 times                                    | until the motor turns |
| Incandescent, halogen lamp        | up to about 15 times (cold filament)                      | a few milliseconds    |
| Transformer                       | up to about 10 to 15 times, depending on switching moment | a few mains cycles    |
| LED driver, power supply          | peak often **30 to over 100 A per device**                | under one millisecond |

LED drivers are the real problem in today's BA. Their peaks are so short that no meter shows them in everyday work, but so high that they weld relay contacts. And they **add up**: ten drivers on one contact means ten times the peak. Manufacturers therefore state how many drivers may at most be connected to one MCB or relay.

## Utilisation Categories

To make switching devices comparable, there are standardised **utilisation categories**. They appear in the datasheet next to the current.

### Contactors (EN 60947-4-1)

| Category  | Load                                                        |
| --------- | ----------------------------------------------------------- |
| **AC-1**  | Resistive or slightly inductive load, heaters               |
| **AC-3**  | Squirrel-cage motors: starting, switching off while running |
| **AC-4**  | Squirrel-cage motors: inching, plugging                     |
| **AC-5a** | Gas discharge lamps                                         |
| **AC-5b** | Incandescent lamps                                          |
| **AC-6a** | Transformers                                                |
| **DC-1**  | Resistive DC load                                           |

### Relays and Auxiliary Contacts (EN 60947-5-1)

| Category  | Load                                                        |
| --------- | ----------------------------------------------------------- |
| **AC-12** | Resistive load, semiconductor load                          |
| **AC-15** | Electromagnetic load: contactor coils, solenoid valves (AC) |
| **DC-12** | Resistive DC load                                           |
| **DC-13** | DC electromagnets: coils, solenoid valves (DC)              |

**How to read a datasheet:** a contactor with "AC-1: 25 A, AC-3: 9 A" switches 25 A of heating, but a motor of only 9 A. A relay with "AC-1: 10 A, AC-15: 3 A" switches a contactor coil only up to 3 A. Reading only the largest number means reading it wrong.

## DC Is Harder to Switch

With AC the current passes through zero 100 times per second. An arc when opening extinguishes there by itself. **With DC there is no zero crossing**; the arc keeps burning until the contact gap is large enough.

That is why the same relay often switches only a fraction of its 230 VAC current at 24 VDC, and almost nothing at 110 or 220 VDC. The **DC load limit curve** in the datasheet is what counts.

DC coils and solenoid valves add a switch-off spike. A **flyback diode** helps, see [Contactor Control](/wissen/schuetzsteuerungen).

## Which Switching Device for Which Load

| Load                              | Suitable                                                                            |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| Electric heating, switched rarely | Contactor rated AC-1                                                                |
| Electric heating, pulsed          | **Solid-state relay** with zero-cross switching: no wear, no clicking               |
| Motor direct                      | Contactor rated AC-3 with motor protection                                          |
| Motor on VFD                      | The VFD switches. Do not switch under load between VFD and motor                    |
| LED lighting                      | Relay or contactor **for LED loads** or with inrush rating, limit number of drivers |
| Contactor coil, solenoid valve AC | Interface relay rated AC-15                                                         |
| Solenoid valve DC                 | Relay rated DC-13, flyback diode                                                    |
| Power supply, control transformer | Relay with high inrush capability, MCB characteristic C or D                        |

**Contact material:** for high inrush currents there are relays with **AgSnO₂** (silver tin oxide) contacts instead of the usual AgNi. Some have a leading **tungsten contact** that takes the inrush peak. Datasheets usually call this "inrush" or "lamp load".

**Solid-state relays (SSR):** wear-free and silent, ideal for frequently pulsed heaters. But: they get warm and need a heat sink, they have a small leakage current when off, and when they fail they usually fail **shorted**, i.e. permanently on. For heaters an independent safety temperature limiter is therefore required.

## Typical in BA

- **DDC relay output directly on the load:** the outputs are meant for interface relays and small loads. An LED strip or a motor belongs behind an interface relay or contactor.
- **Lighting contactor welded** after converting from fluorescent to LED luminaires: same power, but completely different inrush peaks. Check contactor and number of drivers per circuit.
- **Relay switches a DC solenoid valve and burns out:** selected on AC data, DC limit curve ignored, no flyback diode.
- **A "16 A" contactor** on a 5.5 kW motor: that was the AC-1 value. For the motor, AC-3 counts.

## Standards

- **EN 60947-4-1** — Contactors and motor starters, utilisation categories AC-1 to AC-8
- **EN 60947-5-1** — Control circuit devices and switching elements, AC-15 and DC-13
- **EN 61810-1** — Electromechanical elementary relays
