import { db } from '$lib/server/db';
import { user as userTable, session as sessionTable } from '$lib/server/db/auth.schema';
import { eq, desc } from 'drizzle-orm';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	const users = await db
		.select({
			id: userTable.id,
			name: userTable.name,
			email: userTable.email,
			role: userTable.role,
			banned: userTable.banned,
			banReason: userTable.banReason,
			createdAt: userTable.createdAt,
			updatedAt: userTable.updatedAt,
			profileRole: userTable.profileRole,
			company: userTable.company
		})
		.from(userTable)
		.orderBy(desc(userTable.createdAt));

	return { users };
};

export const actions: Actions = {
	ban: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const reason = (data.get('reason') as string)?.trim() || 'Gesperrt durch Admin';

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id) return fail(400, { error: 'Eigener Account kann nicht gesperrt werden' });

		await db
			.update(userTable)
			.set({ banned: true, banReason: reason })
			.where(eq(userTable.id, userId));

		// Invalidate all active sessions of that user
		await db.delete(sessionTable).where(eq(sessionTable.userId, userId));

		return { success: true, action: 'ban' };
	},

	unban: async ({ request }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });

		await db
			.update(userTable)
			.set({ banned: false, banReason: null })
			.where(eq(userTable.id, userId));

		return { success: true, action: 'unban' };
	},

	setRole: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;
		const role = data.get('role') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id) return fail(400, { error: 'Eigene Rolle kann nicht geändert werden' });
		if (role !== 'admin' && role !== 'user') return fail(400, { error: 'Ungültige Rolle' });

		await db.update(userTable).set({ role }).where(eq(userTable.id, userId));

		return { success: true, action: 'setRole' };
	},

	deleteUser: async ({ request, locals }) => {
		const data = await request.formData();
		const userId = data.get('userId') as string;

		if (!userId) return fail(400, { error: 'Keine User-ID' });
		if (userId === locals.user?.id) return fail(400, { error: 'Eigener Account kann nicht gelöscht werden' });

		// Cascade deletes sessions + accounts via FK
		await db.delete(userTable).where(eq(userTable.id, userId));

		return { success: true, action: 'delete' };
	}
};
