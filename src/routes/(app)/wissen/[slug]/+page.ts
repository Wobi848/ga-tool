import { articleMap } from '$lib/wissen/articles';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import type { PageLoad } from './$types';

marked.setOptions({
	gfm: true,
	breaks: false
});

export const load: PageLoad = ({ params }) => {
	const article = articleMap[params.slug];
	if (!article) error(404, 'Artikel nicht gefunden');

	// Render markdown to HTML at navigation time (still client-side cache-friendly)
	const html = marked.parse(article.body) as string;

	// Resolve related articles
	const related = article.related
		.map((slug) => articleMap[slug])
		.filter(Boolean)
		.map(({ body, ...meta }) => meta);

	return {
		article,
		html,
		related
	};
};
