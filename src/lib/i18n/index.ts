import { browser } from '$app/environment';
import { addMessages, init, locale } from 'svelte-i18n';
import { de } from './de';
import { en } from './en';

export type Lang = 'de' | 'en' | 'auto';
export const STORAGE_KEY = 'ga-lang';
const COOKIE_NAME = 'ga-lang';

addMessages('de', de);
addMessages('en', en);

function detectBrowserLang(): 'de' | 'en' {
	return navigator.language.startsWith('en') ? 'en' : 'de';
}

const initialLocale: 'de' | 'en' = (() => {
	if (!browser) return 'de';
	const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
	if (saved === 'auto' || !saved) return detectBrowserLang();
	return saved;
})();

init({ fallbackLocale: 'de', initialLocale });

export function setLang(lang: Lang) {
	const resolved: 'de' | 'en' = lang === 'auto' ? detectBrowserLang() : lang;
	locale.set(resolved);
	if (browser) {
		localStorage.setItem(STORAGE_KEY, lang);
		document.cookie = `${COOKIE_NAME}=${resolved}; path=/; max-age=31536000; SameSite=Lax`;
	}
}

export function getSavedLang(): Lang {
	if (!browser) return 'auto';
	return (localStorage.getItem(STORAGE_KEY) as Lang | null) ?? 'auto';
}

export { locale };
