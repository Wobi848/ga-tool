---
title: Nachtauskühlung — Freie Kühlung thermisch
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
