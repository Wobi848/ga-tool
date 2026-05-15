---
title: Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne
slug: beschattungssteuerung
category: komfort
subcategory: beschattung
tags: [beschattungssteuerung, jalousie, raffstore, sonnenautomatik, windautomatik, regenautomatik, sonnenstand, azimut, elevation, fassade, priorität, knx, dali, behaglichkeit, blend]
difficulty: fortgeschritten
area: [ga, elektro]
related: [knx, glt-grundlagen, thermische-behaglichkeit, rlt-anlage]
norm: [EN 15232, prEN 16153, SIA 382.1]
updated: 2026-05-14
lang: de
---

# Beschattungssteuerung — Jalousie, Raffstore, Wind und Sonne

Die Beschattungssteuerung beeinflusst Komfort, Energieverbrauch und Blendschutz. Zu viel Sonne → Überhitzung, zu wenig → schlechtes Tageslicht. Die GA regelt Jalousien und Raffstoren automatisch auf Basis von Sonnenstand, Wind, Regen und Nutzeranforderungen.

## Grundprinzipien

```
Eingaben:
  ├── Sonnenstand (Azimut + Elevation)
  ├── Globalstrahlung / Einstrahlung auf Fassade
  ├── Windgeschwindigkeit (Sicherheit!)
  ├── Regen (Sicherheit!)
  ├── Raumtemperatur
  └── Benutzerpräferenz (manuell übersteuern)

Ausgaben:
  ├── Raffstoren-Position (0–100 %)
  └── Lamellenwinkel (0–180°)
```

---

## Antriebstypen und Signale

| Signal           | Beschreibung                                   | Einsatz                |
|------------------|------------------------------------------------|------------------------|
| **230 V Motorantrieb** | Auf-/Ab-Signal (2 Ausgänge)            | Standard-Raffstore     |
| **KNX-Antrieb**  | Bus-Steuerung, Positionsrückmeldung           | KNX-Integration        |
| **Modbus**       | Professionelle Antriebe, Volldiagnose         | GLT-Anbindung          |
| **0–10 V**       | Lamellenwinkel (selten)                        | Spezielle Antriebe     |

**Verriegelung:** Auf- und Ab-Signal **niemals gleichzeitig** aktiv! Sonst Motorschaden. DDC-Verriegelung obligatorisch.

---

## Sonnenschutzautomatik

### Sonnenstand-Berechnung

Die GA berechnet den Sonnenstand aus:
- Geografische Koordinaten (Breitengrad, Längengrad)
- Datum und Uhrzeit

```
Azimut: Himmelsrichtung der Sonne (0° = Nord, 90° = Ost, 180° = Süd)
Elevation: Sonnenhöhe über Horizont (0° = Sonnenaufgang, 90° = Zenit)
```

### Fassaden-Exposition

Pro Fassade wird definiert:
- Ausrichtung (Azimut der Fassade: 180° = Südfassade)
- Aktivierungsbereich: Wenn Sonne auf diese Fassade scheint

**Beispiel Südfassade:**

| Bedingung              | Wert                           |
|------------------------|--------------------------------|
| Azimut Sonne in        | 120–240° (Sonne von Süden)     |
| Elevation Sonne ≥      | 20° (kein Schattenwurf niedriger) |
| Globalstrahlung ≥      | 200 W/m²                       |
| → Automatik aktiviert  | Raffstoren fahren runter        |

### Lamellen-Optimierung (Blendschutz + Tageslicht)

Ziel: Direktes Sonnenlicht abhalten, aber diffuses Tageslicht reinlassen.

```
Lamellenwinkel = Elevation_Sonne + 15° (Puffer)

Beispiel: Sonne steht bei 45° Elevation
→ Lamellenwinkel = 45 + 15 = 60°
→ Direktes Licht wird reflektiert, indirektes Licht kommt rein
```

---

## Windautomatik (Sicherheit)

**Wind ist sicherheitsrelevant** — Beschattungsanlage kann bei Sturm beschädigt werden:

| Windgeschwindigkeit | Massnahme                                         |
|---------------------|---------------------------------------------------|
| < 6 m/s             | Normalbetrieb                                     |
| 6–10 m/s            | Warnung, keine Neuauslösung                       |
| > 10 m/s            | **Zwang: Alle Raffstoren fahren hoch** (sichere Position) |

**Totzeit nach Wind:** Nach Windabfall mind. 5–10 Minuten warten bevor Automatik wieder übernimmt.

> ⚠️ Windautomatik hat **absolute Priorität** über alle anderen Befehle — auch über manuelle Übersteuerung! Ein Nutzer kann keine beschädigte Jalousie bezahlen.

---

## Regenautomatik

Bei Regen können Holz-Lamellen oder spezielle Beschattungen beschädigt werden:

- Regensensor: Kapazitiv oder Heizfaden-Prinzip
- Bei Regen: Bestimmte Anlagentypen einfahren
- Für Standardraffstoren meist nicht nötig

---

## Prioritätensystem

In der GA gilt eine klare Hierarchie:

```
1. WIND-ALARM (höchste Priorität — Hardware)
2. Regen-Alarm
3. Manuell vom Nutzer (Taster, App)
4. Sonnenschutzautomatik
5. Zeitprogramm (z.B. Nacht: immer offen)
```

**Manuelle Übersteuerung:**
- Nutzer drückt Taster → manuelle Position 30 Minuten gültig
- Danach: Automatik übernimmt wieder
- Oder: Manuelle Sperre bis nächsten Tag

---

## Raumautomation: Jalousie + Konstantlicht

Kombination Beschattung + Beleuchtung für optimale Tageslichtnutzung:

```
Sensor: Raumhelligkeit (Lux)
Soll: 500 Lux auf Arbeitsplatz

Wenn Sonne scheint:
  → Jalousie runter (Blendschutz)
  → Lamellen: Tageslicht optimieren
  → Künstliches Licht: Ergänzung auf 500 Lux (DALI-Konstantlicht)

Wenn bewölkt:
  → Jalousie offen (max. Tageslicht)
  → Kunstlicht: Ergänzung auf 500 Lux
```

Spart 30–50 % Beleuchtungsenergie und verbessert Komfort.

---

## KNX-Beschattungssteuerung

KNX ist das häufigste System für Gebäude-Jalousien:

- Gruppenadresse "Jalousie AUF/AB" → DO-Ausgang (1 bit)
- Gruppenadresse "Position" → 0–100 % (1 Byte)
- Gruppenadresse "Lamelle" → 0–100 % (1 Byte)
- Gruppenadresse "Windalarm" → alle Jalousien synchron hoch

**GA-Integration:** GLT liest KNX-Bus über IP-Gateway → kann Zeitprogramme und Sonnenschutz zentral steuern.

---

## Typische GA-Datenpunkte

| Datenpunkt                 | Typ | Einheit | Beschreibung                    |
|----------------------------|-----|---------|---------------------------------|
| Windgeschwindigkeit        | AI  | m/s     | Wetterstation                   |
| Globalstrahlung            | AI  | W/m²    | Pyranometer Dach                |
| Sonnen-Azimut berechnet    | AV  | °       | Berechnet aus Datum + Standort  |
| Sonnen-Elevation berechnet | AV  | °       | Berechnet                       |
| Jalousie Fassade N Position | AO | %       | Sollposition 0–100 %            |
| Jalousie Fassade N Lamelle  | AO | °       | Lamellenwinkel 0–180°           |
| Windalarm                  | DI  | —       | Bei > Grenzwert                 |
| Manuelle Übersteuerung     | DI  | —       | Taster aktiv                    |

## Normen

- **EN 15232** — Energieeffizienz durch GA (Sonnenschutz = grosses Einsparpotenzial)
- **EN 14501** — Wärme- und Lichttransmission von Beschattungsprodukten
- **SIA 382.1** — Lüftungs- und Klimaanlagen (integrierte Beschattung)
