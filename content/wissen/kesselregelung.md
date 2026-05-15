---
title: Kesselregelung — Modulierend, gleitend, zweistufig
slug: kesselregelung
category: heizung
subcategory: kessel
tags: [kesselregelung, modulierend, zweistufig, gleitend, brenner, therme, rücklauftemperatur, taupunkt, kondensation, heizwert, brennwert, kesselkreis, mischer, vorlauftemperatur, abgasverlust]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizkurve, heizung-grundlagen, pufferspeicher, hydraulische-schaltungen, kaskadenregelung]
norm: [EN 303, EN 12953, BImSchV, ÖNORM H 5170, SIA 384.201]
updated: 2026-05-15
lang: de
---

# Kesselregelung — Modulierend, gleitend, zweistufig

Die Kesselregelung bestimmt Vorlauftemperatur und Brennerleistung. Modernes Ziel: maximale Effizienz durch niedrige Kesseltemperatur und Kondensationsbetrieb.

## Brenner-Typen und Regelungsarten

### Einstufiger Brenner

```
Brenner: EIN oder AUS
  Takt: z.B. 10 min EIN / 5 min AUS

Nachteil:
  Hohe Taktzahl → Verschleiss
  Stets volle Leistung → Übertemperatur → Abtaktverluste
```

### Zweistufiger Brenner

```
Stufe 1 (Grundlast): 60 % Leistung
Stufe 2 (Volllast): 100 % Leistung

Regelung:
  Kesseltemperatur < Soll − 5 K: Stufe 1 einschalten
  Kesseltemperatur < Soll − 10 K: Stufe 2 einschalten
  Kesseltemperatur > Soll: AUS
```

### Modulierender Brenner (Modulating)

```
Leistungsbereich: 20–100 % (Modulationsbereich 1:5)
  
Regelung:
  Kesseltemperatur − Sollwert = Δ
  PID → Leistungssignal 20–100 %
  
Vorteil:
  Kein Takten, konstante Temperatur
  Besserer Wirkungsgrad im Teillastbetrieb
  Kondensationsbetrieb möglich (Abgastemperatur < 57 °C)
```

---

## Gleitende Kesselregelung (Witterungsgeführt)

Der Kessel-Sollwert wird aus der Aussentemperatur berechnet:

```
T_Kessel_Soll = f(T_Aussen)

Beispiel:
  T_Aussen = 0 °C   → T_Kessel = 70 °C
  T_Aussen = 10 °C  → T_Kessel = 55 °C
  T_Aussen = 20 °C  → T_Kessel = 40 °C (Grenztemperatur → Abschalten)
  
Vorteil: Kessel läuft immer auf minimaler nötiger Temperatur
→ Längere Brennerdauer pro Takt (weniger Taktverluste)
→ Bei Brennwertkesseln: mehr Kondensationsbetrieb
```

---

## Brennwert vs. Heizwert

```
Heizwert Hi: Energie ohne Kondensationswärme des Abgases
Brennwert Hs: Energie + Kondensationswärme (ca. +11 % bei Erdgas)

Kondensation tritt auf wenn:
  T_Abgas < Taupunkt Abgas ≈ 57 °C (bei Erdgas)
  
→ Brennwertkessel: Abgastemperatur absichtlich < 57 °C
→ Wirkungsgrad bezogen auf Hi: 95–109 %
→ Nur möglich mit tiefen Rücklauftemperaturen (< 50 °C)
```

**Rücklauftemperatur-Einfluss:**

| RL-Temperatur | Kondensation   | Wirkungsgrad |
|---------------|----------------|--------------|
| 30 °C         | Stark          | 107–109 %    |
| 45 °C         | Teilweise      | 103–105 %    |
| 55 °C         | Grenzbereich   | 100 %        |
| 70 °C         | Keine          | 93–95 %      |

---

## Kesselmindesttemperatur und Taupunktschutz

**Problem:** Bei zu tiefer Kesseltemperatur: Korrosion durch Säurekondensation (Heizwertkessel, Ölkessel).

```
Taupunktschutz:
  Heizwertkessel Öl: T_Kessel_min = 60–65 °C
  Heizwertkessel Gas: T_Kessel_min = 55 °C
  Brennwertkessel:    keine Mindesttemperatur (säurefest)
  
GA-Umsetzung:
  Wenn T_Kessel < T_min → Rücklaufbeimischung sperren
  → Kessel-Rücklauf = Kesselbeipass (Hochtemperaturrücklauf)
```

---

## Kaskadenregelung mehrerer Kessel

Grosse Anlagen mit mehreren Kesseln:

```
Wärmebedarf 500 kW, 3 Kessel à 200 kW:

  Leistung < 200 kW: Kessel 1 modulierend
  Leistung > 180 kW: Kessel 2 zuschalten
  Leistung > 380 kW: Kessel 3 zuschalten
  
Führungswechsel:
  Stunden-Zähler → Führungskessel wechselt täglich
  → gleichmässiger Verschleiss, Redundanz
  
Sperrsignal:
  Kessel 1 Störung → automatisch Kessel 2 übernimmt
```

---

## GA-Datenpunkte Kesselanlage

| Datenpunkt                 | Typ | Einheit | Beschreibung                  |
|----------------------------|-----|---------|-------------------------------|
| Kesseltemperatur VL Ist    | AI  | °C      | Vorlauf Kessel                |
| Kesseltemperatur RL Ist    | AI  | °C      | Rücklauf (Taupunktschutz)     |
| Kessel-Sollwert            | AV  | °C      | Vorgabe gleitend              |
| Brenner Freigabe           | DO  | —       | Freigabe EIN/AUS              |
| Brenner Leistungssignal    | AO  | %       | 0–10 V modulierend            |
| Brenner Betrieb            | DI  | —       | Laufmeldung                   |
| Brenner Störung            | DI  | —       | Übertemperatur, Abschaltung   |
| Gasventil Störung          | DI  | —       | Gasversorgung                 |
| Abgastemperatur            | AI  | °C      | Effizienz-Monitoring          |
| Wärmemenge Kessel          | AI  | kWh     | Zähler                        |

---

## Abgasverlust-Monitoring

```
Abgasverlust nach Siegert (näherungsweise):

  q_A = (q_CO2_max / q_CO2 − 1) × (t_A − t_L) × A2
  
  Vereinfacht: je 1 K Abgastemperatur > Optimum → ~0.3 % mehr Verlust
  
  Optimale Abgastemperatur Erdgas: 80–120 °C (Heizwert) / < 57 °C (Brennwert)
```

---

## Normen

- **EN 303** — Heizkessel (Gas- und Ölbrenner)
- **BImSchV (DE)** — Emissionsgrenzwerte, Abgasmessungen
- **SIA 384.201** — Heizungsanlagen (Auslegung, Kessel)
- **ÖNORM H 5170** — Kesselanlagen, Betrieb, Wartung
