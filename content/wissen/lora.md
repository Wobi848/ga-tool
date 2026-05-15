---
title: LoRa / LoRaWAN — Long Range IoT für GA
slug: lora
category: protokolle
subcategory: funk
tags: [lora, lorawan, long-range, low-power, lpwan, the-things-network, ttn, gateway, end-device, classes-a-b-c, spreading-factor, chirp, fernzähler, campus, aussenklima, sf, abp, otaa]
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

| Begriff     | Beschreibung                                            |
|-------------|---------------------------------------------------------|
| **LoRa**    | Physikalische Funkschicht (Modulationsverfahren: Chirp Spread Spectrum) |
| **LoRaWAN** | Netzwerkprotokoll (MAC-Layer) über LoRa               |
| **TTN**     | The Things Network — kostenfreie LoRaWAN Community-Infrastruktur |

---

## Technische Parameter

| Parameter           | Wert                                      |
|---------------------|-------------------------------------------|
| Frequenz (EU)       | 868 MHz (EU863-870)                       |
| Frequenz (US)       | 915 MHz                                   |
| Reichweite (Stadt)  | 1–5 km                                    |
| Reichweite (offen)  | 10–15 km (bis 40 km mit Antennenhöhe)     |
| Datenrate           | 0.3–50 kbps (je nach Spreading Factor)    |
| Spreading Factor    | SF7 (schnell, kurz) bis SF12 (langsam, weit) |
| Sendeleistung       | max. 25 mW (EU)                           |
| Batterielebensdauer | Monate bis Jahre                          |
| Paketgrösse         | max. 242 Bytes (SF7), ~51 Bytes (SF12)    |

### Spreading Factor (SF)

| SF  | Reichweite | Datenrate | Luftzeit    | Einsatz                |
|-----|------------|-----------|-------------|------------------------|
| SF7 | Kurz       | 5.5 kbps  | ~61 ms      | Dichte urbane Umgebung |
| SF9 | Mittel     | 1.76 kbps | ~186 ms     | Standard               |
| SF12| Lang       | 0.3 kbps  | ~2.8 s      | Keller, extreme Reichweite |

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

| Klasse   | Downlink (Server → Gerät)      | Einsatz                          |
|----------|-------------------------------|----------------------------------|
| **A**    | Nur nach Uplink (schlafen!)   | Sensoren, Zähler (sehr stromsparend) |
| **B**    | Geplante Empfangsfenster       | Wenn gelegentlich Steuerung nötig |
| **C**    | Dauerempfang                   | Aktoren, Schaltungen (Netzbetrieb) |

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

| Merkmal            | LoRaWAN               | Zigbee               | M-Bus (wireless)     | NB-IoT               |
|--------------------|----------------------|----------------------|----------------------|----------------------|
| Reichweite         | 1–15 km              | 30 m (Mesh)          | 30 m                 | 10 km                |
| Batterie (Jahre)   | 2–10                 | 0.5–2                | 2–5                  | 1–3                  |
| Datenrate          | 0.3–50 kbps          | 250 kbps             | 32 kbps              | 200 kbps             |
| Aktualisierungsrate | Min.–Std.           | Sekunden             | Min.                 | Min.–Std.            |
| Infrastruktur      | Gateway nötig        | Coordinator          | Zähler               | Mobilfunknetz        |
| Kosten Betrieb     | Niedrig (TTN free)   | Niedrig              | Niedrig              | Laufende Kosten      |

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
