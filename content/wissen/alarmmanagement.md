---
title: Alarmmanagement in der GA
title_en: Alarm Management in BA
slug: alarmmanagement
category: regelung
subcategory: betrieb
tags: [alarm, alarmmanagement, alarmphilosophie, alarmpriorität, nuisance-alarm, chattering, alarm-flood, totzeit, hysterese, shelving, suppression, quittierung, ack, eemua191, isa18, vdi3814]
difficulty: fortgeschritten
area: [ga]
related: [bacnet, pid-regler, signaltypen]
norm: [EEMUA 191, ISA-18.2, IEC 62682, VDI 3814-4]
updated: 2026-05-14
lang: de
---

# Alarmmanagement in der GA

Gut parametriertes Alarmmanagement ist der Unterschied zwischen einer nutzbaren GLT und einem Alarm-Chaos das niemand mehr ernst nimmt. Die Grundregel: **1 Alarm = 1 klare Handlungsanweisung für den Operator.**

## Grundprinzipien

### Was ist ein Alarm?

Ein Alarm signalisiert einen **anormalen Zustand, der eine Reaktion erfordert**. Was kein Alarm ist:
- Ein Ereignis das nur dokumentiert werden soll → **Ereignis/Log**
- Eine Information ohne Handlungsbedarf → **Hinweis**
- Eine Routine-Wartungserinnerung → **Wartungsmeldung**

> ⚠️ Wenn auf einen Alarm keine konkrete Massnahme folgt, ist es kein Alarm — es ist Lärm.

### EEMUA 191 Richtwerte (Industrie-Standard)

| KPI                          | Zielwert          | Kritisch           |
|------------------------------|-------------------|--------------------|
| Alarme pro Stunde (Mittel)   | ≤ 1 / 10 min      | > 1 / min          |
| Stehende Alarme              | < 10              | > 50               |
| Chattering Alarme            | 0                 | > 5 % aller Alarme |
| Floodingalarm-Ereignisse/Monat | 0              | > 1                |
| Unterdrückte Alarme (Shelved) | < 5 %            | > 10 %             |

**Alarm Flood:** > 10 Alarme in 10 Minuten — der Operator kann nicht mehr sinnvoll reagieren.

## Prioritätsstufen

Vier Stufen haben sich in der GA bewährt:

| Priorität | Bezeichnung | Farbe   | Reaktionszeit | Beispiele                                    |
|-----------|-------------|---------|---------------|----------------------------------------------|
| 1         | Kritisch    | Rot     | Sofort        | Frostschutz ausgelöst, Brandschutzklappe, Leckage |
| 2         | Hoch        | Orange  | < 15 min      | Pumpe Störung, Heizung ausgefallen            |
| 3         | Mittel      | Gelb    | < 4 h         | Filter verschmutzt, Kommunikationsfehler     |
| 4         | Niedrig     | Blau    | Nächste Wartung | Betriebsstunden erreicht, Sensor Drift     |

> Viele Systeme werden mit zu vielen Kritisch-Alarmen parametriert. Wenn alles kritisch ist, ist nichts kritisch. **Maximal 5 % aller Alarme sollten Priorität 1 haben.**

## Typische GA-Alarmgrenzen

### Temperaturen

| Messstelle                | Warnung        | Alarm          | Verzögerung |
|---------------------------|----------------|----------------|-------------|
| Raumtemperatur zu kalt    | < 19 °C        | < 17 °C        | 30 min      |
| Raumtemperatur zu warm    | > 25 °C        | > 28 °C        | 30 min      |
| Frostschutz Heizregister  | —              | < 5 °C         | 0 s (sofort!) |
| Frostschutz Kaltwasser    | < 5 °C         | < 3 °C         | 0 s         |
| Vorlauf zu niedrig        | > Soll − 5 K   | > Soll − 10 K  | 15 min      |

### Drücke & Durchfluss

| Messstelle                | Alarm          | Verzögerung |
|---------------------------|----------------|-------------|
| Differenzdruck Filter G4  | > 200 Pa       | 0 s         |
| Differenzdruck Filter F7  | > 300 Pa       | 0 s         |
| Differenzdruck Filter F9  | > 400 Pa       | 0 s         |
| Systemdruck Heizung tief  | < 1,0 bar      | 60 s        |
| Systemdruck Heizung hoch  | > 4,0 bar      | 10 s        |
| Durchfluss ohne Anforderung | > 0,1 m³/h  | 30 s (Leckageverdacht) |

### Kommunikation

| Verbindung                | Alarm-Timeout  | Bemerkung                  |
|---------------------------|----------------|----------------------------|
| BACnet/IP Gerät           | 60–120 s       | Reboot-Zeit einrechnen     |
| Modbus RTU Gerät          | 30–60 s        |                            |
| KNX-Gateway               | 120 s          |                            |
| Netzwerk (Ping)           | 30 s           |                            |

### Raumluft

| Parameter    | Warnung     | Alarm       | Norm              |
|--------------|-------------|-------------|-------------------|
| CO₂          | > 1000 ppm  | > 1500 ppm  | EN 16798 IDA 2/3  |
| VOC          | Geräteabhängig |          |                   |
| Relative Feuchte hoch | > 65 % | > 70 %  | Schimmelrisiko    |
| Relative Feuchte tief | < 30 % | < 25 %  | Komfort + Gesundheit |

## Chattering & Nuisance Alarms

**Chattering:** Ein Alarm der innerhalb kurzer Zeit mehrfach ein- und ausgeht.

**Ursachen:**
- Hysterese zu klein (Messwert schwankt um den Grenzwert)
- Totzeit zu kurz
- Sensor-Rauschen
- Mechanisches Flackern (Schwimmer, Endschalter)

**Lösungen:**

```
Schlechte Parametrierung:
  Grenzwert: 22 °C, Hysterese: 0 K, Totzeit: 0 s
  → Alarm geht bei jeder kleinen Schwankung EIN/AUS/EIN/AUS

Gute Parametrierung:
  Grenzwert: 22 °C, Hysterese: 1 K, Totzeit: 5 min
  → Alarm geht EIN wenn > 22 °C (und bleibt mindestens 5 min aktiv)
  → Alarm geht AUS erst wenn < 21 °C (Hysterese 1 K)
```

**Hysterese-Faustregel:** 2–5 % des Messbereichs oder mindestens das Dreifache des Sensor-Rauschens.

**Totzeit (Deadtime/Delay):** Alarm tritt erst auf wenn Zustand für X Sekunden stabil anliegt. Vermeidet Alarme bei kurzzeitigen Transienten (Anlauf, Abtauung, Kaltstart).

## Alarm-Unterdrückung

### Shelving (temporäres Unterdrücken)

- Operator unterdrückt einen Alarm für definierte Zeit (z.B. 8 Stunden)
- Verwendet bei: bekannter Baustelle, Wartungsarbeiten, bekanntem temporären Zustand
- **Pflicht:** Ablaufdatum + Begründung dokumentieren
- Unterdrückte Alarme sichtbar machen (separates Anzeige-Symbol)

### Process Condition Suppression

- Alarm automatisch unterdrückt wenn Anlagenstate es erfordert
- Beispiel: Frost-Alarm Lüftungsanlage unterdrückt wenn Anlage ausgeschaltet ist
- Beispiel: Druckdifferenz-Alarm Filter unterdrückt wenn Ventilator aus

> ⚠️ **Suppression nur wenn logisch korrekt!** Automatische Unterdrückung kann Fehler verstecken. Immer dokumentieren welche Bedingungen welche Alarme supprimieren.

## Quittierung (ACK)

**Quittieren ≠ Beheben:**
- **ACK:** Operator bestätigt "ich habe den Alarm gesehen" — Alarm bleibt aktiv wenn Ursache noch besteht
- **Normalzustand:** Alarm verschwindet wenn Messwert wieder im Normalbereich
- **Reset:** Manche Alarme bleiben nach Normalzustand stehen bis manuell quittiert (Latch)

**Latching-Alarme:** Sicherheitsrelevante Alarme (Frostschutz, Brandschutz) sollten gelatchd sein — der Operator muss bewusst zurücksetzen, nicht nur der Zustand zurückkehren.

## Eskalation

Wenn Alarm nicht quittiert wird → Eskalation:

```
t=0:    Alarm erscheint in GLT
t=5 min: Alarm noch nicht quittiert → Email an Betreiber
t=15 min: Alarm noch aktiv → SMS an Bereitschaftstechniker
t=30 min: Kritischer Alarm → Anruf Notfall-Nummer
```

Parametrierung in GLT-System oder separates Alerting-System (z.B. PagerDuty, SIGNL4, eigenes SMS-Gateway).

## Alarm-KPIs messen

Für professionelles Alarmmanagement KPIs monatlich auswerten:

| KPI                              | Berechnung                                    |
|----------------------------------|-----------------------------------------------|
| Alarme/Stunde                    | Anzahl Alarm-Events / Betriebsstunden         |
| Stehende Alarme                  | Anzahl Alarme die > 24 h aktiv sind           |
| Chattering-Rate                  | Alarme mit > 10 Zustandswechseln/Tag (%)      |
| Anerkennungsrate                 | Quittierte Alarme / Gesamtalarme (%)          |
| Top-10 häufigste Alarme          | Pareto-Analyse → Ansatzpunkte für Optimierung |

**Pareto-Prinzip:** 20 % der Alarm-Punkte verursachen 80 % der Alarm-Events. Die Top-10 analysieren und bereinigen → grosse Wirkung.

## Normen & Standards

- **EEMUA 191** — Alarm Systems: A Guide to Design, Management and Procurement (Industriestandard)
- **ISA-18.2** — Management of Alarm Systems for the Process Industries
- **IEC 62682** — Management of Alarm Systems (internationale Norm, basiert auf ISA-18.2)
- **VDI 3814-4** — Gebäudeautomation, Alarmmanagement
- **ISO 11064** — Ergonomische Gestaltung von Leitsystemen (Operatoren-Perspektive)

<!-- EN -->

## Alarm Management in BA

Well-configured alarm management is the difference between a usable BMS and an alarm chaos that nobody takes seriously anymore. The golden rule: **1 alarm = 1 clear action instruction for the operator.**

## Basic Principles

### What is an Alarm?

An alarm signals an **abnormal condition that requires a response**. What is not an alarm:
- An event that only needs to be documented → **event/log**
- Information with no action required → **notification**
- A routine maintenance reminder → **maintenance message**

> If an alarm is not followed by a concrete action, it is not an alarm — it is noise.

### EEMUA 191 Target Values (industry standard)

| KPI | Target | Critical |
|-----|--------|---------|
| Alarms per hour (average) | ≤ 1 / 10 min | > 1 / min |
| Standing alarms | < 10 | > 50 |
| Chattering alarms | 0 | > 5 % of all alarms |
| Flooding alarm events/month | 0 | > 1 |
| Suppressed alarms (shelved) | < 5 % | > 10 % |

**Alarm flood:** > 10 alarms in 10 minutes — the operator can no longer respond meaningfully.

## Priority Levels

Four levels have proven effective in BA:

| Priority | Name | Colour | Response time | Examples |
|---------|------|--------|--------------|---------|
| 1 | Critical | Red | Immediate | Frost protection triggered, fire damper, leakage |
| 2 | High | Orange | < 15 min | Pump fault, heating failed |
| 3 | Medium | Yellow | < 4 h | Filter dirty, communication error |
| 4 | Low | Blue | Next maintenance | Operating hours reached, sensor drift |

> Many systems are configured with too many critical alarms. If everything is critical, nothing is critical. **Maximum 5 % of all alarms should be priority 1.**

## Typical BA Alarm Limits

### Temperatures

| Measurement point | Warning | Alarm | Delay |
|-----------------|---------|-------|-------|
| Room temperature too cold | < 19 °C | < 17 °C | 30 min |
| Room temperature too warm | > 25 °C | > 28 °C | 30 min |
| Frost protection heating coil | — | < 5 °C | 0 s (immediate!) |
| Frost protection cold water | < 5 °C | < 3 °C | 0 s |
| Flow too low | > setpoint − 5 K | > setpoint − 10 K | 15 min |

### Pressures & Flow

| Measurement point | Alarm | Delay |
|-----------------|-------|-------|
| Differential pressure filter G4 | > 200 Pa | 0 s |
| Differential pressure filter F7 | > 300 Pa | 0 s |
| Differential pressure filter F9 | > 400 Pa | 0 s |
| System pressure heating low | < 1.0 bar | 60 s |
| System pressure heating high | > 4.0 bar | 10 s |
| Flow without demand | > 0.1 m³/h | 30 s (leak suspected) |

### Communication

| Connection | Alarm timeout | Note |
|-----------|-------------|------|
| BACnet/IP device | 60–120 s | Allow for reboot time |
| Modbus RTU device | 30–60 s | |
| KNX gateway | 120 s | |
| Network (ping) | 30 s | |

### Indoor Air

| Parameter | Warning | Alarm | Standard |
|-----------|---------|-------|---------|
| CO₂ | > 1000 ppm | > 1500 ppm | EN 16798 IDA 2/3 |
| VOC | Device-dependent | | |
| Relative humidity high | > 65 % | > 70 % | Mould risk |
| Relative humidity low | < 30 % | < 25 % | Comfort + health |

## Chattering & Nuisance Alarms

**Chattering:** an alarm that goes in and out multiple times within a short period.

**Causes:**
- Hysteresis too small (measured value fluctuates around the limit)
- Dead time too short
- Sensor noise
- Mechanical chatter (floats, limit switches)

**Solutions:**

```
Poor configuration:
  Limit: 22 °C, hysteresis: 0 K, dead time: 0 s
  → Alarm trips ON/OFF/ON/OFF with every small fluctuation

Good configuration:
  Limit: 22 °C, hysteresis: 1 K, dead time: 5 min
  → Alarm trips ON when > 22 °C (stays active at least 5 min)
  → Alarm clears only when < 21 °C (1 K hysteresis)
```

**Hysteresis rule of thumb:** 2–5 % of the measuring range or at least three times the sensor noise.

**Dead time (delay):** alarm only triggers when condition has been stable for X seconds. Prevents alarms on brief transients (start-up, defrost, cold start).

## Alarm Suppression

### Shelving (temporary suppression)

- Operator suppresses an alarm for a defined period (e.g. 8 hours)
- Used for: known construction work, maintenance, known temporary condition
- **Mandatory:** document expiry date and reason
- Suppressed alarms must remain visible (separate display symbol)

### Process Condition Suppression

- Alarm automatically suppressed when plant state requires it
- Example: frost alarm ventilation suppressed when plant is switched off
- Example: filter differential pressure alarm suppressed when fan is off

> **Only suppress when logically correct!** Automatic suppression can hide faults. Always document which conditions suppress which alarms.

## Acknowledgement (ACK)

**Acknowledging ≠ fixing:**
- **ACK:** operator confirms "I have seen this alarm" — alarm remains active if cause still exists
- **Normal state:** alarm disappears when measured value returns to normal range
- **Reset:** some alarms remain active after normalising until manually acknowledged (latch)

**Latching alarms:** Safety-relevant alarms (frost protection, fire protection) should be latched — the operator must consciously reset, not just let the condition return.

## Escalation

If alarm is not acknowledged → escalation:

```
t=0:     Alarm appears in BMS
t=5 min: Alarm not yet acknowledged → email to facility manager
t=15 min: Alarm still active → SMS to on-call technician
t=30 min: Critical alarm → call emergency number
```

Configuration in BMS or separate alerting system (e.g. PagerDuty, SIGNL4, own SMS gateway).

## Alarm KPIs

For professional alarm management, evaluate KPIs monthly:

| KPI | Calculation |
|-----|------------|
| Alarms/hour | Number of alarm events / operating hours |
| Standing alarms | Alarms active for > 24 h |
| Chattering rate | Alarms with > 10 state changes/day (%) |
| Acknowledgement rate | Acknowledged alarms / total alarms (%) |
| Top 10 most frequent alarms | Pareto analysis → optimisation targets |

**Pareto principle:** 20 % of alarm points cause 80 % of alarm events. Analyse and fix the top 10 → large impact.

## Standards

- **EEMUA 191** — Alarm Systems: A Guide to Design, Management and Procurement (industry standard)
- **ISA-18.2** — Management of Alarm Systems for the Process Industries
- **IEC 62682** — Management of Alarm Systems (international standard, based on ISA-18.2)
- **VDI 3814-4** — Building automation, alarm management
- **ISO 11064** — Ergonomic design of control centres (operator perspective)
