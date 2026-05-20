---
title: CAN Bus — Controller Area Network in der GA
title_en: CAN Bus — Controller Area Network in Building Automation
slug: can-bus
category: kommunikation
subcategory: feldbus
tags: [can, can-bus, controller-area-network, iso-11898, canopen, j1939, differenzielle-übertragung, nachrichtenbasiert, priorität, fehlerbehandlung, belimo, hvac, antriebe, aufzug]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related: [rs485, modbus, bacnet, frequenzumrichter, motorventile, klappenantriebe]
rechner: []
norm: [ISO 11898-1, ISO 11898-2, CiA 301 CANopen, CiA 417]
updated: 2026-05-15
lang: de
---

# CAN Bus — Controller Area Network in der GA

CAN (Controller Area Network) wurde 1986 von Bosch für die Fahrzeugelektronik entwickelt und hat sich seither in industriellen Steuerungen und zunehmend auch in der Gebäudeautomation etabliert. Im GA-Umfeld findet CAN vor allem in **Ventilatoren, Antrieben, Aufzugssteuerungen und modernen HVAC-Geräten** Verwendung.

---

## Warum CAN in der Gebäudeautomation?

| Eigenschaft | Vorteil für GA |
|-------------|----------------|
| Ereignisgesteuert | Statusmeldungen sofort bei Zustandsänderung |
| Priorisierung | Alarmmeldungen verdrängen Routinedaten |
| Multi-Master | Kein zentraler Koordinator nötig |
| Hohe Störfestigkeit | Differenzielle Übertragung, CRC-Prüfung |
| Zuverlässige Fehlererkennung | Automatische Wiederholung, Bus-Off-Erkennung |

Typische GA-Anwendungen:
- **Belimo CAN** — Klappenantriebe und Ventile mit CAN-Interface
- **Aufzugssteuerungen** — Fahrkorbkommunikation gemäss EN 81-28
- **EC-Ventilatoren** — z.B. ebm-papst mit CANopen-Interface
- **Wärmepumpen und Kältemaschinen** — Geräte-interne Kommunikation
- **Brandschutzsysteme** — CAN in Löschanlagen-Steuerungen

---

## Physikalische Schicht (ISO 11898-2)

CAN nutzt eine **differenzielle Zweidrahtleitung** (CAN_H, CAN_L) ähnlich RS-485, jedoch mit anderen Spannungspegeln:

| Pegel | CAN_H | CAN_L | Differenz |
|-------|-------|-------|-----------|
| Rezessiv (1) | 2,5 V | 2,5 V | 0 V |
| Dominant (0) | 3,5 V | 1,5 V | 2 V |

**Abschlusswiderstände:** 120 Ω an beiden Busenden (identisch RS-485).

### Leitungslänge vs. Baudrate

| Baudrate | Max. Leitungslänge |
|----------|--------------------|
| 1 Mbit/s | 25 m |
| 500 kbit/s | 100 m |
| 250 kbit/s | 250 m |
| 125 kbit/s | 500 m |
| 50 kbit/s | 1000 m |
| 10 kbit/s | 5000 m |

Für GA mit Kabellängen > 100 m: 125 kbit/s oder 250 kbit/s wählen.

---

## Nachrichtenstruktur (Data Frame)

CAN ist **nachrichtenbasiert**, nicht adressbasiert. Jede Nachricht hat eine ID — der Empfänger entscheidet selbst, ob er eine Nachricht verarbeitet.

```
┌──────┬──────┬────────┬──────────────────┬─────┬────┐
│ SOF  │  ID  │  DLC   │   DATA (0–8 Byte) │ CRC │ EOF│
│ 1 Bit│11/29B│ 4 Bit  │   0–8 Byte        │15 B │    │
└──────┴──────┴────────┴──────────────────┴─────┴────┘
```

- **ID (11 Bit Standard / 29 Bit Extended):** Identifiziert die Nachrichtenart und bestimmt die Priorität (niedrigere ID = höhere Priorität)
- **DLC:** Data Length Code — Anzahl Datenbytes
- **CRC:** 15-Bit Prüfsumme

---

## Busarbitration (CSMA/BA)

CAN nutzt **bitweise Arbitration**: Wenn zwei Teilnehmer gleichzeitig senden, gewinnt der mit der niedrigeren ID (Dominant = 0 überschreibt Rezessiv = 1). Der Verlierer wiederholt automatisch. Keine Kollisionsschäden wie bei Ethernet.

---

## CANopen — das GA-relevante Anwendungsprotokoll

CANopen (CiA 301) ist das wichtigste CAN-Applikationsprotokoll in der GA:

### Kommunikationsobjekte

| Objekt | Kürzel | Funktion |
|--------|--------|----------|
| Process Data Object | PDO | Echtzeit-Prozessdaten (Messwerte, Sollwerte) |
| Service Data Object | SDO | Konfiguration und Parametrierung |
| Network Management | NMT | Anlauf, Stopp, Fehlerreset |
| Heartbeat/Guarding | HB/LG | Überwachung der Teilnehmer |
| Emergency | EMCY | Fehlermeldungen |
| Sync | SYNC | Zeitsynchronisation |

### Geräteprofil CiA 417 — Gebäudeautomation

CiA 417 definiert CANopen-Geräteklassen speziell für GA:
- **Raumbediengeräte** (Thermostat, CO₂-Sensor)
- **Ventilantriebe** (Heiz-/Kühlventile)
- **Lüftungsklappen**
- **Rollladensteuerungen**

---

## CAN vs. RS-485 / Modbus

| Merkmal | CAN / CANopen | RS-485 / Modbus RTU |
|---------|---------------|---------------------|
| Architektur | Multi-Master, ereignisgesteuert | Master-Slave, polling |
| Priorität | Ja (per ID) | Nein |
| Fehlererkennung | CRC + Bitstuffing + ACK | CRC (nur) |
| Latenz | Gering (ereignisgesteuert) | Hoch (Polling-Zykluszeit) |
| Teilnehmer | 127 | 32 (Standard) |
| Verbreitung GA CH/DE | Mittel (Antriebe, Lüftung) | Sehr hoch |
| Konfigurationsaufwand | Höher (Objektverzeichnis) | Gering (Register direkt) |

---

## CAN FD — Flexible Data Rate

CAN FD (ISO 11898-1:2015) erlaubt:
- **Bis zu 64 Byte** Nutzdaten (statt 8)
- **Bis zu 8 Mbit/s** im Datenteil
- Rückwärtskompatibel mit klassischem CAN im Arbitrationsteil

In der GA noch selten, aber in neueren HVAC-Geräten zunehmend anzutreffen.

---

## Typische Fehler und Diagnose

| Fehler | Ursache | Massnahme |
|--------|---------|-----------|
| Bus-Off | Zu viele Übertragungsfehler | Ursache finden (Abschluss, Schirmung) |
| Error Passive | Teilnehmer hat > 127 Fehler gezählt | Kommunikation prüfen |
| Keine Kommunikation | Abschlusswiderstände fehlen | 120 Ω an beide Enden |
| Sporadische Fehler | EMV-Störungen | Schirmung verbessern, Baudrate senken |
| Node antwortet nicht | NMT-State falsch | NMT Start-Node senden |

### CAN-Diagnose-Tools
- **PEAK PCAN-USB** — günstiger CAN-Analysator
- **CANalyzer (Vector)** — professionelle Analyse
- **Wireshark + SocketCAN** (Linux) — kostenlos
- **Herstellertools** (z.B. Belimo Assistant, ebm-papst CAN-Tool)

---

## Integration in GLT/DDC

Die meisten GA-Systeme sprechen Modbus RTU oder BACnet nativ. CAN-Geräte werden üblicherweise über **CAN-Gateway** angebunden:

```
GLT / BACnet/IP
      │
   BACnet/IP ↔ Modbus RTU Gateway
      │
   RS-485 Bus
      │
   CAN-Gateway (z.B. WAGO 750-657, Anybus)
      │
   CAN Bus (CANopen)
      │
   ├── Belimo Antrieb
   ├── EC-Ventilator
   └── Wärmepumpe
```

Alternativ bieten einige DDC-Systeme direkte CAN-Schnittstellen (z.B. WAGO 750, Phoenix Contact ILC).

<!-- EN -->

CAN (Controller Area Network) was developed by Bosch in 1986 for automotive electronics and has since become established in industrial controls and, increasingly, in building automation. In the BA environment, CAN is found primarily in **fans, actuators, lift controls, and modern HVAC equipment**.

---

## Why CAN in Building Automation?

| Property | Advantage for BA |
|----------|-----------------|
| Event-driven | Status messages transmitted immediately on state change |
| Prioritisation | Alarm messages pre-empt routine data |
| Multi-master | No central coordinator required |
| High noise immunity | Differential transmission, CRC checking |
| Reliable error detection | Automatic retransmission, Bus-Off detection |

Typical BA applications:
- **Belimo CAN** — damper actuators and valves with CAN interface
- **Lift controls** — car communication per EN 81-28
- **EC fans** — e.g. ebm-papst with CANopen interface
- **Heat pumps and chillers** — internal device communication
- **Fire suppression systems** — CAN in extinguishing system controls

---

## Physical Layer (ISO 11898-2)

CAN uses a **differential two-wire link** (CAN_H, CAN_L) similar to RS-485, but with different voltage levels:

| Level | CAN_H | CAN_L | Differential |
|-------|-------|-------|-------------|
| Recessive (1) | 2.5 V | 2.5 V | 0 V |
| Dominant (0) | 3.5 V | 1.5 V | 2 V |

**Termination resistors:** 120 Ω at both bus ends (identical to RS-485).

### Cable Length vs. Baud Rate

| Baud Rate | Max. Cable Length |
|-----------|-----------------|
| 1 Mbit/s | 25 m |
| 500 kbit/s | 100 m |
| 250 kbit/s | 250 m |
| 125 kbit/s | 500 m |
| 50 kbit/s | 1,000 m |
| 10 kbit/s | 5,000 m |

For BA with cable lengths > 100 m: choose 125 kbit/s or 250 kbit/s.

---

## Message Structure (Data Frame)

CAN is **message-based**, not address-based. Every message has an ID — the receiver decides itself whether to process a given message.

```
┌──────┬──────┬────────┬──────────────────┬─────┬────┐
│ SOF  │  ID  │  DLC   │   DATA (0–8 byte) │ CRC │ EOF│
│ 1 bit│11/29b│ 4 bit  │   0–8 bytes       │15 b │    │
└──────┴──────┴────────┴──────────────────┴─────┴────┘
```

- **ID (11-bit standard / 29-bit extended):** Identifies the message type and determines priority (lower ID = higher priority)
- **DLC:** Data Length Code — number of data bytes
- **CRC:** 15-bit checksum

---

## Bus Arbitration (CSMA/BA)

CAN uses **bitwise arbitration**: when two nodes transmit simultaneously, the one with the lower ID wins (Dominant = 0 overrides Recessive = 1). The loser automatically retransmits. No collision damage as with Ethernet.

---

## CANopen — The BA-Relevant Application Protocol

CANopen (CiA 301) is the most important CAN application protocol in BA:

### Communication Objects

| Object | Abbreviation | Function |
|--------|-------------|---------|
| Process Data Object | PDO | Real-time process data (measured values, setpoints) |
| Service Data Object | SDO | Configuration and parameterisation |
| Network Management | NMT | Start-up, stop, fault reset |
| Heartbeat/Guarding | HB/LG | Node monitoring |
| Emergency | EMCY | Error messages |
| Sync | SYNC | Time synchronisation |

### Device Profile CiA 417 — Building Automation

CiA 417 defines CANopen device classes specifically for BA:
- **Room operating units** (thermostat, CO₂ sensor)
- **Valve actuators** (heating/cooling valves)
- **Ventilation dampers**
- **Blind/shutter controls**

---

## CAN vs. RS-485 / Modbus

| Feature | CAN / CANopen | RS-485 / Modbus RTU |
|---------|--------------|---------------------|
| Architecture | Multi-master, event-driven | Master-slave, polling |
| Prioritisation | Yes (by ID) | No |
| Error detection | CRC + bit stuffing + ACK | CRC only |
| Latency | Low (event-driven) | Higher (polling cycle time) |
| Nodes | 127 | 32 (standard) |
| Prevalence in BA (CH/DE) | Medium (actuators, ventilation) | Very high |
| Configuration effort | Higher (object dictionary) | Low (direct register access) |

---

## CAN FD — Flexible Data Rate

CAN FD (ISO 11898-1:2015) allows:
- **Up to 64 bytes** payload (instead of 8)
- **Up to 8 Mbit/s** in the data phase
- Backward compatible with classic CAN in the arbitration phase

Still rare in BA, but increasingly found in newer HVAC equipment.

---

## Common Faults and Diagnostics

| Fault | Cause | Measure |
|-------|-------|---------|
| Bus-Off | Too many transmission errors | Find root cause (termination, shielding) |
| Error Passive | Node has counted > 127 errors | Check communication |
| No communication | Missing termination resistors | 120 Ω at both ends |
| Sporadic errors | EMC interference | Improve shielding, reduce baud rate |
| Node not responding | Wrong NMT state | Send NMT Start-Node |

### CAN Diagnostic Tools
- **PEAK PCAN-USB** — affordable CAN analyser
- **CANalyzer (Vector)** — professional analysis
- **Wireshark + SocketCAN** (Linux) — free
- **Manufacturer tools** (e.g. Belimo Assistant, ebm-papst CAN Tool)

---

## Integration into BMS/DDC

Most BA systems natively speak Modbus RTU or BACnet. CAN devices are typically connected via a **CAN gateway**:

```
BMS / BACnet/IP
      │
   BACnet/IP ↔ Modbus RTU gateway
      │
   RS-485 bus
      │
   CAN gateway (e.g. WAGO 750-657, Anybus)
      │
   CAN bus (CANopen)
      │
   ├── Belimo actuator
   ├── EC fan
   └── Heat pump
```

Some DDC systems also offer direct CAN interfaces (e.g. WAGO 750, Phoenix Contact ILC).
