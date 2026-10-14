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
updated: 2026-10-14
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

Ein **Brennwertkessel** kühlt das Abgas unter seinen Taupunkt, bei Erdgas etwa 55 bis 57 °C. Weil Wirkungsgrade traditionell auf Hi bezogen werden, kommen dabei Werte über 100 % heraus.

Entscheidend ist der **Rücklauf**: Nur wenn das Wasser kalt genug zurückkommt, kann der Wärmetauscher das Abgas unter den Taupunkt kühlen.

| Rücklauf   | Kondensation    | Normnutzungsgrad bezogen auf Hi (Erdgas) |
| ---------- | --------------- | ---------------------------------------- |
| 30 °C      | stark           | um 105–108 %                             |
| 45 °C      | teilweise       | um 102–104 %                             |
| über 55 °C | praktisch keine | wie ein guter Niedertemperaturkessel     |

Die Werte sind Richtwerte, die Kurve des eigenen Kessels steht im Datenblatt. Für die GA heisst das: Alles, was den Rücklauf anhebt, kostet Effizienz. Typische Ursachen sind Umlenkschaltungen, offene Überströmventile und fehlender [hydraulischer Abgleich](/wissen/hydraulischer-abgleich).

## Mindesttemperatur und Rücklaufanhebung

Ein **herkömmlicher Kessel** (kein Brennwert) darf nicht kondensieren: Das saure Kondensat greift den Wärmetauscher an. Die Hersteller schreiben deshalb eine Mindesttemperatur vor, je nach Bauart etwa 50 bis 60 °C. Ein Brennwertkessel braucht keine, er ist dafür gebaut.

Die GA hält die Mindesttemperatur auf zwei Wegen:

- **Rücklaufanhebung:** Ein Mischventil oder eine Pumpe mischt heisses Vorlaufwasser in den Kesselrücklauf, bis der Rücklauf die Mindesttemperatur hat.
- **Verbraucher drosseln:** Solange der Kessel zu kalt ist, fahren die Mischventile der Heizkreise zu. Der Kessel bekommt wenig kaltes Wasser zurück und wärmt sich schnell auf.

Bei mehreren Kesseln oder viel Anlagenvolumen ist das besonders beim Anfahren am Morgen wichtig.

## Kaskade mehrerer Kessel

Bei grossen Anlagen teilen sich mehrere Kessel die Leistung. Beispiel 3 × 200 kW:

- **Führungskessel** moduliert allein, solange er reicht.
- Reicht seine Leistung eine Weile nicht, wird der **zweite Kessel** zugeschaltet. Die Bedingung lautet etwa „über 90 % Leistung oder Vorlauf unter Soll“, mit einer Verzögerung, damit kurze Spitzen ihn nicht starten.
- **Abschalten** mit Hysterese, damit die Kessel nicht pendeln.
- **Führungswechsel** nach Betriebsstunden oder wöchentlich, damit alle Kessel gleich altern.
- **Störung:** Fällt ein Kessel aus, übernimmt der nächste automatisch.

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

$$q_A = (t_A - t_L) \cdot \left( \frac{A_2}{21 - O_2} + B \right)$$

| Grösse | Bedeutung                                                             |
| ------ | --------------------------------------------------------------------- |
| q_A    | Abgasverlust in % (bezogen auf Hi)                                    |
| t_A    | Abgastemperatur in °C                                                 |
| t_L    | Verbrennungslufttemperatur in °C                                      |
| O₂     | Sauerstoffgehalt im Abgas in %                                        |
| A₂, B  | Brennstoffkonstanten: Erdgas 0.66 und 0.009, Heizöl EL 0.68 und 0.007 |

**Beispiel Erdgas:** Abgas 120 °C, Luft 20 °C, O₂ 3 %: q_A = 100 × (0.66 / 18 + 0.009) ≈ **4.6 %**.

Die Abgastemperatur ist der einfachste Indikator für die GA: Steigt sie bei gleicher Leistung über Wochen an, verschmutzt der Wärmetauscher.

## Normen

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

A **condensing boiler** cools the flue gas below its dew point, about 55 to 57 °C for natural gas. Because efficiencies are traditionally referred to Hi, values above 100 % result.

The **return** is what matters: only if the water comes back cold enough can the heat exchanger cool the flue gas below the dew point.

| Return      | Condensation     | Seasonal efficiency referred to Hi (natural gas) |
| ----------- | ---------------- | ------------------------------------------------ |
| 30 °C       | strong           | around 105–108 %                                 |
| 45 °C       | partial          | around 102–104 %                                 |
| above 55 °C | practically none | like a good low-temperature boiler               |

These are guide values; your boiler's curve is in its datasheet. For BA this means: anything that raises the return costs efficiency. Typical causes are diverting circuits, open bypass valves and missing [hydraulic balancing](/wissen/hydraulischer-abgleich).

## Minimum Temperature and Return Temperature Boost

A **conventional boiler** (non-condensing) must not condense: the acidic condensate attacks the heat exchanger. Manufacturers therefore specify a minimum temperature, about 50 to 60 °C depending on design. A condensing boiler needs none; it is built for it.

The BA maintains the minimum temperature in two ways:

- **Return temperature boost:** a mixing valve or pump mixes hot flow water into the boiler return until the return reaches the minimum temperature.
- **Throttling the consumers:** while the boiler is too cold, the mixing valves of the heating circuits close. The boiler gets little cold water back and warms up quickly.

With several boilers or a large system volume this matters especially at morning start-up.

## Cascade of Several Boilers

In large plants several boilers share the load. Example 3 × 200 kW:

- The **lead boiler** modulates alone as long as it is sufficient.
- If its output is insufficient for a while, the **second boiler** is switched on. The condition is something like "above 90 % output or flow below setpoint", with a delay so short peaks do not start it.
- **Switch-off** with hysteresis so the boilers do not hunt.
- **Lead rotation** by operating hours or weekly so all boilers age evenly.
- **Fault:** if one boiler fails, the next takes over automatically.

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

$$q_A = (t_A - t_L) \cdot \left( \frac{A_2}{21 - O_2} + B \right)$$

| Quantity | Meaning                                                                   |
| -------- | ------------------------------------------------------------------------- |
| q_A      | flue gas loss in % (referred to Hi)                                       |
| t_A      | flue gas temperature in °C                                                |
| t_L      | combustion air temperature in °C                                          |
| O₂       | oxygen content of the flue gas in %                                       |
| A₂, B    | fuel constants: natural gas 0.66 and 0.009, heating oil EL 0.68 and 0.007 |

**Example natural gas:** flue gas 120 °C, air 20 °C, O₂ 3 %: q_A = 100 × (0.66 / 18 + 0.009) ≈ **4.6 %**.

Flue gas temperature is the simplest indicator for BA: if it rises over weeks at the same output, the heat exchanger is fouling.

## Standards

- **EN 303** — Heating boilers with forced draught burners
- **EN 15502** — Gas-fired heating boilers
- **LRV (CH) / 1. BImSchV (DE)** — Emissions and flue gas loss
- **SIA 384/1** — Heating systems in buildings, fundamentals and requirements
