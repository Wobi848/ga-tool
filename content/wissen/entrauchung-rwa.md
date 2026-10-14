---
title: Entrauchung und RWA — Rauchabzugsanlagen
title_en: Smoke Extraction and SHEV — Smoke and Heat Exhaust Systems
slug: entrauchung-rwa
category: lueftung
subcategory: brandschutz
tags:
  [
    entrauchung,
    rwa,
    rauchabzug,
    rauchabzugsanlage,
    nrwa,
    mrwa,
    überdruck,
    unterdruck,
    brandschutz,
    feuerwehr,
    freigabe,
    verriegelung,
    bsk,
    lüftungsanlage,
    sicherheitsbeleuchtung,
    vds2098
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [brandschutzklappen, rlt-anlage, zonendruckhaltung, glt-grundlagen, alarmmanagement]
norm: [EN 12101, VDI 6019, MBO, SIA 181, VKF]
updated: 2026-05-15
lang: de
---

# Entrauchung und RWA — Rauchabzugsanlagen

Rauchabzugsanlagen (RWA = Rauch- und Wärmeabzugsanlagen) sind sicherheitskritische Systeme. Ihr Versagen kann Leben kosten. Die Steuerung und Verriegelung mit der Lüftungsanlage muss korrekt implementiert sein.

## Grundprinzip und Typen

### Natürliche RWA (NRWA)

Heisser Rauch steigt durch seinen Auftrieb nach oben. Öffnungen im Dach oder oben in der Wand lassen ihn hinaus, unten strömt frische Luft nach.

- Keine elektrische Energie für Entrauchung nötig (wichtig bei Ausfall)
- Rauchklappen: pneumatisch (CO₂-Patrone) oder elektrisch ausgelöst
- Zuluftzuführung: Türen, Fenster, Zulufttore unten

### Maschinelle RWA (MRWA)

Ventilatoren saugen den Rauch ab und fördern ihn ins Freie. Gleichzeitig muss Luft nachströmen, über Öffnungen oder eine eigene Zuluftanlage.

- Für unterirdische Parkgaragen, Tunnel, Grossräume ohne Oberlicht
- Leistungsstarke Ventilatoren (Hochtemperatur-Ventilatoren 300 °C / 1 h oder 400 °C / 2 h)
- Druckdifferenz-Steuerung bei Treppenhäusern

---

## Komponenten

| Komponente                | Funktion                                     |
| ------------------------- | -------------------------------------------- |
| Rauchklappen (RKL)        | Öffnen für Rauchabzug (NC = Normally Closed) |
| Zuluftelemente            | Nachströmöffnungen unten                     |
| Brandschutzklappen (BSK)  | Verhindern Rauchausbreitung im Kanal (NC)    |
| RWA-Zentrale              | Auslösung, Überwachung, Meldung an GLT       |
| Hochtemperatur-Ventilator | Nur MRWA: fördert Rauch/Heissgas             |
| Handauslösetaster (HAT)   | Manuelle Auslösung an jeder Zone             |

---

## Auslösung und Steuerungslogik

Die **Brandmeldeanlage** löst aus und meldet an die **RWA-Steuerung**. Diese führt für den betroffenen Abschnitt aus:

1. Rauchabzugsöffnungen und Nachströmöffnungen **öffnen**
2. Brandschutzklappen **schliessen**
3. Lüftungsanlage **abschalten** oder in den Entrauchungsbetrieb umschalten, je nach Brandschutzkonzept
4. Zustand an die GLT melden
5. Zustand an die Brandmeldeanlage bzw. das Feuerwehrbedienfeld melden

**Priorität:** RWA-Zentrale hat **absoluten Vorrang** vor GA/GLT. Lüftungsregler darf RWA-Signal nicht überschreiben.

### Verriegelung mit Lüftungsanlage

Bei einem Brandsignal empfängt die DDC einen Eingang «Brand aktiv» und führt aus, was das **Brandschutzkonzept** verlangt, typisch:

- Aussen- und Zuluftklappen schliessen
- Umluft sperren, damit kein Rauch verteilt wird
- Lüftungsventilatoren aus
- Entrauchungsventilator starten, wenn vorhanden

**Ausnahme Überdruckanlagen** in Treppenhäusern: Deren Zuluftventilator läuft gerade im Brandfall, er hält den Überdruck.

---

## Zonenkonzept

Grosse Gebäude werden in **Rauchabschnitte (Zonen)** unterteilt:

Grosse Gebäude sind in **Rauchabschnitte** unterteilt, zum Beispiel EG West, EG Ost, OG West, Einstellhalle. Entraucht wird nur der betroffene Abschnitt, die anderen bleiben im Normalbetrieb oder werden gegen Raucheintritt geschützt.

**Handauslösetaster je Zone** — Feuerwehr kann gezielt Zonen auslösen.

---

## GA-Datenpunkte RWA / Entrauchung

| Datenpunkt                         | Typ | Einheit | Beschreibung                  |
| ---------------------------------- | --- | ------- | ----------------------------- |
| Brand-Alarm Zone 1                 | DI  | —       | BMZ / RWA-Zentrale Auslösung  |
| Entrauchung aktiv Zone 1           | DI  | —       | Rückmeldung RWA läuft         |
| Lüftung Betriebsart                | AV  | —       | Normal / Brand / Aus          |
| RWA-Zentrale Störung               | DI  | —       | Zentrale defekt / Netzausfall |
| Rauchklappe RKL-01 Status          | DI  | —       | Auf / Zu Rückmeldung          |
| Entrauchungsventilator             | DO  | —       | Ein/Aus                       |
| Entrauchungsventilator Laufmeldung | DI  | —       | Motorschutz-Rückmeldung       |

> ⚠️ RWA-Datenpunkte müssen in der GLT **im Alarm-Kanal "Kritisch"** konfiguriert sein. Keine Unterdrückung, keine Zeitverzögerung.

---

## Überdruck-Entrauchung (Treppenhäuser)

Fluchtwege (Treppenhäuser) werden unter **Überdruck** gehalten, damit kein Rauch eindringt:

- **Sollwert:** typisch etwa 50 Pa Überdruck des Treppenhauses gegenüber dem Brandgeschoss
- **Zuluft** von aussen in das Treppenhaus, geregelt über einen Differenzdrucksensor
- **Tür geht auf:** Der Druck fällt, die Regelung erhöht den Volumenstrom, damit an der offenen Tür eine Luftströmung vom Treppenhaus weg entsteht
- **Obergrenze:** Die Türöffnungskraft darf nicht über 100 N steigen, sonst bringt man die Türe nicht mehr auf. Darum gibt es Druckentlastung oder eine Begrenzung

---

## Normen und Anforderungen

| Norm           | Inhalt                                              |
| -------------- | --------------------------------------------------- |
| **EN 12101-1** | Rauchschürzen                                       |
| **EN 12101-2** | NRWA — natürliche Entrauchungsklappen               |
| **EN 12101-3** | MRWA — maschinelle Entrauchungsventilatoren         |
| **EN 12101-6** | Druckdifferenz-Systeme (Überdruck Fluchtwege)       |
| **VDI 6019**   | Maschinelle Entrauchung — Planung und Betrieb       |
| **MBO § 35**   | Notwendige Treppenhäuser (Rauchschutz)              |
| **VKF (CH)**   | Brandschutzrichtlinie Rauch- und Wärmeabzugsanlagen |

---

## Prüfpflichten

- **Jährlich**: Funktionsprüfung aller Rauchklappen und HAT
- **Halbjährlich**: Sichtprüfung aller mechanischen Teile
- **IBN-Protokoll**: Auslösung jeder Zone, Messung Abluftmengen, Druckdifferenzen
- **Dokumentation**: Alle Prüfungen protokollieren (Grundlage Versicherung, Behörden)

<!-- EN -->

Smoke and heat exhaust systems (SHEV) are safety-critical systems. Their failure can cost lives. Control logic and interlocking with the ventilation system must be implemented correctly.

## Basic Principle and Types

### Natural SHEV (NSHEV)

Hot smoke rises because of its buoyancy. Openings in the roof or high in the wall let it out; fresh air flows in at the bottom.

- No electrical power required for smoke extraction (important on power failure)
- Smoke vents: pneumatically (CO₂ cartridge) or electrically triggered
- Make-up air supply: doors, windows, air supply inlets below

### Mechanical SHEV (MSHEV)

Fans extract the smoke and discharge it outdoors. At the same time air must flow in, through openings or a dedicated supply system.

- For underground car parks, tunnels, large spaces without roof lights
- High-capacity fans (high-temperature fans 300 °C / 1 h or 400 °C / 2 h)
- Differential pressure control for stairwells

---

## Components

| Component                   | Function                                         |
| --------------------------- | ------------------------------------------------ |
| Smoke vents (SV)            | Open for smoke extraction (NC = Normally Closed) |
| Make-up air inlets          | Underfloor supply openings                       |
| Fire dampers (FD)           | Prevent smoke spread in duct (NC)                |
| SHEV control panel          | Triggering, monitoring, reporting to BMS         |
| High-temperature fan        | MSHEV only: extracts smoke/hot gas               |
| Manual release button (MRB) | Manual activation at each zone                   |

---

## Triggering and Control Logic

The **fire alarm system** triggers and reports to the **smoke control panel**, which carries out for the affected section:

1. **open** smoke vents and inlet openings
2. **close** fire dampers
3. **switch off** the ventilation system or switch it to smoke extraction mode, depending on the fire safety concept
4. report the state to the BMS
5. report the state to the fire alarm system or fire brigade panel

**Priority:** SHEV control panel has **absolute precedence** over BA/BMS. The ventilation controller must not override the SHEV signal.

### Interlocking with Ventilation System

On a fire signal the DDC receives an input "fire active" and executes what the **fire safety concept** requires, typically:

- close outdoor and supply air dampers
- block recirculation so no smoke is distributed
- ventilation fans off
- start the smoke extraction fan if present

**Exception pressurisation systems** in stairwells: their supply fan runs precisely during a fire to maintain overpressure.

---

## Zone Concept

Large buildings are divided into **smoke compartments (zones)**:

Large buildings are divided into **smoke sections**, for example ground floor west, ground floor east, upper floor west, car park. Only the affected section is smoke-extracted; the others remain in normal operation or are protected against smoke ingress.

**Manual release button per zone** — fire brigade can activate zones selectively.

---

## BA Data Points — SHEV / Smoke Extraction

| Data point                     | Type | Unit | Description                     |
| ------------------------------ | ---- | ---- | ------------------------------- |
| Fire alarm zone 1              | DI   | —    | FAP / SHEV panel activation     |
| Smoke extraction active zone 1 | DI   | —    | SHEV running feedback           |
| Ventilation operating mode     | AV   | —    | Normal / fire / off             |
| SHEV panel fault               | DI   | —    | Panel defective / power failure |
| Smoke vent SV-01 status        | DI   | —    | Open / closed feedback          |
| Smoke extraction fan           | DO   | —    | On/off                          |
| Smoke extraction fan run       | DI   | —    | Motor protection feedback       |

> ⚠️ SHEV data points must be configured in the BMS **in the "Critical" alarm channel**. No suppression, no time delay.

---

## Stairwell Pressurisation

Escape routes (stairwells) are maintained at **positive pressure** to prevent smoke ingress:

- **Setpoint:** typically about 50 Pa overpressure of the stairwell against the fire floor
- **Supply air** from outside into the stairwell, controlled via a differential pressure sensor
- **Door opens:** the pressure drops, the control increases the airflow so an air current away from the stairwell forms at the open door
- **Upper limit:** the door opening force must not exceed 100 N, otherwise the door can no longer be opened. Hence pressure relief or a limit

---

## Standards and Requirements

| Standard          | Content                                                  |
| ----------------- | -------------------------------------------------------- |
| **EN 12101-1**    | Smoke barriers                                           |
| **EN 12101-2**    | NSHEV — natural smoke vents                              |
| **EN 12101-3**    | MSHEV — mechanical smoke extraction fans                 |
| **EN 12101-6**    | Differential pressure systems (stairwell pressurisation) |
| **VDI 6019**      | Mechanical smoke extraction — planning and operation     |
| **MBO § 35** (DE) | Required stairwells (smoke protection)                   |
| **VKF** (CH)      | Swiss fire protection guidelines — smoke extraction      |

---

## Inspection Obligations

- **Annually:** Functional test of all smoke vents and MRBs
- **Semi-annually:** Visual inspection of all mechanical parts
- **Commissioning record:** Activation of each zone, measurement of exhaust volumes, pressure differentials
- **Documentation:** Record all inspections (basis for insurance, authorities)
