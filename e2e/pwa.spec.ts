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
	test('die Einstiegsseiten landen im Zwischenspeicher', async ({ page }) => {
		// Ohne das zeigt die installierte App beim ersten Start ohne Netz die
		// Auffangseite — das Manifest setzt start_url '/', und der Worker legt
		// eine Seite sonst erst ab, wenn sie besucht wurde.
		//
		// Hier wird nur der Zwischenspeicher beobachtet, nicht Offline gespielt:
		// `context.setOffline()` wirkt nicht auf den Service Worker, ein darauf
		// gebauter Test besteht auch dann, wenn nichts zwischengespeichert ist.
		// Der echte Offline-Nachweis steht in scripts/offline-check.mjs, das den
		// Server wirklich abschaltet.
		await page.goto('/rechner/taupunkt');
		await page.evaluate(async () => {
			await navigator.serviceWorker.ready;
			if (!navigator.serviceWorker.controller) {
				await new Promise((r) =>
					navigator.serviceWorker.addEventListener('controllerchange', r, { once: true })
				);
			}
		});

		const pfade = async () =>
			await page.evaluate(async () => {
				if (!(await window.caches.keys()).includes('pages-cache')) return [];
				const c = await window.caches.open('pages-cache');
				return (await c.keys()).map((r) => new URL(r.url).pathname);
			});

		await expect
			.poll(pfade, { timeout: 20000, message: 'Startseite kam nicht in den Zwischenspeicher' })
			.toContain('/');

		const inhalt = await pfade();
		for (const p of ['/rechner', '/wissen', '/konverter']) {
			expect(inhalt, `${p} fehlt im Zwischenspeicher`).toContain(p);
		}

		// Zweite Stufe: die Rechner, bei Gelegenheit nachgeladen. Sie sind der
		// Grund, warum das Werkzeug im Technikraum offline taugen soll.
		await expect
			.poll(async () => (await pfade()).filter((p) => p.startsWith('/rechner/')).length, {
				timeout: 30000,
				message: 'die Rechner wurden nicht vorgewaermt'
			})
			.toBeGreaterThan(15);
	});

	test('die Auffangseite wird ausgeliefert und nennt, was offline geht', async ({ request }) => {
		const res = await request.get('/offline.html');
		expect(res.status()).toBe(200);
		const html = await res.text();
		expect(html).toContain('Keine Verbindung');
		// Sie muss ohne Netz funktionieren — also ohne nachzuladende Schrift
		// oder Skripte von aussen.
		expect(html).not.toMatch(/<(script|link)[^>]+(src|href)=["']https?:/);
	});
});
