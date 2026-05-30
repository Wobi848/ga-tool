import { articleMap, loadFullArticle } from '$lib/wissen/articles';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const article = await loadFullArticle(params.slug);
	if (!article) error(404, 'Article not found');

	const related = article.related.map((slug) => articleMap[slug]).filter(Boolean);

	return { article, related };
};
