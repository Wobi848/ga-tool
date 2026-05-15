---
title: Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann
slug: hydraulische-schaltungen
category: hydraulik
subcategory: schaltungen
tags: [einrohr, zweirohr, tichelmann, bypass, hydraulik, heizkreis, heizverteilung, differenzdruck, volumenstrom, druckverlust, rücklauf, pumpe, strang]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulischer-abgleich, motorventile, pid-regler, druckverlust, waermepumpe]
norm: [VDI 2035, EN 14336]
updated: 2026-05-14
lang: de
---

# Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann

Die hydraulische Schaltung bestimmt wie Wärme (oder Kälte) vom Erzeuger zu den Verbrauchern gelangt. Falsch dimensionierte oder falsch gebaute Schaltungen sind die häufigste Ursache für unzufriedene Nutzer, überhöhten Energieverbrauch und endlose Inbetriebnahme-Probleme.

## Einrohrheizung

### Prinzip

Alle Heizkörper liegen **in Reihe** auf einem gemeinsamen Rohr:

```
Vorlauf → HK1 → HK2 → HK3 → HK4 → Rücklauf
          ↑       ↑       ↑       ↑
     Bypass   Bypass  Bypass  Bypass
     Ventil   Ventil  Ventil  Ventil
```

Das Wasser fliesst durch jeden Heizkörper (oder am Bypass vorbei), kühlt sich dabei ab und gelangt mit niedrigerer Temperatur zum nächsten Heizkörper.

### Eigenschaften

| Eigenschaft          | Einrohr                                     |
|----------------------|---------------------------------------------|
| Verrohrungsaufwand   | Gering (ein Rohr)                           |
| Temperaturgefälle    | Jeder nachfolgende HK bekommt kälteres Wasser |
| Regelbarkeit         | Schlecht (HK am Ende schwer regelbar)       |
| Hydraul. Abgleich    | Sehr aufwendig, Bypass-Einstellung kritisch |
| Einsatz heute        | Kaum noch neu eingebaut                     |

### Bypass-Funktion

Ohne Bypass: Ventil geschlossen → Heizkreis unterbrochen → keine Zirkulation für nachfolgende HK.
Mit Bypass: Auch bei geschlossenem Ventil fliesst Wasser am HK vorbei → Zirkulation bleibt aufrecht.

**Problem:** Der Bypass schafft einen Kurzschluss. Dimensionierung ist kritisch — zu viel Bypass = kaum Durchfluss durch HK; zu wenig = kein Ausgleich.

> ⚠️ Einrohrsysteme eignen sich **nicht** für grosse Temperaturunterschiede zwischen den Heizkörpern und sind heute kaum noch Stand der Technik. Im Altbaubestand jedoch sehr häufig anzutreffen.

---

## Zweirohrheizung

### Prinzip

Vorlauf und Rücklauf laufen **parallel** zu allen Heizkörpern:

```
Vorlauf ─────────────────────────────────►
         │          │          │          │
        HK1        HK2        HK3        HK4
         │          │          │          │
Rücklauf◄─────────────────────────────────
```

Jeder Heizkörper bekommt **dieselbe Vorlauftemperatur** direkt vom Erzeuger. Das Rücklaufwasser misch sich im Rücklaufstrang.

### Eigenschaften

| Eigenschaft          | Zweirohr                                    |
|----------------------|---------------------------------------------|
| Verrohrungsaufwand   | Höher (zwei Rohre)                          |
| Temperatur je HK     | Identisch (Vorlauftemperatur)               |
| Regelbarkeit         | Gut (jeder HK unabhängig regelbar)          |
| Hydraul. Abgleich    | Notwendig (Stränge verschieden lang!)       |
| Einsatz heute        | Standard für alle neuen Anlagen             |

### Hydraulisches Problem Zweirohr

**Nahgelegene HK** haben deutlich weniger Widerstand als weit entfernte → bekommen überproportional viel Durchfluss → überwärmt, während entfernte HK zu wenig bekommen.

Lösung: Hydraulischer Abgleich (Voreinstellventile, DDR-Regelung).

---

## Tichelmann-Schaltung (Tichelmänn)

### Prinzip

Auch **Gleichstromschaltung** oder **Rücklauf-Rücklauf-Schaltung** genannt. Besonderheit: Vorlauf führt zum ersten HK, Rücklauf führt *umgekehrt* vom letzten HK zurück.

```
Vorlauf ─────────────────────────────────►
         │          │          │          │
        HK1        HK2        HK3        HK4
         │          │          │          │
         ◄─────────────────────────────────
Rücklauf                      ◄── längster Rücklauf
```

Die Idee: Der HK mit dem kürzesten Vorlauf hat den längsten Rücklauf — und umgekehrt. Damit ist der **Gesamtdruckverlust für jeden HK gleich** (Vorlauf + Rücklauf).

### Eigenschaften

| Eigenschaft          | Tichelmann                                  |
|----------------------|---------------------------------------------|
| Verrohrungsaufwand   | Höher als Zweirohr (längerer Rücklauf)      |
| Selbstabgleich       | Nahezu selbstabgleichend (Druckverluste gleich) |
| Hydraul. Abgleich    | Reduzierter Aufwand nötig                   |
| Einsatz              | Fussbodenheizung, Flächenheizungen, grosse parallele Kreise |

### Wann Tichelmann?

- Viele gleichartige parallele Verbraucher (z.B. FBH-Kreise, Solarkollektor-Felder, Deckenkühlkreise)
- Wenn Leitungsführung die Rücklaufverlängerung nicht teurer macht als die Abgleich-Armaturen
- Nicht sinnvoll wenn Verbraucher sehr unterschiedliche Druckverlusteigenschaften haben

---

## Bypass-Schaltungen

### Pumpenbetrieb-Bypass

```
Erzeuger → Pumpe → ──────────── Verbraucher
                  │              │
                  └─── Bypass ───┘
                  (Differenzdruckregelventil)
```

Regelt den Differenzdruck wenn Verbraucher schliessen → verhindert Druckspitzen, schützt Pumpe.

### Erzeuger-Bypass (hydraulische Entkopplung)

**Vor-/Rücklaufverbindung mit Bypass zwischen Erzeugerkreis und Verteilerkreis:**

```
Erzeuger ─── Prim.pumpe ───► Vorlauf-Verteiler ───► Verbraucher
                              │
                         Kurzschlussrohr
                              │
                             ◄─── Rücklauf-Sammler ◄── Verbraucher
Rücklauf ◄── Prim.pumpe ────
```

**Zweck:** Primär- und Sekundärkreis hydraulisch entkoppeln → jeder Kreis hat eigene Pumpe, eigene Regelung. Wichtig bei Wärmepumpen (Mindestdurchfluss sicherstellen!).

### Bypass bei Wärmepumpe

Wärmepumpen haben einen **Mindestvolumenstrom** (sonst Abschaltung wegen Druckschienerüberwachung oder Frostschutz):

```
WP ──── Pumpe ──── Verteiler
              │
         Bypass-Ventil (thermostatisch oder motorisch)
              │
        Rücklauf
```

Öffnet wenn alle Heizkreis-Ventile schliessen → Mindestdurchfluss durch WP gewährleistet.

---

## Vergleich auf einen Blick

| Schaltung     | Verrohrung  | Abgleich      | Gleichmässigkeit | Typischer Einsatz         |
|---------------|-------------|---------------|------------------|---------------------------|
| Einrohr       | Einfach     | Aufwendig     | Schlecht         | Altbau (Bestand)          |
| Zweirohr      | Mittel      | Nötig         | Gut              | Neubau Standard           |
| Tichelmann    | Aufwendig   | Minimal       | Sehr gut         | FBH, Kollektoren, Decken  |
| Mit Bypass    | +Armatur    | Regelventil   | —                | Mindestdurchfluss, Entk.  |

---

## Typische Fehler in der Praxis

| Fehler                          | Symptom                              | Ursache                                    |
|---------------------------------|--------------------------------------|--------------------------------------------|
| Zu langer Einrohrkreis          | Heizkörper am Ende kalt              | Zu viel Temperaturgefälle                  |
| Bypass zu offen (Einrohr)       | Heizleistung zu tief                 | Kurzschluss — Wasser fliesst nicht durch HK |
| Zweirohr ohne Abgleich          | Nah-HK überhitzen, fern-HK kalt      | Druckdifferenz nicht kompensiert           |
| Tichelmann falsch dimensioniert | Trotzdem ungleichmässig              | HK haben unterschiedliche Widerstände      |
| Fehlendes Überströmventil (WP)  | WP schaltet bei geschlossenen Kreisen ab | Kein Mindestvolumenstrom                |

## Normen

- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **EN 14336** — Installation und Abnahme Heizungsanlagen in Gebäuden
- **SIA 384.201** — Heizungsanlagen in Gebäuden (Schweizer Norm)
