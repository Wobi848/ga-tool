import { describe, it, expect, vi } from 'vitest';
import { kommtDurchDenTunnel, immerErlaubt } from './zugang';

/* Prüfung der Zugangsschranke.
 *
 * Sie entscheidet, ob jemand über die öffentliche Adresse das Portal sieht oder
 * nur die Anmeldemaske. Zwei Fehler wären teuer: lässt sie zu viel durch, ist
 * das Portal öffentlich lesbar. Sperrt sie zu viel, kann sich niemand mehr
 * anmelden — die Anmeldeseite braucht ihr JavaScript und ihre Schriften.
 */

const mitKopf = (h: Record<string, string> = {}) => new Request('http://x/', { headers: h });

describe('kommtDurchDenTunnel', () => {
	it('erkennt Verkehr durch Funnel', () => {
		expect(kommtDurchDenTunnel(mitKopf({ 'tailscale-funnel-request': '?1' }))).toBe(true);
	});

	it('erkennt auch einen anderen Wert als öffentlich', () => {
		// Nachgemessen: tailscaled überschreibt einen mitgeschickten Wert immer
		// mit '?1'. Auf den Inhalt zu prüfen wäre trotzdem zerbrechlich — die
		// blosse Anwesenheit genügt, und ein von aussen gesetztes '?0' würde
		// den Besucher dann nicht besserstellen.
		expect(kommtDurchDenTunnel(mitKopf({ 'tailscale-funnel-request': '?0' }))).toBe(true);
	});

	it('ein direkter Aufruf im Heimnetz kommt nicht durch den Tunnel', () => {
		expect(kommtDurchDenTunnel(mitKopf())).toBe(false);
		// Auch ein x-forwarded-for allein macht daraus keinen Tunnelaufruf.
		expect(kommtDurchDenTunnel(mitKopf({ 'x-forwarded-for': '100.64.0.7' }))).toBe(false);
	});
});

describe('immerErlaubt', () => {
	it('lässt durch, was die Anmeldung braucht', () => {
		// Ohne diese Pfade bliebe die Anmeldeseite eine weisse Fläche.
		for (const p of [
			'/login',
			'/api/auth/sign-in/email',
			'/_app/immutable/entry/app.js',
			'/fonts/rubik-variabel-latin.woff2',
			'/manifest.webmanifest',
			'/sw.js',
			'/offline.html',
			'/robots.txt'
		]) {
			expect(immerErlaubt(p), p).toBe(true);
		}
	});

	it('sperrt alles, worum es geht', () => {
		for (const p of [
			'/',
			'/wissen',
			'/wissen/adiabatische-kuehlung',
			'/rechner/taupunkt',
			'/objekte',
			'/referenz',
			'/abkuerzungen',
			'/api/objekte',
			'/admin'
		]) {
			expect(immerErlaubt(p), p).toBe(false);
		}
	});

	it('lässt sich nicht mit einem Präfix austricksen', () => {
		// /loginXY oder /api/authXY dürfen nicht durchrutschen.
		expect(immerErlaubt('/login-geheim')).toBe(false);
		expect(immerErlaubt('/api/authentisch/geheim')).toBe(false);
		expect(immerErlaubt('/sw.js.map')).toBe(false);
	});
});

describe('anmeldepflichtImOffenenNetz', () => {
	async function laden(wert?: string) {
		vi.resetModules();
		vi.doMock('$env/dynamic/private', () => ({
			env: wert === undefined ? {} : { OEFFENTLICH_ANMELDEPFLICHT: wert }
		}));
		return (await import('./zugang')).anmeldepflichtImOffenenNetz;
	}

	it('ist standardmässig an', async () => {
		// Die sichere Vorgabe. Wer sie abschalten will, muss es hinschreiben.
		expect((await laden())()).toBe(true);
	});

	it('"false" schaltet sie ab', async () => {
		expect((await laden('false'))()).toBe(false);
		expect((await laden('FALSE'))()).toBe(false);
	});

	it('ein Tippfehler lässt sie an', async () => {
		expect((await laden('nein'))()).toBe(true);
		expect((await laden(''))()).toBe(true);
	});
});
