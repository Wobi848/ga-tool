import { writable } from 'svelte/store';

// Seiten können die Suche öffnen, ohne das Layout zu kennen: sie setzen den
// Wunsch auf true, das Layout öffnet das Suchfenster und setzt ihn zurück.
export const searchRequest = writable(false);

export function openSearch() {
	searchRequest.set(true);
}
