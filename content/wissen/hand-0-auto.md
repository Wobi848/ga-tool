---
title: Hand-0-Auto — Betriebsarten in der GA
title_en: Hand-0-Auto — Operating Modes in BA
slug: hand-0-auto
category: regelung
subcategory: betrieb
tags:
  [
    hand-0-auto,
    hoa,
    betriebsarten,
    handsteuerung,
    automatikbetrieb,
    notbetrieb,
    failsafe,
    verriegelung,
    freigabe,
    schützsteuerung,
    ddc-betriebsarten,
    gleitsteuerung,
    wartungsschalter,
    übersteuerung,
    bypass
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [ddc-programmierung, glt-grundlagen, vdi3814, alarmmanagement, regelkreise]
rechner: []
norm: [VDI 3814-2, EN ISO 13849, IEC 61131-3]
updated: 2026-05-15
lang: de
---

# Hand-0-Auto — Betriebsarten in der GA

Jede steuerbare Anlage in der GA muss mindestens drei Betriebsarten unterstützen: **Hand (Handbetrieb), 0 (Aus) und Auto (Automatikbetrieb)**. Diese H-0-A-Struktur ist grundlegend für den sicheren Betrieb, die Inbetriebnahme und die Störungsbehebung.

---

## Die drei Betriebsarten

| Zustand  | Kurzzeichen | Beschreibung                                             |
| -------- | ----------- | -------------------------------------------------------- |
| **Hand** | H           | Manueller Eingriff — Anlage läuft unabhängig von DDC/GLT |
| **0**    | 0           | Zwangsabschaltung — Anlage aus, unabhängig von DDC/GLT   |
| **Auto** | A           | DDC/GLT steuert automatisch nach Programm und Regelung   |

---

## Hardware-Ebene: Schützsteuerung

Das klassische H-0-A-Schütz im Schaltschrank:

```
L1 ─────────────────────────────────────┐
                                        │
    H-0-A-Schalter (3-stufig):          │
    ┌─── H (oben)  → Überbrückt DDC     │
    │─── 0 (mitte) → Unterbricht alles  │
    └─── A (unten) → DDC-Ausgang aktiv  │
                                        │
DDC-Ausgang (Schütz K1) ────────────────► Motor
```

**Im Schaltschrank werden H-0-A-Schalter für jeden Verbraucher eingebaut:**

- Pumpen (Heizung, Kühlung)
- Ventilatoren (Zu-/Abluft)
- Klappen (Motor-Stellantriebe)
- Kompressoren

---

## Software-Ebene: DDC-Betriebsarten

Neben dem Hardware-Schalter definiert die DDC-Programmierung Software-Betriebsarten:

| DDC-Betriebsart     | Funktion                                                    |
| ------------------- | ----------------------------------------------------------- |
| **Automatik**       | Normalbetrieb nach Programm/Regelung                        |
| **Hand** (Software) | Operator setzt fixen Sollwert/Stellgrösse via GLT           |
| **Aus** (Software)  | Zwangsabschaltung via GLT, Alarm-Quittierung nötig          |
| **Wartung**         | Deaktiviert Alarme, erlaubt manuelle Tests                  |
| **Notbetrieb**      | Vordefinierter Sicherheitszustand bei Kommunikationsausfall |

### Prioritätshierarchie (wichtig!)

```
Priorität (hoch → niedrig):
1. Hardware H-0-A-Schalter    (physisch, lokal)
2. Sicherheitsverriegelungen  (Frostschutz, Brandschutz)
3. GLT-Handeingriff           (Operator)
4. Automatikprogramm (DDC)    (Zeitprogramm, Regelung)
5. Default/Failsafe           (bei Kommunikationsverlust)
```

---

## Failsafe — Verhalten bei Ausfall

**Kritischste Frage bei jeder GA-Anlage:** Was macht die Anlage, wenn die DDC ausfällt oder die Kommunikation unterbrochen wird?

### Typische Failsafe-Strategien

| Anlage             | Failsafe-Verhalten                 | Begründung                             |
| ------------------ | ---------------------------------- | -------------------------------------- |
| Heizungsventil     | Auf (federkraftgesteuert)          | Frostschutz im Winter                  |
| Kühlung Ventil     | Zu                                 | Keine Kühlung sicherer als Überkühlung |
| Lüftungsanlage     | Weiterbetrieb auf letzter Stellung | Kein Luftmangel                        |
| Brandschutzklappen | Zu (federkraftgesteuert)           | Sicherheit                             |
| Pumpe              | Läuft weiter (Schütz angezogen)    | Frostschutz                            |
| RWA-Klappen        | Zu                                 | Keine Fehlaktivierung                  |

**Faustregel:** Failsafe-Richtung immer auf den "sichereren" Zustand, nicht auf den "wirtschaftlicheren".

---

## Übersteuerung (Override) an der GLT

Die Gebäudeleittechnik erlaubt dem Operator, in den Automatikbetrieb einzugreifen:

```
GLT-Bild: Pumpe P1
  [Auto] [Hand: EIN] [Hand: AUS]
  Aktuell: Auto (läuft: JA)

  Operator klickt "Hand: EIN"
  → DDC setzt Pumpe zwangsweise EIN
  → Alarm "Handeingriff P1" wird generiert
  → Zeitstempel + Benutzer wird protokolliert
```

**Best Practice:**

- Jede Übersteuerung wird alarmiert und protokolliert
- Maximale Übersteuerungsdauer konfigurierbar (z.B. 4h, dann automatisch zurück auf Auto)
- Rückkehr auf Auto: explizit durch Operator oder automatisch nach Ablauf

---

## Inbetriebnahme und H-0-A

Bei der Inbetriebnahme ist H-0-A unverzichtbar:

1. H-Stellung: Anlage mechanisch prüfen (dreht richtig, keine Vibration)
2. A-Stellung: DDC-Verknüpfung prüfen (Rückmeldung kommt an, Regler reagiert)
3. 0-Stellung: Sicherheitsabschaltung prüfen (Frostschutz löst aus?)

---

## Rückmeldungen und Betriebsstunden

Zur H-0-A-Infrastruktur gehören immer:

| Signal              | Typ     | Beschreibung                                                   |
| ------------------- | ------- | -------------------------------------------------------------- |
| Betriebsrückmeldung | DI      | Motorschutzschalter oder Hilfsschütz-Kontakt bestätigt "läuft" |
| Störmeldung         | DI      | Motorschutz ausgelöst (Überlast, Kurzschluss)                  |
| Hand-Rückmeldung    | DI      | H-0-A-Schalter in Hand-Stellung (optional)                     |
| Betriebsstunden     | Counter | DDC zählt Laufzeit → Wartungsintervall                         |

**Plausibilitätsprüfung:** DDC prüft:

- Sollbefehl = EIN, aber Betriebsrückmeldung = AUS → Störalarm nach Quittierungszeit (z.B. 5s)
- H-0-A-Schalter in Hand → Alarm "Handeingriff" generieren

---

## Normative Einordnung

- **VDI 3814-2:** Fordert definiertes Verhalten bei Ausfall und Inbetriebnahme-Unterstützung
- **EN ISO 13849:** Sicherheit von Maschinensteuerungen — Performance Level (für sicherheitsrelevante Abschaltungen)
- **IEC 61131-3:** Standardprogrammierung DDC, Funktionsblöcke für H-0-A üblich (z.B. Siemens HVAC Library)

<!-- EN -->

Every controllable plant in BA must support at least three operating modes: **Hand (manual), 0 (off), and Auto (automatic)**. This H-0-A structure is fundamental to safe operation, commissioning, and fault rectification.

---

## The Three Operating Modes

| State    | Symbol | Description                                                |
| -------- | ------ | ---------------------------------------------------------- |
| **Hand** | H      | Manual override — plant runs independently of DDC/BMS      |
| **0**    | 0      | Forced shutdown — plant off, independent of DDC/BMS        |
| **Auto** | A      | DDC/BMS controls automatically per schedule and regulation |

---

## Hardware Level: Contactor Control

The classic H-0-A switch in the control panel:

```
L1 ─────────────────────────────────────┐
                                        │
    H-0-A switch (3-position):          │
    ┌─── H (top)    → Bypasses DDC     │
    │─── 0 (centre) → Interrupts all   │
    └─── A (bottom) → DDC output active│
                                        │
DDC output (contactor K1) ──────────────► Motor
```

**H-0-A switches are installed in the control panel for every consumer:**

- Pumps (heating, cooling)
- Fans (supply/extract air)
- Dampers (motorised actuators)
- Compressors

---

## Software Level: DDC Operating Modes

In addition to the hardware switch, the DDC program defines software operating modes:

| DDC mode            | Function                                                |
| ------------------- | ------------------------------------------------------- |
| **Automatic**       | Normal operation per schedule/control                   |
| **Hand** (software) | Operator sets fixed setpoint/output via BMS             |
| **Off** (software)  | Forced shutdown via BMS, alarm acknowledgement required |
| **Maintenance**     | Disables alarms, allows manual testing                  |
| **Emergency**       | Predefined safe state on communication failure          |

### Priority Hierarchy (important!)

```
Priority (high → low):
1. Hardware H-0-A switch    (physical, local)
2. Safety interlocks        (frost protection, fire protection)
3. BMS manual override      (operator)
4. Automatic program (DDC)  (schedule, control)
5. Default/failsafe         (on communication loss)
```

---

## Failsafe — Behaviour on Failure

**The most critical question for any BA plant:** What does the plant do when the DDC fails or communication is interrupted?

### Typical Failsafe Strategies

| Plant                 | Failsafe behaviour                      | Reason                            |
| --------------------- | --------------------------------------- | --------------------------------- |
| Heating valve         | Open (spring-return)                    | Frost protection in winter        |
| Cooling valve         | Closed                                  | No cooling safer than overcooling |
| Ventilation system    | Continue on last position               | No lack of air                    |
| Fire dampers          | Closed (spring-return)                  | Safety                            |
| Pump                  | Continues running (contactor energised) | Frost protection                  |
| Smoke extract dampers | Closed                                  | No spurious activation            |

**Rule of thumb:** Failsafe direction always to the "safer" state, not the "more economical" one.

---

## Override at the BMS

The building management system allows the operator to intervene in automatic mode:

```
BMS display: Pump P1
  [Auto] [Manual: ON] [Manual: OFF]
  Current: Auto (running: YES)

  Operator clicks "Manual: ON"
  → DDC forces pump ON
  → Alarm "Manual override P1" is generated
  → Timestamp + user is logged
```

**Best practice:**

- Every override is alarmed and logged
- Maximum override duration configurable (e.g. 4 h, then automatic return to Auto)
- Return to Auto: explicitly by operator or automatically after timeout

---

## Commissioning and H-0-A

During commissioning, H-0-A is indispensable:

1. H position: check plant mechanically (correct rotation, no vibration)
2. A position: check DDC wiring (feedback received, controller responds)
3. 0 position: check safety shutdown (frost protection triggered?)

---

## Feedback and Operating Hours

The H-0-A infrastructure always includes:

| Signal          | Type    | Description                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| Run feedback    | DI      | Motor protection relay or auxiliary contactor confirms "running" |
| Fault signal    | DI      | Motor protection tripped (overload, short circuit)               |
| Hand feedback   | DI      | H-0-A switch in hand position (optional)                         |
| Operating hours | Counter | DDC counts run time → maintenance interval                       |

**Plausibility check:** DDC verifies:

- Command = ON but run feedback = OFF → fault alarm after delay (e.g. 5 s)
- H-0-A switch in Hand → generate "manual override" alarm

---

## Normative Context

- **VDI 3814-2:** Requires defined behaviour on failure and commissioning support
- **EN ISO 13849:** Safety of machine controls — Performance Level (for safety-relevant shutdowns)
- **IEC 61131-3:** Standard DDC programming; H-0-A function blocks common (e.g. Siemens HVAC Library)
