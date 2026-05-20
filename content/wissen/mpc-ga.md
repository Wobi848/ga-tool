---
title: Model Predictive Control (MPC) in der Gebäudeautomation
title_en: Model Predictive Control (MPC) in Building Automation
slug: mpc-ga
category: regelung
subcategory: optimierung
tags: [mpc, modellprädiktiverregler, prädiktiveregelung, optimierung, thermischesmodell, energieoptimierung, wetterprognose, preissignal, demand-response, reinforcementlearning, ml-ga]
difficulty: fortgeschritten
area: [ga, hlk]
related: [pid-regler, kaskadenregelung, regelkreise, demand-response, sg-ready, batteriespeicher, thermische-behaglichkeit]
norm: [ISO 52016, EN 15232]
updated: 2026-05-15
lang: de
---

# Model Predictive Control (MPC) in der Gebäudeautomation

Model Predictive Control ist ein fortgeschrittenes Regelungsverfahren, das ein mathematisches Modell des Gebäudes nutzt, um **vorausschauend zu optimieren** — im Gegensatz zu klassischen PID-Reglern, die nur auf aktuelle Abweichungen reagieren.

## Grundprinzip

MPC löst in jedem Zeitschritt ein Optimierungsproblem:

```
Gegeben:   aktueller Zustand x(t), Modell des Gebäudes
Prognose:  Wetterdaten, Nutzerverhalten, Strompreise (N Schritte voraus)
Optimiere: Stellgrössen u(t), u(t+1), ..., u(t+N)
Ziel:      Komfort maximieren, Energie/Kosten minimieren
Wende an:  nur u(t), nächster Schritt → wiederholen (Receding Horizon)
```

Das **Receding-Horizon**-Prinzip macht MPC robust: Der Plan wird jedes Mal neu berechnet, sobald neue Messwerte vorliegen.

## Gebäudemodell

Das Herzstück jedes MPC ist das Gebäudemodell. Typische Modelltypen:

### RC-Netzwerk (physikalisch)
Analogie Wärme ↔ Elektrizität:
- **Wärmewiderstand R** [K/W] = 1/(U × A) — Wärmedurchgang durch Wand
- **Wärmekapazität C** [Wh/K] = m × cp — thermische Masse (Beton, Estrich)
- Zustand **x** = Temperaturen der Knoten (Raumluft, Wand, Fussboden)

```
        R_Wand           R_Fenster
Taussen ──┤├── T_Wand ──┤├── T_Raum
               │                │
              C_Wand            C_Luft
               │                │
              GND              GND
```

Solche Modelle haben 3–20 Zustände und können auf echten Messdaten kalibriert werden.

### Datengetriebene Modelle
- **ARX/ARMAX**: Lineare Regression auf historischen Daten
- **Neural Network**: Mehr Genauigkeit, aber Black Box
- **Gaussian Process**: Probabilistische Vorhersage mit Unsicherheit

## Optimierungsziele

| Ziel | Typische Formulierung |
|---|---|
| Komfort | Δ(T_Raum − T_Soll)² minimieren |
| Energie | Gesamtenergieverbrauch minimieren |
| Kosten | Strombezug × Spotpreis minimieren |
| Lastspitzen | Peak-Demand Penalty (Netzgebühren) |
| CO₂ | Emissionsfaktor × Energiebezug minimieren |

In der Praxis werden diese Ziele gewichtet kombiniert:

**J = w₁ × Komfortabweichung + w₂ × Energiekosten + w₃ × Spitzenlast**

## Wetterprognose-Integration

MPC nutzt typischerweise:
- **Kurzfristprognose** (1–48h): Temperatur, Strahlung, Windgeschwindigkeit
- Quellen: Meteoblue, DWD, open-meteo API (kostenlos)
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

| | PID | MPC |
|---|---|---|
| Horizon | Gegenwart | Zukunft (N Schritte) |
| Modell nötig | Nein | Ja |
| Implementierungsaufwand | Gering | Hoch |
| Energieeinsparung | Basis | 10–30% zusätzlich möglich |
| Demand Response | Schwierig | Natürlich integriert |
| Robustheit | Hoch | Abhängig von Modellgüte |
| Kosten | Gering | Mittel–hoch |
| Stand heute | Standard | Forschung / Grossbauten |

## Praxisbeispiele

- **ETH Zürich DFAB HOUSE**: MPC für Heizung/Lüftung mit Solarpanelen, 20% Energieeinsparung vs. Baseline
- **Siemens Desigo Optic**: Kommerzielle MPC-Lösung für Grossbauten
- **Google DeepMind Google Datacenter**: RL-basierte Kühlungsoptimierung, −40% Kühlenergie

## Reinforcement Learning als Alternative

Reinforcement Learning (RL) lernt die optimale Strategie **ohne explizites Modell** durch Interaktion mit dem System:

- **Agent** (RL) ↔ **Environment** (Gebäude)
- Reward: Komfort − Energiekosten
- Vorteil: Kein Modell nötig, lernt nichtlineare Zusammenhänge
- Nachteil: Lernphase (Monate), wenig Interpretierbarkeit, Sicherheitsrisiken

**Status 2024**: RL in realen Gebäuden noch selten, aber aktives Forschungsfeld (DeepMind, Berkeley, EPFL).

## Praktische Einstiegspunkte für GA-Praktiker

1. **Wetterdaten API**: open-meteo.com — kostenlos, REST-API, kein Key nötig
2. **Python MPC-Bibliotheken**: `do-mpc`, `casadi` — für Prototypen
3. **Simple Prädiktivregelung**: Zeitprogramm mit Wetterkorrektur in jedem DDC umsetzbar
4. **Datengrundlage**: Trendaufzeichnung (15-min-Intervall, 1 Jahr) als Basis für Modellkalibrierung

<!-- EN -->

Model Predictive Control is an advanced control technique that uses a mathematical model of the building to **optimise proactively** — as opposed to classical PID controllers, which only react to current deviations.

## Basic Principle

MPC solves an optimisation problem at every time step:

```
Given:     current state x(t), building model
Forecast:  weather data, occupancy, electricity prices (N steps ahead)
Optimise:  control inputs u(t), u(t+1), ..., u(t+N)
Objective: maximise comfort, minimise energy / cost
Apply:     only u(t), then repeat at next step (Receding Horizon)
```

The **Receding Horizon** principle makes MPC robust: the plan is recalculated every time new measurements arrive.

## Building Model

The building model is the heart of any MPC. Typical model types:

### RC Network (Physics-Based)
Heat ↔ electricity analogy:
- **Thermal resistance R** [K/W] = 1/(U × A) — heat transfer through wall
- **Thermal capacitance C** [Wh/K] = m × cp — thermal mass (concrete, screed)
- State **x** = temperatures of nodes (room air, wall, floor)

```
        R_wall           R_window
T_out ──┤├── T_wall ──┤├── T_room
               │                │
             C_wall           C_air
               │                │
              GND              GND
```

Such models have 3–20 states and can be calibrated on real measurement data.

### Data-Driven Models
- **ARX/ARMAX**: Linear regression on historical data
- **Neural network**: Higher accuracy but a black box
- **Gaussian process**: Probabilistic prediction with uncertainty quantification

## Optimisation Objectives

| Objective | Typical Formulation |
|-----------|-------------------|
| Comfort | Minimise Δ(T_room − T_setpoint)² |
| Energy | Minimise total energy consumption |
| Cost | Minimise grid import × spot price |
| Peak demand | Peak-demand penalty (grid charges) |
| CO₂ | Minimise emission factor × energy import |

In practice these objectives are combined with weights:

**J = w₁ × comfort deviation + w₂ × energy cost + w₃ × peak load**

## Weather Forecast Integration

MPC typically uses:
- **Short-term forecast** (1–48 h): temperature, solar irradiance, wind speed
- Sources: Meteoblue, DWD, open-meteo API (free)
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

| | PID | MPC |
|---|---|---|
| Horizon | Present | Future (N steps) |
| Model required | No | Yes |
| Implementation effort | Low | High |
| Energy savings | Baseline | 10–30% additional possible |
| Demand response | Difficult | Naturally integrated |
| Robustness | High | Depends on model quality |
| Cost | Low | Medium–high |
| Current status | Standard | Research / large buildings |

## Practical Examples

- **ETH Zurich DFAB HOUSE**: MPC for heating/ventilation with solar panels, 20% energy savings vs. baseline
- **Siemens Desigo Optic**: Commercial MPC solution for large buildings
- **Google DeepMind data centres**: RL-based cooling optimisation, −40% cooling energy

## Reinforcement Learning as an Alternative

Reinforcement Learning (RL) learns the optimal strategy **without an explicit model** through interaction with the system:

- **Agent** (RL) ↔ **Environment** (building)
- Reward: comfort − energy cost
- Advantage: no model required, learns non-linear relationships
- Disadvantage: long training period (months), limited interpretability, safety risks

**Status 2024**: RL in real buildings still rare, but an active research field (DeepMind, Berkeley, EPFL).

## Practical Entry Points for BA Practitioners

1. **Weather data API**: open-meteo.com — free, REST API, no key required
2. **Python MPC libraries**: `do-mpc`, `casadi` — for prototyping
3. **Simple predictive control**: Time schedule with weather correction is implementable in any DDC
4. **Data foundation**: Trend logging (15-min interval, 1 year) as the basis for model calibration
