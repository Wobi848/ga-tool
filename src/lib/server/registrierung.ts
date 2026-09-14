import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/auth.schema';
import { sql } from 'drizzle-orm';

/** Ist ein Einladungscode hinterlegt, und stimmt der mitgeschickte?
 *
 * Damit laesst sich die Registrierung geschlossen halten und trotzdem gezielt
 * jemanden dazunehmen: Code weitergeben, Konto anlegen lassen, fertig. Ohne
 * E-Mail-Versand, ohne dass jemand ein Passwort fuer einen anderen erfindet.
 *
 * Ohne `REGISTRIER_CODE` gibt es keinen Weg hinein — eine leere Variable darf
 * nicht versehentlich alles oeffnen.
 */
export function codeGueltig(code: unknown): boolean {
	const soll = (env.REGISTRIER_CODE ?? '').trim();
	if (!soll) return false;
	const ist = typeof code === 'string' ? code.trim() : '';
	if (ist.length !== soll.length) return false;
	// Zeichenweise ohne fruehen Abbruch — sonst verraet die Antwortzeit, wie
	// viele Zeichen stimmen.
	let gleich = 0;
	for (let i = 0; i < soll.length; i++) gleich |= soll.charCodeAt(i) ^ ist.charCodeAt(i);
	return gleich === 0;
}

/** Ist ueberhaupt ein Code hinterlegt? Nur dann zeigt die Oberflaeche das Feld. */
export function codeVerlangt(): boolean {
	return (env.REGISTRIER_CODE ?? '').trim().length > 0;
}

/** Darf sich gerade jemand registrieren?
 *
 * Solange das Portal nur im Tailnet steht, ist eine offene Registrierung
 * harmlos. Oeffentlich erreichbar ist sie es nicht: dann kann sich jeder ein
 * Konto anlegen.
 *
 * `REGISTRIERUNG_OFFEN=false` schliesst sie. Ohne die Variable bleibt sie
 * offen — damit aendert sich fuer bestehende Installationen und fuer die
 * Entwicklung nichts.
 *
 * **Eine Ausnahme:** ist noch kein Konto vorhanden, geht Registrierung immer.
 * Sonst sperrt sich eine frische Installation selbst aus, und niemand koennte
 * das erste Konto anlegen — das ohnehin `systemadmin` wird.
 */
export async function registrierungOffen(code?: unknown): Promise<boolean> {
	const geschlossen = (env.REGISTRIERUNG_OFFEN ?? '').trim().toLowerCase() === 'false';
	if (!geschlossen) return true;

	// Geschlossen, aber mit gueltigem Einladungscode geht es trotzdem.
	if (codeGueltig(code)) return true;

	const [{ c }] = await db.select({ c: sql<number>`count(*)` }).from(userTable);
	return c === 0;
}
