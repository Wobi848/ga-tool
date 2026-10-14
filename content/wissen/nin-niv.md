---
title: NIV und NIN — wer was darf, und warum 24 V nicht automatisch frei ist
title_en: NIV and NIN — Who May Do What, and Why 24 V Is Not Automatically Exempt
slug: nin-niv
category: elektro
subcategory: recht
tags:
  [
    niv,
    nin,
    installationsbewilligung,
    anschlussbewilligung,
    art. 15,
    esti,
    sicherheitsnachweis,
    schwachstrom,
    kleinspannung,
    selv,
    kontrolle,
    isolationsmessung,
    schweiz
  ]
difficulty: grundlagen
area: [elektro, normen]
related: [5plus5-regeln, selv-pelv, schutzorgane, messen-fehlersuche, schemalesen]
norm: [NIV SR 734.27, NIN SN 411000, Schwachstromverordnung SR 734.1]
updated: 2026-10-14
lang: de
---

# NIV und NIN — wer was darf, und warum 24 V nicht automatisch frei ist

> **Kein Rechtsrat.** Dieser Artikel gibt einen Überblick nach dem Stand der unten genannten Quellen. Die NIV wird revidiert. Massgebend sind der aktuelle Verordnungstext und das ESTI. Im Zweifel die zuständige Elektrofachperson fragen.

In der Schweiz regeln zwei Dinge die elektrische Installation:

| Was     | Ist                                                              | Regelt                                                                    |
| ------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **NIV** | Niederspannungs-Installationsverordnung (SR 734.27), Bundesrecht | **Wer** installieren darf, Bewilligungen, Kontrollen, Sicherheitsnachweis |
| **NIN** | Niederspannungs-Installationsnorm (SN 411000)                    | **Wie** installiert wird: Schutzmassnahmen, Auswahl, Prüfung              |

Aufsichtsbehörde ist das **Eidgenössische Starkstrominspektorat (ESTI)**. Es erteilt die Bewilligungen und führt ein öffentliches Verzeichnis der eingeschränkten Bewilligungen.

## Die Bewilligungen

Wer elektrische Installationen erstellt, ändert oder Geräte fest anschliesst, braucht eine Bewilligung des ESTI.

| Bewilligung                             | NIV     | Für                                                                             |
| --------------------------------------- | ------- | ------------------------------------------------------------------------------- |
| **Allgemeine Installationsbewilligung** | Art. 9  | Elektroinstallationsbetriebe mit fachkundiger Person                            |
| **Betriebselektriker**                  | Art. 13 | Arbeiten an den betriebseigenen Installationen                                  |
| **Besondere Anlagen**                   | Art. 14 | z.B. Photovoltaik- und Batterieanlagen                                          |
| **Anschlussbewilligung**                | Art. 15 | Anschliessen und Ersetzen elektrischer Erzeugnisse                              |
| **Ohne Bewilligung**                    | Art. 16 | Einpolige Installationen in selbst bewohnten Räumen, mit 30-mA-FI und Kontrolle |

Für die Gebäudetechnik ist die **Anschlussbewilligung nach Art. 15** die wichtigste. Seit 2022 gibt es dafür nur noch einen Typ, der alle Erzeugnisse abdeckt. Wer Pumpen, Geräte oder Antriebe elektrisch ab- und wieder anschliesst, braucht sie. Die Arbeit wird mit einer Erstprüfung abgeschlossen und protokolliert.

Daneben dürfen Mitarbeitende ohne eigene Bewilligung nach einem vom ESTI anerkannten Kurs Service- und Reparaturarbeiten an HLKS-Komponenten hinter dem Anlageschalter ausführen. Voraussetzung ist, dass im Betrieb jemand die Anschlussbewilligung besitzt. Erzeugnisse ab- und wieder anschliessen dürfen sie damit nicht.

**Haftung:** Verantwortlich für die Installation ist ihr Eigentümer. Beauftragt er eine Firma ohne die nötige Bewilligung, machen sich beide strafbar.

## Warum 24 V nicht automatisch frei ist

Viele gehen davon aus, dass Kleinspannung nicht unter die NIV fällt. Das stimmt nur zum Teil:

- **Unter 50 V AC / 120 V DC** spricht man von Kleinspannung (SELV/PELV, siehe [SELV und PELV](/wissen/selv-pelv)).
- **Unter 2 A** ist es eine **Schwachstromanlage**. Für sie gilt die Schwachstromverordnung, nicht die NIV.
- **Über 2 A** wird daraus eine **Kleinspannungs-Starkstromanlage**. Dann gelten NIV und NIN.

Entscheidend ist, ob mehr als 2 A **fliessen können**, nicht ob sie im Betrieb fliessen. Ein 24-V-Netzteil mit 5 A Ausgangsstrom reicht dafür. In heutigen GA-Schränken ist das eher die Regel als die Ausnahme.

Die Folge: Auch der 24-V-Teil ist **kontrollpflichtig**. Er wird geprüft wie eine andere Installation, mit Sichtprüfung und Messungen nach NIN. Die Isolationsmessung erfolgt mit 250 V DC Prüfspannung, verlangt sind mindestens 0.5 MΩ. Die Protokolle gehören zum Sicherheitsnachweis.

## Sicherheitsnachweis und Kontrollen

- Nach der Installation prüft der Installateur seine Arbeit (**Erstprüfung**) und dokumentiert sie.
- Eine unabhängige Kontrolle stellt dem Eigentümer den **Sicherheitsnachweis (SiNa)** aus.
- Danach wird die Anlage **periodisch kontrolliert**. Die Periode hängt von der Art der Anlage ab und liegt zwischen einem und zwanzig Jahren.
- Der Eigentümer bewahrt das Protokoll der Erstprüfung bis zur nächsten periodischen Kontrolle auf, Datenblätter und Anleitungen für die ganze Lebensdauer der Anlage.

Für die GA heisst das: Ein Schema auf aktuellem Stand und ein Messprotokoll gehören zur Übergabe, genauso wie die [As-Built-Dokumentation](/wissen/as-built).

## Was das für den GA-Techniker heisst

| Tätigkeit                                                        | In der Regel                                                           |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Parametrieren, Programmieren, Datenpunkte testen                 | Keine Elektrobewilligung nötig                                         |
| Messen im Schrank, Signale prüfen                                | Instruktion und [5+5 Regeln](/wissen/5plus5-regeln), keine Bewilligung |
| Ausgelösten LS oder Motorschutz nach Klärung zurücksetzen        | Bedienung, keine Installation                                          |
| Feldgerät 24 V tauschen, gleicher Typ, gleiche Verdrahtung       | Je nach Anlage: im Betrieb klären                                      |
| Pumpe, Antrieb oder Gerät an 230/400 V ab- und anschliessen      | **Anschlussbewilligung Art. 15**                                       |
| Verdrahtung ändern, Stromkreise erweitern, Schutzorgane tauschen | **Installationsbewilligung**                                           |

Die Tabelle ist eine Orientierung, keine Erlaubnis. Wer unsicher ist, ob eine Arbeit Installation ist, behandelt sie als Installation.

## Quellen

- suissetec: Merkblatt 8/2022 «Elektrische Anschlussbewilligung nach NIV»
- Peter Bryner: «Kontrolle der Gebäudeautomation», Bulletin Electrosuisse 11/2022
- NIV, SR 734.27, auf fedlex.admin.ch
- ESTI: Verzeichnis der eingeschränkten Installationsbewilligungen, esti.admin.ch

<!-- EN -->

> **Not legal advice.** This article gives an overview based on the sources listed below. The NIV is being revised. The current text of the ordinance and the ESTI are authoritative. When in doubt, ask the responsible qualified electrician.

In Switzerland, two things govern electrical installations:

| What    | Is                                                          | Governs                                                       |
| ------- | ----------------------------------------------------------- | ------------------------------------------------------------- |
| **NIV** | Low-Voltage Installation Ordinance (SR 734.27), federal law | **Who** may install, permits, inspections, safety certificate |
| **NIN** | Low-Voltage Installation Standard (SN 411000)               | **How** to install: protective measures, selection, testing   |

The supervisory authority is the **Federal Inspectorate for Heavy Current Installations (ESTI)**. It issues the permits and keeps a public register of restricted permits.

## The Permits

Anyone who creates or modifies electrical installations or permanently connects equipment needs an ESTI permit.

| Permit                          | NIV     | For                                                                                |
| ------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| **General installation permit** | Art. 9  | Electrical contractors with a qualified person                                     |
| **In-house electrician**        | Art. 13 | Work on the company's own installations                                            |
| **Special installations**       | Art. 14 | e.g. photovoltaic and battery systems                                              |
| **Connection permit**           | Art. 15 | Connecting and replacing electrical products                                       |
| **No permit**                   | Art. 16 | Single-pole installations in self-occupied premises, with 30 mA RCD and inspection |

For building services, the **connection permit under Art. 15** matters most. Since 2022 there is only one type, covering all products. Anyone who electrically disconnects and reconnects pumps, equipment or drives needs it. The work is concluded with an initial test and documented.

In addition, staff without their own permit may, after an ESTI-recognised course, carry out service and repair work on HVAC and plumbing components behind the isolator. The condition is that someone in the company holds the connection permit. It does not allow them to disconnect and reconnect products.

**Liability:** the owner is responsible for the installation. If they hire a company without the required permit, both are liable to prosecution.

## Why 24 V Is Not Automatically Exempt

Many assume that extra-low voltage is outside the NIV. That is only partly true:

- **Below 50 V AC / 120 V DC** it is extra-low voltage (SELV/PELV, see [SELV and PELV](/wissen/selv-pelv)).
- **Below 2 A** it is a **weak-current installation**, governed by the Weak Current Ordinance, not the NIV.
- **Above 2 A** it becomes an **extra-low-voltage heavy-current installation**. Then the NIV and NIN apply.

What matters is whether more than 2 A **can flow**, not whether it flows in operation. A 24 V power supply rated 5 A is enough. In today's BA panels this is the rule rather than the exception.

The consequence: the 24 V part is also **subject to inspection**. It is tested like any other installation, with visual inspection and measurements per NIN. Insulation is measured at 250 V DC test voltage; at least 0.5 MΩ is required. The records form part of the safety certificate.

## Safety Certificate and Inspections

- After installation, the installer tests their work (**initial test**) and documents it.
- An independent inspection issues the **safety certificate (SiNa)** to the owner.
- After that, the installation is **inspected periodically**. The period depends on the type of installation and lies between one and twenty years.
- The owner keeps the initial test record until the next periodic inspection, and datasheets and manuals for the whole life of the installation.

For BA this means: an up-to-date diagram and a test record belong to the handover, just like the [as-built documentation](/wissen/as-built).

## What This Means for the BA Technician

| Activity                                                            | As a rule                                                     |
| ------------------------------------------------------------------- | ------------------------------------------------------------- |
| Configuring, programming, testing data points                       | No electrical permit needed                                   |
| Measuring in the panel, checking signals                            | Instruction and [5+5 rules](/wissen/5plus5-regeln), no permit |
| Resetting a tripped MCB or motor protection after finding the cause | Operation, not installation                                   |
| Replacing a 24 V field device, same type, same wiring               | Depends on the installation: clarify in-house                 |
| Disconnecting and connecting a pump, drive or device at 230/400 V   | **Connection permit Art. 15**                                 |
| Changing wiring, extending circuits, replacing protective devices   | **Installation permit**                                       |

The table is guidance, not permission. If you are unsure whether a task is installation work, treat it as installation work.

## Sources

- suissetec: Leaflet 8/2022 "Elektrische Anschlussbewilligung nach NIV"
- Peter Bryner: "Kontrolle der Gebäudeautomation", Bulletin Electrosuisse 11/2022
- NIV, SR 734.27, on fedlex.admin.ch
- ESTI: register of restricted installation permits, esti.admin.ch
