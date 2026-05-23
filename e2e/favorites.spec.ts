import { test, expect } from '@playwright/test';

test.describe('Favoriten-Toggle', () => {
	test('Klick auf Favoriten-Button auf Rechner-Detail toggled Favorit', async ({ page }) => {
		await page.goto('/rechner/kv-wert');

		// Favoriten-Button finden (aria-label enthaelt 'Favorit')
		const favBtn = page.locator('button[aria-label*="Favorit"]').first();
		await expect(favBtn).toBeVisible();

		const labelBefore = await favBtn.getAttribute('aria-label');
		await favBtn.click();
		await page.waitForTimeout(100);

		const labelAfter = await favBtn.getAttribute('aria-label');
		expect(labelAfter).not.toBe(labelBefore);

		// Erneut klicken -> zurueck zum Ursprungszustand
		await favBtn.click();
		await page.waitForTimeout(100);
		expect(await favBtn.getAttribute('aria-label')).toBe(labelBefore);
	});

	test('Favoriten erscheinen im Dashboard nach Toggle', async ({ page }) => {
		await page.goto('/rechner/heizkurve');

		const favBtn = page.locator('button[aria-label*="Favorit"]').first();
		await favBtn.click();
		await page.waitForTimeout(100);

		await page.goto('/');
		// Favoriten-Section sollte 'Heizkurve' enthalten
		await expect(page.getByText(/heizkurve/i).first()).toBeVisible();

		// Cleanup: Favorit wieder entfernen
		await page.goto('/rechner/heizkurve');
		await page.locator('button[aria-label*="entfern"]').first().click();
	});
});
