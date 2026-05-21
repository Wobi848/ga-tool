---
title: MQTT — Messaging für IoT und GA
title_en: MQTT — Messaging for IoT and BA
slug: mqtt
category: protokolle
subcategory: iot
tags:
  [
    mqtt,
    broker,
    publisher,
    subscriber,
    topic,
    qos,
    retain,
    last-will,
    mosquitto,
    hivemq,
    node-red,
    home-assistant,
    sparkplug,
    tls,
    iiot,
    cloud
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [bacnet, opc-ua, modbus]
norm: [ISO/IEC 20922, OASIS MQTT 5.0]
updated: 2026-05-14
lang: de
---

# MQTT — Messaging für IoT und GA

**MQTT** (Message Queuing Telemetry Transport, ISO/IEC 20922) ist ein leichtgewichtiges Publish-Subscribe-Protokoll ursprünglich für Satelliten-Telemetrie entwickelt. Heute ist es der de-facto-Standard für IoT-Kommunikation und findet zunehmend in der GA Verwendung — als Brücke zwischen Feld und Cloud, für Node-RED-Automationen und als Alternative zu klassischen GLT-Protokollen.

## Publish-Subscribe Prinzip

Im Gegensatz zu Modbus oder BACnet (Client-Server) funktioniert MQTT nach dem **Pub/Sub-Muster**:

```
Sensor/DDC            MQTT-Broker           GLT/Dashboard
(Publisher)              (Server)           (Subscriber)
    │                      │                      │
    ├── Publish ──────────►│                      │
    │   Topic: "Anlage1/   │──── Push ───────────►│
    │   VL/Temperatur"     │  (wenn subscribed)   │
    │   Value: 45.3        │                      │
```

- **Publisher:** sendet Nachrichten zu einem Topic
- **Broker:** empfängt, speichert und verteilt Nachrichten
- **Subscriber:** meldet Interest an Topics an, empfängt Push-Nachrichten

**Entkopplung:** Publisher und Subscriber müssen sich nicht kennen. Neue Clients können sich jederzeit anmelden. Der Broker ist die zentrale Vermittlungsstelle.

## Topics

Topics sind **hierarchisch strukturierte Strings** mit `/` als Trennzeichen:

```
ga-tool/anlage1/heizung/vorlauf/temperatur
ga-tool/anlage1/heizung/vorlauf/sollwert
ga-tool/anlage1/heizung/pumpe1/status
ga-tool/anlage1/lüftung/zuluft/volumenstrom
ga-tool/anlage2/kälte/chiller1/eer
```

### Wildcards

| Wildcard | Beschreibung                        | Beispiel                               |
| -------- | ----------------------------------- | -------------------------------------- |
| `+`      | Einzelne Ebene                      | `ga-tool/+/heizung/vorlauf/temperatur` |
| `#`      | Alle Ebenen ab hier (immer am Ende) | `ga-tool/anlage1/#`                    |

`ga-tool/#` subscribed alles unter diesem Präfix.

## QoS — Quality of Service

| Level | Name          | Garantie                                    | Einsatz                             |
| ----- | ------------- | ------------------------------------------- | ----------------------------------- |
| **0** | At most once  | Keine — Feuer und vergiss                   | Telemetrie, häufige Updates         |
| **1** | At least once | Mindestens 1x geliefert (Duplikate möglich) | Alarmmeldungen, Befehle             |
| **2** | Exactly once  | Genau 1x (mit Handshake)                    | Abrechnungsdaten, kritische Befehle |

> Für GA-Alarme und Steuerbefehle mindestens **QoS 1** verwenden. QoS 0 kann bei Verbindungsproblemen einfach verloren gehen.

## Retained Messages

Ein Publisher kann eine Nachricht als `retained` markieren. Der Broker speichert die letzte Retained Message pro Topic:

```
Publisher: Temperatur 23.5 °C (retained=true)
→ Neuer Subscriber verbindet sich 10 min später
→ Broker sendet sofort: 23.5 °C (auch ohne neues Update)
```

**Wichtig für:** Sollwerte, Konfiguration, Status-Bits — damit neue Clients sofort den aktuellen Zustand kennen.

## Last Will and Testament (LWT)

Wenn ein Client **unerwarteterweise** die Verbindung verliert, sendet der Broker automatisch eine vorkonfigurierte Nachricht:

```
Client konfiguriert LWT:
  Topic: "ga-tool/anlage1/verbindung/status"
  Payload: "offline"

Wenn Client normal trennt: sendet selbst "online: false"
Wenn Verbindung unterbrochen: Broker sendet LWT "offline" automatisch
```

Für **Verbindungsüberwachung** unverzichtbar.

## Broker

Der Broker ist das Herzstück. Populäre Implementierungen:

| Broker                           | Beschreibung                                    | Einsatz                      |
| -------------------------------- | ----------------------------------------------- | ---------------------------- |
| **Mosquitto**                    | Open Source, leichtgewichtig, de-facto-Standard | Raspberry Pi, eigener Server |
| **EMQX**                         | Enterprise, hohe Skalierbarkeit, Web-UI         | Grössere Anlagen             |
| **HiveMQ**                       | Enterprise, Cluster-fähig, Java                 | Cloud, Enterprise            |
| **VerneMQ**                      | Hochverfügbar, Erlang-basiert                   | Cloud                        |
| **AWS IoT Core / Azure IoT Hub** | Cloud-Broker mit MQTT-API                       | Cloud-Anbindung              |

**Mosquitto auf Raspberry Pi / Linux:** Standard für GA-Projekte. Installation: `apt install mosquitto mosquitto-clients`

## Sicherheit

MQTT ist standardmässig **unverschlüsselt und ohne Authentifizierung**. Für Produktivbetrieb:

- **TLS (Port 8883):** Verschlüsselung der Verbindung
- **Username/Password:** Basis-Authentifizierung
- **Client-Zertifikate (mTLS):** starke gegenseitige Authentifizierung
- **ACL (Access Control List):** welcher Client darf welche Topics lesen/schreiben
- **VPN:** alternativ Broker im privaten Netz, Zugriff nur via VPN

```
# Mosquitto Konfiguration (mosquitto.conf)
listener 8883
cafile /etc/mosquitto/ca.crt
certfile /etc/mosquitto/server.crt
keyfile /etc/mosquitto/server.key
require_certificate true
allow_anonymous false
password_file /etc/mosquitto/passwords
```

## MQTT in der GA — Typische Einsatzszenarien

### Node-RED als MQTT-Brücke

**Node-RED** (Open Source, von IBM, läuft auf Node.js) ist das meistverwendete Tool um MQTT mit GA-Protokollen zu verbinden:

```
Modbus-Gerät → Node-RED → MQTT-Broker → Dashboard / Cloud
BACnet-DDC   → Node-RED → MQTT-Broker → Datenbank (InfluxDB)
KNX-Bus      → Node-RED → MQTT-Broker → Home Assistant
```

Node-RED bietet graphisches Flowprogramming — ideal für GA-Integrationen ohne Programmierkenntnisse.

### Sparkplug B

**Sparkplug B** (Eclipse Foundation) ist eine standardisierte Nutzlast-Spezifikation auf MQTT:

- Definiertes Topic-Schema (`spBv1.0/...`)
- Protobuf-Payload (effizient, typisiert)
- Birth/Death Messages (ähnlich LWT)
- Zunehmend in Industrie 4.0 und GA eingesetzt

### Typisches MQTT-Topic-Schema für GA

```
{kunde}/{standort}/{anlage}/{system}/{gerät}/{datenpunkt}
acme/hauptgebäude/heizung/kreis1/pumpe1/status
acme/hauptgebäude/heizung/kreis1/vorlauf/temperatur-ist
acme/hauptgebäude/heizung/kreis1/vorlauf/temperatur-soll
acme/hauptgebäude/lüftung/rlt1/zuluft/volumenstrom
acme/hauptgebäude/lüftung/rlt1/filter/differenzdruck
```

## MQTT 5.0 vs. 3.1.1

MQTT 5.0 (2019) bringt wichtige Verbesserungen:

| Feature                  | 3.1.1      | 5.0                      |
| ------------------------ | ---------- | ------------------------ |
| Reason Codes             | Minimal    | Detailliert              |
| Request/Response Pattern | ❌         | ✅ (ReplyTo-Topic)       |
| Message Expiry           | ❌         | ✅ (TTL)                 |
| Shared Subscriptions     | Proprietär | ✅ Standard              |
| Topic Aliases            | ❌         | ✅ (Bandbreite sparen)   |
| User Properties          | ❌         | ✅ (Key-Value Metadaten) |

Für neue Projekte **MQTT 5.0 empfohlen** wenn Broker und Clients unterstützen.

## Vergleich MQTT vs. BACnet COV

| Merkmal           | MQTT                     | BACnet COV                         |
| ----------------- | ------------------------ | ---------------------------------- |
| Standardisierung  | ISO/IEC 20922            | ASHRAE 135 / ISO 16484-5           |
| Datenmodell       | Freie Topics/Payloads    | Standardisierte Objekte/Properties |
| Semantik          | Keine (nur Bytes/String) | Typisiert (AI, AO, BI, BO, …)      |
| Interoperabilität | Hersteller-spezifisch    | BTL-zertifiziert                   |
| Verbreitung GA    | Wachsend                 | Etabliert                          |
| IoT/Cloud         | ✅ Nativ                 | ❌ Gateway nötig                   |

**Faustregel:** BACnet für GLT-zu-GLT/DDC, MQTT für Cloud/IoT/Datenpipelines.

## Werkzeuge

| Tool                   | Beschreibung                              |
| ---------------------- | ----------------------------------------- |
| **MQTT Explorer**      | Desktop-Client, Baum-Ansicht aller Topics |
| **MQTTX**              | Cross-platform Client, gut für Tests      |
| **mosquitto_pub/sub**  | CLI-Tools, ideal für Scripting            |
| **Node-RED**           | Flow-basierte Integration                 |
| **Grafana + InfluxDB** | Dashboard + Zeitreihen-Datenbank via MQTT |

## Normen

- **ISO/IEC 20922** — MQTT v3.1.1
- **OASIS MQTT 5.0** — Standard
- **Sparkplug B** — Eclipse Foundation (GitHub: eclipse/tahu)

<!-- EN -->

# MQTT — Messaging for IoT and BA

**MQTT** (Message Queuing Telemetry Transport, ISO/IEC 20922) is a lightweight publish-subscribe protocol originally developed for satellite telemetry. Today it is the de-facto standard for IoT communication and is increasingly used in BA — as a bridge between field and cloud, for Node-RED automations and as an alternative to classic BMS protocols.

## Publish-Subscribe Principle

Unlike Modbus or BACnet (client-server), MQTT uses the **pub/sub pattern**:

```
Sensor/DDC            MQTT Broker           BMS/Dashboard
(Publisher)            (Server)             (Subscriber)
    │                      │                      │
    ├── Publish ──────────►│                      │
    │   Topic: "Plant1/    │──── Push ───────────►│
    │   FL/Temperature"    │  (when subscribed)   │
    │   Value: 45.3        │                      │
```

- **Publisher:** sends messages to a topic
- **Broker:** receives, stores and distributes messages
- **Subscriber:** registers interest in topics, receives push messages

**Decoupling:** Publishers and subscribers do not need to know each other. New clients can connect at any time. The broker is the central exchange point.

## Topics

Topics are **hierarchically structured strings** with `/` as separator:

```
ba-tool/plant1/heating/flow/temperature
ba-tool/plant1/heating/flow/setpoint
ba-tool/plant1/heating/pump1/status
ba-tool/plant1/ventilation/supply/volumeflow
ba-tool/plant2/cooling/chiller1/eer
```

### Wildcards

| Wildcard | Description                          | Example                              |
| -------- | ------------------------------------ | ------------------------------------ |
| `+`      | Single level                         | `ba-tool/+/heating/flow/temperature` |
| `#`      | All levels from here (always at end) | `ba-tool/plant1/#`                   |

`ba-tool/#` subscribes to everything under this prefix.

## QoS — Quality of Service

| Level | Name          | Guarantee                                     | Use case                        |
| ----- | ------------- | --------------------------------------------- | ------------------------------- |
| **0** | At most once  | None — fire and forget                        | Telemetry, frequent updates     |
| **1** | At least once | Delivered at least once (duplicates possible) | Alarm messages, commands        |
| **2** | Exactly once  | Exactly once (with handshake)                 | Billing data, critical commands |

> For BA alarms and control commands, use at least **QoS 1**. QoS 0 can simply be lost during connection problems.

## Retained Messages

A publisher can mark a message as `retained`. The broker stores the last retained message per topic:

```
Publisher: Temperature 23.5 °C (retained=true)
→ New subscriber connects 10 min later
→ Broker immediately sends: 23.5 °C (even without a new update)
```

**Important for:** setpoints, configuration, status bits — so new clients immediately know the current state.

## Last Will and Testament (LWT)

If a client **unexpectedly** loses its connection, the broker automatically sends a pre-configured message:

```
Client configures LWT:
  Topic: "ba-tool/plant1/connection/status"
  Payload: "offline"

When client disconnects normally: sends "online: false" itself
When connection is interrupted: broker sends LWT "offline" automatically
```

Essential for **connection monitoring**.

## Brokers

The broker is the centrepiece. Popular implementations:

| Broker                           | Description                                 | Use case                 |
| -------------------------------- | ------------------------------------------- | ------------------------ |
| **Mosquitto**                    | Open source, lightweight, de-facto standard | Raspberry Pi, own server |
| **EMQX**                         | Enterprise, high scalability, web UI        | Larger installations     |
| **HiveMQ**                       | Enterprise, cluster-capable, Java           | Cloud, enterprise        |
| **VerneMQ**                      | High availability, Erlang-based             | Cloud                    |
| **AWS IoT Core / Azure IoT Hub** | Cloud broker with MQTT API                  | Cloud integration        |

**Mosquitto on Raspberry Pi / Linux:** Standard for BA projects. Install: `apt install mosquitto mosquitto-clients`

## Security

MQTT is by default **unencrypted and without authentication**. For production:

- **TLS (port 8883):** encrypt the connection
- **Username/password:** basic authentication
- **Client certificates (mTLS):** strong mutual authentication
- **ACL (Access Control List):** which client may read/write which topics
- **VPN:** alternatively broker on private network, access only via VPN

```
# Mosquitto configuration (mosquitto.conf)
listener 8883
cafile /etc/mosquitto/ca.crt
certfile /etc/mosquitto/server.crt
keyfile /etc/mosquitto/server.key
require_certificate true
allow_anonymous false
password_file /etc/mosquitto/passwords
```

## MQTT in BA — Typical Use Cases

### Node-RED as MQTT Bridge

**Node-RED** (open source, from IBM, runs on Node.js) is the most widely used tool for connecting MQTT with BA protocols:

```
Modbus device → Node-RED → MQTT broker → Dashboard / cloud
BACnet DDC    → Node-RED → MQTT broker → Database (InfluxDB)
KNX bus       → Node-RED → MQTT broker → Home Assistant
```

Node-RED provides graphical flow programming — ideal for BA integrations without programming knowledge.

### Sparkplug B

**Sparkplug B** (Eclipse Foundation) is a standardised payload specification on top of MQTT:

- Defined topic schema (`spBv1.0/...`)
- Protobuf payload (efficient, typed)
- Birth/death messages (similar to LWT)
- Increasingly used in Industry 4.0 and BA

### Typical MQTT Topic Schema for BA

```
{client}/{site}/{plant}/{system}/{device}/{datapoint}
acme/main-building/heating/circuit1/pump1/status
acme/main-building/heating/circuit1/flow/temperature-actual
acme/main-building/heating/circuit1/flow/temperature-setpoint
acme/main-building/ventilation/ahu1/supply/volumeflow
acme/main-building/ventilation/ahu1/filter/differentialpressure
```

## MQTT 5.0 vs. 3.1.1

MQTT 5.0 (2019) brings important improvements:

| Feature                  | 3.1.1       | 5.0                     |
| ------------------------ | ----------- | ----------------------- |
| Reason codes             | Minimal     | Detailed                |
| Request/response pattern | ❌          | ✅ (ReplyTo topic)      |
| Message expiry           | ❌          | ✅ (TTL)                |
| Shared subscriptions     | Proprietary | ✅ Standard             |
| Topic aliases            | ❌          | ✅ (save bandwidth)     |
| User properties          | ❌          | ✅ (key-value metadata) |

**MQTT 5.0 recommended** for new projects when broker and clients support it.

## Comparison MQTT vs. BACnet COV

| Feature          | MQTT                     | BACnet COV                      |
| ---------------- | ------------------------ | ------------------------------- |
| Standardisation  | ISO/IEC 20922            | ASHRAE 135 / ISO 16484-5        |
| Data model       | Free topics/payloads     | Standardised objects/properties |
| Semantics        | None (bytes/string only) | Typed (AI, AO, BI, BO, …)       |
| Interoperability | Manufacturer-specific    | BTL-certified                   |
| BA adoption      | Growing                  | Established                     |
| IoT/cloud        | ✅ Native                | ❌ Gateway required             |

**Rule of thumb:** BACnet for BMS-to-BMS/DDC, MQTT for cloud/IoT/data pipelines.

## Tools

| Tool                   | Description                               |
| ---------------------- | ----------------------------------------- |
| **MQTT Explorer**      | Desktop client, tree view of all topics   |
| **MQTTX**              | Cross-platform client, great for testing  |
| **mosquitto_pub/sub**  | CLI tools, ideal for scripting            |
| **Node-RED**           | Flow-based integration                    |
| **Grafana + InfluxDB** | Dashboard + time-series database via MQTT |

## Standards

- **ISO/IEC 20922** — MQTT v3.1.1
- **OASIS MQTT 5.0** — Standard
- **Sparkplug B** — Eclipse Foundation (GitHub: eclipse/tahu)
