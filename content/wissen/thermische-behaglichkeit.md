---
title: Thermische Behaglichkeit — PMV, PPD und Komfortparameter
title_en: Thermal Comfort — PMV, PPD and Comfort Parameters
slug: thermische-behaglichkeit
category: komfort
subcategory: klima
tags:
  [
    pmv,
    ppd,
    behaglichkeit,
    komfort,
    operativtemperatur,
    lufttemperatur,
    strahlungstemperatur,
    luftgeschwindigkeit,
    feuchte,
    kleidung,
    aktivität,
    clo,
    met,
    iso7730,
    ashrae55,
    sia180,
    draught
  ]
difficulty: fortgeschritten
area: [hlk, ga, normen]
related: [raumluftqualitaet, pid-regler, vav-cav, taupunkt, rlt-anlage]
norm: [EN ISO 7730, EN 16798-1, SIA 180, ASHRAE 55]
updated: 2026-10-14
lang: de
---

# Thermische Behaglichkeit — PMV, PPD und Komfortparameter

Thermische Behaglichkeit heisst: Man ist mit dem Raumklima zufrieden und möchte es weder wärmer noch kälter. Ziel der Regelung ist am Ende dieses Empfinden, nicht ein Messwert am Fühler.

## Die sechs Einflussgrössen

Nach Fanger hängt die Behaglichkeit von sechs Grössen ab, vier aus dem Raum und zwei von der Person.

| Grösse                            | Symbol | Richtwert                      | Wirkt über                                      |
| --------------------------------- | ------ | ------------------------------ | ----------------------------------------------- |
| **Lufttemperatur**                | θ_a    | 20–26 °C                       | Konvektion                                      |
| **Mittlere Strahlungstemperatur** | θ_r    | nahe der Lufttemperatur        | Strahlung zu Wänden, Fenstern, Decke            |
| **Luftgeschwindigkeit**           | v      | unter 0.2 m/s beim Sitzen      | Zugluft, Wärmeabfuhr                            |
| **Relative Luftfeuchte**          | φ      | etwa 30–60 %                   | Verdunstung; bei mittleren Temperaturen schwach |
| **Aktivität**                     | M      | 1.2 met im Büro                | Wärmeproduktion des Körpers                     |
| **Bekleidung**                    | I_cl   | 0.5 clo Sommer, 1.0 clo Winter | Wärmedämmung der Kleidung                       |

**1 met** = 58.2 W/m² Körperoberfläche, ruhig sitzend. Gehen mit etwa 3 km/h ergibt rund 2 met.
**1 clo** = 0.155 m²·K/W, etwa Anzug mit Hemd.

## Operative Temperatur

Die operative Temperatur fasst Luft- und Strahlungstemperatur zusammen. Bei Luftgeschwindigkeiten unter 0.2 m/s gilt näherungsweise:

<p class="formel">θ<sub>op</sub> ≈ (θ<sub>a</sub> + θ<sub>r</sub>) / 2</p>

**Beispiel:** Luft 22 °C. Ein Viertel der Umgebungsfläche ist ein kaltes Fenster mit 14 °C, der Rest hat 22 °C. Dann liegt θ_r etwa bei 0.75 × 22 + 0.25 × 14 = 20 °C und θ_op bei rund 21 °C. Der Raum fühlt sich also um 1 K kühler an, als der Fühler anzeigt. Das ist ein Grund, warum alte Fenster zu höheren Sollwerten verleiten.

## PMV — Predicted Mean Vote

Der **PMV** nach EN ISO 7730 sagt voraus, wie eine grössere Gruppe das Klima im Mittel auf einer 7-stufigen Skala bewertet:

| PMV   | Empfinden   |
| ----- | ----------- |
| +3    | heiss       |
| +2    | warm        |
| +1    | etwas warm  |
| **0** | **neutral** |
| −1    | etwas kühl  |
| −2    | kühl        |
| −3    | kalt        |

Der PMV ist eine längere Gleichung aus allen sechs Grössen. Für die Praxis reichen die Beispiele aus EN ISO 7730 für ein Büro mit 1.2 met und Kategorie B:

- **Winter**, 1.0 clo: operative Temperatur 22 °C ± 2 K
- **Sommer**, 0.5 clo: operative Temperatur 24.5 °C ± 1.5 K

## PPD — Predicted Percentage Dissatisfied

Der **PPD** gibt an, wie viele Prozent der Personen unzufrieden sind. Er folgt direkt aus dem PMV:

<p class="formel">PPD = 100 − 95 · e<sup>−(0.03353 · PMV<sup>4</sup> + 0.2179 · PMV<sup>2</sup>)</sup></p>

| PMV  | PPD   |
| ---- | ----- |
| 0    | 5 %   |
| ±0.5 | ~10 % |
| ±1.0 | ~26 % |
| ±2.0 | ~77 % |

Auch bei PMV = 0 bleiben 5 % unzufrieden. Allen Personen gleichzeitig recht machen geht nicht.

**Kategorien nach EN 16798-1:**

| Kategorie | PMV  | PPD    | Einsatz                               |
| --------- | ---- | ------ | ------------------------------------- |
| I         | ±0.2 | < 6 %  | hohe Ansprüche, empfindliche Personen |
| II        | ±0.5 | < 10 % | normaler Neubau                       |
| III       | ±0.7 | < 15 % | bestehende Gebäude, mässige Ansprüche |
| IV        | ±1.0 | < 25 % | nur für begrenzte Zeit                |

EN ISO 7730 verwendet dieselben Stufen unter den Namen A, B und C.

## Zugluft

Zugluft ist eine der häufigsten Beschwerden. EN ISO 7730 bewertet sie mit dem **Draught Rate** DR, dem Anteil der Personen, die sich durch Zug gestört fühlen:

<p class="formel">DR = (34 − θ<sub>a</sub>) · (v − 0.05)<sup>0.62</sup> · (0.37 · v · Tu + 3.14)</p>

θ_a in °C, v mittlere Luftgeschwindigkeit in m/s, Tu Turbulenzgrad in %. Für v unter 0.05 m/s wird 0.05 eingesetzt.

| Kategorie | DR max. |
| --------- | ------- |
| A         | 10 %    |
| B         | 20 %    |
| C         | 30 %    |

Wie schnell die Luft sein darf, hängt von Temperatur und Turbulenz ab. In einem Büro mit 22 °C und üblicher Turbulenz liegt die Grenze für Kategorie B grob bei 0.15 bis 0.2 m/s. Kalte Luft zieht stärker als warme.

**Praxis:** Zuluftauslässe so wählen und einstellen, dass der Strahl im Aufenthaltsbereich abgebaut ist. Häufige Ursachen für Zug sind zu kalte Zuluft, falsch eingestellte Drallauslässe und Kaltluftabfall an grossen Glasflächen.

## Weitere Einflüsse

EN ISO 7730 nennt neben Zugluft drei lokale Störungen:

| Störung                                       | Kategorie B |
| --------------------------------------------- | ----------- |
| Temperaturunterschied Kopf zu Fussknöchel     | unter 3 K   |
| Fussbodentemperatur                           | 19–29 °C    |
| Strahlungsasymmetrie, kalte Wand oder Fenster | unter 10 K  |

Typische Ursache für zu grosse Temperaturschichtung ist eine Warmluftheizung, die von oben einbläst. Der Heizkörper unter dem Fenster wirkt dagegen gerade gegen den Kaltluftabfall am Glas.

## Raumtemperaturen in der Praxis

| Nutzung     | Heizfall | Kühlfall  | Quelle                   |
| ----------- | -------- | --------- | ------------------------ |
| Büro        | ab 20 °C | bis 26 °C | EN 16798-1, Kategorie II |
| Wohnen      | ab 20 °C | bis 26 °C | EN 16798-1, Kategorie II |
| Schulzimmer | ab 20 °C | bis 26 °C | EN 16798-1, Kategorie II |

In der Schweiz legt **SIA 180** die Anforderungen an die Raumtemperatur fest. Im Sommer erlaubt sie bei hohen Aussentemperaturen höhere Werte, abhängig vom gleitenden Mittel der Aussentemperatur.

## Adaptive Behaglichkeit

Wer im Sommer Fenster öffnen kann und sich leicht kleidet, akzeptiert höhere Temperaturen. EN 16798-1 gibt dafür für Gebäude ohne mechanische Kühlung eine Komforttemperatur an:

<p class="formel">θ<sub>c</sub> = 0.33 · θ<sub>rm</sub> + 18.8</p>

θ_rm ist das gleitende Mittel der Aussentemperatur in °C, gewichtet über die letzten Tage. Kategorie II erlaubt ± 3 K um diesen Wert.

ASHRAE 55 hat ein eigenes adaptives Modell mit leicht anderen Faktoren, 0.31 · t + 17.8.

## Was die GA tun kann

- **Sollwerte nach Jahreszeit** statt eines festen Werts. Gleitender Sollwert im Sommer nach Aussentemperatur, wie SIA 180 und das adaptive Modell es erlauben.
- **Operative Temperatur messen**, wo grosse Glasflächen oder Flächenheizungen die Strahlung bestimmen. Es gibt Raumfühler mit Globe-Thermometer.
- **Zuluft nicht zu kalt**, typisch nicht mehr als 6 bis 10 K unter Raumtemperatur bei Mischlüftung.
- **Beschwerden auswerten**, etwa über das Raumbediengerät. Wiederholte Klagen in derselben Zone zeigen oft ein Strahlungs- oder Zugproblem, kein Regelproblem.

## Normen

- **EN ISO 7730** — Ergonomie der thermischen Umgebung, PMV, PPD und lokale Behaglichkeit
- **EN 16798-1** — Eingangsparameter für das Innenraumklima, Kategorien I bis IV
- **SIA 180** — Wärmeschutz, Feuchteschutz und Raumklima in Gebäuden (CH)
- **SIA 382/1** — Lüftungs- und Klimaanlagen (CH)
- **ASHRAE 55** — Thermal Environmental Conditions for Human Occupancy (USA)

<!-- EN -->

Thermal comfort means being satisfied with the indoor climate and wanting it neither warmer nor cooler. The ultimate goal of control is that sensation, not a reading on a sensor.

## The Six Factors

According to Fanger, comfort depends on six factors, four from the room and two from the person.

| Factor                       | Symbol | Guide value                    | Acts through                               |
| ---------------------------- | ------ | ------------------------------ | ------------------------------------------ |
| **Air temperature**          | θ_a    | 20–26 °C                       | convection                                 |
| **Mean radiant temperature** | θ_r    | close to air temperature       | radiation to walls, windows, ceiling       |
| **Air velocity**             | v      | below 0.2 m/s when seated      | draught, heat removal                      |
| **Relative humidity**        | φ      | about 30–60 %                  | evaporation; weak at moderate temperatures |
| **Activity**                 | M      | 1.2 met in an office           | the body's heat production                 |
| **Clothing**                 | I_cl   | 0.5 clo summer, 1.0 clo winter | insulation of the clothing                 |

**1 met** = 58.2 W/m² of body surface, seated quietly. Walking at about 3 km/h gives around 2 met.
**1 clo** = 0.155 m²·K/W, roughly a suit with shirt.

## Operative Temperature

The operative temperature combines air and radiant temperature. At air velocities below 0.2 m/s, approximately:

<p class="formel">θ<sub>op</sub> ≈ (θ<sub>a</sub> + θ<sub>r</sub>) / 2</p>

**Example:** air 22 °C. A quarter of the surrounding surface is a cold window at 14 °C, the rest is at 22 °C. Then θ_r is about 0.75 × 22 + 0.25 × 14 = 20 °C and θ_op about 21 °C. The room feels 1 K cooler than the sensor shows. That is one reason old windows tempt people to raise the setpoint.

## PMV — Predicted Mean Vote

The **PMV** per EN ISO 7730 predicts how a larger group will rate the climate on average on a 7-point scale:

| PMV   | Sensation     |
| ----- | ------------- |
| +3    | hot           |
| +2    | warm          |
| +1    | slightly warm |
| **0** | **neutral**   |
| −1    | slightly cool |
| −2    | cool          |
| −3    | cold          |

The PMV is a lengthy equation of all six factors. For practice, the examples in EN ISO 7730 for an office at 1.2 met and category B are enough:

- **Winter**, 1.0 clo: operative temperature 22 °C ± 2 K
- **Summer**, 0.5 clo: operative temperature 24.5 °C ± 1.5 K

## PPD — Predicted Percentage Dissatisfied

The **PPD** gives the percentage of people who are dissatisfied. It follows directly from the PMV:

<p class="formel">PPD = 100 − 95 · e<sup>−(0.03353 · PMV<sup>4</sup> + 0.2179 · PMV<sup>2</sup>)</sup></p>

| PMV  | PPD   |
| ---- | ----- |
| 0    | 5 %   |
| ±0.5 | ~10 % |
| ±1.0 | ~26 % |
| ±2.0 | ~77 % |

Even at PMV = 0, 5 % remain dissatisfied. Pleasing everyone at once is not possible.

**Categories per EN 16798-1:**

| Category | PMV  | PPD    | Use                                       |
| -------- | ---- | ------ | ----------------------------------------- |
| I        | ±0.2 | < 6 %  | high expectations, sensitive occupants    |
| II       | ±0.5 | < 10 % | normal new building                       |
| III      | ±0.7 | < 15 % | existing buildings, moderate expectations |
| IV       | ±1.0 | < 25 % | only for limited periods                  |

EN ISO 7730 uses the same levels under the names A, B and C.

## Draught

Draught is one of the most frequent complaints. EN ISO 7730 rates it with the **draught rate** DR, the share of people bothered by draught:

<p class="formel">DR = (34 − θ<sub>a</sub>) · (v − 0.05)<sup>0.62</sup> · (0.37 · v · Tu + 3.14)</p>

θ_a in °C, v mean air velocity in m/s, Tu turbulence intensity in %. For v below 0.05 m/s, 0.05 is used.

| Category | DR max. |
| -------- | ------- |
| A        | 10 %    |
| B        | 20 %    |
| C        | 30 %    |

How fast the air may move depends on temperature and turbulence. In an office at 22 °C with usual turbulence, the limit for category B is roughly 0.15 to 0.2 m/s. Cold air is felt more than warm air.

**Practice:** choose and set supply diffusers so the jet has decayed before the occupied zone. Common causes of draught are supply air that is too cold, badly adjusted swirl diffusers and cold downdraught at large glazed areas.

## Other Factors

Besides draught, EN ISO 7730 names three local disturbances:

| Disturbance                            | Category B |
| -------------------------------------- | ---------- |
| Temperature difference head to ankle   | below 3 K  |
| Floor temperature                      | 19–29 °C   |
| Radiant asymmetry, cold wall or window | below 10 K |

A typical cause of excessive stratification is warm-air heating blowing in from above. A radiator under the window, by contrast, counteracts cold downdraught from the glass.

## Room Temperatures in Practice

| Use         | Heating    | Cooling     | Source                  |
| ----------- | ---------- | ----------- | ----------------------- |
| Office      | from 20 °C | up to 26 °C | EN 16798-1, category II |
| Residential | from 20 °C | up to 26 °C | EN 16798-1, category II |
| Classroom   | from 20 °C | up to 26 °C | EN 16798-1, category II |

In Switzerland **SIA 180** sets the requirements for room temperature. In summer it allows higher values at high outdoor temperatures, depending on the running mean of the outdoor temperature.

## Adaptive Comfort

People who can open windows in summer and dress lightly accept higher temperatures. EN 16798-1 gives a comfort temperature for buildings without mechanical cooling:

<p class="formel">θ<sub>c</sub> = 0.33 · θ<sub>rm</sub> + 18.8</p>

θ_rm is the running mean outdoor temperature in °C, weighted over the last days. Category II allows ± 3 K around this value.

ASHRAE 55 has its own adaptive model with slightly different factors, 0.31 · t + 17.8.

## What the BA Can Do

- **Seasonal setpoints** instead of one fixed value. A sliding summer setpoint based on outdoor temperature, as SIA 180 and the adaptive model allow.
- **Measure operative temperature** where large glazed areas or radiant systems dominate. Room sensors with a globe thermometer exist.
- **Supply air not too cold**, typically no more than 6 to 10 K below room temperature with mixing ventilation.
- **Evaluate complaints**, for example through the room operating unit. Repeated complaints in the same zone often point to a radiation or draught problem, not a control problem.

## Standards

- **EN ISO 7730** — Ergonomics of the thermal environment, PMV, PPD and local comfort
- **EN 16798-1** — Indoor environmental input parameters, categories I to IV
- **SIA 180** — Thermal insulation, moisture protection and indoor climate in buildings (CH)
- **SIA 382/1** — Ventilation and air-conditioning systems (CH)
- **ASHRAE 55** — Thermal Environmental Conditions for Human Occupancy (USA)
