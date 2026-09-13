import { describe, it, expect, beforeEach, vi } from 'vitest';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { readFileSync, readdirSync } from 'node:fs';
import * as schema from '$lib/server/db/objekte.schema';

/* Pruefung des Abgleichs.
 *
 * Zwei Dinge entscheiden hier ueber Datenverlust und Datenschutz, und beide
 * lassen sich nicht durch Hinsehen sicherstellen:
 *
 * 1. Die Konfliktregel — der juengere Stand gewinnt, je Datensatz. Sonst
 *    ueberschreibt das zuletzt abgleichende Geraet die Arbeit des anderen.
 * 2. Die Eigentumsregel — eine fremde `id` darf eine fremde Zeile nicht
 *    anfassen. Eine abgeschriebene Kennung waere sonst ein Schreibzugriff auf
 *    fremde Daten.
 */

// Echte SQLite im Speicher, mit den echten Migrationen — eine Attrappe wuerde
// genau das nicht pruefen, worauf es ankommt (ON CONFLICT ... WHERE).
const sqlite = new Database(':memory:');
for (const datei of readdirSync('drizzle')
	.filter((f) => f.endsWith('.sql'))
	.sort()) {
	const inhalt = readFileSync(`drizzle/${datei}`, 'utf8');
	for (const teil of inhalt.split('--> statement-breakpoint')) {
		const s = teil.trim();
		if (s) sqlite.exec(s);
	}
}
const testDb = drizzle(sqlite, { schema });

vi.mock('$lib/server/db', () => ({ db: testDb }));
vi.stubGlobal('testDb', testDb);

/** Ruft den Endpunkt als bestimmter Benutzer auf. */
async function post(userId: string | null, koerper: unknown) {
	const { POST } = await import('./+server');
	const res = (await POST({
		locals: userId ? { user: { id: userId } } : {},
		request: new Request('http://x/api/objekte', {
			method: 'POST',
			body: JSON.stringify(koerper)
		})
	} as never)) as Response;
	return { status: res.status, body: await res.json() };
}

async function get(userId: string | null) {
	const { GET } = await import('./+server');
	const res = (await GET({ locals: userId ? { user: { id: userId } } : {} } as never)) as Response;
	return { status: res.status, body: await res.json() };
}

const objektRoh = (id: string, name: string, geaendertAm: number) => ({
	id,
	name,
	adresse: '',
	auftraggeber: '',
	notiz: '',
	erstelltAm: 1000,
	geaendertAm
});

beforeEach(() => {
	sqlite.exec('delete from objekt; delete from anlage; delete from durchlauf;');
});

describe('Anmeldung', () => {
	it('ohne Sitzung gibt es nichts', async () => {
		await expect(get(null)).rejects.toMatchObject({ status: 401 });
		await expect(post(null, { objekte: [] })).rejects.toMatchObject({ status: 401 });
	});
});

describe('Abgleich', () => {
	it('legt an und gibt den Stand zurueck', async () => {
		const { body } = await post('u1', { objekte: [objektRoh('o1', 'Seefeld', 2000)] });
		expect(body.objekte).toHaveLength(1);
		expect(body.objekte[0].name).toBe('Seefeld');
		// Die Benutzerkennung hat im Rumpf nichts verloren.
		expect(body.objekte[0].userId).toBeUndefined();
	});

	it('der juengere Stand gewinnt', async () => {
		await post('u1', { objekte: [objektRoh('o1', 'alt', 2000)] });
		await post('u1', { objekte: [objektRoh('o1', 'neu', 3000)] });
		const { body } = await get('u1');
		expect(body.objekte[0].name).toBe('neu');
	});

	it('ein aelterer Stand ueberschreibt den juengeren nicht', async () => {
		// Genau der Fall, der sonst Arbeit vernichtet: ein Geraet war lange
		// offline und schickt seinen veralteten Stand.
		await post('u1', { objekte: [objektRoh('o1', 'neu', 3000)] });
		await post('u1', { objekte: [objektRoh('o1', 'alt', 2000)] });
		const { body } = await get('u1');
		expect(body.objekte[0].name).toBe('neu');
	});

	it('Durchlaeufe kommen als Objekte zurueck, nicht als Text', async () => {
		await post('u1', {
			durchlaeufe: [
				{
					id: 'd1',
					objektId: 'o1',
					vorlage: 'ibn',
					titel: 'MZ1',
					status: { a: true, b: false },
					notizen: { a: 'klemmt' },
					kontext: {},
					gesamt: 5,
					erstelltAm: 1,
					geaendertAm: 2
				}
			]
		});
		const { body } = await get('u1');
		expect(body.durchlaeufe[0].status).toEqual({ a: true, b: false });
		expect(body.durchlaeufe[0].notizen.a).toBe('klemmt');
	});

	it('leitet erledigt aus dem Zustand ab, statt es zu glauben', async () => {
		await post('u1', {
			durchlaeufe: [
				{
					id: 'd1',
					objektId: 'o1',
					vorlage: 'ibn',
					titel: 'x',
					status: { a: true, b: true, c: false },
					erledigt: 99,
					gesamt: 3,
					erstelltAm: 1,
					geaendertAm: 2
				}
			]
		});
		const { body } = await get('u1');
		expect(body.durchlaeufe[0].erledigt).toBe(2);
	});

	it('Grabsteine kommen mit zurueck', async () => {
		// Ohne sie taucht ein auf dem Telefon geloeschtes Objekt beim naechsten
		// Abgleich vom Laptop wieder auf.
		await post('u1', { objekte: [{ ...objektRoh('o1', 'weg', 3000), geloeschtAm: 3000 }] });
		const { body } = await get('u1');
		expect(body.objekte[0].geloeschtAm).toBe(3000);
	});
});

describe('Eigentum', () => {
	it('jeder sieht nur seinen eigenen Stand', async () => {
		await post('u1', { objekte: [objektRoh('o1', 'von u1', 2000)] });
		await post('u2', { objekte: [objektRoh('o2', 'von u2', 2000)] });
		const eins = await get('u1');
		const zwei = await get('u2');
		expect(eins.body.objekte.map((o: { id: string }) => o.id)).toEqual(['o1']);
		expect(zwei.body.objekte.map((o: { id: string }) => o.id)).toEqual(['o2']);
	});

	it('eine fremde Kennung faesst die fremde Zeile nicht an', async () => {
		await post('u1', { objekte: [objektRoh('o1', 'gehoert u1', 2000)] });
		// u2 kennt die id und schickt einen juengeren Stand — waere die
		// Eigentumspruefung nur in der Abfrage und nicht im Schreibweg, wuerde
		// hier fremde Arbeit ueberschrieben.
		await post('u2', { objekte: [objektRoh('o1', 'gekapert', 9000)] });
		const eins = await get('u1');
		expect(eins.body.objekte[0].name).toBe('gehoert u1');
	});

	it('und sie verraet auch nicht, dass es die Zeile gibt', async () => {
		await post('u1', { objekte: [objektRoh('o1', 'gehoert u1', 2000)] });
		const { status, body } = await post('u2', { objekte: [objektRoh('o1', 'gekapert', 9000)] });
		// Kein Fehler, keine fremde Zeile im Rumpf — nur der eigene, leere Stand.
		expect(status).toBe(200);
		expect(body.objekte).toEqual([]);
	});

	it('die Benutzerkennung im Rumpf wird ignoriert', async () => {
		await post('u1', { objekte: [{ ...objektRoh('o1', 'x', 2000), userId: 'u2' }] });
		expect((await get('u2')).body.objekte).toEqual([]);
		expect((await get('u1')).body.objekte).toHaveLength(1);
	});
});

describe('Was hereinkommt', () => {
	it('kein JSON ergibt 400', async () => {
		const { POST } = await import('./+server');
		await expect(
			POST({
				locals: { user: { id: 'u1' } },
				request: new Request('http://x', { method: 'POST', body: 'kein json' })
			} as never)
		).rejects.toMatchObject({ status: 400 });
	});

	it('fehlende Felder werden aufgefuellt statt zu werfen', async () => {
		const { body } = await post('u1', { objekte: [{ id: 'o1' }] });
		expect(body.objekte[0].name).toBe('(ohne Namen)');
		expect(typeof body.objekte[0].geaendertAm).toBe('number');
	});

	it('ein Zustand, der kein Objekt ist, wird verworfen', async () => {
		await post('u1', {
			durchlaeufe: [{ id: 'd1', objektId: 'o', vorlage: 'v', titel: 't', status: 'boesartig' }]
		});
		const { body } = await get('u1');
		expect(body.durchlaeufe[0].status).toEqual({});
	});

	it('Eintraege ohne id werden uebergangen', async () => {
		const { body } = await post('u1', { objekte: [{ name: 'ohne id' }] });
		expect(body.objekte).toEqual([]);
	});
});
