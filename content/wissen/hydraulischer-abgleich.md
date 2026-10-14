---
title: Hydraulischer Abgleich
title_en: Hydraulic Balancing
slug: hydraulischer-abgleich
category: heizung
subcategory: hydraulik
tags:
  [
    hydraulischer-abgleich,
    voreinstellung,
    thermostatventil,
    strangregulierung,
    differenzdruck,
    δp-regler,
    heizkreis,
    durchfluss,
    überströmventil,
    pumpenauslegung,
    en14336
  ]
difficulty: fortgeschritten
area: [hlk]
related:
  [druckverlust, heizkurve, waermepumpe, ventil-schaltungen, hydraulische-schaltungen, pumpen]
norm: [SIA 384/1, EN 14336, VDI 2073]
updated: 2026-10-14
lang: de
---

# Hydraulischer Abgleich

Der **hydraulische Abgleich** sorgt dafür, dass jeder Heizkörper und jeder Strang den berechneten Volumenstrom bekommt, nicht mehr und nicht weniger. Ohne Abgleich fliesst zu viel Wasser durch die kurzen, pumpennahen Kreise, während die entfernten zu wenig bekommen.

## Warum er wichtig ist

- **Komfort:** gleichmässige Raumtemperaturen, kein Überheizen nahe der Pumpe, keine kalten Räume am Strangende
- **Energie:** Die Pumpe kann kleiner eingestellt werden. Die Vorlauftemperatur muss nicht erhöht werden, nur damit auch der letzte Raum warm wird.
- **Tiefer Rücklauf:** Überversorgte Heizkörper kühlen das Wasser kaum ab. Der Rücklauf kommt zu warm zurück, und das kostet bei Brennwertkesseln, Wärmepumpen und Fernwärme Effizienz.
- **Wärmepumpen:** Weil sie mit tiefer Vorlauftemperatur arbeiten, fällt eine schlechte Verteilung sofort auf. Wer dann die Heizkurve anhebt, senkt den COP.

In der Schweiz verlangt **SIA 384/1** den Abgleich bei der Inbetriebnahme. In Deutschland schreibt ihn das Gebäudeenergiegesetz für viele Anlagen vor.

## Vorgehen

### Voreinstellung nach Berechnung

1. **Heizlast je Raum** nach SIA 384.201 bzw. EN 12831
2. **Volumenstrom je Heizkörper** aus Heizlast und Spreizung, siehe Formel unten
3. **Voreinstellung** des Ventils aus Volumenstrom und verfügbarem Differenzdruck, mit dem Diagramm des Ventilherstellers
4. Ventile einstellen und **protokollieren**

### Mess-Abgleich

Bei Strängen und grösseren Anlagen wird gemessen: An Strangregulierventilen mit Messnippeln misst ein Messcomputer den Differenzdruck und rechnet ihn in einen Volumenstrom um. Man stellt so lange nach, bis alle Stränge ihren Sollwert haben.

### Druckunabhängige Ventile

Druckunabhängige Regelventile (PICV) haben einen Differenzdruckregler eingebaut. Man stellt den maximalen Volumenstrom direkt ein, und er bleibt erhalten, egal was der Rest der Anlage tut. Der Abgleich ist damit Teil des Ventils.

## Die Armaturen

| Armatur                               | Aufgabe                                                                             |
| ------------------------------------- | ----------------------------------------------------------------------------------- |
| **Voreinstellbares Thermostatventil** | Begrenzt den Volumenstrom je Heizkörper. Stufen und kv-Werte je nach Fabrikat       |
| **Strangregulierventil**              | Stellt den Volumenstrom je Strang ein, mit Messnippeln zum Messen                   |
| **Differenzdruckregler**              | Hält den Differenzdruck an einem Strang konstant, egal wie viele Ventile offen sind |
| **Überströmventil**                   | Lässt einen Mindestvolumenstrom durch, wenn fast alle Ventile zu sind               |

**Differenzdruckregler** sitzen am Strang oder am Verteiler, typisch eingestellt auf 5 bis 30 kPa. Sie schützen die Thermostatventile vor zu hohem Differenzdruck, der Pfeifgeräusche und schlechtes Regeln verursacht. Bei grossen Anlagen mit vielen Thermostatventilen sind sie fast unverzichtbar.

> ⚠️ **Ein Überströmventil ersetzt den Abgleich nicht.** Es schützt die Pumpe davor, gegen geschlossene Ventile zu laufen. Mit drehzahlgeregelten Pumpen ist es oft überflüssig. Ein zu weit offenes Überströmventil hebt den Rücklauf an.

## Pumpe nach dem Abgleich

Nach dem Abgleich wird die Pumpe neu eingestellt:

- **Förderhöhe** auf den Druckverlust des ungünstigsten Kreises, nicht mehr
- **Regelart:** Proportionaldruck für Heizkörperanlagen mit Thermostatventilen, Konstantdruck bei Fussbodenheizungen und kurzen Netzen

Nach den Affinitätsgesetzen sinkt die Pumpenleistung mit der dritten Potenz der Drehzahl: halber Volumenstrom heisst theoretisch ein **Achtel** der Leistung. In der Praxis spart man weniger, weil die Anlagenkennlinie nicht durch null geht und der Wirkungsgrad der Pumpe bei Teillast sinkt. Es bleibt trotzdem viel.

## Volumenstrom berechnen

<p class="formel">V̇ = Q / (c<sub>p</sub> · ρ · ΔT)</p>

| Grösse | Wasser                            |
| ------ | --------------------------------- |
| c_p    | 4.18 kJ/(kg·K)                    |
| ρ      | 1000 kg/m³, bei 50 °C 988 kg/m³   |
| ΔT     | Vorlauf minus Rücklauf, z.B. 10 K |

**Beispiel:** Heizkörper 1 kW, 60/50 °C, also ΔT = 10 K:
V̇ = 1000 W / (4182 J/(kg·K) × 988 kg/m³ × 10 K) ≈ 0.024 l/s ≈ **87 l/h**.

## Was die GA davon sieht

Der Abgleich selbst ist in der GA unsichtbar, die Folgen eines fehlenden Abgleichs nicht:

- Klagen über ungleiche Raumtemperaturen
- Rücklauf zu warm, Spreizung zu klein
- Vorlauftemperatur wird immer weiter angehoben
- Wärmepumpe taktet, Heizstab springt an
- Pumpe läuft auf hoher Stufe bei mässiger Leistung

**Diagnose:** Vor- und Rücklauftemperatur je Strang vergleichen, Volumenströme aus Wärmezählern, Pumpenleistung über den Tag.

## Protokoll

Zum Abgleich gehört ein Protokoll mit Ventiltyp, Einstellwert und Soll- und Istvolumenstrom je Heizkörper oder Strang, Pumpeneinstellung, Datum und Ausführendem. Es gehört zur Übergabe und hilft bei späteren Reklamationen.

## Normen

- **SIA 384/1** — Heizungsanlagen in Gebäuden, Grundlagen und Anforderungen
- **EN 14336** — Installation und Abnahme von Warmwasser-Heizungsanlagen
- **VDI 2073 Blatt 2** — Hydraulischer Abgleich
- **SIA 384.201 / EN 12831** — Norm-Heizlast

<!-- EN -->

**Hydraulic balancing** ensures that every radiator and every branch receives its design flow rate, no more and no less. Without balancing, too much water flows through the short circuits close to the pump while the remote ones get too little.

## Why It Matters

- **Comfort:** even room temperatures, no overheating near the pump, no cold rooms at the end of the branch
- **Energy:** the pump can be set lower. The flow temperature need not be raised just to get the last room warm.
- **Low return:** oversupplied radiators barely cool the water. The return comes back too warm, which costs efficiency with condensing boilers, heat pumps and district heating.
- **Heat pumps:** because they work at low flow temperatures, poor distribution shows immediately. Raising the heating curve to compensate lowers the COP.

In Switzerland, **SIA 384/1** requires balancing at commissioning. In Germany the Buildings Energy Act prescribes it for many systems.

## Procedure

### Presetting by Calculation

1. **Heating load per room** per SIA 384.201 or EN 12831
2. **Flow rate per radiator** from heating load and temperature difference, see formula below
3. **Presetting** of the valve from flow rate and available differential pressure, using the valve manufacturer's chart
4. Set the valves and **record** them

### Balancing by Measurement

For branches and larger systems you measure: at balancing valves with test points, a measuring computer reads the differential pressure and converts it into a flow rate. Adjust until every branch reaches its target.

### Pressure-Independent Valves

Pressure-independent control valves (PICV) have a built-in differential pressure controller. You set the maximum flow directly and it is maintained whatever the rest of the system does. Balancing becomes part of the valve.

## The Valves

| Valve                                | Purpose                                                                                |
| ------------------------------------ | -------------------------------------------------------------------------------------- |
| **Presettable thermostatic valve**   | Limits the flow per radiator. Settings and kv values depend on the make                |
| **Balancing valve**                  | Sets the flow per branch, with test points for measurement                             |
| **Differential pressure controller** | Keeps the differential pressure across a branch constant, however many valves are open |
| **Bypass valve**                     | Lets a minimum flow through when almost all valves are closed                          |

**Differential pressure controllers** sit on the branch or at the header, typically set to 5 to 30 kPa. They protect thermostatic valves from excessive differential pressure, which causes whistling and poor control. In large systems with many thermostatic valves they are almost indispensable.

> ⚠️ **A bypass valve does not replace balancing.** It protects the pump from running against closed valves. With variable-speed pumps it is often unnecessary. A bypass valve set too wide raises the return temperature.

## The Pump After Balancing

After balancing the pump is reset:

- **Head** to the pressure drop of the least favourable circuit, no more
- **Control mode:** proportional pressure for radiator systems with thermostatic valves, constant pressure for underfloor heating and short networks

By the affinity laws, pump power falls with the cube of speed: half the flow means theoretically one **eighth** of the power. In practice you save less, because the system curve does not pass through zero and pump efficiency drops at part load. It is still a lot.

## Calculating the Flow Rate

<p class="formel">V̇ = Q / (c<sub>p</sub> · ρ · ΔT)</p>

| Quantity | Water                          |
| -------- | ------------------------------ |
| c_p      | 4.18 kJ/(kg·K)                 |
| ρ        | 1000 kg/m³, at 50 °C 988 kg/m³ |
| ΔT       | flow minus return, e.g. 10 K   |

**Example:** radiator 1 kW, 60/50 °C, so ΔT = 10 K:
V̇ = 1000 W / (4182 J/(kg·K) × 988 kg/m³ × 10 K) ≈ 0.024 l/s ≈ **87 l/h**.

## What the BA Sees

Balancing itself is invisible in the BA, the consequences of missing balancing are not:

- complaints about uneven room temperatures
- return too warm, temperature difference too small
- flow temperature raised again and again
- heat pump cycling, electric heater kicking in
- pump on a high setting at moderate output

**Diagnosis:** compare flow and return temperatures per branch, flow rates from heat meters, pump power over the day.

## Record

Balancing comes with a record of valve type, setting and target and actual flow per radiator or branch, pump setting, date and who did it. It belongs to the handover and helps with later complaints.

## Standards

- **SIA 384/1** — Heating systems in buildings, fundamentals and requirements
- **EN 14336** — Installation and commissioning of water-based heating systems
- **VDI 2073 Part 2** — Hydraulic balancing
- **SIA 384.201 / EN 12831** — Design heating load
