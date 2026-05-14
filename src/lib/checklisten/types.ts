import type { Area } from '$lib/wissen/types';

export interface ChecklistItem {
	id: string;          // stable id, unique within template
	title: string;
	hint?: string;       // optional help text shown on demand
	norm?: string;       // optional norm reference
	critical?: boolean;  // muss-Kriterium
}

export interface ChecklistSection {
	title: string;
	items: ChecklistItem[];
}

export interface ChecklistTemplate {
	slug: string;
	title: string;
	subtitle?: string;
	description?: string;
	category: string;     // z.B. 'IBN', 'Wartung', 'Übergabe'
	icon: string;
	color: string;
	areas: Area[];
	sections: ChecklistSection[];
	norm?: string[];
	updated?: string;
}
