#!/bin/sh
# ga-tool-backup.sh — taegliche Sicherung der Datenbank.
#
# Nimmt bewusst ".backup" und nicht cp: SQLite darf waehrenddessen weiter
# beschrieben werden, und die Kopie ist in sich schluessig. Ein cp auf eine
# offene Datenbank liefert im Zweifel eine Datei, die erst beim Zurueckspielen
# als kaputt auffaellt.
#
# Danach wird die Kopie geprueft. Eine Sicherung, die niemand aufmacht, ist
# eine Vermutung.

set -e

DB_PATH="${DB_PATH:-/var/lib/ga-tool/local.db}"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/ga-tool}"
BEHALTEN="${BEHALTEN:-14}"

mkdir -p "$BACKUP_DIR"
ZIEL="$BACKUP_DIR/daily-$(date +%Y%m%d-%H%M%S).db"

sqlite3 "$DB_PATH" ".backup '$ZIEL'"

# Pruefen, nicht hoffen.
ERGEBNIS=$(sqlite3 "$ZIEL" "PRAGMA integrity_check;")
if [ "$ERGEBNIS" != "ok" ]; then
	echo "Sicherung ist unbrauchbar: $ERGEBNIS" >&2
	rm -f "$ZIEL"
	exit 1
fi

# Und nachsehen, ob ueberhaupt Daten drin sind — eine formal heile, aber leere
# Datenbank wuerde die Pruefung oben anstandslos bestehen.
TABELLEN=$(sqlite3 "$ZIEL" "select count(*) from sqlite_master where type='table';")
if [ "$TABELLEN" -lt 5 ]; then
	echo "Sicherung enthaelt nur $TABELLEN Tabellen — das kann nicht stimmen" >&2
	rm -f "$ZIEL"
	exit 1
fi

chmod 600 "$ZIEL"
echo "$(date -Is) ok $ZIEL ($(stat -c%s "$ZIEL") Bytes, $TABELLEN Tabellen)"

# Aeltere Sicherungen wegraeumen. Die pre-update-* bleiben unangetastet,
# die gehoeren zu einem bestimmten Update.
find "$BACKUP_DIR" -name 'daily-*.db' -mtime "+$BEHALTEN" -delete
