import type { Area } from '$lib/wissen/types';

export type AbbrLang = 'de' | 'en' | 'intl';

export interface Abbreviation {
	short: string; // z.B. "PID"
	long: string; // "Proportional-Integral-Differenzial"
	description?: string; // optionale Erklärung (DE)
	descriptionEn?: string; // English description
	areas: Area[]; // Fachbereiche
	related?: string[]; // Verwandte Kürzel (lose Beziehung)
	wissenSlug?: string; // Optional: Link zu Wissensartikel
	lang?: AbbrLang; // Sprache des Kürzels — default 'de'
}

export const langLabels: Record<AbbrLang, { short: string; flag: string }> = {
	de: { short: 'DE', flag: '🇩🇪' },
	en: { short: 'EN', flag: '🇬🇧' },
	intl: { short: 'INT', flag: '🌐' }
};
