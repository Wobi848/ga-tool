---
title: Zweipunktregelung vs. stetige Regelung
title_en: Two-Position Control vs. Continuous Control
slug: zweipunktregelung
category: regelung
subcategory: regler
tags:
  [
    zweipunktregelung,
    stetige-regelung,
    thermostat,
    hysterese,
    schaltdifferenz,
    pendeln,
    schalthäufigkeit,
    ein-aus,
    bang-bang,
    pid,
    proportional,
    dreipunktregelung
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, steuern-regeln, alarmmanagement, glt-grundlagen]
norm: [IEC 60050-351]
updated: 2026-10-14
lang: de
---

# Zweipunktregelung vs. stetige Regelung

In der GA werden zwei grundlegend verschiedene Regelungsarten eingesetzt: die einfache Zweipunktregelung und die stetige Regelung. Die Wahl bestimmt Regelgüte, Energieverbrauch und Anlagen-Lebenserwartung.

## Zweipunktregelung (EIN/AUS)

### Prinzip

Der Regler kennt nur zwei Zustände: **EIN** oder **AUS**. Eine Hysterese verhindert ständiges Schalten:

Beispiel Heizung, Sollwert 22 °C, Schaltdifferenz 1 K:

- Temperatur sinkt auf 21.5 °C → Heizung EIN
- Temperatur steigt auf 22.5 °C → Heizung AUS

In der Praxis schwankt die Temperatur mehr als die Schaltdifferenz. Nach dem Ausschalten gibt der Heizkörper noch Wärme ab, und nach dem Einschalten dauert es, bis er warm wird. Je grösser die Totzeit der Strecke, desto grösser das Überschwingen.

### Hysterese (Schaltdifferenz)

Die Hysterese ist entscheidend für die Regelqualität:

| Hysterese | Effekt                                             |
| --------- | -------------------------------------------------- |
| Zu klein  | Sehr häufiges Schalten → Verschleiss               |
| Zu gross  | Grosse Temperaturschwankungen → schlechter Komfort |
| Optimal   | Seltenes Schalten, akzeptable Schwankung           |

**Richtwerte:** Raumthermostate 0.5 bis 1 K, Speicherladung 3 bis 5 K. Bei Wärmepumpen und Kältemaschinen bestimmt die Schaltdifferenz zusammen mit Mindestlauf- und Mindeststillstandszeiten, wie oft der Verdichter startet.

### Thermische Stellantriebe und PWM

Thermoelektrische Stellantriebe an Fussbodenheizungs-Verteilern kennen nur AUF und ZU und brauchen einige Minuten zum Öffnen. Viele Raumregler steuern sie mit **Pulsweitenmodulation**: Ein PI-Regler rechnet eine Stellgrösse, zum Beispiel 30 %, und der Ausgang ist dann 30 % einer Zykluszeit eingeschaltet, etwa 5 von 15 Minuten. Bei trägen Strecken wirkt das fast wie eine stetige Regelung.

### Vor- und Nachteile

| Vorteil                    | Nachteil                                    |
| -------------------------- | ------------------------------------------- |
| Einfach (nur 1 Bit)        | Schwingt permanent                          |
| Günstig (einfaches Relais) | Keine Präzision                             |
| Robust                     | Häufige Schaltvorgänge (Relais-Verschleiss) |
| Kein Regler-Tuning nötig   | Energieverschwendung (Überschwingen)        |

### Typische Anwendungen

- Einfache Thermostate (Wohnbereich, elektrische Fussbodenheizung)
- Frost-/Übertemperaturschutz (Grenzwert-Alarme ohne Regelgüte-Anforderung)
- Pumpen-Steuerung (EIN wenn Anforderung, AUS wenn keine)
- Lüftung: EIN/AUS Nachtbetrieb

---

## Stetige Regelung (proportional, PID)

### Prinzip

Der Reglerausgang ist stufenlos zwischen 0 und 100 % einstellbar. Die Stellgrösse ist proportional zur Regelabweichung (plus I- und D-Anteil bei PID):

Beispiel mit Xp = 10 K, also 10 % Stellgrösse je Kelvin:

- Regelabweichung 5 K → Ventil 50 %
- Regelabweichung 2 K → Ventil 20 %
- Regelabweichung 0 K → beim reinen P-Regler Ventil 0 %, beim PI-Regler hält der I-Anteil die nötige Stellung

### P-Regler (Proportional)

<p class="formel">y = K<sub>p</sub> · e</p>

y Stellgrösse in %, K_p Verstärkung, e Regelabweichung (Soll − Ist).

**Problem P-Regler:** Bleibende Regelabweichung. Der Regler findet ein Gleichgewicht bei e ≠ 0 (sonst wäre Y = 0 und nichts heizen).

### PI-Regler (Proportional + Integral)

Der I-Anteil integriert die Abweichung über die Zeit → beseitigt die bleibende Abweichung:

<p class="formel">y = K<sub>p</sub> · e + K<sub>i</sub> · ∫ e dt</p>

Im eingeschwungenen Zustand: e = 0, Y ≠ 0 (gehalten durch Integrator).

→ **PI-Regler** ist der Standard für Temperatur- und Druckregelung in der GA.

---

## Dreipunktregelung

Erweiterung der Zweipunktregelung für motorische Antriebe:

Der Dreipunktausgang hat zwei Relais, AUF und ZU. Liegt keines an, bleibt der Antrieb stehen. Der Motor wirkt dadurch wie ein Integrator: Je länger AUF anliegt, desto weiter öffnet das Ventil.

In der GA steckt hinter einem Dreipunktausgang fast immer ein **Dreipunkt-Schrittregler**: ein PI-Regler, dessen Ausgang in Auf- und Zu-Impulse umgerechnet wird. Er braucht dafür die **Laufzeit** des Antriebs, also die Zeit von ganz zu bis ganz offen. Gut eingestellt regelt er fast so gut wie ein stetiger Regler.

**Typisch für:** motorische Antriebe ohne Stellungsrückmeldung, an Ventilen und Klappen

**Laufzeit:** typisch 30 bis 150 s. Stimmt die eingestellte Laufzeit nicht mit dem Antrieb überein, rechnet der Regler mit einer falschen Stellung. Damit sich der Fehler nicht aufsummiert, fahren viele Regler in den Endlagen etwas länger nach und synchronisieren so.

---

## Vergleich auf einen Blick

| Merkmal             | Zweipunkt                   | Dreipunkt             | Stetig (PI)      |
| ------------------- | --------------------------- | --------------------- | ---------------- |
| Ausgangssignal      | 0/1 (Relais)                | Auf/Zu/Stop           | 0–10 V / 4–20 mA |
| Regelgüte           | Schlecht                    | Gut als Schrittregler | Gut              |
| Kosten              | Sehr gering                 | Gering                | Mittel           |
| Ventil-/Antriebstyp | Thermischer Antrieb, Schütz | 3-Punkt-Motor         | Stetigantrieb    |
| Verschleiss         | Relais (hoch)               | Motor (mittel)        | Antrieb (gering) |
| Einstellung         | Schaltdifferenz             | Xp, Tn, Laufzeit      | Xp, Tn           |
| Typischer Einsatz   | Thermostat, FBH             | Heizkreis, Klappe     | Lüftung, Klima   |

---

## Entscheidungshilfe

1. **Muss die Grösse genau gehalten werden**, etwa Zulufttemperatur auf ±0.5 K? → stetiger PI-Regler mit 0–10-V-Antrieb oder Dreipunkt-Schrittregler.
2. **Ist ein Dreipunktantrieb vorhanden** oder günstiger? → Dreipunkt-Schrittregler mit richtig eingestellter Laufzeit.
3. **Ist ein thermischer Stellantrieb verbaut**, etwa bei Fussbodenheizung? → Zweipunkt oder PWM.
4. **Reichen ±1 K und ist die Strecke träge**? → Zweipunkt mit Schaltdifferenz.

## Normen

- **IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch, Leittechnik

<!-- EN -->

Two fundamentally different control types are used in BA: the simple two-position control and continuous control. The choice determines control quality, energy consumption, and plant service life.

## Two-Position Control (ON/OFF)

### Principle

The controller has only two states: **ON** or **OFF**. A hysteresis band prevents constant switching:

Example heating, setpoint 22 °C, switching differential 1 K:

- temperature falls to 21.5 °C → heating ON
- temperature rises to 22.5 °C → heating OFF

In practice the temperature swings more than the switching differential. After switching off the radiator still gives off heat, and after switching on it takes time to warm up. The larger the dead time of the process, the larger the overshoot.

### Hysteresis (Switching Differential)

The hysteresis is decisive for control quality:

| Hysteresis | Effect                                     |
| ---------- | ------------------------------------------ |
| Too small  | Very frequent switching → wear             |
| Too large  | Large temperature swings → poor comfort    |
| Optimal    | Infrequent switching, acceptable variation |

**Guide values:** room thermostats 0.5 to 1 K, storage charging 3 to 5 K. For heat pumps and chillers, the switching differential together with minimum run and off times determines how often the compressor starts.

### Thermal Actuators and PWM

Thermoelectric actuators on underfloor heating manifolds only know OPEN and CLOSED and take a few minutes to open. Many room controllers drive them with **pulse-width modulation**: a PI controller calculates an output, for example 30 %, and the output is then on for 30 % of a cycle time, about 5 of 15 minutes. With slow processes this acts almost like modulating control.

### Advantages and Disadvantages

| Advantage                     | Disadvantage                    |
| ----------------------------- | ------------------------------- |
| Simple (only 1 bit)           | Permanent oscillation           |
| Low cost (simple relay)       | No precision                    |
| Robust                        | Frequent switching (relay wear) |
| No controller tuning required | Energy waste (overshoot)        |

### Typical Applications

- Simple thermostats (residential, electric underfloor heating)
- Frost/overtemperature protection (limit alarms without precision requirement)
- Pump control (ON when demand, OFF when none)
- Ventilation: ON/OFF night operation

---

## Continuous Control (Proportional, PID)

### Principle

The controller output is continuously adjustable between 0 and 100%. The control output is proportional to the control error (plus I and D components for PID):

Example with Xp = 10 K, i.e. 10 % output per kelvin:

- control error 5 K → valve 50 %
- control error 2 K → valve 20 %
- control error 0 K → with a pure P controller valve 0 %; with a PI controller the I term holds the required position

### P Controller (Proportional)

<p class="formel">y = K<sub>p</sub> · e</p>

y output in %, K_p gain, e control error (setpoint − actual).

**Problem with P controller:** Persistent offset. The controller settles at e ≠ 0 (otherwise Y = 0 and nothing heats).

### PI Controller (Proportional + Integral)

The I component integrates the error over time → eliminates the persistent offset:

<p class="formel">y = K<sub>p</sub> · e + K<sub>i</sub> · ∫ e dt</p>

At steady state: e = 0, Y ≠ 0 (maintained by integrator).

→ **PI controller** is the standard for temperature and pressure control in BA.

---

## Three-Position Control

Extension of two-position control for motorised actuators:

The three-point output has two relays, OPEN and CLOSE. When neither is active, the actuator stops. The motor therefore acts like an integrator: the longer OPEN is applied, the further the valve opens.

In BA a three-point output almost always hides a **three-point step controller**: a PI controller whose output is converted into open and close pulses. It needs the **running time** of the actuator, the time from fully closed to fully open. Well tuned, it controls almost as well as a modulating controller.

**Typical for:** motorised actuators without position feedback, on valves and dampers

**Running time:** typically 30 to 150 s. If the set running time does not match the actuator, the controller works with a wrong position. To keep the error from accumulating, many controllers drive a little longer at the end positions and so resynchronise.

---

## Comparison at a Glance

| Feature             | Two-position                | Three-position          | Continuous (PI)               |
| ------------------- | --------------------------- | ----------------------- | ----------------------------- |
| Output signal       | 0/1 (relay)                 | Open/close/stop         | 0–10 V / 4–20 mA              |
| Control quality     | Poor                        | Good as step controller | Good                          |
| Cost                | Very low                    | Low                     | Medium                        |
| Valve/actuator type | Thermal actuator, contactor | 3-point motor           | Modulating actuator           |
| Wear                | Relay (high)                | Motor (medium)          | Actuator (low)                |
| Settings            | Switching differential      | Xp, Tn, running time    | Xp, Tn                        |
| Typical use         | Thermostat, UFH             | Heating circuit, damper | Ventilation, air conditioning |

---

## Decision Guide

1. **Must the variable be held precisely**, such as supply air temperature to ±0.5 K? → modulating PI controller with 0–10 V actuator or three-point step controller.
2. **Is a three-point actuator installed** or cheaper? → three-point step controller with correctly set running time.
3. **Is a thermal actuator installed**, for example with underfloor heating? → on/off or PWM.
4. **Is ±1 K enough and the process slow?** → on/off with switching differential.

## Standards

- **IEC 60050-351** — International Electrotechnical Vocabulary, control technology
