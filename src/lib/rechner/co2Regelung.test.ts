import { describe, it, expect } from 'vitest';
import { co2Design, co2RoomBehavior, co2Curve, ACTIVITY_CO2_LPH } from './co2Regelung';

describe('co2Design', () => {
	it('Standard-Buero: 10 P, 75 m³, office, Ziel 1000', () => {
		const r = co2Design({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			co2Target: 1000
		});
		// G = 10 × 18 = 180 l/h = 0.18 m³/h
		// q = 0.18 × 1e6 / (1000 - 420) = 310.3 m³/h
		expect(r).not.toBeNull();
		expect(r!.q).toBeCloseTo(310.3, 0);
		expect(r!.ach).toBeCloseTo(310.3 / 75, 1);
		expect(r!.steadyState).toBeCloseTo(1000, 0);
	});

	it('null wenn Ziel <= Aussenluft (unphysikalisch)', () => {
		const r = co2Design({
			volume: 75,
			persons: 5,
			activity: 'office',
			co2Outside: 1000,
			co2Target: 800
		});
		expect(r).toBeNull();
	});

	it('hoehere Personenzahl -> mehr Volumenstrom', () => {
		const base = co2Design({
			volume: 75,
			persons: 5,
			activity: 'office',
			co2Outside: 420,
			co2Target: 1000
		})!;
		const more = co2Design({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			co2Target: 1000
		})!;
		expect(more.q).toBeCloseTo(base.q * 2, 1);
	});

	it('hoeheres Aktivitaetsniveau -> mehr Volumenstrom', () => {
		const office = co2Design({
			volume: 75,
			persons: 5,
			activity: 'office',
			co2Outside: 420,
			co2Target: 1000
		})!;
		const physical = co2Design({
			volume: 75,
			persons: 5,
			activity: 'physical',
			co2Outside: 420,
			co2Target: 1000
		})!;
		expect(physical.q).toBeGreaterThan(office.q);
		expect(physical.q / office.q).toBeCloseTo(
			ACTIVITY_CO2_LPH.physical / ACTIVITY_CO2_LPH.office,
			3
		);
	});

	it('t90 = 2.3 × τ', () => {
		const r = co2Design({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			co2Target: 1000
		})!;
		expect(r.t90).toBeCloseTo(r.tau * 2.3, 5);
	});
});

describe('co2RoomBehavior', () => {
	it('Stationaerwert bei vorgegebenem Volumenstrom', () => {
		const r = co2RoomBehavior({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			flowRate: 300
		});
		// G = 0.18 m³/h, steady = 420 + 0.18e6/300 = 1020 ppm
		expect(r).not.toBeNull();
		expect(r!.steadyState).toBeCloseTo(1020, 0);
		expect(r!.ach).toBeCloseTo(300 / 75, 2);
	});

	it('null bei flowRate = 0', () => {
		expect(
			co2RoomBehavior({
				volume: 75,
				persons: 10,
				activity: 'office',
				co2Outside: 420,
				flowRate: 0
			})
		).toBeNull();
	});

	it('mehr Lueftung -> niedrigerer Stationaerwert', () => {
		const low = co2RoomBehavior({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			flowRate: 200
		})!;
		const high = co2RoomBehavior({
			volume: 75,
			persons: 10,
			activity: 'office',
			co2Outside: 420,
			flowRate: 500
		})!;
		expect(high.steadyState).toBeLessThan(low.steadyState);
	});
});

describe('co2Curve', () => {
	it('startet bei startCo2 und naehert sich steadyState an', () => {
		const pts = co2Curve(420, 1000, 30);
		expect(pts[0]).toEqual({ t: 0, co2: 420 });
		expect(pts[pts.length - 1].co2).toBeGreaterThan(950);
		expect(pts[pts.length - 1].co2).toBeLessThanOrEqual(1000);
	});

	it('bei τ erreicht ca. 63 % der Differenz', () => {
		const pts = co2Curve(420, 1000, 30, [1]);
		// Nach 1×τ: c = ss - (ss-start)/e ≈ 1000 - 580×0.368 = 786
		expect(pts[0].co2).toBeCloseTo(787, 0);
	});

	it('monoton steigend wenn steadyState > start', () => {
		const pts = co2Curve(420, 1000, 30);
		for (let i = 1; i < pts.length; i++) {
			expect(pts[i].co2).toBeGreaterThanOrEqual(pts[i - 1].co2);
		}
	});
});
