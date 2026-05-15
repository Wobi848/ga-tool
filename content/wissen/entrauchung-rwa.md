---
title: Entrauchung und RWA — Rauchabzugsanlagen
slug: entrauchung-rwa
category: lueftung
subcategory: brandschutz
tags: [entrauchung, rwa, rauchabzug, rauchabzugsanlage, nrwa, mrwa, überdruck, unterdruck, brandschutz, feuerwehr, freigabe, verriegelung, bsk, lüftungsanlage, sicherheitsbeleuchtung, vds2098]
difficulty: fortgeschritten
area: [hlk, ga]
related: [brandschutzklappen, rlt-anlage, zonendruckhaltung, glt-grundlagen, alarmmanagement]
norm: [EN 12101, VDI 6019, MBO, SIA 181, VKF]
updated: 2026-05-15
lang: de
---

# Entrauchung und RWA — Rauchabzugsanlagen

Rauchabzugsanlagen (RWA = Rauch- und Wärmeabzugsanlagen) sind sicherheitskritische Systeme. Ihr Versagen kann Leben kosten. Die Steuerung und Verriegelung mit der Lüftungsanlage muss korrekt implementiert sein.

## Grundprinzip und Typen

### Natürliche RWA (NRWA)

```
Wärme → Rauch steigt auf → Auftriebskraft
    ↓
Rauchklappen im Dach / obere Wandbereiche öffnen
    ↓
Rauch strömt aus → Frischluft strömt unten nach
```

- Keine elektrische Energie für Entrauchung nötig (wichtig bei Ausfall)
- Rauchklappen: pneumatisch (CO₂-Patrone) oder elektrisch ausgelöst
- Zuluftzuführung: Türen, Fenster, Zulufttore unten

### Maschinelle RWA (MRWA)

```
Ventilator saugt Rauch ab → Abluft nach aussen
Gleichzeitig: Zuluft durch separate Anlage oder Öffnungen
```

- Für unterirdische Parkgaragen, Tunnel, Grossräume ohne Oberlicht
- Leistungsstarke Ventilatoren (Hochtemperatur-Ventilatoren 300 °C / 1 h oder 400 °C / 2 h)
- Druckdifferenz-Steuerung bei Treppenhäusern

---

## Komponenten

| Komponente                 | Funktion                                        |
|----------------------------|-------------------------------------------------|
| Rauchklappen (RKL)         | Öffnen für Rauchabzug (NC = Normally Closed)   |
| Zuluftelemente             | Nachströmöffnungen unten                        |
| Brandschutzklappen (BSK)   | Verhindern Rauchausbreitung im Kanal (NC)       |
| RWA-Zentrale               | Auslösung, Überwachung, Meldung an GLT          |
| Hochtemperatur-Ventilator  | Nur MRWA: fördert Rauch/Heissgas                |
| Handauslösetaster (HAT)    | Manuelle Auslösung an jeder Zone                |

---

## Auslösung und Steuerungslogik

```
Brandmeldezentrale (BMZ) → RWA-Zentrale
    ↓ Meldergruppe auslöst
    ↓
RWA-Zentrale:
  1. Rauchklappen in Brandabschnitt ÖFFNEN
  2. Brandschutzklappen in Abschnitt SCHLIESSEN
  3. Lüftungsanlage ABSCHALTEN (oder Umschaltung auf Entrauchung)
  4. Meldung an GLT (Störung / Betriebsart "Brand")
  5. Meldung an BMA (für Feuerwehr-Tableau)
```

**Priorität:** RWA-Zentrale hat **absoluten Vorrang** vor GA/GLT. Lüftungsregler darf RWA-Signal nicht überschreiben.

### Verriegelung mit Lüftungsanlage

```
Normal-Betrieb Lüftung:
  RLT läuft normal, BSK offen

Brand-Auslösung:
  RWA-Signal → DDC empfängt DI "Brand aktiv"
    → Zuluft-Klappen SCHLIESSEN
    → Umluft SPERREN (kein Rauchkreislauf)
    → Lüftungs-FU auf 0 (Abschaltung)
    → Entrauchungsventilator STARTEN (wenn vorhanden)
    
  AUSNAHME: Überdruckanlagen Treppenhaus
    → Zuluft-Ventilator WEITERLÄUFT (hält Überdruck aufrecht)
```

---

## Zonenkonzept

Grosse Gebäude werden in **Rauchabschnitte (Zonen)** unterteilt:

```
Zone 1: EG West
Zone 2: EG Ost
Zone 3: OG West
Zone 4: Parkgarage

Auslösung: Nur betroffene Zone entraucht
Andere Zonen: bleiben im Normalbetrieb (Verhinderung Rauchausbreitung)
```

**Handauslösetaster je Zone** — Feuerwehr kann gezielt Zonen auslösen.

---

## GA-Datenpunkte RWA / Entrauchung

| Datenpunkt                 | Typ | Einheit | Beschreibung                      |
|----------------------------|-----|---------|-----------------------------------|
| Brand-Alarm Zone 1         | DI  | —       | BMZ / RWA-Zentrale Auslösung      |
| Entrauchung aktiv Zone 1   | DI  | —       | Rückmeldung RWA läuft             |
| Lüftung Betriebsart        | AV  | —       | Normal / Brand / Aus              |
| RWA-Zentrale Störung       | DI  | —       | Zentrale defekt / Netzausfall     |
| Rauchklappe RKL-01 Status  | DI  | —       | Auf / Zu Rückmeldung              |
| Entrauchungsventilator      | DO  | —       | Ein/Aus                           |
| Entrauchungsventilator Laufmeldung | DI | — | Motorschutz-Rückmeldung         |

> ⚠️ RWA-Datenpunkte müssen in der GLT **im Alarm-Kanal "Kritisch"** konfiguriert sein. Keine Unterdrückung, keine Zeitverzögerung.

---

## Überdruck-Entrauchung (Treppenhäuser)

Fluchtwege (Treppenhäuser) werden unter **Überdruck** gehalten, damit kein Rauch eindringt:

```
Treppenhaus-Überdruckanlage:
  Sollwert: 50 Pa Überdruck gegenüber Brandabschnitt
  Ventilator: Zuluft von aussen → Treppenhaus
  Regelung: Druckdifferenzsensor Treppenhaus / Korridor
  
  Türöffnung: Druck fällt kurz → Regelung erhöht Volumenstrom
  Max. Druck: 80 Pa (sonst Türe nicht mehr öffenbar → max. 100 N Öffnungskraft)
```

---

## Normen und Anforderungen

| Norm              | Inhalt                                          |
|-------------------|-------------------------------------------------|
| **EN 12101-1**    | Schlauchabschlüsse, Anforderungen RWA           |
| **EN 12101-2**    | NRWA — natürliche Entrauchungsklappen           |
| **EN 12101-3**    | MRWA — maschinelle Entrauchungsventilatoren     |
| **EN 12101-6**    | Druckdifferenz-Systeme (Überdruck Fluchtwege)  |
| **VDI 6019**      | Maschinelle Entrauchung — Planung und Betrieb   |
| **MBO § 35**      | Notwendige Treppenhäuser (Rauchschutz)          |
| **VKF (CH)**      | Brandschutzrichtlinien Schweiz — Entrauchung    |

---

## Prüfpflichten

- **Jährlich**: Funktionsprüfung aller Rauchklappen und HAT
- **Halbjährlich**: Sichtprüfung aller mechanischen Teile
- **IBN-Protokoll**: Auslösung jeder Zone, Messung Abluftmengen, Druckdifferenzen
- **Dokumentation**: Alle Prüfungen protokollieren (Grundlage Versicherung, Behörden)
