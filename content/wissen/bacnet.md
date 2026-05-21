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
updated: 2026-05-14
lang: de
---

# BACnet — Building Automation and Control Networks

**BACnet** (ASHRAE 135 / ISO 16484-5) ist der internationale Standard für die Gebäudeautomation. Anders als Modbus definiert BACnet nicht nur die Übertragung, sondern auch die **Semantik** der Daten: Objekte, Properties, Services — ein vollständiges Informationsmodell.

## Varianten / Datalinkschichten

| Variante         | Transport          | Typischer Einsatz                      |
| ---------------- | ------------------ | -------------------------------------- |
| **BACnet/IP**    | UDP Port 47808     | GLT, DDC-Vernetzung, Ethernet-Backbone |
| **BACnet MS/TP** | RS-485 (Token-Bus) | Feldebene, kostengünstige DDC          |
| BACnet/SC        | WebSocket über TLS | Cloud, sichere WAN-Verbindungen (neu)  |
| BACnet Ethernet  | Ethernet (raw)     | Legacy, selten                         |
| BACnet ARCNET    | ARCNET             | Veraltet                               |

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

Jedes Objekt hat Properties. Die Pflichtproperties jedes Objekts:

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

```
Client sendet:  Who-Is (Broadcast, ggf. Instanzbereich)
Gerät antwortet: I-Am (Device-ID, Max-APDU, Segmentation, Vendor-ID)
```

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

```
Subnetz A (192.168.1.0/24)          Subnetz B (192.168.2.0/24)
  DDC 1 (Device 100)                   DDC 3 (Device 300)
  DDC 2 (Device 200)                   DDC 4 (Device 400)
  BBMD A ←──────────────────────────→  BBMD B
                 (Foreign Device Registration)
  GLT (Device 1) ←── direkte Verbindung zu BBMD A
```

Ohne BBMD: Broadcasts (Who-Is) kommen nicht ins andere Subnetz.

## BACnet MS/TP — Feldebene

- RS-485, Baudrate typisch **76800** oder **38400** baud
- **Token-Bus-Verfahren:** Master gibt Token weiter, Slave antwortet auf Anfragen
- Max. **128 Adressen** (0–127), davon 0–127 Master, empfohlen max. 32 Geräte
- **MAC-Adresse** (0–127) ≠ Device Instance

> ⚠️ **Wichtig:** MS/TP-Adressen und Device Instance sind unabhängig. Ein Gerät mit MAC 5 kann Device Instance 2005 haben.

### MS/TP-Topologie

- Linie (daisy-chain), keine Sterne
- Terminierung: 120 Ω an beiden Enden
- Max. Kabellänge: ~1200 m bei 9600 baud / ~300 m bei 76800 baud

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

<!-- EN -->

**BACnet** (ASHRAE 135 / ISO 16484-5) is the international standard for building automation. Unlike Modbus, BACnet defines not only the transmission but also the **semantics** of the data: objects, properties, services — a complete information model.

## Variants / Data Link Layers

| Variant          | Transport          | Typical application                    |
| ---------------- | ------------------ | -------------------------------------- |
| **BACnet/IP**    | UDP port 47808     | BMS, DDC networking, Ethernet backbone |
| **BACnet MS/TP** | RS-485 (token bus) | Field level, low-cost DDC              |
| BACnet/SC        | WebSocket over TLS | Cloud, secure WAN connections (new)    |
| BACnet Ethernet  | Ethernet (raw)     | Legacy, rare                           |
| BACnet ARCNET    | ARCNET             | Obsolete                               |

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

Each object has properties. The mandatory properties of every object:

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

```
Client sends:  Who-Is (broadcast, optionally with instance range)
Device replies: I-Am (Device ID, Max-APDU, Segmentation, Vendor ID)
```

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

```
Subnet A (192.168.1.0/24)          Subnet B (192.168.2.0/24)
  DDC 1 (Device 100)                   DDC 3 (Device 300)
  DDC 2 (Device 200)                   DDC 4 (Device 400)
  BBMD A ←──────────────────────────→  BBMD B
                 (Foreign Device Registration)
  BMS (Device 1) ←── direct connection to BBMD A
```

Without BBMD: broadcasts (Who-Is) do not reach the other subnet.

## BACnet MS/TP — Field Level

- RS-485, baud rate typically **76800** or **38400** baud
- **Token-bus method:** master passes token, slave responds to requests
- Max. **128 addresses** (0–127), of which 0–127 masters; max. 32 devices recommended
- **MAC address** (0–127) ≠ Device Instance

> ⚠️ **Important:** MS/TP addresses and Device Instance are independent. A device with MAC 5 can have Device Instance 2005.

### MS/TP Topology

- Line (daisy-chain), no star topology
- Termination: 120 Ω at both ends
- Max. cable length: ~1200 m at 9600 baud / ~300 m at 76800 baud

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
