// Ventilautoritaet α = ΔpV,100 / (ΔpV,100 + ΔpSystem)
// + Kv-Auswahl und Linearventil-Kennlinie unter α.

/** Uebliche Kvs-Reihe der Hersteller (Stufung etwa ×1.6, Renard R5). */
export const KVS_OPTIONS = [
	0.16, 0.25, 0.4, 0.63, 1.0, 1.6, 2.5, 4.0, 6.3, 10, 16, 25, 40, 63, 100
];

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
	/** Gewählter Standard-Kvs */
	kvs: number;
	/** Faktor Kvs/Kv */
	kvsFactor: number;
	/** Tatsächlicher Druckverlust des gewählten Ventils bei Auslegungsdurchfluss [Pa] */
	dpEffective: number;
}

/** Kvs-Wahl nach Siemens BT_0100: der berechnete Kv ist der ideale Kvs.
 *  Gewählt wird die nächstliegende Normgrösse (auf logarithmischer Skala),
 *  bei Gleichstand die kleinere, weil ein kleineres Ventil die Autorität
 *  erhöht. Beispiel aus der Unterlage: Kv 26 → Kvs 25, nicht 30.
 *
 *  Bis 0.18.6 stand hier "nächstgrösser mit Faktor 1.3". Damit sank der
 *  Druckverlust am Ventil auf etwa 60 % des Auslegungswerts, die Autorität
 *  entsprechend, und das Ventil war systematisch überdimensioniert. */
export function selectKvs(input: KvSelectInput): KvSelectResult {
	const { flow, dpv100 } = input;
	const dpBar = dpv100 / 100000;
	const kv = dpBar > 0 ? flow / Math.sqrt(dpBar) : 0;
	let kvs = KVS_OPTIONS[KVS_OPTIONS.length - 1];
	if (kv <= KVS_OPTIONS[0]) kvs = KVS_OPTIONS[0];
	else if (kv < kvs) {
		const upper = KVS_OPTIONS.findIndex((v) => v >= kv);
		const hi = KVS_OPTIONS[upper];
		const lo = KVS_OPTIONS[upper - 1];
		kvs = Math.log(hi / kv) < Math.log(kv / lo) ? hi : lo;
	}
	const kvsFactor = kv > 0 ? kvs / kv : 0;
	const dpEffective = kvs > 0 ? Math.pow(flow / kvs, 2) * 100000 : 0;
	return { kv, kvs, kvsFactor, dpEffective };
}

/** Linearventil-Kennlinie unter Autoritaet α:
 *  q(h) = h / sqrt(α + (1 − α)·h²), normiert auf [0,1].
 *
 *  Herleitung: konstanter Gesamtdruck ueber Ventil und Strecke, Ventil mit
 *  kv(h) = h·kvs. Bei α = 1 bleibt die Kennlinie linear (q = h), je kleiner
 *  α, desto mehr wird das lineare Ventil zum Schnelloeffner.
 *
 *  Bis 0.16.0 standen α und 1 − α vertauscht: bei α = 1 kam fuer jeden Hub
 *  q = 1 heraus, bei α = 0 eine Gerade — genau verkehrt. Der Text in der
 *  Oberflaeche ("ideal bei α = 1") stimmte, die Kurve darunter nicht. */
export function linearValveCurve(alpha: number, steps = 10): Array<{ h: number; q: number }> {
	const pts: Array<{ h: number; q: number }> = [];
	for (let i = 0; i <= steps; i++) {
		const h = i / steps;
		const denom = Math.sqrt(alpha + (1 - alpha) * h * h);
		const q = denom > 0 ? Math.min(1, h / denom) : 0;
		pts.push({ h: Math.round(h * 100), q });
	}
	return pts;
}
