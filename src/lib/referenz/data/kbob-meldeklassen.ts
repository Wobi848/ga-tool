import type { ReferenceTable } from '../types';

export const kbobMeldeklassen: ReferenceTable = {
	slug: 'kbob-meldeklassen',
	title: 'BACnet-Meldeklassen nach KBOB',
	title_en: 'BACnet Notification Classes per KBOB',
	subtitle: 'Notification Classes NC1–NC225 mit Prioritätsbereich und Quittierpflicht',
	subtitle_en: 'Notification classes NC1–NC225 with priority range and acknowledgement',
	category: 'Alarme',
	icon: 'bell',
	color: '#dc2626',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'ISO 16484-5'],
	updated: '2026-10-17',
	description:
		'Die KBOB gibt 28 Meldeklassen in acht Ereigniskategorien vor. Innerhalb einer Kategorie unterscheiden sich die Klassen nur darin, welche Zustandswechsel quittiert werden müssen (Ack_Required). Die genaue Priorität im Bereich legt der Bauherr fest.',
	description_en:
		'KBOB specifies 28 notification classes in eight event categories. Within a category the classes differ only in which transitions must be acknowledged (Ack_Required). The building owner sets the exact priority within the range.',
	notes:
		'Quelle: KBOB-Empfehlung BACnet Anwendung 2021, Tab. 7–9; Notify_Type nach Leitfaden, Tab. 4. Recipient_List: alle Wochentage, 00:00–23:59:59.99, Issue Confirmed Notifications TRUE, alle drei Transitions TRUE. Als Empfänger wird die Device-ID empfohlen, nicht die IP-Adresse. Eigene, feinere Klassen darf der Bauherr ergänzen.',
	notes_en:
		'Source: KBOB recommendation BACnet application 2021, tables 7–9; Notify_Type per guideline, table 4. Recipient_List: all weekdays, 00:00–23:59:59.99, issue confirmed notifications TRUE, all three transitions TRUE. The device ID is recommended as recipient, not the IP address. The owner may add own, finer classes.',
	columns: [
		{ key: 'nc', label: 'Klasse', label_en: 'Class', mono: true, highlight: true },
		{ key: 'kategorie', label: 'Ereigniskategorie', label_en: 'Event Category' },
		{ key: 'prioritaet', label: 'Priorität', label_en: 'Priority', mono: true },
		{
			key: 'quittierung',
			label: 'Quittierpflicht',
			label_en: 'Acknowledgement Required',
			hint: 'Welche Zustandswechsel quittiert werden müssen (Ack_Required)',
			hint_en: 'Which transitions must be acknowledged (Ack_Required)'
		},
		{ key: 'notify', label: 'Notify_Type', mono: true },
		{ key: 'beispiele', label: 'Beispiele', label_en: 'Examples' }
	],
	rows: [
		{
			nc: 'NC1',
			kategorie: 'Personenalarm (Life Safety)',
			kategorie_en: 'Life safety alarm',
			prioritaet: '1–7',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele:
				'Personennotruf, Überfall, Brandalarm, CO- oder Gasdetektion, medizinischer Notfall',
			beispiele_en:
				'Personal emergency call, hold-up, fire alarm, CO or gas detection, medical emergency'
		},
		{
			nc: 'NC2',
			kategorie: 'Personenalarm (Life Safety)',
			kategorie_en: 'Life safety alarm',
			prioritaet: '1–7',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC1',
			beispiele_en: 'as NC1'
		},
		{
			nc: 'NC3',
			kategorie: 'Personenalarm (Life Safety)',
			kategorie_en: 'Life safety alarm',
			prioritaet: '1–7',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC1',
			beispiele_en: 'as NC1'
		},
		{
			nc: 'NC4',
			kategorie: 'Personenalarm (Life Safety)',
			kategorie_en: 'Life safety alarm',
			prioritaet: '1–7',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC1',
			beispiele_en: 'as NC1'
		},
		{
			nc: 'NC32',
			kategorie: 'Objektschutz (Property Safety)',
			kategorie_en: 'Property safety',
			prioritaet: '32–39',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele: 'Ausfall wichtiger Anlagen, Gefahr von Personen- und Objektschäden, Einbruch',
			beispiele_en: 'Failure of important systems, risk of injury or property damage, intrusion'
		},
		{
			nc: 'NC33',
			kategorie: 'Objektschutz (Property Safety)',
			kategorie_en: 'Property safety',
			prioritaet: '32–39',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC32',
			beispiele_en: 'as NC32'
		},
		{
			nc: 'NC34',
			kategorie: 'Objektschutz (Property Safety)',
			kategorie_en: 'Property safety',
			prioritaet: '32–39',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC32',
			beispiele_en: 'as NC32'
		},
		{
			nc: 'NC35',
			kategorie: 'Objektschutz (Property Safety)',
			kategorie_en: 'Property safety',
			prioritaet: '32–39',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC32',
			beispiele_en: 'as NC32'
		},
		{
			nc: 'NC64',
			kategorie: 'Technischer Alarm (Supervisory)',
			kategorie_en: 'Technical alarm (supervisory)',
			prioritaet: '64–71',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele: 'Überhitzung von Geräten, Brandfallsteuerung aktiv, Frostschutz, Lastabwurf',
			beispiele_en: 'Equipment overheating, fire control active, frost protection, load shedding'
		},
		{
			nc: 'NC65',
			kategorie: 'Technischer Alarm (Supervisory)',
			kategorie_en: 'Technical alarm (supervisory)',
			prioritaet: '64–71',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC64',
			beispiele_en: 'as NC64'
		},
		{
			nc: 'NC66',
			kategorie: 'Technischer Alarm (Supervisory)',
			kategorie_en: 'Technical alarm (supervisory)',
			prioritaet: '64–71',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC64',
			beispiele_en: 'as NC64'
		},
		{
			nc: 'NC67',
			kategorie: 'Technischer Alarm (Supervisory)',
			kategorie_en: 'Technical alarm (supervisory)',
			prioritaet: '64–71',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC64',
			beispiele_en: 'as NC64'
		},
		{
			nc: 'NC96',
			kategorie: 'Technische Störung (Trouble)',
			kategorie_en: 'Technical fault (trouble)',
			prioritaet: '96–103',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele:
				'Motorstörung, Kommunikationsstörung, exzessiver Meldungsaustausch, Störung von Sicherheitsequipment',
			beispiele_en:
				'Motor fault, communication fault, excessive message traffic, fault of safety equipment'
		},
		{
			nc: 'NC97',
			kategorie: 'Technische Störung (Trouble)',
			kategorie_en: 'Technical fault (trouble)',
			prioritaet: '96–103',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC96',
			beispiele_en: 'as NC96'
		},
		{
			nc: 'NC98',
			kategorie: 'Technische Störung (Trouble)',
			kategorie_en: 'Technical fault (trouble)',
			prioritaet: '96–103',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC96',
			beispiele_en: 'as NC96'
		},
		{
			nc: 'NC99',
			kategorie: 'Technische Störung (Trouble)',
			kategorie_en: 'Technical fault (trouble)',
			prioritaet: '96–103',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC96',
			beispiele_en: 'as NC96'
		},
		{
			nc: 'NC128',
			kategorie: 'Wartungsmeldung',
			kategorie_en: 'Maintenance message',
			prioritaet: '128–135',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele: 'Wartungsmeldung, unangenehme Umgebungsbedingungen',
			beispiele_en: 'Maintenance due, uncomfortable ambient conditions'
		},
		{
			nc: 'NC129',
			kategorie: 'Wartungsmeldung',
			kategorie_en: 'Maintenance message',
			prioritaet: '128–135',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC128',
			beispiele_en: 'as NC128'
		},
		{
			nc: 'NC130',
			kategorie: 'Wartungsmeldung',
			kategorie_en: 'Maintenance message',
			prioritaet: '128–135',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC128',
			beispiele_en: 'as NC128'
		},
		{
			nc: 'NC131',
			kategorie: 'Wartungsmeldung',
			kategorie_en: 'Maintenance message',
			prioritaet: '128–135',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC128',
			beispiele_en: 'as NC128'
		},
		{
			nc: 'NC160',
			kategorie: 'Revisionsmeldung',
			kategorie_en: 'Service / inspection message',
			prioritaet: '160–167',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Alarm',
			beispiele: 'Revision oder Notbedienung, z.B. Lüftungszentrale',
			beispiele_en: 'Service mode or emergency operation, e.g. ventilation plant room'
		},
		{
			nc: 'NC161',
			kategorie: 'Revisionsmeldung',
			kategorie_en: 'Service / inspection message',
			prioritaet: '160–167',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC160',
			beispiele_en: 'as NC160'
		},
		{
			nc: 'NC162',
			kategorie: 'Revisionsmeldung',
			kategorie_en: 'Service / inspection message',
			prioritaet: '160–167',
			quittierung: 'TO-OFFNORMAL, TO-FAULT',
			quittierung_en: 'TO-OFFNORMAL, TO-FAULT',
			notify: 'Alarm',
			beispiele: 'wie NC160',
			beispiele_en: 'as NC160'
		},
		{
			nc: 'NC163',
			kategorie: 'Revisionsmeldung',
			kategorie_en: 'Service / inspection message',
			prioritaet: '160–167',
			quittierung: 'alle drei, auch TO-NORMAL',
			quittierung_en: 'all three, including TO-NORMAL',
			notify: 'Alarm',
			beispiele: 'wie NC160',
			beispiele_en: 'as NC160'
		},
		{
			nc: 'NC192',
			kategorie: 'Trenddaten (Trend Log Events)',
			kategorie_en: 'Trend data (trend log events)',
			prioritaet: '192–199',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Event',
			beispiele: 'Buffer Ready, Trenddatenschwelle erreicht',
			beispiele_en: 'Buffer ready, trend notification threshold reached'
		},
		{
			nc: 'NC193',
			kategorie: 'Trenddaten (Trend Log Events)',
			kategorie_en: 'Trend data (trend log events)',
			prioritaet: '192–199',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Event',
			beispiele: 'wie NC192',
			beispiele_en: 'as NC192'
		},
		{
			nc: 'NC224',
			kategorie: 'Betriebs- oder Statusmeldung',
			kategorie_en: 'Operating or status message',
			prioritaet: '224–231',
			quittierung: 'keine',
			quittierung_en: 'none',
			notify: 'Event',
			beispiele: 'Zustandsmeldungen, z.B. Watchdog/Heartbeat (NC224)',
			beispiele_en: 'Status messages, e.g. watchdog/heartbeat (NC224)'
		},
		{
			nc: 'NC225',
			kategorie: 'Betriebs- oder Statusmeldung',
			kategorie_en: 'Operating or status message',
			prioritaet: '224–231',
			quittierung: 'TO-FAULT',
			quittierung_en: 'TO-FAULT',
			notify: 'Event',
			beispiele: 'wie NC224',
			beispiele_en: 'as NC224'
		}
	]
};
