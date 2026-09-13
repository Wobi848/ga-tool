/** Waermt den Seiten-Zwischenspeicher vor.
 *
 * Der Service Worker legt eine Seite erst ab, wenn sie besucht wurde. Wer die
 * App installiert und beim ersten Start ohne Netz oeffnet, landet sonst auf
 * der Auffangseite — auch auf der Startseite, denn das Manifest setzt
 * `start_url: '/'`.
 *
 * Deshalb werden die Einstiegsseiten einmal im Hintergrund geholt, sobald der
 * Worker die Kontrolle hat. Nicht die 122 Artikel und nicht die 21 Rechner —
 * nur die Wege, ueber die man zu ihnen kommt.
 */

/** Einstiegsseiten. Bewusst kurz: jeder Eintrag kostet eine Anfrage. */
export const KERNSEITEN = [
	'/',
	'/rechner',
	'/konverter',
	'/wissen',
	'/referenz',
	'/checklisten',
	'/abkuerzungen'
];

/** Muss zum `cacheName` der Navigations-Regel in vite.config.ts passen. */
export const CACHE = 'pages-cache';

let gelaufen = false;

/** Nur fuer Tests: laesst den Lauf noch einmal zu. */
export function _zuruecksetzen() {
	gelaufen = false;
}

/** Holt einen Pfad und legt ihn ab, falls er noch nicht da ist. */
async function holen(cache: Cache, pfad: string): Promise<boolean> {
	// Was schon da ist, nicht noch einmal holen — sonst laedt jeder Start
	// alles nach.
	if (await cache.match(pfad)) return false;
	try {
		const antwort = await fetch(pfad, { credentials: 'same-origin' });
		// Nur verwertbare Antworten ablegen. Eine gespeicherte 500 waere schlimmer
		// als gar nichts: sie ueberlebt den Fehler.
		if (!antwort.ok) return false;
		await cache.put(pfad, antwort.clone());
		return true;
	} catch {
		// Netz weg oder Seite nicht erreichbar — beim naechsten Start wieder.
		return false;
	}
}

/** Wartet auf eine ruhige Minute, faellt auf einen Timer zurueck. */
function beiGelegenheit(fn: () => void) {
	const w = window as Window & {
		requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
	};
	if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(fn, { timeout: 10000 });
	else setTimeout(fn, 3000);
}

/** Will der Benutzer Daten sparen? Dann nur das Noetigste. */
function sparsam(): boolean {
	const n = navigator as Navigator & { connection?: { saveData?: boolean } };
	return n.connection?.saveData === true;
}

export async function warmeSeitenVor(): Promise<number> {
	if (gelaufen) return 0;
	gelaufen = true;

	if (typeof caches === 'undefined' || !navigator.onLine) return 0;

	let gespeichert = 0;
	try {
		const cache = await caches.open(CACHE);
		for (const pfad of KERNSEITEN) {
			if (await holen(cache, pfad)) gespeichert++;
		}

		// Zweite Stufe: die Rechner. Sie sind der Grund, warum das Werkzeug im
		// Technikraum ueberhaupt offline taugen soll — dort ist selten Empfang.
		// Erst wenn der Browser Luft hat, und nicht im Sparmodus.
		if (!sparsam()) {
			beiGelegenheit(async () => {
				try {
					const { rechner } = await import('$lib/rechner');
					for (const r of rechner as Array<{ slug: string }>) {
						await holen(cache, `/rechner/${r.slug}`);
					}
				} catch {
					// Registrierung nicht ladbar — dann eben beim naechsten Start.
				}
			});
		}
	} catch {
		// Kein Zugriff auf den Zwischenspeicher (privates Fenster, blockierte
		// Seitendaten). Die App funktioniert weiter, nur eben nicht offline.
	}
	return gespeichert;
}
