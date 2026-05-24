// Migration-Runner fuer Produktion: wendet alle SQL-Migrationen aus drizzle/
// auf die DB an. Idempotent (drizzle pflegt eine __drizzle_migrations-Tabelle).
//
// Plain ESM-JS — laeuft ohne tsx/ts-node. Aufruf: npm run db:migrate
//
// DRIZZLE_BASELINE=1: bestehende DBs (vor Einfuehrung der Migrations) als
// "applied" markieren ohne sie auszufuehren.

import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const url = process.env.DATABASE_URL;
if (!url) {
	console.error('DATABASE_URL is not set');
	process.exit(1);
}

const migrationsFolder = './drizzle';

if (!existsSync(migrationsFolder)) {
	console.error(`Migrations folder '${migrationsFolder}' not found`);
	process.exit(1);
}

// Parent dir anlegen falls noetig (DB in Unterordner)
const dbDir = url.includes('/') ? url.substring(0, url.lastIndexOf('/')) : '';
if (dbDir && !existsSync(dbDir)) {
	mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(url);
const db = drizzle(sqlite);

// Baseline-Modus: vorhandene DB als migriert markieren, ohne SQL auszufuehren.
if (process.env.DRIZZLE_BASELINE === '1') {
	console.log('🔧 Baseline mode: marking existing migrations as applied');
	sqlite.exec(`
		CREATE TABLE IF NOT EXISTS __drizzle_migrations (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			hash TEXT NOT NULL,
			created_at NUMERIC
		)
	`);
	const journal = JSON.parse(readFileSync(join(migrationsFolder, 'meta', '_journal.json'), 'utf8'));
	const insert = sqlite.prepare(
		'INSERT OR IGNORE INTO __drizzle_migrations (hash, created_at) VALUES (?, ?)'
	);
	for (const entry of journal.entries) {
		const sqlFile = readFileSync(join(migrationsFolder, `${entry.tag}.sql`), 'utf8');
		const hash = createHash('sha256').update(sqlFile).digest('hex');
		insert.run(hash, entry.when);
		console.log(`  ✓ ${entry.tag}`);
	}
	console.log('Baseline complete.');
	process.exit(0);
}

console.log(`Running migrations from ${migrationsFolder} against ${url}...`);
migrate(db, { migrationsFolder });

const files = readdirSync(migrationsFolder).filter((f) => f.endsWith('.sql'));
console.log(`✓ ${files.length} migration files processed.`);

sqlite.close();
