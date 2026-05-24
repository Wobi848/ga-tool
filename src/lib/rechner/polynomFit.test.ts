import { describe, it, expect } from 'vitest';
import {
	fitPolynomial,
	evaluatePoly,
	polynomialCurve,
	formatPolynomial,
	type PolyPoint
} from './polynomFit';

describe('evaluatePoly', () => {
	it('konstantes Polynom', () => {
		expect(evaluatePoly([5], 0)).toBe(5);
		expect(evaluatePoly([5], 100)).toBe(5);
	});
	it('lineares Polynom y = 2 + 3x', () => {
		expect(evaluatePoly([2, 3], 0)).toBe(2);
		expect(evaluatePoly([2, 3], 1)).toBe(5);
		expect(evaluatePoly([2, 3], 10)).toBe(32);
	});
	it('quadratisch y = 1 + 2x + 0.5x²', () => {
		expect(evaluatePoly([1, 2, 0.5], 0)).toBe(1);
		expect(evaluatePoly([1, 2, 0.5], 2)).toBeCloseTo(1 + 4 + 2, 5);
	});
	it('leeres Array -> 0', () => {
		expect(evaluatePoly([], 5)).toBe(0);
	});
});

describe('fitPolynomial — perfekter Fit', () => {
	it('lineare Daten -> perfekter Linear-Fit, R²=1', () => {
		// y = 3 + 2x
		const pts: PolyPoint[] = [
			{ x: 0, y: 3 },
			{ x: 1, y: 5 },
			{ x: 2, y: 7 },
			{ x: 3, y: 9 }
		];
		const r = fitPolynomial(pts, 1);
		expect(r.coefficients).toHaveLength(2);
		expect(r.coefficients[0]).toBeCloseTo(3, 5);
		expect(r.coefficients[1]).toBeCloseTo(2, 5);
		expect(r.r2).toBeCloseTo(1, 5);
	});

	it('quadratische Daten -> perfekter Quadrat-Fit', () => {
		// y = 1 + 2x + 0.5x²
		const a = [1, 2, 0.5];
		const pts: PolyPoint[] = [-2, -1, 0, 1, 2, 3].map((x) => ({
			x,
			y: evaluatePoly(a, x)
		}));
		const r = fitPolynomial(pts, 2);
		expect(r.coefficients[0]).toBeCloseTo(1, 5);
		expect(r.coefficients[1]).toBeCloseTo(2, 5);
		expect(r.coefficients[2]).toBeCloseTo(0.5, 5);
		expect(r.r2).toBeCloseTo(1, 5);
	});

	it('kubische Daten -> perfekter Kubik-Fit', () => {
		// y = 2 - 3x + 0.5x² + 0.1x³
		const a = [2, -3, 0.5, 0.1];
		const pts: PolyPoint[] = [-3, -1, 0, 1, 2, 4, 5].map((x) => ({
			x,
			y: evaluatePoly(a, x)
		}));
		const r = fitPolynomial(pts, 3);
		expect(r.coefficients[0]).toBeCloseTo(2, 4);
		expect(r.coefficients[1]).toBeCloseTo(-3, 4);
		expect(r.coefficients[2]).toBeCloseTo(0.5, 4);
		expect(r.coefficients[3]).toBeCloseTo(0.1, 4);
		expect(r.r2).toBeCloseTo(1, 5);
	});
});

describe('fitPolynomial — verrauschte Daten', () => {
	it('linearer Trend mit Rauschen liefert R² nahe aber unter 1', () => {
		// y = 2x mit kleinem Rauschen
		const pts: PolyPoint[] = [
			{ x: 0, y: 0.1 },
			{ x: 1, y: 1.9 },
			{ x: 2, y: 4.1 },
			{ x: 3, y: 5.9 },
			{ x: 4, y: 8.0 }
		];
		const r = fitPolynomial(pts, 1);
		expect(r.r2).toBeGreaterThan(0.99);
		expect(r.r2).toBeLessThan(1);
		// Slope nahe 2
		expect(r.coefficients[1]).toBeCloseTo(2, 1);
	});

	it('Konstante Daten -> R² = 1 (SS_tot = 0 Fallback)', () => {
		const pts: PolyPoint[] = [
			{ x: 0, y: 5 },
			{ x: 1, y: 5 },
			{ x: 2, y: 5 }
		];
		const r = fitPolynomial(pts, 1);
		expect(r.r2).toBeCloseTo(1, 5);
	});

	it('hoeherer Grad -> nicht schlechteres R² (Polynom-Identitaet)', () => {
		const pts: PolyPoint[] = [
			{ x: 0, y: 1 },
			{ x: 1, y: 2.5 },
			{ x: 2, y: 6 },
			{ x: 3, y: 11 },
			{ x: 4, y: 18 }
		];
		const r1 = fitPolynomial(pts, 1);
		const r2 = fitPolynomial(pts, 2);
		expect(r2.r2).toBeGreaterThanOrEqual(r1.r2);
	});
});

describe('fitPolynomial — Edge-Cases', () => {
	it('weniger Punkte als Grad+1 -> Grad wird reduziert', () => {
		const pts: PolyPoint[] = [
			{ x: 0, y: 1 },
			{ x: 1, y: 3 },
			{ x: 2, y: 5 }
		];
		// Grad 5 angefordert, aber nur 3 Punkte -> effektiv Grad 2
		const r = fitPolynomial(pts, 5);
		expect(r.degree).toBe(2);
		expect(r.coefficients).toHaveLength(3);
	});

	it('weniger als 2 Punkte -> Fehler', () => {
		expect(() => fitPolynomial([{ x: 0, y: 1 }], 1)).toThrow();
		expect(() => fitPolynomial([], 1)).toThrow();
	});

	it('doppelte x-Werte (singulaer) -> Fehler', () => {
		expect(() =>
			fitPolynomial(
				[
					{ x: 1, y: 2 },
					{ x: 1, y: 3 }
				],
				1
			)
		).toThrow(/singular|Datenpunkt/i);
	});

	it('Grad < 1 -> Fehler', () => {
		expect(() =>
			fitPolynomial(
				[
					{ x: 0, y: 1 },
					{ x: 1, y: 2 }
				],
				0
			)
		).toThrow();
	});
});

describe('polynomialCurve', () => {
	it('liefert steps+1 Punkte', () => {
		const pts = polynomialCurve([1, 2], 0, 10, 10);
		expect(pts).toHaveLength(11);
		expect(pts[0]).toEqual({ x: 0, y: 1 });
		expect(pts[10]).toEqual({ x: 10, y: 21 });
	});
	it('leeres Array bei xMax <= xMin', () => {
		expect(polynomialCurve([1], 5, 5)).toEqual([]);
		expect(polynomialCurve([1], 10, 5)).toEqual([]);
	});
});

describe('formatPolynomial', () => {
	it('linear: 3 + 2·x', () => {
		expect(formatPolynomial([3, 2])).toBe('3 + 2·x');
	});
	it('quadratisch mit negativem Anteil', () => {
		expect(formatPolynomial([2, -3, 0.5])).toMatch(/2 − 3·x \+ 0\.5·x²/);
	});
	it('null-Koeffizienten werden weggelassen', () => {
		expect(formatPolynomial([1, 0, 2])).toBe('1 + 2·x²');
	});
	it('reines Konstantes-Polynom', () => {
		expect(formatPolynomial([5])).toBe('5');
	});
	it('alle null -> "0"', () => {
		expect(formatPolynomial([0, 0, 0])).toBe('0');
	});
});

describe('NTC-Beispiel — realistische Sensor-Linearisierung', () => {
	it('NTC 10k bei 25°C: temperatur-zu-widerstand-fit', () => {
		// Vereinfachte NTC-Werte (in K°C / kOhm): typische Steinhart-Hart-Region
		const pts: PolyPoint[] = [
			{ x: 0, y: 32.66 }, // 0°C -> 32.66 kOhm
			{ x: 10, y: 19.9 },
			{ x: 20, y: 12.51 },
			{ x: 25, y: 10.0 },
			{ x: 30, y: 8.057 },
			{ x: 40, y: 5.327 },
			{ x: 50, y: 3.603 }
		];
		// Polynom Grad 3 sollte das gut approximieren
		const r = fitPolynomial(pts, 3);
		expect(r.r2).toBeGreaterThan(0.99);
		// Bei 25°C sollte das Fit-Polynom ~10 kOhm liefern
		const y25 = evaluatePoly(r.coefficients, 25);
		expect(y25).toBeCloseTo(10.0, 0);
	});
});
