---
title: EMS und Lastmanagement — Energiemanagement in der GA
title_en: EMS and Load Management — Energy Management in BA
slug: ems-lastmanagement
category: energie
subcategory: management
tags:
  [
    ems,
    energiemanagementsystem,
    lastmanagement,
    spitzenlast,
    pv,
    photovoltaik,
    eigenverbrauch,
    sg-ready,
    demand-response,
    lademanagement,
    ocpp,
    iso50001,
    batteriespeicher,
    verbrauchsoptimierung
  ]
difficulty: fortgeschritten
area: [ga, it]
related:
  [
    glt-grundlagen,
    waermepumpe,
    bacnet,
    modbus,
    mbus,
    pv-integration,
    batteriespeicher,
    sg-ready,
    demand-response,
    e-mobility-lademanagement,
    iso50001
  ]
norm: [ISO 50001, EN 50160, IEC 61851, SIA 2024]
updated: 2026-05-14
lang: de
---

# EMS und Lastmanagement — Energiemanagement in der GA

Ein **Energiemanagementsystem (EMS)** überwacht und optimiert den Energieverbrauch eines Gebäudes oder Campus. In Kombination mit PV-Anlagen, Speichern und steuerbaren Lasten wird das EMS zur Schaltzentrale der Energieeffizienz.

## EMS vs. GLT

| Funktion              | GLT              | EMS                |
| --------------------- | ---------------- | ------------------ |
| Regelung HLK          | ✅ Kern-Aufgabe  | ❌ Nein            |
| Alarmmanagement       | ✅               | Nur Energie-Alarme |
| Energiemessung        | Optional         | ✅ Kern-Aufgabe    |
| Optimierung Zeitpläne | Manuell          | ✅ Automatisch     |
| PV-Integration        | Nein             | ✅                 |
| Lastmanagement        | Optional         | ✅ Kern-Aufgabe    |
| Reporting / ISO 50001 | Nicht vorgesehen | ✅                 |

In modernen Anlagen wächst GLT und EMS zusammen — oder das EMS ist ein Modul der GLT.

---

## Lastmanagement

### Spitzenlastmanagement

Ziel: Leistungsspitze (kW) verringern um Netzgebühren zu senken.

**Warum wichtig:** Viele Netztarife berechnen den **Jahres-Leistungspeak** separat. Eine einzelne 15-Minuten-Spitze kann mehrere Tausend Franken/Euro pro Jahr kosten.

```
Messperiode: 15 Minuten (Energiezähler messen in 15-min-Intervallen)

Wenn Leistung droht Grenzwert zu überschreiten:
  Priorität 1 abschalten: E-Ladestationen (Wagen kommt nicht weg)
  Priorität 2 reduzieren: Klimaanlage (Komfort leicht verringern)
  Priorität 3 schieben: Warmwasserbereitung (Speicher vorhanden)
  Priorität 4 reduzieren: Beleuchtung unbelegte Räume
```

### Schaltprioritäten festlegen

| Priorität | Last                            | Abschalten | Bemerkung                 |
| --------- | ------------------------------- | ---------- | ------------------------- |
| 1         | E-Ladestation                   | Sofort     | Akzeptabel für Nutzer     |
| 2         | Klimaanlage (Kühlen)            | Bis 15 min | Thermische Trägheit hilft |
| 3         | WW-Boiler                       | Bis 60 min | Speicher hält Temperatur  |
| 4         | Beleuchtung unbel.              | Sofort     | Keine Auswirkung          |
| Nie       | Sicherheitsbeleuchtung, Notfall | —          | Gesetzlich verboten       |

---

## PV-Eigenverbrauchsoptimierung

### Ziel

Möglichst viel eigenproduzierter Solarstrom direkt verbrauchen — statt einspeisen (geringe Vergütung) und wieder kaufen (hoher Bezugspreis).

```
PV-Überschuss vorhanden:
  → Wärmepumpe auf Maximalbetrieb
  → E-Auto laden
  → Boiler aufheizen (auf 65 °C statt 55 °C)
  → Batterie laden

PV-Produktion sinkt / Überschuss weg:
  → Lasten reduzieren
  → Batterie entladen
  → Normalbetrieb
```

### Regelung über Netzmesseinrichtung

```
P_Netz = Leistung am Einspeisepunkt (positiv = Bezug, negativ = Einspeisung)

EMS-Regelung:
  P_Netz nahe 0 → optimal (weder kaufen noch verschenken)
  P_Netz > 0 → EMS aktiviert steuerbare Lasten
  P_Netz < 0 → EMS reduziert Lasten oder lädt Speicher
```

---

## SG-Ready (Smart Grid Ready)

**SG-Ready** ist ein deutsches Gütesiegel für wärmepumpengeeignete Anlagen mit 4 Betriebszuständen:

| Zustand | Signal (2 DI-Leitungen) | Bedeutung                                |
| ------- | ----------------------- | ---------------------------------------- |
| **1**   | 00                      | Betriebssperre (Netz überlastet)         |
| **2**   | 01                      | Normalbetrieb                            |
| **3**   | 10                      | Einschaltempfehlung (PV-Überschuss)      |
| **4**   | 11                      | Einschaltbefehl (Überproduktion Wind/PV) |

Das EMS setzt Zustand 3 wenn PV-Überschuss vorhanden → WP läuft auf maximale Leistung (Puffer laden).

---

## Batteriespeicher in der GA

Haushalts- und gewerbliche Batteriespeicher ergänzen PV:

### Ladestrategien

| Strategie             | Beschreibung                               |
| --------------------- | ------------------------------------------ |
| **PV-Eigenverbrauch** | Laden wenn PV > Verbrauch, Entladen nachts |
| **Peak Shaving**      | Entladen bei Lastspitzen, Laden bei Tal    |
| **Nacht-Ladung**      | Laden bei günstigen Nachttarif             |
| **Notstrom-Reserve**  | SOC niemals unter 20 % (Blackout-Schutz)   |

**GA-Integration:** EMS liest SOC (State of Charge), steuert Lade-/Entladeleistung via Modbus oder herstellerspez. API.

---

## E-Mobility / Lademanagement

### OCPP (Open Charge Point Protocol)

Standard für Kommunikation zwischen Ladestation und Betreibersystem:

```
E-Auto → Ladestation (OCPP 1.6 / 2.0.1) → Charge Point Management System (CPMS) → EMS/GLT
```

### Lastmanagement E-Ladesäulen

```
Maximale Einspeisung Gebäude: 100 kW

Aktuelle Last Gebäude: 70 kW
Verfügbar für Laden: 30 kW

Bei 5 Ladesäulen: je 6 kW (Phase 1 = 26 A)
Eines Auto lädt ab, 4 Autos → je 7.5 kW

EMS verteilt dynamisch, immer innerhalb Limit
```

### Phasenbalancierung

Einphasige Ladesäulen können Phasen ungleichmässig belasten → Blindleistung, Schieflast. EMS überwacht und verteilt Ladesäulen auf verschiedene Phasen.

---

## ISO 50001 — Energiemanagement-Norm

Struktur der Norm:

| Element        | Beschreibung                                      |
| -------------- | ------------------------------------------------- |
| Energiepolitik | Commitment der Unternehmensleitung                |
| Energiebasis   | Referenzwert, gegen den Verbesserungen gemessen   |
| Energie-KPIs   | Messbare Kennzahlen (kWh/m², kWh/Produkt)         |
| Ziele          | Jährliche Reduktionsziele                         |
| Massnahmenplan | Konkrete Massnahmen, Verantwortliche, Termine     |
| Überwachung    | EMS misst und berichtet (M&V)                     |
| Auditierung    | Externe Überprüfung alle 3 Jahre (Zertifizierung) |

**GA-Beitrag:** EMS liefert die Messdaten für ISO 50001 automatisch — Verbrauch nach Energieträger, Fläche, Zeit.

## Normen

- **ISO 50001** — Energiemanagementsysteme
- **EN 50160** — Merkmale der Spannung in öffentlichen Netzen
- **IEC 61851** — Elektrische Ausrüstung von Elektrofahrzeugen (Laden)
- **OCPP 1.6 / 2.0.1** — Open Charge Point Protocol

<!-- EN -->

## EMS and Load Management — Energy Management in BA

An **energy management system (EMS)** monitors and optimises the energy consumption of a building or campus. Combined with PV systems, storage and controllable loads, the EMS becomes the hub of energy efficiency.

## EMS vs. BMS

| Function              | BMS          | EMS                |
| --------------------- | ------------ | ------------------ |
| HVAC control          | Core task    | No                 |
| Alarm management      | Yes          | Energy alarms only |
| Energy metering       | Optional     | Core task          |
| Schedule optimisation | Manual       | Automatic          |
| PV integration        | No           | Yes                |
| Load management       | Optional     | Core task          |
| Reporting / ISO 50001 | Not foreseen | Yes                |

In modern systems BMS and EMS converge — or the EMS is a module of the BMS.

---

## Load Management

### Peak Load Management

Goal: reduce the power peak (kW) to lower network tariff charges.

**Why important:** Many network tariffs bill the **annual power peak** separately. A single 15-minute spike can cost several thousand francs/euros per year.

```
Measurement period: 15 minutes (energy meters measure in 15-min intervals)

When power threatens to exceed limit:
  Priority 1 switch off: EV charging stations (car doesn't need to leave)
  Priority 2 reduce: air conditioning (slight comfort reduction)
  Priority 3 defer: domestic hot water heating (storage available)
  Priority 4 reduce: lighting in unoccupied rooms
```

### Setting Switching Priorities

| Priority | Load                       | Switch off   | Note                      |
| -------- | -------------------------- | ------------ | ------------------------- |
| 1        | EV charging station        | Immediately  | Acceptable to users       |
| 2        | Air conditioning (cooling) | Up to 15 min | Thermal mass helps        |
| 3        | DHW boiler                 | Up to 60 min | Storage holds temperature |
| 4        | Lighting (unoccupied)      | Immediately  | No impact                 |
| Never    | Safety lighting, emergency | —            | Legally prohibited        |

---

## PV Self-Consumption Optimisation

### Goal

Consume as much self-generated solar power directly as possible — rather than exporting (low feed-in tariff) and re-buying (high purchase price).

```
PV surplus present:
  → Heat pump at maximum output
  → Charge EV
  → Heat DHW boiler (to 65 °C instead of 55 °C)
  → Charge battery

PV production falls / surplus gone:
  → Reduce loads
  → Discharge battery
  → Normal operation
```

### Control via Grid Measurement

```
P_grid = power at grid connection point (positive = import, negative = export)

EMS control:
  P_grid near 0 → optimal (neither buying nor exporting)
  P_grid > 0 → EMS activates controllable loads
  P_grid < 0 → EMS reduces loads or charges storage
```

---

## SG-Ready (Smart Grid Ready)

**SG-Ready** is a German quality mark for heat pump systems with 4 operating states:

| State | Signal (2 DI lines) | Meaning                                    |
| ----- | ------------------- | ------------------------------------------ |
| **1** | 00                  | Lockout (grid overloaded)                  |
| **2** | 01                  | Normal operation                           |
| **3** | 10                  | Switch-on recommendation (PV surplus)      |
| **4** | 11                  | Switch-on command (wind/PV overproduction) |

The EMS sets state 3 when PV surplus is available → HP runs at maximum output (charge buffer).

---

## Battery Storage in BA

Residential and commercial battery storage complements PV:

### Charging Strategies

| Strategy                | Description                                      |
| ----------------------- | ------------------------------------------------ |
| **PV self-consumption** | Charge when PV > consumption, discharge at night |
| **Peak shaving**        | Discharge at load peaks, charge in off-peak      |
| **Night charging**      | Charge at favourable night tariff                |
| **Emergency reserve**   | SOC never below 20 % (blackout protection)       |

**BA integration:** EMS reads SOC (state of charge), controls charge/discharge power via Modbus or manufacturer API.

---

## E-Mobility / Charge Management

### OCPP (Open Charge Point Protocol)

Standard for communication between charging station and operator system:

```
EV → Charging station (OCPP 1.6 / 2.0.1) → Charge Point Management System (CPMS) → EMS/BMS
```

### Load Management for EV Charging Points

```
Maximum building supply: 100 kW

Current building load: 70 kW
Available for charging: 30 kW

5 charging points: 6 kW each (phase 1 = 26 A)
One car leaves, 4 cars → 7.5 kW each

EMS distributes dynamically, always within limit
```

### Phase Balancing

Single-phase charging points can unbalance phases → reactive power, phase imbalance. EMS monitors and distributes charging points across different phases.

---

## ISO 50001 — Energy Management Standard

Standard structure:

| Element         | Description                                             |
| --------------- | ------------------------------------------------------- |
| Energy policy   | Management commitment                                   |
| Energy baseline | Reference value against which improvements are measured |
| Energy KPIs     | Measurable metrics (kWh/m², kWh/product)                |
| Targets         | Annual reduction targets                                |
| Action plan     | Concrete measures, responsibilities, deadlines          |
| Monitoring      | EMS measures and reports (M&V)                          |
| Audit           | External review every 3 years (certification)           |

**BA contribution:** EMS automatically supplies the measurement data for ISO 50001 — consumption by energy carrier, area and time period.

## Standards

- **ISO 50001** — Energy management systems
- **EN 50160** — Voltage characteristics of electricity supplied by public networks
- **IEC 61851** — Electric vehicle conductive charging systems
- **OCPP 1.6 / 2.0.1** — Open Charge Point Protocol
