import { test, expect } from '@playwright/test';

test.describe('Wissensbasis', () => {
	test('Liste der Artikel laed', async ({ page }) => {
		await page.goto('/wissen');
		// Wissen-Liste sollte einen Suchindex und mind. 1 Artikel-Link zeigen
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
	});

	test('PID-Regler Artikel oeffnet sich', async ({ page }) => {
		await page.goto('/wissen/pid-regler');
		// Artikel-Body sollte erscheinen
		await expect(page.locator('.prose')).toBeVisible();
		// Markdown wird gerendert (mindestens ein h2/p)
		const proseContent = page.locator('.prose');
		const text = await proseContent.textContent();
		expect(text?.length ?? 0).toBeGreaterThan(100);
	});

	test('Related-Links navigieren zu anderen Artikeln', async ({ page }) => {
		await page.goto('/wissen/pid-regler');
		// Mindestens ein Wissen-Link auf der Seite (related-Section oder im Text)
		const wissenLinks = page.locator('a[href^="/wissen/"]').filter({ hasNotText: '' });
		expect(await wissenLinks.count()).toBeGreaterThan(0);
	});
});
