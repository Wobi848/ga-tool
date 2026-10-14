// Kv-Wert / Ventil-Auslegung
// Grundgleichung: Q [m³/h] = Kv × √(Δp [bar])

export type KvMode = 'kv-from-qdp' | 'dp-from-qkv' | 'q-from-kvdp';

export interface KvInput {
	mode: KvMode;
	flow?: number; // m³/h
	dp?: number; // bar
	kv?: number; // m³/h @ 1 bar
}

export interface KvResult {
	kv: number;
	q: number;
	dp: number;
}

/** Uebliche Kvs-Reihe der Hersteller (Stufung etwa ×1.6, Renard R5). */
export const STANDARD_KVS = [0.25, 0.4, 0.63, 1.0, 1.6, 2.5, 4.0, 6.3, 10, 16, 25, 40, 63, 100];

export function computeKv(input: KvInput): KvResult {
	const { mode, flow = 0, dp = 0, kv = 0 } = input;
	if (mode === 'kv-from-qdp') {
		// Kv = Q / √Δp
		const kvCalc = dp > 0 ? flow / Math.sqrt(dp) : 0;
		return { kv: kvCalc, q: flow, dp };
	}
	if (mode === 'dp-from-qkv') {
		// Δp = (Q / Kv)²
		const dpCalc = kv > 0 ? Math.pow(flow / kv, 2) : 0;
		return { kv, q: flow, dp: dpCalc };
	}
	// q-from-kvdp: Q = Kv × √Δp
	const qCalc = kv * Math.sqrt(Math.max(0, dp));
	return { kv, q: qCalc, dp };
}

/** Naechstgroesserer Standard-Kvs-Wert mit 10 % Reserve */
export function recommendKvs(targetKv: number, reserveFactor = 1.1): number {
	const target = targetKv * reserveFactor;
	return STANDARD_KVS.find((k) => k >= target) ?? STANDARD_KVS[STANDARD_KVS.length - 1];
}

/** Grobe Schwelle fuer die Warnung im Kv-Rechner: Δp_Ventil / 0.5 bar.
 *  Keine echte Ventilautoritaet — dafuer fehlt hier der Druckverlust der
 *  Anlage. Die richtige Rechnung steht in ventilautoritaet.ts. */
export function authority(dpValve: number, dpReference = 0.5): number {
	if (dpReference <= 0) return 0;
	return dpValve / dpReference;
}
