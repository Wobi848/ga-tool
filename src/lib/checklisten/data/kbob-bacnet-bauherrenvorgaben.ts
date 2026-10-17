import type { ChecklistTemplate } from '../types';

/* Entscheidungsmatrix E1 zur KBOB-Empfehlung BACnet Anwendung (2021).
 * Jeder Punkt ist eine Entscheidung des Bauherrn. Abhaken, wenn entschieden;
 * die Entscheidung als Notiz festhalten. Im Hinweis steht die Bemerkung der
 * KBOB und das Beispiel aus der Beilage E1. */

export const kbobBacnetBauherrenvorgaben: ChecklistTemplate = {
	slug: 'kbob-bacnet-bauherrenvorgaben',
	title: 'BACnet-Bauherrenvorgaben festlegen (KBOB E1)',
	title_en: 'Define Owner BACnet Requirements (KBOB E1)',
	subtitle: 'Entscheidungen des Bauherrn vor der Ausschreibung',
	subtitle_en: "The owner's decisions before the tender",
	description:
		'Nach KBOB-Beilage E1 «Entscheidungsmatrix» und Leitfaden BACnet 2021. Jeder Punkt ist eine Frage, die der Bauherr beantworten muss, bevor er seine BACnet-Vorgaben (Vorlage V1) schreibt. Abhaken, sobald entschieden; die Antwort und die Umsetzung als Notiz eintragen. Der CSV-Export ergibt die Grundlage für das Vorgabendokument.',
	description_en:
		'Based on KBOB annex E1 "Decision matrix" and BACnet guideline 2021. Each item is a question the owner must answer before writing the BACnet requirements (template V1). Tick once decided; enter the answer and implementation as a note. The CSV export provides the basis for the requirements document.',
	category: 'Protokoll',
	icon: 'table',
	color: '#0891b2',
	areas: ['ga'],
	norm: ['KBOB-Empfehlung BACnet 2021', 'KBOB Leitfaden BACnet 2021'],
	updated: '2026-10-17',
	sections: [
		{
			title: 'Grundsätze',
			title_en: 'Principles',
			items: [
				{
					id: 'e1-strategie',
					title: 'Strategischer Entscheid für interoperables BACnet gefällt?',
					title_en: 'Strategic decision for interoperable BACnet made?',
					hint: 'Beispiel E1: Ja. Die KBOB-Empfehlung wird in allen GA-Projekten als verpflichtend geltend gemacht.',
					hint_en: 'E1 example: yes. The KBOB recommendation is made mandatory in all BA projects.',
					norm: 'Leitfaden 2.1',
					critical: true
				},
				{
					id: 'e1-vorgaben',
					title: 'Gibt es schon bauherrenspezifische BACnet-Vorgaben?',
					title_en: 'Do owner-specific BACnet requirements already exist?',
					hint: 'Beispiel E1: Nein. Sie werden erstellt und stehen über der KBOB-Empfehlung; sie ergänzen oder übersteuern sie.',
					hint_en:
						'E1 example: no. They are created and rank above the KBOB recommendation; they complement or override it.',
					norm: 'Leitfaden 2.1'
				},
				{
					id: 'e1-weitere',
					title:
						'Decken Empfehlung und Leitfaden alle Bedürfnisse ab, oder braucht es weitere Dokumente?',
					title_en:
						'Do recommendation and guideline cover all needs, or are further documents required?',
					hint: 'z.B. ein Bezeichnungskonzept für den Objektnamen. Beispiel E1: Nein, zusätzliche Dokumente werden erstellt und referenziert.',
					hint_en:
						'E.g. a naming concept for the object name. E1 example: no, additional documents are created and referenced.',
					norm: 'Leitfaden 2.1'
				},
				{
					id: 'e1-pflege',
					title: 'Wie werden die Vorgaben laufend gepflegt?',
					title_en: 'How are the requirements maintained?',
					hint: 'Beispiel E1: jährliche Projektaudits, dazu Kontrollen, Dokumentprüfungen und Stichproben. Zuständig ist der BACnet-Administrator.',
					hint_en:
						'E1 example: annual project audits, plus checks, document reviews and spot checks. The BACnet administrator is responsible.',
					norm: 'Leitfaden 2.1, 4.1'
				}
			]
		},
		{
			title: 'Funktionen der Automationsstation',
			title_en: 'Automation Station Functions',
			items: [
				{
					id: 'e1-objekte',
					title: 'Werden über die KBOB-Pflichtobjekte hinaus weitere BACnet-Objekte gefordert?',
					title_en: 'Are BACnet objects required beyond the KBOB mandatory ones?',
					hint: 'Zuerst die nötigen GA-Funktionen festlegen. Beispiel E1: Nein, Verweis auf die Empfehlung.',
					hint_en:
						'Define the required BA functions first. E1 example: no, reference to the recommendation.',
					norm: 'Leitfaden 3.1.1'
				},
				{
					id: 'e1-prioritaeten',
					title: 'Gilt die Prioritätsliste der KBOB unverändert?',
					title_en: 'Does the KBOB priority list apply unchanged?',
					hint: 'Beispiel E1: Ja, keine Abweichungen.',
					hint_en: 'E1 example: yes, no deviations.',
					norm: 'Leitfaden 3.1.2'
				},
				{
					id: 'e1-zeit',
					title: 'Zeitsynchronisation über BACnet UTCTimeSynchronization oder NTP?',
					title_en: 'Time synchronisation via BACnet UTCTimeSynchronization or NTP?',
					hint: 'Beispiel E1: UTCTimeSynchronization. Nur das Leitsystem darf sie auslösen.',
					hint_en: 'E1 example: UTCTimeSynchronization. Only the management system may trigger it.',
					norm: 'Leitfaden 3.1.3'
				},
				{
					id: 'e1-watchdog',
					title: 'Ist die Funktion des Watchdogs zwischen Leitsystem und AS festgelegt?',
					title_en: 'Is the watchdog function between management system and station defined?',
					hint: 'Beispiel im Leitfaden: Zähler alle 3 Minuten, AS gibt Wert + 1 zurück.',
					hint_en: 'Example in the guideline: counter every 3 minutes, station returns value + 1.',
					norm: 'Leitfaden 3.1.4',
					critical: true
				}
			]
		},
		{
			title: 'Strukturierung und Texte',
			title_en: 'Structure and Texts',
			items: [
				{
					id: 'e1-umlaute',
					title: 'Sind Umlaute zulässig?',
					title_en: 'Are umlauts allowed?',
					hint: 'Technisch ja, UTF-8 ist mit Revision 14 gefordert. Beispiel E1: Nein, keine Umlaute zulässig.',
					hint_en:
						'Technically yes, UTF-8 is required with revision 14. E1 example: no, umlauts not allowed.',
					norm: 'Leitfaden 3.2'
				},
				{
					id: 'e1-deviceid',
					title: 'Ist die Struktur der Device-ID festgelegt?',
					title_en: 'Is the device ID structure defined?',
					hint: 'Beispiele im Leitfaden: Gebäude·Stockwerk·Laufnummer (3017021) oder Laufnummer·Gebäudegruppe. Grenze 4 194 302.',
					hint_en:
						'Examples in the guideline: building·floor·sequence (3017021) or sequence·building group. Limit 4 194 302.',
					norm: 'Leitfaden 3.2.1',
					critical: true
				},
				{
					id: 'e1-deviceid-zukunft',
					title: 'Berücksichtigt die Device-ID-Struktur bestehende und künftige Anlagen?',
					title_en: 'Does the device ID structure account for existing and future plants?',
					norm: 'Leitfaden 3.2.1'
				},
				{
					id: 'e1-objektname',
					title: 'Ist die Struktur des Objektnamens festgelegt?',
					title_en: 'Is the object name structure defined?',
					hint: 'Bestehende Bezeichnungskonzepte berücksichtigen. Vorschlag des Leitfadens: AKS nach BBL, NNNN_AAX_ANN_ANNN_AN. Gilt auch für das Device-Objekt.',
					hint_en:
						'Take existing naming concepts into account. Guideline suggestion: BBL labelling, NNNN_AAX_ANN_ANNN_AN. Also applies to the device object.',
					norm: 'Leitfaden 3.2.2',
					critical: true
				},
				{
					id: 'e1-t1',
					title: 'Zustandstexte nach Beilage T1 unverändert übernehmen?',
					title_en: 'Adopt state texts per annex T1 unchanged?',
					hint: 'Bestehende Texte nicht ändern, Ergänzungen sind erlaubt. Beispiel E1: Ja.',
					hint_en: 'Do not change existing texts; additions are allowed. E1 example: yes.',
					norm: 'Leitfaden 3.2.3'
				},
				{
					id: 'e1-t2',
					title: 'Eventmeldetexte nach Beilage T2 unverändert übernehmen?',
					title_en: 'Adopt event message texts per annex T2 unchanged?',
					hint: 'Beispiel E1: Ja.',
					hint_en: 'E1 example: yes.',
					norm: 'Leitfaden 3.2.4'
				},
				{
					id: 'e1-t2-darstellung',
					title:
						'Ist festgelegt, wie Eventmeldetexte im Leitsystem erscheinen und an Interventionsstellen gehen?',
					title_en:
						'Is it defined how event message texts appear in the management system and reach response teams?',
					norm: 'Leitfaden 3.2.4'
				},
				{
					id: 'e1-location',
					title: 'Ist die Vorgabe für Location des Device-Objekts festgelegt?',
					title_en: 'Is the rule for the Location of the device object defined?',
					norm: 'Leitfaden 3.2.5'
				}
			]
		},
		{
			title: 'Alarmierung',
			title_en: 'Alarming',
			items: [
				{
					id: 'e1-alarmkonzept',
					title: 'Gibt es ein Alarmkonzept des Bauherrn?',
					title_en: 'Does an owner alarm concept exist?',
					hint: 'Es ist die Grundlage der Meldeklassen. Beispiel E1: Nein, es wird erstellt.',
					hint_en: 'It is the basis of the notification classes. E1 example: no, it is created.',
					norm: 'Leitfaden 3.3.1',
					critical: true
				},
				{
					id: 'e1-nc-zuordnung',
					title:
						'Sind die KBOB-Meldeklassen den Alarmtypen des Bauherrn zugeordnet, mit festen Prioritäten?',
					title_en:
						'Are the KBOB notification classes mapped to the owner alarm types, with fixed priorities?',
					hint: 'Je Kategorie eine Variante wählen und die Priorität im Bereich festlegen, z.B. Störung NC98.',
					hint_en:
						'Choose one variant per category and fix the priority within the range, e.g. fault NC98.',
					norm: 'Leitfaden 3.3.1',
					critical: true
				},
				{
					id: 'e1-nc-objekte',
					title: 'Ist festgelegt, welche Objekte welche Meldeklasse bekommen?',
					title_en: 'Is it defined which objects get which notification class?',
					norm: 'Leitfaden 3.3.1'
				},
				{
					id: 'e1-nc-fein',
					title: 'Braucht es feinere eigene Meldeklassen?',
					title_en: 'Are finer own notification classes needed?',
					hint: 'Erlaubt, aber dann dokumentieren. Beispiel E1: Nein.',
					hint_en: 'Allowed, but then document them. E1 example: no.',
					norm: 'Leitfaden 3.3.1'
				},
				{
					id: 'e1-ack',
					title: 'Welche Zustandswechsel müssen quittiert werden (Ack_Required)?',
					title_en: 'Which transitions must be acknowledged (Ack_Required)?',
					norm: 'Leitfaden 3.3.1.1'
				},
				{
					id: 'e1-notify',
					title: 'Notify_Type je Meldeklasse festgelegt (Event ab Trenddaten empfohlen)?',
					title_en:
						'Notify_Type per notification class defined (event from trend data recommended)?',
					norm: 'Leitfaden 3.3.1'
				},
				{
					id: 'e1-recipient',
					title: 'Empfänger in der Recipient_List: Device-ID oder MAC-Adresse?',
					title_en: 'Recipient in Recipient_List: device ID or MAC address?',
					hint: 'Device-ID übersteht Migrationen, hängt aber vom BBMD ab; MAC-Adresse ist robuster, muss bei Migrationen angepasst werden.',
					hint_en:
						'Device ID survives migrations but depends on the BBMD; MAC address is more robust but must be adapted on migration.',
					norm: 'Leitfaden 3.3.1'
				},
				{
					id: 'e1-elog',
					title: 'Werden Ereignisse lokal auf der AS aufgezeichnet (Event Log)?',
					title_en: 'Are events recorded locally on the station (event log)?',
					hint: 'Wenn ja, Event Log im Profil AS-CH fordern. Beispiel E1: Nein.',
					hint_en: 'If yes, require event log in the AS-CH profile. E1 example: no.',
					norm: 'Leitfaden 3.3.2'
				}
			]
		},
		{
			title: 'Trends',
			title_en: 'Trends',
			items: [
				{
					id: 'e1-trend-was',
					title: 'Ist festgelegt, welche Werte aufgezeichnet werden?',
					title_en: 'Is it defined which values are logged?',
					hint: 'Mess- und Stellwerte, binäre Eingänge, Sollwerte, Betriebszustände, Schaltzustände, Zählwerte.',
					hint_en:
						'Measured and output values, binary inputs, setpoints, operating states, switching states, meter values.',
					norm: 'Leitfaden 3.4.1'
				},
				{
					id: 'e1-trend-polled',
					title: 'Abweichungen von den Default-Werten der zeitgetriggerten Trends (15 min)?',
					title_en: 'Deviations from the defaults of time-triggered trends (15 min)?',
					hint: 'Beispiel E1: Keine.',
					hint_en: 'E1 example: none.',
					norm: 'Leitfaden 3.4.1.1'
				},
				{
					id: 'e1-trend-cov',
					title: 'Abweichungen von den COV-Schwellen der KBOB?',
					title_en: 'Deviations from the KBOB COV thresholds?',
					hint: 'Beispiel E1: Keine.',
					hint_en: 'E1 example: none.',
					norm: 'Leitfaden 3.4.1.2'
				}
			]
		},
		{
			title: 'Datenpunkte und Netzwerk',
			title_en: 'Data Points and Network',
			items: [
				{
					id: 'e1-ga-funktionen',
					title:
						'Sind die GA-Funktionen den BACnet-Objekten zugeordnet und die bauherrenspezifischen Objekte gekennzeichnet?',
					title_en: 'Are BA functions mapped to BACnet objects and owner-specific objects marked?',
					hint: 'Dazu muss klar sein, welchen Funktionsumfang die Anlageteile brauchen.',
					hint_en: 'This requires clarity about the functional scope the plant parts need.',
					norm: 'Leitfaden 3.5.1'
				},
				{
					id: 'e1-anlagen',
					title: 'Ist festgelegt, welche Anlagen über BACnet erschlossen werden?',
					title_en: 'Is it defined which plants are connected via BACnet?',
					norm: 'Leitfaden 3.6.1'
				},
				{
					id: 'e1-quer',
					title: 'Ist die Querkommunikation zwischen Anlagen festgelegt?',
					title_en: 'Is cross-communication between plants defined?',
					norm: 'Leitfaden 3.6.1'
				},
				{
					id: 'e1-mstp',
					title: 'MS/TP: erlaubt? Wenn ja, welche Geräte und welche Baudrate?',
					title_en: 'MS/TP: allowed? If so, which devices and which baud rate?',
					hint: 'MS/TP nur zwischen AS und Feldgeräten.',
					hint_en: 'MS/TP only between station and field devices.',
					norm: 'Leitfaden 3.6.2'
				},
				{
					id: 'e1-netz',
					title: 'Ist die BACnet-Netzstruktur festgelegt (Netzwerknummern, Subnetze)?',
					title_en: 'Is the BACnet network structure defined (network numbers, subnets)?',
					norm: 'Leitfaden 3.6.3',
					critical: true
				},
				{
					id: 'e1-bbmd',
					title: 'BBMD-Konzept: ein BBMD pro Subnetz, auf einer AS oder einem eigenen Gerät?',
					title_en: 'BBMD concept: one BBMD per subnet, on a station or a separate device?',
					norm: 'Leitfaden 3.6.3'
				},
				{
					id: 'e1-bpat',
					title: 'BACnet-Administrator benannt und B-PAT als Adressverzeichnis eingeführt?',
					title_en: 'BACnet administrator named and B-PAT introduced as address register?',
					norm: 'Leitfaden 4.1, 5.1'
				},
				{
					id: 'e1-ikt',
					title: 'IKT-Sicherheitsvorgaben für die GA festgelegt?',
					title_en: 'ICT security requirements for BA defined?',
					hint: 'Siehe KBOB-Empfehlung IKT-Sicherheit 2025 und die Checkliste dazu.',
					hint_en: 'See KBOB recommendation ICT security 2025 and its checklist.',
					norm: 'KBOB IKT-Sicherheit 2025'
				}
			]
		}
	]
};
