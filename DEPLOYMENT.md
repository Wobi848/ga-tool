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
npm ci --omit=dev
```

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

## Systemd-Unit (Production)

`/etc/systemd/system/ga-tool.service`:

```ini
[Unit]
Description=GA Tool
After=network.target

[Service]
Type=simple
User=ga-tool
WorkingDirectory=/opt/ga-tool
EnvironmentFile=/opt/ga-tool/.env
Environment=NODE_ENV=production
Environment=PORT=3000
ExecStart=/usr/bin/node build/index.js
Restart=on-failure
RestartSec=5
StandardOutput=journal
StandardError=journal

# Hardening
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/ga-tool

[Install]
WantedBy=multi-user.target
```

Aktivieren:

```bash
sudo useradd -r -s /bin/false ga-tool
sudo chown -R ga-tool:ga-tool /opt/ga-tool /var/lib/ga-tool
sudo systemctl daemon-reload
sudo systemctl enable --now ga-tool
sudo systemctl status ga-tool
```

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

SQLite ist eine einzelne Datei — Backup ist ein `cp`:

```bash
#!/bin/sh
# /etc/cron.daily/ga-tool-backup
set -e
DB=/var/lib/ga-tool/local.db
DEST=/var/backups/ga-tool
mkdir -p "$DEST"
# SQLite-Online-Backup (Konsistent bei laufendem Server)
sqlite3 "$DB" ".backup '$DEST/ga-tool-$(date +%F).db'"
# Behalte 30 Tage
find "$DEST" -name 'ga-tool-*.db' -mtime +30 -delete
```

`sudo chmod +x /etc/cron.daily/ga-tool-backup`

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
npm ci --omit=dev
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

### Admin-User erstellen

Per Default ist die erste Registrierung ein normaler User. Admin manuell setzen:

```bash
sqlite3 /var/lib/ga-tool/local.db \
  "UPDATE user SET role='admin' WHERE email='deine@email.ch';"
```

Danach erscheint `/admin/analytics` für diesen User.

## Sicherheits-Checkliste vor Go-Live

- [ ] `BETTER_AUTH_SECRET` ist 32+ Zeichen lang und einmalig generiert
- [ ] `.env` ist `chmod 600` und gehört dem Service-User
- [ ] `ORIGIN` ist die korrekte HTTPS-URL
- [ ] DB liegt in persistentem Volume mit täglichem Backup
- [ ] Reverse Proxy macht HTTPS (Let's Encrypt o.ä.)
- [ ] `local.db` ist NICHT im Web-Document-Root erreichbar
- [ ] systemd-Unit hat `ProtectSystem=strict`, läuft als unprivilegierter User
- [ ] Health-Endpoint ist im Monitoring eingehängt
- [ ] CI ist grün (`lint`, `check`, `test`, `e2e`)
