import { describe, it, expect } from 'vitest';
import { abbreviations } from './data';
import type { Abbreviation } from './types';

/* Konsistenzpruefung des Abkuerzungsverzeichnisses.
 *
 * 233 Eintraege, von Hand gepflegt. Was hier still kaputtgeht: ein Kuerzel
 * doppelt eingetragen (die Suche zeigt dann zwei Treffer), ein `related`, das
 * ins Leere zeigt, oder ein `wissenSlug` auf einen Artikel, den es nicht mehr
 * gibt — Letzteres erzeugt im Portal einen toten Link.
 */

const AREAS = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];
const LANGS = ['de', 'en', 'intl'];

const kuerzel = new Set(abbreviations.map((a) => a.short));

describe('Abkuerzungen — Bestand', () => {
	it('es gibt Eintraege', () => {
		expect(abbreviations.length).toBeGreaterThan(100);
	});

	it('Kuerzel sind eindeutig', () => {
		const alle = abbreviations.map((a) => a.short);
		const doppelt = [...new Set(alle.filter((s, i) => alle.indexOf(s) !== i))];
		expect(doppelt, `doppelte Kuerzel: ${doppelt.join(', ')}`).toEqual([]);
	});
});

describe('Abkuerzungen — jeder Eintrag', () => {
	it('hat ein Kuerzel und eine Langform', () => {
		for (const a of abbreviations) {
			expect(a.short.trim().length, `leeres short`).toBeGreaterThan(0);
			expect(a.long.trim().length, `${a.short}: leere Langform`).toBeGreaterThan(0);
		}
	});

	it('nennt mindestens einen gueltigen Fachbereich', () => {
		for (const a of abbreviations) {
			expect(a.areas.length, `${a.short}: keine Fachbereiche`).toBeGreaterThan(0);
			for (const bereich of a.areas) {
				expect(AREAS, `${a.short}: unbekannter Bereich "${bereich}"`).toContain(bereich);
			}
		}
	});

	it('traegt, wenn gesetzt, eine gueltige Sprachkennung', () => {
		for (const a of abbreviations) {
			if (a.lang === undefined) continue;
			expect(LANGS, `${a.short}: unbekannte Sprache "${a.lang}"`).toContain(a.lang);
		}
	});

	it('hat zu jeder deutschen Erklaerung eine englische', () => {
		// Anders als bei den Referenztabellen ist das hier durchgehalten:
		// alle 233 Eintraege haben beides. Die Pruefung haelt das fest.
		for (const a of abbreviations) {
			if (!a.description) continue;
			expect(a.descriptionEn?.trim(), `${a.short}: ohne descriptionEn`).toBeTruthy();
		}
	});

	it('keine leeren Erklaerungen', () => {
		for (const a of abbreviations) {
			for (const feld of ['description', 'descriptionEn'] as const) {
				const v = a[feld];
				if (v !== undefined) {
					expect(v.trim().length, `${a.short}: leeres ${feld}`).toBeGreaterThan(0);
				}
			}
		}
	});
});

describe('Abkuerzungen — Querverweise', () => {
	it('jedes related zeigt auf ein vorhandenes Kuerzel', () => {
		const tot: string[] = [];
		for (const a of abbreviations) {
			for (const r of a.related ?? []) {
				if (!kuerzel.has(r)) tot.push(`${a.short} → ${r}`);
			}
		}
		expect(tot, `tote Verweise: ${tot.join(', ')}`).toEqual([]);
	});

	it('kein Eintrag verweist auf sich selbst', () => {
		for (const a of abbreviations) {
			expect(a.related ?? [], `${a.short} verweist auf sich selbst`).not.toContain(a.short);
		}
	});

	it('related enthaelt keine Dubletten', () => {
		for (const a of abbreviations) {
			const r = a.related ?? [];
			expect(new Set(r).size, `${a.short}: doppelte Verweise`).toBe(r.length);
		}
	});
});

describe('Abkuerzungen — Verweise in die Wissensbasis', () => {
	it('jeder wissenSlug zeigt auf einen vorhandenen Artikel', async () => {
		// Der Index wird beim Build erzeugt; ohne ihn hat die Pruefung keine
		// Grundlage und wird uebersprungen statt falsch gruen zu melden.
		const mod = (await import('../wissen/articles.generated.json')) as {
			default: Array<{ slug: string }>;
		};
		const slugs = new Set(mod.default.map((a) => a.slug));
		expect(slugs.size).toBeGreaterThan(50);

		const tot: string[] = [];
		for (const a of abbreviations) {
			if (a.wissenSlug && !slugs.has(a.wissenSlug)) tot.push(`${a.short} → ${a.wissenSlug}`);
		}
		expect(tot, `tote Artikel-Links: ${tot.join(', ')}`).toEqual([]);
	});
});

describe('Abkuerzungen — Sortierung und Form', () => {
	it('Kuerzel enthalten keine fuehrenden oder nachlaufenden Leerzeichen', () => {
		for (const a of abbreviations) {
			expect(a.short, `"${a.short}" hat Randleerzeichen`).toBe(a.short.trim());
			expect(a.long, `${a.short}: Langform hat Randleerzeichen`).toBe(a.long.trim());
		}
	});

	it('die Langform wiederholt nicht nur das Kuerzel', () => {
		for (const a of abbreviations as Abbreviation[]) {
			expect(a.long.toLowerCase(), `${a.short}: Langform ist identisch mit dem Kuerzel`).not.toBe(
				a.short.toLowerCase()
			);
		}
	});
});
