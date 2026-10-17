---
title: TABS — Thermoaktive Bauteilsysteme
title_en: TABS — Thermally Activated Building Systems
slug: tabs
category: heizung
subcategory: waermeabgabe
tags:
  [
    tabs,
    bauteilaktivierung,
    betonkernaktivierung,
    betonkerntemperierung,
    selbstregeleffekt,
    heizkurve,
    kühlkurve,
    taktbetrieb,
    free-cooling,
    wärmepumpe,
    deckenkühlung,
    speichermasse
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [fussbodenheizung, heizkurve, free-cooling, waermepumpe, taupunkt, klimasysteme]
norm: [EN ISO 11855, SIA 382/1]
updated: 2026-10-17
lang: de
---

# TABS — Thermoaktive Bauteilsysteme

Bei TABS liegen Rohrregister im Beton der Geschossdecken. Wasser fliesst hindurch und heizt oder kühlt die ganze Betonmasse, die Decke gibt die Wärme oder Kälte dann grossflächig an die Räume ab. Man spricht auch von **Betonkernaktivierung** oder Bauteilaktivierung.

Weil die Fläche so gross ist, reicht eine sehr kleine Temperaturdifferenz zwischen Wasser und Raum. Das macht TABS zum idealen Partner für Wärmepumpen und freie Kühlung, aber auch zum trägsten Heiz- und Kühlsystem überhaupt.

## Kennwerte

| Betrieb | Vorlauftemperatur | Leistung          |
| ------- | ----------------- | ----------------- |
| Heizen  | etwa 24 – 28 °C   | etwa 25 – 30 W/m² |
| Kühlen  | etwa 19 – 21 °C   | etwa 25 – 35 W/m² |

Die Werte stammen aus der Siemens-Unterlage und gelten für eine freie, nicht verkleidete Betondecke. Die Kühlleistung ist nach oben durch den **Taupunkt** der Raumluft begrenzt, siehe [Taupunkt](/wissen/taupunkt).

Ein Register umfasst typisch 15 bis 25 m² und wird vor dem Betonieren zwischen den Armierungslagen verlegt, zusammen mit Elektro-Leerrohren und Abläufen. Vor dem Betonieren braucht es eine Abnahme und eine Druckprobe. Später lässt sich nichts mehr ändern.

## Selbstregeleffekt

Die Decke ist nur wenige Kelvin wärmer oder kälter als der Raum. Steigt die Raumtemperatur, etwa durch Sonne oder Personen, wird die Differenz kleiner, und die Decke heizt von selbst weniger. Wird der Raum wärmer als die Decke, kühlt sie sogar. Dieser Effekt wirkt bis etwa 30 °C Vorlauf. Er ersetzt teilweise die Einzelraumregelung, die bei TABS sowieso kaum möglich ist.

## Was dazu passen muss

TABS funktioniert nur als Gesamtkonzept:

- sehr guter Wärmeschutz und **aussenliegender Sonnenschutz**, sonst reicht die kleine Leistung nicht
- genug Speichermasse und eine **freie Betondecke**. Akustikdecken, abgehängte Decken, Hohlböden und Dämmschichten bremsen die Wärmeübertragung. Die freie Decke ist dafür akustisch eine Herausforderung.
- luftdichte Hülle mit Grundlüftung und Wärmerückgewinnung
- Nutzer, die eine gewisse **Temperaturschwankung** über den Tag akzeptieren

## Regelung

### Heiz- und Kühlkurve

Der Vorlauf einer TABS-Zone wird witterungsgeführt, aber nicht nach der aktuellen Aussentemperatur, sondern nach ihrem **gleitenden Mittel der letzten 24 Stunden**. Eine Heizkurve und eine Kühlkurve legen den Vorlaufsollwert fest, eine Heizgrenze und eine Kühlgrenze geben Heizen und Kühlen frei. Die Kühlgrenze kann sogar tiefer liegen als die Heizgrenze, weil ein gut gedämmtes Bürogebäude schon bei milden Temperaturen Wärme abführen muss.

Für Wochenenden und Ferien, an denen die inneren Lasten fehlen, wird die Kurve zeitgesteuert angehoben.

### Sequenz Heizen und Kühlen

Eine Zone hat meist ein Heiz- und ein Kühlventil und eine Zonenpumpe. Eine Sequenzregelung fährt die Ventile wie bei einer Zulufttemperaturregelung nacheinander, **nie beide gleichzeitig**.

### Raumtemperatur

Wegen der Trägheit wirken Sollwertänderungen erst nach vielen Stunden. Eine Raumtemperaturkorrektur ist deshalb nur **von Tag zu Tag** sinnvoll, nicht innerhalb eines Tages. Sie darf nur aktiv sein, wenn kein Zusatzsystem wie Heizkörper die Raumtemperatur regelt, sonst arbeiten die beiden gegeneinander.

### Taktbetrieb

Statt die Zonenpumpe dauernd laufen zu lassen, lädt der Regler die Decke in Intervallen mit etwas höherer Vorlauftemperatur. Das spart Pumpenstrom. Siemens nennt für seine Applikation bis zu 60 % Einsparung bei der Zonenpumpe. Zugleich lassen sich die Ladezeiten dorthin legen, wo Energie günstig ist:

- **nachts kühlen** mit freier Kühlung über den Rückkühler, wenn die Luft kalt ist
- **Wärmepumpe im Niedertarif** laufen lassen

Nach einer Pause läuft die Pumpe kurz mit geschlossenen Ventilen (**Spülbetrieb**). So misst der Rücklauffühler die tatsächliche Betontemperatur, und der Regler weiss, ob er laden muss.

## Für die GA

| Datenpunkt                    | Typ | Beschreibung                                |
| ----------------------------- | --- | ------------------------------------------- |
| Zonenvorlauf, Zonenrücklauf   | AI  | Rücklauf nach Spülbetrieb = Betontemperatur |
| Aussentemperatur, 24-h-Mittel | AV  | Führungsgrösse für Heiz- und Kühlkurve      |
| Heizventil, Kühlventil        | AO  | in Sequenz                                  |
| Zonenpumpe                    | DO  | Taktbetrieb                                 |
| Raumtemperatur Referenz       | AI  | Korrektur von Tag zu Tag                    |
| Raumfeuchte oder Taupunkt     | AI  | Kühlvorlauf über Taupunkt halten            |

## Quellen

- Siemens Schweiz AG: «Regeln und Steuern von Heizungsanlagen», Schulungsunterlage BT_0094, 2023, Kap. 3.9
- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», BT_0093, 2026, Kap. 3.4.7
- EN ISO 11855: Umweltgerechte Gebäudeplanung — Flächenintegrierte Strahlheizungs- und -kühlsysteme

<!-- EN -->

With TABS, pipe registers are cast into the concrete of the floor slabs. Water flows through them and heats or cools the whole concrete mass; the slab then releases heat or cold over a large area to the rooms. It is also called **concrete core activation**.

Because the area is so large, a very small temperature difference between water and room is enough. That makes TABS an ideal partner for heat pumps and free cooling, but also the slowest heating and cooling system of all.

## Key Figures

| Mode    | Flow temperature | Output             |
| ------- | ---------------- | ------------------ |
| Heating | about 24 – 28 °C | about 25 – 30 W/m² |
| Cooling | about 19 – 21 °C | about 25 – 35 W/m² |

The values come from the Siemens document and apply to an exposed, uncovered concrete slab. Cooling output is limited by the **dew point** of the room air, see [Dew Point](/wissen/taupunkt).

A register typically covers 15 to 25 m² and is laid between the reinforcement layers before concreting, together with electrical conduits and drains. An inspection and a pressure test are required before concreting. Nothing can be changed afterwards.

## Self-Regulating Effect

The slab is only a few kelvin warmer or colder than the room. If the room temperature rises, for example due to sun or people, the difference becomes smaller and the slab automatically heats less. If the room becomes warmer than the slab, it even cools. This effect works up to about 30 °C flow temperature. It partly replaces individual room control, which is hardly possible with TABS anyway.

## What Must Fit

TABS only works as an overall concept:

- very good thermal insulation and **external solar shading**, otherwise the small output is not enough
- enough thermal mass and an **exposed concrete slab**. Acoustic ceilings, suspended ceilings, raised floors and insulation layers slow heat transfer. The exposed slab is in turn an acoustic challenge.
- airtight envelope with base ventilation and heat recovery
- users who accept some **temperature swing** during the day

## Control

### Heating and Cooling Curve

The flow of a TABS zone is weather-compensated, but not by the current outdoor temperature: by its **moving average over the last 24 hours**. A heating curve and a cooling curve set the flow setpoint; a heating limit and a cooling limit enable heating and cooling. The cooling limit may even be lower than the heating limit, because a well-insulated office building has to remove heat already in mild weather.

For weekends and holidays, when internal gains are missing, the curve is raised on a time schedule.

### Heating and Cooling Sequence

A zone usually has a heating valve, a cooling valve and a zone pump. A sequence controller operates the valves one after the other, as in supply air temperature control, **never both at once**.

### Room Temperature

Because of the inertia, setpoint changes only take effect after many hours. Room temperature correction is therefore only useful **from day to day**, not within a day. It may only be active if no additional system such as radiators controls the room temperature, otherwise the two work against each other.

### Pulsed Operation

Instead of running the zone pump continuously, the controller charges the slab in intervals with a slightly higher flow temperature. This saves pump power. Siemens quotes up to 60 % savings on the zone pump for its application. At the same time the charging periods can be placed where energy is cheap:

- **cooling at night** with free cooling via the dry cooler when the air is cold
- running the **heat pump at the low tariff**

After a pause the pump runs briefly with the valves closed (**flushing mode**). The return sensor then measures the actual concrete temperature, and the controller knows whether to charge.

## For BA

| Data point                     | Type | Description                                    |
| ------------------------------ | ---- | ---------------------------------------------- |
| Zone flow, zone return         | AI   | Return after flushing = concrete temperature   |
| Outdoor temperature, 24-h mean | AV   | Leading variable for heating and cooling curve |
| Heating valve, cooling valve   | AO   | in sequence                                    |
| Zone pump                      | DO   | Pulsed operation                               |
| Reference room temperature     | AI   | Day-to-day correction                          |
| Room humidity or dew point     | AI   | Keep cooling flow above dew point              |

## Sources

- Siemens Schweiz AG: "Regeln und Steuern von Heizungsanlagen", training document BT_0094, 2023, ch. 3.9
- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", BT_0093, 2026, ch. 3.4.7
- EN ISO 11855: Building environment design — Embedded radiant heating and cooling systems
