---
title: Eis- und Kaltwasserspeicher — Kälte auf Vorrat
title_en: Ice and Chilled Water Storage — Cooling in Advance
slug: eisspeicher
category: kaelte
subcategory: speicher
tags:
  [
    eisspeicher,
    kältespeicher,
    kaltwasserspeicher,
    latentspeicher,
    teilspeicherung,
    vollspeicherung,
    lastspitze,
    niedertarif,
    glykol,
    ladezustand,
    wärmepumpe,
    solar-luftabsorber
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [kaelteanlagen, kaeltekreislauf, pufferspeicher, ems-lastmanagement, waermepumpe, free-cooling]
norm: [SIA 382/1]
updated: 2026-10-17
lang: de
---

# Eis- und Kaltwasserspeicher — Kälte auf Vorrat

Ein Kältespeicher entkoppelt die Kälteerzeugung vom Verbrauch. Die Kältemaschine kann dann laufen, wann es günstig ist, und muss nicht für die kurze Spitze am Nachmittag ausgelegt sein.

## Kaltwasser oder Eis

| Speicher       | Wie                                                           | Typischer Einsatz                                                                                     |
| -------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Kaltwasser** | Wasser im Netz, z.B. 6/12 °C, wird um einige Kelvin abgekühlt | Puffer für Minuten bis wenige Stunden: längere Laufzeiten, stabile Regelung, hydraulische Entkopplung |
| **Eis**        | Wasser gefriert, die Schmelzwärme wird gespeichert            | Lastverschiebung über viele Stunden, Spitzenkappung, Notkühlung                                       |

Eis speichert viel mehr: Die Schmelzwärme von 334 kJ/kg entspricht rund dem 80-Fachen dessen, was Wasser pro Kelvin Abkühlung aufnimmt. Darum heisst der Eisspeicher auch **Latentspeicher**. Er braucht bei gleicher Kühlenergie ein Vielfaches weniger Volumen und liefert konstant etwa 0 °C.

Ein Kaltwasserspeicher funktioniert wie ein [Pufferspeicher](/wissen/pufferspeicher) auf der Heizseite, nur mit umgekehrten Vorzeichen.

## Wann sich ein Eisspeicher lohnt

- Die **elektrische Lastspitze** des Gebäudes fällt auf einen Sommernachmittag. Weniger Kältemaschinenleistung senkt den Leistungspreis.
- **Niedertarif** in der Nacht lässt sich zum Laden nutzen.
- Eine bestehende Anlage braucht **mehr Kälteleistung**, ohne neue Kältemaschine.
- **Notkühlung** bei Stromausfall, z.B. für Rechenzentren oder Operationssäle. Der Speicher entlastet die Notstromanlage.
- **Schwachlast** wird aus dem Speicher gedeckt, die Maschine taktet nicht.
- Gewerbe mit kurzer, hoher Spitze, etwa Molkereien: Die Maschine läuft gleichmässig über 12 bis 14 Stunden.

Je höher und kürzer die Spitze gegenüber dem Tagesmittel, desto mehr bringt der Speicher. Ob es sich rechnet, hängt stark vom Stromtarif ab.

## Auslegung: Teil- oder Vollspeicherung

**Beispiel aus der Siemens-Unterlage:** Ein Gebäude braucht an einem Sommertag 1640 kWh Kälte, die Spitze von 200 kW aber nur während zwei Stunden. Eine 200-kW-Maschine könnte über die Betriebszeit 2200 kWh liefern. Sie wird also nur zu etwa drei Vierteln genutzt.

| Strategie           | Kältemaschine                                                                  | Speicher                                           |
| ------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------- |
| **Teilspeicherung** | läuft rund um die Uhr mit der mittleren Leistung, nachts lädt sie den Speicher | deckt tagsüber die Spitzen zusätzlich zur Maschine |
| **Vollspeicherung** | läuft nur im Niedertarif, meist nachts                                         | deckt tagsüber den ganzen Bedarf allein            |

Die Teilspeicherung ergibt die kleinste Kältemaschine und ist bei Neuanlagen oft die günstigste Lösung. Die Vollspeicherung braucht einen grösseren Speicher und eine aufwendigere Hydraulik, kann aber über den Tarif die tiefsten Betriebskosten bringen.

## Bauarten

- **Wärmetauscherrohre im Tank:** Spiralförmig gewickelte Kunststoffrohre füllen den Behälter, ein Glykol-Wasser-Gemisch fliesst hindurch. Das Eis bildet sich um die Rohre und schmilzt von innen nach aussen. Keine Eisdickenüberwachung nötig, heute verbreitet.
- **Kunststoffkugeln:** Der Tank ist zu etwa 50 bis 70 % mit wassergefüllten, elastischen Kugeln gefüllt, Sole umströmt sie. Der Solekreis braucht ein Ausdehnungsgefäss.
- **Direktverdampfung:** Der Verdampfer der Kältemaschine liegt direkt im Wassertank. Mit wachsender Eisdicke sinkt die Leistung, die Eisdicke muss überwacht werden.

## Hydraulik und Betriebsarten

| Betriebsart              | Was läuft                                                                                                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Laden** (meist nachts) | Kältemaschine kühlt das Glykol unter 0 °C, etwa −3 °C. Das Wasser im Speicher gefriert. Zu den Verbrauchern fliesst nichts.                                                |
| **Entladen in Reihe**    | Die Kältemaschine kühlt den Rücklauf vor, z.B. von 12 auf 10 °C, der Speicher weiter auf etwa 1 °C. Ein Mischventil stellt den Vorlauf für die Verbraucher ein, z.B. 6 °C. |
| **Bypass**               | In der Übergangszeit reicht die Maschine allein, der Speicher wird umgangen.                                                                                               |

Die Kältemaschine arbeitet so je nach Betriebsart mit ganz unterschiedlichen Temperaturen: beim Laden deutlich unter 0 °C, beim Entladen über 0 °C. Das muss bei der Auswahl der Maschine berücksichtigt werden, denn ihr EER ist beim Laden schlechter. Alle Verbraucher, etwa die Lüftungskühler, müssen für Glykol ausgelegt sein.

## Regelung für die GA

- **Mischtemperatur** beim Entladen: Ein Dreiwegventil nach dem Speicher mischt kaltes Glykol aus dem Speicher mit wärmerem von der Kältemaschine auf den Vorlaufsollwert.
- **Umschaltventil** nach Betriebsart: Umlenkung beim Laden, Durchgang beim Entladen und im Bypass. Keine Regelfunktion.
- **Ladezustand:** Viele Speicher liefern ihn als 0–10 V oder 4–20 mA. Damit lässt sich das Laden starten und stoppen.
- **Prognose:** In der Übergangszeit muss der Speicher nicht voll geladen werden. Eine einfache Prognose aus gedämpfter Aussentemperatur, Aussenfeuchte und dem Verbrauch der Vortage spart Ladeenergie. Zu komplexe Prognosen lohnen sich in der Praxis selten.
- **Lastmanagement:** Entladen dann, wenn der Strombezug des Gebäudes am höchsten ist, siehe [Energiemanagement](/wissen/ems-lastmanagement).

## Eisspeicher als Wärmequelle

Ein Eisspeicher funktioniert auch umgekehrt, als Quelle für eine **Sole/Wasser-Wärmepumpe**. Im Winter entzieht die Wärmepumpe dem Wasser Wärme, bis es nach und nach gefriert. Dabei wird zusätzlich die Erstarrungswärme frei. Ein **Solar-Luftabsorber** oder Sonnenkollektoren regenerieren den Speicher und tauen ihn wieder auf. Ein erdverlegter Speicher bekommt zudem Wärme aus dem umgebenden Erdreich.

Im Frühling vollständig vereist, liefert er im Sommer Kälte zum Kühlen ohne Kältemaschine (Free Cooling). Mehr zur Wärmepumpe in [Wärmepumpe](/wissen/waermepumpe).

## Quellen

- Siemens Schweiz AG: «Kältetechnik», Schulungsunterlage BT_0099, 2022, Kap. 6.3 und 9

<!-- EN -->

A cold storage decouples cooling production from consumption. The chiller can then run when it is cheap and does not have to be sized for the short afternoon peak.

## Chilled Water or Ice

| Storage           | How                                                           | Typical use                                                                               |
| ----------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Chilled water** | Water in the network, e.g. 6/12 °C, is cooled by a few kelvin | Buffer for minutes to a few hours: longer run times, stable control, hydraulic decoupling |
| **Ice**           | Water freezes; the latent heat of fusion is stored            | Load shifting over many hours, peak shaving, emergency cooling                            |

Ice stores far more: the latent heat of 334 kJ/kg corresponds to about 80 times what water absorbs per kelvin of cooling. That is why ice storage is also called **latent storage**. For the same cooling energy it needs many times less volume and delivers a constant temperature of about 0 °C.

A chilled water tank works like a [buffer tank](/wissen/pufferspeicher) on the heating side, just with opposite signs.

## When Ice Storage Pays

- The building's **electrical peak** falls on a summer afternoon. Less chiller output lowers the demand charge.
- A night-time **low tariff** can be used for charging.
- An existing plant needs **more cooling capacity** without a new chiller.
- **Emergency cooling** during a power failure, e.g. for data centres or operating theatres. The storage relieves the emergency power system.
- **Low load** is covered from storage; the chiller does not cycle.
- Businesses with a short, high peak, such as dairies: the chiller runs evenly over 12 to 14 hours.

The higher and shorter the peak compared with the daily average, the more storage brings. Whether it pays depends heavily on the electricity tariff.

## Sizing: Partial or Full Storage

**Example from the Siemens document:** a building needs 1640 kWh of cooling on a summer day, but the 200 kW peak lasts only two hours. A 200 kW chiller could deliver 2200 kWh over the operating time. It is thus only about three-quarters utilised.

| Strategy            | Chiller                                                                 | Storage                                                    |
| ------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------- |
| **Partial storage** | runs around the clock at the average load; charges the storage at night | covers the peaks during the day in addition to the chiller |
| **Full storage**    | runs only at the low tariff, usually at night                           | covers the entire daytime demand alone                     |

Partial storage gives the smallest chiller and is often the cheapest solution for new plants. Full storage needs a larger store and more complex hydraulics, but can give the lowest operating costs via the tariff.

## Types

- **Heat exchanger tubes in the tank:** spirally wound plastic tubes fill the tank, a glycol-water mixture flows through them. Ice forms around the tubes and melts from the inside out. No ice thickness monitoring needed; common today.
- **Plastic balls:** the tank is about 50 to 70 % filled with water-filled elastic balls, brine flows around them. The brine circuit needs an expansion vessel.
- **Direct expansion:** the chiller's evaporator sits directly in the water tank. Output drops as the ice thickens; ice thickness must be monitored.

## Hydraulics and Operating Modes

| Mode                            | What runs                                                                                                                                           |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Charging** (usually at night) | The chiller cools the glycol below 0 °C, about −3 °C. The water in the store freezes. Nothing flows to the consumers.                               |
| **Discharging in series**       | The chiller precools the return, e.g. from 12 to 10 °C, the store further to about 1 °C. A mixing valve sets the flow for the consumers, e.g. 6 °C. |
| **Bypass**                      | In the shoulder season the chiller alone is enough; the store is bypassed.                                                                          |

The chiller thus works at very different temperatures depending on the mode: well below 0 °C when charging, above 0 °C when discharging. This must be considered when selecting the machine, since its EER is worse when charging. All consumers, such as ventilation coolers, must be designed for glycol.

## Control for BA

- **Mixed temperature** when discharging: a three-way valve after the store mixes cold glycol from the store with warmer glycol from the chiller to the flow setpoint.
- **Changeover valve** by mode: diverting when charging, straight through when discharging and in bypass. No control function.
- **State of charge:** many stores provide it as 0–10 V or 4–20 mA. This can be used to start and stop charging.
- **Forecast:** in the shoulder season the store need not be fully charged. A simple forecast from attenuated outdoor temperature, outdoor humidity and the consumption of previous days saves charging energy. Overly complex forecasts rarely pay off in practice.
- **Load management:** discharge when the building's electricity demand is highest, see [Energy Management](/wissen/ems-lastmanagement).

## Ice Storage as a Heat Source

Ice storage also works the other way round, as a source for a **brine/water heat pump**. In winter the heat pump draws heat from the water until it gradually freezes, releasing the heat of solidification in addition. A **solar air absorber** or solar collectors regenerate the store and thaw it again. A buried store also gains heat from the surrounding ground.

Fully frozen in spring, it delivers cooling in summer without a chiller (free cooling). More on the heat pump in [Heat Pump](/wissen/waermepumpe).

## Sources

- Siemens Schweiz AG: "Kältetechnik", training document BT_0099, 2022, ch. 6.3 and 9
