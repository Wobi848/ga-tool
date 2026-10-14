---
title: Batteriespeicher in der GA — BESS-Steuerung und Integration
title_en: Battery Storage in BA — BESS Control and Integration
slug: batteriespeicher
category: energie
subcategory: speicher
tags:
  [
    batteriespeicher,
    bess,
    lithium-ionen,
    lfp,
    nmc,
    soc,
    bms,
    peak-shaving,
    eigenverbrauch,
    notstrom,
    victron,
    byd,
    pylontech,
    sungrow,
    sunspec,
    can-bus-bms,
    lademanagement-speicher,
    ac-coupled,
    dc-coupled
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [pv-integration, ems-lastmanagement, sg-ready, energiemessung]
rechner: []
norm: [IEC 62619, IEC 62933, UL 9540, VDE-AR-E 2510-50]
updated: 2026-10-14
lang: de
---

# Batteriespeicher in der GA — BESS-Steuerung und Integration

Ein **Battery Energy Storage System (BESS)** im Gebäude ermöglicht die zeitliche Verschiebung von Energie: PV-Überschuss tagsüber speichern, abends oder nachts nutzen. Darüber hinaus dienen BESS-Systeme für Peak Shaving, Notstromversorgung und Netzdienstleistungen.

---

## Zelltechnologien im Gebäudebereich

| Technologie                     | Zellchemie | Vorteile                                                                                         | Nachteile                |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------ | ------------------------ |
| **LFP** (Lithium-Eisenphosphat) | LiFePO₄    | sehr stabil, thermisches Durchgehen erst bei hohen Temperaturen und weniger heftig, 4000+ Zyklen | Niedrigere Energiedichte |
| **NMC** (Nickel-Mangan-Kobalt)  | LiNiMnCoO₂ | Höhere Energiedichte                                                                             | Teurer, empfindlicher    |
| **NaS** (Natrium-Schwefel)      | —          | Grosse Kapazität (MW-Bereich)                                                                    | Nur Industrieanwendung   |

**Standard im Wohngebäude und KMU:** LFP — sicher, langlebig, kein Kobalteinsatz.

---

## Systemtopologien

### AC-gekoppelt

Batterie-Wechselrichter ist unabhängig vom PV-Wechselrichter am AC-Bus angeschlossen:

PV-Wechselrichter und Batteriewechselrichter hängen getrennt am AC-Netz des Gebäudes. Der PV-Strom wird zuerst in Wechselstrom gewandelt und für die Batterie wieder in Gleichstrom.

- Vorteil: Flexibel, WR austauschbar, auch für Nachrüstung
- Nachteil: Doppelwandlung (PV → AC → Batterie) reduziert Wirkungsgrad leicht

### DC-gekoppelt

PV und Batterie am selben DC-Kreis, gemeinsamer Hybrid-Wechselrichter:

PV-Module und Batterie hängen am Gleichstromkreis eines gemeinsamen Hybridwechselrichters, der ans AC-Netz des Gebäudes angeschlossen ist.

- Vorteil: Höherer Wirkungsgrad, weniger Komponenten
- Nachteil: PV und Batterie müssen kompatibel sein

---

## BMS — Battery Management System

Das BMS überwacht und schützt die Batteriezellen:

| Funktion            | Beschreibung                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------- |
| SoC-Berechnung      | State of Charge (0–100%), Coulomb-Counting + Spannungsmodell                                       |
| SoH-Bewertung       | State of Health — Kapazitätsverlust über Lebenszeit                                                |
| Zellenbalancing     | Ausgleich zwischen über-/untergeladenen Zellen                                                     |
| Temperaturschutz    | Laden unter etwa 0 °C gesperrt oder reduziert, Abschaltung bei zu hoher Temperatur nach Datenblatt |
| Überspannungsschutz | Schutz bei Zellenspannung > 3,65 V (LFP)                                                           |
| Kurzschlussschutz   | Sofortabschaltung bei Überstrom                                                                    |

### BMS-Kommunikation

| Schnittstelle      | Einsatz                                                              |
| ------------------ | -------------------------------------------------------------------- |
| **CAN-Bus**        | Batterie zu Wechselrichter, herstellerspezifische Protokolle         |
| **Modbus RTU/TCP** | Wechselrichter oder Batteriesystem zur GA                            |
| **SunSpec Modbus** | Standardisiert (Model 802: Storage)                                  |
| **RS-485**         | physikalische Schicht für Modbus RTU und manche Herstellerprotokolle |

---

## Steuerungsstrategien

### 1. Eigenverbrauchsoptimierung

PV-Überschuss → Batterie laden, Netzeinspeisung minimieren.
Abends → Batterie entladen bis SoC-Min (typisch 10–20%).

### 2. Peak Shaving

Leistungsspitzen am Netzanschlusspunkt kappen:

<p class="formel">P<sub>Entladen</sub> = P<sub>Netz</sub> − P<sub>Limit</sub> &nbsp; solange P<sub>Netz</sub> &gt; P<sub>Limit</sub></p>

Damit das klappt, muss die Batterie zum Zeitpunkt der Spitze genug geladen sein. Peak Shaving und Eigenverbrauchsoptimierung konkurrieren um denselben Speicher.

Relevant für Industriekunden mit Leistungspreiskomponente im Stromtarif.

### 3. Arbitrage / Time-of-Use

Batterie bei günstigen Strompreisen (Nacht/PV-Überschuss) laden, bei teuren Zeiten entladen. Setzt Zeitvariablen Tarif (Spot-Preis) voraus.

### 4. Notstromfunktion (Backup)

Bei Netzausfall: Batterie + PV versorgen definierte Notstromkreise. Erfordert Notstromumschalter (automatisch), Inselbetrieb-fähiger Wechselrichter.

### 5. Netzdienstleistungen (FCR, aFRR)

Frequenzhaltung: BESS reagiert innerhalb von Sekunden auf Frequenzabweichungen. Nur mit Aggregator und entsprechender Zulassung sinnvoll.

---

## Integration ins EMS / GA

| Quelle                                  | Daten                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------- |
| Wechselrichter, Modbus TCP oder SunSpec | PV-Leistung, Ladezustand, Lade- und Entladeleistung, Betriebsmodus vorgeben |
| Zähler am Netzanschluss, Modbus         | Bezug und Einspeisung in Echtzeit                                           |
| EMS oder GLT                            | entscheidet und gibt Sollwerte vor                                          |

**Wichtige Steuerbefehle über Modbus:**

- Forced Charge: Batterie mit Netzstrom laden (z.B. bei günstigem Tarif)
- Forced Discharge: Batterie entladen unabhängig vom Netzstatus
- SoC Reserve setzen: Mindest-SoC für Notstromreserve

---

## Dimensionierungsrichtwerte

| Anwendung             | Speicherkapazität         | Leistung                  |
| --------------------- | ------------------------- | ------------------------- |
| EFH (5 kWp PV)        | 5–10 kWh                  | 3–5 kW                    |
| MFH / KMU             | 20–100 kWh                | 10–50 kW                  |
| Peak Shaving Gewerbe  | Annahme: 1–2h Spitzenlast | P_Peak × 1–2 h            |
| Notstromversorgung 4h | Kritische Last × 4h       | Gleiche Leistung wie Last |

---

## Wichtige Normen

- **IEC 62619**: Sicherheitsanforderungen Lithium-Akkumulatoren stationäre Anwendungen
- **VDE-AR-E 2510-50**: Batteriestationäre Anlagen am Niederspannungsnetz (DE)
- **IEC 62933**: Grid Integration of Energy Storage Systems

<!-- EN -->

A **Battery Energy Storage System (BESS)** in a building enables temporal energy shifting: store PV surplus during the day, use it in the evening or at night. BESS systems also serve for peak shaving, backup power, and grid services.

---

## Cell Technologies in the Building Sector

| Technology                        | Cell Chemistry | Advantages                                                                            | Disadvantages                  |
| --------------------------------- | -------------- | ------------------------------------------------------------------------------------- | ------------------------------ |
| **LFP** (Lithium Iron Phosphate)  | LiFePO₄        | very stable, thermal runaway only at high temperatures and less violent, 4000+ cycles | Lower energy density           |
| **NMC** (Nickel Manganese Cobalt) | LiNiMnCoO₂     | Higher energy density                                                                 | More expensive, more sensitive |
| **NaS** (Sodium Sulphur)          | —              | Large capacity (MW range)                                                             | Industrial applications only   |

**Standard for residential and SME:** LFP — safe, long-lasting, no cobalt.

---

## System Topologies

### AC-Coupled

Battery inverter is connected independently from the PV inverter at the AC bus:

PV inverter and battery inverter are connected separately to the building AC network. PV power is first converted to AC and then back to DC for the battery.

- Advantage: Flexible, inverters can be replaced independently, suitable for retrofit
- Disadvantage: Double conversion (PV → AC → battery) reduces efficiency slightly

### DC-Coupled

PV and battery share the same DC link, with a common hybrid inverter:

PV modules and battery share the DC circuit of a common hybrid inverter, which is connected to the building AC network.

- Advantage: Higher efficiency, fewer components
- Disadvantage: PV and battery must be compatible

---

## BMS — Battery Management System

The BMS monitors and protects the battery cells:

| Function                 | Description                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| SoC calculation          | State of Charge (0–100%), Coulomb counting + voltage model                                     |
| SoH assessment           | State of Health — capacity loss over lifetime                                                  |
| Cell balancing           | Equalisation between over- and under-charged cells                                             |
| Temperature protection   | charging blocked or reduced below about 0 °C, shutdown at excessive temperature per data sheet |
| Overvoltage protection   | Protection at cell voltage > 3.65 V (LFP)                                                      |
| Short-circuit protection | Immediate shutdown on overcurrent                                                              |

### BMS Communication

| Interface          | Application                                                   |
| ------------------ | ------------------------------------------------------------- |
| **CAN bus**        | battery to inverter, manufacturer-specific protocols          |
| **Modbus RTU/TCP** | inverter or battery system to the BA                          |
| **SunSpec Modbus** | Standardised (Model 802: Storage)                             |
| **RS-485**         | physical layer for Modbus RTU and some manufacturer protocols |

---

## Control Strategies

### 1. Self-Consumption Optimisation

PV surplus → charge battery, minimise grid export.
Evening → discharge battery until SoC-min (typically 10–20%).

### 2. Peak Shaving

Cap power peaks at the grid connection point:

<p class="formel">P<sub>discharge</sub> = P<sub>grid</sub> − P<sub>limit</sub> &nbsp; as long as P<sub>grid</sub> &gt; P<sub>limit</sub></p>

For this to work, the battery must be sufficiently charged when the peak occurs. Peak shaving and self-consumption optimisation compete for the same storage.

Relevant for commercial customers with a demand charge component in their electricity tariff.

### 3. Arbitrage / Time-of-Use

Charge battery during cheap electricity periods (night/PV surplus), discharge when rates are high. Requires a time-of-use or spot-price tariff.

### 4. Backup Power

On grid failure: battery + PV supply defined backup circuits. Requires automatic transfer switch and island-capable inverter.

### 5. Grid Services (FCR, aFRR)

Frequency response: BESS reacts within seconds to frequency deviations. Only viable with an aggregator and appropriate certification.

---

## Integration into EMS / BA

| Source                          | Data                                                                      |
| ------------------------------- | ------------------------------------------------------------------------- |
| Inverter, Modbus TCP or SunSpec | PV power, state of charge, charge and discharge power, set operating mode |
| Grid connection meter, Modbus   | import and export in real time                                            |
| EMS or BMS                      | decides and sends setpoints                                               |

**Key Modbus control commands:**

- Forced charge: charge battery from grid (e.g. during cheap tariff period)
- Forced discharge: discharge battery independent of grid status
- Set SoC reserve: minimum SoC for backup power reserve

---

## Sizing Guidelines

| Application                   | Storage Capacity            | Power          |
| ----------------------------- | --------------------------- | -------------- |
| Single-family home (5 kWp PV) | 5–10 kWh                    | 3–5 kW         |
| Multi-family / SME            | 20–100 kWh                  | 10–50 kW       |
| Commercial peak shaving       | Assumption: 1–2 h peak load | P_peak × 1–2 h |
| 4-hour backup power           | Critical load × 4 h         | Same as load   |

---

## Key Standards

- **IEC 62619**: Safety requirements for secondary lithium cells and batteries for use in stationary applications
- **VDE-AR-E 2510-50**: Stationary battery systems at the low-voltage grid (DE)
- **IEC 62933**: Grid integration of electrical energy storage systems
