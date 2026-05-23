import { describe, it, expect } from 'vitest';
import { waermeleistung, MEDIA_PROPS } from './waermeleistung';

describe('waermeleistung — q-from-flow', () => {
	it('Wasser 1 m³/h, ΔT=10 K -> ~11.6 kW', () => {
		// ṁ = (1/3600) × 1000 = 0.2778 kg/s
		// Q = 0.2778 × 4.182 × 10 = 11.62 kW
		const r = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		expect(r.Q).toBeCloseTo(11.62, 1);
		expect(r.mDot).toBeCloseTo(0.2778, 3);
	});

	it('Q skaliert linear mit Volumenstrom', () => {
		const r1 = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		const r2 = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 2.0,
			dt: 10,
			q: 0
		});
		expect(r2.Q).toBeCloseTo(r1.Q * 2, 3);
	});

	it('Q skaliert linear mit ΔT', () => {
		const r1 = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		const r2 = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 20,
			q: 0
		});
		expect(r2.Q).toBeCloseTo(r1.Q * 2, 3);
	});

	it('Sole30 hat geringere Waermekapazitaet als Wasser', () => {
		const wasser = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		const sole = waermeleistung({
			mode: 'q-from-flow',
			medium: 'sole30',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		expect(sole.Q).toBeLessThan(wasser.Q);
	});

	it('Luft hat sehr niedriges ρ -> tiny Q bei gleichem Volumenstrom', () => {
		const luft = waermeleistung({
			mode: 'q-from-flow',
			medium: 'luft',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		const wasser = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.0,
			dt: 10,
			q: 0
		});
		expect(luft.Q).toBeLessThan(wasser.Q / 100);
	});
});

describe('waermeleistung — flow-from-q', () => {
	it('Wasser, Q=11.62 kW, ΔT=10 -> ~1 m³/h', () => {
		const r = waermeleistung({
			mode: 'flow-from-q',
			medium: 'wasser',
			flow: 0,
			dt: 10,
			q: 11.62
		});
		expect(r.flow).toBeCloseTo(1.0, 2);
	});

	it('Round-trip: q-from-flow -> flow-from-q rekonstruiert Volumenstrom', () => {
		const forward = waermeleistung({
			mode: 'q-from-flow',
			medium: 'wasser',
			flow: 1.5,
			dt: 8,
			q: 0
		});
		const back = waermeleistung({
			mode: 'flow-from-q',
			medium: 'wasser',
			flow: 0,
			dt: 8,
			q: forward.Q
		});
		expect(back.flow).toBeCloseTo(1.5, 5);
	});

	it('Guard: ΔT = 0 -> flow = 0 statt Division durch 0', () => {
		const r = waermeleistung({
			mode: 'flow-from-q',
			medium: 'wasser',
			flow: 0,
			dt: 0,
			q: 10
		});
		expect(r.flow).toBe(0);
	});
});

describe('waermeleistung — dt-from-q', () => {
	it('Wasser, Q=11.62 kW, 1 m³/h -> ΔT≈10 K', () => {
		const r = waermeleistung({
			mode: 'dt-from-q',
			medium: 'wasser',
			flow: 1.0,
			dt: 0,
			q: 11.62
		});
		expect(r.dt).toBeCloseTo(10, 1);
	});

	it('Round-trip: q-from-flow -> dt-from-q rekonstruiert ΔT', () => {
		const forward = waermeleistung({
			mode: 'q-from-flow',
			medium: 'sole30',
			flow: 1.2,
			dt: 7,
			q: 0
		});
		const back = waermeleistung({
			mode: 'dt-from-q',
			medium: 'sole30',
			flow: 1.2,
			dt: 0,
			q: forward.Q
		});
		expect(back.dt).toBeCloseTo(7, 5);
	});

	it('Guard: flow = 0 -> ΔT = 0', () => {
		const r = waermeleistung({
			mode: 'dt-from-q',
			medium: 'wasser',
			flow: 0,
			dt: 0,
			q: 10
		});
		expect(r.dt).toBe(0);
	});
});

describe('MEDIA_PROPS', () => {
	it('hat alle 4 Medien mit cp und rho', () => {
		for (const m of ['wasser', 'sole30', 'sole40', 'luft'] as const) {
			expect(MEDIA_PROPS[m].cp).toBeGreaterThan(0);
			expect(MEDIA_PROPS[m].rho).toBeGreaterThan(0);
		}
	});
	it('Wasser hat hoechste cp aller Medien', () => {
		expect(MEDIA_PROPS.wasser.cp).toBeGreaterThan(MEDIA_PROPS.sole30.cp);
		expect(MEDIA_PROPS.wasser.cp).toBeGreaterThan(MEDIA_PROPS.luft.cp);
	});
});
