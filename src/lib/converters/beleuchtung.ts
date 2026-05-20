import type { ConverterMeta } from './types';

// Base unit: lux (lx)
// DALI level: logarithmic mapping per IEC 62386 (level 0 = off, 1–254 = dim, 255 = max)
// DALI % → lux is perceptual (logarithmic), using arc formula: lux ∝ (10^((level-1)/253×3))
// Simplified linear for candela/m² and fc; log for DALI

function daliLevelToLux(level: number): number {
	if (level <= 0) return 0;
	const normalized = (Math.min(level, 254) - 1) / 253;
	return Math.pow(10, normalized * Math.log10(1000)); // 0–1000 lux range
}

function luxToDaliLevel(lux: number): number {
	if (lux <= 0) return 0;
	const normalized = Math.log10(Math.min(lux, 1000)) / Math.log10(1000);
	return Math.round(1 + normalized * 253);
}

export const beleuchtung: ConverterMeta = {
	slug: 'beleuchtung',
	name: 'Beleuchtung',
	name_en: 'Illuminance',
	icon: 'sun',
	color: '#eab308',
	units: [
		{ id: 'lx', label: 'Lux', labelEn: 'Lux', symbol: 'lx', note: 'SI-Einheit Beleuchtungsstärke', noteEn: 'SI unit for illuminance' },
		{ id: 'fc', label: 'Footcandle', symbol: 'fc', note: '1 fc = 10.764 lx (US/UK)' },
		{ id: 'cdm2', label: 'Candela/m²', labelEn: 'Candela/m²', symbol: 'cd/m²', note: 'Leuchtdichte (Monitore ~200 cd/m²)', noteEn: 'Luminance (monitors ~200 cd/m²)' },
		{ id: 'dali', label: 'DALI-Level', labelEn: 'DALI Level', symbol: 'DALI', note: 'IEC 62386: 0=off, 254=max, log. Kurve', noteEn: 'IEC 62386: 0=off, 254=max, log. curve' },
		{ id: 'dalipct', label: 'DALI %', labelEn: 'DALI %', symbol: '%', note: '0–100 % → DALI Level 1–254', noteEn: '0–100 % → DALI Level 1–254' }
	],
	toBase: (v, u) => {
		switch (u) {
			case 'lx':      return v;
			case 'fc':      return v * 10.7639;
			case 'cdm2':    return v * Math.PI;
			case 'dali':    return daliLevelToLux(v);
			case 'dalipct': return daliLevelToLux(1 + Math.round((v / 100) * 253));
			default:        return v;
		}
	},
	fromBase: (v, u) => {
		switch (u) {
			case 'lx':      return v;
			case 'fc':      return v / 10.7639;
			case 'cdm2':    return v / Math.PI;
			case 'dali':    return luxToDaliLevel(v);
			case 'dalipct': return Math.round(((luxToDaliLevel(v) - 1) / 253) * 100);
			default:        return v;
		}
	}
};
