import type { ConverterMeta } from './types';

// Base unit: m³/h
const toBase: Record<string, number> = {
	'm³/h': 1,
	'm³/s': 3600,
	'l/s': 3.6,
	'l/min': 0.06
};

export const luftmengen: ConverterMeta = {
	slug: 'luftmengen',
	name: 'Luftmengen',
	icon: 'wind',
	color: '#0891b2',
	units: [
		{ id: 'm³/h', label: 'Kubikmeter pro Stunde', symbol: 'm³/h', note: 'Standard Lüftungsplanung' },
		{ id: 'm³/s', label: 'Kubikmeter pro Sekunde', symbol: 'm³/s', note: 'SI-Basiseinheit' },
		{ id: 'l/s', label: 'Liter pro Sekunde', symbol: 'l/s', note: 'Norm SIA 382' },
		{ id: 'l/min', label: 'Liter pro Minute', symbol: 'l/min' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
