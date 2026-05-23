import { describe, it, expect } from 'vitest';
import {
	voltageDrop,
	maxLength,
	recommendCrossSection,
	isCurrentOk,
	RHO_CU,
	STD_SECTIONS
} from './leitungslaenge';

describe('voltageDrop', () => {
	it('Worst-Case (end): ΔU = 2·L·ρ·I/A', () => {
		// L=50, A=0.75, I=0.5 -> ΔU = 2×50×0.0178×0.5/0.75 = 1.187 V
		const r = voltageDrop({ uSource: 24, length: 50, crossSection: 0.75, current: 0.5 });
		expect(r.deltaU).toBeCloseTo(1.187, 2);
		expect(r.Ieff).toBe(0.5);
		expect(r.uEnd).toBeCloseTo(24 - 1.187, 2);
	});

	it('Distributed (dist): halber effektiver Strom', () => {
		const end = voltageDrop({
			uSource: 24,
			length: 50,
			crossSection: 0.75,
			current: 0.5,
			placement: 'end'
		});
		const dist = voltageDrop({
			uSource: 24,
			length: 50,
			crossSection: 0.75,
			current: 0.5,
			placement: 'dist'
		});
		expect(dist.deltaU).toBeCloseTo(end.deltaU / 2, 4);
	});

	it('Drop scaling: linear in length, current; inverse in crossSection', () => {
		const base = voltageDrop({ uSource: 24, length: 50, crossSection: 1.0, current: 1.0 });
		const doubleLen = voltageDrop({ uSource: 24, length: 100, crossSection: 1.0, current: 1.0 });
		const doubleI = voltageDrop({ uSource: 24, length: 50, crossSection: 1.0, current: 2.0 });
		const doubleA = voltageDrop({ uSource: 24, length: 50, crossSection: 2.0, current: 1.0 });

		expect(doubleLen.deltaU).toBeCloseTo(base.deltaU * 2, 4);
		expect(doubleI.deltaU).toBeCloseTo(base.deltaU * 2, 4);
		expect(doubleA.deltaU).toBeCloseTo(base.deltaU / 2, 4);
	});

	it('dropPct: 0 wenn Quellspannung 0', () => {
		const r = voltageDrop({ uSource: 0, length: 50, crossSection: 0.75, current: 0.5 });
		expect(r.dropPct).toBe(0);
	});

	it('rTotal entspricht der Schleifen-Formel', () => {
		const r = voltageDrop({ uSource: 24, length: 50, crossSection: 1.0, current: 1.0 });
		expect(r.rTotal).toBeCloseTo((2 * 50 * RHO_CU) / 1.0, 6);
	});
});

describe('maxLength', () => {
	it('begrenzt durch zulaessigen Spannungsfall', () => {
		// 24 V Quelle, 20.4 V minimum -> 3.6 V drop erlaubt
		// L_max = (3.6 × 0.75) / (2 × 0.0178 × 0.5) = 151.7 m
		const Lmax = maxLength(24, 20.4, 0.75, 0.5);
		expect(Lmax).toBeCloseTo(151.7, 0);
	});

	it('0 wenn uMinDevice >= uSource (kein Drop erlaubt)', () => {
		expect(maxLength(24, 24, 0.75, 0.5)).toBe(0);
		expect(maxLength(24, 25, 0.75, 0.5)).toBe(0);
	});

	it('0 bei Strom <= 0', () => {
		expect(maxLength(24, 20.4, 0.75, 0)).toBe(0);
	});

	it('dist verdoppelt die maximale Laenge ggu. end', () => {
		const end = maxLength(24, 20.4, 0.75, 0.5, 'end');
		const dist = maxLength(24, 20.4, 0.75, 0.5, 'dist');
		expect(dist).toBeCloseTo(end * 2, 1);
	});
});

describe('recommendCrossSection', () => {
	it('empfiehlt naechsten Standardwert', () => {
		const r = recommendCrossSection(24, 20.4, 50, 0.5);
		expect(STD_SECTIONS).toContain(r.recommended);
		expect(r.recommended).toBeGreaterThanOrEqual(r.required);
	});

	it('saturiert bei sehr hohem Strom auf grossen Standard', () => {
		const r = recommendCrossSection(24, 20.4, 200, 5);
		expect(r.recommended).toBe(STD_SECTIONS[STD_SECTIONS.length - 1]);
	});

	it('returns kleinster Standard wenn Bedarf 0', () => {
		expect(recommendCrossSection(24, 24, 50, 0.5).recommended).toBe(STD_SECTIONS[0]);
	});
});

describe('isCurrentOk', () => {
	it('akzeptiert Strom <= Belastbarkeit', () => {
		expect(isCurrentOk(1.0, 10)).toBe(true);
		expect(isCurrentOk(1.0, 15)).toBe(true);
		expect(isCurrentOk(1.0, 15.1)).toBe(false);
	});
	it('unbekannter Querschnitt -> true (kein Wert hinterlegt)', () => {
		expect(isCurrentOk(99, 1000)).toBe(true);
	});
});
