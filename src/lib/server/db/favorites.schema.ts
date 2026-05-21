import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userFavorites = sqliteTable('user_favorites', {
	userId: text('user_id').primaryKey(),
	data: text('data').notNull().default('[]'),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
});
