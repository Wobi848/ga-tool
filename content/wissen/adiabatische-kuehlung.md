---
title: Adiabatische Kühlung — Prinzip und Einsatzgrenzen
slug: adiabatische-kuehlung
category: klima
subcategory: freie-kuehlung
tags: [adiabatische-kühlung, verdunstungskühlung, evaporative-cooling, zuluft-kühlung, wärmetauscher-vorkühlung, kühlgrenztemperatur, feuchtkugeltemperatur, ews, kühlenergie, recooler, rückkühler, verdunstung]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, nachtauskuehlung, rlt-anlage, befeuchter, cop-eer, free-cooling]
norm: [EN 13053, VDI 3803, SIA 382.1]
updated: 2026-05-15
lang: de
---

# Adiabatische Kühlung — Prinzip und Einsatzgrenzen

Adiabatische Kühlung nutzt die **Verdunstungsenergie von Wasser** zur Luftkühlung — ohne Kältemaschine. Sie ist energieeffizient, aber nur bei trockener Aussenluft wirksam.

## Physikalisches Grundprinzip

```
Wasser verdunstet → entzieht der Luft Energie (Verdampfungswärme)
→ Luft kühlt sich ab, Feuchtegehalt steigt

Verdampfungswärme Wasser: ca. 2500 kJ/kg (bei 20 °C)

Beispiel:
  Zustand A: 32 °C, 20 % rF, h = 50 kJ/kg
  Wasser verdunstet adiabat (kein Wärmetausch mit Umgebung)
  Zustand B: 22 °C, 60 % rF, h = 50 kJ/kg (Enthalpie gleich!)
  
  → 10 K Abkühlung, aber 40 % mehr Feuchte
```

**Kühlgrenztemperatur (Feuchtkugeltemperatur Tw):** Die minimale erreichbare Temperatur:
```
Tw = T − (T − Td) × (1 − rF/100)
Grob: Tw ≈ T × (0.62 × rF/100)^0.52   [Magnus-Näherung]
```

---

## Typen der adiabatischen Kühlung

### 1. Direktkühlung (Direkte Evaporativkühlung)

Wasser wird direkt in die Zuluft verdunstet:

```
Zuluft 32 °C, 20 % rF
    → Wassersprühdüsen oder Befeuchterpads
    → Zuluft 22 °C, 60 % rF
```

- Einfach, günstig
- Luft wird feuchter → nur für trockene Klimazonen oder RLT mit Nachkühlung
- Hygiene-Problematik (wie Befeuchter → VDI 6022)

### 2. Indirekte Evaporativkühlung

Adiabatische Kühlung auf der **Abluft-Seite** eines Wärmetauschers:

```
Abluft (25 °C, 55 % rF)
    → adiabatisch befeuchtet → 18 °C, 100 % rF
    → kühlt Zuluft über Plattenwärmetauscher ohne direkte Befeuchtung
    
Zuluft bleibt trocken → keine Feuchteerhöhung auf Zuluftseite
```

- Besser für Anwendungen wo trockene Zuluft gewünscht
- Wirkungsgrad 40–70 %

### 3. Rückkühler-Vorkühlung (Recooler)

Adiabatische Kühlung des Rückkühlwassers für Kältemaschine:

```
Rückkühlwasser 30 °C (Kondensatorseite)
    → Sprühnebelkühlung am Rückkühler
    → Rückkühlwasser 24 °C
    → COP der Kältemaschine steigt deutlich
    
Einsatz: Spitzenlasttage wenn Luft trocken und heiss
```

---

## Effizienzvergleich

| Methode                    | COP / Einsparpotenzial    | Einschränkung                     |
|----------------------------|---------------------------|-----------------------------------|
| Kältemaschine              | COP 2.5–4.5               | Referenz, immer möglich           |
| Direkte Evaporativkühlung  | COP 20–50                 | Nur trocken < 40 % rF             |
| Indirekte Evaporativkühlung| COP 10–30                 | Trocken < 50 % rF                 |
| Rückkühler-Vorkühlung      | +20–40 % Kältemaschine COP| Spitzenlasttage, trocken          |
| Nachtauskühlung            | COP > 100 (Lüfterenergie)  | Nur nachts, Speichermasse nötig   |

---

## Einsatzgrenzen

```
Kühlgrenztemperatur-Analyse für Standort Zürich:
  Sommerdesigntag: 32 °C, 35 % rF → Tw = 21.5 °C
  
  Direkte Kühlung erreichbar bis: ~22 °C Zuluft
  Für Bürokühlung (Zuluft 16–18 °C) → nicht ausreichend
  
  → Adiabatische Kühlung als Teilkühlung, Restlast = Kältemaschine
  → Oder: Vorkühlung reduziert Kälteleistungsbedarf um 30–50 %
```

**Kritische Klimazonen:**

| Klima          | Adiabatische Kühlung  | Begründung               |
|----------------|----------------------|--------------------------|
| Trocken/heiss  | Sehr geeignet        | Grosses Δ(T - Tw)        |
| Mitteleuropas  | Bedingt geeignet     | Im Sommer 40–60 % rF     |
| Feucht/tropisch| Nicht geeignet       | Tw ≈ T, keine Kühlung    |

---

## Hygiene und Betrieb

Adiabatische Kühlung mit Wassereinbringung birgt **Hygiene-Risiken (Legionellen)**:

```
Schutzmassnahmen:
  1. Betriebswasser: Trinkwasserqualität oder Umkehrosmose
  2. Temperatur: Wassertemperatur nicht > 20 °C im Lager
  3. Stagnation: Tägliche Spülung, keine stehenden Wassertaschen
  4. Desinfektion: UV-Anlage oder periodische Dosierung
  5. Regelmässige Probenentnahme (Legionellen < 100 KBE/100 ml)
```

---

## GA-Integration

```
Freigabebedingungen adiabatische Kühlung:
  T_Aussen > 27 °C
  UND rF_Aussen < 50 %
  UND Kältemaschine läuft / Kälteleistungsbedarf aktiv
  
Abschalten wenn:
  T_Aussen < 25 °C (unnötig)
  ODER rF_Aussen > 65 % (unwirksam und Hygienerisiko)
  ODER Frost (Verstopfungsgefahr)
```

**GA-Datenpunkte:**

| Datenpunkt              | Typ | Einheit | Beschreibung              |
|-------------------------|-----|---------|---------------------------|
| Adiabatik Freigabe      | DO  | —       | Pumpe / Sprühanlage EIN   |
| Wassertemperatur Vorrat | AI  | °C      | Hygiene-Monitoring        |
| Wasserverbrauch         | AI  | l/h     | Monitoring                |
| T_Aussen               | AI  | °C      | Freigabebedingung         |
| rF_Aussen              | AI  | %       | Freigabebedingung         |

---

## Normen

- **EN 13053** — Zentrale RLT-Anlagen (Befeuchtung / indirekte Evaporativkühlung)
- **VDI 3803** — Raumlufttechnik, Energieverbrauch, adiabatische Kühlung
- **SIA 382.1** — Lüftungs- und Klimaanlagen (freie Kühlungsstrategien)
