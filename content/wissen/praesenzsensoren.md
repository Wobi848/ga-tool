---
title: Präsenz- und Bewegungsmelder — PIR, Radar und Ultraschall
slug: praesenzsensoren
category: sensoren
subcategory: präsenz
tags: [präsenzmelder, bewegungsmelder, pir, radar, hf-sensor, doppler, fmcw, ultraschall, passiv-infrarot, deckenmelder, wandmelder, dali-präsenz, konstantlichtregelung, hvac-präsenz, belegungserkennung, totzonen, 360-grad, multi-sensor]
difficulty: grundlagen
area: [ga, elektro]
related: [beleuchtungssteuerung, raumautomation, sensoren, dali, beschattungssteuerung]
rechner: []
norm: [EN 15193-1 (Beleuchtungssteuerung), IEC 62386-303 (DALI Präsenz), EN 50131]
updated: 2026-05-15
lang: de
---

# Präsenz- und Bewegungsmelder — PIR, Radar und Ultraschall

Belegungs- und Präsenzsensoren sind in modernen Gebäuden unverzichtbar für energieeffiziente Beleuchtungs- und HLK-Steuerung. Die Wahl des richtigen Sensors hängt vom Anwendungsfall, der Raumgrösse und den geforderten Reaktionseigenschaften ab.

---

## Abgrenzung: Bewegungsmelder vs. Präsenzmelder

| Merkmal | Bewegungsmelder | Präsenzmelder |
|---------|----------------|--------------|
| Erfassungsprinzip | Bewegung erforderlich | Auch ruhige Personen erkannt |
| Technologie | PIR (einfach) | PIR (hochempfindlich), Radar, Ultraschall |
| Abschaltzeit | Sofort bei Stillstand | Nachlaufzeit (30–300 s) |
| Falschausschaltungen | Häufig | Selten |
| Einsatz | Flur, WC, Aussenbeleuchtung | Büro, Besprechungsraum, Einzelbüro |

---

## PIR — Passiv-Infrarot

### Funktionsprinzip
Jeder Körper oberhalb 0 K emittiert Infrarotstrahlung. Der PIR-Sensor detektiert die **Änderung** der IR-Strahlung im Sichtfeld:

```
Menschliche Körpertemperatur: ~37°C
Raumhintergrund: ~20°C
ΔT = ~17 K → starkes Signal bei Bewegung
```

- **Pyroelektrischer Detektor:** Erzeugt elektrische Ladung bei Temperaturgradient
- **Fresnell-Linse:** Teilt Sichtfeld in Segmente — Übergang zwischen Segmenten erzeugt Signal
- Erfassung: Quer-Bewegung optimal; axiale Bewegung (auf Sensor zu) schlecht

### Sichtfeld und Abdeckung

| Typ | Erfassungswinkel | Reichweite | Montage |
|-----|-----------------|-----------|---------|
| Weitwinkel | 180° horizontal, 90° vertikal | 8–12 m | Wand 2–2,5 m |
| Decken-360° | 360° | Ø 8–12 m Kreis | Decke, Mitte Raum |
| Langfeld | 20–30° (eng) | bis 30 m | Korridor, Treppenhaus |
| Dual-PIR | Zwei Elemente, Kreuz-Vergleich | 10–15 m | Weniger Fehlauslösungen |

### Stärken und Schwächen PIR

| Stärken | Schwächen |
|---------|-----------|
| Günstig, robust | Erkennt keine Totbewegung (ruhig sitzende Person) |
| Kein EMV-Problem | Blindwinkel (axial) |
| Weit verbreitet | Glasscheiben: IR wird blockiert |
| Einfache Installation | Temperaturabhängig (bei 36°C Raumtemp: Kontrast minimal) |

---

## Radar / HF-Sensor

### Doppler-Radar
Sendet Mikrowellen (5,8 GHz oder 24 GHz), empfängt Reflexionen. Doppler-Frequenzverschiebung bei bewegten Objekten:
- Erkennt auch **kleinste Bewegungen** (Atmung, Herzschlag bei 24 GHz)
- Durchdringt Glas, dünne Wände (Vorteil und Nachteil!)
- Keine Temperaturabhängigkeit

### FMCW-Radar (Frequency Modulated Continuous Wave)
Modernes Prinzip (77 GHz, mm-Wave):
- Misst Abstand und Geschwindigkeit gleichzeitig
- Erkennt zuverlässig auch ruhig sitzende Personen (Atmungsbewegung)
- Multi-Zone-Fähigkeit: Unterscheidet mehrere Personen und Zonen
- Einsatz: Hochwertige Einzelbüros, Konferenzräume

### Stärken und Schwächen Radar

| Stärken | Schwächen |
|---------|-----------|
| Erkennt ruhende Personen | Teurer als PIR |
| Temperaturunabhängig | Durchdringt Wände → unerwünschte Aktivierungen |
| Keine Totzonen | EMV-Zulassung beachten (CE) |
| Funktioniert hinter Glas | — |

---

## Ultraschall

Sendet Ultraschall (ca. 40 kHz), misst Reflexionsänderungen (Doppler-Effekt):
- Günstig, erkennt langsame Bewegungen
- Reflexion an allen Oberflächen (auch Glas)
- Empfindlich auf Luftströmungen (Fehlauslösungen bei Lüftungsauslass in der Nähe)
- Einsatz: WC-Zellen, kleine abgeschlossene Räume

---

## Kombisensoren (PIR + Radar / PIR + Ultraschall)

Zwei-Technologie-Sensoren kombinieren die Stärken:
- **PIR** für schnelle Erstdetektion bei Betreten
- **Radar/Ultraschall** für zuverlässige Präsenzerkennung auch bei Stillstand

Verbreitetes Konzept bei hochwertigen Präsenzmeldern (z.B. Steinel HF 360, Zumtobel LINOS).

---

## DALI-Präsenzmelder (DALI Part 303)

Moderne Präsenzmelder unterstützen **DALI-2 Part 303** (Input Device Occupancy Sensor):
- Digitale Kommunikation über DALI-Bus
- Konfiguration via DALI-Tool (Schwellwert, Nachlaufzeit, Tageslicht-Hold-off)
- Rückmeldung an DALI-Controller: Belegt / Unbelegt / Rohwert (Helligkeit)
- Parameteränderung ohne Neuverkabelung

---

## HLK-Präsenzsteuerung

Präsenzmelder steuern nicht nur Beleuchtung, sondern auch HLK:

```
Raum unbelegt > 15 min:
    → Raumsollwert auf Absenktemperatur (z.B. 17°C statt 21°C)
    → Lüftung auf Minimalbetrieb
    → Jalousien in Schutzposition

Raum belegt:
    → Normalbetrieb sofort
    → Vorausregelung (optimaler Start) für Komfort
```

**Belegungsbasierte HVAC-Steuerung** kann 20–40% Energie gegenüber zeitprogrammgeführtem Betrieb einsparen.

---

## Montage-Empfehlungen

| Raumtyp | Sensorwahl | Montageort |
|---------|-----------|-----------|
| Büro Einzelzimmer | Decken-Präsenzmelder (PIR+Radar) | Decke mittig |
| Grossraumbüro | Mehrere Deckenmelder mit Zonenkonzept | 6–8 m Rasterabstand |
| Konferenzraum | FMCW-Radar oder Kombi | Decke, zentraler Bereich |
| Korridor | PIR Langfeld | Wand auf Achse |
| WC-Zelle | Ultraschall oder PIR 360° | Decke |
| Eingang / Foyer | PIR 180° Wand | Eingangsbereich, 2 m Höhe |
