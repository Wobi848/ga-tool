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
	it('20 °C / 50 % rH -> Feuchtkugel ≈ 13.7 °C (Chart)', () => {
		// 50 % rH bei 20 °C: x ≈ 7.24 g/kg
		const tWb = wetBulb(20, 7.24);
		expect(tWb).toBeCloseTo(13.7, 0);
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
