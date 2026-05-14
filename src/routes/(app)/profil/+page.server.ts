import { error, fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { user } from '$lib/server/db/auth.schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) error(401);
	const row = await db.query.user.findFirst({ where: eq(user.id, locals.user.id) });
	if (!row) error(404);
	return {
		profile: {
			name: row.name ?? '',
			email: row.email,
			role: row.role ?? 'user',
			profileRole: row.profileRole ?? '',
			company: row.company ?? '',
			disciplines: parseJsonArray(row.disciplines),
			mfrPrefs: parseJsonArray(row.mfrPrefs),
			defaultCity: row.defaultCity ?? '',
			notes: row.notes ?? ''
		}
	};
};

function parseJsonArray(raw: string | null | undefined): string[] {
	if (!raw) return [];
	try {
		const v = JSON.parse(raw);
		return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
	} catch {
		return [];
	}
}

export const actions: Actions = {
	save: async ({ request, locals }) => {
		if (!locals.user) return fail(401, { error: 'Nicht angemeldet' });
		const data = await request.formData();

		const name = (data.get('name') as string | null)?.trim() || null;
		const profileRole = (data.get('profileRole') as string | null)?.trim() || null;
		const company = (data.get('company') as string | null)?.trim() || null;
		const defaultCity = (data.get('defaultCity') as string | null)?.trim() || null;
		const notes = (data.get('notes') as string | null)?.trim() || null;

		const disciplines = data.getAll('disciplines').map((v) => String(v)).filter(Boolean);
		const mfrPrefs = data.getAll('mfrPrefs').map((v) => String(v)).filter(Boolean);

		if (!name) return fail(400, { error: 'Name darf nicht leer sein' });

		await db
			.update(user)
			.set({
				name,
				profileRole,
				company,
				disciplines: JSON.stringify(disciplines),
				mfrPrefs: JSON.stringify(mfrPrefs),
				defaultCity,
				notes
			})
			.where(eq(user.id, locals.user.id));

		return { success: true };
	}
};
