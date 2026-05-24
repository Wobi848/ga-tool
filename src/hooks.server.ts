import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { ensureSystemAdmin } from '$lib/server/bootstrap';
import { svelteKitHandler } from 'better-auth/svelte-kit';

// Einmaliger Boot-Check: alten Deployments ohne systemadmin nachträglich
// einen aus dem ältesten admin promoten. Während des Builds (Prerender)
// skippen — da ist die DB i.d.R. nicht erreichbar / leer.
if (!building) {
	ensureSystemAdmin().catch((e) => console.error('[bootstrap] systemadmin promotion failed:', e));
}

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
