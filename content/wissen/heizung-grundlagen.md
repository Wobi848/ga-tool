---
title: Heizung Grundlagen — Aufbau und Komponenten
title_en: Heating Fundamentals — System Layout and Components
slug: heizung-grundlagen
category: heizung
subcategory: grundlagen
tags:
  [
    heizung,
    warmwasserheizung,
    vorlauf,
    rücklauf,
    heizkreis,
    pumpe,
    mischventil,
    ausdehnungsgefäss,
    sicherheitsventil,
    erzeuger,
    verteiler,
    verbraucher,
    heizkörper,
    fern-wärme,
    kesselregelung
  ]
difficulty: grundlagen
area: [hlk, ga]
related:
  [
    hydraulische-schaltungen,
    hydraulischer-abgleich,
    heizkurve,
    waermepumpe,
    pufferspeicher,
    fussbodenheizung,
    fernwaerme,
    kesselregelung,
    ventil-schaltungen,
    holzheizung
  ]

norm: [EN 12828, VDI 2035, SIA 384/1]
updated: 2026-10-16
lang: de
---

# Heizung Grundlagen — Aufbau und Komponenten

Die Warmwasserheizung ist das häufigste Heizsystem in Gebäuden. Verstehen wie Wärmeerzeugung, Verteilung und Abgabe zusammenspielen ist Grundlage für jede GA-Arbeit im Heizungsbereich.

## System-Übersicht

| Teil            | Was                                  | Beispiele                                  |
| --------------- | ------------------------------------ | ------------------------------------------ |
| **Erzeuger**    | Macht die Wärme                      | Kessel, Wärmepumpe, Fernwärme-Übergabe     |
| **Verteilung**  | Bringt sie hin und das Wasser zurück | Pumpen, Verteiler, Rohrnetz, Mischventile  |
| **Verbraucher** | Gibt sie an den Raum ab              | Heizkörper, Fussbodenheizung, Lufterhitzer |
| **Sicherheit**  | Schützt die Anlage                   | Sicherheitsventil, Ausdehnungsgefäss       |

---

## Erzeuger

### Kessel (Gas, Öl)

| Kesseltyp              | Normnutzungsgrad (auf Hi) | Kesseltemperatur              | Besonderheit                                                  |
| ---------------------- | ------------------------- | ----------------------------- | ------------------------------------------------------------- |
| Standardkessel (alt)   | 75–85 %                   | konstant 70–90 °C             | Darf nicht kondensieren, Mindestrücklauf nötig                |
| Niedertemperaturkessel | 88–92 %                   | gleitend, ab etwa 40 °C       | Für tiefe Temperaturen gebaut, kondensiert aber nicht gezielt |
| Brennwertkessel        | 97–108 %                  | gleitend, so tief wie möglich | Nutzt die Kondensation, braucht kalten Rücklauf               |

**Brennwert:** Latente Wärme aus Kondensation wird genutzt → Wirkungsgrad > 100 % (bezogen auf Heizwert). Kondensatableitung nötig.

### Modulierende Kesselregelung

Moderner Brennwertkessel passt seine Leistung stufenlos an:

- Modulationsbereich: 20–100 % der Nennleistung
- Regelgrösse: Vorlauftemperatur (aus Heizkurve)
- Vorteile: weniger Taktbetrieb, besserer Jahreswirkungsgrad

---

## Sicherheitskomponenten

### Ausdehnungsgefäss (MAG)

Wasser dehnt sich beim Erwärmen aus, von 10 auf 80 °C um knapp 3 %. Das MAG nimmt diese Ausdehnung auf: Auf der einen Seite der Membran ist Wasser, auf der anderen ein Gaspolster. Wird das Wasser warm, drückt es mehr Wasser ins MAG und das Gaspolster wird zusammengepresst.

**Dimensionierung:** Das Nennvolumen ist die Ausdehnung plus eine Wasservorlage, multipliziert mit dem Druckfaktor:

<p class="formel">V<sub>N</sub> = (V<sub>e</sub> + V<sub>V</sub>) · (p<sub>e</sub> + 1) / (p<sub>e</sub> − p<sub>0</sub>)</p>

- **V<sub>e</sub>:** Ausdehnungsvolumen = Anlageninhalt × Ausdehnung in %
- **V<sub>V</sub>:** Wasservorlage, 0.5 % des Anlageninhalts, mindestens 3 l
- **p<sub>0</sub>:** Vordruck = statische Höhe / 10 + 0.3 bar
- **p<sub>e</sub>:** Enddruck = Ansprechdruck Sicherheitsventil − 0.5 bar

Rechnen lässt sich das im [Rechner Ausdehnungsgefäss](/rechner/ausdehnungsgefaess). Das MAG wird so deutlich grösser als die reine Ausdehnung, oft 8 bis 15 % des Anlageninhalts.

Zu kleines MAG → Sicherheitsventil öffnet → Wasserverlust.

Das MAG gehört in den **Rücklauf, auf die Saugseite der Pumpe**: Dort ist das Wasser am kühlsten, und die Pumpe bekommt ihren Mindestzulaufdruck gegen Kavitation. Kann die Temperatur am Gefäss trotzdem über die zulässige Membrantemperatur steigen (Herstellerangabe, meist 70 °C), kommt ein ungedämmtes **Vorschalt- oder Zwischengefäss** davor, in dem das Wasser abkühlt.

### Sicherheitsventil

- Öffnet bei Überdruck (schützt System vor Bersten)
- Ansprechdruck: typisch 3 bar (Heizanlage)
- **Abblaseleitung** sichtbar in einen Ablauf oder Auffangbehälter führen (heisses Wasser, Dampf)
- Prüfpflicht: jährlich manuell betätigen

### Temperatur- und Wassermangelsicherung

| Einrichtung                            | Wirkung                                                                                 | Wiedereinschalten               |
| -------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------- |
| **STW** Sicherheitstemperaturwächter   | schaltet den Erzeuger bei Übertemperatur ab                                             | selbsttätig, wenn wieder kühler |
| **STB** Sicherheitstemperaturbegrenzer | schaltet ab und **verriegelt**, Störung wird angezeigt                                  | nur von Hand vor Ort            |
| **Wassermangelsicherung**              | schaltet die Feuerung bei zu tiefem Wasserstand ab, verriegelt                          | nur von Hand vor Ort            |
| **Thermische Ablaufsicherung**         | Holzkessel: öffnet bei Übertemperatur Kaltwasser durch einen Sicherheitswärmeübertrager | selbsttätig (Kapillarfühler)    |

Die Wassermangelsicherung ist vor allem bei **Dachzentralen** wichtig, wo der Erzeuger am höchsten Punkt der Anlage sitzt. Die thermische Ablaufsicherung braucht keinen Strom, weil ein Holzfeuer sich nicht einfach abschalten lässt.

**Für die GA:** STB und Wassermangelsicherung wirken **fest verdrahtet** auf den Erzeuger, nie über die DDC. Die GA bekommt nur die Störmeldung als Digitaleingang. Entriegeln ist Absicht: Jemand soll vor Ort nachsehen, warum es ausgelöst hat.

### Füllautomat / Druckhaltestation

Hält den Systemdruck in definierten Grenzen:

- Unterschreitung: automatisches Nachfüllen (Wasseranschluss)
- Überschreitung: Sicherheitsventil öffnet

**GA-Überwachung:** Systemdruck AI → Alarm wenn < 1.0 bar oder > 3.0 bar.

---

## Verteiler und Heizkreise

### Verteiler/Sammler

<figure class="schema"><svg class="hyd" viewBox="0 0 430 215" role="img" aria-label="Verteiler und Sammler mit drei Heizkreisen, jeder mit eigener Pumpe, die Fussbodenheizung zusätzlich mit Mischventil" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="120" width="44" height="70" rx="3" class="bauteil"/><path d="M14 158.5H58" class="bauteil"/><path class="vl" d="M58 150L400 150" stroke-width="3"/><path class="rl" d="M400 180L58 180" stroke-width="3"/><circle cx="85" cy="150" r="9" class="bauteil bg"/><path d="M81 144L92 150L81 156Z" class="bauteil"/><circle class="vl fill" cx="126" cy="150" r="3"/><circle class="rl fill" cx="154" cy="180" r="3"/><path class="vl" d="M126 150L126 50" stroke-width="3"/><path class="rl" d="M154 32L154 180" stroke-width="3"/><circle cx="126" cy="82" r="9" class="bauteil bg"/><path d="M120 86L126 75L132 86Z" class="bauteil"/><rect x="102" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="vl" d="M126 50L126 40" stroke-width="3"/><circle class="vl fill" cx="221" cy="150" r="3"/><circle class="rl fill" cx="249" cy="180" r="3"/><path class="vl" d="M221 150L221 118" stroke-width="3"/><path class="mix" d="M221 118L221 50" stroke-width="3"/><path class="rl" d="M249 32L249 180" stroke-width="3"/><path class="rl" d="M249 118L230 118" stroke-width="3"/><path d="M215.5 109L226.5 109L221 118Z M215.5 127L226.5 127L221 118Z M230 112.5L230 123.5L221 118Z" class="bauteil bg"/><path d="M214 118H204" class="bauteil"/><rect x="190" y="112" width="14" height="12" class="bauteil bg"/><circle class="rl fill" cx="249" cy="118" r="3"/><circle cx="221" cy="82" r="9" class="bauteil bg"/><path d="M215 86L221 75L227 86Z" class="bauteil"/><rect x="197" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="mix" d="M221 50L221 40" stroke-width="3"/><circle class="vl fill" cx="316" cy="150" r="3"/><circle class="rl fill" cx="344" cy="180" r="3"/><path class="vl" d="M316 150L316 50" stroke-width="3"/><path class="rl" d="M344 32L344 180" stroke-width="3"/><circle cx="316" cy="82" r="9" class="bauteil bg"/><path d="M310 86L316 75L322 86Z" class="bauteil"/><rect x="292" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="vl" d="M316 50L316 40" stroke-width="3"/><path class="vl fill" d="M105 146L115 150L105 154Z" stroke-width="1"/><path class="rl fill" d="M115 176L105 180L115 184Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="204" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="395" y="144" text-anchor="end" font-size="10.5">Verteiler</text><text x="395" y="195" text-anchor="end" font-size="10.5">Sammler</text><text x="140" y="32.5" text-anchor="middle" font-size="10.5">Heizkörper</text><text x="197" y="121.5" text-anchor="middle" font-size="9.5">M</text><text x="235" y="32.5" text-anchor="middle" font-size="10.5">Fussboden</text><text x="330" y="32.5" text-anchor="middle" font-size="10.5">Warmwasser</text></g></svg><figcaption>Jeder Heizkreis mit eigener Pumpe, die Fussbodenheizung zusätzlich mit Mischventil.</figcaption></figure>

Jeder Heizkreis hat eine eigene Pumpe, dazu je nach Vorlauftemperatur ein Mischventil. Welche Schaltung wann passt, steht in [Hydraulische Grundschaltungen](/wissen/ventil-schaltungen).

### Mischventil pro Heizkreis

3-Wege-Ventil mischt Vorlauf + Rücklauf:

- Warmwasser-Heizkreis (75/65 °C): Ventil nahe Vorlauf-Position
- Fussbodenheizungs-Kreis (35/30 °C): Ventil deutlich gedrosselt (viel Rücklauf beigemischt)

---

## Betriebsparameter

### Systemdruck

| Anlagenhöhe | Mindestdruck | Maximaldruck    |
| ----------- | ------------ | --------------- |
| 0–10 m      | 1.0–1.5 bar  | 3.0 bar         |
| 10–20 m     | 1.5–2.0 bar  | 4.0 bar         |
| > 20 m      | 2.0+ bar     | abhängig Anlage |

**GA:** Systemdruck kontinuierlich überwachen. Druckabfall → Leck oder Entlüftung nötig.

### Temperaturspreizung

| System              | Vorlauf | Rücklauf | Spreizung |
| ------------------- | ------- | -------- | --------- |
| Radiatoren (alt)    | 90 °C   | 70 °C    | 20 K      |
| Radiatoren (modern) | 70 °C   | 55 °C    | 15 K      |
| Niedertemperatur    | 55 °C   | 40 °C    | 15 K      |
| FBH                 | 40 °C   | 30 °C    | 10 K      |
| FBH (Wärmepumpe)    | 35 °C   | 28 °C    | 7 K       |

Grössere Spreizung = mehr Wärme pro Liter Wasser = kleinere Pumpe nötig.

---

## GA-Datenpunkte Heizung Grundlagen

| Datenpunkt                | Typ | Einheit | Beschreibung              |
| ------------------------- | --- | ------- | ------------------------- |
| Erzeuger VL-Temp          | AI  | °C      | Heizkessel/WP Vorlauf     |
| Erzeuger RL-Temp          | AI  | °C      | Heizkessel/WP Rücklauf    |
| Systemdruck               | AI  | bar     | Drucküberwachung          |
| Aussentemperatur          | AI  | °C      | Für Heizkurve             |
| Erzeuger EIN/AUS          | DO  | —       | Freigabe Kessel/WP        |
| Erzeuger Störung          | DI  | —       | Sammelmeldung             |
| Erzeuger Leistung         | AI  | kW      | Aktuelle Wärmeleistung    |
| Primär-Pumpe              | DO  | —       | EIN/AUS                   |
| Pumpe Laufmeldung         | DI  | —       | Betriebsrückmeldung       |
| Sicherheitsventil Öffnung | DI  | —       | Alarmsignal (Druckventil) |

## Normen

- **EN 12828** — Heizungsanlagen in Gebäuden
- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **SIA 384/1** — Heizungsanlagen in Gebäuden (Schweizer Norm)
- **EN 14336** — Installation und Abnahme Heizungsanlagen

<!-- EN -->

The hot-water heating system is the most common heating system in buildings. Understanding how heat generation, distribution, and emission work together is the foundation for any BA work in the heating domain.

## System Overview

| Part             | What                               | Examples                                       |
| ---------------- | ---------------------------------- | ---------------------------------------------- |
| **Generator**    | Produces the heat                  | Boiler, heat pump, district heating substation |
| **Distribution** | Brings it there and the water back | Pumps, headers, pipework, mixing valves        |
| **Consumers**    | Releases it into the room          | Radiators, underfloor heating, air heaters     |
| **Safety**       | Protects the system                | Safety valve, expansion vessel                 |

---

## Heat Generators

### Boiler (Gas, Oil)

| Boiler type            | Seasonal efficiency (on Hi) | Boiler temperature          | Note                                                           |
| ---------------------- | --------------------------- | --------------------------- | -------------------------------------------------------------- |
| Conventional (old)     | 75–85 %                     | constant 70–90 °C           | Must not condense, minimum return required                     |
| Low-temperature boiler | 88–92 %                     | sliding, from about 40 °C   | Built for low temperatures, but does not condense deliberately |
| Condensing boiler      | 97–108 %                    | sliding, as low as possible | Uses condensation, needs a cold return                         |

**Condensing boiler:** Latent heat from condensation is utilised → efficiency > 100 % (relative to net calorific value). Condensate drainage required.

### Modulating Boiler Control

Modern condensing boilers adjust output continuously:

- Modulation range: 20–100 % of rated output
- Controlled variable: supply temperature (from heating curve)
- Benefits: less cycling, better seasonal efficiency

---

## Safety Components

### Expansion Vessel (EV)

Water expands when heated, by almost 3 % from 10 to 80 °C. The EV absorbs this expansion: on one side of the membrane is water, on the other a gas cushion. When the water warms up, more water is pushed into the EV and the gas cushion is compressed.

**Sizing:** the nominal volume is the expansion plus a water reserve, multiplied by the pressure factor:

<p class="formel">V<sub>N</sub> = (V<sub>e</sub> + V<sub>V</sub>) · (p<sub>e</sub> + 1) / (p<sub>e</sub> − p<sub>0</sub>)</p>

- **V<sub>e</sub>:** expansion volume = system content × expansion in %
- **V<sub>V</sub>:** water reserve, 0.5 % of system content, at least 3 l
- **p<sub>0</sub>:** pre-charge = static height / 10 + 0.3 bar
- **p<sub>e</sub>:** final pressure = safety valve set pressure − 0.5 bar

Calculate it in the [expansion vessel calculator](/rechner/ausdehnungsgefaess). The EV ends up considerably larger than the pure expansion, often 8 to 15 % of the system content.

Undersized EV → safety valve opens → water loss.

The EV belongs in the **return, on the suction side of the pump**: the water is coolest there, and the pump gets its minimum inlet pressure against cavitation. If the temperature at the vessel can still exceed the permissible membrane temperature (manufacturer's data, usually 70 °C), an uninsulated **intermediate vessel** is fitted upstream, in which the water cools down.

### Safety Valve

- Opens on overpressure (protects system from bursting)
- Set pressure: typically 3 bar (heating system)
- Route the **discharge pipe** visibly into a drain or collecting vessel (hot water, steam)
- Test requirement: actuate manually once a year

### Temperature and Low-Water Protection

| Device                               | Action                                                                           | Restart                      |
| ------------------------------------ | -------------------------------------------------------------------------------- | ---------------------------- |
| **Safety temperature monitor** (STW) | switches the generator off on overtemperature                                    | automatic once cooler        |
| **Safety temperature limiter** (STB) | switches off and **locks out**, fault is indicated                               | manual reset on site only    |
| **Low-water cut-off**                | switches the burner off at too low a water level, locks out                      | manual reset on site only    |
| **Thermal discharge safety device**  | wood boiler: on overtemperature opens cold water through a safety heat exchanger | automatic (capillary sensor) |

The low-water cut-off matters mostly for **rooftop plant rooms**, where the generator sits at the highest point of the system. The thermal discharge safety device needs no power, because a wood fire cannot simply be switched off.

**For BA:** the STB and the low-water cut-off act **hard-wired** on the generator, never via the DDC. BA only receives the fault signal as a digital input. The manual reset is deliberate: someone should check on site why it tripped.

### Automatic Filling Unit / Pressurisation Station

Maintains system pressure within defined limits:

- Low pressure: automatic top-up (mains water connection)
- High pressure: safety valve opens

**BA monitoring:** System pressure AI → alarm if < 1.0 bar or > 3.0 bar.

---

## Distribution and Heating Circuits

### Manifold / Collector

<figure class="schema"><svg class="hyd" viewBox="0 0 430 215" role="img" aria-label="Flow and return headers with three circuits, each with its own pump, underfloor heating additionally with a mixing valve" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="120" width="44" height="70" rx="3" class="bauteil"/><path d="M14 158.5H58" class="bauteil"/><path class="vl" d="M58 150L400 150" stroke-width="3"/><path class="rl" d="M400 180L58 180" stroke-width="3"/><circle cx="85" cy="150" r="9" class="bauteil bg"/><path d="M81 144L92 150L81 156Z" class="bauteil"/><circle class="vl fill" cx="126" cy="150" r="3"/><circle class="rl fill" cx="154" cy="180" r="3"/><path class="vl" d="M126 150L126 50" stroke-width="3"/><path class="rl" d="M154 32L154 180" stroke-width="3"/><circle cx="126" cy="82" r="9" class="bauteil bg"/><path d="M120 86L126 75L132 86Z" class="bauteil"/><rect x="102" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="vl" d="M126 50L126 40" stroke-width="3"/><circle class="vl fill" cx="221" cy="150" r="3"/><circle class="rl fill" cx="249" cy="180" r="3"/><path class="vl" d="M221 150L221 118" stroke-width="3"/><path class="mix" d="M221 118L221 50" stroke-width="3"/><path class="rl" d="M249 32L249 180" stroke-width="3"/><path class="rl" d="M249 118L230 118" stroke-width="3"/><path d="M215.5 109L226.5 109L221 118Z M215.5 127L226.5 127L221 118Z M230 112.5L230 123.5L221 118Z" class="bauteil bg"/><path d="M214 118H204" class="bauteil"/><rect x="190" y="112" width="14" height="12" class="bauteil bg"/><circle class="rl fill" cx="249" cy="118" r="3"/><circle cx="221" cy="82" r="9" class="bauteil bg"/><path d="M215 86L221 75L227 86Z" class="bauteil"/><rect x="197" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="mix" d="M221 50L221 40" stroke-width="3"/><circle class="vl fill" cx="316" cy="150" r="3"/><circle class="rl fill" cx="344" cy="180" r="3"/><path class="vl" d="M316 150L316 50" stroke-width="3"/><path class="rl" d="M344 32L344 180" stroke-width="3"/><circle cx="316" cy="82" r="9" class="bauteil bg"/><path d="M310 86L316 75L322 86Z" class="bauteil"/><rect x="292" y="18" width="76" height="22" rx="3" class="bauteil bg"/><path class="vl" d="M316 50L316 40" stroke-width="3"/><path class="vl fill" d="M105 146L115 150L105 154Z" stroke-width="1"/><path class="rl fill" d="M115 176L105 180L115 184Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="204" text-anchor="middle" font-size="12.5">Generator</text><text x="395" y="144" text-anchor="end" font-size="10.5">Flow header</text><text x="395" y="195" text-anchor="end" font-size="10.5">Return header</text><text x="140" y="32.5" text-anchor="middle" font-size="10.5">Radiators</text><text x="197" y="121.5" text-anchor="middle" font-size="9.5">M</text><text x="235" y="32.5" text-anchor="middle" font-size="10.5">Underfloor</text><text x="330" y="32.5" text-anchor="middle" font-size="10.5">Hot water</text></g></svg><figcaption>Each circuit with its own pump, the underfloor heating additionally with a mixing valve.</figcaption></figure>

Each heating circuit has its own pump, plus a mixing valve depending on the flow temperature. Which circuit fits when is described in [Basic Hydraulic Circuits](/wissen/ventil-schaltungen).

### Mixing Valve per Heating Circuit

3-way valve mixes supply + return:

- Hot-water circuit (75/65 °C): valve near supply position
- Underfloor heating circuit (35/30 °C): valve clearly throttled (much return blended in)

---

## Operating Parameters

### System Pressure

| System height | Minimum pressure | Maximum pressure |
| ------------- | ---------------- | ---------------- |
| 0–10 m        | 1.0–1.5 bar      | 3.0 bar          |
| 10–20 m       | 1.5–2.0 bar      | 4.0 bar          |
| > 20 m        | 2.0+ bar         | System-dependent |

**BA:** Monitor system pressure continuously. Pressure drop → leak or venting required.

### Temperature Spread

| System             | Supply | Return | Spread |
| ------------------ | ------ | ------ | ------ |
| Radiators (old)    | 90 °C  | 70 °C  | 20 K   |
| Radiators (modern) | 70 °C  | 55 °C  | 15 K   |
| Low-temperature    | 55 °C  | 40 °C  | 15 K   |
| UFH                | 40 °C  | 30 °C  | 10 K   |
| UFH (heat pump)    | 35 °C  | 28 °C  | 7 K    |

Larger spread = more heat per litre of water = smaller pump required.

---

## BA Data Points — Heating Fundamentals

| Data point             | Type | Unit | Description             |
| ---------------------- | ---- | ---- | ----------------------- |
| Generator supply temp. | AI   | °C   | Boiler/HP supply        |
| Generator return temp. | AI   | °C   | Boiler/HP return        |
| System pressure        | AI   | bar  | Pressure monitoring     |
| Outdoor temperature    | AI   | °C   | For heating curve       |
| Generator ON/OFF       | DO   | —    | Boiler/HP enable        |
| Generator fault        | DI   | —    | Collective fault        |
| Generator output       | AI   | kW   | Current heat output     |
| Primary pump           | DO   | —    | ON/OFF                  |
| Pump run feedback      | DI   | —    | Run confirmation        |
| Safety valve open      | DI   | —    | Alarm (pressure relief) |

## Standards

- **EN 12828** — Heating systems in buildings
- **VDI 2035** — Prevention of damage in hot-water heating systems
- **SIA 384/1** — Heating systems in buildings (Swiss standard)
- **EN 14336** — Installation and commissioning of heating systems
