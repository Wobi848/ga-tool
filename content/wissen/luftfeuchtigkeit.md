---
title: Luftfeuchtigkeit — Grundlagen für die GA
title_en: Air Humidity — Fundamentals for BA
slug: luftfeuchtigkeit
category: physik
subcategory: luft
tags:
  [
    luftfeuchtigkeit,
    relative-feuchte,
    absolute-feuchte,
    spezifische-feuchte,
    x-wert,
    mollier,
    h-x-diagramm,
    taupunkt,
    behaglichkeit,
    schimmel
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [
    befeuchter,
    feuchtesensoren,
    taupunkt,
    sensoren,
    waermerueckgewinnung,
    en16798,
    raumluftqualitaet
  ]
rechner: [psychrometrie, taupunkt]
norm: [DIN EN 13779, DIN EN 16798-1, DIN ISO 7730, SIA 382/1]
updated: 2026-05-24
lang: de
---

# Luftfeuchtigkeit — Grundlagen für die GA

Luftfeuchtigkeit ist ein zentraler Komfort- und Bauphysik-Parameter. Zu trocken → gereizte Schleimhäute und Statik-Probleme; zu feucht → Schimmel und Schwitzwasser. Die GA regelt Feuchte indirekt (über Befeuchten/Entfeuchten/WRG) und braucht dafür ein paar Begriffe und das h-x-Diagramm.

## Die drei Begriffe für „Feuchte"

| Grösse                  | Symbol | Einheit | Was bedeutet das?                                                                        |
| ----------------------- | ------ | ------- | ---------------------------------------------------------------------------------------- |
| **Relative Feuchte**    | φ, rF  | %       | Anteil des aktuellen Wasserdampfgehalts am **Sättigungsgehalt bei aktueller Temperatur** |
| **Absolute Feuchte**    | ρ_w    | g/m³    | Masse Wasserdampf pro Kubikmeter feuchte Luft                                            |
| **Spezifische Feuchte** | x      | g/kg    | Masse Wasserdampf pro Kilogramm **trockener** Luft — der **HLK-Standard**                |

**Warum x in der HLK?** Wenn man Luft erwärmt, dehnt sie sich aus → ρ_w (g/m³) ändert sich ohne dass Wasser zu- oder abgeführt wird. x dagegen bleibt konstant solange weder befeuchtet noch entfeuchtet wird. Deshalb ist x die **erhaltene Grösse** bei reiner Temperatur-Änderung — und damit der natürliche Parameter im h-x-Diagramm.

## Sättigung — warum „relative" Feuchte relativ ist

Warme Luft kann mehr Wasser tragen als kalte. Bei 0 °C sind etwa 3.8 g/kg Sättigung, bei 20 °C ~14.7 g/kg, bei 30 °C ~27 g/kg. Die rF setzt aktuellen Wassergehalt in Bezug zu diesem **temperaturabhängigen Maximum**:

$$\varphi = \frac{x}{x_\text{Sättigung}(T)} \cdot 100\;\%$$

**Konsequenz:** Wenn du dieselbe Luft (gleicher x-Wert) **erwärmst**, sinkt rF. Wenn du sie **kühlst**, steigt rF — bis bei Erreichen des **Taupunkts** rF = 100 % und Kondensation einsetzt.

### Klassisches Winter-Beispiel

| Punkt                                  | T      | rF     | x          |
| -------------------------------------- | ------ | ------ | ---------- |
| Aussen                                 | −5 °C  | 80 %   | ≈ 2.0 g/kg |
| Drinnen nach Heizung (ohne Befeuchten) | +22 °C | ≈ 12 % | ≈ 2.0 g/kg |
| Drinnen mit Komfort-Befeuchtung        | +22 °C | 40 %   | ≈ 6.6 g/kg |

Im Winter ist Innenluft ohne Befeuchtung **immer trocken** — egal wie sehr die Aussenluft „feucht" wirkt. Ein 80 %-rF-Tag draussen bei −5 °C ist physikalisch dieselbe Luft wie 12 % rF drinnen bei 22 °C.

## Das h-x-Diagramm (Mollier)

Das h-x-Diagramm (im englischen Sprachraum „Psychrometric Chart") trägt die Feuchtelage in 4 Achsen auf:

- **X-Achse:** spezifische Feuchte x [g/kg trockene Luft]
- **Y-Achse:** spezifische Enthalpie h [kJ/kg] (schräg, läuft nach links oben)
- **Isothermen:** schräge Linien für konstante Temperatur
- **rF-Linien:** gebogen, von links oben (kalt, gesättigt) nach rechts unten

### Typische Operationen als Pfeile

| HLK-Vorgang                                       | Bewegung im h-x-Diagramm                                            |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| **Heizen** (sensibel)                             | rein nach rechts (T steigt, x konstant, rF sinkt)                   |
| **Kühlen ohne Kondensation**                      | rein nach links (T sinkt, x konstant, rF steigt)                    |
| **Kühlen mit Kondensation**                       | nach links bis 100-%-Linie, dann entlang nach links unten (x sinkt) |
| **Adiabatische Befeuchtung** (Sprühnebel/Wäscher) | entlang Isenthalpe — h konstant, T sinkt, x steigt                  |
| **Dampfbefeuchtung**                              | fast vertikal nach oben (x steigt, T fast konstant)                 |
| **Mischen zweier Luftströme**                     | auf Verbindungslinie der beiden Punkte, gewichtet nach Massenstrom  |
| **Wärmerückgewinnung sensibel**                   | nur T-Verschiebung — x bleibt                                       |
| **Wärmerückgewinnung enthalpisch** (Rotor)        | T und x werden zwischen Zu- und Abluft getauscht                    |

> Im **[Psychrometrie-Rechner](/rechner/psychrometrie)** ist ein interaktives h-x-Diagramm eingebaut. Du gibst T + rF (oder x, Taupunkt, h) ein und siehst deinen Arbeitspunkt live im Carrier-Diagramm zusammen mit den rF-Kurven (20/40/60/80/100 %) und dem Taupunkt-Marker auf der Sättigungslinie.

## Behaglichkeitsbereich

Nach **DIN EN 16798-1** und **DIN ISO 7730** liegt der Komfortbereich bei:

- **rel. Feuchte:** 30–60 % (Kat. I), 25–65 % (Kat. II)
- **Temperatur:** 20–24 °C im Winter, 23–26 °C im Sommer

In der **SIA 382/1** (Schweiz) ist der Bereich 30–50 % rF im Winter, 30–65 % im Sommer.

| rF          | Bewertung                                                                       |
| ----------- | ------------------------------------------------------------------------------- |
| < 20 %      | Sehr trocken — Schleimhäute, Augen brennen, Statik-Elektrizität, Holzschwund    |
| 20–30 %     | Trocken — typisch Winter ohne Befeuchtung, von vielen schon unangenehm          |
| **30–55 %** | **Komfort** — Standardziel in Komfortlüftung                                    |
| 55–65 %     | Spürbar feucht, noch ok; Schwüle bei höherer T                                  |
| > 65 %      | Schimmelrisiko an kalten Bauteilen wenn längerfristig; Hausstaubmilben gedeihen |
| > 80 %      | Akute Bauschäden bei kalten Wänden (Taupunkt erreicht → Kondensation)           |

## Zu trocken — Konsequenzen und Massnahmen

**Symptome:**

- Brennende Augen, trockener Hals, vermehrte Atemwegsinfekte (RKI/WHO-Studien)
- Statische Aufladung (Funken beim Türklinken, Probleme in Elektronik-Räumen)
- Holzparkett/Möbel reissen, klassische Klavier-/Geigen-Verstimmung
- Vermehrte Staubaufwirbelung — kleine Partikel bleiben länger in der Luft

**Massnahmen GA-Seite:**

- **Dampfbefeuchter** zentral in RLT (kontrolliert + hygienisch, aber energieintensiv)
- **Adiabatischer Befeuchter** (Hochdrucksprüh, Verdunster) — energieärmer, aber Hygiene-Anforderungen nach **VDI 6022**
- **Wärme­rückgewinnung mit Enthalpie-Übertrager** (Rotor mit hygroskopischer Beschichtung) — gibt Feuchte der Abluft an die Zuluft zurück, oft die billigste „Befeuchtung"

Detail-Artikel: [Befeuchter](/wissen/befeuchter), [Wärmerückgewinnung](/wissen/waermerueckgewinnung).

## Zu feucht — Konsequenzen und Massnahmen

**Symptome:**

- Schimmel an kalten Wand-Ecken, hinter Möbeln, in Fensterlaibungen
- Hausstaubmilben (gedeihen ab ~50 % rF) — Allergien
- Materialschäden: aufgehende Tapeten, durchfeuchtete Dämmung, Korrosion an Stahlträgern
- Schwüle-Empfinden im Sommer schon ab 60 % rF + 26 °C

**Massnahmen GA-Seite:**

- **Kühlung mit Entfeuchtung** — Zuluft unter Taupunkt kühlen, kondensieren lassen, dann nachheizen
- **Adsorptions-Entfeuchter** (Silica-Gel/Lithiumchlorid-Rotor) — kann tiefer entfeuchten als Kühlentfeuchtung, energetisch teurer
- **Lüften mit kühlerer/trockenerer Aussenluft** (häufig im Winter problemlos, im Sommer nur nachts effektiv → siehe [Nachtauskühlung](/wissen/nachtauskuehlung))

## Was die GA typischerweise misst und regelt

| Messgrösse                             | Wo                             | Wofür                                         |
| -------------------------------------- | ------------------------------ | --------------------------------------------- |
| **rel. Feuchte**                       | Raum, Zu-, Abluft              | Komfortregelung, Befeuchter-Steuerung         |
| **Taupunkt**                           | Aussenluft, kritische Bauteile | Schwitzwasser-Schutz, Bauteilkühlung-Regelung |
| **Enthalpie** (rechnerisch aus T + rF) | RLT-Bilanz                     | Energiekenngrösse, Mischluft-Optimum          |

Sensor-Auswahl + Einbau: siehe [Feuchtesensoren](/wissen/feuchtesensoren).

## Praxis-Stolperfallen

- **Sensor neben Heizkörper** → misst lokale Trockenluft, nicht den Raum-Mittelwert
- **Sensor in der Decke** → warme Schicht, andere rF als am Aufenthaltsort
- **rF-Drift** über die Zeit — kapazitive Sensoren brauchen alle 2–3 Jahre Vergleichsmessung
- **Befeuchter ohne Hygienewartung** → Legionellen-Risiko bei Sprühvernebler (VDI 6022, ÖNORM H 6021)
- **Behaglichkeit nur über rF regeln** — der Komfort hängt auch von T, Strahlung, Luftgeschwindigkeit ab (siehe Behaglichkeitsmodell PMV/PPD nach DIN ISO 7730)

## Verwandt

- **[Befeuchter](/wissen/befeuchter)** — Bauarten, Regelung, Hygiene
- **[Feuchtesensoren](/wissen/feuchtesensoren)** — Messung, kapazitives Prinzip, Einbau
- **[Taupunkt](/wissen/taupunkt)** — Taupunktrechner, Bauteilkondensation
- **[Wärmerückgewinnung](/wissen/waermerueckgewinnung)** — sensibel vs enthalpisch
- **[Raumluftqualität](/wissen/raumluftqualitaet)** — IDA-Kategorien, EN 16798
- **[Psychrometrie-Rechner](/rechner/psychrometrie)** — h-x-Punkte interaktiv

## Zusammenfassung

| Wenn du …                               | Brauchst du …                                                     |
| --------------------------------------- | ----------------------------------------------------------------- |
| im Winter < 30 % rF im Raum hast        | Befeuchter (Dampf oder adiabat) oder Enthalpie-WRG                |
| im Sommer > 60 % rF + Schwüle hast      | Entfeuchtung über Kühlregister oder Adsorptions-Entfeuchter       |
| Schwitzwasser an Lüftungskanälen siehst | Dämmung prüfen, Zuluft-Taupunkt unter Kanal-Wandtemperatur halten |
| nach „Feuchte-Sollwert" für IBN suchst  | DIN EN 16798-1 Kat. I (30–60 %), SIA 382/1 (30–50 % Winter)       |
| Mischluft-Anteile optimieren willst     | h-x-Diagramm verwenden, Enthalpie der Aussen-/Abluft vergleichen  |
