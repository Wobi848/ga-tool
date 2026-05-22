import { sqliteTable, text, integer, primaryKey, index } from 'drizzle-orm/sqlite-core';

/**
 * Tages-Aggregat aus analyticsEvent. Wird vom rollup-Job befuellt, wenn die
 * Rohdaten aelter werden als die Aufbewahrungsfrist (default 30 Tage).
 *
 * Schluessel: (day, module, slug) — Slug ist '' (leerer String) fuer Aggregate
 * ohne Slug, da SQLite-PK NULLs nicht eindeutig macht.
 */
export const analyticsDaily = sqliteTable(
	'analytics_daily',
	{
		day: text('day').notNull(), // YYYY-MM-DD
		module: text('module').notNull(),
		slug: text('slug').notNull().default(''),
		cnt: integer('cnt').notNull(),
		uniqueUsers: integer('unique_users').notNull()
	},
	(t) => [
		primaryKey({ columns: [t.day, t.module, t.slug] }),
		index('analytics_daily_day_idx').on(t.day),
		index('analytics_daily_module_idx').on(t.module)
	]
);
