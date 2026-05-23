import { describe, it, expect } from 'vitest';
import { expansionPct, sizeMag, minP0, STD_MAG_SIZES } from './ausdehnungsgefaess';

describe('expansionPct', () => {
	it('Tabellenwerte exakt', () => {
		expect(expansionPct(40)).toBe(0.79);
		expect(expansionPct(70)).toBe(2.28);
		expect(expansionPct(110)).toBe(5.15);
	});
	it('interpoliert linear zwischen Stuetzpunkten', () => {
		// Zwischen 70 (2.28) und 80 (2.9): 75 → 2.59
		expect(expansionPct(75)).toBeCloseTo(2.59, 2);
	});
	it('saettigt unter 40 °C auf 0.79 %', () => {
		expect(expansionPct(0)).toBe(0.79);
		expect(expansionPct(-50)).toBe(0.79);
	});
	it('saettigt ueber 110 °C auf 5.15 %', () => {
		expect(expansionPct(150)).toBe(5.15);
	});
	it('monoton steigend zwischen 40 und 110', () => {
		for (let t = 40; t < 110; t += 5) {
			expect(expansionPct(t + 5)).toBeGreaterThan(expansionPct(t));
		}
	});
});

describe('sizeMag', () => {
	it('Standard-EFH-Auslegung: 500 l, 70 °C VL, 1.5/2.5 bar', () => {
		const r = sizeMag({ vA: 500, tVorlauf: 70, p0: 1.5, pE: 2.5 });
		// ePct = 2.28 → ve = 11.4 l
		expect(r.ve).toBeCloseTo(11.4, 1);
		// vWv = max(500*0.005, 3) = 3 l? 500*0.005 = 2.5, so 3 l
		expect(r.vWv).toBe(3);
		// druckfaktor = (2.5+1)/(2.5-1.5) = 3.5
		expect(r.druckfaktor).toBeCloseTo(3.5, 2);
		// vN = (11.4 + 3) × 3.5 = 50.4 l → recommended 80 l
		expect(r.vN).toBeCloseTo(50.4, 1);
		expect(r.recommended).toBe(80);
	});

	it('Wasservorlage = 0.5 % bei grosser Anlage (>600 l)', () => {
		const r = sizeMag({ vA: 1000, tVorlauf: 70, p0: 1.5, pE: 2.5 });
		expect(r.vWv).toBe(5); // 1000 × 0.005
	});

	it('empfiehlt naechstgroesseren Standardwert', () => {
		const r = sizeMag({ vA: 100, tVorlauf: 70, p0: 1.5, pE: 2.5 });
		expect(STD_MAG_SIZES).toContain(r.recommended);
		expect(r.recommended).toBeGreaterThanOrEqual(r.vN);
	});

	it('saturiert auf groesste Standard-Groesse bei sehr grosser Anlage', () => {
		const r = sizeMag({ vA: 50_000, tVorlauf: 90, p0: 1.5, pE: 2.5 });
		expect(r.recommended).toBe(1000);
	});

	it('druckfaktor unendlich wenn pE = p0 (Auslegungs-Edge-Case)', () => {
		const r = sizeMag({ vA: 500, tVorlauf: 70, p0: 2.5, pE: 2.5 });
		expect(r.druckfaktor).toBe(Infinity);
	});
});

describe('minP0', () => {
	it('1 bar pro 10 m Hoehe + 0.3 bar Reserve', () => {
		expect(minP0(0)).toBeCloseTo(0.3, 5);
		expect(minP0(10)).toBeCloseTo(1.3, 5);
		expect(minP0(30)).toBeCloseTo(3.3, 5);
	});
});
