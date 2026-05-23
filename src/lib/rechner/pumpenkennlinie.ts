// Pumpenkennlinie und Betriebspunkt-Bestimmung.
// Parabolische Approximation: H_P(Q) = H0 × (1 − (Q/Q0)²)
// Rohrnetz: H_R(Q) = R × Q² mit R aus Auslegungspunkt.

export interface PumpInput {
	/** Foerderhoehe bei Q=0 (Nulldruck) [m WS] */
	h0: number;
	/** Volumenstrom bei H=0 (Nullfoerderstrom) [m³/h] */
	q0: number;
}

export interface NetworkInput {
	/** Auslegungs-Volumenstrom [m³/h] */
	qDesign: number;
	/** Auslegungs-Foerderhoehe = Druckverlust Rohrnetz [m WS] */
	hDesign: number;
}

export interface OperatingPoint {
	/** Volumenstrom im Betriebspunkt [m³/h] */
	q: number;
	/** Foerderhoehe im Betriebspunkt [m] */
	h: number;
}

/** Parabolische Pumpenkennlinie. */
export function pumpHead(q: number, p: PumpInput): number {
	if (p.q0 <= 0) return 0;
	return p.h0 * (1 - Math.pow(q / p.q0, 2));
}

/** Quadratische Rohrnetzkennlinie. */
export function networkHead(q: number, n: NetworkInput): number {
	if (n.qDesign <= 0) return 0;
	const r = n.hDesign / (n.qDesign * n.qDesign);
	return r * q * q;
}

/** Betriebspunkt = Schnittpunkt H_P(Q) = H_R(Q).
 *  Analytische Loesung: Q_B = √( H0 / (R + H0/Q0²) ).
 *  Liefert null bei nicht-physikalischen Eingaben (negative Werte, Q ueber 5 % ueber Q0). */
export function operatingPoint(pump: PumpInput, net: NetworkInput): OperatingPoint | null {
	if (net.qDesign <= 0 || net.hDesign <= 0 || pump.q0 <= 0 || pump.h0 <= 0) return null;
	const r = net.hDesign / (net.qDesign * net.qDesign);
	const denominator = r + pump.h0 / (pump.q0 * pump.q0);
	if (denominator <= 0) return null;
	const qB = Math.sqrt(pump.h0 / denominator);
	const hB = pumpHead(qB, pump);
	if (qB <= 0 || hB <= 0 || qB > pump.q0 * 1.05) return null;
	return { q: qB, h: hB };
}

/** Kurvenpunkte fuer Diagramm: gleichmaessige q-Verteilung von 0 bis q0 × 1.05. */
export function pumpCurve(
	pump: PumpInput,
	net: NetworkInput,
	steps = 10
): Array<{ q: number; hp: number; hr: number }> {
	const pts: Array<{ q: number; hp: number; hr: number }> = [];
	const qMax = pump.q0 * 1.05;
	for (let i = 0; i <= steps; i++) {
		const q = (i / steps) * qMax;
		pts.push({
			q,
			hp: Math.max(0, pumpHead(q, pump)),
			hr: networkHead(q, net)
		});
	}
	return pts;
}
