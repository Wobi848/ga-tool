#!/bin/sh
# server-update.sh — Production-Update fuer den GA-Tool-Server.
#
# Workflow:
#   1. Aktuelle Version anzeigen
#   2. DB-Backup ziehen (Sicherheitsnetz)
#   3. git pull
#   4. npm ci + db:migrate + build
#   5. systemctl restart
#   6. Health-Check + neue Version anzeigen
#
# Bricht bei jedem Fehler ab (set -e). DB-Backup bleibt erhalten falls
# was schief geht.

set -e

APP_DIR="${APP_DIR:-/opt/ga-tool}"
DB_PATH="${DB_PATH:-/var/lib/ga-tool/local.db}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/ga-tool}"
SERVICE="${SERVICE:-ga-tool}"
HEALTH_URL="${HEALTH_URL:-http://localhost:3700/api/health}"

cd "$APP_DIR"

echo "═════════════════════════════════════════════"
echo "  GA-Tool Server-Update"
echo "═════════════════════════════════════════════"
echo

# Schritt 1: aktuelle Version anzeigen
OLD_VERSION=$(grep "APP_VERSION" src/lib/version.ts | sed -E "s/.*'([0-9.]+)'.*/\1/")
echo "Aktuelle Version: v$OLD_VERSION"
echo

# Schritt 2: DB-Backup ziehen
echo "▸ DB-Backup vor Update..."
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/pre-update-$(date +%Y%m%d-%H%M%S).db"
sqlite3 "$DB_PATH" ".backup '$BACKUP_FILE'"
echo "  ✓ Backup gespeichert: $BACKUP_FILE"
echo

# Schritt 3: git pull
echo "▸ Code-Update von GitHub..."
git fetch origin
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse @{u})
if [ "$LOCAL" = "$REMOTE" ]; then
	echo "  ✓ Bereits auf neuestem Stand."
	# Trotzdem rebuilden, falls .env oder System-Pakete geaendert wurden
	echo
	echo "Trotzdem rebuilden? [y/N]"
	read -r CONFIRM
	if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
		echo "Abgebrochen."
		exit 0
	fi
else
	git pull --ff-only
fi
echo

# Schritt 4: Install + Migrate + Build
echo "▸ npm ci (Dependencies)..."
npm ci --silent
echo "  ✓ Dependencies installiert"
echo

echo "▸ DB-Migrationen anwenden..."
npm run db:migrate --silent
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

NEW_VERSION=$(grep "APP_VERSION" src/lib/version.ts | sed -E "s/.*'([0-9.]+)'.*/\1/")
echo "═════════════════════════════════════════════"
if [ "$OLD_VERSION" = "$NEW_VERSION" ]; then
	echo "  ✓ Rebuild fertig: v$NEW_VERSION (keine Version-Aenderung)"
else
	echo "  ✓ Update fertig: v$OLD_VERSION → v$NEW_VERSION"
fi
echo "═════════════════════════════════════════════"
