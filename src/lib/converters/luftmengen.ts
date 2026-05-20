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
	name_en: 'Air Volumes',
	icon: 'wind',
	color: '#0891b2',
	units: [
		{ id: 'm³/h', label: 'Kubikmeter pro Stunde', labelEn: 'Cubic metres per hour', symbol: 'm³/h', note: 'Standard Lüftungsplanung', noteEn: 'Standard ventilation planning' },
		{ id: 'm³/s', label: 'Kubikmeter pro Sekunde', labelEn: 'Cubic metres per second', symbol: 'm³/s', note: 'SI-Basiseinheit', noteEn: 'SI base unit' },
		{ id: 'l/s', label: 'Liter pro Sekunde', labelEn: 'Litres per second', symbol: 'l/s', note: 'Norm SIA 382', noteEn: 'Standard SIA 382' },
		{ id: 'l/min', label: 'Liter pro Minute', labelEn: 'Litres per minute', symbol: 'l/min' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
