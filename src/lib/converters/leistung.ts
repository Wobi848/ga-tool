import type { ConverterMeta } from './types';

// Base unit: kW
const toBase: Record<string, number> = {
	kW: 1,
	W: 0.001,
	'kcal/h': 0.001163,
	'BTU/h': 0.000293071,
	'kJ/h': 1 / 3600
};

export const leistung: ConverterMeta = {
	slug: 'leistung',
	name: 'Leistung',
	icon: 'zap',
	color: '#ca8a04',
	units: [
		{ id: 'kW', label: 'Kilowatt', symbol: 'kW', note: 'Standard Heizleistung' },
		{ id: 'W', label: 'Watt', symbol: 'W', note: 'SI-Einheit' },
		{ id: 'kcal/h', label: 'Kilokalorien pro Stunde', symbol: 'kcal/h', note: 'Ältere Norm' },
		{ id: 'BTU/h', label: 'British Thermal Unit pro Stunde', symbol: 'BTU/h', note: 'US/UK' },
		{ id: 'kJ/h', label: 'Kilojoule pro Stunde', symbol: 'kJ/h' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
