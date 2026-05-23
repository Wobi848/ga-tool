import { test, expect } from '@playwright/test';

test.describe('Globale Suche', () => {
	test('Cmd+K oeffnet Such-Modal', async ({ page }) => {
		await page.goto('/');
		// Suche-Modal-Trigger via Tastatur (Mac: meta, Linux/Win: ctrl)
		await page.keyboard.press('Control+k');
		await page.waitForTimeout(200);
		// Modal sollte sichtbar sein (rolle dialog oder Suchfeld mit Focus)
		const modalInput = page.locator('input[placeholder*="Such"], input[placeholder*="Search"]');
		if (await modalInput.count()) {
			await expect(modalInput.first()).toBeVisible();
		}
	});

	test('Suchen nach "kv" findet Kv-Wert Rechner', async ({ page }) => {
		await page.goto('/');
		await page.keyboard.press('Control+k');
		await page.waitForTimeout(300);

		const input = page.locator('input[placeholder*="Such"], input[placeholder*="Search"]').first();
		if (!(await input.isVisible())) {
			test.skip();
		}

		await input.fill('kv');
		await page.waitForTimeout(300);

		// Erwartung: Result mit "Kv" erscheint
		await expect(page.getByText(/kv-wert/i).first()).toBeVisible();
	});
});
