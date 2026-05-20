import type { ReferenceTable } from '../types';

export const alarmRichtwerte: ReferenceTable = {
	slug: 'alarm-richtwerte',
	title: 'Alarm-Richtwerte GA',
	title_en: 'BA Alarm Reference Values',
	subtitle: 'Typische Alarmgrenzen und Verzögerungen in HVAC-Anlagen',
	subtitle_en: 'Typical alarm limits and delays in HVAC systems',
	category: 'Alarme',
	icon: 'bell',
	color: '#dc2626',
	areas: ['ga'],
	norm: ['EEMUA 191', 'ISA-18.2', 'VDI 3814-4', 'EN 54 (Brand)'],
	updated: '2026-05-15',
	description: 'Richtwerte für typische Alarmgrenzen und Einschaltverzögerungen in GA-Anlagen. Alle Werte sind Ausgangspunkte — im Projekt immer auf die konkreten Anlagenbedingungen anpassen.',
	description_en: 'Reference values for typical alarm limits and on-delays in BA systems. All values are starting points — always adapt to the specific system conditions in each project.',
	columns: [
		{ key: 'datenpunkt', label: 'Datenpunkt / Messgrösse', label_en: 'Data Point / Measured Variable', highlight: true },
		{ key: 'grenze_hoch', label: 'Grenze oben', label_en: 'Upper Limit', mono: true },
		{ key: 'grenze_tief', label: 'Grenze unten', label_en: 'Lower Limit', mono: true },
		{ key: 'verzoegerung', label: 'Verzögerung', label_en: 'Delay', mono: true },
		{ key: 'prioritaet', label: 'Priorität', label_en: 'Priority', mono: true },
		{ key: 'bemerkung', label: 'Bemerkung', label_en: 'Notes' }
	],
	rows: [
		{ datenpunkt: 'Raumtemperatur Büro',            datenpunkt_en: 'Room temperature office',          grenze_hoch: '> 26°C',    grenze_tief: '< 18°C',  verzoegerung: '10 min', prioritaet: 'Mittel',    prioritaet_en: 'Medium',   bemerkung: 'Komfort-Alarm, kein Notfall',                              bemerkung_en: 'Comfort alarm, not an emergency' },
		{ datenpunkt: 'Raumtemperatur Serverraum',      datenpunkt_en: 'Room temperature server room',      grenze_hoch: '> 27°C',    grenze_tief: '< 16°C',  verzoegerung: '2 min',  prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Kritisch für IT-Infrastruktur',                            bemerkung_en: 'Critical for IT infrastructure' },
		{ datenpunkt: 'Vorlauftemperatur Heizung',      datenpunkt_en: 'Heating flow temperature',          grenze_hoch: '> 85°C',    grenze_tief: '< 5°C',   verzoegerung: '30 s',   prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Frostschutz unten, Überhitzung oben',                     bemerkung_en: 'Frost protection low, overheating high' },
		{ datenpunkt: 'Frostschutz Lüftungsanlage',     datenpunkt_en: 'AHU frost protection',              grenze_hoch: '—',          grenze_tief: '< 3°C',   verzoegerung: '0 s',    prioritaet: 'Kritisch',  prioritaet_en: 'Critical', bemerkung: 'Sofortabschalten — Kein Frost-Delay!',                    bemerkung_en: 'Immediate shutdown — no frost delay!' },
		{ datenpunkt: 'Differenzdruck Filter',          datenpunkt_en: 'Filter differential pressure',      grenze_hoch: '> 200 Pa',   grenze_tief: '—',       verzoegerung: '2 min',  prioritaet: 'Mittel',    prioritaet_en: 'Medium',   bemerkung: 'Klassenabhängig: F7 ca. 150–250 Pa',                      bemerkung_en: 'Class-dependent: F7 approx. 150–250 Pa' },
		{ datenpunkt: 'CO₂ Büro',                       datenpunkt_en: 'CO₂ office',                        grenze_hoch: '> 1000 ppm', grenze_tief: '—',       verzoegerung: '5 min',  prioritaet: 'Mittel',    prioritaet_en: 'Medium',   bemerkung: 'Pettenkofer-Grenzwert, Lüftungserhöhung',                 bemerkung_en: 'Pettenkofer limit, increase ventilation' },
		{ datenpunkt: 'CO₂ (kritisch)',                 datenpunkt_en: 'CO₂ (critical)',                    grenze_hoch: '> 1500 ppm', grenze_tief: '—',       verzoegerung: '2 min',  prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Schlechte Luft, Handlungsbedarf',                         bemerkung_en: 'Poor air quality, action required' },
		{ datenpunkt: 'Relative Feuchte Raum',          datenpunkt_en: 'Relative humidity room',            grenze_hoch: '> 65% rH',   grenze_tief: '< 25% rH', verzoegerung: '15 min', prioritaet: 'Mittel',   prioritaet_en: 'Medium',   bemerkung: 'Schimmelrisiko oben, Trocknung unten',                    bemerkung_en: 'Mould risk high, drying risk low' },
		{ datenpunkt: 'Systemdruck Heizung',            datenpunkt_en: 'Heating system pressure',           grenze_hoch: '> 3.5 bar',  grenze_tief: '< 1.0 bar', verzoegerung: '30 s', prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Leckage oder Überdruck',                                  bemerkung_en: 'Leakage or overpressure' },
		{ datenpunkt: 'Kaltwassertemperatur VL',        datenpunkt_en: 'Chilled water supply temperature',  grenze_hoch: '> 16°C',     grenze_tief: '< 4°C',   verzoegerung: '5 min',  prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Zu warm → Kühlung unzureichend, Frost',                   bemerkung_en: 'Too warm → cooling insufficient, frost risk' },
		{ datenpunkt: 'Motorschutz / Sammelstörung',    datenpunkt_en: 'Motor protection / collective fault', grenze_hoch: '—',         grenze_tief: 'Auslösung', grenze_tief_en: 'Trip', verzoegerung: '0 s', prioritaet: 'Kritisch',  prioritaet_en: 'Critical', bemerkung: 'Kein Delay — sofortiger Alarm',                           bemerkung_en: 'No delay — immediate alarm' },
		{ datenpunkt: 'Betriebsrückmeldung fehlt',      datenpunkt_en: 'Run feedback missing',              grenze_hoch: '—',           grenze_tief: '—',       verzoegerung: '5–10 s', prioritaet: 'Hoch',     prioritaet_en: 'High',     bemerkung: 'Soll=EIN, Rückmeldung=AUS nach Anlaufzeit',               bemerkung_en: 'Command=ON, feedback=OFF after start delay' },
		{ datenpunkt: 'Kommunikation DDC ausgefallen',  datenpunkt_en: 'DDC communication failed',          grenze_hoch: '—',           grenze_tief: 'Timeout', verzoegerung: '30–60 s', prioritaet: 'Hoch',    prioritaet_en: 'High',     bemerkung: 'Reboot-Toleranz: 30 s Minimum',                           bemerkung_en: 'Reboot tolerance: 30 s minimum' },
		{ datenpunkt: 'Durchfluss Leckage',             datenpunkt_en: 'Flow leakage',                      grenze_hoch: 'Fluss ohne Pumpenanforderung', grenze_hoch_en: 'Flow without pump demand', grenze_tief: '—', verzoegerung: '30 s', prioritaet: 'Kritisch', prioritaet_en: 'Critical', bemerkung: 'Rückschlagventil defekt oder Leckage',                    bemerkung_en: 'Check valve defective or leakage' },
		{ datenpunkt: 'UPS-Batterie schwach',           datenpunkt_en: 'UPS battery low',                   grenze_hoch: '—',           grenze_tief: 'SOC < 20%', verzoegerung: '0 s', prioritaet: 'Hoch',      prioritaet_en: 'High',     bemerkung: 'Zeitkritisch — frühzeitig warnen',                        bemerkung_en: 'Time-critical — warn early' },
		{ datenpunkt: 'Rauchalarm (BSK-Auslösung)',     datenpunkt_en: 'Smoke alarm (fire damper trip)',     grenze_hoch: '—',           grenze_tief: 'Auslösung', grenze_tief_en: 'Trip', verzoegerung: '0 s', prioritaet: 'Kritisch',  prioritaet_en: 'Critical', bemerkung: 'Integration Brandmeldeanlage — keine Verzögerung',         bemerkung_en: 'Fire alarm integration — no delay' }
	],
	notes: 'EEMUA 191 Richtwert: Max. 1 Alarm pro 10 Minuten im Normalbetrieb. Bei mehr als 10 Alarmen/10 min: Alarm-Rationalisation notwendig.',
	notes_en: 'EEMUA 191 guideline: max. 1 alarm per 10 minutes during normal operation. More than 10 alarms/10 min: alarm rationalisation required.'
};
