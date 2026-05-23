import { describe, it, expect } from 'vitest';
import {
	bitPosition,
	bitValue,
	switchStates,
	toggleBit,
	statesToAddress,
	toBinary,
	toHex,
	clampAddress
} from './dipSwitch';

const opts8MsbLeft = { switchCount: 8, msbLeft: true, invertedLogic: false };
const opts8MsbRight = { switchCount: 8, msbLeft: false, invertedLogic: false };

describe('bitPosition / bitValue', () => {
	it('MSB-links: Schalter 1 (i=0) = höchstes Bit', () => {
		expect(bitPosition(0, opts8MsbLeft)).toBe(7);
		expect(bitValue(0, opts8MsbLeft)).toBe(128);
		expect(bitValue(7, opts8MsbLeft)).toBe(1);
	});
	it('MSB-rechts: Schalter 1 (i=0) = niedrigstes Bit', () => {
		expect(bitPosition(0, opts8MsbRight)).toBe(0);
		expect(bitValue(0, opts8MsbRight)).toBe(1);
		expect(bitValue(7, opts8MsbRight)).toBe(128);
	});
});

describe('switchStates', () => {
	it('Adresse 0 -> alle OFF', () => {
		expect(switchStates(0, opts8MsbLeft)).toEqual([
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			false
		]);
	});
	it('Adresse 255 -> alle ON', () => {
		expect(switchStates(255, opts8MsbLeft)).toEqual([
			true,
			true,
			true,
			true,
			true,
			true,
			true,
			true
		]);
	});
	it('Adresse 1 (MSB-links) -> nur letzter Schalter ON', () => {
		expect(switchStates(1, opts8MsbLeft)).toEqual([
			false,
			false,
			false,
			false,
			false,
			false,
			false,
			true
		]);
	});
	it('Adresse 1 (MSB-rechts) -> nur erster Schalter ON', () => {
		expect(switchStates(1, opts8MsbRight)).toEqual([
			true,
			false,
			false,
			false,
			false,
			false,
			false,
			false
		]);
	});
	it('Invertierte Logik: 0 -> alle ON', () => {
		const inv = { switchCount: 4, msbLeft: true, invertedLogic: true };
		expect(switchStates(0, inv)).toEqual([true, true, true, true]);
	});
});

describe('toggleBit', () => {
	it('Toggle Schalter 0 (MSB-rechts) addiert/subtrahiert 1', () => {
		expect(toggleBit(0, 0, opts8MsbRight)).toBe(1);
		expect(toggleBit(5, 0, opts8MsbRight)).toBe(4);
	});
	it('Toggle Schalter 0 (MSB-links) addiert/subtrahiert 128', () => {
		expect(toggleBit(0, 0, opts8MsbLeft)).toBe(128);
		expect(toggleBit(255, 0, opts8MsbLeft)).toBe(127);
	});
	it('zwei Toggles ergeben wieder den Originalwert', () => {
		const addr = toggleBit(toggleBit(42, 3, opts8MsbLeft), 3, opts8MsbLeft);
		expect(addr).toBe(42);
	});
});

describe('statesToAddress', () => {
	it('Round-Trip: switchStates -> statesToAddress = identity', () => {
		for (const a of [0, 1, 7, 42, 128, 255]) {
			const states = switchStates(a, opts8MsbLeft);
			expect(statesToAddress(states, opts8MsbLeft)).toBe(a);
		}
	});
	it('Round-Trip MSB-rechts', () => {
		for (const a of [0, 1, 42, 255]) {
			const states = switchStates(a, opts8MsbRight);
			expect(statesToAddress(states, opts8MsbRight)).toBe(a);
		}
	});
	it('Round-Trip mit invertierter Logik', () => {
		const opts = { switchCount: 4, msbLeft: true, invertedLogic: true };
		for (const a of [0, 1, 5, 15]) {
			const states = switchStates(a, opts);
			expect(statesToAddress(states, opts)).toBe(a);
		}
	});
});

describe('toBinary / toHex', () => {
	it('Adresse 5, 8 Schalter -> 00000101', () => {
		expect(toBinary(5, 8)).toBe('00000101');
	});
	it('Adresse 0, 4 Schalter -> 0000', () => {
		expect(toBinary(0, 4)).toBe('0000');
	});
	it('Hex 15 -> F (4 Schalter -> 1 Stelle)', () => {
		expect(toHex(15, 4)).toBe('F');
	});
	it('Hex 5, 8 Schalter -> 05 (2 Stellen)', () => {
		expect(toHex(5, 8)).toBe('05');
	});
	it('Hex 255 -> FF', () => {
		expect(toHex(255, 8)).toBe('FF');
	});
});

describe('clampAddress', () => {
	it('innerhalb des Bereichs unveraendert', () => {
		expect(clampAddress(50, 0, 127)).toBe(50);
	});
	it('unter min -> min', () => {
		expect(clampAddress(-5, 1, 127)).toBe(1);
	});
	it('ueber max -> max', () => {
		expect(clampAddress(999, 1, 127)).toBe(127);
	});
});
