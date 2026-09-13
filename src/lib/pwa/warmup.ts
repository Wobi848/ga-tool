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

/** Hoechstens so viele persoenliche Seiten nachladen. */
export const HOECHSTENS = 30;

/* Die beiden Stores benennen dieselbe Sache unterschiedlich: Favoriten kennen
 * 'artikel', zuletzt Benutztes 'wissen' — beide fuehren nach /wissen. Deshalb
 * hier eine Zuordnung statt zweier Sonderfaelle im Code. */
const PFAD: Record<string, string> = {
	artikel: '/wissen',
	wissen: '/wissen',
	rechner: '/rechner',
	konverter: '/konverter',
	referenz: '/referenz',
	checkliste: '/checklisten'
};

/** Baut aus Typ und Slug den Seitenpfad. `null`, wenn der Typ unbekannt ist. */
export function pfadVon(typ: string, slug: string): string | null {
	const basis = PFAD[typ];
	if (!basis || !slug) return null;
	return `${basis}/${slug}`;
}

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

/** Favoriten und zuletzt Benutztes als Seitenpfade, ohne Dubletten. */
export async function persoenlicheSeiten(): Promise<string[]> {
	const pfade: string[] = [];
	const dazu = (typ: string, slug: string) => {
		const p = pfadVon(typ, slug);
		// Favoriten zuerst, dann zuletzt Gelesenes — wer etwas markiert hat, will
		// es zuverlaessiger haben als das, was er zufaellig zuletzt aufhatte.
		if (p && !pfade.includes(p)) pfade.push(p);
	};

	try {
		const { favorites } = await import('$lib/stores/favorites');
		const { get } = await import('svelte/store');
		for (const f of get(favorites) as Array<{ type: string; slug: string }>) {
			dazu(f.type, f.slug);
		}
	} catch {
		// Store nicht ladbar — dann eben nur das Zuletztbenutzte.
	}

	try {
		const { getRecent } = await import('$lib/stores/recent');
		for (const r of getRecent() as Array<{ type: string; slug: string }>) {
			dazu(r.type, r.slug);
		}
	} catch {
		// Kein Zugriff auf den lokalen Speicher.
	}

	return pfade.slice(0, HOECHSTENS);
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

		// Zweite und dritte Stufe erst, wenn der Browser Luft hat — und nicht,
		// wenn der Benutzer Daten sparen will.
		if (!sparsam()) {
			beiGelegenheit(async () => {
				// Die Rechner. Sie sind der Grund, warum das Werkzeug im Technikraum
				// ueberhaupt offline taugen soll — dort ist selten Empfang.
				try {
					const { rechner } = await import('$lib/rechner');
					for (const r of rechner as Array<{ slug: string }>) {
						await holen(cache, `/rechner/${r.slug}`);
					}
				} catch {
					// Registrierung nicht ladbar — dann eben beim naechsten Start.
				}

				// Und das Persoenliche: Favoriten und zuletzt Gelesenes. Die 122
				// Artikel alle vorzuhalten waeren 122 Anfragen bei jedem Start; was
				// jemand markiert oder gerade gelesen hat, ist dagegen genau das,
				// was er im Keller wieder braucht.
				for (const pfad of await persoenlicheSeiten()) {
					await holen(cache, pfad);
				}
			});
		}
	} catch {
		// Kein Zugriff auf den Zwischenspeicher (privates Fenster, blockierte
		// Seitendaten). Die App funktioniert weiter, nur eben nicht offline.
	}
	return gespeichert;
}
