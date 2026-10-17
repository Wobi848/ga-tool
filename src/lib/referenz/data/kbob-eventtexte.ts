import type { ReferenceTable } from '../types';

export const kbobEventtexte: ReferenceTable = {
	slug: 'kbob-eventtexte',
	title: 'BACnet-Eventmeldetexte nach KBOB (T2)',
	title_en: 'BACnet Event Message Texts per KBOB (T2)',
	subtitle: 'Event_Message_Texts für TO-NORMAL, TO-OFFNORMAL und TO-FAULT',
	subtitle_en: 'Event_Message_Texts for TO-NORMAL, TO-OFFNORMAL and TO-FAULT',
	category: 'Alarme',
	icon: 'bell',
	color: '#dc2626',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'BBL-Weisung GLS'],
	updated: '2026-10-17',
	description:
		'Werden bei Zustandswechseln Meldetexte übertragen, sind sie für jedes Objekt mit Event Notification festzulegen. Die KBOB-Beilage T2 gibt sechs Textsätze vor, übernommen aus der GLS-Weisung des BBL.',
	description_en:
		'If message texts are sent on transitions, they must be set for every object with event notification. KBOB annex T2 gives six German text sets, taken from the BBL directive for management systems.',
	notes:
		'Quelle: KBOB-Beilage T2 «Tabelle mit Beispielen von Eventmeldetexten», 2021. Höchstlänge 128 Zeichen auf der MBE, 64 auf der AS. Wie die Texte auf dem Leitsystem erscheinen und an Interventionsstellen gehen, legt der Bauherr fest. Die Sätze 3 und 4 sind in der Beilage identisch. Die Spalte «Passend zu» ist ein Vorschlag dieser App, die Beilage selbst ordnet die Sätze keiner Kategorie zu.',
	notes_en:
		'Source: KBOB annex T2 "Table with examples of event message texts", 2021. Maximum length 128 characters on the management station, 64 on the automation station. How the texts appear on the management system and reach response teams is set by the owner. Sets 3 and 4 are identical in the annex. The column "Suits" is a suggestion of this app; the annex itself does not assign the sets to categories.',
	columns: [
		{ key: 'nr', label: 'Ref.-Nr.', label_en: 'Ref. No.', mono: true, highlight: true },
		{ key: 'normal', label: 'TO-NORMAL', mono: true },
		{ key: 'offnormal', label: 'TO-OFFNORMAL', mono: true },
		{ key: 'fault', label: 'TO-FAULT', mono: true },
		{ key: 'einsatz', label: 'Passend zu', label_en: 'Suits' }
	],
	rows: [
		{
			nr: '1',
			normal: 'Normal',
			offnormal: 'Anormal',
			fault: 'Fehler',
			einsatz: 'Betriebs- und Statusmeldungen',
			einsatz_en: 'Operating and status messages'
		},
		{
			nr: '2',
			normal: 'Normal',
			offnormal: 'Wartung',
			fault: 'Fehler',
			einsatz: 'Wartungsmeldungen',
			einsatz_en: 'Maintenance messages'
		},
		{
			nr: '3',
			normal: 'Normal',
			offnormal: 'Störung',
			fault: 'Fehler',
			einsatz: 'Technische Störung',
			einsatz_en: 'Technical fault'
		},
		{
			nr: '4',
			normal: 'Normal',
			offnormal: 'Störung',
			fault: 'Fehler',
			einsatz: 'Technische Störung',
			einsatz_en: 'Technical fault'
		},
		{
			nr: '5',
			normal: 'Normal',
			offnormal: 'Alarm',
			fault: 'Fehler',
			einsatz: 'Technischer Alarm, Objektschutz',
			einsatz_en: 'Technical alarm, property safety'
		},
		{
			nr: '6',
			normal: 'Normal',
			offnormal: 'Gefahr',
			fault: 'Fehler',
			einsatz: 'Personenalarm',
			einsatz_en: 'Life safety alarm'
		}
	]
};
