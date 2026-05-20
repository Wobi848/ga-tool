---
title: Brandschutzklappen (BSK) — Ansteuerung und Protokollierung
title_en: Fire Dampers — Control and Documentation
slug: brandschutzklappen
category: sicherheit
subcategory: brandschutz
tags: [bsk, brandschutzklappe, feuerschutzklappe, brandschutz, feuerwiderstand, rauchabzug, rwa, auslösung, thermoelement, rückmeldung, protokoll, inbetriebnahme, schmelzeinsatz, en15650, en1366]
difficulty: fortgeschritten
area: [ga, elektro, hlk]
related: [rlt-anlage, alarmmanagement, glt-grundlagen, ddc-programmierung]
norm: [EN 15650, EN 1366-2, EN 13501-3, VdS 2226]
updated: 2026-05-14
lang: de
---

# Brandschutzklappen (BSK) — Ansteuerung und Protokollierung

**Brandschutzklappen** trennen im Brandfall Lüftungskanäle und verhindern damit die Ausbreitung von Feuer und Rauch über das Lüftungssystem. In der GA sind Ansteuerung, Rückmeldung und Protokollierung sicherheitsrelevante Funktionen.

## Funktion und Arten

### Brandschutzklappe (BSK) / Feuerschutzklappe

- Schliesst bei **Temperatur** (Schmelzeinsatz) oder **elektrisch** auf Befehl
- Verhindert Feuerübertragung durch Lüftungskanal
- Klassifizierung: E90 = 90 Minuten Feuerwiderstand

### Rauchschutzklappe (RSK)

- Schliesst bei **Rauchmeldesignal**
- Verhindert Rauchausbreitung (kein Feuerwiderstand nötig)
- Geringere thermische Anforderung als BSK

### Kombiklappe (BSK + RSK)

- Schliesst bei Rauch **und** bei Feuer (Temperatur)
- In der Praxis am häufigsten eingebaut

---

## Auslöse-Mechanismen

| Auslöser           | Beschreibung                                     | GA-Relevanz          |
|--------------------|--------------------------------------------------|----------------------|
| **Schmelzeinsatz** | Mechanisch, bei ca. 72 °C → Feder schliesst Klappe | Ausfallsicher, kein Strom nötig |
| **Elektrischer Auslöser** | 24 V Signal → Klappe schliesst      | Steuerbar, rückmeldbar |
| **Thermoelement**  | Temperaturmessung, löst bei Grenzwert aus       | Kombinierbar         |
| **Rauchmelder**    | Optischer oder ionischer Melder im Kanal        | Für Rauchschutz-Funktion |

**Kombiniert:** Schmelzeinsatz (Sicherheit) + elektrischer Auslöser (Steuerung aus GLT/BMA).

---

## Ansteuerung aus der GA

### Normalzustand: Klappe offen

```
BSK normal: 24 V = Klappe offen (spannungshaltend)
Auslösung:  24 V = 0 V → Feder schliesst Klappe (fail-safe!)
```

**Fail-Safe:** Bei Stromausfall schliessen alle BSK! Das ist gewollt — im Brandfall oft kein Strom vorhanden.

### Elektrische Schaltung (typisch)

```
DDC-Ausgang → Relais → 24 V Haltestrom BSK
                        ├── Rückmeldung AUF (DI)
                        └── Rückmeldung ZU (DI)
```

**WICHTIG:** BSK dürfen **nicht direkt** von DDC-Transistorausgängen gespeist werden — Relais oder getrennter Stromkreis nötig.

---

## Rückmeldung und Überwachung

Jede BSK meldet ihren Status zurück:

| Signal               | Typ | Bedeutung                               |
|----------------------|-----|-----------------------------------------|
| Klappe AUF           | DI  | Betriebszustand, Lüftung aktiv          |
| Klappe ZU            | DI  | Ausgelöst (Brandfall oder Test)         |
| Störung (Sammelstörung) | DI | Klappe reagiert nicht / Endfehler     |

**Endlagen-Überwachung:** Nach Auslösung (Zu-Befehl) muss Klappe innerhalb definierter Zeit die ZU-Meldung liefern. Timeout = Alarm.

### GLT-Alarmierung

| Alarm                         | Priorität | Massnahme                    |
|-------------------------------|-----------|------------------------------|
| BSK ausgelöst (nicht Test)    | Kritisch  | Sofort Feuerwehr + Betreiber |
| BSK Rückmeldung fehlt (Störung) | Hoch    | Inspektion erforderlich      |
| BSK kann nicht zurückgestellt werden | Mittel | Wartung                  |

---

## Rückstellung nach Auslösung

Nach Brandfall oder Test muss BSK manuell zurückgestellt werden:

```
1. Auslöseursache beseitigen (Feuer gelöscht, Kanaltemperatur < 72 °C)
2. Manuelle Rückstellung am Gerät (Schlüssel / Werkzeug)
3. Sichtkontrolle: keine Beschädigungen
4. Strom einschalten → Haltestrom aktiviert → Klappe öffnet
5. Rückmeldung AUF = bestätigt
6. Protokollierung: Datum, Uhrzeit, Person
```

> ⚠️ BSK dürfen **nicht ferngeöffnet** werden ohne Freigabe durch autorisiertes Personal. Sicherheitsverantwortung liegt beim Betreiber.

---

## Inbetriebnahme (IBN) BSK

### Pflichtprüfungen bei IBN

1. **Fabrikatprüfung:** BSK-Zertifikat vorhanden? Korrekte Einbaulage?
2. **Einbaulage:** Horizontal / vertikal korrekt montiert (herstellerspezifisch!)
3. **Auslösetest:** Klappe auf Auslösung prüfen (Signal abschalten)
4. **Endlagentest:** AUF und ZU Rückmeldung prüfen
5. **Schmelzeinsatz:** Temperatur und Typ korrekt?
6. **Rückstellung:** Manuelle Rückstellung funktioniert?
7. **Protokoll:** Alle Punkte dokumentieren

### IBN-Protokoll (Pflichtinhalt)

```
BSK-Liste (pro Klappe):
  - Bezeichnung / ID
  - Einbauort / Gebäudebereich
  - Hersteller, Typ, Zertifikat-Nr.
  - Feuerwiderstandsklasse
  - Auslösetemperatur (Schmelzeinsatz)
  - IBN-Datum
  - Testergebnis: AUF ✓ / ZU ✓ / Rückmeldung ✓
  - Unterschrift Inbetriebnehmer
```

---

## Wiederkehrende Prüfungen

BSK müssen **regelmässig geprüft** werden (Betreiberverantwortung):

| Prüfung               | Intervall   | Beschreibung                       |
|-----------------------|-------------|------------------------------------|
| Sichtprüfung          | Jährlich    | Korrosion, Beschädigung, Freiheit  |
| Funktionsprüfung      | Jährlich    | Auslösung und Rückstellung testen  |
| Vollprüfung           | 5–10 Jahre  | Komplette Prüfung inkl. Dokumentation |

**GA-Unterstützung:** Automatische Erinnerung wenn Prüfintervall abläuft. Testergebnisse in GLT archivieren.

---

## Normen

- **EN 15650** — Lüftung von Gebäuden, Brandschutzklappen
- **EN 1366-2** — Feuerwiderstandsprüfungen für Installationen, Feuerschutzklappen
- **EN 13501-3** — Klassifizierung Feuerwiderstand, Klappen
- **VdS 2226** (DE) — Richtlinien für Brandschutzklappen-Anlagen
- **SIA 181** (CH) — Schallschutz im Hochbau (Klappenanforderungen)

<!-- EN -->

**Fire dampers** isolate ventilation ducts in the event of fire, preventing the spread of fire and smoke through the ventilation system. In BA, control, feedback, and documentation are safety-critical functions.

## Function and Types

### Fire Damper (FD) / Fire Protection Damper

- Closes on **temperature** (fusible link) or **electrically** on command
- Prevents fire transfer through the ventilation duct
- Classification: E90 = 90 minutes fire resistance

### Smoke Damper (SD)

- Closes on **smoke detector signal**
- Prevents smoke propagation (no fire resistance required)
- Lower thermal requirement than fire damper

### Combined Damper (FD + SD)

- Closes on smoke **and** on fire (temperature)
- In practice, the most commonly installed type

---

## Triggering Mechanisms

| Trigger | Description | BA relevance |
|---------|------------|-------------|
| **Fusible link** | Mechanical, at ~72 °C → spring closes damper | Fail-safe, no power needed |
| **Electric actuator** | 24 V signal → damper closes | Controllable, can provide feedback |
| **Thermocouple** | Temperature measurement, trips at threshold | Can be combined |
| **Smoke detector** | Optical or ionisation detector in duct | For smoke protection function |

**Combined:** Fusible link (safety) + electric actuator (control from BMS/fire alarm panel).

---

## Control from BA

### Normal Condition: Damper Open

```
FD normal: 24 V = damper open (voltage maintained)
Trip:      24 V → 0 V → spring closes damper (fail-safe!)
```

**Fail-safe:** On power failure all fire dampers close! This is intentional — power is often lost in a fire.

### Electrical Circuit (Typical)

```
DDC output → relay → 24 V holding current FD
                      ├── Feedback OPEN (DI)
                      └── Feedback CLOSED (DI)
```

**IMPORTANT:** Fire dampers must **not** be powered directly from DDC transistor outputs — a relay or separate circuit is required.

---

## Feedback and Monitoring

Every fire damper reports its status:

| Signal | Type | Meaning |
|--------|------|---------|
| Damper OPEN | DI | Operating state, ventilation active |
| Damper CLOSED | DI | Tripped (fire event or test) |
| Fault (collective) | DI | Damper not responding / end-stop error |

**End-stop monitoring:** After trip (close command), damper must deliver the CLOSED feedback within a defined time. Timeout = alarm.

### BMS Alarms

| Alarm | Priority | Action |
|-------|---------|--------|
| FD tripped (not test) | Critical | Immediately notify fire brigade + operator |
| FD feedback missing (fault) | High | Inspection required |
| FD cannot be reset | Medium | Maintenance |

---

## Reset after Activation

After a fire event or test, the fire damper must be reset manually:

```
1. Remove cause of activation (fire extinguished, duct temperature < 72 °C)
2. Manual reset at device (key / tool)
3. Visual inspection: no damage
4. Restore power → holding current activates → damper opens
5. Feedback OPEN = confirmed
6. Documentation: date, time, person
```

> ⚠️ Fire dampers must **not be opened remotely** without authorisation from qualified personnel. Responsibility lies with the operator.

---

## Commissioning (IBN) of Fire Dampers

### Mandatory Tests at Commissioning

1. **Product verification:** Is the FD certificate present? Correct installation position?
2. **Installation position:** Horizontal/vertical correctly mounted (manufacturer-specific!)
3. **Trip test:** Test damper closure (switch off signal)
4. **End-stop test:** Check OPEN and CLOSED feedback
5. **Fusible link:** Correct temperature rating and type?
6. **Reset:** Manual reset functioning?
7. **Record:** Document all points

### Commissioning Record (Mandatory Contents)

```
FD list (per damper):
  - Designation / ID
  - Installation location / building section
  - Manufacturer, type, certificate no.
  - Fire resistance class
  - Trip temperature (fusible link)
  - Commissioning date
  - Test result: OPEN ✓ / CLOSED ✓ / Feedback ✓
  - Signature of commissioning engineer
```

---

## Recurring Inspections

Fire dampers must be **regularly inspected** (operator responsibility):

| Inspection | Interval | Description |
|-----------|---------|------------|
| Visual inspection | Annual | Corrosion, damage, freedom of movement |
| Function test | Annual | Test trip and reset |
| Full inspection | 5–10 years | Complete check including documentation |

**BA support:** Automatic reminder when inspection interval is due. Archive test results in BMS.

---

## Standards

- **EN 15650** — Ventilation of buildings, fire dampers
- **EN 1366-2** — Fire resistance tests for service installations, fire dampers
- **EN 13501-3** — Classification of fire resistance, dampers
- **VdS 2226** (DE) — Guidelines for fire damper systems
- **SIA 181** (CH) — Sound insulation in buildings (damper requirements)
