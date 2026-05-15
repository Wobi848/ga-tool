---
title: CAN Bus — Controller Area Network in der GA
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
