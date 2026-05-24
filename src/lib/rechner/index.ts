import type { RechnerMeta } from './types';

export const rechner: RechnerMeta[] = [
	{
		slug: 'heizkurve',
		name: 'Heizkurve',
		name_en: 'Heating Curve',
		short: 'Vorlauftemperatur aus Aussentemperatur — herstellerspezifisch',
		short_en: 'Flow temperature from outdoor temperature — manufacturer-specific',
		icon: 'trending-up',
		color: '#dc2626'
	},
	{
		slug: 'kv-wert',
		name: 'Kv-Wert',
		name_en: 'Kv Value',
		short: 'Ventil-Auslegung: Kv aus Δp + Durchfluss',
		short_en: 'Valve sizing: Kv from Δp + flow rate',
		icon: 'sliders',
		color: '#2563eb'
	},
	{
		slug: 'ausdehnungsgefaess',
		name: 'Ausdehnungsgefäss',
		name_en: 'Expansion Vessel',
		short: 'MAG-Volumen aus Anlageninhalt + Drücken',
		short_en: 'MAG volume from system volume + pressures',
		icon: 'cylinder',
		color: '#0891b2'
	},
	{
		slug: 'druckverlust',
		name: 'Druckverlust',
		name_en: 'Pressure Drop',
		short: 'Rohrnetz: R × L + Σζ → Δp gesamt',
		short_en: 'Pipe network: R × L + Σζ → Δp total',
		icon: 'activity',
		color: '#ea580c'
	},
	{
		slug: 'luftbedarf',
		name: 'Luftbedarf',
		name_en: 'Fresh Air Demand',
		short: 'Mindest-Aussenluftvolumen nach EN 16798',
		short_en: 'Minimum outdoor air volume per EN 16798',
		icon: 'wind',
		color: '#0d9488'
	},
	{
		slug: 'taupunkt',
		name: 'Taupunkt',
		name_en: 'Dew Point',
		short: 'Aus Lufttemperatur + rel. Feuchte → Taupunkt',
		short_en: 'From air temperature + rel. humidity → dew point',
		icon: 'droplet',
		color: '#7c3aed'
	},
	{
		slug: 'waermeleistung',
		name: 'Wärmeleistung',
		name_en: 'Heat Output',
		short: 'Q = ṁ × cp × ΔT (Heizung/Kühlung/WMZ)',
		short_en: 'Q = ṁ × cp × ΔT (heating/cooling/heat meter)',
		icon: 'zap',
		color: '#ca8a04'
	},
	{
		slug: 'psychrometrie',
		name: 'Psychrometrie',
		name_en: 'Psychrometrics',
		short: 'h-x Diagramm: alle Zustandsgrössen feuchte Luft',
		short_en: 'h-x diagram: all state variables of moist air',
		icon: 'thermometer',
		color: '#16a34a'
	},
	{
		slug: 'pid-simulator',
		name: 'PID-Simulator',
		name_en: 'PID Simulator',
		short: 'PT1 + Totzeit · Anti-Windup · HVAC-Presets · Echtzeit-Simulation',
		short_en: 'PT1 + dead time · Anti-windup · HVAC presets · Real-time simulation',
		icon: 'cpu',
		color: '#7c3aed'
	},
	{
		slug: 'leitungslaenge',
		name: 'Leitungslänge & Spannungsfall',
		name_en: 'Cable Length & Voltage Drop',
		short: 'ΔU = 2×L×ρ×I/A — Max. Länge, Querschnitt, 24V Geräte-Presets',
		short_en: 'ΔU = 2×L×ρ×I/A — max. length, cross-section, 24V device presets',
		icon: 'git-commit',
		color: '#0891b2'
	},
	{
		slug: 'elektro',
		name: 'Elektro-Grundrechner',
		name_en: 'Electrical Calculator',
		short: 'Ohm · P=U×I · AC Wirk-/Blind-/Scheinleistung · Strom aus Leistung',
		short_en: 'Ohm · P=U×I · AC active/reactive/apparent power · current from power',
		icon: 'zap',
		color: '#eab308'
	},
	{
		slug: 'dip-switch',
		name: 'DIP-Switch Adressrechner',
		name_en: 'DIP Switch Address Calculator',
		short: 'BACnet MSTP · Modbus RTU · KNX — Adresse ↔ DIP-Switch-Stellung',
		short_en: 'BACnet MSTP · Modbus RTU · KNX — address ↔ DIP switch position',
		icon: 'toggle-right',
		color: '#0891b2'
	},
	{
		slug: 'co2-regelung',
		name: 'CO₂-Regelung',
		name_en: 'CO₂ Control',
		short: 'Volumenstrom-Auslegung + Raumzeitkonstante für DDC-Parametrierung',
		short_en: 'Volume flow sizing + room time constant for DDC parameterisation',
		icon: 'wind',
		color: '#16a34a'
	},
	{
		slug: 'u-wert',
		name: 'U-Wert',
		name_en: 'U-Value',
		short: 'Wärmedurchgangskoeffizient aus Schichtaufbau — SIA 380/1 · Minergie',
		short_en: 'Thermal transmittance from layer structure — SIA 380/1 · Minergie',
		icon: 'layers',
		color: '#0891b2'
	},
	{
		slug: 'ventilautoritaet',
		name: 'Ventilautorität',
		name_en: 'Valve Authority',
		short: 'α = ΔpV / (ΔpV + ΔpSystem) + Kvs-Auswahl nach EN 60534',
		short_en: 'α = ΔpV / (ΔpV + ΔpSystem) + Kvs selection per EN 60534',
		icon: 'sliders',
		color: '#7c3aed'
	},
	{
		slug: 'waermerueckgewinnung',
		name: 'Wärmerückgewinnung',
		name_en: 'Heat Recovery',
		short: 'WRG-Wirkungsgrad, Zulufttemperatur, Energieersparnis nach EN 308',
		short_en: 'HRV efficiency, supply air temperature, energy savings per EN 308',
		icon: 'refresh-cw',
		color: '#0d9488'
	},
	{
		slug: 'pumpenkennlinie',
		name: 'Pumpenkennlinie',
		name_en: 'Pump Curve',
		short: 'H-Q Diagramm, Betriebspunkt, spezifische Drehzahl — Grundfos/Wilo Presets',
		short_en: 'H-Q diagram, operating point, specific speed — Grundfos/Wilo presets',
		icon: 'activity',
		color: '#2563eb'
	},
	{
		slug: 'heizlast',
		name: 'Heizlast',
		name_en: 'Heating Load',
		short: 'Raum- und Gebäudeheizlast nach SIA 384.201 — Transmission + Lüftung',
		short_en: 'Room and building heating load per SIA 384.201 — transmission + ventilation',
		icon: 'thermometer',
		color: '#dc2626'
	},
	{
		slug: 'gewichteter-mittelwert',
		name: 'Gewichteter Mittelwert',
		name_en: 'Weighted Average',
		short:
			'Beliebig viele Messwerte mit individueller Gewichtung — z.B. Raumtemperaturen, Sensoren',
		short_en: 'Any number of values with individual weighting — e.g. room temperatures, sensors',
		icon: 'sliders',
		color: '#0891b2'
	},
	{
		slug: 'bus-ibn',
		name: 'Bus-IBN Adresskonfigurator',
		name_en: 'Bus Commissioning Address Configurator',
		short: 'BACnet MSTP/IP · Modbus RTU · KNX — Adressverwaltung mit IBN-Dokument-Export',
		short_en:
			'BACnet MSTP/IP · Modbus RTU · KNX — address management with commissioning document export',
		icon: 'cpu',
		color: '#2563eb'
	},
	{
		slug: 'polynom-fit',
		name: 'Polynom-Fit',
		name_en: 'Polynomial Fit',
		short: 'Sensor-Linearisierung: Kennlinie aus Messpunkten als Polynom',
		short_en: 'Sensor linearization: characteristic curve from measurement points as polynomial',
		icon: 'chart-line',
		color: '#7c3aed',
		updated: '2026-05-24'
	},
	{
		slug: 'k-faktor',
		name: 'k-Faktor (Luft)',
		name_en: 'k-Factor (Air)',
		short: 'Volumenstrom aus Wirkdruck: Q = k·√ΔP (VAV-Boxen, Düsen)',
		short_en: 'Volume flow from differential pressure: Q = k·√ΔP (VAV boxes, nozzles)',
		icon: 'wind',
		color: '#0d9488',
		updated: '2026-05-24'
	}
];

export const rechnerMap = Object.fromEntries(rechner.map((r) => [r.slug, r]));

export type { RechnerMeta };
