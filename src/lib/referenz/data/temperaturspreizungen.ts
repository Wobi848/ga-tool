import type { ReferenceTable } from '../types';

export const temperaturspreizungen: ReferenceTable = {
	slug: 'temperaturspreizungen',
	title: 'Temperaturspreizungen Heizung & Kühlung',
	title_en: 'Temperature Differentials Heating & Cooling',
	subtitle: 'Auslegungs-Vor-/Rücklauftemperaturen nach System und Norm',
	subtitle_en: 'Design flow/return temperatures by system and standard',
	category: 'Hydraulik',
	icon: 'thermometer',
	color: '#dc2626',
	areas: ['hlk', 'normen'],
	norm: ['SIA 384/2', 'EN 12831', 'EN 14336', 'EN 15316'],
	updated: '2026-05-15',
	description:
		'Richtwerte für Vor-/Rücklauftemperaturen (VL/RL) und Spreizung ΔT bei verschiedenen Heizungs- und Kühlsystemen. Niedrigere Vorlauftemperaturen verbessern den Wärmepumpen-COP erheblich.',
	description_en:
		'Reference values for flow/return temperatures (FL/RL) and spread ΔT for various heating and cooling systems. Lower flow temperatures significantly improve heat pump COP.',
	columns: [
		{ key: 'system', label: 'System', highlight: true },
		{
			key: 'vl',
			label: 'VL (°C)',
			label_en: 'FL (°C)',
			type: 'number',
			unit: '°C',
			hint: 'Vorlauftemperatur Auslegung',
			hint_en: 'Design flow temperature'
		},
		{
			key: 'rl',
			label: 'RL (°C)',
			label_en: 'RT (°C)',
			type: 'number',
			unit: '°C',
			hint: 'Rücklauftemperatur Auslegung',
			hint_en: 'Design return temperature'
		},
		{
			key: 'spreizung',
			label: 'ΔT (K)',
			type: 'number',
			unit: 'K',
			hint: 'Temperaturspreizung',
			hint_en: 'Temperature differential'
		},
		{
			key: 'norm_at',
			label: 'Norm-AT (°C)',
			label_en: 'Design OAT (°C)',
			type: 'number',
			unit: '°C',
			hint: 'Auslegungs-Aussentemperatur',
			hint_en: 'Design outdoor air temperature'
		},
		{ key: 'bemerkung', label: 'Bemerkung', label_en: 'Notes' }
	],
	rows: [
		{
			system: 'Heizkörper (alt)',
			system_en: 'Radiator (existing)',
			vl: 75,
			rl: 55,
			spreizung: 20,
			norm_at: -8,
			bemerkung: 'Alt-Bestand, Gussheizkörper — ungeeignet für WP',
			bemerkung_en: 'Existing building, cast iron radiators — unsuitable for heat pump'
		},
		{
			system: 'Heizkörper (saniert)',
			system_en: 'Radiator (renovated)',
			vl: 60,
			rl: 40,
			spreizung: 20,
			norm_at: -8,
			bemerkung: 'Sanierter Bestand, grössere Heizkörper',
			bemerkung_en: 'Renovated building, oversized radiators'
		},
		{
			system: 'Heizkörper (Neubau)',
			system_en: 'Radiator (new build)',
			vl: 50,
			rl: 35,
			spreizung: 15,
			norm_at: -8,
			bemerkung: 'Neubau, WP-tauglich',
			bemerkung_en: 'New build, heat pump compatible'
		},
		{
			system: 'Fussbodenheizung (Neubau)',
			system_en: 'Underfloor heating (new build)',
			vl: 35,
			rl: 28,
			spreizung: 7,
			norm_at: -8,
			bemerkung: 'Ideal für Wärmepumpen (COP hoch)',
			bemerkung_en: 'Ideal for heat pumps (high COP)'
		},
		{
			system: 'Fussbodenheizung (saniert)',
			system_en: 'Underfloor heating (renovated)',
			vl: 40,
			rl: 33,
			spreizung: 7,
			norm_at: -8,
			bemerkung: 'Saniert, ggf. höhere VL nötig',
			bemerkung_en: 'Renovated, higher flow temp may be needed'
		},
		{
			system: 'Wandheizung / Deckenheizung',
			system_en: 'Wall heating / radiant ceiling',
			vl: 32,
			rl: 27,
			spreizung: 5,
			norm_at: -8,
			bemerkung: 'Sehr niedriger VL — optimal für WP',
			bemerkung_en: 'Very low flow temp — optimal for heat pump'
		},
		{
			system: 'Fan-Coil Heizung',
			system_en: 'Fan-coil heating',
			vl: 45,
			rl: 35,
			spreizung: 10,
			norm_at: -8,
			bemerkung: 'Variable Spreizung je nach Ventilatorleistung',
			bemerkung_en: 'Variable spread depending on fan output'
		},
		{
			system: 'Fernwärme Übergabe (DE)',
			system_en: 'District heating handover (DE)',
			vl: 80,
			rl: 55,
			spreizung: 25,
			norm_at: -12,
			bemerkung: 'Primärnetz — Spreizung möglichst gross (Effizienz)',
			bemerkung_en: 'Primary network — spread as large as possible (efficiency)'
		},
		{
			system: 'Heiznetz Bürogebäude',
			system_en: 'Heating network office building',
			vl: 55,
			rl: 45,
			spreizung: 10,
			norm_at: -8,
			bemerkung: 'Typisches Bürogebäude mit VAV-Lufterhitzer',
			bemerkung_en: 'Typical office building with VAV air heater'
		},
		{
			system: 'Kaltwasser Kühlung (Standard)',
			system_en: 'Chilled water cooling (standard)',
			vl: 6,
			rl: 12,
			spreizung: 6,
			norm_at: 32,
			bemerkung: 'Standard-Kältemaschine, Klimaanlage',
			bemerkung_en: 'Standard chiller, air conditioning'
		},
		{
			system: 'Kaltwasser Kühlung (ΔT gross)',
			system_en: 'Chilled water cooling (large ΔT)',
			vl: 6,
			rl: 16,
			spreizung: 10,
			norm_at: 32,
			bemerkung: 'Grosse Spreizung → kleinere Pumpen, bessere Effizienz',
			bemerkung_en: 'Large spread → smaller pumps, better efficiency'
		},
		{
			system: 'Kühldecke / Betonkernaktiv.',
			system_en: 'Chilled ceiling / TABS',
			vl: 16,
			rl: 19,
			spreizung: 3,
			norm_at: 32,
			bemerkung: 'Sehr kleiner ΔT — grosse Volumenströme nötig, Kondensationsgefahr!',
			bemerkung_en: 'Very small ΔT — large flow rates needed, condensation risk!'
		},
		{
			system: 'Fan-Coil Kühlung',
			system_en: 'Fan-coil cooling',
			vl: 7,
			rl: 13,
			spreizung: 6,
			norm_at: 32,
			bemerkung: 'Typisch 6–8 K Spreizung',
			bemerkung_en: 'Typically 6–8 K spread'
		},
		{
			system: 'Free Cooling (direkt)',
			system_en: 'Free cooling (direct)',
			vl: 14,
			rl: 18,
			spreizung: 4,
			norm_at: 32,
			bemerkung: 'Nur bei TA < 12°C effizient, keine Kältemaschine',
			bemerkung_en: 'Efficient only when OAT < 12°C, no chiller'
		},
		{
			system: 'Trinkwarmwasser',
			system_en: 'Domestic hot water',
			vl: 60,
			rl: 55,
			spreizung: 5,
			norm_at: 0,
			bemerkung: 'Legionellenschutz: VL ≥ 60°C, RL ≥ 55°C zwingend',
			bemerkung_en: 'Legionella protection: flow ≥ 60°C, return ≥ 55°C mandatory'
		}
	],
	notes:
		'Wärmepumpen-Faustregel: Pro 1 K Absenkung der Vorlauftemperatur verbessert sich der COP um ca. 2–3%. Eine Absenkung von 75°C auf 35°C VL kann den COP von 2.5 auf 4.5+ steigern.',
	notes_en:
		'Heat pump rule of thumb: each 1 K reduction in flow temperature improves COP by approx. 2–3 %. Reducing from 75°C to 35°C flow temperature can raise COP from 2.5 to 4.5+.'
};
