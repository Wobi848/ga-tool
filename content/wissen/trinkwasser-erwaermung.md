---
title: Trinkwarmwasser — Speicher, Frischwasserstation, Zirkulation
title_en: Domestic Hot Water — Cylinder, Fresh-Water Station, Circulation
slug: trinkwasser-erwaermung
category: sanitaer
subcategory: warmwasser
tags:
  [
    trinkwasser-erwärmung,
    warmwasser,
    brauchwasser,
    speicher,
    durchflusserwärmer,
    zirkulation,
    legionellen,
    hygiene,
    zapftemperatur,
    dvgw,
    w551,
    wärmespeicher,
    tww,
    kombispeicher
  ]
difficulty: fortgeschritten
area: [hlk, sanitaer, ga]
related: [legionellen, heizung-grundlagen, waermemengenzaehler, pufferspeicher]
norm: [SIA 385/1, SVGW W3/E3, EN 806, DVGW W 551]
updated: 2026-10-14
lang: de
---

# Trinkwarmwasser — Speicher, Frischwasserstation, Zirkulation

Trinkwarmwasser verbindet Komfort mit Hygiene. Die Temperaturen sind deshalb nicht Geschmackssache, sondern vorgeschrieben. Welche, steht in [Legionellen](/wissen/legionellen). Hier geht es um die Systeme und ihre Regelung.

## Systeme

| System                  | Prinzip                                                                                                     | Eignet sich für                               |
| ----------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| **Speicher**            | Warmwasser wird auf Vorrat gehalten, über Register oder externen Wärmetauscher geladen                      | Wohnbauten, Hotels, Spitäler                  |
| **Frischwasserstation** | Heizungswasser aus einem Pufferspeicher erwärmt das Trinkwasser erst beim Zapfen über einen Plattentauscher | Wärmepumpen, Solaranlagen, Mehrfamilienhäuser |
| **Durchlauferhitzer**   | elektrisch oder mit Gas direkt an der Zapfstelle                                                            | einzelne, entfernte Zapfstellen               |

**Frischwasserstationen** und **Durchlauferhitzer** speichern kein Trinkwarmwasser, das ist hygienisch ein Vorteil. Die Leitungen dahinter können aber trotzdem stehendes Warmwasser enthalten. Kurze Leitungen ohne Warmhaltung sind hygienisch unproblematisch, in Deutschland gilt dafür die 3-Liter-Regel, lange brauchen Zirkulation oder Heizband.

Elektrische Durchlauferhitzer brauchen hohe Anschlussleistungen, für eine Dusche etwa 18 bis 27 kW.

## Speicherladung

Der Speicher wird nach Fühler geladen, typischerweise:

- **Laden** beginnt, wenn der Fühler oben unter den Sollwert minus Schaltdifferenz fällt.
- **Laden** endet, wenn der Fühler unten den Sollwert erreicht. So wird der ganze Speicher warm, nicht nur die obere Hälfte.
- Der **Vorlauf zum Speicher** muss einige Kelvin über dem Speichersollwert liegen, bei 60 °C also etwa 65 bis 70 °C. Für Wärmepumpen ist das anspruchsvoll, siehe unten.
- Warmwasser hat meist **Vorrang** vor der Heizung, die Heizkreise werden während der Ladung begrenzt.

### Wärmepumpe und 60 °C

Viele Wärmepumpen erreichen die 60 °C im Speicher nur mit schlechtem COP oder gar nicht. Seit SIA 385/1:2020 gibt es keine Ausnahme mehr für tiefere Temperaturen. Lösungen:

- Wärmepumpe, die für hohe Vorlauftemperaturen geeignet ist, oder eine Warmwasser-Wärmepumpe
- Nachheizung der letzten Kelvin elektrisch oder mit einem zweiten Erzeuger
- Frischwasserstation, deren Puffer warm genug ist

## Zirkulation

<figure class="schema"><svg class="hyd" viewBox="0 0 430 215" role="img" aria-label="Warmwasser mit Zirkulation: Speicher 60 °C, warmgehaltene Leitungen überall mindestens 55 °C, Zapfstellen mindestens 50 °C, Kaltwasser höchstens 25 °C" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="20" y="40" width="60" height="140" rx="3" class="bauteil bg"/><path class="vl" d="M80 55L400 55L400 85" stroke-width="3"/><path class="mix" d="M400 85L400 150L80 150" stroke-width="3"/><circle cx="160" cy="150" r="9" class="bauteil bg"/><path d="M164 144L153 150L164 156Z" class="bauteil"/><circle class="vl fill" cx="200" cy="55" r="3"/><path class="vl" d="M200 55L200 22" stroke-width="3"/><circle class="vl fill" cx="280" cy="55" r="3"/><path class="vl" d="M280 55L280 22" stroke-width="3"/><circle class="vl fill" cx="360" cy="55" r="3"/><path class="vl" d="M360 55L360 22" stroke-width="3"/><path class="rl" d="M20 195L50 195L50 180" stroke-width="3"/><path class="vl fill" d="M135 51L145 55L135 59Z" stroke-width="1"/><path class="mix fill" d="M305 146L295 150L305 154Z" stroke-width="1"/><path class="rl fill" d="M30 191L40 195L30 199Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="50" y="113.33333333333333" text-anchor="middle" font-size="10"></text><text x="50" y="105" text-anchor="middle" font-size="11">Speicher</text><text x="50" y="122" text-anchor="middle" font-size="11" font-weight="600">60 °C</text><text x="200" y="16" text-anchor="middle" font-size="10">Zapfstelle</text><text x="280" y="16" text-anchor="middle" font-size="10">Zapfstelle</text><text x="360" y="16" text-anchor="middle" font-size="10">Zapfstelle</text><text x="86" y="199" text-anchor="start" font-size="10.5">Kaltwasser ≤ 25 °C</text><text x="240" y="78" text-anchor="middle" font-size="11" font-weight="600">warmgehalten: überall ≥ 55 °C</text><text x="240" y="140" text-anchor="middle" font-size="10.5">Zirkulation</text><text x="392" y="120" text-anchor="end" font-size="10.5">≥ 55 °C</text><text x="366" y="40" text-anchor="start" font-size="10">≥ 50 °C</text></g></svg><figcaption>Die Zirkulation hält die Verteilleitungen warm. Massgebend ist der Strang mit der tiefsten Temperatur.</figcaption></figure>

Die Zirkulation führt das abgekühlte Wasser zum Speicher zurück, damit die Leitungen überall mindestens 55 °C haben. Darauf kommt es an:

- **Hydraulischer Abgleich der Stränge** mit thermostatischen oder einstellbaren Zirkulationsventilen. Ohne ihn bleiben entfernte Stränge zu kalt.
- **Dämmung** aller warmgehaltenen Leitungen
- **Temperatur je Strang messen**, siehe [Legionellen](/wissen/legionellen)

**Zirkulation abschalten?** In Deutschland erlaubt DVGW W 551 eine Unterbrechung von höchstens 8 Stunden pro Tag in Anlagen mit einwandfreien hygienischen Verhältnissen. Wer in der Schweiz Zeitprogramme einsetzt, muss sicherstellen, dass die 55 °C trotzdem überall eingehalten werden; im Zweifel durchlaufen lassen.

## Verbrühschutz

60 °C an der Zapfstelle verbrühen innerhalb weniger Sekunden. Geschützt wird **dezentral**: mit Thermostat-Mischbatterien an der Zapfstelle oder einem Mischer vor einer Gruppe von Zapfstellen, mit kurzer Leitung danach.

Den ganzen Speicherausgang zentral auf 45 °C herunterzumischen, ist **hygienisch falsch**: Dann liegt das ganze Verteilnetz im Bereich, in dem sich Legionellen vermehren.

## GA-Datenpunkte

| Datenpunkt                     | Typ     | Einheit | Bemerkung                     |
| ------------------------------ | ------- | ------- | ----------------------------- |
| Speicher oben, unten           | AI      | °C      | Ladung, Hygiene               |
| Speichersollwert               | AV      | °C      | 60 °C                         |
| Zirkulation Rücklauf je Strang | AI      | °C      | ≥ 55 °C, Alarm                |
| Kaltwasser Eintritt            | AI      | °C      | ≤ 25 °C                       |
| Ladepumpe, Ladeventil          | DO / AO | —       |                               |
| Zirkulationspumpe              | DO      | —       | mit Betriebs- und Störmeldung |
| Warmwasserzähler               | Zähler  | l, kWh  | Verbrauch, Energie            |
| Desinfektion aktiv             | BV      | —       | nur bei Sanierung             |

## Normen

- **SIA 385/1:2020** — Anlagen für Trinkwarmwasser in Gebäuden
- **SVGW W3 mit E3** — Trinkwasserinstallationen, Hygiene
- **EN 806** — Trinkwasser-Installationen in Gebäuden
- **DVGW W 551, DIN 1988** — Deutschland

<!-- EN -->

Domestic hot water combines comfort with hygiene. Its temperatures are therefore not a matter of taste but prescribed; which ones is in [Legionella](/wissen/legionellen). This article covers the systems and their control.

## Systems

| System                   | Principle                                                                                             | Suits                                  |
| ------------------------ | ----------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **Cylinder**             | Hot water is kept in stock, charged via a coil or external heat exchanger                             | Residential, hotels, hospitals         |
| **Fresh-water station**  | Heating water from a buffer tank heats the drinking water only when drawn, via a plate heat exchanger | Heat pumps, solar, apartment buildings |
| **Instantaneous heater** | electric or gas, directly at the outlet                                                               | single, remote outlets                 |

**Fresh-water stations** and **instantaneous heaters** store no hot drinking water, which is a hygienic advantage. The pipes downstream can still contain standing hot water. Short pipes without warm-keeping are hygienically unproblematic (in Germany the 3-litre rule applies); long ones need circulation or trace heating.

Electric instantaneous heaters need high connected loads, about 18 to 27 kW for one shower.

## Cylinder Charging

The cylinder is charged by sensor, typically:

- **Charging** starts when the top sensor falls below the setpoint minus the differential.
- **Charging** ends when the bottom sensor reaches the setpoint. That way the whole cylinder gets warm, not just the top half.
- The **flow to the cylinder** must be a few kelvin above the cylinder setpoint, about 65 to 70 °C for 60 °C. That is demanding for heat pumps, see below.
- Hot water usually has **priority** over heating; heating circuits are limited during charging.

### Heat Pumps and 60 °C

Many heat pumps reach 60 °C in the cylinder only with a poor COP or not at all. Since SIA 385/1:2020 there is no exception for lower temperatures. Solutions:

- a heat pump suitable for high flow temperatures, or a hot water heat pump
- reheating the last few kelvin electrically or with a second generator
- a fresh-water station whose buffer is warm enough

## Circulation

<figure class="schema"><svg class="hyd" viewBox="0 0 430 215" role="img" aria-label="Hot water with circulation: cylinder 60 °C, warm-kept pipes at least 55 °C everywhere, outlets at least 50 °C, cold water at most 25 °C" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="20" y="40" width="60" height="140" rx="3" class="bauteil bg"/><path class="vl" d="M80 55L400 55L400 85" stroke-width="3"/><path class="mix" d="M400 85L400 150L80 150" stroke-width="3"/><circle cx="160" cy="150" r="9" class="bauteil bg"/><path d="M164 144L153 150L164 156Z" class="bauteil"/><circle class="vl fill" cx="200" cy="55" r="3"/><path class="vl" d="M200 55L200 22" stroke-width="3"/><circle class="vl fill" cx="280" cy="55" r="3"/><path class="vl" d="M280 55L280 22" stroke-width="3"/><circle class="vl fill" cx="360" cy="55" r="3"/><path class="vl" d="M360 55L360 22" stroke-width="3"/><path class="rl" d="M20 195L50 195L50 180" stroke-width="3"/><path class="vl fill" d="M135 51L145 55L135 59Z" stroke-width="1"/><path class="mix fill" d="M305 146L295 150L305 154Z" stroke-width="1"/><path class="rl fill" d="M30 191L40 195L30 199Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="50" y="113.33333333333333" text-anchor="middle" font-size="10"></text><text x="50" y="105" text-anchor="middle" font-size="11">Cylinder</text><text x="50" y="122" text-anchor="middle" font-size="11" font-weight="600">60 °C</text><text x="200" y="16" text-anchor="middle" font-size="10">Outlet</text><text x="280" y="16" text-anchor="middle" font-size="10">Outlet</text><text x="360" y="16" text-anchor="middle" font-size="10">Outlet</text><text x="86" y="199" text-anchor="start" font-size="10.5">Cold water ≤ 25 °C</text><text x="240" y="78" text-anchor="middle" font-size="11" font-weight="600">kept warm: ≥ 55 °C everywhere</text><text x="240" y="140" text-anchor="middle" font-size="10.5">Circulation</text><text x="392" y="120" text-anchor="end" font-size="10.5">≥ 55 °C</text><text x="366" y="40" text-anchor="start" font-size="10">≥ 50 °C</text></g></svg><figcaption>Circulation keeps the distribution pipes warm. The branch with the lowest temperature is decisive.</figcaption></figure>

Circulation returns the cooled water to the cylinder so the pipes have at least 55 °C everywhere. What matters:

- **Hydraulic balancing of the branches** with thermostatic or adjustable circulation valves. Without it, remote branches stay too cold.
- **Insulation** of all warm-kept pipes
- **Measure the temperature per branch**, see [Legionella](/wissen/legionellen)

**Switching circulation off?** In Germany, DVGW W 551 allows an interruption of at most 8 hours per day in systems with flawless hygienic conditions. Anyone using time programs in Switzerland must ensure that the 55 °C are still maintained everywhere; when in doubt, let it run.

## Scald Protection

60 °C at the outlet scalds within a few seconds. Protection is **decentralised**: thermostatic mixing taps at the outlet or a mixer ahead of a group of outlets, with a short pipe after it.

Mixing the whole cylinder outlet down to 45 °C centrally is **hygienically wrong**: the entire distribution network would then lie in the range where Legionella multiply.

## BA Data Points

| Data point                    | Type    | Unit   | Remark                     |
| ----------------------------- | ------- | ------ | -------------------------- |
| Cylinder top, bottom          | AI      | °C     | charging, hygiene          |
| Cylinder setpoint             | AV      | °C     | 60 °C                      |
| Circulation return per branch | AI      | °C     | ≥ 55 °C, alarm             |
| Cold water inlet              | AI      | °C     | ≤ 25 °C                    |
| Charging pump, charging valve | DO / AO | —      |                            |
| Circulation pump              | DO      | —      | with run and fault signals |
| Hot water meter               | meter   | l, kWh | consumption, energy        |
| Disinfection active           | BV      | —      | only for remediation       |

## Standards

- **SIA 385/1:2020** — Domestic hot water systems in buildings
- **SVGW W3 with E3** — Drinking water installations, hygiene
- **EN 806** — Specifications for installations inside buildings conveying water for human consumption
- **DVGW W 551, DIN 1988** — Germany
