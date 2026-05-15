---
title: Matter & Thread — neue Smart-Home-Standards
slug: matter-thread
category: kommunikation
subcategory: drahtlos
tags: [matter, thread, project-chip, csa, ieee-802-15-4, ipv6, mesh, apple-homekit, google-home, amazon-alexa, border-router, commissioning, qr-code, bluetooth-le, interoperabilität, smart-home]
difficulty: grundlagen
area: [ga, elektro]
related: [zigbee, zwave, knx, enocean, mqtt, raumautomation]
rechner: []
norm: [Matter 1.x (CSA), Thread 1.3 (Thread Group), IEEE 802.15.4, RFC 6550 RPL]
updated: 2026-05-15
lang: de
---

# Matter & Thread — neue Smart-Home-Standards

Matter und Thread sind zwei komplementäre neue Standards, die ab 2022 die Smart-Home-Welt fundamental verändern. **Thread** ist das drahtlose Netzwerkprotokoll (Layer 1–4), **Matter** ist das Anwendungsprotokoll (Layer 7). Zusammen bilden sie eine offene, hersteller-neutrale Alternative zu den proprietären Smart-Home-Ökosystemen.

---

## Das Problem, das Matter & Thread lösen

Bisher: Jeder Hersteller hatte sein eigenes Ökosystem. Apple-Geräte sprachen nur mit Apple HomeKit, Google-Geräte nur mit Google Home, Amazon nur mit Alexa.

Mit Matter: **Ein Gerät, alle Ökosysteme.** Ein Matter-Thermostat funktioniert gleichzeitig mit Apple, Google, Amazon und Samsung — ohne Bridge, ohne Cloud-Zwang.

---

## Thread — das Netzwerkprotokoll

Thread (IEEE 802.15.4) ist ein **IP-basiertes drahtloses Mesh-Protokoll** für IoT-Geräte:

| Parameter | Wert |
|-----------|------|
| Frequenz | 2,4 GHz (IEEE 802.15.4) |
| Datenrate | 250 kbit/s |
| Reichweite | 10–30 m pro Hop |
| Topologie | Mesh (selbstheilend) |
| Adressierung | IPv6 (6LoWPAN Kompression) |
| Verschlüsselung | AES-128 auf Link-Ebene |
| Max. Netzgrösse | 250+ Geräte |

### Thread-Rollen

| Rolle | Funktion |
|-------|----------|
| **Router** | Leitet Pakete im Mesh weiter, netz-versorgt |
| **End Device (Sleepy)** | Batteriebetrieben, schläft, kein Routing |
| **Border Router** | Verbindet Thread-Mesh mit IP-Netz (WLAN/Ethernet) |
| **Commissioner** | Nimmt neue Geräte ins Netz auf (provisorisch) |
| **Leader** | Koordiniert Router-Topologie (dynamisch gewählt) |

### Thread Border Router
Der Border Router ist die Brücke zwischen dem Thread-Mesh und dem lokalen IP-Netzwerk. Typische Geräte:
- Apple HomePod mini / Apple TV 4K
- Google Nest Hub (2. Gen) / Nest WiFi Pro
- Amazon Echo (4. Gen)
- Dedizierte Border Router (Silabs, NXP, Nordic)

---

## Matter — das Anwendungsprotokoll

Matter (entwickelt von der CSA = Connectivity Standards Alliance, früher Zigbee Alliance) definiert **Gerätetypen, Cluster und Attribute** über IP:

### Transportwege
Matter läuft über:
- **Thread** (drahtlos, batteriebetrieben)
- **WLAN** (netz-versorgte Geräte)
- **Ethernet** (stationäre Geräte)

### Gerätetypen (Auswahl)

| Matter-Gerätetyp | Beispiel |
|-----------------|---------|
| On/Off Light | LED-Strahler |
| Dimmable Light | Dimmer |
| Color Temperature Light | Tunable White |
| Extended Color Light | RGBW |
| Thermostat | Raumthermostat |
| Door Lock | Türschloss |
| Window Covering | Jalousie, Rollladen |
| Occupancy Sensor | Präsenzmelder |
| Contact Sensor | Tür-/Fensterkontakt |
| Air Quality Sensor | CO₂, VOC |
| Pump Controller | Pumpsteuerung |
| HVAC | Klimaanlage (in Entwicklung) |

### Commissioning mit QR-Code
Neues Matter-Gerät einbinden:
1. QR-Code auf dem Gerät scannen (mit Smartphone)
2. Gerät tritt automatisch dem Thread-Mesh oder WLAN bei
3. Gerät wird mit dem Matter-Fabric (Netzwerk) verbunden
4. Gerät erscheint in Apple Home, Google Home, etc.

---

## Multi-Admin: Ein Gerät, mehrere Controller

Matter erlaubt **Multi-Admin**: Ein Gerät kann gleichzeitig von mehreren Smart-Home-Systemen gesteuert werden — ohne Cloud-Kopplung:

```
Matter-Thermostat
    │ (Thread)
    ├── Apple HomeKit ✓
    ├── Google Home ✓
    └── Home Assistant ✓ (über Matter-Integration)
```

---

## Matter & GA-Integration

### Aktuelle Grenzen

Matter ist für **Wohngebäude** optimiert. In der professionellen GA fehlen noch:
- **BACnet-Bridge** (in Entwicklung, CSA Bridge-Spec)
- **Komplexe HVAC-Objekte** (Lüftungsanlagen, Kältemaschinen)
- **Gruppen-Adressierung** wie KNX-Gruppentelgramme
- **Normativer Rahmen** für Gewerbe (EN 15232, SIA 386)

### Sinnvolle GA-Nutzung heute

| Einsatz | Empfehlung |
|---------|-----------|
| Wohngebäude | Sehr gut — Matter ist die Zukunft |
| Hotelzimmer | Matter + Thread für Einzelraumregelung möglich |
| Kleingewerbe | Matter über Home Assistant als GA-Bridge |
| Grossgebäude | KNX/BACnet bleibt primär, Matter als Zusatz |

### Home Assistant als Matter-Bridge

```
KNX / BACnet Anlage
      │
Home Assistant
  ├── KNX-Integration (nativer Stack)
  ├── BACnet-Integration
  ├── Matter Controller (Thread Border Router)
  └── MQTT-Broker
         │
    Matter-Geräte (Thread-Mesh)
```

---

## Thread vs. Zigbee vs. Z-Wave

| Merkmal | Thread | Zigbee | Z-Wave |
|---------|--------|--------|--------|
| Frequenz | 2,4 GHz | 2,4 GHz | 868 MHz |
| Protokollstack | IPv6/UDP (offener Standard) | Proprietär (ZigBee) | Proprietär |
| Anwendungsprotokoll | Matter (offener Standard) | ZigBee / Matter* | Z-Wave |
| Interoperabilität | Sehr hoch (Matter) | Mittel | Hoch |
| Batterie | Ja (Sleepy ED) | Ja | Ja |
| IP-nativ | Ja (IPv6) | Nein | Nein |
| Reife | Jung (2022+) | Ausgereift | Ausgereift |

*Zigbee-Hardware kann via Matter over Thread neu bespielt werden (Silabs, NXP).

---

## Roadmap und Ausblick

| Version | Jahr | Highlights |
|---------|------|-----------|
| Matter 1.0 | 2022 | Licht, Schalter, Schlösser, Thermostate |
| Matter 1.1 | 2023 | Bugfixes, ICD (Intermittently Connected Device) |
| Matter 1.2 | 2023 | Kühlschrank, Raumluft, Smoke-Melder, Roboter |
| Matter 1.3 | 2024 | Wassersteuerung, EV-Charging, Energie-Monitoring |
| Matter 1.4 | 2024/25 | Enhanced Multi-Admin, Wasserheizer |
| Matter for Metering | geplant | Smart Meter, BACnet Bridge |
