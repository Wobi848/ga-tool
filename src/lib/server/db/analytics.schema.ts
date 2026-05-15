import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { user } from './auth.schema';

export const analyticsEvent = sqliteTable(
	'analytics_event',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		userId: text('user_id').references(() => user.id, { onDelete: 'set null' }),
		module: text('module').notNull(), // dashboard | konverter | rechner | wissen | checkliste | referenz | abkuerzungen | profil | other
		slug: text('slug'), // specific item, e.g. 'druck', 'heizkurve', 'modbus'
		path: text('path').notNull(),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
			.notNull()
	},
	(t) => [
		index('analytics_user_idx').on(t.userId),
		index('analytics_module_idx').on(t.module),
		index('analytics_created_idx').on(t.createdAt)
	]
);
