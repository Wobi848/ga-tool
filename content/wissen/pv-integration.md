---
title: PV-Integration in die Gebäudeautomation
title_en: PV Integration into Building Automation
slug: pv-integration
category: energie
subcategory: erneuerbare
tags:
  [
    photovoltaik,
    pv,
    wechselrichter,
    eigenverbrauch,
    überschusssteuerung,
    sunspec,
    sma,
    fronius,
    kostal,
    deye,
    einspeisebegrenzung,
    nulleinspeisung,
    ertragsprognose,
    pv-ems,
    mppt,
    wechselrichter-schnittstelle
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related:
  [
    ems-lastmanagement,
    batteriespeicher,
    sg-ready,
    e-mobility-lademanagement,
    energiemessung,
    mpc-ga
  ]
rechner: []
norm: [EN 50549-1, VDE-AR-N 4105, SunSpec]
updated: 2026-10-14
lang: de
---

# PV-Integration in die Gebäudeautomation

Wird die Photovoltaikanlage in die GA oder ein Energiemanagement eingebunden, lässt sich mehr Solarstrom im Gebäude selbst nutzen. Steuerbare Verbraucher wie Wärmepumpe, Ladestationen, Batterie oder Heizstab laufen dann bevorzugt, wenn die Sonne scheint.

## Ertrag und Eigenverbrauch

Eine PV-Anlage liefert an einem klaren Tag ein glockenförmiges Profil mit dem Maximum um die Mittagszeit. Ohne Steuerung fliesst der Überschuss ins Netz, morgens und abends wird Strom bezogen.

Den Eigenverbrauch erhöhen:

- **Lasten verschieben:** Warmwasser, Speicherladung der Wärmepumpe, E-Auto, Geräte mit Startzeit
- **Speichern:** Batterie, aber auch thermisch in Warmwasser- und Pufferspeichern, was meist günstiger ist
- **Heizstab:** einfach, aber mit COP 1 die am wenigsten wertvolle Nutzung. Eine Wärmepumpe macht aus derselben kWh drei bis vier kWh Wärme.

## Schnittstellen der Wechselrichter

Fast alle Wechselrichter lassen sich über **Modbus TCP** auslesen, viele auch über **Modbus RTU** (RS-485). Viele Hersteller halten sich an **SunSpec**, einen offenen Standard mit festgelegten Modbus-Registern für:

- AC- und DC-Leistung, Energie, Spannung, Frequenz
- Betriebszustand und Fehlercodes
- Vorgaben für Wirkleistungsbegrenzung und Blindleistung

Ob und wie vollständig SunSpec unterstützt wird, steht in der Dokumentation des Herstellers. Manche bieten zusätzlich eigene Register oder eine REST-API.

Für die Regelung braucht es vor allem einen **Zähler am Netzanschlusspunkt**, der Bezug und Einspeisung in Echtzeit liefert, etwa über Modbus. Nur damit weiss das EMS, wie viel Überschuss gerade vorhanden ist.

## Einspeisung begrenzen

**Schweiz:** Eine feste Begrenzung wie die frühere deutsche 70-%-Regel gibt es nicht. Seit 2026 darf der Netzbetreiber die Einspeisung netzdienlich abregeln. Der Produktionsverlust darf dabei höchstens 3 % der Jahresproduktion einer Anlage betragen. Einzelne Netzbetreiber verlangen bei grossen Anlagen im Anschlussgesuch eine Begrenzung.

**Deutschland:** Die 70-%-Regel nach EEG ist für neue Anlagen seit 2023 weggefallen. Für Neuanlagen ab dem 25. Februar 2025 gilt nach dem «Solarspitzengesetz» eine Begrenzung der Einspeiseleistung auf 60 %, bis ein intelligentes Messsystem mit Steuerbox eingebaut ist.

**Nulleinspeisung:** Das EMS regelt die Wechselrichterleistung so, dass am Netzanschlusspunkt nichts eingespeist wird. Das braucht eine schnelle Messung dort und einen Wechselrichter, der Leistungsvorgaben annimmt.

## Eigenverbrauchsgemeinschaften (CH)

- **ZEV**, Zusammenschluss zum Eigenverbrauch: Mehrere Parteien in einem Gebäude oder auf benachbarten Grundstücken nutzen den Solarstrom gemeinsam und haben nur einen Netzanschluss gegenüber dem Netzbetreiber. Die interne Abrechnung braucht eigene Zähler.
- **vZEV**, virtueller ZEV: wie ZEV, aber mit den Zählern des Netzbetreibers
- **LEG**, lokale Elektrizitätsgemeinschaft: seit dem 1. Januar 2026 möglich; Produzenten und Verbraucher in derselben Gemeinde und im Netz desselben Netzbetreibers teilen Strom über das öffentliche Netz mit reduziertem Netznutzungstarif. Alle brauchen Smart Meter.

## Überschusssteuerung

Das EMS vergleicht laufend Erzeugung und Verbrauch und schaltet Verbraucher nach einer festgelegten Reihenfolge zu, zum Beispiel:

1. Wärmepumpe: Warmwasser oder Puffer auf höheren Sollwert laden, etwa über SG-Ready
2. E-Auto mit dynamischem Ladestrom
3. Batterie laden
4. Heizstab, nur wenn alles andere voll ist

Die Reihenfolge hängt vom Gebäude ab. Ein Wärmespeicher nutzt die Energie oft besser als die Batterie, die Batterie verschiebt Strom dafür in den Abend.

**E-Auto:** Ein Auto lädt mit mindestens 6 A. Das sind einphasig rund 1.4 kW und dreiphasig rund 4.1 kW. Liegt der Überschuss darunter, reicht er nicht. Damit das Laden nicht ständig startet und stoppt, braucht es eine Hysterese und Mindestzeiten. Wallboxen mit Phasenumschaltung können zwischen ein- und dreiphasig wechseln.

## Prognose

Mit einer Ertragsprognose lässt sich vorausplanen: Die Batterie morgens nicht aus dem Netz laden, wenn ein sonniger Tag kommt; die Wärmepumpe auf den Mittag verschieben. Quellen sind Wetterdienste mit Strahlungsprognosen und spezialisierte Anbieter. Siehe [Model Predictive Control](/wissen/mpc-ga).

## Beispiel einer Einbindung

| Komponente           | Anbindung                  | Aufgabe                                |
| -------------------- | -------------------------- | -------------------------------------- |
| PV-Wechselrichter    | Modbus TCP, SunSpec        | Leistung, Ertrag, Begrenzung           |
| Zähler Netzanschluss | Modbus TCP oder RTU        | Bezug und Einspeisung in Echtzeit      |
| Batterie             | Modbus TCP                 | Ladezustand, Lade- und Entladeleistung |
| Ladestation          | OCPP oder Modbus           | Ladestrom vorgeben                     |
| Wärmepumpe           | SG-Ready oder Modbus       | Betrieb mit erhöhtem Sollwert          |
| EMS oder GLT         | sammelt alles, entscheidet | Überschusssteuerung, Lastmanagement    |

## Kennwerte

| Grösse                                       | Richtwert             | Bemerkung                                      |
| -------------------------------------------- | --------------------- | ---------------------------------------------- |
| Jahresertrag Mittelland                      | etwa 900–1100 kWh/kWp | Ausrichtung Süd, gute Neigung                  |
| Eigenverbrauch Einfamilienhaus ohne Speicher | etwa 25–35 %          | stark abhängig von Anlagengrösse und Verbrauch |
| Eigenverbrauch mit Batterie                  | etwa 50–70 %          | je nach Speichergrösse                         |
| Wirkungsgrad Wechselrichter                  | 96–98 %               | europäischer Wirkungsgrad                      |

## Normen und Regeln

- **Werkvorschriften und Branchendokumente** des VSE für den Netzanschluss (CH)
- **EN 50549-1** — Anforderungen an Erzeugungsanlagen am Niederspannungsnetz
- **VDE-AR-N 4105** — Erzeugungsanlagen am Niederspannungsnetz (DE)
- **SunSpec** — offene Modbus-Informationsmodelle für Wechselrichter und Speicher

<!-- EN -->

When the photovoltaic system is integrated into the BA or an energy management system, more solar power can be used in the building itself. Controllable loads such as heat pump, charging stations, battery or immersion heater then run preferably when the sun is shining.

## Yield and Self-Consumption

On a clear day a PV system delivers a bell-shaped profile with the maximum around noon. Without control the surplus flows into the grid, while power is drawn in the morning and evening.

Increasing self-consumption:

- **Shift loads:** hot water, heat pump storage charging, electric car, appliances with start time
- **Store:** battery, but also thermally in hot water and buffer tanks, which is usually cheaper
- **Immersion heater:** simple, but with COP 1 the least valuable use. A heat pump turns the same kWh into three to four kWh of heat.

## Inverter Interfaces

Almost all inverters can be read via **Modbus TCP**, many also via **Modbus RTU** (RS-485). Many manufacturers follow **SunSpec**, an open standard with defined Modbus registers for:

- AC and DC power, energy, voltage, frequency
- operating state and fault codes
- setpoints for active power limitation and reactive power

Whether and how completely SunSpec is supported is in the manufacturer documentation. Some also offer their own registers or a REST API.

Control mainly needs a **meter at the grid connection point** that delivers import and export in real time, for example via Modbus. Only then does the EMS know how much surplus there is.

## Limiting Export

**Switzerland:** there is no fixed limit like the former German 70 % rule. Since 2026 the grid operator may curtail feed-in to support the grid. The production loss may be at most 3 % of a system's annual production. Some grid operators require a limit for large systems in the connection application.

**Germany:** the 70 % rule under the EEG was dropped for new systems from 2023. Under the "solar peak law", new systems commissioned from 25 February 2025 are limited to 60 % export power until a smart metering system with control box is installed.

**Zero export:** the EMS controls the inverter output so that nothing is exported at the grid connection point. This needs fast measurement there and an inverter that accepts power setpoints.

## Self-Consumption Communities (CH)

- **ZEV**, self-consumption association: several parties in a building or on neighbouring plots share solar power and have a single grid connection towards the grid operator. Internal billing needs its own meters.
- **vZEV**, virtual ZEV: like a ZEV, but using the grid operator's meters
- **LEG**, local electricity community: possible since 1 January 2026; producers and consumers in the same municipality and on the same grid operator's network share power over the public grid at a reduced network tariff. All need smart meters.

## Surplus Control

The EMS continuously compares generation and consumption and switches on loads in a defined order, for example:

1. Heat pump: charge hot water or buffer to a higher setpoint, for example via SG-Ready
2. Electric car with dynamic charging current
3. Charge the battery
4. Immersion heater, only when everything else is full

The order depends on the building. A thermal store often uses the energy better than the battery; the battery, in turn, shifts power into the evening.

**Electric car:** a car charges at 6 A minimum. That is about 1.4 kW single-phase and about 4.1 kW three-phase. If the surplus is below that, it is not enough. To keep charging from constantly starting and stopping, hysteresis and minimum times are needed. Wallboxes with phase switching can change between single- and three-phase.

## Forecast

A yield forecast allows planning ahead: do not charge the battery from the grid in the morning if a sunny day is coming; shift the heat pump to noon. Sources are weather services with irradiance forecasts and specialised providers. See [Model Predictive Control](/wissen/mpc-ga).

## Example Integration

| Component             | Connection                   | Task                                        |
| --------------------- | ---------------------------- | ------------------------------------------- |
| PV inverter           | Modbus TCP, SunSpec          | power, yield, limitation                    |
| Grid connection meter | Modbus TCP or RTU            | import and export in real time              |
| Battery               | Modbus TCP                   | state of charge, charge and discharge power |
| Charging station      | OCPP or Modbus               | set charging current                        |
| Heat pump             | SG-Ready or Modbus           | operation with raised setpoint              |
| EMS or BMS            | collects everything, decides | surplus control, load management            |

## Typical Values

| Quantity                                             | Guide value            | Note                                              |
| ---------------------------------------------------- | ---------------------- | ------------------------------------------------- |
| Annual yield, Swiss Plateau                          | about 900–1100 kWh/kWp | south-facing, good tilt                           |
| Self-consumption single-family house without storage | about 25–35 %          | strongly dependent on system size and consumption |
| Self-consumption with battery                        | about 50–70 %          | depending on storage size                         |
| Inverter efficiency                                  | 96–98 %                | European efficiency                               |

## Standards and Rules

- **Utility technical requirements and VSE industry documents** for grid connection (CH)
- **EN 50549-1** — Requirements for generating plants connected to the low-voltage grid
- **VDE-AR-N 4105** — Generating plants on the low-voltage grid (DE)
- **SunSpec** — open Modbus information models for inverters and storage
