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

norm: [IEC 60751, EN ISO 16890, EN 16798-1]
updated: 2026-10-14
lang: de
---

# Sensoren in der GA — Überblick

Sensoren sind die Sinnesorgane der Gebäudeautomation. Ohne korrekte Messungen gibt es keine korrekte Regelung. Dieser Artikel behandelt die in der GA am häufigsten eingesetzten Sensortypen — Messprinzip, Kennwerte, Einbau und typische Fehler.

## Temperatursensoren

> Detaillierter Vertiefungs-Artikel: **[Temperaturfühler — RTD, NTC und aktive Spannungsfühler](/wissen/temperaturfuehler)** (inkl. NI1000-Varianten TK6180/TK5000 und LMx35-Familie 10 mV/K).

### PT100 vs. PT1000

Beide sind **Widerstandstemperaturfühler** (RTD = Resistance Temperature Detector) aus Platin:

| Eigenschaft         | PT100                           | PT1000                                    |
| ------------------- | ------------------------------- | ----------------------------------------- |
| Widerstand bei 0 °C | 100 Ω                           | 1000 Ω                                    |
| Kennlinien-Steigung | 0.385 Ω/K                       | 3.85 Ω/K                                  |
| Empfindlichkeit     | Niedrig                         | 10× höher als PT100                       |
| Leitungswiderstand  | Kritisch, 2-Draht nur sehr kurz | Klein, mit Kompensation bis rund 50–100 m |
| Genauigkeit         | Klasse A: ±0.15 K               | Klasse A: ±0.15 K                         |
| Einsatz GA          | Eher Industrie                  | **GA-Standard**                           |

**Warum PT1000 in der GA?**
Ein Kupferkabel mit 0.5 mm² hat rund 3.6 Ω pro 100 m Ader. Bei 50 m Kabel und 2-Draht-Anschluss liegen Hin- und Rückleiter in Reihe, zusammen 3.6 Ω. Bei PT100 ergibt das einen Fehler von rund 9 K, bei PT1000 von rund 0.9 K. Die meisten DDC können einen festen Leitungswiderstand abziehen. Für lange Leitungen oder hohe Genauigkeit 3- oder 4-Draht-Anschluss verwenden.

**4-Draht-Anschluss (Kelvin):** Messstrom und Spannungsmessung auf getrennten Adern → Leitungswiderstand hat null Einfluss.

### NTC (Negative Temperature Coefficient)

- Halbleiterwiderstand: Widerstand sinkt mit steigender Temperatur (nichtlinear)
- Grosse Widerstandsänderung, zum Beispiel NTC 10k: 10 kΩ bei 25 °C, rund 3.6 kΩ bei 50 °C
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

Die Membran trennt Plus- und Minusseite. Ihre Auslenkung wird elektrisch erfasst und als 0–10 V, 4–20 mA oder über den Bus ausgegeben.

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
| Genauigkeit    | ±0.5 % vom Messwert, je nach Gerät              |
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

<p class="formel">Q [kW] = V̇ [m³/h] · ρ [kg/m³] · c<sub>p</sub> [kJ/(kg·K)] · ΔT [K] / 3600</p>

Für Wasser vereinfacht:

<p class="formel">Q [kW] ≈ 1.163 · V̇ [m³/h] · ΔT [K]</p>

Wärmemengenzähler kombinieren Durchflussmesser + 2 Temperaturfühler + Integrator.

---

## CO₂-Sensoren (NDIR-Prinzip)

**NDIR** = Non-Dispersive Infrared — Standardverfahren für CO₂-Messung in GA und Lüftung.

### Messprinzip

CO₂-Moleküle absorbieren Infrarotlicht bei 4.26 µm. Sensor vergleicht Transmission durch das Messgas mit einem Referenzpfad:

Eine Infrarotquelle durchstrahlt die Messkammer. Ein Detektor hinter einem Filter für 4.26 µm misst, wie viel Licht ankommt. Je mehr CO₂, desto weniger. Gute Sensoren messen zusätzlich bei einer zweiten Wellenlänge, die CO₂ nicht absorbiert, und gleichen so die Alterung der Lichtquelle aus.

### Kenngrössen

| Parameter        | Typischer Wert                       |
| ---------------- | ------------------------------------ |
| Messbereich      | 0–2000 ppm (Innenraum), bis 5000 ppm |
| Genauigkeit      | ±50 ppm oder ±3 % Messwert           |
| Ansprechzeit T90 | 1–3 Minuten                          |
| Kalibrierung     | Alle 2–5 Jahre empfohlen             |
| Ausgangssignal   | 0–10 V, 4–20 mA, Modbus              |

### Automatic Background Calibration (ABC)

Viele Sensoren kalibrieren sich automatisch: sie gehen davon aus, dass der tiefste Wert über einige Tage, je nach Hersteller 7 bis 14, dem CO₂-Gehalt der Aussenluft entspricht, heute rund 420 ppm.

> Wichtig: ABC-Kalibrierung funktioniert nur wenn das Gebäude regelmässig vollständig gelüftet wird. In Serverräumen oder 24/7-Betrieb ABC deaktivieren oder manuelle Kalibrierung planen.

### Grenzwerte nach EN 16798-1

| Kategorie EN 16798-1 | CO₂ über Aussenluft | Bei 420 ppm aussen, absolut | Qualität |
| -------------------- | ------------------- | --------------------------- | -------- |
| I                    | ≤ 550 ppm           | ≈ 970 ppm                   | hoch     |
| II                   | ≤ 800 ppm           | ≈ 1220 ppm                  | normal   |
| III                  | ≤ 1350 ppm          | ≈ 1770 ppm                  | mässig   |
| IV                   | > 1350 ppm          | > 1770 ppm                  | tief     |

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

**PIR-Einschränkung:** Erkennt nur Bewegung. Präsenzmelder mit PIR sind so empfindlich, dass sie Arbeiten am Schreibtisch meist erkennen. Wer sehr ruhig sitzt oder liest, kann aber nach einigen Minuten verschwinden. Dann schaltet Licht oder Lüftung ab. Nachlaufzeit und Empfindlichkeit richtig einstellen.

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
- **EN ISO 16890** — Luftfilter (Partikelgrössen, Effizienzklassen)
- **EN 16798-1** — Raumklima, Kategorien I–IV, CO₂-Werte

<!-- EN -->

# Sensors in BA — Overview

Sensors are the sense organs of building automation. Without correct measurements there is no correct control. This article covers the most commonly used sensor types in BA — measuring principle, characteristics, installation and typical faults.

## Temperature Sensors

### PT100 vs. PT1000

Both are **resistance temperature detectors** (RTD) made of platinum:

| Property             | PT100                            | PT1000                                        |
| -------------------- | -------------------------------- | --------------------------------------------- |
| Resistance at 0 °C   | 100 Ω                            | 1000 Ω                                        |
| Characteristic slope | 0.385 Ω/K                        | 3.85 Ω/K                                      |
| Sensitivity          | Low                              | 10× higher than PT100                         |
| Cable resistance     | Critical, 2-wire only very short | Small, with compensation up to about 50–100 m |
| Accuracy             | Class A: ±0.15 K                 | Class A: ±0.15 K                              |
| Use in BA            | More industrial                  | **BA standard**                               |

**Why PT1000 in BA?**
A copper cable of 0.5 mm² has about 3.6 Ω per 100 m of conductor. With 50 m of cable and a 2-wire connection, outgoing and return conductor are in series, together 3.6 Ω. With PT100 this gives an error of about 9 K, with PT1000 about 0.9 K. Most DDCs can subtract a fixed lead resistance. For long cables or high accuracy use a 3- or 4-wire connection.

**4-wire connection (Kelvin):** Measurement current and voltage measurement on separate conductors → cable resistance has zero influence.

### NTC (Negative Temperature Coefficient)

- Semiconductor resistor: resistance decreases with rising temperature (non-linear)
- Large resistance change, for example NTC 10k: 10 kΩ at 25 °C, about 3.6 kΩ at 50 °C
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

The diaphragm separates the plus and minus side. Its deflection is sensed electrically and output as 0–10 V, 4–20 mA or via the bus.

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
| Accuracy              | ±0.5 % of reading, depending on device           |
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

<p class="formel">Q [kW] = V̇ [m³/h] · ρ [kg/m³] · c<sub>p</sub> [kJ/(kg·K)] · ΔT [K] / 3600</p>

For water, simplified:

<p class="formel">Q [kW] ≈ 1.163 · V̇ [m³/h] · ΔT [K]</p>

Heat meters combine flow meter + 2 temperature sensors + integrator.

---

## CO₂ Sensors (NDIR Principle)

**NDIR** = Non-Dispersive Infrared — standard method for CO₂ measurement in BA and ventilation.

### Measuring Principle

CO₂ molecules absorb infrared light at 4.26 µm. The sensor compares transmission through the measurement gas with a reference path:

An infrared source shines through the measuring chamber. A detector behind a 4.26 µm filter measures how much light arrives. The more CO₂, the less. Good sensors also measure at a second wavelength that CO₂ does not absorb and so compensate for ageing of the light source.

### Key Parameters

| Parameter         | Typical value                       |
| ----------------- | ----------------------------------- |
| Measuring range   | 0–2000 ppm (indoor), up to 5000 ppm |
| Accuracy          | ±50 ppm or ±3 % of reading          |
| Response time T90 | 1–3 minutes                         |
| Calibration       | Recommended every 2–5 years         |
| Output signal     | 0–10 V, 4–20 mA, Modbus             |

### Automatic Background Calibration (ABC)

Many sensors self-calibrate: they assume that the lowest value over several days, 7 to 14 depending on the manufacturer, equals the CO₂ content of outdoor air, today about 420 ppm.

> Important: ABC calibration only works if the building is regularly fully ventilated. In server rooms or 24/7 operation, disable ABC or plan manual calibration.

### Limits per EN 16798-1

| Category EN 16798-1 | CO₂ above outdoor | At 420 ppm outdoor, absolute | Quality  |
| ------------------- | ----------------- | ---------------------------- | -------- |
| I                   | ≤ 550 ppm         | ≈ 970 ppm                    | high     |
| II                  | ≤ 800 ppm         | ≈ 1220 ppm                   | medium   |
| III                 | ≤ 1350 ppm        | ≈ 1770 ppm                   | moderate |
| IV                  | > 1350 ppm        | > 1770 ppm                   | low      |

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

**PIR limitation:** detects movement only. PIR presence detectors are sensitive enough to detect desk work in most cases. Someone sitting very still or reading can disappear after a few minutes, though. Then lighting or ventilation switches off. Set hold time and sensitivity correctly.

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
- **EN ISO 16890** — Air filters (particle sizes, efficiency classes)
- **EN 16798-1** — Indoor environment, categories I–IV, CO₂ values
