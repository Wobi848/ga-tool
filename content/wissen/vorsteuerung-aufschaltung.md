---
title: Vorsteuerung und Störgrössenaufschaltung
slug: vorsteuerung-aufschaltung
category: regelung
subcategory: regelstrategien
tags: [vorsteuerung, störgrössenaufschaltung, feedforward, aufschaltung, witterungsführung, aussentemperatur, heizkurve, pid-erweiterung, kompensation, vorhaltezeit, führungsgrösse, steuerung-regelung]
difficulty: fortgeschritten
area: [ga, hlk]
related: [pid-regler, kaskadenregelung, heizkurve, sollwertfuehrung, regelkreise]
rechner: []
norm: [VDI 3814, IEC 61131-3]
updated: 2026-05-15
lang: de
---

# Vorsteuerung und Störgrössenaufschaltung

Reine PID-Regelung reagiert immer erst, **nachdem** eine Abweichung (Regelabweichung e) entstanden ist. **Vorsteuerung** und **Störgrössenaufschaltung** ergänzen den Regelkreis um prädiktive Elemente, die bekannte Stör- oder Führungsgrössen direkt kompensieren — bevor die Regelgrösse abweicht.

---

## Prinzip: Feedback vs. Feedforward

| Ansatz | Reaktion | Voraussetzung |
|--------|---------|--------------|
| Feedback (PID) | Reagiert auf Regelabweichung | Keine — universell |
| Feedforward (Vorsteuerung) | Reagiert auf Stör-/Führungsgrösse direkt | Messung der Stör-/Führungsgrösse nötig |

Beide Ansätze kombiniert ergeben das beste Ergebnis:
```
Sollwert w(t)  ─────────────────────────────────► Σ
                                                   │
Führungsgrösse → Vorsteuerblock → u_VS(t) ─────────►  Strecke → y(t)
                                                   │              │
                                    PID ◄──────────── e(t) ◄──────┘
```

---

## Störgrössenaufschaltung (Disturbance Feedforward)

Eine bekannte **Störgrösse** wird gemessen und ihr Einfluss auf die Regelgrösse direkt kompensiert — der PID muss die Störung nicht erst ausregeln.

### Praxisbeispiel: Aussentemperatur auf Raumheizung

```
Aussentemperatur TA (Messung)
         │
    Aufschaltblock: u_AS = f(TA)
         │
         ▼
    PID-Ausgang u_PID
         │
    Σ → Stellgrösse → Heizventil
```

**Ohne Aufschaltung:** TA fällt → Raum kühlt ab → e steigt → PID erhöht Ventil — Verzögerung durch Trägheit der Heizfläche.

**Mit Aufschaltung:** TA fällt → sofort Ventilöffnung erhöhen → Raum bleibt stabil → PID hat nur noch Feinkorrektur zu leisten.

### Dimensionierung der Aufschaltung
Der Aufschaltfaktor bestimmt, wie stark die Stellgrösse auf die Störung reagiert:
```
u_AS = K_AS × (TA_Nenn − TA)

K_AS: empirisch eingestellt (Inbetriebnahme) oder berechnet aus Gebäudemodell
TA_Nenn: Auslegungs-Aussentemperatur (z.B. −8°C)
```

---

## Sollwertaufschaltung (Setpoint Feedforward)

Bei **Führungsgrössenänderungen** (z.B. Sollwertsprung) wird die Stellgrösse sofort vorgesteuert:

```
Sollwert-Sprung von 20°C → 22°C
     │
Vorsteuerblock: u_VS = K_VS × Δw
     │
Stellgrösse springt sofort auf höheres Niveau
     │
PID passt fein nach
```

Verhindert das "Nachhinken" des PID bei Sollwertänderungen. Besonders relevant bei trägen Strecken (Fussbodenheizung, Grosse Räume).

---

## Witterungsgeführte Regelung als Vorsteuerung

Die **Heizkurve** (witterungsgeführte Vorlauftemperatur) ist das klassische GA-Beispiel für Vorsteuerung:

```
TA (Aussentemperatur)
     │
Heizkurve-Kennlinie:
  TV_Soll = f(TA, Raumtemperatur-Soll, Steilheit)
     │
Vorlauftemperatur-Regler (PID, Stellgrösse: Mischventil)
```

Der Raumregler ist in vielen Heizungsanlagen nur noch ein Korrekturgrössen-Regler auf die Heizkurve: Er verschiebt die Heizkurve nach oben/unten (+/− Parallelverschiebung), aber die Grundregelung erfolgt feedforward über die TA.

---

## Kombination: Kaskaden-Regler mit Aufschaltung

In der professionellen GA werden Kaskadenregelung und Aufschaltung kombiniert:

```
TA → Heizkurve → TV_Soll (Führungsgrösse für Vorlaufregler)
                    │
              Vorlaufregler (Meister-PID)
                    │
              TV_Ist ◄────── Vorlauftemperatur-Messung
                    │
              Ventilstellung → Heizkreis
```

Der Vorlaufregler übernimmt die schnelle, witterungsgeführte Grundregelung; ein übergeordneter Raumregler verschiebt den Sollwert bei dauerhafter Raumabweichung.

---

## Inbetriebnahme-Hinweise

1. **Aufschaltfaktor K_AS zuerst auf 0** einstellen — reine PID-Regelung als Ausgangszustand
2. Wenn stabile PID-Einstellung gefunden: K_AS schrittweise erhöhen
3. Prüfen ob Regelabweichung bei Störungsänderungen kleiner wird
4. Zu grosse Aufschaltung führt zu Überschwingen (Kompensation zu stark)
5. Vorzeichen der Aufschaltung prüfen! Falsche Richtung verschlimmert die Störung

---

## Abgrenzung: Vorsteuerung vs. Kaskadenregelung

| Merkmal | Vorsteuerung | Kaskadenregelung |
|---------|-------------|-----------------|
| Funktionsprinzip | Addiert Kompensation zur Stellgrösse | Übergeordneter Regler setzt Sollwert für Unterregler |
| Rückkopplung | Keine (open loop) | Ja (geschlossener Kreis) |
| Genauigkeit | Abhängig von Modellgüte | Selbstkorrigierend |
| Einsatz | Bekannte, messbare Störgrössen | Mehrstufige Strecken |
