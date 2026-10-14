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
updated: 2026-10-14
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
- **Real-Time Pricing (RTP)**: Spotmarktpreis, im Day-ahead-Markt seit Oktober 2025 in Viertelstunden
- **Critical Peak Pricing (CPP)**: Stark erhöhter Preis an wenigen kritischen Stunden

### Anreizbasiertes DR (Incentive-Based DR)

Netzbetreiber zahlen für bereitgestellte Flexibilität:

- **FCR** (Frequency Containment Reserve): Primärregelung, voll aktiviert bei ±200 mHz Frequenzabweichung, innerhalb von 30 s
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

| Ebene             | Aufgabe                                                         |
| ----------------- | --------------------------------------------------------------- |
| Regelenergiemarkt | Swissgrid schreibt Regelleistung aus                            |
| Aggregator        | bündelt viele Gebäude zu einem Angebot, schickt Abrufe weiter   |
| EMS oder GA       | empfängt das Signal mit Menge und Dauer, verteilt es auf Lasten |
| flexible Lasten   | Wärmepumpe, Kälte, Batterie, Ladestationen                      |

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

- Das EMS holt die Day-ahead-Preise, heute in Viertelstunden aufgelöst, über eine Schnittstelle des Lieferanten oder der Börse.
- **Tiefer Preis:** Batterie laden, Wärmepumpe mit erhöhtem Sollwert, etwa SG-Ready Zustand 3 oder 4.
- **Hoher Preis:** Batterie entladen, Kälte und Lüftung im Rahmen der Komfortgrenzen zurücknehmen.
- Die Schwellen ergeben sich aus dem Tarif. Ohne dynamischen Tarif bringt Preis-DR dem Gebäude nichts.

### Peak-Shaving (Leistungspreisoptimierung)

Das EMS überwacht den Viertelstunden-Mittelwert am Netzanschluss. Droht er das Limit zu überschreiten:

1. Batterie entladen
2. E-Autos auf Mindestladestrom reduzieren
3. Kühlsollwert vorübergehend um 1 bis 2 K anheben

---

## Regulatorischer Rahmen (CH/DE)

| Land        | Regelwerk                                               |
| ----------- | ------------------------------------------------------- |
| Deutschland | Redispatch 2.0 (§ 13a EnWG), Regelenergiemarkt (BNetzA) |
| Schweiz     | Regelenergiemarkt Swissgrid, Ancillary Services         |
| EU          | Clean Energy Package (EU 2019/944), ACER Guidelines     |

In der Schweiz nehmen Gebäude über Aggregatoren am Regelenergiemarkt teil. Ob sich das lohnt, hängt von der steuerbaren Leistung, der Verfügbarkeit und dem Aufwand für Messung und Kommunikation ab.

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
- **Real-Time Pricing (RTP)**: spot market price, in the day-ahead market in quarter hours since October 2025
- **Critical Peak Pricing (CPP)**: Strongly elevated price during a few critical hours

### Incentive-Based DR

Grid operators pay for provided flexibility:

- **FCR** (Frequency Containment Reserve): primary control, fully activated at ±200 mHz frequency deviation, within 30 s
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

| Level            | Task                                                                  |
| ---------------- | --------------------------------------------------------------------- |
| Balancing market | Swissgrid tenders balancing power                                     |
| Aggregator       | pools many buildings into one offer, forwards activations             |
| EMS or BA        | receives the signal with amount and duration, distributes it to loads |
| Flexible loads   | heat pump, cooling, battery, charging stations                        |

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

- The EMS retrieves the day-ahead prices, now in quarter-hour resolution, via an interface of the supplier or the exchange.
- **Low price:** charge the battery, heat pump with raised setpoint, for example SG-Ready state 3 or 4.
- **High price:** discharge the battery, cut back cooling and ventilation within comfort limits.
- The thresholds follow from the tariff. Without a dynamic tariff, price-based DR brings the building nothing.

### Peak Shaving (Demand Charge Optimisation)

The EMS monitors the quarter-hour mean at the grid connection. If it threatens to exceed the limit:

1. Discharge the battery
2. Reduce electric cars to the minimum charging current
3. Raise the cooling setpoint temporarily by 1 to 2 K

---

## Regulatory Framework (CH/DE)

| Country     | Regulation                                                    |
| ----------- | ------------------------------------------------------------- |
| Germany     | Redispatch 2.0 (§ 13a EnWG), balancing energy market (BNetzA) |
| Switzerland | Balancing energy market Swissgrid, Ancillary Services         |
| EU          | Clean Energy Package (EU 2019/944), ACER Guidelines           |

In Switzerland buildings take part in the balancing market via aggregators. Whether it pays depends on the controllable power, availability and the effort for metering and communication.
