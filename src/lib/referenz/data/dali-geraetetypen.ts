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
	updated: '2026-05-15',
	description: 'DALI unterscheidet Control Gear (Betriebsgeräte, DT 0–8) und Control Devices (Eingabegeräte, Part 3xx). DALI-2 zertifiziert Interoperabilität zwischen Geräten verschiedener Hersteller.',
	description_en: 'DALI distinguishes Control Gear (ballasts/drivers, DT 0–8) and Control Devices (input devices, Part 3xx). DALI-2 certifies interoperability between devices from different manufacturers.',
	columns: [
		{ key: 'dt', label: 'DT / Part', mono: true, highlight: true },
		{ key: 'name', label: 'Name' },
		{ key: 'norm', label: 'Norm', mono: true },
		{ key: 'beschreibung', label: 'Beschreibung', label_en: 'Description' },
		{ key: 'einsatz', label: 'Typischer Einsatz', label_en: 'Typical Application' }
	],
	rows: [
		{ dt: 'DT 0', name: 'Fluorescent Lamps',         norm: 'IEC 62386-201', beschreibung: 'Dimmbare Leuchtstofflampen (T5, T8) mit EVG',           beschreibung_en: 'Dimmable fluorescent lamps (T5, T8) with electronic ballast', einsatz: 'Büro, Industrie (legacy)',                     einsatz_en: 'Office, industrial (legacy)' },
		{ dt: 'DT 1', name: 'Self-Contained Emergency',   norm: 'IEC 62386-202', beschreibung: 'Notleuchten mit Einzelakkumulator',                       beschreibung_en: 'Emergency luminaires with individual battery',                  einsatz: 'Notbeleuchtung, Sicherheitsbeleuchtung',      einsatz_en: 'Emergency lighting, safety lighting' },
		{ dt: 'DT 2', name: 'Discharge Lamps',            norm: 'IEC 62386-203', beschreibung: 'HID-Lampen (Metalldampf, Natriumdampf)',                  beschreibung_en: 'HID lamps (metal halide, sodium vapour)',                      einsatz: 'Aussenbeleuchtung, Hallen (legacy)',           einsatz_en: 'Outdoor lighting, halls (legacy)' },
		{ dt: 'DT 3', name: 'Low Voltage Halogen',        norm: 'IEC 62386-204', beschreibung: 'Halogen-Niedervolt mit elektronischem Trafo',             beschreibung_en: 'Low-voltage halogen with electronic transformer',              einsatz: 'Hotels, Retail (legacy)',                      einsatz_en: 'Hotels, retail (legacy)' },
		{ dt: 'DT 4', name: 'Incandescent Lamps',         norm: 'IEC 62386-205', beschreibung: 'Dimmbare Glühlampen',                                     beschreibung_en: 'Dimmable incandescent lamps',                                  einsatz: 'Selten, legacy',                               einsatz_en: 'Rare, legacy' },
		{ dt: 'DT 5', name: 'DC Voltage',                 norm: 'IEC 62386-206', beschreibung: 'Gleichspannungs-Konverter für LED-Stripes',               beschreibung_en: 'DC voltage converter for LED strips',                          einsatz: 'LED-Stripes, indirektes Licht',                einsatz_en: 'LED strips, indirect lighting' },
		{ dt: 'DT 6', name: 'LED Gear',                   norm: 'IEC 62386-207', beschreibung: 'LED-Betriebsgeräte (Konstantstrom/-spannung)',             beschreibung_en: 'LED drivers (constant current / constant voltage)',            einsatz: 'Standard-LED, häufigster DALI-Typ heute',     einsatz_en: 'Standard LED, most common DALI type today' },
		{ dt: 'DT 7', name: 'Switching Function',         norm: 'IEC 62386-208', beschreibung: 'Reines Schalten (kein Dimmen)',                            beschreibung_en: 'Switching only (no dimming)',                                  einsatz: 'Steckdosen, nicht-dimmbare Lasten',            einsatz_en: 'Sockets, non-dimmable loads' },
		{ dt: 'DT 8', name: 'Colour Control',             norm: 'IEC 62386-209', beschreibung: 'Farbsteuerung: RGBWAF, xy, Tc (Farbtemperatur)',           beschreibung_en: 'Colour control: RGBWAF, xy, Tc (colour temperature)',          einsatz: 'Tunable White, RGB, Human Centric Lighting',  einsatz_en: 'Tunable white, RGB, human centric lighting' },
		{ dt: 'Part 301', name: 'Light Sensor',           norm: 'IEC 62386-301', beschreibung: 'Helligkeitssensor — liefert Lux-Wert',                    beschreibung_en: 'Light sensor — provides lux value',                            einsatz: 'Konstantlichtregelung',                        einsatz_en: 'Constant light control' },
		{ dt: 'Part 302', name: 'Input Device (Generic)', norm: 'IEC 62386-302', beschreibung: 'Taster, Schnittstelle',                                   beschreibung_en: 'Push button, interface',                                        einsatz: 'Bedientableaus, Schalter',                     einsatz_en: 'Control panels, switches' },
		{ dt: 'Part 303', name: 'Occupancy Sensor',       norm: 'IEC 62386-303', beschreibung: 'Präsenzmelder — belegt/unbelegt',                          beschreibung_en: 'Presence detector — occupied / unoccupied',                    einsatz: 'Automatische Beleuchtungssteuerung',           einsatz_en: 'Automatic lighting control' },
		{ dt: 'Part 304', name: 'Push Button',            norm: 'IEC 62386-304', beschreibung: 'Taster mit kurz/lang Unterscheidung',                      beschreibung_en: 'Push button with short/long press distinction',                einsatz: 'Szenen-Bedienung, Dimmen',                     einsatz_en: 'Scene control, dimming' }
	],
	notes: 'DALI-2 Zertifizierung: Nur DT 6 (LED), DT 8 (Farbe) und DT 1 (Notlicht) sind in DALI-2 weit verbreitet. DALI-2 garantiert Interoperabilität auch zwischen verschiedenen Herstellern.',
	notes_en: 'DALI-2 certification: Only DT 6 (LED), DT 8 (colour) and DT 1 (emergency) are widely used in DALI-2. DALI-2 guarantees interoperability even between different manufacturers.'
};
