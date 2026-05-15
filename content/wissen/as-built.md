---
title: As-Built Dokumentation — Was gehört rein, Formate
slug: as-built
category: dokumentation
subcategory: ibn
tags: [as-built, bestandsdokumentation, revisionsplan, übergabedokumentation, schlussabnahme, dpl-asbuilt, schemen, backup, passwörter, wartungsanleitung, betriebshandbuch, ga-dokumentation]
difficulty: fortgeschritten
area: [ga]
related: [datenpunktliste, tab-protokoll, funktionsbeschreibung, glt-grundlagen, ddc-programmierung]
norm: [VDI 3814, SIA 386.110, SIA 118, ÖNORM B 2061]
updated: 2026-05-15
lang: de
---

# As-Built Dokumentation — Was gehört rein, Formate

Die As-Built Dokumentation ist die vollständige Bestandsdokumentation nach Abschluss der Inbetriebnahme. Sie belegt was wirklich gebaut wurde — nicht was geplant war.

## Grundsatz: Plan vs. As-Built

```
Planungsphase:
  → Planerstellung, Ausschreibung, Ausführung
  → Dokumente spiegeln Planung

Während IBN:
  → Abweichungen entstehen (andere Komponenten, Adressänderungen)
  → Dokumente werden angepasst

As-Built:
  → Dokumentation zeigt was WIRKLICH installiert ist
  → Grundlage für Betrieb und Wartung
```

---

## Inhalte der GA-As-Built Dokumentation

### 1. Datenpunktliste As-Built (DPL)

Die wichtigste Unterlage:

```
Enthalten:
  - Alle realisierten Datenpunkte (keine geplanten, nicht realisierten)
  - Tatsächliche Adressen (BACnet Object-ID, Modbus-Register etc.)
  - Tatsächliche Klemmen und Kabelbezeichnungen
  - Endgültige Skalierungen und Wertebereiche
  - IBN-Status: geprüft ✓
  
Format: Excel oder CSV (maschinenlesbar)
Pflichtfelder: DPL-ID, Bezeichnung, Typ, Adresse, Einheit, Min, Max, Status
```

### 2. Schemen (R&I-Schemata)

```
Revisionsschemen:
  - Hydraulik-Schema (Heizung, Kühlung, Sanitär)
  - Lüftungsschema (RLT mit allen Komponenten)
  - Elektroschema (Schaltschrank-Aufbau)
  - MSR-Schema (alle Sensoren und Aktoren eingezeichnet)
  
Format: PDF (finalisiert) + CAD-Quelldatei (DWG / DXF)
Revisions-Index: aktueller Stand mit Datum
```

### 3. DDC-Programm-Backup

```
Enthalten:
  - Vollständiges Programm-Backup je DDC/Controller
  - Software-Version des Controllers (Hardware + Firmware)
  - Kompiliertes Programm (Binär) + Quellcode
  - Parameterlisten (Regler-Einstellwerte, Zeitprogramme)
  
Format: Hersteller-spezifisch (Siemens PXCT, Sauter SAUTERnet, etc.)
Speicherung: Datenträger abgegeben + Cloud-Backup
```

### 4. GLT-Konfiguration Backup

```
  - Export der gesamten GLT-Konfiguration
  - Benutzerverwaltung (ohne Klartext-Passwörter!)
  - Alarmkonfiguration
  - Trendkonfiguration
  - Visualisierungs-Bilder
  - Schnittstellen-Konfiguration (BACnet, Modbus, OPC)
```

### 5. Passwort-Dokument

```
Enthält (verschlüsselt / separates Dokument):
  - DDC-Passwörter (Service, Admin)
  - GLT-Login (Admin, Service, Betrieb)
  - Netzwerk-Passwörter (Switches, Router)
  - Fernzugriff-Zugangsdaten (VPN)

SICHERHEIT: Nie im Klartext per Email versenden!
Empfehlung: Passwort-Manager Export, übergabe persönlich
```

### 6. Bedienungsanleitungen

```
Je Komponente:
  - Bedienungsanleitung Regelgerät / DDC
  - Bedienungsanleitung GLT-Software
  - Technische Datenblätter aller Sensoren, Aktoren
  - Wartungsanleitungen (Hersteller-Service-Manual)
  
Format: PDF, in Ablage nach Gewerken geordnet
```

### 7. Netzwerkdokumentation

```
  - IP-Adressplan (alle Geräte, VLANs)
  - Switch-Konfiguration (Backup)
  - Netzwerkplan (Topologie)
  - WLAN-Zugangsdaten (falls vorhanden)
```

---

## Übergabe-Struktur (Ordnerstruktur)

```
GA_Dokumentation_Projekt-XY/
├── 01_Planung/
│   ├── Funktionsbeschreibung_v1.2.pdf
│   ├── DPL_Planung.xlsx
│   └── Schemen_Planung/
├── 02_AsBuilt/
│   ├── DPL_AsBuilt_2026-05-14.xlsx     ← wichtigste Datei
│   ├── Schemen_AsBuilt/
│   │   ├── HZG_AsBuilt_Rev3.pdf
│   │   ├── LFT_AsBuilt_Rev2.pdf
│   │   └── MSR_Schema_Rev3.pdf
│   ├── DDC_Backup/
│   │   ├── DDC-01_v2.4_20260514.bkp
│   │   └── DDC-02_v2.4_20260514.bkp
│   └── GLT_Backup/
│       └── DesigoDB_20260514.bak
├── 03_Protokolle/
│   ├── TAB-Protokoll_2026-05-14.pdf
│   └── Maengelliste.xlsx
├── 04_Anleitungen/
│   ├── GLT-Bedieneranleitung.pdf
│   └── Wartungsplan.pdf
└── 05_Passwörter/         ← separat gesichert, verschlüsselt
    └── Zugangsdaten.kdbx  (KeePass-Datei)
```

---

## Übergabe-Checkliste As-Built

- [ ] DPL As-Built vollständig, alle Punkte geprüft
- [ ] Alle Schemen auf aktuellem Revisionsstand
- [ ] DDC-Backups von allen Controllern erstellt und übergeben
- [ ] GLT-Konfiguration gesichert und übergeben
- [ ] Passwort-Dokument übergeben (persönlich oder verschlüsselt)
- [ ] Bedienungsanleitung GLT vorhanden
- [ ] Wartungsplan erstellt
- [ ] Einweisung Betreiber durchgeführt und protokolliert
- [ ] Gewährleistungsbeginn dokumentiert

---

## Normen

- **VDI 3814** — Gebäudeautomation, Anforderungen Dokumentation
- **SIA 386.110** — GA Schweiz, Abnahme und Dokumentation
- **SIA 118** — Allgemeine Bedingungen für Bauarbeiten (Dokumentationspflichten)
