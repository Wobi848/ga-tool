export type Difficulty = 'grundlagen' | 'fortgeschritten' | 'experte';
export type Area = 'hlk' | 'sanitaer' | 'elektro' | 'ga' | 'it' | 'normen';

export interface ArticleMeta {
	title: string;
	title_en?: string;
	slug: string;
	category: string;
	subcategory?: string;
	tags: string[];
	difficulty: Difficulty;
	area: Area[];
	related: string[];
	rechner: string[];
	norm: string[];
	updated: string;
	lang: string;
	hasEnBody: boolean;
}

export interface Article extends ArticleMeta {
	body: string;    // full raw markdown (kept for search compat)
	bodyDe: string;  // German section
	bodyEn?: string; // English section (if <!-- EN --> marker present)
}

export const areaLabels: Record<Area, string> = {
	hlk: 'HLK',
	sanitaer: 'Sanitär',
	elektro: 'Elektro',
	ga: 'GA',
	it: 'IT',
	normen: 'Normen'
};

export const difficultyLabels: Record<Difficulty, string> = {
	grundlagen: 'Grundlagen',
	fortgeschritten: 'Fortgeschritten',
	experte: 'Experte'
};

export const difficultyColors: Record<Difficulty, string> = {
	grundlagen: '#16a34a',
	fortgeschritten: '#ea580c',
	experte: '#dc2626'
};
