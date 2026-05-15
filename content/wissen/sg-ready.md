---
title: SG-Ready — Smart-Grid-Schnittstelle für steuerbare Verbraucher
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
