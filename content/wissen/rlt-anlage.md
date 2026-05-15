---
title: RLT-Anlage — Aufbau und Komponenten
slug: rlt-anlage
category: lueftung
subcategory: grundlagen
tags: [rlt, raumlufttechnische-anlage, ahu, air-handling-unit, filter, erhitzer, kühler, befeuchter, entfeuchter, wärmerückgewinnung, ventilator, zuluft, abluft, aussenluft, fortluft, wrg, zulufttemperatur, volumenstrom]
difficulty: grundlagen
area: [hlk, ga]
related: [vav-cav, vdi6022, frequenzumrichter, kaelteanlagen, waermepumpe, pid-regler]
norm: [EN 16798-3, VDI 6022, SIA 382.1, EN 13053]
updated: 2026-05-14
lang: de
---

# RLT-Anlage — Aufbau und Komponenten

Eine **raumlufttechnische Anlage (RLT)** konditioniert Luft für Gebäude: Temperatur, Feuchte, Qualität und Volumenstrom werden geregelt. In der GA ist die RLT-Anlage einer der komplexesten Regelkreise — viele Stellglieder, gegenseitige Abhängigkeiten und sicherheitsrelevante Funktionen.

## Luftstromprinzip

```
Aussenluft (ODA)
      ↓
[Filter] → [WRG] → [Erhitzer] → [Kühler/Befeuchter] → [Ventilator] → Zuluft (SUP)
                ↑
      Rückgewinnung
                ↑
[Filter] ← [WRG] ← Abluft (ETA) ← Räume
      ↓
Fortluft (ODA = exhaust)
```

### Luftbezeichnungen (EN 13779 / EN 16798)

| Kürzel | Deutsch       | Englisch       | Quelle/Ziel                     |
|--------|---------------|----------------|---------------------------------|
| **ODA** | Aussenluft   | Outdoor Air    | Kommt von aussen                |
| **SUP** | Zuluft       | Supply Air     | Geht in den Raum                |
| **ETA** | Abluft       | Extract Air    | Kommt aus dem Raum              |
| **EHA** | Fortluft     | Exhaust Air    | Geht nach aussen                |
| **RCA** | Umluft       | Recirculation Air | Interne Rezirkulation        |

---

## Komponenten im Detail

### 1. Aussenluft-Klappe (ODA-Klappe)

- Motorisch betätigte Klappe am Aussenlufteinlass
- **Sicherheitsfunktion:** Schliesst wenn Anlage aus → verhindert Einfrieren des Registers
- Fail-safe: ZU (Federrückstellung) — bei Ausfall bleibt Klappe geschlossen
- Rückmeldung: Endschalter (DI) AUF / ZU

### 2. Filter

| Filterklasse | Norm     | Druckverlust neu | Wechseldruck | Einsatz                    |
|--------------|----------|------------------|--------------|----------------------------|
| Coarse (G)   | EN ISO 16890 | 20–50 Pa    | 150–200 Pa   | Vorfilter, Grobstaub       |
| ePM10 (F5/F6)| EN ISO 16890 | 50–100 Pa   | 200–250 Pa   | Aussenluftfilter           |
| ePM2.5 (F7)  | EN ISO 16890 | 80–150 Pa   | 250–300 Pa   | Zuluftfilter Büro          |
| ePM1 (F9)    | EN ISO 16890 | 100–200 Pa  | 300–400 Pa   | Reinraum-Vorstufe, Spital  |

**Filterwächter:** Differenzdrucksensor über dem Filter → Alarm wenn Schmutzgrenze erreicht.

### 3. Wärmerückgewinnungs-Tauscher (WRG)

Nutzt die Wärme der Abluft um Aussenluft vorzuwärmen (Winter) oder vorzukühlen (Sommer).

| Typ                  | Wirkungsgrad | Befeuchtung | Besonderheit               |
|----------------------|--------------|-------------|----------------------------|
| **Rotationstauscher** | 70–85 %     | Ja (Feuchte WT) | Hygiene-Anforderungen prüfen! |
| **Plattentauscher**   | 60–75 %     | Nein        | Keine Überströmung, hygienisch |
| **Kreislaufverbund**  | 45–60 %     | Nein        | Erzeuger und Verbraucher weit getrennt |
| **Wärmerohr**         | 55–65 %     | Nein        | Kein bewegliches Teil, wartungsarm |

**Frostschutz WRG:** Bei tiefen Aussentemperaturen kann der WRG einfrieren → Bypassklappe oder Vorwärmung nötig.

### 4. Vorerhitzer / Nacherhitzer

- **Heizmedium:** Warmwasser (aus Heizkreis) oder elektrisch
- Warmwasser-Register: 2-Wege-Ventil (stetig, 0–10 V)
- **Frostschutz:** Temperaturfühler hinter dem Register → bei < 5 °C sofort: Ventil 100 % AUF, Klappe ZU, Alarm!
- Nacherhitzer: Feinjustierung Zulufttemperatur nach WRG und Kühler

### 5. Kühler

- **Kühlmedium:** Kaltwasser (Kältemaschine) oder Direktverdampfer (Split/Rooftop)
- Kaltwasser-Kühler: 2-Wege-Ventil stetig, 0–10 V
- Kühlregister kann Feuchte kondensieren → Kondensatwanne mit Ablauf
- **Hygieneaspekt:** Kondensatwanne trocken halten (VDI 6022), regelmässig reinigen

### 6. Befeuchter

Typen:

| Typ                  | Hygiene | Energie | Befeuchtungsgrad | Einsatz             |
|----------------------|---------|---------|------------------|---------------------|
| **Dampfbefeuchter (elektrisch)** | Sehr gut | Hoch | Hoch | Büro, Spital |
| **Dampf aus Dampfnetz** | Gut  | Mittel  | Hoch             | Industrie           |
| **Umlaufverdunstung** | Problematisch | Niedrig | Mittel   | Einfache Anlagen    |
| **Hochdruck-Wasser** | Gut (Filtration) | Niedrig | Mittel | Komfortanlagen    |

> ⚠️ Luftbefeuchter sind Legionellen-Risiko wenn nicht korrekt betrieben! Temperatur und Desinfektion regelmässig prüfen (VDI 6022).

### 7. Ventilator

- **Zuluftventilator** + **Abluftventilator** (getrennte Antriebe)
- Frequenzumrichter für variable Drehzahl (→ VAV)
- **Messung:** Drucksensor vor/nach Ventilator → Druckerhöhung berechnen
- **Volumenstrom:** Aus Druck und FU-Drehzahl oder separater Messeinrichtung (Messblende)
- **Betriebsüberwachung:** Laufmeldung (DI), Störmeldung (DI), Motorschutzschalter

---

## Zulufttemperatur-Kaskade

In der Praxis werden Erhitzer und Kühler **kaskadenförmig** geregelt:

```
Zuluft-Sollwert (z.B. 22 °C)
    ↓
Zuluft-Regler (PI)
    ├── > Soll: Kühler aufmachen
    └── < Soll: Erhitzer aufmachen
    
Totband zwischen Heizen und Kühlen (z.B. ±1 K)
→ Verhindert gleichzeitiges Heizen + Kühlen (Energieverschwendung!)
```

**Wichtig:** Niemals Erhitzer und Kühler gleichzeitig aktiv! Verriegelung in der DDC nötig.

### Gleitende Zulufttemperatur

Statt fixer Zulufttemperatur: Sollwert abhängig von Aussentemperatur oder Raumtemperatur:

| Aussentemperatur | Zuluft-Sollwert    |
|------------------|--------------------|
| −10 °C           | 22 °C (max. Heizen) |
| 0 °C             | 20 °C              |
| 15 °C            | 18 °C (Neutralzone) |
| 30 °C            | 16 °C (Kühlen)     |

---

## Betriebsarten

| Betriebsart    | Volumenstrom | Temperatur   | Typisch wann                |
|----------------|--------------|--------------|------------------------------|
| **Komfort**    | 100 %        | Normal       | Gebäude besetzt              |
| **Nacht / Abwesend** | 30–50 % | Abgesenkt | Gebäude leer              |
| **Nachtlüftung** | 100 %      | Kühlen (Sommer) | Freie Kühlung                |
| **Frostschutz** | 0 %         | WW-Ventil auf | Aussentemp < 2 °C, Anlage aus |
| **Störung**    | 0 %          | Klappe zu    | Sicherheitsabschaltung       |

---

## Typische GA-Datenpunkte RLT

| Datenpunkt                  | Typ | Einheit | Beschreibung                     |
|-----------------------------|-----|---------|----------------------------------|
| Zuluft-Temperatur-Ist       | AI  | °C      | Fühler nach letzter Komponente   |
| Zuluft-Temperatur-Soll      | AV  | °C      | Vorgabe von GLT                  |
| Aussenluft-Temperatur       | AI  | °C      | Für gleitenden Sollwert          |
| Heizregister-Ventil         | AO  | %       | 0–10 V Stellsignal               |
| Kühlregister-Ventil         | AO  | %       | 0–10 V Stellsignal               |
| Befeuchter Ein/Aus          | DO  | —       | Dampf-Befeuchter                 |
| Zuluft-FU-Drehzahl-Soll     | AO  | %       | Frequenzumrichter Zuluft         |
| Abluft-FU-Drehzahl-Soll     | AO  | %       | Frequenzumrichter Abluft         |
| Aussenluft-Klappe           | AO/DO | % / EIN | Stellsignal Klappe            |
| Filter-Differenzdruck       | AI  | Pa      | Filterwächter                    |
| Frostschutz-Alarm           | DI  | —       | < 5 °C Zuluft → kritischer Alarm |
| Ventilator-Laufmeldung      | DI  | —       | Betriebsrückmeldung              |
| Ventilator-Störung          | DI  | —       | Motorschutz ausgelöst            |
| WRG-Bypass                  | AO  | %       | Klappe um WRG zu umgehen         |

## Normen

- **EN 16798-3** — Energetische Bewertung von Gebäuden, Lüftung von Nichtwohngebäuden
- **VDI 6022** — Raumlufttechnik, Hygiene
- **SIA 382.1** — Lüftungs- und Klimaanlagen, Allgemeine Grundlagen
- **EN 13053** — Lüftung von Gebäuden, Zentrale Raumlufttechnische Anlagen
- **EN ISO 16890** — Luftfilter für die allgemeine Raumlufttechnik
