---
title: Sollwertführung und gleitender Sollwert
slug: sollwertfuehrung
category: regelung
subcategory: regelstrategien
tags: [sollwertführung, gleitender-sollwert, witterungsgeführt, tagesprogramm, nachtabsenkung, optimaler-start, optimales-aufheizen, festwert, kennlinienführung, aussentemperatur-führung, sparschaltung, komfortschaltung]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, heizkurve, kaskadenregelung, vorsteuerung-aufschaltung, regelkreise]
rechner: [heizkurve]
norm: [EN 15232, VDI 3814, SIA 386.110]
updated: 2026-05-15
lang: de
---

# Sollwertführung und gleitender Sollwert

Bei einfachen Regelkreisen ist der Sollwert eine feste Grösse (z.B. Raumtemperatur 21°C). In der GA wird der Sollwert häufig **dynamisch geführt**: er ändert sich abhängig von der Aussentemperatur, der Tageszeit, der Belegung oder anderen Einflüssen. Diese Strategie heisst **Sollwertführung**.

---

## Arten der Sollwertführung

### 1. Festwertregelung
Der Sollwert ist fix vorgegeben und ändert sich nicht:
```
w = konstant (z.B. TV_soll = 60°C)
```
Einfachste Form, unflexibel. Wird in GA nur noch für unkritische Hilfsstrecken verwendet.

### 2. Witterungsgeführte Regelung (Gleitender Sollwert)
Der Sollwert wird **in Abhängigkeit der Aussentemperatur** kontinuierlich angepasst:
```
TV_soll = f(TA)   [Heizkurve]
```
Je kälter es aussen ist, desto höher der Vorlauftemperatur-Sollwert. → **Heizkurven-Rechner**

**Vorteile gegenüber Festwert:**
- Geringere Vorlauftemperaturen bei mildem Wetter → besserer Wärmepumpen-COP
- Gleichmässigere Raumtemperatur, weniger Überhitzung

### 3. Zeitprogramm (Absenkung, Schaltzeiten)
Der Sollwert wechselt nach Uhrzeit / Wochentag:
```
Mo–Fr 06:00–22:00 → Komfort: 21°C
Mo–Fr 22:00–06:00 → Nachtabsenkung: 16°C
Sa–So ganztags    → 19°C
```

### 4. Kombiniert: Witterung + Zeit
Häufigste GA-Praxis: Heizkurve als Grundlage, Nachtabsenkung als additiver Eingriff:
```
TV_soll(t) = Heizkurve(TA) + Δ_Zeitprogramm(t)

Nacht: Δ = −8 K auf Vorlauf → entspricht ca. −2 K Raumtemperatur
```

---

## Nachtabsenkung vs. Nachtabschaltung

| Strategie | Beschreibung | Wann sinnvoll |
|-----------|-------------|--------------|
| Nachtabsenkung | Sollwert reduziert, Heizung läuft mit reduzierter Leistung | Gut gedämmte Gebäude, schnelle Strecken |
| Nachtabschaltung | Heizung komplett aus | Schlecht gedämmte Gebäude mit langer Aufheizzeit |
| Frostschutz | Mindestregelung bei 8°C | Leerstand, Ferien |

**Faustregel:** Bei Gebäuden mit einer Aufheizzeit > 2–3 Stunden lohnt Nachtabschaltung nicht, weil morgens mehr Energie für das schnelle Aufheizen verbraucht wird als durch die Nacht gespart wurde.

---

## Optimaler Aufheizbeginn (Optimum Start)

Die DDC berechnet die **frühestmögliche Aufheizzeit**, damit der Raum pünktlich zur Nutzungszeit die Komforttemperatur erreicht:

```
t_Start = t_Nutzungsbeginn − Aufheizzeit

Aufheizzeit = f(ΔT_Raum, Gebäudezeitkonstante, Aussentemperatur)
```

**Adaptiver Algorithmus:** Die DDC lernt über mehrere Tage die tatsächliche Aufheizzeit des Gebäudes und passt t_Start automatisch an. Typische DDC-Parameter: "Aufheizgradient", "Lernfaktor".

---

## Kennlinienführung (allgemein)

Nicht nur Heizung: Viele GA-Regelkreise nutzen Sollwertkennlinien:

| Anwendung | Führungsgrösse | Geführter Sollwert |
|-----------|---------------|-------------------|
| Heizkurve | Aussentemperatur | Vorlauftemperatur |
| Kühlkurve | Aussentemperatur | Kaltwasservorlauf |
| Zuluft-Reset | Raumtemperatur | Zuluft-Sollwert |
| Druckreset Lüftung | VAV-Klappenstellung | Kanaldruck-Sollwert |

### Zuluft-Reset (Lüftung)
Wenn alle Räume gut versorgt sind (alle VAV-Klappen < 80% offen), kann der Kanaldruck gesenkt werden → Ventilatoreinsparung:
```
VAV_max_offen < 80% → Druck_soll um 5 Pa senken
VAV_max_offen > 95% → Druck_soll um 5 Pa erhöhen
```

---

## Sollwertgrenzwerte

Geführte Sollwerte müssen immer durch **Min/Max-Grenzen** begrenzt werden:

| Anwendung | Min | Max |
|-----------|-----|-----|
| Vorlauftemperatur Heizung | 25°C (Frostschutz) | 85°C (Kesselschutz) |
| Vorlauftemperatur Kühlung | 6°C (Vereisungsschutz) | 16°C |
| Raumsollwert | 16°C (Nacht/Frost) | 26°C (Überhitzungsschutz) |
| Zulufttemperatur | 14°C (Kälteschutz) | 28°C |

---

## Normative Anforderungen

- **EN 15232 Klasse A:** Vollständige Zeitprogramme, witterungsgeführte Regelung, optimaler Start/Stopp und selbstlernende Algorithmen
- **EN 15232 Klasse B:** Zeitprogramme + witterungsgeführte Regelung
- **SIA 386.110 §5.3:** Sollwertführung für Heizung und Kühlung gefordert
