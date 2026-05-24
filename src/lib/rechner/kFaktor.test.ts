import { describe, it, expect } from 'vitest';
import { computeKFaktor, correctKForDensity, airDensity, curve, RHO_AIR_NORM } from './kFaktor.js';

const round = (n: number, d = 3) => Math.round(n * 10 ** d) / 10 ** d;

describe('computeKFaktor', () => {
	describe('mode q-from-kdp (Q aus k + ΔP)', () => {
		it('Standard: k=50, ΔP=100 Pa → Q = 50·√100 = 500 m³/h', () => {
			const r = computeKFaktor({ mode: 'q-from-kdp', k: 50, dp: 100 });
			expect(round(r.q)).toBe(500);
			expect(round(r.qLs)).toBe(round(500 / 3.6));
		});

		it('ΔP = 0 → Q = 0', () => {
			expect(computeKFaktor({ mode: 'q-from-kdp', k: 50, dp: 0 }).q).toBe(0);
		});

		it('negatives ΔP wird auf 0 begrenzt', () => {
			expect(computeKFaktor({ mode: 'q-from-kdp', k: 50, dp: -10 }).q).toBe(0);
		});
	});

	describe('mode dp-from-qk (ΔP aus Q + k)', () => {
		it('Q=500, k=50 → ΔP = (500/50)² = 100 Pa', () => {
			const r = computeKFaktor({ mode: 'dp-from-qk', flow: 500, k: 50 });
			expect(round(r.dp)).toBe(100);
		});

		it('k = 0 → ΔP = 0 (division by zero guard)', () => {
			expect(computeKFaktor({ mode: 'dp-from-qk', flow: 500, k: 0 }).dp).toBe(0);
		});
	});

	describe('mode k-from-qdp (k aus Q + ΔP)', () => {
		it('Q=500, ΔP=100 → k = 500/√100 = 50', () => {
			const r = computeKFaktor({ mode: 'k-from-qdp', flow: 500, dp: 100 });
			expect(round(r.k)).toBe(50);
		});

		it('ΔP = 0 → k = 0', () => {
			expect(computeKFaktor({ mode: 'k-from-qdp', flow: 500, dp: 0 }).k).toBe(0);
		});
	});

	describe('mode k-from-points (Mittel aus 2 Punkten)', () => {
		it('konsistente Punkte: beide ergeben k=50', () => {
			// (200 m³/h @ 16 Pa) → 200/4 = 50
			// (500 m³/h @ 100 Pa) → 500/10 = 50
			const r = computeKFaktor({
				mode: 'k-from-points',
				flow1: 200,
				dp1: 16,
				flow2: 500,
				dp2: 100
			});
			expect(round(r.k)).toBe(50);
		});

		it('Mittelung bei abweichenden Punkten', () => {
			// k1 = 200/√16 = 50, k2 = 480/√100 = 48 → Mittel 49
			const r = computeKFaktor({
				mode: 'k-from-points',
				flow1: 200,
				dp1: 16,
				flow2: 480,
				dp2: 100
			});
			expect(round(r.k)).toBe(49);
		});

		it('ein Punkt fehlt: nimmt den anderen', () => {
			const r = computeKFaktor({
				mode: 'k-from-points',
				flow1: 200,
				dp1: 16,
				flow2: 0,
				dp2: 0
			});
			expect(round(r.k)).toBe(50);
		});
	});
});

describe('Dichtekorrektur', () => {
	it('Norm-Dichte → k unverändert', () => {
		expect(correctKForDensity(50, RHO_AIR_NORM)).toBeCloseTo(50, 4);
	});

	it('Höhere Dichte (kalte Luft) → kleinerer k', () => {
		const k = correctKForDensity(50, 1.4);
		expect(k).toBeLessThan(50);
	});

	it('Tiefere Dichte (warme Luft) → grösserer k', () => {
		const k = correctKForDensity(50, 1.0);
		expect(k).toBeGreaterThan(50);
	});
});

describe('airDensity', () => {
	it('20 °C, Normaldruck ≈ 1.204 kg/m³', () => {
		expect(round(airDensity(20), 3)).toBeCloseTo(1.204, 2);
	});

	it('0 °C, Normaldruck ≈ 1.292 kg/m³', () => {
		expect(round(airDensity(0), 3)).toBeCloseTo(1.292, 2);
	});

	it('Höhere Temperatur → tiefere Dichte', () => {
		expect(airDensity(40)).toBeLessThan(airDensity(20));
	});
});

describe('curve', () => {
	it('liefert Punkte mit korrekter Q = k·√ΔP', () => {
		const pts = curve(50, 0, 100, 4);
		expect(pts.length).toBe(5);
		expect(pts[0].dp).toBe(0);
		expect(pts[0].q).toBe(0);
		expect(round(pts[4].dp)).toBe(100);
		expect(round(pts[4].q)).toBe(500);
	});

	it('k=0 → leeres Array', () => {
		expect(curve(0, 0, 100).length).toBe(0);
	});
});
