---
title: GLT-Übergabe an Betreiber — Inhalte, Schulung, Abnahme
slug: glt-uebergabe
category: dokumentation
subcategory: ibn
tags: [glt-übergabe, betreiberschulung, übergabe, abnahme, einweisung, betriebsanleitung, betreiber, fm, facility-management, schlüssel, passwörter, gewährleistung, unterhaltsvertrag, wartungsvertrag]
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
