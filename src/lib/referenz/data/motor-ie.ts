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
	updated: '2026-05-14',
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
			eff75: 88.7,
			mandate: 'nicht mehr zulässig (seit 2017)',
			mandate_en: 'no longer permitted (since 2017)'
		},
		{
			class: 'IE2',
			name: 'High Efficiency',
			eff75: 90.1,
			mandate: 'nur < 0.75 kW oder Spezialmotoren',
			mandate_en: 'only < 0.75 kW or special-purpose motors'
		},
		{
			class: 'IE3',
			name: 'Premium Efficiency',
			eff75: 91.7,
			mandate: 'Pflicht seit 2017 für 0.75–375 kW',
			mandate_en: 'mandatory since 2017 for 0.75–375 kW'
		},
		{
			class: 'IE4',
			name: 'Super Premium Efficiency',
			eff75: 92.6,
			mandate: 'Pflicht seit 2023 für 75–200 kW',
			mandate_en: 'mandatory since 2023 for 75–200 kW'
		},
		{
			class: 'IE5',
			name: 'Ultra Premium Efficiency',
			eff75: 93.4,
			mandate: 'noch nicht verbindlich (Empfehlung)',
			mandate_en: 'not yet mandatory (recommended)'
		}
	],
	notes:
		'Wirkungsgrad steigt mit Motorgrösse. Bei kleinen Motoren (< 1 kW) ist der Sprung von IE3 zu IE4 oft 2–3 %, bei grossen Motoren nur 0.5–1 %.',
	notes_en:
		'Efficiency increases with motor size. For small motors (< 1 kW), the step from IE3 to IE4 is often 2–3 %; for large motors only 0.5–1 %.'
};
