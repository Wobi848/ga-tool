// CO2-Lueftungsbilanz: Auslegung des Aussenluftvolumenstroms aus
// CO2-Quelle und Zielwert sowie Raumdynamik bei festem Volumenstrom.

export type Co2Activity = 'rest' | 'office' | 'physical';

/** CO2-Produktion [l/h] pro Person je nach Taetigkeit. */
export const ACTIVITY_CO2_LPH: Record<Co2Activity, number> = {
	rest: 12,
	office: 18,
	physical: 35
};

export interface Co2DesignInput {
	/** Raumvolumen [m³] */
	volume: number;
	/** Personenzahl */
	persons: number;
	/** Taetigkeitsniveau */
	activity: Co2Activity;
	/** CO2-Konzentration Aussenluft [ppm] */
	co2Outside: number;
	/** CO2-Zielkonzentration im Raum [ppm] */
	co2Target: number;
}

export interface Co2RoomInput {
	volume: number;
	persons: number;
	activity: Co2Activity;
	co2Outside: number;
	/** Aussenluftvolumenstrom [m³/h] */
	flowRate: number;
}

export interface Co2Result {
	/** Aussenluftvolumenstrom [m³/h] */
	q: number;
	/** Luftwechselrate [1/h] */
	ach: number;
	/** Zeitkonstante τ = V/q [min] */
	tau: number;
	/** Stationaere CO2-Konzentration im Raum [ppm] */
	steadyState: number;
	/** Zeit bis 90 % der Endwert-Differenz erreicht ist [min] */
	t90: number;
}

/** Berechnet erforderlichen Volumenstrom fuer Ziel-CO2. Liefert null wenn
 *  Ziel <= Aussenwert (unphysikalisch). */
export function co2Design(input: Co2DesignInput): Co2Result | null {
	const { volume, persons, activity, co2Outside, co2Target } = input;
	if (co2Target <= co2Outside) return null;
	const gM3 = (ACTIVITY_CO2_LPH[activity] * persons) / 1000; // m³/h
	const q = (gM3 * 1e6) / (co2Target - co2Outside); // m³/h
	const ach = volume > 0 ? q / volume : 0;
	const tauHr = q > 0 ? volume / q : 0;
	const tau = tauHr * 60; // min
	const steadyState = co2Outside + (gM3 * 1e6) / q;
	return { q, ach, tau, steadyState, t90: tau * 2.3 };
}

/** Berechnet Stationaerwert und Zeitkonstante bei vorgegebenem Volumenstrom. */
export function co2RoomBehavior(input: Co2RoomInput): Co2Result | null {
	const { volume, persons, activity, co2Outside, flowRate } = input;
	if (flowRate <= 0) return null;
	const gM3 = (ACTIVITY_CO2_LPH[activity] * persons) / 1000;
	const steadyState = co2Outside + (gM3 * 1e6) / flowRate;
	const tau = (volume / flowRate) * 60; // min
	const t90 = tau * 2.3;
	const ach = volume > 0 ? flowRate / volume : 0;
	return { q: flowRate, ach, tau, steadyState, t90 };
}

/** CO2-Anstiegskurve im Raum bei Stufenanregung (0 → steadyState).
 *  Liefert Punkte (t in min, c in ppm) ueber mehrere τ-Vielfache. */
export function co2Curve(
	startCo2: number,
	steadyState: number,
	tauMin: number,
	stepsOfTau: number[] = [0, 0.5, 1, 1.5, 2, 2.5, 3]
): Array<{ t: number; co2: number }> {
	return stepsOfTau.map((k) => ({
		t: Math.round(k * tauMin),
		co2: Math.round(steadyState - (steadyState - startCo2) * Math.exp(-k))
	}));
}
