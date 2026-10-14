---
title: Ventilautorität — Einfluss auf Regelqualität
title_en: Valve Authority — Impact on Control Quality
slug: ventilautoritaet
category: hydraulik
subcategory: ventile
tags:
  [
    ventilautoritaet,
    kvs-wert,
    kv-wert,
    druckabfall,
    regelqualität,
    linearventil,
    gleichprozentigventil,
    hydraulik,
    durchflusscharakteristik,
    stellventil,
    auslegung
  ]
difficulty: grundlagen
area: [hlk, ga]
related: [motorventile, ventil-schaltungen, druckverlust]

rechner: [ventilautoritaet, kv-wert, hydraulik-simulator]
norm: [EN 60534, EN 215]
updated: 2026-05-15
lang: de
---

# Ventilautorität — Einfluss auf Regelqualität

Die **Ventilautorität** α (Alpha) beschreibt, welchen Anteil des Gesamtdruckverlusts im Heizkreis das Ventil bei vollständig geöffneter Stellung übernimmt. Sie bestimmt massgeblich, ob ein Ventil seinen Kreis gut regeln kann.

## Definition

<p class="formel">α = Δp<sub>V,100</sub> / (Δp<sub>V,100</sub> + Δp<sub>System</sub>)</p>

| Variable     | Bedeutung                                                 |
| ------------ | --------------------------------------------------------- |
| **ΔpV,100**  | Druckverlust des Ventils bei 100% Hub (vollgeöffnet)      |
| **ΔpSystem** | Druckverlust des restlichen Kreises (WT, Rohre, Fittings) |
| **α**        | Ventilautorität [−], 0 bis 1                              |

## Einfluss auf die Kennlinie

Das Ventil selbst hat eine geometrisch definierte Kennlinie (linear oder gleichprozentig). Durch die Ventilautorität wird diese **Eigenkennlinie** zur **Stellkennlinie** im eingebauten Zustand verzerrt:

| α       | Auswirkung bei Linearventil                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| α = 1.0 | Ideal — Stellkennlinie = Eigenkennlinie                                                                       |
| α = 0.5 | Gut — leichte Verzerrung, akzeptabel                                                                          |
| α = 0.3 | Grenzbereich — das Ventil öffnet deutlich schneller als der Hub                                               |
| α = 0.1 | Schlecht — schon bei 30 % Hub fliessen rund 70 % des Volumenstroms, der Rest des Hubs bewirkt kaum noch etwas |

**Praxisproblem bei zu kleiner Ventilautorität:** Bei kleinem Hub bewirkt jedes Prozent eine grosse Änderung. Bei Teillast, wo das Ventil fast zu ist, wird der Regelkreis dadurch zu scharf und schwingt. Im oberen Hubbereich passiert dagegen fast nichts mehr. Ausprobieren lässt sich das im [Rechner Ventilautorität](/rechner/ventilautoritaet) und im [Hydraulik-Simulator](/rechner/hydraulik-simulator).

## Empfehlungen

| Anwendung                | Empfohlenes α       |
| ------------------------ | ------------------- |
| Heizkreis, HLK allgemein | ≥ 0.5               |
| Kühlung, enge Spreizung  | ≥ 0.4               |
| Unterstation Fernwärme   | ≥ 0.3 (Minimumwert) |
| Absolute Untergrenze     | 0.2                 |

## Kvs-Auswahl für gute Ventilautorität

Ein **zu grosses Kvs** senkt ΔpV,100 und damit α. Die häufigste Ursache schlechter Ventilautorität ist ein überdimensioniertes Ventil.

<p class="formel">k<sub>v</sub> = Q / √Δp<sub>V</sub>   (Q in m³/h, Δp in bar)
k<sub>vs</sub> ≥ k<sub>v</sub> · 1.3, nächste Normgrösse</p>

**Normreihe Kvs**: 0.16 · 0.25 · 0.4 · 0.63 · 1.0 · 1.6 · 2.5 · 4.0 · 6.3 · 10 · 16 · 25 · 40 · 63 · 100

**Fehler**: Oft wird ein DN40-Ventil eingebaut weil das Rohr DN40 ist — aber der Kv-Bedarf wäre Kvs = 4.0 (DN20-Ventil). Das grosse Ventil erzeugt fast keinen Δp → α → 0.

## Gleichprozentige vs. lineare Kennlinie

| Kennlinie           | Geeignet für               | Vorteil                                                                             |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| **Linear**          | α ≥ 0.5                    | Einfach, gut bei hoher Autorität                                                    |
| **Gleichprozentig** | Wärmeübertrager, α 0.3–0.5 | Gleicht die Kennlinie des Wärmeübertragers und teilweise eine geringe Autorität aus |

Ein gleichprozentiges Ventil gibt bei kleinem Hub wenig Durchfluss und steigert ihn exponentiell. Das gleicht zwei Krümmungen aus: die des Wärmeübertragers, der schon bei kleinem Durchfluss viel Leistung abgibt, und die durch eine mässige Ventilautorität. Ein Ersatz für eine vernünftige Dimensionierung ist es nicht.

## Hydraulischer Abgleich und Druckverlust

Der ΔpSystem hängt stark vom hydraulischen Abgleich ab. Bei einem abgeglichenen Netz sind die Druckverluste definiert und die Ventilautorität berechenbar. Bei einem nicht abgeglichenen Netz sind die Druckverhältnisse unklar → Ventilautorität unkontrolliert.

**Druckunabhängige Ventile (PICV)**: Kombinieren Regelventil + Differenzdruckregler in einem. α ist immer ≈ 1, da der Regler den Differenzdruck konstant hält. Ideal für grössere Anlagen.

## Zusammenfassung

> Eine gute Ventilautorität (α ≥ 0.5) ist die Voraussetzung für eine stabile, genaue Regelung. Sie wird durch richtiges Kvs (nicht zu gross) und einen angemessenen System-Δp sichergestellt. Druckunabhängige Ventile (PICV) lösen das Problem elegant auf Kosten höherer Investition.

<!-- EN -->

The **valve authority** α (alpha) describes what fraction of the total pressure drop in a heating circuit the valve takes up at fully open position. It decisively determines whether a valve can effectively regulate its circuit.

## Definition

<p class="formel">α = Δp<sub>V,100</sub> / (Δp<sub>V,100</sub> + Δp<sub>System</sub>)</p>

| Variable     | Meaning                                                        |
| ------------ | -------------------------------------------------------------- |
| **ΔpV,100**  | Pressure drop across the valve at 100% stroke (fully open)     |
| **ΔpSystem** | Pressure drop of the rest of the circuit (HX, pipes, fittings) |
| **α**        | Valve authority [−], 0 to 1                                    |

## Effect on the Characteristic Curve

The valve itself has a geometrically defined characteristic (linear or equal-percentage). The valve authority distorts this **inherent characteristic** into the **installed characteristic**:

| α       | Effect with linear valve                                                                        |
| ------- | ----------------------------------------------------------------------------------------------- |
| α = 1.0 | Ideal — installed = inherent characteristic                                                     |
| α = 0.5 | Good — slight distortion, acceptable                                                            |
| α = 0.3 | Borderline — the valve opens noticeably faster than its stroke                                  |
| α = 0.1 | Poor — at 30 % stroke about 70 % of the flow already passes; the rest of the stroke does little |

**Practical problem with low valve authority:** at small strokes every percent causes a large change. At part load, where the valve is almost closed, the control loop becomes too aggressive and oscillates. In the upper stroke range, by contrast, almost nothing happens. Try it in the [valve authority calculator](/rechner/ventilautoritaet) and the [hydraulic simulator](/rechner/hydraulik-simulator).

## Recommendations

| Application                       | Recommended α   |
| --------------------------------- | --------------- |
| Heating circuit, HVAC general     | ≥ 0.5           |
| Cooling, tight temperature spread | ≥ 0.4           |
| District heating substation       | ≥ 0.3 (minimum) |
| Absolute minimum                  | 0.2             |

## Kvs Selection for Good Valve Authority

A **Kvs that is too large** reduces ΔpV,100 and therefore α. The most common cause of poor valve authority is an oversized valve.

<p class="formel">k<sub>v</sub> = Q / √Δp<sub>V</sub>   (Q in m³/h, Δp in bar)
k<sub>vs</sub> ≥ k<sub>v</sub> · 1.3, next standard size</p>

**Standard Kvs series**: 0.16 · 0.25 · 0.4 · 0.63 · 1.0 · 1.6 · 2.5 · 4.0 · 6.3 · 10 · 16 · 25 · 40 · 63 · 100

**Common mistake:** A DN40 valve is fitted because the pipe is DN40 — but the required Kv calls for Kvs = 4.0 (DN20 valve). The oversized valve creates almost no Δp → α → 0.

## Equal-Percentage vs. Linear Characteristic

| Characteristic       | Suitable for               | Advantage                                                                  |
| -------------------- | -------------------------- | -------------------------------------------------------------------------- |
| **Linear**           | α ≥ 0.5                    | Simple, works well at high authority                                       |
| **Equal-percentage** | heat exchangers, α 0.3–0.5 | Compensates the heat exchanger's characteristic and partly a low authority |

An equal-percentage valve delivers little flow at small stroke and increases it exponentially. This compensates two curvatures: that of the heat exchanger, which releases a lot of output even at small flow, and that caused by moderate valve authority. It is not a substitute for proper sizing.

## Hydraulic Balancing and Pressure Drop

ΔpSystem depends heavily on hydraulic balancing. In a balanced network, pressure drops are defined and valve authority is calculable. In an unbalanced network, pressure conditions are unknown → valve authority uncontrolled.

**Pressure-independent control valves (PICV):** Combine control valve + differential pressure regulator in one body. α is always ≈ 1 since the regulator keeps the differential pressure constant. Ideal for larger systems.

## Summary

> Good valve authority (α ≥ 0.5) is a prerequisite for stable, accurate control. It is achieved through correct Kvs sizing (not too large) and adequate system Δp. Pressure-independent valves (PICV) solve the problem elegantly at the cost of higher investment.
