---
title: Vorsteuerung und Störgrössenaufschaltung
title_en: Feedforward Control and Disturbance Compensation
slug: vorsteuerung-aufschaltung
category: regelung
subcategory: regelstrategien
tags:
  [
    vorsteuerung,
    störgrössenaufschaltung,
    feedforward,
    aufschaltung,
    witterungsführung,
    aussentemperatur,
    heizkurve,
    pid-erweiterung,
    kompensation,
    vorhaltezeit,
    führungsgrösse,
    steuerung-regelung
  ]
difficulty: fortgeschritten
area: [ga, hlk]
related: [pid-regler, kaskadenregelung, heizkurve, sollwertfuehrung, regelkreise]
rechner: []
norm: [VDI 3814, IEC 61131-3]
updated: 2026-05-15
lang: de
---

# Vorsteuerung und Störgrössenaufschaltung

Reine PID-Regelung reagiert immer erst, **nachdem** eine Abweichung (Regelabweichung e) entstanden ist. **Vorsteuerung** und **Störgrössenaufschaltung** ergänzen den Regelkreis um prädiktive Elemente, die bekannte Stör- oder Führungsgrössen direkt kompensieren — bevor die Regelgrösse abweicht.

---

## Prinzip: Feedback vs. Feedforward

| Ansatz                     | Reaktion                                 | Voraussetzung                          |
| -------------------------- | ---------------------------------------- | -------------------------------------- |
| Feedback (PID)             | Reagiert auf Regelabweichung             | Keine — universell                     |
| Feedforward (Vorsteuerung) | Reagiert auf Stör-/Führungsgrösse direkt | Messung der Stör-/Führungsgrösse nötig |

Beide Ansätze kombiniert ergeben das beste Ergebnis:

```
Sollwert w(t)  ─────────────────────────────────► Σ
                                                   │
Führungsgrösse → Vorsteuerblock → u_VS(t) ─────────►  Strecke → y(t)
                                                   │              │
                                    PID ◄──────────── e(t) ◄──────┘
```

---

## Störgrössenaufschaltung (Disturbance Feedforward)

Eine bekannte **Störgrösse** wird gemessen und ihr Einfluss auf die Regelgrösse direkt kompensiert — der PID muss die Störung nicht erst ausregeln.

### Praxisbeispiel: Aussentemperatur auf Raumheizung

```
Aussentemperatur TA (Messung)
         │
    Aufschaltblock: u_AS = f(TA)
         │
         ▼
    PID-Ausgang u_PID
         │
    Σ → Stellgrösse → Heizventil
```

**Ohne Aufschaltung:** TA fällt → Raum kühlt ab → e steigt → PID erhöht Ventil — Verzögerung durch Trägheit der Heizfläche.

**Mit Aufschaltung:** TA fällt → sofort Ventilöffnung erhöhen → Raum bleibt stabil → PID hat nur noch Feinkorrektur zu leisten.

### Dimensionierung der Aufschaltung

Der Aufschaltfaktor bestimmt, wie stark die Stellgrösse auf die Störung reagiert:

```
u_AS = K_AS × (TA_Nenn − TA)

K_AS: empirisch eingestellt (Inbetriebnahme) oder berechnet aus Gebäudemodell
TA_Nenn: Auslegungs-Aussentemperatur (z.B. −8°C)
```

---

## Sollwertaufschaltung (Setpoint Feedforward)

Bei **Führungsgrössenänderungen** (z.B. Sollwertsprung) wird die Stellgrösse sofort vorgesteuert:

```
Sollwert-Sprung von 20°C → 22°C
     │
Vorsteuerblock: u_VS = K_VS × Δw
     │
Stellgrösse springt sofort auf höheres Niveau
     │
PID passt fein nach
```

Verhindert das "Nachhinken" des PID bei Sollwertänderungen. Besonders relevant bei trägen Strecken (Fussbodenheizung, Grosse Räume).

---

## Witterungsgeführte Regelung als Vorsteuerung

Die **Heizkurve** (witterungsgeführte Vorlauftemperatur) ist das klassische GA-Beispiel für Vorsteuerung:

```
TA (Aussentemperatur)
     │
Heizkurve-Kennlinie:
  TV_Soll = f(TA, Raumtemperatur-Soll, Steilheit)
     │
Vorlauftemperatur-Regler (PID, Stellgrösse: Mischventil)
```

Der Raumregler ist in vielen Heizungsanlagen nur noch ein Korrekturgrössen-Regler auf die Heizkurve: Er verschiebt die Heizkurve nach oben/unten (+/− Parallelverschiebung), aber die Grundregelung erfolgt feedforward über die TA.

---

## Kombination: Kaskaden-Regler mit Aufschaltung

In der professionellen GA werden Kaskadenregelung und Aufschaltung kombiniert:

```
TA → Heizkurve → TV_Soll (Führungsgrösse für Vorlaufregler)
                    │
              Vorlaufregler (Meister-PID)
                    │
              TV_Ist ◄────── Vorlauftemperatur-Messung
                    │
              Ventilstellung → Heizkreis
```

Der Vorlaufregler übernimmt die schnelle, witterungsgeführte Grundregelung; ein übergeordneter Raumregler verschiebt den Sollwert bei dauerhafter Raumabweichung.

---

## Inbetriebnahme-Hinweise

1. **Aufschaltfaktor K_AS zuerst auf 0** einstellen — reine PID-Regelung als Ausgangszustand
2. Wenn stabile PID-Einstellung gefunden: K_AS schrittweise erhöhen
3. Prüfen ob Regelabweichung bei Störungsänderungen kleiner wird
4. Zu grosse Aufschaltung führt zu Überschwingen (Kompensation zu stark)
5. Vorzeichen der Aufschaltung prüfen! Falsche Richtung verschlimmert die Störung

---

## Abgrenzung: Vorsteuerung vs. Kaskadenregelung

| Merkmal          | Vorsteuerung                         | Kaskadenregelung                                     |
| ---------------- | ------------------------------------ | ---------------------------------------------------- |
| Funktionsprinzip | Addiert Kompensation zur Stellgrösse | Übergeordneter Regler setzt Sollwert für Unterregler |
| Rückkopplung     | Keine (open loop)                    | Ja (geschlossener Kreis)                             |
| Genauigkeit      | Abhängig von Modellgüte              | Selbstkorrigierend                                   |
| Einsatz          | Bekannte, messbare Störgrössen       | Mehrstufige Strecken                                 |

<!-- EN -->

Pure PID control always reacts **after** a deviation (control error e) has already developed. **Feedforward control** and **disturbance feedforward** extend the control loop with predictive elements that directly compensate for known disturbances or reference variables — before the controlled variable deviates.

---

## Principle: Feedback vs. Feedforward

| Approach       | Reaction                                          | Prerequisite                                  |
| -------------- | ------------------------------------------------- | --------------------------------------------- |
| Feedback (PID) | Reacts to control error                           | None — universal                              |
| Feedforward    | Reacts directly to disturbance/reference variable | Measurement of disturbance/reference required |

Both approaches combined give the best result:

```
Setpoint w(t)  ─────────────────────────────────► Σ
                                                   │
Reference var. → Feedforward block → u_FF(t) ──────►  Plant → y(t)
                                                   │              │
                                    PID ◄──────────── e(t) ◄──────┘
```

---

## Disturbance Feedforward

A known **disturbance** is measured and its influence on the controlled variable is directly compensated — the PID does not need to wait for the disturbance to cause an error first.

### Practical Example: Outdoor Temperature on Room Heating

```
Outdoor temperature TA (measurement)
         │
    Feedforward block: u_FF = f(TA)
         │
         ▼
    PID output u_PID
         │
    Σ → Control output → heating valve
```

**Without feedforward:** TA drops → room cools down → error rises → PID increases valve — delay due to heating surface inertia.

**With feedforward:** TA drops → valve opening increased immediately → room stays stable → PID only needs fine correction.

### Sizing the Feedforward Gain

The feedforward factor determines how strongly the control output reacts to the disturbance:

```
u_FF = K_FF × (TA_design − TA)

K_FF: set empirically (commissioning) or calculated from building model
TA_design: design outdoor temperature (e.g. −8 °C)
```

---

## Setpoint Feedforward

With **reference variable changes** (e.g. setpoint step), the control output is immediately pre-positioned:

```
Setpoint step from 20 °C → 22 °C
     │
Feedforward block: u_FF = K_FF × Δw
     │
Control output jumps immediately to higher level
     │
PID fine-tunes afterwards
```

Prevents the PID from "lagging behind" during setpoint changes. Particularly relevant for slow plants (underfloor heating, large rooms).

---

## Weather-Compensated Control as Feedforward

The **heating curve** (weather-compensated flow temperature) is the classic BA example of feedforward control:

```
TA (outdoor temperature)
     │
Heating curve characteristic:
  T_flow_setpoint = f(TA, room temp setpoint, slope)
     │
Flow temperature controller (PID, control output: mixing valve)
```

In many heating systems the room controller is now only a correction controller on top of the heating curve: it shifts the heating curve up/down (±parallel shift), but the basic control is done feedforward via TA.

---

## Combination: Cascade Controller with Feedforward

In professional BA, cascade control and feedforward are combined:

```
TA → Heating curve → T_flow_setpoint (reference for flow controller)
                    │
              Flow controller (master PID)
                    │
              T_flow_actual ◄────── Flow temperature measurement
                    │
              Valve position → heating circuit
```

The flow controller handles fast, weather-compensated base control; an outer room controller shifts the setpoint when a persistent room deviation occurs.

---

## Commissioning Notes

1. **Set feedforward gain K_FF to 0 first** — pure PID control as starting point
2. Once stable PID tuning is found: increase K_FF gradually
3. Check that control error at disturbance changes is reduced
4. Too large a feedforward gain causes overshoot (over-compensation)
5. Check the sign of the feedforward! Wrong direction makes the disturbance worse

---

## Feedforward vs. Cascade Control

| Feature             | Feedforward                         | Cascade control                                     |
| ------------------- | ----------------------------------- | --------------------------------------------------- |
| Operating principle | Adds compensation to control output | Outer controller sets setpoint for inner controller |
| Feedback            | None (open loop)                    | Yes (closed loop)                                   |
| Accuracy            | Depends on model quality            | Self-correcting                                     |
| Application         | Known, measurable disturbances      | Multi-stage plants                                  |
