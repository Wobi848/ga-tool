---
title: M-Bus — Meter Bus
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
