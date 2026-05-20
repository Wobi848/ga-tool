import type { ConverterMeta } from './types';

// Base unit: degrees (°)
export const winkel: ConverterMeta = {
	slug: 'winkel',
	name: 'Winkel / Ventilstellung',
	name_en: 'Angle / Valve Position',
	icon: 'rotate-cw',
	color: '#0891b2',
	units: [
		{ id: 'deg', label: 'Grad', labelEn: 'Degrees', symbol: '°', note: 'Klappenantriebe 0–90° oder 0–180°', noteEn: 'Damper actuators 0–90° or 0–180°' },
		{ id: 'rad', label: 'Radiant', labelEn: 'Radian', symbol: 'rad' },
		{ id: 'pct90', label: 'Prozent (0–90°)', labelEn: 'Percent (0–90°)', symbol: '% (90°)', note: 'Typisch Brandschutzklappen', noteEn: 'Typical fire dampers' },
		{ id: 'pct180', label: 'Prozent (0–180°)', labelEn: 'Percent (0–180°)', symbol: '% (180°)', note: 'Typisch Mischventile', noteEn: 'Typical mixing valves' },
		{ id: 'pct360', label: 'Prozent (0–360°)', labelEn: 'Percent (0–360°)', symbol: '% (360°)' }
	],
	toBase: (v, u) => {
		switch (u) {
			case 'deg':    return v;
			case 'rad':    return v * (180 / Math.PI);
			case 'pct90':  return (v / 100) * 90;
			case 'pct180': return (v / 100) * 180;
			case 'pct360': return (v / 100) * 360;
			default:       return v;
		}
	},
	fromBase: (v, u) => {
		switch (u) {
			case 'deg':    return v;
			case 'rad':    return v * (Math.PI / 180);
			case 'pct90':  return (v / 90) * 100;
			case 'pct180': return (v / 180) * 100;
			case 'pct360': return (v / 360) * 100;
			default:       return v;
		}
	}
};
