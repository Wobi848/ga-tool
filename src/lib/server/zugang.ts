import { env } from '$env/dynamic/private';

/** Kommt diese Anfrage aus dem offenen Netz?
 *
 * `tailscale funnel` setzt bei jeder Anfrage von aussen
 * `tailscale-funnel-request: ?1`. Aus dem Tailnet (`tailscale serve`) und bei
 * einem direkten Aufruf im LAN fehlt sie.
 *
 * **Faelschungssicher, nachgemessen am 14.09.2026:** schickt ein Aufrufer die
 * Kopfzeile selbst mit `?0` oder versucht sie zu leeren, kommt bei der App
 * trotzdem `?1` an — tailscaled ueberschreibt sie. Die gefaehrliche Richtung
 * waere, sie von aussen loszuwerden; genau das geht nicht.
 */
export function istAusDemOffenenNetz(request: Request): boolean {
	return request.headers.has('tailscale-funnel-request');
}

/** Muessen Besucher aus dem offenen Netz angemeldet sein?
 *
 * Standard ja. `OEFFENTLICH_ANMELDEPFLICHT=false` schaltet es ab — etwa wenn
 * die Wissensbasis bewusst oeffentlich sein soll.
 */
export function anmeldepflichtImOffenenNetz(): boolean {
	return (env.OEFFENTLICH_ANMELDEPFLICHT ?? '').trim().toLowerCase() !== 'false';
}

/** Pfade, die auch ohne Anmeldung erreichbar bleiben muessen.
 *
 * Ohne sie koennte sich niemand anmelden: die Anmeldeseite braucht ihr
 * JavaScript, ihre Schriften und die Auth-Schnittstelle.
 */
export function immerErlaubt(pfad: string): boolean {
	return (
		pfad === '/login' ||
		pfad.startsWith('/api/auth/') ||
		pfad.startsWith('/_app/') ||
		pfad.startsWith('/fonts/') ||
		pfad === '/favicon.ico' ||
		pfad === '/icon-192.png' ||
		pfad === '/icon-512.png' ||
		pfad === '/manifest.webmanifest' ||
		pfad === '/sw.js' ||
		pfad === '/offline.html' ||
		pfad === '/robots.txt' ||
		pfad === '/api/health'
	);
}
