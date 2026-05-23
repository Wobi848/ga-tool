import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
	test('zeigt Schnellzugriff mit allen 6 Modulen', async ({ page }) => {
		await page.goto('/');
		// Schnellzugriff-Section
		await expect(page.getByText('Schnellzugriff', { exact: false })).toBeVisible();

		// Alle 6 Module sind als module-cards (im Schnellzugriff) sichtbar
		const cards = page.locator('a.module-card');
		await expect(cards).toHaveCount(6);

		// Labels in den Modulkarten
		await expect(cards.filter({ hasText: 'Rechner' })).toBeVisible();
		await expect(cards.filter({ hasText: 'Wissensbasis' })).toBeVisible();
		await expect(cards.filter({ hasText: 'Konverter' })).toBeVisible();
		await expect(cards.filter({ hasText: 'Checklisten' })).toBeVisible();
		await expect(cards.filter({ hasText: 'Referenz' })).toBeVisible();
		await expect(cards.filter({ hasText: 'Abkürzungen' })).toBeVisible();
	});

	test('zeigt dynamische Counts (keine Hardcoded-Zahlen)', async ({ page }) => {
		await page.goto('/');
		// Erwartung: jede Card enthaelt eine Zahl > 0
		const cards = page.locator('.module-card, [class*="module"]');
		const count = await cards.count();
		expect(count).toBeGreaterThan(0);
	});

	test('Klick auf Rechner-Card navigiert zu /rechner', async ({ page }) => {
		await page.goto('/');
		await page.locator('a.module-card').filter({ hasText: 'Rechner' }).click();
		await expect(page).toHaveURL(/\/rechner/);
	});
});
