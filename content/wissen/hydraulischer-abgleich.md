---
title: Hydraulischer Abgleich
title_en: Hydraulic Balancing
slug: hydraulischer-abgleich
category: heizung
subcategory: hydraulik
tags: [hydraulischer-abgleich, voreinstellung, thermostatventil, strangregulierung, differenzdruck, δp-regler, heizkreis, durchfluss, überströmventil, pumpenauslegung, en14336]
difficulty: fortgeschritten
area: [hlk]
related: [druckverlust, heizkurve, waermepumpe]
norm: [EN 14336, DIN EN ISO 52120, GEG]
updated: 2026-05-14
lang: de
---

# Hydraulischer Abgleich

Der **hydraulische Abgleich** sorgt dafür, dass jeder Heizkreis exakt die berechnete Wassermenge erhält — nicht mehr, nicht weniger. Ohne Abgleich fliessen grosse Mengen durch kurze/warme Kreise, während entfernte Kreise auskühlen.

## Warum ist er wichtig?

- **Energiesparen:** Pumpen können kleiner dimensioniert / gedrosselt werden (hydraulisch nahe Kreise nicht überversorgen)
- **Komfort:** Gleichmässige Raumtemperaturen, kein Überheizen/Unterheizen
- **Gesetzlich:** Seit GEG (ehem. EnEV) bei Heizungsanlagen ab 50 kW Pflicht bei Sanierung
- **Wärmepumpen:** Besonders kritisch — WP braucht niedrige Vorlauftemperatur, Überströmung erhöht Spreizung, senkt COP

## Methoden

### Methode 1 — Einfache Voreinstellung (T-Abgleich)

Jedes Heizkörperventil oder Strangventil wird auf einen **vorberechneten Kv-Wert** eingestellt. Die Voreinstellung entspricht dem hydraulischen Widerstand für den berechneten Volumenstrom.

**Vorgehen:**
1. Heizlastberechnung nach EN 12831 → Normheizlast je Raum
2. Aus Vorlauf-/Rücklauftemperatur → Normvolumenstrom je Heizkörper: `V̇ = Q / (c_p · ρ · ΔT)`
3. Aus Normvolumenstrom + verfügbarer Druckdifferenz → Ventil-Voreinstellung
4. Ventile einstellen

### Methode 2 — Mess-Abgleich (Durchflussmessung)

Präziser: Volumenstrom je Kreis messen, Einstellwerte iterativ anpassen bis Sollwerte erreicht.

**Messgeräte:** Ultraschall-Clamp-on, magnetisch-induktiv, Differenzdruck-Durchflussmesser

### Methode 3 — Digitaler Abgleich

Moderne Systeme (z.B. Danfoss Eco, IMI Hydronic Engineering TA-Balance) messen und berechnen automatisch. App-basierte Protokollierung.

## Ventiltypen

### Voreinstellbare Heizkörperventile

Thermostatventil mit einstellbarem **Voreinstellkv**:
- Einstellbereich typisch 1–8 (entspricht Kv 0,07–0,95 m³/h)
- Hersteller: Danfoss, IMI Heimeier, Oventrop

### Strangregulierventile (SRV)

Absperr- + Regulierventil für jeden Heizkreisstrang oder jede Steigeleitung:
- Mit Messventilen für Differenzdruck-Durchflussmessung
- Hersteller: TA Hydronics, Oventrop, Danfoss

### Differenzdruckregler (DDR / ΔP-Regler)

Halten den Differenzdruck am Strang / am Verteiler konstant, unabhängig vom Pumpendruck:

```
Heizkreisverteiler
  ├── Strang A ─── ΔP-Regler A ─── Heizkörper 1…n
  ├── Strang B ─── ΔP-Regler B ─── Heizkörper 1…m
  └── Strang C ─── ΔP-Regler C ─── ...
```

- **Einstellung:** Differenzdruck (z.B. 10–30 kPa je Strang)
- **Vorteil:** Kompensiert Pumpdruckschwankungen, schützt Thermostatventile vor zu hohem Δp
- **Wichtig bei grossen Anlagen** mit variablem Volumenstrom (Thermostatventile regeln zu/auf)

### Überströmventil

Mindest-Volumenstrom sicherstellen wenn alle Thermostatventile zugeregelt sind. Verhindert Kavitation / Pumpenschäden bei kleinsten Volumenströmen.

> ⚠️ **Überströmventil ≠ Abgleich:** Es ist eine Sicherheitskomponente, kein Ersatz für den hydraulischen Abgleich!

## Pumpenauslegung nach Abgleich

Nach dem Abgleich kann (und soll) die Pumpe neu eingestellt werden:
- **Förderhöhe:** Nur noch der berechnete Nenndruckverlust des Auslegungskreises
- **Drehzahlregelung:** Proportionaldruckregelung oder konstantem Δp je nach Anlage

**Faustregel Energieeinsparung:** Halbierung des Volumenstroms → Viertelung der Pumpenleistung (kubisches Gesetz)!

## Berechnung Normvolumenstrom

$$\dot{V} = \frac{Q}{c_p \cdot \rho \cdot \Delta T}$$

| Grösse   | Wert (Wasser)                        |
|----------|--------------------------------------|
| c_p      | 4,182 kJ/(kg·K)                      |
| ρ        | 1000 kg/m³ (bei 50 °C: 988 kg/m³)   |
| ΔT       | Vorlauf − Rücklauf (z.B. 10 K)       |

**Beispiel:** Heizkörper 1 kW, VL/RL 60/50 °C (ΔT = 10 K):

`V̇ = 1000 / (4182 · 988 · 10) ≈ 0,024 l/s = 1,45 l/min = 86 l/h`

## GA-Relevanz

Der hydraulische Abgleich ist selten direkt in der GA-Messwarte sichtbar — aber die Folgen fehlenden Abgleichs schon:

- Ungleichmässige Raumtemperaturen (Klagen der Nutzer)
- Erhöhte Vorlauftemperatur wegen schlechter Wärmeübertragung in entfernten Kreisen
- Hoher Pumpenstrom trotz mässiger Heizleistung
- Wärmepumpe taktet häufig oder Heizstab springt an

**Diagnose via GA:** Vergleich Vorlauf-/Rücklauftemperaturen je Strang, Volumenstrom-Messwerte (falls vorhanden), Pumpenstrom.

## Protokoll & Dokumentation

Nach dem Abgleich ist ein **Abgleichprotokoll** zu erstellen:
- Ventiltyp, Einstellwert, Volumenstrom-Ist / -Soll je Heizkörper / Strang
- Gesamtvolumenstrom, Pumpenkennpunkt
- Datum, Ausführender, Unterschrift

**Wichtig für:**
- Gewährleistung
- Übergabe an Betreiber
- Nachweis gegenüber Energieberater / Gutachter (GEG-Pflicht)

## Normen

- **EN 14336** — Hydraulischer Abgleich Heizungsanlagen, Inbetriebnahme
- **DIN EN ISO 52120** — Energieeffizienz durch GA (früher DIN V 18599-11)
- **GEG §60** — Pflicht hydraulischer Abgleich bei Heizungsmodernisierungen
- **VDI 2073** — Hydraulische Schaltungen in Wärmepumpenanlagen

<!-- EN -->

**Hydraulic balancing** ensures that every heating circuit receives exactly the calculated water flow — no more, no less. Without balancing, large flows pass through short or warm circuits while remote circuits stay cold.

## Why Is It Important?

- **Energy savings:** Pumps can be sized smaller / throttled (nearby circuits are not over-supplied)
- **Comfort:** Even room temperatures, no overheating or under-heating
- **Legal requirement:** Mandatory under the GEG (formerly EnEV) for heating systems ≥ 50 kW when renovating
- **Heat pumps:** Especially critical — heat pumps need low flow temperatures; excess flow increases temperature spread and lowers COP

## Methods

### Method 1 — Simple Presetting (T-Balancing)

Every radiator valve or circuit valve is set to a **pre-calculated Kv value**. The presetting corresponds to the hydraulic resistance needed for the calculated flow rate.

**Procedure:**
1. Heat load calculation per EN 12831 → design heat load per room
2. From supply/return temperature → design flow rate per radiator: `V̇ = Q / (c_p · ρ · ΔT)`
3. From design flow rate + available differential pressure → valve presetting
4. Set valves

### Method 2 — Measurement Balancing (Flow Measurement)

More precise: measure flow rate per circuit, iteratively adjust settings until target values are reached.

**Instruments:** Ultrasonic clamp-on, electromagnetic, differential-pressure flow meters

### Method 3 — Digital Balancing

Modern systems (e.g. Danfoss Eco, IMI Hydronic Engineering TA-Balance) measure and calculate automatically. App-based reporting.

## Valve Types

### Presettable Radiator Valves

Thermostatic valve with adjustable **presetting Kv**:
- Setting range typically 1–8 (corresponding to Kv 0.07–0.95 m³/h)
- Manufacturers: Danfoss, IMI Heimeier, Oventrop

### Circuit Balancing Valves (CBV)

Isolation + regulation valve for each heating circuit or riser:
- With measuring valves for differential-pressure flow measurement
- Manufacturers: TA Hydronics, Oventrop, Danfoss

### Differential Pressure Controllers (DPC / ΔP Controller)

Maintain constant differential pressure at the circuit or manifold, independent of pump pressure:

```
Heating manifold
  ├── Circuit A ─── ΔP controller A ─── Radiators 1…n
  ├── Circuit B ─── ΔP controller B ─── Radiators 1…m
  └── Circuit C ─── ΔP controller C ─── ...
```

- **Setting:** Differential pressure (e.g. 10–30 kPa per circuit)
- **Advantage:** Compensates for pump pressure fluctuations, protects thermostatic valves from excessive Δp
- **Important for large systems** with variable flow (thermostatic valves open and close)

### Bypass / Overflow Valve

Ensures minimum flow when all thermostatic valves are closed. Prevents cavitation and pump damage at minimum flow conditions.

> ⚠️ **Overflow valve ≠ balancing:** It is a safety component, not a substitute for hydraulic balancing!

## Pump Sizing After Balancing

After balancing, the pump should (and must) be re-set:
- **Head:** Only the calculated design pressure loss of the index circuit
- **Speed control:** Proportional pressure control or constant Δp, depending on the system

**Rule of thumb for energy savings:** Halving the flow rate → quarter of the pump power (cube law)!

## Calculating Design Flow Rate

$$\dot{V} = \frac{Q}{c_p \cdot \rho \cdot \Delta T}$$

| Parameter | Value (water) |
|-----------|--------------|
| c_p | 4.182 kJ/(kg·K) |
| ρ | 1000 kg/m³ (at 50 °C: 988 kg/m³) |
| ΔT | Supply − return (e.g. 10 K) |

**Example:** Radiator 1 kW, supply/return 60/50 °C (ΔT = 10 K):

`V̇ = 1000 / (4182 · 988 · 10) ≈ 0.024 l/s = 1.45 l/min = 86 l/h`

## BA Relevance

Hydraulic balancing is rarely directly visible in the BMS operator station — but the consequences of missing balancing are:

- Uneven room temperatures (user complaints)
- Elevated flow temperature due to poor heat transfer in remote circuits
- High pump current despite moderate heating output
- Heat pump cycling frequently or backup heater activating

**Diagnosis via BA:** Compare supply/return temperatures per circuit, flow rate readings (if available), pump current.

## Report and Documentation

After balancing, a **balancing report** must be prepared:
- Valve type, setting value, actual/target flow rate per radiator/circuit
- Total flow rate, pump operating point
- Date, technician, signature

**Required for:**
- Warranty
- Handover to building operator
- Evidence for energy consultant / auditor (GEG obligation)

## Standards

- **EN 14336** — Hydraulic balancing of heating systems, commissioning
- **DIN EN ISO 52120** — Energy efficiency through BA (formerly DIN V 18599-11)
- **GEG §60** — Mandatory hydraulic balancing for heating system modernisation
- **VDI 2073** — Hydraulic circuits in heat pump systems
