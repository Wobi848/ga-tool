---
title: Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne
title_en: Shading Control — Blinds, Wind and Sun
slug: beschattungssteuerung
category: komfort
subcategory: beschattung
tags:
  [
    beschattungssteuerung,
    jalousie,
    raffstore,
    sonnenautomatik,
    windautomatik,
    regenautomatik,
    frostschutz,
    sonnenstand,
    azimut,
    elevation,
    fassade,
    priorität,
    lamellennachführung,
    knx,
    dali,
    behaglichkeit,
    blend
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [knx, glt-grundlagen, thermische-behaglichkeit, rlt-anlage, beleuchtungssteuerung]
norm: [SIA 342, EN 13659, EN 14501, EN ISO 52120-1, SIA 180]
updated: 2026-10-14
lang: de
---

# Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne

Der aussenliegende Sonnenschutz ist im Sommer die wirksamste Massnahme gegen Überhitzung. Er schützt vor Blendung und lässt trotzdem Tageslicht in den Raum. Die GA fährt ihn nach Sonne, Wind, Niederschlag, Temperatur und Belegung. Weil Raffstoren und Markisen bei Sturm kaputtgehen, ist ein Teil dieser Steuerung eine Schutzfunktion.

## Eingänge und Ausgänge

| Eingänge                                       | Ausgänge                      |
| ---------------------------------------------- | ----------------------------- |
| Wind, meist von der Wetterstation auf dem Dach | Höhe des Behangs, 0–100 %     |
| Niederschlag und Aussentemperatur              | Lamellenwinkel bei Raffstoren |
| Strahlung oder Helligkeit je Fassade           | Sperren und Freigaben         |
| Sonnenstand, aus Datum, Uhrzeit und Standort   | Meldungen an die GLT          |
| Raumtemperatur, Präsenz, Heizen oder Kühlen    |                               |
| Bedienung durch die Person im Raum             |                               |

## Prioritäten

Mehrere Funktionen wollen denselben Behang fahren. Die Reihenfolge muss festgelegt und dokumentiert sein. Üblich ist:

| Priorität | Funktion                                | Wirkung                                         |
| --------- | --------------------------------------- | ----------------------------------------------- |
| 1         | **Wind**                                | hochfahren und sperren                          |
| 2         | **Frost, Vereisung**                    | nicht fahren, Stellung halten                   |
| 3         | **Regen**, nur bei empfindlichem Behang | hochfahren und sperren                          |
| 4         | **Wartung, Fensterreinigung**           | Stellung von Hand vorgegeben                    |
| 5         | **Bedienung im Raum**                   | übersteuert die Automatik für eine gewisse Zeit |
| 6         | **Sonnenautomatik, Thermoautomatik**    | Normalbetrieb                                   |

Die Schutzfunktionen gehen immer vor, auch vor der Bedienung im Raum. Gibt die Person einen Befehl, übernimmt die Automatik erst nach einer Wartezeit, beim Verlassen des Raums oder zu einer festen Uhrzeit wieder.

## Windschutz

Raffstoren und Markisen haben eine **Windwiderstandsklasse** nach EN 13659. Der Hersteller gibt an, bis zu welcher Windgeschwindigkeit der Behang draussen bleiben darf. Bei Raffstoren liegt der Wert je nach Produkt und Breite etwa zwischen 8 und 15 m/s.

So wird der Windschutz umgesetzt:

- **Sofort hochfahren**, wenn der Grenzwert überschritten wird. Böen zählen, nicht nur der Mittelwert.
- **Erst wieder freigeben**, wenn der Wind eine Zeit lang unter dem Grenzwert liegt, typisch 10 bis 20 Minuten.
- **Fassaden getrennt** behandeln, wo der Wind je nach Seite sehr verschieden ist. Bei Hochhäusern oder Ecklagen ist das die Regel.
- **Ausfall der Wetterstation** wie Sturm behandeln. Kommt kein Wert mehr, fahren die Behänge hoch und bleiben oben.

Ein Sonnenschutz, der bei jeder Böe hochfährt, schützt im Sommer nicht. Windfeste Produkte und eine passende Grenze sind deshalb Teil des sommerlichen Wärmeschutzes.

## Frost und Regen

Bei Temperaturen um den Gefrierpunkt und Niederschlag können Lamellen und Führungsschienen vereisen. Ein Fahrbefehl reisst dann den Behang oder den Motor. Deshalb wird bei **Aussentemperatur unter etwa 3 °C und Niederschlag** das Fahren gesperrt, und zwar bis einige Stunden nach dem Ende der Bedingung oder bis zur Freigabe von Hand.

Regen allein ist für Raffstoren aus Aluminium meist kein Problem. Markisen aus Stoff und Holzlamellen werden dagegen eingefahren.

## Sonnenautomatik

### Scheint die Sonne auf die Fassade?

Die GA berechnet den **Sonnenstand** aus Datum, Uhrzeit und Standort:

- **Azimut:** Himmelsrichtung der Sonne, 0° Nord, 90° Ost, 180° Süd, 270° West
- **Elevation:** Höhe über dem Horizont, 0° bis höchstens rund 66° in der Schweiz am 21. Juni

Eine Fassade bekommt direkte Sonne, wenn der Azimut der Sonne weniger als 90° von der Fassadennormalen abweicht. Bei einer Südfassade ist das zwischen 90° und 270°. Ob die Sonne wirklich ankommt, hängt zusätzlich von Nachbargebäuden, Bäumen und Vordächern ab. Gute Steuerungen kennen dafür ein **Verschattungsprofil** je Fassade oder sogar je Fenster.

Dazu kommt ein Messwert: **Strahlung oder Helligkeit an der Fassade**. Liegt er über einer Schwelle, zum Beispiel 200 bis 300 W/m², fährt der Behang. Damit er bei Wolken nicht ständig auf und ab fährt, gibt es Verzögerungen: kurz zum Ausfahren, etwa 2 Minuten, länger zum Einfahren, etwa 10 bis 20 Minuten.

### Lamellennachführung

Bei Raffstoren stellt die Steuerung die Lamellen so steil, dass keine direkte Sonne durchkommt, aber nicht steiler. Dieser **Cut-off-Winkel** hängt von der Sonnenhöhe und von Breite und Abstand der Lamellen ab. Die Hersteller liefern dafür Tabellen oder Funktionsbausteine.

Steht die Sonne hoch, reicht ein flacher Winkel, und es kommt viel Tageslicht herein. Steht sie tief, müssen die Lamellen fast geschlossen sein. Damit die Lamellen nicht ständig nachstellen, fährt man in Stufen, zum Beispiel alle 5° oder alle 15 Minuten.

## Thermoautomatik

Ist der Raum nicht belegt, darf der Behang auf Energie optimieren statt auf Komfort:

- **Sommer oder Kühlbetrieb, Raum warm:** ganz schliessen, Wärme draussen halten
- **Winter oder Heizbetrieb:** offen lassen, damit die Sonne heizt
- **Nachts im Winter:** geschlossen hilft etwas gegen Wärmeverlust, vor allem bei alten Fenstern

Sobald jemand den Raum betritt, gilt wieder die Sonnenautomatik mit Blendschutz und Tageslicht.

## Zusammen mit dem Licht

Beschattung und Beleuchtung beeinflussen sich gegenseitig. Fährt der Sonnenschutz zu, regelt die Konstantlichtregelung das Kunstlicht nach, bis die Beleuchtungsstärke am Arbeitsplatz wieder erreicht ist, im Büro typisch 500 lx. Je mehr Tageslicht die Lamellennachführung hereinlässt, desto weniger Kunstlicht braucht es. Siehe [Beleuchtungssteuerung](/wissen/beleuchtungssteuerung).

## Antriebe und Ansteuerung

Die meisten Raffstoren und Rollläden haben einen **230-V-Motor mit zwei Wicklungen**, eine für Auf und eine für Ab. Die Endlagen schaltet der Motor selbst ab.

- **Auf und Ab dürfen nie gleichzeitig anliegen.** Jalousieaktoren verriegeln das intern. Wer mit einzelnen Relais schaltet, braucht eine Verriegelung und eine Umschaltpause von einigen hundert Millisekunden.
- **Position aus der Laufzeit:** Der Aktor kennt die Position nur, weil er die Fahrzeit misst. Darum braucht er die gemessenen Laufzeiten für Auf, Ab und die Lamellenwendung. Nach Stromausfall oder bei Abweichungen fährt man zur Referenz in eine Endlage.
- **SMI-Antriebe** (Standard Motor Interface) haben einen digitalen Bus und melden ihre Position und Störungen zurück.

**KNX** ist in der Schweiz für Beschattung sehr verbreitet. Typische Objekte eines Jalousieaktors:

| Objekt             | Datenpunkttyp | Bedeutung                                  |
| ------------------ | ------------- | ------------------------------------------ |
| Auf/Ab             | DPT 1.008     | Langzeitbefehl, fährt bis Endlage          |
| Schritt/Stopp      | DPT 1.007     | Lamelle verstellen oder anhalten           |
| Position           | DPT 5.001     | Höhe in %                                  |
| Lamellenposition   | DPT 5.001     | Winkel in %                                |
| Wind, Regen, Frost | DPT 1.005     | Sicherheitsobjekte, oft zyklisch überwacht |

Die Sicherheitsobjekte sollten zyklisch gesendet und im Aktor überwacht werden. Bleibt das Telegramm aus, fährt der Aktor in die Sicherheitsstellung.

## Typische Datenpunkte

| Datenpunkt                           | Typ   | Einheit  | Bemerkung                         |
| ------------------------------------ | ----- | -------- | --------------------------------- |
| Windgeschwindigkeit                  | AI    | m/s      | Wetterstation                     |
| Niederschlag                         | BI    | —        | Regensensor, beheizt              |
| Aussentemperatur                     | AI    | °C       | für Frostschutz                   |
| Strahlung oder Helligkeit je Fassade | AI    | W/m², lx | Wetterstation oder Fassadensensor |
| Sonnenazimut, Sonnenelevation        | AV    | °        | berechnet                         |
| Windalarm je Fassade                 | BV    | —        | mit Zeitstempel                   |
| Frostsperre                          | BV    | —        |                                   |
| Behang Höhe Soll                     | AO/AV | %        | je Gruppe oder Raum               |
| Lamellenwinkel Soll                  | AO/AV | °        | Bereich je nach Hersteller        |
| Handbetrieb aktiv                    | BV    | —        | Automatik übersteuert             |
| Störung Wetterstation                | BV    | —        | löst Windschutz aus               |

## Inbetriebnahme

- Windschutz mit echtem Signal testen: Grenzwert vorübergehend tief setzen, alle Gruppen müssen hochfahren.
- Wetterstation abklemmen: Behänge müssen in Sicherheitsstellung fahren.
- Fassadenzuordnung prüfen. Vertauschte Fassaden sind ein häufiger Fehler.
- Uhrzeit und Standort kontrollieren, sonst stimmt der Sonnenstand nicht.
- Prioritäten, Grenzwerte und Verzögerungen im Funktionsbeschrieb festhalten.

## Normen

- **SIA 342** — Sonnen- und Wetterschutzanlagen (CH)
- **EN 13659** — Abschlüsse aussen, Leistungs- und Sicherheitsanforderungen, Windwiderstandsklassen
- **EN 14501** — Abschlüsse, thermischer und visueller Komfort, Leistungsmerkmale
- **SIA 180** — Wärmeschutz, Feuchteschutz und Raumklima, sommerlicher Wärmeschutz
- **EN ISO 52120-1** — Einfluss der GA auf die Energieeffizienz, Nachfolger von EN 15232

<!-- EN -->

External shading is the most effective protection against summer overheating. It prevents glare and still lets daylight in. The BA moves it according to sun, wind, precipitation, temperature and occupancy. Because external venetian blinds and awnings break in storms, part of this control is a protection function.

## Inputs and Outputs

| Inputs                                             | Outputs                        |
| -------------------------------------------------- | ------------------------------ |
| Wind, usually from the weather station on the roof | Blind height, 0–100 %          |
| Precipitation and outdoor temperature              | Slat angle for venetian blinds |
| Irradiance or brightness per facade                | Locks and releases             |
| Sun position, from date, time and location         | Messages to the BMS            |
| Room temperature, presence, heating or cooling     |                                |
| Operation by the occupant                          |                                |

## Priorities

Several functions want to move the same blind. The order must be defined and documented. Common practice:

| Priority | Function                             | Effect                              |
| -------- | ------------------------------------ | ----------------------------------- |
| 1        | **Wind**                             | raise and lock                      |
| 2        | **Frost, icing**                     | do not move, hold position          |
| 3        | **Rain**, only for sensitive blinds  | raise and lock                      |
| 4        | **Maintenance, window cleaning**     | position set manually               |
| 5        | **Occupant operation**               | overrides the automatic for a while |
| 6        | **Sun automatic, thermal automatic** | normal operation                    |

Protection functions always come first, even before the occupant. After a manual command the automatic only takes over again after a waiting time, when the room is left or at a fixed time of day.

## Wind Protection

External venetian blinds and awnings have a **wind resistance class** per EN 13659. The manufacturer states up to which wind speed the blind may stay down. For external venetian blinds this is roughly between 8 and 15 m/s, depending on product and width.

Implementation:

- **Raise immediately** when the limit is exceeded. Gusts count, not only the mean value.
- **Release only** after the wind has stayed below the limit for some time, typically 10 to 20 minutes.
- **Treat facades separately** where wind differs a lot by side. On high-rise buildings or corner sites that is the rule.
- **Treat a failed weather station like a storm.** If no value arrives, the blinds go up and stay up.

A sun protection that goes up at every gust does not protect in summer. Wind-resistant products and a suitable limit are therefore part of summer thermal protection.

## Frost and Rain

Around freezing point with precipitation, slats and guide rails can ice up. A travel command then tears the blind or the motor. Therefore travel is locked when the **outdoor temperature is below about 3 °C and there is precipitation**, until a few hours after the condition ends or until released manually.

Rain alone is usually no problem for aluminium venetian blinds. Fabric awnings and wooden slats are retracted.

## Sun Automatic

### Is the Sun on the Facade?

The BA calculates the **sun position** from date, time and location:

- **Azimuth:** compass direction of the sun, 0° north, 90° east, 180° south, 270° west
- **Elevation:** height above the horizon, 0° up to at most about 66° in Switzerland on 21 June

A facade receives direct sun when the sun's azimuth deviates less than 90° from the facade normal. For a south facade that is between 90° and 270°. Whether the sun really arrives also depends on neighbouring buildings, trees and canopies. Good controllers have a **shading profile** per facade or even per window.

A measured value is added: **irradiance or brightness on the facade**. Above a threshold, for example 200 to 300 W/m², the blind moves. To stop it going up and down with every cloud there are delays: short for lowering, about 2 minutes, longer for raising, about 10 to 20 minutes.

### Slat Tracking

With venetian blinds the controller sets the slats just steep enough to keep out direct sun, and no steeper. This **cut-off angle** depends on the sun's elevation and on width and spacing of the slats. Manufacturers supply tables or function blocks for it.

With the sun high, a flat angle is enough and a lot of daylight comes in. With the sun low, the slats must be almost closed. To avoid constant adjustment the slats move in steps, for example every 5° or every 15 minutes.

## Thermal Automatic

When the room is unoccupied, the blind may optimise for energy instead of comfort:

- **Summer or cooling mode, room warm:** close fully, keep heat out
- **Winter or heating mode:** leave open so the sun heats
- **At night in winter:** closed helps a little against heat loss, especially with old windows

As soon as someone enters, the sun automatic with glare protection and daylight applies again.

## Together with Lighting

Shading and lighting affect each other. When the sun protection closes, constant light control raises the artificial light until the illuminance at the workplace is reached again, typically 500 lx in offices. The more daylight slat tracking lets in, the less artificial light is needed. See [Lighting Control](/wissen/beleuchtungssteuerung).

## Drives and Control

Most venetian blinds and roller shutters have a **230 V motor with two windings**, one for up and one for down. The motor switches off at the end positions by itself.

- **Up and down must never be applied at the same time.** Blind actuators interlock this internally. Switching with individual relays needs an interlock and a changeover pause of a few hundred milliseconds.
- **Position from travel time:** the actuator only knows the position because it measures the travel time. It therefore needs the measured travel times for up, down and slat rotation. After a power failure or on deviation, it drives to an end position as reference.
- **SMI drives** (Standard Motor Interface) have a digital bus and report their position and faults.

**KNX** is very common for shading in Switzerland. Typical objects of a blind actuator:

| Object            | Datapoint type | Meaning                                    |
| ----------------- | -------------- | ------------------------------------------ |
| Up/down           | DPT 1.008      | long command, moves to end position        |
| Step/stop         | DPT 1.007      | adjust slats or stop                       |
| Position          | DPT 5.001      | height in %                                |
| Slat position     | DPT 5.001      | angle in %                                 |
| Wind, rain, frost | DPT 1.005      | safety objects, often monitored cyclically |

The safety objects should be sent cyclically and monitored in the actuator. If the telegram stops, the actuator moves to the safe position.

## Typical Data Points

| Data point                          | Type  | Unit     | Note                             |
| ----------------------------------- | ----- | -------- | -------------------------------- |
| Wind speed                          | AI    | m/s      | weather station                  |
| Precipitation                       | BI    | —        | rain sensor, heated              |
| Outdoor temperature                 | AI    | °C       | for frost protection             |
| Irradiance or brightness per facade | AI    | W/m², lx | weather station or facade sensor |
| Sun azimuth, sun elevation          | AV    | °        | calculated                       |
| Wind alarm per facade               | BV    | —        | with time stamp                  |
| Frost lock                          | BV    | —        |                                  |
| Blind height setpoint               | AO/AV | %        | per group or room                |
| Slat angle setpoint                 | AO/AV | °        | range depends on manufacturer    |
| Manual mode active                  | BV    | —        | automatic overridden             |
| Weather station fault               | BV    | —        | triggers wind protection         |

## Commissioning

- Test wind protection with a real signal: set the limit temporarily low, all groups must go up.
- Disconnect the weather station: blinds must move to the safe position.
- Check facade assignment. Swapped facades are a common mistake.
- Check time and location, otherwise the sun position is wrong.
- Record priorities, limits and delays in the functional description.

## Standards

- **SIA 342** — Sun and weather protection systems (CH)
- **EN 13659** — External blinds, performance and safety requirements, wind resistance classes
- **EN 14501** — Blinds and shutters, thermal and visual comfort, performance characteristics
- **SIA 180** — Thermal insulation, moisture protection and indoor climate, summer thermal protection
- **EN ISO 52120-1** — Contribution of BA to energy performance, successor to EN 15232
