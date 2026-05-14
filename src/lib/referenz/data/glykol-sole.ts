import type { ReferenceTable } from '../types';

export const glykolSole: ReferenceTable = {
	slug: 'glykol-sole',
	title: 'Glykol-Wasser-Sole',
	subtitle: 'Ethylenglykol-Mischungen — Stoffwerte',
	category: 'Medien',
	icon: 'droplet',
	color: '#0d9488',
	areas: ['hlk'],
	updated: '2026-05-14',
	description: 'Eigenschaften von Ethylenglykol-Wasser-Mischungen bei 20 °C. Wichtig für Wärmepumpen-Solekreis und Kälteanlagen.',
	columns: [
		{ key: 'pct', label: 'Glykol-Anteil', unit: '%', type: 'number', mono: true, highlight: true },
		{ key: 'freeze', label: 'Gefrierpunkt', unit: '°C', type: 'number', highlight: true },
		{ key: 'rho', label: 'Dichte ρ', unit: 'kg/m³', type: 'number' },
		{ key: 'cp', label: 'Wärmekapazität cp', unit: 'kJ/(kg·K)', type: 'number' },
		{ key: 'nu', label: 'Kinemat. Viskosität ν', unit: 'mm²/s', type: 'number' },
		{ key: 'lambda', label: 'Wärmeleitung λ', unit: 'W/(m·K)', type: 'number' }
	],
	rows: [
		{ pct: 0,  freeze: 0,    rho: 998,  cp: 4.18, nu: 1.00, lambda: 0.60 },
		{ pct: 10, freeze: -4,   rho: 1014, cp: 4.05, nu: 1.30, lambda: 0.55 },
		{ pct: 20, freeze: -8,   rho: 1027, cp: 3.95, nu: 1.55, lambda: 0.50 },
		{ pct: 25, freeze: -12,  rho: 1035, cp: 3.88, nu: 1.80, lambda: 0.48 },
		{ pct: 30, freeze: -16,  rho: 1043, cp: 3.78, nu: 2.20, lambda: 0.46 },
		{ pct: 35, freeze: -21,  rho: 1052, cp: 3.70, nu: 2.60, lambda: 0.44 },
		{ pct: 40, freeze: -25,  rho: 1060, cp: 3.60, nu: 3.20, lambda: 0.42 },
		{ pct: 45, freeze: -32,  rho: 1068, cp: 3.50, nu: 3.90, lambda: 0.40 },
		{ pct: 50, freeze: -38,  rho: 1075, cp: 3.40, nu: 4.80, lambda: 0.38 },
		{ pct: 60, freeze: -52,  rho: 1088, cp: 3.20, nu: 7.20, lambda: 0.35 }
	],
	notes: 'Faustregel Wärmepumpe: Sole-Eingangstemp − 7 K Sicherheit zum Gefrierpunkt. Bei ungünstigen Bedingungen ≥ −10 K. Propylenglykol (lebensmittelecht) hat höhere Viskosität und niedrigere Wärmekapazität.'
};
