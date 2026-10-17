---
title: Hand-0-Auto — Betriebsarten in der GA
title_en: Hand-0-Auto — Operating Modes in BA
slug: hand-0-auto
category: regelung
subcategory: betrieb
tags:
  [
    hand-0-auto,
    hoa,
    betriebsarten,
    handsteuerung,
    automatikbetrieb,
    notbetrieb,
    failsafe,
    verriegelung,
    freigabe,
    schützsteuerung,
    ddc-betriebsarten,
    gleitsteuerung,
    wartungsschalter,
    übersteuerung,
    bypass
  ]
difficulty: grundlagen
area: [ga, elektro]
related:
  [
    ddc-programmierung,
    glt-grundlagen,
    vdi3814,
    alarmmanagement,
    schuetzsteuerungen,
    schemalesen,
    bacnet
  ]
rechner: []
norm: [VDI 3814, EN ISO 16484-5, EN 60204-1, EN ISO 13849-1, KBOB MSRL-Technik]
updated: 2026-10-17
lang: de
---

# Hand-0-Auto — Betriebsarten in der GA

Jeder geschaltete Verbraucher im GA-Schaltschrank, etwa eine Pumpe, ein Ventilator oder ein Verdichter, hat einen **Hand-0-Auto-Schalter**. Damit lässt er sich ohne DDC einschalten, sicher ausschalten oder der Automatik überlassen. Das braucht man bei Inbetriebnahme, Wartung und Störungen.

## Die drei Stellungen

| Stellung | Wirkung                                            |
| -------- | -------------------------------------------------- |
| **Hand** | Verbraucher läuft, unabhängig vom DDC-Ausgang      |
| **0**    | Verbraucher ist aus, auch wenn die DDC einschaltet |
| **Auto** | Der DDC-Ausgang schaltet den Verbraucher           |

## Im Schaltschrank

Der Schalter liegt im Steuerstromkreis des Schützes. In Stellung Auto führt er den Kontakt des DDC-Relais zur Schützspule, in Stellung Hand legt er die Spule direkt an Spannung, in Stellung 0 trennt er sie.

**Wichtig: Die Sicherheitskette bleibt auch in Hand wirksam.** Motorschutz, Not-Halt, Frostschutzthermostat, Brandfallsteuerung und Reparaturschalter liegen in Reihe vor dem Hand-0-Auto-Schalter. Hand überbrückt nur die DDC, nie eine Schutzfunktion. Siehe [Schützsteuerungen](/wissen/schuetzsteuerungen).

Ein Hilfskontakt meldet der DDC, wenn der Schalter **nicht in Auto** steht. So sieht die GLT, dass jemand von Hand eingegriffen hat.

## In der Software

Auch in der DDC und der GLT gibt es Betriebsarten:

| Betriebsart       | Wirkung                                              |
| ----------------- | ---------------------------------------------------- |
| **Automatik**     | Normalbetrieb nach Zeitprogramm und Regelung         |
| **Hand über GLT** | Bediener setzt Ein/Aus oder eine feste Stellgrösse   |
| **Wartung**       | Meldungen der Anlage unterdrückt, zeitlich begrenzt  |
| **Notbetrieb**    | festgelegter Zustand, etwa bei Ausfall eines Fühlers |

## Prioritäten

Von oben nach unten, die höhere gewinnt:

| Rang | Wer oder was                                                                         | Wo            |
| ---- | ------------------------------------------------------------------------------------ | ------------- |
| 1    | Fest verdrahtete Sicherheit: Motorschutz, Not-Halt, Brandfall, Frostschutzthermostat | Verdrahtung   |
| 2    | Hand-0-Auto-Schalter                                                                 | Schaltschrank |
| 3    | Schutzfunktionen in der DDC, etwa Frostschutz-Programm                               | DDC           |
| 4    | Handeingriff über die GLT                                                            | GLT           |
| 5    | Automatik: Zeitprogramm, Regelung                                                    | DDC           |

**BACnet** löst dasselbe mit dem **Priority Array**: 16 Stufen pro schreibbarem Datenpunkt. Stufe 1 und 2 sind für Lebenssicherheit reserviert, Stufe 8 ist der Handeingriff des Bedieners, die Automatik schreibt typisch auf Stufe 16 oder einer tieferen Stufe. Gilt keine Stufe, wird der Relinquish Default verwendet.

## Verhalten bei Ausfall

Was passiert, wenn die DDC ausfällt oder keine Spannung mehr hat? Die Ausgänge fallen ab. Ohne weitere Massnahme gehen Schütze aus, und stetige Ausgänge gehen auf 0 V. Ob das sicher ist, muss man je Anlage prüfen und bewusst festlegen.

| Anlageteil                     | Übliches Verhalten                                                           | Warum                                  |
| ------------------------------ | ---------------------------------------------------------------------------- | -------------------------------------- |
| Aussenluft- und Fortluftklappe | zu, mit Federrücklauf                                                        | Register vor Frost schützen            |
| Ventil Vorerhitzer             | auf, mit Federrücklauf                                                       | Frostschutz                            |
| Ventil Kühlregister            | zu                                                                           | keine ungewollte Kühlung               |
| Brandschutzklappe              | zu, Federrücklauf, Ruhestromprinzip                                          | Brandschutz, nicht von der GA abhängig |
| Heizungspumpe                  | je nach Anlage läuft sie weiter, über invertierten Ausgang oder Notschaltung | Frostschutz des Gebäudes               |
| RWA                            | eigene Steuerzentrale mit Notstrom                                           | nicht von der GA abhängig              |

**Grundsatz:** Der Zustand bei Ausfall muss auf die Sicherheit ausgelegt sein, nicht auf den Komfort oder die Energie. Er gehört in den Funktionsbeschrieb.

## Handeingriff über die GLT

In der GLT kann der Bediener einen Datenpunkt übersteuern, zum Beispiel die Pumpe P1 von Auto auf Hand Ein.

**Gute Praxis:**

- Jeder Handeingriff erzeugt eine Meldung mit Zeitstempel und Benutzer.
- Eine Liste aller aktiven Handeingriffe ist jederzeit abrufbar.
- Wo möglich, ist der Eingriff zeitlich begrenzt, etwa 4 oder 24 Stunden, danach automatisch zurück auf Auto.
- Vergessene Handeingriffe sind eine der häufigsten Ursachen für Energieverschwendung im Betrieb.

## Inbetriebnahme

1. **Hand:** Drehrichtung, Geräusch und Stromaufnahme prüfen. Sicherheitskette auslösen, etwa Motorschutz oder Frostschutzthermostat: Der Verbraucher muss auch in Hand ausgehen.
2. **0:** Die DDC schaltet ein, der Verbraucher bleibt aus. Die Meldung «nicht in Auto» kommt in der GLT an.
3. **Auto:** Die DDC schaltet ein und aus, die Betriebsmeldung folgt.

## Meldungen

| Signal          | Typ    | Herkunft                                                                                                   |
| --------------- | ------ | ---------------------------------------------------------------------------------------------------------- |
| Betriebsmeldung | BI     | am besten ein echter Nachweis: Strömungs- oder Differenzdruckwächter, Statuskontakt des Frequenzumrichters |
| Störmeldung     | BI     | Motorschutz ausgelöst, Störkontakt des Umrichters                                                          |
| Nicht in Auto   | BI     | Hilfskontakt des Hand-0-Auto-Schalters                                                                     |
| Betriebsstunden | Zähler | in der DDC aus der Betriebsmeldung                                                                         |

Ein Hilfskontakt des Schützes zeigt nur, dass das Schütz angezogen hat, nicht dass der Ventilator Luft fördert. Bei gerissenem Keilriemen oder blockierter Pumpe meldet er trotzdem «läuft».

**Überwachung in der DDC:** Befehl Ein, aber nach einer Verzögerung keine Betriebsmeldung → Störung. Die Verzögerung muss den Hochlauf abdecken, typisch 10 bis 60 s, bei Frequenzumrichtern mit langer Rampe auch mehr.

## In der Schweiz: Bedienung nach KBOB

Die KBOB-Empfehlung MSRL-Technik (2000) unterscheidet vier Arten der Bedienung vor Ort und verlangt, die Begriffe konsequent zu verwenden:

| Bedienart               | Wozu                                                                                              | Wo vorzusehen                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Handbedienung**       | Betriebsart wählen, Störung quittieren, wenige Meldeleuchten; nur bei intakter Automationsstation | alle Anlagen                                                        |
| **Notbedienung**        | direkter Eingriff ohne Automationsstation, nur für den Notbetrieb                                 | nur ausserordentlich wichtige Anlagen, mit Bewilligung des Bauherrn |
| **Vorortbedienung**     | Dialog mit der Automationsstation über Bediengerät oder Laptop                                    | nur wo verlangt, mit Bewilligung                                    |
| **Sicherheitsschalter** | Freischalten für Wartungsarbeiten nach SUVA, direkt beim Antrieb                                  | alle Antriebe mit offenen drehenden Teilen                          |

**Anlageschalter statt Schalter pro Verbraucher.** Auf der Schranktür sitzt pro Anlage ein Anlageschalter AUT – AUS – EIN, bei zweistufigen Anlagen AUT – AUS – I – II. Er ist **softwaremässig erfasst**, greift also weder in den Haupt- noch in den Steuerstromkreis ein. Frostschutz, Brandfallsteuerung und andere Sicherheitsfunktionen wirken unabhängig von der Stellung. Dazu kommen ein Quittiertaster und drei Meldeleuchten: grün Betrieb, gelb Vorort (irgendeine Bedienung vor Ort oder ein Sicherheitsschalter aktiv), rot Störung. Bei Anlagen mit nur einem Antrieb kann der Anlageschalter entfallen.

**HAND nur mit Notbedienung.** Wird eine Notbedienung bewilligt, bekommt der Anlageschalter zusätzlich die Stellung HAND. Sie gibt hardwaremässig die Steuerspannung für die Notbedienschalter frei, etwa AUS – EIN pro Antrieb, AUS – FU – BYPASS bei Frequenzumrichtern oder AUTO – HAND mit Potentiometer bei stetigen Ventilen. Die Stellung HAND wird von der Automationsstation überwacht.

**Sicherheitsschalter** (früher Revisionsschalter) gehören direkt an den Antrieb, bei Ventilatoren ausserhalb des Monoblocs. Bis 30 kW bzw. 63 A trennen sie direkt den Hauptstromkreis, darüber den Steuerstromkreis, dann mit Meldeleuchte vor Ort und Hauptschützen mit zwangsgeführten Hilfskontakten. Bei wichtigen Anlagen meldet ein Hilfskontakt die Stellung an die GA. Diese Grenzwerte stammen aus der Empfehlung von 2000 und den damaligen SUVA-Vorschriften; für die Ausführung gelten die aktuellen SUVA-Vorgaben.

**In BACnet** bildet die KBOB das als GA-Funktion «Anlageschalter» ab: Der Wahlschalter ist ein Multi-state Input und schreibt auf **Priorität 7** (Manuell ab Anlage), der Bediener am Leitsystem auf **8**, das Zeitprogramm auf **14**; «Auto» heisst NULL. Der Sicherheitsschalter ist ein Binary Input «Revisionsschalter» und meldet in die Klasse für Revisionsmeldungen. Details in [KBOB BACnet-Vorgaben](/wissen/kbob-bacnet).

## Normen

- **VDI 3814** — Gebäudeautomation, Funktionen und Begriffe
- **EN ISO 16484-5** — BACnet, mit Priority Array
- **EN 60204-1** — Elektrische Ausrüstung von Maschinen, Not-Halt und Steuerstromkreise
- **EN ISO 13849-1** — Sicherheitsbezogene Teile von Steuerungen, wo eine Schutzfunktion über die Steuerung läuft
- **KBOB-Empfehlung MSRL-Technik**, Ausgabe 1, April 2000, Kap. B 4–5

<!-- EN -->

Every switched load in a BA control panel, such as a pump, fan or compressor, has a **hand-off-auto switch**. With it the load can be switched on without the DDC, switched off safely, or left to the automatic. This is needed for commissioning, maintenance and faults.

## The Three Positions

| Position | Effect                                      |
| -------- | ------------------------------------------- |
| **Hand** | load runs, regardless of the DDC output     |
| **0**    | load is off, even if the DDC switches it on |
| **Auto** | the DDC output switches the load            |

## In the Control Panel

The switch sits in the control circuit of the contactor. In Auto it routes the contact of the DDC relay to the contactor coil, in Hand it connects the coil directly to the supply, in 0 it disconnects it.

**Important: the safety chain stays effective in Hand.** Motor protection, emergency stop, frost thermostat, fire control and isolator are in series before the hand-off-auto switch. Hand only bypasses the DDC, never a protective function. See [Contactor Controls](/wissen/schuetzsteuerungen).

An auxiliary contact tells the DDC when the switch is **not in Auto**. That way the BMS sees that someone has intervened manually.

## In the Software

The DDC and the BMS also have operating modes:

| Mode               | Effect                                            |
| ------------------ | ------------------------------------------------- |
| **Automatic**      | normal operation by schedule and control          |
| **Manual via BMS** | operator sets on/off or a fixed output            |
| **Maintenance**    | plant alarms suppressed, limited in time          |
| **Emergency mode** | defined state, for example on failure of a sensor |

## Priorities

From top to bottom, the higher one wins:

| Rank | Who or what                                                                 | Where         |
| ---- | --------------------------------------------------------------------------- | ------------- |
| 1    | Hard-wired safety: motor protection, emergency stop, fire, frost thermostat | wiring        |
| 2    | Hand-off-auto switch                                                        | control panel |
| 3    | Protective functions in the DDC, such as frost program                      | DDC           |
| 4    | Manual override via BMS                                                     | BMS           |
| 5    | Automatic: schedule, control                                                | DDC           |

**BACnet** solves the same with the **priority array**: 16 levels per writable data point. Levels 1 and 2 are reserved for life safety, level 8 is the operator's manual override, the automatic typically writes at level 16 or another low level. If no level is active, the relinquish default applies.

## Behaviour on Failure

What happens when the DDC fails or loses power? The outputs drop out. Without further measures contactors switch off and analogue outputs go to 0 V. Whether that is safe must be checked for each plant and decided deliberately.

| Plant component                | Usual behaviour                                                               | Why                                |
| ------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------- |
| Outdoor and exhaust air damper | closed, spring return                                                         | protect coils from frost           |
| Preheater valve                | open, spring return                                                           | frost protection                   |
| Cooling coil valve             | closed                                                                        | no unwanted cooling                |
| Fire damper                    | closed, spring return, fail-safe principle                                    | fire protection, independent of BA |
| Heating pump                   | depending on plant it keeps running, via inverted output or emergency circuit | frost protection of the building   |
| Smoke and heat exhaust         | own control unit with emergency power                                         | independent of BA                  |

**Principle:** the failure state must be designed for safety, not for comfort or energy. It belongs in the functional description.

## Manual Override via BMS

In the BMS the operator can override a data point, for example pump P1 from Auto to Manual On.

**Good practice:**

- Every override creates a message with time stamp and user.
- A list of all active overrides is available at any time.
- Where possible, the override is time-limited, for example 4 or 24 hours, then automatically back to Auto.
- Forgotten overrides are one of the most common causes of wasted energy in operation.

## Commissioning

1. **Hand:** check direction of rotation, noise and current draw. Trip the safety chain, for example motor protection or frost thermostat: the load must stop even in Hand.
2. **0:** the DDC switches on, the load stays off. The "not in Auto" message arrives in the BMS.
3. **Auto:** the DDC switches on and off, the run status follows.

## Signals

| Signal          | Type    | Source                                                                                |
| --------------- | ------- | ------------------------------------------------------------------------------------- |
| Run status      | BI      | ideally real proof: flow or differential pressure switch, status contact of the drive |
| Fault           | BI      | motor protection tripped, fault contact of the drive                                  |
| Not in Auto     | BI      | auxiliary contact of the hand-off-auto switch                                         |
| Operating hours | counter | in the DDC from the run status                                                        |

An auxiliary contact on the contactor only shows that the contactor has pulled in, not that the fan is moving air. With a broken belt or a blocked pump it still reports "running".

**Monitoring in the DDC:** command on, but no run status after a delay → fault. The delay must cover the start-up, typically 10 to 60 s, longer with drives that have a long ramp.

## In Switzerland: Operation per KBOB

The KBOB recommendation MSRL technology (2000) distinguishes four kinds of local operation and requires the terms to be used consistently:

| Kind                    | Purpose                                                                                          | Where to provide                                           |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| **Manual operation**    | Select mode, acknowledge faults, a few indicator lamps; only with the automation station working | all plants                                                 |
| **Emergency operation** | Direct intervention without the automation station, for emergency running only                   | only exceptionally important plants, approved by the owner |
| **Local operation**     | Dialogue with the automation station via operator unit or laptop                                 | only where required, with approval                         |
| **Safety switch**       | Isolation for maintenance per SUVA, directly at the drive                                        | all drives with exposed rotating parts                     |

**Plant switch instead of one switch per load.** On the panel door there is one plant switch per plant, AUTO – OFF – ON, or AUTO – OFF – I – II for two-stage plants. It is **read by software** and acts on neither the main nor the control circuit. Frost protection, fire control and other safety functions work regardless of its position. In addition there is an acknowledge button and three lamps: green running, yellow local (any local operation or a safety switch active), red fault. Plants with a single drive can do without the plant switch.

**HAND only with emergency operation.** If emergency operation is approved, the plant switch gets an additional HAND position. It releases the control voltage for the emergency switches in hardware, e.g. OFF – ON per drive, OFF – VFD – BYPASS for frequency converters or AUTO – HAND with a potentiometer for modulating valves. The automation station monitors the HAND position.

**Safety switches** (formerly maintenance switches) belong directly at the drive, for fans outside the monobloc unit. Up to 30 kW or 63 A they break the main circuit directly; above that the control circuit, then with a local indicator lamp and main contactors with positively driven auxiliary contacts. For important plants an auxiliary contact reports the position to BA. These limits come from the 2000 recommendation and the SUVA rules of that time; installation must follow the current SUVA requirements.

**In BACnet** KBOB models this as the BA function "plant switch": the selector is a multi-state input and writes at **priority 7** (manual at plant), the operator at the management system at **8**, the schedule at **14**; "auto" means NULL. The safety switch is a binary input "maintenance switch" and reports in the class for service messages. Details in [KBOB BACnet requirements](/wissen/kbob-bacnet).

## Standards

- **VDI 3814** — Building automation, functions and terms
- **EN ISO 16484-5** — BACnet, including the priority array
- **EN 60204-1** — Electrical equipment of machines, emergency stop and control circuits
- **EN ISO 13849-1** — Safety-related parts of control systems, where a protective function runs through the controller
- **KBOB recommendation MSRL technology**, edition 1, April 2000, ch. B 4–5
