---
title: Nachtauskühlung — Freie Kühlung thermisch
title_en: Night Cooling — Free Thermal Cooling
slug: nachtauskuehlung
category: lueftung
subcategory: kühlung
tags: [nachtauskühlung, freie-kühlung, nachtlüftung, speichermasse, kühlbedarf, aussentemperatur, enthalpie, sommer, klimatisierung, energieeffizienz, kühlenergie, fensterlüftung, rlt, bypass]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vav-cav, thermische-behaglichkeit, kaelteanlagen, beschattungssteuerung]
norm: [EN 15232, SIA 382.1]
updated: 2026-05-14
lang: de
---

# Nachtauskühlung — Freie Kühlung thermisch

Die **Nachtauskühlung** (oder Nachtlüftung) nutzt kühle Nachluft um thermische Masse von Gebäuden vorzukühlen. An heissen Tagen kann so der Kühlenergibedarf erheblich reduziert oder ganz vermieden werden — kostenlos.

## Grundprinzip

```
Tagestemperaturverlauf Sommer:
  08:00: 20 °C (morgens)
  14:00: 33 °C (Nachmittag, Spitze)
  22:00: 22 °C (Abend)
  03:00: 17 °C (Nacht, optimal)
  
Strategie:
  Nachts: Aussenluft 17–21 °C → durch Gebäude leiten
  → Decken, Böden, Wände kühlen sich auf 19–21 °C ab
  Tagsüber: Thermische Masse "absorbiert" Wärme
  → Raumtemperatur bleibt 2–4 K kühler als ohne Nachtauskühlung
```

**Grundbedingung:** Aussenluft muss kühler sein als der Raumluft-Sollwert. Typisch: Aktivierung wenn T_Aussen < T_Raum − 2 K.

---

## Regelungs-Algorithmus

### Einfache Logik (Temperaturbasis)

```
Wenn:
  T_Aussen < T_Raum − 2 K
  UND T_Raum > Kühl-Soll (z.B. T > 23 °C)
  UND Uhrzeit zwischen 22:00 und 07:00
  UND Windgeschwindigkeit < 8 m/s (Sicherheit)
DANN:
  → Lüftungsanlage auf 100 % Aussenluft
  → Volumenstrom erhöhen (bis 150 % Nennvolumen wenn möglich)
```

### Enthalpiebasis (besser, aber aufwendiger)

Temperatur allein genügt nicht wenn Aussenluft feuchter als Raumluft:

```
Wenn:
  h_Aussen < h_Raum − 3 kJ/kg   (Enthalpie-Vergleich)
DANN:
  → Nachtauskühlung aktivieren
```

Sensoren: Kombisensor Aussenluft (T + rF) und Raumluft-Referenz (T + rF) → Enthalpieberechnung im DDC.

---

## Energieeinsparung

Nachtauskühlung kann in Mitteleuropa bis zu **30 % des Kühlenergieverbrauchs** ersetzen:

| Gebäudetyp              | Potenzial           | Bedingung                      |
|-------------------------|---------------------|-------------------------------|
| Massivbau (Beton, Stein) | Hoch (5–7 K)       | Hohe thermische Masse           |
| Leichtbau (Stahl, Holz)  | Niedrig (1–2 K)    | Wenig Speichermasse            |
| Bürogebäude              | Mittel–Hoch         | Interne Lasten, Fensterflächen |
| Hotel                    | Mittel              | Belegungsvarianz               |

---

## Integration in GLT

```
DDC Nachtauskühlung:
  AI: T_Aussenluft (PT1000)
  AI: T_Raum_Referenz (PT1000)
  AI: rF_Aussenluft (Kombi)
  AI: rF_Raum (Kombi)
  AI: Windgeschwindigkeit
  
  AO: Lüftungs-FU Drehzahl (erhöht auf 100 %)
  AO: Klappe Aussenluft (100 %)
  AO: Umluft-Klappe (0 %)
  
  Berechnung:
    h_Aussen = f(T_Aussen, rF_Aussen)
    h_Raum   = f(T_Raum, rF_Raum)
    DeltaH   = h_Raum - h_Aussen
    
  Freigabe wenn DeltaH > 3 kJ/kg AND 22:00–07:00
```

---

## Grenzen und Probleme

| Problem                        | Massnahme                          |
|--------------------------------|------------------------------------|
| Zu feuchte Aussenluft          | Enthalpie-Logik statt reine Temperatur |
| Sicherheitsbedenken (offene Klappen nachts) | Einbruchschutz, Windwächter |
| Schallimmissionen              | Volumenstrom begrenzen, Schalldämpfer |
| Pollen-Allergie-Problematik    | In Kliniken / Spitälern einschränken |
| Nachtfrost (Frühling/Herbst)  | Frostschutz-Logik überschreibt       |

## Normen

- **EN 15232** — Nachtauskühlung als GA-Klasse-A Funktion
- **SIA 382.1** — Lüftungs- und Klimaanlagen (freie Kühlung als Energiestrategie)
- **EN 13779** — Lüftung Nichtwohngebäude (Luftqualität + Kühlstrategien)

<!-- EN -->

**Night cooling** (or night ventilation) uses cool night air to pre-cool the thermal mass of buildings. On hot days this can significantly reduce or entirely eliminate the need for mechanical cooling — at zero energy cost.

## Basic Principle

```
Summer daily temperature profile:
  08:00: 20 °C (morning)
  14:00: 33 °C (afternoon peak)
  22:00: 22 °C (evening)
  03:00: 17 °C (night, optimal)

Strategy:
  Night: outdoor air 17–21 °C → circulated through building
  → Ceilings, floors, walls cool down to 19–21 °C
  Daytime: thermal mass "absorbs" heat gains
  → Room temperature stays 2–4 K cooler than without night cooling
```

**Basic condition:** Outdoor air must be cooler than the room air setpoint. Typical: activate when T_outdoor < T_room − 2 K.

---

## Control Algorithm

### Simple Logic (Temperature-Based)

```
If:
  T_outdoor < T_room − 2 K
  AND T_room > cooling setpoint (e.g. T > 23 °C)
  AND time between 22:00 and 07:00
  AND wind speed < 8 m/s (safety)
Then:
  → AHU to 100% outdoor air
  → Increase airflow (up to 150% nominal if possible)
```

### Enthalpy-Based (Better, but More Complex)

Temperature alone is insufficient when outdoor air is more humid than room air:

```
If:
  h_outdoor < h_room − 3 kJ/kg   (enthalpy comparison)
Then:
  → Activate night cooling
```

Sensors: combination sensor outdoor (T + RH) and room reference (T + RH) → enthalpy calculated in DDC.

---

## Energy Savings

Night cooling can replace up to **30% of cooling energy consumption** in Central Europe:

| Building type | Potential | Condition |
|---------------|-----------|-----------|
| Solid construction (concrete, stone) | High (5–7 K) | High thermal mass |
| Lightweight construction (steel, timber) | Low (1–2 K) | Little thermal storage |
| Office building | Medium–High | Internal gains, glazing |
| Hotel | Medium | Variable occupancy |

---

## BMS Integration

```
DDC Night Cooling:
  AI: T_outdoor (PT1000)
  AI: T_room_reference (PT1000)
  AI: RH_outdoor (combination)
  AI: RH_room (combination)
  AI: Wind speed

  AO: AHU fan VFD speed (raised to 100%)
  AO: Outdoor air damper (100%)
  AO: Recirculation damper (0%)

  Calculation:
    h_outdoor = f(T_outdoor, RH_outdoor)
    h_room    = f(T_room, RH_room)
    DeltaH    = h_room - h_outdoor

  Enable when DeltaH > 3 kJ/kg AND 22:00–07:00
```

---

## Limitations and Issues

| Problem | Measure |
|---------|---------|
| Outdoor air too humid | Enthalpy logic instead of pure temperature |
| Security concerns (open dampers at night) | Burglar protection, wind monitor |
| Noise intrusion | Limit airflow, fit silencers |
| Pollen allergy issues | Restrict use in clinics / hospitals |
| Night frost (spring/autumn) | Frost protection logic overrides |

## Standards

- **EN 15232** — Night cooling as BA class A function
- **SIA 382.1** — Ventilation and air conditioning systems (free cooling as energy strategy)
- **EN 13779** — Ventilation of non-residential buildings (air quality + cooling strategies)
