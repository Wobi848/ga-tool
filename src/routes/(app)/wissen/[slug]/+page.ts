import { articleMap } from '$lib/wissen/articles';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const article = articleMap[params.slug];
	if (!article) error(404, 'Article not found');

	const related = article.related
		.map((slug) => articleMap[slug])
		.filter(Boolean)
		.map(({ body, bodyDe, bodyEn, ...meta }) => meta);

	return { article, related };
};
