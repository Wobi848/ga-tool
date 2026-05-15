---
title: CO₂-Sensoren — NDIR-Messprinzip und GA-Integration
slug: co2-sensoren
category: sensoren
subcategory: luftqualität
tags: [co2-sensor, ndir, kohlendioxid, raumluftqualität, iaq, abc-kalibrierung, pettenkofer, en16798, vdi6022, bedarfsgeführte-lüftung, ddc-co2, ppm, co2-regelung, zuluft-regelung, kalibrierung, wandfühler, kanalfühler]
difficulty: grundlagen
area: [ga, hlk]
related: [raumluftqualitaet, vav-cav, sensoren, befeuchter, druckregelung-lueftung, rlt-anlage]
rechner: []
norm: [EN 16798-1, EN 13779, VDI 6022, ASHRAE 62.1, DIN EN ISO 16000-26]
updated: 2026-05-15
lang: de
---

# CO₂-Sensoren — NDIR-Messprinzip und GA-Integration

CO₂-Konzentration ist der wichtigste Indikator für die **Raumluftqualität** in belegten Räumen. Sie korreliert direkt mit der Personenanzahl und ist die Grundlage für die **bedarfsgeführte Lüftung** — eine der wirksamsten Energiesparmassnahmen in der GA.

---

## NDIR — Nicht-dispersive Infrarot-Absorption

Das Messprinzip aller gängigen CO₂-Raumsensoren:

```
IR-Quelle → [Messküvette mit Luft] → Schmalbandfilter → IR-Detektor
                    │
           CO₂ absorbiert IR bei 4,26 µm
           Absorption ∝ CO₂-Konzentration
```

1. IR-Quelle emittiert breitbandiges Infrarotlicht
2. Gas-Probe in Messküvette: CO₂ absorbiert einen Teil der IR-Strahlung bei 4,26 µm
3. Optischer Schmalbandfilter (4,26 µm) lässt nur relevante Wellenlänge durch
4. Detektor misst verbleibende IR-Intensität
5. Signal wird in ppm CO₂ umgerechnet (Beer-Lambert-Gesetz)

**Referenzkanal:** Zweiter Detektor/Kanal bei einer Wellenlänge, die CO₂ nicht absorbiert → Kompensation von IR-Quellen-Drift und Staubverschmutzung.

---

## Grenzwerte und Richtwerte

| CO₂-Konzentration | Bewertung |
|------------------|-----------|
| 400–450 ppm | Aussenluft (aktuell ~420 ppm global) |
| 450–800 ppm | Sehr gute Raumluft |
| 800–1000 ppm | Gute Raumluft (Komfortkategorie II nach EN 16798) |
| 1000–1400 ppm | Mässige Raumluft (Kategorie III) |
| **> 1000 ppm** | **Pettenkofer-Grenzwert** — Lüftungserhöhung empfohlen |
| 1400–2000 ppm | Schlechte Raumluft, Konzentrationsprobleme |
| > 5000 ppm | MAK-Wert (Arbeitsplatz) — technische Massnahmen Pflicht |

**GA-Sollwert:** 800–1000 ppm → aktiviert höhere Lüftungsstufe (Kategorie II nach EN 16798-1).

---

## Kalibrierung

### ABC-Kalibrierung (Automatic Baseline Correction)
Der Sensor nimmt an, dass die minimale CO₂-Konzentration über ca. 2 Wochen dem Aussenwert (400–450 ppm) entspricht (z.B. nachts/am Wochenende bei ungenutztem Gebäude):
- Automatisch, kein Eingriff nötig
- **Problem:** In durchgehend genutzten Räumen (Krankenhaus, 24/7-Betrieb) funktioniert ABC nicht korrekt
- Abhilfe: ABC deaktivieren, manuelle Kalibrierung

### Manuelle Kalibrierung (Frischluft-Kalibrierung)
Sensor für 20 min frischer Aussenluft (ohne direkten Atemzug) aussetzen, dann Nullpunkt setzen:
- Einmalig bei Inbetriebnahme empfohlen
- Wiederholungsintervall: alle 1–2 Jahre

---

## Sensortypen für die GA

| Typ | Einbau | Einsatz |
|-----|--------|---------|
| **Wandfühler mit Display** | Sichtbar im Raum | Büro, Konferenzraum |
| **Wandfühler ohne Display** | Unauffällig | Standardräume |
| **Kanalsensor** | Im Abluftkanal | Zentrale Auswertung für mehrere Räume |
| **Kombisensor** CO₂ + Temp + rF | Wandmontage | Raumklimastation |

**Kanal vs. Raumsensor:**
- Kanalsensor misst die gemischte Abluft → mittlere Raumluftqualität
- Raumsensor misst repräsentativen Punkt → direkter Raumwert
- Für Einzelraum-VAV: Raumsensor bevorzugt

---

## Bedarfsgeführte Lüftung (Demand Controlled Ventilation, DCV)

```
CO₂-Sensor (Raum) → DDC → VAV-Klappenantrieb → Luftmenge
     │                │
 800 ppm           Klappe 20% (Grundlüftung)
1000 ppm           Klappe 50%
1200 ppm           Klappe 80%
1500 ppm           Klappe 100% + Alarm
```

**Energiesparpotenzial DCV gegenüber Konstantlüftung:** 30–60% Ventilator-Energieeinsparung in teilbelegten Räumen (Büros, Konferenzräume).

---

## Integration in die DDC/GLT

**Typische DDC-Funktionen:**
- Grenzwert-Alarme (Warnung 1000 ppm, Alarm 1500 ppm)
- Regelkreis CO₂ → Zuluftvolumenstrom
- Trending (Historisierung für Betriebsoptimierung und Nachweise VDI 6022)
- Stufenlose oder mehrstufige Volumenstromregelung

**Ausgangssignale Sensor:**
- 0–10 V (0 V = 0 ppm, 10 V = 2000 ppm) — häufigste GA-Version
- 4–20 mA (4 mA = 0 ppm, 20 mA = 2000 ppm)
- Modbus RTU / RS-485 — für digitale Anbindung mit Diagnose

---

## Häufige Fehler und Lösungen

| Problem | Ursache | Lösung |
|---------|---------|--------|
| Sensor zeigt dauerhaft 400 ppm (Aussenluft) | ABC-Kalibrierung hat falsche Baseline | ABC deaktivieren, manuell kalibrieren |
| Messwert schwankt stark | Direkter Atemhauch (schlechter Montageort) | Sensor mind. 1,5 m über Boden, nicht neben Tür |
| Zu hohe Werte trotz Lüftung | Kanalsensor misst rückgeführte Luft | Frischluftanteil im Abluft-Mischpunkt prüfen |
| Keine Reaktion auf Belegung | Signal falsch verknüpft / Schwellwert falsch | DDC-Parametrierung prüfen |
