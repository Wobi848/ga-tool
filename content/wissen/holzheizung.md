---
title: Holzheizung — Stückholz, Pellets und Holzschnitzel
title_en: Wood Heating — Log Wood, Pellets and Wood Chips
slug: holzheizung
category: heizung
subcategory: erzeuger
tags:
  [
    holz,
    holzheizung,
    stückholz,
    pellets,
    holzschnitzel,
    hackschnitzel,
    biomasse,
    lambdasonde,
    unterer abbrand,
    rücklaufanhebung,
    pufferspeicher,
    feinstaub,
    pelletlager
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [kesselregelung, pufferspeicher, heizung-grundlagen, ventil-schaltungen, fernwaerme, solarthermie]
norm: [EN 303-5, LRV]
updated: 2026-10-16
lang: de
---

# Holzheizung — Stückholz, Pellets und Holzschnitzel

Holz ist in der Schweiz ein wichtiger erneuerbarer Energieträger für Heizungen. Gegenüber Öl und Gas hat ein Holzkessel einige Eigenheiten, die die Regelung betreffen: Er lässt sich nicht einfach abschalten, er braucht einen warmen Rücklauf, und er reagiert träge.

## Brennstoffe

| Brennstoff        | Beschickung                                  | Typische Anlage                            |
| ----------------- | -------------------------------------------- | ------------------------------------------ |
| **Stückholz**     | von Hand, eine Füllung brennt einige Stunden | Einfamilienhaus, Bauernhof                 |
| **Pellets**       | automatisch, Schnecke oder Saugsystem        | Einfamilien- bis Mehrfamilienhaus, Gewerbe |
| **Holzschnitzel** | automatisch, Schnecke oder Schubboden        | grössere Gebäude, Wärmeverbunde, Quartiere |

**Stückholz** muss vor dem Verbrennen trocknen, auf etwa 15 bis 20 % Restfeuchte. Gespalten, luftig, regengeschützt und möglichst sonnig gelagert dauert das ein bis zwei Jahre. Nasses Holz brennt schlecht, russt und gibt viel Feinstaub.

**Pellets** kommen im Tankwagen und werden in den Lagerraum, ein Textilsilo oder einen Erdtank eingeblasen. Eine Förderschnecke verlangt, dass das Lager direkt neben dem Kessel liegt. Ein Saugsystem fördert auch über etwa 25 m.

**Holzschnitzel** werden im Lager aufgelockert und mit Schnecken oder einem Schubboden zum Kessel gebracht. Das Lager muss nahe bei der Heizzentrale liegen und für die Anlieferung mit dem Lastwagen erreichbar sein.

## Verbrennung

Moderne Kessel arbeiten mit **unterem Abbrand**: Nur die unterste Brennstoffschicht glüht. Das Holz trocknet, vergast (Pyrolyse), und die Gase verbrennen in einer heissen Brennkammer mit zugeführter **Sekundärluft** vollständig. Die Leistung ist gleichmässig und lässt sich regeln. Ältere Kessel und Cheminées mit **oberem Abbrand** oder **Durchbrand** verbrennen die ganze Füllung auf einmal, die Leistung schwankt stark.

Geregelt wird über die **Verbrennungsluft**, bei automatischen Kesseln zusätzlich über die **Brennstoffmenge**. Ein drehzahlgeregeltes Saugzuggebläse und eine **Lambdasonde** im Abgas messen den Restsauerstoff, dazu die Abgastemperatur. So bleiben Wirkungsgrad hoch und Emissionen tief. Moderne Kessel erreichen über 90 %.

| Kesseltyp     | Besonderheit                                                                          |
| ------------- | ------------------------------------------------------------------------------------- |
| Stückholz     | Füllung brennt etwa 4 bis 6 Stunden ab, Leistung nur begrenzt regelbar                |
| Pellets       | interner Vorratsbehälter, Dosierschnecke, Zündung mit Heissluftgebläse; moduliert gut |
| Holzschnitzel | oft mit Vorofen zur Vergasung; grössere Leistungen, braucht Grundlast                 |

## Hydraulik

- **Pufferspeicher:** Ein Stückholzkessel muss eine ganze Füllung bei Nennleistung abbrennen können, auch wenn das Haus gerade wenig Wärme braucht. Ohne ausreichend grossen Speicher drosselt er die Luft, schwelt, russt und verliert Wirkungsgrad. Auch automatische Kessel laufen mit Speicher länger und starten seltener. Siehe [Pufferspeicher](/wissen/pufferspeicher).
- **Rücklaufanhebung:** Ist der Rücklauf zu kalt, kondensieren Wasserdampf und Teer an den Heizflächen, der Kessel korrodiert und verschmutzt. Eine Rücklaufanhebung mischt warmes Vorlaufwasser bei, bis der Rücklauf die Mindesttemperatur des Herstellers hat. Hydraulisch ist das eine Beimischschaltung auf der Erzeugerseite, siehe [Hydraulische Grundschaltungen](/wissen/ventil-schaltungen).
- **Verteiler:** Holzkessel passen zu Verteilern mit hoher Rücklauftemperatur, etwa einem druckarmen Verteiler mit Bypass.
- **Thermische Ablaufsicherung:** Ein Holzfeuer lässt sich nicht abschalten. Bei Übertemperatur öffnet ein Ventil mit Kapillarfühler Kaltwasser durch einen Sicherheitswärmeübertrager im Kessel, ohne Strom. Siehe [Heizung Grundlagen](/wissen/heizung-grundlagen).

## Für die GA

- **Kessel-Freigabe** nach Pufferzustand, bei Kaskaden mit Folgeschaltung. Ein Holzkessel braucht nach dem Start Zeit, bis er Leistung bringt. Die Ladung des Puffers muss rechtzeitig beginnen.
- **Abschaltung** heisst bei Holz: Brennstoffzufuhr stoppen und ausbrennen lassen. Die Wärme der Glut muss noch abgeführt werden, die Pumpe läuft nach.
- **Bivalent:** Oft deckt Holz die Grundlast, ein Öl- oder Gaskessel die Spitze und den Sommer. Die GA legt fest, wer Vorrang hat.
- **Pelletlager:** Frische Pellets geben **Kohlenmonoxid** ab. Lagerräume müssen belüftet sein und dürfen erst nach Lüften betreten werden. Grössere Lager haben eine CO-Warnanlage.

| Datenpunkt                        | Typ | Beschreibung                                   |
| --------------------------------- | --- | ---------------------------------------------- |
| Freigabe Kessel                   | DO  | aus Pufferlogik                                |
| Betrieb, Störung                  | DI  | oder über Bus                                  |
| Kesseltemperatur, Abgastemperatur | AI  | Verschmutzung erkennen: Abgastemperatur steigt |
| Rücklauftemperatur Kessel         | AI  | Rücklaufanhebung überwachen                    |
| Pufferfühler oben, Mitte, unten   | AI  | Ladezustand                                    |
| Füllstand Lager                   | AI  | Pellets oder Schnitzel nachbestellen           |
| Wärmemenge                        | Bus | [Wärmezähler](/wissen/waermemengenzaehler)     |

## Luftreinhaltung

Holzfeuerungen stossen mehr Feinstaub aus als Gas- oder Ölkessel. In der Schweiz begrenzt die **Luftreinhalte-Verordnung (LRV)** die Emissionen, die Grenzwerte hängen von Brennstoff und Leistung ab. Grössere Schnitzelanlagen haben deshalb Elektro- oder Gewebefilter. Für die Emissionen entscheidend sind trockenes Holz, ein Kessel, der nicht im Schwachlastbetrieb schwelt, und regelmässige Reinigung.

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 3.3.2
- EN 303-5: Heizkessel für feste Brennstoffe
- Luftreinhalte-Verordnung (LRV), SR 814.318.142.1

<!-- EN -->

Wood is an important renewable energy source for heating in Switzerland. Compared with oil and gas, a wood boiler has some peculiarities that affect control: it cannot simply be switched off, it needs a warm return, and it reacts slowly.

## Fuels

| Fuel           | Feeding                                   | Typical installation                        |
| -------------- | ----------------------------------------- | ------------------------------------------- |
| **Log wood**   | by hand, one load burns for several hours | Single-family house, farm                   |
| **Pellets**    | automatic, auger or vacuum system         | Single to multi-family houses, commercial   |
| **Wood chips** | automatic, auger or walking floor         | Larger buildings, district heating networks |

**Log wood** must dry before burning, to about 15 to 20 % residual moisture. Split, airy, protected from rain and ideally in the sun, this takes one to two years. Wet wood burns poorly, soots and produces a lot of fine dust.

**Pellets** arrive by tanker and are blown into the store room, a textile silo or an underground tank. An auger requires the store to be directly next to the boiler. A vacuum system also conveys over about 25 m.

**Wood chips** are loosened in the store and moved to the boiler by augers or a walking floor. The store must be close to the boiler room and reachable by truck for delivery.

## Combustion

Modern boilers use **bottom burn**: only the lowest fuel layer glows. The wood dries, gasifies (pyrolysis), and the gases burn completely in a hot combustion chamber with added **secondary air**. Output is even and controllable. Older boilers and fireplaces with **top burn** or **through burn** burn the whole load at once; output fluctuates strongly.

Control is via **combustion air**, and for automatic boilers also via the **fuel quantity**. A variable-speed induced-draught fan and a **lambda probe** in the flue gas measure residual oxygen, together with the flue gas temperature. This keeps efficiency high and emissions low. Modern boilers exceed 90 %.

| Boiler type | Particularity                                                               |
| ----------- | --------------------------------------------------------------------------- |
| Log wood    | a load burns for about 4 to 6 hours, output only partly controllable        |
| Pellets     | internal hopper, metering auger, ignition by hot-air blower; modulates well |
| Wood chips  | often with a pre-furnace for gasification; larger outputs, needs base load  |

## Hydraulics

- **Buffer tank:** a log boiler must be able to burn a whole load at rated output even when the house needs little heat. Without a large enough tank it throttles the air, smoulders, soots and loses efficiency. Automatic boilers also run longer and start less often with a tank. See [Buffer Tank](/wissen/pufferspeicher).
- **Return temperature boost:** if the return is too cold, water vapour and tar condense on the heating surfaces, and the boiler corrodes and fouls. A return boost mixes in warm flow water until the return reaches the manufacturer's minimum temperature. Hydraulically this is a mixing circuit on the generator side, see [Basic Hydraulic Circuits](/wissen/ventil-schaltungen).
- **Header:** wood boilers suit headers with a high return temperature, such as a low-pressure header with bypass.
- **Thermal discharge safety device:** a wood fire cannot be switched off. On overtemperature, a valve with a capillary sensor opens cold water through a safety heat exchanger in the boiler, without power. See [Heating Fundamentals](/wissen/heizung-grundlagen).

## For BA

- **Boiler enable** according to buffer state, with sequencing for cascades. A wood boiler needs time after starting before it delivers output. Charging the buffer must start in good time.
- **Switching off** means for wood: stop the fuel feed and let it burn out. The heat of the embers must still be removed; the pump runs on.
- **Bivalent:** often wood covers the base load, an oil or gas boiler the peak and the summer. BA decides which has priority.
- **Pellet store:** fresh pellets give off **carbon monoxide**. Store rooms must be ventilated and may only be entered after airing. Larger stores have a CO alarm.

| Data point                               | Type | Description                                |
| ---------------------------------------- | ---- | ------------------------------------------ |
| Boiler enable                            | DO   | from buffer logic                          |
| Running, fault                           | DI   | or via bus                                 |
| Boiler temperature, flue gas temperature | AI   | Detect fouling: flue gas temperature rises |
| Boiler return temperature                | AI   | Monitor the return boost                   |
| Buffer sensors top, middle, bottom       | AI   | Charge state                               |
| Store level                              | AI   | Reorder pellets or chips                   |
| Heat quantity                            | Bus  | [Heat meter](/wissen/waermemengenzaehler)  |

## Air Quality

Wood firing emits more fine dust than gas or oil boilers. In Switzerland the **Ordinance on Air Pollution Control (LRV)** limits emissions; the limit values depend on fuel and output. Larger wood chip plants therefore have electrostatic or fabric filters. What matters most for emissions is dry wood, a boiler that does not smoulder at low load, and regular cleaning.

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 3.3.2
- EN 303-5: Heating boilers for solid fuels
- Ordinance on Air Pollution Control (LRV), SR 814.318.142.1
