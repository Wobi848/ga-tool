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
norm: [EN 16798-1, EN 13779, WHO, SWKI VA102-01]
updated: 2026-05-14
lang: de
---

# Raumluftqualität — CO₂, VOC, Partikel

Menschen verbringen 90 % ihrer Zeit in Innenräumen. Die Luftqualität beeinflusst Gesundheit, Wohlbefinden und Leistungsfähigkeit direkt. Die GA kann mit bedarfsgeführter Lüftung sowohl Komfort als auch Energieeffizienz optimieren.

## Luftkategorien (EN 16798-1 / EN 13779)

### Aussenluft (ODA — Outdoor Air)

| Klasse | Beschreibung            | Vorfilter                |
| ------ | ----------------------- | ------------------------ |
| ODA 1  | Reine Luft, nur Staub   | F7                       |
| ODA 2  | Staub + Gerüche (urban) | F7 + Aktivkohle          |
| ODA 3  | Stark verschmutzt       | F7 + Hochleistungsfilter |

### Innenluft (IDA — Indoor Air)

| Klasse    | Beschreibung      | CO₂ über Aussenluft | Anwendung              |
| --------- | ----------------- | ------------------- | ---------------------- |
| **IDA 1** | Hohe Qualität     | ≤ 400 ppm           | Kindergärten, Kliniken |
| **IDA 2** | Gute Qualität     | ≤ 800 ppm           | Büros, Schulen, Hotels |
| **IDA 3** | Mittlere Qualität | ≤ 1350 ppm          | Einfache Büros         |
| **IDA 4** | Niedrige Qualität | > 1350 ppm          | Nicht empfohlen        |

**Aussenluft-Referenz:** 400–420 ppm CO₂ (2024, steigend ~2 ppm/Jahr).

---

## CO₂ — Hauptindikator für Belegung

CO₂ ist das wichtigste Signal für **bedarfsgeführte Lüftung** (DCV — Demand Controlled Ventilation):

### Warum CO₂?

Menschen atmen CO₂ aus (~38000 ppm in der Ausatemluft). Mehr Menschen → mehr CO₂. CO₂ korreliert direkt mit der Belegungsdichte und dem Frischluftbedarf.

### Grenzwerte und Wirkung

| CO₂-Konzentration | Wirkung                                      |
| ----------------- | -------------------------------------------- |
| 400–800 ppm       | Frische Luft, gute Konzentration             |
| 800–1000 ppm      | Leichte Müdigkeit bei empfindlichen Personen |
| 1000–1500 ppm     | Merkliche Leistungsminderung                 |
| > 1500 ppm        | Kopfschmerzen, Schläfrigkeit                 |
| > 5000 ppm        | MAK-Wert (DE) — Grenze 8h-Arbeitszeit        |
| > 40000 ppm       | Akute Gefahr (sehr seltene Innenräume)       |

**Studie Harvard (2015):** Bei CO₂-Reduktion von 1000 auf 550 ppm verbessern sich kognitive Leistungsscores um 50–100 %. Gute Raumluft ist produktivitätssteigernd.

### DCV-Regelung mit CO₂

```
CO₂-Sensor misst: 950 ppm
Soll: < 800 ppm
→ Lüftungsrate erhöhen (VAV-Box aufmachen, FU beschleunigen)

CO₂ sinkt auf 700 ppm:
→ Lüftungsrate reduzieren (Energie sparen)
```

---

## VOC — Flüchtige Organische Verbindungen

**VOC** = Volatile Organic Compounds — breite Klasse von Verbindungen:

- Formaldehyd (Möbel, Spanplatten)
- Toluol, Xylol (Farben, Lacke)
- Limonene, Alpha-Pinen (Reinigungsmittel, natürlich)
- Aceton (Nagellack)

### Messung

VOC-Sensoren messen meist die **Summe** aller VOC (TVOC = Total VOC), nicht spezifische Verbindungen. Einheit: µg/m³ oder ppm Ethanol-Äquivalent.

**Grenzwerte:**

- WHO: TVOC < 300 µg/m³ (Komfort), < 3000 µg/m³ (Grenzwert)
- EU: Produktvorschriften für Formaldehyd in Holzwerkstoffen

### Einsatz in GA

VOC-Sensoren als Ergänzung zu CO₂ — vor allem in:

- Sanitärräumen (Gerüche)
- Küchen
- Konferenzräumen nach langer Belegung
- Chemie-Labors (Konzentration flüchtiger Stoffe)

> **Wichtig:** VOC-Sensor kann CO₂-Sensor **nicht ersetzen** — misst andere Verbindungen, keine absolute Kalibrierung.

---

## Feinststaub und Partikel

### Partikelgrössen

| Bezeichnung | Grösse   | Herkunft                        | Gesundheitseffekt     |
| ----------- | -------- | ------------------------------- | --------------------- |
| PM10        | ≤ 10 µm  | Strassenstaub, Pollen           | Atemwege obere        |
| PM2.5       | ≤ 2.5 µm | Verbrennungsprozesse, Diesel    | Lungenalveolen        |
| PM1         | ≤ 1 µm   | Ultrafeine Verbrennungspartikel | Blutkreislauf         |
| UFP         | ≤ 0.1 µm | Frisch gebildete Partikel       | Sehr tief eindringend |

**WHO Richtwerte (2021):** PM2.5 Jahresmittel ≤ 5 µg/m³ (verschärft), PM10 ≤ 15 µg/m³

### Partikel in Innenräumen

- Aussenluft filtern (F7 oder F9 Zuluftfilter)
- Innenquellen: Kochen (PM2.5!), Drucker (Toner), Kerzen, Tabakrauch
- Lüftungsanlage mit guten Filtern schützt vor Aussenluft-Partikel
- Gegen Innenquellen: Luftreiniger oder mehr Frischluft

---

## Kombisensoren in der GA

Moderne Raumluftqualitätssensoren messen mehrere Parameter:

| Sensor-Typ               | Gemessene Grössen        | Ausgangssignal |
| ------------------------ | ------------------------ | -------------- |
| CO₂ + T + rF             | CO₂, Temperatur, Feuchte | Modbus, 0–10V  |
| IAQ (Indoor Air Quality) | CO₂, VOC, T, rF, PM      | Modbus         |
| PM-Sensor                | PM1, PM2.5, PM10         | Modbus, 4–20mA |

**Typischer Raumfühler GA:** CO₂ + Temperatur + Feuchte (3-in-1), Modbus-RTU, Wandmontage.

---

## Mindest-Luftmengen nach Nutzung

EN 16798 / EN 13779 definiert Luftmengen für verschiedene Nutzungen:

| Nutzung      | IDA-Klasse | Volumenstrom (Person) |
| ------------ | ---------- | --------------------- |
| Büro         | IDA 2      | 36 m³/(h·Person)      |
| Konferenz    | IDA 2      | 36 m³/(h·Person)      |
| Schulzimmer  | IDA 1      | 54 m³/(h·Person)      |
| Hotel Zimmer | IDA 2      | 36 m³/(h·Person)      |
| Gastronomie  | IDA 3      | 29 m³/(h·Person)      |

Diese Werte gelten für die **Auslegung** (Volllastbetrieb). DCV reduziert im Teillastbetrieb proportional.

## Normen

- **EN 16798-1** — Energetische Bewertung von Gebäuden, Eingangsparameter Innenraumklima
- **EN 13779** — Lüftung von Nichtwohngebäuden, Anforderungen Raumluftsysteme
- **WHO Air Quality Guidelines (2021)** — Grenzwerte PM, NO₂, Ozon
- **SWKI VA102-01** (CH) — Lüftungs- und Klimaanlagen

<!-- EN -->

People spend 90 % of their time indoors. Air quality directly affects health, wellbeing, and cognitive performance. BA can optimise both comfort and energy efficiency through demand-controlled ventilation.

## Air Categories (EN 16798-1 / EN 13779)

### Outdoor Air (ODA)

| Class | Description           | Pre-filter                   |
| ----- | --------------------- | ---------------------------- |
| ODA 1 | Clean air, dust only  | F7                           |
| ODA 2 | Dust + odours (urban) | F7 + activated carbon        |
| ODA 3 | Heavily polluted      | F7 + high-performance filter |

### Indoor Air (IDA)

| Class     | Description    | CO₂ above outdoor air | Application              |
| --------- | -------------- | --------------------- | ------------------------ |
| **IDA 1** | High quality   | ≤ 400 ppm             | Kindergartens, clinics   |
| **IDA 2** | Good quality   | ≤ 800 ppm             | Offices, schools, hotels |
| **IDA 3** | Medium quality | ≤ 1350 ppm            | Simple offices           |
| **IDA 4** | Low quality    | > 1350 ppm            | Not recommended          |

**Outdoor air reference:** 400–420 ppm CO₂ (2024, rising ~2 ppm/year).

---

## CO₂ — Primary Indicator of Occupancy

CO₂ is the most important signal for **demand-controlled ventilation** (DCV):

### Why CO₂?

People exhale CO₂ (~38,000 ppm in exhaled air). More people → more CO₂. CO₂ correlates directly with occupancy density and fresh air demand.

### Limit Values and Effects

| CO₂ concentration | Effect                              |
| ----------------- | ----------------------------------- |
| 400–800 ppm       | Fresh air, good concentration       |
| 800–1000 ppm      | Mild fatigue in sensitive persons   |
| 1000–1500 ppm     | Noticeable reduction in performance |
| > 1500 ppm        | Headaches, drowsiness               |
| > 5000 ppm        | OEL (DE) — 8-hour working limit     |
| > 40,000 ppm      | Acute danger (very rare indoors)    |

**Harvard study (2015):** Reducing CO₂ from 1000 to 550 ppm improves cognitive performance scores by 50–100 %. Good indoor air quality increases productivity.

### DCV Control with CO₂

```
CO₂ sensor reads: 950 ppm
Setpoint: < 800 ppm
→ Increase ventilation rate (open VAV box, accelerate VSD)

CO₂ drops to 700 ppm:
→ Reduce ventilation rate (save energy)
```

---

## VOC — Volatile Organic Compounds

**VOC** = a broad class of compounds:

- Formaldehyde (furniture, chipboard)
- Toluene, xylene (paints, varnishes)
- Limonene, alpha-pinene (cleaning products, natural)
- Acetone (nail polish)

### Measurement

VOC sensors typically measure the **sum** of all VOCs (TVOC = Total VOC), not individual compounds. Unit: µg/m³ or ppm ethanol equivalent.

**Limit values:**

- WHO: TVOC < 300 µg/m³ (comfort), < 3000 µg/m³ (limit)
- EU: product regulations for formaldehyde in wood-based panels

### Application in BA

VOC sensors complement CO₂ — especially in:

- Sanitary areas (odours)
- Kitchens
- Conference rooms after extended occupancy
- Chemistry laboratories (concentration of volatile substances)

> **Important:** A VOC sensor **cannot replace** a CO₂ sensor — it measures different compounds and has no absolute calibration.

---

## Particulate Matter and Particles

### Particle Sizes

| Designation | Size     | Source                          | Health effect         |
| ----------- | -------- | ------------------------------- | --------------------- |
| PM10        | ≤ 10 µm  | Road dust, pollen               | Upper airways         |
| PM2.5       | ≤ 2.5 µm | Combustion, diesel              | Lung alveoli          |
| PM1         | ≤ 1 µm   | Ultra-fine combustion particles | Bloodstream           |
| UFP         | ≤ 0.1 µm | Freshly formed particles        | Very deep penetration |

**WHO guideline values (2021):** PM2.5 annual mean ≤ 5 µg/m³ (tightened), PM10 ≤ 15 µg/m³

### Particles Indoors

- Filter outdoor air (F7 or F9 supply air filter)
- Indoor sources: cooking (PM2.5!), printers (toner), candles, tobacco smoke
- AHU with good filters protects against outdoor air particles
- Against indoor sources: air purifiers or increased fresh air supply

---

## Combination Sensors in BA

Modern indoor air quality sensors measure multiple parameters:

| Sensor type              | Measured quantities        | Output signal   |
| ------------------------ | -------------------------- | --------------- |
| CO₂ + T + RH             | CO₂, temperature, humidity | Modbus, 0–10 V  |
| IAQ (Indoor Air Quality) | CO₂, VOC, T, RH, PM        | Modbus          |
| PM sensor                | PM1, PM2.5, PM10           | Modbus, 4–20 mA |

**Typical room sensor in BA:** CO₂ + temperature + humidity (3-in-1), Modbus RTU, wall mounting.

---

## Minimum Air Flow Rates by Use

EN 16798 / EN 13779 defines air flow rates for various uses:

| Use        | IDA class | Flow rate (per person) |
| ---------- | --------- | ---------------------- |
| Office     | IDA 2     | 36 m³/(h·person)       |
| Conference | IDA 2     | 36 m³/(h·person)       |
| Classroom  | IDA 1     | 54 m³/(h·person)       |
| Hotel room | IDA 2     | 36 m³/(h·person)       |
| Restaurant | IDA 3     | 29 m³/(h·person)       |

These values apply for **design** (full load). DCV reduces proportionally in part-load operation.

## Standards

- **EN 16798-1** — Energy performance of buildings, input parameters for indoor climate
- **EN 13779** — Ventilation of non-residential buildings, requirements for ventilation systems
- **WHO Air Quality Guidelines (2021)** — Limits for PM, NO₂, ozone
- **SWKI VA102-01** (CH) — Ventilation and air conditioning systems
