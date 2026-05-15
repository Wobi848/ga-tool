---
title: PV-Integration in die Gebäudeautomation
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
