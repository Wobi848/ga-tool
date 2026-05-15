import type { ReferenceTable } from '../types';

export const bacnetObjekte: ReferenceTable = {
	slug: 'bacnet-objekte',
	title: 'BACnet Objekttypen',
	subtitle: 'Standard-Objekte nach ASHRAE 135 / ISO 16484-5',
	category: 'Protokoll',
	icon: 'layers',
	color: '#1d4ed8',
	areas: ['ga', 'it'],
	norm: ['ASHRAE 135-2020', 'ISO 16484-5', 'EN ISO 16484-5'],
	updated: '2026-05-15',
	description: 'Häufig verwendete BACnet-Objekttypen in GA-Anlagen. Jeder Datenpunkt wird als BACnet-Objekt mit Eigenschaften (Properties) dargestellt. Present_Value ist der primäre Messwert/Sollwert.',
	columns: [
		{ key: 'abk', label: 'Kürzel', mono: true, highlight: true },
		{ key: 'typ', label: 'Objekttyp' },
		{ key: 'id', label: 'Object-Type ID', type: 'number', mono: true },
		{ key: 'pv_typ', label: 'Present_Value Typ' },
		{ key: 'rw', label: 'Schreibbar', mono: true },
		{ key: 'einsatz', label: 'Typischer Einsatz' }
	],
	rows: [
		{ abk: 'AI',  typ: 'Analog Input',          id: 0,  pv_typ: 'REAL (Float)',  rw: 'Nein', einsatz: 'Messwert von Sensor (Temperatur, Druck, Feuchte)' },
		{ abk: 'AO',  typ: 'Analog Output',         id: 1,  pv_typ: 'REAL (Float)',  rw: 'Ja',   einsatz: 'Stellgrösse (Ventilstellung, Drehzahl)' },
		{ abk: 'AV',  typ: 'Analog Value',          id: 2,  pv_typ: 'REAL (Float)',  rw: 'Ja',   einsatz: 'Sollwert, berechneter Wert (kein physisches Signal)' },
		{ abk: 'BI',  typ: 'Binary Input',          id: 3,  pv_typ: 'ACTIVE/INACTIVE', rw: 'Nein', einsatz: 'Digitaler Eingang (Betriebsrückmeldung, Störung)' },
		{ abk: 'BO',  typ: 'Binary Output',         id: 4,  pv_typ: 'ACTIVE/INACTIVE', rw: 'Ja',   einsatz: 'Digitaler Ausgang (Pumpe EIN/AUS, Ventil AUF/ZU)' },
		{ abk: 'BV',  typ: 'Binary Value',          id: 5,  pv_typ: 'ACTIVE/INACTIVE', rw: 'Ja',   einsatz: 'Logisches Flag (Freigabe, Status, Mode)' },
		{ abk: 'MSI', typ: 'Multi-State Input',     id: 13, pv_typ: 'Uint (1..N)',   rw: 'Nein', einsatz: 'Status mit mehreren Zuständen (Betriebsart: 1=Hand, 2=Auto, 3=Aus)' },
		{ abk: 'MSO', typ: 'Multi-State Output',    id: 14, pv_typ: 'Uint (1..N)',   rw: 'Ja',   einsatz: 'Schreibbarer Mehrfachstatus (Betriebsart setzen)' },
		{ abk: 'MSV', typ: 'Multi-State Value',     id: 19, pv_typ: 'Uint (1..N)',   rw: 'Ja',   einsatz: 'Allgemeiner Status-Wert (ohne physischen Ausgang)' },
		{ abk: 'TL',  typ: 'Trend Log',             id: 20, pv_typ: 'Log-Records',   rw: 'Nein', einsatz: 'Historisierung: Aufzeichnung von Wertverläufen' },
		{ abk: 'SCH', typ: 'Schedule',              id: 17, pv_typ: 'Zeitplan',      rw: 'Ja',   einsatz: 'Zeitprogramm: Wochenprogramm, Schaltzeiten' },
		{ abk: 'CAL', typ: 'Calendar',              id: 6,  pv_typ: 'Datumsliste',   rw: 'Ja',   einsatz: 'Kalender: Sondertage, Feiertage' },
		{ abk: 'EV',  typ: 'Event Enrollment',      id: 7,  pv_typ: 'Event-Config',  rw: 'Ja',   einsatz: 'Alarmkonfiguration: Grenzwerte, Priorität, Empfänger' },
		{ abk: 'NC',  typ: 'Notification Class',    id: 15, pv_typ: 'Priority-Array', rw: 'Ja',  einsatz: 'Alarm-Weiterleitung: Empfänger, Priorität, Transition' },
		{ abk: 'DEV', typ: 'Device',                id: 8,  pv_typ: 'Geräteobjekt',  rw: 'Teilw.', einsatz: 'Geräte-Identität: Device-ID, Vendor, Model, Firmware' }
	],
	notes: 'BACnet Prioritäts-Array (16 Stufen): Priority 1 (höchste) = Manual Life Safety, Priority 8 = Manual Operator, Priority 16 (niedrigste) = Default. Schreibzugriffe höherer Priorität überschreiben niedrigere.'
};
