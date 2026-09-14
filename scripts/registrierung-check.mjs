#!/usr/bin/env node
/* Prueft, dass eine geschlossene Registrierung wirklich geschlossen ist.
 *
 * WARUM ES DAS GIBT
 * -----------------
 * Am 14.09.2026 war sie es nicht. Die `register`-Action der Anmeldeseite
 * lehnte korrekt mit 403 ab — und derselbe Vorgang an better-auths eigenem
 * Endpunkt `/api/auth/sign-up/email` legte trotzdem ein Konto an. Zwei Tueren,
 * eine verschlossen. Aufgefallen ist es nur, weil ich nach dem Ausrollen
 * *beide* ausprobiert habe statt nur der offensichtlichen.
 *
 * Aufruf:  npm run build && node scripts/registrierung-check.mjs
 */
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';

const PORT = 4194;
const DB = '/tmp/ga-registrierung-check.db';
const BASIS = `http://localhost:${PORT}`;
rmSync(DB, { force: true });

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
		ORIGIN: BASIS,
		DATABASE_URL: DB,
		BETTER_AUTH_SECRET: 'nur-fuer-den-test-mindestens-32-zeichen-lang',
		RESEND_API_KEY: '',
		REGISTRIERUNG_OFFEN: 'false'
	},
	stdio: 'ignore'
});
const warte = (ms) => new Promise((r) => setTimeout(r, ms));
const auf = async () => {
	try {
		return (await fetch(`${BASIS}/api/health`)).ok;
	} catch {
		return false;
	}
};
for (let i = 0; i < 60 && !(await auf()); i++) await warte(250);

let fehler = 0;
const pruefe = (was, ok, zusatz = '') => {
	if (!ok) fehler++;
	console.log(`  ${ok ? '✓' : '✗'} ${was}${zusatz ? '   ' + zusatz : ''}`);
};

const anmeldungApi = (email) =>
	fetch(`${BASIS}/api/auth/sign-up/email`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: BASIS },
		body: JSON.stringify({ email, password: 'ein-langes-testpasswort-123', name: 'Probe' })
	});

const anmeldungFormular = (email) =>
	fetch(`${BASIS}/login?/register`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded', Origin: BASIS },
		body: new URLSearchParams({ email, password: 'ein-langes-testpasswort-123', name: 'Probe' })
	});

const konten = async () => {
	const { default: Database } = await import('better-sqlite3');
	const db = new Database(DB, { readonly: true });
	const n = db.prepare('select count(*) c from user').get().c;
	db.close();
	return n;
};

// 1. Ohne jedes Konto muss Registrierung gehen — sonst sperrt sich eine
//    frische Installation selbst aus.
{
	const r = await anmeldungApi('erster@example.invalid');
	pruefe(
		'erstes Konto geht auch bei geschlossener Registrierung',
		r.status === 200,
		`HTTP ${r.status}`
	);
}

// 2. Ab jetzt muss zu sein — an beiden Tueren.
{
	const r = await anmeldungApi('zweiter@example.invalid');
	pruefe(
		'zweites Konto über die Schnittstelle wird abgelehnt',
		r.status !== 200,
		`HTTP ${r.status}`
	);
}
{
	const r = await anmeldungFormular('dritter@example.invalid');
	const text = await r.text();
	pruefe(
		'zweites Konto über das Formular wird abgelehnt',
		text.includes('geschlossen'),
		text.slice(0, 90)
	);
}

pruefe('es ist genau ein Konto entstanden', (await konten()) === 1, `Konten: ${await konten()}`);

// 3. Anmelden muss weiterhin gehen — sonst haetten wir die Tuer zugemauert.
{
	const r = await fetch(`${BASIS}/api/auth/sign-in/email`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Origin: BASIS },
		body: JSON.stringify({
			email: 'erster@example.invalid',
			password: 'ein-langes-testpasswort-123'
		})
	});
	pruefe('anmelden geht weiterhin', r.status === 200, `HTTP ${r.status}`);
}

// 4. Und die Anmeldeseite darf keinen Weg dorthin anbieten.
{
	const html = await (await fetch(`${BASIS}/login`)).text();
	pruefe('die Anmeldeseite bietet keine Registrierung an', !html.includes('Noch kein Account'));
}

srv.kill('SIGKILL');
rmSync(DB, { force: true });

if (fehler) {
	console.log(`\n  ${fehler} Abweichung(en) — die Registrierung ist nicht dicht.\n`);
	process.exit(1);
}
console.log('\n  Registrierung ist dicht, Anmeldung geht.\n');
