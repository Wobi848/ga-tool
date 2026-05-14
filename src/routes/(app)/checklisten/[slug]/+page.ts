import { checklistMap } from '$lib/checklisten';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const template = checklistMap[params.slug];
	if (!template) error(404, 'Checkliste nicht gefunden');
	return { template };
};
