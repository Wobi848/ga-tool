---
title: Druckregelung in Lüftungsanlagen
title_en: Duct Pressure Control in Ventilation Systems
slug: druckregelung-lueftung
category: lueftung
subcategory: regelung
tags:
  [
    druckregelung,
    kanaldruck,
    statischer-druck,
    differenzdruck,
    vav,
    pid-regler,
    frequenzumrichter,
    ventilator,
    druckfühler,
    energiesparmodus,
    konstantdruck,
    gleitdruckregelung,
    druckhaltung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [vav-cav, rlt-anlage, frequenzumrichter, pid-regler, ec-motoren, regelkreise, k-faktor-luft]
rechner: [pid-simulator]
norm: [EN 16798, SIA 382/1]
updated: 2026-05-15
lang: de
---

# Druckregelung in Lüftungsanlagen

Die Kanaldruck-Regelung hält den Luftdruck im Lüftungskanal konstant, damit alle VAV-Boxen (Variable Air Volume) mit korrekten Differenzdrücken arbeiten und der Ventilator effizient läuft.

## Warum Druckregelung?

**Ohne Druckregelung:** Schliesst ein VAV-Regler, steigt bei gleicher Ventilatordrehzahl der Druck im Kanal. Die übrigen VAV-Regler bekommen mehr Druck als nötig: Strömungsgeräusche, unruhige Regelung, Energie für nichts.

**Mit Druckregelung:** Der Druckregler sieht den Anstieg und senkt die Drehzahl, bis der Kanaldruck wieder auf dem Sollwert liegt.

---

## Druckfühler-Position

Üblich ist ein Messpunkt bei etwa **zwei Dritteln** des Hauptkanals, vom Ventilator aus gesehen:

- **Direkt nach dem Ventilator** ist der Druck immer hoch. Regelt man dort, verschenkt man Energie, und am Ende fehlt bei grossen Netzen trotzdem Druck.
- **Ganz am Ende** misst man in verzweigten Netzen nur einen Ast, die anderen können zu wenig bekommen.
- Bei mehreren Ästen misst man besser in jedem und regelt auf den ungünstigsten, oder man nutzt die Klappenstellungen der VAV-Regler (siehe Gleitdruck).

---

## Regelstrategien

### Konstantdruck-Regelung

Der Druck wird auf einen festen Sollwert geregelt, zum Beispiel 150 Pa. Das ist einfach und stabil, bei Teillast aber oft mehr Druck als nötig: mehr Lärm, mehr Energie.

### Gleitdruck-Regelung (besser, energiesparend)

Der Sollwert wird laufend nachgeführt (Trim and Respond):

- Sind **alle VAV-Regler unter etwa 90 %** geöffnet, sinkt der Drucksollwert schrittweise, etwa um 5 Pa alle 2 Minuten.
- Ist **ein VAV-Regler ganz offen** und erreicht seinen Sollwert nicht, steigt der Drucksollwert wieder.
- So stellt sich der kleinste Druck ein, bei dem alle Zonen ihre Luft bekommen. Einsparung gegenüber Konstantdruck typisch 10–25 %.

---

## Zwei-Messbereich-Strategie

Für Anlagen mit stark wechselndem Bedarf:

- **Tag:** Drucksollwert z.B. 180 Pa, Ventilator 60–100 %
- **Nacht, Wochenende:** Drucksollwert z.B. 80 Pa, Ventilator 20–40 %

Bei tiefer Drehzahl wirkt das Affinitätsgesetz: Die Leistung sinkt mit der dritten Potenz der Drehzahl, halbe Drehzahl heisst theoretisch ein Achtel der Leistung.

---

## Regelkreis-Einstellungen

| Parameter     | Typischer Bereich | Bemerkung                                      |
| ------------- | ----------------- | ---------------------------------------------- |
| Verstärkung   | klein beginnen    | zu hoch: Ventilator pendelt                    |
| Nachstellzeit | 60–180 s          | Kanaldruck reagiert schnell, der FU aber träge |
| Vorhaltzeit   | 0                 | kein D-Anteil, das Drucksignal ist unruhig     |
| Rampe im FU   | 20–60 s           | schont Ventilator und Antrieb                  |

---

## Mehrkanal-Systeme (Mehrzonensysteme)

- **Zuluftventilator:** regelt auf den Kanaldruck in der Zuluft.
- **Abluftventilator:** folgt der Zuluft, entweder über die gleiche Drehzahl oder besser über die Volumenströme: Abluft = Zuluft minus gewollte Überströmmenge.
- **Leichter Überdruck im Gebäude:** etwas mehr Zuluft als Abluft verhindert, dass ungefilterte Aussenluft durch Ritzen einströmt.

---

## GA-Datenpunkte Druckregelung

| Datenpunkt             | Typ | Einheit | Beschreibung              |
| ---------------------- | --- | ------- | ------------------------- |
| Kanaldruck Ist         | AI  | Pa      | Druckfühler Kanal         |
| Kanaldruck Sollwert    | AV  | Pa      | Vorgabe (fest / gleitend) |
| FU Drehzahl Ist        | AI  | %       | Rückmeldung FU            |
| FU Drehzahl Soll       | AO  | %       | PID-Ausgang               |
| Druckalarm (zu tief)   | DI  | —       | < 50 Pa → Alarm           |
| Druckalarm (zu hoch)   | DI  | —       | > 350 Pa → Alarm          |
| Gleitdruck Optimierung | DV  | —       | Aktiv / Inaktiv           |

---

## Normen

- **EN 16798-3** — Energieeffizienz Lüftungsanlagen (Druckregelung)
- **SIA 382/1** — Lüftungs- und Klimaanlagen

<!-- EN -->

Duct pressure control maintains the air pressure in the ventilation duct at a constant level so that all VAV boxes (Variable Air Volume) operate at correct differential pressures and the fan runs efficiently.

## Why Pressure Control?

**Without pressure control:** if a VAV controller closes, the duct pressure rises at the same fan speed. The other VAV controllers get more pressure than needed: airflow noise, unsteady control, energy for nothing.

**With pressure control:** the pressure controller sees the rise and lowers the speed until the duct pressure is back at the setpoint.

---

## Pressure Sensor Position

A measuring point at about **two thirds** of the main duct, seen from the fan, is common:

- **Directly after the fan** the pressure is always high. Controlling there wastes energy, and large networks still lack pressure at the end.
- **At the very end** you measure only one branch in branched networks; the others may get too little.
- With several branches, measure in each and control to the least favourable, or use the VAV damper positions (see variable pressure).

---

## Control Strategies

### Constant Pressure Control

The pressure is controlled to a fixed setpoint, for example 150 Pa. Simple and stable, but at part load often more pressure than needed: more noise, more energy.

### Variable Pressure Control (Better, Energy-Saving)

The setpoint is adjusted continuously (trim and respond):

- If **all VAV controllers are below about 90 %** open, the pressure setpoint drops step by step, for example by 5 Pa every 2 minutes.
- If **one VAV controller is fully open** and misses its setpoint, the pressure setpoint rises again.
- This finds the lowest pressure at which all zones get their air. Savings compared with constant pressure typically 10–25 %.

---

## Two-Range Strategy

For systems with strongly varying demand:

- **Day:** pressure setpoint e.g. 180 Pa, fan 60–100 %
- **Night, weekend:** pressure setpoint e.g. 80 Pa, fan 20–40 %

At low speed the affinity law applies: power falls with the cube of speed; half speed means theoretically one eighth of the power.

---

## Control Loop Settings

| Parameter       | Typical range | Remark                                      |
| --------------- | ------------- | ------------------------------------------- |
| Gain            | start small   | too high: fan hunts                         |
| Integral time   | 60–180 s      | duct pressure reacts fast, the drive slowly |
| Derivative time | 0             | no D action, the pressure signal is noisy   |
| Drive ramp      | 20–60 s       | protects fan and drive                      |

---

## Multi-Duct Systems (Multi-Zone)

- **Supply fan:** controls to the supply duct pressure.
- **Extract fan:** follows the supply, either at the same speed or better via the airflows: extract = supply minus the intended overflow.
- **Slight overpressure in the building:** a little more supply than extract prevents unfiltered outdoor air from entering through gaps.

---

## BA Data Points — Pressure Control

| Data point                     | Type | Unit | Description               |
| ------------------------------ | ---- | ---- | ------------------------- |
| Duct pressure actual           | AI   | Pa   | Pressure sensor in duct   |
| Duct pressure setpoint         | AV   | Pa   | Target (fixed / variable) |
| VSD speed actual               | AI   | %    | VSD feedback              |
| VSD speed setpoint             | AO   | %    | PID output                |
| Pressure alarm (too low)       | DI   | —    | < 50 Pa → alarm           |
| Pressure alarm (too high)      | DI   | —    | > 350 Pa → alarm          |
| Variable pressure optimisation | AV   | —    | Active / inactive         |

---

## Standards

- **EN 16798-3** — Energy efficiency of ventilation systems (pressure control)
- **SIA 382/1** — Ventilation and air-conditioning systems
