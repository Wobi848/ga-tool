import { describe, it, expect, beforeAll } from 'vitest';
import {
	search,
	groupByType,
	ensureSearchCorpus,
	typeLabels,
	typeColors,
	type SearchType,
	type SearchItem
} from './index';

/* Pruefung der globalen Suche.
 *
 * Die Suche ist der Einstieg ins ganze Portal (Ctrl+K) und zieht aus sechs
 * Quellen zugleich. Zwei Dinge gehen hier still kaputt: ein Eintragstyp faellt
 * aus dem Index, ohne dass jemand es merkt — und die erzeugten URLs zeigen
 * irgendwohin, weil sich anderswo ein Pfad geaendert hat.
 */

const TYPEN: SearchType[] = [
	'konverter',
	'rechner',
	'wissen',
	'abkuerzung',
	'referenz',
	'checkliste'
];

/** Ohne Query liefert search() den ungefilterten Anfang des Index. */
const alle = (n = 5000) => search('', n);

describe('Index', () => {
	it('enthaelt Eintraege aus allen sechs Quellen', () => {
		const vorhanden = new Set(alle().map((i) => i.type));
		for (const t of TYPEN) {
			expect(vorhanden.has(t), `Typ "${t}" fehlt im Suchindex`).toBe(true);
		}
	});

	it('jeder Eintrag hat Titel, Slug und URL', () => {
		for (const i of alle()) {
			expect(i.title?.trim().length, `${i.type}/${i.slug}: leerer Titel`).toBeGreaterThan(0);
			expect(i.slug?.length, `${i.type}: leerer Slug`).toBeGreaterThan(0);
			expect(i.url.startsWith('/'), `${i.type}/${i.slug}: URL "${i.url}"`).toBe(true);
		}
	});

	it('URLs zeigen auf den Pfad, der zum Typ gehoert', () => {
		const pfad: Record<SearchType, string> = {
			konverter: '/konverter/',
			rechner: '/rechner/',
			wissen: '/wissen/',
			// Abkuerzungen verlinken auf ihren Artikel, sonst auf die Liste
			abkuerzung: '/',
			referenz: '/referenz/',
			checkliste: '/checklisten/'
		};
		for (const i of alle()) {
			if (i.type === 'abkuerzung') {
				expect(
					i.url.startsWith('/wissen/') || i.url.startsWith('/abkuerzungen?q='),
					`${i.slug}: unerwartete URL "${i.url}"`
				).toBe(true);
				continue;
			}
			expect(i.url.startsWith(pfad[i.type]), `${i.type}/${i.slug}: "${i.url}"`).toBe(true);
		}
	});

	it('Slug und Typ zusammen sind eindeutig', () => {
		const schluessel = alle().map((i) => `${i.type}/${i.slug}`);
		const doppelt = [...new Set(schluessel.filter((s, n) => schluessel.indexOf(s) !== n))];
		expect(doppelt, `doppelt im Index: ${doppelt.slice(0, 5).join(', ')}`).toEqual([]);
	});
});

describe('search()', () => {
	it('leere Eingabe liefert die Liste, nicht nichts', () => {
		expect(search('').length).toBeGreaterThan(0);
		expect(search('   ').length).toBeGreaterThan(0);
	});

	it('haelt die Ergebnisgrenze ein', () => {
		expect(search('', 3)).toHaveLength(3);
		expect(search('temperatur', 2).length).toBeLessThanOrEqual(2);
	});

	it('findet einen Wissensartikel ueber seinen Titel', () => {
		const treffer = search('Heizkurve', 20);
		expect(treffer.some((t) => t.slug === 'heizkurve')).toBe(true);
	});

	it('findet einen Rechner', () => {
		const treffer = search('Taupunkt', 20);
		expect(treffer.some((t) => t.type === 'rechner')).toBe(true);
	});

	it('findet eine Abkuerzung ueber das Kuerzel', () => {
		const treffer = search('PID', 20);
		expect(treffer.some((t) => t.type === 'abkuerzung' && t.slug === 'pid')).toBe(true);
	});

	it('findet auch bei Vertippern — dafuer ist die Fuzzy-Suche da', () => {
		const treffer = search('Heizkuve', 20); // ein Buchstabe fehlt
		expect(treffer.some((t) => t.slug === 'heizkurve')).toBe(true);
	});

	it('findet ueber englische Titel', () => {
		const treffer = search('Dew Point', 20);
		expect(treffer.length).toBeGreaterThan(0);
	});

	it('liefert bei Unsinn nichts statt irgendetwas', () => {
		expect(search('qwertzuiopasdfghjkl', 20)).toEqual([]);
	});
});

describe('ensureSearchCorpus()', () => {
	beforeAll(async () => {
		await ensureSearchCorpus();
	});

	it('mehrfacher Aufruf ist unschaedlich', async () => {
		await expect(ensureSearchCorpus()).resolves.toBeUndefined();
		await expect(ensureSearchCorpus()).resolves.toBeUndefined();
	});

	it('haengt Volltext an die Wissensartikel', () => {
		const mitText = alle().filter((i) => i.type === 'wissen' && i.body);
		expect(mitText.length).toBeGreaterThan(50);
	});

	it('findet danach auch Begriffe aus dem Fliesstext', () => {
		// "Ziegler-Nichols" steht im PID-Artikel im Text, nicht im Titel.
		const treffer = search('Ziegler-Nichols', 20);
		expect(treffer.some((t) => t.type === 'wissen')).toBe(true);
	});

	it('nur Wissensartikel bekommen einen Body', () => {
		for (const i of alle()) {
			if (i.type !== 'wissen') {
				expect(i.body, `${i.type}/${i.slug} hat unerwartet einen Body`).toBeUndefined();
			}
		}
	});
});

describe('groupByType()', () => {
	it('sortiert nach Typ und verliert nichts', () => {
		const liste = search('', 50);
		const gruppen = groupByType(liste);
		const summe = Object.values(gruppen).reduce((n, g) => n + g.length, 0);
		expect(summe).toBe(liste.length);
	});

	it('jede Gruppe enthaelt nur ihren eigenen Typ', () => {
		const gruppen = groupByType(search('', 200));
		for (const [typ, eintraege] of Object.entries(gruppen)) {
			for (const e of eintraege as SearchItem[]) expect(e.type).toBe(typ);
		}
	});

	it('leere Liste ergibt leere Gruppierung', () => {
		expect(groupByType([])).toEqual({});
	});
});

describe('Beschriftung und Farbe', () => {
	it('jeder Typ hat eine Beschriftung und eine Farbe', () => {
		for (const t of TYPEN) {
			expect(typeLabels[t]?.trim().length, `${t}: keine Beschriftung`).toBeGreaterThan(0);
			expect(typeColors[t], `${t}: keine Farbe`).toMatch(/^#[0-9a-fA-F]{3,8}$/);
		}
	});

	it('es gibt keine Beschriftung fuer einen Typ, den es nicht gibt', () => {
		expect(Object.keys(typeLabels).sort()).toEqual([...TYPEN].sort());
		expect(Object.keys(typeColors).sort()).toEqual([...TYPEN].sort());
	});
});
