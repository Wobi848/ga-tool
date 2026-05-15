---
title: Feuchtesensoren — Messung der Luftfeuchte in der GA
slug: feuchtesensoren
category: sensoren
subcategory: feuchte
tags: [feuchtesensor, relative-feuchte, absolute-feuchte, taupunktmessung, kapazitiv, psychrometer, chilled-mirror, feuchtewächter, kondensationsschutz, befeuchterregelung, entfeuchtung, sorptionsrotor, komfort, rh-sensor, feuchtigkeitsübertragung]
difficulty: grundlagen
area: [ga, hlk]
related: [befeuchter, taupunkt, sensoren, rlt-anlage, thermische-behaglichkeit, raumluftqualitaet]
rechner: [taupunkt]
norm: [EN ISO 16000-11, ASHRAE 55, VDI 6022, ISO 7726]
updated: 2026-05-15
lang: de
---

# Feuchtesensoren — Messung der Luftfeuchte in der GA

Luftfeuchte beeinflusst thermische Behaglichkeit, Schimmelrisiko, Materialschutz und Prozessbedingungen. In der GA werden Feuchtesensoren zur Befeuchterregelung, Entfeuchtung, Kondensationsschutz und Komfortüberwachung eingesetzt.

---

## Messarten: Relative vs. Absolute Feuchte

| Messart | Definition | Einheit | GA-Einsatz |
|---------|-----------|---------|-----------|
| **Relative Feuchte** (rF) | Verhältnis des Wasserdampf-Partialdrucks zum Sättigungsdampfdruck bei gleicher Temperatur | % rH | Standard: Behaglichkeit, Schimmelschutz |
| **Absolute Feuchte** | Wasserdampfmasse pro Luftvolumen | g/m³ | Berechnet aus rF + T |
| **Wassergehalt** | Wasserdampfmasse pro Masse trockener Luft | g/kg | Psychrometrie, Befeuchterauslegung |
| **Taupunkt** | Temperatur, bei der Kondensation einsetzt | °C | Kondensationsschutz, Kühlung |

---

## Messprinzipien

### Kapazitiver Sensor (dominant in der GA)

Ein Polymer-Hygristor verändert seine elektrische Kapazität proportional zur Wasseraufnahme:

```
Polymer-Schicht absorbiert Wasserdampf
→ Dielektrizitätskonstante ε ändert sich
→ Kapazitätsänderung ∝ relative Feuchte
```

**Eigenschaften:**
- Messbereich: 0–100% rH
- Genauigkeit: ±2–3% rH (Standard), ±1% rH (Präzision)
- Reaktionszeit: 10–30 s
- Temperaturabhängig → integrierter Temperatursensor zur Kompensation erforderlich
- Drift: ca. 1% rH/Jahr — jährliche Kalibrierung empfohlen

**Bekannte Sensorfamilien:** Sensirion SHT3x/SHT4x, Honeywell HIH-6000, Vaisala INTERCAP/HUMICAP

### Chilled Mirror (Taupunktspiegel)

Hochpräzises Labormessgerät für Taupunktmessung:
1. Optisch polierter Spiegel wird gekühlt
2. Wenn Spiegeltemperatur = Taupunkt: Kondensation erscheint (Reflektion ändert sich)
3. Regelung hält Spiegel exakt am Taupunkt → direkte Taupunktmessung

- Genauigkeit: ±0,1°C Taupunkt
- Primärmethode, zur Kalibrierung anderer Sensoren
- Teuer, wartungsintensiv — nur in Labors oder als Referenz

### Psychrometer (Nass/Trocken-Thermometer)

Zwei Thermometer: eines trocken, eines mit feuchtem Docht umwickelt.
Verdunstungskälte senkt Temperatur des feuchten Thermometers:
```
rF = f(T_trocken, T_feucht)   [Magnus-Formel + Psychrometerkonstante]
```

- Einfach, robust, keine Drift
- Erfordert sauberes destilliertes Wasser für Docht
- Heute kaum in GA-Systemen (historisch, Wetterstation)

---

## Sensorbauformen für die GA

| Bauform | Einbau | Einsatz |
|---------|--------|---------|
| **Wandaufbau** (Raumgerät) | Innenraum, 1,5 m Höhe | Komfortüberwachung, Regelung |
| **Kanalfühler** (Lüftung) | In Zuluft-/Abluftkanal | Befeuchter, Wärmerückgewinnung |
| **Aussenluftfühler** | Geschützt aussen | Witterungskompensation, Enthalpie-Tausch |
| **Wanddurchführungsfühler** | Kelleraussenwand | Kondensations-/Schimmelschutz |
| **Kombifühler** T + rF | Überall | Standard in GA-Raumgeräten |

---

## Komfortwerte und Grenzwerte

| Bereich | Relative Feuchte | Bemerkung |
|---------|-----------------|-----------|
| **Komfort** | 40–60% rH | ASHRAE 55, EN ISO 7726 |
| Trockene Luft | < 30% rH | Reizung Schleimhäute, statische Aufladung |
| Zu feucht | > 65% rH | Schimmelrisiko an kalten Oberflächen |
| Schimmelgrenze | > 80% rH an Oberfläche | Pilzwachstum ab 72h |
| Kondensation | 100% rH | Taupunkt erreicht |

**Kanalluft:** 10–95% rH möglich je nach Aussenluftbedingungen — keine Komfortwerte.

---

## Befeuchterregelung (Zuluft)

```
Fühler im Zuluftkanal:
  x_Ist (g/kg) = f(T_Zuluft, rF_Zuluft)

Soll: x_Soll = 8 g/kg (entspricht ~50% rH bei 20°C Raumtemp)

Wenn x_Ist < x_Soll → Befeuchter EIN (Dampf oder Verdunstung)
Wenn x_Ist > x_Soll + Hysterese → Befeuchter AUS
```

**Hysterese zwingend erforderlich** (z.B. ±0,5 g/kg) — sonst Pendelbetrieb.

---

## Kondensationsschutz Kühlung

Bei Kühldecken und Betonkernaktivierung: Gefahr der Kondensation wenn Oberflächentemperatur < Taupunkt der Raumluft.

```
T_Oberfläche < T_Taupunkt_Raum?
    → Kühlung absperren oder Vorlauftemperatur erhöhen
```

**DDC-Logik:**
```
T_Taupunkt = berechnet aus T_Raum + rF_Raum
Wenn T_Vorlauf_Kühlung < T_Taupunkt + 1 K:
    → Alarmierung + Vorlauftemp auf T_Taupunkt + 2 K anheben
```

---

## Kalibrierung und Wartung

| Intervall | Massnahme |
|-----------|----------|
| Jährlich | Sichtkontrolle, Vergleichsmessung mit Referenzgerät |
| Alle 2 Jahre | Kalibrierung gegen zertifiziertes Referenzgerät (VDI 6022) |
| Bei Verdacht | Vergleich zweier Sensoren im selben Raum |

**Kalibrierung im Feld:** Gesättigte Salzlösungen erzeugen definierte Feuchte:
- LiCl: 11% rH | MgCl₂: 33% rH | NaCl: 75% rH | K₂SO₄: 97% rH
