---
title: Motorventile — 2-Wege, 3-Wege, Kv-Wert
title_en: Motorised Valves — 2-Way, 3-Way, Kv Value
slug: motorventile
category: hydraulik
subcategory: armaturen
tags:
  [
    motorventil,
    2-wege-ventil,
    3-wege-ventil,
    kv-wert,
    stellantrieb,
    regelventil,
    mischventil,
    umlenkventil,
    kvs,
    druckverlust,
    autorität,
    gleichprozent,
    linear,
    fail-safe
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
rechner: [hydraulik-simulator]
  [hydraulischer-abgleich, hydraulische-schaltungen, pid-regler, signaltypen, ventilautoritaet]
norm: [EN 60534, IEC 60534, VDI/VDE 2173]
updated: 2026-05-14
lang: de
---

# Motorventile — 2-Wege, 3-Wege, Kv-Wert

Motorventile sind die Aktoren der Hydraulik — sie setzen den Sollwert des Reglers in eine Durchflussmenge um. Falsch dimensionierte Ventile sind ein häufiger Grund für schlechte Regelqualität, Geräusche und zu hohen Energieverbrauch.

## Ventiltypen

### 2-Wege-Ventil (Absperr-/Regelventil)

Ein Durchgangsventil hat zwei Anschlüsse; der Stellantrieb bewegt den Kegel und verändert so den freien Querschnitt.

- **Funktion:** Öffnet oder schliesst den Durchfluss
- **Einsatz:** Wärmetauscher-Einbindung, Heizkörper, Fancoil, Fussbodenheizkreis
- **Effekt auf Hydraulik:** Ventil schliesst → Druck im Strang steigt → andere Ventile arbeiten mit höherem Differenzdruck

**2-Wege-Ventil im Heizkörperkreis:**

Schemas der Schaltungen mit Durchgangs- und Dreiwegventil stehen in [Hydraulische Grundschaltungen](/wissen/ventil-schaltungen).

### 3-Wege-Ventil: Mischventil

Ein Mischventil hat zwei Eingänge (A, B) und einen gemeinsamen Ausgang (AB).

- **Funktion:** Mischt Vorlauf + Rücklauf im einstellbaren Verhältnis → variable Austrittstemperatur
- **Einsatz:** Heizkreis-Vorlauftemperatur einstellen, witterungsgeführte Regelung
- **Hydraulik:** Der Volumenstrom zum Verbraucher bleibt konstant, der durch den Erzeuger ändert sich (Beimischschaltung)

### 3-Wege-Ventil: Umlenkventil (Weiche)

Ein Umlenkventil (Verteilventil) hat einen Eingang (AB) und zwei Ausgänge (A, B). Nicht jedes Dreiwegventil ist als Verteilventil zugelassen, das Datenblatt sagt es.

- **Funktion:** Lenkt Volumenstrom zwischen zwei Pfaden um
- **Einsatz:** Umschaltung Heizen/Kühlen (reversible Anlage), Prioritätsschaltung
- **Achtung:** Nicht verwechseln mit Mischventil — gleicher Körper aber andere Konfiguration!

### Kurzübersicht

| Typ           | Verbindungen | Funktion            | Typischer Einsatz                    |
| ------------- | ------------ | ------------------- | ------------------------------------ |
| 2-Wege        | 2 (A, AB)    | Öffnen / Schliessen | Einzel-Verbraucher, Variable Anlage  |
| 3-Wege Misch  | 3 (A, B, AB) | Mischen             | Heizkreis-Vorlauftemp, WP-Einbindung |
| 3-Wege Umlenk | 3 (A, B, AB) | Umlenken            | Heizen/Kühlen Umschaltung            |

---

## Kv-Wert — Ventilkapazität

Der **Kv-Wert** beschreibt den Durchfluss bei einem definierten Druckverlust:

**Definition:** Volumenstrom in m³/h bei 1 bar Druckverlust (Wasser, 20 °C)

### Formel

<p class="formel">k<sub>v</sub> = Q · √(1 / Δp)</p>

Oder aufgelöst nach Durchfluss:

<p class="formel">Q = k<sub>v</sub> · √Δp</p>

Und nach Druckverlust:

<p class="formel">Δp = (Q / k<sub>v</sub>)<sup>2</sup></p>

**Einheiten:** Q in m³/h, Δp in bar

**Beispiel:**

- Ventil Kv = 2.5 m³/h
- Differenzdruck = 0.4 bar
- Durchfluss Q = 2.5 × √0.4 = 2.5 × 0.632 = **1.58 m³/h**

### Kvs-Wert

Der **Kvs** ist der Kv-Wert bei vollständig geöffnetem Ventil — der katalogierte Kenngrösse des Herstellers.

---

## Ventilauslegung (Kv-Berechnung)

### Schritt 1: Benötigter Durchfluss berechnen

<p class="formel">Q [m³/h] = Leistung [kW] / (1.163 · Spreizung [K])</p>

Beispiel: 10 kW, Spreizung 10 K → Q = 10 / (1.163 × 10) = **0.86 m³/h**

### Schritt 2: Verfügbarer Differenzdruck bestimmen

- Systemdifferenzdruck (Pumpe) minus Druckverluste der Rohrleitungen und anderen Armaturen
- Für gute Regelbarkeit: Ventil sollte **30–50 % des Systemdrucks** verbrauchen (Ventilautorität)

**Ventilautorität:**

<p class="formel">α = Δp<sub>V</sub> / (Δp<sub>V</sub> + Δp<sub>Netz, mengenvariabel</sub>)</p>

α > 0.5 = gut; α < 0.3 = schlechte Regelbarkeit (Ventil hat kaum Einfluss)

### Schritt 3: Kv berechnen

<p class="formel">k<sub>v</sub> = Q / √Δp</p>

Beispiel: Q = 0.86 m³/h, Δp = 0.3 bar → Kv = 0.86 / √0.3 = 0.86 / 0.548 = **1.57**

→ Nächste Normgrösse aus Katalog wählen (z.B. Kvs = 1.6 oder 2.0)

> Lieber **knapp unterdimensioniert** als zu gross: Ein zu grosses Ventil öffnet nur minimal und verliert die Regelautorität.

---

## Ventilkennlinien

Die Kennlinie bestimmt, wie sich der k<sub>v</sub>-Wert mit dem Hub verändert:

### Gleichprozent-Kennlinie (Equal Percentage)

| Hub   | k<sub>v</sub> / k<sub>vs</sub> |
| ----- | ------------------------------ |
| 10 %  | 3 %                            |
| 50 %  | 14 %                           |
| 90 %  | 68 %                           |
| 100 % | 100 %                          |

Formel: k<sub>v</sub>/k<sub>vs</sub> = SV<sup>(h − 1)</sup>, hier mit Stellverhältnis SV = 50. Jeder gleiche Hubschritt erhöht den Durchfluss um denselben Prozentsatz.

- Logarithmische Kennlinie
- **Empfehlen** für Wärmetauscher-Einbindung: kompensiert die nichtlineare Wärmeübergabe-Charakteristik
- Kleiner Hub = feinfühlige Regelung bei kleinen Lasten

### Lineare Kennlinie

| Hub   | k<sub>v</sub> / k<sub>vs</sub> |
| ----- | ------------------------------ |
| 10 %  | 10 %                           |
| 50 %  | 50 %                           |
| 100 % | 100 %                          |

- Proportional
- Für Mischventile und Anwendungen mit linearem Wärmeübergang

**Kombination:** Ein Wärmeübertrager gibt schon bei kleinem Durchfluss viel Leistung ab. Das gleichprozentige Ventil gleicht diese Krümmung aus, zusammen ergibt sich eine annähernd lineare Regelstrecke, die sich leichter einstellen lässt.

---

## Stellantriebe

### Typen

| Typ                   | Stellsignal   | Charakteristik                             |
| --------------------- | ------------- | ------------------------------------------ |
| **2-Punkt**           | 24V EIN/AUS   | Auf / Zu — für einfache Anwendungen        |
| **3-Punkt**           | Auf/Zu-Signal | Langsame Integration, kein Rückmeldesignal |
| **Stetig 0–10 V**     | 0–10 V        | Präzise Regelung, Rückmeldung 0–10 V       |
| **Stetig 4–20 mA**    | 4–20 mA       | Lange Leitungen, Kabelbrucherkennung       |
| **Bus (KNX, Modbus)** | Bus-Befehl    | Diagnose, Rückmeldung, Positionierung      |

### Stellzeit

- Kleinventile DN15–DN25: 15–60 Sekunden (Auf-Zu)
- Grosse Armaturen DN40+: 60–240 Sekunden
- Zu schnelle Antriebe → Wasserhammereffekt (Druckstoss)
- Zu langsame Antriebe → träge Regelung

### Fail-Safe Stellung

Bei Signalausfall (Kabelbruch, Stromausfall) nimmt der Antrieb eine definierte Position ein:

| Fail-Safe  | Wann sinnvoll                                               |
| ---------- | ----------------------------------------------------------- |
| **Auf**    | Frostschutz (Heizregister muss offen bleiben)               |
| **Zu**     | Dampfventil (Verbrühungsschutz), Kühldecke                  |
| **Halten** | Antriebe ohne Federrücklauf bleiben in der letzten Stellung |

> ⚠️ Fail-Safe Stellung **immer** projektieren und testen! Was passiert bei Kabelbruch? Schaden durch Frost? Übertemperatur? Das muss im Voraus geplant sein.

---

## Typische Fehler in der Praxis

| Fehler                       | Symptom                                       | Lösung                                 |
| ---------------------------- | --------------------------------------------- | -------------------------------------- |
| Ventil zu gross (Kvs falsch) | Regelventil immer fast geschlossen, Geräusche | Ventil tauschen                        |
| Ventilautorität zu klein     | Regelung instabil, schwingt                   | kleineres Ventil, Differenzdruckregler |
| Kennlinie falsch             | Überproportionale Reaktion bei kleinen Hüben  | Kennlinientyp prüfen                   |
| Fail-safe nicht konfiguriert | Ventil bleibt bei Ausfall in Zufallsstellung  | Antrieb parametrieren                  |
| Misch- statt Umlenkventil    | Kurzschluss im System                         | Rohranschluss und Typ prüfen           |
| Antrieb zu schnell           | Wasserhammergeräusche                         | Stellzeit erhöhen (Parametrierung)     |

## Normen

- **EN 60534** — Industriearmaturen, Regelventile
- **VDI/VDE 2173** — Strömungstechnische Kennwerte von Regelventilen

<!-- EN -->

# Motorised Valves — 2-Way, 3-Way, Kv Value

Motorised valves are the actuators of hydraulic systems — they convert the controller's setpoint into a flow rate. Incorrectly sized valves are a frequent cause of poor control quality, noise and excessive energy consumption.

## Valve Types

### 2-Way Valve (Shut-off / Control Valve)

A two-way valve has two connections; the actuator moves the plug and thus changes the free cross-section.

- **Function:** Opens or closes flow
- **Applications:** heat exchanger connection, radiators, fan-coils, underfloor heating circuits
- **Hydraulic effect:** valve closes → pressure in branch rises → other valves operate at higher differential pressure

**2-way valve in radiator circuit:**

Diagrams of circuits with two-way and three-way valves are in [Basic Hydraulic Circuits](/wissen/ventil-schaltungen).

### 3-Way Valve: Mixing Valve

A mixing valve has two inlets (A, B) and one common outlet (AB).

- **Function:** Mixes flow + return in an adjustable ratio → variable outlet temperature
- **Applications:** set heating circuit flow temperature, weather-compensated control
- **Hydraulics:** the flow to the consumer stays constant, the flow through the generator varies (mixing circuit)

### 3-Way Valve: Diverting Valve

A diverting valve has one inlet (AB) and two outlets (A, B). Not every three-way valve is approved as a diverting valve; the datasheet says so.

- **Function:** Diverts volume flow between two paths
- **Applications:** heating/cooling switchover (reversible system), priority circuit
- **Note:** Do not confuse with mixing valve — same body but different configuration!

### Quick Overview

| Type            | Connections  | Function     | Typical application                       |
| --------------- | ------------ | ------------ | ----------------------------------------- |
| 2-way           | 2 (A, AB)    | Open / close | Individual consumer, variable system      |
| 3-way mixing    | 3 (A, B, AB) | Mix          | Heating circuit flow temp, HP integration |
| 3-way diverting | 3 (A, B, AB) | Divert       | Heating/cooling switchover                |

---

## Kv Value — Valve Capacity

The **Kv value** describes flow at a defined pressure drop:

**Definition:** Volume flow in m³/h at 1 bar pressure drop (water, 20 °C)

### Formula

<p class="formel">k<sub>v</sub> = Q · √(1 / Δp)</p>

Rearranged for flow:

<p class="formel">Q = k<sub>v</sub> · √Δp</p>

And for pressure drop:

<p class="formel">Δp = (Q / k<sub>v</sub>)<sup>2</sup></p>

**Units:** Q in m³/h, Δp in bar

**Example:**

- Valve Kv = 2.5 m³/h
- Differential pressure = 0.4 bar
- Flow Q = 2.5 × √0.4 = 2.5 × 0.632 = **1.58 m³/h**

### Kvs Value

The **Kvs** is the Kv value at fully open valve — the manufacturer's catalogue characteristic.

---

## Valve Sizing (Kv Calculation)

### Step 1: Calculate Required Flow

<p class="formel">Q [m³/h] = power [kW] / (1.163 · temperature difference [K])</p>

Example: 10 kW, spread 10 K → Q = 10 / (1.163 × 10) = **0.86 m³/h**

### Step 2: Determine Available Differential Pressure

- System differential pressure (pump) minus pressure drops in pipes and other fittings
- For good controllability: valve should consume **30–50 % of system pressure** (valve authority)

**Valve authority:**

<p class="formel">α = Δp<sub>V</sub> / (Δp<sub>V</sub> + Δp<sub>variable-flow network</sub>)</p>

α > 0.5 = good; α < 0.3 = poor controllability (valve has little influence)

### Step 3: Calculate Kv

<p class="formel">k<sub>v</sub> = Q / √Δp</p>

Example: Q = 0.86 m³/h, Δp = 0.3 bar → Kv = 0.86 / √0.3 = 0.86 / 0.548 = **1.57**

→ Select next standard size from catalogue (e.g. Kvs = 1.6 or 2.0)

> Better **slightly undersized** than too large: an oversized valve opens only minimally and loses control authority.

---

## Valve Characteristics

The characteristic (curve) determines how Kv changes with stroke:

### Equal Percentage Characteristic

| Stroke | k<sub>v</sub> / k<sub>vs</sub> |
| ------ | ------------------------------ |
| 10 %   | 3 %                            |
| 50 %   | 14 %                           |
| 90 %   | 68 %                           |
| 100 %  | 100 %                          |

Formula: k<sub>v</sub>/k<sub>vs</sub> = SV<sup>(h − 1)</sup>, here with rangeability SV = 50. Each equal stroke step raises the flow by the same percentage.

- Logarithmic characteristic
- **Recommended** for heat exchanger connections: compensates for the non-linear heat transfer characteristic
- Small stroke = sensitive control at low loads

### Linear Characteristic

| Stroke | k<sub>v</sub> / k<sub>vs</sub> |
| ------ | ------------------------------ |
| 10 %   | 10 %                           |
| 50 %   | 50 %                           |
| 100 %  | 100 %                          |

- Proportional
- For mixing valves and applications with linear heat transfer

**Combination:** a heat exchanger releases a lot of output even at small flow. The equal-percentage valve compensates this curvature; together they give an approximately linear controlled system that is easier to tune.

---

## Actuators

### Types

| Type                   | Control signal    | Characteristic                         |
| ---------------------- | ----------------- | -------------------------------------- |
| **2-position**         | 24V ON/OFF        | Open / close — for simple applications |
| **3-position**         | Open/close signal | Slow integration, no feedback signal   |
| **Continuous 0–10 V**  | 0–10 V            | Precise control, 0–10 V feedback       |
| **Continuous 4–20 mA** | 4–20 mA           | Long cables, cable break detection     |
| **Bus (KNX, Modbus)**  | Bus command       | Diagnostics, feedback, positioning     |

### Stroke Time

- Small valves DN15–DN25: 15–60 seconds (full stroke)
- Large valves DN40+: 60–240 seconds
- Actuators too fast → water hammer (pressure surge)
- Actuators too slow → sluggish control

### Fail-Safe Position

On signal loss (cable break, power failure), the actuator moves to a defined position:

| Fail-safe  | When appropriate                                          |
| ---------- | --------------------------------------------------------- |
| **Open**   | Frost protection (heating coil must remain open)          |
| **Closed** | Steam valve (scald protection), chilled ceiling           |
| **Hold**   | Actuators without spring return stay in the last position |

> ⚠️ Fail-safe position must **always** be specified and tested! What happens on cable break? Frost damage? Overtemperature? This must be planned in advance.

---

## Typical Field Faults

| Fault                             | Symptom                                     | Solution                                        |
| --------------------------------- | ------------------------------------------- | ----------------------------------------------- |
| Valve too large (wrong Kvs)       | Control valve nearly always closed, noise   | Replace valve                                   |
| Valve authority too low           | Control unstable, oscillating               | smaller valve, differential pressure controller |
| Wrong characteristic              | Disproportionate response at small strokes  | Check characteristic type                       |
| Fail-safe not configured          | Valve remains in random position on failure | Parameterise actuator                           |
| Mixing instead of diverting valve | Short-circuit in system                     | Check pipe connection and valve type            |
| Actuator too fast                 | Water hammer noise                          | Increase stroke time (parameterisation)         |

## Standards

- **EN 60534** — Industrial valves, control valves
- **VDI/VDE 2173** — Flow characteristics of control valves
