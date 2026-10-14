---
title: Free Cooling — Direkte und indirekte freie Kühlung
title_en: Free Cooling — Direct and Indirect Free Cooling
slug: free-cooling
category: klima
subcategory: freie-kuehlung
tags:
  [
    free-cooling,
    freie-kühlung,
    direkte-freie-kühlung,
    indirekte-freie-kühlung,
    economizer,
    bypass,
    kältemaschine,
    wärmetauscher,
    aussenluft,
    geochore,
    kühlenergie,
    effizienz,
    eer,
    cop,
    hvac
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, nachtauskuehlung, adiabatische-kuehlung, cop-eer, kaeltemittel, rlt-anlage]
norm: [EN 14511, EN 15232, SIA 382/1, VDI 2067]
updated: 2026-05-15
lang: de
---

# Free Cooling — Direkte und indirekte freie Kühlung

Free Cooling nutzt kalte Aussenluft oder Erdwärme zur Gebäudekühlung ohne mechanische Kältemaschine. Je nach Aussentemperatur können 30–80 % der Kühlenergie eingespart werden.

## Grundprinzip

- **Kältemaschine:** 1 kWh Strom ergibt etwa 3 bis 5 kWh Kälte
- **Free Cooling:** Es laufen nur Pumpen und Ventilatoren, das ergibt oft das Zehn- bis Dreissigfache

**Aktivierungsbedingung:** T_Aussenluft < T_Rücklauf_Kälteträger (mit Sicherheitsmarge).

---

## Typen

### 1. Direkte Freie Kühlung (Air Economizer)

Aussenluft wird direkt zur Raumkühlung genutzt:

Beispiel Übergangszeit: aussen 18 °C, Raumsollwert 22 °C. Die Lüftung fährt mit 100 % Aussenluft, die Wärmerückgewinnung wird umgangen, die Kältemaschine bleibt aus.

Regelung:

- Aussentemperatur mindestens 2 K unter der Raumtemperatur
- Aussenluftklappe 100 %, Umluftklappe 0 %
- Wärmerückgewinnung umgehen (Bypass) oder anhalten
- Kältemaschine gesperrt

Enthalpie-Kontrolle nötig (wenn feuchte Nächte):

Zusätzlich bei feuchtem Wetter: nur freigeben, wenn die Enthalpie aussen deutlich unter der Raumluft liegt (z.B. 3 kJ/kg).

### 2. Indirekte Freie Kühlung (Fluid Economizer)

Kälteträger (Wasser / Glykol) wird über einen Rückkühler durch Aussenluft gekühlt:

Ein trockener Rückkühler kühlt das Kaltwasser mit Aussenluft. Er kann das Wasser nur auf einige Kelvin über der Aussentemperatur bringen, typisch 3 bis 5 K. Beispiel: aussen 5 °C, Rücklauf 14 °C, Vorlauf nach dem Rückkühler etwa 9 °C.

Vorteil: Gebäudeluft wird nicht direkt mit Aussenluft verbunden (Hygiene, Filterung).

**Schaltschemas:**

- **Parallel:** Rückkühler oder Kältemaschine, in der Übergangszeit beide anteilig
- **In Serie:** Der Rückkühler kühlt vor, die Kältemaschine kühlt nach und braucht weniger Leistung. Diese Anordnung nutzt das Free Cooling länger.

### 3. Geothermale Freie Kühlung (Passive Cooling)

Erdwärme-Anlage (Erdsonden, Grundwasser) liefert Kaltwasser ohne Wärmepumpe:

Das Erdreich hat ganzjährig etwa 10 bis 14 °C. Im Sommer fliesst die Wärme aus dem Gebäude über die Erdsonden ins Erdreich, ohne Wärmepumpe. Es laufen nur Pumpen. Ideal für Kühldecken und thermoaktive Bauteile, die ohnehin mit 16 °C und mehr arbeiten. Nebeneffekt: Das Erdreich wird für die Heizsaison regeneriert.

---

## Betriebsstunden-Analyse Schweiz

Wie viele Stunden Free Cooling möglich sind, hängt vom Standort, von der Kaltwassertemperatur und von den inneren Lasten ab. Je höher die Kaltwassertemperatur (Kühldecken 16 °C statt Lüftungskühler 6 °C), desto mehr Stunden. Im Schweizer Mittelland kann ein grosser Teil der Kühlarbeit eines Bürogebäudes mit hohen inneren Lasten ohne Kältemaschine geleistet werden; eine Simulation sagt, wie viel.

---

## Steuerungslogik im DDC

- **Stufe 1, nur Free Cooling:** Aussentemperatur deutlich unter dem Kaltwassersollwert, z.B. 4 K darunter. Rückkühler übernimmt alles, Kältemaschine aus.
- **Stufe 2, gemischt:** Aussentemperatur nahe am Sollwert. Rückkühler kühlt vor, Kältemaschine deckt den Rest.
- **Stufe 3, nur Kältemaschine:** Aussentemperatur über dem Rücklauf. Der Rückkühler dient als Verflüssigerkühlung.

Mit Hysterese und Mindestlaufzeiten umschalten, sonst pendelt die Anlage in der Übergangszeit.

---

## GA-Datenpunkte Free Cooling

| Datenpunkt             | Typ | Einheit | Beschreibung             |
| ---------------------- | --- | ------- | ------------------------ |
| T_Aussenluft           | AI  | °C      | Freigabebedingung        |
| T_Kälteträger VL Ist   | AI  | °C      | Kühlwasser-Vorlauf       |
| Free-Cooling Betrieb   | DI  | —       | Rückkühler aktiv         |
| Kältemaschine Freigabe | DO  | —       | KM gesperrt bei FC       |
| Rückkühler Ventilator  | AO  | %       | Drehzahl 0–100 %         |
| Umschaltventil FC/KM   | DO  | —       | Klappe Free Cooling-Pfad |
| Energie Free Cooling   | AI  | kWh     | Einsparungsmonitoring    |

---

## Wirtschaftlichkeit

Grobe Abschätzung, nur zur Grössenordnung: 100 kW Kühlbedarf und 1200 Volllaststunden ergeben ohne Free Cooling bei einem EER von 3.5 rund 34'000 kWh Strom. Kann Free Cooling 70 % der Kälte liefern, bleiben für die Kältemaschine rund 10'000 kWh, dazu kommt Pumpen- und Ventilatorstrom für das Free Cooling. Die Einsparung liegt dann in der Grössenordnung von 50 bis 60 %. Für eine echte Aussage braucht es eine Simulation mit dem Lastprofil.

---

## Normen

- **EN 14511** — Kältemaschinen, Wärmepumpen (Prüfbedingungen, Effizienz)
- **EN 15232** — Free Cooling als GA-Klasse-A-Funktion
- **SIA 382/1** — Energieoptimierte Lüftungs-/Klimaanlagen
- **VDI 2067** — Wirtschaftlichkeitsberechnungen für Gebäudetechnik

<!-- EN -->

Free cooling uses cold outdoor air or geothermal energy to cool a building without a mechanical chiller. Depending on outdoor temperature, 30–80 % of cooling energy can be saved.

## Basic Principle

- **Chiller:** 1 kWh of electricity yields about 3 to 5 kWh of cooling
- **Free cooling:** only pumps and fans run, often ten to thirty times as much

**Activation condition:** T_outdoor < T_chilled_water_return − safety margin.

---

## Types

### 1. Direct Free Cooling (Air Economiser)

Outdoor air is used directly for room cooling:

Example mid-season: outdoor 18 °C, room setpoint 22 °C. Ventilation runs with 100 % outdoor air, heat recovery is bypassed, the chiller stays off.

Control logic:

- outdoor temperature at least 2 K below room temperature
- outdoor air damper 100 %, recirculation damper 0 %
- bypass or stop heat recovery
- chiller locked out

Enthalpy check required (humid nights):

Additionally in humid weather: enable only if outdoor enthalpy is clearly below the room air (e.g. 3 kJ/kg).

### 2. Indirect Free Cooling (Fluid Economiser)

Chilled water / glycol is cooled by outdoor air via a dry cooler:

A dry cooler cools the chilled water with outdoor air. It can only bring the water to a few kelvin above the outdoor temperature, typically 3 to 5 K. Example: outdoor 5 °C, return 14 °C, flow after the dry cooler about 9 °C.

Advantage: building air is not directly connected to outdoor air (hygiene, filtration).

**Circuit variants:**

- **Parallel:** dry cooler or chiller, both in proportion in mid-season
- **In series:** the dry cooler pre-cools, the chiller cools the rest and needs less power. This arrangement uses free cooling longer.

### 3. Geothermal Free Cooling (Passive Cooling)

Ground source heat pump system (boreholes, groundwater) supplies cold water without heat pump:

The ground stays at about 10 to 14 °C all year. In summer the heat flows from the building via the boreholes into the ground, without a heat pump. Only pumps run. Ideal for chilled ceilings and thermally activated building components that work at 16 °C or more anyway. Side effect: the ground is regenerated for the heating season.

---

## Operating Hours Analysis — Switzerland

How many hours of free cooling are possible depends on location, chilled water temperature and internal loads. The higher the chilled water temperature (chilled ceilings 16 °C instead of AHU coolers 6 °C), the more hours. In the Swiss Mittelland a large share of the cooling work of an office building with high internal loads can be done without a chiller; a simulation tells how much.

---

## Control Logic in DDC

- **Stage 1, free cooling only:** outdoor temperature well below the chilled water setpoint, e.g. 4 K below. The dry cooler takes over everything, chiller off.
- **Stage 2, mixed:** outdoor temperature close to the setpoint. The dry cooler pre-cools, the chiller covers the rest.
- **Stage 3, chiller only:** outdoor temperature above the return. The dry cooler serves as condenser cooling.

Switch with hysteresis and minimum run times, otherwise the plant hunts in mid-season.

---

## BA Data Points — Free Cooling

| Data point                    | Type | Unit | Description              |
| ----------------------------- | ---- | ---- | ------------------------ |
| T_outdoor                     | AI   | °C   | Enable condition         |
| T_chilled water supply actual | AI   | °C   | Chilled water supply     |
| Free cooling operation        | DI   | —    | Dry cooler active        |
| Chiller enable                | DO   | —    | Chiller locked during FC |
| Dry cooler fan                | AO   | %    | Speed 0–100 %            |
| FC/chiller changeover valve   | DO   | —    | Damper free cooling path |
| Free cooling energy           | AI   | kWh  | Savings monitoring       |

---

## Economic Viability

Rough estimate, for order of magnitude only: 100 kW cooling demand and 1200 full-load hours give about 34,000 kWh of electricity without free cooling at an EER of 3.5. If free cooling can supply 70 % of the cooling, about 10,000 kWh remain for the chiller, plus pump and fan electricity for free cooling. The saving is then of the order of 50 to 60 %. A real answer needs a simulation with the load profile.

---

## Standards

- **EN 14511** — Chillers, heat pumps (test conditions, efficiency)
- **EN 15232** — Free cooling as BA class A function
- **SIA 382/1** — Energy-optimised ventilation/air-conditioning systems
- **VDI 2067** — Economic efficiency calculations for building services
