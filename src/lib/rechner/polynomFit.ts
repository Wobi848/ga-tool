// Polynomial Least-Squares-Fit via Normalengleichungen + Gauss-Elimination.
// Liefert Koeffizienten und R² (Bestimmtheitsmass).
//
// Anwendung in der GA: Sensor-Linearisierung (NTC-Kennlinien, Drucksensoren,
// Volumenstrom aus Differenzdruck), Heizkurven-Approximation aus Messwerten.

export interface PolyPoint {
	x: number;
	y: number;
}

export interface PolyFitResult {
	/** Koeffizienten a0..an des Polynoms y = a0 + a1·x + a2·x² + ... */
	coefficients: number[];
	/** Bestimmtheitsmass R² (1.0 = perfekter Fit, 0 = kein Zusammenhang) */
	r2: number;
	/** Effektiver Grad (wird ggf. verkleinert wenn nicht genug Datenpunkte) */
	degree: number;
}

/** Polynom y = a0 + a1·x + a2·x² + ... an Stelle x auswerten (Horner-Schema). */
export function evaluatePoly(coefficients: number[], x: number): number {
	if (coefficients.length === 0) return 0;
	let result = coefficients[coefficients.length - 1];
	for (let i = coefficients.length - 2; i >= 0; i--) {
		result = result * x + coefficients[i];
	}
	return result;
}

/** Lineares Gleichungssystem A·x = b loesen via Gauss-Jordan mit
 *  partieller Pivotierung. A wird in-place modifiziert. Wirft bei
 *  singulaerer Matrix. */
function solveLinearSystem(A: number[][], b: number[]): number[] {
	const n = b.length;
	const aug: number[][] = A.map((row, i) => [...row, b[i]]);

	for (let i = 0; i < n; i++) {
		// Pivot: groesster Wert in Spalte i unter Zeile i
		let maxRow = i;
		for (let k = i + 1; k < n; k++) {
			if (Math.abs(aug[k][i]) > Math.abs(aug[maxRow][i])) maxRow = k;
		}
		[aug[i], aug[maxRow]] = [aug[maxRow], aug[i]];

		const pivot = aug[i][i];
		if (Math.abs(pivot) < 1e-12) {
			throw new Error(
				'Matrix singular — Datenpunkte ungeeignet (z.B. doppelte x-Werte oder zu wenige Punkte)'
			);
		}

		// Zeile i normieren
		for (let j = i; j <= n; j++) aug[i][j] /= pivot;

		// Andere Zeilen reduzieren
		for (let k = 0; k < n; k++) {
			if (k === i) continue;
			const factor = aug[k][i];
			for (let j = i; j <= n; j++) {
				aug[k][j] -= factor * aug[i][j];
			}
		}
	}

	return aug.map((row) => row[n]);
}

/** Polynom-Fit nach Methode der kleinsten Quadrate.
 *  @param points Mindestens degree+1 Datenpunkte mit eindeutigen x-Werten.
 *  @param degree Polynom-Grad (1=linear, 2=quadratisch, ..., max 10 praktisch).
 *  @returns Koeffizienten + R².
 *  @throws bei zu wenig Datenpunkten oder linear abhaengigen x-Werten. */
export function fitPolynomial(points: PolyPoint[], degree: number): PolyFitResult {
	const m = points.length;
	if (m < 2) {
		throw new Error('Mindestens 2 Datenpunkte erforderlich');
	}
	if (degree < 1) {
		throw new Error('Grad muss >= 1 sein');
	}

	// Falls zu wenig Punkte fuer den gewuenschten Grad: Grad reduzieren auf m-1
	// (m Punkte koennen exakt durch ein Polynom Grad m-1 gehen).
	const effectiveDegree = Math.min(degree, m - 1);
	const n = effectiveDegree + 1; // Anzahl Koeffizienten

	// Normalengleichungen: A·a = b mit
	//   A[i][j] = Σ x_k^(i+j)
	//   b[i]    = Σ y_k · x_k^i
	const A: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
	const b: number[] = new Array(n).fill(0);

	for (const { x, y } of points) {
		for (let i = 0; i < n; i++) {
			b[i] += y * Math.pow(x, i);
			for (let j = 0; j < n; j++) {
				A[i][j] += Math.pow(x, i + j);
			}
		}
	}

	const coefficients = solveLinearSystem(A, b);

	// R² = 1 - SS_res / SS_tot
	const yMean = points.reduce((sum, p) => sum + p.y, 0) / m;
	let ssRes = 0;
	let ssTot = 0;
	for (const { x, y } of points) {
		const yHat = evaluatePoly(coefficients, x);
		ssRes += (y - yHat) ** 2;
		ssTot += (y - yMean) ** 2;
	}
	const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

	return { coefficients, r2, degree: effectiveDegree };
}

/** Liefert n+1 Punkte gleichverteilt auf [xMin, xMax] mit Polynom-Werten.
 *  Fuer Chart-Darstellung der Fit-Kurve. */
export function polynomialCurve(
	coefficients: number[],
	xMin: number,
	xMax: number,
	steps = 50
): PolyPoint[] {
	const pts: PolyPoint[] = [];
	if (steps < 1 || xMax <= xMin) return pts;
	for (let i = 0; i <= steps; i++) {
		const x = xMin + ((xMax - xMin) * i) / steps;
		pts.push({ x, y: evaluatePoly(coefficients, x) });
	}
	return pts;
}

/** Formatiert das Polynom als lesbaren String, z.B. "2.5 + 1.3·x - 0.04·x²". */
export function formatPolynomial(coefficients: number[], precision = 4): string {
	const terms: string[] = [];
	for (let i = 0; i < coefficients.length; i++) {
		const a = coefficients[i];
		if (Math.abs(a) < 10 ** -precision) continue;

		const absVal = Math.abs(a)
			.toPrecision(precision)
			.replace(/\.?0+$/, '');
		const sign = a < 0 ? ' − ' : terms.length === 0 ? '' : ' + ';
		const x = i === 0 ? '' : i === 1 ? '·x' : `·x${superscript(i)}`;
		terms.push(`${sign}${absVal}${x}`);
	}
	return terms.length === 0 ? '0' : terms.join('').trim();
}

function superscript(n: number): string {
	const map = '⁰¹²³⁴⁵⁶⁷⁸⁹';
	return String(n)
		.split('')
		.map((d) => map[+d])
		.join('');
}
