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
	name_en: 'Energy',
	icon: 'battery-charging',
	color: '#16a34a',
	units: [
		{ id: 'kWh', label: 'Kilowattstunde', labelEn: 'Kilowatt hour', symbol: 'kWh', note: 'Standard Energieverbrauch', noteEn: 'Standard energy consumption' },
		{ id: 'MWh', label: 'Megawattstunde', labelEn: 'Megawatt hour', symbol: 'MWh' },
		{ id: 'GJ', label: 'Gigajoule', labelEn: 'Gigajoule', symbol: 'GJ', note: 'Fernwärme-Abrechnung CH', noteEn: 'District heating billing CH' },
		{ id: 'MJ', label: 'Megajoule', labelEn: 'Megajoule', symbol: 'MJ' },
		{ id: 'kJ', label: 'Kilojoule', labelEn: 'Kilojoule', symbol: 'kJ', note: 'SI-Einheit', noteEn: 'SI unit' }
	],
	toBase: (v, u) => v * toBase[u],
	fromBase: (v, u) => v / toBase[u]
};
