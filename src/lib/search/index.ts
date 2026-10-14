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
	/** Body-Text-Snippet (max ~3000 Zeichen) für Volltext-Treffer */
	body?: string;
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
		keywords: [...a.tags, ...a.norm, a.category, ...(a.subcategory ? [a.subcategory] : [])],
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
		keywords: [
			t.category,
			...(t.norm ?? []),
			...(t.description ? [t.description] : []),
			...(t.description_en ? [t.description_en] : [])
		],
		url: `/referenz/${t.slug}`
	})),
	...checklists.map((c) => ({
		type: 'checkliste' as const,
		slug: c.slug,
		title: c.title,
		title_en: c.title_en,
		subtitle: c.subtitle ?? c.category,
		subtitle_en: c.subtitle_en,
		keywords: [c.category],
		url: `/checklisten/${c.slug}`
	}))
];

const FUSE_OPTIONS = {
	keys: [
		{ name: 'title', weight: 4 },
		{ name: 'title_en', weight: 4 },
		{ name: 'keywords', weight: 2 },
		{ name: 'subtitle', weight: 1 },
		{ name: 'subtitle_en', weight: 1 }
		// Der Fliesstext ist hier bewusst NICHT drin, siehe search().
	],
	threshold: 0.35,
	ignoreLocation: true,
	minMatchCharLength: 2
};

const fuse: Fuse<SearchItem> = new Fuse(items, FUSE_OPTIONS);
let corpusLoaded = false;
let corpusLoading: Promise<void> | null = null;

/**
 * Lädt das Wissens-Korpus (Body-Texte) lazy nach und re-indexiert Fuse mit
 * Volltext. Bis dahin wird über Title/Keywords/Subtitle gesucht.
 * Idempotent — mehrfache Aufrufe teilen sich denselben Promise.
 */
export async function ensureSearchCorpus(): Promise<void> {
	if (corpusLoaded) return;
	if (corpusLoading) return corpusLoading;
	corpusLoading = (async () => {
		const corpus = (await import('./corpus.generated.json')).default as Record<string, string>;
		for (const item of items) {
			if (item.type === 'wissen') {
				item.body = corpus[item.slug]?.toLowerCase();
			}
		}
		corpusLoaded = true;
	})();
	return corpusLoading;
}

/* Unscharf nur ueber Titel, Tags und Untertitel; im Fliesstext exakt.
 *
 * Bis 0.16.0 lief Fuse auch ueber den Fliesstext aller Artikel, rund 400 KB,
 * bei jedem Tastendruck. Gemessen am 14.10.2026 auf einem Laptop: 80 bis
 * 220 ms pro Suche, ohne Fliesstext 8 bis 35 ms. Auf dem Handy grob das
 * Drei- bis Fuenffache — die Suche ruckelte bei jedem Buchstaben.
 *
 * Unschaerfe braucht es fuer Vertipper im Titel ("Schutz" fuer "Schütz"),
 * nicht im Fliesstext: wer dort sucht, sucht ein Wort, das darin vorkommt.
 * Fliesstext-Treffer kommen hinter die Titeltreffer, nicht dazwischen. */
export function search(query: string, limit = 12): SearchItem[] {
	const q = query.trim();
	if (!q) return items.slice(0, limit);
	const treffer = fuse.search(q, { limit }).map((r) => r.item);
	if (!corpusLoaded || q.length < 3 || treffer.length >= limit) return treffer;

	const gesucht = q.toLowerCase();
	const schon = new Set(treffer);
	for (const item of items) {
		if (treffer.length >= limit) break;
		if (item.body && !schon.has(item) && item.body.includes(gesucht)) {
			treffer.push(item);
		}
	}
	return treffer;
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
