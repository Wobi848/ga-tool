---
title: Energie-Messkonzept — welche Zähler wo
title_en: Energy Metering Concept — Which Meters Where
slug: energie-messkonzept
category: energie
subcategory: planung
tags:
  [
    messkonzept,
    energiemessung,
    submetering,
    wärmezähler,
    elektrozähler,
    messstellenschema,
    messstellenliste,
    impulszähler,
    energiestatistik,
    energiesignatur,
    kbob,
    vhka
  ]
difficulty: grundlagen
area: [ga, hlk, elektro]
related:
  [
    energiemessung,
    waermemengenzaehler,
    mbus,
    ems-lastmanagement,
    iso50001,
    anlagenkennzeichnung,
    kbob
  ]
norm: [KBOB Energie-Messkonzept, KBOB Gebäudetechnik 2026]
updated: 2026-10-17
lang: de
---

# Energie-Messkonzept — welche Zähler wo

Wer nicht misst, kann nicht optimieren. Wer aber an jeder Pumpe einen Zähler setzt, zahlt mehr für die Messung als er je einspart. Ein **Messkonzept** legt fest, wo gemessen wird, womit, wie die Werte zur GA kommen und wer sie auswertet. Die KBOB-Empfehlung Gebäudetechnik 2026 verlangt dafür ein **Gesamtmesskonzept** aus Messstellenschema und Messstellenliste, in dem die Messkonzepte aller Gewerke zusammengeführt werden. Die Systematik dazu stammt aus der KBOB-Empfehlung Energie-Messkonzept von 2000 und ist im Kern bis heute brauchbar.

## Drei Stufen

1. **Energie-Input pro Anlage:** alles, was über die Systemgrenze der Liegenschaft fliesst. Meist reichen dafür die Verrechnungszähler der Energielieferanten. Bei lagerbaren Energieträgern wie Öl, Flüssiggas oder Holz wird der Lagerbestand gemessen, bei mehreren Tanks besser ein Zähler in der Leitung. Auch eigene Produktion, die das Areal verlässt, gehört dazu.
2. **Energieverbrauch pro Objekt:** Strom, Wärme, Kälte, Gas, Wasser je Gebäude. Diese Zähler sind nicht eichpflichtig.
3. **Aufteilung innerhalb eines Objekts:** auf Verbrauchergruppen, grosse Prozessverbraucher und Anlagen mit Garantiewerten wie Wärmepumpen.

Die ersten beiden Stufen sind **vollständig** zu bauen. Lückenhafte Messkonzepte führen zu Differenzrechnungen, die niemand mehr nachvollziehen kann. Trinkwasser wird wie ein Energieträger behandelt. Die Systemgrenze ist für Wärme und Strom dieselbe.

**Faustregel für Untermessungen:** Die Messeinrichtung soll weniger kosten als ein Drittel der jährlichen Energiekosten, die sie erfasst.

## Ab wann eine Untermessung

Richtwerte der KBOB-Empfehlung von 2000. Was nicht aufgeführt ist, wird mit dem Bauherrn abgesprochen.

| Anlage                                         | Betriebsstunden, Starts         | Energie                                                                            |
| ---------------------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| Technische Zentralen mit eigenem Schaltschrank | —                               | Strom gesamt; Kältezentrale Kälteabgabe ab 100 kW                                  |
| Druckluftzentrale                              | —                               | Strom ab 25 kW, Luftmenge ab 100 kW Anschluss                                      |
| Netzersatzanlage                               | ja, je Stufe                    | —                                                                                  |
| Photovoltaik                                   | —                               | produzierte Energie                                                                |
| Öl- und Gaskessel                              | je Stufe, stufenlos nur Stunden | Öl- bzw. Gasverbrauch; bei mehreren Kesseln gesamt                                 |
| Holzkessel                                     | —                               | keine Zusatzmessung                                                                |
| Elektro-Wärmepumpe                             | ja, je Stufe                    | Strom ab 25 kW Antrieb, Wärme ab 75 kW Heizleistung, Grundwasser bei Wasser/Wasser |
| BHKW                                           | ja, je Stufe                    | Strom abgegeben; Brennstoff ab 75 kW; Wärme ab 50 kW                               |
| Sonnenkollektoren                              | Solarpumpe                      | Wärmeabgabe                                                                        |
| Lüftungsanlage mit Zu- und Abluft              | ja, je Stufe                    | Wärme ab 100 000 kWh/a                                                             |
| Kältemaschine                                  | ja, je Stufe                    | Strom ab 25 kW Antrieb, Kälte ab 100 kW                                            |
| Rückkühlung, Free Cooling                      | ja                              | Free Cooling: Kälte ab 100 kW                                                      |
| Wassererwärmer                                 | elektrisch über 3 kW            | Kaltwasser am Eintritt; elektrisch ab 1000 l Strom; Gas ab 25 kW                   |
| Wärmerückgewinnung ins selbe Objekt            | —                               | ab 50 kW Passstücke für spätere Messung                                            |
| WRG in andere Objekte                          | —                               | Wärmeabgabe                                                                        |
| Motoren, Apparate                              | ab 3 kW                         | —                                                                                  |
| Prozesse, EDV, Gewerbeküchen                   | —                               | Strom ab 50 000 kWh/a                                                              |
| Lifte                                          | Fahrtenzähler                   | —                                                                                  |
| Raumheizung, Licht, USV                        | —                               | keine Zusatzmessung                                                                |
| Fremdmieter                                    | —                               | Strom, Gas, Kaltwasser immer; Wärme, Kälte, Warmwasser wenn VHKA-pflichtig         |

Betriebsstunden und Starts für alle Stufen zusammen braucht es nur, wenn sie sich nicht aus den Werten je Stufe errechnen lassen. Mit Leitsystem werden Betriebsstunden und Starts ohnehin in der Software aus der Rückmeldung gezählt, so wird auch der Handbetrieb erfasst.

## Zähler und Übertragung

- **Jeder Zähler mit Anzeige vor Ort** und mindestens einem potentialfreien Impulsausgang, damit er an jedes Leitsystem passt.
- **Busanbindung** (z.B. M-Bus) statt Impulsen, wenn sie inklusive Software nicht teurer ist. Heute ist das meist der Fall; siehe [M-Bus](/wissen/mbus).
- **Wärmezähler für Garantiewerte** zeigen vor Ort Leistung, Durchfluss, Vor- und Rücklauftemperatur. Elektronisch, mit Netzanschluss statt Batterie. Siehe [Wärmezähler](/wissen/waermemengenzaehler).
- **Eichpflicht:** Verrechnungszähler und Zähler für Garantiewerte müssen amtlich geeicht sein, alle übrigen nicht. Für Wärme, Kälte, Gas und Dampf trotzdem eichfähige Geräte mit Werkskalibrierung verwenden.
- **Gas** über 3,5 Mio. kWh/a: Mengenumwerter mit Druck- und Temperaturkorrektur.

**Impulsübertragung** nach KBOB:

| Vorgabe                 | Wert                                             |
| ----------------------- | ------------------------------------------------ |
| Speisung durch die AS   | positive Kleinspannung, höchstens 48 V DC        |
| Impulsrate              | höchstens 20 pro Minute, Ziel 5–10               |
| Wertigkeit              | 1, 2, 5 und dekadische Vielfache (0,1 … 50)      |
| Impulsdauer und Pause   | je mindestens 50 ms                              |
| Prellzeit Relaiskontakt | höchstens 10 ms                                  |
| Analoge Messwerte       | 4–20 mA, Bürde mindestens 500 Ω, Ausnahme 0–10 V |

Die Impulswertigkeit so wählen, dass bei Volllast 5 bis 10 Impulse pro Minute kommen. Ein Wärmezähler mit 200 kW gibt bei 1 kWh/Impuls 200 kWh/h ÷ 60 = 3,3 Impulse pro Minute; mit 0,5 kWh/Impuls sind es 6,7.

**Messbereich:** Die üblichen Werte sollen im oberen Teil der Messspanne liegen. Ein zu grosser Wärmezähler misst im Teillastbetrieb ungenau.

## Inbetriebnahme und Dokumentation

- Werte schon vor der Abnahme auf **Plausibilität** prüfen. Abgenommen wird erst nach dem Nachweis über die ganze Kette, vom Zähler über die Übertragung und Speicherung bis zur Anzeige.
- Ein **Messverantwortlicher** aus dem Planungsteam (HLKS oder GA) ist für Planung, Inbetriebnahme und Revisionsunterlagen zuständig.
- Zur Dokumentation gehören: Anlageschemata mit nummerierten Messstellen und ihrem Wirkbereich, eine **Messgeräteliste** (Messstellennummer, Medium, Gerätetyp, Fabrikat, Baujahr, Einheit, Zählerfaktor), Ableseformulare und eine Rechenanweisung, falls die Kennzahlen nicht direkt ablesbar sind.
- Nummerierung nach der [Anlagenkennzeichnung](/wissen/anlagenkennzeichnung): Messanlagen haben die BTA-Art **Q** (Energie-Input) oder **R** (Verbrauch pro Objekt) mit Nummernkreisen nach Medium: 01–20 Strom, 21–40 Dampf und Wärme, 41–60 Kälte, 61–70 unbehandeltes Wasser, 71–80 behandeltes Wasser, 81–90 Brennstoffe, 91–99 Diverses.

## Auswertung

- **Mit Leitsystem:** Energie als Tages- und Monatswerte, bei Bedarf 15-Minuten-Werte, dazu Betriebsstunden und Starts. Tageswerte mindestens 35 Tage, Monatswerte 14 Monate speichern. Export als CSV mit Semikolon, auswertbar ohne Herstellersoftware. Nach der KBOB-Empfehlung BACnet werden Energiezähler zeitgetriggert alle 15 Minuten und auf allen AS zeitsynchron aufgezeichnet.
- **Ohne Leitsystem:** monatlich am letzten Werktag ablesen, in vorbereitete Tabellen eintragen und auf Plausibilität prüfen.
- **Erfassungsperiode** der KBOB-Energiestatistik: 1. Juli bis 30. Juni.
- **Mindestens** Monatsverbräuche grafisch und den spezifischen Wärme- und Kälteverbrauch über der mittleren Monats-Aussentemperatur darstellen, die sogenannte **Energiesignatur**. Weicht ein Monat von der Geraden ab, stimmt etwas mit der Anlage oder dem Betrieb nicht.
- Für die Auswertung im Betrieb ist eine verantwortliche Person zu bestimmen. Ohne sie werden Daten gesammelt, aber nicht genutzt.

## Was sich seit 2000 geändert hat

Die Empfehlung ist von 2000 und nennt Verfahren aus dieser Zeit, etwa Modemübertragung und Fehlerklassen nach damaliger Einteilung. Für Verrechnungszähler gelten heute das Messgesetz und die Messmittelverordnung des Bundes mit dem METAS als Aufsicht. Die Grundidee bleibt: vollständig auf den oberen Stufen, sparsam auf der untersten, alles nummeriert, dokumentiert und mit einer Person, die die Daten auch anschaut. Die Empfehlung Gebäudetechnik 2026 verlangt zusätzlich, Energie- und Betriebsdaten nach Vorgaben des Bauherrn an ein Energiemonitoring weiterzugeben, für Auswertungen über das ganze Portfolio.

## Quellen

- KBOB: Empfehlung Energie-Messkonzept, Ausgabe 1, Januar 2000
- KBOB: Empfehlung Gebäudetechnik, Juli 2026, Teil 5 Messkonzept, Energie- und Betriebsdatenerfassung
- KBOB: Empfehlung BACnet Anwendung, 2021, Kap. 6.6.1
- KBOB: Empfehlung MSRL-Technik, 2000, Anhang A (Messanlagen Q/R)

<!-- EN -->

If you don't measure, you can't optimise. But if you put a meter on every pump, you pay more for metering than you ever save. A **metering concept** defines where to measure, with what, how the values reach BA and who evaluates them. The KBOB recommendation Building Services 2026 requires an **overall metering concept** of metering diagram and metering point list, bringing together the metering concepts of all trades. The method comes from the KBOB recommendation Energy Metering Concept of 2000 and is still largely usable.

## Three Levels

1. **Energy input per site:** everything crossing the system boundary of the property. The utilities' billing meters are usually enough. For storable fuels such as oil, LPG or wood the stock is measured; with several tanks a meter in the supply line is better. Own production leaving the site also belongs here.
2. **Energy consumption per building:** electricity, heat, cooling, gas, water per building. These meters are not subject to legal verification.
3. **Breakdown within a building:** by consumer group, large process consumers and plants with guaranteed values such as heat pumps.

The first two levels must be built **completely**. Incomplete metering concepts lead to difference calculations nobody can follow any more. Drinking water is treated like an energy carrier. The system boundary is the same for heat and electricity.

**Rule of thumb for sub-metering:** the metering equipment should cost less than a third of the annual energy costs it records.

## When to Sub-meter

Guide values from the 2000 KBOB recommendation. Anything not listed is agreed with the owner.

| Plant                               | Run hours, starts                | Energy                                                                                             |
| ----------------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------- |
| Plant rooms with their own panel    | —                                | Total electricity; chiller plant cooling output from 100 kW                                        |
| Compressed air plant                | —                                | Electricity from 25 kW, air volume from 100 kW connected load                                      |
| Emergency generator                 | yes, per stage                   | —                                                                                                  |
| Photovoltaics                       | —                                | Energy produced                                                                                    |
| Oil and gas boilers                 | per stage, modulating hours only | Oil or gas consumption; total for multiple boilers                                                 |
| Wood boiler                         | —                                | No additional metering                                                                             |
| Electric heat pump                  | yes, per stage                   | Electricity from 25 kW drive, heat from 75 kW heating output, groundwater for water/water          |
| CHP                                 | yes, per stage                   | Electricity delivered; fuel from 75 kW; heat from 50 kW                                            |
| Solar thermal                       | Solar pump                       | Heat output                                                                                        |
| Ventilation with supply and extract | yes, per stage                   | Heat from 100 000 kWh/a                                                                            |
| Chiller                             | yes, per stage                   | Electricity from 25 kW drive, cooling from 100 kW                                                  |
| Heat rejection, free cooling        | yes                              | Free cooling: cooling from 100 kW                                                                  |
| Water heater                        | electric above 3 kW              | Cold water inlet; electric from 1000 l electricity; gas from 25 kW                                 |
| Heat recovery within the building   | —                                | From 50 kW fit spool pieces for later metering                                                     |
| Heat recovery to other buildings    | —                                | Heat output                                                                                        |
| Motors, devices                     | from 3 kW                        | —                                                                                                  |
| Processes, IT, commercial kitchens  | —                                | Electricity from 50 000 kWh/a                                                                      |
| Lifts                               | Trip counter                     | —                                                                                                  |
| Space heating, lighting, UPS        | —                                | No additional metering                                                                             |
| Third-party tenants                 | —                                | Electricity, gas, cold water always; heat, cooling, hot water where individual billing is required |

Total run hours and starts for all stages together are only needed if they cannot be calculated from the per-stage values. With a management system, run hours and starts are counted in software from the feedback anyway, which also captures manual operation.

## Meters and Transmission

- **Every meter with a local display** and at least one volt-free pulse output, so that it fits any management system.
- **Bus connection** (e.g. M-Bus) instead of pulses if it is not more expensive including software. Today that is usually the case; see [M-Bus](/wissen/mbus).
- **Heat meters for guaranteed values** display power, flow, flow and return temperature locally. Electronic, mains-powered rather than battery. See [Heat Meters](/wissen/waermemengenzaehler).
- **Legal verification:** billing meters and meters for guaranteed values must be officially verified, all others need not be. For heat, cooling, gas and steam use verifiable devices with factory calibration anyway.
- **Gas** above 3.5 million kWh/a: volume converter with pressure and temperature correction.

**Pulse transmission** per KBOB:

| Requirement              | Value                                            |
| ------------------------ | ------------------------------------------------ |
| Supply by the station    | positive extra-low voltage, at most 48 V DC      |
| Pulse rate               | at most 20 per minute, target 5–10               |
| Pulse value              | 1, 2, 5 and decimal multiples (0.1 … 50)         |
| Pulse duration and pause | at least 50 ms each                              |
| Relay contact bounce     | at most 10 ms                                    |
| Analog values            | 4–20 mA, burden at least 500 Ω, exception 0–10 V |

Choose the pulse value so that 5 to 10 pulses per minute arrive at full load. A 200 kW heat meter at 1 kWh/pulse gives 200 kWh/h ÷ 60 = 3.3 pulses per minute; at 0.5 kWh/pulse it is 6.7.

**Measuring range:** usual values should lie in the upper part of the span. An oversized heat meter measures inaccurately at part load.

## Commissioning and Documentation

- Check values for **plausibility** before acceptance. Acceptance follows only after proof over the whole chain, from meter through transmission and storage to display.
- A **metering officer** from the design team (HVAC or BA) is responsible for design, commissioning and as-built documents.
- Documentation includes: plant schematics with numbered metering points and their coverage, a **meter list** (metering point number, medium, device type, make, year, unit, meter factor), reading forms and a calculation instruction if the key figures cannot be read directly.
- Numbering per [plant labelling](/wissen/anlagenkennzeichnung): metering systems have system type **Q** (energy input) or **R** (consumption per building) with number ranges by medium: 01–20 electricity, 21–40 steam and heat, 41–60 cooling, 61–70 untreated water, 71–80 treated water, 81–90 fuels, 91–99 miscellaneous.

## Evaluation

- **With a management system:** energy as daily and monthly values, 15-minute values if needed, plus run hours and starts. Keep daily values for at least 35 days and monthly values for 14 months. Export as semicolon CSV, readable without vendor software. Per the KBOB BACnet recommendation, energy meters are logged time-triggered every 15 minutes and synchronously on all stations.
- **Without a management system:** read monthly on the last working day, enter in prepared tables and check for plausibility.
- **Recording period** of the KBOB energy statistics: 1 July to 30 June.
- **At least** show monthly consumption graphically and the specific heating and cooling consumption against the mean monthly outdoor temperature, the so-called **energy signature**. If a month departs from the line, something is wrong with the plant or its operation.
- Name a person responsible for evaluation in operation. Without one, data is collected but not used.

## What Has Changed Since 2000

The recommendation dates from 2000 and names methods of that time, such as modem transmission and accuracy classes of the former scheme. For billing meters, the federal Measurement Act and Measuring Instruments Ordinance with METAS as authority apply today. The basic idea remains: complete at the upper levels, sparing at the lowest, everything numbered, documented and with a person who actually looks at the data. The Building Services recommendation 2026 additionally requires energy and operating data to be passed to an energy monitoring system as specified by the owner, for evaluations across the whole portfolio.

## Sources

- KBOB: Empfehlung Energie-Messkonzept, edition 1, January 2000
- KBOB: Empfehlung Gebäudetechnik, July 2026, part 5 metering concept, energy and operating data
- KBOB: Empfehlung BACnet Anwendung, 2021, ch. 6.6.1
- KBOB: Empfehlung MSRL-Technik, 2000, annex A (metering systems Q/R)
