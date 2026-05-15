---
title: EnOcean — Batterielose Funksensoren
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
