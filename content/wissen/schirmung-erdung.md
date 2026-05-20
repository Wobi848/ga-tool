---
title: Schirmung und Erdung — EMV in der GA
title_en: Shielding and Earthing — EMC in Building Automation
slug: schirmung-erdung
category: signale
subcategory: emv
tags: [schirmung, erdung, emv, brummschleife, schirmanschluss, kabelschirm, potentialausgleich, entstörung, differenziell, gleichtakt, ferritkern, leitungsführung, messfehler]
difficulty: fortgeschritten
area: [ga, elektro]
related: [signaltypen, frequenzumrichter, modbus, netzwerk-ga]
norm: [IEC 61000-5-2, EN 50174, VDE 0100-540]
updated: 2026-05-14
lang: de
---

# Schirmung und Erdung — EMV in der GA

Messfehler, Signalstörungen und unerklärliche Kommunikationsausfälle haben oft eine gemeinsame Ursache: falsche Schirmung oder Erdung. Die Regeln sind einfach — aber in der Praxis oft falsch umgesetzt.

## Das Problem: Elektromagnetische Einstreuung

Signalleitungen wirken als Antennen. Störquellen:

| Störquelle              | Störmechanismus                        |
|-------------------------|----------------------------------------|
| Frequenzumrichter       | Hohe Oberwellen, Schaltflanken         |
| Motorleitungen          | Elektromagnetische Induktion           |
| Netzspannung 50 Hz      | Kapazitive und induktive Kopplung      |
| Beleuchtung (Schaltvorgang) | Impulsstörer                       |
| Mobilfunk, WLAN         | HF-Einstreuung                         |
| Potentialunterschiede   | Ausgleichsströme über Schirm           |

---

## Schirm-Anschluss: Die Grundregel

### Einseitige Erdung (Standardregel)

```
Gerät A ── Schirm ──────────────── Gerät B
              │
           einseitig
           erdet (z.B. bei A)
              │
             GND/PE
```

**Warum einseitig?** Bei beidseitiger Erdung entsteht eine **Brummschleife**:

```
Gerät A (Potential 0 V) ── Schirm ── Gerät B (Potential 0.3 V)
              │                              │
             GND                           GND
              └──────── Ausgleichsstrom ────┘
                              ↓
                   Stört das Messsignal! (50 Hz Brumm)
```

Der Schirm sollte **am Ende mit der niedrigsten Impedanz** geerdet werden — üblicherweise am Schaltschrank (Empfänger-Seite), nicht am Sensor (Sender-Seite).

### Ausnahme: Beidseitige Erdung bei HF-Störungen

Bei hochfrequenten Störungen (FU, Schaltfrequenzen > 10 kHz) ist beidseitige Erdung besser — der Schirm wirkt dann als Faraday'scher Käfig:

```
→ Wenn Störquelle = FU oder Schaltnetzteil: beidseitig erden (über Y-Kondensator)
→ Wenn Störquelle = 50 Hz Induktion: einseitig erden
→ Im Zweifel: einseitig und prüfen ob besser wird
```

---

## Brummschleife erkennen und beheben

**Symptome:**
- Messwert überlagert mit 50 Hz Zittern (im Trend sichtbar)
- Analoge Messung schwankt ±0.5–2 V
- Modbus-Kommunikation instabil (CRC-Fehler)

**Diagnose:**
1. Messsignal mit Oszilloskop prüfen (50 Hz aufmoduliert?)
2. Schirm an einem Ende öffnen → Störung weg? → Brummschleife bestätigt
3. Potentialdifferenz zwischen zwei Erdungspunkten messen (Sollte < 100 mV sein)

**Lösung:**
1. Schirm nur einseitig erden
2. Galvanische Trennung (Isolationsübertrager, Trennverstärker)
3. Potentialausgleichsleiter zwischen Schaltschränken (separate Leitung, grün-gelb, 6–16 mm²)

---

## Leitungsführung

### Kabelklassen

| Kabeltyp          | Zusammen verlegen?                           |
|-------------------|----------------------------------------------|
| 230 V / 400 V     | NEIN — getrennt von Signalleitungen          |
| Motorleitungen (FU) | NEIN — eigener Kabelweg, grosser Abstand  |
| Bus (Modbus, KNX) | JA mit anderen Bus-Leitungen, getrennt von 230V |
| Analoge Signale   | Getrennt von 230 V, möglichst getrennt von Bus |
| Ethernet          | Getrennt von 230 V (PoE-Kabel haben eigene Schirmung) |

**Mindestabstände:**
- Signal zu 230 V: > 50 mm
- Signal zu Motorleitung (FU): > 200 mm (besser in eigenem Kanal)
- Kreuzen erlaubt (senkrecht), parallel so wenig wie möglich

### Kabelkanäle und Blenden

```
❌ Falsch: Steuerleitung parallel neben FU-Motorleitung 1 m Länge
✅ Richtig: Metallblende trennt, oder 90°-Kreuzung, oder > 200 mm Abstand
```

---

## Analoge Signale — Differenzieller Eingang

Viele DDC-Eingänge für 4–20 mA sind **differenziell** (zwei Klemmen: + und −):

```
4–20 mA Signal:
  + Ader (Signal)
  − Ader (Rückleitung)
  ↑ Beide werden gemessen, Differenz = Nutzsignal
```

Vorteil: Gleichtaktstörungen (auf beiden Adern gleich) werden ausgeblendet → besser als Single-Ended.

> ⚠️ Bei differenziellem Eingang: Schirm **nicht** an Signalleiter anschliessen. Schirm separat an PE (einseitig).

---

## Potentialausgleich im Schaltschrank

```
PE-Sammelschiene (gründes Masseband)
    ├── Schirmklemmen aller Signalleitungen
    ├── Gehäuse des Schaltschranks
    ├── DIN-Schiene
    └── PE-Anschluss der DDC
```

Alle Schirme laufen auf **eine** Sammelschiene — von dort ein einziger Ableitungsweg zu PE. Keine "Sterne" einzelner Schirm-Kabel direkt in die Verteilung.

---

## Normen

- **IEC 61000-5-2** — EMV, Installation und Abschwächungsrichtlinien, Erdung und Schirmung
- **EN 50174-2** — Informationstechnik, Kabelinstallation in Gebäuden
- **VDE 0100-540** — Schutzleiter, Potentialausgleich, Erdung
- **IEC 61131-2** — SPS/DDC-Signalpegel und Störfestigkeit

<!-- EN -->

Measurement errors, signal interference, and unexplained communication failures often share a common root cause: incorrect shielding or earthing. The rules are simple — but frequently misapplied in practice.

## The Problem: Electromagnetic Interference

Signal cables act as antennas. Sources of interference:

| Source | Interference mechanism |
|--------|----------------------|
| Variable speed drives | High harmonics, switching edges |
| Motor cables | Electromagnetic induction |
| Mains voltage 50 Hz | Capacitive and inductive coupling |
| Lighting (switching) | Impulse interference |
| Mobile phone, WLAN | RF ingress |
| Potential differences | Equalisation currents via shield |

---

## Shield Connection: The Fundamental Rule

### Single-Ended Earthing (Standard Rule)

```
Device A ── Shield ──────────────── Device B
              │
           earthed at one end only (e.g. at A)
              │
             GND/PE
```

**Why single-ended?** With earthing at both ends, a **ground loop** forms:

```
Device A (potential 0 V) ── Shield ── Device B (potential 0.3 V)
              │                              │
             GND                           GND
              └──────── equalisation current ─┘
                              ↓
                   Distorts the measurement signal! (50 Hz hum)
```

The shield should be earthed **at the end with the lowest impedance** — typically at the control panel (receiver side), not at the sensor (transmitter side).

### Exception: Double-Ended Earthing for HF Interference

For high-frequency interference (VSD, switching frequencies > 10 kHz), double-ended earthing is better — the shield then acts as a Faraday cage:

```
→ If source = VSD or SMPS: earth both ends (via Y-capacitor)
→ If source = 50 Hz induction: earth one end only
→ When in doubt: earth one end and check whether it improves
```

---

## Identifying and Resolving Ground Loops

**Symptoms:**
- Measurement value overlaid with 50 Hz ripple (visible in trend)
- Analogue measurement fluctuates ±0.5–2 V
- Modbus communication unstable (CRC errors)

**Diagnosis:**
1. Check signal with oscilloscope (50 Hz superimposed?)
2. Open shield at one end → interference gone? → ground loop confirmed
3. Measure potential difference between two earth points (should be < 100 mV)

**Solution:**
1. Earth shield at one end only
2. Galvanic isolation (isolation transformer, isolating amplifier)
3. Equipotential bonding conductor between panels (separate cable, green-yellow, 6–16 mm²)

---

## Cable Routing

### Cable Classes

| Cable type | Route together? |
|-----------|----------------|
| 230 V / 400 V | NO — separate from signal cables |
| Motor cables (VSD) | NO — dedicated cable tray, large clearance |
| Bus (Modbus, KNX) | YES with other bus cables, separate from 230 V |
| Analogue signals | Separate from 230 V, preferably separate from bus |
| Ethernet | Separate from 230 V (PoE cables have own shielding) |

**Minimum separations:**
- Signal to 230 V: > 50 mm
- Signal to motor cable (VSD): > 200 mm (better in dedicated trunking)
- Crossing allowed (perpendicular), parallel routing as short as possible

### Cable Trunking and Barriers

```
❌ Wrong: Control cable running parallel next to VSD motor cable for 1 m
✅ Right: Metal barrier separates them, or 90° crossing, or > 200 mm clearance
```

---

## Analogue Signals — Differential Input

Many DDC inputs for 4–20 mA are **differential** (two terminals: + and −):

```
4–20 mA signal:
  + conductor (signal)
  − conductor (return)
  ↑ Both are measured; difference = useful signal
```

Advantage: common-mode interference (identical on both conductors) is rejected → better than single-ended.

> ⚠️ With a differential input: do **not** connect the shield to the signal conductors. Connect the shield separately to PE (single-ended).

---

## Equipotential Bonding in the Control Panel

```
PE busbar (green earth bar)
    ├── Shield terminals of all signal cables
    ├── Control panel enclosure
    ├── DIN rail
    └── PE connection of DDC
```

All shields terminate at **one** busbar — from there a single discharge path to PE. No "star" of individual shield cables running directly into the distribution.

---

## Standards

- **IEC 61000-5-2** — EMC, installation and attenuation guidelines, earthing and shielding
- **EN 50174-2** — Information technology, cabling installation in buildings
- **VDE 0100-540** — Protective conductors, equipotential bonding, earthing
- **IEC 61131-2** — PLC/DDC signal levels and noise immunity
