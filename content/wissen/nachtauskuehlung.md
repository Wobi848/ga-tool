---
title: Nachtauskühlung — Freie Kühlung thermisch
title_en: Night Cooling — Free Thermal Cooling
slug: nachtauskuehlung
category: lueftung
subcategory: kühlung
tags:
  [
    nachtauskühlung,
    freie-kühlung,
    nachtlüftung,
    speichermasse,
    kühlbedarf,
    aussentemperatur,
    enthalpie,
    sommer,
    klimatisierung,
    energieeffizienz,
    kühlenergie,
    fensterlüftung,
    rlt,
    bypass
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vav-cav, thermische-behaglichkeit, kaelteanlagen, beschattungssteuerung]
norm: [ISO 52120-1, SIA 382/1]
updated: 2026-05-14
lang: de
---

# Nachtauskühlung — Freie Kühlung thermisch

Die **Nachtauskühlung** (oder Nachtlüftung) nutzt kühle Nachluft um thermische Masse von Gebäuden vorzukühlen. An heissen Tagen kann so der Kühlenergibedarf erheblich reduziert oder ganz vermieden werden — kostenlos.

## Grundprinzip

An einem Sommertag steigt die Aussentemperatur bis zum Nachmittag auf über 30 °C und fällt nachts auf 15 bis 20 °C. In diesen Stunden führt die Lüftung kühle Aussenluft durch das Gebäude. Decken, Böden und Wände kühlen ab und nehmen am nächsten Tag Wärme auf. Die Räume bleiben in einem massiven Gebäude dadurch um etwa **2 bis 4 K** kühler.

---

## Regelungs-Algorithmus

### Einfache Logik (Temperaturbasis)

Nachtauskühlung freigeben, wenn **alle** Bedingungen erfüllt sind:

- Aussentemperatur mindestens 2 bis 3 K unter der Raumtemperatur
- Raumtemperatur am Abend über einer Schwelle, z.B. 23 °C (es gibt Wärme abzuführen)
- Zeitfenster, z.B. 22 bis 7 Uhr
- Bei Fensterlüftung: kein Regen, Wind unter einer Grenze

Beenden, wenn die **Raumtemperatur eine Untergrenze** erreicht, z.B. 20 bis 21 °C. Sonst muss am Morgen geheizt werden, und die Ersparnis ist weg.

### Enthalpiebasis (besser, aber aufwendiger)

Temperatur allein genügt nicht wenn Aussenluft feuchter als Raumluft:

Freigabe nur, wenn die Enthalpie der Aussenluft deutlich unter der Raumluft liegt, z.B. um mindestens 3 kJ/kg.

Sensoren: Kombisensor Aussenluft (T + rF) und Raumluft-Referenz (T + rF) → Enthalpieberechnung im DDC.

---

## Energieeinsparung

Nachtauskühlung kann in Mitteleuropa bis zu **30 % des Kühlenergieverbrauchs** ersetzen:

| Gebäudetyp               | Potenzial             | Bedingung                            |
| ------------------------ | --------------------- | ------------------------------------ |
| Massivbau (Beton, Stein) | Hoch (2–4 K)          | Hohe thermische Masse, offene Decken |
| Leichtbau (Stahl, Holz)  | Niedrig (unter 1–2 K) | Wenig Speichermasse                  |
| Bürogebäude              | Mittel–Hoch           | Interne Lasten, Fensterflächen       |
| Hotel                    | Mittel                | Belegungsvarianz                     |

---

## Integration in GLT

| Datenpunkt                     | Typ   | Zweck                  |
| ------------------------------ | ----- | ---------------------- |
| Aussentemperatur, -feuchte     | AI    | Freigabe, Enthalpie    |
| Raumtemperatur Referenz        | AI    | Freigabe, Abbruch      |
| Raumfeuchte                    | AI    | Enthalpie              |
| Wind, Regen                    | AI/DI | nur bei Fensterlüftung |
| Ventilatordrehzahl             | AO    | erhöht                 |
| Aussenluftklappe, Umluftklappe | AO    | 100 % / 0 %            |
| Nachtauskühlung aktiv          | BV    | Anzeige, Auswertung    |

---

## Grenzen und Probleme

| Problem                                     | Massnahme                              |
| ------------------------------------------- | -------------------------------------- |
| Zu feuchte Aussenluft                       | Enthalpie-Logik statt reine Temperatur |
| Sicherheitsbedenken (offene Klappen nachts) | Einbruchschutz, Windwächter            |
| Schallimmissionen                           | Volumenstrom begrenzen, Schalldämpfer  |
| Pollen-Allergie-Problematik                 | In Kliniken / Spitälern einschränken   |
| Nachtfrost (Frühling/Herbst)                | Frostschutz-Logik überschreibt         |

## Normen

- **ISO 52120-1** (früher ISO 52120-1) — GA-Funktionen, darunter die Nachtauskühlung
- **SIA 382/1** — Lüftungs- und Klimaanlagen (freie Kühlung als Energiestrategie)
- **EN 16798-3** — Lüftung von Nichtwohngebäuden

<!-- EN -->

**Night cooling** (or night ventilation) uses cool night air to pre-cool the thermal mass of buildings. On hot days this can significantly reduce or entirely eliminate the need for mechanical cooling — at zero energy cost.

## Basic Principle

On a summer day the outdoor temperature rises above 30 °C by the afternoon and falls to 15 to 20 °C at night. During these hours the ventilation drives cool outdoor air through the building. Ceilings, floors and walls cool down and absorb heat the next day. In a heavyweight building the rooms stay about **2 to 4 K** cooler.

---

## Control Algorithm

### Simple Logic (Temperature-Based)

Enable night cooling when **all** conditions are met:

- outdoor temperature at least 2 to 3 K below room temperature
- room temperature in the evening above a threshold, e.g. 23 °C (there is heat to remove)
- time window, e.g. 22:00 to 07:00
- with window ventilation: no rain, wind below a limit

Stop when the **room temperature reaches a lower limit**, e.g. 20 to 21 °C. Otherwise heating is needed in the morning and the saving is gone.

### Enthalpy-Based (Better, but More Complex)

Temperature alone is insufficient when outdoor air is more humid than room air:

Enable only if the outdoor air enthalpy is clearly below the room air, e.g. by at least 3 kJ/kg.

Sensors: combination sensor outdoor (T + RH) and room reference (T + RH) → enthalpy calculated in DDC.

---

## Energy Savings

Night cooling can replace up to **30% of cooling energy consumption** in Central Europe:

| Building type                            | Potential         | Condition                           |
| ---------------------------------------- | ----------------- | ----------------------------------- |
| Solid construction (concrete, stone)     | High (2–4 K)      | High thermal mass, exposed ceilings |
| Lightweight construction (steel, timber) | Low (under 1–2 K) | Little storage mass                 |
| Office building                          | Medium–High       | Internal gains, glazing             |
| Hotel                                    | Medium            | Variable occupancy                  |

---

## BMS Integration

| Data point                        | Type  | Purpose                      |
| --------------------------------- | ----- | ---------------------------- |
| Outdoor temperature, humidity     | AI    | enable, enthalpy             |
| Reference room temperature        | AI    | enable, stop                 |
| Room humidity                     | AI    | enthalpy                     |
| Wind, rain                        | AI/DI | only with window ventilation |
| Fan speed                         | AO    | raised                       |
| Outdoor air, recirculation damper | AO    | 100 % / 0 %                  |
| Night cooling active              | BV    | display, evaluation          |

---

## Limitations and Issues

| Problem                                   | Measure                                    |
| ----------------------------------------- | ------------------------------------------ |
| Outdoor air too humid                     | Enthalpy logic instead of pure temperature |
| Security concerns (open dampers at night) | Burglar protection, wind monitor           |
| Noise intrusion                           | Limit airflow, fit silencers               |
| Pollen allergy issues                     | Restrict use in clinics / hospitals        |
| Night frost (spring/autumn)               | Frost protection logic overrides           |

## Standards

- **ISO 52120-1** (formerly ISO 52120-1) — BA functions, including night cooling
- **SIA 382/1** — Ventilation and air conditioning systems (free cooling as energy strategy)
- **EN 16798-3** — Ventilation for non-residential buildings
