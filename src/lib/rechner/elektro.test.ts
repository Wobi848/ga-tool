import { describe, it, expect } from 'vitest';
import { ohmsLaw, dcPower, acPower, currentFromPower, recommendFuse, STD_FUSE } from './elektro';

describe('ohmsLaw', () => {
	it('R aus U und I', () => {
		const r = ohmsLaw({ mode: 'R', U: 24, I: 0.5, R: 0 });
		expect(r.R).toBeCloseTo(48, 5);
	});
	it('U aus R und I', () => {
		const r = ohmsLaw({ mode: 'U', U: 0, I: 0.5, R: 100 });
		expect(r.U).toBeCloseTo(50, 5);
	});
	it('I aus U und R', () => {
		const r = ohmsLaw({ mode: 'I', U: 24, I: 0, R: 48 });
		expect(r.I).toBeCloseTo(0.5, 5);
	});
	it('Guard: I = 0 -> R = 0', () => {
		expect(ohmsLaw({ mode: 'R', U: 24, I: 0, R: 0 }).R).toBe(0);
	});
	it('Guard: R = 0 -> I = 0', () => {
		expect(ohmsLaw({ mode: 'I', U: 24, I: 0, R: 0 }).I).toBe(0);
	});
});

describe('dcPower', () => {
	it('P = U × I', () => {
		expect(dcPower({ mode: 'P', U: 24, I: 2, P: 0 }).P).toBe(48);
	});
	it('U = P / I', () => {
		expect(dcPower({ mode: 'U', U: 0, I: 2, P: 48 }).U).toBe(24);
	});
	it('I = P / U', () => {
		expect(dcPower({ mode: 'I', U: 24, I: 0, P: 48 }).I).toBe(2);
	});
});

describe('acPower', () => {
	it('cos φ = 1 (rein ohmsch): P = S, Q = 0', () => {
		const r = acPower({ U: 230, I: 1, cos: 1 });
		expect(r.S).toBe(230);
		expect(r.P).toBe(230);
		expect(r.Q).toBeCloseTo(0, 5);
	});
	it('cos φ = 0 (rein induktiv/kapazitiv): P = 0, Q = S', () => {
		const r = acPower({ U: 230, I: 1, cos: 0 });
		expect(r.P).toBe(0);
		expect(r.Q).toBeCloseTo(r.S, 5);
	});
	it('Standard 230 V, 1 A, cos 0.9: P = 207, Q = 100.3', () => {
		const r = acPower({ U: 230, I: 1, cos: 0.9 });
		expect(r.P).toBeCloseTo(207, 0);
		expect(r.Q).toBeCloseTo(100.3, 1);
	});
	it('Pythagoras: S² = P² + Q²', () => {
		const r = acPower({ U: 230, I: 1.5, cos: 0.85 });
		expect(r.S * r.S).toBeCloseTo(r.P * r.P + r.Q * r.Q, 5);
	});
});

describe('currentFromPower', () => {
	it('DC: I = P / U', () => {
		expect(currentFromPower('dc', 1000, 230, 1)).toBeCloseTo(1000 / 230, 4);
	});
	it('AC einphasig: I = P / (U × cos)', () => {
		expect(currentFromPower('ac1', 1000, 230, 0.9)).toBeCloseTo(1000 / (230 * 0.9), 4);
	});
	it('AC dreiphasig: I = P / (√3 × U × cos)', () => {
		expect(currentFromPower('ac3', 5000, 400, 0.9)).toBeCloseTo(
			5000 / (Math.sqrt(3) * 400 * 0.9),
			4
		);
	});
	it('AC dreiphasig liefert geringeren Strom als AC1 bei gleicher Leistung', () => {
		const i1 = currentFromPower('ac1', 1000, 400, 0.9);
		const i3 = currentFromPower('ac3', 1000, 400, 0.9);
		expect(i3).toBeLessThan(i1);
		expect(i3).toBeCloseTo(i1 / Math.sqrt(3), 4);
	});
	it('Guard: U = 0 -> I = 0', () => {
		expect(currentFromPower('dc', 1000, 0, 1)).toBe(0);
	});
	it('Guard: cos = 0 in AC -> I = 0', () => {
		expect(currentFromPower('ac1', 1000, 230, 0)).toBe(0);
	});
});

describe('recommendFuse', () => {
	it('empfiehlt naechste Standard-Sicherung mit 25 % Reserve', () => {
		// 4 A × 1.25 = 5 A → 6 A
		expect(recommendFuse(4)).toBe(6);
		// 8 A × 1.25 = 10 A → 10 A
		expect(recommendFuse(8)).toBe(10);
		// 10 A × 1.25 = 12.5 A → 13 A
		expect(recommendFuse(10)).toBe(13);
	});
	it('null wenn Bedarf groesser als groesste Standard-Sicherung', () => {
		expect(recommendFuse(100)).toBeNull();
	});
	it('benutzerdefinierter Reserve-Faktor', () => {
		expect(recommendFuse(8, 2)).toBe(16);
	});
	it('STD_FUSE enthaelt die typische NIN-Reihe', () => {
		expect(STD_FUSE).toContain(16);
		expect(STD_FUSE).toContain(10);
	});
});
