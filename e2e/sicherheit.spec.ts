import { test, expect } from '@playwright/test';

/* Prüfung der Schutzmassnahmen im Browser.
 *
 * Seit dem 14.09.2026 steht das Portal über `tailscale funnel` im offenen Netz.
 * Eine Inhaltsrichtlinie, die etwas blockiert, das die App braucht, merkt man
 * sonst erst, wenn eine Seite weiss bleibt — deshalb wird hier auf echte
 * Verstösse geprüft und nicht nur auf das Vorhandensein der Kopfzeile.
 */

test.describe('Schutz-Kopfzeilen', () => {
	test('sind gesetzt', async ({ request }) => {
		const res = await request.get('/');
		const h = res.headers();
		expect(h['x-content-type-options']).toBe('nosniff');
		expect(h['x-frame-options']).toBe('DENY');
		expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
		expect(h['content-security-policy'], 'keine Inhaltsrichtlinie').toBeTruthy();
	});

	test('die Richtlinie verbietet das Wesentliche', async ({ request }) => {
		const csp = (await request.get('/')).headers()['content-security-policy'] ?? '';
		expect(csp).toContain("frame-ancestors 'none'");
		expect(csp).toContain("object-src 'none'");
		expect(csp).toContain("base-uri 'self'");
		// Skripte nur von uns — sonst wäre die Richtlinie Zierde.
		expect(csp).toMatch(/script-src[^;]*'self'/);
		expect(csp, 'unsafe-inline bei Skripten macht die Richtlinie wertlos').not.toMatch(
			/script-src[^;]*'unsafe-inline'/
		);
	});

	test('HSTS nur über HTTPS', async ({ request, baseURL }) => {
		// Auf der LAN-Adresse wäre es schädlich: der Browser lüde danach über
		// http gar nichts mehr.
		const h = (await request.get('/')).headers();
		if (new URL(baseURL!).protocol === 'https:') {
			expect(h['strict-transport-security']).toBeTruthy();
		} else {
			expect(h['strict-transport-security']).toBeUndefined();
		}
	});
});

test.describe('Die Richtlinie bricht nichts', () => {
	for (const pfad of ['/', '/rechner/taupunkt', '/wissen/pid-regler', '/objekte', '/login']) {
		test(`keine Verstösse auf ${pfad}`, async ({ page }) => {
			const verstoesse: string[] = [];
			page.on('console', (m) => {
				const t = m.text();
				if (/Content Security Policy|Refused to/i.test(t)) verstoesse.push(t);
			});
			const fehler: string[] = [];
			page.on('pageerror', (e) => fehler.push(String(e.message)));

			await page.goto(pfad, { waitUntil: 'networkidle' });

			expect(verstoesse, `CSP-Verstösse: ${verstoesse.join(' | ')}`).toEqual([]);
			expect(fehler, `Skriptfehler: ${fehler.join(' | ')}`).toEqual([]);
			// Und die Seite ist wirklich da, nicht nur fehlerfrei leer.
			expect((await page.locator('body').innerText()).length).toBeGreaterThan(50);
		});
	}

	test('das Thema wird trotz Nonce vor dem ersten Zeichnen gesetzt', async ({ page }) => {
		// Das Inline-Skript in app.html trägt den Nonce. Fällt der weg, blockiert
		// die Richtlinie es — und die helle Fassung blitzt auf.
		await page.addInitScript(() => localStorage.setItem('ga-theme', 'dark'));
		await page.goto('/');
		expect(await page.evaluate(() => document.documentElement.dataset.theme)).toBe('dark');
	});
});
