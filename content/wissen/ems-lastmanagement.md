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
updated: 2026-10-14
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

Gemessen und abgerechnet wird in Viertelstunden. Droht der Mittelwert der laufenden Viertelstunde den Grenzwert zu überschreiten, reduziert das EMS nach Priorität:

1. Ladestationen drosseln
2. Kühlung kurz zurücknehmen, die Trägheit des Gebäudes hilft
3. Warmwasserbereitung verschieben, der Speicher überbrückt
4. Beleuchtung in unbelegten Räumen ausschalten

### Schaltprioritäten festlegen

| Priorität | Last                            | Abschalten | Bemerkung                      |
| --------- | ------------------------------- | ---------- | ------------------------------ |
| 1         | E-Ladestation                   | Sofort     | Akzeptabel für Nutzer          |
| 2         | Klimaanlage (Kühlen)            | Bis 15 min | Thermische Trägheit hilft      |
| 3         | WW-Boiler                       | Bis 60 min | Speicher hält Temperatur       |
| 4         | Beleuchtung unbel.              | Sofort     | Keine Auswirkung               |
| Nie       | Sicherheitsbeleuchtung, Notfall | —          | darf nicht abgeschaltet werden |

---

## PV-Eigenverbrauchsoptimierung

### Ziel

Möglichst viel eigenproduzierter Solarstrom direkt verbrauchen — statt einspeisen (geringe Vergütung) und wieder kaufen (hoher Bezugspreis).

Bei PV-Überschuss, also Einspeisung am Netzanschluss:

- Wärmepumpe mit erhöhtem Sollwert laufen lassen, etwa über SG-Ready
- E-Auto laden
- Warmwasser höher laden, zum Beispiel 60 statt 50 °C
- Batterie laden

Sinkt die Produktion und wird wieder Strom bezogen: Zusatzlasten zurücknehmen, Batterie entladen, Normalbetrieb.

### Regelung über Netzmesseinrichtung

<p class="formel">P<sub>Netz</sub> &gt; 0: Bezug &nbsp; · &nbsp; P<sub>Netz</sub> &lt; 0: Einspeisung</p>

- **P_Netz deutlich unter 0** (Einspeisung): Überschuss vorhanden, steuerbare Lasten zuschalten oder Speicher laden
- **P_Netz deutlich über 0** (Bezug): Zusatzlasten zurücknehmen, Batterie entladen
- Ziel ist P_Netz nahe 0, mit einer kleinen Reserve, damit kurze Schwankungen nicht sofort Netzbezug auslösen

---

## SG-Ready (Smart Grid Ready)

**SG-Ready** ist ein deutsches Gütesiegel für wärmepumpengeeignete Anlagen mit 4 Betriebszuständen:

| Zustand | Kontakt 1 | Kontakt 2 | Bedeutung                               |
| ------- | --------- | --------- | --------------------------------------- |
| **1**   | zu        | offen     | Sperre durch den Netzbetreiber          |
| **2**   | offen     | offen     | Normalbetrieb                           |
| **3**   | offen     | zu        | Einschaltempfehlung, etwa PV-Überschuss |
| **4**   | zu        | zu        | Einschaltbefehl                         |

Details in [SG-Ready](/wissen/sg-ready).

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

Die Ladestation spricht über **OCPP** (1.6 oder 2.0.1) mit einem Lademanagement oder Backend. Dieses tauscht Grenzwerte und Messwerte mit EMS oder GLT aus.

### Lastmanagement E-Ladesäulen

Beispiel: Netzanschluss 100 kW, Gebäude braucht gerade 70 kW. Für das Laden bleiben 30 kW.

- 5 Autos laden dreiphasig: je 6 kW, das sind rund 8.7 A pro Phase
- Ein Auto ist voll, 4 bleiben: je 7.5 kW, rund 10.8 A pro Phase
- Steigt die Gebäudelast, wird der Ladestrom aller Autos reduziert, bis höchstens auf 6 A Minimum. Reicht das nicht, werden einzelne Ladungen pausiert.

### Phasenbalancierung

Einphasige Ladesäulen können die Phasen ungleichmässig belasten, es entsteht Schieflast. EMS überwacht und verteilt Ladesäulen auf verschiedene Phasen.

---

## ISO 50001 — Energiemanagement-Norm

Struktur der Norm:

| Element        | Beschreibung                                                           |
| -------------- | ---------------------------------------------------------------------- |
| Energiepolitik | Commitment der Unternehmensleitung                                     |
| Energiebasis   | Referenzwert, gegen den Verbesserungen gemessen                        |
| Energie-KPIs   | Messbare Kennzahlen (kWh/m², kWh/Produkt)                              |
| Ziele          | Jährliche Reduktionsziele                                              |
| Massnahmenplan | Konkrete Massnahmen, Verantwortliche, Termine                          |
| Überwachung    | EMS misst und berichtet (M&V)                                          |
| Auditierung    | Zertifizierung für drei Jahre, dazwischen jährliche Überwachungsaudits |

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

Metering and billing are in quarter hours. If the mean of the current quarter hour threatens to exceed the limit, the EMS reduces by priority:

1. Throttle charging stations
2. Briefly cut back cooling; the building's inertia helps
3. Postpone hot water heating; the storage bridges the gap
4. Switch off lighting in unoccupied rooms

### Setting Switching Priorities

| Priority | Load                       | Switch off   | Note                      |
| -------- | -------------------------- | ------------ | ------------------------- |
| 1        | EV charging station        | Immediately  | Acceptable to users       |
| 2        | Air conditioning (cooling) | Up to 15 min | Thermal mass helps        |
| 3        | DHW boiler                 | Up to 60 min | Storage holds temperature |
| 4        | Lighting (unoccupied)      | Immediately  | No impact                 |
| Never    | Safety lighting, emergency | —            | must not be switched off  |

---

## PV Self-Consumption Optimisation

### Goal

Consume as much self-generated solar power directly as possible — rather than exporting (low feed-in tariff) and re-buying (high purchase price).

With PV surplus, i.e. export at the grid connection:

- Run the heat pump with a raised setpoint, for example via SG-Ready
- Charge the electric car
- Charge hot water higher, for example 60 instead of 50 °C
- Charge the battery

When production drops and power is imported again: cut back the extra loads, discharge the battery, normal operation.

### Control via Grid Measurement

<p class="formel">P<sub>grid</sub> &gt; 0: import &nbsp; · &nbsp; P<sub>grid</sub> &lt; 0: export</p>

- **P_grid clearly below 0** (export): surplus available, switch on controllable loads or charge storage
- **P_grid clearly above 0** (import): cut back extra loads, discharge the battery
- The goal is P_grid close to 0, with a small margin so that short fluctuations do not immediately cause import

---

## SG-Ready (Smart Grid Ready)

**SG-Ready** is a German quality mark for heat pump systems with 4 operating states:

| State | Contact 1 | Contact 2 | Meaning                                   |
| ----- | --------- | --------- | ----------------------------------------- |
| **1** | closed    | open      | lockout by the grid operator              |
| **2** | open      | open      | normal operation                          |
| **3** | open      | closed    | switch-on recommendation, e.g. PV surplus |
| **4** | closed    | closed    | switch-on command                         |

Details in [SG-Ready](/wissen/sg-ready).

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

The charging station talks via **OCPP** (1.6 or 2.0.1) to a charge management system or backend. This exchanges limits and measurements with the EMS or BMS.

### Load Management for EV Charging Points

Example: grid connection 100 kW, the building currently needs 70 kW. 30 kW remain for charging.

- 5 cars charging three-phase: 6 kW each, about 8.7 A per phase
- One car is full, 4 remain: 7.5 kW each, about 10.8 A per phase
- If the building load rises, the charging current of all cars is reduced, at most down to the 6 A minimum. If that is not enough, individual sessions are paused.

### Phase Balancing

Single-phase charging points can load the phases unevenly, causing phase imbalance. EMS monitors and distributes charging points across different phases.

---

## ISO 50001 — Energy Management Standard

Standard structure:

| Element         | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| Energy policy   | Management commitment                                                     |
| Energy baseline | Reference value against which improvements are measured                   |
| Energy KPIs     | Measurable metrics (kWh/m², kWh/product)                                  |
| Targets         | Annual reduction targets                                                  |
| Action plan     | Concrete measures, responsibilities, deadlines                            |
| Monitoring      | EMS measures and reports (M&V)                                            |
| Audit           | certification for three years, with annual surveillance audits in between |

**BA contribution:** EMS automatically supplies the measurement data for ISO 50001 — consumption by energy carrier, area and time period.

## Standards

- **ISO 50001** — Energy management systems
- **EN 50160** — Voltage characteristics of electricity supplied by public networks
- **IEC 61851** — Electric vehicle conductive charging systems
- **OCPP 1.6 / 2.0.1** — Open Charge Point Protocol
