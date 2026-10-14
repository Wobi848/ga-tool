---
title: VOC-Sensoren — Luftqualitätsmessung für Lüftungssteuerung
title_en: VOC Sensors — Air Quality Measurement for Ventilation Control
slug: voc-sensoren
category: sensoren
subcategory: luftqualität
tags:
  [
    voc-sensor,
    voc,
    volatile-organic-compounds,
    flüchtige-organische-verbindungen,
    mox-sensor,
    metalloxid,
    iaq,
    luftqualitätsindex,
    sgp30,
    sgp41,
    bme680,
    tvoc,
    bedarfsgeführte-lüftung,
    kombisensor,
    geruchssensor
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [raumluftqualitaet, co2-sensoren, sensoren, rlt-anlage, vav-cav]
rechner: []
norm: [EN 16798-1, EN ISO 16000-6, UBA-Richtwerte TVOC]
updated: 2026-10-14
lang: de
---

# VOC-Sensoren — Luftqualitätsmessung für Lüftungssteuerung

**VOC** (Volatile Organic Compounds, flüchtige organische Verbindungen) umfassen hunderte verschiedene Substanzen, die in Innenräumen ausdünsten: Lösungsmittel, Reinigungsmittel, Möbelemissionen, Körpergerüche, Kochausdünstungen. VOC-Sensoren erfassen diese Substanzen und ergänzen CO₂-Messung für eine umfassendere Beurteilung der Innenraumluftqualität.

---

## Was messen VOC-Sensoren?

VOC-Sensoren messen **keine einzelne Substanz**, sondern einen **Summenparameter** (TVOC = Total VOC). Je nach Sensortechnologie reagieren sie auf unterschiedliche Substanzgruppen:

| Substanzgruppe              | Quellen                        | Sensor-Empfindlichkeit |
| --------------------------- | ------------------------------ | ---------------------- |
| Alkohole                    | Desinfektionsmittel, Kosmetik  | Sehr hoch              |
| Aldehyde                    | Formaldehyd (Möbel, Farben)    | Mittel                 |
| Aromaten                    | Lösungsmittel, Farben, Benzol  | Hoch                   |
| Ketone                      | Aceton (Nagellack, Klebstoffe) | Hoch                   |
| Terpene                     | Reinigungsmittel, Holz         | Hoch                   |
| Körpergeruch, Bioeffluenten | Schweiss, Atemluft             | Mittel                 |

**Was VOC-Sensoren NICHT messen:** CO₂ (wird separat gemessen), Partikel, Radon, einzelne Schadstoffe in definierten Konzentrationen.

---

## Messprinzip: Metalloxid-Sensor (MOX)

Das häufigste Messprinzip in GA-Sensoren:

Ein Heizelement hält eine Metalloxidschicht, etwa Zinndioxid, auf 150 bis 400 °C. VOC-Moleküle reagieren an der Oberfläche mit Sauerstoff, und der elektrische Widerstand der Schicht sinkt. Je mehr VOC, desto tiefer der Widerstand.

**Eigenschaften:**

- Günstig, kompakt, robust
- Reagiert auf viele VOC-Substanzen (hohe Empfindlichkeit)
- **Kreuzempfindlichkeit:** Reagiert auch auf Luftfeuchte, Temperatur, Alkohol
- Signalwert in ppb (parts per billion) oder als Index (z.B. 0–500)
- Keine absolute Kalibrierung auf einzelne Substanzen möglich

---

## Vergleich VOC vs. CO₂

| Merkmal                | CO₂-Sensor                  | VOC-Sensor                           |
| ---------------------- | --------------------------- | ------------------------------------ |
| Messprinzip            | NDIR (optisch)              | MOX / elektrochemisch                |
| Messgrösse             | CO₂ in ppm (klar definiert) | TVOC in ppb/Index (Summenwert)       |
| Kalibrierbarkeit       | Ja (auf CO₂)                | Eingeschränkt (kein Referenzgas)     |
| Personenerkennung      | Sehr gut (CO₂ aus Atemluft) | Gut (Körperodor)                     |
| Emissionen Materialien | Nein                        | Ja (Farben, Möbel, Reinigungsmittel) |
| Kochgerüche            | Nein                        | Ja                                   |
| Stabilität             | Hoch                        | Mittel (Drift, Altern)               |
| Kosten                 | Mittel (50–200 CHF)         | Gering (15–80 CHF)                   |

**Fazit:** CO₂ ist präziser für bedarfsgeführte Lüftung mit Personenbezug. VOC ergänzt bei Materialemissionen und Gerüchen. Kombisensoren (CO₂ + VOC + T + rF) sind in der GA weit verbreitet.

---

## TVOC-Richtwerte (Umweltbundesamt)

Die gängigen Stufen stammen vom deutschen Umweltbundesamt (UBA).

| Stufe | TVOC             | Bewertung                                           |
| ----- | ---------------- | --------------------------------------------------- |
| 1     | ≤ 300 µg/m³      | hygienisch unbedenklich, Zielwert                   |
| 2     | 300–1000 µg/m³   | noch unbedenklich, wenn keine Einzelwerte auffallen |
| 3     | 1000–3000 µg/m³  | hygienisch auffällig, mehr lüften, Quelle suchen    |
| 4     | 3000–10000 µg/m³ | hygienisch bedenklich, nur befristet hinnehmbar     |
| 5     | > 10000 µg/m³    | inakzeptabel                                        |

**Praxishinweis:** TVOC-Werte sind nur eingeschränkt vergleichbar, da verschiedene Sensoren unterschiedlich kalibriert sind. Relative Änderungen (Trend) sind aussagekräftiger als Absolutwerte.

---

## GA-Integration

### Bedarfsgeführte Lüftung mit VOC

| VOC-Index (Skala bis 500) | Lüftung           |
| ------------------------- | ----------------- |
| unter 100                 | Grundlüftung      |
| 100–300                   | stetig ansteigend |
| über 300                  | Maximum           |

Die Schwellen sind Beispiele. Beim VOC-Index von Sensirion bedeutet 100 den Durchschnitt der letzten Tage, höhere Werte eine Verschlechterung.

Sensoren wie **Sensirion SGP41** oder **Bosch BME680** liefern einen normierten IAQ-Index (0–500) statt absoluten ppb-Werten — praktischer für die DDC-Programmierung.

### Kombination CO₂ + VOC (Maximum-Auswahl)

<p class="formel">Lüftung = max(f(CO<sub>2</sub>), f(VOC))</p>

Lüftung reagiert auf beide Indikatoren, der höhere Bedarf gewinnt.

---

## Typische Einsatzbereiche in der GA

| Anwendung                  | Vorteil VOC                                                                               |
| -------------------------- | ----------------------------------------------------------------------------------------- |
| Küchen / Kantinen          | Kochgerüche, Fettemissionen erkennbar                                                     |
| Sanitärräume               | Geruchssteuerung, Schaltet bei Nutzung                                                    |
| Fitnessstudios             | Körperodor + hohe Personenzahl                                                            |
| Neue Gebäude / Renovierung | Materialausdünstungen (Farben, Kleber) überwachen                                         |
| Tiefgaragen                | CO-Sensor besser, VOC ergänzend                                                           |
| Serverräume                | Hinweis auf Überhitzung oder Schwelbrand, aber **kein Ersatz für Brandmelder** nach EN 54 |

---

## Bekannte Sensorfamilien (GA-relevant)

| Hersteller    | Sensor        | Schnittstelle                  |
| ------------- | ------------- | ------------------------------ |
| Sensirion     | SGP40/SGP41   | I²C (integriert in Raumgeräte) |
| Bosch         | BME680/BME688 | I²C/SPI                        |
| Renesas (IDT) | ZMOD4410      | I²C                            |
| GA-Hersteller | Eigene Module | 0–10 V, Modbus                 |

Die VOC-Raumfühler der GA-Hersteller enthalten meist solche MOX-Chips und geben das Signal als 0–10 V oder über den Bus aus.

<!-- EN -->

**VOC** (Volatile Organic Compounds) covers hundreds of different substances that off-gas in indoor environments: solvents, cleaning agents, furniture emissions, body odours, cooking fumes. VOC sensors detect these substances and supplement CO₂ measurement for a more comprehensive assessment of indoor air quality.

---

## What Do VOC Sensors Measure?

VOC sensors do **not measure a single substance**, but a **combined parameter** (TVOC = Total VOC). Depending on the sensor technology, they respond to different substance groups:

| Substance group           | Sources                           | Sensor sensitivity |
| ------------------------- | --------------------------------- | ------------------ |
| Alcohols                  | Disinfectants, cosmetics          | Very high          |
| Aldehydes                 | Formaldehyde (furniture, paints)  | Medium             |
| Aromatics                 | Solvents, paints, benzene         | High               |
| Ketones                   | Acetone (nail varnish, adhesives) | High               |
| Terpenes                  | Cleaning agents, wood             | High               |
| Body odour / bioeffluents | Sweat, exhaled air                | Medium             |

**What VOC sensors do NOT measure:** CO₂ (measured separately), particles, radon, individual pollutants at defined concentrations.

---

## Measurement Principle: Metal Oxide Sensor (MOX)

The most common measurement principle in BA sensors:

A heater keeps a metal oxide layer, such as tin dioxide, at 150 to 400 °C. VOC molecules react with oxygen at the surface and the electrical resistance of the layer falls. The more VOC, the lower the resistance.

**Properties:**

- Low cost, compact, robust
- Responds to many VOC substances (high sensitivity)
- **Cross-sensitivity:** Also responds to humidity, temperature, alcohol
- Signal in ppb (parts per billion) or as an index (e.g. 0–500)
- Absolute calibration to individual substances not possible

---

## VOC vs. CO₂ Comparison

| Feature               | CO₂ sensor                       | VOC sensor                        |
| --------------------- | -------------------------------- | --------------------------------- |
| Measurement principle | NDIR (optical)                   | MOX / electrochemical             |
| Measurand             | CO₂ in ppm (clearly defined)     | TVOC in ppb/index (aggregate)     |
| Calibrability         | Yes (to CO₂)                     | Limited (no reference gas)        |
| Occupancy detection   | Very good (CO₂ from exhaled air) | Good (body odour)                 |
| Material emissions    | No                               | Yes (paints, furniture, cleaners) |
| Cooking odours        | No                               | Yes                               |
| Stability             | High                             | Medium (drift, ageing)            |
| Cost                  | Medium (50–200 CHF)              | Low (15–80 CHF)                   |

**Conclusion:** CO₂ is more precise for demand-controlled ventilation tied to occupancy. VOC complements it for material emissions and odours. Combination sensors (CO₂ + VOC + T + RH) are widely used in BA.

---

## TVOC Reference Values (German Environment Agency)

The common levels come from the German Environment Agency (UBA).

| Level | TVOC             | Assessment                                           |
| ----- | ---------------- | ---------------------------------------------------- |
| 1     | ≤ 300 µg/m³      | hygienically harmless, target value                  |
| 2     | 300–1000 µg/m³   | still harmless if no single substance stands out     |
| 3     | 1000–3000 µg/m³  | hygienically noticeable, ventilate more, find source |
| 4     | 3000–10000 µg/m³ | hygienically concerning, acceptable only temporarily |
| 5     | > 10000 µg/m³    | unacceptable                                         |

**Practical note:** TVOC values are only partly comparable, as different sensors are calibrated differently. Relative changes (trend) are more meaningful than absolute values.

---

## BA Integration

### Demand-Controlled Ventilation with VOC

| VOC index (scale up to 500) | Ventilation         |
| --------------------------- | ------------------- |
| below 100                   | base ventilation    |
| 100–300                     | rising continuously |
| above 300                   | maximum             |

The thresholds are examples. With the Sensirion VOC index, 100 means the average of recent days, higher values a deterioration.

Sensors such as the **Sensirion SGP41** or **Bosch BME680** provide a normalised IAQ index (0–500) instead of absolute ppb values — more practical for DDC programming.

### CO₂ + VOC Combination (Maximum Selection)

<p class="formel">ventilation = max(f(CO<sub>2</sub>), f(VOC))</p>

Ventilation responds to both indicators; the higher demand wins.

---

## Typical Applications in BA

| Application                 | VOC advantage                                                                          |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Kitchens / canteens         | Cooking odours and fat emissions detectable                                            |
| Sanitary rooms              | Odour control, activates on occupancy                                                  |
| Gyms                        | Body odour + high occupancy                                                            |
| New buildings / renovations | Monitor off-gassing of materials (paints, adhesives)                                   |
| Car parks                   | CO sensor preferred, VOC supplementary                                                 |
| Server rooms                | hint of overheating or smouldering, but **no substitute for fire detectors** per EN 54 |

---

## Common Sensor Families (BA-Relevant)

| Manufacturer     | Sensor        | Interface                          |
| ---------------- | ------------- | ---------------------------------- |
| Sensirion        | SGP40/SGP41   | I²C (integrated into room devices) |
| Bosch            | BME680/BME688 | I²C/SPI                            |
| Renesas (IDT)    | ZMOD4410      | I²C                                |
| BA manufacturers | Own modules   | 0–10 V, Modbus                     |

VOC room sensors from BA manufacturers usually contain such MOX chips and output the signal as 0–10 V or via the bus.
