---
title: E-Mobility und Lademanagement in der GA
title_en: E-Mobility and Charge Management in BA
slug: e-mobility-lademanagement
category: energie
subcategory: e-mobility
tags:
  [
    elektromobilität,
    ladeinfrastruktur,
    ocpp,
    evse,
    ac-laden,
    dc-laden,
    wallbox,
    lademanagement,
    lastmanagement,
    phasenbalancierung,
    ocpi,
    iso15118,
    plug-and-charge,
    smart-charging,
    dynamic-load-management,
    bid-direktiv,
    ladesäule
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, pv-integration, batteriespeicher, sg-ready, energiemessung]
rechner: []
norm: [IEC 61851, ISO 15118, OCPP 1.6/2.0.1, OCPI 2.2, IEC 62196, DIN EN 17186]
updated: 2026-10-14
lang: de
---

# E-Mobility und Lademanagement in der GA

Elektromobilität ist eine der grössten neuen Lasten im Gebäude. Ein **Lademanagement-System** koordiniert mehrere Ladepunkte, verhindert Netzüberlastung und integriert das Laden in die gesamte Energiestrategie (PV-Überschuss, Batteriespeicher, Tarife).

---

## Lademodi und Infrastruktur

### AC-Laden (Wechselstrom)

| Typ      | Anschluss                 | Leistung       | Anwendung                    |
| -------- | ------------------------- | -------------- | ---------------------------- |
| Mode 2   | Haushaltssteckdose + ICCB | 2,3 kW (1×10A) | Notladen, selten             |
| Mode 3   | Typ 2 Stecker (IEC 62196) | 3,7–22 kW      | Standard Wallbox, Ladesäule  |
| 1-phasig | Typ 2, L1                 | 3,7–7,4 kW     | Einfache Installation        |
| 3-phasig | Typ 2, L1-L3              | 11 kW / 22 kW  | Standard Gewerbe, Tiefgarage |

### DC-Laden (Gleichstrom)

| Typ            | Stecker | Leistung  | Ladezeit 0→80%    |
| -------------- | ------- | --------- | ----------------- |
| CCS Combo 2    | CCS2    | 50–350 kW | 15–45 min         |
| CHAdeMO        | CHAdeMO | 50–150 kW | 20–60 min         |
| MCS (Megawatt) | MCS     | > 1 MW    | < 10 min (Trucks) |

---

## OCPP — Open Charge Point Protocol

**OCPP** ist das Standard-Kommunikationsprotokoll zwischen **Ladestation (EVSE)** und **Lademanagementsystem (CSMS/Backend)**. OCPP 2.0.1 ist seit 2024 auch als IEC 63584 genormt. In OCPP 2.0.1 ersetzt `TransactionEvent` die Nachrichten `StartTransaction` und `StopTransaction` aus 1.6.

| Version    | Status          | Hauptmerkmale                                           |
| ---------- | --------------- | ------------------------------------------------------- |
| OCPP 1.6   | Weit verbreitet | Basis-Funktionen, JSON/SOAP über WebSocket              |
| OCPP 2.0.1 | Aktuell         | Device Management, Smart Charging erweitert, ISO 15118  |
| OCPP 2.1   | seit 2025       | bidirektionales Laden (V2G), erweitertes Smart Charging |

### Wichtige OCPP-Nachrichten

| Nachricht            | Richtung    | Funktion                      |
| -------------------- | ----------- | ----------------------------- |
| `BootNotification`   | EVSE → CSMS | Anmeldung beim Backend        |
| `Authorize`          | EVSE → CSMS | RFID/App-Token prüfen         |
| `StartTransaction`   | EVSE → CSMS | Ladevorgang beginn            |
| `StopTransaction`    | EVSE → CSMS | Ladevorgang Ende (inkl. kWh)  |
| `MeterValues`        | EVSE → CSMS | Messwerte (Leistung, Energie) |
| `SetChargingProfile` | CSMS → EVSE | Ladelimitprofil setzen        |
| `ChangeAvailability` | CSMS → EVSE | Ladepunkt sperren/freigeben   |

---

## Smart Charging — Laststrom-Regelung

### Statisches Lastmanagement

Feste Leistungsverteilung auf alle Ladepunkte:

Beispiel: Gesamtlimit 22 kW, drei Ladepunkte aktiv, also je rund 7.3 kW.

### Dynamisches Lastmanagement

EMS misst Gesamtlast am Hausanschluss und passt Ladenleistung laufend an:

Beispiel: Anschluss 100 kW, Gebäude braucht gerade 75 kW. Für das Laden bleiben 25 kW. Das Lademanagement setzt per OCPP `SetChargingProfile` die Grenzen der Ladepunkte so, dass zusammen nicht mehr als 25 kW bezogen werden, und passt sie laufend an.

### PV-Überschuss-Laden

<p class="formel">I<sub>Laden</sub> = min(P<sub>Überschuss</sub> / (U · n<sub>Phasen</sub>), I<sub>max</sub>)</p>

Liegt das Ergebnis unter 6 A, reicht der Überschuss nicht. Dann lädt das Auto mit 6 A aus dem Netz weiter oder pausiert, je nach Einstellung. U ist die Strangspannung, 230 V.

Mindestladestrom IEC 61851: **6A pro Phase** — unter diesem Wert muss die Ladesession pausiert werden (nicht gedrosselt).

---

## Phasenbalancierung

Bei mehreren 1-phasigen Ladepunkten besteht das Risiko einer Schieflast im 3-Phasen-Netz:

- **Schieflastgrenze** nach den Vorgaben des Netzbetreibers: in der Schweiz nach den Werkvorschriften meist rund 3.6 kVA, in Deutschland nach VDE-AR-N 4100 4.6 kVA
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

| Ebene               | Komponente                                   |
| ------------------- | -------------------------------------------- |
| Hausanschluss       | zum Beispiel 63 A, rund 43 kW                |
| Zähler am Anschluss | liefert die Gebäudelast, etwa per Modbus TCP |
| EMS                 | rechnet die verfügbare Leistung aus          |
| OCPP-Backend        | lokal oder in der Cloud, setzt Ladeprofile   |
| Wallboxen           | in der Unterverteilung, laden nach Vorgabe   |

**Lokales OCPP-Backend:** z.B. SteVe (Open Source), AMPECO, Chargepoint Cloud, oder Home Assistant OCPP-Integration.

---

## Abrechnungsmodelle

| Modell       | Beschreibung             | Einsatz               |
| ------------ | ------------------------ | --------------------- |
| Kostenlos    | Keine Abrechnung         | Mitarbeiterparkplatz  |
| Pauschale    | Flatrate / Monatsbeitrag | Mitarbeiter           |
| kWh-basiert  | Pro geladene kWh         | Genaueste Methode     |
| Zeit-basiert | Pro Minute               | Einfach, aber ungenau |
| OCPI-Roaming | Fremdnutzer über Roaming | Öffentliche Säulen    |

**Abrechnung nach kWh:** In Deutschland verlangt das Eichrecht einen konformen Zähler im Ladepunkt und signierte Messwerte, etwa im OCMF-Format. In der Schweiz gelten die Vorgaben der Messmittelverordnung; für die Weiterverrechnung einen konformitätsbewerteten Zähler verwenden.

<!-- EN -->

Electric mobility is one of the largest new loads in a building. A **charge management system** coordinates multiple charging points, prevents grid overload, and integrates charging into the overall energy strategy (PV surplus, battery storage, tariffs).

---

## Charging Modes and Infrastructure

### AC Charging (Alternating Current)

| Type    | Connection                   | Power          | Application                     |
| ------- | ---------------------------- | -------------- | ------------------------------- |
| Mode 2  | Domestic socket + ICCB       | 2.3 kW (1×10A) | Emergency charging, rare        |
| Mode 3  | Type 2 connector (IEC 62196) | 3.7–22 kW      | Standard wallbox, charging post |
| 1-phase | Type 2, L1                   | 3.7–7.4 kW     | Simple installation             |
| 3-phase | Type 2, L1–L3                | 11 kW / 22 kW  | Standard commercial, car park   |

### DC Charging (Direct Current)

| Type           | Connector | Power     | Charge time 0→80% |
| -------------- | --------- | --------- | ----------------- |
| CCS Combo 2    | CCS2      | 50–350 kW | 15–45 min         |
| CHAdeMO        | CHAdeMO   | 50–150 kW | 20–60 min         |
| MCS (Megawatt) | MCS       | >1 MW     | <10 min (trucks)  |

---

## OCPP — Open Charge Point Protocol

**OCPP** is the standard communication protocol between **charging station (EVSE)** and **charge management system (CSMS/backend)**. OCPP 2.0.1 has also been standardised as IEC 63584 since 2024. In OCPP 2.0.1 `TransactionEvent` replaces the 1.6 messages `StartTransaction` and `StopTransaction`.

| Version    | Status      | Key features                                          |
| ---------- | ----------- | ----------------------------------------------------- |
| OCPP 1.6   | Widely used | Basic functions, JSON/SOAP over WebSocket             |
| OCPP 2.0.1 | Current     | Device management, extended smart charging, ISO 15118 |
| OCPP 2.1   | since 2025  | bidirectional charging (V2G), extended smart charging |

### Key OCPP Messages

| Message              | Direction   | Function                          |
| -------------------- | ----------- | --------------------------------- |
| `BootNotification`   | EVSE → CSMS | Registration with backend         |
| `Authorize`          | EVSE → CSMS | Verify RFID/app token             |
| `StartTransaction`   | EVSE → CSMS | Charging session starts           |
| `StopTransaction`    | EVSE → CSMS | Charging session ends (incl. kWh) |
| `MeterValues`        | EVSE → CSMS | Measurements (power, energy)      |
| `SetChargingProfile` | CSMS → EVSE | Set charge limit profile          |
| `ChangeAvailability` | CSMS → EVSE | Lock/unlock charging point        |

---

## Smart Charging — Current Control

### Static Load Management

Fixed power distribution across all charging points:

Example: total limit 22 kW, three charging points active, so about 7.3 kW each.

### Dynamic Load Management

EMS measures total load at the grid connection and continuously adjusts charging power:

Example: connection 100 kW, the building currently needs 75 kW. 25 kW remain for charging. The charge management uses OCPP `SetChargingProfile` to set the charging point limits so that together they draw no more than 25 kW, and adjusts them continuously.

### PV Surplus Charging

<p class="formel">I<sub>charge</sub> = min(P<sub>surplus</sub> / (U · n<sub>phases</sub>), I<sub>max</sub>)</p>

If the result is below 6 A, the surplus is not enough. Then the car continues at 6 A from the grid or pauses, depending on the setting. U is the phase voltage, 230 V.

Minimum charging current IEC 61851: **6A per phase** — below this, the charging session must be suspended (not throttled).

---

## Phase Balancing

With multiple single-phase charging points there is a risk of phase imbalance in the 3-phase grid:

- **Imbalance limit** set by the grid operator: in Switzerland per the utility technical requirements usually about 3.6 kVA, in Germany per VDE-AR-N 4100 4.6 kVA
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

| Level            | Component                                       |
| ---------------- | ----------------------------------------------- |
| Grid connection  | for example 63 A, about 43 kW                   |
| Connection meter | delivers the building load, e.g. via Modbus TCP |
| EMS              | calculates the available power                  |
| OCPP backend     | local or cloud, sets charging profiles          |
| Wallboxes        | in the sub-distribution, charge as instructed   |

**Local OCPP backend:** e.g. SteVe (open source), AMPECO, Chargepoint Cloud, or Home Assistant OCPP integration.

---

## Billing Models

| Model        | Description                   | Application              |
| ------------ | ----------------------------- | ------------------------ |
| Free         | No billing                    | Employee car park        |
| Flat rate    | Monthly fee                   | Employees                |
| kWh-based    | Per kWh charged               | Most accurate method     |
| Time-based   | Per minute                    | Simple, but imprecise    |
| OCPI roaming | Third-party users via roaming | Public charging stations |

**Billing per kWh:** in Germany calibration law requires a compliant meter in the charging point and signed readings, for example in OCMF format. In Switzerland the Measuring Instruments Ordinance applies; use a conformity-assessed meter for re-billing.
