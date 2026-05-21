import type { ConverterMeta } from './types';

// Base unit: mA (raw signal value)
// Converts between mA signal and % of span (4 mA = 0%, 20 mA = 100%)
// Physical value requires context (range min/max handled in UI separately —
// here we map the standard signal representations)

// Base: mA (0–20 range, standard range is 4–20)
export const signal: ConverterMeta = {
	slug: 'signal',
	name: 'Analogsignal',
	name_en: 'Analogue Signal',
	icon: 'activity',
	color: '#ea580c',
	units: [
		{
			id: 'mA',
			label: 'Milliampere',
			labelEn: 'Milliampere',
			symbol: 'mA',
			note: '4–20 mA Industriestandard',
			noteEn: '4–20 mA industrial standard'
		},
		{
			id: '%',
			label: 'Prozent (0–100 %)',
			labelEn: 'Percent (0–100 %)',
			symbol: '%',
			note: '0 % = 4 mA, 100 % = 20 mA',
			noteEn: '0 % = 4 mA, 100 % = 20 mA'
		},
		{
			id: 'V_010',
			label: '0–10 V',
			labelEn: '0–10 V',
			symbol: 'V (0–10)',
			note: 'Typisch Lüftung/Antriebe',
			noteEn: 'Typical ventilation/actuators'
		},
		{
			id: 'V_210',
			label: '2–10 V',
			labelEn: '2–10 V',
			symbol: 'V (2–10)',
			note: 'Analog zu 4–20 mA',
			noteEn: 'Equivalent to 4–20 mA'
		},
		{
			id: 'dig12',
			label: 'Digital (0–4095)',
			labelEn: 'Digital (0–4095)',
			symbol: 'Digit',
			note: '12-Bit (0–4095)',
			noteEn: '12-bit (0–4095)'
		}
	],
	// Convert any unit to base (mA)
	toBase: (v, u) => {
		switch (u) {
			case 'mA':
				return v;
			case '%':
				return 4 + (v / 100) * 16;
			case 'V_010':
				return 4 + (v / 10) * 16;
			case 'V_210':
				return 4 + ((v - 2) / 8) * 16;
			case 'dig12':
				return 4 + (v / 4095) * 16;
			default:
				return v;
		}
	},
	fromBase: (v, u) => {
		const pct = Math.max(0, Math.min(1, (v - 4) / 16));
		switch (u) {
			case 'mA':
				return v;
			case '%':
				return pct * 100;
			case 'V_010':
				return pct * 10;
			case 'V_210':
				return 2 + pct * 8;
			case 'dig12':
				return Math.round(pct * 4095);
			default:
				return v;
		}
	}
};
