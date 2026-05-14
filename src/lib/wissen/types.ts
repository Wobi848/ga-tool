export type Difficulty = 'grundlagen' | 'fortgeschritten' | 'experte';
export type Area = 'hlk' | 'sanitaer' | 'elektro' | 'ga' | 'it' | 'normen';

export interface ArticleMeta {
	title: string;
	slug: string;
	category: string;
	subcategory?: string;
	tags: string[];
	difficulty: Difficulty;
	area: Area[];
	related: string[];
	norm: string[];
	updated: string;
	lang: string;
}

export interface Article extends ArticleMeta {
	body: string; // raw markdown content
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
