import { test, expect } from '@playwright/test';

/* Der Hydraulik-Simulator im Browser.
 *
 * Das Modell ist mit Handrechnungen geprüft (src/lib/hydraulik/simulation.test.ts).
 * Hier geht es um die Frage, ob die Seite dasselbe zeigt — und ob der Punkt,
 * um den es geht, auch ankommt: dass die Autorität die Kennlinie verbiegt.
 */

test.describe('Hydraulik-Simulator', () => {
	test('zeigt den Auslegungspunkt bei vollem Hub', async ({ page }) => {
		await page.goto('/rechner/hydraulik-simulator');
		await page.locator('#hub-in').fill('1');

		// Vorgaben: 2 m³/h, 50 kPa, a = 0,5 → Kvs = 4 (von Hand nachgerechnet)
		const text = await page.locator('.calc-result-section').innerText();
		expect(text, `Ergebnisse: ${text}`).toMatch(/2[.,]00\s*m³\/h/);
		expect(text).toMatch(/4[.,]00\s*m³\/h/);
		// Bei a = 0,5 teilt sich der Druck hälftig: 25 kPa auf jeder Seite.
		expect(text).toMatch(/25[.,]0\s*kPa/);
	});

	test('geschlossenes Ventil heisst kein Durchfluss', async ({ page }) => {
		await page.goto('/rechner/hydraulik-simulator');
		await page.locator('#hub-in').fill('0');
		await expect(page.locator('.calc-result-section')).toContainText('0.00');
	});

	test('schwache Autorität verbiegt die Kennlinie — und wird gemeldet', async ({ page }) => {
		await page.goto('/rechner/hydraulik-simulator');
		await page.locator('#kl-sel').selectOption('linear');
		await page.locator('#hub-in').fill('0.5');

		await page.locator('#a-in').fill('1');
		const beiVoller = await page.locator('.calc-result-section').innerText();

		await page.locator('#a-in').fill('0.1');
		const beiSchwacher = await page.locator('.calc-result-section').innerText();

		const prozent = (t: string) => {
			const m = t.match(/(\d+)\s*%/);
			return m ? Number(m[1]) : -1;
		};
		// Bei halbem Hub: mit voller Autorität rund 50 %, mit schwacher deutlich mehr.
		expect(prozent(beiVoller), beiVoller).toBeLessThan(60);
		expect(prozent(beiSchwacher), beiSchwacher).toBeGreaterThan(70);

		// Und der Warnhinweis muss erscheinen, nicht nur die Zahl.
		await expect(page.locator('.calc-warning')).toBeVisible();
	});

	test('die Beimischschaltung regelt Temperatur statt Durchfluss', async ({ page }) => {
		await page.goto('/rechner/hydraulik-simulator');
		await page.locator('#schaltung-sel').selectOption('beimischung');
		await page.locator('#a-in').fill('1');

		await page.locator('#hub-in').fill('0');
		await expect(page.locator('.calc-result-section')).toContainText('40.0');

		await page.locator('#hub-in').fill('1');
		await expect(page.locator('.calc-result-section')).toContainText('70.0');
	});

	test('das Kennlinienbild wird gezeichnet', async ({ page }) => {
		await page.goto('/rechner/hydraulik-simulator');
		const betrieb = page.locator('svg.bild path.betrieb');
		await expect(betrieb).toBeVisible();
		const d = await betrieb.getAttribute('d');
		expect(d?.length ?? 0, 'die Betriebskennlinie hat keine Punkte').toBeGreaterThan(100);
	});

	test('ist von der Rechnerliste aus erreichbar', async ({ page }) => {
		await page.goto('/rechner');
		await page.getByRole('link', { name: /Hydraulik-Simulator/ }).click();
		await expect(page).toHaveURL(/hydraulik-simulator/);
	});
});
