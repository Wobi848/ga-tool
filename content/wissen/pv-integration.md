---
title: PV-Integration in die Gebäudeautomation
title_en: PV Integration into Building Automation
slug: pv-integration
category: energie
subcategory: erneuerbare
tags: [photovoltaik, pv, wechselrichter, eigenverbrauch, überschusssteuerung, sunspec, sma, fronius, kostal, deye, einspeisebegrenzung, nulleinspeisung, ertragsprognose, pv-ems, mppt, wechselrichter-schnittstelle]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, batteriespeicher, sg-ready, e-mobility-lademanagement, energiemessung]
rechner: []
norm: [VDE-AR-N 4105, VDE-AR-N 4110, IEC 61727, SunSpec Alliance, EN 50549]
updated: 2026-05-15
lang: de
---

# PV-Integration in die Gebäudeautomation

Die Integration einer Photovoltaikanlage in das Gebäude-EMS erlaubt es, den solaren Eigenverbrauch zu maximieren, Spitzenlasten zu kappen und steuerbare Verbraucher (Batteriespeicher, Wärmepumpe, Ladeinfrastruktur) gezielt auf den PV-Ertrag abzustimmen.

---

## PV-Ertragskurve und Eigenverbrauch

Eine PV-Anlage erzeugt tagsüber ein gauss-förmiges Ertragsprofil mit dem Maximum um die Mittagszeit. Ohne aktives Management wird überschüssige Energie ins Netz eingespeist, während in den Morgen- und Abendstunden Netzbezug stattfindet.

**Eigenverbrauchsquote erhöhen durch:**
- Verschiebung flexibler Lasten in Ertragsspitzen (Spülmaschinen, Wärmepumpen, E-Auto)
- Pufferung überschüssiger Energie in Batteriespeichern
- Warmwassererwärmung via Heizstab (einfach, kein Regelungsaufwand)

---

## Wechselrichter-Schnittstellen

| Hersteller | Protokoll | Schnittstelle |
|-----------|-----------|---------------|
| SMA | SunSpec Modbus TCP / SMA Modbus | Ethernet |
| Fronius | SunSpec Modbus TCP / Solar API | Ethernet |
| KOSTAL | SunSpec Modbus TCP | Ethernet |
| Huawei | Modbus TCP (proprietär) | Ethernet |
| Deye / Solis | Modbus RTU/TCP | RS-485 / Ethernet |
| Growatt | Modbus RTU | RS-485 |

### SunSpec Alliance

**SunSpec** ist ein offener Standard (www.sunspec.org) für die Schnittstelle zwischen Wechselrichtern und EMS/Monitoring. Definiert standardisierte Modbus-Register für:
- Momentanleistung (AC/DC), Energie (kWh), Frequenz, Spannung
- Betriebszustand, Fehlercode
- Leistungsregelung (Wirkleistungsbegrenzung, Blindleistung)

```
EMS (Modbus TCP Client)
     │
     ├── WR 1: SunSpec Modbus TCP → P_AC = 3.4 kW
     ├── WR 2: SunSpec Modbus TCP → P_AC = 2.1 kW
     └── Batterie: SunSpec Modbus TCP → SOC = 72%
```

---

## Einspeisebegrenzung (70%-Regel, Nulleinspeisung)

### 70%-Begrenzung (DE, VDE-AR-N 4105)
Netzanlagen bis 25 kWp dürfen maximal 70% der Nennleistung ins Netz einspeisen. Das EMS oder der Wechselrichter begrenzt die Ausgangsleistung entsprechend:

```
P_Einspeisung = P_PV − P_Verbrauch
Wenn P_Einspeisung > 0.7 × P_Peak → Wechselrichter drosseln
```

### Nulleinspeisung
Für Mieterstrom, Eigenverbrauchsanlagen ohne Einspeisevergütung: EMS regelt Wechselrichterleistung so, dass `P_Einspeisung ≈ 0`. Benötigt Echtzeit-Messung am Netzanschlusspunkt (4-20 mA oder Modbus-Zähler).

---

## Überschusssteuerung

Das EMS vergleicht kontinuierlich PV-Ertrag mit Verbrauch und steuert steuerbare Lasten:

```
PV-Überschuss (kW)
       │
  ┌────▼────────────────────────────────────────┐
  │ EMS Überschuss-Logik                        │
  │                                             │
  │ 1. Batteriespeicher laden (Priorität hoch)  │
  │ 2. E-Auto laden (dynamisch, min. 6A)        │
  │ 3. Wärmepumpe WW-Ladung aktivieren          │
  │ 4. Heizstab zuschalten                      │
  └─────────────────────────────────────────────┘
```

**Wichtig bei E-Auto-Laden:** Minimale Ladeleistung beachten (1-phasig min. ~1,4 kW, 3-phasig min. ~4,1 kW). Unter diesem Schwellwert kein PV-Laden sinnvoll → Hysterese notwendig.

---

## PV-Ertragsprognose

Für prädiktives Lastmanagement (Batterieverladeplanung, Warmwasserbooster):
- **Wetterprognose-APIs**: Open-Meteo (frei), Solcast (kommerziell, sehr präzise)
- **Strahlungsdaten**: Global Horizontal Irradiance (GHI), Direct Normal Irradiance (DNI)
- Prognose ermöglicht: Batterie morgens nicht voll laden (Platz für PV-Überschuss), Spülmaschine auf Mittagszeit verschieben

---

## GA-Integration Beispiel

```
PV-Anlage 10 kWp
     │
WR (SunSpec Modbus TCP) ──── EMS / Home Assistant
     │                            │
Netz ─── HAK ─────────────── Zähler (Modbus TCP)
                                  │
                        ┌─────────┼──────────────┐
                        │         │              │
                   Batterie   E-Ladestation   Wärmepumpe
                 (SunSpec)   (OCPP)        (SG-Ready / Modbus)
```

---

## Typische Kennwerte PV-Anlage

| Parameter | Wert | Bemerkung |
|-----------|------|-----------|
| Jahresertrag | 900–1100 kWh/kWp | CH/Mitteleuropa, Südausrichtung |
| Peak-Leistung Sommerhalbjahr | 80–95% der Nennleistung | Klarwettertag |
| Eigenverbrauchsquote ohne Speicher | 25–35% | typisches EFH |
| Eigenverbrauchsquote mit Speicher | 55–80% | je nach Speichergrösse |
| Wirkungsgrad Wechselrichter | 96–98% | String-WR |

<!-- EN -->

Integrating a photovoltaic system into the building EMS makes it possible to maximise solar self-consumption, cap peak loads, and align controllable loads (battery storage, heat pumps, charging infrastructure) precisely with PV yield.

---

## PV Yield Curve and Self-Consumption

A PV system generates a bell-shaped yield profile during the day, peaking around midday. Without active management, surplus energy is exported to the grid while the morning and evening hours rely on grid import.

**Ways to increase self-consumption:**
- Shift flexible loads into yield peaks (dishwashers, heat pumps, EVs)
- Buffer surplus energy in battery storage
- Domestic hot water heating via immersion heater (simple, minimal control effort)

---

## Inverter Interfaces

| Manufacturer | Protocol | Interface |
|-------------|---------|-----------|
| SMA | SunSpec Modbus TCP / SMA Modbus | Ethernet |
| Fronius | SunSpec Modbus TCP / Solar API | Ethernet |
| KOSTAL | SunSpec Modbus TCP | Ethernet |
| Huawei | Modbus TCP (proprietary) | Ethernet |
| Deye / Solis | Modbus RTU/TCP | RS-485 / Ethernet |
| Growatt | Modbus RTU | RS-485 |

### SunSpec Alliance

**SunSpec** is an open standard for the interface between inverters and EMS/monitoring. It defines standardised Modbus registers for:
- Instantaneous power (AC/DC), energy (kWh), frequency, voltage
- Operating state, error code
- Power control (active power curtailment, reactive power)

```
EMS (Modbus TCP client)
     │
     ├── Inverter 1: SunSpec Modbus TCP → P_AC = 3.4 kW
     ├── Inverter 2: SunSpec Modbus TCP → P_AC = 2.1 kW
     └── Battery: SunSpec Modbus TCP → SOC = 72%
```

---

## Export Limitation (70% Rule, Zero Export)

### 70% Curtailment (DE, VDE-AR-N 4105)
Grid-connected systems up to 25 kWp may export a maximum of 70% of rated capacity to the grid. The EMS or inverter limits output accordingly:

```
P_export = P_PV − P_load
If P_export > 0.7 × P_peak → curtail inverter output
```

### Zero Export
For tenant electricity, self-consumption installations without feed-in tariff: the EMS controls inverter output so that `P_export ≈ 0`. Requires real-time measurement at the grid connection point (4–20 mA or Modbus meter).

---

## Surplus Control

The EMS continuously compares PV yield with consumption and controls flexible loads:

```
PV surplus (kW)
       │
  ┌────▼────────────────────────────────────────┐
  │ EMS surplus logic                           │
  │                                             │
  │ 1. Charge battery storage (priority high)   │
  │ 2. Charge EV (dynamic, min. 6 A)           │
  │ 3. Activate heat pump DHW charging          │
  │ 4. Switch on immersion heater               │
  └─────────────────────────────────────────────┘
```

**Important for EV charging:** Observe minimum charge power (single-phase min. ~1.4 kW, three-phase min. ~4.1 kW). Below this threshold PV charging is not viable → hysteresis required.

---

## PV Yield Forecast

For predictive load management (battery charge planning, DHW boosting):
- **Weather forecast APIs**: Open-Meteo (free), Solcast (commercial, highly accurate)
- **Irradiance data**: Global Horizontal Irradiance (GHI), Direct Normal Irradiance (DNI)
- Forecast enables: not fully charging the battery in the morning (leaving room for PV surplus), shifting dishwasher to midday

---

## BA Integration Example

```
PV system 10 kWp
     │
Inverter (SunSpec Modbus TCP) ──── EMS / Home Assistant
     │                                   │
Grid ─── Meter ─────────────── Grid meter (Modbus TCP)
                                         │
                              ┌──────────┼────────────┐
                              │          │             │
                          Battery   EV charger   Heat pump
                        (SunSpec)  (OCPP)    (SG-Ready / Modbus)
```

---

## Typical PV System Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Annual yield | 900–1,100 kWh/kWp | CH/Central Europe, south-facing |
| Peak output summer half-year | 80–95% of rated power | Clear day |
| Self-consumption rate without storage | 25–35% | Typical single-family home |
| Self-consumption rate with storage | 55–80% | Depending on storage size |
| Inverter efficiency | 96–98% | String inverter |
