import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const data = await parent();
	return {
		defaultCity: data.profile?.defaultCity ?? null,
		defaultTemp: data.profile?.defaultTemp ?? null,
		mfrPrefs: data.profile?.mfrPrefs ?? []
	};
};
