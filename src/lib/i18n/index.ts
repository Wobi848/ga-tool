import { browser } from '$app/environment';
import { addMessages, init, locale } from 'svelte-i18n';
import { de } from './de';
import { en } from './en';

export type Lang = 'de' | 'en';
const STORAGE_KEY = 'ga-lang';

// Load messages synchronously — works on SSR and client
addMessages('de', de);
addMessages('en', en);

const initialLocale: Lang = (() => {
	if (!browser) return 'de';
	const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
	if (saved) return saved;
	return navigator.language.startsWith('en') ? 'en' : 'de';
})();

init({ fallbackLocale: 'de', initialLocale });

export function setupI18n() {
	// Only needed for client-side locale sync after hydration
	if (browser) {
		const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
		if (saved) locale.set(saved);
	}
}

export function setLang(lang: Lang) {
	locale.set(lang);
	if (browser) localStorage.setItem(STORAGE_KEY, lang);
}

export { locale };
