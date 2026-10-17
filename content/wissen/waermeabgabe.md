---
title: Wärmeabgabesysteme — Heizkörper, Konvektoren, Flächen- und Deckenheizung
title_en: Heat Emitters — Radiators, Convectors, Surface and Ceiling Heating
slug: waermeabgabe
category: heizung
subcategory: waermeabgabe
tags:
  [
    heizkörper,
    radiator,
    konvektor,
    fussbodenheizung,
    deckenheizung,
    deckenstrahlplatten,
    deckensegel,
    wandheizung,
    normleistung,
    heizkörperexponent,
    übertemperatur,
    strahlung,
    konvektion
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [fussbodenheizung, tabs, heizkurve, heizung-grundlagen, hydraulischer-abgleich, klimasysteme]
norm: [EN 442, EN 1264, EN ISO 11855]
updated: 2026-10-17
lang: de
---

# Wärmeabgabesysteme — Heizkörper, Konvektoren, Flächen- und Deckenheizung

Das Wärmeabgabesystem bringt die Wärme vom Heizwasser in den Raum. Wie es das tut, über **Strahlung** oder **Konvektion**, und mit welcher **Vorlauftemperatur**, bestimmt den Komfort, die Wahl des Erzeugers und die Regelung.

## Überblick

| System                      | Wärmeabgabe                      | Vorlauf typisch                  | Reaktion     | Passt zu                                             |
| --------------------------- | -------------------------------- | -------------------------------- | ------------ | ---------------------------------------------------- |
| **Flachheizkörper**         | viel Strahlung, etwas Konvektion | Altbau 60–70 °C, Neubau 35–50 °C | schnell      | allen Erzeugern, Sanierung                           |
| **Gliederheizkörper**       | mehr Konvektion                  | wie oben                         | schnell      | Bestand                                              |
| **Konvektor**               | fast nur Konvektion              | wie oben                         | sehr schnell | Glasfassaden, Unterflurkanäle                        |
| **Fussbodenheizung**        | überwiegend Strahlung            | 30–35 °C, höchstens etwa 35 °C   | träge        | Wärmepumpe, Brennwert                                |
| **Decken- und Wandheizung** | fast nur Strahlung               | niedrig                          | mittel       | Wärmepumpe, oft auch zum Kühlen                      |
| **Deckenstrahlplatten**     | Strahlung                        | höher, je nach Raumhöhe          | schnell      | Hallen, Werkstätten                                  |
| **TABS**                    | Strahlung, Speichermasse         | 24–28 °C                         | sehr träge   | Wärmepumpe, Free Cooling, siehe [TABS](/wissen/tabs) |

Je mehr Strahlung, desto behaglicher bei gleicher Lufttemperatur. Je tiefer der Vorlauf, desto besser arbeiten Wärmepumpe und Brennwertkessel.

## Heizkörper

### Normleistung und Umrechnung

Hersteller geben die Leistung nach **EN 442** bei **75/65/20 °C** an: Vorlauf 75 °C, Rücklauf 65 °C, Raum 20 °C. Bei anderen Temperaturen ändert sich die Leistung nicht proportional, sondern mit einem Exponenten:

<p class="formel">Φ = Φ<sub>N</sub> · (ΔT / ΔT<sub>N</sub>)<sup>n</sup>   mit   ΔT = (T<sub>V</sub> − T<sub>R</sub>) / ln((T<sub>V</sub> − T<sub>i</sub>) / (T<sub>R</sub> − T<sub>i</sub>))</p>

ΔT ist die logarithmische Übertemperatur des Heizkörpers über dem Raum, bei 75/65/20 rund 49.8 K. Der Exponent n liegt für Heizkörper bei etwa 1.3, für Konvektoren etwas höher, genau steht er im Datenblatt.

**Beispiel:** Derselbe Heizkörper bei 55/45/20 °C hat ΔT ≈ 29.7 K. Die Leistung sinkt auf (29.7 / 49.8)<sup>1.3</sup> ≈ 0.51, also auf rund die Hälfte. Wer bei einer Sanierung die Vorlauftemperatur für eine Wärmepumpe senken will, muss prüfen, ob die Heizkörper dann noch reichen. Oft reichen sie, weil sie früher grosszügig ausgelegt und die Gebäude seither gedämmt wurden.

Dieser Exponent ist auch der Grund, warum die [Heizkurve](/wissen/heizkurve) gekrümmt ist.

### Was die Leistung noch beeinflusst

- **Höhenlage:** Die Normleistung gilt auf Meereshöhe. Höher oben ist die Luft dünner, der Konvektionsanteil sinkt.
- **Farbe und Beschichtung:** Gemessen wird mit normalem Lack. Metallische Beschichtungen strahlen deutlich weniger ab.
- **Verkleidung, Vorhänge, Möbel:** Sie behindern Luftströmung und Strahlung. Eine Verkleidung kann viel Leistung kosten.
- **Anschlussart:** Je nach Anschluss wird der Heizkörper nicht ganz durchströmt, es entstehen kalte Zonen.
- **Platzierung:** unter dem Fenster, wo es am kältesten ist. So wird der Kaltluftabfall am Fenster ausgeglichen.

### Regelung

Heizkörper reagieren schnell und eignen sich gut für Einzelraumregelung: thermostatische Ventile als P-Regler oder elektrische Antriebe mit Raumregler. Voraussetzung ist ein [hydraulischer Abgleich](/wissen/hydraulischer-abgleich), sonst bekommen nahe Heizkörper zu viel und entfernte zu wenig.

## Fussbodenheizung

Rohre im oder unter dem Estrich. **Nassverlegung** (Rohre im Estrich) ist günstiger und träger, **Trockenverlegung** (Rohre in einer Dämmplatte mit Wärmeleitblechen) ist flacher, reagiert schneller und wird oft bei Umbauten eingesetzt. Spiralförmige Verlegung ergibt gleichmässigere Oberflächentemperaturen als Mäander, weil Vor- und Rücklauf nebeneinander liegen.

Die Oberflächentemperatur ist begrenzt, in Aufenthaltszonen auf etwa 29 °C. Damit ist auch die Leistung begrenzt. Details in [Fussbodenheizung](/wissen/fussbodenheizung).

## Decken- und Wandheizung

Eine Deckenheizung strahlt fast nur. In niedrigen Räumen empfinden viele Menschen die Wärme von oben als unangenehm, als Faustregel ab etwa 3 m Raumhöhe.

| Bauart                   | Beschreibung                                                                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Geschlossene Decke**   | abgehängte Metall- oder Gipsdecke, Rohre auf der Oberseite. Metall ist revisionierbar, Gips fugenlos. Oft mit Akustik kombiniert, meist auch zum Kühlen.            |
| **Deckensegel**          | einzelne aktivierte Elemente statt der ganzen Decke                                                                                                                 |
| **Deckenstrahlplatten**  | Stahlblech mit Rohren, oben gedämmt, für hohe Hallen. Laut Siemens bis etwa 50 W/m². Braucht genug Vorlauftemperatur für den Strahlungsaustausch über grosse Höhen. |
| **Betonkernaktivierung** | Rohre in der Betondecke, siehe [TABS](/wissen/tabs)                                                                                                                 |

Wandheizungen arbeiten ähnlich, mit Rohren im Putz oder in Trockenbauplatten. Möbel vor der Wand behindern die Abgabe.

Die meisten Flächen- und Deckensysteme können auch **kühlen**. Dann gilt der Taupunkt als Grenze, siehe [Taupunkt](/wissen/taupunkt) und [Klimasysteme](/wissen/klimasysteme).

## Für die GA

- **Vorlauftemperatur** so tief wie möglich, nach Heizkurve. Flächenheizungen brauchen eine flache Kurve.
- **Begrenzung:** Fussboden- und Deckenheizungen brauchen eine Vorlauf-Maximalbegrenzung, als Schutz zusätzlich einen Sicherheitstemperaturwächter, der die Pumpe abschaltet.
- **Trägheit** berücksichtigen: Flächenheizungen nicht mit grossen Nachtabsenkungen fahren.
- **Einzelraumregelung** mit Stellantrieben am Verteiler oder an den Heizkörpern, siehe [Raumautomation](/wissen/raumautomation).

## Quellen

- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2026, Kap. 3.4.6
- EN 442: Radiatoren und Konvektoren
- EN 1264 bzw. EN ISO 11855: Raumflächenintegrierte Heiz- und Kühlsysteme

<!-- EN -->

The heat emitter system brings the heat from the heating water into the room. How it does so, by **radiation** or **convection**, and at which **flow temperature**, determines comfort, the choice of heat generator and control.

## Overview

| System                       | Heat release                    | Typical flow                         | Response  | Suits                                             |
| ---------------------------- | ------------------------------- | ------------------------------------ | --------- | ------------------------------------------------- |
| **Panel radiator**           | much radiation, some convection | old buildings 60–70 °C, new 35–50 °C | fast      | all generators, refurbishment                     |
| **Column radiator**          | more convection                 | as above                             | fast      | existing buildings                                |
| **Convector**                | almost only convection          | as above                             | very fast | glass façades, trench heaters                     |
| **Underfloor heating**       | mostly radiation                | 30–35 °C, at most about 35 °C        | slow      | heat pump, condensing boiler                      |
| **Ceiling and wall heating** | almost only radiation           | low                                  | medium    | heat pump, often also for cooling                 |
| **Radiant ceiling panels**   | radiation                       | higher, depending on room height     | fast      | halls, workshops                                  |
| **TABS**                     | radiation, thermal mass         | 24–28 °C                             | very slow | heat pump, free cooling, see [TABS](/wissen/tabs) |

The more radiation, the more comfortable at the same air temperature. The lower the flow temperature, the better heat pumps and condensing boilers work.

## Radiators

### Rated Output and Conversion

Manufacturers state the output per **EN 442** at **75/65/20 °C**: flow 75 °C, return 65 °C, room 20 °C. At other temperatures the output does not change proportionally but with an exponent:

<p class="formel">Φ = Φ<sub>N</sub> · (ΔT / ΔT<sub>N</sub>)<sup>n</sup>   with   ΔT = (T<sub>F</sub> − T<sub>R</sub>) / ln((T<sub>F</sub> − T<sub>i</sub>) / (T<sub>R</sub> − T<sub>i</sub>))</p>

ΔT is the logarithmic mean excess temperature of the radiator above the room, about 49.8 K at 75/65/20. The exponent n is about 1.3 for radiators, slightly higher for convectors; the exact value is in the data sheet.

**Example:** the same radiator at 55/45/20 °C has ΔT ≈ 29.7 K. Output drops to (29.7 / 49.8)<sup>1.3</sup> ≈ 0.51, i.e. to about half. Anyone lowering the flow temperature for a heat pump in a refurbishment must check whether the radiators are still sufficient. Often they are, because they were generously sized in the past and the buildings have since been insulated.

This exponent is also the reason why the [heating curve](/wissen/heizkurve) is curved.

### What Else Affects Output

- **Altitude:** rated output applies at sea level. Higher up the air is thinner and the convective share drops.
- **Colour and coating:** measured with normal paint. Metallic coatings radiate considerably less.
- **Covers, curtains, furniture:** they obstruct airflow and radiation. A cover can cost a lot of output.
- **Connection type:** depending on the connection, the radiator is not fully flowed through and cold zones arise.
- **Placement:** under the window, where it is coldest. This compensates the cold downdraught at the window.

### Control

Radiators react quickly and suit individual room control well: thermostatic valves as P controllers or electric actuators with a room controller. A prerequisite is [hydraulic balancing](/wissen/hydraulischer-abgleich); otherwise nearby radiators get too much and distant ones too little.

## Underfloor Heating

Pipes in or under the screed. **Wet installation** (pipes in the screed) is cheaper and slower; **dry installation** (pipes in an insulation board with heat-conducting plates) is thinner, reacts faster and is often used in refurbishments. Spiral layout gives more even surface temperatures than serpentine, because flow and return lie side by side.

The surface temperature is limited, in occupied zones to about 29 °C. That limits the output too. Details in [Underfloor Heating](/wissen/fussbodenheizung).

## Ceiling and Wall Heating

Ceiling heating radiates almost exclusively. In low rooms many people find heat from above unpleasant; as a rule of thumb from about 3 m room height.

| Type                         | Description                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Closed ceiling**           | suspended metal or plasterboard ceiling with pipes on top. Metal is accessible, plasterboard seamless. Often combined with acoustics, usually also for cooling.            |
| **Ceiling sails**            | individual activated elements instead of the whole ceiling                                                                                                                 |
| **Radiant ceiling panels**   | steel sheet with pipes, insulated on top, for high halls. According to Siemens up to about 50 W/m². Needs enough flow temperature for radiant exchange over large heights. |
| **Concrete core activation** | pipes in the concrete slab, see [TABS](/wissen/tabs)                                                                                                                       |

Wall heating works similarly, with pipes in plaster or drywall panels. Furniture in front of the wall obstructs heat release.

Most surface and ceiling systems can also **cool**. The dew point is then the limit, see [Dew Point](/wissen/taupunkt) and [Air-Conditioning Systems](/wissen/klimasysteme).

## For BA

- **Flow temperature** as low as possible, by heating curve. Surface heating needs a flat curve.
- **Limitation:** underfloor and ceiling heating need a flow maximum limit, and for protection additionally a safety temperature monitor that switches off the pump.
- Account for **inertia**: do not run surface heating with large night setbacks.
- **Individual room control** with actuators at the manifold or on the radiators, see [Room Automation](/wissen/raumautomation).

## Sources

- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2026, ch. 3.4.6
- EN 442: Radiators and convectors
- EN 1264 and EN ISO 11855: Water-based surface embedded heating and cooling systems
