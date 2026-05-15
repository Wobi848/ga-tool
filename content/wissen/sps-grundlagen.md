---
title: SPS — Speicherprogrammierbare Steuerung
slug: sps-grundlagen
category: systeme
subcategory: steuerung
tags: [sps, plc, programmierbaresteuerung, iec61131, leitertechnik, strukturiertertext, funktionsbausteinplan, anweisungsliste, signalverarbeitung, zykluszelt, eingabe-ausgabe, feldbus]
difficulty: grundlagen
area: [ga, hlk]
related: [ddc-programmierung, signaltypen, steuern-regeln, kaskadenregelung, pid-regler, profibus, modbus]
norm: [IEC 61131-1, IEC 61131-3]
updated: 2026-05-15
lang: de
---

# SPS — Speicherprogrammierbare Steuerung

Die Speicherprogrammierbare Steuerung (SPS), englisch **PLC** (Programmable Logic Controller), ist das Rückgrat industrieller und gebäudetechnischer Automatisierung. Sie ersetzt festverdrahtete Relaisschaltungen durch softwarebasierte Logik — die Funktion wird im Programm definiert, nicht in der Hardware.

## Grundprinzip

Eine SPS arbeitet in einem **Zyklus**:

```
┌─────────────────────────────────────────────┐
│  1. Eingaben lesen (Digitale + Analoge I)    │
│  2. Programm abarbeiten (Logik/Regelung)     │
│  3. Ausgaben schreiben (Digitale + Analoge O)│
│  4. Kommunikation (Feldbus, HMI, SCADA)      │
└─────────────────────────────────────────────┘
         Zykluszeit: 1 – 50 ms typisch
```

Alle Eingangswerte werden zu Beginn des Zyklus eingelesen und bleiben für den gesamten Zyklus konstant — das Programm arbeitet immer mit einem konsistenten Abbild.

## Hardware-Aufbau

| Modul | Funktion | Beispiel GA |
|---|---|---|
| CPU | Programmausführung, Kommunikation | — |
| DI (Digital Input) | 24V-Signale einlesen | Schaltstellung, Störmeldung |
| DO (Digital Output) | Relais/Transistor schalten | Pumpe EIN/AUS, Ventil |
| AI (Analog Input) | 0–10V / 4–20mA messen | Temp.-Sensor, Druckfühler |
| AO (Analog Output) | 0–10V / 4–20mA ausgeben | Ventilstellung, Frequenzumrichter |
| Kommunikations-Modul | Feldbus-Schnittstelle | BACnet, Modbus, Profibus |

## Programmiersprachen nach IEC 61131-3

Die Norm definiert 5 Sprachen, die alle auf der gleichen SPS lauffähig sind:

### Kontaktplan (KOP / Ladder Diagram, LD)
Grafische Darstellung wie ein Stromkreis. Gut für einfache Schütz-/Verriegelungslogik, von Elektrikern bevorzugt.

```
|---[ ]---[ ]---( )|
| S1     S2     P  |   → Pumpe P läuft wenn Schalter S1 UND S2 geschlossen
```

### Funktionsbausteinsprache (FBS / Function Block Diagram, FBD)
Grafische Verbindung von Blöcken. Ideal für Regelkreise, Signalverarbeitung.

```
[AI_Temp]──→[PID]──→[AO_Ventil]
[SP_Temp]──→
```

### Strukturierter Text (ST / Structured Text)
Pascal-ähnliche Hochsprache. Mächtigste Sprache für komplexe Berechnungen.

```pascal
IF tRaum > tSollwert + 0.5 THEN
    stellgrad := stellgrad - 5.0;
ELSIF tRaum < tSollwert - 0.5 THEN
    stellgrad := stellgrad + 5.0;
END_IF;
stellgrad := LIMIT(0.0, stellgrad, 100.0);
```

### Anweisungsliste (AWL / Instruction List, IL)
Assembler-ähnlich, veraltet, wird selten neu eingesetzt.

### Ablaufsprache (AS / Sequential Function Chart, SFC)
Zustandsmaschine für sequentielle Abläufe (Anfahrsequenz, IBN).

## SPS vs. DDC in der Gebäudeautomation

| Merkmal | SPS | DDC |
|---|---|---|
| Zykluszeit | 1–50 ms | 100–500 ms |
| Primäreinsatz | Maschinen, Prozesse | Gebäude, HLK |
| Normen | IEC 61131 | BACnet, LON, KNX |
| Skalierbarkeit | Mittel | Gut (Netzwerk) |
| Programmierung | IEC 61131-3 | Herstellerspezifisch |
| HVAC-Bausteine | Nachrüstbar | Eingebaut |

In der Praxis gibt es zunehmend Überschneidungen: Moderne DDC-Regler basieren auf SPS-Hardware und unterstützen IEC 61131-3; umgekehrt kommunizieren SPS über BACnet in GA-Netzwerke.

## Typische Anwendungen in der GA

**Lüftungsanlage (RLT):**
- Anfahrsequenz: Klappe öffnen → Ventilator starten → Regelung freigeben
- Schutzbedingungen: Frostschutz, Filterwächter, Brandschutz
- Regelung: Volumenstrom, Temperatur, Feuchte

**Kälteanlage:**
- Verdichter-Management: Zu/Abschalten nach Bedarf
- Sicherheitsverriegelungen: Hochdruckwächter, Ölwächter

**Heizungsanlage:**
- Kesselkaskade: Bedarfsabhängige Stufenzuschaltung
- Heizkurve: Witterungsgeführte Vorlauftemperatur

## Typische Fehlerquellen

| Problem | Ursache | Abhilfe |
|---|---|---|
| Programm läuft, aber keine Reaktion | Falsches I/O-Mapping | Signalbild prüfen |
| Ausgang schaltet kurz und fällt ab | Verriegelungsbedingung nicht erfüllt | Logik mit Force-Funktion debuggen |
| Analogsignal springt | Masse-Potential / Schirmung | Schirmung einseitig erden |
| SPS geht in STOP | Programmfehler (Division durch 0 etc.) | Diagnosepuffer auslesen |
| Zykluszeit zu lang | Zu viel Kommunikation im Zyklus | Kommunikation asynchron entkoppeln |

## Sicherheitstechnik

Normale SPS sind **nicht sicherheitsgerichtet**. Für Sicherheitsfunktionen (SIL, PLe) werden spezielle Failsafe-SPS (z.B. Siemens S7-F, Pilz) eingesetzt, die nach IEC 62061 / ISO 13849 zertifiziert sind. In der GA betrifft das Brandschutzklappen, Entrauchung und Aufzüge.

## Wichtige Begriffe

| Begriff | Bedeutung |
|---|---|
| Prozessabbild (PAE/PAA) | Kopie aller I/O am Zyklusstart |
| Merker / Flag | Interne bool'sche Variable, keine I/O |
| Datenbaustein (DB) | Strukturierter Datenspeicher |
| Funktionsbaustein (FB) | Wiederverwendbarer Codeblock mit eigenem Speicher |
| Watchdog | Überwacht Zykluszeit, STOP bei Überschreitung |
| Retain | Variablen bleiben bei Spannungsausfall erhalten |
