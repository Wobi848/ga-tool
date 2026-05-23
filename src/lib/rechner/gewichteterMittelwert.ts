// Gewichteter Mittelwert: Σ(value × weight) / Σ(weight)
// Anwendung: durchschnittliche Raumtemperatur (gewichtet nach Flaeche),
// Mischtemperaturen, gewichtete Kennzahlen.

export interface WeightedRow {
	value: number;
	weight: number;
}

export interface WeightedResult {
	mean: number | null; // null bei Σweight = 0
	weightSum: number;
	contributions: Array<{
		value: number;
		weight: number;
		/** Anteil am Gesamtgewicht [%] */
		share: number;
		/** Beitrag zum Mittelwert (value × weight / weightSum) */
		contribution: number;
	}>;
}

/** Berechnet gewichteten Mittelwert. Filtert ungueltige Zeilen
 *  (NaN, weight ≤ 0) automatisch aus. */
export function weightedMean(rows: WeightedRow[]): WeightedResult {
	const valid = rows.filter((r) => !isNaN(r.value) && r.weight > 0);
	const weightSum = valid.reduce((s, r) => s + r.weight, 0);
	if (weightSum === 0) {
		return { mean: null, weightSum: 0, contributions: [] };
	}
	const mean = valid.reduce((s, r) => s + r.value * r.weight, 0) / weightSum;
	const contributions = valid.map((r) => ({
		value: r.value,
		weight: r.weight,
		share: (r.weight / weightSum) * 100,
		contribution: (r.value * r.weight) / weightSum
	}));
	return { mean, weightSum, contributions };
}
