---
title: Befeuchter — Typen, Regelung und Hygiene
title_en: Humidifiers — Types, Control and Hygiene
slug: befeuchter
category: lueftung
subcategory: befeuchtung
tags:
  [
    befeuchter,
    luftbefeuchtung,
    dampfbefeuchter,
    verdunstungsbefeuchter,
    hochdruckbefeuchter,
    relative-feuchte,
    absolute-feuchte,
    hygiene,
    legionellen,
    kalibrierung,
    rlt,
    vdi6022
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vdi6022, legionellen, taupunkt, raumluftqualitaet]
norm: [VDI 6022, EN 13053, DIN 1946]
updated: 2026-05-14
lang: de
---

# Befeuchter — Typen, Regelung und Hygiene

Luftbefeuchtung im Winterbetrieb ist hygienisch komplex und energetisch teuer. Die richtige Wahl des Befeuchtertyps und korrekte Parametrierung sind entscheidend für Komfort, Hygiene und Wirtschaftlichkeit.

## Warum Befeuchtung?

Im Winter: Kalte Aussenluft enthält wenig Feuchte (geringe absolute Feuchte). Wird sie aufgeheizt, sinkt die **relative Feuchte** stark:

Aussenluft mit −5 °C und 80 % relativer Feuchte enthält rund 2.1 g Wasser pro kg Luft. Auf 20 °C aufgeheizt, bleibt dieser Wassergehalt gleich, die relative Feuchte fällt aber auf **etwa 14 %**. Das ist sehr trocken: Schleimhäute trocknen aus, es gibt statische Aufladung, Holz und Parkett reissen.

**Komfortbereich:** üblich sind etwa 30 bis 60 % relative Feuchte. Ob überhaupt befeuchtet wird, ist eine Planungsentscheidung: Befeuchtung kostet viel Energie und Wartung.

---

## Befeuchtertypen

### 1. Elektrischer Dampfbefeuchter

**Prinzip:** Elektrisches Heizelement verdampft Wasser → hygienisch reiner Dampf.

Ein Heizelement oder Elektroden verdampfen Wasser, der Dampf wird über ein Dampfverteilrohr in den Luftstrom eingebracht.

| Eigenschaft      | Wert                                            |
| ---------------- | ----------------------------------------------- |
| **Hygiene**      | Sehr gut, der Dampf ist praktisch keimfrei      |
| Energieverbrauch | Hoch, rund 0.73 kWh pro kg Dampf aus Kaltwasser |
| Wartung          | Entkalkung nötig (alle 1–3 Monate)              |
| Regelung         | Proportional (Leistung 0–100 %)                 |
| Einsatz          | Büro, Spital, kritische Anwendungen             |

**Steuerung GA:** 0–10 V Leistungsvorgabe (0 = aus, 10 V = 100 % Leistung).

### 2. Verdunstungsbefeuchter (Umlaufverdunstung)

**Prinzip:** Wasser rieselt über Verdunstungsmatten, die Luft strömt hindurch.

Eine Pumpe benetzt Verdunstungsmatten, die Luft streicht hindurch und nimmt Feuchte auf. Dabei kühlt sie ab (adiabatisch).

| Eigenschaft           | Wert                                                 |
| --------------------- | ---------------------------------------------------- |
| **Hygiene**           | **Problematisch** (stehendes Wasser → Legionellen!)  |
| Energieverbrauch      | Niedrig (nur Pumpe/Ventilator)                       |
| Befeuchtungsgrad      | Maximal 80–90 % rF (enthalpie-begrenzt)              |
| Wartung               | Intensiv! Wassertank regelmässig reinigen            |
| Hygiene nach VDI 6022 | nur mit konsequenter Wasserbehandlung und Kontrollen |

> ⚠️ Verdunstungsbefeuchter in RLT-Anlagen sind hygienisch kritisch. Bei unzureichender Wartung → Legionellen und Schimmelbildung. Für neue Anlagen **nicht empfohlen**.

### 3. Hochdruck-Wasservernebelung

**Prinzip:** Wasser wird durch Hochdruckdüsen (70–100 bar) zu Tröpfchen < 10 µm vernebelt.

Eine Hochdruckpumpe drückt aufbereitetes Wasser, meist aus Umkehrosmose, durch feine Düsen, typisch mit 70 bis 100 bar. Die Tröpfchen verdunsten im Luftstrom.

| Eigenschaft      | Wert                                             |
| ---------------- | ------------------------------------------------ |
| **Hygiene**      | Gut bei RO-Wasser und regelmässiger Desinfektion |
| Energieverbrauch | Niedrig–Mittel                                   |
| Befeuchtungsgrad | Hoch                                             |
| Wartung          | Düsen verstopfen, regelmässige Reinigung         |
| Einsatz          | Komfort-Anlagen, wenn Hygiene gesichert          |

### 4. Dampfbefeuchter via Dampfnetz

Wo Niederdruckdampf verfügbar (Industrie, Krankenhäuser):

Niederdruckdampf aus dem Netz wird über einen Druckminderer und ein Regelventil in den Luftstrom gegeben.

- Sehr hygiensich (Dampf > 100 °C)
- Keine elektrische Eigenheizleistung
- Druckregelung nötig

---

## Hygiene

Befeuchter sind die hygienisch heikelste Stelle einer Lüftungsanlage. Nach **VDI 6022** (in der Schweiz zusätzlich **SWKI VA104-01**) gilt unter anderem:

- **Wasser** mindestens in Trinkwasserqualität, bei Sprüh- und Hochdruckbefeuchtern aufbereitet
- **Keine stehenden Wasserreste**: Wannen und Leitungen müssen sich vollständig entleeren und abtrocknen lassen
- **Regelmässige Kontrollen** und mikrobiologische Untersuchungen des Befeuchterwassers bei wasserführenden Befeuchtern
- **Hygieneinspektionen** der Anlage in festen Abständen

Für Spitäler gelten mit **DIN 1946-4** (bzw. SWKI 99-3 in der Schweiz) strengere Regeln. Dampfbefeuchter sind dort die Regel.

## Regelung der Luftbefeuchtung

- **Fühler:** Feuchte im Raum oder in der Abluft als Regelgrösse, dazu ein **Begrenzungsfühler** in der Zuluft nach dem Befeuchter
- **Sollwert:** im Winter typisch 30–40 % rF, je nach Nutzung
- **Regler:** PI auf die Befeuchterleistung 0–100 %
- **Maximalbegrenzung:** Die Zuluftfeuchte nach dem Befeuchter wird begrenzt, typisch auf 80–85 % rF, damit im Kanal nichts kondensiert
- **Freigabe** nur bei laufendem Ventilator und Strömung (Strömungswächter)

### Hysterese und Verzögerung

Feuchteänderungen in der Luft sind träge → Pi-Regler mit langer Nachstellzeit (Ti = 3–10 min) verwenden. Aggressiver Regler → Pendeln, überschwingen, Kondensation.

---

## GA-Datenpunkte Befeuchter

| Datenpunkt          | Typ | Einheit | Beschreibung            |
| ------------------- | --- | ------- | ----------------------- |
| Feuchte Zuluft Ist  | AI  | % rF    | Nach Befeuchter         |
| Feuchte Sollwert    | AV  | % rF    | Vorgabe                 |
| Befeuchter Leistung | AO  | %       | 0–10 V Stellsignal      |
| Befeuchter Betrieb  | DO  | —       | Freigabe EIN/AUS        |
| Befeuchter Störung  | DI  | —       | Kein Wasser, Kalkschutz |
| Wasserverbrauch     | AI  | l/h     | Monitoring              |

## Normen

- **VDI 6022 Blatt 1** — Hygieneanforderungen an raumlufttechnische Anlagen
- **SWKI VA104-01** — Hygieneanforderungen an Lüftungs- und Klimaanlagen (CH)
- **EN 13053** — Zentrale Raumlufttechnische Anlagen (Befeuchtungsabschnitt)
- **DIN 1946-4** — Raumlufttechnik in Krankenhäusern (strikte Hygieneregeln)

<!-- EN -->

Air humidification in winter operation is hygienically complex and energetically costly. The correct choice of humidifier type and proper parameter settings are decisive for comfort, hygiene, and economy.

## Why Humidification?

In winter: cold outdoor air contains little moisture (low absolute humidity). When heated, the **relative humidity** drops sharply:

Outdoor air at −5 °C and 80 % relative humidity contains about 2.1 g of water per kg of air. Heated to 20 °C, this water content stays the same, but the relative humidity drops to **about 14 %**. That is very dry: mucous membranes dry out, static charges build up, wood and parquet crack.

**Comfort range:** typically about 30 to 60 % relative humidity. Whether to humidify at all is a design decision: humidification costs a lot of energy and maintenance.

---

## Humidifier Types

### 1. Electric Steam Humidifier

**Principle:** Electric heating element evaporates water → hygienically pure steam.

A heating element or electrodes evaporate water; the steam is introduced into the airflow through a steam distribution pipe.

| Property           | Value                                                |
| ------------------ | ---------------------------------------------------- |
| **Hygiene**        | Very good, the steam is practically sterile          |
| Energy consumption | High, about 0.73 kWh per kg of steam from cold water |
| Maintenance        | Descaling required (every 1–3 months)                |
| Control            | Proportional (output 0–100 %)                        |
| Application        | Office, hospital, critical applications              |

**BA control:** 0–10 V power setpoint (0 = off, 10 V = 100 % output).

### 2. Evaporative Humidifier (Recirculating Evaporation)

**Principle:** water trickles over evaporation pads, the air flows through them.

A pump wets evaporation pads; the air passes through and picks up moisture. It cools down in the process (adiabatically).

| Property             | Value                                           |
| -------------------- | ----------------------------------------------- |
| **Hygiene**          | **Problematic** (standing water → Legionella!)  |
| Energy consumption   | Low (pump/fan only)                             |
| Humidification level | Maximum 80–90 % RH (enthalpy-limited)           |
| Maintenance          | Intensive! Water tank requires regular cleaning |
| Hygiene per VDI 6022 | only with consistent water treatment and checks |

> ⚠️ Evaporative humidifiers in AHU systems are hygienically critical. With inadequate maintenance → Legionella and mould growth. **Not recommended** for new installations.

### 3. High-Pressure Water Atomisation

**Principle:** Water is atomised through high-pressure nozzles (70–100 bar) into droplets < 10 µm.

A high-pressure pump forces treated water, usually from reverse osmosis, through fine nozzles, typically at 70 to 100 bar. The droplets evaporate in the airflow.

| Property             | Value                                       |
| -------------------- | ------------------------------------------- |
| **Hygiene**          | Good with RO water and regular disinfection |
| Energy consumption   | Low to medium                               |
| Humidification level | High                                        |
| Maintenance          | Nozzles can clog; regular cleaning required |
| Application          | Comfort systems where hygiene is assured    |

### 4. Steam Humidifier via Steam Network

Where low-pressure steam is available (industry, hospitals):

Low-pressure steam from the network is fed into the airflow via a pressure reducer and a control valve.

- Very hygienic (steam > 100 °C)
- No electrical self-heating required
- Pressure regulation needed

---

## Hygiene

Humidifiers are the most hygienically sensitive point of a ventilation system. Per **VDI 6022** (in Switzerland additionally **SWKI VA104-01**), among other things:

- **Water** at least of drinking water quality, treated for spray and high-pressure humidifiers
- **No standing water**: trays and pipes must drain completely and dry out
- **Regular checks** and microbiological tests of the humidifier water for water-based humidifiers
- **Hygiene inspections** of the system at fixed intervals

Hospitals are subject to stricter rules with **DIN 1946-4** (or SWKI 99-3 in Switzerland). Steam humidifiers are the norm there.

## Humidity Control

- **Sensors:** humidity in the room or extract air as the controlled variable, plus a **limiting sensor** in the supply air after the humidifier
- **Setpoint:** typically 30–40 % RH in winter, depending on use
- **Controller:** PI on humidifier output 0–100 %
- **Maximum limit:** the supply air humidity after the humidifier is limited, typically to 80–85 % RH, so nothing condenses in the duct
- **Enable** only with fan running and airflow proven (flow switch)

### Hysteresis and Delay

Humidity changes in air are slow → use PI controller with long reset time (Ti = 3–10 min). Aggressive controller → oscillation, overshoot, condensation.

---

## BA Data Points — Humidifier

| Data point                 | Type | Unit | Description                |
| -------------------------- | ---- | ---- | -------------------------- |
| Supply air humidity actual | AI   | % RH | After humidifier           |
| Humidity setpoint          | AV   | % RH | Command                    |
| Humidifier output          | AO   | %    | 0–10 V control signal      |
| Humidifier enable          | DO   | —    | Run/stop                   |
| Humidifier fault           | DI   | —    | No water, scale protection |
| Water consumption          | AI   | l/h  | Monitoring                 |

## Standards

- **VDI 6022 Part 1** — Hygiene requirements for ventilation and air-conditioning systems
- **SWKI VA104-01** — Hygiene requirements for ventilation and air-conditioning systems (CH)
- **EN 13053** — Central air handling units (humidifier section)
- **DIN 1946-4** — Ventilation in hospitals (strict hygiene rules)
