---
title: Pumpen — Kennlinie, Regelung und EC-Pumpen
title_en: Pumps — Characteristic Curve, Control and EC Pumps
slug: pumpen
category: hydraulik
subcategory: pumpen
tags:
  [
    pumpe,
    pumpenkennlinie,
    arbeitspunkt,
    volumenstrom,
    förderhöhe,
    differenzdruck,
    ec-pumpe,
    nassläufer,
    trockenläufer,
    proportionaldruck,
    konstantdruck,
    frequenzumrichter,
    leistungszahl,
    cavitation,
    npsh
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [hydraulische-schaltungen, hydraulischer-abgleich, ec-motoren, frequenzumrichter, pid-regler]

norm: [EN ISO 9906, ErP 2012/622/EU]
updated: 2026-05-14
lang: de
---

# Pumpen — Kennlinie, Regelung und EC-Pumpen

Pumpen sind die "Herzen" von Heizungs-, Kühlungs- und Sanitäranlagen. Das Verständnis der Pumpenkennlinie und der richtigen Regelungsstrategie ist Grundlage für effiziente und zuverlässige Anlagen.

## Pumpenkennlinie und Anlagenkennlinie

### Pumpenkennlinie

Zeigt die **Förderhöhe H** (oder Differenzdruck Δp) in Abhängigkeit vom **Volumenstrom Q**:

<figure class="schema"><svg class="hyd" viewBox="0 0 400 248" role="img" aria-label="Pumpenkennlinie und Anlagenkennlinie, Betriebspunkt im Schnittpunkt" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M50 24V200H380" stroke-width="1.5"/><path d="M50.0 45.5L57.6 45.6L65.2 45.8L72.9 46.3L80.5 47.0L88.1 47.9L95.7 48.9L103.3 50.2L111.0 51.6L118.6 53.3L126.2 55.1L133.8 57.1L141.4 59.4L149.0 61.8L156.7 64.4L164.3 67.2L171.9 70.2L179.5 73.4L187.1 76.7L194.8 80.3L202.4 84.1L210.0 88.1L217.6 92.2L225.2 96.6L232.9 101.1L240.5 105.8L248.1 110.8L255.7 115.9L263.3 121.2L271.0 126.7L278.6 132.4L286.2 138.3L293.8 144.4L301.4 150.6L309.0 157.1L316.7 163.8L324.3 170.6L331.9 177.7L339.5 184.9L347.1 192.4L354.8 200.0" class="vl" stroke-width="3"/><path d="M50.0 200.0L58.0 199.9L66.0 199.7L74.0 199.4L82.0 198.9L90.0 198.2L98.0 197.4L106.0 196.5L114.0 195.5L122.0 194.2L130.0 192.9L138.0 191.4L146.0 189.8L154.0 188.0L162.0 186.1L170.0 184.0L178.0 181.8L186.0 179.5L194.0 177.0L202.0 174.4L210.0 171.6L218.0 168.7L226.0 165.6L234.0 162.4L242.0 159.1L250.0 155.6L258.0 152.0L266.0 148.2L274.0 144.3L282.0 140.3L290.0 136.1L298.0 131.8L306.0 127.3L314.0 122.7L322.0 117.9L330.0 113.0L338.0 108.0L346.0 102.8L354.0 97.5L362.0 92.0L370.0 86.4" class="rl" stroke-width="3"/><path d="M286.1 138.2V200M50 138.2H286.1" stroke-dasharray="3 3" stroke-width="1" stroke-opacity="0.6"/><circle cx="286.1" cy="138.2" r="5" fill="currentColor"/><g fill="currentColor" stroke="none"><text x="44" y="20" text-anchor="start" font-size="11">Förderhöhe H</text><text x="378" y="236" text-anchor="end" font-size="11">Volumenstrom Q</text><text x="91.9047619047619" y="37.45454545454544" text-anchor="start" font-size="11" font-weight="600">Pumpe</text><text x="324.2857142857143" y="91.8181818181818" text-anchor="start" font-size="11" font-weight="600">Anlage</text><text x="296.0675563402616" y="130.1818181818182" text-anchor="start" font-size="11">Betriebspunkt</text><text x="44" y="49.45454545454544" text-anchor="end" font-size="11">H₀</text><text x="354.76190476190476" y="216" text-anchor="middle" font-size="11">Q₀</text></g></svg><figcaption>Die Pumpe liefert, was die Anlage im Schnittpunkt verlangt. Bei Q = 0 liegt die Nullförderhöhe H₀.</figcaption></figure>

Bei Q = 0 (Nullförderung): maximale Förderhöhe (Abschalthöhe)
Bei H = 0 (Drucklosförderung): maximaler Volumenstrom (Freiausflussmenge)

### Anlagenkennlinie

Das Rohrleitungssystem hat einen Widerstand der mit Q² steigt:

### Arbeitspunkt

Der **Arbeitspunkt** ist der Schnittpunkt von Pumpen- und Anlagenkennlinie:

---

## Regelungsstrategien

### Konstantdruck

Differenzdruck wird auf konstantem Wert gehalten, unabhängig vom Volumenstrom:

Bei 100 % und bei 50 % Volumenstrom bleibt der Differenzdruck gleich, die Pumpe senkt dafür die Drehzahl.

**Einsatz:** Fussbodenheizungen und Anlagen, deren Druckverlust vor allem in den Verbrauchern liegt und kaum im Verteilnetz, dazu Druckerhöhung im Trinkwasser.

### Proportionaldruck (empfohlen für Heizung/Kühlung)

Differenzdruck-Sollwert sinkt proportional mit dem Volumenstrom:

Bei vollem Volumenstrom liefert die Pumpe den eingestellten Differenzdruck, gegen null fällt er auf etwa die Hälfte.

**Vorteil:** Thermostatventile arbeiten mit geringerem Δp → weniger Geräusche, bessere Regelbarkeit.

**Warum Proportional und nicht Konstant?** Bei Konstantdruck und kleinem Volumenstrom: sehr hoher Differenzdruck → Thermostatventile öffnen minimal → Regelqualität schlecht + Geräusche.

### Kennlinienregelung nach Temperatur

Manche EC-Pumpen regeln ihre Drehzahl direkt nach der Systemtemperatur (kälter = kleiner Wärmeabnahme = weniger Drehzahl). Vereinfachte Variante für einfache Anlagen.

---

## EC-Pumpen (Hocheffizienz-Nassläufer)

Moderne Heizungsumwälzpumpen sind fast ausschliesslich **EC-Pumpen** (Electronically Commutated):

| Merkmal                        | Alte ungeregelte Pumpe | Hocheffizienzpumpe (EC)       |
| ------------------------------ | ---------------------- | ----------------------------- |
| Drehzahl                       | fest oder 3 Stufen     | stufenlos, regelt sich selbst |
| Leistungsaufnahme bei Teillast | bleibt fast gleich     | sinkt stark                   |
| Strombedarf Einfamilienhaus    | um 300–600 kWh/a       | um 30–150 kWh/a               |
| Integrierte Regelung           | nein                   | ja                            |

**Ökodesign-Vorschriften:** In der EU (und übernommen in der Schweiz) müssen Nassläufer-Umwälzpumpen mit einer hydraulischen Leistung von 1 W bis 2.5 kW einen **Energieeffizienzindex EEI ≤ 0.23** erreichen, für eigenständige Pumpen seit 2013, für in Geräte eingebaute seit 2015. Das schaffen praktisch nur Pumpen mit EC-Motor.

### EC-Pumpen Schnittstellen für GA

| Signal           | Beschreibung                           |
| ---------------- | -------------------------------------- |
| 0–10 V (Eingang) | Drehzahl / Δp-Sollwert von DDC         |
| 0–10 V (Ausgang) | Istwert zurückmelden                   |
| Modbus RTU       | Vollständige Parametrierung + Diagnose |
| Störmeldekontakt | DI                                     |

---

## Pumpentypen im Überblick

| Typ               | Beschreibung                                | GA-Einsatz                  |
| ----------------- | ------------------------------------------- | --------------------------- |
| **Nassläufer**    | Motor läuft in Wasser (Permanentschmierung) | Heizung, Kühlung (Standard) |
| **Trockenläufer** | Motor getrennt vom Fördermedium             | Grosse Anlagen, Industrie   |
| **Inline-Pumpe**  | Im Rohr integriert (Flanschanschluss)       | Heizung, Kühlung            |
| **Blockpumpe**    | Pumpe + Motor als Block                     | Grosse Anlagen              |
| **Tauchpumpe**    | Im Medium eingetaucht                       | Entwässerung, Schächte      |

---

## Pumpen-Überwachung in der GA

| Datenpunkt        | Typ | Beschreibung                         |
| ----------------- | --- | ------------------------------------ |
| Pumpe EIN/AUS     | DO  | Schaltbefehl                         |
| Laufmeldung       | DI  | Bestätigung läuft (Strömungswächter) |
| Störmeldung       | DI  | Motorschutz ausgelöst                |
| Differenzdruck    | AI  | Über Pumpe (optional)                |
| Drehzahl / Δp Ist | AI  | Von EC-Pumpe (0–10V oder Modbus)     |
| Drehzahl Soll     | AO  | Vorgabe an EC-Pumpe (0–10V)          |
| Betriebsstunden   | AV  | Aus Laufmeldung zählen               |

---

## Typische Fehler

| Fehler                       | Symptom                        | Ursache / Lösung                          |
| ---------------------------- | ------------------------------ | ----------------------------------------- |
| Pumpe läuft, kein Durchfluss | T-Differenz = 0, Anlage kalt   | Luftblase, Rückschlagventil klemmt        |
| Pump-Geräusche               | Pfeifendes/Zischendes Geräusch | Kavitation, Differenzdruck zu hoch        |
| Pumpe vibriert               | Mechanische Schwingung         | Arbeitspunkt zu weit rechts der Kennlinie |
| Motorschutz löst aus         | Pumpe schaltet ab              | Überlast, Wicklung heiss                  |
| Zu hoher Energieverbrauch    | Betriebsstunden × kW = viel    | Drehzahl zu hoch, Δp-Soll zu hoch         |

## Normen

- **EN ISO 9906** — Kreiselpumpen, hydraulische Leistungsprüfungen
- **Verordnung (EG) 641/2009, geändert durch (EU) 622/2012** — Ökodesign für Nassläufer-Umwälzpumpen
- **EN 16297** — Pumpen, Umwälzpumpen, Energieeffizienzindex

<!-- EN -->

Pumps are the "hearts" of heating, cooling and sanitary systems. Understanding the pump characteristic curve and the correct control strategy is the basis for efficient and reliable installations.

## Pump Characteristic Curve and System Curve

### Pump Characteristic Curve

Shows the **head H** (or differential pressure Δp) as a function of **volume flow Q**:

<figure class="schema"><svg class="hyd" viewBox="0 0 400 248" role="img" aria-label="Pump curve and system curve, operating point at the intersection" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M50 24V200H380" stroke-width="1.5"/><path d="M50.0 45.5L57.6 45.6L65.2 45.8L72.9 46.3L80.5 47.0L88.1 47.9L95.7 48.9L103.3 50.2L111.0 51.6L118.6 53.3L126.2 55.1L133.8 57.1L141.4 59.4L149.0 61.8L156.7 64.4L164.3 67.2L171.9 70.2L179.5 73.4L187.1 76.7L194.8 80.3L202.4 84.1L210.0 88.1L217.6 92.2L225.2 96.6L232.9 101.1L240.5 105.8L248.1 110.8L255.7 115.9L263.3 121.2L271.0 126.7L278.6 132.4L286.2 138.3L293.8 144.4L301.4 150.6L309.0 157.1L316.7 163.8L324.3 170.6L331.9 177.7L339.5 184.9L347.1 192.4L354.8 200.0" class="vl" stroke-width="3"/><path d="M50.0 200.0L58.0 199.9L66.0 199.7L74.0 199.4L82.0 198.9L90.0 198.2L98.0 197.4L106.0 196.5L114.0 195.5L122.0 194.2L130.0 192.9L138.0 191.4L146.0 189.8L154.0 188.0L162.0 186.1L170.0 184.0L178.0 181.8L186.0 179.5L194.0 177.0L202.0 174.4L210.0 171.6L218.0 168.7L226.0 165.6L234.0 162.4L242.0 159.1L250.0 155.6L258.0 152.0L266.0 148.2L274.0 144.3L282.0 140.3L290.0 136.1L298.0 131.8L306.0 127.3L314.0 122.7L322.0 117.9L330.0 113.0L338.0 108.0L346.0 102.8L354.0 97.5L362.0 92.0L370.0 86.4" class="rl" stroke-width="3"/><path d="M286.1 138.2V200M50 138.2H286.1" stroke-dasharray="3 3" stroke-width="1" stroke-opacity="0.6"/><circle cx="286.1" cy="138.2" r="5" fill="currentColor"/><g fill="currentColor" stroke="none"><text x="44" y="20" text-anchor="start" font-size="11">Head H</text><text x="378" y="236" text-anchor="end" font-size="11">Flow rate Q</text><text x="91.9047619047619" y="37.45454545454544" text-anchor="start" font-size="11" font-weight="600">Pump</text><text x="324.2857142857143" y="91.8181818181818" text-anchor="start" font-size="11" font-weight="600">System</text><text x="296.0675563402616" y="130.1818181818182" text-anchor="start" font-size="11">Operating point</text><text x="44" y="49.45454545454544" text-anchor="end" font-size="11">H₀</text><text x="354.76190476190476" y="216" text-anchor="middle" font-size="11">Q₀</text></g></svg><figcaption>The pump delivers what the system demands at the intersection. At Q = 0 lies the shut-off head H₀.</figcaption></figure>

At Q = 0 (shut-off): maximum head (shut-off head)
At H = 0 (free delivery): maximum volume flow

### System Curve

The piping system has a resistance that increases with Q²:

### Operating Point

The **operating point** is the intersection of the pump and system curves:

---

## Control Strategies

### Constant pressure

Differential pressure is maintained at a constant value regardless of volume flow:

At 100 % and at 50 % flow the differential pressure stays the same; the pump reduces its speed instead.

**Use:** Underfloor heating and systems whose pressure drop lies mainly in the consumers rather than the distribution network, plus pressure boosting in domestic water.

### Proportional pressure (recommended for heating/cooling)

Differential pressure setpoint decreases proportionally with volume flow:

At full flow the pump delivers the set differential pressure; towards zero it drops to about half.

**Advantage:** Thermostatic valves operate at lower Δp → less noise, better controllability.

**Why proportional and not constant?** With constant pressure and low volume flow: very high differential pressure → thermostatic valves barely open → poor control quality + noise.

### Curve control based on temperature

Some EC pumps regulate their speed directly based on system temperature (colder = lower heat extraction = lower speed). Simplified variant for simple systems.

---

## EC Pumps (High-Efficiency Wet-Rotor Pumps)

Modern heating circulation pumps are almost exclusively **EC pumps** (Electronically Commutated):

| Feature                         | Old unregulated pump  | High-efficiency pump (EC)   |
| ------------------------------- | --------------------- | --------------------------- |
| Speed                           | fixed or 3 steps      | continuous, self-regulating |
| Power draw at part load         | stays almost the same | falls sharply               |
| Electricity, single-family home | around 300–600 kWh/a  | around 30–150 kWh/a         |
| Integrated control              | no                    | yes                         |

**Ecodesign rules:** in the EU (and adopted in Switzerland), glandless circulators with a hydraulic power of 1 W to 2.5 kW must reach an **energy efficiency index EEI ≤ 0.23**, for standalone pumps since 2013, for pumps integrated in products since 2015. In practice only pumps with EC motors achieve this.

### EC Pump Interfaces for BA

| Signal          | Description                         |
| --------------- | ----------------------------------- |
| 0–10 V (input)  | Speed / Δp setpoint from DDC        |
| 0–10 V (output) | Actual value feedback               |
| Modbus RTU      | Full parameterisation + diagnostics |
| Fault contact   | DI                                  |

---

## Pump Types Overview

| Type                 | Description                                 | BA application              |
| -------------------- | ------------------------------------------- | --------------------------- |
| **Wet-rotor**        | Motor runs in water (permanent lubrication) | Heating, cooling (standard) |
| **Dry-rotor**        | Motor separated from fluid                  | Large systems, industry     |
| **Inline pump**      | Integrated in pipe (flanged)                | Heating, cooling            |
| **Block pump**       | Pump + motor as one unit                    | Large systems               |
| **Submersible pump** | Immersed in medium                          | Drainage, pits              |

---

## Pump Monitoring in BA

| Data point            | Type | Description                        |
| --------------------- | ---- | ---------------------------------- |
| Pump ON/OFF           | DO   | Switch command                     |
| Run feedback          | DI   | Confirmation running (flow switch) |
| Fault signal          | DI   | Motor protection tripped           |
| Differential pressure | AI   | Across pump (optional)             |
| Speed / Δp actual     | AI   | From EC pump (0–10 V or Modbus)    |
| Speed setpoint        | AO   | Command to EC pump (0–10 V)        |
| Operating hours       | AV   | Counted from run feedback          |

---

## Typical Errors

| Error                        | Symptom                     | Cause / solution                           |
| ---------------------------- | --------------------------- | ------------------------------------------ |
| Pump runs, no flow           | ΔT = 0, system cold         | Air pocket, check valve stuck              |
| Pump noise                   | Whistling/hissing           | Cavitation, differential pressure too high |
| Pump vibrates                | Mechanical oscillation      | Operating point too far right of curve     |
| Motor protection trips       | Pump shuts off              | Overload, winding hot                      |
| Excessive energy consumption | Operating hours × kW = high | Speed too high, Δp setpoint too high       |

## Standards

- **EN ISO 9906** — Rotodynamic pumps, hydraulic performance tests
- **Regulation (EC) 641/2009, amended by (EU) 622/2012** — Ecodesign for glandless circulators
- **EN 16297** — Pumps, circulation pumps, energy efficiency index
