---
title: Wärmemengenzähler — Funktion, Einbau und Auslesung
title_en: Heat Meters — Function, Installation and Readout
slug: waermemengenzaehler
category: energie
subcategory: zaehler
tags:
  [
    wärmemengenzähler,
    wärmezähler,
    kältezähler,
    wmz,
    durchfluss,
    temperaturdifferenz,
    mbus,
    energiemessung,
    abrechnung,
    einbau,
    kalibrierung,
    ultraschall,
    flügelrad,
    wärmeleistung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [mbus, sensoren, ems-lastmanagement, hydraulischer-abgleich, fernwaerme]
norm: [EN 1434, MID (2014/32/EU), WELMEC 7.2]
updated: 2026-10-14
lang: de
---

# Wärmemengenzähler — Funktion, Einbau und Auslesung

Ein **Wärmezähler** misst die Wärme- oder Kältemenge, die in einem Wasserkreis übertragen wird. Er wird für die Abrechnung, für das Energiemonitoring und für die Fehlersuche in der Hydraulik gebraucht.

## Messprinzip

Der Zähler besteht aus drei Teilen:

- **Durchflusssensor** im Vor- oder Rücklauf
- **Temperaturfühlerpaar**, ein Fühler im Vorlauf, einer im Rücklauf
- **Rechenwerk**, das aus beiden laufend die Leistung berechnet und die Energie aufsummiert

<p class="formel">Q = ∫ V̇ · ρ · c<sub>p</sub> · (θ<sub>VL</sub> − θ<sub>RL</sub>) dt</p>

Für Wasser ist ρ · c<sub>p</sub> ≈ 4190 kJ/(m³·K) = 1.163 kWh/(m³·K):

<p class="formel">P [kW] ≈ 1.163 · V̇ [m³/h] · ΔT [K]</p>

Das Rechenwerk rechnet mit den temperaturabhängigen Stoffwerten von Wasser und ist deshalb genauer als diese Faustformel.

## Durchflusssensoren

| Prinzip                 | Eigenschaften                                                       |
| ----------------------- | ------------------------------------------------------------------- |
| **Ultraschall**         | keine beweglichen Teile, heute Standard                             |
| **Flügelrad**           | mechanisch, günstig, empfindlich auf Schmutz, im Bestand verbreitet |
| **Magnetisch-induktiv** | sehr genau, für grosse Nennweiten                                   |

## Genauigkeitsklassen nach EN 1434

Die Klassen beziehen sich auf den Durchflusssensor. Die zulässige Abweichung hängt vom Durchfluss ab und wird bei kleinem Durchfluss grösser.

| Klasse | Fehlergrenze Durchflusssensor   | Höchstens |
| ------ | ------------------------------- | --------- |
| **1**  | ±(1 + 0.01 · q<sub>p</sub>/q) % | 3.5 %     |
| **2**  | ±(2 + 0.02 · q<sub>p</sub>/q) % | 5 %       |
| **3**  | ±(3 + 0.05 · q<sub>p</sub>/q) % | 5 %       |

q_p ist der Nenndurchfluss, q der aktuelle. **Klasse 1 ist die genaueste.** Für Gebäude sind Klasse 2 und 3 üblich. Dazu kommen die Fehlergrenzen von Fühlerpaar und Rechenwerk.

Ein Zähler, der viel zu gross gewählt ist, läuft meist bei kleinem Durchfluss und misst dort ungenau. Den Zähler nach dem tatsächlichen Durchfluss auslegen, nicht nach der Rohrnennweite.

## Eichung und Abrechnung

Werden Kosten nach dem Zähler verrechnet, braucht es einen konformitätsbewerteten Zähler, und er muss periodisch nachgeprüft oder ersetzt werden.

| Land | Rechtsgrundlage                                                                                              |
| ---- | ------------------------------------------------------------------------------------------------------------ |
| CH   | Messmittelverordnung und Verordnung des EJPD über Messmittel für thermische Energie; Auskunft gibt das METAS |
| EU   | Messgeräterichtlinie 2014/32/EU (MID), Anhang MI-004 für Wärmezähler                                         |
| DE   | Mess- und Eichgesetz, Eichfrist für Wärmezähler 5 Jahre                                                      |

Die MID gilt für Wasser. **Kältezähler mit Glykol** brauchen ein Rechenwerk, das Art und Konzentration des Frostschutzmittels berücksichtigt. Ohne diese Korrektur misst der Zähler einige Prozent falsch.

## Einbau

- **Einbauort:** Die meisten Zähler sitzen im **Rücklauf**, weil die tiefere Temperatur den Durchflusssensor schont. Der Einbauort muss im Rechenwerk eingestellt sein, sonst stimmt die Dichtekorrektur nicht.
- **Beruhigungsstrecken** nach Herstellerangabe. Viele Ultraschallzähler brauchen keine; Flügelradzähler und grosse Nennweiten oft schon.
- **Absperrungen** vor und nach dem Zähler, damit er sich ohne Entleeren der Anlage tauschen lässt.
- **Fühlerpaar:** Die beiden Fühler sind als Paar abgeglichen und dürfen nicht einzeln getauscht oder die Kabel gekürzt werden. Bei kleinen Nennweiten tauchen sie direkt ins Wasser ein, etwa über einen Kugelhahn mit Fühleranschluss.
- **Kältezähler** brauchen ein für Kondensat geeignetes Gehäuse, oft mit abgesetztem Rechenwerk.

## Auslesung

| Schnittstelle              | Beschreibung                                          |
| -------------------------- | ----------------------------------------------------- |
| **M-Bus**                  | Standard für Zähler nach EN 13757, Zweidrahtbus       |
| **Wireless M-Bus**         | Funk, meist 868 MHz, für Nachrüstung und Fernablesung |
| **Modbus, BACnet**         | bei manchen Geräten als Option                        |
| **Impulsausgang**          | ein Impuls je Energiemenge, nur Zählerstand           |
| **Optische Schnittstelle** | Infrarot-Auslesekopf vor Ort                          |

Über M-Bus liefert der Zähler typisch: Energie und Volumen kumuliert, aktuelle Leistung und Durchfluss, Vor- und Rücklauftemperatur, Stichtagswerte und Fehlercode. Die Anbindung läuft über einen M-Bus-Pegelwandler oder ein Gateway an die GLT. Siehe [M-Bus](/wissen/mbus).

## Was die GA damit anfangen kann

| Auswertung                         | Zeigt                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| **Spreizung** ΔT über die Zeit     | zu kleine Spreizung heisst: zu viel Durchfluss, Abgleich oder Regelung prüfen |
| **Leistung** über Aussentemperatur | Energie-Signatur, Heizgrenze, Fehlbetrieb im Sommer                           |
| **Rücklauftemperatur**             | entscheidend für Brennwertkessel, Wärmepumpen, Fernwärme                      |
| **Fehlercode**                     | Fühlerbruch, Luft im Durchflusssensor, Batterie                               |

## Normen

- **EN 1434** — Wärmezähler, Anforderungen, Prüfung, Einbau
- **2014/32/EU (MID)**, Anhang MI-004 — Wärmezähler im EU-Recht
- **EN 13757** — Kommunikationssysteme für Zähler, M-Bus und Wireless M-Bus
- **WELMEC 7.2** — Leitfaden zur Software in Messgeräten

<!-- EN -->

A **heat meter** measures the amount of heat or cooling transferred in a water circuit. It is used for billing, for energy monitoring and for troubleshooting the hydraulics.

## Measuring Principle

The meter consists of three parts:

- **Flow sensor** in the flow or return
- **Temperature sensor pair**, one in the flow, one in the return
- **Calculator**, which continuously computes the power from both and totals the energy

<p class="formel">Q = ∫ V̇ · ρ · c<sub>p</sub> · (θ<sub>flow</sub> − θ<sub>return</sub>) dt</p>

For water ρ · c<sub>p</sub> ≈ 4190 kJ/(m³·K) = 1.163 kWh/(m³·K):

<p class="formel">P [kW] ≈ 1.163 · V̇ [m³/h] · ΔT [K]</p>

The calculator uses the temperature-dependent properties of water and is therefore more accurate than this rule of thumb.

## Flow Sensors

| Principle           | Properties                                                               |
| ------------------- | ------------------------------------------------------------------------ |
| **Ultrasonic**      | no moving parts, standard today                                          |
| **Vane wheel**      | mechanical, inexpensive, sensitive to dirt, common in existing buildings |
| **Electromagnetic** | very accurate, for large nominal sizes                                   |

## Accuracy Classes per EN 1434

The classes refer to the flow sensor. The permissible error depends on the flow rate and grows at low flow.

| Class | Error limit flow sensor         | Maximum |
| ----- | ------------------------------- | ------- |
| **1** | ±(1 + 0.01 · q<sub>p</sub>/q) % | 3.5 %   |
| **2** | ±(2 + 0.02 · q<sub>p</sub>/q) % | 5 %     |
| **3** | ±(3 + 0.05 · q<sub>p</sub>/q) % | 5 %     |

q_p is the permanent flow rate, q the actual one. **Class 1 is the most accurate.** Classes 2 and 3 are usual for buildings. The error limits of the sensor pair and the calculator come on top.

A meter that is much too large usually runs at low flow and measures inaccurately there. Size the meter for the actual flow, not for the pipe size.

## Verification and Billing

If costs are allocated by the meter, a conformity-assessed meter is required, and it must be periodically re-verified or replaced.

| Country | Legal basis                                                                                                                |
| ------- | -------------------------------------------------------------------------------------------------------------------------- |
| CH      | Measuring Instruments Ordinance and FDJP Ordinance on measuring instruments for thermal energy; METAS provides information |
| EU      | Measuring Instruments Directive 2014/32/EU (MID), annex MI-004 for heat meters                                             |
| DE      | Measurement and Verification Act, verification period for heat meters 5 years                                              |

The MID applies to water. **Cooling meters with glycol** need a calculator that takes type and concentration of the antifreeze into account. Without this correction the meter is off by several percent.

## Installation

- **Location:** most meters sit in the **return**, because the lower temperature is easier on the flow sensor. The location must be set in the calculator, otherwise the density correction is wrong.
- **Straight runs** as specified by the manufacturer. Many ultrasonic meters need none; vane wheel meters and large sizes often do.
- **Isolating valves** before and after the meter, so it can be replaced without draining the system.
- **Sensor pair:** the two sensors are matched as a pair and must not be replaced individually or have their cables shortened. In small sizes they are immersed directly in the water, for example via a ball valve with sensor port.
- **Cooling meters** need a housing suited for condensation, often with a remote calculator.

## Readout

| Interface             | Description                                             |
| --------------------- | ------------------------------------------------------- |
| **M-Bus**             | standard for meters per EN 13757, two-wire bus          |
| **Wireless M-Bus**    | radio, usually 868 MHz, for retrofit and remote reading |
| **Modbus, BACnet**    | optional on some devices                                |
| **Pulse output**      | one pulse per energy quantity, meter reading only       |
| **Optical interface** | infrared reading head on site                           |

Via M-Bus the meter typically delivers: cumulative energy and volume, current power and flow, flow and return temperature, billing date values and error code. It connects to the BMS via an M-Bus level converter or a gateway. See [M-Bus](/wissen/mbus).

## What the BA Can Do with It

| Evaluation                            | Shows                                                         |
| ------------------------------------- | ------------------------------------------------------------- |
| **Temperature difference** over time  | too small means too much flow; check balancing or control     |
| **Power** against outdoor temperature | energy signature, heating limit, faulty operation in summer   |
| **Return temperature**                | decisive for condensing boilers, heat pumps, district heating |
| **Error code**                        | sensor break, air in the flow sensor, battery                 |

## Standards

- **EN 1434** — Heat meters, requirements, testing, installation
- **2014/32/EU (MID)**, annex MI-004 — heat meters in EU law
- **EN 13757** — Communication systems for meters, M-Bus and wireless M-Bus
- **WELMEC 7.2** — Software guide for measuring instruments
