---
title: RLT-Anlage — Aufbau und Komponenten
title_en: AHU — Construction and Components
slug: rlt-anlage
category: lueftung
subcategory: grundlagen
tags: [rlt, raumlufttechnische-anlage, ahu, air-handling-unit, filter, erhitzer, kühler, befeuchter, entfeuchter, wärmerückgewinnung, ventilator, zuluft, abluft, aussenluft, fortluft, wrg, zulufttemperatur, volumenstrom]
difficulty: grundlagen
area: [hlk, ga]
related: [vav-cav, vdi6022, frequenzumrichter, kaelteanlagen, waermepumpe, pid-regler]
norm: [EN 16798-3, VDI 6022, SIA 382.1, EN 13053]
updated: 2026-05-14
lang: de
---

# RLT-Anlage — Aufbau und Komponenten

Eine **raumlufttechnische Anlage (RLT)** konditioniert Luft für Gebäude: Temperatur, Feuchte, Qualität und Volumenstrom werden geregelt. In der GA ist die RLT-Anlage einer der komplexesten Regelkreise — viele Stellglieder, gegenseitige Abhängigkeiten und sicherheitsrelevante Funktionen.

## Luftstromprinzip

```
Aussenluft (ODA)
      ↓
[Filter] → [WRG] → [Erhitzer] → [Kühler/Befeuchter] → [Ventilator] → Zuluft (SUP)
                ↑
      Rückgewinnung
                ↑
[Filter] ← [WRG] ← Abluft (ETA) ← Räume
      ↓
Fortluft (ODA = exhaust)
```

### Luftbezeichnungen (EN 13779 / EN 16798)

| Kürzel | Deutsch       | Englisch       | Quelle/Ziel                     |
|--------|---------------|----------------|---------------------------------|
| **ODA** | Aussenluft   | Outdoor Air    | Kommt von aussen                |
| **SUP** | Zuluft       | Supply Air     | Geht in den Raum                |
| **ETA** | Abluft       | Extract Air    | Kommt aus dem Raum              |
| **EHA** | Fortluft     | Exhaust Air    | Geht nach aussen                |
| **RCA** | Umluft       | Recirculation Air | Interne Rezirkulation        |

---

## Komponenten im Detail

### 1. Aussenluft-Klappe (ODA-Klappe)

- Motorisch betätigte Klappe am Aussenlufteinlass
- **Sicherheitsfunktion:** Schliesst wenn Anlage aus → verhindert Einfrieren des Registers
- Fail-safe: ZU (Federrückstellung) — bei Ausfall bleibt Klappe geschlossen
- Rückmeldung: Endschalter (DI) AUF / ZU

### 2. Filter

| Filterklasse | Norm     | Druckverlust neu | Wechseldruck | Einsatz                    |
|--------------|----------|------------------|--------------|----------------------------|
| Coarse (G)   | EN ISO 16890 | 20–50 Pa    | 150–200 Pa   | Vorfilter, Grobstaub       |
| ePM10 (F5/F6)| EN ISO 16890 | 50–100 Pa   | 200–250 Pa   | Aussenluftfilter           |
| ePM2.5 (F7)  | EN ISO 16890 | 80–150 Pa   | 250–300 Pa   | Zuluftfilter Büro          |
| ePM1 (F9)    | EN ISO 16890 | 100–200 Pa  | 300–400 Pa   | Reinraum-Vorstufe, Spital  |

**Filterwächter:** Differenzdrucksensor über dem Filter → Alarm wenn Schmutzgrenze erreicht.

### 3. Wärmerückgewinnungs-Tauscher (WRG)

Nutzt die Wärme der Abluft um Aussenluft vorzuwärmen (Winter) oder vorzukühlen (Sommer).

| Typ                  | Wirkungsgrad | Befeuchtung | Besonderheit               |
|----------------------|--------------|-------------|----------------------------|
| **Rotationstauscher** | 70–85 %     | Ja (Feuchte WT) | Hygiene-Anforderungen prüfen! |
| **Plattentauscher**   | 60–75 %     | Nein        | Keine Überströmung, hygienisch |
| **Kreislaufverbund**  | 45–60 %     | Nein        | Erzeuger und Verbraucher weit getrennt |
| **Wärmerohr**         | 55–65 %     | Nein        | Kein bewegliches Teil, wartungsarm |

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

| Typ                  | Hygiene | Energie | Befeuchtungsgrad | Einsatz             |
|----------------------|---------|---------|------------------|---------------------|
| **Dampfbefeuchter (elektrisch)** | Sehr gut | Hoch | Hoch | Büro, Spital |
| **Dampf aus Dampfnetz** | Gut  | Mittel  | Hoch             | Industrie           |
| **Umlaufverdunstung** | Problematisch | Niedrig | Mittel   | Einfache Anlagen    |
| **Hochdruck-Wasser** | Gut (Filtration) | Niedrig | Mittel | Komfortanlagen    |

> ⚠️ Luftbefeuchter sind Legionellen-Risiko wenn nicht korrekt betrieben! Temperatur und Desinfektion regelmässig prüfen (VDI 6022).

### 7. Ventilator

- **Zuluftventilator** + **Abluftventilator** (getrennte Antriebe)
- Frequenzumrichter für variable Drehzahl (→ VAV)
- **Messung:** Drucksensor vor/nach Ventilator → Druckerhöhung berechnen
- **Volumenstrom:** Aus Druck und FU-Drehzahl oder separater Messeinrichtung (Messblende)
- **Betriebsüberwachung:** Laufmeldung (DI), Störmeldung (DI), Motorschutzschalter

---

## Zulufttemperatur-Kaskade

In der Praxis werden Erhitzer und Kühler **kaskadenförmig** geregelt:

```
Zuluft-Sollwert (z.B. 22 °C)
    ↓
Zuluft-Regler (PI)
    ├── > Soll: Kühler aufmachen
    └── < Soll: Erhitzer aufmachen
    
Totband zwischen Heizen und Kühlen (z.B. ±1 K)
→ Verhindert gleichzeitiges Heizen + Kühlen (Energieverschwendung!)
```

**Wichtig:** Niemals Erhitzer und Kühler gleichzeitig aktiv! Verriegelung in der DDC nötig.

### Gleitende Zulufttemperatur

Statt fixer Zulufttemperatur: Sollwert abhängig von Aussentemperatur oder Raumtemperatur:

| Aussentemperatur | Zuluft-Sollwert    |
|------------------|--------------------|
| −10 °C           | 22 °C (max. Heizen) |
| 0 °C             | 20 °C              |
| 15 °C            | 18 °C (Neutralzone) |
| 30 °C            | 16 °C (Kühlen)     |

---

## Betriebsarten

| Betriebsart    | Volumenstrom | Temperatur   | Typisch wann                |
|----------------|--------------|--------------|------------------------------|
| **Komfort**    | 100 %        | Normal       | Gebäude besetzt              |
| **Nacht / Abwesend** | 30–50 % | Abgesenkt | Gebäude leer              |
| **Nachtlüftung** | 100 %      | Kühlen (Sommer) | Freie Kühlung                |
| **Frostschutz** | 0 %         | WW-Ventil auf | Aussentemp < 2 °C, Anlage aus |
| **Störung**    | 0 %          | Klappe zu    | Sicherheitsabschaltung       |

---

## Typische GA-Datenpunkte RLT

| Datenpunkt                  | Typ | Einheit | Beschreibung                     |
|-----------------------------|-----|---------|----------------------------------|
| Zuluft-Temperatur-Ist       | AI  | °C      | Fühler nach letzter Komponente   |
| Zuluft-Temperatur-Soll      | AV  | °C      | Vorgabe von GLT                  |
| Aussenluft-Temperatur       | AI  | °C      | Für gleitenden Sollwert          |
| Heizregister-Ventil         | AO  | %       | 0–10 V Stellsignal               |
| Kühlregister-Ventil         | AO  | %       | 0–10 V Stellsignal               |
| Befeuchter Ein/Aus          | DO  | —       | Dampf-Befeuchter                 |
| Zuluft-FU-Drehzahl-Soll     | AO  | %       | Frequenzumrichter Zuluft         |
| Abluft-FU-Drehzahl-Soll     | AO  | %       | Frequenzumrichter Abluft         |
| Aussenluft-Klappe           | AO/DO | % / EIN | Stellsignal Klappe            |
| Filter-Differenzdruck       | AI  | Pa      | Filterwächter                    |
| Frostschutz-Alarm           | DI  | —       | < 5 °C Zuluft → kritischer Alarm |
| Ventilator-Laufmeldung      | DI  | —       | Betriebsrückmeldung              |
| Ventilator-Störung          | DI  | —       | Motorschutz ausgelöst            |
| WRG-Bypass                  | AO  | %       | Klappe um WRG zu umgehen         |

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **VDI 6022** — Raumlufttechnik, Hygiene
- **SIA 382.1** — Lüftungs- und Klimaanlagen, Allgemeine Grundlagen
- **EN 13053** — Lüftung von Gebäuden, Zentrale Raumlufttechnische Anlagen
- **EN ISO 16890** — Luftfilter für die allgemeine Raumlufttechnik

<!-- EN -->

## AHU — Construction and Components

An **air handling unit (AHU)** conditions air for buildings: temperature, humidity, quality and volume flow are controlled. In BA the AHU is one of the most complex control systems — many actuators, mutual dependencies and safety-critical functions.

## Airflow Principle

```
Outdoor air (ODA)
      ↓
[Filter] → [HRC] → [Heater] → [Cooler/Humidifier] → [Fan] → Supply air (SUP)
                ↑
        Heat recovery
                ↑
[Filter] ← [HRC] ← Extract air (ETA) ← Rooms
      ↓
Exhaust air (EHA)
```

### Air Designations (EN 13779 / EN 16798)

| Code | English | Source/destination |
|------|---------|-------------------|
| **ODA** | Outdoor Air | Comes from outside |
| **SUP** | Supply Air | Goes into the room |
| **ETA** | Extract Air | Comes from the room |
| **EHA** | Exhaust Air | Goes to outside |
| **RCA** | Recirculation Air | Internal recirculation |

---

## Components in Detail

### 1. Outdoor Air Damper (ODA damper)

- Motorised damper at the outdoor air inlet
- **Safety function:** closes when plant is off → prevents freezing of the coil
- Fail-safe: CLOSED (spring return) — on power loss damper stays closed
- Feedback: limit switches (DI) OPEN / CLOSED

### 2. Filters

| Filter class | Standard | New pressure drop | Change pressure | Application |
|-------------|---------|-----------------|----------------|------------|
| Coarse (G) | EN ISO 16890 | 20–50 Pa | 150–200 Pa | Pre-filter, coarse dust |
| ePM10 (F5/F6) | EN ISO 16890 | 50–100 Pa | 200–250 Pa | Outdoor air filter |
| ePM2.5 (F7) | EN ISO 16890 | 80–150 Pa | 250–300 Pa | Supply air filter office |
| ePM1 (F9) | EN ISO 16890 | 100–200 Pa | 300–400 Pa | Cleanroom pre-stage, hospital |

**Filter monitor:** differential pressure sensor across the filter → alarm when dirty limit reached.

### 3. Heat Recovery Unit (HRC)

Uses the heat from extract air to pre-heat outdoor air (winter) or pre-cool it (summer).

| Type | Efficiency | Humidification | Special feature |
|------|-----------|---------------|----------------|
| **Rotary heat exchanger** | 70–85 % | Yes (moisture transfer) | Check hygiene requirements! |
| **Plate heat exchanger** | 60–75 % | No | No cross-contamination, hygienic |
| **Run-around coil** | 45–60 % | No | Source and load far apart |
| **Heat pipe** | 55–65 % | No | No moving parts, low maintenance |

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

| Type | Hygiene | Energy | Humidification level | Application |
|------|---------|--------|---------------------|------------|
| **Steam humidifier (electric)** | Very good | High | High | Office, hospital |
| **Steam from steam network** | Good | Medium | High | Industry |
| **Recirculating evaporation** | Problematic | Low | Medium | Simple systems |
| **High-pressure water** | Good (filtration) | Low | Medium | Comfort systems |

> Air humidifiers are a Legionella risk if not operated correctly! Regularly check temperature and disinfection (VDI 6022).

### 7. Fan

- **Supply fan** + **extract fan** (separate drives)
- Variable frequency drive for variable speed (→ VAV)
- **Measurement:** pressure sensor before/after fan → calculate pressure rise
- **Volume flow:** from pressure and VFD speed or separate measurement device (measuring orifice)
- **Operating monitoring:** run status (DI), fault (DI), motor protection switch

---

## Supply Air Temperature Cascade

In practice heater and cooler are controlled **in cascade**:

```
Supply air setpoint (e.g. 22 °C)
    ↓
Supply air controller (PI)
    ├── > setpoint: open cooler
    └── < setpoint: open heater
    
Dead band between heating and cooling (e.g. ±1 K)
→ Prevents simultaneous heating + cooling (energy waste!)
```

**Important:** Never activate heater and cooler simultaneously! Interlock required in DDC.

### Sliding Supply Air Temperature

Instead of fixed supply air temperature: setpoint depending on outdoor or room temperature:

| Outdoor temperature | Supply air setpoint |
|---------------------|---------------------|
| −10 °C | 22 °C (max. heating) |
| 0 °C | 20 °C |
| 15 °C | 18 °C (neutral zone) |
| 30 °C | 16 °C (cooling) |

---

## Operating Modes

| Mode | Volume flow | Temperature | Typical when |
|------|------------|-------------|-------------|
| **Comfort** | 100 % | Normal | Building occupied |
| **Night / Unoccupied** | 30–50 % | Setback | Building empty |
| **Night cooling** | 100 % | Cooling (summer) | Free cooling |
| **Frost protection** | 0 % | HW valve open | Outdoor temp < 2 °C, plant off |
| **Fault** | 0 % | Damper closed | Safety shutdown |

---

## Typical BA Data Points AHU

| Data point | Type | Unit | Description |
|-----------|------|------|-------------|
| Supply air temp actual | AI | °C | Sensor after last component |
| Supply air temp setpoint | AV | °C | Set by BMS |
| Outdoor air temperature | AI | °C | For sliding setpoint |
| Heating coil valve | AO | % | 0–10 V control signal |
| Cooling coil valve | AO | % | 0–10 V control signal |
| Humidifier on/off | DO | — | Steam humidifier |
| Supply fan VFD speed setpoint | AO | % | Variable frequency drive supply |
| Extract fan VFD speed setpoint | AO | % | Variable frequency drive extract |
| Outdoor air damper | AO/DO | % / ON | Damper control signal |
| Filter differential pressure | AI | Pa | Filter monitor |
| Frost protection alarm | DI | — | < 5 °C supply air → critical alarm |
| Fan run status | DI | — | Operating feedback |
| Fan fault | DI | — | Motor protection tripped |
| HRC bypass | AO | % | Damper to bypass HRC |

## Standards

- **EN 16798-3** — Energy performance of buildings, ventilation of non-residential buildings
- **VDI 6022** — Ventilation and air conditioning, hygiene requirements
- **SIA 382.1** — Ventilation and air conditioning systems, general principles
- **EN 13053** — Ventilation for buildings, central air handling units
- **EN ISO 16890** — Air filters for general ventilation
