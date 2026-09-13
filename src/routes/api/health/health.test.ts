import { describe, it, expect, vi, beforeEach } from 'vitest';

/* Pruefung des Health-Endpunkts.
 *
 * Der Endpunkt haengt im Monitoring und entscheidet beim Loadbalancer, ob
 * diese Instanz Verkehr bekommt. Zwei Dinge muessen stimmen und werden sonst
 * erst im Ernstfall geprueft: bei erreichbarer Datenbank kommt 200, bei
 * unerreichbarer 503 — nicht etwa 200 mit einem Fehler im Rumpf.
 */

const run = vi.fn();
vi.mock('$lib/server/db', () => ({ db: { run: (...a: unknown[]) => run(...a) } }));

beforeEach(() => {
	run.mockReset();
	vi.resetModules();
});

/** Ruft den Endpunkt auf und liefert Status samt Rumpf. */
async function aufrufen() {
	const { GET } = await import('./+server');
	const res = (await GET({} as never)) as Response;
	return { status: res.status, body: await res.json() };
}

describe('Datenbank erreichbar', () => {
	it('antwortet mit 200 und status "ok"', async () => {
		run.mockReturnValue(undefined);
		const { status, body } = await aufrufen();
		expect(status).toBe(200);
		expect(body.status).toBe('ok');
		expect(body.checks.database).toBe('ok');
	});

	it('fragt die Datenbank tatsaechlich an', async () => {
		run.mockReturnValue(undefined);
		await aufrufen();
		expect(run).toHaveBeenCalledTimes(1);
	});

	it('liefert einen brauchbaren Zeitstempel', async () => {
		run.mockReturnValue(undefined);
		const { body } = await aufrufen();
		expect(Number.isNaN(Date.parse(body.timestamp))).toBe(false);
		// ISO-Form, damit Monitoring-Werkzeuge sie parsen koennen
		expect(body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T/);
	});
});

describe('Datenbank nicht erreichbar', () => {
	beforeEach(() => {
		run.mockImplementation(() => {
			throw new Error('database is locked');
		});
	});

	it('antwortet mit 503, nicht mit 200', async () => {
		// Der entscheidende Fall: ein 200 mit Fehler im Rumpf wuerde den
		// Loadbalancer weiter Verkehr schicken lassen.
		const { status } = await aufrufen();
		expect(status).toBe(503);
	});

	it('meldet "degraded" und benennt die Ursache', async () => {
		const { body } = await aufrufen();
		expect(body.status).toBe('degraded');
		expect(body.checks.database).toBe('fail');
	});

	it('laesst den Fehler nicht nach aussen durch', async () => {
		// Ein geworfener Fehler waere eine 500 ohne Aussage — der Endpunkt
		// soll gerade dann noch antworten koennen.
		await expect(aufrufen()).resolves.toBeDefined();
	});

	it('gibt keine Fehlermeldung der Datenbank preis', async () => {
		const { body } = await aufrufen();
		expect(JSON.stringify(body)).not.toContain('database is locked');
	});
});
