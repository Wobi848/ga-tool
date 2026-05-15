---
title: MQTT — Messaging für IoT und GA
slug: mqtt
category: protokolle
subcategory: iot
tags: [mqtt, broker, publisher, subscriber, topic, qos, retain, last-will, mosquitto, hivemq, node-red, home-assistant, sparkplug, tls, iiot, cloud]
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

| Wildcard | Beschreibung                                            | Beispiel                              |
|----------|---------------------------------------------------------|---------------------------------------|
| `+`      | Einzelne Ebene                                          | `ga-tool/+/heizung/vorlauf/temperatur` |
| `#`      | Alle Ebenen ab hier (immer am Ende)                     | `ga-tool/anlage1/#`                   |

`ga-tool/#` subscribed alles unter diesem Präfix.

## QoS — Quality of Service

| Level | Name               | Garantie                              | Einsatz                         |
|-------|--------------------|---------------------------------------|---------------------------------|
| **0** | At most once       | Keine — Feuer und vergiss             | Telemetrie, häufige Updates     |
| **1** | At least once      | Mindestens 1x geliefert (Duplikate möglich) | Alarmmeldungen, Befehle   |
| **2** | Exactly once       | Genau 1x (mit Handshake)             | Abrechnungsdaten, kritische Befehle |

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

| Broker          | Beschreibung                                          | Einsatz                    |
|-----------------|-------------------------------------------------------|----------------------------|
| **Mosquitto**   | Open Source, leichtgewichtig, de-facto-Standard       | Raspberry Pi, eigener Server |
| **EMQX**        | Enterprise, hohe Skalierbarkeit, Web-UI               | Grössere Anlagen            |
| **HiveMQ**      | Enterprise, Cluster-fähig, Java                       | Cloud, Enterprise           |
| **VerneMQ**     | Hochverfügbar, Erlang-basiert                         | Cloud                       |
| **AWS IoT Core / Azure IoT Hub** | Cloud-Broker mit MQTT-API            | Cloud-Anbindung             |

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

| Feature                   | 3.1.1 | 5.0 |
|---------------------------|-------|-----|
| Reason Codes              | Minimal | Detailliert |
| Request/Response Pattern  | ❌     | ✅ (ReplyTo-Topic) |
| Message Expiry            | ❌     | ✅ (TTL) |
| Shared Subscriptions      | Proprietär | ✅ Standard |
| Topic Aliases             | ❌     | ✅ (Bandbreite sparen) |
| User Properties           | ❌     | ✅ (Key-Value Metadaten) |

Für neue Projekte **MQTT 5.0 empfohlen** wenn Broker und Clients unterstützen.

## Vergleich MQTT vs. BACnet COV

| Merkmal              | MQTT                         | BACnet COV                      |
|----------------------|------------------------------|---------------------------------|
| Standardisierung     | ISO/IEC 20922                | ASHRAE 135 / ISO 16484-5        |
| Datenmodell          | Freie Topics/Payloads        | Standardisierte Objekte/Properties |
| Semantik             | Keine (nur Bytes/String)     | Typisiert (AI, AO, BI, BO, …)  |
| Interoperabilität    | Hersteller-spezifisch        | BTL-zertifiziert                |
| Verbreitung GA       | Wachsend                     | Etabliert                       |
| IoT/Cloud            | ✅ Nativ                     | ❌ Gateway nötig               |

**Faustregel:** BACnet für GLT-zu-GLT/DDC, MQTT für Cloud/IoT/Datenpipelines.

## Werkzeuge

| Tool            | Beschreibung                                        |
|-----------------|-----------------------------------------------------|
| **MQTT Explorer** | Desktop-Client, Baum-Ansicht aller Topics         |
| **MQTTX**        | Cross-platform Client, gut für Tests              |
| **mosquitto_pub/sub** | CLI-Tools, ideal für Scripting              |
| **Node-RED**     | Flow-basierte Integration                          |
| **Grafana + InfluxDB** | Dashboard + Zeitreihen-Datenbank via MQTT   |

## Normen

- **ISO/IEC 20922** — MQTT v3.1.1
- **OASIS MQTT 5.0** — Standard
- **Sparkplug B** — Eclipse Foundation (GitHub: eclipse/tahu)
