import type { ReferenceTable } from '../types';

export const cuRohre: ReferenceTable = {
	slug: 'cu-rohre',
	title: 'Kupferrohre — Standardgrössen',
	subtitle: 'Sanitär und Heizung, halbhart und hart',
	category: 'Rohre',
	icon: 'pipe',
	color: '#b45309',
	areas: ['hlk', 'sanitaer'],
	norm: ['EN 1057'],
	updated: '2026-05-14',
	description: 'Übliche Kupferrohr-Grössen für Trinkwasser- und Heizungsanwendungen.',
	columns: [
		{ key: 'name', label: 'Bezeichnung', mono: true, highlight: true },
		{ key: 'od', label: 'Aussen-Ø', unit: 'mm', type: 'number' },
		{ key: 's', label: 'Wandstärke', unit: 'mm', type: 'number' },
		{ key: 'id', label: 'Innen-Ø', unit: 'mm', type: 'number', highlight: true },
		{ key: 'mass', label: 'Gewicht', unit: 'kg/m', type: 'number' },
		{ key: 'use', label: 'Typische Verwendung' }
	],
	rows: [
		{ name: '12 × 1.0',  od: 12,  s: 1.0, id: 10.0, mass: 0.308, use: 'Anbindung Sanitär' },
		{ name: '15 × 1.0',  od: 15,  s: 1.0, id: 13.0, mass: 0.391, use: 'Standard Sanitär' },
		{ name: '18 × 1.0',  od: 18,  s: 1.0, id: 16.0, mass: 0.475, use: 'Heizkörper-Anbindung' },
		{ name: '22 × 1.0',  od: 22,  s: 1.0, id: 20.0, mass: 0.587, use: 'Steigleitungen klein' },
		{ name: '28 × 1.5',  od: 28,  s: 1.5, id: 25.0, mass: 1.110, use: 'Verteilleitungen' },
		{ name: '35 × 1.5',  od: 35,  s: 1.5, id: 32.0, mass: 1.405, use: 'Hauptverteilung' },
		{ name: '42 × 1.5',  od: 42,  s: 1.5, id: 39.0, mass: 1.700, use: 'Hauptstrang' },
		{ name: '54 × 2.0',  od: 54,  s: 2.0, id: 50.0, mass: 2.910, use: 'Hauptstrang gross' },
		{ name: '64 × 2.0',  od: 64,  s: 2.0, id: 60.0, mass: 3.471, use: 'Hauptstrang' },
		{ name: '76.1 × 2.0', od: 76.1, s: 2.0, id: 72.1, mass: 4.149, use: 'Hauptverteilung gross' },
		{ name: '88.9 × 2.0', od: 88.9, s: 2.0, id: 84.9, mass: 4.864, use: 'Selten in Hausinstallation' }
	],
	notes: 'Kupferrohre nach EN 1057 — R220 (weich), R250 (halbhart), R290 (hart). Trinkwasserzulassung beachten.'
};
