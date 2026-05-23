// Ventilautoritaet α = ΔpV,100 / (ΔpV,100 + ΔpSystem)
// + Kv-Auswahl und Linearventil-Kennlinie unter α.

/** Standard-Kvs-Reihe (R10 / IEC 534). */
export const KVS_OPTIONS = [
	0.16, 0.25, 0.4, 0.63, 1.0, 1.6, 2.5, 4.0, 6.3, 10, 16, 25, 40, 63, 100
];

/** Sicherheitsfaktor fuer Kvs-Auswahl ueber Kv hinaus. */
export const KVS_RESERVE_FACTOR = 1.3;

export interface AuthorityInput {
	/** Druckverlust Ventil bei 100 % Hub [Pa] */
	dpv100: number;
	/** Druckverlust restlicher Kreis (Waermetauscher + Rohre + Fittings) [Pa] */
	dpSystem: number;
}

export type AuthorityRating = 'very-good' | 'good' | 'acceptable' | 'poor';

export interface AuthorityResult {
	alpha: number;
	dpTotal: number;
	rating: AuthorityRating;
}

export function valveAuthority(input: AuthorityInput): AuthorityResult {
	const { dpv100, dpSystem } = input;
	const dpTotal = dpv100 + dpSystem;
	const alpha = dpTotal > 0 ? dpv100 / dpTotal : 0;
	const rating: AuthorityRating =
		alpha >= 0.5 ? 'very-good' : alpha >= 0.3 ? 'good' : alpha >= 0.2 ? 'acceptable' : 'poor';
	return { alpha, dpTotal, rating };
}

export interface KvSelectInput {
	/** Auslegungsdurchfluss [m³/h] */
	flow: number;
	/** Druckverlust Ventil bei 100 % Hub [Pa] */
	dpv100: number;
}

export interface KvSelectResult {
	/** Erforderlicher Kv-Wert bei Auslegung [m³/h] */
	kv: number;
	/** Empfohlener Standard-Kvs */
	kvs: number;
	/** Faktor Kvs/Kv (sollte ≥ Reserve sein) */
	kvsFactor: number;
}

export function selectKvs(input: KvSelectInput): KvSelectResult {
	const { flow, dpv100 } = input;
	const dpBar = dpv100 / 100000;
	const kv = dpBar > 0 ? flow / Math.sqrt(dpBar) : 0;
	const kvMin = kv * KVS_RESERVE_FACTOR;
	const kvs = KVS_OPTIONS.find((v) => v >= kvMin) ?? KVS_OPTIONS[KVS_OPTIONS.length - 1];
	const kvsFactor = kv > 0 ? kvs / kv : 0;
	return { kv, kvs, kvsFactor };
}

/** Linearventil-Kennlinie unter Autoritaet α:
 *  q(h) = h / sqrt(1 − α + α·h²), normiert auf [0,1]. */
export function linearValveCurve(alpha: number, steps = 10): Array<{ h: number; q: number }> {
	const pts: Array<{ h: number; q: number }> = [];
	for (let i = 0; i <= steps; i++) {
		const h = i / steps;
		const denom = Math.sqrt(1 - alpha + alpha * h * h);
		const q = denom > 0 ? Math.min(1, h / denom) : 0;
		pts.push({ h: Math.round(h * 100), q });
	}
	return pts;
}
