---
title: Helligkeitssensoren — Tageslichtmessung und Beleuchtungssteuerung
slug: helligkeitssensoren
category: sensoren
subcategory: licht
tags: [helligkeitssensor, luxmeter, photosensor, photodiode, ldr, dämmerungsschalter, aussenlichtsensor, konstantlichtregelung, tageslichtnutzung, beschattungsautomat, luxwert, beleuchtungsstärke, dali-sensor, 0-10v-sensor, spektral, blendschutz]
difficulty: grundlagen
area: [ga, elektro]
related: [beleuchtungssteuerung, beschattungssteuerung, dali, sensoren, raumautomation]
rechner: []
norm: [EN 15193-1 (Tageslichtnutzung), CIE S 025 (Photometer), EN 12464-1 (Beleuchtung Arbeitsstätten)]
updated: 2026-05-15
lang: de
---

# Helligkeitssensoren — Tageslichtmessung und Beleuchtungssteuerung

Helligkeitssensoren messen die **Beleuchtungsstärke** (Lux) und bilden die Grundlage für Konstantlichtregelung, tageslichtabhängige Beschattung und Dämmerungsschalter. Richtig eingesetzt, senken sie den Beleuchtungsenergieverbrauch um 20–50%.

---

## Messgrüsse: Beleuchtungsstärke (Lux)

| Grösse | Einheit | Definition |
|-------|---------|-----------|
| **Beleuchtungsstärke E** | Lux (lx) | Lichtstrom pro Fläche: E = Φ / A |
| Leuchtdichte L | cd/m² | Wahrgenommene Helligkeit einer Oberfläche |
| Lichtstrom Φ | Lumen (lm) | Gesamter vom Leuchtmittel abgegebener Lichtstrom |
| Lichtintensität I | Candela (cd) | Lichtstrom pro Raumwinkel |

**In der GA relevant:** Beleuchtungsstärke E in Lux — direkt messbar, normiert.

---

## Typische Beleuchtungsstärken

| Situation | Beleuchtungsstärke |
|-----------|-------------------|
| Mondlicht | 0,1 lx |
| Strassenbeleuchtung | 5–30 lx |
| Treppe, Flur (Norm) | 100 lx |
| Büro Schreibtisch (EN 12464-1) | 500 lx |
| Technisches Zeichnen | 750 lx |
| Operationsraum | 10'000 lx |
| Bedeckter Himmel aussen | 5'000–20'000 lx |
| Direktes Sonnenlicht | 50'000–100'000 lx |

---

## Messprinzipien

### Photodiode (Halbleiter-Photosensor)
Standard in GA-Sensoren:
- Silizium-Photodiode erzeugt Strom proportional zur Lichtintensität
- Spektrale Empfindlichkeit: 400–1100 nm (sichtbar + nahes IR)
- **Lichtkorrekturfilter (V(λ)-Korrektur):** Passt Spektralkurve an das menschliche Auge an — wichtig für genaue Lux-Messung
- Günstig, schnell, linear

### Photowiderstands-Sensor (LDR, Light Dependent Resistor)
- Cadmiumsulfid (CdS) verändert Widerstand bei Licht
- Langsame Reaktion (Sekunden)
- Heute nur noch in einfachen Dämmerungsschaltern
- **Nicht für Regelung geeignet** (nichtlinear, langsam)

### Spektralsensor
Mehrkanal-Sensor mit einzelnen Photodioden + Farbfilter:
- Misst Farbtemperatur, Farbwiedergabe, Blauanteil (Melatonin)
- Zukünftige GA: Human Centric Lighting (HCL)
- Derzeit noch selten in Gebäudeautomation

---

## Sensortypen und Ausgangssignale

| Typ | Einsatz | Ausgang |
|-----|---------|---------|
| **Decken-Kombigerät** (Präsenz + Lux) | Büro, Konferenzraum | DALI-2, 0–10 V, Modbus |
| **Wandsensor** | Raumklimagerät, kombiniert | 0–10 V, Modbus |
| **Aussenlichtsensor** | Fassade, Beschattung | 0–10 V (0 = dunkel, 10 V = max) |
| **Kanalfühler** | Selten (Tageslichtkanäle) | 0–10 V |
| **Luxmeter** | Mobil, Inbetriebnahme | Digital (Bluetooth, USB) |

**Ausgangssignale:**
- **0–10 V:** z.B. 0 V = 0 lx, 10 V = 2000 lx (Bereich je nach Hersteller)
- **DALI-2 Part 301 (Light Sensor):** Digitaler Luxwert über DALI-Bus, konfigurierbar
- **Modbus RTU:** Direkter Lux-Wert in Integer (GA-Anbindung)

---

## Konstantlichtregelung (Daylight Harvesting)

Ziel: Beleuchtungsstärke am Arbeitsplatz konstant halten (z.B. 500 lx), indem Kunstlicht das Tageslicht ergänzt:

```
E_Soll = 500 lx
E_Ist = Sensor (am Schreibtisch oder Decke)

Wenn Tageslicht 300 lx liefert:
    → DALI dimmt Kunstlicht auf ~50% (ca. 200 lx Ergänzung)
Wenn Tageslicht 600 lx liefert:
    → DALI dimmt Kunstlicht auf 0% (aus)
```

**PID-Regelung:** Konstantlichtregelung ist ein geschlossener Regelkreis. Schnelle Wolkenwechsel erfordern I-Anteil zur Vermeidung von Dauerpendeln.

---

## Beschattungssteuerung

Aussenlichtsensor (Sonnenhöchste Direkteinstrahlung):

```
Aussenlichtsensor misst globale Strahlung:
    < 40'000 lx → Jalousie auf (offen, kein Blendschutz nötig)
    > 50'000 lx → Jalousie ab (Blendschutz aktiv)
    Windwächter überschritten → Jalousie auf (Schutzposition)
```

**Sonnenkurvensteuerung:** GLT berechnet aus Uhrzeit, Datum und Gebäudestandort den Sonnenstand (Azimut, Elevation) und öffnet/schliesst Lamellen entsprechend — unabhängig vom Sensor, aber in Kombination mit diesem.

---

## Montage und Inbetriebnahme

### Aussenlichtsensor
- **Montageort:** Freie Sicht nach Süd, Süd-West, ungekippt (Sensorebene horizontal)
- **Keine Verschattung** durch Gebäudeteile oder Bäume
- **Schutzklasse:** IP65 oder höher
- Kalibrierung: Vergleich mit Referenz-Luxmeter an klarem Tag

### Raumsensor (Konstantlicht)
- **Messebene:** Sensor misst Horizontal-Beleuchtungsstärke auf Arbeitshöhe oder schräg auf Arbeitsplatz
- **Keine direkte Sonneneinstrahlung** auf Sensor (führt zu Falschregelung)
- **Calibration Mode:** Sensor bei voller Kunstbeleuchtung ohne Tageslicht auf Sollwert kalibrieren

### DALI Part 301 Konfiguration
- Sensoradresse vergeben
- Messbereich einstellen (z.B. 0–1000 lx)
- Hysterese konfigurieren (vermeidet Flackern bei Wolkendurchzug)
- Deadband: Änderungen < ±5% lösen keine Regelaktion aus
