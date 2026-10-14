---
title: Drehstrom — Grundlagen für GA-Techniker
title_en: Three-Phase Power — Basics for BA Technicians
slug: drehstrom
category: elektro
subcategory: grundlagen
tags:
  [
    drehstrom,
    dreiphasen,
    400 v,
    230 v,
    aussenleiter,
    neutralleiter,
    stern,
    dreieck,
    klemmbrett,
    drehfeld,
    drehrichtung,
    phasenausfall,
    leiterfarben
  ]
difficulty: grundlagen
area: [elektro, ga]
related:
  [schuetzsteuerungen, schutzorgane, messen-fehlersuche, frequenzumrichter, ec-motoren, pumpen]
norm: [IEC 60038, EN 60445, EN 60034-8]
updated: 2026-10-14
lang: de
---

# Drehstrom — Grundlagen für GA-Techniker

Ventilatoren, Pumpen, Kältemaschinen: alles, was in der Haustechnik ordentlich Leistung braucht, hängt am Drehstrom. Für die GA reicht es, ein paar Zusammenhänge sicher zu kennen. Damit versteht man Typenschilder, misst richtig und erkennt eine falsche Drehrichtung.

## Drei Aussenleiter, zwei Spannungen

Das Netz hat drei **Aussenleiter** L1, L2, L3. Ihre Spannungen sind um je 120° gegeneinander verschoben. Dazu kommen der **Neutralleiter** N und der **Schutzleiter** PE.

| Gemessen zwischen   | Spannung | Name                             |
| ------------------- | -------- | -------------------------------- |
| L1–N, L2–N, L3–N    | 230 V    | Strangspannung                   |
| L1–L2, L2–L3, L3–L1 | 400 V    | Aussenleiterspannung (verkettet) |
| L–PE                | 230 V    | wie L–N                          |
| N–PE                | nahe 0 V | einige Volt sind normal          |

Der Faktor zwischen den beiden Spannungen ist **√3 ≈ 1.73**: 230 V × 1.73 = 400 V.

**Messen:** Zeigt L–L nur 230 V, liegen beide Messspitzen auf demselben Aussenleiter. Zeigt L–N deutlich mehr als 230 V, ist der Neutralleiter unterbrochen. Das ist gefährlich, weil sich dann die Spannung an einphasigen Verbrauchern verschiebt und Geräte zerstört werden.

### Leiterfarben

| Leiter | Farbe     |
| ------ | --------- |
| L1     | Braun     |
| L2     | Schwarz   |
| L3     | Grau      |
| N      | Blau      |
| PE     | Grün-gelb |

In älteren Anlagen kommen andere Farben vor. Verlassen kann man sich auf Farben nie, nur auf die Messung.

## Leistung

Für Drehstrom gilt:

**P = √3 × U × I × cos φ**

Beispiel: Ein Motor zieht an 400 V je Phase 10 A bei cos φ = 0.85. Die aufgenommene Leistung beträgt 1.73 × 400 V × 10 A × 0.85 ≈ **5.9 kW**. Auf dem Typenschild steht die **abgegebene** mechanische Leistung, die um den Wirkungsgrad kleiner ist.

Umgekehrt schätzt man den Strom: Ein 400-V-Motor zieht grob **2 A pro kW** Nennleistung. Damit lässt sich ein Zangenmesswert schnell einordnen.

## Stern und Dreieck am Motor

Ein Drehstrommotor hat drei Wicklungen mit sechs Enden: U1–U2, V1–V2, W1–W2. Auf dem Klemmbrett liegen sie so, dass man sie mit drei Brücken entweder in **Stern** oder in **Dreieck** schalten kann.

<figure class="schema"><svg viewBox="0 0 400 214" role="img" aria-label="Klemmbrett eines Drehstrommotors in Stern- und Dreieckschaltung" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="28" y="52" width="160" height="104" rx="6" stroke-opacity="0.35" stroke-width="1.5"/><path d="M50 74H150" stroke-width="6" stroke-opacity="0.6"/><circle cx="50" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="100" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="150" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="50" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="100" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="150" cy="134" r="7" style="fill: var(--surface, white)"/><path d="M50 141V184"/><path d="M100 141V184"/><path d="M150 141V184"/><rect x="228" y="52" width="160" height="104" rx="6" stroke-opacity="0.35" stroke-width="1.5"/><path d="M250 74V134" stroke-width="6" stroke-opacity="0.6"/><path d="M300 74V134" stroke-width="6" stroke-opacity="0.6"/><path d="M350 74V134" stroke-width="6" stroke-opacity="0.6"/><circle cx="250" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="300" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="350" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="250" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="300" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="350" cy="134" r="7" style="fill: var(--surface, white)"/><path d="M250 141V184"/><path d="M300 141V184"/><path d="M350 141V184"/><g fill="currentColor" stroke="none"><text x="100" y="18" text-anchor="middle" font-size="13" font-weight="700">Stern (Y)</text><text x="100" y="34" text-anchor="middle" font-size="11">Wicklung an 230 V</text><text x="63" y="64" text-anchor="start" font-size="11">W2</text><text x="113" y="64" text-anchor="start" font-size="11">U2</text><text x="163" y="64" text-anchor="start" font-size="11">V2</text><text x="63" y="152" text-anchor="start" font-size="11">U1</text><text x="113" y="152" text-anchor="start" font-size="11">V1</text><text x="163" y="152" text-anchor="start" font-size="11">W1</text><text x="50" y="200" text-anchor="middle" font-size="12" font-weight="600">L1</text><text x="100" y="200" text-anchor="middle" font-size="12" font-weight="600">L2</text><text x="150" y="200" text-anchor="middle" font-size="12" font-weight="600">L3</text><text x="300" y="18" text-anchor="middle" font-size="13" font-weight="700">Dreieck (Δ)</text><text x="300" y="34" text-anchor="middle" font-size="11">Wicklung an 400 V</text><text x="263" y="64" text-anchor="start" font-size="11">W2</text><text x="313" y="64" text-anchor="start" font-size="11">U2</text><text x="363" y="64" text-anchor="start" font-size="11">V2</text><text x="263" y="152" text-anchor="start" font-size="11">U1</text><text x="313" y="152" text-anchor="start" font-size="11">V1</text><text x="363" y="152" text-anchor="start" font-size="11">W1</text><text x="250" y="200" text-anchor="middle" font-size="12" font-weight="600">L1</text><text x="300" y="200" text-anchor="middle" font-size="12" font-weight="600">L2</text><text x="350" y="200" text-anchor="middle" font-size="12" font-weight="600">L3</text></g></svg><figcaption>Klemmbrett eines Drehstrommotors am 400-V-Netz. Die grauen Balken sind die Brücken.</figcaption></figure>

Welche Schaltung richtig ist, steht auf dem **Typenschild**. Die Regel: **Die kleinere Spannung gilt für Dreieck, die grössere für Stern.**

| Typenschild       | Am 400-V-Netz | Warum                   |
| ----------------- | ------------- | ----------------------- |
| **230/400 V Δ/Y** | Stern (Y)     | Wicklung verträgt 230 V |
| **400/690 V Δ/Y** | Dreieck (Δ)   | Wicklung verträgt 400 V |

Ein 230/400-V-Motor in Dreieck am 400-V-Netz bekommt pro Wicklung 400 statt 230 V und brennt in kurzer Zeit durch. Motoren, die für Stern-Dreieck-Anlauf vorgesehen sind, müssen im Betrieb in Dreieck laufen, brauchen also ein Typenschild mit 400 V Δ.

**Am FU:** Einphasig gespeiste Frequenzumrichter geben drei Phasen mit 230 V aus. Ein 230/400-V-Motor wird dann in **Dreieck** angeschlossen.

## Drehfeld und Drehrichtung

Die drei Spannungen erzeugen im Motor ein **Drehfeld**. Vertauscht man zwei beliebige Aussenleiter, dreht es andersherum, und der Motor auch.

Eine falsche Drehrichtung ist bei der Inbetriebnahme häufig und tückisch:

- **Pumpen** fördern rückwärts drehend trotzdem, aber deutlich weniger. Man merkt es erst an zu kleinem Differenzdruck oder zu geringer Spreizung.
- **Radialventilatoren** fördern rückwärts ebenfalls weiter, mit stark reduzierter Luftmenge und höherem Lärm.
- **Axialventilatoren** fördern in die falsche Richtung.

**Prüfen:** Drehrichtungspfeil am Gehäuse mit der Welle vergleichen, kurz einschalten und auslaufen lassen. Am Netz misst ein Drehfeldmessgerät die Phasenfolge. Am FU stellt man die Drehrichtung im Parameter um, statt Adern zu tauschen.

## Phasenausfall

Fällt ein Aussenleiter aus, etwa durch eine ausgelöste Sicherung oder eine lose Klemme:

- Ein **stehender** Motor läuft nicht an, sondern brummt.
- Ein **laufender** Motor läuft auf zwei Phasen weiter, zieht aber deutlich mehr Strom und überhitzt.

Der [Motorschutz](/wissen/schutzorgane) soll das erkennen. Mit der Zange sieht man es sofort: Ein Aussenleiter führt keinen Strom, die anderen zwei mehr als sonst.

## Der Neutralleiter

Bei gleichmässiger Belastung aller drei Aussenleiter heben sich die Ströme im Neutralleiter auf. Drehstrommotoren brauchen deshalb gar keinen N.

Anders bei vielen elektronischen Verbrauchern wie Netzteilen, LED-Treibern und Computern. Sie erzeugen Oberschwingungen, besonders die dritte. Diese heben sich im N **nicht** auf, sondern addieren sich. Der Neutralleiter kann dann mehr Strom führen als jeder Aussenleiter. Das ist ein Grund, warum der N nie kleiner sein soll als die Aussenleiter.

## Normen

- **IEC 60038** — Normspannungen (230/400 V)
- **EN 60445** — Kennzeichnung von Anschlüssen und Leitern, Leiterfarben
- **EN 60034-8** — Anschlussbezeichnungen und Drehrichtung von Motoren

<!-- EN -->

Fans, pumps, chillers: anything in building services that needs real power runs on three-phase. For BA it is enough to know a few relationships well. With them you understand nameplates, measure correctly and spot a wrong direction of rotation.

## Three Line Conductors, Two Voltages

The supply has three **line conductors** L1, L2, L3. Their voltages are shifted by 120° against each other. In addition there is the **neutral** N and the **protective earth** PE.

| Measured between    | Voltage  | Name                   |
| ------------------- | -------- | ---------------------- |
| L1–N, L2–N, L3–N    | 230 V    | Phase voltage          |
| L1–L2, L2–L3, L3–L1 | 400 V    | Line-to-line voltage   |
| L–PE                | 230 V    | same as L–N            |
| N–PE                | near 0 V | a few volts are normal |

The factor between the two voltages is **√3 ≈ 1.73**: 230 V × 1.73 = 400 V.

**Measuring:** If L–L shows only 230 V, both probes are on the same line conductor. If L–N shows clearly more than 230 V, the neutral is broken. That is dangerous, because the voltage at single-phase loads then shifts and equipment is destroyed.

### Conductor Colours

| Conductor | Colour       |
| --------- | ------------ |
| L1        | Brown        |
| L2        | Black        |
| L3        | Grey         |
| N         | Blue         |
| PE        | Green-yellow |

Older installations use other colours. Never rely on colours, only on measurement.

## Power

For three-phase:

**P = √3 × U × I × cos φ**

Example: a motor draws 10 A per phase at 400 V with cos φ = 0.85. The input power is 1.73 × 400 V × 10 A × 0.85 ≈ **5.9 kW**. The nameplate shows the mechanical **output** power, which is smaller by the efficiency.

Conversely, estimating current: a 400 V motor draws roughly **2 A per kW** of rated power. That lets you judge a clamp reading quickly.

## Star and Delta on the Motor

A three-phase motor has three windings with six ends: U1–U2, V1–V2, W1–W2. On the terminal board they are arranged so that three links connect them either in **star** or in **delta**.

<figure class="schema"><svg viewBox="0 0 400 214" role="img" aria-label="Terminal board of a three-phase motor in star and delta connection" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="28" y="52" width="160" height="104" rx="6" stroke-opacity="0.35" stroke-width="1.5"/><path d="M50 74H150" stroke-width="6" stroke-opacity="0.6"/><circle cx="50" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="100" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="150" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="50" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="100" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="150" cy="134" r="7" style="fill: var(--surface, white)"/><path d="M50 141V184"/><path d="M100 141V184"/><path d="M150 141V184"/><rect x="228" y="52" width="160" height="104" rx="6" stroke-opacity="0.35" stroke-width="1.5"/><path d="M250 74V134" stroke-width="6" stroke-opacity="0.6"/><path d="M300 74V134" stroke-width="6" stroke-opacity="0.6"/><path d="M350 74V134" stroke-width="6" stroke-opacity="0.6"/><circle cx="250" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="300" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="350" cy="74" r="7" style="fill: var(--surface, white)"/><circle cx="250" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="300" cy="134" r="7" style="fill: var(--surface, white)"/><circle cx="350" cy="134" r="7" style="fill: var(--surface, white)"/><path d="M250 141V184"/><path d="M300 141V184"/><path d="M350 141V184"/><g fill="currentColor" stroke="none"><text x="100" y="18" text-anchor="middle" font-size="13" font-weight="700">Star (Y)</text><text x="100" y="34" text-anchor="middle" font-size="11">Winding at 230 V</text><text x="63" y="64" text-anchor="start" font-size="11">W2</text><text x="113" y="64" text-anchor="start" font-size="11">U2</text><text x="163" y="64" text-anchor="start" font-size="11">V2</text><text x="63" y="152" text-anchor="start" font-size="11">U1</text><text x="113" y="152" text-anchor="start" font-size="11">V1</text><text x="163" y="152" text-anchor="start" font-size="11">W1</text><text x="50" y="200" text-anchor="middle" font-size="12" font-weight="600">L1</text><text x="100" y="200" text-anchor="middle" font-size="12" font-weight="600">L2</text><text x="150" y="200" text-anchor="middle" font-size="12" font-weight="600">L3</text><text x="300" y="18" text-anchor="middle" font-size="13" font-weight="700">Delta (Δ)</text><text x="300" y="34" text-anchor="middle" font-size="11">Winding at 400 V</text><text x="263" y="64" text-anchor="start" font-size="11">W2</text><text x="313" y="64" text-anchor="start" font-size="11">U2</text><text x="363" y="64" text-anchor="start" font-size="11">V2</text><text x="263" y="152" text-anchor="start" font-size="11">U1</text><text x="313" y="152" text-anchor="start" font-size="11">V1</text><text x="363" y="152" text-anchor="start" font-size="11">W1</text><text x="250" y="200" text-anchor="middle" font-size="12" font-weight="600">L1</text><text x="300" y="200" text-anchor="middle" font-size="12" font-weight="600">L2</text><text x="350" y="200" text-anchor="middle" font-size="12" font-weight="600">L3</text></g></svg><figcaption>Terminal board of a three-phase motor on a 400 V supply. The grey bars are the links.</figcaption></figure>

The **nameplate** tells you which is correct. The rule: **the lower voltage is for delta, the higher for star.**

| Nameplate         | On a 400 V supply | Why                    |
| ----------------- | ----------------- | ---------------------- |
| **230/400 V Δ/Y** | Star (Y)          | Winding is rated 230 V |
| **400/690 V Δ/Y** | Delta (Δ)         | Winding is rated 400 V |

A 230/400 V motor in delta on a 400 V supply gets 400 instead of 230 V per winding and burns out quickly. Motors intended for star-delta starting must run in delta, so they need a nameplate with 400 V Δ.

**On a VFD:** single-phase fed variable frequency drives output three phases at 230 V. A 230/400 V motor is then connected in **delta**.

## Rotating Field and Direction of Rotation

The three voltages create a **rotating field** in the motor. Swap any two line conductors and it turns the other way, and so does the motor.

A wrong direction of rotation is common at commissioning and treacherous:

- **Pumps** still deliver when running backwards, but considerably less. You only notice from too low a differential pressure or too small a temperature difference.
- **Centrifugal fans** also keep delivering backwards, with much reduced airflow and more noise.
- **Axial fans** blow the wrong way.

**Checking:** compare the arrow on the housing with the shaft, switch on briefly and let it run down. On the mains, a phase rotation tester measures the phase sequence. On a VFD, change the direction in the parameters instead of swapping wires.

## Phase Loss

If one line conductor fails, for example due to a blown fuse or a loose terminal:

- A **stationary** motor does not start but hums.
- A **running** motor keeps running on two phases but draws considerably more current and overheats.

[Motor protection](/wissen/schutzorgane) should detect this. With a clamp you see it immediately: one line conductor carries no current, the other two more than usual.

## The Neutral Conductor

With balanced load on all three line conductors, the currents in the neutral cancel out. Three-phase motors therefore need no N at all.

It is different with many electronic loads such as power supplies, LED drivers and computers. They generate harmonics, especially the third. These do **not** cancel in the N but add up. The neutral can then carry more current than any line conductor. That is one reason why the N should never be smaller than the line conductors.

## Standards

- **IEC 60038** — Standard voltages (230/400 V)
- **EN 60445** — Identification of terminals and conductors, conductor colours
- **EN 60034-8** — Terminal markings and direction of rotation of motors
