import { describe, it, expect, vi, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/* Pruefung der Einladungslinks — gegen echtes SQLite im Speicher, nicht gegen
 * einen Nachbau. Was hier zaehlt, steckt in den WHERE-Bedingungen: dass ein
 * Link genau einmal greift, dass er verfaellt, und dass ein gescheiterter
 * Versuch ihn nicht verbrennt. Ein Mock wuerde nur pruefen, was er selbst
 * behauptet.
 */

const sqlDatei = readFileSync(join(process.cwd(), 'drizzle', '0002_einladung.sql'), 'utf8');

async function laden() {
	const client = new Database(':memory:');
	for (const teil of sqlDatei.split('--> statement-breakpoint')) client.exec(teil);
	const schema = await import('$lib/server/db/einladung.schema');
	const db = drizzle(client, { schema });
	vi.resetModules();
	vi.doMock('$lib/server/db', () => ({ db }));
	const modul = await import('./einladung');
	return { ...modul, client };
}

let e: Awaited<ReturnType<typeof laden>>;
const T0 = new Date('2026-10-14T10:00:00Z');
const minuten = (n: number) => new Date(T0.getTime() + n * 60 * 1000);
const tage = (n: number) => minuten(n * 24 * 60);

beforeEach(async () => {
	e = await laden();
});

describe('erstellen', () => {
	it('liefert ein Token, gespeichert wird nur sein Hash', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'admin', jetzt: T0 });
		expect(token).toMatch(/^[A-Za-z0-9_-]{32}$/);
		const zeile = e.client.prepare('select * from einladung').get() as Record<string, unknown>;
		expect(JSON.stringify(zeile)).not.toContain(token);
		expect(zeile.token_hash).toBe(e.hashToken(token));
	});

	it('zwei Einladungen haben verschiedene Tokens', async () => {
		const a = await e.erstellen({ erstelltVon: 'admin', jetzt: T0 });
		const b = await e.erstellen({ erstelltVon: 'admin', jetzt: T0 });
		expect(a.token).not.toBe(b.token);
	});

	it('Gueltigkeit bleibt zwischen 1 und 30 Tagen', async () => {
		const kurz = await e.erstellen({ erstelltVon: 'a', tage: 0, jetzt: T0 });
		const lang = await e.erstellen({ erstelltVon: 'a', tage: 365, jetzt: T0 });
		expect(kurz.laeuftAb).toEqual(tage(1));
		expect(lang.laeuftAb).toEqual(tage(30));
	});
});

describe('gueltig', () => {
	it('ein frischer Link gilt', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		expect(await e.gueltig(token, minuten(1))).toBe(true);
	});

	it('nach Ablauf nicht mehr', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', tage: 7, jetzt: T0 });
		expect(await e.gueltig(token, tage(7))).toBe(false);
	});

	it('falsche, leere und unsinnige Werte gelten nie', async () => {
		await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		for (const x of ['', '   ', 'x'.repeat(32), undefined, null, 42, { token: 1 }, "' or 1=1 --"]) {
			expect(await e.gueltig(x, minuten(1))).toBe(false);
		}
	});

	it('prueft nur, reserviert nichts', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.gueltig(token, minuten(1));
		expect(await e.einloesen(token, minuten(2))).toBe(true);
	});
});

describe('einloesen', () => {
	it('genau einmal', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		expect(await e.einloesen(token, minuten(1))).toBe(true);
		expect(await e.einloesen(token, minuten(1))).toBe(false);
	});

	it('nicht nach Ablauf', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', tage: 1, jetzt: T0 });
		expect(await e.einloesen(token, tage(2))).toBe(false);
	});

	it('eine Einladung loest keine andere ein', async () => {
		const a = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		const b = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.einloesen(a.token, minuten(1));
		expect(await e.gueltig(b.token, minuten(1))).toBe(true);
	});
});

describe('nach der Registrierung', () => {
	it('gescheitert: freigeben, der Link geht wieder', async () => {
		// Etwa weil die E-Mail schon vergeben war — ein Tippfehler soll den
		// Link nicht verbrennen.
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.einloesen(token, minuten(1));
		await e.freigeben(token);
		expect(await e.einloesen(token, minuten(2))).toBe(true);
	});

	it('geklappt: abschliessen, und freigeben aendert daran nichts mehr', async () => {
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.einloesen(token, minuten(1));
		await e.abschliessen(token, 'neues-konto');
		await e.freigeben(token);
		expect(await e.einloesen(token, minuten(30))).toBe(false);
		const [zeile] = await e.liste(minuten(30));
		expect(zeile.status).toBe('eingeloest');
		expect(zeile.eingeloestVon).toBe('neues-konto');
	});

	it('eine liegengebliebene Reservierung verfaellt nach 10 Minuten', async () => {
		// Absturz mitten in der Registrierung: der after-Haken lief nie.
		const { token } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.einloesen(token, minuten(1));
		expect(await e.einloesen(token, minuten(5))).toBe(false);
		expect(await e.einloesen(token, minuten(12))).toBe(true);
	});
});

describe('liste und loeschen', () => {
	it('zeigt offen, eingeloest und abgelaufen', async () => {
		const a = await e.erstellen({ erstelltVon: 'a', notiz: 'Anna', tage: 7, jetzt: T0 });
		await e.erstellen({ erstelltVon: 'a', notiz: 'Beat', tage: 1, jetzt: minuten(1) });
		await e.erstellen({ erstelltVon: 'a', notiz: 'Cla', tage: 7, jetzt: minuten(2) });
		await e.einloesen(a.token, minuten(10));
		await e.abschliessen(a.token, 'konto-anna');
		const status = Object.fromEntries((await e.liste(tage(2))).map((z) => [z.notiz, z.status]));
		expect(status).toEqual({ Anna: 'eingeloest', Beat: 'abgelaufen', Cla: 'offen' });
	});

	it('ein zurueckgezogener Link gilt nicht mehr', async () => {
		const { token, id } = await e.erstellen({ erstelltVon: 'a', jetzt: T0 });
		await e.loeschen(id);
		expect(await e.gueltig(token, minuten(1))).toBe(false);
	});
});
