---
title: Heizkurve / Witterungsführung
title_en: Heating Curve / Weather Compensation
slug: heizkurve
category: regelung
subcategory: heizung
tags:
  [
    heizkurve,
    witterungsführung,
    neigung,
    niveau,
    steilheit,
    aussentemperaturkompensation,
    vorlauftemperatur,
    parallelverschiebung,
    heizgrenze,
    optimierung,
    schnellaufheizung,
    gedämpfte aussentemperatur,
    raumeinfluss,
    frostschutz
  ]
difficulty: grundlagen
area: [hlk]
related:
  [
    pid-regler,
    ventil-schaltungen,
    fussbodenheizung,
    heizung-grundlagen,
    gradtage,
    kesselregelung,
    kaskadenregelung,
    mpc-ga
  ]

norm: [SIA 384.201, SIA 384/1]
updated: 2026-10-17
lang: de
---

# Heizkurve / Witterungsführung

Die **Heizkurve** (auch Heizkennlinie) bestimmt die **Vorlauftemperatur** aus der **Aussentemperatur**. Eine witterungsgeführte Vorlaufregelung ist eigentlich zweierlei: Der Vorlauf wird **geregelt**, schnell und mit Fühler. Die Raumtemperatur wird nur **gesteuert**, über die Annahme, dass zu jeder Aussentemperatur ein bestimmter Vorlauf passt. Sonne, Personen und Geräte im Raum sieht die Heizkurve nicht. Das übernehmen Thermostatventile oder Einzelraumregler.

> ⚙️ **Tool:** Im [Heizkurven-Rechner](/rechner/heizkurve) lässt sich die Kurve grafisch verstellen, mit den Kurvenformen verschiedener Hersteller.

## Prinzip

Je kälter es draussen ist, desto wärmer muss der Vorlauf sein. Die Kurve ist **gekrümmt**: Die Wärmeverluste des Gebäudes steigen linear mit der Temperaturdifferenz, die Heizkörperleistung aber überproportional mit ihrer Übertemperatur. Bei tiefer Aussentemperatur braucht es deshalb pro Kelvin Abkühlung etwas weniger zusätzlichen Vorlauf, die Kurve wird flacher.

<p class="formel">T<sub>V</sub> ≈ T<sub>R</sub> + s · 20 K · ((T<sub>R</sub> − T<sub>A</sub>) / 20 K)<sup>1/n</sup> + Niveau</p>

- **Heizkörper:** Exponent n ≈ 1.3, deutlich gekrümmt
- **Fussbodenheizung:** n ≈ 1.1, fast gerade

Die Formel ist eine Näherung. Jeder Hersteller hat seine eigene Kurvenform, siehe Hinweis im Rechner.

## Parameter

### Steilheit (Neigung)

Weil die Kurve gekrümmt ist, hat sie an jedem Punkt eine andere Steigung. Siemens definiert die Steilheit deshalb über einen festen Bereich: **Um wie viele Kelvin steigt der Vorlauf, wenn die Aussentemperatur um 20 K sinkt**, von +20 auf 0 °C. Steilheit 1.5 heisst: Bei 0 °C aussen liegt der Vorlauf 30 K über der Raumtemperatur.

| Hersteller           | Parameter | Typischer Bereich |
| -------------------- | --------- | ----------------- |
| Siemens              | Steilheit | 0.25 – 4.0        |
| Viessmann Vitotronic | Neigung   | 0.2 – 3.5         |
| Buderus / Bosch      | Steilheit | 0.2 – 4.0         |
| Honeywell / Resideo  | 2 Punkte  | —                 |
| Sauter               | Neigung   | 0.2 – 4.0         |

Die Zahlen verschiedener Hersteller sind nicht direkt vergleichbar, weil jeder die Steilheit etwas anders definiert.

Faustwerte:

- **Fussbodenheizung:** 0.4 – 0.8
- **Heizkörper, Niedertemperatur (50/40):** 1.0 – 1.4
- **Heizkörper, Standard (70/50):** 1.6 – 2.2
- **Altbau, schlecht gedämmt:** 2.0 – 3.0

### Niveau / Parallelverschiebung

Verschiebt die ganze Kurve nach oben oder unten. Wird der **Raumsollwert** verstellt, verschiebt der Regler die Kurve ebenfalls parallel, und zwar stärker als die Sollwertänderung:

<p class="formel">ΔT<sub>V</sub> = ΔT<sub>R</sub> · (1 + s)</p>

**Beispiel:** Steilheit 1.7, Nachtabsenkung 5 K: Der Vorlauf sinkt um 5 × 2.7 = 13.5 K. Das «1 +» kommt daher, dass sich der Raumsollwert und die Übertemperatur der Heizkörper gemeinsam ändern.

Faustregeln:

- «Es ist mir überall etwas zu kalt» → Niveau oder Raumsollwert +1 K, nicht die Steilheit
- «Bei Frost zu kalt, bei mildem Wetter gut» → Steilheit erhöhen
- «Bei mildem Wetter zu warm, bei Frost gut» → Steilheit senken, eventuell Niveau anheben

### Heizgrenze

Aussentemperatur, über der nicht mehr geheizt wird. Üblich:

- Neubau / Minergie: 12 – 14 °C
- Standard: 15 – 17 °C
- Altbau: 18 – 20 °C

Mehr zur Schaltlogik unten bei der Heizgrenzen-Automatik.

## Einstellhilfe

1. Raumeinfluss und Optimierungen vorübergehend aus, nur die Heizkurve wirkt
2. Bei kaltem Wetter (unter 0 °C) prüfen, ob die Räume den Sollwert erreichen
3. Bei mildem Wetter (5 – 10 °C) dasselbe prüfen
4. Stimmen beide Bereiche, sind aber gleich viel zu warm oder zu kalt → **Niveau**
5. Stimmt nur ein Bereich → **Steilheit**

> 💡 Immer nur **einen** Parameter verstellen und mindestens einen Tag warten. Das Gebäude reagiert träge.

## Welche Aussentemperatur?

Ein Gebäude folgt der Aussentemperatur gedämpft und verzögert. Gute Regler rechnen deshalb mit mehreren Aussentemperaturen:

| Wert          | Berechnung                                              | Wofür                                        |
| ------------- | ------------------------------------------------------- | -------------------------------------------- |
| **Aktuell**   | Messwert des Aussenfühlers                              | schnelle Reaktion                            |
| **Gefiltert** | einmal mit der Gebäudezeitkonstante geglättet           | wie das Gebäude die Aussentemperatur «spürt» |
| **Gemischt**  | Mittel aus aktueller und gefilterter, oft je zur Hälfte | Heizkurve, Tages-Heizgrenze                  |
| **Gedämpft**  | zweimal mit der Gebäudezeitkonstante geglättet          | Sommer/Winter-Umschaltung, Kesselfreigabe    |

Richtwerte für die **Gebäudezeitkonstante** laut Siemens-Unterlage: leichte Bauweise etwa 10 h, mittlere etwa 25 h, schwere etwa 50 h. Je nach Regler werden auch andere Werte vorgeschlagen, die Einstellung erfolgt am Objekt.

**Wohin mit dem Aussenfühler?** An die Nord- oder Nordwestfassade, geschützt vor Sonne, nicht über Fenstern, Lüftungsauslässen oder Kaminen. Ein besonnter Fühler meldet zu warm, und die Heizung liefert zu wenig.

## Zusatzfunktionen

### Raumeinfluss

Ein Raumfühler im **Referenzraum** verschiebt die Heizkurve, wenn der Raum vom Sollwert abweicht. Damit das wirkt, muss der Einfluss recht stark eingestellt sein. Das hat einen Haken: Sonne und Personen wirken nicht in allen Räumen gleich. Scheint die Sonne in den Referenzraum, werden alle anderen Räume kühler. Der Referenzraum braucht deshalb **keine** Thermostatventile und sollte repräsentativ sein, meist der Raum mit dem grössten Wärmebedarf.

### Raum-Vorlauf-Kaskade

Statt einer Heizkurve gibt ein **Raumregler** dem Vorlaufregler den Sollwert vor: z.B. 1 K zu kalt im Raum ergibt 20 K mehr Vorlauf. Das ist eine [Kaskadenregelung](/wissen/kaskadenregelung) mit träger Raum- und schneller Vorlaufstrecke. Sie regelt auch Störungen im Raum aus, braucht aber einen guten Referenzraum.

### Heizgrenzen-Automatik

- **Sommer/Winter-Umschaltung:** schaltet die Heizung anhand der **gedämpften** Aussentemperatur ab oder ein, z.B. bei 17 °C. So springt die Heizung nicht an, nur weil es einen Tag lang kühl ist.
- **Tages-Heizgrenze:** schaltet im Heizbetrieb aus, sobald die aktuelle **oder** die gemischte Aussentemperatur über die Grenze steigt, und wieder ein, wenn beide darunter liegen. Für Tag und Nacht getrennt einstellbar. Aus heisst: Pumpe aus, Ventil zu.

### Ein- und Ausschaltoptimierung

Der Regler berechnet aus Aussentemperatur, Raumtemperatur und Gebäudeträgheit, **wann** er aufheizen muss, damit der Sollwert zu Nutzungsbeginn erreicht ist, und wie früh er vor Nutzungsende abschalten darf. Typische Toleranzen: Zu Beginn 0.5 K unter Soll ist erreicht, zum Ende darf es 1 K unter Soll fallen. Jede Stunde, die die Heizung später startet oder früher ausgeht, spart Energie.

### Schnellabsenkung und Schnellaufheizung

- **Schnellabsenkung:** Nach dem Umschalten auf Nachtbetrieb bleibt die Heizung ganz aus, bis der Nachtsollwert erreicht ist. Ohne Raumfühler schätzt der Regler die Dauer aus den Gebäudedaten.
- **Schnellaufheizung:** Am Morgen wird der Vorlauf kurzzeitig über die Heizkurve angehoben, je nach Dauer und Tiefe der Absenkung, meist begrenzt auf etwa zwei Stunden.

Bei **Wärmepumpen** ist das oft kontraproduktiv: Die hohe Vorlauftemperatur der Schnellaufheizung verschlechtert den COP. Bei tiefen Aussentemperaturen lieber auf die Absenkung verzichten.

### Adaptive Heizkurve

Der Regler vergleicht täglich Raumtemperatur, Aussentemperatur und Vorlauf und korrigiert die Kurve in kleinen Schritten, bis sie über den ganzen Aussentemperaturbereich passt. Offene Fenster und Fremdwärme werden über Grenzen in der Korrektur ausgeblendet. Voraussetzung ist ein Raumfühler.

### Prädiktive Regelung

Ein Gebäudemodell und eine Prognose der Aussentemperatur ersetzen Heizkurve, Heizgrenze und Optimierung durch eine einzige Funktion. Bei Siemens rechnet sie alle 15 Minuten den optimalen Vorlaufverlauf für die nächsten 64 Stunden, damit auch ein Wochenende hineinpasst. Mehr dazu in [Modellprädiktive Regelung](/wissen/mpc-ga).

### Frostschutz

- **Anlagenfrostschutz**, meist zweistufig: Fällt die Aussentemperatur unter etwa +1 °C, läuft die Pumpe in Intervallen und der Vorlauf wird auf einem Minimum gehalten. Unter etwa −5 °C läuft die Pumpe dauernd. Ohne Aussenfühler übernimmt der Vorlauffühler mit eigenen Grenzen.
- **Gebäudefrostschutz:** Auch im Ferienbetrieb wird geheizt, sobald ein Raum unter etwa 5 °C fällt. Ohne Raumfühler entscheidet die gedämpfte Aussentemperatur.

## Norm-Aussentemperatur

Standortabhängig: Klimadaten nach SIA 2028, Heizlast nach SIA 384.201. Im Schweizer Mittelland etwa −7 bis −10 °C, in den Alpen deutlich tiefer. Richtwerte, die verbindlichen Werte stehen in SIA 2028:

| Ort    | Norm-Aussentemperatur |
| ------ | --------------------- |
| Zürich | −8 °C                 |
| Bern   | −10 °C                |
| Basel  | −7 °C                 |
| Chur   | −13 °C                |
| Davos  | −19 °C                |
| Lugano | −5 °C                 |

## Sonderfälle

- **Wärmepumpe:** Vorlauf so tief wie möglich, jedes Kelvin verbessert den COP. Heizkurve flach, keine Schnellaufheizung.
- **Brennwertkessel:** Der Rücklauf muss unter dem Taupunkt des Abgases liegen, bei Gas unter rund 50 °C. Flache Kurve.
- **Fernwärme:** Maximaler Vorlauf und Rücklauf gibt oft der Versorger vor, siehe [Fernwärme](/wissen/fernwaerme).
- **TABS:** Heiz- und Kühlkurve nach dem 24-Stunden-Mittel der Aussentemperatur, siehe [TABS](/wissen/tabs).

## Quellen

- Siemens Schweiz AG: «Regeln und Steuern von Heizungsanlagen», Schulungsunterlage BT_0094, 2023, Kap. 3
- SIA 384/1: Heizungsanlagen in Gebäuden

<!-- EN -->

The **heating curve** determines the **flow temperature** from the **outdoor temperature**. Weather-compensated flow control is really two things: the flow is **controlled**, quickly and with a sensor. The room temperature is only **open-loop controlled**, on the assumption that a certain flow temperature suits each outdoor temperature. The heating curve does not see sun, people or equipment in the room. Thermostatic valves or individual room controllers take care of that.

> ⚙️ **Tool:** In the [Heating Curve Calculator](/rechner/heizkurve) you can adjust the curve graphically, with the curve shapes of several manufacturers.

## Principle

The colder it is outside, the warmer the flow must be. The curve is **curved**: the building's heat losses rise linearly with the temperature difference, but radiator output rises more than proportionally with its excess temperature. At low outdoor temperatures less additional flow temperature is therefore needed per kelvin of cooling; the curve becomes flatter.

<p class="formel">T<sub>F</sub> ≈ T<sub>R</sub> + s · 20 K · ((T<sub>R</sub> − T<sub>O</sub>) / 20 K)<sup>1/n</sup> + level</p>

- **Radiators:** exponent n ≈ 1.3, clearly curved
- **Underfloor heating:** n ≈ 1.1, almost straight

The formula is an approximation. Each manufacturer has its own curve shape, see the note in the calculator.

## Parameters

### Slope

Because the curve is curved, its gradient differs at every point. Siemens therefore defines the slope over a fixed range: **by how many kelvin the flow temperature rises when the outdoor temperature drops by 20 K**, from +20 to 0 °C. Slope 1.5 means: at 0 °C outdoors the flow is 30 K above room temperature.

| Manufacturer         | Parameter | Typical range |
| -------------------- | --------- | ------------- |
| Siemens              | Slope     | 0.25 – 4.0    |
| Viessmann Vitotronic | Slope     | 0.2 – 3.5     |
| Buderus / Bosch      | Steepness | 0.2 – 4.0     |
| Honeywell / Resideo  | 2 points  | —             |
| Sauter               | Slope     | 0.2 – 4.0     |

Figures from different manufacturers are not directly comparable, because each defines the slope slightly differently.

Rules of thumb:

- **Underfloor heating:** 0.4 – 0.8
- **Radiators, low temperature (50/40):** 1.0 – 1.4
- **Radiators, standard (70/50):** 1.6 – 2.2
- **Old building, poorly insulated:** 2.0 – 3.0

### Level / Parallel Shift

Moves the whole curve up or down. When the **room setpoint** is changed, the controller also shifts the curve in parallel, by more than the setpoint change:

<p class="formel">ΔT<sub>F</sub> = ΔT<sub>R</sub> · (1 + s)</p>

**Example:** slope 1.7, night setback 5 K: the flow drops by 5 × 2.7 = 13.5 K. The "1 +" is there because the room setpoint and the radiators' excess temperature change together.

Rules of thumb:

- "It is a little too cold everywhere" → level or room setpoint +1 K, not the slope
- "Too cold in frost, fine in mild weather" → increase the slope
- "Too warm in mild weather, fine in frost" → reduce the slope, possibly raise the level

### Heating Limit

Outdoor temperature above which there is no more heating. Typical:

- New build / Minergie: 12 – 14 °C
- Standard: 15 – 17 °C
- Old building: 18 – 20 °C

More on the switching logic below under automatic heating limit.

## Adjustment Guide

1. Temporarily switch off room influence and optimisations; only the heating curve acts
2. In cold weather (below 0 °C) check whether the rooms reach the setpoint
3. Check the same in mild weather (5 – 10 °C)
4. If both ranges are right but equally too warm or too cold → **level**
5. If only one range is right → **slope**

> 💡 Change only **one** parameter at a time and wait at least a day. The building reacts slowly.

## Which Outdoor Temperature?

A building follows the outdoor temperature damped and delayed. Good controllers therefore work with several outdoor temperatures:

| Value          | Calculation                                      | Used for                                         |
| -------------- | ------------------------------------------------ | ------------------------------------------------ |
| **Actual**     | Outdoor sensor reading                           | fast reaction                                    |
| **Filtered**   | smoothed once with the building time constant    | how the building "feels" the outdoor temperature |
| **Composite**  | mean of actual and filtered, often half and half | heating curve, daily heating limit               |
| **Attenuated** | smoothed twice with the building time constant   | summer/winter changeover, boiler enable          |

Guide values for the **building time constant** according to the Siemens document: light construction about 10 h, medium about 25 h, heavy about 50 h. Depending on the controller other values are suggested; it is set on site.

**Where to put the outdoor sensor?** On the north or north-west façade, protected from sun, not above windows, ventilation outlets or chimneys. A sunlit sensor reads too warm, and the heating supplies too little.

## Additional Functions

### Room Influence

A room sensor in the **reference room** shifts the heating curve when the room deviates from the setpoint. For this to work, the influence must be set fairly strong. There is a catch: sun and people do not act equally in all rooms. If the sun shines into the reference room, all other rooms become cooler. The reference room therefore needs **no** thermostatic valves and should be representative, usually the room with the largest heat demand.

### Room-Flow Cascade

Instead of a heating curve, a **room controller** sets the flow controller's setpoint: e.g. 1 K too cold in the room gives 20 K more flow temperature. This is [cascade control](/wissen/kaskadenregelung) with a slow room and a fast flow loop. It also corrects disturbances in the room, but needs a good reference room.

### Automatic Heating Limit

- **Summer/winter changeover:** switches the heating off or on based on the **attenuated** outdoor temperature, e.g. at 17 °C. The heating thus does not start just because it is cool for one day.
- **Daily heating limit:** in heating mode it switches off as soon as the actual **or** the composite outdoor temperature rises above the limit, and on again when both are below. Separately adjustable for day and night. Off means: pump off, valve closed.

### Optimum Start/Stop

The controller calculates from outdoor temperature, room temperature and building inertia **when** it must start heating so the setpoint is reached at the start of occupancy, and how early before the end of occupancy it may switch off. Typical tolerances: at the start, 0.5 K below setpoint counts as reached; at the end it may drop 1 K below setpoint. Every hour the heating starts later or stops earlier saves energy.

### Quick Setback and Boost Heating

- **Quick setback:** after switching to night mode the heating stays completely off until the night setpoint is reached. Without a room sensor the controller estimates the duration from the building data.
- **Boost heating:** in the morning the flow temperature is raised briefly above the heating curve, depending on the duration and depth of the setback, usually limited to about two hours.

With **heat pumps** this is often counterproductive: the high flow temperature of boost heating worsens the COP. At low outdoor temperatures it is better to do without setback.

### Adaptive Heating Curve

The controller compares room temperature, outdoor temperature and flow daily and corrects the curve in small steps until it fits over the whole outdoor temperature range. Open windows and internal gains are filtered out by limits on the correction. A room sensor is required.

### Predictive Control

A building model and an outdoor temperature forecast replace heating curve, heating limit and optimisation with a single function. At Siemens it calculates the optimal flow profile for the next 64 hours every 15 minutes, so that a weekend fits in. More in [Model Predictive Control](/wissen/mpc-ga).

### Frost Protection

- **Plant frost protection**, usually two-stage: if the outdoor temperature drops below about +1 °C, the pump runs intermittently and the flow is held at a minimum. Below about −5 °C the pump runs continuously. Without an outdoor sensor the flow sensor takes over with its own limits.
- **Building frost protection:** even in holiday mode heating starts as soon as a room drops below about 5 °C. Without a room sensor the attenuated outdoor temperature decides.

## Design Outdoor Temperature

Site-dependent: climate data per SIA 2028, heating load per SIA 384.201. On the Swiss Plateau about −7 to −10 °C, considerably lower in the Alps. Guide values; the binding values are in SIA 2028:

| Location | Design outdoor temperature |
| -------- | -------------------------- |
| Zurich   | −8 °C                      |
| Bern     | −10 °C                     |
| Basel    | −7 °C                      |
| Chur     | −13 °C                     |
| Davos    | −19 °C                     |
| Lugano   | −5 °C                      |

## Special Cases

- **Heat pump:** flow as low as possible; every kelvin improves the COP. Flat heating curve, no boost heating.
- **Condensing boiler:** the return must be below the flue gas dew point, for gas below about 50 °C. Flat curve.
- **District heating:** maximum flow and return temperatures are often set by the supplier, see [District Heating](/wissen/fernwaerme).
- **TABS:** heating and cooling curve based on the 24-hour mean outdoor temperature, see [TABS](/wissen/tabs).

## Sources

- Siemens Schweiz AG: "Regeln und Steuern von Heizungsanlagen", training document BT_0094, 2023, ch. 3
- SIA 384/1: Heating systems in buildings
