// Aussenluftvolumenstrom nach EN 16798-1 (Kategorien I..IV) und
// alternativ ueber CO2-Bilanz. Massgebend ist das Maximum.

export type LuftCat = 'I' | 'II' | 'III' | 'IV';
import { ACTIVITY_CO2_LPH, type Co2Activity } from './co2Regelung';

export type LuftActivity = Co2Activity;

/** Kategorien nach EN 16798-1 mit Auslegungswerten:
 *  - perPerson [l/(s·Person)]
 *  - perArea [l/(s·m²)], schadstoffarmes Gebaeude
 *  - co2 [ppm] zulaessige Erhoehung UEBER der Aussenluft, nicht der
 *    absolute Raumwert. Kategorie II: 800 ppm ueber 420 ppm aussen = 1220 ppm.
 *
 *  Bis 0.16.0 standen die CO2-Werte als absolute Raumwerte da, und davon
 *  wurde die Aussenluft noch einmal abgezogen: bei Kategorie I blieb ein
 *  Δ von 150 statt 550 ppm, der CO2-Luftbedarf war fast viermal zu hoch.
 *  Kategorie IV hiess 1500 statt 1350 ppm. */
export const CATEGORIES: Record<LuftCat, { perPerson: number; perArea: number; co2: number }> = {
	I: { perPerson: 10, perArea: 1.0, co2: 550 },
	II: { perPerson: 7, perArea: 0.7, co2: 800 },
	III: { perPerson: 4, perArea: 0.4, co2: 1350 },
	IV: { perPerson: 2.5, perArea: 0.3, co2: 1350 }
};

/** CO2-Produktion je Person: dieselben Werte wie im CO2-Regelungsrechner. */
export { ACTIVITY_CO2_LPH };

/** CO2-Aussenluft (Default 420 ppm, Stand heute). */
export const CO2_OUTDOOR = 420;

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
	/** CO2 Aussenluft [ppm], default 420 */
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
	/** Hoechstwert CO2 im Raum [ppm] = Aussenluft + Erhoehung der Kategorie */
	co2Target: number;
}

export function luftbedarf(input: LuftbedarfInput): LuftbedarfResult {
	const { area, height, persons, cat, activity, co2Outside = CO2_OUTDOOR } = input;
	const c = CATEGORIES[cat];

	// EN 16798: l/s × 3.6 = m³/h
	const perPerson = c.perPerson * 3.6;
	const perArea = c.perArea * 3.6;
	const flowEN = persons * perPerson + area * perArea;

	// CO2-Bilanz: V̇ = G_CO2 / Δc, Δc ist die zulaessige Erhoehung der Kategorie
	const co2ProdLh = persons * ACTIVITY_CO2_LPH[activity];
	const dc = c.co2;
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
		co2Target: co2Outside + c.co2
	};
}
