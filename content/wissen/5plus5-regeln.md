---
title: 5+5 lebenswichtige Regeln (SUVA)
slug: 5plus5-regeln
category: sicherheit
subcategory: elektrosicherheit
tags: [suva, 5plus5, sicherheitsregeln, spannungsfreiheit, freischalten, lockout, tagout, elektrosicherheit, niv, en50110, elektroinstallation, arbeiten-unter-spannung]
difficulty: grundlagen
area: [elektro, ga]
related: [frequenzumrichter]
norm: [EN 50110-1, NIV (CH), SUVA 84042]
updated: 2026-05-14
lang: de
---

# 5+5 lebenswichtige Regeln (SUVA)

Die **„5+5 lebenswichtige Regeln im Umgang mit Elektrizität"** (SUVA-Publikation 84042, erarbeitet mit Electrosuisse) sind in der Schweiz die verbindliche Grundlage für sicheres Arbeiten an elektrischen Anlagen. Sie unterteilen sich in **5 vorbereitende Organisationsregeln** und **5 technische Sicherheitsregeln** für das Arbeiten im spannungsfreien Zustand.

> ⚠️ **Diese Regeln sind lebenswichtig.** Missachtung kann zu schweren Verletzungen oder Tod durch elektrischen Schlag führen.

## Die ersten 5 — Organisationsregeln

Diese Regeln gelten **vor Beginn** jeder Arbeit an einer elektrischen Anlage.

### 1. Für klare Aufträge sorgen

- Schriftlicher Arbeitsauftrag mit klarer Aufgabenbeschreibung
- Verantwortlichkeiten definiert: Wer darf was? Wer gibt frei?
- Bei Arbeiten durch Dritte (Subunternehmer): Koordination und Schnittstellen klären

### 2. Geeignetes Personal einsetzen

- Nur **elektrotechnisch ausgebildetes und autorisiertes** Personal darf an elektrischen Anlagen arbeiten
- Für Arbeiten unter Spannung: spezielle Zusatzausbildung erforderlich
- Gesundheitlicher Zustand beachten (kein Arbeiten unter Medikamenten-/Alkoholeinfluss)

### 3. Sichere Arbeitsmittel verwenden

- **Werkzeug:** VDE-geprüft, isolierte Griffe (1000 V), kein beschädigtes Material
- **Messmittel:** Kalibriert, geprüft, für die Spannungsklasse geeignet
- **PSA:** Isolierhandschuhe (geprüft nach EN 60903), Gesichtsschutz bei Bedarf
- Arbeitsmittel regelmässig prüfen und defekte Geräte sofort aussondern

### 4. Schutzausrüstung tragen

- **Isolierende Handschuhe** (Klasse 00–4 je nach Spannung)
- **Lichtbogenschutzkleidung** bei erhöhtem Lichtbogenrisiko
- **Sicherheitsschuhe** (ESD oder isolierend je nach Anforderung)
- **Schutzbrille** beim Arbeiten an Schaltanlagen und Klemmen

### 5. Nur geprüfte Anlagen in Betrieb nehmen

- Vor Inbetriebnahme: **Abnahmeprüfung** nach NIV / EN 61557
- Dokumentation vorhanden (Schaltpläne, Prüfprotokolle)?
- Schutzleiter und Potenzialausgleich korrekt?
- Keine provisorischen Installationen dauerhaft betreiben

---

## Die zweiten 5 — Sicherheitsregeln für spannungsfreies Arbeiten

Diese 5 Schritte sind **in dieser Reihenfolge** durchzuführen — kein Schritt darf übersprungen werden.

### 1. Freischalten — Anlage vom Netz trennen

- **Alle** Einspeisequellen trennen (Netz, USV, Notstrom, PV, Kondensatorbatterien)
- Allpolig trennen — auch den Neutralleiter bei IT-Netzen
- Trennstelle sichtbar offen (galvanische Trennung sichtbar oder verplombt)

> ⚠️ **Rückspeisungen beachten:** In der GA gibt es häufig Notstrom-USV, PV-Anlagen und Motorenrückspeisungen — alle müssen getrennt werden!

### 2. Gegen Wiedereinschalten sichern

- **Schloss** an Trennstelle (Lockout/Tagout — LOTO)
- Sicherungen herausnehmen und mitführen
- **Warnschild** anbringen: „Nicht einschalten — Personen im Stromkreis!"
- Bei mehreren Arbeitern: jede Person eigenes Schloss

### 3. Spannungsfreiheit feststellen

- Mit **geprüftem Spannungsprüfer** (2-polig!) an allen Leitern messen
- **Vorher und nachher:** Funktionsfähigkeit des Prüfgeräts an bekannter Spannungsquelle prüfen
- Alle Phasen (L1, L2, L3) und Neutralleiter prüfen
- Messung **direkt an der Arbeitsstelle**, nicht nur am Schaltschrank

> ⚠️ **Einpoliger Prüfer reicht nicht!** Kapazitive Spannungen können einpolige LED-Prüfer irreführend aufleuchten lassen.

### 4. Erden und Kurzschliessen

- Bei Anlagen **über 1000 V** zwingend
- Bei Niederspannungsanlagen mit **langen Leitungen** oder **Kondensatorkapazitäten** empfohlen
- Erst erden, dann kurzschliessen (Reihenfolge beachten!)
- Erdungs- und Kurzschlussgarnitur am Arbeitsort anbringen

### 5. Benachbarte spannungsführende Teile abdecken oder abschranken

- **Abdeckplatten, Isolierfolien, Schutzschranken** für spannungsführende Teile in der Nähe
- Sicherheitsabstände einhalten (Luftstrecken nach EN 50110)
- Bei Schaltschrankarbeiten: Nachbarfelder mit Spannung deutlich kennzeichnen

---

## Nach den Arbeiten

Vor dem Wiedereinschalten in umgekehrter Reihenfolge:
1. Erdungs- und Kurzschlussgarnituren entfernen
2. Abdeckungen und Schutzschranken entfernen
3. Alle Schlösser/Warnzeichen entfernen (jede Person ihr eigenes!)
4. Freiarbeitszone verlassen, alle Personen abgezählt?
5. Spannungsfreiheit aufheben (Sicherungen einsetzen, Trennstelle schliessen)
6. **Erst dann:** Anlage zuschalten

## Deutsches Pendant (DGUV)

In Deutschland gelten die **„5 Sicherheitsregeln"** nach DGUV Information 203-001, die technisch identisch mit den zweiten 5 SUVA-Regeln sind:

| Nr. | SUVA (CH) 2. Gruppe      | DGUV (DE)                              |
|-----|--------------------------|----------------------------------------|
| 1   | Freischalten             | Freischalten                           |
| 2   | Gegen Wiedereinschalten sichern | Gegen Wiedereinschalten sichern |
| 3   | Spannungsfreiheit feststellen | Spannungsfreiheit feststellen      |
| 4   | Erden und kurzschliessen | Erden und kurzschliessen               |
| 5   | Benachbarte Teile abdecken | Benachbarte Teile abdecken           |

Der Unterschied: SUVA ergänzt **5 Organisationsregeln** vorne — der DE-Standard setzt diese als bekannt voraus.

## Normen & Quellen

- **SUVA 84042** — «5+5 lebenswichtige Regeln im Umgang mit Elektrizität» (Faltprospekt, kostenlos bei SUVA)
- **EN 50110-1** — Betrieb von elektrischen Anlagen (europäische Basis)
- **NIV** — Niederspannungs-Installationsverordnung (CH), SR 734.27
- **DGUV Information 203-001** — Sicherheit bei der Arbeit an elektrischen Anlagen (DE)
