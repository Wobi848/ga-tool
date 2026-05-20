import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const lang = cookies.get('ga-lang') ?? 'de';
	return { lang: lang as 'de' | 'en' };
};
