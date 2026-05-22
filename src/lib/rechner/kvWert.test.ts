import { describe, it, expect } from 'vitest';
import { computeKv, recommendKvs, authority, STANDARD_KVS } from './kvWert';

describe('computeKv', () => {
	describe('kv-from-qdp', () => {
		it('Q=1 m³/h, Δp=1 bar -> Kv=1 (definition)', () => {
			const r = computeKv({ mode: 'kv-from-qdp', flow: 1.0, dp: 1.0 });
			expect(r.kv).toBeCloseTo(1.0, 5);
		});
		it('Q=2 m³/h, Δp=0.25 bar -> Kv=4', () => {
			const r = computeKv({ mode: 'kv-from-qdp', flow: 2.0, dp: 0.25 });
			expect(r.kv).toBeCloseTo(4.0, 5);
		});
		it('zero dp guards against /0', () => {
			const r = computeKv({ mode: 'kv-from-qdp', flow: 1.0, dp: 0 });
			expect(r.kv).toBe(0);
		});
	});

	describe('dp-from-qkv', () => {
		it('Q=1 m³/h, Kv=1 -> Δp=1 bar', () => {
			const r = computeKv({ mode: 'dp-from-qkv', flow: 1.0, kv: 1.0 });
			expect(r.dp).toBeCloseTo(1.0, 5);
		});
		it('Q=2 m³/h, Kv=4 -> Δp=0.25 bar', () => {
			const r = computeKv({ mode: 'dp-from-qkv', flow: 2.0, kv: 4.0 });
			expect(r.dp).toBeCloseTo(0.25, 5);
		});
		it('Δp scales quadratically with Q', () => {
			const r1 = computeKv({ mode: 'dp-from-qkv', flow: 1.0, kv: 2.5 });
			const r2 = computeKv({ mode: 'dp-from-qkv', flow: 2.0, kv: 2.5 });
			expect(r2.dp / r1.dp).toBeCloseTo(4, 5);
		});
		it('zero Kv guards against /0', () => {
			const r = computeKv({ mode: 'dp-from-qkv', flow: 1.0, kv: 0 });
			expect(r.dp).toBe(0);
		});
	});

	describe('q-from-kvdp', () => {
		it('Kv=2.5, Δp=1 bar -> Q=2.5 m³/h', () => {
			const r = computeKv({ mode: 'q-from-kvdp', kv: 2.5, dp: 1.0 });
			expect(r.q).toBeCloseTo(2.5, 5);
		});
		it('Q scales with √Δp', () => {
			const r1 = computeKv({ mode: 'q-from-kvdp', kv: 4.0, dp: 0.25 });
			const r4 = computeKv({ mode: 'q-from-kvdp', kv: 4.0, dp: 1.0 });
			expect(r4.q / r1.q).toBeCloseTo(Math.sqrt(1.0 / 0.25), 5);
		});
	});

	it('round-trip kv-from-qdp -> dp-from-qkv reproduces inputs', () => {
		const flow = 1.7;
		const dp = 0.42;
		const r1 = computeKv({ mode: 'kv-from-qdp', flow, dp });
		const r2 = computeKv({ mode: 'dp-from-qkv', flow, kv: r1.kv });
		expect(r2.dp).toBeCloseTo(dp, 5);
	});
});

describe('recommendKvs', () => {
	it('picks next-larger standard value with default 10 % reserve', () => {
		// target × 1.1 must be <= recommended
		expect(recommendKvs(1.0)).toBe(1.6); // 1.0 × 1.1 = 1.1, next = 1.6
		expect(recommendKvs(2.5)).toBe(4.0); // 2.5 × 1.1 = 2.75, next = 4.0
		expect(recommendKvs(0.3)).toBe(0.4);
	});
	it('without reserve, picks next >= target', () => {
		expect(recommendKvs(1.0, 1.0)).toBe(1.0);
		expect(recommendKvs(1.01, 1.0)).toBe(1.6);
	});
	it('saturates to largest standard value when target exceeds series', () => {
		expect(recommendKvs(500)).toBe(STANDARD_KVS[STANDARD_KVS.length - 1]);
	});
});

describe('authority', () => {
	it('a = dp_valve / dp_reference', () => {
		expect(authority(0.25, 0.5)).toBeCloseTo(0.5, 5);
		expect(authority(0.5, 0.5)).toBeCloseTo(1.0, 5);
	});
	it('guards against zero reference', () => {
		expect(authority(0.3, 0)).toBe(0);
	});
});
