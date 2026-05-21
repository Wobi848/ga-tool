---
title: Z-Wave — Drahtloses Mesh-Netzwerk für Smart Buildings
title_en: Z-Wave — Wireless Mesh Network for Smart Buildings
slug: zwave
category: kommunikation
subcategory: drahtlos
tags:
  [
    z-wave,
    z-wave-plus,
    z-wave-lr,
    868mhz,
    mesh-netzwerk,
    smart-home,
    subghz,
    sicherheit,
    aes-128,
    s0-s2,
    zwavejs,
    home-assistant,
    fibaro,
    aeotec,
    qubino,
    schalter,
    steckdosen,
    jalousie,
    raumautomation
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [zigbee, enocean, knx, raumautomation, mqtt]
rechner: []
norm: [ITU-T G.9959, Z-Wave Alliance ZAD12837, ISO/IEC 14543-3-10]
updated: 2026-05-15
lang: de
---

# Z-Wave — Drahtloses Mesh-Netzwerk für Smart Buildings

Z-Wave ist ein proprietäres drahtloses Mesh-Protokoll für die Heimautomation und leichte Gebäudeautomation. Es arbeitet im **Sub-GHz-Band (868 MHz in Europa)** und vermeidet damit die WLAN/Bluetooth-Interferenzen im 2,4-GHz-Band. Z-Wave zeichnet sich durch hohe Interoperabilität aus — alle zertifizierten Geräte sind untereinander kompatibel.

---

## Technische Eckdaten

| Parameter       | Z-Wave          | Z-Wave Plus (Gen 5)   | Z-Wave LR          |
| --------------- | --------------- | --------------------- | ------------------ |
| Frequenz CH/DE  | 868,42 MHz      | 868,42 MHz            | 868,4 / 869,85 MHz |
| Reichweite      | 30 m (innen)    | 100 m (aussen)        | bis 1600 m         |
| Max. Netzknoten | 232             | 232                   | 4000               |
| Datenrate       | 9,6 / 40 kbit/s | 9,6 / 40 / 100 kbit/s | 100 kbit/s         |
| Sendeleistung   | 1 mW            | 1 mW                  | 25 mW              |
| Topologie       | Mesh            | Mesh                  | Stern + Mesh       |

---

## Mesh-Netzwerk

Z-Wave-Geräte sind in einem **Mesh-Netzwerk** vernetzt. Netz-versorgte Geräte (Aktoren, Dimmer) fungieren als **Router** und leiten Nachrichten weiter. Batteriebetriebene Geräte (Sensoren, Fernbedienungen) schlafen und sind keine Router.

```
Z-Wave Hub/Controller
      │
   Steckdose ──── Dimmer ──── Jalousie
   (Router)       (Router)    (Router)
      │
   Türsensor
   (Sleep, kein Router)
```

Routingtiefe: bis 4 Hops (Zwischenknoten) von Controller zum Zielgerät.

---

## Sicherheit

Z-Wave bietet seit S2 (2017) starke Verschlüsselung:

| Sicherheitsklasse  | Verschlüsselung                        | Anwendung                       |
| ------------------ | -------------------------------------- | ------------------------------- |
| S0 (alt)           | AES-128 (anfällig für Replay-Angriffe) | Ältere Geräte                   |
| S2 Access Control  | AES-128, ECDH                          | Türschlösser, Alarm             |
| S2 Authenticated   | AES-128, ECDH                          | Dimmer, Thermostate             |
| S2 Unauthenticated | AES-128                                | Geräte ohne Display             |
| SmartStart         | QR-Code Pairing                        | Einfache sichere Inbetriebnahme |

SmartStart ermöglicht sicheres Einlernen mit QR-Code — Gerät wird nach dem Einschalten automatisch mit dem Netzwerk verbunden.

---

## Gerätetypen und Geräteklassen

### Aktoren (netz-versorgt, Router-Fähig)

- **Schaltaktoren** (Steckdosen, Einbaurelais)
- **Dimmer** (Phasenabschnitt, Phasenabschnitt rückwärts)
- **Rolladen-/Jalousienaktor**
- **Thermostatventile** (Heizkörperventil, Fussbodenheizung)
- **Lichtschalter** (Flush-Mount)

### Sensoren (batteriebetrieben, kein Router)

- Tür-/Fenster-Kontakt
- Bewegungsmelder (PIR)
- Temperatursensor
- Rauchmelder, CO-Melder
- Überschwemmungssensor

### Controller

- **Z-Wave Hub** (Fibaro Home Center, Vera, Aeotec Z-Stick)
- **Smart Home Systeme** mit Z-Wave (Home Assistant, Homey, SmartThings)

---

## Integration in die Gebäudeautomation

Z-Wave ist primär für die **Wohngebäudeautomation** konzipiert, wird aber auch in kleineren Gewerbegebäuden eingesetzt:

### Home Assistant + Z-Wave JS

Die beliebteste Open-Source-Integration:

```
Gebäude
  │
Z-Wave USB-Stick (Aeotec Z-Stick 7)
  │
Home Assistant (Raspberry Pi / Mini-PC)
  │  Z-Wave JS Add-on
  ├── MQTT Bridge → GLT/Scada
  ├── REST API → KNX-IP Gateway
  └── Node-RED → BACnet-Gateway
```

### Typische GA-Anwendungen

| Bereich     | Z-Wave-Gerät                             |
| ----------- | ---------------------------------------- |
| Einzelbüros | Raumthermostat, Heizkörperventil         |
| Hotelzimmer | Steckdose, Jalousie, Türkontakt          |
| Wohngebäude | Rolladen, Dimmer, Rauchwarnmelder        |
| Retrofit    | Nachrüst-Thermostat (kein Kabelverlegen) |

---

## Z-Wave vs. Zigbee vs. EnOcean

| Merkmal           | Z-Wave                                | Zigbee                     | EnOcean                 |
| ----------------- | ------------------------------------- | -------------------------- | ----------------------- |
| Frequenz          | 868 MHz                               | 2,4 GHz                    | 868 MHz                 |
| Interoperabilität | Hoch (Z-Wave Alliance Zertifizierung) | Mittel (Matter verbessert) | Hoch (EnOcean Alliance) |
| Batterie          | Ja                                    | Ja                         | Batterielos!            |
| Reichweite        | 30–100 m                              | 10–30 m                    | 30 m                    |
| Max. Netzgrösse   | 232 (4000 mit LR)                     | 65000                      | Broadcast               |
| Protokoll         | Proprietär (Z-Wave Alliance)          | IEEE 802.15.4 + ZigBee     | EnOcean Protocol        |
| Open Source       | Nein (spec verfügbar)                 | Ja                         | Teilweise               |

---

## Einschränkungen in der GA

- **Proprietäres Protokoll:** Controller-Hersteller-Bindung (kein freier Stack bis Z-Wave 700)
- **Kein nativer BACnet/Modbus:** Gateway immer nötig
- **232 Knoten:** Begrenzt für grössere Gebäude (Z-Wave LR: 4000)
- **Keine direkte Gerät-zu-Gerät-Kommunikation ohne Controller**
- **Latenz:** Durch Mesh-Routing ca. 100–500 ms (kein Problem für Beleuchtung/Jalousie)

---

## Z-Wave Long Range (LR)

Z-Wave LR (2020) adressiert die bisherigen Grenzen:

- **Bis 1600 m Reichweite** (Aussenbereich, Direktverbindung)
- **Bis 4000 Knoten** pro Netzwerk
- **Stern-Topologie** (kein Mesh-Routing nötig)
- Rückwärtskompatibel mit Z-Wave Plus

Ideal für: Campus-Beleuchtung, Parkflächen, Aussenareale.

<!-- EN -->

Z-Wave is a proprietary wireless mesh protocol for home automation and light building automation. It operates in the **sub-GHz band (868 MHz in Europe)**, thereby avoiding the WLAN/Bluetooth interference in the 2.4 GHz band. Z-Wave is distinguished by high interoperability — all certified devices are compatible with each other.

---

## Technical Specifications

| Parameter          | Z-Wave          | Z-Wave Plus (Gen 5)   | Z-Wave LR          |
| ------------------ | --------------- | --------------------- | ------------------ |
| Frequency CH/DE    | 868.42 MHz      | 868.42 MHz            | 868.4 / 869.85 MHz |
| Range              | 30 m (indoors)  | 100 m (outdoors)      | up to 1,600 m      |
| Max. network nodes | 232             | 232                   | 4,000              |
| Data rate          | 9.6 / 40 kbit/s | 9.6 / 40 / 100 kbit/s | 100 kbit/s         |
| Transmit power     | 1 mW            | 1 mW                  | 25 mW              |
| Topology           | Mesh            | Mesh                  | Star + mesh        |

---

## Mesh Network

Z-Wave devices are networked in a **mesh network**. Mains-powered devices (actuators, dimmers) act as **routers** and relay messages. Battery-powered devices (sensors, remotes) sleep and are not routers.

```
Z-Wave hub/controller
      │
   Socket ──── Dimmer ──── Blind actuator
   (router)    (router)    (router)
      │
   Door sensor
   (sleeping, not a router)
```

Routing depth: up to 4 hops (intermediate nodes) from controller to target device.

---

## Security

Z-Wave has offered strong encryption since S2 (2017):

| Security class     | Encryption                             | Application                 |
| ------------------ | -------------------------------------- | --------------------------- |
| S0 (old)           | AES-128 (vulnerable to replay attacks) | Older devices               |
| S2 Access Control  | AES-128, ECDH                          | Door locks, alarm           |
| S2 Authenticated   | AES-128, ECDH                          | Dimmers, thermostats        |
| S2 Unauthenticated | AES-128                                | Devices without display     |
| SmartStart         | QR code pairing                        | Simple secure commissioning |

SmartStart enables secure inclusion via QR code — the device is automatically joined to the network after power-up.

---

## Device Types and Classes

### Actuators (mains-powered, router-capable)

- **Switching actuators** (sockets, flush-mount relays)
- **Dimmers** (leading/trailing edge)
- **Blind/roller shutter actuator**
- **Thermostatic valve actuators** (radiator, underfloor heating)
- **Light switches** (flush-mount)

### Sensors (battery-powered, no routing)

- Door/window contact
- Motion detector (PIR)
- Temperature sensor
- Smoke detector, CO detector
- Flood sensor

### Controllers

- **Z-Wave hub** (Fibaro Home Center, Vera, Aeotec Z-Stick)
- **Smart home systems** with Z-Wave (Home Assistant, Homey, SmartThings)

---

## Integration into Building Automation

Z-Wave is primarily designed for **residential building automation** but is also used in smaller commercial buildings:

### Home Assistant + Z-Wave JS

The most popular open-source integration:

```
Building
  │
Z-Wave USB stick (Aeotec Z-Stick 7)
  │
Home Assistant (Raspberry Pi / mini PC)
  │  Z-Wave JS add-on
  ├── MQTT bridge → BMS/SCADA
  ├── REST API → KNX IP gateway
  └── Node-RED → BACnet gateway
```

### Typical BA Applications

| Area               | Z-Wave device                               |
| ------------------ | ------------------------------------------- |
| Individual offices | Room thermostat, radiator valve             |
| Hotel rooms        | Socket, blind, door contact                 |
| Residential        | Roller shutter, dimmer, smoke detector      |
| Retrofit           | Retrofit thermostat (no cable installation) |

---

## Z-Wave vs. Zigbee vs. EnOcean

| Feature           | Z-Wave                               | Zigbee                        | EnOcean                 |
| ----------------- | ------------------------------------ | ----------------------------- | ----------------------- |
| Frequency         | 868 MHz                              | 2.4 GHz                       | 868 MHz                 |
| Interoperability  | High (Z-Wave Alliance certification) | Medium (Matter improves this) | High (EnOcean Alliance) |
| Battery           | Yes                                  | Yes                           | Battery-free!           |
| Range             | 30–100 m                             | 10–30 m                       | 30 m                    |
| Max. network size | 232 (4,000 with LR)                  | 65,000                        | Broadcast               |
| Protocol          | Proprietary (Z-Wave Alliance)        | IEEE 802.15.4 + ZigBee        | EnOcean protocol        |
| Open source       | No (spec available)                  | Yes                           | Partly                  |

---

## Limitations in BA

- **Proprietary protocol:** Controller manufacturer lock-in (no free stack until Z-Wave 700)
- **No native BACnet/Modbus:** Gateway always required
- **232 nodes:** Limited for larger buildings (Z-Wave LR: 4,000)
- **No direct device-to-device communication without controller**
- **Latency:** Approx. 100–500 ms due to mesh routing (not an issue for lighting/blinds)

---

## Z-Wave Long Range (LR)

Z-Wave LR (2020) addresses the previous limitations:

- **Up to 1,600 m range** (outdoor, direct connection)
- **Up to 4,000 nodes** per network
- **Star topology** (no mesh routing required)
- Backwards compatible with Z-Wave Plus

Ideal for: campus lighting, car parks, outdoor areas.
