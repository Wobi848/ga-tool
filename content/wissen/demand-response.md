---
title: Demand Response — Flexible Lasten im Stromnetz
slug: demand-response
category: energie
subcategory: smart-grid
tags: [demand-response, demand-side-management, lastverschiebung, regelenergie, fcr, afrr, aggregator, usef, flexibility, smart-grid, peak-shaving, netzentlastung, spotmarkt, strompreis, industrial-dr]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, sg-ready, pv-integration, batteriespeicher, iso50001]
rechner: []
norm: [EU Richtlinie 2019/944, USEF Framework, IEC 61968, ENTSO-E]
updated: 2026-05-15
lang: de
---

# Demand Response — Flexible Lasten im Stromnetz

**Demand Response (DR)** bezeichnet die gezielte, zeitliche Anpassung des Stromverbrauchs von Verbrauchern als Reaktion auf Netzsignale, Preissignale oder Anforderungen des Netzbetreibers. Gebäude mit steuerbaren Lasten (Klimaanlage, Lüftung, Heizung, Batteriespeicher, Ladeinfrastruktur) können als flexible Netz-Ressource eingesetzt werden.

---

## Motivationen für Demand Response

| Akteur | Motivation |
|--------|-----------|
| **Netzbetreiber** | Frequenzstabilität, Engpassmanagement, Spitzenlastreduzierung |
| **Strombörse** | Ausgleich von Angebot und Nachfrage (EE-Volatilität) |
| **Gebäudebetreiber** | Reduzierung des Leistungspreises (Spitzenlasttarif), Erlöse aus Flexibilitätsvermarktung |
| **Aggregatoren** | Bündelung kleiner Flexibilitäten zu vermarktbaren Einheiten |

---

## DR-Arten

### Preisbasiertes DR (Price-Based DR)
Verbraucher reagieren auf variable Strompreise:
- **Time-of-Use (ToU)**: Festgelegte Hoch-/Niedertarifzeiten
- **Real-Time Pricing (RTP)**: Stündlicher Spotmarktpreis (EPEX SPOT)
- **Critical Peak Pricing (CPP)**: Stark erhöhter Preis an wenigen kritischen Stunden

### Anreizbasiertes DR (Incentive-Based DR)
Netzbetreiber zahlen für bereitgestellte Flexibilität:
- **FCR** (Frequency Containment Reserve): Sekundenreserve ±0,1 Hz, Reaktionszeit < 30 s
- **aFRR** (automatic Frequency Restoration Reserve): Minutenreserve, automatisch aktiviert
- **mFRR** (manual FRR): Manuelle Aktivierung, Reaktionszeit < 12,5 min
- **Redispatch 2.0 (DE)**: Netzbetreiber kann Verbraucher/Erzeuger direktsteuern

---

## Flexibilitätspotenziale in Gebäuden

| Anlage | Flexibilitätsdauer | Reaktionszeit | Bemerkung |
|-------|-------------------|---------------|-----------|
| Klimaanlage / Kühlung | 30–120 min | < 5 min | Thermische Masse = Puffer |
| Lüftungsanlage | 15–60 min | < 2 min | CO₂-Grenzwert beachten |
| Heizung (Wärmepumpe) | 60–240 min | < 10 min | Pufferspeicher nötig |
| Warmwasser (Heizstab) | 30–120 min | < 1 min | Einfachste Flexibilität |
| Batteriespeicher | 15 min–4h | < 1 s | Ideal für FCR/aFRR |
| E-Ladeinfrastruktur | 30–480 min | < 1 min | OCPP Smart Charging |
| Kältespeicher | 60–360 min | < 5 min | Gewerblich |

---

## Architektur: Aggregator-Modell

```
Gebäude A (100 kW flex.)
Gebäude B (50 kW flex.)    ────► Aggregator ────► Regelenergiemarkt
Gebäude C (80 kW flex.)                           (ENTSO-E / Swissgrid)
         │
    GA / EMS ◄──── DR-Signal (Aktivierung, Menge, Dauer)
         │
   Flexible Lasten
```

Der **Aggregator** bündelt Kleinflexibilitäten zu handelbaren Paketen (Mindestgrösse FCR: 1 MW). Er kommuniziert mit dem EMS über proprietäre APIs oder standardisierte Protokolle (CIM, USEF).

---

## USEF Framework

**Universal Smart Energy Framework** — europäisches Modell für die Vermarktung von Gebäude-Flexibilität:

| Rolle | Funktion |
|-------|---------|
| AGR (Aggregator) | Vermarktet Flexibilität am Markt |
| DSO (Verteilnetz-betreiber) | Kauft Flexibilität zur Netzentlastung |
| BRP (Balance Responsible Party) | Portfolioausgleich |
| Prosumer | Gebäude stellt Flexibilität bereit |

---

## DR in der GA — praktische Umsetzung

### Einfaches Price-Based DR
```
EMS prüft stündlich EPEX-Spot-Preis (via API):
  Wenn Preis < 5 ct/kWh:
    → Batterie laden, WP-Leistung erhöhen (SG-Ready Zustand 4)
  Wenn Preis > 25 ct/kWh:
    → Batterie entladen, HVAC reduzieren (innerhalb Komfortgrenzen)
```

### Peak-Shaving (Leistungspreisoptimierung)
```
EMS überwacht 15-min-Mittelwert am HAK:
  Wenn P_15min > P_Peak_Limit:
    → Batteriespeicher entladen
    → E-Autos auf Mindestladestrom reduzieren
    → Klimaanlage Sollwert +2 K anheben (temporär)
```

---

## Regulatorischer Rahmen (CH/DE)

| Land | Regelwerk |
|------|----------|
| Deutschland | Redispatch 2.0 (§ 13a EnWG), Regelenergiemarkt (BNetzA) |
| Schweiz | Regelenergiemarkt Swissgrid, Ancillary Services |
| EU | Clean Energy Package (EU 2019/944), ACER Guidelines |

In der Schweiz: DR-Teilnahme für Gebäude über Aggregatoren wie **Alpiq**, **BKW Energie**, **EDF Flexibilis** möglich — ab ca. 50 kW steuerbare Leistung wirtschaftlich.
