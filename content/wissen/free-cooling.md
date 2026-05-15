---
title: Free Cooling — Direkte und indirekte freie Kühlung
slug: free-cooling
category: klima
subcategory: freie-kuehlung
tags: [free-cooling, freie-kühlung, direkte-freie-kühlung, indirekte-freie-kühlung, economizer, bypass, kältemaschine, wärmetauscher, aussenluft, geochore, kühlenergie, effizienz, eer, cop, hvac]
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

| Datenpunkt                 | Typ | Einheit | Beschreibung               |
|----------------------------|-----|---------|----------------------------|
| T_Aussenluft               | AI  | °C      | Freigabebedingung          |
| T_Kälteträger VL Ist       | AI  | °C      | Kühlwasser-Vorlauf         |
| Free-Cooling Betrieb       | DI  | —       | Rückkühler aktiv           |
| Kältemaschine Freigabe     | DO  | —       | KM gesperrt bei FC         |
| Rückkühler Ventilator      | AO  | %       | Drehzahl 0–100 %           |
| Umschaltventil FC/KM       | DO  | —       | Klappe Free Cooling-Pfad   |
| Energie Free Cooling       | AI  | kWh     | Einsparungsmonitoring      |

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
