import { test, expect } from '@playwright/test';

/* Generatoren nach KBOB im Browser: AKS-Generator und BACnet-Datenpunktliste.
 * Die Logik ist in src/lib/generatoren/*.test.ts geprüft; hier geht es darum,
 * dass die Seiten sie richtig zeigen und der Export eine Datei liefert. */

const SHOT = process.env.SHOT_DIR;

test.describe('AKS-Generator', () => {
	test('erzeugt Kennzeichen und Objektname aus den Feldern', async ({ page }) => {
		await page.goto('/rechner/aks');
		const res = page.locator('.calc-result-section');
		await expect(res).toContainText('+3022 HZ1 =L13 -M100 :S0');
		await expect(res).toContainText('3022_HZ1_L13_M100_S0');

		await page.locator('#aks-appnr').fill('130');
		await expect(res).toContainText('3022_HZ1_L13_M130_S0');
		await expect(page.getByText('Ventilator Fortluft')).toBeVisible();
		if (SHOT) await page.screenshot({ path: `${SHOT}/aks-build.png`, fullPage: true });
	});

	test('zerlegt ein Kennzeichen und übernimmt es', async ({ page }) => {
		await page.goto('/rechner/aks');
		await page.getByRole('button', { name: 'Zerlegen' }).click();
		await page.locator('#aks-in').fill('+HZ1=H02-Y730:Y1');
		await expect(page.locator('table.explain')).toContainText('Stellorgan Sekundärkreis Vorlauf');
		await expect(page.locator('table.explain')).toContainText('1. Untergeschoss');
		if (SHOT) await page.screenshot({ path: `${SHOT}/aks-parse.png`, fullPage: true });
		await page.getByRole('button', { name: 'In den Generator übernehmen' }).click();
		await expect(page.locator('.calc-result-section')).toContainText('HZ1_H02_Y730_Y1');
	});
});

test.describe('BACnet-Datenpunktliste', () => {
	test('zeigt das Beispiel und exportiert EDE', async ({ page }) => {
		await page.goto('/rechner/bacnet-dpl');
		const tabelle = page.locator('table.dpl');
		await expect(tabelle).toContainText('3022_HZ1_L13_M100_S0');
		await expect(tabelle).toContainText('Zuluftventilator Schaltbefehl');
		if (SHOT) await page.screenshot({ path: `${SHOT}/dpl.png`, fullPage: true });

		const [download] = await Promise.all([
			page.waitForEvent('download'),
			page.getByRole('button', { name: 'EDE', exact: true }).click()
		]);
		expect(download.suggestedFilename()).toMatch(/_EDE\.csv$/);

		await page.getByRole('button', { name: 'Alarmliste', exact: true }).click();
		await expect(tabelle).toContainText('Frostschutz Istwert');
		if (SHOT) await page.locator('.table-wrap').screenshot({ path: `${SHOT}/dpl-alarme.png` });
	});

	test('optionale Objekte abwählen verkleinert die Liste', async ({ page }) => {
		await page.goto('/rechner/bacnet-dpl');
		const zahl = page.locator('.calc-result-value.primary');
		const vorher = Number(await zahl.innerText());
		await page
			.locator('.fkt')
			.first()
			.getByLabel('Bauherrenspezifische Objekte mit erzeugen')
			.uncheck();
		await expect.poll(async () => Number(await zahl.innerText())).toBeLessThan(vorher);
	});
});

test.describe('EDE-Prüfer', () => {
	test('meldet Fehler einer hochgeladenen Datei', async ({ page }) => {
		await page.goto('/rechner/ede-pruefer');
		const ede = [
			'PROJECT_NAME;Testprojekt',
			'VERSION_OF_LAYOUT;2.3',
			'# keyname;device obj.-instance;object-name;object-type;object-instance;description;present-value-default;min-present-value;max-present-value;settable;supports COV;hi-limit;low-limit;state-text-reference;unit-code;vendor-specific-address;notification-class',
			'3022_HZ1_L13_D001;100;3022_HZ1_L13_D001;8;100;AS;;;;;;;;;;;',
			'3022_HZ1_L13_B802_M0;100;3022_HZ1_L13_B802_M0;0;1;Zulufttemperatur;;;;N;;;;;62;;66',
			'3022_HZ1_L13_B802_M0;100;3022_HZ1_L13_B802_M0;0;2;Doppelt;;;;N;;;;;;;300'
		].join('\r\n');
		await page
			.locator('input[type=file]')
			.first()
			.setInputFiles({ name: 'test_EDE.csv', mimeType: 'text/csv', buffer: Buffer.from(ede) });
		await expect(page.locator('.calc-result-section')).toContainText('Testprojekt');
		await expect(page.locator('.calc-result-section')).toContainText('in 1 Gerät');
		await expect(page.locator('.calc-result-section')).not.toContainText('Geräten');
		const tabelle = page.locator('table.befunde');
		await expect(tabelle).toContainText('Object_Name doppelt');
		await expect(tabelle).toContainText('NC300');
		await expect(tabelle).toContainText('Einheit (unit-code) fehlt');
		if (SHOT) await page.screenshot({ path: `${SHOT}/ede.png`, fullPage: true });
	});
});
