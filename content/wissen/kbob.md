---
title: KBOB-Empfehlungen für Gebäudetechnik und Gebäudeautomation
title_en: KBOB Recommendations for Building Services and Building Automation
slug: kbob
category: normen
subcategory: schweiz
tags:
  [
    kbob,
    bbl,
    öffentliche-bauherren,
    empfehlung,
    gebäudetechnik,
    bacnet,
    ikt-sicherheit,
    msrl,
    kennzeichnung,
    ausschreibung
  ]
difficulty: grundlagen
area: [ga, normen]
related:
  [
    kbob-bacnet,
    sia386,
    swki-richtlinien,
    cybersecurity-ot,
    funktionsbeschreibung,
    glt-uebergabe,
    anlagenkennzeichnung
  ]
norm: [KBOB-Empfehlung Gebäudetechnik 2026, KBOB-Empfehlung BACnet 2021]
updated: 2026-10-17
lang: de
---

# KBOB-Empfehlungen für Gebäudetechnik und Gebäudeautomation

Die **KBOB** ist die Koordinationskonferenz der Bau- und Liegenschaftsorgane der öffentlichen Bauherren. Mitglieder sind unter anderem das Bundesamt für Bauten und Logistik (BBL), armasuisse Immobilien, der ETH-Bereich, das ASTRA, das BAV sowie Kantone, Städte und Gemeinden über ihre Verbände. Die Geschäftsstelle ist beim BBL in Bern.

Die KBOB gibt **Empfehlungen** heraus, keine Normen. Sie legen für ihr Fachgebiet den Standard fest, der für Bauten der KBOB-Mitglieder anzuwenden ist. Verbindlich werden sie über den Vertrag: Verweist eine Ausschreibung auf eine KBOB-Empfehlung, muss der Unternehmer sie einhalten. Viele private Bauherren übernehmen sie ebenfalls, weil sie unabhängig von Herstellern und gut dokumentiert sind.

## Die Dokumente für Gebäudetechnik und GA

| Dokument                                         | Stand           | Inhalt für die GA                                                                                                             |
| ------------------------------------------------ | --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Empfehlung Gebäudetechnik**                    | Juli 2026       | Anforderungen an alle Gewerke über alle Phasen, Teil 5 Gebäudeautomation; ersetzt die Fassung 2020                            |
| **Empfehlung BACnet Anwendung** mit Leitfaden    | Juli 2021, V2.0 | Profile MBE-CH und AS-CH, Objekte, Meldeklassen, Prioritäten, Trends, GA-Funktionen, siehe [KBOB BACnet](/wissen/kbob-bacnet) |
| Beilagen T1, T2, C1, C2, E1, V1                  | 2021            | Zustandstexte, Eventmeldetexte, Kontroll- und Testchecklisten, Entscheidungsmatrix, Vorlage für Bauherrenvorgaben             |
| **Empfehlung IKT-Sicherheit in der GA**          | Juli 2025, V1.0 | organisatorische und technische Sicherheitsvorgaben, Sicherheitsmanagement nach ISA/IEC 62443-2-1                             |
| Empfehlung MSRL-Technik                          | April 2000      | Anlagenkennzeichnung (ORT, BTA, APPARAT, FUNKTION), Schaltgerätekombinationen, Notbedienung                                   |
| Empfehlung Energie-Messkonzept                   | Januar 2000     | Messstellen und Nummernkreise nach Medium                                                                                     |
| Empfehlung Universelle Kommunikationsverkabelung | März 2012       | strukturierte Verkabelung, auch für GA-Netze                                                                                  |
| Empfehlung Einsatz von Elektrokabeln             | Juni 2014       | Funktionserhalt und Brandverhalten von Kabeln                                                                                 |
| Empfehlung Laborbauten                           | Januar 2000     | Lüftung und Sicherheit in Laboren                                                                                             |

Alle Dokumente stehen kostenlos auf kbob.admin.ch, Rubrik Gebäudetechnik und Gebäudeautomation. Die älteren Empfehlungen sind fachlich teils überholt. Ihre Kennzeichnungssystematik lebt aber im BBL und bei vielen Kantonen weiter, und der BACnet-Leitfaden baut seinen Objektnamen darauf auf.

## Empfehlung Gebäudetechnik 2026, Teil 5 Gebäudeautomation

Die Empfehlung ergänzt die SIA-Normen und die Richtlinien der Fachverbände wie SWKI und SVGW. Für die GA verlangt sie unter anderem:

**Konzept**

- **Aufbau** aus Feldebene, Automationsebene (Schaltgerätekombination und AS) und, wo nötig, Managementebene.
- **Bedarfsabhängig steuern:** Anlagen laufen nur, wenn sie gebraucht werden.
- **Handeingriff** für jede Steuerfunktion, in Hardware oder Software. Eine **Notbedienung** nur für sehr wichtige, sicherheitsrelevante Feldgeräte.
- **Kennzeichnung** aller Datenpunkte nach einem einheitlichen Konzept, das der Bauherr vorgibt oder bewilligt.
- **Störmeldekonzept** mit technischen Störungen, Betriebszuständen und Wartungsmeldungen.
- **Subsysteme:** Für abgeschlossene Anlagen wie Beschattung oder Kältemaschinen erprobte Standardlösungen. Braucht die GA nur Freigabe, Betrieb und Störung, genügen potentialfreie Kontakte.
- **Netzwerk:** früh klären, ob ein eigenes technisches Netz oder ein VLAN. Vorgaben zur IKT-Sicherheit gelten.

**Planung und Ausführung**

- **Steuer- und Regelbeschrieb** vom GA-Planer, danach **Rückübersetzung** durch den GA-Unternehmer: Er dokumentiert Unklarheiten und Vorschläge, in einer gemeinsamen Sitzung wird der Beschrieb bereinigt. Siehe [Funktionsbeschreibung](/wissen/funktionsbeschreibung).
- **Autark:** Fällt die Kommunikation oder die Managementebene aus, regelt jede AS weiter. Bei Spannungsausfall gehen keine Daten verloren. Feldgeräte lassen sich ohne Programmierarbeit tauschen.
- **Bussysteme** nur mit Freigabe des Bauherrn.
- **Frequenzumrichter** nahe am Verbraucher, nicht in der Schaltgerätekombination, mit EMV-Filter.
- **30 % Reserve** als Richtwert: Schaltschrank, Speicher, CPU-Last, Platz für E/A-Module.
- **Herstellerneutrale Schnittstelle** nach der KBOB-Empfehlung BACnet. Ausnahmen bewilligt der Bauherr.
- **Schaltschrank** mit Beleuchtung, Steckdose und Datendose, nahe bei der Anlage, Überspannungsschutz nach Konzept.
- **Gesamtmesskonzept** aus Messstellenschema und Messstellenliste, für Abrechnung, Betriebsoptimierung und Energiemonitoring.
- **Managementebene** webfähig, unter Einhaltung der Cybersecurity-Vorgaben. Trends lassen sich einfach hinzufügen.

**Inbetriebsetzung und Übergabe**

- **Datenpunkttest** für jeden Datenpunkt vom Feldgerät bis zur Managementebene, protokolliert. Danach ein **End-zu-End-Signaltest** über die ganze Kette.
- Der nachgeführte Steuer- und Regelbeschrieb ist Grundlage der Funktionskontrolle bei der Abnahme.
- **Dokumentation** mindestens: Topologie, Bedienungsanleitungen, Funktions- sowie Steuer- und Regelbeschriebe, revidierte Elektroschemata, Datenpunkttest-Listen, Funktionskontroll-Protokolle, Sollwertlisten nach IBN.
- **Projektspezifische Software gehört dem Bauherrn** und wird als bearbeitbarer Quellcode abgegeben.
- **Ersatzteile** mindestens 10 Jahre ab Werkvertrag verfügbar.
- **Nachinstruktion** des Betriebspersonals 2–4 Monate nach Nutzungsbeginn.
- Abnahme nach SIA 118 mit Protokoll.

Die Empfehlung ordnet jedes Dokument den Phasen Vorstudie bis Realisierung zu: zum Beispiel Automationskonzept mit Topologie ab Vorprojekt, Steuer- und Regelbeschrieb, Störmeldekonzept und Datenpunktlisten ab Bauprojekt, Visualisierungskonzept ab Ausschreibung. Am Ende jeder Phase bewilligt der Bauherr die Dokumente, sie werden digital, strukturiert und maschinenlesbar abgegeben.

## Wie man die KBOB im Projekt einsetzt

1. **Bauherr klärt mit der Entscheidungsmatrix E1**, welche Punkte er übernimmt und wo er eigene Vorgaben braucht: Objektnamen, Device-ID-Struktur, Alarmkonzept, Trends, Netzwerk. Als Checkliste: [BACnet-Bauherrenvorgaben festlegen](/checklisten/kbob-bacnet-bauherrenvorgaben).
2. **Bauherrenvorgaben** mit der Vorlage V1 schreiben. Sie stehen über der KBOB-Empfehlung und ergänzen sie.
3. **Ausschreibung** verweist auf die Empfehlung und die Bauherrenvorgaben.
4. **Unternehmer bestätigt** mit Beilage C1, dass Produkt und Engineering passen: [Checkliste BACnet-Vorgaben](/checklisten/kbob-bacnet-vorgaben).
5. **Funktionstest** mit Beilage C2: [Checkliste BACnet-Funktionstest](/checklisten/kbob-bacnet-funktionstest).

## Quellen

- KBOB: Empfehlung Gebäudetechnik, Ausgabe Juli 2026
- KBOB: Empfehlung BACnet Anwendung, V2.0, Juli 2021, mit Leitfaden und Beilagen
- KBOB: Empfehlung IKT-Sicherheit in der Gebäudeautomation, V1.0, Juli 2025
- KBOB: Empfehlung MSRL-Technik, Ausgabe 1, April 2000
- kbob.admin.ch, Rubrik Gebäudetechnik und Gebäudeautomation

<!-- EN -->

**KBOB** is the Swiss coordination conference of the building and property services of public sector clients. Members include the Federal Office for Buildings and Logistics (BBL), armasuisse Real Estate, the ETH Domain, the Federal Roads Office and the Federal Office of Transport, as well as cantons, cities and municipalities through their associations. The office is at the BBL in Bern.

KBOB publishes **recommendations**, not standards. They set the standard for their field that applies to buildings of KBOB members. They become binding through the contract: if a tender refers to a KBOB recommendation, the contractor must comply. Many private owners adopt them as well, because they are vendor-neutral and well documented.

## The Documents for Building Services and BA

| Document                                         | Date            | Content for BA                                                                                                                     |
| ------------------------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Recommendation Building Services**             | July 2026       | Requirements for all trades across all phases, part 5 building automation; replaces the 2020 edition                               |
| **Recommendation BACnet Application** with guide | July 2021, V2.0 | Profiles MBE-CH and AS-CH, objects, notification classes, priorities, trends, BA functions, see [KBOB BACnet](/wissen/kbob-bacnet) |
| Annexes T1, T2, C1, C2, E1, V1                   | 2021            | State texts, event texts, check and test checklists, decision matrix, template for owner requirements                              |
| **Recommendation ICT Security in BA**            | July 2025, V1.0 | Organisational and technical security requirements, security management per ISA/IEC 62443-2-1                                      |
| Recommendation MSRL technology                   | April 2000      | Plant labelling (location, system, device, function), switchgear assemblies, emergency operation                                   |
| Recommendation energy metering concept           | January 2000    | Metering points and number ranges by medium                                                                                        |
| Recommendation universal communication cabling   | March 2012      | Structured cabling, also for BA networks                                                                                           |
| Recommendation use of electrical cables          | June 2014       | Circuit integrity and fire behaviour of cables                                                                                     |
| Recommendation laboratory buildings              | January 2000    | Ventilation and safety in laboratories                                                                                             |

All documents are free on kbob.admin.ch, section building services and building automation. The older recommendations are partly outdated technically. Their labelling scheme, however, lives on at the BBL and in many cantons, and the BACnet guide builds its object name on it.

## Recommendation Building Services 2026, Part 5 Building Automation

The recommendation complements the SIA standards and the guidelines of professional bodies such as SWKI and SVGW. For BA it requires, among other things:

**Concept**

- **Structure** of field level, automation level (switchgear assembly and automation station) and, where needed, management level.
- **Demand-based control:** systems only run when they are needed.
- **Manual override** for every control function, in hardware or software. **Emergency operation** only for very important, safety-related field devices.
- **Labelling** of all data points to a uniform scheme, specified or approved by the owner.
- **Fault reporting concept** with technical faults, operating states and maintenance messages.
- **Subsystems:** proven standard solutions for self-contained systems such as shading or chillers. If BA only needs enable, run and fault, volt-free contacts are enough.
- **Network:** clarify early whether a separate technical network or a VLAN. ICT security requirements apply.

**Design and Installation**

- **Control description** by the BA planner, then **back-translation** by the BA contractor: the contractor documents questions and proposals, and the description is finalised in a joint meeting. See [Functional Description](/wissen/funktionsbeschreibung).
- **Autonomous:** if communication or the management level fails, every station keeps controlling. No data is lost on power failure. Field devices can be replaced without programming.
- **Bus systems** only with the owner's approval.
- **Frequency converters** close to the load, not in the switchgear assembly, with EMC filter.
- **30 % reserve** as a guide value: panel, memory, CPU load, space for I/O modules.
- **Vendor-neutral interface** per the KBOB BACnet recommendation. The owner approves exceptions.
- **Panel** with lighting, power socket and data socket, close to the plant, surge protection per concept.
- **Overall metering concept** of metering diagram and metering point list, for billing, optimisation and energy monitoring.
- **Management level** web-capable, in line with cybersecurity requirements. Trends can be added easily.

**Commissioning and Handover**

- **Data point test** for every data point from field device to management level, documented. Then an **end-to-end signal test** over the whole chain.
- The updated control description is the basis of the functional check at acceptance.
- **Documentation** at least: topology, operating instructions, functional and control descriptions, as-built wiring diagrams, data point test lists, functional check reports, setpoint lists after commissioning.
- **Project-specific software belongs to the owner** and is handed over as editable source code.
- **Spare parts** available for at least 10 years from contract.
- **Follow-up training** for operating staff 2–4 months after occupancy.
- Acceptance per SIA 118 with report.

The recommendation assigns every document to the phases from preliminary study to construction: for example, the automation concept with topology from preliminary design, control description, fault reporting concept and data point lists from design, visualisation concept from tender. At the end of each phase the owner approves the documents; they are delivered digitally, structured and machine-readable.

## Using KBOB in a Project

1. **The owner works through decision matrix E1** to decide which points to adopt and where own requirements are needed: object names, device ID structure, alarm concept, trends, network. As a checklist: [Define owner BACnet requirements](/checklisten/kbob-bacnet-bauherrenvorgaben).
2. **Write owner requirements** with template V1. They rank above the KBOB recommendation and complement it.
3. **The tender** refers to the recommendation and the owner requirements.
4. **The contractor confirms** with annex C1 that product and engineering fit: [Checklist BACnet requirements](/checklisten/kbob-bacnet-vorgaben).
5. **Functional test** with annex C2: [Checklist BACnet functional test](/checklisten/kbob-bacnet-funktionstest).

## Sources

- KBOB: Empfehlung Gebäudetechnik, July 2026 edition
- KBOB: Empfehlung BACnet Anwendung, V2.0, July 2021, with guide and annexes
- KBOB: Empfehlung IKT-Sicherheit in der Gebäudeautomation, V1.0, July 2025
- KBOB: Empfehlung MSRL-Technik, edition 1, April 2000
- kbob.admin.ch, section building services and building automation
