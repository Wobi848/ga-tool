---
title: LON — LonWorks im Gebäude-Bestand
slug: lon
category: protokolle
subcategory: feldbus
tags: [lon, lonworks, lonmark, neuron-chip, free-topology, ftt10, tp-1250, nv, snvt, network-variable, lon-bridge, migration, echelon, legacy, gbr]
difficulty: fortgeschritten
area: [ga]
related: [bacnet, modbus, knx, glt-grundlagen, opc-ua]
norm: [EN 14908, ANSI/CEA-709.1, ISO/IEC 14908]
updated: 2026-05-14
lang: de
---

# LON — LonWorks im Gebäude-Bestand

**LON** (Local Operating Network, auch LonWorks) war in den 1990ern bis frühen 2000ern ein führendes Gebäudeautomations-Protokoll. Heute wird es kaum noch neu installiert, aber es ist noch in Tausenden von Gebäuden im Betrieb. Wer in der GA arbeitet, trifft es an.

## Was ist LON?

LON wurde von **Echelon Corporation** (heute Adesto) entwickelt und basiert auf einem speziellen Chip, dem **Neuron-Chip**:

- Jedes LON-Gerät hat einen Neuron-Chip mit 3 Prozessoren (Kommunikation + Anwendung)
- Firmware: programmiert in Neuron C (C-ähnlich)
- **Network Variables (NVs):** Datenaustausch über typisierte Variablen (ähnlich BACnet-Objekte)
- **SNVT** (Standard Network Variable Types): standardisierte Datentypen für GA

---

## Physikalische Schicht

| Medium          | Name     | Datenrate | Topologie             | Einsatz                     |
|-----------------|----------|-----------|-----------------------|-----------------------------|
| Twisted Pair    | FTT-10   | 78 kbps   | Free Topology (Stern, Bus, Ring) | Gebäude-Standard |
| Twisted Pair    | TP-1250  | 1.25 Mbps | Bus-Topologie          | Backbone, Unterverteiler    |
| Lichtwellenleiter | FOD    | 1.25 Mbps | Punkt-zu-Punkt         | Grosse Distanzen            |
| IP-Tunnel       | IP-852   | Ethernet  | IP-Netz               | LON über IP (Modern)        |

**FTT-10 (Free Topology):** Der häufigste LON-Typ. Bis 128 Geräte pro Segment, max. 500 m Kabellänge. Keine fixe Topologie — Stern, Bus oder Misch-Topologie möglich.

---

## LON-Adressierung

| Ebene          | Beschreibung                                  |
|----------------|-----------------------------------------------|
| Neuron-ID      | 48-bit eindeutige Geräte-ID (ab Werk)         |
| Domain         | Netzwerkbereich (bis 255 Geräte)              |
| Subnet         | Unterbereich (bis 127 Subnets pro Domain)     |
| Node           | Gerät im Subnet (bis 127 Nodes)               |
| Group          | Multicast-Adresse für Broadcast an Gruppe     |

---

## Network Tools (LNS)

Konfiguration und Inbetriebnahme mit **LNS** (LonWorks Network Services):

- **LonMaker** (Echelon) — graphisches IBN-Tool (teuer, aufwendig)
- **NodeBuilder** — Entwicklungsumgebung für Neuron-C Programme
- **LON-Scanner** — Diagnose-Tool

**Binding:** Network Variables müssen "gebunden" werden (welche NV sendet an welche NV) — das ist die LON-Konfigurationsarbeit. Ohne Binding keine Kommunikation.

---

## Typische LON-Geräte im Bestand

| Gerät                     | Hersteller          | Bemerkung                        |
|---------------------------|---------------------|----------------------------------|
| DDC-Controller (LON)       | Siemens, Sauter, TAC | Automationsebene                |
| Raumregler (LON)           | Siemens, Honeywell  | Fan-Coil, VAV                   |
| Frequenzumrichter (LON)    | diverse             | FU mit LON-Karte                |
| Zählerterminals (LON)      | diverse             | M-Bus-Daten über LON            |
| Gateways LON→BACnet        | Beckhoff, PTC       | Migration/Integration           |

---

## LON-Integration und Migration

### LON weiter betreiben

- Original-Geräte laufen oft 20–30 Jahre problemlos
- Ersatzteile werden seltener (Echelon-Chips nicht mehr produziert)
- Tool-Support schwierig (Windows XP, LNS aus 2003...)
- **Strategie:** LON behalten, GLT über LON-IP Gateway oder OPC-UA anbinden

### LON-Gateway zu BACnet/IP

```
LON-Netz → [LON-BACnet-Gateway] → BACnet/IP → GLT
```

Gateway mappt LON-Network-Variables auf BACnet-Objekte (AI, AO, BI, BO). Kein LON-Knowhow in GLT nötig — GLT sieht normale BACnet-Geräte.

**Hersteller:** Sierra Monitor (Protocessor), PTC, Loytec, Veriton

### Schrittweise Migration

```
Phase 1: Gateway einbauen → LON-Daten in GLT sichtbar
Phase 2: Neue DDCs mit BACnet, alte LON-Stationen weiter laufen
Phase 3: LON-Stationen bei Erneuerung durch BACnet ersetzen
Phase 4: LON-Segment leer → abschalten
```

---

## LON vs. BACnet heute

| Aspekt               | LON                              | BACnet                          |
|----------------------|----------------------------------|---------------------------------|
| Neue Installationen  | Kaum noch (< 5 %)                | Standard                        |
| Bestand CH/DE        | Viele grosse Gebäude vor 2005    | Neuere Anlagen                  |
| Interoperabilität    | Mittel (SNVT hilft)              | BTL-Zertifizierung              |
| Tool-Verfügbarkeit   | Eingeschränkt                    | Gut                             |
| Fachkräfte           | Wenige junge Techniker           | Standard-Ausbildung             |

> **Praxis-Tipp:** Wenn du LON-Anlage übernimmst: erstelle sofort eine Dokumentation aller NV-Bindings und der Gerätekonfiguration. Diese Information ist oft nur in der alten LNS-Datenbank gespeichert — verloren = sehr teuer.

## Normen

- **EN 14908** — LON-Protokoll, Europäische Fassung
- **ANSI/CEA-709.1** — LonTalk Protokoll
- **ISO/IEC 14908** — Internationale Norm LON
- **LonMark International** — Interoperabilität und Zertifizierung
