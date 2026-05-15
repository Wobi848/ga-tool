---
title: Motorventile — 2-Wege, 3-Wege, Kv-Wert
slug: motorventile
category: hydraulik
subcategory: armaturen
tags: [motorventil, 2-wege-ventil, 3-wege-ventil, kv-wert, stellantrieb, regelventil, mischventil, umlenkventil, kvs, druckverlust, autorität, gleichprozent, linear, fail-safe]
difficulty: fortgeschritten
area: [hlk, ga]
related: [hydraulischer-abgleich, hydraulische-schaltungen, pid-regler, signaltypen]
norm: [EN 60534, IEC 60534, VDI/VDE 2173]
updated: 2026-05-14
lang: de
---

# Motorventile — 2-Wege, 3-Wege, Kv-Wert

Motorventile sind die Aktoren der Hydraulik — sie setzen den Sollwert des Reglers in eine Durchflussmenge um. Falsch dimensionierte Ventile sind ein häufiger Grund für schlechte Regelqualität, Geräusche und zu hohen Energieverbrauch.

## Ventiltypen

### 2-Wege-Ventil (Absperr-/Regelventil)

```
Eingang → [Ventil] → Ausgang
              ↑
         Stellantrieb
```

- **Funktion:** Öffnet oder schliesst den Durchfluss
- **Einsatz:** Wärmetauscher-Einbindung, Heizkörper, Fancoil, Fussbodenheizkreis
- **Effekt auf Hydraulik:** Ventil schliesst → Druck im Strang steigt → andere Ventile arbeiten mit höherem Differenzdruck

**2-Wege-Ventil im Heizkörperkreis:**
```
Vorlauf → 2-Wege-Ventil → Heizkörper → Rücklauf
```

### 3-Wege-Ventil: Mischventil

```
Vorlauf (warm)  ─────┐
                    [Mischventil] → zum Verbraucher
Rücklauf (kalt) ─────┘
```

- **Funktion:** Mischt Vorlauf + Rücklauf im einstellbaren Verhältnis → variable Austrittstemperatur
- **Einsatz:** Heizkreis-Vorlauftemperatur einstellen, witterungsgeführte Regelung
- **Hydraulik:** Gesamtvolumenstrom durch Erzeuger bleibt konstant (kein Druckproblem für Erzeuger)

### 3-Wege-Ventil: Umlenkventil (Weiche)

```
                    ─── zu Verbraucher 1
Eingang → [Umlenkventil]
                    ─── zu Verbraucher 2
```

- **Funktion:** Lenkt Volumenstrom zwischen zwei Pfaden um
- **Einsatz:** Umschaltung Heizen/Kühlen (reversible Anlage), Prioritätsschaltung
- **Achtung:** Nicht verwechseln mit Mischventil — gleicher Körper aber andere Konfiguration!

### Kurzübersicht

| Typ              | Verbindungen | Funktion             | Typischer Einsatz              |
|------------------|--------------|----------------------|--------------------------------|
| 2-Wege           | 2 (A, AB)    | Öffnen / Schliessen  | Einzel-Verbraucher, Variable Anlage |
| 3-Wege Misch     | 3 (A, B, AB) | Mischen              | Heizkreis-Vorlauftemp, WP-Einbindung |
| 3-Wege Umlenk    | 3 (A, B, AB) | Umlenken             | Heizen/Kühlen Umschaltung      |

---

## Kv-Wert — Ventilkapazität

Der **Kv-Wert** beschreibt den Durchfluss bei einem definierten Druckverlust:

**Definition:** Volumenstrom in m³/h bei 1 bar Druckverlust (Wasser, 20 °C)

### Formel

```
Kv = Q × √(1 / Δp)
```

Oder aufgelöst nach Durchfluss:
```
Q = Kv × √Δp
```

Und nach Druckverlust:
```
Δp = (Q / Kv)²
```

**Einheiten:** Q in m³/h, Δp in bar

**Beispiel:**
- Ventil Kv = 2.5 m³/h
- Differenzdruck = 0.4 bar
- Durchfluss Q = 2.5 × √0.4 = 2.5 × 0.632 = **1.58 m³/h**

### Kvs-Wert

Der **Kvs** ist der Kv-Wert bei vollständig geöffnetem Ventil — der katalogierte Kenngrösse des Herstellers.

---

## Ventilauslegung (Kv-Berechnung)

### Schritt 1: Benötigter Durchfluss berechnen

```
Q [m³/h] = Heizleistung [kW] / (1.163 × Spreizung [K])
```

Beispiel: 10 kW, Spreizung 10 K → Q = 10 / (1.163 × 10) = **0.86 m³/h**

### Schritt 2: Verfügbarer Differenzdruck bestimmen

- Systemdifferenzdruck (Pumpe) minus Druckverluste der Rohrleitungen und anderen Armaturen
- Für gute Regelbarkeit: Ventil sollte **30–50 % des Systemdrucks** verbrauchen (Ventilautorität)

**Ventilautorität:**
```
α = Δpv / (Δpv + ΔpNetz)
```
α > 0.5 = gut; α < 0.3 = schlechte Regelbarkeit (Ventil hat kaum Einfluss)

### Schritt 3: Kv berechnen

```
Kv = Q / √Δp
```

Beispiel: Q = 0.86 m³/h, Δp = 0.3 bar → Kv = 0.86 / √0.3 = 0.86 / 0.548 = **1.57**

→ Nächste Normgrösse aus Katalog wählen (z.B. Kvs = 1.6 oder 2.0)

> Lieber **knapp unterdimensioniert** als zu gross: Ein zu grosses Ventil öffnet nur minimal und verliert die Regelautorität.

---

## Ventilkennlinien

Die Charakteristik (Kennlinie) bestimmt wie sich Kv mit dem Hub verhindert:

### Gleichprozent-Kennlinie (Equal Percentage)

```
Hub 10% → Kv 2%
Hub 50% → Kv 10%
Hub 90% → Kv 50%
Hub 100% → Kv 100%
```

- Logarithmische Kennlinie
- **Empfehlen** für Wärmetauscher-Einbindung: kompensiert die nichtlineare Wärmeübergabe-Charakteristik
- Kleiner Hub = feinfühlige Regelung bei kleinen Lasten

### Lineare Kennlinie

```
Hub 10% → Kv 10%
Hub 50% → Kv 50%
Hub 100% → Kv 100%
```

- Proportional
- Für Mischventile und Anwendungen mit linearem Wärmeübergang

**Kombination:** Gleichprozent-Ventil + lineare Wärmetauscher-Charakteristik = annähernd lineare Regelstrecke (einfacher zu parametrieren).

---

## Stellantriebe

### Typen

| Typ              | Stellsignal | Charakteristik                          |
|------------------|-------------|------------------------------------------|
| **2-Punkt**      | 24V EIN/AUS | Auf / Zu — für einfache Anwendungen      |
| **3-Punkt**      | Auf/Zu-Signal | Langsame Integration, kein Rückmeldesignal |
| **Stetig 0–10 V** | 0–10 V      | Präzise Regelung, Rückmeldung 0–10 V    |
| **Stetig 4–20 mA** | 4–20 mA    | Lange Leitungen, Kabelbrucherkennung     |
| **Bus (KNX, Modbus)** | Bus-Befehl | Diagnose, Rückmeldung, Positionierung  |

### Stellzeit

- Kleinventile DN15–DN25: 15–60 Sekunden (Auf-Zu)
- Grosse Armaturen DN40+: 60–240 Sekunden
- Zu schnelle Antriebe → Wasserhammereffekt (Druckstoss)
- Zu langsame Antriebe → träge Regelung

### Fail-Safe Stellung

Bei Signalausfall (Kabelbruch, Stromausfall) nimmt der Antrieb eine definierte Position ein:

| Fail-Safe | Wann sinnvoll                                    |
|-----------|--------------------------------------------------|
| **Auf**   | Frostschutz (Heizregister muss offen bleiben)    |
| **Zu**    | Dampfventil (Verbrühungsschutz), Kühldecke       |
| **Halten**| Pneumatische Antriebe (halten letzte Position)   |

> ⚠️ Fail-Safe Stellung **immer** projektieren und testen! Was passiert bei Kabelbruch? Schaden durch Frost? Übertemperatur? Das muss im Voraus geplant sein.

---

## Typische Fehler in der Praxis

| Fehler                        | Symptom                                  | Lösung                              |
|-------------------------------|------------------------------------------|-------------------------------------|
| Ventil zu gross (Kvs falsch)  | Regelventil immer fast geschlossen, Geräusche | Ventil tauschen                |
| Ventilautorität zu klein      | Regelung instabil, schwingt              | Systemdruck erhöhen oder Ventil verkleinern |
| Kennlinie falsch              | Überproportionale Reaktion bei kleinen Hüben | Kennlinientyp prüfen           |
| Fail-safe nicht konfiguriert  | Ventil bleibt bei Ausfall in Zufallsstellung | Antrieb parametrieren          |
| Misch- statt Umlenkventil     | Kurzschluss im System                    | Rohranschluss und Typ prüfen        |
| Antrieb zu schnell            | Wasserhammergeräusche                    | Stellzeit erhöhen (Parametrierung)  |

## Normen

- **EN 60534** — Industriearmaturen, Regelventile
- **VDI/VDE 2173** — Strömungstechnische Kennwerte von Regelventilen
- **AGFW FW 401** — Rohrweitenbemessung für Nahwärme (enthält Kvs-Auslegung)
