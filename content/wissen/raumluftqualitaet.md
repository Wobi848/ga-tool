---
title: Raumluftqualität — CO₂, VOC, Partikel
slug: raumluftqualitaet
category: lueftung
subcategory: luftqualitaet
tags: [raumluftqualitaet, co2, voc, partikel, feinststaub, ida, oda, lüftung, ventilation, sick-building, innenraumluft, grenzwerte, dcv, bedarfsregelung, en16798]
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

| Klasse | Beschreibung               | Vorfilter     |
|--------|----------------------------|---------------|
| ODA 1  | Reine Luft, nur Staub      | F7            |
| ODA 2  | Staub + Gerüche (urban)    | F7 + Aktivkohle |
| ODA 3  | Stark verschmutzt          | F7 + Hochleistungsfilter |

### Innenluft (IDA — Indoor Air)

| Klasse | Beschreibung          | CO₂ über Aussenluft | Anwendung           |
|--------|-----------------------|---------------------|---------------------|
| **IDA 1** | Hohe Qualität      | ≤ 400 ppm           | Kindergärten, Kliniken |
| **IDA 2** | Gute Qualität      | ≤ 800 ppm           | Büros, Schulen, Hotels |
| **IDA 3** | Mittlere Qualität  | ≤ 1350 ppm          | Einfache Büros      |
| **IDA 4** | Niedrige Qualität  | > 1350 ppm          | Nicht empfohlen     |

**Aussenluft-Referenz:** 400–420 ppm CO₂ (2024, steigend ~2 ppm/Jahr).

---

## CO₂ — Hauptindikator für Belegung

CO₂ ist das wichtigste Signal für **bedarfsgeführte Lüftung** (DCV — Demand Controlled Ventilation):

### Warum CO₂?

Menschen atmen CO₂ aus (~38000 ppm in der Ausatemluft). Mehr Menschen → mehr CO₂. CO₂ korreliert direkt mit der Belegungsdichte und dem Frischluftbedarf.

### Grenzwerte und Wirkung

| CO₂-Konzentration | Wirkung                                     |
|-------------------|---------------------------------------------|
| 400–800 ppm       | Frische Luft, gute Konzentration            |
| 800–1000 ppm      | Leichte Müdigkeit bei empfindlichen Personen |
| 1000–1500 ppm     | Merkliche Leistungsminderung               |
| > 1500 ppm        | Kopfschmerzen, Schläfrigkeit               |
| > 5000 ppm        | MAK-Wert (DE) — Grenze 8h-Arbeitszeit      |
| > 40000 ppm       | Akute Gefahr (sehr seltene Innenräume)     |

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

| Bezeichnung | Grösse      | Herkunft                              | Gesundheitseffekt   |
|-------------|-------------|---------------------------------------|---------------------|
| PM10        | ≤ 10 µm     | Strassenstaub, Pollen                 | Atemwege obere     |
| PM2.5       | ≤ 2.5 µm    | Verbrennungsprozesse, Diesel           | Lungenalveolen     |
| PM1         | ≤ 1 µm      | Ultrafeine Verbrennungspartikel       | Blutkreislauf      |
| UFP         | ≤ 0.1 µm    | Frisch gebildete Partikel             | Sehr tief eindringend|

**WHO Richtwerte (2021):** PM2.5 Jahresmittel ≤ 5 µg/m³ (verschärft), PM10 ≤ 15 µg/m³

### Partikel in Innenräumen

- Aussenluft filtern (F7 oder F9 Zuluftfilter)
- Innenquellen: Kochen (PM2.5!), Drucker (Toner), Kerzen, Tabakrauch
- Lüftungsanlage mit guten Filtern schützt vor Aussenluft-Partikel
- Gegen Innenquellen: Luftreiniger oder mehr Frischluft

---

## Kombisensoren in der GA

Moderne Raumluftqualitätssensoren messen mehrere Parameter:

| Sensor-Typ          | Gemessene Grössen              | Ausgangssignal  |
|---------------------|-------------------------------|-----------------|
| CO₂ + T + rF        | CO₂, Temperatur, Feuchte      | Modbus, 0–10V   |
| IAQ (Indoor Air Quality) | CO₂, VOC, T, rF, PM    | Modbus          |
| PM-Sensor           | PM1, PM2.5, PM10              | Modbus, 4–20mA  |

**Typischer Raumfühler GA:** CO₂ + Temperatur + Feuchte (3-in-1), Modbus-RTU, Wandmontage.

---

## Mindest-Luftmengen nach Nutzung

EN 16798 / EN 13779 definiert Luftmengen für verschiedene Nutzungen:

| Nutzung              | IDA-Klasse | Volumenstrom (Person) |
|----------------------|------------|-----------------------|
| Büro                 | IDA 2      | 36 m³/(h·Person)      |
| Konferenz            | IDA 2      | 36 m³/(h·Person)      |
| Schulzimmer          | IDA 1      | 54 m³/(h·Person)      |
| Hotel Zimmer         | IDA 2      | 36 m³/(h·Person)      |
| Gastronomie          | IDA 3      | 29 m³/(h·Person)      |

Diese Werte gelten für die **Auslegung** (Volllastbetrieb). DCV reduziert im Teillastbetrieb proportional.

## Normen

- **EN 16798-1** — Energetische Bewertung von Gebäuden, Eingangsparameter Innenraumklima
- **EN 13779** — Lüftung von Nichtwohngebäuden, Anforderungen Raumluftsysteme
- **WHO Air Quality Guidelines (2021)** — Grenzwerte PM, NO₂, Ozon
- **SWKI VA102-01** (CH) — Lüftungs- und Klimaanlagen
