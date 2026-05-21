---
title: Durchflussmessung in der GA
title_en: Flow Measurement in Building Automation
slug: durchflussmessung
category: sensoren
subcategory: durchfluss
tags:
  [
    durchflussmessung,
    magnetisch-induktiv,
    mid,
    ultraschall,
    clamp-on,
    coriolis,
    differenzdruck-durchfluss,
    woltmann,
    flügelrad,
    volumenstrommessung,
    durchflusssensor,
    wärmemengenzähler-sensor,
    luftmengenmessung,
    pitot,
    prandtl
  ]
difficulty: fortgeschritten
area: [ga, hlk]
related: [waermemengenzaehler, sensoren, drucksensoren, pumpen, rlt-anlage, vav-cav]
rechner: []
norm: [EN 1434, OIML R49, EN ISO 4064, IEC 60534]
updated: 2026-05-15
lang: de
---

# Durchflussmessung in der GA

Durchflussmessung ist essenziell für Wärmemengenerfassung, Hydraulikoptimierung, Verbrauchsabrechnung und Betriebsüberwachung. Die Wahl des Messprinzips hängt von Medium, Leitungsgrösse, Genauigkeitsanforderung und Einbaubedingungen ab.

---

## Messprinzipien im Überblick

| Prinzip                         | Medium               | Genauigkeit | Einbau                 | Typische DN       |
| ------------------------------- | -------------------- | ----------- | ---------------------- | ----------------- |
| Magnetisch-induktiv (MID)       | leitf. Flüssigkeiten | 0,2–0,5%    | Fest (in Rohr)         | DN15–DN2000       |
| Ultraschall (Clamp-on)          | Flüssigkeiten, Gas   | 1–3%        | Extern (kein Eingriff) | DN50–DN2000       |
| Ultraschall (Inline)            | Flüssigkeiten        | 0,5–1%      | Fest                   | DN15–DN300        |
| Coriolis                        | Flüssigkeiten, Gas   | 0,1%        | Fest                   | DN6–DN150         |
| Differenzdruck (Blende/Venturi) | Alle Medien          | 1–2%        | Fest                   | DN25–DN1000       |
| Flügelrad / Woltmann            | Wasser               | 2–3%        | Fest                   | DN15–DN500        |
| Thermisch (Massenfluss)         | Gas, Luft            | 1–2%        | Fest oder Einsteck     | DN25–DN1000       |
| Pitot-Rohr                      | Luft, Gas            | 2–5%        | Einsteck               | Kanäle ab 200 mm² |

---

## Magnetisch-Induktives Messgerät (MID)

Funktionsprinzip: Ein leitfähiges Medium fliesst durch ein Magnetfeld. Die fliessende Flüssigkeit erzeugt eine der Geschwindigkeit proportionale Spannung (Faraday'sches Induktionsgesetz):

```
U = k × v × B × D
U: induzierte Spannung, v: Strömungsgeschwindigkeit, B: Magnetfeldstärke, D: Innendurchmesser
```

**Anforderungen:**

- Medium muss elektrisch leitfähig sein (≥ 5 µS/cm) — Reinstwasser nicht messbar
- Vollständig gefüllte Rohrleitung (kein Teildurchfluss)
- Erdung des Rohrs nötig (Erdungsringe bei Kunststoff-Rohren)

**GA-Anwendungen:**

- Wärmemengenzähler (Wärme-/Kältekreis)
- Volumenstrom-Regelung (Pumpe, Ventil)
- Verbrauchserfassung (Abrechnungszwecke = MID-Klasse R eichpflichtig)

---

## Ultraschall-Durchflussmessung

### Inline (in Rohrleitung eingebaut)

- Piezo-Wandler senden Schallimpulse upstream/downstream
- Laufzeitdifferenz ∝ Strömungsgeschwindigkeit
- Genauigkeit besser als Clamp-on
- Wartungsarm (kein beweglicher Teile, kein Druckverlust)

### Clamp-on (extern, ohne Rohreingriff)

Sensoren werden von aussen auf das Rohr geklemmt:

```
Rohr
 │◄── Sensor A (gegenüberliegend montiert)
 │
 │──► Sensor B
```

**Vorteile Clamp-on:**

- Kein Eingriff in die Rohrleitung (ideal für Nachrüstung)
- Keine Dichtheitsprobleme
- Für verschiedene Rohrdurchmesser einsetzbar (Einstellparameter: Rohr-∅, Wandstärke, Material)

**Nachteile Clamp-on:**

- Geringere Genauigkeit (1–3%) bei schlechten Einbaubedingungen
- Erfordert lange Einlaufstrecken (10–30× DN gerade Rohr vor Sensor)
- Rohrwanddicke und Luftblasen beeinflussen Messung

---

## Coriolis-Durchflussmesser

Das Medium durchströmt schwingende Messrohre. Die Corioliskraft aus der Schwingungs-Strömungs-Wechselwirkung ist proportional zum **Massenfluss** (nicht Volumenstrom):

- Direkte Massenstrom-Messung (unabhängig von Dichte, Viskosität)
- Genauigkeit: 0,1% — beste verfügbare Methode
- Gleichzeitig: Dichte, Temperatur messbar
- Hoher Anschaffungspreis, grosser Druckverlust
- **GA-Einsatz:** Selten (zu teuer), v.a. in der Industrie bei wertvollen Medien

---

## Differenzdruck-Durchfluss (Blende, Venturi, Pitot)

Bernoulli-Prinzip: Strömungsverengung erzeugt Druckabfall ∝ v²:

```
Q = α × A × √(2 × ΔP / ρ)
Q: Volumenstrom, α: Durchflusskoeffizient, ΔP: Differenzdruck, ρ: Dichte
```

| Typ        | Druckverlust          | Kosten       | Einsatz                      |
| ---------- | --------------------- | ------------ | ---------------------------- |
| Normblende | Hoch (30–50% ΔP_mess) | Niedrig      | Industrie, messtech. Prüfung |
| Venturi    | Gering (5–15%)        | Mittel       | Lüftungskanäle               |
| Pitot-Rohr | Sehr gering           | Sehr niedrig | Luftkanäle, Nachbestimmung   |

**Pitot-Rohr in Lüftungskanälen:** Einfaches Verfahren für Volumenstrom-Erstmessung (Inbetriebnahme), nicht für kontinuierliche Regelung geeignet (Verschmutzungsempfindlich).

---

## Flügelrad / Woltmann (Wärmemengenzähler)

Mechanische Durchfluss­messung: Strömung dreht ein Flügelrad, Umdrehungen werden gezählt.

| Typ           | Aufbau                        | DN         | Einsatz                 |
| ------------- | ----------------------------- | ---------- | ----------------------- |
| Flügelrad     | Querströmung                  | DN15–DN40  | Wohngebäude WMZ         |
| Woltmann      | Längsströmung                 | DN40–DN500 | Gebäude, Liegenschaften |
| Verbundzähler | Woltmann + Flügelrad parallel | DN50–DN200 | Schwankende Durchflüsse |

**GA-Hinweis:** Mechanische Zähler brauchen Mindestdurchfluss (Q_min) — bei sehr geringen Durchflüssen ungenau. Magnetisch-induktiv besser für variable Lasten.

---

## Luftvolumenstrom-Messung

### Messflügelrad / Anemometer

- Elektrisches Anemometer im Kanal oder an Auslass
- Genauigkeit ±3–5%
- Einsatz: Inbetriebnahme, mobile Prüfung

### Thermischer Massenstrom-Sensor

- Heizfaden-Prinzip: Heizleistung ∝ Massenstrom (Kühlwirkung der Luft)
- Einsatz: Feine Volumenstrommessung in VAV-Boxen, Luftauslässen
- Vorteil: Kein Druckverlust, schnelle Reaktion

### Differenzdruck-Messkreuz (Lüftung)

Kombination von 4–8 Pitot-Messstellen über den Kanalquerschnitt → mittlere Strömungsgeschwindigkeit:

```
v_mittel = √(2 × ΔP_mittel / ρ_Luft)
Q_Luft = v_mittel × A_Kanal
```

Standard für GLT-Volumenstromregelung in VAV-Anlagen.

<!-- EN -->

Flow measurement is essential for heat metering, hydraulic optimisation, consumption billing, and operational monitoring. The choice of measurement principle depends on the medium, pipe size, accuracy requirements, and installation conditions.

---

## Overview of Measurement Principles

| Principle                               | Medium             | Accuracy | Installation                   | Typical DN         |
| --------------------------------------- | ------------------ | -------- | ------------------------------ | ------------------ |
| Electromagnetic (EMF)                   | Conductive liquids | 0.2–0.5% | Fixed (in pipe)                | DN15–DN2000        |
| Ultrasonic (clamp-on)                   | Liquids, gas       | 1–3%     | External (no pipe penetration) | DN50–DN2000        |
| Ultrasonic (inline)                     | Liquids            | 0.5–1%   | Fixed                          | DN15–DN300         |
| Coriolis                                | Liquids, gas       | 0.1%     | Fixed                          | DN6–DN150          |
| Differential pressure (orifice/Venturi) | All media          | 1–2%     | Fixed                          | DN25–DN1000        |
| Turbine / Woltmann                      | Water              | 2–3%     | Fixed                          | DN15–DN500         |
| Thermal (mass flow)                     | Gas, air           | 1–2%     | Fixed or insertion             | DN25–DN1000        |
| Pitot tube                              | Air, gas           | 2–5%     | Insertion                      | Ducts from 200 mm² |

---

## Electromagnetic Flow Meter (EMF)

Operating principle: A conductive medium flows through a magnetic field. The flowing liquid generates a voltage proportional to velocity (Faraday's law of induction):

```
U = k × v × B × D
U: induced voltage, v: flow velocity, B: magnetic field strength, D: internal diameter
```

**Requirements:**

- Medium must be electrically conductive (≥ 5 µS/cm) — deionised water not measurable
- Completely full pipe (no partial flow)
- Pipe earthing required (earthing rings for plastic pipes)

**BA applications:**

- Heat meters (heating/cooling circuits)
- Flow rate control (pump, valve)
- Consumption metering (billing purposes = MID class — legal metrology)

---

## Ultrasonic Flow Measurement

### Inline (installed in pipeline)

- Piezoelectric transducers send acoustic pulses upstream/downstream
- Transit-time difference ∝ flow velocity
- Better accuracy than clamp-on
- Low maintenance (no moving parts, no pressure drop)

### Clamp-On (external, no pipe penetration)

Sensors are clamped onto the outside of the pipe:

```
Pipe
 │◄── Sensor A (mounted opposite)
 │
 │──► Sensor B
```

**Clamp-on advantages:**

- No pipe penetration (ideal for retrofit)
- No sealing issues
- Usable for different pipe diameters (parameters: pipe ∅, wall thickness, material)

**Clamp-on disadvantages:**

- Lower accuracy (1–3%) with poor installation conditions
- Requires long straight runs (10–30× DN straight pipe before sensor)
- Pipe wall thickness and air bubbles affect measurement

---

## Coriolis Flow Meter

The medium flows through vibrating measuring tubes. The Coriolis force from the vibration–flow interaction is proportional to **mass flow** (not volumetric flow):

- Direct mass flow measurement (independent of density, viscosity)
- Accuracy: 0.1% — the best available method
- Simultaneously measures density and temperature
- High purchase price, large pressure drop
- **BA use:** Rare (too expensive), mainly in industry for high-value media

---

## Differential Pressure Flow (Orifice, Venturi, Pitot)

Bernoulli principle: flow constriction creates a pressure drop ∝ v²:

```
Q = α × A × √(2 × ΔP / ρ)
Q: volumetric flow, α: discharge coefficient, ΔP: differential pressure, ρ: density
```

| Type             | Pressure loss                | Cost     | Application                          |
| ---------------- | ---------------------------- | -------- | ------------------------------------ |
| Standard orifice | High (30–50% of ΔP measured) | Low      | Industry, metrological testing       |
| Venturi          | Low (5–15%)                  | Medium   | Ventilation ducts                    |
| Pitot tube       | Very low                     | Very low | Air ducts, commissioning measurement |

**Pitot tube in ventilation ducts:** Simple method for initial flow measurement (commissioning), not suitable for continuous control (sensitive to fouling).

---

## Turbine / Woltmann Meter (Heat Meter)

Mechanical flow measurement: flow rotates an impeller; rotations are counted.

| Type       | Design                         | DN         | Application             |
| ---------- | ------------------------------ | ---------- | ----------------------- |
| Single-jet | Cross flow                     | DN15–DN40  | Residential heat meters |
| Woltmann   | Axial flow                     | DN40–DN500 | Buildings, properties   |
| Compound   | Woltmann + turbine in parallel | DN50–DN200 | Variable flow rates     |

**BA note:** Mechanical meters require a minimum flow (Q_min) — inaccurate at very low flow rates. Electromagnetic meters better for variable loads.

---

## Air Volume Flow Measurement

### Rotating Vane / Anemometer

- Electrical anemometer in duct or at outlet
- Accuracy ±3–5%
- Use: commissioning, portable testing

### Thermal Mass Flow Sensor

- Hot-wire principle: heating power ∝ mass flow (cooling effect of air)
- Use: precise volume flow measurement in VAV boxes, air terminals
- Advantage: no pressure drop, fast response

### Differential Pressure Measurement Cross (Ventilation)

Combination of 4–8 Pitot measurement points across the duct cross-section → mean flow velocity:

```
v_mean = √(2 × ΔP_mean / ρ_air)
Q_air = v_mean × A_duct
```

Standard for BMS volume flow control in VAV systems.
