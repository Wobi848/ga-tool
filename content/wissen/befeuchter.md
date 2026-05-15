---
title: Befeuchter — Typen, Regelung und Hygiene
slug: befeuchter
category: lueftung
subcategory: befeuchtung
tags: [befeuchter, luftbefeuchtung, dampfbefeuchter, verdunstungsbefeuchter, hochdruckbefeuchter, relative-feuchte, absolute-feuchte, hygiene, legionellen, kalibrierung, rlt, vdi6022]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vdi6022, legionellen, taupunkt, raumluftqualitaet]
norm: [VDI 6022, EN 13053, DIN 1946]
updated: 2026-05-14
lang: de
---

# Befeuchter — Typen, Regelung und Hygiene

Luftbefeuchtung im Winterbetrieb ist hygienisch komplex und energetisch teuer. Die richtige Wahl des Befeuchtertyps und korrekte Parametrierung sind entscheidend für Komfort, Hygiene und Wirtschaftlichkeit.

## Warum Befeuchtung?

Im Winter: Kalte Aussenluft enthält wenig Feuchte (geringe absolute Feuchte). Wird sie aufgeheizt, sinkt die **relative Feuchte** stark:

```
Aussenluft: −5 °C, 80 % rF → absolute Feuchte: ~1.9 g/kg
Aufgeheizt auf 20 °C: dieselbe absolute Feuchte →  relative Feuchte: ~11 %!

→ 11 % rF ist extrem trocken: 
  - Schleimhäute austrocknen
  - Statische Aufladung
  - Holzmöbel, Parkett leiden
```

**Norm-Empfehlung (Büro, Komfort):** 30–60 % rF. Mindestens 35 % für akzeptablen Komfort.

---

## Befeuchtertypen

### 1. Elektrischer Dampfbefeuchter

**Prinzip:** Elektrisches Heizelement verdampft Wasser → hygienisch reiner Dampf.

```
Wasser (Trinkwasserqualität)
    ↓ Erhitzen auf 100 °C
Sattdampf → in Luftstrom eingedüst → absorbiert in Luft
```

| Eigenschaft     | Wert                                    |
|-----------------|-----------------------------------------|
| **Hygiene**     | Sehr gut (100 °C tötet alle Keime)     |
| Energieverbrauch| Hoch (580 Wh/kg Dampf)                  |
| Wartung         | Entkalkung nötig (alle 1–3 Monate)     |
| Regelung        | Proportional (Leistung 0–100 %)        |
| Einsatz         | Büro, Spital, kritische Anwendungen    |

**Steuerung GA:** 0–10 V Leistungsvorgabe (0 = aus, 10 V = 100 % Leistung).

### 2. Verdunstungsbefeuchter (Umlaufverdunstung)

**Prinzip:** Wasser wird durch Ventilatoren über Filterpads geleitet, Luft wird daran vorbeigeführt.

```
Umwälzpumpe → Wasser über Filterpads → Luft führt Feuchte mit
```

| Eigenschaft     | Wert                                    |
|-----------------|-----------------------------------------|
| **Hygiene**     | **Problematisch** (stehendes Wasser → Legionellen!) |
| Energieverbrauch| Niedrig (nur Pumpe/Ventilator)         |
| Befeuchtungsgrad| Maximal 80–90 % rF (enthalpie-begrenzt) |
| Wartung         | Intensiv! Wassertank regelmässig reinigen |
| VDI 6022        | Klasse A: **Schwierig zu erfüllen**     |

> ⚠️ Verdunstungsbefeuchter in RLT-Anlagen sind hygienisch kritisch. Bei unzureichender Wartung → Legionellen und Schimmelbildung. Für neue Anlagen **nicht empfohlen**.

### 3. Hochdruck-Wasservernebelung

**Prinzip:** Wasser wird durch Hochdruckdüsen (70–100 bar) zu Tröpfchen < 10 µm vernebelt.

```
Umkehrosmose-Wasser (sehr rein) → Hochdruck-Pumpe → Düsen → Tröpfchennebel
```

| Eigenschaft     | Wert                                    |
|-----------------|-----------------------------------------|
| **Hygiene**     | Gut bei RO-Wasser und regelmässiger Desinfektion |
| Energieverbrauch| Niedrig–Mittel                          |
| Befeuchtungsgrad| Hoch                                    |
| Wartung         | Düsen verstopfen, regelmässige Reinigung|
| Einsatz         | Komfort-Anlagen, wenn Hygiene gesichert |

### 4. Dampfbefeuchter via Dampfnetz

Wo Niederdruckdampf verfügbar (Industrie, Krankenhäuser):

```
Dampfnetz → Druckminderer → Befeuchterdampf → Luftstrom
```

- Sehr hygiensich (Dampf > 100 °C)
- Keine elektrische Eigenheizleistung
- Druckregelung nötig

---

## Hygiene-Anforderungen (VDI 6022)

**VDI 6022 Klasse A** (Krankenhaus, Reinraum): Strikte Anforderungen:

- Dampfbefeuchter bevorzugt (keine Wasserwanne)
- Wenn Wasser-Befeuchter: vollständige Entwässerung und Austrocknung möglich
- Regelmässige mikrobiologische Probenahme
- Temperaturen immer > 55 °C an allen Wasserkontakt-Flächen

---

## Regelung der Luftbefeuchtung

```
Fühler: Relative Feuchte Zuluft oder Abluft (Kombi-Sensor)
Sollwert: 45–55 % rF (typisch)

PID-Regler:
  Eingang: Ist-Feuchte
  Sollwert: 50 % rF
  Ausgang: Befeuchter-Leistung 0–100 %
  
Begrenzung: Zuluft-Taupunkt > Rohroberfläche (sonst Kondensation!)
Sicherheit: Überfeuchte-Alarm wenn > 70 % rF (Kondensationsrisiko)
```

### Hysterese und Verzögerung

Feuchteänderungen in der Luft sind träge → Pi-Regler mit langer Nachstellzeit (Ti = 3–10 min) verwenden. Aggressiver Regler → Pendeln, überschwingen, Kondensation.

---

## GA-Datenpunkte Befeuchter

| Datenpunkt                 | Typ | Einheit | Beschreibung              |
|----------------------------|-----|---------|---------------------------|
| Feuchte Zuluft Ist         | AI  | % rF    | Nach Befeuchter           |
| Feuchte Sollwert           | AV  | % rF    | Vorgabe                   |
| Befeuchter Leistung        | AO  | %       | 0–10 V Stellsignal        |
| Befeuchter Betrieb         | DO  | —       | Freigabe EIN/AUS          |
| Befeuchter Störung         | DI  | —       | Kein Wasser, Kalkschutz   |
| Wasserverbrauch            | AI  | l/h     | Monitoring                |

## Normen

- **VDI 6022** — Hygieneanforderungen für RLT-Anlagen (Befeuchter Klasse A/B)
- **EN 13053** — Zentrale Raumlufttechnische Anlagen (Befeuchtungsabschnitt)
- **DIN 1946-4** — Raumlufttechnik in Krankenhäusern (strikte Hygieneregeln)
