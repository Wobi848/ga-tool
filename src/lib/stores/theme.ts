import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'auto' | 'light' | 'dark' | 'oled';

const STORAGE_KEY = 'ga-theme';

function createThemeStore() {
	const initial: Theme = browser
		? ((localStorage.getItem(STORAGE_KEY) as Theme) ?? 'auto')
		: 'auto';

	const { subscribe, set } = writable<Theme>(initial);

	return {
		subscribe,
		set: (value: Theme) => {
			if (browser) localStorage.setItem(STORAGE_KEY, value);
			set(value);
		}
	};
}

export const theme = createThemeStore();
