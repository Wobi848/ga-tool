import type { ReferenceTable } from '../types';

export const temperaturspreizungen: ReferenceTable = {
	slug: 'temperaturspreizungen',
	title: 'Temperaturspreizungen Heizung & Kühlung',
	subtitle: 'Auslegungs-Vor-/Rücklauftemperaturen nach System und Norm',
	category: 'Hydraulik',
	icon: 'thermometer',
	color: '#dc2626',
	areas: ['hlk', 'normen'],
	norm: ['SIA 384/2', 'EN 12831', 'EN 14336', 'EN 15316'],
	updated: '2026-05-15',
	description: 'Richtwerte für Vor-/Rücklauftemperaturen (VL/RL) und Spreizung ΔT bei verschiedenen Heizungs- und Kühlsystemen. Niedrigere Vorlauftemperaturen verbessern den Wärmepumpen-COP erheblich.',
	columns: [
		{ key: 'system', label: 'System', highlight: true },
		{ key: 'vl', label: 'VL (°C)', type: 'number', unit: '°C', hint: 'Vorlauftemperatur Auslegung' },
		{ key: 'rl', label: 'RL (°C)', type: 'number', unit: '°C', hint: 'Rücklauftemperatur Auslegung' },
		{ key: 'spreizung', label: 'ΔT (K)', type: 'number', unit: 'K', hint: 'Temperaturspreizung' },
		{ key: 'norm_at', label: 'Norm-AT (°C)', type: 'number', unit: '°C', hint: 'Auslegungs-Aussentemperatur' },
		{ key: 'bemerkung', label: 'Bemerkung' }
	],
	rows: [
		{ system: 'Heizkörper (alt)',              vl: 75, rl: 55, spreizung: 20, norm_at: -8,  bemerkung: 'Alt-Bestand, Gussheizkörper — ungeeignet für WP' },
		{ system: 'Heizkörper (saniert)',          vl: 60, rl: 40, spreizung: 20, norm_at: -8,  bemerkung: 'Sanierter Bestand, grössere Heizkörper' },
		{ system: 'Heizkörper (Neubau)',           vl: 50, rl: 35, spreizung: 15, norm_at: -8,  bemerkung: 'Neubau, WP-tauglich' },
		{ system: 'Fussbodenheizung (Neubau)',     vl: 35, rl: 28, spreizung: 7,  norm_at: -8,  bemerkung: 'Ideal für Wärmepumpen (COP hoch)' },
		{ system: 'Fussbodenheizung (saniert)',    vl: 40, rl: 33, spreizung: 7,  norm_at: -8,  bemerkung: 'Saniert, ggf. höhere VL nötig' },
		{ system: 'Wandheizung / Deckenheizung',   vl: 32, rl: 27, spreizung: 5,  norm_at: -8,  bemerkung: 'Sehr niedriger VL — optimal für WP' },
		{ system: 'Fan-Coil Heizung',              vl: 45, rl: 35, spreizung: 10, norm_at: -8,  bemerkung: 'Variable Spreizung je nach Ventilatorleistung' },
		{ system: 'Fernwärme Übergabe (DE)',       vl: 80, rl: 55, spreizung: 25, norm_at: -12, bemerkung: 'Primärnetz — Spreizung möglichst gross (Effizienz)' },
		{ system: 'Heiznetz Bürogebäude',          vl: 55, rl: 45, spreizung: 10, norm_at: -8,  bemerkung: 'Typisches Bürogebäude mit VAV-Lufterhitzer' },
		{ system: 'Kaltwasser Kühlung (Standard)', vl: 6,  rl: 12, spreizung: 6,  norm_at: 32,  bemerkung: 'Standard-Kältemaschine, Klimaanlage' },
		{ system: 'Kaltwasser Kühlung (ΔT gross)', vl: 6,  rl: 16, spreizung: 10, norm_at: 32,  bemerkung: 'Grosse Spreizung → kleinere Pumpen, bessere Effizienz' },
		{ system: 'Kühldecke / Betonkernaktiv.',   vl: 16, rl: 19, spreizung: 3,  norm_at: 32,  bemerkung: 'Sehr kleiner ΔT — grosse Volumenströme nötig, Kondensationsgefahr!' },
		{ system: 'Fan-Coil Kühlung',              vl: 7,  rl: 13, spreizung: 6,  norm_at: 32,  bemerkung: 'Typisch 6–8 K Spreizung' },
		{ system: 'Free Cooling (direkt)',          vl: 14, rl: 18, spreizung: 4,  norm_at: 32,  bemerkung: 'Nur bei TA < 12°C effizient, keine Kältemaschine' },
		{ system: 'Trinkwarmwasser',               vl: 60, rl: 55, spreizung: 5,  norm_at: 0,   bemerkung: 'Legionellenschutz: VL ≥ 60°C, RL ≥ 55°C zwingend' }
	],
	notes: 'Wärmepumpen-Faustregel: Pro 1 K Absenkung der Vorlauftemperatur verbessert sich der COP um ca. 2–3%. Eine Absenkung von 75°C auf 35°C VL kann den COP von 2.5 auf 4.5+ steigern.'
};
