import { describe, it, expect } from 'vitest';
import { weightedMean } from './gewichteterMittelwert';

describe('weightedMean', () => {
	it('arithmetisches Mittel bei gleichen Gewichten', () => {
		const r = weightedMean([
			{ value: 10, weight: 1 },
			{ value: 20, weight: 1 },
			{ value: 30, weight: 1 }
		]);
		expect(r.mean).toBeCloseTo(20, 5);
	});

	it('gewichtetes Mittel: Flaeche × Temperatur', () => {
		// Raum 1: 30 m² bei 22 °C, Raum 2: 10 m² bei 18 °C
		// Mittel = (30×22 + 10×18) / 40 = (660 + 180) / 40 = 21
		const r = weightedMean([
			{ value: 22, weight: 30 },
			{ value: 18, weight: 10 }
		]);
		expect(r.mean).toBeCloseTo(21, 5);
		expect(r.weightSum).toBe(40);
	});

	it('null bei leerer Liste', () => {
		const r = weightedMean([]);
		expect(r.mean).toBeNull();
		expect(r.weightSum).toBe(0);
		expect(r.contributions).toEqual([]);
	});

	it('null wenn alle Gewichte 0', () => {
		const r = weightedMean([
			{ value: 1, weight: 0 },
			{ value: 2, weight: 0 }
		]);
		expect(r.mean).toBeNull();
	});

	it('ignoriert NaN-Werte', () => {
		const r = weightedMean([
			{ value: 10, weight: 1 },
			{ value: NaN, weight: 1 },
			{ value: 30, weight: 1 }
		]);
		expect(r.mean).toBeCloseTo(20, 5); // (10 + 30) / 2
	});

	it('ignoriert negative Gewichte', () => {
		const r = weightedMean([
			{ value: 10, weight: 1 },
			{ value: 50, weight: -5 }
		]);
		expect(r.mean).toBeCloseTo(10, 5);
	});

	it('share summiert sich auf 100 %', () => {
		const r = weightedMean([
			{ value: 10, weight: 1 },
			{ value: 20, weight: 3 },
			{ value: 30, weight: 6 }
		]);
		const sum = r.contributions.reduce((s, c) => s + c.share, 0);
		expect(sum).toBeCloseTo(100, 5);
	});

	it('Summe der Contributions = Mittelwert', () => {
		const r = weightedMean([
			{ value: 10, weight: 2 },
			{ value: 20, weight: 3 },
			{ value: 30, weight: 5 }
		]);
		const sum = r.contributions.reduce((s, c) => s + c.contribution, 0);
		expect(sum).toBeCloseTo(r.mean!, 5);
	});
});
