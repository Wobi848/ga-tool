---
title: Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann
title_en: Hydraulic Circuits — Single-Pipe, Two-Pipe and Tichelmann
slug: hydraulische-schaltungen
category: hydraulik
subcategory: schaltungen
tags:
  [
    einrohr,
    zweirohr,
    tichelmann,
    bypass,
    hydraulik,
    heizkreis,
    heizverteilung,
    differenzdruck,
    volumenstrom,
    druckverlust,
    rücklauf,
    pumpe,
    strang
  ]
difficulty: fortgeschritten
area: [hlk, ga]
related:
  [hydraulischer-abgleich, motorventile, pid-regler, druckverlust, waermepumpe, ventil-schaltungen]
rechner: [hydraulik-simulator]
norm: [VDI 2035, EN 14336]
updated: 2026-05-14
lang: de
---

# Hydraulische Schaltungen — Einrohr, Zweirohr, Tichelmann

Die hydraulische Schaltung bestimmt wie Wärme (oder Kälte) vom Erzeuger zu den Verbrauchern gelangt. Falsch dimensionierte oder falsch gebaute Schaltungen sind die häufigste Ursache für unzufriedene Nutzer, überhöhten Energieverbrauch und endlose Inbetriebnahme-Probleme.

## Einrohrheizung

### Prinzip

Alle Heizkörper liegen **in Reihe** auf einem gemeinsamen Rohr:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 192" role="img" aria-label="Einrohrheizung: alle Heizkörper hängen am selben Ringrohr" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="40" width="44" height="130" rx="3" class="bauteil"/><path d="M14 111.5H58" class="bauteil"/><path class="vl" d="M58 140L106 140" stroke-width="3"/><path class="vl" d="M106 140L134 140" stroke-width="3"/><path class="mix" d="M106 140L186 140" stroke-width="3"/><path class="mix" d="M186 140L214 140" stroke-width="3"/><path class="mix" d="M186 140L266 140" stroke-width="3"/><path class="mix" d="M266 140L294 140" stroke-width="3"/><path class="mix" d="M266 140L346 140" stroke-width="3"/><path class="mix" d="M346 140L374 140" stroke-width="3"/><path class="vl" d="M58 140L106 140" stroke-width="3"/><path class="vl" d="M106 140L106 108" stroke-width="3"/><path class="mix" d="M134 108L134 140" stroke-width="3"/><path class="mix" d="M134 140L186 140" stroke-width="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 115L113 115L99 129L113 129Z" class="bauteil bg"/><circle class="vl fill" cx="106" cy="140" r="3"/><circle class="mix fill" cx="134" cy="140" r="3"/><path class="mix" d="M186 140L186 108" stroke-width="3"/><path class="mix" d="M214 108L214 140" stroke-width="3"/><path class="mix" d="M214 140L266 140" stroke-width="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 115L193 115L179 129L193 129Z" class="bauteil bg"/><circle class="mix fill" cx="186" cy="140" r="3"/><circle class="mix fill" cx="214" cy="140" r="3"/><path class="mix" d="M266 140L266 108" stroke-width="3"/><path class="mix" d="M294 108L294 140" stroke-width="3"/><path class="mix" d="M294 140L346 140" stroke-width="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 115L273 115L259 129L273 129Z" class="bauteil bg"/><circle class="mix fill" cx="266" cy="140" r="3"/><circle class="mix fill" cx="294" cy="140" r="3"/><path class="mix" d="M346 140L346 108" stroke-width="3"/><path class="rl" d="M374 108L374 140" stroke-width="3"/><path class="rl" d="M374 140L400 140" stroke-width="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 115L353 115L339 129L353 129Z" class="bauteil bg"/><circle class="mix fill" cx="346" cy="140" r="3"/><circle class="rl fill" cx="374" cy="140" r="3"/><path class="rl" d="M400 140L400 172L58 172" stroke-width="3"/><path class="vl fill" d="M75 136L85 140L75 144Z" stroke-width="1"/><path class="rl fill" d="M235 168L225 172L235 176Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="184" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="120" y="76" text-anchor="middle" font-size="11">HK1</text><text x="200" y="76" text-anchor="middle" font-size="11">HK2</text><text x="280" y="76" text-anchor="middle" font-size="11">HK3</text><text x="360" y="76" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>Ein Rohr für alle: jeder Heizkörper bekommt kälteres Wasser als der vorherige.</figcaption></figure>

Das Wasser fliesst durch jeden Heizkörper (oder am Bypass vorbei), kühlt sich dabei ab und gelangt mit niedrigerer Temperatur zum nächsten Heizkörper.

### Eigenschaften

| Eigenschaft        | Einrohr                                       |
| ------------------ | --------------------------------------------- |
| Verrohrungsaufwand | Gering (ein Rohr)                             |
| Temperaturgefälle  | Jeder nachfolgende HK bekommt kälteres Wasser |
| Regelbarkeit       | Schlecht (HK am Ende schwer regelbar)         |
| Hydraul. Abgleich  | Sehr aufwendig, Bypass-Einstellung kritisch   |
| Einsatz heute      | Kaum noch neu eingebaut                       |

### Bypass-Funktion

Ohne Bypass: Ventil geschlossen → Heizkreis unterbrochen → keine Zirkulation für nachfolgende HK.
Mit Bypass: Auch bei geschlossenem Ventil fliesst Wasser am HK vorbei → Zirkulation bleibt aufrecht.

**Problem:** Der Bypass schafft einen Kurzschluss. Dimensionierung ist kritisch — zu viel Bypass = kaum Durchfluss durch HK; zu wenig = kein Ausgleich.

> ⚠️ Einrohrsysteme eignen sich **nicht** für grosse Temperaturunterschiede zwischen den Heizkörpern und sind heute kaum noch Stand der Technik. Im Altbaubestand jedoch sehr häufig anzutreffen.

---

## Zweirohrheizung

### Prinzip

Vorlauf und Rücklauf laufen **parallel** zu allen Heizkörpern:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 192" role="img" aria-label="Zweirohrheizung: Vorlauf und Rücklauf getrennt, Rücklauf direkt zurück zum Erzeuger" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="140" rx="3" class="bauteil"/><path d="M14 107H58" class="bauteil"/><path class="vl" d="M58 40L346 40" stroke-width="3"/><path class="rl" d="M374 160L58 160" stroke-width="3"/><path class="vl" d="M106 40L106 82" stroke-width="3"/><path class="rl" d="M134 108L134 160" stroke-width="3"/><circle class="vl fill" cx="106" cy="40" r="3"/><circle class="rl fill" cx="134" cy="160" r="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 55L113 55L99 69L113 69Z" class="bauteil bg"/><path class="vl" d="M186 40L186 82" stroke-width="3"/><path class="rl" d="M214 108L214 160" stroke-width="3"/><circle class="vl fill" cx="186" cy="40" r="3"/><circle class="rl fill" cx="214" cy="160" r="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 55L193 55L179 69L193 69Z" class="bauteil bg"/><path class="vl" d="M266 40L266 82" stroke-width="3"/><path class="rl" d="M294 108L294 160" stroke-width="3"/><circle class="vl fill" cx="266" cy="40" r="3"/><circle class="rl fill" cx="294" cy="160" r="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 55L273 55L259 69L273 69Z" class="bauteil bg"/><path class="vl" d="M346 40L346 82" stroke-width="3"/><path class="rl" d="M374 108L374 160" stroke-width="3"/><circle class="vl fill" cx="346" cy="40" r="3"/><circle class="rl fill" cx="374" cy="160" r="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 55L353 55L339 69L353 69Z" class="bauteil bg"/><path class="vl fill" d="M85 36L95 40L85 44Z" stroke-width="1"/><path class="rl fill" d="M95 156L85 160L95 164Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="184" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="120" y="124" text-anchor="middle" font-size="11">HK1</text><text x="200" y="124" text-anchor="middle" font-size="11">HK2</text><text x="280" y="124" text-anchor="middle" font-size="11">HK3</text><text x="360" y="124" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>Kurzer Weg für HK1, langer für HK4. Ohne Abgleich bekommt HK1 zu viel.</figcaption></figure>

Jeder Heizkörper bekommt **dieselbe Vorlauftemperatur** direkt vom Erzeuger. Das Rücklaufwasser misch sich im Rücklaufstrang.

### Eigenschaften

| Eigenschaft        | Zweirohr                              |
| ------------------ | ------------------------------------- |
| Verrohrungsaufwand | Höher (zwei Rohre)                    |
| Temperatur je HK   | Identisch (Vorlauftemperatur)         |
| Regelbarkeit       | Gut (jeder HK unabhängig regelbar)    |
| Hydraul. Abgleich  | Notwendig (Stränge verschieden lang!) |
| Einsatz heute      | Standard für alle neuen Anlagen       |

### Hydraulisches Problem Zweirohr

**Nahgelegene HK** haben deutlich weniger Widerstand als weit entfernte → bekommen überproportional viel Durchfluss → überwärmt, während entfernte HK zu wenig bekommen.

Lösung: Hydraulischer Abgleich (Voreinstellventile, Differenzdruckregler).

---

## Tichelmann-Schaltung

### Prinzip

Auch **umgekehrte Rücklaufführung** genannt. Der Rücklauf beginnt beim ersten Heizkörper und läuft in Fliessrichtung des Vorlaufs weiter bis zum letzten. Erst dort kehrt er zum Erzeuger zurück.

<figure class="schema"><svg class="hyd" viewBox="0 0 430 212" role="img" aria-label="Tichelmann-Schaltung: der Rücklauf läuft in Fliessrichtung des Vorlaufs weiter und kehrt erst am Ende zurück" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="160" rx="3" class="bauteil"/><path d="M14 118H58" class="bauteil"/><path class="vl" d="M58 40L346 40" stroke-width="3"/><path class="rl" d="M134 150L400 150L400 180L58 180" stroke-width="3"/><path class="vl" d="M106 40L106 82" stroke-width="3"/><path class="rl" d="M134 108L134 150" stroke-width="3"/><circle class="vl fill" cx="106" cy="40" r="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 55L113 55L99 69L113 69Z" class="bauteil bg"/><path class="vl" d="M186 40L186 82" stroke-width="3"/><path class="rl" d="M214 108L214 150" stroke-width="3"/><circle class="vl fill" cx="186" cy="40" r="3"/><circle class="rl fill" cx="214" cy="150" r="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 55L193 55L179 69L193 69Z" class="bauteil bg"/><path class="vl" d="M266 40L266 82" stroke-width="3"/><path class="rl" d="M294 108L294 150" stroke-width="3"/><circle class="vl fill" cx="266" cy="40" r="3"/><circle class="rl fill" cx="294" cy="150" r="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 55L273 55L259 69L273 69Z" class="bauteil bg"/><path class="vl" d="M346 40L346 82" stroke-width="3"/><path class="rl" d="M374 108L374 150" stroke-width="3"/><circle class="vl fill" cx="346" cy="40" r="3"/><circle class="rl fill" cx="374" cy="150" r="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 55L353 55L339 69L353 69Z" class="bauteil bg"/><path class="vl fill" d="M85 36L95 40L85 44Z" stroke-width="1"/><path class="rl fill" d="M165 146L175 150L165 154Z" stroke-width="1"/><path class="rl fill" d="M325 146L335 150L325 154Z" stroke-width="1"/><path class="rl fill" d="M235 176L225 180L235 184Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="204" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="120" y="124" text-anchor="middle" font-size="11">HK1</text><text x="200" y="124" text-anchor="middle" font-size="11">HK2</text><text x="280" y="124" text-anchor="middle" font-size="11">HK3</text><text x="360" y="124" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>Wer zuerst Vorlauf bekommt, hat den längsten Rücklauf. Alle Wege sind gleich lang.</figcaption></figure>

Die Idee: Der HK mit dem kürzesten Vorlauf hat den längsten Rücklauf — und umgekehrt. Damit ist der **Gesamtdruckverlust für jeden HK gleich** (Vorlauf + Rücklauf).

### Eigenschaften

| Eigenschaft        | Tichelmann                                                  |
| ------------------ | ----------------------------------------------------------- |
| Verrohrungsaufwand | Höher als Zweirohr (längerer Rücklauf)                      |
| Selbstabgleich     | Nahezu selbstabgleichend (Druckverluste gleich)             |
| Hydraul. Abgleich  | Reduzierter Aufwand nötig                                   |
| Einsatz            | Fussbodenheizung, Flächenheizungen, grosse parallele Kreise |

### Wann Tichelmann?

- Viele gleichartige parallele Verbraucher (z.B. FBH-Kreise, Solarkollektor-Felder, Deckenkühlkreise)
- Wenn Leitungsführung die Rücklaufverlängerung nicht teurer macht als die Abgleich-Armaturen
- Nicht sinnvoll wenn Verbraucher sehr unterschiedliche Druckverlusteigenschaften haben

---

## Bypass-Schaltungen

### Pumpenbetrieb-Bypass

<figure class="schema"><svg class="hyd" viewBox="0 0 430 175" role="img" aria-label="Differenzdruck-Überströmventil zwischen Vorlauf und Rücklauf nach der Pumpe" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="25" width="44" height="120" rx="3" class="bauteil"/><path d="M14 91H58" class="bauteil"/><path class="vl" d="M58 40L380 40" stroke-width="3"/><path class="rl" d="M380 130L58 130" stroke-width="3"/><circle cx="90" cy="40" r="9" class="bauteil bg"/><path d="M86 34L97 40L86 46Z" class="bauteil"/><path class="vl" d="M140 40L140 78" stroke-width="3"/><path class="rl" d="M140 92L140 130" stroke-width="3"/><circle class="vl fill" cx="140" cy="40" r="3"/><circle class="rl fill" cx="140" cy="130" r="3"/><path d="M133 78L147 78L133 92L147 92Z" class="bauteil bg"/><path class="vl" d="M285 40L285 86" stroke-width="3"/><path class="rl" d="M285 100L285 130" stroke-width="3"/><circle class="vl fill" cx="285" cy="40" r="3"/><circle class="rl fill" cx="285" cy="130" r="3"/><path d="M278 63L292 63L278 77L292 77Z" class="bauteil bg"/><path d="M278 70H268" class="bauteil"/><rect x="254" y="64" width="14" height="12" class="bauteil bg"/><rect x="265" y="86" width="40" height="14" rx="3" class="bauteil bg"/><path class="vl" d="M370 40L370 86" stroke-width="3"/><path class="rl" d="M370 100L370 130" stroke-width="3"/><circle class="vl fill" cx="370" cy="40" r="3"/><circle class="rl fill" cx="370" cy="130" r="3"/><path d="M363 63L377 63L363 77L377 77Z" class="bauteil bg"/><path d="M363 70H353" class="bauteil"/><rect x="339" y="64" width="14" height="12" class="bauteil bg"/><rect x="350" y="86" width="40" height="14" rx="3" class="bauteil bg"/><path class="vl fill" d="M215 36L225 40L215 44Z" stroke-width="1"/><path class="rl fill" d="M225 126L215 130L225 134Z" stroke-width="1"/><path class="vl fill" d="M136 55L140 65L144 55Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="159" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="152" y="82" text-anchor="start" font-size="11">Überströmventil</text><text x="152" y="95" text-anchor="start" font-size="11">Δp</text><text x="261" y="73.5" text-anchor="middle" font-size="9.5">M</text><text x="285" y="96" text-anchor="middle" font-size="9">HK</text><text x="346" y="73.5" text-anchor="middle" font-size="9.5">M</text><text x="370" y="96" text-anchor="middle" font-size="9">HK</text></g></svg><figcaption>Das Überströmventil öffnet, wenn der Differenzdruck steigt, weil die Ventile der Verbraucher schliessen.</figcaption></figure>

Regelt den Differenzdruck wenn Verbraucher schliessen → verhindert Druckspitzen, schützt Pumpe.

### Erzeuger-Bypass (hydraulische Entkopplung)

**Vor-/Rücklaufverbindung mit Bypass zwischen Erzeugerkreis und Verteilerkreis:**

<figure class="schema"><svg class="hyd" viewBox="0 0 430 190" role="img" aria-label="Hydraulische Weiche zwischen Erzeugerkreis und zwei Gruppen mit eigenen Pumpen" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="130" rx="3" class="bauteil"/><path d="M14 101.5H58" class="bauteil"/><path class="vl" d="M58 45L138 45" stroke-width="3"/><path class="rl" d="M138 145L58 145" stroke-width="3"/><circle cx="95" cy="45" r="9" class="bauteil bg"/><path d="M91 39L102 45L91 51Z" class="bauteil"/><path class="vl" d="M162 45L400 45" stroke-width="3"/><path class="rl" d="M400 145L162 145" stroke-width="3"/><rect x="138" y="30" width="24" height="130" rx="3" class="bauteil bg"/><circle class="vl fill" cx="238" cy="45" r="3"/><circle class="rl fill" cx="262" cy="145" r="3"/><path class="vl" d="M238 45L238 85" stroke-width="3"/><path class="rl" d="M262 110L262 145" stroke-width="3"/><circle cx="238" cy="70" r="9" class="bauteil bg"/><path d="M232 66L238 77L244 66Z" class="bauteil"/><rect x="226" y="85" width="48" height="25" rx="3" class="bauteil bg"/><circle class="vl fill" cx="338" cy="45" r="3"/><circle class="rl fill" cx="362" cy="145" r="3"/><path class="vl" d="M338 45L338 85" stroke-width="3"/><path class="rl" d="M362 110L362 145" stroke-width="3"/><circle cx="338" cy="70" r="9" class="bauteil bg"/><path d="M332 66L338 77L344 66Z" class="bauteil"/><rect x="326" y="85" width="48" height="25" rx="3" class="bauteil bg"/><path class="vl fill" d="M115 41L125 45L115 49Z" stroke-width="1"/><path class="rl fill" d="M125 141L115 145L125 149Z" stroke-width="1"/><path class="vl fill" d="M195 41L205 45L195 49Z" stroke-width="1"/><path class="rl fill" d="M205 141L195 145L205 149Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="174" text-anchor="middle" font-size="12.5">Erzeuger</text><text x="150" y="98" text-anchor="middle" font-size="9"></text><text x="250" y="100.83333333333333" text-anchor="middle" font-size="10">Gruppe 1</text><text x="350" y="100.83333333333333" text-anchor="middle" font-size="10">Gruppe 2</text><text x="150" y="178" text-anchor="middle" font-size="11">Weiche</text><text x="95" y="22" text-anchor="middle" font-size="10.5">Erzeugerpumpe</text><text x="300" y="22" text-anchor="middle" font-size="10.5">Gruppenpumpen</text></g></svg><figcaption>Die Weiche entkoppelt: Erzeugerpumpe und Gruppenpumpen stören sich nicht gegenseitig.</figcaption></figure>

**Zweck:** Primär- und Sekundärkreis hydraulisch entkoppeln → jeder Kreis hat eigene Pumpe, eigene Regelung. Wichtig bei Wärmepumpen (Mindestdurchfluss sicherstellen!).

### Bypass bei Wärmepumpe

Wärmepumpen haben einen **Mindestvolumenstrom** (sonst Abschaltung wegen Durchflussüberwachung oder Frostschutz):

Öffnet wenn alle Heizkreis-Ventile schliessen → Mindestdurchfluss durch WP gewährleistet.

---

## Vergleich auf einen Blick

| Schaltung  | Verrohrung | Abgleich    | Gleichmässigkeit | Typischer Einsatz        |
| ---------- | ---------- | ----------- | ---------------- | ------------------------ |
| Einrohr    | Einfach    | Aufwendig   | Schlecht         | Altbau (Bestand)         |
| Zweirohr   | Mittel     | Nötig       | Gut              | Neubau Standard          |
| Tichelmann | Aufwendig  | Minimal     | Sehr gut         | FBH, Kollektoren, Decken |
| Mit Bypass | +Armatur   | Regelventil | —                | Mindestdurchfluss, Entk. |

---

## Typische Fehler in der Praxis

| Fehler                          | Symptom                                  | Ursache                                     |
| ------------------------------- | ---------------------------------------- | ------------------------------------------- |
| Zu langer Einrohrkreis          | Heizkörper am Ende kalt                  | Zu viel Temperaturgefälle                   |
| Bypass zu offen (Einrohr)       | Heizleistung zu tief                     | Kurzschluss — Wasser fliesst nicht durch HK |
| Zweirohr ohne Abgleich          | Nah-HK überhitzen, fern-HK kalt          | Druckdifferenz nicht kompensiert            |
| Tichelmann falsch dimensioniert | Trotzdem ungleichmässig                  | HK haben unterschiedliche Widerstände       |
| Fehlendes Überströmventil (WP)  | WP schaltet bei geschlossenen Kreisen ab | Kein Mindestvolumenstrom                    |

## Normen

- **VDI 2035** — Vermeidung von Schäden in Warmwasser-Heizungsanlagen
- **EN 14336** — Installation und Abnahme Heizungsanlagen in Gebäuden
- **SIA 384.201** — Heizungsanlagen in Gebäuden (Schweizer Norm)

<!-- EN -->

# Hydraulic Circuits — Single-Pipe, Two-Pipe and Tichelmann

The hydraulic circuit determines how heat (or cold) travels from the generator to the consumers. Incorrectly designed or built circuits are the most common cause of dissatisfied users, excessive energy consumption and endless commissioning problems.

## Single-Pipe System

### Principle

All radiators are connected **in series** on a single shared pipe:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 192" role="img" aria-label="One-pipe system: all radiators on the same loop" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="40" width="44" height="130" rx="3" class="bauteil"/><path d="M14 111.5H58" class="bauteil"/><path class="vl" d="M58 140L106 140" stroke-width="3"/><path class="vl" d="M106 140L134 140" stroke-width="3"/><path class="mix" d="M106 140L186 140" stroke-width="3"/><path class="mix" d="M186 140L214 140" stroke-width="3"/><path class="mix" d="M186 140L266 140" stroke-width="3"/><path class="mix" d="M266 140L294 140" stroke-width="3"/><path class="mix" d="M266 140L346 140" stroke-width="3"/><path class="mix" d="M346 140L374 140" stroke-width="3"/><path class="vl" d="M58 140L106 140" stroke-width="3"/><path class="vl" d="M106 140L106 108" stroke-width="3"/><path class="mix" d="M134 108L134 140" stroke-width="3"/><path class="mix" d="M134 140L186 140" stroke-width="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 115L113 115L99 129L113 129Z" class="bauteil bg"/><circle class="vl fill" cx="106" cy="140" r="3"/><circle class="mix fill" cx="134" cy="140" r="3"/><path class="mix" d="M186 140L186 108" stroke-width="3"/><path class="mix" d="M214 108L214 140" stroke-width="3"/><path class="mix" d="M214 140L266 140" stroke-width="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 115L193 115L179 129L193 129Z" class="bauteil bg"/><circle class="mix fill" cx="186" cy="140" r="3"/><circle class="mix fill" cx="214" cy="140" r="3"/><path class="mix" d="M266 140L266 108" stroke-width="3"/><path class="mix" d="M294 108L294 140" stroke-width="3"/><path class="mix" d="M294 140L346 140" stroke-width="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 115L273 115L259 129L273 129Z" class="bauteil bg"/><circle class="mix fill" cx="266" cy="140" r="3"/><circle class="mix fill" cx="294" cy="140" r="3"/><path class="mix" d="M346 140L346 108" stroke-width="3"/><path class="rl" d="M374 108L374 140" stroke-width="3"/><path class="rl" d="M374 140L400 140" stroke-width="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 115L353 115L339 129L353 129Z" class="bauteil bg"/><circle class="mix fill" cx="346" cy="140" r="3"/><circle class="rl fill" cx="374" cy="140" r="3"/><path class="rl" d="M400 140L400 172L58 172" stroke-width="3"/><path class="vl fill" d="M75 136L85 140L75 144Z" stroke-width="1"/><path class="rl fill" d="M235 168L225 172L235 176Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="184" text-anchor="middle" font-size="12.5">Generator</text><text x="120" y="76" text-anchor="middle" font-size="11">HK1</text><text x="200" y="76" text-anchor="middle" font-size="11">HK2</text><text x="280" y="76" text-anchor="middle" font-size="11">HK3</text><text x="360" y="76" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>One pipe for all: each radiator gets cooler water than the one before.</figcaption></figure>

Water flows through each radiator (or bypasses it), cools down, and reaches the next radiator at a lower temperature.

### Characteristics

| Property             | Single-Pipe                                |
| -------------------- | ------------------------------------------ |
| Piping effort        | Low (one pipe)                             |
| Temperature gradient | Each downstream radiator gets cooler water |
| Controllability      | Poor (last radiators hard to control)      |
| Hydraulic balancing  | Very complex, bypass setting critical      |
| Use today            | Rarely installed new                       |

### Bypass Function

Without bypass: valve closed → heating circuit interrupted → no flow for downstream radiators.
With bypass: even with valve closed, water flows past the radiator → circulation is maintained.

**Problem:** The bypass creates a short-circuit. Sizing is critical — too much bypass = minimal flow through radiator; too little = no compensation.

> ⚠️ Single-pipe systems are **not** suitable for large temperature differences between radiators and are rarely current practice. However, still very common in existing older buildings.

---

## Two-Pipe System

### Principle

Flow and return run **in parallel** to all radiators:

<figure class="schema"><svg class="hyd" viewBox="0 0 430 192" role="img" aria-label="Two-pipe system: separate flow and return, return straight back to the generator" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="140" rx="3" class="bauteil"/><path d="M14 107H58" class="bauteil"/><path class="vl" d="M58 40L346 40" stroke-width="3"/><path class="rl" d="M374 160L58 160" stroke-width="3"/><path class="vl" d="M106 40L106 82" stroke-width="3"/><path class="rl" d="M134 108L134 160" stroke-width="3"/><circle class="vl fill" cx="106" cy="40" r="3"/><circle class="rl fill" cx="134" cy="160" r="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 55L113 55L99 69L113 69Z" class="bauteil bg"/><path class="vl" d="M186 40L186 82" stroke-width="3"/><path class="rl" d="M214 108L214 160" stroke-width="3"/><circle class="vl fill" cx="186" cy="40" r="3"/><circle class="rl fill" cx="214" cy="160" r="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 55L193 55L179 69L193 69Z" class="bauteil bg"/><path class="vl" d="M266 40L266 82" stroke-width="3"/><path class="rl" d="M294 108L294 160" stroke-width="3"/><circle class="vl fill" cx="266" cy="40" r="3"/><circle class="rl fill" cx="294" cy="160" r="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 55L273 55L259 69L273 69Z" class="bauteil bg"/><path class="vl" d="M346 40L346 82" stroke-width="3"/><path class="rl" d="M374 108L374 160" stroke-width="3"/><circle class="vl fill" cx="346" cy="40" r="3"/><circle class="rl fill" cx="374" cy="160" r="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 55L353 55L339 69L353 69Z" class="bauteil bg"/><path class="vl fill" d="M85 36L95 40L85 44Z" stroke-width="1"/><path class="rl fill" d="M95 156L85 160L95 164Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="184" text-anchor="middle" font-size="12.5">Generator</text><text x="120" y="124" text-anchor="middle" font-size="11">HK1</text><text x="200" y="124" text-anchor="middle" font-size="11">HK2</text><text x="280" y="124" text-anchor="middle" font-size="11">HK3</text><text x="360" y="124" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>Short path for HK1, long for HK4. Without balancing, HK1 gets too much.</figcaption></figure>

Every radiator receives **the same flow temperature** directly from the generator. Return water mixes in the return manifold.

### Characteristics

| Property                 | Two-Pipe                                        |
| ------------------------ | ----------------------------------------------- |
| Piping effort            | Higher (two pipes)                              |
| Temperature per radiator | Identical (flow temperature)                    |
| Controllability          | Good (each radiator independently controllable) |
| Hydraulic balancing      | Necessary (branches of different lengths!)      |
| Use today                | Standard for all new installations              |

### Hydraulic Problem — Two-Pipe

**Nearby radiators** have significantly less resistance than distant ones → receive disproportionately more flow → overheat, while distant radiators receive too little.

Solution: Hydraulic balancing (pre-setting valves, differential pressure controllers).

---

## Tichelmann Circuit

### Principle

Also called **reverse return**. The return starts at the first radiator and runs on in the direction of the flow to the last one. Only there does it turn back to the generator.

<figure class="schema"><svg class="hyd" viewBox="0 0 430 212" role="img" aria-label="Reverse-return system: the return runs on in the direction of the flow and only turns back at the end" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="160" rx="3" class="bauteil"/><path d="M14 118H58" class="bauteil"/><path class="vl" d="M58 40L346 40" stroke-width="3"/><path class="rl" d="M134 150L400 150L400 180L58 180" stroke-width="3"/><path class="vl" d="M106 40L106 82" stroke-width="3"/><path class="rl" d="M134 108L134 150" stroke-width="3"/><circle class="vl fill" cx="106" cy="40" r="3"/><rect x="98" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M105.33333333333333 85V105M112.66666666666667 85V105M120 85V105M127.33333333333333 85V105M134.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M99 55L113 55L99 69L113 69Z" class="bauteil bg"/><path class="vl" d="M186 40L186 82" stroke-width="3"/><path class="rl" d="M214 108L214 150" stroke-width="3"/><circle class="vl fill" cx="186" cy="40" r="3"/><circle class="rl fill" cx="214" cy="150" r="3"/><rect x="178" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M185.33333333333334 85V105M192.66666666666666 85V105M200 85V105M207.33333333333334 85V105M214.66666666666666 85V105" class="bauteil" stroke-width="1"/><path d="M179 55L193 55L179 69L193 69Z" class="bauteil bg"/><path class="vl" d="M266 40L266 82" stroke-width="3"/><path class="rl" d="M294 108L294 150" stroke-width="3"/><circle class="vl fill" cx="266" cy="40" r="3"/><circle class="rl fill" cx="294" cy="150" r="3"/><rect x="258" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M265.3333333333333 85V105M272.6666666666667 85V105M280 85V105M287.3333333333333 85V105M294.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M259 55L273 55L259 69L273 69Z" class="bauteil bg"/><path class="vl" d="M346 40L346 82" stroke-width="3"/><path class="rl" d="M374 108L374 150" stroke-width="3"/><circle class="vl fill" cx="346" cy="40" r="3"/><circle class="rl fill" cx="374" cy="150" r="3"/><rect x="338" y="82" width="44" height="26" rx="2" class="bauteil bg"/><path d="M345.3333333333333 85V105M352.6666666666667 85V105M360 85V105M367.3333333333333 85V105M374.6666666666667 85V105" class="bauteil" stroke-width="1"/><path d="M339 55L353 55L339 69L353 69Z" class="bauteil bg"/><path class="vl fill" d="M85 36L95 40L85 44Z" stroke-width="1"/><path class="rl fill" d="M165 146L175 150L165 154Z" stroke-width="1"/><path class="rl fill" d="M325 146L335 150L325 154Z" stroke-width="1"/><path class="rl fill" d="M235 176L225 180L235 184Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="204" text-anchor="middle" font-size="12.5">Generator</text><text x="120" y="124" text-anchor="middle" font-size="11">HK1</text><text x="200" y="124" text-anchor="middle" font-size="11">HK2</text><text x="280" y="124" text-anchor="middle" font-size="11">HK3</text><text x="360" y="124" text-anchor="middle" font-size="11">HK4</text></g></svg><figcaption>First on the flow, longest on the return. All paths are equally long.</figcaption></figure>

The idea: the radiator with the shortest flow pipe has the longest return — and vice versa. This means the **total pressure drop is equal for every radiator** (flow + return).

### Characteristics

| Property            | Tichelmann                                                   |
| ------------------- | ------------------------------------------------------------ |
| Piping effort       | Higher than two-pipe (longer return)                         |
| Self-balancing      | Nearly self-balancing (equal pressure drops)                 |
| Hydraulic balancing | Reduced effort required                                      |
| Applications        | Underfloor heating, surface heating, large parallel circuits |

### When to Use Tichelmann?

- Many similar parallel consumers (e.g. UFH circuits, solar collector fields, chilled ceiling circuits)
- When pipe routing makes the return extension cheaper than balancing valves
- Not suitable when consumers have very different pressure drop characteristics

---

## Bypass Circuits

### Pump Differential Pressure Bypass

<figure class="schema"><svg class="hyd" viewBox="0 0 430 175" role="img" aria-label="Differential pressure bypass valve between flow and return after the pump" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="25" width="44" height="120" rx="3" class="bauteil"/><path d="M14 91H58" class="bauteil"/><path class="vl" d="M58 40L380 40" stroke-width="3"/><path class="rl" d="M380 130L58 130" stroke-width="3"/><circle cx="90" cy="40" r="9" class="bauteil bg"/><path d="M86 34L97 40L86 46Z" class="bauteil"/><path class="vl" d="M140 40L140 78" stroke-width="3"/><path class="rl" d="M140 92L140 130" stroke-width="3"/><circle class="vl fill" cx="140" cy="40" r="3"/><circle class="rl fill" cx="140" cy="130" r="3"/><path d="M133 78L147 78L133 92L147 92Z" class="bauteil bg"/><path class="vl" d="M285 40L285 86" stroke-width="3"/><path class="rl" d="M285 100L285 130" stroke-width="3"/><circle class="vl fill" cx="285" cy="40" r="3"/><circle class="rl fill" cx="285" cy="130" r="3"/><path d="M278 63L292 63L278 77L292 77Z" class="bauteil bg"/><path d="M278 70H268" class="bauteil"/><rect x="254" y="64" width="14" height="12" class="bauteil bg"/><rect x="265" y="86" width="40" height="14" rx="3" class="bauteil bg"/><path class="vl" d="M370 40L370 86" stroke-width="3"/><path class="rl" d="M370 100L370 130" stroke-width="3"/><circle class="vl fill" cx="370" cy="40" r="3"/><circle class="rl fill" cx="370" cy="130" r="3"/><path d="M363 63L377 63L363 77L377 77Z" class="bauteil bg"/><path d="M363 70H353" class="bauteil"/><rect x="339" y="64" width="14" height="12" class="bauteil bg"/><rect x="350" y="86" width="40" height="14" rx="3" class="bauteil bg"/><path class="vl fill" d="M215 36L225 40L215 44Z" stroke-width="1"/><path class="rl fill" d="M225 126L215 130L225 134Z" stroke-width="1"/><path class="vl fill" d="M136 55L140 65L144 55Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="159" text-anchor="middle" font-size="12.5">Generator</text><text x="152" y="82" text-anchor="start" font-size="11">Bypass valve</text><text x="152" y="95" text-anchor="start" font-size="11">Δp</text><text x="261" y="73.5" text-anchor="middle" font-size="9.5">M</text><text x="285" y="96" text-anchor="middle" font-size="9">Load</text><text x="346" y="73.5" text-anchor="middle" font-size="9.5">M</text><text x="370" y="96" text-anchor="middle" font-size="9">Load</text></g></svg><figcaption>The bypass valve opens when the differential pressure rises because the consumer valves close.</figcaption></figure>

Controls differential pressure when consumers close → prevents pressure spikes, protects pump.

### Generator Bypass (Hydraulic Decoupling)

**Flow/return connection with bypass between primary and secondary circuit:**

<figure class="schema"><svg class="hyd" viewBox="0 0 430 190" role="img" aria-label="Low-loss header between generator circuit and two groups with their own pumps" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="14" y="30" width="44" height="130" rx="3" class="bauteil"/><path d="M14 101.5H58" class="bauteil"/><path class="vl" d="M58 45L138 45" stroke-width="3"/><path class="rl" d="M138 145L58 145" stroke-width="3"/><circle cx="95" cy="45" r="9" class="bauteil bg"/><path d="M91 39L102 45L91 51Z" class="bauteil"/><path class="vl" d="M162 45L400 45" stroke-width="3"/><path class="rl" d="M400 145L162 145" stroke-width="3"/><rect x="138" y="30" width="24" height="130" rx="3" class="bauteil bg"/><circle class="vl fill" cx="238" cy="45" r="3"/><circle class="rl fill" cx="262" cy="145" r="3"/><path class="vl" d="M238 45L238 85" stroke-width="3"/><path class="rl" d="M262 110L262 145" stroke-width="3"/><circle cx="238" cy="70" r="9" class="bauteil bg"/><path d="M232 66L238 77L244 66Z" class="bauteil"/><rect x="226" y="85" width="48" height="25" rx="3" class="bauteil bg"/><circle class="vl fill" cx="338" cy="45" r="3"/><circle class="rl fill" cx="362" cy="145" r="3"/><path class="vl" d="M338 45L338 85" stroke-width="3"/><path class="rl" d="M362 110L362 145" stroke-width="3"/><circle cx="338" cy="70" r="9" class="bauteil bg"/><path d="M332 66L338 77L344 66Z" class="bauteil"/><rect x="326" y="85" width="48" height="25" rx="3" class="bauteil bg"/><path class="vl fill" d="M115 41L125 45L115 49Z" stroke-width="1"/><path class="rl fill" d="M125 141L115 145L125 149Z" stroke-width="1"/><path class="vl fill" d="M195 41L205 45L195 49Z" stroke-width="1"/><path class="rl fill" d="M205 141L195 145L205 149Z" stroke-width="1"/><g fill="currentColor" stroke="none"><text x="36" y="174" text-anchor="middle" font-size="12.5">Generator</text><text x="150" y="98" text-anchor="middle" font-size="9"></text><text x="250" y="100.83333333333333" text-anchor="middle" font-size="10">Group 1</text><text x="350" y="100.83333333333333" text-anchor="middle" font-size="10">Group 2</text><text x="150" y="178" text-anchor="middle" font-size="11">Low-loss header</text><text x="95" y="22" text-anchor="middle" font-size="10.5">Generator pump</text><text x="300" y="22" text-anchor="middle" font-size="10.5">Group pumps</text></g></svg><figcaption>The low-loss header decouples: generator pump and group pumps do not interfere with each other.</figcaption></figure>

**Purpose:** Hydraulically decouple primary and secondary circuits → each circuit has its own pump, own control. Critical for heat pumps (ensure minimum flow!).

### Bypass for Heat Pumps

Heat pumps have a **minimum volume flow** requirement (otherwise shutdown via pressure switch or frost protection):

Opens when all heating circuit valves close → ensures minimum flow through HP.

---

## Quick Comparison

| Circuit     | Piping  | Balancing     | Uniformity | Typical Use               |
| ----------- | ------- | ------------- | ---------- | ------------------------- |
| Single-pipe | Simple  | Complex       | Poor       | Existing buildings        |
| Two-pipe    | Medium  | Required      | Good       | New build standard        |
| Tichelmann  | Complex | Minimal       | Very good  | UFH, collectors, ceilings |
| With bypass | +valve  | Control valve | —          | Min. flow, decoupling     |

---

## Typical Field Faults

| Fault                         | Symptom                                     | Cause                                   |
| ----------------------------- | ------------------------------------------- | --------------------------------------- |
| Single-pipe circuit too long  | Radiators at end cold                       | Excessive temperature drop              |
| Bypass too open (single-pipe) | Too little heat output                      | Short-circuit — water bypasses radiator |
| Two-pipe without balancing    | Near radiators overheat, far radiators cold | Pressure difference not compensated     |
| Tichelmann incorrectly sized  | Still uneven                                | Radiators have different resistances    |
| Missing overflow valve (HP)   | HP shuts off when circuits close            | No minimum volume flow                  |

## Standards

- **VDI 2035** — Prevention of damage in hot water heating systems
- **EN 14336** — Installation and commissioning of heating systems in buildings
- **SIA 384.201** — Heating systems in buildings (Swiss standard)
