import type { ConverterMeta } from './types';

// Saturation vapour pressure via Magnus formula (°C → Pa)
function pSat(tC: number): number {
	return 611.2 * Math.exp((17.62 * tC) / (243.12 + tC));
}

// Base unit: % (relative humidity)
// For absolute humidity (g/kg): needs temperature — default 20 °C when not provided
export const feuchte: ConverterMeta = {
	slug: 'feuchte',
	name: 'Feuchte',
	name_en: 'Humidity',
	icon: 'droplet',
	color: '#7c3aed',
	contextInput: {
		id: 'temperature',
		label: 'Lufttemperatur', labelEn: 'Air temperature',
		unit: '°C',
		default: 20,
		min: -20,
		max: 60
	},
	units: [
		{ id: '%', label: 'Relative Feuchte', labelEn: 'Relative humidity', symbol: '%', note: 'Raumklima: 40–60 %', noteEn: 'Room climate: 40–60 %' },
		{ id: 'g/kg', label: 'Absolute Feuchte', labelEn: 'Absolute humidity', symbol: 'g/kg', note: 'Wassergehalt der Luft', noteEn: 'Water content of air' },
		{ id: 'g/m³', label: 'Absolute Feuchte volumetrisch', labelEn: 'Absolute humidity (volumetric)', symbol: 'g/m³' }
	],
	// context.temperature in °C is passed as third arg by the converter UI
	toBase: (v, u, tC = 20) => {
		if (u === '%') return v;
		const ps = pSat(tC);
		if (u === 'g/kg') {
			// x = 0.622 * (φ·ps) / (p - φ·ps), φ = x·p / (0.622·ps + x·ps)
			// Solve for φ: x [g/kg] = x/1000 [kg/kg]
			const x = v / 1000;
			const p = 101325;
			const phi = (x * p) / ((0.622 + x) * ps);
			return phi * 100;
		}
		if (u === 'g/m³') {
			// ρv = φ·ps / (Rv·T), Rv = 461.5 J/(kg·K)
			const phi = (v * 461.5 * (tC + 273.15)) / (ps * 1000);
			return phi * 100;
		}
		return v;
	},
	fromBase: (v, u, tC = 20) => {
		if (u === '%') return v;
		const phi = v / 100;
		const ps = pSat(tC);
		if (u === 'g/kg') {
			const p = 101325;
			return (0.622 * (phi * ps)) / (p - phi * ps) * 1000;
		}
		if (u === 'g/m³') {
			return (phi * ps * 1000) / (461.5 * (tC + 273.15));
		}
		return v;
	}
};
