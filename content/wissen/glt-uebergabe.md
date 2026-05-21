---
title: GLT-Übergabe an Betreiber — Inhalte, Schulung, Abnahme
title_en: BMS Handover to the Operator — Contents, Training and Acceptance
slug: glt-uebergabe
category: dokumentation
subcategory: ibn
tags:
  [
    glt-übergabe,
    betreiberschulung,
    übergabe,
    abnahme,
    einweisung,
    betriebsanleitung,
    betreiber,
    fm,
    facility-management,
    schlüssel,
    passwörter,
    gewährleistung,
    unterhaltsvertrag,
    wartungsvertrag
  ]
difficulty: fortgeschritten
area: [ga]
related: [tab-protokoll, as-built, funktionsbeschreibung, alarmmanagement, remote-zugriff]
norm: [VDI 3814, SIA 386.110, SIA 118]
updated: 2026-05-15
lang: de
---

# GLT-Übergabe an Betreiber — Inhalte, Schulung, Abnahme

Die Übergabe der GLT an den Betreiber ist der letzte Schritt der Inbetriebnahme. Sie sichert den korrekten Betrieb und schützt den GA-Unternehmer vor unberechtigten Gewährleistungsansprüchen.

## Was wird übergeben?

### Dokumente (physisch + digital)

```
Übergabepaket:
  ✓ As-Built DPL (Datenpunktliste, Excel/CSV)
  ✓ Schemen As-Built (PDF + CAD)
  ✓ TAB-Protokoll (unterschrieben)
  ✓ Mängelliste mit Status
  ✓ Bedienungsanleitung GLT (system-spezifisch)
  ✓ Passwort-Dokument (verschlüsselt oder physisch)
  ✓ DDC-Programm-Backup (Datenträger)
  ✓ GLT-Konfiguration-Backup
  ✓ Wartungsplan (empfohlene Intervalle)
  ✓ Notfall-Kontakte (GA-Unternehmer Service-Hotline)
```

### Zugänge

```
  ✓ GLT-Login Betreiber (Benutzerkonto angelegt, Passwort übergeben)
  ✓ VPN-Zugang für Fernwartung (wenn vereinbart)
  ✓ Fernzugriff-Zugangsdaten (oder: deaktiviert bis Wartungsvertrag)
  ✓ Netzwerk-Zugänge (Switches, Router — falls relevant)
```

---

## Schulung Betreiber

### Schulungsmodule (typisch 2–4 Stunden)

**Modul 1: Bedienung GLT (Basis)**

```
Inhalte:
  - Login und Navigationsstruktur
  - Anlagenstatus lesen (Farben, Symbole)
  - Sollwerte ändern (Raumtemperatur, Betriebszeiten)
  - Zeitprogramme bearbeiten
  - Manuell steuern (Hand/Auto)

Praxis: Betreiber führt alle Aktionen selbst durch
Dauer: 60–90 Minuten
```

**Modul 2: Alarme und Störungen**

```
Inhalte:
  - Alarmliste lesen: Was bedeutet welcher Alarm?
  - Alarme quittieren (ACK)
  - Welche Alarme sind kritisch, welche können warten?
  - Wann Servicetechniker rufen?
  - Notfallprotokoll (Frostschutz ausgelöst → Was tun?)

Dauer: 30–45 Minuten
```

**Modul 3: Trends und Berichte**

```
Inhalte:
  - Trendgraphen lesen (Regelgüte beurteilen)
  - Energieberichte abrufen
  - Monatliche Verbrauchsübersicht

Dauer: 20–30 Minuten
```

---

## Schulungs-Protokoll

Schulung schriftlich protokollieren (Unterschrift Betreiber):

```
Schulungsprotokoll:
  Datum: 15.05.2026
  Anlage: Verwaltungsgebäude Muster AG
  Schulende Person: Max Mustermann, GA-Firma AG
  Teilnehmer:
    - Maria Muster, Hauswart (Unterschrift)
    - Hans Meier, FM (Unterschrift)

  Themen:
    ✓ Anlagenbedienung GLT
    ✓ Alarme und Quittierung
    ✓ Zeitprogramme anpassen
    ✓ Notfallprozeduren

  Bemerkungen: Betreiber wünscht zusätzliche Schulung Energieauswertung
                → Termin wird vereinbart
```

---

## Gewährleistung und Mängelregelung

```
Gewährleistungsbeginn:
  CH (SIA 118): Bei Abnahme (TAB-Protokoll unterschrieben)
  DE: Bei Abnahme nach VOB

Gewährleistungsdauer:
  Typisch: 2 Jahre nach SIA 118 / VOB
  Software / Programmierung: häufig gesondert geregelt

Mängelprotokoll:
  Alle offenen Mängel bei Übergabe → Mängelliste mit Terminen
  Nachbesserung: Termine einhalten → Abschlussmeldung
  Verjährung: Mängel müssen innert Frist gemeldet werden!
```

---

## Wartungsvertrag

Empfehlung an Betreiber für Unterhalt:

```
Empfohlene Wartungsintervalle GA:

Halbjährlich:
  - Sichtprüfung aller Feldgeräte
  - Alarm-Log auswerten (wiederkehrende Probleme)
  - Software-Updates (DDC / GLT)

Jährlich:
  - Vollständige Funktionsprüfung (alle Datenpunkte)
  - Kalibrierung wichtiger Sensoren (Raumfühler, Zähler)
  - DDC-Backup erneuern
  - Passwörter ändern
  - Jahresmeldung an Betreiber (Energieverbrauch, Trends)

Alle 2–5 Jahre:
  - Vollständige System-Revision
  - Hardware-Alterungsprüfung (Batterien in DDC, Netzteile)
  - Schnittstellen-Prüfung (APIs, Protokolle aktuell)
```

---

## Übergabe-Meeting Agenda

```
1. Offene Mängel besprechen (15 min)
2. Dokumentation übergeben (10 min)
3. Zugangsdaten übergeben (5 min)
4. Schulung durchführen (120 min)
5. TAB-Protokoll unterschreiben (5 min)
6. Wartungsvertrag besprechen (15 min)
7. Notfallkontakte klären (5 min)

Ergebnis: Unterschriebenes TAB-Protokoll + Schulungsprotokoll
         → Gewährleistungsbeginn offiziell
```

---

## Normen

- **VDI 3814** — Übergabe GA, Anforderungen
- **SIA 386.110** — Abnahme und Übergabe nach Schweizer GA-Norm
- **SIA 118** — Allgemeine Bedingungen, Gewährleistung

<!-- EN -->

## BMS Handover to the Operator — Contents, Training and Acceptance

The handover of the BMS to the operator is the final step of commissioning. It secures correct operation and protects the BA contractor against unjustified warranty claims.

## What is Handed Over?

### Documents (physical + digital)

```
Handover package:
  ✓ As-built DPL (data point list, Excel/CSV)
  ✓ As-built drawings (PDF + CAD)
  ✓ TAB protocol (signed)
  ✓ Punch list with status
  ✓ BMS user guide (system-specific)
  ✓ Password document (encrypted or physical)
  ✓ DDC programme backup (storage medium)
  ✓ BMS configuration backup
  ✓ Maintenance plan (recommended intervals)
  ✓ Emergency contacts (BA contractor service hotline)
```

### Access Credentials

```
  ✓ BMS login for operator (user account created, password handed over)
  ✓ VPN access for remote maintenance (if agreed)
  ✓ Remote access credentials (or: deactivated until maintenance contract)
  ✓ Network access (switches, router — if relevant)
```

---

## Operator Training

### Training Modules (typically 2–4 hours)

**Module 1: BMS Operation (Basic)**

```
Contents:
  - Login and navigation structure
  - Reading system status (colours, symbols)
  - Changing setpoints (room temperature, operating hours)
  - Editing time programmes
  - Manual control (manual/auto)

Practice: operator performs all actions themselves
Duration: 60–90 minutes
```

**Module 2: Alarms and Faults**

```
Contents:
  - Reading the alarm list: what does each alarm mean?
  - Acknowledging alarms (ACK)
  - Which alarms are critical, which can wait?
  - When to call a service technician?
  - Emergency procedure (frost protection triggered → what to do?)

Duration: 30–45 minutes
```

**Module 3: Trends and Reports**

```
Contents:
  - Reading trend graphs (assessing control quality)
  - Accessing energy reports
  - Monthly consumption overview

Duration: 20–30 minutes
```

---

## Training Record

Document the training in writing (operator signature):

```
Training record:
  Date: 15.05.2026
  System: Administration Building Sample AG
  Trainer: Max Sample, BA Company AG
  Participants:
    - Maria Sample, Caretaker (signature)
    - Hans Meier, FM (signature)

  Topics:
    ✓ BMS system operation
    ✓ Alarms and acknowledgement
    ✓ Adjusting time programmes
    ✓ Emergency procedures

  Notes: operator requests additional energy analysis training
         → appointment to be arranged
```

---

## Warranty and Defect Management

```
Warranty start:
  CH (SIA 118): On acceptance (TAB protocol signed)
  DE: On acceptance per VOB

Warranty period:
  Typically: 2 years per SIA 118 / VOB
  Software / programming: often governed separately

Defect record:
  All open defects at handover → punch list with deadlines
  Remediation: meet deadlines → completion notice
  Limitation period: defects must be reported within the period!
```

---

## Maintenance Contract

Recommendation to operator for ongoing maintenance:

```
Recommended BA maintenance intervals:

Semi-annual:
  - Visual inspection of all field devices
  - Evaluate alarm log (recurring issues)
  - Software updates (DDC / BMS)

Annual:
  - Complete functional check (all data points)
  - Calibration of key sensors (room sensors, meters)
  - Renew DDC backup
  - Change passwords
  - Annual report to operator (energy consumption, trends)

Every 2–5 years:
  - Full system revision
  - Hardware ageing check (DDC batteries, power supplies)
  - Interface check (APIs, protocols current)
```

---

## Handover Meeting Agenda

```
1. Review open defects (15 min)
2. Hand over documentation (10 min)
3. Hand over access credentials (5 min)
4. Conduct training (120 min)
5. Sign TAB protocol (5 min)
6. Discuss maintenance contract (15 min)
7. Clarify emergency contacts (5 min)

Result: signed TAB protocol + training record
       → warranty officially starts
```

---

## Standards

- **VDI 3814** — BA handover requirements
- **SIA 386.110** — Acceptance and handover per Swiss BA standard
- **SIA 118** — General conditions, warranty
