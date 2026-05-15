---
title: Hydraulische Ventilschaltungen — Drossel, Beimisch, Umlenkung, Einspritzung
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
