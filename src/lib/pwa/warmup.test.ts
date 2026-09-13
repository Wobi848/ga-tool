import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { KERNSEITEN, CACHE } from './warmup';

/* Pruefung der Vorwaermung.
 *
 * Sie entscheidet darüber, ob die installierte App beim ersten Start ohne Netz
 * etwas anzeigt oder die Auffangseite. Drei Dinge duerfen nicht kaputtgehen:
 * sie darf nicht doppelt laufen, nichts Fehlerhaftes ablegen, und sie darf die
 * App nicht mitreissen, wenn der Zwischenspeicher nicht zur Verfuegung steht.
 */

/** Minimaler Cache-Ersatz. */
function cacheAttrappe(vorhanden: string[] = []) {
	const inhalt = new Map<string, unknown>(vorhanden.map((p) => [p, {}]));
	return {
		inhalt,
		match: vi.fn(async (p: string) => inhalt.get(p) ?? undefined),
		put: vi.fn(async (p: string, r: unknown) => {
			inhalt.set(p, r);
		}),
		keys: vi.fn(async () => [...inhalt.keys()])
	};
}

function antwort(ok = true) {
	return { ok, clone: () => ({ ok }) };
}

let cache: ReturnType<typeof cacheAttrappe>;
let holen: ReturnType<typeof vi.fn>;

beforeEach(async () => {
	vi.resetModules();
	cache = cacheAttrappe();
	holen = vi.fn(async () => antwort(true));
	vi.stubGlobal('caches', { open: vi.fn(async () => cache) });
	vi.stubGlobal('fetch', holen);
	vi.stubGlobal('navigator', { onLine: true });
	vi.stubGlobal('window', {});
});

afterEach(() => vi.unstubAllGlobals());

/** Laedt das Modul frisch, damit der "schon gelaufen"-Merker zurueckgesetzt ist. */
async function frisch() {
	return await import('./warmup');
}

describe('Liste der Kernseiten', () => {
	it('enthaelt die Startseite', () => {
		// Das Manifest setzt start_url '/'. Fehlt sie hier, zeigt die
		// installierte App beim ersten Start ohne Netz die Auffangseite.
		expect(KERNSEITEN).toContain('/');
	});

	it('sind lauter absolute Pfade ohne Dubletten', () => {
		for (const p of KERNSEITEN) expect(p.startsWith('/'), p).toBe(true);
		expect(new Set(KERNSEITEN).size).toBe(KERNSEITEN.length);
	});

	it('bleibt kurz — jeder Eintrag kostet eine Anfrage beim ersten Start', () => {
		expect(KERNSEITEN.length).toBeLessThanOrEqual(10);
	});

	it('benutzt denselben Cache-Namen wie die Regel im Service Worker', () => {
		// Steht in vite.config.ts als cacheName der Navigations-Regel. Laufen
		// die beiden auseinander, waermt sie einen Speicher vor, aus dem
		// niemand liest.
		expect(CACHE).toBe('pages-cache');
	});
});

describe('warmeSeitenVor', () => {
	it('holt jede Kernseite und legt sie ab', async () => {
		const { warmeSeitenVor } = await frisch();
		const n = await warmeSeitenVor();
		expect(n).toBe(KERNSEITEN.length);
		expect(holen).toHaveBeenCalledTimes(KERNSEITEN.length);
		for (const p of KERNSEITEN) expect(cache.inhalt.has(p)).toBe(true);
	});

	it('holt nicht, was schon da ist', async () => {
		cache = cacheAttrappe([...KERNSEITEN]);
		vi.stubGlobal('caches', { open: vi.fn(async () => cache) });
		const { warmeSeitenVor } = await frisch();
		expect(await warmeSeitenVor()).toBe(0);
		expect(holen).not.toHaveBeenCalled();
	});

	it('laeuft nur einmal', async () => {
		const { warmeSeitenVor } = await frisch();
		await warmeSeitenVor();
		const zweiterLauf = await warmeSeitenVor();
		expect(zweiterLauf).toBe(0);
		expect(holen).toHaveBeenCalledTimes(KERNSEITEN.length);
	});

	it('tut nichts, wenn der Browser offline ist', async () => {
		vi.stubGlobal('navigator', { onLine: false });
		const { warmeSeitenVor } = await frisch();
		expect(await warmeSeitenVor()).toBe(0);
		expect(holen).not.toHaveBeenCalled();
	});

	it('legt eine Fehlerantwort nicht ab', async () => {
		// Eine gespeicherte 500 waere schlimmer als gar nichts — sie ueberlebt
		// den Fehler und wird spaeter offline ausgeliefert.
		holen.mockResolvedValue(antwort(false));
		const { warmeSeitenVor } = await frisch();
		expect(await warmeSeitenVor()).toBe(0);
		expect(cache.put).not.toHaveBeenCalled();
	});

	it('ueberspringt, was nicht geladen werden kann, und macht weiter', async () => {
		let n = 0;
		holen.mockImplementation(async () => {
			n++;
			if (n === 2) throw new Error('Netz weg');
			return antwort(true);
		});
		const { warmeSeitenVor } = await frisch();
		expect(await warmeSeitenVor()).toBe(KERNSEITEN.length - 1);
	});

	it('wirft nicht, wenn es gar keinen Zwischenspeicher gibt', async () => {
		// Privates Fenster, blockierte Seitendaten: die App muss trotzdem laufen.
		vi.stubGlobal('caches', undefined);
		const { warmeSeitenVor } = await frisch();
		await expect(warmeSeitenVor()).resolves.toBe(0);
	});

	it('wirft nicht, wenn der Zwischenspeicher sich nicht oeffnen laesst', async () => {
		vi.stubGlobal('caches', {
			open: vi.fn(async () => {
				throw new Error('verweigert');
			})
		});
		const { warmeSeitenVor } = await frisch();
		await expect(warmeSeitenVor()).resolves.toBe(0);
	});
});
