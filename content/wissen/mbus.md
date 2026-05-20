---
title: M-Bus — Meter Bus
title_en: M-Bus — Meter Bus Protocol
slug: mbus
category: protokolle
subcategory: zählerbus
tags: [mbus, m-bus, wärmezähler, wasserzähler, gaszähler, stromzähler, wmbus, wireless, dlms, obis, primäradresse, sekundäradresse, level-converter]
difficulty: fortgeschritten
area: [ga, it]
related: [modbus, bacnet, knx]
norm: [EN 13757, IEC 62056]
updated: 2026-05-14
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

```
Master ──────────────────────────────── Bus (2 Draht)
         ├── Zähler 1 (Adresse 1)
         ├── Zähler 2 (Adresse 2)
         └── Zähler n (Adresse n)
```

| Parameter         | Wert                                      |
|-------------------|-------------------------------------------|
| Spannung (Ruhe)   | 24–36 V (logisch 1)                       |
| Spannung (aktiv)  | 12 V (logisch 0, Master sendet)           |
| Strom (Ruhe)      | ~1,5 mA pro Slave                         |
| Strom (Antwort)   | ~11–20 mA (Slave moduliert Strom)         |
| Baudrate          | 300 / 2400 / 9600 baud (2400 Standard)   |
| Max. Slaves       | 250 pro Segment (bei 2400 baud)           |
| Kabellänge        | bis 350 m bei 0,8 mm² (unkompensiert)     |

> ⚠️ **Keine Polarität!** M-Bus-Kabel ist nicht verpolsicherheitskritisch. Die meisten Zähler funktionieren bei beiden Polaritäten. Trotzdem einheitlich verkabeln.

## Adressierung

### Primäradresse (1–250)

- 1 Byte, direkte Adressierung
- Werkseitig oft auf `0` oder `1` gesetzt → **vor Inbetriebnahme umadressieren!**
- Adresse 254 = Broadcast (alle Slaves antworten — nur bei einem Slave sinnvoll)
- Adresse 255 = reserviert

### Sekundäradresse (8-stellig, hexadezimal)

- 4-Byte-Identifikationsnummer (z.B. Zählernummer `12345678`)
- Eindeutig weltweit (inkl. Herstellerkennung und Medium)
- Selektives Ansprechen einzelner Slaves möglich
- **Empfehlung:** Sekundäradresse für die GLT-Parametrierung notieren (auf Zähler-Label)

## M-Bus Telegramm — Datenstruktur

Ein M-Bus-Antworttelegramm (RSP_UD) enthält:

```
Header:
  Manufacturer ID (2 Byte) — Herstellerkennung (3-Buchstaben-Code)
  Identification No. (4 Byte) — Zählernummer
  Version (1 Byte)
  Medium (1 Byte) — Wärme=0x04, Wasser=0x07, Gas=0x03, Strom=0x02

Data Records (beliebig viele):
  DIF (Data Information Field) — Länge + Typ
  VIF (Value Information Field) — Einheit + Multiplikator
  Data — eigentlicher Wert
```

### Wichtige VIF-Codes (Einheiten)

| VIF-Bereich | Einheit            | Typischer Zähler    |
|-------------|--------------------|---------------------|
| 0x03–0x07   | Energie [Wh / kWh / MWh] | Wärmezähler  |
| 0x10–0x17   | Volumen [l / m³]   | Wasserzähler        |
| 0x28–0x2F   | Leistung [W / kW]  | Wärmezähler         |
| 0x58–0x5F   | Temperatur [°C]    | Wärmezähler (VL/RL) |
| 0x6D        | Datum + Uhrzeit    | Alle                |

> ⚠️ **Multiplikator beachten!** M-Bus kann Werte skaliert übertragen. `VIF = 0x06` bedeutet Energie in **kWh**, `0x05` bedeutet **100 Wh**. Immer VIF-Tabelle konsultieren.

## Wireless M-Bus (wM-Bus)

**EN 13757-4** — Funk-Variante des M-Bus, weit verbreitet bei Wohnungswasserzählern und Heizkostenverteilern.

| Parameter   | Wert                                        |
|-------------|---------------------------------------------|
| Frequenz    | 868 MHz (Europa)                            |
| Reichweite  | 10–30 m (bauabhängig)                       |
| Modi        | T1 (häufig gesendete Daten), C1, S1, T2, C2 |
| Sicherheit  | AES-128-Verschlüsselung (Mode 5/7)          |

Ein **wM-Bus-Empfänger** (USB-Dongle oder Gateway) lauscht passiv und leitet Daten an die GLT weiter.

## Level-Converter / Gateway

Da M-Bus nicht direkt an serielle oder Ethernet-Schnittstellen anschliessbar ist, braucht es einen **Level-Converter**:

| Typ                       | Beschreibung                                   |
|---------------------------|------------------------------------------------|
| USB ↔ M-Bus               | Direkt am PC, max. 3 Slaves (ohne eigene Speisung) |
| RS-232/RS-485 ↔ M-Bus     | Anschluss an GLT-Serielle, bis 250 Slaves      |
| **Ethernet ↔ M-Bus**      | Häufigstes Gateway für GA, Modbus TCP oder eigenes Protokoll |
| M-Bus-Master-Karte        | PCI/PCIe-Karte für dedizierte Zähler-Server   |

**Hersteller:** Relay, Solvimus, Extron, Kamstrup, Engelmann

## Auslesung über GLT

Typischer Datenpfad:

```
M-Bus-Zähler → M-Bus-Ethernet-Gateway → Modbus TCP → GLT
                    oder
M-Bus-Zähler → M-Bus-Ethernet-Gateway → REST/JSON API → GLT
```

Viele Gateways bieten:
- **Zyklische Auslesung** (z.B. alle 15 min) + Pufferung
- **OBIS-Codes** (EN 62056) für standardisierte Datenpunkt-Benennung
- **CSV/XML-Export** für Energiemanagementsysteme

## Typische Fehler & Diagnose

| Problem                         | Ursache / Massnahme                                |
|---------------------------------|----------------------------------------------------|
| Zähler antwortet nicht          | Adresse falsch? Baudrate? Kabel unterbrochen?      |
| Sporadische Timeouts            | Bus zu lang, zu viele Slaves, Kabelqualität        |
| Falscher Multiplikator          | VIF-Wert falsch interpretiert → Handbuch lesen     |
| Wert springt unrealistisch      | Zählerüberlauf (neuer Zählzyklus), Overflow prüfen |
| Verschlüsselter Datensatz       | wM-Bus AES-Schlüssel beim Hersteller anfragen      |
| Primäradressen-Konflikt         | Zwei Zähler gleiche Adresse → Bus-Scan, dann umberadressieren |

## Werkzeuge

- **mbmaster** (Linux, Open Source) — M-Bus-Master-Bibliothek + CLI
- **jmbus** (Java, Open Source) — M-Bus-Parser
- **Relay MBUS-Explorer** (Windows) — kommerziell, komfortabler Scan
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

```
Master ──────────────────────────────── Bus (2 wire)
         ├── Meter 1 (address 1)
         ├── Meter 2 (address 2)
         └── Meter n (address n)
```

| Parameter | Value |
|-----------|-------|
| Voltage (idle) | 24–36 V (logic 1) |
| Voltage (active) | 12 V (logic 0, master transmits) |
| Current (idle) | ~1.5 mA per slave |
| Current (response) | ~11–20 mA (slave modulates current) |
| Baud rate | 300 / 2400 / 9600 baud (2400 standard) |
| Max. slaves | 250 per segment (at 2400 baud) |
| Cable length | up to 350 m at 0.8 mm² (uncompensated) |

> ⚠️ **No polarity!** M-Bus cable is not polarity-sensitive. Most meters work with either polarity. Still — wire consistently.

## Addressing

### Primary Address (1–250)

- 1 byte, direct addressing
- Factory default often `0` or `1` → **reassign before commissioning!**
- Address 254 = broadcast (all slaves respond — only useful with a single slave)
- Address 255 = reserved

### Secondary Address (8-digit, hexadecimal)

- 4-byte identification number (e.g. meter number `12345678`)
- Globally unique (includes manufacturer code and medium)
- Allows selective addressing of individual slaves
- **Recommendation:** Record secondary address for BMS parameterisation (on meter label)

## M-Bus Telegram — Data Structure

An M-Bus response telegram (RSP_UD) contains:

```
Header:
  Manufacturer ID (2 bytes) — manufacturer code (3-letter code)
  Identification No. (4 bytes) — meter number
  Version (1 byte)
  Medium (1 byte) — heat=0x04, water=0x07, gas=0x03, electricity=0x02

Data records (any number):
  DIF (Data Information Field) — length + type
  VIF (Value Information Field) — unit + multiplier
  Data — actual value
```

### Key VIF Codes (Units)

| VIF range | Unit | Typical meter |
|----------|------|--------------|
| 0x03–0x07 | Energy [Wh / kWh / MWh] | Heat meter |
| 0x10–0x17 | Volume [l / m³] | Water meter |
| 0x28–0x2F | Power [W / kW] | Heat meter |
| 0x58–0x5F | Temperature [°C] | Heat meter (supply/return) |
| 0x6D | Date + time | All |

> ⚠️ **Watch the multiplier!** M-Bus can transmit scaled values. `VIF = 0x06` means energy in **kWh**, `0x05` means **100 Wh**. Always consult the VIF table.

## Wireless M-Bus (wM-Bus)

**EN 13757-4** — wireless variant of M-Bus, widely used for residential water meters and heat cost allocators.

| Parameter | Value |
|-----------|-------|
| Frequency | 868 MHz (Europe) |
| Range | 10–30 m (building-dependent) |
| Modes | T1 (frequently transmitted data), C1, S1, T2, C2 |
| Security | AES-128 encryption (Mode 5/7) |

A **wM-Bus receiver** (USB dongle or gateway) listens passively and forwards data to the BMS.

## Level Converter / Gateway

Since M-Bus cannot be connected directly to serial or Ethernet interfaces, a **level converter** is required:

| Type | Description |
|------|------------|
| USB ↔ M-Bus | Direct at PC, max. 3 slaves (without external power) |
| RS-232/RS-485 ↔ M-Bus | Connection to BMS serial port, up to 250 slaves |
| **Ethernet ↔ M-Bus** | Most common gateway for BA, Modbus TCP or proprietary protocol |
| M-Bus master card | PCI/PCIe card for dedicated meter servers |

**Manufacturers:** Relay, Solvimus, Extron, Kamstrup, Engelmann

## Readout via BMS

Typical data path:

```
M-Bus meter → M-Bus Ethernet gateway → Modbus TCP → BMS
                    or
M-Bus meter → M-Bus Ethernet gateway → REST/JSON API → BMS
```

Many gateways offer:
- **Cyclic readout** (e.g. every 15 min) + buffering
- **OBIS codes** (EN 62056) for standardised data point naming
- **CSV/XML export** for energy management systems

## Typical Faults and Diagnosis

| Problem | Cause / Action |
|---------|---------------|
| Meter does not respond | Wrong address? Baud rate? Cable broken? |
| Sporadic timeouts | Bus too long, too many slaves, cable quality |
| Wrong multiplier | VIF value misinterpreted → consult manual |
| Value jumps unrealistically | Meter rollover (new counting cycle), check overflow |
| Encrypted data set | Request wM-Bus AES key from manufacturer |
| Primary address conflict | Two meters with same address → bus scan, then re-address |

## Tools

- **mbmaster** (Linux, open source) — M-Bus master library + CLI
- **jmbus** (Java, open source) — M-Bus parser
- **Relay MBUS-Explorer** (Windows) — commercial, user-friendly scan tool
- **Wireshark** — for wM-Bus only with appropriate capture plugin

## Standards

- **EN 13757-2** — M-Bus physical layer
- **EN 13757-3** — M-Bus application layer (data telegrams)
- **EN 13757-4** — Wireless M-Bus
- **IEC 62056 / OBIS** — Object identification for energy data
