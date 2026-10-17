---
title: Funktionserhalt und Brandverhalten von Kabeln
title_en: Circuit Integrity and Fire Behaviour of Cables
slug: funktionserhalt-kabel
category: elektro
subcategory: installation
tags:
  [
    funktionserhalt,
    brandverhalten,
    kabel,
    p30,
    p90,
    e90,
    cca,
    dca,
    halogenfrei,
    cpr,
    fluchtweg,
    rwa,
    sicherheitsbeleuchtung,
    kbob
  ]
difficulty: fortgeschritten
area: [elektro, ga]
related: [entrauchung-rwa, brandschutzklappen, nin-niv, kbob, schirmung-erdung]
norm: [EN 13501-6, EN 50575, EN 50399, EN 50577, KBOB Elektrokabel 2014]
updated: 2026-10-17
lang: de
---

# Funktionserhalt und Brandverhalten von Kabeln

Im Brandfall müssen zwei Dinge gleichzeitig stimmen. Die vielen gewöhnlichen Kabel im Gebäude sollen möglichst wenig zum Brand beitragen: wenig Wärme, wenig Rauch, keine brennenden Tropfen, keine ätzenden Gase. Die wenigen Kabel der Sicherheitsanlagen sollen dagegen weiter funktionieren, solange Menschen fliehen und die Feuerwehr arbeitet. Das erste heisst **Brandverhalten**, das zweite **Funktionserhalt**.

Für die GA ist das kein Randthema. Die Ansteuerung der RWA, die Speisung einer Überdruckanlage oder die Meldung «Brandfall» an Lüftungsanlagen hängen an solchen Kabeln. Die KBOB-Empfehlung «Einsatz von Elektro-Kabeln» (Version 2.1, 2014) legt für öffentliche Bauten fest, welche Kabel wo zu verwenden sind. Verbindlich bleiben daneben die VKF-Brandschutzvorschriften, die NIN und die Auflagen der Brandschutzbehörde.

## Brandverhalten: die Klassen

Seit der europäischen Bauprodukteverordnung (CPR) werden Kabel nach **EN 13501-6** klassiert und geprüft nach EN 50399, im Bündel senkrecht auf einer Leiter:

| Klasse   | Bedeutung                                                     | Wärmefreisetzung in 20 min |
| -------- | ------------------------------------------------------------- | -------------------------- |
| B1ca     | kaum Abbrand, auch mit 30-kW-Brenner                          | ≤ 10 MJ                    |
| B2ca     | keine stetige Flammenausbreitung, geringe Wärmeabgabe         | ≤ 15 MJ                    |
| **Cca**  | keine stetige Flammenausbreitung, begrenzte Wärmeabgabe       | ≤ 30 MJ                    |
| **Dca**  | stetige, aber mässige Flammenausbreitung                      | ≤ 70 MJ                    |
| Eca, Fca | entzündet sich schon bei kleiner Flamme bzw. ohne Anforderung | —                          |

Dazu kommen Zusatzklassen:

- **s1 bis s3** Rauchentwicklung; s1a, s1b zusätzlich mit Sichttrübung nach EN 61034
- **d0 bis d2** brennendes Abtropfen; d0 keines, d1 höchstens 10 s
- **a1 bis a3** Azidität der Brandgase; a1 kaum korrosiv

Ein Kabel heisst dann zum Beispiel **Cca-s1,d1,a1**.

## Welche Klasse wo

Die KBOB wählt in zwei Schritten.

**1. Brandverhalten nach Gebäude:**

| Gebäude                                                                                                                                                                          | Kabel            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| erhöhte Personengefährdung: grosse Personenbelegung, Spitäler, Heime, Schulen mit Sälen, Verkauf über 1200 m² oder über 100 Personen, unterirdische Anlagen, Tunnel, Gefängnisse | **Cca s1 d1 a1** |
| erhöhter Sachwertschutz: Museen, Banken, Baudenkmäler                                                                                                                            | **Cca s1 d1 a1** |
| hohe Versorgungssicherheit: Flughäfen, Bahnhöfe, Rechenzentren, Energieversorgung, Stadien                                                                                       | **Cca s1 d1 a1** |
| übrige, z.B. Büros und Verwaltung bis 100 Personen                                                                                                                               | **Dca s2 d2 a2** |

Die Wahl gilt für alle Kabel im Gebäude, geschützt oder nicht verlegt. Für öffentliche Bauten verlangt die KBOB ausserdem **ausschliesslich halogenfreie** Materialien: PVC bildet im Brand Salzsäure, die Menschen, Bausubstanz und Elektronik schädigt, auch weit weg vom Brandherd.

**2. Funktionserhalt nach Anlage:**

| Funktionserhalt                   | Wofür                                                                                                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **30–60 min** (kantonal geregelt) | bis die Rettungskräfte da sind: Sicherheitsbeleuchtung, Melde- und Evakuierungssysteme, Ansteuerung und Speisung von Notsystemen, Personenaufzüge mit Evakuierungssteuerung |
| **90 min**                        | auch während des Einsatzes der Feuerwehr: **RWA**, **Überdruckanlagen (RDA)**, Feuerwehraufzüge inkl. Entwässerung der Unterfahrt, Löschwasser-Druckerhöhung                |

Massgebend sind die Festlegungen der Brandschutzbehörde im Brandschutzkonzept.

## Funktionserhalt ist ein System

Geprüft wird nach **EN 50577** nicht das Kabel allein, sondern Kabel **mit** Befestigung im Brandofen. Die Klassen heissen **P30, P60, P90, P120**. Sie entsprechen weitgehend den früheren deutschen Angaben **E30, E60, E90** nach DIN 4102-12. Nicht verwechseln mit dem Isolationserhalt **PH** (früher FE), bei dem nur ein einzelnes Kabel geprüft wird.

- Das **Tragsystem** (Kanal, Bügel, Dübel) braucht dieselbe Dauer. Die schwächere Komponente bestimmt das Ganze.
- Befestigungsabstände und maximale Belastung des Herstellers einhalten. Ein P90-Kabel auf einer gewöhnlichen Kabelpritsche ist kein P90-System.
- Im Brand steigt der Leiterwiderstand. Die geringere Strombelastbarkeit bei der Dimensionierung berücksichtigen, notfalls grösserer Querschnitt.
- Verteilungen, Klemmdosen und Durchführungen gehören ebenfalls zum Funktionserhalt.

**Für die GA heisst das:** Wer eine RWA ansteuert, eine Überdruckanlage speist oder Brandfallsteuerungen verdrahtet, klärt im Brandschutzkonzept, welche Leitungen Funktionserhalt brauchen, und plant sie als eigenes System. Busleitungen der normalen GA haben keinen Funktionserhalt; sicherheitsrelevante Befehle laufen deshalb fest verdrahtet oder über die Steuerzentrale der Sicherheitsanlage. Siehe [Entrauchung und RWA](/wissen/entrauchung-rwa).

## Kabeltrassen in Fluchtwegen

Fluchtwege sollen möglichst frei von Brandlast sein. Die KBOB begrenzt die Wärmefreisetzung in Fluchtwegen auf **50 MJ/m²** nach EN 50399. Pro Meter Fluchtwegbreite ergibt das ungefähr folgende Trassenbreite bei einfacher Belegung:

| Kabelklasse | Trassenbreite pro 1 m Fluchtweg |
| ----------- | ------------------------------- |
| Dca         | 35 cm                           |
| Cca         | 80 cm                           |
| B2ca        | 160 cm                          |

Beispiel: Ein 2,5 m breiter Korridor in einem Pflegeheim mit Cca-Kabeln erlaubt 2,5 × 0,8 m = 2 m Trassenbreite. In **Treppenhäusern** sind nur Kabel zulässig, die das Treppenhaus selbst braucht. Transittrassen sind zu vermeiden oder brandschutztechnisch abzukapseln.

## Kosten

Die KBOB schätzt die Mehrkosten der geforderten Kabel auf 0 bis 2 % der Elektroinstallation. Viel teurer ist ein Brand mit PVC-Kabeln in einem Rechenzentrum oder Spital: Die korrosiven Gase zerstören auch Anlagen, die nie gebrannt haben.

## Stand der Quellen

Die Empfehlung von 2014 nennt EN 50575 und EN 50577 noch als Entwürfe (prEN); beide sind inzwischen erschienen. Kantonale Vorgaben und die aktuellen VKF-Brandschutzrichtlinien gehen vor.

## Quellen

- KBOB: Empfehlung Einsatz von Elektro-Kabeln, Funktionserhalt und Brandverhalten, Version 2.1, Juni 2014
- EN 13501-6: Klassifizierung von Bauprodukten, Elektrokabel
- EN 50399, EN 50577; NIN SN 411000

<!-- EN -->

In a fire two things must be right at the same time. The many ordinary cables in the building should contribute as little as possible to the fire: little heat, little smoke, no burning droplets, no corrosive gases. The few cables of the safety systems, by contrast, must keep working while people escape and the fire brigade operates. The first is called **fire behaviour**, the second **circuit integrity**.

For BA this is not a side issue. Control of smoke and heat exhaust (SHEV), supply of a pressurisation system or the "fire" signal to ventilation plants depend on such cables. The KBOB recommendation "Use of electrical cables" (version 2.1, 2014) specifies which cables to use where in public buildings. The VKF fire protection regulations, the Swiss installation standard NIN and the requirements of the fire authority remain binding.

## Fire Behaviour: the Classes

Since the European Construction Products Regulation (CPR) cables are classified per **EN 13501-6** and tested per EN 50399, as a bundle vertically on a ladder:

| Class    | Meaning                                          | Heat release in 20 min |
| -------- | ------------------------------------------------ | ---------------------- |
| B1ca     | hardly burns, even with a 30 kW burner           | ≤ 10 MJ                |
| B2ca     | no continuous flame spread, low heat release     | ≤ 15 MJ                |
| **Cca**  | no continuous flame spread, limited heat release | ≤ 30 MJ                |
| **Dca**  | continuous but moderate flame spread             | ≤ 70 MJ                |
| Eca, Fca | ignites with a small flame or no requirement     | —                      |

Additional classes:

- **s1 to s3** smoke production; s1a, s1b additionally with light transmission per EN 61034
- **d0 to d2** flaming droplets; d0 none, d1 at most 10 s
- **a1 to a3** acidity of fire gases; a1 hardly corrosive

A cable is then called, for example, **Cca-s1,d1,a1**.

## Which Class Where

KBOB selects in two steps.

**1. Fire behaviour by building:**

| Building                                                                                                                                                                   | Cables           |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| increased risk to persons: large occupancy, hospitals, care homes, schools with halls, retail above 1200 m² or above 100 persons, underground facilities, tunnels, prisons | **Cca s1 d1 a1** |
| increased property protection: museums, banks, listed buildings                                                                                                            | **Cca s1 d1 a1** |
| high supply security: airports, stations, data centres, energy supply, stadiums                                                                                            | **Cca s1 d1 a1** |
| others, e.g. offices and administration up to 100 persons                                                                                                                  | **Dca s2 d2 a2** |

The choice applies to all cables in the building, whether protected or not. For public buildings KBOB also requires **exclusively halogen-free** materials: PVC forms hydrochloric acid in a fire, damaging people, building fabric and electronics, even far from the seat of the fire.

**2. Circuit integrity by system:**

| Circuit integrity                 | For what                                                                                                                                                      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **30–60 min** (set by the canton) | until rescue services arrive: safety lighting, alarm and evacuation systems, control and supply of emergency systems, passenger lifts with evacuation control |
| **90 min**                        | also during the fire brigade's operation: **SHEV**, **pressurisation systems**, firefighter lifts incl. pit drainage, fire water booster pumps                |

The fire authority's decisions in the fire protection concept are binding.

## Circuit Integrity Is a System

Tested per **EN 50577** is not the cable alone but cable **with** fixings in the furnace. The classes are **P30, P60, P90, P120**. They largely correspond to the former German ratings **E30, E60, E90** per DIN 4102-12. Do not confuse with insulation integrity **PH** (formerly FE), where only a single cable is tested.

- The **support system** (tray, clips, anchors) needs the same duration. The weaker component determines the whole.
- Observe the manufacturer's fixing distances and maximum loads. A P90 cable on an ordinary cable tray is not a P90 system.
- In a fire the conductor resistance rises. Take the lower current rating into account when sizing; use a larger cross-section if needed.
- Distribution boards, junction boxes and penetrations are part of circuit integrity too.

**For BA this means:** anyone controlling a SHEV, supplying a pressurisation system or wiring fire controls clarifies in the fire protection concept which circuits need integrity and plans them as a separate system. Ordinary BA bus cables have no circuit integrity; safety-relevant commands therefore run hard-wired or via the control panel of the safety system. See [Smoke Extraction and SHEV](/wissen/entrauchung-rwa).

## Cable Trays in Escape Routes

Escape routes should be as free of fire load as possible. KBOB limits heat release in escape routes to **50 MJ/m²** per EN 50399. Per metre of escape route width this gives roughly the following tray width with a single layer:

| Cable class | Tray width per 1 m of escape route |
| ----------- | ---------------------------------- |
| Dca         | 35 cm                              |
| Cca         | 80 cm                              |
| B2ca        | 160 cm                             |

Example: a 2.5 m wide corridor in a care home with Cca cables allows 2.5 × 0.8 m = 2 m tray width. In **stairwells** only cables needed by the stairwell itself are permitted. Transit trays are to be avoided or enclosed with fire protection.

## Cost

KBOB estimates the extra cost of the required cables at 0 to 2 % of the electrical installation. A fire with PVC cables in a data centre or hospital is far more expensive: the corrosive gases also destroy equipment that never burned.

## Status of Sources

The 2014 recommendation still cites EN 50575 and EN 50577 as drafts (prEN); both have since been published. Cantonal requirements and the current VKF fire protection guidelines take precedence.

## Sources

- KBOB: Empfehlung Einsatz von Elektro-Kabeln, Funktionserhalt und Brandverhalten, version 2.1, June 2014
- EN 13501-6: Classification of construction products, electric cables
- EN 50399, EN 50577; NIN SN 411000
