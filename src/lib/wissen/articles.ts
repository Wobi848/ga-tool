import type { Article, ArticleMeta, Area, Difficulty } from './types';
import metaJson from './articles.generated.json';

// ── Metadata kommt aus dem build-time generierten JSON ──
// Bodies werden NICHT eagerly gebundelt, sondern bei Bedarf per
// loadArticleBody(slug) lazy nachgeladen.

interface RawMeta {
	title: string;
	title_en?: string;
	slug: string;
	category: string;
	subcategory?: string;
	tags: string[];
	difficulty: string;
	area: string[];
	related: string[];
	rechner: string[];
	norm: string[];
	updated: string;
	lang: string;
	hasEnBody: boolean;
	file: string;
}

const rawMeta = metaJson as RawMeta[];

export const articles: ArticleMeta[] = rawMeta.map((m) => ({
	title: m.title,
	title_en: m.title_en,
	slug: m.slug,
	category: m.category,
	subcategory: m.subcategory,
	tags: m.tags,
	difficulty: m.difficulty as Difficulty,
	area: m.area as Area[],
	related: m.related,
	rechner: m.rechner,
	norm: m.norm,
	updated: m.updated,
	lang: m.lang,
	hasEnBody: m.hasEnBody
}));

export const articleMap: Record<string, ArticleMeta> = Object.fromEntries(
	articles.map((a) => [a.slug, a])
);

const fileBySlug: Record<string, string> = Object.fromEntries(rawMeta.map((m) => [m.slug, m.file]));

// ── Lazy Body Loader ──
// Vite-Glob ohne eager → einzelne dynamische Chunks pro Markdown.
// Erst beim Aufruf von loadArticleBody() wird der jeweilige Body geladen.
const bodyLoaders = import.meta.glob('/content/wissen/*.md', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;

const EN_MARKER = '<!-- EN -->';

function splitBody(content: string): { bodyDe: string; bodyEn?: string } {
	const idx = content.indexOf(EN_MARKER);
	if (idx === -1) return { bodyDe: content.trim() };
	return {
		bodyDe: content.slice(0, idx).trim(),
		bodyEn: content.slice(idx + EN_MARKER.length).trim() || undefined
	};
}

function stripFrontmatter(raw: string): string {
	const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	return m ? m[1] : raw;
}

/** Lädt den Body-Text eines Artikels lazy. Returns null wenn slug unbekannt. */
export async function loadArticleBody(
	slug: string
): Promise<{ body: string; bodyDe: string; bodyEn?: string } | null> {
	const file = fileBySlug[slug];
	if (!file) return null;
	const loader = bodyLoaders[`/content/wissen/${file}`];
	if (!loader) return null;
	const raw = await loader();
	const content = stripFrontmatter(raw);
	const { bodyDe, bodyEn } = splitBody(content);
	return { body: content, bodyDe, bodyEn };
}

/**
 * Convenience: vollständiges Article-Objekt mit Body. Nur für Detail-Seiten
 * verwenden — auf Listen/Index-Seiten reicht `articles` (nur Meta).
 */
export async function loadFullArticle(slug: string): Promise<Article | null> {
	const meta = articleMap[slug];
	if (!meta) return null;
	const bodies = await loadArticleBody(slug);
	if (!bodies) return null;
	return { ...meta, ...bodies };
}

export function listMeta(): ArticleMeta[] {
	return articles;
}
