---
title: PID-Regler
slug: pid-regler
category: regelung
subcategory: regler
tags: [pid, p-regler, i-regler, d-regler, regelkreis, tuning, sprungantwort, ziegler-nichols]
difficulty: grundlagen
area: [hlk, ga]
related: [regelkreise, heizkurve, kv-wert]
rechner: [pid-simulator]
norm: []
updated: 2026-05-14
lang: de
---

# PID-Regler

Der **PID-Regler** ist der wichtigste Standard-Regler in der Gebäudeautomation. Er kombiniert drei Anteile, um eine Regelgrösse präzise auf den Sollwert zu führen.

## Die drei Anteile

### P — Proportional

Reagiert **sofort** auf die Regelabweichung. Stark = aggressiv, aber bleibende Regelabweichung.

```
u_P = K_p × e(t)
```

- **Wirkung:** Stellgrösse proportional zum Fehler
- **Problem:** Bleibende Abweichung (stationärer Fehler)
- **Anwendung:** Alleine selten — meist Teil von PI/PID

### I — Integral

**Eliminiert den stationären Fehler.** Integriert die Abweichung über die Zeit.

```
u_I = K_i × ∫ e(t) dt
```

- **Wirkung:** Korrigiert solange, bis Soll = Ist
- **Problem:** Verzögert die Reaktion, kann zu Schwingungen führen (Wind-Up)
- **Tuning:** Nachstellzeit T_n in Sekunden

### D — Differenzial

**Reagiert auf die Geschwindigkeit der Änderung.** Dämpft schnelle Sollwertsprünge.

```
u_D = K_d × de(t)/dt
```

- **Wirkung:** Bremst Überschwingen
- **Problem:** Verstärkt Rauschen — bei lauten Sensoren oft weggelassen (PI statt PID)
- **In HLK:** Oft nur bei trägen Strecken sinnvoll

## Tuning nach Ziegler-Nichols

Klassisches Verfahren — bewährt aber konservativ:

1. **I und D deaktivieren** (T_n = ∞, T_v = 0)
2. **K_p erhöhen**, bis die Regelgrösse anfängt zu schwingen
3. **Kritisches K_p (K_p_krit)** und **Schwingungsdauer T_krit** notieren
4. Werte einsetzen:

| Reglertyp | K_p          | T_n          | T_v          |
|-----------|--------------|--------------|--------------|
| P         | 0.5 × K_krit | —            | —            |
| PI        | 0.45 × K_krit| 0.85 × T_krit| —            |
| PID       | 0.6 × K_krit | 0.5 × T_krit | 0.125 × T_krit|

## Praxis-Tipps

- **Raumtemperatur:** PI reicht meist — Strecke ist langsam, kein D nötig
- **Vorlaufregelung:** PID kann sinnvoll sein wenn schnelle Lastwechsel auftreten
- **Drucklufthaltung:** P oder PI — schnelle Reaktion gefragt
- **Frequenzumrichter / Pumpen:** PI mit kurzem T_n
- **Bei Schwingen:** zuerst K_p halbieren, dann T_n verdoppeln

## Häufige Fehler

1. **D-Anteil zu hoch** mit rauschendem Sensor → Stellglied klappert
2. **T_n zu klein** → Aufschwingen
3. **Anti-Wind-Up vergessen** → bei langer Stellgrössen-Begrenzung läuft Integral weg
4. **Soll/Ist-Vertauschung** → der Regler dreht aus statt ein

## Siehe auch

- Regelkreise (allgemein)
- Heizkurve (überlagerte Vorsteuerung)
- Frequenzumrichter
