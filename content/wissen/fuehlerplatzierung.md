---
title: Fühlerplatzierung — wo Fühler hingehören und warum sie falsch messen
title_en: Sensor Placement — Where Sensors Belong and Why They Measure Wrongly
slug: fuehlerplatzierung
category: sensoren
subcategory: grundlagen
tags:
  [
    fühlerplatzierung,
    temperaturfühler,
    tauchhülse,
    anlegefühler,
    kanalfühler,
    mittelwertfühler,
    schichtung,
    raumfühler,
    aussenfühler,
    druckfühler,
    beruhigungsstrecke,
    zeitkonstante,
    messkonzept
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [temperaturfuehler, sensoren, drucksensoren, durchflussmessung, messen-fehlersuche, regelkreise]
norm: [SIA 382/1, VDI 3814]
updated: 2026-10-17
lang: de
---

# Fühlerplatzierung — wo Fühler hingehören und warum sie falsch messen

Ein Regler zeigt die Temperatur auf ein Zehntel genau an. Ob das stimmt, entscheidet nicht der Fühler, sondern **wo** er sitzt. Falsch platzierte Fühler sind eine der häufigsten Ursachen für schlechtes Regelverhalten, Frostalarme und verschenkte Energie.

## Drei Fragen vor jeder Montage

1. **Misst der Fühler, was geregelt werden soll?** Der Messort muss für die Regelaufgabe repräsentativ sein.
2. **Ist das Medium dort gut durchmischt?** Sonst misst der Fühler eine Schicht und nicht den Mittelwert.
3. **Ist der Fühler zugänglich** für Elektriker, Inbetriebnahme und Service?

## Schnell genug? Die Zeitkonstante

Ein Fühler reagiert nie sofort. Richtwerte laut Siemens-Unterlage:

| Fühlertyp                       | Verzugszeit T<sub>u</sub> | Ausgleichszeit T<sub>g</sub> |
| ------------------------------- | ------------------------- | ---------------------------- |
| Thermoelement                   | 1 – 5 s                   | 5 – 25 s                     |
| Widerstandsthermometer (Pt, Ni) | 2 – 5 s                   | 40 – 100 s                   |
| Halbleiter (NTC)                | 1 – 5 s                   | 5 – 25 s                     |

Die Bauform und der Einbau zählen mehr als das Messelement. Ein **Tauchfühler** hat drei Verzögerungen in Reihe: die Tauchhülse, den Luftspalt zwischen Hülse und Fühler und den Fühler selbst. Am meisten bremst der **Luftspalt**, weil Luft schlecht leitet. Wärmeleitpaste oder eine Ölfüllung machen den Fühler deutlich schneller.

Ein träger Fühler ist an einer trägen Strecke kein Problem, an einer schnellen schon: Er misst Schwankungen kleiner und später, als sie sind. Der Regler sieht dann eine ruhigere Anlage, als sie ist.

Auch die **Distanz** zwischen Stellglied und Fühler zählt. Jeder Meter, den das Medium zurücklegen muss, ist Totzeit. Darum Fühler so nahe wie möglich, aber erst dort, wo das Medium durchmischt ist.

## Wasser

- **Mindestens 1 m nach dem Mischpunkt**, also nach dem Mischventil, und **nach der Pumpe**. Auch eine Pumpe mischt aber nicht garantiert vollständig.
- **Tauchfühler:** Tauchtiefe mindestens bis zur Rohrmitte, das aktive Element ganz im Wasser. Am besten in einem Bogen, mit der Spitze gegen die Strömung. Tauchhülse mit Wärmeleitpaste füllen.
- **Anlegefühler:** Rohr metallisch blank machen, mit Spannband fest anziehen, in die Isolation einfassen. Ein gerades Rohrstück ist besser als ein Bogen.
- Nach dem Zusammenfluss zweier Ströme mit verschiedener Temperatur genug Abstand halten, sonst misst der Fühler eine Strähne.

## Luft im Kanal

Luft ist viel schwieriger als Wasser. Nach jeder Luftbehandlung, also nach Mischklappen, Erhitzer, Kühler, WRG oder Befeuchter, bilden sich **Temperaturschichten**. Ventilatoren und Kanalbögen bauen sie kaum ab. Folgen sind falsche Messwerte, ungleich belastete Filter und Register, Frostalarme und bei doppelseitig saugenden Ventilatoren sogar eine kalte und eine warme Raumseite.

| Fühlertyp                        | Einsatz und Montage                                                                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Stabfühler**                   | nur wo die Luft gut gemischt ist. Nie direkt nach Mischklappen, Erhitzer, Kühler oder WRG.                                                                                           |
| **Mittelwertfühler** (Kapillare) | wo Schichten möglich sind. Kapillare in gleichmässigen Schlaufen über den ganzen Querschnitt, ganze Länge im Kanal, Abstand zum Register mindestens 50 mm, Kanalwand nicht berühren. |
| **Frostschutzfühler**            | Kapillare direkt hinter dem Erhitzer, über die ganze Fläche verteilt, siehe [Regelung von Lüftungsanlagen](/wissen/rlt-regelung)                                                     |

**Wo im Kanal?**

- **Zulufttemperatur:** nach dem letzten Behandlungselement. Sitzt der Ventilator danach, dahinter. Sonst mindestens 0.5 m nach dem letzten Element.
- **Zuluft-Begrenzung:** möglichst nahe beim Eintritt in den Raum.
- **Ablufttemperatur:** immer **vor** dem Abluftventilator, sonst misst er dessen Motorwärme mit.
- **Nach Wäschern** mindestens 1 m, nach Dampfbefeuchtern nach Herstellerangabe.
- Nahe an Registern, besonders an Elektro-Erhitzern, verfälscht **Strahlung** die Messung.

Ein Mittelwertfühler misst den Durchschnitt, die Schichtung bleibt trotzdem bestehen. Teilt sich der Kanal danach auf, bekommen die Abzweige verschieden warme Luft. Bei unklaren Verhältnissen den Querschnitt mit einer Handsonde ausmessen, bevor der Fühler gesetzt wird.

## Raumfühler

- etwa **1.5 m hoch**, in der Randzone des Aufenthaltsbereichs
- mindestens 50 cm von der nächsten Wand oder Ecke, nicht in Nischen, hinter Vorhängen oder in Regalen
- **nicht** an Aussenwänden, Kaminwänden oder Wänden mit Warmwasserleitungen
- **keine** direkte Sonne, auch keine wandernde Sonne im Lauf des Tages
- nicht neben Türen, Heizkörpern, Geräten oder in Zugluft
- auf Massivwänden aus Beton oder Stahl mit **wärmedämmender Unterlage**
- **Leerrohr abdichten.** Durch das Elektro-Leerrohr strömt sonst kalte oder warme Luft aus einem anderen Raum direkt auf den Fühler. Ein Klassiker bei «unerklärlich» falschen Raumtemperaturen.

## Aussenfühler

Die alte Regel «immer an die Nordseite» gilt so nicht mehr. Der Fühler muss für das repräsentativ sein, was er führt:

- führt er eine bestimmte Zone, etwa die Südzone, gehört er auf deren Seite
- ohne klare Zonenzuordnung meist **Nord- oder Nordostfassade**
- Höhe: bei Gebäuden bis drei Geschosse auf etwa zwei Dritteln der Gebäudehöhe, bei höheren zwischen zweitem und drittem Geschoss
- **nie** an der Sonne, nicht auf Metallfassaden, die sich aufheizen, nicht über Fenstern oder Fortluftöffnungen, nicht unter Balkonen oder hinter Mauervorsprüngen
- **nicht** im Aussenluftkanal hinter der Klappe, dort misst er bei stehender Anlage die Raumluft des Technikraums

## Druck und Luftgeschwindigkeit

Nach Bögen, Abzweigen, Klappen, Ventilatoren und Querschnittsänderungen ist das Strömungsprofil verzerrt, direkt nach einem Bogen strömt die Luft am Rand sogar zurück. Darum braucht es **Beruhigungsstrecken**:

- Mindestabstand nach einer Störung etwa **6 Durchmesser**. Bei Rechteckkanälen gilt der gleichwertige Durchmesser D<sub>gl</sub> = 2 · a · b / (a + b).
- Nach Filtern, Erhitzern und Kühlern ist das Profil recht gleichmässig, ein kleiner Abstand genügt.
- Die Sonde muss **parallel zur Strömung** an einer geraden Kanalwand sitzen und darf keinen dynamischen Druck mitmessen. Bohrung gratfrei.
- Bei **Differenzdruck** müssen beide Messstellen vergleichbare Strömung haben.
- **Druckfühler senkrecht montieren**, Anschlüsse unten. Liegen die Anschlussstutzen tiefer als die Messstellen oder zeigen sie nach oben, sammelt sich Kondensat im Fühler. Membranfühler in falscher Lage messen zudem bis etwa 15 Pa falsch.
- Schläuche dicht und trocken, eine Schlaufe fängt Schmutz ab.

**Kanaldruckregelung:** Der Fühler gehört weit hinaus ins Netz, etwa auf zwei Drittel der Strecke, vor die Volumenstromregler. Sitzt er direkt nach dem Ventilator, hält der Regler dort einen hohen Druck, den das Netz gar nicht braucht, und der Ventilator verbraucht mehr Strom. Mehr in [Druckregelung in der Lüftung](/wissen/druckregelung-lueftung).

Für **Volumenstrommessungen** von Hand wird der Querschnitt in gleich grosse Teilflächen aufgeteilt und in deren Mitte gemessen, bei runden Kanälen mindestens 10 Punkte. Thermische Anemometer messen auch kleine Geschwindigkeiten bis auf wenige cm/s.

## Messfehler oder Messkonzeptfehler?

Nicht jeder falsche Wert ist ein Fehler des Fühlers. Siemens unterscheidet:

- **Messfehler:** liegt im Gerät, etwa Toleranz, Drift oder ein zu träger Fühler
- **Konzept-, Planungs- und Montagefehler:** falscher Ort, Schichtung, offenes Leerrohr
- **Interpretationsfehler:** abgelesen, bevor der Wert sich eingeschwungen hat, oder falsch verglichen

Vor der Fehlersuche deshalb klären: Was soll die Messung leisten, wie genau muss sie sein, wie funktioniert die Strecke und wie das Gerät? Erst wenn das klar ist, lohnt sich der Tausch eines Fühlers. Mehr in [Messen und Fehlersuche](/wissen/messen-fehlersuche).

## Messungen planen

Für grössere Messkampagnen, etwa zur Optimierung oder Abnahme, lohnt ein **Messkonzept**: Ziel, Messgrössen, Dauer, Verantwortung, Auswertung. Daraus folgt der **Messplan** mit Messstellenplan, Positionsnummern für jeden Messpunkt, Auswahl der Geräte nach Genauigkeit und Einsatzbedingungen und einem einheitlichen Zeitraster. Ausgewertet wird auf einer gemeinsamen Zeitachse. Ein Schlussprotokoll hält Zustand, gefundene Fehler, Massnahmen und offene Punkte fest.

## Quellen

- Siemens Schweiz AG: «Messtechnik», Schulungsunterlage BT_0097, 2022, Kap. 2, 3, 5 und 6

<!-- EN -->

A controller displays the temperature to a tenth of a degree. Whether that is right is decided not by the sensor but by **where** it sits. Badly placed sensors are one of the most common causes of poor control, frost alarms and wasted energy.

## Three Questions Before Every Installation

1. **Does the sensor measure what is to be controlled?** The measuring point must be representative of the control task.
2. **Is the medium well mixed there?** Otherwise the sensor measures a layer and not the average.
3. **Is the sensor accessible** for electricians, commissioning and service?

## Fast Enough? The Time Constant

A sensor never reacts instantly. Guide values according to the Siemens document:

| Sensor type                     | Dead time T<sub>u</sub> | Time constant T<sub>g</sub> |
| ------------------------------- | ----------------------- | --------------------------- |
| Thermocouple                    | 1 – 5 s                 | 5 – 25 s                    |
| Resistance thermometer (Pt, Ni) | 2 – 5 s                 | 40 – 100 s                  |
| Semiconductor (NTC)             | 1 – 5 s                 | 5 – 25 s                    |

Construction and installation matter more than the sensing element. An **immersion sensor** has three delays in series: the thermowell, the air gap between well and sensor, and the sensor itself. The **air gap** slows it most, because air conducts poorly. Thermal paste or an oil filling makes the sensor much faster.

A slow sensor on a slow process is no problem, but on a fast one it is: it measures fluctuations smaller and later than they are. The controller then sees a calmer plant than it is.

The **distance** between actuator and sensor matters too. Every metre the medium has to travel is dead time. So place sensors as close as possible, but only where the medium is mixed.

## Water

- **At least 1 m after the mixing point**, i.e. after the mixing valve, and **after the pump**. Even a pump does not guarantee complete mixing, though.
- **Immersion sensor:** insertion depth at least to the pipe centre, the active element fully in the water. Ideally in a bend, with the tip facing the flow. Fill the thermowell with thermal paste.
- **Strap-on sensor:** make the pipe bare metal, tighten firmly with a strap, enclose in the insulation. A straight pipe section is better than a bend.
- After two streams of different temperature join, keep enough distance, otherwise the sensor measures a streak.

## Air in the Duct

Air is much harder than water. After every air treatment, i.e. after mixing dampers, heater, cooler, heat recovery or humidifier, **temperature stratification** forms. Fans and duct bends barely break it up. Consequences are wrong readings, unevenly loaded filters and coils, frost alarms and, with double-inlet fans, even a cold and a warm side of the room.

| Sensor type                      | Use and installation                                                                                                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Rod sensor**                   | only where the air is well mixed. Never directly after mixing dampers, heater, cooler or heat recovery.                                                                          |
| **Averaging sensor** (capillary) | where stratification is possible. Capillary in even loops across the whole cross-section, full length inside the duct, at least 50 mm from the coil, not touching the duct wall. |
| **Frost sensor**                 | capillary directly behind the heater, spread across the whole face, see [Controlling Ventilation Units](/wissen/rlt-regelung)                                                    |

**Where in the duct?**

- **Supply air temperature:** after the last treatment element. If the fan follows, behind it. Otherwise at least 0.5 m after the last element.
- **Supply air limit:** as close as possible to the room inlet.
- **Extract air temperature:** always **before** the extract fan, otherwise it also measures the motor heat.
- **After washers** at least 1 m, after steam humidifiers per manufacturer's data.
- Close to coils, especially electric heaters, **radiation** distorts the reading.

An averaging sensor measures the average; the stratification remains. If the duct then splits, the branches get air of different temperatures. Where conditions are unclear, survey the cross-section with a hand probe before placing the sensor.

## Room Sensors

- about **1.5 m high**, at the edge of the occupied zone
- at least 50 cm from the nearest wall or corner, not in niches, behind curtains or in shelves
- **not** on external walls, chimney walls or walls with hot water pipes
- **no** direct sun, including sun that moves across during the day
- not next to doors, radiators, equipment or in draughts
- on solid concrete or steel walls with an **insulating base**
- **Seal the conduit.** Otherwise cold or warm air from another room flows through the electrical conduit straight onto the sensor. A classic cause of "inexplicably" wrong room temperatures.

## Outdoor Sensors

The old rule "always on the north side" no longer holds as such. The sensor must be representative of what it controls:

- if it controls a particular zone, such as the south zone, it belongs on that side
- without a clear zone assignment, usually the **north or north-east façade**
- height: for buildings up to three storeys at about two-thirds of the building height, for taller ones between the second and third storey
- **never** in the sun, not on metal façades that heat up, not above windows or exhaust openings, not under balconies or behind wall projections
- **not** in the outdoor air duct behind the damper; there it measures the plant room air when the unit is off

## Pressure and Air Velocity

After bends, branches, dampers, fans and changes in cross-section the flow profile is distorted; directly after a bend the air even flows backwards at the edge. That is why **straight runs** are needed:

- Minimum distance after a disturbance about **6 diameters**. For rectangular ducts the equivalent diameter D<sub>eq</sub> = 2 · a · b / (a + b) applies.
- After filters, heaters and coolers the profile is fairly even; a small distance suffices.
- The probe must sit **parallel to the flow** on a straight duct wall and must not pick up dynamic pressure. Drill the hole burr-free.
- For **differential pressure**, both measuring points must have comparable flow.
- **Mount pressure sensors vertically**, connections at the bottom. If the connection spigots are lower than the measuring points or point upwards, condensate collects in the sensor. Diaphragm sensors in the wrong orientation also read up to about 15 Pa wrong.
- Tubes tight and dry; a loop catches dirt.

**Duct pressure control:** the sensor belongs far out in the network, about two-thirds of the way, before the airflow controllers. If it sits directly after the fan, the controller holds a high pressure there that the network does not need, and the fan uses more power. More in [Pressure Control in Ventilation](/wissen/druckregelung-lueftung).

For manual **airflow measurements** the cross-section is divided into equal sub-areas and measured at their centres, at least 10 points for round ducts. Thermal anemometers also measure low velocities down to a few cm/s.

## Measurement Error or Concept Error?

Not every wrong value is a sensor fault. Siemens distinguishes:

- **Measurement errors:** lie in the device, such as tolerance, drift or a sensor that is too slow
- **Concept, design and installation errors:** wrong location, stratification, open conduit
- **Interpretation errors:** read before the value settled, or wrongly compared

Before troubleshooting, therefore clarify: what should the measurement achieve, how accurate must it be, how does the process work and how does the device work? Only when that is clear is it worth replacing a sensor. More in [Measuring and Troubleshooting](/wissen/messen-fehlersuche).

## Planning Measurements

For larger measurement campaigns, for optimisation or acceptance, a **measurement concept** pays off: goal, quantities, duration, responsibility, evaluation. From it follows the **measurement plan** with a measuring point plan, position numbers for each point, choice of instruments by accuracy and operating conditions, and a uniform time grid. Evaluation is on a common time axis. A final report records condition, faults found, measures and open items.

## Sources

- Siemens Schweiz AG: "Messtechnik", training document BT_0097, 2022, ch. 2, 3, 5 and 6
