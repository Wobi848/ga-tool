// k-Faktor Volumenstrom (Luft)
// Grundgleichung: Q [m³/h] = k · √(ΔP [Pa])
// Hersteller-spezifischer k ersetzt Geometrie + Durchflussbeiwert α
// aus der Bernoulli-Form Q = α·A·√(2·ΔP/ρ). Gilt bei Luft ≈ 20 °C / 1.013 bar.

export type KFaktorMode = 'q-from-kdp' | 'dp-from-qk' | 'k-from-qdp' | 'k-from-points';

export interface KFaktorInput {
	mode: KFaktorMode;
	flow?: number; // Q in m³/h
	dp?: number; // ΔP in Pa
	k?: number; // k-Faktor (m³/h pro √Pa)
	// nur fuer k-from-points:
	flow1?: number;
	dp1?: number;
	flow2?: number;
	dp2?: number;
}

export interface KFaktorResult {
	k: number;
	q: number; // m³/h
	dp: number; // Pa
	qLs: number; // l/s (Convenience)
}

const M3H_TO_LS = 1000 / 3600;

export function computeKFaktor(input: KFaktorInput): KFaktorResult {
	const { mode } = input;

	if (mode === 'q-from-kdp') {
		const k = input.k ?? 0;
		const dp = Math.max(0, input.dp ?? 0);
		const q = k * Math.sqrt(dp);
		return { k, q, dp, qLs: q * M3H_TO_LS };
	}

	if (mode === 'dp-from-qk') {
		const k = input.k ?? 0;
		const q = input.flow ?? 0;
		const dp = k > 0 ? Math.pow(q / k, 2) : 0;
		return { k, q, dp, qLs: q * M3H_TO_LS };
	}

	if (mode === 'k-from-qdp') {
		const q = input.flow ?? 0;
		const dp = input.dp ?? 0;
		const k = dp > 0 ? q / Math.sqrt(dp) : 0;
		return { k, q, dp, qLs: q * M3H_TO_LS };
	}

	// k-from-points — Mittel zweier Messpunkte
	const q1 = input.flow1 ?? 0;
	const p1 = input.dp1 ?? 0;
	const q2 = input.flow2 ?? 0;
	const p2 = input.dp2 ?? 0;
	const k1 = p1 > 0 ? q1 / Math.sqrt(p1) : 0;
	const k2 = p2 > 0 ? q2 / Math.sqrt(p2) : 0;
	const k = k1 && k2 ? (k1 + k2) / 2 : k1 || k2;
	return { k, q: 0, dp: 0, qLs: 0 };
}

/**
 * Dichtekorrektur. Hersteller-k gilt typisch bei 20 °C / 1.013 bar (ρ ≈ 1.204 kg/m³).
 * Bei abweichender Dichte: k_korr = k · √(ρ_norm / ρ_tatsächlich)
 *
 * Q ∝ √(ΔP / ρ) → bei höherem ρ (kalt/hoher Druck) sinkt Q bei gleichem ΔP,
 * also muss k reduziert werden.
 */
export const RHO_AIR_NORM = 1.204; // kg/m³ bei 20 °C, 1.013 bar trocken

export function correctKForDensity(kNorm: number, rhoActual: number): number {
	if (rhoActual <= 0) return kNorm;
	return kNorm * Math.sqrt(RHO_AIR_NORM / rhoActual);
}

/** Trockene Luftdichte bei T [°C], p [Pa] — vereinfacht ideales Gas */
export function airDensity(tempC: number, pressurePa = 101325): number {
	const R_AIR = 287.058; // J/(kg·K)
	const T = tempC + 273.15;
	return pressurePa / (R_AIR * T);
}

/** Kennlinie: Q-Werte für ΔP-Bereich, für Chart-Darstellung */
export function curve(
	k: number,
	dpMin: number,
	dpMax: number,
	steps = 60
): Array<{ dp: number; q: number }> {
	if (k <= 0 || dpMax <= dpMin) return [];
	const points: Array<{ dp: number; q: number }> = [];
	const step = (dpMax - dpMin) / steps;
	for (let i = 0; i <= steps; i++) {
		const dp = Math.max(0, dpMin + i * step);
		points.push({ dp, q: k * Math.sqrt(dp) });
	}
	return points;
}
