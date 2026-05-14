import type { RechnerMeta } from './types';

export const rechner: RechnerMeta[] = [
	{
		slug: 'heizkurve',
		name: 'Heizkurve',
		short: 'Vorlauftemperatur aus Aussentemperatur — herstellerspezifisch',
		icon: 'trending-up',
		color: '#dc2626'
	},
	{
		slug: 'kv-wert',
		name: 'Kv-Wert',
		short: 'Ventil-Auslegung: Kv aus Δp + Durchfluss',
		icon: 'sliders',
		color: '#2563eb'
	},
	{
		slug: 'ausdehnungsgefaess',
		name: 'Ausdehnungsgefäss',
		short: 'MAG-Volumen aus Anlageninhalt + Drücken',
		icon: 'cylinder',
		color: '#0891b2'
	},
	{
		slug: 'druckverlust',
		name: 'Druckverlust',
		short: 'Rohrnetz: R × L + Σζ → Δp gesamt',
		icon: 'activity',
		color: '#ea580c'
	},
	{
		slug: 'luftbedarf',
		name: 'Luftbedarf',
		short: 'Mindest-Aussenluftvolumen nach EN 16798',
		icon: 'wind',
		color: '#0d9488'
	},
	{
		slug: 'taupunkt',
		name: 'Taupunkt',
		short: 'Aus Lufttemperatur + rel. Feuchte → Taupunkt',
		icon: 'droplet',
		color: '#7c3aed'
	},
	{
		slug: 'waermeleistung',
		name: 'Wärmeleistung',
		short: 'Q = ṁ × cp × ΔT (Heizung/Kühlung/WMZ)',
		icon: 'zap',
		color: '#ca8a04'
	},
	{
		slug: 'psychrometrie',
		name: 'Psychrometrie',
		short: 'h-x Diagramm: alle Zustandsgrössen feuchte Luft',
		icon: 'thermometer',
		color: '#16a34a'
	}
];

export const rechnerMap = Object.fromEntries(rechner.map((r) => [r.slug, r]));

export type { RechnerMeta };
