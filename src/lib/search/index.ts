import Fuse from 'fuse.js';
import { converters } from '$lib/converters';
import { rechner } from '$lib/rechner';
import { articles } from '$lib/wissen/articles';
import { abbreviations } from '$lib/abkuerzungen/data';
import { equivalentShorts } from '$lib/abkuerzungen/groups';
import { referenceTables } from '$lib/referenz';
import { checklists } from '$lib/checklisten';

// Pre-compute lookup: short → long, for keyword enrichment
const abbrLongByShort: Record<string, string> = Object.fromEntries(
	abbreviations.map((a) => [a.short, a.long])
);

export type SearchType =
	| 'konverter'
	| 'rechner'
	| 'wissen'
	| 'abkuerzung'
	| 'referenz'
	| 'checkliste';

export interface SearchItem {
	type: SearchType;
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	keywords?: string[];
	url: string;
}

const items: SearchItem[] = [
	...converters.map((c) => ({
		type: 'konverter' as const,
		slug: c.slug,
		title: c.name,
		title_en: c.name_en,
		subtitle: c.units.map((u) => u.symbol).join(' · '),
		keywords: c.units.map((u) => u.label),
		url: `/konverter/${c.slug}`
	})),
	...rechner.map((r) => ({
		type: 'rechner' as const,
		slug: r.slug,
		title: r.name,
		title_en: r.name_en,
		subtitle: r.short,
		subtitle_en: r.short_en,
		url: `/rechner/${r.slug}`
	})),
	...articles.map((a) => ({
		type: 'wissen' as const,
		slug: a.slug,
		title: a.title,
		title_en: a.title_en,
		subtitle: `${a.category}${a.subcategory ? ' · ' + a.subcategory : ''}`,
		keywords: a.tags,
		url: `/wissen/${a.slug}`
	})),
	...abbreviations.map((a) => {
		const eqShorts = equivalentShorts(a.short);
		const eqLongs = eqShorts.map((s) => abbrLongByShort[s]).filter(Boolean);
		return {
			type: 'abkuerzung' as const,
			slug: a.short.toLowerCase(),
			title: `${a.short} — ${a.long}`,
			subtitle: a.description,
			subtitle_en: a.descriptionEn,
			keywords: [a.short, a.long, ...(a.related ?? []), ...eqShorts, ...eqLongs],
			url: a.wissenSlug
				? `/wissen/${a.wissenSlug}`
				: `/abkuerzungen?q=${encodeURIComponent(a.short)}`
		};
	}),
	...referenceTables.map((t) => ({
		type: 'referenz' as const,
		slug: t.slug,
		title: t.title,
		title_en: t.title_en,
		subtitle: t.subtitle ?? t.category,
		subtitle_en: t.subtitle_en,
		keywords: [t.category, ...(t.norm ?? [])],
		url: `/referenz/${t.slug}`
	})),
	...checklists.map((c) => ({
		type: 'checkliste' as const,
		slug: c.slug,
		title: c.title,
		title_en: c.title_en,
		subtitle: c.subtitle ?? c.category,
		subtitle_en: c.subtitle_en,
		keywords: [c.category, ...(c.norm ?? [])],
		url: `/checklisten/${c.slug}`
	}))
];

const fuse = new Fuse(items, {
	keys: [
		{ name: 'title', weight: 3 },
		{ name: 'subtitle', weight: 1 },
		{ name: 'keywords', weight: 2 }
	],
	threshold: 0.4,
	ignoreLocation: true,
	minMatchCharLength: 1
});

export function search(query: string, limit = 12): SearchItem[] {
	const q = query.trim();
	if (!q) return items.slice(0, limit);
	return fuse.search(q, { limit }).map((r) => r.item);
}

export function groupByType(list: SearchItem[]): Record<SearchType, SearchItem[]> {
	return list.reduce(
		(acc, item) => {
			(acc[item.type] = acc[item.type] ?? []).push(item);
			return acc;
		},
		{} as Record<SearchType, SearchItem[]>
	);
}

export const typeLabels: Record<SearchType, string> = {
	konverter: 'Konverter',
	rechner: 'Rechner',
	wissen: 'Wissensbasis',
	abkuerzung: 'Abkürzungen',
	referenz: 'Referenz',
	checkliste: 'Checklisten'
};

export const typeColors: Record<SearchType, string> = {
	konverter: '#2563eb',
	rechner: '#ea580c',
	wissen: '#16a34a',
	abkuerzung: '#7c3aed',
	referenz: '#0891b2',
	checkliste: '#7c3aed'
};
