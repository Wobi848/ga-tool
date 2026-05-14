import type { ReferenceTable } from '../types';

export const dnRohre: ReferenceTable = {
	slug: 'dn-rohre',
	title: 'DN — Standardrohre Stahl',
	subtitle: 'Innendurchmesser und Wandstärken nach EN 10220',
	category: 'Rohre',
	icon: 'pipe',
	color: '#0891b2',
	areas: ['hlk', 'sanitaer'],
	norm: ['EN 10220', 'DIN 2448'],
	updated: '2026-05-14',
	description: 'Nahtlose Stahlrohre für Heizung, Sanitär und industrielle Anwendungen. Werte für Standard-Wandstärke (Serie 1).',
	columns: [
		{ key: 'dn', label: 'DN', mono: true, highlight: true },
		{ key: 'od', label: 'Aussen-Ø', unit: 'mm', type: 'number' },
		{ key: 's', label: 'Wandstärke', unit: 'mm', type: 'number' },
		{ key: 'id', label: 'Innen-Ø', unit: 'mm', type: 'number', highlight: true },
		{ key: 'mass', label: 'Gewicht', unit: 'kg/m', type: 'number', hint: 'inkl. Stahlrohr ohne Inhalt' }
	],
	rows: [
		{ dn: 'DN 8',   od: 13.5,  s: 2.0, id: 9.5,   mass: 0.567 },
		{ dn: 'DN 10',  od: 17.2,  s: 2.0, id: 13.2,  mass: 0.747 },
		{ dn: 'DN 15',  od: 21.3,  s: 2.0, id: 17.3,  mass: 0.952 },
		{ dn: 'DN 20',  od: 26.9,  s: 2.3, id: 22.3,  mass: 1.39 },
		{ dn: 'DN 25',  od: 33.7,  s: 2.6, id: 28.5,  mass: 1.99 },
		{ dn: 'DN 32',  od: 42.4,  s: 2.6, id: 37.2,  mass: 2.54 },
		{ dn: 'DN 40',  od: 48.3,  s: 2.6, id: 43.1,  mass: 2.93 },
		{ dn: 'DN 50',  od: 60.3,  s: 2.9, id: 54.5,  mass: 4.10 },
		{ dn: 'DN 65',  od: 76.1,  s: 2.9, id: 70.3,  mass: 5.24 },
		{ dn: 'DN 80',  od: 88.9,  s: 3.2, id: 82.5,  mass: 6.76 },
		{ dn: 'DN 100', od: 114.3, s: 3.6, id: 107.1, mass: 9.83 },
		{ dn: 'DN 125', od: 139.7, s: 4.0, id: 131.7, mass: 13.4 },
		{ dn: 'DN 150', od: 168.3, s: 4.5, id: 159.3, mass: 18.2 },
		{ dn: 'DN 200', od: 219.1, s: 6.3, id: 206.5, mass: 33.1 },
		{ dn: 'DN 250', od: 273.0, s: 6.3, id: 260.4, mass: 41.4 },
		{ dn: 'DN 300', od: 323.9, s: 7.1, id: 309.7, mass: 55.5 }
	],
	notes: 'Für Kupferrohre (CU) sowie nichtrostende Stahlrohre gelten andere Wandstärken — siehe separate Tabellen.'
};
