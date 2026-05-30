import type { Area } from '$lib/wissen/types';

export type CellType = 'number' | 'text';

export interface Column {
	key: string;
	label: string;
	label_en?: string;
	unit?: string;
	type?: CellType;
	hint?: string;
	hint_en?: string;
	mono?: boolean;
	highlight?: boolean;
}

export type Row = Record<string, string | number>;

export interface ReferenceTable {
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	category: string;
	icon?: string;
	color?: string;
	description?: string;
	description_en?: string;
	areas: Area[];
	columns: Column[];
	rows: Row[];
	norm?: string[];
	updated?: string;
	notes?: string;
	notes_en?: string;
}

/** Meta-only Variante für Listen-/Index-Seiten (ohne columns + rows). */
export interface ReferenceTableMeta {
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
	areas: Area[];
	norm: string[];
	updated?: string;
	rowCount: number;
}
