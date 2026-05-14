import type { ConverterMeta } from './types';

// Base unit: kWh
const toBase: Record<string, number> = {
	kWh: 1,
	MWh: 1000,
	GJ: 277.778,
	MJ: 0.277778,
	kJ: 0.000277778
};

export const energie: ConverterMeta = {
	slug: 'energie',
	name: 'Energie',
	icon: 'battery-charging',
	color: '#16a34a',
	units: [
		{ id: 'kWh', label: 'Kilowattstunde', symbol: 'kWh', note: 'Standard Energieverbrauch' },
		{ id: 'MWh', label: 'Megawattstunde', symbol: 'MWh' },
		{ id: 'GJ', label: 'Gigajoule', symbol: 'GJ', note: 'Fernwärme-Abrechnung CH' },
		{ id: 'MJ', label: 'Megajoule', symbol: 'MJ' },
		{ id: 'kJ', label: 'Kilojoule', symbol: 'kJ', note: 'SI-Einheit' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
