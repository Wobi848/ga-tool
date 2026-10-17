---
title: Wärmepumpe — Grundlagen, Regelung & GA
title_en: Heat Pump — Fundamentals, Control and BA Integration
slug: waermepumpe
category: heizung
subcategory: erzeuger
tags:
  [
    wärmepumpe,
    cop,
    scop,
    kältemittel,
    verdichter,
    verdampfer,
    verflüssiger,
    expansionsventil,
    sole-wasser,
    luft-wasser,
    wasser-wasser,
    inverter,
    heizstab,
    sperrzeiten,
    sg-ready
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [heizkurve, druckverlust, hydraulischer-abgleich, sg-ready, pv-integration, ems-lastmanagement]

norm: [EN 14511, EN 14825, VDI 4645]
updated: 2026-10-17
lang: de
---

# Wärmepumpe — Grundlagen, Regelung & GA

Die **Wärmepumpe** entzieht einer Wärmequelle (Luft, Erdreich, Wasser) Energie und hebt sie auf ein nutzbares Temperaturniveau. In der GA sind vor allem **Luft/Wasser-** und **Sole/Wasser-Wärmepumpen** relevant.

## Thermodynamisches Prinzip

Der Kreislauf hat vier Stationen: **Verdampfer** (nimmt Wärme aus der Quelle auf) → **Verdichter** (braucht Strom, hebt Druck und Temperatur) → **Verflüssiger** (gibt Wärme an den Heizkreis ab) → **Expansionsventil** (senkt den Druck) → zurück zum Verdampfer.

1. **Verdampfer:** Kältemittel verdampft bei niedrigem Druck, nimmt Wärme aus der Quelle auf
2. **Verdichter:** Komprimiert das Kältemittelgas → Temperatur steigt
3. **Verflüssiger:** Kältemittel kondensiert, gibt Wärme an den Heizkreis ab
4. **Expansionsventil:** Druckabfall, das Kältemittel kühlt stark ab und wird zu kaltem Nassdampf

## Quellentypen

| Typ               | Wärmequelle            | COP (typisch) | Bemerkungen                                |
| ----------------- | ---------------------- | ------------- | ------------------------------------------ |
| **Luft/Wasser**   | Aussenluft             | 2,5–4,5       | Einfache Installation, COP sinkt bei Kälte |
| **Sole/Wasser**   | Erdkollektor / Sonde   | 3,5–5,0       | Konstantere Quelltemperatur, aufwändiger   |
| **Wasser/Wasser** | Grundwasser / Abwasser | 4,0–6,0       | Höchste Effizienz, Genehmigung nötig       |

> ⚠️ **Luft/Wasser bei −10 °C:** COP sinkt auf ~2,0 oder darunter. Oft mit **Heizstab** (Elektro-Direktheizung) als Notfallheizung kombiniert — dieser hat COP 1,0 und sollte möglichst selten laufen.

## Leistungskennzahlen

### COP (Coefficient of Performance)

**Momentan-Wirkungsgrad** bei einem Betriebspunkt:

<p class="formel">COP = Q<sub>Heiz</sub> / P<sub>el</sub></p>

- `Q_Heiz` = abgegebene Heizleistung [kW]
- `P_el` = aufgenommene elektrische Leistung [kW]

**Normprüfpunkt** nach EN 14511 typisch: A7/W35 (Luft 7 °C, Vorlauf 35 °C)

### SCOP (Seasonal COP)

**Jahres-Wirkungsgrad** über die gesamte Heizperiode nach EN 14825 — praxisnäher als COP, denn er berücksichtigt:

- Verschiedene Aussentemperaturen
- Teillastbetrieb
- Abtauzyklen (bei L/W-WP)
- Hilfsenergie (Pumpen, Steuerung)

Typische SCOP-Werte:

- L/W-WP mit Niedertemperatur-Heizkreis: **3,0–4,5**
- Sole/W-WP: **4,0–5,5**

### Jahresarbeitszahl (JAZ)

COP und SCOP beschreiben die Maschine, die **JAZ** die ganze Anlage im Betrieb: gemessene Wärme eines Jahres geteilt durch den gemessenen Strom. Was dabei mitgezählt wird, muss man festlegen: nur Verdichter und Steuerung, dazu Sole- oder Brunnenpumpe beziehungsweise Ventilator, dazu der Heizstab, dazu die Ladepumpen. Je mehr mitgezählt wird, desto tiefer die Zahl. Wer eine JAZ angibt, sollte die Bilanzgrenze dazuschreiben.

Die Siemens-Unterlage nennt als Praxiswerte etwa **2.9 für Luft/Wasser** und **3.9 für Sole/Wasser**. Gute neue Anlagen mit Bodenheizung liegen deutlich darüber, schlecht eingestellte Anlagen darunter. Für die Messung braucht es einen Wärmezähler nach der Wärmepumpe und einen Stromzähler, der die Hilfsantriebe einschliesst. Das gehört ins Messkonzept, schon in der Planung.

## Betriebsarten

| Betriebsart      | Beschreibung                                                                                       |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| **Heizbetrieb**  | Raumheizung via Heizkurve (witterungsgeführt)                                                      |
| **Kühlbetrieb**  | Aktiv (Kältemaschinen-Modus) oder passiv (Natural Cooling bei Sole/W)                              |
| **WW-Bereitung** | Brauchwarmwasser, typisch bis 55 °C, bei Legionellenschutz bis 60 °C                               |
| **Abtauung**     | L/W-WP: Verdampfer vereist vor allem zwischen etwa −5 und +5 °C bei feuchter Luft, WP taut kurz ab |
| **Standby**      | Frostschutz, minimale Zirkulation                                                                  |

## Hydraulikschema (vereinfacht)

- Die Wärmepumpe lädt über ein **Umschaltventil** entweder den **Pufferspeicher** für die Heizung oder den **Warmwasserspeicher**.
- Aus dem Puffer versorgen **Heizkreise mit Pumpe und Mischventil** die Räume, siehe [Pufferspeicher](/wissen/pufferspeicher).
- Warmwasser hat meist Vorrang, die Heizung wartet so lange auf den Puffer.

- **Pufferspeicher:** Entkoppelt WP-Takt von Heizkreis, ermöglicht Mindestlaufzeit
- **Mindestlaufzeit:** 10–20 min, um den Verdichter zu schonen (Kurzzyklen schädlich!)
- **Hydraulische Weiche / Puffer:** Bei mehreren Heizkreisen mit verschiedenen Temperaturniveaus

> ⚠️ **Kurzzyklen** (< 3 min) schaden dem Verdichter massiv. Pufferspeicher dimensionieren!

## Monovalent oder bivalent

| Betriebsweise             | Wer deckt die Last                                                        | Hydraulik der Zusatzheizung                        |
| ------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| **Monovalent**            | die Wärmepumpe allein, auch am kältesten Tag                              | keine                                              |
| **Monoenergetisch**       | Wärmepumpe, an wenigen kalten Tagen ein elektrischer Heizstab dazu        | Heizstab im Speicher oder Vorlauf                  |
| **Bivalent-alternativ**   | bis zum Bivalenzpunkt die Wärmepumpe, darunter nur noch die Zusatzheizung | **parallel**, kein Wasser durch den Kondensator    |
| **Bivalent-parallel**     | bis zum Bivalenzpunkt die Wärmepumpe, darunter beide gemeinsam            | **in Reihe**, die Zusatzheizung wärmt nach         |
| **Bivalent-teilparallel** | erst die Wärmepumpe, dann beide, bei grosser Kälte nur die Zusatzheizung  | beides möglich, je nach Betriebszustand umschalten |

Monovalent passt vor allem zu Erdsonden und Grundwasser, weil deren Temperatur im Winter kaum sinkt. Luft/Wasser-Wärmepumpen laufen oft monoenergetisch. Bei mehr als etwa vier Erdsonden oder grosser Leistung lohnt sich eine Simulation, damit das Erdreich über die Jahre nicht auskühlt. Im Sommer kann man es mit der Abwärme aus der Kühlung wieder laden.

Der Grund für die Hydraulik ist immer derselbe: Die Wärmepumpe hat eine **maximale Kondensator-Eintrittstemperatur**. Im alternativen Betrieb fährt der Kessel heisser, als die Wärmepumpe verträgt, darum darf kein Wasser mehr durch sie fliessen. Im parallelen Betrieb bekommt sie den kühlen Rücklauf und der Kessel heizt danach nach.

## Ein/Aus-Regelung und Betriebsgrenzen

Viele Wärmepumpen bis etwa 40 kW laufen nur **Ein/Aus**. Eingeschaltet wird nach der Temperatur im Puffer oder, ohne Puffer, nach dem Rücklauf. Ausgeschaltet wird, wenn der Rücklauf zum Kondensator die Betriebsgrenze erreicht. Beide Sollwerte sollten witterungsgeführt sein.

- **Starts begrenzen:** Jeder Start belastet Verdichter und Netz. Üblich sind höchstens etwa drei Starts pro Stunde, oft schreibt das Elektrizitätswerk die Zahl vor. Eine Mindestlaufzeit und eine Mindest-Stillstandszeit helfen.
- **Sperrzeiten des Elektrizitätswerks:** Während einer Sperre muss der Puffer das Gebäude versorgen. Er muss entsprechend gross sein und vor der Sperre geladen werden.
- **Leistungsregelung:** Ein Verdichter mit Drehzahlregelung (Inverter) arbeitet bei Teillast fast ohne Verluste. Heissgas-Bypass oder Saugdrossel reduzieren die Leistung, aber kaum den Strom. Sie ergeben schlechte Jahresarbeitszahlen.

**Betriebsgrenzen** schützen den Kältekreis:

- **Niederdruck:** Ist die Quelle zu kalt oder fliesst zu wenig Sole oder Grundwasser, fällt der Verdampfungsdruck und der Niederdruckwächter schaltet ab. Ursachen sind zu knappe Erdsonden, eine zu kleine Quellenpumpe, Kältemittelmangel oder ein vereister Verdampfer.
- **Hochdruck:** Wird die Wärme nicht abgenommen, steigt der Kondensationsdruck. Der Hochdruckwächter sitzt knapp unter der zulässigen Grenze, im Normalbetrieb sollte der Druck etwa 2 bar darunter bleiben. Ursachen sind ein zu warmer Rücklauf, eine zu kleine Heizungspumpe, geschlossene Thermostatventile oder eine falsch ausgelegte Warmwasserbereitung.

Die erreichbare Vorlauftemperatur liegt je nach Kondensator etwa 2 bis 5 K unter der Kondensationstemperatur des Kältemittels.

## Speicherladung

- **Schichtladung:** Der Speicher wird in einem Durchgang mit konstanter, hoher Vorlauftemperatur geladen. Ein schnelles Mischventil hält dazu den Kondensationsdruck knapp unter der Grenze. Ergibt eine saubere Schichtung und nutzt den Speicher voll aus.
- **Stufenladung:** Das Wasser läuft mehrmals durch, die Temperatur steigt jedes Mal um die Spreizung über den Kondensator. Einfacher, nur für kleine Anlagen mit einem Heizkreis.

**Ohne Pufferspeicher** geht es nur, wenn die Wärmepumpe annähernd konstante Leistung hat, das Abgabesystem viel Masse besitzt, etwa eine Bodenheizung, kaum Thermostatventile drosseln und die Anlage sauber abgeglichen ist. In den meisten Fällen ist ein kleiner Puffer die sicherere Lösung.

## Regelung & GA-Integration

### Steuerungsparameter (GA-relevante Datenpunkte)

| Datenpunkt             | Typ  | Beschreibung                             |
| ---------------------- | ---- | ---------------------------------------- |
| Betriebsart            | Soll | Heizen / Kühlen / WW / Off               |
| Vorlauf-Solltemperatur | Soll | Extern vorgeben (überschreibt Heizkurve) |
| Vorlauf-Isttemperatur  | Ist  | Rückmeldung aktuell                      |
| Rücklauf-Isttemperatur | Ist  | Differenz = Spreizung                    |
| Aussentemperatur       | Ist  | Für Heizkurve                            |
| Verdichter Laufmeldung | Ist  | Ein/Aus, Stufe oder Frequenz (Inverter)  |
| Heizstab aktiv         | Ist  | Zusatzheizung läuft                      |
| Störmeldung            | Ist  | Fehlercode                               |
| Speichertemperatur     | Ist  | Puffer oben/unten                        |
| SG-Ready-Eingang (1–4) | Soll | Smart-Grid-Steuerung                     |

### SG Ready (Smart Grid)

Schnittstelle des Bundesverbands Wärmepumpe, 4 Zustände über 2 digitale Eingänge. Mehr in [SG-Ready](/wissen/sg-ready).

| Zustand | E1  | E2  | Bedeutung                                          |
| ------- | --- | --- | -------------------------------------------------- |
| 1       | 1   | 0   | Sperre durch den Netzbetreiber                     |
| 2       | 0   | 0   | **Normalbetrieb**, auch ohne Beschaltung           |
| 3       | 0   | 1   | **Einschaltempfehlung** (WP läuft, Speicher laden) |
| 4       | 1   | 1   | **Anlaufbefehl** (Überschuss PV, Billigstrom)      |

Die GA kann über digitale Ausgänge die SG-Ready-Eingänge setzen — z.B. zur PV-Überschussnutzung.

### Inverter-WP

Moderne WP mit **Frequenzumrichter** am Verdichter können die Leistung stufenlos regulieren (z.B. 20–100 %). Vorteile:

- Kein Takten, Verdichter läuft durch
- Effizienter im Teillastbetrieb
- Leiser

GA-Sicht: Meist ist dennoch nur On/Off + Sollwert-Vorgabe möglich; interne Regelung übernimmt die FU-Steuerung.

## Abtauung (Luft/Wasser)

Bei Verdampfertemperaturen ≤ 0 °C bildet sich Reif. Die WP erkennt Abtaubedarf über:

- Zeitintervall (z.B. alle 60 min)
- Druckdifferenz am Verdampfer
- Temperaturdifferenz Umluft – Verdampfer

**Abtauvorgang:** WP reversiert den Kreislauf kurz (~2–10 min), heisses Kältemittel taut Verdampfer auf. Heizkreis wird in dieser Zeit vom Puffer versorgt.

> Während Abtauung sinkt Vorlauftemperatur kurz — die GLT sollte Alarme in diesem Zeitfenster unterdrücken.

## Häufige Fehler & Diagnose

| Problem                         | Mögliche Ursache                                                 |
| ------------------------------- | ---------------------------------------------------------------- |
| WP schaltet häufig kurz ein/aus | Pufferspeicher zu klein, Mindestlaufzeit nicht erreicht          |
| Hoher Heizstab-Anteil           | WP zu klein, Quellentemperatur zu niedrig, Abtaufehler           |
| WW nicht warm genug             | Nachheiztemperatur zu niedrig eingestellt (Legionellenschutz!)   |
| Druckfehler Hochdruck           | Verflüssiger verschmutzt, Heizkreispumpe defekt                  |
| Druckfehler Niederdruck         | Verdampfer vereist (Abtaufehler), Kältemittelmangel              |
| Keine Kälteleistung im Sommer   | Betriebsart Kühlen nicht aktiviert, Hydraulik nicht umgeschaltet |

## Normen und Quellen

- Siemens Schweiz AG: «Regeln und Steuern von Heizungsanlagen», Schulungsunterlage BT_0094, 2023, Kap. 7
- **EN 14511** — Prüfnormen, Prüfpunkte für Wärmepumpen
- **EN 14825** — SCOP-Berechnung (saisonale Effizienz)
- **VDI 4645** — Planung und Dimensionierung von WP-Anlagen
- **EN 12831** — Heizlastberechnung (Basis für WP-Dimensionierung)

<!-- EN -->

The **heat pump** extracts energy from a heat source (air, ground, water) and raises it to a usable temperature level. In BA, **air/water** and **brine/water heat pumps** are particularly relevant.

## Thermodynamic Principle

The cycle has four stations: **evaporator** (takes up heat from the source) → **compressor** (uses electricity, raises pressure and temperature) → **condenser** (releases heat to the heating circuit) → **expansion valve** (lowers the pressure) → back to the evaporator.

1. **Evaporator:** Refrigerant evaporates at low pressure, absorbs heat from source
2. **Compressor:** Compresses refrigerant gas → temperature rises
3. **Condenser:** Refrigerant condenses, transfers heat to heating circuit
4. **Expansion valve:** Pressure drops, the refrigerant cools sharply and becomes a cold liquid-vapour mixture

## Source Types

| Type            | Heat source                 | COP (typical) | Notes                                        |
| --------------- | --------------------------- | ------------- | -------------------------------------------- |
| **Air/water**   | Outdoor air                 | 2.5–4.5       | Easy installation; COP drops in cold weather |
| **Brine/water** | Ground collector / borehole | 3.5–5.0       | More stable source temperature; more complex |
| **Water/water** | Groundwater / waste water   | 4.0–6.0       | Highest efficiency; permit required          |

> ⚠️ **Air/water at −10 °C:** COP drops to ~2.0 or below. Often combined with an **electric immersion heater** (direct electric heating) as backup — this has COP 1.0 and should run as infrequently as possible.

## Performance Indicators

### COP (Coefficient of Performance)

**Instantaneous efficiency** at one operating point:

<p class="formel">COP = Q<sub>heat</sub> / P<sub>el</sub></p>

- `Q_heat` = heat output [kW]
- `P_el` = electrical power input [kW]

**Standard test point** per EN 14511 typically: A7/W35 (air 7 °C, supply 35 °C)

### SCOP (Seasonal COP)

**Annual efficiency** over the full heating season per EN 14825 — more realistic than COP, as it accounts for:

- Different outdoor temperatures
- Part-load operation
- Defrost cycles (for air/water HPs)
- Auxiliary energy (pumps, controls)

Typical SCOP values:

- Air/water HP with low-temperature circuit: **3.0–4.5**
- Brine/water HP: **4.0–5.5**

### Seasonal Performance Factor (SPF)

COP and SCOP describe the machine; the **SPF** (Swiss JAZ) describes the whole plant in operation: measured heat over a year divided by measured electricity. What is included must be defined: only compressor and controls, plus brine or well pump or fan, plus the immersion heater, plus the charging pumps. The more is included, the lower the figure. Anyone quoting an SPF should state the system boundary.

The Siemens document gives practical values of about **2.9 for air/water** and **3.9 for brine/water**. Good new systems with underfloor heating are well above that, poorly adjusted systems below. Measuring requires a heat meter after the heat pump and an electricity meter that includes the auxiliary drives. This belongs in the metering concept, already at the design stage.

## Operating Modes

| Mode            | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| **Heating**     | Space heating via heating curve (weather-compensated)                                                |
| **Cooling**     | Active (chiller mode) or passive (natural cooling with brine/water)                                  |
| **DHW heating** | Domestic hot water, typically to 55 °C; to 60 °C for Legionella protection                           |
| **Defrost**     | Air/water HP: evaporator ices up mainly between about −5 and +5 °C in humid air; HP defrosts briefly |
| **Standby**     | Frost protection, minimal circulation                                                                |

## Hydraulic Schematic (Simplified)

- Via a **diverting valve** the heat pump charges either the **buffer tank** for heating or the **hot water cylinder**.
- From the buffer, **heating circuits with pump and mixing valve** supply the rooms, see [Buffer Tank](/wissen/pufferspeicher).
- Hot water usually has priority; heating relies on the buffer meanwhile.

- **Buffer tank:** Decouples HP cycling from heating circuit; enables minimum run time
- **Minimum run time:** 10–20 min to protect the compressor (short-cycling is harmful!)
- **Hydraulic separator / buffer:** For multiple heating circuits at different temperature levels

> ⚠️ **Short-cycling** (< 3 min) severely damages the compressor. Size the buffer correctly!

## Monovalent or Bivalent

| Mode                         | Who covers the load                                                    | Hydraulics of the backup heater              |
| ---------------------------- | ---------------------------------------------------------------------- | -------------------------------------------- |
| **Monovalent**               | the heat pump alone, even on the coldest day                           | none                                         |
| **Mono-energetic**           | heat pump, plus an electric heater on a few cold days                  | immersion heater in tank or flow             |
| **Bivalent-alternative**     | heat pump down to the bivalence point, below it only the backup heater | **parallel**, no water through the condenser |
| **Bivalent-parallel**        | heat pump down to the bivalence point, below it both together          | **in series**, the backup heater tops up     |
| **Bivalent-partly parallel** | first the heat pump, then both, in severe cold only the backup heater  | both possible, switched by operating state   |

Monovalent suits ground probes and groundwater above all, because their temperature hardly drops in winter. Air/water heat pumps often run mono-energetically. With more than about four ground probes or a large output, a simulation is worthwhile so that the ground does not cool down over the years. In summer it can be recharged with the waste heat from cooling.

The reason for the hydraulics is always the same: the heat pump has a **maximum condenser inlet temperature**. In alternative mode the boiler runs hotter than the heat pump can tolerate, so no water may flow through it any more. In parallel mode it receives the cool return and the boiler tops up afterwards.

## On/Off Control and Operating Limits

Many heat pumps up to about 40 kW run **on/off** only. They are switched on according to the buffer temperature or, without a buffer, according to the return. They are switched off when the return to the condenser reaches the operating limit. Both setpoints should be weather-compensated.

- **Limit starts:** every start stresses the compressor and the grid. At most about three starts per hour is common; often the utility prescribes the number. A minimum run time and a minimum off time help.
- **Utility blocking periods:** during a block the buffer must supply the building. It must be large enough and charged before the block.
- **Capacity control:** a variable-speed compressor (inverter) works at part load with almost no losses. Hot-gas bypass or suction throttling reduce the output but hardly the power consumption. They give poor seasonal performance.

**Operating limits** protect the refrigerant circuit:

- **Low pressure:** if the source is too cold or too little brine or groundwater flows, the evaporating pressure drops and the low-pressure switch trips. Causes are undersized ground probes, too small a source pump, refrigerant shortage or an iced evaporator.
- **High pressure:** if the heat is not taken away, the condensing pressure rises. The high-pressure switch sits just below the permissible limit; in normal operation the pressure should stay about 2 bar below it. Causes are too warm a return, too small a heating pump, closed thermostatic valves or an incorrectly designed hot water system.

The achievable flow temperature is about 2 to 5 K below the refrigerant's condensing temperature, depending on the condenser.

## Storage Charging

- **Stratified charging:** the tank is charged in one pass at a constant, high flow temperature. A fast mixing valve keeps the condensing pressure just below the limit. Gives clean stratification and uses the tank fully.
- **Stepped charging:** the water passes through several times, the temperature rising each time by the spread across the condenser. Simpler, only for small systems with one heating circuit.

**Without a buffer tank** it only works if the heat pump has an almost constant output, the emitter system has a lot of mass, such as underfloor heating, hardly any thermostatic valves throttle and the system is properly balanced. In most cases a small buffer is the safer solution.

## Control and BA Integration

### Control Parameters (BA-Relevant Data Points)

| Data point                  | Type     | Description                                 |
| --------------------------- | -------- | ------------------------------------------- |
| Operating mode              | Setpoint | Heating / cooling / DHW / off               |
| Supply temperature setpoint | Setpoint | External override (overrides heating curve) |
| Supply temperature actual   | Actual   | Current feedback                            |
| Return temperature actual   | Actual   | Difference = spread                         |
| Outdoor temperature         | Actual   | For heating curve                           |
| Compressor run signal       | Actual   | On/off, stage or frequency (inverter)       |
| Immersion heater active     | Actual   | Backup heating running                      |
| Fault signal                | Actual   | Error code                                  |
| Buffer tank temperature     | Actual   | Upper/lower                                 |
| SG-Ready input (1–4)        | Setpoint | Smart grid control                          |

### SG Ready (Smart Grid)

Interface of the German Heat Pump Association, 4 states via 2 digital inputs. More in [SG Ready](/wissen/sg-ready).

| State | I1  | I2  | Meaning                                               |
| ----- | --- | --- | ----------------------------------------------------- |
| 1     | 1   | 0   | Block by the grid operator                            |
| 2     | 0   | 0   | **Normal operation**, also without wiring             |
| 3     | 0   | 1   | **Switch-on recommendation** (HP runs, charge buffer) |
| 4     | 1   | 1   | **Start command** (PV surplus, cheap electricity)     |

BA can set SG-Ready inputs via digital outputs — e.g. to utilise PV surplus.

### Inverter HP

Modern HPs with a **variable speed drive** on the compressor can modulate output continuously (e.g. 20–100 %). Advantages:

- No cycling; compressor runs continuously
- More efficient at part load
- Quieter

BA perspective: Usually only on/off + setpoint input is possible; internal control manages the VSD.

## Defrost (Air/Water)

At evaporator temperatures ≤ 0 °C, frost forms. The HP detects defrost demand via:

- Time interval (e.g. every 60 min)
- Differential pressure at evaporator
- Temperature difference between ambient air and evaporator

**Defrost cycle:** HP briefly reverses the circuit (~2–10 min); hot refrigerant thaws the evaporator. The buffer tank supplies the heating circuit during this period.

> During defrost, supply temperature drops briefly — the BMS should suppress alarms during this window.

## Common Faults and Diagnosis

| Problem                     | Possible cause                                           |
| --------------------------- | -------------------------------------------------------- |
| HP cycles on/off frequently | Buffer too small; minimum run time not reached           |
| High immersion heater usage | HP undersized; source temperature too low; defrost fault |
| DHW not warm enough         | Reheat temperature set too low (Legionella protection!)  |
| High-pressure fault         | Condenser fouled; heating circuit pump failed            |
| Low-pressure fault          | Evaporator iced (defrost fault); refrigerant shortage    |
| No cooling in summer        | Cooling mode not activated; hydraulics not switched      |

## Standards and Sources

- Siemens Schweiz AG: "Regeln und Steuern von Heizungsanlagen", training document BT_0094, 2023, ch. 7
- **EN 14511** — Test standards, test points for heat pumps
- **EN 14825** — SCOP calculation (seasonal efficiency)
- **VDI 4645** — Planning and sizing of heat pump systems
- **EN 12831** — Heating load calculation (basis for HP sizing)
