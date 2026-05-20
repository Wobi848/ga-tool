---
title: Hydraulische Ventilschaltungen — Drossel, Beimisch, Umlenkung, Einspritzung
title_en: Hydraulic Valve Circuits — Throttling, Mixing, Diverting and Injection
slug: ventil-schaltungen
category: hydraulik
subcategory: regelung
tags: [drosselschaltung, beimischschaltung, umlenkschaltung, einspritzschaltung, 2-weg-ventil, 3-weg-ventil, regelventil, hydraulik, mischventil, heizkreis, kühlkreis, vormischung]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulische-schaltungen, motorventile, pid-regler, temperaturspreizungen]
norm: [EN 14336, VDI 3814]
updated: 2026-05-15
lang: de
---

# Hydraulische Ventilschaltungen

Die Ventilschaltung bestimmt, wie ein Regelventil in den Heiz- oder Kühlkreis eingebunden ist. Die Wahl der Schaltung beeinflusst Regelqualität, Energieeffizienz und hydraulische Stabilität des Gesamtsystems.

## Auswahltabelle

| Schaltungsart | Übliche Schaltungen | Seltene Schaltungen |
|---|---|---|
| mit 2-Weg-Ventil | Drosselschaltung | Einspritzschaltung (2-Weg) |
| mit fester Vormischung | Beimischschaltung (variabel) | Beimischschaltung (fest) |
| mit 3-Weg-Ventil | Umlenkschaltung | Einspritzschaltung (3-Weg) |

---

## 1 — Drosselschaltung (2-Weg-Ventil, üblich)

Das 2-Weg-Ventil sitzt **in Reihe** im Verbraucherkreis und drosselt den Volumenstrom stufenlos.

```
Vorlauf ──► [2-Weg-Ventil] ──► Verbraucher ──► Rücklauf
```

| Eigenschaft | Wert |
|---|---|
| Volumenstrom Sekundär | Variabel — sinkt bei Teillast |
| Vorlauftemperatur | Konstant (Primärkreis) |
| Rücklauftemperatur | Steigt bei Teillast |
| Pumpenenergie | Sinkt bei Teillast (variable Pumpe) |
| Regelgüte | Gut — einfaches Regelverhalten |

**Einsatz:** Standardschaltung für Heiz- und Kühlregister in RLT-Anlagen, überall wo variable Volumenströme unkritisch sind.

> ⚠️ Bei konstantem Pumpenbetrieb ohne Überströmventil steigt der Differenzdruck wenn viele Ventile schliessen → Ventile müssen für den maximalen Differenzdruck ausgelegt sein (Stellverhältnis beachten).

---

## 2 — Einspritzschaltung mit 2-Weg-Ventil (selten)

Ein 2-Weg-Ventil speist einen kleinen Primärvolumenstrom direkt in den **umlaufenden Sekundärkreis** ein. Der Sekundärkreis hat eine eigene Pumpe und läuft im Kurzschluss.

```
Primär-VL ──► [2-Weg-Ventil] ──►┐
                                 ├──► Verbraucher ──►┐
                     Sek.-Pumpe ◄┘                   │
Primär-RL ◄──────────────────────────────────────────┘
```

| Eigenschaft | Wert |
|---|---|
| Volumenstrom Primär | Sehr klein (nur Einspritzmenge) |
| Volumenstrom Sekundär | Konstant und gross |
| Regelgrösse | Mischtemperatur im Sekundärkreis |
| Regelgüte | Sehr gut, aber Kvs-Auslegung kritisch |

**Einsatz:** Wenn der Primärvolumenstrom minimal sein soll (z.B. Fernwärme mit sehr hohem ΔT). Selten wegen Komplexität (eigene Sekundärpumpe, Rücklaufleitung ins Primärnetz).

---

## 3 — Beimischschaltung variabel (3-Weg-Mischer, üblich)

Ein 3-Weg-Mischventil mischt stufenlos **Primär-Vorlauf + Sekundär-Rücklauf** zu einer geregelten Mischtemperatur. Volumenstrom im Sekundärkreis bleibt konstant.

```
Primär-VL ──►┐
             [3-Weg-Mischer] ──► Verbraucher ──►┐
Sek.-RL ─────┘                                  │
             ◄──────────────────────────────────┘
```

| Eigenschaft | Wert |
|---|---|
| Volumenstrom Sekundär | Konstant |
| Vorlauftemperatur | Variabel (geregelte Mischtemperatur) |
| Primärvolumenstrom | Variabel |
| Regelgüte | Gut — bei grossem Mischungsverhältnis träge |

**Einsatz:** FBH, Deckenheizung/-kühlung, Fernwärme-Übergabe, überall wo konstanter Sekundärvolumenstrom gewünscht ist.

---

## 4 — Beimischschaltung mit fester Vormischung (selten)

Statt eines steuerbaren Mischventils wird ein **fixer Bypass** (Drosselventil oder kalibrierte Öffnung) eingebaut. Das Mischungsverhältnis ist konstruktiv festgelegt — keine aktive Regelung der Mischtemperatur möglich.

```
Primär-VL ──────────────────────► Verbraucher ──►┐
               │                                  │
               └── Fixer Bypass ──────────────────┘
                   (Drosselventil)
```

| Eigenschaft | Wert |
|---|---|
| Mischungsverhältnis | Fix — nicht regelbar |
| Vorlauftemperatur | Fest abhängig vom Primär-VL |
| Regelung | Nur über Primärtemperatur oder Primärvolumenstrom |
| Regelgüte | Gering — keine lokale Anpassung möglich |

**Einsatz:** Nur wenn eine vereinfachte, wartungsarme Lösung ohne Stellantrieb akzeptabel ist — z.B. einfache Heizkörpergruppen im Bestand, Sekundärkreise mit unveränderlichem Wärmebedarf.

---

## 5 — Umlenkschaltung (3-Weg-Umlenker, üblich)

Das 3-Weg-Ventil hat **einen Eingang** und **zwei Ausgänge** — es verteilt den Volumenstrom entweder zum Verbraucher oder zum Bypass.

```
Primär-VL ──► [3-Weg-Umlenker] ──► Verbraucher ──► Primär-RL
                      │
                      └──────────► Bypass ──► Primär-RL
```

| Eigenschaft | Wert |
|---|---|
| Volumenstrom Primär | Konstant (Pumpe immer gleich belastet) |
| Volumenstrom Verbraucher | Variabel |
| Vorlauftemperatur | Konstant |
| Regelgüte | Sehr gut — schnelles Ansprechen |

**Einsatz:** Erzeuger mit Mindestvolumenstrom — Wärmepumpen, Kessel mit Mindestrücklauftemperatur, Kältemaschinen.

> ℹ️ Primär- und Sekundärkreis sind hydraulisch nicht entkoppelt. Bei unterschiedlichen Pumpendrücken entstehen Überlagerungseffekte.

---

## 6 — Einspritzschaltung mit 3-Weg-Ventil (selten)

Wie die 2-Weg-Einspritzschaltung, aber das 3-Weg-Ventil übernimmt gleichzeitig die **Rücklaufführung** zurück ins Primärnetz. Dadurch entfällt eine separate Rücklaufleitung.

```
Primär-VL ──►┐
             [3-Weg-Ventil] ──► Sek.-Kreis (eigene Pumpe, Kurzschluss)
Primär-RL ◄──┘
```

| Eigenschaft | Wert |
|---|---|
| Volumenstrom Primär | Sehr klein |
| Volumenstrom Sekundär | Konstant und gross |
| Vorteil ggü. 2-Weg | Weniger Rohrleitungen, integrierte RL-Führung |
| Regelgüte | Sehr gut — Kvs-Auslegung kritisch |

**Einsatz:** Betonkernaktivierung, grosse träge Systeme, Fernwärme mit hohem Primär-ΔT. Etwas weniger komplex als die 2-Weg-Variante da das 3-Weg-Ventil VL- und RL-Seite des Primärnetzes zusammenfasst.

---

## Vergleich alle 6 Schaltungen

| # | Schaltung | Ventil | Primär-VS | Sek.-VS | Sek.-VL-Temp | Einsatz |
|---|---|---|---|---|---|---|
| 1 | Drosselung | 2-Weg | variabel | variabel | konstant | Register, Konvektoren |
| 2 | Einspritzung | 2-Weg | minimal | konstant | variabel | Fernwärme hohem ΔT |
| 3 | Beimischung variabel | 3-Weg Mischer | variabel | konstant | variabel | FBH, Fernwärme |
| 4 | Beimischung fest | Fixblende | — | konstant | fix | Bestand, simpel |
| 5 | Umlenkung | 3-Weg Umlenker | konstant | variabel | konstant | WP, KM, Kessel |
| 6 | Einspritzung | 3-Weg | minimal | konstant | variabel | BKA, träge Systeme |

---

## GA-Programmierhinweise

**Drosselschaltung:** Stellgrösse = Ventilhub (0–100 %), Regelgrösse = Registernachlauftemperatur oder Raumtemperatur.

**Beimischschaltung variabel:** Fühler **nach dem Mischer** als Regelgrösse. Bei grossem Mischungsverhältnis (viel Rücklauf, wenig Primär) träge → I-Zeit erhöhen.

**Beimischschaltung fest:** Keine Stellgrösse vor Ort — Regelung nur über Primärtemperatur (Erzeuger) oder Primärvolumenstrom. GA überwacht nur, regelt nicht lokal.

**Umlenkschaltung:** Primärpumpe läuft konstant durch. Bypass muss immer offen sein wenn Verbraucher schliesst — Verriegelung in der GA wichtig (kein Totschluss).

**Einspritzschaltung (2-Weg/3-Weg):** Sekundärpumpe läuft konstant. Einspritzmenge = einzige Stellgrösse → Ventil-Kvs nicht überdimensionieren (kleine Hübe bei grosser Wirkung → instabiler Regelkreis).

<!-- EN -->

## Hydraulic Valve Circuits — Throttling, Mixing, Diverting and Injection

The valve circuit determines how a control valve is integrated into the heating or cooling circuit. The choice of circuit influences control quality, energy efficiency and the hydraulic stability of the overall system.

## Selection Table

| Circuit type | Common | Rare |
|-------------|--------|------|
| With 2-way valve | Throttling circuit | Injection circuit (2-way) |
| With fixed premix | Mixing circuit (variable) | Mixing circuit (fixed) |
| With 3-way valve | Diverting circuit | Injection circuit (3-way) |

---

## 1 — Throttling Circuit (2-way valve, common)

The 2-way valve sits **in series** in the consumer circuit and throttles the volume flow continuously.

```
Flow ──► [2-way valve] ──► Consumer ──► Return
```

| Property | Value |
|----------|-------|
| Secondary flow rate | Variable — falls at part load |
| Flow temperature | Constant (primary circuit) |
| Return temperature | Rises at part load |
| Pump energy | Falls at part load (variable pump) |
| Control quality | Good — simple control behaviour |

**Application:** Standard circuit for heating and cooling coils in AHUs, wherever variable flow rates are uncritical.

> With constant pump operation and no overrun valve, differential pressure rises when many valves close → valves must be sized for maximum differential pressure (check controllability ratio).

---

## 2 — Injection Circuit with 2-Way Valve (rare)

A 2-way valve feeds a small primary flow directly into the **circulating secondary circuit**. The secondary circuit has its own pump and runs in short-circuit.

```
Primary flow ──► [2-way valve] ──►┐
                                   ├──► Consumer ──►┐
                    Sec. pump ◄────┘                │
Primary return ◄────────────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Primary flow rate | Very small (injection quantity only) |
| Secondary flow rate | Constant and large |
| Controlled variable | Mixed temperature in secondary circuit |
| Control quality | Very good, but Kvs sizing critical |

**Application:** When primary flow should be minimal (e.g. district heat with very high ΔT). Rare due to complexity (own secondary pump, return pipe to primary network).

---

## 3 — Variable Mixing Circuit (3-way mixing valve, common)

A 3-way mixing valve continuously blends **primary flow + secondary return** to a controlled mixed temperature. The secondary circuit flow rate remains constant.

```
Primary flow ──►┐
                [3-way mixer] ──► Consumer ──►┐
Sec. return ────┘                              │
                ◄──────────────────────────────┘
```

| Property | Value |
|----------|-------|
| Secondary flow rate | Constant |
| Flow temperature | Variable (controlled mixed temperature) |
| Primary flow rate | Variable |
| Control quality | Good — sluggish at large mixing ratio |

**Application:** UFH, chilled/heated ceilings, district heat interface, wherever constant secondary flow is desired.

---

## 4 — Fixed Mixing Circuit (rare)

Instead of a controllable mixing valve, a **fixed bypass** (throttle valve or calibrated orifice) is installed. The mixing ratio is set by construction — no active control of mixed temperature is possible.

```
Primary flow ──────────────────► Consumer ──►┐
                  │                           │
                  └── Fixed bypass ───────────┘
                      (throttle valve)
```

| Property | Value |
|----------|-------|
| Mixing ratio | Fixed — not adjustable |
| Flow temperature | Fixed, depending on primary flow |
| Control | Only via primary temperature or flow rate |
| Control quality | Low — no local adjustment |

**Application:** Only where a simplified, low-maintenance solution without actuator is acceptable — e.g. simple radiator groups in existing buildings, secondary circuits with unchanging heat demand.

---

## 5 — Diverting Circuit (3-way diverting valve, common)

The 3-way valve has **one inlet** and **two outlets** — it distributes flow either to the consumer or to the bypass.

```
Primary flow ──► [3-way diverter] ──► Consumer ──► Primary return
                        │
                        └──────────► Bypass ──► Primary return
```

| Property | Value |
|----------|-------|
| Primary flow rate | Constant (pump always equally loaded) |
| Consumer flow rate | Variable |
| Flow temperature | Constant |
| Control quality | Very good — fast response |

**Application:** Generators with minimum flow rate — heat pumps, boilers with minimum return temperature, chillers.

> Primary and secondary circuits are not hydraulically decoupled. Different pump pressures create superimposition effects.

---

## 6 — Injection Circuit with 3-Way Valve (rare)

Like the 2-way injection circuit, but the 3-way valve simultaneously handles **return routing** back to the primary network, eliminating a separate return pipe.

```
Primary flow ──►┐
                [3-way valve] ──► Sec. circuit (own pump, short-circuit)
Primary return ◄┘
```

| Property | Value |
|----------|-------|
| Primary flow rate | Very small |
| Secondary flow rate | Constant and large |
| Advantage vs. 2-way | Fewer pipes, integrated return routing |
| Control quality | Very good — Kvs sizing critical |

**Application:** Thermally activated building systems, large sluggish systems, district heat with high primary ΔT.

---

## Comparison of All 6 Circuits

| # | Circuit | Valve | Primary flow | Sec. flow | Sec. flow temp | Application |
|---|---------|-------|-------------|-----------|----------------|-------------|
| 1 | Throttling | 2-way | Variable | Variable | Constant | Coils, convectors |
| 2 | Injection | 2-way | Minimal | Constant | Variable | District heat, high ΔT |
| 3 | Mixing variable | 3-way mixer | Variable | Constant | Variable | UFH, district heat |
| 4 | Mixing fixed | Fixed orifice | — | Constant | Fixed | Existing buildings |
| 5 | Diverting | 3-way diverter | Constant | Variable | Constant | HP, chiller, boiler |
| 6 | Injection | 3-way | Minimal | Constant | Variable | TABS, sluggish systems |

---

## BA Programming Notes

**Throttling circuit:** controlled output = valve position (0–100 %), controlled variable = coil downstream temperature or room temperature.

**Variable mixing circuit:** sensor **after the mixer** as controlled variable. With large mixing ratio (much return, little primary) response is sluggish → increase integral time.

**Fixed mixing circuit:** no local actuator — control only via primary temperature (generator) or primary flow. BA monitors only, does not control locally.

**Diverting circuit:** primary pump runs constantly through. Bypass must always be open when consumer closes — interlock in BA essential (prevent dead-end pressure buildup).

**Injection circuit (2-way/3-way):** secondary pump runs constantly. Injection quantity = the only controlled output → do not oversize valve Kvs (small strokes with large effect → unstable control loop).
