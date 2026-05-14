import type { ReferenceTable } from '../types';

export const filterMapping: ReferenceTable = {
	slug: 'filter-mapping',
	title: 'Filterklassen alt ↔ neu',
	subtitle: 'EN 779 → ISO 16890 (ePM)',
	category: 'Filter',
	icon: 'filter',
	color: '#16a34a',
	areas: ['hlk'],
	norm: ['ISO 16890', 'EN 779 (abgelöst)'],
	updated: '2026-05-14',
	description: 'Mapping zwischen alten Filterklassen (EN 779) und neuen ePM-Klassen nach ISO 16890. Bei Sanierung/Umrüstung wichtig.',
	columns: [
		{ key: 'old', label: 'Alt (EN 779)', mono: true, highlight: true },
		{ key: 'new', label: 'Neu (ISO 16890)', mono: true, highlight: true },
		{ key: 'efficiency', label: 'Mindest-Effizienz' },
		{ key: 'use', label: 'Typische Anwendung' }
	],
	rows: [
		{ old: 'G3',  new: 'ISO Coarse 60 %',         efficiency: '> 60 % > 10 µm',    use: 'Vorfilter Aussenluft Grob' },
		{ old: 'G4',  new: 'ISO Coarse 90 %',         efficiency: '> 90 % > 10 µm',    use: 'Vorfilter Standard' },
		{ old: 'M5',  new: 'ePM10 50 %',              efficiency: '50 % bei PM10',     use: 'Aussenluft mässig sauber' },
		{ old: 'M6',  new: 'ePM10 65 % / ePM2.5 50 %', efficiency: '50 % bei PM2.5',   use: 'Endfilter Wohnungslüftung' },
		{ old: 'F7',  new: 'ePM1 50 % / ePM2.5 65 %', efficiency: '50 % bei PM1',      use: 'Standard Komfortlüftung' },
		{ old: 'F8',  new: 'ePM1 65 % / ePM2.5 80 %', efficiency: '65 % bei PM1',      use: 'Hohe Anforderung Büro' },
		{ old: 'F9',  new: 'ePM1 80 %',               efficiency: '80 % bei PM1',      use: 'Sehr hohe Anforderung' },
		{ old: 'E10', new: 'EPA E10',                 efficiency: '> 85 %',            use: 'Vorfilter HEPA-Stufe' },
		{ old: 'E11', new: 'EPA E11',                 efficiency: '> 95 %',            use: 'OP-Bereich Vorfilter' },
		{ old: 'H13', new: 'HEPA H13',                efficiency: '99.95 %',           use: 'Reinraum, Spital' },
		{ old: 'H14', new: 'HEPA H14',                efficiency: '99.995 %',          use: 'OP, Pharma' },
		{ old: 'U15', new: 'ULPA U15',                efficiency: '99.9995 %',         use: 'Reinraum-Spitze' }
	],
	notes: 'EN 779 wurde 2018 durch ISO 16890 abgelöst. Die neuen Klassen testen nach Partikelgrösse (PM1 / PM2.5 / PM10) statt nach Gesamteffizienz.'
};
