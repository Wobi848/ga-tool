import type { ConverterMeta } from './types';

// Base unit: Sekunden (s)
export const zeit: ConverterMeta = {
	slug: 'zeit',
	name: 'Zeit',
	name_en: 'Time',
	icon: 'clock',
	color: '#7c3aed',
	updated: '2026-05-24',
	units: [
		{ id: 'ms', label: 'Millisekunde', labelEn: 'Millisecond', symbol: 'ms' },
		{
			id: 's',
			label: 'Sekunde',
			labelEn: 'Second',
			symbol: 's',
			note: 'SI-Basiseinheit',
			noteEn: 'SI base unit'
		},
		{ id: 'min', label: 'Minute', labelEn: 'Minute', symbol: 'min' },
		{ id: 'h', label: 'Stunde', labelEn: 'Hour', symbol: 'h' },
		{
			id: 'd',
			label: 'Tag',
			labelEn: 'Day',
			symbol: 'd',
			note: '24 h',
			noteEn: '24 h'
		},
		{
			id: 'wk',
			label: 'Woche',
			labelEn: 'Week',
			symbol: 'Wo',
			note: '7 Tage',
			noteEn: '7 days'
		},
		{
			id: 'mo',
			label: 'Monat',
			labelEn: 'Month',
			symbol: 'Mt',
			note: '30.44 Tage (Mittel)',
			noteEn: '30.44 days (mean)'
		},
		{
			id: 'yr',
			label: 'Jahr',
			labelEn: 'Year',
			symbol: 'a',
			note: '365.25 Tage (mit Schaltjahren)',
			noteEn: '365.25 days (incl. leap years)'
		}
	],
	toBase: (v, u) => {
		switch (u) {
			case 'ms':
				return v / 1000;
			case 's':
				return v;
			case 'min':
				return v * 60;
			case 'h':
				return v * 3600;
			case 'd':
				return v * 86400;
			case 'wk':
				return v * 604800;
			case 'mo':
				return v * 2629800; // 30.4375 d
			case 'yr':
				return v * 31557600; // 365.25 d
			default:
				return v;
		}
	},
	fromBase: (v, u) => {
		switch (u) {
			case 'ms':
				return v * 1000;
			case 's':
				return v;
			case 'min':
				return v / 60;
			case 'h':
				return v / 3600;
			case 'd':
				return v / 86400;
			case 'wk':
				return v / 604800;
			case 'mo':
				return v / 2629800;
			case 'yr':
				return v / 31557600;
			default:
				return v;
		}
	}
};
