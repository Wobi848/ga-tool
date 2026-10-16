---
title: Klimasysteme — Nur-Luft, Luft-Wasser, Kühldecke, Fan-Coil
title_en: Air-Conditioning Systems — All-Air, Air-Water, Chilled Ceiling, Fan Coil
slug: klimasysteme
category: klima
subcategory: systeme
tags:
  [
    klimaanlage,
    nur-luft,
    luft-wasser,
    einkanal,
    zweikanal,
    mehrzonen,
    vvs,
    kühldecke,
    fan-coil,
    gebläsekonvektor,
    induktion,
    quelllüftung,
    verdrängungslüftung,
    change-over,
    vierleiter,
    primärluft
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [rlt-anlage, vav-cav, taupunkt, raumautomation, waermerueckgewinnung, thermische-behaglichkeit]
norm: [SIA 382/1, EN 16798-3]
updated: 2026-10-16
lang: de
---

# Klimasysteme — Nur-Luft, Luft-Wasser, Kühldecke, Fan-Coil

Klimasysteme unterscheiden sich vor allem darin, **womit die Wärme und Kälte in den Raum kommt**: nur mit der Zuluft, oder mit Luft und Wasser gemeinsam. Das bestimmt Kanalgrössen, Komfort, Energiebedarf und was die Raumautomation regelt.

Wasser ist dabei der viel bessere Transporteur. Ein Liter Wasser speichert pro Kelvin rund 3500-mal so viel Wärme wie ein Liter Luft. Wer die ganze Kühllast mit Luft abführt, braucht grosse Kanäle und viel Ventilatorstrom.

## Übersicht

| System                    | Energie in den Raum über | Luft dient zu                     | Typisch für                            |
| ------------------------- | ------------------------ | --------------------------------- | -------------------------------------- |
| Einkanal, konstant (KVS)  | Zuluft                   | Lüften, Heizen, Kühlen            | Grossräume, Säle, gleichmässige Lasten |
| Einkanal mit Nachwärmern  | Zuluft, Nachbehandlung   | Lüften, Heizen, Kühlen            | wenige grosse Zonen                    |
| Variabler Volumenstrom    | Zuluft                   | Lüften, Kühlen                    | Büros mit wechselnder Sonnenlast       |
| Zweikanal                 | Warm- und Kaltluftkanal  | Lüften, Heizen, Kühlen            | nur noch Bestand                       |
| Kühldecke + Quelllüftung  | Wasser, Zuluft           | Lüften, Feuchte                   | Büros mit hohem Komfortanspruch        |
| Fan-Coil (mit Primärluft) | Wasser                   | Lüften (Primärluft), sonst Umluft | Hotelzimmer, Büros                     |
| Induktion                 | Wasser                   | Lüften, treibt Sekundärluft an    | heute selten, Bestand                  |

## Nur-Luft-Systeme

Heizen und Kühlen geschehen ausschliesslich über die Zuluft, die in der Zentrale aufbereitet wird.

**Einkanal ohne Zonen:** Die ganze Zuluft hat denselben Zustand. Unterschiedliche Lasten einzelner Räume lassen sich nur einmal bei der Inbetriebnahme über die Luftmengen ausgleichen. Geeignet für Grossräume oder Raumgruppen, deren Last gemeinsam schwankt.

**Einkanal mit Zonen-Nachbehandlung:** Jede Zone bekommt einen eigenen Nachwärmer, seltener auch Nachkühler oder Befeuchter. Sitzt er in der Zentrale, bleiben die Wasserleitungen im Technikraum, dafür müssen die Zonenkanäle gedämmt sein. Sitzt er nahe der Zone, müssen Wasserleitungen durchs Gebäude. Als Befeuchter kommt dort meist nur ein Dampfbefeuchter in Frage.

**Mehrzonen-Anlage:** Nach dem Ventilator teilt sich die Luft in einen Warm- und einen Kaltstrom, Zonenklappen mischen für jede Zone die passende Temperatur. Der Nachwärmer liegt oben, der Kühler unten, damit das Kondensat des Kühlers nicht auf den Nachwärmer tropft. Die Zulufttemperaturen der Zonen sollten weniger als etwa 5 K auseinanderliegen, sonst wird das Mischen teuer.

**Zweikanal-Anlage:** Ein Warm- und ein Kaltluftkanal laufen zu jedem Raum, eine Mischbox mischt nach Raumtemperatur. Früher liefen beide Kanäle mit festen Temperaturen, und es wurde gleichzeitig gekühlt und wieder erwärmt. Heute wird so nicht mehr gebaut. Im Bestand hilft die GA: Die Warmluft fährt nur so warm wie der höchste, die Kaltluft nur so kalt wie der tiefste Zuluftsollwert aller Räume.

**Variabler Volumenstrom (VVS):** Die Zulufttemperatur bleibt konstant, jeder Raum regelt seine Luftmenge. Weil die Sonne um das Gebäude wandert, haben nie alle Räume gleichzeitig Spitzenlast. Die Zentrale kann deshalb deutlich kleiner sein als die Summe der Räume. Geheizt wird meist separat, mit Heizkörpern oder Bodenheizung. Mehr dazu in [VAV vs. CAV](/wissen/vav-cav).

## Luftführung im Raum

| Prinzip                      | Luftaustauschwirkungsgrad | Wie                                                          |
| ---------------------------- | ------------------------- | ------------------------------------------------------------ |
| Verdrängung (Kolbenströmung) | 100 %                     | frische Luft schiebt die verbrauchte vor sich her            |
| Mischlüftung (Verdünnung)    | 50 %                      | Zuluft vermischt sich mit der ganzen Raumluft                |
| Kurzschluss                  | unter 50 %                | Zuluft strömt direkt zur Abluft, der Raum wird kaum erreicht |

Die meisten Büros haben Mischlüftung mit Deckendurchlässen. Die Quelllüftung kommt der Verdrängung nahe.

### Quelllüftung

Die Zuluft strömt mit kleiner Untertemperatur und sehr langsam in Bodennähe ein und bildet einen «Kaltluftsee». An Personen und Geräten steigt sie als warme Luft auf und wird an der Decke abgesaugt. Schadstoffe und Wärme gehen so direkt dort weg, wo sie entstehen. Mit wenig Luft erreicht man eine gute Luftqualität.

- Untertemperatur in Büros höchstens 1 bis 3 K, in Industriehallen bis etwa 8 K
- Zuluft in Büros nicht unter etwa 21 °C, sonst kalte Füsse
- Austrittsgeschwindigkeit rund 0.2 m/s, Nahzone vor dem Auslass freihalten
- **Nicht zum Heizen:** Warme Zuluft stiege sofort zur Decke. Es braucht Heizkörper oder Bodenheizung.
- Mit 1 bis 3 K Untertemperatur lässt sich wenig Kühllast abführen, darum fast immer mit Kühldecke kombiniert

## Luft-Wasser-Systeme

Die Luft bringt nur noch die nötige Aussenluft und regelt bei Bedarf die Feuchte. Heizen und Kühlen übernimmt Wasser in Geräten im Raum. Die Kanäle werden entsprechend kleiner.

### Kühldecke

Kaltwasser fliesst durch Deckenelemente. Eine geschlossene Kühldecke kühlt zu etwa 60 % durch Strahlung und zu 40 % durch Konvektion. Offene Konvektionselemente kühlen stärker, sind aber weniger zugfrei. Die Leistung hängt von der Bauart und der Temperaturdifferenz ab. Laut Siemens-Unterlagen erreichen Strahlungsdecken bis rund 125 W/m², Konvektionselemente bis rund 160 W/m².

Begrenzt wird die Leistung durch den **Taupunkt**: Die Vorlauftemperatur liegt meist bei 15 bis 16 °C, und keine Stelle der Decke oder der Leitungen darf unter den Taupunkt der Raumluft fallen. Dafür gibt es zwei Wege:

- **Taupunktwächter** am Vorlauf: sperrt das Kühlventil, sobald sich Feuchte bildet
- **Vorlauftemperatur nachführen:** Das Mischventil hebt den Vorlauf über den Taupunkt an, die Decke kühlt weiter, nur schwächer

Wo Fenster offen stehen, steigt die Feuchte und damit die Gefahr. Viele Gebäude mit Kühldecke haben deshalb Fensterkontakte, die das Kühlventil schliessen. Mehr in [Taupunkt](/wissen/taupunkt).

### Fan-Coil (Gebläsekonvektor)

Ein Ventilator saugt Raumluft an und bläst sie über ein Register mit Warm- oder Kaltwasser zurück, meist mit Umluftfilter und eingebauter Regelung. Fan-Coils reagieren schnell und eignen sich für Räume, die nur zeitweise genutzt werden. Typisches Beispiel ist das Hotelzimmer: Die Bodenheizung hält im Sparbetrieb etwa 15 °C, beim Einchecken bringt der Fan-Coil das Zimmer in wenigen Minuten auf Komfort.

Braucht der Raum dauernd Aussenluft, kommt sie als **Primärluft** über ein eigenes Kanalnetz, entweder in das Gerät oder über separate Auslässe. Die Primärluft wird mit fester Temperatur eingeblasen, meist etwa auf dem Heizsollwert des Raums. So stört sie die Raumregelung nicht.

### Induktion

Ein Induktionsgerät hat keinen Ventilator. Die Primärluft tritt mit hohem Druck aus Düsen aus und saugt dadurch Raumluft (Sekundärluft) durch das Register an, etwa im Verhältnis 1:2 bis 1:4. Die Kanäle führen nur die Aussenluft, also rund ein Viertel bis ein Fünftel der Luftmenge einer Nur-Luft-Anlage. Heute selten neu, im Bestand aber noch anzutreffen. Eine moderne Form ist der **Kühlbalken** (aktiver Chilled Beam) an der Decke.

### Zwei-, Drei- und Vierleiter

| System         | Leitungen                                                 | Heizen und Kühlen gleichzeitig?                                        |
| -------------- | --------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Zweileiter** | ein Vor- und Rücklauf, zentral umgeschaltet (Change-over) | nein, ganzes Netz heizt oder kühlt                                     |
| **Dreileiter** | getrennte Vorläufe, gemeinsamer Rücklauf                  | ja, aber Warm- und Kaltwasser mischen sich im Rücklauf: Energieverlust |
| **Vierleiter** | getrennte Kreise für Warm- und Kaltwasser                 | ja, ohne Mischverluste                                                 |

Beim Zweileiter macht die **Übergangszeit** Probleme: Die Südräume wollen kühlen, die Nordräume heizen. Die Raumregler müssen den Change-over kennen, sonst öffnen sie bei Kaltwasser das Ventil, weil der Raum zu kalt ist. Dafür gibt es einen Change-over-Fühler am Vorlauf oder ein Signal von der Zentrale. Dreileiter-Systeme werden heute kaum noch gebaut.

## Für die GA

| System    | Raumautomation regelt             | Wichtige Datenpunkte                                   |
| --------- | --------------------------------- | ------------------------------------------------------ |
| VVS       | Volumenstromregler je Raum        | Volumenstrom-Ist, Klappenstellung, Raumtemperatur, CO₂ |
| Kühldecke | Kühlventil, Vorlauf über Taupunkt | Taupunktwächter (DI), Fensterkontakt, Raumfeuchte      |
| Fan-Coil  | Ventile und Ventilatorstufen      | Change-over-Signal, Ventilatorstufe, Filtermeldung     |
| Zweikanal | Mischbox                          | höchster und tiefster Zuluftsollwert aller Räume       |

Bei allen wasserbasierten Systemen gilt: Heizen und Kühlen im selben Raum dürfen nie gleichzeitig laufen. Die Raumregler brauchen dafür eine **Totzone** zwischen Heiz- und Kühlsollwert, siehe [Raumautomation](/wissen/raumautomation).

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 6.6
- SIA 382/1: Lüftungs- und Klimaanlagen — Allgemeine Grundlagen und Anforderungen

<!-- EN -->

Air-conditioning systems differ above all in **how heating and cooling get into the room**: with the supply air only, or with air and water together. That determines duct sizes, comfort, energy use and what room automation controls.

Water is the far better carrier. Per kelvin, a litre of water stores about 3500 times as much heat as a litre of air. Removing the whole cooling load with air needs large ducts and a lot of fan power.

## Overview

| System                         | Energy into the room via | Air is used for                               | Typical for                       |
| ------------------------------ | ------------------------ | --------------------------------------------- | --------------------------------- |
| Single duct, constant (CAV)    | Supply air               | Ventilation, heating, cooling                 | Large rooms, halls, uniform loads |
| Single duct with reheaters     | Supply air, reheat       | Ventilation, heating, cooling                 | Few large zones                   |
| Variable air volume            | Supply air               | Ventilation, cooling                          | Offices with changing solar load  |
| Dual duct                      | Warm and cold air duct   | Ventilation, heating, cooling                 | Existing buildings only           |
| Chilled ceiling + displacement | Water, supply air        | Ventilation, humidity                         | Offices with high comfort demands |
| Fan coil (with primary air)    | Water                    | Ventilation (primary air), else recirculation | Hotel rooms, offices              |
| Induction                      | Water                    | Ventilation, drives secondary air             | Rare today, existing buildings    |

## All-Air Systems

Heating and cooling happen only via the supply air, conditioned centrally.

**Single duct without zones:** all supply air has the same condition. Different loads in individual rooms can only be balanced once at commissioning via the airflows. Suitable for large rooms or room groups whose load varies together.

**Single duct with zone reheat:** each zone gets its own reheater, less often a recooler or humidifier. If it sits in the plant room, the water pipes stay there, but the zone ducts must be insulated. If it sits near the zone, water pipes must run through the building. As humidifier, usually only a steam humidifier is possible there.

**Multizone unit:** after the fan the air splits into a warm and a cold stream; zone dampers mix the right temperature for each zone. The reheater sits on top, the cooler below, so the cooler's condensate does not drip onto the reheater. The zones' supply temperatures should differ by less than about 5 K, otherwise mixing becomes expensive.

**Dual duct system:** a warm and a cold air duct run to every room, a mixing box mixes according to room temperature. In the past both ducts ran at fixed temperatures, and the air was cooled and reheated at the same time. Such systems are no longer built. In existing buildings BA helps: the warm air runs only as warm as the highest, the cold air only as cold as the lowest supply setpoint of all rooms.

**Variable air volume (VAV):** the supply temperature stays constant and each room controls its airflow. Because the sun moves around the building, never all rooms have peak load at once. The central unit can therefore be considerably smaller than the sum of the rooms. Heating is usually separate, with radiators or underfloor heating. More in [VAV vs. CAV](/wissen/vav-cav).

## Air Distribution in the Room

| Principle                  | Air change efficiency | How                                                                |
| -------------------------- | --------------------- | ------------------------------------------------------------------ |
| Displacement (piston flow) | 100 %                 | fresh air pushes the used air ahead of it                          |
| Mixing (dilution)          | 50 %                  | supply air mixes with all the room air                             |
| Short circuit              | below 50 %            | supply air flows straight to the extract, barely reaching the room |

Most offices have mixing ventilation with ceiling diffusers. Displacement ventilation comes close to piston flow.

### Displacement Ventilation

The supply air flows in near the floor, slightly below room temperature and very slowly, forming a "cold air lake". At people and equipment it rises as warm air and is extracted at the ceiling. Pollutants and heat are thus removed right where they arise. Good air quality is reached with little air.

- Undertemperature in offices at most 1 to 3 K, in industrial halls up to about 8 K
- Supply air in offices not below about 21 °C, otherwise cold feet
- Outlet velocity about 0.2 m/s; keep the near zone in front of the outlet clear
- **Not for heating:** warm supply air would rise straight to the ceiling. Radiators or underfloor heating are needed.
- With 1 to 3 K undertemperature little cooling load can be removed, so it is almost always combined with a chilled ceiling

## Air-Water Systems

The air only brings the required outdoor air and controls humidity where needed. Heating and cooling are done by water in units in the room. The ducts become correspondingly smaller.

### Chilled Ceiling

Chilled water flows through ceiling panels. A closed chilled ceiling cools about 60 % by radiation and 40 % by convection. Open convective elements cool more strongly but are less draught-free. Output depends on design and temperature difference. According to Siemens documentation, radiant ceilings reach up to about 125 W/m², convective elements up to about 160 W/m².

Output is limited by the **dew point**: the supply temperature is usually 15 to 16 °C, and no part of the ceiling or pipes may fall below the dew point of the room air. There are two ways to ensure this:

- **Dew point monitor** on the supply: closes the cooling valve as soon as moisture forms
- **Track the supply temperature:** the mixing valve raises the supply above the dew point, the ceiling keeps cooling, only less

Where windows are open, humidity and thus the risk rise. Many buildings with chilled ceilings therefore have window contacts that close the cooling valve. More in [Dew Point](/wissen/taupunkt).

### Fan Coil

A fan draws in room air and blows it back over a coil with hot or chilled water, usually with a recirculation filter and built-in controls. Fan coils react quickly and suit rooms used only part of the time. A typical example is the hotel room: underfloor heating keeps about 15 °C in economy mode, and at check-in the fan coil brings the room to comfort within a few minutes.

If the room needs outdoor air continuously, it comes as **primary air** via a separate duct network, either into the unit or through separate outlets. Primary air is supplied at a fixed temperature, usually about the room's heating setpoint, so it does not disturb room control.

### Induction

An induction unit has no fan. Primary air leaves nozzles at high pressure and thereby draws room air (secondary air) through the coil, roughly in a ratio of 1:2 to 1:4. The ducts carry only the outdoor air, about a quarter to a fifth of the airflow of an all-air system. Rarely installed new today, but still found in existing buildings. A modern form is the **active chilled beam** on the ceiling.

### Two-, Three- and Four-Pipe

| System         | Pipes                                                 | Heating and cooling at the same time?                         |
| -------------- | ----------------------------------------------------- | ------------------------------------------------------------- |
| **Two-pipe**   | one flow and return, switched centrally (change-over) | no, the whole network heats or cools                          |
| **Three-pipe** | separate flows, common return                         | yes, but hot and chilled water mix in the return: energy loss |
| **Four-pipe**  | separate circuits for hot and chilled water           | yes, without mixing losses                                    |

With two-pipe systems the **shoulder season** causes trouble: south rooms want cooling, north rooms heating. The room controllers must know the change-over state, otherwise they open the valve on chilled water because the room is too cold. A change-over sensor on the supply or a signal from the plant provides this. Three-pipe systems are hardly built any more.

## For BA

| System          | Room automation controls              | Key data points                                        |
| --------------- | ------------------------------------- | ------------------------------------------------------ |
| VAV             | Airflow controller per room           | Actual airflow, damper position, room temperature, CO₂ |
| Chilled ceiling | Cooling valve, supply above dew point | Dew point monitor (DI), window contact, room humidity  |
| Fan coil        | Valves and fan stages                 | Change-over signal, fan stage, filter alarm            |
| Dual duct       | Mixing box                            | Highest and lowest supply setpoint of all rooms        |

For all water-based systems: heating and cooling in the same room must never run at the same time. Room controllers need a **dead band** between the heating and cooling setpoints, see [Room Automation](/wissen/raumautomation).

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 6.6
- SIA 382/1: Ventilation and air-conditioning systems — General principles and requirements
