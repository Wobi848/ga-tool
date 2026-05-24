---
title: k-Faktor — Volumenstrom aus Wirkdruck
title_en: k-Factor — Volume Flow from Differential Pressure
slug: k-faktor-luft
category: lueftung
subcategory: volumenstrom
tags:
  [k-faktor, wirkdruck, volumenstrom, vav, blende, duese, drall, luftmessung, abgleich, bernoulli]
difficulty: fortgeschritten
area: [hlk, ga]
related: [durchflussmessung, vav-cav, druckregelung-lueftung, drucksensoren, sensoren]
rechner: [k-faktor]
norm: [DIN EN 12599, VDI 6022]
updated: 2026-05-24
lang: de
---

# k-Faktor — Volumenstrom aus Wirkdruck

In der Lüftungstechnik wird der **Volumenstrom** häufig nicht direkt gemessen, sondern aus einem **Wirkdruck** über einer Messstrecke abgeleitet. VAV-Boxen, Drall-Auslässe, Blenden und Düsen haben dafür einen vom Hersteller angegebenen **k-Faktor**:

$$Q = k \cdot \sqrt{\Delta P}$$

mit

- **Q** in m³/h
- **ΔP** in Pa
- **k** dimensionsbehaftet (m³/h · Pa⁻⁰·⁵), eigentlich „k-Wert" — in der Praxis einfach k

## Woher kommt die Formel?

Aus der **Bernoulli-Gleichung** für inkompressible Strömung:

$$Q = \alpha \cdot A \cdot \sqrt{\frac{2 \cdot \Delta P}{\rho}}$$

mit

- **α** Durchflussbeiwert (Geometrie-Faktor, ca. 0.6–0.9)
- **A** Querschnitt am Messort
- **ρ** Luftdichte (≈ 1.204 kg/m³ bei 20 °C / 1.013 bar)

Der Hersteller **misst** seine Box/Düse durch und packt α, A und die Norm-Dichte in **einen einzigen** k zusammen — du brauchst dann nur noch ΔP messen und durchrechnen.

## Typische k-Werte (zur Orientierung)

| Element             | k-Bereich | Bemerkung                          |
| ------------------- | --------- | ---------------------------------- |
| VAV-Box DN 125      | 20 – 35   | hersteller- und baugrössenabh.     |
| VAV-Box DN 200      | 70 – 130  |                                    |
| VAV-Box DN 315      | 200 – 350 |                                    |
| Drall-Auslass       | 15 – 80   | je nach Bauart und Grösse          |
| Messblende ISO 5167 | berechnet | aus Beta-Verhältnis + Δp-Anschluss |

> **Wichtig:** Diese Werte sind nur Hausnummern. **Der reale k steht im Datenblatt** der konkreten Box oder wird beim Hydraulischen Abgleich vor Ort ermittelt.

## Wofür der Rechner nützlich ist

[/rechner/k-faktor](/rechner/k-faktor) deckt vier Modi ab:

| Modus               | Wann?                                                                             |
| ------------------- | --------------------------------------------------------------------------------- |
| **Q aus k + ΔP**    | IBN: ΔP-Sensor zeigt 70 Pa, Datenblatt sagt k = 50 → Q = 50·√70 ≈ 418 m³/h        |
| **ΔP aus Q + k**    | Auslegung: Soll-Volumenstrom + k → erwarteter Wirkdruck am Sensor                 |
| **k aus Q + ΔP**    | Kalibrierung: bekannte Q (z.B. via Flügelrad) + gemessenes ΔP → effektiver k      |
| **k aus 2 Punkten** | Genauere Kalibrierung durch Mittel über zwei Betriebspunkte (z.B. niedrig + hoch) |

## Dichtekorrektur — wann nötig?

Der Hersteller-k gilt für **Norm-Luft** (20 °C, 1.013 bar, ρ ≈ 1.204 kg/m³). Bei deutlich abweichenden Bedingungen:

$$k_\text{korr} = k \cdot \sqrt{\frac{\rho_\text{norm}}{\rho_\text{aktuell}}}$$

| Anwendung                                | Dichtekorrektur nötig?     |
| ---------------------------------------- | -------------------------- |
| Normale Komfortlüftung 10–30 °C          | **Nein** — Fehler < 2 %    |
| Aussenluft im Winter (−15 °C)            | Eher ja — Fehler ~6 %      |
| Heisse Abluft (Küche, Industrie, 60 °C+) | **Ja**                     |
| Höhenlage (Berghütte > 1500 m)           | **Ja** — ρ deutlich tiefer |
| RLT-Klasse Reinraum mit Über-/Unterdruck | **Ja**                     |

Im Rechner ist die Dichtekorrektur als optionaler Toggle aktivierbar.

## Praxis: Inbetriebnahme einer VAV-Box

**1.** Datenblatt-k ablesen (z.B. k = 65 für DN 160 Box, Hersteller XY).

**2.** Soll-Volumenstrom festlegen, z.B. Q_soll = 400 m³/h für Büro mit 4 Personen.

**3.** Erwarteter Wirkdruck rechnen:

$$\Delta P_\text{soll} = \left(\frac{Q}{k}\right)^2 = \left(\frac{400}{65}\right)^2 ≈ 38\;\text{Pa}$$

**4.** Reglerklappe von Hand auf 50 % öffnen, am DDC den ΔP-Istwert ablesen, mit Soll vergleichen.

**5.** Klappe nachstellen bis ΔP_ist ≈ 38 Pa.

**6.** Optional Q gegenprüfen mit Anemometer im Auslass — bei Abweichung > 10 %: k aus Messung neu rechnen (Modus **k aus Q + ΔP**) und in DDC hinterlegen.

## Wert-Springen bei kleinen ΔP

Bei sehr kleinen ΔP (< 5 Pa) wird das Verhältnis Signal/Rauschen schlecht — der berechnete Q springt entsprechend. Gegenmassnahmen:

- **Filterzeit am AI-Objekt** auf 5–15 s setzen (siehe [Polynom-Approximation](/wissen/polynom-approximation) für ähnliche Hinweise bei Sensoren)
- **Minimale ΔP-Schwelle** im Code: unter z.B. 2 Pa Q auf 0 setzen (Box ist eh quasi zu)
- **Klappenposition mitloggen** — bei 0 % Klappe + ΔP > 0 ist meist die Box undicht oder Vor-/Rücklauf vertauscht

## Verwandt

- **[Durchflussmessung](/wissen/durchflussmessung)** — Bernoulli-Grundlagen + andere Verfahren (MID, Ultraschall, Pitotrohr)
- **[VAV / CAV](/wissen/vav-cav)** — Bauarten und Regelstrategien
- **[Druckregelung Lüftung](/wissen/druckregelung-lueftung)** — Zonen-Druckhaltung, Kaskaden
- **[Drucksensoren](/wissen/drucksensoren)** — Auswahl + Einbau für Wirkdruckmessung

## Zusammenfassung

| Schritt | Was tun                                                                      |
| ------- | ---------------------------------------------------------------------------- |
| 1       | k-Faktor aus Datenblatt der Box/Düse ablesen                                 |
| 2       | Wirkdruck-Anschlüsse korrekt verrohren (Hoch/Niedrig nicht vertauschen)      |
| 3       | Bei Aussentemperaturen oder Höhen ausserhalb Norm: Dichtekorrektur prüfen    |
| 4       | Bei IBN: realer k via **k aus Q + ΔP** validieren, abweichend → DDC anpassen |
| 5       | Filter am ΔP-Eingang 5–15 s, untere ΔP-Schwelle definieren                   |
