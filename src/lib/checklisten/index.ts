import type { Area } from '$lib/wissen/types';
import type { ChecklistTemplate, ChecklistTemplateMeta } from './types';
import metaJson from './checklisten.generated.json';

// ── Meta-only (eager, klein) ───────────────────────────────────────────────

interface RawMeta {
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	category: string;
	icon: string;
	color: string;
	areas: string[];
	updated?: string;
	sectionCount: number;
	itemCount: number;
	criticalCount: number;
	file: string;
}

const rawMeta = metaJson as RawMeta[];

export const checklists: ChecklistTemplateMeta[] = rawMeta.map((m) => ({
	slug: m.slug,
	title: m.title,
	title_en: m.title_en,
	subtitle: m.subtitle,
	subtitle_en: m.subtitle_en,
	category: m.category,
	icon: m.icon,
	color: m.color,
	areas: m.areas as Area[],
	updated: m.updated,
	sectionCount: m.sectionCount,
	itemCount: m.itemCount,
	criticalCount: m.criticalCount
}));

export const checklistMap: Record<string, ChecklistTemplateMeta> = Object.fromEntries(
	checklists.map((c) => [c.slug, c])
);

const fileBySlug: Record<string, string> = Object.fromEntries(rawMeta.map((m) => [m.slug, m.file]));

// ── Lazy Full-Template Loader ──────────────────────────────────────────────

const templateLoaders = import.meta.glob('./data/*.ts') as Record<
	string,
	() => Promise<Record<string, unknown>>
>;

export async function loadChecklist(slug: string): Promise<ChecklistTemplate | null> {
	const file = fileBySlug[slug];
	if (!file) return null;
	const loader = templateLoaders[`./data/${file}`];
	if (!loader) return null;
	const mod = await loader();
	for (const exp of Object.values(mod)) {
		if (
			exp &&
			typeof exp === 'object' &&
			'slug' in exp &&
			(exp as ChecklistTemplate).slug === slug
		) {
			return exp as ChecklistTemplate;
		}
	}
	return null;
}

// ── Hilfsfunktionen für die Liste (jetzt aus Meta) ─────────────────────────

export function countItems(t: ChecklistTemplateMeta | ChecklistTemplate): number {
	if ('itemCount' in t) return t.itemCount;
	return t.sections.reduce((sum, s) => sum + s.items.length, 0);
}

export function countCritical(t: ChecklistTemplateMeta | ChecklistTemplate): number {
	if ('criticalCount' in t) return t.criticalCount;
	return t.sections.reduce((sum, s) => sum + s.items.filter((i) => i.critical).length, 0);
}

export type { ChecklistTemplate, ChecklistTemplateMeta } from './types';
