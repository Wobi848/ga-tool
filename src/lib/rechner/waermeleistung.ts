// Waermeleistung: Q = ṁ × cp × ΔT
// Drei Modi: Q aus Volumenstrom+ΔT, Volumenstrom aus Q+ΔT, ΔT aus Q+Volumenstrom.

export type WaermeMode = 'q-from-flow' | 'flow-from-q' | 'dt-from-q';
export type WaermeMedium = 'wasser' | 'sole30' | 'sole40' | 'luft';

/** Stoffwerte (cp [kJ/(kg·K)], rho [kg/m³]) bei typischen Auslegungsbedingungen. */
export const MEDIA_PROPS: Record<WaermeMedium, { cp: number; rho: number }> = {
	wasser: { cp: 4.182, rho: 1000 },
	sole30: { cp: 3.78, rho: 1050 },
	sole40: { cp: 3.6, rho: 1065 },
	luft: { cp: 1.006, rho: 1.2 }
};

export interface WaermeInput {
	mode: WaermeMode;
	medium: WaermeMedium;
	/** Volumenstrom [m³/h] */
	flow: number;
	/** Temperaturspreizung [K] */
	dt: number;
	/** Waermeleistung [kW] — fuer inverse Modi */
	q: number;
}

export interface WaermeResult {
	/** Waermeleistung [kW] */
	Q: number;
	/** Volumenstrom [m³/h] */
	flow: number;
	/** ΔT [K] */
	dt: number;
	/** Massenstrom [kg/s] */
	mDot: number;
}

/** Q = ṁ × cp × ΔT mit ṁ = (V̇/3600) × ρ. */
export function waermeleistung(input: WaermeInput): WaermeResult {
	const { mode, medium, flow, dt, q } = input;
	const { cp, rho } = MEDIA_PROPS[medium];

	if (mode === 'q-from-flow') {
		const mDot = (flow / 3600) * rho;
		const Q = mDot * cp * dt;
		return { Q, flow, dt, mDot };
	}
	if (mode === 'flow-from-q') {
		if (rho <= 0 || cp <= 0 || dt === 0) return { Q: q, flow: 0, dt, mDot: 0 };
		const flowCalc = (q / (rho * cp * dt)) * 3600;
		const mDot = (flowCalc / 3600) * rho;
		return { Q: q, flow: flowCalc, dt, mDot };
	}
	// dt-from-q
	const mDot = (flow / 3600) * rho;
	if (mDot <= 0 || cp <= 0) return { Q: q, flow, dt: 0, mDot };
	const dtCalc = q / (mDot * cp);
	return { Q: q, flow, dt: dtCalc, mDot };
}
