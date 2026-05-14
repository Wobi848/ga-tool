---
title: Hydraulischer Abgleich
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
