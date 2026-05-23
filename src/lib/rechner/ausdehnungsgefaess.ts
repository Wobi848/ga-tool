// Membran-Ausdehnungsgefaess (MAG) Auslegung nach SWKI / DIN EN 12828

/** Standard-MAG-Groessen im Handel [l]. */
export const STD_MAG_SIZES = [
	8, 12, 18, 25, 35, 50, 80, 100, 140, 200, 300, 400, 500, 600, 800, 1000
];

/** Wasser-Ausdehnung [%] bei Vorlauftemperatur t [°C]. Interpolation aus
 *  Tabellenwerten 40..110 °C (SWKI). Unter 40 → 40er-Wert, ueber 110 → 110er-Wert. */
export function expansionPct(t: number): number {
	const table: Array<[number, number]> = [
		[40, 0.79],
		[50, 1.21],
		[60, 1.71],
		[70, 2.28],
		[80, 2.9],
		[90, 3.59],
		[100, 4.34],
		[110, 5.15]
	];
	if (t <= table[0][0]) return table[0][1];
	if (t >= table[table.length - 1][0]) return table[table.length - 1][1];
	for (let i = 0; i < table.length - 1; i++) {
		const [t1, e1] = table[i];
		const [t2, e2] = table[i + 1];
		if (t >= t1 && t <= t2) return e1 + ((e2 - e1) * (t - t1)) / (t2 - t1);
	}
	return 0;
}

export interface MagInput {
	/** Anlageninhalt [l] */
	vA: number;
	/** Vorlauf-Auslegungstemperatur [°C] */
	tVorlauf: number;
	/** Vordruck (statisch + 0.3 bar Reserve) [bar] */
	p0: number;
	/** Enddruck (Sicherheitsventil − 0.5 bar) [bar] */
	pE: number;
}

export interface MagResult {
	/** Ausdehnung [%] */
	ePct: number;
	/** Ausdehnungsvolumen [l] */
	ve: number;
	/** Wasservorlage [l] (min. 0.5 % oder 3 l) */
	vWv: number;
	/** Druckfaktor f = (pE + 1) / (pE − p0) */
	druckfaktor: number;
	/** Nennvolumen MAG [l] */
	vN: number;
	/** Empfohlene Standard-Groesse [l] */
	recommended: number;
}

export function sizeMag(input: MagInput): MagResult {
	const { vA, tVorlauf, p0, pE } = input;
	const ePct = expansionPct(tVorlauf);
	const ve = vA * (ePct / 100);
	const vWv = Math.max(vA * 0.005, 3);
	const vBruttoNeeded = ve + vWv;
	const druckfaktor = pE > p0 ? (pE + 1) / (pE - p0) : Infinity;
	const vN = vBruttoNeeded * druckfaktor;
	const recommended = STD_MAG_SIZES.find((s) => s >= vN) ?? STD_MAG_SIZES[STD_MAG_SIZES.length - 1];
	return { ePct, ve, vWv, druckfaktor, vN, recommended };
}

/** Mindest-Vordruck [bar] aus statischer Hoehe + 0.3 bar Reserve. */
export function minP0(staticHeight: number): number {
	return staticHeight / 10 + 0.3;
}
