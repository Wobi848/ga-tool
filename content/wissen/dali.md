---
title: DALI / DALI-2 — Lichtsteuerung in der GA
title_en: DALI / DALI-2 — Lighting Control in BA
slug: dali
category: protokolle
subcategory: licht
tags:
  [
    dali,
    dali-2,
    lichtsteuerung,
    vorschaltgerät,
    evg,
    ballast,
    adressierung,
    gruppe,
    szene,
    broadcast,
    dimmen,
    arc-level,
    fade,
    notlicht,
    dt6,
    dt8,
    iec62386
  ]
difficulty: fortgeschritten
area: [ga, elektro]
related: [knx, bacnet, signaltypen, dmx512]
norm: [IEC 62386, EN 62386]
updated: 2026-10-16
lang: de
---

# DALI / DALI-2 — Lichtsteuerung in der GA

**DALI** (Digital Addressable Lighting Interface, IEC 62386) ist der Standard für die digitale Lichtsteuerung. In modernen Gebäuden verdrängt DALI analoge 0–10 V Dimmsignale und erlaubt individuelle Ansteuerung, Rückmeldung und Diagnose jedes einzelnen Leuchtmittels.

## DALI vs. 0–10 V Dimmen

| Merkmal        | 0–10 V (analog)                | DALI (digital)                           |
| -------------- | ------------------------------ | ---------------------------------------- |
| Adressierung   | Nicht möglich (alle reagieren) | Individuell (64 Adressen)                |
| Rückmeldung    | ❌                             | ✅ (Status, Fehlermeldung, Lampenfehler) |
| Szenenspeicher | Extern nötig                   | Im Gerät (bis 16 Szenen)                 |
| Verkabelung    | Polungsabhängig                | Nicht polungskritisch                    |
| Diagnose       | Keine                          | Lampenfehler, Konverterfehler meldbar    |
| Aufwand        | Gering                         | Mittel (Adressierung nötig)              |

## DALI-Topologie

Ein DALI-Controller und eine Busversorgung speisen die Zweidrahtleitung. Daran hängen bis zu 64 Betriebsgeräte mit den Kurzadressen 0 bis 63, in beliebiger Topologie ausser Ring.

| Parameter   | Wert                                                                                                      |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| Busspannung | typisch 16 V; zum Senden wird sie auf nahe 0 V gezogen. Busversorgung höchstens 250 mA                    |
| Baudrate    | 1200 baud                                                                                                 |
| Max. Geräte | **64 pro Bus-Segment**                                                                                    |
| Kabellänge  | max. 300 m (Gesamtlänge des Segments)                                                                     |
| Verdrahtung | Nicht polungskritisch, keine Schirmung nötig                                                              |
| Einstufung  | **nicht SELV**, nur basisisoliert. Darf im selben Kabel wie 230 V geführt werden, etwa im 5-adrigen Kabel |

> ⚠️ Weil DALI nicht als SELV gilt, darf es **nicht** zusammen mit SELV-Kreisen wie KNX oder 24-V-Fühlerleitungen im selben Kabel geführt werden. Siehe [SELV und PELV](/wissen/selv-pelv).

## Adressierung

### Short Address (0–63)

- Jedes Gerät bekommt eine eindeutige Adresse 0–63
- Vergabe entweder zufällig (Random-Adressierung) oder manuell
- Muss von Kommissioning-Tool (DALI-Software) durchgeführt werden

### Group Address (0–15)

- Bis zu **16 Gruppen** pro Bus
- Ein Gerät kann in mehreren Gruppen sein
- Broadcast an Gruppe: alle Geräte der Gruppe reagieren gleichzeitig
- Typisch: Gruppe 0 = Büro Nord, Gruppe 1 = Büro Süd, Gruppe 2 = Flur

### Broadcast

- Alle 64 Geräte reagieren → für Ein/Aus ganzer Bereiche

## Szenen

Jedes DALI-Gerät speichert bis zu **16 Szenen (0–15)** intern:

- Szene = gespeicherter Dimm-Level (0–254) + Fade-Zeit
- Aufruf: `Recall Scene X` → alle Geräte der adressierten Gruppe setzen gespeicherten Wert
- Typisch: Szene 0 = Präsenz (100 %), Szene 1 = Konstantlicht (60 %), Szene 2 = Abend (30 %), Szene 15 = Aus

## Dimm-Levels

DALI verwendet eine **logarithmische Skalierung** (ARC Level):

| ARC Level | Helligkeit             | Entspricht    |
| --------- | ---------------------- | ------------- |
| 0         | Aus                    |               |
| 1         | ~0,1 %                 | Minimalwert   |
| 128       | ~3 %                   | logarithmisch |
| 200       | ~23 %                  | logarithmisch |
| 254       | 100 %                  | Maximalwert   |
| 255       | MASK, «keine Änderung» | Sonderwert    |

> Die logarithmische Skalierung entspricht der menschlichen Wahrnehmung (Fechner'sches Gesetz) — gleichmässige Helligkeitsänderung beim Dimmen.

**Fade:** DALI kennt Fade-Zeit (0,7 s bis 90 s) und Fade-Rate (Schritte/s) — sanftes Dimmen ohne harte Sprünge.

## Rückmeldungen

DALI gibt dem Master Informationen zurück — das macht es gegenüber 0–10 V überlegen:

| Abfrage              | Antwort                                                      |
| -------------------- | ------------------------------------------------------------ |
| Query Status         | Lampenfehler, Konverterfehler, Notlicht aktiv, Dimmer-Fehler |
| Query Actual Level   | Aktueller Dimm-Level                                         |
| Query Power On Level | Einschalthelligkeit                                          |
| Query Groups         | In welchen Gruppen ist das Gerät?                            |
| Query Scene          | Gespeicherter Szenen-Level                                   |

## Gerätetypen (Device Types, DT)

DALI definiert verschiedene Gerätetypen für unterschiedliche Anwendungen:

| DT      | Gerätetyp                  | Anwendung                      |
| ------- | -------------------------- | ------------------------------ |
| DT0     | Fluoreszenz-Vorschaltgerät | Klassisches EVG, T8/T5         |
| DT1     | Notlicht-EVG               | Sicherheitsbeleuchtung         |
| DT3     | Niedervolt-Halogen         | Halogen-Trafo                  |
| DT4     | Glühlampen-Dimmer          | Phasenan-/-abschnitt           |
| DT5     | Konverter (1–10 V Ausgang) | Ansteuerung von 1–10-V-Geräten |
| **DT6** | LED-Treiber (dimmen)       | **Standard für moderne LED**   |
| **DT8** | Farbe / Farbtemperatur     | **Tunable White, RGB, RGBW**   |

## DALI-2 — Was ist neu?

**DALI-2** (IEC 62386 Ausgabe 2) bringt vor allem:

- **Interoperabilität:** Geräte verschiedener Hersteller müssen kompatibel sein (Zertifizierung)
- **Input Devices:** Taster, Sensoren (PIR, Lux) direkt am DALI-Bus. Sie haben einen eigenen Adressraum: Auf einer Linie sind bis zu **64 Betriebsgeräte und zusätzlich 64 Steuergeräte** möglich, sofern der Busstrom reicht
- **DALI+:** DALI-Befehle über Funk oder IP, etwa über Thread, ohne eigene Busleitung; zertifiziert von der DiiA
- **Instanzen:** Ein Gerät kann mehrere Instanzen haben (z.B. Taster mit 2 Tasten = 2 Instanzen)
- **Erweiterte Diagnose:** Mehr Statusinformationen
- **DT8 Farbe:** Standardisiert (XY, RGB, RGBW, Farbtemperatur)

## DALI in der GA-Anbindung

Die GLT kommuniziert über ein **DALI-Gateway**:

GLT über BACnet, Modbus oder KNX ↔ DALI-Gateway ↔ DALI-Linie ↔ Betriebsgeräte

Gängige Gateways (z.B. Lunatone, Osram DALI-Gateway, Schneider):

- Bilden DALI-Gruppen/Szenen/Geräte auf BACnet-Objekte oder Modbus-Register ab
- Ermöglichen Lastmanagement, Energiemessung, Fehlerdiagnose in der GLT

**Typische GA-Datenpunkte:**

| Datenpunkt          | Typ  | Beschreibung                     |
| ------------------- | ---- | -------------------------------- |
| Gruppe X Dimm-Level | Soll | 0–100 % → Gateway setzt DALI ARC |
| Gruppe X Szene      | Soll | Szene 0–15 abrufen               |
| Gruppe X Ein/Aus    | Soll | Broadcast Ein oder Aus           |
| Gerät Y Status      | Ist  | Lampenfehler, Konverterfehler    |
| Gerät Y Ist-Level   | Ist  | Tatsächliche Helligkeit          |
| Anzahl Lampenfehler | Ist  | Wartungsalarm                    |

## Notlichtfunktion (DT1)

DALI-Notlicht-EVGs (DT1) sind komplex — vollständige Selbsttests:

- **Funktionstest:** kurz, regelmässig nach Vorgabe, etwa wöchentlich oder monatlich
- **Betriebsdauertest:** jährlich über die volle Nenndauer, oft 1 oder 3 Stunden
- Testergebnisse werden im EVG gespeichert und können ausgelesen werden
- **DALI-2 Notlicht:** Ergebnis-Protokoll abrufbar für Prüfnachweis

> ⚠️ Ob eine Notbeleuchtung über DALI überwacht werden darf und wie die Prüfungen dokumentiert werden, richtet sich nach EN 50172, EN 62034 und den kantonalen Brandschutzvorgaben.

## Typische IBN-Schritte

1. DALI-Bus verkabeln (2 Adern, egal welche Polarität)
2. Alle EVGs einschalten (kurz flackern = normales Verhalten)
3. **Random-Adressierung** mit Kommissioning-Tool durchführen (alle Geräte bekommen zufällige kurze Adresse)
4. Gruppen und Szenen definieren und in Geräte flashen
5. DALI-Gateway konfigurieren (Mapping DALI-Gruppen → BACnet/Modbus)
6. Funktionstest: jede Gruppe einzeln Ein/Aus, Szenen prüfen
7. Lampenfehler simulieren (eine Lampe ziehen → Fehler-Rückmeldung?)
8. Protokoll erstellen

## Normen

- **IEC 62386** (alle Teile) — DALI Spezifikation, Gerätetypen
- **EN 62386** — Europäische Fassung
- **DiiA** (Digital Illumination Interface Alliance) — Zertifizierung, Produktliste
- **EN 62034** — Automatische Prüfsysteme für Notbeleuchtung (DALI-kompatibel)
- **Literatur:** O. Steiger, _Gebäudeautomation – effizient vernetzen_, Faktor Verlag, Zürich 2026, Kapitel 10 «Bussysteme»

<!-- EN -->

## DALI / DALI-2 — Lighting Control in BA

**DALI** (Digital Addressable Lighting Interface, IEC 62386) is the standard for digital lighting control. In modern buildings DALI displaces analogue 0–10 V dimming signals and allows individual addressing, feedback and diagnostics for every single luminaire.

## DALI vs. 0–10 V Dimming

| Feature      | 0–10 V (analogue)          | DALI (digital)                        |
| ------------ | -------------------------- | ------------------------------------- |
| Addressing   | Not possible (all respond) | Individual (64 addresses)             |
| Feedback     | No                         | Yes (status, fault, lamp failure)     |
| Scene memory | External required          | In device (up to 16 scenes)           |
| Wiring       | Polarity-sensitive         | Polarity-independent                  |
| Diagnostics  | None                       | Lamp failure, driver fault reportable |
| Effort       | Low                        | Medium (addressing required)          |

## DALI Topology

A DALI controller and a bus power supply feed the two-wire line. Up to 64 control gears with short addresses 0 to 63 are connected, in any topology except a ring.

| Parameter      | Value                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------- |
| Bus voltage    | typically 16 V; pulled to near 0 V to transmit. Bus supply at most 250 mA                       |
| Baud rate      | 1200 baud                                                                                       |
| Max. devices   | **64 per bus segment**                                                                          |
| Cable length   | max. 300 m (total segment length)                                                               |
| Wiring         | Polarity-independent, no shielding required                                                     |
| Classification | **not SELV**, basic insulation only. May run in the same cable as 230 V, e.g. in a 5-core cable |

> ⚠️ Because DALI is not SELV, it must **not** share a cable with SELV circuits such as KNX or 24 V sensor cables. See [SELV and PELV](/wissen/selv-pelv).

## Addressing

### Short Address (0–63)

- Each device receives a unique address 0–63
- Assigned either randomly (random addressing) or manually
- Must be performed by commissioning tool (DALI software)

### Group Address (0–15)

- Up to **16 groups** per bus
- A device can belong to multiple groups
- Broadcast to group: all group devices respond simultaneously
- Typical: group 0 = office north, group 1 = office south, group 2 = corridor

### Broadcast

- All 64 devices respond → for switching entire areas on/off

## Scenes

Each DALI device stores up to **16 scenes (0–15)** internally:

- Scene = stored dim level (0–254) + fade time
- Recall: `Recall Scene X` → all addressed group devices set their stored value
- Typical: scene 0 = presence (100 %), scene 1 = constant light (60 %), scene 2 = evening (30 %), scene 15 = off

## Dim Levels

DALI uses a **logarithmic scale** (ARC level):

| ARC Level | Brightness        | Note          |
| --------- | ----------------- | ------------- |
| 0         | Off               |               |
| 1         | ~0.1 %            | Minimum value |
| 128       | ~3 %              | Logarithmic   |
| 200       | ~23 %             | Logarithmic   |
| 254       | 100 %             | Maximum value |
| 255       | MASK, "no change" | Special value |

> The logarithmic scale matches human perception (Fechner's law) — even brightness change during dimming.

**Fade:** DALI supports fade time (0.7 s to 90 s) and fade rate (steps/s) — smooth dimming without hard jumps.

## Feedback

DALI returns information to the master — this makes it superior to 0–10 V:

| Query                | Response                                                         |
| -------------------- | ---------------------------------------------------------------- |
| Query Status         | Lamp failure, driver fault, emergency light active, dimmer fault |
| Query Actual Level   | Current dim level                                                |
| Query Power On Level | Switch-on brightness                                             |
| Query Groups         | Which groups does the device belong to?                          |
| Query Scene          | Stored scene level                                               |

## Device Types (DT)

DALI defines various device types for different applications:

| DT      | Device type                 | Application                  |
| ------- | --------------------------- | ---------------------------- |
| DT0     | Fluorescent ballast         | Classic ballast, T8/T5       |
| DT1     | Emergency light ballast     | Safety lighting              |
| DT3     | Low-voltage halogen         | Halogen transformer          |
| DT4     | Incandescent dimmer         | Phase cut                    |
| DT5     | Converter (1–10 V output)   | Driving 1–10 V devices       |
| **DT6** | LED driver (dimming)        | **Standard for modern LED**  |
| **DT8** | Colour / colour temperature | **Tunable White, RGB, RGBW** |

## DALI-2 — What's New?

**DALI-2** (IEC 62386 edition 2) primarily adds:

- **Interoperability:** Devices from different manufacturers must be compatible (certification)
- **Input devices:** push buttons, sensors (PIR, lux) directly on the DALI bus. They have their own address space: a line can hold up to **64 control gear plus 64 control devices**, provided the bus current is sufficient
- **DALI+:** DALI commands over radio or IP, for example over Thread, without a dedicated bus line; certified by the DiiA
- **Instances:** One device can have multiple instances (e.g. pushbutton with 2 buttons = 2 instances)
- **Extended diagnostics:** More status information
- **DT8 colour:** Standardised (XY, RGB, RGBW, colour temperature)

## DALI in BA Integration

The BMS communicates via a **DALI gateway**:

BMS via BACnet, Modbus or KNX ↔ DALI gateway ↔ DALI line ↔ control gear

Common gateways (e.g. Lunatone, Osram DALI gateway, Schneider):

- Map DALI groups/scenes/devices to BACnet objects or Modbus registers
- Enable load management, energy measurement, fault diagnostics in the BMS

**Typical BA data points:**

| Data point            | Type     | Description                     |
| --------------------- | -------- | ------------------------------- |
| Group X dim level     | Setpoint | 0–100 % → gateway sets DALI ARC |
| Group X scene         | Setpoint | Recall scene 0–15               |
| Group X on/off        | Setpoint | Broadcast on or off             |
| Device Y status       | Actual   | Lamp failure, driver fault      |
| Device Y actual level | Actual   | Current brightness              |
| Lamp fault count      | Actual   | Maintenance alarm               |

## Emergency Lighting (DT1)

DALI emergency lighting ballasts (DT1) are complex — full self-testing:

- **Function test:** short, regularly as required, for example weekly or monthly
- **Duration test:** annually over the full rated duration, often 1 or 3 hours
- Test results stored in the ballast and can be read out
- **DALI-2 emergency lighting:** Result log retrievable for inspection record

> ⚠️ Whether emergency lighting may be monitored via DALI and how tests are documented follows EN 50172, EN 62034 and the cantonal fire protection requirements.

## Typical Commissioning Steps

1. Wire DALI bus (2 conductors, any polarity)
2. Power up all ballasts (brief flickering = normal behaviour)
3. Perform **random addressing** with commissioning tool (all devices receive random short address)
4. Define groups and scenes and flash to devices
5. Configure DALI gateway (map DALI groups → BACnet/Modbus)
6. Functional test: each group individually on/off, verify scenes
7. Simulate lamp fault (remove one lamp → fault feedback?)
8. Create test record

## Standards

- **IEC 62386** (all parts) — DALI specification, device types
- **EN 62386** — European version
- **DiiA** (Digital Illumination Interface Alliance) — certification, product list
- **EN 62034** — Automatic test systems for emergency lighting (DALI-compatible)
- **Further reading:** O. Steiger, _Gebäudeautomation – effizient vernetzen_ (in German), Faktor Verlag, Zurich 2026, chapter 10 "Bussysteme"
