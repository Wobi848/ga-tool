import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { ensureSystemAdmin } from '$lib/server/bootstrap';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { redirect } from '@sveltejs/kit';
import {
	anmeldepflichtImOffenenNetz,
	immerErlaubt,
	istAusDemOffenenNetz
} from '$lib/server/zugang';

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

/* Aus dem offenen Netz nur mit Anmeldung.
 *
 * Seit dem 14.09.2026 ist das Portal ueber `tailscale funnel` oeffentlich
 * erreichbar — damit es von einem Rechner ohne Tailscale aus geht, nicht damit
 * es jeder lesen kann. Wer von aussen kommt, sieht deshalb die Anmeldemaske
 * und sonst nichts.
 *
 * Aus dem Tailnet und im LAN aendert sich nichts: dort ist die App weiterhin
 * ohne Konto benutzbar. Unterschieden wird an der Kopfzeile, die
 * `tailscale funnel` setzt und die sich von aussen nicht faelschen laesst.
 *
 * Der Reihenfolge wegen laeuft dieser Schritt **nach** der Anmeldepruefung —
 * vorher gaebe es `locals.user` noch nicht.
 */
const handleOeffentlicherZugang: Handle = async ({ event, resolve }) => {
	if (
		!event.locals.user &&
		anmeldepflichtImOffenenNetz() &&
		istAusDemOffenenNetz(event.request) &&
		!immerErlaubt(event.url.pathname)
	) {
		redirect(303, '/login');
	}
	return resolve(event);
};

export const handle: Handle = sequence(
	handleBetterAuth,
	handleOeffentlicherZugang,
	handleSchutzkopfzeilen
);
