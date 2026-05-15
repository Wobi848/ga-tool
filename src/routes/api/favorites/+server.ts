import { json, error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { userFavorites } from '$lib/server/db/favorites.schema';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) error(401);

	const row = await db.query.userFavorites.findFirst({
		where: eq(userFavorites.userId, locals.user.id)
	});

	const data = row?.data ?? '[]';
	return json(JSON.parse(data));
};

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) error(401);

	const body = await request.json();
	if (!Array.isArray(body)) error(400, 'Expected array');

	const data = JSON.stringify(body);
	const now = new Date();
	await db
		.insert(userFavorites)
		.values({ userId: locals.user.id, data, updatedAt: now })
		.onConflictDoUpdate({
			target: userFavorites.userId,
			set: { data, updatedAt: now }
		});

	return json({ ok: true });
};
