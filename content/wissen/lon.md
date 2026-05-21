---
title: LON — LonWorks im Gebäude-Bestand
title_en: LON — LonWorks in Existing Buildings
slug: lon
category: protokolle
subcategory: feldbus
tags:
  [
    lon,
    lonworks,
    lonmark,
    neuron-chip,
    free-topology,
    ftt10,
    tp-1250,
    nv,
    snvt,
    network-variable,
    lon-bridge,
    migration,
    echelon,
    legacy,
    gbr
  ]
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

| Medium            | Name    | Datenrate | Topologie                        | Einsatz                  |
| ----------------- | ------- | --------- | -------------------------------- | ------------------------ |
| Twisted Pair      | FTT-10  | 78 kbps   | Free Topology (Stern, Bus, Ring) | Gebäude-Standard         |
| Twisted Pair      | TP-1250 | 1.25 Mbps | Bus-Topologie                    | Backbone, Unterverteiler |
| Lichtwellenleiter | FOD     | 1.25 Mbps | Punkt-zu-Punkt                   | Grosse Distanzen         |
| IP-Tunnel         | IP-852  | Ethernet  | IP-Netz                          | LON über IP (Modern)     |

**FTT-10 (Free Topology):** Der häufigste LON-Typ. Bis 128 Geräte pro Segment, max. 500 m Kabellänge. Keine fixe Topologie — Stern, Bus oder Misch-Topologie möglich.

---

## LON-Adressierung

| Ebene     | Beschreibung                              |
| --------- | ----------------------------------------- |
| Neuron-ID | 48-bit eindeutige Geräte-ID (ab Werk)     |
| Domain    | Netzwerkbereich (bis 255 Geräte)          |
| Subnet    | Unterbereich (bis 127 Subnets pro Domain) |
| Node      | Gerät im Subnet (bis 127 Nodes)           |
| Group     | Multicast-Adresse für Broadcast an Gruppe |

---

## Network Tools (LNS)

Konfiguration und Inbetriebnahme mit **LNS** (LonWorks Network Services):

- **LonMaker** (Echelon) — graphisches IBN-Tool (teuer, aufwendig)
- **NodeBuilder** — Entwicklungsumgebung für Neuron-C Programme
- **LON-Scanner** — Diagnose-Tool

**Binding:** Network Variables müssen "gebunden" werden (welche NV sendet an welche NV) — das ist die LON-Konfigurationsarbeit. Ohne Binding keine Kommunikation.

---

## Typische LON-Geräte im Bestand

| Gerät                   | Hersteller           | Bemerkung             |
| ----------------------- | -------------------- | --------------------- |
| DDC-Controller (LON)    | Siemens, Sauter, TAC | Automationsebene      |
| Raumregler (LON)        | Siemens, Honeywell   | Fan-Coil, VAV         |
| Frequenzumrichter (LON) | diverse              | FU mit LON-Karte      |
| Zählerterminals (LON)   | diverse              | M-Bus-Daten über LON  |
| Gateways LON→BACnet     | Beckhoff, PTC        | Migration/Integration |

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

| Aspekt              | LON                           | BACnet              |
| ------------------- | ----------------------------- | ------------------- |
| Neue Installationen | Kaum noch (< 5 %)             | Standard            |
| Bestand CH/DE       | Viele grosse Gebäude vor 2005 | Neuere Anlagen      |
| Interoperabilität   | Mittel (SNVT hilft)           | BTL-Zertifizierung  |
| Tool-Verfügbarkeit  | Eingeschränkt                 | Gut                 |
| Fachkräfte          | Wenige junge Techniker        | Standard-Ausbildung |

> **Praxis-Tipp:** Wenn du LON-Anlage übernimmst: erstelle sofort eine Dokumentation aller NV-Bindings und der Gerätekonfiguration. Diese Information ist oft nur in der alten LNS-Datenbank gespeichert — verloren = sehr teuer.

## Normen

- **EN 14908** — LON-Protokoll, Europäische Fassung
- **ANSI/CEA-709.1** — LonTalk Protokoll
- **ISO/IEC 14908** — Internationale Norm LON
- **LonMark International** — Interoperabilität und Zertifizierung

<!-- EN -->

**LON** (Local Operating Network, also LonWorks) was a leading building automation protocol from the 1990s through the early 2000s. Today it is rarely installed new, but it is still running in thousands of buildings. Anyone working in BA will encounter it.

## What Is LON?

LON was developed by **Echelon Corporation** (now Adesto) and is based on a dedicated chip, the **Neuron Chip**:

- Every LON device contains a Neuron Chip with 3 processors (communication + application)
- Firmware: programmed in Neuron C (C-like language)
- **Network Variables (NVs):** data exchange via typed variables (similar to BACnet objects)
- **SNVT** (Standard Network Variable Types): standardised data types for BA

---

## Physical Layer

| Medium       | Name    | Data Rate | Topology                        | Application                |
| ------------ | ------- | --------- | ------------------------------- | -------------------------- |
| Twisted pair | FTT-10  | 78 kbps   | Free topology (star, bus, ring) | Building standard          |
| Twisted pair | TP-1250 | 1.25 Mbps | Bus topology                    | Backbone, sub-distribution |
| Fibre optic  | FOD     | 1.25 Mbps | Point-to-point                  | Long distances             |
| IP tunnel    | IP-852  | Ethernet  | IP network                      | LON over IP (modern)       |

**FTT-10 (Free Topology):** The most common LON type. Up to 128 devices per segment, max. 500 m cable length. No fixed topology — star, bus, or mixed topology all possible.

---

## LON Addressing

| Level     | Description                             |
| --------- | --------------------------------------- |
| Neuron ID | 48-bit unique device ID (factory-set)   |
| Domain    | Network area (up to 255 devices)        |
| Subnet    | Sub-area (up to 127 subnets per domain) |
| Node      | Device in subnet (up to 127 nodes)      |
| Group     | Multicast address for group broadcast   |

---

## Network Tools (LNS)

Configuration and commissioning with **LNS** (LonWorks Network Services):

- **LonMaker** (Echelon) — graphical commissioning tool (expensive, complex)
- **NodeBuilder** — development environment for Neuron C programs
- **LON Scanner** — diagnostic tool

**Binding:** Network Variables must be "bound" (which NV sends to which NV) — this is the core of LON configuration work. Without binding, there is no communication.

---

## Typical LON Devices in Existing Installations

| Device                     | Manufacturer         | Notes                   |
| -------------------------- | -------------------- | ----------------------- |
| DDC controller (LON)       | Siemens, Sauter, TAC | Automation level        |
| Room controller (LON)      | Siemens, Honeywell   | Fan-coil, VAV           |
| Variable speed drive (LON) | Various              | VFD with LON card       |
| Meter terminals (LON)      | Various              | M-Bus data over LON     |
| LON → BACnet gateways      | Beckhoff, PTC        | Migration / integration |

---

## LON Integration and Migration

### Keeping LON Running

- Original devices often run trouble-free for 20–30 years
- Spare parts becoming scarcer (Echelon chips no longer manufactured)
- Tool support difficult (Windows XP, LNS from 2003...)
- **Strategy:** keep LON running, connect BMS via LON-IP gateway or OPC-UA

### LON Gateway to BACnet/IP

```
LON network → [LON-BACnet gateway] → BACnet/IP → BMS
```

Gateway maps LON Network Variables to BACnet objects (AI, AO, BI, BO). No LON expertise needed at BMS level — the BMS sees standard BACnet devices.

**Manufacturers:** Sierra Monitor (Protocessor), PTC, Loytec, Veriton

### Step-by-Step Migration

```
Phase 1: Install gateway → LON data visible in BMS
Phase 2: New DDCs with BACnet, old LON stations continue running
Phase 3: Replace LON stations with BACnet at end of life
Phase 4: LON segment empty → decommission
```

---

## LON vs. BACnet Today

| Aspect               | LON                           | BACnet            |
| -------------------- | ----------------------------- | ----------------- |
| New installations    | Rare (< 5%)                   | Standard          |
| Existing stock CH/DE | Many large buildings pre-2005 | Newer systems     |
| Interoperability     | Medium (SNVT helps)           | BTL certification |
| Tool availability    | Limited                       | Good              |
| Skilled workforce    | Few younger technicians       | Standard training |

> **Practical tip:** When you take over a LON system, immediately create documentation of all NV bindings and device configurations. This information is often stored only in the old LNS database — if lost, recovery is very expensive.

## Standards

- **EN 14908** — LON protocol, European version
- **ANSI/CEA-709.1** — LonTalk protocol
- **ISO/IEC 14908** — International LON standard
- **LonMark International** — Interoperability and certification
