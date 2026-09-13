import { describe, it, expect } from 'vitest';
import { de } from './de';
import { en } from './en';

/* Pruefung der Uebersetzungen.
 *
 * 1300 Zeilen je Sprache. Ein Schluessel, den jemand nur auf einer Seite
 * ergaenzt, faellt im Betrieb erst auf, wenn ein Englischsprachiger auf die
 * Seite kommt — und dann steht dort der rohe Schluesselname.
 */

type Baum = Record<string, unknown>;

/** Alle Schluesselpfade eines verschachtelten Objekts. */
function pfade(o: Baum, praefix = ''): string[] {
	return Object.entries(o).flatMap(([k, v]) => {
		const p = praefix ? `${praefix}.${k}` : k;
		return v && typeof v === 'object' && !Array.isArray(v) ? pfade(v as Baum, p) : [p];
	});
}

const deP = pfade(de as Baum);
const enP = pfade(en as Baum);

describe('Deutsch und Englisch', () => {
	it('haben dieselben Schluessel', () => {
		const nurDe = deP.filter((p) => !enP.includes(p));
		const nurEn = enP.filter((p) => !deP.includes(p));
		expect(nurDe, `nur auf Deutsch: ${nurDe.join(', ')}`).toEqual([]);
		expect(nurEn, `nur auf Englisch: ${nurEn.join(', ')}`).toEqual([]);
	});

	it('haben keine leeren Texte', () => {
		for (const [name, baum] of [
			['de', de],
			['en', en]
		] as const) {
			const leer = pfade(baum as Baum).filter((p) => {
				const wert = p.split('.').reduce<unknown>((o, k) => (o as Baum)?.[k], baum);
				return typeof wert === 'string' && !wert.trim();
			});
			expect(leer, `${name}: leer bei ${leer.join(', ')}`).toEqual([]);
		}
	});

	it('benutzen dieselben Platzhalter je Schluessel', () => {
		// {anzahl} nur auf einer Seite heisst: dort steht spaeter eine Zahl,
		// hier bleibt die geschweifte Klammer stehen.
		const abweichend: string[] = [];
		for (const p of deP) {
			const hole = (b: unknown) => p.split('.').reduce<unknown>((o, k) => (o as Baum)?.[k], b);
			const d = hole(de);
			const e = hole(en);
			if (typeof d !== 'string' || typeof e !== 'string') continue;
			const muster = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
			if (muster(d).join(',') !== muster(e).join(',')) abweichend.push(p);
		}
		expect(abweichend, `abweichende Platzhalter: ${abweichend.join(', ')}`).toEqual([]);
	});
});

describe('Bestand', () => {
	it('es gibt reichlich Schluessel', () => {
		expect(deP.length).toBeGreaterThan(500);
	});

	it('der neue Objekte-Bereich ist auf beiden Seiten da', () => {
		expect(deP.some((p) => p.startsWith('objekte.'))).toBe(true);
		expect(enP.some((p) => p.startsWith('objekte.'))).toBe(true);
	});
});
