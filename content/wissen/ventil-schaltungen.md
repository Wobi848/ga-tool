---
title: Hydraulische Grundschaltungen — Drossel, Umlenkung, Beimischung, Einspritzung
title_en: Basic Hydraulic Circuits — Throttling, Diverting, Mixing, Injection
slug: ventil-schaltungen
category: hydraulik
subcategory: regelung
tags:
  [
    drosselschaltung,
    umlenkschaltung,
    beimischschaltung,
    einspritzschaltung,
    vormischung,
    doppelbeimischung,
    durchgangsventil,
    dreiwegventil,
    mischventil,
    heizkreis,
    ungemischter heizkreis,
    verteiler,
    mengenregelung,
    mischregelung
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [
    hydraulische-schaltungen,
    motorventile,
    ventilautoritaet,
    hydraulischer-abgleich,
    pumpen,
    pid-regler
  ]
rechner: [hydraulik-simulator]
norm: [EN 12828, SIA 384/1, VDI 3814]
updated: 2026-10-17
lang: de
---

# Hydraulische Grundschaltungen — Drossel, Umlenkung, Beimischung, Einspritzung

Jede Heiz- oder Kühlgruppe passt ihre Leistung auf eine von zwei Arten an. Die Leistung ist proportional zu Volumenstrom mal Temperaturdifferenz, also kann man entweder den **Volumenstrom** oder die **Temperatur** verändern. Für jede der beiden Arten gibt es zwei Grundschaltungen.

| Regelart               | Was sich ändert                   | Grundschaltungen                      |
| ---------------------- | --------------------------------- | ------------------------------------- |
| **Durchflussregelung** | Volumenstrom, Temperatur konstant | Drosselschaltung, Umlenkschaltung     |
| **Mischregelung**      | Temperatur, Volumenstrom konstant | Beimischschaltung, Einspritzschaltung |

Die Durchflussregelung heisst auch **mengenvariabel**, die Mischregelung **mengenkonstant**. Entscheidend für das Verhalten sind das Stellglied (Durchgangs- oder Dreiwegventil) und **wo die Pumpe sitzt**.

<figure class="schema legende"><span class="leg vl">Vorlauf vom Erzeuger</span><span class="leg mix">Gemischter Vorlauf</span><span class="leg rl">Rücklauf</span><figcaption>Farben in allen Schemas dieses Artikels. T = Regelfühler, M = Stellantrieb.</figcaption></figure>

## 1 — Drosselschaltung

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Drosselschaltung: Pumpe im Vorlauf, Durchgangsventil im Rücklauf" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle cx="110" cy="45" r="9" class="bauteil bg"/><path d="M106 39L117 45L106 51Z" class="bauteil"/><path d="M213 118L213 132L227 118L227 132Z" class="bauteil bg"/><path d="M220 132V142" class="bauteil"/><rect x="213" y="142" width="14" height="12" class="bauteil bg"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M195 41L205 45L195 49Z" stroke-width="1"/><path class="rl fill" d="M155 121L145 125L155 129Z" stroke-width="1"/><path class="rl fill" d="M285 121L275 125L285 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="220" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text></g></svg><figcaption>Pumpe im Erzeugerkreis, Durchgangsventil im Rücklauf.</figcaption></figure>

Das Durchgangsventil verändert den Volumenstrom durch den Verbraucher **und** durch den Erzeuger. Jede Ventilbewegung verändert die Druckverhältnisse in der ganzen Anlage.

- **Tiefe Rücklauftemperatur** bei Teillast
- Variabler Volumenstrom in der ganzen Anlage
- Beim Anfahren verzögert, bis heisses Wasser am Verbraucher ankommt (Totzeit je nach Rohrlänge)
- Bei geschlossenem Ventil kann die Pumpe überhitzen

**Einsatz:** Lufterwärmer ohne Einfriergefahr, Luftkühler mit Entfeuchtung, Boiler- und Speicherladung, Fernwärmeanschlüsse, Anlagen mit Brennwertkessel.

## 2 — Umlenkschaltung

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Umlenkschaltung: Bypass vom Vorlauf zum Dreiwegventil im Rücklauf" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="vl" d="M200 45L200 116" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle class="vl fill" cx="200" cy="45" r="3"/><circle cx="105" cy="45" r="9" class="bauteil bg"/><path d="M101 39L112 45L101 51Z" class="bauteil"/><path d="M191 119.5L191 130.5L200 125Z M209 119.5L209 130.5L200 125Z M194.5 116L205.5 116L200 125Z" class="bauteil bg"/><path d="M200 132V142" class="bauteil"/><rect x="193" y="142" width="14" height="12" class="bauteil bg"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M260 41L270 45L260 49Z" stroke-width="1"/><path class="vl fill" d="M196 80L200 90L204 80Z" stroke-width="1"/><path class="rl fill" d="M275 121L265 125L275 129Z" stroke-width="1"/><path class="rl fill" d="M135 121L125 125L135 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="200" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text><text x="207" y="88" text-anchor="start" font-size="12">Bypass</text></g></svg><figcaption>Bypass vom Vorlauf zum Dreiwegventil im Rücklauf.</figcaption></figure>

Das Dreiwegventil verteilt das heisse Vorlaufwasser zwischen Verbraucher und Bypass. Durch den Verbraucher fliesst je nach Stellung mehr oder weniger, durch den Erzeuger immer gleich viel. Bei geschlossenem Ventil kommt der Rücklauf fast mit Vorlauftemperatur zurück zum Erzeuger.

- Variabler Volumenstrom im Verbraucher
- **Konstanter Volumenstrom und Druck im Erzeugerkreis**, vorteilhaft bei mehreren Gruppen
- Mittlere bis hohe Rücklauftemperatur
- Schnelles Ansprechen, sofern das Ventil nahe beim Verbraucher sitzt

**Einsatz:** Luftkühler mit Entfeuchtung, Lufterwärmer ohne Einfriergefahr, Wärmerückgewinnung, Brauchwassererwärmung.
**Nicht geeignet** für Fernwärme: Die hohe Rücklauftemperatur ist dort unerwünscht.

## 3 — Beimischschaltung

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Beimischschaltung: Dreiwegventil im Vorlauf, Bypass vom Rücklauf, Pumpe im Verbraucherkreis" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L150 45" stroke-width="3"/><path class="mix" d="M150 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M150 125L150 54" stroke-width="3"/><circle class="rl fill" cx="150" cy="125" r="3"/><path d="M141 39.5L141 50.5L150 45Z M159 39.5L159 50.5L150 45Z M144.5 54L155.5 54L150 45Z" class="bauteil bg"/><path d="M150 38V28" class="bauteil"/><rect x="143" y="16" width="14" height="12" class="bauteil bg"/><circle cx="215" cy="45" r="9" class="bauteil bg"/><path d="M211 39L222 45L211 51Z" class="bauteil"/><path d="M258 45V30" class="bauteil" stroke-width="1"/><circle cx="258" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M268 118L268 132L282 118L282 132Z" class="bauteil bg"/><path d="M266 134L284 116M284 116l-6 1M284 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M95 41L105 45L95 49Z" stroke-width="1"/><path class="mix fill" d="M295 41L305 45L295 49Z" stroke-width="1"/><path class="rl fill" d="M146 95L150 85L154 95Z" stroke-width="1"/><path class="rl fill" d="M220 121L210 125L220 129Z" stroke-width="1"/><path class="rl fill" d="M105 121L95 125L105 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="150" y="25.5" text-anchor="middle" font-size="9.5">M</text><text x="258" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text><text x="157" y="93" text-anchor="start" font-size="12">Bypass</text><text x="104" y="174" text-anchor="middle" font-size="12">Erzeugerkreis</text><text x="240" y="174" text-anchor="middle" font-size="12">Verbraucherkreis</text></g></svg><figcaption>Dreiwegventil im Vorlauf, Bypass vom Rücklauf, Pumpe im Verbraucherkreis.</figcaption></figure>

Das Dreiwegventil trennt Erzeuger- und Verbraucherkreis. Es mischt heisses Vorlaufwasser mit abgekühltem Rücklaufwasser aus dem Bypass. So entsteht die gewünschte Vorlauftemperatur. Die Pumpe im Verbraucherkreis fördert immer gleich viel.

- Tiefe Rücklauftemperatur bei kleiner Last
- Variabler Volumenstrom im Erzeugerkreis
- **Konstanter Volumenstrom mit variabler Temperatur** im Verbraucher
- Gleichmässige Temperaturverteilung über dem Verbraucher, geringe Einfriergefahr

**Einsatz:** Heizkörperheizungen, Lufterwärmer mit Einfriergefahr, Anlagen mit Niedertemperatur-Erzeugern oder Wärmepumpen.
**Nicht geeignet**, wenn zwischen Bypass und Regelfühler mehr als etwa 20 m liegen: Die Transportzeit macht den Regelkreis träge.

## 4 — Beimischschaltung mit fester Vormischung

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Beimischschaltung mit fester Vormischung: zusätzlicher Bypass mit Drossel nach dem Dreiwegventil" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L140 45" stroke-width="3"/><path class="mix" d="M140 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M140 125L140 54" stroke-width="3"/><path class="rl" d="M190 125L190 45" stroke-width="3"/><circle class="rl fill" cx="140" cy="125" r="3"/><circle class="rl fill" cx="190" cy="125" r="3"/><circle class="mix fill" cx="190" cy="45" r="3"/><path d="M131 39.5L131 50.5L140 45Z M149 39.5L149 50.5L140 45Z M134.5 54L145.5 54L140 45Z" class="bauteil bg"/><path d="M140 38V28" class="bauteil"/><rect x="133" y="16" width="14" height="12" class="bauteil bg"/><path d="M183 78L197 78L183 92L197 92Z" class="bauteil bg"/><path d="M181 94L199 76M199 76l-6 1M199 76l-1 6" class="bauteil"/><circle cx="235" cy="45" r="9" class="bauteil bg"/><path d="M231 39L242 45L231 51Z" class="bauteil"/><path d="M272 45V30" class="bauteil" stroke-width="1"/><circle cx="272" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M278 118L278 132L292 118L292 132Z" class="bauteil bg"/><path d="M276 134L294 116M294 116l-6 1M294 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M90 41L100 45L90 49Z" stroke-width="1"/><path class="mix fill" d="M300 41L310 45L300 49Z" stroke-width="1"/><path class="rl fill" d="M136 100L140 90L144 100Z" stroke-width="1"/><path class="rl fill" d="M186 115L190 105L194 115Z" stroke-width="1"/><path class="rl fill" d="M245 121L235 125L245 129Z" stroke-width="1"/><path class="rl fill" d="M100 121L90 125L100 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="140" y="25.5" text-anchor="middle" font-size="9.5">M</text><text x="272" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text><text x="205" y="70" text-anchor="start" font-size="12">feste</text><text x="205" y="84" text-anchor="start" font-size="12">Vormischung</text><text x="99" y="174" text-anchor="middle" font-size="12">Erzeugerkreis</text><text x="235" y="174" text-anchor="middle" font-size="12">Verbraucherkreis</text></g></svg><figcaption>Wie die Beimischschaltung, dazu ein fester Bypass mit Drossel nach dem Dreiwegventil.</figcaption></figure>

Auch hier regelt ein Dreiwegventil. Zusätzlich wird über den festen Bypass immer ein bestimmter Anteil Rücklaufwasser beigemischt. Das lohnt sich, wenn die Vorlauftemperatur des Verbrauchers deutlich unter der des Erzeugers liegt, etwa bei einer Fussbodenheizung an einem 70-°C-Kessel. Ohne Vormischung würde das Ventil nur im untersten Hubbereich arbeiten und schlecht regeln. Mit Vormischung nutzt es den ganzen Hub.

Die Schaltung heisst auch **Doppelbeimischschaltung**. Eigenschaften und Grenzen wie bei der Beimischschaltung.

**Einsatz:** Verbraucher mit tieferer Vorlauftemperatur als der Erzeuger: Fussbodenheizungen, Heizkörper an Hochtemperatur-Erzeugern.

## 5 — Einspritzschaltung mit Dreiwegventil

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Einspritzschaltung mit Dreiwegventil: Pumpe in beiden Kreisen, Dreiwegventil im Erzeugerrücklauf, Bypass ohne Ventil" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L205 45" stroke-width="3"/><path class="mix" d="M205 45L330 45L330 70" stroke-width="3"/><path class="vl" d="M145 45L145 116" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M205 125L205 45" stroke-width="3"/><circle class="vl fill" cx="145" cy="45" r="3"/><circle class="rl fill" cx="205" cy="125" r="3"/><circle class="mix fill" cx="205" cy="45" r="3"/><circle cx="82" cy="45" r="9" class="bauteil bg"/><path d="M78 39L89 45L78 51Z" class="bauteil"/><path d="M105 38L105 52L119 38L119 52Z" class="bauteil bg"/><path d="M103 54L121 36M121 36l-6 1M121 36l-1 6" class="bauteil"/><path d="M136 119.5L136 130.5L145 125Z M154 119.5L154 130.5L145 125Z M139.5 116L150.5 116L145 125Z" class="bauteil bg"/><path d="M145 132V142" class="bauteil"/><rect x="138" y="142" width="14" height="12" class="bauteil bg"/><circle cx="245" cy="45" r="9" class="bauteil bg"/><path d="M241 39L252 45L241 51Z" class="bauteil"/><path d="M280 45V30" class="bauteil" stroke-width="1"/><circle cx="280" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M283 118L283 132L297 118L297 132Z" class="bauteil bg"/><path d="M281 134L299 116M299 116l-6 1M299 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M170 41L180 45L170 49Z" stroke-width="1"/><path class="vl fill" d="M141 80L145 90L149 80Z" stroke-width="1"/><path class="rl fill" d="M201 95L205 85L209 95Z" stroke-width="1"/><path class="mix fill" d="M303 41L313 45L303 49Z" stroke-width="1"/><path class="rl fill" d="M255 121L245 125L255 129Z" stroke-width="1"/><path class="rl fill" d="M180 121L170 125L180 129Z" stroke-width="1"/><path class="rl fill" d="M105 121L95 125L105 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="145" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="280" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text><text x="211" y="93" text-anchor="start" font-size="12">Bypass</text><text x="131.5" y="174" text-anchor="middle" font-size="12">Erzeugerkreis</text><text x="267.5" y="174" text-anchor="middle" font-size="12">Verbraucherkreis</text></g></svg><figcaption>Pumpe in beiden Kreisen. Dreiwegventil im Erzeugerrücklauf, Bypass ohne Ventil zwischen den Kreisen.</figcaption></figure>

Die Erzeugerpumpe drückt je nach Ventilstellung mehr oder weniger heisses Wasser in den Verbraucherkreis. Dort mischt es sich mit Rücklaufwasser, das die Verbraucherpumpe über den Bypass ansaugt. Was nicht eingespritzt wird, fliesst über den Primärbypass zurück zum Erzeuger.

- **Konstanter Volumenstrom in beiden Kreisen**
- Relativ hohe Rücklauftemperatur: bei Nulllast gleich dem Erzeugervorlauf
- Gleichmässige Temperaturverteilung, geringe Einfriergefahr

**Einsatz:** Heizkörper- und Fussbodenheizungen, Lufterwärmer mit Einfriergefahr, Luftkühler ohne geregelte Entfeuchtung, Boilerladung.
**Nicht geeignet** für Fernwärme (hohe Rücklauftemperatur).

## 6 — Einspritzschaltung mit Durchgangsventil

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Einspritzschaltung mit Durchgangsventil: Pumpe in beiden Kreisen, Durchgangsventil im Erzeugerrücklauf, Bypass ohne Ventil" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L205 45" stroke-width="3"/><path class="mix" d="M205 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M205 125L205 45" stroke-width="3"/><circle class="rl fill" cx="205" cy="125" r="3"/><circle class="mix fill" cx="205" cy="45" r="3"/><circle cx="95" cy="45" r="9" class="bauteil bg"/><path d="M91 39L102 45L91 51Z" class="bauteil"/><path d="M133 118L133 132L147 118L147 132Z" class="bauteil bg"/><path d="M140 132V142" class="bauteil"/><rect x="133" y="142" width="14" height="12" class="bauteil bg"/><circle cx="245" cy="45" r="9" class="bauteil bg"/><path d="M241 39L252 45L241 51Z" class="bauteil"/><path d="M280 45V30" class="bauteil" stroke-width="1"/><circle cx="280" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M283 118L283 132L297 118L297 132Z" class="bauteil bg"/><path d="M281 134L299 116M299 116l-6 1M299 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M155 41L165 45L155 49Z" stroke-width="1"/><path class="rl fill" d="M201 95L205 85L209 95Z" stroke-width="1"/><path class="mix fill" d="M303 41L313 45L303 49Z" stroke-width="1"/><path class="rl fill" d="M255 121L245 125L255 129Z" stroke-width="1"/><path class="rl fill" d="M180 121L170 125L180 129Z" stroke-width="1"/><path class="rl fill" d="M100 121L90 125L100 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="140" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="280" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text><text x="211" y="93" text-anchor="start" font-size="12">Bypass</text><text x="131.5" y="174" text-anchor="middle" font-size="12">Erzeugerkreis</text><text x="267.5" y="174" text-anchor="middle" font-size="12">Verbraucherkreis</text></g></svg><figcaption>Pumpe in beiden Kreisen. Durchgangsventil im Erzeugerrücklauf, Bypass ohne Ventil.</figcaption></figure>

Wie oben, aber mit Durchgangsventil statt Dreiwegventil. Im Verbraucherkreis bleibt der Volumenstrom konstant, im Erzeugerkreis schwanken Volumenstrom und Druck stark. Bei mehreren Gruppen am selben Verteiler muss man das berücksichtigen.

- **Tiefe Rücklauftemperatur**, höchstens die Rücklauftemperatur des Verbrauchers
- Gleichmässige Temperaturverteilung, geringe Einfriergefahr
- Bei geschlossenem Ventil kann die Erzeugerpumpe überhitzen

**Einsatz:** Wärmespeicher und Wärmepumpen, Brennwertkessel, direkte Fernwärmeanschlüsse.
**Nicht geeignet** für Luftkühler mit Entfeuchtungsregelung.

## Ohne Stellglied: der ungemischte Heizkreis

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Ungemischter Heizkreis: nur Pumpe und Abgleichdrossel, kein Stellglied" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle cx="150" cy="45" r="9" class="bauteil bg"/><path d="M146 39L157 45L146 51Z" class="bauteil"/><path d="M233 118L233 132L247 118L247 132Z" class="bauteil bg"/><path d="M231 134L249 116M249 116l-6 1M249 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M235 41L245 45L235 49Z" stroke-width="1"/><path class="rl fill" d="M155 121L145 125L155 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="352" y="89" text-anchor="start" font-size="12.5">Verbraucher</text></g></svg><figcaption>Nur Pumpe und Abgleichdrossel, kein Regelventil.</figcaption></figure>

Nicht jede Gruppe hat ein Regelventil. Beim **ungemischten Heizkreis** (auch direkter Heizkreis oder Pumpengruppe) fördert nur eine Pumpe. Die Vorlauftemperatur kommt direkt vom Erzeuger, die Leistung wird anderswo bestimmt:

- über die **Vorlauftemperatur des Erzeugers**, etwa eine witterungsgeführte Kesseltemperatur
- über **Ein/Aus der Pumpe**, etwa bei der Speicherladung
- **am Verbraucher selbst**: Ein Thermostatventil am Heizkörper ist im Kleinen eine Drosselschaltung

Eine drehzahlgeregelte Pumpe passt dabei nur den Förderdruck an den Bedarf an und spart Strom. Die Vorlauftemperatur regelt sie nicht.

Ein ungemischter Kreis kann nur so warm sein wie der Erzeuger. Deshalb hängt am selben Kessel eine Fussbodenheizung immer hinter einem Mischer, Heizkörper dagegen oft direkt.

## Vergleich

| Schaltung                 | Stellglied | Pumpe(n)         | Volumenstrom Erzeuger | Volumenstrom Verbraucher | Rücklauf zum Erzeuger | Fernwärme |
| ------------------------- | ---------- | ---------------- | --------------------- | ------------------------ | --------------------- | --------- |
| Drossel                   | Durchgang  | Erzeugerkreis    | variabel              | variabel                 | tief                  | ✓         |
| Umlenkung                 | Dreiweg    | Erzeugerkreis    | konstant              | variabel                 | mittel bis hoch       | ✗         |
| Beimischung               | Dreiweg    | Verbraucherkreis | variabel              | konstant                 | tief                  | —         |
| Beimischung + Vormischung | Dreiweg    | Verbraucherkreis | variabel              | konstant                 | tief                  | —         |
| Einspritzung, Dreiweg     | Dreiweg    | beide Kreise     | konstant              | konstant                 | hoch                  | ✗         |
| Einspritzung, Durchgang   | Durchgang  | beide Kreise     | variabel              | konstant                 | tief                  | ✓         |
| Ungemischt                | keines     | Verbraucherkreis | —                     | konstant                 | wie Verbraucher       | —         |

**Für Neuanlagen** gelten die Umlenkschaltung und die Einspritzschaltung mit Dreiwegventil heute als veraltet. Siemens bezeichnet sie in der Ausgabe 2026 seiner Hydraulik-Schulung so, ebenso den Verteiler mit konstantem Volumenstrom. Der Grund ist die Energie: Die Hauptpumpe fördert dauernd den vollen Volumenstrom, und der Rücklauf kommt bei Teillast warm zurück. Bevorzugt werden Schaltungen mit variablem Volumenstrom auf der Erzeugerseite, also Drossel- und Einspritzschaltung mit Durchgangsventil, oft mit druckunabhängigem Ventil (PICV). Im Bestand bleiben die alten Schaltungen natürlich in Betrieb.

### Mit druckunabhängigem Ventil (PICV)

Drossel- und Einspritzschaltung lassen sich statt mit einem normalen Durchgangsventil mit einem **PICV** bauen. Es hält den Volumenstrom unabhängig von Druckschwankungen im Netz, begrenzt ihn auf den eingestellten Höchstwert und ersetzt so die Abgleichdrossel. Die Pumpe muss den Mindestdifferenzdruck des PICV liefern. Für Luftkühler und -erwärmer braucht es einen Antrieb mit gleichprozentigem Stellverhalten, siehe [Ventilautorität](/wissen/ventilautoritaet).

## Welche Schaltung an welchen Verteiler

Der Verteiler und die Gruppen daran müssen zusammenpassen. **Am selben Verteiler nur Gruppen mit gleichem Verhalten**, also nicht mengenvariable und mengenkonstante Gruppen durcheinander.

| Verteiler                             | Passende Gruppen                           | Rücklauf | Typisch für                                |
| ------------------------------------- | ------------------------------------------ | -------- | ------------------------------------------ |
| Ohne Hauptpumpe                       | Beimischschaltungen                        | tief     | Brennwertkessel, Speicher                  |
| Mit Hauptpumpe, Volumenstrom variabel | Drossel, Einspritzung mit Durchgangsventil | tief     | Boilerladung, Nahwärmeverbund              |
| Mit Hauptpumpe, Volumenstrom konstant | Umlenkung, Einspritzung mit Dreiwegventil  | hoch     | Erzeuger mit Rücklauf-Mindesttemperatur    |
| Mit Hauptpumpe, druckdifferenzlos     | Beimischschaltungen                        | hoch     | klare Entkopplung von Erzeuger und Gruppen |

Wichtig für die Wahl ist der Erzeuger: Brennwertkessel, Wärmepumpen und Fernwärme wollen einen **tiefen Rücklauf**, ältere Kessel brauchen einen **Mindestrücklauf**, damit kein Kondensat entsteht.

**Energetisch** schneidet der Verteiler mit variablem Volumenstrom am besten ab: Er bezieht nur so viel Wasser, wie die Gruppen brauchen, und die Spreizung wächst bei Teillast. Verteiler mit konstantem Volumenstrom fördern dauernd den Nennvolumenstrom, bei kleiner Last kommt fast so warmes Wasser zurück, wie hinausging. Das kostet Pumpenstrom und Wärmeverluste. Verteiler mit Bypass ohne Druckdifferenz liegen dazwischen.

Ventile sind meist als **Mischventil** gebaut. Wer mit einem Dreiwegventil verteilen will (Umlenkschaltung), muss prüfen, ob es dafür zugelassen ist.

## Hinweise für die GA

- **Regelfühler nach der Pumpe**, nicht direkt nach dem Mischventil. Dort ist das Wasser durchmischt. Bei Beimischschaltungen nicht weiter als etwa 20 m vom Bypass.
- **Ventil nicht überdimensionieren.** Ein zu grosser kvs-Wert heisst schlechte [Ventilautorität](/wissen/ventilautoritaet): Das Ventil regelt nur im untersten Hub und schwingt. Ausprobieren lässt sich das im [Hydraulik-Simulator](/rechner/hydraulik-simulator).
- **Pumpe gegen geschlossenes Ventil** (Drossel, Einspritzung mit Durchgangsventil): Pumpe drehzahlgeregelt betreiben oder bei einer Ventilstellung unter etwa 2 % abschalten.
- **Frostschutz bei Lufterwärmern:** In Beimisch- und Einspritzschaltungen läuft die Verbraucherpumpe auch bei geschlossenem Ventil weiter, so bleibt das Register durchströmt. Die Pumpe darf deshalb im Frostfall nicht abgeschaltet werden.
- **Abgleichdrosseln** sitzen in den mengenkonstanten Teilen. Mit ihnen wird bei der Inbetriebnahme der Nennvolumenstrom eingestellt, siehe [Hydraulischer Abgleich](/wissen/hydraulischer-abgleich).

## Quellen

- Siemens Building Technologies: «Hydraulik in der Gebäudetechnik», Grundlagendokumentation
- Belimo: Auswahltabelle hydraulische Grundschaltungen
- Siemens Schweiz AG: «Einführung in die HLK- und Gebäudetechnik», Schulungsunterlage BT_0093, 2019, Kap. 5
- Siemens Schweiz AG: «Hydraulik in der Gebäudetechnik», Schulungsunterlage BT_0100, 2026

<!-- EN -->

Every heating or cooling group adjusts its output in one of two ways. Output is proportional to flow rate times temperature difference, so you change either the **flow rate** or the **temperature**. For each there are two basic circuits.

| Control type       | What changes                    | Basic circuits                        |
| ------------------ | ------------------------------- | ------------------------------------- |
| **Flow control**   | Flow rate, temperature constant | Throttling circuit, diverting circuit |
| **Mixing control** | Temperature, flow rate constant | Mixing circuit, injection circuit     |

Flow control is also called **variable volume**, mixing control **constant volume**. What decides the behaviour is the control valve (two-way or three-way) and **where the pump sits**.

<figure class="schema legende"><span class="leg vl">Flow from generator</span><span class="leg mix">Mixed flow</span><span class="leg rl">Return</span><figcaption>Colours in all diagrams of this article. T = control sensor, M = actuator.</figcaption></figure>

## 1 — Throttling Circuit

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Throttling circuit: pump in flow, two-way valve in return" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle cx="110" cy="45" r="9" class="bauteil bg"/><path d="M106 39L117 45L106 51Z" class="bauteil"/><path d="M213 118L213 132L227 118L227 132Z" class="bauteil bg"/><path d="M220 132V142" class="bauteil"/><rect x="213" y="142" width="14" height="12" class="bauteil bg"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M195 41L205 45L195 49Z" stroke-width="1"/><path class="rl fill" d="M155 121L145 125L155 129Z" stroke-width="1"/><path class="rl fill" d="M285 121L275 125L285 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="220" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text></g></svg><figcaption>Pump in the generator circuit, two-way valve in the return.</figcaption></figure>

The two-way valve changes the flow through the consumer **and** through the generator. Every valve movement changes the pressure conditions throughout the system.

- **Low return temperature** at part load
- Variable flow throughout the system
- Delayed on start-up until hot water reaches the consumer (dead time depending on pipe length)
- With the valve closed, the pump can overheat

**Use:** Air heaters without freezing risk, air coolers with dehumidification, cylinder and storage charging, district heating connections, systems with condensing boilers.

## 2 — Diverting Circuit

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Diverting circuit: bypass from flow to three-way valve in return" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="vl" d="M200 45L200 116" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle class="vl fill" cx="200" cy="45" r="3"/><circle cx="105" cy="45" r="9" class="bauteil bg"/><path d="M101 39L112 45L101 51Z" class="bauteil"/><path d="M191 119.5L191 130.5L200 125Z M209 119.5L209 130.5L200 125Z M194.5 116L205.5 116L200 125Z" class="bauteil bg"/><path d="M200 132V142" class="bauteil"/><rect x="193" y="142" width="14" height="12" class="bauteil bg"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M260 41L270 45L260 49Z" stroke-width="1"/><path class="vl fill" d="M196 80L200 90L204 80Z" stroke-width="1"/><path class="rl fill" d="M275 121L265 125L275 129Z" stroke-width="1"/><path class="rl fill" d="M135 121L125 125L135 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="200" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text><text x="207" y="88" text-anchor="start" font-size="12">Bypass</text></g></svg><figcaption>Bypass from the flow to the three-way valve in the return.</figcaption></figure>

The three-way valve splits the hot flow water between consumer and bypass. Depending on position, more or less flows through the consumer, while the flow through the generator stays the same. With the valve closed, the return reaches the generator at almost flow temperature.

- Variable flow through the consumer
- **Constant flow and pressure in the generator circuit**, an advantage with several groups
- Medium to high return temperature
- Fast response, provided the valve is close to the consumer

**Use:** Air coolers with dehumidification, air heaters without freezing risk, heat recovery, domestic hot water heating.
**Not suitable** for district heating: the high return temperature is unwanted there.

## 3 — Mixing Circuit

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Mixing circuit: three-way valve in flow, bypass from return, pump in consumer circuit" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L150 45" stroke-width="3"/><path class="mix" d="M150 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M150 125L150 54" stroke-width="3"/><circle class="rl fill" cx="150" cy="125" r="3"/><path d="M141 39.5L141 50.5L150 45Z M159 39.5L159 50.5L150 45Z M144.5 54L155.5 54L150 45Z" class="bauteil bg"/><path d="M150 38V28" class="bauteil"/><rect x="143" y="16" width="14" height="12" class="bauteil bg"/><circle cx="215" cy="45" r="9" class="bauteil bg"/><path d="M211 39L222 45L211 51Z" class="bauteil"/><path d="M258 45V30" class="bauteil" stroke-width="1"/><circle cx="258" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M268 118L268 132L282 118L282 132Z" class="bauteil bg"/><path d="M266 134L284 116M284 116l-6 1M284 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M95 41L105 45L95 49Z" stroke-width="1"/><path class="mix fill" d="M295 41L305 45L295 49Z" stroke-width="1"/><path class="rl fill" d="M146 95L150 85L154 95Z" stroke-width="1"/><path class="rl fill" d="M220 121L210 125L220 129Z" stroke-width="1"/><path class="rl fill" d="M105 121L95 125L105 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="150" y="25.5" text-anchor="middle" font-size="9.5">M</text><text x="258" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text><text x="157" y="93" text-anchor="start" font-size="12">Bypass</text><text x="104" y="174" text-anchor="middle" font-size="12">Generator circuit</text><text x="240" y="174" text-anchor="middle" font-size="12">Consumer circuit</text></g></svg><figcaption>Three-way valve in the flow, bypass from the return, pump in the consumer circuit.</figcaption></figure>

The three-way valve separates generator and consumer circuit. It mixes hot flow water with cooled return water from the bypass to produce the required flow temperature. The pump in the consumer circuit always delivers the same flow.

- Low return temperature at low load
- Variable flow in the generator circuit
- **Constant flow at variable temperature** in the consumer
- Even temperature distribution across the consumer, low freezing risk

**Use:** Radiator heating, air heaters with freezing risk, systems with low-temperature generators or heat pumps.
**Not suitable** where more than about 20 m lie between bypass and control sensor: the transport time makes the control loop sluggish.

## 4 — Mixing Circuit with Fixed Pre-Mix

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Mixing circuit with fixed pre-mix: additional bypass with balancing valve after the three-way valve" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L140 45" stroke-width="3"/><path class="mix" d="M140 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M140 125L140 54" stroke-width="3"/><path class="rl" d="M190 125L190 45" stroke-width="3"/><circle class="rl fill" cx="140" cy="125" r="3"/><circle class="rl fill" cx="190" cy="125" r="3"/><circle class="mix fill" cx="190" cy="45" r="3"/><path d="M131 39.5L131 50.5L140 45Z M149 39.5L149 50.5L140 45Z M134.5 54L145.5 54L140 45Z" class="bauteil bg"/><path d="M140 38V28" class="bauteil"/><rect x="133" y="16" width="14" height="12" class="bauteil bg"/><path d="M183 78L197 78L183 92L197 92Z" class="bauteil bg"/><path d="M181 94L199 76M199 76l-6 1M199 76l-1 6" class="bauteil"/><circle cx="235" cy="45" r="9" class="bauteil bg"/><path d="M231 39L242 45L231 51Z" class="bauteil"/><path d="M272 45V30" class="bauteil" stroke-width="1"/><circle cx="272" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M278 118L278 132L292 118L292 132Z" class="bauteil bg"/><path d="M276 134L294 116M294 116l-6 1M294 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M90 41L100 45L90 49Z" stroke-width="1"/><path class="mix fill" d="M300 41L310 45L300 49Z" stroke-width="1"/><path class="rl fill" d="M136 100L140 90L144 100Z" stroke-width="1"/><path class="rl fill" d="M186 115L190 105L194 115Z" stroke-width="1"/><path class="rl fill" d="M245 121L235 125L245 129Z" stroke-width="1"/><path class="rl fill" d="M100 121L90 125L100 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="140" y="25.5" text-anchor="middle" font-size="9.5">M</text><text x="272" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text><text x="205" y="70" text-anchor="start" font-size="12">fixed</text><text x="205" y="84" text-anchor="start" font-size="12">pre-mix</text><text x="99" y="174" text-anchor="middle" font-size="12">Generator circuit</text><text x="235" y="174" text-anchor="middle" font-size="12">Consumer circuit</text></g></svg><figcaption>Like the mixing circuit, plus a fixed bypass with balancing valve after the three-way valve.</figcaption></figure>

Here too a three-way valve controls. In addition, a fixed share of return water is always mixed in via the fixed bypass. This pays off when the consumer's flow temperature is well below the generator's, for example underfloor heating on a 70 °C boiler. Without pre-mixing, the valve would work only in the very bottom of its stroke and control poorly. With pre-mixing it uses the full stroke.

The circuit is also called a **double mixing circuit**. Properties and limits as for the mixing circuit.

**Use:** Consumers with a lower flow temperature than the generator: underfloor heating, radiators on high-temperature generators.

## 5 — Injection Circuit with Three-Way Valve

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Injection circuit with three-way valve: pump in both circuits, three-way valve in generator return, bypass without valve" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L205 45" stroke-width="3"/><path class="mix" d="M205 45L330 45L330 70" stroke-width="3"/><path class="vl" d="M145 45L145 116" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M205 125L205 45" stroke-width="3"/><circle class="vl fill" cx="145" cy="45" r="3"/><circle class="rl fill" cx="205" cy="125" r="3"/><circle class="mix fill" cx="205" cy="45" r="3"/><circle cx="82" cy="45" r="9" class="bauteil bg"/><path d="M78 39L89 45L78 51Z" class="bauteil"/><path d="M105 38L105 52L119 38L119 52Z" class="bauteil bg"/><path d="M103 54L121 36M121 36l-6 1M121 36l-1 6" class="bauteil"/><path d="M136 119.5L136 130.5L145 125Z M154 119.5L154 130.5L145 125Z M139.5 116L150.5 116L145 125Z" class="bauteil bg"/><path d="M145 132V142" class="bauteil"/><rect x="138" y="142" width="14" height="12" class="bauteil bg"/><circle cx="245" cy="45" r="9" class="bauteil bg"/><path d="M241 39L252 45L241 51Z" class="bauteil"/><path d="M280 45V30" class="bauteil" stroke-width="1"/><circle cx="280" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M283 118L283 132L297 118L297 132Z" class="bauteil bg"/><path d="M281 134L299 116M299 116l-6 1M299 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M170 41L180 45L170 49Z" stroke-width="1"/><path class="vl fill" d="M141 80L145 90L149 80Z" stroke-width="1"/><path class="rl fill" d="M201 95L205 85L209 95Z" stroke-width="1"/><path class="mix fill" d="M303 41L313 45L303 49Z" stroke-width="1"/><path class="rl fill" d="M255 121L245 125L255 129Z" stroke-width="1"/><path class="rl fill" d="M180 121L170 125L180 129Z" stroke-width="1"/><path class="rl fill" d="M105 121L95 125L105 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="145" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="280" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text><text x="211" y="93" text-anchor="start" font-size="12">Bypass</text><text x="131.5" y="174" text-anchor="middle" font-size="12">Generator circuit</text><text x="267.5" y="174" text-anchor="middle" font-size="12">Consumer circuit</text></g></svg><figcaption>Pump in both circuits. Three-way valve in the generator return, bypass without valve between the circuits.</figcaption></figure>

Depending on valve position, the generator pump injects more or less hot water into the consumer circuit. There it mixes with return water drawn through the bypass by the consumer pump. Whatever is not injected flows back to the generator through the primary bypass.

- **Constant flow in both circuits**
- Relatively high return temperature: at zero load equal to the generator flow
- Even temperature distribution, low freezing risk

**Use:** Radiator and underfloor heating, air heaters with freezing risk, air coolers without controlled dehumidification, cylinder charging.
**Not suitable** for district heating (high return temperature).

## 6 — Injection Circuit with Two-Way Valve

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Injection circuit with two-way valve: pump in both circuits, two-way valve in generator return, bypass without valve" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L205 45" stroke-width="3"/><path class="mix" d="M205 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><path class="rl" d="M205 125L205 45" stroke-width="3"/><circle class="rl fill" cx="205" cy="125" r="3"/><circle class="mix fill" cx="205" cy="45" r="3"/><circle cx="95" cy="45" r="9" class="bauteil bg"/><path d="M91 39L102 45L91 51Z" class="bauteil"/><path d="M133 118L133 132L147 118L147 132Z" class="bauteil bg"/><path d="M140 132V142" class="bauteil"/><rect x="133" y="142" width="14" height="12" class="bauteil bg"/><circle cx="245" cy="45" r="9" class="bauteil bg"/><path d="M241 39L252 45L241 51Z" class="bauteil"/><path d="M280 45V30" class="bauteil" stroke-width="1"/><circle cx="280" cy="23" r="7" class="bauteil bg" stroke-width="1.2"/><path d="M283 118L283 132L297 118L297 132Z" class="bauteil bg"/><path d="M281 134L299 116M299 116l-6 1M299 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M155 41L165 45L155 49Z" stroke-width="1"/><path class="rl fill" d="M201 95L205 85L209 95Z" stroke-width="1"/><path class="mix fill" d="M303 41L313 45L303 49Z" stroke-width="1"/><path class="rl fill" d="M255 121L245 125L255 129Z" stroke-width="1"/><path class="rl fill" d="M180 121L170 125L180 129Z" stroke-width="1"/><path class="rl fill" d="M100 121L90 125L100 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="140" y="151.5" text-anchor="middle" font-size="9.5">M</text><text x="280" y="26.5" text-anchor="middle" font-size="10">T</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text><text x="211" y="93" text-anchor="start" font-size="12">Bypass</text><text x="131.5" y="174" text-anchor="middle" font-size="12">Generator circuit</text><text x="267.5" y="174" text-anchor="middle" font-size="12">Consumer circuit</text></g></svg><figcaption>Pump in both circuits. Two-way valve in the generator return, bypass without valve.</figcaption></figure>

As above, but with a two-way instead of a three-way valve. Flow in the consumer circuit stays constant; in the generator circuit flow and pressure vary strongly. With several groups on the same header this has to be taken into account.

- **Low return temperature**, at most the consumer's return temperature
- Even temperature distribution, low freezing risk
- With the valve closed, the generator pump can overheat

**Use:** Thermal storage and heat pumps, condensing boilers, direct district heating connections.
**Not suitable** for air coolers with dehumidification control.

## Without a Control Valve: the Unmixed Heating Circuit

<figure class="schema"><svg class="hyd" viewBox="0 0 430 182" role="img" aria-label="Unmixed heating circuit: pump and balancing valve only, no control valve" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="110" rx="3" class="bauteil"/><path d="M14 90.5H58" class="bauteil"/><path class="vl" d="M58 45L330 45L330 70" stroke-width="3"/><path class="rl" d="M330 100L330 125L58 125" stroke-width="3"/><circle cx="150" cy="45" r="9" class="bauteil bg"/><path d="M146 39L157 45L146 51Z" class="bauteil"/><path d="M233 118L233 132L247 118L247 132Z" class="bauteil bg"/><path d="M231 134L249 116M249 116l-6 1M249 116l-1 6" class="bauteil"/><circle cx="330" cy="85" r="15" class="bauteil bg"/><circle cx="330" cy="85" r="10" class="bauteil"/><path class="vl fill" d="M235 41L245 45L235 49Z" stroke-width="1"/><path class="rl fill" d="M155 121L145 125L155 129Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="154" text-anchor="middle" font-size="12.5">Generator</text><text x="352" y="89" text-anchor="start" font-size="12.5">Consumer</text></g></svg><figcaption>Pump and balancing valve only, no control valve.</figcaption></figure>

Not every group has a control valve. In the **unmixed heating circuit** (also direct circuit or pump group) only a pump circulates. The flow temperature comes straight from the generator; output is set elsewhere:

- by the **generator's flow temperature**, for example weather-compensated boiler temperature
- by **switching the pump on and off**, for example for storage charging
- **at the consumer itself**: a thermostatic radiator valve is a throttling circuit in miniature

A variable-speed pump only adapts the delivery pressure to demand and saves electricity. It does not control the flow temperature.

An unmixed circuit can only be as warm as the generator. That is why, on the same boiler, underfloor heating always sits behind a mixing valve, whereas radiators are often connected directly.

## Comparison

| Circuit              | Valve     | Pump(s)           | Generator flow | Consumer flow | Return to generator | District heating |
| -------------------- | --------- | ----------------- | -------------- | ------------- | ------------------- | ---------------- |
| Throttling           | two-way   | generator circuit | variable       | variable      | low                 | ✓                |
| Diverting            | three-way | generator circuit | constant       | variable      | medium to high      | ✗                |
| Mixing               | three-way | consumer circuit  | variable       | constant      | low                 | —                |
| Mixing + pre-mix     | three-way | consumer circuit  | variable       | constant      | low                 | —                |
| Injection, three-way | three-way | both circuits     | constant       | constant      | high                | ✗                |
| Injection, two-way   | two-way   | both circuits     | variable       | constant      | low                 | ✓                |
| Unmixed              | none      | consumer circuit  | —              | constant      | as consumer         | —                |

**For new installations**, the diverting circuit and the injection circuit with three-way valve are today considered outdated. Siemens labels them so in the 2026 edition of its hydraulics training, as well as the constant-flow header. The reason is energy: the main pump moves the full flow all the time, and at part load the return comes back warm. Circuits with variable flow on the generator side are preferred, i.e. throttling and injection circuits with two-way valve, often with a pressure-independent valve (PICV). In existing plants the old circuits naturally stay in operation.

### With Pressure-Independent Valve (PICV)

Throttling and injection circuits can be built with a **PICV** instead of a normal two-way valve. It keeps the flow independent of pressure fluctuations in the network, limits it to the set maximum and so replaces the balancing valve. The pump must provide the PICV's minimum differential pressure. Air coolers and heaters need an actuator with equal-percentage behaviour, see [Valve Authority](/wissen/ventilautoritaet).

## Which Circuit on Which Header

The header and the groups on it must match. **Only groups with the same behaviour on one header**, i.e. do not mix variable-volume and constant-volume groups.

| Header                                   | Matching groups                           | Return | Typical for                                |
| ---------------------------------------- | ----------------------------------------- | ------ | ------------------------------------------ |
| Without main pump                        | Mixing circuits                           | low    | Condensing boilers, storage                |
| With main pump, variable flow            | Throttling, injection with two-way valve  | low    | Cylinder charging, local heating networks  |
| With main pump, constant flow            | Diverting, injection with three-way valve | high   | Generators with minimum return temperature |
| With main pump, no differential pressure | Mixing circuits                           | high   | Clear decoupling of generator and groups   |

The generator matters most: condensing boilers, heat pumps and district heating want a **low return**; older boilers need a **minimum return** to avoid condensation.

**In energy terms** the variable-flow header performs best: it draws only as much water as the groups need, and the temperature spread grows at part load. Constant-flow headers pump the design flow all the time; at low load the water returns almost as warm as it left. That costs pump power and heat losses. Headers with a bypass and no differential pressure lie in between.

Valves are usually built as **mixing valves**. Anyone diverting with a three-way valve (diverting circuit) must check that it is approved for that.

## Notes for BA

- **Control sensor after the pump**, not directly after the mixing valve. There the water is mixed. In mixing circuits, no further than about 20 m from the bypass.
- **Do not oversize the valve.** Too large a kvs means poor [valve authority](/wissen/ventilautoritaet): the valve controls only in the bottom of its stroke and oscillates. Try it in the [hydraulic simulator](/rechner/hydraulik-simulator).
- **Pump against a closed valve** (throttling, injection with two-way valve): run the pump at variable speed or switch it off below a valve position of about 2 %.
- **Frost protection for air heaters:** in mixing and injection circuits the consumer pump keeps running with the valve closed, so the coil stays flowed through. The pump must therefore not be switched off in a frost condition.
- **Balancing valves** sit in the constant-volume parts. They are used to set the design flow at commissioning, see [Hydraulic Balancing](/wissen/hydraulischer-abgleich).

## Sources

- Siemens Building Technologies: "Hydraulik in der Gebäudetechnik", fundamentals documentation
- Belimo: selection table of basic hydraulic circuits
- Siemens Schweiz AG: "Einführung in die HLK- und Gebäudetechnik", training document BT_0093, 2019, ch. 5
- Siemens Schweiz AG: "Hydraulik in der Gebäudetechnik", training document BT_0100, 2026
