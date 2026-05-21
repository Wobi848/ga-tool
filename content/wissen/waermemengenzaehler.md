---
title: Wärmemengenzähler — Funktion, Einbau und Auslesung
title_en: Heat Meters — Function, Installation and Readout
slug: waermemengenzaehler
category: energie
subcategory: zaehler
tags:
  [
    wärmemengenzähler,
    wärmezähler,
    kältezähler,
    wmz,
    durchfluss,
    temperaturdifferenz,
    mbus,
    energiemessung,
    abrechnung,
    einbau,
    kalibrierung,
    ultraschall,
    flügelrad,
    wärmeleistung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [mbus, sensoren, ems-lastmanagement, hydraulischer-abgleich]
norm: [EN 1434, MID (2014/32/EU), WELMEC 7.2]
updated: 2026-05-14
lang: de
---

# Wärmemengenzähler — Funktion, Einbau und Auslesung

Ein **Wärmemengenzähler (WMZ)** misst die übertragene Wärmemenge oder Kältemenge in einem hydraulischen Kreis. Er ist unverzichtbar für Energieabrechnung, Effizienzmonitoring und Lastmanagement.

## Messprinzip

```
Physikalische Grundformel:

Q [kWh] = V̇ [m³/h] × ρ [kg/m³] × cp [kJ/(kg·K)] × ΔT [K] × t [h] / 3600
```

Vereinfacht für Wasser (ρ × cp ≈ 4.18 kJ/(kg·K) → 1.163 kWh/(m³·K)):

```
Q [kWh] ≈ V̇ [m³/h] × 1.163 × ΔT [K] × Zeit
```

**Drei Komponenten** im Wärmemengenzähler:

```
Vorlauf →──[Durchflussmesser]──────────►
              ↑
          Volumen V̇         [Rechenwerk: integriert Q]
              ↑
         [Temp.fühler VL]  [Temp.fühler RL]
                               ↑
                   Rücklauf ←──────────
```

---

## Messprinzipien Durchfluss

| Prinzip                | Beschreibung          | Genauigkeit | Einsatz                |
| ---------------------- | --------------------- | ----------- | ---------------------- |
| **Ultraschall**        | Laufzeitdifferenz     | ±1–3 %      | Standard, wartungsfrei |
| **Flügelrad**          | Mechanisch, rotierend | ±2–5 %      | Einfach, günstig       |
| **Magnetisch (MID)**   | Induktiv              | ±0.5–1 %    | Hohe Genauigkeit       |
| **Wirkdruckverfahren** | Blende/Venturi        | ±1–2 %      | Grosse DN              |

**Ultraschall** ist heute Standard — keine beweglichen Teile, daher wartungsarm und langlebig.

---

## Genauigkeitsklassen (EN 1434)

| Klasse     | Genauigkeit | Anwendung                           |
| ---------- | ----------- | ----------------------------------- |
| **1**      | ±5 %        | Einfache Systeme                    |
| **2**      | ±3–5 %      | Standard Wohnbau-Abrechnung         |
| **3**      | ±2 %        | Genauere Anwendungen                |
| **MI-004** | MID-konform | Abrechnungsrelevant (Pflicht CH/EU) |

**MID** (Measuring Instruments Directive, 2014/32/EU): Für Abrechnungszwecke muss WMZ MID-konform sein und darf nur durch geeichten Zähler ersetzt werden.

---

## Einbau-Anforderungen

### Einbauort

```
Vorlauf:  besser → höhere Genauigkeit (weniger Gasblasen)
Rücklauf: alternativ (oft einfacher)

Einbaulängen (Ultraschall):
  Vorlauf (Einlauf): mind. 5× DN gerades Rohr
  Nachlauf:          mind. 3× DN gerades Rohr

Nicht direkt nach:
  Pumpe, T-Stück, Ventil → Strömungsstörung → Messfehler
```

### Kugelhähne für Wartung

```
Vorlauf → [Kugelhahn] → [WMZ] → [Kugelhahn] → weiter
                              ↑
                         Bypass (optional, für Wartung ohne Abschaltung)
```

### Temperaturpaare

Beide Temperaturfühler (Vor- und Rücklauf) müssen **geeichtes Paar** sein (gleiche Kalibrierung → minimale Differenzfehler).

---

## Auslesung und Schnittstellen

| Schnittstelle         | Beschreibung                             | GA-Einsatz                |
| --------------------- | ---------------------------------------- | ------------------------- |
| **M-Bus**             | Primäres Protokoll für Zähler (EN 13757) | Standard in CH/DE/EU      |
| **wM-Bus**            | Funk-M-Bus (868 MHz)                     | Nachrüstung, Fernablesung |
| **Modbus RTU**        | Alternativ bei neueren Geräten           | GA-Integration            |
| **Impulsausgang**     | S0-Schnittstelle, 1 Impuls = x kWh       | Einfache Zählung          |
| **Optischer Ausgang** | IR-Auslesung (Ableseschwand)             | Manuelle Ablesung         |
| **Display**           | Lokale Anzeige                           | Vor-Ort-Kontrolle         |

### M-Bus Auslesung

```
GLT / M-Bus-Master → [M-Bus-Pegelwandler] → M-Bus-Linie → WMZ (Slave)

Zähler-Datenpunkte (EN 13757):
  - Wärmemenge kumuliert [kWh]
  - Volumenstrom [m³/h]
  - Vorlauftemperatur [°C]
  - Rücklauftemperatur [°C]
  - Leistung [kW]
  - Betriebsstunden [h]
  - Datums-/Zeitstempel
```

---

## Kalibrierung und Eichung

**Kalibrierung:** Hersteller kalibriert bei Produktion, Zertifikat liegt bei.
**Eichung:** Staatliche Eichung für Abrechnungszähler (Pflicht für Mieterabrechnung):

| Land | Eichperiode                                 | Behörde               |
| ---- | ------------------------------------------- | --------------------- |
| DE   | 5 Jahre                                     | Eichamt               |
| CH   | 5 Jahre (Ultraschall) / 2 Jahre (Flügelrad) | Metas / Kant. Eichamt |
| AT   | 5 Jahre                                     | BEV                   |

---

## Typische GA-Datenpunkte WMZ

| Datenpunkt             | Einheit | Beschreibung        |
| ---------------------- | ------- | ------------------- |
| Wärmemenge kumuliert   | kWh     | Energiezählerstand  |
| Volumenmenge kumuliert | m³      | Volumenzählerstand  |
| Aktuelle Leistung      | kW      | Momentanleistung    |
| Aktueller Volumenstrom | m³/h    | Momentan-Durchfluss |
| Vorlauftemperatur      | °C      |                     |
| Rücklauftemperatur     | °C      |                     |
| Temperaturdifferenz ΔT | K       | Berechnet (VL − RL) |
| Fehlercode             | —       | Zähler-Statusbyte   |

---

## Normen

- **EN 1434** — Wärmezähler, Anforderungen, Prüfung, Kennzeichnung
- **MID 2014/32/EU** — Messgeräterichtlinie (Abrechnungspflicht)
- **EN 13757** — M-Bus Kommunikationsprotokoll für Zähler
- **WELMEC 7.2** — Leitfaden zur Anwendung der MID für Wärmezähler

<!-- EN -->

A **heat meter (HM)** measures the heat energy or cooling energy transferred in a hydraulic circuit. It is indispensable for energy billing, efficiency monitoring, and load management.

## Measurement Principle

```
Basic physical formula:

Q [kWh] = V̇ [m³/h] × ρ [kg/m³] × cp [kJ/(kg·K)] × ΔT [K] × t [h] / 3600
```

Simplified for water (ρ × cp ≈ 4.18 kJ/(kg·K) → 1.163 kWh/(m³·K)):

```
Q [kWh] ≈ V̇ [m³/h] × 1.163 × ΔT [K] × time
```

**Three components** in the heat meter:

```
Supply →──[Flow meter]──────────────►
              ↑
          Volume V̇         [Calculator: integrates Q]
              ↑
         [Temp. sensor supply]  [Temp. sensor return]
                                    ↑
                    Return ←────────────
```

---

## Flow Measurement Principles

| Principle                 | Description             | Accuracy | Application                |
| ------------------------- | ----------------------- | -------- | -------------------------- |
| **Ultrasonic**            | Transit time difference | ±1–3 %   | Standard, maintenance-free |
| **Impeller**              | Mechanical, rotating    | ±2–5 %   | Simple, low cost           |
| **Electromagnetic (MID)** | Inductive               | ±0.5–1 % | High accuracy              |
| **Differential pressure** | Orifice / Venturi       | ±1–2 %   | Large DN                   |

**Ultrasonic** is today's standard — no moving parts, therefore low-maintenance and long-lasting.

---

## Accuracy Classes (EN 1434)

| Class      | Accuracy      | Application                        |
| ---------- | ------------- | ---------------------------------- |
| **1**      | ±5 %          | Simple systems                     |
| **2**      | ±3–5 %        | Standard residential billing       |
| **3**      | ±2 %          | More precise applications          |
| **MI-004** | MID-compliant | Billing-relevant (mandatory CH/EU) |

**MID** (Measuring Instruments Directive, 2014/32/EU): For billing purposes, the heat meter must be MID-compliant and may only be replaced by a verified meter.

---

## Installation Requirements

### Installation Location

```
Supply pipe:  preferred → higher accuracy (fewer gas bubbles)
Return pipe:  alternative (often more accessible)

Straight pipe lengths (ultrasonic):
  Upstream (inlet): at least 5× DN straight pipe
  Downstream:       at least 3× DN straight pipe

Not immediately after:
  Pump, T-piece, valve → flow disturbance → measurement error
```

### Ball Valves for Maintenance

```
Supply → [Ball valve] → [HM] → [Ball valve] → onward
                              ↑
                         Bypass (optional, for maintenance without shutdown)
```

### Temperature Pairs

Both temperature sensors (supply and return) must be a **matched pair** (same calibration → minimal differential errors).

---

## Readout and Interfaces

| Interface          | Description                            | BA application           |
| ------------------ | -------------------------------------- | ------------------------ |
| **M-Bus**          | Primary protocol for meters (EN 13757) | Standard in CH/DE/EU     |
| **wM-Bus**         | Wireless M-Bus (868 MHz)               | Retrofit, remote reading |
| **Modbus RTU**     | Alternative in newer devices           | BA integration           |
| **Pulse output**   | S0 interface, 1 pulse = x kWh          | Simple counting          |
| **Optical output** | IR readout (reading window)            | Manual readout           |
| **Display**        | Local indication                       | On-site check            |

### M-Bus Readout

```
BMS / M-Bus master → [M-Bus level converter] → M-Bus line → HM (slave)

Meter data points (EN 13757):
  - Heat energy cumulative [kWh]
  - Volume flow [m³/h]
  - Supply temperature [°C]
  - Return temperature [°C]
  - Power [kW]
  - Operating hours [h]
  - Date/time stamp
```

---

## Calibration and Verification

**Calibration:** Manufacturer calibrates during production; certificate included.
**Legal verification:** Statutory verification for billing meters (mandatory for tenant billing):

| Country | Verification period                       | Authority                   |
| ------- | ----------------------------------------- | --------------------------- |
| DE      | 5 years                                   | Weights and Measures Office |
| CH      | 5 years (ultrasonic) / 2 years (impeller) | Metas / Cantonal W&M Office |
| AT      | 5 years                                   | BEV                         |

---

## Typical BA Data Points — Heat Meter

| Data point                  | Unit | Description                  |
| --------------------------- | ---- | ---------------------------- |
| Heat energy cumulative      | kWh  | Energy meter reading         |
| Volume cumulative           | m³   | Volume meter reading         |
| Current power               | kW   | Instantaneous power          |
| Current volume flow         | m³/h | Instantaneous flow           |
| Supply temperature          | °C   |                              |
| Return temperature          | °C   |                              |
| Temperature differential ΔT | K    | Calculated (supply − return) |
| Error code                  | —    | Meter status byte            |

---

## Standards

- **EN 1434** — Heat meters: requirements, testing, marking
- **MID 2014/32/EU** — Measuring Instruments Directive (billing obligation)
- **EN 13757** — M-Bus communication protocol for meters
- **WELMEC 7.2** — Guide to MID application for heat meters
