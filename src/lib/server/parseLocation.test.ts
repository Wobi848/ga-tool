import { describe, it, expect } from 'vitest';
import { parseLocation, encodeLocation } from './parseLocation.js';

describe('parseLocation', () => {
	it('returns empty for null', () => {
		expect(parseLocation(null)).toEqual({ city: '', temp: null });
	});

	it('parses city only', () => {
		expect(parseLocation('Zürich')).toEqual({ city: 'Zürich', temp: null });
	});

	it('parses city and temp', () => {
		expect(parseLocation('Bern|-8')).toEqual({ city: 'Bern', temp: -8 });
	});

	it('parses positive temp', () => {
		expect(parseLocation('Wien|2.5')).toEqual({ city: 'Wien', temp: 2.5 });
	});

	it('returns null temp for invalid number', () => {
		expect(parseLocation('Stadt|abc').temp).toBeNull();
	});
});

describe('encodeLocation', () => {
	it('returns null for empty city', () => {
		expect(encodeLocation('', -8)).toBeNull();
		expect(encodeLocation('  ', null)).toBeNull();
	});

	it('encodes city without temp', () => {
		expect(encodeLocation('Zürich', null)).toBe('Zürich');
		expect(encodeLocation('Zürich', '')).toBe('Zürich');
	});

	it('encodes city and temp', () => {
		expect(encodeLocation('Bern', -8)).toBe('Bern|-8');
		expect(encodeLocation('Wien', '2.5')).toBe('Wien|2.5');
	});

	it('round-trips correctly', () => {
		const encoded = encodeLocation('Genf', -12);
		const decoded = parseLocation(encoded);
		expect(decoded).toEqual({ city: 'Genf', temp: -12 });
	});
});
