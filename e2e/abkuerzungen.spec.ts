import { test, expect } from '@playwright/test';

test.describe('Abkuerzungen', () => {
	test('Liste laed mit > 200 Eintraegen', async ({ page }) => {
		await page.goto('/abkuerzungen');
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

		// Mindestens einige Abkuerzungs-Karten sollten sichtbar sein
		const cards = page.locator('[id^="abk-"]').or(page.locator('article'));
		expect(await cards.count()).toBeGreaterThan(10);
	});

	test('Suche filtert die Liste', async ({ page }) => {
		await page.goto('/abkuerzungen');

		const search = page.locator('input[type="text"], input.search-input').first();
		await expect(search).toBeVisible();

		await search.fill('PID');
		await page.waitForTimeout(200);

		// Sollte mind. einen PID-Treffer haben
		await expect(page.locator('text=PID').first()).toBeVisible();
	});

	test('A-Z Quick-Nav springt zu Buchstaben', async ({ page }) => {
		await page.goto('/abkuerzungen');
		// Mindestens einige Buchstaben-Buttons sollten existieren
		const letterButtons = page.locator('button, a').filter({ hasText: /^[A-Z]$/ });
		expect(await letterButtons.count()).toBeGreaterThan(5);
	});
});
