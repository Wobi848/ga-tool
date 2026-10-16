---
title: Pufferspeicher — Funktion, Einbindung und Schichtung
title_en: Buffer Storage — Function, Integration and Stratification
slug: pufferspeicher
category: heizung
subcategory: speicher
tags:
  [
    pufferspeicher,
    hydraulik,
    schichtung,
    warmwasser,
    solar,
    waermepumpe,
    heizkreis,
    temperatursensor,
    ddc,
    speicherladung,
    stratifikation,
    bypass,
    entkopplung,
    mindestvolumenstrom
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    waermepumpe,
    hydraulische-schaltungen,
    hydraulischer-abgleich,
    pid-regler,
    legionellen,
    trinkwasser-erwaermung,
    bhkw,
    holzheizung,
    solarthermie
  ]
norm: [EN 12977, VDI 2035]
updated: 2026-05-14
lang: de
---

# Pufferspeicher — Funktion, Einbindung und Schichtung

Ein **Pufferspeicher** entkoppelt Wärmeerzeugung und Wärmeverbrauch. Er ist kein einfacher "Wassertank" — Schichtung, Einbindung und Regelung bestimmen ob er seinen Job erledigt oder Probleme macht.

## Warum ein Pufferspeicher?

### Problem 1: Mindestvolumenstrom (Wärmepumpe)

Eine Wärmepumpe braucht einen **Mindestvolumenstrom** durch den Verdampfer/Kondensator. Wenn alle Heizkreis-Thermostatventile schliessen → Durchfluss sinkt → WP schaltet ab (Schutzabschaltung).

Lösung: Puffer zwischen WP und Heizkreis → WP-Seite hat immer genug Durchfluss.

### Problem 2: Taktbetrieb (Wärmepumpe, Kessel)

Ohne Puffer startet Wärmepumpe sehr häufig (kurze Taktzeiten) → Verschleiss, schlechter COP.
Mit Puffer: WP läuft länger, seltener → bessere Effizienz.

### Problem 3: Solare Überschüsse

Solaranlage produziert mehr als gerade benötigt → Puffer speichert → Verbrauch später.

### Problem 4: Spitzenlast-Entkopplung

Wärmeerzeuger ist schwächer als Verbraucher-Spitze → Puffer gleicht aus.

---

## Schichtung (Stratifikation)

Der Pufferspeicher funktioniert wie ein natürlich geschichteter Körper:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 230" role="img" aria-label="Pufferspeicher zwischen Wärmepumpe und Heizkreisen: Vorläufe oben, Rückläufe unten, Fühler oben, Mitte und unten" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="85" width="70" height="60" rx="3" class="bauteil bg"/><rect x="346" y="85" width="70" height="60" rx="3" class="bauteil bg"/><path class="vl" d="M49 85L49 40L175 40" stroke-width="3"/><path class="rl" d="M175 190L49 190L49 145" stroke-width="3"/><path class="vl" d="M255 40L381 40L381 85" stroke-width="3"/><path class="rl" d="M381 145L381 190L255 190" stroke-width="3"/><circle cx="110" cy="40" r="9" class="bauteil bg"/><path d="M106 34L117 40L106 46Z" class="bauteil"/><circle cx="330" cy="40" r="9" class="bauteil bg"/><path d="M326 34L337 40L326 46Z" class="bauteil"/><path class="vl fill" d="M140 36L150 40L140 44Z" stroke-width="1"/><path class="rl fill" d="M125 186L115 190L125 194Z" stroke-width="1"/><path class="vl fill" d="M295 36L305 40L295 44Z" stroke-width="1"/><path class="rl fill" d="M305 186L295 190L305 194Z" stroke-width="1"/><rect x="175" y="20" width="80" height="190" rx="3" class="bauteil bg"/><path d="M255 55H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="55" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M255 115H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="115" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M255 175H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="175" r="7" class="bauteil bg" stroke-width="1.2"/><g fill="currentColor" stroke="none"><text x="49" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="49" y="113" text-anchor="middle" font-size="11">Wärme-</text><text x="49" y="127" text-anchor="middle" font-size="11">pumpe</text><text x="381" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="381" y="113" text-anchor="middle" font-size="11">Heiz-</text><text x="381" y="127" text-anchor="middle" font-size="11">kreise</text><text x="215" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="215" y="70" text-anchor="middle" font-size="11" font-weight="600">warm</text><text x="215" y="118" text-anchor="middle" font-size="10">Mischzone</text><text x="215" y="165" text-anchor="middle" font-size="11" font-weight="600">kalt</text><text x="271" y="58.5" text-anchor="middle" font-size="10">T</text><text x="282" y="59" text-anchor="start" font-size="10">oben</text><text x="271" y="118.5" text-anchor="middle" font-size="10">T</text><text x="282" y="119" text-anchor="start" font-size="10">Mitte</text><text x="271" y="178.5" text-anchor="middle" font-size="10">T</text><text x="282" y="179" text-anchor="start" font-size="10">unten</text></g></svg><figcaption>Vorläufe oben, Rückläufe unten. Oben das warme Wasser, unten das kalte, dazwischen die Mischzone.</figcaption></figure>

**Warmes Wasser steigt auf, kaltes sinkt** — natürliche Schichtung. Gut geschichteter Puffer kann Erzeuger und Verbraucher bei unterschiedlichen Temperaturniveaus bedienen.

### Einbindung (Rohranschlüsse)

- **Vorlauf vom Erzeuger** → oben hinein
- **Vorlauf zu den Verbrauchern** ← oben bzw. auf der Höhe, die zur benötigten Temperatur passt
- **Rücklauf von den Verbrauchern** → unten hinein
- **Rücklauf zum Erzeuger** ← unten heraus

**Schichtungszerstörung vermeiden:**

- Rohranschlüsse **oben** und **unten** (nicht seitlich mittig)
- Einströmgeschwindigkeit gering halten (< 0.2 m/s im Speicher)
- Einströmung gegen Prallblech oder über Taucheinstutzen

---

## Puffergrösse

**Faustformel Wärmepumpe:**

**V_Puffer ≈ 20–50 Liter pro kW Wärmepumpenleistung**

Beispiel: 10 kW WP → 200–500 Liter Puffer

**Faustformel Solar:**

**V_Puffer ≈ 50–75 Liter pro m² Kollektorfläche**

**Zu klein:** Häufiges Takten, keine Entkopplung
**Zu gross:** Lange Aufheizzeit, Wärmeverluste, Legionellengefahr (wenn WW-Anteil)

---

## Temperatursensoren und Regelung

Typische Sensor-Positionen:

Typisch sind drei Fühler: **oben** für die Ladung und die Versorgung der Heizkreise, **Mitte** für den Ladezustand, **unten** für das Ende der Ladung und die Rücklauftemperatur (siehe Schema oben).

### Ladelogik Wärmepumpe

- Fällt **T oben** unter den Speichersollwert (z.B. 45 °C), gibt die GA die Wärmepumpe frei.
- Die Wärmepumpe lädt, bis **T unten** oder **T Mitte** den Sollwert plus Hysterese erreicht. So wird der Speicher ganz geladen und die Wärmepumpe läuft lange am Stück.

**Wichtig:** Speicher-Solltemperatur muss zur WP-Vorlauftemperatur passen (Effizienz!). Je höher der Sollwert, desto schlechter der COP.

### Heizkreis-Entnahme

- Ist **T oben** deutlich über dem Vorlaufsollwert des Heizkreises, mischt das Mischventil herunter.
- Liegt **T oben** knapp am Sollwert, öffnet das Mischventil ganz. Unter dem Sollwert muss nachgeladen werden.

---

## Kombispeicher (Puffer + Warmwasser)

Kombispeicher enthält beides — **Heizungspuffer** und **Trinkwarmwasser**:

- **Aussen:** Heizungswasser, geschlossener Kreis
- **Innen:** Edelstahlwellrohr oder Tauchspeicher, durch den das Trinkwasser fliesst und dabei erwärmt wird

**Vorteile:** Kompakt, ein Gerät
**Nachteile:** Warmwasser begrenzt durch Wärmetauscher-Fläche; Legionellen-Aspekte beachten!

---

## Pufferspeicher bei Wärmepumpe: typische GA-Regelung

| Datenpunkt                  | Typ | Bemerkung         |
| --------------------------- | --- | ----------------- |
| T Puffer oben, Mitte, unten | AI  | Pt1000            |
| Aussentemperatur            | AI  | für die Heizkurve |
| WP Betrieb, Störung         | DI  |                   |
| WP Freigabe                 | DO  |                   |
| Mischventil Heizkreis       | AO  | 0–10 V            |

1. Heizkurve liefert den Vorlaufsollwert des Heizkreises.
2. Puffersollwert = Vorlaufsollwert plus wenige Kelvin.
3. **T oben** unter Puffersollwert minus Schaltdifferenz: Wärmepumpe freigeben.
4. **T unten** über Puffersollwert: Wärmepumpe sperren, Mindestlaufzeit beachten.
5. Heizkreispumpe und Mischventil regeln den Vorlauf.

## Normen

- **EN 12977-3** — Thermische Solaranlagen, Leistungsprüfung von Speichern
- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **SIA 384/1** — Heizungsanlagen in Gebäuden (CH)

<!-- EN -->

## Buffer Storage — Function, Integration and Stratification

A **buffer storage tank** decouples heat generation from heat consumption. It is not a simple "water tank" — stratification, integration and control determine whether it does its job or causes problems.

## Why a Buffer Storage Tank?

### Problem 1: Minimum Flow Rate (Heat Pump)

A heat pump requires a **minimum flow rate** through the evaporator/condenser. When all heating circuit thermostatic valves close → flow drops → HP shuts down (safety cutout).

Solution: buffer between HP and heating circuits → HP side always has enough flow.

### Problem 2: Short Cycling (Heat Pump, Boiler)

Without a buffer the heat pump starts very frequently (short cycle times) → wear, poor COP.
With buffer: HP runs longer, less frequently → better efficiency.

### Problem 3: Solar Surplus

Solar system produces more than currently needed → buffer stores it → consumed later.

### Problem 4: Peak Load Decoupling

Heat generator is weaker than consumer peak → buffer compensates.

---

## Stratification

The buffer tank works as a naturally stratified body:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 230" role="img" aria-label="Buffer tank between heat pump and heating circuits: flows at the top, returns at the bottom, sensors at top, middle and bottom" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="85" width="70" height="60" rx="3" class="bauteil bg"/><rect x="346" y="85" width="70" height="60" rx="3" class="bauteil bg"/><path class="vl" d="M49 85L49 40L175 40" stroke-width="3"/><path class="rl" d="M175 190L49 190L49 145" stroke-width="3"/><path class="vl" d="M255 40L381 40L381 85" stroke-width="3"/><path class="rl" d="M381 145L381 190L255 190" stroke-width="3"/><circle cx="110" cy="40" r="9" class="bauteil bg"/><path d="M106 34L117 40L106 46Z" class="bauteil"/><circle cx="330" cy="40" r="9" class="bauteil bg"/><path d="M326 34L337 40L326 46Z" class="bauteil"/><path class="vl fill" d="M140 36L150 40L140 44Z" stroke-width="1"/><path class="rl fill" d="M125 186L115 190L125 194Z" stroke-width="1"/><path class="vl fill" d="M295 36L305 40L295 44Z" stroke-width="1"/><path class="rl fill" d="M305 186L295 190L305 194Z" stroke-width="1"/><rect x="175" y="20" width="80" height="190" rx="3" class="bauteil bg"/><path d="M255 55H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="55" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M255 115H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="115" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M255 175H264" class="bauteil" stroke-width="1"/><circle cx="271" cy="175" r="7" class="bauteil bg" stroke-width="1.2"/><g fill="currentColor" stroke="none"><text x="49" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="49" y="113" text-anchor="middle" font-size="11">Heat</text><text x="49" y="127" text-anchor="middle" font-size="11">pump</text><text x="381" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="381" y="113" text-anchor="middle" font-size="11">Heating</text><text x="381" y="127" text-anchor="middle" font-size="11">circuits</text><text x="215" y="118.33333333333333" text-anchor="middle" font-size="10"></text><text x="215" y="70" text-anchor="middle" font-size="11" font-weight="600">warm</text><text x="215" y="118" text-anchor="middle" font-size="10">mixing zone</text><text x="215" y="165" text-anchor="middle" font-size="11" font-weight="600">cold</text><text x="271" y="58.5" text-anchor="middle" font-size="10">T</text><text x="282" y="59" text-anchor="start" font-size="10">top</text><text x="271" y="118.5" text-anchor="middle" font-size="10">T</text><text x="282" y="119" text-anchor="start" font-size="10">middle</text><text x="271" y="178.5" text-anchor="middle" font-size="10">T</text><text x="282" y="179" text-anchor="start" font-size="10">bottom</text></g></svg><figcaption>Flows at the top, returns at the bottom. Warm water at the top, cold at the bottom, the mixing zone in between.</figcaption></figure>

**Warm water rises, cold water sinks** — natural stratification. A well-stratified buffer can serve generator and consumers at different temperature levels.

### Pipe Connections

- **Flow from the generator** → in at the top
- **Flow to the consumers** ← at the top or at the height matching the required temperature
- **Return from the consumers** → in at the bottom
- **Return to the generator** ← out at the bottom

**Avoid destroying stratification:**

- Pipe connections at **top** and **bottom** (not centrally on the side)
- Keep inflow velocity low (< 0.2 m/s inside tank)
- Inflow against baffle plate or via dip tube

---

## Buffer Tank Sizing

**Rule of thumb for heat pumps:**

**V_buffer ≈ 20–50 litres per kW of heat pump output**

Example: 10 kW HP → 200–500 litre buffer

**Rule of thumb for solar:**

**V_buffer ≈ 50–75 litres per m² of collector area**

**Too small:** frequent cycling, no decoupling
**Too large:** long heat-up time, heat losses, Legionella risk (if DHW component)

---

## Temperature Sensors and Control

Typical sensor positions:

Three sensors are typical: **top** for charging and supplying the heating circuits, **middle** for the state of charge, **bottom** for ending the charge and the return temperature (see diagram above).

### Heat Pump Charging Logic

- If **T top** falls below the storage setpoint (e.g. 45 °C), the BA enables the heat pump.
- The heat pump charges until **T bottom** or **T middle** reaches the setpoint plus hysteresis. The store is fully charged and the heat pump runs long cycles.

**Important:** Buffer setpoint temperature must match HP flow temperature (efficiency!). The higher the setpoint, the worse the COP.

### Heating Circuit Take-off

- If **T top** is well above the heating circuit flow setpoint, the mixing valve mixes down.
- If **T top** is close to the setpoint, the mixing valve opens fully. Below the setpoint the store must be recharged.

---

## Combi-Storage (Buffer + DHW)

Combi-storage contains both — **heating buffer** and **domestic hot water**:

- **Outside:** heating water, closed circuit
- **Inside:** stainless steel corrugated tube or inner tank through which domestic water flows and is heated

**Advantages:** Compact, single unit
**Disadvantages:** DHW limited by heat exchanger area; Legionella aspects must be observed!

---

## Buffer Tank with Heat Pump: Typical BA Control

| Data point                   | Type | Remark                |
| ---------------------------- | ---- | --------------------- |
| T buffer top, middle, bottom | AI   | Pt1000                |
| Outdoor temperature          | AI   | for the heating curve |
| HP run, fault                | DI   |                       |
| HP enable                    | DO   |                       |
| Heating circuit mixing valve | AO   | 0–10 V                |

1. The heating curve gives the circuit's flow setpoint.
2. Buffer setpoint = flow setpoint plus a few kelvin.
3. **T top** below buffer setpoint minus differential: enable heat pump.
4. **T bottom** above buffer setpoint: disable heat pump, observe minimum run time.
5. Circuit pump and mixing valve control the flow.

## Standards

- **EN 12977-3** — Thermal solar systems, performance testing of stores
- **VDI 2035** — Prevention of damage in hot water heating systems
- **SIA 384/1** — Heating systems in buildings (CH)
