import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { analyticsEvent } from '$lib/server/db/analytics.schema';
import { rateLimit } from '$lib/server/rateLimit';

const MAX_PATH_LEN = 256;
const ALLOWED_MODULES = new Set([
	'konverter',
	'rechner',
	'wissen',
	'checklisten',
	'referenz',
	'abkuerzungen',
	'profil',
	'settings'
]);

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

export const POST: RequestHandler = async ({ request, locals, getClientAddress }) => {
	const ip = getClientAddress();
	const key = locals.user?.id ? `track:user:${locals.user.id}` : `track:ip:${ip}`;
	if (!rateLimit(key, 120, 60 * 1000)) {
		return json({ ok: true });
	}

	try {
		const body = await request.json();
		let path = typeof body?.path === 'string' ? body.path : '/';

		if (path.length > MAX_PATH_LEN) path = path.slice(0, MAX_PATH_LEN);
		if (!path.startsWith('/')) path = '/';

		if (path.startsWith('/admin') || path.startsWith('/api')) {
			return json({ ok: true });
		}

		const { module, slug } = moduleFromPath(path);
		if (module === 'other' && path !== '/') {
			return json({ ok: true });
		}
		if (!ALLOWED_MODULES.has(path.split('/')[1] ?? '') && path !== '/') {
			return json({ ok: true });
		}

		const safeSlug = slug && slug.length <= 64 ? slug : null;

		await db.insert(analyticsEvent).values({
			userId: locals.user?.id ?? null,
			module,
			slug: safeSlug,
			path
		});
	} catch {
		// Non-critical — never fail the request
	}

	return json({ ok: true });
};
