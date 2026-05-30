#!/usr/bin/env tsx
/**
 * Build-Time Metadata-Extraktion:
 *
 * - Wissens-Artikel (.md): Frontmatter parsen → articles.generated.json
 * - Referenz-Tabellen (.ts): Modul importieren, Meta + Row-Count extrahieren
 *   → referenz.generated.json
 * - Checklisten (.ts): Modul importieren, Meta + Item-/Critical-Counts
 *   → checklisten.generated.json
 *
 * Die generierten JSON-Files werden im Client-Bundle sync importiert.
 * Die Bodies/Rows/Items bleiben lazy via import.meta.glob.
 *
 * Wird via `npm run build:meta` ausgeführt (auch automatisch in predev/prebuild).
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WISSEN_DIR = join(ROOT, 'content', 'wissen');
const OUT_WISSEN = join(ROOT, 'src', 'lib', 'wissen', 'articles.generated.json');
const OUT_REF = join(ROOT, 'src', 'lib', 'referenz', 'referenz.generated.json');
const OUT_CHK = join(ROOT, 'src', 'lib', 'checklisten', 'checklisten.generated.json');
const OUT_CORPUS = join(ROOT, 'src', 'lib', 'search', 'corpus.generated.json');

// ── Wissen (Markdown) ──────────────────────────────────────────────────────

const EN_MARKER = '<!-- EN -->';

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
	if (!m) return { data: {}, content: raw };
	const yaml = m[1];
	const content = m[2] ?? '';
	const data: Record<string, unknown> = {};

	const lines = yaml.split(/\r?\n/);
	let currentKey: string | null = null;
	let multiline = '';
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;
		const colon = trimmed.indexOf(':');
		if (currentKey && !line.match(/^[a-zA-Z_]/)) {
			multiline += ' ' + trimmed;
			if (multiline.includes(']')) {
				const inner = multiline
					.slice(multiline.indexOf('[') + 1, multiline.lastIndexOf(']'))
					.trim();
				data[currentKey] =
					inner === '' ? [] : inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
				currentKey = null;
				multiline = '';
			}
			continue;
		}
		if (colon < 0) continue;
		const key = trimmed.slice(0, colon).trim();
		const valueRaw = trimmed.slice(colon + 1).trim();
		if (valueRaw === '') {
			currentKey = key;
			multiline = '';
			continue;
		}
		if (valueRaw.startsWith('[')) {
			if (valueRaw.endsWith(']')) {
				const inner = valueRaw.slice(1, -1).trim();
				data[key] =
					inner === '' ? [] : inner.split(',').map((s) => s.trim().replace(/^['"]|['"]$/g, ''));
			} else {
				currentKey = key;
				multiline = valueRaw;
			}
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

/**
 * Reduziert Markdown-Body auf einen schlanken Such-Korpus:
 * - Strippt Code-Blöcke, HTML-Tags, Tabellen-Pipes, Listen-Marker
 * - Behält Fliesstext, Headings und Eigennamen
 * - Schneidet auf ~3000 Zeichen (genug für volle Indexierung, klein im Bundle)
 */
function extractSearchableText(content: string, maxLen = 3000): string {
	const stripped = content
		.replace(/```[\s\S]*?```/g, ' ') // fenced code
		.replace(/`[^`]*`/g, ' ') // inline code
		.replace(/<!--[\s\S]*?-->/g, ' ') // html-Kommentare (inkl. EN-Marker)
		.replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // links: nur text
		.replace(/[#*_>|-]/g, ' ') // markdown-Marker
		.replace(/\$\$[\s\S]*?\$\$/g, ' ') // display math
		.replace(/\$[^$]*\$/g, ' ') // inline math
		.replace(/\s+/g, ' ')
		.trim();
	return stripped.length > maxLen ? stripped.slice(0, maxLen) : stripped;
}

function buildWissen() {
	const files = readdirSync(WISSEN_DIR).filter((f) => f.endsWith('.md'));
	const articles: Array<Record<string, unknown>> = [];
	const corpus: Record<string, string> = {};
	for (const file of files) {
		const raw = readFileSync(join(WISSEN_DIR, file), 'utf-8');
		const { data, content } = parseFrontmatter(raw);
		const fallbackSlug = file.replace(/\.md$/, '');
		const slug = asStr(data.slug, fallbackSlug);
		const hasEnBody = content.includes(EN_MARKER);
		const idx = content.indexOf(EN_MARKER);
		const bodyDe = idx >= 0 ? content.slice(0, idx) : content;
		// Voller Body fürs Such-Korpus (lazy-loaded), ohne Längen-Cap
		corpus[slug] = extractSearchableText(bodyDe, 12000);
		articles.push({
			title: asStr(data.title, fallbackSlug),
			title_en: asStr(data.title_en) || undefined,
			slug,
			category: asStr(data.category, 'sonstiges'),
			subcategory: asStr(data.subcategory) || undefined,
			tags: asArr(data.tags),
			difficulty: asStr(data.difficulty, 'grundlagen'),
			area: asArr(data.area),
			related: asArr(data.related),
			rechner: asArr(data.rechner),
			norm: asArr(data.norm),
			updated: asStr(data.updated),
			lang: asStr(data.lang, 'de'),
			hasEnBody,
			file
		});
	}
	articles.sort((a, b) => String(a.title).localeCompare(String(b.title), 'de'));
	mkdirSync(dirname(OUT_WISSEN), { recursive: true });
	writeFileSync(OUT_WISSEN, JSON.stringify(articles, null, 0) + '\n');
	mkdirSync(dirname(OUT_CORPUS), { recursive: true });
	writeFileSync(OUT_CORPUS, JSON.stringify(corpus, null, 0) + '\n');
	const corpusSize = JSON.stringify(corpus).length;
	console.log(
		`[meta] wissen → ${articles.length} articles · corpus ${Math.round(corpusSize / 1024)} KB`
	);
}

// ── Referenz (TS-Module) ───────────────────────────────────────────────────

interface ReferenceLike {
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	description?: string;
	description_en?: string;
	category: string;
	icon?: string;
	color: string;
	areas: string[];
	norm?: string[];
	updated?: string;
	rows?: unknown[];
}

async function buildReferenz() {
	const dataDir = join(ROOT, 'src', 'lib', 'referenz', 'data');
	const files = readdirSync(dataDir).filter((f) => f.endsWith('.ts'));
	const meta = [] as Array<Record<string, unknown>>;
	for (const file of files) {
		const mod = await import(pathToFileURL(join(dataDir, file)).href);
		for (const exp of Object.values(mod)) {
			if (
				exp &&
				typeof exp === 'object' &&
				'slug' in exp &&
				'rows' in exp &&
				typeof (exp as ReferenceLike).slug === 'string'
			) {
				const t = exp as ReferenceLike;
				meta.push({
					slug: t.slug,
					title: t.title,
					title_en: t.title_en,
					subtitle: t.subtitle,
					subtitle_en: t.subtitle_en,
					description: t.description,
					description_en: t.description_en,
					category: t.category,
					icon: t.icon,
					color: t.color,
					areas: t.areas,
					norm: t.norm ?? [],
					updated: t.updated,
					rowCount: t.rows?.length ?? 0,
					file
				});
			}
		}
	}
	meta.sort((a, b) => String(a.title).localeCompare(String(b.title), 'de'));
	mkdirSync(dirname(OUT_REF), { recursive: true });
	writeFileSync(OUT_REF, JSON.stringify(meta, null, 0) + '\n');
	console.log(`[meta] referenz → ${meta.length} tables`);
}

// ── Checklisten (TS-Module) ────────────────────────────────────────────────

interface ChecklistItemLike {
	critical?: boolean;
}
interface ChecklistSectionLike {
	items: ChecklistItemLike[];
}
interface ChecklistLike {
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	category: string;
	icon?: string;
	color: string;
	areas: string[];
	updated?: string;
	sections: ChecklistSectionLike[];
}

async function buildChecklisten() {
	const dataDir = join(ROOT, 'src', 'lib', 'checklisten', 'data');
	const files = readdirSync(dataDir).filter((f) => f.endsWith('.ts'));
	const meta = [] as Array<Record<string, unknown>>;
	for (const file of files) {
		const mod = await import(pathToFileURL(join(dataDir, file)).href);
		for (const exp of Object.values(mod)) {
			if (
				exp &&
				typeof exp === 'object' &&
				'slug' in exp &&
				'sections' in exp &&
				typeof (exp as ChecklistLike).slug === 'string'
			) {
				const c = exp as ChecklistLike;
				const items = c.sections.reduce((sum, s) => sum + s.items.length, 0);
				const critical = c.sections.reduce(
					(sum, s) => sum + s.items.filter((i) => i.critical).length,
					0
				);
				meta.push({
					slug: c.slug,
					title: c.title,
					title_en: c.title_en,
					subtitle: c.subtitle,
					subtitle_en: c.subtitle_en,
					category: c.category,
					icon: c.icon,
					color: c.color,
					areas: c.areas,
					updated: c.updated,
					sectionCount: c.sections.length,
					itemCount: items,
					criticalCount: critical,
					file
				});
			}
		}
	}
	meta.sort((a, b) => String(a.title).localeCompare(String(b.title), 'de'));
	mkdirSync(dirname(OUT_CHK), { recursive: true });
	writeFileSync(OUT_CHK, JSON.stringify(meta, null, 0) + '\n');
	console.log(`[meta] checklisten → ${meta.length} templates`);
}

// ── Main ───────────────────────────────────────────────────────────────────

await buildWissen();
await buildReferenz();
await buildChecklisten();
