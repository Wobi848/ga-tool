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
related:
  [
    tab-protokoll,
    as-built,
    funktionsbeschreibung,
    alarmmanagement,
    remote-zugriff,
    ibn-vorbereitung,
    visualisierung-hmi
  ]
norm: [VDI 3814, SIA 118/380, SIA 118]
updated: 2026-10-17
lang: de
---

# GLT-Übergabe an Betreiber — Inhalte, Schulung, Abnahme

Die Übergabe der GLT an den Betreiber ist der letzte Schritt der Inbetriebnahme. Sie sichert den korrekten Betrieb und schützt den GA-Unternehmer vor unberechtigten Gewährleistungsansprüchen.

## Was wird übergeben?

### Dokumente (physisch + digital)

**Übergabepaket:**

- ✓ As-Built DPL (Datenpunktliste, Excel/CSV)
- ✓ Schemen As-Built (PDF + CAD)
- ✓ TAB-Protokoll (unterschrieben)
- ✓ Mängelliste mit Status
- ✓ Bedienungsanleitung GLT (system-spezifisch)
- ✓ Passwort-Dokument (verschlüsselt oder physisch)
- ✓ DDC-Programm-Backup (Datenträger)
- ✓ GLT-Konfiguration-Backup
- ✓ Wartungsplan (empfohlene Intervalle)
- ✓ Notfall-Kontakte (GA-Unternehmer Service-Hotline)

### Zugänge

- ✓ GLT-Login Betreiber (Benutzerkonto angelegt, Passwort übergeben)
- ✓ VPN-Zugang für Fernwartung (wenn vereinbart)
- ✓ Fernzugriff-Zugangsdaten (oder: deaktiviert bis Wartungsvertrag)
- ✓ Netzwerk-Zugänge (Switches, Router — falls relevant)

---

## Schulung Betreiber

### Schulungsmodule (typisch 2–4 Stunden)

**Modul 1: Bedienung GLT (Basis)**

**Inhalte:**

- Login und Navigationsstruktur
- Anlagenstatus lesen (Farben, Symbole)
- Sollwerte ändern (Raumtemperatur, Betriebszeiten)
- Zeitprogramme bearbeiten
- Manuell steuern (Hand/Auto)

- Praxis: Betreiber führt alle Aktionen selbst durch
- Dauer: 60–90 Minuten

**Modul 2: Alarme und Störungen**

**Inhalte:**

- Alarmliste lesen: Was bedeutet welcher Alarm?
- Alarme quittieren (ACK)
- Welche Alarme sind kritisch, welche können warten?
- Wann Servicetechniker rufen?
- Notfallprotokoll (Frostschutz ausgelöst → Was tun?)

- Dauer: 30–45 Minuten

**Modul 3: Trends und Berichte**

**Inhalte:**

- Trendgraphen lesen (Regelgüte beurteilen)
- Energieberichte abrufen
- Monatliche Verbrauchsübersicht

- Dauer: 20–30 Minuten

---

## Schulungs-Protokoll

Schulung schriftlich protokollieren (Unterschrift Betreiber):

**Schulungsprotokoll:**

- Datum: 15.05.2026
- Anlage: Verwaltungsgebäude Muster AG
- Schulende Person: Max Mustermann, GA-Firma AG
- Teilnehmer:
  - Maria Muster, Hauswart (Unterschrift)
  - Hans Meier, FM (Unterschrift)

- Themen:
  - ✓ Anlagenbedienung GLT
  - ✓ Alarme und Quittierung
  - ✓ Zeitprogramme anpassen
  - ✓ Notfallprozeduren

- Bemerkungen: Betreiber wünscht zusätzliche Schulung Energieauswertung
  - Termin wird vereinbart

---

## Gewährleistung und Mängelregelung

**Gewährleistungsbeginn:**

- CH (SIA 118): Bei Abnahme (TAB-Protokoll unterschrieben)
- DE: Bei Abnahme nach VOB

**Gewährleistungsdauer:**

- SIA 118: Garantiefrist 2 Jahre ab Abnahme, in der Mängel jederzeit gerügt werden können; Verjährung 5 Jahre. VOB/B: 4 Jahre, BGB: 5 Jahre
- Software / Programmierung: häufig gesondert geregelt

**Mängelprotokoll:**

- Alle offenen Mängel bei Übergabe → Mängelliste mit Terminen
- Nachbesserung: Termine einhalten → Abschlussmeldung
- Verjährung: Mängel müssen innert Frist gemeldet werden!

---

## Wartungsvertrag

Empfehlung an Betreiber für Unterhalt:

**Empfohlene Wartungsintervalle GA:**

**Halbjährlich:**

- Sichtprüfung aller Feldgeräte
- Alarm-Log auswerten (wiederkehrende Probleme)
- Software-Updates (DDC / GLT)

**Jährlich:**

- Vollständige Funktionsprüfung (alle Datenpunkte)
- Kalibrierung wichtiger Sensoren (Raumfühler, Zähler)
- DDC-Backup erneuern
- Zugänge prüfen: Konten ausgeschiedener Personen und Firmen sperren
- Jahresmeldung an Betreiber (Energieverbrauch, Trends)

**Alle 2–5 Jahre:**

- Vollständige System-Revision
- Hardware-Alterungsprüfung (Batterien in DDC, Netzteile)
- Schnittstellen-Prüfung (APIs, Protokolle aktuell)

---

## Übergabe-Meeting Agenda

1. Offene Mängel besprechen (15 min)
2. Dokumentation übergeben (10 min)
3. Zugangsdaten übergeben (5 min)
4. Schulung durchführen (120 min)
5. TAB-Protokoll unterschreiben (5 min)
6. Wartungsvertrag besprechen (15 min)
7. Notfallkontakte klären (5 min)

- Ergebnis: Unterschriebenes TAB-Protokoll + Schulungsprotokoll
  - Gewährleistungsbeginn offiziell

---

## Vorgaben öffentlicher Bauherren (KBOB)

Bei Bauten von Bund, Kantonen und Gemeinden kommen aus den KBOB-Empfehlungen Gebäudetechnik 2026, BACnet 2021 und IKT-Sicherheit 2025 zusätzliche Pflichten dazu:

- **Software gehört dem Bauherrn.** Projektspezifische Programme werden in bearbeitbarer Form übergeben, also als Quellcode, nicht nur als ladbares Abbild.
- **Dokumentation mindestens:** Topologie, Bedienungsanleitungen, Funktions- sowie Steuer- und Regelbeschriebe, revidierte Elektroschemata, Kontrolllisten der Datenpunkttests, Protokolle der Funktionskontrollen, Sollwertlisten nach der Inbetriebnahme. Digital, strukturiert und maschinenlesbar, mit BIM verknüpft, wenn BIM beauftragt ist.
- **Tests belegen:** Datenpunkttest für jeden Datenpunkt bis zur Managementebene und ein End-zu-End-Signaltest, beides protokolliert. Bei BACnet zusätzlich PICS, EDE-Dateien und der Funktionstest nach Beilage C2.
- **Abnahme nach SIA 118** mit Protokoll; der nachgeführte Steuer- und Regelbeschrieb ist Grundlage der Funktionskontrolle.
- **Nachinstruktion** des Betriebspersonals mindestens einmal, 2–4 Monate nach Nutzungsbeginn. Dann sind die ersten echten Fragen da.
- **Ersatzteile** mindestens 10 Jahre ab Werkvertrag verfügbar.
- **Sicherheit:** formelle Übergabe vom Lieferanten an den Betrieb mit Protokoll, danach ein Sicherheitsaudit. Im Wartungsvertrag Sicherheitsupdates vereinbaren; der Lieferant informiert mindestens zweimal jährlich über Major-Patches.

Siehe [KBOB-Empfehlungen](/wissen/kbob) und die Checklisten [BACnet-Funktionstest (KBOB C2)](/checklisten/kbob-bacnet-funktionstest) und [IKT-Sicherheit GA (KBOB)](/checklisten/kbob-ikt-sicherheit).

## Normen

- **VDI 3814** — Übergabe GA, Anforderungen
- **SIA 118/380** — Allgemeine Bedingungen für Gebäudetechnik, Abnahme (CH)
- **SIA 118** — Allgemeine Bedingungen, Gewährleistung

<!-- EN -->

## BMS Handover to the Operator — Contents, Training and Acceptance

The handover of the BMS to the operator is the final step of commissioning. It secures correct operation and protects the BA contractor against unjustified warranty claims.

## What is Handed Over?

### Documents (physical + digital)

**Handover package:**

- ✓ As-built DPL (data point list, Excel/CSV)
- ✓ As-built drawings (PDF + CAD)
- ✓ TAB protocol (signed)
- ✓ Punch list with status
- ✓ BMS user guide (system-specific)
- ✓ Password document (encrypted or physical)
- ✓ DDC programme backup (storage medium)
- ✓ BMS configuration backup
- ✓ Maintenance plan (recommended intervals)
- ✓ Emergency contacts (BA contractor service hotline)

### Access Credentials

- ✓ BMS login for operator (user account created, password handed over)
- ✓ VPN access for remote maintenance (if agreed)
- ✓ Remote access credentials (or: deactivated until maintenance contract)
- ✓ Network access (switches, router — if relevant)

---

## Operator Training

### Training Modules (typically 2–4 hours)

**Module 1: BMS Operation (Basic)**

**Contents:**

- Login and navigation structure
- Reading system status (colours, symbols)
- Changing setpoints (room temperature, operating hours)
- Editing time programmes
- Manual control (manual/auto)

- Practice: operator performs all actions themselves
- Duration: 60–90 minutes

**Module 2: Alarms and Faults**

**Contents:**

- Reading the alarm list: what does each alarm mean?
- Acknowledging alarms (ACK)
- Which alarms are critical, which can wait?
- When to call a service technician?
- Emergency procedure (frost protection triggered → what to do?)

- Duration: 30–45 minutes

**Module 3: Trends and Reports**

**Contents:**

- Reading trend graphs (assessing control quality)
- Accessing energy reports
- Monthly consumption overview

- Duration: 20–30 minutes

---

## Training Record

Document the training in writing (operator signature):

**Training record:**

- Date: 15.05.2026
- System: Administration Building Sample AG
- Trainer: Max Sample, BA Company AG
- Participants:
  - Maria Sample, Caretaker (signature)
  - Hans Meier, FM (signature)

- Topics:
  - ✓ BMS system operation
  - ✓ Alarms and acknowledgement
  - ✓ Adjusting time programmes
  - ✓ Emergency procedures

- Notes: operator requests additional energy analysis training
  - appointment to be arranged

---

## Warranty and Defect Management

**Warranty start:**

- CH (SIA 118): On acceptance (TAB protocol signed)
- DE: On acceptance per VOB

**Warranty period:**

- SIA 118: guarantee period 2 years from acceptance, during which defects can be notified at any time; limitation period 5 years. VOB/B: 4 years, BGB: 5 years
- Software / programming: often governed separately

**Defect record:**

- All open defects at handover → punch list with deadlines
- Remediation: meet deadlines → completion notice
- Limitation period: defects must be reported within the period!

---

## Maintenance Contract

Recommendation to operator for ongoing maintenance:

**Recommended BA maintenance intervals:**

**Semi-annual:**

- Visual inspection of all field devices
- Evaluate alarm log (recurring issues)
- Software updates (DDC / BMS)

**Annual:**

- Complete functional check (all data points)
- Calibration of key sensors (room sensors, meters)
- Renew DDC backup
- Review access: disable accounts of people and companies that have left
- Annual report to operator (energy consumption, trends)

**Every 2–5 years:**

- Full system revision
- Hardware ageing check (DDC batteries, power supplies)
- Interface check (APIs, protocols current)

---

## Handover Meeting Agenda

1. Review open defects (15 min)
2. Hand over documentation (10 min)
3. Hand over access credentials (5 min)
4. Conduct training (120 min)
5. Sign TAB protocol (5 min)
6. Discuss maintenance contract (15 min)
7. Clarify emergency contacts (5 min)

- Result: signed TAB protocol + training record
  - warranty officially starts

---

## Requirements of Public Owners (KBOB)

For federal, cantonal and municipal buildings the KBOB recommendations Building Services 2026, BACnet 2021 and ICT Security 2025 add further obligations:

- **Software belongs to the owner.** Project-specific programs are handed over in editable form, i.e. as source code, not only as a loadable image.
- **Documentation at least:** topology, operating instructions, functional and control descriptions, as-built wiring diagrams, data point test lists, functional check reports, setpoint lists after commissioning. Digital, structured and machine-readable, linked to BIM where BIM is commissioned.
- **Evidence of tests:** data point test for every data point up to the management level and an end-to-end signal test, both documented. For BACnet additionally PICS, EDE files and the functional test per annex C2.
- **Acceptance per SIA 118** with report; the updated control description is the basis of the functional check.
- **Follow-up training** for operating staff at least once, 2–4 months after occupancy. By then the first real questions have come up.
- **Spare parts** available for at least 10 years from contract.
- **Security:** formal handover from vendor to operations with report, followed by a security audit. Agree security updates in the maintenance contract; the vendor reports major patches at least twice a year.

See [KBOB Recommendations](/wissen/kbob) and the checklists [BACnet functional test (KBOB C2)](/checklisten/kbob-bacnet-funktionstest) and [ICT security BA (KBOB)](/checklisten/kbob-ikt-sicherheit).

## Standards

- **VDI 3814** — BA handover requirements
- **SIA 118/380** — General conditions for building services, acceptance (CH)
- **SIA 118** — General conditions, warranty
