import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { ensureSystemAdmin } from '$lib/server/bootstrap';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { anmeldepflichtImOffenenNetz, immerErlaubt, kommtDurchDenTunnel } from '$lib/server/zugang';

// Einmaliger Boot-Check: alten Deployments ohne systemadmin nachträglich
// einen aus dem ältesten admin promoten. Während des Builds (Prerender)
// skippen — da ist die DB i.d.R. nicht erreichbar / leer.
if (!building) {
	ensureSystemAdmin().catch((e) => console.error('[bootstrap] systemadmin promotion failed:', e));
}

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

/* Schutz-Kopfzeilen.
 *
 * Seit dem 14.09.2026 steht das Portal ueber `tailscale funnel` im offenen
 * Netz. Vorher kam nur ins Tailnet, wer ohnehin schon Zugang hatte; jetzt
 * klopft das ganze Internet an. Bis dahin lieferte die App keine einzige
 * dieser Kopfzeilen — nachgemessen, nicht vermutet.
 *
 * Die eigentliche Inhaltsrichtlinie (CSP) setzt SvelteKit selbst, siehe
 * `kit.csp` in svelte.config.js: nur von dort kommen die Nonces fuer die
 * eigenen Skripte.
 */
const handleSchutzkopfzeilen: Handle = async ({ event, resolve }) => {
	const antwort = await resolve(event);

	// Kein Raten am Inhaltstyp vorbei.
	antwort.headers.set('X-Content-Type-Options', 'nosniff');
	// Nicht in fremde Rahmen einbetten lassen — die Anmeldemaske waere sonst
	// ein Ziel fuer Klickbetrug. Doppelt zur CSP-Regel `frame-ancestors`,
	// weil aeltere Browser nur diese hier kennen.
	antwort.headers.set('X-Frame-Options', 'DENY');
	// Beim Weg nach aussen nur die Herkunft mitgeben, nicht den ganzen Pfad.
	antwort.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	// Zugriff auf Kamera, Mikrofon und Ort braucht diese App nicht.
	antwort.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// Nicht in Suchmaschinen. robots.txt sagt dasselbe, aber nur fuer Crawler,
	// die sie vorher lesen — diese Kopfzeile wirkt auch dann, wenn eine Seite
	// ueber einen direkten Verweis erreicht wird. Beides haelt allerdings nur
	// gesittete Crawler zurueck; gegen jemanden, der die Adresse kennt, hilft
	// allein eine Anmeldung.
	antwort.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

	// HSTS nur dort, wo tatsaechlich ueber TLS zugegriffen wird. Auf der
	// LAN-Adresse waere es schaedlich: der Browser wuerde danach auf http
	// nichts mehr laden.
	if (event.url.protocol === 'https:') {
		antwort.headers.set('Strict-Transport-Security', 'max-age=31536000');
	}

	return antwort;
};

/* Ueber die oeffentliche Adresse nur mit Anmeldung.
 *
 * Seit dem 14.09.2026 ist das Portal ueber `tailscale funnel` erreichbar —
 * damit es von einem Rechner ohne Tailscale aus geht, nicht damit es jeder
 * lesen kann. Wer ueber `https://host1.tail4ad0d6.ts.net` kommt, sieht deshalb
 * die Anmeldemaske und sonst nichts.
 *
 * Im Heimnetz, also direkt auf `http://192.168.178.68:3700`, aendert sich
 * nichts: dort bleibt die App ohne Konto benutzbar.
 *
 * Anders als zunaechst gedacht trifft das auch Geraete im Tailnet — siehe die
 * Anmerkung bei `kommtDurchDenTunnel`. Einmal anmelden je Geraet, dann haelt
 * die Sitzung.
 *
 * Der Reihenfolge wegen laeuft dieser Schritt **nach** der Anmeldepruefung —
 * vorher gaebe es `locals.user` noch nicht.
 */
const handleOeffentlicherZugang: Handle = async ({ event, resolve }) => {
	if (
		!event.locals.user &&
		anmeldepflichtImOffenenNetz() &&
		kommtDurchDenTunnel(event.request) &&
		!immerErlaubt(event.url.pathname)
	) {
		// Bewusst eine zurueckgegebene Antwort statt `redirect()`: das wirft, und
		// ein geworfener Redirect laeuft an den umschliessenden Handles vorbei.
		// Die Schutzkopfzeilen fehlten dadurch ausgerechnet auf der Antwort, die
		// ein Crawler als Erstes sieht — am 14.09.2026 genau so beobachtet, und
		// Umsortieren allein hat es nicht behoben.
		return new Response(null, { status: 303, headers: { location: '/login' } });
	}
	return resolve(event);
};

/* Die Schutzkopfzeilen stehen **zuerst**, damit sie alles Weitere umschliessen.
 * Innen gesetzt fehlten sie bei jeder Umleitung: die Zugangsschranke wirft
 * einen Redirect, und was danach kaeme, lief nie. Am 14.09.2026 genau so
 * beobachtet — `X-Robots-Tag` fehlte ausgerechnet auf der Antwort, die ein
 * Crawler als Erstes sieht. */
export const handle: Handle = sequence(
	handleSchutzkopfzeilen,
	handleBetterAuth,
	handleOeffentlicherZugang
);
