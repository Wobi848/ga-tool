import type { ReferenceTable } from '../types';

export const bacnetObjekte: ReferenceTable = {
	slug: 'bacnet-objekte',
	title: 'BACnet Objekttypen',
	title_en: 'BACnet Object Types',
	subtitle: 'Standard-Objekte nach ASHRAE 135 / ISO 16484-5',
	subtitle_en: 'Standard objects per ASHRAE 135 / ISO 16484-5',
	category: 'Protokoll',
	icon: 'layers',
	color: '#1d4ed8',
	areas: ['ga', 'it'],
	norm: ['ASHRAE 135-2020', 'ISO 16484-5', 'EN ISO 16484-5'],
	updated: '2026-05-15',
	description:
		'Häufig verwendete BACnet-Objekttypen in GA-Anlagen. Jeder Datenpunkt wird als BACnet-Objekt mit Eigenschaften (Properties) dargestellt. Present_Value ist der primäre Messwert/Sollwert.',
	description_en:
		'Commonly used BACnet object types in BA systems. Each data point is represented as a BACnet object with properties. Present_Value is the primary measured value / setpoint.',
	columns: [
		{ key: 'abk', label: 'Kürzel', label_en: 'Abbrev.', mono: true, highlight: true },
		{ key: 'typ', label: 'Objekttyp', label_en: 'Object Type' },
		{ key: 'id', label: 'Object-Type ID', type: 'number', mono: true },
		{ key: 'pv_typ', label: 'Present_Value Typ', label_en: 'Present_Value Type' },
		{ key: 'rw', label: 'Schreibbar', label_en: 'Writable', mono: true },
		{ key: 'einsatz', label: 'Typischer Einsatz', label_en: 'Typical Use' }
	],
	rows: [
		{
			abk: 'AI',
			typ: 'Analog Input',
			id: 0,
			pv_typ: 'REAL (Float)',
			rw: 'Nein',
			rw_en: 'No',
			einsatz: 'Messwert von Sensor (Temperatur, Druck, Feuchte)',
			einsatz_en: 'Sensor measured value (temperature, pressure, humidity)'
		},
		{
			abk: 'AO',
			typ: 'Analog Output',
			id: 1,
			pv_typ: 'REAL (Float)',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Stellgrösse (Ventilstellung, Drehzahl)',
			einsatz_en: 'Control output (valve position, speed)'
		},
		{
			abk: 'AV',
			typ: 'Analog Value',
			id: 2,
			pv_typ: 'REAL (Float)',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Sollwert, berechneter Wert (kein physisches Signal)',
			einsatz_en: 'Setpoint, calculated value (no physical signal)'
		},
		{
			abk: 'BI',
			typ: 'Binary Input',
			id: 3,
			pv_typ: 'ACTIVE/INACTIVE',
			rw: 'Nein',
			rw_en: 'No',
			einsatz: 'Digitaler Eingang (Betriebsrückmeldung, Störung)',
			einsatz_en: 'Digital input (run feedback, fault)'
		},
		{
			abk: 'BO',
			typ: 'Binary Output',
			id: 4,
			pv_typ: 'ACTIVE/INACTIVE',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Digitaler Ausgang (Pumpe EIN/AUS, Ventil AUF/ZU)',
			einsatz_en: 'Digital output (pump ON/OFF, valve OPEN/CLOSE)'
		},
		{
			abk: 'BV',
			typ: 'Binary Value',
			id: 5,
			pv_typ: 'ACTIVE/INACTIVE',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Logisches Flag (Freigabe, Status, Mode)',
			einsatz_en: 'Logical flag (enable, status, mode)'
		},
		{
			abk: 'MSI',
			typ: 'Multi-State Input',
			id: 13,
			pv_typ: 'Uint (1..N)',
			rw: 'Nein',
			rw_en: 'No',
			einsatz: 'Status mit mehreren Zuständen (Betriebsart: 1=Hand, 2=Auto, 3=Aus)',
			einsatz_en: 'Multi-state status (operating mode: 1=Manual, 2=Auto, 3=Off)'
		},
		{
			abk: 'MSO',
			typ: 'Multi-State Output',
			id: 14,
			pv_typ: 'Uint (1..N)',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Schreibbarer Mehrfachstatus (Betriebsart setzen)',
			einsatz_en: 'Writable multi-state (set operating mode)'
		},
		{
			abk: 'MSV',
			typ: 'Multi-State Value',
			id: 19,
			pv_typ: 'Uint (1..N)',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Allgemeiner Status-Wert (ohne physischen Ausgang)',
			einsatz_en: 'General status value (no physical output)'
		},
		{
			abk: 'TL',
			typ: 'Trend Log',
			id: 20,
			pv_typ: 'Log-Records',
			rw: 'Nein',
			rw_en: 'No',
			einsatz: 'Historisierung: Aufzeichnung von Wertverläufen',
			einsatz_en: 'Historisation: recording of value trends'
		},
		{
			abk: 'SCH',
			typ: 'Schedule',
			id: 17,
			pv_typ: 'Zeitplan',
			pv_typ_en: 'Schedule',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Zeitprogramm: Wochenprogramm, Schaltzeiten',
			einsatz_en: 'Time program: weekly schedule, switch times'
		},
		{
			abk: 'CAL',
			typ: 'Calendar',
			id: 6,
			pv_typ: 'Datumsliste',
			pv_typ_en: 'Date list',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Kalender: Sondertage, Feiertage',
			einsatz_en: 'Calendar: special days, public holidays'
		},
		{
			abk: 'EV',
			typ: 'Event Enrollment',
			id: 7,
			pv_typ: 'Event-Config',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Alarmkonfiguration: Grenzwerte, Priorität, Empfänger',
			einsatz_en: 'Alarm configuration: limits, priority, recipients'
		},
		{
			abk: 'NC',
			typ: 'Notification Class',
			id: 15,
			pv_typ: 'Priority-Array',
			rw: 'Ja',
			rw_en: 'Yes',
			einsatz: 'Alarm-Weiterleitung: Empfänger, Priorität, Transition',
			einsatz_en: 'Alarm forwarding: recipients, priority, transitions'
		},
		{
			abk: 'DEV',
			typ: 'Device',
			id: 8,
			pv_typ: 'Geräteobjekt',
			pv_typ_en: 'Device object',
			rw: 'Teilw.',
			rw_en: 'Partial',
			einsatz: 'Geräte-Identität: Device-ID, Vendor, Model, Firmware',
			einsatz_en: 'Device identity: device ID, vendor, model, firmware'
		}
	],
	notes:
		'BACnet Prioritäts-Array (16 Stufen): Priority 1 (höchste) = Manual Life Safety, Priority 8 = Manual Operator, Priority 16 (niedrigste) = Default. Schreibzugriffe höherer Priorität überschreiben niedrigere.',
	notes_en:
		'BACnet Priority Array (16 levels): Priority 1 (highest) = Manual Life Safety, Priority 8 = Manual Operator, Priority 16 (lowest) = Default. Higher-priority writes override lower-priority ones.'
};
