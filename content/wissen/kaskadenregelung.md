---
title: Kaskadenregelung und Führungsregelung
title_en: Cascade Control and Feedforward Control
slug: kaskadenregelung
category: regelung
subcategory: regler
tags:
  [
    kaskadenregelung,
    führungsregelung,
    übergeordneter-regler,
    untergeordneter-regler,
    master-slave,
    vorlauftemperatur,
    aussentemperatur,
    heizkurve,
    raumtemperatur,
    witterungsführung,
    gleitender-sollwert
  ]
difficulty: fortgeschritten
area: [ga, hlk]
related:
  [pid-regler, steuern-regeln, regelkreise, vorsteuerung-aufschaltung, heizkurve, zonendruckhaltung]
rechner: [pid-simulator]
norm: [IEC 60050-351]
updated: 2026-10-14
lang: de
---

# Kaskadenregelung und Führungsregelung

Manche Strecken sind für einen einzelnen Regler zu träge oder zu störanfällig. Eine **Kaskade** teilt die Aufgabe auf zwei Regler auf: einen schnellen inneren und einen langsamen äusseren.

## Prinzip

Der **äussere Regler** (Master, Führungsregler) regelt das eigentliche Ziel, zum Beispiel die Raumtemperatur. Sein Ausgang ist kein Stellsignal, sondern der **Sollwert für den inneren Regler** (Slave, Folgeregler). Der innere Regler regelt eine schnelle Zwischengrösse, zum Beispiel die Vorlauftemperatur, und bewegt das Stellglied.

<figure class="schema"><svg viewBox="0 0 860 236" role="img" aria-label="Kaskadenregelung: Raumregler gibt dem Vorlaufregler den Sollwert vor; innerer Kreis über die Vorlauftemperatur, äusserer über die Raumtemperatur" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 92L70 92"/><path d="M70 92L62.0 96.0L62.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="80" cy="92" r="10"/><path d="M73.0 85.0L87.0 99.0M73.0 99.0L87.0 85.0" stroke-width="1.2"/><path d="M90 92L112 92"/><path d="M112 92L104.0 96.0L104.0 88.0Z" fill="currentColor" stroke="none"/><rect x="112" y="66" width="118" height="52" rx="6"/><path d="M230 92L330 92"/><path d="M330 92L322.0 96.0L322.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="340" cy="92" r="10"/><path d="M333.0 85.0L347.0 99.0M333.0 99.0L347.0 85.0" stroke-width="1.2"/><path d="M350 92L370 92"/><path d="M370 92L362.0 96.0L362.0 88.0Z" fill="currentColor" stroke="none"/><rect x="370" y="66" width="118" height="52" rx="6"/><path d="M488 92L510 92"/><path d="M510 92L502.0 96.0L502.0 88.0Z" fill="currentColor" stroke="none"/><rect x="510" y="66" width="110" height="52" rx="6"/><path d="M620 92L642 92"/><path d="M642 92L634.0 96.0L634.0 88.0Z" fill="currentColor" stroke="none"/><rect x="642" y="66" width="84" height="52" rx="6"/><path d="M726 92L758 92"/><path d="M758 92L750.0 96.0L750.0 88.0Z" fill="currentColor" stroke="none"/><rect x="758" y="66" width="84" height="52" rx="6"/><path d="M842 92L856 92"/><circle cx="742" cy="92" r="3" fill="currentColor"/><path d="M742 92L742 160L340 160L340 102"/><path d="M340 102L344.0 110.0L336.0 110.0Z" fill="currentColor" stroke="none"/><circle cx="852" cy="92" r="3" fill="currentColor"/><path d="M852 92L852 212L80 212L80 102"/><path d="M80 102L84.0 110.0L76.0 110.0Z" fill="currentColor" stroke="none"/><rect x="324" y="46" width="426" height="128" rx="10" stroke-dasharray="4 4" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="8" y="82" text-anchor="start" font-size="11" font-weight="600">Raum-Soll w</text><text x="71" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="171.0" y="90.0" text-anchor="middle" font-size="12.5" font-weight="600">Raumregler</text><text x="171.0" y="104.0" text-anchor="middle" font-size="10.5">Master</text><text x="285" y="82" text-anchor="middle" font-size="10.5" font-style="italic">Vorlauf-Soll</text><text x="331" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="429.0" y="90.0" text-anchor="middle" font-size="12.5" font-weight="600">Vorlaufregler</text><text x="429.0" y="104.0" text-anchor="middle" font-size="10.5">Slave</text><text x="565.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Mischventil</text><text x="684.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Vorlauf</text><text x="800.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Raum</text><text x="540" y="154" text-anchor="middle" font-size="10.5">Vorlauftemperatur, schnell</text><text x="486" y="206" text-anchor="middle" font-size="10.5">Raumtemperatur, langsam</text><text x="332" y="40" text-anchor="start" font-size="10.5" font-style="italic">innerer Kreis</text></g></svg><figcaption>Kaskade: Der äussere Raumregler gibt den Sollwert für den inneren Vorlaufregler vor. Der innere Kreis fängt Störungen im Vorlauf ab, bevor der Raum sie merkt.</figcaption></figure>

**Warum das besser ist:** Ändert sich die Kesseltemperatur oder der Druck im Netz, merkt der innere Regler das in Sekunden und korrigiert, lange bevor der Raum etwas spürt. Der äussere Regler muss sich nur noch um die langsame Raumtemperatur kümmern.

## Beispiele in der GA

| Kaskade                 | Äusserer Regler (langsam)   | Innerer Regler (schnell)   | Stellglied             |
| ----------------------- | --------------------------- | -------------------------- | ---------------------- |
| **Raum – Vorlauf**      | Raumtemperatur              | Vorlauftemperatur          | Mischventil            |
| **Raum – Zuluft**       | Raum- oder Ablufttemperatur | Zulufttemperatur           | Heiz- und Kühlregister |
| **Raum – Volumenstrom** | Raumtemperatur oder CO₂     | Volumenstrom im VAV-Regler | Klappe                 |
| **Speicher – Ladung**   | Speichertemperatur          | Ladetemperatur             | Ventil oder Pumpe      |

Bei der **Raum-Zuluft-Kaskade** gehört eine **Begrenzung der Zulufttemperatur** dazu, zum Beispiel 16 bis 28 °C. Ohne sie verlangt der Raumregler bei grosser Abweichung Zuluft, die Zug verursacht oder das Register vereist.

**Raumdruck** ist kein guter Kandidat für eine langsame äussere Schleife. Er reagiert in Sekunden auf jede Türöffnung. Oft ist es stabiler, einen festen Unterschied zwischen Zu- und Abluftvolumenstrom einzustellen und den Druck nur zu überwachen. Siehe [Zonendruckhaltung](/wissen/zonendruckhaltung).

## Witterungsgeführte Vorlauftemperatur

Die Heizkurve ist mit der Kaskade verwandt, aber keine Kaskade. Aus der **Aussentemperatur**, der wichtigsten Störgrösse, wird der Vorlauf-Sollwert berechnet. Der Vorlaufregler hält diesen Sollwert. Ein Raumfühler ist nicht nötig.

Mit Raumfühler entsteht eine Mischform:

1. Die Heizkurve liefert den **Grundwert** des Vorlauf-Sollwerts.
2. Ein Raumregler addiert eine **Korrektur**, typisch begrenzt auf einige Kelvin.
3. Der Vorlaufregler hält den so berechneten Sollwert.

Die Heizkurve macht den Grossteil der Arbeit, der Raumregler die Feinkorrektur. Das ist robuster als eine reine Kaskade, weil der Raumfühler nur eine kleine Wirkung hat. Ein schlecht platzierter Fühler richtet so wenig Schaden an. Siehe [Heizkurve](/wissen/heizkurve) und [Vorsteuerung und Störgrössenaufschaltung](/wissen/vorsteuerung-aufschaltung).

## Einstellen

**Der innere Kreis muss deutlich schneller sein als der äussere**, als Faustregel mindestens drei- bis fünfmal. Sonst arbeiten beide Regler gegeneinander, und die Anlage schwingt.

1. Äusseren Regler auf Hand stellen, er gibt einen festen Sollwert vor.
2. Inneren Regler einstellen und mit Sollwertsprüngen testen. Er soll schnell und ohne grosses Überschwingen folgen.
3. Äusseren Regler zuschalten und ruhig einstellen, mit langer Nachstellzeit.

Weiter ist zu beachten:

- **Sollwert des inneren Kreises begrenzen**, Minimum und Maximum. Das schützt Anlage und Komfort.
- **Anti-Windup beim äusseren Regler:** Erreicht der innere Regler seine Grenze, etwa Ventil ganz offen, darf der äussere nicht weiter integrieren. Gute Bausteine geben diese Information von innen nach aussen weiter.
- **Fühler des inneren Kreises nahe am Stellglied**, sonst ist der innere Kreis nicht schnell.

## Normen

Für die Kaskadenregelung gibt es keine eigene Norm. Die Begriffe stehen in **IEC 60050-351**.

<!-- EN -->

Some processes are too slow or too exposed to disturbances for a single controller. A **cascade** splits the task between two controllers: a fast inner one and a slow outer one.

## Principle

The **outer controller** (master, primary) controls the actual goal, for example the room temperature. Its output is not an actuator signal but the **setpoint for the inner controller** (slave, secondary). The inner controller controls a fast intermediate variable, for example the flow temperature, and moves the actuator.

<figure class="schema"><svg viewBox="0 0 860 236" role="img" aria-label="Cascade control: room controller sets the setpoint of the flow controller; inner loop via flow temperature, outer loop via room temperature" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 92L70 92"/><path d="M70 92L62.0 96.0L62.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="80" cy="92" r="10"/><path d="M73.0 85.0L87.0 99.0M73.0 99.0L87.0 85.0" stroke-width="1.2"/><path d="M90 92L112 92"/><path d="M112 92L104.0 96.0L104.0 88.0Z" fill="currentColor" stroke="none"/><rect x="112" y="66" width="118" height="52" rx="6"/><path d="M230 92L330 92"/><path d="M330 92L322.0 96.0L322.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="340" cy="92" r="10"/><path d="M333.0 85.0L347.0 99.0M333.0 99.0L347.0 85.0" stroke-width="1.2"/><path d="M350 92L370 92"/><path d="M370 92L362.0 96.0L362.0 88.0Z" fill="currentColor" stroke="none"/><rect x="370" y="66" width="118" height="52" rx="6"/><path d="M488 92L510 92"/><path d="M510 92L502.0 96.0L502.0 88.0Z" fill="currentColor" stroke="none"/><rect x="510" y="66" width="110" height="52" rx="6"/><path d="M620 92L642 92"/><path d="M642 92L634.0 96.0L634.0 88.0Z" fill="currentColor" stroke="none"/><rect x="642" y="66" width="84" height="52" rx="6"/><path d="M726 92L758 92"/><path d="M758 92L750.0 96.0L750.0 88.0Z" fill="currentColor" stroke="none"/><rect x="758" y="66" width="84" height="52" rx="6"/><path d="M842 92L856 92"/><circle cx="742" cy="92" r="3" fill="currentColor"/><path d="M742 92L742 160L340 160L340 102"/><path d="M340 102L344.0 110.0L336.0 110.0Z" fill="currentColor" stroke="none"/><circle cx="852" cy="92" r="3" fill="currentColor"/><path d="M852 92L852 212L80 212L80 102"/><path d="M80 102L84.0 110.0L76.0 110.0Z" fill="currentColor" stroke="none"/><rect x="324" y="46" width="426" height="128" rx="10" stroke-dasharray="4 4" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="8" y="82" text-anchor="start" font-size="11" font-weight="600">Room setpoint</text><text x="71" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="171.0" y="90.0" text-anchor="middle" font-size="12.5" font-weight="600">Room</text><text x="171.0" y="104.0" text-anchor="middle" font-size="10.5">controller (master)</text><text x="285" y="82" text-anchor="middle" font-size="10.5" font-style="italic">Flow setpoint</text><text x="331" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="429.0" y="90.0" text-anchor="middle" font-size="12.5" font-weight="600">Flow</text><text x="429.0" y="104.0" text-anchor="middle" font-size="10.5">controller (slave)</text><text x="565.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Mixing valve</text><text x="684.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Flow pipe</text><text x="800.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Room</text><text x="540" y="154" text-anchor="middle" font-size="10.5">flow temperature, fast</text><text x="486" y="206" text-anchor="middle" font-size="10.5">room temperature, slow</text><text x="332" y="40" text-anchor="start" font-size="10.5" font-style="italic">inner loop</text></g></svg><figcaption>Cascade: the outer room controller sets the setpoint for the inner flow controller. The inner loop catches disturbances in the flow before the room notices them.</figcaption></figure>

**Why this is better:** if the boiler temperature or the network pressure changes, the inner controller notices within seconds and corrects, long before the room feels anything. The outer controller only has to deal with the slow room temperature.

## Examples in BA

| Cascade                | Outer controller (slow)         | Inner controller (fast)        | Actuator                  |
| ---------------------- | ------------------------------- | ------------------------------ | ------------------------- |
| **Room – flow**        | room temperature                | flow temperature               | mixing valve              |
| **Room – supply air**  | room or extract air temperature | supply air temperature         | heating and cooling coils |
| **Room – air volume**  | room temperature or CO₂         | air flow in the VAV controller | damper                    |
| **Storage – charging** | storage temperature             | charging temperature           | valve or pump             |

A **room – supply air cascade** needs a **supply air temperature limit**, for example 16 to 28 °C. Without it, a large deviation makes the room controller demand supply air that causes draught or freezes the coil.

**Room pressure** is not a good candidate for a slow outer loop. It responds within seconds to every door opening. It is often more stable to set a fixed difference between supply and extract air flow and only monitor the pressure. See [Zone Pressure Control](/wissen/zonendruckhaltung).

## Weather-Compensated Flow Temperature

The heating curve is related to the cascade but is not one. The flow setpoint is calculated from the **outdoor temperature**, the most important disturbance. The flow controller holds this setpoint. No room sensor is needed.

With a room sensor a hybrid results:

1. The heating curve supplies the **base value** of the flow setpoint.
2. A room controller adds a **correction**, typically limited to a few kelvin.
3. The flow controller holds the resulting setpoint.

The heating curve does most of the work, the room controller the fine correction. This is more robust than a pure cascade because the room sensor has only a small effect. A badly placed sensor does little harm. See [Heating Curve](/wissen/heizkurve) and [Feedforward and Disturbance Compensation](/wissen/vorsteuerung-aufschaltung).

## Tuning

**The inner loop must be clearly faster than the outer one**, as a rule of thumb at least three to five times. Otherwise both controllers work against each other and the plant oscillates.

1. Set the outer controller to manual; it provides a fixed setpoint.
2. Tune the inner controller and test with setpoint steps. It should follow quickly without much overshoot.
3. Switch on the outer controller and tune it calmly, with a long integral time.

Also note:

- **Limit the inner setpoint**, minimum and maximum. This protects plant and comfort.
- **Anti-windup in the outer controller:** when the inner controller reaches its limit, such as valve fully open, the outer one must stop integrating. Good function blocks pass this information from inside to outside.
- **Inner-loop sensor close to the actuator**, otherwise the inner loop is not fast.

## Standards

There is no specific standard for cascade control. The terms are defined in **IEC 60050-351**.
