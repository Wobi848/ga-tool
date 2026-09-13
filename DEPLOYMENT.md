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

## Reverse Proxy

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
Skript. Auf CT 101 lief er auch wirklich — seit dem 31.08.2026, täglich um
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

## Updates ausrollen

```bash
cd /opt/ga-tool
sudo systemctl stop ga-tool
git pull
npm ci
DATABASE_URL=/var/lib/ga-tool/local.db npm run db:migrate
npm run build
sudo systemctl start ga-tool
```

**Vor jedem Update:** Backup ziehen (siehe oben).

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

- [ ] Reverse Proxy terminiert HTTPS (Let's Encrypt o.ä.)
- [x] DB liegt in persistentem Volume mit täglichem Backup — **und ein Restore
      wurde einmal durchgespielt.** Eine Sicherung, die nie zurückgespielt
      wurde, ist eine Vermutung. Am 13.09.2026 auf CT 101 durchgespielt, siehe
      [Sicherung und Restore](#sicherung-und-restore)
- [x] systemd-Unit hat `ProtectSystem=strict`, läuft als unprivilegierter User
      — seit 13.09.2026 auf CT 101. Nachgeprüft: der Prozess läuft als
      `ga-tool`, und ein `POST /api/track` erzeugt weiterhin eine Zeile in
      `analytics_event` (572 → 573). Ohne diesen Schreibtest wäre nur belegt,
      dass der Dienst startet
- [ ] Health-Endpoint (`/api/health`) ist im Monitoring eingehängt — er liefert
      **503** bei nicht erreichbarer Datenbank, darauf lässt sich alarmieren
- [ ] CI ist grün (`lint`, `check`, `test`, `e2e`)
