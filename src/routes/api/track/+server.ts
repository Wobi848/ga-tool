import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { analyticsEvent } from '$lib/server/db/analytics.schema';

function moduleFromPath(path: string): { module: string; slug: string | null } {
	if (path === '/') return { module: 'dashboard', slug: null };

	const segments = path.split('/').filter(Boolean);
	const first = segments[0];
	const slug = segments[1] ?? null;

	const moduleMap: Record<string, string> = {
		konverter: 'konverter',
		rechner: 'rechner',
		wissen: 'wissen',
		checklisten: 'checkliste',
		referenz: 'referenz',
		abkuerzungen: 'abkuerzungen',
		profil: 'profil',
		settings: 'settings'
	};

	return { module: moduleMap[first] ?? 'other', slug };
}

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const body = await request.json();
		const path = typeof body?.path === 'string' ? body.path : '/';

		// Don't track admin pages
		if (path.startsWith('/admin') || path.startsWith('/api')) {
			return json({ ok: true });
		}

		const { module, slug } = moduleFromPath(path);

		await db.insert(analyticsEvent).values({
			userId: locals.user?.id ?? null,
			module,
			slug,
			path
		});
	} catch {
		// Non-critical — never fail the request
	}

	return json({ ok: true });
};
