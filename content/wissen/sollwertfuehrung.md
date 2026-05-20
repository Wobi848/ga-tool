---
title: Sollwertführung und gleitender Sollwert
title_en: Setpoint Scheduling and Sliding Setpoint
slug: sollwertfuehrung
category: regelung
subcategory: regelstrategien
tags: [sollwertführung, gleitender-sollwert, witterungsgeführt, tagesprogramm, nachtabsenkung, optimaler-start, optimales-aufheizen, festwert, kennlinienführung, aussentemperatur-führung, sparschaltung, komfortschaltung]
difficulty: grundlagen
area: [ga, hlk]
related: [pid-regler, heizkurve, kaskadenregelung, vorsteuerung-aufschaltung, regelkreise]
rechner: [heizkurve]
norm: [EN 15232, VDI 3814, SIA 386.110]
updated: 2026-05-15
lang: de
---

# Sollwertführung und gleitender Sollwert

Bei einfachen Regelkreisen ist der Sollwert eine feste Grösse (z.B. Raumtemperatur 21°C). In der GA wird der Sollwert häufig **dynamisch geführt**: er ändert sich abhängig von der Aussentemperatur, der Tageszeit, der Belegung oder anderen Einflüssen. Diese Strategie heisst **Sollwertführung**.

---

## Arten der Sollwertführung

### 1. Festwertregelung
Der Sollwert ist fix vorgegeben und ändert sich nicht:
```
w = konstant (z.B. TV_soll = 60°C)
```
Einfachste Form, unflexibel. Wird in GA nur noch für unkritische Hilfsstrecken verwendet.

### 2. Witterungsgeführte Regelung (Gleitender Sollwert)
Der Sollwert wird **in Abhängigkeit der Aussentemperatur** kontinuierlich angepasst:
```
TV_soll = f(TA)   [Heizkurve]
```
Je kälter es aussen ist, desto höher der Vorlauftemperatur-Sollwert. → **Heizkurven-Rechner**

**Vorteile gegenüber Festwert:**
- Geringere Vorlauftemperaturen bei mildem Wetter → besserer Wärmepumpen-COP
- Gleichmässigere Raumtemperatur, weniger Überhitzung

### 3. Zeitprogramm (Absenkung, Schaltzeiten)
Der Sollwert wechselt nach Uhrzeit / Wochentag:
```
Mo–Fr 06:00–22:00 → Komfort: 21°C
Mo–Fr 22:00–06:00 → Nachtabsenkung: 16°C
Sa–So ganztags    → 19°C
```

### 4. Kombiniert: Witterung + Zeit
Häufigste GA-Praxis: Heizkurve als Grundlage, Nachtabsenkung als additiver Eingriff:
```
TV_soll(t) = Heizkurve(TA) + Δ_Zeitprogramm(t)

Nacht: Δ = −8 K auf Vorlauf → entspricht ca. −2 K Raumtemperatur
```

---

## Nachtabsenkung vs. Nachtabschaltung

| Strategie | Beschreibung | Wann sinnvoll |
|-----------|-------------|--------------|
| Nachtabsenkung | Sollwert reduziert, Heizung läuft mit reduzierter Leistung | Gut gedämmte Gebäude, schnelle Strecken |
| Nachtabschaltung | Heizung komplett aus | Schlecht gedämmte Gebäude mit langer Aufheizzeit |
| Frostschutz | Mindestregelung bei 8°C | Leerstand, Ferien |

**Faustregel:** Bei Gebäuden mit einer Aufheizzeit > 2–3 Stunden lohnt Nachtabschaltung nicht, weil morgens mehr Energie für das schnelle Aufheizen verbraucht wird als durch die Nacht gespart wurde.

---

## Optimaler Aufheizbeginn (Optimum Start)

Die DDC berechnet die **frühestmögliche Aufheizzeit**, damit der Raum pünktlich zur Nutzungszeit die Komforttemperatur erreicht:

```
t_Start = t_Nutzungsbeginn − Aufheizzeit

Aufheizzeit = f(ΔT_Raum, Gebäudezeitkonstante, Aussentemperatur)
```

**Adaptiver Algorithmus:** Die DDC lernt über mehrere Tage die tatsächliche Aufheizzeit des Gebäudes und passt t_Start automatisch an. Typische DDC-Parameter: "Aufheizgradient", "Lernfaktor".

---

## Kennlinienführung (allgemein)

Nicht nur Heizung: Viele GA-Regelkreise nutzen Sollwertkennlinien:

| Anwendung | Führungsgrösse | Geführter Sollwert |
|-----------|---------------|-------------------|
| Heizkurve | Aussentemperatur | Vorlauftemperatur |
| Kühlkurve | Aussentemperatur | Kaltwasservorlauf |
| Zuluft-Reset | Raumtemperatur | Zuluft-Sollwert |
| Druckreset Lüftung | VAV-Klappenstellung | Kanaldruck-Sollwert |

### Zuluft-Reset (Lüftung)
Wenn alle Räume gut versorgt sind (alle VAV-Klappen < 80% offen), kann der Kanaldruck gesenkt werden → Ventilatoreinsparung:
```
VAV_max_offen < 80% → Druck_soll um 5 Pa senken
VAV_max_offen > 95% → Druck_soll um 5 Pa erhöhen
```

---

## Sollwertgrenzwerte

Geführte Sollwerte müssen immer durch **Min/Max-Grenzen** begrenzt werden:

| Anwendung | Min | Max |
|-----------|-----|-----|
| Vorlauftemperatur Heizung | 25°C (Frostschutz) | 85°C (Kesselschutz) |
| Vorlauftemperatur Kühlung | 6°C (Vereisungsschutz) | 16°C |
| Raumsollwert | 16°C (Nacht/Frost) | 26°C (Überhitzungsschutz) |
| Zulufttemperatur | 14°C (Kälteschutz) | 28°C |

---

## Normative Anforderungen

- **EN 15232 Klasse A:** Vollständige Zeitprogramme, witterungsgeführte Regelung, optimaler Start/Stopp und selbstlernende Algorithmen
- **EN 15232 Klasse B:** Zeitprogramme + witterungsgeführte Regelung
- **SIA 386.110 §5.3:** Sollwertführung für Heizung und Kühlung gefordert

<!-- EN -->

In simple control loops the setpoint is a fixed value (e.g. room temperature 21 °C). In building automation the setpoint is often **dynamically scheduled**: it changes depending on outdoor temperature, time of day, occupancy, or other influences. This strategy is called **setpoint scheduling**.

---

## Types of Setpoint Scheduling

### 1. Fixed Setpoint
The setpoint is constant and does not change:
```
w = constant (e.g. TV_setpoint = 60 °C)
```
Simplest form, inflexible. Used in BA only for non-critical auxiliary circuits.

### 2. Weather-Compensated Control (Sliding Setpoint)
The setpoint is **continuously adjusted based on outdoor temperature**:
```
TV_setpoint = f(TA)   [heating curve]
```
The colder it is outside, the higher the flow temperature setpoint. → **Heating Curve Calculator**

**Advantages over fixed setpoint:**
- Lower flow temperatures in mild weather → better heat pump COP
- More consistent room temperature, less overheating

### 3. Time Schedule (Setback, Switching Times)
The setpoint changes according to time of day / day of week:
```
Mon–Fri 06:00–22:00 → Comfort: 21 °C
Mon–Fri 22:00–06:00 → Night setback: 16 °C
Sat–Sun all day     → 19 °C
```

### 4. Combined: Weather + Time
Most common BA practice: heating curve as the basis, night setback as an additive offset:
```
TV_setpoint(t) = HeatingCurve(TA) + Δ_TimeSchedule(t)

Night: Δ = −8 K on flow → corresponds to approx. −2 K room temperature
```

---

## Night Setback vs. Night Shutdown

| Strategy | Description | When appropriate |
|----------|-------------|-----------------|
| Night setback | Setpoint reduced, heating runs at lower output | Well-insulated buildings, fast response |
| Night shutdown | Heating completely off | Poorly insulated buildings with long heat-up time |
| Frost protection | Minimum control at 8 °C | Vacant periods, holidays |

**Rule of thumb:** In buildings with a heat-up time > 2–3 hours, night shutdown is counterproductive — morning warm-up consumes more energy than was saved overnight.

---

## Optimum Start

The DDC calculates the **latest possible start time** so the room reaches comfort temperature exactly at the start of occupancy:

```
t_start = t_occupancy_start − heat_up_time

heat_up_time = f(ΔT_room, building_time_constant, outdoor_temperature)
```

**Adaptive algorithm:** The DDC learns the actual heat-up time of the building over several days and adjusts t_start automatically. Typical DDC parameters: "heating gradient", "learning factor".

---

## Characteristic-Based Scheduling (General)

Not only for heating — many BA control loops use setpoint characteristic curves:

| Application | Guide variable | Scheduled setpoint |
|-------------|---------------|-------------------|
| Heating curve | Outdoor temperature | Flow temperature |
| Cooling curve | Outdoor temperature | Chilled water flow |
| Supply air reset | Room temperature | Supply air setpoint |
| Duct pressure reset | VAV damper position | Duct pressure setpoint |

### Supply Air Reset (Ventilation)
When all rooms are well served (all VAV dampers < 80% open), duct pressure can be reduced → fan energy savings:
```
VAV_max_open < 80% → reduce pressure setpoint by 5 Pa
VAV_max_open > 95% → raise pressure setpoint by 5 Pa
```

---

## Setpoint Limits

Scheduled setpoints must always be bounded by **min/max limits**:

| Application | Min | Max |
|-------------|-----|-----|
| Heating flow temperature | 25 °C (frost protection) | 85 °C (boiler protection) |
| Cooling flow temperature | 6 °C (freeze protection) | 16 °C |
| Room setpoint | 16 °C (night/frost) | 26 °C (overheating protection) |
| Supply air temperature | 14 °C (cold protection) | 28 °C |

---

## Normative Requirements

- **EN 15232 Class A:** Full time schedules, weather-compensated control, optimum start/stop and self-learning algorithms
- **EN 15232 Class B:** Time schedules + weather-compensated control
- **SIA 386.110 §5.3:** Setpoint scheduling required for heating and cooling
