---
title: Fernwärme — Übergabestation und GA-Anbindung
title_en: District Heating — Transfer Station and BA Integration
slug: fernwaerme
category: heizung
subcategory: erzeuger
tags:
  [
    fernwärme,
    übergabestation,
    primärkreis,
    sekundärkreis,
    wärmetauscher,
    übergabepunkt,
    heizkurve,
    differenzdruck,
    volumenstrom,
    wärmemengenzähler,
    fernwärme-anschluss,
    substationsregelung,
    leistungssteuerung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    heizung-grundlagen,
    waermemengenzaehler,
    hydraulische-schaltungen,
    pid-regler,
    heizkurve,
    ventil-schaltungen,
    hydraulischer-abgleich
  ]
norm: [TAB des Versorgers, EN 14336, SIA 384/1]
updated: 2026-10-17
lang: de
---

# Fernwärme — Übergabestation und GA-Anbindung

Fernwärme liefert Wärme über ein Leitungsnetz. In der **Übergabestation** treffen Netz und Hausanlage aufeinander, getrennt durch einen Wärmetauscher. Die Netzseite gehört meist dem Versorger, die Hausseite regelt die GA.

<figure class="schema"><svg class="hyd" viewBox="0 0 430 200" role="img" aria-label="Fernwärme-Übergabestation: Wärmezähler, Regelventil und Rücklauffühler auf der Netzseite, Wärmetauscher, Pumpe und Vorlauffühler auf der Hausseite" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path class="vl" d="M14 50L183 50" stroke-width="3"/><path class="rl" d="M183 140L14 140" stroke-width="3"/><rect x="47" y="131" width="26" height="18" rx="3" class="bauteil bg"/><path d="M103 133L103 147L117 133L117 147Z" class="bauteil bg"/><path d="M110 147V157" class="bauteil"/><rect x="103" y="157" width="14" height="12" class="bauteil bg"/><path d="M140 140V155" class="bauteil" stroke-width="1"/><circle cx="140" cy="162" r="7" class="bauteil bg" stroke-width="1.2"/><rect x="183" y="45" width="34" height="100" rx="2" class="bauteil bg"/><path d="M183 145L217 45" class="bauteil"/><path class="vl" d="M217 50L400 50" stroke-width="3"/><path class="rl" d="M400 140L217 140" stroke-width="3"/><circle cx="255" cy="50" r="9" class="bauteil bg"/><path d="M251 44L262 50L251 56Z" class="bauteil"/><path d="M295 50V35" class="bauteil" stroke-width="1"/><circle cx="295" cy="28" r="7" class="bauteil bg" stroke-width="1.2"/><rect x="340" y="72" width="64" height="46" rx="3" class="bauteil bg"/><path class="vl" d="M372 50L372 72" stroke-width="3"/><path class="rl" d="M372 118L372 140" stroke-width="3"/><path class="vl fill" d="M35 46L45 50L35 54Z" stroke-width="1"/><path class="rl fill" d="M95 136L85 140L95 144Z" stroke-width="1"/><path class="vl fill" d="M315 46L325 50L315 54Z" stroke-width="1"/><path class="rl fill" d="M325 136L315 140L325 144Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="14" y="30" text-anchor="start" font-size="11" font-weight="600">Fernwärmenetz</text><text x="416" y="30" text-anchor="end" font-size="11" font-weight="600">Hausanlage</text><text x="60" y="144" text-anchor="middle" font-size="9.5">WZ</text><text x="110" y="166.5" text-anchor="middle" font-size="9.5">M</text><text x="140" y="165.5" text-anchor="middle" font-size="10">T</text><text x="295" y="31.5" text-anchor="middle" font-size="10">T</text><text x="372" y="98.33333333333333" text-anchor="middle" font-size="10"></text><text x="372" y="92" text-anchor="middle" font-size="10">Heizkreise,</text><text x="372" y="105" text-anchor="middle" font-size="10">Warmwasser</text><text x="140" y="180" text-anchor="middle" font-size="10">RL-Begrenzung</text><text x="222" y="165" text-anchor="start" font-size="10">Wärmetauscher</text></g></svg><figcaption>Indirekter Anschluss: Wärmezähler, Regelventil und Rücklaufbegrenzung auf der Netzseite, Wärmetauscher, Pumpe und Vorlauffühler auf der Hausseite.</figcaption></figure>

## Die Komponenten

### Netzseite (primär)

| Komponente                                  | Aufgabe                                                                     |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| Absperrarmaturen, Schmutzfänger             | Trennen vom Netz, Schutz der Armaturen                                      |
| **Wärmezähler**                             | Abrechnung, geeicht, gehört meist dem Versorger                             |
| **Regelventil**                             | Bestimmt über den Volumenstrom, wie viel Wärme übertragen wird              |
| **Differenzdruck- oder Volumenstromregler** | Hält die Verhältnisse am Regelventil stabil, begrenzt die Anschlussleistung |
| **Rücklauftemperaturbegrenzung**            | Schliesst das Ventil, wenn der Rücklauf zu warm wird                        |

### Wärmetauscher

Ein Plattenwärmetauscher trennt Netz und Haus hydraulisch. Das Netzwasser fliesst nie durch die Heizkörper, der Netzdruck bleibt draussen. Das nennt man **indirekten Anschluss**. Bei direkten Anschlüssen fliesst das Netzwasser durch die Hausanlage; das ist heute selten.

### Hausseite (sekundär)

Ab dem Wärmetauscher ist es eine normale Heizungsanlage: Verteiler, Heizkreise mit Pumpen und Mischventilen, Warmwasserbereitung, Lufterhitzer.

## Der Rücklauf ist die wichtigste Zahl

Die **technischen Anschlussbedingungen (TAB)** des Versorgers schreiben eine maximale Rücklauftemperatur vor, typisch 40 bis 55 °C. Warum der Versorger so darauf pocht:

- **Gleiche Leistung bei grosser Spreizung braucht weniger Wasser.** Kommt der Rücklauf zu warm zurück, muss mehr Wasser zirkulieren, und das kostet Pumpenstrom und Netzkapazität.
- **Wärmeverluste des Netzes** steigen mit der Rücklauftemperatur.
- **Viele Wärmequellen** (Wärmepumpen, Abwärme, Kondensation in Kesseln) arbeiten nur mit kaltem Rücklauf gut.

Manche Versorger rechnen deshalb einen Malus für zu warmen Rücklauf ab. Für die GA heisst das: Schaltungen mit tiefem Rücklauf wählen (siehe [Grundschaltungen](/wissen/ventil-schaltungen), Umlenk- und Einspritzschaltungen mit Dreiwegventil sind ungeeignet), [hydraulischen Abgleich](/wissen/hydraulischer-abgleich) machen, Überströmventile prüfen.

## Regelung

Die GA regelt die **Vorlauftemperatur auf der Hausseite** über das Regelventil auf der Netzseite. Der Sollwert kommt aus der [Heizkurve](/wissen/heizkurve) oder als höchste Anforderung der Heizkreise.

Dazu kommt die **Rücklaufbegrenzung** als zweiter Regler: Steigt der Rücklauf auf der Netzseite über den Grenzwert, begrenzt sie das Ventil, auch wenn der Vorlauf dann etwas unter Soll fällt. Umgesetzt als Minimalauswahl der beiden Stellgrössen.

Weitere Begrenzungen, die Versorger häufig verlangen:

- **Vorlauf-Maximalbegrenzung sekundär:** Das Netz ist meist heisser, als die Hausanlage verträgt. Die Begrenzung hält den Vorlauf auf der Hausseite unter dem Maximum. Sie ist eine Regelfunktion, **kein Sicherheitsorgan**. Wo Übertemperatur Schaden anrichtet, etwa bei Bodenheizungen, braucht es zusätzlich einen Sicherheitstemperaturwächter.
- **Rücklauf-Differenzbegrenzung (DRT):** Beim Anfahren am Morgen kommt der Rücklauf der Hausanlage sehr kalt zurück, der Wärmetauscher überträgt dann weit mehr als seine Nennleistung. Stationen nahe der Zentrale ziehen so viel Wärme, dass die entfernten unterversorgt sind. Die DRT-Begrenzung schliesst das Ventil, bis der Netzrücklauf höchstens einen eingestellten Wert über dem Hausrücklauf liegt.
- **Volumenstrombegrenzung:** Ein Differenzdruckregler hält den Druck über dem Regelventil konstant, eine Hubbegrenzung am Ventil begrenzt dann den maximalen Durchfluss. Der Versorger plombiert sie oft. Kombiventile mit eingebautem Differenzdruckregler heissen PICV.
- **Schleichmengen-Unterdrückung:** Unter etwa 10 % des Nenndurchflusses misst ein Wärmezähler ungenau, ein Flügelradzähler bleibt sogar stehen. Fällt die Stellgrösse unter etwa 10 %, schliesst der Regler das Ventil deshalb ganz.

Eine Besonderheit: Es gibt kein «Heizen ein/aus» wie beim Kessel. Das Netz liefert jederzeit Wärme, die Station bestimmt nur, wie viel sie abnimmt.

## Leistungsbegrenzung

Viele Verträge enthalten eine **Anschlussleistung** und einen Leistungspreis. Die GA hilft, Spitzen zu vermeiden:

- Warmwasserladung in Zeiten geringer Heizlast verschieben
- Lufterhitzer kurzzeitig begrenzen
- Morgendliches Aufheizen staffeln statt alle Gruppen gleichzeitig starten

## GA-Datenpunkte

| Datenpunkt                                   | Typ | Einheit       | Bemerkung                                     |
| -------------------------------------------- | --- | ------------- | --------------------------------------------- |
| Vorlauf Netzseite                            | AI  | °C            |                                               |
| Rücklauf Netzseite                           | AI  | °C            | Grenzwert nach TAB                            |
| Vorlauf Hausseite Ist                        | AI  | °C            | Regelgrösse                                   |
| Rücklauf Hausseite                           | AI  | °C            | Diagnose                                      |
| Regelventil Netzseite                        | AO  | %             |                                               |
| Wärmezähler: Energie, Leistung, Volumenstrom | Bus | kWh, kW, m³/h | meist M-Bus, Zugriff mit dem Versorger klären |
| Alarm Rücklauf zu hoch                       | BV  | —             | aus dem Grenzwert                             |
| Pumpe Hausseite Betrieb/Störung              | DI  | —             |                                               |

## Normen und Vorgaben

- **TAB des Versorgers** — massgebend für Anschluss, Rücklauftemperatur, Leistung
- **EN 14336** — Installation und Abnahme von Warmwasser-Heizungsanlagen
- **SIA 384/1** — Heizungsanlagen in Gebäuden

<!-- EN -->

District heating delivers heat through a pipe network. In the **substation**, network and building system meet, separated by a heat exchanger. The network side usually belongs to the utility, the building side is controlled by the BA.

<figure class="schema"><svg class="hyd" viewBox="0 0 430 200" role="img" aria-label="District heating substation: heat meter, control valve and return sensor on the network side, heat exchanger, pump and flow sensor on the building side" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path class="vl" d="M14 50L183 50" stroke-width="3"/><path class="rl" d="M183 140L14 140" stroke-width="3"/><rect x="47" y="131" width="26" height="18" rx="3" class="bauteil bg"/><path d="M103 133L103 147L117 133L117 147Z" class="bauteil bg"/><path d="M110 147V157" class="bauteil"/><rect x="103" y="157" width="14" height="12" class="bauteil bg"/><path d="M140 140V155" class="bauteil" stroke-width="1"/><circle cx="140" cy="162" r="7" class="bauteil bg" stroke-width="1.2"/><rect x="183" y="45" width="34" height="100" rx="2" class="bauteil bg"/><path d="M183 145L217 45" class="bauteil"/><path class="vl" d="M217 50L400 50" stroke-width="3"/><path class="rl" d="M400 140L217 140" stroke-width="3"/><circle cx="255" cy="50" r="9" class="bauteil bg"/><path d="M251 44L262 50L251 56Z" class="bauteil"/><path d="M295 50V35" class="bauteil" stroke-width="1"/><circle cx="295" cy="28" r="7" class="bauteil bg" stroke-width="1.2"/><rect x="340" y="72" width="64" height="46" rx="3" class="bauteil bg"/><path class="vl" d="M372 50L372 72" stroke-width="3"/><path class="rl" d="M372 118L372 140" stroke-width="3"/><path class="vl fill" d="M35 46L45 50L35 54Z" stroke-width="1"/><path class="rl fill" d="M95 136L85 140L95 144Z" stroke-width="1"/><path class="vl fill" d="M315 46L325 50L315 54Z" stroke-width="1"/><path class="rl fill" d="M325 136L315 140L325 144Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="14" y="30" text-anchor="start" font-size="11" font-weight="600">District heating network</text><text x="416" y="30" text-anchor="end" font-size="11" font-weight="600">Building system</text><text x="60" y="144" text-anchor="middle" font-size="9.5">HM</text><text x="110" y="166.5" text-anchor="middle" font-size="9.5">M</text><text x="140" y="165.5" text-anchor="middle" font-size="10">T</text><text x="295" y="31.5" text-anchor="middle" font-size="10">T</text><text x="372" y="98.33333333333333" text-anchor="middle" font-size="10"></text><text x="372" y="92" text-anchor="middle" font-size="10">Heating,</text><text x="372" y="105" text-anchor="middle" font-size="10">hot water</text><text x="140" y="180" text-anchor="middle" font-size="10">Return limit</text><text x="222" y="165" text-anchor="start" font-size="10">Heat exchanger</text></g></svg><figcaption>Indirect connection: heat meter, control valve and return limitation on the network side, heat exchanger, pump and flow sensor on the building side.</figcaption></figure>

## The Components

### Network Side (Primary)

| Component                                 | Purpose                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Isolating valves, strainer                | Separate from the network, protect the valves                           |
| **Heat meter**                            | Billing, calibrated, usually owned by the utility                       |
| **Control valve**                         | Determines through the flow rate how much heat is transferred           |
| **Differential pressure or flow limiter** | Keeps conditions at the control valve stable, limits the connected load |
| **Return temperature limitation**         | Closes the valve when the return gets too warm                          |

### Heat Exchanger

A plate heat exchanger separates network and building hydraulically. Network water never flows through the radiators, and the network pressure stays outside. This is called an **indirect connection**. In direct connections the network water flows through the building system; that is rare today.

### Building Side (Secondary)

From the heat exchanger on it is a normal heating system: header, heating circuits with pumps and mixing valves, hot water production, air heaters.

## The Return Is the Key Figure

The utility's **technical connection conditions** prescribe a maximum return temperature, typically 40 to 55 °C. Why the utility insists on it:

- **The same output with a large temperature difference needs less water.** If the return comes back too warm, more water must circulate, which costs pumping energy and network capacity.
- **Network heat losses** rise with the return temperature.
- **Many heat sources** (heat pumps, waste heat, condensation in boilers) only work well with a cold return.

Some utilities therefore charge a penalty for too warm a return. For the BA this means: choose circuits with a low return (see [Basic Circuits](/wissen/ventil-schaltungen); diverting circuits and injection circuits with three-way valve are unsuitable), carry out [hydraulic balancing](/wissen/hydraulischer-abgleich), check bypass valves.

## Control

The BA controls the **flow temperature on the building side** through the control valve on the network side. The setpoint comes from the [heating curve](/wissen/heizkurve) or as the highest demand of the heating circuits.

The **return limitation** acts as a second controller: if the network-side return rises above the limit, it limits the valve, even if the flow then drops slightly below setpoint. Implemented as a minimum selection of the two control signals.

Further limitations that suppliers often require:

- **Secondary flow maximum limit:** the network is usually hotter than the building system can tolerate. The limitation keeps the building-side flow below the maximum. It is a control function, **not a safety device**. Where overtemperature causes damage, for example with underfloor heating, a safety temperature monitor is needed as well.
- **Return differential limitation (DRT):** at morning start-up the building return comes back very cold, and the heat exchanger then transfers far more than its rated output. Substations close to the plant draw so much heat that distant ones are undersupplied. The DRT limitation closes the valve until the network return is at most a set value above the building return.
- **Flow limitation:** a differential pressure controller keeps the pressure across the control valve constant; a stroke limiter on the valve then limits the maximum flow. The supplier often seals it. Combination valves with a built-in differential pressure controller are called PICVs.
- **Low-flow suppression:** below about 10 % of nominal flow a heat meter measures inaccurately, and a vane meter even stops. If the control signal drops below about 10 %, the controller therefore closes the valve completely.

One peculiarity: there is no "heating on/off" as with a boiler. The network supplies heat at all times; the substation only decides how much it takes.

## Load Limitation

Many contracts include a **connected load** and a demand charge. The BA helps avoid peaks:

- shift hot water charging to times of low heating load
- limit air heaters briefly
- stagger morning heat-up instead of starting all groups at once

## BA Data Points

| Data point                      | Type | Unit          | Remark                                         |
| ------------------------------- | ---- | ------------- | ---------------------------------------------- |
| Network-side flow               | AI   | °C            |                                                |
| Network-side return             | AI   | °C            | limit per connection conditions                |
| Building-side flow actual       | AI   | °C            | controlled variable                            |
| Building-side return            | AI   | °C            | diagnosis                                      |
| Network-side control valve      | AO   | %             |                                                |
| Heat meter: energy, power, flow | bus  | kWh, kW, m³/h | usually M-Bus, clarify access with the utility |
| Alarm return too high           | BV   | —             | from the limit                                 |
| Building-side pump run/fault    | DI   | —             |                                                |

## Standards and Requirements

- **Utility's technical connection conditions** — decisive for connection, return temperature, load
- **EN 14336** — Installation and commissioning of water-based heating systems
- **SIA 384/1** — Heating systems in buildings
