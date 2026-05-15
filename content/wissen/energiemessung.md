---
title: Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ
slug: energiemessung
category: energie
subcategory: grundlagen
tags: [wirkleistung, blindleistung, scheinleistung, cos-phi, leistungsfaktor, kwh, kvar, kva, energiezähler, mbus, modbus, oberwellen, thd, powerfactor, q, p, s]
difficulty: fortgeschritten
area: [ga, elektro]
related: [ems-lastmanagement, waermemengenzaehler, mbus]
norm: [IEC 62053, EN 50160, IEC 61000-4-30]
updated: 2026-05-14
lang: de
---

# Energiemessung Grundlagen — Wirkleistung, Blindleistung, cos φ

Elektrische Energiemessung in der GA liefert die Daten für EMS, ISO 50001 und Abrechnung. Das Verständnis von Wirk-, Blind- und Scheinleistung ist Grundlage für korrekte Messung und Bewertung.

## Die drei Leistungsarten

### Wirkleistung P [W, kW]

**Nutzbare Leistung** — die tatsächlich verbrauchte Energie:

```
P = U × I × cos(φ)   [W]
```

- Heizt, dreht Motoren, leuchtet
- Vom Energieversorger abgerechnet
- Einheit: Watt (W), Kilowatt (kW)

### Blindleistung Q [var, kvar]

**Pendelt zwischen Generator und Last** — nötig für Magnetfelder (Motoren, Transformatoren), macht keine Nutzarbeit:

```
Q = U × I × sin(φ)   [var]
```

- Belastet das Netz (Leitungen, Transformatoren)
- Wird vom Energieversorger oft separat verrechnet (Q-Tarif)
- Kapazitive Last (Kondensatoren): kompensiert Blindleistung

### Scheinleistung S [VA, kVA]

**Geometrische Summe** von Wirk- und Blindleistung:

```
S = U × I = √(P² + Q²)   [VA]

S = P + jQ  (komplexe Darstellung)
```

- Bestimmt die Auslegung von Transformatoren, Kabeln, Sicherungen
- Einheit: Volt-Ampere (VA), Kilovolt-Ampere (kVA)

---

## Leistungsdreieck

```
         S (kVA)
        /│
       / │
      /  │ Q (kvar, Blindleistung)
     /φ  │
    └────┘
    P (kW, Wirkleistung)

cos φ = P / S   (Leistungsfaktor, power factor)
tan φ = Q / P
```

---

## Leistungsfaktor cos φ

Der **Leistungsfaktor** (auch λ oder PF = Power Factor) gibt an wie effizient Strom genutzt wird:

| cos φ | Bedeutung                                    |
|-------|----------------------------------------------|
| 1.0   | Ideal — nur Wirkleistung                     |
| 0.9   | Gut — 10 % Blindleistung                     |
| 0.8   | Akzeptabel — Grenzwert vieler Versorger      |
| 0.7   | Schlecht — Netz stark belastet               |
| 0.5   | Sehr schlecht — typisch ungefilterte FUs     |

**Praxiswerte:**
- Glühlampe: cos φ = 1.0
- Asynchronmotor (Vollast): cos φ = 0.85–0.95
- Asynchronmotor (Leerlauf): cos φ = 0.2–0.4 (schlecht!)
- FU + Motor: cos φ am FU-Eingang 0.7–0.9 (ohne Oberwellen-Filter)

---

## Oberwellen (THD)

Moderne Geräte mit Schaltnetzteilen und Frequenzumrichtern erzeugen **Oberwellen** (Harmonics):

```
Netzspannung: 50 Hz (Grundwelle)
Oberwellen: 150 Hz (3.), 250 Hz (5.), 350 Hz (7.) ...

THD = Total Harmonic Distortion (Gesamtklirr)
```

**Problem:** Oberwellen belasten Transformatoren und Netz, können Messgeräte verfälschen.

**Messung:** Netzanalysatoren messen THD — für GA-Anlagen mit vielen FUs relevant.

---

## Zählertypen und Messgrößen

### Moderne elektronische Zähler (MID-konform)

| Messgrösse         | Einheit | Beschreibung                        |
|--------------------|---------|-------------------------------------|
| Wirkenergie Bezug  | kWh     | Verbrauch                           |
| Wirkenergie Einsp. | kWh     | Einspeisung (PV)                    |
| Blindenergie kap.  | kvarh   | Kondensatoren, PV-Wechselrichter    |
| Blindenergie ind.  | kvarh   | Motoren, Transformatoren            |
| Scheinenergie      | kVAh    |                                     |
| Leistungsfaktor    | —       | 0–1 (oder ±1 für Richtung)         |
| Wirkleistung aktuell | kW    | Momentan                            |
| Strom              | A       | Momentan (3 Phasen)                 |
| Spannung           | V       | Momentan (3 Phasen)                 |

### Kommunikationsschnittstellen

| Schnittstelle | Einsatz                                    |
|---------------|--------------------------------------------|
| **M-Bus**     | Wohngebäude, mehrere Zähler                |
| **Modbus RTU** | GA-Integration, DDC                       |
| **Modbus TCP** | IP-Netzwerk, direkt an GLT               |
| **S0-Puls**   | Einfache Impulszählung, 1 Impuls = x kWh  |
| **SML (Smart Meter Language)** | Optische Schnittstelle Haus-Zähler |

---

## Energiemessung in der GA-Praxis

### Teilzählung und Submetering

```
Hauptzähler (Netz-Einspeisepunkt)
    ├── Teilzähler 1: Heizung (FU-Pumpen, Brenner)
    ├── Teilzähler 2: Lüftung (FU-Ventilatoren)
    ├── Teilzähler 3: Beleuchtung
    ├── Teilzähler 4: Bürogeräte
    └── Teilzähler 5: Kälte (Kältekompressoren)
```

**Submetering** ermöglicht:
- Energiebilanz je Gewerk
- Kostenstellen-Zuweisung
- Verbrauchsanomalien erkennen (z.B. Lüftung 40 % Anteil → optimierbar?)

### Spitzenwert-Monitoring

```
GLT liest alle 1–5 Minuten die Wirkleistung
    ↓
EMS berechnet 15-min-Mittelwerte
    ↓
Alarm wenn Leistungslimit überschritten
    ↓
Lastmanagement aktiviert
```

---

## Normen

- **IEC 62053** — Elektrizitätszähler (verschiedene Teile für Klassen A/B/C)
- **EN 50160** — Merkmale der Spannung in öffentlichen Netzen
- **IEC 61000-4-30** — Messverfahren für Spannungsqualitätsparameter
- **MID 2014/32/EU** — Messgeräterichtlinie (Abrechnungszähler)
