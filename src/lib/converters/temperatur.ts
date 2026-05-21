import type { ConverterMeta } from './types';

// Non-linear — handle directly, base = °C
export const temperatur: ConverterMeta = {
	slug: 'temperatur',
	name: 'Temperatur',
	name_en: 'Temperature',
	icon: 'thermometer',
	color: '#dc2626',
	units: [
		{
			id: 'C',
			label: 'Grad Celsius',
			labelEn: 'Degrees Celsius',
			symbol: '°C',
			note: 'Standard in CH/EU',
			noteEn: 'Standard in CH/EU'
		},
		{
			id: 'K',
			label: 'Kelvin',
			labelEn: 'Kelvin',
			symbol: 'K',
			note: 'Absolute Temperatur, 0 K = −273.15 °C',
			noteEn: 'Absolute temperature, 0 K = −273.15 °C'
		},
		{
			id: 'F',
			label: 'Grad Fahrenheit',
			labelEn: 'Degrees Fahrenheit',
			symbol: '°F',
			note: 'US/UK',
			noteEn: 'US/UK'
		}
	],
	toBase: (v, u) => {
		if (u === 'C') return v;
		if (u === 'K') return v - 273.15;
		return (v - 32) * (5 / 9); // F
	},
	fromBase: (v, u) => {
		if (u === 'C') return v;
		if (u === 'K') return v + 273.15;
		return v * (9 / 5) + 32; // F
	}
};
