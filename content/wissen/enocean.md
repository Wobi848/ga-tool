---
title: EnOcean — Batterielose Funksensoren
title_en: EnOcean — Battery-Free Wireless Sensors
slug: enocean
category: protokolle
subcategory: funk
tags:
  [
    enocean,
    batterielos,
    energy-harvesting,
    funk,
    868mhz,
    esp3,
    eep,
    taster,
    temperatursensor,
    fensterkontakt,
    präsenz,
    teach-in,
    eltako,
    omnio
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [knx, bacnet, signaltypen]
norm: [ISO/IEC 14543-3-1X, EN 300 220]
updated: 2026-10-14
lang: de
---

# EnOcean — Batterielose Funksensoren

**EnOcean** (ISO/IEC 14543-3-1X) ist ein Funkprotokoll für **batterielose, wartungsfreie Sensoren**. Die Energie für Funk-Telegramme wird direkt aus der Umgebung gewonnen — aus Tastendruck, Licht oder Temperaturdifferenz. In der GA weit verbreitet für Taster, Fensterkontakte, Raumfühler und Präsenzmelder.

## Energy Harvesting — Woher kommt der Strom?

| Quelle                          | Mechanismus                                      | Typische Anwendung     |
| ------------------------------- | ------------------------------------------------ | ---------------------- |
| **Elektrodynamisch**            | Tastendruck bewegt einen Magneten in einer Spule | Lichtschalter, Taster  |
| **Photovoltaik**                | Kleines Solarpanel (Innenraum reicht)            | Raumfühler, CO₂-Sensor |
| **Temperaturdifferenz (TEG)**   | Peltier-Element auf Heizkörper                   | Heizkörperthermostat   |
| **Photovoltaik + Reed-Kontakt** | Solarzelle speist, Magnet schaltet den Kontakt   | Fensterkontakt         |

> Beim Drücken und beim Loslassen wird je ein Telegramm gesendet, mehrfach wiederholt. Die Energie aus der Bewegung reicht genau dafür.

## Technische Spezifikationen

| Parameter          | Wert                                                            |
| ------------------ | --------------------------------------------------------------- |
| Frequenz           | 868,3 MHz (Europa), 315/902 MHz (USA)                           |
| Reichweite         | 30 m (innen), 300 m (freies Feld)                               |
| Telegramm-Länge    | 14 Bytes (kurz und kompakt)                                     |
| Host-Schnittstelle | ESP3 (EnOcean Serial Protocol 3) zwischen Funkmodul und Gateway |
| Verschlüsselung    | AES-128 (Security Profile)                                      |
| ID-Länge           | 32 Bit (4 Milliarden Adressen)                                  |

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

| EEP      | Beschreibung                              |
| -------- | ----------------------------------------- |
| F6-02-01 | 2-Kanal-Taster (Rocker Switch)            |
| D5-00-01 | Fensterkontakt (offen/geschlossen)        |
| F6-10-00 | Fenstergriff (offen, gekippt, zu)         |
| A5-02-05 | Temperatursensor 0…+40 °C                 |
| A5-04-01 | Temperatur + Feuchte                      |
| A5-06-01 | Helligkeitssensor 300–60000 lx            |
| A5-07-01 | Präsenzmelder                             |
| A5-09-04 | CO₂-Sensor + Temperatur                   |
| D2-01-0E | Schaltaktor mit Energiemessung (2-Wege!)  |
| A5-20-01 | HVAC-Aktor (Stellantrieb, Raumtemperatur) |

## Empfänger / Gateway

EnOcean-Signale brauchen einen **Empfänger** der die Funk-Telegramme in ein verdrahtetes Protokoll übersetzt:

| Typ                        | Beschreibung                                    |
| -------------------------- | ----------------------------------------------- |
| **USB-Gateway**            | Empfänger als USB-Stick, PC/Server liest aus    |
| **Serielle Schnittstelle** | RS-232/RS-485 Gateway, an DDC angeschlossen     |
| **IP-Gateway**             | Ethernet-Empfänger, REST/MQTT API, an GLT       |
| **KNX-Gateway**            | Übersetzt EnOcean → KNX-Telegramme              |
| **BACnet-Gateway**         | Übersetzt EnOcean → BACnet-Objekte              |
| **Integriert in DDC**      | Manche Automationsstationen haben EnOcean-Modul |

**Hersteller:** Eltako (am häufigsten in CH/DE), Omnio, Weinzierl, PEHA, HORA

## EnOcean in der GA-Praxis

### Typische Anwendungen

| Anwendung             | EnOcean-Gerät        | Vorteil gegenüber Kabel      |
| --------------------- | -------------------- | ---------------------------- |
| Raumtemperaturfühler  | Multisensor T/RH/CO₂ | Keine Verdrahtung in Altbau  |
| Lichtschalter         | Taster (Piezo)       | Keine Unterputzdose nötig    |
| Fensterkontakt        | Magnetkontakt        | Nachrüstung ohne Kabelkanal  |
| Präsenzmelder         | PIR-Sender           | Flexibel platzierbar         |
| Heizkörperthermostat  | Stellantrieb (TEG)   | Heizungsenergie = Eigenstrom |
| Beschattungssteuerung | Sonnensensor         | Dach ohne Kabel              |

### Systemintegration

EnOcean-Sensor (868 MHz, Funk) → Gateway, etwa mit RS-485, Modbus oder IP → DDC oder GLT

Viele Systeme (KNX, BACnet) unterstützen EnOcean direkt via Gateway — kein separates EnOcean-System nötig.

## Sicherheit (EnOcean Security)

Standardmässig sendet EnOcean **unverschlüsselt** — jeder kann zuhören und theoretisch Telegramme imitieren.

**EnOcean Security:** AES-128-Verschlüsselung, Authentisierung mit CMAC und Rolling Code gegen Replay-Angriffe. Nur auf Geräten verfügbar, die es unterstützen, und muss beim Anlernen eingerichtet werden.

> Für sicherheitskritische Anwendungen wie Zutrittskontrolle oder Einbruchmeldung nur gesicherte Geräte verwenden oder verdrahtete Systeme.

## Reichweite & Probleme

| Problem                              | Ursache                                                                             | Massnahme                             |
| ------------------------------------ | ----------------------------------------------------------------------------------- | ------------------------------------- |
| Sensor wird nicht empfangen          | Entfernung, Wände, Metallhindernisse                                                | Repeater einsetzen                    |
| Sporadische Ausfälle                 | Störungen durch andere Funksysteme im 868-MHz-Band, etwa Z-Wave oder Wireless M-Bus | Frequenz-Scan, Position ändern        |
| Teach-In schlägt fehl                | Empfänger zu weit weg                                                               | Für Anlernvorgang näher heranführen   |
| Falsches EEP konfiguriert            | Werte werden falsch interpretiert                                                   | EEP auf Geräteetikette prüfen         |
| Helligkeitssensor funktioniert nicht | Zu dunkel (Solar-Harvesting!)                                                       | Mindesthelligkeit beachten (~200 Lux) |

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

| Source                             | Mechanism                                        | Typical application          |
| ---------------------------------- | ------------------------------------------------ | ---------------------------- |
| **Electrodynamic**                 | button press moves a magnet in a coil            | Light switches, push-buttons |
| **Photovoltaic**                   | Small solar panel (indoor light is sufficient)   | Room sensors, CO₂ sensor     |
| **Temperature differential (TEG)** | Peltier element on radiator                      | Radiator thermostat          |
| **Photovoltaic + reed contact**    | solar cell supplies, magnet operates the contact | Window contact               |

> One telegram is sent on pressing and one on releasing, each repeated several times. The energy from the movement is just enough for that.

## Technical Specifications

| Parameter       | Value                                                             |
| --------------- | ----------------------------------------------------------------- |
| Frequency       | 868.3 MHz (Europe), 315/902 MHz (USA)                             |
| Range           | 30 m (indoors), 300 m (open field)                                |
| Telegram length | 14 bytes (short and compact)                                      |
| Host interface  | ESP3 (EnOcean Serial Protocol 3) between radio module and gateway |
| Encryption      | AES-128 (Security Profile)                                        |
| ID length       | 32 bit (4 billion addresses)                                      |

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

| EEP      | Description                                      |
| -------- | ------------------------------------------------ |
| F6-02-01 | 2-channel push-button (rocker switch)            |
| D5-00-01 | Window contact (open/closed)                     |
| F6-10-00 | Window handle (open, tilted, closed)             |
| A5-02-05 | Temperature sensor 0…+40 °C                      |
| A5-04-01 | Temperature + humidity                           |
| A5-06-01 | Light sensor 300–60,000 lux                      |
| A5-07-01 | Presence detector                                |
| A5-09-04 | CO₂ sensor + temperature                         |
| D2-01-0E | Switching actuator with energy metering (2-way!) |
| A5-20-01 | HVAC actuator (valve drive, room temperature)    |

## Receivers / Gateways

EnOcean signals require a **receiver** that translates radio telegrams into a wired protocol:

| Type                  | Description                                     |
| --------------------- | ----------------------------------------------- |
| **USB gateway**       | Receiver as USB stick, read by PC/server        |
| **Serial interface**  | RS-232/RS-485 gateway, connected to DDC         |
| **IP gateway**        | Ethernet receiver, REST/MQTT API, for BMS       |
| **KNX gateway**       | Translates EnOcean → KNX telegrams              |
| **BACnet gateway**    | Translates EnOcean → BACnet objects             |
| **Integrated in DDC** | Some automation stations have an EnOcean module |

**Manufacturers:** Eltako (most common in CH/DE), Omnio, Weinzierl, PEHA, HORA

## EnOcean in BA Practice

### Typical Applications

| Application             | EnOcean device        | Advantage over cable            |
| ----------------------- | --------------------- | ------------------------------- |
| Room temperature sensor | Multi-sensor T/RH/CO₂ | No wiring in existing buildings |
| Light switch            | Push-button (piezo)   | No flush-mounted box required   |
| Window contact          | Reed switch           | Retrofit without cable trunking |
| Presence detector       | PIR transmitter       | Flexible placement              |
| Radiator thermostat     | Valve actuator (TEG)  | Heating energy = self-powered   |
| Shading control         | Sun sensor            | Roof without cables             |

### System Integration

EnOcean sensor (868 MHz, radio) → gateway, e.g. with RS-485, Modbus or IP → DDC or BMS

Many systems (KNX, BACnet) support EnOcean directly via gateway — no separate EnOcean system required.

## Security (EnOcean Security)

By default EnOcean transmits **unencrypted** — anyone can listen and theoretically imitate telegrams.

**EnOcean Security:** AES-128 encryption, authentication with CMAC and a rolling code against replay attacks. Only available on devices that support it, and must be set up during teach-in.

> For security-critical applications such as access control or intrusion detection use only secured devices, or wired systems.

## Range and Issues

| Problem                  | Cause                                                                                    | Remedy                                 |
| ------------------------ | ---------------------------------------------------------------------------------------- | -------------------------------------- |
| Sensor not received      | Distance, walls, metal obstacles                                                         | Use repeater                           |
| Sporadic dropouts        | Interference from other radio systems in the 868 MHz band, e.g. Z-Wave or wireless M-Bus | Frequency scan, change position        |
| Teach-in fails           | Receiver too far away                                                                    | Bring closer for pairing               |
| Wrong EEP configured     | Values interpreted incorrectly                                                           | Check EEP on device label              |
| Light sensor not working | Too dark (solar harvesting!)                                                             | Observe minimum illuminance (~200 lux) |

### EnOcean Repeater

- Relays telegrams (doubles range)
- Max. **2 hops** (2 repeaters in series) allowed — more would make transmission time too long
- Repeaters require their own power supply (230 V); they are not sensors themselves

## Standards

- **ISO/IEC 14543-3-1X** — EnOcean protocol standard
- **EN 300 220** — Radio requirements 868 MHz (Europe)
- **EnOcean Alliance** (enocean-alliance.org) — product database, EEP documents, certification
