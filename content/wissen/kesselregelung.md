---
title: Kesselregelung — Modulierend, gleitend, zweistufig
title_en: Boiler Control — Modulating, Sliding and Two-Stage
slug: kesselregelung
category: heizung
subcategory: kessel
tags:
  [
    kesselregelung,
    modulierend,
    zweistufig,
    gleitend,
    brenner,
    therme,
    rücklauftemperatur,
    rücklaufanhebung,
    taupunkt,
    kondensation,
    heizwert,
    brennwert,
    kaskade,
    abgasverlust,
    siegert
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [heizkurve, heizung-grundlagen, pufferspeicher, ventil-schaltungen, kaskadenregelung]
norm: [EN 303, EN 15502, LRV, 1. BImSchV, SIA 384/1]
updated: 2026-10-17
lang: de
---

# Kesselregelung — Modulierend, gleitend, zweistufig

Die Kesselregelung bestimmt, wie warm der Kessel ist und mit welcher Leistung der Brenner läuft. Das Ziel heute: so tief wie möglich fahren, damit ein Brennwertkessel kondensiert, und so wenig wie möglich takten.

## Brennerarten

| Brenner         | Leistung                    | Regelung                                                      | Nachteil                                  |
| --------------- | --------------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| **Einstufig**   | Ein oder aus                | Zweipunkt mit Schaltdifferenz um den Kesselsollwert           | Viele Starts, Verschleiss, Anfahrverluste |
| **Zweistufig**  | z.B. 60 % und 100 %         | Stufe 1 bei kleiner Abweichung, Stufe 2 bei grosser           | Immer noch Takten bei kleiner Last        |
| **Modulierend** | stufenlos, typisch 20–100 % | PI-Regler: Abweichung vom Sollwert ergibt die Brennerleistung | Unter der Mindestleistung taktet auch er  |

Die **Mindestleistung** ist der kritische Punkt: Braucht das Gebäude weniger, als der Brenner mindestens liefert, taktet auch ein modulierender Kessel. Darum der Modulationsbereich im Datenblatt (z.B. 1:5 oder 1:10) und, bei grossen Schwankungen, ein [Pufferspeicher](/wissen/pufferspeicher).

### Zweipunkt und Stufen richtig schalten

Ein Brenner im Ein/Aus-Betrieb liefert seine Leistung in Impulsen. Das **Einschaltverhältnis** ε = Laufzeit / Zykluszeit entspricht im Mittel der Last: ε = 0.4 heisst, der Kessel deckt 40 % seiner Leistung. Die Kesseltemperatur schwankt dabei immer stärker als die eingestellte Schaltdifferenz, weil die Strecke nachläuft. In der Siemens-Unterlage werden aus 5 K Schaltdifferenz im Betrieb rund 7 K Schwankung.

Die zweite Brennerstufe sollte nicht einfach bei einer festen Temperatur kommen. Besser ist ein **Integral der Abweichung** in K·min mit einer **Sperrzeit**: Stufe 2 startet erst, wenn die Temperatur eine Weile deutlich unter Soll liegt. Kurze Einbrüche, etwa wenn morgens eine Heizgruppe öffnet, lösen sie so nicht aus. Das Ausschalten funktioniert spiegelbildlich.

## Gleitende Kesseltemperatur

Statt fix auf 70 °C fährt der Kessel nur so warm, wie es die Heizkreise gerade brauchen. Der Sollwert kommt aus der Aussentemperatur, also aus der [Heizkurve](/wissen/heizkurve), oder als höchste Anforderung aller Heizkreise plus einige Kelvin Überhöhung für die Mischventile.

| Aussentemperatur | Kesselsollwert (Beispiel) |
| ---------------- | ------------------------- |
| −8 °C            | 70 °C                     |
| 0 °C             | 60 °C                     |
| 10 °C            | 45 °C                     |
| über Heizgrenze  | aus, ausser Warmwasser    |

Vorteile: weniger Bereitschaftsverluste, beim Brennwertkessel mehr Kondensation. Kommt eine Warmwasserladung, darf der Sollwert vorübergehend steigen.

## Heizwert und Brennwert

- **Heizwert Hi:** Energie des Brennstoffs ohne die Kondensationswärme des Wasserdampfs im Abgas
- **Brennwert Hs:** mit dieser Kondensationswärme, bei Erdgas rund 11 % mehr als Hi, bei Heizöl rund 6 %

Ein **Brennwertkessel** kühlt das Abgas unter seinen Taupunkt, bei Erdgas etwa 55 bis 57 °C, bei Heizöl etwa 47 °C. Weil Wirkungsgrade traditionell auf Hi bezogen werden, kommen dabei Werte über 100 % heraus. Als Richtwert für die Planung soll der Rücklauf beim **Gas-Brennwertkessel unter 50 °C**, beim **Öl-Brennwertkessel unter 40 °C** bleiben.

Entscheidend ist der **Rücklauf**: Nur wenn das Wasser kalt genug zurückkommt, kann der Wärmetauscher das Abgas unter den Taupunkt kühlen.

| Rücklauf   | Kondensation    | Normnutzungsgrad bezogen auf Hi (Erdgas) |
| ---------- | --------------- | ---------------------------------------- |
| 30 °C      | stark           | um 105–108 %                             |
| 45 °C      | teilweise       | um 102–104 %                             |
| über 55 °C | praktisch keine | wie ein guter Niedertemperaturkessel     |

Die Werte sind Richtwerte, die Kurve des eigenen Kessels steht im Datenblatt. Für die GA heisst das: Alles, was den Rücklauf anhebt, kostet Effizienz. Typische Ursachen sind Umlenkschaltungen, offene Überströmventile und fehlender [hydraulischer Abgleich](/wissen/hydraulischer-abgleich).

## Mindesttemperatur und Rücklaufanhebung

Ein **herkömmlicher Kessel** (kein Brennwert) darf nicht kondensieren: Das saure Kondensat greift den Wärmetauscher an. Die Hersteller schreiben deshalb eine Mindesttemperatur vor, je nach Bauart etwa 50 bis 60 °C. Ein Brennwertkessel braucht keine, er ist dafür gebaut.

Bei **Holzkesseln** ist der Grund ein anderer: Ein zu kalter Rücklauf lässt **Glanzruss** entstehen. Er setzt sich im Wärmetauscher und im Kamin fest, lässt sich nicht wegbürsten und kann einen Kaminbrand auslösen.

**Kesselsollwert:** Er muss mindestens um die Spreizung des Kessels und die halbe Schaltdifferenz über dem Mindestrücklauf liegen. Beispiel: Mindestrücklauf 60 °C, Spreizung 10 K, Schaltdifferenz 8 K ergibt 60 + 10 + 4 = 74 °C.

Die GA hält die Mindestrücklauftemperatur auf drei Wegen:

| Lösung                                 | Funktion                                                                                                              | Einsatz                                                                             |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Auf die Verbrauchergruppen wirkend** | Ist der Rücklauf zu kalt, sperrt ein Begrenzungsregler das weitere Öffnen der Gruppenventile oder schliesst sie etwas | alle Regler zentral, keine handgeregelten Gruppen; heute bei Pellets und Schnitzeln |
| **Eigenes Stellglied**                 | Ein separates Ventil mischt Vorlauf in den Kesselrücklauf, meist mit fester Vormischung                               | dezentrale oder gemischte Regler, heute am häufigsten, vor allem bei Holz           |
| **Kesselbeimischpumpe**                | Pumpe im Bypass zwischen Kesselvor- und -rücklauf, mit Thermostat                                                     | einfach und günstig, wirkt aber beim Aufheizen kaum                                 |

Worauf es ankommt:

- **Lufterhitzer ausnehmen.** Die Begrenzung drosselt die angeschlossenen Gruppen. Lüftungsregister brauchen aber sofort Wärme, sonst droht Frost. Sie werden von der Begrenzung ausgenommen oder am Verteiler so angeschlossen, dass sie zuerst versorgt werden.
- **Am drucklosen Verteiler** bestimmt die Lage des Kurzschlusses, wer beim Anfahren warmes Wasser bekommt: Gruppen vor dem Kurzschluss zuerst, Gruppen dahinter mischen sich kaltes Rücklaufwasser bei. Lufterhitzer also an den Anfang, Heizkörper und Bodenheizung ans Ende.
- **Beimischpumpe** nach Faustregel höchstens für 30 % des Gesamtvolumenstroms auslegen und mit Rückschlagklappe ausrüsten. Beim Aufheizen sinkt auch der Vorlauf, dann hilft sie wenig.
- **Kesselschutz geht vor Komfort.** Das Aufheizen dauert dadurch länger, notfalls startet die Heizung etwas früher.

Bei Brennwertkesseln entfällt das alles. Eine Rücklaufhochhaltung an einem Brennwertkessel ist ein Planungsfehler.

## Kaskade mehrerer Kessel

Bei grossen Anlagen teilen sich mehrere Kessel die Leistung. Beispiel 3 × 200 kW:

- **Führungskessel** moduliert allein, solange er reicht.
- Reicht seine Leistung eine Weile nicht, wird der **zweite Kessel** zugeschaltet. Die Bedingung lautet etwa „über 90 % Leistung oder Vorlauf unter Soll“, mit einer Verzögerung, damit kurze Spitzen ihn nicht starten.
- **Abschalten** mit Hysterese, damit die Kessel nicht pendeln.
- **Führungswechsel** nach Betriebsstunden oder wöchentlich, damit alle Kessel gleich altern.
- **Störung:** Fällt ein Kessel aus, übernimmt der nächste automatisch.

**Zuschaltkriterien** im Überblick:

| Kriterium                              | Art        | Bemerkung                                                                        |
| -------------------------------------- | ---------- | -------------------------------------------------------------------------------- |
| Von Hand                               | Freigabe   | Grossanlagen mit Betriebspersonal                                                |
| Aussentemperatur                       | Freigabe   | nur die **gedämpfte**, sonst schaltet es zu oft                                  |
| Vorlauf zum Hauptverteiler             | Zuschalten | Integral der Abweichung mit Sperrzeit, sehr verbreitet                           |
| Temperatur in der hydraulischen Weiche | Zuschalten | Fühler im Vorlauf nach der Weiche plus einer im Erzeugerrücklauf zum Wegschalten |
| Speichertemperatur                     | Zuschalten | Fühler oben schaltet zu, Fühler unten schaltet alle ab                           |
| Brennerlast                            | Zuschalten | modulierende Kessel, beide dann je etwa 30–100 %                                 |
| Modulationsgrad und Leistungsbilanz    | Zuschalten | für Brennwert-Kaskaden, mit Laufzeitstrategie                                    |

**Laufzeitstrategien** bei Brennwert-Kaskaden: möglichst wenige Kessel (wenig Gebläse- und Pumpenstrom), möglichst lange Laufzeiten (wenig Starts, wenig Emissionen) oder möglichst viele Kessel gleichzeitig. Brennwertkessel arbeiten bei Teillast besser, deshalb kann die dritte Strategie den besten Gesamtnutzungsgrad bringen.

**Parallel oder in Reihe:** Parallel geschaltete Kessel bekommen alle denselben, tiefen Rücklauf. Das ist bei Brennwertkesseln richtig. In Reihe geschaltet wärmt der zweite Erzeuger nach, was der erste geliefert hat. Das braucht man bei Wärmepumpen mit Zusatzheizung im bivalent-parallelen Betrieb, siehe [Wärmepumpe](/wissen/waermepumpe).

Ein bereits warmer Kessel darf früher zugeschaltet werden als ein kalter. Abgeschaltet wird der Folgekessel erst, wenn der vorherige die Last eindeutig allein schafft. Bei grossen Lastspitzen, etwa der Schnellaufheizung am Morgen oder einer Warmwasserladung, wird der Folgekessel dagegen sofort freigegeben.

Mehr zur Logik in [Kaskadenregelung](/wissen/kaskadenregelung).

## GA-Datenpunkte

| Datenpunkt                     | Typ    | Einheit | Bemerkung                            |
| ------------------------------ | ------ | ------- | ------------------------------------ |
| Kesselvorlauf Ist              | AI     | °C      |                                      |
| Kesselrücklauf Ist             | AI     | °C      | Kondensation, Rücklaufanhebung       |
| Kesselsollwert                 | AV     | °C      | gleitend                             |
| Kesselfreigabe                 | DO     | —       |                                      |
| Leistungsvorgabe               | AO     | %       | sofern der Kessel sie extern annimmt |
| Brenner Betrieb                | DI     | —       |                                      |
| Störung (Sammelstörung)        | DI     | —       |                                      |
| Abgastemperatur                | AI     | °C      | Verschmutzung, Effizienz             |
| Wärmezähler Kessel             | Zähler | kWh     | Leistung und Energie                 |
| Brennerstarts, Betriebsstunden | Zähler | —       | Takten erkennen                      |

Viele moderne Kessel haben einen eigenen Regler und werden über **Bus** (Modbus, BACnet, OpenTherm) oder **0–10 V** als Sollwert oder Leistung angesteuert. Was der Kessel annimmt, steht in seiner Anschlussanleitung.

## Abgasverlust

Den Abgasverlust misst der Kaminfeger nach der Formel von **Siegert**:

<p class="formel">q<sub>A</sub> = (t<sub>A</sub> − t<sub>L</sub>) · ( A<sub>2</sub> / (21 − O<sub>2</sub>) + B )</p>

| Grösse | Bedeutung                                                             |
| ------ | --------------------------------------------------------------------- |
| q_A    | Abgasverlust in % (bezogen auf Hi)                                    |
| t_A    | Abgastemperatur in °C                                                 |
| t_L    | Verbrennungslufttemperatur in °C                                      |
| O₂     | Sauerstoffgehalt im Abgas in %                                        |
| A₂, B  | Brennstoffkonstanten: Erdgas 0.66 und 0.009, Heizöl EL 0.68 und 0.007 |

**Beispiel Erdgas:** Abgas 120 °C, Luft 20 °C, O₂ 3 %: q_A = 100 × (0.66 / 18 + 0.009) ≈ **4.6 %**.

Die Abgastemperatur ist der einfachste Indikator für die GA: Steigt sie bei gleicher Leistung über Wochen an, verschmutzt der Wärmetauscher.

## Normen und Quellen

- Siemens Schweiz AG: «Regeln und Steuern von Heizungsanlagen», Schulungsunterlage BT_0094, 2023, Kap. 5 und 6
- **EN 303** — Heizkessel mit Gebläsebrenner
- **EN 15502** — Gasheizkessel
- **LRV (CH) / 1. BImSchV (DE)** — Emissionen und Abgasverlust
- **SIA 384/1** — Heizungsanlagen in Gebäuden, Grundlagen und Anforderungen

<!-- EN -->

Boiler control determines how warm the boiler is and at which output the burner runs. Today's goal: run as low as possible so a condensing boiler condenses, and cycle as little as possible.

## Burner Types

| Burner           | Output                         | Control                                                    | Drawback                           |
| ---------------- | ------------------------------ | ---------------------------------------------------------- | ---------------------------------- |
| **Single-stage** | on or off                      | On/off with switching differential around the setpoint     | Many starts, wear, start-up losses |
| **Two-stage**    | e.g. 60 % and 100 %            | Stage 1 for small deviation, stage 2 for large             | Still cycles at low load           |
| **Modulating**   | continuous, typically 20–100 % | PI controller: deviation from setpoint gives burner output | Below minimum output it cycles too |

The **minimum output** is the critical point: if the building needs less than the burner can deliver at minimum, even a modulating boiler cycles. Hence the modulation range in the datasheet (e.g. 1:5 or 1:10) and, with large fluctuations, a [buffer tank](/wissen/pufferspeicher).

### Switching On/Off Burners and Stages Properly

A burner in on/off operation delivers its output in pulses. The **duty ratio** ε = run time / cycle time corresponds on average to the load: ε = 0.4 means the boiler covers 40 % of its output. The boiler temperature always fluctuates more than the set switching differential, because the process overshoots. In the Siemens document, 5 K switching differential becomes about 7 K fluctuation in operation.

The second burner stage should not simply come in at a fixed temperature. Better is an **integral of the deviation** in K·min with a **lockout time**: stage 2 only starts when the temperature has been clearly below setpoint for a while. Short dips, for instance when a heating group opens in the morning, thus do not trigger it. Switching off works the other way round.

## Sliding Boiler Temperature

Instead of a fixed 70 °C, the boiler runs only as warm as the heating circuits currently need. The setpoint comes from the outdoor temperature, i.e. the [heating curve](/wissen/heizkurve), or as the highest demand of all circuits plus a few kelvin margin for the mixing valves.

| Outdoor temperature | Boiler setpoint (example) |
| ------------------- | ------------------------- |
| −8 °C               | 70 °C                     |
| 0 °C                | 60 °C                     |
| 10 °C               | 45 °C                     |
| above heating limit | off, except hot water     |

Benefits: lower standby losses, more condensation with a condensing boiler. During hot water charging the setpoint may rise temporarily.

## Net and Gross Calorific Value

- **Net calorific value Hi:** energy of the fuel without the condensation heat of the water vapour in the flue gas
- **Gross calorific value Hs:** including that condensation heat, about 11 % more than Hi for natural gas, about 6 % for heating oil

A **condensing boiler** cools the flue gas below its dew point, about 55 to 57 °C for natural gas and about 47 °C for heating oil. Because efficiencies are traditionally referred to Hi, values above 100 % result. As a design guide the return should stay **below 50 °C for a gas condensing boiler** and **below 40 °C for an oil condensing boiler**.

The **return** is what matters: only if the water comes back cold enough can the heat exchanger cool the flue gas below the dew point.

| Return      | Condensation     | Seasonal efficiency referred to Hi (natural gas) |
| ----------- | ---------------- | ------------------------------------------------ |
| 30 °C       | strong           | around 105–108 %                                 |
| 45 °C       | partial          | around 102–104 %                                 |
| above 55 °C | practically none | like a good low-temperature boiler               |

These are guide values; your boiler's curve is in its datasheet. For BA this means: anything that raises the return costs efficiency. Typical causes are diverting circuits, open bypass valves and missing [hydraulic balancing](/wissen/hydraulischer-abgleich).

## Minimum Temperature and Return Temperature Boost

A **conventional boiler** (non-condensing) must not condense: the acidic condensate attacks the heat exchanger. Manufacturers therefore specify a minimum temperature, about 50 to 60 °C depending on design. A condensing boiler needs none; it is built for it.

With **wood boilers** the reason is different: too cold a return produces **glazed soot**. It deposits in the heat exchanger and chimney, cannot be brushed off and can cause a chimney fire.

**Boiler setpoint:** it must be at least the boiler's temperature spread plus half the switching differential above the minimum return. Example: minimum return 60 °C, spread 10 K, switching differential 8 K gives 60 + 10 + 4 = 74 °C.

BA maintains the minimum return temperature in three ways:

| Solution                          | Function                                                                                                            | Use                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Acting on the consumer groups** | If the return is too cold, a limiting controller blocks further opening of the group valves or closes them slightly | all controllers central, no manually controlled groups; today for pellets and chips |
| **Separate control valve**        | A separate valve mixes flow water into the boiler return, usually with fixed pre-mixing                             | decentralised or mixed controllers; most common today, especially with wood         |
| **Boiler shunt pump**             | Pump in a bypass between boiler flow and return, with thermostat                                                    | simple and cheap, but hardly effective during warm-up                               |

What matters:

- **Exclude air heaters.** The limitation throttles the connected groups. Ventilation coils need heat immediately, though, otherwise they may freeze. They are excluded from the limitation or connected to the header so that they are supplied first.
- **On a zero-pressure header** the position of the short circuit determines who gets warm water at start-up: groups before the short circuit first, groups after it mix in cold return water. So air heaters go at the start, radiators and underfloor heating at the end.
- **Size the shunt pump** by rule of thumb for at most 30 % of the total flow and fit a non-return valve. During warm-up the flow temperature drops as well, so it helps little then.
- **Boiler protection comes before comfort.** Warm-up takes longer; if necessary the heating starts a little earlier.

With condensing boilers none of this applies. A return temperature boost on a condensing boiler is a design error.

## Cascade of Several Boilers

In large plants several boilers share the load. Example 3 × 200 kW:

- The **lead boiler** modulates alone as long as it is sufficient.
- If its output is insufficient for a while, the **second boiler** is switched on. The condition is something like "above 90 % output or flow below setpoint", with a delay so short peaks do not start it.
- **Switch-off** with hysteresis so the boilers do not hunt.
- **Lead rotation** by operating hours or weekly so all boilers age evenly.
- **Fault:** if one boiler fails, the next takes over automatically.

**Switch-on criteria** at a glance:

| Criterion                              | Kind      | Remark                                                                                    |
| -------------------------------------- | --------- | ----------------------------------------------------------------------------------------- |
| Manual                                 | Enable    | Large plants with operating staff                                                         |
| Outdoor temperature                    | Enable    | only the **attenuated** one, otherwise it switches too often                              |
| Flow to the main header                | Switch-on | Integral of deviation with lockout time, very common                                      |
| Temperature in the hydraulic separator | Switch-on | Sensor in the flow after the separator plus one in the generator return for switching off |
| Storage temperature                    | Switch-on | Top sensor switches on, bottom sensor switches all off                                    |
| Burner load                            | Switch-on | Modulating boilers, both then at about 30–100 % each                                      |
| Modulation level and power balance     | Switch-on | For condensing cascades, with run-time strategy                                           |

**Run-time strategies** for condensing cascades: as few boilers as possible (little fan and pump power), run times as long as possible (few starts, low emissions) or as many boilers as possible at once. Condensing boilers work better at part load, so the third strategy can give the best overall efficiency.

**Parallel or in series:** boilers connected in parallel all get the same low return. That is right for condensing boilers. Connected in series, the second generator tops up what the first delivered. This is needed for heat pumps with a backup heater in bivalent-parallel mode, see [Heat Pump](/wissen/waermepumpe).

A boiler that is already warm may be switched on earlier than a cold one. The following boiler is only switched off once the previous one can clearly handle the load alone. For large load peaks, such as morning boost heating or hot water charging, the following boiler is released immediately.

More on the logic in [Cascade Control](/wissen/kaskadenregelung).

## BA Data Points

| Data point               | Type  | Unit | Remark                              |
| ------------------------ | ----- | ---- | ----------------------------------- |
| Boiler flow actual       | AI    | °C   |                                     |
| Boiler return actual     | AI    | °C   | condensation, return boost          |
| Boiler setpoint          | AV    | °C   | sliding                             |
| Boiler enable            | DO    | —    |                                     |
| Output demand            | AO    | %    | if the boiler accepts it externally |
| Burner running           | DI    | —    |                                     |
| Fault (common alarm)     | DI    | —    |                                     |
| Flue gas temperature     | AI    | °C   | fouling, efficiency                 |
| Heat meter boiler        | meter | kWh  | output and energy                   |
| Burner starts, run hours | meter | —    | detect cycling                      |

Many modern boilers have their own controller and are driven via **bus** (Modbus, BACnet, OpenTherm) or **0–10 V** as setpoint or output. What the boiler accepts is in its connection manual.

## Flue Gas Loss

The chimney sweep measures flue gas loss with the **Siegert** formula:

<p class="formel">q<sub>A</sub> = (t<sub>A</sub> − t<sub>L</sub>) · ( A<sub>2</sub> / (21 − O<sub>2</sub>) + B )</p>

| Quantity | Meaning                                                                   |
| -------- | ------------------------------------------------------------------------- |
| q_A      | flue gas loss in % (referred to Hi)                                       |
| t_A      | flue gas temperature in °C                                                |
| t_L      | combustion air temperature in °C                                          |
| O₂       | oxygen content of the flue gas in %                                       |
| A₂, B    | fuel constants: natural gas 0.66 and 0.009, heating oil EL 0.68 and 0.007 |

**Example natural gas:** flue gas 120 °C, air 20 °C, O₂ 3 %: q_A = 100 × (0.66 / 18 + 0.009) ≈ **4.6 %**.

Flue gas temperature is the simplest indicator for BA: if it rises over weeks at the same output, the heat exchanger is fouling.

## Standards and Sources

- Siemens Schweiz AG: "Regeln und Steuern von Heizungsanlagen", training document BT_0094, 2023, ch. 5 and 6
- **EN 303** — Heating boilers with forced draught burners
- **EN 15502** — Gas-fired heating boilers
- **LRV (CH) / 1. BImSchV (DE)** — Emissions and flue gas loss
- **SIA 384/1** — Heating systems in buildings, fundamentals and requirements
