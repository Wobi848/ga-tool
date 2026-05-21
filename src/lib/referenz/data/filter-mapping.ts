import type { ReferenceTable } from '../types';

export const filterMapping: ReferenceTable = {
	slug: 'filter-mapping',
	title: 'Filterklassen alt ↔ neu',
	title_en: 'Filter Classes Old ↔ New',
	subtitle: 'EN 779 → ISO 16890 (ePM)',
	subtitle_en: 'EN 779 → ISO 16890 (ePM)',
	category: 'Filter',
	icon: 'filter',
	color: '#16a34a',
	areas: ['hlk'],
	norm: ['ISO 16890', 'EN 779 (abgelöst)'],
	updated: '2026-05-14',
	description:
		'Mapping zwischen alten Filterklassen (EN 779) und neuen ePM-Klassen nach ISO 16890. Bei Sanierung/Umrüstung wichtig.',
	description_en:
		'Mapping between old filter classes (EN 779) and new ePM classes per ISO 16890. Important for renovation and retrofitting.',
	columns: [
		{ key: 'old', label: 'Alt (EN 779)', label_en: 'Old (EN 779)', mono: true, highlight: true },
		{
			key: 'new',
			label: 'Neu (ISO 16890)',
			label_en: 'New (ISO 16890)',
			mono: true,
			highlight: true
		},
		{ key: 'efficiency', label: 'Mindest-Effizienz', label_en: 'Min. Efficiency' },
		{ key: 'use', label: 'Typische Anwendung', label_en: 'Typical Application' }
	],
	rows: [
		{
			old: 'G3',
			new: 'ISO Coarse 60 %',
			efficiency: '> 60 % > 10 µm',
			efficiency_en: '> 60 % at > 10 µm',
			use: 'Vorfilter Aussenluft Grob',
			use_en: 'Outdoor air pre-filter, coarse'
		},
		{
			old: 'G4',
			new: 'ISO Coarse 90 %',
			efficiency: '> 90 % > 10 µm',
			efficiency_en: '> 90 % at > 10 µm',
			use: 'Vorfilter Standard',
			use_en: 'Standard pre-filter'
		},
		{
			old: 'M5',
			new: 'ePM10 50 %',
			efficiency: '50 % bei PM10',
			efficiency_en: '50 % at PM10',
			use: 'Aussenluft mässig sauber',
			use_en: 'Moderately clean outdoor air'
		},
		{
			old: 'M6',
			new: 'ePM10 65 % / ePM2.5 50 %',
			efficiency: '50 % bei PM2.5',
			efficiency_en: '50 % at PM2.5',
			use: 'Endfilter Wohnungslüftung',
			use_en: 'Final filter residential ventilation'
		},
		{
			old: 'F7',
			new: 'ePM1 50 % / ePM2.5 65 %',
			efficiency: '50 % bei PM1',
			efficiency_en: '50 % at PM1',
			use: 'Standard Komfortlüftung',
			use_en: 'Standard comfort ventilation'
		},
		{
			old: 'F8',
			new: 'ePM1 65 % / ePM2.5 80 %',
			efficiency: '65 % bei PM1',
			efficiency_en: '65 % at PM1',
			use: 'Hohe Anforderung Büro',
			use_en: 'High-spec office'
		},
		{
			old: 'F9',
			new: 'ePM1 80 %',
			efficiency: '80 % bei PM1',
			efficiency_en: '80 % at PM1',
			use: 'Sehr hohe Anforderung',
			use_en: 'Very high specification'
		},
		{
			old: 'E10',
			new: 'EPA E10',
			efficiency: '> 85 %',
			efficiency_en: '> 85 %',
			use: 'Vorfilter HEPA-Stufe',
			use_en: 'Pre-filter for HEPA stage'
		},
		{
			old: 'E11',
			new: 'EPA E11',
			efficiency: '> 95 %',
			efficiency_en: '> 95 %',
			use: 'OP-Bereich Vorfilter',
			use_en: 'Operating theatre pre-filter'
		},
		{
			old: 'H13',
			new: 'HEPA H13',
			efficiency: '99.95 %',
			efficiency_en: '99.95 %',
			use: 'Reinraum, Spital',
			use_en: 'Clean room, hospital'
		},
		{
			old: 'H14',
			new: 'HEPA H14',
			efficiency: '99.995 %',
			efficiency_en: '99.995 %',
			use: 'OP, Pharma',
			use_en: 'Operating theatre, pharma'
		},
		{
			old: 'U15',
			new: 'ULPA U15',
			efficiency: '99.9995 %',
			efficiency_en: '99.9995 %',
			use: 'Reinraum-Spitze',
			use_en: 'Ultra-clean room'
		}
	],
	notes:
		'EN 779 wurde 2018 durch ISO 16890 abgelöst. Die neuen Klassen testen nach Partikelgrösse (PM1 / PM2.5 / PM10) statt nach Gesamteffizienz.',
	notes_en:
		'EN 779 was superseded by ISO 16890 in 2018. The new classes test by particle size (PM1 / PM2.5 / PM10) rather than overall efficiency.'
};
