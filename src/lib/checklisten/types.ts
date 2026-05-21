import type { Area } from '$lib/wissen/types';

export interface ChecklistItem {
	id: string; // stable id, unique within template
	title: string;
	title_en?: string;
	hint?: string; // optional help text shown on demand
	hint_en?: string;
	norm?: string; // optional norm reference
	critical?: boolean; // muss-Kriterium
}

export interface ChecklistSection {
	title: string;
	title_en?: string;
	items: ChecklistItem[];
}

export interface ChecklistTemplate {
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	description?: string;
	description_en?: string;
	category: string; // z.B. 'IBN', 'Wartung', 'Übergabe'
	icon: string;
	color: string;
	areas: Area[];
	sections: ChecklistSection[];
	norm?: string[];
	updated?: string;
}
