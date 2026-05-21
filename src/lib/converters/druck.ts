import type { ConverterMeta } from './types';

// Base unit: Pa
const toBase: Record<string, number> = {
	bar: 100000,
	kPa: 1000,
	mbar: 100,
	Pa: 1,
	psi: 6894.757,
	mmWS: 9.80665
};

export const druck: ConverterMeta = {
	slug: 'druck',
	name: 'Druck',
	name_en: 'Pressure',
	icon: 'gauge',
	color: '#ea580c',
	units: [
		{
			id: 'bar',
			label: 'Bar',
			labelEn: 'Bar',
			symbol: 'bar',
			note: 'Überdruck Heizung typisch 1–3 bar',
			noteEn: 'Heating system typically 1–3 bar overpressure'
		},
		{ id: 'kPa', label: 'Kilopascal', symbol: 'kPa' },
		{ id: 'mbar', label: 'Millibar', symbol: 'mbar' },
		{
			id: 'Pa',
			label: 'Pascal',
			labelEn: 'Pascal',
			symbol: 'Pa',
			note: 'SI-Basiseinheit',
			noteEn: 'SI base unit'
		},
		{
			id: 'psi',
			label: 'Pound per square inch',
			labelEn: 'Pound per square inch',
			symbol: 'psi',
			note: 'US/UK',
			noteEn: 'US/UK'
		},
		{
			id: 'mmWS',
			label: 'Millimeter Wassersäule',
			labelEn: 'Millimetre water column',
			symbol: 'mmWS',
			note: 'Lüftung / Druckverlust',
			noteEn: 'Ventilation / pressure drop'
		}
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
