import type { ReferenceTable } from '../types';

export const alarmRichtwerte: ReferenceTable = {
	slug: 'alarm-richtwerte',
	title: 'Alarm-Richtwerte GA',
	subtitle: 'Typische Alarmgrenzen und Verzögerungen in HVAC-Anlagen',
	category: 'Alarme',
	icon: 'bell',
	color: '#dc2626',
	areas: ['ga'],
	norm: ['EEMUA 191', 'ISA-18.2', 'VDI 3814-4', 'EN 54 (Brand)'],
	updated: '2026-05-15',
	description: 'Richtwerte für typische Alarmgrenzen und Einschaltverzögerungen in GA-Anlagen. Alle Werte sind Ausgangspunkte — im Projekt immer auf die konkreten Anlagenbedingungen anpassen.',
	columns: [
		{ key: 'datenpunkt', label: 'Datenpunkt / Messgrösse', highlight: true },
		{ key: 'grenze_hoch', label: 'Grenze oben', mono: true },
		{ key: 'grenze_tief', label: 'Grenze unten', mono: true },
		{ key: 'verzoegerung', label: 'Verzögerung', mono: true },
		{ key: 'prioritaet', label: 'Priorität', mono: true },
		{ key: 'bemerkung', label: 'Bemerkung' }
	],
	rows: [
		{ datenpunkt: 'Raumtemperatur Büro',            grenze_hoch: '> 26°C',    grenze_tief: '< 18°C',  verzoegerung: '10 min', prioritaet: 'Mittel',    bemerkung: 'Komfort-Alarm, kein Notfall' },
		{ datenpunkt: 'Raumtemperatur Serverraum',      grenze_hoch: '> 27°C',    grenze_tief: '< 16°C',  verzoegerung: '2 min',  prioritaet: 'Hoch',      bemerkung: 'Kritisch für IT-Infrastruktur' },
		{ datenpunkt: 'Vorlauftemperatur Heizung',      grenze_hoch: '> 85°C',    grenze_tief: '< 5°C',   verzoegerung: '30 s',   prioritaet: 'Hoch',      bemerkung: 'Frostschutz unten, Überhitzung oben' },
		{ datenpunkt: 'Frostschutz Lüftungsanlage',     grenze_hoch: '—',          grenze_tief: '< 3°C',   verzoegerung: '0 s',    prioritaet: 'Kritisch',  bemerkung: 'Sofortabschalten — Kein Frost-Delay!' },
		{ datenpunkt: 'Differenzdruck Filter',          grenze_hoch: '> 200 Pa',   grenze_tief: '—',       verzoegerung: '2 min',  prioritaet: 'Mittel',    bemerkung: 'Klassenabhängig: F7 ca. 150–250 Pa' },
		{ datenpunkt: 'CO₂ Büro',                       grenze_hoch: '> 1000 ppm', grenze_tief: '—',       verzoegerung: '5 min',  prioritaet: 'Mittel',    bemerkung: 'Pettenkofer-Grenzwert, Lüftungserhöhung' },
		{ datenpunkt: 'CO₂ (kritisch)',                 grenze_hoch: '> 1500 ppm', grenze_tief: '—',       verzoegerung: '2 min',  prioritaet: 'Hoch',      bemerkung: 'Schlechte Luft, Handlungsbedarf' },
		{ datenpunkt: 'Relative Feuchte Raum',          grenze_hoch: '> 65% rH',   grenze_tief: '< 25% rH', verzoegerung: '15 min', prioritaet: 'Mittel',   bemerkung: 'Schimmelrisiko oben, Trocknung unten' },
		{ datenpunkt: 'Systemdruck Heizung',            grenze_hoch: '> 3.5 bar',  grenze_tief: '< 1.0 bar', verzoegerung: '30 s', prioritaet: 'Hoch',      bemerkung: 'Leckage oder Überdruck' },
		{ datenpunkt: 'Kaltwassertemperatur VL',        grenze_hoch: '> 16°C',     grenze_tief: '< 4°C',   verzoegerung: '5 min',  prioritaet: 'Hoch',      bemerkung: 'Zu warm → Kühlung unzureichend, Frost' },
		{ datenpunkt: 'Motorschutz / Sammelstörung',    grenze_hoch: '—',           grenze_tief: 'Auslösung', verzoegerung: '0 s',  prioritaet: 'Kritisch',  bemerkung: 'Kein Delay — sofortiger Alarm' },
		{ datenpunkt: 'Betriebsrückmeldung fehlt',      grenze_hoch: '—',           grenze_tief: '—',       verzoegerung: '5–10 s', prioritaet: 'Hoch',     bemerkung: 'Soll=EIN, Rückmeldung=AUS nach Anlaufzeit' },
		{ datenpunkt: 'Kommunikation DDC ausgefallen',  grenze_hoch: '—',           grenze_tief: 'Timeout', verzoegerung: '30–60 s', prioritaet: 'Hoch',    bemerkung: 'Reboot-Toleranz: 30 s Minimum' },
		{ datenpunkt: 'Durchfluss Leckage',             grenze_hoch: 'Fluss ohne Pumpenanforderung', grenze_tief: '—', verzoegerung: '30 s', prioritaet: 'Kritisch', bemerkung: 'Rückschlagventil defekt oder Leckage' },
		{ datenpunkt: 'UPS-Batterie schwach',           grenze_hoch: '—',           grenze_tief: 'SOC < 20%', verzoegerung: '0 s', prioritaet: 'Hoch',      bemerkung: 'Zeitkritisch — frühzeitig warnen' },
		{ datenpunkt: 'Rauchalarm (BSK-Auslösung)',     grenze_hoch: '—',           grenze_tief: 'Auslösung', verzoegerung: '0 s',  prioritaet: 'Kritisch',  bemerkung: 'Integration Brandmeldeanlage — keine Verzögerung' }
	],
	notes: 'EEMUA 191 Richtwert: Max. 1 Alarm pro 10 Minuten im Normalbetrieb. Bei mehr als 10 Alarmen/10 min: Alarm-Rationalisation notwendig.'
};
