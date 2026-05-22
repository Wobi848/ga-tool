import { describe, it, expect } from 'vitest';
import { pressureLoss, pipes, mediaProps, type PressureLossInput } from './druckverlust';

function inputFor(overrides: Partial<PressureLossInput> = {}): PressureLossInput {
	return {
		flow: 1.0,
		length: 20,
		di: pipes.DN20.di,
		zetaSum: 0,
		rho: mediaProps.wasser.rho,
		nu: mediaProps.wasser.nu,
		...overrides
	};
}

describe('pressureLoss', () => {
	it('zero flow -> zero loss', () => {
		const r = pressureLoss(inputFor({ flow: 0 }));
		expect(r.v).toBe(0);
		expect(r.dpTotal).toBe(0);
	});

	it('velocity = Q / A (continuity)', () => {
		const r = pressureLoss(inputFor({ flow: 1.0, di: 21.6 }));
		// A = π × (0.0216)² / 4 = 3.6644e-4 m²
		// v = 1 / 3600 / 3.6644e-4 = 0.758 m/s
		expect(r.v).toBeCloseTo(0.758, 2);
	});

	it('Reynolds number scales with velocity × diameter / nu', () => {
		const r = pressureLoss(inputFor({ flow: 1.0, di: 21.6 }));
		// Re = v × d / ν = 0.758 × 0.0216 / 1e-6 ≈ 16374
		expect(r.Re).toBeCloseTo(16374, -2);
	});

	it('laminar regime: lambda = 64/Re for Re < 2300', () => {
		// Very low flow to force laminar
		const r = pressureLoss(inputFor({ flow: 0.05, di: 53 }));
		expect(r.Re).toBeLessThan(2300);
		expect(r.lambda).toBeCloseTo(64 / r.Re, 5);
	});

	it('turbulent regime: lambda in typical range 0.015..0.05', () => {
		const r = pressureLoss(inputFor({ flow: 1.0, di: 21.6 }));
		expect(r.lambda).toBeGreaterThan(0.015);
		expect(r.lambda).toBeLessThan(0.05);
	});

	it('total dp = friction dp + local dp', () => {
		const r = pressureLoss(inputFor({ flow: 1.0, length: 20, zetaSum: 15 }));
		expect(r.dpTotal).toBeCloseTo(r.dpL + r.dpZ, 5);
	});

	it('friction loss scales linearly with length', () => {
		const r10 = pressureLoss(inputFor({ flow: 1.0, length: 10 }));
		const r20 = pressureLoss(inputFor({ flow: 1.0, length: 20 }));
		expect(r20.dpL).toBeCloseTo(r10.dpL * 2, 1);
	});

	it('local loss scales linearly with zeta', () => {
		const r0 = pressureLoss(inputFor({ flow: 1.0, zetaSum: 0 }));
		const r10 = pressureLoss(inputFor({ flow: 1.0, zetaSum: 10 }));
		const r20 = pressureLoss(inputFor({ flow: 1.0, zetaSum: 20 }));
		expect(r0.dpZ).toBe(0);
		expect(r20.dpZ).toBeCloseTo(r10.dpZ * 2, 1);
	});

	it('larger pipe diameter -> lower pressure loss (same flow)', () => {
		const rSmall = pressureLoss(inputFor({ flow: 1.0, di: pipes.DN15.di }));
		const rLarge = pressureLoss(inputFor({ flow: 1.0, di: pipes.DN50.di }));
		expect(rSmall.dpTotal).toBeGreaterThan(rLarge.dpTotal);
	});

	it('sole has higher viscosity -> higher pressure loss vs water', () => {
		const rWater = pressureLoss(inputFor({ flow: 1.0, ...mediaProps.wasser }));
		const rSole = pressureLoss(inputFor({ flow: 1.0, ...mediaProps.sole30 }));
		expect(rSole.dpTotal).toBeGreaterThan(rWater.dpTotal);
	});

	it('typical residential case: 1 m³/h, DN20, 20 m -> mbar-scale loss', () => {
		const r = pressureLoss(inputFor({ flow: 1.0, length: 20, di: 21.6, zetaSum: 15 }));
		// Expect a few hundred to ~2000 Pa = 0..20 mbar — sanity check, not exact
		expect(r.dpTotal).toBeGreaterThan(100); // > 1 mbar
		expect(r.dpTotal).toBeLessThan(20_000); // < 200 mbar
	});
});
