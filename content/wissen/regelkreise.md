---
title: Regelkreise — Grundlagen und Totzeit
slug: regelkreise
category: regelung
subcategory: grundlagen
tags: [regelkreis, totzeit, verzögerung, strecke, regler, sensor, aktor, stellgrösse, regelgrösse, führungsgrösse, störgrösse, pt1, totzeitstrecke, sprungantwort, einregelzeit, überschwingen]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, steuern-regeln, zweipunktregelung, kaskadenregelung]
rechner: [pid-simulator]
norm: [DIN IEC 60050-351, VDI 3540]
updated: 2026-05-14
lang: de
---

# Regelkreise — Grundlagen und Totzeit

Ein Regelkreis ist die Basis jeder automatischen Steuerung. Das Verständnis seiner Elemente — insbesondere der **Totzeit** — ist entscheidend für die korrekte Parametrierung von Reglern in der GA.

## Elemente des Regelkreises

```
              ┌─────────────────────────────────────┐
Führungs-     │   e           Y           X          │
grösse W ──►[+]──►[Regler]──►[Stellglied]──►[Strecke]──► Regelgrösse X
             [−]                               ↑
              └───────[Messglied/Sensor]────────┘
                                    
                               Störgrösse Z
                                    ↓
                             [Strecke] ←──────
```

| Element          | Funktion                                    | GA-Beispiel                     |
|------------------|---------------------------------------------|---------------------------------|
| **Führungsgrösse W** | Sollwert                               | Raum-Soll 22 °C                 |
| **Regelabweichung e** | W − X (Differenz)                    | 22 − 20 = 2 K                  |
| **Regler**       | Berechnet Stellgrösse aus Abweichung       | PI-Regler                       |
| **Stellgrösse Y** | Ausgangssignal des Reglers              | 0–10 V ans Ventil               |
| **Stellglied**   | Wandelt Y in physikalische Wirkung         | Ventilantrieb                   |
| **Strecke S**    | Das zu regelnde System                     | Raum mit Heizkörper             |
| **Regelgrösse X** | Was gemessen wird                        | Ist-Raumtemperatur              |
| **Störgrösse Z** | Unerwünschte Beeinflussung                 | Fenster offen, Sonneneinstrahlung|
| **Messglied**    | Sensor, wandelt physikalisch → elektrisch  | PT1000 + Transmitter            |

---

## Strecken-Charakteristik

### P-Strecke (Proportionalstrecke)

Ausgang folgt sofort dem Eingang mit konstantem Verhältnis:

```
Eingang (Heizleistung) verdoppelt → Ausgabe (Raumtemperatur) steigt proportional
```

Beispiel: elektrische Heizung in gut isoliertem Raum (annähernd).

### PT1-Strecke (Verzögerung 1. Ordnung)

Strecke mit Verzögerung — häufigster Typ in der GA:

```
Sprung am Eingang t=0:
                    
Ausgang:   │         ___________
           │       /
           │      /  Zeitkonstante T1
           │     /
           │____/
              t=0       t
```

**Zeitkonstante T1:** Zeit bis 63 % des Endwerts erreicht sind.

GA-Beispiele: Heizregister (T1 = 1–5 min), Raumtemperatur (T1 = 15–60 min).

### Totzeitstrecke (Tt)

Strecke mit **Totzeitanteil** — Eingang hat erst nach der Totzeit Wirkung auf Ausgang:

```
Sprung am Eingang t=0:
                    
Ausgang:   │              ___________
           │             /
           │            /
           │           /
           │__________/
              t=0   t=Tt (Totzeit)
```

**Totzeit** = Zeit zwischen Stellgrösse-Änderung und ersten messbaren Effekt.

### PTT1-Strecke (Totzeit + Verzögerung)

Die Realität — fast alle GA-Regelstrecken:

```
Totzeit (kein Effekt sichtbar) + Verzögerung (langsames Ansteigen)
```

Beispiel Heizungsvorlauf: Ventil öffnet → Heizwasser fliesst durch Rohr (Totzeit: Transportzeit des Wassers) → Raumtemperatur steigt langsam (PT1).

---

## Totzeit — das grösste Problem in der GA

### Was verursacht Totzeit?

| Ursache                       | Totzeit-Grösse      | System                     |
|-------------------------------|---------------------|----------------------------|
| Transport von Heizwasser im Rohr | 5–60 s         | Heizkörper, FBH             |
| Wärmedurchgang Wärmetauscher  | 10–120 s            | Lufterhitzer/-kühler       |
| Wärmedurchgang Estrich        | 30–180 min          | Fussbodenheizung            |
| Thermische Trägheit Raum      | 15–60 min           | Raumtemperatur              |
| Messfilterung                 | 1–30 s              | Glättungsfilter im DDC      |

### Auswirkung auf Regelbarkeit

**Faustformel:**
```
Je grösser das Verhältnis Totzeit / Zeitkonstante, desto schwieriger die Regelbarkeit
```

| Tt / T1          | Regelbarkeit        | Empfehlung                  |
|------------------|---------------------|-----------------------------|
| < 0.1            | Sehr gut            | Aggressiver Regler möglich   |
| 0.1 – 0.5        | Gut                 | Standard PID               |
| 0.5 – 1.0        | Mittel              | Vorsichtige Parametrierung  |
| > 1.0            | Schwierig           | Kaskadenregelung erwägen    |

### Fussbodenheizung: extremes Beispiel

```
Totzeit (Heizwasser transportiert): ~5 min
Zeitkonstante (Estrich erwärmt sich): ~60–120 min

Tt/T1 = 5/90 ≈ 0.06 → eigentlich gut!

ABER: Wenn Raum als äusserer Kreis dazu kommt:
Totzeit + Verzögerung bis Raumtemperatur steigt: ~60–120 min
Zeitkonstante Raum: ~60–180 min

→ Sehr träge Strecke → PI-Regler mit Ti = 60–120 min nötig
```

---

## Sprungantwort — Regler testen

Die einfachste Methode um eine Regelstrecke zu charakterisieren:

1. Anlage in manuellen Betrieb (Hand)
2. Stellgrösse auf Ausgangswert halten (z.B. 30 %)
3. Abwarten bis eingeschwungen
4. Sprung auf neuen Wert (z.B. 60 %)
5. Reaktion der Regelgrösse aufzeichnen
6. Aus dem Graphen: Totzeit (Tt) und Zeitkonstante (T1) ablesen
7. Regler-Parameter berechnen (z.B. nach Ziegler-Nichols oder CHR-Methode)

---

## Normen

- **DIN IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch, Leittechnik
- **VDI 3540** — Regelungstechnik in der HLK
