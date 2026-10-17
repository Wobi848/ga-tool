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
updated: 2026-10-17
lang: de
---

# PID-Regler

Der **PID-Regler** ist der wichtigste Standard-Regler in der Gebäudeautomation. Er kombiniert drei Anteile, um eine Regelgrösse präzise auf den Sollwert zu führen.

## Die drei Anteile

### P — Proportional

Reagiert **sofort** auf die Regelabweichung. Stark = aggressiv, aber bleibende Regelabweichung.

<p class="formel">u<sub>P</sub> = K<sub>p</sub> × e(t)</p>

- **Wirkung:** Stellgrösse proportional zum Fehler
- **Problem:** Bleibende Abweichung (stationärer Fehler)
- **Anwendung:** Alleine selten — meist Teil von PI/PID

### I — Integral

**Eliminiert den stationären Fehler.** Integriert die Abweichung über die Zeit.

<p class="formel">u<sub>I</sub> = K<sub>i</sub> × ∫ e(t) dt, &nbsp; K<sub>i</sub> = K<sub>p</sub> / T<sub>n</sub></p>

- **Wirkung:** Korrigiert solange, bis Soll = Ist
- **Problem:** Verzögert die Reaktion, kann zu Schwingungen führen (Wind-Up)
- **Tuning:** Nachstellzeit T_n in Sekunden

### D — Differenzial

**Reagiert auf die Geschwindigkeit der Änderung.** Er wirkt einer schnellen Änderung entgegen und dämpft so das Überschwingen. Damit ein Sollwertsprung keinen Stellstoss auslöst, rechnen die meisten Regler den D-Anteil nur aus dem Istwert.

<p class="formel">u<sub>D</sub> = K<sub>d</sub> × de(t)/dt</p>

- **Wirkung:** Bremst Überschwingen
- **Problem:** Verstärkt Rauschen — bei lauten Sensoren oft weggelassen (PI statt PID)
- **In HLK:** selten nötig; am ehesten bei trägen Strecken mit mehreren Verzögerungen

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

Ziel von Ziegler-Nichols ist ein Einschwingen mit höchstens etwa 20 % Überschwingen. Für die meisten HLK-Kreise ist das schon eher sportlich.

## Einstellregeln aus der Sprungantwort

Ohne Dauerschwingung geht es mit einem Sprungversuch an der offenen Strecke: Stellgrösse von Hand um Δy verstellen, den Verlauf aufzeichnen und mit der Wendetangente **T<sub>u</sub>** (Verzugszeit), **T<sub>g</sub>** (Ausgleichszeit) und **K<sub>S</sub>** = Δx / Δy (Streckenverstärkung) ablesen. Wie das geht, steht in [Regelkreise](/wissen/regelkreise).

**Ziegler-Nichols, Wendetangenten-Verfahren:**

| Reglertyp | K<sub>p</sub>                                         | T<sub>n</sub>       | T<sub>v</sub>       |
| --------- | ----------------------------------------------------- | ------------------- | ------------------- |
| P         | 1.0 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | —                   | —                   |
| PI        | 0.9 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | 3.3 · T<sub>u</sub> | —                   |
| PID       | 1.2 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | 2 · T<sub>u</sub>   | 0.5 · T<sub>u</sub> |

**Chien, Hrones und Reswick** (1952) unterscheiden zusätzlich, ob der Regler vor allem **Störungen** ausregeln oder einer **Sollwertänderung** folgen soll, und ob er **ohne Überschwingen** (aperiodisch) oder **mit höchstens 20 %** Überschwingen arbeiten soll. Für die PI-Regler in der GA:

| PI-Regler                   | K<sub>p</sub> · K<sub>S</sub> · T<sub>u</sub> / T<sub>g</sub> | T<sub>n</sub>       |
| --------------------------- | ------------------------------------------------------------- | ------------------- |
| Störung, aperiodisch        | 0.6                                                           | 4 · T<sub>u</sub>   |
| Störung, 20 % Überschwingen | 0.7                                                           | 2.3 · T<sub>u</sub> |
| Führung, aperiodisch        | 0.35                                                          | 1.2 · T<sub>g</sub> |
| Führung, 20 % Überschwingen | 0.6                                                           | 1.0 · T<sub>g</sub> |

Für PID-Regler liegen die Werte etwas höher, mit T<sub>v</sub> von etwa 0.4 bis 0.5 · T<sub>u</sub>. In der GA ist meist das **Störverhalten** wichtig: Ein Raum soll trotz Sonne und Personen auf Sollwert bleiben, Sollwertsprünge sind selten.

**Beispiel Zulufttemperatur:** T<sub>u</sub> = 30 s, T<sub>g</sub> = 180 s, Ventil 0 → 100 % ergibt 20 K, also K<sub>S</sub> = 0.2 K/%. Störung, aperiodisch: K<sub>p</sub> = 0.6 · 180 / (0.2 · 30) = 18 %/K, das ist ein X<sub>p</sub> von 100 / 18 ≈ 5.6 K. T<sub>n</sub> = 4 · 30 s = 2 min.

**Kreisverstärkung:** Das Produkt V<sub>0</sub> = K<sub>S</sub> · K<sub>p</sub> sagt, wie stark ein Signal bei einem Durchlauf durch den Regelkreis verstärkt wird. Je schwieriger die Strecke, desto kleiner darf V<sub>0</sub> sein, bevor der Kreis instabil wird. Deshalb muss ein Regler nachgestellt werden, wenn sich die Strecke ändert, etwa ein grösseres Ventil oder ein anderes Register.

## Wie gut regelt der Kreis?

Nach einem Sollwertsprung oder einer Störung beurteilt man:

- **Toleranzband:** die erlaubte Abweichung, z.B. 21 °C ± 0.5 K
- **Überschwingweite:** die grösste vorübergehende Abweichung
- **Anregelzeit:** bis die Regelgrösse zum ersten Mal ins Toleranzband kommt
- **Ausregelzeit:** bis sie dauerhaft im Toleranzband bleibt

In HLK-Anlagen gewünscht ist ein **aperiodischer** Verlauf, der sich ohne Überschwingen nähert, oder ein **gedämpfter** mit einem kleinen Überschwinger. Ein gut eingestellter PI-Regler hat eine kaum längere Anregelzeit, aber eine viel kürzere Ausregelzeit als ein vorsichtig eingestellter. Überschwingt er zu stark, verkleinert man K<sub>p</sub> (grösseres X<sub>p</sub>), ist er zu träge, verkleinert man T<sub>n</sub>.

**P-Regler und Offset:** Ein reiner P-Regler hat immer eine bleibende Abweichung, je nach Last. Sein **Arbeitspunkt** (Offset) legt fest, bei welcher Last er genau auf Sollwert ist: Bei 0 % ist der Sollwert ohne Last erreicht, bei 100 % unter Volllast, bei 50 % liegt die Abweichung symmetrisch. Thermostatventile sind solche P-Regler.

## Xp statt K_p — was am Regler wirklich steht

In der Literatur steht **K_p**, am Regler im Schaltschrank steht **Xp**. Beides
beschreibt dasselbe, nur andersherum: Xp ist der **Proportionalbereich** — die
Abweichung, die nötig ist, damit das Stellsignal den vollen Bereich durchläuft.

<p class="formel">Xp [%] = 100 / K<sub>p</sub>, &nbsp; K<sub>p</sub> = 100 / Xp [%]</p>

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
langsamere Abtastung zulässig. Gegen Sensorrauschen hilft sie nicht, dafür
gehört ein Filter auf den Messwert, sonst schlägt das Rauschen über den D-Anteil
auf das Stellglied durch.

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
- **Kanaldruck:** PI mit kurzem T_n — schnelle Reaktion gefragt
- **Frequenzumrichter / Pumpen:** PI mit kurzem T_n
- **Bei Schwingen:** zuerst K_p halbieren, dann T_n verdoppeln

## Häufige Fehler

1. **D-Anteil zu hoch** mit rauschendem Sensor → Stellglied klappert
2. **T_n zu klein** → Aufschwingen
3. **Anti-Wind-Up vergessen** → bei langer Stellgrössen-Begrenzung läuft Integral weg
4. **Soll/Ist-Vertauschung** → der Regler dreht aus statt ein

## Quellen

- Siemens Schweiz AG: «Regeltechnik», Schulungsunterlage BT_0098, 2022, Kap. 5 und 6

## Siehe auch

- [Regelkreise](/wissen/regelkreise)
- [Heizkurve](/wissen/heizkurve) — witterungsgeführte Vorsteuerung
- [Kaskadenregelung](/wissen/kaskadenregelung)
- [Frequenzumrichter](/wissen/frequenzumrichter)

<!-- EN -->

The **PID controller** is the most important standard controller in building automation. It combines three components to precisely bring a controlled variable to its setpoint.

## The three components

### P — Proportional

Responds **immediately** to the control deviation. High gain = aggressive response, but with a persistent steady-state offset.

<p class="formel">u<sub>P</sub> = K<sub>p</sub> × e(t)</p>

- **Effect:** Output proportional to the error
- **Problem:** Persistent offset (steady-state error)
- **Application:** Rarely used alone — usually part of PI/PID

### I — Integral

**Eliminates the steady-state error.** Integrates the deviation over time.

<p class="formel">u<sub>I</sub> = K<sub>i</sub> × ∫ e(t) dt, &nbsp; K<sub>i</sub> = K<sub>p</sub> / T<sub>n</sub></p>

- **Effect:** Corrects until setpoint = actual value
- **Problem:** Slows response, can cause oscillation (wind-up)
- **Tuning:** Reset time T_n in seconds

### D — Derivative

**Responds to the rate of change.** It counteracts fast changes and so dampens overshoot. To keep a setpoint step from causing an output kick, most controllers calculate the D term from the actual value only.

<p class="formel">u<sub>D</sub> = K<sub>d</sub> × de(t)/dt</p>

- **Effect:** Reduces overshoot
- **Problem:** Amplifies noise — often omitted with noisy sensors (PI instead of PID)
- **In HVAC:** rarely needed; most likely for slow processes with several lags

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

Ziegler-Nichols aims at a response with at most about 20 % overshoot. For most HVAC loops that is already rather aggressive.

## Tuning Rules from the Step Response

Without sustained oscillation, a step test on the open loop works: move the output manually by Δy, record the response and read **T<sub>u</sub>** (dead time), **T<sub>g</sub>** (time constant) and **K<sub>S</sub>** = Δx / Δy (process gain) using the inflection tangent. How to do this is in [Control Loops](/wissen/regelkreise).

**Ziegler-Nichols, inflection tangent method:**

| Controller type | K<sub>p</sub>                                         | T<sub>n</sub>       | T<sub>v</sub>       |
| --------------- | ----------------------------------------------------- | ------------------- | ------------------- |
| P               | 1.0 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | —                   | —                   |
| PI              | 0.9 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | 3.3 · T<sub>u</sub> | —                   |
| PID             | 1.2 · T<sub>g</sub> / (K<sub>S</sub> · T<sub>u</sub>) | 2 · T<sub>u</sub>   | 0.5 · T<sub>u</sub> |

**Chien, Hrones and Reswick** (1952) additionally distinguish whether the controller mainly has to reject **disturbances** or follow a **setpoint change**, and whether it should work **without overshoot** (aperiodic) or **with at most 20 %** overshoot. For PI controllers in BA:

| PI controller               | K<sub>p</sub> · K<sub>S</sub> · T<sub>u</sub> / T<sub>g</sub> | T<sub>n</sub>       |
| --------------------------- | ------------------------------------------------------------- | ------------------- |
| Disturbance, aperiodic      | 0.6                                                           | 4 · T<sub>u</sub>   |
| Disturbance, 20 % overshoot | 0.7                                                           | 2.3 · T<sub>u</sub> |
| Setpoint, aperiodic         | 0.35                                                          | 1.2 · T<sub>g</sub> |
| Setpoint, 20 % overshoot    | 0.6                                                           | 1.0 · T<sub>g</sub> |

For PID controllers the values are somewhat higher, with T<sub>v</sub> of about 0.4 to 0.5 · T<sub>u</sub>. In BA the **disturbance response** usually matters most: a room should stay at setpoint despite sun and people; setpoint steps are rare.

**Example supply air temperature:** T<sub>u</sub> = 30 s, T<sub>g</sub> = 180 s, valve 0 → 100 % gives 20 K, so K<sub>S</sub> = 0.2 K/%. Disturbance, aperiodic: K<sub>p</sub> = 0.6 · 180 / (0.2 · 30) = 18 %/K, i.e. an X<sub>p</sub> of 100 / 18 ≈ 5.6 K. T<sub>n</sub> = 4 · 30 s = 2 min.

**Loop gain:** the product V<sub>0</sub> = K<sub>S</sub> · K<sub>p</sub> tells how strongly a signal is amplified in one pass round the loop. The more difficult the process, the smaller V<sub>0</sub> must be before the loop becomes unstable. That is why a controller must be retuned when the process changes, for instance a larger valve or a different coil.

## How Well Does the Loop Control?

After a setpoint step or a disturbance, one assesses:

- **Tolerance band:** the permitted deviation, e.g. 21 °C ± 0.5 K
- **Overshoot:** the largest temporary deviation
- **Rise time:** until the controlled variable first enters the tolerance band
- **Settling time:** until it stays in the tolerance band permanently

In HVAC plants an **aperiodic** response approaching without overshoot is wanted, or a **damped** one with one small overshoot. A well-tuned PI controller has a barely longer rise time but a much shorter settling time than a cautiously tuned one. If it overshoots too much, reduce K<sub>p</sub> (larger X<sub>p</sub>); if it is too sluggish, reduce T<sub>n</sub>.

**P controller and offset:** a pure P controller always has a steady-state deviation, depending on load. Its **operating point** (offset) defines at which load it is exactly at setpoint: at 0 % the setpoint is reached at no load, at 100 % at full load, at 50 % the deviation is symmetrical. Thermostatic radiator valves are such P controllers.

## Xp instead of K_p — what the controller actually shows

Textbooks say **K_p**, the controller in the panel says **Xp**. Both describe
the same thing the other way round: Xp is the **proportional band** — the
deviation needed for the output to travel its full range.

<p class="formel">Xp [%] = 100 / K<sub>p</sub>, &nbsp; K<sub>p</sub> = 100 / Xp [%]</p>

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
slower scan is acceptable. It does not help against sensor noise; that needs a
filter on the measured value, otherwise the noise reaches the actuator through
the derivative term.

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
- **Duct pressure control:** PI with short T_n — fast response required
- **VFDs / pumps:** PI with short T_n
- **When oscillating:** first halve K_p, then double T_n

## Common mistakes

1. **D gain too high** with noisy sensor → actuator chatters
2. **T_n too small** → oscillation buildup
3. **Anti-wind-up forgotten** → integral runs away during prolonged output saturation
4. **Setpoint/actual value swapped** → controller drives in the wrong direction

## Sources

- Siemens Schweiz AG: "Regeltechnik", training document BT_0098, 2022, ch. 5 and 6

## See also

- [Control loops](/wissen/regelkreise)
- [Heating curve](/wissen/heizkurve) — weather-compensated feedforward
- [Cascade control](/wissen/kaskadenregelung)
- [Variable speed drive](/wissen/frequenzumrichter)
