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
	name_en: 'Power',
	icon: 'zap',
	color: '#ca8a04',
	units: [
		{
			id: 'kW',
			label: 'Kilowatt',
			labelEn: 'Kilowatt',
			symbol: 'kW',
			note: 'Standard Heizleistung',
			noteEn: 'Standard heating power'
		},
		{ id: 'W', label: 'Watt', labelEn: 'Watt', symbol: 'W', note: 'SI-Einheit', noteEn: 'SI unit' },
		{
			id: 'kcal/h',
			label: 'Kilokalorien pro Stunde',
			labelEn: 'Kilocalories per hour',
			symbol: 'kcal/h',
			note: 'Ältere Norm',
			noteEn: 'Older standard'
		},
		{
			id: 'BTU/h',
			label: 'British Thermal Unit pro Stunde',
			labelEn: 'British Thermal Units per hour',
			symbol: 'BTU/h',
			note: 'US/UK',
			noteEn: 'US/UK'
		},
		{ id: 'kJ/h', label: 'Kilojoule pro Stunde', labelEn: 'Kilojoules per hour', symbol: 'kJ/h' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
