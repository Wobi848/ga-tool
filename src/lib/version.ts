/** Version der Anwendung.
 *
 * Wird im Kopf, in den Einstellungen und von scripts/server-update.sh
 * gelesen. Muss mit package.json uebereinstimmen — am 13.09.2026 liefen
 * beide auseinander (0.9.6 hier, 0.9.7 dort), und das Update-Skript meldete
 * daraufhin die falsche Version.
 */
export const APP_VERSION = '0.11.1';
