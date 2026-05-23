import { test, expect } from '@playwright/test';

test.describe('Rechner: Druckverlust', () => {
	test('berechnet Druckverlust bei Default-Werten', async ({ page }) => {
		await page.goto('/rechner/druckverlust');

		// Default: 1 m³/h, DN20, 20m Laenge, ζ 15
		// Erwartung: Druckverlust-Wert wird gerendert (mbar oder Pa)
		await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

		// Eines der Ergebnisfelder sollte einen numerischen Wert zeigen
		const resultSection = page.locator('.calc-result-section');
		await expect(resultSection.first()).toBeVisible();
	});

	test('reagiert auf Eingabe-Aenderung', async ({ page }) => {
		await page.goto('/rechner/druckverlust');

		const flowInput = page.locator('#flow-in');
		await expect(flowInput).toBeVisible();

		// Ergebniswert vor Aenderung holen
		const result1 = await page.locator('.calc-result-value').first().textContent();

		// Volumenstrom verdoppeln
		await flowInput.fill('2');
		await page.waitForTimeout(100);

		const result2 = await page.locator('.calc-result-value').first().textContent();
		expect(result2).not.toBe(result1);
	});

	test('Sole-Medium liefert anderen Druckverlust als Wasser', async ({ page }) => {
		await page.goto('/rechner/druckverlust');

		const wasserResult = await page.locator('.calc-result-value').first().textContent();

		await page.locator('#med-sel').selectOption({ index: 1 }); // sole30
		await page.waitForTimeout(100);

		const soleResult = await page.locator('.calc-result-value').first().textContent();
		expect(soleResult).not.toBe(wasserResult);
	});
});
