// Vereinfachte Heizlast-Berechnung pro Raum nach DIN EN 12831 / SIA 384.201
// Hinweis: vereinfacht — keine Sonneneintraege, keine Schichtung, keine
// Nachbarraum-Verluste. Fuer Detailrechnung Fachsoftware verwenden.

export interface Raum {
	id: number;
	label: string;
	/** Solltemperatur innen [°C] */
	ti: number;
	/** Bodenflaeche [m²] */
	area: number;
	/** Lichte Hoehe [m] */
	height: number;
	/** U-Wert Aussenwand [W/(m²·K)] */
	uWall: number;
	/** U-Wert Dach [W/(m²·K)] */
	uRoof: number;
	/** U-Wert Boden gegen Erdreich [W/(m²·K)] */
	uFloor: number;
	/** U-Wert Fenster [W/(m²·K)] */
	uWindow: number;
	/** Fensterflaeche [m²] */
	windowArea: number;
	/** Luftwechsel (Infiltration + Lueftung) [1/h] */
	ach: number;
}

/** Heizlast pro Raum [W] bei gegebener Aussenlufttemperatur te [°C].
 *  Vereinfachung: Umfang ≈ 4 × √Flaeche, Boden gegen Erdreich mit 50 % Abschlag,
 *  Dach voll angerechnet (oberster Raum). */
export function roomLoad(r: Raum, te: number): number {
	const dt = r.ti - te;
	if (dt <= 0) return 0;

	const perimeter = 4 * Math.sqrt(r.area);
	const wallArea = Math.max(0, perimeter * r.height - r.windowArea);

	const qTrans =
		wallArea * r.uWall * dt +
		r.area * r.uRoof * dt +
		r.area * r.uFloor * dt * 0.5 + // 50 % Abschlag fuer Erdreich
		r.windowArea * r.uWindow * dt;

	// Lueftungswaermeverlust: Q = ACH × V × 0.34 × ΔT
	// (0.34 = ρ·cp / 3600 fuer Luft bei ~20 °C in Wh/(m³·K))
	const volume = r.area * r.height;
	const qVent = r.ach * volume * 0.34 * dt;

	return qTrans + qVent;
}

/** Summe der Heizlasten aller Raeume [W]. */
export function totalLoad(rooms: Raum[], te: number): number {
	return rooms.reduce((s, r) => s + roomLoad(r, te), 0);
}

/** Spezifische Heizlast [W/m²]. */
export function specificLoad(rooms: Raum[], te: number): number {
	const totalArea = rooms.reduce((s, r) => s + r.area, 0);
	if (totalArea === 0) return 0;
	return totalLoad(rooms, te) / totalArea;
}

/** Normaussentemperaturen Schweizer Standorte (SIA 384/2 / 381/1). */
export const swissNormOutdoor: Array<{ ort: string; te: number }> = [
	{ ort: 'Zürich', te: -10 },
	{ ort: 'Bern', te: -11 },
	{ ort: 'Basel', te: -9 },
	{ ort: 'Genf', te: -8 },
	{ ort: 'Luzern', te: -10 },
	{ ort: 'St. Gallen', te: -13 },
	{ ort: 'Davos', te: -21 },
	{ ort: 'Lugano', te: -5 },
	{ ort: 'Chur', te: -14 }
];
