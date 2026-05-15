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
	},
	{
		slug: 'pid-simulator',
		name: 'PID-Simulator',
		short: 'PT1 + Totzeit · Anti-Windup · HVAC-Presets · Echtzeit-Simulation',
		icon: 'cpu',
		color: '#7c3aed'
	},
	{
		slug: 'leitungslaenge',
		name: 'Leitungslänge & Spannungsfall',
		short: 'ΔU = 2×L×ρ×I/A — Max. Länge, Querschnitt, 24V Geräte-Presets',
		icon: 'git-commit',
		color: '#0891b2'
	},
	{
		slug: 'elektro',
		name: 'Elektro-Grundrechner',
		short: 'Ohm · P=U×I · AC Wirk-/Blind-/Scheinleistung · Strom aus Leistung',
		icon: 'zap',
		color: '#eab308'
	},
	{
		slug: 'dip-switch',
		name: 'DIP-Switch Adressrechner',
		short: 'BACnet MSTP · Modbus RTU · KNX — Adresse ↔ DIP-Switch-Stellung',
		icon: 'toggle-right',
		color: '#0891b2'
	},
	{
		slug: 'co2-regelung',
		name: 'CO₂-Regelung',
		short: 'Volumenstrom-Auslegung + Raumzeitkonstante für DDC-Parametrierung',
		icon: 'wind',
		color: '#16a34a'
	},
	{
		slug: 'u-wert',
		name: 'U-Wert',
		short: 'Wärmedurchgangskoeffizient aus Schichtaufbau — SIA 380/1 · Minergie',
		icon: 'layers',
		color: '#0891b2'
	},
	{
		slug: 'ventilautoritaet',
		name: 'Ventilautorität',
		short: 'α = ΔpV / (ΔpV + ΔpSystem) + Kvs-Auswahl nach EN 60534',
		icon: 'sliders',
		color: '#7c3aed'
	},
	{
		slug: 'waermerueckgewinnung',
		name: 'Wärmerückgewinnung',
		short: 'WRG-Wirkungsgrad, Zulufttemperatur, Energieersparnis nach EN 308',
		icon: 'refresh-cw',
		color: '#0d9488'
	}
];

export const rechnerMap = Object.fromEntries(rechner.map((r) => [r.slug, r]));

export type { RechnerMeta };
