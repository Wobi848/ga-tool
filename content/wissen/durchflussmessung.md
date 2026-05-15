---
title: Durchflussmessung in der GA
slug: durchflussmessung
category: sensoren
subcategory: durchfluss
tags: [durchflussmessung, magnetisch-induktiv, mid, ultraschall, clamp-on, coriolis, differenzdruck-durchfluss, woltmann, flügelrad, volumenstrommessung, durchflusssensor, wärmemengenzähler-sensor, luftmengenmessung, pitot, prandtl]
difficulty: fortgeschritten
area: [ga, hlk]
related: [waermemengenzaehler, sensoren, drucksensoren, pumpen, rlt-anlage, vav-cav]
rechner: []
norm: [EN 1434, OIML R49, EN ISO 4064, IEC 60534]
updated: 2026-05-15
lang: de
---

# Durchflussmessung in der GA

Durchflussmessung ist essenziell für Wärmemengenerfassung, Hydraulikoptimierung, Verbrauchsabrechnung und Betriebsüberwachung. Die Wahl des Messprinzips hängt von Medium, Leitungsgrösse, Genauigkeitsanforderung und Einbaubedingungen ab.

---

## Messprinzipien im Überblick

| Prinzip | Medium | Genauigkeit | Einbau | Typische DN |
|---------|--------|------------|--------|------------|
| Magnetisch-induktiv (MID) | leitf. Flüssigkeiten | 0,2–0,5% | Fest (in Rohr) | DN15–DN2000 |
| Ultraschall (Clamp-on) | Flüssigkeiten, Gas | 1–3% | Extern (kein Eingriff) | DN50–DN2000 |
| Ultraschall (Inline) | Flüssigkeiten | 0,5–1% | Fest | DN15–DN300 |
| Coriolis | Flüssigkeiten, Gas | 0,1% | Fest | DN6–DN150 |
| Differenzdruck (Blende/Venturi) | Alle Medien | 1–2% | Fest | DN25–DN1000 |
| Flügelrad / Woltmann | Wasser | 2–3% | Fest | DN15–DN500 |
| Thermisch (Massenfluss) | Gas, Luft | 1–2% | Fest oder Einsteck | DN25–DN1000 |
| Pitot-Rohr | Luft, Gas | 2–5% | Einsteck | Kanäle ab 200 mm² |

---

## Magnetisch-Induktives Messgerät (MID)

Funktionsprinzip: Ein leitfähiges Medium fliesst durch ein Magnetfeld. Die fliessende Flüssigkeit erzeugt eine der Geschwindigkeit proportionale Spannung (Faraday'sches Induktionsgesetz):
```
U = k × v × B × D
U: induzierte Spannung, v: Strömungsgeschwindigkeit, B: Magnetfeldstärke, D: Innendurchmesser
```

**Anforderungen:**
- Medium muss elektrisch leitfähig sein (≥ 5 µS/cm) — Reinstwasser nicht messbar
- Vollständig gefüllte Rohrleitung (kein Teildurchfluss)
- Erdung des Rohrs nötig (Erdungsringe bei Kunststoff-Rohren)

**GA-Anwendungen:**
- Wärmemengenzähler (Wärme-/Kältekreis)
- Volumenstrom-Regelung (Pumpe, Ventil)
- Verbrauchserfassung (Abrechnungszwecke = MID-Klasse R eichpflichtig)

---

## Ultraschall-Durchflussmessung

### Inline (in Rohrleitung eingebaut)
- Piezo-Wandler senden Schallimpulse upstream/downstream
- Laufzeitdifferenz ∝ Strömungsgeschwindigkeit
- Genauigkeit besser als Clamp-on
- Wartungsarm (kein beweglicher Teile, kein Druckverlust)

### Clamp-on (extern, ohne Rohreingriff)
Sensoren werden von aussen auf das Rohr geklemmt:
```
Rohr
 │◄── Sensor A (gegenüberliegend montiert)
 │
 │──► Sensor B
```

**Vorteile Clamp-on:**
- Kein Eingriff in die Rohrleitung (ideal für Nachrüstung)
- Keine Dichtheitsprobleme
- Für verschiedene Rohrdurchmesser einsetzbar (Einstellparameter: Rohr-∅, Wandstärke, Material)

**Nachteile Clamp-on:**
- Geringere Genauigkeit (1–3%) bei schlechten Einbaubedingungen
- Erfordert lange Einlaufstrecken (10–30× DN gerade Rohr vor Sensor)
- Rohrwanddicke und Luftblasen beeinflussen Messung

---

## Coriolis-Durchflussmesser

Das Medium durchströmt schwingende Messrohre. Die Corioliskraft aus der Schwingungs-Strömungs-Wechselwirkung ist proportional zum **Massenfluss** (nicht Volumenstrom):

- Direkte Massenstrom-Messung (unabhängig von Dichte, Viskosität)
- Genauigkeit: 0,1% — beste verfügbare Methode
- Gleichzeitig: Dichte, Temperatur messbar
- Hoher Anschaffungspreis, grosser Druckverlust
- **GA-Einsatz:** Selten (zu teuer), v.a. in der Industrie bei wertvollen Medien

---

## Differenzdruck-Durchfluss (Blende, Venturi, Pitot)

Bernoulli-Prinzip: Strömungsverengung erzeugt Druckabfall ∝ v²:
```
Q = α × A × √(2 × ΔP / ρ)
Q: Volumenstrom, α: Durchflusskoeffizient, ΔP: Differenzdruck, ρ: Dichte
```

| Typ | Druckverlust | Kosten | Einsatz |
|-----|-------------|--------|---------|
| Normblende | Hoch (30–50% ΔP_mess) | Niedrig | Industrie, messtech. Prüfung |
| Venturi | Gering (5–15%) | Mittel | Lüftungskanäle |
| Pitot-Rohr | Sehr gering | Sehr niedrig | Luftkanäle, Nachbestimmung |

**Pitot-Rohr in Lüftungskanälen:** Einfaches Verfahren für Volumenstrom-Erstmessung (Inbetriebnahme), nicht für kontinuierliche Regelung geeignet (Verschmutzungsempfindlich).

---

## Flügelrad / Woltmann (Wärmemengenzähler)

Mechanische Durchfluss­messung: Strömung dreht ein Flügelrad, Umdrehungen werden gezählt.

| Typ | Aufbau | DN | Einsatz |
|-----|--------|----|---------| 
| Flügelrad | Querströmung | DN15–DN40 | Wohngebäude WMZ |
| Woltmann | Längsströmung | DN40–DN500 | Gebäude, Liegenschaften |
| Verbundzähler | Woltmann + Flügelrad parallel | DN50–DN200 | Schwankende Durchflüsse |

**GA-Hinweis:** Mechanische Zähler brauchen Mindestdurchfluss (Q_min) — bei sehr geringen Durchflüssen ungenau. Magnetisch-induktiv besser für variable Lasten.

---

## Luftvolumenstrom-Messung

### Messflügelrad / Anemometer
- Elektrisches Anemometer im Kanal oder an Auslass
- Genauigkeit ±3–5%
- Einsatz: Inbetriebnahme, mobile Prüfung

### Thermischer Massenstrom-Sensor
- Heizfaden-Prinzip: Heizleistung ∝ Massenstrom (Kühlwirkung der Luft)
- Einsatz: Feine Volumenstrommessung in VAV-Boxen, Luftauslässen
- Vorteil: Kein Druckverlust, schnelle Reaktion

### Differenzdruck-Messkreuz (Lüftung)
Kombination von 4–8 Pitot-Messstellen über den Kanalquerschnitt → mittlere Strömungsgeschwindigkeit:
```
v_mittel = √(2 × ΔP_mittel / ρ_Luft)
Q_Luft = v_mittel × A_Kanal
```
Standard für GLT-Volumenstromregelung in VAV-Anlagen.
