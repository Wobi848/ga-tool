---
title: Schemalesen — Stromlaufplan für GA-Techniker
title_en: Reading Circuit Diagrams — A Guide for BA Technicians
slug: schemalesen
category: elektro
subcategory: schema
tags:
  [
    schema,
    stromlaufplan,
    schaltplan,
    schaltzeichen,
    kontaktspiegel,
    querverweis,
    selbsthaltung,
    schütz,
    relais,
    klemmenplan,
    betriebsmittelkennzeichnung,
    schaltschrank,
    fehlersuche
  ]
difficulty: grundlagen
area: [elektro, ga]
related:
  [
    selv-pelv,
    hand-0-auto,
    signaltypen,
    as-built,
    ibn-vorbereitung,
    5plus5-regeln,
    schuetzsteuerungen
  ]
norm: [IEC 60617, IEC 61082-1, IEC 81346-1, IEC 81346-2, EN 60445]
updated: 2026-10-14
lang: de
---

# Schemalesen — Stromlaufplan für GA-Techniker

Der Ventilator läuft nicht, die DDC meldet «Ein», und im Schaltschrank zieht das Schütz nicht an. Wer jetzt das Schema lesen kann, findet den Fehler in zehn Minuten. Wer es nicht kann, tauscht Teile auf Verdacht.

Dieser Artikel erklärt, wie ein Stromlaufplan aufgebaut ist und wie man ihn liest. Die Zeichen selbst stehen in der Referenztabelle [Schaltzeichen](/referenz/schaltzeichen).

## Welche Pläne es gibt

| Plan                       | Zeigt                                                 | Braucht man für              |
| -------------------------- | ----------------------------------------------------- | ---------------------------- |
| **Übersichtsschaltplan**   | Einpolig, grob: Einspeisung, Abgänge, Verbraucher     | Überblick, Energiefluss      |
| **Stromlaufplan**          | Jeder Leiter, jeder Kontakt, aufgelöst nach Funktion  | Verstehen und Fehlersuche    |
| **Klemmenplan**            | Welche Ader auf welcher Klemme liegt                  | Anschliessen, Messen im Feld |
| **Kabelplan / Kabelliste** | Welches Kabel von wo nach wo, Typ, Adernzahl          | Feldverkabelung prüfen       |
| **Aufbauplan**             | Wo im Schrank welches Gerät sitzt                     | Das Gerät `-K1` finden       |
| **Prinzipschema (HLK)**    | Anlage mit Ventilen, Pumpen, Fühlern und Datenpunkten | Zusammenhang Anlage ↔ DDC    |

In der GA hat man meist alle zusammen in einem Schemaordner oder PDF. Gelesen wird fast immer der **Stromlaufplan**, und zwar in der **aufgelösten Darstellung**: Spule und Kontakte eines Schützes stehen nicht beieinander, sondern dort, wo sie wirken.

## Die wichtigste Regel: Ruhestellung

**Alle Kontakte sind spannungslos und unbetätigt gezeichnet.** Ein Öffner ist im Schema geschlossen, ein Schliesser offen, egal wie die Anlage gerade läuft.

Wer das vergisst, liest jedes Schema verkehrt. Bei Wechslern, Grenzwertgebern und Strömungswächtern lohnt sich ein zweiter Blick: «unbetätigt» heisst beim Strömungswächter «keine Strömung», beim Thermostat «unter dem Schaltpunkt».

## Aufbau eines Schemablatts

- **Strompfade** laufen senkrecht von oben nach unten: oben das Potential (L oder +24 V), unten der Rückleiter (N oder 0 V).
- Der Blattrand ist in **Spalten** nummeriert. Jede Spalte ist ein Strompfad oder eine Gruppe davon.
- **Querverweise** zeigen, wo es weitergeht: `/12.4` heisst Blatt 12, Spalte 4. Ein Pfeil am Leiterende mit Verweis ist kein loses Ende, sondern führt auf ein anderes Blatt.
- Das **Schriftfeld** unten rechts nennt Anlage, Blatt, Revision und Datum. Vor jeder Fehlersuche prüfen, ob die Revision zum Schrank passt.

## Betriebsmittelkennzeichnung

Jedes Gerät hat ein Kennzeichen nach IEC 81346. Es besteht aus bis zu drei Teilen:

| Vorzeichen | Aspekt   | Beispiel | Bedeutung                   |
| ---------- | -------- | -------- | --------------------------- |
| `=`        | Funktion | `=RLT01` | Lüftungsanlage 1            |
| `+`        | Ort      | `+SS1`   | Schaltschrank 1             |
| `-`        | Produkt  | `-K3`    | Schütz oder Relais Nummer 3 |

Zusammen: `=RLT01+SS1-K3`. Auf dem Schemablatt steht meist nur `-K3`, der Rest ergibt sich aus dem Schriftfeld.

Der Buchstabe sagt, was das Gerät tut: **K** Relais, **Q** Leistungsschütz und Schalter, **F** Schutzorgan, **S** Taster und Schalter, **P** Meldeleuchte, **M** Motor, **T** Trafo und Netzteil, **B** Fühler, **X** Klemme. Ältere Schemas nach DIN 40719 verwenden teils andere Buchstaben, etwa **H** für Leuchten. Die vollständige Liste steht in der [Schaltzeichen-Tabelle](/referenz/schaltzeichen).

## Anschlussbezeichnungen

Die Ziffern an den Kontakten sind genormt und verraten die Funktion, ohne dass man das Zeichen sieht:

| Anschluss                 | Bedeutung                                       |
| ------------------------- | ----------------------------------------------- |
| `A1`-`A2`                 | Spule                                           |
| `1`-`2`, `3`-`4`, `5`-`6` | Hauptkontakte (Laststrom, L1/L2/L3)             |
| `x1`-`x2`                 | Hilfskontakt **Öffner** (z.B. 11-12, 21-22)     |
| `x3`-`x4`                 | Hilfskontakt **Schliesser** (z.B. 13-14, 23-24) |
| `x5`-`x6` / `x7`-`x8`     | Zeitkontakt Öffner / Schliesser                 |
| `95`-`96` / `97`-`98`     | Überlastrelais Öffner / Schliesser              |
| `X1`-`X2`                 | Meldeleuchte                                    |

Die erste Ziffer ist die **Ordnungsziffer** (welcher Kontakt), die zweite die **Funktionsziffer** (welche Art). `23-24` ist also der zweite Schliesser.

## Beispiel: Selbsthaltung mit Meldung

Die Grundschaltung schlechthin. So oder ähnlich steckt sie in jedem Ventilator- und Pumpenabgang.

<figure class="schema"><svg viewBox="0 0 330 354" role="img" aria-label="Stromlaufplan Selbsthaltung mit Stopp-Taster, Start-Taster, Schütz K1 und Meldeleuchte" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 24L320 24"/><path d="M30 304L320 304"/><circle cx="90" cy="24" r="2.5" fill="currentColor"/><path d="M90 24L90 36"/><g transform="translate(66 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M90 84L90 92"/><g transform="translate(66 92)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/><path d="M29 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><path d="M90 140L90 160"/><circle cx="90" cy="152" r="2.5" fill="currentColor"/><path d="M90 152L170 152"/><path d="M170 152L170 160"/><g transform="translate(66 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(146 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M90 208L90 232"/><path d="M170 208L170 220"/><path d="M170 220L90 220"/><circle cx="90" cy="220" r="2.5" fill="currentColor"/><g transform="translate(66 232)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M90 280L90 304"/><circle cx="90" cy="304" r="2.5" fill="currentColor"/><circle cx="270" cy="24" r="2.5" fill="currentColor"/><path d="M270 24L270 160"/><g transform="translate(246 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M270 208L270 232"/><g transform="translate(246 232)"><path d="M24 0V14M24 34V48"/><circle cx="24" cy="24" r="10"/><path d="M17 17L31 31M31 17L17 31"/></g><path d="M270 280L270 304"/><circle cx="270" cy="304" r="2.5" fill="currentColor"/><path d="M60 318L120 318"/><path d="M90 321L90 348"/><g fill="currentColor" stroke="none"><text x="90" y="11" text-anchor="middle" font-size="10">1</text><text x="170" y="11" text-anchor="middle" font-size="10">2</text><text x="270" y="11" text-anchor="middle" font-size="10">3</text><text x="24" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="24" y="308" text-anchor="end" font-size="11" font-weight="600">N</text><text x="104" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="86" y="46" text-anchor="end" font-size="10.5">95</text><text x="86" y="80" text-anchor="end" font-size="10.5">96</text><text x="104" y="120" text-anchor="start" font-size="12.5" font-weight="600">-S1</text><text x="86" y="102" text-anchor="end" font-size="10.5">11</text><text x="86" y="136" text-anchor="end" font-size="10.5">12</text><text x="104" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S2</text><text x="86" y="170" text-anchor="end" font-size="10.5">13</text><text x="86" y="204" text-anchor="end" font-size="10.5">14</text><text x="184" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="166" y="170" text-anchor="end" font-size="10.5">13</text><text x="166" y="204" text-anchor="end" font-size="10.5">14</text><text x="110" y="260" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="86" y="242" text-anchor="end" font-size="10.5">A1</text><text x="86" y="276" text-anchor="end" font-size="10.5">A2</text><text x="284" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="266" y="170" text-anchor="end" font-size="10.5">23</text><text x="266" y="204" text-anchor="end" font-size="10.5">24</text><text x="284" y="260" text-anchor="start" font-size="12.5" font-weight="600">-P1</text><text x="266" y="242" text-anchor="end" font-size="10.5">X1</text><text x="266" y="276" text-anchor="end" font-size="10.5">X2</text><text x="84" y="332" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="96" y="332" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="84" y="345" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">23 24</text><text x="96" y="345" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text></g></svg><figcaption>Steuerstromkreis einer Selbsthaltung. Unter der Spule der Kontaktspiegel von -K1.</figcaption></figure>

**So liest man es:**

1. **Pfad 1:** Von L über den Überlastkontakt `-F2` (95-96), den Stopp-Taster `-S1` (Öffner) und den Start-Taster `-S2` (Schliesser) zur Spule `-K1`.
2. **Start drücken:** `-S2` schliesst, `-K1` zieht an.
3. **Pfad 2:** Der Hilfskontakt `-K1` 13-14 liegt parallel zu `-S2` und schliesst jetzt ebenfalls. Lässt man den Start-Taster los, fliesst der Strom über diesen Kontakt weiter. Das ist die **Selbsthaltung**.
4. **Pfad 3:** Der zweite Schliesser `-K1` 23-24 schaltet die Meldeleuchte `-P1`.
5. **Stopp oder Überlast:** `-S1` oder `-F2` unterbricht Pfad 1, `-K1` fällt ab, beide Hilfskontakte öffnen. Die Anlage bleibt aus, bis jemand wieder Start drückt.

**Der Kontaktspiegel** unter der Spule sagt: `-K1` hat einen Kontakt 13-14 in Spalte 2 und einen Kontakt 23-24 in Spalte 3. So findet man alle Kontakte eines Schützes, auch wenn sie auf anderen Blättern liegen.

Warum Stopp ein **Öffner** ist: bricht der Draht, wirkt das wie Stopp. Die Anlage geht aus statt unkontrolliert weiterzulaufen. Dasselbe Prinzip gilt für Not-Halt, Frostschutz und Brandfallsteuerung.

In der GA ersetzt meist ein **DO der DDC** den Start-Taster, oft über einen [Hand-0-Auto-Schalter](/wissen/hand-0-auto). Die Rückmeldung «Betrieb» kommt dann über einen weiteren Hilfskontakt auf einen DI.

## Fehlersuche mit dem Schema

1. **Das Ende suchen:** Welches Gerät tut nicht, was es soll? Die Spule oder der Verbraucher ist der Startpunkt.
2. **Den Pfad rückwärts verfolgen:** von der Spule nach oben bis zum Potential. Jeder Kontakt auf dem Weg ist ein Kandidat.
3. **Im Aufbauplan das Gerät finden**, im Klemmenplan die Klemme.
4. **Messen gegen N bzw. 0 V**, Kontakt für Kontakt: wo die Spannung aufhört, liegt der Fehler zwischen der letzten und dieser Messstelle.
5. **Kontaktspiegel prüfen:** Hängt ein anderer Pfad an demselben Schütz? Oft fehlt eine Freigabe auf einem anderen Blatt.

**Sicherheit:** Arbeiten am offenen Schrank nur nach den [5+5 lebenswichtigen Regeln](/wissen/5plus5-regeln) und nur mit der dafür nötigen Berechtigung. Messen unter Spannung erfordert geeignetes Messgerät (mindestens CAT III) und Schutzausrüstung.

## Typische Stolperfallen

| Falle                                      | Was passiert                                    |
| ------------------------------------------ | ----------------------------------------------- |
| Kontakt als Ist-Zustand gelesen            | Öffner «ist doch geschlossen», Fehler übersehen |
| Kreuzung ohne Punkt als Verbindung gelesen | Falscher Strompfad, falsche Messstelle          |
| Querverweis nicht verfolgt                 | Freigabe auf anderem Blatt übersehen            |
| Schema-Revision passt nicht zum Schrank    | Man sucht ein Gerät, das umverdrahtet wurde     |
| 24-V- und 230-V-Kreis verwechselt          | Messgerät falsch eingestellt, Gefahr            |

## Normen

- **IEC 60617** — Grafische Symbole für Schaltpläne
- **IEC 61082-1** — Dokumente der Elektrotechnik, Regeln für Schaltpläne
- **IEC 81346-1/-2** — Strukturierung und Kennbuchstaben für Betriebsmittel
- **EN 60445** — Kennzeichnung von Anschlüssen und Leitern

<!-- EN -->

The fan does not run, the DDC reports "on", and the contactor in the panel does not pull in. Anyone who can read the diagram finds the fault in ten minutes. Anyone who cannot swaps parts on suspicion.

This article explains how a circuit diagram is structured and how to read it. The symbols themselves are in the reference table [Circuit Symbols](/referenz/schaltzeichen).

## Types of Diagram

| Diagram                     | Shows                                                  | Needed for                         |
| --------------------------- | ------------------------------------------------------ | ---------------------------------- |
| **Overview diagram**        | Single-line, coarse: supply, feeders, loads            | Overview, energy flow              |
| **Circuit diagram**         | Every conductor, every contact, detached by function   | Understanding and troubleshooting  |
| **Terminal diagram**        | Which core lands on which terminal                     | Connecting, measuring in the field |
| **Cable plan / cable list** | Which cable from where to where, type, number of cores | Checking field wiring              |
| **Panel layout**            | Where each device sits in the panel                    | Finding device `-K1`               |
| **HVAC schematic**          | Plant with valves, pumps, sensors and data points      | Linking plant ↔ DDC                |

In BA you usually get all of them together in one folder or PDF. What you read most is the **circuit diagram** in **detached representation**: a contactor's coil and contacts are not drawn together but where they act.

## The Most Important Rule: Rest Position

**All contacts are drawn de-energised and not actuated.** An NC contact is closed in the diagram, an NO contact open, regardless of what the plant is doing right now.

Forget this and you read every diagram the wrong way round. Changeover contacts, limit switches and flow switches deserve a second look: "not actuated" means "no flow" for a flow switch and "below the switching point" for a thermostat.

## Structure of a Diagram Sheet

- **Current paths** run vertically from top to bottom: potential at the top (L or +24 V), return at the bottom (N or 0 V).
- The sheet border is numbered in **columns**. Each column is one current path or a group of them.
- **Cross-references** show where things continue: `/12.4` means sheet 12, column 4. An arrow at the end of a conductor with a reference is not a loose end but leads to another sheet.
- The **title block** at the bottom right names plant, sheet, revision and date. Before any troubleshooting, check that the revision matches the panel.

## Reference Designation

Every device has a designation per IEC 81346 with up to three parts:

| Prefix | Aspect   | Example  | Meaning                     |
| ------ | -------- | -------- | --------------------------- |
| `=`    | Function | `=RLT01` | Air handling unit 1         |
| `+`    | Location | `+SS1`   | Control panel 1             |
| `-`    | Product  | `-K3`    | Contactor or relay number 3 |

Together: `=RLT01+SS1-K3`. The sheet usually shows only `-K3`; the rest follows from the title block.

The letter says what the device does: **K** relay, **Q** power contactor and switch, **F** protective device, **S** push button and switch, **P** indicator lamp, **M** motor, **T** transformer and power supply, **B** sensor, **X** terminal. Older diagrams per DIN 40719 sometimes use different letters, e.g. **H** for lamps. The complete list is in the [Circuit Symbols table](/referenz/schaltzeichen).

## Terminal Markings

The numbers on contacts are standardised and reveal the function without seeing the symbol:

| Terminal                  | Meaning                                      |
| ------------------------- | -------------------------------------------- |
| `A1`-`A2`                 | Coil                                         |
| `1`-`2`, `3`-`4`, `5`-`6` | Main contacts (load current, L1/L2/L3)       |
| `x1`-`x2`                 | Auxiliary **NC** contact (e.g. 11-12, 21-22) |
| `x3`-`x4`                 | Auxiliary **NO** contact (e.g. 13-14, 23-24) |
| `x5`-`x6` / `x7`-`x8`     | Timed contact NC / NO                        |
| `95`-`96` / `97`-`98`     | Overload relay NC / NO                       |
| `X1`-`X2`                 | Indicator lamp                               |

The first digit is the **sequence number** (which contact), the second the **function number** (which kind). `23-24` is therefore the second NO contact.

## Example: Self-Holding Circuit with Indication

The basic circuit par excellence. It is in every fan and pump feeder in some form.

<figure class="schema"><svg viewBox="0 0 330 354" role="img" aria-label="Circuit diagram of a self-holding circuit with stop button, start button, contactor K1 and indicator lamp" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 24L320 24"/><path d="M30 304L320 304"/><circle cx="90" cy="24" r="2.5" fill="currentColor"/><path d="M90 24L90 36"/><g transform="translate(66 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M90 84L90 92"/><g transform="translate(66 92)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/><path d="M29 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><path d="M90 140L90 160"/><circle cx="90" cy="152" r="2.5" fill="currentColor"/><path d="M90 152L170 152"/><path d="M170 152L170 160"/><g transform="translate(66 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(146 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M90 208L90 232"/><path d="M170 208L170 220"/><path d="M170 220L90 220"/><circle cx="90" cy="220" r="2.5" fill="currentColor"/><g transform="translate(66 232)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M90 280L90 304"/><circle cx="90" cy="304" r="2.5" fill="currentColor"/><circle cx="270" cy="24" r="2.5" fill="currentColor"/><path d="M270 24L270 160"/><g transform="translate(246 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M270 208L270 232"/><g transform="translate(246 232)"><path d="M24 0V14M24 34V48"/><circle cx="24" cy="24" r="10"/><path d="M17 17L31 31M31 17L17 31"/></g><path d="M270 280L270 304"/><circle cx="270" cy="304" r="2.5" fill="currentColor"/><path d="M60 318L120 318"/><path d="M90 321L90 348"/><g fill="currentColor" stroke="none"><text x="90" y="11" text-anchor="middle" font-size="10">1</text><text x="170" y="11" text-anchor="middle" font-size="10">2</text><text x="270" y="11" text-anchor="middle" font-size="10">3</text><text x="24" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="24" y="308" text-anchor="end" font-size="11" font-weight="600">N</text><text x="104" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="86" y="46" text-anchor="end" font-size="10.5">95</text><text x="86" y="80" text-anchor="end" font-size="10.5">96</text><text x="104" y="120" text-anchor="start" font-size="12.5" font-weight="600">-S1</text><text x="86" y="102" text-anchor="end" font-size="10.5">11</text><text x="86" y="136" text-anchor="end" font-size="10.5">12</text><text x="104" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S2</text><text x="86" y="170" text-anchor="end" font-size="10.5">13</text><text x="86" y="204" text-anchor="end" font-size="10.5">14</text><text x="184" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="166" y="170" text-anchor="end" font-size="10.5">13</text><text x="166" y="204" text-anchor="end" font-size="10.5">14</text><text x="110" y="260" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="86" y="242" text-anchor="end" font-size="10.5">A1</text><text x="86" y="276" text-anchor="end" font-size="10.5">A2</text><text x="284" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="266" y="170" text-anchor="end" font-size="10.5">23</text><text x="266" y="204" text-anchor="end" font-size="10.5">24</text><text x="284" y="260" text-anchor="start" font-size="12.5" font-weight="600">-P1</text><text x="266" y="242" text-anchor="end" font-size="10.5">X1</text><text x="266" y="276" text-anchor="end" font-size="10.5">X2</text><text x="84" y="332" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="96" y="332" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="84" y="345" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">23 24</text><text x="96" y="345" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text></g></svg><figcaption>Control circuit of a self-holding circuit. Below the coil, the contact table of -K1.</figcaption></figure>

**How to read it:**

1. **Path 1:** From L via the overload contact `-F2` (95-96), the stop button `-S1` (NC) and the start button `-S2` (NO) to the coil `-K1`.
2. **Press start:** `-S2` closes, `-K1` pulls in.
3. **Path 2:** The auxiliary contact `-K1` 13-14 is in parallel with `-S2` and now closes too. When the start button is released, current keeps flowing through this contact. That is the **self-holding** (latching).
4. **Path 3:** The second NO contact `-K1` 23-24 switches the indicator lamp `-P1`.
5. **Stop or overload:** `-S1` or `-F2` interrupts path 1, `-K1` drops out, both auxiliary contacts open. The plant stays off until someone presses start again.

**The contact table** below the coil says: `-K1` has a contact 13-14 in column 2 and a contact 23-24 in column 3. This is how you find all contacts of a contactor, even when they are on other sheets.

Why stop is an **NC** contact: a broken wire acts like stop. The plant goes off instead of running on uncontrolled. The same principle applies to emergency stop, frost protection and fire control.

In BA a **DDC digital output** usually replaces the start button, often via a [Hand-Off-Auto switch](/wissen/hand-0-auto). The "running" feedback then comes from another auxiliary contact to a DI.

## Troubleshooting with the Diagram

1. **Find the end:** Which device does not do what it should? The coil or the load is the starting point.
2. **Trace the path backwards:** from the coil up to the potential. Every contact on the way is a suspect.
3. **Find the device in the panel layout**, the terminal in the terminal diagram.
4. **Measure against N or 0 V**, contact by contact: where the voltage stops, the fault lies between the last and this measuring point.
5. **Check the contact table:** Does another path depend on the same contactor? Often an enable on another sheet is missing.

**Safety:** Work on an open panel only per the [5+5 life-saving rules](/wissen/5plus5-regeln) and only with the required authorisation. Live measurement requires a suitable meter (at least CAT III) and protective equipment.

## Common Pitfalls

| Pitfall                                 | What happens                               |
| --------------------------------------- | ------------------------------------------ |
| Contact read as current state           | NC "is closed after all", fault overlooked |
| Crossing without dot read as a junction | Wrong current path, wrong measuring point  |
| Cross-reference not followed            | Enable on another sheet overlooked         |
| Diagram revision does not match panel   | Searching for a device that was rewired    |
| 24 V and 230 V circuits confused        | Meter set incorrectly, danger              |

## Standards

- **IEC 60617** — Graphical symbols for diagrams
- **IEC 61082-1** — Preparation of documents used in electrotechnology
- **IEC 81346-1/-2** — Structuring principles and reference designations
- **EN 60445** — Identification of equipment terminals and conductors
