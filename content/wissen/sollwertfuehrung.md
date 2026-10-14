---
title: Sollwertführung und gleitender Sollwert
title_en: Setpoint Scheduling and Sliding Setpoint
slug: sollwertfuehrung
category: regelung
subcategory: regelstrategien
tags:
  [
    sollwertführung,
    gleitender-sollwert,
    witterungsgeführt,
    tagesprogramm,
    nachtabsenkung,
    optimaler-start,
    optimales-aufheizen,
    festwert,
    kennlinienführung,
    aussentemperatur-führung,
    sparschaltung,
    komfortschaltung
  ]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, heizkurve, kaskadenregelung, vorsteuerung-aufschaltung, regelkreise, mpc-ga]
rechner: [heizkurve]
norm: [EN ISO 52120-1, SIA 386.110, VDI 3814]
updated: 2026-05-15
lang: de
---

# Sollwertführung und gleitender Sollwert

Bei einfachen Regelkreisen ist der Sollwert fest, zum Beispiel 21 °C Raumtemperatur. In der GA wird er oft **geführt**: Er ändert sich mit der Aussentemperatur, der Uhrzeit, der Belegung oder dem Zustand anderer Anlagenteile.

## Arten der Sollwertführung

### Festwert

Der Sollwert ist fest, zum Beispiel Zulufttemperatur 20 °C oder Speichertemperatur 60 °C. Das ist nicht veraltet, sondern für viele Kreise richtig. Geführt wird erst, wenn sich damit Energie sparen oder der Komfort verbessern lässt.

### Witterungsgeführt

Der Sollwert folgt der Aussentemperatur. Das bekannteste Beispiel ist die **Heizkurve**: Je kälter es draussen ist, desto höher der Vorlauf-Sollwert.

<p class="formel">θ<sub>VL,Soll</sub> = f(θ<sub>a</sub>)</p>

- Bei mildem Wetter tiefere Vorlauftemperaturen. Das verbessert den COP von Wärmepumpen und senkt Verteilverluste.
- Gleichmässigere Raumtemperatur, weil die Heizleistung schon vorab zur Witterung passt.

Siehe [Heizkurve](/wissen/heizkurve) und den [Heizkurven-Rechner](/rechner/heizkurve).

### Zeitprogramm

Der Sollwert wechselt nach Uhrzeit und Wochentag, zum Beispiel:

| Zeit              | Betriebsart | Raum-Sollwert |
| ----------------- | ----------- | ------------- |
| Mo–Fr 06:00–18:00 | Komfort     | 21 °C         |
| Mo–Fr 18:00–06:00 | Absenkung   | 17 °C         |
| Sa–So             | Absenkung   | 17 °C         |

### Witterung und Zeit kombiniert

Das ist die übliche Praxis. Die Absenkung wird als **Raum-Sollwert** eingegeben, zum Beispiel 4 K tiefer. Der Regler verschiebt die Heizkurve parallel. Beim Vorlauf ist die Verschiebung grösser als 4 K, je nach Steilheit der Kurve etwa das 1.5- bis 3-Fache.

## Absenken oder abschalten?

| Betriebsart     | Was passiert                                             |
| --------------- | -------------------------------------------------------- |
| **Absenkung**   | Raum-Sollwert tiefer, Heizung läuft weiter               |
| **Abschaltung** | Heizung aus, bis die Raumtemperatur eine Grenze erreicht |
| **Frostschutz** | nur noch Schutz von Gebäude und Anlage, etwa 5–8 °C Raum |

Ein verbreiteter Irrtum ist, dass das Wiederaufheizen am Morgen mehr Energie braucht, als die Nacht gespart hat. Physikalisch stimmt das nicht: Ein kühleres Gebäude verliert weniger Wärme, und mehr als die verlorene Wärme muss man nicht nachheizen. **Absenken spart fast immer.** Wie viel, hängt vom Gebäude ab:

- **Leichte, schlecht gedämmte Gebäude** kühlen schnell aus. Die Absenkung spart viel.
- **Schwere, gut gedämmte Gebäude** kühlen über Nacht kaum ab. Die Absenkung spart wenig, schadet aber nicht.
- **Fussbodenheizung** reagiert so träge, dass eine Nachtabsenkung oft nur verschoben wirkt. Kleine Absenkungen von 1 bis 2 K sind hier üblich.
- **Wärmepumpen:** Muss am Morgen mit höherer Vorlauftemperatur aufgeheizt werden, sinkt der COP. Ein Teil der Einsparung geht verloren, im schlechtesten Fall alles. Bei Wärmepumpen daher kleine Absenkungen und lange Aufheizzeiten oder gar keine Absenkung.

Eine Grenze gibt es beim **Komfort**: Ist die Aufheizleistung knapp, wird es am Morgen nicht rechtzeitig warm. Dagegen hilft der optimierte Aufheizbeginn.

## Optimierter Aufheizbeginn (Optimum Start)

Die DDC berechnet den **spätestmöglichen Startzeitpunkt**, damit der Raum genau zu Nutzungsbeginn die Komforttemperatur erreicht. Je später sie startet, desto länger bleibt das Gebäude kühl und desto mehr wird gespart.

<p class="formel">t<sub>Start</sub> = t<sub>Nutzung</sub> − t<sub>Aufheiz</sub>(Δθ<sub>Raum</sub>, θ<sub>a</sub>)</p>

Gute Regler **lernen** die Aufheizzeit: Sie messen jeden Morgen, wie lange es gedauert hat, und passen den Startzeitpunkt an. Das Gegenstück am Abend ist der **optimierte Abschaltzeitpunkt** (Optimum Stop): Die Heizung geht schon vor Nutzungsende aus, wenn die Raumtemperatur bis dahin nur wenig sinkt.

## Weitere Sollwertführungen

| Anwendung          | Führungsgrösse                                         | Geführter Sollwert        |
| ------------------ | ------------------------------------------------------ | ------------------------- |
| Heizkurve          | Aussentemperatur                                       | Vorlauftemperatur Heizung |
| Kaltwasser-Reset   | Ventilstellungen der Verbraucher oder Aussentemperatur | Kaltwasser-Vorlauf        |
| Zuluft-Reset       | Raumtemperatur oder Ventilstellungen                   | Zulufttemperatur          |
| Druck-Reset        | Klappenstellungen der VAV-Regler                       | Kanaldruck                |
| Sommerkompensation | Aussentemperatur                                       | Raum-Sollwert Kühlen      |

### Druck-Reset in der Lüftung

Sind alle VAV-Klappen deutlich unter ganz offen, ist der Kanaldruck höher als nötig. Der Druck-Sollwert wird schrittweise gesenkt, bis die am weitesten offene Klappe etwa 80 bis 90 % erreicht. Öffnet eine Klappe fast ganz, wird der Druck wieder angehoben. Diese Strategie heisst auch **Trim & Respond**. Sie spart viel Ventilatorstrom, weil die Leistung mit dem Druck stark sinkt.

- Klappe am weitesten offen unter 80 % → Sollwert um einen kleinen Schritt senken, zum Beispiel 10 Pa
- Klappe am weitesten offen über 95 % → Sollwert um einen Schritt anheben
- Zwischen den Schritten einige Minuten warten, damit die VAV-Regler nachziehen können

Ein einzelner VAV-Regler, der immer ganz offen steht, etwa wegen eines defekten Antriebs, blockiert die Strategie. Solche Regler müssen sich von der Auswertung ausnehmen lassen.

## Grenzen für geführte Sollwerte

Jeder geführte Sollwert braucht ein **Minimum und ein Maximum**:

| Sollwert                 | Minimum, Grund                           | Maximum, Grund                          |
| ------------------------ | ---------------------------------------- | --------------------------------------- |
| Vorlauf Heizkörper       | etwa 20–25 °C, darunter keine Wirkung    | Auslegungstemperatur, z.B. 55 °C        |
| Vorlauf Fussbodenheizung | etwa 20 °C                               | 35–40 °C, Schutz des Estrichs           |
| Kaltwasser Lüftung       | 6 °C, Abstand zum Gefrieren              | etwa 12–14 °C, sonst keine Entfeuchtung |
| Kühldecke                | über dem Taupunkt im Raum, etwa 16–18 °C | —                                       |
| Raum                     | 16–18 °C bei Absenkung                   | 26 °C                                   |
| Zuluft                   | 16–18 °C, sonst Zugluft                  | etwa 28–32 °C bei Luftheizung           |

## Normen

- **EN ISO 52120-1** — Einfluss der GA auf die Energieeffizienz, Nachfolger von EN 15232. Bewertet Funktionen wie witterungsgeführte Vorlauftemperatur, Zeitprogramme und optimierten Start. Je mehr davon umgesetzt sind, desto besser die GA-Effizienzklasse von D bis A.
- **SIA 386.110** — Schweizer Ausgabe von EN 15232
- **VDI 3814** — Gebäudeautomation, Funktionen und Begriffe

<!-- EN -->

In simple control loops the setpoint is fixed, for example a room temperature of 21 °C. In BA it is often **scheduled**: it changes with outdoor temperature, time of day, occupancy or the state of other parts of the plant.

## Types of Setpoint Scheduling

### Fixed Setpoint

The setpoint is fixed, for example supply air temperature 20 °C or storage temperature 60 °C. That is not outdated but right for many loops. Scheduling is only worth it when it saves energy or improves comfort.

### Weather-Compensated

The setpoint follows the outdoor temperature. The best-known example is the **heating curve**: the colder it is outside, the higher the flow setpoint.

<p class="formel">θ<sub>flow,set</sub> = f(θ<sub>a</sub>)</p>

- Lower flow temperatures in mild weather. This improves heat pump COP and reduces distribution losses.
- More even room temperature, because the heat output already matches the weather.

See [Heating Curve](/wissen/heizkurve) and the [heating curve calculator](/rechner/heizkurve).

### Time Schedule

The setpoint changes with time of day and day of week, for example:

| Time                | Mode    | Room setpoint |
| ------------------- | ------- | ------------- |
| Mon–Fri 06:00–18:00 | Comfort | 21 °C         |
| Mon–Fri 18:00–06:00 | Setback | 17 °C         |
| Sat–Sun             | Setback | 17 °C         |

### Weather and Time Combined

This is usual practice. The setback is entered as a **room setpoint**, for example 4 K lower. The controller shifts the heating curve in parallel. At the flow, the shift is larger than 4 K, roughly 1.5 to 3 times depending on the slope of the curve.

## Setback or Shutdown?

| Mode                 | What happens                                             |
| -------------------- | -------------------------------------------------------- |
| **Setback**          | lower room setpoint, heating keeps running               |
| **Shutdown**         | heating off until room temperature reaches a limit       |
| **Frost protection** | only protection of building and plant, about 5–8 °C room |

A common misconception is that reheating in the morning needs more energy than the night saved. Physically this is not true: a cooler building loses less heat, and you never have to reheat more than was lost. **Setback almost always saves.** How much depends on the building:

- **Light, poorly insulated buildings** cool down quickly. Setback saves a lot.
- **Heavy, well-insulated buildings** barely cool down overnight. Setback saves little but does no harm.
- **Underfloor heating** reacts so slowly that a night setback often only shifts in time. Small setbacks of 1 to 2 K are usual here.
- **Heat pumps:** if reheating in the morning needs a higher flow temperature, the COP drops. Part of the saving is lost, in the worst case all of it. With heat pumps, use small setbacks with long heat-up times, or none.

There is a limit on **comfort**: if the heating capacity is tight, it will not be warm in time in the morning. Optimum start helps against that.

## Optimum Start

The DDC calculates the **latest possible start time** so that the room reaches comfort temperature exactly at the start of occupancy. The later it starts, the longer the building stays cool and the more is saved.

<p class="formel">t<sub>start</sub> = t<sub>occupancy</sub> − t<sub>heat-up</sub>(Δθ<sub>room</sub>, θ<sub>a</sub>)</p>

Good controllers **learn** the heat-up time: they measure how long it took each morning and adjust the start time. The counterpart in the evening is **optimum stop**: heating switches off before the end of occupancy if the room temperature will only drop a little by then.

## Other Setpoint Schedules

| Application         | Guide variable                                      | Scheduled setpoint       |
| ------------------- | --------------------------------------------------- | ------------------------ |
| Heating curve       | outdoor temperature                                 | heating flow temperature |
| Chilled water reset | valve positions of consumers or outdoor temperature | chilled water flow       |
| Supply air reset    | room temperature or valve positions                 | supply air temperature   |
| Pressure reset      | damper positions of VAV boxes                       | duct pressure            |
| Summer compensation | outdoor temperature                                 | room cooling setpoint    |

### Pressure Reset in Ventilation

If all VAV dampers are well below fully open, the duct pressure is higher than needed. The pressure setpoint is lowered step by step until the most open damper reaches about 80 to 90 %. If a damper opens almost fully, the pressure is raised again. This strategy is also called **trim & respond**. It saves a lot of fan power, because power falls sharply with pressure.

- Most open damper below 80 % → lower the setpoint by a small step, for example 10 Pa
- Most open damper above 95 % → raise the setpoint by one step
- Wait a few minutes between steps so the VAV controllers can follow

A single VAV box that is always fully open, for example because of a faulty actuator, blocks the strategy. It must be possible to exclude such boxes from the evaluation.

## Limits for Scheduled Setpoints

Every scheduled setpoint needs a **minimum and a maximum**:

| Setpoint                  | Minimum, reason                      | Maximum, reason                               |
| ------------------------- | ------------------------------------ | --------------------------------------------- |
| Radiator flow             | about 20–25 °C, below that no effect | design temperature, e.g. 55 °C                |
| Underfloor heating flow   | about 20 °C                          | 35–40 °C, protection of the screed            |
| Chilled water ventilation | 6 °C, margin to freezing             | about 12–14 °C, otherwise no dehumidification |
| Chilled ceiling           | above room dew point, about 16–18 °C | —                                             |
| Room                      | 16–18 °C in setback                  | 26 °C                                         |
| Supply air                | 16–18 °C, otherwise draught          | about 28–32 °C with air heating               |

## Standards

- **EN ISO 52120-1** — Contribution of BA to energy performance, successor to EN 15232. Rates functions such as weather-compensated flow temperature, time schedules and optimum start. The more are implemented, the better the BA efficiency class from D to A.
- **SIA 386.110** — Swiss edition of EN 15232
- **VDI 3814** — Building automation, functions and terms
