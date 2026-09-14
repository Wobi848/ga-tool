import { test, expect } from '@playwright/test';

/* Prüfung der Lesbarkeit in allen Themen.
 *
 * Am 14.09.2026 gemeldet: aufgeklappte Auswahlfelder im Dunkelmodus waren
 * weisse Schrift auf weissem Grund. Ursache war ein durchsichtiger Hintergrund
 * der `option`-Elemente — die Liste nahm dann die Vorgabe des Systems (weiss),
 * während die Schrift aus dem dunklen Thema hell blieb.
 *
 * Geprüft wird deshalb der Kontrast, nicht das Vorhandensein einer Regel.
 */

/** Helligkeit nach WCAG, aus einem `rgb(...)`-String. */
function helligkeit(farbe: string): number | null {
	const m = farbe.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
	if (!m) return null;
	// Durchsichtig heisst: die Farbe kommt von woanders — genau der Fehler.
	if (m[4] !== undefined && Number(m[4]) === 0) return null;
	const [r, g, b] = [m[1], m[2], m[3]].map((x) => {
		const v = Number(x) / 255;
		return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
	});
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Kontrastverhältnis zweier Farben, 1 bis 21. */
function kontrast(a: string, b: string): number | null {
	const [x, y] = [helligkeit(a), helligkeit(b)];
	if (x === null || y === null) return null;
	return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const THEMEN = ['light', 'dark', 'oled'] as const;
const SEITEN = ['/rechner/heizkurve', '/checklisten', '/referenz', '/objekte'];

for (const thema of THEMEN) {
	test(`Auswahlfelder sind im Thema "${thema}" lesbar`, async ({ page }) => {
		await page.addInitScript((t) => localStorage.setItem('ga-theme', t), thema);

		const schwach: string[] = [];
		for (const pfad of SEITEN) {
			await page.goto(pfad);
			const felder = page.locator('select');
			const n = await felder.count();
			for (let i = 0; i < n; i++) {
				const f = await felder.nth(i).evaluate((el) => {
					const o = el.querySelector('option');
					if (!o) return null;
					const os = getComputedStyle(o);
					return { bg: os.backgroundColor, fg: os.color };
				});
				if (!f) continue;
				const k = kontrast(f.bg, f.fg);
				// null heisst durchsichtig — genau der gemeldete Fehler.
				if (k === null) schwach.push(`${pfad}[${i}]: durchsichtig (${f.bg} auf ${f.fg})`);
				else if (k < 4.5) schwach.push(`${pfad}[${i}]: Kontrast ${k.toFixed(1)}`);
			}
		}

		expect(schwach, `zu schwach: ${schwach.join(' | ')}`).toEqual([]);
	});
}

test.describe('Abkürzungsseite', () => {
	// Am 14.09.2026 gemeldet: «Adiabatische Kühlung» eingegeben, nichts
	// gefunden. Richtig — das Feld dort durchsucht nur die 233 Abkürzungen, und
	// dafür gibt es keine. Nur stand man damit vor einer Sackgasse, obwohl es
	// den Artikel gibt.
	test('weist auf Treffer im übrigen Portal hin', async ({ page }) => {
		await page.goto('/abkuerzungen');
		await page.locator('input.search-input').fill('Adiabatische Kühlung');

		const hinweis = page.locator('.anderswo');
		await expect(hinweis, 'kein Hinweis auf den Artikel').toBeVisible();
		const verweis = hinweis.getByRole('link').first();
		await expect(verweis).toContainText(/Adiabatische/i);

		await verweis.click();
		await expect(page).toHaveURL(/\/wissen\/adiabatische-kuehlung/);
		await expect(page.getByRole('heading', { level: 1 })).toContainText(/Adiabatische/i);
	});

	test('bei einem echten Abkürzungstreffer erscheint kein Hinweis', async ({ page }) => {
		await page.goto('/abkuerzungen');
		await page.locator('input.search-input').fill('PID');
		await expect(page.locator('.anderswo')).toHaveCount(0);
	});

	test('bei Unsinn bleibt es bei «nichts gefunden»', async ({ page }) => {
		await page.goto('/abkuerzungen');
		await page.locator('input.search-input').fill('qwertzuiopasdfgh');
		await expect(page.locator('.empty')).toBeVisible();
		await expect(page.locator('.anderswo')).toHaveCount(0);
	});
});
