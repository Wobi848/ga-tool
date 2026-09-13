import { test, expect } from '@playwright/test';

/* Der Service Worker meldete sich lange nur auf der Startseite an.
 *
 * vite-plugin-pwa leitet den Pfad aus Vites `base` ab, und SvelteKit setzt
 * `paths.relative` von Haus aus auf true. Daraus wurde
 * `new Workbox('./sw.js', { scope: './' })` — auf /rechner/taupunkt also ein
 * GET /rechner/sw.js, 404, keine Registrierung. Sichtbar kaputt war dabei
 * nichts: die Seite laedt normal, nur offline geht nichts mehr, und im
 * Serverlog stand ein 404, den niemand einem Feature zuordnet.
 *
 * Darum wird hier auf einer Unterseite geprueft, nicht auf "/".
 */

test.describe('Service Worker', () => {
	test('meldet sich auch auf einer Unterseite an', async ({ page }) => {
		const fehlschlaege: string[] = [];
		page.on('response', (r) => {
			if (r.url().includes('sw.js') && !r.ok()) fehlschlaege.push(`${r.status()} ${r.url()}`);
		});

		await page.goto('/rechner/taupunkt');

		// Die Registrierung laeuft asynchron: PwaStatus laedt virtual:pwa-register
		// erst beim Mounten nach. Sofort nachsehen liefert immer null.
		const scope = await page.evaluate(async () => {
			if (!('serviceWorker' in navigator)) return null;
			const reg = await Promise.race([
				navigator.serviceWorker.ready,
				new Promise<null>((r) => setTimeout(() => r(null), 15000))
			]);
			return reg ? reg.scope : null;
		});

		expect(fehlschlaege, `sw.js nicht ausgeliefert: ${fehlschlaege.join(', ')}`).toEqual([]);
		expect(scope, 'kein Service Worker registriert').not.toBeNull();
		// Der Scope muss die Wurzel sein, sonst gilt der Worker nur unterhalb
		// von /rechner/ und die uebrigen Seiten bleiben ohne Offline-Cache.
		expect(new URL(String(scope)).pathname).toBe('/');
	});

	test('Manifest und Symbole werden ausgeliefert', async ({ page, request }) => {
		await page.goto('/');
		// app.html verweist fest auf diese Pfade — ein Tippfehler dort faellt
		// sonst erst auf, wenn jemand die App installieren will.
		for (const pfad of ['/manifest.webmanifest', '/icon-192.png', '/icon-512.png']) {
			const res = await request.get(pfad);
			expect(res.status(), pfad).toBe(200);
		}
		const manifest = await (await request.get('/manifest.webmanifest')).json();
		expect(manifest.start_url).toBe('/');
		expect(manifest.icons.length).toBeGreaterThan(0);
	});
});
