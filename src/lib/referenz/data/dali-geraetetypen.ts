import type { ReferenceTable } from '../types';

export const daliGeraetetypen: ReferenceTable = {
	slug: 'dali-geraetetypen',
	title: 'DALI Gerätetypen (Device Types)',
	title_en: 'DALI Device Types',
	subtitle: 'DT 0–8 und DALI-2 Sensor-Parts — IEC 62386',
	subtitle_en: 'DT 0–8 and DALI-2 sensor parts — IEC 62386',
	category: 'Protokoll',
	icon: 'sun',
	color: '#d97706',
	areas: ['elektro', 'ga'],
	norm: ['IEC 62386-201…208 (Control Gear)', 'IEC 62386-301…304 (Control Devices)'],
	updated: '2026-10-14',
	description:
		'DALI unterscheidet Control Gear (Betriebsgeräte, DT 0–8) und Control Devices (Eingabegeräte, Part 3xx). DALI-2 zertifiziert Interoperabilität zwischen Geräten verschiedener Hersteller.',
	description_en:
		'DALI distinguishes Control Gear (ballasts/drivers, DT 0–8) and Control Devices (input devices, Part 3xx). DALI-2 certifies interoperability between devices from different manufacturers.',
	columns: [
		{ key: 'dt', label: 'DT / Part', mono: true, highlight: true },
		{ key: 'name', label: 'Name' },
		{ key: 'norm', label: 'Norm', mono: true },
		{ key: 'beschreibung', label: 'Beschreibung', label_en: 'Description' },
		{ key: 'einsatz', label: 'Typischer Einsatz', label_en: 'Typical Application' }
	],
	rows: [
		{
			dt: 'DT 0',
			name: 'Fluorescent Lamps',
			norm: 'IEC 62386-201',
			beschreibung: 'Dimmbare Leuchtstofflampen (T5, T8) mit EVG',
			beschreibung_en: 'Dimmable fluorescent lamps (T5, T8) with electronic ballast',
			einsatz: 'Büro, Industrie (legacy)',
			einsatz_en: 'Office, industrial (legacy)'
		},
		{
			dt: 'DT 1',
			name: 'Self-Contained Emergency',
			norm: 'IEC 62386-202',
			beschreibung: 'Notleuchten mit Einzelakkumulator',
			beschreibung_en: 'Emergency luminaires with individual battery',
			einsatz: 'Notbeleuchtung, Sicherheitsbeleuchtung',
			einsatz_en: 'Emergency lighting, safety lighting'
		},
		{
			dt: 'DT 2',
			name: 'Discharge Lamps',
			norm: 'IEC 62386-203',
			beschreibung: 'HID-Lampen (Metalldampf, Natriumdampf)',
			beschreibung_en: 'HID lamps (metal halide, sodium vapour)',
			einsatz: 'Aussenbeleuchtung, Hallen (legacy)',
			einsatz_en: 'Outdoor lighting, halls (legacy)'
		},
		{
			dt: 'DT 3',
			name: 'Low Voltage Halogen',
			norm: 'IEC 62386-204',
			beschreibung: 'Halogen-Niedervolt mit elektronischem Trafo',
			beschreibung_en: 'Low-voltage halogen with electronic transformer',
			einsatz: 'Hotels, Retail (legacy)',
			einsatz_en: 'Hotels, retail (legacy)'
		},
		{
			dt: 'DT 4',
			name: 'Incandescent Lamps',
			norm: 'IEC 62386-205',
			beschreibung: 'Dimmbare Glühlampen',
			beschreibung_en: 'Dimmable incandescent lamps',
			einsatz: 'Selten, legacy',
			einsatz_en: 'Rare, legacy'
		},
		{
			dt: 'DT 5',
			name: 'Conversion to DC Voltage',
			norm: 'IEC 62386-206',
			beschreibung: 'Umsetzer von DALI auf ein 1–10-V-Steuersignal',
			beschreibung_en: 'Converter from DALI to a 1–10 V control signal',
			einsatz: 'Ansteuerung von Geräten mit 1–10-V-Eingang',
			einsatz_en: 'Driving devices with a 1–10 V input'
		},
		{
			dt: 'DT 6',
			name: 'LED Gear',
			norm: 'IEC 62386-207',
			beschreibung: 'LED-Betriebsgeräte (Konstantstrom/-spannung)',
			beschreibung_en: 'LED drivers (constant current / constant voltage)',
			einsatz: 'Standard-LED, häufigster DALI-Typ heute',
			einsatz_en: 'Standard LED, most common DALI type today'
		},
		{
			dt: 'DT 7',
			name: 'Switching Function',
			norm: 'IEC 62386-208',
			beschreibung: 'Reines Schalten (kein Dimmen)',
			beschreibung_en: 'Switching only (no dimming)',
			einsatz: 'Steckdosen, nicht-dimmbare Lasten',
			einsatz_en: 'Sockets, non-dimmable loads'
		},
		{
			dt: 'DT 8',
			name: 'Colour Control',
			norm: 'IEC 62386-209',
			beschreibung: 'Farbsteuerung: RGBWAF, xy, Tc (Farbtemperatur)',
			beschreibung_en: 'Colour control: RGBWAF, xy, Tc (colour temperature)',
			einsatz: 'Tunable White, RGB, Human Centric Lighting',
			einsatz_en: 'Tunable white, RGB, human centric lighting'
		},
		{
			dt: 'Part 301',
			name: 'Push Buttons',
			norm: 'IEC 62386-301',
			beschreibung: 'Taster, mit kurzem und langem Druck',
			beschreibung_en: 'Push buttons, with short and long press',
			einsatz: 'Bedienung, Szenen, Dimmen',
			einsatz_en: 'Operation, scenes, dimming'
		},
		{
			dt: 'Part 302',
			name: 'Absolute Input Devices',
			norm: 'IEC 62386-302',
			beschreibung: 'Schalter und Stellungsgeber mit festem Zustand',
			beschreibung_en: 'Switches and position inputs with a fixed state',
			einsatz: 'Schalter, Drehsteller, Kontakte',
			einsatz_en: 'Switches, rotary controls, contacts'
		},
		{
			dt: 'Part 303',
			name: 'Occupancy Sensors',
			norm: 'IEC 62386-303',
			beschreibung: 'Präsenz- und Bewegungsmelder, belegt/unbelegt',
			beschreibung_en: 'Presence and motion detectors, occupied / unoccupied',
			einsatz: 'Automatische Beleuchtungssteuerung',
			einsatz_en: 'Automatic lighting control'
		},
		{
			dt: 'Part 304',
			name: 'Light Sensors',
			norm: 'IEC 62386-304',
			beschreibung: 'Helligkeitssensor, liefert einen Lux-Wert',
			beschreibung_en: 'Light sensor, provides a lux value',
			einsatz: 'Konstantlichtregelung',
			einsatz_en: 'Constant light control'
		}
	],
	notes:
		'Eingabegeräte nach Part 3xx brauchen einen Application Controller nach Part 103. Heute sind vor allem DT 6 (LED), DT 8 (Farbe) und DT 1 (Notlicht) verbreitet. Die DALI-2-Zertifizierung der DiiA prüft die Interoperabilität zwischen Herstellern.',
	notes_en:
		'Input devices per Part 3xx need an application controller per Part 103. Today mainly DT 6 (LED), DT 8 (colour) and DT 1 (emergency) are common. DALI-2 certification by the DiiA tests interoperability between manufacturers.'
};
