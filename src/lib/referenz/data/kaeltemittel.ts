import type { ReferenceTable } from '../types';

export const kaeltemittel: ReferenceTable = {
	slug: 'kaeltemittel',
	title: 'Kältemittel — Eigenschaften',
	title_en: 'Refrigerants — Properties',
	subtitle: 'GWP, ODP, kritische Temperatur, Brennbarkeit',
	subtitle_en: 'GWP, ODP, critical temperature, flammability',
	category: 'Kälte',
	icon: 'snowflake',
	color: '#0891b2',
	areas: ['hlk', 'normen'],
	norm: ['ISO 817', 'ASHRAE 34', 'F-Gase-Verordnung'],
	updated: '2026-05-14',
	description:
		'Standard-Kältemittel in WP und Kälteanlagen. GWP-Werte nach AR5 (IPCC). Sicherheitsklasse nach ASHRAE 34.',
	description_en:
		'Standard refrigerants in heat pumps and refrigeration systems. GWP values per AR5 (IPCC). Safety class per ASHRAE 34.',
	columns: [
		{ key: 'name', label: 'Bezeichnung', label_en: 'Designation', mono: true, highlight: true },
		{ key: 'chem', label: 'Chemisch', label_en: 'Chemical' },
		{
			key: 'gwp',
			label: 'GWP',
			type: 'number',
			hint: 'Treibhauspotenzial relativ CO₂',
			hint_en: 'Global warming potential relative to CO₂'
		},
		{
			key: 'odp',
			label: 'ODP',
			type: 'number',
			hint: 'Ozonschicht-Schädigung',
			hint_en: 'Ozone depletion potential'
		},
		{ key: 'tcrit', label: 'T_krit', unit: '°C', type: 'number' },
		{
			key: 'safety',
			label: 'Sicherh.-Klasse',
			label_en: 'Safety Class',
			mono: true,
			hint: 'A1 unentzündlich/ungiftig, A2L mild entzündlich, A3 brennbar, B giftig',
			hint_en: 'A1 non-flammable/non-toxic, A2L mildly flammable, A3 flammable, B toxic'
		},
		{ key: 'use', label: 'Anwendung', label_en: 'Application' }
	],
	rows: [
		{
			name: 'R134a',
			chem: 'Tetrafluorethan',
			gwp: 1430,
			odp: 0,
			tcrit: 101.1,
			safety: 'A1',
			use: 'Klima, Kühltechnik (auslaufend)',
			use_en: 'Air conditioning, refrigeration (being phased out)'
		},
		{
			name: 'R410A',
			chem: 'R32/R125 Mix 50/50',
			gwp: 2088,
			odp: 0,
			tcrit: 71.4,
			safety: 'A1',
			use: 'Klima (alt), Wärmepumpen (alt)',
			use_en: 'Air conditioning (legacy), heat pumps (legacy)'
		},
		{
			name: 'R407C',
			chem: 'R32/R125/R134a',
			gwp: 1774,
			odp: 0,
			tcrit: 86.2,
			safety: 'A1',
			use: 'R22-Ersatz Klima',
			use_en: 'R22 replacement air conditioning'
		},
		{
			name: 'R32',
			chem: 'Difluormethan',
			gwp: 675,
			odp: 0,
			tcrit: 78.4,
			safety: 'A2L',
			use: 'Klima-Split, kleine WP',
			use_en: 'Split air conditioning, small heat pumps'
		},
		{
			name: 'R454B',
			chem: 'R32/R1234yf',
			gwp: 466,
			odp: 0,
			tcrit: 78.1,
			safety: 'A2L',
			use: 'R410A-Ersatz Klima',
			use_en: 'R410A replacement air conditioning'
		},
		{
			name: 'R1234yf',
			chem: 'HFO Tetrafluorpropen',
			gwp: 4,
			odp: 0,
			tcrit: 94.7,
			safety: 'A2L',
			use: 'Klima Auto',
			use_en: 'Automotive air conditioning'
		},
		{
			name: 'R1234ze',
			chem: 'HFO',
			gwp: 7,
			odp: 0,
			tcrit: 109.4,
			safety: 'A2L',
			use: 'Klima Gewerbe, Kaltwassersätze',
			use_en: 'Commercial air conditioning, chillers'
		},
		{
			name: 'R290',
			chem: 'Propan',
			gwp: 3,
			odp: 0,
			tcrit: 96.7,
			safety: 'A3',
			use: 'WP (klein), Kühlgeräte',
			use_en: 'Heat pumps (small), refrigeration appliances'
		},
		{
			name: 'R600a',
			chem: 'Isobutan',
			gwp: 3,
			odp: 0,
			tcrit: 134.7,
			safety: 'A3',
			use: 'Haushaltskühlgeräte',
			use_en: 'Domestic refrigerators'
		},
		{
			name: 'R744',
			chem: 'CO₂',
			gwp: 1,
			odp: 0,
			tcrit: 31.1,
			safety: 'A1',
			use: 'WP, Gewerbekälte, transkritisch',
			use_en: 'Heat pumps, commercial refrigeration, transcritical'
		},
		{
			name: 'R717',
			chem: 'Ammoniak NH₃',
			gwp: 0,
			odp: 0,
			tcrit: 132.3,
			safety: 'B2L',
			use: 'Industriekälte, Eisbahnen',
			use_en: 'Industrial refrigeration, ice rinks'
		}
	],
	notes:
		'F-Gase-Verordnung 2024: Quotenreduktion bis 2030 um 95 %. Neuanlagen verstärkt mit natürlichen Kältemitteln (R290, R744, R717) oder HFOs.',
	notes_en:
		'F-Gas Regulation 2024: quota reduction of 95 % by 2030. New systems increasingly use natural refrigerants (R290, R744, R717) or HFOs.'
};
