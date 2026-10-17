---
title: Regelung von Lüftungs- und Klimaanlagen — Temperatur, Feuchte, Frostschutz
title_en: Controlling Ventilation and Air-Conditioning Units — Temperature, Humidity, Frost Protection
slug: rlt-regelung
category: lueftung
subcategory: regelung
tags:
  [
    zulufttemperaturregelung,
    raumtemperaturregelung,
    ablufttemperatur,
    kaskade,
    sequenz,
    totzone,
    sommerkompensation,
    minimalbegrenzung,
    feuchteregelung,
    entfeuchtung,
    vorrangwahl,
    frostschutz,
    filterüberwachung,
    elektro-lufterwärmer,
    nachtlüftung,
    luftqualität
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    rlt-anlage,
    waermerueckgewinnung,
    kaskadenregelung,
    sollwertfuehrung,
    befeuchter,
    raumluftqualitaet,
    nachtauskuehlung,
    vav-cav,
    klimasysteme
  ]
norm: [SIA 382/1, EN 16798-3, VDI 3814]
updated: 2026-10-17
lang: de
---

# Regelung von Lüftungs- und Klimaanlagen — Temperatur, Feuchte, Frostschutz

Ein Lüftungsgerät hat viele Stellglieder: Klappen, Wärmerückgewinnung, Erhitzer, Kühler, Befeuchter, Ventilatoren. Die Regelung entscheidet, **welche Grösse** geregelt wird, **in welcher Reihenfolge** die Stellglieder eingreifen und **welche Grenzen** immer gelten. Dieser Artikel zeigt die Bausteine. Den Aufbau des Geräts beschreibt [RLT-Anlage](/wissen/rlt-anlage).

## Was wird geregelt?

| Regelung                | Fühler          | Eignet sich für                                                                                              |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| **Zulufttemperatur**    | Zuluftkanal     | Anlagen, die vor allem lüften: Küchen, Garagen, Turnhallen. Die Raumtemperatur regelt eine Grundlastheizung. |
| **Raumtemperatur**      | Raum            | Räume mit wechselnden inneren Lasten: Büros, Säle, Verkauf                                                   |
| **Ablufttemperatur**    | Abluftkanal     | wo ein Raumfühler schlecht zu platzieren ist, oder ohne Strahlungseinfluss: Labors, Operationssäle           |
| **Raum-Zuluft-Kaskade** | Raum und Zuluft | Standard bei Komfortanlagen                                                                                  |

**Zuluftregelung:** Die Zuluft kommt mit fester Temperatur. Gibt es im Raum innere Wärme, muss der Sollwert tiefer liegen als die Raumtemperatur, aber nicht so tief, dass es zieht. Die Heizkörper müssen dann auch die zu kühle Zuluft nachheizen, wenn die inneren Lasten wegfallen.

**Raumregelung:** Je wärmer der Raum durch innere Lasten wird, desto kühler bläst die Anlage ein. Innere Wärme wird so genutzt. Eine vorhandene Heizkörperheizung dient dann nur als **Grundlast**: witterungsgeführt, typisch ausgelegt für eine Raumtemperatur von etwa 14 bis 16 °C, damit vor den Fenstern ein Warmluftschleier bleibt. Sie darf nicht ebenfalls nach der Raumtemperatur regeln, sonst arbeiten zwei Regler gegeneinander.

**Ablufttemperatur:** misst den Mittelwert der Raumluft, aber nur, solange die Anlage läuft. Die Strecke wird schneller, aber nicht weniger verzögert, und damit schwieriger zu regeln.

**Kaskade:** Der Raumregler gibt dem Zuluftregler den Sollwert vor. Störungen in der Zuluft, etwa ein Sprung der Aussentemperatur oder der Heizwasser-Vorlauftemperatur, regelt der schnelle Zuluftregler aus, bevor der Raum sie merkt. Beide sind meist PI-Regler. Mehr in [Kaskadenregelung](/wissen/kaskadenregelung).

## Sequenz und Totzone

Ein Regler fährt die Stellglieder nacheinander, in der energetisch sinnvollen Reihenfolge:

**Heizen:** Wärmerückgewinnung → Erhitzer
**Kühlen:** Wärmerückgewinnung (wenn die Abluft kühler ist als die Aussenluft) → Kühler

Die WRG kommt immer zuerst, weil sie fast nichts kostet. Ist die Aussenluft wärmer als die Abluft, kehrt sich der Wärmefluss um. Die Regelung schaltet die WRG dann auf maximale Leistung, unabhängig vom Reglersignal, denn jetzt kühlt sie.

Zwischen Heizen und Kühlen liegt eine **Totzone**, die energiefreie Zone. Typisch kühlt die Anlage erst, wenn der Raum etwa 3 bis 4 K über dem Heizsollwert liegt. In dieser Zone wird weder geheizt noch gekühlt.

## Sollwert nach Aussentemperatur

- **Sommerkompensation:** Bei heisser Witterung wird der Raumsollwert angehoben. Das spart Kühlenergie und vermeidet einen Kälteschock beim Betreten. Die Siemens-Unterlage nennt nach VDI-Lüftungsregeln: bei 32 °C aussen höchstens 26 °C innen, dazwischen gleitend, z.B. 20 °C aussen → 20 °C innen, 26 °C → 23 °C, 32 °C → 26 °C. Für die Schweiz gelten die Behaglichkeitskriterien nach SIA 382/1 und SN EN 16798-1, siehe [Thermische Behaglichkeit](/wissen/thermische-behaglichkeit).
- **Winterkompensation:** In schlecht gedämmten Gebäuden kann der Sollwert bei Frost leicht angehoben werden, um kalte Wand- und Fensterflächen auszugleichen.

Mehr zu geführten Sollwerten in [Sollwertführung](/wissen/sollwertfuehrung).

## Minimalbegrenzung der Zuluft

Bei grosser innerer Last würde ein Raumregler die Zuluft immer kälter machen, bis es zieht. Ein zweiter Regler mit Fühler nahe beim Zuluftauslass begrenzt deshalb die Zulufttemperatur nach unten, typisch auf **17 bis 18 °C**. Über eine **Minimalauswahl** schliesst er das Kühlventil, über eine **Maximalauswahl** öffnet er das Heizventil. Erreicht die Zuluft die Grenze, regelt die Anlage faktisch auf Zulufttemperatur.

## Feuchteregelung

Heute wird die Feuchte **direkt** geregelt, mit einem Feuchtefühler im Raum oder in der Abluft. Zwei Regelkreise teilen sich die Stellglieder:

| Regler     | Stellglieder                         |
| ---------- | ------------------------------------ |
| Temperatur | Erhitzer, Nachwärmer, Kühler         |
| Feuchte    | Befeuchter, Kühler (zum Entfeuchten) |

Weil beide auf den **Kühler** wirken, entscheidet eine **Maximalauswahl**: Der Regler, der mehr Kühlleistung verlangt, bekommt das Ventil. Beim Entfeuchten kühlt der Kühler die Luft deshalb oft kälter, als die Temperatur verlangt. Der **Nachwärmer** heizt sie danach wieder auf. Dabei darf der Vorerhitzer nicht anspringen, er ist in der Heizsequenz zuerst dran und muss beim Entfeuchten gesperrt sein. Darum sitzt der Kühler vor Nachwärmer und Befeuchter.

- **Verdunstungsbefeuchter** kühlen die Luft beim Befeuchten ab (adiabat). Der Nachwärmer muss diese Abkühlung mit übernehmen.
- **Dampfbefeuchter** befeuchten fast ohne Temperaturänderung.
- Personen geben Feuchte ab. Der Regler bläst die Zuluft deshalb etwas trockener ein als den Raumsollwert.
- In Büros muss die Feuchte nicht auf einen Punkt geregelt werden. Ein Band, etwa 30 bis 60 %, spart viel Befeuchtungs- und Entfeuchtungsenergie.

Die frühere **Taupunktregelung**, bei der ein Wäscher die Luft sättigt und ihre Temperatur geregelt wird, kühlt und heizt unnötig. Sie wird nicht mehr gebaut, kommt im Bestand aber noch vor.

**h,x-geführte Regelung:** Noch weiter gehen Regelungen, die den Sollwert nicht als Punkt, sondern als **Behaglichkeitsfeld** im h,x-Diagramm verstehen. Sie suchen den Punkt im Feld, der mit der Wärmerückgewinnung am wenigsten Heizen, Kühlen, Befeuchten und Entfeuchten braucht, gewichtet nach deren Kosten. Siemens nennt das Economiser tx2.

## Bedarfsmeldungen aus den Räumen

Am meisten spart eine Anlage, die weiss, was die Räume brauchen. Die Raumregler melden über das Netzwerk ihren Bedarf an die Zentrale: Stellung der VVS-Klappen, Luftqualität, Ventilstellungen, Raumtemperatur. Daraus bildet die Zentrale:

- den kleinstmöglichen **Luftvolumenstrom** und Kanaldruck, siehe Druck-Reset in [Sollwertführung](/wissen/sollwertfuehrung)
- die **Zulufttemperatur und -feuchte**, die der anspruchsvollste Raum gerade braucht
- **Vorlauftemperatur und Durchfluss** der Heiz- und Kältekreise nach den Ventilstellungen der Verbraucher

Das spart Ventilator- und Pumpenstrom und Wärmeverluste im Netz und ist eine Voraussetzung für die GA-Klasse A nach EN ISO 52120-1, siehe [EN 15232](/wissen/en15232). Voraussetzung ist, dass Raum- und Primärregler kommunizieren.

## Luftqualität

Die Anlage läuft nur so stark, wie die Luftqualität es verlangt, gemessen mit CO₂- oder VOC-Fühlern. Zwei Grundformen:

- **Stufenventilator mit Mischklappen:** Stufe 1, Aussenluftklappe auf Minimum, dann stetig weiter öffnen. Erst wenn sie ganz offen ist, kommt Stufe 2. Bei Frost kann die Aussenluftmenge begrenzt werden, damit der Erhitzer reicht.
- **Drehzahlgeregelter Ventilator:** 100 % Aussenluft, die Drehzahl folgt der Luftqualität. Die Leistung sinkt etwa mit der dritten Potenz der Luftmenge.

**Freigaben:** Nutzungszeit, **Vorlüftung** vor Nutzungsbeginn (etwa zwei Luftwechsel, volle Drehzahl), **Nachlüftung** nach Nutzungsende, solange der Fühler Bedarf meldet, **Zwangslüftung** per Taste für eine begrenzte Zeit, **Präsenz** bei unregelmässig genutzten Räumen. Unabhängig davon darf die Temperaturregelung die Anlage einschalten, wenn geheizt oder gekühlt werden muss. Mehr in [Raumluftqualität](/wissen/raumluftqualitaet).

## Frostschutz

Ein eingefrorener Lufterhitzer platzt. Gefahr besteht bei undichten Klappen im Stillstand, beim Anfahren an kalten Tagen, bei Störungen der Wärmeversorgung, bei Pumpen- oder Antriebsdefekten und bei überdimensionierten Erhitzern, die nur einen Spalt offen stehen.

**Frostschutzthermostat:** Ein Kapillarfühler liegt in Schlaufen etwa 5 cm hinter dem Erhitzer über die ganze Fläche. Fällt die Luft auf etwa 30 cm Kapillarlänge unter den Grenzwert, typisch +5 °C, löst er aus. Wasserseitig überwacht ein Fühler den Rücklauf des Erhitzers. Bei Auslösung:

1. Heizventil 100 % auf
2. Erhitzerpumpe ein
3. Zu- und Abluftventilator aus
4. Aussen- und Fortluftklappe sowie motorisierte Brandschutzklappen zu
5. Alarm, vor Ort und an die GA

Mit **Einschaltsperre** muss jemand vor Ort quittieren, bevor die Anlage wieder startet. Bei hohem Folgeschaden kombiniert man luft- und wasserseitige Überwachung.

**Zweistufiger Frostschutz:** Zuerst greift eine **stetige** Stufe ein, bevor es kritisch wird: Heizventil weiter auf (Maximalauswahl mit dem Temperaturregler), mehr WRG oder Umluft, Kühlventil zu. Erst wenn das nicht reicht, folgt die harte Abschaltung. So löst der Frostschutz seltener unnötig aus.

**Anfahrschaltung bei Kälte:** Startet die Anlage unter etwa +8 °C aussen, öffnet zuerst nur das Heizventil und die Pumpe läuft. Nach einer Vorwärmzeit, die von der Aussentemperatur abhängt, öffnen Klappen und Ventilatoren. Die Vorwärmzeit muss länger sein als die Laufzeit des Ventilantriebs, typisch 15 bis 35 s, sonst ist das Ventil noch gar nicht offen. Anlagen mit Umluft starten stattdessen im reinen Umluftbetrieb.

Bei **wasserseitigem Frostschutz** muss die Erhitzerpumpe unter etwa +5 °C aussen laufen, auch bei stehender Anlage. Umgewälztes Wasser friert viel später als stehendes. Das ist auch ein Grund, warum Lufterhitzer in Beimisch- oder Einspritzschaltung gehören und nicht in eine Drosselschaltung.

## Filterüberwachung

Der Druckverlust über dem Filter steigt mit der Verschmutzung, aber auch **quadratisch mit dem Volumenstrom**. Bei halbem Volumenstrom misst man nur noch ein Viertel des Druckverlusts.

- Ein **Filterwächter** mit festem Grenzwert passt nur bei konstantem Volumenstrom. Bei variablen Anlagen braucht es täglich einmal Vollast, damit er überhaupt auslösen kann.
- Besser ist ein **Druckdifferenzfühler** mit einem Grenzwert, der mit dem Volumenstrom mitgeführt wird.

## Elektro-Lufterwärmer

Geregelt wie ein Wasser-Erhitzer, aber über Stufen (z.B. 1/7, 2/7, 4/7 der Leistung, kombiniert zu 7 Stufen) oder ein Thyristor-Stromventil. Pro Stufe soll die Zuluft in Komfortanlagen nicht mehr als etwa 3 K springen, sonst zieht es.

Ohne Luftstrom glühen die Heizstäbe aus. Die **Sicherheitskette** ist Pflicht:

- **Strömungswächter:** Erhitzer erst frei, wenn Luft strömt, und sofort aus, wenn sie wegfällt
- **Sicherheitstemperaturbegrenzer** am Erhitzer
- **Ventilator-Nachlauf** nach dem Ausschalten, damit sich keine Hitze staut
- bei zweistufigen Ventilatoren: beim Umschalten auf die tiefere Stufe die Heizleistung vorübergehend halbieren

## Nachtlüftung

Kühlt die Speichermasse nachts mit Aussenluft. Typische Freigabe, alle Bedingungen gleichzeitig:

- Aussentemperatur über einer Mindestgrenze, etwa 12 bis 14 °C, damit die Räume am Morgen nicht zu kalt sind
- Raumtemperatur über einem Grenzwert
- Raum deutlich wärmer als aussen

Klappen ganz auf, Ventilatoren auf hoher Stufe, Erhitzer, WRG und Temperaturregelung aus. Aus nach Zeitprogramm oder wenn eine Bedingung nicht mehr erfüllt ist, frühestens nach einer Mindestlaufzeit. Mehr in [Nachtauskühlung](/wissen/nachtauskuehlung).

## Brandfall

Was bei Brandalarm geschieht, legt das Brandschutzkonzept fest. Meist schaltet die Anlage ab und die Brandschutzklappen schliessen. Entrauchung über die Lüftungsanlage ist nur aus dem Zustand Brandabschaltung heraus möglich, über den Feuerwehrschalter. In VVS-Anlagen müssen dafür alle Volumenstromregler ganz öffnen. Meist übernehmen eigene Entrauchungsventilatoren diese Aufgabe, siehe [Entrauchung und RWA](/wissen/entrauchung-rwa) und [Brandschutzklappen](/wissen/brandschutzklappen).

## Quellen

- Siemens Schweiz AG: «Regeln und Steuern von Lüftungs-/Klimaanlagen», Schulungsunterlage BT_0096, 2022
- Siemens Schweiz AG: «Energieeffizienz in der Gebäudeautomation — Applikationshandbuch Lüftung und Klima», BT_0001, 2022
- SIA 382/1: Lüftungs- und Klimaanlagen — Allgemeine Grundlagen und Anforderungen

<!-- EN -->

An air handling unit has many actuators: dampers, heat recovery, heater, cooler, humidifier, fans. Control decides **which variable** is controlled, **in which order** the actuators act and **which limits** always apply. This article shows the building blocks. The unit itself is described in [Air Handling Unit](/wissen/rlt-anlage).

## What Is Controlled?

| Control                     | Sensor          | Suitable for                                                                                                          |
| --------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Supply air temperature**  | Supply duct     | Units that mainly ventilate: kitchens, car parks, sports halls. A base-load heating system controls room temperature. |
| **Room temperature**        | Room            | Rooms with changing internal loads: offices, halls, retail                                                            |
| **Extract air temperature** | Extract duct    | Where a room sensor is hard to place, or without radiant influence: labs, operating theatres                          |
| **Room-supply cascade**     | Room and supply | Standard for comfort systems                                                                                          |

**Supply air control:** the supply air comes at a fixed temperature. With internal gains in the room, the setpoint must be below the room temperature, but not so low that it causes draughts. The radiators must then also reheat the too-cool supply air when the internal gains disappear.

**Room control:** the warmer the room becomes from internal gains, the cooler the unit supplies. Internal heat is thus used. An existing radiator system then serves only as **base load**: weather-compensated, typically designed for a room temperature of about 14 to 16 °C so that a warm air curtain remains in front of the windows. It must not also control by room temperature, otherwise two controllers work against each other.

**Extract air temperature:** measures the average room air, but only while the unit runs. The process becomes faster but not less delayed, and therefore harder to control.

**Cascade:** the room controller sets the setpoint of the supply air controller. Disturbances in the supply air, such as a jump in outdoor temperature or heating water flow temperature, are corrected by the fast supply controller before the room notices them. Both are usually PI controllers. More in [Cascade Control](/wissen/kaskadenregelung).

## Sequence and Dead Band

One controller operates the actuators one after the other, in the energetically sensible order:

**Heating:** heat recovery → heater
**Cooling:** heat recovery (when the extract air is cooler than the outdoor air) → cooler

Heat recovery always comes first, because it costs almost nothing. If the outdoor air is warmer than the extract air, the heat flow reverses. Control then switches heat recovery to maximum, regardless of the controller signal, because it now cools.

Between heating and cooling lies a **dead band**, the energy-free zone. Typically the unit only cools when the room is about 3 to 4 K above the heating setpoint. Within this zone there is neither heating nor cooling.

## Setpoint by Outdoor Temperature

- **Summer compensation:** in hot weather the room setpoint is raised. This saves cooling energy and avoids a cold shock on entering. The Siemens document quotes the VDI ventilation rules: at 32 °C outdoors at most 26 °C indoors, sliding in between, e.g. 20 °C outdoors → 20 °C indoors, 26 °C → 23 °C, 32 °C → 26 °C. In Switzerland the comfort criteria of SIA 382/1 and SN EN 16798-1 apply, see [Thermal Comfort](/wissen/thermische-behaglichkeit).
- **Winter compensation:** in poorly insulated buildings the setpoint can be raised slightly in frost to compensate for cold wall and window surfaces.

More on reset setpoints in [Setpoint Reset](/wissen/sollwertfuehrung).

## Supply Air Low Limit

With a large internal load a room controller would make the supply air colder and colder until it causes draughts. A second controller with a sensor near the supply outlet therefore limits the supply temperature downwards, typically to **17 to 18 °C**. Via a **minimum selection** it closes the cooling valve, via a **maximum selection** it opens the heating valve. When the supply air reaches the limit, the unit effectively controls supply air temperature.

## Humidity Control

Today humidity is controlled **directly**, with a humidity sensor in the room or the extract. Two control loops share the actuators:

| Controller  | Actuators                              |
| ----------- | -------------------------------------- |
| Temperature | Heater, reheater, cooler               |
| Humidity    | Humidifier, cooler (for dehumidifying) |

Because both act on the **cooler**, a **maximum selection** decides: the controller demanding more cooling gets the valve. When dehumidifying, the cooler therefore often cools the air more than the temperature requires. The **reheater** then warms it up again. The preheater must not start; it comes first in the heating sequence and must be blocked during dehumidification. That is why the cooler sits upstream of reheater and humidifier.

- **Evaporative humidifiers** cool the air while humidifying (adiabatic). The reheater must cover this cooling too.
- **Steam humidifiers** humidify with almost no change in temperature.
- People release moisture. The controller therefore supplies the air slightly drier than the room setpoint.
- In offices humidity need not be controlled to one point. A band of about 30 to 60 % saves a lot of humidification and dehumidification energy.

The former **dew point control**, in which a washer saturates the air and its temperature is controlled, cools and heats unnecessarily. It is no longer built but is still found in existing plants.

**h,x-based control:** controls that treat the setpoint not as a point but as a **comfort zone** in the psychrometric chart go further still. They look for the point in the zone that, together with heat recovery, needs the least heating, cooling, humidifying and dehumidifying, weighted by their cost. Siemens calls this Economiser tx2.

## Demand Signals from the Rooms

A plant that knows what the rooms need saves the most. The room controllers report their demand to the central plant over the network: VAV damper positions, air quality, valve positions, room temperature. From this the central plant derives:

- the smallest possible **airflow** and duct pressure, see pressure reset in [Setpoint Reset](/wissen/sollwertfuehrung)
- the **supply air temperature and humidity** that the most demanding room currently needs
- **flow temperature and flow rate** of the heating and cooling circuits from the consumers' valve positions

This saves fan and pump power and heat losses in the network and is a prerequisite for BA class A per EN ISO 52120-1, see [EN 15232](/wissen/en15232). It requires room and primary controllers to communicate.

## Air Quality

The unit runs only as strongly as air quality requires, measured with CO₂ or VOC sensors. Two basic forms:

- **Staged fan with mixing dampers:** stage 1, outdoor air damper at minimum, then opening further continuously. Only when it is fully open does stage 2 come in. In frost the outdoor air quantity can be limited so the heater copes.
- **Variable-speed fan:** 100 % outdoor air, the speed follows air quality. Power drops roughly with the cube of the airflow.

**Enables:** occupancy time, **pre-ventilation** before occupancy (about two air changes, full speed), **post-ventilation** after occupancy as long as the sensor reports demand, **forced ventilation** by push button for a limited time, **presence** for irregularly used rooms. Independently of this, temperature control may start the unit when heating or cooling is needed. More in [Indoor Air Quality](/wissen/raumluftqualitaet).

## Frost Protection

A frozen air heater bursts. Risks are leaky dampers at standstill, start-up on cold days, faults in the heat supply, pump or actuator defects, and oversized heaters that are only slightly open.

**Frost thermostat:** a capillary sensor runs in loops about 5 cm behind the heater across the whole face. If the air over about 30 cm of capillary length drops below the limit, typically +5 °C, it trips. On the water side a sensor monitors the heater return. On tripping:

1. Heating valve 100 % open
2. Heater pump on
3. Supply and extract fans off
4. Outdoor and exhaust air dampers and motorised fire dampers closed
5. Alarm, locally and to BA

With a **restart lockout**, someone must acknowledge on site before the unit restarts. Where consequential damage would be high, air-side and water-side monitoring are combined.

**Two-stage frost protection:** first a **modulating** stage acts before it becomes critical: heating valve further open (maximum selection with the temperature controller), more heat recovery or recirculation, cooling valve closed. Only if that is not enough does the hard shutdown follow. The frost protection thus trips unnecessarily less often.

**Cold start-up sequence:** if the unit starts below about +8 °C outdoors, first only the heating valve opens and the pump runs. After a preheating time that depends on outdoor temperature, dampers and fans open. The preheating time must be longer than the valve actuator's running time, typically 15 to 35 s, otherwise the valve is not even open yet. Units with recirculation start in pure recirculation mode instead.

With **water-side frost protection** the heater pump must run below about +5 °C outdoors, even with the unit stopped. Circulating water freezes much later than standing water. This is also why air heaters belong in mixing or injection circuits and not in a throttling circuit.

## Filter Monitoring

The pressure drop across the filter rises with fouling, but also **with the square of the airflow**. At half airflow only a quarter of the pressure drop is measured.

- A **filter switch** with a fixed limit only works at constant airflow. For variable units it needs full load once a day to be able to trip at all.
- Better is a **differential pressure sensor** with a limit that is reset with the airflow.

## Electric Air Heater

Controlled like a water heater, but via stages (e.g. 1/7, 2/7, 4/7 of the output, combined into 7 steps) or a thyristor power controller. In comfort units the supply air should not jump by more than about 3 K per stage, otherwise it causes draughts.

Without airflow the heating elements burn out. The **safety chain** is mandatory:

- **Airflow switch:** heater enabled only when air flows, and off immediately if it stops
- **Safety temperature limiter** on the heater
- **Fan run-on** after switching off, so that no heat builds up
- with two-speed fans: when switching to the lower speed, temporarily halve the heater output

## Night Ventilation

Cools the thermal mass at night with outdoor air. Typical enable, all conditions at once:

- Outdoor temperature above a minimum, about 12 to 14 °C, so the rooms are not too cold in the morning
- Room temperature above a limit
- Room clearly warmer than outside

Dampers fully open, fans at high speed, heater, heat recovery and temperature control off. Off by time schedule or when a condition is no longer met, at the earliest after a minimum run time. More in [Night Cooling](/wissen/nachtauskuehlung).

## Fire

What happens on fire alarm is defined by the fire protection concept. Usually the unit shuts down and the fire dampers close. Smoke extraction via the ventilation unit is only possible from the fire shutdown state, via the fire brigade switch. In VAV systems all airflow controllers must open fully for this. Usually dedicated smoke extract fans take over this task, see [Smoke and Heat Exhaust](/wissen/entrauchung-rwa) and [Fire Dampers](/wissen/brandschutzklappen).

## Sources

- Siemens Schweiz AG: "Regeln und Steuern von Lüftungs-/Klimaanlagen", training document BT_0096, 2022
- Siemens Schweiz AG: "Energieeffizienz in der Gebäudeautomation — Applikationshandbuch Lüftung und Klima", BT_0001, 2022
- SIA 382/1: Ventilation and air-conditioning systems — General principles and requirements
