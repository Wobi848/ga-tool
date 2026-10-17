---
title: Kältekreislauf und h,log p-Diagramm — Bauteile, Regelung, Störungen
title_en: Refrigeration Cycle and Pressure-Enthalpy Diagram — Components, Control, Faults
slug: kaeltekreislauf
category: kaelte
subcategory: grundlagen
tags:
  [
    kältekreislauf,
    h-log-p,
    druck-enthalpie-diagramm,
    überhitzung,
    unterkühlung,
    verdichter,
    verdampfer,
    verflüssiger,
    expansionsventil,
    hochdruck,
    niederdruck,
    pump-down,
    leistungsregelung,
    enthitzer,
    wärmerückgewinnung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related: [kaelteanlagen, waermepumpe, kaeltemittel, cop-eer, eisspeicher, absorptionskaelte]
norm: [EN 378, EN 14511]
updated: 2026-10-17
lang: de
---

# Kältekreislauf und h,log p-Diagramm — Bauteile, Regelung, Störungen

Jede Kompressions-Kältemaschine und jede Wärmepumpe nutzt denselben Trick: Ein Kältemittel **siedet bei tiefem Druck** schon bei tiefer Temperatur und nimmt dabei Wärme auf. Bei **hohem Druck kondensiert** es bei hoher Temperatur und gibt die Wärme wieder ab. Der Verdichter hebt den Druck an, das Expansionsventil senkt ihn wieder. Über 90 % aller Kälteanlagen arbeiten so.

## Die vier Schritte

| Schritt          | Bauteil          | Was passiert                                                                           |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------- |
| **Verdampfen**   | Verdampfer       | Kältemittel siedet bei tiefem Druck und entzieht dem Kaltwasser oder der Luft Wärme    |
| **Verdichten**   | Verdichter       | Druck und Temperatur steigen, das Gas wird zu heissem Heissgas                         |
| **Verflüssigen** | Verflüssiger     | Gas kühlt ab, kondensiert und gibt die Wärme an Rückkühler oder Heizung ab             |
| **Entspannen**   | Expansionsventil | Druck fällt, ein Teil der Flüssigkeit verdampft schlagartig, das Kältemittel wird kalt |

Bei einer Kältemaschine ist der Verdampfer der Nutzen, bei einer [Wärmepumpe](/wissen/waermepumpe) der Verflüssiger. Die Maschine ist dieselbe.

## Das h,log p-Diagramm

Kältetechniker beschreiben den Kreislauf im **Druck-Enthalpie-Diagramm**. Nach rechts steigt die Enthalpie h, also der Wärmeinhalt pro kg Kältemittel. Nach oben steigt der Druck, logarithmisch aufgetragen. Jedes Kältemittel hat sein eigenes Diagramm.

<figure class="schema"><svg viewBox="0 0 430 260" role="img" aria-label="h,log p-Diagramm mit Nassdampfgebiet und Kältekreislauf: Verdampfung unten, Verdichtung nach rechts oben, Verflüssigung oben, Expansion senkrecht nach unten" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M40 225V20M40 225H415" stroke-width="1.2"/><path d="M36 26L40 18L44 26M407 221L415 225L407 229" stroke-width="1.2"/><path d="M95 225C110 120 150 55 205 40C260 55 290 120 300 225" stroke-dasharray="5 3" stroke-width="1.3"/><circle cx="205" cy="40" r="2.5" fill="currentColor"/><path d="M125 178H312" stroke-width="2.6"/><path d="M312 178L362 70" stroke-width="2.6"/><path d="M362 70H125" stroke-width="2.6"/><path d="M125 70V178" stroke-width="2.6"/><path d="M226 174L236 178L226 182Z" fill="currentColor" stroke="none"/><path d="M333 128L338 118L343 128Z" fill="currentColor" stroke="none"/><path d="M250 66L240 70L250 74Z" fill="currentColor" stroke="none"/><path d="M121 120L125 130L129 120Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none" font-size="11"><text x="14" y="16">log p</text><text x="400" y="244">h</text><text x="203" y="32" text-anchor="middle" font-size="9.5">kritischer Punkt</text><text x="205" y="150" text-anchor="middle" font-size="10">Nassdampf</text><text x="66" y="140" text-anchor="middle" font-size="10">flüssig</text><text x="385" y="150" text-anchor="middle" font-size="10">gasförmig</text><text x="230" y="195" text-anchor="middle">Verdampfen (4 → 1)</text><text x="370" y="110" text-anchor="start">Ver-</text><text x="370" y="123" text-anchor="start">dichten</text><text x="200" y="100" text-anchor="middle" font-size="10">Verflüssigen (2 → 3)</text><text x="114" y="112" text-anchor="end">Entspannen</text><text x="125" y="194" text-anchor="middle" font-weight="600">4</text><text x="318" y="194" text-anchor="middle" font-weight="600">1</text><text x="368" y="64" text-anchor="middle" font-weight="600">2</text><text x="125" y="62" text-anchor="middle" font-weight="600">3</text><text x="100" y="172" text-anchor="end" font-size="9.5">p₀ tief</text><text x="112" y="84" text-anchor="end" font-size="9.5">p_c hoch</text></g></svg><figcaption>Unter der gestrichelten Kurve siedet das Kältemittel. Links davon ist es flüssig, rechts gasförmig.</figcaption></figure>

- **Siedelinie** (links der Kuppel) und **Taulinie** (rechts) begrenzen das Nassdampfgebiet. Dort siedet oder kondensiert das Kältemittel bei konstanter Temperatur.
- **Verdampfen 4 → 1** verläuft waagrecht bei tiefem Druck p₀, nach rechts bis über die Taulinie hinaus.
- **Verdichten 1 → 2** steigt nach rechts oben. Die ideale Verdichtung folgt einer Linie gleicher Entropie, die reale liegt wegen der Verluste weiter rechts.
- **Verflüssigen 2 → 3** verläuft waagrecht beim hohen Druck p_c: zuerst Enthitzung des Heissgases, dann Kondensation, dann Unterkühlung.
- **Entspannen 3 → 4** fällt senkrecht, die Enthalpie bleibt gleich.

Der Vorteil des Diagramms: **Leistungen sind Strecken.** Die Kälteleistung ist der Massenstrom mal der Breite der Verdampfung (h₁ − h₄), die Verdichterleistung der Massenstrom mal der Breite der Verdichtung (h₂ − h₁). Der Verflüssiger muss beides abführen.

<p class="formel">Φ<sub>0</sub> = q<sub>m</sub> · (h<sub>1</sub> − h<sub>4</sub>)  ·  P = q<sub>m</sub> · (h<sub>2</sub> − h<sub>1</sub>)  ·  Φ<sub>c</sub> = Φ<sub>0</sub> + P</p>

### Beispiel aus der Siemens-Unterlage

Luftkühler mit R134a, 25 kW Kälteleistung, 8.75 kW Verdichterleistung:

| Grösse                       | Wert                     |
| ---------------------------- | ------------------------ |
| Verdampfung                  | +5 °C bei 3.5 bar abs.   |
| Verflüssigung                | +45 °C bei 11.6 bar abs. |
| Unterkühlung im Verflüssiger | etwa 5 K                 |
| Überhitzung am Verdampfer    | 5 bis 8 K                |
| Heissgas nach Verdichter     | etwa 85 °C               |
| umlaufendes Kältemittel      | 577 kg/h                 |
| EER                          | 25 / 8.75 ≈ 2.9          |

Nach dem Expansionsventil ist bereits gut ein Fünftel des Kältemittels verdampft, ohne zu kühlen. Nur der Rest nimmt Wärme aus der Luft auf. Mehr Unterkühlung verschiebt Punkt 3 nach links und erhöht so die Kälteleistung pro kg.

## Überhitzung und Unterkühlung

**Überhitzung:** Am Ende des Verdampfers ist das Kältemittel einige Kelvin wärmer als seine Siedetemperatur, typisch 5 bis 8 K. Damit ist sicher kein Tropfen Flüssigkeit mehr im Sauggas. Flüssigkeit lässt sich nicht verdichten und zerschlägt den Verdichter (**Flüssigkeitsschlag**). Die Überhitzung ist die **Regelgrösse des Expansionsventils**.

**Unterkühlung:** Am Ende des Verflüssigers ist die Flüssigkeit einige Kelvin kälter als ihre Kondensationstemperatur, typisch etwa 5 K. Das erhöht die Kälteleistung und verhindert, dass sich vor dem Expansionsventil schon Dampfblasen bilden.

Beide Werte sagen viel über den Zustand der Anlage. Zu wenig Kältemittel zeigt sich an hoher Überhitzung und kleiner Unterkühlung, zu viel an kleiner Überhitzung und grosser Unterkühlung.

## Bauteile

### Verdampfer

| Art                                                                 | Vorteile                                                                                                          |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Direkte Verdampfung** (DX, das Kältemittel kühlt die Luft direkt) | günstiger, höhere Verdampfungstemperatur, kleinerer Verdichter                                                    |
| **Indirekte Verdampfung** (Kaltwasser oder Sole als Zwischenmedium) | einfache Planung und Regelung, gutes Teillastverhalten, Lecks weniger kritisch, beste Lösung für verzweigte Netze |

Als Bauarten kommen **Rohrbündel**-, **Platten**- und **Lamellenverdampfer** vor. Bei DX-Luftkühlern verteilt eine **Spinne** das Kältemittel gleichmässig auf die Rohre. Liegt die Oberfläche unter 0 °C, muss abgetaut werden: durch Ventilatornachlauf, elektrisch oder mit Heissgas.

### Verdichter

| Bauart                            | Leistungsbereich                  | Besonderheit                                                      |
| --------------------------------- | --------------------------------- | ----------------------------------------------------------------- |
| **Rollkolben**                    | klein, bis etwa 20 kW             | hermetisch, leise, in Split-Geräten                               |
| **Scroll**                        | etwa 1 bis 50 kW, auch in Tandems | zwei Spiralen, kontinuierlich, gut drehzahlregelbar               |
| **Hubkolben**                     | klein bis mittel                  | robust, Leistungsstufen durch Zylinderabschaltung                 |
| **Schraube**                      | mittel bis gross                  | nur drehende Teile, stufenlos regelbar                            |
| **Turbo**                         | gross                             | Strömungsprinzip, darf nicht in den instabilen Bereich («Pumpen») |
| **Turbo, magnetgelagert, ölfrei** | mittel bis gross                  | sehr effizient auch bei Teillast, kleiner Anlaufstrom             |

Nach dem Antrieb unterscheidet man **offene** Verdichter (Motor aussen, Grosskälte), **halbhermetische** (Motor im verschraubten Gehäuse, vom Sauggas gekühlt, in Klimaanlagen am häufigsten) und **hermetische** (verschweisst, nicht reparierbar, Kleingeräte).

### Verflüssiger

- **Wassergekühlt:** meist Rohrbündel, an einen Rückkühlkreis oder an die Heizung angeschlossen
- **Luftgekühlt:** Lamellenverflüssiger mit Ventilatoren, oft auf dem Dach
- **Verdunstungsverflüssiger:** Wasser rieselt über die Rohre und verdunstet. Im Winter entleeren.
- **Hybridkühler:** trocken, an heissen Tagen mit Wassersprühung

Der **Verflüssigungsdruck** muss in einem Fenster bleiben. Zu hoch kostet Verdichterleistung und löst den Hochdruckwächter aus. Zu tief, und vor dem Expansionsventil fehlt der Druck, um genug Kältemittel in den Verdampfer zu drücken. Deshalb werden die Verflüssigerventilatoren nach Druck geschaltet, und bei kalter Witterung hält oft eine **Druckhochhaltung** den Sammler unter Druck. Innerhalb dieses Fensters gilt: **Je tiefer der Verflüssigungsdruck, desto besser der EER.**

### Expansionsventil

| Typ                      | Funktion                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Thermostatisch** (TEV) | Fühler an der Saugleitung, Kapillare auf eine Membran. Reiner P-Regler, braucht eine grössere Überhitzung.                |
| **Elektronisch** (EEV)   | Druck- und Temperaturfühler, eigener Überhitzungsregler (PID), Schrittmotorventil. Hält die Überhitzung klein und stabil. |

Ein EEV nutzt den Verdampfer besser aus, weil weniger Fläche zum Überhitzen gebraucht wird, und erlaubt einen tieferen Verflüssigungsdruck bei Teillast.

## Sicherheits- und Hilfsorgane

| Organ                        | Aufgabe                                                                                                                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hochdruckwächter**         | schaltet ab, bevor der Druck nach dem Verdichter zu hoch wird                                                                                                                               |
| **Niederdruckwächter**       | schaltet ab bei Kältemittelmangel oder zu wenig Wärme am Verdampfer                                                                                                                         |
| **Wicklungsschutz** (Klixon) | Übertemperatur im Motor, etwa wenn kühlendes Sauggas fehlt                                                                                                                                  |
| **Öldruck-Differenzwächter** | grössere Verdichter, schaltet nach Verzögerung bei zu wenig Öldruck ab                                                                                                                      |
| **Ölsumpfheizung**           | hält das Öl im Stillstand warm, damit es kein Kältemittel aufnimmt und beim Start nicht schäumt                                                                                             |
| **Magnetventil, Pump-down**  | schliesst beim Abschalten die Flüssigkeitsleitung, der Verdichter saugt den Verdampfer leer und geht über den Niederdruckwächter aus. So sammelt sich keine Flüssigkeit vor dem Verdichter. |
| **Wiederanlaufsperre**       | verhindert zu häufige Starts, jeder Start erhitzt die Wicklung                                                                                                                              |
| **Anlaufentlastung**         | Stern-Dreieck, Teilwicklung, Bypass oder Frequenzumrichter gegen hohe Anlaufströme                                                                                                          |

Dazu kommen Sicherheitsventile, Trockner, Schaugläser und der Flüssigkeitssammler. Das ist Sache des Kälteanlagenbauers, die Normen dazu stehen in EN 378.

**Öl** läuft mit dem Kältemittel durch den ganzen Kreislauf und muss zurück zum Verdichter. In Steigleitungen braucht es dafür genug Gasgeschwindigkeit. Bei Anlagen mit Leistungsregelung werden Steigleitungen deshalb oft doppelt geführt.

## Leistungsregelung

Kälteanlagen laufen über 90 % der Zeit in Teillast.

| Verfahren                                | Bewertung                                                                                                                                                                 |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Drehzahl mit Frequenzumrichter**       | etwa 40 bis 100 % stetig, kein Takten, sanfter Anlauf. Leistung sinkt in der Praxis etwa mit dem Quadrat der Drehzahl. Bei Volllast kostet der Umrichter etwas Effizienz. |
| **Zylinderabschaltung** (Hubkolben)      | Stufen, z.B. 33 – 66 – 100 % oder 25 – 50 – 75 – 100 %                                                                                                                    |
| **Schieber** (Schraube)                  | stetig, bei Teillast weniger effizient als Drehzahl                                                                                                                       |
| **Mehrere Verdichter** (Tandem, Verbund) | feine Stufen, Redundanz                                                                                                                                                   |
| **Saugdrossel, Heissgas-Bypass**         | reduzieren die Kälteleistung, aber kaum den Strom. Energetisch nicht mehr vertretbar, im Bestand noch anzutreffen.                                                        |
| **Kaltwasser- oder Eisspeicher**         | Maschine läuft lange Zyklen, Speicher deckt die Schwankungen, siehe [Eisspeicher](/wissen/eisspeicher)                                                                    |

## Wärme aus dem Kältekreislauf nutzen

Der Verflüssiger gibt mehr Wärme ab, als die Maschine Kälte erzeugt: Kälteleistung plus Verdichterleistung. Statt sie über den Rückkühler wegzublasen, lässt sie sich nutzen, etwa für Warmwasser, zur Nachwärmung nach dem Entfeuchten, in Läden mit Kühlmöbeln und gleichzeitigem Heizbedarf oder für eine Niedertemperaturheizung.

- **Enthitzer:** Ein kleiner Wärmetauscher direkt nach dem Verdichter nutzt das heisse Gas, z.B. 80 bis 90 °C. Damit lässt sich Warmwasser über die Kondensationstemperatur hinaus erwärmen.
- **Zusatzverflüssiger** in Reihe oder parallel zum Hauptverflüssiger.
- **Regelung auf der Gasseite:** Ein Verteilventil im Heissgas reagiert schnell, gut für Lufterwärmer und Prozesse.
- **Regelung auf der Kondensatseite:** Ein Mischventil im Kondensat flutet den nicht gebrauchten Verflüssiger. Träger, aber energetisch etwas besser, weil kein Druckverlust im Heissgas entsteht. Gut für Warmwasser und Heizung.

Je höher die Kondensationstemperatur gewählt wird, desto mehr muss der Verdichter arbeiten. Wärme auf hohem Niveau ist also nicht gratis. Oft lohnt eine Vorwärmung: Warmwasser von 10 auf 35 °C mit Abwärme, der Kessel heizt auf 60 °C nach. Das halbiert in diesem Beispiel den Kesselbedarf für Warmwasser.

## Für die GA

Die Maschine hat fast immer eine eigene Steuerung. Die GA gibt frei, setzt Sollwerte und liest mit. Bei Störungen hilft das Verständnis des Kreislaufs:

| Störung         | Häufige Ursachen                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **Hochdruck**   | Rückkühler verschmutzt oder Ventilator defekt, Kühlwasser fehlt oder zu warm, bei Wärmepumpen zu warmer Rücklauf oder zu wenig Durchfluss |
| **Niederdruck** | Kältemittelmangel durch Leck, zu wenig Durchfluss am Verdampfer, Verdampfer vereist oder verschmutzt, Expansionsventil defekt             |
| **Takten**      | Maschine zu gross für die Last, zu wenig Wasserinhalt, kein Speicher                                                                      |

| Datenpunkt                    | Typ    | Beschreibung                                         |
| ----------------------------- | ------ | ---------------------------------------------------- |
| Freigabe, Sollwert Kaltwasser | DO, AO | oder über Bus                                        |
| Betrieb, Sammelstörung        | DI     | getrennte Meldungen HD, ND, Motorschutz wenn möglich |
| Hoch- und Niederdruck         | Bus    | aus der Maschinensteuerung                           |
| Überhitzung, Unterkühlung     | Bus    | Füllung und Zustand beurteilen                       |
| Verdichterstufe oder Drehzahl | Bus    | Teillast, Takten                                     |
| Kälte- und Stromzähler        | Bus    | EER im Betrieb                                       |

## Quellen

- Siemens Schweiz AG: «Kältetechnik», Schulungsunterlage BT_0099, 2022, Kap. 1, 3 bis 6 und 8
- EN 378: Kälteanlagen und Wärmepumpen — Sicherheitstechnische und umweltrelevante Anforderungen

<!-- EN -->

Every compression chiller and every heat pump uses the same trick: a refrigerant **boils at low pressure** already at a low temperature and absorbs heat in doing so. At **high pressure it condenses** at a high temperature and releases the heat again. The compressor raises the pressure, the expansion valve lowers it again. Over 90 % of all refrigeration plants work this way.

## The Four Steps

| Step            | Component       | What happens                                                                   |
| --------------- | --------------- | ------------------------------------------------------------------------------ |
| **Evaporating** | Evaporator      | Refrigerant boils at low pressure and draws heat from the chilled water or air |
| **Compressing** | Compressor      | Pressure and temperature rise; the gas becomes hot discharge gas               |
| **Condensing**  | Condenser       | Gas cools, condenses and releases the heat to the heat rejection or heating    |
| **Expanding**   | Expansion valve | Pressure drops, part of the liquid flashes, the refrigerant becomes cold       |

In a chiller the evaporator is the benefit, in a [heat pump](/wissen/waermepumpe) the condenser. The machine is the same.

## The Pressure-Enthalpy Diagram

Refrigeration engineers describe the cycle in the **pressure-enthalpy diagram** (h,log p). To the right the enthalpy h rises, i.e. the heat content per kg of refrigerant. Upwards the pressure rises, on a logarithmic scale. Each refrigerant has its own diagram.

<figure class="schema"><svg viewBox="0 0 430 260" role="img" aria-label="Pressure-enthalpy diagram with wet vapour region and refrigeration cycle: evaporation at the bottom, compression up to the right, condensation at the top, expansion vertically down" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M40 225V20M40 225H415" stroke-width="1.2"/><path d="M36 26L40 18L44 26M407 221L415 225L407 229" stroke-width="1.2"/><path d="M95 225C110 120 150 55 205 40C260 55 290 120 300 225" stroke-dasharray="5 3" stroke-width="1.3"/><circle cx="205" cy="40" r="2.5" fill="currentColor"/><path d="M125 178H312" stroke-width="2.6"/><path d="M312 178L362 70" stroke-width="2.6"/><path d="M362 70H125" stroke-width="2.6"/><path d="M125 70V178" stroke-width="2.6"/><path d="M226 174L236 178L226 182Z" fill="currentColor" stroke="none"/><path d="M333 128L338 118L343 128Z" fill="currentColor" stroke="none"/><path d="M250 66L240 70L250 74Z" fill="currentColor" stroke="none"/><path d="M121 120L125 130L129 120Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none" font-size="11"><text x="14" y="16">log p</text><text x="400" y="244">h</text><text x="203" y="32" text-anchor="middle" font-size="9.5">critical point</text><text x="205" y="150" text-anchor="middle" font-size="10">wet vapour</text><text x="66" y="140" text-anchor="middle" font-size="10">liquid</text><text x="385" y="150" text-anchor="middle" font-size="10">vapour</text><text x="230" y="195" text-anchor="middle">Evaporating (4 → 1)</text><text x="370" y="110" text-anchor="start">Com-</text><text x="370" y="123" text-anchor="start">pressing</text><text x="200" y="100" text-anchor="middle" font-size="10">Condensing (2 → 3)</text><text x="114" y="112" text-anchor="end">Expanding</text><text x="125" y="194" text-anchor="middle" font-weight="600">4</text><text x="318" y="194" text-anchor="middle" font-weight="600">1</text><text x="368" y="64" text-anchor="middle" font-weight="600">2</text><text x="125" y="62" text-anchor="middle" font-weight="600">3</text><text x="100" y="172" text-anchor="end" font-size="9.5">p₀ low</text><text x="112" y="84" text-anchor="end" font-size="9.5">p_c high</text></g></svg><figcaption>Under the dashed curve the refrigerant boils. To the left it is liquid, to the right vapour.</figcaption></figure>

- The **saturated liquid line** (left of the dome) and **saturated vapour line** (right) bound the wet vapour region. There the refrigerant boils or condenses at constant temperature.
- **Evaporating 4 → 1** runs horizontally at the low pressure p₀, to the right beyond the saturated vapour line.
- **Compressing 1 → 2** rises to the upper right. Ideal compression follows a line of constant entropy; real compression lies further right because of losses.
- **Condensing 2 → 3** runs horizontally at the high pressure p_c: first desuperheating of the discharge gas, then condensation, then subcooling.
- **Expanding 3 → 4** drops vertically; the enthalpy stays the same.

The advantage of the diagram: **outputs are distances.** Cooling capacity is the mass flow times the width of evaporation (h₁ − h₄), compressor power the mass flow times the width of compression (h₂ − h₁). The condenser must reject both.

<p class="formel">Φ<sub>0</sub> = q<sub>m</sub> · (h<sub>1</sub> − h<sub>4</sub>)  ·  P = q<sub>m</sub> · (h<sub>2</sub> − h<sub>1</sub>)  ·  Φ<sub>c</sub> = Φ<sub>0</sub> + P</p>

### Example from the Siemens Document

Air cooler with R134a, 25 kW cooling capacity, 8.75 kW compressor power:

| Quantity                | Value                   |
| ----------------------- | ----------------------- |
| Evaporation             | +5 °C at 3.5 bar abs.   |
| Condensation            | +45 °C at 11.6 bar abs. |
| Subcooling in condenser | about 5 K               |
| Superheat at evaporator | 5 to 8 K                |
| Discharge gas           | about 85 °C             |
| Circulating refrigerant | 577 kg/h                |
| EER                     | 25 / 8.75 ≈ 2.9         |

After the expansion valve a good fifth of the refrigerant has already evaporated without cooling. Only the rest absorbs heat from the air. More subcooling moves point 3 to the left and so increases the cooling capacity per kg.

## Superheat and Subcooling

**Superheat:** at the end of the evaporator the refrigerant is a few kelvin warmer than its boiling temperature, typically 5 to 8 K. That ensures there is no liquid left in the suction gas. Liquid cannot be compressed and destroys the compressor (**liquid slugging**). Superheat is the **controlled variable of the expansion valve**.

**Subcooling:** at the end of the condenser the liquid is a few kelvin colder than its condensing temperature, typically about 5 K. This increases cooling capacity and prevents vapour bubbles from forming before the expansion valve.

Both values say a lot about the state of the plant. Too little refrigerant shows as high superheat and low subcooling; too much as low superheat and high subcooling.

## Components

### Evaporator

| Type                                                              | Advantages                                                                                            |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Direct expansion** (DX, the refrigerant cools the air directly) | cheaper, higher evaporating temperature, smaller compressor                                           |
| **Indirect** (chilled water or brine as intermediate medium)      | simple design and control, good part-load behaviour, leaks less critical, best for extensive networks |

Shell-and-tube, plate and finned-tube evaporators are used. In DX air coolers a **distributor** spreads the refrigerant evenly across the tubes. If the surface is below 0 °C, it must be defrosted: by fan run-on, electrically or with hot gas.

### Compressor

| Type                                         | Capacity range                    | Particularity                                              |
| -------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| **Rolling piston**                           | small, up to about 20 kW          | hermetic, quiet, in split units                            |
| **Scroll**                                   | about 1 to 50 kW, also in tandems | two spirals, continuous, easy to speed-control             |
| **Reciprocating**                            | small to medium                   | robust, capacity steps by cylinder unloading               |
| **Screw**                                    | medium to large                   | only rotating parts, continuously controllable             |
| **Centrifugal**                              | large                             | flow principle; must not enter the unstable region (surge) |
| **Centrifugal, magnetic bearings, oil-free** | medium to large                   | very efficient also at part load, low inrush current       |

By drive one distinguishes **open** compressors (motor outside, large plants), **semi-hermetic** (motor in a bolted housing, cooled by suction gas, most common in air conditioning) and **hermetic** (welded, not repairable, small units).

### Condenser

- **Water-cooled:** usually shell-and-tube, connected to a heat rejection circuit or to the heating
- **Air-cooled:** finned condenser with fans, often on the roof
- **Evaporative condenser:** water trickles over the tubes and evaporates. Drain in winter.
- **Hybrid cooler:** dry, with water spraying on hot days

The **condensing pressure** must stay within a window. Too high costs compressor power and trips the high-pressure switch. Too low, and there is not enough pressure before the expansion valve to push enough refrigerant into the evaporator. That is why condenser fans are staged by pressure, and in cold weather a **head pressure control** often keeps the receiver under pressure. Within this window: **the lower the condensing pressure, the better the EER.**

### Expansion Valve

| Type                   | Function                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Thermostatic** (TXV) | Bulb on the suction line, capillary to a diaphragm. Pure P controller, needs a larger superheat.                   |
| **Electronic** (EEV)   | Pressure and temperature sensors, own superheat controller (PID), stepper valve. Keeps superheat small and stable. |

An EEV uses the evaporator better, because less surface is needed for superheating, and allows a lower condensing pressure at part load.

## Safety and Auxiliary Devices

| Device                               | Task                                                                                                                                                           |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **High-pressure switch**             | trips before the pressure after the compressor becomes too high                                                                                                |
| **Low-pressure switch**              | trips on refrigerant shortage or too little heat at the evaporator                                                                                             |
| **Winding protection** (Klixon)      | overtemperature in the motor, e.g. when cooling suction gas is missing                                                                                         |
| **Oil pressure differential switch** | larger compressors, trips after a delay on too low oil pressure                                                                                                |
| **Crankcase heater**                 | keeps the oil warm at standstill so it does not absorb refrigerant and foam at start-up                                                                        |
| **Solenoid valve, pump-down**        | closes the liquid line on shutdown; the compressor pumps the evaporator empty and stops via the low-pressure switch. No liquid collects before the compressor. |
| **Restart lockout**                  | prevents too frequent starts; each start heats the winding                                                                                                     |
| **Starting relief**                  | star-delta, part winding, bypass or frequency converter against high inrush currents                                                                           |

Add safety valves, driers, sight glasses and the liquid receiver. These are the refrigeration contractor's business; the standards are in EN 378.

**Oil** travels with the refrigerant through the whole circuit and must return to the compressor. Riser pipes need enough gas velocity for this. In plants with capacity control, risers are therefore often doubled.

## Capacity Control

Refrigeration plants run at part load more than 90 % of the time.

| Method                                 | Assessment                                                                                                                                                        |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Speed via frequency converter**      | about 40 to 100 % continuous, no cycling, soft start. Power drops in practice roughly with the square of speed. At full load the converter costs some efficiency. |
| **Cylinder unloading** (reciprocating) | steps, e.g. 33 – 66 – 100 % or 25 – 50 – 75 – 100 %                                                                                                               |
| **Slide valve** (screw)                | continuous, less efficient at part load than speed control                                                                                                        |
| **Several compressors** (tandem, rack) | fine steps, redundancy                                                                                                                                            |
| **Suction throttling, hot-gas bypass** | reduce cooling capacity but hardly power consumption. No longer justifiable energetically, still found in existing plants.                                        |
| **Chilled water or ice storage**       | machine runs long cycles, storage covers fluctuations, see [Ice Storage](/wissen/eisspeicher)                                                                     |

## Using Heat from the Refrigeration Cycle

The condenser releases more heat than the machine produces cold: cooling capacity plus compressor power. Instead of blowing it away via the dry cooler, it can be used, for example for hot water, for reheating after dehumidification, in shops with refrigerated cabinets and simultaneous heating demand, or for low-temperature heating.

- **Desuperheater:** a small heat exchanger directly after the compressor uses the hot gas, e.g. 80 to 90 °C. This allows hot water to be heated above the condensing temperature.
- **Additional condensers** in series with or parallel to the main condenser.
- **Gas-side control:** a diverting valve in the hot gas reacts quickly, good for air heaters and processes.
- **Condensate-side control:** a mixing valve in the condensate floods the unused condenser. Slower, but slightly better energetically because there is no pressure drop in the hot gas. Good for hot water and heating.

The higher the condensing temperature is chosen, the harder the compressor has to work. Heat at a high level is therefore not free. Preheating often pays: hot water from 10 to 35 °C with waste heat, the boiler tops up to 60 °C. In this example that halves the boiler demand for hot water.

## For BA

The machine almost always has its own controller. BA enables it, sets setpoints and reads values. When faults occur, understanding the cycle helps:

| Fault             | Common causes                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **High pressure** | dry cooler fouled or fan faulty, cooling water missing or too warm; for heat pumps too warm a return or too little flow  |
| **Low pressure**  | refrigerant shortage due to a leak, too little flow at the evaporator, evaporator iced or fouled, expansion valve faulty |
| **Cycling**       | machine too large for the load, too little water content, no storage                                                     |

| Data point                     | Type   | Description                                           |
| ------------------------------ | ------ | ----------------------------------------------------- |
| Enable, chilled water setpoint | DO, AO | or via bus                                            |
| Running, common fault          | DI     | separate HP, LP, motor protection signals if possible |
| High and low pressure          | Bus    | from the machine controller                           |
| Superheat, subcooling          | Bus    | assess charge and condition                           |
| Compressor stage or speed      | Bus    | part load, cycling                                    |
| Cooling and electricity meters | Bus    | EER in operation                                      |

## Sources

- Siemens Schweiz AG: "Kältetechnik", training document BT_0099, 2022, ch. 1, 3 to 6 and 8
- EN 378: Refrigerating systems and heat pumps — Safety and environmental requirements
