---
title: Kaskadenregelung und Führungsregelung
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
