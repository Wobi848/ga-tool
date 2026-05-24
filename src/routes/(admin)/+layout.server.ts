import { error } from '@sveltejs/kit';
import { isAdminOrAbove } from '$lib/server/roles';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) error(401, 'Nicht eingeloggt');
	if (!isAdminOrAbove(locals.user.role)) error(403, 'Kein Zugriff — Admin erforderlich');
	return { user: locals.user };
};
