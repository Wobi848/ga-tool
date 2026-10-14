import type { ConverterMeta } from './types';

/* DALI: Dimmstufe (Arc Power Level) und relativer Lichtstrom.
 *
 * IEC 62386-102 legt eine logarithmische Kurve fest:
 *   X(n) = 10^((n − 1) / (253/3) − 1) %   fuer n = 1…254
 * Stufe 1 = 0.1 %, Stufe 170 ≈ 10 %, Stufe 254 = 100 %. Stufe 0 = aus.
 *
 * Gleichmaessige Schritte auf dieser Kurve sehen fuer das Auge gleich gross
 * aus. Bis 0.16.0 stand DALI im Beleuchtungs-Konverter: dort wurde die Stufe
 * auf erfundene 0 bis 1000 lx abgebildet, und «DALI %» linear auf die
 * Stufen umgelegt — 50 % waren Stufe 128, richtig ist Stufe 229.
 *
 * Basiseinheit: relativer Lichtstrom in %. */

export function stufeZuProzent(n: number): number {
	if (n <= 0) return 0;
	const stufe = Math.min(254, Math.max(1, Math.round(n)));
	return Math.pow(10, (stufe - 1) / (253 / 3) - 1);
}

export function prozentZuStufe(p: number): number {
	if (p <= 0) return 0;
	const prozent = Math.min(100, Math.max(0.1, p));
	return Math.round((Math.log10(prozent) + 1) * (253 / 3) + 1);
}

export const dali: ConverterMeta = {
	slug: 'dali',
	name: 'DALI-Dimmkurve',
	name_en: 'DALI Dimming Curve',
	icon: 'sun',
	color: '#eab308',
	updated: '2026-10-14',
	units: [
		{
			id: 'level',
			label: 'DALI-Stufe (Arc Power Level)',
			labelEn: 'DALI level (arc power level)',
			symbol: 'Stufe',
			note: '0 = aus, 1–254 = gedimmt bis voll',
			noteEn: '0 = off, 1–254 = dimmed to full'
		},
		{
			id: 'pct',
			label: 'Relativer Lichtstrom',
			labelEn: 'Relative light output',
			symbol: '%',
			note: 'Logarithmisch nach IEC 62386: Stufe 1 = 0.1 %, Stufe 254 = 100 %',
			noteEn: 'Logarithmic per IEC 62386: level 1 = 0.1 %, level 254 = 100 %'
		}
	],
	toBase: (v, u) => (u === 'level' ? stufeZuProzent(v) : v),
	fromBase: (v, u) => (u === 'level' ? prozentZuStufe(v) : v)
};
