---
title: Alarmmanagement in der GA
title_en: Alarm Management in BA
slug: alarmmanagement
category: regelung
subcategory: betrieb
tags:
  [
    alarm,
    alarmmanagement,
    alarmphilosophie,
    alarmpriorität,
    nuisance-alarm,
    chattering,
    alarm-flood,
    totzeit,
    hysterese,
    shelving,
    suppression,
    quittierung,
    ack,
    eemua191,
    isa18,
    vdi3814
  ]
difficulty: fortgeschritten
area: [ga]
related: [bacnet, pid-regler, signaltypen]
norm: [EEMUA 191, ISA-18.2, IEC 62682, VDI 3814]
updated: 2026-10-14
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

| KPI                            | Zielwert     | Kritisch           |
| ------------------------------ | ------------ | ------------------ |
| Alarme pro Stunde (Mittel)     | ≤ 1 / 10 min | > 1 / min          |
| Stehende Alarme                | < 10         | > 50               |
| Chattering Alarme              | 0            | > 5 % aller Alarme |
| Floodingalarm-Ereignisse/Monat | 0            | > 1                |
| Unterdrückte Alarme (Shelved)  | < 5 %        | > 10 %             |

**Alarm Flood:** > 10 Alarme in 10 Minuten — der Operator kann nicht mehr sinnvoll reagieren.

## Prioritätsstufen

Vier Stufen haben sich in der GA bewährt:

| Priorität | Bezeichnung | Farbe  | Reaktionszeit   | Beispiele                                         |
| --------- | ----------- | ------ | --------------- | ------------------------------------------------- |
| 1         | Kritisch    | Rot    | Sofort          | Frostschutz ausgelöst, Brandschutzklappe, Leckage |
| 2         | Hoch        | Orange | < 15 min        | Pumpe Störung, Heizung ausgefallen                |
| 3         | Mittel      | Gelb   | < 4 h           | Filter verschmutzt, Kommunikationsfehler          |
| 4         | Niedrig     | Blau   | Nächste Wartung | Betriebsstunden erreicht, Sensor Drift            |

> Viele Systeme werden mit zu vielen Kritisch-Alarmen parametriert. Wenn alles kritisch ist, ist nichts kritisch. **Maximal 5 % aller Alarme sollten Priorität 1 haben.**

## Typische GA-Alarmgrenzen

### Temperaturen

| Messstelle               | Warnung        | Alarm         | Verzögerung   |
| ------------------------ | -------------- | ------------- | ------------- |
| Raumtemperatur zu kalt   | < 19 °C        | < 17 °C       | 30 min        |
| Raumtemperatur zu warm   | > 25 °C        | > 28 °C       | 30 min        |
| Frostschutz Heizregister | —              | < 5 °C        | 0 s (sofort!) |
| Frostschutz Kaltwasser   | 2 K unter Soll | < 3 °C        | 0 s           |
| Vorlauf zu niedrig       | < Soll − 5 K   | < Soll − 10 K | 15 min        |

### Drücke & Durchfluss

Filter werden heute nach ISO 16890 klassiert. Die Enddruckdifferenz gibt der Hersteller an; besser ist ein Grenzwert, der mit dem Volumenstrom mitgeht, weil die Druckdifferenz bei Teillast stark sinkt.

| Messstelle                      | Alarm                                                                 | Verzögerung            |
| ------------------------------- | --------------------------------------------------------------------- | ---------------------- |
| Filter Grobstaub (früher G4)    | > 150–200 Pa                                                          | 5–10 min               |
| Filter ePM1 50–70 % (früher F7) | > 200–300 Pa                                                          | 5–10 min               |
| Filter ePM1 ≥ 80 % (früher F9)  | > 300–400 Pa                                                          | 5–10 min               |
| Systemdruck Heizung tief        | unter Fülldruck, z.B. < 1.0 bar                                       | 60 s                   |
| Systemdruck Heizung hoch        | knapp unter Ansprechdruck Sicherheitsventil, z.B. > 2.5 bar bei 3 bar | 10 s                   |
| Durchfluss ohne Anforderung     | > 0.1 m³/h                                                            | 30 s (Leckageverdacht) |

### Kommunikation

| Verbindung       | Alarm-Timeout | Bemerkung              |
| ---------------- | ------------- | ---------------------- |
| BACnet/IP Gerät  | 60–120 s      | Reboot-Zeit einrechnen |
| Modbus RTU Gerät | 30–60 s       |                        |
| KNX-Gateway      | 120 s         |                        |
| Netzwerk (Ping)  | 30 s          |                        |

### Raumluft

| Parameter             | Warnung        | Alarm      | Norm                                                |
| --------------------- | -------------- | ---------- | --------------------------------------------------- |
| CO₂                   | > 1000 ppm     | > 1500 ppm | Richtwerte; EN 16798-1 Kat. II: 800 ppm über aussen |
| VOC                   | Geräteabhängig |            |                                                     |
| Relative Feuchte hoch | > 65 %         | > 70 %     | Schimmelrisiko                                      |
| Relative Feuchte tief | < 30 %         | < 25 %     | Komfort + Gesundheit                                |

## Chattering & Nuisance Alarms

**Chattering:** Ein Alarm der innerhalb kurzer Zeit mehrfach ein- und ausgeht.

**Ursachen:**

- Hysterese zu klein (Messwert schwankt um den Grenzwert)
- Verzögerung zu kurz
- Sensor-Rauschen
- Mechanisches Flackern (Schwimmer, Endschalter)

**Lösungen:**

| Einstellung | Grenzwert | Hysterese | Verzögerung | Verhalten                                                                             |
| ----------- | --------- | --------- | ----------- | ------------------------------------------------------------------------------------- |
| schlecht    | 22 °C     | 0 K       | 0 s         | Alarm geht bei jeder kleinen Schwankung ein und aus                                   |
| gut         | 22 °C     | 1 K       | 5 min       | Alarm kommt erst, wenn der Wert 5 Minuten über 22 °C liegt, und geht erst unter 21 °C |

**Hysterese-Faustregel:** 2–5 % des Messbereichs oder mindestens das Dreifache des Sensor-Rauschens.

**Verzögerung:** Der Alarm kommt erst, wenn der Zustand eine bestimmte Zeit ununterbrochen anliegt. Vermeidet Alarme bei kurzzeitigen Transienten (Anlauf, Abtauung, Kaltstart).

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

| Zeit nach Alarm | Wenn nicht quittiert oder noch aktiv        |
| --------------- | ------------------------------------------- |
| 0 min           | Meldung in der GLT                          |
| 5 min           | E-Mail an den Betreiber                     |
| 15 min          | SMS oder App an den Pikett                  |
| 30 min          | Anruf, bei Priorität 1 an die Notfallnummer |

Parametrierung in GLT-System oder separates Alerting-System (z.B. PagerDuty, SIGNL4, eigenes SMS-Gateway).

## Alarm-KPIs messen

Für professionelles Alarmmanagement KPIs monatlich auswerten:

| KPI                     | Berechnung                                    |
| ----------------------- | --------------------------------------------- |
| Alarme/Stunde           | Anzahl Alarm-Events / Betriebsstunden         |
| Stehende Alarme         | Anzahl Alarme die > 24 h aktiv sind           |
| Chattering-Rate         | Alarme mit > 10 Zustandswechseln/Tag (%)      |
| Anerkennungsrate        | Quittierte Alarme / Gesamtalarme (%)          |
| Top-10 häufigste Alarme | Pareto-Analyse → Ansatzpunkte für Optimierung |

**Pareto-Prinzip:** 20 % der Alarm-Punkte verursachen 80 % der Alarm-Events. Die Top-10 analysieren und bereinigen → grosse Wirkung.

## Normen & Standards

- **EEMUA 191** — Alarm Systems: A Guide to Design, Management and Procurement (Industriestandard)
- **ISA-18.2** — Management of Alarm Systems for the Process Industries
- **IEC 62682** — Management of Alarm Systems (internationale Norm, basiert auf ISA-18.2)
- **VDI 3814** — Gebäudeautomation, Begriffe und Funktionen, auch für Meldungen
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

| KPI                         | Target       | Critical            |
| --------------------------- | ------------ | ------------------- |
| Alarms per hour (average)   | ≤ 1 / 10 min | > 1 / min           |
| Standing alarms             | < 10         | > 50                |
| Chattering alarms           | 0            | > 5 % of all alarms |
| Flooding alarm events/month | 0            | > 1                 |
| Suppressed alarms (shelved) | < 5 %        | > 10 %              |

**Alarm flood:** > 10 alarms in 10 minutes — the operator can no longer respond meaningfully.

## Priority Levels

Four levels have proven effective in BA:

| Priority | Name     | Colour | Response time    | Examples                                         |
| -------- | -------- | ------ | ---------------- | ------------------------------------------------ |
| 1        | Critical | Red    | Immediate        | Frost protection triggered, fire damper, leakage |
| 2        | High     | Orange | < 15 min         | Pump fault, heating failed                       |
| 3        | Medium   | Yellow | < 4 h            | Filter dirty, communication error                |
| 4        | Low      | Blue   | Next maintenance | Operating hours reached, sensor drift            |

> Many systems are configured with too many critical alarms. If everything is critical, nothing is critical. **Maximum 5 % of all alarms should be priority 1.**

## Typical BA Alarm Limits

### Temperatures

| Measurement point              | Warning            | Alarm             | Delay            |
| ------------------------------ | ------------------ | ----------------- | ---------------- |
| Room temperature too cold      | < 19 °C            | < 17 °C           | 30 min           |
| Room temperature too warm      | > 25 °C            | > 28 °C           | 30 min           |
| Frost protection heating coil  | —                  | < 5 °C            | 0 s (immediate!) |
| Frost protection chilled water | 2 K below setpoint | < 3 °C            | 0 s              |
| Flow temperature too low       | < setpoint − 5 K   | < setpoint − 10 K | 15 min           |

### Pressures & Flow

Filters are now classified per ISO 16890. The final pressure drop is given by the manufacturer; better is a limit that follows the air flow, because the pressure drop falls sharply at part load.

| Measurement point                 | Alarm                                                         | Delay                 |
| --------------------------------- | ------------------------------------------------------------- | --------------------- |
| Filter coarse (formerly G4)       | > 150–200 Pa                                                  | 5–10 min              |
| Filter ePM1 50–70 % (formerly F7) | > 200–300 Pa                                                  | 5–10 min              |
| Filter ePM1 ≥ 80 % (formerly F9)  | > 300–400 Pa                                                  | 5–10 min              |
| System pressure heating low       | below fill pressure, e.g. < 1.0 bar                           | 60 s                  |
| System pressure heating high      | just below safety valve set pressure, e.g. > 2.5 bar at 3 bar | 10 s                  |
| Flow without demand               | > 0.1 m³/h                                                    | 30 s (leak suspected) |

### Communication

| Connection        | Alarm timeout | Note                  |
| ----------------- | ------------- | --------------------- |
| BACnet/IP device  | 60–120 s      | Allow for reboot time |
| Modbus RTU device | 30–60 s       |                       |
| KNX gateway       | 120 s         |                       |
| Network (ping)    | 30 s          |                       |

### Indoor Air

| Parameter              | Warning          | Alarm      | Standard                                                |
| ---------------------- | ---------------- | ---------- | ------------------------------------------------------- |
| CO₂                    | > 1000 ppm       | > 1500 ppm | guide values; EN 16798-1 cat. II: 800 ppm above outdoor |
| VOC                    | Device-dependent |            |                                                         |
| Relative humidity high | > 65 %           | > 70 %     | Mould risk                                              |
| Relative humidity low  | < 30 %           | < 25 %     | Comfort + health                                        |

## Chattering & Nuisance Alarms

**Chattering:** an alarm that goes in and out multiple times within a short period.

**Causes:**

- Hysteresis too small (measured value fluctuates around the limit)
- Delay too short
- Sensor noise
- Mechanical chatter (floats, limit switches)

**Solutions:**

| Setting | Limit | Hysteresis | Delay | Behaviour                                                                                       |
| ------- | ----- | ---------- | ----- | ----------------------------------------------------------------------------------------------- |
| poor    | 22 °C | 0 K        | 0 s   | alarm toggles with every small fluctuation                                                      |
| good    | 22 °C | 1 K        | 5 min | alarm only comes when the value has been above 22 °C for 5 minutes, and only clears below 21 °C |

**Hysteresis rule of thumb:** 2–5 % of the measuring range or at least three times the sensor noise.

**Delay:** the alarm only comes when the condition has been present without interruption for a set time. Prevents alarms on brief transients (start-up, defrost, cold start).

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

| Time after alarm | If not acknowledged or still active                |
| ---------------- | -------------------------------------------------- |
| 0 min            | message in the BMS                                 |
| 5 min            | email to the operator                              |
| 15 min           | SMS or app to the on-call technician               |
| 30 min           | phone call, for priority 1 to the emergency number |

Configuration in BMS or separate alerting system (e.g. PagerDuty, SIGNL4, own SMS gateway).

## Alarm KPIs

For professional alarm management, evaluate KPIs monthly:

| KPI                         | Calculation                              |
| --------------------------- | ---------------------------------------- |
| Alarms/hour                 | Number of alarm events / operating hours |
| Standing alarms             | Alarms active for > 24 h                 |
| Chattering rate             | Alarms with > 10 state changes/day (%)   |
| Acknowledgement rate        | Acknowledged alarms / total alarms (%)   |
| Top 10 most frequent alarms | Pareto analysis → optimisation targets   |

**Pareto principle:** 20 % of alarm points cause 80 % of alarm events. Analyse and fix the top 10 → large impact.

## Standards

- **EEMUA 191** — Alarm Systems: A Guide to Design, Management and Procurement (industry standard)
- **ISA-18.2** — Management of Alarm Systems for the Process Industries
- **IEC 62682** — Management of Alarm Systems (international standard, based on ISA-18.2)
- **VDI 3814** — Building automation, terms and functions, including messages
- **ISO 11064** — Ergonomic design of control centres (operator perspective)
