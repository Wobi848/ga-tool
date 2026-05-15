---
title: Zonenkonzepte — Büro, Hotel, Spital, Wohnen
slug: zonenkonzepte
category: ga
subcategory: planung
tags: [zonenkonzepte, raumzonierung, büro, hotel, spital, krankenhaus, wohnen, einzelraum, gruppenraum, betriebszeiten, komfortprofil, präsenz, nutzungsart, ga-klasse, temperaturanforderungen]
difficulty: fortgeschritten
area: [ga, hlk]
related: [raumautomation, thermische-behaglichkeit, en15232, sia386, vdi6022, glt-grundlagen, raumluftqualitaet]
norm: [EN 15232, SIA 380/1, DIN 1946-4, VDI 6022, EN 16798]
updated: 2026-05-15
lang: de
---

# Zonenkonzepte — Büro, Hotel, Spital, Wohnen

Die Zonenaufteilung definiert, welche Räume gemeinsam geregelt werden und welche Komfort- und Betriebsanforderungen gelten. Unterschiedliche Gebäudetypen erfordern grundlegend verschiedene Zonenkonzepte.

## Grundsatz der Zonenbildung

```
Kriterien für eine Zone (gleicher DDC-Regelkreis):
  - Gleiche Nutzungszeit
  - Gleiche Temperaturanforderung
  - Gleiche Personendichte (CO2-Basis)
  - Gleiche Feuchte- und Luftqualitätsanforderung
  
Falsch: Büro + Korridor in einer Zone
  (Büro oft leer, Korridor immer durchlaufen → unterschiedliches Verhalten)
  
Richtig: Einzelraum = eigene Zone (Einzelraum-Regelung)
```

---

## Bürogebäude

### Einzelbüro

```
Betriebszeiten: 07:00–19:00 Werktage
Komforttemperatur: 21–23 °C (Heizen), 24–26 °C (Kühlen)
Absenk-/Nachttemperatur: 16 °C (Heizen), 28 °C (Kühlen)
CO2-Sollwert: 1000 ppm (Lüftung DCV)
Präsenz: PIR/Radar → Temperatur und Lüftung aktiviert
Beschattung: Sonnenschutz automatisch
```

### Grossraumbüro (Openspace)

```
Betriebszeiten: 07:00–20:00 Werktage
Zonierung: Teilzonen je ~200 m² (VAV-Box pro Zone)
Präsenz: je Zone getrennt (Radar-Melder)
Lüftung: DCV (Demand Controlled Ventilation) via CO2
Besprechungsräume: separate Zone, höherer Luftwechsel
```

### Besprechungsraum

```
Betriebsart:
  Leer: Absenkbetrieb (17 °C / min. Zuluft)
  Vor-Start (30 min): Vorheizen/Vorkühlen
  Besetzt: Komfort (22 °C, 500 lux, max. Zuluft für CO2)
  
Besonderheit: 
  Buchungssystem → Kalender-Integration → DDC-Vorbereitung
  Kurze Meetings: Präsenz → keine Vorheizung (Energiesparmodus)
```

---

## Hotel

### Zimmerautomation (typisch)

```
Betriebszustände:
  Zimmer FREI:        16 °C / 28 °C, Lüftung min., Licht 0 %
  Check-IN erwartet:  Vorheizen/-kühlen auf 22 °C (2h vor Ankunft)
  Zimmer BESETZT:     Komfort 20–24 °C, Lüftung normal
  Zimmer ANWESEND:    Eco-Karte steckt → Vollbetrieb
  Eco-Karte raus:     15 min Delay → Absenkung
  
Eco-Karte-Logik:
  Hotel-Schlüsselkarte in Wandsteckdose → Strom frei, Lüftung aktiv
  Karte raus → 15 min → Strom ab, Absenkbetrieb
```

### Korridor und öffentliche Bereiche

```
Korridor: 18 °C konstant (Gäste selten länger), Präsenzsteuerung Licht
Lobby:     24/7 Komfort, Empfangspult, Klimaanlage
Restaurant: Zeitsteuerung + CO2-DCV (volles Haus → viel Lüftung)
Spa / Pool: konstant 28 °C, hohe Feuchte (50–65 % rF), 24/7
```

---

## Krankenhaus / Spital

### Besonderheiten

```
Betrieb: 24/7, keine Absenkung in Patientenzimmern!
Hygiene: VDI 6022 / DIN 1946-4 (hohe Anforderungen)
Raumklassen:
  Klasse I (OP): Laminar Flow, ISO 5-7, Über-/Unterdruck
  Klasse Ib (Intensiv): Überdruckhaltung, hohe Luftwechselrate
  Klasse II (Norm-Station): normales Komfortniveau
  Klasse III (Korridor): Minimalanforderungen
```

### Patientenzimmer

```
Temperatur: 22–26 °C, individuell einstellbar ±2 K
Lüftung: mind. 2 × Luftwechsel/h
Feuchte: 30–60 % rF
Lärm: LAV ≤ 30 dB(A) (keine lauten Ventilatoren direkt am Zimmer)
Nacht: kein Absenkbetrieb (Patient immer anwesend)
Alarmierung: Störung → sofortige Meldung Wärterstation
```

### Operationssaal

```
Betriebsmodi:
  Standby: 18 °C, 8 Luftwechsel/h, +10 Pa
  Vorbereitung (Reinigung): 22 °C, 20 LW/h
  OP aktiv: 20–24 °C, ≥ 20 LW/h, +15 Pa Überdruck, 500 lux
  
LAF-Decke (Laminar Air Flow): 0.24–0.45 m/s senkrecht
Freigabe OP: Arzt / OP-Pflege → GLT-Betriebsart-Signal
```

---

## Wohngebäude

### Wohnung

```
Individuelle Regelung: keine zentrale GA-Vorgabe
Raumregler: Einzelraum-Thermostate (EN ISO 15500 / KNX)
Betriebszeiten: Bewohner-definiert
Absenkung: Nacht (22:00–06:00) und Abwesenheit
```

### MFH mit zentraler HLK

```
Zentrale Wärmeanlage (WP / Fernwärme)
    ↓
Wohnungsstation (WW-Übergabe je Wohnung)
    ↓
Einzelraum-Regelung (FBH-Thermostate)

GA: überwacht nur Übergabestationen
Individuelle Zimmer: lokale Thermostate (kein DDC nötig)
```

---

## Zonenplan-Dokumentation

Jedes Projekt benötigt einen Zonenplan:

| Zone ID | Bezeichnung     | Nutzung          | Sollwert Heiz | Sollwert Kühl | Lüftung |
|---------|-----------------|------------------|--------------|---------------|---------|
| Z-01    | Büro EG West    | Einzelbüro       | 21 °C        | 26 °C         | DCV CO2 |
| Z-02    | Besprechung 101 | Sitzungsraum     | 22 °C        | 25 °C         | 6 × LW/h|
| Z-03    | Korridor EG     | Verkehrsfläche   | 18 °C        | 28 °C         | 1 × LW/h|
| Z-04    | Serverraum      | IT-Infrastruktur | 18–24 °C     | 24 °C         | konstant|

---

## Normen

- **EN 15232** — GA-Effizienzklassen je Gebäudetyp (Büro, Wohnen, Spital)
- **SIA 380/1** — Thermische Energie im Hochbau (Zonentemperaturen CH)
- **DIN 1946-4** — Lüftung in Gebäuden des Gesundheitswesens (Raumklassen)
- **EN 16798-1** — Raumklima-Anforderungen nach Nutzung (Kategorie I–IV)
