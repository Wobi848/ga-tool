import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

/* Pruefung des Abgleichs auf der Client-Seite.
 *
 * Hier entscheidet sich, ob Arbeit verlorengeht. Vier Faelle zaehlen: der
 * juengere Stand gewinnt, Grabsteine kehren nicht zurueck, ohne Netz oder ohne
 * Anmeldung passiert nichts Schlimmes, und was waehrend des Abgleichs
 * entsteht, ueberlebt ihn.
 */

vi.mock('$app/environment', () => ({ browser: true }));

function speicherAttrappe() {
	const daten: Record<string, string> = {};
	return {
		getItem: (k: string) => (k in daten ? daten[k] : null),
		setItem: (k: string, v: string) => {
			daten[k] = String(v);
		},
		removeItem: (k: string) => {
			delete daten[k];
		},
		get length() {
			return Object.keys(daten).length;
		},
		key: (i: number) => Object.keys(daten)[i] ?? null
	};
}

let speicher: ReturnType<typeof speicherAttrappe>;

beforeEach(() => {
	speicher = speicherAttrappe();
	vi.stubGlobal('localStorage', speicher);
	vi.stubGlobal('crypto', { randomUUID: () => `id-${Math.random().toString(36).slice(2, 10)}` });
	vi.resetModules();
});

afterEach(() => vi.unstubAllGlobals());

/** Antwort des Servers stellen. */
function antwortMit(stand: unknown, status = 200) {
	vi.stubGlobal(
		'fetch',
		vi.fn(async () => ({
			ok: status >= 200 && status < 300,
			status,
			json: async () => stand
		}))
	);
}

const o = (
	id: string,
	name: string,
	geaendertAm: number,
	extra: Record<string, unknown> = {}
): {
	id: string;
	name: string;
	geaendertAm: number;
	geloeschtAm?: number;
	[k: string]: unknown;
} => ({
	id,
	name,
	adresse: '',
	auftraggeber: '',
	notiz: '',
	erstelltAm: 1,
	geaendertAm,
	...extra
});

describe('mischeListe', () => {
	it('nimmt den juengeren Stand', async () => {
		const { mischeListe } = await import('./sync');
		const raus = mischeListe([o('a', 'lokal alt', 100)], [o('a', 'server neu', 200)]);
		expect(raus[0].name).toBe('server neu');
	});

	it('behaelt den lokalen, wenn er juenger ist', async () => {
		// Der Fall nach dem Abhaken im Funkloch: lokal ist voraus.
		const { mischeListe } = await import('./sync');
		const raus = mischeListe([o('a', 'lokal neu', 300)], [o('a', 'server alt', 200)]);
		expect(raus[0].name).toBe('lokal neu');
	});

	it('bei Gleichstand gewinnt der Server', async () => {
		// Sonst liefen zwei Geraete dauerhaft auseinander.
		const { mischeListe } = await import('./sync');
		const raus = mischeListe([o('a', 'lokal', 200)], [o('a', 'server', 200)]);
		expect(raus[0].name).toBe('server');
	});

	it('nimmt auf, was nur der Server kennt', async () => {
		const { mischeListe } = await import('./sync');
		const raus = mischeListe([o('a', 'A', 1)], [o('b', 'B', 1)]);
		expect(raus.map((x) => x.id).sort()).toEqual(['a', 'b']);
	});

	it('behaelt, was nur lokal existiert', async () => {
		const { mischeListe } = await import('./sync');
		expect(mischeListe([o('a', 'A', 1)], [])).toHaveLength(1);
	});

	it('ein Grabstein vom Server setzt sich durch', async () => {
		// Sonst taucht ein auf dem Telefon geloeschtes Objekt hier wieder auf.
		const { mischeListe } = await import('./sync');
		const raus = mischeListe([o('a', 'noch da', 100)], [o('a', 'weg', 200, { geloeschtAm: 200 })]);
		expect(raus[0].geloeschtAm).toBe(200);
	});
});

describe('abgleichen', () => {
	it('schickt den lokalen Stand und uebernimmt die Antwort', async () => {
		const s = await import('./store');
		s.objektAnlegen({ name: 'Lokal' });
		antwortMit({
			objekte: [o('vom-server', 'Vom Server', Date.now() + 1000)],
			anlagen: [],
			durchlaeufe: []
		});
		const { abgleichen } = await import('./sync');
		const e = await abgleichen();
		expect(e.ok).toBe(true);
		expect(
			s
				.objekte()
				.map((x) => x.name)
				.sort()
		).toEqual(['Lokal', 'Vom Server']);
	});

	it('merkt sich, wann zuletzt abgeglichen wurde', async () => {
		antwortMit({ objekte: [], anlagen: [], durchlaeufe: [] });
		const { abgleichen, zuletztAbgeglichen } = await import('./sync');
		expect(zuletztAbgeglichen()).toBeNull();
		await abgleichen();
		expect(zuletztAbgeglichen()).toBeGreaterThan(0);
	});

	it('ohne Anmeldung passiert nichts', async () => {
		const s = await import('./store');
		s.objektAnlegen({ name: 'Bleibt' });
		antwortMit({}, 401);
		const { abgleichen, zuletztAbgeglichen } = await import('./sync');
		const e = await abgleichen();
		expect(e).toEqual({ ok: false, grund: 'nicht-angemeldet' });
		// Der lokale Stand bleibt unangetastet.
		expect(s.objekte()).toHaveLength(1);
		expect(zuletztAbgeglichen()).toBeNull();
	});

	it('ohne Netz passiert nichts', async () => {
		const s = await import('./store');
		s.objektAnlegen({ name: 'Bleibt' });
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => {
				throw new Error('kein Netz');
			})
		);
		const { abgleichen } = await import('./sync');
		expect(await abgleichen()).toEqual({ ok: false, grund: 'kein-netz' });
		expect(s.objekte()).toHaveLength(1);
	});

	it('ein Serverfehler laesst den lokalen Stand in Ruhe', async () => {
		const s = await import('./store');
		s.objektAnlegen({ name: 'Bleibt' });
		antwortMit({}, 500);
		const { abgleichen } = await import('./sync');
		expect(await abgleichen()).toEqual({ ok: false, grund: 'fehler' });
		expect(s.objekte()).toHaveLength(1);
	});

	it('was waehrend des Abgleichs entsteht, ueberlebt ihn', async () => {
		// Zwischen Absenden und Antwort kann jemand weiterarbeiten. Wuerde der
		// Abgleich den Stand von vorher zurueckschreiben, waere das weg.
		const s = await import('./store');
		vi.stubGlobal(
			'fetch',
			vi.fn(async () => {
				s.objektAnlegen({ name: 'Waehrenddessen' });
				return {
					ok: true,
					status: 200,
					json: async () => ({ objekte: [], anlagen: [], durchlaeufe: [] })
				};
			})
		);
		const { abgleichen } = await import('./sync');
		await abgleichen();
		expect(s.objekte().map((x) => x.name)).toContain('Waehrenddessen');
	});

	it('zwei Aufrufe gleichzeitig ergeben einen Abgleich', async () => {
		const holen = vi.fn(async () => ({
			ok: true,
			status: 200,
			json: async () => ({ objekte: [], anlagen: [], durchlaeufe: [] })
		}));
		vi.stubGlobal('fetch', holen);
		const { abgleichen } = await import('./sync');
		await Promise.all([abgleichen(), abgleichen()]);
		expect(holen).toHaveBeenCalledTimes(1);
	});
});
