import { createHash, randomBytes } from 'node:crypto';
import { and, desc, eq, gt, isNull, lt, or } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { einladung } from '$lib/server/db/einladung.schema';

/* Einladungslinks: ein Link, ein Konto, mit Ablaufdatum.
 *
 * Abloesung fuer den gemeinsamen REGISTRIER_CODE. Der galt fuer beliebig viele
 * Konten und verfiel nie; wer ihn weitergab, oeffnete die Tuer fuer alle.
 *
 * Ablauf einer Registrierung mit Einladung:
 *   1. before-Hook in auth.ts: `einloesen` reserviert die Einladung — in einem
 *      einzigen UPDATE mit Bedingung, damit zwei gleichzeitige Versuche nicht
 *      beide durchkommen.
 *   2. Scheitert die Registrierung (E-Mail schon vergeben, Passwort zu kurz),
 *      gibt der after-Hook sie mit `freigeben` wieder frei. Sonst wuerde ein
 *      Tippfehler den Link verbrennen.
 *   3. Klappt sie, haelt `abschliessen` fest, welches Konto daraus wurde.
 */

export const GUELTIG_TAGE_STANDARD = 7;
export const GUELTIG_TAGE_MAX = 30;
/** Eine Reservierung, die so alt ist, ohne dass ein Konto daraus wurde, gilt
 *  als liegengeblieben — etwa weil der Server mitten in der Registrierung
 *  abstuerzte und der after-Hook nie lief. */
const RESERVIERUNG_MS = 10 * 60 * 1000;

/** Offen: kein Konto daraus, nicht abgelaufen, nicht frisch reserviert. */
function offen(token: string, jetzt: Date) {
	return and(
		eq(einladung.tokenHash, hashToken(token.trim())),
		isNull(einladung.eingeloestVon),
		gt(einladung.laeuftAb, jetzt),
		or(
			isNull(einladung.eingeloestAm),
			lt(einladung.eingeloestAm, new Date(jetzt.getTime() - RESERVIERUNG_MS))
		)
	);
}

export function hashToken(token: string): string {
	return createHash('sha256').update(token).digest('hex');
}

/** Sieht ein Wert ueberhaupt wie ein Token aus? Spart die Datenbank fuer Unsinn. */
function tokenForm(token: unknown): token is string {
	return typeof token === 'string' && /^[A-Za-z0-9_-]{20,64}$/.test(token.trim());
}

export async function erstellen(opts: {
	erstelltVon: string;
	notiz?: string;
	tage?: number;
	jetzt?: Date;
}): Promise<{ token: string; id: string; laeuftAb: Date }> {
	const jetzt = opts.jetzt ?? new Date();
	const tage = Math.min(
		GUELTIG_TAGE_MAX,
		Math.max(1, Math.round(opts.tage ?? GUELTIG_TAGE_STANDARD))
	);
	const token = randomBytes(24).toString('base64url');
	const id = crypto.randomUUID();
	const laeuftAb = new Date(jetzt.getTime() + tage * 24 * 60 * 60 * 1000);
	await db.insert(einladung).values({
		id,
		tokenHash: hashToken(token),
		notiz: opts.notiz?.trim().slice(0, 100) || null,
		erstelltVon: opts.erstelltVon,
		erstelltAm: jetzt,
		laeuftAb
	});
	return { token, id, laeuftAb };
}

/** Koennte man mit diesem Token jetzt ein Konto anlegen? Reserviert nichts. */
export async function gueltig(token: unknown, jetzt = new Date()): Promise<boolean> {
	if (!tokenForm(token)) return false;
	const treffer = await db
		.select({ id: einladung.id })
		.from(einladung)
		.where(offen(token, jetzt))
		.limit(1);
	return treffer.length > 0;
}

/** Reserviert die Einladung, falls sie noch offen ist. Atomar: von zwei
 *  gleichzeitigen Aufrufen bekommt genau einer `true`. */
export async function einloesen(token: unknown, jetzt = new Date()): Promise<boolean> {
	if (!tokenForm(token)) return false;
	const ergebnis = await db
		.update(einladung)
		.set({ eingeloestAm: jetzt })
		.where(offen(token, jetzt))
		.returning({ id: einladung.id });
	return ergebnis.length > 0;
}

/** Gibt eine reservierte, aber nicht abgeschlossene Einladung wieder frei. */
export async function freigeben(token: unknown): Promise<void> {
	if (!tokenForm(token)) return;
	await db
		.update(einladung)
		.set({ eingeloestAm: null })
		.where(and(eq(einladung.tokenHash, hashToken(token.trim())), isNull(einladung.eingeloestVon)));
}

export async function abschliessen(token: unknown, userId: string): Promise<void> {
	if (!tokenForm(token)) return;
	await db
		.update(einladung)
		.set({ eingeloestVon: userId })
		.where(and(eq(einladung.tokenHash, hashToken(token.trim())), isNull(einladung.eingeloestVon)));
}

export type EinladungStatus = 'offen' | 'eingeloest' | 'abgelaufen';

export async function liste(jetzt = new Date()) {
	const zeilen = await db
		.select({
			id: einladung.id,
			notiz: einladung.notiz,
			erstelltAm: einladung.erstelltAm,
			laeuftAb: einladung.laeuftAb,
			eingeloestAm: einladung.eingeloestAm,
			eingeloestVon: einladung.eingeloestVon
		})
		.from(einladung)
		.orderBy(desc(einladung.erstelltAm));
	return zeilen.map((z) => ({
		...z,
		status: (z.eingeloestVon
			? 'eingeloest'
			: z.laeuftAb <= jetzt
				? 'abgelaufen'
				: 'offen') as EinladungStatus
	}));
}

export async function loeschen(id: string): Promise<void> {
	await db.delete(einladung).where(eq(einladung.id, id));
}
