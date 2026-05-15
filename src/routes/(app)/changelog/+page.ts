import changelogRaw from '../../../../CHANGELOG.md?raw';
import { marked } from 'marked';
import type { PageLoad } from './$types';

marked.setOptions({ gfm: true, breaks: false });

export const load: PageLoad = () => {
	const html = marked.parse(changelogRaw) as string;
	return { html };
};
