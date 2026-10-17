import type { ChecklistTemplate } from '../types';

export const kbobBacnetFunktionstest: ChecklistTemplate = {
	slug: 'kbob-bacnet-funktionstest',
	title: 'BACnet-Funktionstest (KBOB C2)',
	title_en: 'BACnet Functional Test (KBOB C2)',
	subtitle: 'Automationsstation und Leitsystem nach KBOB testen',
	subtitle_en: 'Test automation station and management system per KBOB',
	description:
		'Nach KBOB-Beilage C2 «Checkliste für Funktionstest», 2021, gestrafft: Was die Beilage für jeden Objekttyp einzeln abfragt (Object_Name, Description, Meldeklasse), steht hier einmal für alle. Der Test läuft mit dem Leitsystem oder einem BACnet-Explorer gegen eine fertig engineerte AS.',
	description_en:
		'Based on KBOB annex C2 "Checklist for functional test", 2021, condensed: what the annex asks for each object type separately (Object_Name, Description, notification class) appears here once for all. The test runs with the management system or a BACnet explorer against a fully engineered station.',
	category: 'Test',
	icon: 'check-square',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'ISO 16484-5'],
	updated: '2026-10-17',
	sections: [
		{
			title: 'Konfiguration der Automationsstation',
			title_en: 'Automation Station Configuration',
			items: [
				{
					id: 'kc2-ip',
					title: 'IP-Adresse, Subnetz und Standard-Gateway nach B-PAT',
					title_en: 'IP address, subnet and default gateway per B-PAT',
					hint: 'Die B-PAT (BACnet Project Address Table der BIG-EU) ist die zentrale Adressliste des Projekts.',
					hint_en:
						'The B-PAT (BACnet project address table of BIG-EU) is the central address list of the project.',
					critical: true
				},
				{
					id: 'kc2-device-id',
					title: 'Device-ID nach B-PAT, im Netz eindeutig',
					title_en: 'Device ID per B-PAT, unique in the network',
					critical: true
				},
				{
					id: 'kc2-port-netz',
					title: 'UDP-Port und Netzwerknummer nach B-PAT',
					title_en: 'UDP port and network number per B-PAT',
					critical: true
				},
				{
					id: 'kc2-utf8',
					title: 'Zeichensatz mindestens UTF-8',
					title_en: 'Character set at least UTF-8'
				},
				{
					id: 'kc2-profil',
					title: 'Profil AS-CH erfüllt, Hardware-Eingänge und -Ausgänge sind eigene BACnet-Objekte',
					title_en: 'AS-CH profile met, hardware inputs and outputs are separate BACnet objects'
				},
				{
					id: 'kc2-device-objekt',
					title: 'Device-Objekt: Object_Name nach Kennzeichnung, Location gesetzt',
					title_en: 'Device object: Object_Name per labelling scheme, Location set'
				}
			]
		},
		{
			title: 'Alle Objekte',
			title_en: 'All Objects',
			items: [
				{
					id: 'kc2-name',
					title: 'Object_Name nach Betriebsmittelliste und Kennzeichnungskonzept',
					title_en: 'Object_Name per equipment list and labelling scheme',
					critical: true
				},
				{
					id: 'kc2-description',
					title: 'Description klar und verständlich, in der vorgegebenen Sprache',
					title_en: 'Description clear and understandable, in the specified language'
				},
				{
					id: 'kc2-nc',
					title: 'Notification_Class richtig zugeordnet',
					title_en: 'Notification_Class assigned correctly',
					critical: true
				},
				{
					id: 'kc2-notify',
					title: 'Notify_Type richtig: Alarm oder Event',
					title_en: 'Notify_Type correct: alarm or event',
					hint: 'Nach Leitfaden ab der Kategorie Trenddaten (NC192 und höher) Event.',
					hint_en: 'Per guideline, event from the trend data category (NC192 and above).'
				},
				{
					id: 'kc2-event-enable',
					title: 'Event_Enable für alle zu meldenden Zustandswechsel aktiv',
					title_en: 'Event_Enable active for all transitions to be reported'
				}
			]
		},
		{
			title: 'Analoge Objekte (AI, AO, AV)',
			title_en: 'Analog Objects (AI, AO, AV)',
			items: [
				{
					id: 'kc2-units',
					title: 'Units richtig gesetzt',
					title_en: 'Units set correctly',
					critical: true
				},
				{
					id: 'kc2-range',
					title: 'Messbereich Min_Pres_Value / Max_Pres_Value richtig',
					title_en: 'Range Min_Pres_Value / Max_Pres_Value correct'
				},
				{
					id: 'kc2-limits',
					title: 'High_Limit und Low_Limit richtig',
					title_en: 'High_Limit and Low_Limit correct'
				},
				{
					id: 'kc2-cov',
					title: 'COV_Increment richtig, falls COV-Trends gefordert',
					title_en: 'COV_Increment correct if COV trends are required'
				},
				{
					id: 'kc2-av-prio',
					title: 'AV als Sollwert: Ist ein Priority_Array wirklich nötig?',
					title_en: 'AV as setpoint: is a Priority_Array really needed?',
					hint: 'Die KBOB empfiehlt Sollwerte ohne Priority_Array.',
					hint_en: 'KBOB recommends setpoints without Priority_Array.'
				}
			]
		},
		{
			title: 'Binäre und Multi-state-Objekte',
			title_en: 'Binary and Multi-state Objects',
			items: [
				{
					id: 'kc2-texte',
					title: 'Inactive_Text, Active_Text und State_Text nach den Zustandstexten (T1)',
					title_en: 'Inactive_Text, Active_Text and State_Text per the state texts (T1)',
					critical: true
				},
				{
					id: 'kc2-alarm-value',
					title: 'Alarm_Value (BI) und Alarm_Values (MI) auf der richtigen Flanke bzw. Position',
					title_en: 'Alarm_Value (BI) and Alarm_Values (MI) on the correct edge or position'
				},
				{
					id: 'kc2-ausgang-prio',
					title:
						'Ausgänge BO, MO, AO: Prioritäten im Priority_Array beschrieben, z.B. Zeitprogramm oder Frost',
					title_en:
						'Outputs BO, MO, AO: priorities in the Priority_Array described, e.g. schedule or frost',
					critical: true
				}
			]
		},
		{
			title: 'Meldeklassen, Zeitprogramme, Trends',
			title_en: 'Notification Classes, Schedules, Trends',
			items: [
				{
					id: 'kc2-nc-vorhanden',
					title:
						'Alle Notification Classes vorhanden, Priority, Ack_Required und Recipient_List nach Vorgabe',
					title_en:
						'All notification classes present, Priority, Ack_Required and Recipient_List as specified',
					critical: true
				},
				{
					id: 'kc2-ee',
					title: 'Event Enrollment: richtiger Event_Type',
					title_en: 'Event enrollment: correct Event_Type'
				},
				{
					id: 'kc2-cal',
					title: 'Kalender: Date_List richtig ausgefüllt',
					title_en: 'Calendar: Date_List filled in correctly'
				},
				{
					id: 'kc2-sched',
					title:
						'Schedule: Referenz auf das Schaltobjekt, Wochen- und Sonderzeitplan mit richtigen Schaltzeiten',
					title_en:
						'Schedule: reference to the switched object, weekly and exception schedule with correct times'
				},
				{
					id: 'kc2-trend-vorhanden',
					title: 'Trend Logs nach Vorgabe vorhanden',
					title_en: 'Trend logs present as specified'
				},
				{
					id: 'kc2-trend-param',
					title: 'Trend Log: Stop_When_Full FALSE, Logging_Type nach Konzept, 15 min bei POLLED',
					title_en: 'Trend log: Stop_When_Full FALSE, Logging_Type per concept, 15 min for POLLED'
				},
				{
					id: 'kc2-trend-buffer',
					title: 'Buffer Ready zweimal pro Tag, Buffer_Size für mindestens 10 Tage',
					title_en: 'Buffer ready twice a day, Buffer_Size for at least 10 days'
				}
			]
		},
		{
			title: 'Änderungen ab Leitsystem',
			title_en: 'Changes from the Management System',
			items: [
				{
					id: 'kc2-sollwert',
					title: 'Sollwerte ändern: AS übernimmt die Werte',
					title_en: 'Change setpoints: station accepts the values'
				},
				{
					id: 'kc2-zeitprogramm',
					title: 'Schaltzeit im Zeitprogramm ändern: AS schaltet die Anlage zur neuen Zeit',
					title_en:
						'Change switching time in the schedule: station switches the plant at the new time'
				},
				{
					id: 'kc2-trend-aendern',
					title: 'Trend ändern: Zyklus, Logging_Type und COV-Inkrement',
					title_en: 'Change trend: interval, Logging_Type and COV increment'
				},
				{
					id: 'kc2-dynamisch',
					title: 'CAL, EE, SCHED und TLOG ab Leitsystem anlegen und wieder löschen',
					title_en: 'Create and delete CAL, EE, SCHED and TLOG from the management system',
					critical: true
				},
				{
					id: 'kc2-rueklesen',
					title:
						'Engineering liest alle Änderungen zurück; neu angelegte Objekte und ihre Trenddaten bleiben nach einem Engineering-Download erhalten',
					title_en:
						'Engineering reads back all changes; newly created objects and their trend data survive an engineering download',
					hint: 'Häufiger Fehler: Der Download aus dem Engineering-Werkzeug überschreibt Sollwerte und Zeitprogramme, die der Betrieb geändert hat.',
					hint_en:
						'Common error: the download from the engineering tool overwrites setpoints and schedules that operations have changed.',
					critical: true
				}
			]
		},
		{
			title: 'Handeingriffe und Anlageschalter',
			title_en: 'Manual Overrides and Plant Switch',
			items: [
				{
					id: 'kc2-hand-ausgang',
					title:
						'Ausgang mit Priorität 8 übersteuern: Meldung über den Handeingriff erscheint im Leitsystem',
					title_en:
						'Override output with priority 8: message about the manual override appears in the management system'
				},
				{
					id: 'kc2-oos',
					title: 'Eingang Out_Of_Service mit Ersatzwert: Leitsystem zeigt den Zustand an',
					title_en: 'Input Out_Of_Service with substitute value: management system shows the state'
				},
				{
					id: 'kc2-anlageschalter',
					title:
						'Anlageschalter stellen: AS übernimmt, Handbetrieb wird gemeldet, Priorität wird an die Aggregate vererbt',
					title_en:
						'Set plant switch: station accepts, manual mode is reported, priority is passed on to the aggregates',
					critical: true
				},
				{
					id: 'kc2-befehle',
					title: 'Schaltbefehle und Parameter stellen: AS übernimmt die Werte',
					title_en: 'Set switching commands and parameters: station accepts the values'
				},
				{
					id: 'kc2-backup',
					title: 'Backup der AS über BACnet erstellen und zurückspielen',
					title_en: 'Create a station backup via BACnet and restore it'
				}
			]
		},
		{
			title: 'Alarmierung und Überwachung',
			title_en: 'Alarming and Monitoring',
			items: [
				{
					id: 'kc2-alarm',
					title:
						'Störung an der AS auslösen: Anzeige im Leitsystem und Event Notification über die NC',
					title_en:
						'Trigger a fault at the station: display in the management system and event notification via the NC',
					critical: true
				},
				{
					id: 'kc2-alarmliste',
					title: 'Alarmliste und Ereignishistorie auslesbar',
					title_en: 'Alarm list and event history can be read'
				},
				{
					id: 'kc2-unterdrueckung',
					title:
						'Alarmunterdrückung aktiv: keine Meldungen, aber die Meldung «Alarmunterdrückung aktiv» kommt',
					title_en:
						'Alarm suppression active: no messages, but the message "alarm suppression active" arrives'
				},
				{
					id: 'kc2-kalender-sync',
					title: 'Übergeordnete Kalender werden auf die AS verteilt',
					title_en: 'Higher-level calendars are distributed to the stations'
				},
				{
					id: 'kc2-watchdog',
					title:
						'Watchdog Leitsystem ↔ AS vorhanden und getestet, Kommunikationsausfall wird gemeldet',
					title_en:
						'Watchdog management system ↔ station present and tested, communication loss is reported',
					critical: true
				},
				{
					id: 'kc2-zeit',
					title: 'Zeitsynchronisation über UTCTimeSynchronization oder NTP, Zeitmaster festgelegt',
					title_en: 'Time synchronisation via UTCTimeSynchronization or NTP, time master defined'
				}
			]
		}
	]
};
