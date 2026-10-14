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

Kombiniert ergeben beide das beste Ergebnis: Die Vorsteuerung liefert schnell den grössten Teil, die Rückführung korrigiert den Rest.

<figure class="schema"><svg viewBox="0 0 640 230" role="img" aria-label="Störgrössenaufschaltung: Die gemessene Störgrösse wirkt über einen Aufschaltblock direkt auf die Stellgrösse, parallel zum Regler" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 130L60 130"/><path d="M60 130L52.0 134.0L52.0 126.0Z" fill="currentColor" stroke="none"/><circle cx="70" cy="130" r="10"/><path d="M63.0 123.0L77.0 137.0M63.0 137.0L77.0 123.0" stroke-width="1.2"/><path d="M80 130L110 130"/><path d="M110 130L102.0 134.0L102.0 126.0Z" fill="currentColor" stroke="none"/><rect x="110" y="106" width="96" height="48" rx="6"/><path d="M206 130L258 130"/><path d="M258 130L250.0 134.0L250.0 126.0Z" fill="currentColor" stroke="none"/><circle cx="268" cy="130" r="10"/><path d="M262 130H274M268 124V136" stroke-width="1.4"/><path d="M278 130L320 130"/><path d="M320 130L312.0 134.0L312.0 126.0Z" fill="currentColor" stroke="none"/><rect x="320" y="106" width="96" height="48" rx="6"/><path d="M416 130L458 130"/><path d="M458 130L450.0 134.0L450.0 126.0Z" fill="currentColor" stroke="none"/><rect x="458" y="106" width="96" height="48" rx="6"/><path d="M554 130L630 130"/><path d="M630 130L622.0 134.0L622.0 126.0Z" fill="currentColor" stroke="none"/><path d="M506 26L506 106"/><path d="M506 106L502.0 98.0L510.0 98.0Z" fill="currentColor" stroke="none"/><circle cx="506" cy="48" r="3" fill="currentColor"/><rect x="220" y="30" width="124" height="40" rx="6"/><path d="M506 48L344 48"/><path d="M344 48L352.0 44.0L352.0 52.0Z" fill="currentColor" stroke="none"/><path d="M268 70L268 120"/><path d="M268 120L264.0 112.0L272.0 112.0Z" fill="currentColor" stroke="none"/><circle cx="600" cy="130" r="3" fill="currentColor"/><path d="M600 130L600 200L70 200L70 140"/><path d="M70 140L74.0 148.0L66.0 148.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="8" y="120" text-anchor="start" font-size="12" font-weight="600">w</text><text x="61" y="152" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="95" y="122" text-anchor="middle" font-size="11.5" font-style="italic">e</text><text x="158.0" y="128.0" text-anchor="middle" font-size="12.5" font-weight="600">Regler</text><text x="158.0" y="142.0" text-anchor="middle" font-size="10.5">PI</text><text x="230" y="122" text-anchor="middle" font-size="11.5" font-style="italic">y<tspan font-size="8.5" dy="3">R</tspan></text><text x="299" y="122" text-anchor="middle" font-size="11.5" font-style="italic">y</text><text x="368.0" y="134.0" text-anchor="middle" font-size="12.5" font-weight="600">Stellglied</text><text x="506.0" y="134.0" text-anchor="middle" font-size="12.5" font-weight="600">Strecke</text><text x="628" y="122" text-anchor="end" font-size="11.5" font-style="italic">x</text><text x="506" y="18" text-anchor="middle" font-size="11">Störgrösse z, gemessen</text><text x="282.0" y="54.0" text-anchor="middle" font-size="12.5" font-weight="600">Aufschaltung</text><text x="276" y="96" font-size="11.5" font-style="italic">y<tspan font-size="8.5" dy="3">z</tspan></text></g></svg><figcaption>Störgrössenaufschaltung: Die gemessene Störgrösse z wird über die Aufschaltung direkt zur Stellgrösse addiert. Der Regler korrigiert nur noch, was die Aufschaltung nicht trifft.</figcaption></figure>

---

## Störgrössenaufschaltung (Disturbance Feedforward)

Eine bekannte **Störgrösse** wird gemessen und ihr Einfluss auf die Regelgrösse direkt kompensiert — der PID muss die Störung nicht erst ausregeln.

### Praxisbeispiel: Aussentemperatur auf Raumheizung

Die Aussentemperatur θ_a wird gemessen. Die Aufschaltung rechnet daraus einen Anteil der Ventilstellung und addiert ihn zum Ausgang des Raumreglers.

**Ohne Aufschaltung:** TA fällt → Raum kühlt ab → e steigt → PID erhöht Ventil — Verzögerung durch Trägheit der Heizfläche.

**Mit Aufschaltung:** TA fällt → sofort Ventilöffnung erhöhen → Raum bleibt stabil → PID hat nur noch Feinkorrektur zu leisten.

### Dimensionierung der Aufschaltung

Der Aufschaltfaktor bestimmt, wie stark die Stellgrösse auf die Störung reagiert:

<p class="formel">y<sub>z</sub> = K<sub>z</sub> · (θ<sub>i,Soll</sub> − θ<sub>a</sub>)</p>

K_z stellt man bei der Inbetriebnahme ein oder schätzt ihn aus der Heizlast: Bei Auslegungs-Aussentemperatur, zum Beispiel −8 °C, soll die Aufschaltung allein ungefähr die nötige Ventilstellung liefern. Der Regler gleicht den Rest aus.

---

## Sollwertaufschaltung (Setpoint Feedforward)

Bei **Führungsgrössenänderungen** (z.B. Sollwertsprung) wird die Stellgrösse sofort vorgesteuert:

1. Der Sollwert springt von 20 auf 22 °C.
2. Die Vorsteuerung setzt die Stellgrösse sofort um K_w · Δw höher. K_w ist ungefähr der Kehrwert der Streckenverstärkung.
3. Der Regler korrigiert nur noch die Abweichung, die übrig bleibt.

Verhindert das "Nachhinken" des PID bei Sollwertänderungen. Besonders relevant bei trägen Strecken (Fussbodenheizung, Grosse Räume).

---

## Witterungsgeführte Regelung als Vorsteuerung

Die **Heizkurve** (witterungsgeführte Vorlauftemperatur) ist das klassische GA-Beispiel für Vorsteuerung:

<p class="formel">θ<sub>VL,Soll</sub> = f(θ<sub>a</sub>, θ<sub>i,Soll</sub>, Steilheit, Parallelverschiebung)</p>

Der Vorlaufregler, ein PI-Regler mit Mischventil, hält diesen Sollwert.

Der Raumregler ist in vielen Heizungsanlagen nur noch ein Korrekturgrössen-Regler auf die Heizkurve: Er verschiebt die Heizkurve nach oben/unten (+/− Parallelverschiebung), aber die Grundregelung erfolgt feedforward über die TA.

---

## Kombination: Kaskaden-Regler mit Aufschaltung

In der professionellen GA werden Kaskadenregelung und Aufschaltung kombiniert:

1. Die Heizkurve berechnet aus der Aussentemperatur den Vorlauf-Sollwert. Das ist die Vorsteuerung.
2. Der **Vorlaufregler** hält diesen Sollwert über das Mischventil. Er ist der schnelle, innere Regler.
3. Ein **Raumregler** verschiebt den Sollwert, wenn der Raum dauerhaft vom Soll abweicht. Er ist der langsame, äussere Regler.

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

Combined, both give the best result: the feedforward quickly supplies most of the output, the feedback corrects the rest.

<figure class="schema"><svg viewBox="0 0 640 230" role="img" aria-label="Disturbance feedforward: the measured disturbance acts directly on the output through a feedforward block, in parallel with the controller" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 130L60 130"/><path d="M60 130L52.0 134.0L52.0 126.0Z" fill="currentColor" stroke="none"/><circle cx="70" cy="130" r="10"/><path d="M63.0 123.0L77.0 137.0M63.0 137.0L77.0 123.0" stroke-width="1.2"/><path d="M80 130L110 130"/><path d="M110 130L102.0 134.0L102.0 126.0Z" fill="currentColor" stroke="none"/><rect x="110" y="106" width="96" height="48" rx="6"/><path d="M206 130L258 130"/><path d="M258 130L250.0 134.0L250.0 126.0Z" fill="currentColor" stroke="none"/><circle cx="268" cy="130" r="10"/><path d="M262 130H274M268 124V136" stroke-width="1.4"/><path d="M278 130L320 130"/><path d="M320 130L312.0 134.0L312.0 126.0Z" fill="currentColor" stroke="none"/><rect x="320" y="106" width="96" height="48" rx="6"/><path d="M416 130L458 130"/><path d="M458 130L450.0 134.0L450.0 126.0Z" fill="currentColor" stroke="none"/><rect x="458" y="106" width="96" height="48" rx="6"/><path d="M554 130L630 130"/><path d="M630 130L622.0 134.0L622.0 126.0Z" fill="currentColor" stroke="none"/><path d="M506 26L506 106"/><path d="M506 106L502.0 98.0L510.0 98.0Z" fill="currentColor" stroke="none"/><circle cx="506" cy="48" r="3" fill="currentColor"/><rect x="220" y="30" width="124" height="40" rx="6"/><path d="M506 48L344 48"/><path d="M344 48L352.0 44.0L352.0 52.0Z" fill="currentColor" stroke="none"/><path d="M268 70L268 120"/><path d="M268 120L264.0 112.0L272.0 112.0Z" fill="currentColor" stroke="none"/><circle cx="600" cy="130" r="3" fill="currentColor"/><path d="M600 130L600 200L70 200L70 140"/><path d="M70 140L74.0 148.0L66.0 148.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="8" y="120" text-anchor="start" font-size="12" font-weight="600">w</text><text x="61" y="152" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="95" y="122" text-anchor="middle" font-size="11.5" font-style="italic">e</text><text x="158.0" y="128.0" text-anchor="middle" font-size="12.5" font-weight="600">Controller</text><text x="158.0" y="142.0" text-anchor="middle" font-size="10.5">PI</text><text x="230" y="122" text-anchor="middle" font-size="11.5" font-style="italic">y<tspan font-size="8.5" dy="3">C</tspan></text><text x="299" y="122" text-anchor="middle" font-size="11.5" font-style="italic">y</text><text x="368.0" y="134.0" text-anchor="middle" font-size="12.5" font-weight="600">Actuator</text><text x="506.0" y="134.0" text-anchor="middle" font-size="12.5" font-weight="600">Process</text><text x="628" y="122" text-anchor="end" font-size="11.5" font-style="italic">x</text><text x="506" y="18" text-anchor="middle" font-size="11">Disturbance z, measured</text><text x="282.0" y="54.0" text-anchor="middle" font-size="12.5" font-weight="600">Feedforward</text><text x="276" y="96" font-size="11.5" font-style="italic">y<tspan font-size="8.5" dy="3">z</tspan></text></g></svg><figcaption>Disturbance feedforward: the measured disturbance z is added directly to the output through the feedforward block. The controller only corrects what the feedforward misses.</figcaption></figure>

---

## Disturbance Feedforward

A known **disturbance** is measured and its influence on the controlled variable is directly compensated — the PID does not need to wait for the disturbance to cause an error first.

### Practical Example: Outdoor Temperature on Room Heating

The outdoor temperature θ_a is measured. The feedforward calculates a share of the valve position from it and adds it to the room controller output.

**Without feedforward:** TA drops → room cools down → error rises → PID increases valve — delay due to heating surface inertia.

**With feedforward:** TA drops → valve opening increased immediately → room stays stable → PID only needs fine correction.

### Sizing the Feedforward Gain

The feedforward factor determines how strongly the control output reacts to the disturbance:

<p class="formel">y<sub>z</sub> = K<sub>z</sub> · (θ<sub>i,set</sub> − θ<sub>a</sub>)</p>

K_z is set during commissioning or estimated from the heating load: at the design outdoor temperature, for example −8 °C, the feedforward alone should deliver roughly the required valve position. The controller makes up the rest.

---

## Setpoint Feedforward

With **reference variable changes** (e.g. setpoint step), the control output is immediately pre-positioned:

1. The setpoint jumps from 20 to 22 °C.
2. The feedforward immediately raises the output by K_w · Δw. K_w is roughly the inverse of the process gain.
3. The controller only corrects the remaining deviation.

Prevents the PID from "lagging behind" during setpoint changes. Particularly relevant for slow plants (underfloor heating, large rooms).

---

## Weather-Compensated Control as Feedforward

The **heating curve** (weather-compensated flow temperature) is the classic BA example of feedforward control:

<p class="formel">θ<sub>flow,set</sub> = f(θ<sub>a</sub>, θ<sub>i,set</sub>, slope, parallel shift)</p>

The flow controller, a PI controller with mixing valve, holds this setpoint.

In many heating systems the room controller is now only a correction controller on top of the heating curve: it shifts the heating curve up/down (±parallel shift), but the basic control is done feedforward via TA.

---

## Combination: Cascade Controller with Feedforward

In professional BA, cascade control and feedforward are combined:

1. The heating curve calculates the flow setpoint from the outdoor temperature. That is the feedforward.
2. The **flow controller** holds this setpoint via the mixing valve. It is the fast, inner controller.
3. A **room controller** shifts the setpoint when the room deviates from its setpoint for a long time. It is the slow, outer controller.

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
