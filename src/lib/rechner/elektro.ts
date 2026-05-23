// Elektrische Grundgroessen: Ohm, Leistung, AC-Leistungsdreieck,
// Strom aus Leistung, Sicherungsauswahl.

/** Standard-Sicherungen (NIN-konform, MCB Charakteristik B/C) [A]. */
export const STD_FUSE = [6, 10, 13, 16, 20, 25, 32];

/** Sicherheitsfaktor bei Sicherungsauswahl (typ. 25 % Reserve). */
export const FUSE_RESERVE = 1.25;

export type OhmMode = 'R' | 'U' | 'I';

export interface OhmInput {
	mode: OhmMode;
	U: number;
	I: number;
	R: number;
}

/** Ohmsches Gesetz: R = U/I, U = R·I, I = U/R. Liefert das jeweils berechnete
 *  Triplet — die nicht-berechnete Groesse wird durchgereicht. */
export function ohmsLaw({ mode, U, I, R }: OhmInput): { U: number; I: number; R: number } {
	if (mode === 'R') return { R: I !== 0 ? U / I : 0, U, I };
	if (mode === 'U') return { R, U: R * I, I };
	return { R, U, I: R !== 0 ? U / R : 0 };
}

export type PowerMode = 'P' | 'U' | 'I';

export interface PowerInput {
	mode: PowerMode;
	U: number;
	I: number;
	P: number;
}

/** DC- oder Schein-Leistung: P = U·I. */
export function dcPower({ mode, U, I, P }: PowerInput): { U: number; I: number; P: number } {
	if (mode === 'P') return { P: U * I, U, I };
	if (mode === 'U') return { P, U: I !== 0 ? P / I : 0, I };
	return { P, U, I: U !== 0 ? P / U : 0 };
}

export interface AcPowerInput {
	/** Spannung [V] */
	U: number;
	/** Strom [A] */
	I: number;
	/** Leistungsfaktor cos φ */
	cos: number;
}

/** AC-Leistungsdreieck: S (Schein), P (Wirk), Q (Blind). */
export function acPower({ U, I, cos }: AcPowerInput): { S: number; P: number; Q: number } {
	const S = U * I;
	const P = S * cos;
	const Q = Math.sqrt(Math.max(0, S * S - P * P));
	return { S, P, Q };
}

export type CurrentMode = 'dc' | 'ac1' | 'ac3';

/** Strom aus Leistung:
 *  - dc:  I = P / U
 *  - ac1: I = P / (U·cos φ)         (einphasig)
 *  - ac3: I = P / (√3·U·cos φ)      (dreiphasig, U = Aussenleiterspannung) */
export function currentFromPower(mode: CurrentMode, P: number, U: number, cos: number): number {
	if (U <= 0) return 0;
	if (mode === 'dc') return P / U;
	if (cos <= 0) return 0;
	if (mode === 'ac1') return P / (U * cos);
	return P / (Math.sqrt(3) * U * cos);
}

/** Naechstgroessere Standard-Sicherung mit Reserve-Faktor. */
export function recommendFuse(current: number, reserve = FUSE_RESERVE): number | null {
	const needed = current * reserve;
	return STD_FUSE.find((v) => v >= needed) ?? null;
}
