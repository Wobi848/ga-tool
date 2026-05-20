import type { ReferenceTable } from '../types';

export const normaussentemp: ReferenceTable = {
	slug: 'normaussentemp',
	title: 'Normaussentemperaturen Schweiz',
	title_en: 'Design Outdoor Temperatures Switzerland',
	subtitle: 'Auslegungstemperaturen nach SIA 384/2',
	subtitle_en: 'Design temperatures per SIA 384/2',
	category: 'Klima',
	icon: 'thermometer',
	color: '#0891b2',
	areas: ['hlk', 'normen'],
	norm: ['SIA 384/2', 'MeteoSchweiz Klimanormwerte'],
	updated: '2026-05-14',
	description: 'Norm-Aussentemperatur für Heizlast-Berechnung (Ortsklimadaten). Massgebend für Heizungsdimensionierung und Heizkurve.',
	description_en: 'Design outdoor temperature for heating load calculation (local climate data). Decisive for heating system sizing and heating curve.',
	columns: [
		{ key: 'ort', label: 'Ort', label_en: 'Location', highlight: true },
		{ key: 'kanton', label: 'Kanton', label_en: 'Canton', mono: true },
		{ key: 'temp', label: 'Norm-Aussentemp', label_en: 'Design OAT', unit: '°C', type: 'number', highlight: true },
		{ key: 'altitude', label: 'Höhe', label_en: 'Altitude', unit: 'm ü. M.', type: 'number' }
	],
	rows: [
		{ ort: 'Basel',        kanton: 'BS', temp: -7,  altitude: 277 },
		{ ort: 'Bern',         kanton: 'BE', temp: -10, altitude: 540 },
		{ ort: 'Biel',         kanton: 'BE', temp: -9,  altitude: 437 },
		{ ort: 'Chur',         kanton: 'GR', temp: -13, altitude: 593 },
		{ ort: 'Davos',        kanton: 'GR', temp: -19, altitude: 1560 },
		{ ort: 'Frauenfeld',   kanton: 'TG', temp: -10, altitude: 417 },
		{ ort: 'Genf',         kanton: 'GE', temp: -7,  altitude: 375 },
		{ ort: 'Glarus',       kanton: 'GL', temp: -12, altitude: 470 },
		{ ort: 'Lausanne',     kanton: 'VD', temp: -7,  altitude: 455 },
		{ ort: 'Locarno',      kanton: 'TI', temp: -5,  altitude: 200 },
		{ ort: 'Lugano',       kanton: 'TI', temp: -5,  altitude: 273 },
		{ ort: 'Luzern',       kanton: 'LU', temp: -8,  altitude: 435 },
		{ ort: 'Neuchâtel',    kanton: 'NE', temp: -8,  altitude: 485 },
		{ ort: 'Rapperswil',   kanton: 'SG', temp: -10, altitude: 410 },
		{ ort: 'Schaffhausen', kanton: 'SH', temp: -10, altitude: 403 },
		{ ort: 'Sion',         kanton: 'VS', temp: -10, altitude: 482 },
		{ ort: 'Solothurn',    kanton: 'SO', temp: -10, altitude: 432 },
		{ ort: 'St. Gallen',   kanton: 'SG', temp: -11, altitude: 670 },
		{ ort: 'Thun',         kanton: 'BE', temp: -10, altitude: 560 },
		{ ort: 'Zermatt',      kanton: 'VS', temp: -16, altitude: 1620 },
		{ ort: 'Zug',          kanton: 'ZG', temp: -9,  altitude: 425 },
		{ ort: 'Zürich',       kanton: 'ZH', temp: -8,  altitude: 408 }
	],
	notes: 'Werte gemäss SIA 384/2 (2020). Bei Standorten dazwischen mit Höhenkorrektur (~0.5 K pro 100 m Höhendifferenz) interpolieren.',
	notes_en: 'Values per SIA 384/2 (2020). Interpolate for intermediate locations using altitude correction (~0.5 K per 100 m altitude difference).'
};
