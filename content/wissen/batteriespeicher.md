---
title: Batteriespeicher in der GA — BESS-Steuerung und Integration
slug: batteriespeicher
category: energie
subcategory: speicher
tags: [batteriespeicher, bess, lithium-ionen, lfp, nmc, soc, bms, peak-shaving, eigenverbrauch, notstrom, victron, byd, pylontech, sungrow, sunspec, can-bus-bms, lademanagement-speicher, ac-coupled, dc-coupled]
difficulty: fortgeschritten
area: [ga, elektro]
related: [pv-integration, ems-lastmanagement, sg-ready, energiemessung]
rechner: []
norm: [IEC 62619, IEC 62933, UL 9540, VDE-AR-E 2510-50]
updated: 2026-05-15
lang: de
---

# Batteriespeicher in der GA — BESS-Steuerung und Integration

Ein **Battery Energy Storage System (BESS)** im Gebäude ermöglicht die zeitliche Verschiebung von Energie: PV-Überschuss tagsüber speichern, abends oder nachts nutzen. Darüber hinaus dienen BESS-Systeme für Peak Shaving, Notstromversorgung und Netzdienstleistungen.

---

## Zelltechnologien im Gebäudebereich

| Technologie | Zellchemie | Vorteile | Nachteile |
|------------|-----------|----------|-----------|
| **LFP** (Lithium-Eisenphosphat) | LiFePO₄ | Sehr sicher, 4000+ Zyklen, kein Thermisches Durchgehen | Niedrigere Energiedichte |
| **NMC** (Nickel-Mangan-Kobalt) | LiNiMnCoO₂ | Höhere Energiedichte | Teurer, empfindlicher |
| **NaS** (Natrium-Schwefel) | — | Grosse Kapazität (MW-Bereich) | Nur Industrieanwendung |

**Standard im Wohngebäude und KMU:** LFP — sicher, langlebig, kein Kobalteinsatz.

---

## Systemtopologien

### AC-gekoppelt
Batterie-Wechselrichter ist unabhängig vom PV-Wechselrichter am AC-Bus angeschlossen:
```
PV-WR ──┐
         ├── AC-Bus (230/400V) ── Netz
Bat-WR ──┘         │
                Verbraucher
```
- Vorteil: Flexibel, WR austauschbar, auch für Nachrüstung
- Nachteil: Doppelwandlung (PV → AC → Batterie) reduziert Wirkungsgrad leicht

### DC-gekoppelt
PV und Batterie am selben DC-Kreis, gemeinsamer Hybrid-Wechselrichter:
```
PV-Module ──── MPPT ──┐
                       ├── Hybrid-WR ── AC-Bus ── Netz
Batterie  ─────────────┘
```
- Vorteil: Höherer Wirkungsgrad, weniger Komponenten
- Nachteil: PV und Batterie müssen kompatibel sein

---

## BMS — Battery Management System

Das BMS überwacht und schützt die Batteriezellen:

| Funktion | Beschreibung |
|---------|-------------|
| SoC-Berechnung | State of Charge (0–100%), Coulomb-Counting + Spannungsmodell |
| SoH-Bewertung | State of Health — Kapazitätsverlust über Lebenszeit |
| Zellenbalancing | Ausgleich zwischen über-/untergeladenen Zellen |
| Temperaturschutz | Abschaltung bei > 55°C / < 0°C |
| Überspannungsschutz | Schutz bei Zellenspannung > 3,65 V (LFP) |
| Kurzschlussschutz | Sofortabschaltung bei Überstrom |

### BMS-Kommunikation

| Schnittstelle | Einsatz |
|--------------|---------|
| **CAN Bus** | Industrie-BESS, Pylontech, BYD, SMA |
| **Modbus RTU/TCP** | Victron Lynx, SolarEdge, Fronius |
| **SunSpec Modbus** | Standardisiert (Model 802: Storage) |
| **RS-485** | Ältere Systeme |

---

## Steuerungsstrategien

### 1. Eigenverbrauchsoptimierung
PV-Überschuss → Batterie laden, Netzeinspeisung minimieren.
Abends → Batterie entladen bis SoC-Min (typisch 10–20%).

### 2. Peak Shaving
Leistungsspitzen am Netzanschlusspunkt kappen:
```
Wenn P_Netz > P_Peak_Limit:
    Batterie entladen mit (P_Netz − P_Peak_Limit)
```
Relevant für Industriekunden mit Leistungspreiskomponente im Stromtarif.

### 3. Arbitrage / Time-of-Use
Batterie bei günstigen Strompreisen (Nacht/PV-Überschuss) laden, bei teuren Zeiten entladen. Setzt Zeitvariablen Tarif (Spot-Preis) voraus.

### 4. Notstromfunktion (Backup)
Bei Netzausfall: Batterie + PV versorgen definierte Notstromkreise. Erfordert Notstromumschalter (automatisch), Inselbetrieb-fähiger Wechselrichter.

### 5. Netzdienstleistungen (FCR, aFRR)
Frequenzhaltung: BESS reagiert innerhalb von Sekunden auf Frequenzabweichungen. Nur mit Aggregator und entsprechender Zulassung sinnvoll.

---

## Integration ins EMS / GA

```
EMS (Home Assistant / Loxone / Beckhoff)
     │
     ├── Wechselrichter (Modbus TCP / SunSpec)
     │     ├── PV-Ertrag [kW]
     │     ├── Batterie SoC [%]
     │     ├── Lade-/Entladeleistung [kW]
     │     └── Betriebsmodus setzen
     │
     └── Netz-Zähler (Modbus TCP)
           └── Netzein-/-rückspeisung [kW]
```

**Wichtige Steuerbefehle über Modbus:**
- Forced Charge: Batterie mit Netzstrom laden (z.B. bei günstigem Tarif)
- Forced Discharge: Batterie entladen unabhängig vom Netzstatus
- SoC Reserve setzen: Mindest-SoC für Notstromreserve

---

## Dimensionierungsrichtwerte

| Anwendung | Speicherkapazität | Leistung |
|-----------|-----------------|---------|
| EFH (5 kWp PV) | 5–10 kWh | 3–5 kW |
| MFH / KMU | 20–100 kWh | 10–50 kW |
| Peak Shaving Gewerbe | Annahme: 1–2h Spitzenlast | P_Peak × 1–2 h |
| Notstromversorgung 4h | Kritische Last × 4h | Gleiche Leistung wie Last |

---

## Wichtige Normen

- **IEC 62619**: Sicherheitsanforderungen Lithium-Akkumulatoren stationäre Anwendungen
- **VDE-AR-E 2510-50**: Batteriestationäre Anlagen am Niederspannungsnetz (DE)
- **IEC 62933**: Grid Integration of Energy Storage Systems
