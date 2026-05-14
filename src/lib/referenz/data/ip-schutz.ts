import type { ReferenceTable } from '../types';

export const ipSchutz: ReferenceTable = {
	slug: 'ip-schutz',
	title: 'IP-Schutzarten',
	subtitle: 'Berührungs-, Fremdkörper- und Wasserschutz nach IEC 60529',
	category: 'Elektro',
	icon: 'shield',
	color: '#dc2626',
	areas: ['elektro', 'normen'],
	norm: ['IEC 60529', 'EN 60529'],
	updated: '2026-05-14',
	description: 'Erste Ziffer = Schutz gegen Berührung und Fremdkörper. Zweite Ziffer = Schutz gegen Wasser. Beispiel IP65 = staubdicht + Strahlwasser.',
	columns: [
		{ key: 'code', label: 'Code', mono: true, highlight: true },
		{ key: 'first', label: 'Fremdkörperschutz (1. Ziffer)' },
		{ key: 'second', label: 'Wasserschutz (2. Ziffer)' },
		{ key: 'use', label: 'Typische Anwendung' }
	],
	rows: [
		{ code: 'IP20', first: 'Finger > 12.5 mm',    second: 'kein',                       use: 'Innenelektronik, Verteiler im Raum' },
		{ code: 'IP21', first: 'Finger > 12.5 mm',    second: 'Tropfwasser vertikal',       use: 'Verteilerschrank Innen' },
		{ code: 'IP44', first: 'Werkzeug > 1 mm',     second: 'Spritzwasser',               use: 'Bad/Aussen geschützt' },
		{ code: 'IP54', first: 'Staubgeschützt',      second: 'Spritzwasser',               use: 'Standard Aussenbereich' },
		{ code: 'IP55', first: 'Staubgeschützt',      second: 'Strahlwasser',               use: 'Industrielle Aussenbereiche' },
		{ code: 'IP65', first: 'Staubdicht',          second: 'Strahlwasser',               use: 'LED-Strahler aussen, Pumpenkasten' },
		{ code: 'IP66', first: 'Staubdicht',          second: 'Starkes Strahlwasser',       use: 'Schiffsbau, exponiert' },
		{ code: 'IP67', first: 'Staubdicht',          second: 'Zeitweises Untertauchen',    use: 'Bodenleuchten, Outdoor-Sensoren' },
		{ code: 'IP68', first: 'Staubdicht',          second: 'Dauerndes Untertauchen',     use: 'Brunnenpumpen, Unterwasser' },
		{ code: 'IP69', first: 'Staubdicht',          second: 'Hochdruck-/Hochtemp.-Reinigung', use: 'Lebensmittelindustrie' }
	],
	notes: 'Häufige Verwechslung: IP44 (Spritzwasser) genügt NICHT für strahlende Reinigung. Für direkten Aussenbereich mindestens IP54, besser IP65.'
};
