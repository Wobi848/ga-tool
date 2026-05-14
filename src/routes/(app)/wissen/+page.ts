import { listMeta } from '$lib/wissen/articles';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const parentData = await parent();
	return {
		articles: listMeta(),
		userDisciplines: parentData.profile?.disciplines ?? []
	};
};
