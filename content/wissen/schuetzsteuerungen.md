---
title: Schützsteuerungen — Selbsthaltung, Verriegelung, DDC-Ansteuerung
title_en: Contactor Control — Latching, Interlocking, DDC Control
slug: schuetzsteuerungen
category: elektro
subcategory: steuerung
tags:
  [
    schütz,
    relais,
    koppelrelais,
    selbsthaltung,
    verriegelung,
    zeitrelais,
    rückmeldung,
    betriebsmeldung,
    störmeldung,
    freilaufdiode,
    stern-dreieck,
    zweistufig,
    steuerstromkreis
  ]
difficulty: fortgeschritten
area: [elektro, ga]
related: [schemalesen, hand-0-auto, signaltypen, selv-pelv, frequenzumrichter, ec-motoren]
norm: [EN 60947-4-1, EN 60947-5-1, EN 50005, EN 60204-1]
updated: 2026-10-14
lang: de
---

# Schützsteuerungen — Selbsthaltung, Verriegelung, DDC-Ansteuerung

Hinter fast jedem DO der DDC sitzt ein Relais oder ein Schütz. Die Schaltungen dahinter sind immer dieselben wenigen Muster. Wer sie kennt, liest einen Lüftungsschrank in wenigen Minuten.

Grundlagen zum Lesen der Pläne stehen in [Schemalesen](/wissen/schemalesen), die Zeichen in der [Schaltzeichen-Tabelle](/referenz/schaltzeichen).

## Relais, Koppelrelais, Schütz

| Gerät               | Schaltet                     | Typisch in der GA                          |
| ------------------- | ---------------------------- | ------------------------------------------ |
| **Koppelrelais**    | Kleine Ströme, Steuersignale | Zwischen DDC-Ausgang und 230-V-Steuerkreis |
| **Hilfsschütz**     | Steuerstromkreise            | Verknüpfungen, Freigaben, Verriegelungen   |
| **Leistungsschütz** | Motoren, Heizregister        | Ventilator, Pumpe, Elektroheizung          |

Ein Schütz hat **Hauptkontakte** (1-2, 3-4, 5-6) für den Laststrom und **Hilfskontakte** (13-14, 21-22 …) für die Steuerung. Ausgelegt wird nach **Gebrauchskategorie**: AC-3 für Käfigläufermotoren, AC-1 für ohmsche Last wie Heizregister. Ein Schütz für 9 A in AC-3 schaltet in AC-1 deutlich mehr.

Die **Spulenspannung** steht auf dem Schütz und im Schema: 24 VAC, 24 VDC oder 230 VAC. Ein 24-V-Schütz an 230 V brennt sofort durch, ein 230-V-Schütz an 24 V zieht einfach nicht an.

## Selbsthaltung

Ein Tastimpuls genügt, der eigene Hilfskontakt hält das Schütz danach. Die Schaltung ist in [Schemalesen](/wissen/schemalesen) Schritt für Schritt erklärt.

Zwei Varianten:

- **Stopp dominant:** Der Stopp-Öffner liegt vor dem ganzen Pfad. Drückt man Start und Stopp gleichzeitig, bleibt die Anlage aus. Das ist der Normalfall.
- **Start dominant:** Der Stopp-Öffner liegt nur im Selbsthaltezweig. Gleichzeitiges Drücken schaltet ein. Selten und nur dort, wo Einschalten wichtiger ist als Ausschalten.

## Verriegelung

Zwei Schütze, die nie gleichzeitig anziehen dürfen: Rechts- und Linkslauf, Stufe 1 und Stufe 2 eines Ventilators, Pumpe 1 und Pumpe 2 an derselben Zuleitung. Zögen beide an, gäbe es einen Kurzschluss oder einen zerstörten Motor.

<figure class="schema"><svg viewBox="0 0 350 396" role="img" aria-label="Stromlaufplan mit gegenseitiger Verriegelung zweier Schütze K1 und K2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 24L340 24"/><path d="M30 352L340 352"/><circle cx="80" cy="24" r="2.5" fill="currentColor"/><path d="M80 24L80 36"/><g transform="translate(56 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M80 84L80 92"/><g transform="translate(56 92)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/><path d="M29 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><path d="M80 140L80 160"/><path d="M80 152L300 152"/><circle cx="80" cy="152" r="2.5" fill="currentColor"/><circle cx="150" cy="152" r="2.5" fill="currentColor"/><circle cx="230" cy="152" r="2.5" fill="currentColor"/><path d="M150 152L150 160"/><g transform="translate(56 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(126 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M80 208L80 228"/><path d="M150 208L150 220"/><path d="M150 220L80 220"/><circle cx="80" cy="220" r="2.5" fill="currentColor"/><g transform="translate(56 228)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M80 276L80 288"/><g transform="translate(56 288)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M80 336L80 352"/><circle cx="80" cy="352" r="2.5" fill="currentColor"/><path d="M300 152L300 160"/><path d="M230 152L230 160"/><g transform="translate(206 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(276 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M230 208L230 228"/><path d="M300 208L300 220"/><path d="M300 220L230 220"/><circle cx="230" cy="220" r="2.5" fill="currentColor"/><g transform="translate(206 228)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M230 276L230 288"/><g transform="translate(206 288)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M230 336L230 352"/><circle cx="230" cy="352" r="2.5" fill="currentColor"/><path d="M50 362L110 362"/><path d="M80 365L80 392"/><path d="M200 362L260 362"/><path d="M230 365L230 392"/><g fill="currentColor" stroke="none"><text x="80" y="11" text-anchor="middle" font-size="10">1</text><text x="150" y="11" text-anchor="middle" font-size="10">2</text><text x="230" y="11" text-anchor="middle" font-size="10">3</text><text x="300" y="11" text-anchor="middle" font-size="10">4</text><text x="24" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="24" y="356" text-anchor="end" font-size="11" font-weight="600">N</text><text x="94" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="76" y="46" text-anchor="end" font-size="10.5">95</text><text x="76" y="80" text-anchor="end" font-size="10.5">96</text><text x="94" y="120" text-anchor="start" font-size="12.5" font-weight="600">-S0</text><text x="76" y="102" text-anchor="end" font-size="10.5">11</text><text x="76" y="136" text-anchor="end" font-size="10.5">12</text><text x="94" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S1</text><text x="76" y="170" text-anchor="end" font-size="10.5">13</text><text x="76" y="204" text-anchor="end" font-size="10.5">14</text><text x="164" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="146" y="170" text-anchor="end" font-size="10.5">13</text><text x="146" y="204" text-anchor="end" font-size="10.5">14</text><text x="94" y="256" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="76" y="238" text-anchor="end" font-size="10.5">21</text><text x="76" y="272" text-anchor="end" font-size="10.5">22</text><text x="100" y="316" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="76" y="298" text-anchor="end" font-size="10.5">A1</text><text x="76" y="332" text-anchor="end" font-size="10.5">A2</text><text x="244" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S2</text><text x="226" y="170" text-anchor="end" font-size="10.5">13</text><text x="226" y="204" text-anchor="end" font-size="10.5">14</text><text x="314" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="296" y="170" text-anchor="end" font-size="10.5">13</text><text x="296" y="204" text-anchor="end" font-size="10.5">14</text><text x="244" y="256" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="226" y="238" text-anchor="end" font-size="10.5">21</text><text x="226" y="272" text-anchor="end" font-size="10.5">22</text><text x="250" y="316" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="226" y="298" text-anchor="end" font-size="10.5">A1</text><text x="226" y="332" text-anchor="end" font-size="10.5">A2</text><text x="74" y="376" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="86" y="376" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="74" y="389" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">21 22</text><text x="86" y="389" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text><text x="224" y="376" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="236" y="376" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/4</text><text x="224" y="389" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">21 22</text><text x="236" y="389" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/1</text></g></svg><figcaption>Gegenseitige Verriegelung: In jedem Pfad liegt ein Öffner des anderen Schützes.</figcaption></figure>

**So funktioniert es:** Im Pfad von `-K1` liegt der Öffner `-K2` 21-22, im Pfad von `-K2` der Öffner `-K1` 21-22. Hat `-K1` angezogen, ist sein Öffner offen. `-K2` kann jetzt nicht anziehen, egal was mit `-S2` passiert. Erst nach Stopp ist der Weg wieder frei.

Die Kontaktspiegel zeigen die Überkreuzung: `-K1` 21-22 liegt in Spalte 3, also im Pfad von `-K2`.

Arten der Verriegelung:

| Art                    | Wie                                         | Schützt vor                             |
| ---------------------- | ------------------------------------------- | --------------------------------------- |
| **Schützverriegelung** | Öffner des anderen Schützes (Bild oben)     | Gleichzeitigem Ansteuern                |
| **Tasterverriegelung** | Öffner des anderen Tasters im Pfad          | Direktem Umschalten ohne Stopp          |
| **Mechanisch**         | Verriegelungsbaustein zwischen den Schützen | Verschweissten Kontakten, Fehlbedienung |

Bei Wendeschaltungen gehören elektrische und mechanische Verriegelung zusammen. Die elektrische allein hilft nicht, wenn ein Kontakt verschweisst ist.

**In der DDC zusätzlich verriegeln reicht nicht.** Eine Software-Verriegelung ersetzt die Verdrahtung nicht: Im Handbetrieb oder bei einem DDC-Fehler ist sie wirkungslos.

## Ansteuerung durch die DDC

Der DDC-Ausgang schaltet das Schütz nicht direkt. Dazwischen sitzt ein **Koppelrelais**. Es trennt die 24-V-Welt der DDC galvanisch vom 230-V-Steuerkreis und schützt den Ausgang vor Spulenstrom und Abschaltspitzen.

<figure class="schema"><svg viewBox="0 0 360 345" role="img" aria-label="Ansteuerung eines Schützes durch die DDC über ein Koppelrelais mit Rückmeldung" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M135 24L225 24"/><path d="M135 300L225 300"/><g transform="translate(36 50)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M60 98L60 120"/><g transform="translate(36 120)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M60 168L60 190"/><g transform="translate(36 190)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M30 268L90 268"/><path d="M60 271L60 285"/><circle cx="180" cy="24" r="2.5" fill="currentColor"/><path d="M180 24L180 36"/><g transform="translate(156 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M180 84L180 100"/><g transform="translate(156 100)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M180 148L180 180"/><g transform="translate(156 180)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M180 228L180 300"/><circle cx="180" cy="300" r="2.5" fill="currentColor"/><path d="M150 312L210 312"/><path d="M180 315L180 329"/><g transform="translate(276 50)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M300 98L300 120"/><g transform="translate(276 120)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M300 168L300 190"/><g transform="translate(276 190)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><g fill="currentColor" stroke="none"><text x="60" y="11" text-anchor="middle" font-size="10">1</text><text x="180" y="11" text-anchor="middle" font-size="10">2</text><text x="300" y="11" text-anchor="middle" font-size="10">3</text><text x="129" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="129" y="304" text-anchor="end" font-size="11" font-weight="600">N</text><text x="60" y="40" text-anchor="middle" font-size="10" font-weight="600">DDC DO3</text><text x="74" y="78" text-anchor="start" font-size="12.5" font-weight="600">X1:1</text><text x="80" y="148" text-anchor="start" font-size="12.5" font-weight="600">-K10</text><text x="56" y="130" text-anchor="end" font-size="10.5">A1</text><text x="56" y="164" text-anchor="end" font-size="10.5">A2</text><text x="74" y="218" text-anchor="start" font-size="12.5" font-weight="600">X1:2</text><text x="60" y="256" text-anchor="middle" font-size="10" font-weight="600">24 V (M)</text><text x="54" y="282" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="66" y="282" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="194" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="176" y="46" text-anchor="end" font-size="10.5">95</text><text x="176" y="80" text-anchor="end" font-size="10.5">96</text><text x="194" y="128" text-anchor="start" font-size="12.5" font-weight="600">-K10</text><text x="176" y="110" text-anchor="end" font-size="10.5">13</text><text x="176" y="144" text-anchor="end" font-size="10.5">14</text><text x="200" y="208" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="176" y="190" text-anchor="end" font-size="10.5">A1</text><text x="176" y="224" text-anchor="end" font-size="10.5">A2</text><text x="174" y="326" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="186" y="326" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text><text x="300" y="40" text-anchor="middle" font-size="10" font-weight="600">DDC DI3</text><text x="314" y="78" text-anchor="start" font-size="12.5" font-weight="600">X2:1</text><text x="314" y="148" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="296" y="130" text-anchor="end" font-size="10.5">13</text><text x="296" y="164" text-anchor="end" font-size="10.5">14</text><text x="314" y="218" text-anchor="start" font-size="12.5" font-weight="600">X2:2</text><text x="300" y="256" text-anchor="middle" font-size="10" font-weight="600">DDC COM</text></g></svg><figcaption>Drei getrennte Stromkreise: DDC-Ausgang (24 V), Steuerkreis (230 V), Rückmeldung (potentialfrei).</figcaption></figure>

1. **Spalte 1:** Der DDC-Ausgang DO3 schaltet über die Klemmen `X1` die Spule des Koppelrelais `-K10`.
2. **Spalte 2:** Der Kontakt `-K10` 13-14 schaltet im 230-V-Kreis das Schütz `-K1`. Davor liegt der Überlastkontakt `-F2`.
3. **Spalte 3:** Ein Hilfskontakt von `-K1` meldet über die Klemmen `X2` potentialfrei auf den Eingang DI3 zurück.

Viele Schränke haben zusätzlich einen [Hand-0-Auto-Schalter](/wissen/hand-0-auto) vor dem Koppelrelais oder dem Schütz. In «Hand» läuft die Anlage ohne DDC, in «0» ist sie gesperrt.

### Was die Rückmeldung bedeutet

| Signal                | Woher                                   | Sagt aus                            |
| --------------------- | --------------------------------------- | ----------------------------------- |
| **Schaltbefehl**      | DO der DDC                              | Die DDC will, dass es läuft         |
| **Schützrückmeldung** | Hilfskontakt des Schützes               | Das Schütz hat angezogen            |
| **Betriebsmeldung**   | Differenzdruck, Strömung, FU-Relais     | Der Ventilator fördert wirklich     |
| **Störmeldung**       | Überlast 97-98, Motorschutz, FU-Störung | Die Schutzeinrichtung hat ausgelöst |

Die Schützrückmeldung sagt nichts darüber, ob der Motor dreht. Bei gerissenem Keilriemen oder blockierter Pumpe zieht das Schütz trotzdem an. Deshalb gehört an wichtige Antriebe eine echte Betriebsmeldung. Stimmen Befehl und Rückmeldung nach einer Wartezeit nicht überein, meldet die DDC eine **Befehlsabweichung**.

## Zeitrelais

| Funktion            | Verhalten                                        | Beispiel in der GA                                        |
| ------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| **Anzugverzögert**  | Kontakt schaltet erst nach Ablauf der Zeit       | Klappe öffnet, erst dann startet der Ventilator           |
| **Abfallverzögert** | Kontakt bleibt nach dem Abschalten noch die Zeit | **Nachlauf** des Ventilators nach dem Elektroheizregister |

Der Nachlauf nach einem Elektroheizregister ist kein Komfort: Ohne ihn staut sich die Wärme im Register, und der Sicherheitstemperaturbegrenzer löst aus oder das Gerät nimmt Schaden. Diese Funktion gehört verdrahtet, nicht nur programmiert.

Zeitkontakte haben eigene Anschlussziffern: **x5-x6** für den verzögerten Öffner, **x7-x8** für den verzögerten Schliesser.

## Stern-Dreieck

Grosse Drehstrommotoren laufen in Sternschaltung an und schalten nach einigen Sekunden auf Dreieck. Das senkt den Anlaufstrom auf rund ein Drittel. Dafür braucht es drei Schütze (Netz, Stern, Dreieck), ein Zeitrelais und eine Verriegelung zwischen Stern und Dreieck.

In der GA ersetzen heute meist [Frequenzumrichter](/wissen/frequenzumrichter) oder [EC-Motoren](/wissen/ec-motoren) die Stern-Dreieck-Schaltung. In Bestandsanlagen begegnet sie einem aber noch oft.

## Schutzbeschaltung von Spulen

Beim Abschalten erzeugt eine Spule eine Spannungsspitze. Die zerstört auf Dauer Relaiskontakte und Transistorausgänge der DDC.

- **DC-Spulen:** Freilaufdiode parallel zur Spule, Sperrrichtung gegen die Betriebsspannung. Verlängert die Abfallzeit etwas.
- **AC-Spulen:** RC-Glied oder Varistor parallel zur Spule.

Viele Schütze und Koppelrelais haben die Beschaltung eingebaut oder als Aufsteckmodul. Im Datenblatt nachsehen, bevor man sie doppelt verbaut.

## Fehlerbilder

| Symptom                                  | Häufige Ursache                                                              |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| Schütz zieht nicht an                    | Keine Spannung an A1-A2: Kontakt im Pfad offen, Sicherung, Hand-0-Auto auf 0 |
| Schütz zieht an, fällt beim Loslassen ab | Selbsthaltekontakt defekt oder nicht verdrahtet                              |
| Schütz brummt laut                       | Spulenspannung zu tief, verschmutzte Polflächen (AC-Schütz)                  |
| Schütz fällt nicht ab                    | Kontakt verschweisst, Fremdspannung auf der Spule                            |
| Rückmeldung fehlt, Anlage läuft          | Falscher Hilfskontakt verdrahtet, Klemme lose, DI-Spannung fehlt             |
| DDC-Ausgang defekt                       | Spule ohne Schutzbeschaltung direkt am Ausgang                               |

Vorgehen: Spannung an A1-A2 messen. Ist sie da und das Schütz zieht nicht an, ist das Schütz defekt. Fehlt sie, den Pfad nach oben verfolgen, wie in [Schemalesen](/wissen/schemalesen) beschrieben.

## Normen

- **EN 60947-4-1** — Schütze und Motorstarter, Gebrauchskategorien
- **EN 60947-5-1** — Steuergeräte und Schaltelemente
- **EN 50005** — Anschlussbezeichnungen von Schützen und Hilfsschützen
- **EN 60204-1** — Elektrische Ausrüstung von Maschinen, Stopp und Verriegelung

<!-- EN -->

Behind almost every DDC digital output there is a relay or a contactor. The circuits behind them follow the same few patterns. Know them and you read an air handling panel in minutes.

The basics of reading diagrams are in [Reading Circuit Diagrams](/wissen/schemalesen), the symbols in the [Circuit Symbols table](/referenz/schaltzeichen).

## Relay, Interface Relay, Contactor

| Device                  | Switches                        | Typical use in BA                            |
| ----------------------- | ------------------------------- | -------------------------------------------- |
| **Interface relay**     | Small currents, control signals | Between DDC output and 230 V control circuit |
| **Auxiliary contactor** | Control circuits                | Logic, enables, interlocks                   |
| **Power contactor**     | Motors, heater batteries        | Fan, pump, electric heater                   |

A contactor has **main contacts** (1-2, 3-4, 5-6) for the load current and **auxiliary contacts** (13-14, 21-22 …) for control. It is sized by **utilisation category**: AC-3 for squirrel-cage motors, AC-1 for resistive loads such as heaters. A contactor rated 9 A in AC-3 switches considerably more in AC-1.

The **coil voltage** is printed on the contactor and in the diagram: 24 VAC, 24 VDC or 230 VAC. A 24 V contactor on 230 V burns out instantly; a 230 V contactor on 24 V simply does not pull in.

## Latching (Self-Holding)

One push is enough; the contactor's own auxiliary contact holds it afterwards. The circuit is explained step by step in [Reading Circuit Diagrams](/wissen/schemalesen).

Two variants:

- **Stop dominant:** The stop NC sits ahead of the whole path. Pressing start and stop together keeps the plant off. This is the normal case.
- **Start dominant:** The stop NC sits only in the holding branch. Pressing both switches on. Rare, and only where switching on matters more than switching off.

## Interlocking

Two contactors that must never pull in together: forward and reverse, stage 1 and stage 2 of a fan, pump 1 and pump 2 on the same supply. If both pulled in, the result would be a short circuit or a destroyed motor.

<figure class="schema"><svg viewBox="0 0 350 396" role="img" aria-label="Circuit diagram with mutual interlock of two contactors K1 and K2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M30 24L340 24"/><path d="M30 352L340 352"/><circle cx="80" cy="24" r="2.5" fill="currentColor"/><path d="M80 24L80 36"/><g transform="translate(56 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M80 84L80 92"/><g transform="translate(56 92)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/><path d="M29 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><path d="M80 140L80 160"/><path d="M80 152L300 152"/><circle cx="80" cy="152" r="2.5" fill="currentColor"/><circle cx="150" cy="152" r="2.5" fill="currentColor"/><circle cx="230" cy="152" r="2.5" fill="currentColor"/><path d="M150 152L150 160"/><g transform="translate(56 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(126 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M80 208L80 228"/><path d="M150 208L150 220"/><path d="M150 220L80 220"/><circle cx="80" cy="220" r="2.5" fill="currentColor"/><g transform="translate(56 228)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M80 276L80 288"/><g transform="translate(56 288)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M80 336L80 352"/><circle cx="80" cy="352" r="2.5" fill="currentColor"/><path d="M300 152L300 160"/><path d="M230 152L230 160"/><g transform="translate(206 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/><path d="M18 23H6" stroke-dasharray="3 2"/><path d="M9 18H6V28H9"/></g><g transform="translate(276 160)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M230 208L230 228"/><path d="M300 208L300 220"/><path d="M300 220L230 220"/><circle cx="230" cy="220" r="2.5" fill="currentColor"/><g transform="translate(206 228)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M230 276L230 288"/><g transform="translate(206 288)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M230 336L230 352"/><circle cx="230" cy="352" r="2.5" fill="currentColor"/><path d="M50 362L110 362"/><path d="M80 365L80 392"/><path d="M200 362L260 362"/><path d="M230 365L230 392"/><g fill="currentColor" stroke="none"><text x="80" y="11" text-anchor="middle" font-size="10">1</text><text x="150" y="11" text-anchor="middle" font-size="10">2</text><text x="230" y="11" text-anchor="middle" font-size="10">3</text><text x="300" y="11" text-anchor="middle" font-size="10">4</text><text x="24" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="24" y="356" text-anchor="end" font-size="11" font-weight="600">N</text><text x="94" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="76" y="46" text-anchor="end" font-size="10.5">95</text><text x="76" y="80" text-anchor="end" font-size="10.5">96</text><text x="94" y="120" text-anchor="start" font-size="12.5" font-weight="600">-S0</text><text x="76" y="102" text-anchor="end" font-size="10.5">11</text><text x="76" y="136" text-anchor="end" font-size="10.5">12</text><text x="94" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S1</text><text x="76" y="170" text-anchor="end" font-size="10.5">13</text><text x="76" y="204" text-anchor="end" font-size="10.5">14</text><text x="164" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="146" y="170" text-anchor="end" font-size="10.5">13</text><text x="146" y="204" text-anchor="end" font-size="10.5">14</text><text x="94" y="256" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="76" y="238" text-anchor="end" font-size="10.5">21</text><text x="76" y="272" text-anchor="end" font-size="10.5">22</text><text x="100" y="316" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="76" y="298" text-anchor="end" font-size="10.5">A1</text><text x="76" y="332" text-anchor="end" font-size="10.5">A2</text><text x="244" y="188" text-anchor="start" font-size="12.5" font-weight="600">-S2</text><text x="226" y="170" text-anchor="end" font-size="10.5">13</text><text x="226" y="204" text-anchor="end" font-size="10.5">14</text><text x="314" y="188" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="296" y="170" text-anchor="end" font-size="10.5">13</text><text x="296" y="204" text-anchor="end" font-size="10.5">14</text><text x="244" y="256" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="226" y="238" text-anchor="end" font-size="10.5">21</text><text x="226" y="272" text-anchor="end" font-size="10.5">22</text><text x="250" y="316" text-anchor="start" font-size="12.5" font-weight="600">-K2</text><text x="226" y="298" text-anchor="end" font-size="10.5">A1</text><text x="226" y="332" text-anchor="end" font-size="10.5">A2</text><text x="74" y="376" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="86" y="376" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="74" y="389" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">21 22</text><text x="86" y="389" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text><text x="224" y="376" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="236" y="376" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/4</text><text x="224" y="389" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">21 22</text><text x="236" y="389" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/1</text></g></svg><figcaption>Mutual interlock: each path contains an NC contact of the other contactor.</figcaption></figure>

**How it works:** The path of `-K1` contains the NC `-K2` 21-22, the path of `-K2` the NC `-K1` 21-22. Once `-K1` has pulled in, its NC is open. `-K2` cannot pull in now, whatever happens with `-S2`. Only after stop is the way clear again.

The contact tables show the crossover: `-K1` 21-22 is in column 3, i.e. in the path of `-K2`.

Types of interlock:

| Type                      | How                                      | Protects against              |
| ------------------------- | ---------------------------------------- | ----------------------------- |
| **Contactor interlock**   | NC of the other contactor (figure above) | Simultaneous control          |
| **Push-button interlock** | NC of the other button in the path       | Direct reversal without stop  |
| **Mechanical**            | Interlock unit between the contactors    | Welded contacts, misoperation |

For reversing circuits, electrical and mechanical interlocks belong together. The electrical one alone does not help if a contact is welded.

**An additional interlock in the DDC is not enough.** A software interlock does not replace wiring: in manual mode or on a DDC fault it has no effect.

## Control by the DDC

The DDC output does not switch the contactor directly. An **interface relay** sits in between. It galvanically separates the 24 V world of the DDC from the 230 V control circuit and protects the output from coil current and switch-off spikes.

<figure class="schema"><svg viewBox="0 0 360 345" role="img" aria-label="Control of a contactor by the DDC via an interface relay with feedback" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M135 24L225 24"/><path d="M135 300L225 300"/><g transform="translate(36 50)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M60 98L60 120"/><g transform="translate(36 120)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M60 168L60 190"/><g transform="translate(36 190)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M30 268L90 268"/><path d="M60 271L60 285"/><circle cx="180" cy="24" r="2.5" fill="currentColor"/><path d="M180 24L180 36"/><g transform="translate(156 36)"><path d="M24 0V16"/><path d="M24 32L35 12M24 16H32"/><path d="M24 32V48"/></g><path d="M180 84L180 100"/><g transform="translate(156 100)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M180 148L180 180"/><g transform="translate(156 180)"><path d="M24 0V14M24 34V48"/><rect x="10" y="14" width="28" height="20"/></g><path d="M180 228L180 300"/><circle cx="180" cy="300" r="2.5" fill="currentColor"/><path d="M150 312L210 312"/><path d="M180 315L180 329"/><g transform="translate(276 50)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><path d="M300 98L300 120"/><g transform="translate(276 120)"><path d="M24 0V16"/><path d="M24 32L13 14"/><path d="M24 32V48"/></g><path d="M300 168L300 190"/><g transform="translate(276 190)"><path d="M24 0V19M24 29V48"/><circle cx="24" cy="24" r="5"/></g><g fill="currentColor" stroke="none"><text x="60" y="11" text-anchor="middle" font-size="10">1</text><text x="180" y="11" text-anchor="middle" font-size="10">2</text><text x="300" y="11" text-anchor="middle" font-size="10">3</text><text x="129" y="28" text-anchor="end" font-size="11" font-weight="600">L</text><text x="129" y="304" text-anchor="end" font-size="11" font-weight="600">N</text><text x="60" y="40" text-anchor="middle" font-size="10" font-weight="600">DDC DO3</text><text x="74" y="78" text-anchor="start" font-size="12.5" font-weight="600">X1:1</text><text x="80" y="148" text-anchor="start" font-size="12.5" font-weight="600">-K10</text><text x="56" y="130" text-anchor="end" font-size="10.5">A1</text><text x="56" y="164" text-anchor="end" font-size="10.5">A2</text><text x="74" y="218" text-anchor="start" font-size="12.5" font-weight="600">X1:2</text><text x="60" y="256" text-anchor="middle" font-size="10" font-weight="600">24 V (M)</text><text x="54" y="282" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="66" y="282" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/2</text><text x="194" y="64" text-anchor="start" font-size="12.5" font-weight="600">-F2</text><text x="176" y="46" text-anchor="end" font-size="10.5">95</text><text x="176" y="80" text-anchor="end" font-size="10.5">96</text><text x="194" y="128" text-anchor="start" font-size="12.5" font-weight="600">-K10</text><text x="176" y="110" text-anchor="end" font-size="10.5">13</text><text x="176" y="144" text-anchor="end" font-size="10.5">14</text><text x="200" y="208" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="176" y="190" text-anchor="end" font-size="10.5">A1</text><text x="176" y="224" text-anchor="end" font-size="10.5">A2</text><text x="174" y="326" text-anchor="end" font-size="10" font-family="ui-monospace,monospace">13 14</text><text x="186" y="326" text-anchor="start" font-size="10" font-family="ui-monospace,monospace">/3</text><text x="300" y="40" text-anchor="middle" font-size="10" font-weight="600">DDC DI3</text><text x="314" y="78" text-anchor="start" font-size="12.5" font-weight="600">X2:1</text><text x="314" y="148" text-anchor="start" font-size="12.5" font-weight="600">-K1</text><text x="296" y="130" text-anchor="end" font-size="10.5">13</text><text x="296" y="164" text-anchor="end" font-size="10.5">14</text><text x="314" y="218" text-anchor="start" font-size="12.5" font-weight="600">X2:2</text><text x="300" y="256" text-anchor="middle" font-size="10" font-weight="600">DDC COM</text></g></svg><figcaption>Three separate circuits: DDC output (24 V), control circuit (230 V), feedback (potential-free).</figcaption></figure>

1. **Column 1:** DDC output DO3 switches the coil of interface relay `-K10` via terminals `X1`.
2. **Column 2:** Contact `-K10` 13-14 switches contactor `-K1` in the 230 V circuit, with the overload contact `-F2` ahead of it.
3. **Column 3:** An auxiliary contact of `-K1` reports back potential-free to input DI3 via terminals `X2`.

Many panels additionally have a [Hand-Off-Auto switch](/wissen/hand-0-auto) ahead of the interface relay or contactor. In "Hand" the plant runs without the DDC; in "Off" it is blocked.

### What the Feedback Means

| Signal                 | From                                        | Tells you                         |
| ---------------------- | ------------------------------------------- | --------------------------------- |
| **Command**            | DDC digital output                          | The DDC wants it to run           |
| **Contactor feedback** | Auxiliary contact of the contactor          | The contactor has pulled in       |
| **Running signal**     | Differential pressure, flow, VFD relay      | The fan is actually moving air    |
| **Fault signal**       | Overload 97-98, motor protection, VFD fault | The protective device has tripped |

Contactor feedback says nothing about whether the motor turns. With a broken V-belt or a seized pump the contactor still pulls in. Important drives therefore need a real running signal. If command and feedback disagree after a delay, the DDC raises a **command discrepancy** alarm.

## Timer Relays

| Function      | Behaviour                                    | Example in BA                                   |
| ------------- | -------------------------------------------- | ----------------------------------------------- |
| **On-delay**  | Contact switches only after the delay        | Damper opens, then the fan starts               |
| **Off-delay** | Contact stays for the delay after switch-off | **Run-on** of the fan after the electric heater |

Fan run-on after an electric heater is not a convenience: without it, heat builds up in the heater and the safety temperature limiter trips or the unit is damaged. This function belongs in the wiring, not only in the program.

Timed contacts have their own terminal numbers: **x5-x6** for the delayed NC, **x7-x8** for the delayed NO.

## Star-Delta

Large three-phase motors start in star and switch to delta after a few seconds. This reduces the starting current to about one third. It needs three contactors (mains, star, delta), a timer relay and an interlock between star and delta.

In BA, [variable frequency drives](/wissen/frequenzumrichter) or [EC motors](/wissen/ec-motoren) usually replace star-delta starting today. You still meet it often in existing plants.

## Coil Suppression

When switched off, a coil produces a voltage spike. Over time it destroys relay contacts and DDC transistor outputs.

- **DC coils:** Flyback diode across the coil, reverse-biased against the supply. Lengthens the drop-out time somewhat.
- **AC coils:** RC snubber or varistor across the coil.

Many contactors and interface relays have suppression built in or as a plug-in module. Check the datasheet before fitting it twice.

## Fault Patterns

| Symptom                                  | Common cause                                                     |
| ---------------------------------------- | ---------------------------------------------------------------- |
| Contactor does not pull in               | No voltage at A1-A2: contact in path open, fuse, HOA on Off      |
| Pulls in, drops out when button released | Holding contact defective or not wired                           |
| Contactor hums loudly                    | Coil voltage too low, dirty pole faces (AC contactor)            |
| Contactor does not drop out              | Welded contact, stray voltage on the coil                        |
| Feedback missing, plant running          | Wrong auxiliary contact wired, loose terminal, DI supply missing |
| DDC output defective                     | Coil without suppression directly on the output                  |

Procedure: measure the voltage at A1-A2. If it is present and the contactor does not pull in, the contactor is defective. If it is missing, trace the path upwards as described in [Reading Circuit Diagrams](/wissen/schemalesen).

## Standards

- **EN 60947-4-1** — Contactors and motor starters, utilisation categories
- **EN 60947-5-1** — Control circuit devices and switching elements
- **EN 50005** — Terminal markings of contactors and auxiliary contactors
- **EN 60204-1** — Electrical equipment of machines, stop and interlocking
