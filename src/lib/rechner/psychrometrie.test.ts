import { describe, it, expect } from 'vitest';
import { psychroState, wetBulb, STD_PRESSURE } from './psychrometrie';

describe('wetBulb (Newton-Iteration)', () => {
	it('Bei 100 % rH: Feuchtkugel = Trockenkugel', () => {
		// Saettigung: x = absHumidity(22, 100) ≈ 16.6 g/kg
		const x = 16.6;
		const tWb = wetBulb(22, x);
		expect(tWb).toBeCloseTo(22, 1);
	});
	it('Bei trockener Luft: Feuchtkugel deutlich unter Trockenkugel', () => {
		const tWb = wetBulb(25, 1.0); // 1 g/kg -> sehr trocken
		expect(tWb).toBeLessThan(25);
		expect(tWb).toBeLessThan(12); // ungefaehr 10–11 °C
	});
	it('20 °C / 50 % rH -> Feuchtkugel ≈ 13.8 °C (h,x-Diagramm)', () => {
		// 50 % rH bei 20 °C: x ≈ 7.24 g/kg
		expect(wetBulb(20, 7.24)).toBeCloseTo(13.8, 0);
		expect(Math.abs(wetBulb(20, 7.24) - 13.8)).toBeLessThan(0.3);
	});

	it('trockene Hitze: 32 °C / 20 % rH -> Feuchtkugel ≈ 17 °C', () => {
		// x ≈ 5.9 g/kg, h ≈ 47.3 kJ/kg; gesaettigte Luft mit gleicher
		// Enthalpie hat rund 16.9 °C. Bis 0.16.0 kam hier 18.7 °C heraus.
		const x = ((0.622 * 0.2 * 4757) / (101325 - 0.2 * 4757)) * 1000;
		expect(Math.abs(wetBulb(32, x) - 17.0)).toBeLessThan(0.4);
	});

	it('Feuchtkugel liegt zwischen Taupunkt und Lufttemperatur', () => {
		for (const [t, x] of [
			[30, 5],
			[25, 10],
			[10, 3],
			[-5, 1]
		] as const) {
			const tw = wetBulb(t, x);
			expect(tw).toBeLessThanOrEqual(t);
			expect(tw).toBeGreaterThan(-50);
		}
	});
});

describe('psychroState — t-rh Modus', () => {
	it('22 °C / 50 % rH', () => {
		const r = psychroState({ mode: 't-rh', t: 22, rh: 50 });
		expect(r.t).toBe(22);
		expect(r.rh).toBeCloseTo(50, 5);
		expect(r.x).toBeCloseTo(8.2, 1);
		expect(r.tdp).toBeCloseTo(11.1, 1);
	});
	it('0 % rH -> x = 0', () => {
		const r = psychroState({ mode: 't-rh', t: 22, rh: 0 });
		expect(r.x).toBeCloseTo(0, 4);
	});
});

describe('psychroState — Modus-Konsistenz', () => {
	// Berechne aus t-rh, dann pruefe ob andere Modi die gleichen Werte liefern
	const ref = psychroState({ mode: 't-rh', t: 22, rh: 50 });

	it('t-x Modus rekonstruiert rH aus x', () => {
		const r = psychroState({ mode: 't-x', t: 22, x: ref.x });
		expect(r.rh).toBeCloseTo(ref.rh, 1);
		expect(r.tdp).toBeCloseTo(ref.tdp, 1);
	});
	it('t-tdp Modus rekonstruiert rH aus tdp', () => {
		const r = psychroState({ mode: 't-tdp', t: 22, tdp: ref.tdp });
		expect(r.rh).toBeCloseTo(ref.rh, 1);
		expect(r.x).toBeCloseTo(ref.x, 1);
	});
	it('t-h Modus rekonstruiert rH aus Enthalpie', () => {
		const r = psychroState({ mode: 't-h', t: 22, h: ref.h });
		expect(r.rh).toBeCloseTo(ref.rh, 0);
		expect(r.x).toBeCloseTo(ref.x, 1);
	});
});

describe('psychroState — Vollstaendigkeit', () => {
	it('liefert alle Felder', () => {
		const r = psychroState({ mode: 't-rh', t: 22, rh: 50 });
		expect(r.pSat).toBeGreaterThan(0);
		expect(r.pw).toBeGreaterThan(0);
		expect(r.pw).toBeLessThan(r.pSat);
		expect(r.rho).toBeCloseTo(1.2, 1);
		expect(r.v).toBeGreaterThan(0.8);
		expect(r.tWb).toBeLessThan(r.t);
		expect(r.tWb).toBeGreaterThan(r.tdp);
	});

	it('Druck-Abhaengigkeit: niedrigerer p -> geringere rho', () => {
		const lo = psychroState({ mode: 't-rh', t: 22, rh: 50, pressure: 80000 });
		const hi = psychroState({ mode: 't-rh', t: 22, rh: 50, pressure: STD_PRESSURE });
		expect(lo.rho).toBeLessThan(hi.rho);
	});
});
