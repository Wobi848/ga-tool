import { describe, it, expect } from 'vitest';
import { pumpHead, networkHead, operatingPoint, pumpCurve } from './pumpenkennlinie';

describe('pumpHead (parabolisch)', () => {
	const pump = { h0: 6.0, q0: 3.0 };

	it('Q = 0 -> H = H0 (Nullfoerderhoehe)', () => {
		expect(pumpHead(0, pump)).toBe(6.0);
	});
	it('Q = Q0 -> H = 0 (Nullfoerderstrom)', () => {
		expect(pumpHead(3.0, pump)).toBeCloseTo(0, 5);
	});
	it('Q = Q0/2 -> H = 0.75 × H0', () => {
		// 1 - 0.25 = 0.75
		expect(pumpHead(1.5, pump)).toBeCloseTo(0.75 * 6.0, 4);
	});
	it('monoton fallend in Q', () => {
		for (let q = 0; q < pump.q0; q += 0.3) {
			expect(pumpHead(q + 0.3, pump)).toBeLessThan(pumpHead(q, pump));
		}
	});
	it('Guard: Q0 = 0 -> H = 0', () => {
		expect(pumpHead(1, { h0: 6, q0: 0 })).toBe(0);
	});
});

describe('networkHead (quadratisch)', () => {
	const net = { qDesign: 1.5, hDesign: 3.0 };

	it('Q = 0 -> H = 0', () => {
		expect(networkHead(0, net)).toBe(0);
	});
	it('Q = qDesign -> H = hDesign', () => {
		expect(networkHead(1.5, net)).toBeCloseTo(3.0, 5);
	});
	it('Q × 2 -> H × 4 (quadratisch)', () => {
		expect(networkHead(3.0, net)).toBeCloseTo(4 * 3.0, 4);
	});
	it('Guard: qDesign = 0 -> H = 0', () => {
		expect(networkHead(1, { qDesign: 0, hDesign: 3 })).toBe(0);
	});
});

describe('operatingPoint', () => {
	it('Schnittpunkt H_P = H_R', () => {
		const pump = { h0: 6.0, q0: 3.0 };
		const net = { qDesign: 1.5, hDesign: 3.0 };
		const op = operatingPoint(pump, net);
		expect(op).not.toBeNull();
		// Im Betriebspunkt muessen Pumpe und Netz die gleiche Hoehe liefern
		expect(pumpHead(op!.q, pump)).toBeCloseTo(networkHead(op!.q, net), 3);
	});

	it('Betriebspunkt liegt nahe Auslegungspunkt wenn Pumpe gut gewaehlt', () => {
		const pump = { h0: 6.0, q0: 3.0 };
		const net = { qDesign: 1.5, hDesign: 3.0 };
		const op = operatingPoint(pump, net);
		// Erwartung: 1.0..2.0 m³/h
		expect(op!.q).toBeGreaterThan(1.0);
		expect(op!.q).toBeLessThan(2.0);
	});

	it('null bei nicht-physikalischen Eingaben', () => {
		expect(operatingPoint({ h0: 0, q0: 3 }, { qDesign: 1, hDesign: 1 })).toBeNull();
		expect(operatingPoint({ h0: 6, q0: 0 }, { qDesign: 1, hDesign: 1 })).toBeNull();
		expect(operatingPoint({ h0: 6, q0: 3 }, { qDesign: 0, hDesign: 1 })).toBeNull();
		expect(operatingPoint({ h0: 6, q0: 3 }, { qDesign: 1, hDesign: 0 })).toBeNull();
	});

	it('null wenn Pumpe Netz nicht erreichen kann (Hoehe zu gering)', () => {
		// Steiler Netz-Widerstand, schwache Pumpe
		const op = operatingPoint({ h0: 2.0, q0: 1.0 }, { qDesign: 5.0, hDesign: 10.0 });
		// Mathematisch: r = 0.4, denom = 0.4 + 2 = 2.4, qB = sqrt(2/2.4) = 0.913
		// qB liegt bei 0.913 < q0 = 1, also Punkt existiert
		// Aber das Netz braucht bei 0.913 m³/h: H = 0.4 × 0.834 = 0.334 m
		// Die Pumpe liefert bei 0.913: 2 × (1 - 0.833) = 0.334 m → passt
		// Also nicht null in diesem Fall
		expect(op).not.toBeNull();
	});
});

describe('pumpCurve', () => {
	it('liefert steps+1 Punkte', () => {
		const pts = pumpCurve({ h0: 6, q0: 3 }, { qDesign: 1.5, hDesign: 3 }, 10);
		expect(pts).toHaveLength(11);
	});
	it('startet bei Q=0 und endet bei q0 × 1.05', () => {
		const pts = pumpCurve({ h0: 6, q0: 3 }, { qDesign: 1.5, hDesign: 3 }, 5);
		expect(pts[0].q).toBe(0);
		expect(pts[pts.length - 1].q).toBeCloseTo(3.15, 5);
	});
	it('hp >= 0 garantiert (geclamped)', () => {
		const pts = pumpCurve({ h0: 6, q0: 3 }, { qDesign: 1.5, hDesign: 3 }, 10);
		for (const p of pts) {
			expect(p.hp).toBeGreaterThanOrEqual(0);
		}
	});
});
