---
title: Pufferspeicher — Funktion, Einbindung und Schichtung
slug: pufferspeicher
category: heizung
subcategory: speicher
tags: [pufferspeicher, hydraulik, schichtung, warmwasser, solar, waermepumpe, heizkreis, temperatursensor, ddc, speicherladung, stratifikation, bypass, entkopplung, mindestvolumenstrom]
difficulty: fortgeschritten
area: [hlk, ga]
related: [waermepumpe, hydraulische-schaltungen, hydraulischer-abgleich, pid-regler, legionellen]
norm: [EN 12977, VDI 2035]
updated: 2026-05-14
lang: de
---

# Pufferspeicher — Funktion, Einbindung und Schichtung

Ein **Pufferspeicher** entkoppelt Wärmeerzeugung und Wärmeverbrauch. Er ist kein einfacher "Wassertank" — Schichtung, Einbindung und Regelung bestimmen ob er seinen Job erledigt oder Probleme macht.

## Warum ein Pufferspeicher?

### Problem 1: Mindestvolumenstrom (Wärmepumpe)

Eine Wärmepumpe braucht einen **Mindestvolumenstrom** durch den Verdampfer/Kondensator. Wenn alle Heizkreis-Thermostatventile schliessen → Durchfluss sinkt → WP schaltet ab (Schutzabschaltung).

Lösung: Puffer zwischen WP und Heizkreis → WP-Seite hat immer genug Durchfluss.

### Problem 2: Taktbetrieb (Wärmepumpe, Kessel)

Ohne Puffer startet Wärmepumpe sehr häufig (kurze Taktzeiten) → Verschleiss, schlechter COP.
Mit Puffer: WP läuft länger, seltener → bessere Effizienz.

### Problem 3: Solare Überschüsse

Solaranlage produziert mehr als gerade benötigt → Puffer speichert → Verbrauch später.

### Problem 4: Spitzenlast-Entkopplung

Wärmeerzeuger ist schwächer als Verbraucher-Spitze → Puffer gleicht aus.

---

## Schichtung (Stratifikation)

Der Pufferspeicher funktioniert wie ein natürlich geschichteter Körper:

```
Oben:   Warm (+60–80 °C) ← Eintritt Erzeuger (Vorlauf)
                              Entnahme Heizkreis (Vorlauf)
─────────────────────────────────────────────────
Mitte:  Mitteltemperatur (~45 °C)
─────────────────────────────────────────────────
Unten:  Kalt (+20–40 °C) ← Rücklauf Heizkreis
                              Austritt Erzeuger (Rücklauf)
```

**Warmes Wasser steigt auf, kaltes sinkt** — natürliche Schichtung. Gut geschichteter Puffer kann Erzeuger und Verbraucher bei unterschiedlichen Temperaturniveaus bedienen.

### Einbindung (Rohranschlüsse)

```
Vorlauf Erzeuger → [oben]
Vorlauf Verbraucher ← [oben bis Mitte je nach Temperatur]
Rücklauf Verbraucher → [unten bis Mitte]
Rücklauf Erzeuger ← [unten]
```

**Schichtungszerstörung vermeiden:**
- Rohranschlüsse **oben** und **unten** (nicht seitlich mittig)
- Einströmgeschwindigkeit gering halten (< 0.2 m/s im Speicher)
- Einströmung gegen Prallblech oder über Taucheinstutzen

---

## Puffergrösse

**Faustformel Wärmepumpe:**

```
V_Puffer ≥ 20–50 Liter pro kW WP-Leistung
```

Beispiel: 10 kW WP → 200–500 Liter Puffer

**Faustformel Solar:**

```
V_Puffer ≥ 50–75 Liter pro m² Kollektorfläche
```

**Zu klein:** Häufiges Takten, keine Entkopplung
**Zu gross:** Lange Aufheizzeit, Wärmeverluste, Legionellengefahr (wenn WW-Anteil)

---

## Temperatursensoren und Regelung

Typische Sensor-Positionen:

```
Puffer (vereinfacht):

[Sensor oben T_oben]     ←── Erzeuger Vorlauf
                              ←── Heizkreis Vorlauf
─────────────────────────────
[Sensor mitte T_mitte]   
─────────────────────────────
[Sensor unten T_unten]   ←── Erzeuger Rücklauf
                              ←── Heizkreis Rücklauf
```

### Ladelogik Wärmepumpe

```
Wenn T_oben < Soll_Speicher (z.B. 55 °C):
  → WP starten, laden bis T_oben ≥ Soll + Hysterese (z.B. 57 °C)
  
Wenn T_oben ≥ Soll + Hysterese:
  → WP stoppen, Speicher hält Wärme vor
```

**Wichtig:** Speicher-Solltemperatur muss zur WP-Vorlauftemperatur passen (Effizienz!). Je höher der Sollwert, desto schlechter der COP.

### Heizkreis-Entnahme

```
Wenn T_oben > Heizkreis-Vorlauftemperatur:
  → Heizkreis direkt aus Speicher versorgt (kein Mischer nötig)
  
Wenn T_oben knapp über oder unter Heizkreis-Soll:
  → Mischventil oder 3-Wege-Ventil reduziert Temperatur
```

---

## Kombispeicher (Puffer + Warmwasser)

Kombispeicher enthält beides — **Heizungspuffer** und **Trinkwarmwasser**:

```
Aussen:  Heizungswasser (geschlossener Kreis)
Innen:   Edelstahl-Hygienespeicher für Trinkwasser (Wärmetauscher oder Rohrschlange)
```

**Vorteile:** Kompakt, ein Gerät
**Nachteile:** Warmwasser begrenzt durch Wärmetauscher-Fläche; Legionellen-Aspekte beachten!

---

## Pufferspeicher bei Wärmepumpe: typische GA-Regelung

```
DDC Heizung/WP:
  AI: T_Puffer_oben (PT1000)
  AI: T_Puffer_mitte (PT1000)
  AI: T_Puffer_unten (PT1000)
  AI: T_Aussenluft
  DI: WP-Betriebsmeldung
  DI: WP-Störung
  DO: WP-Freigabe (EIN/AUS)
  AO: Heizkreis-Mischventil (0–10 V)

Programm:
  1. Berechne Heizkreis-Solltemperatur (Heizkurve)
  2. Wenn T_Puffer_oben < Soll − 3 K → WP freigeben
  3. WP heizt Puffer bis T_Puffer_oben = Soll + 2 K
  4. Heizkreis-Pumpe und Mischventil regeln auf Vorlauf-Soll
```

## Normen

- **EN 12977** — Thermische Solaranlagen, Heizkessel, Pufferspeicher
- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **SIA 384.201** — Heizungsanlagen in Gebäuden (CH)
