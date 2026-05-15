---
title: VAV vs. CAV — Variable und konstante Luftmengen
slug: vav-cav
category: lueftung
subcategory: regelung
tags: [vav, cav, variable-air-volume, constant-air-volume, volumenstromregler, druck, rlt, zuluft, abluft, bypass, druckregelung, frequenzumrichter, luftbedarf, co2, praesenz]
difficulty: fortgeschritten
area: [hlk, ga]
related: [rlt-anlage, frequenzumrichter, pid-regler, druckverlust, raumluftqualitaet]
norm: [EN 16798-3, EN 15232, SIA 382.1]
updated: 2026-05-14
lang: de
---

# VAV vs. CAV — Variable und konstante Luftmengen

Ob eine Lüftungsanlage mit konstantem oder variablem Luftvolumenstrom arbeitet, entscheidet massgeblich über Energieverbrauch, Komfort und Regelbarkeit. Der Unterschied liegt im Kern der Lüftungsarchitektur.

## CAV — Constant Air Volume

### Prinzip

Der Ventilator läuft auf konstanter Drehzahl. Der Luftvolumenstrom bleibt immer gleich — unabhängig von Belegung, Aussentemperatur oder Nutzungsprofil.

```
RLT-Zentrale (feste Drehzahl)
    ↓ Konstanter Volumenstrom
Raum 1 (voll besetzt)   — bekommt 100 % Luft
Raum 2 (leer)           — bekommt auch 100 % Luft
```

### Regelung bei CAV

Da der Volumenstrom fix ist, kann nur die **Temperatur** geregelt werden:
- Heizregister Ein/Aus oder stetig
- Kühler stetig
- Mischkasten: Innen-/Aussenluft mischen

**Keine Bedarfsregelung möglich** — auch leere Räume werden voll belüftet.

### Wann CAV sinnvoll?

| Anwendung                                | Begründung                               |
|------------------------------------------|------------------------------------------|
| Einfache Wohnbelüftung                   | Gleichmässige Belegung                   |
| Produktionsräume mit konstantem Bedarf   | Prozessluft, keine Bedarfsvariabilität   |
| Kleine Anlagen (< 2000 m³/h)             | VAV-Technik zu teuer                     |
| Reinräume                                | Konstanter Druck und Luftwechsel Pflicht |

---

## VAV — Variable Air Volume

### Prinzip

Der Volumenstrom wird **bedarfsgerecht** geregelt. Jede Zone hat einen **VAV-Regler** (Volumenstromkonstanthalter + Klappe), der den Luftstrom für diesen Raum auf den aktuellen Bedarf einstellt.

```
RLT-Zentrale (variable Drehzahl)
    ↓ Variabler Gesamtvolumenstrom
VAV-Box Zone 1 (besetzt) → 80 % Sollvolumenstrom
VAV-Box Zone 2 (leer)    → 30 % Mindestvolumenstrom
VAV-Box Zone 3 (Sitzung) → 100 % Sollvolumenstrom
    ↓
Übergeordnete Druckregelung → FU passt Ventilatordrehzahl an
```

### VAV-Box Aufbau

```
Zuluftkanal → [Messblende] → [Regelklappe] → Raum
                  ↑               ↑
            Differenzdruck    Stellantrieb
            (Volumenstrom)        ↑
                           DDC-Regler
                           (Soll: CO₂, T, Präsenz)
```

**Messung:** Differenzdruck an Messblende → Berechnung Volumenstrom (Bernoulli)
**Regelung:** Klappe öffnet/schliesst → passt Volumenstrom an Sollwert an

### Bedarfsführung (Demand Controlled Ventilation, DCV)

Der VAV-Regler kann verschiedene Führungsgrößen nutzen:

| Führungsgrösse  | Sensor     | Typischer Einsatz                        |
|-----------------|------------|------------------------------------------|
| **CO₂**         | NDIR-Sensor | Büro, Schulzimmer, Konferenzraum       |
| **Präsenz**     | PIR / Radar | Besprechungsräume, Toiletten           |
| **Belegungsplan** | GLT-Daten | Hotel, vorprogrammierte Belegung       |
| **Temperatur**  | PT1000      | Wenn Kühlung via Lüftung (Mischluft)   |
| **VOC**         | VOC-Sensor  | Küchen, Sanitärräume, Labore           |

### Minimaler Volumenstrom

**Wichtig:** VAV-Boxen regeln nicht auf 0 — es gibt einen konfigurierten Mindestvolumenstrom:
- Hygieneluftmenge (Frischluft, CO₂-Abfuhr)
- Thermischer Mindestbedarf (Heizen/Kühlen)
- Überdruck-/Unterdruckhaltung

Typisch: **Minimum 30–40 % des Maximalvolumenstroms**.

---

## Druckregelung im VAV-System

### Das Problem

Wenn VAV-Boxen schliessen → Druck im Kanal steigt → Gefahr:
- Luftgeräusche (Strömungsrauschen)
- Ventilator läuft ineffizient
- VAV-Boxen können ihren Sollwert nicht mehr halten

### Lösung: Statische Druckregelung

```
Drucksensor im Hauptkanal (ca. 2/3 der Kanallänge)
    ↓
PID-Regler in GLT oder FU
    ↓
Frequenzumrichter → Ventilatordrehzahl anpassen
    ↓ Ziel: Statischer Druck = Sollwert (z.B. 100 Pa)
```

**Sollwert-Optimierung:** Statt fixem Sollwert (z.B. 100 Pa) kann der Druck dynamisch auf den **niedrigsten Wert** gesenkt werden bei dem alle VAV-Boxen ihren Sollvolumenstrom noch erreichen (→ spart nochmals 20–30 % Energie).

### Bypass-Klappe (einfache Variante)

Bei einfachen Anlagen ohne Frequenzumrichter:

```
Ventilator (konstant) → Hauptkanal → VAV-Boxen
                            ↓
                       Bypass-Klappe
                            ↓
                        Abluft / Raumluft
```

Bypass öffnet wenn Druck steigt → überschüssige Luft wird kurzgeschlossen. Energetisch ungünstig (Energie der Luft wird verschwendet).

---

## Energievergleich CAV vs. VAV

Das Ventilatorsystem folgt der **Ähnlichkeitsgesetze**:
- Volumenstrom ~ Drehzahl
- Druck ~ Drehzahl²
- **Leistung ~ Drehzahl³**

Bei 50 % Volumenstrom: Leistung = 0,5³ = **12,5 %** der Nennleistung!

| Betriebspunkt     | CAV Leistung | VAV Leistung | Ersparnis |
|-------------------|--------------|--------------|-----------|
| 100 % Volumenstrom | 100 %       | 100 %        | —         |
| 75 %              | 100 %        | ~42 %        | ~58 %     |
| 50 %              | 100 %        | ~12 %        | ~88 %     |
| Jahresdurchschnitt | —           | Typisch 40–60 % weniger | —   |

> **Faustregel:** In Bürogebäuden läuft eine CAV-Anlage 80 % der Zeit auf mehr als dem doppelten Energiebedarf einer VAV-Anlage. Die Mehrkosten amortisieren sich in 3–7 Jahren.

---

## VAV-System in der GA

### Typische Datenpunkte pro VAV-Box

| Datenpunkt               | Typ | Einheit | Beschreibung               |
|--------------------------|-----|---------|----------------------------|
| Volumenstrom-Ist         | AI  | m³/h    | Aus Differenzdruck berechnet |
| Volumenstrom-Soll        | AO  | m³/h    | Von DDC vorgegeben         |
| Klappenstellung          | AI  | %       | Rückmeldung                |
| Raumtemperatur           | AI  | °C      | Führungsgrösse Heizung/Kühlung |
| CO₂                      | AI  | ppm     | Führungsgrösse Lüftungsbedarf |
| Präsenz                  | DI  | —       | Besetzt / Leer             |
| Heiz-/Kühlregister       | AO  | %       | Nachheizung/Nachkühlung    |
| Betriebsart              | AV  | —       | Komfort / Nacht / Abwesend |

### Übergeordnete GLT-Punkte

| Datenpunkt               | Beschreibung                               |
|--------------------------|--------------------------------------------|
| Gesamtvolumenstrom       | Summe aller aktiven VAV-Boxen              |
| Statischer Kanal-Druck   | Ist und Soll für FU-Regelung               |
| FU-Drehzahl              | Ventilator-Istwert                         |
| Betriebsprogramm         | Zeitschaltuhr für Komfort/Nacht/Abwesend   |

---

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **EN 15232** — GA-Effizienzklassen (VAV = Klasse A/B, CAV = Klasse C/D)
- **SIA 382.1** — Lüftungs- und Klimaanlagen — Allgemeine Grundlagen
- **EN 13779** — Lüftung von Nichtwohngebäuden (Bemessungsvolumenströme)
