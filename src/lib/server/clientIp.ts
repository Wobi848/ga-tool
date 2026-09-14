import { env } from '$env/dynamic/private';

/** Ermittelt, von wem eine Anfrage wirklich kommt.
 *
 * Wozu das noetig ist: Anmelde- und Registrierbremse zaehlen je Absender. Kommt
 * der Verkehr durch einen Tunnel — `tailscale serve` heute, `tailscale funnel`
 * sobald die Seite oeffentlich ist —, meldet `getClientAddress()` fuer *jeden*
 * Aufruf dieselbe Adresse: die des Tunnels. Damit teilen sich alle einen Topf,
 * und fuenf falsche Anmeldeversuche von irgendwoher sperren den Besitzer aus.
 *
 * Warum nicht einfach `ADDRESS_HEADER=x-forwarded-for` in der Umgebung: dann
 * **wirft** `getClientAddress()`, sobald die Kopfzeile fehlt — und bei einem
 * direkten Aufruf im LAN fehlt sie. Nachgelesen in
 * `@sveltejs/adapter-node/files/handler.js`. Anmeldung und Zaehlung waeren auf
 * der LAN-Adresse damit kaputt.
 *
 * Deshalb hier, und mit einer Vertrauensgrenze: der Kopfzeile wird **nur**
 * geglaubt, wenn die Anfrage tatsaechlich vom eigenen Tunnel kommt. Sonst
 * koennte sich jeder eine beliebige Absenderadresse ausdenken und die Bremse
 * damit umgehen.
 *
 * `VERTRAUTER_PROXY` ist die Adresse, unter der der Tunnel den Dienst
 * anspricht (auf CT 101: die von host1). Nicht gesetzt heisst: keiner Kopfzeile
 * wird geglaubt.
 */
export function clientIp(event: { request: Request; getClientAddress: () => string }): string {
	const direkt = event.getClientAddress();
	const vertraut = (env.VERTRAUTER_PROXY ?? '').trim();
	if (!vertraut || direkt !== vertraut) return direkt;

	const xff = event.request.headers.get('x-forwarded-for');
	if (!xff) return direkt;

	// Der **letzte** Eintrag ist der, den unser eigener Tunnel gesetzt hat.
	// Alles davor kann der Aufrufer selbst geschrieben haben.
	const teile = xff
		.split(',')
		.map((x) => x.trim())
		.filter(Boolean);
	return teile.length ? teile[teile.length - 1] : direkt;
}
