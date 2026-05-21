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

```
Wärme → Rauch steigt auf → Auftriebskraft
    ↓
Rauchklappen im Dach / obere Wandbereiche öffnen
    ↓
Rauch strömt aus → Frischluft strömt unten nach
```

- Keine elektrische Energie für Entrauchung nötig (wichtig bei Ausfall)
- Rauchklappen: pneumatisch (CO₂-Patrone) oder elektrisch ausgelöst
- Zuluftzuführung: Türen, Fenster, Zulufttore unten

### Maschinelle RWA (MRWA)

```
Ventilator saugt Rauch ab → Abluft nach aussen
Gleichzeitig: Zuluft durch separate Anlage oder Öffnungen
```

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

```
Brandmeldezentrale (BMZ) → RWA-Zentrale
    ↓ Meldergruppe auslöst
    ↓
RWA-Zentrale:
  1. Rauchklappen in Brandabschnitt ÖFFNEN
  2. Brandschutzklappen in Abschnitt SCHLIESSEN
  3. Lüftungsanlage ABSCHALTEN (oder Umschaltung auf Entrauchung)
  4. Meldung an GLT (Störung / Betriebsart "Brand")
  5. Meldung an BMA (für Feuerwehr-Tableau)
```

**Priorität:** RWA-Zentrale hat **absoluten Vorrang** vor GA/GLT. Lüftungsregler darf RWA-Signal nicht überschreiben.

### Verriegelung mit Lüftungsanlage

```
Normal-Betrieb Lüftung:
  RLT läuft normal, BSK offen

Brand-Auslösung:
  RWA-Signal → DDC empfängt DI "Brand aktiv"
    → Zuluft-Klappen SCHLIESSEN
    → Umluft SPERREN (kein Rauchkreislauf)
    → Lüftungs-FU auf 0 (Abschaltung)
    → Entrauchungsventilator STARTEN (wenn vorhanden)

  AUSNAHME: Überdruckanlagen Treppenhaus
    → Zuluft-Ventilator WEITERLÄUFT (hält Überdruck aufrecht)
```

---

## Zonenkonzept

Grosse Gebäude werden in **Rauchabschnitte (Zonen)** unterteilt:

```
Zone 1: EG West
Zone 2: EG Ost
Zone 3: OG West
Zone 4: Parkgarage

Auslösung: Nur betroffene Zone entraucht
Andere Zonen: bleiben im Normalbetrieb (Verhinderung Rauchausbreitung)
```

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

```
Treppenhaus-Überdruckanlage:
  Sollwert: 50 Pa Überdruck gegenüber Brandabschnitt
  Ventilator: Zuluft von aussen → Treppenhaus
  Regelung: Druckdifferenzsensor Treppenhaus / Korridor

  Türöffnung: Druck fällt kurz → Regelung erhöht Volumenstrom
  Max. Druck: 80 Pa (sonst Türe nicht mehr öffenbar → max. 100 N Öffnungskraft)
```

---

## Normen und Anforderungen

| Norm           | Inhalt                                        |
| -------------- | --------------------------------------------- |
| **EN 12101-1** | Schlauchabschlüsse, Anforderungen RWA         |
| **EN 12101-2** | NRWA — natürliche Entrauchungsklappen         |
| **EN 12101-3** | MRWA — maschinelle Entrauchungsventilatoren   |
| **EN 12101-6** | Druckdifferenz-Systeme (Überdruck Fluchtwege) |
| **VDI 6019**   | Maschinelle Entrauchung — Planung und Betrieb |
| **MBO § 35**   | Notwendige Treppenhäuser (Rauchschutz)        |
| **VKF (CH)**   | Brandschutzrichtlinien Schweiz — Entrauchung  |

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

```
Heat → smoke rises → buoyancy force
    ↓
Smoke vents in roof / upper wall areas open
    ↓
Smoke exits → fresh air enters from below
```

- No electrical power required for smoke extraction (important on power failure)
- Smoke vents: pneumatically (CO₂ cartridge) or electrically triggered
- Make-up air supply: doors, windows, air supply inlets below

### Mechanical SHEV (MSHEV)

```
Fan extracts smoke → exhaust to outside
Simultaneously: fresh air via separate system or openings
```

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

```
Fire alarm panel (FAP) → SHEV control panel
    ↓ Detector group activates
    ↓
SHEV control panel:
  1. OPEN smoke vents in fire compartment
  2. CLOSE fire dampers in compartment
  3. SWITCH OFF ventilation (or switch to smoke extraction mode)
  4. Report to BMS (fault / operating mode "fire")
  5. Report to FAP (for fire brigade panel)
```

**Priority:** SHEV control panel has **absolute precedence** over BA/BMS. The ventilation controller must not override the SHEV signal.

### Interlocking with Ventilation System

```
Normal ventilation operation:
  AHU runs normally, FDs open

Fire activation:
  SHEV signal → DDC receives DI "Fire active"
    → Close supply air dampers
    → Disable recirculation (no smoke recirculation)
    → VSD to 0 (shutdown)
    → Start smoke extraction fan (if present)

  EXCEPTION: Stairwell pressurisation systems
    → Supply fan CONTINUES RUNNING (maintains positive pressure)
```

---

## Zone Concept

Large buildings are divided into **smoke compartments (zones)**:

```
Zone 1: Ground floor west
Zone 2: Ground floor east
Zone 3: First floor west
Zone 4: Car park

Activation: Only affected zone is smoke-extracted
Other zones: remain in normal operation (prevent smoke spread)
```

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

```
Stairwell pressurisation system:
  Setpoint: 50 Pa positive pressure relative to fire compartment
  Fan: fresh air from outside → stairwell
  Control: differential pressure sensor stairwell / corridor

  Door opening: pressure drops briefly → control increases volume flow
  Max. pressure: 80 Pa (otherwise door cannot be opened → max. 100 N opening force)
```

---

## Standards and Requirements

| Standard          | Content                                                  |
| ----------------- | -------------------------------------------------------- |
| **EN 12101-1**    | Hose assemblies, SHEV requirements                       |
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
