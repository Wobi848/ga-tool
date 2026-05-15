---
title: Schirmung und Erdung — EMV in der GA
slug: schirmung-erdung
category: signale
subcategory: emv
tags: [schirmung, erdung, emv, brummschleife, schirmanschluss, kabelschirm, potentialausgleich, entstörung, differenziell, gleichtakt, ferritkern, leitungsführung, messfehler]
difficulty: fortgeschritten
area: [ga, elektro]
related: [signaltypen, frequenzumrichter, modbus, netzwerk-ga]
norm: [IEC 61000-5-2, EN 50174, VDE 0100-540]
updated: 2026-05-14
lang: de
---

# Schirmung und Erdung — EMV in der GA

Messfehler, Signalstörungen und unerklärliche Kommunikationsausfälle haben oft eine gemeinsame Ursache: falsche Schirmung oder Erdung. Die Regeln sind einfach — aber in der Praxis oft falsch umgesetzt.

## Das Problem: Elektromagnetische Einstreuung

Signalleitungen wirken als Antennen. Störquellen:

| Störquelle              | Störmechanismus                        |
|-------------------------|----------------------------------------|
| Frequenzumrichter       | Hohe Oberwellen, Schaltflanken         |
| Motorleitungen          | Elektromagnetische Induktion           |
| Netzspannung 50 Hz      | Kapazitive und induktive Kopplung      |
| Beleuchtung (Schaltvorgang) | Impulsstörer                       |
| Mobilfunk, WLAN         | HF-Einstreuung                         |
| Potentialunterschiede   | Ausgleichsströme über Schirm           |

---

## Schirm-Anschluss: Die Grundregel

### Einseitige Erdung (Standardregel)

```
Gerät A ── Schirm ──────────────── Gerät B
              │
           einseitig
           erdet (z.B. bei A)
              │
             GND/PE
```

**Warum einseitig?** Bei beidseitiger Erdung entsteht eine **Brummschleife**:

```
Gerät A (Potential 0 V) ── Schirm ── Gerät B (Potential 0.3 V)
              │                              │
             GND                           GND
              └──────── Ausgleichsstrom ────┘
                              ↓
                   Stört das Messsignal! (50 Hz Brumm)
```

Der Schirm sollte **am Ende mit der niedrigsten Impedanz** geerdet werden — üblicherweise am Schaltschrank (Empfänger-Seite), nicht am Sensor (Sender-Seite).

### Ausnahme: Beidseitige Erdung bei HF-Störungen

Bei hochfrequenten Störungen (FU, Schaltfrequenzen > 10 kHz) ist beidseitige Erdung besser — der Schirm wirkt dann als Faraday'scher Käfig:

```
→ Wenn Störquelle = FU oder Schaltnetzteil: beidseitig erden (über Y-Kondensator)
→ Wenn Störquelle = 50 Hz Induktion: einseitig erden
→ Im Zweifel: einseitig und prüfen ob besser wird
```

---

## Brummschleife erkennen und beheben

**Symptome:**
- Messwert überlagert mit 50 Hz Zittern (im Trend sichtbar)
- Analoge Messung schwankt ±0.5–2 V
- Modbus-Kommunikation instabil (CRC-Fehler)

**Diagnose:**
1. Messsignal mit Oszilloskop prüfen (50 Hz aufmoduliert?)
2. Schirm an einem Ende öffnen → Störung weg? → Brummschleife bestätigt
3. Potentialdifferenz zwischen zwei Erdungspunkten messen (Sollte < 100 mV sein)

**Lösung:**
1. Schirm nur einseitig erden
2. Galvanische Trennung (Isolationsübertrager, Trennverstärker)
3. Potentialausgleichsleiter zwischen Schaltschränken (separate Leitung, grün-gelb, 6–16 mm²)

---

## Leitungsführung

### Kabelklassen

| Kabeltyp          | Zusammen verlegen?                           |
|-------------------|----------------------------------------------|
| 230 V / 400 V     | NEIN — getrennt von Signalleitungen          |
| Motorleitungen (FU) | NEIN — eigener Kabelweg, grosser Abstand  |
| Bus (Modbus, KNX) | JA mit anderen Bus-Leitungen, getrennt von 230V |
| Analoge Signale   | Getrennt von 230 V, möglichst getrennt von Bus |
| Ethernet          | Getrennt von 230 V (PoE-Kabel haben eigene Schirmung) |

**Mindestabstände:**
- Signal zu 230 V: > 50 mm
- Signal zu Motorleitung (FU): > 200 mm (besser in eigenem Kanal)
- Kreuzen erlaubt (senkrecht), parallel so wenig wie möglich

### Kabelkanäle und Blenden

```
❌ Falsch: Steuerleitung parallel neben FU-Motorleitung 1 m Länge
✅ Richtig: Metallblende trennt, oder 90°-Kreuzung, oder > 200 mm Abstand
```

---

## Analoge Signale — Differenzieller Eingang

Viele DDC-Eingänge für 4–20 mA sind **differenziell** (zwei Klemmen: + und −):

```
4–20 mA Signal:
  + Ader (Signal)
  − Ader (Rückleitung)
  ↑ Beide werden gemessen, Differenz = Nutzsignal
```

Vorteil: Gleichtaktstörungen (auf beiden Adern gleich) werden ausgeblendet → besser als Single-Ended.

> ⚠️ Bei differenziellem Eingang: Schirm **nicht** an Signalleiter anschliessen. Schirm separat an PE (einseitig).

---

## Potentialausgleich im Schaltschrank

```
PE-Sammelschiene (gründes Masseband)
    ├── Schirmklemmen aller Signalleitungen
    ├── Gehäuse des Schaltschranks
    ├── DIN-Schiene
    └── PE-Anschluss der DDC
```

Alle Schirme laufen auf **eine** Sammelschiene — von dort ein einziger Ableitungsweg zu PE. Keine "Sterne" einzelner Schirm-Kabel direkt in die Verteilung.

---

## Normen

- **IEC 61000-5-2** — EMV, Installation und Abschwächungsrichtlinien, Erdung und Schirmung
- **EN 50174-2** — Informationstechnik, Kabelinstallation in Gebäuden
- **VDE 0100-540** — Schutzleiter, Potentialausgleich, Erdung
- **IEC 61131-2** — SPS/DDC-Signalpegel und Störfestigkeit
