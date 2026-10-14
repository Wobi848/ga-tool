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

/** Grenzwerte Einzelbauteilnachweis Neubau nach SIA 380/1:2016 bei 20 °C
 *  Raumtemperatur. Die Kantone setzen sie ueber die MuKEn um, einzelne
 *  weichen bei «gegen unbeheizt» leicht ab (z.B. BL 0.23).
 *
 *  Bis 0.16.0 stand hier Flachdach 0.15 und Kellerdecke 0.20 — beides
 *  falsch — und ein «Minergie-Standard Wand 0.12», den es nicht gibt:
 *  Minergie stellt Anforderungen an das ganze Gebaeude, nicht an Bauteile. */
export const SIA_LIMITS = [
	{ label: 'Wand, Dach, Boden gegen Aussenklima (SIA 380/1)', u: 0.17 },
	{ label: 'Gegen unbeheizte Räume oder Erdreich > 2 m', u: 0.25 },
	{ label: 'Fenster, Fenstertür gegen Aussenklima', u: 1.0 }
];
