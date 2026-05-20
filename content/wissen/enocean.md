---
title: EnOcean — Batterielose Funksensoren
title_en: EnOcean — Battery-Free Wireless Sensors
slug: enocean
category: protokolle
subcategory: funk
tags: [enocean, batterielos, energy-harvesting, funk, 868mhz, esp3, eep, taster, temperatursensor, fensterkontakt, präsenz, teach-in, eltako, omnio]
difficulty: grundlagen
area: [ga, elektro]
related: [knx, bacnet, signaltypen]
norm: [ISO/IEC 14543-3-1X, EN 300 220]
updated: 2026-05-14
lang: de
---

# EnOcean — Batterielose Funksensoren

**EnOcean** (ISO/IEC 14543-3-1X) ist ein Funkprotokoll für **batterielose, wartungsfreie Sensoren**. Die Energie für Funk-Telegramme wird direkt aus der Umgebung gewonnen — aus Tastendruck, Licht oder Temperaturdifferenz. In der GA weit verbreitet für Taster, Fensterkontakte, Raumfühler und Präsenzmelder.

## Energy Harvesting — Woher kommt der Strom?

| Quelle              | Mechanismus                              | Typische Anwendung              |
|---------------------|------------------------------------------|---------------------------------|
| **Piezo (Druck)**   | Tastendruck erzeugt Spannung (~50 µJ)    | Lichtschalter, Taster           |
| **Photovoltaik**    | Kleines Solarpanel (Innenraum reicht)    | Raumfühler, CO₂-Sensor          |
| **Temperaturdifferenz (TEG)** | Peltier-Element auf Heizkörper | Heizkörperthermostat         |
| **Induktion / Magnetfeld** | Bewegung in Magnetfeld          | Fensterkontakt (Magnetschalter) |

> Pro Tastendruck werden ~4 Funk-Telegramme gesendet. Die Energie reicht gerade für diese 4 Telegramme — dann ist der Kondensator leer bis zur nächsten Betätigung.

## Technische Spezifikationen

| Parameter         | Wert                              |
|-------------------|-----------------------------------|
| Frequenz          | 868,3 MHz (Europa), 315/902 MHz (USA) |
| Reichweite        | 30 m (innen), 300 m (freies Feld) |
| Telegramm-Länge   | 14 Bytes (kurz und kompakt)       |
| Protokoll-Stack   | ESP3 (EnOcean Serial Protocol v3) |
| Verschlüsselung   | AES-128 (Security Profile)        |
| ID-Länge          | 32 Bit (4 Milliarden Adressen)    |

## Teach-In (Anlernvorgang)

Jeder EnOcean-Sender hat eine einmalige **32-bit-ID** (auf Gerät aufgedruckt). Empfänger (Gateway, DDC) muss die ID lernen:

### UTE (Universal Teach-In)

Neueres Verfahren, bidirektional:
1. Empfänger in Teach-In-Modus versetzen
2. Sender betätigen (Taste drücken oder Teach-In-Taste)
3. Empfänger bestätigt automatisch
4. Sensor sendet EEP-Information (Datenformat) mit — kein manuelles EEP-Konfigurieren nötig

### 1BS / 4BS Teach-In (älter)

Einweg-Anlernvorgang — Empfänger empfängt ID, EEP muss manuell konfiguriert werden.

## EEP — EnOcean Equipment Profiles

Das **EEP** definiert das Datenformat eines Sensors. Jedes Gerät hat ein EEP-Profil (z.B. A5-02-05).

**Format:** `XX-XX-XX` (Rorg-Func-Type)

### Häufige EEP-Profile

| EEP       | Beschreibung                                    |
|-----------|-------------------------------------------------|
| F6-02-01  | 2-Kanal-Taster (Rocker Switch)                  |
| F6-10-00  | Fensterkontakt (offen/geschlossen)              |
| A5-02-05  | Temperatursensor −40…+60 °C                     |
| A5-04-01  | Temperatur + Feuchte                            |
| A5-06-01  | Helligkeitssensor 300–30000 Lux                 |
| A5-07-01  | Präsenzmelder                                   |
| A5-09-04  | CO₂-Sensor + Temperatur                         |
| D2-01-0E  | Schaltaktor mit Energiemessung (2-Wege!)        |
| A5-20-01  | HVAC-Aktor (Stellantrieb, Raumtemperatur)       |

## Empfänger / Gateway

EnOcean-Signale brauchen einen **Empfänger** der die Funk-Telegramme in ein verdrahtetes Protokoll übersetzt:

| Typ                    | Beschreibung                                         |
|------------------------|------------------------------------------------------|
| **USB-Gateway**        | Empfänger als USB-Stick, PC/Server liest aus         |
| **Serielle Schnittstelle** | RS-232/RS-485 Gateway, an DDC angeschlossen      |
| **IP-Gateway**         | Ethernet-Empfänger, REST/MQTT API, an GLT            |
| **KNX-Gateway**        | Übersetzt EnOcean → KNX-Telegramme                  |
| **BACnet-Gateway**     | Übersetzt EnOcean → BACnet-Objekte                  |
| **Integriert in DDC**  | Manche Automationsstationen haben EnOcean-Modul      |

**Hersteller:** Eltako (am häufigsten in CH/DE), Omnio, Weinzierl, PEHA, HORA

## EnOcean in der GA-Praxis

### Typische Anwendungen

| Anwendung               | EnOcean-Gerät             | Vorteil gegenüber Kabel          |
|-------------------------|---------------------------|----------------------------------|
| Raumtemperaturfühler    | Multisensor T/RH/CO₂      | Keine Verdrahtung in Altbau      |
| Lichtschalter           | Taster (Piezo)            | Keine Unterputzdose nötig        |
| Fensterkontakt          | Magnetkontakt             | Nachrüstung ohne Kabelkanal      |
| Präsenzmelder           | PIR-Sender                | Flexibel platzierbar             |
| Heizkörperthermostat    | Stellantrieb (TEG)        | Heizungsenergie = Eigenstrom     |
| Beschattungssteuerung   | Sonnensensor              | Dach ohne Kabel                  |

### Systemintegration

```
EnOcean-Sensor (868 MHz)
    ↓ Funk
EnOcean-Gateway (z.B. Eltako FAM14)
    ↓ RS-485 / Modbus oder proprietär
DDC / GLT
```

Viele Systeme (KNX, BACnet) unterstützen EnOcean direkt via Gateway — kein separates EnOcean-System nötig.

## Sicherheit (EnOcean Security)

Standardmässig sendet EnOcean **unverschlüsselt** — jeder kann zuhören und theoretisch Telegramme imitieren.

**EnOcean Security Level 3:** AES-128-CCM-Verschlüsselung + Rolling Code (verhindert Replay-Angriffe). Aktivierbar auf unterstützten Geräten.

> Für sicherheitskritische Anwendungen (Zutrittskontrolle, Alarmanlage) nur SecurityLevel-3-Geräte verwenden oder auf verdrahtete Systeme setzen.

## Reichweite & Probleme

| Problem                        | Ursache                             | Massnahme                           |
|--------------------------------|-------------------------------------|-------------------------------------|
| Sensor wird nicht empfangen    | Entfernung, Wände, Metallhindernisse | Repeater einsetzen                  |
| Sporadische Ausfälle           | Interferenzen 868 MHz (Zigbee, Z-Wave) | Frequenz-Scan, Position ändern   |
| Teach-In schlägt fehl          | Empfänger zu weit weg               | Für Anlernvorgang näher heranführen |
| Falsches EEP konfiguriert      | Werte werden falsch interpretiert    | EEP auf Geräteetikette prüfen      |
| Helligkeitssensor funktioniert nicht | Zu dunkel (Solar-Harvesting!) | Mindesthelligkeit beachten (~200 Lux) |

### EnOcean Repeater

- Leitet Telegramme weiter (Reichweite verdoppeln)
- Max. **2 Hops** (2 Repeater in Reihe) erlaubt — mehr würde Übertragungsdauer zu lang machen
- Repeater brauchen eigene Stromversorgung (230 V), sind selbst keine Sensoren

## Normen

- **ISO/IEC 14543-3-1X** — EnOcean-Protokoll-Standard
- **EN 300 220** — Funkanforderungen 868 MHz (Europa)
- **EnOcean Alliance** (enocean-alliance.org) — Produktdatenbank, EEP-Dokumente, Zertifizierung

<!-- EN -->

**EnOcean** (ISO/IEC 14543-3-1X) is a wireless protocol for **battery-free, maintenance-free sensors**. The energy for radio telegrams is harvested directly from the environment — from a button press, light, or a temperature differential. Widely used in BA for push-buttons, window contacts, room sensors, and presence detectors.

## Energy Harvesting — Where Does the Power Come From?

| Source | Mechanism | Typical application |
|--------|-----------|-------------------|
| **Piezo (pressure)** | Button press generates voltage (~50 µJ) | Light switches, push-buttons |
| **Photovoltaic** | Small solar panel (indoor light is sufficient) | Room sensors, CO₂ sensor |
| **Temperature differential (TEG)** | Peltier element on radiator | Radiator thermostat |
| **Induction / magnetic field** | Movement in magnetic field | Window contact (reed switch) |

> Each button press sends ~4 radio telegrams. The energy is just sufficient for these 4 telegrams — then the capacitor is empty until the next actuation.

## Technical Specifications

| Parameter | Value |
|-----------|-------|
| Frequency | 868.3 MHz (Europe), 315/902 MHz (USA) |
| Range | 30 m (indoors), 300 m (open field) |
| Telegram length | 14 bytes (short and compact) |
| Protocol stack | ESP3 (EnOcean Serial Protocol v3) |
| Encryption | AES-128 (Security Profile) |
| ID length | 32 bit (4 billion addresses) |

## Teach-In (Pairing)

Every EnOcean transmitter has a unique **32-bit ID** (printed on the device). The receiver (gateway, DDC) must learn the ID:

### UTE (Universal Teach-In)

Newer method, bidirectional:
1. Put receiver into teach-in mode
2. Actuate transmitter (press button or teach-in key)
3. Receiver confirms automatically
4. Sensor transmits EEP information (data format) — no manual EEP configuration required

### 1BS / 4BS Teach-In (older)

One-way pairing — receiver receives ID; EEP must be configured manually.

## EEP — EnOcean Equipment Profiles

The **EEP** defines the data format of a sensor. Every device has an EEP profile (e.g. A5-02-05).

**Format:** `XX-XX-XX` (Rorg-Func-Type)

### Common EEP Profiles

| EEP | Description |
|-----|------------|
| F6-02-01 | 2-channel push-button (rocker switch) |
| F6-10-00 | Window contact (open/closed) |
| A5-02-05 | Temperature sensor −40…+60 °C |
| A5-04-01 | Temperature + humidity |
| A5-06-01 | Light sensor 300–30,000 lux |
| A5-07-01 | Presence detector |
| A5-09-04 | CO₂ sensor + temperature |
| D2-01-0E | Switching actuator with energy metering (2-way!) |
| A5-20-01 | HVAC actuator (valve drive, room temperature) |

## Receivers / Gateways

EnOcean signals require a **receiver** that translates radio telegrams into a wired protocol:

| Type | Description |
|------|------------|
| **USB gateway** | Receiver as USB stick, read by PC/server |
| **Serial interface** | RS-232/RS-485 gateway, connected to DDC |
| **IP gateway** | Ethernet receiver, REST/MQTT API, for BMS |
| **KNX gateway** | Translates EnOcean → KNX telegrams |
| **BACnet gateway** | Translates EnOcean → BACnet objects |
| **Integrated in DDC** | Some automation stations have an EnOcean module |

**Manufacturers:** Eltako (most common in CH/DE), Omnio, Weinzierl, PEHA, HORA

## EnOcean in BA Practice

### Typical Applications

| Application | EnOcean device | Advantage over cable |
|-------------|---------------|---------------------|
| Room temperature sensor | Multi-sensor T/RH/CO₂ | No wiring in existing buildings |
| Light switch | Push-button (piezo) | No flush-mounted box required |
| Window contact | Reed switch | Retrofit without cable trunking |
| Presence detector | PIR transmitter | Flexible placement |
| Radiator thermostat | Valve actuator (TEG) | Heating energy = self-powered |
| Shading control | Sun sensor | Roof without cables |

### System Integration

```
EnOcean sensor (868 MHz)
    ↓ Radio
EnOcean gateway (e.g. Eltako FAM14)
    ↓ RS-485 / Modbus or proprietary
DDC / BMS
```

Many systems (KNX, BACnet) support EnOcean directly via gateway — no separate EnOcean system required.

## Security (EnOcean Security)

By default EnOcean transmits **unencrypted** — anyone can listen and theoretically imitate telegrams.

**EnOcean Security Level 3:** AES-128-CCM encryption + rolling code (prevents replay attacks). Activatable on supported devices.

> For safety-critical applications (access control, alarm systems) use only Security Level 3 devices or opt for wired systems.

## Range and Issues

| Problem | Cause | Remedy |
|---------|-------|--------|
| Sensor not received | Distance, walls, metal obstacles | Use repeater |
| Sporadic dropouts | Interference at 868 MHz (Zigbee, Z-Wave) | Frequency scan, change position |
| Teach-in fails | Receiver too far away | Bring closer for pairing |
| Wrong EEP configured | Values interpreted incorrectly | Check EEP on device label |
| Light sensor not working | Too dark (solar harvesting!) | Observe minimum illuminance (~200 lux) |

### EnOcean Repeater

- Relays telegrams (doubles range)
- Max. **2 hops** (2 repeaters in series) allowed — more would make transmission time too long
- Repeaters require their own power supply (230 V); they are not sensors themselves

## Standards

- **ISO/IEC 14543-3-1X** — EnOcean protocol standard
- **EN 300 220** — Radio requirements 868 MHz (Europe)
- **EnOcean Alliance** (enocean-alliance.org) — product database, EEP documents, certification
