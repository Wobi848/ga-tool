---
title: Hand-0-Auto — Betriebsarten in der GA
slug: hand-0-auto
category: regelung
subcategory: betrieb
tags: [hand-0-auto, hoa, betriebsarten, handsteuerung, automatikbetrieb, notbetrieb, failsafe, verriegelung, freigabe, schützsteuerung, ddc-betriebsarten, gleitsteuerung, wartungsschalter, übersteuerung, bypass]
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

| Zustand | Kurzzeichen | Beschreibung |
|---------|------------|-------------|
| **Hand** | H | Manueller Eingriff — Anlage läuft unabhängig von DDC/GLT |
| **0** | 0 | Zwangsabschaltung — Anlage aus, unabhängig von DDC/GLT |
| **Auto** | A | DDC/GLT steuert automatisch nach Programm und Regelung |

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

| DDC-Betriebsart | Funktion |
|----------------|---------|
| **Automatik** | Normalbetrieb nach Programm/Regelung |
| **Hand** (Software) | Operator setzt fixen Sollwert/Stellgrösse via GLT |
| **Aus** (Software) | Zwangsabschaltung via GLT, Alarm-Quittierung nötig |
| **Wartung** | Deaktiviert Alarme, erlaubt manuelle Tests |
| **Notbetrieb** | Vordefinierter Sicherheitszustand bei Kommunikationsausfall |

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

| Anlage | Failsafe-Verhalten | Begründung |
|-------|-------------------|-----------|
| Heizungsventil | Auf (federkraftgesteuert) | Frostschutz im Winter |
| Kühlung Ventil | Zu | Keine Kühlung sicherer als Überkühlung |
| Lüftungsanlage | Weiterbetrieb auf letzter Stellung | Kein Luftmangel |
| Brandschutzklappen | Zu (federkraftgesteuert) | Sicherheit |
| Pumpe | Läuft weiter (Schütz angezogen) | Frostschutz |
| RWA-Klappen | Zu | Keine Fehlaktivierung |

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

| Signal | Typ | Beschreibung |
|--------|-----|-------------|
| Betriebsrückmeldung | DI | Motorschutzschalter oder Hilfsschütz-Kontakt bestätigt "läuft" |
| Störmeldung | DI | Motorschutz ausgelöst (Überlast, Kurzschluss) |
| Hand-Rückmeldung | DI | H-0-A-Schalter in Hand-Stellung (optional) |
| Betriebsstunden | Counter | DDC zählt Laufzeit → Wartungsintervall |

**Plausibilitätsprüfung:** DDC prüft:
- Sollbefehl = EIN, aber Betriebsrückmeldung = AUS → Störalarm nach Quittierungszeit (z.B. 5s)
- H-0-A-Schalter in Hand → Alarm "Handeingriff" generieren

---

## Normative Einordnung

- **VDI 3814-2:** Fordert definiertes Verhalten bei Ausfall und Inbetriebnahme-Unterstützung
- **EN ISO 13849:** Sicherheit von Maschinensteuerungen — Performance Level (für sicherheitsrelevante Abschaltungen)
- **IEC 61131-3:** Standardprogrammierung DDC, Funktionsblöcke für H-0-A üblich (z.B. Siemens HVAC Library)
