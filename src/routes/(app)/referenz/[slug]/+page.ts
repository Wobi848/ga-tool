import { referenceMap } from '$lib/referenz';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const table = referenceMap[params.slug];
	if (!table) error(404, 'Tabelle nicht gefunden');
	return { table };
};
