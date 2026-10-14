---
title: Brandschutzklappen (BSK) — Ansteuerung und Protokollierung
title_en: Fire Dampers — Control and Documentation
slug: brandschutzklappen
category: sicherheit
subcategory: brandschutz
tags:
  [
    bsk,
    brandschutzklappe,
    feuerschutzklappe,
    brandschutz,
    feuerwiderstand,
    rauchabzug,
    rwa,
    auslösung,
    thermoelement,
    rückmeldung,
    protokoll,
    inbetriebnahme,
    schmelzeinsatz,
    en15650,
    en1366
  ]
difficulty: fortgeschritten
area: [ga, elektro, hlk]
related: [rlt-anlage, alarmmanagement, glt-grundlagen, entrauchung-rwa, ddc-programmierung]
norm: [EN 15650, EN 1366-2, EN 13501-3, VKF-Brandschutzrichtlinien]
updated: 2026-10-14
lang: de
---

# Brandschutzklappen (BSK) — Ansteuerung und Protokollierung

**Brandschutzklappen** schliessen Lüftungskanäle dort, wo sie eine Brandabschnittsgrenze durchqueren. So gelangen Feuer und Rauch nicht über das Kanalnetz in den nächsten Brandabschnitt. Die GA überwacht die Klappen, protokolliert Tests und meldet Störungen. Die Auslösung im Brandfall ist Sache der Brandmeldeanlage und der Brandfallsteuerung.

## Arten

| Art                    | Wirkung                                                                                                                                   |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Brandschutzklappe**  | Feuerwiderstand, etwa EI 30 S oder EI 90 S nach EN 13501-3; schliesst thermisch und meist auch elektrisch                                 |
| **Rauchschutzklappe**  | verhindert Rauchausbreitung, schliesst auf Signal eines Rauchmelders                                                                      |
| **Entrauchungsklappe** | Teil der maschinellen Entrauchung, muss im Brandfall gezielt öffnen oder schliessen, siehe [Entrauchung und RWA](/wissen/entrauchung-rwa) |

Die Klassierung **EI 90 S** heisst: Raumabschluss (E) und Wärmedämmung (I) während 90 Minuten, S für begrenzte Rauchdurchlässigkeit.

## Auslösung

| Auslöser                                 | Funktion                                                                              |
| ---------------------------------------- | ------------------------------------------------------------------------------------- |
| **Schmelzlot**                           | schmilzt bei etwa 72 °C, eine Feder schliesst die Klappe. Rein mechanisch             |
| **Thermoelektrische Auslöseeinrichtung** | im Federrücklaufantrieb, löst bei etwa 72 °C im Kanal aus und unterbricht den Antrieb |
| **Spannung weg**                         | der Federrücklaufantrieb schliesst die Klappe                                         |
| **Kanalrauchmelder**                     | optischer Melder im Kanal, schaltet die Spannung über die Brandfallsteuerung ab       |

Motorische Brandschutzklappen arbeiten nach dem **Ruhestromprinzip**: Solange 24 V oder 230 V anliegen, hält der Antrieb die Klappe offen. Fällt die Spannung weg, durch einen Befehl, einen Drahtbruch oder einen Stromausfall, schliesst die Feder. Das ist gewollt.

## Rolle der GA

In der Schweiz legen die VKF-Brandschutzrichtlinien fest, wann Klappen zusätzlich zur thermischen Auslösung über Rauchmelder oder die Brandmeldeanlage schliessen müssen. Diese Auslösung läuft über die **Brandfallsteuerung** und darf nicht von der GA abhängen. Die GA übernimmt:

- Überwachung der Endlagen AUF und ZU
- **Periodische Funktionstests**, oft automatisch nachts: Klappe zu, Laufzeit messen, wieder auf
- Protokollierung jedes Tests und jeder Auslösung
- Meldungen an Betreiber und Pikett

Die Ansteuerung erfolgt über Relais oder spezielle BSK-Steuermodule, nicht direkt über Transistorausgänge der DDC. Viele Hersteller bieten Bus-Module an, die mehrere Klappen überwachen und testen.

## Meldungen

| Signal              | Typ | Bedeutung                                             |
| ------------------- | --- | ----------------------------------------------------- |
| Endschalter AUF     | BI  | Klappe offen                                          |
| Endschalter ZU      | BI  | Klappe geschlossen                                    |
| Laufzeitüberwachung | BV  | Endlage nach Befehl nicht innerhalb der Zeit erreicht |
| Test ok / nicht ok  | BV  | Ergebnis der letzten Funktionsprüfung                 |

| Meldung                                   | Priorität | Massnahme                                                        |
| ----------------------------------------- | --------- | ---------------------------------------------------------------- |
| Klappe ausserhalb eines Tests geschlossen | hoch      | Ursache klären; die Alarmierung der Feuerwehr läuft über die BMA |
| Endlage nicht erreicht                    | hoch      | Klappe vor Ort prüfen, Brandschutz ist nicht gewährleistet       |
| Test fehlgeschlagen                       | hoch      | Instandsetzung veranlassen                                       |

Schliesst eine Klappe, muss die Lüftungsanlage reagieren, etwa den Ventilator abschalten, damit der Kanaldruck nicht steigt. Das gehört in den Funktionsbeschrieb und die Brandfallmatrix.

## Rückstellung

- **Motorische Klappe nach Spannungsunterbruch oder Test:** Spannung wieder anlegen, der Antrieb öffnet die Klappe. Die Endlage AUF bestätigt es.
- **Nach thermischer Auslösung:** Schmelzlot oder thermoelektrische Auslöseeinrichtung vor Ort prüfen und ersetzen oder zurückstellen. Erst dann wieder öffnen.
- **Nach einem Brand:** Klappe und Einbau durch Fachpersonal prüfen lassen.

Jede Rückstellung wird mit Datum, Uhrzeit und Person protokolliert.

## Inbetriebnahme

1. Klappenliste mit Bezeichnung, Ort, Brandabschnitt, Typ, Klassierung und Hersteller
2. Einbau nach Herstellerangabe und Zulassung, Einbaulage und Revisionsöffnung prüfen
3. Auslösung durch Spannungsunterbruch: Klappe schliesst, Endlage ZU kommt
4. Wiederöffnen: Endlage AUF kommt
5. Ansteuerung durch die Brandfallsteuerung im integralen Test mit der BMA
6. Laufzeiten notieren, Protokoll unterschreiben

## Wiederkehrende Prüfungen

Die Prüfintervalle legen Hersteller und Behörde fest. **EN 15650** empfiehlt eine Funktionsprüfung **alle sechs Monate**. Nach zwei erfolgreichen Prüfungen in Folge darf auf **jährlich** verlängert werden. Automatische Tests über die GA oder ein BSK-Steuersystem erleichtern das, ersetzen aber die Sichtkontrolle vor Ort nicht.

## Normen

- **EN 15650** — Brandschutzklappen, Produktnorm mit Hinweisen zur Wartung
- **EN 1366-2** — Feuerwiderstandsprüfung von Brandschutzklappen
- **EN 13501-3** — Klassierung, etwa EI 90 S
- **VKF-Brandschutzrichtlinie Lufttechnische Anlagen** (CH)
- **VKF-Brandschutzrichtlinie Brandmeldeanlagen** (CH), Brandfallsteuerung

<!-- EN -->

**Fire dampers** close ventilation ducts where they cross a fire compartment boundary. This keeps fire and smoke from passing through the duct network into the next compartment. The BA monitors the dampers, records tests and reports faults. Triggering in a fire is the job of the fire alarm system and the fire control system.

## Types

| Type                     | Function                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **Fire damper**          | fire resistance, such as EI 30 S or EI 90 S per EN 13501-3; closes thermally and usually also electrically                     |
| **Smoke damper**         | prevents smoke spread, closes on a smoke detector signal                                                                       |
| **Smoke control damper** | part of mechanical smoke extraction, must open or close as required in a fire, see [Smoke Extraction](/wissen/entrauchung-rwa) |

The classification **EI 90 S** means integrity (E) and insulation (I) for 90 minutes, S for limited smoke leakage.

## Triggering

| Trigger                    | Function                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------- |
| **Fusible link**           | melts at about 72 °C, a spring closes the damper. Purely mechanical                   |
| **Thermoelectric release** | in the spring-return actuator, trips at about 72 °C in the duct and cuts the actuator |
| **Loss of voltage**        | the spring-return actuator closes the damper                                          |
| **Duct smoke detector**    | optical detector in the duct, cuts the voltage via the fire control system            |

Motorised fire dampers work on the **fail-safe principle**: as long as 24 V or 230 V is present, the actuator holds the damper open. If the voltage drops, through a command, a wire break or a power failure, the spring closes it. That is intended.

## Role of the BA

In Switzerland the VKF fire protection guidelines define when dampers must also close via smoke detectors or the fire alarm system, in addition to thermal release. This triggering runs through the **fire control system** and must not depend on the BA. The BA takes care of:

- monitoring the OPEN and CLOSED end positions
- **periodic function tests**, often automatically at night: damper closed, measure running time, open again
- recording every test and every trip
- messages to the operator and on-call staff

Control is via relays or dedicated fire damper control modules, not directly via DDC transistor outputs. Many manufacturers offer bus modules that monitor and test several dampers.

## Signals

| Signal               | Type | Meaning                                                  |
| -------------------- | ---- | -------------------------------------------------------- |
| Limit switch OPEN    | BI   | damper open                                              |
| Limit switch CLOSED  | BI   | damper closed                                            |
| Running time monitor | BV   | end position not reached within the time after a command |
| Test ok / not ok     | BV   | result of the last function test                         |

| Message                      | Priority | Action                                                                |
| ---------------------------- | -------- | --------------------------------------------------------------------- |
| Damper closed outside a test | high     | find the cause; the fire brigade is alerted via the fire alarm system |
| End position not reached     | high     | check the damper on site, fire protection not ensured                 |
| Test failed                  | high     | arrange repair                                                        |

When a damper closes, the ventilation system must respond, for example by stopping the fan so duct pressure does not rise. This belongs in the functional description and the fire control matrix.

## Reset

- **Motorised damper after loss of voltage or a test:** restore the voltage, the actuator opens the damper. The OPEN end position confirms it.
- **After thermal release:** check the fusible link or thermoelectric release on site and replace or reset it. Only then reopen.
- **After a fire:** have the damper and its installation checked by specialists.

Every reset is recorded with date, time and person.

## Commissioning

1. Damper list with designation, location, fire compartment, type, classification and manufacturer
2. Installation per manufacturer instructions and approval, check orientation and access opening
3. Trip by removing voltage: damper closes, CLOSED end position arrives
4. Reopen: OPEN end position arrives
5. Triggering by the fire control system in the integrated test with the fire alarm system
6. Record running times, sign the report

## Periodic Inspection

Intervals are set by the manufacturer and the authority. **EN 15650** recommends a function test **every six months**. After two consecutive successful tests the interval may be extended to **annual**. Automatic tests via the BA or a fire damper control system make this easier but do not replace a visual check on site.

## Standards

- **EN 15650** — Fire dampers, product standard with maintenance guidance
- **EN 1366-2** — Fire resistance test for fire dampers
- **EN 13501-3** — Classification, such as EI 90 S
- **VKF fire protection guideline on ventilation systems** (CH)
- **VKF fire protection guideline on fire alarm systems** (CH), fire control
