---
title: Wärmerückgewinnung (WRG) in Lüftungsanlagen
slug: waermerueckgewinnung
category: lueftung
subcategory: energie
tags: [wrg, wärmerückgewinnung, rotationstauscher, plattentauscher, kreislaufverbund, wärmerohr, wirkungsgrad, temperaturänderungsgrad, frost, bypass, gegenstrom, gleichstrom, kreuzstrom, rlt, hygiene]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vdi6022, frequenzumrichter, kaelteanlagen]
norm: [EN 13053, EN 308, SIA 382.1]
updated: 2026-05-14
lang: de
---

# Wärmerückgewinnung (WRG) in Lüftungsanlagen

Die **Wärmerückgewinnung** ist eine der wirkungsvollsten Energiesparmassnahmen in Lüftungsanlagen. Bis zu 85 % der Energie aus der Abluft kann zurückgewonnen werden — damit reduziert sich der Heizenergiebedarf der Lüftung dramatisch.

## Grundprinzip

```
Aussenluft (ODA) −10 °C  →  [WRG]  →  +15 °C Zuluft (Vorwärmung)
Abluft (ETA)     +22 °C  →  [WRG]  →  Fortluft (EHA) kühler
```

Die Abluft gibt ihre Wärme an die Aussenluft ab — ohne dass die Luftströme sich vermischen (ausser Rotationstauscher mit minimalem Übertrag).

## Leistungskennzahl: Temperaturänderungsgrad

```
ηT = (T_Zuluft_nach_WRG − T_Aussenluft) / (T_Abluft − T_Aussenluft) × 100 %
```

**Beispiel:** T_Außen = −5 °C, T_Abluft = 22 °C, T_Zuluft nach WRG = 18 °C
```
ηT = (18 − (−5)) / (22 − (−5)) × 100 % = 23 / 27 × 100 % = **85 %**
```

---

## Typen und Vergleich

### 1. Rotationstauscher (Drehrad)

```
        ↑ Abluft (ETA)
    ┌───┤                ├───┐
    │   │   Rotor dreht  │   │
    └───┤                ├───┘
        ↓ Aussenluft (ODA)
    → Abluft gibt Wärme an Rotor ab, Rotor dreht in Aussenluft → übergibt Wärme
```

**Eigenschaften:**
- Wirkungsgrad: **70–85 %**
- Feuchtewärme möglich (hygroskopisches Adsorbens)
- **Nachteil:** Geringe Überströmung (1–3 %) — Hygieneanforderung prüfen! (VDI 6022 Klasse A kritisch)
- Frostschutz: Drehzahl reduzieren oder Umluft-Bypass

### 2. Platten-Wärmetauscher (Kreuzgegenstrom)

```
    Abluft →→→→→→→→→→
                    ↕ (kein Kontakt, nur Wärmeleitung durch Blechwände)
    ← Zuluft ←←←←←←←
```

**Eigenschaften:**
- Wirkungsgrad: **55–75 %** (Kreuzstrom), bis 85 % (Gegenstrom)
- **Keine Überströmung** → hygienisch einwandfrei
- Kondensatbildung bei tiefen Temperaturen (→ Kondensatwanne + Ablauf vorsehen)
- **Frostschutz wichtig:** Kondensat gefriert → Vereisung → Leistungsverlust → Bypass aktivieren
- Einfach, wartungsarm, weit verbreitet

### 3. Kreislaufverbund (Wasser-Kreislauf)

```
Abluft → [Kühler A] → Fortluft
              ↑ Wasser-Kreislauf (Pumpe)
Aussenluft → [Erhitzer B] → Zuluft
```

**Eigenschaften:**
- Wirkungsgrad: **45–65 %** (geringer wegen 2 Wärmetauschern)
- **Kein Luftkontakt** möglich: ideal wenn Zuluft und Abluft weit getrennt sind
- Einsatz: Trennung von Gebäudeteilen, Renovierungen
- Frostschutz: Frostschutzmittel im Wasser (Glykol-Wasser-Gemisch)

### 4. Wärmerohr (Heat Pipe)

- Wärmerohr mit Kältemittel füllt sich auf warmer Seite (Abluft) und kondensiert auf kalter Seite (Aussenluft)
- Wirkungsgrad: **50–65 %**
- Keine beweglichen Teile — sehr wartungsarm
- Nur sensible Wärme (keine Feuchteübertragung)

---

## Vergleich auf einen Blick

| Typ               | Wirkungsgrad | Feuchteübertragung | Überströmung | Einsatz                     |
|-------------------|--------------|--------------------|--------------|-----------------------------|
| Rotor             | 70–85 %      | Ja (optional)      | Minimal      | Standardfall, Komfort        |
| Platte Kreuzstrom | 55–75 %      | Nein               | Keine        | Hygiene-sensitiv             |
| Platte Gegenstrom | 75–85 %      | Nein               | Keine        | Hoher Wirkungsgrad gewünscht |
| Kreislaufverbund  | 45–65 %      | Nein               | Keine        | Getrennte Gebäudeteile       |
| Wärmerohr         | 50–65 %      | Nein               | Keine        | Wartungsarme Lösung          |

---

## Frostschutzstrategien

| Strategie              | Typ             | Beschreibung                              |
|------------------------|-----------------|-------------------------------------------|
| **Bypass-Klappe**      | Alle            | ODA am WRG vorbeiführen → kein Einfrieren |
| **Vorwärmung ODA**     | Alle            | Elektrischer oder WW-Erhitzer vor WRG    |
| **Rotorverlangsamung** | Rotor           | Weniger Wärmeübertrag → weniger Kondensat |
| **Abluft-Bypass**      | Platte          | Warme Abluft erwärmt WRG periodisch       |
| **Glykol-Wasser**      | Kreislaufverbund| Tiefere Einfrierpunkt-Temperatur          |

**Frostschutz-Grenzwert:** Sobald Abluft-Taupunkt unterschritten → Kondensat gefriert. Typisch: WRG-Bypass aktivieren ab ODA < −8 °C bis −15 °C (je nach System).

---

## WRG im Sommerbetrieb

Im Sommer dreht die WRG die Funktion um: Heisse Aussenluft wird durch die kühlere Abluft vorgekühlt:

```
Aussenluft 32 °C → [WRG] → 24 °C Zuluft (vorgekühlt)
Abluft 25 °C → Fortluft 33 °C
```

Wenn die Aussenluft kühler als die Abluft ist (z.B. kühle Nacht, freie Kühlung) → WRG optimal nutzen. Bypass aktivieren wenn ODA kühler als Raumtemperatur → direkte freie Kühlung.

---

## GA-Datenpunkte WRG

| Datenpunkt                  | Typ  | Beschreibung                        |
|-----------------------------|------|-------------------------------------|
| ODA-Temperatur              | AI   | Vor WRG                             |
| Zuluft nach WRG             | AI   | WRG-Wirkungsgrad berechnen          |
| ETA-Temperatur              | AI   | Abluft-Eingang WRG                  |
| EHA-Temperatur              | AI   | Fortluft-Ausgang                    |
| WRG-Bypass-Klappe           | AO   | 0–100 %, Frostschutz                |
| Rotor-Drehzahl              | AO   | 0–10 V (bei Rotor)                  |
| Frostschutz-Alarm           | DI   | Bei Eisbildung                      |
| Temperaturänderungsgrad      | AV   | Berechnet: (T_Zuluft − T_ODA) / (T_ETA − T_ODA) |

## Normen

- **EN 13053** — Lüftung von Gebäuden, Zentrale Lüftungsgeräte
- **EN 308** — Wärmeaustauscher, Prüfverfahren für Leistungsnachweis
- **SIA 382.1** — Lüftungs- und Klimaanlagen
- **VDI 6022** — Hygieneanforderungen (Rotationstauscher Klasse A: restriktiv)
