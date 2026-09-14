import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/auth.schema';
import { sql } from 'drizzle-orm';

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
export async function registrierungOffen(): Promise<boolean> {
	const geschlossen = (env.REGISTRIERUNG_OFFEN ?? '').trim().toLowerCase() === 'false';
	if (!geschlossen) return true;

	const [{ c }] = await db.select({ c: sql<number>`count(*)` }).from(userTable);
	return c === 0;
}
