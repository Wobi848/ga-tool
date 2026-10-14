---
title: Energieausweis und Gebäudekennzahlen — GEAK, Minergie, kWh/m²
title_en: Energy Performance Certificates and Building Metrics — GEAK, Minergie, kWh/m²
slug: energieausweis-kennzahlen
category: energie
subcategory: kennzahlen
tags:
  [
    energieausweis,
    geak,
    minergie,
    kwh-m2,
    energiebezugsfläche,
    heizenergiebedarf,
    gesamtenergiebedarf,
    primärenergie,
    co2-emissionen,
    gebäudeenergieeffizienz,
    iso50001,
    energiekennzahl,
    eki,
    sia-380-1
  ]
difficulty: grundlagen
area: [hlk, ga, normen]
related: [ems-lastmanagement, energiemessung, en15232, en12831, waermepumpe, gradtage]
norm: [SIA 380/1, SIA 416/1, MuKEn, GEAK, Minergie, GEG (DE), EPBD (EU)]
updated: 2026-10-14
lang: de
---

# Energieausweis und Gebäudekennzahlen — GEAK, Minergie, kWh/m²

Energiekennzahlen beschreiben, wie viel Energie ein Gebäude braucht oder verbraucht, bezogen auf seine Fläche. Sie sind Grundlage für Optimierungen, Förderbeiträge und gesetzliche Anforderungen.

## Bedarf und Verbrauch

| Begriff       | Woher                                      | Wofür                                     |
| ------------- | ------------------------------------------ | ----------------------------------------- |
| **Bedarf**    | berechnet, mit Normnutzung und Normklima   | Planung, Nachweis, Vergleich von Gebäuden |
| **Verbrauch** | gemessen, mit echter Nutzung und Witterung | Betrieb, Controlling, Fehlersuche         |

Beide weichen oft deutlich voneinander ab. Der Verbrauch hängt stark von Nutzung, Raumtemperatur und Betrieb ab. Genau dort setzt die GA an.

## Energiebezugsfläche

Bezugsgrösse in der Schweiz ist die **Energiebezugsfläche** EBF nach SIA 416/1: die Summe aller Geschossflächen, die beheizt oder klimatisiert werden, gemessen mit den Aussenwänden. Sie ist grösser als die Wohn- oder Nutzfläche.

<p class="formel">Energiekennzahl = Energie pro Jahr / EBF &nbsp; [kWh/(m²·a)]</p>

## Gewichtung der Energieträger

Eine kWh Strom ist nicht gleich viel wert wie eine kWh Holz. Für Nachweise werden die Energieträger gewichtet. In der Schweiz verwenden die kantonalen Vorschriften nach **MuKEn** nationale Gewichtungsfaktoren, zum Beispiel **2.0 für Strom** und **1.0 für fossile Brennstoffe**. Erneuerbare Brennstoffe und Fernwärme haben tiefere Faktoren. Die genauen Werte stehen in den kantonalen Energievorschriften.

In Deutschland rechnet das GEG mit **Primärenergiefaktoren** nach DIN V 18599.

## GEAK — Gebäudeenergieausweis der Kantone

Der GEAK bewertet ein bestehendes Gebäude mit Klassen von **A** (sehr effizient) bis **G** (wenig effizient), und zwar getrennt für:

- **Effizienz der Gebäudehülle**
- **Gesamtenergieeffizienz**, mit Haustechnik und gewichteten Energieträgern
- **direkte CO₂-Emissionen**

Die Klassengrenzen sind auf die Anforderungen für Neubauten nach SIA 380/1 bezogen, nicht feste kWh-Werte. Der **GEAK Plus** enthält zusätzlich einen Beratungsbericht mit Sanierungsvarianten.

In einigen Kantonen ist ein GEAK bei Handänderung, bei Förderbeiträgen oder beim Heizungsersatz vorgeschrieben. Die Regeln unterscheiden sich von Kanton zu Kanton.

## Minergie

Minergie ist ein freiwilliges Label für Komfort und tiefen Energiebedarf:

| Label          | Schwerpunkt                                                           |
| -------------- | --------------------------------------------------------------------- |
| **Minergie**   | gute Hülle, erneuerbare Wärme, kontrollierter Luftwechsel, Eigenstrom |
| **Minergie-P** | strengere Anforderungen an die Hülle, sehr tiefer Heizwärmebedarf     |
| **Minergie-A** | in der Jahresbilanz deckt die Eigenproduktion den Bedarf weitgehend   |
| **Zusatz ECO** | zusätzlich Gesundheit und Bauökologie                                 |

Die Grenzwerte werden als **Minergie-Kennzahl** mit gewichteter Endenergie angegeben und regelmässig angepasst. Aktuell gültige Werte stehen im Reglement auf minergie.ch. Für grössere Gebäude verlangt Minergie ein **Energiemonitoring**, was die GA direkt betrifft.

## Deutschland: GEG

- **Gebäudeenergiegesetz** seit 2020, ersetzt EnEV, EnEG und EEWärmeG
- **Neubau:** Primärenergiebedarf seit 2023 höchstens 55 % des Referenzgebäudes
- **Heizungen:** Seit 2024 müssen neue Heizungen mindestens 65 % erneuerbare Energie nutzen, mit Übergangsfristen, die an die kommunale Wärmeplanung gekoppelt sind
- **Energieausweis:** als Bedarfs- oder Verbrauchsausweis, Klassen A+ bis H

## Kennzahlen in der GA

### Monitoring

Die GLT oder das EMS rechnet laufend:

- Wärmeverbrauch pro Monat geteilt durch die EBF
- witterungsbereinigt mit den Heizgradtagen, siehe [Gradtage](/wissen/gradtage)
- Vergleich mit dem Vorjahr und mit Kennwerten ähnlicher Gebäude

Steigt der bereinigte Verbrauch deutlich, etwa um 20 % gegenüber dem Vorjahr, ist das ein Grund nachzusehen.

### Zähler

Aussagekräftige Kennzahlen brauchen getrennte Messungen:

| Messung                     | Zähler                                 |
| --------------------------- | -------------------------------------- |
| Heizung                     | Wärmezähler                            |
| Warmwasser                  | Wärmezähler                            |
| Lüftung, Kälte, Beleuchtung | Strom-Teilzähler                       |
| Gas                         | Gaszähler; m³ mal Brennwert ergibt kWh |

Ohne Trennung von Heizung und Warmwasser lässt sich der Verbrauch nicht sauber witterungsbereinigen, weil das Warmwasser nicht von der Aussentemperatur abhängt.

## Normen und Regelwerke

- **SIA 380/1** — Heizwärmebedarf
- **SIA 416/1** — Kennzahlen und Bezugsgrössen, Energiebezugsfläche
- **MuKEn** — Mustervorschriften der Kantone im Energiebereich
- **GEAK** — Gebäudeenergieausweis der Kantone
- **Minergie** — Reglemente auf minergie.ch
- **GEG** — Gebäudeenergiegesetz (DE)
- **EPBD 2024** — EU-Gebäuderichtlinie: Nullemissionsgebäude für Neubauten ab 2030, für den Bestand bis 2050

<!-- EN -->

Energy metrics describe how much energy a building needs or uses, relative to its floor area. They are the basis for optimisation, subsidies and legal requirements.

## Demand and Consumption

| Term            | Source                                    | Use                                       |
| --------------- | ----------------------------------------- | ----------------------------------------- |
| **Demand**      | calculated, with standard use and climate | planning, compliance, comparing buildings |
| **Consumption** | measured, with real use and weather       | operation, monitoring, troubleshooting    |

The two often differ considerably. Consumption depends heavily on use, room temperature and operation. That is exactly where the BA comes in.

## Energy Reference Area

The reference in Switzerland is the **energy reference area** (EBF) per SIA 416/1: the sum of all floor areas that are heated or air-conditioned, measured including the external walls. It is larger than the living or usable area.

<p class="formel">Energy index = energy per year / EBF &nbsp; [kWh/(m²·a)]</p>

## Weighting of Energy Carriers

A kWh of electricity is not worth the same as a kWh of wood. For compliance the energy carriers are weighted. In Switzerland the cantonal regulations based on **MuKEn** use national weighting factors, for example **2.0 for electricity** and **1.0 for fossil fuels**. Renewable fuels and district heating have lower factors. The exact values are in the cantonal energy regulations.

In Germany the GEG uses **primary energy factors** per DIN V 18599.

## GEAK — Cantonal Building Energy Certificate

The GEAK rates an existing building with classes from **A** (very efficient) to **G** (inefficient), separately for:

- **efficiency of the building envelope**
- **overall energy efficiency**, including building services and weighted energy carriers
- **direct CO₂ emissions**

The class limits relate to the requirements for new buildings per SIA 380/1, not to fixed kWh values. The **GEAK Plus** adds an advisory report with retrofit options.

Some cantons require a GEAK on change of ownership, for subsidies or when replacing the heating system. The rules differ from canton to canton.

## Minergie

Minergie is a voluntary label for comfort and low energy demand:

| Label          | Focus                                                                        |
| -------------- | ---------------------------------------------------------------------------- |
| **Minergie**   | good envelope, renewable heat, controlled air exchange, own power generation |
| **Minergie-P** | stricter requirements for the envelope, very low heating demand              |
| **Minergie-A** | on an annual balance, own generation largely covers demand                   |
| **ECO add-on** | additionally health and building ecology                                     |

The limits are given as the **Minergie index** with weighted final energy and are adjusted regularly. Current values are in the regulations on minergie.ch. For larger buildings Minergie requires **energy monitoring**, which directly concerns the BA.

## Germany: GEG

- **Buildings Energy Act** since 2020, replaces EnEV, EnEG and EEWärmeG
- **New buildings:** primary energy demand since 2023 at most 55 % of the reference building
- **Heating:** since 2024 new heating systems must use at least 65 % renewable energy, with transition periods linked to municipal heat planning
- **Energy certificate:** demand or consumption based, classes A+ to H

## Metrics in the BA

### Monitoring

The BMS or EMS continuously calculates:

- monthly heat consumption divided by the EBF
- weather-corrected with heating degree days, see [Degree Days](/wissen/gradtage)
- comparison with the previous year and with benchmarks of similar buildings

If corrected consumption rises clearly, say by 20 % over the previous year, that is a reason to investigate.

### Meters

Meaningful metrics need separate measurements:

| Measurement                    | Meter                                               |
| ------------------------------ | --------------------------------------------------- |
| Heating                        | heat meter                                          |
| Hot water                      | heat meter                                          |
| Ventilation, cooling, lighting | electricity sub-meters                              |
| Gas                            | gas meter; m³ times gross calorific value gives kWh |

Without separating heating and hot water, consumption cannot be properly weather-corrected, because hot water does not depend on outdoor temperature.

## Standards and Regulations

- **SIA 380/1** — Heating demand
- **SIA 416/1** — Indicators and reference quantities, energy reference area
- **MuKEn** — Model cantonal energy regulations
- **GEAK** — Cantonal building energy certificate
- **Minergie** — Regulations on minergie.ch
- **GEG** — Buildings Energy Act (DE)
- **EPBD 2024** — EU buildings directive: zero-emission buildings for new construction from 2030, for the existing stock by 2050
