import type { ReferenceTable } from '../types';

export const materialEigenschaften: ReferenceTable = {
	slug: 'material-eigenschaften',
	title: 'Stoffwerte typischer Materialien',
	subtitle: 'Dichte, Wärmekapazität, Wärmeleitfähigkeit',
	category: 'Material',
	icon: 'box',
	color: '#7c3aed',
	areas: ['hlk', 'normen'],
	norm: ['EN ISO 10456', 'SIA 381/1'],
	updated: '2026-05-14',
	description: 'Stoffwerte für Wärmebedarfsrechnung und Speicherauslegung. Werte bei 20 °C falls nicht anders angegeben.',
	columns: [
		{ key: 'name', label: 'Material', highlight: true },
		{ key: 'rho', label: 'Dichte ρ', unit: 'kg/m³', type: 'number' },
		{ key: 'cp', label: 'Wärmekap. cp', unit: 'J/(kg·K)', type: 'number' },
		{ key: 'lambda', label: 'Wärmeleitung λ', unit: 'W/(m·K)', type: 'number', highlight: true },
		{ key: 'category', label: 'Kategorie' }
	],
	rows: [
		{ name: 'Wasser (20 °C)',          rho: 998,   cp: 4182, lambda: 0.60,   category: 'Medium' },
		{ name: 'Wasser (80 °C)',          rho: 972,   cp: 4196, lambda: 0.67,   category: 'Medium' },
		{ name: 'Luft (20 °C)',            rho: 1.2,   cp: 1006, lambda: 0.026,  category: 'Medium' },
		{ name: 'Stahl (Baustahl)',        rho: 7850,  cp: 460,  lambda: 50,     category: 'Metall' },
		{ name: 'Aluminium',               rho: 2700,  cp: 900,  lambda: 230,    category: 'Metall' },
		{ name: 'Kupfer',                  rho: 8960,  cp: 385,  lambda: 380,    category: 'Metall' },
		{ name: 'Beton (Normalbeton)',     rho: 2300,  cp: 880,  lambda: 1.65,   category: 'Baustoff' },
		{ name: 'Beton (Leichtbeton)',     rho: 800,   cp: 880,  lambda: 0.21,   category: 'Baustoff' },
		{ name: 'Backstein',               rho: 1800,  cp: 880,  lambda: 0.81,   category: 'Baustoff' },
		{ name: 'Holz (Fichte)',           rho: 450,   cp: 1700, lambda: 0.13,   category: 'Baustoff' },
		{ name: 'Glas',                    rho: 2500,  cp: 720,  lambda: 0.8,    category: 'Baustoff' },
		{ name: 'Gipskartonplatte',        rho: 900,   cp: 1050, lambda: 0.25,   category: 'Baustoff' },
		{ name: 'Mineralwolle',            rho: 30,    cp: 1030, lambda: 0.04,   category: 'Dämmung' },
		{ name: 'EPS (Styropor)',          rho: 20,    cp: 1500, lambda: 0.035,  category: 'Dämmung' },
		{ name: 'XPS (Hartschaum)',        rho: 35,    cp: 1450, lambda: 0.030,  category: 'Dämmung' },
		{ name: 'PUR/PIR-Schaum',          rho: 35,    cp: 1400, lambda: 0.025,  category: 'Dämmung' },
		{ name: 'Holzfaser',               rho: 160,   cp: 2100, lambda: 0.040,  category: 'Dämmung' },
		{ name: 'Erdreich (feucht)',       rho: 1800,  cp: 1480, lambda: 1.5,    category: 'Sonstige' },
		{ name: 'Estrich (Zement)',        rho: 2000,  cp: 1080, lambda: 1.4,    category: 'Baustoff' }
	],
	notes: 'Dämmstoff-λ ist Auslegungswert nach SIA 381/4 — Praxiswerte können bei feuchtem Einbau höher liegen.'
};
