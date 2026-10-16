---
title: Solarthermie — Sonnenkollektoren für Warmwasser und Heizung
title_en: Solar Thermal — Collectors for Hot Water and Heating
slug: solarthermie
category: energie
subcategory: erzeuger
tags:
  [
    solarthermie,
    sonnenkollektor,
    flachkollektor,
    röhrenkollektor,
    vakuumröhre,
    solarkreis,
    deckungsgrad,
    globalstrahlung,
    temperaturdifferenzregelung,
    stagnation,
    low-flow,
    solarspeicher,
    vorwärmung
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [
    pufferspeicher,
    trinkwasser-erwaermung,
    legionellen,
    pv-integration,
    waermepumpe,
    absorptionskaelte
  ]
norm: [SIA 385/1, EN 12975, EN 12976]
updated: 2026-10-16
lang: de
---

# Solarthermie — Sonnenkollektoren für Warmwasser und Heizung

Sonnenkollektoren wandeln Sonnenstrahlung direkt in Wärme um. Anders als [Photovoltaik](/wissen/pv-integration), die Strom erzeugt, liefert Solarthermie Wärme für Warmwasser, Heizung oder Prozesse. Die Sonne ersetzt dabei nie den Wärmeerzeuger ganz, sondern deckt einen Teil des Jahresbedarfs.

## Strahlung

Ausserhalb der Atmosphäre kommen rund 1360 W/m² an (Solarkonstante). Am Boden bleiben bei klarem Himmel höchstens etwa 1000 W/m² **Globalstrahlung**. Sie besteht aus:

- **Direktstrahlung:** gerichtet, bei klarem Himmel, nutzt jeder Kollektor
- **Diffusstrahlung:** an Wolken und Staub gestreut, ungerichtet, nicht jeder Kollektor nutzt sie gut
- **Reflektierte Strahlung:** von Boden, Schnee oder Fassaden

## Solarer Deckungsgrad

Der Deckungsgrad ist der Anteil des Jahreswärmebedarfs, den die Sonne liefert. Das Problem: Im Winter, wenn am meisten Wärme gebraucht wird, scheint die Sonne am wenigsten.

| Anwendung                  | Auslegung und Deckungsgrad                                                                                  |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Nur Warmwasser**         | so gross, dass im Sommer fast 100 % gedeckt sind; im Winter heizt der Erzeuger nach                         |
| **Warmwasser und Heizung** | je nach Gebäude und Kollektorfläche ein deutlich kleinerer Anteil; der Siemens-Unterlage nach bis rund 40 % |
| **Freibad**                | ganz solar möglich, wenn man in Schlechtwetterperioden kühleres Wasser akzeptiert                           |

Grosse Anlagen mit hohem Deckungsgrad werden schnell unwirtschaftlich, weil sie im Sommer viel Wärme produzieren, die niemand braucht.

## Kollektoren

| Bauart                     | Eigenschaften                                                                                                                                                         |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Flachkollektor**         | selektiv beschichteter Absorber unter Glas, gedämmtes Gehäuse; günstig, auf oder ins Dach; am weitesten verbreitet                                                    |
| **Vakuum-Flachkollektor**  | Vakuum statt Dämmung, kaum Konvektionsverluste, kein Kondensat; teurer                                                                                                |
| **Vakuum-Röhrenkollektor** | Absorber in evakuierten Glasröhren; sehr kleine Verluste, hoher Ertrag auch bei tiefer Aussentemperatur und hoher Nutztemperatur; braucht weniger Fläche, kostet mehr |

## Solarkreis

Der Solarkreis bringt die Wärme vom Kollektor zum Speicher. Er ist mit einem **Wasser-Glykol-Gemisch** gefüllt, damit er im Winter nicht einfriert. Die Bauteile sitzen meist vorkonfektioniert in einer **Solarstation**: Pumpe, Rückschlagventil, Sicherheitsventil, Manometer, Anschluss für das Ausdehnungsgefäss, Entlüfter und Regler.

- **Low-Flow:** kleiner Durchfluss, das Medium bleibt länger im Kollektor und kommt heisser zurück. Gut für Schichtspeicher, kleinere Leitungen, weniger Pumpenstrom.
- **High-Flow:** grosser Durchfluss, tiefere Temperaturen, etwas höherer Kollektorwirkungsgrad, aber mehr Pumpenstrom.

### Stagnation

Wird keine Wärme abgenommen, etwa weil der Speicher im Sommer voll ist, steht die Pumpe, und der Kollektor heizt sich weit über 100 °C auf, bei Vakuumröhren bis über 200 °C. Das Medium verdampft. Das ist ein normaler Betriebszustand, auf den die Anlage ausgelegt sein muss: Ausdehnungsgefäss gross genug, damit es den Dampf aufnimmt, und das Glykol altert schneller, wenn es oft stagniert. Ein Sicherheitsventil, das abbläst, ist ein Planungsfehler.

## Speicher

Die Sonne scheint am Mittag, Warmwasser braucht man morgens und abends. Der Speicher gleicht das aus.

- Faustwert **50 bis 100 l Speicher pro m² Kollektorfläche**, die untere Grenze für reines Warmwasser, die obere mit Heizungsunterstützung
- Einfamilienhaus: Warmwasserspeicher etwa 350 bis 500 l, Kombispeicher für Heizung und Warmwasser etwa 1000 bis 2000 l
- Der Solar-Wärmetauscher sitzt **unten** im Speicher, wo es am kältesten ist. Die Nachheizung sitzt oben und heizt nur den Bereitschaftsteil.
- Grosse Anlagen haben oft zwei Wärmetauscher oder einen externen Plattentauscher mit **Schichtladung**: Heisses Medium geht nach oben, lauwarmes wärmt unten vor.

Bei grossen Anlagen mit **Vorwärmspeicher** wärmt die Sonne das Kaltwasser vor, ein zweiter Speicher heizt nach. Der Vorwärmspeicher kann lange unter 55 °C liegen. Er muss in das Legionellenkonzept einbezogen werden, siehe [Legionellen](/wissen/legionellen).

## Regelung: Temperaturdifferenz

Der Solarregler vergleicht die **Kollektortemperatur** mit der Temperatur **unten im Speicher**:

- Pumpe ein, wenn der Kollektor einige Kelvin wärmer ist als der Speicher, typisch 5 bis 8 K
- Pumpe aus, wenn die Differenz unter etwa 2 bis 4 K fällt
- Speicher-Maximaltemperatur: Pumpe aus, der Kollektor geht in Stagnation
- Drehzahlregelung der Pumpe hält die Differenz konstant

Die Einschaltschwelle muss höher sein als die Ausschaltschwelle, sonst taktet die Pumpe. Der Kollektorfühler sitzt im Vorlauf am Kollektoraustritt, nicht irgendwo im Dachraum.

## Für die GA

Die Solaranlage hat fast immer einen eigenen Regler. Die GA sollte aber mitlesen, denn eine stehende Solaranlage fällt sonst niemandem auf: Der Kessel heizt einfach nach.

| Datenpunkt              | Typ | Beschreibung                                                             |
| ----------------------- | --- | ------------------------------------------------------------------------ |
| Kollektortemperatur     | AI  | Stagnation, Fühlerdefekt                                                 |
| Speicher unten, oben    | AI  | Ladezustand                                                              |
| Solarpumpe Betrieb      | DI  | oder über Bus                                                            |
| Anlagendruck Solarkreis | AI  | Druckverlust zeigt Leck oder Abblasen an                                 |
| Solarertrag             | Bus | [Wärmezähler](/wissen/waermemengenzaehler) im Solarkreis, glykoltauglich |

**Plausibilität:** Sonniger Tag, Kollektor heiss, aber kein Ertrag oder die Pumpe läuft nie, ist eine Störung. Im Trending über einige Tage sieht man das sofort.

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 3.3.3
- EN 12975 (Kollektoren), EN 12976 (vorgefertigte Anlagen)
- SIA 385/1: Anlagen für Trinkwarmwasser in Gebäuden

<!-- EN -->

Solar collectors convert sunlight directly into heat. Unlike [photovoltaics](/wissen/pv-integration), which generate electricity, solar thermal delivers heat for hot water, space heating or processes. The sun never fully replaces the heat generator; it covers part of the annual demand.

## Radiation

Outside the atmosphere about 1360 W/m² arrive (solar constant). At ground level, with a clear sky, at most about 1000 W/m² of **global radiation** remain. It consists of:

- **Direct radiation:** directional, with clear sky; every collector uses it
- **Diffuse radiation:** scattered by clouds and dust, non-directional; not every collector uses it well
- **Reflected radiation:** from the ground, snow or façades

## Solar Fraction

The solar fraction is the share of annual heat demand supplied by the sun. The problem: in winter, when most heat is needed, the sun shines least.

| Application               | Sizing and solar fraction                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Hot water only**        | sized so that almost 100 % is covered in summer; in winter the generator tops up                                          |
| **Hot water and heating** | a considerably smaller share depending on building and collector area; according to the Siemens document up to about 40 % |
| **Outdoor pool**          | fully solar possible if cooler water is accepted in bad weather periods                                                   |

Large systems with a high solar fraction quickly become uneconomic, because in summer they produce a lot of heat nobody needs.

## Collectors

| Type                         | Characteristics                                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Flat-plate collector**     | selectively coated absorber under glass, insulated casing; inexpensive, on-roof or in-roof; most common                                      |
| **Evacuated flat-plate**     | vacuum instead of insulation, hardly any convection losses, no condensation; more expensive                                                  |
| **Evacuated tube collector** | absorber in evacuated glass tubes; very low losses, high yield even at low outdoor and high useful temperatures; needs less area, costs more |

## Solar Circuit

The solar circuit carries the heat from the collector to the tank. It is filled with a **water-glycol mixture** so it does not freeze in winter. The components usually come prefabricated in a **solar station**: pump, non-return valve, safety valve, pressure gauge, connection for the expansion vessel, air separator and controller.

- **Low-flow:** small flow, the fluid stays longer in the collector and returns hotter. Good for stratified tanks, smaller pipes, less pump power.
- **High-flow:** large flow, lower temperatures, slightly higher collector efficiency, but more pump power.

### Stagnation

If no heat is drawn, for example because the tank is full in summer, the pump stops and the collector heats up well above 100 °C, with evacuated tubes to over 200 °C. The fluid evaporates. This is a normal operating state the system must be designed for: an expansion vessel large enough to take up the vapour, and the glycol ages faster if it stagnates often. A safety valve that blows off is a design error.

## Storage

The sun shines at midday; hot water is needed morning and evening. The tank balances this.

- Rule of thumb **50 to 100 l of storage per m² of collector area**, the lower end for hot water only, the upper with space heating support
- Single-family house: hot water tank about 350 to 500 l, combined tank for heating and hot water about 1000 to 2000 l
- The solar heat exchanger sits at the **bottom** of the tank, where it is coldest. The backup heating sits at the top and heats only the standby volume.
- Large systems often have two heat exchangers or an external plate exchanger with **stratified charging**: hot fluid goes to the top, lukewarm preheats the bottom.

In large systems with a **preheating tank**, the sun preheats the cold water and a second tank tops up. The preheating tank can stay below 55 °C for long periods. It must be included in the legionella concept, see [Legionella](/wissen/legionellen).

## Control: Temperature Difference

The solar controller compares the **collector temperature** with the temperature at the **bottom of the tank**:

- Pump on when the collector is a few kelvin warmer than the tank, typically 5 to 8 K
- Pump off when the difference drops below about 2 to 4 K
- Maximum tank temperature: pump off, the collector goes into stagnation
- Pump speed control keeps the difference constant

The switch-on threshold must be higher than the switch-off threshold, otherwise the pump cycles. The collector sensor sits in the flow at the collector outlet, not somewhere in the attic.

## For BA

The solar system almost always has its own controller. BA should still read it, because a failed solar system otherwise goes unnoticed: the boiler simply tops up.

| Data point             | Type | Description                                                                    |
| ---------------------- | ---- | ------------------------------------------------------------------------------ |
| Collector temperature  | AI   | Stagnation, sensor fault                                                       |
| Tank bottom, top       | AI   | Charge state                                                                   |
| Solar pump running     | DI   | or via bus                                                                     |
| Solar circuit pressure | AI   | A pressure drop indicates a leak or blow-off                                   |
| Solar yield            | Bus  | [Heat meter](/wissen/waermemengenzaehler) in the solar circuit, glycol-capable |

**Plausibility:** a sunny day, hot collector but no yield, or a pump that never runs, is a fault. Trending over a few days shows it at once.

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 3.3.3
- EN 12975 (collectors), EN 12976 (factory-made systems)
- SIA 385/1: Domestic hot water installations in buildings
