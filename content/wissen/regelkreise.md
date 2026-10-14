---
title: Regelkreise — Grundlagen und Totzeit
title_en: Control Loops — Fundamentals and Dead Time
slug: regelkreise
category: regelung
subcategory: grundlagen
tags:
  [
    regelkreis,
    totzeit,
    sprungantwort,
    verzugszeit,
    ausgleichszeit,
    pt1,
    strecke,
    störgrösse,
    regelbarkeit
  ]
difficulty: grundlagen
area: [ga, hlk]
related:
  [pid-regler, steuern-regeln, kaskadenregelung, vorsteuerung-aufschaltung, zweipunktregelung]
rechner: [pid-simulator]
norm: [IEC 60050-351]
updated: 2026-10-14
lang: de
---

# Regelkreise — Grundlagen und Totzeit

Ein Regelkreis misst eine Grösse, vergleicht sie mit dem Sollwert und stellt so lange nach, bis beide übereinstimmen. Wie gut das klappt, hängt weniger vom Regler ab als von der **Strecke**, also davon, wie schnell und wie verzögert die Anlage auf einen Stellbefehl reagiert.

## Elemente des Regelkreises

<figure class="schema"><svg viewBox="0 0 600 200" role="img" aria-label="Regelkreis: Sollwert w, Vergleich, Regler, Stellglied, Strecke, Regelgrösse x und Rückführung über das Messglied" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M34 92L80 92"/><path d="M80 92L72.0 96.0L72.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="92" cy="92" r="10"/><path d="M85.0 85.0L99.0 99.0M85.0 99.0L99.0 85.0" stroke-width="1.2"/><path d="M102 92L140 92"/><path d="M140 92L132.0 96.0L132.0 88.0Z" fill="currentColor" stroke="none"/><rect x="140" y="68" width="100" height="48" rx="6"/><path d="M240 92L280 92"/><path d="M280 92L272.0 96.0L272.0 88.0Z" fill="currentColor" stroke="none"/><rect x="280" y="68" width="100" height="48" rx="6"/><path d="M380 92L420 92"/><path d="M420 92L412.0 96.0L412.0 88.0Z" fill="currentColor" stroke="none"/><rect x="420" y="68" width="100" height="48" rx="6"/><path d="M470 22L470 68"/><path d="M470 68L466.0 60.0L474.0 60.0Z" fill="currentColor" stroke="none"/><path d="M520 92L588 92"/><path d="M588 92L580.0 96.0L580.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="556" cy="92" r="3" fill="currentColor"/><path d="M556 92L556 168L380 168"/><path d="M380 168L388.0 164.0L388.0 172.0Z" fill="currentColor" stroke="none"/><rect x="280" y="146" width="100" height="44" rx="6"/><path d="M280 168L92 168L92 102"/><path d="M92 102L96.0 110.0L88.0 110.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="14" y="96" text-anchor="start" font-size="12" font-weight="600">w</text><text x="83" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="121" y="84" text-anchor="middle" font-size="12" font-style="italic">e</text><text x="190.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Regler</text><text x="260" y="84" text-anchor="middle" font-size="12" font-style="italic">y</text><text x="330.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Stellglied</text><text x="470.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Strecke</text><text x="478" y="30" text-anchor="start" font-size="11.5">Störgrösse z</text><text x="586" y="84" text-anchor="end" font-size="12" font-style="italic">x</text><text x="330.0" y="172.0" text-anchor="middle" font-size="12.5" font-weight="600">Messglied</text></g></svg><figcaption>Geschlossener Regelkreis: Der Regler vergleicht den Sollwert w mit dem gemessenen Istwert x und stellt über das Stellglied nach. Störgrössen z wirken auf die Strecke.</figcaption></figure>

| Element              | Bedeutung                              | Beispiel Raumheizung             |
| -------------------- | -------------------------------------- | -------------------------------- |
| **Führungsgrösse w** | Sollwert                               | 22 °C                            |
| **Regelgrösse x**    | Istwert, die geregelte Grösse          | gemessene Raumtemperatur 20 °C   |
| **Regeldifferenz e** | e = w − x                              | 2 K                              |
| **Regler**           | rechnet aus e die Stellgrösse          | PI-Regler in der DDC             |
| **Stellgrösse y**    | Ausgang des Reglers                    | 0–10 V                           |
| **Stellglied**       | setzt y in eine Wirkung um             | Ventil mit Antrieb               |
| **Strecke**          | der Teil der Anlage, der geregelt wird | Heizkörper und Raum              |
| **Störgrösse z**     | Einfluss von aussen                    | Sonne, offenes Fenster, Personen |
| **Messglied**        | erfasst x                              | Pt1000 im Raumfühler             |

Die Formelzeichen folgen IEC 60050-351, früher DIN 19226.

## Wie Strecken reagieren

| Strecke        | Verhalten nach einem Sprung der Stellgrösse           | Beispiel                                       |
| -------------- | ----------------------------------------------------- | ---------------------------------------------- |
| **P**          | folgt sofort, ohne Verzögerung                        | Ventilhub zu Volumenstrom, fast                |
| **PT1**        | steigt sofort an und nähert sich dem Endwert          | Lufttemperatur nach einem Elektro-Lufterhitzer |
| **Totzeit Tt** | reagiert zuerst gar nicht, dann genau wie der Eingang | Wasser, das durch ein langes Rohr fliesst      |
| **I**          | steigt ohne Ende, solange y nicht null ist            | Füllstand, Speicher ohne Verluste              |
| **PTn**        | S-förmig, mehrere Verzögerungen hintereinander        | fast jede HLK-Strecke                          |

Bei PT1 ist die **Zeitkonstante T** die Zeit, nach der 63 % des Endwerts erreicht sind. Nach 3 T sind es 95 %.

In der Praxis sind fast alle Strecken der GA von der Art PTn mit etwas Totzeit. Man beschreibt sie dann mit der **Sprungantwort**.

## Sprungantwort, Tu und Tg

<figure class="schema"><svg viewBox="0 0 560 240" role="img" aria-label="Sprungantwort einer Strecke mit Wendetangente, Verzugszeit Tu und Ausgleichszeit Tg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M50 200L540 200"/><path d="M540 200L532.0 204.0L532.0 196.0Z" fill="currentColor" stroke="none"/><path d="M50 200L50 25"/><path d="M50 25L54.0 33.0L46.0 33.0Z" fill="currentColor" stroke="none"/><path d="M50.0 200L50.0 50L530.0 50" stroke-dasharray="5 4"/><path d="M50.0 200L54.0 200.0L58.0 199.8L62.0 199.5L66.0 198.8L70.0 197.8L74.0 196.5L78.0 194.9L82.0 192.9L86.0 190.6L90.0 188.0L94.0 185.1L98.0 181.9L102.0 178.6L106.0 175.0L110.0 171.3L114.0 167.5L118.0 163.6L122.0 159.6L126.0 155.6L130.0 151.5L134.0 147.4L138.0 143.4L142.0 139.4L146.0 135.5L150.0 131.6L154.0 127.8L158.0 124.0L162.0 120.4L166.0 116.9L170.0 113.5L174.0 110.2L178.0 107.0L182.0 103.9L186.0 101.0L190.0 98.1L194.0 95.4L198.0 92.8L202.0 90.3L206.0 88.0L210.0 85.7L214.0 83.6L218.0 81.5L222.0 79.6L226.0 77.8L230.0 76.0L234.0 74.4L238.0 72.8L242.0 71.4L246.0 70.0L250.0 68.7L254.0 67.5L258.0 66.3L262.0 65.2L266.0 64.2L270.0 63.3L274.0 62.4L278.0 61.5L282.0 60.7L286.0 60.0L290.0 59.3L294.0 58.6L298.0 58.0L302.0 57.5L306.0 56.9L310.0 56.5L314.0 56.0L318.0 55.6L322.0 55.2L326.0 54.8L330.0 54.4L334.0 54.1L338.0 53.8L342.0 53.5L346.0 53.3L350.0 53.0L354.0 52.8L358.0 52.6L362.0 52.4L366.0 52.2L370.0 52.1L374.0 51.9L378.0 51.8L382.0 51.6L386.0 51.5L390.0 51.4L394.0 51.3L398.0 51.2L402.0 51.1L406.0 51.0L410.0 50.9L414.0 50.9L418.0 50.8L422.0 50.7L426.0 50.7L430.0 50.6L434.0 50.6L438.0 50.5L442.0 50.5L446.0 50.5L450.0 50.4L454.0 50.4L458.0 50.4L462.0 50.3L466.0 50.3L470.0 50.3L474.0 50.3L478.0 50.2L482.0 50.2L486.0 50.2L490.0 50.2L494.0 50.2L498.0 50.2L502.0 50.1L506.0 50.1L510.0 50.1L514.0 50.1L518.0 50.1L522.0 50.1L526.0 50.1L530.0 50.1" stroke-width="2.4"/><path d="M82.21887802138701 200L230.0 50"/><circle cx="130.0" cy="151.50146242745953" r="3" fill="currentColor"/><path d="M50.0 200L50.0 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M82.2 200L82.2 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M230.0 200L230.0 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M52.0 222L81.21887802138701 222"/><path d="M81.21887802138701 222L73.2 226.0L73.2 218.0Z" fill="currentColor" stroke="none"/><path d="M81.21887802138701 222L52.0 222"/><path d="M52.0 222L60.0 218.0L60.0 226.0Z" fill="currentColor" stroke="none"/><path d="M84.21887802138701 222L229.0 222"/><path d="M229.0 222L221.0 226.0L221.0 218.0Z" fill="currentColor" stroke="none"/><path d="M229.0 222L84.21887802138701 222"/><path d="M84.21887802138701 222L92.2 218.0L92.2 226.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="540" y="216" text-anchor="end" font-size="12" font-style="italic">t</text><text x="528.0" y="44" text-anchor="end" font-size="10.5">Stellgrösse y, Sprung</text><text x="66.1094390106935" y="217" text-anchor="middle" font-size="11.5" font-weight="600">Tu</text><text x="156.1094390106935" y="217" text-anchor="middle" font-size="11.5" font-weight="600">Tg</text><text x="138.0" y="155.50146242745953" text-anchor="start" font-size="10.5">Wendepunkt</text><text x="44" y="54" text-anchor="end" font-size="10">100 %</text><text x="44" y="204" text-anchor="end" font-size="10">0</text><text x="330.0" y="72.44542458207826" text-anchor="start" font-size="10.5">Regelgrösse x</text></g></svg><figcaption>Sprungantwort: Die Tangente im Wendepunkt schneidet die Nulllinie nach der Verzugszeit Tu und den Endwert nach weiteren Tg. Je kleiner Tu/Tg, desto leichter ist die Strecke zu regeln.</figcaption></figure>

So nimmt man die Sprungantwort auf:

1. Regler auf Handbetrieb, Stellgrösse fest, zum Beispiel 30 %
2. Warten, bis die Regelgrösse ruhig ist
3. Stellgrösse in einem Schritt ändern, zum Beispiel auf 60 %
4. Regelgrösse aufzeichnen, bis sie wieder ruhig ist. Die Trendaufzeichnung der GLT reicht dafür.
5. Wendetangente einzeichnen und **Tu**, **Tg** und die Streckenverstärkung **Ks** ablesen. Ks ist die Änderung von x geteilt durch die Änderung von y.

Mit diesen Werten liefern Verfahren wie das von **Chien, Hrones und Reswick** Startwerte für Xp und Tn. Störungen während der Messung, etwa Sonne oder ein zweiter Regelkreis, verfälschen das Ergebnis.

## Regelbarkeit

Das Verhältnis Tu/Tg sagt, wie leicht eine Strecke zu regeln ist:

| Tu / Tg   | Regelbarkeit | Bedeutung                                                  |
| --------- | ------------ | ---------------------------------------------------------- |
| unter 0.1 | gut          | PI-Regler lässt sich zügig einstellen                      |
| 0.1 – 0.3 | mittel       | PI mit Vorsicht, eventuell Vorsteuerung                    |
| über 0.3  | schwierig    | Regler muss langsam sein; Kaskade oder Vorsteuerung prüfen |

Entscheidend ist das Verhältnis, nicht die absolute Grösse. Eine Fussbodenheizung ist sehr langsam, aber nicht unbedingt schlecht regelbar.

## Wo Totzeit und Verzögerung herkommen

| Ursache                                  | Art         | Grössenordnung                                          |
| ---------------------------------------- | ----------- | ------------------------------------------------------- |
| Wasser fliesst vom Ventil zum Fühler     | Totzeit     | Sekunden bis Minuten, je nach Länge und Geschwindigkeit |
| Luft strömt vom Register zum Kanalfühler | Totzeit     | wenige Sekunden                                         |
| Tauchhülse und Fühler erwärmen sich      | Verzögerung | 10 s bis 2 min                                          |
| Wärmetauscher, Lufterhitzer              | Verzögerung | 1 bis 5 min                                             |
| Estrich einer Fussbodenheizung           | Verzögerung | mehrere Stunden                                         |
| Raum mit Möbeln und Wänden               | Verzögerung | 30 min bis Stunden                                      |
| Messwertfilter in der DDC                | Verzögerung | so viel, wie man einstellt                              |

**Fühler gehören nahe an das Stellglied**, wo es der Prozess erlaubt. Ein Vorlauffühler zwei Meter hinter dem Mischventil regelt besser als einer im Verteiler zwanzig Meter weiter. Jede Sekunde Totzeit muss der Regler mit Langsamkeit bezahlen.

## Beispiel Fussbodenheizung

Der Raumregler einer Fussbodenheizung sieht eine Strecke mit Tu von rund einer Stunde und Tg von mehreren Stunden. Das Verhältnis ist nicht schlecht, aber jede Korrektur dauert Stunden. Ein schneller Regler würde überschwingen.

Deshalb macht bei Fussbodenheizungen die **witterungsgeführte Vorlauftemperatur** den Grossteil der Arbeit. Der Raumregler korrigiert nur noch wenig und mit langer Nachstellzeit. Dazu kommt der **Selbstregeleffekt**: Ist der Raum zu warm, sinkt der Temperaturunterschied zwischen Boden und Raum und damit die Wärmeabgabe von selbst.

## Normen

- **IEC 60050-351** — Internationales Elektrotechnisches Wörterbuch, Leittechnik. In Deutschland als DIN IEC 60050-351, früher DIN 19226.

<!-- EN -->

A control loop measures a variable, compares it with the setpoint and keeps acting until both agree. How well this works depends less on the controller than on the **process**, that is, on how fast and with how much delay the plant responds to a command.

## Elements of the Control Loop

<figure class="schema"><svg viewBox="0 0 600 200" role="img" aria-label="Control loop: setpoint w, comparison, controller, actuator, process, controlled variable x and feedback through the sensor" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M34 92L80 92"/><path d="M80 92L72.0 96.0L72.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="92" cy="92" r="10"/><path d="M85.0 85.0L99.0 99.0M85.0 99.0L99.0 85.0" stroke-width="1.2"/><path d="M102 92L140 92"/><path d="M140 92L132.0 96.0L132.0 88.0Z" fill="currentColor" stroke="none"/><rect x="140" y="68" width="100" height="48" rx="6"/><path d="M240 92L280 92"/><path d="M280 92L272.0 96.0L272.0 88.0Z" fill="currentColor" stroke="none"/><rect x="280" y="68" width="100" height="48" rx="6"/><path d="M380 92L420 92"/><path d="M420 92L412.0 96.0L412.0 88.0Z" fill="currentColor" stroke="none"/><rect x="420" y="68" width="100" height="48" rx="6"/><path d="M470 22L470 68"/><path d="M470 68L466.0 60.0L474.0 60.0Z" fill="currentColor" stroke="none"/><path d="M520 92L588 92"/><path d="M588 92L580.0 96.0L580.0 88.0Z" fill="currentColor" stroke="none"/><circle cx="556" cy="92" r="3" fill="currentColor"/><path d="M556 92L556 168L380 168"/><path d="M380 168L388.0 164.0L388.0 172.0Z" fill="currentColor" stroke="none"/><rect x="280" y="146" width="100" height="44" rx="6"/><path d="M280 168L92 168L92 102"/><path d="M92 102L96.0 110.0L88.0 110.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="14" y="96" text-anchor="start" font-size="12" font-weight="600">w</text><text x="83" y="114" text-anchor="middle" font-size="13" font-weight="700">−</text><text x="121" y="84" text-anchor="middle" font-size="12" font-style="italic">e</text><text x="190.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Controller</text><text x="260" y="84" text-anchor="middle" font-size="12" font-style="italic">y</text><text x="330.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Actuator</text><text x="470.0" y="96.0" text-anchor="middle" font-size="12.5" font-weight="600">Process</text><text x="478" y="30" text-anchor="start" font-size="11.5">Disturbance z</text><text x="586" y="84" text-anchor="end" font-size="12" font-style="italic">x</text><text x="330.0" y="172.0" text-anchor="middle" font-size="12.5" font-weight="600">Sensor</text></g></svg><figcaption>Closed control loop: the controller compares the setpoint w with the measured value x and acts through the actuator. Disturbances z act on the process.</figcaption></figure>

| Element                   | Meaning                                     | Example room heating            |
| ------------------------- | ------------------------------------------- | ------------------------------- |
| **Setpoint w**            | reference value                             | 22 °C                           |
| **Controlled variable x** | actual value, the variable being controlled | measured room temperature 20 °C |
| **Control error e**       | e = w − x                                   | 2 K                             |
| **Controller**            | calculates the output from e                | PI controller in the DDC        |
| **Output y**              | controller output                           | 0–10 V                          |
| **Actuator**              | turns y into an effect                      | valve with actuator             |
| **Process**               | the part of the plant being controlled      | radiator and room               |
| **Disturbance z**         | outside influence                           | sun, open window, people        |
| **Sensor**                | measures x                                  | Pt1000 in the room sensor       |

The symbols follow IEC 60050-351, formerly DIN 19226.

## How Processes Respond

| Process          | Behaviour after a step in the output                     | Example                                      |
| ---------------- | -------------------------------------------------------- | -------------------------------------------- |
| **P**            | follows immediately, without delay                       | valve stroke to flow rate, nearly            |
| **PT1**          | starts rising immediately and approaches the final value | air temperature after an electric air heater |
| **Dead time Tt** | does not respond at first, then exactly like the input   | water flowing through a long pipe            |
| **I**            | rises without limit as long as y is not zero             | level, storage without losses                |
| **PTn**          | S-shaped, several lags in series                         | almost every HVAC process                    |

For PT1 the **time constant T** is the time to reach 63 % of the final value. After 3 T it is 95 %.

In practice almost all BA processes are of type PTn with some dead time. They are then described by the **step response**.

## Step Response, Tu and Tg

<figure class="schema"><svg viewBox="0 0 560 240" role="img" aria-label="Step response of a process with inflection tangent, delay time Tu and equalisation time Tg" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M50 200L540 200"/><path d="M540 200L532.0 204.0L532.0 196.0Z" fill="currentColor" stroke="none"/><path d="M50 200L50 25"/><path d="M50 25L54.0 33.0L46.0 33.0Z" fill="currentColor" stroke="none"/><path d="M50.0 200L50.0 50L530.0 50" stroke-dasharray="5 4"/><path d="M50.0 200L54.0 200.0L58.0 199.8L62.0 199.5L66.0 198.8L70.0 197.8L74.0 196.5L78.0 194.9L82.0 192.9L86.0 190.6L90.0 188.0L94.0 185.1L98.0 181.9L102.0 178.6L106.0 175.0L110.0 171.3L114.0 167.5L118.0 163.6L122.0 159.6L126.0 155.6L130.0 151.5L134.0 147.4L138.0 143.4L142.0 139.4L146.0 135.5L150.0 131.6L154.0 127.8L158.0 124.0L162.0 120.4L166.0 116.9L170.0 113.5L174.0 110.2L178.0 107.0L182.0 103.9L186.0 101.0L190.0 98.1L194.0 95.4L198.0 92.8L202.0 90.3L206.0 88.0L210.0 85.7L214.0 83.6L218.0 81.5L222.0 79.6L226.0 77.8L230.0 76.0L234.0 74.4L238.0 72.8L242.0 71.4L246.0 70.0L250.0 68.7L254.0 67.5L258.0 66.3L262.0 65.2L266.0 64.2L270.0 63.3L274.0 62.4L278.0 61.5L282.0 60.7L286.0 60.0L290.0 59.3L294.0 58.6L298.0 58.0L302.0 57.5L306.0 56.9L310.0 56.5L314.0 56.0L318.0 55.6L322.0 55.2L326.0 54.8L330.0 54.4L334.0 54.1L338.0 53.8L342.0 53.5L346.0 53.3L350.0 53.0L354.0 52.8L358.0 52.6L362.0 52.4L366.0 52.2L370.0 52.1L374.0 51.9L378.0 51.8L382.0 51.6L386.0 51.5L390.0 51.4L394.0 51.3L398.0 51.2L402.0 51.1L406.0 51.0L410.0 50.9L414.0 50.9L418.0 50.8L422.0 50.7L426.0 50.7L430.0 50.6L434.0 50.6L438.0 50.5L442.0 50.5L446.0 50.5L450.0 50.4L454.0 50.4L458.0 50.4L462.0 50.3L466.0 50.3L470.0 50.3L474.0 50.3L478.0 50.2L482.0 50.2L486.0 50.2L490.0 50.2L494.0 50.2L498.0 50.2L502.0 50.1L506.0 50.1L510.0 50.1L514.0 50.1L518.0 50.1L522.0 50.1L526.0 50.1L530.0 50.1" stroke-width="2.4"/><path d="M82.21887802138701 200L230.0 50"/><circle cx="130.0" cy="151.50146242745953" r="3" fill="currentColor"/><path d="M50.0 200L50.0 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M82.2 200L82.2 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M230.0 200L230.0 226" stroke-dasharray="2 3" stroke-width="1"/><path d="M52.0 222L81.21887802138701 222"/><path d="M81.21887802138701 222L73.2 226.0L73.2 218.0Z" fill="currentColor" stroke="none"/><path d="M81.21887802138701 222L52.0 222"/><path d="M52.0 222L60.0 218.0L60.0 226.0Z" fill="currentColor" stroke="none"/><path d="M84.21887802138701 222L229.0 222"/><path d="M229.0 222L221.0 226.0L221.0 218.0Z" fill="currentColor" stroke="none"/><path d="M229.0 222L84.21887802138701 222"/><path d="M84.21887802138701 222L92.2 218.0L92.2 226.0Z" fill="currentColor" stroke="none"/><g fill="currentColor" stroke="none"><text x="540" y="216" text-anchor="end" font-size="12" font-style="italic">t</text><text x="528.0" y="44" text-anchor="end" font-size="10.5">Output y, step</text><text x="66.1094390106935" y="217" text-anchor="middle" font-size="11.5" font-weight="600">Tu</text><text x="156.1094390106935" y="217" text-anchor="middle" font-size="11.5" font-weight="600">Tg</text><text x="138.0" y="155.50146242745953" text-anchor="start" font-size="10.5">inflection point</text><text x="44" y="54" text-anchor="end" font-size="10">100 %</text><text x="44" y="204" text-anchor="end" font-size="10">0</text><text x="330.0" y="72.44542458207826" text-anchor="start" font-size="10.5">Controlled variable x</text></g></svg><figcaption>Step response: the tangent at the inflection point meets the zero line after the delay time Tu and the final value after a further Tg. The smaller Tu/Tg, the easier the process is to control.</figcaption></figure>

How to record the step response:

1. Controller to manual, output fixed, for example 30 %
2. Wait until the controlled variable is steady
3. Change the output in one step, for example to 60 %
4. Record the controlled variable until it is steady again. The BMS trend log is enough.
5. Draw the inflection tangent and read **Tu**, **Tg** and the process gain **Ks**. Ks is the change in x divided by the change in y.

With these values, methods such as that of **Chien, Hrones and Reswick** give starting values for Xp and Tn. Disturbances during the measurement, such as sun or a second control loop, distort the result.

## Controllability

The ratio Tu/Tg tells how easy a process is to control:

| Tu / Tg   | Controllability | Meaning                                                  |
| --------- | --------------- | -------------------------------------------------------- |
| below 0.1 | good            | PI controller can be tuned briskly                       |
| 0.1 – 0.3 | moderate        | PI with care, possibly feedforward                       |
| above 0.3 | difficult       | controller must be slow; consider cascade or feedforward |

The ratio matters, not the absolute size. Underfloor heating is very slow but not necessarily hard to control.

## Where Dead Time and Lag Come From

| Cause                              | Kind      | Order of magnitude                                   |
| ---------------------------------- | --------- | ---------------------------------------------------- |
| Water flows from valve to sensor   | dead time | seconds to minutes, depending on length and velocity |
| Air flows from coil to duct sensor | dead time | a few seconds                                        |
| Sensor well and sensor heat up     | lag       | 10 s to 2 min                                        |
| Heat exchanger, air heater         | lag       | 1 to 5 min                                           |
| Screed of underfloor heating       | lag       | several hours                                        |
| Room with furniture and walls      | lag       | 30 min to hours                                      |
| Measurement filter in the DDC      | lag       | as much as you set                                   |

**Sensors belong close to the actuator** where the process allows. A flow sensor two metres after the mixing valve controls better than one in the header twenty metres away. Every second of dead time must be paid for with a slower controller.

## Example Underfloor Heating

The room controller of an underfloor heating system sees a process with Tu of about an hour and Tg of several hours. The ratio is not bad, but every correction takes hours. A fast controller would overshoot.

That is why with underfloor heating the **weather-compensated flow temperature** does most of the work. The room controller only corrects a little, with a long integral time. On top of that comes the **self-regulating effect**: if the room is too warm, the temperature difference between floor and room shrinks, and with it the heat output, all by itself.

## Standards

- **IEC 60050-351** — International Electrotechnical Vocabulary, control technology. In Germany DIN IEC 60050-351, formerly DIN 19226.
