---
title: KNX — Grundlagen & Inbetriebnahme
title_en: KNX — Fundamentals and Commissioning
slug: knx
category: protokolle
subcategory: gebäudebus
tags:
  [
    knx,
    ets,
    gruppenadresse,
    telegramm,
    topologie,
    linie,
    bereich,
    backbone,
    tp,
    ip,
    rf,
    powerline,
    ga-schnittstelle,
    knxip
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [bacnet, modbus]

norm: [EN 50090, ISO/IEC 14543-3]
updated: 2026-10-16
lang: de
---

# KNX — Grundlagen & Inbetriebnahme

**KNX** ist der weltweite Standard für die Gebäudesystemtechnik (Licht, Jalousie, Heizung, Klima). In der GA-Welt dient KNX als dezentrales Feldbus-System — die GLT kommuniziert über ein **KNXnet/IP-Gateway** oder direkt über **KNX/IP**.

## Übertragungsmedien

| Medium       | Kürzel | Kabel / Träger             | Einsatz                            |
| ------------ | ------ | -------------------------- | ---------------------------------- |
| Twisted Pair | TP     | 2×0,8 mm Busleitung (YCYM) | Neubau, Standardanwendung          |
| Powerline    | PL     | 230-V-Leitung              | Nachrüstung                        |
| Funk         | RF     | 868 MHz                    | Nachrüstung, Sensoren ohne Kabel   |
| IP           | IP     | Ethernet (UDP Port 3671)   | Backbone, GLT-Anbindung, KNXnet/IP |

**Datenraten:** TP 9600 bit/s, Powerline 1200 bit/s, RF rund 16 kbit/s. Über IP entsprechend schneller.

**Twisted Pair** ist die bei weitem häufigste Variante. Die Busleitung liefert gleichzeitig 29 V DC zur Versorgung der Geräte (max. 10 mA pro Gerät typisch).

## Topologie

| Ebene      | Anzahl                                                            | Beispiel Adresse |
| ---------- | ----------------------------------------------------------------- | ---------------- |
| Bereich    | bis 15                                                            | 1                |
| Linie      | bis 15 pro Bereich                                                | 1.2              |
| Teilnehmer | bis 64 pro Liniensegment, mit Linienverstärkern bis 256 pro Linie | 1.2.15           |

- **Linie:** bis zu 64 Geräte, max. 1000 m Kabellänge gesamt, max. 350 m von der Spannungsversorgung bis zum Gerät, max. 700 m zwischen zwei Geräten
- **Linienkoppler (LK):** verbindet Linien innerhalb eines Bereichs, filtert Telegramme
- **Bereichskoppler (BK):** verbindet Bereiche, ebenfalls mit Telegrammfilter
- **IP-Backbone:** Bereiche können über KNXnet/IP-Router zusammengeführt werden

> ⚠️ **Wichtig:** Die physikalische Adresse (z.B. `1.2.15`) ist nur für die Inbetriebnahme. Im Betrieb kommunizieren Geräte ausschliesslich über **Gruppenadressen**.

## Physikalische Adresse vs. Gruppenadresse

| Typ                   | Format   | Bedeutung                                    |
| --------------------- | -------- | -------------------------------------------- |
| Physikalische Adresse | `1.2.15` | Bereich.Linie.Gerät — für ETS-Programmierung |
| Gruppenadresse        | `1/2/50` | Kommunikationsobjekt-Verknüpfung             |

**Idee:** Ein Taster sendet auf Gruppenadresse `1/2/50`. Alle Aktoren, die diese GA abonniert haben, reagieren. Ein Gerät kann beliebig viele GAs haben.

### Empfohlene GA-Struktur (3-stufig)

Die übliche Aufteilung einer dreistufigen Gruppenadresse, etwa **1/2/50**:

- **Hauptgruppe 1:** Funktion oder Gewerk, zum Beispiel Licht
- **Mittelgruppe 2:** Raum, Etage oder Zone
- **Untergruppe 50:** einzelner Kanal oder Schaltpunkt

Andere Aufteilungen sind möglich. Wichtig ist, dass sie im ganzen Projekt einheitlich ist.

## Telegramm-Aufbau (Kurzfassung)

Ein KNX-TP-Telegramm besteht aus:

- **Steuerfeld** (Priorität, Repeat-Bit)
- **Quelladresse** (physikalische Adresse des Senders)
- **Zieladresse** (Gruppenadresse oder physikalische Adresse)
- **Datenfeld** (1 Bit bis 14 Bytes — abhängig vom Datenpunkt-Typ)
- **CRC** (Prüfsumme)

Max. Telegrammrate auf einer Linie: ca. **50 Telegramme/s**.

## Datenpunkt-Typen (DPT) — die wichtigsten

| DPT    | Länge  | Daten                       | Beispiel                   |
| ------ | ------ | --------------------------- | -------------------------- |
| 1.001  | 1 Bit  | Schalten (0/1)              | Licht Ein/Aus              |
| 1.008  | 1 Bit  | Auf/Ab                      | Jalousie                   |
| 5.001  | 1 Byte | Prozentwert 0–100 %         | Helligkeit, Ventilstellung |
| 9.001  | 2 Byte | Gleitkomma −273…+670'760 °C | Temperatur                 |
| 9.006  | 2 Byte | Gleitkomma, Pa              | Druck                      |
| 14.x   | 4 Byte | IEEE 754 Float              | Leistung, Energie          |
| 16.001 | 14 B   | Zeichenkette ISO 8859-1     | Anzeige                    |

> ⚠️ **DPT 9.x (2-Byte Float):** Kein IEEE 754! KNX verwendet ein eigenes Format mit Mantisse + Exponent. Beim Einlesen in GLT/BACnet auf korrekte Skalierung achten.

## ETS — Engineering Tool Software

Das **ETS** (aktuell ETS6) ist das offizielle Konfigurations- und Programmierwerkzeug. Alle Geräte-Applikationen werden hier geladen, parametriert und in die Geräte gespielt.

### Typischer IBN-Ablauf

1. **Projekt anlegen** → Topologie, Linien, Geräte einfügen
2. **Produktdatenbank** (Online-Katalog in der ETS oder Website des Herstellers) → Import der Gerätedaten (`.knxprod`)
3. **Applikationsparameter** setzen (z.B. Tastenbelegung, Schaltzeiten)
4. **Gruppenadressen anlegen** (3-stufig empfohlen)
5. **Kommunikationsobjekte verknüpfen** (KO → GA)
6. **Download** über USB/TP-Schnittstelle oder KNXnet/IP-Interface
7. **Funktionstest** im ETS-Diagnosefenster (Telegrammmonitor)

**Programmierphysisch:** Lerntaste am Gerät drücken → ETS sendet physikalische Adresse → Gerät speichert.

## KNXnet/IP — GA-Anbindung

Über einen **KNXnet/IP-Router** oder eine **IP-Schnittstelle** kann die GLT auf den KNX-Bus zugreifen:

- **IP-Schnittstelle:** Tunnel-Zugang für ETS und SCADA (je nach Gerät 1 bis 8 gleichzeitige Verbindungen)
- **IP-Router:** Koppelt KNX-TP-Linie mit IP-Backbone (für grössere Anlagen)

**Protokoll:** UDP Port **3671**, Multicast-Adresse `224.0.23.12`

Gängige GLT-Anbindungen:

- OPC DA/UA-Server mit KNX-Treiber
- BACnet/IP-Gateway mit KNX-BACnet-Mapping
- Direkte SDK-Anbindung (knxd, KNXIP-Python, Weinzierl SDK)

## KNX Secure

Klassisches KNX überträgt unverschlüsselt und ohne Authentifizierung. Wer an den Bus oder ins IP-Netz kommt, kann mitlesen und schalten. Seit einigen Jahren gibt es:

- **KNX Data Secure:** verschlüsselt und authentifiziert die Telegramme zwischen den Geräten
- **KNX IP Secure:** sichert die Kommunikation auf dem IP-Backbone und beim Tunneling

Beides funktioniert nur mit Geräten, die es unterstützen, und wird in der ETS eingerichtet. Die Schlüssel stecken im ETS-Projekt, das deshalb wie ein Passwort geschützt und archiviert werden muss. Ohne KNX Secure gehört KNXnet/IP in ein eigenes, abgeschottetes Netz und nie ins Internet.

## Diagnose & Fehlersuche

| Problem                        | Ursache / Massnahme                                                                                                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Gerät reagiert nicht           | Physikalische Adresse doppelt? Busversorgung ok?                                                                     |
| Telegramme kommen nicht an     | Koppler-Filter prüfen — GA in Filtertabelle?                                                                         |
| Sporadische Ausfälle           | Bus überlastet (über etwa 50 Telegramme/s), Koppler leiten zu viel weiter. KNX TP braucht keinen Abschlusswiderstand |
| Gerät lässt sich nicht flashen | Programmiertaste gedrückt halten? IP-Schnittstelle Tunnel-Limit erreicht?                                            |
| Kurzschluss auf Linie          | Busspeisung schaltet ab → Segment für Segment isolieren                                                              |

**Telegrammmonitor im ETS:** Realtime-Sicht auf alle Telegramme — unverzichtbar zur Diagnose.

## Normen & Ressourcen

- **EN 50090 / ISO/IEC 14543-3** — KNX-Standard
- **KNX Association** (knx.org) — Schulungen, Produktdatenbank, ETS-Download
- **KNX Certified** — Pflicht für alle KNX-Geräte
- **Literatur:** O. Steiger, _Gebäudeautomation – effizient vernetzen_, Faktor Verlag, Zürich 2026, Kapitel 10 «Bussysteme»

<!-- EN -->

**KNX** is the global standard for building systems technology (lighting, blinds, heating, HVAC). In the BA world, KNX serves as a decentralised fieldbus — the BMS communicates via a **KNXnet/IP gateway** or directly via **KNX/IP**.

## Transmission Media

| Medium       | Code | Cable / carrier           | Application                          |
| ------------ | ---- | ------------------------- | ------------------------------------ |
| Twisted Pair | TP   | 2×0.8 mm bus cable (YCYM) | New construction, standard           |
| Powerline    | PL   | 230 V mains cable         | Retrofit                             |
| Radio        | RF   | 868 MHz                   | Retrofit, wireless sensors           |
| IP           | IP   | Ethernet (UDP port 3671)  | Backbone, BMS integration, KNXnet/IP |

**Data rates:** TP 9600 bit/s, powerline 1200 bit/s, RF about 16 kbit/s. Correspondingly faster over IP.

**Twisted Pair** is by far the most common variant. The bus cable simultaneously supplies 29 V DC to power devices (typically max. 10 mA per device).

## Topology

| Level  | Number                                                            | Example address |
| ------ | ----------------------------------------------------------------- | --------------- |
| Area   | up to 15                                                          | 1               |
| Line   | up to 15 per area                                                 | 1.2             |
| Device | up to 64 per line segment, with line repeaters up to 256 per line | 1.2.15          |

- **Line:** up to 64 devices, max. 1,000 m total cable length, max. 350 m from power supply to device, max. 700 m between two devices
- **Line coupler (LC):** connects lines within an area, filters telegrams
- **Area coupler (AC):** connects areas, also with telegram filter
- **IP backbone:** areas can be linked via KNXnet/IP routers

> ⚠️ **Important:** The physical address (e.g. `1.2.15`) is only used during commissioning. In operation, devices communicate exclusively via **group addresses**.

## Physical Address vs. Group Address

| Type             | Format   | Meaning                                |
| ---------------- | -------- | -------------------------------------- |
| Physical address | `1.2.15` | Area.Line.Device — for ETS programming |
| Group address    | `1/2/50` | Communication object linkage           |

**Concept:** A push-button sends on group address `1/2/50`. All actuators that have subscribed to this GA respond. A device can have any number of GAs.

### Recommended GA Structure (3-level)

The usual structure of a three-level group address, for example **1/2/50**:

- **Main group 1:** function or trade, for example lighting
- **Middle group 2:** room, floor or zone
- **Sub group 50:** individual channel or switching point

Other structures are possible. What matters is that it is consistent throughout the project.

## Telegram Structure (Summary)

A KNX TP telegram consists of:

- **Control field** (priority, repeat bit)
- **Source address** (physical address of sender)
- **Destination address** (group address or physical address)
- **Data field** (1 bit to 14 bytes — depending on data point type)
- **CRC** (checksum)

Maximum telegram rate on one line: approx. **50 telegrams/s**.

## Data Point Types (DPT) — the Most Important

| DPT    | Length  | Data                   | Example                    |
| ------ | ------- | ---------------------- | -------------------------- |
| 1.001  | 1 bit   | Switch (0/1)           | Light on/off               |
| 1.008  | 1 bit   | Up/down                | Blinds                     |
| 5.001  | 1 byte  | Percentage 0–100%      | Brightness, valve position |
| 9.001  | 2 bytes | Float −273…+670,760 °C | Temperature                |
| 9.006  | 2 bytes | Float, Pa              | Pressure                   |
| 14.x   | 4 bytes | IEEE 754 float         | Power, energy              |
| 16.001 | 14 B    | ISO 8859-1 string      | Display                    |

> ⚠️ **DPT 9.x (2-byte float):** Not IEEE 754! KNX uses its own format with mantissa + exponent. When reading into BMS/BACnet, ensure correct scaling.

## ETS — Engineering Tool Software

**ETS** (currently ETS6) is the official configuration and programming tool. All device applications are loaded, parameterised, and downloaded to devices here.

### Typical Commissioning Workflow

1. **Create project** → add topology, lines, devices
2. **Product database** (online catalogue in the ETS or manufacturer website) → import device data (`.knxprod`)
3. **Set application parameters** (e.g. button assignments, switching times)
4. **Create group addresses** (3-level recommended)
5. **Link communication objects** (CO → GA)
6. **Download** via USB/TP interface or KNXnet/IP interface
7. **Functional test** in ETS diagnostics window (telegram monitor)

**Physical programming:** Press learning button on device → ETS sends physical address → device stores it.

## KNXnet/IP — BMS Integration

Via a **KNXnet/IP router** or **IP interface**, the BMS can access the KNX bus:

- **IP interface:** Tunnel access for ETS and SCADA (1 to 8 simultaneous connections depending on device)
- **IP router:** Connects KNX TP line with IP backbone (for larger installations)

**Protocol:** UDP port **3671**, multicast address `224.0.23.12`

Common BMS integrations:

- OPC DA/UA server with KNX driver
- BACnet/IP gateway with KNX–BACnet mapping
- Direct SDK integration (knxd, KNXIP-Python, Weinzierl SDK)

## KNX Secure

Classic KNX transmits unencrypted and without authentication. Anyone with access to the bus or the IP network can listen in and switch. For some years there has been:

- **KNX Data Secure:** encrypts and authenticates telegrams between devices
- **KNX IP Secure:** secures communication on the IP backbone and during tunnelling

Both only work with devices that support them and are set up in the ETS. The keys are stored in the ETS project, which must therefore be protected and archived like a password. Without KNX Secure, KNXnet/IP belongs in a separate, isolated network and never on the internet.

## Diagnostics and Troubleshooting

| Problem                     | Cause / remedy                                                                                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Device does not respond     | Duplicate physical address? Bus supply OK?                                                                      |
| Telegrams not received      | Check coupler filter — is GA in filter table?                                                                   |
| Sporadic failures           | Bus overloaded (above about 50 telegrams/s), couplers forwarding too much. KNX TP needs no terminating resistor |
| Device cannot be programmed | Hold programming button? IP interface tunnel limit reached?                                                     |
| Short circuit on line       | Bus supply shuts down → isolate segment by segment                                                              |

**Telegram monitor in ETS:** Real-time view of all telegrams — essential for diagnostics.

## Standards and Resources

- **EN 50090 / ISO/IEC 14543-3** — KNX standard
- **KNX Association** (knx.org) — training, product database, ETS download
- **KNX Certified** — mandatory for all KNX devices
- **Further reading:** O. Steiger, _Gebäudeautomation – effizient vernetzen_ (in German), Faktor Verlag, Zurich 2026, chapter 10 "Bussysteme"
