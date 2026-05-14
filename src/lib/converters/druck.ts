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
	icon: 'gauge',
	color: '#ea580c',
	units: [
		{ id: 'bar', label: 'Bar', symbol: 'bar', note: 'Überdruck Heizung typisch 1–3 bar' },
		{ id: 'kPa', label: 'Kilopascal', symbol: 'kPa' },
		{ id: 'mbar', label: 'Millibar', symbol: 'mbar' },
		{ id: 'Pa', label: 'Pascal', symbol: 'Pa', note: 'SI-Basiseinheit' },
		{ id: 'psi', label: 'Pound per square inch', symbol: 'psi', note: 'US/UK' },
		{ id: 'mmWS', label: 'Millimeter Wassersäule', symbol: 'mmWS', note: 'Lüftung / Druckverlust' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
