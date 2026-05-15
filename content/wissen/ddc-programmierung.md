---
title: DDC-Programmierung — IEC 61131-3 Grundlagen
slug: ddc-programmierung
category: ga
subcategory: programmierung
tags: [ddc-programmierung, iec61131, fbd, ld, st, structured-text, funktionsbausteindiagramm, leiterdiagramm, sps, pid-baustein, timer, zähler, fb, fc, programm, zyklus]
difficulty: fortgeschritten
area: [ga]
related: [glt-grundlagen, pid-regler, signaltypen, steuern-regeln]
norm: [IEC 61131-3, EN 61131-3]
updated: 2026-05-14
lang: de
---

# DDC-Programmierung — IEC 61131-3 Grundlagen

DDC-Steuerungen werden nach **IEC 61131-3** programmiert — dem internationalen Standard für SPS- und DDC-Programmiersprachen. Wer GA-Anlagen parametriert oder programmiert, begegnet diesen Sprachen täglich.

## IEC 61131-3 — Fünf Programmiersprachen

| Sprache                | Kürzel | Art                    | Stärke                        |
|------------------------|--------|------------------------|-------------------------------|
| **Funktionsbausteindiagramm** | FBD | Grafisch (Blöcke) | Regelschleifen, GA-Logiken |
| **Kontaktplan**        | LD     | Grafisch (Relais-ähnlich) | Schaltlogiken, Verriegelungen |
| **Strukturierter Text** | ST    | Textuell (Pascal-ähnlich) | Berechnungen, komplexe Logik |
| Anweisungsliste        | IL     | Textuell (Assembler-ähnlich) | Veraltet, selten noch genutzt |
| Ablaufsprache          | SFC    | Grafisch (Zustandsmaschine) | Sequenzielle Abläufe      |

---

## FBD — Funktionsbausteindiagramm

In der GA am häufigsten. Verbindet vorgefertigte Bausteine mit "Drähten":

```
[AI_T_VL] ──► [PID_Regler]──► [AO_Ventil]
[AV_T_SOLL]──►   Kp=2.5
               Ti=5min
               
[DI_Pumpe_LFG]──► [TON Timer]──► [DO_Alarm_Pumpe]
                   Delay=30s
```

**Vorgefertigte Bausteine (FB = Function Block):**
- `PID` — Proportional-Integral-Differential Regler
- `TON` — Timer On-Delay (Einschaltverzögerung)
- `TOF` — Timer Off-Delay (Ausschaltverzögerung)
- `CTU/CTD` — Aufwärts-/Abwärtszähler
- `SR/RS` — Set-Reset-Speicher (Verriegelungslogik)
- `SEL` — Auswahl (wenn-dann)
- `LIMIT` — Begrenzer (min/max)

---

## Structured Text (ST) — Beispiel

Vorlauftemperatur-Berechnung (Heizkurve):

```pascal
(* Heizkurve: Vorlauftemperatur aus Aussentemperatur *)
PROGRAM Heizkurve
VAR
  T_Aussen   : REAL;   (* Aussentemperatur °C *)
  T_VL_Soll  : REAL;   (* Berechneter Vorlauf-Sollwert *)
  Neigung    : REAL := 1.5;   (* Heizkurven-Steilheit *)
  T_Norm_A   : REAL := -10.0; (* Normaussentemperatur *)
  T_Raum_Soll: REAL := 21.0;  (* Raumsolltemperatur *)
END_VAR

(* Berechnung *)
T_VL_Soll := T_Raum_Soll + Neigung * (T_Raum_Soll - T_Aussen);

(* Begrenzen auf 20...80 °C *)
IF T_VL_Soll > 80.0 THEN
  T_VL_Soll := 80.0;
ELSIF T_VL_Soll < 20.0 THEN
  T_VL_Soll := 20.0;
END_IF;
```

---

## Ladder Diagram (LD) — Verriegelungsbeispiel

Pumpen-Verriegelung: Pumpe darf nur laufen wenn kein Frost und Betrieb freigegeben:

```
|--[ BetriebsFreigabe ]--[ /FrostAlarm ]--[ /PumpeStorung ]--( Pumpe_EIN )--|
|                                                                             |
|--[ Pumpe_EIN ]--------------------------------------------------------------|
```

- `[ ]` = Schliesskontakt (Bedingung erfüllt = 1)
- `[ / ]` = Öffnerkontakt (invertiert, Bedingung nicht erfüllt)
- `( )` = Ausgangs-Spule (setzt Ausgang)

Übersetzt: Pumpe ein wenn: BetriebsFreigabe = 1 UND FrostAlarm = 0 UND PumpeStorung = 0

---

## Zyklisches Programm

DDC-Programm läuft zyklisch:

```
Zyklus 1 (z.B. 1 Sekunde):
  1. Eingänge lesen (AI, DI)
  2. Programme ausführen (Bausteine, Logiken)
  3. Ausgänge setzen (AO, DO)
  
Zyklus 2 (1 Sekunde später):
  1. Eingänge lesen (neue Werte)
  2. Programme ausführen
  3. Ausgänge setzen (neue Stellbefehle)
```

**Zykluszeit:** Typisch 100 ms – 5 Sekunden für GA-Anwendungen (schnelle Regelungen: 100 ms, langsame Raumtemperaturen: 5–10 s).

---

## Typische GA-Bausteine

### PID-Baustein

```
                ┌────────────────┐
Istwert X ────►│                │
                │   PID         │───► Stellgrösse Y (0–100 %)
Sollwert W ────►│   Kp: 2.5     │
                │   Ti: 300 s   │
Freigabe ──────►│   Td: 0 s     │
                └────────────────┘
```

Parameter:
- **Kp** (Verstärkung): Wie stark reagiert der Regler auf Abweichung
- **Ti** (Nachstellzeit): Wie lange integriert der I-Anteil
- **Td** (Vorhaltezeit): Wie weit schaut der D-Anteil voraus

### Wärmekurven-Baustein (Hersteller-FB)

```
T_Aussen ──►[ Heizkurve_FB ]──► T_VL_Soll
Neigung  ──►   Neigung=1.5
T_Raum   ──►   T_Raum=21°C
```

Viele DDC-Plattformen bieten fertige Heizkurven-FBs mit Steilheit, Parallelverschiebung, Grenztemperatur.

---

## Hersteller-Spezifika

| Hersteller    | Plattform          | Sprache / Tool                 |
|---------------|--------------------|-------------------------------|
| Siemens       | PXC / Desigo CC    | PPCL / CPS (proprietär)       |
| Sauter        | modu8 / EY-modulo  | EY-modulo Studio (IEC 61131-3)|
| Schneider Electric | TAC Vista / EcoStruxure | C-Bus / IEC 61131-3 |
| Beckhoff      | CX / TwinCAT       | IEC 61131-3 (ST, FBD, LD)     |
| CODESYS       | Viele Hersteller   | CODESYS (IEC 61131-3 Standard)|

**Wichtig:** Programme sind meist **nicht portierbar** zwischen Herstellern. Auch wenn IEC 61131-3 Standard ist, gibt es herstellerspezifische Erweiterungen und Bibliotheken.

## Normen

- **IEC 61131-3** — Programmiersprachen für SPS
- **EN 61131-3** — Europäische Fassung
- **IEC 61131-1** — Allgemeine Informationen zu SPS
