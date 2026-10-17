---
title: Fussbodenheizung — Aufbau, Regelung und Trägheit
title_en: Underfloor Heating — Construction, Control and Thermal Lag
slug: fussbodenheizung
category: heizung
subcategory: heizsysteme
tags:
  [
    fussbodenheizung,
    fbh,
    flächenheizung,
    trägheit,
    vorlauftemperatur,
    niedrigtemperatur,
    regelkreis,
    verteiler,
    estrich,
    hydraulischer-abgleich,
    wärmepumpe,
    raumfühler,
    auskühlzeit
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    hydraulische-schaltungen,
    hydraulischer-abgleich,
    waermepumpe,
    pid-regler,
    pufferspeicher,
    tabs,
    waermeabgabe
  ]
norm: [EN 1264, ISO 11855, SIA 384/1]
updated: 2026-10-14
lang: de
---

# Fussbodenheizung — Aufbau, Regelung und Trägheit

Bei der Fussbodenheizung ist der ganze Boden der Heizkörper. Sie heizt mit tiefen Vorlauftemperaturen und ist deshalb ideal für Wärmepumpen. Der Estrich, der das möglich macht, macht sie aber auch träge, und das bestimmt die Regelung.

## Aufbau

Von oben nach unten:

| Schicht          | Typisch                                                          |
| ---------------- | ---------------------------------------------------------------- |
| Bodenbelag       | Platten, Parkett, Vinyl. Je dünner und leitfähiger, desto besser |
| **Estrich**      | 45–80 mm Zement- oder Calciumsulfatestrich, die Speichermasse    |
| **Heizrohr**     | PE-X oder Mehrschichtverbund, 14–20 mm, Verlegeabstand 10–30 cm  |
| Dämmung          | Wärme- und Trittschalldämmung, damit die Wärme nach oben geht    |
| Tragkonstruktion | Betondecke, Bodenplatte                                          |

| Variante          | Aufbauhöhe  | Trägheit | Einsatz                        |
| ----------------- | ----------- | -------- | ------------------------------ |
| Nassestrich       | 65–100 mm   | hoch     | Neubau, Standard               |
| Trockenestrich    | 30–50 mm    | mittel   | Sanierung, Holzbau             |
| Dünnschichtsystem | unter 30 mm | gering   | Sanierung mit wenig Aufbauhöhe |

## Tiefe Vorlauftemperatur

| System                       | Vorlauf      | Spreizung |
| ---------------------------- | ------------ | --------- |
| Heizkörper, Bestand          | 60–75 °C     | 10–20 K   |
| Heizkörper, Niedertemperatur | 45–55 °C     | 10 K      |
| **Fussbodenheizung**         | **28–40 °C** | 5–8 K     |

Die Vorlauftemperatur ist durch die **Oberflächentemperatur** begrenzt. Nach EN 1264 gelten als Höchstwerte **29 °C** in der Aufenthaltszone, **35 °C** in der Randzone und **33 °C** in Bädern. Darüber wird es unangenehm an den Füssen.

Je tiefer der Vorlauf, desto besser der COP einer [Wärmepumpe](/wissen/waermepumpe). Fussbodenheizung und Wärmepumpe passen deshalb gut zusammen.

## Trägheit

Ein 6.5 cm dicker Zementestrich wiegt rund 130 kg pro m². Mit einer Wärmekapazität von etwa 1.0 kJ/(kg·K) speichert er bei 10 K Temperaturhub rund 1300 kJ, also **0.36 kWh pro m²**. Bei einer Heizlast von 20 W/m² reicht das rechnerisch für viele Stunden.

Die Folgen für die Regelung:

1. **Langsame Reaktion:** Der Raum spürt eine Änderung am Ventil erst nach Stunden.
2. **Überschwingen:** Ein zu scharf eingestellter Raumregler schwingt mit grosser Amplitude.
3. **Nachtabsenkung bringt wenig:** Der Estrich gibt nachts weiter Wärme ab, und am Morgen dauert das Aufheizen lange.
4. **Selbstregeleffekt:** Weil Boden und Raum nur wenige Kelvin auseinanderliegen, gibt der Boden von selbst weniger ab, wenn der Raum wärmer wird, etwa durch Sonne.

## Regelung

### Vorlauf nach Heizkurve (Grundlage)

Die [Heizkurve](/wissen/heizkurve) gibt aus der Aussentemperatur den Vorlauf-Sollwert vor, ein Mischventil regelt ihn. Typische Neigung 0.3 bis 0.6. Der Estrich wird so gleichmässig temperiert.

### Einzelraumregelung

Am Verteiler sitzen thermische Stellantriebe, ein Raumthermostat öffnet oder schliesst die Kreise seines Raums. Wegen der Trägheit regelt man **langsam**: PI mit Nachstellzeit von einer bis zwei Stunden oder Zweipunkt mit grosser Schaltdifferenz.

### Raumaufschaltung

Die Raumtemperatur eines Referenzraums korrigiert den Vorlauf-Sollwert um wenige Kelvin. Das fängt Fremdwärme und Wetterumschwünge ab.

## Verteiler und Abgleich

Jeder Raum hat einen oder mehrere Kreise am **Heizkreisverteiler**, jeder Kreis mit Stellantrieb und Einstellventil.

Die Kreise sind verschieden lang und versorgen verschieden grosse Räume. Ohne Abgleich bekommen kurze Kreise zu viel Wasser. Beim [hydraulischen Abgleich](/wissen/hydraulischer-abgleich) bekommt **jeder Kreis den Volumenstrom, den sein Raum braucht**. Der ergibt sich aus Heizlast, Kreislänge und Spreizung, nicht gleich viel für alle. Kreislängen über etwa 100 m bei 16-mm-Rohr werden schwer abzugleichen.

## Funktionsheizen

Bevor ein neuer Estrich belegt wird, wird er nach EN 1264-4 **funktionsgeheizt**:

- Beginn bei Zementestrich frühestens **21 Tage**, bei Calciumsulfatestrich frühestens **7 Tage** nach dem Einbringen, oder nach Angabe des Herstellers
- **3 Tage** Vorlauf zwischen 20 und 25 °C
- danach **4 Tage** mit der maximalen Auslegungs-Vorlauftemperatur
- Temperaturen und Daten protokollieren

Das Funktionsheizen prüft die Anlage und baut Spannungen im Estrich ab. Es ist **nicht** dasselbe wie das **Belegreifheizen**, das den Estrich bis zur Belegreife trocknet. Dieses geschieht nach Vorgabe des Estrichlegers, und die Belegreife wird gemessen.

## Typische Fehler

| Fehler               | Folge                          | Abhilfe                               |
| -------------------- | ------------------------------ | ------------------------------------- |
| Vorlauf zu hoch      | Boden zu warm, Belag leidet    | Heizkurve senken, Vorlaufbegrenzung   |
| Kein Funktionsheizen | Risse, Mängelrügen             | Vor dem Belegen nachholen             |
| Kein Abgleich        | einzelne Räume kalt            | Kreise einstellen                     |
| Raumregler zu scharf | Temperatur schwingt            | Nachstellzeit verlängern              |
| Tiefe Nachtabsenkung | morgens kalt, hohe Spitzenlast | Absenkung klein halten oder weglassen |

## Normen

- **EN 1264** — Raumflächenintegrierte Heiz- und Kühlsysteme (Teil 4: Installation, Funktionsheizen)
- **ISO 11855** — Flächenheiz- und -kühlsysteme, Auslegung
- **SIA 384/1** — Heizungsanlagen in Gebäuden

<!-- EN -->

With underfloor heating the whole floor is the radiator. It heats with low flow temperatures and is therefore ideal for heat pumps. The screed that makes this possible also makes it sluggish, and that shapes the control.

## Construction

From top to bottom:

| Layer            | Typical                                                            |
| ---------------- | ------------------------------------------------------------------ |
| Floor covering   | Tiles, parquet, vinyl. The thinner and more conductive, the better |
| **Screed**       | 45–80 mm cement or calcium sulphate screed, the storage mass       |
| **Heating pipe** | PE-X or multilayer composite, 14–20 mm, spacing 10–30 cm           |
| Insulation       | Thermal and impact sound insulation so heat goes upwards           |
| Structure        | Concrete slab, base plate                                          |

| Variant           | Build-up height | Inertia | Use                                |
| ----------------- | --------------- | ------- | ---------------------------------- |
| Wet screed        | 65–100 mm       | high    | New build, standard                |
| Dry screed        | 30–50 mm        | medium  | Refurbishment, timber construction |
| Thin-layer system | under 30 mm     | low     | Refurbishment with little height   |

## Low Flow Temperature

| System                     | Flow         | Temperature difference |
| -------------------------- | ------------ | ---------------------- |
| Radiators, existing        | 60–75 °C     | 10–20 K                |
| Radiators, low temperature | 45–55 °C     | 10 K                   |
| **Underfloor heating**     | **28–40 °C** | 5–8 K                  |

The flow temperature is limited by the **surface temperature**. Per EN 1264 the maximum values are **29 °C** in the occupied zone, **35 °C** in the perimeter zone and **33 °C** in bathrooms. Above that it becomes uncomfortable for the feet.

The lower the flow, the better the COP of a [heat pump](/wissen/waermepumpe). Underfloor heating and heat pumps therefore go well together.

## Inertia

A 6.5 cm cement screed weighs about 130 kg per m². With a heat capacity of about 1.0 kJ/(kg·K) it stores about 1300 kJ for a 10 K temperature rise, i.e. **0.36 kWh per m²**. At a heating load of 20 W/m² that lasts, in theory, for many hours.

Consequences for control:

1. **Slow response:** the room feels a change at the valve only after hours.
2. **Overshoot:** a room controller set too aggressively oscillates with a large amplitude.
3. **Night setback achieves little:** the screed keeps releasing heat at night, and morning heat-up takes long.
4. **Self-regulating effect:** because floor and room are only a few kelvin apart, the floor releases less by itself when the room gets warmer, for example from sunshine.

## Control

### Flow by Heating Curve (Basis)

The [heating curve](/wissen/heizkurve) sets the flow setpoint from the outdoor temperature; a mixing valve controls it. Typical slope 0.3 to 0.6. The screed is thus heated evenly.

### Individual Room Control

Thermal actuators sit on the manifold; a room thermostat opens or closes the circuits of its room. Because of the inertia, control is **slow**: PI with an integral time of one to two hours, or on/off with a large switching differential.

### Room Influence

The temperature of a reference room corrects the flow setpoint by a few kelvin. This compensates internal gains and weather changes.

## Manifold and Balancing

Each room has one or more circuits on the **manifold**, each circuit with actuator and balancing valve.

The circuits differ in length and supply rooms of different size. Without balancing, short circuits get too much water. In [hydraulic balancing](/wissen/hydraulischer-abgleich) **each circuit receives the flow its room needs**. It follows from heating load, circuit length and temperature difference, not the same for all. Circuit lengths above about 100 m with 16 mm pipe become hard to balance.

## Functional Heating

Before new screed is covered, it is **functionally heated** per EN 1264-4:

- start for cement screed at the earliest **21 days**, for calcium sulphate screed at the earliest **7 days** after laying, or as specified by the manufacturer
- **3 days** flow between 20 and 25 °C
- then **4 days** at the maximum design flow temperature
- record temperatures and dates

Functional heating tests the system and relieves stresses in the screed. It is **not** the same as **heating for readiness to cover**, which dries the screed until it can be covered. That follows the screed layer's instructions, and readiness is measured.

## Typical Faults

| Fault                          | Consequence                         | Remedy                          |
| ------------------------------ | ----------------------------------- | ------------------------------- |
| Flow too high                  | Floor too warm, covering suffers    | Lower heating curve, flow limit |
| No functional heating          | Cracks, complaints                  | Do it before covering           |
| No balancing                   | Individual rooms cold               | Set the circuits                |
| Room controller too aggressive | Temperature oscillates              | Lengthen integral time          |
| Deep night setback             | Cold in the morning, high peak load | Keep setback small or drop it   |

## Standards

- **EN 1264** — Water-based surface embedded heating and cooling systems (Part 4: installation, functional heating)
- **ISO 11855** — Radiant heating and cooling systems, design
- **SIA 384/1** — Heating systems in buildings
