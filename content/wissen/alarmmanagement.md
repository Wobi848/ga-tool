---
title: Alarmmanagement in der GA
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
