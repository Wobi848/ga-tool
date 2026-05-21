---
title: Free Cooling — Direkte und indirekte freie Kühlung
title_en: Free Cooling — Direct and Indirect Free Cooling
slug: free-cooling
category: klima
subcategory: freie-kuehlung
tags:
  [
    free-cooling,
    freie-kühlung,
    direkte-freie-kühlung,
    indirekte-freie-kühlung,
    economizer,
    bypass,
    kältemaschine,
    wärmetauscher,
    aussenluft,
    geochore,
    kühlenergie,
    effizienz,
    eer,
    cop,
    hvac
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, nachtauskuehlung, adiabatische-kuehlung, cop-eer, kaeltemittel, rlt-anlage]
norm: [EN 14511, EN 15232, SIA 382.1, VDI 2067]
updated: 2026-05-15
lang: de
---

# Free Cooling — Direkte und indirekte freie Kühlung

Free Cooling nutzt kalte Aussenluft oder Erdwärme zur Gebäudekühlung ohne mechanische Kältemaschine. Je nach Aussentemperatur können 30–80 % der Kühlenergie eingespart werden.

## Grundprinzip

```
Kältemaschine (aktiv): Strom → COP 3 → 1 kWh Strom = 3 kWh Kälte
Free Cooling (passiv):  Natur → COP >50 → nur Pumpen/Ventilatoren
```

**Aktivierungsbedingung:** T_Aussenluft < T_Rücklauf_Kälteträger (mit Sicherheitsmarge).

---

## Typen

### 1. Direkte Freie Kühlung (Air Economizer)

Aussenluft wird direkt zur Raumkühlung genutzt:

```
Sommer-Nacht / Übergangszeit:
  T_Aussen = 18 °C
  T_Raum_Soll = 22 °C

  → 100 % Aussenluft (Bypass über Wärmerückgewinnung)
  → Kältemaschine AUS
  → Lüftungs-Ventilator kühlt Gebäude
```

Regelung:

```
Wenn T_Aussen < T_Raum − 2 K:
  → Aussenluft-Klappe: 100 %
  → Umluft-Klappe: 0 %
  → WRG-Bypass öffnen (keine Wärmerückgewinnung nötig)
  → Kältemaschine: Freigabe gesperrt
```

Enthalpie-Kontrolle nötig (wenn feuchte Nächte):

```
Wenn h_Aussen < h_Raum − 3 kJ/kg:
  → Free Cooling aktiv
```

### 2. Indirekte Freie Kühlung (Fluid Economizer)

Kälteträger (Wasser / Glykol) wird über einen Rückkühler durch Aussenluft gekühlt:

```
Rücklauf Kühlwasser 14 °C
    → Rückkühler (wie Kühltower, aber Wasser-Luft-WT)
    → T_Aussen = 10 °C → Vorlauf Kühlwasser = 8 °C
    → Kältemaschine bypassed (Freie Kühlung über WT)
```

Vorteil: Gebäudeluft wird nicht direkt mit Aussenluft verbunden (Hygiene, Filterung).

**Schaltschemas:**

```
Variante A: Kältemaschine parallel zum WT (häufig):
  Freikühlung:  WT → Kühler → zurück
  Kombiniert:   WT + Kältemaschine parallel (Übergangssaison)
  Vollbetrieb:  Nur Kältemaschine (Hochsommer)

Variante B: Kältemaschine in Serie:
  WT kühlt vor → Kältemaschine kühlt nach → weniger Verdichterleistung
```

### 3. Geothermale Freie Kühlung (Passive Cooling)

Erdwärme-Anlage (Erdsonden, Grundwasser) liefert Kaltwasser ohne Wärmepumpe:

```
Sommer: Erde hat 12–14 °C (kühler als Aussenluft 30 °C)
    → Wärme aus Gebäude → Sonde → Erde
    → Nur Pumpenenergie: COP 50–100

Bedingung: Kühltemperatur > 16 °C (sonst Kondensation in Decken)
```

---

## Betriebsstunden-Analyse Schweiz

```
Jahresstunden Kühlung nötig (Büro, CH-Mittelland):
  Gesamt: ~1200 h/Jahr

  Free Cooling möglich (T_Aussen < 15 °C):  ~900 h = 75 %
  Nur Kältemaschine (T_Aussen > 20 °C):    ~200 h = 17 %
  Mischbetrieb:                             ~100 h =  8 %

→ Free Cooling kann 60–75 % der Kühlenergiekosten einsparen
```

---

## Steuerungslogik im DDC

```
Stufenlogik Free Cooling:

Stufe 1 — Volle Freie Kühlung:
  T_Aussen < T_Kälteträger_VL − 2 K
  → Rückkühler 100 %, Kältemaschine AUS

Stufe 2 — Gemischter Betrieb:
  T_Kälteträger_VL − 2 K < T_Aussen < T_Kälteträger_VL + 3 K
  → Rückkühler + Kältemaschine anteilig
  → Rückkühler trägt Grundlast, KM Spitzenlast

Stufe 3 — Nur Kältemaschine:
  T_Aussen > T_Kälteträger_VL + 3 K
  → Rückkühler unterstützend (Kondensatorkühlung)
```

---

## GA-Datenpunkte Free Cooling

| Datenpunkt             | Typ | Einheit | Beschreibung             |
| ---------------------- | --- | ------- | ------------------------ |
| T_Aussenluft           | AI  | °C      | Freigabebedingung        |
| T_Kälteträger VL Ist   | AI  | °C      | Kühlwasser-Vorlauf       |
| Free-Cooling Betrieb   | DI  | —       | Rückkühler aktiv         |
| Kältemaschine Freigabe | DO  | —       | KM gesperrt bei FC       |
| Rückkühler Ventilator  | AO  | %       | Drehzahl 0–100 %         |
| Umschaltventil FC/KM   | DO  | —       | Klappe Free Cooling-Pfad |
| Energie Free Cooling   | AI  | kWh     | Einsparungsmonitoring    |

---

## Wirtschaftlichkeit

```
Beispiel: 1000 m² Büro, 100 kW Kühlbedarf

Ohne Free Cooling:
  1200 h × 100 kW / 3.5 COP = 34.300 kWh Strom

Mit Free Cooling (70 % FC-Anteil):
  Nur KM:   300 h × 100 kW / 3.5 = 8.600 kWh
  FC-Pumpen: 900 h × 5 kW       =  4.500 kWh
  Total: 13.100 kWh (−62 % Strom)
```

---

## Normen

- **EN 14511** — Kältemaschinen, Wärmepumpen (Prüfbedingungen, Effizienz)
- **EN 15232** — Free Cooling als GA-Klasse-A-Funktion
- **SIA 382.1** — Energieoptimierte Lüftungs-/Klimaanlagen
- **VDI 2067** — Wirtschaftlichkeitsberechnungen für Gebäudetechnik

<!-- EN -->

Free cooling uses cold outdoor air or geothermal energy to cool a building without a mechanical chiller. Depending on outdoor temperature, 30–80 % of cooling energy can be saved.

## Basic Principle

```
Chiller (active): electricity → COP 3 → 1 kWh electricity = 3 kWh cooling
Free cooling (passive): nature → COP >50 → only pumps/fans
```

**Activation condition:** T_outdoor < T_chilled_water_return − safety margin.

---

## Types

### 1. Direct Free Cooling (Air Economiser)

Outdoor air is used directly for room cooling:

```
Summer night / shoulder season:
  T_outdoor = 18 °C
  T_room_setpoint = 22 °C

  → 100 % outdoor air (bypass around heat recovery)
  → Chiller OFF
  → Ventilation fan cools building
```

Control logic:

```
If T_outdoor < T_room − 2 K:
  → Outdoor air damper: 100 %
  → Recirculation damper: 0 %
  → Open HR bypass (heat recovery not needed)
  → Chiller: enable locked
```

Enthalpy check required (humid nights):

```
If h_outdoor < h_room − 3 kJ/kg:
  → Free cooling active
```

### 2. Indirect Free Cooling (Fluid Economiser)

Chilled water / glycol is cooled by outdoor air via a dry cooler:

```
Chilled water return 14 °C
    → Dry cooler (like cooling tower but water-air HX)
    → T_outdoor = 10 °C → chilled water supply = 8 °C
    → Chiller bypassed (free cooling via HX)
```

Advantage: building air is not directly connected to outdoor air (hygiene, filtration).

**Circuit variants:**

```
Variant A: Chiller in parallel with HX (common):
  Free cooling:  HX → cooler → return
  Combined:      HX + chiller in parallel (shoulder season)
  Full load:     Chiller only (peak summer)

Variant B: Chiller in series:
  HX pre-cools → chiller post-cools → less compressor power
```

### 3. Geothermal Free Cooling (Passive Cooling)

Ground source heat pump system (boreholes, groundwater) supplies cold water without heat pump:

```
Summer: ground at 12–14 °C (cooler than outdoor 30 °C)
    → Heat from building → borehole → ground
    → Only pump energy: COP 50–100

Condition: cooling temperature > 16 °C (otherwise condensation in ceilings)
```

---

## Operating Hours Analysis — Switzerland

```
Annual cooling hours needed (office, CH midlands):
  Total: ~1200 h/year

  Free cooling possible (T_outdoor < 15 °C):  ~900 h = 75 %
  Chiller only (T_outdoor > 20 °C):           ~200 h = 17 %
  Mixed operation:                             ~100 h =  8 %

→ Free cooling can save 60–75 % of cooling energy costs
```

---

## Control Logic in DDC

```
Staged free cooling logic:

Stage 1 — Full free cooling:
  T_outdoor < T_chilled_water_supply − 2 K
  → Dry cooler 100 %, chiller OFF

Stage 2 — Mixed operation:
  T_chilled_water_supply − 2 K < T_outdoor < T_chilled_water_supply + 3 K
  → Dry cooler + chiller proportionally
  → Dry cooler handles base load, chiller handles peak

Stage 3 — Chiller only:
  T_outdoor > T_chilled_water_supply + 3 K
  → Dry cooler supports condenser cooling only
```

---

## BA Data Points — Free Cooling

| Data point                    | Type | Unit | Description              |
| ----------------------------- | ---- | ---- | ------------------------ |
| T_outdoor                     | AI   | °C   | Enable condition         |
| T_chilled water supply actual | AI   | °C   | Chilled water supply     |
| Free cooling operation        | DI   | —    | Dry cooler active        |
| Chiller enable                | DO   | —    | Chiller locked during FC |
| Dry cooler fan                | AO   | %    | Speed 0–100 %            |
| FC/chiller changeover valve   | DO   | —    | Damper free cooling path |
| Free cooling energy           | AI   | kWh  | Savings monitoring       |

---

## Economic Viability

```
Example: 1000 m² office, 100 kW cooling demand

Without free cooling:
  1200 h × 100 kW / 3.5 COP = 34,300 kWh electricity

With free cooling (70 % FC share):
  Chiller only:  300 h × 100 kW / 3.5 = 8,600 kWh
  FC pumps:      900 h × 5 kW         = 4,500 kWh
  Total: 13,100 kWh (−62 % electricity)
```

---

## Standards

- **EN 14511** — Chillers, heat pumps (test conditions, efficiency)
- **EN 15232** — Free cooling as BA class A function
- **SIA 382.1** — Energy-optimised ventilation/air-conditioning systems
- **VDI 2067** — Economic efficiency calculations for building services
