#!/usr/bin/env node
/* Preflight — prueft die Deployment-Checkliste, soweit sie pruefbar ist.
 *
 * WOFUER
 * ------
 * In DEPLOYMENT.md stand eine Liste zum Abhaken. Ein Haken, den ein Mensch
 * setzt, sagt nur, dass jemand hingeschaut hat — nicht, dass es stimmt. Was
 * sich maschinell pruefen laesst, wird hier geprueft; der Rest wird als
 * ausdruecklich offen ausgewiesen, statt stillschweigend als erledigt zu
 * gelten.
 *
 * Aufruf:  npm run preflight            (lokal, erwartet Entwicklungsstand)
 *          npm run preflight -- --prod  (Zielsystem, strenger)
 *
 * Rueckgabe 0 wenn nichts Kritisches offen ist, sonst 1.
 */

import { readFileSync, statSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const prod = process.argv.includes('--prod');

const gruen = '\x1b[32m';
const rot = '\x1b[31m';
const gelb = '\x1b[33m';
const grau = '\x1b[90m';
const weg = '\x1b[0m';

let fehler = 0;
let warnungen = 0;

function pruefe(titel, fn, { kritisch = true } = {}) {
	let ergebnis;
	try {
		ergebnis = fn();
	} catch (e) {
		ergebnis = { ok: false, info: e.message };
	}
	const { ok, info } = ergebnis;
	if (ok) {
		console.log(`  ${gruen}✓${weg} ${titel}${info ? `  ${grau}${info}${weg}` : ''}`);
	} else if (kritisch) {
		fehler++;
		console.log(`  ${rot}✗${weg} ${titel}${info ? `  ${rot}${info}${weg}` : ''}`);
	} else {
		warnungen++;
		console.log(`  ${gelb}!${weg} ${titel}${info ? `  ${gelb}${info}${weg}` : ''}`);
	}
}

function env() {
	const p = join(wurzel, '.env');
	if (!existsSync(p)) return {};
	return Object.fromEntries(
		readFileSync(p, 'utf8')
			.split('\n')
			.filter((l) => l.trim() && !l.startsWith('#') && l.includes('='))
			.map((l) => {
				const i = l.indexOf('=');
				return [
					l.slice(0, i).trim(),
					l
						.slice(i + 1)
						.trim()
						.replace(/^["']|["']$/g, '')
				];
			})
	);
}

console.log(`\n${prod ? 'Preflight — Zielsystem' : 'Preflight — lokal'}\n`);
console.log('Zugangsdaten und Umgebung');

const e = env();

pruefe('.env vorhanden', () => ({ ok: existsSync(join(wurzel, '.env')) }));

pruefe('.env ist nur fuer den Besitzer lesbar (600)', () => {
	const m = (statSync(join(wurzel, '.env')).mode & 0o777).toString(8).padStart(3, '0');
	return { ok: m === '600', info: `chmod ${m}` };
});

pruefe('BETTER_AUTH_SECRET ist mindestens 32 Zeichen lang', () => {
	const v = e.BETTER_AUTH_SECRET ?? '';
	return { ok: v.length >= 32, info: `${v.length} Zeichen` };
});

pruefe(
	'BETTER_AUTH_SECRET ist kein Platzhalter',
	() => {
		const v = (e.BETTER_AUTH_SECRET ?? '').toLowerCase();
		const verdaechtig = ['change', 'secret', 'example', 'test', 'todo', 'xxx'];
		return { ok: !verdaechtig.some((w) => v.includes(w)) };
	},
	{ kritisch: prod }
);

pruefe(
	'ORIGIN ist eine HTTPS-URL',
	() => {
		const v = e.ORIGIN ?? '';
		return { ok: v.startsWith('https://'), info: v || 'nicht gesetzt' };
	},
	{ kritisch: prod }
);

console.log('\nDatenbank');

pruefe('DATABASE_URL ist gesetzt', () => ({ ok: Boolean(e.DATABASE_URL), info: e.DATABASE_URL }));

pruefe('die Datenbank liegt nicht im oeffentlichen Verzeichnis', () => {
	const url = e.DATABASE_URL ?? '';
	const pfad = url.replace(/^file:/, '');
	const oeffentlich = pfad.includes('/static/') || pfad.includes('/build/client/');
	return { ok: !oeffentlich, info: pfad };
});

pruefe('keine Datenbankdatei ist versioniert', () => {
	const out = execSync('git ls-files', { cwd: wurzel, encoding: 'utf8' });
	const treffer = out.split('\n').filter((f) => /\.db$|\.sqlite3?$/.test(f));
	return { ok: treffer.length === 0, info: treffer.join(', ') };
});

pruefe('.env ist nicht versioniert', () => {
	const out = execSync('git ls-files', { cwd: wurzel, encoding: 'utf8' });
	return { ok: !out.split('\n').includes('.env') };
});

console.log('\nCode');

pruefe(
	'Arbeitsverzeichnis ist sauber',
	() => {
		const out = execSync('git status --porcelain', { cwd: wurzel, encoding: 'utf8' }).trim();
		const n = out ? out.split('\n').length : 0;
		return { ok: n === 0, info: n ? `${n} Aenderungen` : '' };
	},
	{ kritisch: prod }
);

pruefe('Health-Endpunkt existiert', () => ({
	ok: existsSync(join(wurzel, 'src/routes/api/health/+server.ts'))
}));

pruefe('package.json traegt eine echte Version', () => {
	const v = JSON.parse(readFileSync(join(wurzel, 'package.json'), 'utf8')).version;
	return { ok: v !== '0.0.1' && /^\d+\.\d+\.\d+/.test(v), info: `v${v}` };
});

pruefe('keine bekannten Sicherheitsluecken hoher Stufe', () => {
	try {
		execSync('npm audit --omit=dev --audit-level=high', {
			cwd: wurzel,
			stdio: 'pipe'
		});
		return { ok: true };
	} catch {
		return { ok: false, info: 'npm audit meldet mindestens eine hohe Luecke' };
	}
});

console.log(`\n${grau}Nur am Zielsystem pruefbar — hier bewusst offen:${weg}`);
for (const z of [
	'Reverse Proxy terminiert HTTPS (Let’s Encrypt o.ä.)',
	'taegliches Backup der Datenbank laeuft und wurde einmal zurueckgespielt',
	'systemd-Unit mit ProtectSystem=strict, unprivilegierter Benutzer',
	'Health-Endpunkt ist im Monitoring eingehaengt'
]) {
	console.log(`  ${grau}·${weg} ${z}`);
}

console.log('');
if (fehler) {
	console.log(
		`${rot}${fehler} kritisch${weg}${warnungen ? `, ${gelb}${warnungen} zu pruefen${weg}` : ''}\n`
	);
	process.exit(1);
}
console.log(
	`${gruen}alles bestanden${weg}${warnungen ? `, ${gelb}${warnungen} zu pruefen${weg}` : ''}\n`
);
