---
title: Zonendruckhaltung — Reinräume, OP-Säle, Treppenhäuser
slug: zonendruckhaltung
category: lueftung
subcategory: druckregelung
tags: [zonendruckhaltung, reinraum, operationssaal, überdruck, unterdruck, druckdifferenz, druckkaskade, kaskadenregelung, iso14644, gmp, rlt, lüftung, krankenhaus, pharma, halbleiter]
difficulty: experte
area: [hlk, ga]
related: [rlt-anlage, vav-cav, entrauchung-rwa, regelkreise, pid-regler, sensoren]
norm: [EN ISO 14644, EU GMP Annex 1, DIN 1946-4, VDI 2167, SIA 382.1]
updated: 2026-05-15
lang: de
---

# Zonendruckhaltung — Reinräume, OP-Säle, Treppenhäuser

Zonendruckhaltung verhindert, dass kontaminierte Luft in sensible Bereiche eindringt (Überdruck) oder dass gefährliche Stoffe austreten (Unterdruck). Sie ist in Krankenhäusern, Reinräumen und Pharmaproduktion sicherheitskritisch.

## Grundprinzip

```
Überdruck-Zone:
  P_innen > P_aussen → Luft strömt nach aussen
  → verhindert Eindringen von Keimen / Partikeln
  Einsatz: OP-Saal, Reinraum, Frühgeborenen-Station

Unterdruck-Zone:
  P_innen < P_aussen → Luft strömt nach innen
  → verhindert Austreten von Keimen / Chemikalien
  Einsatz: Infektionsstation, Chemielabor, Pathologie
```

**Typische Druckdifferenzen:**

| Bereich             | Typ        | Druckdifferenz  |
|---------------------|------------|-----------------|
| Reinraum ISO 5      | Überdruck  | 10–15 Pa        |
| OP-Saal             | Überdruck  | 15–25 Pa        |
| Infektionsisolation | Unterdruck | 8–12 Pa         |
| Treppenhaus Brand   | Überdruck  | 50 Pa           |
| Schleuse            | Neutral / Kaskade | 5–10 Pa  |

---

## Druckkaskade

Mehrere Räume bilden eine Kaskade — jede Stufe hat definierten Druck:

```
Korridor    →  Schleuse  →  Reinraum
  0 Pa      →  +5 Pa    →  +15 Pa
  
Stufung: je Schleuse +5...+10 Pa
Luft strömt immer vom saubereren in den weniger sauberen Bereich

Für Infektionsstation (umgekehrt):
  Korridor  →  Vorraum  →  Isolationszimmer
  0 Pa      →  −5 Pa   →  −12 Pa
```

---

## Regelung der Zonendruckhaltung

### VAV-Regelung (häufig)

```
Drucksensor DP im Raum (relativ zum Korridor):
  Istwert: +18 Pa
  Sollwert: +15 Pa
  Abweichung: +3 Pa → Zuluft-VAV schliessen / Abluft-VAV öffnen

Regelung:
  Zuluft-VAV: Volumenstrom-Regler (Istwert via Pitot)
  Abluft-VAV: Volumenstrom-Regler
  
  ΔV = V_Zuluft − V_Abluft → Druckdifferenz-Ergebnis
  
  Korrekt:
    V_Zuluft > V_Abluft → Überdruck aufgebaut
    Differenz: typisch 50–200 m³/h (je nach Raumgrösse)
```

### Kaskaden-Algorithmus im DDC

```
Stufe 1: Drucksensor DP1 (Reinraum vs. Schleuse)
  PID-1 → Zuluft-Sollwert anpassen

Stufe 2: Drucksensor DP2 (Schleuse vs. Korridor)  
  PID-2 → Abluft-Sollwert anpassen

Kopplung: DP1 und DP2 interagieren → sorgfältige Entkopplung nötig
  Ti_1 ≠ Ti_2 (unterschiedliche Nachstellzeiten, keine Resonanz)
```

---

## Reinraumklassen (ISO 14644)

| ISO-Klasse | Partikel ≥ 0.5 µm / m³ | Typischer Einsatz         |
|------------|------------------------|---------------------------|
| ISO 5 (M3.5) | ≤ 3.520              | Kritischer OP, Aseptik    |
| ISO 6      | ≤ 35.200               | Pharma-Sterilabfüllung    |
| ISO 7      | ≤ 352.000              | Klasse C Pharma           |
| ISO 8      | ≤ 3.520.000            | Klasse D Pharma, Technikum|

**Luftwechsel OP-Saal (DIN 1946-4):** ≥ 1200 m³/h, LAF-Decke (Laminar Air Flow) 0,24–0,45 m/s.

---

## OP-Saal Druckhaltung

```
OP-Saal Lüftung nach DIN 1946-4:
  Überdruck: +15 Pa zum Korridor
  LAF-Decke (UDF = Unidirectional Air Flow): senkrecht nach unten
  Zuluft-Temperatur: 16–26 °C regelbar
  Zuluft-Feuchte: 30–60 % rF
  Luftwechsel: typ. 20–25 fach pro Stunde
  
GA-Freigabe:
  OP-Leuchte EIN → Lüftung auf 100 % Volumenstrom
  OP-Pause → Absenkbetrieb (50 %) mit Druckerhalt
  OP-Reinigung → Spülbetrieb 100 %, danach Freigabe
```

---

## GA-Datenpunkte Zonendruckhaltung

| Datenpunkt                 | Typ | Einheit | Beschreibung                    |
|----------------------------|-----|---------|---------------------------------|
| Druckdifferenz Raum        | AI  | Pa      | Raum vs. Referenz               |
| Druckdifferenz Sollwert    | AV  | Pa      | Vorgabe ±                       |
| Zuluft-Volumenstrom Ist    | AI  | m³/h    | Pitot-Messung                   |
| Abluft-Volumenstrom Ist    | AI  | m³/h    | Pitot-Messung                   |
| Zuluft-VAV Stellsignal     | AO  | %       | 0–100 %                         |
| Abluft-VAV Stellsignal     | AO  | %       | 0–100 %                         |
| Druckdifferenz Alarm        | DI  | —       | Grenzwert über-/unterschritten  |
| Betriebsart (Normal/OP/Reinigung) | AV | — | Betriebsmodus                 |

---

## Herausforderungen und Praxishinweise

| Problem                         | Ursache                          | Lösung                         |
|---------------------------------|----------------------------------|--------------------------------|
| Druckpendeln                    | PID zu aggressiv, Totzeit        | Ti erhöhen, Kaskade entkoppeln |
| Druckverlust bei Türöffnung     | VAV zu träge                     | Schnellregelung, Feed-Forward  |
| Undichte Bauhülle               | Fugen, Kabeleinführungen         | Luftdichtigkeitstest vor IBN   |
| Druckkoppelung zwischen Räumen  | Gemeinsame Abluft-/Zuluftleitung | Getrennte Kreise, VAV je Raum  |
| Filterdruckabfall → weniger ΔV  | Verschmutzter Filter             | Filteralarm, Delta-P-Wächter   |

---

## Normen

- **EN ISO 14644-1** — Reinräume: Klassifikation der Luftreinheit
- **EN ISO 14644-4** — Reinräume: Planung, Bau, Inbetriebnahme
- **EU GMP Annex 1** — Herstellung steriler Arzneimittel (Reinraumklassen A–D)
- **DIN 1946-4** — Raumlufttechnik in Gebäuden des Gesundheitswesens
- **VDI 2167** — Gebäudetechnik in Krankenhäusern
