// Heating curve calculation per manufacturer
// All formulas compute flow temperature TV [°C] from outdoor temperature TA [°C]
// using manufacturer-specific slope/level parameters.

export type Manufacturer = 'generic' | 'siemens' | 'viessmann' | 'buderus' | 'honeywell' | 'sauter';

export interface CurveParams {
	manufacturer: Manufacturer;
	roomTemp: number;       // Soll Raumtemperatur [°C]
	normOutdoor: number;    // Normaussentemperatur [°C] (z.B. CH: -8 °C)
	slope: number;          // Neigung / Steilheit (0.2–4)
	level: number;          // Niveau / Parallelverschiebung [K]
	systemType: 'radiator' | 'floor'; // beeinflusst Exponent
	// Honeywell 2-Punkt
	ta1?: number;
	tv1?: number;
	ta2?: number;
	tv2?: number;
	// Sauter Fusspunkt
	footpoint?: number;
	// Heizgrenze
	heatLimit?: number;     // °C, oberhalb keine Heizung
	maxFlow?: number;       // max. Vorlauftemperatur [°C]
	minFlow?: number;       // min. Vorlauftemperatur [°C]
}

/**
 * Standard "Heizkennlinie" — radiator/floor characteristic
 * TV = TR + s × dT^(1/n) × correction + level
 */
function genericCurve(ta: number, p: CurveParams): number {
	const dT = p.roomTemp - ta;
	if (dT <= 0) return p.roomTemp;
	// Simple linear curve — easy to understand
	return p.roomTemp + p.slope * dT + p.level;
}

/**
 * Siemens RVS/Albatros formula (approximation of their internal curve)
 * Used in DESIGO RXB/RXC and Albatros 2 controllers
 */
function siemensCurve(ta: number, p: CurveParams): number {
	const dT = p.roomTemp - ta;
	if (dT <= 0) return p.roomTemp;
	// Siemens slope acts on a radiator characteristic with exponent ~1.3
	const n = p.systemType === 'floor' ? 1.1 : 1.3;
	// Reference: at TA = normOutdoor, TV_design = TR + slope × (TR - normOutdoor)
	// Use exponent for non-linearity:
	const dTNorm = p.roomTemp - p.normOutdoor;
	const ratio = dT / dTNorm;
	const dTV = p.slope * dTNorm * Math.pow(ratio, 1 / n);
	return p.roomTemp + dTV + p.level;
}

/**
 * Viessmann Vitotronic — uses Neigung + Niveau
 * Similar to Siemens but Viessmann's slope is scaled differently in their UI.
 * Their curves are slightly more aggressive at low outdoor temperatures.
 */
function viessmannCurve(ta: number, p: CurveParams): number {
	const dT = p.roomTemp - ta;
	if (dT <= 0) return p.roomTemp;
	const n = p.systemType === 'floor' ? 1.1 : 1.3;
	const dTNorm = p.roomTemp - p.normOutdoor;
	// Viessmann slope correction factor ~1.0 (very similar to standard)
	const ratio = dT / dTNorm;
	const dTV = p.slope * dTNorm * Math.pow(ratio, 1 / n);
	return p.roomTemp + dTV + p.level;
}

/**
 * Buderus / Bosch EMS — "Steilheit" parameter (0.2–4.0)
 * Logamatic family controllers.
 */
function buderusCurve(ta: number, p: CurveParams): number {
	const dT = p.roomTemp - ta;
	if (dT <= 0) return p.roomTemp;
	const n = p.systemType === 'floor' ? 1.1 : 1.33;
	const dTNorm = p.roomTemp - p.normOutdoor;
	const ratio = dT / dTNorm;
	const dTV = p.slope * dTNorm * Math.pow(ratio, 1 / n);
	return p.roomTemp + dTV + p.level;
}

/**
 * Honeywell / Resideo — 2-Punkte-Methode
 * Linear interpolation between (TA1, TV1) and (TA2, TV2)
 */
function honeywellCurve(ta: number, p: CurveParams): number {
	const ta1 = p.ta1 ?? -10;
	const tv1 = p.tv1 ?? 60;
	const ta2 = p.ta2 ?? 15;
	const tv2 = p.tv2 ?? 25;
	if (ta2 === ta1) return tv1;
	return tv1 + ((tv2 - tv1) * (ta - ta1)) / (ta2 - ta1);
}

/**
 * Sauter — Neigung + Fusspunkt
 * Linear from (Heizgrenze, Fusspunkt) with given slope.
 */
function sauterCurve(ta: number, p: CurveParams): number {
	const fp = p.footpoint ?? 25;
	const limit = p.heatLimit ?? 18;
	if (ta >= limit) return fp;
	return fp + p.slope * (limit - ta);
}

const dispatch: Record<Manufacturer, (ta: number, p: CurveParams) => number> = {
	generic: genericCurve,
	siemens: siemensCurve,
	viessmann: viessmannCurve,
	buderus: buderusCurve,
	honeywell: honeywellCurve,
	sauter: sauterCurve
};

export function calculateFlowTemp(ta: number, p: CurveParams): number {
	let tv = dispatch[p.manufacturer](ta, p);
	// Heizgrenze
	if (p.heatLimit !== undefined && ta >= p.heatLimit) tv = p.roomTemp;
	// Min/Max clamp
	if (p.maxFlow !== undefined) tv = Math.min(tv, p.maxFlow);
	if (p.minFlow !== undefined && tv > p.roomTemp) tv = Math.max(tv, p.minFlow);
	return tv;
}

/** Generate (TA, TV) points for plotting curve */
export function curvePoints(p: CurveParams, taMin = -15, taMax = 20, steps = 36): Array<[number, number]> {
	const pts: Array<[number, number]> = [];
	for (let i = 0; i <= steps; i++) {
		const ta = taMin + ((taMax - taMin) * i) / steps;
		pts.push([ta, calculateFlowTemp(ta, p)]);
	}
	return pts;
}

export const manufacturerInfo: Record<Manufacturer, { label: string; family: string; slopeRange: [number, number]; slopeStep: number }> = {
	generic: { label: 'Generisch (linear)', family: 'Pädagogisch — TV = TR + s × (TR − TA) + Niveau', slopeRange: [0.2, 4.0], slopeStep: 0.1 },
	siemens: { label: 'Siemens DESIGO / RVS / Albatros', family: 'Neigung 0.2–3.5, Niveau ± 15 K', slopeRange: [0.2, 3.5], slopeStep: 0.05 },
	viessmann: { label: 'Viessmann Vitotronic', family: 'Neigung 0.2–3.5, Niveau ± 15 K', slopeRange: [0.2, 3.5], slopeStep: 0.05 },
	buderus: { label: 'Buderus / Bosch (EMS)', family: 'Steilheit 0.2–4.0, Niveau ± 15 K', slopeRange: [0.2, 4.0], slopeStep: 0.05 },
	honeywell: { label: 'Honeywell / Resideo', family: '2-Punkte-Methode (TA₁→TV₁, TA₂→TV₂)', slopeRange: [0.2, 4.0], slopeStep: 0.1 },
	sauter: { label: 'Sauter', family: 'Neigung + Fusspunkt', slopeRange: [0.2, 4.0], slopeStep: 0.1 }
};

/** Common Swiss reference outdoor temperatures (SIA 384/2) */
export const swissNormOutdoor: Array<{ ort: string; t: number }> = [
	{ ort: 'Zürich', t: -8 },
	{ ort: 'Bern', t: -10 },
	{ ort: 'Basel', t: -7 },
	{ ort: 'Genf', t: -7 },
	{ ort: 'Lausanne', t: -7 },
	{ ort: 'Luzern', t: -8 },
	{ ort: 'St. Gallen', t: -11 },
	{ ort: 'Chur', t: -13 },
	{ ort: 'Davos', t: -19 },
	{ ort: 'Sion', t: -10 },
	{ ort: 'Lugano', t: -5 },
	{ ort: 'Locarno', t: -5 }
];
