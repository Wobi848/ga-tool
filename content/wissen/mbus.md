---
title: M-Bus — Meter Bus
title_en: M-Bus — Meter Bus Protocol
slug: mbus
category: protokolle
subcategory: zählerbus
tags:
  [
    mbus,
    m-bus,
    wärmezähler,
    wasserzähler,
    gaszähler,
    stromzähler,
    wmbus,
    wireless,
    dlms,
    obis,
    primäradresse,
    sekundäradresse,
    level-converter
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [modbus, bacnet, knx]
norm: [EN 13757, IEC 62056]
updated: 2026-10-14
lang: de
---

# M-Bus — Meter Bus

**M-Bus** (Meter Bus, EN 13757) ist ein europäischer Standard zur Fernauslesung von Verbrauchszählern — Wärme, Wasser, Gas, Strom. In der GA dient M-Bus als Zählerbus zwischen Zählern und der GLT oder einem Datenlogger.

## Grundprinzip

M-Bus ist ein **2-Draht-Bus** mit Master/Slave-Architektur:

- **Master** (Level-Converter oder M-Bus-Gateway) steuert die Kommunikation
- **Slave** (Zähler) antwortet auf Anfragen
- Übertragung: **asynchron seriell**, typisch 2400 baud
- Versorgung der Slaves **über das Buskabel** (24 V, Strom-Modulation)

### Physikalische Schicht

Der Master speist die Zweidrahtleitung, alle Zähler hängen parallel daran, jeder mit eigener Adresse. Die Topologie ist frei: Linie, Stern oder Baum sind möglich.

| Parameter                  | Wert                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Spannung (Ruhe)            | 24–36 V (logisch 1)                                                                                                    |
| Spannung (Master sendet 0) | etwa 12 V unter der Ruhespannung                                                                                       |
| Strom (Ruhe)               | ~1,5 mA pro Slave                                                                                                      |
| Strom (Antwort)            | ~11–20 mA (Slave moduliert Strom)                                                                                      |
| Baudrate                   | 300 / 2400 / 9600 baud (2400 Standard)                                                                                 |
| Max. Slaves                | 250 pro Segment (bei 2400 baud)                                                                                        |
| Kabellänge                 | je nach Baudrate, Anzahl Zähler und Querschnitt einige hundert Meter bis über 1 km; Angaben des Pegelwandlers beachten |

> ⚠️ **Keine Polarität!** M-Bus-Kabel ist nicht verpolsicherheitskritisch. Die meisten Zähler funktionieren bei beiden Polaritäten. Trotzdem einheitlich verkabeln.

## Adressierung

### Primäradresse (1–250)

- 1 Byte, direkte Adressierung
- Werkseitig oft auf `0` oder `1` gesetzt → **vor Inbetriebnahme umadressieren!**
- Adresse 0: Werkseinstellung, unkonfiguriert
- Adresse 253: für die Sekundäradressierung
- Adresse 254: Test, alle Zähler antworten, nur sinnvoll mit einem einzigen Zähler am Bus
- Adresse 255: Broadcast ohne Antwort

### Sekundäradresse (8 Byte)

- Identifikationsnummer (8 Ziffern, BCD), Herstellerkennung, Version und Medium
- Eindeutig weltweit (inkl. Herstellerkennung und Medium)
- Selektives Ansprechen einzelner Slaves möglich
- **Empfehlung:** Sekundäradresse für die GLT-Parametrierung notieren (auf Zähler-Label)

## M-Bus Telegramm — Datenstruktur

Ein M-Bus-Antworttelegramm (RSP_UD) enthält:

**Kopf:**

- Herstellerkennung, 2 Byte, als Code aus drei Buchstaben
- Identifikationsnummer, 4 Byte, meist die Zählernummer
- Version, 1 Byte
- Medium, 1 Byte: Wärme 0x04, Wasser 0x07, Gas 0x03, Strom 0x02

**Datensätze**, beliebig viele:

- DIF (Data Information Field): Länge und Art des Werts
- VIF (Value Information Field): Einheit und Zehnerpotenz
- Daten: der eigentliche Wert

### Wichtige VIF-Codes (Einheiten)

| VIF-Bereich | Einheit                  | Typischer Zähler    |
| ----------- | ------------------------ | ------------------- |
| 0x03–0x07   | Energie [Wh / kWh / MWh] | Wärmezähler         |
| 0x10–0x17   | Volumen [l / m³]         | Wasserzähler        |
| 0x28–0x2F   | Leistung [W / kW]        | Wärmezähler         |
| 0x58–0x5F   | Temperatur [°C]          | Wärmezähler (VL/RL) |
| 0x6D        | Datum + Uhrzeit          | Alle                |

> ⚠️ **Multiplikator beachten!** M-Bus kann Werte skaliert übertragen. `VIF = 0x06` bedeutet Energie in **kWh**, `0x05` bedeutet **100 Wh**. Immer VIF-Tabelle konsultieren.

## Wireless M-Bus (wM-Bus)

**EN 13757-4** — Funk-Variante des M-Bus, weit verbreitet bei Wohnungswasserzählern und Heizkostenverteilern.

| Parameter  | Wert                                        |
| ---------- | ------------------------------------------- |
| Frequenz   | 868 MHz (Europa)                            |
| Reichweite | 10–30 m (bauabhängig)                       |
| Modi       | T1 (häufig gesendete Daten), C1, S1, T2, C2 |
| Sicherheit | AES-128-Verschlüsselung (Mode 5/7)          |

Ein **wM-Bus-Empfänger** (USB-Dongle oder Gateway) lauscht passiv und leitet Daten an die GLT weiter.

## Level-Converter / Gateway

Da M-Bus nicht direkt an serielle oder Ethernet-Schnittstellen anschliessbar ist, braucht es einen **Level-Converter**:

| Typ                   | Beschreibung                                                 |
| --------------------- | ------------------------------------------------------------ |
| USB ↔ M-Bus           | Direkt am PC, max. 3 Slaves (ohne eigene Speisung)           |
| RS-232/RS-485 ↔ M-Bus | Anschluss an GLT-Serielle, bis 250 Slaves                    |
| **Ethernet ↔ M-Bus**  | Häufigstes Gateway für GA, Modbus TCP oder eigenes Protokoll |
| M-Bus-Master-Karte    | PCI/PCIe-Karte für dedizierte Zähler-Server                  |

**Hersteller** von Pegelwandlern und Gateways sind zum Beispiel Relay und Solvimus; viele Zählerhersteller bieten eigene an.

## Auslesung über GLT

Typischer Datenpfad:

- Zähler → M-Bus-Gateway mit Ethernet → Modbus TCP oder BACnet → GLT
- oder Zähler → M-Bus-Gateway → REST/JSON → GLT oder Energiemanagement

Viele Gateways bieten:

- **Zyklische Auslesung** (z.B. alle 15 min) + Pufferung
- **OBIS-Codes** (EN 62056) für standardisierte Datenpunkt-Benennung
- **CSV/XML-Export** für Energiemanagementsysteme

## Typische Fehler & Diagnose

| Problem                    | Ursache / Massnahme                                        |
| -------------------------- | ---------------------------------------------------------- |
| Zähler antwortet nicht     | Adresse falsch? Baudrate? Kabel unterbrochen?              |
| Sporadische Timeouts       | Bus zu lang, zu viele Slaves, Kabelqualität                |
| Falscher Multiplikator     | VIF-Wert falsch interpretiert → Handbuch lesen             |
| Wert springt unrealistisch | Zählerüberlauf (neuer Zählzyklus), Overflow prüfen         |
| Verschlüsselter Datensatz  | wM-Bus AES-Schlüssel beim Hersteller anfragen              |
| Primäradressen-Konflikt    | Zwei Zähler gleiche Adresse → Bus-Scan, dann umadressieren |

## Werkzeuge

- **libmbus** (Open Source) — M-Bus-Bibliothek mit Kommandozeilenwerkzeugen
- **jmbus** (Java, Open Source) — M-Bus-Parser
- **Wireshark** — nur für wM-Bus mit passendem Capture-Plugin

## Normen

- **EN 13757-2** — M-Bus physikalische Schicht
- **EN 13757-3** — M-Bus Anwendungsschicht (Datentelegramme)
- **EN 13757-4** — Wireless M-Bus
- **IEC 62056 / OBIS** — Objektkennzeichnung für Energiedaten

<!-- EN -->

**M-Bus** (Meter Bus, EN 13757) is a European standard for remote reading of consumption meters — heat, water, gas, electricity. In BA, M-Bus serves as the meter bus between meters and the BMS or a data logger.

## Basic Principle

M-Bus is a **2-wire bus** with master/slave architecture:

- **Master** (level converter or M-Bus gateway) controls communication
- **Slave** (meter) responds to requests
- Transmission: **asynchronous serial**, typically 2400 baud
- Slaves **powered via the bus cable** (24 V, current modulation)

### Physical Layer

The master powers the two-wire line; all meters are connected in parallel, each with its own address. The topology is free: line, star or tree are possible.

| Parameter                | Value                                                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| Voltage (idle)           | 24–36 V (logic 1)                                                                                                              |
| Voltage (master sends 0) | about 12 V below the idle voltage                                                                                              |
| Current (idle)           | ~1.5 mA per slave                                                                                                              |
| Current (response)       | ~11–20 mA (slave modulates current)                                                                                            |
| Baud rate                | 300 / 2400 / 9600 baud (2400 standard)                                                                                         |
| Max. slaves              | 250 per segment (at 2400 baud)                                                                                                 |
| Cable length             | depending on baud rate, number of meters and cross-section from a few hundred metres to over 1 km; follow level converter data |

> ⚠️ **No polarity!** M-Bus cable is not polarity-sensitive. Most meters work with either polarity. Still — wire consistently.

## Addressing

### Primary Address (1–250)

- 1 byte, direct addressing
- Factory default often `0` or `1` → **reassign before commissioning!**
- Address 0: factory default, unconfigured
- Address 253: used for secondary addressing
- Address 254: test, all meters reply, only useful with a single meter on the bus
- Address 255: broadcast without reply

### Secondary Address (8 bytes)

- identification number (8 BCD digits), manufacturer code, version and medium
- Globally unique (includes manufacturer code and medium)
- Allows selective addressing of individual slaves
- **Recommendation:** Record secondary address for BMS parameterisation (on meter label)

## M-Bus Telegram — Data Structure

An M-Bus response telegram (RSP_UD) contains:

**Header:**

- manufacturer ID, 2 bytes, as a three-letter code
- identification number, 4 bytes, usually the meter number
- version, 1 byte
- medium, 1 byte: heat 0x04, water 0x07, gas 0x03, electricity 0x02

**Data records**, any number:

- DIF (data information field): length and type of value
- VIF (value information field): unit and power of ten
- data: the actual value

### Key VIF Codes (Units)

| VIF range | Unit                    | Typical meter              |
| --------- | ----------------------- | -------------------------- |
| 0x03–0x07 | Energy [Wh / kWh / MWh] | Heat meter                 |
| 0x10–0x17 | Volume [l / m³]         | Water meter                |
| 0x28–0x2F | Power [W / kW]          | Heat meter                 |
| 0x58–0x5F | Temperature [°C]        | Heat meter (supply/return) |
| 0x6D      | Date + time             | All                        |

> ⚠️ **Watch the multiplier!** M-Bus can transmit scaled values. `VIF = 0x06` means energy in **kWh**, `0x05` means **100 Wh**. Always consult the VIF table.

## Wireless M-Bus (wM-Bus)

**EN 13757-4** — wireless variant of M-Bus, widely used for residential water meters and heat cost allocators.

| Parameter | Value                                            |
| --------- | ------------------------------------------------ |
| Frequency | 868 MHz (Europe)                                 |
| Range     | 10–30 m (building-dependent)                     |
| Modes     | T1 (frequently transmitted data), C1, S1, T2, C2 |
| Security  | AES-128 encryption (Mode 5/7)                    |

A **wM-Bus receiver** (USB dongle or gateway) listens passively and forwards data to the BMS.

## Level Converter / Gateway

Since M-Bus cannot be connected directly to serial or Ethernet interfaces, a **level converter** is required:

| Type                  | Description                                                    |
| --------------------- | -------------------------------------------------------------- |
| USB ↔ M-Bus           | Direct at PC, max. 3 slaves (without external power)           |
| RS-232/RS-485 ↔ M-Bus | Connection to BMS serial port, up to 250 slaves                |
| **Ethernet ↔ M-Bus**  | Most common gateway for BA, Modbus TCP or proprietary protocol |
| M-Bus master card     | PCI/PCIe card for dedicated meter servers                      |

**Manufacturers** of level converters and gateways include Relay and Solvimus; many meter manufacturers offer their own.

## Readout via BMS

Typical data path:

- meter → M-Bus gateway with Ethernet → Modbus TCP or BACnet → BMS
- or meter → M-Bus gateway → REST/JSON → BMS or energy management

Many gateways offer:

- **Cyclic readout** (e.g. every 15 min) + buffering
- **OBIS codes** (EN 62056) for standardised data point naming
- **CSV/XML export** for energy management systems

## Typical Faults and Diagnosis

| Problem                     | Cause / Action                                           |
| --------------------------- | -------------------------------------------------------- |
| Meter does not respond      | Wrong address? Baud rate? Cable broken?                  |
| Sporadic timeouts           | Bus too long, too many slaves, cable quality             |
| Wrong multiplier            | VIF value misinterpreted → consult manual                |
| Value jumps unrealistically | Meter rollover (new counting cycle), check overflow      |
| Encrypted data set          | Request wM-Bus AES key from manufacturer                 |
| Primary address conflict    | Two meters with same address → bus scan, then re-address |

## Tools

- **libmbus** (open source) — M-Bus library with command line tools
- **jmbus** (Java, open source) — M-Bus parser
- **Wireshark** — for wM-Bus only with appropriate capture plugin

## Standards

- **EN 13757-2** — M-Bus physical layer
- **EN 13757-3** — M-Bus application layer (data telegrams)
- **EN 13757-4** — Wireless M-Bus
- **IEC 62056 / OBIS** — Object identification for energy data
