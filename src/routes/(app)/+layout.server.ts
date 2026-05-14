import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user as userTable } from '$lib/server/db/auth.schema';
import type { LayoutServerLoad } from './$types';

function parseJsonArray(raw: string | null | undefined): string[] {
	if (!raw) return [];
	try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
	} catch {
		return [];
	}
}

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) redirect(302, '/login');

	const row = await db.query.user.findFirst({ where: eq(userTable.id, locals.user.id) });

	return {
		user: locals.user,
		profile: {
			profileRole: row?.profileRole ?? null,
			company: row?.company ?? null,
			disciplines: parseJsonArray(row?.disciplines),
			mfrPrefs: parseJsonArray(row?.mfrPrefs),
			defaultCity: row?.defaultCity ?? null
		}
	};
};
