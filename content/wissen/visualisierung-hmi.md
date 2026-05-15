---
title: Visualisierung und HMI-Symbole in der GA
slug: visualisierung-hmi
category: ga
subcategory: visualisierung
tags: [visualisierung, hmi, symbole, glt-bild, schaltbild, fliessschema, pumpe, ventil, klappe, sensor, farbe, farblegende, iso-symbole, norm-symbole, bedienoberfläche, scada, desigo, ebi, win-cc, niagara]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, datenpunktliste, tab-protokoll, alarmmanagement, brandschutzklappen]
norm: [EN ISO 10628, DIN 2481, IEC 62424, VDI 3814-4]
updated: 2026-05-15
lang: de
---

# Visualisierung und HMI-Symbole in der GA

Die GLT-Visualisierung (HMI = Human-Machine Interface) zeigt den Anlagenstatus auf Bildschirmen. Einheitliche Symbole und Farbcodes erlauben schnelle Übersicht und reduzieren Bedienfehler.

## Grundprinzipien guter Visualisierung

```
Gute GLT-Visualisierung:
  ✓ Anlagenschema erkennbar (wie R&I-Schema, vereinfacht)
  ✓ Status auf einen Blick (Farbe + Symbol)
  ✓ Wichtige Istwerte immer sichtbar
  ✓ Sollwerte neben Istwerten
  ✓ Alarme prominent sichtbar
  ✓ Keine unnötige Dekoration / Animationen
  ✓ Konsistente Symbole im ganzen Projekt
  
Schlechte Praxis:
  ✗ 3D-Grafiken und Fotos (verlangsamt, veraltet schnell)
  ✗ Zu viele Farben (verliert Bedeutung)
  ✗ Wichtige Daten klein / versteckt
  ✗ Verschiedene Symbole für gleiche Komponenten
```

---

## Farbcodes (Best Practice / Industriestandard)

| Farbe        | Bedeutung                              | Beispiel                        |
|--------------|----------------------------------------|---------------------------------|
| **Grün**     | Betrieb OK / aktiv / EIN               | Pumpe läuft                     |
| **Rot**      | Störung / Alarm / Fehler               | Motorschutz ausgelöst           |
| **Gelb**     | Warnung / Handsteuerung                | Hand-Betrieb aktiv              |
| **Grau**     | AUS / inaktiv / gesperrt              | Pumpe gestoppt                  |
| **Blau**     | Kälte / Kühlsystem / Kältewasser      | Kaltwasserleitung               |
| **Orange**   | Wärme / Heizung / Dampf               | Vorlauf-/Rücklaufleitung        |
| **Weiss**    | Aussenluft / Neutralzustand            | Luftstrom / ODA                 |
| **Cyan**     | Zuluft (nach Aufbereitung)            | Zuluftkanal                     |

**Alarm-Farben (Priorität):**

| Farbe         | Priorität         |
|---------------|-------------------|
| Rot blinkend  | Kritisch          |
| Rot           | Hoch              |
| Orange        | Mittel            |
| Gelb          | Niedrig / Warnung |

---

## Symbole für Standardkomponenten

### Pumpen

```
Normal-Betrieb:       [⊙] Kreis mit Pfeil → grün gefüllt
AUS:                  [○] Kreis leer → grau
Störung:              [⊙] Kreis mit X → rot
Hand-Betrieb:         [⊙] Kreis → gelb gefüllt
```

### Ventile

```
2-Wege-Ventil:        ►◄  (Bowtie-Symbol)
3-Wege-Ventil:        ►◄ mit Abzweig
Öffnungsgrad:         Zahl % direkt am Symbol (z.B. "67 %")
Offen:                ►◄ grün
Geschlossen:          ►◄ rot (gefüllt)
Zwischenstellung:     ►◄ teilweise gefüllt
```

### Klappen (Luftklappen)

```
Offen:                [⁞] Striche senkrecht (offen, Luft strömt)
Geschlossen:          [—] Striche waagrecht (geschlossen)
Brandschutzklappe:    Zusätzlich Temperatur-Symbol / BSK-Bezeichnung
```

### Temperatursensoren

```
Symbol:  Δ oder ◈ (Raute) an Leitung
Anzeige: Wert direkt daneben (z.B. "45.3 °C")
```

### Ventilatoren

```
Symbol: Kreis mit Flügelrad-Andeutung
Drehzahl-Angabe: "75 %" oder "rpm" daneben
Laufpfeil: zeigt Drehrichtung
```

---

## Bildstruktur in der GLT

### Hierarchie der Bilder

```
Ebene 1: Übersichtsbilder
  - Gebäude-Gesamtübersicht (welche Anlagen, wo Alarme)
  
Ebene 2: Anlagenbilder
  - RLT-Anlage 1 (Schema mit allen Komponenten)
  - Heizkreis 1 (Pumpe, Ventile, Temperaturen)
  
Ebene 3: Detailbilder / Popups
  - Einzelregler parametrierung
  - Zeitprogramm-Editor
  - Trendgraph eines Datenpunkts
```

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

```
Breadcrumb-Navigation:
  Übersicht > Gebäude A > Heizung > Heizkreis 1

Zurück-Button immer sichtbar
Schnellnavigation zu Alarmliste, Trendbilder, Zeitprogramme
Suchfunktion nach Datenpunkt-Bezeichnung
```

---

## Bedienebenen und Passwortschutz

| Ebene  | Zugriffsrechte                              | Typischer Nutzer     |
|--------|---------------------------------------------|----------------------|
| 0      | Nur Lesen (Anzeige)                         | Hausmeister, Mieter  |
| 1      | Sollwerte ändern, manuell steuern           | Betrieb, FM          |
| 2      | Zeitprogramme, Parameter, Regler-Tuning    | Servicetechniker     |
| 3      | Vollzugriff, Programmierung, Konfiguration  | GA-Inbetriebnehmer   |

---

## Zeitprogramm-Visualisierung

Übersichtliche Darstellung der Wochenprogramme:

```
Montag:    [██████░░░░░░░░░░░░░░░░░]
            06:00  --  18:00  AUS
Samstag:   [░░░░░░░░░░░░░░░░░░░░░░░]
            kein Betrieb
            
Symbole:
  ██ = Komfortbetrieb (Sollwert X)
  ▒▒ = Absenkbetrieb (Sollwert Y)
  ░░ = Aus / Frostschutz
```

---

## Normen und Systeme

| Norm / Referenz      | Inhalt                                             |
|----------------------|----------------------------------------------------|
| **IEC 62424**        | Darstellung in CAEX / PCSD (Prozessleitsysteme)    |
| **DIN 2481**         | Rohrleitungssymbole (Ventile, Klappen)             |
| **EN ISO 10628**     | Fliesschemata für Verfahrenstechnik                |
| **VDI 3814-4**       | Qualitätsanforderungen Visualisierung GA           |

**Gängige GLT-Systeme:**
- Siemens Desigo CC / Insight
- Honeywell EBI (Enterprise Buildings Integrator)
- Schneider Electric EcoStruxure Building Operation
- Tridium Niagara / JACE
- Sauter Vision Center
