import type { ReferenceTable } from '../types';

export const siaRaumtemperaturen: ReferenceTable = {
	slug: 'sia-raumtemperaturen',
	title: 'Raumsolltemperaturen nach Nutzungsart',
	title_en: 'Room Setpoint Temperatures by Occupancy Type',
	subtitle: 'SIA 2024, EN 16798-1, EN ISO 7730 — Komfort- und Absenkwerte',
	subtitle_en: 'SIA 2024, EN 16798-1, EN ISO 7730 — comfort and setback values',
	category: 'Komfort',
	icon: 'thermometer',
	color: '#dc2626',
	areas: ['hlk', 'normen'],
	norm: ['SIA 2024:2015', 'EN 16798-1:2019', 'EN ISO 7730', 'SIA 380/1'],
	updated: '2026-05-15',
	description: 'Richtwerte für Raumsolltemperaturen nach Nutzungsart und Komfortkategorie. Kategorie I = hohe Anforderungen (Krankenhäuser, Schulen), Kategorie II = normal (Büros, Wohnen), Kategorie III = moderat.',
	description_en: 'Reference values for room setpoint temperatures by occupancy type and comfort category. Category I = high requirements (hospitals, schools), Category II = normal (offices, residential), Category III = moderate.',
	columns: [
		{ key: 'nutzung', label: 'Nutzungsart', label_en: 'Occupancy Type', highlight: true },
		{ key: 'heiz_soll', label: 'Heizung Soll (°C)', label_en: 'Heating SP (°C)', type: 'number', unit: '°C' },
		{ key: 'heiz_nacht', label: 'Nachtabsenkung (°C)', label_en: 'Night Setback (°C)', type: 'number', unit: '°C' },
		{ key: 'kuehl_soll', label: 'Kühlung Soll (°C)', label_en: 'Cooling SP (°C)', type: 'number', unit: '°C' },
		{ key: 'rh_min', label: 'rF min (%)', label_en: 'RH min (%)', type: 'number', unit: '%' },
		{ key: 'rh_max', label: 'rF max (%)', label_en: 'RH max (%)', type: 'number', unit: '%' },
		{ key: 'norm', label: 'Referenz', label_en: 'Reference', mono: true }
	],
	rows: [
		{ nutzung: 'Büro (Einzelbüro)',           nutzung_en: 'Office (private)',            heiz_soll: 21, heiz_nacht: 16, kuehl_soll: 26, rh_min: 30, rh_max: 60, norm: 'SIA 2024 / EN 16798' },
		{ nutzung: 'Büro (Grossraum)',             nutzung_en: 'Office (open plan)',          heiz_soll: 21, heiz_nacht: 16, kuehl_soll: 25, rh_min: 30, rh_max: 60, norm: 'SIA 2024 / EN 16798' },
		{ nutzung: 'Wohnen / Schlafzimmer',        nutzung_en: 'Residential / Bedroom',      heiz_soll: 20, heiz_nacht: 18, kuehl_soll: 26, rh_min: 35, rh_max: 60, norm: 'SIA 2024' },
		{ nutzung: 'Wohnen / Wohnzimmer',          nutzung_en: 'Residential / Living room',  heiz_soll: 21, heiz_nacht: 18, kuehl_soll: 26, rh_min: 35, rh_max: 60, norm: 'SIA 2024' },
		{ nutzung: 'Hotel Zimmer',                 nutzung_en: 'Hotel room',                 heiz_soll: 21, heiz_nacht: 19, kuehl_soll: 25, rh_min: 30, rh_max: 60, norm: 'SIA 2024' },
		{ nutzung: 'Schulzimmer',                  nutzung_en: 'Classroom',                  heiz_soll: 20, heiz_nacht: 15, kuehl_soll: 26, rh_min: 30, rh_max: 60, norm: 'SIA 2024' },
		{ nutzung: 'Verkauf / Retail',             nutzung_en: 'Retail',                     heiz_soll: 19, heiz_nacht: 14, kuehl_soll: 25, rh_min: 30, rh_max: 65, norm: 'SIA 2024' },
		{ nutzung: 'Restaurant / Gastronomie',     nutzung_en: 'Restaurant',                 heiz_soll: 20, heiz_nacht: 15, kuehl_soll: 25, rh_min: 30, rh_max: 60, norm: 'SIA 2024' },
		{ nutzung: 'Foyer / Eingangsbereich',      nutzung_en: 'Foyer / Entrance',           heiz_soll: 18, heiz_nacht: 14, kuehl_soll: 27, rh_min: 25, rh_max: 65, norm: 'SIA 2024' },
		{ nutzung: 'Korridor / Treppenhaus',       nutzung_en: 'Corridor / Stairwell',       heiz_soll: 16, heiz_nacht: 12, kuehl_soll: 28, rh_min: 25, rh_max: 70, norm: 'SIA 2024' },
		{ nutzung: 'Spital Patientenzimmer',       nutzung_en: 'Hospital patient room',      heiz_soll: 22, heiz_nacht: 20, kuehl_soll: 24, rh_min: 40, rh_max: 60, norm: 'SIA 2024 / VDI 6022' },
		{ nutzung: 'OP-Saal',                      nutzung_en: 'Operating theatre',          heiz_soll: 23, heiz_nacht: 23, kuehl_soll: 23, rh_min: 40, rh_max: 60, norm: 'DIN 1946-4' },
		{ nutzung: 'Reinraum ISO 7',               nutzung_en: 'Clean room ISO 7',           heiz_soll: 22, heiz_nacht: 22, kuehl_soll: 22, rh_min: 40, rh_max: 55, norm: 'ISO 14644' },
		{ nutzung: 'Tiefgarage',                   nutzung_en: 'Underground car park',       heiz_soll: 5,  heiz_nacht: 5,  kuehl_soll: 35, rh_min: 0,  rh_max: 100, norm: 'Frostschutz' },
		{ nutzung: 'Lager / Magazin (ungeheizt)',  nutzung_en: 'Storage / warehouse (unheated)', heiz_soll: 10, heiz_nacht: 8, kuehl_soll: 35, rh_min: 0, rh_max: 80, norm: 'Frostschutz' },
		{ nutzung: 'Serverraum',                   nutzung_en: 'Server room',                heiz_soll: 18, heiz_nacht: 18, kuehl_soll: 27, rh_min: 40, rh_max: 60, norm: 'ASHRAE A1' }
	],
	notes: 'Werte sind Richtwerte. Für verbindliche Planungsgrundlagen immer SIA 2024 und die projektspezifischen Anforderungen des Bauherrn/Betreibers verwenden. Medizinische Räume nach DIN 1946-4 (DE) bzw. SIA 2024 Teil 5 (CH).',
	notes_en: 'Values are guidelines. For binding planning standards, always use SIA 2024 and the project-specific requirements of the client/operator. Medical rooms per DIN 1946-4 (DE) or SIA 2024 Part 5 (CH).'
};
