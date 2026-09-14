import { describe, it, expect, vi, beforeEach } from 'vitest';

/* Pruefung des Registrierungsschalters.
 *
 * Sobald das Portal oeffentlich erreichbar ist, entscheidet er darueber, ob
 * sich Fremde Konten anlegen koennen. Und er darf eine frische Installation
 * nicht aussperren — sonst gaebe es keinen Weg zum ersten Konto.
 */

let anzahl = 0;

async function laden(wert?: string) {
	vi.resetModules();
	vi.doMock('$env/dynamic/private', () => ({
		env: wert === undefined ? {} : { REGISTRIERUNG_OFFEN: wert }
	}));
	vi.doMock('$lib/server/db', () => ({
		db: { select: () => ({ from: async () => [{ c: anzahl }] }) }
	}));
	vi.doMock('$lib/server/db/auth.schema', () => ({ user: {} }));
	return (await import('./registrierung')).registrierungOffen;
}

beforeEach(() => {
	anzahl = 1;
});

describe('registrierungOffen', () => {
	it('ohne Variable bleibt sie offen', async () => {
		// Sonst aendert sich fuer bestehende Installationen etwas, das niemand
		// angefordert hat.
		expect(await (await laden())()).toBe(true);
	});

	it('"false" schliesst sie', async () => {
		expect(await (await laden('false'))()).toBe(false);
	});

	it('Gross- und Kleinschreibung ist egal', async () => {
		expect(await (await laden('FALSE'))()).toBe(false);
		expect(await (await laden(' False '))()).toBe(false);
	});

	it('alles andere laesst sie offen', async () => {
		// Ein Tippfehler darf nicht versehentlich zusperren.
		expect(await (await laden('true'))()).toBe(true);
		expect(await (await laden('nein'))()).toBe(true);
		expect(await (await laden(''))()).toBe(true);
	});

	it('ohne jedes Konto geht Registrierung trotzdem', async () => {
		// Sonst sperrt sich eine frische Installation selbst aus.
		anzahl = 0;
		expect(await (await laden('false'))()).toBe(true);
	});
});
