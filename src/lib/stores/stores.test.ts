import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { get } from 'svelte/store';

/* Pruefung der Stores.
 *
 * Hier liegt der Zustand, den der Benutzer behaelt: Favoriten und zuletzt
 * Benutztes. Beides haengt an `localStorage`, und beides muss auch dann
 * funktionieren, wenn der nicht da ist — im privaten Fenster, bei blockierten
 * Seitendaten oder waehrend des serverseitigen Renderns.
 *
 * Die Logik-Tests laufen in der node-Umgebung: kein window, kein localStorage,
 * `browser` ist false. Beides wird hier gestellt.
 */

vi.mock('$app/environment', () => ({ browser: true }));

/** Minimaler localStorage-Ersatz. */
function speicherAttrappe() {
	let daten: Record<string, string> = {};
	return {
		getItem: (k: string) => (k in daten ? daten[k] : null),
		setItem: (k: string, v: string) => {
			daten[k] = String(v);
		},
		removeItem: (k: string) => {
			delete daten[k];
		},
		clear: () => {
			daten = {};
		},
		get _daten() {
			return daten;
		}
	};
}

let speicher: ReturnType<typeof speicherAttrappe>;

beforeEach(() => {
	speicher = speicherAttrappe();
	vi.stubGlobal('localStorage', speicher);
	vi.stubGlobal('window', { addEventListener: () => {} });
	// Favoriten schieben nach jedem Wechsel an den Server — im Test ins Leere.
	vi.stubGlobal(
		'fetch',
		vi.fn(() => Promise.resolve({ ok: false, json: () => Promise.resolve([]) }))
	);
	vi.resetModules();
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('recent — zuletzt benutzt', () => {
	it('merkt sich einen Aufruf', async () => {
		const { trackRecent, getRecent } = await import('./recent');
		trackRecent({ type: 'rechner', slug: 'taupunkt', name: 'Taupunkt' });
		const liste = getRecent();
		expect(liste).toHaveLength(1);
		expect(liste[0].slug).toBe('taupunkt');
		expect(typeof liste[0].at).toBe('number');
	});

	it('das Zuletztbenutzte steht vorn', async () => {
		const { trackRecent, getRecent } = await import('./recent');
		trackRecent({ type: 'rechner', slug: 'a', name: 'A' });
		trackRecent({ type: 'rechner', slug: 'b', name: 'B' });
		expect(getRecent().map((x) => x.slug)).toEqual(['b', 'a']);
	});

	it('derselbe Eintrag zweimal erscheint nur einmal — vorn', async () => {
		const { trackRecent, getRecent } = await import('./recent');
		trackRecent({ type: 'rechner', slug: 'a', name: 'A' });
		trackRecent({ type: 'rechner', slug: 'b', name: 'B' });
		trackRecent({ type: 'rechner', slug: 'a', name: 'A' });
		expect(getRecent().map((x) => x.slug)).toEqual(['a', 'b']);
	});

	it('gleicher Slug, anderer Typ sind zwei Eintraege', async () => {
		const { trackRecent, getRecent } = await import('./recent');
		trackRecent({ type: 'rechner', slug: 'taupunkt', name: 'Rechner' });
		trackRecent({ type: 'wissen', slug: 'taupunkt', name: 'Artikel' });
		expect(getRecent()).toHaveLength(2);
	});

	it('haelt hoechstens zehn Eintraege', async () => {
		const { trackRecent, getRecent } = await import('./recent');
		for (let i = 0; i < 15; i++) {
			trackRecent({ type: 'rechner', slug: `s${i}`, name: `S${i}` });
		}
		const liste = getRecent();
		expect(liste).toHaveLength(10);
		expect(liste[0].slug).toBe('s14'); // der neueste
		expect(liste.some((x) => x.slug === 's0')).toBe(false); // der aelteste ist raus
	});

	it('clearRecent raeumt auf', async () => {
		const { trackRecent, getRecent, clearRecent } = await import('./recent');
		trackRecent({ type: 'rechner', slug: 'a', name: 'A' });
		clearRecent();
		expect(getRecent()).toEqual([]);
	});

	it('kaputter Speicherinhalt fuehrt nicht zum Absturz', async () => {
		speicher.setItem('ga-recent', '{kein gueltiges JSON');
		const { getRecent, trackRecent } = await import('./recent');
		expect(getRecent()).toEqual([]);
		expect(() => trackRecent({ type: 'rechner', slug: 'a', name: 'A' })).not.toThrow();
	});
});

describe('favorites — Favoriten', () => {
	it('startet leer', async () => {
		const { favorites } = await import('./favorites');
		expect(get(favorites)).toEqual([]);
	});

	it('toggle legt an und nimmt wieder weg', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'pid-regler', title: 'PID-Regler' });
		expect(get(favorites)).toHaveLength(1);
		favorites.toggle({ type: 'artikel', slug: 'pid-regler', title: 'PID-Regler' });
		expect(get(favorites)).toEqual([]);
	});

	it('setzt einen Zeitstempel', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'rechner', slug: 'taupunkt', title: 'Taupunkt' });
		expect(get(favorites)[0].addedAt).toBeGreaterThan(0);
	});

	it('gleicher Slug, anderer Typ sind zwei Favoriten', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'taupunkt', title: 'Artikel' });
		favorites.toggle({ type: 'rechner', slug: 'taupunkt', title: 'Rechner' });
		expect(get(favorites)).toHaveLength(2);
	});

	it('isFav erkennt Typ und Slug zusammen', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'pid-regler', title: 'PID' });
		const liste = get(favorites);
		expect(favorites.isFav('artikel', 'pid-regler', liste)).toBe(true);
		expect(favorites.isFav('rechner', 'pid-regler', liste)).toBe(false);
		expect(favorites.isFav('artikel', 'gibt-es-nicht', liste)).toBe(false);
	});

	it('remove nimmt gezielt einen weg', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'a', title: 'A' });
		favorites.toggle({ type: 'artikel', slug: 'b', title: 'B' });
		favorites.remove('artikel', 'a');
		expect(get(favorites).map((f) => f.slug)).toEqual(['b']);
	});

	it('remove auf etwas Nichtvorhandenes aendert nichts', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'a', title: 'A' });
		favorites.remove('artikel', 'gibt-es-nicht');
		expect(get(favorites)).toHaveLength(1);
	});

	it('schreibt in den Speicher, damit es den Neuladen ueberlebt', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'pid-regler', title: 'PID' });
		const roh = speicher.getItem('ga-favorites');
		expect(roh).toBeTruthy();
		expect(JSON.parse(roh!)[0].slug).toBe('pid-regler');
	});

	it('liest Vorhandenes beim Start wieder ein', async () => {
		speicher.setItem(
			'ga-favorites',
			JSON.stringify([{ type: 'rechner', slug: 'kv-wert', title: 'Kv', addedAt: 1 }])
		);
		const { favorites } = await import('./favorites');
		expect(get(favorites)).toHaveLength(1);
		expect(get(favorites)[0].slug).toBe('kv-wert');
	});

	it('kaputter Speicherinhalt fuehrt nicht zum Absturz', async () => {
		speicher.setItem('ga-favorites', 'kein JSON');
		const { favorites } = await import('./favorites');
		expect(get(favorites)).toEqual([]);
	});

	it('syncFromServer haelt den lokalen Stand, wenn der Server nicht antwortet', async () => {
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'lokal', title: 'Lokal' });
		await favorites.syncFromServer(); // fetch liefert ok:false
		expect(get(favorites).map((f) => f.slug)).toEqual(['lokal']);
	});

	it('syncFromServer uebernimmt die Serverliste, wenn sie kommt', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn(() =>
				Promise.resolve({
					ok: true,
					json: () =>
						Promise.resolve([{ type: 'referenz', slug: 'dn-rohre', title: 'DN', addedAt: 5 }])
				})
			)
		);
		const { favorites } = await import('./favorites');
		favorites.toggle({ type: 'artikel', slug: 'lokal', title: 'Lokal' });
		await favorites.syncFromServer();
		expect(get(favorites).map((f) => f.slug)).toEqual(['dn-rohre']);
	});
});

describe('Beschriftungen, Farben und Ziele der Favoriten', () => {
	const TYPEN = ['artikel', 'rechner', 'konverter', 'referenz', 'checkliste'];

	it('jeder Typ hat Beschriftung, Farbe und Ziel', async () => {
		const { favTypeLabel, favTypeColor, favTypeHref } = await import('./favorites');
		for (const t of TYPEN) {
			expect(favTypeLabel[t as keyof typeof favTypeLabel]?.length, t).toBeGreaterThan(0);
			expect(favTypeColor[t as keyof typeof favTypeColor], t).toMatch(/^#[0-9a-fA-F]{3,8}$/);
			expect(favTypeHref[t as keyof typeof favTypeHref], t).toMatch(/^\//);
		}
	});

	it('die drei Verzeichnisse decken dieselben Typen ab', async () => {
		const { favTypeLabel, favTypeColor, favTypeHref } = await import('./favorites');
		expect(Object.keys(favTypeLabel).sort()).toEqual([...TYPEN].sort());
		expect(Object.keys(favTypeColor).sort()).toEqual([...TYPEN].sort());
		expect(Object.keys(favTypeHref).sort()).toEqual([...TYPEN].sort());
	});
});
