import type { ReferenceTable } from '../types';

export const ipSchutz: ReferenceTable = {
	slug: 'ip-schutz',
	title: 'IP-Schutzarten',
	title_en: 'IP Protection Ratings',
	subtitle: 'Berührungs-, Fremdkörper- und Wasserschutz nach IEC 60529',
	subtitle_en: 'Contact, foreign body and water protection per IEC 60529',
	category: 'Elektro',
	icon: 'shield',
	color: '#dc2626',
	areas: ['elektro', 'normen'],
	norm: ['IEC 60529', 'EN 60529'],
	updated: '2026-05-14',
	description: 'Erste Ziffer = Schutz gegen Berührung und Fremdkörper. Zweite Ziffer = Schutz gegen Wasser. Beispiel IP65 = staubdicht + Strahlwasser.',
	description_en: 'First digit = protection against contact and foreign bodies. Second digit = protection against water. Example IP65 = dust-tight + jet water.',
	columns: [
		{ key: 'code', label: 'Code', mono: true, highlight: true },
		{ key: 'first', label: 'Fremdkörperschutz (1. Ziffer)', label_en: 'Foreign Body Protection (1st digit)' },
		{ key: 'second', label: 'Wasserschutz (2. Ziffer)', label_en: 'Water Protection (2nd digit)' },
		{ key: 'use', label: 'Typische Anwendung', label_en: 'Typical Application' }
	],
	rows: [
		{ code: 'IP20', first: 'Finger > 12.5 mm',    first_en: 'Finger > 12.5 mm',    second: 'kein',                           second_en: 'none',                              use: 'Innenelektronik, Verteiler im Raum',      use_en: 'Indoor electronics, distribution board in room' },
		{ code: 'IP21', first: 'Finger > 12.5 mm',    first_en: 'Finger > 12.5 mm',    second: 'Tropfwasser vertikal',           second_en: 'vertically dripping water',         use: 'Verteilerschrank Innen',                  use_en: 'Indoor distribution cabinet' },
		{ code: 'IP44', first: 'Werkzeug > 1 mm',     first_en: 'Tool > 1 mm',          second: 'Spritzwasser',                   second_en: 'splash water',                      use: 'Bad/Aussen geschützt',                    use_en: 'Bathroom / sheltered outdoor' },
		{ code: 'IP54', first: 'Staubgeschützt',      first_en: 'Dust-protected',        second: 'Spritzwasser',                   second_en: 'splash water',                      use: 'Standard Aussenbereich',                  use_en: 'Standard outdoor area' },
		{ code: 'IP55', first: 'Staubgeschützt',      first_en: 'Dust-protected',        second: 'Strahlwasser',                   second_en: 'water jets',                        use: 'Industrielle Aussenbereiche',             use_en: 'Industrial outdoor areas' },
		{ code: 'IP65', first: 'Staubdicht',          first_en: 'Dust-tight',            second: 'Strahlwasser',                   second_en: 'water jets',                        use: 'LED-Strahler aussen, Pumpenkasten',       use_en: 'Outdoor LED spotlight, pump enclosure' },
		{ code: 'IP66', first: 'Staubdicht',          first_en: 'Dust-tight',            second: 'Starkes Strahlwasser',           second_en: 'powerful water jets',               use: 'Schiffsbau, exponiert',                   use_en: 'Shipbuilding, exposed locations' },
		{ code: 'IP67', first: 'Staubdicht',          first_en: 'Dust-tight',            second: 'Zeitweises Untertauchen',        second_en: 'temporary immersion',               use: 'Bodenleuchten, Outdoor-Sensoren',         use_en: 'Ground luminaires, outdoor sensors' },
		{ code: 'IP68', first: 'Staubdicht',          first_en: 'Dust-tight',            second: 'Dauerndes Untertauchen',         second_en: 'continuous immersion',              use: 'Brunnenpumpen, Unterwasser',              use_en: 'Well pumps, underwater' },
		{ code: 'IP69', first: 'Staubdicht',          first_en: 'Dust-tight',            second: 'Hochdruck-/Hochtemp.-Reinigung', second_en: 'high-pressure/high-temperature wash', use: 'Lebensmittelindustrie',                 use_en: 'Food industry' }
	],
	notes: 'Häufige Verwechslung: IP44 (Spritzwasser) genügt NICHT für strahlende Reinigung. Für direkten Aussenbereich mindestens IP54, besser IP65.',
	notes_en: 'Common confusion: IP44 (splash water) is NOT sufficient for jet cleaning. For direct outdoor use, minimum IP54, preferably IP65.'
};
