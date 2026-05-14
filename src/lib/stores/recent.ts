import { browser } from '$app/environment';

const KEY = 'ga-recent';
const MAX_ITEMS = 10;

export interface RecentItem {
	type: 'konverter' | 'rechner' | 'wissen' | 'referenz' | 'checkliste';
	slug: string;
	name: string;
	at: number; // timestamp
}

export function trackRecent(item: Omit<RecentItem, 'at'>) {
	if (!browser) return;
	try {
		const raw = localStorage.getItem(KEY);
		const list: RecentItem[] = raw ? JSON.parse(raw) : [];
		// Remove existing entry with same type+slug
		const filtered = list.filter((x) => !(x.type === item.type && x.slug === item.slug));
		filtered.unshift({ ...item, at: Date.now() });
		localStorage.setItem(KEY, JSON.stringify(filtered.slice(0, MAX_ITEMS)));
	} catch {
		/* ignore */
	}
}

export function getRecent(): RecentItem[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

export function clearRecent() {
	if (!browser) return;
	localStorage.removeItem(KEY);
}
