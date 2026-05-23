// U-Wert (Waermedurchgangskoeffizient) eines geschichteten Bauteils
// nach DIN EN ISO 6946 / SIA 380/1.

/** Bauteil-Typ -> typische Rsi / Rse [m²·K/W]. */
export const SURFACE_PRESETS = {
	'wand-aussen': { rsi: 0.13, rse: 0.04 },
	'wand-innen': { rsi: 0.13, rse: 0.13 },
	'dach-aussen': { rsi: 0.1, rse: 0.04 },
	'boden-erdreich': { rsi: 0.17, rse: 0.0 },
	'boden-aussen': { rsi: 0.17, rse: 0.04 },
	custom: { rsi: 0.13, rse: 0.04 }
} as const;

export type SurfaceKey = keyof typeof SURFACE_PRESETS;

export interface Layer {
	label: string;
	/** Waermeleitfaehigkeit [W/(m·K)] */
	lambda: number;
	/** Dicke [mm] */
	thickness: number;
}

export interface UWertResult {
	/** Waermedurchlasswiderstand der Schichten [m²·K/W] */
	rt: number;
	/** Gesamtwiderstand inkl. Rsi/Rse [m²·K/W] */
	rTotal: number;
	/** U-Wert [W/(m²·K)] */
	u: number;
	/** Gesamtdicke [mm] */
	dTotal: number;
}

/** R-Wert pro Schicht: thickness [m] / λ. */
function layerR(l: Layer): number {
	return l.thickness / 1000 / l.lambda;
}

export function uWert(layers: Layer[], rsi: number, rse: number): UWertResult {
	const rt = layers.reduce((sum, l) => sum + layerR(l), 0);
	const rTotal = rsi + rt + rse;
	const u = rTotal > 0 ? 1 / rTotal : 0;
	const dTotal = layers.reduce((sum, l) => sum + l.thickness, 0);
	return { rt, rTotal, u, dTotal };
}

/** SIA 380/1 / Minergie Grenzwerte fuer U [W/(m²·K)]. */
export const SIA_LIMITS = [
	{ label: 'Aussenwand Neubau (SIA 380/1)', u: 0.17 },
	{ label: 'Flachdach Neubau', u: 0.15 },
	{ label: 'Estrichboden/Kellerdecke', u: 0.2 },
	{ label: 'Fenster (empfohlen)', u: 0.9 },
	{ label: 'Minergie-Standard Wand', u: 0.12 }
];
