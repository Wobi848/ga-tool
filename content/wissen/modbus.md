---
title: Modbus RTU / TCP
title_en: Modbus RTU / TCP
slug: modbus
category: protokolle
subcategory: feldbus
tags: [modbus, rtu, tcp, rs485, ethernet, register, holding, input, coil, discrete, function-code]
difficulty: fortgeschritten
area: [ga, it]
related: [bacnet, mbus, knx, rs485]
norm: [IEC 61158]
updated: 2026-05-14
lang: de
---

# Modbus RTU / TCP

**Modbus** ist eines der ältesten und am weitesten verbreiteten Industrieprotokolle. Einfach, robust, weit verfügbar — und in der GA überall anzutreffen (Wärmezähler, Frequenzumrichter, Energiemessgeräte, kleine Steuerungen).

## Varianten

| Variante       | Transport             | Verbreitung in der GA                       |
| -------------- | --------------------- | ------------------------------------------- |
| **Modbus RTU** | RS-485 (seriell)      | Feldgeräte, Zähler, FU — häufigste Variante |
| **Modbus TCP** | Ethernet (Port 502)   | Energiemessung, PLC-Kopplungen, Gateways    |
| Modbus ASCII   | RS-232/485 (klartext) | Selten, Legacy                              |

Beide sprechen das gleiche Datenmodell. TCP ist nur ein anderer „Briefumschlag".

## Datenmodell — 4 Speicherbereiche

| Bereich                   | Bezeichnung     | Lesen | Schreiben | Typ    |
| ------------------------- | --------------- | ----- | --------- | ------ |
| Coils (0xxxx)             | Discrete Output | ja    | ja        | Bit    |
| Discrete Inputs (1xxxx)   | Discrete Input  | ja    | nein      | Bit    |
| Input Registers (3xxxx)   | Read-only Reg.  | ja    | nein      | 16 bit |
| Holding Registers (4xxxx) | Read/Write Reg. | ja    | ja        | 16 bit |

> ⚠️ **Stolperfalle:** Die Adress-Offsets. Manche Hersteller dokumentieren `40001` (1-basiert), andere `0` (Register-Offset). Immer prüfen!

## Wichtige Function Codes

| FC   | Funktion                         |
| ---- | -------------------------------- |
| 0x01 | Read Coils                       |
| 0x02 | Read Discrete Inputs             |
| 0x03 | Read Holding Registers (häufig!) |
| 0x04 | Read Input Registers             |
| 0x05 | Write Single Coil                |
| 0x06 | Write Single Register            |
| 0x0F | Write Multiple Coils             |
| 0x10 | Write Multiple Registers         |

## RTU-Verkabelung (RS-485)

- **2-Draht (häufig):** A+ und B− (Daten differenziell)
- **3-Draht (besser):** zusätzliches GND (Schutz vor Erdschleifen)
- **Topologie:** Linie (Bus), max. 32 Geräte ohne Repeater (Standard) / 256 mit Repeater
- **Terminierung:** 120 Ω an beiden Enden des Busses
- **Bias-Widerstände:** zwischen A/B und +5 V / GND auf einer Master-Seite — verhindert undefinierten Pegel
- **Kabel:** geschirmt verdrillt (z.B. EIB/KNX-Kabel oder spezielles RS-485-Kabel)
- **Schirm:** **einseitig** an PE auflegen (sonst Brummschleife)

## Typische Baudraten

| Baud   | Anwendung                       |
| ------ | ------------------------------- |
| 9600   | Standard für viele Wärmezähler  |
| 19200  | FU, Energiemesser               |
| 38400  | Energiemesser, schnelle Updates |
| 57600  | Selten                          |
| 115200 | Eher Punkt-zu-Punkt             |

**Achtung:** Alle Geräte am Bus müssen gleiche Baudrate, Parität (E/O/N) und Stoppbits haben.

## Häufige Probleme

1. **Geräte antworten nicht** → Adresse korrekt? Slave-ID gleich konfiguriert?
2. **Sporadische Timeouts** → A/B vertauscht? Terminierung fehlt? Kabel zu lang?
3. **Falsche Werte** → Byte-Order (Big-/Little-Endian) prüfen! Float = 2 Register, Reihenfolge variiert
4. **Master findet nur ein Gerät** → Doppelte Slave-IDs auf dem Bus!
5. **Werte zu klein/gross** → Skalierungsfaktor? Viele Geräte liefern Integer (z.B. 235 = 23.5 °C)

## Modbus TCP — Spezifika

- Default-Port: **502**
- Multiple Master möglich (TCP-Sessions parallel)
- Slave-ID wird "Unit Identifier" genannt, oft 1
- Kein CRC (TCP übernimmt Fehlersicherung)
- ADU = MBAP-Header (7 Bytes) + Function Code + Daten

## Werkzeuge zur Inbetriebnahme

- **Modbus Poll / Modbus Slave** (Windows) — der Klassiker
- **QModMaster** (kostenlos, plattformübergreifend)
- **mbpoll** (CLI Linux)
- USB ↔ RS-485 Adapter mit FTDI-Chip (zuverlässig)

## Siehe auch

- BACnet (Gebäudeautomations-Standard)
- M-Bus (Zähler-Bus)
- KNX (Gebäudesystemtechnik)

<!-- EN -->

**Modbus** is one of the oldest and most widely used industrial protocols. Simple, robust, widely available — and found everywhere in building automation (heat meters, variable speed drives, power analyzers, small controllers).

## Variants

| Variant        | Transport              | Usage in BA                               |
| -------------- | ---------------------- | ----------------------------------------- |
| **Modbus RTU** | RS-485 (serial)        | Field devices, meters, VFDs — most common |
| **Modbus TCP** | Ethernet (port 502)    | Energy metering, PLC couplings, gateways  |
| Modbus ASCII   | RS-232/485 (plaintext) | Rare, legacy                              |

Both use the same data model. TCP is just a different "envelope".

## Data Model — 4 Memory Areas

| Area                      | Designation     | Read | Write | Type   |
| ------------------------- | --------------- | ---- | ----- | ------ |
| Coils (0xxxx)             | Discrete Output | yes  | yes   | Bit    |
| Discrete Inputs (1xxxx)   | Discrete Input  | yes  | no    | Bit    |
| Input Registers (3xxxx)   | Read-only Reg.  | yes  | no    | 16 bit |
| Holding Registers (4xxxx) | Read/Write Reg. | yes  | yes   | 16 bit |

> ⚠️ **Pitfall:** Address offsets. Some manufacturers document `40001` (1-based), others `0` (register offset). Always verify!

## Important Function Codes

| FC   | Function                              |
| ---- | ------------------------------------- |
| 0x01 | Read Coils                            |
| 0x02 | Read Discrete Inputs                  |
| 0x03 | Read Holding Registers (most common!) |
| 0x04 | Read Input Registers                  |
| 0x05 | Write Single Coil                     |
| 0x06 | Write Single Register                 |
| 0x0F | Write Multiple Coils                  |
| 0x10 | Write Multiple Registers              |

## RTU Wiring (RS-485)

- **2-wire (common):** A+ and B− (differential data)
- **3-wire (better):** additional GND (protection against ground loops)
- **Topology:** Line (bus), max. 32 devices without repeater / 256 with repeater
- **Termination:** 120 Ω at both ends of the bus
- **Bias resistors:** between A/B and +5 V / GND on the master side — prevents undefined signal level
- **Cable:** shielded twisted pair (e.g. KNX/EIB cable or dedicated RS-485 cable)
- **Shield:** connect to PE at **one end only** (otherwise ground loop hum)

## Typical Baud Rates

| Baud   | Application                   |
| ------ | ----------------------------- |
| 9600   | Standard for most heat meters |
| 19200  | VFDs, power analyzers         |
| 38400  | Power analyzers, fast updates |
| 57600  | Rare                          |
| 115200 | Point-to-point mainly         |

**Note:** All devices on the bus must use the same baud rate, parity (E/O/N) and stop bits.

## Common Problems

1. **Devices not responding** → Correct address? Same Slave ID configured?
2. **Sporadic timeouts** → A/B swapped? Termination missing? Cable too long?
3. **Wrong values** → Check byte order (Big/Little-Endian)! Float = 2 registers, order varies
4. **Master finds only one device** → Duplicate Slave IDs on the bus!
5. **Values too small/large** → Scaling factor? Many devices return integers (e.g. 235 = 23.5 °C)

## Modbus TCP — Specifics

- Default port: **502**
- Multiple masters possible (parallel TCP sessions)
- Slave ID is called "Unit Identifier", usually 1
- No CRC (TCP handles error checking)
- ADU = MBAP header (7 bytes) + Function Code + Data

## Commissioning Tools

- **Modbus Poll / Modbus Slave** (Windows) — the classic
- **QModMaster** (free, cross-platform)
- **mbpoll** (CLI Linux)
- USB ↔ RS-485 adapter with FTDI chip (reliable)

## See also

- BACnet (building automation standard)
- M-Bus (meter bus)
- KNX (building systems technology)
