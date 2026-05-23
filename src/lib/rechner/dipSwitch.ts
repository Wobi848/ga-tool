// DIP-Switch Adresskodierung: Umwandlung Adresse <-> Schalterstellungen
// mit konfigurierbarer Bit-Reihenfolge (MSB links/rechts) und invertierter
// Logik (ON = 0 statt ON = 1).

export interface DipOptions {
	/** Anzahl Schalter (2..16) */
	switchCount: number;
	/** Wenn true: Schalter 1 = MSB. Sonst: Schalter 1 = LSB. */
	msbLeft: boolean;
	/** Wenn true: ON entspricht Bit 0, OFF entspricht Bit 1 */
	invertedLogic: boolean;
}

/** Bit-Position fuer Schalter i (0-basiert) bei gegebenen Options. */
export function bitPosition(i: number, opts: DipOptions): number {
	return opts.msbLeft ? opts.switchCount - 1 - i : i;
}

/** Wertigkeit des Schalters i (1, 2, 4, ...) je nach msbLeft. */
export function bitValue(i: number, opts: DipOptions): number {
	return 1 << bitPosition(i, opts);
}

/** Liefert true/false fuer jeden Schalter (sichtbare ON-Position). */
export function switchStates(address: number, opts: DipOptions): boolean[] {
	const out: boolean[] = [];
	for (let i = 0; i < opts.switchCount; i++) {
		const bit = (address >> bitPosition(i, opts)) & 1;
		out.push(opts.invertedLogic ? bit === 0 : bit === 1);
	}
	return out;
}

/** Adresse nach Umschalten von Schalter i. */
export function toggleBit(address: number, i: number, opts: DipOptions): number {
	return address ^ (1 << bitPosition(i, opts));
}

/** Beschneidet Adresse auf gueltigen Bereich. */
export function clampAddress(address: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, address));
}

/** Bauen Adresse aus Schalterzustaenden zurueck. */
export function statesToAddress(states: boolean[], opts: DipOptions): number {
	let addr = 0;
	for (let i = 0; i < opts.switchCount && i < states.length; i++) {
		const bit = opts.invertedLogic ? !states[i] : states[i];
		if (bit) addr |= 1 << bitPosition(i, opts);
	}
	return addr;
}

/** Binaer-Darstellung mit fester Laenge. */
export function toBinary(address: number, switchCount: number): string {
	return address.toString(2).padStart(switchCount, '0');
}

/** Hexadezimale Darstellung (Grossbuchstaben, gepolstert). */
export function toHex(address: number, switchCount: number): string {
	return address
		.toString(16)
		.toUpperCase()
		.padStart(Math.ceil(switchCount / 4), '0');
}
