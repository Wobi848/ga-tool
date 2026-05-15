---
title: Funktionsbeschreibung — Aufbau, Sprache, Detailgrad
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
