import { describe, it, expect } from 'vitest';
import { pSat, dewPoint, absHumidity, enthalpy, airDensity } from './_shared';

// Reference values from Recknagel / ASHRAE psychrometric chart at p = 101'325 Pa

describe('pSat (Magnus, over liquid water)', () => {
	// Formel: 611.2 * exp(17.62 t / (243.12 + t))
	// Werte aus Charts (ASHRAE/Recknagel) weichen leicht ab durch andere Konstanten
	it('returns 611.2 Pa at 0 °C', () => {
		expect(pSat(0)).toBeCloseTo(611.2, 1);
	});
	it('returns ~2333 Pa at 20 °C', () => {
		expect(pSat(20)).toBeCloseTo(2333, 0);
	});
	it('returns ~4234 Pa at 30 °C', () => {
		expect(pSat(30)).toBeCloseTo(4234, 0);
	});
	it('returns ~287 Pa at -10 °C (over water; ice formula would give ~260)', () => {
		expect(pSat(-10)).toBeCloseTo(287, 0);
	});
	it('is strictly monotonically increasing in t', () => {
		for (let t = -20; t < 40; t += 2) {
			expect(pSat(t + 2)).toBeGreaterThan(pSat(t));
		}
	});
});

describe('dewPoint', () => {
	it('equals the temperature at 100 % RH', () => {
		expect(dewPoint(22, 100)).toBeCloseTo(22, 2);
	});
	it('returns ~11.1 °C at 22 °C / 50 % RH (chart)', () => {
		expect(dewPoint(22, 50)).toBeCloseTo(11.1, 1);
	});
	it('returns ~9.3 °C at 20 °C / 50 % RH (chart)', () => {
		expect(dewPoint(20, 50)).toBeCloseTo(9.3, 1);
	});
	it('handles 0 % RH gracefully', () => {
		expect(dewPoint(20, 0)).toBe(-Infinity);
	});
});

describe('absHumidity', () => {
	it('returns ~8.2 g/kg at 22 °C / 50 % RH (chart)', () => {
		expect(absHumidity(22, 50)).toBeCloseTo(8.2, 1);
	});
	it('returns ~7.24 g/kg at 20 °C / 50 % RH', () => {
		expect(absHumidity(20, 50)).toBeCloseTo(7.24, 1);
	});
	it('saturation: 22 °C / 100 % RH → ~16.6 g/kg', () => {
		expect(absHumidity(22, 100)).toBeCloseTo(16.6, 1);
	});
	it('returns 0 at 0 % RH', () => {
		expect(absHumidity(22, 0)).toBeCloseTo(0, 6);
	});
});

describe('enthalpy', () => {
	// h = 1.006·t + x·(2501 + 1.86·t)   [kJ/kg dry air]
	it('returns ~43 kJ/kg at 22 °C / 8.2 g/kg (chart ~42.9)', () => {
		expect(enthalpy(22, 8.2)).toBeCloseTo(43, 0);
	});
	it('returns ~38 kJ/kg at 20 °C / 7.3 g/kg', () => {
		expect(enthalpy(20, 7.3)).toBeCloseTo(38.5, 0);
	});
	it('returns ~1.006·t for dry air', () => {
		expect(enthalpy(20, 0)).toBeCloseTo(20.12, 2);
	});
});

describe('airDensity', () => {
	// Ideal gas: rho = p / (R·T), R_dry = 287.058 J/(kg·K)
	it('returns ~1.20 kg/m³ at 20 °C, 101325 Pa', () => {
		expect(airDensity(20)).toBeCloseTo(1.204, 2);
	});
	it('returns ~1.29 kg/m³ at 0 °C', () => {
		expect(airDensity(0)).toBeCloseTo(1.293, 2);
	});
	it('scales linearly with pressure', () => {
		const rho1 = airDensity(20, 101325);
		const rho2 = airDensity(20, 50000);
		expect(rho2 / rho1).toBeCloseTo(50000 / 101325, 3);
	});
});
