---
title: Model Predictive Control (MPC) in der Gebäudeautomation
title_en: Model Predictive Control (MPC) in Building Automation
slug: mpc-ga
category: regelung
subcategory: optimierung
tags:
  [
    mpc,
    modellprädiktiverregler,
    prädiktiveregelung,
    optimierung,
    thermischesmodell,
    energieoptimierung,
    wetterprognose,
    preissignal,
    demand-response,
    reinforcementlearning,
    ml-ga
  ]
difficulty: fortgeschritten
area: [ga, hlk]
related:
  [
    pid-regler,
    kaskadenregelung,
    regelkreise,
    demand-response,
    sg-ready,
    batteriespeicher,
    thermische-behaglichkeit
  ]

norm: [EN ISO 52016-1, EN ISO 52120-1]
updated: 2026-05-15
lang: de
---

# Model Predictive Control (MPC) in der Gebäudeautomation

Model Predictive Control ist ein fortgeschrittenes Regelungsverfahren, das ein mathematisches Modell des Gebäudes nutzt, um **vorausschauend zu optimieren** — im Gegensatz zu klassischen PID-Reglern, die nur auf aktuelle Abweichungen reagieren.

## Grundprinzip

MPC löst in jedem Zeitschritt ein Optimierungsproblem:

| Schritt        | Inhalt                                                                    |
| -------------- | ------------------------------------------------------------------------- |
| **Gegeben**    | aktueller Zustand x(t), Modell des Gebäudes                               |
| **Prognose**   | Wetter, Belegung, Strompreise für N Schritte voraus                       |
| **Optimieren** | Stellgrössen u(t), u(t+1) … u(t+N)                                        |
| **Ziel**       | Komfort einhalten, Energie oder Kosten minimieren                         |
| **Anwenden**   | nur u(t), dann im nächsten Schritt alles neu berechnen (Receding Horizon) |

Das **Receding-Horizon**-Prinzip macht MPC robust: Der Plan wird jedes Mal neu berechnet, sobald neue Messwerte vorliegen.

## Gebäudemodell

Das Herzstück jedes MPC ist das Gebäudemodell. Typische Modelltypen:

### RC-Netzwerk (physikalisch)

Analogie Wärme ↔ Elektrizität:

- **Wärmewiderstand R** [K/W] = 1/(U × A) — Wärmedurchgang durch Wand
- **Wärmekapazität C** [Wh/K] = m × cp — thermische Masse (Beton, Estrich)
- Zustand **x** = Temperaturen der Knoten (Raumluft, Wand, Fussboden)

Ein einfaches Modell für einen Raum hat zwei Knoten:

- **Wandknoten** mit der Wärmekapazität C_Wand, verbunden über R_aussen mit der Aussenluft und über R_innen mit der Raumluft
- **Raumknoten** mit der kleinen Kapazität C_Luft, zusätzlich über R_Fenster direkt mit der Aussenluft verbunden, weil Fenster kaum speichern
- Wärmeeinträge von Heizung, Sonne und Personen wirken auf den Raumknoten, Sonne zum Teil auch auf die Wand

Solche Modelle haben 3–20 Zustände und können auf echten Messdaten kalibriert werden.

### Datengetriebene Modelle

- **ARX/ARMAX**: Lineare Regression auf historischen Daten
- **Neural Network**: Mehr Genauigkeit, aber Black Box
- **Gaussian Process**: Probabilistische Vorhersage mit Unsicherheit

## Optimierungsziele

| Ziel        | Typische Formulierung                     |
| ----------- | ----------------------------------------- |
| Komfort     | Δ(T_Raum − T_Soll)² minimieren            |
| Energie     | Gesamtenergieverbrauch minimieren         |
| Kosten      | Strombezug × Spotpreis minimieren         |
| Lastspitzen | Peak-Demand Penalty (Netzgebühren)        |
| CO₂         | Emissionsfaktor × Energiebezug minimieren |

In der Praxis werden diese Ziele gewichtet kombiniert:

**J = w₁ × Komfortabweichung + w₂ × Energiekosten + w₃ × Spitzenlast**

## Wetterprognose-Integration

MPC nutzt typischerweise:

- **Kurzfristprognose** (1–48h): Temperatur, Strahlung, Windgeschwindigkeit
- Quellen: MeteoSchweiz (offene Daten), Meteoblue, open-meteo
- Ungewissheit: Je länger der Horizont, desto grösser der Fehler → Robustheit wichtig

**Beispiel Vorkühlung:** Bei einer Hitzewelle kann MPC das Gebäude nachts auf 21°C abkühlen (freie Kühlung, günstiger Strom) und so tagsüber die Klimaanlage entlasten — ein klassischer PID-Regler kann das nicht.

## Demand Response & Smart Grid

MPC ist die natürliche Schnittstelle für **Demand Response**:

- SG-Ready Signal → MPC verschiebt Heiz-/Kühllasten
- Flexibilitätsmarkt: Gebäude wird zum "virtuellen Kraftwerk"
- Spotpreis-Optimierung: Wärmepumpe läuft wenn Strom billig/grün ist

## Implementierungsebenen

### Einfach: Prädiktive Vorabheizung

Einzelne Logik: "Wenn Wetterprognose < −10°C in 6h, Vorlauftemperatur +3K anheben." Implementierbar in jedem DDC.

### Mittel: Zonenoptimierung

Separate Modelle pro Zone, gemeinsame Optimierung der Wärmeerzeugung. Typisch für Forschungsprojekte und Pilotanlagen.

### Vollständig: Ganzes Gebäude

Kopplung Erzeugung–Verteilung–Zone–Nutzerverhalten. Benötigt umfangreiches Datenmanagement und Rechenkapazität (Cloud oder Edge-Server).

## Vergleich MPC vs. klassische Regelung

|                         | PID       | MPC                                                         |
| ----------------------- | --------- | ----------------------------------------------------------- |
| Horizon                 | Gegenwart | Zukunft (N Schritte)                                        |
| Modell nötig            | Nein      | Ja                                                          |
| Implementierungsaufwand | Gering    | Hoch                                                        |
| Energieeinsparung       | Basis     | in Studien oft 10–30 %, stark abhängig von der Ausgangslage |
| Demand Response         | Schwierig | Natürlich integriert                                        |
| Robustheit              | Hoch      | Abhängig von Modellgüte                                     |
| Kosten                  | Gering    | Mittel–hoch                                                 |
| Stand heute             | Standard  | Forschung / Grossbauten                                     |

## Praxisbeispiele

- **Empa NEST, Dübendorf:** Forschungsgebäude, in dem prädiktive und lernende Regelungen an echten Einheiten getestet werden
- **Rechenzentren:** DeepMind meldete 2016 für Google-Rechenzentren rund 40 % weniger Kühlenergie mit einer lernenden Optimierung
- **Kommerzielle Angebote:** Mehrere GA-Hersteller und Start-ups bieten prädiktive Optimierung als Cloud-Dienst an, meist als Sollwertvorgabe an die bestehende DDC

## Reinforcement Learning als Alternative

Reinforcement Learning (RL) lernt die optimale Strategie **ohne explizites Modell** durch Interaktion mit dem System:

- **Agent** (RL) ↔ **Environment** (Gebäude)
- Reward: Komfort − Energiekosten
- Vorteil: Kein Modell nötig, lernt nichtlineare Zusammenhänge
- Nachteil: Lernphase (Monate), wenig Interpretierbarkeit, Sicherheitsrisiken

**Stand heute:** In realen Gebäuden ist RL noch selten, aber ein aktives Forschungsfeld, unter anderem an der EPFL und der Empa.

## Praktische Einstiegspunkte für GA-Praktiker

1. **Wetterdaten:** open-meteo.com ist für nicht-kommerzielle Nutzung kostenlos, für kommerzielle Projekte kostenpflichtig. MeteoSchweiz stellt Mess- und Prognosedaten als offene Daten bereit.
2. **Python MPC-Bibliotheken**: `do-mpc`, `casadi` — für Prototypen
3. **Simple Prädiktivregelung**: Zeitprogramm mit Wetterkorrektur in jedem DDC umsetzbar
4. **Datengrundlage**: Trendaufzeichnung (15-min-Intervall, 1 Jahr) als Basis für Modellkalibrierung

<!-- EN -->

Model Predictive Control is an advanced control technique that uses a mathematical model of the building to **optimise proactively** — as opposed to classical PID controllers, which only react to current deviations.

## Basic Principle

MPC solves an optimisation problem at every time step:

| Step         | Content                                                                    |
| ------------ | -------------------------------------------------------------------------- |
| **Given**    | current state x(t), model of the building                                  |
| **Forecast** | weather, occupancy, electricity prices for N steps ahead                   |
| **Optimise** | outputs u(t), u(t+1) … u(t+N)                                              |
| **Goal**     | keep comfort, minimise energy or cost                                      |
| **Apply**    | only u(t), then recalculate everything at the next step (receding horizon) |

The **Receding Horizon** principle makes MPC robust: the plan is recalculated every time new measurements arrive.

## Building Model

The building model is the heart of any MPC. Typical model types:

### RC Network (Physics-Based)

Heat ↔ electricity analogy:

- **Thermal resistance R** [K/W] = 1/(U × A) — heat transfer through wall
- **Thermal capacitance C** [Wh/K] = m × cp — thermal mass (concrete, screed)
- State **x** = temperatures of nodes (room air, wall, floor)

A simple model of a room has two nodes:

- **Wall node** with heat capacity C_wall, connected to the outdoor air via R_out and to the room air via R_in
- **Room node** with the small capacity C_air, also connected directly to the outdoor air via R_window, because windows store hardly any heat
- Heat gains from heating, sun and people act on the room node, sun partly also on the wall

Such models have 3–20 states and can be calibrated on real measurement data.

### Data-Driven Models

- **ARX/ARMAX**: Linear regression on historical data
- **Neural network**: Higher accuracy but a black box
- **Gaussian process**: Probabilistic prediction with uncertainty quantification

## Optimisation Objectives

| Objective   | Typical Formulation                      |
| ----------- | ---------------------------------------- |
| Comfort     | Minimise Δ(T_room − T_setpoint)²         |
| Energy      | Minimise total energy consumption        |
| Cost        | Minimise grid import × spot price        |
| Peak demand | Peak-demand penalty (grid charges)       |
| CO₂         | Minimise emission factor × energy import |

In practice these objectives are combined with weights:

**J = w₁ × comfort deviation + w₂ × energy cost + w₃ × peak load**

## Weather Forecast Integration

MPC typically uses:

- **Short-term forecast** (1–48 h): temperature, solar irradiance, wind speed
- Sources: MeteoSwiss (open data), Meteoblue, open-meteo
- Uncertainty: the longer the horizon, the larger the error → robustness is important

**Pre-cooling example:** During a heat wave, MPC can cool the building to 21 °C overnight (free cooling, cheap electricity) and thereby relieve the air-conditioning system during the day — a classical PID controller cannot do this.

## Demand Response & Smart Grid

MPC is the natural interface for **demand response**:

- SG-Ready signal → MPC shifts heating/cooling loads
- Flexibility market: building becomes a "virtual power plant"
- Spot-price optimisation: heat pump runs when electricity is cheap or green

## Implementation Levels

### Simple: Predictive Pre-Heating

Single logic rule: "If weather forecast < −10 °C in 6 h, raise flow temperature setpoint by +3 K." Implementable in any DDC.

### Intermediate: Zone Optimisation

Separate models per zone, joint optimisation of heat generation. Typical for research projects and pilot installations.

### Full: Whole Building

Coupling of generation–distribution–zone–occupancy. Requires extensive data management and computing capacity (cloud or edge server).

## MPC vs. Classical Control

|                       | PID       | MPC                                                                |
| --------------------- | --------- | ------------------------------------------------------------------ |
| Horizon               | Present   | Future (N steps)                                                   |
| Model required        | No        | Yes                                                                |
| Implementation effort | Low       | High                                                               |
| Energy savings        | Baseline  | in studies often 10–30 %, strongly dependent on the starting point |
| Demand response       | Difficult | Naturally integrated                                               |
| Robustness            | High      | Depends on model quality                                           |
| Cost                  | Low       | Medium–high                                                        |
| Current status        | Standard  | Research / large buildings                                         |

## Practical Examples

- **Empa NEST, Dübendorf:** research building where predictive and learning controls are tested on real units
- **Data centres:** in 2016 DeepMind reported about 40 % less cooling energy for Google data centres with learning optimisation
- **Commercial offerings:** several BA manufacturers and start-ups offer predictive optimisation as a cloud service, usually as setpoints sent to the existing DDC

## Reinforcement Learning as an Alternative

Reinforcement Learning (RL) learns the optimal strategy **without an explicit model** through interaction with the system:

- **Agent** (RL) ↔ **Environment** (building)
- Reward: comfort − energy cost
- Advantage: no model required, learns non-linear relationships
- Disadvantage: long training period (months), limited interpretability, safety risks

**Today:** RL is still rare in real buildings, but an active research field, among others at EPFL and Empa.

## Practical Entry Points for BA Practitioners

1. **Weather data:** open-meteo.com is free for non-commercial use and paid for commercial projects. MeteoSwiss provides measured and forecast data as open data.
2. **Python MPC libraries**: `do-mpc`, `casadi` — for prototyping
3. **Simple predictive control**: Time schedule with weather correction is implementable in any DDC
4. **Data foundation**: Trend logging (15-min interval, 1 year) as the basis for model calibration
