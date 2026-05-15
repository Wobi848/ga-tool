---
title: Pumpen — Kennlinie, Regelung und EC-Pumpen
slug: pumpen
category: hydraulik
subcategory: pumpen
tags: [pumpe, pumpenkennlinie, arbeitspunkt, volumenstrom, förderhöhe, differenzdruck, ec-pumpe, nassläufer, trockenläufer, proportionaldruck, konstantdruck, frequenzumrichter, leistungszahl, cavitation, npsh]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulische-schaltungen, hydraulischer-abgleich, ec-motoren, frequenzumrichter, pid-regler]
norm: [EN ISO 9906, ErP 2012/622/EU]
updated: 2026-05-14
lang: de
---

# Pumpen — Kennlinie, Regelung und EC-Pumpen

Pumpen sind die "Herzen" von Heizungs-, Kühlungs- und Sanitäranlagen. Das Verständnis der Pumpenkennlinie und der richtigen Regelungsstrategie ist Grundlage für effiziente und zuverlässige Anlagen.

## Pumpenkennlinie und Anlagenkennlinie

### Pumpenkennlinie

Zeigt die **Förderhöhe H** (oder Differenzdruck Δp) in Abhängigkeit vom **Volumenstrom Q**:

```
H [m]
│\
│ \  Pumpenkennlinie
│  \
│   \___
│       \___
│           \___
└──────────────── Q [m³/h]
```

Bei Q = 0 (Nullförderung): maximale Förderhöhe (Abschalthöhe)
Bei H = 0 (Drucklosförderung): maximaler Volumenstrom (Freiausflussmenge)

### Anlagenkennlinie

Das Rohrleitungssystem hat einen Widerstand der mit Q² steigt:

```
H [m]
│         /  Anlagenkennlinie (∝ Q²)
│        /
│       /
│      /
│_____/  (Nullpunkt = statische Förderhöhe)
└──────────────── Q [m³/h]
```

### Arbeitspunkt

Der **Arbeitspunkt** ist der Schnittpunkt von Pumpen- und Anlagenkennlinie:

```
H [m]
│
│  Pumpe       ●  Arbeitspunkt
│     ↘      ↗
│       ↘  ↗  Anlage
│         ●
└──────────────── Q [m³/h]
             AP (Q_0, H_0)
```

---

## Regelungsstrategien

### Konstantdruck

Differenzdruck wird auf konstantem Wert gehalten, unabhängig vom Volumenstrom:

```
Q = 100 % → Δp = Soll
Q = 50 %  → Δp = Soll (Drehzahl reduziert!)
```

**Einsatz:** Trinkwasser, Brauchwasser, wenn alle Abnehmer gleichen Druck brauchen.

### Proportionaldruck (empfohlen für Heizung/Kühlung)

Differenzdruck-Sollwert sinkt proportional mit dem Volumenstrom:

```
Q = 100 % → Δp = Δp_max (z.B. 400 mbar)
Q = 50 %  → Δp = Δp_min + 50% × (Δp_max − Δp_min)
Q = 0 %   → Δp = Δp_min (z.B. 200 mbar)
```

**Vorteil:** Thermostatventile arbeiten mit geringerem Δp → weniger Geräusche, bessere Regelbarkeit.

**Warum Proportional und nicht Konstant?** Bei Konstantdruck und kleinem Volumenstrom: sehr hoher Differenzdruck → Thermostatventile öffnen minimal → Regelqualität schlecht + Geräusche.

### Kennlinienregelung nach Temperatur

Manche EC-Pumpen regeln ihre Drehzahl direkt nach der Systemtemperatur (kälter = kleiner Wärmeabnahme = weniger Drehzahl). Vereinfachte Variante für einfache Anlagen.

---

## EC-Pumpen (Hocheffizienz-Nassläufer)

Moderne Heizungsumwälzpumpen sind fast ausschliesslich **EC-Pumpen** (Electronically Commutated):

| Parameter              | Alte AC-Pumpe     | EC-Pumpe           |
|------------------------|-------------------|--------------------|
| Wirkungsgrad (nominal) | 40–60 %           | 70–90 %            |
| Stromaufnahme (20 % Last) | 80 % von Nenn   | 15–25 % von Nenn  |
| Jahresverbrauch (typ.) | 500–1500 kWh/a    | 50–200 kWh/a       |
| ErP 2015 Pflicht       | ❌                | ✅                 |
| Integrierte Regelung   | ❌                | ✅                 |

**ErP 2015:** In EU/CH müssen neue Nassläufer-Umwälzpumpen (1–200 kW) EC-Pumpen sein (Effizienzindex EEI ≤ 0.23).

### EC-Pumpen Schnittstellen für GA

| Signal          | Beschreibung                          |
|-----------------|---------------------------------------|
| 0–10 V (Eingang) | Drehzahl / Δp-Sollwert von DDC       |
| 0–10 V (Ausgang) | Istwert zurückmelden                 |
| Modbus RTU      | Vollständige Parametrierung + Diagnose|
| Analoge Störmeldung | DI auf Störkontakt                |

---

## Pumpentypen im Überblick

| Typ               | Beschreibung                          | GA-Einsatz               |
|-------------------|---------------------------------------|--------------------------|
| **Nassläufer**    | Motor läuft in Wasser (Permanentschmierung) | Heizung, Kühlung (Standard) |
| **Trockenläufer** | Motor getrennt vom Fördermedium       | Grosse Anlagen, Industrie |
| **Inline-Pumpe**  | Im Rohr integriert (Flanschanschluss) | Heizung, Kühlung         |
| **Blockpumpe**    | Pumpe + Motor als Block              | Grosse Anlagen            |
| **Tauchpumpe**    | Im Medium eingetaucht                 | Entwässerung, Druckhaltung|

---

## Pumpen-Überwachung in der GA

| Datenpunkt              | Typ | Beschreibung                         |
|-------------------------|-----|--------------------------------------|
| Pumpe EIN/AUS           | DO  | Schaltbefehl                         |
| Laufmeldung             | DI  | Bestätigung läuft (Strömungswächter) |
| Störmeldung             | DI  | Motorschutz ausgelöst                |
| Differenzdruck          | AI  | Über Pumpe (optional)                |
| Drehzahl / Δp Ist       | AI  | Von EC-Pumpe (0–10V oder Modbus)     |
| Drehzahl Soll           | AO  | Vorgabe an EC-Pumpe (0–10V)          |
| Betriebsstunden         | AV  | Aus Laufmeldung zählen               |

---

## Typische Fehler

| Fehler                        | Symptom                          | Ursache / Lösung              |
|-------------------------------|----------------------------------|-------------------------------|
| Pumpe läuft, kein Durchfluss  | T-Differenz = 0, Anlage kalt    | Luftblase, Rückschlagventil klemmt |
| Pump-Geräusche                | Pfeifendes/Zischendes Geräusch  | Kavitation, Differenzdruck zu hoch |
| Pumpe vibriert                | Mechanische Schwingung           | Arbeitspunkt zu weit rechts der Kennlinie |
| Motorschutz löst aus          | Pumpe schaltet ab                | Überlast, Wicklung heiss      |
| Zu hoher Energieverbrauch     | Betriebsstunden × kW = viel      | Drehzahl zu hoch, Δp-Soll zu hoch |

## Normen

- **EN ISO 9906** — Kreiselpumpen, hydraulische Leistungsprüfungen
- **ErP 2012/622/EU** — Ecodesign-Anforderungen Nassläufer-Umwälzpumpen
- **EN 16297** — Pumpen, Umwälzpumpen, Energieeffizienzindex
