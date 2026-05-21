// Shared physical formulas used by multiple calculators

/** Saturation vapour pressure over liquid water [Pa], Magnus formula. tC in °C. */
export function pSat(tC: number): number {
	return 611.2 * Math.exp((17.62 * tC) / (243.12 + tC));
}

/** Dew point [°C] from temperature [°C] and relative humidity [%]. */
export function dewPoint(tC: number, rhPct: number): number {
	const a = 17.62;
	const b = 243.12;
	const phi = rhPct / 100;
	if (phi <= 0) return -Infinity;
	const gamma = Math.log(phi) + (a * tC) / (b + tC);
	return (b * gamma) / (a - gamma);
}

/** Absolute humidity x [g/kg dry air] from t [°C] and rh [%], at p = 101325 Pa. */
export function absHumidity(tC: number, rhPct: number, p = 101325): number {
	const pw = (rhPct / 100) * pSat(tC);
	return ((0.622 * pw) / (p - pw)) * 1000;
}

/** Specific enthalpy of moist air [kJ/kg dry air] from t [°C] and x [g/kg]. */
export function enthalpy(tC: number, xGkg: number): number {
	const x = xGkg / 1000;
	return 1.006 * tC + x * (2501 + 1.86 * tC);
}

/** Air density [kg/m³] at t [°C], p [Pa]. */
export function airDensity(tC: number, p = 101325): number {
	return p / (287.058 * (tC + 273.15));
}

/** Format number with appropriate precision for display. */
export function fmt(n: number, decimals?: number): string {
	if (!isFinite(n)) return '—';
	if (decimals !== undefined) return n.toFixed(decimals);
	const abs = Math.abs(n);
	if (abs === 0) return '0';
	if (abs >= 10000) return n.toFixed(0);
	if (abs >= 100) return n.toFixed(1);
	if (abs >= 10) return n.toFixed(2);
	if (abs >= 1) return n.toFixed(3);
	return n.toPrecision(3);
}

/** Parse a number from text input, accepting comma decimal separator. */
export function parseNum(s: string): number {
	return parseFloat(s.replace(',', '.'));
}
