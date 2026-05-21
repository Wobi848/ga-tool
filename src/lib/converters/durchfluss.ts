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
	name_en: 'Flow Rate',
	icon: 'droplets',
	color: '#2563eb',
	units: [
		{
			id: 'm³/h',
			label: 'Kubikmeter pro Stunde',
			labelEn: 'Cubic metres per hour',
			symbol: 'm³/h',
			note: 'Standard Heizung/Kühlung',
			noteEn: 'Standard heating/cooling'
		},
		{
			id: 'l/s',
			label: 'Liter pro Sekunde',
			labelEn: 'Litres per second',
			symbol: 'l/s',
			note: 'Häufig für Lüftungsanlagen',
			noteEn: 'Common for ventilation systems'
		},
		{ id: 'l/min', label: 'Liter pro Minute', labelEn: 'Litres per minute', symbol: 'l/min' },
		{ id: 'l/h', label: 'Liter pro Stunde', labelEn: 'Litres per hour', symbol: 'l/h' },
		{
			id: 'm³/s',
			label: 'Kubikmeter pro Sekunde',
			labelEn: 'Cubic metres per second',
			symbol: 'm³/s',
			note: 'SI-Basiseinheit',
			noteEn: 'SI base unit'
		}
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
