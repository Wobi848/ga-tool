---
title: Helligkeitssensoren — Tageslichtmessung und Beleuchtungssteuerung
title_en: Light Sensors — Daylight Measurement and Lighting Control
slug: helligkeitssensoren
category: sensoren
subcategory: licht
tags:
  [
    helligkeitssensor,
    luxmeter,
    photosensor,
    photodiode,
    ldr,
    dämmerungsschalter,
    aussenlichtsensor,
    konstantlichtregelung,
    tageslichtnutzung,
    beschattungsautomat,
    luxwert,
    beleuchtungsstärke,
    dali-sensor,
    0-10v-sensor,
    spektral,
    blendschutz
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [beleuchtungssteuerung, beschattungssteuerung, dali, sensoren, raumautomation]
rechner: []
norm: [EN 15193-1, ISO/CIE 19476, EN 12464-1, IEC 62386-304]
updated: 2026-10-14
lang: de
---

# Helligkeitssensoren — Tageslichtmessung und Beleuchtungssteuerung

Helligkeitssensoren messen die **Beleuchtungsstärke** (Lux) und bilden die Grundlage für Konstantlichtregelung, tageslichtabhängige Beschattung und Dämmerungsschalter. Richtig eingesetzt, senken sie den Beleuchtungsenergieverbrauch um 20–50%.

---

## Messgrösse: Beleuchtungsstärke (Lux)

| Grösse                   | Einheit      | Definition                                       |
| ------------------------ | ------------ | ------------------------------------------------ |
| **Beleuchtungsstärke E** | Lux (lx)     | Lichtstrom pro Fläche: E = Φ / A                 |
| Leuchtdichte L           | cd/m²        | Wahrgenommene Helligkeit einer Oberfläche        |
| Lichtstrom Φ             | Lumen (lm)   | Gesamter vom Leuchtmittel abgegebener Lichtstrom |
| Lichtintensität I        | Candela (cd) | Lichtstrom pro Raumwinkel                        |

**In der GA relevant:** Beleuchtungsstärke E in Lux — direkt messbar, normiert.

---

## Typische Beleuchtungsstärken

| Situation                      | Beleuchtungsstärke |
| ------------------------------ | ------------------ |
| Mondlicht                      | 0,1 lx             |
| Strassenbeleuchtung            | 5–30 lx            |
| Treppe, Flur (Norm)            | 100 lx             |
| Büro Schreibtisch (EN 12464-1) | 500 lx             |
| Technisches Zeichnen           | 750 lx             |
| Operationssaal, allgemein      | 1000 lx            |
| Bedeckter Himmel aussen        | 5'000–20'000 lx    |
| Direktes Sonnenlicht           | 50'000–100'000 lx  |

---

## Messprinzipien

### Photodiode (Halbleiter-Photosensor)

Standard in GA-Sensoren:

- Silizium-Photodiode erzeugt Strom proportional zur Lichtintensität
- Spektrale Empfindlichkeit: 400–1100 nm (sichtbar + nahes IR)
- **Lichtkorrekturfilter (V(λ)-Korrektur):** Passt Spektralkurve an das menschliche Auge an — wichtig für genaue Lux-Messung
- Günstig, schnell, linear

### Photowiderstands-Sensor (LDR, Light Dependent Resistor)

- Cadmiumsulfid (CdS) verändert Widerstand bei Licht
- Langsame Reaktion (Sekunden)
- Heute nur noch in einfachen Dämmerungsschaltern
- **Nicht für Regelung geeignet** (nichtlinear, langsam)

### Spektralsensor

Mehrkanal-Sensor mit einzelnen Photodioden + Farbfilter:

- Misst Farbtemperatur, Farbwiedergabe, Blauanteil (Melatonin)
- Zukünftige GA: Human Centric Lighting (HCL)
- Derzeit noch selten in Gebäudeautomation

---

## Sensortypen und Ausgangssignale

| Typ                                   | Einsatz                    | Ausgang                         |
| ------------------------------------- | -------------------------- | ------------------------------- |
| **Decken-Kombigerät** (Präsenz + Lux) | Büro, Konferenzraum        | DALI-2, 0–10 V, Modbus          |
| **Wandsensor**                        | Raumklimagerät, kombiniert | 0–10 V, Modbus                  |
| **Aussenlichtsensor**                 | Fassade, Beschattung       | 0–10 V (0 = dunkel, 10 V = max) |
| **Kanalfühler**                       | Selten (Tageslichtkanäle)  | 0–10 V                          |
| **Luxmeter**                          | Mobil, Inbetriebnahme      | Digital (Bluetooth, USB)        |

**Ausgangssignale:**

- **0–10 V:** z.B. 0 V = 0 lx, 10 V = 2000 lx (Bereich je nach Hersteller)
- **DALI-2 Part 304 (Lichtsensor):** Digitaler Luxwert über den DALI-Bus, konfigurierbar
- **Modbus RTU:** Direkter Lux-Wert in Integer (GA-Anbindung)

---

## Konstantlichtregelung (Daylight Harvesting)

Ziel: Beleuchtungsstärke am Arbeitsplatz konstant halten (z.B. 500 lx), indem Kunstlicht das Tageslicht ergänzt:

Beispiel: Sollwert 500 lx am Arbeitsplatz, das Kunstlicht allein liefert bei 100 % ebenfalls 500 lx.

| Tageslicht am Arbeitsplatz | Kunstlicht                |
| -------------------------- | ------------------------- |
| 0 lx                       | 100 %                     |
| 300 lx                     | rund 40 %, ergänzt 200 lx |
| 500 lx und mehr            | aus oder Minimum          |

**Regelung:** Konstantlichtregelung ist ein geschlossener Regelkreis, meist ein langsamer I- oder PI-Regler. Damit Wolken nicht zu sichtbarem Auf und Ab führen, regelt man langsam und mit Dimmrampen von einigen Sekunden. Ein Deckensensor misst das reflektierte Licht, nicht direkt den Schreibtisch. Darum wird er bei der Inbetriebnahme mit einem Luxmeter am Arbeitsplatz abgeglichen.

---

## Beschattungssteuerung

Der Aussenlichtsensor misst die Helligkeit an der Fassade:

| Aussenhelligkeit an der Fassade | Aktion                              |
| ------------------------------- | ----------------------------------- |
| unter etwa 40'000 lx            | Behang hoch, kein Blendschutz nötig |
| über etwa 50'000 lx             | Behang ab, Blendschutz              |
| Windgrenze überschritten        | Behang hoch, Schutzstellung         |

Die Lücke zwischen den beiden Schwellen ist die Hysterese. Dazu kommen Verzögerungen, siehe [Beschattungssteuerung](/wissen/beschattungssteuerung).

**Sonnenkurvensteuerung:** GLT berechnet aus Uhrzeit, Datum und Gebäudestandort den Sonnenstand (Azimut, Elevation) und öffnet/schliesst Lamellen entsprechend — unabhängig vom Sensor, aber in Kombination mit diesem.

---

## Montage und Inbetriebnahme

### Aussenlichtsensor

- **Montageort:** Für die Fassadensteuerung je Fassade ein Sensor, senkrecht in Richtung der Fassade ausgerichtet. Für Dämmerungsfunktionen genügt ein Sensor, oft horizontal.
- **Keine Verschattung** durch Gebäudeteile oder Bäume
- **Schutzklasse:** IP65 oder höher
- Kalibrierung: Vergleich mit Referenz-Luxmeter an klarem Tag

### Raumsensor (Konstantlicht)

- **Messebene:** Sensor misst Horizontal-Beleuchtungsstärke auf Arbeitshöhe oder schräg auf Arbeitsplatz
- **Keine direkte Sonneneinstrahlung** auf Sensor (führt zu Falschregelung)
- **Calibration Mode:** Sensor bei voller Kunstbeleuchtung ohne Tageslicht auf Sollwert kalibrieren

### DALI Part 304 Konfiguration

- Sensoradresse vergeben
- Messbereich einstellen (z.B. 0–1000 lx)
- Hysterese konfigurieren (vermeidet Flackern bei Wolkendurchzug)
- Deadband: Änderungen < ±5% lösen keine Regelaktion aus

<!-- EN -->

Light sensors measure **illuminance** (lux) and form the basis for constant illuminance control, daylight-responsive shading, and twilight switches. Correctly implemented, they reduce lighting energy consumption by 20–50%.

---

## Measurand: Illuminance (Lux)

| Quantity             | Unit         | Definition                            |
| -------------------- | ------------ | ------------------------------------- |
| **Illuminance E**    | Lux (lx)     | Luminous flux per area: E = Φ / A     |
| Luminance L          | cd/m²        | Perceived brightness of a surface     |
| Luminous flux Φ      | Lumen (lm)   | Total luminous flux emitted by a lamp |
| Luminous intensity I | Candela (cd) | Luminous flux per solid angle         |

**Relevant in BA:** Illuminance E in lux — directly measurable, standardised.

---

## Typical Illuminance Values

| Situation                      | Illuminance       |
| ------------------------------ | ----------------- |
| Moonlight                      | 0.1 lx            |
| Street lighting                | 5–30 lx           |
| Staircase, corridor (standard) | 100 lx            |
| Office desk (EN 12464-1)       | 500 lx            |
| Technical drawing              | 750 lx            |
| Operating theatre, general     | 1000 lx           |
| Overcast sky outdoors          | 5,000–20,000 lx   |
| Direct sunlight                | 50,000–100,000 lx |

---

## Measurement Principles

### Photodiode (Semiconductor Photosensor)

Standard in BA sensors:

- Silicon photodiode generates a current proportional to light intensity
- Spectral sensitivity: 400–1,100 nm (visible + near IR)
- **Light correction filter (V(λ) correction):** Matches the spectral curve to the human eye — important for accurate lux measurement
- Low cost, fast response, linear

### Photoresistor (LDR, Light Dependent Resistor)

- Cadmium sulphide (CdS) changes resistance with light
- Slow response (seconds)
- Today used only in simple twilight switches
- **Not suitable for control** (non-linear, slow)

### Spectral Sensor

Multi-channel sensor with individual photodiodes + colour filters:

- Measures colour temperature, colour rendering, blue content (melatonin)
- Future BA: Human Centric Lighting (HCL)
- Still rare in building automation

---

## Sensor Types and Output Signals

| Type                                          | Application                   | Output                        |
| --------------------------------------------- | ----------------------------- | ----------------------------- |
| **Ceiling combination unit** (presence + lux) | Office, meeting room          | DALI-2, 0–10 V, Modbus        |
| **Wall sensor**                               | Room climate device, combined | 0–10 V, Modbus                |
| **Outdoor light sensor**                      | Facade, shading               | 0–10 V (0 = dark, 10 V = max) |
| **Duct sensor**                               | Rare (light pipes)            | 0–10 V                        |
| **Lux meter**                                 | Mobile, commissioning         | Digital (Bluetooth, USB)      |

**Output signals:**

- **0–10 V:** e.g. 0 V = 0 lx, 10 V = 2,000 lx (range depends on manufacturer)
- **DALI-2 Part 304 (light sensor):** digital lux value via the DALI bus, configurable
- **Modbus RTU:** Direct lux value as integer (BA integration)

---

## Constant Illuminance Control (Daylight Harvesting)

Goal: maintain illuminance at the workstation constant (e.g. 500 lx) by having artificial light supplement daylight:

Example: setpoint 500 lx at the workplace, the artificial lighting alone also delivers 500 lx at 100 %.

| Daylight at the workplace | Artificial lighting     |
| ------------------------- | ----------------------- |
| 0 lx                      | 100 %                   |
| 300 lx                    | about 40 %, adds 200 lx |
| 500 lx and more           | off or minimum          |

**Control:** constant illuminance control is a closed loop, usually a slow I or PI controller. So that clouds do not cause visible up and down, control slowly and with dimming ramps of a few seconds. A ceiling sensor measures reflected light, not the desk directly. It is therefore matched with a lux meter at the workplace during commissioning.

---

## Shading Control

The outdoor light sensor measures brightness at the facade:

| Outdoor brightness at facade | Action                               |
| ---------------------------- | ------------------------------------ |
| below about 40,000 lx        | blind up, no glare protection needed |
| above about 50,000 lx        | blind down, glare protection         |
| wind limit exceeded          | blind up, safe position              |

The gap between the two thresholds is the hysteresis. Delays come on top, see [Shading Control](/wissen/beschattungssteuerung).

**Solar tracking control:** The BMS calculates the sun position (azimuth, elevation) from the time of day, date, and building location, and opens/closes the slats accordingly — independent of the sensor but combined with it.

---

## Installation and Commissioning

### Outdoor Light Sensor

- **Mounting location:** for facade control one sensor per facade, vertical and facing the same way as the facade. For twilight functions one sensor is enough, often horizontal.
- **No shading** from building parts or trees
- **Protection class:** IP65 or higher
- Calibration: compare with reference lux meter on a clear day

### Room Sensor (Constant Illuminance)

- **Measurement plane:** Sensor measures horizontal illuminance at working height or at an angle towards the workstation
- **No direct sunlight** on the sensor (causes incorrect control)
- **Calibration mode:** Calibrate sensor to setpoint under full artificial lighting without daylight

### DALI Part 304 Configuration

- Assign sensor address
- Set measurement range (e.g. 0–1,000 lx)
- Configure hysteresis (avoids flickering during cloud passage)
- Deadband: changes < ±5% do not trigger a control action
