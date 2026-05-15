---
title: GLT / DDC — Ebenen der Gebäudeautomation
slug: glt-grundlagen
category: ga
subcategory: grundlagen
tags: [glt, ddc, gebäudeleittechnik, gebäudeautomation, feldebene, automationsebene, managementebene, hand-0-auto, betriebsarten, sollwert, raumautomation, bacnet, scada, leitebene]
difficulty: grundlagen
area: [ga]
related: [bacnet, modbus, knx, pid-regler, alarmmanagement, signaltypen]
norm: [EN ISO 52120, VDI 3814, SIA 386.110]
updated: 2026-05-14
lang: de
---

# GLT / DDC — Ebenen der Gebäudeautomation

Die Gebäudeautomation ist in drei Ebenen organisiert. Das Verständnis dieser Hierarchie ist der erste Schritt um eine GA-Anlage richtig zu planen, zu parametrieren und im Betrieb zu bedienen.

## Die drei Ebenen

```
┌─────────────────────────────────────────────┐
│          MANAGEMENTEBENE (GLT)              │
│    Visualisierung · Alarmmanagement ·       │
│    Trendaufzeichnung · Reporting            │
│    Software: Siemens Desigo CC, Sauter Vision │
├─────────────────────────────────────────────┤
│         AUTOMATIONSEBENE (DDC)              │
│    Regelung · Steuerung · Optimierung       │
│    Hardware: DDC-Controller, Raumautomation │
│    Protokoll: BACnet, Modbus, KNX           │
├─────────────────────────────────────────────┤
│            FELDEBENE                        │
│    Sensoren · Aktoren · Armaturen           │
│    PT1000, 4–20 mA, 0–10 V, DI/DO          │
└─────────────────────────────────────────────┘
```

### Feldebene

Die unterste Schicht — direkte Verbindung zur physischen Anlage:

- **Sensoren:** Temperaturfühler, Drucksensoren, Durchflussmesser, CO₂, Feuchte
- **Aktoren:** Ventile, Klappen, Pumpen (über Schütz oder FU), Beleuchtung
- **Signaltypen:** AI (0–10V, 4–20mA, PT1000), DI (Kontakt), AO (0–10V), DO (Relais)
- **Verbindung zum DDC:** Kabel (bis 500 m), bei modernen Systemen auch Funk (EnOcean, KNX RF)

### Automationsebene (DDC)

Das Herz der Regelung — hier laufen die Programme:

- **DDC** (Direct Digital Control): Kleinstcomputer der die Anlage regelt
- Liest Sensoren, berechnet Sollwerte, stellt Aktoren an
- Läuft **autark** ohne Verbindung zur GLT (lokale Intelligenz)
- Kommuniziert mit GLT über BACnet, Modbus oder proprietäres Protokoll
- **Raumautomation:** kleiner DDC direkt im Raum (Fan-Coil, VAV-Box)

**Typische DDC-Hersteller:** Siemens (PXC), Sauter (modu8), Schneider (TAC Vista), Johnson Controls (Metasys), KMC, Distech

### Managementebene (GLT)

Übergeordnete Visualisierung und Bedienung:

- **Visualisierung:** grafische Darstellung der Anlage (Fließschemata, Raumgrundrisse)
- **Alarmmanagement:** Alarme sammeln, priorisieren, eskalieren
- **Trendaufzeichnung:** Messwerte historisieren (Polling oder COV)
- **Zeitprogramme:** Betriebszeiten zentral einstellen
- **Reporting:** Energieverbrauch, Betriebsstunden, Alarmstatistik

> ⚠️ Wichtig: Die GLT **überwacht und bedient** — die eigentliche Regelung läuft im DDC. Bei GLT-Ausfall läuft die Anlage weiter (lokal im DDC). Bei DDC-Ausfall funktioniert nichts mehr.

---

## Hand-0-Auto (HOA)

Jeder Aktor in der GA hat drei Betriebsarten:

| Modus    | Symbol | Beschreibung                                           |
|----------|--------|--------------------------------------------------------|
| **Hand** | H      | Direkter manueller Eingriff — Programm ignoriert       |
| **0**    | 0      | Zwangsausschaltung — Aktor ist aus, Programm ignoriert |
| **Auto** | A      | Normalbetrieb — Programm regelt                        |

### Physische Hand-0-Auto-Schalter

An Schaltschränken oder Unterverteilungen:

```
Pumpe → [H - 0 - A] Schalter
H = Pumpe läuft immer (Hand)
0 = Pumpe aus (gesperrt)
A = DDC entscheidet
```

**Wichtig:** Hand-Modus bedeutet DDC hat keinen Einfluss. Gleichzeitig: kein Frostschutz, kein Überhitzungsschutz, kein automatischer Abschalter! → Nur im Service-Betrieb unter Aufsicht.

### Software Hand-0-Auto in der GLT

In der Visualisierung kann jeder Datenpunkt überschrieben werden:

```
Datenpunkt: Pumpe1 Auto = EIN (vom Regler)
  → GLT-Override: AUS (Hand zwingen)
  → Pumpe1 geht aus, obwohl Regler EIN sagt
```

**Protokollpflicht:** Wer hat wann was überschrieben? Warum? Gültigkeit bis wann?

---

## Betriebsarten / Betriebsprogramm

Neben HOA gibt es übergeordnete Betriebsarten die die gesamte Anlage beeinflussen:

| Betriebsart        | Beschreibung                                    |
|--------------------|-------------------------------------------------|
| **Komfort**        | Voller Betrieb, Normaltemperaturen              |
| **Vorkomfort**     | Aufwärmen vor Belegung (Morgens)                |
| **Nacht/Abwesend** | Abgesenkte Temperaturen, reduzierte Lüftung     |
| **Standby**        | Minimalheizung (Frostschutz), Lüftung aus       |
| **Sonder/Hand**    | Sonderbetrieb, manuell ausgelöst                |
| **Störung**        | Sicherheitsabschaltung                          |

**Automatischer Übergang:**

```
Montag–Freitag:
  05:00 → Vorkomfort (Vorheizen)
  07:00 → Komfort
  18:00 → Nacht
  22:00 → Standby (Frostschutz)
Samstag/Sonntag:
  Standby, ausser Sonderbetrieb aktiviert
```

---

## Sollwertführung

Sollwerte können auf verschiedene Arten vorgegeben werden:

### Fixer Sollwert
- Raumtemperatur immer 22 °C
- Einfach, keine Interaktion nötig

### Gleitender Sollwert (witterungsgeführt)
- Vorlauftemperatur folgt Aussentemperatur (Heizkurve)
- Zulufttemperatur folgt Aussentemperatur

### Kaskaden-Sollwert
- Übergeordneter Regler gibt Sollwert für untergeordneten vor
- Beispiel: Raumtemperatur-Regler steuert Vorlauftemperatur-Regler

### Bediener-Eingriff
- Nutzer kann Sollwert ±2 K verstellen (innerhalb definierter Grenzen)
- GLT überwacht: Eingriffe ausserhalb Grenzen → Alarm

---

## DDC-Programm — Grundstruktur

Jedes DDC-Programm folgt demselben Ablauf:

```
1. Eingänge einlesen (Sensoren, Statusrückmeldungen)
2. Plausibilität prüfen (Fühlerbruch, Bereichsüberschreitung)
3. Betriebsart bestimmen (HOA-Status, Zeitprogramm)
4. Regelung berechnen (PID, Zweipunkt, Logik)
5. Ausgänge setzen (Ventile, Pumpen, FU)
6. Alarme auswerten (Grenzwerte, Laufzeiten)
7. Datenpunkte an GLT senden (COV oder Polling)
Zykluszeit: typisch 1–5 Sekunden
```

---

## Typische DDC-Architektur (Heizkreis)

```
Heizkreis-DDC:
  AI: Vorlauf-Temperatur (PT1000)
  AI: Rücklauf-Temperatur (PT1000)
  AI: Aussen-Temperatur (PT1000)
  AI: Pumpe-Betriebsstrom (4-20 mA)
  DI: Pumpe-Laufmeldung
  DI: Pumpe-Störmeldung
  DI: Motorschutz
  AO: Mischventil (0-10 V)
  DO: Pumpe EIN/AUS

Programm:
  - Witterungsgeführter Vorlauf (Heizkurve)
  - Frostschutz (Mindest-VL)
  - Nachtabsenkung (Zeitprogramm)
  - Pumpen-Laufzeit-Überwachung
  - Alarme: Pumpe Störung, Fühlerbruch, Kommunikation
```

## Normen

- **VDI 3814** — Gebäudeautomation, MSR-Technik in Gebäuden
- **EN ISO 52120** (früher EN 15232) — GA-Effizienzklassen
- **SIA 386.110** (CH) — Gebäudeautomation
- **IEC 61131-3** — Programmiersprachen für SPS/DDC
