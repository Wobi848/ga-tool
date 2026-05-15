---
title: Fernwärme — Übergabestation und GA-Anbindung
slug: fernwaerme
category: heizung
subcategory: erzeuger
tags: [fernwärme, übergabestation, primärkreis, sekundärkreis, wärmetauscher, übergabepunkt, heizkurve, differenzdruck, volumenstrom, wärmemengenzähler, fernwärme-anschluss, substationsregelung, leistungssteuerung]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizung-grundlagen, waermemengenzaehler, hydraulische-schaltungen, pid-regler, heizkurve]
norm: [EN 14336, AGFW FW 401, SIA 384.201]
updated: 2026-05-14
lang: de
---

# Fernwärme — Übergabestation und GA-Anbindung

Fernwärme liefert Heizwärme und Warmwasser über ein städtisches Netz. An der **Übergabestation** (Hausübergabestation, HÜS) trennen sich Fernwärmenetz und Hausinstallation. Die GA-Aufgabe: die Sekundärseite optimal regeln.

## System-Übersicht

```
Fernwärmenetz (Primärseite)
  Vorlauf 70–130 °C, Rücklauf < 55 °C
        ↓ Übergabestation (HÜS)
  ┌────────────────────────────────┐
  │  Übergabestation               │
  │  ├── Wärmezähler (Primär)     │
  │  ├── Regelventil (Primär)     │
  │  └── Plattentauscher          │
  └────────────────────────────────┘
        ↓ Sekundärseite (Hausinstallation)
  Heizkreise, Warmwasser, Lüftung
```

---

## Übergabestation — Komponenten

### Primärseite (Fernwärmenetz)

| Komponente           | Funktion                                       |
|----------------------|------------------------------------------------|
| Hauptabsperrventil   | Trennt Gebäude vom Netz                        |
| Schmutzfänger        | Schutz der Armaturen                           |
| Primärdurchflussmesser | Abrechnung (geeichter WMZ)                   |
| Regelventil (Primär) | Steuert Wärmeübertrag via Primärvolumenstrom   |
| Rückflussbegrenzer   | Begrenzt RL-Temp (Vertragsanforderung!)        |

### Wärmetauscher

Plattentauscher trennt Primär- von Sekundärnetz:
- Primär und Sekundär sind nicht hydraulisch verbunden (kein Flüssigkeitsaustausch)
- Leistung abhängig von: Primärvolumenstrom, Temperaturdifferenz, WT-Grösse

### Sekundärseite

Ab dem Wärmetauscher ist alles "normale" Hausanlage:
- Heizkreis-Pumpe, Mischventil, Heizkörper/FBH
- Warmwasser-Speicher oder Durchlauferhitzer
- Lüftungsanlage-Lufterhitzer

---

## Rücklauftemperatur-Begrenzung

**Wichtigste Anforderung** des Fernwärmeversorgers: Maximale Primär-Rücklauftemperatur!

Typisch: Primär-RL ≤ 45–55 °C (je nach Vertrag)

**Warum:** Wenn Primär-RL zu warm → Fernwärmeversorger kann keine weitere Wärme abführen → Effizienzverlust im Netz.

### Regelung

```
Primär-Regelventil steuert Primärvolumenstrom:
  → Mehr Primärflow = mehr Wärmeleistung
  → Aber: wenn Primär-RL zu warm → Flow reduzieren
  
Kaskade:
  Sekundär-VL-Regler (Heizkurve) → Primär-Sollflow
                                         ↓
                                   Primär-RL-Begrenzer
                                   (begrenzt wenn RL > Max)
```

---

## GA-Datenpunkte Übergabestation

| Datenpunkt                   | Typ | Einheit | Beschreibung                    |
|------------------------------|-----|---------|---------------------------------|
| Primär VL-Temperatur         | AI  | °C      | Fernwärme-Vorlauf               |
| Primär RL-Temperatur         | AI  | °C      | Fernwärme-Rücklauf (Pflicht!)   |
| Primär Volumenstrom          | AI  | m³/h    | Durchfluss Primär               |
| Primär Wärmemenge            | AI  | kWh     | Zählerstand (M-Bus)             |
| Primär Regelventil           | AO  | %       | 0–10 V Stellsignal              |
| Sekundär VL-Temperatur       | AI  | °C      | Hausanlage Vorlauf              |
| Sekundär RL-Temperatur       | AI  | °C      | Hausanlage Rücklauf             |
| Sekundär Leistung            | AV  | kW      | Berechnete Sekundärleistung     |
| Alarm RL-Temp überschritten  | BI  | —       | Primär-RL > Grenzwert           |
| Alarm Durchfluss 0           | BI  | —       | Keine Wärmezufuhr               |

---

## Heizkurven-Regelung mit Fernwärme

Die Sekundärseite wird exakt wie eine konventionelle Heizung geregelt:

```
Aussentemperatur → Heizkurve → Sek. VL-Sollwert
    ↓ PID-Regler
    ↓ Stellgrösse → Primär-Regelventil öffnen/schliessen
    ↑ Sek. VL-Istwert (Rückmeldung)
```

**Besonderheit:** Es gibt kein "Heizen ein/aus" — das Fernwärmenetz liefert immer Wärme. Nur das Regelventil bestimmt wie viel entnommen wird.

---

## Leistungsregelung und Peaks

Fernwärme-Vertrag enthält oft **Leistungsgrenze** (z.B. max. 200 kW):

```
Aktuelle Leistung überschreitet Grenze:
  → EMS begrenzt Leistungsabruf
  → z.B. Warmwasser-Speicherladung verzögern
  → Lüftungserhitzer temporär reduzieren
```

**Folge:** Leistungs-Peak-Überschreitungen kosten oft extra (Leistungspreis im FW-Tarif).

## Normen

- **EN 14336** — Installation und Abnahme Heizungsanlagen
- **AGFW FW 401** (DE) — Rohrweitenbemessung Fernwärme
- **SIA 384.201** (CH) — Heizungsanlagen in Gebäuden
- **AGFW FW 301** — Allgemeine Bedingungen für die Versorgung mit Fernwärme
