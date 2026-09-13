import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';

/* Objektverwaltung auf dem Server — siehe docs/KONZEPT-OBJEKTE.md.
 *
 * Anders als `user_favorites`, die die ganze Liste als ein JSON je Benutzer
 * ablegen, bekommt hier **jeder Datensatz eine Zeile**. Sonst liesse sich die
 * Konfliktregel «der juengere geaendertAm gewinnt, je Datensatz» nicht
 * umsetzen: ein Geraet wuerde beim Abgleich die Arbeit des anderen komplett
 * ueberschreiben.
 *
 * `geloescht_am` ist ein Grabstein und kein Schoenheitsfehler: ohne ihn taucht
 * ein auf dem Telefon geloeschter Durchlauf beim naechsten Abgleich vom Laptop
 * wieder auf, weil der Laptop ihn noch kennt und fuer neu haelt.
 */

export const objekt = sqliteTable(
	'objekt',
	{
		id: text('id').primaryKey(),
		userId: text('user_id').notNull(),
		name: text('name').notNull(),
		adresse: text('adresse').notNull().default(''),
		auftraggeber: text('auftraggeber').notNull().default(''),
		notiz: text('notiz').notNull().default(''),
		erstelltAm: integer('erstellt_am').notNull(),
		geaendertAm: integer('geaendert_am').notNull(),
		archiviertAm: integer('archiviert_am'),
		geloeschtAm: integer('geloescht_am')
	},
	(t) => [index('objekt_user_idx').on(t.userId)]
);

export const anlage = sqliteTable(
	'anlage',
	{
		id: text('id').primaryKey(),
		userId: text('user_id').notNull(),
		objektId: text('objekt_id').notNull(),
		name: text('name').notNull(),
		art: text('art').notNull().default('sonstige'),
		reihenfolge: integer('reihenfolge').notNull().default(0),
		erstelltAm: integer('erstellt_am').notNull(),
		geaendertAm: integer('geaendert_am').notNull(),
		geloeschtAm: integer('geloescht_am')
	},
	(t) => [index('anlage_user_idx').on(t.userId), index('anlage_objekt_idx').on(t.objektId)]
);

export const durchlauf = sqliteTable(
	'durchlauf',
	{
		id: text('id').primaryKey(),
		userId: text('user_id').notNull(),
		objektId: text('objekt_id').notNull(),
		anlageId: text('anlage_id'),
		vorlage: text('vorlage').notNull(),
		titel: text('titel').notNull(),
		/* Zustand als JSON. Die Struktur der Checklisten aendert sich mit den
		 * Vorlagen; sie in Spalten zu zerlegen hiesse, bei jeder neuen Vorlage
		 * eine Migration zu schreiben. Ausgewertet wird ohnehin im Client. */
		status: text('status').notNull().default('{}'),
		notizen: text('notizen').notNull().default('{}'),
		kontext: text('kontext').notNull().default('{}'),
		/* Liegen daneben, obwohl sie im JSON stecken — damit die Uebersicht
		 * nicht jeden Durchlauf auspacken muss, um einen Fortschritt zu zeigen. */
		erledigt: integer('erledigt').notNull().default(0),
		gesamt: integer('gesamt').notNull().default(0),
		erstelltAm: integer('erstellt_am').notNull(),
		geaendertAm: integer('geaendert_am').notNull(),
		abgeschlossenAm: integer('abgeschlossen_am'),
		geloeschtAm: integer('geloescht_am')
	},
	(t) => [index('durchlauf_user_idx').on(t.userId), index('durchlauf_objekt_idx').on(t.objektId)]
);
