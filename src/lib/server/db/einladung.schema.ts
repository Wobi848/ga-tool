import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

/** Einladungen: ein Link, ein Konto.
 *
 * Gespeichert wird nur der SHA-256 des Tokens, nicht das Token selbst. Wer die
 * Datenbank liest, kann damit keine Einladung einloesen; der Link existiert
 * nur einmal, im Moment des Erstellens.
 */
export const einladung = sqliteTable(
	'einladung',
	{
		id: text('id').primaryKey(),
		tokenHash: text('token_hash').notNull().unique(),
		/** Fuer wen — nur zur eigenen Uebersicht, wird nicht geprueft. */
		notiz: text('notiz'),
		erstelltVon: text('erstellt_von').notNull(),
		erstelltAm: integer('erstellt_am', { mode: 'timestamp_ms' }).notNull(),
		laeuftAb: integer('laeuft_ab', { mode: 'timestamp_ms' }).notNull(),
		/** Gesetzt, sobald eine Registrierung damit beginnt. Scheitert sie,
		 *  wird es wieder geleert. */
		eingeloestAm: integer('eingeloest_am', { mode: 'timestamp_ms' }),
		/** Das Konto, das damit entstanden ist. */
		eingeloestVon: text('eingeloest_von')
	},
	(t) => [index('einladung_ablauf_idx').on(t.laeuftAb)]
);
