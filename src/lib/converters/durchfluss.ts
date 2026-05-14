import type { ConverterMeta } from './types';

// Base unit: m³/s
const toBase: Record<string, number> = {
	'm³/s': 1,
	'm³/h': 1 / 3600,
	'l/s': 0.001,
	'l/min': 1 / 60000,
	'l/h': 1 / 3600000
};

export const durchfluss: ConverterMeta = {
	slug: 'durchfluss',
	name: 'Durchfluss',
	icon: 'droplets',
	color: '#2563eb',
	units: [
		{ id: 'm³/h', label: 'Kubikmeter pro Stunde', symbol: 'm³/h', note: 'Standard Heizung/Kühlung' },
		{ id: 'l/s', label: 'Liter pro Sekunde', symbol: 'l/s', note: 'Häufig für Lüftungsanlagen' },
		{ id: 'l/min', label: 'Liter pro Minute', symbol: 'l/min' },
		{ id: 'l/h', label: 'Liter pro Stunde', symbol: 'l/h' },
		{ id: 'm³/s', label: 'Kubikmeter pro Sekunde', symbol: 'm³/s', note: 'SI-Basiseinheit' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
