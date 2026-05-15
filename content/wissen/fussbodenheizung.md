---
title: Fussbodenheizung — Aufbau, Regelung und Trägheit
slug: fussbodenheizung
category: heizung
subcategory: heizsysteme
tags: [fussbodenheizung, fbh, flächenheizung, trägheit, vorlauftemperatur, niedrigtemperatur, regelkreis, verteiler, estrich, hydraulischer-abgleich, wärmepumpe, raumfühler, auskühlzeit]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulische-schaltungen, hydraulischer-abgleich, waermepumpe, pid-regler, pufferspeicher]
norm: [EN 1264, EN 15377, SIA 384.201]
updated: 2026-05-14
lang: de
---

# Fussbodenheizung — Aufbau, Regelung und Trägheit

Die Fussbodenheizung ist ein Flächenheizsystem — die gesamte Bodenfläche ist der Heizkörper. Sie bietet hohen Komfort bei niedrigen Vorlauftemperaturen, hat aber besondere Regelungsanforderungen durch ihre grosse thermische Trägheit.

## Aufbau

```
Raumnutzfläche (Fliesen, Parkett, Vinylboden)
    ↑
Estrich (5–8 cm) ← Thermische Masse (Wärmespeicher)
    ↑
Heizrohr (PE-X oder PEX-AL-PEX, Ø16–20 mm, Abstand 10–25 cm)
    ↑
Trittschalldämmung / Wärmedämmung
    ↑
Tragkonstruktion
```

### Systemvarianten

| Variante          | Aufbauhöhe | Trägheit | Einsatz                   |
|-------------------|------------|----------|---------------------------|
| Nassestrich        | 65–100 mm  | Hoch     | Neubau Standard           |
| Trockenestrich     | 30–50 mm   | Mittel   | Renovation, leichte Konstruktion |
| Dünnschicht        | < 30 mm    | Niedrig  | Renovation mit wenig Aufbauhöhe |

---

## Vorlauftemperatur — Niedrigtemperatur-System

Die FBH benötigt deutlich **niedrigere Vorlauftemperaturen** als Heizkörper:

| System               | Vorlauftemperatur | Spreizung |
|----------------------|-------------------|-----------|
| Radiatoren (alt)     | 70–90 °C          | 20 K      |
| Radiatoren (modern)  | 55–70 °C          | 15 K      |
| Fussbodenheizung     | **30–45 °C**      | 5–10 K    |

**Warum niedrig?** Fussbodentemperatur darf 29 °C (Wohnbereich) bzw. 33 °C (Randzonen) nicht überschreiten (Komfort + Hygiene).

**Ideal für Wärmepumpen:** Je niedriger die Vorlauftemperatur, desto höher der COP der Wärmepumpe. FBH + WP = optimale Kombination.

---

## Thermische Trägheit — das zentrale Problem

Der Estrich hat eine hohe thermische Masse (spezifische Wärmekapazität Beton ≈ 2.0 kJ/(kg·K)):

```
Estrich Masse: ~100–150 kg/m² (bei 6 cm Dicke)
Wärmeinhalt:   bei ΔT = 10 K → 200–300 kJ/m²
Aufheizzeit:   1–3 Stunden bis Vollleistung (nach Kaltstart)
Abkühlzeit:    4–8 Stunden nach Abschalten
```

### Konsequenzen für die Regelung

1. **Langsame Reaktion:** Raumtemperatur reagiert erst nach Stunden auf Ventilveränderungen
2. **Überschwingen:** Wenn Regler zu aggressiv → schwingt mit grosser Amplitude
3. **Aufheizoptimierung:** Vorheizen nötig (1–3 Stunden vor Belegung)
4. **Nachtabsenkung:** Wenig sinnvoll — Estrich gibt Wärme noch Stunden ab

---

## Regelung der Fussbodenheizung

### Raumtemperatur-Regelung (Standard)

```
Raumfühler → Raumregler → Stellantrieb (Thermoventil am Verteiler)
```

Problem: Rückkopplung durch Estrich-Trägheit → sehr langsamer Regelkreis.

**Empfehlung:** P-Regler oder PI-Regler mit **sehr langer Nachstellzeit** (Ti = 60–120 min) → sanfte Nachregelung.

### Witterungsgeführter Vorlauf (bevorzugt)

```
Aussentemperatur → Heizkurve → Vorlauf-Soll (30–45 °C)
    ↓
[Mischventil-Regler] → Mischventil
    ↑ Vorlauf-Ist
```

Die Heizkurve liefert kontinuierlich passende Vorlauftemperatur → Estrich wird gleichmässig temperiert → kaum Schwankungen.

### Kombination (optimal)

```
Heizkurve → Vorlauf-Basis-Soll
    +
Raumtemperatur → Korrektur ±3 K auf Vorlauf-Soll
    =
Vorlauf-Soll (kombiniert) → Mischventil
```

---

## Verteiler und Kreise

### Heizkreis-Verteiler

Jede FBH-Zone hat einen **Verteiler** mit individuellen Stellantrieben:

```
Vorlauf → [Verteiler] ─┬─ Kreis 1 (Wohnzimmer)
                        ├─ Kreis 2 (Küche)
                        ├─ Kreis 3 (Schlafzimmer)
                        └─ Kreis 4 (Bad)
                            ↓ alle zurück zum Verteiler-Rücklauf
```

Jeder Kreis hat:
- Einstellventil (hydraulischer Abgleich)
- Thermostatischer oder motorischer Stellantrieb (EIN/AUS oder stetig)
- Rücklauftemperatur-Anzeige (optional)

### Hydraulischer Abgleich FBH

Entscheidend! FBH-Kreise sind unterschiedlich lang → ohne Abgleich bekommen kurze Kreise zu viel Durchfluss:

```
Kreislänge 50 m → Δp gering → Ventil wenig öffnen
Kreislänge 120 m → Δp hoch → Ventil weiter öffnen
```

Voreinstellventile am Verteiler setzen den Durchfluss aller Kreise auf den gleichen Wert.

---

## Estrich-Aufheizprotokoll

Frischer Estrich muss **vor dem ersten Betrieb** konditioniert werden:

```
Tag 1: Vorlauf 25 °C (3 Tage halten)
Steigerung: täglich +5 K
Tag 5: Vorlauf 45 °C (4 Tage halten)
Abkühlung: täglich −5 K
Dokumentation: Temperaturen täglich aufzeichnen
```

**Warum:** Feuchtigkeitsabgabe des Estrichs (Trocknungsschwindung). Zu schnelles Aufheizen → Rissbildung.

---

## Typische Fehler

| Fehler                          | Symptom                         | Lösung                          |
|---------------------------------|---------------------------------|---------------------------------|
| Vorlauf zu hoch (> 50 °C)       | Boden zu warm, Schäden         | Heizkurve anpassen              |
| Kein Aufheizprotokoll           | Estrichrisse                    | Protokoll nachholen (wenn möglich)|
| Kein hydr. Abgleich             | Ungleichmässige Erwärmung       | Voreinstellventile einstellen   |
| Regler zu aggressiv             | Raumtemperatur schwingt (±3 K)  | Nachstellzeit vergrössern        |
| Nachtabsenkung zu tief          | Aufheizung morgens nicht fertig | Absenkniveau erhöhen oder weg   |

## Normen

- **EN 1264** — Raumflächenintegrierte Heiz- und Kühlsysteme
- **EN 15377** — Heizungsanlagen in Gebäuden
- **SIA 384.201** (CH) — Heizungsanlagen in Gebäuden
