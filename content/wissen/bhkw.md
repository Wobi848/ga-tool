---
title: Blockheizkraftwerk (BHKW) — Wärme-Kraft-Kopplung
title_en: Combined Heat and Power (CHP) — Cogeneration Units
slug: bhkw
category: energie
subcategory: erzeuger
tags:
  [
    bhkw,
    wkk,
    kwk,
    wärme-kraft-kopplung,
    blockheizkraftwerk,
    mikro-bhkw,
    brennstoffzelle,
    biogas,
    wärmegeführt,
    stromgeführt,
    pufferspeicher,
    eigenverbrauch,
    trigeneration
  ]
difficulty: fortgeschritten
area: [hlk, elektro, ga]
related:
  [
    pufferspeicher,
    kesselregelung,
    absorptionskaelte,
    ems-lastmanagement,
    energiemessung,
    fernwaerme
  ]
norm: [VDI 2067]
updated: 2026-10-16
lang: de
---

# Blockheizkraftwerk (BHKW) — Wärme-Kraft-Kopplung

Ein Blockheizkraftwerk erzeugt **gleichzeitig Strom und Wärme**. Ein Verbrennungsmotor treibt einen Generator an, seine Abwärme heizt das Gebäude. In der Schweiz heisst das **Wärme-Kraft-Kopplung (WKK)**, in Deutschland Kraft-Wärme-Kopplung (KWK).

Der Vorteil: Ein grosses thermisches Kraftwerk macht aus Gas oder Öl nur rund 40 % Strom, der Rest geht als Abwärme verloren, weil selten Wärmeabnehmer daneben liegen. Das BHKW steht beim Verbraucher und nutzt die Abwärme.

## Aufbau

- **Motor:** Gas- oder Dieselmotor, betrieben mit Erdgas, Biogas, Klärgas, Deponiegas oder Heizöl
- **Generator** für den Strom
- **Wärmerückgewinnung** aus Motorkühlwasser, Abgas und Schmieröl, auf verschiedenen Temperaturstufen
- **Pufferspeicher**, damit das BHKW lange am Stück läuft und selten startet

## Kennzahlen

| Grösse                    | Richtwert                                                     |
| ------------------------- | ------------------------------------------------------------- |
| Elektrischer Wirkungsgrad | rund 30–35 % bei kleinen Anlagen, grosse Gasmotoren über 40 % |
| Thermischer Wirkungsgrad  | rund 50–55 %                                                  |
| Gesamtnutzungsgrad        | 80–90 %, mit Abgaskondensation mehr                           |
| Verhältnis Wärme zu Strom | etwa 2 bis 2.5                                                |
| Mikro-BHKW                | bis etwa 15 kW elektrisch                                     |
| Mini-BHKW                 | etwa 15 bis 50 kW elektrisch                                  |

Die Grenzen zwischen Mikro und Mini werden nicht überall gleich gezogen, die Werte hier stammen aus der Siemens-Unterlage.

## Betriebsweisen

| Betriebsweise    | Führungsgrösse                           | Überschuss geht                           |
| ---------------- | ---------------------------------------- | ----------------------------------------- |
| **Wärmegeführt** | Wärmebedarf bzw. Ladezustand des Puffers | Strom ins Netz oder in den Eigenverbrauch |
| **Stromgeführt** | Strombedarf oder Strompreis              | Wärme in den Pufferspeicher               |

In Gebäuden ist **wärmegeführt** der Normalfall. Das BHKW deckt die Grundlast, ein Kessel die Spitze (bivalent). Ausgelegt wird es auf die Wärmegrundlast, nicht auf die Heizlast: Ein BHKW rechnet sich nur mit vielen Betriebsstunden im Jahr. Im Sommer fehlt oft der Wärmeabnehmer, dann helfen Warmwasser, Prozesswärme oder eine [Absorptionskältemaschine](/wissen/absorptionskaelte) (Trigeneration).

Kleine drehzahlgeregelte BHKW mit Leistungselektronik können modulieren und auch monovalent laufen.

## Hydraulik

- Das BHKW braucht einen **kühlen Rücklauf**. Ist der Rücklauf zu warm, kann es die Motorwärme nicht loswerden und schaltet ab. Deshalb wird es meist in den **Pufferspeicher** eingebunden, der unten kalt bleibt. Siehe [Pufferspeicher](/wissen/pufferspeicher).
- Ein Rücklauf mit hoher Temperatur aus schlecht abgeglichenen Heizkreisen oder Umlenkschaltungen ist der häufigste Grund für kurze Laufzeiten.
- Das BHKW liefert seine Leistung in den Speicher, die Heizkreise entnehmen. So sind Erzeugung und Verbrauch entkoppelt.

## Für die GA

- **Freigabe** nach Ladezustand des Puffers: Ein bei Puffer oben kalt, Aus bei Puffer unten warm. Mehrere Fühler im Speicher machen das sauber.
- **Mindestlaufzeit und Mindeststillstand** einhalten, Starts zählen. Jeder Start verschleisst den Motor und erhöht die Emissionen.
- **Vorrang vor dem Kessel:** Der Spitzenkessel kommt erst, wenn das BHKW allein nicht reicht.
- **Strom:** Bei Eigenverbrauch kann ein [Energiemanagement](/wissen/ems-lastmanagement) das BHKW zu Zeiten mit hohem Eigenbedarf bevorzugen.
- **Notstrom:** Ein BHKW kann eine Notstromversorgung ganz oder teilweise ersetzen, wenn es inselbetriebsfähig ausgeführt ist.

| Datenpunkt                        | Typ | Beschreibung                               |
| --------------------------------- | --- | ------------------------------------------ |
| Freigabe BHKW                     | DO  | aus Pufferlogik                            |
| Betrieb, Störung                  | DI  | oder über Bus                              |
| Elektrische Leistung, Zählerstand | Bus | Stromzähler                                |
| Wärmemenge                        | Bus | [Wärmezähler](/wissen/waermemengenzaehler) |
| Rücklauftemperatur zum BHKW       | AI  | Grenze des Herstellers überwachen          |
| Pufferfühler oben, Mitte, unten   | AI  | Ladezustand                                |
| Betriebsstunden, Starts           | Bus | Wartungsintervall, Takten erkennen         |

## Brennstoffzelle

Eine Brennstoffzelle erzeugt Strom und Wärme ohne Verbrennung: Wasserstoff und Sauerstoff reagieren an einer Membran zu Wasser. Aus Erdgas macht ein **Reformer** zuerst Wasserstoff, dabei entsteht CO₂. Der elektrische Wirkungsgrad liegt je nach Typ bei etwa 35 bis 60 %, also höher als beim Motor. Sie ist leise und hat kaum bewegte Teile.

Für Wohnhäuser gibt es Kompaktgeräte mit PEM- oder Festoxid-Zellen (SOFC), meist kombiniert mit einem Gas-Brennwertgerät für die Spitze und einem Speicher. Für die GA verhalten sie sich wie ein kleines BHKW.

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 3.3.5
- VDI 2067: Wirtschaftlichkeit gebäudetechnischer Anlagen

<!-- EN -->

A combined heat and power (CHP) unit generates **electricity and heat at the same time**. A combustion engine drives a generator, and its waste heat heats the building. In Switzerland this is called **Wärme-Kraft-Kopplung (WKK)**, in Germany Kraft-Wärme-Kopplung (KWK).

The advantage: a large thermal power station turns only about 40 % of gas or oil into electricity; the rest is lost as waste heat, because heat consumers are rarely nearby. The CHP unit sits at the consumer and uses the waste heat.

## Components

- **Engine:** gas or diesel engine, running on natural gas, biogas, sewage gas, landfill gas or heating oil
- **Generator** for the electricity
- **Heat recovery** from engine cooling water, exhaust and lubricating oil, at different temperature levels
- **Buffer tank**, so the unit runs for long periods and starts rarely

## Key Figures

| Quantity              | Guide value                                                |
| --------------------- | ---------------------------------------------------------- |
| Electrical efficiency | about 30–35 % for small units, large gas engines over 40 % |
| Thermal efficiency    | about 50–55 %                                              |
| Overall efficiency    | 80–90 %, more with exhaust condensation                    |
| Heat-to-power ratio   | about 2 to 2.5                                             |
| Micro CHP             | up to about 15 kW electrical                               |
| Mini CHP              | about 15 to 50 kW electrical                               |

The boundaries between micro and mini are not drawn the same everywhere; the values here come from the Siemens document.

## Operating Modes

| Mode          | Leading variable                   | Surplus goes to                             |
| ------------- | ---------------------------------- | ------------------------------------------- |
| **Heat-led**  | Heat demand or buffer charge state | Electricity to the grid or self-consumption |
| **Power-led** | Electricity demand or price        | Heat into the buffer tank                   |

In buildings **heat-led** is the norm. The CHP covers the base load, a boiler the peak (bivalent). It is sized on the heat base load, not the heating load: a CHP unit only pays off with many operating hours per year. In summer the heat consumer is often missing; domestic hot water, process heat or an [absorption chiller](/wissen/absorptionskaelte) (trigeneration) help.

Small variable-speed CHP units with power electronics can modulate and also run monovalently.

## Hydraulics

- The CHP unit needs a **cool return**. If the return is too warm, it cannot get rid of the engine heat and shuts down. It is therefore usually connected to the **buffer tank**, whose bottom stays cool. See [Buffer Tank](/wissen/pufferspeicher).
- A hot return from poorly balanced heating circuits or diverting circuits is the most common reason for short run times.
- The CHP delivers its output into the tank, and the heating circuits draw from it. Generation and consumption are thus decoupled.

## For BA

- **Enable** according to the buffer charge state: on when the top of the buffer is cold, off when the bottom is warm. Several sensors in the tank make this clean.
- Respect **minimum run and minimum off times** and count starts. Every start wears the engine and increases emissions.
- **Priority over the boiler:** the peak boiler only comes in when the CHP alone is not enough.
- **Electricity:** with self-consumption an [energy management system](/wissen/ems-lastmanagement) can favour CHP operation at times of high own demand.
- **Emergency power:** a CHP unit can fully or partly replace an emergency power supply if it is designed for island operation.

| Data point                         | Type | Description                               |
| ---------------------------------- | ---- | ----------------------------------------- |
| CHP enable                         | DO   | from buffer logic                         |
| Running, fault                     | DI   | or via bus                                |
| Electrical power, meter reading    | Bus  | Electricity meter                         |
| Heat quantity                      | Bus  | [Heat meter](/wissen/waermemengenzaehler) |
| Return temperature to CHP          | AI   | Monitor the manufacturer's limit          |
| Buffer sensors top, middle, bottom | AI   | Charge state                              |
| Operating hours, starts            | Bus  | Service interval, detect short cycling    |

## Fuel Cell

A fuel cell produces electricity and heat without combustion: hydrogen and oxygen react at a membrane to form water. A **reformer** first makes hydrogen from natural gas, producing CO₂. Electrical efficiency is about 35 to 60 % depending on the type, i.e. higher than an engine. It is quiet and has hardly any moving parts.

For homes there are compact units with PEM or solid oxide cells (SOFC), usually combined with a gas condensing boiler for the peak and a storage tank. For BA they behave like a small CHP unit.

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 3.3.5
- VDI 2067: Economic efficiency of building installations
