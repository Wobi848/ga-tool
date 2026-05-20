---
title: SG-Ready — Smart-Grid-Schnittstelle für steuerbare Verbraucher
title_en: SG-Ready — Smart Grid Interface for Controllable Loads
slug: sg-ready
category: energie
subcategory: smart-grid
tags: [sg-ready, smart-grid, waermepumpe, heizstab, bwp, wärmepumpenverband, pv-überschuss, lastverschiebung, potentialfreier-kontakt, evup, netz-ampel, flexibilität, demand-response-einfach]
difficulty: grundlagen
area: [ga, hlk, elektro]
related: [waermepumpe, pv-integration, ems-lastmanagement, batteriespeicher, demand-response]
rechner: []
norm: [BWP SG-Ready Anforderungsprofil, VDE-AR-N 4105]
updated: 2026-05-15
lang: de
---

# SG-Ready — Smart-Grid-Schnittstelle für steuerbare Verbraucher

**SG-Ready** (Smart Grid Ready) ist ein einfaches, hardwarebasiertes Interface, das es dem Energieversorger oder einem lokalen EMS erlaubt, steuerbare Lasten (v.a. Wärmepumpen) in 4 Betriebszustände zu versetzen. Definiert durch den **Bundesverband Wärmepumpe (BWP)**.

---

## Die 4 Betriebszustände

Das SG-Ready-Interface besteht aus **2 potentialfreien Kontakten** (Eingang am Gerät):

| Kontakt 1 | Kontakt 2 | Zustand | Beschreibung |
|-----------|-----------|---------|-------------|
| offen | offen | **1 — EVU-Sperre** | Zwangsabschaltung durch Netzversorger (Niedertarif-Sperre, max. 2h/Tag) |
| geschlossen | offen | **2 — Normalbetrieb** | Standard — geräteeigene Regelung aktiv |
| offen | geschlossen | **3 — Einschaltempfehlung** | PV-Überschuss / günstiger Tarif: Leistung erhöhen, WW-Temperatur anheben |
| geschlossen | geschlossen | **4 — Einschaltbefehl** | Muss laufen (Überschussstrom, Regelenergie): Max-Leistung erzwingen |

**Normalzustand ohne EMS:** Beide Kontakte offen (Zustand 1) oder Kontakt 1 geschlossen (Zustand 2), je nach Herstellerauslieferung.

---

## Anwendungsbeispiel: PV-Überschuss + Wärmepumpe

```
PV-Anlage
    │
    EMS (z.B. Home Assistant)
    │
    ├── Wenn P_PV_Überschuss > 2 kW → SG-Ready Zustand 3 setzen
    │     → Wärmepumpe erhöht WW-Sollwert auf 55°C (statt 45°C)
    │
    └── Wenn P_PV_Überschuss > 4 kW → SG-Ready Zustand 4 setzen
          → Wärmepumpe läuft auf Vollleistung
```

Die Wärmepumpe nutzt günstigen Solarstrom und erzeugt thermische Energie, die im Pufferspeicher gespeichert wird. Abends läuft die WP weniger oder gar nicht.

---

## Hardware-Umsetzung im Schaltschrank

```
EMS-Steuerung / Relaisausgang
     │
     ├── Relais K1 → SG-Eingang Kontakt 1 der WP
     └── Relais K2 → SG-Eingang Kontakt 2 der WP
```

- **Relais:** Standard 230V-Relais mit potentialfreiem Wechselkontakt, oder direkt Schaltausgang der DDC
- **Kabelführung:** Steuerkabel 2×0,75 mm² ausreichend
- **Maximale Spannung am SG-Eingang:** typisch SELV (≤ 24V DC), herstellerabhängig prüfen!

---

## Geräteunterstützung

| Hersteller | Produkte |
|-----------|---------|
| Vaillant | aroTHERM plus, flexoTHERM |
| Stiebel Eltron | WPL, WPF, WWK |
| Viessmann | Vitocal 200-S/250-A |
| Daikin | Altherma 3 |
| Bosch | Compress 7000i, 3000i |
| Nibe | F2040, S2125 |

SG-Ready-Geräte tragen das entsprechende Logo auf dem Typenschild.

---

## SG-Ready vs. Modbus / Wärmpumpen-API

| Merkmal | SG-Ready | Wärmepumpen-Modbus |
|---------|----------|-------------------|
| Aufwand | Sehr gering (2 Drähte) | Mittel (Schnittstelle, Protokoll) |
| Stellfreiheit | 4 Zustände | Vollständige Parameter |
| Rückmeldung | Keine | Istwerte, Betriebsmode, Fehler |
| Zuverlässigkeit | Sehr hoch (hardware) | Abhängig von Softwareimplementierung |
| Einsatz | Retrofit, einfache Steuerung | GLT-Integration, Monitoring |

---

## SG-Ready im EMS-Kontext

SG-Ready ist eine **pragmatische Lösung** für den Massenmarkt: keine Cloud, keine Konfiguration, minimaler Installationsaufwand. Für professionelle GA-Anwendungen wird SG-Ready häufig durch eine vollständige Modbus-Integration der Wärmepumpe ergänzt oder ersetzt.

**Typische EMS-Implementierung:**
```
EMS-Logik:
  P_solar = wechselrichter.read('P_AC')
  P_verbrauch = zaehler.read('P_Bezug')
  P_überschuss = P_solar - P_verbrauch

  if P_überschuss > 4.0:   → Zustand 4 (Pflichtbetrieb)
  elif P_überschuss > 1.5: → Zustand 3 (Empfehlung)
  else:                    → Zustand 2 (Normal)
```

<!-- EN -->

**SG-Ready** (Smart Grid Ready) is a simple, hardware-based interface that allows the grid operator or a local EMS to set controllable loads (primarily heat pumps) into 4 operating states. Defined by the **German Heat Pump Association (BWP)**.

---

## The 4 Operating States

The SG-Ready interface consists of **2 volt-free contacts** (inputs on the device):

| Contact 1 | Contact 2 | State | Description |
|-----------|-----------|-------|-------------|
| open | open | **1 — Grid lock** | Forced shutdown by grid operator (off-peak lock, max. 2h/day) |
| closed | open | **2 — Normal operation** | Standard — device's own control active |
| open | closed | **3 — Switch-on recommendation** | PV surplus / cheap tariff: increase output, raise DHW setpoint |
| closed | closed | **4 — Switch-on command** | Must run (surplus power, balancing energy): force maximum output |

**Default state without EMS:** Both contacts open (state 1) or contact 1 closed (state 2), depending on manufacturer default.

---

## Application Example: PV Surplus + Heat Pump

```
PV system
    │
    EMS (e.g. Home Assistant)
    │
    ├── If P_PV_surplus > 2 kW → set SG-Ready state 3
    │     → Heat pump raises DHW setpoint to 55°C (instead of 45°C)
    │
    └── If P_PV_surplus > 4 kW → set SG-Ready state 4
          → Heat pump runs at full capacity
```

The heat pump uses cheap solar power and generates thermal energy stored in the buffer tank. In the evening the heat pump runs less or not at all.

---

## Hardware Implementation in the Control Panel

```
EMS controller / relay output
     │
     ├── Relay K1 → SG input contact 1 of heat pump
     └── Relay K2 → SG input contact 2 of heat pump
```

- **Relay:** Standard 230V relay with volt-free changeover contact, or direct switching output from DDC
- **Wiring:** Control cable 2×0.75 mm² is sufficient
- **Maximum voltage at SG input:** typically SELV (≤ 24V DC) — check manufacturer specs!

---

## Device Support

| Manufacturer | Products |
|-------------|---------|
| Vaillant | aroTHERM plus, flexoTHERM |
| Stiebel Eltron | WPL, WPF, WWK |
| Viessmann | Vitocal 200-S/250-A |
| Daikin | Altherma 3 |
| Bosch | Compress 7000i, 3000i |
| Nibe | F2040, S2125 |

SG-Ready certified devices carry the corresponding logo on the nameplate.

---

## SG-Ready vs. Modbus / Heat Pump API

| Feature | SG-Ready | Heat Pump Modbus |
|---------|----------|-----------------|
| Effort | Very low (2 wires) | Medium (interface, protocol) |
| Control granularity | 4 states | Full parameter access |
| Feedback | None | Actual values, operating mode, faults |
| Reliability | Very high (hardware) | Depends on software implementation |
| Use case | Retrofit, simple control | BMS integration, monitoring |

---

## SG-Ready in EMS Context

SG-Ready is a **pragmatic mass-market solution**: no cloud, no configuration, minimal installation effort. For professional BA applications, SG-Ready is frequently supplemented or replaced by a full Modbus integration of the heat pump.

**Typical EMS implementation:**
```
EMS logic:
  P_solar    = inverter.read('P_AC')
  P_load     = meter.read('P_grid_import')
  P_surplus  = P_solar - P_load

  if P_surplus > 4.0:   → State 4 (mandatory operation)
  elif P_surplus > 1.5: → State 3 (recommendation)
  else:                 → State 2 (normal)
```
