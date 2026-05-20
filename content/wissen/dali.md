---
title: DALI / DALI-2 — Lichtsteuerung in der GA
title_en: DALI / DALI-2 — Lighting Control in BA
slug: dali
category: protokolle
subcategory: licht
tags: [dali, dali-2, lichtsteuerung, vorschaltgerät, evg, ballast, adressierung, gruppe, szene, broadcast, dimmen, arc-level, fade, notlicht, dt6, dt8, iec62386]
difficulty: fortgeschritten
area: [ga, elektro]
related: [knx, bacnet, signaltypen, dmx512]
norm: [IEC 62386, EN 62386]
updated: 2026-05-14
lang: de
---

# DALI / DALI-2 — Lichtsteuerung in der GA

**DALI** (Digital Addressable Lighting Interface, IEC 62386) ist der Standard für die digitale Lichtsteuerung. In modernen Gebäuden verdrängt DALI analoge 0–10 V Dimmsignale und erlaubt individuelle Ansteuerung, Rückmeldung und Diagnose jedes einzelnen Leuchtmittels.

## DALI vs. 0–10 V Dimmen

| Merkmal               | 0–10 V (analog)         | DALI (digital)                         |
|-----------------------|-------------------------|----------------------------------------|
| Adressierung          | Nicht möglich (alle reagieren) | Individuell (64 Adressen)         |
| Rückmeldung           | ❌                       | ✅ (Status, Fehlermeldung, Lampenfehler) |
| Szenenspeicher        | Extern nötig             | Im Gerät (bis 16 Szenen)              |
| Verkabelung           | Polungsabhängig          | Nicht polungskritisch                  |
| Diagnose              | Keine                    | Lampenfehler, Konverterfehler meldbar  |
| Aufwand               | Gering                   | Mittel (Adressierung nötig)            |

## DALI-Topologie

```
DALI-Controller (Master) ───── DALI-Bus (2-Draht)
                                  ├── EVG 1 (Adresse 0)
                                  ├── EVG 2 (Adresse 1)
                                  ├── EVG 3 (Adresse 2)
                                  └── ... bis 64 Geräte
```

| Parameter           | Wert                                   |
|---------------------|----------------------------------------|
| Busspannung         | 16 V (Leerlauf), Strom moduliert       |
| Baudrate            | 1200 baud                              |
| Max. Geräte         | **64 pro Bus-Segment**                 |
| Kabellänge          | max. 300 m (Gesamtlänge des Segments)  |
| Verdrahtung         | Nicht polungskritisch, keine Schirmung nötig |
| Kann auf SELV-Kabel | ✅ (kein eigener Kabeltyp nötig)       |

> ⚠️ DALI-Bus kann auf bestehenden SELV-Steuerleitungen mitgeführt werden — aber: nicht auf denselben Adern wie 230 V oder andere Busse!

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

| ARC Level | Helligkeit | Entspricht |
|-----------|-----------|------------|
| 0         | Aus       |            |
| 1         | ~0,1 %    | Minimalwert |
| 128       | ~10 %     | Logarithmisch |
| 200       | ~40 %     | Logarithmisch |
| 254       | 100 %     | Maximalwert |
| 255       | Letzter gespeicherter Wert | Sonderfall |

> Die logarithmische Skalierung entspricht der menschlichen Wahrnehmung (Fechner'sches Gesetz) — gleichmässige Helligkeitsänderung beim Dimmen.

**Fade:** DALI kennt Fade-Zeit (0,7 s bis 90 s) und Fade-Rate (Schritte/s) — sanftes Dimmen ohne harte Sprünge.

## Rückmeldungen

DALI gibt dem Master Informationen zurück — das macht es gegenüber 0–10 V überlegen:

| Abfrage              | Antwort                                  |
|----------------------|------------------------------------------|
| Query Status         | Lampenfehler, Konverterfehler, Notlicht aktiv, Dimmer-Fehler |
| Query Actual Level   | Aktueller Dimm-Level                     |
| Query Power On Level | Einschalthelligkeit                      |
| Query Groups         | In welchen Gruppen ist das Gerät?        |
| Query Scene          | Gespeicherter Szenen-Level               |

## Gerätetypen (Device Types, DT)

DALI definiert verschiedene Gerätetypen für unterschiedliche Anwendungen:

| DT  | Gerätetyp                    | Anwendung                               |
|-----|------------------------------|-----------------------------------------|
| DT0 | Fluoreszenz-Vorschaltgerät   | Klassisches EVG, T8/T5                  |
| DT1 | Notlicht-EVG                 | Sicherheitsbeleuchtung                  |
| DT4 | Niedervolt-Halogen-Dimmer    | Halogen-Trafo                           |
| DT5 | Konverter (0–10 V Ausgang)   | Retrofit für 0–10 V Geräte             |
| **DT6** | LED-Treiber (dimmen)   | **Standard für moderne LED**            |
| **DT8** | Farbe / Farbtemperatur | **Tunable White, RGB, RGBW**            |

## DALI-2 — Was ist neu?

**DALI-2** (IEC 62386 Ausgabe 2) bringt vor allem:

- **Interoperabilität:** Geräte verschiedener Hersteller müssen kompatibel sein (Zertifizierung)
- **Input Devices:** Taster, Sensoren (PIR, Lux) direkt am DALI-Bus (nicht nur Ausgabegeräte)
- **Instanzen:** Ein Gerät kann mehrere Instanzen haben (z.B. Taster mit 2 Tasten = 2 Instanzen)
- **Erweiterte Diagnose:** Mehr Statusinformationen
- **DT8 Farbe:** Standardisiert (XY, RGB, RGBW, Farbtemperatur)

## DALI in der GA-Anbindung

Die GLT kommuniziert über ein **DALI-Gateway**:

```
GLT (BACnet/Modbus/KNX) ← DALI-Gateway → DALI-Bus → EVGs
```

Gängige Gateways (z.B. Lunatone, Osram DALI-Gateway, Schneider):
- Bilden DALI-Gruppen/Szenen/Geräte auf BACnet-Objekte oder Modbus-Register ab
- Ermöglichen Lastmanagement, Energiemessung, Fehlerdiagnose in der GLT

**Typische GA-Datenpunkte:**

| Datenpunkt          | Typ  | Beschreibung                          |
|---------------------|------|---------------------------------------|
| Gruppe X Dimm-Level | Soll | 0–100 % → Gateway setzt DALI ARC     |
| Gruppe X Szene      | Soll | Szene 0–15 abrufen                    |
| Gruppe X Ein/Aus    | Soll | Broadcast Ein oder Aus                |
| Gerät Y Status      | Ist  | Lampenfehler, Konverterfehler         |
| Gerät Y Ist-Level   | Ist  | Tatsächliche Helligkeit               |
| Anzahl Lampenfehler | Ist  | Wartungsalarm                         |

## Notlichtfunktion (DT1)

DALI-Notlicht-EVGs (DT1) sind komplex — vollständige Selbsttests:

- **Funktionstest** (täglich): kurzer Testimpuls, Batterie OK?
- **Dauerbetriebstest** (jährlich): 3 h Volllast, Kapazität prüfen
- Testergebnisse werden im EVG gespeichert und können ausgelesen werden
- **DALI-2 Notlicht:** Ergebnis-Protokoll abrufbar für Prüfnachweis

> ⚠️ Notlicht-EVGs brauchen separaten DALI-Steuerkreis (getrennt von normaler Beleuchtung) oder DALI-2 mit klarer Trennung.

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

<!-- EN -->

## DALI / DALI-2 — Lighting Control in BA

**DALI** (Digital Addressable Lighting Interface, IEC 62386) is the standard for digital lighting control. In modern buildings DALI displaces analogue 0–10 V dimming signals and allows individual addressing, feedback and diagnostics for every single luminaire.

## DALI vs. 0–10 V Dimming

| Feature | 0–10 V (analogue) | DALI (digital) |
|---------|-------------------|----------------|
| Addressing | Not possible (all respond) | Individual (64 addresses) |
| Feedback | No | Yes (status, fault, lamp failure) |
| Scene memory | External required | In device (up to 16 scenes) |
| Wiring | Polarity-sensitive | Polarity-independent |
| Diagnostics | None | Lamp failure, driver fault reportable |
| Effort | Low | Medium (addressing required) |

## DALI Topology

```
DALI controller (master) ───── DALI bus (2-wire)
                                  ├── Ballast 1 (address 0)
                                  ├── Ballast 2 (address 1)
                                  ├── Ballast 3 (address 2)
                                  └── ... up to 64 devices
```

| Parameter | Value |
|-----------|-------|
| Bus voltage | 16 V (open circuit), current modulated |
| Baud rate | 1200 baud |
| Max. devices | **64 per bus segment** |
| Cable length | max. 300 m (total segment length) |
| Wiring | Polarity-independent, no shielding required |
| Can share SELV cable | Yes (no special cable type needed) |

> DALI bus can share existing SELV control cables — but not on the same conductors as 230 V or other bus systems!

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

| ARC Level | Brightness | Note |
|-----------|-----------|------|
| 0 | Off | |
| 1 | ~0.1 % | Minimum value |
| 128 | ~10 % | Logarithmic |
| 200 | ~40 % | Logarithmic |
| 254 | 100 % | Maximum value |
| 255 | Last stored value | Special case |

> The logarithmic scale matches human perception (Fechner's law) — even brightness change during dimming.

**Fade:** DALI supports fade time (0.7 s to 90 s) and fade rate (steps/s) — smooth dimming without hard jumps.

## Feedback

DALI returns information to the master — this makes it superior to 0–10 V:

| Query | Response |
|-------|---------|
| Query Status | Lamp failure, driver fault, emergency light active, dimmer fault |
| Query Actual Level | Current dim level |
| Query Power On Level | Switch-on brightness |
| Query Groups | Which groups does the device belong to? |
| Query Scene | Stored scene level |

## Device Types (DT)

DALI defines various device types for different applications:

| DT | Device type | Application |
|----|------------|-------------|
| DT0 | Fluorescent ballast | Classic ballast, T8/T5 |
| DT1 | Emergency light ballast | Safety lighting |
| DT4 | Low-voltage halogen dimmer | Halogen transformer |
| DT5 | Converter (0–10 V output) | Retrofit for 0–10 V devices |
| **DT6** | LED driver (dimming) | **Standard for modern LED** |
| **DT8** | Colour / colour temperature | **Tunable White, RGB, RGBW** |

## DALI-2 — What's New?

**DALI-2** (IEC 62386 edition 2) primarily adds:

- **Interoperability:** Devices from different manufacturers must be compatible (certification)
- **Input devices:** Pushbuttons, sensors (PIR, lux) directly on the DALI bus (not just output devices)
- **Instances:** One device can have multiple instances (e.g. pushbutton with 2 buttons = 2 instances)
- **Extended diagnostics:** More status information
- **DT8 colour:** Standardised (XY, RGB, RGBW, colour temperature)

## DALI in BA Integration

The BMS communicates via a **DALI gateway**:

```
BMS (BACnet/Modbus/KNX) ← DALI gateway → DALI bus → ballasts
```

Common gateways (e.g. Lunatone, Osram DALI gateway, Schneider):
- Map DALI groups/scenes/devices to BACnet objects or Modbus registers
- Enable load management, energy measurement, fault diagnostics in the BMS

**Typical BA data points:**

| Data point | Type | Description |
|-----------|------|-------------|
| Group X dim level | Setpoint | 0–100 % → gateway sets DALI ARC |
| Group X scene | Setpoint | Recall scene 0–15 |
| Group X on/off | Setpoint | Broadcast on or off |
| Device Y status | Actual | Lamp failure, driver fault |
| Device Y actual level | Actual | Current brightness |
| Lamp fault count | Actual | Maintenance alarm |

## Emergency Lighting (DT1)

DALI emergency lighting ballasts (DT1) are complex — full self-testing:

- **Function test** (daily): short test pulse, battery OK?
- **Duration test** (annual): 3 h full load, check capacity
- Test results stored in the ballast and can be read out
- **DALI-2 emergency lighting:** Result log retrievable for inspection record

> Emergency lighting ballasts need a separate DALI control circuit (separate from normal lighting) or DALI-2 with clear separation.

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
