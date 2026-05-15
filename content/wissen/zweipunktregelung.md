---
title: Zweipunktregelung vs. stetige Regelung
slug: zweipunktregelung
category: regelung
subcategory: regler
tags: [zweipunktregelung, stetige-regelung, thermostat, hysterese, schaltdifferenz, pendeln, schalthäufigkeit, ein-aus, bang-bang, pid, proportional, dreipunktregelung]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, steuern-regeln, alarmmanagement, glt-grundlagen]
norm: [DIN IEC 60050-351, VDI 3540]
updated: 2026-05-14
lang: de
---

# Zweipunktregelung vs. stetige Regelung

In der GA werden zwei grundlegend verschiedene Regelungsarten eingesetzt: die einfache Zweipunktregelung und die stetige Regelung. Die Wahl bestimmt Regelgüte, Energieverbrauch und Anlagen-Lebenserwartung.

## Zweipunktregelung (EIN/AUS)

### Prinzip

Der Regler kennt nur zwei Zustände: **EIN** oder **AUS**. Eine Hysterese verhindert ständiges Schalten:

```
Sollwert: 22 °C, Hysterese: 1 K (→ Schaltpunkte: 21.5 und 22.5 °C)

Temperatur sinkt auf 21.5 °C → Heizung EIN
Temperatur steigt auf 22.5 °C → Heizung AUS
→ Schwingung zwischen 21.5 und 22.5 °C
```

### Hysterese (Schaltdifferenz)

Die Hysterese ist entscheidend für die Regelqualität:

| Hysterese | Effekt                                    |
|-----------|-------------------------------------------|
| Zu klein  | Sehr häufiges Schalten → Verschleiss      |
| Zu gross  | Grosse Temperaturschwankungen → schlechter Komfort |
| Optimal   | Seltenes Schalten, akzeptable Schwankung  |

**Faustformel:** Hysterese = 2–5 % des Messbereichs oder 1–3 K für Raumtemperatur.

### Vor- und Nachteile

| Vorteil                              | Nachteil                               |
|--------------------------------------|----------------------------------------|
| Einfach (nur 1 Bit)                  | Schwingt permanent                     |
| Günstig (einfaches Relais)           | Keine Präzision                        |
| Robust                               | Häufige Schaltvorgänge (Relais-Verschleiss) |
| Kein Regler-Tuning nötig             | Energieverschwendung (Überschwingen)   |

### Typische Anwendungen

- Einfache Thermostate (Wohnbereich, elektrische Fussbodenheizung)
- Frost-/Übertemperaturschutz (Grenzwert-Alarme ohne Regelgüte-Anforderung)
- Pumpen-Steuerung (EIN wenn Anforderung, AUS wenn keine)
- Lüftung: EIN/AUS Nachtbetrieb

---

## Stetige Regelung (proportional, PID)

### Prinzip

Der Reglerausgang ist stufenlos zwischen 0 und 100 % einstellbar. Die Stellgrösse ist proportional zur Regelabweichung (plus I- und D-Anteil bei PID):

```
Regelabweichung 5 K → Ventil öffnet auf 60 %
Regelabweichung 2 K → Ventil öffnet auf 30 %
Regelabweichung 0 K → Ventil auf Haltepunkt (I-Anteil)
```

### P-Regler (Proportional)

```
Y = Kp × e

Y = Stellgrösse (0–100 %)
Kp = Verstärkung
e = Regelabweichung (Soll − Ist)
```

**Problem P-Regler:** Bleibende Regelabweichung. Der Regler findet ein Gleichgewicht bei e ≠ 0 (sonst wäre Y = 0 und nichts heizen).

### PI-Regler (Proportional + Integral)

Der I-Anteil integriert die Abweichung über die Zeit → beseitigt die bleibende Abweichung:

```
Y = Kp × e + Ki × ∫e dt
```

Im eingeschwungenen Zustand: e = 0, Y ≠ 0 (gehalten durch Integrator).

→ **PI-Regler** ist der Standard für Temperatur- und Druckregelung in der GA.

---

## Dreipunktregelung

Erweiterung der Zweipunktregelung für motorische Antriebe:

```
Zu gross (> Soll + Δ): Signal "AUF" → Ventil öffnet
Zu klein (< Soll − Δ): Signal "ZU" → Ventil schliesst
Im Bereich: kein Signal → Ventil bleibt stehen (integrierendes Verhalten)
```

**Typisch für:** Motorische 3-Punkt-Antriebe ohne Rückmeldung (günstige Variante)

**Stellzeit:** Antrieb braucht Zeit für Auf/Zu (z.B. 60–120 s) → träges Regelverhalten.

---

## Vergleich auf einen Blick

| Merkmal               | Zweipunkt     | Dreipunkt     | Stetig (PI)   |
|-----------------------|---------------|---------------|---------------|
| Ausgangssignal        | 0/1 (Relais)  | Auf/Zu/Stop   | 0–10 V / 4–20 mA |
| Regelgüte             | Schlecht      | Mittel        | Gut           |
| Kosten                | Sehr gering   | Gering        | Mittel        |
| Ventil-/Antriebstyp  | Schützschaltung | 3-Punkt-Motor | Stetigantrieb |
| Verschleiss           | Relais (hoch) | Motor (mittel)| Antrieb (gering) |
| Tuning                | Nur Hysterese | Stellzeit     | Kp, Ti, Td    |
| Typischer Einsatz     | Thermostat    | Einfache HK   | Klima, Lüftung, Kühlung |

---

## Entscheidungshilfe

```
Frage 1: Muss präzise auf ±1 K geregelt werden?
  Ja → Stetige Regelung (PI)
  Nein → weiter

Frage 2: Haben wir einen motorischen Antrieb ohne Rückmeldung?
  Ja → Dreipunkt
  Nein → weiter

Frage 3: Ist ±2–3 K akzeptabel und Kosten minimieren?
  Ja → Zweipunkt mit Hysterese
```

## Normen

- **DIN IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch
- **VDI 3540** — Regelungstechnik für HLK-Anlagen
