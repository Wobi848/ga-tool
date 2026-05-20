import type { ReferenceTable } from '../types';

export const cuRohre: ReferenceTable = {
	slug: 'cu-rohre',
	title: 'Kupferrohre — Standardgrössen',
	title_en: 'Copper Pipes — Standard Sizes',
	subtitle: 'Sanitär und Heizung, halbhart und hart',
	subtitle_en: 'Plumbing and heating, half-hard and hard',
	category: 'Rohre',
	icon: 'pipe',
	color: '#b45309',
	areas: ['hlk', 'sanitaer'],
	norm: ['EN 1057'],
	updated: '2026-05-14',
	description: 'Übliche Kupferrohr-Grössen für Trinkwasser- und Heizungsanwendungen.',
	description_en: 'Common copper pipe sizes for domestic water and heating applications.',
	columns: [
		{ key: 'name', label: 'Bezeichnung', label_en: 'Designation', mono: true, highlight: true },
		{ key: 'od', label: 'Aussen-Ø', label_en: 'Outer Ø', unit: 'mm', type: 'number' },
		{ key: 's', label: 'Wandstärke', label_en: 'Wall thickness', unit: 'mm', type: 'number' },
		{ key: 'id', label: 'Innen-Ø', label_en: 'Inner Ø', unit: 'mm', type: 'number', highlight: true },
		{ key: 'mass', label: 'Gewicht', label_en: 'Weight', unit: 'kg/m', type: 'number' },
		{ key: 'use', label: 'Typische Verwendung', label_en: 'Typical Use' }
	],
	rows: [
		{ name: '12 × 1.0',   od: 12,   s: 1.0, id: 10.0, mass: 0.308, use: 'Anbindung Sanitär',             use_en: 'Plumbing connection' },
		{ name: '15 × 1.0',   od: 15,   s: 1.0, id: 13.0, mass: 0.391, use: 'Standard Sanitär',              use_en: 'Standard plumbing' },
		{ name: '18 × 1.0',   od: 18,   s: 1.0, id: 16.0, mass: 0.475, use: 'Heizkörper-Anbindung',          use_en: 'Radiator connection' },
		{ name: '22 × 1.0',   od: 22,   s: 1.0, id: 20.0, mass: 0.587, use: 'Steigleitungen klein',          use_en: 'Small risers' },
		{ name: '28 × 1.5',   od: 28,   s: 1.5, id: 25.0, mass: 1.110, use: 'Verteilleitungen',              use_en: 'Distribution pipes' },
		{ name: '35 × 1.5',   od: 35,   s: 1.5, id: 32.0, mass: 1.405, use: 'Hauptverteilung',               use_en: 'Main distribution' },
		{ name: '42 × 1.5',   od: 42,   s: 1.5, id: 39.0, mass: 1.700, use: 'Hauptstrang',                   use_en: 'Main run' },
		{ name: '54 × 2.0',   od: 54,   s: 2.0, id: 50.0, mass: 2.910, use: 'Hauptstrang gross',             use_en: 'Large main run' },
		{ name: '64 × 2.0',   od: 64,   s: 2.0, id: 60.0, mass: 3.471, use: 'Hauptstrang',                   use_en: 'Main run' },
		{ name: '76.1 × 2.0', od: 76.1, s: 2.0, id: 72.1, mass: 4.149, use: 'Hauptverteilung gross',         use_en: 'Large main distribution' },
		{ name: '88.9 × 2.0', od: 88.9, s: 2.0, id: 84.9, mass: 4.864, use: 'Selten in Hausinstallation',    use_en: 'Rarely used in domestic installation' }
	],
	notes: 'Kupferrohre nach EN 1057 — R220 (weich), R250 (halbhart), R290 (hart). Trinkwasserzulassung beachten.',
	notes_en: 'Copper pipes per EN 1057 — R220 (soft), R250 (half-hard), R290 (hard). Check drinking water approval.'
};
