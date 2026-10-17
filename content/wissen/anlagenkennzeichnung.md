---
title: Anlagenkennzeichnung (AKS) nach KBOB
title_en: Plant Labelling (AKS) per KBOB
slug: anlagenkennzeichnung
category: dokumentation
subcategory: planung
tags:
  [
    aks,
    anlagenkennzeichnung,
    kennzeichnung,
    betriebsmittelkennzeichnung,
    datenpunktadresse,
    kbob,
    bbl,
    msrl,
    objektname,
    beschriftung,
    schaltschrank
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [kbob-bacnet, datenpunktliste, schemalesen, kbob, hand-0-auto]
rechner: [aks, bacnet-dpl]
norm: [KBOB MSRL-Technik, DIN 40719-2, IEC 81346]
updated: 2026-10-17
lang: de
---

# Anlagenkennzeichnung (AKS) nach KBOB

Eine Pumpe heisst im Schema P1, in der Datenpunktliste Heizgruppe Süd Pumpe, auf dem Schild HG-S-P und im Leitsystem AI_123. Wer so arbeitet, sucht bei jeder Störung. Ein **Anlagenkennzeichnungssystem (AKS)** gibt jedem Betriebsmittel einen Namen, der überall gleich ist: im Schema, auf dem Schild am Apparat, im Schaltschrank, in der Datenpunktliste und als Datenpunktadresse in der GA.

In der Schweiz verbreitet ist das System der **KBOB-Empfehlung MSRL-Technik** (2000). Es lehnt sich an DIN 40719-2 und die firmenneutrale Datenübertragung FND an und wird vom BBL und vielen Kantonen bis heute verwendet. Der KBOB-Leitfaden BACnet von 2021 baut den BACnet-Objektnamen darauf auf.

## Aufbau

Vier Blöcke, jeder mit einem eigenen Vorzeichen:

<p class="formel">+ ORT &nbsp; = BTA &nbsp; - APPARAT &nbsp; : FUNKTION</p>

<p class="formel">+ NNNN AA X &nbsp; = A NN &nbsp; - A NNN &nbsp; : A N</p>

A steht für einen Buchstaben, N für eine Ziffer, X für beides. Gross- und Kleinbuchstaben bedeuten dasselbe, Grossbuchstaben sind vorzuziehen.

| Block          | Stellen | Inhalt                                                                             |
| -------------- | ------- | ---------------------------------------------------------------------------------- |
| **+ ORT**      | NNNN    | Anlage-Nummer bzw. Wirtschaftseinheit, vom Bauherrn nach Anlageverzeichnis         |
|                | AA      | Objekt, also das Gebäude, nach Objektverzeichnis                                   |
|                | X       | Ebene: 3, 2, 1 = Untergeschoss, 0 = Erdgeschoss, A, B, C = 1., 2., 3. Obergeschoss |
| **= BTA**      | A       | Art der betriebstechnischen Anlage, z.B. H Heizung, L Lüftung/Klima                |
|                | NN      | fortlaufende Nummer pro Art und Objekt                                             |
| **- APPARAT**  | A       | Apparateart nach DIN 40719-2, z.B. M Motor, Y Stellgerät                           |
|                | NNN     | Apparatenummer, nach funktionellen Bereichen gegliedert                            |
| **: FUNKTION** | A       | Funktionsart, z.B. S Schaltbefehl, M Messwert                                      |
|                | N       | Funktionsnummer 0–9                                                                |

Bezugspunkt der Ebene ist in der Regel der Standort des Schaltschranks, nicht der des Apparats. Die Anlage-Nummer (ORT1) braucht es nur für den überregionalen Datenaustausch; im Gebäude reicht oft +HZ1.

**Beispiel aus der Empfehlung:** `+3022 HZ1 = L13 - M100 : S0` ist der Schaltbefehl des Zuluftventilators M100 in der Lüftungsanlage L13, Gebäude HZ, Schaltschrank im 1. Untergeschoss, Anlage 3022.

## Anlagenarten (BTA)

| Art | Anlage                 | Art | Anlage                           |
| --- | ---------------------- | --- | -------------------------------- |
| A   | Sicherheit             | N   | Notstrom                         |
| B   | Beleuchtung            | O   | Öl                               |
| C   | Kommunikation          | P   | Druckluft                        |
| D   | Dampf                  | Q   | Primärmessung                    |
| E   | Elektro Niederspannung | R   | Sekundärmessung                  |
| F   | Brandmeldeanlage       | S   | Sanitär                          |
| G   | Gas                    | T   | Tableau, Schaltgerätekombination |
| H   | Heizung                | U   | USV                              |
| J   | Transportanlagen       | V   | Video, Audio                     |
| K   | Kälte                  | W   | Wasseraufbereitung               |
| L   | Lüftung, Klima         | X   | MSRL-Komponenten                 |
| M   | Mittelspannung         | Y   | Spezialanlagen                   |
|     |                        | Z   | Zutrittskontrolle                |

I ist frei und kann für Sonderanlagen genutzt werden. **Messanlagen** Q (Energie-Input und -Erzeugung) und R (Verbrauch pro Objekt) haben Nummernkreise nach Medium: 01–20 Elektro, 21–40 Dampf und Wärme, 41–60 Kälte, 61–70 unbehandeltes Wasser, 71–80 behandeltes Wasser, 81–90 Brennstoffe, 91–99 Diverses.

## Apparate

Die Apparateart ist ein einziger Buchstabe, verschieden für das Feld und den Schaltschrank:

| Art | Im Prozess (Feld)          | Im Schaltschrank          |
| --- | -------------------------- | ------------------------- |
| B   | Messumformer, Messelement  | Messwandler, Messumformer |
| D   | —                          | DDC-Gerät                 |
| E   | verschiedene Apparate      | —                         |
| F   | Schutzeinrichtung          | Sicherungsautomat         |
| G   | Generator, Stromversorgung | Netzgerät                 |
| H   | Meldeeinrichtung           | Meldelampe                |
| I   | virtueller Apparat         | virtueller Apparat        |
| K   | —                          | Schütz, Relais            |
| M   | Motor                      | —                         |
| P   | Messgerät                  | Messinstrument            |
| Q   | —                          | Starkstrom-Schaltgerät    |
| R   | Widerstand                 | —                         |
| S   | Revisions-, Endschalter    | Schalter, Steuerschalter  |
| T   | Transformator              | Transformator             |
| U   | Frequenzumrichter          | —                         |
| X   | —                          | Klemmen, Strips           |
| Y   | Stellgerät                 | —                         |
| Z   | —                          | Netzfilter                |

Die **Apparatenummer** sagt, wofür der Apparat da ist. Anhang B der Empfehlung teilt die Hunderter nach Funktion auf. Die Bereiche sind eine Empfehlung; reicht ein Bereich nicht, darf innerhalb der Hundertergruppe umdisponiert werden.

| Bereich | Heizung, Kälte, Sanitär                                                                        | Lüftung, Klima                                                                                |
| ------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| 000–099 | Allgemeines: Steuerschalter, Lampen, Sicherungen                                               | Allgemeines                                                                                   |
| 100–199 | Erzeugung: Kältemaschine, Kessel, BHKW                                                         | Ventilatoren: Zuluft 100, Fortluft 130, Aussenluft 160, Umluft 180                            |
| 200–299 | Erzeugung: Pumpen, Wärmetauscher                                                               | Lufterhitzer: Vor- 200, Nachbehandlung 250                                                    |
| 300–399 | Hilfseinrichtungen, z.B. Kühlturm                                                              | Luftkühler                                                                                    |
| 400–499 | Verteilung und Transport                                                                       | Befeuchtung: Dampf 400, Wäscher 450                                                           |
| 500–599 | Verbrauch                                                                                      | WRG: rotierend 500, statisch 550                                                              |
| 600–699 | Reserve, spezielle Anlageteile                                                                 | Reserve                                                                                       |
| 700–799 | Stellorgane nach Kreis: primär VL/RL/Bypass 700/710/720, sekundär 730/740/750                  | Klappen: Aussenluft 700, Mischluft 710, Zuluft 720, Fortluft 730; Brandschutzklappen 740, 770 |
| 800–899 | Messungen: Temperaturen nach Kreis 800–829, Druck 830, Durchfluss 840, Niveau 850, Energie 890 | Messungen: Temperatur, Feuchte, Druck, Enthalpie nach Luftart                                 |
| 900–999 | Schutz: Sicherheitsthermostate, Pressostate, Strömungs-, Niveauwächter, Lecküberwachung        | Schutz: Frost 900, Druck, Feuchte, Keilriemen, Filter 950                                     |

Innerhalb der Gruppen 200–599 bei Heizung, Kälte und Sanitär wiederholt sich das Muster: x00–x59 Pumpen 1–6, x60 Wärmetauscher, x70–x89 Zubehör, x90 Druckexpansion, x95 Nachfüllautomat. Bei Elektroanlagen zählen die ersten beiden Stellen die Hauptapparate, die dritte die Hilfsapparate.

## Funktionen

| Art | Bedeutung                |
| --- | ------------------------ |
| D   | Ereignismeldung          |
| Z   | Zählwert                 |
| S   | Schaltbefehl             |
| M   | Messwert                 |
| Y   | Stellbefehl              |
| H   | virtueller Punkt digital |
| W   | virtueller Punkt analog  |

Der KBOB-Leitfaden BACnet ergänzt für die Objekte, die es in der klassischen Datenpunktliste nicht gab: **T** Trend Log, **U** Zeitschaltprogramm, **K** Kalender, **R** Regler, **N** Meldeklasse.

## Wo die Kennzeichnung steht

| Betriebsmittel              | Kennzeichnung                                  | Beispiel                         |
| --------------------------- | ---------------------------------------------- | -------------------------------- |
| Einspeisefeld Schaltschrank | Klartext + ORT2 = BTA                          | Einspeisung + HZ1 = T03          |
| Abgangsfeld                 | Klartext = BTA                                 | Klimaanlage Büro = L13           |
| Unterstationsfeld           | Klartext = BTA                                 | Unterstation = X03               |
| Apparat im Schaltschrank    | = BTA - APPARAT                                | = L13 - Q100                     |
| Anlage                      | Klartext + ORT2 = BTA                          | Klimaanlage Büro + HZ1 = L13     |
| Apparat im Feld             | ORT2, BTA, APPARAT, Schaltschrank, Schemaseite | + HZ1 = L13 - M100, = T01, 110.6 |
| Kabel am Schaltschrank      | - APPARAT : ANSCHLUSS                          | - X100 : 23-26                   |
| Datenpunkt im MSRL-System   | + ORT = BTA - APPARAT : FUNKTION               | + 3022 HZ1 = L13 - M100 : S0     |

Schilder im Feld: mindestens 20 × 80 × 1,5 mm, schwarz mit weiss gravierter Schrift, gut sichtbar auf der Bedienungs- oder Revisionsseite. Zusätzlich tragen Ventilatoren, Pumpen, Kältemaschinen und Geräte ein Leistungsschild mit allen Auslegungsdaten.

## Datenpunktadresse und BACnet-Objektname

Für das firmenneutrale Datenübertragungsprotokoll FND war die Datenpunktadresse auf **16 Zeichen** beschränkt. Ohne Vorzeichen ergeben die vier Blöcke genau 16 Zeichen: `3022HZ1L13M100S0`.

Mit BACnet ist mehr Platz: Der Object_Name darf nach KBOB 64 Zeichen lang sein. Der Leitfaden schlägt deshalb Unterstriche als Trenner vor:

<p class="formel">3022_HZ1_L13_M100_S0</p>

Wichtig für BACnet: Der Objektname muss im ganzen Netz eindeutig sein. Mit ORT und BTA im Namen ist das automatisch erfüllt, solange jede Anlage ihre eigene Nummer hat. Das gilt auch für den Namen des Device-Objekts. Siehe [KBOB BACnet-Vorgaben](/wissen/kbob-bacnet).

## Praxis

- **Bauherr legt fest, Planer setzt um.** Die Empfehlung Gebäudetechnik 2026 verlangt ein einheitliches Kennzeichnungskonzept, das der Bauherr vorgibt oder bewilligt. Bestehende Konzepte, etwa von Hochschulen oder Spitälern, gehen vor. Die Empfehlung von 2000 nahm die ETH Zürich, die ETH Lausanne und das Paul Scherrer Institut ausdrücklich aus, weil sie bereits ein eigenes System hatten.
- **Früh vergeben.** Die Kennzeichnung gehört ins Prinzipschema der Projektierung, nicht erst in die Ausführung. Sonst entstehen zwei Namenswelten.
- **Reserve einplanen.** Lücken in den Nummernbereichen lassen Platz für spätere Apparate, ohne umzunummerieren.
- **Kein Umbenennen im Betrieb.** Ein umbenannter Datenpunkt verliert im Leitsystem oft seine Trendhistorie und Verknüpfungen.

Mit dem [AKS-Generator](/rechner/aks) lassen sich Kennzeichen und Objektnamen bilden und bestehende Kennzeichen zerlegen. Die [BACnet-Datenpunktliste](/rechner/bacnet-dpl) erzeugt daraus ganze Objektlisten.

## Andere Systeme

International ist heute **IEC 81346** (Referenzkennzeichnung) massgebend, die Nachfolgerin von DIN 40719-2. Sie arbeitet mit denselben Vorzeichen (= Funktion, + Ort, - Produkt), aber anderen Kennbuchstaben. In Deutschland ist in der GA auch die Benutzeradressierung nach VDI 3814 verbreitet. Welches System gilt, entscheidet der Bauherr; wichtig ist, dass im Projekt nur eines verwendet wird.

## Quellen

- KBOB: Empfehlung MSRL-Technik, Ausgabe 1, April 2000, Kap. E und Anhänge A, B
- KBOB: Leitfaden zu KBOB Empfehlung BACnet Anwendung, V2.0, 2021, Kap. 3.2.2
- KBOB: Empfehlung Gebäudetechnik, Juli 2026, Teil 5

<!-- EN -->

A pump is called P1 in the diagram, heating group south pump in the data point list, HG-S-P on the label and AI_123 in the management system. Anyone working like this searches at every fault. A **plant labelling system (AKS)** gives every item of equipment one name that is the same everywhere: in the diagram, on the label at the device, in the panel, in the data point list and as the data point address in BA.

Widespread in Switzerland is the system of the **KBOB recommendation MSRL technology** (2000). It is based on DIN 40719-2 and the vendor-neutral data transmission protocol FND and is still used by the federal buildings office BBL and many cantons. The KBOB BACnet guideline of 2021 builds the BACnet object name on it.

## Structure

Four blocks, each with its own prefix:

<p class="formel">+ LOCATION &nbsp; = SYSTEM &nbsp; - DEVICE &nbsp; : FUNCTION</p>

<p class="formel">+ NNNN AA X &nbsp; = A NN &nbsp; - A NNN &nbsp; : A N</p>

A stands for a letter, N for a digit, X for either. Upper and lower case mean the same; upper case is preferred.

| Block          | Positions | Content                                                                    |
| -------------- | --------- | -------------------------------------------------------------------------- |
| **+ LOCATION** | NNNN      | Site number or economic unit, set by the owner per site register           |
|                | AA        | Object, i.e. the building, per object register                             |
|                | X         | Level: 3, 2, 1 = basement, 0 = ground floor, A, B, C = 1st, 2nd, 3rd floor |
| **= SYSTEM**   | A         | Type of technical system, e.g. H heating, L ventilation/air conditioning   |
|                | NN        | Sequential number per type and object                                      |
| **- DEVICE**   | A         | Device type per DIN 40719-2, e.g. M motor, Y actuator                      |
|                | NNN       | Device number, structured by functional ranges                             |
| **: FUNCTION** | A         | Function type, e.g. S switching command, M measured value                  |
|                | N         | Function number 0–9                                                        |

The reference point for the level is usually the location of the panel, not of the device. The site number is only needed for data exchange across sites; within a building +HZ1 is often enough.

**Example from the recommendation:** `+3022 HZ1 = L13 - M100 : S0` is the switching command of supply fan M100 in ventilation system L13, building HZ, panel in the 1st basement, site 3022.

## System Types

| Type | System                        | Type | System                     |
| ---- | ----------------------------- | ---- | -------------------------- |
| A    | Security                      | N    | Emergency power            |
| B    | Lighting                      | O    | Oil                        |
| C    | Communication                 | P    | Compressed air             |
| D    | Steam                         | Q    | Primary metering           |
| E    | Electrical low voltage        | R    | Secondary metering         |
| F    | Fire alarm system             | S    | Plumbing                   |
| G    | Gas                           | T    | Panel, switchgear assembly |
| H    | Heating                       | U    | UPS                        |
| J    | Transport systems             | V    | Video, audio               |
| K    | Refrigeration                 | W    | Water treatment            |
| L    | Ventilation, air conditioning | X    | BA components              |
| M    | Medium voltage                | Y    | Special systems            |
|      |                               | Z    | Access control             |

I is free and can be used for special systems. **Metering systems** Q (energy input and generation) and R (consumption per object) have number ranges by medium: 01–20 electricity, 21–40 steam and heat, 41–60 cooling, 61–70 untreated water, 71–80 treated water, 81–90 fuels, 91–99 miscellaneous.

## Devices

The device type is a single letter, different for the field and the panel:

| Type | In the process (field)       | In the panel                       |
| ---- | ---------------------------- | ---------------------------------- |
| B    | Transmitter, sensing element | Instrument transformer, transducer |
| D    | —                            | DDC device                         |
| E    | Miscellaneous devices        | —                                  |
| F    | Protective device            | Circuit breaker                    |
| G    | Generator, power supply      | Power supply unit                  |
| H    | Signalling device            | Indicator lamp                     |
| I    | Virtual device               | Virtual device                     |
| K    | —                            | Contactor, relay                   |
| M    | Motor                        | —                                  |
| P    | Measuring instrument         | Measuring instrument               |
| Q    | —                            | Power switching device             |
| R    | Resistor                     | —                                  |
| S    | Maintenance, limit switch    | Switch, control switch             |
| T    | Transformer                  | Transformer                        |
| U    | Frequency converter          | —                                  |
| X    | —                            | Terminals, strips                  |
| Y    | Actuator                     | —                                  |
| Z    | —                            | Line filter                        |

The **device number** says what the device is for. Annex B of the recommendation divides the hundreds by function. The ranges are a recommendation; if a range is not enough, numbers may be reassigned within the hundred group.

| Range   | Heating, cooling, plumbing                                                                   | Ventilation, air conditioning                                                   |
| ------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 000–099 | General: control switches, lamps, fuses                                                      | General                                                                         |
| 100–199 | Generation: chiller, boiler, CHP                                                             | Fans: supply 100, exhaust 130, outdoor 160, recirculation 180                   |
| 200–299 | Generation: pumps, heat exchangers                                                           | Heaters: pre- 200, re-heating 250                                               |
| 300–399 | Auxiliary equipment, e.g. cooling tower                                                      | Air coolers                                                                     |
| 400–499 | Distribution and transport                                                                   | Humidification: steam 400, washer 450                                           |
| 500–599 | Consumers                                                                                    | Heat recovery: rotary 500, static 550                                           |
| 600–699 | Reserve, special parts                                                                       | Reserve                                                                         |
| 700–799 | Control elements by circuit: primary flow/return/bypass 700/710/720, secondary 730/740/750   | Dampers: outdoor 700, mixed 710, supply 720, exhaust 730; fire dampers 740, 770 |
| 800–899 | Measurements: temperatures by circuit 800–829, pressure 830, flow 840, level 850, energy 890 | Measurements: temperature, humidity, pressure, enthalpy by air type             |
| 900–999 | Protection: safety thermostats, pressure switches, flow and level switches, leak monitoring  | Protection: frost 900, pressure, humidity, V-belt, filter 950                   |

Within groups 200–599 for heating, cooling and plumbing the pattern repeats: x00–x59 pumps 1–6, x60 heat exchanger, x70–x89 accessories, x90 pressure expansion, x95 automatic refill. For electrical systems the first two digits count the main devices and the third the auxiliary devices.

## Functions

| Type | Meaning                |
| ---- | ---------------------- |
| D    | Event message          |
| Z    | Meter value            |
| S    | Switching command      |
| M    | Measured value         |
| Y    | Positioning command    |
| H    | Virtual point, digital |
| W    | Virtual point, analog  |

The KBOB BACnet guideline adds types for objects that did not exist in the classic data point list: **T** trend log, **U** schedule, **K** calendar, **R** controller, **N** notification class.

## Where the Label Goes

| Item                        | Label                                     | Example                          |
| --------------------------- | ----------------------------------------- | -------------------------------- |
| Incoming section of panel   | Plain text + LOC2 = SYSTEM                | Einspeisung + HZ1 = T03          |
| Outgoing section            | Plain text = SYSTEM                       | Klimaanlage Büro = L13           |
| Automation station section  | Plain text = SYSTEM                       | Unterstation = X03               |
| Device in the panel         | = SYSTEM - DEVICE                         | = L13 - Q100                     |
| Plant                       | Plain text + LOC2 = SYSTEM                | Klimaanlage Büro + HZ1 = L13     |
| Device in the field         | LOC2, SYSTEM, DEVICE, panel, diagram page | + HZ1 = L13 - M100, = T01, 110.6 |
| Cable at the panel          | - DEVICE : TERMINAL                       | - X100 : 23-26                   |
| Data point in the BA system | + LOC = SYSTEM - DEVICE : FUNCTION        | + 3022 HZ1 = L13 - M100 : S0     |

Labels in the field: at least 20 × 80 × 1.5 mm, black with white engraved lettering, clearly visible on the operating or service side. Fans, pumps, chillers and units also carry a rating plate with all design data.

## Data Point Address and BACnet Object Name

For the vendor-neutral protocol FND the data point address was limited to **16 characters**. Without prefixes the four blocks make exactly 16 characters: `3022HZ1L13M100S0`.

BACnet allows more: per KBOB the Object_Name may be 64 characters long. The guideline therefore suggests underscores as separators:

<p class="formel">3022_HZ1_L13_M100_S0</p>

Important for BACnet: the object name must be unique across the whole network. With location and system in the name this is automatic, as long as every plant has its own number. This also applies to the name of the device object. See [KBOB BACnet requirements](/wissen/kbob-bacnet).

## Practice

- **The owner decides, the planner implements.** The Building Services recommendation 2026 requires a uniform labelling concept set or approved by the owner. Existing concepts, e.g. of universities or hospitals, take precedence. The 2000 recommendation explicitly exempted ETH Zurich, EPF Lausanne and the Paul Scherrer Institute because they already had their own system.
- **Assign early.** Labels belong in the schematic during design, not only during construction. Otherwise two naming worlds emerge.
- **Plan reserves.** Gaps in the number ranges leave room for later devices without renumbering.
- **No renaming in operation.** A renamed data point often loses its trend history and links in the management system.

The [labelling generator](/rechner/aks) creates labels and object names and decodes existing labels. The [BACnet data point list](/rechner/bacnet-dpl) generates complete object lists from them.

## Other Systems

Internationally **IEC 81346** (reference designation) is now the standard, the successor of DIN 40719-2. It uses the same prefixes (= function, + location, - product) but different code letters. In Germany user addressing per VDI 3814 is also common in BA. The owner decides which system applies; what matters is that only one is used in a project.

## Sources

- KBOB: Empfehlung MSRL-Technik, edition 1, April 2000, ch. E and annexes A, B
- KBOB: Leitfaden zu KBOB Empfehlung BACnet Anwendung, V2.0, 2021, ch. 3.2.2
- KBOB: Empfehlung Gebäudetechnik, July 2026, part 5
