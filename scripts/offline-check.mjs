#!/usr/bin/env node
/* Prueft, ob die App wirklich ohne Netz funktioniert.
 *
 * WARUM ALS EIGENES SKRIPT UND NICHT ALS PLAYWRIGHT-TEST
 * -----------------------------------------------------
 * `browserContext.setOffline(true)` wirkt nur auf die Seite, **nicht auf den
 * Service Worker**. Der holt weiter aus dem Netz, die Seite laedt, und der
 * Test besteht — ohne je offline gewesen zu sein. Am 13.09.2026 ist genau das
 * passiert: ein "Offline-Test" meldete gruen, und die Wahrheit kam erst
 * heraus, als im Zwischenspeicher eine Seite auftauchte, die dort nach der
 * Theorie nicht sein konnte.
 *
 * Deshalb wird hier der Server wirklich abgeschaltet. Das laesst sich in
 * Playwrights `webServer`-Mechanik nicht abbilden, also steht es daneben.
 *
 * Aufruf:  npm run build && node scripts/offline-check.mjs
 */
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const PORT = 4199;
const srv = spawn('node', ['build/index.js'], {
	env: {
		...process.env,
		PORT: String(PORT),
		ORIGIN: `http://localhost:${PORT}`,
		DATABASE_URL: 'local.db'
	},
	stdio: 'ignore'
});
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const erreichbar = async () => {
	try {
		return (await fetch(`http://localhost:${PORT}/api/health`)).ok;
	} catch {
		return false;
	}
};

for (let i = 0; i < 40 && !(await erreichbar()); i++) await warte(250);
console.log('  Server laeuft:', await erreichbar());

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

// Ein einziger Besuch — wie bei jemandem, der die App installiert und
// danach ohne Netz oeffnet.
await page.goto(`http://localhost:${PORT}/rechner/taupunkt`);
await page.evaluate(async () => {
	await navigator.serviceWorker.ready;
	if (!navigator.serviceWorker.controller) {
		await new Promise((r) =>
			navigator.serviceWorker.addEventListener('controllerchange', r, { once: true })
		);
	}
});
await warte(9000); // Vorwaermung samt Rechnern abwarten
console.log(
	'  im pages-cache:',
	JSON.stringify(
		await page.evaluate(async () => {
			const c = await window.caches.open('pages-cache');
			return (await c.keys()).map((r) => new URL(r.url).pathname).sort();
		})
	)
);

console.log('\n  --- Server wird beendet ---');
srv.kill('SIGKILL');
for (let i = 0; i < 20 && (await erreichbar()); i++) await warte(250);
console.log('  Server erreichbar:', await erreichbar(), '\n');

async function probe(pfad) {
	try {
		await page.goto(`http://localhost:${PORT}${pfad}`, {
			waitUntil: 'domcontentloaded',
			timeout: 15000
		});
		const h1 =
			(await page
				.getByRole('heading', { level: 1 })
				.first()
				.textContent()
				.catch(() => null)) ?? '(keine)';
		return h1;
	} catch (e) {
		return 'FEHLGESCHLAGEN: ' + String(e.message).split('\n')[0].slice(0, 60);
	}
}
/* Erwartung je Pfad: der Titel, der ohne Netz dastehen muss.
 * "Keine Verbindung" ist die Auffangseite — bei Artikeln ist sie richtig,
 * die 122 Stueck werden bewusst nicht vorgewaermt. */
const ERWARTET = [
	['Startseite (nie besucht)', '/', 'Dashboard'],
	['besuchte Seite', '/rechner/taupunkt', 'Taupunkt'],
	['Rechnerliste', '/rechner', 'Rechner'],
	['Wissensliste', '/wissen', 'Wissensbasis'],
	['Rechner, nie besucht', '/rechner/heizkurve', 'Heizkurve'],
	['Artikel, nie besucht', '/wissen/pid-regler', 'Keine Verbindung'],
	['Pfad ohne Route', '/gibt-es-nicht', 'Keine Verbindung']
];

let fehler = 0;
for (const [was, pfad, soll] of ERWARTET) {
	const ist = await probe(pfad);
	const ok = ist === soll;
	if (!ok) fehler++;
	console.log(
		`  ${ok ? '\u2713' : '\u2717'} ${was.padEnd(26)} ${ist}${ok ? '' : `   erwartet: "${soll}"`}`
	);
}

await browser.close();

if (fehler) {
	console.log(
		`\n  ${fehler} Abweichung(en) — die App ist ohne Netz nicht das, was sie sein soll.\n`
	);
	process.exit(1);
}
console.log('\n  Alles wie erwartet.\n');
