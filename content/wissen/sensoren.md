---
title: Sensoren in der GA — Überblick
title_en: Sensors in BA — Overview
slug: sensoren
category: signale
subcategory: sensoren
tags:
  [
    sensor,
    pt100,
    pt1000,
    ntc,
    drucksensor,
    durchflussmessung,
    co2-sensor,
    ndir,
    voc,
    feuchtesensor,
    pir,
    radar,
    helligkeitssensor,
    waermemengenzaehler,
    kalibrierung,
    transmitter
  ]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related:
  [
    signaltypen,
    mbus,
    alarmmanagement,
    vdi6022,
    rlt-anlage,
    drucksensoren,
    durchflussmessung,
    co2-sensoren,
    voc-sensoren,
    feuchtesensoren,
    praesenzsensoren,
    helligkeitssensoren
  ]
norm: [IEC 60751, EN ISO 16890, EN 14511]
updated: 2026-05-14
lang: de
---

# Sensoren in der GA — Überblick

Sensoren sind die Sinnesorgane der Gebäudeautomation. Ohne korrekte Messungen gibt es keine korrekte Regelung. Dieser Artikel behandelt die in der GA am häufigsten eingesetzten Sensortypen — Messprinzip, Kennwerte, Einbau und typische Fehler.

## Temperatursensoren

### PT100 vs. PT1000

Beide sind **Widerstandstemperaturfühler** (RTD = Resistance Temperature Detector) aus Platin:

| Eigenschaft         | PT100               | PT1000                |
| ------------------- | ------------------- | --------------------- |
| Widerstand bei 0 °C | 100 Ω               | 1000 Ω                |
| Kennlinien-Steigung | 0.385 Ω/K           | 3.85 Ω/K              |
| Empfindlichkeit     | Niedrig             | 10× höher als PT100   |
| Leitungswiderstand  | Kritisch (2-Draht!) | Unkritisch bis ~100 m |
| Genauigkeit         | Klasse A: ±0.15 K   | Klasse A: ±0.15 K     |
| Einsatz GA          | Eher Industrie      | **GA-Standard**       |

**Warum PT1000 in der GA?**
Leitungswiderstand eines 0.5 mm² Kabels: ~36 Ω/100 m. Bei PT100 ergibt das einen Messfehler von ~93 K — untauglich! Bei PT1000 derselbe Widerstand: ~9 K Fehler. Mit 2-Draht und max. 50 m noch vertretbar. Mit Kabeln > 50 m: 4-Draht-Anschluss verwenden.

**4-Draht-Anschluss (Kelvin):** Messstrom und Spannungsmessung auf getrennten Adern → Leitungswiderstand hat null Einfluss.

### NTC (Negative Temperature Coefficient)

- Halbleiterwiderstand: Widerstand sinkt mit steigender Temperatur (nichtlinear)
- Sehr grosse Widerstandsänderung (z.B. 10 kΩ → 1 kΩ bei 25 → 50 °C)
- **Typisch:** Einfache Raumfühler, günstige Anwendungen
- **Nachteil:** Nichtlinear → Linearisierung im DDC nötig; Toleranzen grösser als PT1000

### Einbau-Tipps Temperatursensoren

- **Tauchhülse:** Sensor in Rohr eingebaut, Wärmeleitpaste verwenden
- **Anlegefühler:** An Rohraussen befestigt, gut isolieren (Umgebungsluft verfälscht!)
- **Kanalfühler:** Im Luftkanal, Positionierung in gut durchmischter Zone (nicht hinter Umlenkung)
- **Raumfühler:** Auf Innenwand, 1.5 m Höhe, kein Sonneneinfall, kein Zug

---

## Drucksensoren

### Typen

| Typ                | Misst was                         | Einsatz in GA                   |
| ------------------ | --------------------------------- | ------------------------------- |
| **Absolutdruck**   | Druck relativ zum Vakuum          | Selten (meteorologisch)         |
| **Relativdruck**   | Druck relativ zur Atmosphäre      | Systemdruck Heizung, Kälte      |
| **Differenzdruck** | Druckdifferenz zwischen 2 Punkten | Filter, Pumpen, Durchfluss, VAV |

### Differenzdrucksensor (häufigster GA-Einsatz)

```
Hochdruckseite ──────┐
                     ├── [Differenzdruckmembran] → 4-20 mA oder 0-10 V
Niederdruckseite ────┘
```

**Typische Anwendungen:**

- Filterwächter (Druckverlust über Filter → Verschmutzungsanzeige)
- Durchflussmessung (Blende + Δp → V̇ berechnen via Bernoulli)
- Pumpenstatus (Δp über Pumpe → Laufmeldung)
- VAV-Box Volumenstromregler

**Einbauhinweise:**

- Messbohrungen **senkrecht** zur Strömungsrichtung (Staudruck vermeiden)
- Absperrventile (Nadelventile) für Wartung/Kalibrierung vorsehen
- Ausgleichsleitung (Bypass) für Nullpunktsabgleich vorsehen

---

## Durchflussmessung

### Magnetisch-induktiv (MID)

**Prinzip:** Spule erzeugt Magnetfeld. Leitendes Fluid induziert Spannung proportional zur Strömungsgeschwindigkeit (Faraday).

| Eigenschaft    | Wert                                            |
| -------------- | ----------------------------------------------- |
| Messmedium     | Leitfähige Flüssigkeit (Heizwasser, Kaltwasser) |
| Genauigkeit    | ±0.5 % (Klasse 1)                               |
| Druckverlust   | Minimal (kein Einbauelement)                    |
| Einbaulängen   | 5× DN Vorlauf, 3× DN Nachlauf                   |
| Ausgangssignal | 4–20 mA, Puls oder Modbus                       |

### Ultraschall

**Prinzip:** Laufzeitdifferenz von Ultraschallpulsen in und gegen die Strömungsrichtung.

| Eigenschaft      | Wert                                  |
| ---------------- | ------------------------------------- |
| Messmedium       | Jede Flüssigkeit (auch nicht-leitend) |
| Genauigkeit      | ±1–3 %                                |
| Clamp-on möglich | Ja (kein Eingriff in Rohr!)           |
| Einbaulängen     | 10–15× DN (kritischer als MID)        |
| Einsatz GA       | Kälte, Warm-/Kaltwasser-Monitoring    |

### Wärme-/Kältemengenberechnung

Aus Durchfluss + Temperaturdifferenz:

```
Q [kW] = V̇ [m³/h] × ρ × cp × ΔT [K] / 3.6

Für Wasser (vereinfacht):
Q [kW] ≈ V̇ [m³/h] × 1.163 × ΔT [K]
```

Wärmemengenzähler kombinieren Durchflussmesser + 2 Temperaturfühler + Integrator.

---

## CO₂-Sensoren (NDIR-Prinzip)

**NDIR** = Non-Dispersive Infrared — Standardverfahren für CO₂-Messung in GA und Lüftung.

### Messprinzip

CO₂-Moleküle absorbieren Infrarotlicht bei 4.26 µm. Sensor vergleicht Transmission durch das Messgas mit einem Referenzpfad:

```
IR-Quelle → [Messgas-Kammer] → Detektor (4.26 µm Filter)
         → [Referenz-Kammer] → Detektor
Verhältnis → CO₂-Konzentration in ppm
```

### Kenngrössen

| Parameter        | Typischer Wert                       |
| ---------------- | ------------------------------------ |
| Messbereich      | 0–2000 ppm (Innenraum), bis 5000 ppm |
| Genauigkeit      | ±50 ppm oder ±3 % Messwert           |
| Ansprechzeit T90 | 1–3 Minuten                          |
| Kalibrierung     | Alle 2–5 Jahre empfohlen             |
| Ausgangssignal   | 0–10 V, 4–20 mA, Modbus              |

### Automatic Background Calibration (ABC)

Viele Sensoren kalibrieren sich automatisch: sie gehen davon aus, dass der niedrigste Wert innerhalb von 14 Tagen der Aussenluft-CO₂-Wert (~420 ppm) entspricht.

> Wichtig: ABC-Kalibrierung funktioniert nur wenn das Gebäude regelmässig vollständig gelüftet wird. In Serverräumen oder 24/7-Betrieb ABC deaktivieren oder manuelle Kalibrierung planen.

### Alarm-Grenzwerte (EN 16798)

| Raumkategorie | Grenzwert (CO₂ über Aussenluft) | Qualität |
| ------------- | ------------------------------- | -------- |
| IDA 1         | ≤ 400 ppm (ca. 800 ppm abs.)    | Sehr gut |
| IDA 2         | ≤ 800 ppm                       | Gut      |
| IDA 3         | ≤ 1350 ppm                      | Mittel   |
| IDA 4         | > 1350 ppm                      | Schlecht |

---

## VOC-Sensoren

**VOC** = Volatile Organic Compounds (flüchtige organische Verbindungen).

- **Messprinzip:** Meist Metal Oxide Semiconductor (MOS) — Widerstandsänderung durch Adsorption
- **Was messen sie:** Summe vieler Verbindungen (Lösungsmittel, Reiniger, Ausdünstungen) — nicht spezifisch!
- **Einheit:** typisch in ppm Ethanol-Äquivalent, oder einfach 0–500 Indexwert
- **Keine Zertifizierung** nach Hygienenorm — Orientierungswert, kein Rechtsstandard
- **Einsatz:** Sanitärräume, Küchen, Konferenzräume als Lüftungstrigger

> VOC-Sensoren eignen sich als **Ergänzung** zu CO₂ aber nicht als Ersatz. CO₂ = Menschen; VOC = chemische Belastung.

---

## Präsenz- und Bewegungsmelder

| Typ                    | Messprinzip      | Erkennt                      | Typischer Einsatz             |
| ---------------------- | ---------------- | ---------------------------- | ----------------------------- |
| **PIR**                | Passiv Infrarot  | Bewegung                     | Beleuchtung, einfache Präsenz |
| **Radar (Mikrowelle)** | Doppler          | Auch statische Personen      | Büro (sitzende Person!), HVAC |
| **Kamera/KI**          | Bildanalyse      | Personenzahl, Positionierung | Höherwertige Anwendungen      |
| **CO₂**                | Indirekt via CO₂ | Belegung (mit Verzögerung)   | Lüftungssteuerung             |

**PIR-Einschränkung:** Erkennt nur Bewegung. Sitzende Person am Schreibtisch → PIR sieht sie nicht nach 10 Minuten! → Licht/Lüftung schaltet ab trotz Belegung.

**Radar:** Erkennt auch minimale Bewegung (Atemexkursion). Ideal für Büro-Lüftungssteuerung und Bedarfsregelung.

---

## Feuchtesensoren

- **Messprinzip:** Kapazitiv — Dielektrikum ändert sich mit Feuchte
- **Messgrösse:** Relative Feuchte (%) und optional Temperatur (für absolute Feuchte g/kg)
- **Genauigkeit:** ±2–5 % rF (typisch)
- **Kalibrierung:** Drift über Zeit, alle 2–3 Jahre prüfen
- **Einsatz:** Zuluft, Abluft, Raum, Aussenluft

Kombisensoren (T + rF) sind in der Lüftungsregelung Standard.

---

## Helligkeitssensoren

- **Messprinzip:** Photodiode (siliziumbasiert), spektral angepasst
- **Einheit:** Lux [lx] oder Globalstrahlung [W/m²]
- **Innenraum-Sensoren:** 0–2000 lx für Konstantlichtregelung
- **Aussenlichtsensor:** 0–100 klx für Beschattungssteuerung
- **Einbau:** Keine Verschattung, keine Reflexionen, Referenzpunkt definieren

---

## Normen

- **IEC 60751** — Platin-Widerstandstemperaturfühler (PT100/PT1000)
- **EN 14511** — Klimaanlagen, Wärmepumpen — Prüfbedingungen
- **EN ISO 16890** — Luftfilter (Partikelgrössen, Effizienzklassen)
- **EN 16798-1** — Raumluftkategorien (IDA 1–4), CO₂-Grenzwerte

<!-- EN -->

# Sensors in BA — Overview

Sensors are the sense organs of building automation. Without correct measurements there is no correct control. This article covers the most commonly used sensor types in BA — measuring principle, characteristics, installation and typical faults.

## Temperature Sensors

### PT100 vs. PT1000

Both are **resistance temperature detectors** (RTD) made of platinum:

| Property             | PT100              | PT1000                  |
| -------------------- | ------------------ | ----------------------- |
| Resistance at 0 °C   | 100 Ω              | 1000 Ω                  |
| Characteristic slope | 0.385 Ω/K          | 3.85 Ω/K                |
| Sensitivity          | Low                | 10× higher than PT100   |
| Cable resistance     | Critical (2-wire!) | Uncritical up to ~100 m |
| Accuracy             | Class A: ±0.15 K   | Class A: ±0.15 K        |
| Use in BA            | More industrial    | **BA standard**         |

**Why PT1000 in BA?**
Cable resistance of a 0.5 mm² cable: ~36 Ω/100 m. With PT100 this gives a measurement error of ~93 K — unusable! With PT1000 the same resistance gives ~9 K error. With 2-wire and max. 50 m still acceptable. For cables > 50 m: use 4-wire connection.

**4-wire connection (Kelvin):** Measurement current and voltage measurement on separate conductors → cable resistance has zero influence.

### NTC (Negative Temperature Coefficient)

- Semiconductor resistor: resistance decreases with rising temperature (non-linear)
- Very large resistance change (e.g. 10 kΩ → 1 kΩ at 25 → 50 °C)
- **Typical:** Simple room sensors, low-cost applications
- **Disadvantage:** Non-linear → linearisation required in DDC; tolerances larger than PT1000

### Installation Tips — Temperature Sensors

- **Immersion sleeve:** sensor installed in pipe, use heat transfer compound
- **Surface sensor:** attached to pipe exterior, insulate well (ambient air distorts reading!)
- **Duct sensor:** in air duct, position in well-mixed zone (not behind a bend)
- **Room sensor:** on interior wall, 1.5 m height, no direct sunlight, no draught

---

## Pressure Sensors

### Types

| Type                      | Measures                             | BA application                   |
| ------------------------- | ------------------------------------ | -------------------------------- |
| **Absolute pressure**     | Pressure relative to vacuum          | Rare (meteorological)            |
| **Gauge pressure**        | Pressure relative to atmosphere      | System pressure heating, cooling |
| **Differential pressure** | Pressure difference between 2 points | Filters, pumps, flow, VAV        |

### Differential Pressure Sensor (Most Common in BA)

```
High-pressure side ──────┐
                         ├── [Differential pressure membrane] → 4–20 mA or 0–10 V
Low-pressure side ───────┘
```

**Typical applications:**

- Filter monitor (pressure drop across filter → fouling indicator)
- Flow measurement (orifice + Δp → calculate V̇ via Bernoulli)
- Pump status (Δp across pump → run signal)
- VAV box volume flow controller

**Installation notes:**

- Measurement tappings **perpendicular** to flow direction (avoid dynamic pressure)
- Provide isolation valves (needle valves) for maintenance/calibration
- Provide equalisation line (bypass) for zero adjustment

---

## Flow Measurement

### Electromagnetic (MID)

**Principle:** Coil generates magnetic field. Conductive fluid induces voltage proportional to flow velocity (Faraday).

| Property              | Value                                            |
| --------------------- | ------------------------------------------------ |
| Measurement medium    | Conductive liquid (heating water, chilled water) |
| Accuracy              | ±0.5 % (Class 1)                                 |
| Pressure drop         | Minimal (no insert element)                      |
| Straight run required | 5× DN upstream, 3× DN downstream                 |
| Output signal         | 4–20 mA, pulse or Modbus                         |

### Ultrasonic

**Principle:** Transit time difference of ultrasonic pulses with and against flow direction.

| Property              | Value                                     |
| --------------------- | ----------------------------------------- |
| Measurement medium    | Any liquid (including non-conductive)     |
| Accuracy              | ±1–3 %                                    |
| Clamp-on possible     | Yes (no pipe intrusion!)                  |
| Straight run required | 10–15× DN (more critical than MID)        |
| BA application        | Cooling, heating/chilled water monitoring |

### Heat / Cooling Energy Calculation

From flow + temperature difference:

```
Q [kW] = V̇ [m³/h] × ρ × cp × ΔT [K] / 3.6

For water (simplified):
Q [kW] ≈ V̇ [m³/h] × 1.163 × ΔT [K]
```

Heat meters combine flow meter + 2 temperature sensors + integrator.

---

## CO₂ Sensors (NDIR Principle)

**NDIR** = Non-Dispersive Infrared — standard method for CO₂ measurement in BA and ventilation.

### Measuring Principle

CO₂ molecules absorb infrared light at 4.26 µm. The sensor compares transmission through the measurement gas with a reference path:

```
IR source → [Measurement gas chamber] → Detector (4.26 µm filter)
          → [Reference chamber] → Detector
Ratio → CO₂ concentration in ppm
```

### Key Parameters

| Parameter         | Typical value                       |
| ----------------- | ----------------------------------- |
| Measuring range   | 0–2000 ppm (indoor), up to 5000 ppm |
| Accuracy          | ±50 ppm or ±3 % of reading          |
| Response time T90 | 1–3 minutes                         |
| Calibration       | Recommended every 2–5 years         |
| Output signal     | 0–10 V, 4–20 mA, Modbus             |

### Automatic Background Calibration (ABC)

Many sensors self-calibrate: they assume the lowest value within 14 days corresponds to outdoor CO₂ (~420 ppm).

> Important: ABC calibration only works if the building is regularly fully ventilated. In server rooms or 24/7 operation, disable ABC or plan manual calibration.

### Alarm Limits (EN 16798)

| Room category | Limit (CO₂ above outdoor)        | Quality   |
| ------------- | -------------------------------- | --------- |
| IDA 1         | ≤ 400 ppm (approx. 800 ppm abs.) | Very good |
| IDA 2         | ≤ 800 ppm                        | Good      |
| IDA 3         | ≤ 1350 ppm                       | Medium    |
| IDA 4         | > 1350 ppm                       | Poor      |

---

## VOC Sensors

**VOC** = Volatile Organic Compounds.

- **Measuring principle:** Mainly metal oxide semiconductor (MOS) — resistance change via adsorption
- **What they measure:** Sum of many compounds (solvents, cleaners, off-gassing) — not specific!
- **Unit:** Typically ppm ethanol equivalent, or a simple 0–500 index value
- **No certification** to hygiene standard — indicative value, not a legal standard
- **Application:** Sanitary rooms, kitchens, conference rooms as ventilation trigger

> VOC sensors are suitable as a **complement** to CO₂ but not as a replacement. CO₂ = people; VOC = chemical load.

---

## Presence and Motion Detectors

| Type                  | Measuring principle | Detects                     | Typical application           |
| --------------------- | ------------------- | --------------------------- | ----------------------------- |
| **PIR**               | Passive infrared    | Movement                    | Lighting, simple presence     |
| **Radar (microwave)** | Doppler             | Also stationary persons     | Office (seated person!), HVAC |
| **Camera / AI**       | Image analysis      | Occupant count, positioning | Higher-value applications     |
| **CO₂**               | Indirect via CO₂    | Occupancy (with delay)      | Ventilation control           |

**PIR limitation:** Detects movement only. Seated person at desk → PIR loses detection after ~10 minutes! → Lighting/ventilation turns off despite occupancy.

**Radar:** Detects even minimal movement (breathing excursion). Ideal for office ventilation control and demand-based regulation.

---

## Humidity Sensors

- **Measuring principle:** Capacitive — dielectric changes with humidity
- **Measured variable:** Relative humidity (%) and optionally temperature (for absolute humidity g/kg)
- **Accuracy:** ±2–5 % RH (typical)
- **Calibration:** Drift over time, check every 2–3 years
- **Application:** Supply air, exhaust air, room, outdoor air

Combination sensors (T + RH) are standard in ventilation control.

---

## Brightness Sensors

- **Measuring principle:** Photodiode (silicon-based), spectrally adjusted
- **Unit:** Lux [lx] or global irradiance [W/m²]
- **Indoor sensors:** 0–2000 lx for constant light control
- **Outdoor light sensor:** 0–100 klx for shading control
- **Installation:** No shading, no reflections, define reference point

---

## Standards

- **IEC 60751** — Platinum resistance temperature sensors (PT100/PT1000)
- **EN 14511** — Air conditioners, heat pumps — test conditions
- **EN ISO 16890** — Air filters (particle sizes, efficiency classes)
- **EN 16798-1** — Indoor air quality categories (IDA 1–4), CO₂ limits
