# Changelog

## v0.13.1 — 2026-09-14

### Aus dem offenen Netz nur mit Anmeldung

Das Portal ist öffentlich erreichbar, damit es von einem Rechner ohne Tailscale
aus geht — **nicht**, damit es jeder lesen kann. Wer von aussen kommt, sieht
jetzt die Anmeldemaske und sonst nichts.

Aus dem Tailnet und im Heimnetz ändert sich nichts: dort bleibt die App ohne
Konto benutzbar, wie bisher.

Unterschieden wird an der Kopfzeile, die `tailscale funnel` setzt. Dass die
sich nicht fälschen lässt, wurde gemessen und nicht angenommen: schickt ein
Aufrufer von aussen `tailscale-funnel-request: ?0` mit oder versucht sie zu
leeren, kommt bei der App trotzdem `?1` an — tailscaled überschreibt sie. Die
gefährliche Richtung wäre, sie von aussen loszuwerden; genau das geht nicht.

Durchgelassen wird nur, was die Anmeldung selbst braucht: `/login`, die
Auth-Schnittstelle, das JavaScript, die Schriften und `/offline.html`. Ein Test
prüft beide Seiten davon — dass nichts Wesentliches durchrutscht und dass die
Anmeldeseite nicht zur weissen Fläche wird.

Abschaltbar mit `OEFFENTLICH_ANMELDEPFLICHT=false`, falls die Wissensbasis doch
einmal öffentlich sein soll.

### Nicht in Suchmaschinen

`robots.txt` lud Crawler bisher ausdrücklich ein (`Disallow:` — leer heisst
alles erlaubt). Jetzt `Disallow: /`, dazu `X-Robots-Tag: noindex, nofollow,
noarchive` auf jeder Antwort. Beides hält allerdings nur gesittete Crawler
zurück; gegen jemanden, der die Adresse kennt, hilft allein die Anmeldung
oben.

### Sonstiges

- Ein Test, der alle 122 Artikel einzeln lädt, lief unter Last in die
  5-Sekunden-Vorgabe. Allein braucht er 1,2 s. Zeitlimit auf 30 s gesetzt und
  begründet — ein Test, der gelegentlich grundlos rot wird, wird irgendwann
  ignoriert

## v0.13.0 — 2026-09-14

### Öffentlich erreichbar — und dafür abgesichert

Das Portal steht jetzt über `tailscale funnel` im offenen Netz, damit es auch
von einem Rechner aus geht, auf dem sich Tailscale nicht installieren lässt.
Nachgemessen, bevor es umgestellt wurde: Funnel reicht in `x-forwarded-for` die
**echte** Absenderadresse durch und markiert öffentlichen Verkehr mit
`tailscale-funnel-request: ?1`.

Erreichbar ist genau eine Adresse auf genau einem Port. Node-RED, AdGuard, SSH
und die Proxmox-Oberfläche sind es nicht — von aussen geprüft.

### Schutz-Kopfzeilen

Bis heute lieferte die App **keine einzige**. Nachgemessen am öffentlichen Weg,
nicht vermutet:

- `Content-Security-Policy` über `kit.csp` — Skripte nur aus eigener Quelle,
  kein `unsafe-inline`, `frame-ancestors 'none'`, `object-src 'none'`. Die
  strenge Fassung ist erst seit v0.10.0 möglich: solange die Schriften von
  Google kamen, hätte sie eine Ausnahme gebraucht
- `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`
- `Strict-Transport-Security` **nur** über HTTPS — auf der LAN-Adresse wäre es
  schädlich, der Browser lüde danach über `http` gar nichts mehr

Neu `e2e/sicherheit.spec.ts`: prüft nicht nur, dass die Kopfzeilen dastehen,
sondern dass die Richtlinie auf fünf Seiten **nichts bricht** — keine
Verstösse, keine Skriptfehler, und die Seite ist wirklich da statt nur
fehlerfrei leer.

### Die Anmeldebremse zählt je Aufrufer — nachgewiesen

Am laufenden System: fünf Fehlversuche über den öffentlichen Weg, der sechste
wird mit 429 gebremst — und derselbe Versuch von einem anderen Absender geht
unverändert durch. Vorher hätte ein Fremder den Besitzer damit aussperren
können.

## v0.12.2 — 2026-09-14

### Die geschlossene Registrierung war nicht geschlossen

v0.12.1 hat die Registrierung in der `register`-Action der Anmeldeseite
gesperrt. Nach dem Ausrollen habe ich **beide** Wege ausprobiert statt nur des
offensichtlichen — und der zweite war offen: better-auth bringt seinen eigenen
Endpunkt `/api/auth/sign-up/email` mit, und der legte anstandslos ein Konto an.
Zwei Türen, eine verschlossen.

- Die Prüfung sitzt jetzt in einem `before`-Haken von better-auth, an dem jeder
  Weg vorbeikommt. Eine Regel, beide Türen
- Das versehentlich angelegte Testkonto wurde entfernt, die Datenbank vorher
  gesichert
- Neu: `npm run registrierung-check` — startet einen Server mit geschlossener
  Registrierung und prüft alle vier Eigenschaften: das erste Konto geht
  (sonst sperrt sich eine frische Installation aus), jedes weitere wird an
  **beiden** Türen abgelehnt, es entsteht genau ein Konto, und Anmelden geht
  weiterhin. Gegengeprüft: ohne den Haken fallen zwei der Prüfungen durch

Die Lehre steht im Skript: aufgefallen ist es nur, weil ich nach dem Ausrollen
nachgemessen habe, statt die Konfiguration für die Wirkung zu halten.

## v0.12.1 — 2026-09-14

### Vorbereitung für eine öffentlich erreichbare Seite

Vom Geschäftsrechner, auf dem sich Tailscale nicht installieren lässt, käme man
nur über `tailscale funnel` ans Portal — und damit stünde es im offenen Netz.
Zwei Dinge mussten vorher stimmen, beide durch Nachsehen gefunden:

- **Registrierung lässt sich schliessen** (`REGISTRIERUNG_OFFEN=false`). Sonst
  kann sich jeder ein Konto anlegen. Die Prüfung sitzt in der `register`-Action
  und nicht nur in der Oberfläche — ein abgeschickter Formularaufruf umgeht
  jede versteckte Schaltfläche. Ist noch kein Konto vorhanden, geht
  Registrierung immer, sonst sperrt sich eine frische Installation selbst aus
- **Die Anmeldebremse zählt wieder je Absender.** `getClientAddress()` meldete
  für jeden Aufruf durch den Tunnel dieselbe Adresse, die Bremse galt also
  global: fünf falsche Versuche von irgendwoher hätten den Besitzer
  ausgesperrt, beliebig oft wiederholbar

Der naheliegende Weg wäre `ADDRESS_HEADER=x-forwarded-for` gewesen — und hätte
die LAN-Adresse zerlegt: fehlt die Kopfzeile, **wirft** `getClientAddress()`,
und bei direkten Aufrufen fehlt sie. Stattdessen `$lib/server/clientIp`, das der
Kopfzeile nur glaubt, wenn die Anfrage wirklich vom eigenen Tunnel kommt
(`VERTRAUTER_PROXY`). Sonst könnte sich jeder eine Absenderadresse ausdenken.

Ebenfalls nachgesehen, statt angenommen: die App holt **nirgends** etwas von
einer URL, die ein Benutzer bestimmt, und nimmt keine Dateien entgegen. Sie
taugt damit nicht als Sprungbrett ins LAN.

Funnel selbst ist noch **nicht** eingeschaltet — das verlangt eine einmalige
Freischaltung im Tailscale-Konto. Der Ablauf samt dem, was danach zu messen
ist, steht in [DEPLOYMENT.md](DEPLOYMENT.md).

## v0.12.0 — 2026-09-13

### Objekte und Durchläufe gleichen sich zwischen Geräten ab

Roadmap-Stufe 2. Auf dem Telefon im Technikraum abgehakt, am Laptop im Büro
weiterschreiben — und wer die Seitendaten löscht, verliert nichts mehr.

- Drei Tabellen `objekt`, `anlage`, `durchlauf`, **je Datensatz eine Zeile**.
  `user_favorites` legt die ganze Liste als ein JSON ab; das ginge hier nicht,
  weil dann das zuletzt abgleichende Gerät die Arbeit des anderen komplett
  überschreibt
- `GET`/`POST /api/objekte` — ein Aufruf schickt den lokalen Stand, der Server
  mischt je Datensatz und gibt den gemischten Stand zurück. Zwei Verben statt
  vier je Entität, weil der Client keine Änderungsliste führt
- Lokal wird weiterhin **sofort** geschrieben. Die Eingabe wartet nie auf das
  Netz; ohne Anmeldung bleibt alles auf dem Gerät, wie bisher
- Anzeige, wann zuletzt abgeglichen wurde

### Löschen hinterlässt einen Grabstein

Bisher wurde ein gelöschter Datensatz entfernt. Beim Abgleich wäre er dadurch
wieder aufgetaucht: das andere Gerät kennt ihn noch und hält ihn für neu.
Gelöschtes trägt jetzt `geloeschtAm` und ist aus allen Listen gefiltert —
sichtbar ändert sich nichts.

### Zwei Regeln, die nicht verhandelbar sind

- **`userId` kommt immer aus der Sitzung, nie aus dem Rumpf.** Sonst schriebe
  ein Aufrufer mit fremder Kennung in fremde Daten
- **Eine fremde `id` lässt die fremde Zeile unberührt** — ohne Fehlermeldung,
  die verriete, dass es sie gibt. Beides ist getestet, und gegengeprüft:
  entfernt man die Eigentumsprüfung aus dem Schreibweg, fallen genau diese
  beiden Tests durch

### Nachgewiesen, nicht behauptet

`npm run sync-check` startet einen echten Server mit frischer Datenbank und
lässt zwei getrennte Browser-Kontexte als Telefon und Laptop dasselbe Konto
benutzen: Objekt und Durchlauf wandern hinüber, eine Änderung auf B kommt bei A
an, auf A Gelöschtes bleibt auf B gelöscht, und ohne Anmeldung kommt nichts.
Gegengeprüft, dass die Prüfung anschlägt, wenn der Abgleich ausbleibt.

Ein echter Fehler kam dabei heraus: `ladeBestand()` baute sein Rückgabeobjekt
aus festen Feldern und liess `abgeglichenAm` fallen — die Oberfläche hätte nach
jedem Neuladen «noch nie abgeglichen» gemeldet.

## v0.11.1 — 2026-09-13

### HTTPS über Tailscale

`https://host1.tail4ad0d6.ts.net`, ausgeliefert von `tailscale serve` auf host1,
Zertifikat von Let's Encrypt. Damit ist der letzte offene Punkt der
Go-Live-Checkliste erledigt.

**Eine kanonische Adresse, nicht zwei.** Geplant war, dass die LAN-Adresse
gleichwertig weiterläuft. Beim Nachmessen ging das nicht auf:

- `adapter-node` nimmt bei fehlendem `x-forwarded-proto` `https` an — ein
  direkter HTTP-Aufruf bekäme eine falsche Herkunft
- `csrf.trustedOrigins` würde die Formularprüfung öffnen, aber nicht helfen:
  `better-auth` leitet aus `baseURL` ab, dass Cookies `Secure` sein müssen, und
  ein `http`-Ursprung darf ein `Secure`-Cookie nicht speichern. Das Formular
  sähe aus, als funktioniere es, während die Sitzung still verfällt

Deshalb: `ORIGIN` ist die HTTPS-Adresse. Über die LAN-Adresse funktionieren
Nachschlagen, Rechner, Objekte und Checklisten unverändert — nur Anmeldung,
Favoriten-Abgleich und Admin nicht. Das kostet wenig: die App läuft ohne
Anmeldung, und die Arbeitsdaten liegen im Browser.

Und es ist ein Gewinn: vorher lief die Anmeldung über HTTP durchs LAN, das
Passwort also im Klartext übers Netz.

## v0.11.0 — 2026-09-13

### Objekte: dieselbe Checkliste mehrfach führen

Bisher lag der Checklisten-Stand unter `ga-cl-<vorlage>` — **ein Stand je
Vorlage**. Wer dieselbe IBN-Checkliste für fünf Lüftungsanlagen abarbeitete,
überschrieb bei der zweiten die erste. Beim Bus-IBN-Konfigurator dasselbe:
`ga-bus-ibn-project`, Einzahl.

Neu ist das **Objekt** als Klammer: ein Gebäude, darin Anlagen, daran
Durchläufe. Begriffe aus der Praxis — «Projekt» kommt bewusst nicht vor, das
meint im Bus-IBN-Konfigurator schon etwas anderes.

- `/objekte` — anlegen, umbenennen, archivieren; Archiviertes bleibt erhalten
- `/objekte/[id]` — Anlagen und Durchläufe mit Fortschritt, nach Anlage gruppiert
- Die Checklistenseite arbeitet mit `?durchlauf=<id>` auf einem Durchlauf. Ohne
  den Parameter verhält sie sich wie bisher — alte Lesezeichen laufen nicht ins
  Leere
- Ein Band über der Checkliste zeigt, zu welchem Durchlauf und Objekt sie gehört
- Der Fortschritt wird im Store **aus dem Zustand abgeleitet**, nicht vom
  Aufrufer geglaubt; sonst zeigt die Übersicht irgendwann etwas anderes als die
  Seite

### Frühere Checklisten gehen nicht verloren

Beim ersten Aufruf von `/objekte` wandern vorhandene `ga-cl-*`-Stände in ein
Objekt «Übernommen». Leere Stände werden übergangen, ein kaputter verhindert die
übrigen nicht, und die alten Schlüssel bleiben liegen — geht bei der Übernahme
etwas schief, ist der Stand noch da.

### Übersetzungen werden geprüft

Beim Ergänzen des neuen Bereichs landete der Block zuerst **verschachtelt** an
der falschen Stelle, weil der Suchmarker auch tiefer im Baum vorkam. Aufgefallen
ist es durch einen neuen Test, den es vorher nicht gab: Deutsch und Englisch
müssen dieselben Schlüssel haben, keine leeren Texte enthalten und dieselben
Platzhalter benutzen.

### Konzept und Roadmap

- [docs/KONZEPT-OBJEKTE.md](docs/KONZEPT-OBJEKTE.md) — warum es das braucht,
  Datenmodell, Abgleichregel, und was ausdrücklich **nicht** dazugehört
- [ROADMAP.md](ROADMAP.md) — fünf Stufen, jede für sich nützlich. Diese hier ist
  Stufe 1; der Server kommt in Stufe 2 als Spiegel dazu, nicht als Ersatz

## v0.10.1 — 2026-09-13

### Favoriten und zuletzt Gelesenes sind jetzt auch offline da

Die Vorwärmung holte die sieben Einstiegsseiten und die 21 Rechner. Die 122
Wissensartikel blieben aussen vor — alle vorzuhalten wären 122 Anfragen bei
jedem Start. Was jemand aber **markiert oder gerade gelesen** hat, ist genau
das, was er im Keller wieder braucht.

- Dritte Stufe der Vorwärmung: Favoriten zuerst, dann zuletzt Benutztes,
  höchstens 30 Seiten, ohne Dubletten. Läuft wie die zweite Stufe erst, wenn
  der Browser Luft hat, und nicht im Sparmodus
- Favoriten vor zuletzt Gelesenem: wer etwas markiert hat, will es
  zuverlässiger haben als das, was er zufällig zuletzt offen hatte
- Die beiden Stores benennen dieselbe Sache verschieden — Favoriten kennen
  `artikel`, zuletzt Benutztes `wissen`, beide führen nach `/wissen`. Das
  steht jetzt in **einer** Zuordnung statt in zwei Sonderfällen, und ein Test
  prüft, dass sie jeden Typ abdeckt, den die Favoriten kennen

`npm run offline-check` deckt den Fall ab, auf den es ankommt: ein Artikel
wird als Favorit markiert und **nie geöffnet**, danach geht der Server aus —
der Artikel ist trotzdem da. Gegengeprüft, dass die Prüfung anschlägt, wenn
man die dritte Stufe wieder entfernt.

## v0.10.0 — 2026-09-13

### Schriften kommen aus dem eigenen Haus

Jede Seite holte Rubik und Bebas Neue von `fonts.googleapis.com`. Für ein
Werkzeug, das im Technikraum ohne Empfang funktionieren soll, ist das eine
Fremdabhängigkeit im kritischen Pfad — und die IP jedes Nutzers ging bei jedem
Seitenaufruf an Google.

- Beide Schriften liegen jetzt unter `static/fonts/`, eingebunden über
  `@font-face` in `layout.css`
- Rubik als **variable Schrift**: eine Datei für 400–700 statt vier Schnitten.
  Nur `latin` und `latin-ext` — zusammen **76 KB statt 236 KB**
- Der `latin`-Schnitt wird vorgeladen, `latin-ext` holt der Browser nur, wenn
  ein Zeichen daraus vorkommt
- Die Google-Fonts-Regel im Service Worker ist raus, es gibt dort nichts mehr
  zu holen. Dafür liegen die Schriften jetzt im Precache — die App sieht also
  auch beim ersten Start ohne Netz richtig aus
- Neuer e2e-Test, der **jede** fremde Quelle meldet, nicht nur Schriften

### Gemessen statt vermutet

Erstmals nachgemessen, was beim Seitenaufruf wirklich passiert:

|                     |            |
| ------------------- | ---------- |
| übertragen je Seite | 223–348 KB |
| erstes Bild (FCP)   | 140–336 ms |
| Anfragen            | 37–39      |

Zwei Verdachtsmomente haben sich **nicht** bestätigt und werden hier
festgehalten, damit sie niemand ein zweites Mal verfolgt:

- Ein 406 KB grosser Brocken hängt am App-Layout — er wird aber **dynamisch**
  geladen, erst wenn jemand die Suche öffnet. Kein Problem.
- Ein Artikel brauchte einmalig 5,2 s bis zum ersten Bild. Bei Wiederholung
  212 ms, drei andere Artikel 212–432 ms. Ein Ausreisser, kein Muster.

## v0.9.9 — 2026-09-13

### Offline funktionierte praktisch nicht

v0.9.8 hat den Service Worker endlich angemeldet. Damit war er registriert —
aber nicht nützlich. Ohne Netz kam bei allem ausser den bereits besuchten
Seiten die Fehlerseite des Browsers, **auch auf der Startseite**. Das Manifest
setzt `start_url: "/"`; eine installierte App startete also genau dort und zeigte
nichts.

Aufgefallen ist das erst, weil ein erster Offline-Test **grün meldete, obwohl er
nie offline war**: Playwrights `context.setOffline()` wirkt auf die Seite, nicht
auf den Service Worker. Der holte weiter aus dem Netz. Verraten hat es sich
dadurch, dass im Zwischenspeicher eine Seite auftauchte, die dort nach der
Theorie nicht sein konnte.

- **Auffangseite** `static/offline.html` — im Stil der App, ohne Framework und
  ohne externe Schrift, denn sie muss genau dann funktionieren, wenn nichts
  nachgeladen werden kann. Sie listet auf, was trotzdem verfügbar ist
- Angebunden über `precacheFallback` an der Navigations-Regel, **nicht** über
  `navigateFallback`: das erzeugt eine NavigationRoute, die _jede_ Navigation
  abfängt. Ausprobiert — damit zeigte die App auch **online** nur noch die
  Auffangseite
- **Vorwärmen** der sieben Einstiegsseiten, sobald der Worker die Kontrolle hat,
  danach bei Gelegenheit die 21 Rechner. Die sind der Grund, warum das Werkzeug
  im Technikraum offline taugen soll — dort ist selten Empfang. Nicht im
  Sparmodus des Browsers, und die 122 Artikel bleiben bewusst aussen vor
- `pages-cache` hält jetzt 120 statt 50 Einträge für 30 statt 7 Tage — bei 50
  wäre von 28 vorgewärmten Seiten nach etwas Stöbern die Hälfte wieder weg

Nachgewiesen mit `npm run offline-check`: das Skript startet den Server, lässt
den Worker die Kontrolle übernehmen und **schaltet den Server dann wirklich ab**.
Gegengeprüft, dass es anschlägt — ohne die Vorwärmung fallen fünf von sieben
Prüfungen durch.

| ohne Netz aufgerufen | vorher                   | jetzt                  |
| -------------------- | ------------------------ | ---------------------- |
| Startseite           | Fehlerseite des Browsers | Dashboard              |
| besuchte Seite       | funktioniert             | funktioniert           |
| Rechner, nie besucht | Fehlerseite des Browsers | funktioniert           |
| Artikel, nie besucht | Fehlerseite des Browsers | Auffangseite mit Liste |

## v0.9.8 — 2026-09-13

### Service Worker meldete sich nur auf der Startseite an

Die Offline-Funktion war seit ihrer Einführung praktisch tot. `vite-plugin-pwa`
leitet den Pfad zum Service Worker aus Vites `base` ab, und SvelteKit setzt
`paths.relative` von Haus aus auf `true`. Daraus wurde
`new Workbox('./sw.js', { scope: './' })` — auf `/` ging das gut, auf
`/rechner/taupunkt` wurde daraus ein `GET /rechner/sw.js` und damit ein 404.

Sichtbar kaputt war dabei nichts: die Seite lädt normal, die App ist
installierbar, nur offline funktioniert sie nicht. Im Serverlog stand ein 404,
den niemand einem Feature zuordnet. Gefunden wurde er, weil er in der
Playwright-Ausgabe mitlief.

- `base` und `scope` des PWA-Plugins stehen jetzt fest auf `/`
- Neuer e2e-Test `e2e/pwa.spec.ts`, der auf einer **Unterseite** prüft, ob sich
  der Service Worker anmeldet und sein Scope die Wurzel ist. Gegengeprüft: ohne
  den Fix schlägt er fehl

### Betrieb

- Der Dienst läuft nicht mehr als `root`, sondern als Systembenutzer `ga-tool`
  mit `ProtectSystem=strict` und Schreibrecht nur auf `/var/lib/ga-tool`. Die
  `.env` bleibt `root:600` — `systemd` liest sie, bevor es die Rechte abgibt
- Die Unit liegt als `deploy/ga-tool.service` im Repo. Die Abschrift in
  `DEPLOYMENT.md` war etwas anderes als die Wirklichkeit geworden
- Tägliche Datenbanksicherung per Timer, die die Kopie anschließend **öffnet**
  (`integrity_check` und Tabellenzahl). Ein Restore wurde durchgespielt, nicht
  nur beschrieben
- `server-update.sh` lädt die `.env`, bevor es migriert — vorher brach es mit
  `DATABASE_URL is not set` ab, nachdem `npm ci` schon gelaufen war
- `server-update.sh` läuft nur noch einmal gleichzeitig (`flock`). Der Cron-Job
  startet es alle fünf Minuten, ein `npm ci` mit Neuübersetzung von
  `better-sqlite3` dauert länger — beim Ausrollen von v0.9.8 haben sich zwei
  Läufe gegenseitig das `node_modules` weggezogen, und der Dienst war rund
  anderthalb Minuten unten
- `npm ci` läuft nur noch, wenn sich `package-lock.json` geändert hat
- Vor dem Neustart wird geprüft, ob sich eine SQLite-Datenbank öffnen lässt;
  sonst bricht das Skript ab und lässt den alten Build weiterlaufen, statt den
  Dienst in eine Neustartschleife zu schicken
- `server-update.sh` erkennt einen abgebrochenen Vorlauf. Vorher hing die
  Entscheidung allein an git: ein Lauf, der nach dem `git pull` abbrach, ließ
  den Dienst auf dem alten Build stehen, und der nächste `--auto`-Lauf meldete
  „bereits auf neuestem Stand"

## v0.9.7 — 2026-09-13

### Wissensbasis vollständig zweisprachig

- Englische Fassung für die letzten vier Artikel ergänzt: **Temperaturfühler**,
  **k-Faktor**, **Polynom-Approximation**, **Luftfeuchtigkeit**. Damit haben
  alle **122 von 122** Artikeln einen `<!-- EN -->`-Teil mit identischer
  Gliederung.

### Sonstiges

- `package.json` stand seit dem ersten Tag auf `0.0.1` und wurde nie
  mitgezogen — jetzt auf den tatsächlichen Stand gesetzt.
- Der Eintrag für v0.9.6 fehlte im Changelog und ist unten nachgetragen.

## v0.9.6 — 2026-05-30

Nachgetragen am 13.09.2026 aus Commit `5f76888`.

- **Build-Time-Metadaten** — Artikel-, Tabellen- und Checklisten-Index wird beim
  Build erzeugt statt zur Laufzeit
- **Lazy Content-Loader** — Artikeltexte werden erst bei Bedarf geladen
- **Volltextsuche** über den generierten Korpus
- `crypto.randomUUID`-Fallback für HTTP im lokalen Netz ohne HTTPS
- `server-update.sh --auto` für den Cron-Job

## v0.9.5 — 2026-05-24

### Neue Rechner

- **k-Faktor-Rechner (Luft)** — Volumenstrom aus Wirkdruck: `Q = k·√ΔP`. Vier Modi (Q aus k+ΔP, ΔP aus Q+k, k aus Q+ΔP, k aus zwei Messpunkten). Optional Dichtekorrektur. Kennlinien-Chart mit Arbeitspunkt-Marker und gestrichelten Hilfslinien zu den Achsen.
- **Zeit-Konverter** — ms / s / min / h / d / Wo / Mt / a, mit Tests.

### Neue Wissens-Artikel

- **Luftfeuchtigkeit — Grundlagen für die GA** — rF vs absolute vs spezifische Feuchte, h-x-Diagramm-Operationen als Pfeile, Behaglichkeit nach EN 16798-1 / ISO 7730 / SIA 382/1, Symptome zu trocken/zu feucht und GA-Gegenmassnahmen.
- **k-Faktor — Volumenstrom aus Wirkdruck** — Bernoulli-Herleitung, typische k-Werte, IBN-Schritte, Filter-Hinweise gegen springende Werte.

### Psychrometrie-Rechner

- **Interaktives h-x-Diagramm** (Carrier-Style: x horizontal, T vertikal) — rF-Kurven 20 / 40 / 60 / 80 / 100 %, Arbeitspunkt wandert live mit deinen Eingaben, Taupunkt-Marker auf der Sättigungslinie.

### Dashboard

- **Neueste Einträge** — neue Sektion zwischen Favoriten und "Meist aufgerufen". Listet die 5 jüngsten Einträge quer über Wissensbasis, Referenz, Checklisten, Rechner und Konverter (sortiert nach `updated`-Datum, mit Typ-Badge + relativem Datum „heute / gestern / vor X Tagen").

### UI-Fixes

- **Referenz-Karten-Icons** — fünf fehlende Icons ergänzt (sun, code, bell, list, layers). Alarm-Richtwerte, BACnet-Objekttypen, DALI-Gerätetypen, KNX-DPT und Modbus-Codes zeigen jetzt eigene Icons statt Fallback-Quadrat.
- **Konverter-Karten-Icons** — clock + rotate-cw ergänzt, Zeit + Winkel hatten vorher den generischen Fallback.

---

## v0.9.4 — 2026-05-24

### Auth & Rollen

- **System-Admin-Rolle eingeführt** — Erster registrierter User wird automatisch `systemadmin`. Kann nicht geändert, gesperrt oder gelöscht werden (Schutz vor versehentlichem Selbst-Aussperren).
- **Self-Healing für bestehende Deployments** — Beim Server-Start wird automatisch der älteste Admin auf `systemadmin` hochgestuft, falls noch keiner existiert. Log-Eintrag: `[bootstrap] Promoted <email> to systemadmin`.
- **Admin-UI** — Systemadmin-Zeile zeigt roten Lock-Badge statt Dropdown, alle destruktiven Aktionen ausgeblendet. Sidebar-Link "System Admin" für die Rolle, Profile-Badge entsprechend.
- **Recovery-Pfad dokumentiert** in [DEPLOYMENT.md](DEPLOYMENT.md) — SQL-Varianten falls Account verloren.

### Wissensbasis

- **Neuer Artikel: Temperaturfühler** — RTD (PT100/PT1000/NI1000 mit TK6180 vs TK5000), aktive Spannungsfühler (LMx35-Familie 10 mV/K, K&P KP10), NTC + andere gängige Signaltypen. Mit Querverweis zum Polynom-Fit für NI1000-Linearisierung. Im Übersichts-Artikel `sensoren.md` ist jetzt ein Link auf das neue Detail.

### Checklisten

- **Fehlende Icons ergänzt** — DALI-2 (sun), Datenpunktlisten-Review (table), Funktionstest-Protokoll (check-square), plus droplets/snowflake/network — vorher zeigten 3 Checklisten den Fallback-Kasten statt eigenes Icon.

---

## v0.9.3 — 2026-05-24

### Abkürzungen

- **Sprach-Filter ist jetzt strikt** — DE und EN abwählen liess vorher den Filter komplett kippen und zeigte ALLE Einträge (DE+EN+INT). Jetzt: keine Sprache gewählt → nur sprachneutrale INT-Einträge (z.B. "0–10 V") bleiben. Default beim Öffnen folgt weiterhin der UI-Sprache.
- **Kein FOUC bei Hydration** — `selectedLangs` wird synchron beim Initialisieren auf die UI-Sprache gesetzt statt in `onMount`. Verhindert das kurze Aufblitzen einer falsch gefilterten Liste beim Seitenwechsel.

### CI

- **DB-Migration vor E2E-Tests** — Playwright-Server scheiterte an "no such table: analytics_event" weil die CI-DB nie migriert wurde. Migrate-Script läuft jetzt vor den E2E-Tests.

---

## v0.9.2 — 2026-05-24

### Polynom-Fit-Rechner

- **Notation umschaltbar** — neuer Dropdown zwischen Standard (`a₀, a₁, a₂ …`) und Block-Notation (`A·x² + B·x + C`). Bei Grad 1 wird `A = 0` als Hinweis gegraut angezeigt, bei Grad > 2 erscheint eine Warnung, dass das Schema nur Grad ≤ 2 abbildet. Copy-Button kopiert in der gewählten Notation und Reihenfolge.

### Wissens-Artikel: Polynom-Approximation

- **Praxis-Beispiel ergänzt** — Sollwertversteller mit Widerstands-Signal (1000–1175 Ω → ±3 K). Schritt-für-Schritt: Punkte eingeben, Grad 1, Notation umstellen, Werte ablesen. Inkl. Feinkorrektur-Tabelle für C und Filter-Hinweise gegen springende Werte.

---

## v0.9.1 — 2026-05-24

### UX

- **Versions-Badge nur noch in Top-Bar** — vorher erschien die Version auf Desktop doppelt (Sidebar-Footer + Top-Bar-Badge), auf Mobile nur in der Top-Bar. Sidebar-Link entfernt, einheitlich nur noch oben rechts.

---

## v0.9.0 — 2026-05-24

### Neue Features

- **Polynom-Fit-Rechner** — Least-Squares-Polynom-Approximation (Grad 1–5) aus Messpunkten. Eingabe von (x, y)-Paaren, Live-Plot, Koeffizienten-Tabelle mit Copy-Button, R²-Bestimmtheitsmass, Sub-Tool zum Auswerten an beliebigen x-Stellen. Default-Daten zeigen NTC-10k-Kennlinie. Erreichbar unter `/rechner/polynom-fit`.
- **Wissens-Artikel: Polynom-Approximation für Sensor-Kennlinien** — Theorie + Praxis: Wahl des Grades, R²-Interpretation, Anwendungen (NTC-Linearisierung, Differenzdruck → Volumenstrom, 4–20 mA Kalibrierung, Heizkurven), Overfitting-Vermeidung, Grenzen (Steinhart-Hart für extreme NTC-Bereiche). Direkt mit dem Rechner verknüpft.

### Mobile-Fixes (Wissensbasis)

- **Detail-Seiten überlaufen nicht mehr** — `.main-wrapper` mit `flex: 1` ohne `min-width: 0` liess sich vom Content nach rechts pushen, egal welche per-Page-Constraints. Jetzt `min-width: 0` + `overflow-x: clip` als sichere Untergrenze.
- **Display-Headings auf Mobile** — lange deutsche Komposita wie "ADIABATISCHE KÜHLUNG – PRINZIP UND GRENZEN" blieben in einer Zeile und überliefen. Jetzt `overflow-wrap: anywhere` + `hyphens: auto`, dazu auf ≤480 px Font-Size von 2 rem → 1.5 rem.
- **Code-Blöcke, Tabellen, Cards** — `<pre>` mit `max-width: 100%` (war nur `overflow-x: auto`, hat parent trotzdem geweitet), `<table>` als `display: block; overflow-x: auto` für wide tables, `.article-card` / `.tool-card` / `.related-card` mit `max-width: 100%` + `min-width: 0`.
- **Filter-Chips** — `.filter-label` belegt auf ≤480 px eine volle Zeile, Chips wrappen sauber drunter statt rechts geclippt zu werden.

---

## v0.8.3 — 2026-05-24

### Mobile + UX

- **Version-Badge in Top-Bar** — Versionsnummer ist jetzt auf allen Bildschirmgrössen sichtbar (vorher nur in der Sidebar, die auf Mobile versteckt ist). Klick öffnet Changelog.
- **Konsistente Seiten-Breite (720px)** — vorher: Dashboard 800, Wissen/Referenz/Abk 720, Rechner/Konverter 640, Konverter-Detail 480. Jetzt durchgängig 720px für alle Listen + Details → keine Layout-Sprünge beim Navigieren.

### Server-Tooling

- **`scripts/server-update.sh`** — Update-Script mit DB-Backup, `npm ci`, Migration, Build, Restart und Health-Check. `cd /opt/ga-tool && ./scripts/server-update.sh` ersetzt die manuelle Befehlskette.

---

## v0.8.2 — 2026-05-24

### Docs

- **Deployment-Befehle korrigiert** — `npm ci --omit=dev` würde `vite` + `@sveltejs/kit` weglassen, dann scheitert `npm run build` mit `vite: not found`. README und DEPLOYMENT.md nutzen jetzt `npm ci` (mit devDeps), optional `npm prune --omit=dev` nach erfolgreichem Build.

---

## v0.8.1 — 2026-05-24

### Fixes

- **Mobile iOS-Autozoom verhindert** — Inputs mit font-size < 16px lösten auf iPhones automatisches Reinzoomen aus. Globale Untergrenze von 16px unter 640px Viewport
- **Konsistente Seiten-Breite** — Rechner-Detailseiten waren auf 480px begrenzt während Listen 640px nutzten → Sprung beim Navigieren. Jetzt durchgehend 640px
- **Engere Mobile-Paddings** — `.calc-page` und `.calc-section` haben unter 480px reduziertes Padding für mehr horizontalen Platz

### Server-Deployment

- **`GET /api/health`** — Endpoint für Loadbalancer/Monitoring
- **`npm run db:migrate` / `db:baseline`** — TTY-freie DB-Migrationen
- **DEPLOYMENT.md** — Vollständige Server-Anleitung (systemd, Reverse-Proxy, Backups)
- **`window.gaTool`** — Browser-Console-Devtools für Power-User (`gaTool.help()`)

---

## v0.8.0 — 2026-05-17

### Neu

- **Vollständige EN-Übersetzung** — Alle Seiten, Rechner, Konverter, Referenz-Tabellen, Checklisten, Abkürzungen und Suchergebnisse vollständig bilingual (DE/EN)
- **Sprach-Filter Abkürzungen** — Filter-Chips 🇩🇪 DE / 🇬🇧 EN / 🌐 INT auf der Abkürzungsseite
- **Bus-IBN Einstellungen** — Adresskarte und Gruppierung werden persistent gespeichert

### Verbesserungen

- Dashboard neu gestaltet — Favouriten als Pills, Farbakzente auf Modul-Karten
- Suchmodal zeigt Titel und Beschreibungen in aktiver Sprache
- Kategorie-Labels auf allen Übersichtsseiten übersetzt
- Profil: Recently Used zeigt übersetzte Titel, Zeitangaben und Rollen

---

## v0.6.0 — 2026-05-15

### Neu

- **PID-Simulator** — Interaktiver Regelkreis-Simulator mit Heizen/Kühlen-Modus, Auto-Störgrösse (PT1-gefiltert, Zeitkonstante, Bias), SP-Automatik (Tag/Nacht-Umschaltung), Presets
- **Wissensbasis erweitert** — 7 neue Artikel: RS-485, CAN Bus, PROFIBUS, DMX512, Z-Wave, IEC 61850, Matter/Thread
- **Bidirektionale Verlinkung** — Wissensbasis ↔ Rechner (Artikel verlinken auf passende Tools und umgekehrt)
- **Changelog** — Diese Seite
- **Tastaturkürzel** — `1`–`7` für Navigation, `Ctrl+K` / `/` für Suche

### Verbesserungen

- Kühlen-Regelungsmodell korrigiert (PT1-Strecke kehrt korrekt zur Umgebungstemperatur zurück)
- Kreuz-Verlinkungen in bestehenden Artikeln ergänzt

---

## v0.5.0 — 2026-04-XX

### Neu

- **Abkürzungsverzeichnis** `/abkuerzungen` — durchsuchbar, filterbar, bilinguale Konzeptgruppen (GLT = BMS, SPS = PLC, …)
- **Referenz-Tabellen** `/referenz` — DN-Tabellen, Modbus-Codes, BACnet-Objekte, Kältemittel, Normaussentemperaturen, Alarm-Richtwerte

---

## v0.4.0 — 2026-03-XX

### Neu

- **Wissensbasis** `/wissen` — 80+ Artikel zu Regelung, Heizung, Lüftung, Klima, Sanitär, Protokolle, Antriebe, Alarm, Normen, IT, IBN
- **Fuse.js Volltextsuche** (`Ctrl+K`) über Artikel, Rechner, Konverter, Abkürzungen
- **Artikel-Detailseite** mit verwandten Artikeln und verlinkten Tools

---

## v0.2.0 — 2026-02-XX

### Neu

- **Rechner** `/rechner`: Heizkurve, Kv-Wert, Ausdehnungsgefäss, Druckverlust, Luftbedarf, Taupunkt, Wärmeleistung, Psychrometrie

---

## v0.1.0 — 2026-01-XX

### Neu

- **Konverter** `/konverter` — Druck, Temperatur, Durchfluss, Leistung, Energie, Luftmengen, Feuchte

---

## v0.0.1 — 2026-01-XX

### Grundgerüst

- SvelteKit + SQLite (better-sqlite3 + Drizzle ORM)
- Auth (Login/Logout, Admin/User-Rollen via better-auth)
- Sidebar-Navigation (Desktop) + Bottom-Nav (Mobile)
- Theme-System (Auto / Light / Dark / OLED)
- i18n Deutsch + Englisch
- Dashboard mit Schnellzugriff-Kacheln
- PWA (Manifest, Service Worker, Offline-Cache)

<!-- EN -->

# Changelog

## v0.8.0 — 2026-05-17

### New

- **Full EN translation** — All pages, calculators, converters, reference tables, checklists, abbreviations and search results fully bilingual (DE/EN)
- **Language filter for abbreviations** — Filter chips 🇩🇪 DE / 🇬🇧 EN / 🌐 INT on the abbreviations page
- **Bus commissioning settings** — Address map visibility and grouping are persisted across sessions

### Improvements

- Dashboard redesigned — favourites as pills, colour accents on module cards
- Search modal shows titles and descriptions in the active language
- Category labels translated on all overview pages
- Profile: Recently Used shows translated titles, timestamps and roles

---

## v0.6.0 — 2026-05-15

### New

- **PID Simulator** — Interactive control loop simulator with heating/cooling mode, auto disturbance (PT1-filtered, time constant, bias), SP automation (day/night switching), presets
- **Knowledge base extended** — 7 new articles: RS-485, CAN Bus, PROFIBUS, DMX512, Z-Wave, IEC 61850, Matter/Thread
- **Bidirectional linking** — Knowledge base ↔ Calculators (articles link to relevant tools and vice versa)
- **Changelog** — This page
- **Keyboard shortcuts** — `1`–`7` for navigation, `Ctrl+K` / `/` for search

### Improvements

- Cooling control model corrected (PT1 plant correctly returns to ambient temperature)
- Cross-links added to existing articles

---

## v0.5.0 — 2026-04-XX

### New

- **Abbreviation directory** `/abkuerzungen` — searchable, filterable, bilingual concept groups (GLT = BMS, SPS = PLC, …)
- **Reference tables** `/referenz` — DN tables, Modbus codes, BACnet objects, refrigerants, design outdoor temperatures, alarm thresholds

---

## v0.4.0 — 2026-03-XX

### New

- **Knowledge base** `/wissen` — 80+ articles on control, heating, ventilation, HVAC, plumbing, protocols, drives, alarms, standards, IT, commissioning
- **Fuse.js full-text search** (`Ctrl+K`) across articles, calculators, converters, abbreviations
- **Article detail page** with related articles and linked tools

---

## v0.2.0 — 2026-02-XX

### New

- **Calculators** `/rechner`: Heating curve, Kv value, expansion vessel, pressure drop, fresh air demand, dew point, heat output, psychrometrics

---

## v0.1.0 — 2026-01-XX

### New

- **Converters** `/konverter` — Pressure, temperature, flow rate, power, energy, air volumes, humidity

---

## v0.0.1 — 2026-01-XX

### Foundation

- SvelteKit + SQLite (better-sqlite3 + Drizzle ORM)
- Auth (login/logout, admin/user roles via better-auth)
- Sidebar navigation (desktop) + bottom nav (mobile)
- Theme system (Auto / Light / Dark / OLED)
- i18n German + English
- Dashboard with quick-access tiles
- PWA (manifest, service worker, offline cache)
