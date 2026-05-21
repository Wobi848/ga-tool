---
title: Demand Response — Flexible Lasten im Stromnetz
title_en: Demand Response — Flexible Loads in the Power Grid
slug: demand-response
category: energie
subcategory: smart-grid
tags:
  [
    demand-response,
    demand-side-management,
    lastverschiebung,
    regelenergie,
    fcr,
    afrr,
    aggregator,
    usef,
    flexibility,
    smart-grid,
    peak-shaving,
    netzentlastung,
    spotmarkt,
    strompreis,
    industrial-dr
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, sg-ready, pv-integration, batteriespeicher, iso50001]
rechner: []
norm: [EU Richtlinie 2019/944, USEF Framework, IEC 61968, ENTSO-E]
updated: 2026-05-15
lang: de
---

# Demand Response — Flexible Lasten im Stromnetz

**Demand Response (DR)** bezeichnet die gezielte, zeitliche Anpassung des Stromverbrauchs von Verbrauchern als Reaktion auf Netzsignale, Preissignale oder Anforderungen des Netzbetreibers. Gebäude mit steuerbaren Lasten (Klimaanlage, Lüftung, Heizung, Batteriespeicher, Ladeinfrastruktur) können als flexible Netz-Ressource eingesetzt werden.

---

## Motivationen für Demand Response

| Akteur               | Motivation                                                                               |
| -------------------- | ---------------------------------------------------------------------------------------- |
| **Netzbetreiber**    | Frequenzstabilität, Engpassmanagement, Spitzenlastreduzierung                            |
| **Strombörse**       | Ausgleich von Angebot und Nachfrage (EE-Volatilität)                                     |
| **Gebäudebetreiber** | Reduzierung des Leistungspreises (Spitzenlasttarif), Erlöse aus Flexibilitätsvermarktung |
| **Aggregatoren**     | Bündelung kleiner Flexibilitäten zu vermarktbaren Einheiten                              |

---

## DR-Arten

### Preisbasiertes DR (Price-Based DR)

Verbraucher reagieren auf variable Strompreise:

- **Time-of-Use (ToU)**: Festgelegte Hoch-/Niedertarifzeiten
- **Real-Time Pricing (RTP)**: Stündlicher Spotmarktpreis (EPEX SPOT)
- **Critical Peak Pricing (CPP)**: Stark erhöhter Preis an wenigen kritischen Stunden

### Anreizbasiertes DR (Incentive-Based DR)

Netzbetreiber zahlen für bereitgestellte Flexibilität:

- **FCR** (Frequency Containment Reserve): Sekundenreserve ±0,1 Hz, Reaktionszeit < 30 s
- **aFRR** (automatic Frequency Restoration Reserve): Minutenreserve, automatisch aktiviert
- **mFRR** (manual FRR): Manuelle Aktivierung, Reaktionszeit < 12,5 min
- **Redispatch 2.0 (DE)**: Netzbetreiber kann Verbraucher/Erzeuger direktsteuern

---

## Flexibilitätspotenziale in Gebäuden

| Anlage                | Flexibilitätsdauer | Reaktionszeit | Bemerkung                 |
| --------------------- | ------------------ | ------------- | ------------------------- |
| Klimaanlage / Kühlung | 30–120 min         | < 5 min       | Thermische Masse = Puffer |
| Lüftungsanlage        | 15–60 min          | < 2 min       | CO₂-Grenzwert beachten    |
| Heizung (Wärmepumpe)  | 60–240 min         | < 10 min      | Pufferspeicher nötig      |
| Warmwasser (Heizstab) | 30–120 min         | < 1 min       | Einfachste Flexibilität   |
| Batteriespeicher      | 15 min–4h          | < 1 s         | Ideal für FCR/aFRR        |
| E-Ladeinfrastruktur   | 30–480 min         | < 1 min       | OCPP Smart Charging       |
| Kältespeicher         | 60–360 min         | < 5 min       | Gewerblich                |

---

## Architektur: Aggregator-Modell

```
Gebäude A (100 kW flex.)
Gebäude B (50 kW flex.)    ────► Aggregator ────► Regelenergiemarkt
Gebäude C (80 kW flex.)                           (ENTSO-E / Swissgrid)
         │
    GA / EMS ◄──── DR-Signal (Aktivierung, Menge, Dauer)
         │
   Flexible Lasten
```

Der **Aggregator** bündelt Kleinflexibilitäten zu handelbaren Paketen (Mindestgrösse FCR: 1 MW). Er kommuniziert mit dem EMS über proprietäre APIs oder standardisierte Protokolle (CIM, USEF).

---

## USEF Framework

**Universal Smart Energy Framework** — europäisches Modell für die Vermarktung von Gebäude-Flexibilität:

| Rolle                           | Funktion                              |
| ------------------------------- | ------------------------------------- |
| AGR (Aggregator)                | Vermarktet Flexibilität am Markt      |
| DSO (Verteilnetz-betreiber)     | Kauft Flexibilität zur Netzentlastung |
| BRP (Balance Responsible Party) | Portfolioausgleich                    |
| Prosumer                        | Gebäude stellt Flexibilität bereit    |

---

## DR in der GA — praktische Umsetzung

### Einfaches Price-Based DR

```
EMS prüft stündlich EPEX-Spot-Preis (via API):
  Wenn Preis < 5 ct/kWh:
    → Batterie laden, WP-Leistung erhöhen (SG-Ready Zustand 4)
  Wenn Preis > 25 ct/kWh:
    → Batterie entladen, HVAC reduzieren (innerhalb Komfortgrenzen)
```

### Peak-Shaving (Leistungspreisoptimierung)

```
EMS überwacht 15-min-Mittelwert am HAK:
  Wenn P_15min > P_Peak_Limit:
    → Batteriespeicher entladen
    → E-Autos auf Mindestladestrom reduzieren
    → Klimaanlage Sollwert +2 K anheben (temporär)
```

---

## Regulatorischer Rahmen (CH/DE)

| Land        | Regelwerk                                               |
| ----------- | ------------------------------------------------------- |
| Deutschland | Redispatch 2.0 (§ 13a EnWG), Regelenergiemarkt (BNetzA) |
| Schweiz     | Regelenergiemarkt Swissgrid, Ancillary Services         |
| EU          | Clean Energy Package (EU 2019/944), ACER Guidelines     |

In der Schweiz: DR-Teilnahme für Gebäude über Aggregatoren wie **Alpiq**, **BKW Energie**, **EDF Flexibilis** möglich — ab ca. 50 kW steuerbare Leistung wirtschaftlich.

<!-- EN -->

**Demand Response (DR)** is the deliberate, time-based adjustment of electricity consumption by end users in response to grid signals, price signals, or requests from the grid operator. Buildings with controllable loads (air conditioning, ventilation, heating, battery storage, charging infrastructure) can be deployed as flexible grid resources.

---

## Motivations for Demand Response

| Actor                 | Motivation                                                                    |
| --------------------- | ----------------------------------------------------------------------------- |
| **Grid operator**     | Frequency stability, congestion management, peak load reduction               |
| **Power exchange**    | Balancing supply and demand (renewable energy volatility)                     |
| **Building operator** | Reduction of demand charges (peak tariff), revenue from flexibility marketing |
| **Aggregators**       | Bundling small flexibilities into tradeable units                             |

---

## DR Types

### Price-Based DR

Consumers respond to variable electricity prices:

- **Time-of-Use (ToU)**: Fixed high-/low-tariff periods
- **Real-Time Pricing (RTP)**: Hourly spot market price (EPEX SPOT)
- **Critical Peak Pricing (CPP)**: Strongly elevated price during a few critical hours

### Incentive-Based DR

Grid operators pay for provided flexibility:

- **FCR** (Frequency Containment Reserve): Second-by-second reserve ±0.1 Hz, response time < 30 s
- **aFRR** (automatic Frequency Restoration Reserve): Minute reserve, automatically activated
- **mFRR** (manual FRR): Manual activation, response time < 12.5 min
- **Redispatch 2.0 (DE)**: Grid operator can directly control consumers/generators

---

## Flexibility Potential in Buildings

| System                               | Flexibility Duration | Response Time | Notes                 |
| ------------------------------------ | -------------------- | ------------- | --------------------- |
| Air conditioning / cooling           | 30–120 min           | < 5 min       | Thermal mass = buffer |
| Ventilation system                   | 15–60 min            | < 2 min       | Observe CO₂ limits    |
| Heating (heat pump)                  | 60–240 min           | < 10 min      | Buffer tank required  |
| Domestic hot water (heating element) | 30–120 min           | < 1 min       | Simplest flexibility  |
| Battery storage                      | 15 min–4 h           | < 1 s         | Ideal for FCR/aFRR    |
| EV charging infrastructure           | 30–480 min           | < 1 min       | OCPP smart charging   |
| Cold storage                         | 60–360 min           | < 5 min       | Commercial            |

---

## Architecture: Aggregator Model

```
Building A (100 kW flex.)
Building B  (50 kW flex.)  ────► Aggregator ────► Balancing energy market
Building C  (80 kW flex.)                         (ENTSO-E / Swissgrid)
         │
    BA / EMS ◄──── DR signal (activation, quantity, duration)
         │
   Flexible loads
```

The **aggregator** bundles small flexibilities into tradeable packages (minimum size for FCR: 1 MW). It communicates with the EMS via proprietary APIs or standardised protocols (CIM, USEF).

---

## USEF Framework

**Universal Smart Energy Framework** — European model for marketing building flexibility:

| Role                               | Function                            |
| ---------------------------------- | ----------------------------------- |
| AGR (Aggregator)                   | Markets flexibility on the exchange |
| DSO (Distribution System Operator) | Buys flexibility for grid relief    |
| BRP (Balance Responsible Party)    | Portfolio balancing                 |
| Prosumer                           | Building provides flexibility       |

---

## DR in BA — Practical Implementation

### Simple Price-Based DR

```
EMS checks EPEX spot price hourly (via API):
  If price < 5 ct/kWh:
    → Charge battery, increase heat pump output (SG-Ready state 4)
  If price > 25 ct/kWh:
    → Discharge battery, reduce HVAC (within comfort limits)
```

### Peak Shaving (Demand Charge Optimisation)

```
EMS monitors 15-min average at the meter:
  If P_15min > P_peak_limit:
    → Discharge battery storage
    → Reduce EV charging to minimum current
    → Raise air conditioning setpoint by +2 K (temporarily)
```

---

## Regulatory Framework (CH/DE)

| Country     | Regulation                                                    |
| ----------- | ------------------------------------------------------------- |
| Germany     | Redispatch 2.0 (§ 13a EnWG), balancing energy market (BNetzA) |
| Switzerland | Balancing energy market Swissgrid, Ancillary Services         |
| EU          | Clean Energy Package (EU 2019/944), ACER Guidelines           |

In Switzerland: DR participation for buildings is available via aggregators such as **Alpiq**, **BKW Energie**, **EDF Flexibilis** — economically viable from approx. 50 kW of controllable load.
