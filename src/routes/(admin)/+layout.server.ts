import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user) error(401, 'Nicht eingeloggt');
	if (locals.user.role !== 'admin') error(403, 'Kein Zugriff — Admin erforderlich');
	return { user: locals.user };
};
