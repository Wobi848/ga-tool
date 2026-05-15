---
title: Druckregelung in Lüftungsanlagen
slug: druckregelung-lueftung
category: lueftung
subcategory: regelung
tags: [druckregelung, kanaldruck, statischer-druck, differenzdruck, vav, pid-regler, frequenzumrichter, ventilator, druckfühler, energiesparmodus, konstantdruck, gleitdruckregelung, druckhaltung]
difficulty: fortgeschritten
area: [hlk, ga]
related: [vav-cav, rlt-anlage, frequenzumrichter, pid-regler, ec-motoren, regelkreise]
rechner: [pid-simulator]
norm: [EN 16798, EN 13779, VDI 3803]
updated: 2026-05-15
lang: de
---

# Druckregelung in Lüftungsanlagen

Die Kanaldruck-Regelung hält den Luftdruck im Lüftungskanal konstant, damit alle VAV-Boxen (Variable Air Volume) mit korrekten Differenzdrücken arbeiten und der Ventilator effizient läuft.

## Warum Druckregelung?

```
VAV-System ohne Druckregelung:
  VAV-Box 1 schliesst → weniger Luftwiderstand im Netz
  → Ventilator fördert bei gleicher Drehzahl zu viel Luft
  → Druck steigt → andere VAV-Boxen erhalten zu viel Druck
  → Geräusche, Regelprobleme, Energieverschwendung
  
VAV-System MIT Druckregelung:
  VAV-Box 1 schliesst → Druck würde steigen
  → Druckregler erkennt Druckanstieg
  → FU reduziert Ventilator-Drehzahl
  → Druck bleibt konstant → alle VAV-Boxen arbeiten korrekt
```

---

## Druckfühler-Position

```
Position des Druckfühlers im Hauptkanal:

Empfehlung: 2/3 des Weges entlang des Hauptkanals
  
  Ventilator → [1/3] → [2/3 ← Fühler hier] → [Ende]
  
  Warum nicht am Anfang (nach Ventilator)?
    → Druck am Anfang immer hoch, VAV-Boxen am Ende zu wenig
    
  Warum nicht am Ende?
    → Fühler reagiert zu träge, Ventilator schwingt
    
  Richtig: 2/3 vom Ventilator → Representative Messung
```

---

## Regelstrategien

### Konstantdruck-Regelung

```
Drucksollwert: z.B. 150 Pa (fest eingestellt)

PID → FU-Sollwert:
  Ist < Soll → FU erhöhen
  Ist > Soll → FU reduzieren
  
Einfach, stabil. Nachteil: im Teillastbetrieb oft zu hoher Druck
→ Mehr Lärm, mehr Energie als nötig
```

### Gleitdruck-Regelung (besser, energiesparend)

```
Drucksollwert wird laufend angepasst:
  
  Alle VAV-Boxen melden Öffnungsgrad
  Wenn alle VAV-Boxen < 90 % geöffnet:
    → Drucksollwert um 5 Pa reduzieren (alle 2 min)
  Wenn eine VAV-Box 100 % geöffnet:
    → Drucksollwert um 5 Pa erhöhen
    
  Ziel: Immer genau eine VAV-Box auf 100 % geöffnet
    → Maximale Energieeinsparung bei vollem Komfort
    
Energieeinsparung vs. Konstantdruck: 10–25 %
```

---

## Zwei-Messbereich-Strategie

Für Anlagen mit stark wechselndem Bedarf:

```
Tag-Betrieb (hoher Bedarf):
  Drucksollwert: 180 Pa
  Ventilator: 60–100 %
  
Nacht-/Wochenend-Betrieb (Absenkung):
  Drucksollwert: 80 Pa
  Ventilator: 20–40 %
  
→ Bei tiefer Drehzahl: n³-Gesetz!
  Halbierte Drehzahl = 1/8 Leistung!
  50 % Drehzahl → 12.5 % Leistung
```

---

## Regelkreis-Einstellungen

```
Typische PID-Einstellwerte Druckregelung Lüftung:

Kp (Proportionalanteil): 0.5–2.0
  Zu hoch → Pendeln (Ventilator beschleunigt/bremst ständig)
  Zu niedrig → Träge Reaktion bei Druckänderungen
  
Ti (Nachstellzeit): 60–180 s
  Lüftungskanal hat relativ schnelle Dynamik
  Aber: FU-Beschleunigung begrenzen (Verschleiss!)
  
Td: meist 0 (kein D-Anteil bei Druckregelung)

Wichtig: FU hat eigene Rampe (Hoch- und Runterlauf)
  Rampe zu schnell → mechanischer Stress Ventilator
  Empfehlung: 20–60 s Hoch/Runterfahrzeit
```

---

## Mehrkanal-Systeme (Mehrzonensysteme)

```
Anlage mit Zu- und Abluft:

Zuluftventilator: Konstantdruck-Regelung
  Fühler: Zuluftkanal
  Ziel: Kanal-Sollwert halten
  
Abluftventilator: Volumenstrom-Kopplung
  Variante A: Drehzahl Abluft = Drehzahl Zuluft (1:1 Kopplung)
  Variante B: Abluft-Volumenstrom = Zuluft − Überströmmenge
  
Überdruckhaltung (leichter Überdruck Gebäude):
  Zuluft etwas mehr als Abluft → Gebäude leicht unter Überdruck
  Verhindert Einzug unkontrollierter Aussenluft (Zugluft)
```

---

## GA-Datenpunkte Druckregelung

| Datenpunkt                 | Typ | Einheit | Beschreibung               |
|----------------------------|-----|---------|----------------------------|
| Kanaldruck Ist             | AI  | Pa      | Druckfühler Kanal          |
| Kanaldruck Sollwert        | AV  | Pa      | Vorgabe (fest / gleitend)  |
| FU Drehzahl Ist            | AI  | %       | Rückmeldung FU             |
| FU Drehzahl Soll           | AO  | %       | PID-Ausgang                |
| Druckalarm (zu tief)       | DI  | —       | < 50 Pa → Alarm            |
| Druckalarm (zu hoch)       | DI  | —       | > 350 Pa → Alarm           |
| Gleitdruck Optimierung     | DV  | —       | Aktiv / Inaktiv            |

---

## Normen

- **EN 16798-3** — Energieeffizienz Lüftungsanlagen (Druckregelung)
- **EN 13779** — Lüftung Nichtwohngebäude (Systemanforderungen)
- **VDI 3803** — Lüftungsanlagen, Energiebedarf
