---
title: RLT-Anlage — Aufbau und Komponenten
title_en: AHU — Construction and Components
slug: rlt-anlage
category: lueftung
subcategory: grundlagen
tags:
  [
    rlt,
    raumlufttechnische-anlage,
    ahu,
    air-handling-unit,
    filter,
    erhitzer,
    kühler,
    befeuchter,
    entfeuchter,
    wärmerückgewinnung,
    ventilator,
    zuluft,
    abluft,
    aussenluft,
    fortluft,
    wrg,
    zulufttemperatur,
    volumenstrom
  ]
difficulty: grundlagen
area: [hlk, ga]
related: [vav-cav, klimasysteme, vdi6022, frequenzumrichter, kaelteanlagen, waermepumpe, pid-regler]
norm: [EN 16798-3, VDI 6022, SIA 382/1, EN 13053]
updated: 2026-05-14
lang: de
---

# RLT-Anlage — Aufbau und Komponenten

Eine **raumlufttechnische Anlage (RLT)** konditioniert Luft für Gebäude: Temperatur, Feuchte, Qualität und Volumenstrom werden geregelt. In der GA ist die RLT-Anlage einer der komplexesten Regelkreise — viele Stellglieder, gegenseitige Abhängigkeiten und sicherheitsrelevante Funktionen.

## Luftstromprinzip

<figure class="schema"><svg class="hyd" viewBox="0 0 430 214" role="img" aria-label="Lüftungsgerät: Aussenluft über Klappe, Filter, Wärmerückgewinnung, Erhitzer, Kühler und Ventilator zur Zuluft; Abluft über Ventilator, Filter, Wärmerückgewinnung zur Fortluft" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="60" y="20" width="320" height="160" rx="4" class="bauteil" stroke-opacity="0.35"/><path d="M60 100H380" class="bauteil" stroke-opacity="0.35"/><path class="rl" d="M14 50H60" stroke-width="3"/><path class="vl" d="M380 50H416" stroke-width="3"/><path class="vl" d="M416 150H380" stroke-width="3"/><path class="rl" d="M60 150H14" stroke-width="3"/><path class="rl fill" d="M31 46L41 50L31 54Z"/><path class="vl fill" d="M395 46L405 50L395 54Z"/><path class="vl fill" d="M405 146L395 150L405 154Z"/><path class="rl fill" d="M41 146L31 150L41 154Z"/><path class="rl" d="M60 50H152" stroke-width="2.4"/><path class="mix" d="M152 50H205" stroke-width="2.4"/><path class="vl" d="M205 50H380" stroke-width="2.4"/><path class="vl" d="M380 150H152" stroke-width="2.4"/><path class="rl" d="M152 150H60" stroke-width="2.4"/><path d="M74 34V66M66 42L82 58" class="bauteil" stroke-width="2"/><path d="M74 134V166M66 142L82 158" class="bauteil" stroke-width="2"/><rect x="92" y="30" width="16" height="40" class="bauteil bg"/><path d="M94 32L106 38L94 44L106 50L94 56L106 62L94 68" class="bauteil" stroke-width="1.2"/><rect x="337" y="130" width="16" height="40" class="bauteil bg"/><path d="M339 132L351 138L339 144L351 150L339 156L351 162L339 168" class="bauteil" stroke-width="1.2"/><rect x="130" y="30" width="44" height="140" class="bauteil bg"/><path d="M130 30L174 170M174 30L130 170" class="bauteil" stroke-width="1.2"/><rect x="195" y="30" width="20" height="40" class="bauteil bg"/><rect x="230" y="30" width="20" height="40" class="bauteil bg"/><circle cx="290" cy="50" r="16" class="bauteil bg"/><path d="M281 37L305 50L281 63" class="bauteil" stroke-width="1.4"/><circle cx="300" cy="150" r="16" class="bauteil bg"/><path d="M309 137L285 150L309 163" class="bauteil" stroke-width="1.4"/><g fill="currentColor" stroke="none"><text x="205" y="55" text-anchor="middle" font-size="15" font-weight="700">+</text><text x="240" y="55" text-anchor="middle" font-size="15" font-weight="700">−</text><text x="14" y="40" text-anchor="start" font-size="10.5" font-weight="600">Aussenluft</text><text x="14" y="72" text-anchor="start" font-size="10">ODA</text><text x="416" y="40" text-anchor="end" font-size="10.5" font-weight="600">Zuluft</text><text x="416" y="72" text-anchor="end" font-size="10">SUP</text><text x="416" y="140" text-anchor="end" font-size="10.5" font-weight="600">Abluft</text><text x="416" y="172" text-anchor="end" font-size="10">ETA</text><text x="14" y="140" text-anchor="start" font-size="10.5" font-weight="600">Fortluft</text><text x="14" y="172" text-anchor="start" font-size="10">EHA</text><text x="74" y="208" text-anchor="middle" font-size="9.5">Klappe</text><text x="100" y="196" text-anchor="middle" font-size="9.5">Filter</text><text x="152" y="208" text-anchor="middle" font-size="9.5">WRG</text><text x="205" y="196" text-anchor="middle" font-size="9.5">Erhitzer</text><text x="240" y="208" text-anchor="middle" font-size="9.5">Kühler</text><text x="290" y="196" text-anchor="middle" font-size="9.5">Ventilator</text></g></svg><figcaption>Zuluft oben von links nach rechts, Abluft unten zurück. Die Wärmerückgewinnung verbindet beide Luftwege.</figcaption></figure>

### Luftbezeichnungen (EN 13779 / EN 16798)

| Kürzel  | Deutsch    | Englisch          | Quelle/Ziel           |
| ------- | ---------- | ----------------- | --------------------- |
| **ODA** | Aussenluft | Outdoor Air       | Kommt von aussen      |
| **SUP** | Zuluft     | Supply Air        | Geht in den Raum      |
| **ETA** | Abluft     | Extract Air       | Kommt aus dem Raum    |
| **EHA** | Fortluft   | Exhaust Air       | Geht nach aussen      |
| **RCA** | Umluft     | Recirculation Air | Interne Rezirkulation |

---

## Komponenten im Detail

### 1. Aussenluft-Klappe (ODA-Klappe)

- Motorisch betätigte Klappe am Aussenlufteinlass
- **Sicherheitsfunktion:** Schliesst wenn Anlage aus → verhindert Einfrieren des Registers
- Fail-safe: ZU (Federrückstellung) — bei Ausfall bleibt Klappe geschlossen
- Rückmeldung: Endschalter (DI) AUF / ZU

### 2. Filter

| Filterklasse nach ISO 16890 | etwa früher (EN 779) | Druckverlust neu | Einsatz                                    |
| --------------------------- | -------------------- | ---------------- | ------------------------------------------ |
| ISO Coarse                  | G3–G4                | 20–50 Pa         | Vorfilter, Grobstaub                       |
| ePM10 50–60 %               | M5                   | 40–80 Pa         | einfache Aussenluftfilter                  |
| ePM2.5 50–65 %              | M6                   | 50–100 Pa        | Aussenluft, Abluft                         |
| ePM1 50–65 %                | F7                   | 60–120 Pa        | Zuluft Komfortanlagen                      |
| ePM1 ≥ 80 %                 | F9                   | 80–150 Pa        | Zuluft hohe Anforderungen, Spital-Vorstufe |

Die Zuordnung zu den alten Klassen ist nur ungefähr, die Prüfverfahren sind verschieden. Die Endwiderstände, bei denen gewechselt wird, gibt der Hersteller an, typisch das Zwei- bis Dreifache des Anfangswerts.

**Filterwächter:** Differenzdrucksensor über dem Filter → Alarm wenn Schmutzgrenze erreicht.

### 3. Wärmerückgewinnungs-Tauscher (WRG)

Nutzt die Wärme der Abluft um Aussenluft vorzuwärmen (Winter) oder vorzukühlen (Sommer).

| Typ                   | Wirkungsgrad                           | Befeuchtung                             | Besonderheit                           |
| --------------------- | -------------------------------------- | --------------------------------------- | -------------------------------------- |
| **Rotationstauscher** | 70–85 %                                | Ja, als Sorptionsrotor                  | Leckage Abluft → Zuluft beachten       |
| **Plattentauscher**   | Kreuzstrom 50–70 %, Gegenstrom 75–90 % | Nein (ausser Membran-Enthalpietauscher) | Luftströme dicht getrennt              |
| **Kreislaufverbund**  | 45–60 %                                | Nein                                    | Erzeuger und Verbraucher weit getrennt |
| **Wärmerohr**         | 55–65 %                                | Nein                                    | Kein bewegliches Teil, wartungsarm     |

**Frostschutz WRG:** Bei tiefen Aussentemperaturen kann der WRG einfrieren → Bypassklappe oder Vorwärmung nötig.

### 4. Vorerhitzer / Nacherhitzer

- **Heizmedium:** Warmwasser (aus Heizkreis) oder elektrisch
- Warmwasser-Register: 2-Wege-Ventil (stetig, 0–10 V)
- **Frostschutz:** Temperaturfühler hinter dem Register → bei < 5 °C sofort: Ventil 100 % AUF, Klappe ZU, Alarm!
- Nacherhitzer: Feinjustierung Zulufttemperatur nach WRG und Kühler

### 5. Kühler

- **Kühlmedium:** Kaltwasser (Kältemaschine) oder Direktverdampfer (Split/Rooftop)
- Kaltwasser-Kühler: 2-Wege-Ventil stetig, 0–10 V
- Kühlregister kann Feuchte kondensieren → Kondensatwanne mit Ablauf
- **Hygieneaspekt:** Kondensatwanne trocken halten (VDI 6022), regelmässig reinigen

### 6. Befeuchter

Typen:

| Typ                              | Hygiene          | Energie | Befeuchtungsgrad | Einsatz          |
| -------------------------------- | ---------------- | ------- | ---------------- | ---------------- |
| **Dampfbefeuchter (elektrisch)** | Sehr gut         | Hoch    | Hoch             | Büro, Spital     |
| **Dampf aus Dampfnetz**          | Gut              | Mittel  | Hoch             | Industrie        |
| **Umlaufverdunstung**            | Problematisch    | Niedrig | Mittel           | Einfache Anlagen |
| **Hochdruck-Wasser**             | Gut (Filtration) | Niedrig | Mittel           | Komfortanlagen   |

> ⚠️ Luftbefeuchter sind Legionellen-Risiko wenn nicht korrekt betrieben! Temperatur und Desinfektion regelmässig prüfen (VDI 6022).

### 7. Ventilator

- **Zuluftventilator** + **Abluftventilator** (getrennte Antriebe)
- Frequenzumrichter für variable Drehzahl (→ VAV)
- **Messung:** Drucksensor vor/nach Ventilator → Druckerhöhung berechnen
- **Volumenstrom:** über die Einlaufdüse des Ventilators (Wirkdruck, siehe [k-Faktor](/wissen/k-faktor-luft)) oder eine separate Messstrecke
- **Betriebsüberwachung:** Laufmeldung (DI), Störmeldung (DI), Motorschutzschalter

---

## Zulufttemperatur: Sequenzregelung

Erhitzer, Wärmerückgewinnung und Kühler werden in **Sequenz** geregelt. Mit einer Kaskade hat das nichts zu tun, die ist die Kombination aus Raum- und Zuluftregler (siehe [Kaskadenregelung](/wissen/kaskadenregelung)).

Ein Zuluftregler (PI) gibt eine Stellgrösse aus, die nacheinander die Stellglieder durchfährt: zuerst die **Wärmerückgewinnung**, dann den **Erhitzer** auf der einen Seite und den **Kühler** auf der anderen. Dazwischen liegt ein **Totband** von etwa ±1 K, in dem weder geheizt noch gekühlt wird.

**Wichtig:** Zum Temperieren nie gleichzeitig heizen und kühlen, die Sequenz verhindert das. Die Ausnahme ist das **Entfeuchten**: Dann kühlt der Kühler die Luft unter ihren Taupunkt, und der Erhitzer heizt sie danach wieder auf.

### Gleitende Zulufttemperatur

Statt fixer Zulufttemperatur: Sollwert abhängig von Aussentemperatur oder Raumtemperatur:

| Aussentemperatur | Zuluft-Sollwert     |
| ---------------- | ------------------- |
| −10 °C           | 22 °C (max. Heizen) |
| 0 °C             | 20 °C               |
| 15 °C            | 18 °C (Neutralzone) |
| 30 °C            | 16 °C (Kühlen)      |

---

## Betriebsarten

| Betriebsart          | Volumenstrom | Temperatur      | Typisch wann                  |
| -------------------- | ------------ | --------------- | ----------------------------- |
| **Komfort**          | 100 %        | Normal          | Gebäude besetzt               |
| **Nacht / Abwesend** | 30–50 %      | Abgesenkt       | Gebäude leer                  |
| **Nachtlüftung**     | 100 %        | Kühlen (Sommer) | Freie Kühlung                 |
| **Frostschutz**      | 0 %          | WW-Ventil auf   | Aussentemp < 2 °C, Anlage aus |
| **Störung**          | 0 %          | Klappe zu       | Sicherheitsabschaltung        |

---

## Typische GA-Datenpunkte RLT

| Datenpunkt              | Typ   | Einheit | Beschreibung                     |
| ----------------------- | ----- | ------- | -------------------------------- |
| Zuluft-Temperatur-Ist   | AI    | °C      | Fühler nach letzter Komponente   |
| Zuluft-Temperatur-Soll  | AV    | °C      | Vorgabe von GLT                  |
| Aussenluft-Temperatur   | AI    | °C      | Für gleitenden Sollwert          |
| Heizregister-Ventil     | AO    | %       | 0–10 V Stellsignal               |
| Kühlregister-Ventil     | AO    | %       | 0–10 V Stellsignal               |
| Befeuchter Ein/Aus      | DO    | —       | Dampf-Befeuchter                 |
| Zuluft-FU-Drehzahl-Soll | AO    | %       | Frequenzumrichter Zuluft         |
| Abluft-FU-Drehzahl-Soll | AO    | %       | Frequenzumrichter Abluft         |
| Aussenluft-Klappe       | AO/DO | % / EIN | Stellsignal Klappe               |
| Filter-Differenzdruck   | AI    | Pa      | Filterwächter                    |
| Frostschutz-Alarm       | DI    | —       | < 5 °C Zuluft → kritischer Alarm |
| Ventilator-Laufmeldung  | DI    | —       | Betriebsrückmeldung              |
| Ventilator-Störung      | DI    | —       | Motorschutz ausgelöst            |
| WRG-Bypass              | AO    | %       | Klappe um WRG zu umgehen         |

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **VDI 6022** — Raumlufttechnik, Hygiene
- **SIA 382/1** — Lüftungs- und Klimaanlagen, allgemeine Grundlagen und Anforderungen
- **EN 13053** — Lüftung von Gebäuden, Zentrale Raumlufttechnische Anlagen
- **EN ISO 16890** — Luftfilter für die allgemeine Raumlufttechnik

<!-- EN -->

## AHU — Construction and Components

An **air handling unit (AHU)** conditions air for buildings: temperature, humidity, quality and volume flow are controlled. In BA the AHU is one of the most complex control systems — many actuators, mutual dependencies and safety-critical functions.

## Airflow Principle

<figure class="schema"><svg class="hyd" viewBox="0 0 430 214" role="img" aria-label="Air handling unit: outdoor air via damper, filter, heat recovery, heater, cooler and fan to supply air; extract air via fan, filter, heat recovery to exhaust" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="60" y="20" width="320" height="160" rx="4" class="bauteil" stroke-opacity="0.35"/><path d="M60 100H380" class="bauteil" stroke-opacity="0.35"/><path class="rl" d="M14 50H60" stroke-width="3"/><path class="vl" d="M380 50H416" stroke-width="3"/><path class="vl" d="M416 150H380" stroke-width="3"/><path class="rl" d="M60 150H14" stroke-width="3"/><path class="rl fill" d="M31 46L41 50L31 54Z"/><path class="vl fill" d="M395 46L405 50L395 54Z"/><path class="vl fill" d="M405 146L395 150L405 154Z"/><path class="rl fill" d="M41 146L31 150L41 154Z"/><path class="rl" d="M60 50H152" stroke-width="2.4"/><path class="mix" d="M152 50H205" stroke-width="2.4"/><path class="vl" d="M205 50H380" stroke-width="2.4"/><path class="vl" d="M380 150H152" stroke-width="2.4"/><path class="rl" d="M152 150H60" stroke-width="2.4"/><path d="M74 34V66M66 42L82 58" class="bauteil" stroke-width="2"/><path d="M74 134V166M66 142L82 158" class="bauteil" stroke-width="2"/><rect x="92" y="30" width="16" height="40" class="bauteil bg"/><path d="M94 32L106 38L94 44L106 50L94 56L106 62L94 68" class="bauteil" stroke-width="1.2"/><rect x="337" y="130" width="16" height="40" class="bauteil bg"/><path d="M339 132L351 138L339 144L351 150L339 156L351 162L339 168" class="bauteil" stroke-width="1.2"/><rect x="130" y="30" width="44" height="140" class="bauteil bg"/><path d="M130 30L174 170M174 30L130 170" class="bauteil" stroke-width="1.2"/><rect x="195" y="30" width="20" height="40" class="bauteil bg"/><rect x="230" y="30" width="20" height="40" class="bauteil bg"/><circle cx="290" cy="50" r="16" class="bauteil bg"/><path d="M281 37L305 50L281 63" class="bauteil" stroke-width="1.4"/><circle cx="300" cy="150" r="16" class="bauteil bg"/><path d="M309 137L285 150L309 163" class="bauteil" stroke-width="1.4"/><g fill="currentColor" stroke="none"><text x="205" y="55" text-anchor="middle" font-size="15" font-weight="700">+</text><text x="240" y="55" text-anchor="middle" font-size="15" font-weight="700">−</text><text x="14" y="40" text-anchor="start" font-size="10.5" font-weight="600">Outdoor air</text><text x="14" y="72" text-anchor="start" font-size="10">ODA</text><text x="416" y="40" text-anchor="end" font-size="10.5" font-weight="600">Supply air</text><text x="416" y="72" text-anchor="end" font-size="10">SUP</text><text x="416" y="140" text-anchor="end" font-size="10.5" font-weight="600">Extract air</text><text x="416" y="172" text-anchor="end" font-size="10">ETA</text><text x="14" y="140" text-anchor="start" font-size="10.5" font-weight="600">Exhaust air</text><text x="14" y="172" text-anchor="start" font-size="10">EHA</text><text x="74" y="208" text-anchor="middle" font-size="9.5">Damper</text><text x="100" y="196" text-anchor="middle" font-size="9.5">Filter</text><text x="152" y="208" text-anchor="middle" font-size="9.5">Heat rec.</text><text x="205" y="196" text-anchor="middle" font-size="9.5">Heater</text><text x="240" y="208" text-anchor="middle" font-size="9.5">Cooler</text><text x="290" y="196" text-anchor="middle" font-size="9.5">Fan</text></g></svg><figcaption>Supply air at the top from left to right, extract air back at the bottom. Heat recovery links both air paths.</figcaption></figure>

### Air Designations (EN 13779 / EN 16798)

| Code    | English           | Source/destination     |
| ------- | ----------------- | ---------------------- |
| **ODA** | Outdoor Air       | Comes from outside     |
| **SUP** | Supply Air        | Goes into the room     |
| **ETA** | Extract Air       | Comes from the room    |
| **EHA** | Exhaust Air       | Goes to outside        |
| **RCA** | Recirculation Air | Internal recirculation |

---

## Components in Detail

### 1. Outdoor Air Damper (ODA damper)

- Motorised damper at the outdoor air inlet
- **Safety function:** closes when plant is off → prevents freezing of the coil
- Fail-safe: CLOSED (spring return) — on power loss damper stays closed
- Feedback: limit switches (DI) OPEN / CLOSED

### 2. Filters

| Filter class per ISO 16890 | roughly old (EN 779) | Initial pressure drop | Application                                  |
| -------------------------- | -------------------- | --------------------- | -------------------------------------------- |
| ISO Coarse                 | G3–G4                | 20–50 Pa              | Pre-filter, coarse dust                      |
| ePM10 50–60 %              | M5                   | 40–80 Pa              | simple outdoor air filters                   |
| ePM2.5 50–65 %             | M6                   | 50–100 Pa             | outdoor air, extract air                     |
| ePM1 50–65 %               | F7                   | 60–120 Pa             | supply air, comfort systems                  |
| ePM1 ≥ 80 %                | F9                   | 80–150 Pa             | supply air, high demands, hospital pre-stage |

The mapping to the old classes is only approximate; the test methods differ. The final pressure drops at which filters are changed are given by the manufacturer, typically two to three times the initial value.

**Filter monitor:** differential pressure sensor across the filter → alarm when dirty limit reached.

### 3. Heat Recovery Unit (HRC)

Uses the heat from extract air to pre-heat outdoor air (winter) or pre-cool it (summer).

| Type                      | Efficiency                               | Humidification                           | Special feature                  |
| ------------------------- | ---------------------------------------- | ---------------------------------------- | -------------------------------- |
| **Rotary heat exchanger** | 70–85 %                                  | Yes, as sorption rotor                   | Watch leakage extract → supply   |
| **Plate heat exchanger**  | cross-flow 50–70 %, counter-flow 75–90 % | No (except membrane enthalpy exchangers) | Air streams tightly separated    |
| **Run-around coil**       | 45–60 %                                  | No                                       | Source and load far apart        |
| **Heat pipe**             | 55–65 %                                  | No                                       | No moving parts, low maintenance |

**HRC frost protection:** in low outdoor temperatures the HRC can freeze → bypass damper or pre-heating required.

### 4. Pre-heater / Post-heater

- **Heating medium:** hot water (from heating circuit) or electric
- Hot water coil: 2-way valve (modulating, 0–10 V)
- **Frost protection:** temperature sensor behind the coil → below 5 °C immediately: valve 100 % OPEN, damper CLOSED, alarm!
- Post-heater: fine adjustment of supply air temperature after HRC and cooler

### 5. Cooler

- **Cooling medium:** chilled water (chiller) or direct expansion (split/rooftop)
- Chilled water cooler: 2-way valve modulating, 0–10 V
- Cooling coil may condense moisture → condensate tray with drain
- **Hygiene aspect:** keep condensate tray dry (VDI 6022), clean regularly

### 6. Humidifier

Types:

| Type                            | Hygiene           | Energy | Humidification level | Application      |
| ------------------------------- | ----------------- | ------ | -------------------- | ---------------- |
| **Steam humidifier (electric)** | Very good         | High   | High                 | Office, hospital |
| **Steam from steam network**    | Good              | Medium | High                 | Industry         |
| **Recirculating evaporation**   | Problematic       | Low    | Medium               | Simple systems   |
| **High-pressure water**         | Good (filtration) | Low    | Medium               | Comfort systems  |

> Air humidifiers are a Legionella risk if not operated correctly! Regularly check temperature and disinfection (VDI 6022).

### 7. Fan

- **Supply fan** + **extract fan** (separate drives)
- Variable frequency drive for variable speed (→ VAV)
- **Measurement:** pressure sensor before/after fan → calculate pressure rise
- **Volume flow:** via the fan's inlet nozzle (differential pressure, see [k-factor](/wissen/k-faktor-luft)) or a separate measuring section
- **Operating monitoring:** run status (DI), fault (DI), motor protection switch

---

## Supply Air Temperature: Sequence Control

Heater, heat recovery and cooler are controlled **in sequence**. This has nothing to do with cascade control, which is the combination of room and supply air controllers (see [Cascade Control](/wissen/kaskadenregelung)).

A supply air controller (PI) produces one output that drives the actuators one after another: first **heat recovery**, then the **heater** on one side and the **cooler** on the other. In between lies a **dead band** of about ±1 K in which neither heating nor cooling takes place.

**Important:** never heat and cool at the same time to control temperature; the sequence prevents it. The exception is **dehumidification**: the cooler then cools the air below its dew point and the heater reheats it afterwards.

### Sliding Supply Air Temperature

Instead of fixed supply air temperature: setpoint depending on outdoor or room temperature:

| Outdoor temperature | Supply air setpoint  |
| ------------------- | -------------------- |
| −10 °C              | 22 °C (max. heating) |
| 0 °C                | 20 °C                |
| 15 °C               | 18 °C (neutral zone) |
| 30 °C               | 16 °C (cooling)      |

---

## Operating Modes

| Mode                   | Volume flow | Temperature      | Typical when                   |
| ---------------------- | ----------- | ---------------- | ------------------------------ |
| **Comfort**            | 100 %       | Normal           | Building occupied              |
| **Night / Unoccupied** | 30–50 %     | Setback          | Building empty                 |
| **Night cooling**      | 100 %       | Cooling (summer) | Free cooling                   |
| **Frost protection**   | 0 %         | HW valve open    | Outdoor temp < 2 °C, plant off |
| **Fault**              | 0 %         | Damper closed    | Safety shutdown                |

---

## Typical BA Data Points AHU

| Data point                     | Type  | Unit   | Description                        |
| ------------------------------ | ----- | ------ | ---------------------------------- |
| Supply air temp actual         | AI    | °C     | Sensor after last component        |
| Supply air temp setpoint       | AV    | °C     | Set by BMS                         |
| Outdoor air temperature        | AI    | °C     | For sliding setpoint               |
| Heating coil valve             | AO    | %      | 0–10 V control signal              |
| Cooling coil valve             | AO    | %      | 0–10 V control signal              |
| Humidifier on/off              | DO    | —      | Steam humidifier                   |
| Supply fan VFD speed setpoint  | AO    | %      | Variable frequency drive supply    |
| Extract fan VFD speed setpoint | AO    | %      | Variable frequency drive extract   |
| Outdoor air damper             | AO/DO | % / ON | Damper control signal              |
| Filter differential pressure   | AI    | Pa     | Filter monitor                     |
| Frost protection alarm         | DI    | —      | < 5 °C supply air → critical alarm |
| Fan run status                 | DI    | —      | Operating feedback                 |
| Fan fault                      | DI    | —      | Motor protection tripped           |
| HRC bypass                     | AO    | %      | Damper to bypass HRC               |

## Standards

- **EN 16798-3** — Energy performance of buildings, ventilation of non-residential buildings
- **VDI 6022** — Ventilation and air conditioning, hygiene requirements
- **SIA 382/1** — Ventilation and air conditioning systems, general principles
- **EN 13053** — Ventilation for buildings, central air handling units
- **EN ISO 16890** — Air filters for general ventilation
