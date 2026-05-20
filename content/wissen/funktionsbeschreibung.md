---
title: Funktionsbeschreibung — Aufbau, Sprache, Detailgrad
title_en: Functional Description — Structure, Language and Level of Detail
slug: funktionsbeschreibung
category: dokumentation
subcategory: planung
tags: [funktionsbeschreibung, funktionsliste, leistungsbeschreibung, planungsunterlage, ga-planung, ibno, übergabe, regelkreis, betriebsart, handsteuerung, sicherheitsfunktion, dokumentation]
difficulty: fortgeschritten
area: [ga]
related: [datenpunktliste, tab-protokoll, glt-grundlagen, ddc-programmierung, alarmmanagement]
norm: [VDI 3814, SIA 386.110, AMEV Hinweis GA 2017]
updated: 2026-05-15
lang: de
---

# Funktionsbeschreibung — Aufbau, Sprache, Detailgrad

Die Funktionsbeschreibung (FB) ist das zentrale Planungsdokument der GA. Sie beschreibt präzise, wie eine Anlage geregelt und gesteuert wird — bevor ein einziges Kabel gelegt ist.

## Zweck und Adressaten

```
Funktionsbeschreibung dient:
  1. Auftraggeber:    Prüfung ob Anforderungen erfüllt
  2. Elektroplaner:   Basis für Schaltpläne und DPL
  3. GA-Unternehmer:  Grundlage für Offerte und Programmierung
  4. DDC-Programmierer: Direkter Programmierauftrag
  5. IBN-Techniker:   Prüfgrundlage (Was soll passieren?)
  6. Betreiber:       Verständnis der Anlage für Betrieb
```

---

## Struktur einer Funktionsbeschreibung

### Kopf jeder Anlage

```
Anlage: RLT-Anlage 1 (RLT-01)
Beschreibung: Zuluft-Anlage Bürozone EG West, ca. 3500 m³/h
Betriebszeiten: MO–FR 06:00–20:00 (Zeitprogramm)
Vorlage: VDI 6022 Hygienegeprüft Klasse B
Sicherheitsfunktionen: Frostschutz, Brandschutzklappen-Verriegelung
```

### Kapitelstruktur

```
1. Allgemein (Anlage, Zweck, Normen)
2. Anlage-Bestandteile (Komponenten-Liste)
3. Betriebsarten (Normal, Nacht, Absenkung, Hand, Störung)
4. Regelkreise (je Regelkreis ein Abschnitt)
5. Steuerlogiken (zeitabhängig, zustandsabhängig)
6. Sicherheitsfunktionen (Frostschutz, Brandschutz)
7. Alarmierungen (je Alarm: Grenzwert, Verzögerung, Priorität)
8. Schnittstellen (zu anderen Anlagen, GLT)
9. Datenpunktliste (Verweis)
```

---

## Beschreibung von Betriebsarten

Jede Anlage hat definierte Betriebsarten:

```
Betriebsart 0 — AUS (Frostschutz):
  Ausserhalb Betriebszeiten
  Ventilator: 0
  Klappen: geschlossen
  Frost-Schutz: aktiv (wenn TA < 3 °C → Pumpe auf min. 20 %)

Betriebsart 1 — ABSENKEN:
  Werktage 20:00–06:00
  Temp-Soll: 17 °C (statt 22 °C)
  Luftmenge: 30 % (Mindestlüftung)

Betriebsart 2 — KOMFORT (Normal):
  MO–FR 06:00–20:00
  Temp-Soll: 22 °C (heizen) / 26 °C (kühlen)
  Luftmenge: DCV nach CO2, min. 30 %, max. 100 %

Betriebsart 3 — HANDBETRIEB:
  Manuell durch Techniker
  Alle Stellglieder manuell verfahrbar
  Kein automatischer Eingriff
  Timeout: nach 4 h zurück auf Auto
```

---

## Beschreibung von Regelkreisen

Jeder Regelkreis erhält einen eigenen Abschnitt:

```
Regelkreis: Zuluft-Temperatur RLT-01

Regelgrösse:    Zuluft-Temperatur (nach Heizregister)
Messort:        TE-01 (Tauchfühler Zuluftkanal nach WRG)
Sollwert:       18 °C (winter) / 22 °C (sommer, Nachtauskühlung)
Sollwertquelle: Fixwert, einstellbar via GLT

Stellglied:     Heizventil YV-01 (2-Wege, Kv 6.3, DN25)
Stellbereich:   0–100 % (0–10 V)
Fail-Safe:      Offen (bei Ausfall Signal → Ventil öffnet)

Regler:         PID
  Kp = 2.0, Ti = 4 min, Td = 0
  Regelbeginn: wenn Betriebsart ≥ 1 (nicht bei Betriebsart 0)
  
Grenzen:
  Min. Stellwert: 0 % (ausser Frostschutz-Logik)
  Max. Stellwert: 100 %
  Zuluft-Max: 28 °C (Übertemperatur-Alarm wenn > 30 °C)
  Zuluft-Min: Frostschutz wenn < 5 °C (Sofortabschaltung Ventilator)
```

---

## Beschreibung von Sicherheitsfunktionen

Sicherheitsfunktionen IMMER explizit beschreiben:

```
Frostschutz RLT-01:

Auslösung: Wenn Zuluft-Temp TE-01 < 5 °C mit Verzögerung 30 s

Sofortmassnahmen (ohne Verzögerung):
  - Ventilator AUS
  - Klappe Aussenluft schliessen (100 % zu)
  - Klappe Umluft öffnen (wenn vorhanden)
  - Heizventil: 100 % auf

Freigabe (Reset):
  - Nur manuell nach Quittierung
  - Bedingung: Zuluft-Temp > 12 °C UND Vorlauf-Temp > 40 °C

Meldung: Alarm "Frostschutz RLT-01 ausgelöst" → Priorität KRITISCH
  → Email an Gebäudetechnik, SMS an Pikett
```

---

## Sprache und Detailgrad

**Richtlinien für guten Schreibstil:**

| Was                    | Beispiel gut                                   | Beispiel schlecht               |
|------------------------|------------------------------------------------|---------------------------------|
| Konkrete Werte         | "Sollwert 22 °C ± 0.5 K"                      | "angemessene Temperatur"        |
| Bedingungen klar       | "wenn T < 5 °C UND Ventilator EIN"            | "bei Frost"                     |
| Ausgänge definieren    | "Heizventil öffnet auf 100 %"                  | "Heizung läuft"                 |
| Prioritäten benennen   | "Frostschutz hat Vorrang vor allen anderen"   | "wird bei Frost unterbrochen"   |
| Zeitverzögerungen      | "mit 30 s Einschaltverzögerung"                | "mit Verzögerung"               |

---

## Checkliste: Ist die FB vollständig?

- [ ] Alle Betriebsarten beschrieben (inkl. Handbetrieb, Störungsfall)
- [ ] Alle Regelkreise: Sensor, Regler, Stellglied, Sollwert, Grenzen
- [ ] Alle Sicherheitsfunktionen: Auslösung, Wirkung, Reset-Bedingung
- [ ] Alle Alarme: Grenzwert, Verzögerung, Priorität, Eskalation
- [ ] Schnittstellen zu anderen Anlagen beschrieben
- [ ] Zeitprogramme definiert (welche Zeiten, welche Sollwerte)
- [ ] Fail-Safe-Verhalten aller Aktoren bei Ausfall

---

## Normen

- **VDI 3814** — Inhalt und Aufbau von Funktionsbeschreibungen GA
- **SIA 386.110** — Anforderungen an Planungsunterlagen GA (Schweiz)
- **AMEV Hinweis GA 2017** — Funktionsbeschreibung für öffentliche Bauten (DE)

<!-- EN -->

## Functional Description — Structure, Language and Level of Detail

The functional description (FD) is the central planning document in BA. It precisely describes how a system is to be controlled and regulated — before a single cable is laid.

## Purpose and Audience

```
Functional description serves:
  1. Client:           Verify that requirements are met
  2. Electrical planner: Basis for circuit diagrams and DPL
  3. BA contractor:    Basis for quotation and programming
  4. DDC programmer:  Direct programming specification
  5. Commissioning technician: Test basis (what should happen?)
  6. Operator:        Understanding the system for operation
```

---

## Structure of a Functional Description

### Header for Each System

```
System: AHU-01 (RLT-01)
Description: Supply air system office zone ground floor west, approx. 3500 m³/h
Operating hours: Mon–Fri 06:00–20:00 (time programme)
Standard: VDI 6022 hygiene-inspected class B
Safety functions: frost protection, fire damper interlock
```

### Chapter Structure

```
1. General (system, purpose, standards)
2. System components (component list)
3. Operating modes (normal, night, setback, manual, fault)
4. Control loops (one section per loop)
5. Control logic (time-based, state-based)
6. Safety functions (frost protection, fire protection)
7. Alarms (per alarm: limit, delay, priority)
8. Interfaces (to other systems, BMS)
9. Data point list (reference)
```

---

## Describing Operating Modes

Every system has defined operating modes:

```
Mode 0 — OFF (frost protection):
  Outside operating hours
  Fan: 0
  Dampers: closed
  Frost protection: active (if T_outdoor < 3 °C → pump at min. 20 %)

Mode 1 — SETBACK:
  Weekdays 20:00–06:00
  Temp setpoint: 17 °C (instead of 22 °C)
  Air volume: 30 % (minimum ventilation)

Mode 2 — COMFORT (normal):
  Mon–Fri 06:00–20:00
  Temp setpoint: 22 °C (heating) / 26 °C (cooling)
  Air volume: DCV to CO₂, min. 30 %, max. 100 %

Mode 3 — MANUAL:
  Manually by technician
  All actuators manually adjustable
  No automatic intervention
  Timeout: return to auto after 4 h
```

---

## Describing Control Loops

Each control loop gets its own section:

```
Control loop: Supply air temperature AHU-01

Controlled variable:  Supply air temperature (after heating coil)
Measurement point:    TE-01 (duct immersion sensor after HRC)
Setpoint:             18 °C (winter) / 22 °C (summer, night cooling)
Setpoint source:      Fixed value, adjustable via BMS

Actuator:             Heating valve YV-01 (2-way, Kv 6.3, DN25)
Control range:        0–100 % (0–10 V)
Fail-safe:            Open (signal loss → valve opens)

Controller:           PID
  Kp = 2.0, Ti = 4 min, Td = 0
  Active when: operating mode ≥ 1 (not in mode 0)
  
Limits:
  Min. output: 0 % (except frost-protection logic)
  Max. output: 100 %
  Supply air max: 28 °C (overtemperature alarm if > 30 °C)
  Supply air min: frost protection if < 5 °C (immediate fan shutdown)
```

---

## Describing Safety Functions

Safety functions MUST always be described explicitly:

```
Frost protection AHU-01:

Trigger: if supply air temp TE-01 < 5 °C with 30 s delay

Immediate actions (without delay):
  - Fan OFF
  - Outdoor air damper close (100 % shut)
  - Recirculation damper open (if present)
  - Heating valve: 100 % open

Reset:
  - Manual only, after acknowledgement
  - Condition: supply air temp > 12 °C AND flow temp > 40 °C

Alarm: "Frost protection AHU-01 triggered" → priority CRITICAL
  → Email to building services, SMS to on-call
```

---

## Language and Level of Detail

**Guidelines for good writing style:**

| What | Good example | Poor example |
|------|-------------|--------------|
| Concrete values | "Setpoint 22 °C ± 0.5 K" | "appropriate temperature" |
| Clear conditions | "when T < 5 °C AND fan ON" | "on frost" |
| Define outputs | "Heating valve opens to 100 %" | "heating runs" |
| Name priorities | "Frost protection takes precedence over all others" | "interrupted on frost" |
| Time delays | "with 30 s switch-on delay" | "with delay" |

---

## Checklist: Is the FD Complete?

- [ ] All operating modes described (incl. manual, fault condition)
- [ ] All control loops: sensor, controller, actuator, setpoint, limits
- [ ] All safety functions: trigger, action, reset condition
- [ ] All alarms: limit, delay, priority, escalation
- [ ] Interfaces to other systems described
- [ ] Time programmes defined (which times, which setpoints)
- [ ] Fail-safe behaviour of all actuators on signal loss

---

## Standards

- **VDI 3814** — Content and structure of functional descriptions in BA
- **SIA 386.110** — Requirements for BA planning documents (Switzerland)
- **AMEV Hinweis GA 2017** — Functional descriptions for public buildings (DE)
