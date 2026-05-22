// Druckverlust-Berechnung fuer Rohrleitungen
// Reibungsverlust (Darcy-Weisbach) + Einzelverluste (Zeta)

export type Medium = 'wasser' | 'sole30';
export type DN = 'DN15' | 'DN20' | 'DN25' | 'DN32' | 'DN40' | 'DN50';

export const pipes: Record<DN, { di: number; label: string }> = {
	DN15: { di: 16, label: 'DN 15 (Innen-Ø 16 mm)' },
	DN20: { di: 21.6, label: 'DN 20 (21.6 mm)' },
	DN25: { di: 27.2, label: 'DN 25 (27.2 mm)' },
	DN32: { di: 35.9, label: 'DN 32 (35.9 mm)' },
	DN40: { di: 41.8, label: 'DN 40 (41.8 mm)' },
	DN50: { di: 53, label: 'DN 50 (53 mm)' }
};

export const mediaProps: Record<Medium, { rho: number; nu: number }> = {
	wasser: { rho: 998, nu: 1.0e-6 }, // 20 °C
	sole30: { rho: 1050, nu: 3.5e-6 } // 30 % Glykol
};

/** Rauhigkeit Stahl [m] */
export const ROUGHNESS_STEEL = 0.045e-3;

export interface PressureLossInput {
	flow: number; // m³/h
	length: number; // m (Vor- + Ruecklauf)
	di: number; // Innendurchmesser [mm]
	zetaSum: number; // Σζ
	rho: number; // [kg/m³]
	nu: number; // [m²/s] kinematic viscosity
	k?: number; // Rauhigkeit [m], default Stahl
}

export interface PressureLossResult {
	v: number; // m/s
	Re: number; // dimensionless Reynolds
	lambda: number; // Rohrreibungszahl
	R: number; // Pa/m
	dpL: number; // Pa (Reibung)
	dpZ: number; // Pa (Einzelverlust)
	dpTotal: number; // Pa
}

/** Hauptberechnung: Druckverlust nach Darcy-Weisbach mit Swamee-Jain-Approximation
 *  fuer Colebrook-White (turbulent) bzw. λ = 64/Re (laminar). */
export function pressureLoss(input: PressureLossInput): PressureLossResult {
	const { flow, length, di, zetaSum, rho, nu, k = ROUGHNESS_STEEL } = input;

	const A = (Math.PI * Math.pow(di / 1000, 2)) / 4; // m²
	const v = flow / 3600 / A; // m/s

	if (v <= 0) {
		return { v: 0, Re: 0, lambda: 0, R: 0, dpL: 0, dpZ: 0, dpTotal: 0 };
	}

	const Re = (v * (di / 1000)) / nu;

	let lambda: number;
	if (Re < 2300) {
		lambda = 64 / Re; // laminar
	} else {
		const term = k / (3.7 * (di / 1000)) + 5.74 / Math.pow(Re, 0.9);
		lambda = 0.25 / Math.pow(Math.log10(term), 2);
	}

	const R = (lambda / (di / 1000)) * ((rho * v * v) / 2); // Pa/m
	const dpL = R * length; // Pa
	const dpZ = zetaSum * ((rho * v * v) / 2); // Pa
	const dpTotal = dpL + dpZ;

	return { v, Re, lambda, R, dpL, dpZ, dpTotal };
}
