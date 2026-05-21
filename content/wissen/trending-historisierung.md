---
title: Trending und Historisierung — Datenaufzeichnung in der GA
title_en: Trending and Historisation — Data Recording in BA
slug: trending-historisierung
category: ga
subcategory: betrieb
tags:
  [
    trending,
    historisierung,
    trendlog,
    cov,
    polling,
    zeitreihen,
    influxdb,
    grafana,
    archivierung,
    auflösung,
    retention,
    anomalieerkennung,
    last-value,
    change-of-value,
    bacnet-trendlog
  ]
difficulty: fortgeschritten
area: [ga, it]
related: [glt-grundlagen, bacnet, alarmmanagement, ems-lastmanagement]
norm: [BACnet ASHRAE 135, VDI 3814]
updated: 2026-05-14
lang: de
---

# Trending und Historisierung — Datenaufzeichnung in der GA

Ohne Datenspeicherung ist Fehleranalyse blind. Trends zeigen ob Regelungen funktionieren, Energieverbrauch verursachen, Alarme chattern oder Anlagen sich degradieren. Gutes Trending ist das wichtigste Diagnose-Werkzeug der GA.

## Aufzeichnungsmethoden

### Polling (zyklisch)

GLT liest Datenpunkt alle X Sekunden/Minuten und speichert den Wert:

```
t=0:00   → T_VL = 45.2 °C → speichern
t=0:01   → T_VL = 45.3 °C → speichern
t=0:02   → T_VL = 45.3 °C → speichern (kein Änderung, trotzdem speichern)
...
```

| Vorteil               | Nachteil                           |
| --------------------- | ---------------------------------- |
| Einfach, gleichmässig | Viel Speicher (auch gleiche Werte) |
| Gut für Zeitreihen    | Kurze Transienten können fehlen    |

### COV — Change of Value

BACnet-Standard: DDC meldet Wert nur wenn sich der Wert um ≥ COV-Inkrement geändert hat:

```
t=0:00   → T_VL = 45.2 °C → senden (erste Meldung)
t=0:01   → T_VL = 45.3 °C → kein Senden (< 0.5 K Änderung)
t=0:10   → T_VL = 46.0 °C → senden (> 0.5 K = COV-Inkrement)
```

| Vorteil              | Nachteil                           |
| -------------------- | ---------------------------------- |
| Wenig Netzlast       | Ungleichmässige Zeitreihe          |
| Wenig Speicher       | COV-Inkrement falsch → Datenlücken |
| Relevante Änderungen | Schwerer zu visualisieren          |

**Best Practice:** Polling für Anzeige + COV für Archivierung, oder Polling mit niedrigerer Auflösung für Archiv.

---

## Auflösung und Archivierungsdauer

### Auflösungs-Empfehlung

| Datenpunkt-Typ       | Auflösung Echtzeit | Archivauflösung | Aufbewahrung |
| -------------------- | ------------------ | --------------- | ------------ |
| Raumtemperatur       | 1–5 min            | 15 min          | 2 Jahre      |
| Vorlauftemperatur HK | 30 s               | 5 min           | 2 Jahre      |
| Energiezähler        | 15 min             | 15 min          | 5+ Jahre     |
| Alarmereignisse      | Sekunde (Event)    | Sekunde (Event) | 5+ Jahre     |
| Ventilstellung       | 1 min              | 15 min          | 1 Jahr       |
| Störmeldungen        | Sekunde (Event)    | Sekunde (Event) | 5+ Jahre     |

**Grob:** Für Regelungsoptimierung braucht man 1-min-Auflösung. Für Energieberichte reichen 15 min.

---

## BACnet TrendLog-Objekt

BACnet definiert ein standardisiertes **TrendLog**-Objekt (Objekttyp 20):

```
TrendLog-Objekt im DDC:
  LogObjectProperty: AI 1 / Present_Value
  LogInterval: 300 s (5 min)
  MaxBuffer: 10080 (7 Tage × 24h × 2/h)
  Enable: TRUE
  COV_Resubscription_Interval: 300 s
```

GLT liest TrendLog via BACnet ReadRange → Zeitstempel + Wert-Paare.

**Wichtig:** TrendLog wird im DDC-RAM/Flash gespeichert — bei Neustart/Ausfall: Datenverlust wenn GLT nicht regelmässig ausliest!

---

## Moderne Zeitreihendatenbanken

Für professionelles Trending und Analytics:

### InfluxDB

- Zeitreihendatenbank (open source / enterprise)
- Hochperformant für viele Datenpunkte
- Skalierbar, komprimiert effizient
- Tags für Metadaten (Gebäude, Anlage, System)

```
Datenpunkt in InfluxDB:
  measurement: "temperature"
  tags: gebaeude="A", system="HZG", punkt="VL_HK1"
  fields: value=45.3
  timestamp: 2026-05-14T09:00:00Z
```

### Grafana

- Visualisierung von Zeitreihen (open source)
- Verbindet mit InfluxDB, PostgreSQL, etc.
- Dashboards für Energie, Temperaturverläufe, Alarmhistorie
- Alerting-Regeln direkt in Grafana

```
Typischer GA-Stack:
  GLT-Daten → InfluxDB → Grafana-Dashboard
  MQTT-Broker → Telegraf → InfluxDB
  M-Bus-Zähler → Node-RED → InfluxDB
```

---

## Was soll getrendet werden?

### Pflicht-Trends (jede Anlage)

- Alle Temperaturen (VL, RL, Raum, Aussenluft)
- Systemdruck
- Alarme und Störungen (Event-Log)
- Betriebsstunden und Schaltvorgänge

### Empfehlenswert

- Ventil- und Klappenstellungen (Regelgüte beurteilen)
- FU-Drehzahlen (Ventilator, Pumpe)
- Energiezähler (15-min-Werte für Peak-Analyse)
- CO₂, Feuchte in Räumen (Komfort-Monitoring)

### Fehlersuche

Wenn Regelstrecke "komisch" reagiert → 1-min-Trend analysieren:

```
Beispiel: Vorlauftemperatur-Chattering
  → Trendgraph zeigt: Mischventil pendelt ±5 %
  → Ursache: PID-Regler zu aggressiv (Kp zu hoch)
  → Lösung: Kp reduzieren, Ti vergrössern
```

---

## Anomalieerkennung

Mit historischen Daten lassen sich Anomalien automatisch erkennen:

```
Referenz: Vorlauftemperatur immer 42 °C bei TA=-5 °C
Aktuell: Vorlauftemperatur nur 38 °C bei TA=-5 °C
→ Alarm: Sollwert nicht erreicht → Mischventil defekt?
```

**Statistisch:** Wenn aktueller Wert > 3 × Standardabweichung vom saisonalen Mittel → Alarm.

## Normen

- **ASHRAE 135 (BACnet)** — TrendLog, Event-Log Objektdefinitionen
- **VDI 3814** — Dokumentationsanforderungen GA

<!-- EN -->

Without data storage, fault analysis is blind. Trends show whether control loops are functioning, consuming energy, alarms are chattering, or plant is degrading. Good trending is the most important diagnostic tool in BA.

## Recording Methods

### Polling (Cyclic)

BMS reads a data point every X seconds/minutes and stores the value:

```
t=0:00   → T_SUP = 45.2 °C → store
t=0:01   → T_SUP = 45.3 °C → store
t=0:02   → T_SUP = 45.3 °C → store (no change, still stored)
...
```

| Advantage            | Disadvantage                         |
| -------------------- | ------------------------------------ |
| Simple, uniform      | Much storage (even unchanged values) |
| Good for time series | Short transients may be missed       |

### COV — Change of Value

BACnet standard: DDC sends value only when it has changed by ≥ COV increment:

```
t=0:00   → T_SUP = 45.2 °C → send (first message)
t=0:01   → T_SUP = 45.3 °C → no send (< 0.5 K change)
t=0:10   → T_SUP = 46.0 °C → send (> 0.5 K = COV increment)
```

| Advantage             | Disadvantage                    |
| --------------------- | ------------------------------- |
| Low network load      | Irregular time series           |
| Low storage           | Wrong COV increment → data gaps |
| Relevant changes only | Harder to visualise             |

**Best practice:** Polling for display + COV for archiving, or polling at lower resolution for archive.

---

## Resolution and Archiving Duration

### Resolution Recommendations

| Data point type              | Real-time resolution | Archive resolution | Retention |
| ---------------------------- | -------------------- | ------------------ | --------- |
| Room temperature             | 1–5 min              | 15 min             | 2 years   |
| Heating circuit supply temp. | 30 s                 | 5 min              | 2 years   |
| Energy meter                 | 15 min               | 15 min             | 5+ years  |
| Alarm events                 | second (event)       | second (event)     | 5+ years  |
| Valve position               | 1 min                | 15 min             | 1 year    |
| Fault signals                | second (event)       | second (event)     | 5+ years  |

**Roughly:** For control optimisation you need 1-min resolution. For energy reports, 15 min is sufficient.

---

## BACnet TrendLog Object

BACnet defines a standardised **TrendLog** object (object type 20):

```
TrendLog object in DDC:
  LogObjectProperty: AI 1 / Present_Value
  LogInterval: 300 s (5 min)
  MaxBuffer: 10080 (7 days × 24h × 2/h)
  Enable: TRUE
  COV_Resubscription_Interval: 300 s
```

BMS reads TrendLog via BACnet ReadRange → timestamp + value pairs.

**Important:** TrendLog is stored in DDC RAM/Flash — on restart/power failure: data loss if BMS does not read out regularly!

---

## Modern Time-Series Databases

For professional trending and analytics:

### InfluxDB

- Time-series database (open source / enterprise)
- High-performance for many data points
- Scalable, compresses efficiently
- Tags for metadata (building, system, point)

```
Data point in InfluxDB:
  measurement: "temperature"
  tags: building="A", system="HTG", point="SUP_HC1"
  fields: value=45.3
  timestamp: 2026-05-14T09:00:00Z
```

### Grafana

- Time-series visualisation (open source)
- Connects to InfluxDB, PostgreSQL, etc.
- Dashboards for energy, temperature curves, alarm history
- Alerting rules directly in Grafana

```
Typical BA stack:
  BMS data → InfluxDB → Grafana dashboard
  MQTT broker → Telegraf → InfluxDB
  M-Bus meters → Node-RED → InfluxDB
```

---

## What Should Be Trended?

### Mandatory Trends (every installation)

- All temperatures (supply, return, room, outdoor)
- System pressure
- Alarms and faults (event log)
- Operating hours and switching cycles

### Recommended

- Valve and damper positions (assess control quality)
- VSD speeds (fan, pump)
- Energy meters (15-min values for peak analysis)
- CO₂, humidity in rooms (comfort monitoring)

### Fault-Finding

When control loop "behaves oddly" → analyse 1-min trend:

```
Example: Supply temperature chattering
  → Trend graph shows: mixing valve oscillates ±5 %
  → Cause: PID controller too aggressive (Kp too high)
  → Solution: reduce Kp, increase Ti
```

---

## Anomaly Detection

With historical data, anomalies can be detected automatically:

```
Reference: supply temperature always 42 °C at T_outdoor = −5 °C
Current:   supply temperature only 38 °C at T_outdoor = −5 °C
→ Alarm: setpoint not reached → mixing valve faulty?
```

**Statistically:** If current value > 3 × standard deviation from seasonal mean → alarm.

## Standards

- **ASHRAE 135 (BACnet)** — TrendLog, Event-Log object definitions
- **VDI 3814** — Documentation requirements for BA
