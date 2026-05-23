import '@testing-library/jest-dom/vitest';
import { addMessages, init, waitLocale } from 'svelte-i18n';
import { beforeAll } from 'vitest';
import { de } from './lib/i18n/de';
import { en } from './lib/i18n/en';

// Initialize svelte-i18n once for all component tests — sonst crashen
// Svelte-Komponenten beim ersten Render mit "no i18n dictionary".
addMessages('de', de);
addMessages('en', en);
init({ fallbackLocale: 'de', initialLocale: 'de' });

beforeAll(async () => {
	await waitLocale();
});

// Polyfill ResizeObserver — jsdom hat keinen; einige Komponenten nutzen ihn.
class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}
globalThis.ResizeObserver =
	globalThis.ResizeObserver ?? (ResizeObserverMock as unknown as typeof ResizeObserver);
