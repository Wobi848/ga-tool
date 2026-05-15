import type { ReferenceTable } from '../types';

export const daliGeraetetypen: ReferenceTable = {
	slug: 'dali-geraetetypen',
	title: 'DALI Gerätetypen (Device Types)',
	subtitle: 'DT 0–8 und DALI-2 Sensor-Parts — IEC 62386',
	category: 'Protokoll',
	icon: 'sun',
	color: '#d97706',
	areas: ['elektro', 'ga'],
	norm: ['IEC 62386-201…208 (Control Gear)', 'IEC 62386-301…304 (Control Devices)'],
	updated: '2026-05-15',
	description: 'DALI unterscheidet Control Gear (Betriebsgeräte, DT 0–8) und Control Devices (Eingabegeräte, Part 3xx). DALI-2 zertifiziert Interoperabilität zwischen Geräten verschiedener Hersteller.',
	columns: [
		{ key: 'dt', label: 'DT / Part', mono: true, highlight: true },
		{ key: 'name', label: 'Name' },
		{ key: 'norm', label: 'Norm', mono: true },
		{ key: 'beschreibung', label: 'Beschreibung' },
		{ key: 'einsatz', label: 'Typischer Einsatz' }
	],
	rows: [
		{ dt: 'DT 0', name: 'Fluorescent Lamps',       norm: 'IEC 62386-201', beschreibung: 'Dimmbare Leuchtstofflampen (T5, T8) mit EVG', einsatz: 'Büro, Industrie (legacy)' },
		{ dt: 'DT 1', name: 'Self-Contained Emergency', norm: 'IEC 62386-202', beschreibung: 'Notleuchten mit Einzelakkumulator', einsatz: 'Notbeleuchtung, Sicherheitsbeleuchtung' },
		{ dt: 'DT 2', name: 'Discharge Lamps',          norm: 'IEC 62386-203', beschreibung: 'HID-Lampen (Metalldampf, Natriumdampf)', einsatz: 'Aussenbeleuchtung, Hallen (legacy)' },
		{ dt: 'DT 3', name: 'Low Voltage Halogen',      norm: 'IEC 62386-204', beschreibung: 'Halogen-Niedervolt mit elektronischem Trafo', einsatz: 'Hotels, Retail (legacy)' },
		{ dt: 'DT 4', name: 'Incandescent Lamps',       norm: 'IEC 62386-205', beschreibung: 'Dimmbare Glühlampen', einsatz: 'Selten, legacy' },
		{ dt: 'DT 5', name: 'DC Voltage',               norm: 'IEC 62386-206', beschreibung: 'Gleichspannungs-Konverter für LED-Stripes', einsatz: 'LED-Stripes, indirektes Licht' },
		{ dt: 'DT 6', name: 'LED Gear',                 norm: 'IEC 62386-207', beschreibung: 'LED-Betriebsgeräte (Konstantstrom/-spannung)', einsatz: 'Standard-LED, häufigster DALI-Typ heute' },
		{ dt: 'DT 7', name: 'Switching Function',       norm: 'IEC 62386-208', beschreibung: 'Reines Schalten (kein Dimmen)', einsatz: 'Steckdosen, nicht-dimmbare Lasten' },
		{ dt: 'DT 8', name: 'Colour Control',           norm: 'IEC 62386-209', beschreibung: 'Farbsteuerung: RGBWAF, xy, Tc (Farbtemperatur)', einsatz: 'Tunable White, RGB, Human Centric Lighting' },
		{ dt: 'Part 301', name: 'Light Sensor',         norm: 'IEC 62386-301', beschreibung: 'Helligkeitssensor — liefert Lux-Wert', einsatz: 'Konstantlichtregelung' },
		{ dt: 'Part 302', name: 'Input Device (Generic)', norm: 'IEC 62386-302', beschreibung: 'Taster, Schnittstelle', einsatz: 'Bedientableaus, Schalter' },
		{ dt: 'Part 303', name: 'Occupancy Sensor',     norm: 'IEC 62386-303', beschreibung: 'Präsenzmelder — belegt/unbelegt', einsatz: 'Automatische Beleuchtungssteuerung' },
		{ dt: 'Part 304', name: 'Push Button',          norm: 'IEC 62386-304', beschreibung: 'Taster mit kurz/lang Unterscheidung', einsatz: 'Szenen-Bedienung, Dimmen' }
	],
	notes: 'DALI-2 Zertifizierung: Nur DT 6 (LED), DT 8 (Farbe) und DT 1 (Notlicht) sind in DALI-2 weit verbreitet. DALI-2 garantiert Interoperabilität auch zwischen verschiedenen Herstellern.'
};
