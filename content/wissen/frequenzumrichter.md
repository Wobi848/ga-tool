---
title: Frequenzumrichter (FU) in der HLK
slug: frequenzumrichter
category: regelung
subcategory: antriebe
tags: [frequenzumrichter, fu, vfd, umrichter, drehzahlregelung, u-f-kennlinie, pid, motordrehzahl, pumpe, ventilator, emv, modbus, bacnet, anlaufstrom, energiesparen]
difficulty: fortgeschritten
area: [hlk, elektro, ga]
related: [pid-regler, modbus, bacnet, profibus, can-bus]
norm: [IEC 61800, EN 55011, EN 61000, VDE 0160]
updated: 2026-05-14
lang: de
---

# Frequenzumrichter (FU) in der HLK

Ein **Frequenzumrichter** (FU, auch VFD / Variable Frequency Drive) regelt die Drehzahl eines Drehstrommotors durch Veränderung von Frequenz und Spannung. In HLK-Anlagen an Pumpen und Ventilatoren eingesetzt, spart er erheblich Energie.

## Wirkprinzip

```
Netz (50 Hz, 400 V)
  → Gleichrichter (AC→DC, Zwischenkreis)
  → Zwischenkreis (DC-Bus ~540 V)
  → Wechselrichter (IGBT, PWM)
  → Motor (variable Frequenz & Spannung)
```

Der Wechselrichter erzeugt durch **Pulsweitenmodulation (PWM)** eine quasi-sinusförmige Ausgangsspannung mit einstellbarer Frequenz (typisch 0–60 Hz, max. oft 120 Hz).

## Affinitätsgesetze (Ähnlichkeitsgesetze)

Für Kreiselpumpen und Ventilatoren gelten die Ähnlichkeitsgesetze:

| Grösse        | Relation       | Bedeutung                                      |
|---------------|----------------|------------------------------------------------|
| Volumenstrom  | V̇ ~ n          | Halbierung Drehzahl → halber Durchfluss        |
| Förderhöhe    | H ~ n²         | Halbierung Drehzahl → Viertel Förderhöhe       |
| **Leistung**  | **P ~ n³**     | **Halbierung Drehzahl → 1/8 Leistung!**        |

> 💡 **Praxisbeispiel:** Ventilator bei 100 % Drehzahl: 7,5 kW. Bei 75 % Drehzahl: 7,5 × 0,75³ = **3,2 kW**. Energieeinsparung: 57 %!

Das macht FU-Regelung bei Ventilatoren und Pumpen so wirkungsvoll.

## Regelungsmodi

### Drehzahl-Vorgabe (externe Sollwertvorgabe)

- **0–10 V** Analogsignal: 0 V = 0 Hz, 10 V = max. Frequenz
- **4–20 mA** Stromsignal (ausfallsicher, da 0 mA erkannt wird)
- **Digitale Protokolle:** Modbus RTU/TCP, BACnet MS/TP/IP, Profibus, PROFINET

### Integrierter PID-Regler

Die meisten modernen FU haben einen eiggebauten PID-Regler:
- **Istwert-Eingang:** Druckgeber, Temperatursensor (analog oder Bus)
- **Sollwert:** Fest parametriert oder über Analogeingang / Bus vorgegeben
- **Ausgang:** Interne Drehzahlregelung

Beispiel: Pumpendruckregelung ohne externe SPS:
```
Drucksensor (4–20 mA) → FU-Analogeingang
Drucksollwert (z.B. 2,5 bar) → FU-Parameter
FU regelt Drehzahl selbst, sodass p_ist = p_soll
```

### Motorsteuerungs-Varianten (U/f vs. Feldorientiert)

| Verfahren             | Beschreibung                                  | Einsatz                    |
|-----------------------|-----------------------------------------------|----------------------------|
| **U/f (linear)**      | Spannung proportional zur Frequenz            | Pumpen, Ventilatoren       |
| **U/f (quadratisch)** | Spannung ~ f²: energieoptimiert für Lüfter   | Ventilatoren, hohe Einsparung |
| **Sensorlose Vektorregelung** | Rechenmodell für Motor-Fluss      | Präzisere Drehmomentregelung |
| **Closed-Loop-Vektor** | Mit Encoder-Rückführung                      | Aufzüge, Präzisionsantriebe |

Für HLK-Anwendungen reicht **U/f** in der Regel vollkommen aus.

## Wichtige Parametrierungsschritte

1. **Motordaten eingeben:** Nennspannung, Nennstrom, Nennfrequenz, cos φ, Polzahl
2. **Minimal-/Maximalfrequenz** festlegen (z.B. 15–50 Hz)
3. **Rampenzeiten** (Hochlauf / Auslauf): 5–30 s typisch — zu schnell → Überstrom / Störung
4. **PID-Parameter** einstellen falls integrierter Regler genutzt
5. **Busadresse** (Modbus Slave-ID, BACnet MS/TP MAC)
6. **Kommunikationsparameter** (Baudrate, Parität)
7. **Fehlerverhalten** (Auto-Reset, Fehleranzahl, Reaktionszeit)

> ⚠️ **Motordaten-Autotuning:** Viele FU bieten Autotuning an — Motor dreht kurz mit geringer Spannung, FU misst Widerstand/Induktivität. Verbessert die Regelgüte erheblich.

## Schutzfunktionen

| Schutz                    | Beschreibung                                             |
|---------------------------|----------------------------------------------------------|
| Überstromschutz           | Abschaltung bei I > I_max                                |
| Überspannungsschutz       | DC-Bus zu hoch (z.B. bei generatorischem Betrieb)        |
| Unterspannungsschutz      | Netzausfall, zu niedrige Versorgung                      |
| Übertemperaturschutz      | FU-Innentemperatur, Motorthermistor (PTC)                |
| Blockierschutz            | Motor dreht nicht → Überstrom ohne Drehzahl              |
| Kurzschlussschutz         | Phasenkurzschluss am Ausgang                             |

## EMV — Elektromagnetische Verträglichkeit

FU erzeugen durch PWM erhebliche **leitungsgebundene und abgestrahlte Störungen**:

- **EMV-Filter** am Eingang (Netzdrossel + Entstörfilter) — bei CE-Konformität oft vorgeschrieben
- **Motorleitung geschirmt**, Schirm beidseitig aufgelegt
- **Motorleitung kurz halten** (<50 m ohne du/dt-Filter, >50 m du/dt-Filter)
- **FU und Steuerungsleitungen** getrennt führen (mind. 20 cm Abstand)
- **Separater Schutzleiter** FU → Motor (grün-gelb, mind. Querschnitt Aussenleiter)

> ⚠️ **RS-485 / Modbus neben FU:** Schirmung der Busleitung einseitig erden, räumlichen Abstand einhalten — FU-Störungen können Modbus-Kommunikation zerstören.

## Typische GA-Datenpunkte (Modbus)

Die meisten FU-Hersteller (Danfoss, ABB, Siemens, Schneider) bieten Modbus RTU:

| Datenpunkt               | Typ    | Typisches Register       |
|--------------------------|--------|--------------------------|
| Drehzahl-Sollwert        | Soll   | Holding Register         |
| Drehzahl-Istwert         | Ist    | Input Register           |
| Ausgangsfrequenz [Hz]    | Ist    | Input Register           |
| Ausgangsstrom [A]        | Ist    | Input Register           |
| Ausgangsleistung [kW]    | Ist    | Input Register           |
| Betriebsstunden [h]      | Ist    | Input Register           |
| Statuswort               | Ist    | Input Register           |
| Fehlercode               | Ist    | Input Register           |
| Steuerung Start/Stop     | Soll   | Holding Register         |

> **Statuswort** auswerten: Enthält typisch Betrieb, Drehzahl erreicht, Fehler, Handsteuerung aktiv — wichtig für Betriebsmeldung in der GLT.

## Häufige Fehler & Diagnose

| Fehlermeldung           | Ursache                                           | Massnahme                              |
|-------------------------|---------------------------------------------------|----------------------------------------|
| Überstrom (OC)          | Rampe zu kurz, Motor blockiert, Kabelkurzschluss  | Rampenzeit erhöhen, Motor prüfen       |
| Überspannung (OV)       | Auslaufzeit zu kurz (Generator-Betrieb), Netzspike| Bremsrampe verlängern, Bremswiderstand |
| Übertemperatur (OH)     | Lüftung blockiert, Umgebung zu heiss, FU zu klein | Reinigen, Lüfter prüfen, FU ersetzen   |
| Motorübertemperatur     | PTC-Signal: Motor zu heiss                        | Belastung reduzieren, Kühlung prüfen   |
| Netzausfall (UV)        | Netzspannung zu gering                            | USV? Netz prüfen                       |
| Kommunikationsfehler    | Busverbindung unterbrochen                        | Verdrahtung, Adresse, Terminierung     |

## Normen

- **IEC 61800-5-1** — FU-Sicherheitsanforderungen
- **IEC 61800-3** — EMV-Anforderungen für Antriebssysteme
- **EN 50598** — Energieeffizienz von Antriebssystemen (IE-Klassen für Umrichter: IES0–IES2)
