import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { APP_VERSION } from './version';

/* APP_VERSION und package.json sind schon einmal auseinandergelaufen.
 *
 * Am 13.09.2026 stand hier 0.9.6, in package.json 0.9.7 — server-update.sh
 * liest die Zahl aus dieser Datei und meldete daraufhin die falsche Version
 * als ausgerollt. Ein Kommentar hat das nicht verhindert, ein Test tut es.
 */

const pkg = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8'));

describe('APP_VERSION', () => {
	it('stimmt mit package.json ueberein', () => {
		expect(APP_VERSION).toBe(pkg.version);
	});

	it('ist eine echte Version, kein Platzhalter', () => {
		expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
		expect(APP_VERSION).not.toBe('0.0.1');
	});

	it('steht im Changelog', () => {
		// Eine Version ohne Eintrag ist eine Zahl, die niemandem sagt, was sich
		// geaendert hat.
		const changelog = readFileSync(new URL('../../CHANGELOG.md', import.meta.url), 'utf8');
		expect(changelog).toContain(`## v${APP_VERSION}`);
	});
});
