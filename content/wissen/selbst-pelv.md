---
title: SELV und PELV — Schutzkleinspannung in der GA
title_en: SELV and PELV — Protective Extra-Low Voltage in BA
slug: selv-pelv
category: elektro
subcategory: sicherheit
tags:
  [
    selv,
    pelv,
    schutzkleinspannung,
    24v,
    niederspannung,
    sicherheitsstromkreis,
    berührungsschutz,
    potentialtrennung,
    schutzisolation,
    ddc,
    sensor,
    aktor,
    schaltschrank
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [signaltypen, dali, knx, schirmung-erdung]
norm: [IEC 61140, IEC 60364-4-41, EN 50178, VDE 0100-410]
updated: 2026-05-14
lang: de
---

# SELV und PELV — Schutzkleinspannung in der GA

Fast alle GA-Feldgeräte arbeiten mit 24 VAC oder 24 VDC. Diese Spannung gilt als Kleinspannung — aber die genaue elektrische Sicherheitseinstufung hängt davon ab ob SELV oder PELV vorliegt.

## Schutzklassen und Sicherheitsspannungen

### SELV — Safety Extra-Low Voltage

**Sicherheitskleinspannung:**

- Spannung ≤ 50 VAC / ≤ 120 VDC (Scheitelwert)
- **Potentialgetrennt** von Netzspannung (Schutztransformator mit Doppelwicklung)
- **Keine Erdung** des SELV-Kreises (geerdet würde es zu PELV)
- Auch bei Berührung: kein gefährlicher Strom möglich

**Einsatz:** Überall wo erhöhte Sicherheit nötig ist:

- Nassräume (Badezimmer: SELV < 12 V)
- Ausserhalb von Gebäuden
- Medizinische Geräte
- **DDC-Niederspannungskreise** (wenn galvanisch getrennt)

### PELV — Protective Extra-Low Voltage

**Schutzkleinspannung:**

- Gleiche Spannungsgrenzen wie SELV
- **Darf geerdet sein** (Schutzleiteranschluss erlaubt)
- Potentialgetrennt vom Netz (wie SELV)
- Bei Berührung: Ableitströme über PE möglich, aber kontrolliert

**Einsatz:** Standard in GA-Schaltschränken:

- DDC-Versorgung 24 V über Netzteil
- Sensor- und Aktor-Versorgung
- Bus-Spannungen (KNX, DALI, M-Bus)

### Unterschied SELV/PELV auf einen Blick

| Merkmal              | SELV                 | PELV                     |
| -------------------- | -------------------- | ------------------------ |
| Spannungsgrenze      | ≤ 50 VAC / 120 VDC   | ≤ 50 VAC / 120 VDC       |
| Potentialtrennung    | ✅ Erforderlich      | ✅ Erforderlich          |
| Erdung erlaubt       | ❌ Nein              | ✅ Ja (Schutzleiter)     |
| Berührungsschutz     | Sehr hoch            | Hoch                     |
| Typischer Einsatz GA | Feuchträume, Medizin | **Standard DDC-Schrank** |

---

## 24 VAC vs. 24 VDC in der GA

| Parameter           | 24 VAC                             | 24 VDC                              |
| ------------------- | ---------------------------------- | ----------------------------------- |
| Häufigkeit          | Ältere Systeme (Stellantriebe)     | Moderne Systeme (DDC, Bus)          |
| Messung             | AC-Voltmeter nötig                 | DC-Voltmeter                        |
| Polungsabhängigkeit | Nein (Wechselspannung)             | Ja (Verpolen = Schaden!)            |
| Versorgung          | Transformator                      | Netzteil (Gleichrichter + Glättung) |
| Bus-Kompatibilität  | Nein                               | Ja (KNX: 29V DC, DALI: 16V DC)      |
| Verdrahtungsfehler  | Weniger kritisch (nur Überhitzung) | Verpolen zerstört Geräte            |

**Merke:** Stellantriebe (Belimo, Siemens) oft 24 VAC **oder** 24 VDC (beide akzeptiert, Handbuch lesen!). KNX und DALI sind 24–29 VDC (Polarität beachten!).

---

## Netzteil-Auswahl für GA-Schaltschrank

```
24 VDC Netzteil:
  Eingang: 230 VAC (Netz)
  Ausgang: 24 VDC
  Leistung: berechnen aus allen Verbrauchern + 20 % Reserve

Ausgangsstrom berechnen:
  DDC: 1.5 A (z.B.)
  10 × Stellantrieb: 10 × 0.1 A = 1.0 A
  4 × Sensor: 4 × 0.05 A = 0.2 A
  Bus (KNX): 0.3 A
  ─────────────────────
  Total: 3.0 A × 1.2 (Reserve) = 3.6 A

→ 24 VDC / 5 A Netzteil wählen (nächste Normgrösse)
```

---

## Kurzschlussschutz in Kleinspannungskreisen

Auch bei 24 V sind Kurzschlüsse gefährlich (Kabelbrände möglich!):

- **Netzteil mit Kurzschlussschutz** verwenden (Strombegrenzung oder Abschaltung)
- **Sicherungen** im 24 V-Kreis (0.5–4 A, je nach Stromkreis)
- **Leitungsquerschnitt** ausreichend dimensionieren (0.5 mm² für < 3 A, 1.0 mm² für < 5 A)

---

## Typische GA-Verdrahtungsfehler

| Fehler                              | Konsequenz                     | Lösung                                |
| ----------------------------------- | ------------------------------ | ------------------------------------- |
| 24 VDC Aktor an 230 V angeschlossen | Gerät zerstört, Brandgefahr    | Spannungsebenen farblich kennzeichnen |
| 24 VDC und 24 VAC gemischt          | Geräte liefern falsche Werte   | Strikt trennen                        |
| Kein Schutzleiter am Netzteil       | PELV wird zu Floating → Gefahr | PE immer anschliessen                 |
| Überlast Netzteil                   | Netzteil überhitzt, Ausfall    | Reserve einplanen                     |
| 230V-Fremdpotential am DI           | DDC-Eingang zerstört           | Nur Schutzkleinspannung ans DI!       |

## Normen

- **IEC 61140** — Schutz gegen elektrischen Schlag (SELV/PELV Definition)
- **IEC 60364-4-41** — Elektrische Anlagen von Gebäuden, Schutz gegen elektrischen Schlag
- **EN 50178** — Elektronische Betriebsmittel (Netzteile für Automatisierung)
- **VDE 0100-410** (DE) — Errichten elektrischer Anlagen, Schutz gegen elektrischen Schlag

<!-- EN -->

Almost all BA field devices operate at 24 VAC or 24 VDC. This voltage is classified as extra-low voltage — but the precise electrical safety classification depends on whether SELV or PELV applies.

## Safety Classes and Safety Voltages

### SELV — Safety Extra-Low Voltage

**Safety extra-low voltage:**

- Voltage ≤ 50 VAC / ≤ 120 VDC (peak)
- **Galvanically isolated** from mains voltage (safety isolating transformer with double winding)
- **No earthing** of the SELV circuit (earthing would convert it to PELV)
- Even on contact: no dangerous current possible

**Applications:** Wherever elevated safety is required:

- Wet rooms (bathroom: SELV < 12 V)
- Outdoors
- Medical devices
- **DDC low-voltage circuits** (when galvanically isolated)

### PELV — Protective Extra-Low Voltage

**Protective extra-low voltage:**

- Same voltage limits as SELV
- **May be earthed** (protective conductor connection permitted)
- Galvanically isolated from mains (like SELV)
- On contact: leakage currents via PE possible, but controlled

**Applications:** Standard in BA control panels:

- DDC supply 24 V via power supply unit
- Sensor and actuator supply
- Bus voltages (KNX, DALI, M-Bus)

### SELV / PELV at a Glance

| Feature            | SELV               | PELV                          |
| ------------------ | ------------------ | ----------------------------- |
| Voltage limit      | ≤ 50 VAC / 120 VDC | ≤ 50 VAC / 120 VDC            |
| Galvanic isolation | ✅ Required        | ✅ Required                   |
| Earthing permitted | ❌ No              | ✅ Yes (protective conductor) |
| Touch protection   | Very high          | High                          |
| Typical BA use     | Wet rooms, medical | **Standard DDC panel**        |

---

## 24 VAC vs. 24 VDC in BA

| Parameter            | 24 VAC                           | 24 VDC                                    |
| -------------------- | -------------------------------- | ----------------------------------------- |
| Prevalence           | Older systems (actuators)        | Modern systems (DDC, bus)                 |
| Measurement          | AC voltmeter required            | DC voltmeter                              |
| Polarity sensitivity | No (alternating)                 | Yes (reverse polarity = damage!)          |
| Supply               | Transformer                      | Power supply unit (rectifier + smoothing) |
| Bus compatibility    | No                               | Yes (KNX: 29 V DC, DALI: 16 V DC)         |
| Wiring errors        | Less critical (only overheating) | Reverse polarity destroys devices         |

**Note:** Actuators (Belimo, Siemens) often accept 24 VAC **or** 24 VDC (check the datasheet!). KNX and DALI are 24–29 VDC (observe polarity!).

---

## Power Supply Selection for BA Control Panels

```
24 VDC power supply unit:
  Input: 230 VAC (mains)
  Output: 24 VDC
  Power: calculate from all loads + 20% reserve

Output current calculation:
  DDC: 1.5 A
  10 × actuator: 10 × 0.1 A = 1.0 A
  4 × sensor: 4 × 0.05 A = 0.2 A
  Bus (KNX): 0.3 A
  ─────────────────────
  Total: 3.0 A × 1.2 (reserve) = 3.6 A

→ Select 24 VDC / 5 A PSU (next standard size up)
```

---

## Short-Circuit Protection in Extra-Low Voltage Circuits

Even at 24 V, short circuits are dangerous (cable fires are possible!):

- Use a **power supply with short-circuit protection** (current limiting or shutdown)
- **Fuses** in the 24 V circuit (0.5–4 A, depending on the circuit)
- **Adequate conductor cross-section** (0.5 mm² for < 3 A, 1.0 mm² for < 5 A)

---

## Common BA Wiring Mistakes

| Mistake                            | Consequence                        | Solution                      |
| ---------------------------------- | ---------------------------------- | ----------------------------- |
| 24 VDC actuator connected to 230 V | Device destroyed, fire risk        | Colour-code voltage levels    |
| 24 VDC and 24 VAC mixed            | Devices produce incorrect readings | Strictly separate             |
| No protective conductor on PSU     | PELV becomes floating → hazard     | Always connect PE             |
| PSU overloaded                     | PSU overheats, fails               | Include reserve capacity      |
| 230 V stray potential on DI        | DDC input destroyed                | Only extra-low voltage at DI! |

## Standards

- **IEC 61140** — Protection against electric shock (SELV/PELV definition)
- **IEC 60364-4-41** — Electrical installations of buildings, protection against electric shock
- **EN 50178** — Electronic equipment for use in power installations (PSUs for automation)
- **VDE 0100-410** (DE) — Erection of electrical installations, protection against electric shock
