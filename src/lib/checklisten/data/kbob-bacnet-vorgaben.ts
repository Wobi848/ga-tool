import type { ChecklistTemplate } from '../types';

export const kbobBacnetVorgaben: ChecklistTemplate = {
	slug: 'kbob-bacnet-vorgaben',
	title: 'BACnet-Vorgaben kontrollieren (KBOB C1)',
	title_en: 'Check BACnet Requirements (KBOB C1)',
	subtitle: 'Produkt und Engineering gegen die KBOB-Empfehlung BACnet prüfen',
	subtitle_en: 'Check product and engineering against the KBOB BACnet recommendation',
	description:
		'Nach KBOB-Beilage C1 und Kap. 4–8 der Empfehlung BACnet Anwendung 2021. Der GA-Unternehmer bestätigt damit, dass sein Produkt und sein Engineering die Profile MBE-CH oder AS-CH erfüllen. Gedacht für Offertprüfung und Engineering-Freigabe, vor dem Funktionstest.',
	description_en:
		'Based on KBOB annex C1 and chapters 4–8 of the recommendation BACnet application 2021. The BA contractor confirms that the product and engineering meet the MBE-CH or AS-CH profiles. Intended for tender review and engineering approval, before the functional test.',
	category: 'Protokoll',
	icon: 'check-square',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'ISO 16484-5'],
	updated: '2026-10-17',
	sections: [
		{
			title: 'Grundsätze und Nachweise',
			title_en: 'Principles and Evidence',
			items: [
				{
					id: 'kc1-revision',
					title: 'BACnet Version 1, Protokollrevision 14 oder höher',
					title_en: 'BACnet version 1, protocol revision 14 or higher',
					norm: 'KBOB BACnet Kap. 4.1',
					critical: true
				},
				{
					id: 'kc1-utf8',
					title: 'Zeichensatz UTF-8, Umlaute in Texten möglich',
					title_en: 'Character set UTF-8, umlauts possible in texts',
					norm: 'KBOB BACnet Kap. 4.2'
				},
				{
					id: 'kc1-btl',
					title: 'Geräte von einem akkreditierten Labor zertifiziert (BTL, WSPCert)',
					title_en: 'Devices certified by an accredited lab (BTL, WSPCert)',
					norm: 'KBOB BACnet Kap. 9.1',
					critical: true
				},
				{
					id: 'kc1-pics',
					title: 'PICS aller Gerätetypen liegt bei',
					title_en: 'PICS of all device types supplied',
					norm: 'KBOB BACnet Kap. 9.1',
					critical: true
				},
				{
					id: 'kc1-proprietaer',
					title: 'Keine proprietären Objekte oder Dienste anstelle genormter',
					title_en: 'No proprietary objects or services instead of standard ones',
					hint: 'Herstellerspezifische Dienste und Properties sind für Meldungen ausdrücklich nicht zulässig.',
					hint_en:
						'Vendor-specific services and properties are explicitly not allowed for event messages.',
					norm: 'KBOB BACnet Kap. 4.4',
					critical: true
				},
				{
					id: 'kc1-ede',
					title: 'EDE-Dateien aller Anlagen nach BIG-EU, als XLS oder CSV',
					title_en: 'EDE files of all plants per BIG-EU, as XLS or CSV',
					norm: 'KBOB BACnet Kap. 3.9, 9.1'
				}
			]
		},
		{
			title: 'Objekttypen (C1.1)',
			title_en: 'Object Types (C1.1)',
			items: [
				{
					id: 'kc1-obj-basis',
					title: 'AI, AO, AV, BI, BO, BV, MV, DEV, LP, NC unterstützt',
					title_en: 'AI, AO, AV, BI, BO, BV, MV, DEV, LP, NC supported',
					norm: 'KBOB C1.1',
					critical: true
				},
				{
					id: 'kc1-obj-multistate',
					title: 'MI und MO unterstützt (MBE-CH immer, AS-CH sobald eine GA-Funktion sie braucht)',
					title_en:
						'MI and MO supported (MBE-CH always, AS-CH as soon as a BA function needs them)',
					norm: 'KBOB C1.1'
				},
				{
					id: 'kc1-obj-dynamisch',
					title: 'CAL, EE, SCHED, TLOG dynamisch erstell- und löschbar (DC/DD)',
					title_en: 'CAL, EE, SCHED, TLOG dynamically creatable and deletable (DC/DD)',
					hint: 'Das Leitsystem muss diese Objekte zur Laufzeit anlegen und wieder löschen können, ohne Engineering-Werkzeug des Herstellers.',
					hint_en:
						'The management system must be able to create and delete these objects at runtime, without the vendor engineering tool.',
					norm: 'KBOB BACnet Kap. 5.2.2',
					critical: true
				},
				{
					id: 'kc1-obj-elog',
					title: 'Event Log (ELOG) vorhanden, falls Ereignisse lokal aufgezeichnet werden',
					title_en: 'Event log (ELOG) present if events are recorded locally',
					norm: 'KBOB BACnet Kap. 6.6.2'
				},
				{
					id: 'kc1-obj-optional',
					title: 'Bedingte Objekte (FIL, PROG, PIV) vorhanden, wo die GA-Funktionen sie brauchen',
					title_en: 'Conditional objects (FIL, PROG, PIV) present where the BA functions need them',
					hint: 'PIV wird für die Gesamtbetriebsstunden eines Antriebs gebraucht, PROG für die Programmüberwachung der AS.',
					hint_en:
						'PIV is needed for the total run hours of a drive, PROG for programme monitoring of the station.',
					norm: 'KBOB C1.1'
				}
			]
		},
		{
			title: 'Properties (C1.2)',
			title_en: 'Properties (C1.2)',
			items: [
				{
					id: 'kc1-prop-schreibbar',
					title:
						'COV_Increment, Notification_Class, High_/Low_Limit, Deadband, Event_Enable, Notify_Type, Time_Delay ab Leitsystem schreibbar',
					title_en:
						'COV_Increment, Notification_Class, High_/Low_Limit, Deadband, Event_Enable, Notify_Type, Time_Delay writable from management system',
					norm: 'KBOB C1.2',
					critical: true
				},
				{
					id: 'kc1-prop-description',
					title: 'Description ab Leitsystem schreibbar',
					title_en: 'Description writable from management system',
					norm: 'KBOB C1.2'
				},
				{
					id: 'kc1-prop-relinquish',
					title: 'Priority_Array lesbar, Relinquish_Default schreibbar',
					title_en: 'Priority_Array readable, Relinquish_Default writable',
					norm: 'KBOB C1.2'
				},
				{
					id: 'kc1-prop-inhibit',
					title:
						'Event_Algorithm_Inhibit und Reliability_Evaluation_Inhibit für die Alarmunterdrückung vorhanden',
					title_en:
						'Event_Algorithm_Inhibit and Reliability_Evaluation_Inhibit present for alarm suppression',
					norm: 'KBOB BACnet Kap. 6.2.6'
				},
				{
					id: 'kc1-prop-laengen',
					title:
						'Stringlängen eingehalten: Object_Name 64, Description 128 (MBE) / 64 (AS), Zustandstexte 32',
					title_en:
						'String lengths met: Object_Name 64, Description 128 (MBE) / 64 (AS), state texts 32',
					hint: 'Location 64, Event_Message_Texts 128 (MBE) / 64 (AS), alle übrigen Strings 32 Zeichen.',
					hint_en:
						'Location 64, Event_Message_Texts 128 (MBE) / 64 (AS), all other strings 32 characters.',
					norm: 'KBOB BACnet Kap. 5.3.1',
					critical: true
				}
			]
		},
		{
			title: 'Dienste (C1.3)',
			title_en: 'Services (C1.3)',
			items: [
				{
					id: 'kc1-bibb-ds',
					title: 'AS-CH: DS-RP-B, DS-RPM-B, DS-WP-B, DS-WPM-B, DS-COV-B, DS-COVP-B',
					title_en: 'AS-CH: DS-RP-B, DS-RPM-B, DS-WP-B, DS-WPM-B, DS-COV-B, DS-COVP-B',
					norm: 'KBOB C1.3',
					critical: true
				},
				{
					id: 'kc1-bibb-ae',
					title: 'AS-CH: AE-N-I-B, AE-N-E-B, AE-ACK-B, AE-ESUM-B, AE-INFO-B, AE-EL-I-B',
					title_en: 'AS-CH: AE-N-I-B, AE-N-E-B, AE-ACK-B, AE-ESUM-B, AE-INFO-B, AE-EL-I-B',
					norm: 'KBOB C1.3',
					critical: true
				},
				{
					id: 'kc1-bibb-sched-t',
					title: 'AS-CH: SCHED-I-B, SCHED-E-B, T-VMT-I-B, T-VMT-E-B, T-ATR-B',
					title_en: 'AS-CH: SCHED-I-B, SCHED-E-B, T-VMT-I-B, T-VMT-E-B, T-ATR-B',
					norm: 'KBOB C1.3'
				},
				{
					id: 'kc1-bibb-dm',
					title:
						'AS-CH: DM-DDB-B, DM-DOB-B, DM-DCC-B, DM-UTC-B, DM-RD-B, DM-BR-B, DM-LM-B, DM-OCD-B',
					title_en:
						'AS-CH: DM-DDB-B, DM-DOB-B, DM-DCC-B, DM-UTC-B, DM-RD-B, DM-BR-B, DM-LM-B, DM-OCD-B',
					norm: 'KBOB C1.3'
				},
				{
					id: 'kc1-bibb-mbe',
					title:
						'MBE-CH: A-BIBBs für Lesen, Schreiben, Alarme, Quittieren, Zeitprogramme, Trends, Backup und Objekte anlegen',
					title_en:
						'MBE-CH: A-BIBBs for read, write, alarms, acknowledge, schedules, trends, backup and object creation',
					hint: 'Vollständige Liste in der Referenztabelle «BACnet-Profile MBE-CH und AS-CH».',
					hint_en: 'Full list in the reference table "BACnet Profiles MBE-CH and AS-CH".',
					norm: 'KBOB C1.3'
				},
				{
					id: 'kc1-dienste-mbe',
					title:
						'DeviceCommunicationControl, ReinitializeDevice und UTCTimeSynchronization nur ab MBE',
					title_en:
						'DeviceCommunicationControl, ReinitializeDevice and UTCTimeSynchronization only from the MBE',
					norm: 'KBOB BACnet Kap. 6.5'
				}
			]
		},
		{
			title: 'Meldungen, Prioritäten, Trends',
			title_en: 'Events, Priorities, Trends',
			items: [
				{
					id: 'kc1-nc-alle',
					title:
						'Meldeklassen nach Bauherrenvorgabe angelegt, mit KBOB-Nummern, Prioritätsbereichen und Ack_Required-Mustern',
					title_en:
						'Notification classes created per owner requirements, with KBOB numbers, priority ranges and Ack_Required patterns',
					hint: 'Welche der 28 Klassen auf einer AS vorhanden sein müssen, legt der Bauherr fest (GA-Funktion «Automationsstation», Kap. 7.2). Nummern und Quittiermuster nach Tab. 8, Abweichungen nur mit dem Bauherrn.',
					hint_en:
						'Which of the 28 classes must exist on a station is set by the owner (BA function "automation station", ch. 7.2). Numbers and acknowledgement patterns per table 8, deviations only with the owner.',
					norm: 'KBOB BACnet Kap. 6.2.2, 7.2',
					critical: true
				},
				{
					id: 'kc1-nc-recipient',
					title: 'Recipient_List mit Device-ID des Leitsystems, alle Tage, ganzer Tag, Confirmed',
					title_en:
						'Recipient_List with management system device ID, all days, whole day, confirmed',
					norm: 'KBOB BACnet Tab. 9'
				},
				{
					id: 'kc1-prio-liste',
					title:
						'Prioritäten nach KBOB-Liste: 7 Hand Anlage, 8 Hand MBE, 14 Zeitprogramm, 16 Automatik',
					title_en:
						'Priorities per KBOB list: 7 manual plant, 8 manual MBE, 14 schedule, 16 automatic',
					norm: 'KBOB BACnet Tab. 10',
					critical: true
				},
				{
					id: 'kc1-prio-sicherheit',
					title:
						'Sicherheitsrelevante Ausgänge (Frost, Brand) über Priority_Array, Priorität auf alle Aggregate vererbt',
					title_en:
						'Safety-related outputs (frost, fire) via Priority_Array, priority passed on to all aggregates',
					norm: 'KBOB BACnet Kap. 6.3',
					critical: true
				},
				{
					id: 'kc1-trend-default',
					title:
						'Trend Logs: POLLED 15 min, Stop_When_Full FALSE, Buffer Ready zweimal pro Tag, 10 Tage Vorhaltezeit',
					title_en:
						'Trend logs: POLLED 15 min, Stop_When_Full FALSE, buffer ready twice a day, 10 days retention',
					norm: 'KBOB BACnet Kap. 6.6.1'
				},
				{
					id: 'kc1-kalender',
					title:
						'Kalender Feiertage, Ferien und halbe Tage auf jeder AS, vom Leitsystem synchronisiert',
					title_en:
						'Calendars for holidays, vacations and half days on every station, synchronised by the management system',
					norm: 'KBOB BACnet Kap. 6.7'
				}
			]
		},
		{
			title: 'Netzwerk',
			title_en: 'Network',
			items: [
				{
					id: 'kc1-net-technik',
					title: 'Nur BACnet/IP (BVLL/UDP) und MS/TP (EIA-485)',
					title_en: 'Only BACnet/IP (BVLL/UDP) and MS/TP (EIA-485)',
					norm: 'KBOB BACnet Kap. 8.3'
				},
				{
					id: 'kc1-net-port',
					title: 'UDP-Port 47808 (0xBAC0) unterstützt, weitere Ports nur nach Absprache',
					title_en: 'UDP port 47808 (0xBAC0) supported, further ports only by agreement',
					norm: 'KBOB BACnet Kap. 8.3.1'
				},
				{
					id: 'kc1-net-bbmd',
					title: 'BBMD-Konzept mit Bauherrn festgelegt, ein BBMD pro Subnetz',
					title_en: 'BBMD concept agreed with owner, one BBMD per subnet',
					norm: 'KBOB BACnet Kap. 8.4'
				},
				{
					id: 'kc1-net-mac',
					title: 'MAC-Adressen aller Geräte dem Bauherrn gemeldet',
					title_en: 'MAC addresses of all devices reported to the owner',
					norm: 'KBOB BACnet Kap. 8.2'
				}
			]
		}
	]
};
