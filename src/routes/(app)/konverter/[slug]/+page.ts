import { converterMap } from '$lib/converters';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const converter = converterMap[params.slug];
	if (!converter) error(404, 'Konverter nicht gefunden');
	return { converter };
};
