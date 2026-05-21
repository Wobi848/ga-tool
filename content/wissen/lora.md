---
title: LoRa / LoRaWAN — Long Range IoT für GA
title_en: LoRa / LoRaWAN — Long Range IoT for BA
slug: lora
category: protokolle
subcategory: funk
tags:
  [
    lora,
    lorawan,
    long-range,
    low-power,
    lpwan,
    the-things-network,
    ttn,
    gateway,
    end-device,
    classes-a-b-c,
    spreading-factor,
    chirp,
    fernzähler,
    campus,
    aussenklima,
    sf,
    abp,
    otaa
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [mqtt, mbus, enocean, zigbee, opc-ua]
norm: [LoRaWAN Specification 1.0.x / 1.1, ITU-R SM.1538]
updated: 2026-05-14
lang: de
---

# LoRa / LoRaWAN — Long Range IoT für GA

**LoRa** (Long Range) ist eine Funktechnik für sehr grosse Reichweiten bei sehr geringem Energieverbrauch. **LoRaWAN** ist das Protokoll und Netzwerkarchitektur darüber. In der GA für Fernzähler, Aussenklima-Sensoren und Campus-weites Monitoring geeignet.

## LoRa vs. LoRaWAN

| Begriff     | Beschreibung                                                            |
| ----------- | ----------------------------------------------------------------------- |
| **LoRa**    | Physikalische Funkschicht (Modulationsverfahren: Chirp Spread Spectrum) |
| **LoRaWAN** | Netzwerkprotokoll (MAC-Layer) über LoRa                                 |
| **TTN**     | The Things Network — kostenfreie LoRaWAN Community-Infrastruktur        |

---

## Technische Parameter

| Parameter           | Wert                                         |
| ------------------- | -------------------------------------------- |
| Frequenz (EU)       | 868 MHz (EU863-870)                          |
| Frequenz (US)       | 915 MHz                                      |
| Reichweite (Stadt)  | 1–5 km                                       |
| Reichweite (offen)  | 10–15 km (bis 40 km mit Antennenhöhe)        |
| Datenrate           | 0.3–50 kbps (je nach Spreading Factor)       |
| Spreading Factor    | SF7 (schnell, kurz) bis SF12 (langsam, weit) |
| Sendeleistung       | max. 25 mW (EU)                              |
| Batterielebensdauer | Monate bis Jahre                             |
| Paketgrösse         | max. 242 Bytes (SF7), ~51 Bytes (SF12)       |

### Spreading Factor (SF)

| SF   | Reichweite | Datenrate | Luftzeit | Einsatz                    |
| ---- | ---------- | --------- | -------- | -------------------------- |
| SF7  | Kurz       | 5.5 kbps  | ~61 ms   | Dichte urbane Umgebung     |
| SF9  | Mittel     | 1.76 kbps | ~186 ms  | Standard                   |
| SF12 | Lang       | 0.3 kbps  | ~2.8 s   | Keller, extreme Reichweite |

> LoRa passt SF automatisch an (ADR = Adaptive Data Rate) wenn das Netzwerk es erlaubt.

### Duty Cycle (Sendebeschränkung)

In Europa gilt 1 % Duty Cycle (EU-Regulierung):

- Bei 1 % Duty Cycle auf 868 MHz: max. 36 Sekunden pro Stunde senden
- Begrenzt die Häufigkeit der Datenpakete → **nicht für häufige Updates geeignet!**
- Typisch: Meldung alle 5–60 Minuten

---

## LoRaWAN Netzwerkarchitektur

```
End-Device (Sensor/Aktor)
    ↓ LoRa (868 MHz)
Gateway (empfängt alle Pakete im Funkbereich)
    ↓ IP (Ethernet/LTE)
LoRaWAN Network Server (LNS)
    ↓ MQTT / REST API
Applikation (GLT, Dashboard, Datenbank)
```

### Klassen von End-Devices

| Klasse | Downlink (Server → Gerät)   | Einsatz                              |
| ------ | --------------------------- | ------------------------------------ |
| **A**  | Nur nach Uplink (schlafen!) | Sensoren, Zähler (sehr stromsparend) |
| **B**  | Geplante Empfangsfenster    | Wenn gelegentlich Steuerung nötig    |
| **C**  | Dauerempfang                | Aktoren, Schaltungen (Netzbetrieb)   |

**Klasse A** ist bei weitem am häufigsten — Gerät sendet selten und schläft sonst.

---

## Aktivierungsverfahren

### OTAA (Over-the-Air Activation)

- Gerät und Server kennen einen gemeinsamen **AppKey** (128 bit)
- Bei erstem Join: Gerät sendet Join-Request → Server bestätigt → Sitzungsschlüssel werden generiert
- **Empfohlen** — dynamische Schlüssel, sicherer

### ABP (Activation by Personalization)

- Schlüssel fest im Gerät kodiert (kein Join nötig)
- Einfacher, aber **geringere Sicherheit** (Schlüssel im Gerät, Frame Counter Reset-Problem)
- Noch in manchen Produkten verwendet

---

## LoRaWAN in der GA — Typische Anwendungen

### Zähler-Fernauslesung

```
Wärme/Kälte/Wasser-Zähler mit LoRa-Modul
    ↓ Täglich Messwert senden
LoRaWAN-Gateway (auf Dach)
    ↓
GLT-Auswertung (Verbrauchsanalyse, Abrechnung)
```

LoRa ersetzt hier das physische Ablesen oder teure M-Bus-Verkabelung über grosse Distanzen.

### Aussenklima-Monitoring (Campus)

- Mehrere Temperatur-/Feuchte-Sensoren auf Parkplatz, in Gebäuden, an Fassaden
- 1 Gateway deckt ganzen Campus (< 1 km)
- Daten in GLT für witterungsgeführte Regelung

### Füllstand, Bodenfeuchte, Energie

- Füllstandssensoren (Ölheizung, Zisterne)
- Bodenfeuchte (Bewässerungssteuerung)
- Energiezähler-Module auf Zählern ohne Bus-Schnittstelle

---

## Vergleich LoRa vs. andere Protokolle

| Merkmal             | LoRaWAN            | Zigbee      | M-Bus (wireless) | NB-IoT          |
| ------------------- | ------------------ | ----------- | ---------------- | --------------- |
| Reichweite          | 1–15 km            | 30 m (Mesh) | 30 m             | 10 km           |
| Batterie (Jahre)    | 2–10               | 0.5–2       | 2–5              | 1–3             |
| Datenrate           | 0.3–50 kbps        | 250 kbps    | 32 kbps          | 200 kbps        |
| Aktualisierungsrate | Min.–Std.          | Sekunden    | Min.             | Min.–Std.       |
| Infrastruktur       | Gateway nötig      | Coordinator | Zähler           | Mobilfunknetz   |
| Kosten Betrieb      | Niedrig (TTN free) | Niedrig     | Niedrig          | Laufende Kosten |

### Wann LoRa, wann Zigbee?

- **LoRa:** Grosse Distanzen, seltene Messintervalle, Zähler, Aussen-Monitoring
- **Zigbee:** Kleine Distanzen, häufige Updates, Steuerung, innenräumliche Sensoren/Aktoren

---

## Eigenes LoRaWAN-Netzwerk vs. öffentliches

### The Things Network (TTN)

- Kostenlose Community-Infrastruktur
- Überall wo Community-Gateways existieren (grosse Städte gut abgedeckt)
- Einschränkungen: Fair-Use Policy (10 Downlinks/Tag, 30 s Airtime/Tag)
- Gut für Prototypen und kleine Projekte

### Privates LoRaWAN

- Eigener Gateway (z.B. TTIG von TTI) + eigener Network Server (ChirpStack, open source)
- Volle Kontrolle, kein Fair-Use
- Empfohlen für professionelle GA-Projekte

**ChirpStack** (open source, on-premise):

```
End-Devices → LoRa-Gateway → ChirpStack Network Server → ChirpStack Application Server → MQTT → GLT
```

## Normen

- **LoRaWAN Specification 1.0.x / 1.1** — LoRa Alliance (lora-alliance.org)
- **ITU-R SM.1538** — Technische Anforderungen Kurzstreckenfunk
- **ETSI EN 300 220** — Technische Anforderungen 868 MHz in Europa

<!-- EN -->

**LoRa** (Long Range) is a radio technology for very long range at very low energy consumption. **LoRaWAN** is the protocol and network architecture on top. Suitable in BA for remote meter reading, outdoor climate sensors and campus-wide monitoring.

## LoRa vs. LoRaWAN

| Term        | Description                                                |
| ----------- | ---------------------------------------------------------- |
| **LoRa**    | Physical radio layer (modulation: Chirp Spread Spectrum)   |
| **LoRaWAN** | Network protocol (MAC layer) over LoRa                     |
| **TTN**     | The Things Network — free LoRaWAN community infrastructure |

---

## Technical Parameters

| Parameter        | Value                                        |
| ---------------- | -------------------------------------------- |
| Frequency (EU)   | 868 MHz (EU863-870)                          |
| Frequency (US)   | 915 MHz                                      |
| Range (urban)    | 1–5 km                                       |
| Range (open)     | 10–15 km (up to 40 km with antenna height)   |
| Data rate        | 0.3–50 kbps (depending on spreading factor)  |
| Spreading factor | SF7 (fast, short) to SF12 (slow, long range) |
| Transmit power   | max. 25 mW (EU)                              |
| Battery life     | Months to years                              |
| Packet size      | max. 242 bytes (SF7), ~51 bytes (SF12)       |

### Spreading Factor (SF)

| SF   | Range  | Data rate | Airtime | Application             |
| ---- | ------ | --------- | ------- | ----------------------- |
| SF7  | Short  | 5.5 kbps  | ~61 ms  | Dense urban             |
| SF9  | Medium | 1.76 kbps | ~186 ms | Standard                |
| SF12 | Long   | 0.3 kbps  | ~2.8 s  | Basement, extreme range |

> LoRa automatically adjusts SF (ADR = Adaptive Data Rate) when the network permits.

### Duty Cycle (Transmission Restriction)

In Europe a 1 % duty cycle applies (EU regulation):

- At 1 % duty cycle on 868 MHz: max. 36 seconds per hour of transmission
- Limits packet frequency → **not suitable for frequent updates!**
- Typical: message every 5–60 minutes

---

## LoRaWAN Network Architecture

```
End device (sensor/actuator)
    ↓ LoRa (868 MHz)
Gateway (receives all packets in radio range)
    ↓ IP (Ethernet/LTE)
LoRaWAN Network Server (LNS)
    ↓ MQTT / REST API
Application (BMS, dashboard, database)
```

### End-Device Classes

| Class | Downlink (server → device)    | Application                         |
| ----- | ----------------------------- | ----------------------------------- |
| **A** | Only after uplink (sleeping!) | Sensors, meters (very low power)    |
| **B** | Scheduled receive windows     | When occasional control needed      |
| **C** | Continuous receive            | Actuators, switches (mains-powered) |

**Class A** is by far the most common — device transmits rarely and sleeps otherwise.

---

## Activation Methods

### OTAA (Over-the-Air Activation)

- Device and server share a common **AppKey** (128 bit)
- On first join: device sends join request → server confirms → session keys generated
- **Recommended** — dynamic keys, more secure

### ABP (Activation by Personalisation)

- Keys hard-coded in device (no join required)
- Simpler, but **lower security** (key in device, frame counter reset issue)
- Still used in some products

---

## LoRaWAN in BA — Typical Applications

### Remote Meter Reading

```
Heat/cooling/water meter with LoRa module
    ↓ Send reading daily
LoRaWAN gateway (on roof)
    ↓
BMS evaluation (consumption analysis, billing)
```

LoRa replaces physical reading or expensive M-Bus cabling over long distances.

### Outdoor Climate Monitoring (Campus)

- Multiple temperature/humidity sensors in car parks, buildings, on facades
- 1 gateway covers entire campus (< 1 km)
- Data in BMS for weather-compensated control

### Level, Soil Moisture, Energy

- Level sensors (oil heating tank, cistern)
- Soil moisture (irrigation control)
- Energy meter modules on meters without bus interface

---

## Comparison LoRa vs. Other Protocols

| Feature         | LoRaWAN        | Zigbee      | M-Bus (wireless) | NB-IoT         |
| --------------- | -------------- | ----------- | ---------------- | -------------- |
| Range           | 1–15 km        | 30 m (mesh) | 30 m             | 10 km          |
| Battery (years) | 2–10           | 0.5–2       | 2–5              | 1–3            |
| Data rate       | 0.3–50 kbps    | 250 kbps    | 32 kbps          | 200 kbps       |
| Update rate     | min.–hours     | seconds     | min.             | min.–hours     |
| Infrastructure  | Gateway needed | Coordinator | Meter            | Mobile network |
| Operating cost  | Low (TTN free) | Low         | Low              | Ongoing costs  |

### When LoRa, when Zigbee?

- **LoRa:** Long distances, infrequent intervals, meters, outdoor monitoring
- **Zigbee:** Short distances, frequent updates, control, indoor sensors/actuators

---

## Own LoRaWAN Network vs. Public

### The Things Network (TTN)

- Free community infrastructure
- Wherever community gateways exist (major cities well covered)
- Restrictions: fair use policy (10 downlinks/day, 30 s airtime/day)
- Good for prototypes and small projects

### Private LoRaWAN

- Own gateway (e.g. TTIG from TTI) + own network server (ChirpStack, open source)
- Full control, no fair use restrictions
- Recommended for professional BA projects

**ChirpStack** (open source, on-premise):

```
End devices → LoRa gateway → ChirpStack Network Server → ChirpStack Application Server → MQTT → BMS
```

## Standards

- **LoRaWAN Specification 1.0.x / 1.1** — LoRa Alliance (lora-alliance.org)
- **ITU-R SM.1538** — Technical requirements for short-range radio
- **ETSI EN 300 220** — Technical requirements 868 MHz in Europe
