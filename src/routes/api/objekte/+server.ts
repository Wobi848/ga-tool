import { json, error } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { objekt, anlage, durchlauf } from '$lib/server/db/objekte.schema';
import type { RequestHandler } from './$types';

/* Abgleich der Objektverwaltung.
 *
 * Bewusst **zwei** Verben statt vier je Entität: der Client fuehrt keine
 * Aenderungsliste, er kennt nur seinen Stand. Ein Aufruf schickt den ganzen
 * lokalen Stand, der Server mischt je Datensatz und gibt den gemischten Stand
 * zurueck. Das ist eine Anfrage statt vieler, und es gibt keinen Zustand
 * dazwischen, der schieflaufen kann.
 *
 * Zwei Regeln, die nicht verhandelbar sind:
 *
 * 1. `userId` kommt **immer** aus der Sitzung, nie aus dem Rumpf. Sonst
 *    schriebe ein Aufrufer mit einer fremden Kennung in fremde Daten.
 * 2. Beim Zusammentreffen greift die Aenderung nur, wenn die vorhandene Zeile
 *    demselben Benutzer gehoert **und** aelter ist. Eine erratene oder
 *    abgeschriebene `id` eines anderen Benutzers laesst dessen Zeile damit
 *    unberuehrt — ohne Fehlermeldung, die verriete, dass es sie gibt.
 */

/** Was der Client schickt und zurueckbekommt. */
type Stand = {
	objekte: Record<string, unknown>[];
	anlagen: Record<string, unknown>[];
	durchlaeufe: Record<string, unknown>[];
};

const ZAHL = (v: unknown, standard = 0) => (typeof v === 'number' && isFinite(v) ? v : standard);
const TEXT = (v: unknown, standard = '') => (typeof v === 'string' ? v : standard);
const OPT_ZAHL = (v: unknown) => (typeof v === 'number' && isFinite(v) ? v : null);
const JSON_TEXT = (v: unknown) => {
	// Nur Objekte durchlassen; alles andere waere im Client ein Absturz beim
	// Auspacken.
	if (!v || typeof v !== 'object' || Array.isArray(v)) return '{}';
	try {
		return JSON.stringify(v);
	} catch {
		return '{}';
	}
};

/** Hoechstens so viele Datensaetze je Art und Aufruf. */
const GRENZE = 2000;

async function ladeStand(userId: string): Promise<Stand> {
	const [o, a, d] = await Promise.all([
		db.select().from(objekt).where(eq(objekt.userId, userId)),
		db.select().from(anlage).where(eq(anlage.userId, userId)),
		db.select().from(durchlauf).where(eq(durchlauf.userId, userId))
	]);
	return {
		objekte: o.map(({ userId: _, ...rest }) => rest),
		anlagen: a.map(({ userId: _, ...rest }) => rest),
		durchlaeufe: d.map(({ userId: _, ...rest }) => ({
			...rest,
			// Im Client sind es Objekte, in der Datenbank Text.
			status: JSON.parse(rest.status),
			notizen: JSON.parse(rest.notizen),
			kontext: JSON.parse(rest.kontext)
		}))
	};
}

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) error(401);
	return json(await ladeStand(locals.user.id));
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401);
	const uid = locals.user.id;

	let rumpf: Partial<Stand>;
	try {
		rumpf = await request.json();
	} catch {
		error(400, 'Kein gueltiges JSON');
	}
	if (!rumpf || typeof rumpf !== 'object') error(400, 'Erwartet ein Objekt');

	const liste = (x: unknown) => (Array.isArray(x) ? x.slice(0, GRENZE) : []);

	for (const r of liste(rumpf.objekte)) {
		const id = TEXT(r.id);
		if (!id) continue;
		const werte = {
			id,
			userId: uid,
			name: TEXT(r.name, '(ohne Namen)'),
			adresse: TEXT(r.adresse),
			auftraggeber: TEXT(r.auftraggeber),
			notiz: TEXT(r.notiz),
			erstelltAm: ZAHL(r.erstelltAm, Date.now()),
			geaendertAm: ZAHL(r.geaendertAm, Date.now()),
			archiviertAm: OPT_ZAHL(r.archiviertAm),
			geloeschtAm: OPT_ZAHL(r.geloeschtAm)
		};
		await db
			.insert(objekt)
			.values(werte)
			.onConflictDoUpdate({
				target: objekt.id,
				set: werte,
				where: and(eq(objekt.userId, uid), sql`${objekt.geaendertAm} < excluded.geaendert_am`)
			});
	}

	for (const r of liste(rumpf.anlagen)) {
		const id = TEXT(r.id);
		if (!id) continue;
		const werte = {
			id,
			userId: uid,
			objektId: TEXT(r.objektId),
			name: TEXT(r.name, '(ohne Namen)'),
			art: TEXT(r.art, 'sonstige'),
			reihenfolge: ZAHL(r.reihenfolge),
			erstelltAm: ZAHL(r.erstelltAm, Date.now()),
			geaendertAm: ZAHL(r.geaendertAm, Date.now()),
			geloeschtAm: OPT_ZAHL(r.geloeschtAm)
		};
		await db
			.insert(anlage)
			.values(werte)
			.onConflictDoUpdate({
				target: anlage.id,
				set: werte,
				where: and(eq(anlage.userId, uid), sql`${anlage.geaendertAm} < excluded.geaendert_am`)
			});
	}

	for (const r of liste(rumpf.durchlaeufe)) {
		const id = TEXT(r.id);
		if (!id) continue;
		const status = JSON_TEXT(r.status);
		const werte = {
			id,
			userId: uid,
			objektId: TEXT(r.objektId),
			anlageId: TEXT(r.anlageId) || null,
			vorlage: TEXT(r.vorlage),
			titel: TEXT(r.titel, '(ohne Titel)'),
			status,
			notizen: JSON_TEXT(r.notizen),
			kontext: JSON_TEXT(r.kontext),
			// Aus dem Zustand ableiten, nicht dem Aufrufer glauben — dieselbe
			// Regel wie im Client-Store.
			erledigt: Object.values(JSON.parse(status)).filter(Boolean).length,
			gesamt: ZAHL(r.gesamt),
			erstelltAm: ZAHL(r.erstelltAm, Date.now()),
			geaendertAm: ZAHL(r.geaendertAm, Date.now()),
			abgeschlossenAm: OPT_ZAHL(r.abgeschlossenAm),
			geloeschtAm: OPT_ZAHL(r.geloeschtAm)
		};
		await db
			.insert(durchlauf)
			.values(werte)
			.onConflictDoUpdate({
				target: durchlauf.id,
				set: werte,
				where: and(eq(durchlauf.userId, uid), sql`${durchlauf.geaendertAm} < excluded.geaendert_am`)
			});
	}

	return json(await ladeStand(uid));
};
