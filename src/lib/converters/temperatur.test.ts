import { describe, it, expect } from 'vitest';
import { temperatur } from './temperatur.js';

const { toBase, fromBase } = temperatur;
const round = (n: number) => Math.round(n * 1000) / 1000;

describe('Temperatur converter', () => {
	it('°C → °C identity', () => {
		expect(toBase(20, 'C')).toBe(20);
		expect(fromBase(20, 'C')).toBe(20);
	});

	it('°C ↔ K', () => {
		expect(round(fromBase(toBase(0, 'C'), 'K'))).toBe(273.15);
		expect(round(fromBase(toBase(100, 'C'), 'K'))).toBe(373.15);
		// K → °C
		expect(round(fromBase(toBase(273.15, 'K'), 'C'))).toBe(0);
	});

	it('°C ↔ °F', () => {
		expect(round(fromBase(toBase(0, 'C'), 'F'))).toBe(32);
		expect(round(fromBase(toBase(100, 'C'), 'F'))).toBe(212);
		expect(round(fromBase(toBase(-40, 'C'), 'F'))).toBe(-40); // crossover point
	});

	it('freezing point: 32°F = 0°C', () => {
		expect(round(toBase(32, 'F'))).toBe(0);
	});

	it('body temp: 98.6°F ≈ 37°C', () => {
		expect(round(toBase(98.6, 'F'))).toBe(37);
	});

	it('absolute zero: 0 K = −273.15°C', () => {
		expect(round(toBase(0, 'K'))).toBe(-273.15);
	});
});
