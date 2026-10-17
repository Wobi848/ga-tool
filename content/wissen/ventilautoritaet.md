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
updated: 2026-10-17
lang: de
---

# Ventilautorität — Einfluss auf Regelqualität

Die **Ventilautorität** α (Alpha) beschreibt, welchen Anteil des Gesamtdruckverlusts im Heizkreis das Ventil bei vollständig geöffneter Stellung übernimmt. Sie bestimmt massgeblich, ob ein Ventil seinen Kreis gut regeln kann.

## Definition

<p class="formel">α = Δp<sub>V,100</sub> / (Δp<sub>V,100</sub> + Δp<sub>System</sub>)</p>

| Variable     | Bedeutung                                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **ΔpV,100**  | Druckverlust des Ventils bei 100% Hub (vollgeöffnet)                                                                    |
| **ΔpSystem** | Druckverlust im **mengenvariablen Teil** ohne Ventil: nur Leitungen und Bauteile, deren Durchfluss das Ventil verändert |
| **α**        | Ventilautorität [−], 0 bis 1                                                                                            |

**Welcher Teil ist mengenvariabel?** Das hängt von der Schaltung ab, siehe [Hydraulische Grundschaltungen](/wissen/ventil-schaltungen):

| Schaltung                         | Mengenvariabler Teil                              |
| --------------------------------- | ------------------------------------------------- |
| Drosselschaltung                  | vom Verteiler über den Verbraucher und zurück     |
| Einspritzung mit Durchgangsventil | vom Verteiler bis zum Einspritz-Bypass und zurück |
| Beimischschaltung                 | die Anschlussleitungen vom und zum Verteiler      |
| Umlenkschaltung                   | vom Bypass über den Verbraucher und zurück        |

Der Wärmetauscher einer Beimischschaltung gehört also **nicht** dazu: Sein Durchfluss bleibt konstant. Wer dort den ganzen Kreis einrechnet, rechnet eine viel zu kleine Autorität aus und wählt ein zu kleines Ventil. Zählt dagegen ein Wärmezähler im mengenvariablen Teil, muss er mitgerechnet werden. Ein Wärmezähler mit 14 kPa Druckverlust verlangt dann ein Ventil mit ebenso viel Druckverlust.

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

<p class="formel">k<sub>v</sub> = Q / √Δp<sub>V,100</sub>   (Q in m³/h, Δp in bar)</p>

Vorgehen nach Siemens:

1. Volumenstrom aus Leistung und Spreizung
2. Druckverlust des mengenvariablen Teils Δp<sub>MV</sub> bestimmen
3. Gewünschte Autorität festlegen, meist 0.5. Dann gilt Δp<sub>V,100</sub> ≈ Δp<sub>MV</sub>.
4. k<sub>v</sub> ausrechnen. Das ist der **ideale k<sub>vs</sub>**.
5. Die nächstliegende Normgrösse wählen, **im Zweifel die kleinere**. Ein kleineres Ventil erhöht die Autorität.
6. Mit dem gewählten k<sub>vs</sub> den tatsächlichen Druckverlust und die Autorität nachrechnen.

**Beispiel aus der Siemens-Unterlage:** 4.5 m³/h, Δp<sub>MV</sub> 3 kPa, also Δp<sub>V,100</sub> 3 kPa. Das ergibt k<sub>v</sub> ≈ 26. Zur Wahl stehen 25 und 30, gewählt wird 25. Das Ventil hat dann 3.2 kPa Druckverlust, die Autorität ist 3.2 / (3.2 + 3) ≈ 0.52.

Ein Zuschlag von 30 % auf k<sub>v</sub>, wie man ihn manchmal sieht, macht das Ventil grösser, senkt seinen Druckverlust auf etwa 60 % und damit die Autorität. Für Regelventile in HLK-Anlagen ist das der falsche Weg.

**Normreihe Kvs**: 0.16 · 0.25 · 0.4 · 0.63 · 1.0 · 1.6 · 2.5 · 4.0 · 6.3 · 10 · 16 · 25 · 40 · 63 · 100

**Fehler**: Oft wird ein DN40-Ventil eingebaut weil das Rohr DN40 ist — aber der Kv-Bedarf wäre Kvs = 4.0 (DN20-Ventil). Das grosse Ventil erzeugt fast keinen Δp → α → 0.

**Zu klein ist auch falsch:** Das Ventil schafft den Volumenstrom nicht, oder die Pumpe muss unnötig viel Druck liefern. Eine Autorität von 0.8 verbessert die Regelung kaum, kostet aber Pumpenstrom. Darum ist 0.5 der übliche Zielwert.

## Wärmeübertrager-Kennlinie und a-Wert

Ein Wärmeübertrager gibt schon bei kleinem Durchfluss viel Leistung ab. Bei typischen Lufterwärmern bringen 10 % Durchfluss schon rund ein Viertel der Leistung. Wie stark die Kennlinie gekrümmt ist, beschreibt der **a-Wert**: unter 1 nach oben gekrümmt, über 1 nach unten. Er hängt von den Temperaturen am Wärmeübertrager und von der Schaltung ab. Durchflussgeregelte Luftkühler und -erwärmer haben kleine a-Werte um 0.3 bis 0.5. Bei Vorlauftemperaturregelung mit Beimisch- oder Einspritzschaltung liegt a um 1, die Kennlinie ist fast linear.

Die Ventilkennlinie muss diese Krümmung ausgleichen, damit die **Streckenkennlinie** (Hub gegen Leistung) möglichst gerade wird. Bei a = 0.5 erreicht ein gleichprozentiges Ventil mit Autorität 0.5 eine fast lineare Strecke.

**Kleinste regelbare Leistung:** Unter einem gewissen Hub springt jedes Ventil von zu auf einen Mindestdurchfluss. Wie gross der Leistungssprung am Wärmeübertrager ist, hängt ab von:

- dem **Stellverhältnis** des Ventils: je grösser, desto feiner
- der **Autorität**: je grösser, desto feiner
- dem **a-Wert**: je grösser, also je kleiner die Temperaturdifferenz zwischen Erzeuger und Verbraucher, desto feiner

Ein überdimensioniertes Ventil hat einen grossen Mindestsprung und nutzt nur einen Teil seines Hubs. Die Anlage taktet dann bei Schwachlast.

## Gleichprozentige vs. lineare Kennlinie

| Kennlinie           | Geeignet für               | Vorteil                                                                             |
| ------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| **Linear**          | α ≥ 0.5                    | Einfach, gut bei hoher Autorität                                                    |
| **Gleichprozentig** | Wärmeübertrager, α 0.3–0.5 | Gleicht die Kennlinie des Wärmeübertragers und teilweise eine geringe Autorität aus |

Ein gleichprozentiges Ventil gibt bei kleinem Hub wenig Durchfluss und steigert ihn exponentiell. Das gleicht zwei Krümmungen aus: die des Wärmeübertragers, der schon bei kleinem Durchfluss viel Leistung abgibt, und die durch eine mässige Ventilautorität. Ein Ersatz für eine vernünftige Dimensionierung ist es nicht.

## Hydraulischer Abgleich und Druckverlust

Der ΔpSystem hängt stark vom hydraulischen Abgleich ab. Bei einem abgeglichenen Netz sind die Druckverluste definiert und die Ventilautorität berechenbar. Bei einem nicht abgeglichenen Netz sind die Druckverhältnisse unklar → Ventilautorität unkontrolliert.

**Druckunabhängige Ventile (PICV)** kombinieren Regelventil, Differenzdruckregler und eine einstellbare Volumenstrombegrenzung. Der Differenzdruckregler hält den Druck über dem Regelteil konstant, die Autorität ist damit praktisch 1. Die Volumenstrombegrenzung erledigt den **statischen** Abgleich schon beim Einbau, der Differenzdruckregler den **dynamischen** im Betrieb. Abgleichdrosseln entfallen. Zu beachten:

- Ein PICV braucht einen **Mindestdifferenzdruck** von der Pumpe, sonst arbeitet der eingebaute Regler nicht.
- PICVs haben eine **lineare** Kennlinie. Für Wärmeübertrager mit kleinem a-Wert, etwa Luftkühler, reicht das nicht. Es braucht einen Antrieb mit **gleichprozentigem** Stellverhalten, oft per Schalter am Antrieb wählbar.

**Elektronische druckunabhängige Ventile** messen den Durchfluss selbst und regeln ihn mit einem eigenen Regler. Mit Fühlern in Vor- und Rücklauf erfassen sie zusätzlich die Leistung und die Energie, die Kennlinie lässt sich im Regler wählen. Über den Bus liefern sie der GA Volumenstrom, Spreizung und Energie, nützlich zum Erkennen schlechter Spreizung. Hersteller nennen sie Energy Valve, Intelligent Valve oder ähnlich.

## Zusammenfassung

> Eine gute Ventilautorität (α ≥ 0.5) ist die Voraussetzung für eine stabile, genaue Regelung. Sie wird durch richtiges Kvs (nicht zu gross) und einen angemessenen System-Δp sichergestellt. Druckunabhängige Ventile (PICV) lösen das Problem elegant auf Kosten höherer Investition.

## Quellen

- Siemens Schweiz AG: «Hydraulik in der Gebäudetechnik», Schulungsunterlage BT_0100, 2026, Kap. 1.5, 2 und 3

<!-- EN -->

The **valve authority** α (alpha) describes what fraction of the total pressure drop in a heating circuit the valve takes up at fully open position. It decisively determines whether a valve can effectively regulate its circuit.

## Definition

<p class="formel">α = Δp<sub>V,100</sub> / (Δp<sub>V,100</sub> + Δp<sub>System</sub>)</p>

| Variable     | Meaning                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| **ΔpV,100**  | Pressure drop across the valve at 100% stroke (fully open)                                                            |
| **ΔpSystem** | Pressure drop in the **variable-flow part** without the valve: only pipes and components whose flow the valve changes |
| **α**        | Valve authority [−], 0 to 1                                                                                           |

**Which part has variable flow?** That depends on the circuit, see [Basic Hydraulic Circuits](/wissen/ventil-schaltungen):

| Circuit                      | Variable-flow part                               |
| ---------------------------- | ------------------------------------------------ |
| Throttling circuit           | from the header through the consumer and back    |
| Injection with two-way valve | from the header to the injection bypass and back |
| Mixing circuit               | the connection pipes from and to the header      |
| Diverting circuit            | from the bypass through the consumer and back    |

The heat exchanger of a mixing circuit is therefore **not** included: its flow stays constant. Including the whole circuit there gives far too low an authority and leads to too small a valve. A heat meter in the variable-flow part, on the other hand, must be included. A heat meter with 14 kPa pressure drop then calls for a valve with as much pressure drop.

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

<p class="formel">k<sub>v</sub> = Q / √Δp<sub>V,100</sub>   (Q in m³/h, Δp in bar)</p>

Procedure according to Siemens:

1. Flow from output and temperature spread
2. Determine the pressure drop of the variable-flow part Δp<sub>MV</sub>
3. Set the desired authority, usually 0.5. Then Δp<sub>V,100</sub> ≈ Δp<sub>MV</sub>.
4. Calculate k<sub>v</sub>. This is the **ideal k<sub>vs</sub>**.
5. Choose the nearest standard size, **if in doubt the smaller one**. A smaller valve raises authority.
6. Recalculate the actual pressure drop and authority with the chosen k<sub>vs</sub>.

**Example from the Siemens document:** 4.5 m³/h, Δp<sub>MV</sub> 3 kPa, so Δp<sub>V,100</sub> 3 kPa. This gives k<sub>v</sub> ≈ 26. The choice is between 25 and 30; 25 is chosen. The valve then has 3.2 kPa pressure drop, the authority is 3.2 / (3.2 + 3) ≈ 0.52.

A 30 % allowance on k<sub>v</sub>, as sometimes seen, makes the valve larger, lowers its pressure drop to about 60 % and with it the authority. For control valves in HVAC plants that is the wrong way.

**Standard Kvs series**: 0.16 · 0.25 · 0.4 · 0.63 · 1.0 · 1.6 · 2.5 · 4.0 · 6.3 · 10 · 16 · 25 · 40 · 63 · 100

**Common mistake:** A DN40 valve is fitted because the pipe is DN40 — but the required Kv calls for Kvs = 4.0 (DN20 valve). The oversized valve creates almost no Δp → α → 0.

**Too small is wrong too:** the valve cannot pass the flow, or the pump has to deliver unnecessary pressure. An authority of 0.8 hardly improves control but costs pump power. That is why 0.5 is the usual target.

## Heat Exchanger Characteristic and a-Value

A heat exchanger releases a lot of output even at small flow. With typical air heaters, 10 % flow already gives about a quarter of the output. How strongly the characteristic is curved is described by the **a-value**: below 1 curved upwards, above 1 downwards. It depends on the temperatures at the heat exchanger and on the circuit. Flow-controlled air coolers and heaters have small a-values around 0.3 to 0.5. With flow temperature control in a mixing or injection circuit, a is around 1 and the characteristic is almost linear.

The valve characteristic must compensate this curvature so that the **process characteristic** (stroke against output) becomes as straight as possible. At a = 0.5 an equal-percentage valve with authority 0.5 achieves an almost linear process.

**Smallest controllable output:** below a certain stroke every valve jumps from closed to a minimum flow. How large the output jump at the heat exchanger is depends on:

- the valve's **rangeability**: the larger, the finer
- the **authority**: the larger, the finer
- the **a-value**: the larger, i.e. the smaller the temperature difference between generator and consumer, the finer

An oversized valve has a large minimum jump and uses only part of its stroke. The plant then cycles at low load.

## Equal-Percentage vs. Linear Characteristic

| Characteristic       | Suitable for               | Advantage                                                                  |
| -------------------- | -------------------------- | -------------------------------------------------------------------------- |
| **Linear**           | α ≥ 0.5                    | Simple, works well at high authority                                       |
| **Equal-percentage** | heat exchangers, α 0.3–0.5 | Compensates the heat exchanger's characteristic and partly a low authority |

An equal-percentage valve delivers little flow at small stroke and increases it exponentially. This compensates two curvatures: that of the heat exchanger, which releases a lot of output even at small flow, and that caused by moderate valve authority. It is not a substitute for proper sizing.

## Hydraulic Balancing and Pressure Drop

ΔpSystem depends heavily on hydraulic balancing. In a balanced network, pressure drops are defined and valve authority is calculable. In an unbalanced network, pressure conditions are unknown → valve authority uncontrolled.

**Pressure-independent control valves (PICV)** combine control valve, differential pressure regulator and an adjustable flow limiter. The differential pressure regulator keeps the pressure across the control part constant, so authority is practically 1. The flow limiter does the **static** balancing at installation, the differential pressure regulator the **dynamic** balancing in operation. Balancing valves become unnecessary. Note:

- A PICV needs a **minimum differential pressure** from the pump, otherwise its built-in regulator does not work.
- PICVs have a **linear** characteristic. For heat exchangers with a small a-value, such as air coolers, that is not enough. An actuator with **equal-percentage** behaviour is needed, often selectable by a switch on the actuator.

**Electronic pressure-independent valves** measure the flow themselves and control it with their own controller. With sensors in flow and return they also record output and energy; the characteristic can be selected in the controller. Via the bus they give BA flow, temperature spread and energy, useful for detecting poor spread. Manufacturers call them energy valve, intelligent valve or similar.

## Summary

> Good valve authority (α ≥ 0.5) is a prerequisite for stable, accurate control. It is achieved through correct Kvs sizing (not too large) and adequate system Δp. Pressure-independent valves (PICV) solve the problem elegantly at the cost of higher investment.

## Sources

- Siemens Schweiz AG: "Hydraulik in der Gebäudetechnik", training document BT_0100, 2026, ch. 1.5, 2 and 3
