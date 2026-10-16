---
title: Wärmerückgewinnung (WRG) in Lüftungsanlagen
title_en: Heat Recovery (HR) in Ventilation Systems
slug: waermerueckgewinnung
category: lueftung
subcategory: energie
tags:
  [
    wrg,
    wärmerückgewinnung,
    rotationstauscher,
    plattentauscher,
    kreislaufverbund,
    wärmerohr,
    wirkungsgrad,
    temperaturänderungsgrad,
    frost,
    bypass,
    gegenstrom,
    gleichstrom,
    kreuzstrom,
    rlt,
    hygiene
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, vdi6022, frequenzumrichter, kaelteanlagen]
norm: [EN 13053, EN 308, SIA 382/1, VDI 3803-5]
updated: 2026-10-16
lang: de
---

# Wärmerückgewinnung (WRG) in Lüftungsanlagen

Die **Wärmerückgewinnung** ist eine der wirkungsvollsten Energiesparmassnahmen in Lüftungsanlagen. Bis zu 85 % der Energie aus der Abluft kann zurückgewonnen werden — damit reduziert sich der Heizenergiebedarf der Lüftung dramatisch.

## Grundprinzip

Die Abluft (z.B. 22 °C) gibt Wärme an die Aussenluft (z.B. −10 °C) ab. Die Aussenluft kommt vorgewärmt als Zuluft heraus, die Abluft geht abgekühlt als Fortluft hinaus.

Die Abluft gibt ihre Wärme an die Aussenluft ab — ohne dass die Luftströme sich vermischen (ausser Rotationstauscher mit minimalem Übertrag).

## Leistungskennzahl: Temperaturänderungsgrad

<p class="formel">η<sub>T</sub> = (T<sub>Zuluft nach WRG</sub> − T<sub>Aussen</sub>) / (T<sub>Abluft</sub> − T<sub>Aussen</sub>)</p>

**Beispiel:** T_Aussen = −5 °C, T_Abluft = 22 °C, T_Zuluft nach WRG = 18 °C

<p class="formel">η<sub>T</sub> = (18 − (−5)) / (22 − (−5)) = 23 / 27 ≈ 85 %</p>

Der Temperaturänderungsgrad gilt für trockene Luft, ohne Kondensation. **EN 13053** bewertet die WRG zusätzlich nach dem Druckverlust, den sie auf beiden Luftseiten verursacht: Daraus ergibt sich eine Energieeffizienz und die Klasse **H1** (mindestens 71 %) bis **H6** (unter 36 %). Ein Tauscher mit hohem Temperaturänderungsgrad, aber grossem Druckverlust landet so in einer schlechteren Klasse.

---

## Typen und Vergleich

### 1. Rotationstauscher (Drehrad)

Ein Speicherrad dreht langsam durch beide Luftströme. In der Abluft nimmt es Wärme auf, in der Aussenluft gibt es sie wieder ab. Ein Sorptionsrotor überträgt dabei auch Feuchte.

**Eigenschaften:**

- Wirkungsgrad: **70–85 %**
- Feuchtewärme möglich (hygroskopisches Adsorbens)
- **Nachteil:** Ein kleiner Teil der Abluft gelangt in die Zuluft (Leckage, Mitrotation). Mit Spülzone und richtigen Druckverhältnissen klein halten, siehe [VDI 6022](/wissen/vdi6022).
- Frostschutz: Drehzahl reduzieren oder Umluft-Bypass

### 2. Platten-Wärmetauscher (Kreuzgegenstrom)

Abluft und Aussenluft strömen durch getrennte Kanäle aus dünnen Platten. Die Wärme geht durch die Plattenwand, die Luftströme berühren sich nicht.

**Eigenschaften:**

- Wirkungsgrad: **55–75 %** (Kreuzstrom), bis 85 % (Gegenstrom)
- **Keine Überströmung** → hygienisch einwandfrei
- Kondensatbildung bei tiefen Temperaturen (→ Kondensatwanne + Ablauf vorsehen)
- **Frostschutz wichtig:** Kondensat gefriert → Vereisung → Leistungsverlust → Bypass aktivieren
- Einfach, wartungsarm, weit verbreitet

### 3. Kreislaufverbund (Wasser-Kreislauf)

Ein Register in der Abluft und eines in der Zuluft sind über einen Wasser-Glykol-Kreislauf mit Pumpe verbunden. Die Luftströme können beliebig weit auseinanderliegen.

**Eigenschaften:**

- Wirkungsgrad: **45–65 %** (geringer wegen 2 Wärmetauschern)
- **Kein Luftkontakt** möglich: ideal wenn Zuluft und Abluft weit getrennt sind
- Einsatz: Trennung von Gebäudeteilen, Renovierungen
- Frostschutz: Frostschutzmittel im Wasser (Glykol-Wasser-Gemisch)
- **Regelung:** Dreiwegventil im Kreislauf, nahe beim Aussenluftregister. Bei variablem Luftvolumenstrom die Pumpe drehzahlregeln, damit der Wärmestrom von Kreislauf und Luft gleich gross bleibt (Wasserwertverhältnis 1). Erst wenn die Pumpe auf Mindestdrehzahl ist, übernimmt ein Ventil die Kleinlast. Das spart viel Pumpenstrom.

### 4. Wärmerohr (Heat Pipe)

- Ein Kältemittel verdampft im Rohr auf der warmen Seite (Abluft) und kondensiert auf der kalten Seite (Aussenluft). Die Wärme wandert ohne Pumpe mit.
- Wirkungsgrad: **50–65 %**
- Keine beweglichen Teile — sehr wartungsarm
- Nur sensible Wärme (keine Feuchteübertragung)

### 5. Umschaltspeicher

Zwei Speicherpakete aus Aluminiumblech werden abwechselnd von Abluft und Aussenluft durchströmt, Klappen schalten in kurzen Abständen um. Das Paket in der Abluft lädt sich auf, das in der Aussenluft gibt ab.

- Temperaturänderungsgrad bis rund **90 %**, auch Feuchte wird übertragen
- **Kein Vereisungsschutz nötig**, weil jedes Paket regelmässig warm durchströmt wird
- Nachteil: Klappen als Verschleissteil, Überströmung beim Umschalten, Druckverhältnisse nicht konstant

### Umluft ist keine WRG

Umluftbeimischung spart zwar Energie, gilt nach VDI 3803 Blatt 5 aber nicht als Wärmerückgewinnung: Es wird verbrauchte Luft wiederverwendet. Darf aus hygienischen Gründen höchstens etwa die Hälfte Umluft sein, lohnt sich die Kombination mit einer WRG.

---

## Vergleich auf einen Blick

| Typ               | Wirkungsgrad | Feuchteübertragung | Überströmung | Einsatz                      |
| ----------------- | ------------ | ------------------ | ------------ | ---------------------------- |
| Rotor             | 70–85 %      | Ja (optional)      | Minimal      | Standardfall, Komfort        |
| Platte Kreuzstrom | 55–75 %      | Nein               | Keine        | Hygiene-sensitiv             |
| Platte Gegenstrom | 75–85 %      | Nein               | Keine        | Hoher Wirkungsgrad gewünscht |
| Kreislaufverbund  | 45–65 %      | Nein               | Keine        | Getrennte Gebäudeteile       |
| Wärmerohr         | 50–65 %      | Nein               | Keine        | Wartungsarme Lösung          |
| Umschaltspeicher  | 60–90 %      | Ja                 | Ja           | Kein Vereisungsschutz nötig  |

---

## Frostschutzstrategien

| Strategie              | Typ              | Beschreibung                                    |
| ---------------------- | ---------------- | ----------------------------------------------- |
| **Bypass-Klappe**      | Alle             | ODA am WRG vorbeiführen → kein Einfrieren       |
| **Vorwärmung ODA**     | Alle             | Elektrischer oder WW-Erhitzer vor WRG           |
| **Rotorverlangsamung** | Rotor            | Weniger Wärmeübertrag → weniger Kondensat       |
| **Abluft-Bypass**      | Platte           | Warme Abluft erwärmt WRG periodisch             |
| **Glykol-Wasser**      | Kreislaufverbund | Tiefere Einfrierpunkt-Temperatur                |
| **Vorlauf begrenzen**  | Kreislaufverbund | Dreiwegventil hält das Abluftregister über 0 °C |

**Wann Frostgefahr besteht:** Kühlt die Abluft im Tauscher unter ihren Taupunkt, entsteht Kondensat, und unter 0 °C gefriert es. Bei Plattentauschern beginnt das je nach Abluftfeuchte schon bei Aussentemperaturen um −3 bis −10 °C. Am gefährdetsten sind Plattentauscher und Kreislaufverbund: Das Glykol schützt nur den Kreislauf, nicht das Abluftregister, an dem das Kondensat gefriert. Rotoren werden erst bei sehr tiefen Aussentemperaturen kritisch. Überwacht wird die **Fortlufttemperatur** (nicht unter etwa +1 bis +2 °C) oder der **Druckverlust** über dem Tauscher.

---

## WRG im Sommerbetrieb

Im Sommer dreht die WRG die Funktion um: Heisse Aussenluft wird durch die kühlere Abluft vorgekühlt:

Beispiel mit η = 75 %: Aussenluft 32 °C, Abluft 25 °C. Die Zuluft kommt mit etwa 27 °C heraus, die Fortluft mit etwa 30 °C.

Wenn die Aussenluft kühler als die Abluft ist (z.B. kühle Nacht, freie Kühlung) → WRG optimal nutzen. Bypass aktivieren wenn ODA kühler als Raumtemperatur → direkte freie Kühlung.

---

## GA-Datenpunkte WRG

| Datenpunkt              | Typ | Beschreibung                                    |
| ----------------------- | --- | ----------------------------------------------- |
| ODA-Temperatur          | AI  | Vor WRG                                         |
| Zuluft nach WRG         | AI  | WRG-Wirkungsgrad berechnen                      |
| ETA-Temperatur          | AI  | Abluft-Eingang WRG                              |
| EHA-Temperatur          | AI  | Fortluft-Ausgang                                |
| WRG-Bypass-Klappe       | AO  | 0–100 %, Frostschutz                            |
| Rotor-Drehzahl          | AO  | 0–10 V (bei Rotor)                              |
| Frostschutz-Alarm       | DI  | Bei Eisbildung                                  |
| Temperaturänderungsgrad | AV  | Berechnet: (T_Zuluft − T_ODA) / (T_ETA − T_ODA) |

## Normen

- **EN 13053** — Lüftung von Gebäuden, Zentrale Lüftungsgeräte
- **EN 308** — Wärmeaustauscher, Prüfverfahren für Leistungsnachweis
- **SIA 382/1** — Lüftungs- und Klimaanlagen
- **VDI 6022** — Hygieneanforderungen
- **Ökodesign-Verordnung (EU) 1253/2014** — Lüftungsgeräte für Nichtwohngebäude: WRG Pflicht, Wirkungsgrad mindestens 73 % (Kreislaufverbund 68 %)

<!-- EN -->

**Heat recovery** is one of the most effective energy-saving measures in ventilation systems. Up to 85 % of the energy from extract air can be recovered — dramatically reducing the heating energy demand for ventilation.

## Basic Principle

The extract air (e.g. 22 °C) gives heat to the outdoor air (e.g. −10 °C). The outdoor air leaves preheated as supply air, the extract leaves cooled as exhaust.

The extract air transfers its heat to the outdoor air — without the two airstreams mixing (except for rotary heat exchangers with minimal carryover).

## Performance Indicator: Temperature Efficiency

<p class="formel">η<sub>T</sub> = (T<sub>supply after HR</sub> − T<sub>outdoor</sub>) / (T<sub>extract</sub> − T<sub>outdoor</sub>)</p>

**Example:** T_outdoor = −5 °C, T_extract = 22 °C, T_supply after HR = 18 °C

<p class="formel">η<sub>T</sub> = (18 − (−5)) / (22 − (−5)) = 23 / 27 ≈ 85 %</p>

The temperature efficiency applies to dry air, without condensation. **EN 13053** additionally rates heat recovery by the pressure drop it causes on both air sides: this gives an energy efficiency and the class **H1** (at least 71 %) to **H6** (below 36 %). An exchanger with high temperature efficiency but a large pressure drop thus ends up in a worse class.

---

## Types and Comparison

### 1. Rotary Heat Exchanger (Thermal Wheel)

A storage wheel rotates slowly through both air streams. In the extract it absorbs heat, in the outdoor air it releases it again. A sorption rotor also transfers moisture.

**Characteristics:**

- Efficiency: **70–85 %**
- Latent heat recovery possible (hygroscopic adsorbent)
- **Disadvantage:** a small part of the extract air reaches the supply (leakage, carry-over). Keep it small with a purge sector and correct pressure conditions, see [VDI 6022](/wissen/vdi6022).
- Frost protection: reduce speed or recirculation bypass

### 2. Plate Heat Exchanger (Cross-Counterflow)

Extract and outdoor air flow through separate channels of thin plates. Heat passes through the plate wall; the air streams do not touch.

**Characteristics:**

- Efficiency: **55–75 %** (cross-flow), up to 85 % (counterflow)
- **No carryover** → hygienically clean
- Condensate forms at low temperatures (→ provide condensate tray + drain)
- **Frost protection important:** condensate freezes → icing → performance loss → activate bypass
- Simple, low-maintenance, widely used

### 3. Run-Around Coil (Water Circuit)

A coil in the extract and one in the supply are linked by a water-glycol loop with a pump. The air streams can be any distance apart.

**Characteristics:**

- Efficiency: **45–65 %** (lower due to two heat exchangers)
- **No air contact** possible: ideal when supply and extract air are physically separated
- Application: separating building sections, retrofits
- Frost protection: antifreeze in water (glycol-water mixture)
- **Control:** three-way valve in the loop, close to the outdoor air coil. With variable airflow, run the pump at variable speed so the heat capacity flow of loop and air stays equal (capacity ratio 1). Only once the pump is at minimum speed does a valve take over the low load. This saves a lot of pump power.

### 4. Heat Pipe

- A refrigerant evaporates in the pipe on the warm side (extract) and condenses on the cold side (outdoor air). The heat travels without a pump.
- Efficiency: **50–65 %**
- No moving parts — very low maintenance
- Sensible heat only (no moisture transfer)

### 5. Switchover Regenerator

Two storage packs of aluminium sheet are passed alternately by extract and outdoor air; dampers switch over at short intervals. The pack in the extract charges, the one in the outdoor air discharges.

- Temperature efficiency up to about **90 %**, moisture is transferred too
- **No frost protection needed**, because each pack is regularly flushed with warm air
- Drawback: dampers as wearing parts, carryover at switchover, pressure conditions not constant

### Recirculation Is Not Heat Recovery

Mixing in recirculated air saves energy but does not count as heat recovery under VDI 3803 Part 5: used air is reused. If hygiene limits recirculation to about half, combining it with heat recovery pays off.

---

## Comparison at a Glance

| Type               | Efficiency | Moisture transfer | Carryover | Application                 |
| ------------------ | ---------- | ----------------- | --------- | --------------------------- |
| Rotary wheel       | 70–85 %    | Yes (optional)    | Minimal   | Standard, comfort           |
| Plate cross-flow   | 55–75 %    | No                | None      | Hygiene-sensitive           |
| Plate counter-flow | 75–85 %    | No                | None      | High efficiency required    |
| Run-around coil    | 45–65 %    | No                | None      | Separated building sections |
| Heat pipe          | 50–65 %    | No                | None      | Low-maintenance solution    |
| Switchover regen.  | 60–90 %    | Yes               | Yes       | No frost protection needed  |

---

## Frost Protection Strategies

| Strategy                  | Type       | Description                                       |
| ------------------------- | ---------- | ------------------------------------------------- |
| **Bypass damper**         | All        | Route ODA around HR → no freezing                 |
| **ODA pre-heating**       | All        | Electric or HW heater before HR                   |
| **Rotor speed reduction** | Rotary     | Less heat transfer → less condensate              |
| **Extract air bypass**    | Plate      | Warm extract air periodically re-heats HR         |
| **Glycol-water**          | Run-around | Lower freezing point temperature                  |
| **Limit supply temp.**    | Run-around | Three-way valve keeps the extract coil above 0 °C |

**When there is a frost risk:** if the extract air cools below its dew point in the exchanger, condensate forms, and below 0 °C it freezes. With plate exchangers this starts, depending on extract humidity, at outdoor temperatures of about −3 to −10 °C. Plate exchangers and run-around coils are most at risk: the glycol protects only the loop, not the extract coil on which the condensate freezes. Rotary wheels only become critical at very low outdoor temperatures. What is monitored is the **exhaust air temperature** (not below about +1 to +2 °C) or the **pressure drop** across the exchanger.

---

## HR in Summer Operation

In summer, the HR reverses its function: hot outdoor air is pre-cooled by the cooler extract air:

Example with η = 75 %: outdoor air 32 °C, extract 25 °C. Supply air leaves at about 27 °C, exhaust at about 30 °C.

When outdoor air is cooler than extract air (e.g. cool night, free cooling) → make optimal use of HR. Activate bypass when ODA is cooler than room temperature → direct free cooling.

---

## BA Data Points — HR

| Data point             | Type | Description                                      |
| ---------------------- | ---- | ------------------------------------------------ |
| ODA temperature        | AI   | Before HR                                        |
| Supply air after HR    | AI   | For calculating HR efficiency                    |
| ETA temperature        | AI   | Extract air inlet to HR                          |
| EHA temperature        | AI   | Exhaust air outlet                               |
| HR bypass damper       | AO   | 0–100 %, frost protection                        |
| Rotor speed            | AO   | 0–10 V (rotary type)                             |
| Frost protection alarm | DI   | On ice formation                                 |
| Temperature efficiency | AV   | Calculated: (T_supply − T_ODA) / (T_ETA − T_ODA) |

## Standards

- **EN 13053** — Ventilation of buildings, central air handling units
- **EN 308** — Heat exchangers, test procedures for performance assessment
- **SIA 382/1** — Ventilation and air conditioning systems
- **VDI 6022** — Hygiene requirements
- **Ecodesign Regulation (EU) 1253/2014** — Non-residential ventilation units: heat recovery mandatory, thermal efficiency at least 73 % (run-around coil 68 %)
