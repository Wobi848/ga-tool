---
title: Komfortlüftung — kontrollierte Wohnungslüftung
title_en: Residential Ventilation — Mechanical Ventilation with Heat Recovery for Homes
slug: komfortlueftung
category: lueftung
subcategory: wohnen
tags:
  [
    komfortlüftung,
    wohnungslüftung,
    kwl,
    minergie,
    wärmerückgewinnung,
    feuchterückgewinnung,
    enthalpietauscher,
    abluftanlage,
    einzelraumgerät,
    erdregister,
    filter,
    radon,
    schimmel
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [waermerueckgewinnung, luftfeuchtigkeit, raumluftqualitaet, rlt-anlage, ec-motoren, vdi6022]
norm: [SIA 382/5, SIA 180]
updated: 2026-10-17
lang: de
---

# Komfortlüftung — kontrollierte Wohnungslüftung

Neue Gebäude sind so dicht und gut gedämmt, dass die **Lüftungsverluste** heute oft so gross sind wie die Verluste durch Wände und Fenster. Wer nur über die Fenster lüftet, lüftet entweder zu wenig, mit Feuchte, Schimmel und schlechter Luft als Folge, oder zu viel, und die Energieeinsparung der Hülle ist dahin. Eine **Komfortlüftung** tauscht die Luft kontrolliert aus und gewinnt dabei die Wärme der Abluft zurück. In der Schweiz verlangt Minergie einen kontrollierten Luftaustausch, die Anforderungen an Wohnungslüftungen stehen in **SIA 382/5**.

## Was sie bringt

- gleichmässig gute Luft, auch nachts und bei Abwesenheit
- Feuchte wird abgeführt, Schimmel an kalten Ecken bleibt aus
- Radon, Gerüche und Ausdünstungen aus Baustoffen und Möbeln werden verdünnt
- gefilterte Aussenluft: weniger Pollen und Staub, angenehm für Allergiker
- Fenster können zu bleiben: weniger Strassenlärm, mehr Sicherheit
- mit Wärmerückgewinnung deutlich weniger Heizwärmebedarf

## Bauarten

| Bauart              | Wie                                                                                 | Hinweis                                                                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Einzelraumgerät** | Gerät in der Aussenwand oder Brüstung, oft paarweise im Wechselbetrieb mit Speicher | einfach nachzurüsten, aber Geräusch im Raum, kleine Ventilatoren mit mässigem Wirkungsgrad                                                 |
| **Wohnungsgerät**   | ein Gerät pro Wohnung mit Kanälen                                                   | Standard im Neubau, Gerät ausserhalb der Wohnräume platzierbar                                                                             |
| **Zentralgerät**    | ein Gerät für das ganze Mehrfamilienhaus                                            | effiziente grosse Ventilatoren, Filterwechsel durch den Betreiber, aber Kanäle durch alle Geschosse und oft Volumenstromregler pro Wohnung |
| **Abluftanlage**    | nur Abluftventilator, Aussenluft strömt über Aussenluftdurchlässe nach              | günstig, ohne WRG; die Wärme kann eine Abluft-Wärmepumpe fürs Warmwasser nutzen                                                            |

**Luftführung:** Frische Luft kommt in die Wohn- und Schlafzimmer, abgesaugt wird in Bad, WC und Küche. Dazwischen strömt die Luft über Türspalten oder Überströmelemente durch die Wohnung. Die Dunstabzugshaube in der Küche läuft meist getrennt im Umluftbetrieb, damit kein Fett in die Kanäle gelangt.

## Wärme- und Feuchterückgewinnung

Ohne WRG lassen sich die Anforderungen an den Heizwärmebedarf kaum erreichen. Üblich sind Gegenstrom-Plattentauscher oder Rotoren, siehe [Wärmerückgewinnung](/wissen/waermerueckgewinnung).

Im Winter bringt die Lüftung trockene Aussenluft in die Wohnung. Bei starker Lüftung sinkt die relative Feuchte in kalten Wochen auf 25 % und darunter. Gegenmittel:

- **Luftmenge nicht zu hoch** einstellen, der Bedarf richtet sich nach den Personen, nicht nach der maximalen Stufe
- **Feuchterückgewinnung** mit einem Enthalpie-Plattentauscher (Membran) oder einem Sorptionsrotor
- bedarfsgeregelte Lüftung nach CO₂ oder Feuchte

Mehr in [Luftfeuchtigkeit](/wissen/luftfeuchtigkeit).

## Frostschutz und Vorwärmung

Bei Frost kann das Kondensat im Tauscher gefrieren. Übliche Lösungen:

- elektrisches **Vorheizregister** vor dem Tauscher
- **Erdregister:** Die Aussenluft strömt durch Rohre im Erdreich und wird im Winter vorgewärmt, im Sommer leicht gekühlt. Hygienisch heikel bei Luftrohren, wegen Kondensat. Häufiger ist heute ein **Sole-Erdwärmetauscher**: Ein Glykolkreis im Boden versorgt ein Register vor dem Gerät.
- bei Enthalpietauschern friert weniger, weil weniger Kondensat anfällt

## Betrieb und Wartung

- **Filter** sind das Wichtigste. Aussenluftfilter mindestens ePM10, besser ePM1, Abluftfilter schützt den Tauscher. Wechsel je nach Lage etwa ein- bis zweimal jährlich. Bei Wohnungsgeräten wird das in der Praxis oft vergessen, Zentralgeräte wartet der Betreiber.
- **EC-Ventilatoren** sind Standard, ihr Stromverbrauch ist klein, siehe [EC-Motoren](/wissen/ec-motoren).
- **Stufen:** meist drei oder vier, dazu Abwesenheit und Intensivlüftung, z.B. beim Kochen oder Duschen.
- **Sommer-Bypass:** Ist es nachts draussen kühler als drinnen, wird die WRG umgangen und die Wohnung gekühlt.
- **Kanäle** dicht und reinigbar, Schalldämpfer gegen Telefonie-Effekt zwischen Räumen.

## Für die GA

In Einfamilienhäusern läuft das Gerät meist mit eigener Steuerung. In Mehrfamilienhäusern und Überbauungen bindet die GA es über Modbus, BACnet oder KNX ein:

| Datenpunkt                            | Typ | Beschreibung                         |
| ------------------------------------- | --- | ------------------------------------ |
| Stufe / Volumenstrom                  | AO  | Sollwert oder Stufe                  |
| Betriebsart                           | MV  | Normal, Abwesend, Intensiv, Aus      |
| Filtermeldung                         | DI  | Wechsel fällig, nach Zeit oder Druck |
| Aussen-, Zu-, Ab-, Fortlufttemperatur | AI  | Wirkungsgrad der WRG, Frostschutz    |
| Bypassklappe                          | DI  | Sommerbetrieb                        |
| Störung                               | DI  | Ventilator, Frost, Vorheizregister   |
| CO₂ oder Feuchte Abluft               | AI  | für bedarfsgeregelte Lüftung         |

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2026, Kap. 6.6
- SIA 382/5: Mechanische Lüftung in Wohngebäuden

<!-- EN -->

New buildings are so airtight and well insulated that **ventilation losses** are today often as large as the losses through walls and windows. Anyone who only ventilates through windows either ventilates too little, with moisture, mould and poor air as a result, or too much, and the energy savings of the envelope are lost. **Residential mechanical ventilation** exchanges the air in a controlled way and recovers the heat from the extract air. In Switzerland Minergie requires controlled air renewal; the requirements for residential ventilation are in **SIA 382/5**.

## What It Brings

- consistently good air, also at night and when nobody is home
- moisture is removed, no mould in cold corners
- radon, odours and emissions from building materials and furniture are diluted
- filtered outdoor air: less pollen and dust, pleasant for allergy sufferers
- windows can stay closed: less street noise, more security
- with heat recovery a much lower heating demand

## Types

| Type                    | How                                                                                    | Note                                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Single-room unit**    | unit in the external wall or parapet, often in pairs with alternating flow and storage | easy to retrofit, but noise in the room, small fans with modest efficiency                                                     |
| **Apartment unit**      | one unit per apartment with ducts                                                      | standard in new builds, unit can be placed outside living rooms                                                                |
| **Central unit**        | one unit for the whole apartment building                                              | efficient large fans, filter changes by the operator, but ducts through all floors and often airflow controllers per apartment |
| **Extract-only system** | extract fan only; outdoor air flows in via air inlets                                  | cheap, without heat recovery; an exhaust air heat pump can use the heat for hot water                                          |

**Air distribution:** fresh air goes into living rooms and bedrooms, air is extracted in bathroom, WC and kitchen. In between, air flows through the apartment via door gaps or transfer elements. The kitchen hood usually runs separately in recirculation mode so that no grease enters the ducts.

## Heat and Moisture Recovery

Without heat recovery the heating demand requirements can hardly be met. Counterflow plate exchangers or rotary wheels are common, see [Heat Recovery](/wissen/waermerueckgewinnung).

In winter ventilation brings dry outdoor air into the apartment. With heavy ventilation relative humidity drops to 25 % and below in cold weeks. Remedies:

- **don't set the airflow too high**; the demand depends on the occupants, not the maximum stage
- **moisture recovery** with an enthalpy plate exchanger (membrane) or a sorption wheel
- demand-controlled ventilation by CO₂ or humidity

More in [Humidity](/wissen/luftfeuchtigkeit).

## Frost Protection and Preheating

In frost, condensate in the exchanger can freeze. Common solutions:

- electric **preheater** before the exchanger
- **Earth tube:** the outdoor air flows through pipes in the ground and is preheated in winter, slightly cooled in summer. Hygienically delicate with air pipes because of condensate. More common today is a **brine ground heat exchanger**: a glycol loop in the ground supplies a coil before the unit.
- enthalpy exchangers freeze less, because less condensate forms

## Operation and Maintenance

- **Filters** are the most important point. Outdoor air filter at least ePM10, better ePM1; the extract filter protects the exchanger. Change about once or twice a year depending on location. With apartment units this is often forgotten in practice; central units are maintained by the operator.
- **EC fans** are standard; their power consumption is low, see [EC Motors](/wissen/ec-motoren).
- **Stages:** usually three or four, plus away mode and boost, e.g. for cooking or showering.
- **Summer bypass:** if it is cooler outside than inside at night, heat recovery is bypassed and the apartment is cooled.
- **Ducts** airtight and cleanable, with silencers against cross-talk between rooms.

## For BA

In single-family houses the unit usually runs on its own controller. In apartment buildings and estates, BA integrates it via Modbus, BACnet or KNX:

| Data point                                    | Type | Description                                |
| --------------------------------------------- | ---- | ------------------------------------------ |
| Stage / airflow                               | AO   | Setpoint or stage                          |
| Operating mode                                | MV   | Normal, away, boost, off                   |
| Filter alarm                                  | DI   | Change due, by time or pressure            |
| Outdoor, supply, extract, exhaust temperature | AI   | Heat recovery efficiency, frost protection |
| Bypass damper                                 | DI   | Summer mode                                |
| Fault                                         | DI   | Fan, frost, preheater                      |
| Extract CO₂ or humidity                       | AI   | for demand-controlled ventilation          |

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2026, ch. 6.6
- SIA 382/5: Mechanical ventilation in residential buildings
