---
title: E-Mobility und Lademanagement in der GA
title_en: E-Mobility and Charge Management in BA
slug: e-mobility-lademanagement
category: energie
subcategory: e-mobility
tags: [elektromobilität, ladeinfrastruktur, ocpp, evse, ac-laden, dc-laden, wallbox, lademanagement, lastmanagement, phasenbalancierung, ocpi, iso15118, plug-and-charge, smart-charging, dynamic-load-management, bid-direktiv, ladesäule]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, pv-integration, batteriespeicher, sg-ready, energiemessung]
rechner: []
norm: [IEC 61851, ISO 15118, OCPP 1.6/2.0.1, OCPI 2.2, IEC 62196, DIN EN 17186]
updated: 2026-05-15
lang: de
---

# E-Mobility und Lademanagement in der GA

Elektromobilität ist eine der grössten neuen Lasten im Gebäude. Ein **Lademanagement-System** koordiniert mehrere Ladepunkte, verhindert Netzüberlastung und integriert das Laden in die gesamte Energiestrategie (PV-Überschuss, Batteriespeicher, Tarife).

---

## Lademodi und Infrastruktur

### AC-Laden (Wechselstrom)

| Typ | Anschluss | Leistung | Anwendung |
|----|-----------|---------|-----------|
| Mode 2 | Haushaltssteckdose + ICCB | 2,3 kW (1×10A) | Notladen, selten |
| Mode 3 | Typ 2 Stecker (IEC 62196) | 3,7–22 kW | Standard Wallbox, Ladesäule |
| 1-phasig | Typ 2, L1 | 3,7–7,4 kW | Einfache Installation |
| 3-phasig | Typ 2, L1-L3 | 11 kW / 22 kW | Standard Gewerbe, Tiefgarage |

### DC-Laden (Gleichstrom)

| Typ | Stecker | Leistung | Ladezeit 0→80% |
|----|---------|---------|---------------|
| CCS Combo 2 | CCS2 | 50–350 kW | 15–45 min |
| CHAdeMO | CHAdeMO | 50–150 kW | 20–60 min |
| MCS (Megawatt) | MCS | > 1 MW | < 10 min (Trucks) |

---

## OCPP — Open Charge Point Protocol

**OCPP** (IEC 63110-Basis) ist das Standard-Kommunikationsprotokoll zwischen **Ladestation (EVSE)** und **Lademanagementsystem (CSMS/Backend)**:

| Version | Status | Hauptmerkmale |
|---------|--------|--------------|
| OCPP 1.6 | Weit verbreitet | Basis-Funktionen, JSON/SOAP über WebSocket |
| OCPP 2.0.1 | Aktuell | Device Management, Smart Charging erweitert, ISO 15118 |
| OCPP 2.1 | In Einführung | V2G (Vehicle-to-Grid), Roaming |

### Wichtige OCPP-Nachrichten

| Nachricht | Richtung | Funktion |
|-----------|---------|---------|
| `BootNotification` | EVSE → CSMS | Anmeldung beim Backend |
| `Authorize` | EVSE → CSMS | RFID/App-Token prüfen |
| `StartTransaction` | EVSE → CSMS | Ladevorgang beginn |
| `StopTransaction` | EVSE → CSMS | Ladevorgang Ende (inkl. kWh) |
| `MeterValues` | EVSE → CSMS | Messwerte (Leistung, Energie) |
| `SetChargingProfile` | CSMS → EVSE | Ladelimitprofil setzen |
| `ChangeAvailability` | CSMS → EVSE | Ladepunkt sperren/freigeben |

---

## Smart Charging — Laststrom-Regelung

### Statisches Lastmanagement
Feste Leistungsverteilung auf alle Ladepunkte:
```
Gesamtlimit: 22 kW
3 Ladepunkte aktiv → je 7,3 kW (gleichmässig)
```

### Dynamisches Lastmanagement
EMS misst Gesamtlast am Hausanschluss und passt Ladenleistung laufend an:
```
P_Anschluss_max = 100 kW
P_Gebäude_aktuell = 75 kW
P_Verfügbar_für_Laden = 25 kW
→ Ladesäulen auf 25 kW begrenzen (per OCPP SetChargingProfile)
```

### PV-Überschuss-Laden
```
P_PV_Überschuss > 6A × 230V × Phasen:
    → Ladestrom = min(P_Überschuss / U, I_max)
Sonst:
    → Ladestrom auf Minimum (6A) oder Pause
```
Mindestladestrom IEC 61851: **6A pro Phase** — unter diesem Wert muss die Ladesession pausiert werden (nicht gedrosselt).

---

## Phasenbalancierung

Bei mehreren 1-phasigen Ladepunkten besteht das Risiko einer Schieflast im 3-Phasen-Netz:
- Netzversorger-Grenzwert: typisch max. **16A Phasenungleichgewicht** im Niederspannungsnetz
- Lösung: Lademanagement verteilt Ladepunkte auf alle drei Phasen (Round-Robin oder messbasiert)
- Norm: EN 50160 definiert Anforderungen an die Spannungsqualität

---

## ISO 15118 — Plug & Charge

ISO 15118 definiert die Kommunikation zwischen **Fahrzeug und Ladesäule (V2G-Protokoll)**:
- **Plug & Charge**: Fahrzeug authentifiziert sich automatisch ohne RFID (Zertifikat im Fahrzeug)
- **Smart Charging**: Fahrzeug meldet Ladefenster, Energiebedarf, Abfahrtszeit
- **V2G** (Vehicle-to-Grid): Fahrzeug-Batterie als bidirektionale Netzressource (noch selten)

---

## OCPI — Roaming zwischen Netzen

**OCPI** (Open Charge Point Interface) ermöglicht Roaming zwischen verschiedenen Ladenetzen:
- Laden mit einer App / Ladekarte überall
- Abrechnung über Heimnetz-Vertrag
- Verbreitet: Plugsurfing, CHARGEMAP, Mobility+

---

## Lademanagement im Gebäude — Gesamtarchitektur

```
Hausanschluss (z.B. 63A / 43 kW)
     │
   Zähler (Modbus TCP) ─── EMS
     │                      │
     └── Unterverteilung     ├── OCPP-Backend (cloud oder lokal)
           │                 │         │
           ├── Wallbox 1     │    SetChargingProfile
           ├── Wallbox 2 ◄───┘
           └── Wallbox 3
```

**Lokales OCPP-Backend:** z.B. SteVe (Open Source), AMPECO, Chargepoint Cloud, oder Home Assistant OCPP-Integration.

---

## Abrechnungsmodelle

| Modell | Beschreibung | Einsatz |
|-------|-------------|---------|
| Kostenlos | Keine Abrechnung | Mitarbeiterparkplatz |
| Pauschale | Flatrate / Monatsbeitrag | Mitarbeiter |
| kWh-basiert | Pro geladene kWh | Genaueste Methode |
| Zeit-basiert | Pro Minute | Einfach, aber ungenau |
| OCPI-Roaming | Fremdnutzer über Roaming | Öffentliche Säulen |

**Eichrechts-konforme Abrechnung (DE/CH):** Erfordert geeichte Messeinrichtung im Ladepunkt (MID-Zähler) und kalibrierte Software (OCMF-Format).

<!-- EN -->

Electric mobility is one of the largest new loads in a building. A **charge management system** coordinates multiple charging points, prevents grid overload, and integrates charging into the overall energy strategy (PV surplus, battery storage, tariffs).

---

## Charging Modes and Infrastructure

### AC Charging (Alternating Current)

| Type | Connection | Power | Application |
|----|-----------|-------|------------|
| Mode 2 | Domestic socket + ICCB | 2.3 kW (1×10A) | Emergency charging, rare |
| Mode 3 | Type 2 connector (IEC 62196) | 3.7–22 kW | Standard wallbox, charging post |
| 1-phase | Type 2, L1 | 3.7–7.4 kW | Simple installation |
| 3-phase | Type 2, L1–L3 | 11 kW / 22 kW | Standard commercial, car park |

### DC Charging (Direct Current)

| Type | Connector | Power | Charge time 0→80% |
|----|---------|-------|-----------------|
| CCS Combo 2 | CCS2 | 50–350 kW | 15–45 min |
| CHAdeMO | CHAdeMO | 50–150 kW | 20–60 min |
| MCS (Megawatt) | MCS | >1 MW | <10 min (trucks) |

---

## OCPP — Open Charge Point Protocol

**OCPP** (IEC 63110-based) is the standard communication protocol between **charging station (EVSE)** and **charge management system (CSMS/backend)**:

| Version | Status | Key features |
|---------|--------|------------|
| OCPP 1.6 | Widely used | Basic functions, JSON/SOAP over WebSocket |
| OCPP 2.0.1 | Current | Device management, extended smart charging, ISO 15118 |
| OCPP 2.1 | Rolling out | V2G (Vehicle-to-Grid), roaming |

### Key OCPP Messages

| Message | Direction | Function |
|---------|---------|---------|
| `BootNotification` | EVSE → CSMS | Registration with backend |
| `Authorize` | EVSE → CSMS | Verify RFID/app token |
| `StartTransaction` | EVSE → CSMS | Charging session starts |
| `StopTransaction` | EVSE → CSMS | Charging session ends (incl. kWh) |
| `MeterValues` | EVSE → CSMS | Measurements (power, energy) |
| `SetChargingProfile` | CSMS → EVSE | Set charge limit profile |
| `ChangeAvailability` | CSMS → EVSE | Lock/unlock charging point |

---

## Smart Charging — Current Control

### Static Load Management
Fixed power distribution across all charging points:
```
Total limit: 22 kW
3 active charging points → 7.3 kW each (evenly distributed)
```

### Dynamic Load Management
EMS measures total load at the grid connection and continuously adjusts charging power:
```
P_connection_max = 100 kW
P_building_current = 75 kW
P_available_for_charging = 25 kW
→ Limit chargers to 25 kW (via OCPP SetChargingProfile)
```

### PV Surplus Charging
```
P_PV_surplus > 6A × 230V × phases:
    → Charging current = min(P_surplus / V, I_max)
Otherwise:
    → Charging current to minimum (6A) or pause
```
Minimum charging current IEC 61851: **6A per phase** — below this, the charging session must be suspended (not throttled).

---

## Phase Balancing

With multiple single-phase charging points there is a risk of phase imbalance in the 3-phase grid:
- Network operator limit: typically max. **16A phase imbalance** in the low-voltage grid
- Solution: charge management distributes charging points across all three phases (round-robin or measurement-based)
- Standard: EN 50160 defines power quality requirements

---

## ISO 15118 — Plug & Charge

ISO 15118 defines the communication between **vehicle and charging station (V2G protocol)**:
- **Plug & Charge**: vehicle authenticates automatically without RFID (certificate in vehicle)
- **Smart Charging**: vehicle reports charging window, energy demand, departure time
- **V2G** (Vehicle-to-Grid): vehicle battery as bidirectional grid resource (still rare)

---

## OCPI — Roaming Between Networks

**OCPI** (Open Charge Point Interface) enables roaming between different charging networks:
- Charge with one app / charge card everywhere
- Billing via home network contract
- Common: Plugsurfing, CHARGEMAP, Mobility+

---

## Charge Management in the Building — Overall Architecture

```
Grid connection (e.g. 63A / 43 kW)
     │
   Meter (Modbus TCP) ─── EMS
     │                      │
     └── Sub-distribution    ├── OCPP backend (cloud or local)
           │                 │         │
           ├── Wallbox 1     │    SetChargingProfile
           ├── Wallbox 2 ◄───┘
           └── Wallbox 3
```

**Local OCPP backend:** e.g. SteVe (open source), AMPECO, Chargepoint Cloud, or Home Assistant OCPP integration.

---

## Billing Models

| Model | Description | Application |
|-------|------------|------------|
| Free | No billing | Employee car park |
| Flat rate | Monthly fee | Employees |
| kWh-based | Per kWh charged | Most accurate method |
| Time-based | Per minute | Simple, but imprecise |
| OCPI roaming | Third-party users via roaming | Public charging stations |

**Calibration law compliant billing (DE/CH):** Requires calibrated metering device in the charging point (MID meter) and certified software (OCMF format).
