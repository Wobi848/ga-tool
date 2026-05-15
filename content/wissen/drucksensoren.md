---
title: Drucksensoren in der GA — Messprinzipien und Anwendungen
slug: drucksensoren
category: sensoren
subcategory: druck
tags: [drucksensor, differenzdrucksensor, absolutdruck, relativdruck, piezoresistiv, kapazitiv, filterüberwachung, raumdruckhaltung, pumpenüberwachung, lüftung, kanaldruckmessung, pa-sensor, transmitter, 4-20ma, 0-10v]
difficulty: grundlagen
area: [ga, hlk]
related: [sensoren, signaltypen, zonendruckhaltung, druckverlust, pumpen, rlt-anlage]
rechner: []
norm: [EN 837, IEC 61298, VDMA 24007]
updated: 2026-05-15
lang: de
---

# Drucksensoren in der GA — Messprinzipien und Anwendungen

Druckmessung ist in der GA allgegenwärtig: Filterüberwachung, Ventilatorregelung, Raumdruckhaltung, Pumpenüberwachung, Leckageerkennung. Dieser Artikel erklärt die Messprinzipien, Messarten und typische GA-Anwendungen.

---

## Messarten

### Absolutdruck
Messung gegen das absolute Vakuum (0 Pa):
- Referenz: Vakuum
- Einheit: Pa (abs), bar (abs)
- GA-Anwendung: Meteorologische Stationen, Höhenmessung, selten in HVAC

### Relativdruck (Überdruck / Manometerdruck)
Messung gegen den **aktuellen Atmosphärendruck**:
- Referenz: Atmosphäre (variiert mit Höhe und Wetter)
- Einheit: Pa (rel), bar (rel), mbar
- GA-Anwendung: Heizungssystemdruck (Ausdehnungsgefäss-Überwachung), Wasserversorgungsdruck

### Differenzdruck
Messung der **Druckdifferenz zwischen zwei Messpunkten**:
- Referenz: keiner (zwei variable Messpunkte)
- Einheit: Pa, mbar
- GA-Anwendung: **Häufigste Messart in HVAC** — Filter, Ventilator, Kanaldruck, Durchfluss

---

## Messprinzipien

### Piezoresistiv (Dehnungsmessstreifen)
Ein Silizium-Chip verändert seinen elektrischen Widerstand unter Druckeinwirkung (piezoelektrischer Effekt):
- Sehr hohe Genauigkeit (0,1–0,5% FS)
- Kompakt, kostengünstig
- Typisch: Differenzdrucksensoren 0–500 Pa für Lüftung

### Kapazitiv
Membran bewegt sich unter Druck, verändert den Plattenabstand eines Kondensators:
- Sehr empfindlich für kleine Differenzdrücke (0–10 Pa möglich)
- Guter Temperaturgang
- Typisch: Feinst-Differenzdrucksensoren Reinraum

### Piezoelektrisch
Quarz-Kristall erzeugt elektrische Ladung unter Druck — nur für **dynamische** Druckmessungen (Vibration, Stoss):
- Nicht für statischen Druck geeignet (kein DC-Signal)
- GA: kaum verwendet (Industriemessung, Motoren)

---

## Ausgangssignale

| Signal | Bereich | Vorteil | Einsatz |
|--------|---------|---------|---------|
| 4–20 mA | 4–20 mA | Leitungsunabhängig, Kabelbrucherkennung | Standard-DDC |
| 0–10 V | 0–10 V | Einfach, kostengünstig | Kurze Leitungen |
| 0–5 V | 0–5 V | Kompakte Sensoren | Raumgeräte |
| Modbus RTU | RS-485 | Digitale Genauigkeit, Diagnose | GLT-Integration |
| IO-Link | IO-Link | Parametrierung, Diagnose | Industrie |

---

## Typische GA-Anwendungen

### Filterüberwachung Lüftungsanlage
```
ΔP_Filter = P_vor_Filter − P_nach_Filter

Neuer Filter: ΔP < 50 Pa
Alarm Verschmutzung: ΔP > 200 Pa (Filterklasse abhängig)
Sofortabschaltung: ΔP > 350 Pa (Filterdurchbruch-Schutz)
```
Sensor: Differenzdrucktransmitter 0–500 Pa, 4–20 mA

### Kanaldruck-Regelung (VAV)
```
P_Kanal_soll = 200 Pa (Sollwert)
Messung: 0–500 Pa Differenzdruck-Transmitter
Regelung: PID → Ventilator-Drehzahl (FU)
```

### Raumdruckhaltung (Reinraum, OP)
```
ΔP_Raum = P_Innen − P_Flur

Reinraum Klasse ISO 7: +10 bis +15 Pa
OP-Saal: +5 bis +10 Pa
Isolierraum (Infektionsschutz): −10 bis −15 Pa
```
Sensor: Hochgenauer Differenzdrucktransmitter 0–50 Pa (±0,5% FS)

### Systemdruck Heizung/Kühlung
```
P_System_soll = Vordruck + 0,2 bar (Reserve)
Alarm Druckabfall: P < P_min (Leckage)
Alarm Überdrück: P > P_max (Sicherheitsventil-Prüfung)
```
Sensor: Relativdrucktransmitter 0–4 bar, 4–20 mA

### Pumpenüberwachung (Förderhöhe)
```
ΔP_Pumpe = P_Druck − P_Saugseite

Kein Durchfluss bei laufender Pumpe:
  → ΔP sehr hoch → Alarm (geschlossenes Absperrventil)

Pumpe läuft ohne Förderung (Trockenlauf):
  → ΔP sehr niedrig → Alarm
```

---

## Auswahl und Einbau

| Parameter | Empfehlung |
|-----------|-----------|
| Messbereich | ca. 2× erwarteter Maximalwert |
| Genauigkeit | ≤ 2% FS für Regelung, ≤ 0,5% für Reinraum |
| Medienverträglichkeit | Luft: keine Anforderungen; Wasser: Edelstahl; Glykol: Edelstahl |
| Einbaulage | Vertikal bevorzugt (kein Kondensat in Druckleitung) |
| Druckanschluss Lüftung | Entnahmebohrung ⌀ 6 mm, Kunststoffschlauch, kein Gefälle zur Messzelle |
| Kabelführung | 4-20 mA: bis 500 m ohne Abschirmung möglich |

---

## Häufige Fehler

| Problem | Ursache | Lösung |
|---------|---------|--------|
| Nullpunkt-Drift | Temperatur, Alterung | Regelmässige Kalibrierung (1×/Jahr) |
| Falsche Messung | Kondensat in Messschlauch | Messschlauch mit Gefälle verlegen |
| Sensor ausserhalb Bereich | Druckstoss beim Start | Sensor mit Dämpfungsblock oder Snubber schützen |
| Signalrauschen | Turbulenz nah am Ventilator | Messort 5× Kanaldurchmesser vom Ventilator entfernt |
