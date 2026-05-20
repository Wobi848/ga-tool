import changelogRaw from '../../../../CHANGELOG.md?raw';
import { marked } from 'marked';
import type { PageLoad } from './$types';

marked.setOptions({ gfm: true, breaks: false });

const EN_MARKER = '<!-- EN -->';

export const load: PageLoad = () => {
	const idx = changelogRaw.indexOf(EN_MARKER);
	const de = idx >= 0 ? changelogRaw.slice(0, idx).trim() : changelogRaw;
	const en = idx >= 0 ? changelogRaw.slice(idx + EN_MARKER.length).trim() : '';
	return {
		htmlDe: marked.parse(de) as string,
		htmlEn: en ? marked.parse(en) as string : ''
	};
};
