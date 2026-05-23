// Feuchte Luft / Psychrometrie: Vollstaendige Zustandsberechnung aus
// 2 Eingangsgroessen. Setzt auf pSat, dewPoint, absHumidity, enthalpy
// aus _shared auf und ergaenzt um Feuchtkugeltemperatur (Newton-Iteration).

import { pSat, dewPoint, enthalpy, airDensity, absHumidity } from './_shared';

export type PsychroMode = 't-rh' | 't-x' | 't-tdp' | 't-h';
export const STD_PRESSURE = 101325;

export interface PsychroInput {
	mode: PsychroMode;
	/** Trockenkugel-Temperatur [°C] */
	t: number;
	/** rel. Feuchte [%] (Modus t-rh) */
	rh?: number;
	/** Feuchtegehalt [g/kg] (Modus t-x) */
	x?: number;
	/** Taupunkt [°C] (Modus t-tdp) */
	tdp?: number;
	/** Enthalpie [kJ/kg] (Modus t-h) */
	h?: number;
	/** Druck [Pa], default 101'325 */
	pressure?: number;
}

export interface PsychroResult {
	/** Trockenkugel-Temperatur [°C] */
	t: number;
	/** rel. Feuchte [%] */
	rh: number;
	/** Feuchtegehalt x [g/kg trockene Luft] */
	x: number;
	/** Enthalpie [kJ/kg trockene Luft] */
	h: number;
	/** Taupunkt [°C] */
	tdp: number;
	/** Feuchtkugel [°C] */
	tWb: number;
	/** Saettigungsdampfdruck [Pa] */
	pSat: number;
	/** Wasserdampf-Partialdruck [Pa] */
	pw: number;
	/** Luftdichte [kg/m³] */
	rho: number;
	/** Spez. Volumen [m³/kg trockene Luft] */
	v: number;
}

/** Feuchtkugeltemperatur via Newton-Iteration (max 30 Schritte). */
export function wetBulb(t: number, xGkg: number, pressure = STD_PRESSURE): number {
	let tWb = t;
	const xKg = xGkg / 1000;
	for (let i = 0; i < 30; i++) {
		const ps = pSat(tWb);
		const xSatWb = (0.622 * ps) / (pressure - ps);
		const fx = 1.006 * (t - tWb) - (xSatWb - xKg) * (2501 - 2.381 * tWb);
		const dfx =
			-1.006 -
			xSatWb * (1 + (17.62 * 243.12) / Math.pow(243.12 + tWb, 2)) * (2501 - 2.381 * tWb) -
			-2.381 * (xSatWb - xKg);
		if (dfx === 0) break;
		const next = tWb - fx / dfx;
		if (Math.abs(next - tWb) < 0.001) {
			tWb = next;
			break;
		}
		tWb = next;
	}
	return tWb;
}

/** Vollstaendige Zustandsberechnung. Liefert alle Groessen aus den 2 Eingaengen. */
export function psychroState(input: PsychroInput): PsychroResult {
	const { mode, t, rh = 0, x = 0, tdp = 0, h: hIn = 0, pressure = STD_PRESSURE } = input;

	let phi: number; // 0..1
	let xVal: number; // g/kg

	if (mode === 't-rh') {
		phi = rh / 100;
		xVal = absHumidity(t, rh, pressure);
	} else if (mode === 't-x') {
		xVal = x;
		const xKg = xVal / 1000;
		const pw = (xKg * pressure) / (0.622 + xKg);
		phi = pw / pSat(t);
	} else if (mode === 't-tdp') {
		const pw = pSat(tdp);
		phi = pw / pSat(t);
		xVal = ((0.622 * pw) / (pressure - pw)) * 1000;
	} else {
		// t-h: solve x from h = 1.006·t + x·(2501 + 1.86·t)
		const xKg = (hIn - 1.006 * t) / (2501 + 1.86 * t);
		xVal = xKg * 1000;
		const pw = (xKg * pressure) / (0.622 + xKg);
		phi = pw / pSat(t);
	}

	const ps = pSat(t);
	const pw = phi * ps;
	const hCalc = enthalpy(t, xVal);
	const tdpCalc = dewPoint(t, phi * 100);
	const rho = airDensity(t, pressure);
	const v = (1 / rho) * (1 + 1.609 * (xVal / 1000));
	const tWb = wetBulb(t, xVal, pressure);

	return {
		t,
		rh: phi * 100,
		x: xVal,
		h: hCalc,
		tdp: tdpCalc,
		tWb,
		pSat: ps,
		pw,
		rho,
		v
	};
}
