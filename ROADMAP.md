# Roadmap

Stand 13.09.2026, Version 0.10.1. Die erste Ausbaustufe ist fertig und läuft auf
CT 102: Nachschlagen, Rechnen, Offline. Was jetzt kommt, steht in
[docs/KONZEPT-OBJEKTE.md](docs/KONZEPT-OBJEKTE.md) — aus dem Nachschlagewerk
soll ein Arbeitsgerät werden.

Die Reihenfolge folgt einer Regel: **jede Stufe ist für sich nützlich.** Wenn
nach Stufe 1 Schluss ist, hat das Tool trotzdem etwas gewonnen.

---

## Stufe 1 — Objekte und mehrere Durchläufe

> Das eigentliche Problem: dieselbe Checkliste lässt sich nur einmal führen.

- [x] Datenmodell `Objekt`, `Anlage`, `Durchlauf` — zunächst **lokal**
- [x] `/objekte` — Liste, anlegen, umbenennen, archivieren
- [x] `/objekte/[id]` — Anlagen und Durchläufe des Objekts
- [x] Checklisten-Detailseite arbeitet auf einem **Durchlauf** statt auf der
      Vorlage; alte `ga-cl-*`-Stände werden einmalig übernommen
- [x] «Als neuen Durchlauf starten» aus einer Vorlage heraus
- [x] Fortschritt je Durchlauf in der Objektübersicht

**Erledigt, wenn:** dieselbe IBN-Checkliste für drei Anlagen nebeneinander läuft,
ohne dass sich die Stände mischen — und ein vorhandener `localStorage`-Stand
beim ersten Start nicht verloren geht.

_Ohne diese Stufe ergibt keine der folgenden Sinn._

**Warum zuerst lokal und nicht gleich auf dem Server:** heute wird im
`localStorage` gespeichert, also auch im Funkloch. Ginge Stufe 1 direkt auf den
Server, wäre das ein Rückschritt — im Technikraum liesse sich nichts mehr
abhaken. Der Server kommt in Stufe 2 als Spiegel dazu, nicht als Ersatz.

---

## Stufe 2 — Auf dem Server, nicht nur im Browser

> Auf dem Telefon abgehakt, am Laptop weiterschreiben.

- [x] Tabellen `objekt`, `anlage`, `durchlauf` samt Migration
- [x] `/api/objekte` — GET und POST statt vier Verben je Entität, mit Eigentumsprüfung
- [x] Durchläufe im selben Aufruf — der Client führt keine Änderungsliste, ein Abgleich genügt
- [x] Lokal sofort schreiben, dann zum Server — die Eingabe wartet nie auf das
      Netz
- [x] Beim Laden abgleichen, jüngerer `geaendertAm` gewinnt je Datensatz
- [x] Anzeige, wann zuletzt abgeglichen wurde

**Erledigt** am 13.09.2026, v0.12.0. Nachgewiesen mit `npm run sync-check`:
echter Server, frische Datenbank, zwei Browser-Kontexte als Telefon und Laptop.
Dabei kam ein Punkt dazu, der im Konzept fehlte — **Grabsteine**: ohne sie
taucht Gelöschtes beim nächsten Abgleich wieder auf.

**Aufpassen:** die Eigentumsprüfung gehört in jede einzelne Route, nicht in eine
Hilfsfunktion, die man vergessen kann. Ein Test je Route, der mit fremder
Kennung zugreift und eine 404 erwartet — keine 403, die verrät, dass es den
Datensatz gibt.

---

## Stufe 3 — Bus-IBN an Objekte binden

> Der Konfigurator hält heute genau ein Projekt. Der Typ kann längst mehr.

- [ ] Tabelle `bus_project`, an Objekt und optional Anlage gebunden
- [ ] Mehrere Bus-Projekte je Objekt, Umschalten statt Überschreiben
- [ ] Das eine vorhandene `ga-bus-ibn-project` einmalig übernehmen
- [ ] Aus dem Objekt heraus ein Bus-Projekt anlegen

**Erledigt, wenn:** zwei Bus-Projekte im selben Objekt nebeneinander bestehen und
der alte Einzelstand nicht verloren ging.

---

## Stufe 4 — Schreiben ohne Netz

> Der Technikraum ist ein Funkloch. Das ist der Normalfall, nicht die Ausnahme.

- [ ] Warteschlange für Änderungen, die den Server nicht erreicht haben
- [ ] Nachschieben, sobald wieder Netz da ist
- [ ] Sichtbar machen, was noch aussteht — stille Warteschlangen sind gefährlich
- [ ] Die Warteschlange überlebt einen Neustart des Browsers

**Erledigt, wenn:** `npm run offline-check` einen Fall abdeckt, in dem ohne Netz
abgehakt, der Server wieder eingeschaltet und die Änderung nachweislich
angekommen ist.

**Aufpassen:** das ist der einzige Teil, in dem man sich Daten kaputtmachen kann.
Deshalb steht er hier und nicht weiter vorne.

---

## Stufe 5 — Übergabe

> Am Ende steht ein Dokument, das jemand unterschreibt.

- [ ] Übergabedokument je Objekt: Stammdaten, Anlagen, alle Durchläufe,
      offene Punkte, Unterschriftsfeld
- [ ] Druckfassung, die als PDF taugt (`@media print`, kein PDF-Paket)
- [ ] CSV je Objekt statt je Checkliste
- [ ] Offene kritische Punkte oben, nicht in der Reihenfolge der Vorlage

**Erledigt, wenn:** ein Objekt mit drei Durchläufen ein Dokument ergibt, das man
ohne Nacharbeit weitergeben kann.

---

## Nebenher

Kleinigkeiten, die keine eigene Stufe verdienen, aber erledigt gehören.

- [ ] **README stimmt nicht mehr**: dort stehen 118+ Artikel und 20 Rechner,
      tatsächlich sind es 122 und 21. Eine Zahl, die niemand pflegt, gehört
      erzeugt oder weggelassen
- [x] **HTTPS** über `tailscale serve` — seit 13.09.2026 in Betrieb,
      `https://host1.tail4ad0d6.ts.net`, siehe [DEPLOYMENT.md](DEPLOYMENT.md#https)
- [x] Frage der zwei Adressen geklärt — **eine kanonische**. Beide gleichwertig
      geht nicht: `better-auth` leitet aus `baseURL` ab, dass Cookies `Secure`
      sein müssen, und die darf ein `http`-Ursprung nicht speichern. Die
      LAN-Adresse bleibt ohne Anmeldung nutzbar, was reicht — die App läuft
      ohne Login, und die Daten liegen im Browser
- [ ] `analytics_event` wächst unbegrenzt; die Aggregierung gibt es, sie läuft
      nur von Hand

---

## Was bewusst nicht draufsteht

- **Mehrbenutzer-Zusammenarbeit** an einem Objekt — anderes Produkt
- **Fotos** — naheliegend und teuer (Speicher, Grössen, Offline, Löschen)
- **Zeiterfassung** — dafür gibt es Werkzeuge
- **Eine App im Store** — die PWA lässt sich installieren, das reicht
