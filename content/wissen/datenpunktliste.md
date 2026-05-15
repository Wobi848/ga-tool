---
title: Datenpunktliste (DPL) — Aufbau und Namenskonventionen
slug: datenpunktliste
category: dokumentation
subcategory: ibn
tags: [datenpunktliste, dpl, namenskonventionen, msr-kürzel, tag, datapoint, bacnet, modbus, ibn, dokumentation, schnittstelle, planungsunterlage, abnahme]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, bacnet, modbus, signaltypen, alarmmanagement]
norm: [VDI 3814, SIA 386.110, AMEV]
updated: 2026-05-14
lang: de
---

# Datenpunktliste (DPL) — Aufbau und Namenskonventionen

Die **Datenpunktliste (DPL)** ist das zentrale Dokument der Gebäudeautomation. Sie beschreibt jeden Datenpunkt der Anlage — was gemessen wird, wo es sich befindet, welches Signal es ist und wie es heisst. Ohne saubere DPL: Chaos bei IBN, Übergabe und Betrieb.

## Was ist ein Datenpunkt?

Ein Datenpunkt ist jede messbare, steuerbare oder überwachbare Grösse:

- Temperaturfühler → **AI** (Analog Input)
- Pumpen-Einschaltbefehl → **DO** (Digital Output)
- Ventilstellung → **AO** (Analog Output)
- Störmeldung → **DI** (Digital Input)
- Berechneter Wert → **AV/BV** (Analog/Binary Value, nur in Software)

---

## Aufbau einer DPL

### Pflichtfelder pro Datenpunkt

| Feld              | Beispiel                   | Beschreibung                          |
|-------------------|----------------------------|---------------------------------------|
| **ID / Tag**      | `HZG-K1-VL-T-IST`         | Eindeutige Bezeichnung                |
| **Signaltyp**     | AI                         | AI / AO / DI / DO / AV / BV          |
| **Einheit**       | °C                         | °C, bar, %, m³/h, kW, —              |
| **Bereich**       | −10 … 120                  | Physikalischer Bereich des Signals    |
| **Protokoll**     | BACnet                     | BACnet / Modbus / KNX / physisch     |
| **Adresse**       | AI 1 (Instanz 1)           | Protokoll-spezifische Adresse        |
| **Anlage/System** | Heizung                    | Funktionsbereich                     |
| **Beschreibung**  | Vorlauftemperatur Heizkreis 1 | Klartextbeschreibung             |
| **Alarmgrenzen**  | Warnung 80 °C / Alarm 90 °C | Optional aber empfohlen             |
| **GLT-Sichtbar**  | Ja                         | Erscheint in Visualisierung?         |
| **Trending**      | 15 min / COV               | Historisierung?                      |

### Empfohlene Zusatzfelder

| Feld              | Beschreibung                            |
|-------------------|-----------------------------------------|
| IBN-Status        | Geplant / Verdrahtet / Getestet / OK    |
| Schaltschrank     | Welcher UVT, welche Klemme              |
| Kabelbezeichnung  | Kabelliste-Referenz                     |
| Hersteller/Typ    | Sensortyp für Wartung                   |
| Inbetriebnahme-Datum | Wann getestet                        |

---

## Namenskonventionen

### Schema: System-Kreis-Komponente-Signalart-Messgrösse

**Beispiel:** `HZG-K1-VL-T-IST`

| Teil    | Kürzel | Bedeutung               |
|---------|--------|-------------------------|
| System  | HZG    | Heizung                 |
| Kreis   | K1     | Kreis 1                 |
| Komp.   | VL     | Vorlauf                 |
| Signal  | T      | Temperatur              |
| Art     | IST    | Istwert                 |

### Häufige Systemkürzel

| Kürzel | System                        |
|--------|-------------------------------|
| HZG    | Heizung                       |
| KLT    | Kälte / Kühlung               |
| LFT    | Lüftung / RLT                 |
| SAN    | Sanitär / Warmwasser          |
| ELT    | Elektro / Beleuchtung         |
| BSC    | Beschattung                   |
| BSK    | Brandschutzklappe             |
| SIC    | Sicherheit / Zutrittskontrolle|
| EMS    | Energie / Zähler              |

### Häufige Signalkürzel

| Kürzel | Bedeutung                     |
|--------|-------------------------------|
| T      | Temperatur                    |
| P      | Druck                         |
| F      | Durchfluss (Flow)             |
| H      | Feuchte (Humidity)            |
| L      | Licht / Helligkeit            |
| Q      | Wärmemenge / Energie          |
| S      | Status / Störmeldung          |
| Z      | Zähler                        |

### Häufige Artenkürzel

| Kürzel | Bedeutung                     |
|--------|-------------------------------|
| IST    | Istwert                       |
| SOLL   | Sollwert                      |
| EIN    | Einschaltsignal               |
| AUS    | Ausschaltsignal               |
| STR    | Störung                       |
| LFG    | Laufmeldung (läuft)           |
| HND    | Handstellung                  |
| AUTO   | Automatikmeldung              |

---

## Beispiel-DPL (Heizkreis)

| ID                 | Typ | Einheit | Protokoll | Adresse    | Beschreibung                    |
|--------------------|-----|---------|-----------|------------|---------------------------------|
| HZG-K1-VL-T-IST    | AI  | °C      | BACnet    | AI 1       | Vorlauftemperatur Heizkreis 1   |
| HZG-K1-RL-T-IST    | AI  | °C      | BACnet    | AI 2       | Rücklauftemperatur Heizkreis 1  |
| HZG-K1-VL-T-SOLL   | AV  | °C      | BACnet    | AV 1       | Vorlauf-Sollwert (berechnet)    |
| HZG-K1-MV-SOLL     | AO  | %       | BACnet    | AO 1       | Mischventil Heizkreis 1 (0–10V) |
| HZG-K1-P1-EIN      | DO  | —       | BACnet    | BO 1       | Pumpe Heizkreis 1 EIN/AUS       |
| HZG-K1-P1-LFG      | DI  | —       | BACnet    | BI 1       | Pumpe Heizkreis 1 Laufmeldung   |
| HZG-K1-P1-STR      | DI  | —       | BACnet    | BI 2       | Pumpe Heizkreis 1 Störmeldung   |
| HZG-K1-T-SOLL-ABS  | AV  | °C      | BACnet    | AV 2       | Vorlauf-Sollwert absolut (GLT)  |

---

## IBN-Status in der DPL

Die DPL ist auch Checkliste für die Inbetriebnahme:

| Status         | Bedeutung                                   |
|----------------|---------------------------------------------|
| **Geplant**    | In DPL eingetragen, noch nicht verdrahtet   |
| **Verdrahtet** | Kabel liegt, noch nicht an DDC             |
| **Konfiguriert**| Adresse vergeben, DDC parametriert         |
| **Getestet**   | Messwert stimmt, Signal verifiziert         |
| **OK**         | Vollständig abgenommen                      |
| **Defekt**     | Sensor defekt, Ersatz nötig                |

---

## Datenpunkt-Qualität und Grenzwerte

Jeder analoge Datenpunkt sollte Grenzwerte für Plausibilitätsprüfung haben:

```
Datenpunkt: Aussentemperatur
  Physikalischer Bereich: −40 … +60 °C (PT1000 Bereich)
  Plausibel: −25 … +45 °C (realistischer Wertebereich CH)
  Alarm Untergrenze: −25 °C (Frostwarnung)
  Alarm Obergrenze: +40 °C (ungewöhnlich, Sensor prüfen)
  Fühlerbruch-Erkennung: < −40 °C oder > 100 °C = Kabelbruch
```

## Normen

- **VDI 3814** — Gebäudeautomation, MSR-Technik (Datenpunktstruktur)
- **SIA 386.110** (CH) — Gebäudeautomation
- **AMEV BACnet** — Empfehlung für BACnet-Datenpunkte in öffentlichen Gebäuden
- **VDI/VDE 3699** — Prozessführung mit Bildschirmen (Datenpunkt-Visualisierung)
