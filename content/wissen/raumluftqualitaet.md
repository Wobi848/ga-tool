---
title: Raumluftqualität — CO₂, VOC, Partikel
title_en: Indoor Air Quality — CO₂, VOC and Particles
slug: raumluftqualitaet
category: lueftung
subcategory: luftqualitaet
tags:
  [
    raumluftqualitaet,
    co2,
    voc,
    partikel,
    feinststaub,
    ida,
    oda,
    lüftung,
    ventilation,
    sick-building,
    innenraumluft,
    grenzwerte,
    dcv,
    bedarfsregelung,
    en16798
  ]
difficulty: grundlagen
area: [hlk, ga]
related: [sensoren, vav-cav, rlt-anlage, vdi6022, co2-sensoren, voc-sensoren, feuchtesensoren]
norm: [EN 16798-1, EN 16798-3, SIA 382/1, WHO AQG 2021]
updated: 2026-10-14
lang: de
---

# Raumluftqualität — CO₂, VOC, Partikel

Wir verbringen den grössten Teil unserer Zeit in Innenräumen. Wie gut die Luft dort ist, beeinflusst Wohlbefinden, Konzentration und Gesundheit. Die GA misst die Luftqualität und lüftet danach: genug, wenn Leute da sind, wenig, wenn nicht.

## Klassen nach EN 16798-3

### Aussenluft (ODA)

| Klasse | Bedeutung                                                            |
| ------ | -------------------------------------------------------------------- |
| ODA 1  | Aussenluft hält die WHO-Richtwerte ein                               |
| ODA 2  | Richtwerte für Partikel oder Gase leicht überschritten               |
| ODA 3  | Richtwerte deutlich überschritten, z.B. an stark befahrenen Strassen |

Je schlechter die Aussenluft, desto besser muss gefiltert werden. Die Filterwahl folgt EN 16798-3 mit den Klassen nach ISO 16890, typisch zweistufig, z.B. ePM10 50 % als Vorfilter und ePM1 50 % in der Zuluft.

### Raumluft (IDA)

| Klasse    | Qualität | CO₂ über Aussenluft (Richtwert) |
| --------- | -------- | ------------------------------- |
| **IDA 1** | hoch     | bis 400 ppm                     |
| **IDA 2** | mittel   | 400–600 ppm                     |
| **IDA 3** | mässig   | 600–1000 ppm                    |
| **IDA 4** | niedrig  | über 1000 ppm                   |

Daneben kennt EN 16798-1 die **Kategorien I bis IV** mit eigenen CO₂-Werten (550/800/1350 ppm über aussen). Beide Systeme kommen in Ausschreibungen vor, man muss wissen, welches gemeint ist. Zum Rechnen: [Luftbedarf-Rechner](/rechner/luftbedarf).

Die Aussenluft hat heute etwa 420 ppm CO₂, in Städten etwas mehr.

## CO₂ als Leitgrösse

Menschen atmen CO₂ aus, in der Ausatemluft rund 4 % (40'000 ppm). Im Raum steigt der CO₂-Gehalt deshalb mit der Belegung. CO₂ ist selbst bei üblichen Innenraumwerten nicht giftig, aber ein guter **Indikator** dafür, wie viel verbrauchte Luft im Raum ist.

| CO₂ im Raum    | Einordnung                                 |
| -------------- | ------------------------------------------ |
| unter 1000 ppm | hygienisch unbedenklich (Pettenkofer-Zahl) |
| 1000–2000 ppm  | hygienisch auffällig, lüften               |
| über 2000 ppm  | inakzeptabel (Einstufung Umweltbundesamt)  |
| 5000 ppm       | Arbeitsplatzgrenzwert (MAK) für 8 Stunden  |

In Studien schnitten Testpersonen in gut belüfteten Büros mit wenig Schadstoffen deutlich besser in kognitiven Tests ab als unter üblichen Bedingungen (Allen et al., Harvard 2015). Welcher Anteil dabei auf CO₂ und welcher auf andere Stoffe fällt, ist umstritten.

### Bedarfsgeführte Lüftung mit CO₂

Ein CO₂-Fühler im Raum oder in der Abluft gibt den Volumenstrom vor: Steigt der Wert über den Sollwert, öffnet der VAV-Regler oder dreht der Ventilator hoch; sinkt er, wird zurückgefahren. Ein Mindestvolumenstrom bleibt immer, siehe [VAV und CAV](/wissen/vav-cav).

## VOC — flüchtige organische Verbindungen

VOC stammen aus Möbeln, Bodenbelägen, Farben, Reinigungsmitteln und vom Menschen selbst. Sensoren messen meist eine **Summe** (TVOC oder ein «Luftqualitätssignal»), nicht einzelne Stoffe, und sind nicht absolut kalibriert.

Das deutsche Umweltbundesamt ordnet TVOC so ein: bis 0.3 mg/m³ hygienisch unbedenklich, 1 bis 3 mg/m³ auffällig, über 10 mg/m³ inakzeptabel.

VOC-Sensoren ergänzen CO₂ dort, wo nicht nur Menschen die Luft belasten: Sanitärräume, Küchen, Sitzungszimmer, Neubauten in den ersten Monaten. **Ersetzen** können sie den CO₂-Fühler nicht.

## Partikel

| Grösse       | Herkunft                           | Wirkung                  |
| ------------ | ---------------------------------- | ------------------------ |
| PM10         | Strassenstaub, Pollen, Abrieb      | obere Atemwege           |
| PM2.5        | Verbrennung, Verkehr, Holzfeuerung | dringt bis in die Lunge  |
| PM1          | Verbrennung, Russ                  | dringt tief in die Lunge |
| UFP < 0.1 µm | frisch gebildete Partikel          | gelangen bis ins Blut    |

Die WHO hat 2021 ihre Richtwerte verschärft: **PM2.5 im Jahresmittel 5 µg/m³**, PM10 15 µg/m³.

Gegen Aussenluftpartikel helfen gute Filter in der Zuluft. Gegen Quellen im Raum (Kochen, Drucker, Kerzen) helfen Abluft an der Quelle, mehr Aussenluft oder Luftreiniger.

## Fühler in der GA

| Fühler                     | Misst             | Typisches Signal       |
| -------------------------- | ----------------- | ---------------------- |
| CO₂ + Temperatur + Feuchte | Belegung, Komfort | 0–10 V, Modbus, BACnet |
| VOC / Luftqualität         | Summe der Gase    | 0–10 V                 |
| Partikel                   | PM1, PM2.5, PM10  | Modbus                 |

Mehr in [CO₂-Sensoren](/wissen/co2-sensoren) und [VOC-Sensoren](/wissen/voc-sensoren).

## Normen

- **EN 16798-1** — Eingangsparameter für das Innenraumklima (Kategorien I–IV)
- **EN 16798-3** — Lüftung von Nichtwohngebäuden (ODA, IDA, Filter)
- **SIA 382/1** — Lüftungs- und Klimaanlagen (CH)
- **WHO Global Air Quality Guidelines (2021)**

<!-- EN -->

We spend most of our time indoors. How good the air is there affects well-being, concentration and health. The BA measures air quality and ventilates accordingly: enough when people are present, little when not.

## Classes per EN 16798-3

### Outdoor Air (ODA)

| Class | Meaning                                                   |
| ----- | --------------------------------------------------------- |
| ODA 1 | Outdoor air meets the WHO guideline values                |
| ODA 2 | Guideline values for particles or gases slightly exceeded |
| ODA 3 | Guideline values clearly exceeded, e.g. at busy roads     |

The worse the outdoor air, the better it must be filtered. Filter selection follows EN 16798-3 with classes per ISO 16890, typically two stages, e.g. ePM10 50 % as pre-filter and ePM1 50 % in the supply air.

### Indoor Air (IDA)

| Class     | Quality  | CO₂ above outdoor (guide value) |
| --------- | -------- | ------------------------------- |
| **IDA 1** | high     | up to 400 ppm                   |
| **IDA 2** | medium   | 400–600 ppm                     |
| **IDA 3** | moderate | 600–1000 ppm                    |
| **IDA 4** | low      | above 1000 ppm                  |

EN 16798-1 additionally has **categories I to IV** with their own CO₂ values (550/800/1350 ppm above outdoor). Both systems appear in specifications; you need to know which is meant. To calculate: [air demand calculator](/rechner/luftbedarf).

Outdoor air today has about 420 ppm CO₂, somewhat more in cities.

## CO₂ as the Lead Variable

People exhale CO₂, about 4 % (40,000 ppm) in exhaled air. Indoor CO₂ therefore rises with occupancy. At usual indoor levels CO₂ itself is not toxic, but it is a good **indicator** of how much stale air is in the room.

| Indoor CO₂     | Assessment                                |
| -------------- | ----------------------------------------- |
| below 1000 ppm | hygienically harmless (Pettenkofer value) |
| 1000–2000 ppm  | hygienically conspicuous, ventilate       |
| above 2000 ppm | unacceptable (German Environment Agency)  |
| 5000 ppm       | occupational exposure limit for 8 hours   |

In studies, test subjects in well-ventilated offices with few pollutants scored considerably better in cognitive tests than under usual conditions (Allen et al., Harvard 2015). How much of this is due to CO₂ and how much to other substances is debated.

### Demand-Controlled Ventilation with CO₂

A CO₂ sensor in the room or extract air sets the airflow: if the value rises above the setpoint, the VAV controller opens or the fan speeds up; if it falls, it ramps down. A minimum airflow always remains, see [VAV and CAV](/wissen/vav-cav).

## VOC — Volatile Organic Compounds

VOCs come from furniture, floor coverings, paints, cleaning agents and people themselves. Sensors usually measure a **sum** (TVOC or an "air quality signal"), not individual substances, and are not absolutely calibrated.

The German Environment Agency classifies TVOC as follows: up to 0.3 mg/m³ hygienically harmless, 1 to 3 mg/m³ conspicuous, above 10 mg/m³ unacceptable.

VOC sensors complement CO₂ where not only people pollute the air: sanitary rooms, kitchens, meeting rooms, new buildings in the first months. They cannot **replace** the CO₂ sensor.

## Particles

| Size         | Source                            | Effect                      |
| ------------ | --------------------------------- | --------------------------- |
| PM10         | road dust, pollen, abrasion       | upper airways               |
| PM2.5        | combustion, traffic, wood burning | reaches the lungs           |
| PM1          | combustion, soot                  | reaches deep into the lungs |
| UFP < 0.1 µm | freshly formed particles          | reach the bloodstream       |

In 2021 the WHO tightened its guideline values: **PM2.5 annual mean 5 µg/m³**, PM10 15 µg/m³.

Good supply air filters help against outdoor particles. Against indoor sources (cooking, printers, candles), extraction at the source, more outdoor air or air purifiers help.

## Sensors in BA

| Sensor                       | Measures           | Typical signal         |
| ---------------------------- | ------------------ | ---------------------- |
| CO₂ + temperature + humidity | occupancy, comfort | 0–10 V, Modbus, BACnet |
| VOC / air quality            | sum of gases       | 0–10 V                 |
| Particles                    | PM1, PM2.5, PM10   | Modbus                 |

More in [CO₂ Sensors](/wissen/co2-sensoren) and [VOC Sensors](/wissen/voc-sensoren).

## Standards

- **EN 16798-1** — Input parameters for the indoor environment (categories I–IV)
- **EN 16798-3** — Ventilation for non-residential buildings (ODA, IDA, filters)
- **SIA 382/1** — Ventilation and air-conditioning systems (CH)
- **WHO Global Air Quality Guidelines (2021)**
