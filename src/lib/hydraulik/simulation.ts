/** Hydraulik-Simulator — Ventilkennlinie, Autorität und Betriebsverhalten.
 *
 * Im Konzept als zweiter Simulator neben dem PID-Regler vorgesehen:
 * «Schaltungen interaktiv, Ventilstellung → Durchfluss/Druck sichtbar».
 *
 * Der Punkt, um den es geht: **die Kennlinie, die im Ventilkatalog steht, ist
 * nicht die, die man an der Anlage erlebt.** Dazwischen liegt die
 * Ventilautoritaet. Ein gleichprozentiges Ventil mit a = 0,1 verhaelt sich wie
 * ein lineares, ein lineares wie ein Auf-Zu-Ventil — und dann sucht jemand den
 * Fehler im Regler.
 *
 * Einheiten durchgehend: Durchfluss m³/h, Druck kPa, Kv m³/h bei 1 bar.
 * Der Zusammenhang Q = Kv · √(Δp[bar]) wird als Δp[kPa] = 100 · (Q/Kv)²
 * gerechnet, damit nirgends zwischen bar und kPa umgerechnet werden muss.
 */

export const KENNLINIEN = ['linear', 'gleichprozentig'] as const;
export type Kennlinie = (typeof KENNLINIEN)[number];

export const PUMPENARTEN = ['konstant', 'proportional'] as const;
export type Pumpenart = (typeof PUMPENARTEN)[number];

export interface Auslegung {
	/** Auslegungsdurchfluss bei voll geoeffnetem Ventil, m³/h. */
	q100: number;
	/** Verfuegbarer Differenzdruck im Auslegungspunkt, kPa. */
	dpGesamt: number;
	/** Ventilautoritaet: Anteil des Ventils am Gesamtdruckverlust bei h = 1. */
	autoritaet: number;
	kennlinie: Kennlinie;
	pumpe: Pumpenart;
	/** Stellverhaeltnis Kvs/Kv0 der gleichprozentigen Kennlinie (typisch 25 oder 50). */
	stellverhaeltnis?: number;
}

export interface Betriebspunkt {
	/** Ventilhub 0…1. */
	hub: number;
	/** Durchfluss, m³/h. */
	q: number;
	/** Durchfluss bezogen auf den Auslegungsdurchfluss, 0…1. */
	qRelativ: number;
	/** Druckverlust am Ventil, kPa. */
	dpVentil: number;
	/** Druckverlust im uebrigen Kreis, kPa. */
	dpAnlage: number;
	/** Vom Erzeuger bereitgestellter Differenzdruck, kPa. */
	dpPumpe: number;
	/** Wirksamer Kv-Wert bei diesem Hub, m³/h. */
	kv: number;
}

/** Kvs aus Auslegung: der Wert, den man im Katalog sucht. */
export function kvsAus(a: Auslegung): number {
	const dpVentil100 = a.dpGesamt * a.autoritaet;
	if (dpVentil100 <= 0) return Infinity;
	return a.q100 / Math.sqrt(dpVentil100 / 100);
}

/** Widerstandsbeiwert des uebrigen Kreises: Δp = R · Q². */
export function anlagenwiderstand(a: Auslegung): number {
	const dpAnlage100 = a.dpGesamt * (1 - a.autoritaet);
	if (a.q100 <= 0) return 0;
	return dpAnlage100 / (a.q100 * a.q100);
}

/** Kv beim Hub h — die **Eigenkennlinie** des Ventils, ohne Anlage. */
export function kvBeiHub(a: Auslegung, hub: number): number {
	const kvs = kvsAus(a);
	const h = Math.min(1, Math.max(0, hub));
	if (h <= 0) return 0;
	if (a.kennlinie === 'linear') return kvs * h;
	// Gleichprozentig: gleicher Hubschritt ergibt gleichen **prozentualen**
	// Kv-Zuwachs. Kv(h) = Kv0 · (Kvs/Kv0)^h, mit Kv0 = Kvs / Stellverhaeltnis.
	const n = a.stellverhaeltnis && a.stellverhaeltnis > 1 ? a.stellverhaeltnis : 25;
	return (kvs / n) * Math.pow(n, h);
}

/** Vom Erzeuger bereitgestellter Differenzdruck bei einem Durchfluss. */
export function pumpendruck(a: Auslegung, q: number): number {
	if (a.pumpe === 'konstant') return a.dpGesamt;
	// Proportionaldruck: halber Sollwert bei Q = 0, voller im Auslegungspunkt —
	// so arbeiten die meisten Δp-v-geregelten Pumpen.
	const anteil = a.q100 > 0 ? q / a.q100 : 0;
	return a.dpGesamt * (0.5 + 0.5 * Math.min(1, Math.max(0, anteil)));
}

/** Betriebspunkt bei einem Ventilhub. */
export function betriebspunkt(a: Auslegung, hub: number): Betriebspunkt {
	const h = Math.min(1, Math.max(0, hub));
	const kv = kvBeiHub(a, h);
	const r = anlagenwiderstand(a);

	let q = 0;
	if (kv > 0) {
		// Widerstand des Kreises: Δp(Q) = (R + 100/Kv²) · Q²
		const gesamtR = r + 100 / (kv * kv);
		if (a.pumpe === 'konstant') {
			// Geschlossen loesbar: Δp fest.
			q = Math.sqrt(a.dpGesamt / gesamtR);
		} else {
			// Δp haengt selbst vom Durchfluss ab — Intervallhalbierung.
			// Die Kennlinie faellt nicht, der Widerstand steigt quadratisch;
			// es gibt also genau einen Schnittpunkt.
			let lo = 0;
			let hi = a.q100 * 4;
			for (let i = 0; i < 60; i++) {
				const m = (lo + hi) / 2;
				if (gesamtR * m * m < pumpendruck(a, m)) lo = m;
				else hi = m;
			}
			q = (lo + hi) / 2;
		}
	}

	const dpVentil = kv > 0 ? 100 * (q / kv) ** 2 : pumpendruck(a, 0);
	return {
		hub: h,
		q,
		qRelativ: a.q100 > 0 ? q / a.q100 : 0,
		dpVentil,
		dpAnlage: r * q * q,
		dpPumpe: pumpendruck(a, q),
		kv
	};
}

/** Betriebskennlinie über den ganzen Hub — das, was man an der Anlage erlebt. */
export function betriebskennlinie(a: Auslegung, punkte = 51): Betriebspunkt[] {
	const n = Math.max(2, Math.floor(punkte));
	return Array.from({ length: n }, (_, i) => betriebspunkt(a, i / (n - 1)));
}

/** Eigenkennlinie als relativer Kv — die Kurve aus dem Katalog. */
export function eigenkennlinie(a: Auslegung, punkte = 51): { hub: number; kvRelativ: number }[] {
	const kvs = kvsAus(a);
	const n = Math.max(2, Math.floor(punkte));
	return Array.from({ length: n }, (_, i) => {
		const hub = i / (n - 1);
		return { hub, kvRelativ: kvs > 0 ? kvBeiHub(a, hub) / kvs : 0 };
	});
}

/** Wie stark weicht die erlebte Kennlinie von der gewünschten ab?
 *
 * Gemessen als groesste Abweichung zur Geraden — bei einem gleichprozentigen
 * Ventil ist eine lineare Betriebskennlinie das Ziel, und genau dafuer ist die
 * Autoritaet da. Der Wert ist ein Mass, keine Norm: unter 0,1 fuehlt sich die
 * Regelung gutmuetig an, ueber 0,3 wird sie im unteren Hubbereich unbrauchbar.
 */
export function verzerrung(a: Auslegung): number {
	const kurve = betriebskennlinie(a, 41);
	let max = 0;
	for (const p of kurve) max = Math.max(max, Math.abs(p.qRelativ - p.hub));
	return max;
}

/** Beimischschaltung: Durchfluss im Verbraucher bleibt, die Temperatur wandert.
 *
 * Der Sekundaerkreis hat eine eigene Pumpe; das Dreiwegventil mischt Ruecklauf
 * bei. Geregelt wird damit nicht der Durchfluss, sondern die Vorlauftemperatur.
 *
 * @param hub      Ventilhub 0…1 (0 = ganz beigemischt, 1 = voller Primaerstrom)
 * @param tPrimaer Vorlauftemperatur des Erzeugers, °C
 * @param tRuecklauf Ruecklauftemperatur des Verbrauchers, °C
 */
export function beimischung(
	a: Auslegung,
	hub: number,
	tPrimaer: number,
	tRuecklauf: number
): { tVorlauf: number; mischanteil: number } {
	// Der Primaeranteil folgt derselben Kennlinie wie beim Drosseln — auch hier
	// wirkt die Autoritaet, nur auf die Temperatur statt auf den Durchfluss.
	const anteil = betriebspunkt(a, hub).qRelativ;
	const begrenzt = Math.min(1, Math.max(0, anteil));
	return {
		mischanteil: begrenzt,
		tVorlauf: tRuecklauf + begrenzt * (tPrimaer - tRuecklauf)
	};
}
