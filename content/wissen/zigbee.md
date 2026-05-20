---
title: Zigbee — Mesh-Funknetzwerk für GA
title_en: Zigbee — Mesh Radio Network for BA
slug: zigbee
category: protokolle
subcategory: funk
tags: [zigbee, zigbee2mqtt, mesh, coordinator, router, end-device, 2.4ghz, ieee802154, home-assistant, philips-hue, ikea-tradfri, matter, thread, pairing, channel]
difficulty: fortgeschritten
area: [ga, it]
related: [mqtt, enocean, knx, lora, matter-thread, zwave]
norm: [IEEE 802.15.4, Zigbee Alliance / CSA]
updated: 2026-05-14
lang: de
---

# Zigbee — Mesh-Funknetzwerk für GA

**Zigbee** ist ein Low-Power-Funknetzwerk-Standard auf Basis von IEEE 802.15.4. Anders als EnOcean (batterielos, unidirektional) ist Zigbee bidirektional, selbstheilend und netzwerkfähig. In der GA zunehmend für Sensoren, Aktoren und Lichtsteuerung eingesetzt.

## Netzwerktopologie

Zigbee verwendet ein **Mesh-Netzwerk** — Geräte können als Router fungieren und Nachrichten weiterleiten:

```
Coordinator (1x)
    ├── Router A ──── End-Device (Sensor)
    │       └───────── End-Device (Taster)
    ├── Router B ──── End-Device (Leuchtmittel)
    │       └── Router C ──── End-Device (Steckdose)
    └── End-Device (direkt, kein Router nötig)
```

### Geräte-Rollen

| Rolle         | Funktion                                     | Energiebedarf         |
|---------------|----------------------------------------------|-----------------------|
| **Coordinator** | Einmaliger Netzwerk-Ersteller, Routing-Tabelle | Dauerstrombetrieb    |
| **Router**    | Leitet Nachrichten weiter, ausgedehnte Reichweite | Dauerstrombetrieb |
| **End-Device** | Sensor/Aktor, schläft zwischen Messungen     | Batterie möglich      |

**Self-Healing:** Fällt ein Router aus, findet das Netz automatisch einen anderen Weg.

---

## Technische Parameter

| Parameter        | Wert                                    |
|------------------|-----------------------------------------|
| Frequenz         | 2.4 GHz (global), 868/915 MHz (regional)|
| Kanäle           | 16 (2.4 GHz), nummeriert 11–26          |
| Datenrate        | 250 kbps                                |
| Reichweite       | 10–30 m (innen), 75–100 m (freies Feld) |
| Max. Geräte      | 65000 pro Netzwerk (theoretisch)        |
| Verschlüsselung  | AES-128                                 |
| Latenz           | 15–30 ms                                |

**Interferenzproblem:** 2.4 GHz teilt sich den Frequenzbereich mit WLAN (2.4 GHz), Bluetooth und Mikrowellen. WLAN-Kanäle 1, 6, 11 überlappen mit Zigbee-Kanälen. Wichtig: **Zigbee-Kanal 15, 20, 25 oder 26** wählen um WLAN-Kollisionen zu vermeiden.

---

## Pairing (Anlernvorgang)

Im Gegensatz zu EnOcean (kein Anlernen nötig) muss Zigbee-Geräte den Coordinator kennen:

1. Coordinator in **Join-Modus** versetzen (Zeitfenster öffnen)
2. Gerät in **Pairing-Modus** versetzen (Reset-Taste oder Powercycle)
3. Gerät findet Netzwerk → sendet Join-Request
4. Coordinator bestätigt → Gerät ist Mitglied
5. Gerät sendet IEEE-Adresse (64 bit) und erhält kurze Netzwerkadresse (16 bit)

**Wichtig:** In Zigbee2MQTT kann das Pairing-Fenster zeitlich begrenzt werden (Sicherheit).

---

## Zigbee2MQTT — Integration in GA-Software

**Zigbee2MQTT** ist die beliebteste Open-Source-Bridge:

```
Zigbee-Geräte → Zigbee-USB-Stick (Coordinator) → Zigbee2MQTT → MQTT-Broker → Home Assistant / GLT
```

### Vorteile Zigbee2MQTT

- Hersteller-unabhängig (1000+ unterstützte Geräte aus 300+ Marken)
- Vollständige Kontrolle (keine Cloud)
- Integration in Home Assistant, Node-RED, jedes MQTT-kompatible System
- Gerätedatenbank: zigbee2mqtt.io/devices/

### Typische Konfiguration (zigbee2mqtt)

```yaml
mqtt:
  base_topic: zigbee2mqtt
  server: mqtt://localhost:1883
serial:
  port: /dev/ttyUSB0
permit_join: false  # nach Inbetriebnahme schliessen!
```

MQTT-Ausgabe für Sensor:
```
zigbee2mqtt/mein-sensor → {"temperature": 22.5, "humidity": 55, "battery": 85, "linkquality": 255}
```

---

## Zigbee in der GA-Praxis

### Stärken

| Stärke                          | Warum                                |
|---------------------------------|--------------------------------------|
| Grosse Gerätauswahl             | Massenmärkte: IKEA, Philips Hue, Aqara |
| Günstige Hardware               | Preise ab CHF 5–20 pro Gerät         |
| Mesh-Selbstheilung              | Robuster als Single-Hop Funk         |
| Bidirektional                   | Bestätigungen, Rückmeldungen         |
| AES-128 Verschlüsselung         | Sicher                               |

### Einschränkungen

| Einschränkung                   | Warum                                |
|---------------------------------|--------------------------------------|
| 2.4 GHz Interferenz             | WLAN, BT, Mikrowellen                |
| Coordinator-Abhängigkeit        | Coordinator ausfallkritisch          |
| Keine Normierung für GA         | Kein BACnet, kein IEC-Standard       |
| Kein energieharvestig           | Batterien nötig (ausser Netzgeräte)  |
| Koordinator nur 1x              | Netzwerk-Split bei mehreren Coordinatoren |

### Typische GA-Anwendungen mit Zigbee

- **Lichtsteuerung:** IKEA TRÅDFRI, Philips Hue (günstig, grosse Auswahl)
- **Taster und Schalter:** Kein Kabel nötig, Retrofit
- **Temperatur-/Feuchte-Sensoren:** Aqara, Sonoff (günstig)
- **Thermostate:** Radiatorventile (WISER, Devolo)
- **Türen/Fenster:** Aqara Türsensoren
- **Bewegungsmelder:** Aqara, IKEA

---

## Vergleich Zigbee vs. EnOcean

| Merkmal            | Zigbee                          | EnOcean                          |
|--------------------|----------------------------------|----------------------------------|
| Batterie           | Nötig (ausser Router/Netzgeräte) | Batterielos (Energy Harvesting)  |
| Bidirektional      | ✅ Ja                            | Eingeschränkt (1BS/4BS unidirekt)|
| Reichweite         | 10–30 m (Mesh erweitert)        | 30 m (Repeater bis 2 Hops)       |
| Geräteauswahl      | Sehr gross (Massenmarkt)        | Mittel (GA-spezifisch)           |
| Normen             | IEEE 802.15.4                   | ISO/IEC 14543-3-1X               |
| GA-Integration     | Via Zigbee2MQTT/MQTT            | Direkter (KNX/BACnet-Gateway)    |
| Kosten             | Sehr günstig                    | Mittel bis teuer                 |
| Wartung            | Batteriewechsel nötig           | Wartungsfrei                     |

---

## Matter und Thread (Nachfolge-Protokoll)

**Matter** (ehem. CHIP, 2022) ist der neue Smart-Home-Standard (Google, Apple, Amazon, Zigbee Alliance):
- Einheitliches Protokoll über IP
- Läuft über **Thread** (ebenfalls IEEE 802.15.4 Mesh) oder WLAN/Ethernet
- Zigbee-Geräte sind **nicht** kompatibel zu Matter
- Übergangszeit: Zigbee noch Jahre relevant (riesige Gerätebasis)

## Normen

- **IEEE 802.15.4** — Physikalische Schicht und MAC
- **Zigbee Alliance / CSA** (Connectivity Standards Alliance) — zigbee.org
- **Matter** — Nachfolgestandard für Smart Home (csa-iot.org)

<!-- EN -->

**Zigbee** is a low-power radio network standard based on IEEE 802.15.4. Unlike EnOcean (battery-free, unidirectional), Zigbee is bidirectional, self-healing and network-capable. Increasingly used in BA for sensors, actuators and lighting control.

## Network Topology

Zigbee uses a **mesh network** — devices can act as routers and forward messages:

```
Coordinator (1×)
    ├── Router A ──── End-Device (sensor)
    │       └───────── End-Device (push-button)
    ├── Router B ──── End-Device (lamp)
    │       └── Router C ──── End-Device (socket)
    └── End-Device (direct, no router needed)
```

### Device Roles

| Role | Function | Power requirement |
|------|---------|-----------------|
| **Coordinator** | One-off network creator, routing table | Continuous power |
| **Router** | Forwards messages, extends range | Continuous power |
| **End-Device** | Sensor/actuator, sleeps between measurements | Battery possible |

**Self-healing:** If a router fails, the network automatically finds another path.

---

## Technical Parameters

| Parameter | Value |
|---------|------|
| Frequency | 2.4 GHz (global), 868/915 MHz (regional) |
| Channels | 16 (2.4 GHz), numbered 11–26 |
| Data rate | 250 kbps |
| Range | 10–30 m (indoors), 75–100 m (open field) |
| Max. devices | 65,000 per network (theoretical) |
| Encryption | AES-128 |
| Latency | 15–30 ms |

**Interference issue:** 2.4 GHz shares the frequency band with Wi-Fi (2.4 GHz), Bluetooth and microwave ovens. Wi-Fi channels 1, 6, 11 overlap with Zigbee channels. Important: choose **Zigbee channel 15, 20, 25 or 26** to avoid Wi-Fi collisions.

---

## Pairing (Association Process)

Unlike EnOcean (no pairing required), Zigbee devices must know the coordinator:

1. Put coordinator into **join mode** (open time window)
2. Put device into **pairing mode** (reset button or power cycle)
3. Device finds network → sends join request
4. Coordinator confirms → device is a member
5. Device sends IEEE address (64 bit) and receives short network address (16 bit)

**Note:** In Zigbee2MQTT the pairing window can be time-limited (security).

---

## Zigbee2MQTT — Integration into BA Software

**Zigbee2MQTT** is the most popular open-source bridge:

```
Zigbee devices → Zigbee USB stick (coordinator) → Zigbee2MQTT → MQTT broker → Home Assistant / BMS
```

### Advantages of Zigbee2MQTT

- Manufacturer-independent (1,000+ supported devices from 300+ brands)
- Full control (no cloud)
- Integration into Home Assistant, Node-RED, any MQTT-compatible system
- Device database: zigbee2mqtt.io/devices/

### Typical Configuration (zigbee2mqtt)

```yaml
mqtt:
  base_topic: zigbee2mqtt
  server: mqtt://localhost:1883
serial:
  port: /dev/ttyUSB0
permit_join: false  # close after commissioning!
```

MQTT output for sensor:
```
zigbee2mqtt/my-sensor → {"temperature": 22.5, "humidity": 55, "battery": 85, "linkquality": 255}
```

---

## Zigbee in BA Practice

### Strengths

| Strength | Why |
|---------|-----|
| Large device selection | Mass market: IKEA, Philips Hue, Aqara |
| Inexpensive hardware | Prices from CHF 5–20 per device |
| Mesh self-healing | More robust than single-hop radio |
| Bidirectional | Confirmations, feedback |
| AES-128 encryption | Secure |

### Limitations

| Limitation | Why |
|-----------|-----|
| 2.4 GHz interference | Wi-Fi, Bluetooth, microwave ovens |
| Coordinator dependency | Coordinator is a single point of failure |
| No BA standardisation | No BACnet, no IEC standard |
| No energy harvesting | Batteries needed (except mains-powered devices) |
| Only one coordinator | Network split with multiple coordinators |

### Typical BA Applications with Zigbee

- **Lighting control:** IKEA TRÅDFRI, Philips Hue (low cost, wide choice)
- **Push-buttons and switches:** No cabling needed, retrofit
- **Temperature/humidity sensors:** Aqara, Sonoff (low cost)
- **Thermostats:** Radiator valves (WISER, Devolo)
- **Doors/windows:** Aqara door sensors
- **Motion detectors:** Aqara, IKEA

---

## Comparison Zigbee vs. EnOcean

| Feature | Zigbee | EnOcean |
|---------|--------|---------|
| Battery | Required (except routers/mains) | Battery-free (energy harvesting) |
| Bidirectional | ✅ Yes | Limited (1BS/4BS unidirectional) |
| Range | 10–30 m (mesh extends) | 30 m (repeater up to 2 hops) |
| Device selection | Very large (mass market) | Medium (BA-specific) |
| Standards | IEEE 802.15.4 | ISO/IEC 14543-3-1X |
| BA integration | Via Zigbee2MQTT/MQTT | More direct (KNX/BACnet gateway) |
| Cost | Very low | Medium to high |
| Maintenance | Battery replacement needed | Maintenance-free |

---

## Matter and Thread (Successor Protocol)

**Matter** (formerly CHIP, 2022) is the new smart home standard (Google, Apple, Amazon, Zigbee Alliance):
- Unified protocol over IP
- Runs over **Thread** (also IEEE 802.15.4 mesh) or Wi-Fi/Ethernet
- Zigbee devices are **not** compatible with Matter
- Transition period: Zigbee still relevant for years (huge installed base)

## Standards

- **IEEE 802.15.4** — Physical layer and MAC
- **Zigbee Alliance / CSA** (Connectivity Standards Alliance) — zigbee.org
- **Matter** — successor standard for smart home (csa-iot.org)
