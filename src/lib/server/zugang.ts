import { env } from '$env/dynamic/private';

/** Kam diese Anfrage durch den Tunnel — also ueber die oeffentliche Adresse?
 *
 * `tailscale funnel` setzt dabei `tailscale-funnel-request`. Bei einem direkten
 * Aufruf im Heimnetz (`http://192.168.178.68:3700`) fehlt sie.
 *
 * **Wichtig, und am 14.09.2026 erst nach dem Messen klar geworden:** das
 * unterscheidet *nicht* zwischen Tailnet und offenem Netz. Sobald Funnel auf
 * einem Port laeuft, kommen auch Anfragen aus dem Tailnet ueber den
 * oeffentlichen Weg herein — nachgemessen mit einem Echo-Server: Home
 * Assistant, selbst im Tailnet, erschien mit `?1` und der oeffentlichen
 * Heim-IP. Die urspruengliche Absicht «Tailnet bleibt offen» ist so also nicht
 * umsetzbar, und die Benennung war entsprechend irrefuehrend.
 *
 * **Faelschungssicher, ebenfalls nachgemessen:** schickt ein Aufrufer die
 * Kopfzeile selbst mit `?0` oder versucht sie zu leeren, kommt trotzdem `?1`
 * an. Dasselbe gilt fuer `x-forwarded-for` — ein mitgeschicktes `100.64.0.99`
 * wurde durch die echte Adresse ersetzt. Die gefaehrliche Richtung waere, die
 * Kopfzeile von aussen loszuwerden; genau das geht nicht.
 */
export function kommtDurchDenTunnel(request: Request): boolean {
	return request.headers.has('tailscale-funnel-request');
}

/** Muessen Besucher ueber die oeffentliche Adresse angemeldet sein?
 *
 * Standard ja: die Adresse steht im offenen Netz, und wer sie kennt, soll
 * nicht einfach mitlesen. Im Heimnetz bleibt die App ohne Konto benutzbar.
 *
 * `OEFFENTLICH_ANMELDEPFLICHT=false` schaltet es ab — etwa wenn die
 * Wissensbasis bewusst oeffentlich sein soll.
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
