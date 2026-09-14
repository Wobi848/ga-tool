# Deployment

Anleitung zum Deployen des GA-Tools auf einem eigenen Server (Linux, Node 20+).

## Voraussetzungen

- **Node.js 20+** (siehe `.nvmrc`)
- **Reverse Proxy** mit HTTPS (nginx, Caddy, Traefik) — die App spricht HTTP intern auf einem Port
- **Persistenter Storage** für `local.db` (SQLite-Datei mit User-/Analytics-Daten)
- **Cron oder Timer** (optional) für Analytics-Rollup und Backups

## Erstinstallation

### 1. Code & Abhängigkeiten

```bash
git clone <repo> /opt/ga-tool
cd /opt/ga-tool
npm ci   # devDeps werden zum Build gebraucht (vite, @sveltejs/kit)
```

> Optional: nach erfolgreichem Build mit `npm prune --omit=dev` die devDeps wieder entfernen, um Platz zu sparen. Vor dem nächsten Update dann wieder `npm ci`.

### 2. Env-Variablen

`/opt/ga-tool/.env` anlegen (Datei niemals committen):

```bash
# SQLite-Pfad — persistenten Ordner waehlen, nicht /tmp
DATABASE_URL=/var/lib/ga-tool/local.db

# Origin der Produktiv-URL — Better-Auth prueft CSRF dagegen
ORIGIN=https://ga.deinedomain.ch

# Auth-Secret — 32+ zufaellige Zeichen (NIE wiederverwenden!)
BETTER_AUTH_SECRET=<openssl rand -hex 32>

# Email-Verifikation bei Registrierung (optional)
# Ohne Key: User koennen sich direkt nach Registrierung einloggen
RESEND_API_KEY=
RESEND_FROM=GA Tool <noreply@deinedomain.ch>
```

**Secret erzeugen:**

```bash
openssl rand -hex 32
```

### 3. Datenbank initialisieren

```bash
sudo mkdir -p /var/lib/ga-tool
sudo chown $(whoami) /var/lib/ga-tool

# Wendet alle SQL-Migrationen aus drizzle/ an, idempotent
DATABASE_URL=/var/lib/ga-tool/local.db npm run db:migrate
```

**Bei Migration einer bestehenden DB** (die mit `db:push` erstellt wurde, vor Einführung der Migrations):

```bash
DATABASE_URL=/var/lib/ga-tool/local.db npm run db:baseline
```

Das markiert vorhandene Migrationen als angewendet, ohne sie auszuführen. Danach läuft `db:migrate` wie gewohnt.

### 4. Build

```bash
npm run build
```

Output: `build/index.js` (Node-Server) + Static-Assets.

### 5. Erststart

```bash
node build/index.js
```

Lauscht auf `0.0.0.0:3000` (Port via `PORT=` änderbar). Mit `curl http://localhost:3000/api/health` verifizieren.

### 6. Ersten System-Admin anlegen

System-Admin wird automatisch vergeben:

- **Frische Instanz** (DB leer): der erste registrierte User wird `systemadmin` — Bootstrap-Hook in [src/lib/server/auth.ts](src/lib/server/auth.ts).
- **Bestehende Instanz** (schon Admins, aber noch kein systemadmin): beim nächsten Server-Start wird der **älteste Admin** automatisch hochgestuft — Self-Healing in [src/lib/server/bootstrap.ts](src/lib/server/bootstrap.ts). Sichtbar im Service-Log: `[bootstrap] Promoted <email> to systemadmin`.

**Frische Instanz — Schritte:**

1. Im Browser registrieren → wird zum System-Admin.

2. Verifizieren:

   ```bash
   apt install -y sqlite3   # falls noch nicht da
   sqlite3 /var/lib/ga-tool/local.db "SELECT email, role FROM user;"
   # erwartet: deine@email.ch|systemadmin
   ```

3. Weitere User können sich normal registrieren und werden vom System-Admin im `/admin`-Panel zu `admin` hochgestuft.

### Recovery: System-Admin verloren

Der System-Admin lässt sich aus der App heraus **nicht** ändern, sperren oder löschen — Schutz gegen versehentliches Selbst-Aussperren. Wenn du den Account aber wirklich verloren hast (Passwort weg + kein Email-Reset konfiguriert):

```bash
# Variante A — bestehendem User systemadmin geben
sqlite3 /var/lib/ga-tool/local.db \
  "UPDATE user SET role='systemadmin' WHERE email='neue@email.ch';"

# Variante B — alten Account neutralisieren, dann frisch registrieren
sqlite3 /var/lib/ga-tool/local.db \
  "DELETE FROM user WHERE email='alte@email.ch';"
# danach im Browser neu registrieren → bekommt systemadmin automatisch,
# falls keine anderen User mehr existieren

# Variante C — Passwort direkt zuruecksetzen (Hash via Better-Auth-CLI generieren)
# bevorzugt ueber die "Passwort zuruecksetzen"-Funktion eines zweiten Admins
```

Backup vorher empfohlen: `cp /var/lib/ga-tool/local.db /var/lib/ga-tool/local.db.bak`

## Sicherung und Restore

Der Timer `ga-tool-backup.timer` zieht täglich eine Kopie nach
`/var/backups/ga-tool/daily-*.db` und hält sie 30 Tage. Das Skript liegt als
[`deploy/ga-tool-backup.sh`](deploy/ga-tool-backup.sh) im Repo.

Es nimmt `.backup` statt `cp`: SQLite darf währenddessen weiter beschrieben
werden, und die Kopie ist in sich schlüssig. Ein `cp` auf eine offene Datenbank
liefert im Zweifel eine Datei, die erst beim Zurückspielen als kaputt auffällt.
Danach wird die Kopie geöffnet — `integrity_check` **und** die Tabellenzahl,
denn eine formal heile, aber leere Datei bestünde die erste Prüfung allein.

Einrichten:

```bash
sudo install -m 644 /opt/ga-tool/deploy/ga-tool-backup.service \
                    /opt/ga-tool/deploy/ga-tool-backup.timer /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now ga-tool-backup.timer
sudo systemctl start ga-tool-backup.service   # erster Lauf, nicht bis morgen warten
journalctl -u ga-tool-backup -n 5
```

### Zurückspielen

```bash
sudo systemctl stop ga-tool
sudo cp -a /var/lib/ga-tool/local.db /root/vor-restore.db        # Rückweg
sudo cp /var/backups/ga-tool/daily-JJJJMMTT-HHMMSS.db /var/lib/ga-tool/local.db
sudo chown ga-tool:ga-tool /var/lib/ga-tool/local.db
sudo chmod 640 /var/lib/ga-tool/local.db
sudo systemctl start ga-tool
curl -s localhost:3700/api/health
```

Der `chown` ist keine Kosmetik: als root zurückgespielt gehört die Datei danach
root, und der unprivilegierte Dienst kann nicht mehr schreiben. Lesen kann er
noch — `/api/health` meldet also weiter `ok`, während jedes Speichern still
fehlschlägt.

### Was am 13.09.2026 tatsächlich geprüft wurde

Nicht nur, dass die Datei zurückkopierbar ist:

1. Zeilenstand notiert (573), eine Markierungszeile eingefügt (574)
2. Dienst gestoppt, Sicherung über die Live-Datenbank gespielt, Dienst gestartet
3. Nachgesehen: Markierung weg, wieder 573 Zeilen, Benutzerkonto vorhanden,
   `/api/health` 200 — der Dienst lief also wirklich auf der zurückgespielten
   Datei und nicht weiter auf der alten
4. Livestand aus der Sicherheitskopie zurückgeholt, Markierung gelöscht,
   wieder 573 Zeilen

Der dritte Punkt ist der eigentliche: ohne Markierung hätte derselbe Ablauf
auch dann bestanden, wenn gar nichts ersetzt worden wäre.

## Systemd-Unit (Production)

Die Unit liegt als [`deploy/ga-tool.service`](deploy/ga-tool.service) im Repo —
Wort fuer Wort die, die auf dem Server laeuft. Vorher stand hier eine Abschrift,
und die war irgendwann etwas anderes als die Wirklichkeit: die Doku zeigte einen
unprivilegierten Dienst auf Port 3000, tatsaechlich lief er als `root` auf 3700.
Darum steht sie jetzt nur noch an einer Stelle.

Der Dienst laeuft unter dem Systembenutzer `ga-tool` und darf ausser
`/var/lib/ga-tool` nichts beschreiben. Die `.env` gehoert bewusst **root** und
bleibt auf `600`: `systemd` liest sie, bevor es die Rechte abgibt — der
Dienstbenutzer selbst kommt an die Geheimnisse also nicht heran.

Einrichten:

```bash
sudo useradd --system --no-create-home --home-dir /var/lib/ga-tool \
     --shell /usr/sbin/nologin ga-tool
sudo chown -R ga-tool:ga-tool /var/lib/ga-tool
sudo chmod 750 /var/lib/ga-tool
# /opt/ga-tool bleibt root — der Dienst liest dort nur, und
# server-update.sh baut dort als root.
sudo install -m 644 /opt/ga-tool/deploy/ga-tool.service /etc/systemd/system/
sudo systemd-analyze verify /etc/systemd/system/ga-tool.service
sudo systemctl daemon-reload
sudo systemctl enable --now ga-tool
```

Pruefen, dass die Haertung nicht nur dasteht, sondern greift:

```bash
# laeuft er wirklich unprivilegiert?
ps -o user=,cmd= -p "$(systemctl show ga-tool -p MainPID --value)"
# kommt ein Schreibvorgang durch die App noch durch?
sqlite3 /var/lib/ga-tool/local.db "select count(*) from analytics_event;"
curl -s -X POST localhost:3700/api/track -H 'Content-Type: application/json' \
     -d '{"path":"/rechner/taupunkt"}'
sqlite3 /var/lib/ga-tool/local.db "select count(*) from analytics_event;"  # +1
systemd-analyze security ga-tool
```

Der Health-Endpunkt liest nur. Er bestaetigt die Haertung also **nicht** — dazu
braucht es den Schreibtest oben. `MemoryDenyWriteExecute` fehlt mit Absicht: es
bricht den JIT von Node.

Logs: `journalctl -u ga-tool -f`

## HTTPS

Seit 13.09.2026 in Betrieb: **`https://host1.tail4ad0d6.ts.net`**, ausgeliefert
von `tailscale serve` auf host1 (`192.168.178.2`), Zertifikat von Let's Encrypt.

```bash
# auf host1, nicht im Container
tailscale serve --bg --https=443 http://192.168.178.68:3700
tailscale serve status
```

Die Konfiguration liegt in `/var/lib/tailscale/tailscaled.state` und übersteht
einen Neustart. Voraussetzung war einmalig, in der Tailscale-Weboberfläche unter
_DNS → HTTPS Certificates_ die Zertifikate freizuschalten.

Im Container selbst geht es nicht: CT 102 ist unprivilegiert und hat kein
`/dev/net/tun`. Das nachzurüsten verlangt eine Änderung der
Container-Konfiguration und einen Neustart — und in CT 102 steckt auch AdGuard
Home, der DNS-Server des Hauses.

### Eine kanonische Adresse, nicht zwei

`ORIGIN` steht auf der HTTPS-Adresse. Die LAN-Adresse
`http://192.168.178.68:3700` funktioniert weiter, aber **ohne Anmeldung**:

| über                              | Nachschlagen, Rechner, Objekte, Checklisten | Anmeldung, Favoriten-Abgleich, Admin |
| --------------------------------- | ------------------------------------------- | ------------------------------------ |
| `https://host1.tail4ad0d6.ts.net` | ✓                                           | ✓                                    |
| `http://192.168.178.68:3700`      | ✓                                           | ✗ (403)                              |

Das war ursprünglich anders geplant — beide Adressen sollten alles können. Beim
Nachmessen kam heraus, dass das nicht geht:

- `tailscale serve` schickt `x-forwarded-proto: https` und `x-forwarded-host`
  mit. Damit liesse sich die Herkunft über `PROTOCOL_HEADER`/`HOST_HEADER`
  ableiten — aber `adapter-node` nimmt bei **fehlendem** `x-forwarded-proto`
  `https` an. Ein direkter HTTP-Aufruf bekäme also eine falsche Herkunft.
- `csrf.trustedOrigins` (SvelteKit 2.59) könnte die Formularprüfung für die
  LAN-Adresse öffnen. Es hilft trotzdem nicht: `better-auth` leitet aus
  `baseURL` ab, dass Cookies `Secure` sein müssen — und ein `http`-Ursprung darf
  ein `Secure`-Cookie nicht speichern. Das Formular sähe dann aus, als
  funktioniere es, während die Sitzung still verfällt. **Ein klarer 403 ist
  besser als etwas, das so tut als ob.**

Das kostet weniger, als es klingt: die App läuft ohne Anmeldung
(`(app)/+layout.server.ts` gibt dann `{ user: null }` zurück), und Objekte,
Durchläufe und Checklisten liegen ohnehin im Browser. Verzichtbar sind auf der
LAN-Adresse nur Favoriten-Abgleich und Admin.

Und es ist ein Gewinn: vorher lief die Anmeldung über **HTTP durchs LAN**, das
Passwort also im Klartext übers Netz. Jetzt nur noch über TLS.

### Nachgeprüft

```
https  POST /api/auth/sign-in/email  → 401 "Invalid email or password"
https  POST /login?/login            → 200, "E-Mail oder Passwort falsch"
http   POST /login?/login            → 403  (Herkunft abgelehnt, wie vorgesehen)
http   GET  /, /rechner/…, /objekte  → 200
```

Der erste Wert ist der wichtige: eine **fachliche** Ablehnung, keine
Herkunfts-Ablehnung — die Anmeldung läuft also wirklich durch.

### Falls doch beide Adressen alles können sollen

Dann braucht es einen Proxy auf CT 102, der pro Eingang die richtigen
`X-Forwarded-*`-Kopfzeilen setzt, und HTTPS auch im LAN — sonst bleibt das
Cookie-Problem. Aufwand und Nutzen stehen dafür bisher nicht im Verhältnis.

## Reverse Proxy (Vorlagen)

Die folgenden Vorlagen sind **nicht in Betrieb** — sie stehen hier für den Fall,
dass doch nginx oder Caddy statt Tailscale genommen wird. Die Portangaben darin
sind auf 3000 gemünzt; auf CT 102 läuft der Dienst auf **3700**.

### nginx

`/etc/nginx/sites-available/ga-tool`:

```nginx
server {
    listen 443 ssl http2;
    server_name ga.deinedomain.ch;

    ssl_certificate     /etc/letsencrypt/live/ga.deinedomain.ch/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ga.deinedomain.ch/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Health-Check ohne Auth/Logs
    location = /api/health {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        access_log off;
    }
}

server {
    listen 80;
    server_name ga.deinedomain.ch;
    return 301 https://$host$request_uri;
}
```

### Caddy (einfacher)

`Caddyfile`:

```
ga.deinedomain.ch {
    reverse_proxy 127.0.0.1:3000
}
```

Caddy macht HTTPS via Let's Encrypt automatisch.

## Health-Check

`GET /api/health` liefert:

```json
{ "status": "ok", "checks": { "database": "ok" }, "timestamp": "..." }
```

Status 200 wenn alles ok, 503 bei DB-Problemen. Geeignet für:

- Load-Balancer Health-Probes
- Monitoring (Uptime-Kuma, Healthchecks.io, Statuspage)
- nginx `proxy_next_upstream` Fallover

## Backups

Siehe [Sicherung und Restore](#sicherung-und-restore).

Hier stand vorher ein zweiter, abweichender Vorschlag als `/etc/cron.daily`-
Skript. Auf CT 102 lief er auch wirklich — seit dem 31.08.2026, täglich um
06:35, ohne Prüfung der Kopie. Abgelöst am 13.09.2026; seine Sicherungen wurden
auf das neue Namensmuster gebracht und bleiben erhalten.

Er musste weg, nicht nur der Ordnung halber: sein Aufräumbefehl lautete
`find /var/backups/ga-tool -name '*.db' -mtime +30 -delete` und hätte damit
auch die `pre-update-*`-Sicherungen und die des neuen Timers mitgenommen.

## Analytics-Rollup (optional)

Bei Produktivnutzung wachsen `analytics_event`-Rohdaten unbegrenzt. Der Admin-UI hat einen "Jetzt aggregieren"-Button. Für automatisierten Lauf:

`/etc/cron.daily/ga-tool-rollup`:

```bash
#!/bin/sh
# Loggt einen System-User mit Admin-Rolle ein und triggert den Rollup
# Alternative: kleines Node-Script das rollupAnalytics() direkt aufruft.
# TODO: dedizierter Service-Token-Endpoint ist nicht implementiert.
```

**Aktueller Stand:** Rollup ist nur via Admin-UI verfügbar. Bei höherem Traffic kann ein API-Endpoint mit Service-Token nachgerüstet werden.

## Offline prüfen

```bash
npm run build && npm run offline-check
```

Das Skript startet den Server auf Port 4199, lässt den Service Worker die
Kontrolle übernehmen, **schaltet den Server dann wirklich ab** und ruft sieben
Pfade auf. Rückgabewert 1, wenn einer davon nicht das zeigt, was er soll.

Warum ein eigenes Skript und kein Playwright-Test: `context.setOffline(true)`
wirkt nur auf die Seite, **nicht auf den Service Worker**. Der holt weiter aus
dem Netz, die Seite lädt, und der Test besteht — ohne je offline gewesen zu
sein. Genau das ist am 13.09.2026 passiert.

Was ohne Netz funktioniert, und was nicht:

| aufgerufen                                          | Ergebnis                               |
| --------------------------------------------------- | -------------------------------------- |
| Startseite, Rechner-, Wissens-, Konverterliste usw. | vorgewärmt, funktioniert               |
| alle 21 Rechner                                     | vorgewärmt, funktionieren              |
| jede schon besuchte Seite                           | funktioniert                           |
| Favoriten und zuletzt Gelesenes                     | vorgewärmt, bis zu 30 Seiten           |
| Wissensartikel, sonst nie geöffnet                  | Auffangseite mit Liste des Verfügbaren |

Alle 122 Artikel vorzuwärmen wären 122 Anfragen bei jedem Start. Stattdessen
nur die persönlichen: Favoriten zuerst, dann zuletzt Gelesenes, höchstens 30.

## Öffentlich erreichbar machen (Funnel)

**Seit 14.09.2026 in Betrieb.** Das Portal ist unter
`https://host1.tail4ad0d6.ts.net` öffentlich erreichbar, damit es auch von einem
Rechner aus geht, auf dem sich Tailscale nicht installieren lässt.

Abschalten: `tailscale funnel --https=443 off` — danach kommt man wieder nur
aus dem Tailnet hinein.

### Was Funnel veröffentlicht, und was nicht

Genau ein Ziel: `https://host1.tail4ad0d6.ts.net/` → `http://192.168.178.68:3700`.
`tailscaled` nimmt die Verbindung an und reicht sie nur dorthin weiter.

Nicht erreichbar bleiben Node-RED (1880), AdGuard (80/53), SSH (22),
ottosAPI-leech (3069), Redis und Postfix (nur localhost) sowie die
Proxmox-Oberfläche auf host1 (8006). Das von host1 verteilte Subnetz
`192.168.178.0/24` ist eine **Tailnet**-Funktion — Funnel-Verkehr endet am Proxy
und kann es nicht benutzen. Eine Portfreigabe am Router ist nicht nötig: host1
baut die Verbindung nach aussen auf.

### Vorher absichern

1. **Registrierung schliessen.** `REGISTRIERUNG_OFFEN=false` in der `.env`.
   Sonst kann sich jeder ein Konto anlegen. Die Prüfung sitzt in der
   `register`-Action, nicht nur in der Oberfläche — ein abgeschickter
   Formularaufruf umgeht jede versteckte Schaltfläche. Ausnahme: ist noch kein
   Konto vorhanden, geht Registrierung immer, sonst sperrt sich eine frische
   Installation selbst aus.
2. **Echte Absenderadresse durchreichen.** `VERTRAUTER_PROXY=192.168.178.2`.
   Ohne das meldet `getClientAddress()` für **jeden** Aufruf durch den Tunnel
   dieselbe Adresse, und die Anmeldebremse (5 Versuche / 5 min) gilt global:
   fünf falsche Versuche von irgendwoher sperren den Besitzer aus, beliebig oft
   wiederholbar.

   **Nicht** `ADDRESS_HEADER=x-forwarded-for` setzen: dann _wirft_
   `getClientAddress()`, sobald die Kopfzeile fehlt — und bei einem direkten
   Aufruf im LAN fehlt sie. Nachgelesen in
   `@sveltejs/adapter-node/files/handler.js`. Stattdessen `$lib/server/clientIp`,
   das der Kopfzeile nur glaubt, wenn die Anfrage wirklich vom eigenen Tunnel
   kommt.

### Einschalten

```bash
# einmalig im Tailnet freischalten (Weboberfläche):
#   https://login.tailscale.com/f/funnel?node=<node>
tailscale funnel --bg --https=443 http://192.168.178.68:3700
tailscale funnel status          # "Funnel on" statt "tailnet only"
```

Abschalten: `tailscale funnel --https=443 off` — danach ist sofort wieder zu.

### Was gemessen wurde, bevor umgestellt wurde

Mit einem Echo-Server hinter Funnel, über den öffentlichen Weg abgerufen:

```
x-forwarded-for: 213.55.241.32      ← echte Adresse des Aufrufers
x-forwarded-proto: https
tailscale-funnel-request: ?1        ← Kennzeichen für Verkehr von aussen
```

Damit trägt `VERTRAUTER_PROXY=192.168.178.2` die richtige Adresse, und die
Bremse zählt je Aufrufer. Nachgewiesen am laufenden System: fünf Fehlversuche
von aussen, der sechste mit 429 gebremst — derselbe Versuch von einem anderen
Absender geht unverändert durch.

Die Registrierung ist an **beiden** Türen zu (`npm run registrierung-check`),
und von aussen ist nur die App erreichbar: 1880, 8006 und 22 antworten nicht.

### Eigener Container seit 14.09.2026

Bis zur Veröffentlichung lief das Portal auf CT 101 — zusammen mit AdGuard
Home, dem DNS fürs ganze Haus, und Node-RED samt dessen Zugangsdaten. Solange
nur ins Tailnet kam, wer ohnehin Zugang hatte, war das vertretbar. Für eine
Seite im offenen Netz ist es das nicht: Würde die App übernommen, sässe ein
Angreifer neben dem Haus-DNS.

Deshalb **CT 102 `ga-tool`** (`192.168.178.68`), Debian 12, 1,5 GB, nur für
das Portal. CT 101 wurde im Gegenzug von 2 GB auf 1 GB gesetzt — unterm Strich
bleibt der Speicherbedarf auf host1 gleich.

Auf CT 101 liegt die alte Installation noch, nur abgeschaltet
(`systemctl disable ga-tool ga-tool-backup.timer`, Cron-Eintrag entfernt). Sie
ist der Rückweg, falls am neuen Container etwas klemmt; nach ein paar
störungsfreien Wochen kann sie weg.

## Monitoring

Die Überwachung sitzt in **Home Assistant auf VM 100** (`192.168.178.66`), nicht
im Node-RED auf CT 102. Das ist Absicht: fiele der Container aus, bliebe eine
Überwachung auf demselben Container stumm — also genau dann, wenn sie gebraucht
wird.

In `/config/configuration.yaml`:

```yaml
rest:
  - resource: http://192.168.178.68:3700/api/health
    scan_interval: 120
    timeout: 10
    binary_sensor:
      - name: 'GA Tool erreichbar'
        unique_id: ga_tool_erreichbar
        device_class: connectivity
        value_template: "{{ value_json.status == 'ok' }}"
```

Dazu zwei Automationen in `automations.yaml`:

- **`rpo_ga_tool_waechter`** meldet über Telegram, wenn der Sensor zehn Minuten
  lang nicht `on` ist. Zehn Minuten, weil der Update-Cron alle fünf Minuten
  läuft und ein Neustart sonst einen Alarm auslösen würde. Es wird sowohl auf
  `off` als auch auf `unavailable` reagiert — bei 503 steht `degraded` im Rumpf,
  bei einem toten Dienst wird die Entität `unavailable`, und welchen Weg die
  REST-Integration nimmt, soll nicht darüber entscheiden, ob alarmiert wird
- **`rpo_ga_tool_wieder_da`** gibt Entwarnung, aber nur wenn vorher wirklich
  alarmiert wurde (`input_boolean.ga_tool_alarm_gesendet`). Sonst meldete jeder
  Neustart eine Entwarnung, die niemand erwartet hat

Der Health-Endpunkt **liest nur**. Er bestätigt also nicht, dass der Dienst noch
schreiben kann — dafür siehe den Schreibtest bei der
[systemd-Unit](#systemd-unit-production).

## Updates ausrollen

```bash
sudo /opt/ga-tool/scripts/server-update.sh          # fragt nach, wenn nichts neu ist
sudo /opt/ga-tool/scripts/server-update.sh --auto   # still, fuer den Cron-Job
sudo /opt/ga-tool/scripts/server-update.sh --force  # baut auch ohne neuen Code
```

Das Skript zieht ein DB-Backup, holt den Code, migriert, baut, startet neu und
prüft den Health-Endpunkt. Die Handgriffe von früher stehen darunter, falls
etwas klemmt.

Auf CT 102 läuft es per Cron **alle fünf Minuten**:

```
*/5 * * * * /opt/ga-tool/scripts/server-update.sh --auto >> /var/log/ga-tool-update.log 2>&1
```

Daraus folgen drei Dinge, die im Skript stehen und beim Ändern nicht verloren
gehen dürfen:

- **Eine Sperre** (`flock` auf `/var/lock/ga-tool-update.lock`). Ein `npm ci`,
  das `better-sqlite3` aus dem Quellcode übersetzt, dauert länger als fünf
  Minuten. Am 13.09.2026 liefen dadurch zwei Läufe gleichzeitig: der ältere
  startete den Dienst neu, während der jüngere `node_modules` gerade neu
  auslegte — der Dienst fand seine native SQLite-Bindung nicht und blieb unten
- **`npm ci` nur bei geändertem `package-lock.json`.** Es räumt `node_modules`
  jedes Mal ab; ohne Not ist das minutenlang ein Dienst ohne Abhängigkeiten
- **Ein Stempel** in `/var/lib/ga-tool/.last-deploy` mit dem zuletzt
  vollständig ausgerollten Commit. Ohne ihn hängt „gibt es etwas zu tun" allein
  an git — und ein Lauf, der nach dem `git pull` abbricht, lässt den Dienst auf
  dem alten Build stehen, während der nächste `--auto`-Lauf „bereits auf
  neuestem Stand" meldet

Vor dem Neustart prüft das Skript, ob sich eine SQLite-Datenbank öffnen lässt.
Ein blosses `require('better-sqlite3')` genügt dafür nicht — das lädt nur den
JavaScript-Teil und meldet auch ohne `better_sqlite3.node` Erfolg.

### Von Hand, wenn das Skript nicht weiterhilft

```bash
cd /opt/ga-tool
sudo systemctl stop ga-tool
git pull
npm ci
set -a; . /opt/ga-tool/.env; set +a      # sonst: "DATABASE_URL is not set"
npm run db:migrate
npm run build
sudo chown -R ga-tool:ga-tool /var/lib/ga-tool   # Migration lief als root
sudo systemctl start ga-tool
```

**Vor jedem Update:** Backup ziehen (siehe [Sicherung und
Restore](#sicherung-und-restore)).

## Troubleshooting

### `Origin not allowed` / Login schlägt fehl

`ORIGIN` in `.env` muss exakt zur produktiven URL passen (inkl. Protokoll, ohne Trailing-Slash). Bei Proxy: HTTPS-Origin setzen, nicht Backend-HTTP.

### `SQLITE_CANTOPEN` beim Start

DB-Pfad existiert nicht oder keine Schreibrechte. Prüfen:

```bash
ls -la /var/lib/ga-tool/
sudo -u ga-tool touch /var/lib/ga-tool/test && rm /var/lib/ga-tool/test
```

### Migration schlägt fehl mit "table already exists"

Bestehende DB wurde nie über Migrations versioniert. Erste Migration als baseline markieren:

```bash
DATABASE_URL=/var/lib/ga-tool/local.db npm run db:baseline
```

### Weitere Admin-User nachträglich

Gleiches Pattern wie beim Erststart, siehe [Schritt 6](#6-ersten-admin-user-anlegen).

## Sicherheits-Checkliste vor Go-Live

**Das meiste davon prüft `npm run preflight` selbst.** Ein Haken, den ein
Mensch setzt, sagt nur, dass jemand hingeschaut hat — nicht, dass es stimmt.

```bash
npm run preflight            # lokal
npm run preflight -- --prod  # auf dem Zielsystem, strenger
```

Automatisch geprüft:

- `BETTER_AUTH_SECRET` ist 32+ Zeichen und kein Platzhalter
- `.env` steht auf `chmod 600` und ist nicht versioniert
- `ORIGIN` ist eine HTTPS-URL _(lokal nur Warnung, mit `--prod` Fehler)_
- `DATABASE_URL` ist gesetzt und zeigt nicht in `static/` oder `build/client/`
- keine `.db`/`.sqlite` ist versioniert
- Arbeitsverzeichnis ist sauber _(mit `--prod` Fehler)_
- Health-Endpunkt existiert
- `package.json` trägt eine echte Version, nicht mehr `0.0.1`
- `npm audit` meldet keine Lücke der Stufe _high_

Von Hand zu erledigen, weil es am Zielsystem hängt:

- [x] Reverse Proxy terminiert HTTPS — seit 13.09.2026 über `tailscale serve`
      auf host1, Zertifikat von Let's Encrypt, siehe [HTTPS](#https). `ORIGIN`
      ist die kanonische HTTPS-Adresse; die LAN-Adresse bleibt ohne Anmeldung
      nutzbar
- [x] DB liegt in persistentem Volume mit täglichem Backup — **und ein Restore
      wurde einmal durchgespielt.** Eine Sicherung, die nie zurückgespielt
      wurde, ist eine Vermutung. Am 13.09.2026 auf CT 102 durchgespielt, siehe
      [Sicherung und Restore](#sicherung-und-restore)
- [x] systemd-Unit hat `ProtectSystem=strict`, läuft als unprivilegierter User
      — seit 13.09.2026 auf CT 102. Nachgeprüft: der Prozess läuft als
      `ga-tool`, und ein `POST /api/track` erzeugt weiterhin eine Zeile in
      `analytics_event` (572 → 573). Ohne diesen Schreibtest wäre nur belegt,
      dass der Dienst startet
- [x] Health-Endpoint (`/api/health`) ist im Monitoring eingehängt — er liefert
      **503** bei nicht erreichbarer Datenbank, darauf lässt sich alarmieren.
      Seit 13.09.2026 über Home Assistant, siehe [Monitoring](#monitoring)
- [x] CI ist grün (`lint`, `check`, `test`, `e2e`) — Stand 13.09.2026:
      Prettier und ESLint sauber, `svelte-check` 1659 Dateien ohne Fehler oder
      Warnung, **773 Tests** in 38 Dateien, **17 e2e** (1 übersprungen)
