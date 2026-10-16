---
title: BACnet — Building Automation and Control Networks
title_en: BACnet — Building Automation and Control Networks
slug: bacnet
category: protokolle
subcategory: gebäudeautomation
tags:
  [
    bacnet,
    bacnet-ip,
    mstp,
    who-is,
    i-am,
    cov,
    bbmd,
    objekobjekte,
    properties,
    device,
    analog-input,
    binary-output,
    schedule,
    trend,
    priority-array
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [modbus, knx, opc-ua, iec61850]
norm: [ASHRAE 135, ISO 16484-5, EN ISO 16484-5]
updated: 2026-10-16
lang: de
---

# BACnet — Building Automation and Control Networks

**BACnet** (ASHRAE 135 / ISO 16484-5) ist der internationale Standard für die Gebäudeautomation. Anders als Modbus definiert BACnet nicht nur die Übertragung, sondern auch die **Semantik** der Daten: Objekte, Properties, Services — ein vollständiges Informationsmodell.

## Varianten / Datalinkschichten

| Variante            | Transport          | Typischer Einsatz                      |
| ------------------- | ------------------ | -------------------------------------- |
| **BACnet/IP**       | UDP Port 47808     | GLT, DDC-Vernetzung, Ethernet-Backbone |
| **BACnet MS/TP**    | RS-485 (Token-Bus) | Feldebene, kostengünstige DDC          |
| BACnet/SC           | WebSocket über TLS | Cloud, sichere WAN-Verbindungen (neu)  |
| BACnet Ethernet     | Ethernet (raw)     | Legacy, selten                         |
| BACnet ARCNET       | ARCNET             | Veraltet                               |
| BACnet über LonTalk | LON-Medium         | selten, für Übergänge aus LON-Anlagen  |

**BACnet/IP** und **MS/TP** sind in der Praxis die relevanten Varianten.

## Das Objektmodell

BACnet repräsentiert alle Mess- und Steuergrössen als **Objekte**. Jedes Gerät (**Device**) enthält eine Liste von Objekten.

### Wichtige Objekttypen

| Objekttyp                | Kürzel  | Beschreibung                               |
| ------------------------ | ------- | ------------------------------------------ |
| Analog Input             | AI      | Analoger Messwert (Temp., Druck, …)        |
| Analog Output            | AO      | Analoger Stellwert (Ventil, FU, …)         |
| Analog Value             | AV      | Interner Rechenwert / Sollwert             |
| Binary Input             | BI      | Binärer Zustand (Störmeldung, Laufmeldung) |
| Binary Output            | BO      | Binärer Befehl (Ein/Aus)                   |
| Binary Value             | BV      | Interner Binärwert / Freigabe              |
| Multi-State Input/Output | MSI/MSO | Mehrstufige Zustände (Betriebsarten)       |
| Schedule                 | SCH     | Zeitprogramm                               |
| Calendar                 | CAL     | Feiertagsliste für Schedule                |
| Trend Log                | TL      | Aufzeichnung von Wertverläufen             |
| Notification Class       | NC      | Alarmweiterleitung                         |
| Loop                     | LP      | PID-Regelkreis                             |
| Program                  | PRG     | Applikationsprogramm                       |

### Wichtige Properties

Jedes Objekt hat Properties. Die wichtigsten; welche Pflicht sind, hängt vom Objekttyp ab:

| Property            | Bedeutung                                         |
| ------------------- | ------------------------------------------------- |
| `Object_Identifier` | Objekttyp + Instanznummer (z.B. AI:3)             |
| `Object_Name`       | Lesbarer Name (z.B. "Aussentemperatur")           |
| `Object_Type`       | Typ des Objekts                                   |
| `Present_Value`     | **Aktueller Wert** — das Wichtigste               |
| `Status_Flags`      | In-Alarm, Fault, Overridden, Out-of-Service       |
| `Units`             | Masseinheit (degreesCelsius, pascals, percent, …) |
| `Description`       | Freitext-Beschreibung                             |

Für AO/BO zusätzlich:

| Property             | Bedeutung                            |
| -------------------- | ------------------------------------ |
| `Priority_Array`     | 16 Prioritätsstufen (1 = höchste)    |
| `Relinquish_Default` | Wert wenn alle Prioritätsstufen frei |

> ⚠️ **Priority Array:** BACnet erlaubt mehrere Quellen gleichzeitig auf einen Ausgang zu schreiben. Priorität 8 = GLT-Handsteuerung, Priorität 16 = Normalfahrt. Immer die richtige Priorität verwenden!

## BACnet-Services (Kommunikation)

### Geräteerkennung (Who-Is / I-Am)

- Der Client sendet **Who-Is** als Broadcast, wahlweise für einen Bereich von Device-Instanzen.
- Jedes passende Gerät antwortet mit **I-Am**: Device-Instanz, maximale APDU-Länge, Segmentierung, Hersteller-ID.

Damit wird das **BACnet Device Object** gefunden. Darüber lassen sich alle weiteren Objekte auflisten (`Read-Property`: `Object_List`).

### Datenzugriff

| Service                | Beschreibung                                |
| ---------------------- | ------------------------------------------- |
| `ReadProperty`         | Einzelnen Property-Wert lesen               |
| `WriteProperty`        | Property schreiben (z.B. Present_Value)     |
| `ReadPropertyMultiple` | Mehrere Properties in einem Request         |
| `SubscribeCOV`         | **Change of Value** — Push bei Wertänderung |

**COV (Change of Value)** ist entscheidend für effiziente GLT-Anbindungen — statt zyklischen Polling meldet das Gerät Änderungen selbstständig.

## BACnet/IP — Netzwerk-Details

- UDP Port **47808** (0xBAC0)
- Jedes BACnet-Gerät hat eine **Device Instance** (0–4.194.302, muss eindeutig im Netz sein!)
- **BBMD (BACnet Broadcast Management Device):** Leitet Broadcasts über Router weiter — notwendig wenn BACnet-Geräte in verschiedenen Subnetzen sind

### Typisches Netzwerk-Szenario

| Subnetz           | Geräte                                                         |
| ----------------- | -------------------------------------------------------------- |
| A, 192.168.1.0/24 | DDC 1 (Device 100), DDC 2 (Device 200), BBMD A, GLT (Device 1) |
| B, 192.168.2.0/24 | DDC 3 (Device 300), DDC 4 (Device 400), BBMD B                 |

**BBMD A und BBMD B** kennen sich über ihre **Broadcast Distribution Table** (BDT) und leiten Broadcasts wie Who-Is gegenseitig weiter. Ein einzelnes Gerät ohne eigenen BBMD, etwa ein Service-Laptop in einem dritten Netz, meldet sich per **Foreign Device Registration** bei einem BBMD an.

Ohne BBMD: Broadcasts (Who-Is) kommen nicht ins andere Subnetz.

## BACnet MS/TP — Feldebene

- RS-485, Baudrate typisch **76800** oder **38400** baud
- **Token-Bus-Verfahren:** Master gibt Token weiter, Slave antwortet auf Anfragen
- MAC-Adressen **0–127 für Master**, 128–254 für Slaves. Pro Segment ohne Repeater höchstens 32 Lasteinheiten nach RS-485, mit Viertellast-Transceivern mehr
- **MAC-Adresse** ≠ Device Instance

> ⚠️ **Wichtig:** MS/TP-Adressen und Device Instance sind unabhängig. Ein Gerät mit MAC 5 kann Device Instance 2005 haben.

### MS/TP-Topologie

- Linie (daisy-chain), keine Sterne
- Terminierung: 120 Ω an beiden Enden
- Max. Kabellänge: 1200 m je Segment mit geeignetem Kabel; bei hohen Baudraten Herstellerangaben beachten

## Alarme & Trending

### Alarmierung (Intrinsic / Algorithmic)

- **Intrinsic Reporting:** im Objekt selbst (High-Limit, Low-Limit, Deadband)
- **Notification Class** bestimmt: wer bekommt den Alarm? (Recipient List)
- Alarm-Typen: `TO-OFFNORMAL`, `TO-NORMAL`, `TO-FAULT`

### Trend Log

- Aufzeichnung von `Present_Value` über Zeit
- Auslösung: zyklisch oder bei COV
- Ausgelesen über `ReadRange` Service

## Werkzeuge zur Diagnose

- **YABE (Yet Another Bacnet Explorer)** — kostenlos, Windows, unverzichtbar
- **BACnet Discovery Tool** (Loytec, Siemens, …) — herstellerspezifisch
- **Wireshark** mit BACnet-Dissector — Low-Level Analyse
- **BACnet Scan** in den meisten GLT-Systemen integriert

## Typische Fehler

| Problem                            | Ursache / Massnahme                                  |
| ---------------------------------- | ---------------------------------------------------- |
| Gerät nicht gefunden (Who-Is)      | Anderes Subnetz? BBMD fehlt oder falsch konfiguriert |
| Device Instance doppelt            | Zwei Geräte mit gleicher ID — eines umbenennen       |
| COV-Subscriptions laufen ab        | Client muss re-subscriben (Lifetime beachten)        |
| Schreibzugriff schlägt fehl        | Priorität zu niedrig? Objekt Out-of-Service?         |
| MS/TP: Geräte antworten sporadisch | Terminierung? Kabel zu lang? Max-Master zu klein?    |

## Normen

- **ASHRAE 135** — die BACnet-Bibel (kostenpflichtig)
- **ISO 16484-5** — internationale Fassung
- **BACnet Testing Laboratories (BTL)** — Konformitätsprüfung, Interoperabilitätsliste
- **Literatur:** O. Steiger, _Gebäudeautomation – effizient vernetzen_, Faktor Verlag, Zürich 2026, Kapitel 10 «Bussysteme»

<!-- EN -->

**BACnet** (ASHRAE 135 / ISO 16484-5) is the international standard for building automation. Unlike Modbus, BACnet defines not only the transmission but also the **semantics** of the data: objects, properties, services — a complete information model.

## Variants / Data Link Layers

| Variant             | Transport          | Typical application                    |
| ------------------- | ------------------ | -------------------------------------- |
| **BACnet/IP**       | UDP port 47808     | BMS, DDC networking, Ethernet backbone |
| **BACnet MS/TP**    | RS-485 (token bus) | Field level, low-cost DDC              |
| BACnet/SC           | WebSocket over TLS | Cloud, secure WAN connections (new)    |
| BACnet Ethernet     | Ethernet (raw)     | Legacy, rare                           |
| BACnet ARCNET       | ARCNET             | Obsolete                               |
| BACnet over LonTalk | LON medium         | rare, for transitions from LON systems |

**BACnet/IP** and **MS/TP** are the relevant variants in practice.

## The Object Model

BACnet represents all measured and control variables as **objects**. Each device (**Device**) contains a list of objects.

### Important Object Types

| Object type              | Abbrev. | Description                                  |
| ------------------------ | ------- | -------------------------------------------- |
| Analog Input             | AI      | Analogue measured value (temp., pressure, …) |
| Analog Output            | AO      | Analogue control value (valve, VSD, …)       |
| Analog Value             | AV      | Internal calculated value / setpoint         |
| Binary Input             | BI      | Binary state (fault, run feedback)           |
| Binary Output            | BO      | Binary command (on/off)                      |
| Binary Value             | BV      | Internal binary value / enable               |
| Multi-State Input/Output | MSI/MSO | Multi-level states (operating modes)         |
| Schedule                 | SCH     | Time schedule                                |
| Calendar                 | CAL     | Holiday list for Schedule                    |
| Trend Log                | TL      | Recording of value histories                 |
| Notification Class       | NC      | Alarm routing                                |
| Loop                     | LP      | PID control loop                             |
| Program                  | PRG     | Application program                          |

### Important Properties

Each object has properties. The most important ones; which are mandatory depends on the object type:

| Property            | Meaning                                                |
| ------------------- | ------------------------------------------------------ |
| `Object_Identifier` | Object type + instance number (e.g. AI:3)              |
| `Object_Name`       | Human-readable name (e.g. "Outdoor temperature")       |
| `Object_Type`       | Type of the object                                     |
| `Present_Value`     | **Current value** — the most important                 |
| `Status_Flags`      | In-Alarm, Fault, Overridden, Out-of-Service            |
| `Units`             | Engineering unit (degreesCelsius, pascals, percent, …) |
| `Description`       | Free-text description                                  |

For AO/BO additionally:

| Property             | Meaning                                     |
| -------------------- | ------------------------------------------- |
| `Priority_Array`     | 16 priority levels (1 = highest)            |
| `Relinquish_Default` | Value when all priority levels are released |

> ⚠️ **Priority Array:** BACnet allows multiple sources to write to one output simultaneously. Priority 8 = BMS manual override, Priority 16 = normal operation. Always use the correct priority!

## BACnet Services (Communication)

### Device Discovery (Who-Is / I-Am)

- The client sends **Who-Is** as a broadcast, optionally for a range of device instances.
- Every matching device replies with **I-Am**: device instance, max APDU length, segmentation, vendor ID.

This locates the **BACnet Device Object**. All further objects can then be listed (`Read-Property`: `Object_List`).

### Data Access

| Service                | Description                                |
| ---------------------- | ------------------------------------------ |
| `ReadProperty`         | Read a single property value               |
| `WriteProperty`        | Write a property (e.g. Present_Value)      |
| `ReadPropertyMultiple` | Read multiple properties in one request    |
| `SubscribeCOV`         | **Change of Value** — push on value change |

**COV (Change of Value)** is critical for efficient BMS integration — instead of cyclic polling, the device reports changes autonomously.

## BACnet/IP — Network Details

- UDP port **47808** (0xBAC0)
- Every BACnet device has a **Device Instance** (0–4,194,302, must be unique on the network!)
- **BBMD (BACnet Broadcast Management Device):** Forwards broadcasts across routers — required when BACnet devices are on different subnets

### Typical Network Scenario

| Subnet            | Devices                                                        |
| ----------------- | -------------------------------------------------------------- |
| A, 192.168.1.0/24 | DDC 1 (device 100), DDC 2 (device 200), BBMD A, BMS (device 1) |
| B, 192.168.2.0/24 | DDC 3 (device 300), DDC 4 (device 400), BBMD B                 |

**BBMD A and BBMD B** know each other through their **broadcast distribution table** (BDT) and forward broadcasts such as Who-Is to each other. A single device without its own BBMD, such as a service laptop in a third network, registers with a BBMD via **foreign device registration**.

Without BBMD: broadcasts (Who-Is) do not reach the other subnet.

## BACnet MS/TP — Field Level

- RS-485, baud rate typically **76800** or **38400** baud
- **Token-bus method:** master passes token, slave responds to requests
- MAC addresses **0–127 for masters**, 128–254 for slaves. Per segment without repeater at most 32 unit loads per RS-485, more with quarter-load transceivers
- **MAC address** ≠ device instance

> ⚠️ **Important:** MS/TP addresses and Device Instance are independent. A device with MAC 5 can have Device Instance 2005.

### MS/TP Topology

- Line (daisy-chain), no star topology
- Termination: 120 Ω at both ends
- Max. cable length: 1200 m per segment with suitable cable; at high baud rates follow manufacturer data

## Alarms and Trending

### Alarming (Intrinsic / Algorithmic)

- **Intrinsic Reporting:** within the object itself (high limit, low limit, deadband)
- **Notification Class** determines who receives the alarm (recipient list)
- Alarm types: `TO-OFFNORMAL`, `TO-NORMAL`, `TO-FAULT`

### Trend Log

- Records `Present_Value` over time
- Triggered: cyclically or on COV
- Read via `ReadRange` service

## Diagnostic Tools

- **YABE (Yet Another BACnet Explorer)** — free, Windows, indispensable
- **BACnet Discovery Tool** (Loytec, Siemens, …) — manufacturer-specific
- **Wireshark** with BACnet dissector — low-level analysis
- **BACnet scan** integrated in most BMS systems

## Typical Errors

| Problem                             | Cause / action                                     |
| ----------------------------------- | -------------------------------------------------- |
| Device not found (Who-Is)           | Different subnet? BBMD missing or misconfigured    |
| Device Instance duplicate           | Two devices with same ID — rename one              |
| COV subscriptions expire            | Client must re-subscribe (observe lifetime)        |
| Write access fails                  | Priority too low? Object Out-of-Service?           |
| MS/TP: devices respond sporadically | Termination? Cable too long? Max-Master too small? |

## Standards

- **ASHRAE 135** — the BACnet bible (paid)
- **ISO 16484-5** — international version
- **BACnet Testing Laboratories (BTL)** — conformance testing, interoperability list
- **Further reading:** O. Steiger, _Gebäudeautomation – effizient vernetzen_ (in German), Faktor Verlag, Zurich 2026, chapter 10 "Bussysteme"
