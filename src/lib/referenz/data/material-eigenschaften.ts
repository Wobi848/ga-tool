import type { ReferenceTable } from '../types';

export const materialEigenschaften: ReferenceTable = {
	slug: 'material-eigenschaften',
	title: 'Stoffwerte typischer Materialien',
	title_en: 'Thermal Properties of Typical Materials',
	subtitle: 'Dichte, Wärmekapazität, Wärmeleitfähigkeit',
	subtitle_en: 'Density, heat capacity, thermal conductivity',
	category: 'Material',
	icon: 'box',
	color: '#7c3aed',
	areas: ['hlk', 'normen'],
	norm: ['EN ISO 10456', 'SIA 381/1'],
	updated: '2026-05-14',
	description: 'Stoffwerte für Wärmebedarfsrechnung und Speicherauslegung. Werte bei 20 °C falls nicht anders angegeben.',
	description_en: 'Thermal properties for heat demand calculation and storage sizing. Values at 20 °C unless otherwise stated.',
	columns: [
		{ key: 'name', label: 'Material', highlight: true },
		{ key: 'rho', label: 'Dichte ρ', label_en: 'Density ρ', unit: 'kg/m³', type: 'number' },
		{ key: 'cp', label: 'Wärmekap. cp', label_en: 'Heat cap. cp', unit: 'J/(kg·K)', type: 'number' },
		{ key: 'lambda', label: 'Wärmeleitung λ', label_en: 'Conductivity λ', unit: 'W/(m·K)', type: 'number', highlight: true },
		{ key: 'category', label: 'Kategorie', label_en: 'Category' }
	],
	rows: [
		{ name: 'Wasser (20 °C)',          name_en: 'Water (20 °C)',              rho: 998,   cp: 4182, lambda: 0.60,   category: 'Medium',    category_en: 'Medium' },
		{ name: 'Wasser (80 °C)',          name_en: 'Water (80 °C)',              rho: 972,   cp: 4196, lambda: 0.67,   category: 'Medium',    category_en: 'Medium' },
		{ name: 'Luft (20 °C)',            name_en: 'Air (20 °C)',                rho: 1.2,   cp: 1006, lambda: 0.026,  category: 'Medium',    category_en: 'Medium' },
		{ name: 'Stahl (Baustahl)',        name_en: 'Steel (structural)',         rho: 7850,  cp: 460,  lambda: 50,     category: 'Metall',    category_en: 'Metal' },
		{ name: 'Aluminium',               name_en: 'Aluminium',                  rho: 2700,  cp: 900,  lambda: 230,    category: 'Metall',    category_en: 'Metal' },
		{ name: 'Kupfer',                  name_en: 'Copper',                     rho: 8960,  cp: 385,  lambda: 380,    category: 'Metall',    category_en: 'Metal' },
		{ name: 'Beton (Normalbeton)',     name_en: 'Concrete (normal weight)',   rho: 2300,  cp: 880,  lambda: 1.65,   category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Beton (Leichtbeton)',     name_en: 'Concrete (lightweight)',     rho: 800,   cp: 880,  lambda: 0.21,   category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Backstein',               name_en: 'Brick',                      rho: 1800,  cp: 880,  lambda: 0.81,   category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Holz (Fichte)',           name_en: 'Wood (spruce)',              rho: 450,   cp: 1700, lambda: 0.13,   category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Glas',                    name_en: 'Glass',                      rho: 2500,  cp: 720,  lambda: 0.8,    category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Gipskartonplatte',        name_en: 'Plasterboard',               rho: 900,   cp: 1050, lambda: 0.25,   category: 'Baustoff',  category_en: 'Building material' },
		{ name: 'Mineralwolle',            name_en: 'Mineral wool',               rho: 30,    cp: 1030, lambda: 0.04,   category: 'Dämmung',   category_en: 'Insulation' },
		{ name: 'EPS (Styropor)',          name_en: 'EPS (expanded polystyrene)', rho: 20,    cp: 1500, lambda: 0.035,  category: 'Dämmung',   category_en: 'Insulation' },
		{ name: 'XPS (Hartschaum)',        name_en: 'XPS (extruded polystyrene)', rho: 35,    cp: 1450, lambda: 0.030,  category: 'Dämmung',   category_en: 'Insulation' },
		{ name: 'PUR/PIR-Schaum',          name_en: 'PUR/PIR foam',               rho: 35,    cp: 1400, lambda: 0.025,  category: 'Dämmung',   category_en: 'Insulation' },
		{ name: 'Holzfaser',               name_en: 'Wood fibre',                 rho: 160,   cp: 2100, lambda: 0.040,  category: 'Dämmung',   category_en: 'Insulation' },
		{ name: 'Erdreich (feucht)',       name_en: 'Soil (moist)',               rho: 1800,  cp: 1480, lambda: 1.5,    category: 'Sonstige',  category_en: 'Other' },
		{ name: 'Estrich (Zement)',        name_en: 'Screed (cement)',            rho: 2000,  cp: 1080, lambda: 1.4,    category: 'Baustoff',  category_en: 'Building material' }
	],
	notes: 'Dämmstoff-λ ist Auslegungswert nach SIA 381/4 — Praxiswerte können bei feuchtem Einbau höher liegen.',
	notes_en: 'Insulation λ is the design value per SIA 381/4 — in-situ values may be higher when installed in damp conditions.'
};
