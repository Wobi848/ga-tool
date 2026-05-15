---
title: Model Predictive Control (MPC) in der Gebäudeautomation
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
