---
title: Messen und Fehlersuche im Schaltschrank
title_en: Measuring and Troubleshooting in the Control Panel
slug: messen-fehlersuche
category: elektro
subcategory: messtechnik
tags:
  [
    messen,
    multimeter,
    spannungsprüfer,
    strommesszange,
    messkategorie,
    cat iii,
    loz,
    geisterspannung,
    pt1000,
    4-20 ma,
    0-10 v,
    fehlersuche,
    drahtbruch,
    kurzschluss
  ]
difficulty: grundlagen
area: [elektro, ga]
related:
  [schemalesen, schuetzsteuerungen, schutzorgane, signaltypen, temperaturfuehler, 5plus5-regeln]
norm: [EN 61010-1, EN 61243-3, IEC 60751, NE 43]
updated: 2026-10-14
lang: de
---

# Messen und Fehlersuche im Schaltschrank

Die DDC zeigt 85 °C Raumtemperatur, der Stellantrieb fährt nicht, die Rückmeldung fehlt. In neun von zehn Fällen liegt der Fehler nicht in der DDC, sondern auf dem Weg dorthin: Klemme, Kabel, Feldgerät. Mit einem Messgerät und dem [Schema](/wissen/schemalesen) findet man ihn.

## Die Messgeräte

| Gerät                           | Wofür                                          | Worauf achten                                       |
| ------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| **Zweipoliger Spannungsprüfer** | Spannungsfreiheit feststellen                  | Vor und nach der Prüfung an bekannter Quelle testen |
| **Multimeter**                  | Spannung, Widerstand, Durchgang, kleine Ströme | Messkategorie, True RMS, LoZ-Funktion               |
| **Strommesszange**              | Motorstrom, Phasenvergleich, ohne Auftrennen   | Nur einen Leiter umfassen, nicht das ganze Kabel    |
| **mA-Zange**                    | 4–20-mA-Signale ohne Auftrennen                | Auflösung 0.01 mA                                   |
| **Prozesskalibrator**           | mA und Volt einspeisen, Fühler simulieren      | Ideal für Datenpunkttests bei der IBN               |
| **Isolationsmessgerät**         | Isolationswiderstand von Leitungen und Motoren | Gehört in die Hand der Elektrofachperson            |

**Spannungsfreiheit prüft man mit dem zweipoligen Spannungsprüfer, nicht mit dem Multimeter.** Ein Multimeter auf dem falschen Messbereich oder mit gesteckten Messleitungen in der Strombuchse zeigt 0 V, obwohl Spannung anliegt.

### Messkategorie

Die Kategorie auf dem Gerät und den Messleitungen sagt, welchen Spannungsspitzen es standhält:

| Kategorie   | Ort                                                       |
| ----------- | --------------------------------------------------------- |
| **CAT II**  | Steckdosen, Geräte am Netzstecker                         |
| **CAT III** | Verteilungen, Schaltschränke, fest angeschlossene Motoren |
| **CAT IV**  | Hausanschluss, Zähler, Freileitungen                      |

Für den GA-Schaltschrank ist **CAT III 600 V** das Minimum. Die Kategorie gilt für die schwächste Komponente: Ein CAT-IV-Multimeter mit CAT-II-Messleitungen ist ein CAT-II-Messgerät.

## Spannung, Strom, Widerstand

- **Spannung** misst man **parallel**, also zwischen zwei Punkten. Immer gegen den richtigen Bezug: Netzspannung gegen N, 24 V gegen 0 V (M), Analogsignale gegen die Signalmasse der DDC, nicht gegen PE.
- **Strom** misst man **in Reihe**: Kreis auftrennen und das Messgerät dazwischen schalten. Einfacher und sicherer geht es mit der Zange.
- **Widerstand** misst man nur **spannungslos** und mit mindestens einer Seite abgeklemmt. Sonst misst man parallel geschaltete Teile mit.

**Der klassische Fehler:** Messleitung steckt noch in der A-Buchse vom letzten Strommessen, dann misst man Spannung. Das ist ein Kurzschluss über das Messgerät. Gute Geräte haben eine Sicherung dafür, schlechte explodieren.

### Geisterspannungen und LoZ

Ein abgeklemmter Leiter in einem langen Kabel zeigt mit dem Multimeter oft 50 bis 150 V an, obwohl er nirgends angeschlossen ist. Das ist **kapazitive Einkopplung** von den Nachbaradern, ohne Leistung dahinter.

Die **LoZ-Funktion** (niedrige Eingangsimpedanz) belastet die Leitung und lässt solche Geisterspannungen zusammenbrechen. Echte Spannung bleibt stehen. Nicht in Steuerkreisen mit empfindlichen Eingängen verwenden: Die Belastung kann ein Relais anziehen lassen.

### Messen hinter dem FU

Am Ausgang eines Frequenzumrichters zeigen normale Multimeter Unsinn an, auch mit True RMS. Die getaktete Spannung enthält hohe Frequenzen. Brauchbare Werte gibt es mit einem Tiefpassfilter (bei manchen Geräten «VFD» oder «LPF») oder direkt im Display des FU.

## Signale der GA messen

| Signal           | Messen                                             | Normalbereich   | Fehlerbild                                      |
| ---------------- | -------------------------------------------------- | --------------- | ----------------------------------------------- |
| **0–10 V**       | Spannung gegen Signalmasse                         | 0–10 V          | 0 V kann Drahtbruch oder echter Wert sein       |
| **2–10 V**       | Spannung gegen Signalmasse                         | 2–10 V          | Unter 2 V: Drahtbruch oder Versorgung fehlt     |
| **4–20 mA**      | Zange, in Reihe, oder Spannung am Bürdenwiderstand | 4–20 mA         | Unter 3.6 mA oder über 21 mA: Fehler (NE 43)    |
| **Pt1000**       | Widerstand, **an der DDC abgeklemmt**              | siehe Tabelle   | Sehr hoch: Unterbruch, nahe 0 Ω: Kurzschluss    |
| **DI (Kontakt)** | Spannung am Eingang, Kontakt offen/zu              | z.B. 24 V / 0 V | Immer 0 V: Versorgung fehlt oder Kontakt klemmt |

Darum haben **2–10 V** und **4–20 mA** einen «lebenden Nullpunkt»: Ein Drahtbruch ist vom kleinsten Messwert unterscheidbar. Bei 0–10 V geht das nicht. Mehr dazu in [Signaltypen](/wissen/signaltypen).

Am Bürdenwiderstand gilt U = I · R: Bei 250 Ω entsprechen 4 mA genau 1 V und 20 mA genau 5 V.

### Pt1000-Widerstandswerte

Nach IEC 60751. Vor dem Messen den Fühler an der DDC abklemmen, sonst stört der Messstrom der DDC.

| Temperatur | Widerstand |
| ---------- | ---------- |
| −20 °C     | 921.6 Ω    |
| 0 °C       | 1000.0 Ω   |
| 10 °C      | 1039.0 Ω   |
| 20 °C      | 1077.9 Ω   |
| 25 °C      | 1097.3 Ω   |
| 40 °C      | 1155.4 Ω   |
| 60 °C      | 1232.4 Ω   |
| 80 °C      | 1309.0 Ω   |
| 100 °C     | 1385.1 Ω   |

Faustregel: rund **3.85 Ω pro Kelvin**. Bei Zweileiteranschluss geht der Leitungswiderstand mit ein: 1 Ω Leitung heisst rund 0.26 K zu warm. Weitere Fühlertypen in [Temperaturfühler](/wissen/temperaturfuehler).

## Systematisch suchen

1. **Symptom genau fassen:** Was zeigt die DDC, was ist in der Anlage? Ist der Wert eingefroren, falsch oder fehlt er?
2. **An der DDC-Klemme messen:** Stimmt das Signal dort mit dem Anzeigewert überein? Wenn ja, liegt das Problem in der DDC (Skalierung, Konfiguration). Wenn nein, liegt es davor.
3. **Am Feldgerät messen:** Ist das Signal dort richtig? Dann liegt der Fehler im Kabel oder an den Klemmen dazwischen.
4. **Halbieren:** Bei langen Wegen an einer Zwischenklemme messen. So halbiert sich der verdächtige Bereich mit jeder Messung.
5. **Versorgung prüfen:** Viele Feldgeräte brauchen 24 V. Fehlt die, fehlt auch das Signal.

**Ausgänge testen:** Die meisten DDC lassen Ausgänge von Hand setzen. Vorher klären, was dann passiert: Ein Ventilator, der gegen geschlossene Klappen startet, oder ein Ventil, das ein Register einfrieren lässt, ist schnell ein grösserer Schaden. Danach wieder auf Automatik stellen.

## Typische Fälle

| Symptom                               | Zuerst prüfen                                                |
| ------------------------------------- | ------------------------------------------------------------ |
| Fühler zeigt Maximalwert              | Unterbruch: Klemme, Ader, Fühler                             |
| Fühler zeigt Minimalwert              | Kurzschluss, eingeklemmte Leitung, Feuchtigkeit              |
| Wert springt                          | Wackelkontakt, fehlende Schirmung, Kabel neben Motorleitung  |
| Wert um konstant einige Kelvin falsch | Leitungswiderstand, falscher Fühlertyp konfiguriert          |
| Stellantrieb fährt nicht              | 24 V am Antrieb, Stellsignal Y, Handverstellung eingerastet  |
| Antrieb fährt, Rückmeldung U fehlt    | Rückmeldeader, Bezugsmasse                                   |
| 4–20 mA bei 0 mA                      | Drahtbruch, Versorgung des Messumformers                     |
| DI meldet nie                         | Spannung am Kontakt, gemeinsamer Bezug, Kontakt verschweisst |

Bei Schirmungs- und Erdungsproblemen hilft [Schirmung und Erdung](/wissen/schirmung-erdung).

## Sicherheit

- Arbeiten im Schrank nach den [5+5 lebenswichtigen Regeln](/wissen/5plus5-regeln).
- Messspitzen mit Schutzkappen, nur so viel Metall wie nötig.
- Erst die Messleitung an den Bezug, dann an die Phase. Beim Abnehmen umgekehrt.
- Nicht über offene, spannungsführende Teile greifen. Wenn nötig abdecken.

## Normen

- **EN 61010-1** — Sicherheit von Messgeräten, Messkategorien
- **EN 61243-3** — Zweipolige Spannungsprüfer
- **IEC 60751** — Platin-Widerstandsthermometer
- **NAMUR NE 43** — Fehlererkennung bei 4–20-mA-Signalen

<!-- EN -->

The DDC shows a room temperature of 85 °C, the actuator does not move, the feedback is missing. Nine times out of ten the fault is not in the DDC but on the way to it: terminal, cable, field device. With a meter and the [diagram](/wissen/schemalesen) you will find it.

## The Instruments

| Instrument                  | For                                                           | Watch out for                                     |
| --------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| **Two-pole voltage tester** | Verifying absence of voltage                                  | Test on a known source before and after           |
| **Multimeter**              | Voltage, resistance, continuity, small currents               | Measurement category, True RMS, LoZ function      |
| **Clamp meter**             | Motor current, phase comparison, without breaking the circuit | Clamp one conductor only, not the whole cable     |
| **mA clamp**                | 4–20 mA signals without breaking the loop                     | Resolution 0.01 mA                                |
| **Process calibrator**      | Sourcing mA and volts, simulating sensors                     | Ideal for point-to-point tests at commissioning   |
| **Insulation tester**       | Insulation resistance of cables and motors                    | Belongs in the hands of the qualified electrician |

**Absence of voltage is verified with the two-pole voltage tester, not the multimeter.** A multimeter on the wrong range or with leads plugged into the current socket shows 0 V although voltage is present.

### Measurement Category

The category on the instrument and the test leads states which voltage transients it withstands:

| Category    | Location                                          |
| ----------- | ------------------------------------------------- |
| **CAT II**  | Sockets, plug-connected equipment                 |
| **CAT III** | Distribution boards, control panels, fixed motors |
| **CAT IV**  | Service entrance, meter, overhead lines           |

For the BA control panel, **CAT III 600 V** is the minimum. The category applies to the weakest component: a CAT IV multimeter with CAT II test leads is a CAT II instrument.

## Voltage, Current, Resistance

- **Voltage** is measured **in parallel**, i.e. between two points. Always against the right reference: mains voltage against N, 24 V against 0 V (M), analogue signals against the DDC signal ground, not against PE.
- **Current** is measured **in series**: break the circuit and insert the meter. A clamp is easier and safer.
- **Resistance** is measured only **de-energised** and with at least one side disconnected. Otherwise you also measure whatever is in parallel.

**The classic mistake:** the test lead is still in the A socket from the last current measurement, and then you measure voltage. That is a short circuit through the meter. Good instruments have a fuse for this; poor ones explode.

### Ghost Voltages and LoZ

A disconnected conductor in a long cable often shows 50 to 150 V on a multimeter, although it is connected to nothing. This is **capacitive coupling** from neighbouring cores, with no power behind it.

The **LoZ function** (low input impedance) loads the line and makes such ghost voltages collapse. Real voltage remains. Do not use it in control circuits with sensitive inputs: the load can make a relay pull in.

### Measuring After a VFD

At the output of a variable frequency drive, normal multimeters show nonsense, even with True RMS. The switched voltage contains high frequencies. Usable values come from a low-pass filter (on some instruments "VFD" or "LPF") or directly from the VFD display.

## Measuring BA Signals

| Signal           | Measure                                             | Normal range    | Fault pattern                                    |
| ---------------- | --------------------------------------------------- | --------------- | ------------------------------------------------ |
| **0–10 V**       | Voltage against signal ground                       | 0–10 V          | 0 V may be a broken wire or a real value         |
| **2–10 V**       | Voltage against signal ground                       | 2–10 V          | Below 2 V: broken wire or supply missing         |
| **4–20 mA**      | Clamp, in series, or voltage across burden resistor | 4–20 mA         | Below 3.6 mA or above 21 mA: fault (NE 43)       |
| **Pt1000**       | Resistance, **disconnected from the DDC**           | see table       | Very high: open circuit, near 0 Ω: short circuit |
| **DI (contact)** | Voltage at the input, contact open/closed           | e.g. 24 V / 0 V | Always 0 V: supply missing or contact stuck      |

That is why **2–10 V** and **4–20 mA** have a "live zero": a broken wire can be told apart from the lowest reading. With 0–10 V it cannot. More in [Signal Types](/wissen/signaltypen).

Across the burden resistor U = I · R applies: with 250 Ω, 4 mA is exactly 1 V and 20 mA exactly 5 V.

### Pt1000 Resistance Values

Per IEC 60751. Disconnect the sensor from the DDC before measuring, otherwise the DDC's measuring current interferes.

| Temperature | Resistance |
| ----------- | ---------- |
| −20 °C      | 921.6 Ω    |
| 0 °C        | 1000.0 Ω   |
| 10 °C       | 1039.0 Ω   |
| 20 °C       | 1077.9 Ω   |
| 25 °C       | 1097.3 Ω   |
| 40 °C       | 1155.4 Ω   |
| 60 °C       | 1232.4 Ω   |
| 80 °C       | 1309.0 Ω   |
| 100 °C      | 1385.1 Ω   |

Rule of thumb: about **3.85 Ω per kelvin**. With a two-wire connection the cable resistance adds: 1 Ω of cable means about 0.26 K too warm. Other sensor types in [Temperature Sensors](/wissen/temperaturfuehler).

## Searching Systematically

1. **Pin down the symptom:** What does the DDC show, what is the plant doing? Is the value frozen, wrong or missing?
2. **Measure at the DDC terminal:** Does the signal there match the displayed value? If yes, the problem is in the DDC (scaling, configuration). If no, it is upstream.
3. **Measure at the field device:** Is the signal right there? Then the fault is in the cable or the terminals in between.
4. **Halve:** On long routes, measure at an intermediate terminal. Each measurement halves the suspect section.
5. **Check the supply:** Many field devices need 24 V. If it is missing, so is the signal.

**Testing outputs:** Most DDCs allow outputs to be overridden by hand. First clarify what will happen: a fan starting against closed dampers, or a valve that lets a coil freeze, quickly becomes major damage. Set back to automatic afterwards.

## Typical Cases

| Symptom                                | Check first                                                     |
| -------------------------------------- | --------------------------------------------------------------- |
| Sensor shows maximum value             | Open circuit: terminal, core, sensor                            |
| Sensor shows minimum value             | Short circuit, pinched cable, moisture                          |
| Value jumps                            | Loose contact, missing shield, cable next to motor cable        |
| Value consistently off by a few kelvin | Cable resistance, wrong sensor type configured                  |
| Actuator does not move                 | 24 V at the actuator, control signal Y, manual override engaged |
| Actuator moves, feedback U missing     | Feedback core, reference ground                                 |
| 4–20 mA at 0 mA                        | Broken wire, transmitter supply                                 |
| DI never reports                       | Voltage at the contact, common reference, contact welded        |

For shielding and earthing problems see [Shielding and Earthing](/wissen/schirmung-erdung).

## Safety

- Work in the panel per the [5+5 life-saving rules](/wissen/5plus5-regeln).
- Probe tips with protective caps, only as much metal as necessary.
- Connect the test lead to the reference first, then to the phase. Remove in reverse order.
- Do not reach across open live parts. Cover them if necessary.

## Standards

- **EN 61010-1** — Safety of measuring equipment, measurement categories
- **EN 61243-3** — Two-pole voltage testers
- **IEC 60751** — Platinum resistance thermometers
- **NAMUR NE 43** — Fault detection on 4–20 mA signals
