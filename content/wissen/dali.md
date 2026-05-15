---
title: DALI / DALI-2 — Lichtsteuerung in der GA
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
