import type { ReferenceTable } from '../types';

export const kbobProfile: ReferenceTable = {
	slug: 'kbob-profile',
	title: 'BACnet-Profile MBE-CH und AS-CH nach KBOB',
	title_en: 'BACnet Profiles MBE-CH and AS-CH per KBOB',
	subtitle: 'Geforderte Objekttypen und BIBBs für Leitsystem und Automationsstation',
	subtitle_en: 'Required object types and BIBBs for management station and automation station',
	category: 'Protokoll',
	icon: 'layers',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'ISO 16484-5'],
	updated: '2026-10-17',
	description:
		'Die KBOB definiert zwei Schweizer Profile: MBE-CH für die Management- und Bedieneinrichtung (Leitsystem) und AS-CH für die Automationsstation. Die Tabelle zeigt, welche Objekttypen und BIBBs jedes Profil können muss. A-BIBBs nutzt der Client, B-BIBBs stellt der Server bereit.',
	description_en:
		'KBOB defines two Swiss profiles: MBE-CH for the management and operator station and AS-CH for the automation station. The table shows which object types and BIBBs each profile must support. A-BIBBs are used by the client, B-BIBBs are provided by the server.',
	notes:
		'Quelle: KBOB-Beilage C1 «Checkliste zur Kontrolle von BACnet-Vorgaben», Blätter C1.1 und C1.3, 2021. Nur BIBBs, die mindestens ein Profil fordert. Voraussetzungen: BACnet Version 1 ab Revision 14, Zeichensatz UTF-8, BTL-zertifizierte Geräte, keine proprietären Objekte oder Dienste als Ersatz genormter. «Bedingt» heisst: Pflicht, sobald eine GA-Funktion nach Kap. 7 oder eine Zusatzfunktion das Objekt braucht, z.B. MI für die lokale Betriebswahl am Anlageschalter, PIV für Gesamtbetriebsstunden, ELOG für lokale Ereignisaufzeichnung.',
	notes_en:
		'Source: KBOB annex C1 "Checklist for checking BACnet requirements", sheets C1.1 and C1.3, 2021. Only BIBBs required by at least one profile. Prerequisites: BACnet version 1 from revision 14, UTF-8 character set, BTL-certified devices, no proprietary objects or services replacing standard ones. "Conditional" means mandatory as soon as a BA function per ch. 7 or an additional function needs the object, e.g. MI for the local mode selection at the plant switch, PIV for total run hours, ELOG for local event logging.',
	columns: [
		{ key: 'gruppe', label: 'Gruppe', label_en: 'Group' },
		{ key: 'kuerzel', label: 'Kürzel', label_en: 'Abbreviation', mono: true, highlight: true },
		{ key: 'name', label: 'Bezeichnung', label_en: 'Name' },
		{ key: 'mbe', label: 'MBE-CH' },
		{ key: 'as', label: 'AS-CH' }
	],
	rows: [
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'AI (0)',
			name: 'Analog Input',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'AO (1)',
			name: 'Analog Output',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'AV (2)',
			name: 'Analog Value',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'BI (3)',
			name: 'Binary Input',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'BO (4)',
			name: 'Binary Output',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'BV (5)',
			name: 'Binary Value',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'CAL (6)',
			name: 'Calendar',
			mbe: 'gefordert, dynamisch erstell- und löschbar',
			mbe_en: 'required, dynamically creatable and deletable',
			as: 'gefordert, dynamisch erstell- und löschbar',
			as_en: 'required, dynamically creatable and deletable'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'DEV (8)',
			name: 'Device',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'EE (9)',
			name: 'Event Enrollment',
			mbe: 'gefordert, dynamisch erstell- und löschbar',
			mbe_en: 'required, dynamically creatable and deletable',
			as: 'gefordert, dynamisch erstell- und löschbar',
			as_en: 'required, dynamically creatable and deletable'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'FIL (10)',
			name: 'File',
			mbe: 'bedingt',
			mbe_en: 'conditional',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'LP (12)',
			name: 'Loop',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'MI (13)',
			name: 'Multi-state Input',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'MO (14)',
			name: 'Multi-state Output',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'NC (15)',
			name: 'Notification Class',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'PROG (16)',
			name: 'Program',
			mbe: 'bedingt',
			mbe_en: 'conditional',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'SCHED (17)',
			name: 'Schedule',
			mbe: 'gefordert, dynamisch erstell- und löschbar',
			mbe_en: 'required, dynamically creatable and deletable',
			as: 'gefordert, dynamisch erstell- und löschbar',
			as_en: 'required, dynamically creatable and deletable'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'MV (19)',
			name: 'Multi-state Value',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'TLOG (20)',
			name: 'Trend Log',
			mbe: 'gefordert, dynamisch erstell- und löschbar',
			mbe_en: 'required, dynamically creatable and deletable',
			as: 'gefordert, dynamisch erstell- und löschbar',
			as_en: 'required, dynamically creatable and deletable'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'ELOG (25)',
			name: 'Event Log',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'Objekttyp',
			gruppe_en: 'Object type',
			kuerzel: 'PIV (48)',
			name: 'Positive Integer Value',
			mbe: 'bedingt',
			mbe_en: 'conditional',
			as: 'bedingt',
			as_en: 'conditional'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-RP-A',
			name: 'DS-ReadProperty-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-RP-B',
			name: 'DS-ReadProperty-B',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-RPM-A',
			name: 'DS-ReadPropertyMultiple-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-RPM-B',
			name: 'DS-ReadPropertyMultiple-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-WP-A',
			name: 'DS-WriteProperty-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-WP-B',
			name: 'DS-WriteProperty-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-WPM-A',
			name: 'DS-WritePropertyMultiple-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-WPM-B',
			name: 'DS-WritePropertyMultiple-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-COV-A',
			name: 'DS-COV-Support-A',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-COV-B',
			name: 'DS-COV-Support-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-COVP-B',
			name: 'DS-COV-Property-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-AV-A',
			name: 'DS-AdvancedView-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Data Sharing',
			gruppe_en: 'BIBB Data sharing',
			kuerzel: 'DS-AM-A',
			name: 'DS-AdvancedModify-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-N-A',
			name: 'AE-Notification-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-N-I-B',
			name: 'AE-Notification Internal B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-N-E-B',
			name: 'AE-Notification External B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-ACK-A',
			name: 'AE-ACK-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-ACK-B',
			name: 'AE-ACK-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-ESUM-B',
			name: 'AE-EnrollmentSummary-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-INFO-B',
			name: 'AE-Information-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-AVN-A',
			name: 'AE-AdvancedViewNotifications-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-AVM-A',
			name: 'AE-AdvancedViewandModify-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-AS-A',
			name: 'AE-AlarmSummaryView-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-ELVM-A',
			name: 'AE-EventLogViewandModify-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Alarm und Event',
			gruppe_en: 'BIBB Alarm and event',
			kuerzel: 'AE-EL-I-B',
			name: 'AE-EventLog-Internal-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Zeitprogramme',
			gruppe_en: 'BIBB Scheduling',
			kuerzel: 'SCHED-I-B',
			name: 'SCHED-Internal-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Zeitprogramme',
			gruppe_en: 'BIBB Scheduling',
			kuerzel: 'SCHED-E-B',
			name: 'SCHED-External-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Zeitprogramme',
			gruppe_en: 'BIBB Scheduling',
			kuerzel: 'SCHED-AVM-A',
			name: 'SCHED-AdvancedViewandModify-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Trend',
			gruppe_en: 'BIBB Trending',
			kuerzel: 'T-VMT-I-B',
			name: 'T-ViewingandModifyingTrends- Internal-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Trend',
			gruppe_en: 'BIBB Trending',
			kuerzel: 'T-VMT-E-B',
			name: 'T-ViewingandModifyingTrends- External-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Trend',
			gruppe_en: 'BIBB Trending',
			kuerzel: 'T-ATR-B',
			name: 'T-AutomatedTrendRetrieval-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Trend',
			gruppe_en: 'BIBB Trending',
			kuerzel: 'T-AVM-A',
			name: 'T-AdvancedViewandModify-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-DDB-A',
			name: 'DM-DynamicDeviceBinding-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-DDB-B',
			name: 'DM-DynamicDeviceBinding-B',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-DOB-B',
			name: 'DM-DynamicObjectBinding-B',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-DCC-A',
			name: 'DM-DeviceCommunicationControl-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-DCC-B',
			name: 'DM-DeviceCommunicationControl-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-UTC-B',
			name: 'DM-UTCTimeSynchronization-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-RD-A',
			name: 'DM-ReinitializeDevice-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-RD-B',
			name: 'DM-ReinitializeDevice-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-BR-A',
			name: 'DM-BackupandRestore-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-BR-B',
			name: 'DM-BackupandRestore-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-LM-B',
			name: 'DM-ListManipulation-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-OCD-A',
			name: 'DM-ObjectCreationandDeletion-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-OCD-B',
			name: 'DM-ObjectCreationandDeletion-B',
			mbe: '—',
			as: 'gefordert',
			as_en: 'required'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-ANM-A',
			name: 'DM-AutomaticNetworkMapping-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-ADM-A',
			name: 'DM-AutomaticDeviceMapping-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		},
		{
			gruppe: 'BIBB Geräte und Netz',
			gruppe_en: 'BIBB Device and network',
			kuerzel: 'DM-MTS-A',
			name: 'DM-ManualTimeSynchronization-A',
			mbe: 'gefordert',
			mbe_en: 'required',
			as: '—'
		}
	]
};
