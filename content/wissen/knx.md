---
title: KNX — Grundlagen & Inbetriebnahme
slug: knx
category: protokolle
subcategory: gebäudebus
tags: [knx, ets, gruppenadresse, telegramm, topologie, linie, bereich, backbone, tp, ip, rf, powerline, ga-schnittstelle, knxip]
difficulty: fortgeschritten
area: [ga, elektro]
related: [bacnet, modbus, knxip-gateway]
norm: [EN 50090, ISO/IEC 14543-3]
updated: 2026-05-14
lang: de
---

# KNX — Grundlagen & Inbetriebnahme

**KNX** ist der weltweite Standard für die Gebäudesystemtechnik (Licht, Jalousie, Heizung, Klima). In der GA-Welt dient KNX als dezentrales Feldbus-System — die GLT kommuniziert über ein **KNXnet/IP-Gateway** oder direkt über **KNX/IP**.

## Übertragungsmedien

| Medium        | Kürzel | Kabel / Träger           | Einsatz                              |
|---------------|--------|--------------------------|--------------------------------------|
| Twisted Pair  | TP     | 2×0,8 mm Busleitung (YCYM) | Neubau, Standardanwendung           |
| Powerline     | PL     | 230-V-Leitung             | Nachrüstung                          |
| Funk          | RF     | 868 MHz                   | Nachrüstung, Sensoren ohne Kabel     |
| IP            | IP     | Ethernet (UDP Port 3671)  | Backbone, GLT-Anbindung, KNXnet/IP   |

**Twisted Pair** ist die bei weitem häufigste Variante. Die Busleitung liefert gleichzeitig 29 V DC zur Versorgung der Geräte (max. 10 mA pro Gerät typisch).

## Topologie

```
Bereich 1 (Area)
  ├── Linie 1.1
  │     ├── Gerät 1.1.1
  │     ├── Gerät 1.1.2
  │     └── ...  (max. 64 Busteilnehmer)
  ├── Linie 1.2
  └── ...  (max. 15 Linien pro Bereich)
Bereich 2
  └── ...
(max. 15 Bereiche)
```

- **Linie:** bis zu 64 Geräte, max. 1000 m Kabellänge gesamt, max. 700 m von Speisung bis Gerät
- **Linienkoppler (LK):** verbindet Linien innerhalb eines Bereichs, filtert Telegramme
- **Bereichskoppler (BK):** verbindet Bereiche, ebenfalls mit Telegrammfilter
- **IP-Backbone:** Bereiche können über KNXnet/IP-Router zusammengeführt werden

> ⚠️ **Wichtig:** Die physikalische Adresse (z.B. `1.2.15`) ist nur für die Inbetriebnahme. Im Betrieb kommunizieren Geräte ausschliesslich über **Gruppenadressen**.

## Physikalische Adresse vs. Gruppenadresse

| Typ                   | Format       | Bedeutung                                    |
|-----------------------|--------------|----------------------------------------------|
| Physikalische Adresse | `1.2.15`     | Bereich.Linie.Gerät — für ETS-Programmierung |
| Gruppenadresse        | `1/2/50`     | Kommunikationsobjekt-Verknüpfung              |

**Idee:** Ein Taster sendet auf Gruppenadresse `1/2/50`. Alle Aktoren, die diese GA abonniert haben, reagieren. Ein Gerät kann beliebig viele GAs haben.

### Empfohlene GA-Struktur (3-stufig)

```
Hauptgruppe / Mittelgruppe / Untergruppe
1 / 2 / 50
└─ Funktion (Licht)
       └─ Raum / Zone
                └─ Kanal / Schaltpunkt
```

## Telegramm-Aufbau (Kurzfassung)

Ein KNX-TP-Telegramm besteht aus:
- **Steuerfeld** (Priorität, Repeat-Bit)
- **Quelladresse** (physikalische Adresse des Senders)
- **Zieladresse** (Gruppenadresse oder physikalische Adresse)
- **Datenfeld** (1 Bit bis 14 Bytes — abhängig vom Datenpunkt-Typ)
- **CRC** (Prüfsumme)

Max. Telegrammrate auf einer Linie: ca. **50 Telegramme/s**.

## Datenpunkt-Typen (DPT) — die wichtigsten

| DPT   | Länge  | Daten                          | Beispiel                     |
|-------|--------|--------------------------------|------------------------------|
| 1.001 | 1 Bit  | Schalten (0/1)                 | Licht Ein/Aus                |
| 1.008 | 1 Bit  | Auf/Ab                         | Jalousie                     |
| 5.001 | 1 Byte | Prozentwert 0–100 %            | Helligkeit, Ventilstellung   |
| 9.001 | 2 Byte | Gleitkomma −273…+670 °C        | Temperatur                   |
| 9.006 | 2 Byte | Gleitkomma, Pa                 | Druck                        |
| 14.x  | 4 Byte | IEEE 754 Float                 | Leistung, Energie            |
| 16.001| 14 B   | ASCII-String                   | Anzeige                      |

> ⚠️ **DPT 9.x (2-Byte Float):** Kein IEEE 754! KNX verwendet ein eigenes Format mit Mantisse + Exponent. Beim Einlesen in GLT/BACnet auf korrekte Skalierung achten.

## ETS — Engineering Tool Software

Das **ETS** (aktuell ETS6) ist das offizielle Konfigurations- und Programmierwerkzeug. Alle Geräte-Applikationen werden hier geladen, parametriert und in die Geräte gespielt.

### Typischer IBN-Ablauf

1. **Projekt anlegen** → Topologie, Linien, Geräte einfügen
2. **Produktdatenbank** (`knxpros.com`, Hersteller) → Import der Gerätedaten (`.knxprod`)
3. **Applikationsparameter** setzen (z.B. Tastenbelegung, Schaltzeiten)
4. **Gruppenadressen anlegen** (3-stufig empfohlen)
5. **Kommunikationsobjekte verknüpfen** (KO → GA)
6. **Download** über USB/TP-Schnittstelle oder KNXnet/IP-Interface
7. **Funktionstest** im ETS-Diagnosefenster (Telegrammmonitor)

**Programmierphysisch:** Lerntaste am Gerät drücken → ETS sendet physikalische Adresse → Gerät speichert.

## KNXnet/IP — GA-Anbindung

Über einen **KNXnet/IP-Router** oder eine **IP-Schnittstelle** kann die GLT auf den KNX-Bus zugreifen:

- **IP-Schnittstelle:** Tunnel-Zugang für ETS und SCADA (max. 1–4 gleichzeitige Verbindungen)
- **IP-Router:** Koppelt KNX-TP-Linie mit IP-Backbone (für grössere Anlagen)

**Protokoll:** UDP Port **3671**, Multicast-Adresse `224.0.23.12`

Gängige GLT-Anbindungen:
- OPC DA/UA-Server mit KNX-Treiber
- BACnet/IP-Gateway mit KNX-KNX-BACnet-Mapping
- Direkte SDK-Anbindung (knxd, KNXIP-Python, Weinzierl SDK)

## Diagnose & Fehlersuche

| Problem                          | Ursache / Massnahme                                         |
|----------------------------------|-------------------------------------------------------------|
| Gerät reagiert nicht             | Physikalische Adresse doppelt? Busversorgung ok?            |
| Telegramme kommen nicht an       | Koppler-Filter prüfen — GA in Filtertabelle?                |
| Sporadische Ausfälle             | Bus überlastet (>50 Telegramme/s), Terminierung fehlt       |
| Gerät lässt sich nicht flashen   | Programmiertaste gedrückt halten? IP-Schnittstelle Tunnel-Limit erreicht? |
| Kurzschluss auf Linie            | Busspeisung schaltet ab → Segment für Segment isolieren     |

**Telegrammmonitor im ETS:** Realtime-Sicht auf alle Telegramme — unverzichtbar zur Diagnose.

## Normen & Ressourcen

- **EN 50090 / ISO/IEC 14543-3** — KNX-Standard
- **KNX Association** (knx.org) — Schulungen, Produktdatenbank, ETS-Download
- **KNX Certified** — Pflicht für alle KNX-Geräte
