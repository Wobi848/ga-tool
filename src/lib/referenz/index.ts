import type { Area } from '$lib/wissen/types';
import type { ReferenceTable, ReferenceTableMeta } from './types';
import metaJson from './referenz.generated.json';

// ── Meta-only (eager, klein) ───────────────────────────────────────────────

interface RawMeta {
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
	norm: string[];
	updated?: string;
	rowCount: number;
	file: string;
}

const rawMeta = metaJson as RawMeta[];

export const referenceTables: ReferenceTableMeta[] = rawMeta.map((m) => ({
	slug: m.slug,
	title: m.title,
	title_en: m.title_en,
	subtitle: m.subtitle,
	subtitle_en: m.subtitle_en,
	description: m.description,
	description_en: m.description_en,
	category: m.category,
	icon: m.icon,
	color: m.color,
	areas: m.areas as Area[],
	norm: m.norm,
	updated: m.updated,
	rowCount: m.rowCount
}));

export const referenceMap: Record<string, ReferenceTableMeta> = Object.fromEntries(
	referenceTables.map((t) => [t.slug, t])
);

const fileBySlug: Record<string, string> = Object.fromEntries(rawMeta.map((m) => [m.slug, m.file]));

// ── Lazy Full-Table Loader ─────────────────────────────────────────────────

const tableLoaders = import.meta.glob('./data/*.ts') as Record<
	string,
	() => Promise<Record<string, unknown>>
>;

/**
 * Lädt die vollständige ReferenceTable (inkl. columns + rows) on-demand.
 * Listen-Seiten sollen referenceTables (Meta) benutzen; nur Detail-Seiten
 * brauchen die rows.
 */
export async function loadReferenceTable(slug: string): Promise<ReferenceTable | null> {
	const file = fileBySlug[slug];
	if (!file) return null;
	const loader = tableLoaders[`./data/${file}`];
	if (!loader) return null;
	const mod = await loader();
	// Modul exportiert eine named const die das ReferenceTable-Objekt enthält
	for (const exp of Object.values(mod)) {
		if (exp && typeof exp === 'object' && 'slug' in exp && (exp as ReferenceTable).slug === slug) {
			return exp as ReferenceTable;
		}
	}
	return null;
}

export type { ReferenceTable, ReferenceTableMeta } from './types';
