---
title: Inbetriebnahme-Vorbereitung — Checkliste und typische Fehler
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
