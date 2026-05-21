import type { ReferenceTable } from '../types';

export const glykolSole: ReferenceTable = {
	slug: 'glykol-sole',
	title: 'Glykol-Wasser-Sole',
	title_en: 'Glycol-Water Brine',
	subtitle: 'Ethylenglykol-Mischungen — Stoffwerte',
	subtitle_en: 'Ethylene glycol mixtures — fluid properties',
	category: 'Medien',
	icon: 'droplet',
	color: '#0d9488',
	areas: ['hlk'],
	updated: '2026-05-14',
	description:
		'Eigenschaften von Ethylenglykol-Wasser-Mischungen bei 20 °C. Wichtig für Wärmepumpen-Solekreis und Kälteanlagen.',
	description_en:
		'Properties of ethylene glycol-water mixtures at 20 °C. Important for heat pump brine circuits and refrigeration systems.',
	columns: [
		{
			key: 'pct',
			label: 'Glykol-Anteil',
			label_en: 'Glycol content',
			unit: '%',
			type: 'number',
			mono: true,
			highlight: true
		},
		{
			key: 'freeze',
			label: 'Gefrierpunkt',
			label_en: 'Freezing point',
			unit: '°C',
			type: 'number',
			highlight: true
		},
		{ key: 'rho', label: 'Dichte ρ', label_en: 'Density ρ', unit: 'kg/m³', type: 'number' },
		{
			key: 'cp',
			label: 'Wärmekapazität cp',
			label_en: 'Heat capacity cp',
			unit: 'kJ/(kg·K)',
			type: 'number'
		},
		{
			key: 'nu',
			label: 'Kinemat. Viskosität ν',
			label_en: 'Kinematic viscosity ν',
			unit: 'mm²/s',
			type: 'number'
		},
		{
			key: 'lambda',
			label: 'Wärmeleitung λ',
			label_en: 'Thermal conductivity λ',
			unit: 'W/(m·K)',
			type: 'number'
		}
	],
	rows: [
		{ pct: 0, freeze: 0, rho: 998, cp: 4.18, nu: 1.0, lambda: 0.6 },
		{ pct: 10, freeze: -4, rho: 1014, cp: 4.05, nu: 1.3, lambda: 0.55 },
		{ pct: 20, freeze: -8, rho: 1027, cp: 3.95, nu: 1.55, lambda: 0.5 },
		{ pct: 25, freeze: -12, rho: 1035, cp: 3.88, nu: 1.8, lambda: 0.48 },
		{ pct: 30, freeze: -16, rho: 1043, cp: 3.78, nu: 2.2, lambda: 0.46 },
		{ pct: 35, freeze: -21, rho: 1052, cp: 3.7, nu: 2.6, lambda: 0.44 },
		{ pct: 40, freeze: -25, rho: 1060, cp: 3.6, nu: 3.2, lambda: 0.42 },
		{ pct: 45, freeze: -32, rho: 1068, cp: 3.5, nu: 3.9, lambda: 0.4 },
		{ pct: 50, freeze: -38, rho: 1075, cp: 3.4, nu: 4.8, lambda: 0.38 },
		{ pct: 60, freeze: -52, rho: 1088, cp: 3.2, nu: 7.2, lambda: 0.35 }
	],
	notes:
		'Faustregel Wärmepumpe: Sole-Eingangstemp − 7 K Sicherheit zum Gefrierpunkt. Bei ungünstigen Bedingungen ≥ −10 K. Propylenglykol (lebensmittelecht) hat höhere Viskosität und niedrigere Wärmekapazität.',
	notes_en:
		'Heat pump rule of thumb: brine inlet temperature should be ≥ 7 K above freezing point as a safety margin; ≥ 10 K under adverse conditions. Propylene glycol (food-safe) has higher viscosity and lower heat capacity.'
};
