import { loadChecklist } from '$lib/checklisten';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const template = await loadChecklist(params.slug);
	if (!template) error(404, 'Checkliste nicht gefunden');
	return { template };
};
