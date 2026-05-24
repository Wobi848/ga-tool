import { db } from './db';
import { user as userTable } from './db/auth.schema';
import { asc, eq } from 'drizzle-orm';

/**
 * Self-healing fuer bestehende Deployments ohne systemadmin:
 *
 * - Wenn schon ein systemadmin existiert: nichts tun.
 * - Sonst: aeltesten Admin (kleinste createdAt) auf systemadmin hochstufen.
 * - Wenn gar kein Admin existiert: nichts tun (Bootstrap-Hook in auth.ts
 *   regelt das ueber den ersten Sign-up).
 *
 * Wird einmal beim Server-Start aus hooks.server.ts aufgerufen.
 */
export async function ensureSystemAdmin(): Promise<void> {
	const existing = await db
		.select({ id: userTable.id })
		.from(userTable)
		.where(eq(userTable.role, 'systemadmin'))
		.limit(1);
	if (existing.length > 0) return;

	const oldestAdmin = await db
		.select({ id: userTable.id, email: userTable.email })
		.from(userTable)
		.where(eq(userTable.role, 'admin'))
		.orderBy(asc(userTable.createdAt))
		.limit(1);
	if (oldestAdmin.length === 0) return;

	await db
		.update(userTable)
		.set({ role: 'systemadmin' })
		.where(eq(userTable.id, oldestAdmin[0].id));

	console.log(
		`[bootstrap] Promoted ${oldestAdmin[0].email} to systemadmin (no systemadmin existed)`
	);
}
