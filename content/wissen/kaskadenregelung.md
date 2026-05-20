---
title: Kaskadenregelung und Führungsregelung
title_en: Cascade Control and Feedforward Control
slug: kaskadenregelung
category: regelung
subcategory: regler
tags: [kaskadenregelung, führungsregelung, übergeordneter-regler, untergeordneter-regler, master-slave, vorlauftemperatur, aussentemperatur, heizkurve, raumtemperatur, witterungsführung, gleitender-sollwert]
difficulty: fortgeschritten
area: [ga, hlk]
related: [pid-regler, steuern-regeln, zweipunktregelung, heizkurve, glt-grundlagen]
rechner: [pid-simulator]
norm: [VDI 3540]
updated: 2026-05-14
lang: de
---

# Kaskadenregelung und Führungsregelung

Viele Prozesse in der GA können mit einfachen Reglern nicht optimal beherrscht werden. Kaskadenregelungen verbinden zwei Regler hintereinander um komplexe Regelstrecken schnell und präzise zu regeln.

## Kaskadenregelung — Prinzip

**Kaskade:** Ein übergeordneter Regler (Master) gibt den Sollwert für einen untergeordneten Regler (Slave) vor.

```
Führungsgrösse (Soll) → [Master-Regler] → Sollwert für Slave
                                              ↓
                         [Slave-Regler] → Stellgrösse → Strecke
                                    ↑
                          Istwert Slave (innerer Kreis)
                                    
Istwert Master → [Master-Regler] ←
```

**Vorteil:** Der innere Kreis (Slave) reagiert schnell auf Störungen der inneren Strecke. Der äussere Kreis (Master) regelt das Gesamtziel langsamer.

---

## Typisches Beispiel: Raumtemperatur-Kaskadenregelung

### Ohne Kaskade (direkte Regelung)

```
Soll-Raumtemperatur → Regler → Mischventil-Stellung
```

Problem: Raumtemperatur reagiert sehr träge (Thermische Masse des Raumes). Regler übersteuert, schwingt.

### Mit Kaskade

```
Soll-Raumtemperatur → [Raum-Regler (Master)]
                              ↓ Soll-Vorlauftemperatur
                       [Vorlauf-Regler (Slave)] → Mischventil
                              ↑ Ist-Vorlauftemperatur (schnell!)
                       ↑ Ist-Raumtemperatur (langsam)
```

**Master** (Raumregler): Vergleicht Ist-Raumtemperatur mit Soll → berechnet benötigte Vorlauftemperatur
**Slave** (Vorlaufregler): Hält die vom Master vorgegebene Vorlauftemperatur schnell und präzise

**Warum besser:** Die Vorlauftemperatur ändert sich schnell (Mischventil) — Raumtemperatur langsam (Trägheit). Der Slave-Regler kann Vorlauf in Sekunden korrigieren, während der Master alle Minuten die Führungsgrösse anpasst.

---

## Witterungsgeführte Regelung (Aufschaltung)

Eine verwandte Technik ist die **Störgrössenaufschaltung**: eine messbare Störgrösse (Aussentemperatur) wird direkt auf den Sollwert aufgeschaltet — bevor der Regler erst auf die Raumabkühlung reagieren muss.

### Heizkurve als Führungsgrösse

```
Aussentemperatur (Führungsgrösse)
        ↓
[Heizkurve: Berechne Vorlauf-Soll aus Aussentemp]
        ↓ Vorlauf-Soll
[Vorlauf-Regler] → Mischventil
        ↑ Vorlauf-Ist
```

**Kein Raumfühler nötig!** Die Heizkurve nimmt vorweg was an Heizleistung benötigt wird. Gut für einfache Anlagen.

**Kombination mit Raum-Rückführung:**

```
Aussentemperatur → [Heizkurve] → Vorlauf-Soll (Basis)
                                        +
Raumtemperatur → [Raumregler] → Korrektur des Vorlauf-Soll
                                        ↓
                              [Vorlauf-Regler] → Mischventil
```

Die Heizkurve liefert den Grundwert, der Raumregler korrigiert die Feinabstimmung.

---

## Weitere Kaskaden in der GA

### Druckkaskade (Lüftung)

```
Raumdruck-Soll → [Raum-Druckregler] → VAV-Soll-Volumenstrom
                                               ↓
                                    [Volumenstrom-Regler] → VAV-Klappe
                                               ↑ Ist-Volumenstrom (schnell)
                        ↑ Ist-Raumdruck (langsam)
```

### Klimatisierungs-Kaskade

```
Raumtemperatur-Soll → [Raum-T-Regler] → Zuluft-T-Soll
                                               ↓
                                    [Zuluft-T-Regler] → Heizung/Kühlung
                                               ↑ Ist-Zuluft-T (schnell)
                        ↑ Ist-Raumtemp (langsam)
```

---

## Parametrierung von Kaskaden

**Wichtige Regel:** Der innere Kreis (Slave) muss **schneller** als der äussere Kreis (Master) eingestellt sein:

```
Slave: kurze Nachstellzeit (Ti klein), aggressivere Reaktion
Master: längere Nachstellzeit (Ti gross), ruhigere Reaktion
```

**Vorgehen:**
1. Slave zuerst parametrieren (Master auf manuell setzen)
2. Slave testen und optimieren
3. Master dazuschalten und optimieren

Wenn Master zu aggressiv parametriert ist → Wechselwirkung → System schwingt.

---

## Normen

- **VDI 3540** — Regelungstechnik für Heizungs-, Lüftungs- und Klimaanlagen
- **DIN IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch

<!-- EN -->

Many processes in BA cannot be controlled optimally with simple single-loop controllers. Cascade control connects two controllers in series to regulate complex plant quickly and precisely.

## Cascade Control — Principle

**Cascade:** An outer controller (master) provides the setpoint for an inner controller (slave).

```
Reference (setpoint) → [Master controller] → Setpoint for slave
                                               ↓
                        [Slave controller] → Control output → Plant
                                   ↑
                         Actual value (inner loop)
                                   
Actual value (outer) → [Master controller] ←
```

**Advantage:** The inner loop (slave) responds quickly to disturbances in the inner plant. The outer loop (master) controls the overall objective more slowly.

---

## Typical Example: Room Temperature Cascade Control

### Without Cascade (Direct Control)

```
Room temperature setpoint → Controller → Mixing valve position
```

Problem: Room temperature responds very slowly (thermal mass of the room). Controller overshoots, oscillates.

### With Cascade

```
Room temp setpoint → [Room controller (master)]
                             ↓ Flow temp setpoint
                      [Flow controller (slave)] → Mixing valve
                             ↑ Actual flow temp (fast!)
                      ↑ Actual room temp (slow)
```

**Master** (room controller): Compares actual room temperature with setpoint → calculates required flow temperature.
**Slave** (flow controller): Maintains the flow temperature commanded by the master quickly and precisely.

**Why better:** Flow temperature changes fast (mixing valve) — room temperature changes slowly (thermal inertia). The slave controller can correct flow temperature in seconds, while the master adjusts the setpoint every few minutes.

---

## Weather-Compensated Control (Feedforward)

A related technique is **disturbance feedforward**: a measurable disturbance (outdoor temperature) is fed directly to the setpoint — before the controller has to wait for the room to cool down.

### Heating Curve as Reference Variable

```
Outdoor temperature (reference variable)
        ↓
[Heating curve: calculate flow setpoint from outdoor temp]
        ↓ Flow setpoint
[Flow controller] → Mixing valve
        ↑ Actual flow
```

**No room sensor required!** The heating curve anticipates the required heat output. Suitable for simple installations.

**Combined with room feedback:**

```
Outdoor temperature → [Heating curve] → Flow setpoint (base)
                                               +
Room temperature → [Room controller] → Correction to flow setpoint
                                               ↓
                                    [Flow controller] → Mixing valve
```

The heating curve provides the base value; the room controller makes fine adjustments.

---

## Further Cascades in BA

### Pressure Cascade (Ventilation)

```
Room pressure setpoint → [Room pressure controller] → VAV target airflow
                                                              ↓
                                                 [Airflow controller] → VAV damper
                                                              ↑ Actual airflow (fast)
                             ↑ Actual room pressure (slow)
```

### Air Conditioning Cascade

```
Room temp setpoint → [Room temp controller] → Supply air temp setpoint
                                                      ↓
                                           [Supply air temp controller] → Heating/cooling
                                                      ↑ Actual supply air temp (fast)
                         ↑ Actual room temp (slow)
```

---

## Tuning Cascades

**Key rule:** The inner loop (slave) must be tuned **faster** than the outer loop (master):

```
Slave: short integral time (Ti small), more aggressive response
Master: longer integral time (Ti large), smoother response
```

**Procedure:**
1. Tune slave first (put master in manual)
2. Test and optimise slave
3. Enable master and optimise

If master is tuned too aggressively → interaction → system oscillates.

---

## Standards

- **VDI 3540** — Control engineering for heating, ventilation, and air conditioning systems
- **DIN IEC 60050-351** — International electrotechnical vocabulary
