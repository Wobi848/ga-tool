import type { ReferenceTable } from '../types';

export const kaeltemittel: ReferenceTable = {
	slug: 'kaeltemittel',
	title: 'Kältemittel — Eigenschaften',
	subtitle: 'GWP, ODP, kritische Temperatur, Brennbarkeit',
	category: 'Kälte',
	icon: 'snowflake',
	color: '#0891b2',
	areas: ['hlk', 'normen'],
	norm: ['ISO 817', 'ASHRAE 34', 'F-Gase-Verordnung'],
	updated: '2026-05-14',
	description: 'Standard-Kältemittel in WP und Kälteanlagen. GWP-Werte nach AR5 (IPCC). Sicherheitsklasse nach ASHRAE 34.',
	columns: [
		{ key: 'name', label: 'Bezeichnung', mono: true, highlight: true },
		{ key: 'chem', label: 'Chemisch' },
		{ key: 'gwp', label: 'GWP', type: 'number', hint: 'Treibhauspotenzial relativ CO₂' },
		{ key: 'odp', label: 'ODP', type: 'number', hint: 'Ozonschicht-Schädigung' },
		{ key: 'tcrit', label: 'T_krit', unit: '°C', type: 'number' },
		{ key: 'safety', label: 'Sicherh.-Klasse', mono: true, hint: 'A1 unentzündlich/ungiftig, A2L mild entzündlich, A3 brennbar, B giftig' },
		{ key: 'use', label: 'Anwendung' }
	],
	rows: [
		{ name: 'R134a',    chem: 'Tetrafluorethan',   gwp: 1430, odp: 0, tcrit: 101.1, safety: 'A1',  use: 'Klima, Kühltechnik (auslaufend)' },
		{ name: 'R410A',    chem: 'R32/R125 Mix 50/50',gwp: 2088, odp: 0, tcrit: 71.4,  safety: 'A1',  use: 'Klima (alt), Wärmepumpen (alt)' },
		{ name: 'R407C',    chem: 'R32/R125/R134a',    gwp: 1774, odp: 0, tcrit: 86.2,  safety: 'A1',  use: 'R22-Ersatz Klima' },
		{ name: 'R32',      chem: 'Difluormethan',     gwp: 675,  odp: 0, tcrit: 78.4,  safety: 'A2L', use: 'Klima-Split, kleine WP' },
		{ name: 'R454B',    chem: 'R32/R1234yf',       gwp: 466,  odp: 0, tcrit: 78.1,  safety: 'A2L', use: 'R410A-Ersatz Klima' },
		{ name: 'R1234yf',  chem: 'HFO Tetrafluorpropen', gwp: 4, odp: 0, tcrit: 94.7,  safety: 'A2L', use: 'Klima Auto' },
		{ name: 'R1234ze',  chem: 'HFO',               gwp: 7,    odp: 0, tcrit: 109.4, safety: 'A2L', use: 'Klima Gewerbe, Kaltwassersätze' },
		{ name: 'R290',     chem: 'Propan',            gwp: 3,    odp: 0, tcrit: 96.7,  safety: 'A3',  use: 'WP (klein), Kühlgeräte' },
		{ name: 'R600a',    chem: 'Isobutan',          gwp: 3,    odp: 0, tcrit: 134.7, safety: 'A3',  use: 'Haushaltskühlgeräte' },
		{ name: 'R744',     chem: 'CO₂',               gwp: 1,    odp: 0, tcrit: 31.1,  safety: 'A1',  use: 'WP, Gewerbekälte, transkritisch' },
		{ name: 'R717',     chem: 'Ammoniak NH₃',      gwp: 0,    odp: 0, tcrit: 132.3, safety: 'B2L', use: 'Industriekälte, Eisbahnen' }
	],
	notes: 'F-Gase-Verordnung 2024: Quotenreduktion bis 2030 um 95 %. Neuanlagen verstärkt mit natürlichen Kältemitteln (R290, R744, R717) oder HFOs.'
};
