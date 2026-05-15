---
title: EMS und Lastmanagement — Energiemanagement in der GA
slug: ems-lastmanagement
category: energie
subcategory: management
tags: [ems, energiemanagementsystem, lastmanagement, spitzenlast, pv, photovoltaik, eigenverbrauch, sg-ready, demand-response, lademanagement, ocpp, iso50001, batteriespeicher, verbrauchsoptimierung]
difficulty: fortgeschritten
area: [ga, it]
related: [glt-grundlagen, waermepumpe, bacnet, modbus, mbus, pv-integration, batteriespeicher, sg-ready, demand-response, e-mobility-lademanagement, iso50001]
norm: [ISO 50001, EN 50160, IEC 61851, SIA 2024]
updated: 2026-05-14
lang: de
---

# EMS und Lastmanagement — Energiemanagement in der GA

Ein **Energiemanagementsystem (EMS)** überwacht und optimiert den Energieverbrauch eines Gebäudes oder Campus. In Kombination mit PV-Anlagen, Speichern und steuerbaren Lasten wird das EMS zur Schaltzentrale der Energieeffizienz.

## EMS vs. GLT

| Funktion               | GLT                        | EMS                         |
|------------------------|----------------------------|-----------------------------|
| Regelung HLK           | ✅ Kern-Aufgabe             | ❌ Nein                      |
| Alarmmanagement        | ✅                          | Nur Energie-Alarme          |
| Energiemessung         | Optional                   | ✅ Kern-Aufgabe              |
| Optimierung Zeitpläne  | Manuell                    | ✅ Automatisch               |
| PV-Integration         | Nein                       | ✅                           |
| Lastmanagement         | Optional                   | ✅ Kern-Aufgabe              |
| Reporting / ISO 50001  | Nicht vorgesehen            | ✅                           |

In modernen Anlagen wächst GLT und EMS zusammen — oder das EMS ist ein Modul der GLT.

---

## Lastmanagement

### Spitzenlastmanagement

Ziel: Leistungsspitze (kW) verringern um Netzgebühren zu senken.

**Warum wichtig:** Viele Netztarife berechnen den **Jahres-Leistungspeak** separat. Eine einzelne 15-Minuten-Spitze kann mehrere Tausend Franken/Euro pro Jahr kosten.

```
Messperiode: 15 Minuten (Energiezähler messen in 15-min-Intervallen)

Wenn Leistung droht Grenzwert zu überschreiten:
  Priorität 1 abschalten: E-Ladestationen (Wagen kommt nicht weg)
  Priorität 2 reduzieren: Klimaanlage (Komfort leicht verringern)
  Priorität 3 schieben: Warmwasserbereitung (Speicher vorhanden)
  Priorität 4 reduzieren: Beleuchtung unbelegte Räume
```

### Schaltprioritäten festlegen

| Priorität | Last                | Abschalten | Bemerkung                   |
|-----------|---------------------|------------|-----------------------------|
| 1         | E-Ladestation       | Sofort     | Akzeptabel für Nutzer       |
| 2         | Klimaanlage (Kühlen)| Bis 15 min | Thermische Trägheit hilft   |
| 3         | WW-Boiler           | Bis 60 min | Speicher hält Temperatur    |
| 4         | Beleuchtung unbel.  | Sofort     | Keine Auswirkung            |
| Nie       | Sicherheitsbeleuchtung, Notfall | — | Gesetzlich verboten     |

---

## PV-Eigenverbrauchsoptimierung

### Ziel

Möglichst viel eigenproduzierter Solarstrom direkt verbrauchen — statt einspeisen (geringe Vergütung) und wieder kaufen (hoher Bezugspreis).

```
PV-Überschuss vorhanden:
  → Wärmepumpe auf Maximalbetrieb
  → E-Auto laden
  → Boiler aufheizen (auf 65 °C statt 55 °C)
  → Batterie laden

PV-Produktion sinkt / Überschuss weg:
  → Lasten reduzieren
  → Batterie entladen
  → Normalbetrieb
```

### Regelung über Netzmesseinrichtung

```
P_Netz = Leistung am Einspeisepunkt (positiv = Bezug, negativ = Einspeisung)

EMS-Regelung:
  P_Netz nahe 0 → optimal (weder kaufen noch verschenken)
  P_Netz > 0 → EMS aktiviert steuerbare Lasten
  P_Netz < 0 → EMS reduziert Lasten oder lädt Speicher
```

---

## SG-Ready (Smart Grid Ready)

**SG-Ready** ist ein deutsches Gütesiegel für wärmepumpengeeignete Anlagen mit 4 Betriebszuständen:

| Zustand | Signal (2 DI-Leitungen) | Bedeutung                               |
|---------|--------------------------|------------------------------------------|
| **1**   | 00                        | Betriebssperre (Netz überlastet)        |
| **2**   | 01                        | Normalbetrieb                            |
| **3**   | 10                        | Einschaltempfehlung (PV-Überschuss)     |
| **4**   | 11                        | Einschaltbefehl (Überproduktion Wind/PV)|

Das EMS setzt Zustand 3 wenn PV-Überschuss vorhanden → WP läuft auf maximale Leistung (Puffer laden).

---

## Batteriespeicher in der GA

Haushalts- und gewerbliche Batteriespeicher ergänzen PV:

### Ladestrategien

| Strategie              | Beschreibung                                   |
|------------------------|------------------------------------------------|
| **PV-Eigenverbrauch**  | Laden wenn PV > Verbrauch, Entladen nachts     |
| **Peak Shaving**       | Entladen bei Lastspitzen, Laden bei Tal        |
| **Nacht-Ladung**       | Laden bei günstigen Nachttarif                 |
| **Notstrom-Reserve**   | SOC niemals unter 20 % (Blackout-Schutz)      |

**GA-Integration:** EMS liest SOC (State of Charge), steuert Lade-/Entladeleistung via Modbus oder herstellerspez. API.

---

## E-Mobility / Lademanagement

### OCPP (Open Charge Point Protocol)

Standard für Kommunikation zwischen Ladestation und Betreibersystem:

```
E-Auto → Ladestation (OCPP 1.6 / 2.0.1) → Charge Point Management System (CPMS) → EMS/GLT
```

### Lastmanagement E-Ladesäulen

```
Maximale Einspeisung Gebäude: 100 kW

Aktuelle Last Gebäude: 70 kW
Verfügbar für Laden: 30 kW

Bei 5 Ladesäulen: je 6 kW (Phase 1 = 26 A)
Eines Auto lädt ab, 4 Autos → je 7.5 kW

EMS verteilt dynamisch, immer innerhalb Limit
```

### Phasenbalancierung

Einphasige Ladesäulen können Phasen ungleichmässig belasten → Blindleistung, Schieflast. EMS überwacht und verteilt Ladesäulen auf verschiedene Phasen.

---

## ISO 50001 — Energiemanagement-Norm

Struktur der Norm:

| Element            | Beschreibung                                   |
|--------------------|------------------------------------------------|
| Energiepolitik     | Commitment der Unternehmensleitung             |
| Energiebasis       | Referenzwert, gegen den Verbesserungen gemessen |
| Energie-KPIs       | Messbare Kennzahlen (kWh/m², kWh/Produkt)     |
| Ziele              | Jährliche Reduktionsziele                      |
| Massnahmenplan     | Konkrete Massnahmen, Verantwortliche, Termine  |
| Überwachung        | EMS misst und berichtet (M&V)                  |
| Auditierung        | Externe Überprüfung alle 3 Jahre (Zertifizierung) |

**GA-Beitrag:** EMS liefert die Messdaten für ISO 50001 automatisch — Verbrauch nach Energieträger, Fläche, Zeit.

## Normen

- **ISO 50001** — Energiemanagementsysteme
- **EN 50160** — Merkmale der Spannung in öffentlichen Netzen
- **IEC 61851** — Elektrische Ausrüstung von Elektrofahrzeugen (Laden)
- **OCPP 1.6 / 2.0.1** — Open Charge Point Protocol
