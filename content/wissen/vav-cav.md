---
title: VAV vs. CAV — Variable und konstante Luftmengen
title_en: VAV vs. CAV — Variable and Constant Air Volume
slug: vav-cav
category: lueftung
subcategory: regelung
tags:
  [
    vav,
    cav,
    variable-air-volume,
    constant-air-volume,
    volumenstromregler,
    druck,
    rlt,
    zuluft,
    abluft,
    bypass,
    druckregelung,
    frequenzumrichter,
    luftbedarf,
    co2,
    praesenz
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    rlt-anlage,
    klimasysteme,
    frequenzumrichter,
    pid-regler,
    druckverlust,
    raumluftqualitaet,
    k-faktor-luft
  ]
norm: [EN 16798-3, ISO 52120-1, SIA 382/1]
updated: 2026-05-14
lang: de
---

# VAV vs. CAV — Variable und konstante Luftmengen

Ob eine Lüftungsanlage mit konstantem oder variablem Luftvolumenstrom arbeitet, entscheidet massgeblich über Energieverbrauch, Komfort und Regelbarkeit. Der Unterschied liegt im Kern der Lüftungsarchitektur.

## CAV — Constant Air Volume

### Prinzip

Der Ventilator läuft auf konstanter Drehzahl. Der Luftvolumenstrom bleibt immer gleich — unabhängig von Belegung, Aussentemperatur oder Nutzungsprofil.

Der Ventilator fördert immer gleich viel. Ein voll besetzter und ein leerer Raum bekommen dieselbe Luftmenge.

### Regelung bei CAV

Da der Volumenstrom fix ist, kann nur die **Temperatur** geregelt werden:

- Heizregister Ein/Aus oder stetig
- Kühler stetig
- Mischkasten: Innen-/Aussenluft mischen

**Keine Bedarfsregelung möglich** — auch leere Räume werden voll belüftet.

### Wann CAV sinnvoll?

| Anwendung                              | Begründung                               |
| -------------------------------------- | ---------------------------------------- |
| Einfache Wohnbelüftung                 | Gleichmässige Belegung                   |
| Produktionsräume mit konstantem Bedarf | Prozessluft, keine Bedarfsvariabilität   |
| Kleine Anlagen (< 2000 m³/h)           | VAV-Technik zu teuer                     |
| Reinräume                              | Konstanter Druck und Luftwechsel Pflicht |

---

## VAV — Variable Air Volume

### Prinzip

Der Volumenstrom wird **bedarfsgerecht** geregelt. Jede Zone hat einen **VAV-Regler** (Volumenstromkonstanthalter + Klappe), der den Luftstrom für diesen Raum auf den aktuellen Bedarf einstellt.

Die Zentrale fördert nur so viel, wie die Zonen gerade verlangen. Jede Zone hat einen **Volumenstromregler**, der ihren Sollwert hält, etwa 80 % in einem besetzten Büro, 30 % in einem leeren, 100 % im Sitzungszimmer. Die Ventilatordrehzahl folgt der Summe, über die Druckregelung im Kanal.

### VAV-Box Aufbau

Ein VAV-Regler besteht aus einer **Messeinrichtung** (Messkreuz oder Messblende, liefert einen Wirkdruck), einer **Regelklappe** mit Stellantrieb und einem **Regler**. Der Regler rechnet aus dem Wirkdruck den Volumenstrom, vergleicht ihn mit dem Sollwert und verstellt die Klappe. Den Sollwert bekommt er aus CO₂, Temperatur oder Präsenz.

**Messung:** Differenzdruck an Messblende → Berechnung Volumenstrom (Bernoulli)
**Regelung:** Klappe öffnet/schliesst → passt Volumenstrom an Sollwert an

### Bedarfsführung (Demand Controlled Ventilation, DCV)

Der VAV-Regler kann verschiedene Führungsgrössen nutzen:

| Führungsgrösse    | Sensor      | Typischer Einsatz                    |
| ----------------- | ----------- | ------------------------------------ |
| **CO₂**           | NDIR-Sensor | Büro, Schulzimmer, Konferenzraum     |
| **Präsenz**       | PIR / Radar | Besprechungsräume, Toiletten         |
| **Belegungsplan** | GLT-Daten   | Hotel, vorprogrammierte Belegung     |
| **Temperatur**    | PT1000      | Wenn Kühlung via Lüftung (Mischluft) |
| **VOC**           | VOC-Sensor  | Küchen, Sanitärräume, Labore         |

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

Ein **Drucksensor im Hauptkanal**, meist bei etwa zwei Dritteln der Kanallänge, misst den statischen Druck. Ein PI-Regler (in der DDC oder im Frequenzumrichter) verstellt die Ventilatordrehzahl so, dass der Druck auf seinem Sollwert bleibt, zum Beispiel 100 Pa.

**Sollwert-Optimierung:** Statt fixem Sollwert (z.B. 100 Pa) kann der Druck dynamisch auf den **niedrigsten Wert** gesenkt werden bei dem alle VAV-Boxen ihren Sollvolumenstrom noch erreichen (→ spart nochmals 20–30 % Energie).

### Bypass-Klappe (einfache Variante)

Bei einfachen Anlagen ohne Frequenzumrichter:

Der Ventilator läuft mit fester Drehzahl. Steigt der Kanaldruck, öffnet eine Bypassklappe und lässt die überschüssige Luft zurück.

Bypass öffnet wenn Druck steigt → überschüssige Luft wird kurzgeschlossen. Energetisch ungünstig (Energie der Luft wird verschwendet).

---

## Energievergleich CAV vs. VAV

Das Ventilatorsystem folgt der **Ähnlichkeitsgesetze**:

- Volumenstrom ~ Drehzahl
- Druck ~ Drehzahl²
- **Leistung ~ Drehzahl³**

Bei 50 % Volumenstrom: Leistung = 0,5³ = **12,5 %** der Nennleistung!

| Betriebspunkt      | CAV Leistung | VAV Leistung            | Ersparnis |
| ------------------ | ------------ | ----------------------- | --------- |
| 100 % Volumenstrom | 100 %        | 100 %                   | —         |
| 75 %               | 100 %        | ~42 %                   | ~58 %     |
| 50 %               | 100 %        | ~12 %                   | ~88 %     |
| Jahresdurchschnitt | —            | Typisch 40–60 % weniger | —         |

> **Achtung:** Die Werte gelten für die ideale Kurve durch den Nullpunkt. Mit Druckregelung im Kanal bleibt ein Mindestdruck stehen, die reale Ersparnis ist deshalb kleiner, aber immer noch gross. Wie viel, hängt vom Profil der Anlage ab.

---

## VAV-System in der GA

### Typische Datenpunkte pro VAV-Box

| Datenpunkt         | Typ | Einheit | Beschreibung                   |
| ------------------ | --- | ------- | ------------------------------ |
| Volumenstrom-Ist   | AI  | m³/h    | Aus Differenzdruck berechnet   |
| Volumenstrom-Soll  | AO  | m³/h    | Von DDC vorgegeben             |
| Klappenstellung    | AI  | %       | Rückmeldung                    |
| Raumtemperatur     | AI  | °C      | Führungsgrösse Heizung/Kühlung |
| CO₂                | AI  | ppm     | Führungsgrösse Lüftungsbedarf  |
| Präsenz            | DI  | —       | Besetzt / Leer                 |
| Heiz-/Kühlregister | AO  | %       | Nachheizung/Nachkühlung        |
| Betriebsart        | AV  | —       | Komfort / Nacht / Abwesend     |

### Übergeordnete GLT-Punkte

| Datenpunkt             | Beschreibung                             |
| ---------------------- | ---------------------------------------- |
| Gesamtvolumenstrom     | Summe aller aktiven VAV-Boxen            |
| Statischer Kanal-Druck | Ist und Soll für FU-Regelung             |
| FU-Drehzahl            | Ventilator-Istwert                       |
| Betriebsprogramm       | Zeitschaltuhr für Komfort/Nacht/Abwesend |

---

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **ISO 52120-1** (früher EN 15232) — GA-Effizienzklassen; bedarfsgeführte Lüftung zählt zu den höheren Klassen
- **SIA 382/1** — Lüftungs- und Klimaanlagen, allgemeine Grundlagen und Anforderungen
- **EN 16798-1** — Eingangsparameter für das Innenraumklima, Luftmengen

<!-- EN -->

# VAV vs. CAV — Variable and Constant Air Volume

Whether a ventilation system operates at constant or variable air volume fundamentally determines energy consumption, comfort and controllability. The difference lies at the core of the ventilation architecture.

## CAV — Constant Air Volume

### Principle

The fan runs at constant speed. Air volume flow remains the same at all times — regardless of occupancy, outdoor temperature or usage profile.

The fan always delivers the same amount. A fully occupied and an empty room get the same airflow.

### Control with CAV

Since volume flow is fixed, only **temperature** can be controlled:

- Heating coil on/off or modulating
- Cooling coil modulating
- Mixing damper: blend indoor/outdoor air

**No demand-based control possible** — empty rooms are ventilated at full rate.

### When Is CAV Appropriate?

| Application                           | Reason                                      |
| ------------------------------------- | ------------------------------------------- |
| Simple residential ventilation        | Uniform occupancy                           |
| Production rooms with constant demand | Process air, no variability                 |
| Small systems (< 2,000 m³/h)          | VAV technology too expensive                |
| Cleanrooms                            | Constant pressure and air changes mandatory |

---

## VAV — Variable Air Volume

### Principle

Volume flow is controlled **on demand**. Each zone has a **VAV controller** (volume flow regulator + damper) that adjusts airflow to the current need.

The central unit delivers only as much as the zones currently demand. Each zone has a **flow controller** that holds its setpoint, for example 80 % in an occupied office, 30 % in an empty one, 100 % in the meeting room. The fan speed follows the total via duct pressure control.

### VAV Box Construction

A VAV controller consists of a **measuring device** (measuring cross or orifice, delivering a differential pressure), a **control damper** with actuator and a **controller**. The controller calculates the flow from the differential pressure, compares it with the setpoint and adjusts the damper. It gets the setpoint from CO₂, temperature or presence.

**Measurement:** Differential pressure across orifice → volume flow calculation (Bernoulli)  
**Control:** Damper opens/closes → adjusts flow to setpoint

### Demand Controlled Ventilation (DCV)

The VAV controller can use different control variables:

| Control variable       | Sensor      | Typical application                      |
| ---------------------- | ----------- | ---------------------------------------- |
| **CO₂**                | NDIR sensor | Office, classroom, conference room       |
| **Presence**           | PIR / radar | Meeting rooms, toilets                   |
| **Occupancy schedule** | BMS data    | Hotel, pre-programmed occupancy          |
| **Temperature**        | PT1000      | When cooling via ventilation (mixed air) |
| **VOC**                | VOC sensor  | Kitchens, sanitary rooms, laboratories   |

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

A **pressure sensor in the main duct**, usually at about two thirds of the duct length, measures the static pressure. A PI controller (in the DDC or in the frequency converter) adjusts the fan speed so the pressure stays at its setpoint, for example 100 Pa.

**Setpoint optimisation:** Instead of a fixed setpoint (e.g. 100 Pa), pressure can be lowered dynamically to the **lowest value** at which all VAV boxes still achieve their target flow (→ saves a further 20–30 % energy).

### Bypass Damper (Simple Alternative)

For simple systems without a variable frequency drive:

The fan runs at fixed speed. If the duct pressure rises, a bypass damper opens and returns the surplus air.

Bypass opens when pressure rises → excess air short-circuited. Energetically inefficient (air energy is wasted).

---

## Energy Comparison CAV vs. VAV

Fan systems follow the **affinity laws**:

- Volume flow ~ speed
- Pressure ~ speed²
- **Power ~ speed³**

At 50 % volume flow: power = 0.5³ = **12.5 %** of rated power!

| Operating point   | CAV power | VAV power              | Saving |
| ----------------- | --------- | ---------------------- | ------ |
| 100 % volume flow | 100 %     | 100 %                  | —      |
| 75 %              | 100 %     | ~42 %                  | ~58 %  |
| 50 %              | 100 %     | ~12 %                  | ~88 %  |
| Annual average    | —         | Typically 40–60 % less | —      |

> **Caution:** the values apply to the ideal curve through zero. With duct pressure control a minimum pressure remains, so the real saving is smaller, but still large. How much depends on the system's load profile.

---

## VAV System in the BMS

### Typical Data Points per VAV Box

| Data Point           | Type | Unit | Description                             |
| -------------------- | ---- | ---- | --------------------------------------- |
| Volume flow actual   | AI   | m³/h | Calculated from differential pressure   |
| Volume flow setpoint | AO   | m³/h | Set by DDC                              |
| Damper position      | AI   | %    | Feedback                                |
| Room temperature     | AI   | °C   | Control variable for heating/cooling    |
| CO₂                  | AI   | ppm  | Control variable for ventilation demand |
| Presence             | DI   | —    | Occupied / empty                        |
| Heating/cooling coil | AO   | %    | Reheat/recool                           |
| Operating mode       | AV   | —    | Comfort / Night / Absent                |

### Overarching BMS Points

| Data Point           | Description                            |
| -------------------- | -------------------------------------- |
| Total volume flow    | Sum of all active VAV boxes            |
| Static duct pressure | Actual and setpoint for VFD control    |
| VFD speed            | Fan actual value                       |
| Operating program    | Time schedule for comfort/night/absent |

## Standards

- **EN 16798-3** — Energy performance of buildings, ventilation for non-residential buildings
- **ISO 52120-1** (formerly EN 15232) — BA efficiency classes; demand-controlled ventilation counts towards the higher classes
- **SIA 382/1** — Ventilation and air-conditioning systems — General principles
- **EN 16798-1** — Input parameters for indoor environment, airflow rates
