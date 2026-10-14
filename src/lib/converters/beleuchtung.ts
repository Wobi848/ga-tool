import type { ConverterMeta } from './types';

/* Beleuchtungsstaerke: Lux und Footcandle.
 *
 * Bis 0.16.0 standen hier auch cd/m² und DALI. Beides ist keine
 * Einheitenumrechnung: Leuchtdichte (cd/m²) haengt vom Reflexionsgrad der
 * Flaeche ab (L = E · ρ / π), und gerechnet wurde mit ρ = 1, einer ideal
 * weissen Flaeche. DALI-Stufen sagen etwas ueber den relativen Lichtstrom,
 * nicht ueber Lux im Raum — dafuer gibt es jetzt den DALI-Konverter. */
export const beleuchtung: ConverterMeta = {
	slug: 'beleuchtung',
	name: 'Beleuchtungsstärke',
	name_en: 'Illuminance',
	icon: 'sun',
	color: '#eab308',
	updated: '2026-10-14',
	units: [
		{
			id: 'lx',
			label: 'Lux',
			labelEn: 'Lux',
			symbol: 'lx',
			note: 'SI-Einheit, 1 lx = 1 lm/m²',
			noteEn: 'SI unit, 1 lx = 1 lm/m²'
		},
		{
			id: 'fc',
			label: 'Footcandle',
			symbol: 'fc',
			note: '1 fc = 1 lm/ft² = 10.764 lx',
			noteEn: '1 fc = 1 lm/ft² = 10.764 lx'
		}
	],
	toBase: (v, u) => (u === 'fc' ? v * 10.7639 : v),
	fromBase: (v, u) => (u === 'fc' ? v / 10.7639 : v)
};
