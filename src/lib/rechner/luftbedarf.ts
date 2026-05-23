// Aussenluftvolumenstrom nach EN 16798-1 (Kategorien I..IV) und
// alternativ ueber CO2-Bilanz. Massgebend ist das Maximum.

export type LuftCat = 'I' | 'II' | 'III' | 'IV';
export type LuftActivity = 'rest' | 'office' | 'physical';

/** Kategorien nach EN 16798-1 mit Auslegungswerten:
 *  - perPerson [l/(s·Person)]
 *  - perArea [l/(s·m²)]
 *  - co2 [ppm] Zielwert Raumluft */
export const CATEGORIES: Record<LuftCat, { perPerson: number; perArea: number; co2: number }> = {
	I: { perPerson: 10, perArea: 1.0, co2: 550 },
	II: { perPerson: 7, perArea: 0.7, co2: 800 },
	III: { perPerson: 4, perArea: 0.4, co2: 1350 },
	IV: { perPerson: 2.5, perArea: 0.3, co2: 1500 }
};

/** CO2-Atmungs-Produktion [l/h] pro Person je Aktivitaetsniveau. */
export const ACTIVITY_CO2_LPH: Record<LuftActivity, number> = {
	rest: 17,
	office: 19,
	physical: 35
};

/** CO2-Aussenluft (Default 400 ppm). */
export const CO2_OUTDOOR = 400;

export interface LuftbedarfInput {
	/** Flaeche [m²] */
	area: number;
	/** Lichte Hoehe [m] */
	height: number;
	/** Personenzahl */
	persons: number;
	/** EN-Kategorie */
	cat: LuftCat;
	/** Aktivitaet */
	activity: LuftActivity;
	/** CO2 Aussenluft [ppm], default 400 */
	co2Outside?: number;
}

export interface LuftbedarfResult {
	/** Bedarf nach EN 16798 (P + A) [m³/h] */
	flowEN: number;
	/** Bedarf aus CO2-Bilanz [m³/h] */
	flowCO2: number;
	/** Empfehlung: max(flowEN, flowCO2) [m³/h] */
	recommended: number;
	/** Luftwechselrate fuer Empfehlung [1/h] */
	ach: number;
	/** Raumvolumen [m³] */
	volume: number;
	/** Ziel-CO2 der Kategorie [ppm] */
	co2Target: number;
}

export function luftbedarf(input: LuftbedarfInput): LuftbedarfResult {
	const { area, height, persons, cat, activity, co2Outside = CO2_OUTDOOR } = input;
	const c = CATEGORIES[cat];

	// EN 16798: l/s × 3.6 = m³/h
	const perPerson = c.perPerson * 3.6;
	const perArea = c.perArea * 3.6;
	const flowEN = persons * perPerson + area * perArea;

	// CO2-Bilanz: V̇ = G_CO2 / Δc
	const co2ProdLh = persons * ACTIVITY_CO2_LPH[activity];
	const dc = c.co2 - co2Outside;
	const flowCO2 = dc > 0 ? (co2ProdLh * 1000) / dc : 0;

	const recommended = Math.max(flowEN, flowCO2);
	const volume = area * height;
	const ach = volume > 0 ? recommended / volume : 0;

	return {
		flowEN,
		flowCO2,
		recommended,
		ach,
		volume,
		co2Target: c.co2
	};
}
