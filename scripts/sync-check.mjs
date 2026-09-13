#!/usr/bin/env node
/* Prueft den Abgleich zwischen zwei Geraeten.
 *
 * Die Einheitstests stellen `fetch` — sie pruefen die Mischregel, nicht den
 * Weg. Hier laeuft ein echter Server mit echter Datenbank, und zwei getrennte
 * Browser-Kontexte spielen Telefon und Laptop.
 *
 * Aufruf:  npm run build && node scripts/sync-check.mjs
 */
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { rmSync } from 'node:fs';

const PORT = 4195;
const DB = '/tmp/ga-sync-check.db';
rmSync(DB, { force: true });

// Frische Datenbank mit dem echten Schema.
await new Promise((r, j) => {
	const m = spawn('node', ['scripts/migrate.mjs'], {
		env: { ...process.env, DATABASE_URL: DB },
		stdio: 'ignore'
	});
	m.on('exit', (c) => (c === 0 ? r() : j(new Error('Migration fehlgeschlagen'))));
});

const srv = spawn('node', ['build/index.js'], {
	env: {
		...process.env,
		PORT: String(PORT),
		ORIGIN: `http://localhost:${PORT}`,
		DATABASE_URL: DB,
		BETTER_AUTH_SECRET: 'nur-fuer-den-test-mindestens-32-zeichen-lang',
		// Ohne Resend-Schluessel verlangt better-auth keine E-Mail-Bestaetigung.
		RESEND_API_KEY: ''
	},
	stdio: 'ignore'
});
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const auf = async () => {
	try {
		return (await fetch(`http://localhost:${PORT}/api/health`)).ok;
	} catch {
		return false;
	}
};
for (let i = 0; i < 60 && !(await auf()); i++) await warte(250);

const KONTO = {
	email: 'probe@example.invalid',
	password: 'ein-langes-testpasswort-123',
	name: 'Probe'
};
const browser = await chromium.launch();
let fehler = 0;
const pruefe = (was, ok, zusatz = '') => {
	if (!ok) fehler++;
	console.log(`  ${ok ? '✓' : '✗'} ${was}${zusatz ? '   ' + zusatz : ''}`);
};

/** Ein "Geraet": eigener Browser-Kontext, eigener localStorage. */
async function geraet(anmelden) {
	const ctx = await browser.newContext({ serviceWorkers: 'block' });
	const page = await ctx.newPage();
	await page.goto(`http://localhost:${PORT}/objekte`);
	if (anmelden) {
		const r = await page.evaluate(async (k) => {
			const res = await fetch('/api/auth/sign-in/email', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email: k.email, password: k.password })
			});
			return res.status;
		}, KONTO);
		if (r !== 200) throw new Error(`Anmeldung fehlgeschlagen: HTTP ${r}`);
	}
	return { ctx, page };
}

// Konto anlegen
{
	const ctx = await browser.newContext();
	const page = await ctx.newPage();
	await page.goto(`http://localhost:${PORT}/`);
	const s = await page.evaluate(async (k) => {
		const res = await fetch('/api/auth/sign-up/email', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(k)
		});
		return res.status;
	}, KONTO);
	pruefe('Konto angelegt', s === 200, `HTTP ${s}`);
	await ctx.close();
}

// Geraet A: Objekt und Durchlauf anlegen, abgleichen
const a = await geraet(true);
await a.page.evaluate(() => {
	const jetzt = Date.now();
	localStorage.setItem(
		'ga-objekte',
		JSON.stringify({
			version: 1,
			objekte: [
				{
					id: 'o1',
					name: 'Seefeld',
					adresse: 'Seestrasse 1',
					auftraggeber: '',
					notiz: '',
					erstelltAm: jetzt,
					geaendertAm: jetzt
				}
			],
			anlagen: [],
			durchlaeufe: [
				{
					id: 'd1',
					objektId: 'o1',
					vorlage: 'ibn',
					titel: 'IBN MZ1',
					status: { a: true, b: true },
					notizen: { a: 'Ventil klemmt' },
					kontext: {},
					erledigt: 2,
					gesamt: 10,
					erstelltAm: jetzt,
					geaendertAm: jetzt
				}
			]
		})
	);
});
await a.page.reload();
await a.page.waitForTimeout(1500);
const aStand = await a.page.evaluate(
	() => JSON.parse(localStorage.getItem('ga-objekte')).abgeglichenAm
);
pruefe('Gerät A hat abgeglichen', typeof aStand === 'number' && aStand > 0);

// Geraet B: frischer Browser, dasselbe Konto
const b = await geraet(true);
await b.page.reload();
await b.page.waitForTimeout(1500);
const bBestand = await b.page.evaluate(() =>
	JSON.parse(localStorage.getItem('ga-objekte') ?? '{}')
);
pruefe(
	'Gerät B kennt das Objekt',
	bBestand.objekte?.[0]?.name === 'Seefeld',
	`gefunden: ${JSON.stringify(bBestand.objekte?.map((o) => o.name) ?? [])}`
);
pruefe(
	'Gerät B kennt den Durchlauf samt Häkchen',
	bBestand.durchlaeufe?.[0]?.erledigt === 2 && bBestand.durchlaeufe?.[0]?.status?.a === true
);
pruefe('und die Notiz', bBestand.durchlaeufe?.[0]?.notizen?.a === 'Ventil klemmt');

// Geraet B aendert, Geraet A holt es
await b.page.evaluate(() => {
	const x = JSON.parse(localStorage.getItem('ga-objekte'));
	x.durchlaeufe[0].status.c = true;
	x.durchlaeufe[0].geaendertAm = Date.now() + 1000;
	localStorage.setItem('ga-objekte', JSON.stringify(x));
});
await b.page.reload();
await b.page.waitForTimeout(1500);
await a.page.reload();
await a.page.waitForTimeout(1500);
const aNachher = await a.page.evaluate(() => JSON.parse(localStorage.getItem('ga-objekte')));
pruefe('Änderung von B kommt bei A an', aNachher.durchlaeufe?.[0]?.status?.c === true);

// Loeschen auf A darf auf B nicht wiederauferstehen
await a.page.evaluate(() => {
	const x = JSON.parse(localStorage.getItem('ga-objekte'));
	x.durchlaeufe[0].geloeschtAm = Date.now() + 2000;
	x.durchlaeufe[0].geaendertAm = Date.now() + 2000;
	localStorage.setItem('ga-objekte', JSON.stringify(x));
});
await a.page.reload();
await a.page.waitForTimeout(1500);
await b.page.reload();
await b.page.waitForTimeout(1500);
const bNachLoeschen = await b.page.evaluate(() => JSON.parse(localStorage.getItem('ga-objekte')));
pruefe(
	'auf A gelöscht bleibt auf B gelöscht',
	Boolean(bNachLoeschen.durchlaeufe?.[0]?.geloeschtAm)
);

// Fremdes Konto sieht nichts
{
	const fremd = await geraet(false);
	await fremd.page.reload();
	await fremd.page.waitForTimeout(1200);
	const x = await fremd.page.evaluate(() => JSON.parse(localStorage.getItem('ga-objekte') ?? '{}'));
	pruefe('ohne Anmeldung kommt nichts herüber', !x.objekte?.length);
	await fremd.ctx.close();
}

await browser.close();
srv.kill('SIGKILL');
rmSync(DB, { force: true });

if (fehler) {
	console.log(`\n  ${fehler} Abweichung(en) — der Abgleich tut nicht, was er soll.\n`);
	process.exit(1);
}
console.log('\n  Abgleich funktioniert zwischen zwei Geräten.\n');
