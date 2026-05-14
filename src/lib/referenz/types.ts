import type { Area } from '$lib/wissen/types';

export type CellType = 'number' | 'text';

export interface Column {
	key: string;
	label: string;
	unit?: string;
	type?: CellType;
	hint?: string;        // tooltip text
	mono?: boolean;       // monospace rendering (e.g. for codes)
	highlight?: boolean;  // visual emphasis
}

export type Row = Record<string, string | number>;

export interface ReferenceTable {
	slug: string;
	title: string;
	subtitle?: string;
	category: string;    // z.B. 'Rohre', 'Filter', 'Material'
	icon?: string;
	color?: string;
	description?: string;
	areas: Area[];
	columns: Column[];
	rows: Row[];
	norm?: string[];     // 'EN 10220', 'ISO 16890'
	updated?: string;
	notes?: string;      // additional info shown under the table
}
