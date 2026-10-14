---
title: Präsenz- und Bewegungsmelder — PIR, Radar und Ultraschall
title_en: Occupancy and Motion Sensors — PIR, Radar and Ultrasonic
slug: praesenzsensoren
category: sensoren
subcategory: präsenz
tags:
  [
    präsenzmelder,
    bewegungsmelder,
    pir,
    radar,
    hf-sensor,
    doppler,
    fmcw,
    ultraschall,
    passiv-infrarot,
    deckenmelder,
    wandmelder,
    dali-präsenz,
    konstantlichtregelung,
    hvac-präsenz,
    belegungserkennung,
    totzonen,
    360-grad,
    multi-sensor
  ]
difficulty: grundlagen
area: [ga, elektro]
related: [beleuchtungssteuerung, raumautomation, sensoren, dali, beschattungssteuerung]
rechner: []
norm: [EN 15193-1 (Beleuchtungssteuerung), IEC 62386-303 (DALI Präsenz), EN 50131]
updated: 2026-10-14
lang: de
---

# Präsenz- und Bewegungsmelder — PIR, Radar und Ultraschall

Belegungs- und Präsenzsensoren sind in modernen Gebäuden unverzichtbar für energieeffiziente Beleuchtungs- und HLK-Steuerung. Die Wahl des richtigen Sensors hängt vom Anwendungsfall, der Raumgrösse und den geforderten Reaktionseigenschaften ab.

---

## Abgrenzung: Bewegungsmelder vs. Präsenzmelder

| Merkmal              | Bewegungsmelder             | Präsenzmelder                                     |
| -------------------- | --------------------------- | ------------------------------------------------- |
| Erfassungsprinzip    | Bewegung erforderlich       | Auch ruhige Personen erkannt                      |
| Technologie          | PIR (einfach)               | PIR (hochempfindlich), Radar, Ultraschall         |
| Abschaltzeit         | kurze Nachlaufzeit          | Nachlaufzeit, einstellbar, oft 5–20 min für Licht |
| Falschausschaltungen | Häufig                      | Selten                                            |
| Einsatz              | Flur, WC, Aussenbeleuchtung | Büro, Besprechungsraum, Einzelbüro                |

---

## PIR — Passiv-Infrarot

### Funktionsprinzip

Jeder Körper oberhalb 0 K emittiert Infrarotstrahlung. Der PIR-Sensor detektiert die **Änderung** der IR-Strahlung im Sichtfeld:

Die Haut liegt bei rund 30 bis 34 °C, der Raum bei etwa 20 °C. Bewegt sich eine Person durch die Zonen der Linse, ändert sich die Strahlung auf dem Detektor, und das gibt ein Signal. Je wärmer der Raum, desto kleiner der Unterschied und desto schlechter die Erfassung.

- **Pyroelektrischer Detektor:** Erzeugt elektrische Ladung bei Temperaturgradient
- **Fresnel-Linse:** Teilt Sichtfeld in Segmente — Übergang zwischen Segmenten erzeugt Signal
- Erfassung: Quer-Bewegung optimal; axiale Bewegung (auf Sensor zu) schlecht

### Sichtfeld und Abdeckung

| Typ         | Erfassungswinkel               | Reichweite     | Montage                 |
| ----------- | ------------------------------ | -------------- | ----------------------- |
| Weitwinkel  | 180° horizontal, 90° vertikal  | 8–12 m         | Wand 2–2,5 m            |
| Decken-360° | 360°                           | Ø 8–12 m Kreis | Decke, Mitte Raum       |
| Langfeld    | 20–30° (eng)                   | bis 30 m       | Korridor, Treppenhaus   |
| Dual-PIR    | Zwei Elemente, Kreuz-Vergleich | 10–15 m        | Weniger Fehlauslösungen |

### Stärken und Schwächen PIR

| Stärken               | Schwächen                                                |
| --------------------- | -------------------------------------------------------- |
| Günstig, robust       | Ruhig sitzende Personen werden schlecht erkannt          |
| Kein EMV-Problem      | Blindwinkel (axial)                                      |
| Weit verbreitet       | Glasscheiben: IR wird blockiert                          |
| Einfache Installation | Temperaturabhängig (bei 36°C Raumtemp: Kontrast minimal) |

---

## Radar / HF-Sensor

### Doppler-Radar

Sendet Mikrowellen (5,8 GHz oder 24 GHz), empfängt Reflexionen. Doppler-Frequenzverschiebung bei bewegten Objekten:

- Erkennt auch **kleinste Bewegungen** (Atmung, Herzschlag bei 24 GHz)
- Durchdringt Glas, dünne Wände (Vorteil und Nachteil!)
- Keine Temperaturabhängigkeit

### FMCW-Radar (Frequency Modulated Continuous Wave)

Modernes Prinzip, für Innenräume meist im 60-GHz-Band:

- Misst Abstand und Geschwindigkeit gleichzeitig
- Erkennt zuverlässig auch ruhig sitzende Personen (Atmungsbewegung)
- Multi-Zone-Fähigkeit: Unterscheidet mehrere Personen und Zonen
- Einsatz: Hochwertige Einzelbüros, Konferenzräume

### Stärken und Schwächen Radar

| Stärken                  | Schwächen                                      |
| ------------------------ | ---------------------------------------------- |
| Erkennt ruhende Personen | Teurer als PIR                                 |
| Temperaturunabhängig     | Durchdringt Wände → unerwünschte Aktivierungen |
| Wenig Totzonen           | EMV-Zulassung beachten (CE)                    |
| Funktioniert hinter Glas | —                                              |

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

Dieses Konzept ist bei hochwertigen Präsenzmeldern verbreitet.

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

| Zustand                  | Typische Reaktion                                         |
| ------------------------ | --------------------------------------------------------- |
| unbelegt, nach 10–15 min | Raumsollwert in Standby, zum Beispiel 2 K tiefer          |
|                          | Lüftung auf Minimum oder aus                              |
|                          | Licht aus                                                 |
|                          | Beschattung darf auf Energie optimieren (Thermoautomatik) |
| belegt                   | sofort zurück auf Komfort                                 |

Standby bedeutet, dass der Komfortwert schnell wieder erreicht wird, darum nur wenige Kelvin. Tiefere Absenkungen gehören in das Zeitprogramm für Nacht und Wochenende.

**Belegungsbasierte HVAC-Steuerung** kann 20–40% Energie gegenüber zeitprogrammgeführtem Betrieb einsparen.

---

## Montage-Empfehlungen

| Raumtyp           | Sensorwahl                            | Montageort                |
| ----------------- | ------------------------------------- | ------------------------- |
| Büro Einzelzimmer | Decken-Präsenzmelder (PIR+Radar)      | Decke mittig              |
| Grossraumbüro     | Mehrere Deckenmelder mit Zonenkonzept | 6–8 m Rasterabstand       |
| Konferenzraum     | FMCW-Radar oder Kombi                 | Decke, zentraler Bereich  |
| Korridor          | PIR Langfeld                          | Wand auf Achse            |
| WC-Zelle          | Ultraschall oder PIR 360°             | Decke                     |
| Eingang / Foyer   | PIR 180° Wand                         | Eingangsbereich, 2 m Höhe |

<!-- EN -->

Occupancy and presence sensors are essential in modern buildings for energy-efficient lighting and HVAC control. The choice of sensor depends on the application, room size, and required response characteristics.

---

## Distinction: Motion Detector vs. Presence Detector

| Feature             | Motion detector                | Presence detector                                  |
| ------------------- | ------------------------------ | -------------------------------------------------- |
| Detection principle | Movement required              | Detects stationary occupants too                   |
| Technology          | PIR (simple)                   | PIR (high-sensitivity), radar, ultrasonic          |
| Switch-off delay    | short hold time                | hold time, adjustable, often 5–20 min for lighting |
| False switch-offs   | Frequent                       | Rare                                               |
| Application         | Corridor, WC, outdoor lighting | Office, meeting room, private office               |

---

## PIR — Passive Infrared

### Operating Principle

Every body above 0 K emits infrared radiation. The PIR sensor detects the **change** in IR radiation within its field of view:

Skin is at about 30 to 34 °C, the room at about 20 °C. When a person moves through the zones of the lens, the radiation on the detector changes, and that gives a signal. The warmer the room, the smaller the difference and the worse the detection.

- **Pyroelectric detector:** Generates electric charge on a temperature gradient
- **Fresnel lens:** Divides the field of view into segments — crossing between segments generates the signal
- Detection: Lateral movement is optimal; axial movement (towards the sensor) is poor

### Field of View and Coverage

| Type         | Detection angle                | Range           | Mounting                |
| ------------ | ------------------------------ | --------------- | ----------------------- |
| Wide-angle   | 180° horizontal, 90° vertical  | 8–12 m          | Wall at 2–2.5 m         |
| Ceiling 360° | 360°                           | Ø 8–12 m circle | Ceiling, centre of room |
| Long-range   | 20–30° (narrow)                | up to 30 m      | Corridor, stairwell     |
| Dual PIR     | Two elements, cross-comparison | 10–15 m         | Fewer false triggers    |

### PIR Strengths and Weaknesses

| Strengths           | Weaknesses                                                   |
| ------------------- | ------------------------------------------------------------ |
| Inexpensive, robust | Poor at detecting people sitting still                       |
| No EMC issues       | Blind spot (axial direction)                                 |
| Widely used         | Glass panes block IR                                         |
| Simple installation | Temperature-dependent (at 36 °C room temp: minimal contrast) |

---

## Radar / RF Sensor

### Doppler Radar

Transmits microwaves (5.8 GHz or 24 GHz), receives reflections. Doppler frequency shift from moving objects:

- Detects even **smallest movements** (breathing, heartbeat at 24 GHz)
- Penetrates glass and thin walls (advantage and disadvantage!)
- No temperature dependency

### FMCW Radar (Frequency Modulated Continuous Wave)

Modern principle, for indoor use mostly in the 60 GHz band:

- Measures distance and velocity simultaneously
- Reliably detects stationary persons (breathing movement)
- Multi-zone capability: distinguishes multiple persons and zones
- Application: high-end private offices, conference rooms

### Radar Strengths and Weaknesses

| Strengths                  | Weaknesses                              |
| -------------------------- | --------------------------------------- |
| Detects stationary persons | More expensive than PIR                 |
| Temperature-independent    | Penetrates walls → unwanted activations |
| Few blind spots            | Observe EMC approval (CE)               |
| Works through glass        | —                                       |

---

## Ultrasonic

Transmits ultrasound (~40 kHz), measures reflection changes (Doppler effect):

- Inexpensive, detects slow movements
- Reflection from all surfaces (including glass)
- Sensitive to air currents (false triggers near ventilation outlets)
- Application: WC cubicles, small enclosed spaces

---

## Combination Sensors (PIR + Radar / PIR + Ultrasonic)

Dual-technology sensors combine the strengths:

- **PIR** for fast initial detection on entry
- **Radar/ultrasonic** for reliable presence detection even at rest

This concept is common in high-quality presence detectors.

---

## DALI Presence Detectors (DALI Part 303)

Modern presence detectors support **DALI-2 Part 303** (Input Device Occupancy Sensor):

- Digital communication over the DALI bus
- Configuration via DALI tool (threshold, hold time, daylight hold-off)
- Feedback to DALI controller: Occupied / Unoccupied / Raw value (illuminance)
- Parameter changes without rewiring

---

## HVAC Presence Control

Presence detectors control not only lighting but also HVAC:

| State                       | Typical response                                    |
| --------------------------- | --------------------------------------------------- |
| unoccupied, after 10–15 min | room setpoint to standby, for example 2 K lower     |
|                             | ventilation to minimum or off                       |
|                             | lighting off                                        |
|                             | shading may optimise for energy (thermal automatic) |
| occupied                    | back to comfort immediately                         |

Standby means the comfort value is reached again quickly, so only a few kelvin. Deeper setbacks belong in the time schedule for nights and weekends.

**Occupancy-based HVAC control** can save 20–40% energy compared to time-schedule-based operation.

---

## Mounting Recommendations

| Room type        | Sensor choice                                | Mounting location         |
| ---------------- | -------------------------------------------- | ------------------------- |
| Private office   | Ceiling presence detector (PIR + radar)      | Ceiling, centre           |
| Open-plan office | Multiple ceiling detectors with zone concept | 6–8 m grid spacing        |
| Conference room  | FMCW radar or combination                    | Ceiling, central area     |
| Corridor         | PIR long-range                               | Wall on axis              |
| WC cubicle       | Ultrasonic or PIR 360°                       | Ceiling                   |
| Entrance / foyer | PIR 180° wall                                | Entrance area, 2 m height |
