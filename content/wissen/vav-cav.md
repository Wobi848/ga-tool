---
title: VAV vs. CAV — Variable und konstante Luftmengen
title_en: VAV vs. CAV — Variable and Constant Air Volume
slug: vav-cav
category: lueftung
subcategory: regelung
tags: [vav, cav, variable-air-volume, constant-air-volume, volumenstromregler, druck, rlt, zuluft, abluft, bypass, druckregelung, frequenzumrichter, luftbedarf, co2, praesenz]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, frequenzumrichter, pid-regler, druckverlust, raumluftqualitaet]
norm: [EN 16798-3, EN 15232, SIA 382.1]
updated: 2026-05-14
lang: de
---

# VAV vs. CAV — Variable und konstante Luftmengen

Ob eine Lüftungsanlage mit konstantem oder variablem Luftvolumenstrom arbeitet, entscheidet massgeblich über Energieverbrauch, Komfort und Regelbarkeit. Der Unterschied liegt im Kern der Lüftungsarchitektur.

## CAV — Constant Air Volume

### Prinzip

Der Ventilator läuft auf konstanter Drehzahl. Der Luftvolumenstrom bleibt immer gleich — unabhängig von Belegung, Aussentemperatur oder Nutzungsprofil.

```
RLT-Zentrale (feste Drehzahl)
    ↓ Konstanter Volumenstrom
Raum 1 (voll besetzt)   — bekommt 100 % Luft
Raum 2 (leer)           — bekommt auch 100 % Luft
```

### Regelung bei CAV

Da der Volumenstrom fix ist, kann nur die **Temperatur** geregelt werden:
- Heizregister Ein/Aus oder stetig
- Kühler stetig
- Mischkasten: Innen-/Aussenluft mischen

**Keine Bedarfsregelung möglich** — auch leere Räume werden voll belüftet.

### Wann CAV sinnvoll?

| Anwendung                                | Begründung                               |
|------------------------------------------|------------------------------------------|
| Einfache Wohnbelüftung                   | Gleichmässige Belegung                   |
| Produktionsräume mit konstantem Bedarf   | Prozessluft, keine Bedarfsvariabilität   |
| Kleine Anlagen (< 2000 m³/h)             | VAV-Technik zu teuer                     |
| Reinräume                                | Konstanter Druck und Luftwechsel Pflicht |

---

## VAV — Variable Air Volume

### Prinzip

Der Volumenstrom wird **bedarfsgerecht** geregelt. Jede Zone hat einen **VAV-Regler** (Volumenstromkonstanthalter + Klappe), der den Luftstrom für diesen Raum auf den aktuellen Bedarf einstellt.

```
RLT-Zentrale (variable Drehzahl)
    ↓ Variabler Gesamtvolumenstrom
VAV-Box Zone 1 (besetzt) → 80 % Sollvolumenstrom
VAV-Box Zone 2 (leer)    → 30 % Mindestvolumenstrom
VAV-Box Zone 3 (Sitzung) → 100 % Sollvolumenstrom
    ↓
Übergeordnete Druckregelung → FU passt Ventilatordrehzahl an
```

### VAV-Box Aufbau

```
Zuluftkanal → [Messblende] → [Regelklappe] → Raum
                  ↑               ↑
            Differenzdruck    Stellantrieb
            (Volumenstrom)        ↑
                           DDC-Regler
                           (Soll: CO₂, T, Präsenz)
```

**Messung:** Differenzdruck an Messblende → Berechnung Volumenstrom (Bernoulli)
**Regelung:** Klappe öffnet/schliesst → passt Volumenstrom an Sollwert an

### Bedarfsführung (Demand Controlled Ventilation, DCV)

Der VAV-Regler kann verschiedene Führungsgrößen nutzen:

| Führungsgrösse  | Sensor     | Typischer Einsatz                        |
|-----------------|------------|------------------------------------------|
| **CO₂**         | NDIR-Sensor | Büro, Schulzimmer, Konferenzraum       |
| **Präsenz**     | PIR / Radar | Besprechungsräume, Toiletten           |
| **Belegungsplan** | GLT-Daten | Hotel, vorprogrammierte Belegung       |
| **Temperatur**  | PT1000      | Wenn Kühlung via Lüftung (Mischluft)   |
| **VOC**         | VOC-Sensor  | Küchen, Sanitärräume, Labore           |

### Minimaler Volumenstrom

**Wichtig:** VAV-Boxen regeln nicht auf 0 — es gibt einen konfigurierten Mindestvolumenstrom:
- Hygieneluftmenge (Frischluft, CO₂-Abfuhr)
- Thermischer Mindestbedarf (Heizen/Kühlen)
- Überdruck-/Unterdruckhaltung

Typisch: **Minimum 30–40 % des Maximalvolumenstroms**.

---

## Druckregelung im VAV-System

### Das Problem

Wenn VAV-Boxen schliessen → Druck im Kanal steigt → Gefahr:
- Luftgeräusche (Strömungsrauschen)
- Ventilator läuft ineffizient
- VAV-Boxen können ihren Sollwert nicht mehr halten

### Lösung: Statische Druckregelung

```
Drucksensor im Hauptkanal (ca. 2/3 der Kanallänge)
    ↓
PID-Regler in GLT oder FU
    ↓
Frequenzumrichter → Ventilatordrehzahl anpassen
    ↓ Ziel: Statischer Druck = Sollwert (z.B. 100 Pa)
```

**Sollwert-Optimierung:** Statt fixem Sollwert (z.B. 100 Pa) kann der Druck dynamisch auf den **niedrigsten Wert** gesenkt werden bei dem alle VAV-Boxen ihren Sollvolumenstrom noch erreichen (→ spart nochmals 20–30 % Energie).

### Bypass-Klappe (einfache Variante)

Bei einfachen Anlagen ohne Frequenzumrichter:

```
Ventilator (konstant) → Hauptkanal → VAV-Boxen
                            ↓
                       Bypass-Klappe
                            ↓
                        Abluft / Raumluft
```

Bypass öffnet wenn Druck steigt → überschüssige Luft wird kurzgeschlossen. Energetisch ungünstig (Energie der Luft wird verschwendet).

---

## Energievergleich CAV vs. VAV

Das Ventilatorsystem folgt der **Ähnlichkeitsgesetze**:
- Volumenstrom ~ Drehzahl
- Druck ~ Drehzahl²
- **Leistung ~ Drehzahl³**

Bei 50 % Volumenstrom: Leistung = 0,5³ = **12,5 %** der Nennleistung!

| Betriebspunkt     | CAV Leistung | VAV Leistung | Ersparnis |
|-------------------|--------------|--------------|-----------|
| 100 % Volumenstrom | 100 %       | 100 %        | —         |
| 75 %              | 100 %        | ~42 %        | ~58 %     |
| 50 %              | 100 %        | ~12 %        | ~88 %     |
| Jahresdurchschnitt | —           | Typisch 40–60 % weniger | —   |

> **Faustregel:** In Bürogebäuden läuft eine CAV-Anlage 80 % der Zeit auf mehr als dem doppelten Energiebedarf einer VAV-Anlage. Die Mehrkosten amortisieren sich in 3–7 Jahren.

---

## VAV-System in der GA

### Typische Datenpunkte pro VAV-Box

| Datenpunkt               | Typ | Einheit | Beschreibung               |
|--------------------------|-----|---------|----------------------------|
| Volumenstrom-Ist         | AI  | m³/h    | Aus Differenzdruck berechnet |
| Volumenstrom-Soll        | AO  | m³/h    | Von DDC vorgegeben         |
| Klappenstellung          | AI  | %       | Rückmeldung                |
| Raumtemperatur           | AI  | °C      | Führungsgrösse Heizung/Kühlung |
| CO₂                      | AI  | ppm     | Führungsgrösse Lüftungsbedarf |
| Präsenz                  | DI  | —       | Besetzt / Leer             |
| Heiz-/Kühlregister       | AO  | %       | Nachheizung/Nachkühlung    |
| Betriebsart              | AV  | —       | Komfort / Nacht / Abwesend |

### Übergeordnete GLT-Punkte

| Datenpunkt               | Beschreibung                               |
|--------------------------|--------------------------------------------|
| Gesamtvolumenstrom       | Summe aller aktiven VAV-Boxen              |
| Statischer Kanal-Druck   | Ist und Soll für FU-Regelung               |
| FU-Drehzahl              | Ventilator-Istwert                         |
| Betriebsprogramm         | Zeitschaltuhr für Komfort/Nacht/Abwesend   |

---

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **EN 15232** — GA-Effizienzklassen (VAV = Klasse A/B, CAV = Klasse C/D)
- **SIA 382.1** — Lüftungs- und Klimaanlagen — Allgemeine Grundlagen
- **EN 13779** — Lüftung von Nichtwohngebäuden (Bemessungsvolumenströme)

<!-- EN -->

# VAV vs. CAV — Variable and Constant Air Volume

Whether a ventilation system operates at constant or variable air volume fundamentally determines energy consumption, comfort and controllability. The difference lies at the core of the ventilation architecture.

## CAV — Constant Air Volume

### Principle

The fan runs at constant speed. Air volume flow remains the same at all times — regardless of occupancy, outdoor temperature or usage profile.

```
AHU (fixed speed)
    ↓ Constant volume flow
Room 1 (fully occupied)   — receives 100 % air
Room 2 (empty)            — also receives 100 % air
```

### Control with CAV

Since volume flow is fixed, only **temperature** can be controlled:
- Heating coil on/off or modulating
- Cooling coil modulating
- Mixing damper: blend indoor/outdoor air

**No demand-based control possible** — empty rooms are ventilated at full rate.

### When Is CAV Appropriate?

| Application | Reason |
|-------------|--------|
| Simple residential ventilation | Uniform occupancy |
| Production rooms with constant demand | Process air, no variability |
| Small systems (< 2,000 m³/h) | VAV technology too expensive |
| Cleanrooms | Constant pressure and air changes mandatory |

---

## VAV — Variable Air Volume

### Principle

Volume flow is controlled **on demand**. Each zone has a **VAV controller** (volume flow regulator + damper) that adjusts airflow to the current need.

```
AHU (variable speed)
    ↓ Variable total volume flow
VAV box zone 1 (occupied) → 80 % target flow
VAV box zone 2 (empty)    → 30 % minimum flow
VAV box zone 3 (meeting)  → 100 % target flow
    ↓
Overarching pressure control → VFD adjusts fan speed
```

### VAV Box Construction

```
Supply duct → [Measurement orifice] → [Control damper] → Room
                     ↑                       ↑
              Differential pressure      Actuator
              (volume flow)                  ↑
                                       DDC controller
                                       (setpoint: CO₂, T, presence)
```

**Measurement:** Differential pressure across orifice → volume flow calculation (Bernoulli)  
**Control:** Damper opens/closes → adjusts flow to setpoint

### Demand Controlled Ventilation (DCV)

The VAV controller can use different control variables:

| Control variable | Sensor | Typical application |
|-----------------|--------|---------------------|
| **CO₂** | NDIR sensor | Office, classroom, conference room |
| **Presence** | PIR / radar | Meeting rooms, toilets |
| **Occupancy schedule** | BMS data | Hotel, pre-programmed occupancy |
| **Temperature** | PT1000 | When cooling via ventilation (mixed air) |
| **VOC** | VOC sensor | Kitchens, sanitary rooms, laboratories |

### Minimum Volume Flow

**Important:** VAV boxes do not control down to zero — there is a configured minimum:
- Hygienic fresh air (CO₂ removal)
- Minimum thermal requirement (heating/cooling)
- Positive/negative pressure maintenance

Typical: **minimum 30–40 % of maximum volume flow**.

---

## Pressure Control in VAV Systems

### The Problem

When VAV boxes close → duct pressure rises → risks:
- Air noise (flow turbulence)
- Fan operating inefficiently
- VAV boxes unable to maintain their setpoint

### Solution: Static Pressure Control

```
Pressure sensor in main duct (approx. 2/3 of duct length)
    ↓
PID controller in BMS or VFD
    ↓
Variable frequency drive → adjust fan speed
    ↓ Target: static pressure = setpoint (e.g. 100 Pa)
```

**Setpoint optimisation:** Instead of a fixed setpoint (e.g. 100 Pa), pressure can be lowered dynamically to the **lowest value** at which all VAV boxes still achieve their target flow (→ saves a further 20–30 % energy).

### Bypass Damper (Simple Alternative)

For simple systems without a variable frequency drive:

```
Fan (constant) → Main duct → VAV boxes
                      ↓
                 Bypass damper
                      ↓
                 Exhaust / room air
```

Bypass opens when pressure rises → excess air short-circuited. Energetically inefficient (air energy is wasted).

---

## Energy Comparison CAV vs. VAV

Fan systems follow the **affinity laws**:
- Volume flow ~ speed
- Pressure ~ speed²
- **Power ~ speed³**

At 50 % volume flow: power = 0.5³ = **12.5 %** of rated power!

| Operating point | CAV power | VAV power | Saving |
|----------------|-----------|-----------|--------|
| 100 % volume flow | 100 % | 100 % | — |
| 75 % | 100 % | ~42 % | ~58 % |
| 50 % | 100 % | ~12 % | ~88 % |
| Annual average | — | Typically 40–60 % less | — |

> **Rule of thumb:** In office buildings, a CAV system runs 80 % of the time at more than double the energy demand of a VAV system. The additional investment pays back in 3–7 years.

---

## VAV System in the BMS

### Typical Data Points per VAV Box

| Data Point | Type | Unit | Description |
|------------|------|------|-------------|
| Volume flow actual | AI | m³/h | Calculated from differential pressure |
| Volume flow setpoint | AO | m³/h | Set by DDC |
| Damper position | AI | % | Feedback |
| Room temperature | AI | °C | Control variable for heating/cooling |
| CO₂ | AI | ppm | Control variable for ventilation demand |
| Presence | DI | — | Occupied / empty |
| Heating/cooling coil | AO | % | Reheat/recool |
| Operating mode | AV | — | Comfort / Night / Absent |

### Overarching BMS Points

| Data Point | Description |
|------------|-------------|
| Total volume flow | Sum of all active VAV boxes |
| Static duct pressure | Actual and setpoint for VFD control |
| VFD speed | Fan actual value |
| Operating program | Time schedule for comfort/night/absent |

## Standards

- **EN 16798-3** — Energy performance of buildings, ventilation for non-residential buildings
- **EN 15232** — BA efficiency classes (VAV = Class A/B, CAV = Class C/D)
- **SIA 382.1** — Ventilation and air-conditioning systems — General principles
- **EN 13779** — Ventilation for non-residential buildings (design volume flows)
