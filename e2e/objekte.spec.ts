import { test, expect } from '@playwright/test';

/* Der Grund für die Objektverwaltung.
 *
 * Vorher lag der Checklisten-Stand unter `ga-cl-<vorlage>` — ein Stand je
 * Vorlage. Wer dieselbe IBN-Checkliste für fünf Lüftungsanlagen abarbeitete,
 * überschrieb bei der zweiten die erste. Genau das wird hier geprüft, und zwar
 * im Browser und nicht nur im Store.
 */

test.describe('Objekte', () => {
	test('ein Objekt anlegen und wiederfinden', async ({ page }) => {
		await page.goto('/objekte');
		await page.getByRole('button', { name: 'Neues Objekt' }).click();
		await page.getByLabel('Name').fill('Seefeld Baufeld B');
		await page.getByRole('button', { name: 'Anlegen' }).click();

		await expect(page.getByRole('link', { name: /Seefeld Baufeld B/ })).toBeVisible();
		await page.reload();
		// Übersteht das Neuladen — sonst wäre nichts gespeichert.
		await expect(page.getByRole('link', { name: /Seefeld Baufeld B/ })).toBeVisible();
	});

	test('dieselbe Vorlage läuft mehrfach nebeneinander', async ({ page }) => {
		await page.goto('/objekte');
		await page.getByRole('button', { name: 'Neues Objekt' }).click();
		await page.getByLabel('Name').fill('Mehrfach-Test');
		await page.getByRole('button', { name: 'Anlegen' }).click();
		await page.getByRole('link', { name: /Mehrfach-Test/ }).click();

		// Zwei Anlagen, damit die Durchläufe auch sichtbar getrennt sind.
		for (const name of ['Lüftung MZ1', 'Lüftung MZ2']) {
			await page.getByPlaceholder('z. B. Lüftung MZ1').fill(name);
			await page.getByRole('button', { name: 'Anlage hinzufügen' }).click();
		}

		const vorlage = await page
			.locator('select')
			.first()
			.locator('option')
			.nth(1)
			.getAttribute('value');
		expect(vorlage).toBeTruthy();

		/** Startet einen Durchlauf und hakt die ersten `n` Punkte ab. */
		async function durchlauf(titel: string, anlage: string, n: number) {
			await page.goto(page.url().split('?')[0]);
			await page.locator('select').first().selectOption(vorlage!);
			await page.getByPlaceholder('z. B. IBN Lüftung MZ1').fill(titel);
			await page.locator('select').nth(1).selectOption({ label: anlage });
			await page.getByRole('button', { name: 'Checkliste starten' }).click();
			await page.waitForURL(/\/checklisten\/.*durchlauf=/);
			const kaesten = page.locator('input[type="checkbox"]');
			for (let i = 0; i < n; i++) await kaesten.nth(i).check();
			// Die Seite speichert verzögert.
			await page.waitForTimeout(900);
		}

		const objektUrl = page.url();
		await durchlauf('IBN MZ1', 'Lüftung MZ1', 3);
		await page.goto(objektUrl);
		await durchlauf('IBN MZ2', 'Lüftung MZ2', 1);
		await page.goto(objektUrl);

		// Beide Durchläufe stehen da, mit **verschiedenen** Ständen.
		await expect(page.getByRole('link', { name: /IBN MZ1/ })).toBeVisible();
		await expect(page.getByRole('link', { name: /IBN MZ2/ })).toBeVisible();
		// Der entscheidende Teil: verschiedene Stände nebeneinander. Geprüft am
		// Text der Liste, nicht mit einem verankerten Muster — die Zeilen sind
		// eingerückt gerendert, `^` trifft dort nicht.
		// Jede Anlage hat ihre eigene Liste — alle einsammeln, sonst sieht man
		// nur die erste Gruppe.
		const text = (await page.locator('ul.liste').allInnerTexts()).join('\n');
		expect(text, `Liste zeigte: ${text}`).toMatch(/3\/\d+\s+erledigt/);
		expect(text, `Liste zeigte: ${text}`).toMatch(/1\/\d+\s+erledigt/);
	});

	test('ein Durchlauf zeigt, zu welchem Objekt er gehört', async ({ page }) => {
		await page.goto('/objekte');
		await page.getByRole('button', { name: 'Neues Objekt' }).click();
		await page.getByLabel('Name').fill('Bandtest');
		await page.getByRole('button', { name: 'Anlegen' }).click();
		await page.getByRole('link', { name: /Bandtest/ }).click();

		const vorlage = await page
			.locator('select')
			.first()
			.locator('option')
			.nth(1)
			.getAttribute('value');
		await page.locator('select').first().selectOption(vorlage!);
		await page.getByPlaceholder('z. B. IBN Lüftung MZ1').fill('Mein Durchlauf');
		await page.getByRole('button', { name: 'Checkliste starten' }).click();
		await page.waitForURL(/durchlauf=/);

		// Ohne dieses Band weiss niemand, welche Anlage er gerade abhakt.
		await expect(page.getByText('Mein Durchlauf')).toBeVisible();
		await expect(page.getByRole('link', { name: 'Bandtest' })).toBeVisible();
	});

	test('ohne Durchlauf verhält sich die Checkliste wie bisher', async ({ page }) => {
		// Vorlagen lassen sich weiterhin direkt aufrufen — alte Lesezeichen
		// dürfen nicht ins Leere laufen.
		await page.goto('/checklisten');
		await page.locator('a[href^="/checklisten/"]').first().click();
		await expect(page.locator('input[type="checkbox"]').first()).toBeVisible();
	});
});
