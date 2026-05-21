---
title: 5+5 lebenswichtige Regeln (SUVA)
title_en: 5+5 Life-Saving Electrical Safety Rules (SUVA)
slug: 5plus5-regeln
category: sicherheit
subcategory: elektrosicherheit
tags:
  [
    suva,
    5plus5,
    sicherheitsregeln,
    spannungsfreiheit,
    freischalten,
    lockout,
    tagout,
    elektrosicherheit,
    niv,
    en50110,
    elektroinstallation,
    arbeiten-unter-spannung
  ]
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

| Nr. | SUVA (CH) 2. Gruppe             | DGUV (DE)                       |
| --- | ------------------------------- | ------------------------------- |
| 1   | Freischalten                    | Freischalten                    |
| 2   | Gegen Wiedereinschalten sichern | Gegen Wiedereinschalten sichern |
| 3   | Spannungsfreiheit feststellen   | Spannungsfreiheit feststellen   |
| 4   | Erden und kurzschliessen        | Erden und kurzschliessen        |
| 5   | Benachbarte Teile abdecken      | Benachbarte Teile abdecken      |

Der Unterschied: SUVA ergänzt **5 Organisationsregeln** vorne — der DE-Standard setzt diese als bekannt voraus.

## Normen & Quellen

- **SUVA 84042** — «5+5 lebenswichtige Regeln im Umgang mit Elektrizität» (Faltprospekt, kostenlos bei SUVA)
- **EN 50110-1** — Betrieb von elektrischen Anlagen (europäische Basis)
- **NIV** — Niederspannungs-Installationsverordnung (CH), SR 734.27
- **DGUV Information 203-001** — Sicherheit bei der Arbeit an elektrischen Anlagen (DE)

<!-- EN -->

The **"5+5 Life-Saving Rules for Working with Electricity"** (SUVA publication 84042, developed with Electrosuisse) are the binding basis for safe work on electrical installations in Switzerland. They are divided into **5 preparatory organisational rules** and **5 technical safety rules** for working in a de-energised state.

> ⚠️ **These rules are life-saving.** Disregarding them can result in serious injury or death from electric shock.

## The First 5 — Organisational Rules

These rules apply **before starting** any work on an electrical installation.

### 1. Ensure Clear Work Orders

- Written work order with a clear task description
- Responsibilities defined: who may do what? who gives clearance?
- For work by third parties (subcontractors): clarify coordination and interfaces

### 2. Use Qualified Personnel

- Only **electrotechnically trained and authorised** personnel may work on electrical installations
- For live working: additional specialist training required
- Consider physical fitness (no working under the influence of medication or alcohol)

### 3. Use Safe Tools and Equipment

- **Tools:** VDE-tested, insulated handles (1000 V), no damaged items
- **Test instruments:** Calibrated, tested, rated for the voltage class
- **PPE:** Insulating gloves (tested to EN 60903), face shield if required
- Inspect tools regularly; immediately remove defective equipment from service

### 4. Wear Protective Equipment

- **Insulating gloves** (class 00–4 depending on voltage)
- **Arc flash protective clothing** where arc flash risk is elevated
- **Safety footwear** (ESD or insulating as required)
- **Safety goggles** when working on switchgear and terminals

### 5. Only Commission Tested Installations

- Before commissioning: **acceptance testing** to NIV / EN 61557
- Documentation available (wiring diagrams, test records)?
- Protective conductors and equipotential bonding correct?
- No temporary installations operated permanently

---

## The Second 5 — Safety Rules for De-Energised Work

These 5 steps must be carried out **in this exact order** — no step may be skipped.

### 1. Isolate — Disconnect the Installation from Supply

- Isolate **all** supply sources (mains, UPS, standby power, PV, capacitor banks)
- Isolate all poles — including neutral in IT systems
- Isolation point visibly open (galvanic separation visible or locked)

> ⚠️ **Watch for back-feeds:** In BA there are often UPS systems, PV installations and motor regeneration — all must be isolated!

### 2. Secure Against Re-Energisation

- **Lock** at isolation point (Lockout/Tagout — LOTO)
- Remove fuses and keep them with you
- **Warning sign:** "Do not switch on — persons in the circuit!"
- With multiple workers: each person uses their own lock

### 3. Verify Absence of Voltage

- Measure with a **tested voltage tester** (two-pole!) on all conductors
- **Before and after:** verify the tester is working on a known live source
- Check all phases (L1, L2, L3) and neutral conductor
- Measure **at the point of work**, not only at the panel

> ⚠️ **Single-pole testers are not sufficient!** Capacitive voltages can cause single-pole LED testers to glow misleadingly.

### 4. Earth and Short-Circuit

- Mandatory for installations **above 1000 V**
- Recommended for low-voltage installations with **long cables** or **capacitive loads**
- Earth first, then short-circuit (observe the sequence!)
- Apply earthing and short-circuit equipment at the point of work

### 5. Cover or Guard Adjacent Live Parts

- **Cover plates, insulating sheets, protective barriers** for live parts nearby
- Maintain safety clearances (air gaps per EN 50110)
- For switchboard work: clearly mark adjacent panels that remain live

---

## After the Work

Before re-energising, reverse the sequence:

1. Remove earthing and short-circuit equipment
2. Remove covers and protective barriers
3. Remove all locks/warning signs (each person removes their own!)
4. Leave the work zone — all persons accounted for?
5. Cancel de-energised state (insert fuses, close isolation point)
6. **Only then:** switch the installation on

## German Equivalent (DGUV)

In Germany the **"5 Safety Rules"** per DGUV Information 203-001 apply, which are technically identical to the second group of 5 SUVA rules:

| No. | SUVA (CH) 2nd group            | DGUV (DE)                      |
| --- | ------------------------------ | ------------------------------ |
| 1   | Isolate                        | Isolate                        |
| 2   | Secure against re-energisation | Secure against re-energisation |
| 3   | Verify absence of voltage      | Verify absence of voltage      |
| 4   | Earth and short-circuit        | Earth and short-circuit        |
| 5   | Cover adjacent live parts      | Cover adjacent live parts      |

The difference: SUVA adds **5 organisational rules** at the front — the German standard assumes these as prerequisites.

## Standards & References

- **SUVA 84042** — "5+5 Life-Saving Rules for Working with Electricity" (leaflet, free from SUVA)
- **EN 50110-1** — Operation of electrical installations (European basis)
- **NIV** — Low-voltage installation ordinance (CH), SR 734.27
- **DGUV Information 203-001** — Safety when working on electrical installations (DE)
