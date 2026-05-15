---
title: Ventilautorität — Einfluss auf Regelqualität
slug: ventilautoritaet
category: hydraulik
subcategory: ventile
tags: [ventilautoritaet, kvs-wert, kv-wert, druckabfall, regelqualität, linearventil, gleichprozentigventil, hydraulik, durchflusscharakteristik, stellventil, auslegung]
difficulty: grundlagen
area: [hlk, ga]
related: [motorventile, ventil-schaltungen, druckverlust, kv-wert]
rechner: [ventilautoritaet, kv-wert]
norm: [EN 60534, EN 215]
updated: 2026-05-15
lang: de
---

# Ventilautorität — Einfluss auf Regelqualität

Die **Ventilautorität** α (Alpha) beschreibt, welchen Anteil des Gesamtdruckverlusts im Heizkreis das Ventil bei vollständig geöffneter Stellung übernimmt. Sie bestimmt massgeblich, ob ein Ventil seinen Kreis gut regeln kann.

## Definition

```
α = ΔpV,100 / (ΔpV,100 + ΔpSystem)
```

| Variable | Bedeutung |
|---|---|
| **ΔpV,100** | Druckverlust des Ventils bei 100% Hub (vollgeöffnet) |
| **ΔpSystem** | Druckverlust des restlichen Kreises (WT, Rohre, Fittings) |
| **α** | Ventilautorität [−], 0 bis 1 |

## Einfluss auf die Kennlinie

Das Ventil selbst hat eine geometrisch definierte Kennlinie (linear oder gleichprozentig). Durch die Ventilautorität wird diese **Eigenkennlinie** zur **Stellkennlinie** im eingebauten Zustand verzerrt:

| α | Auswirkung bei Linearventil |
|---|---|
| α = 1.0 | Ideal — Stellkennlinie = Eigenkennlinie |
| α = 0.5 | Gut — leichte Verzerrung, akzeptabel |
| α = 0.3 | Grenzbereich — Kennlinie deutlich konvex |
| α = 0.1 | Schlecht — Ventil öffnet 0–80% Hub ohne nennenswerten Regeleffekt, erst die letzten 20% Hub regeln alles |

**Praxisproblem bei zu kleiner Ventilautorität:** Der Regler arbeitet lange "blind" (kein Durchflusseinfluss) und springt dann schnell in Sättigung → schlechte Regelqualität, Schwingneigung.

## Empfehlungen

| Anwendung | Empfohlenes α |
|---|---|
| Heizkreis, HLK allgemein | ≥ 0.5 |
| Kühlung, enge Spreizung | ≥ 0.4 |
| Unterstation Fernwärme | ≥ 0.3 (Minimumwert) |
| Absolute Untergrenze | 0.2 |

## Kvs-Auswahl für gute Ventilautorität

Ein **zu grosses Kvs** senkt ΔpV,100 und damit α. Die häufigste Ursache schlechter Ventilautorität ist ein überdimensioniertes Ventil.

```
Kv = Q / √(ΔpV)   [m³/h bei ΔpV in bar]
Kvs ≥ Kv × 1.3    [nächste Normgrösse]
```

**Normreihe Kvs**: 0.16 · 0.25 · 0.4 · 0.63 · 1.0 · 1.6 · 2.5 · 4.0 · 6.3 · 10 · 16 · 25 · 40 · 63 · 100

**Fehler**: Oft wird ein DN40-Ventil eingebaut weil das Rohr DN40 ist — aber der Kv-Bedarf wäre Kvs = 4.0 (DN20-Ventil). Das grosse Ventil erzeugt fast keinen Δp → α → 0.

## Gleichprozentige vs. lineare Kennlinie

| Kennlinie | Geeignet für | Vorteil |
|---|---|---|
| **Linear** | α ≥ 0.5 | Einfach, gut bei hoher Autorität |
| **Gleichprozentig** | α 0.3–0.5 | Kompensiert teilweise geringe Autorität |

Ein gleichprozentig-Ventil erzeugt bei niedrigem Hub wenig Durchfluss und steigert ihn exponentiell — das kompensiert die Kennlinienkrümmung bei schlechter Ventilautorität. Es ist aber kein Ersatz für eine vernünftige Dimensionierung.

## Hydraulischer Abgleich und Druckverlust

Der ΔpSystem hängt stark vom hydraulischen Abgleich ab. Bei einem abgeglichenen Netz sind die Druckverluste definiert und die Ventilautorität berechenbar. Bei einem nicht abgeglichenen Netz sind die Druckverhältnisse unklar → Ventilautorität unkontrolliert.

**Druckunabhängige Ventile (PICV)**: Kombinieren Regelventil + Differenzdruckregler in einem. α ist immer ≈ 1, da der Regler den Differenzdruck konstant hält. Ideal für grössere Anlagen.

## Zusammenfassung

> Eine gute Ventilautorität (α ≥ 0.5) ist die Voraussetzung für eine stabile, genaue Regelung. Sie wird durch richtiges Kvs (nicht zu gross) und einen angemessenen System-Δp sichergestellt. Druckunabhängige Ventile (PICV) lösen das Problem elegant auf Kosten höherer Investition.
