---
title: Sensoren in der GA — Überblick
slug: sensoren
category: signale
subcategory: sensoren
tags: [sensor, pt100, pt1000, ntc, drucksensor, durchflussmessung, co2-sensor, ndir, voc, feuchtesensor, pir, radar, helligkeitssensor, waermemengenzaehler, kalibrierung, transmitter]
difficulty: fortgeschritten
area: [ga, hlk, elektro]
related: [signaltypen, mbus, alarmmanagement, vdi6022, rlt-anlage, drucksensoren, durchflussmessung, co2-sensoren, voc-sensoren, feuchtesensoren, praesenzsensoren, helligkeitssensoren]
norm: [IEC 60751, EN ISO 16890, EN 14511]
updated: 2026-05-14
lang: de
---

# Sensoren in der GA — Überblick

Sensoren sind die Sinnesorgane der Gebäudeautomation. Ohne korrekte Messungen gibt es keine korrekte Regelung. Dieser Artikel behandelt die in der GA am häufigsten eingesetzten Sensortypen — Messprinzip, Kennwerte, Einbau und typische Fehler.

## Temperatursensoren

### PT100 vs. PT1000

Beide sind **Widerstandstemperaturfühler** (RTD = Resistance Temperature Detector) aus Platin:

| Eigenschaft         | PT100              | PT1000             |
|---------------------|--------------------|--------------------|
| Widerstand bei 0 °C | 100 Ω              | 1000 Ω             |
| Kennlinien-Steigung | 0.385 Ω/K          | 3.85 Ω/K          |
| Empfindlichkeit     | Niedrig            | 10× höher als PT100 |
| Leitungswiderstand  | Kritisch (2-Draht!) | Unkritisch bis ~100 m |
| Genauigkeit         | Klasse A: ±0.15 K  | Klasse A: ±0.15 K  |
| Einsatz GA          | Eher Industrie     | **GA-Standard**    |

**Warum PT1000 in der GA?**
Leitungswiderstand eines 0.5 mm² Kabels: ~36 Ω/100 m. Bei PT100 ergibt das einen Messfehler von ~93 K — untauglich! Bei PT1000 derselbe Widerstand: ~9 K Fehler. Mit 2-Draht und max. 50 m noch vertretbar. Mit Kabeln > 50 m: 4-Draht-Anschluss verwenden.

**4-Draht-Anschluss (Kelvin):** Messstrom und Spannungsmessung auf getrennten Adern → Leitungswiderstand hat null Einfluss.

### NTC (Negative Temperature Coefficient)

- Halbleiterwiderstand: Widerstand sinkt mit steigender Temperatur (nichtlinear)
- Sehr grosse Widerstandsänderung (z.B. 10 kΩ → 1 kΩ bei 25 → 50 °C)
- **Typisch:** Einfache Raumfühler, günstige Anwendungen
- **Nachteil:** Nichtlinear → Linearisierung im DDC nötig; Toleranzen grösser als PT1000

### Einbau-Tipps Temperatursensoren

- **Tauchhülse:** Sensor in Rohr eingebaut, Wärmeleitpaste verwenden
- **Anlegefühler:** An Rohraussen befestigt, gut isolieren (Umgebungsluft verfälscht!)
- **Kanalfühler:** Im Luftkanal, Positionierung in gut durchmischter Zone (nicht hinter Umlenkung)
- **Raumfühler:** Auf Innenwand, 1.5 m Höhe, kein Sonneneinfall, kein Zug

---

## Drucksensoren

### Typen

| Typ              | Misst was                          | Einsatz in GA                    |
|------------------|------------------------------------|----------------------------------|
| **Absolutdruck** | Druck relativ zum Vakuum           | Selten (meteorologisch)          |
| **Relativdruck** | Druck relativ zur Atmosphäre       | Systemdruck Heizung, Kälte       |
| **Differenzdruck** | Druckdifferenz zwischen 2 Punkten | Filter, Pumpen, Durchfluss, VAV |

### Differenzdrucksensor (häufigster GA-Einsatz)

```
Hochdruckseite ──────┐
                     ├── [Differenzdruckmembran] → 4-20 mA oder 0-10 V
Niederdruckseite ────┘
```

**Typische Anwendungen:**
- Filterwächter (Druckverlust über Filter → Verschmutzungsanzeige)
- Durchflussmessung (Blende + Δp → V̇ berechnen via Bernoulli)
- Pumpenstatus (Δp über Pumpe → Laufmeldung)
- VAV-Box Volumenstromregler

**Einbauhinweise:**
- Messbohrungen **senkrecht** zur Strömungsrichtung (Staudruck vermeiden)
- Absperrventile (Nadelventile) für Wartung/Kalibrierung vorsehen
- Ausgleichsleitung (Bypass) für Nullpunktsabgleich vorsehen

---

## Durchflussmessung

### Magnetisch-induktiv (MID)

**Prinzip:** Spule erzeugt Magnetfeld. Leitendes Fluid induziert Spannung proportional zur Strömungsgeschwindigkeit (Faraday).

| Eigenschaft     | Wert                                   |
|-----------------|----------------------------------------|
| Messmedium      | Leitfähige Flüssigkeit (Heizwasser, Kaltwasser) |
| Genauigkeit     | ±0.5 % (Klasse 1)                      |
| Druckverlust    | Minimal (kein Einbauelement)           |
| Einbaulängen    | 5× DN Vorlauf, 3× DN Nachlauf          |
| Ausgangssignal  | 4–20 mA, Puls oder Modbus              |

### Ultraschall

**Prinzip:** Laufzeitdifferenz von Ultraschallpulsen in und gegen die Strömungsrichtung.

| Eigenschaft     | Wert                                   |
|-----------------|----------------------------------------|
| Messmedium      | Jede Flüssigkeit (auch nicht-leitend)  |
| Genauigkeit     | ±1–3 %                                 |
| Clamp-on möglich| Ja (kein Eingriff in Rohr!)           |
| Einbaulängen    | 10–15× DN (kritischer als MID)         |
| Einsatz GA      | Kälte, Warm-/Kaltwasser-Monitoring     |

### Wärme-/Kältemengenberechnung

Aus Durchfluss + Temperaturdifferenz:

```
Q [kW] = V̇ [m³/h] × ρ × cp × ΔT [K] / 3.6

Für Wasser (vereinfacht):
Q [kW] ≈ V̇ [m³/h] × 1.163 × ΔT [K]
```

Wärmemengenzähler kombinieren Durchflussmesser + 2 Temperaturfühler + Integrator.

---

## CO₂-Sensoren (NDIR-Prinzip)

**NDIR** = Non-Dispersive Infrared — Standardverfahren für CO₂-Messung in GA und Lüftung.

### Messprinzip

CO₂-Moleküle absorbieren Infrarotlicht bei 4.26 µm. Sensor vergleicht Transmission durch das Messgas mit einem Referenzpfad:

```
IR-Quelle → [Messgas-Kammer] → Detektor (4.26 µm Filter)
         → [Referenz-Kammer] → Detektor
Verhältnis → CO₂-Konzentration in ppm
```

### Kenngrössen

| Parameter         | Typischer Wert                  |
|-------------------|---------------------------------|
| Messbereich       | 0–2000 ppm (Innenraum), bis 5000 ppm |
| Genauigkeit       | ±50 ppm oder ±3 % Messwert      |
| Ansprechzeit T90  | 1–3 Minuten                     |
| Kalibrierung      | Alle 2–5 Jahre empfohlen        |
| Ausgangssignal    | 0–10 V, 4–20 mA, Modbus         |

### Automatic Background Calibration (ABC)

Viele Sensoren kalibrieren sich automatisch: sie gehen davon aus, dass der niedrigste Wert innerhalb von 14 Tagen der Aussenluft-CO₂-Wert (~420 ppm) entspricht.

> Wichtig: ABC-Kalibrierung funktioniert nur wenn das Gebäude regelmässig vollständig gelüftet wird. In Serverräumen oder 24/7-Betrieb ABC deaktivieren oder manuelle Kalibrierung planen.

### Alarm-Grenzwerte (EN 16798)

| Raumkategorie | Grenzwert (CO₂ über Aussenluft) | Qualität   |
|---------------|----------------------------------|------------|
| IDA 1         | ≤ 400 ppm (ca. 800 ppm abs.)    | Sehr gut   |
| IDA 2         | ≤ 800 ppm                        | Gut        |
| IDA 3         | ≤ 1350 ppm                       | Mittel     |
| IDA 4         | > 1350 ppm                       | Schlecht   |

---

## VOC-Sensoren

**VOC** = Volatile Organic Compounds (flüchtige organische Verbindungen).

- **Messprinzip:** Meist Metal Oxide Semiconductor (MOS) — Widerstandsänderung durch Adsorption
- **Was messen sie:** Summe vieler Verbindungen (Lösungsmittel, Reiniger, Ausdünstungen) — nicht spezifisch!
- **Einheit:** typisch in ppm Ethanol-Äquivalent, oder einfach 0–500 Indexwert
- **Keine Zertifizierung** nach Hygienenorm — Orientierungswert, kein Rechtsstandard
- **Einsatz:** Sanitärräume, Küchen, Konferenzräume als Lüftungstrigger

> VOC-Sensoren eignen sich als **Ergänzung** zu CO₂ aber nicht als Ersatz. CO₂ = Menschen; VOC = chemische Belastung.

---

## Präsenz- und Bewegungsmelder

| Typ         | Messprinzip           | Erkennt                  | Typischer Einsatz          |
|-------------|----------------------|--------------------------|----------------------------|
| **PIR**     | Passiv Infrarot      | Bewegung                 | Beleuchtung, einfache Präsenz |
| **Radar (Mikrowelle)** | Doppler  | Auch statische Personen  | Büro (sitzende Person!), HVAC |
| **Kamera/KI** | Bildanalyse        | Personenzahl, Positionierung | Höherwertige Anwendungen |
| **CO₂**     | Indirekt via CO₂     | Belegung (mit Verzögerung) | Lüftungssteuerung         |

**PIR-Einschränkung:** Erkennt nur Bewegung. Sitzende Person am Schreibtisch → PIR sieht sie nicht nach 10 Minuten! → Licht/Lüftung schaltet ab trotz Belegung.

**Radar:** Erkennt auch minimale Bewegung (Atemexkursion). Ideal für Büro-Lüftungssteuerung und Bedarfsregelung.

---

## Feuchtesensoren

- **Messprinzip:** Kapazitiv — Dielektrikum ändert sich mit Feuchte
- **Messgrösse:** Relative Feuchte (%) und optional Temperatur (für absolute Feuchte g/kg)
- **Genauigkeit:** ±2–5 % rF (typisch)
- **Kalibrierung:** Drift über Zeit, alle 2–3 Jahre prüfen
- **Einsatz:** Zuluft, Abluft, Raum, Aussenluft

Kombisensoren (T + rF) sind in der Lüftungsregelung Standard.

---

## Helligkeitssensoren

- **Messprinzip:** Photodiode (siliziumbasiert), spektral angepasst
- **Einheit:** Lux [lx] oder Globalstrahlung [W/m²]
- **Innenraum-Sensoren:** 0–2000 lx für Konstantlichtregelung
- **Aussenlichtsensor:** 0–100 klx für Beschattungssteuerung
- **Einbau:** Keine Verschattung, keine Reflexionen, Referenzpunkt definieren

---

## Normen

- **IEC 60751** — Platin-Widerstandstemperaturfühler (PT100/PT1000)
- **EN 14511** — Klimaanlagen, Wärmepumpen — Prüfbedingungen
- **EN ISO 16890** — Luftfilter (Partikelgrössen, Effizienzklassen)
- **EN 16798-1** — Raumluftkategorien (IDA 1–4), CO₂-Grenzwerte
