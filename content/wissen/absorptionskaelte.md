---
title: Absorptions- und Adsorptionskälte — Kühlen mit Wärme
title_en: Absorption and Adsorption Chillers — Cooling with Heat
slug: absorptionskaelte
category: kaelte
subcategory: erzeuger
tags:
  [
    absorption,
    adsorption,
    absorptionskältemaschine,
    lithiumbromid,
    ammoniak,
    silikagel,
    zeolith,
    abwärme,
    trigeneration,
    rückkühlung,
    wärmeverhältnis,
    thermischer verdichter
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, bhkw, fernwaerme, cop-eer, free-cooling, solarthermie]
norm: [EN 12309, SIA 382/1]
updated: 2026-10-16
lang: de
---

# Absorptions- und Adsorptionskälte — Kühlen mit Wärme

Eine Kompressions-Kältemaschine treibt ihren Verdichter mit Strom an. Absorptions- und Adsorptionsmaschinen ersetzen den Verdichter durch einen **thermischen Verdichter** und brauchen als Antrieb **Wärme**: Heisswasser, Dampf, Abwärme oder Fernwärme. Strom brauchen sie nur noch für Pumpen.

Lohnend sind sie dort, wo Wärme im Sommer übrig ist oder billig anfällt:

- Abwärme aus Produktion oder Rechenzentrum
- Blockheizkraftwerk, dessen Wärme im Sommer sonst niemand braucht (Trigeneration, siehe [BHKW](/wissen/bhkw))
- Fernwärme mit Sommerüberschuss, siehe [Fernwärme](/wissen/fernwaerme)
- grosse Solarthermie-Anlagen

## Prinzip

Der Kältemittelkreis ist derselbe wie bei jeder Kältemaschine: Das Kältemittel verdampft bei tiefem Druck im **Verdampfer** und nimmt dabei Wärme aus dem Kaltwasser auf. Im **Kondensator** gibt es die Wärme an den Rückkühlkreis ab, und ein **Expansionsventil** entspannt es wieder. Nur das Verdichten geschieht anders.

| Bauteil          | Kompressionsmaschine | Absorptionsmaschine                                                 |
| ---------------- | -------------------- | ------------------------------------------------------------------- |
| Dampf ansaugen   | Verdichter           | **Absorber:** Lösungsmittel nimmt den Kältemitteldampf auf          |
| Druck erhöhen    | Verdichter           | **Lösungsmittelpumpe** fördert die Flüssigkeit auf hohen Druck      |
| Dampf ausstossen | Verdichter           | **Austreiber (Generator):** Wärme treibt das Kältemittel wieder aus |

Eine Flüssigkeit auf hohen Druck zu pumpen braucht nur einen Bruchteil der Energie, die ein Gasverdichter braucht. Die eigentliche Arbeit leistet die Wärme im Austreiber. Ein **Temperaturwechsler** zwischen Absorber und Austreiber wärmt die kalte Lösung mit der heissen vor und spart so Antriebswärme.

### Arbeitsstoffpaare

| Paar                     | Kältemittel | Einsatz                                                            |
| ------------------------ | ----------- | ------------------------------------------------------------------ |
| **Wasser-Lithiumbromid** | Wasser      | Klimakälte, Kaltwasser ab etwa 5 °C, häufigste Bauart              |
| **Ammoniak-Wasser**      | Ammoniak    | tiefere Temperaturen, auch unter 0 °C, Gewerbe- und Industriekälte |

Mit Wasser als Kältemittel arbeitet die Maschine im Vakuum, darum ist sie schwer und massiv gebaut. Unter etwa 5 °C geht es nicht, sonst gefriert das Wasser.

## Adsorptionsmaschine

Statt einer Flüssigkeit nimmt ein poröser Feststoff den Kältemitteldampf an seiner Oberfläche auf, meist **Silikagel** oder **Zeolith** mit Wasser als Kältemittel. Weil der Feststoff nicht umgepumpt werden kann, arbeiten zwei Kammern im Wechsel: Die eine adsorbiert, die andere wird mit Antriebswärme ausgetrieben, dann wird umgeschaltet.

Adsorptionsmaschinen kommen mit tieferen Antriebstemperaturen aus als Absorptionsmaschinen, schon ab etwa 55 bis 60 °C. Das passt zu Solarwärme und Abwärme auf niedrigem Niveau. Sie sind aber grösser und teurer pro Kilowatt.

## Kennzahlen

Die Effizienz heisst hier **Wärmeverhältnis**: Kälteleistung geteilt durch Antriebswärme.

| Bauart                        | Wärmeverhältnis | Antriebstemperatur     |
| ----------------------------- | --------------- | ---------------------- |
| Adsorption                    | etwa 0.5–0.6    | ab etwa 55 °C          |
| Absorption, einstufig (LiBr)  | etwa 0.7        | etwa 80–120 °C         |
| Absorption, zweistufig (LiBr) | etwa 1.2–1.4    | Dampf oder etwa 150 °C |

Das sieht schlecht aus neben einem EER von 3 bis 6 einer Kompressionsmaschine. Der Vergleich hinkt aber: Die Absorptionsmaschine braucht Wärme, die sonst ungenutzt bliebe, und kaum Strom.

**Wichtig für die Planung ist die Rückkühlung.** Der Rückkühler muss die Kälte **und** die Antriebswärme abführen. Bei einem Wärmeverhältnis von 0.7 ist das etwa 1 + 1/0.7 ≈ 2.4-mal die Kälteleistung, bei einer Kompressionsmaschine mit EER 4 nur etwa 1.25-mal. Rückkühler, Pumpen und Wasserverbrauch werden entsprechend grösser.

## Betrieb und Regelung

- **Träge:** Bis die Maschine stabil läuft, vergehen viele Minuten. Sie eignet sich für die **Grundlast**, Spitzen deckt besser eine Kompressionsmaschine.
- **Kühlwassertemperatur einhalten:** Der Hersteller gibt ein Fenster für das Rückkühlwasser vor. Bei Lithiumbromid kann zu kaltes Kühlwasser zusammen mit heissem Antrieb die Lösung **auskristallisieren** lassen, die Maschine verstopft. Moderne Maschinen haben dagegen Schutzfunktionen, die GA darf die Rückkühlung aber nicht einfach maximal kalt fahren.
- **Leistung regeln** über die Temperatur der Antriebswärme oder die Lösungsmenge, je nach Hersteller.
- **Vakuum** prüfen: Lithiumbromid-Maschinen werden regelmässig entlüftet, eindringende Luft senkt die Leistung.

## GA-Datenpunkte

| Datenpunkt                    | Typ | Beschreibung                          |
| ----------------------------- | --- | ------------------------------------- |
| Freigabe Kältemaschine        | DO  | Ein/Aus                               |
| Betrieb, Sammelstörung        | DI  | Rückmeldungen der Maschinensteuerung  |
| Kaltwasser Vor-/Rücklauf      | AI  | Kälteleistung                         |
| Antriebswärme Vor-/Rücklauf   | AI  | Antriebstemperatur und Wärmeverbrauch |
| Rückkühlwasser Vor-/Rücklauf  | AI  | Fenster des Herstellers überwachen    |
| Wärmezähler Antrieb und Kälte | Bus | Wärmeverhältnis im Betrieb ausrechnen |
| Sollwert Kaltwasser           | AO  | oder über Bus                         |

Meist hat die Maschine eine eigene Steuerung, die GA gibt frei und setzt Sollwerte über BACnet oder Modbus.

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 4.6
- EN 12309: Gasbefeuerte Sorptions-Geräte für Heizung und Kühlung

<!-- EN -->

A compression chiller drives its compressor with electricity. Absorption and adsorption chillers replace the compressor with a **thermal compressor** and are driven by **heat**: hot water, steam, waste heat or district heating. Electricity is only needed for pumps.

They pay off where heat is left over or cheap in summer:

- Waste heat from production or a data centre
- A combined heat and power plant whose heat nobody needs in summer (trigeneration, see [CHP](/wissen/bhkw))
- District heating with a summer surplus, see [District Heating](/wissen/fernwaerme)
- Large solar thermal systems

## Principle

The refrigerant circuit is the same as in any chiller: the refrigerant evaporates at low pressure in the **evaporator**, taking heat from the chilled water. In the **condenser** it releases the heat to the heat rejection circuit, and an **expansion valve** lowers its pressure again. Only the compression works differently.

| Function         | Compression chiller | Absorption chiller                                              |
| ---------------- | ------------------- | --------------------------------------------------------------- |
| Draw in vapour   | Compressor          | **Absorber:** a solution takes up the refrigerant vapour        |
| Raise pressure   | Compressor          | **Solution pump** pumps the liquid to high pressure             |
| Discharge vapour | Compressor          | **Generator (desorber):** heat drives the refrigerant out again |

Pumping a liquid to high pressure takes only a fraction of the energy a gas compressor needs. The real work is done by the heat in the generator. A **solution heat exchanger** between absorber and generator preheats the cold solution with the hot one and so saves driving heat.

### Working Pairs

| Pair                      | Refrigerant | Use                                                                          |
| ------------------------- | ----------- | ---------------------------------------------------------------------------- |
| **Water-lithium bromide** | Water       | Comfort cooling, chilled water from about 5 °C, most common type             |
| **Ammonia-water**         | Ammonia     | lower temperatures, also below 0 °C, commercial and industrial refrigeration |

With water as refrigerant the machine works in a vacuum, so it is heavy and solidly built. Below about 5 °C it does not work, otherwise the water freezes.

## Adsorption Chiller

Instead of a liquid, a porous solid takes up the refrigerant vapour on its surface, usually **silica gel** or **zeolite** with water as refrigerant. Because the solid cannot be pumped around, two chambers work alternately: one adsorbs while the other is regenerated with driving heat, then they switch.

Adsorption chillers manage with lower driving temperatures than absorption chillers, from about 55 to 60 °C. That suits solar heat and low-grade waste heat. They are, however, larger and more expensive per kilowatt.

## Key Figures

Efficiency here is the **heat ratio** (thermal COP): cooling capacity divided by driving heat.

| Type                             | Heat ratio    | Driving temperature   |
| -------------------------------- | ------------- | --------------------- |
| Adsorption                       | about 0.5–0.6 | from about 55 °C      |
| Absorption, single-effect (LiBr) | about 0.7     | about 80–120 °C       |
| Absorption, double-effect (LiBr) | about 1.2–1.4 | steam or about 150 °C |

That looks poor next to an EER of 3 to 6 for a compression chiller. The comparison is misleading, though: the absorption chiller uses heat that would otherwise go to waste, and hardly any electricity.

**Heat rejection matters for design.** The cooling tower must remove the cooling **and** the driving heat. At a heat ratio of 0.7 that is about 1 + 1/0.7 ≈ 2.4 times the cooling capacity, compared with only about 1.25 times for a compression chiller with EER 4. Cooling tower, pumps and water consumption grow accordingly.

## Operation and Control

- **Slow:** it takes many minutes until the machine runs stably. It suits **base load**; peaks are better covered by a compression chiller.
- **Keep the cooling water temperature:** the manufacturer specifies a window for the cooling water. With lithium bromide, too cold cooling water combined with a hot drive can make the solution **crystallise**, and the machine clogs. Modern machines have protective functions, but BA must not simply run the heat rejection as cold as possible.
- **Capacity control** via the driving heat temperature or the solution flow, depending on the manufacturer.
- **Check the vacuum:** lithium bromide machines are purged regularly; air leaking in reduces capacity.

## BA Data Points

| Data point                    | Type | Description                              |
| ----------------------------- | ---- | ---------------------------------------- |
| Chiller enable                | DO   | On/off                                   |
| Running, common fault         | DI   | Feedback from the machine controller     |
| Chilled water flow/return     | AI   | Cooling capacity                         |
| Driving heat flow/return      | AI   | Driving temperature and heat consumption |
| Cooling water flow/return     | AI   | Monitor the manufacturer's window        |
| Heat meters drive and cooling | Bus  | Calculate the heat ratio in operation    |
| Chilled water setpoint        | AO   | or via bus                               |

The machine usually has its own controller; BA enables it and sets setpoints via BACnet or Modbus.

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 4.6
- EN 12309: Gas-fired sorption appliances for heating and cooling
