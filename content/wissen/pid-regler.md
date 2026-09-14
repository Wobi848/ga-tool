---
title: PID-Regler
title_en: PID Controller
slug: pid-regler
category: regelung
subcategory: regler
tags:
  [
    pid,
    p-regler,
    i-regler,
    d-regler,
    regelkreis,
    tuning,
    sprungantwort,
    ziegler-nichols,
    xp,
    proportionalbereich,
    anti-windup,
    wirkrichtung,
    abtastzeit
  ]
difficulty: grundlagen
area: [hlk, ga]
related: [regelkreise, heizkurve, motorventile, mpc-ga, ventilautoritaet, zweipunktregelung]

rechner: [pid-simulator]
norm: []
updated: 2026-09-14
lang: de
---

# PID-Regler

Der **PID-Regler** ist der wichtigste Standard-Regler in der Gebäudeautomation. Er kombiniert drei Anteile, um eine Regelgrösse präzise auf den Sollwert zu führen.

## Die drei Anteile

### P — Proportional

Reagiert **sofort** auf die Regelabweichung. Stark = aggressiv, aber bleibende Regelabweichung.

```
u_P = K_p × e(t)
```

- **Wirkung:** Stellgrösse proportional zum Fehler
- **Problem:** Bleibende Abweichung (stationärer Fehler)
- **Anwendung:** Alleine selten — meist Teil von PI/PID

### I — Integral

**Eliminiert den stationären Fehler.** Integriert die Abweichung über die Zeit.

```
u_I = K_i × ∫ e(t) dt
```

- **Wirkung:** Korrigiert solange, bis Soll = Ist
- **Problem:** Verzögert die Reaktion, kann zu Schwingungen führen (Wind-Up)
- **Tuning:** Nachstellzeit T_n in Sekunden

### D — Differenzial

**Reagiert auf die Geschwindigkeit der Änderung.** Dämpft schnelle Sollwertsprünge.

```
u_D = K_d × de(t)/dt
```

- **Wirkung:** Bremst Überschwingen
- **Problem:** Verstärkt Rauschen — bei lauten Sensoren oft weggelassen (PI statt PID)
- **In HLK:** Oft nur bei trägen Strecken sinnvoll

## Tuning nach Ziegler-Nichols

Klassisches Verfahren — bewährt aber konservativ:

1. **I und D deaktivieren** (T_n = ∞, T_v = 0)
2. **K_p erhöhen**, bis die Regelgrösse anfängt zu schwingen
3. **Kritisches K_p (K_p_krit)** und **Schwingungsdauer T_krit** notieren
4. Werte einsetzen:

| Reglertyp | K_p           | T_n           | T_v            |
| --------- | ------------- | ------------- | -------------- |
| P         | 0.5 × K_krit  | —             | —              |
| PI        | 0.45 × K_krit | 0.85 × T_krit | —              |
| PID       | 0.6 × K_krit  | 0.5 × T_krit  | 0.125 × T_krit |

## Xp statt K_p — was am Regler wirklich steht

In der Literatur steht **K_p**, am Regler im Schaltschrank steht **Xp**. Beides
beschreibt dasselbe, nur andersherum: Xp ist der **Proportionalbereich** — die
Abweichung, die nötig ist, damit das Stellsignal den vollen Bereich durchläuft.

```
Xp [%] = 100 / K_p          K_p = 100 / Xp [%]
```

Bei Temperaturreglern wird Xp meist direkt in **Kelvin** angegeben:

> **Xp = 10 K** heisst: 10 K Abweichung ergeben 100 % Stellsignal.
> Bei 2 K Abweichung sind es 20 %, bei 5 K genau die Hälfte.

**Ein kleines Xp ist ein scharfer Regler.** Wer Xp halbiert, verdoppelt die
Verstärkung — genau umgekehrt zum Gefühl, das die Zahl vermittelt. Das ist die
häufigste Verwechslung bei der Übernahme fremder Parametersätze.

## Wirkrichtung

Jeder Regler braucht die Angabe, in welche Richtung er stellen soll:

| Wirkrichtung                 | Bei steigendem Istwert | Typisch für     |
| ---------------------------- | ---------------------- | --------------- |
| **invers** (reverse, heizen) | Stellsignal **sinkt**  | Heizungsventil  |
| **direkt** (direct, kühlen)  | Stellsignal **steigt** | Kühlventil, VAV |

Eine falsche Wirkrichtung sieht aus wie ein defektes Stellglied: der Raum wird
kälter, das Ventil fährt zu. Vor jeder Parametersuche prüfen — kein Xp der Welt
repariert das.

## Abtastzeit

Ein DDC-Regler rechnet nicht kontinuierlich, sondern im **Zyklus**. Liegt T_n in
der Grössenordnung der Abtastzeit, wird die Regelung grob und im schlimmsten
Fall instabil.

**Faustregel: T_n mindestens zehnmal die Abtastzeit.** Bei 1 s Zyklus also
T_n ≥ 10 s. Für träge Strecken — Fussbodenheizung, Speicher — ist eine
langsamere Abtastung nicht nur zulässig, sondern sinnvoll: sie glättet
Sensorrauschen, das sonst über den D-Anteil auf das Stellglied durchschlägt.

## Anti-Windup

Läuft das Stellglied in die Begrenzung — Ventil ganz offen, Pumpe auf 100 % —,
besteht die Regelabweichung fort, und der I-Anteil integriert weiter. Er wächst
auf Werte, die das Stellglied gar nicht umsetzen kann.

Wenn die Last dann zurückgeht, muss dieser aufgelaufene Betrag erst wieder
abgebaut werden. **Das Stellglied bleibt minutenlang am Anschlag, obwohl der
Sollwert längst erreicht ist** — die Regelgrösse schiesst über.

Jeder brauchbare DDC-Regler bringt einen Anti-Windup mit; er begrenzt das
Integral, sobald die Stellgrösse in der Sättigung ist. **Ist er abschaltbar,
gehört er eingeschaltet.** Zu erkennen ist das Problem an einem Überschwingen,
das immer nach einer Lastspitze auftritt und nie sonst.

## Startwerte für die Praxis

Ziegler-Nichols verlangt, die Anlage bis zur Dauerschwingung zu treiben. In
einem belegten Gebäude ist das selten erwünscht und manchmal schlicht verboten.
Üblicher ist: mit erprobten Werten starten und nachziehen.

| Regelkreis                       | Xp          | T_n       | T_v    |
| -------------------------------- | ----------- | --------- | ------ |
| Raumtemperatur, Radiator         | 2–5 K       | 15–30 min | —      |
| Raumtemperatur, Fussbodenheizung | 2–4 K       | 30–60 min | —      |
| Vorlauftemperatur, Mischer       | 10–20 K     | 2–5 min   | —      |
| Zulufttemperatur, Lüftung        | 5–15 K      | 3–8 min   | 0–30 s |
| Kanaldruck, Lüftung              | 50–150 Pa   | 10–60 s   | —      |
| Differenzdruck, Pumpe            | 20–50 kPa   | 10–30 s   | —      |
| CO₂-Regelung                     | 200–400 ppm | 5–15 min  | —      |

**Das sind Startpunkte, keine Wahrheiten.** Sie hängen an Streckenverstärkung,
Totzeit und Ventilautorität der konkreten Anlage. Der Wert der Tabelle liegt
darin, dass man nicht bei null anfängt — und dass man merkt, wenn ein
übernommener Parametersatz um eine Zehnerpotenz danebenliegt.

## Praxis-Tipps

- **Raumtemperatur:** PI reicht meist — Strecke ist langsam, kein D nötig
- **Vorlaufregelung:** PID kann sinnvoll sein wenn schnelle Lastwechsel auftreten
- **Drucklufthaltung:** P oder PI — schnelle Reaktion gefragt
- **Frequenzumrichter / Pumpen:** PI mit kurzem T_n
- **Bei Schwingen:** zuerst K_p halbieren, dann T_n verdoppeln

## Häufige Fehler

1. **D-Anteil zu hoch** mit rauschendem Sensor → Stellglied klappert
2. **T_n zu klein** → Aufschwingen
3. **Anti-Wind-Up vergessen** → bei langer Stellgrössen-Begrenzung läuft Integral weg
4. **Soll/Ist-Vertauschung** → der Regler dreht aus statt ein

## Siehe auch

- Regelkreise (allgemein)
- Heizkurve (überlagerte Vorsteuerung)
- Frequenzumrichter

<!-- EN -->

The **PID controller** is the most important standard controller in building automation. It combines three components to precisely bring a controlled variable to its setpoint.

## The three components

### P — Proportional

Responds **immediately** to the control deviation. High gain = aggressive response, but with a persistent steady-state offset.

```
u_P = K_p × e(t)
```

- **Effect:** Output proportional to the error
- **Problem:** Persistent offset (steady-state error)
- **Application:** Rarely used alone — usually part of PI/PID

### I — Integral

**Eliminates the steady-state error.** Integrates the deviation over time.

```
u_I = K_i × ∫ e(t) dt
```

- **Effect:** Corrects until setpoint = actual value
- **Problem:** Slows response, can cause oscillation (wind-up)
- **Tuning:** Reset time T_n in seconds

### D — Derivative

**Responds to the rate of change.** Dampens rapid setpoint steps.

```
u_D = K_d × de(t)/dt
```

- **Effect:** Reduces overshoot
- **Problem:** Amplifies noise — often omitted with noisy sensors (PI instead of PID)
- **In HVAC:** Mainly useful for slow processes

## Tuning by Ziegler-Nichols

Classic method — proven but conservative:

1. **Disable I and D** (T_n = ∞, T_v = 0)
2. **Increase K_p** until the controlled variable begins to oscillate
3. **Note the critical gain K_p_crit** and **oscillation period T_crit**
4. Apply the values:

| Controller type | K_p           | T_n           | T_v            |
| --------------- | ------------- | ------------- | -------------- |
| P               | 0.5 × K_crit  | —             | —              |
| PI              | 0.45 × K_crit | 0.85 × T_crit | —              |
| PID             | 0.6 × K_crit  | 0.5 × T_crit  | 0.125 × T_crit |

## Xp instead of K_p — what the controller actually shows

Textbooks say **K_p**, the controller in the panel says **Xp**. Both describe
the same thing the other way round: Xp is the **proportional band** — the
deviation needed for the output to travel its full range.

```
Xp [%] = 100 / K_p          K_p = 100 / Xp [%]
```

On temperature controllers Xp is usually given directly in **kelvin**:

> **Xp = 10 K** means: 10 K of deviation gives 100 % output.
> At 2 K it is 20 %, at 5 K exactly half.

**A small Xp is an aggressive controller.** Halving Xp doubles the gain — the
opposite of what the number suggests. This is the most common confusion when
taking over someone else's parameter set.

## Action direction

Every controller needs to know which way to drive:

| Action                | As the measured value rises | Typical for        |
| --------------------- | --------------------------- | ------------------ |
| **reverse** (heating) | output **falls**            | heating valve      |
| **direct** (cooling)  | output **rises**            | cooling valve, VAV |

Wrong action looks like a faulty actuator: the room gets colder and the valve
closes. Check it before hunting parameters — no Xp in the world fixes this.

## Scan time

A DDC controller does not compute continuously but in **cycles**. If T_n is
anywhere near the scan time, control becomes coarse and in the worst case
unstable.

**Rule of thumb: T_n at least ten times the scan time.** At a 1 s cycle that
means T_n ≥ 10 s. For slow processes — underfloor heating, storage tanks — a
slower scan is not merely acceptable but useful: it smooths sensor noise that
would otherwise reach the actuator through the derivative term.

## Anti-windup

When the actuator saturates — valve fully open, pump at 100 % — the deviation
persists and the integral term keeps integrating. It grows to values the
actuator cannot deliver.

When the load drops again, that accumulated amount has to be unwound first.
**The actuator stays at its limit for minutes although the setpoint was reached
long ago** — and the controlled variable overshoots.

Every usable DDC controller ships with anti-windup; it limits the integral as
soon as the output saturates. **If it can be switched off, switch it on.** The
symptom is overshoot that always follows a load peak and never occurs otherwise.

## Starting values for the field

Ziegler-Nichols requires driving the plant into sustained oscillation. In an
occupied building that is rarely welcome and sometimes simply forbidden. The
usual approach is to start from proven values and refine.

| Loop                             | Xp          | T_n       | T_v    |
| -------------------------------- | ----------- | --------- | ------ |
| Room temperature, radiator       | 2–5 K       | 15–30 min | —      |
| Room temperature, underfloor     | 2–4 K       | 30–60 min | —      |
| Supply temperature, mixing valve | 10–20 K     | 2–5 min   | —      |
| Supply air temperature           | 5–15 K      | 3–8 min   | 0–30 s |
| Duct pressure, ventilation       | 50–150 Pa   | 10–60 s   | —      |
| Differential pressure, pump      | 20–50 kPa   | 10–30 s   | —      |
| CO₂ control                      | 200–400 ppm | 5–15 min  | —      |

**These are starting points, not truths.** They depend on process gain, dead
time and valve authority of the actual plant. The value of the table is that
you do not start from zero — and that you notice when an inherited parameter set
is off by an order of magnitude.

## Practical tips

- **Room temperature:** PI usually sufficient — slow process, no D needed
- **Flow temperature control:** PID can be useful when rapid load changes occur
- **Duct pressure control:** P or PI — fast response required
- **VFDs / pumps:** PI with short T_n
- **When oscillating:** first halve K_p, then double T_n

## Common mistakes

1. **D gain too high** with noisy sensor → actuator chatters
2. **T_n too small** → oscillation buildup
3. **Anti-wind-up forgotten** → integral runs away during prolonged output saturation
4. **Setpoint/actual value swapped** → controller drives in the wrong direction

## See also

- Control loops (general)
- Heating curve (feedforward overlay)
- Variable speed drive
