import { loadReferenceTable } from '$lib/referenz';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const table = await loadReferenceTable(params.slug);
	if (!table) error(404, 'Tabelle nicht gefunden');
	return { table };
};
