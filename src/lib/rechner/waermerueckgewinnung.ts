// Waermerueckgewinnung (WRG) in RLT-Anlagen: berechnet Zulufttemperatur,
// rueckgewonnene Leistung, Feuchtebilanz und Energieersparnis.

export type WrgType = 'kreuzgegenstrom' | 'rotations' | 'platte' | 'laufrad';

/** Typische η-Bereiche pro WRG-Typ (T = Temperatur, F = Feuchte). */
export const WRG_TYPES: Record<WrgType, { etaH: [number, number]; etaF: [number, number] }> = {
	kreuzgegenstrom: { etaH: [0.7, 0.9], etaF: [0.5, 0.8] },
	rotations: { etaH: [0.7, 0.85], etaF: [0.6, 0.85] },
	platte: { etaH: [0.5, 0.8], etaF: [0.0, 0.0] },
	laufrad: { etaH: [0.4, 0.65], etaF: [0.0, 0.0] }
};

/** Spez. Luft-Parameter (typisch). */
const RHO_AIR = 1.2; // kg/m³
const CP_AIR = 1005; // J/(kg·K)
const P_AMB = 101325; // Pa
const X_OUTDOOR_DEFAULT = 0.002; // kg/kg bei -5 °C, ~80 % rH

/** Annahmen fuer Ersparnis-Rechnung. */
export const ANNUAL_HOURS = 2000;
export const ENERGY_PRICE_CHF_KWH = 0.12;

export interface WrgInput {
	/** Volumenstrom [m³/h] */
	q: number;
	/** Ablufttemperatur (innen) [°C] */
	tAbluft: number;
	/** Aussenlufttemperatur [°C] */
	tAussenluft: number;
	/** rel. Feuchte Abluft [%] */
	rhAbluft: number;
	/** Temperaturrueckgewinnungsgrad [-] */
	etaT: number;
	/** Feuchtewirkungsgrad [-] (0 wenn kein Feuchtetausch) */
	etaF: number;
}

export interface WrgResult {
	/** Zulufttemperatur nach WRG [°C] */
	tZuluft: number;
	/** Rueckgewonnene Leistung [W] */
	qRecovered: number;
	/** Theoretisch maximale Leistung [W] (η=1) */
	qMax: number;
	/** Ersparnis [%] */
	savingsPercent: number;
	/** Abluft-Feuchtegehalt [kg/kg] */
	xAb: number;
	/** Zuluft-Feuchtegehalt nach WRG [kg/kg] */
	xZuluft: number;
	/** Jaehrliche Energieersparnis [kWh] */
	annualKwh: number;
	/** Jaehrliche Kostenersparnis [CHF] */
	annualChf: number;
}

/** Magnus-Naeherung: Saettigungsdampfdruck ueber Wasser [Pa]. */
function pSatMagnus(t: number): number {
	return 610.78 * Math.exp((17.27 * t) / (t + 237.3));
}

export function wrgBilanz(input: WrgInput): WrgResult {
	const { q, tAbluft, tAussenluft, rhAbluft, etaT, etaF } = input;

	const dt = tAbluft - tAussenluft;
	const tZuluft = tAussenluft + etaT * dt;

	const flowKgS = (q / 3600) * RHO_AIR;
	const qRecovered = flowKgS * CP_AIR * (tZuluft - tAussenluft);
	const qMax = flowKgS * CP_AIR * dt;

	// Feuchtebilanz: x_Abluft aus rH × pSat
	const pSatAb = pSatMagnus(tAbluft);
	const pwAb = (rhAbluft / 100) * pSatAb;
	const xAb = (0.622 * pwAb) / (P_AMB - pwAb);
	const xAussen = X_OUTDOOR_DEFAULT;
	const xZuluft = xAussen + etaF * (xAb - xAussen);

	const savingsPercent = qMax > 0 ? (qRecovered / qMax) * 100 : 0;
	const annualKwh = (qRecovered / 1000) * ANNUAL_HOURS;
	const annualChf = annualKwh * ENERGY_PRICE_CHF_KWH;

	return {
		tZuluft,
		qRecovered,
		qMax,
		savingsPercent,
		xAb,
		xZuluft,
		annualKwh,
		annualChf
	};
}
