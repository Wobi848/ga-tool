---
title: OPC UA — Unified Architecture
title_en: OPC UA — Unified Architecture
slug: opc-ua
category: protokolle
subcategory: industrie
tags: [opc-ua, opc, unified-architecture, information-model, nodeid, namespace, subscription, monitored-item, security, certificate, pubsub, tsn, industrie-4-0, iiot]
difficulty: experte
area: [ga, it]
related: [bacnet, modbus, knx]
norm: [IEC 62541, OPC 10000]
updated: 2026-05-14
lang: de
---

# OPC UA — Unified Architecture

**OPC UA** (IEC 62541) ist der plattformunabhängige Kommunikationsstandard für industrielle Automatisierung und Gebäudetechnik. Es verbindet Feldgeräte, SPS, SCADA, MES und ERP — von der Sensorebene bis zur Cloud.

## OPC UA vs. klassisches OPC (DA/HDA)

| Merkmal              | OPC Classic (DA/HDA)  | OPC UA                        |
|----------------------|-----------------------|-------------------------------|
| Betriebssystem       | Windows only (COM/DCOM) | Plattformunabhängig          |
| Sicherheit           | Windows-Authentifizierung | TLS, Zertifikate, Rollen    |
| Topologie            | Client-Server         | Client-Server + Pub/Sub       |
| Transport            | DCOM                  | TCP, HTTPS, WebSocket, MQTT   |
| Datenmodell          | Flat Tags             | Objektorientiertes Infomodell |
| Standardisierung     | OPC Foundation        | IEC 62541 (international)     |

## Architektur & Konzepte

### Information Model (Adressraum)

Das Herzstück von OPC UA ist der **Adressraum** — ein objektorientiertes, hierarchisches Datenmodell:

```
Root
  └── Objects
        ├── Server (Serverinformationen)
        ├── Anlage_1
        │     ├── Vorlauftemperatur (Variable, Float, °C)
        │     ├── Pumpe_1
        │     │     ├── Drehzahl (Variable, Float, %)
        │     │     └── Status (Variable, Boolean)
        │     └── Alarme
        └── Anlage_2
```

### Node ID

Jeder Knoten im Adressraum hat eine eindeutige **Node ID**:

| Format          | Beispiel                    | Beschreibung                |
|-----------------|-----------------------------|-----------------------------|
| Numerisch       | `ns=2;i=1003`               | Namespace 2, Integer 1003   |
| String          | `ns=2;s=Vorlauftemperatur`  | Namespace 2, String-Key     |
| GUID            | `ns=2;g=550e8400-...`       | UUID                        |

- `ns=0`: OPC UA Standard-Namespace (Server, Typen, …)
- `ns=1+`: anwendungsspezifisch (Gerätehersteller, GLT-Anbieter)

### Attribute

Jeder Node hat Attribute:

| Attribut        | Beschreibung                          |
|-----------------|---------------------------------------|
| `NodeId`        | Eindeutige ID                         |
| `BrowseName`    | Menschenlesbarer Name                 |
| `DisplayName`   | Lokalisierter Anzeigename             |
| `Value`         | **Aktueller Wert** (nur Variables)    |
| `DataType`      | Boolean, Int32, Float, String, …      |
| `AccessLevel`   | Read, Write, HistoryRead, …           |
| `StatusCode`    | Good, Bad, Uncertain + Substatus      |

## Services (Kommunikation)

OPC UA Services sind Request/Response-Paare:

### Datenzugriff

| Service            | Beschreibung                                        |
|--------------------|-----------------------------------------------------|
| `Read`             | Einzelne oder mehrere Attribute lesen               |
| `Write`            | Werte schreiben                                     |
| `Browse`           | Adressraum erkunden (Knoten auflisten)              |
| `TranslateBrowsePathsToNodeIds` | Pfad → NodeId auflösen              |

### Subscriptions & MonitoredItems

Das effizienteste Muster für GLT-Anbindungen:

```
Client erstellt Subscription (z.B. alle 500 ms)
  └── MonitoredItem: Vorlauftemperatur (Deadband 0,5 °C)
  └── MonitoredItem: Pumpe_Status
  └── MonitoredItem: Alarm_Liste

Server sendet Notifications bei Änderung oder im Takt
```

- **Publishing Interval:** wie oft der Server Notifications sendet
- **Sampling Interval:** wie oft der Server den Wert abtastet
- **Deadband:** minimale Änderung für Notification (spart Traffic)

### Events & Alarme

OPC UA hat ein vollständiges Alarm- und Ereignismodell:
- `ConditionType`, `AlarmConditionType`, `LimitAlarmType`
- Zustände: Active, Acknowledged, Confirmed
- Historische Events via `HistoryRead`

### Historical Access (HDA)

- `HistoryRead` für Zeitreihen-Daten
- Trend-Abfragen ohne externe Datenbank (wenn der Server HistoryRead unterstützt)

## Sicherheit

OPC UA hat Sicherheit als Kernbestandteil (nicht nachträglich hinzugefügt):

### Security Modes

| Mode                | Verschlüsselung | Signatur | Einsatz                 |
|---------------------|-----------------|----------|-------------------------|
| None                | Nein            | Nein     | Nur für Tests!          |
| Sign                | Nein            | Ja       | Integrität ohne Privacy |
| SignAndEncrypt      | **Ja**          | Ja       | **Produktion**          |

### Security Policies

| Policy                    | Algorithmus              |
|---------------------------|--------------------------|
| Basic256Sha256            | AES-256, SHA-256 (empfohlen) |
| Aes128_Sha256_RsaOaep     | AES-128 (moderner)       |
| Aes256_Sha256_RsaPss      | AES-256, PSS (neuester)  |

### Zertifikate

- Jeder OPC UA Client und Server hat ein **X.509-Zertifikat**
- Gegenseitige Authentifizierung (mTLS-ähnlich)
- Zertifikate müssen im Trust Store des Servers **explizit akzeptiert** werden

> ⚠️ **Häufiges Problem bei IBN:** Client verbindet sich, bekommt aber `BadCertificateUntrusted`. Lösung: Server-Trust-Store öffnen und Client-Zertifikat manuell bestätigen — oder `SecurityMode: None` temporär für Tests.

## Transporte

| Transport         | Port   | Beschreibung                               |
|-------------------|--------|--------------------------------------------|
| **OPC UA TCP**    | 4840   | Standard, binäres Protokoll, effizient     |
| **HTTPS**         | 443    | Für Firewall-Durchquerung, JSON/XML        |
| **WebSocket**     | variabel | Browser-Zugriff                          |

URL-Schema: `opc.tcp://192.168.1.100:4840/UA/Server`

## OPC UA Pub/Sub (neu)

Neuere Ergänzung zu Client-Server: **Publisher** sendet Daten an einen Broker (MQTT, AMQP) oder per UDP-Multicast, **Subscriber** empfängt.

```
OPC UA Publisher (Feld) → MQTT Broker → OPC UA Subscriber (GLT/Cloud)
```

Gut für: IoT-Integration, viele Geräte, unidirektionale Datenströme.

## OPC UA in der GA

OPC UA ersetzt zunehmend proprietäre Hersteller-Protokolle als **vertikale Integrationsschicht**:

```
Feldebene:   BACnet / Modbus / KNX / M-Bus
                    ↓
Automationsebene:  DDC mit OPC UA Server
                    ↓
GLT:          OPC UA Client (liest alle DDCs)
                    ↓
Cloud/ERP:    OPC UA Client oder Pub/Sub → MQTT
```

**Companion Specifications:** standardisierte Adressraummodelle für Gerätetypen:
- `OPC UA for Building Automation` (in Entwicklung)
- `OPC UA for HVAC` (Honeywell, Siemens aktiv beteiligt)
- `OPC UA for Energy` (Energiemanagement)

## Werkzeuge

| Tool                  | Beschreibung                                      |
|-----------------------|---------------------------------------------------|
| **UaExpert** (Unified Automation) | Kostenloser Browser/Client — Standard für IBN |
| **Prosys OPC UA Browser** | Kostenlos, Java-basiert                    |
| **node-opcua**        | Open-Source Node.js-Bibliothek                    |
| **open62541**         | Open-Source C-Bibliothek (Server + Client)        |
| **python-opcua / asyncua** | Python-Bibliothek                           |
| **Wireshark**         | OPC UA Dissector eingebaut                        |

## Typische IBN-Schritte

1. OPC UA Server-URL ermitteln (`opc.tcp://IP:4840/...`)
2. Mit UaExpert verbinden (erst `None` Security zum Testen)
3. Adressraum durchsuchen (Browse), relevante NodeIDs notieren
4. Security-Zertifikat akzeptieren, auf `SignAndEncrypt` umstellen
5. Subscriptions auf relevante Nodes anlegen (GLT-Treiber konfigurieren)
6. Verbindungs-Monitoring einrichten (Watchdog / KeepAlive)

## Normen

- **IEC 62541** (Teile 1–14) — vollständige OPC UA Spezifikation
- **OPC 10000-x** — OPC Foundation Spezifikationen
- **IEC 62443** — Industrial Cyber Security (OPC UA als Transportlayer)

<!-- EN -->

# OPC UA — Unified Architecture

**OPC UA** (IEC 62541) is the platform-independent communication standard for industrial automation and building technology. It connects field devices, PLCs, SCADA, MES and ERP — from sensor level to cloud.

## OPC UA vs. Classic OPC (DA/HDA)

| Feature | OPC Classic (DA/HDA) | OPC UA |
|---------|---------------------|--------|
| Operating system | Windows only (COM/DCOM) | Platform-independent |
| Security | Windows authentication | TLS, certificates, roles |
| Topology | Client-server | Client-server + pub/sub |
| Transport | DCOM | TCP, HTTPS, WebSocket, MQTT |
| Data model | Flat tags | Object-oriented info model |
| Standardisation | OPC Foundation | IEC 62541 (international) |

## Architecture & Concepts

### Information Model (Address Space)

The heart of OPC UA is the **address space** — an object-oriented, hierarchical data model:

```
Root
  └── Objects
        ├── Server (server information)
        ├── Plant_1
        │     ├── FlowTemperature (Variable, Float, °C)
        │     ├── Pump_1
        │     │     ├── Speed (Variable, Float, %)
        │     │     └── Status (Variable, Boolean)
        │     └── Alarms
        └── Plant_2
```

### Node ID

Every node in the address space has a unique **Node ID**:

| Format | Example | Description |
|--------|---------|-------------|
| Numeric | `ns=2;i=1003` | Namespace 2, integer 1003 |
| String | `ns=2;s=FlowTemperature` | Namespace 2, string key |
| GUID | `ns=2;g=550e8400-...` | UUID |

- `ns=0`: OPC UA standard namespace (server, types, …)
- `ns=1+`: application-specific (device manufacturer, BMS vendor)

### Attributes

Every node has attributes:

| Attribute | Description |
|-----------|-------------|
| `NodeId` | Unique ID |
| `BrowseName` | Human-readable name |
| `DisplayName` | Localised display name |
| `Value` | **Current value** (variables only) |
| `DataType` | Boolean, Int32, Float, String, … |
| `AccessLevel` | Read, Write, HistoryRead, … |
| `StatusCode` | Good, Bad, Uncertain + substatus |

## Services (Communication)

OPC UA services are request/response pairs:

### Data Access

| Service | Description |
|---------|-------------|
| `Read` | Read single or multiple attributes |
| `Write` | Write values |
| `Browse` | Explore address space (list nodes) |
| `TranslateBrowsePathsToNodeIds` | Resolve path → NodeId |

### Subscriptions & MonitoredItems

The most efficient pattern for BMS connections:

```
Client creates subscription (e.g. every 500 ms)
  └── MonitoredItem: FlowTemperature (deadband 0.5 °C)
  └── MonitoredItem: Pump_Status
  └── MonitoredItem: Alarm_List

Server sends notifications on change or at interval
```

- **Publishing interval:** how often the server sends notifications
- **Sampling interval:** how often the server samples the value
- **Deadband:** minimum change to trigger notification (saves traffic)

### Events & Alarms

OPC UA has a complete alarm and event model:
- `ConditionType`, `AlarmConditionType`, `LimitAlarmType`
- States: Active, Acknowledged, Confirmed
- Historical events via `HistoryRead`

### Historical Access (HDA)

- `HistoryRead` for time-series data
- Trend queries without an external database (when the server supports HistoryRead)

## Security

OPC UA has security as a core component (not added as an afterthought):

### Security Modes

| Mode | Encryption | Signature | Use case |
|------|-----------|-----------|---------|
| None | No | No | Testing only! |
| Sign | No | Yes | Integrity without privacy |
| SignAndEncrypt | **Yes** | Yes | **Production** |

### Security Policies

| Policy | Algorithm |
|--------|-----------|
| Basic256Sha256 | AES-256, SHA-256 (recommended) |
| Aes128_Sha256_RsaOaep | AES-128 (more modern) |
| Aes256_Sha256_RsaPss | AES-256, PSS (latest) |

### Certificates

- Every OPC UA client and server has an **X.509 certificate**
- Mutual authentication (similar to mTLS)
- Certificates must be **explicitly accepted** in the server's trust store

> ⚠️ **Common commissioning problem:** Client connects but receives `BadCertificateUntrusted`. Solution: open server trust store and manually accept client certificate — or use `SecurityMode: None` temporarily for testing.

## Transports

| Transport | Port | Description |
|-----------|------|-------------|
| **OPC UA TCP** | 4840 | Standard, binary protocol, efficient |
| **HTTPS** | 443 | For firewall traversal, JSON/XML |
| **WebSocket** | variable | Browser access |

URL scheme: `opc.tcp://192.168.1.100:4840/UA/Server`

## OPC UA Pub/Sub (New)

Newer addition to client-server: **Publisher** sends data to a broker (MQTT, AMQP) or via UDP multicast; **Subscriber** receives.

```
OPC UA Publisher (field) → MQTT Broker → OPC UA Subscriber (BMS/cloud)
```

Good for: IoT integration, many devices, unidirectional data streams.

## OPC UA in BA

OPC UA increasingly replaces proprietary manufacturer protocols as the **vertical integration layer**:

```
Field level:       BACnet / Modbus / KNX / M-Bus
                          ↓
Automation level:  DDC with OPC UA server
                          ↓
BMS:               OPC UA client (reads all DDCs)
                          ↓
Cloud/ERP:         OPC UA client or pub/sub → MQTT
```

**Companion specifications:** standardised address space models for device types:
- `OPC UA for Building Automation` (in development)
- `OPC UA for HVAC` (Honeywell, Siemens actively involved)
- `OPC UA for Energy` (energy management)

## Tools

| Tool | Description |
|------|-------------|
| **UaExpert** (Unified Automation) | Free browser/client — standard for commissioning |
| **Prosys OPC UA Browser** | Free, Java-based |
| **node-opcua** | Open-source Node.js library |
| **open62541** | Open-source C library (server + client) |
| **python-opcua / asyncua** | Python library |
| **Wireshark** | OPC UA dissector built in |

## Typical Commissioning Steps

1. Determine OPC UA server URL (`opc.tcp://IP:4840/...`)
2. Connect with UaExpert (use `None` security first for testing)
3. Browse address space, note relevant NodeIDs
4. Accept security certificate, switch to `SignAndEncrypt`
5. Create subscriptions for relevant nodes (configure BMS driver)
6. Set up connection monitoring (watchdog / keep-alive)

## Standards

- **IEC 62541** (parts 1–14) — complete OPC UA specification
- **OPC 10000-x** — OPC Foundation specifications
- **IEC 62443** — Industrial cybersecurity (OPC UA as transport layer)
