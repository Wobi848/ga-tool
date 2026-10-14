---
title: Luftfeuchtigkeit — Grundlagen für die GA
title_en: Air Humidity — Fundamentals for BA
slug: luftfeuchtigkeit
category: physik
subcategory: luft
tags:
  [
    luftfeuchtigkeit,
    relative-feuchte,
    absolute-feuchte,
    spezifische-feuchte,
    x-wert,
    mollier,
    h-x-diagramm,
    taupunkt,
    behaglichkeit,
    schimmel
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [
    befeuchter,
    feuchtesensoren,
    taupunkt,
    sensoren,
    waermerueckgewinnung,
    en16798,
    raumluftqualitaet
  ]

rechner: [psychrometrie, taupunkt]
norm: [DIN EN 13779, DIN EN 16798-1, DIN ISO 7730, SIA 382/1]
updated: 2026-05-24
lang: de
---

# Luftfeuchtigkeit — Grundlagen für die GA

Luftfeuchtigkeit ist ein zentraler Komfort- und Bauphysik-Parameter. Zu trocken → gereizte Schleimhäute und Statik-Probleme; zu feucht → Schimmel und Schwitzwasser. Die GA regelt Feuchte indirekt (über Befeuchten/Entfeuchten/WRG) und braucht dafür ein paar Begriffe und das h-x-Diagramm.

## Die drei Begriffe für „Feuchte"

| Grösse                  | Symbol | Einheit | Was bedeutet das?                                                                        |
| ----------------------- | ------ | ------- | ---------------------------------------------------------------------------------------- |
| **Relative Feuchte**    | φ, rF  | %       | Anteil des aktuellen Wasserdampfgehalts am **Sättigungsgehalt bei aktueller Temperatur** |
| **Absolute Feuchte**    | ρ_w    | g/m³    | Masse Wasserdampf pro Kubikmeter feuchte Luft                                            |
| **Spezifische Feuchte** | x      | g/kg    | Masse Wasserdampf pro Kilogramm **trockener** Luft — der **HLK-Standard**                |

**Warum x in der HLK?** Wenn man Luft erwärmt, dehnt sie sich aus → ρ_w (g/m³) ändert sich ohne dass Wasser zu- oder abgeführt wird. x dagegen bleibt konstant solange weder befeuchtet noch entfeuchtet wird. Deshalb ist x die **erhaltene Grösse** bei reiner Temperatur-Änderung — und damit der natürliche Parameter im h-x-Diagramm.

## Sättigung — warum „relative" Feuchte relativ ist

Warme Luft kann mehr Wasser tragen als kalte. Bei 0 °C sind etwa 3.8 g/kg Sättigung, bei 20 °C ~14.7 g/kg, bei 30 °C ~27 g/kg. Die rF setzt aktuellen Wassergehalt in Bezug zu diesem **temperaturabhängigen Maximum**:

<p class="formel">φ = p<sub>D</sub> / p<sub>S</sub>(T) · 100 % ≈ x / x<sub>S</sub>(T) · 100 %</p>

p_D ist der Partialdruck des Wasserdampfs, p_S der Sättigungsdruck bei der aktuellen Temperatur. Das Verhältnis der x-Werte ist eine gute Näherung.

**Konsequenz:** Wenn du dieselbe Luft (gleicher x-Wert) **erwärmst**, sinkt rF. Wenn du sie **kühlst**, steigt rF — bis bei Erreichen des **Taupunkts** rF = 100 % und Kondensation einsetzt.

### Klassisches Winter-Beispiel

| Punkt                                  | T      | rF     | x          |
| -------------------------------------- | ------ | ------ | ---------- |
| Aussen                                 | −5 °C  | 80 %   | ≈ 2.0 g/kg |
| Drinnen nach Heizung (ohne Befeuchten) | +22 °C | ≈ 12 % | ≈ 2.0 g/kg |
| Drinnen mit Komfort-Befeuchtung        | +22 °C | 40 %   | ≈ 6.6 g/kg |

Im Winter ist Innenluft ohne Befeuchtung **immer trocken** — egal wie sehr die Aussenluft „feucht" wirkt. Ein 80 %-rF-Tag draussen bei −5 °C ist physikalisch dieselbe Luft wie 12 % rF drinnen bei 22 °C.

## Das h-x-Diagramm (Mollier)

Im deutschsprachigen Raum ist das h-x-Diagramm nach Mollier üblich:

- **waagrecht:** Wassergehalt x in g/kg trockene Luft
- **senkrecht:** Temperatur. Die Isothermen steigen leicht nach rechts an.
- **schräg nach rechts unten:** Linien gleicher Enthalpie h in kJ/kg
- **gebogen nach rechts oben:** Linien gleicher relativer Feuchte, unten rechts begrenzt durch die Sättigungslinie φ = 100 %

Im englischen Sprachraum ist das **Carrier-Diagramm** (Psychrometric Chart) verbreitet. Es ist das gleiche Diagramm, nur gespiegelt und gedreht: Temperatur waagrecht, Wassergehalt senkrecht.

### Typische Operationen als Pfeile

| HLK-Vorgang                                       | Mollier (h-x)                                                      | Carrier                     |
| ------------------------------------------------- | ------------------------------------------------------------------ | --------------------------- |
| **Heizen** (sensibel)                             | senkrecht nach oben, x konstant, rF sinkt                          | waagrecht nach rechts       |
| **Kühlen ohne Kondensation**                      | senkrecht nach unten, x konstant, rF steigt                        | waagrecht nach links        |
| **Kühlen mit Kondensation**                       | nach unten bis zur Sättigung, dann x kleiner                       | nach links, dann nach unten |
| **Adiabatische Befeuchtung** (Sprühnebel/Wäscher) | entlang h = konstant nach rechts unten                             | schräg nach links oben      |
| **Dampfbefeuchtung**                              | fast waagrecht nach rechts, T steigt kaum                          | fast senkrecht nach oben    |
| **Mischen zweier Luftströme**                     | auf Verbindungslinie der beiden Punkte, gewichtet nach Massenstrom |
| **Wärmerückgewinnung sensibel**                   | nur T-Verschiebung — x bleibt                                      |
| **Wärmerückgewinnung enthalpisch** (Rotor)        | T und x werden zwischen Zu- und Abluft getauscht                   |

> Im **[Psychrometrie-Rechner](/rechner/psychrometrie)** ist ein interaktives h-x-Diagramm eingebaut. Du gibst T + rF (oder x, Taupunkt, h) ein und siehst deinen Arbeitspunkt live im Carrier-Diagramm zusammen mit den rF-Kurven (20/40/60/80/100 %) und dem Taupunkt-Marker auf der Sättigungslinie.

## Behaglichkeitsbereich

**EN 16798-1** nennt Auslegungswerte für Anlagen, die befeuchten oder entfeuchten:

| Kategorie | Befeuchten bis | Entfeuchten ab |
| --------- | -------------- | -------------- |
| I         | 30 %           | 50 %           |
| II        | 25 %           | 60 %           |
| III       | 20 %           | 70 %           |

Die Temperatur liegt nach **EN ISO 7730** im Büro bei 20–24 °C im Winter und 23–26 °C im Sommer.

In der Schweiz soll nach **SIA 382/1** nur befeuchtet werden, wo die Nutzung es verlangt. Kurze Zeiten mit tiefer Feuchte im Winter gelten als hinnehmbar. Nach oben begrenzt die Norm vor allem den Wassergehalt, damit es nicht schwül wird.

| rF          | Bewertung                                                                     |
| ----------- | ----------------------------------------------------------------------------- |
| < 20 %      | Sehr trocken — Schleimhäute, Augen brennen, Statik-Elektrizität, Holzschwund  |
| 20–30 %     | Trocken — typisch Winter ohne Befeuchtung, von vielen schon unangenehm        |
| **30–55 %** | **Komfort** — Standardziel in Komfortlüftung                                  |
| 55–65 %     | Spürbar feucht, noch ok; Schwüle bei höherer T                                |
| > 60 %      | Hausstaubmilben vermehren sich; an kalten Bauteilen steigt das Schimmelrisiko |
| > 70 %      | An kalten Ecken und Fensterlaibungen wird die Oberfläche bald zu feucht       |

Für Schimmel zählt die Feuchte **an der Oberfläche**, nicht im Raum. Ab etwa 80 % Oberflächenfeuchte über mehrere Tage wächst Schimmel. Eine Wand, die 5 K kälter ist als die Raumluft, erreicht diese Feuchte schon bei rund 55 % im Raum.

## Zu trocken — Konsequenzen und Massnahmen

**Symptome:**

- Brennende Augen, trockener Hals, nach mehreren Studien mehr Atemwegsinfekte bei sehr trockener Luft
- Statische Aufladung (Funken beim Türklinken, Probleme in Elektronik-Räumen)
- Holzparkett/Möbel reissen, klassische Klavier-/Geigen-Verstimmung
- Vermehrte Staubaufwirbelung — kleine Partikel bleiben länger in der Luft

**Massnahmen GA-Seite:**

- **Dampfbefeuchter** zentral in RLT (kontrolliert + hygienisch, aber energieintensiv)
- **Adiabatischer Befeuchter** (Hochdrucksprüh, Verdunster) — energieärmer, aber Hygiene-Anforderungen nach **VDI 6022**
- **Wärme­rückgewinnung mit Enthalpie-Übertrager** (Rotor mit hygroskopischer Beschichtung) — gibt Feuchte der Abluft an die Zuluft zurück, oft die billigste „Befeuchtung"

Detail-Artikel: [Befeuchter](/wissen/befeuchter), [Wärmerückgewinnung](/wissen/waermerueckgewinnung).

## Zu feucht — Konsequenzen und Massnahmen

**Symptome:**

- Schimmel an kalten Wand-Ecken, hinter Möbeln, in Fensterlaibungen
- Hausstaubmilben (vermehren sich ab etwa 60 % rF) — Allergien
- Materialschäden: aufgehende Tapeten, durchfeuchtete Dämmung, Korrosion an Stahlträgern
- Schwüle-Empfinden im Sommer schon ab 60 % rF + 26 °C

**Massnahmen GA-Seite:**

- **Kühlung mit Entfeuchtung** — Zuluft unter Taupunkt kühlen, kondensieren lassen, dann nachheizen
- **Adsorptions-Entfeuchter** (Silica-Gel/Lithiumchlorid-Rotor) — kann tiefer entfeuchten als Kühlentfeuchtung, energetisch teurer
- **Lüften mit kühlerer/trockenerer Aussenluft** (häufig im Winter problemlos, im Sommer nur nachts effektiv → siehe [Nachtauskühlung](/wissen/nachtauskuehlung))

## Was die GA typischerweise misst und regelt

| Messgrösse                             | Wo                             | Wofür                                         |
| -------------------------------------- | ------------------------------ | --------------------------------------------- |
| **rel. Feuchte**                       | Raum, Zu-, Abluft              | Komfortregelung, Befeuchter-Steuerung         |
| **Taupunkt**                           | Aussenluft, kritische Bauteile | Schwitzwasser-Schutz, Bauteilkühlung-Regelung |
| **Enthalpie** (rechnerisch aus T + rF) | RLT-Bilanz                     | Energiekenngrösse, Mischluft-Optimum          |

Sensor-Auswahl + Einbau: siehe [Feuchtesensoren](/wissen/feuchtesensoren).

## Praxis-Stolperfallen

- **Sensor neben Heizkörper** → misst lokale Trockenluft, nicht den Raum-Mittelwert
- **Sensor in der Decke** → warme Schicht, andere rF als am Aufenthaltsort
- **rF-Drift** über die Zeit — kapazitive Sensoren brauchen alle 2–3 Jahre Vergleichsmessung
- **Befeuchter ohne Hygienewartung** → Legionellen-Risiko bei Sprühvernebler (VDI 6022, SWKI VA104-01)
- **Behaglichkeit nur über rF regeln** — der Komfort hängt auch von T, Strahlung, Luftgeschwindigkeit ab (siehe Behaglichkeitsmodell PMV/PPD nach EN ISO 7730, [Thermische Behaglichkeit](/wissen/thermische-behaglichkeit))

## Verwandt

- **[Befeuchter](/wissen/befeuchter)** — Bauarten, Regelung, Hygiene
- **[Feuchtesensoren](/wissen/feuchtesensoren)** — Messung, kapazitives Prinzip, Einbau
- **[Taupunkt](/wissen/taupunkt)** — Taupunktrechner, Bauteilkondensation
- **[Wärmerückgewinnung](/wissen/waermerueckgewinnung)** — sensibel vs enthalpisch
- **[Raumluftqualität](/wissen/raumluftqualitaet)** — IDA-Kategorien, EN 16798
- **[Psychrometrie-Rechner](/rechner/psychrometrie)** — h-x-Punkte interaktiv

## Zusammenfassung

| Wenn du …                               | Brauchst du …                                                                                         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| im Winter < 30 % rF im Raum hast        | Befeuchter (Dampf oder adiabat) oder Enthalpie-WRG                                                    |
| im Sommer > 60 % rF + Schwüle hast      | Entfeuchtung über Kühlregister oder Adsorptions-Entfeuchter                                           |
| Schwitzwasser an Lüftungskanälen siehst | Dämmung mit Dampfbremse prüfen: Die Kanaloberfläche muss wärmer bleiben als der Taupunkt der Raumluft |
| nach „Feuchte-Sollwert" für IBN suchst  | EN 16798-1: Kat. II befeuchten bis 25 %, entfeuchten ab 60 %                                          |
| Mischluft-Anteile optimieren willst     | h-x-Diagramm verwenden, Enthalpie der Aussen-/Abluft vergleichen                                      |

<!-- EN -->

# Air Humidity — Fundamentals for BA

Humidity is a central parameter for both comfort and building physics. Too dry and you get irritated mucous membranes and static problems; too humid and you get mould and condensation. Building automation controls humidity indirectly (through humidification, dehumidification and heat recovery), and to do that you need a handful of terms and the psychrometric chart.

## The Three Terms for "Humidity"

| Quantity              | Symbol | Unit | What it means                                                                                      |
| --------------------- | ------ | ---- | -------------------------------------------------------------------------------------------------- |
| **Relative humidity** | φ, RH  | %    | Share of the current water vapour content in the **saturation content at the current temperature** |
| **Absolute humidity** | ρ_w    | g/m³ | Mass of water vapour per cubic metre of moist air                                                  |
| **Specific humidity** | x      | g/kg | Mass of water vapour per kilogram of **dry** air — the **HVAC standard**                           |

**Why x in HVAC?** When air is heated it expands, so ρ_w (g/m³) changes even though no water is added or removed. x, by contrast, stays constant as long as you neither humidify nor dehumidify. That makes x the **conserved quantity** under a pure temperature change — and therefore the natural parameter of the psychrometric chart.

## Saturation — Why "Relative" Humidity Is Relative

Warm air can hold more water than cold air. At 0 °C saturation is around 3.8 g/kg, at 20 °C about 14.7 g/kg, at 30 °C about 27 g/kg. RH relates the current water content to this **temperature-dependent maximum**:

<p class="formel">φ = p<sub>v</sub> / p<sub>s</sub>(T) · 100 % ≈ x / x<sub>s</sub>(T) · 100 %</p>

p_v is the partial pressure of the water vapour, p_s the saturation pressure at the current temperature. The ratio of the x values is a good approximation.

**Consequence:** if you **heat** the same air (same x value), RH falls. If you **cool** it, RH rises — until the **dew point** is reached, RH = 100 % and condensation begins.

### The Classic Winter Example

| Point                                     | T      | RH     | x          |
| ----------------------------------------- | ------ | ------ | ---------- |
| Outdoors                                  | −5 °C  | 80 %   | ≈ 2.0 g/kg |
| Indoors after heating (no humidification) | +22 °C | ≈ 12 % | ≈ 2.0 g/kg |
| Indoors with comfort humidification       | +22 °C | 40 %   | ≈ 6.6 g/kg |

In winter, indoor air without humidification is **always dry** — no matter how "humid" the outdoor air feels. A day at 80 % RH and −5 °C outside is physically the same air as 12 % RH at 22 °C indoors.

## The Psychrometric Chart (Mollier h-x)

In German-speaking countries the Mollier h-x chart is standard:

- **horizontal:** moisture content x in g/kg dry air
- **vertical:** temperature. The isotherms rise slightly to the right.
- **slanting down to the right:** lines of constant enthalpy h in kJ/kg
- **curving up to the right:** lines of constant relative humidity, bounded at the lower right by the saturation line φ = 100 %

The English-speaking world uses the **Carrier chart** (psychrometric chart). It is the same chart, mirrored and rotated: temperature horizontal, moisture content vertical.

### Typical Operations as Arrows

| HVAC process                                 | Mollier (h-x)                                             | Carrier                   |
| -------------------------------------------- | --------------------------------------------------------- | ------------------------- |
| **Heating** (sensible)                       | straight up, x constant, RH falls                         | straight to the right     |
| **Cooling without condensation**             | straight down, x constant, RH rises                       | straight to the left      |
| **Cooling with condensation**                | down to saturation, then x decreases                      | left, then down           |
| **Adiabatic humidification** (spray, washer) | along h = constant, down to the right                     | diagonally up to the left |
| **Steam humidification**                     | almost horizontally right, T barely rises                 | almost vertically up      |
| **Mixing two air streams**                   | on the line joining the two points, weighted by mass flow |
| **Sensible heat recovery**                   | temperature shift only — x stays put                      |
| **Enthalpy heat recovery** (rotary wheel)    | both T and x are exchanged between supply and extract air |

> The **[psychrometry calculator](/rechner/psychrometrie)** has an interactive chart built in. Enter T + RH (or x, dew point, h) and you see your operating point live in the Carrier chart, together with the RH curves (20/40/60/80/100 %) and the dew point marker on the saturation line.

## Comfort Range

**EN 16798-1** gives design values for systems that humidify or dehumidify:

| Category | Humidify up to | Dehumidify from |
| -------- | -------------- | --------------- |
| I        | 30 %           | 50 %            |
| II       | 25 %           | 60 %            |
| III      | 20 %           | 70 %            |

Per **EN ISO 7730**, office temperature is 20–24 °C in winter and 23–26 °C in summer.

In Switzerland, **SIA 382/1** says to humidify only where the use requires it. Short periods of low humidity in winter are considered acceptable. At the upper end the standard mainly limits the moisture content to avoid mugginess.

| RH          | Assessment                                                                      |
| ----------- | ------------------------------------------------------------------------------- |
| < 20 %      | Very dry — mucous membranes, burning eyes, static electricity, timber shrinkage |
| 20–30 %     | Dry — typical for winter without humidification, already unpleasant for many    |
| **30–55 %** | **Comfort** — the standard target in comfort ventilation                        |
| 55–65 %     | Noticeably humid, still acceptable; muggy at higher temperatures                |
| > 60 %      | Dust mites multiply; mould risk rises on cold building elements                 |
| > 70 %      | Cold corners and window reveals soon become too damp at the surface             |

For mould, the humidity **at the surface** counts, not in the room. Mould grows at around 80 % surface humidity over several days. A wall 5 K colder than the room air reaches that at only about 55 % in the room.

## Too Dry — Consequences and Measures

**Symptoms:**

- Burning eyes, dry throat, according to several studies more respiratory infections in very dry air
- Static charge (sparks at door handles, problems in electronics rooms)
- Parquet and furniture cracking, the classic detuning of pianos and violins
- More dust in suspension — small particles stay airborne longer

**Measures on the BA side:**

- **Steam humidifier** central in the AHU (controlled and hygienic, but energy-intensive)
- **Adiabatic humidifier** (high-pressure spray, evaporative) — lower energy, but subject to the hygiene requirements of **VDI 6022**
- **Heat recovery with an enthalpy exchanger** (rotary wheel with hygroscopic coating) — returns moisture from the extract air to the supply air, often the cheapest "humidification" there is

Detail articles: [Humidifiers](/wissen/befeuchter), [Heat Recovery](/wissen/waermerueckgewinnung).

## Too Humid — Consequences and Measures

**Symptoms:**

- Mould in cold wall corners, behind furniture, in window reveals
- Dust mites (multiply from around 60 % RH) — allergies
- Material damage: peeling wallpaper, soaked insulation, corrosion on steel beams
- A muggy feeling in summer from as little as 60 % RH at 26 °C

**Measures on the BA side:**

- **Cooling with dehumidification** — cool the supply air below dew point, let it condense, then reheat
- **Desiccant dehumidifier** (silica gel or lithium chloride wheel) — can dehumidify further than cooling does, at a higher energy cost
- **Ventilating with cooler, drier outdoor air** (usually unproblematic in winter, in summer only effective at night → see [Night Purge Cooling](/wissen/nachtauskuehlung))

## What BA Typically Measures and Controls

| Measured quantity                   | Where                                | What for                                         |
| ----------------------------------- | ------------------------------------ | ------------------------------------------------ |
| **Relative humidity**               | room, supply and extract air         | comfort control, humidifier control              |
| **Dew point**                       | outdoor air, critical building parts | condensation protection, chilled-surface control |
| **Enthalpy** (computed from T + RH) | AHU energy balance                   | energy metric, optimum mixed-air ratio           |

Sensor selection and installation: see [Humidity Sensors](/wissen/feuchtesensoren).

## Pitfalls in Practice

- **Sensor next to a radiator** → measures locally dry air, not the room average
- **Sensor in the ceiling** → warm layer, different RH from the occupied zone
- **RH drift** over time — capacitive sensors need a comparison measurement every two to three years
- **Humidifier without hygiene maintenance** → legionella risk with spray atomisers (VDI 6022, SWKI VA104-01)
- **Controlling comfort by RH alone** — comfort also depends on temperature, radiation and air velocity (see the PMV/PPD comfort model in EN ISO 7730, [Thermal Comfort](/wissen/thermische-behaglichkeit))

## Related

- **[Humidifiers](/wissen/befeuchter)** — types, control, hygiene
- **[Humidity Sensors](/wissen/feuchtesensoren)** — measurement, capacitive principle, installation
- **[Dew Point](/wissen/taupunkt)** — dew point calculator, condensation on building elements
- **[Heat Recovery](/wissen/waermerueckgewinnung)** — sensible vs enthalpy
- **[Indoor Air Quality](/wissen/raumluftqualitaet)** — IDA categories, EN 16798
- **[Psychrometry Calculator](/rechner/psychrometrie)** — h-x points interactively

## Summary

| If you …                                              | You need …                                                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| have < 30 % RH indoors in winter                      | a humidifier (steam or adiabatic) or enthalpy heat recovery                                                    |
| have > 60 % RH and mugginess in summer                | dehumidification via cooling coil or a desiccant dehumidifier                                                  |
| see condensation on ventilation ducts                 | check the insulation with vapour barrier: the duct surface must stay warmer than the dew point of the room air |
| are looking for a humidity setpoint for commissioning | EN 16798-1: cat. II humidify up to 25 %, dehumidify from 60 %                                                  |
| want to optimise the mixed-air ratio                  | use the psychrometric chart, compare the enthalpy of outdoor and extract air                                   |
