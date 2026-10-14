import { describe, it, expect } from 'vitest';
import { stufeZuProzent, prozentZuStufe, dali } from './dali';

/* DALI-Dimmkurve nach IEC 62386-102. Fixpunkte, die man im Feld kennt. */
describe('DALI-Dimmkurve', () => {
	it('Stufe 1 = 0.1 %, Stufe 254 = 100 %, Stufe 0 = aus', () => {
		expect(stufeZuProzent(1)).toBeCloseTo(0.1, 6);
		expect(stufeZuProzent(254)).toBeCloseTo(100, 6);
		expect(stufeZuProzent(0)).toBe(0);
	});

	it('Stufe 170 ≈ 10 %, 50 % ≈ Stufe 229', () => {
		expect(stufeZuProzent(170)).toBeCloseTo(10.1, 1);
		expect(prozentZuStufe(50)).toBe(229);
	});

	it('hin und zurueck ergibt dieselbe Stufe', () => {
		for (const n of [1, 2, 50, 100, 170, 200, 229, 254]) {
			expect(prozentZuStufe(stufeZuProzent(n))).toBe(n);
		}
	});

	it('der Konverter rechnet ueber Prozent', () => {
		expect(dali.fromBase(dali.toBase(170, 'level'), 'pct')).toBeCloseTo(10.1, 1);
	});
});
