---
title: Wärmemengenzähler — Funktion, Einbau und Auslesung
slug: waermemengenzaehler
category: energie
subcategory: zaehler
tags: [wärmemengenzähler, wärmezähler, kältezähler, wmz, durchfluss, temperaturdifferenz, mbus, energiemessung, abrechnung, einbau, kalibrierung, ultraschall, flügelrad, wärmeleistung]
difficulty: fortgeschritten
area: [hlk, ga]
related: [mbus, sensoren, ems-lastmanagement, hydraulischer-abgleich]
norm: [EN 1434, MID (2014/32/EU), WELMEC 7.2]
updated: 2026-05-14
lang: de
---

# Wärmemengenzähler — Funktion, Einbau und Auslesung

Ein **Wärmemengenzähler (WMZ)** misst die übertragene Wärmemenge oder Kältemenge in einem hydraulischen Kreis. Er ist unverzichtbar für Energieabrechnung, Effizienzmonitoring und Lastmanagement.

## Messprinzip

```
Physikalische Grundformel:

Q [kWh] = V̇ [m³/h] × ρ [kg/m³] × cp [kJ/(kg·K)] × ΔT [K] × t [h] / 3600
```

Vereinfacht für Wasser (ρ × cp ≈ 4.18 kJ/(kg·K) → 1.163 kWh/(m³·K)):

```
Q [kWh] ≈ V̇ [m³/h] × 1.163 × ΔT [K] × Zeit
```

**Drei Komponenten** im Wärmemengenzähler:

```
Vorlauf →──[Durchflussmesser]──────────►
              ↑                          
          Volumen V̇         [Rechenwerk: integriert Q]
              ↑                          
         [Temp.fühler VL]  [Temp.fühler RL]
                               ↑
                   Rücklauf ←──────────
```

---

## Messprinzipien Durchfluss

| Prinzip         | Beschreibung                         | Genauigkeit | Einsatz                |
|-----------------|--------------------------------------|-------------|------------------------|
| **Ultraschall** | Laufzeitdifferenz                    | ±1–3 %      | Standard, wartungsfrei |
| **Flügelrad**   | Mechanisch, rotierend                | ±2–5 %      | Einfach, günstig       |
| **Magnetisch (MID)** | Induktiv                       | ±0.5–1 %    | Hohe Genauigkeit       |
| **Wirkdruckverfahren** | Blende/Venturi               | ±1–2 %      | Grosse DN              |

**Ultraschall** ist heute Standard — keine beweglichen Teile, daher wartungsarm und langlebig.

---

## Genauigkeitsklassen (EN 1434)

| Klasse | Genauigkeit  | Anwendung                         |
|--------|--------------|-----------------------------------|
| **1**  | ±5 %         | Einfache Systeme                  |
| **2**  | ±3–5 %       | Standard Wohnbau-Abrechnung       |
| **3**  | ±2 %         | Genauere Anwendungen              |
| **MI-004** | MID-konform | Abrechnungsrelevant (Pflicht CH/EU) |

**MID** (Measuring Instruments Directive, 2014/32/EU): Für Abrechnungszwecke muss WMZ MID-konform sein und darf nur durch geeichten Zähler ersetzt werden.

---

## Einbau-Anforderungen

### Einbauort

```
Vorlauf:  besser → höhere Genauigkeit (weniger Gasblasen)
Rücklauf: alternativ (oft einfacher)

Einbaulängen (Ultraschall):
  Vorlauf (Einlauf): mind. 5× DN gerades Rohr
  Nachlauf:          mind. 3× DN gerades Rohr
  
Nicht direkt nach:
  Pumpe, T-Stück, Ventil → Strömungsstörung → Messfehler
```

### Kugelhähne für Wartung

```
Vorlauf → [Kugelhahn] → [WMZ] → [Kugelhahn] → weiter
                              ↑
                         Bypass (optional, für Wartung ohne Abschaltung)
```

### Temperaturpaare

Beide Temperaturfühler (Vor- und Rücklauf) müssen **geeichtes Paar** sein (gleiche Kalibrierung → minimale Differenzfehler).

---

## Auslesung und Schnittstellen

| Schnittstelle | Beschreibung                                  | GA-Einsatz           |
|---------------|-----------------------------------------------|----------------------|
| **M-Bus**     | Primäres Protokoll für Zähler (EN 13757)      | Standard in CH/DE/EU |
| **wM-Bus**    | Funk-M-Bus (868 MHz)                          | Nachrüstung, Fernablesung |
| **Modbus RTU** | Alternativ bei neueren Geräten              | GA-Integration       |
| **Impulsausgang** | S0-Schnittstelle, 1 Impuls = x kWh       | Einfache Zählung     |
| **Optischer Ausgang** | IR-Auslesung (Ableseschwand)         | Manuelle Ablesung    |
| **Display**   | Lokale Anzeige                                | Vor-Ort-Kontrolle    |

### M-Bus Auslesung

```
GLT / M-Bus-Master → [M-Bus-Pegelwandler] → M-Bus-Linie → WMZ (Slave)

Zähler-Datenpunkte (EN 13757):
  - Wärmemenge kumuliert [kWh]
  - Volumenstrom [m³/h]
  - Vorlauftemperatur [°C]
  - Rücklauftemperatur [°C]
  - Leistung [kW]
  - Betriebsstunden [h]
  - Datums-/Zeitstempel
```

---

## Kalibrierung und Eichung

**Kalibrierung:** Hersteller kalibriert bei Produktion, Zertifikat liegt bei.
**Eichung:** Staatliche Eichung für Abrechnungszähler (Pflicht für Mieterabrechnung):

| Land | Eichperiode       | Behörde           |
|------|-------------------|-------------------|
| DE   | 5 Jahre           | Eichamt           |
| CH   | 5 Jahre (Ultraschall) / 2 Jahre (Flügelrad) | Metas / Kant. Eichamt |
| AT   | 5 Jahre           | BEV               |

---

## Typische GA-Datenpunkte WMZ

| Datenpunkt              | Einheit | Beschreibung                        |
|-------------------------|---------|-------------------------------------|
| Wärmemenge kumuliert    | kWh     | Energiezählerstand                  |
| Volumenmenge kumuliert  | m³      | Volumenzählerstand                  |
| Aktuelle Leistung       | kW      | Momentanleistung                    |
| Aktueller Volumenstrom  | m³/h    | Momentan-Durchfluss                 |
| Vorlauftemperatur       | °C      |                                     |
| Rücklauftemperatur      | °C      |                                     |
| Temperaturdifferenz ΔT  | K       | Berechnet (VL − RL)                 |
| Fehlercode              | —       | Zähler-Statusbyte                   |

---

## Normen

- **EN 1434** — Wärmezähler, Anforderungen, Prüfung, Kennzeichnung
- **MID 2014/32/EU** — Messgeräterichtlinie (Abrechnungspflicht)
- **EN 13757** — M-Bus Kommunikationsprotokoll für Zähler
- **WELMEC 7.2** — Leitfaden zur Anwendung der MID für Wärmezähler
