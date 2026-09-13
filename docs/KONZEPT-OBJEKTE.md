# Konzept: Objekte

> Zweite Ausbaustufe des GA Tools. Die erste ist fertig: 122 Artikel, 21 Rechner,
> 17 Referenztabellen, 10 Checklisten, Suche, zweisprachig, offline lauffähig.
> Nachschlagen funktioniert. **Arbeiten** noch nicht.

## Wo es klemmt

Das Tool ist heute ein Nachschlagewerk mit Rechnern. Alles, was jemand auf der
Baustelle tatsächlich **produziert**, ist nachträglich angebaut und hat drei
Eigenschaften gemeinsam, die im Feld weh tun.

### Es gibt jede Sache nur einmal

`saveChecklistState(slug, …)` schreibt nach `ga-cl-<slug>`. Der Schlüssel
ist die **Vorlage**, nicht der Durchlauf. Wer dieselbe IBN-Checkliste für fünf
Lüftungsanlagen abarbeitet, überschreibt bei der zweiten die erste.

Beim Bus-IBN-Konfigurator dasselbe: `STORAGE_KEY = 'ga-bus-ibn-project'` —
Einzahl. Der Typ `BusProject` hat `id`, `name`, `site`, `engineer`, also alles,
was man für mehrere Projekte bräuchte. Gespeichert wird trotzdem genau eines.

### Es liegt nur im Browser

Beides landet im `localStorage`. Das heisst:

- auf dem Telefon ausgefüllt, am Laptop nicht vorhanden
- Seitendaten gelöscht, Arbeit weg
- kein Backup, keine Historie, kein Nachweis

Dabei ist die Infrastruktur längst da: es gibt Anmeldung (better-auth), eine
Datenbank und mit `/api/favorites` ein funktionierendes Beispiel dafür, wie
Benutzerdaten zwischen Geräten abgeglichen werden.

### Es hängt an nichts

Eine ausgefüllte Checkliste weiss nicht, zu welchem Gebäude sie gehört. Ein
Bus-Projekt weiss es (Feld `site`), aber niemand sonst kennt diesen Wert. Es
gibt keinen Ort, an dem steht: _das hier gehört zusammen._

## Die Idee

**Ein Objekt ist die Klammer.** Alles, was zu einem Gebäude gehört, hängt daran.

```
Objekt  "Wohnüberbauung Seefeld, Baufeld B"
├── Anlage  "Lüftung MZ1"
│   ├── Checklisten-Durchlauf  "IBN Lüftung"        73 % · zuletzt 12.09.
│   └── Bus-Projekt            "BACnet MSTP Feld 2"  41 Geräte
├── Anlage  "Heizung UG"
│   └── Checklisten-Durchlauf  "IBN Heizung"        100 % · abgeschlossen
└── Notizen, Kontakte, Termine
```

Begriffe bewusst aus der Praxis, nicht aus der Informatik:

| Begriff       | Bedeutung                                    |
| ------------- | -------------------------------------------- |
| **Objekt**    | das Gebäude, die Baustelle                   |
| **Anlage**    | Lüftung, Heizung, Kälte, Sanitär … im Objekt |
| **Durchlauf** | eine ausgefüllte Checkliste zu einer Anlage  |

«Projekt» wird **nicht** verwendet: der Begriff ist im Bus-IBN-Konfigurator
schon belegt und meint dort etwas anderes (eine Bus-Topologie). Zwei Bedeutungen
für ein Wort rächen sich später.

## Was das ändert

- **Mehrere Durchläufe derselben Vorlage** nebeneinander, jeder mit eigenem
  Stand. Das ist der eigentliche Punkt.
- **Gerätewechsel mittendrin.** Auf dem Telefon im Technikraum abgehakt, am
  Laptop im Büro weiterschreiben.
- **Übergabe als Ergebnis.** Am Ende steht ein Objekt mit vollständigen
  Durchläufen — daraus lässt sich ein Übergabedokument erzeugen, statt zehn
  CSV-Dateien einzeln zu exportieren.
- **Nichts geht verloren**, wenn jemand die Seitendaten löscht.

## Datenmodell

Vier Tabellen, an das bestehende Schema angelehnt (`user_favorites` als Vorbild:
`userId` als Fremdschlüssel, `updatedAt` als Millisekunden-Integer).

```
object          id · userId · name · address · client · note
                createdAt · updatedAt · archivedAt

plant           id · objectId · name · kind          (kind: lueftung|heizung|…)
                sortOrder · createdAt · updatedAt

checklist_run   id · objectId · plantId? · templateSlug · title
                state (JSON) · doneCount · totalCount
                createdAt · updatedAt · completedAt

bus_project     id · objectId · plantId? · name · data (JSON)
                createdAt · updatedAt
```

Bewusste Festlegungen:

- **`state` und `data` bleiben JSON.** Die Struktur der Checklisten ändert sich
  mit den Vorlagen; sie in Spalten zu zerlegen hiesse, bei jeder neuen Vorlage
  eine Migration zu schreiben. Ausgewertet wird ohnehin im Client.
- **`doneCount`/`totalCount` liegen daneben**, obwohl sie im JSON stecken. Damit
  die Übersichtsliste nicht jeden Durchlauf auspacken muss, um einen Fortschritt
  anzuzeigen.
- **`archivedAt` statt Löschen.** Abgeschlossene Objekte verschwinden aus der
  Liste, aber der Nachweis bleibt.
- **`plantId` ist optional.** Wer nur ein kleines Objekt hat, soll nicht erst
  eine Anlage anlegen müssen.

## Abgleich zwischen Geräten

Der Server ist die Wahrheit, `localStorage` der Offline-Zwischenspeicher.

- Beim Laden: Server fragen, lokal spiegeln. Antwortet der Server nicht, gilt
  der lokale Stand.
- Beim Ändern: lokal sofort schreiben (die Eingabe darf nie auf das Netz
  warten), dann an den Server schicken.
- Ohne Netz: Änderungen in eine Warteschlange, beim nächsten Mal nachschieben.

**Konfliktregel: der jüngere `updatedAt` gewinnt, je Datensatz.** Das ist
bewusst simpel. Ein Techniker arbeitet an einem Durchlauf selten gleichzeitig auf
zwei Geräten; eine echte Zusammenführung wäre viel Aufwand für einen seltenen
Fall. Wichtig ist nur, dass die Regel **dokumentiert** ist — sonst rätselt später
jemand, warum ein Haken weg ist.

Die Warteschlange ist der einzige wirklich knifflige Teil und kommt deshalb
zuletzt, nicht zuerst.

## Was ausdrücklich nicht dazugehört

- **Keine Mehrbenutzer-Zusammenarbeit.** Ein Objekt gehört einem Konto. Zwei
  Leute am selben Durchlauf sind ein anderes Produkt.
- **Keine Fotos** in der ersten Runde. Sie sind naheliegend und teuer: Speicher,
  Grössenbegrenzung, Offline-Verhalten, Löschkonzept.
- **Keine Termin- oder Zeiterfassung.** Dafür gibt es Werkzeuge.
- **Keine Rechteverwaltung** über das hinaus, was better-auth schon kann.

## Woran man merkt, dass es funktioniert

Nicht «die Tabellen sind angelegt», sondern:

1. Dieselbe IBN-Checkliste lässt sich für drei Anlagen **nebeneinander** führen,
   ohne dass sich die Stände in die Quere kommen.
2. Ein Haken, auf dem Telefon gesetzt, ist nach dem Neuladen am Laptop da.
3. Seitendaten im Browser löschen — nach dem Anmelden ist alles wieder da.
4. Im Funkloch abgehakt, oben angekommen ist es auf dem Server.
5. Ein Objekt lässt sich als Übergabedokument ausgeben.

Jeder dieser Punkte ist prüfbar, und jeder wird geprüft, bevor er als erledigt
gilt — so wie `npm run offline-check` den Offline-Betrieb prüft, statt ihn zu
behaupten.
