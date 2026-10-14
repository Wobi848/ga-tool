---
title: Visualisierung und HMI-Symbole in der GA
title_en: Visualisation and HMI Symbols in BA
slug: visualisierung-hmi
category: ga
subcategory: visualisierung
tags:
  [
    visualisierung,
    hmi,
    symbole,
    glt-bild,
    schaltbild,
    fliessschema,
    pumpe,
    ventil,
    klappe,
    sensor,
    farbe,
    farblegende,
    iso-symbole,
    norm-symbole,
    bedienoberfläche,
    scada,
    desigo,
    ebi,
    win-cc,
    niagara
  ]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, datenpunktliste, tab-protokoll, alarmmanagement, brandschutzklappen]
norm: [EN ISO 10628-2, EN 12792, ISA-101, VDI 3814]
updated: 2026-10-14
lang: de
---

# Visualisierung und HMI-Symbole in der GA

Die GLT-Visualisierung (HMI = Human-Machine Interface) zeigt den Anlagenstatus auf Bildschirmen. Einheitliche Symbole und Farbcodes erlauben schnelle Übersicht und reduzieren Bedienfehler.

## Grundprinzipien guter Visualisierung

**Gute GLT-Visualisierung:**

- ✓ Anlagenschema erkennbar (wie R&I-Schema, vereinfacht)
- ✓ Status auf einen Blick (Farbe + Symbol)
- ✓ Wichtige Istwerte immer sichtbar
- ✓ Sollwerte neben Istwerten
- ✓ Alarme prominent sichtbar
- ✓ Keine unnötige Dekoration / Animationen
- ✓ Konsistente Symbole im ganzen Projekt

**Schlechte Praxis:**

- ✗ 3D-Grafiken und Fotos (verlangsamt, veraltet schnell)
- ✗ Zu viele Farben (verliert Bedeutung)
- ✗ Wichtige Daten klein / versteckt
- ✗ Verschiedene Symbole für gleiche Komponenten

---

## Farbcodes (Best Practice / Industriestandard)

| Farbe         | Bedeutung                                                            | Beispiel              |
| ------------- | -------------------------------------------------------------------- | --------------------- |
| **Grün**      | Betrieb OK / aktiv / EIN                                             | Pumpe läuft           |
| **Rot**       | Störung / Alarm / Fehler                                             | Motorschutz ausgelöst |
| **Gelb**      | Warnung / Handsteuerung                                              | Hand-Betrieb aktiv    |
| **Grau**      | AUS / inaktiv / gesperrt                                             | Pumpe gestoppt        |
| **Blau**      | Kälte / Kühlsystem / Kältewasser                                     | Kaltwasserleitung     |
| **Rot, Blau** | Heizungsvorlauf rot, Rücklauf und Kälte blau, in Schemata verbreitet | Leitungen             |
| **Weiss**     | Aussenluft / Neutralzustand                                          | Luftstrom / ODA       |
| **Cyan**      | Zuluft (nach Aufbereitung)                                           | Zuluftkanal           |

**Alarm-Farben (Priorität):**

| Farbe        | Priorität         |
| ------------ | ----------------- |
| Rot blinkend | Kritisch          |
| Rot          | Hoch              |
| Orange       | Mittel            |
| Gelb         | Niedrig / Warnung |

---

## Symbole für Standardkomponenten

### Pumpen

- Normal-Betrieb: [⊙] Kreis mit Pfeil → grün gefüllt
- AUS: [○] Kreis leer → grau
- Störung: [⊙] Kreis mit X → rot
- Hand-Betrieb: [⊙] Kreis → gelb gefüllt

### Ventile

| Darstellung        | Symbol und Zustand                                                           |
| ------------------ | ---------------------------------------------------------------------------- |
| 2-Wege-Ventil      | zwei Dreiecke mit den Spitzen gegeneinander                                  |
| 3-Wege-Ventil      | dasselbe mit Abzweig                                                         |
| Öffnungsgrad       | Zahl direkt am Symbol, zum Beispiel 67 %                                     |
| offen, geschlossen | Füllung oder Zahl; nicht Rot für «zu», denn Rot ist für Störungen reserviert |

### Klappen (Luftklappen)

- Offen: [⁞] Striche senkrecht (offen, Luft strömt)
- Geschlossen: [—] Striche waagrecht (geschlossen)
- Brandschutzklappe: Zusätzlich Temperatur-Symbol / BSK-Bezeichnung

### Temperatursensoren

- Symbol: Δ oder ◈ (Raute) an Leitung
- Anzeige: Wert direkt daneben (z.B. "45.3 °C")

### Ventilatoren

- Symbol: Kreis mit Flügelrad-Andeutung
- Drehzahl-Angabe: "75 %" oder "rpm" daneben
- Laufpfeil: zeigt Drehrichtung

---

## Bildstruktur in der GLT

### Hierarchie der Bilder

- Ebene 1: Übersichtsbilder
- Gebäude-Gesamtübersicht (welche Anlagen, wo Alarme)

- Ebene 2: Anlagenbilder
- RLT-Anlage 1 (Schema mit allen Komponenten)
- Heizkreis 1 (Pumpe, Ventile, Temperaturen)

- Ebene 3: Detailbilder / Popups
- Einzelregler parametrierung
- Zeitprogramm-Editor
- Trendgraph eines Datenpunkts

### Muss-Elemente in jedem Anlagenbild

1. **Anlagenbezeichnung** (oben)
2. **Betriebsstatus** (läuft / aus / Alarm)
3. **Wichtigste Ist-Werte** (Temperaturen, Druck)
4. **Sollwert** (neben Istwert, editierbar)
5. **Handbefehl-Buttons** (Ein/Aus, Hand/Auto)
6. **Alarmzähler** oder Link zur Alarmliste
7. **Zeitstempel** letzte Aktualisierung

---

## Navigation

**Breadcrumb-Navigation:**

- Übersicht > Gebäude A > Heizung > Heizkreis 1

- Zurück-Button immer sichtbar
- Schnellnavigation zu Alarmliste, Trendbilder, Zeitprogramme
- Suchfunktion nach Datenpunkt-Bezeichnung

---

## Bedienebenen und Passwortschutz

| Ebene | Zugriffsrechte                             | Typischer Nutzer    |
| ----- | ------------------------------------------ | ------------------- |
| 0     | Nur Lesen (Anzeige)                        | Hausmeister, Mieter |
| 1     | Sollwerte ändern, manuell steuern          | Betrieb, FM         |
| 2     | Zeitprogramme, Parameter, Regler-Tuning    | Servicetechniker    |
| 3     | Vollzugriff, Programmierung, Konfiguration | GA-Inbetriebnehmer  |

---

## Zeitprogramm-Visualisierung

Wochenprogramme werden am besten als Balken je Tag dargestellt, mit einer Farbe je Betriebsart: zum Beispiel kräftig für Komfort, heller für Absenkung, leer für Aus oder Gebäudeschutz. Montag etwa: Komfort von 06:00 bis 18:00, sonst Absenkung. Samstag: kein Betrieb. Ausnahmen wie Feiertage gehören in einen Kalender, der das Wochenprogramm übersteuert.

---

## Normen und Systeme

| Norm / Referenz     | Inhalt                                                                    |
| ------------------- | ------------------------------------------------------------------------- |
| **EN ISO 10628-2**  | Grafische Symbole für Fliessschemata                                      |
| **DIN EN 12792**    | Lüftung von Gebäuden, Symbole und Begriffe                                |
| **ANSI/ISA-101.01** | Gestaltung von Bedienoberflächen in der Automation (High-Performance-HMI) |
| **VDI 3814**        | Gebäudeautomation                                                         |

**High-Performance-HMI** nach ISA-101: Bilder überwiegend grau, Farbe nur für Abweichungen und Alarme. Wer Rot für Vorlauf und Rot für Alarm verwendet, macht Alarme schwerer erkennbar.

**Gängige GLT-Systeme:**

- Siemens Desigo CC / Insight
- Honeywell EBI (Enterprise Buildings Integrator)
- Schneider Electric EcoStruxure Building Operation
- Tridium Niagara / JACE
- Sauter Vision Center

<!-- EN -->

# Visualisation and HMI Symbols in BA

The BMS visualisation (HMI = Human-Machine Interface) displays plant status on screens. Consistent symbols and colour codes allow quick overview and reduce operator errors.

## Principles of Good Visualisation

**Good BMS visualisation:**

- ✓ Plant diagram recognisable (like P&ID, simplified)
- ✓ Status at a glance (colour + symbol)
- ✓ Key actual values always visible
- ✓ Setpoints next to actual values
- ✓ Alarms prominently visible
- ✓ No unnecessary decoration / animations
- ✓ Consistent symbols throughout the project

**Poor practice:**

- ✗ 3D graphics and photos (slows down, ages quickly)
- ✗ Too many colours (meaning is lost)
- ✗ Important data small / hidden
- ✗ Different symbols for identical components

---

## Colour Codes (Best Practice / Industry Standard)

| Colour        | Meaning                                                         | Example                  |
| ------------- | --------------------------------------------------------------- | ------------------------ |
| **Green**     | Running OK / active / ON                                        | Pump running             |
| **Red**       | Fault / alarm / error                                           | Motor protection tripped |
| **Yellow**    | Warning / manual control                                        | Hand mode active         |
| **Grey**      | OFF / inactive / locked                                         | Pump stopped             |
| **Blue**      | Cold / cooling system / chilled water                           | Chilled water pipe       |
| **Red, blue** | heating flow red, return and cooling blue, common in schematics | pipes                    |
| **White**     | Outdoor air / neutral state                                     | Airflow / ODA            |
| **Cyan**      | Supply air (after conditioning)                                 | Supply air duct          |

**Alarm colours (priority):**

| Colour       | Priority      |
| ------------ | ------------- |
| Red flashing | Critical      |
| Red          | High          |
| Orange       | Medium        |
| Yellow       | Low / warning |

---

## Symbols for Standard Components

### Pumps

- Normal operation: [⊙] Circle with arrow → green filled
- OFF: [○] Empty circle → grey
- Fault: [⊙] Circle with X → red
- Manual mode: [⊙] Circle → yellow filled

### Valves

| Representation | Symbol and state                                                         |
| -------------- | ------------------------------------------------------------------------ |
| 2-way valve    | two triangles pointing at each other                                     |
| 3-way valve    | the same with a branch                                                   |
| Opening degree | number directly at the symbol, for example 67 %                          |
| open, closed   | fill or number; not red for "closed", because red is reserved for faults |

### Dampers (Air Dampers)

- Open: [⁞] Vertical bars (open, air flows)
- Closed: [—] Horizontal bars (closed)
- Fire damper: Additional temperature symbol / FD designation

### Temperature Sensors

- Symbol: Δ or ◈ (diamond) on pipe
- Display: Value directly next to it (e.g. "45.3 °C")

### Fans

- Symbol: Circle with impeller indication
- Speed: "75 %" or "rpm" alongside
- Direction arrow: shows rotation direction

---

## Screen Structure in the BMS

### Screen Hierarchy

- Level 1: Overview screens
- Building overview (which plants, where alarms)

- Level 2: Plant screens
- AHU 1 (diagram with all components)
- Heating circuit 1 (pump, valves, temperatures)

- Level 3: Detail screens / pop-ups
- Individual controller parameterisation
- Time program editor
- Trend graph for a data point

### Mandatory Elements in Every Plant Screen

1. **Plant designation** (top)
2. **Operating status** (running / off / alarm)
3. **Key actual values** (temperatures, pressure)
4. **Setpoint** (next to actual value, editable)
5. **Manual command buttons** (on/off, hand/auto)
6. **Alarm counter** or link to alarm list
7. **Timestamp** of last update

---

## Navigation

**Breadcrumb navigation:**

- Overview > Building A > Heating > Heating circuit 1

- Back button always visible
- Quick navigation to alarm list, trend screens, time programs
- Search function by data point name

---

## Access Levels and Password Protection

| Level | Access rights                                | Typical user              |
| ----- | -------------------------------------------- | ------------------------- |
| 0     | Read only (display)                          | Caretaker, tenant         |
| 1     | Change setpoints, manual control             | Operations, FM            |
| 2     | Time programs, parameters, controller tuning | Service technician        |
| 3     | Full access, programming, configuration      | BA commissioning engineer |

---

## Time Program Visualisation

Weekly schedules are best shown as bars per day, with one colour per mode: for example strong for comfort, lighter for setback, empty for off or building protection. Monday, say: comfort from 06:00 to 18:00, otherwise setback. Saturday: no operation. Exceptions such as holidays belong in a calendar that overrides the weekly schedule.

---

## Standards and Systems

| Standard / Reference | Content                                            |
| -------------------- | -------------------------------------------------- |
| **EN ISO 10628-2**   | Graphical symbols for process flow diagrams        |
| **EN 12792**         | Ventilation for buildings, symbols and terminology |
| **ANSI/ISA-101.01**  | HMI design for automation (high-performance HMI)   |
| **VDI 3814**         | Building automation                                |

**High-performance HMI** per ISA-101: displays mostly grey, colour only for deviations and alarms. Using red for supply pipes and red for alarms makes alarms harder to spot.

**Common BMS systems:**

- Siemens Desigo CC / Insight
- Honeywell EBI (Enterprise Buildings Integrator)
- Schneider Electric EcoStruxure Building Operation
- Tridium Niagara / JACE
- Sauter Vision Center
