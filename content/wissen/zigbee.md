---
title: Zigbee — Mesh-Funknetzwerk für GA
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
