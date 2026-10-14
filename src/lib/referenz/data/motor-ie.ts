import type { ReferenceTable } from '../types';

export const motorIE: ReferenceTable = {
	slug: 'motor-ie-klassen',
	title: 'Motor-Wirkungsgradklassen IE',
	title_en: 'Motor Efficiency Classes IE',
	subtitle: 'IEC 60034-30-1 — Pflichten in der EU',
	subtitle_en: 'IEC 60034-30-1 — mandatory requirements in the EU',
	category: 'Elektro',
	icon: 'zap',
	color: '#ca8a04',
	areas: ['elektro', 'normen'],
	norm: ['IEC 60034-30-1', 'EU 2019/1781'],
	updated: '2026-10-14',
	description:
		'Wirkungsgradklassen für 3-Phasen-Asynchronmotoren. Höhere Klasse = weniger Verluste = weniger Stromverbrauch.',
	description_en:
		'Efficiency classes for 3-phase induction motors. Higher class = lower losses = lower energy consumption.',
	columns: [
		{ key: 'class', label: 'Klasse', label_en: 'Class', mono: true, highlight: true },
		{ key: 'name', label: 'Bezeichnung', label_en: 'Designation' },
		{
			key: 'eff75',
			label: 'η bei 7.5 kW / 4-pol',
			label_en: 'η at 7.5 kW / 4-pole',
			unit: '%',
			type: 'number'
		},
		{ key: 'mandate', label: 'EU-Pflicht (auch CH)', label_en: 'EU Requirement (incl. CH)' }
	],
	rows: [
		{
			class: 'IE1',
			name: 'Standard Efficiency',
			eff75: 86.0,
			mandate: 'für neue Motoren 0.12–1000 kW nicht mehr zulässig',
			mandate_en: 'no longer permitted for new motors 0.12–1000 kW'
		},
		{
			class: 'IE2',
			name: 'High Efficiency',
			eff75: 88.7,
			mandate: 'Pflicht seit 2021 für 0.12–0.75 kW',
			mandate_en: 'mandatory since 2021 for 0.12–0.75 kW'
		},
		{
			class: 'IE3',
			name: 'Premium Efficiency',
			eff75: 90.4,
			mandate: 'Pflicht seit 2021 für 0.75–1000 kW',
			mandate_en: 'mandatory since 2021 for 0.75–1000 kW'
		},
		{
			class: 'IE4',
			name: 'Super Premium Efficiency',
			eff75: 92.1,
			mandate: 'Pflicht seit 2023 für 75–200 kW',
			mandate_en: 'mandatory since 2023 for 75–200 kW'
		},
		{
			class: 'IE5',
			name: 'Ultra Premium Efficiency',
			eff75: 93.4,
			mandate: 'nicht verbindlich; definiert in IEC TS 60034-30-2 für umrichtergespeiste Motoren',
			mandate_en: 'not mandatory; defined in IEC TS 60034-30-2 for converter-fed motors'
		}
	],
	notes:
		'Grenzwerte nach IEC 60034-30-1 für 50 Hz; IE5 ist ein Richtwert. Der Wirkungsgrad steigt mit der Motorgrösse, deshalb sind die Unterschiede zwischen den Klassen bei kleinen Motoren grösser als bei grossen. Die Schweiz hat die EU-Anforderungen in der Energieeffizienzverordnung übernommen.',
	notes_en:
		'Limits per IEC 60034-30-1 for 50 Hz; IE5 is a guide value. Efficiency increases with motor size, so differences between classes are larger for small motors than for large ones. Switzerland has adopted the EU requirements in its Energy Efficiency Ordinance.'
};
