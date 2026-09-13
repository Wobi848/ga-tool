#!/bin/sh
# server-update.sh — Production-Update fuer den GA-Tool-Server.
#
# Workflow:
#   1. Aktuelle Version anzeigen
#   2. git pull (danach neu starten, falls dieses Skript selbst dabei war)
#   3. DB-Backup ziehen (Sicherheitsnetz)
#   4. npm ci + db:migrate + build
#   5. systemctl restart
#   6. Health-Check, dann Commit in $STAMP festhalten
#
# Der Stempel in $STAMP ist der Unterschied zwischen "der Code ist aktuell"
# und "das Update ist angekommen". Ein Lauf, der nach dem git pull abbricht,
# laesst den Code aktuell und den Dienst auf dem alten Build zurueck; ohne
# Stempel meldet der naechste Lauf dann "nichts zu tun".
#
# Bricht bei jedem Fehler ab (set -e). DB-Backup bleibt erhalten falls
# was schief geht.

set -e

APP_DIR="${APP_DIR:-/opt/ga-tool}"
# Vorgabe wird nach dem Laden der .env durch DATABASE_URL ersetzt, falls gesetzt.
DB_PATH="${DB_PATH:-/var/lib/ga-tool/local.db}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/ga-tool}"
SERVICE="${SERVICE:-ga-tool}"
# Haelt den Commit fest, mit dem zuletzt ein Lauf vollstaendig durchkam.
STAMP="${STAMP:-/var/lib/ga-tool/.last-deploy}"
# Benutzer, unter dem der Dienst laeuft — siehe ga-tool.service.
RUNAS="${RUNAS:-ga-tool}"
HEALTH_URL="${HEALTH_URL:-http://localhost:3700/api/health}"

# --auto:  kein interaktiver Prompt, beendet sich still wenn nichts zu tun ist
# --force: baut auch dann neu, wenn der Code schon aktuell ist
AUTO=0
FORCE=0
for arg in "$@"; do
	case "$arg" in
	--auto) AUTO=1 ;;
	--force) FORCE=1 ;;
	esac
done

cd "$APP_DIR"

# .env laden. systemd zieht sie ueber EnvironmentFile in den Dienst, dieses
# Skript laeuft aber daneben und sieht sie sonst nicht — db:migrate bricht
# dann mit "DATABASE_URL is not set" ab, nachdem npm ci schon gelaufen ist.
if [ -f "$APP_DIR/.env" ]; then
	set -a
	# shellcheck disable=SC1091
	. "$APP_DIR/.env"
	set +a
fi

# DATABASE_URL gewinnt, wenn vorhanden — sonst laufen Sicherung und Dienst
# auf verschiedene Dateien, und das Backup sichert die falsche.
if [ -n "${DATABASE_URL:-}" ]; then
	DB_PATH=$(echo "$DATABASE_URL" | sed "s|^file:||")
fi

echo "═════════════════════════════════════════════"
echo "  GA-Tool Server-Update"
echo "═════════════════════════════════════════════"
echo

# Schritt 1: aktuelle Version anzeigen
OLD_VERSION=$(grep "APP_VERSION" src/lib/version.ts | sed -E "s/.*'([0-9.]+)'.*/\1/")
echo "Aktuelle Version: v$OLD_VERSION"
echo

# Schritt 2: git fetch + pruefen ob Update vorhanden
echo "▸ Code-Update von GitHub..."
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u})
if [ "$LOCAL" != "$REMOTE" ]; then
	git pull --ff-only
	# git pull hat gerade dieses Skript unter dem laufenden Interpreter
	# ausgetauscht. bash liest Skripte haeppchenweise nach, ab hier waere das
	# Verhalten undefiniert — also einmal mit der frischen Fassung neu starten.
	if [ "${GA_UPDATE_REEXEC:-0}" != "1" ]; then
		echo "  · Skript wurde mitaktualisiert — starte es neu."
		export GA_UPDATE_REEXEC=1
		exec "$0" "$@"
	fi
elif [ "$FORCE" = "1" ]; then
	echo "  · Kein neuer Code — Neubau auf Wunsch (--force)."
elif [ "${GA_UPDATE_REEXEC:-0}" = "1" ]; then
	echo "  · Code frisch gezogen — weiter mit dem Neubau."
elif [ "$(cat "$STAMP" 2>/dev/null)" != "$LOCAL" ]; then
	# Der Code ist aktuell, aber kein Lauf ist damit je durchgekommen: ein
	# frueherer Versuch hat gezogen und dann abgebrochen. Wer nur auf git
	# schaut, meldet hier faelschlich "nichts zu tun" — und laesst einen halb
	# angewandten Stand stehen.
	echo "  · Code ist aktuell, der letzte Lauf kam aber nicht durch — baue neu."
else
	echo "  ✓ Bereits auf neuestem Stand (v$OLD_VERSION) — kein Update noetig."
	if [ "$AUTO" = "1" ]; then exit 0; fi
	echo
	echo "Trotzdem rebuilden? [y/N]"
	read -r CONFIRM
	if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
		echo "Abgebrochen."
		exit 0
	fi
fi
echo

# Schritt 3: DB-Backup ziehen
echo "▸ DB-Backup vor Update..."
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/pre-update-$(date +%Y%m%d-%H%M%S).db"
sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'"
echo "  ✓ Backup gespeichert: $BACKUP_FILE"
echo

# Schritt 4: Install + Migrate + Build
echo "▸ npm ci (Dependencies)..."
npm ci --silent
echo "  ✓ Dependencies installiert"
echo

echo "▸ DB-Migrationen anwenden..."
npm run db:migrate --silent
# Die Migration laeuft als root. SQLite legt dabei -wal und -shm neben der
# Datenbank an; die gehoerten dann root, und der unprivilegierte Dienst
# koennte hinterher nicht mehr schreiben.
if id "$RUNAS" >/dev/null 2>&1; then
	chown -R "$RUNAS:$RUNAS" "$(dirname "$DB_PATH")"
fi
echo

echo "▸ Build..."
npm run build --silent 2>&1 | tail -5
echo "  ✓ Build fertig"
echo

# Schritt 5: Service neustart
echo "▸ Service neustart..."
systemctl restart "$SERVICE"
sleep 2
echo

# Schritt 6: Health-Check
echo "▸ Health-Check..."
HEALTH=$(curl -s -w "\n%{http_code}" "$HEALTH_URL" || echo "fail")
HTTP_CODE=$(echo "$HEALTH" | tail -1)
BODY=$(echo "$HEALTH" | head -n -1)

if [ "$HTTP_CODE" = "200" ]; then
	echo "  ✓ Service antwortet: $BODY"
else
	echo "  ✗ Health-Check fehlgeschlagen (HTTP $HTTP_CODE)"
	echo "    Logs: journalctl -u $SERVICE -n 30 --no-pager"
	echo "    Rollback: cp $BACKUP_FILE $DB_PATH && systemctl restart $SERVICE"
	exit 1
fi
echo

# Erst jetzt — nach bestandenem Health-Check — gilt der Lauf als durchgekommen.
git rev-parse HEAD >"$STAMP"

NEW_VERSION=$(grep "APP_VERSION" src/lib/version.ts | sed -E "s/.*'([0-9.]+)'.*/\1/")
echo "═════════════════════════════════════════════"
if [ "$OLD_VERSION" = "$NEW_VERSION" ]; then
	echo "  ✓ Rebuild fertig: v$NEW_VERSION (keine Version-Aenderung)"
else
	echo "  ✓ Update fertig: v$OLD_VERSION → v$NEW_VERSION"
fi
echo "═════════════════════════════════════════════"
