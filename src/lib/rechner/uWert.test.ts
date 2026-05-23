import { describe, it, expect } from 'vitest';
import { uWert, SURFACE_PRESETS, SIA_LIMITS, type Layer } from './uWert';

describe('uWert', () => {
	it('Einlagen-Daemmstoff 100 mm λ=0.04 (Wand aussen)', () => {
		const layers: Layer[] = [{ label: 'EPS', lambda: 0.04, thickness: 100 }];
		const r = uWert(layers, 0.13, 0.04);
		// R = 0.1/0.04 = 2.5; R_total = 0.13+2.5+0.04 = 2.67
		// U = 1/2.67 = 0.374
		expect(r.rt).toBeCloseTo(2.5, 3);
		expect(r.rTotal).toBeCloseTo(2.67, 2);
		expect(r.u).toBeCloseTo(0.374, 2);
		expect(r.dTotal).toBe(100);
	});

	it('Realistische Aussenwand (4 Schichten)', () => {
		const layers: Layer[] = [
			{ label: 'Aussenputz', lambda: 0.87, thickness: 20 },
			{ label: 'Vollziegel', lambda: 0.68, thickness: 240 },
			{ label: 'Mineralwolle', lambda: 0.035, thickness: 120 },
			{ label: 'Innenputz', lambda: 0.87, thickness: 15 }
		];
		const r = uWert(layers, 0.13, 0.04);
		// R_layers = 0.023 + 0.353 + 3.429 + 0.017 = 3.822
		expect(r.rt).toBeCloseTo(3.822, 2);
		expect(r.rTotal).toBeCloseTo(3.992, 2);
		expect(r.u).toBeCloseTo(0.25, 2);
		expect(r.dTotal).toBe(395);
	});

	it('Mehr Daemmung -> kleinerer U-Wert', () => {
		const thin = uWert([{ label: 'EPS', lambda: 0.04, thickness: 50 }], 0.13, 0.04);
		const thick = uWert([{ label: 'EPS', lambda: 0.04, thickness: 200 }], 0.13, 0.04);
		expect(thick.u).toBeLessThan(thin.u);
	});

	it('Niedrigeres λ -> kleinerer U-Wert (besserer Daemmstoff)', () => {
		const standard = uWert([{ label: 'A', lambda: 0.04, thickness: 100 }], 0.13, 0.04);
		const premium = uWert([{ label: 'B', lambda: 0.025, thickness: 100 }], 0.13, 0.04);
		expect(premium.u).toBeLessThan(standard.u);
	});

	it('Leere Schichtliste: rt = 0, U = 1/(Rsi+Rse)', () => {
		const r = uWert([], 0.13, 0.04);
		expect(r.rt).toBe(0);
		expect(r.u).toBeCloseTo(1 / (0.13 + 0.04), 3);
	});

	it('Gesamtdicke = Summe der Schichten', () => {
		const layers: Layer[] = [
			{ label: 'A', lambda: 1, thickness: 50 },
			{ label: 'B', lambda: 1, thickness: 100 },
			{ label: 'C', lambda: 1, thickness: 30 }
		];
		expect(uWert(layers, 0.13, 0.04).dTotal).toBe(180);
	});
});

describe('SURFACE_PRESETS', () => {
	it('enthaelt alle gaengigen Oberflaechen-Typen', () => {
		expect(Object.keys(SURFACE_PRESETS)).toContain('wand-aussen');
		expect(Object.keys(SURFACE_PRESETS)).toContain('boden-erdreich');
	});
	it('Boden gegen Erdreich hat Rse = 0', () => {
		expect(SURFACE_PRESETS['boden-erdreich'].rse).toBe(0);
	});
});

describe('SIA_LIMITS', () => {
	it('Minergie strenger als SIA 380/1', () => {
		const sia = SIA_LIMITS.find((l) => l.label.includes('SIA 380/1'))!;
		const minergie = SIA_LIMITS.find((l) => l.label.includes('Minergie'))!;
		expect(minergie.u).toBeLessThan(sia.u);
	});
});
