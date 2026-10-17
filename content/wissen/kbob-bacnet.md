---
title: KBOB BACnet-Vorgaben — BACnet nach Schweizer Empfehlung
title_en: KBOB BACnet Requirements — BACnet per the Swiss Recommendation
slug: kbob-bacnet
category: protokolle
subcategory: gebäudeautomation
tags:
  [
    kbob,
    bacnet,
    mbe-ch,
    as-ch,
    notification-class,
    meldeklassen,
    priority-array,
    trend-log,
    cov,
    object-name,
    device-id,
    ede,
    b-pat,
    ga-funktionen,
    watchdog
  ]
difficulty: fortgeschritten
area: [ga, it]
related:
  [
    bacnet,
    kbob,
    alarmmanagement,
    trending-historisierung,
    datenpunktliste,
    netzwerk-ga,
    anlagenkennzeichnung
  ]
norm: [KBOB-Empfehlung BACnet 2021, ISO 16484-5, ASHRAE 135]
rechner: [aks, bacnet-dpl]
updated: 2026-10-17
lang: de
---

# KBOB BACnet-Vorgaben — BACnet nach Schweizer Empfehlung

BACnet ist offen, lässt aber vieles frei: welche Objekte ein Gerät kann, wie Meldungen klassiert werden, wer auf welche Priorität schreibt. Zwei Hersteller können beide «BACnet» liefern und trotzdem schlecht zusammenarbeiten. Die **KBOB-Empfehlung BACnet Anwendung** (V2.0, Juli 2021) schliesst diese Lücken für Schweizer Projekte. Sie gilt für Bauten der öffentlichen Hand und wird über die Ausschreibung verbindlich, siehe [KBOB-Empfehlungen](/wissen/kbob). Grundlagen zu BACnet selbst stehen im Artikel [BACnet](/wissen/bacnet).

Die Empfehlung besteht aus drei Ebenen:

1. **KBOB-Empfehlung:** Mindestvorgaben, für alle Projekte gleich.
2. **Bauherrenspezifische Vorgaben:** Was der Bauherr ergänzt oder festlegt, etwa Objektnamen, Device-ID-Struktur und Alarmkonzept. Dafür gibt es den Leitfaden, die Entscheidungsmatrix E1 und die Vorlage V1.
3. **Projektspezifische Vorgaben:** Datenpunktliste, Steuer- und Regelbeschrieb, Netzwerk.

## Grundsätze

- **BACnet Version 1, Revision 14** oder höher. Die KBOB fordert bewusst nicht die neueste Revision, weil Geräte am Markt hinterherhinken.
- **UTF-8.** Umlaute sind erlaubt und müssen als ein Zeichen darstellbar sein.
- **Nur zertifizierte Geräte** (BTL, WSPCert), **PICS** wird mitgeliefert.
- **BACnet-Mechanismen nutzen:** COV, Intrinsic und Algorithmic Reporting, Priority Array. Meldungen laufen immer über BACnet-Alarme und -Events.
- **Keine proprietären Objekte** für die vorgegebenen GA-Funktionen und kein Ersatz genormter Objekte oder Dienste durch proprietäre.
- **Unbenutzte Objekte** wie Reserve-Ein- und -Ausgänge sind nach Möglichkeit unsichtbar. Bewusst angelegte Reserveobjekte werden im Namen als solche gekennzeichnet.

## Zwei Profile: MBE-CH und AS-CH

Jedes Gerät wird einem Profil zugeordnet, der Bauherr bestätigt die Zuordnung:

| Profil     | Gerät                                       | Rolle                                       |
| ---------- | ------------------------------------------- | ------------------------------------------- |
| **MBE-CH** | Management- und Bedieneinrichtung, also GLT | Client: liest, schreibt, quittiert          |
| **AS-CH**  | Automationsstation                          | Server: stellt Objekte und Meldungen bereit |

**Pflicht für beide:** AI, AO, AV, BI, BO, BV, MV, Device, Loop, Notification Class. **Calendar, Event Enrollment, Schedule und Trend Log** müssen zusätzlich zur Laufzeit erstellt und gelöscht werden können (DC/DD), damit der Betreiber ohne Engineering-Werkzeug des Herstellers Zeitprogramme und Trends anlegen kann. MI, MO und Event Log braucht die MBE immer, die AS dann, wenn eine GA-Funktion sie verlangt. File, Program und Positive Integer Value sind bei beiden bedingt.

Die vollständige Liste mit allen BIBBs steht in der Tabelle [BACnet-Profile MBE-CH und AS-CH](/referenz/kbob-profile).

## Properties und Texte

**Mindestlängen** der Zeichenketten:

| Property                               | MBE-CH | AS-CH |
| -------------------------------------- | ------ | ----- |
| Object_Name                            | 64     | 64    |
| Description                            | 128    | 64    |
| Location                               | 64     | 64    |
| Event_Message_Texts                    | 128    | 64    |
| Active_Text, Inactive_Text, State_Text | 32     | 32    |
| alle übrigen                           | 32     | 32    |

- **Object_Name** ist im ganzen BACnet-Netz eindeutig, über alle Objekttypen. Die KBOB schreibt keinen Aufbau vor, das Gerät muss aber das Bezeichnungskonzept des Bauherrn aufnehmen können.
- **Units** nach dem Datentyp BACnetEngineeringUnits der Norm.
- **Zustandstexte** für jeden Present_Value von BI, BV, MI und MV. Die Beilage T1 gibt einheitliche Texte vor, siehe [Zustandstexte](/referenz/kbob-zustandstexte).
- **Eventmeldetexte** für TO-NORMAL, TO-OFFNORMAL und TO-FAULT, wenn der Bauherr sie wünscht. Beilage T2: [Eventmeldetexte](/referenz/kbob-eventtexte).

### Objektname nach Kennzeichnungssystem

Der Leitfaden schlägt vor, den Objektnamen aus der Anlagenkennzeichnung des BBL zu bilden, wenn der Bauherr kein eigenes Konzept hat:

<p class="formel">NNNN_AAX_ANN_ANNN_AN</p>

| Block    | Stellen | Bedeutung                                                | Beispiel |
| -------- | ------- | -------------------------------------------------------- | -------- |
| ORT      | NNNN    | Wirtschaftseinheit (Liegenschaft)                        | 2104     |
|          | AA      | Objekt (Gebäude)                                         | HG       |
|          | X       | Ebene: 0 = EG, 1–3 = UG, A/B/C = 1./2./3. OG             | 2        |
| BTA      | A       | Art der Anlage, z.B. H Heizung, L Lüftung/Klima, K Kälte | L        |
|          | NN      | Anlagennummer                                            | 13       |
| APPARAT  | A       | Apparateart, z.B. B Messumformer, M Motor, Y Stellgerät  | M        |
|          | NNN     | Apparatenummer                                           | 100      |
| FUNKTION | A       | Funktionsart, z.B. M Messwert, D Meldung, S Schaltbefehl | S        |
|          | N       | Funktionsnummer 0–9                                      | 1        |

Ergibt `2104_HG2_L13_M100_S1`: Schaltbefehl 1 des Motors M100 in Lüftungsanlage 13, Gebäude HG, 2. Untergeschoss. Für die BACnet-eigenen Objekte erweitert der Leitfaden die Funktionsarten um **T** Trend Log, **U** Schedule, **K** Calendar, **R** Loop und **N** Notification Class. Die übrigen Arten: Z Zählwert, Y Stellbefehl, H virtuell digital, W virtuell analog.

Das gilt auch für den Object_Name des Device-Objekts. Die Weisung des BBL ist nur eine Empfehlung, der Bauherr bestimmt die definitive Vorgabe. Alle Kennbuchstaben und Nummernbereiche: [Anlagenkennzeichnung (AKS)](/wissen/anlagenkennzeichnung).

### Device-ID

Die Device-Instanz muss im ganzen Netz eindeutig sein. Damit sich zwei Unternehmer nicht in die Quere kommen, legt der Bauherr einmal eine Struktur fest. Zwei Beispiele aus dem Leitfaden:

| Struktur    | Aufbau                                                                                           | Beispiel                                  |
| ----------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| `NN NN NNN` | Gebäude 00–40, Stockwerk (00 Backbone, 01–35 Etage, ab 35 separates Projekt), Laufnummer 000–999 | 3017021: Gebäude 30, 17. Stock, Anlage 21 |
| `NNNN NNN`  | Laufnummer 0000–4194, Gebäudegruppe 000–999                                                      | 0346824: Anlage 346 der Gruppe 824        |

Die grösste Instanz in BACnet ist 4 194 303, sie ist aber als Platzhalter reserviert; nutzbar sind 0 bis 4 194 302. Reicht der Bereich nicht, lassen sich über verschiedene UDP-Ports getrennte Segmente bilden. Die Leitebene behält ihre Device-ID auch bei einer Servermigration.

## Meldeklassen

Die KBOB teilt Meldungen in acht Ereigniskategorien mit festen Nummernbereichen:

| Kategorie                      | NC          | Priorität |
| ------------------------------ | ----------- | --------- |
| Personenalarm (Life Safety)    | NC1–NC4     | 1–7       |
| Objektschutz (Property Safety) | NC32–NC35   | 32–39     |
| Technischer Alarm              | NC64–NC67   | 64–71     |
| Technische Störung             | NC96–NC99   | 96–103    |
| Wartungsmeldung                | NC128–NC131 | 128–135   |
| Revisionsmeldung               | NC160–NC163 | 160–167   |
| Trenddaten                     | NC192–NC193 | 192–199   |
| Betriebs- und Statusmeldung    | NC224–NC225 | 224–231   |

Innerhalb einer Kategorie unterscheiden sich die Klassen nur in der **Quittierpflicht** (Ack_Required). Die Endziffer sagt, was quittiert werden muss:

| Klasse    | TO-OFFNORMAL | TO-FAULT | TO-NORMAL |
| --------- | ------------ | -------- | --------- |
| Basis + 0 | nein         | nein     | nein      |
| Basis + 1 | nein         | ja       | nein      |
| Basis + 2 | ja           | ja       | nein      |
| Basis + 3 | ja           | ja       | ja        |

Beispiel aus dem Leitfaden: Eine technische Störung, bei der sowohl die Störung als auch ein Hardwarefehler quittiert werden müssen, bekommt **NC98**. Soll auch die Rückkehr in den Normalzustand quittiert werden, **NC99**.

Weitere Vorgaben:

- **Recipient_List:** alle Wochentage, 00:00 bis 23:59:59.99, Confirmed Notifications, alle drei Transitions. Als Empfänger die **Device-ID** des Leitsystems, nicht seine Adresse. Das übersteht einen Serverwechsel, hängt aber vom BBMD ab.
- **Notify_Type:** Der Leitfaden empfiehlt Event ab der Kategorie Trenddaten, darunter Alarm.
- **Meldung abschalten:** über Event_Detection_Enable, und zwar im Engineering, nicht im Betrieb.
- **Alarmunterdrückung** zur Laufzeit über Event_Algorithm_Inhibit und Reliability_Evaluation_Inhibit.
- Feinere eigene Klassen darf der Bauherr ergänzen.

Alle 28 Klassen mit Beispielen: [BACnet-Meldeklassen nach KBOB](/referenz/kbob-meldeklassen). Mehr zum Aufbau eines Alarmkonzepts in [Alarmmanagement](/wissen/alarmmanagement).

## Prioritäten

| Stufe | Belegung                                       |
| ----- | ---------------------------------------------- |
| 1     | Manual Life Safety, z.B. Feuerwehrschalter     |
| 2     | Automatic Life Safety, z.B. Brandfallsteuerung |
| 5     | Critical Equipment Control, z.B. Lastabwurf    |
| 6     | Minimum On/Off, extern nicht beschreibbar      |
| 7     | Manuell ab Anlage                              |
| 8     | Manuell ab MBE                                 |
| 12    | Zentrale Funktionen, z.B. Putzbeleuchtung      |
| 14    | Zeitschaltungen, zentrale Ansteuerungen        |
| 16    | Automatikbetrieb                               |

Die übrigen Stufen sind nur nach Absprache frei. **Physische Ausgänge mit Sicherheitsfunktion** (BO, MO, AO, z.B. Frostschutz) müssen über das Priority Array schalten, und die Priorität der Sicherheitsfunktion wird an alle Aggregate vererbt: Ventilator, Ventil, Pumpe. Bei BV, MV und AV nur in ausgewählten Fällen. **Sollwerte ohne Priority Array**, so die Empfehlung. Details: [Prioritätsliste](/referenz/kbob-prioritaeten).

## Dienste

- **Confirmed:** AcknowledgeAlarm, ConfirmedCOVNotification, ConfirmedEventNotification, GetAlarmSummary.
- **Unconfirmed:** TimeSynchronization, UTCTimeSynchronization, Who-Has/I-Have, Who-Is/I-Am.
- **Nur von der MBE:** DeviceCommunicationControl, ReinitializeDevice und UTCTimeSynchronization. Eine AS darf keine Zeitsynchronisation als Broadcast auslösen. Ohne Leitebene wird ein Zeitmaster bestimmt. Wie mit den Passwörtern für DCC und Reinitialize umgegangen wird, legt der Bauherr fest.

## Trends und Ereignisse

- Aufgezeichnet werden Mess- und Stellwerte, binäre Eingänge, berechnete Sollwerte und Betriebszustände, nicht aber Alarm- und Störwerte.
- **Standard ist zeitgetriggert** (Logging_Type POLLED) mit **15 Minuten**. Für binäre Schaltzustände und Zähler empfiehlt die KBOB COV.
- Log_Interval wird in Hundertstelsekunden angegeben: 15 min = 90 000.
- **Stop_When_Full FALSE**, Notification_Threshold so, dass **Buffer Ready zweimal pro Tag** kommt, lokal mindestens **10 Tage** Vorhaltezeit. So lässt sich eine ganze Woche samt drei Tagen der Vorwoche vergleichen.
- **Energiezähler** auf allen AS zeitsynchron aufzeichnen, mit Align_Intervals und Interval_Offset.
- **COV-Schwellen** legt der Unternehmer mit dem Planer fest, als Richtwert 1–5 % der maximalen Änderung. Tabelle: [COV-Schwellen](/referenz/kbob-trends).
- Lokale Ereignisaufzeichnung nur über **Event Log**-Objekte.

Mehr zur Trendauswertung in [Trending und Historisierung](/wissen/trending-historisierung).

## Kalender und Zeitprogramme

- Drei getrennte Kalender: **CAL 1 Feiertage**, **CAL 2 Ferien**, **CAL 3 halbe Tage** wie der Vortag von Karfreitag oder Auffahrt.
- Die drei Kalender liegen zentral als **Master** und auf jeder AS als **Slave**. Synchronisiert wird nur in eine Richtung. So schaltet jede AS auch bei Netzausfall richtig.
- **Schedules** schreiben auf die Zeitprogramm-Priorität des Zielobjekts. Der Default-Wert ist **NULL**, eingeschaltete Anlagen werden über NULL zurückgesetzt.
- Im Sonderzeitplan verweisen die Einträge auf die Kalender, mit den Ereignisprioritäten **10 (CAL 1), 11 (CAL 2) und 12 (CAL 3)**. Diese Event_Priority hat nichts mit der Schreibpriorität im Priority Array zu tun.
- Schaltzeiten kompakt halten, mit möglichst wenigen Einträgen.

## GA-Funktionen

Kapitel 7 der Empfehlung legt für jede typische Anlagenfunktion fest, aus welchen BACnet-Objekten sie besteht. Das macht Datenpunktlisten verschiedener Unternehmer vergleichbar. **Pflicht** ist jeweils nur das Kernobjekt, alles andere kann der Bauherr fordern:

| GA-Funktion                       | Pflicht                                    | Bauherrenspezifisch                                                                                                                                |
| --------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Übergreifend / Automationsstation | 3 × CAL, DEV                               | ELOG, NC-Objekte, BV für CPU, Batterie, E/A-Modul, Handeingriff, BACnet-Stack und Watchdog, PROG                                                   |
| Schaltgerätekombination           | —                                          | BI für Lasttrennschalter, FI, LS, Spannungsüberwachung, Überspannungsschutz, 24 V DC, Brandmeldung, Bedienung lokal; Quittierung und Signalisation |
| Übergeordnete Anlagefunktionen    | —                                          | Sammelmeldungen (BV), Bedienung lokal (BI), Alarmunterdrückung (BV), Signalisation (BO), Zeitschaltuhr (SC)                                        |
| Anlageschalter 1-, 2-, N-stufig   | MV Betriebswahl, MI Betriebswahl lokal, SC | BV Handbetrieb                                                                                                                                     |
| Antrieb 1-, 2-stufig              | BO Schaltbefehl je Stufe                   | TL, EE Instandhaltungsmeldung, PIV Betriebsdauer, BV Handbetrieb, BI Revisionsschalter, BV Störung                                                 |
| Antrieb stetig                    | BO Schaltbefehl, AO Sollwertvorgabe        | wie oben, dazu AI Istwert, BI Laufüberwachung, TL                                                                                                  |
| Absperr-/Stellorgan 2-Punkt       | BO Stellwert                               | TL, BI Stellungsrückmeldung ZU und AUF, BV Störung                                                                                                 |
| Absperr-/Stellorgan stetig        | AO Stellwert                               | AI Stellwertrückmeldung, TL, BI ZU/AUF, BV Störung                                                                                                 |
| Absperr-/Stellorgan 3-Punkt       | BO Stellwert ZU, BO Stellwert AUF          | AI Stellwertrückmeldung, TL, BI ZU/AUF, BV Störung                                                                                                 |
| Messwertgeber stetig              | AI Istwert                                 | EE Voralarm, TL                                                                                                                                    |
| Messwertgeber binär, Wächter      | BI Istwert                                 | TL, BV Störung                                                                                                                                     |
| Regler                            | LP                                         | TL Sollwert                                                                                                                                        |
| Zähler / Messung                  | AV Zähl- oder Messwert                     | BV Störung, TL                                                                                                                                     |
| Parameter                         | —                                          | AV, BV, MV                                                                                                                                         |

Einige Festlegungen daraus, die in der Praxis oft anders gemacht werden:

- **Betriebsrückmeldung im selben Objekt:** Der Schaltbefehl ist ein BO. Die Rückmeldung steht in dessen **Feedback_Value**, die Betriebsstunden in **Elapsed_Active_Time**. Kein separater BI für die Rückmeldung.
- **Betriebsstunden:** Elapsed_Active_Time wird nach dem Ersatz des Antriebs zurückgesetzt, ein PIV summiert die Gesamtstunden des Aggregats und wird nie zurückgesetzt. Ein EE vom Typ UNSIGNED_OUT_OF_RANGE meldet die fällige Wartung. pHighLimit ist das Wartungsintervall.
- **Grenzwerte im AI:** High_Limit und Low_Limit sind der Hauptalarm, Min_Pres_Value und Max_Pres_Value die Messbereichsgrenzen für die Fühlerstörung. Ein Voralarm kommt aus einem eigenen EE vom Typ OUT_OF_RANGE.
- **Schutzorgane im Ruhestromprinzip:** FI, LS und Spannungsüberwachung melden Normal als ACTIVE und Ausgelöst als INACTIVE. Ein Drahtbruch wird so zur Meldung.
- **Watchdog-BV** in NC224, nicht quittierpflichtig.

### Anlageschalter

<figure class="schema"><svg viewBox="0 0 560 240" role="img" aria-label="Anlageschalter nach KBOB: Wahlschalter lokal schreibt auf Priorität 7, das Leitsystem auf Priorität 8, die Zeitschaltuhr auf Priorität 14 des Multi-state Value Betriebswahl; dessen Present_Value wirkt auf die Aggregate" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="10" y="32" width="160" height="46" rx="4"/><rect x="10" y="107" width="160" height="46" rx="4"/><rect x="10" y="182" width="160" height="46" rx="4"/><rect x="230" y="32" width="140" height="196" rx="4"/><path d="M230 92.5H370M230 167.5H370" stroke-width="1" stroke-opacity="0.5"/><path d="M170 55H222M170 130H222M170 205H222"/><path d="M220 51L230 55L220 59ZM220 126L230 130L220 134ZM220 201L230 205L220 209Z" fill="currentColor" stroke="none"/><rect x="420" y="102" width="130" height="56" rx="4"/><path d="M370 130H412"/><path d="M410 126L420 130L410 134Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none" font-size="11" text-anchor="middle"><text x="90" y="22" font-weight="600">Wer schaltet</text><text x="300" y="22" font-weight="600" font-size="12">MV Betriebswahl</text><text x="485" y="94" font-size="10">wirkt auf die Aggregate</text><text x="90" y="51" font-weight="600">Wahlschalter lokal</text><text x="90" y="67">MI Betriebswahl lokal</text><text x="90" y="126" font-weight="600">Bedienung Leitsystem</text><text x="90" y="142">MBE</text><text x="90" y="201" font-weight="600">Zeitschaltuhr</text><text x="90" y="217">SC</text><text x="300" y="51" font-weight="600">Priorität 7</text><text x="300" y="67">Manuell ab Anlage</text><text x="300" y="126" font-weight="600">Priorität 8</text><text x="300" y="142">Manuell ab MBE</text><text x="300" y="201" font-weight="600">Priorität 14</text><text x="300" y="217">Zeitschaltungen</text><text x="485" y="124" font-weight="600">Present_Value</text><text x="485" y="141">Aus / Ein / Stufe n</text></g></svg><figcaption>Die niedrigste belegte Priorität gewinnt. «Auto» schreibt NULL, gibt die Stufe also frei.</figcaption></figure>

Die Betriebswahl einer Anlage ist ein **Multi-state Value**. Jede steuernde Stelle schreibt auf ihre eigene Stufe im Priority Array: der Wahlschalter am Schaltschrank auf 7, der Bediener am Leitsystem auf 8, die Zeitschaltuhr auf 14. **Auto bedeutet NULL**, die Stelle gibt ihre Stufe frei. Die Zustände des MV: 1 = Aus, 2 = Ein oder Stufe 1, 3 = Stufe 2 usw.

Der physische Wahlschalter ist ein **Multi-state Input** mit 1 = Auto, 2 = Aus, 3 = Ein oder Stufe 1. Stehen alle Schalterstellungen ausser «Aus» inaktiv, meldet der MI «Aus». Ein BV meldet optional den Handbetrieb ans Leitsystem, sobald jemand von Hand eingreift. Mehr zur Hardwareseite in [Hand-0-Auto](/wissen/hand-0-auto).

## Watchdog

BACnet selbst kennt keine Überwachung, ob eine AS noch lebt und ihr Programm läuft. Der Leitfaden schlägt deshalb ein Beispiel vor:

1. Das Leitsystem erhöht alle **3 Minuten** einen Zähler (0 bis 32 767) und schreibt ihn in einen AV auf der AS.
2. Die AS kopiert den Wert, zählt 1 dazu und schreibt ihn in einen zweiten AV.
3. Das Leitsystem liest diesen zurück und vergleicht. Weicht er ab, kommt eine Meldung.
4. Bleibt die Erhöhung vom Leitsystem aus, zählt die AS selbst alle 3 Minuten weiter.

So ist geprüft, dass beide Partner erreichbar sind und das Programm der AS läuft. Wie der Watchdog genau funktioniert, legt der Bauherr fest.

## Netzwerk

- Erlaubt sind nur **BACnet/IP** (BVLL über UDP) und **MS/TP** (EIA-485). MS/TP nur zwischen AS und Feldgeräten, mit festgelegter Baudrate.
- **UDP-Port 47808** (0xBAC0) muss jedes Gerät können. Weitere Ports nur nach Absprache.
- Netzstruktur und **BBMD-Konzept** legt der Bauherr fest: pro Subnetz ein BBMD, auf einer AS oder einem eigenen Gerät. Two-Hop ist üblich, One-Hop braucht speziell eingerichtete Router. Entfernte Einzelgeräte melden sich als **Foreign Device** an und müssen die Anmeldung vor Ablauf der Time To Live erneuern.
- Die **MAC-Adressen** aller Geräte werden dem Bauherrn gemeldet.

Netzplanung allgemein: [Netzwerk GA](/wissen/netzwerk-ga).

## Rollen, Planung und Lieferungen

Der Leitfaden empfiehlt beim Bauherrn einen **BACnet-Administrator**. Er pflegt die Bauherrenvorgaben, vergibt Device-IDs, Netzwerknummern, IP-Adressen und Ports, stimmt sich mit der internen IT ab (VLAN) und führt die **B-PAT**. Die B-PAT (BACnet Project Address Table) ist eine Tabelle der BIG-EU mit allen Adressdaten: Netzwerknummer (1–65 534), Data Link, UDP-Port, MS/TP-Baudrate und Max Master, Subnetz, Gateway, BBMD, je Gerät Name, Instanz, Hersteller, Standort, MAC-Adresse und Profil.

Wann die Vorgaben einfliessen:

| SIA-Phase       | Vorgaben sind Teil von     | Vorgaben beeinflussen                                                     |
| --------------- | -------------------------- | ------------------------------------------------------------------------- |
| 3 Projektierung | Steuer- und Regelbeschrieb | GA-Konzept                                                                |
| 4 Ausschreibung | Leistungsverzeichnis       | Offerte                                                                   |
| 5 Realisierung  | RPH                        | Datenpunkt- und Objektliste, Programmierung von AS und GLT, Dokumentation |

Der Unternehmer liefert: Zertifikat, **PICS** aller Gerätetypen und auf Wunsch **EDE-Dateien** aller Anlagen als XLS oder CSV nach BIG-EU. Kontrolliert wird mit den Beilagen C1 und C2:

- [Checkliste BACnet-Vorgaben (KBOB C1)](/checklisten/kbob-bacnet-vorgaben)
- [Checkliste BACnet-Funktionstest (KBOB C2)](/checklisten/kbob-bacnet-funktionstest)
- [Checkliste BACnet-Bauherrenvorgaben festlegen (KBOB E1)](/checklisten/kbob-bacnet-bauherrenvorgaben), für den Bauherrn vor der Ausschreibung

Wer die Datenpunktliste aufbaut: [Datenpunktliste](/wissen/datenpunktliste).

Werkzeuge dazu in dieser App: der [AKS-Generator](/rechner/aks) für Kennzeichen und Objektnamen und die [BACnet-Datenpunktliste](/rechner/bacnet-dpl), die aus GA-Funktionen die Objekte nach Kap. 7.2 erzeugt, mit Alarmliste und EDE-Export.

## Was in der Praxis oft schiefgeht

| Befund                                                    | Nach KBOB                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Alle Alarme in einer Notification Class                   | Klasse nach Kategorie und Quittiermuster wählen                               |
| Schedule-Default ist «Aus» statt NULL                     | Default NULL, sonst übersteuert das Zeitprogramm den Automatikbetrieb dauernd |
| Hand ab GLT auf Priorität 16                              | Priorität 8; 16 ist der Automatikbetrieb                                      |
| Sollwerte mit Priority Array, niemand gibt frei           | Sollwerte ohne Priority Array                                                 |
| Trend Log läuft voll und stoppt                           | Stop_When_Full FALSE                                                          |
| Leitsystem kann keine Trends anlegen                      | TLOG, SCHED, CAL, EE müssen dynamisch erstellbar sein                         |
| Objektnamen doppelt, weil jeder Unternehmer bei 1 beginnt | Object_Name netzweit eindeutig, Struktur vom Bauherrn                         |
| Engineering-Download überschreibt Änderungen des Betriebs | im Funktionstest prüfen, dass Änderungen zurückgelesen werden                 |

Die Empfehlung von 2021 nennt noch SIA 386.110 für die Energieeffizienz der GA. Heute gilt [SIA 386.111](/wissen/sia386).

## Quellen

- KBOB: Empfehlung BACnet Anwendung, V2.0, Juli 2021, Kap. 4–9
- KBOB: Leitfaden zu KBOB Empfehlung BACnet Anwendung, V2.0, Juli 2021
- KBOB: Beilagen T1, T2, C1, C2, E1, 2021
- BIG-EU: B-PAT BACnet Project Address Table
- ISO 16484-5 / ASHRAE 135: BACnet

<!-- EN -->

BACnet is open but leaves much undefined: which objects a device supports, how events are classified, who writes at which priority. Two vendors can both deliver "BACnet" and still work together poorly. The **KBOB recommendation BACnet application** (V2.0, July 2021) closes these gaps for Swiss projects. It applies to public buildings and becomes binding through the tender, see [KBOB Recommendations](/wissen/kbob). BACnet basics are in the article [BACnet](/wissen/bacnet).

The recommendation has three levels:

1. **KBOB recommendation:** minimum requirements, the same for all projects.
2. **Owner-specific requirements:** what the owner adds or decides, such as object names, device ID structure and alarm concept. The guideline, decision matrix E1 and template V1 support this.
3. **Project-specific requirements:** data point list, control description, network.

## Principles

- **BACnet version 1, revision 14** or higher. KBOB deliberately does not require the newest revision because devices on the market lag behind.
- **UTF-8.** Umlauts are allowed and must be representable as one character.
- **Certified devices only** (BTL, WSPCert); the **PICS** is supplied.
- **Use BACnet mechanisms:** COV, intrinsic and algorithmic reporting, priority array. Events always go through BACnet alarms and events.
- **No proprietary objects** for the specified BA functions, and no replacement of standard objects or services by proprietary ones.
- **Unused objects** such as spare inputs and outputs are hidden where possible. Spare objects created on purpose are marked as such in the name.

## Two Profiles: MBE-CH and AS-CH

Every device is assigned to a profile; the owner confirms the assignment:

| Profile    | Device                                        | Role                                |
| ---------- | --------------------------------------------- | ----------------------------------- |
| **MBE-CH** | Management and operator station, i.e. the BMS | Client: reads, writes, acknowledges |
| **AS-CH**  | Automation station                            | Server: provides objects and events |

**Mandatory for both:** AI, AO, AV, BI, BO, BV, MV, device, loop, notification class. **Calendar, event enrollment, schedule and trend log** must also be creatable and deletable at runtime (DC/DD), so that operators can create schedules and trends without the vendor's engineering tool. MI, MO and event log are always needed on the MBE, on the station when a BA function requires them. File, program and positive integer value are conditional for both.

The full list with all BIBBs is in the table [BACnet Profiles MBE-CH and AS-CH](/referenz/kbob-profile).

## Properties and Texts

**Minimum lengths** of character strings:

| Property                               | MBE-CH | AS-CH |
| -------------------------------------- | ------ | ----- |
| Object_Name                            | 64     | 64    |
| Description                            | 128    | 64    |
| Location                               | 64     | 64    |
| Event_Message_Texts                    | 128    | 64    |
| Active_Text, Inactive_Text, State_Text | 32     | 32    |
| all others                             | 32     | 32    |

- **Object_Name** is unique across the whole BACnet network, over all object types. KBOB does not prescribe a structure, but the device must be able to take the owner's naming scheme.
- **Units** per the BACnetEngineeringUnits data type of the standard.
- **State texts** for every Present_Value of BI, BV, MI and MV. Annex T1 gives uniform texts, see [State Texts](/referenz/kbob-zustandstexte).
- **Event message texts** for TO-NORMAL, TO-OFFNORMAL and TO-FAULT, if the owner wants them. Annex T2: [Event Texts](/referenz/kbob-eventtexte).

### Object Name from the Labelling Scheme

The guideline suggests building the object name from the BBL plant labelling if the owner has no scheme of its own:

<p class="formel">NNNN_AAX_ANN_ANNN_AN</p>

| Block    | Positions | Meaning                                                                | Example |
| -------- | --------- | ---------------------------------------------------------------------- | ------- |
| LOCATION | NNNN      | Economic unit (property)                                               | 2104    |
|          | AA        | Object (building)                                                      | HG      |
|          | X         | Level: 0 = ground floor, 1–3 = basement, A/B/C = 1st/2nd/3rd floor     | 2       |
| SYSTEM   | A         | System type, e.g. H heating, L ventilation/air conditioning, K cooling | L       |
|          | NN        | System number                                                          | 13      |
| DEVICE   | A         | Device type, e.g. B transmitter, M motor, Y actuator                   | M       |
|          | NNN       | Device number                                                          | 100     |
| FUNCTION | A         | Function type, e.g. M measured value, D event, S switching command     | S       |
|          | N         | Function number 0–9                                                    | 1       |

This gives `2104_HG2_L13_M100_S1`: switching command 1 of motor M100 in ventilation system 13, building HG, 2nd basement. For the BACnet-specific objects the guideline adds the function types **T** trend log, **U** schedule, **K** calendar, **R** loop and **N** notification class. The other types: Z meter value, Y positioning command, H virtual digital, W virtual analog.

This also applies to the Object_Name of the device object. The BBL directive is only a recommendation; the owner decides the final scheme. All code letters and number ranges: [Plant Labelling (AKS)](/wissen/anlagenkennzeichnung).

### Device ID

The device instance must be unique in the whole network. So that two contractors do not get in each other's way, the owner defines a structure once. Two examples from the guideline:

| Structure   | Layout                                                                                       | Example                                     |
| ----------- | -------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `NN NN NNN` | Building 00–40, floor (00 backbone, 01–35 floor, from 35 separate project), sequence 000–999 | 3017021: building 30, 17th floor, system 21 |
| `NNNN NNN`  | Sequence 0000–4194, building group 000–999                                                   | 0346824: system 346 of group 824            |

The largest instance in BACnet is 4 194 303, but it is reserved as a placeholder; 0 to 4 194 302 are usable. If the range is not enough, separate segments can be formed with different UDP ports. The management level keeps its device ID when the server is migrated.

## Notification Classes

KBOB divides events into eight categories with fixed number ranges:

| Category                      | NC          | Priority |
| ----------------------------- | ----------- | -------- |
| Life safety                   | NC1–NC4     | 1–7      |
| Property safety               | NC32–NC35   | 32–39    |
| Technical alarm (supervisory) | NC64–NC67   | 64–71    |
| Technical fault (trouble)     | NC96–NC99   | 96–103   |
| Maintenance message           | NC128–NC131 | 128–135  |
| Service / inspection message  | NC160–NC163 | 160–167  |
| Trend data                    | NC192–NC193 | 192–199  |
| Operating and status message  | NC224–NC225 | 224–231  |

Within a category the classes differ only in the **acknowledgement requirement** (Ack_Required). The last digit says what must be acknowledged:

| Class    | TO-OFFNORMAL | TO-FAULT | TO-NORMAL |
| -------- | ------------ | -------- | --------- |
| Base + 0 | no           | no       | no        |
| Base + 1 | no           | yes      | no        |
| Base + 2 | yes          | yes      | no        |
| Base + 3 | yes          | yes      | yes       |

Example from the guideline: a technical fault where both the fault and a hardware error must be acknowledged gets **NC98**. If the return to normal must also be acknowledged, **NC99**.

Further requirements:

- **Recipient_List:** all weekdays, 00:00 to 23:59:59.99, confirmed notifications, all three transitions. As recipient the **device ID** of the management system, not its address. This survives a server change but depends on the BBMD.
- **Notify_Type:** the guideline recommends event from the trend data category upwards, alarm below.
- **Disabling events:** via Event_Detection_Enable, during engineering, not in operation.
- **Alarm suppression** at runtime via Event_Algorithm_Inhibit and Reliability_Evaluation_Inhibit.
- The owner may add finer classes of their own.

All 28 classes with examples: [BACnet Notification Classes per KBOB](/referenz/kbob-meldeklassen). More on building an alarm concept in [Alarm Management](/wissen/alarmmanagement).

## Priorities

| Level | Use                                            |
| ----- | ---------------------------------------------- |
| 1     | Manual life safety, e.g. fire brigade switch   |
| 2     | Automatic life safety, e.g. fire control       |
| 5     | Critical equipment control, e.g. load shedding |
| 6     | Minimum on/off, not writable externally        |
| 7     | Manual at plant                                |
| 8     | Manual from management station                 |
| 12    | Central functions, e.g. cleaning lighting      |
| 14    | Time schedules, central commands               |
| 16    | Automatic operation                            |

The other levels are free only by agreement. **Physical outputs with a safety function** (BO, MO, AO, e.g. frost protection) must switch via the priority array, and the priority of the safety function is passed on to all aggregates: fan, valve, pump. For BV, MV and AV only in selected cases. **Setpoints without priority array**, the recommendation says. Details: [Priority List](/referenz/kbob-prioritaeten).

## Services

- **Confirmed:** AcknowledgeAlarm, ConfirmedCOVNotification, ConfirmedEventNotification, GetAlarmSummary.
- **Unconfirmed:** TimeSynchronization, UTCTimeSynchronization, Who-Has/I-Have, Who-Is/I-Am.
- **Only from the MBE:** DeviceCommunicationControl, ReinitializeDevice and UTCTimeSynchronization. A station must not broadcast a time synchronisation. Without a management level a time master is defined. The owner decides how the passwords for DCC and reinitialize are handled.

## Trends and Events

- Measured and output values, binary inputs, calculated setpoints and operating states are logged, but not alarm and fault values.
- **The default is time-triggered** (Logging_Type POLLED) at **15 minutes**. For binary switching states and meters KBOB recommends COV.
- Log_Interval is given in hundredths of a second: 15 min = 90 000.
- **Stop_When_Full FALSE**, Notification_Threshold so that **buffer ready occurs twice a day**, at least **10 days** retention locally. This allows comparing a whole week plus three days of the previous week.
- **Energy meters** are logged synchronously on all stations, with Align_Intervals and Interval_Offset.
- **COV thresholds** are set by the contractor with the planner, as a guide 1–5 % of the maximum change. Table: [COV Thresholds](/referenz/kbob-trends).
- Local event logging only via **event log** objects.

More on trend analysis in [Trending and Historisation](/wissen/trending-historisierung).

## Calendars and Schedules

- Three separate calendars: **CAL 1 public holidays**, **CAL 2 vacations**, **CAL 3 half days** such as the day before Good Friday or Ascension.
- The three calendars exist centrally as **master** and on every station as **slave**. Synchronisation is one-way only. So every station switches correctly even if the network fails.
- **Schedules** write to the schedule priority of the target object. The default value is **NULL**; plants switched on are reset via NULL.
- In the exception schedule the entries refer to the calendars, with event priorities **10 (CAL 1), 11 (CAL 2) and 12 (CAL 3)**. This Event_Priority has nothing to do with the write priority in the priority array.
- Keep switching times compact, with as few entries as possible.

## BA Functions

Chapter 7 of the recommendation defines for every typical plant function which BACnet objects it consists of. This makes data point lists of different contractors comparable. Only the core object is **mandatory**; the owner can require everything else:

| BA function                         | Mandatory                                      | Owner-specific                                                                                                                                   |
| ----------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| System-wide / automation station    | 3 × CAL, DEV                                   | ELOG, NC objects, BV for CPU, battery, I/O module, manual override, BACnet stack and watchdog, PROG                                              |
| Switchgear assembly                 | —                                              | BI for switch disconnector, RCD, MCB, voltage monitoring, surge protection, 24 V DC, fire alarm, local operation; acknowledgement and indication |
| Higher-level plant functions        | —                                              | Collective alarms (BV), local operation (BI), alarm suppression (BV), indication (BO), time switch (SC)                                          |
| Plant switch 1-, 2-, N-stage        | MV mode selection, MI local mode selection, SC | BV manual mode                                                                                                                                   |
| Drive 1-, 2-stage                   | BO switching command per stage                 | TL, EE maintenance message, PIV run hours, BV manual mode, BI maintenance switch, BV fault                                                       |
| Drive modulating                    | BO switching command, AO setpoint              | as above, plus AI actual value, BI run monitoring, TL                                                                                            |
| Shut-off/control element 2-point    | BO output value                                | TL, BI position feedback CLOSED and OPEN, BV fault                                                                                               |
| Shut-off/control element modulating | AO output value                                | AI output feedback, TL, BI CLOSED/OPEN, BV fault                                                                                                 |
| Shut-off/control element 3-point    | BO output CLOSE, BO output OPEN                | AI output feedback, TL, BI CLOSED/OPEN, BV fault                                                                                                 |
| Sensor modulating                   | AI actual value                                | EE pre-alarm, TL                                                                                                                                 |
| Sensor binary, limiter              | BI actual value                                | TL, BV fault                                                                                                                                     |
| Controller                          | LP                                             | TL setpoint                                                                                                                                      |
| Meter / measurement                 | AV meter or measured value                     | BV fault, TL                                                                                                                                     |
| Parameter                           | —                                              | AV, BV, MV                                                                                                                                       |

Some rules from this that are often done differently in practice:

- **Run feedback in the same object:** the switching command is a BO. The feedback is in its **Feedback_Value**, the run hours in **Elapsed_Active_Time**. No separate BI for the feedback.
- **Run hours:** Elapsed_Active_Time is reset after the drive is replaced; a PIV totals the hours of the aggregate and is never reset. An EE of type UNSIGNED_OUT_OF_RANGE reports due maintenance; pHighLimit is the maintenance interval.
- **Limits in the AI:** High_Limit and Low_Limit are the main alarm, Min_Pres_Value and Max_Pres_Value the range limits for sensor faults. A pre-alarm comes from a separate EE of type OUT_OF_RANGE.
- **Protective devices fail-safe:** RCD, MCB and voltage monitoring report normal as ACTIVE and tripped as INACTIVE. A broken wire thus becomes an alarm.
- **Watchdog BV** in NC224, no acknowledgement required.

### Plant Switch

<figure class="schema"><svg viewBox="0 0 560 240" role="img" aria-label="Plant switch per KBOB: the local selector writes to priority 7, the management system to priority 8, the time switch to priority 14 of the multi-state value mode selection; its Present_Value acts on the aggregates" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="10" y="32" width="160" height="46" rx="4"/><rect x="10" y="107" width="160" height="46" rx="4"/><rect x="10" y="182" width="160" height="46" rx="4"/><rect x="230" y="32" width="140" height="196" rx="4"/><path d="M230 92.5H370M230 167.5H370" stroke-width="1" stroke-opacity="0.5"/><path d="M170 55H222M170 130H222M170 205H222"/><path d="M220 51L230 55L220 59ZM220 126L230 130L220 134ZM220 201L230 205L220 209Z" fill="currentColor" stroke="none"/><rect x="420" y="102" width="130" height="56" rx="4"/><path d="M370 130H412"/><path d="M410 126L420 130L410 134Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none" font-size="11" text-anchor="middle"><text x="90" y="22" font-weight="600">Who switches</text><text x="300" y="22" font-weight="600" font-size="12">MV mode selection</text><text x="485" y="94" font-size="10">acts on the aggregates</text><text x="90" y="51" font-weight="600">Local selector</text><text x="90" y="67">MI local mode selection</text><text x="90" y="126" font-weight="600">Management system</text><text x="90" y="142">MBE</text><text x="90" y="201" font-weight="600">Time switch</text><text x="90" y="217">SC</text><text x="300" y="51" font-weight="600">Priority 7</text><text x="300" y="67">Manual at plant</text><text x="300" y="126" font-weight="600">Priority 8</text><text x="300" y="142">Manual from MBE</text><text x="300" y="201" font-weight="600">Priority 14</text><text x="300" y="217">Schedules</text><text x="485" y="124" font-weight="600">Present_Value</text><text x="485" y="141">Off / On / Stage n</text></g></svg><figcaption>The lowest occupied priority wins. "Auto" writes NULL, i.e. releases the level.</figcaption></figure>

The mode selection of a plant is a **multi-state value**. Every controlling source writes to its own level in the priority array: the selector on the panel to 7, the operator at the management system to 8, the time switch to 14. **Auto means NULL**: the source releases its level. The states of the MV: 1 = off, 2 = on or stage 1, 3 = stage 2 and so on.

The physical selector is a **multi-state input** with 1 = auto, 2 = off, 3 = on or stage 1. If all switch positions except "off" are inactive, the MI reports "off". A BV optionally reports manual mode to the management system as soon as someone intervenes by hand. More on the hardware side in [Hand-Off-Auto](/wissen/hand-0-auto).

## Watchdog

BACnet itself has no supervision of whether a station is alive and its programme running. The guideline therefore suggests an example:

1. The management system increments a counter (0 to 32 767) every **3 minutes** and writes it to an AV on the station.
2. The station copies the value, adds 1 and writes it to a second AV.
3. The management system reads it back and compares. If it differs, an alarm is raised.
4. If the increment from the management system stops, the station keeps counting every 3 minutes itself.

This checks that both partners are reachable and the station programme runs. The owner defines exactly how the watchdog works.

## Network

- Only **BACnet/IP** (BVLL over UDP) and **MS/TP** (EIA-485) are allowed. MS/TP only between station and field devices, with a defined baud rate.
- Every device must support **UDP port 47808** (0xBAC0). Further ports only by agreement.
- The owner defines the network structure and the **BBMD concept**: one BBMD per subnet, on a station or a separate device. Two-hop is common; one-hop needs specially configured routers. Remote single devices register as **foreign devices** and must renew the registration before the time to live expires.
- The **MAC addresses** of all devices are reported to the owner.

Network planning in general: [BA Network](/wissen/netzwerk-ga).

## Roles, Planning and Deliverables

The guideline recommends a **BACnet administrator** on the owner side. This person maintains the owner requirements, assigns device IDs, network numbers, IP addresses and ports, coordinates with internal IT (VLAN) and keeps the **B-PAT**. The B-PAT (BACnet Project Address Table) is a BIG-EU table with all address data: network number (1–65 534), data link, UDP port, MS/TP baud rate and max master, subnet, gateway, BBMD, and per device name, instance, vendor, location, MAC address and profile.

When the requirements come in:

| SIA phase      | Requirements are part of | Requirements influence                                                     |
| -------------- | ------------------------ | -------------------------------------------------------------------------- |
| 3 Design       | Control description      | BA concept                                                                 |
| 4 Tender       | Bill of quantities       | Offer                                                                      |
| 5 Construction | RPH                      | Data point and object list, programming of stations and BMS, documentation |

The contractor supplies: certificate, **PICS** of all device types and on request **EDE files** of all plants as XLS or CSV per BIG-EU. The check uses annexes C1 and C2:

- [Checklist BACnet requirements (KBOB C1)](/checklisten/kbob-bacnet-vorgaben)
- [Checklist BACnet functional test (KBOB C2)](/checklisten/kbob-bacnet-funktionstest)
- [Checklist define owner BACnet requirements (KBOB E1)](/checklisten/kbob-bacnet-bauherrenvorgaben), for the owner before the tender

Building the data point list: [Data Point List](/wissen/datenpunktliste).

Tools in this app: the [labelling generator](/rechner/aks) for labels and object names and the [BACnet data point list](/rechner/bacnet-dpl), which creates the objects per ch. 7.2 from BA functions, with alarm list and EDE export.

## What Often Goes Wrong in Practice

| Finding                                                     | Per KBOB                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------ |
| All alarms in one notification class                        | Choose the class by category and acknowledgement pattern                       |
| Schedule default is "off" instead of NULL                   | Default NULL, otherwise the schedule permanently overrides automatic operation |
| Manual from BMS at priority 16                              | Priority 8; 16 is automatic operation                                          |
| Setpoints with priority array, nobody releases them         | Setpoints without priority array                                               |
| Trend log fills up and stops                                | Stop_When_Full FALSE                                                           |
| Management system cannot create trends                      | TLOG, SCHED, CAL, EE must be dynamically creatable                             |
| Duplicate object names because every contractor starts at 1 | Object_Name unique network-wide, structure from the owner                      |
| Engineering download overwrites changes made by operations  | Check in the functional test that changes are read back                        |

The 2021 recommendation still refers to SIA 386.110 for BA energy efficiency. Today [SIA 386.111](/wissen/sia386) applies.

## Sources

- KBOB: Empfehlung BACnet Anwendung, V2.0, July 2021, ch. 4–9
- KBOB: Leitfaden zu KBOB Empfehlung BACnet Anwendung, V2.0, July 2021
- KBOB: annexes T1, T2, C1, C2, E1, 2021
- BIG-EU: B-PAT BACnet Project Address Table
- ISO 16484-5 / ASHRAE 135: BACnet
