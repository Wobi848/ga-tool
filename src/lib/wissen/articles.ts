import type { Article, ArticleMeta, Area, Difficulty } from './types';

// Vite glob — loads all markdown files as raw strings at build time
const modules = import.meta.glob('/content/wissen/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

/** Tiny browser-safe frontmatter parser for our limited subset (no Node Buffer needed). */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	if (!m) return { data: {}, content: raw };
	const yaml = m[1];
	const content = m[2] ?? '';
	const data: Record<string, unknown> = {};
	for (const line of yaml.split(/\r?\n/)) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const colon = trimmed.indexOf(':');
		if (colon < 0) continue;
		const key = trimmed.slice(0, colon).trim();
		const valueRaw = trimmed.slice(colon + 1).trim();
		if (valueRaw.startsWith('[') && valueRaw.endsWith(']')) {
			const inner = valueRaw.slice(1, -1).trim();
			data[key] = inner === ''
				? []
				: inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
		} else if (
			(valueRaw.startsWith('"') && valueRaw.endsWith('"')) ||
			(valueRaw.startsWith("'") && valueRaw.endsWith("'"))
		) {
			data[key] = valueRaw.slice(1, -1);
		} else {
			data[key] = valueRaw;
		}
	}
	return { data, content };
}

const asArr = (v: unknown): string[] =>
	Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [];
const asStr = (v: unknown, def = ''): string => (typeof v === 'string' ? v : def);

const EN_MARKER = '<!-- EN -->';

function splitBody(content: string): { bodyDe: string; bodyEn?: string } {
	const idx = content.indexOf(EN_MARKER);
	if (idx === -1) return { bodyDe: content.trim() };
	return {
		bodyDe: content.slice(0, idx).trim(),
		bodyEn: content.slice(idx + EN_MARKER.length).trim() || undefined
	};
}

function parseArticle(raw: string, path: string): Article {
	const { data, content } = parseFrontmatter(raw);
	const fallbackSlug = path.split('/').pop()?.replace(/\.md$/, '') ?? 'unknown';
	const { bodyDe, bodyEn } = splitBody(content);
	return {
		title: asStr(data.title, fallbackSlug),
		title_en: asStr(data.title_en) || undefined,
		slug: asStr(data.slug, fallbackSlug),
		category: asStr(data.category, 'sonstiges'),
		subcategory: asStr(data.subcategory) || undefined,
		tags: asArr(data.tags),
		difficulty: asStr(data.difficulty, 'grundlagen') as Difficulty,
		area: asArr(data.area) as Area[],
		related: asArr(data.related),
		rechner: asArr(data.rechner),
		norm: asArr(data.norm),
		updated: asStr(data.updated),
		lang: asStr(data.lang, 'de'),
		hasEnBody: !!bodyEn,
		body: content,
		bodyDe,
		bodyEn
	};
}

export const articles: Article[] = Object.entries(modules)
	.map(([path, raw]) => parseArticle(raw, path))
	.sort((a, b) => a.title.localeCompare(b.title, 'de'));

export const articleMap: Record<string, Article> = Object.fromEntries(
	articles.map((a) => [a.slug, a])
);

export function listMeta(): ArticleMeta[] {
	return articles.map(({ body, ...meta }) => meta);
}
