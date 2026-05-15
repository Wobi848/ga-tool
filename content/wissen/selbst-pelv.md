---
title: SELV und PELV — Schutzkleinspannung in der GA
slug: selv-pelv
category: elektro
subcategory: sicherheit
tags: [selv, pelv, schutzkleinspannung, 24v, niederspannung, sicherheitsstromkreis, berührungsschutz, potentialtrennung, schutzisolation, ddc, sensor, aktor, schaltschrank]
difficulty: grundlagen
area: [ga, elektro]
related: [signaltypen, dali, knx, schirmung-erdung]
norm: [IEC 61140, IEC 60364-4-41, EN 50178, VDE 0100-410]
updated: 2026-05-14
lang: de
---

# SELV und PELV — Schutzkleinspannung in der GA

Fast alle GA-Feldgeräte arbeiten mit 24 VAC oder 24 VDC. Diese Spannung gilt als Kleinspannung — aber die genaue elektrische Sicherheitseinstufung hängt davon ab ob SELV oder PELV vorliegt.

## Schutzklassen und Sicherheitsspannungen

### SELV — Safety Extra-Low Voltage

**Sicherheitskleinspannung:**
- Spannung ≤ 50 VAC / ≤ 120 VDC (Scheitelwert)
- **Potentialgetrennt** von Netzspannung (Schutztransformator mit Doppelwicklung)
- **Keine Erdung** des SELV-Kreises (geerdet würde es zu PELV)
- Auch bei Berührung: kein gefährlicher Strom möglich

**Einsatz:** Überall wo erhöhte Sicherheit nötig ist:
- Nassräume (Badezimmer: SELV < 12 V)
- Ausserhalb von Gebäuden
- Medizinische Geräte
- **DDC-Niederspannungskreise** (wenn galvanisch getrennt)

### PELV — Protective Extra-Low Voltage

**Schutzkleinspannung:**
- Gleiche Spannungsgrenzen wie SELV
- **Darf geerdet sein** (Schutzleiteranschluss erlaubt)
- Potentialgetrennt vom Netz (wie SELV)
- Bei Berührung: Ableitströme über PE möglich, aber kontrolliert

**Einsatz:** Standard in GA-Schaltschränken:
- DDC-Versorgung 24 V über Netzteil
- Sensor- und Aktor-Versorgung
- Bus-Spannungen (KNX, DALI, M-Bus)

### Unterschied SELV/PELV auf einen Blick

| Merkmal               | SELV                        | PELV                        |
|-----------------------|-----------------------------|-----------------------------|
| Spannungsgrenze       | ≤ 50 VAC / 120 VDC          | ≤ 50 VAC / 120 VDC          |
| Potentialtrennung     | ✅ Erforderlich              | ✅ Erforderlich              |
| Erdung erlaubt        | ❌ Nein                     | ✅ Ja (Schutzleiter)         |
| Berührungsschutz      | Sehr hoch                   | Hoch                        |
| Typischer Einsatz GA  | Feuchträume, Medizin        | **Standard DDC-Schrank**    |

---

## 24 VAC vs. 24 VDC in der GA

| Parameter          | 24 VAC                         | 24 VDC                         |
|--------------------|--------------------------------|--------------------------------|
| Häufigkeit         | Ältere Systeme (Stellantriebe) | Moderne Systeme (DDC, Bus)     |
| Messung            | AC-Voltmeter nötig             | DC-Voltmeter                   |
| Polungsabhängigkeit | Nein (Wechselspannung)        | Ja (Verpolen = Schaden!)       |
| Versorgung         | Transformator                  | Netzteil (Gleichrichter + Glättung) |
| Bus-Kompatibilität | Nein                           | Ja (KNX: 29V DC, DALI: 16V DC)|
| Verdrahtungsfehler | Weniger kritisch (nur Überhitzung) | Verpolen zerstört Geräte |

**Merke:** Stellantriebe (Belimo, Siemens) oft 24 VAC **oder** 24 VDC (beide akzeptiert, Handbuch lesen!). KNX und DALI sind 24–29 VDC (Polarität beachten!).

---

## Netzteil-Auswahl für GA-Schaltschrank

```
24 VDC Netzteil:
  Eingang: 230 VAC (Netz)
  Ausgang: 24 VDC
  Leistung: berechnen aus allen Verbrauchern + 20 % Reserve
  
Ausgangsstrom berechnen:
  DDC: 1.5 A (z.B.)
  10 × Stellantrieb: 10 × 0.1 A = 1.0 A
  4 × Sensor: 4 × 0.05 A = 0.2 A
  Bus (KNX): 0.3 A
  ─────────────────────
  Total: 3.0 A × 1.2 (Reserve) = 3.6 A

→ 24 VDC / 5 A Netzteil wählen (nächste Normgrösse)
```

---

## Kurzschlussschutz in Kleinspannungskreisen

Auch bei 24 V sind Kurzschlüsse gefährlich (Kabelbrände möglich!):

- **Netzteil mit Kurzschlussschutz** verwenden (Strombegrenzung oder Abschaltung)
- **Sicherungen** im 24 V-Kreis (0.5–4 A, je nach Stromkreis)
- **Leitungsquerschnitt** ausreichend dimensionieren (0.5 mm² für < 3 A, 1.0 mm² für < 5 A)

---

## Typische GA-Verdrahtungsfehler

| Fehler                        | Konsequenz                       | Lösung                          |
|-------------------------------|----------------------------------|---------------------------------|
| 24 VDC Aktor an 230 V angeschlossen | Gerät zerstört, Brandgefahr | Spannungsebenen farblich kennzeichnen |
| 24 VDC und 24 VAC gemischt    | Geräte liefern falsche Werte     | Strikt trennen                  |
| Kein Schutzleiter am Netzteil | PELV wird zu Floating → Gefahr  | PE immer anschliessen           |
| Überlast Netzteil             | Netzteil überhitzt, Ausfall      | Reserve einplanen                |
| 230V-Fremdpotential am DI     | DDC-Eingang zerstört             | Nur Schutzkleinspannung ans DI! |

## Normen

- **IEC 61140** — Schutz gegen elektrischen Schlag (SELV/PELV Definition)
- **IEC 60364-4-41** — Elektrische Anlagen von Gebäuden, Schutz gegen elektrischen Schlag
- **EN 50178** — Elektronische Betriebsmittel (Netzteile für Automatisierung)
- **VDE 0100-410** (DE) — Errichten elektrischer Anlagen, Schutz gegen elektrischen Schlag
