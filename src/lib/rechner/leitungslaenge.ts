// Leitungslaenge / Spannungsfall fuer Kupfer-Niederspannung (24 V DC,
// KNX, BACnet MSTP, RS-485, DALI, ...). Symmetrischer Hin- und Ruecklauf.

/** Spezifischer Widerstand Kupfer bei 20 °C [Ω·mm²/m] */
export const RHO_CU = 0.0178;

/** Standard-Querschnitte [mm²] */
export const STD_SECTIONS = [0.5, 0.75, 1.0, 1.5, 2.5, 4.0];

/** Strombelastbarkeit (vereinfacht) [A] pro Standard-Querschnitt */
export const AMPACITY: Record<number, number> = {
	0.5: 8,
	0.75: 12,
	1.0: 15,
	1.5: 17,
	2.5: 23,
	4.0: 31
};

/** Wie sich die Last verteilt:
 *  - 'end': alle Verbraucher am Leitungsende (Worst-Case)
 *  - 'dist': gleichmaessig verteilt -> halber effektiver Strom */
export type Placement = 'end' | 'dist';

export interface VoltageDropInput {
	/** Speisespannung am Anfang [V] */
	uSource: number;
	/** Leitungslaenge einfach [m] */
	length: number;
	/** Querschnitt [mm²] */
	crossSection: number;
	/** Gesamtstrom aller Geraete [A] */
	current: number;
	/** Verteilung der Last entlang der Leitung */
	placement?: Placement;
	/** Anzahl Geraete (zur Information; Strom ist schon Gesamt) */
	deviceCount?: number;
}

export interface VoltageDropResult {
	/** Effektiver Strom unter Beruecksichtigung der Verteilung [A] */
	Ieff: number;
	/** Schleifenwiderstand (Hin + Rueck) [Ω] */
	rTotal: number;
	/** Spannungsfall [V] */
	deltaU: number;
	/** Spannung am Ende [V] */
	uEnd: number;
	/** Prozentualer Spannungsfall [%] */
	dropPct: number;
}

/** Spannungsfall: ΔU = 2 × L × ρ × I_eff / A (symmetrisch). */
export function voltageDrop(input: VoltageDropInput): VoltageDropResult {
	const { uSource, length, crossSection, current, placement = 'end' } = input;
	const Ieff = placement === 'end' ? current : current * 0.5;
	const rTotal = (2 * length * RHO_CU) / crossSection;
	const deltaU = rTotal * Ieff;
	const uEnd = uSource - deltaU;
	const dropPct = uSource > 0 ? (deltaU / uSource) * 100 : 0;
	return { Ieff, rTotal, deltaU, uEnd, dropPct };
}

/** Maximale Leitungslaenge bis zur Mindestspannung am Geraet. */
export function maxLength(
	uSource: number,
	uMinDevice: number,
	crossSection: number,
	current: number,
	placement: Placement = 'end'
): number {
	const Ieff = placement === 'end' ? current : current * 0.5;
	if (Ieff <= 0) return 0;
	const uDropMax = uSource - uMinDevice;
	if (uDropMax <= 0) return 0;
	return (uDropMax * crossSection) / (2 * RHO_CU * Ieff);
}

/** Erforderlicher Querschnitt und naechster Standardwert. */
export function recommendCrossSection(
	uSource: number,
	uMinDevice: number,
	length: number,
	current: number,
	placement: Placement = 'end'
): { required: number; recommended: number } {
	const Ieff = placement === 'end' ? current : current * 0.5;
	const uDropMax = uSource - uMinDevice;
	if (Ieff <= 0 || uDropMax <= 0) {
		return { required: 0, recommended: STD_SECTIONS[0] };
	}
	const required = (2 * length * RHO_CU * Ieff) / uDropMax;
	const recommended =
		STD_SECTIONS.find((s) => s >= required) ?? STD_SECTIONS[STD_SECTIONS.length - 1];
	return { required, recommended };
}

/** Prueft ob Strombelastbarkeit fuer Standard-Querschnitt nicht ueberschritten. */
export function isCurrentOk(crossSection: number, current: number): boolean {
	const max = AMPACITY[crossSection];
	if (max === undefined) return true;
	return current <= max;
}
