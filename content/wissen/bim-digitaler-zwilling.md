---
title: BIM und Digitaler Zwilling in der Gebäudeautomation
slug: bim-digitaler-zwilling
category: systeme
subcategory: planung
tags: [bim, ifc, digitaler-zwilling, buildingsmart, gbxml, revit, archicad, openBIM, cobiebim, digital-twin, as-built, datenpunktliste, facility-management]
difficulty: grundlagen
area: [ga]
related: [datenpunktliste, as-built, glt-grundlagen, opc-ua, vdi3814, funktionsbeschreibung]
norm: [ISO 19650, EN ISO 16739 (IFC), VDI 3805]
updated: 2026-05-15
lang: de
---

# BIM und Digitaler Zwilling in der Gebäudeautomation

**Building Information Modelling (BIM)** ist eine Methode, bei der alle Gebäudeinformationen in einem integrierten digitalen Modell erfasst und verwaltet werden — von der Planung über den Bau bis zum Betrieb. Für die Gebäudeautomation öffnet BIM den Weg zur automatisierten Datenpunktliste und zum **digitalen Zwilling**.

## Was ist BIM?

BIM ist mehr als 3D-CAD. Es enthält:
- **Geometrie**: Räume, Wände, Leitungsführungen, Gerätestandorte
- **Attribute**: Material, Leistung, Hersteller, Seriennummer
- **Beziehungen**: Raum → Zone → Anlage → Gebäude
- **Zeitachse**: Planungs-, Bau-, Betriebsphase (Level of Development LOD)
- **Verknüpfte Dokumente**: Datenblätter, Wartungsanleitungen, Zertifikate

## BIM-Level und Reife

| Level | Bezeichnung | Inhalt |
|---|---|---|
| LOD 100 | Konzept | Massen, Kubaturen |
| LOD 200 | Vorentwurf | Ungefähre Geometrie, Systemkonzept |
| LOD 300 | Ausführungsplanung | Genaue Geometrie, Materialien |
| LOD 350 | Koordination | Montage-relevante Details, Kollisionsprüfung |
| LOD 400 | Fertigung | Herstellerdaten, Einbaudetails |
| LOD 500 | As-Built | Ist-Zustand nach Ausführung, für FM |

Für GA-Betrieb relevant: **LOD 400–500** — Gerätedaten, Datenpunkte, Kalibrierwerte.

## IFC — Offenes Austauschformat

**IFC** (Industry Foundation Classes, ISO 16739) ist das herstellerneutrale Austauschformat. Alle GA-relevanten Systeme haben IFC-Entitäten:

| IFC-Klasse | GA-Relevanz |
|---|---|
| IfcSpace | Raum → Zone → GA-Datenpunkt |
| IfcSensor | Temperaturfühler, CO₂-Sensor |
| IfcActuator | Ventil, Klappe, Antrieb |
| IfcController | DDC-Regler |
| IfcDistributionControlElement | Allgemeines GA-Element |
| IfcSystem | HLK-Anlage (Heizkreis, RLT) |
| IfcZone | Regelzone, Brandabschnitt |

**gbXML** (Green Building XML) ist ein weiteres Format, spezialisiert auf thermische Simulation und Energieberechnung.

## BIM in der GA-Praxis

### Datenpunktliste aus BIM generieren
Statt manueller Excel-Datenpunktliste kann diese aus dem BIM-Modell exportiert werden:

```
BIM-Modell (IFC)
    └── IfcSensor [Room_42, Type=Temperature]
        ├── pset_SensorCommon.Category = Temperature
        ├── pset_GA.BACnetObjectID = AI:12
        ├── pset_GA.Einheit = °C
        └── pset_GA.Zone = Zone_HLK_42
```

→ Automatische Befüllung der Datenpunktliste, Reduzierung von Eingabefehlern.

### Kollisionsprüfung
BIM erkennt Kollisionen zwischen Lüftungskanälen und Rohrleitungen bereits in der Planung — vor dem Bau. Spart teure Nachbesserungen auf der Baustelle.

### As-Built Dokumentation
Nach Abnahme wird das BIM-Modell auf den effektiven Einbauzustand aktualisiert → **As-Built-BIM** als lebendige Dokumentation. Basis für FM-Systeme (CAFM).

## Digitaler Zwilling

Ein **Digitaler Zwilling** geht über BIM hinaus: Er ist das BIM-Modell **plus Echtzeit-Sensordaten**. Das statische Modell wird mit Live-Daten aus der GA "zum Leben erweckt":

```
┌─────────────────────────────────────────────────────────┐
│                   Digitaler Zwilling                     │
│                                                         │
│  BIM-Modell          +    GA-Daten (live)               │
│  ───────────              ────────────────              │
│  Geometrie                Temperaturen (1-min)          │
│  Systeme                  Ventilstellungen              │
│  Attribute                Energiezähler                 │
│  Räume/Zonen              Alarme/Events                 │
└─────────────────────────────────────────────────────────┘
           ↓ Analyse und Simulation
    Energieoptimierung, Fehlerdiagnose, Prognose
```

### Anwendungen Digitaler Zwilling

| Anwendung | Vorteil |
|---|---|
| Fault Detection & Diagnostics (FDD) | Anomalien erkennen, bevor sie zu Ausfällen werden |
| Energiesimulation | Massnahmen testen ohne Eingriff im Gebäude |
| Condition Monitoring | Verschleiss von Pumpen/Ventilatoren vorhersagen |
| Commissioning-Unterstützung | Sollverhalten aus Simulation mit Ist vergleichen |
| Notfallplanung | Brandausbreitung simulieren, Evakuierungswege optimieren |

## Wichtige Standards und Normen

| Standard | Inhalt |
|---|---|
| ISO 19650 | BIM-Prozessmanagement, Information Requirements |
| EN ISO 16739 | IFC-Schema |
| VDI 3805 | Produktdaten für HVAC-Geräte (Datenaustausch) |
| SWKI BIM 001 | BIM-Anforderungen für TGA (Schweiz) |
| COBie | Construction Operations Building Information Exchange — Übergabe Betrieb |

## Herausforderungen in der Praxis

- **Datenpflege**: BIM-Modell muss aktuell gehalten werden — oft vernachlässigt
- **Tool-Fragmentierung**: Revit, ArchiCAD, Allplan, Tekla — Interoperabilität nicht immer gegeben
- **GA-BIM-Lücke**: Elektro/GA-Planung hinkt Architektur/Statik hinterher
- **LOD 500**: As-Built wird selten vollständig umgesetzt — Kosten, Zeit
- **Eigentumsrechte**: Wem gehören die Modelldaten? BIM-Protokoll nötig

## Einstieg für GA-Inbetriebnehmer

Auch ohne vollständiges BIM profitiert man von BIM-Grundsätzen:
1. **Geräte mit eindeutiger ID** in Datenpunktliste verknüpfen
2. **Raum-/Zonenreferenz** bei jedem Datenpunkt pflegen
3. **As-Built-Notizen** digital erfassen (statt handschriftlich)
4. **Revit/IFC-Viewer** (kostenlos: BIM Collab Zoom, FZKViewer) nutzen um Pläne zu lesen

In absehbarer Zukunft wird die GA-Datenpunktliste direkt aus dem IFC-Modell befüllt und in BACnet/KNX-Konfigurationstools importiert.
