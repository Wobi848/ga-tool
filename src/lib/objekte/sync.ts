/** Abgleich der Objektverwaltung mit dem Server.
 *
 * Der Server ist die Wahrheit, der `localStorage` der Offline-Zwischenspeicher
 * — nicht umgekehrt. Geaendert wird immer zuerst lokal: die Eingabe darf nie
 * auf das Netz warten, im Technikraum ist selten Empfang.
 *
 * Ohne Anmeldung passiert hier gar nichts. Die App laeuft ohne Konto, dann
 * eben nur auf diesem Geraet — so wie bisher.
 */

import { browser } from '$app/environment';
import { ladeBestand, speichereBestand } from './store';
import type { Anlage, Bestand, Durchlauf, Objekt } from './types';

/** Was ueber die Leitung geht. */
export interface Stand {
	objekte: Objekt[];
	anlagen: Anlage[];
	durchlaeufe: Durchlauf[];
}

export type Ergebnis =
	| { ok: true; abgeglichenAm: number }
	| { ok: false; grund: 'nicht-angemeldet' | 'kein-netz' | 'fehler' };

/** Mischt zwei Listen je Datensatz: der juengere `geaendertAm` gewinnt.
 *
 * Bewusst simpel. Ein Techniker arbeitet an einem Durchlauf selten gleichzeitig
 * auf zwei Geraeten; eine echte Zusammenfuehrung waere viel Aufwand fuer einen
 * seltenen Fall. Wichtig ist, dass die Regel **aufgeschrieben** ist — sonst
 * raetselt spaeter jemand, warum ein Haken weg ist.
 */
export function mischeListe<T extends { id: string; geaendertAm: number }>(
	lokal: T[],
	fremd: T[]
): T[] {
	const nach = new Map(lokal.map((x) => [x.id, x]));
	for (const s of fremd) {
		const l = nach.get(s.id);
		// Bei Gleichstand gewinnt der Server: so laufen zwei Geraete nicht
		// dauerhaft auseinander, wenn beide denselben Zeitstempel tragen.
		if (!l || l.geaendertAm <= s.geaendertAm) nach.set(s.id, s);
	}
	return [...nach.values()];
}

export function mischen(lokal: Bestand, fremd: Stand): Bestand {
	return {
		...lokal,
		objekte: mischeListe(lokal.objekte, fremd.objekte ?? []),
		anlagen: mischeListe(lokal.anlagen, fremd.anlagen ?? []),
		durchlaeufe: mischeListe(lokal.durchlaeufe, fremd.durchlaeufe ?? [])
	};
}

let laeuft: Promise<Ergebnis> | null = null;

export async function abgleichen(): Promise<Ergebnis> {
	if (!browser) return { ok: false, grund: 'fehler' };
	// Zwei Abgleiche gleichzeitig wuerden sich gegenseitig ueberholen.
	if (laeuft) return laeuft;
	laeuft = durchfuehren().finally(() => {
		laeuft = null;
	});
	return laeuft;
}

async function durchfuehren(): Promise<Ergebnis> {
	const lokal = ladeBestand();
	let antwort: Response;
	try {
		antwort = await fetch('/api/objekte', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'same-origin',
			body: JSON.stringify({
				objekte: lokal.objekte,
				anlagen: lokal.anlagen,
				durchlaeufe: lokal.durchlaeufe
			})
		});
	} catch {
		return { ok: false, grund: 'kein-netz' };
	}

	if (antwort.status === 401) return { ok: false, grund: 'nicht-angemeldet' };
	if (!antwort.ok) return { ok: false, grund: 'fehler' };

	let fremd: Stand;
	try {
		fremd = await antwort.json();
	} catch {
		return { ok: false, grund: 'fehler' };
	}

	// Frisch laden statt `lokal` zu benutzen: zwischen Absenden und Antwort kann
	// jemand weitergearbeitet haben, und diese Aenderung darf nicht verlorengehen.
	const jetztLokal = ladeBestand();
	const gemischt = mischen(jetztLokal, fremd);
	gemischt.abgeglichenAm = Date.now();
	speichereBestand(gemischt);
	return { ok: true, abgeglichenAm: gemischt.abgeglichenAm };
}

/** Wann zuletzt erfolgreich abgeglichen wurde, oder `null`. */
export function zuletztAbgeglichen(): number | null {
	return ladeBestand().abgeglichenAm ?? null;
}
