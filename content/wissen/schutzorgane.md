---
title: Schutzorgane — LS, FI, Motorschutz und der 24-V-Kreis
title_en: Protective Devices — MCB, RCD, Motor Protection and the 24 V Circuit
slug: schutzorgane
category: elektro
subcategory: schutz
tags:
  [
    leitungsschutzschalter,
    ls,
    sicherung,
    fehlerstromschutzschalter,
    fi,
    rcd,
    motorschutzschalter,
    überlastrelais,
    kaltleiter,
    thermokontakt,
    selektivität,
    netzteil,
    elektronische sicherung,
    auslösecharakteristik
  ]
difficulty: fortgeschritten
area: [elektro, ga]
related:
  [
    schemalesen,
    schuetzsteuerungen,
    selv-pelv,
    frequenzumrichter,
    ec-motoren,
    5plus5-regeln,
    messen-fehlersuche,
    drehstrom,
    nin-niv,
    lastarten
  ]
norm: [EN 60898-1, EN 61008-1, EN 61009-1, EN 60947-2, EN 60947-4-1, IEC 60364]
updated: 2026-10-14
lang: de
---

# Schutzorgane — LS, FI, Motorschutz und der 24-V-Kreis

Ein Schutzorgan hat genau eine Aufgabe: abschalten, bevor etwas Schaden nimmt. Die Leitung, der Motor oder der Mensch. Welches Organ was schützt, entscheidet darüber, wo man bei einer Störung sucht und was man zurücksetzen darf.

| Schutzorgan                        | Schützt             | Löst aus bei                | Kennbuchstabe |
| ---------------------------------- | ------------------- | --------------------------- | ------------- |
| **Sicherung**                      | Leitung             | Überlast, Kurzschluss       | F             |
| **Leitungsschutzschalter (LS)**    | Leitung             | Überlast, Kurzschluss       | F             |
| **Fehlerstromschutzschalter (FI)** | Mensch, Brandschutz | Fehlerstrom gegen Erde      | F             |
| **Motorschutzschalter**            | Motor und Leitung   | Überlast, Kurzschluss       | Q             |
| **Thermisches Überlastrelais**     | Motor               | Überlast                    | F             |
| **Kaltleiter / Thermokontakt**     | Motorwicklung       | Zu hohe Wicklungstemperatur | B             |

## Leitungsschutzschalter

Ein LS hat zwei Auslöser:

- **Thermisch** (Bimetall): langsam, für Überlast. Unter dem 1.13-fachen Nennstrom löst er nicht aus, beim 1.45-fachen innerhalb einer Stunde.
- **Magnetisch** (Spule): sofort, für Kurzschluss. Ab welchem Strom, bestimmt die **Charakteristik**.

<figure class="schema"><svg viewBox="0 0 360 204" role="img" aria-label="Magnetische Auslösebereiche der Charakteristiken B, C und D" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="157.2" y="30" width="40.6" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="197.8" y="64" width="55.0" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="252.8" y="98" width="55.0" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="79.7" y="132" width="19.8" height="14" rx="2" stroke="none" fill="currentColor" fill-opacity="0.5"/><path d="M70 160H340"/><path d="M70.0 160v5"/><path d="M125.0 160v5"/><path d="M157.2 160v5"/><path d="M197.8 160v5"/><path d="M252.8 160v5"/><path d="M307.8 160v5"/><path d="M340.0 160v5"/><path d="M70.0 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M157.2 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M197.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M252.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M307.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="56.0" y="45" text-anchor="end" font-size="14" font-weight="700">B</text><text x="177.5" y="45.5" text-anchor="middle" font-size="12" font-weight="600">3–5 ×</text><text x="56.0" y="79" text-anchor="end" font-size="14" font-weight="700">C</text><text x="225.3" y="79.5" text-anchor="middle" font-size="12" font-weight="600">5–10 ×</text><text x="56.0" y="113" text-anchor="end" font-size="14" font-weight="700">D</text><text x="280.3" y="113.5" text-anchor="middle" font-size="12" font-weight="600">10–20 ×</text><text x="105.5" y="143" text-anchor="start" font-size="11.5">thermisch: 1.13–1.45 × In (Überlast)</text><text x="70.0" y="178" text-anchor="middle" font-size="12">1</text><text x="125.0" y="178" text-anchor="middle" font-size="12">2</text><text x="157.2" y="178" text-anchor="middle" font-size="12">3</text><text x="197.8" y="178" text-anchor="middle" font-size="12">5</text><text x="252.8" y="178" text-anchor="middle" font-size="12">10</text><text x="307.8" y="178" text-anchor="middle" font-size="12">20</text><text x="340.0" y="178" text-anchor="middle" font-size="12">30</text><text x="205.0" y="196" text-anchor="middle" font-size="12">Vielfaches des Nennstroms In</text></g></svg><figcaption>Bereich, in dem der magnetische Auslöser sicher anspricht, nach EN 60898-1.</figcaption></figure>

| Charakteristik | Magnetisch ab | Einsatz in der GA                                          |
| -------------- | ------------- | ---------------------------------------------------------- |
| **B**          | 3–5 × In      | Leitungen, Steckdosen, kleine ohmsche Lasten               |
| **C**          | 5–10 × In     | Netzteile, Motoren, LED-Treiber, Geräte mit Einschaltstrom |
| **D**          | 10–20 × In    | Steuertrafos, grosse Einschaltströme                       |

**Typischer Fehler:** Ein 24-V-Netzteil hinter einem B-LS löst beim Einschalten aus. Netzteile ziehen kurz einen Ladestrom, der ein Vielfaches des Nennstroms beträgt. Abhilfe ist ein C-LS, nicht ein grösserer B-LS. Der Nennstrom richtet sich nach der Leitung, nicht nach dem Gerät.

Der LS schützt nur, wenn der Kurzschlussstrom gross genug ist, um den magnetischen Auslöser sicher anzusprechen. Das hängt von der Schleifenimpedanz ab und wird bei der Abnahme durch die Elektrofachperson gemessen.

## Fehlerstromschutzschalter (FI, RCD)

Der FI vergleicht den Strom, der hinfliesst, mit dem, der zurückkommt. Fehlt etwas, fliesst es irgendwo über Erde ab, im schlimmsten Fall über einen Menschen. Ab dem Bemessungsfehlerstrom löst er aus.

- **30 mA:** Personenschutz (Zusatzschutz). Steckdosenkreise brauchen ihn in der Regel.
- **300 mA:** Brandschutz.

Wichtig: Der FI schützt **nicht** vor Überlast oder Kurzschluss zwischen L und N. Dafür braucht es zusätzlich einen LS oder einen **FI/LS** (beides in einem Gerät).

### FI-Typen

| Typ    | Erfasst                                | Einsatz                                                   |
| ------ | -------------------------------------- | --------------------------------------------------------- |
| **AC** | Nur sinusförmigen Wechselfehlerstrom   | Rein ohmsche Lasten, heute kaum noch sinnvoll             |
| **A**  | AC plus pulsierenden Gleichfehlerstrom | Standard für Steckdosen und die meisten Geräte            |
| **F**  | Wie A plus Mischfrequenzen             | Einphasige Frequenzumrichter, Wärmepumpen, Waschmaschinen |
| **B**  | Wie F plus glatten Gleichfehlerstrom   | Dreiphasige Frequenzumrichter, Ladestationen              |

**FU und FI vertragen sich schlecht.** Frequenzumrichter haben Filter mit Ableitströmen gegen Erde. Hinter einem 30-mA-FI löst das oft schon beim Einschalten aus. Ein Typ-A-FI kann einen glatten Gleichfehlerstrom eines dreiphasigen FU zudem gar nicht erkennen und wird dadurch blind. Welcher FI passt, steht im Handbuch des FU.

## Motorschutz

Ein Motor zieht im Betrieb seinen Nennstrom. Klemmt die Pumpe oder fällt eine Phase aus, steigt der Strom, und die Wicklung überhitzt langsam. Dafür gibt es drei Lösungen:

| Lösung                            | Funktion                                              | Im Schema                               |
| --------------------------------- | ----------------------------------------------------- | --------------------------------------- |
| **Motorschutzschalter**           | Thermisch (einstellbar) und magnetisch in einem Gerät | Im Hauptstromkreis vor dem Schütz       |
| **Thermisches Überlastrelais**    | Nur thermisch, unter dem Schütz angebaut              | Öffner 95-96 im Steuerkreis             |
| **Kaltleiter oder Thermokontakt** | Misst direkt in der Wicklung                          | Auslösegerät oder direkt im Steuerkreis |

**Einstellen:** Den thermischen Auslöser auf den Nennstrom vom **Typenschild** des Motors stellen, nicht höher. Ein höher eingestellter Motorschutz löst nicht mehr aus, wenn er soll.

Viele Motorschutzschalter erkennen auch einen Phasenausfall. Das ist wichtig, weil ein Drehstrommotor auf zwei Phasen weiterläuft, dabei aber stark überhitzt.

**Mit FU:** Der Frequenzumrichter überwacht den Motorstrom selbst. Ein thermisches Überlastrelais zwischen FU und Motor ist dann meist nicht nötig. Die Kaltleiter der Wicklung können oft direkt am FU angeschlossen werden.

**Zurücksetzen:** Ein ausgelöster Motorschutz hat einen Grund. Vor dem Zurücksetzen die Ursache suchen: Lager, blockiertes Laufrad, verstopfter Filter, Phasenausfall. Wer nur zurücksetzt, steht morgen wieder da.

## Absicherung im 24-V-Kreis

Hier passiert in der GA der häufigste Denkfehler. Ein Netzteil mit 5 A Nennstrom **begrenzt** den Strom bei Kurzschluss, meist auf das 1.1- bis 1.5-fache. Ein LS mit 4 A braucht aber für die magnetische Auslösung 12 bis 40 A. Den bekommt er vom Netzteil nie.

Die Folge: Bei einem Kurzschluss in einem Feldgerät bricht die Spannung für **alle** Verbraucher ein, auch für die DDC. Der LS hält, und der Schrank ist tot.

Ausnahme: Manche Industrienetzteile liefern bei Kurzschluss für einige Millisekunden bewusst ein Vielfaches des Nennstroms, um einen nachgeschalteten LS auszulösen. Ob das Netzteil das kann und bis zu welchem LS, steht im Datenblatt.

**Lösungen:**

- **Elektronische Sicherungsmodule** je Abgang: lösen bei Überstrom selektiv aus, auch hinter einem strombegrenzten Netzteil. Viele haben einen Meldekontakt für die DDC.
- **Feinsicherungen** je Abgang, abgestimmt auf die Leitung und die Ausgangsleistung des Netzteils.
- **DDC getrennt versorgen** oder mit eigenem Abgang, damit ein Fehler im Feld die Steuerung nicht mitnimmt.

## Selektivität

Bei einem Fehler soll nur das Schutzorgan direkt davor auslösen, nicht das nächsthöhere. Sonst fällt wegen eines defekten Stellantriebs die ganze Lüftung aus.

Faustregeln:

- Vorgeschaltete Schutzorgane deutlich grösser wählen als nachgeschaltete.
- LS hinter LS sind bei Kurzschluss oft **nicht** selektiv, weil beide magnetisch sofort auslösen. Herstellertabellen prüfen.
- Im 24-V-Kreis selektiv mit elektronischen Sicherungsmodulen arbeiten, siehe oben.

## Was der GA-Techniker darf

Einen ausgelösten LS oder Motorschutz nach Klärung der Ursache wieder einschalten, gehört zum Betrieb. Schutzorgane tauschen, umdimensionieren oder neu verdrahten gehört zur Installation. Dafür braucht es in der Schweiz eine entsprechende Bewilligung nach NIV, und die Arbeit muss danach geprüft werden. Im Zweifel die zuständige Elektrofachperson beiziehen. Mehr dazu in [NIV und NIN](/wissen/nin-niv).

Vor jeder Arbeit im Schrank gelten die [5+5 lebenswichtigen Regeln](/wissen/5plus5-regeln).

## Normen

- **EN 60898-1** — Leitungsschutzschalter, Charakteristiken B, C, D
- **EN 61008-1 / EN 61009-1** — Fehlerstromschutzschalter ohne und mit Überstromschutz
- **EN 60947-2** — Leistungsschalter, Motorschutzschalter
- **EN 60947-4-1** — Schütze und Überlastrelais
- **IEC 60364 / NIN (SN 411000)** — Errichten von Niederspannungsinstallationen

<!-- EN -->

A protective device has exactly one job: disconnect before something is damaged. The cable, the motor or a person. Which device protects what decides where you look when something trips and what you are allowed to reset.

| Protective device                    | Protects                | Trips on                      | Class letter |
| ------------------------------------ | ----------------------- | ----------------------------- | ------------ |
| **Fuse**                             | Cable                   | Overload, short circuit       | F            |
| **Miniature circuit breaker (MCB)**  | Cable                   | Overload, short circuit       | F            |
| **Residual current device (RCD)**    | People, fire protection | Earth fault current           | F            |
| **Motor protection circuit breaker** | Motor and cable         | Overload, short circuit       | Q            |
| **Thermal overload relay**           | Motor                   | Overload                      | F            |
| **PTC thermistor / thermal contact** | Motor winding           | Excessive winding temperature | B            |

## Miniature Circuit Breakers

An MCB has two releases:

- **Thermal** (bimetal): slow, for overload. Below 1.13 times rated current it does not trip; at 1.45 times it trips within one hour.
- **Magnetic** (coil): instantaneous, for short circuits. The **characteristic** determines from which current.

<figure class="schema"><svg viewBox="0 0 360 204" role="img" aria-label="Magnetic trip ranges of characteristics B, C and D" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="157.2" y="30" width="40.6" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="197.8" y="64" width="55.0" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="252.8" y="98" width="55.0" height="22" rx="3" stroke="none" fill="currentColor" fill-opacity="0.25"/><rect x="79.7" y="132" width="19.8" height="14" rx="2" stroke="none" fill="currentColor" fill-opacity="0.5"/><path d="M70 160H340"/><path d="M70.0 160v5"/><path d="M125.0 160v5"/><path d="M157.2 160v5"/><path d="M197.8 160v5"/><path d="M252.8 160v5"/><path d="M307.8 160v5"/><path d="M340.0 160v5"/><path d="M70.0 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M157.2 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M197.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M252.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><path d="M307.8 24V160" stroke-dasharray="2 3" stroke-opacity="0.35" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="56.0" y="45" text-anchor="end" font-size="14" font-weight="700">B</text><text x="177.5" y="45.5" text-anchor="middle" font-size="12" font-weight="600">3–5 ×</text><text x="56.0" y="79" text-anchor="end" font-size="14" font-weight="700">C</text><text x="225.3" y="79.5" text-anchor="middle" font-size="12" font-weight="600">5–10 ×</text><text x="56.0" y="113" text-anchor="end" font-size="14" font-weight="700">D</text><text x="280.3" y="113.5" text-anchor="middle" font-size="12" font-weight="600">10–20 ×</text><text x="105.5" y="143" text-anchor="start" font-size="11.5">thermal: 1.13–1.45 × In (overload)</text><text x="70.0" y="178" text-anchor="middle" font-size="12">1</text><text x="125.0" y="178" text-anchor="middle" font-size="12">2</text><text x="157.2" y="178" text-anchor="middle" font-size="12">3</text><text x="197.8" y="178" text-anchor="middle" font-size="12">5</text><text x="252.8" y="178" text-anchor="middle" font-size="12">10</text><text x="307.8" y="178" text-anchor="middle" font-size="12">20</text><text x="340.0" y="178" text-anchor="middle" font-size="12">30</text><text x="205.0" y="196" text-anchor="middle" font-size="12">Multiple of rated current In</text></g></svg><figcaption>Range in which the magnetic release reliably operates, per EN 60898-1.</figcaption></figure>

| Characteristic | Magnetic from | Use in BA                                         |
| -------------- | ------------- | ------------------------------------------------- |
| **B**          | 3–5 × In      | Cables, sockets, small resistive loads            |
| **C**          | 5–10 × In     | Power supplies, motors, LED drivers, inrush loads |
| **D**          | 10–20 × In    | Control transformers, large inrush currents       |

**Typical mistake:** A 24 V power supply behind a B-type MCB trips on switch-on. Power supplies briefly draw a charging current that is a multiple of their rated current. The remedy is a C-type MCB, not a larger B-type. The rated current follows the cable, not the device.

The MCB only protects if the short-circuit current is large enough to operate the magnetic release reliably. That depends on the loop impedance and is measured by the qualified electrician at acceptance.

## Residual Current Devices (RCD)

The RCD compares the current going out with the current coming back. If something is missing, it is flowing to earth somewhere, in the worst case through a person. Above the rated residual current it trips.

- **30 mA:** personal protection (additional protection). Socket circuits generally require it.
- **300 mA:** fire protection.

Important: the RCD does **not** protect against overload or short circuit between L and N. That needs an additional MCB or an **RCBO** (both in one device).

### RCD Types

| Type   | Detects                               | Use                                             |
| ------ | ------------------------------------- | ----------------------------------------------- |
| **AC** | Sinusoidal AC residual current only   | Purely resistive loads, hardly sensible today   |
| **A**  | AC plus pulsating DC residual current | Standard for sockets and most equipment         |
| **F**  | As A plus mixed frequencies           | Single-phase VFDs, heat pumps, washing machines |
| **B**  | As F plus smooth DC residual current  | Three-phase VFDs, EV charging stations          |

**VFDs and RCDs do not get on well.** Variable frequency drives have filters with leakage currents to earth. Behind a 30 mA RCD this often trips on switch-on. A type A RCD also cannot detect the smooth DC fault current of a three-phase VFD and is blinded by it. The VFD manual states which RCD fits.

## Motor Protection

A motor draws its rated current in operation. If the pump jams or a phase fails, the current rises and the winding slowly overheats. There are three solutions:

| Solution                              | Function                                        | In the diagram                             |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| **Motor protection circuit breaker**  | Thermal (adjustable) and magnetic in one device | In the main circuit ahead of the contactor |
| **Thermal overload relay**            | Thermal only, mounted below the contactor       | NC 95-96 in the control circuit            |
| **PTC thermistor or thermal contact** | Measures directly in the winding                | Trip unit or directly in control circuit   |

**Setting:** Set the thermal release to the rated current on the motor's **nameplate**, not higher. Motor protection set too high no longer trips when it should.

Many motor protection breakers also detect phase loss. This matters because a three-phase motor keeps running on two phases while overheating badly.

**With a VFD:** The variable frequency drive monitors motor current itself. A thermal overload relay between VFD and motor is then usually unnecessary. The winding thermistors can often be connected directly to the VFD.

**Resetting:** A tripped motor protection has a reason. Find the cause before resetting: bearings, blocked impeller, clogged filter, phase loss. Reset without looking and you will be back tomorrow.

## Protection in the 24 V Circuit

This is where the most common misconception in BA happens. A power supply rated 5 A **limits** the current in a short circuit, usually to 1.1 to 1.5 times. A 4 A MCB, however, needs 12 to 40 A for magnetic tripping. It will never get that from the power supply.

The result: on a short circuit in one field device, the voltage collapses for **all** loads, including the DDC. The MCB holds, and the panel is dead.

Exception: some industrial power supplies deliberately deliver a multiple of their rated current for a few milliseconds on short circuit to trip a downstream MCB. Whether the supply can do this, and up to which MCB, is in the datasheet.

**Solutions:**

- **Electronic circuit protection modules** per output: trip selectively on overcurrent, even behind a current-limited supply. Many have a signal contact for the DDC.
- **Miniature fuses** per output, matched to the cable and the output power of the supply.
- **Supply the DDC separately** or from its own output, so a fault in the field does not take the controller with it.

## Selectivity

On a fault, only the protective device directly ahead of it should trip, not the next one up. Otherwise a faulty actuator takes down the whole ventilation system.

Rules of thumb:

- Choose upstream devices clearly larger than downstream ones.
- MCB behind MCB is often **not** selective on short circuit, because both trip magnetically at once. Check manufacturer tables.
- In the 24 V circuit, work selectively with electronic protection modules, see above.

## What the BA Technician May Do

Switching a tripped MCB or motor protection back on after clarifying the cause is part of operation. Replacing, resizing or rewiring protective devices is installation work. In Switzerland this requires the corresponding authorisation under the NIV, and the work must be inspected afterwards. When in doubt, involve the responsible qualified electrician. More in [NIV and NIN](/wissen/nin-niv).

Before any work in the panel, the [5+5 life-saving rules](/wissen/5plus5-regeln) apply.

## Standards

- **EN 60898-1** — Miniature circuit breakers, characteristics B, C, D
- **EN 61008-1 / EN 61009-1** — Residual current devices without and with overcurrent protection
- **EN 60947-2** — Circuit breakers, motor protection circuit breakers
- **EN 60947-4-1** — Contactors and overload relays
- **IEC 60364 / NIN (SN 411000)** — Low-voltage electrical installations
