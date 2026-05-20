---
title: Inbetriebnahme-Vorbereitung — Checkliste und typische Fehler
title_en: Commissioning Preparation — Checklist and Typical Errors
slug: ibn-vorbereitung
category: dokumentation
subcategory: ibn
tags: [inbetriebnahme, ibn, ibs, vorbereitung, checkliste, verdrahtung, kalibrierung, kommunikationstest, netzwerk, dpl, pre-ibs, frostschutz, sicherheitstest, messprotokoll, erstbetrieb]
difficulty: fortgeschritten
area: [ga]
related: [tab-protokoll, as-built, datenpunktliste, funktionsbeschreibung, glt-grundlagen, ddc-programmierung]
norm: [VDI 3814, SIA 386.110, AMEV IBN 2014]
updated: 2026-05-15
lang: de
---

# Inbetriebnahme-Vorbereitung — Checkliste und typische Fehler

Eine sorgfältige IBN-Vorbereitung spart Zeit und verhindert Schäden. Wer unvorbereitet mit der IBN beginnt, findet sich in einer Endlosschleife aus Fehlersuche und Warten.

## Vor dem ersten Einschalten

### 1. Unterlagen prüfen

```
Checkliste Unterlagen:
  ✓ Funktionsbeschreibung vorhanden und aktuell
  ✓ DPL (Datenpunktliste) vollständig
  ✓ R&I-Schema aktuell (stimmt mit Realität überein?)
  ✓ Elektroschema vorhanden (Klemmen, Kabel)
  ✓ Netzwerkplan (IP-Adressen, VLANs)
  ✓ DDC-Programm erhalten und auf Controller geladen
```

### 2. Mechanische Voraussetzungen

```
  ✓ Alle Komponenten eingebaut und befestigt
  ✓ Rohrleitungen druckgeprüft (kein Wasser-Schaden)
  ✓ Kanäle dicht (Druckprüfung Lüftung, evtl. Lecktest)
  ✓ Sensoren an richtiger Position montiert
  ✓ Ventile in korrekter Einbaulage (Pfeilrichtung!)
  ✓ Pumpen entlüftet (kein Trockenlauf)
  ✓ Filter eingebaut (kein Betrieb ohne Filter)
```

### 3. Elektrische Voraussetzungen

```
  ✓ Alle Adern aufgelegt und beschriftet
  ✓ Schirmung: einseitig aufgelegt (Zentralpunkt Schaltschrank)
  ✓ 24 VAC/VDC vorhanden (Netzteile messen!)
  ✓ Potentialfreie Kontakte: kein Fremdspannungsproblem
  ✓ Motorschutzschalter auf korrekte Einstellung (Nennstrom)
  ✓ FI-Schutzschalter geprüft
  ✓ Netzwerk-Patchkabel aufgelegt, Link-LED leuchtet
```

### 4. DDC und Software

```
  ✓ DDC eingeschaltet, kommuniziert mit GLT
  ✓ Programm geladen (Firmware-Version notiert)
  ✓ Alle DPL-Datenpunkte im Programm vorhanden
  ✓ IP-Adresse konfiguriert (keine Konflikte im Netz)
  ✓ BACnet Device-ID eindeutig (kein Duplikat!)
  ✓ Datum/Uhrzeit synchronisiert (NTP)
```

---

## Ablauf Erstbetrieb

### Schritt 1: Punkt-für-Punkt-Test

```
Jeden Datenpunkt einzeln prüfen:
  DI: Signal anlegen (Kurzschlussbrücke oder echtes Signal)
      → GLT zeigt korrekte Rückmeldung
  DO: Ausgang setzen via GLT → Feldinstrument prüfen
  AI: Messgrösse anlegen (Widerstandsbox für PT1000)
      → GLT zeigt korrekten Wert, Einheit und Skalierung
  AO: Stellsignal ausgeben via GLT
      → Multimeter am Ausgang messen (0–10 V / 4–20 mA)
```

**Typische Fehler bei Punkt-für-Punkt-Test:**
- DI invertiert (Öffner/Schliesserkontakt vertauscht)
- AI Skalierung falsch (0–100 Pa statt 0–500 Pa konfiguriert)
- AO Ausgangssignal fehlt (Sicherung, falsches Modul)
- Kabel-Verwechslung (DPL-ID stimmt nicht mit Klemme überein)

### Schritt 2: Funktionstest der Regelkreise

```
Einzelner Regelkreis (z.B. Raumtemperatur):
  1. Fühler auslesen → plausibel? (22 °C statt 900 °C)
  2. Sollwert setzen (22 °C)
  3. Handbefehl Ventil: 50 % → Stellsignal am Ausgang messen
  4. Ventil am Feld prüfen: öffnet auf 50 %?
  5. Auto-Regler aktivieren: Ist-Wert nähert sich Sollwert
  6. Sprungantwort: Sollwert ändern → Regelantwort beobachten
```

### Schritt 3: Alarmtest

```
Jeden Alarm bewusst auslösen:
  Störmeldung: Motorschutz manuell auslösen
  → Alarm erscheint in GLT innerhalb 5 s
  → Alarm-Priorität korrekt?
  → Email/SMS-Versand testen (auch bei Nacht-Eskalation)
  → Quittierung prüfen
```

---

## Typische Fehler und deren Ursachen

| Fehler                          | Häufige Ursache                          | Lösung                        |
|---------------------------------|------------------------------------------|-------------------------------|
| PT1000 zeigt falschen Wert      | Skalierung falsch konfiguriert           | Min/Max-Werte im DDC prüfen   |
| Ventil öffnet nicht             | Fail-Safe-Richtung falsch                | Antrieb umklemmen oder Logik  |
| DDC nicht erreichbar            | IP-Adresse falsch / VLAN-Problem         | Netzwerkconfig prüfen         |
| BACnet-Objekte fehlen           | Device-ID Konflikt                       | Device-ID eindeutig setzen    |
| Pumpe läuft aber kein Durchfluss| Rückschlagventil falsch eingebaut        | Einbaurichtung prüfen         |
| Regler schwingt                 | PID zu aggressiv (Kp zu hoch)            | Kp reduzieren, Ti erhöhen     |
| Alarm kommt sofort bei Start    | Verzögerung = 0, Einschalttransiente     | Einschaltverzögerung setzen   |
| Fühler zeigt −99 °C             | Kabelbruch (4–20 mA bei 0 mA)            | Verbindung prüfen             |
| Ventil geht sofort auf 100 %    | Regler-Ausgang invertiert                | Inversionsparameter prüfen    |

---

## Sicherheitsfunktionen zuerst!

```
IBN-Reihenfolge:
  1. ERST Sicherheitsfunktionen testen:
     - Frostschutz (→ startet Pumpen, schliesst Klappen)
     - Notaus (falls vorhanden)
     - Brandschutz-Verriegelungen
     
  2. DANN Regelkreise in Betrieb nehmen
  3. ZULETZT Optimierung und Feinabstimmung
  
Niemals: Anlage in Betrieb ohne getesteten Frostschutz!
  → Im Ernstfall: 10 °C Aussenluft → RLT läuft ohne Heizung → Frostschaden
```

---

## IBN-Protokoll je Datenpunkt

| DPL-ID     | Typ | Beschreibung           | Messwert IBN | OK | Kommentar         |
|------------|-----|------------------------|-------------|----|--------------------|
| HZG-T-VL1  | AI  | Vorlauf HK1           | 42.5 °C     | ✓  |                    |
| HZG-P1-EIN | DO  | Pumpe HK1             | 1           | ✓  |                    |
| HZG-P1-LFG | DI  | Pumpe HK1 Laufmeldung | 1           | ✓  |                    |
| LFT-T-ZL1  | AI  | Zuluft RLT-01         | −999 °C     | ✗  | Fühler Bruch, tauschen |

---

## Normen

- **VDI 3814** — IBN-Anforderungen Gebäudeautomation
- **SIA 386.110** — IBN-Prozess nach Schweizer GA-Norm
- **AMEV IBN 2014** — Inbetriebnahme gebäudetechnischer Anlagen (öffentliche Bauten DE)

<!-- EN -->

Thorough commissioning preparation saves time and prevents damage. Starting commissioning unprepared leads to an endless loop of fault-finding and waiting.

## Before First Switch-On

### 1. Check Documentation

```
Documentation checklist:
  ✓ Functional description present and current
  ✓ DPL (data point list) complete
  ✓ P&ID current (matches reality?)
  ✓ Electrical schematic available (terminals, cables)
  ✓ Network plan (IP addresses, VLANs)
  ✓ DDC program received and loaded onto controller
```

### 2. Mechanical Prerequisites

```
  ✓ All components installed and secured
  ✓ Pipework pressure-tested (no water damage)
  ✓ Ductwork airtight (pressure test ventilation, leak test if required)
  ✓ Sensors mounted in correct position
  ✓ Valves in correct installation orientation (arrow direction!)
  ✓ Pumps vented (no dry running)
  ✓ Filters installed (no operation without filters)
```

### 3. Electrical Prerequisites

```
  ✓ All conductors connected and labelled
  ✓ Shielding: connected at single point (central point in control panel)
  ✓ 24 VAC/VDC present (measure power supplies!)
  ✓ Volt-free contacts: no stray voltage issues
  ✓ Motor protection switches set correctly (rated current)
  ✓ RCD tested
  ✓ Network patch cable connected, link LED lit
```

### 4. DDC and Software

```
  ✓ DDC switched on, communicating with BMS
  ✓ Program loaded (firmware version noted)
  ✓ All DPL data points present in program
  ✓ IP address configured (no conflicts on network)
  ✓ BACnet Device ID unique (no duplicate!)
  ✓ Date/time synchronised (NTP)
```

---

## Initial Start-Up Procedure

### Step 1: Point-by-Point Test

```
Test each data point individually:
  DI: apply signal (shorting link or real signal)
      → BMS shows correct feedback
  DO: set output via BMS → check field instrument
  AI: apply measured variable (resistance box for PT1000)
      → BMS shows correct value, unit and scaling
  AO: output control signal via BMS
      → measure with multimeter at output (0–10 V / 4–20 mA)
```

**Typical errors in point-by-point test:**
- DI inverted (normally open/normally closed contact swapped)
- AI scaling wrong (configured 0–100 Pa instead of 0–500 Pa)
- AO output signal missing (fuse, wrong module)
- Cable mix-up (DPL ID does not match terminal)

### Step 2: Control Loop Functional Test

```
Individual control loop (e.g. room temperature):
  1. Read sensor → plausible? (22 °C not 900 °C)
  2. Set setpoint (22 °C)
  3. Manual valve command: 50 % → measure control signal at output
  4. Check valve in field: opens to 50 %?
  5. Enable auto controller: actual value approaches setpoint
  6. Step response: change setpoint → observe control response
```

### Step 3: Alarm Test

```
Deliberately trigger each alarm:
  Fault signal: trip motor protection manually
  → Alarm appears in BMS within 5 s
  → Alarm priority correct?
  → Test email/SMS dispatch (including night escalation)
  → Test acknowledgement
```

---

## Typical Errors and Their Causes

| Error | Frequent cause | Solution |
|-------|--------------|---------|
| PT1000 shows wrong value | Scaling misconfigured | Check min/max values in DDC |
| Valve does not open | Fail-safe direction wrong | Rewire actuator or change logic |
| DDC not reachable | Wrong IP address / VLAN issue | Check network config |
| BACnet objects missing | Device ID conflict | Set unique Device ID |
| Pump runs but no flow | Check valve installed backwards | Check installation direction |
| Controller oscillates | PID too aggressive (Kp too high) | Reduce Kp, increase Ti |
| Alarm triggers immediately on start | Delay = 0, switch-on transient | Set switch-on delay |
| Sensor shows −99 °C | Cable break (4–20 mA at 0 mA) | Check connection |
| Valve goes immediately to 100 % | Controller output inverted | Check inversion parameter |

---

## Safety Functions First!

```
Commissioning sequence:
  1. FIRST test safety functions:
     - Frost protection (→ starts pumps, closes dampers)
     - Emergency stop (if present)
     - Fire protection interlocks
     
  2. THEN commission control loops
  3. LAST optimisation and fine-tuning
  
Never: put plant into operation without tested frost protection!
  → In an emergency: −10 °C outdoor air → AHU runs without heating → frost damage
```

---

## Commissioning Record per Data Point

| DPL ID | Type | Description | Measured value | OK | Comment |
|--------|------|------------|---------------|----|----|
| HTG-T-SUP1 | AI | Supply HHC 1 | 42.5 °C | ✓ | |
| HTG-P1-ON | DO | Pump HHC 1 | 1 | ✓ | |
| HTG-P1-RUN | DI | Pump HHC 1 run feedback | 1 | ✓ | |
| VNT-T-SUP1 | AI | Supply air AHU-01 | −999 °C | ✗ | Sensor broken, replace |

---

## Standards

- **VDI 3814** — Commissioning requirements for building automation
- **SIA 386.110** — Commissioning process per Swiss BA standard
- **AMEV IBN 2014** — Commissioning of building services installations (public buildings, DE)
