import { describe, it, expect } from 'vitest';
import { zeit } from './zeit.js';

const { toBase, fromBase } = zeit;
const round = (n: number) => Math.round(n * 1000) / 1000;

describe('Zeit converter', () => {
	it('s → s identity', () => {
		expect(toBase(60, 's')).toBe(60);
		expect(fromBase(60, 's')).toBe(60);
	});

	it('min ↔ s', () => {
		expect(toBase(1, 'min')).toBe(60);
		expect(fromBase(120, 'min')).toBe(2);
	});

	it('h ↔ s', () => {
		expect(toBase(1, 'h')).toBe(3600);
		expect(fromBase(7200, 'h')).toBe(2);
	});

	it('d ↔ h: 1 d = 24 h', () => {
		expect(round(fromBase(toBase(1, 'd'), 'h'))).toBe(24);
	});

	it('wk ↔ d: 1 Wo = 7 d', () => {
		expect(round(fromBase(toBase(1, 'wk'), 'd'))).toBe(7);
	});

	it('ms ↔ s: 1000 ms = 1 s', () => {
		expect(toBase(1000, 'ms')).toBe(1);
		expect(fromBase(1, 'ms')).toBe(1000);
	});

	it('yr ↔ d: 1 a ≈ 365.25 d', () => {
		expect(round(fromBase(toBase(1, 'yr'), 'd'))).toBe(365.25);
	});

	it('mo ↔ d: 1 Mt ≈ 30.4375 d', () => {
		expect(round(fromBase(toBase(1, 'mo'), 'd'))).toBe(30.438);
	});

	it('8766 h = 1 a (mit 365.25 d/Jahr)', () => {
		expect(round(fromBase(toBase(8766, 'h'), 'yr'))).toBe(1.0);
	});
});
