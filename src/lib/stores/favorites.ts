import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const KEY = 'ga-favorites';

export type FavType = 'artikel' | 'rechner' | 'konverter' | 'referenz' | 'checkliste';

export interface Favorite {
	type: FavType;
	slug: string;
	title: string;
	addedAt: number;
}

function load(): Favorite[] {
	if (!browser) return [];
	try {
		const raw = localStorage.getItem(KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}

function save(list: Favorite[]) {
	if (!browser) return;
	try {
		localStorage.setItem(KEY, JSON.stringify(list));
	} catch {
		/* ignore */
	}
}

async function pushToServer(list: Favorite[]) {
	try {
		await fetch('/api/favorites', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(list)
		});
	} catch {
		/* offline — localStorage is the fallback */
	}
}

function createStore() {
	const { subscribe, update, set } = writable<Favorite[]>(load());

	if (browser) {
		window.addEventListener('storage', (e) => {
			if (e.key === KEY) set(load());
		});
	}

	return {
		subscribe,

		// Call once on app mount to pull server state
		async syncFromServer() {
			try {
				const res = await fetch('/api/favorites');
				if (!res.ok) return;
				const serverList: Favorite[] = await res.json();
				// Server wins — replace local
				save(serverList);
				set(serverList);
			} catch {
				/* offline — keep local */
			}
		},

		toggle(item: Omit<Favorite, 'addedAt'>) {
			update((list) => {
				const exists = list.some((f) => f.type === item.type && f.slug === item.slug);
				const next = exists
					? list.filter((f) => !(f.type === item.type && f.slug === item.slug))
					: [...list, { ...item, addedAt: Date.now() }];
				save(next);
				pushToServer(next);
				return next;
			});
		},

		isFav(type: FavType, slug: string, list: Favorite[]): boolean {
			return list.some((f) => f.type === type && f.slug === slug);
		},

		remove(type: FavType, slug: string) {
			update((list) => {
				const next = list.filter((f) => !(f.type === type && f.slug === slug));
				save(next);
				pushToServer(next);
				return next;
			});
		}
	};
}

export const favorites = createStore();

export const favTypeLabel: Record<FavType, string> = {
	artikel: 'Artikel',
	rechner: 'Rechner',
	konverter: 'Konverter',
	referenz: 'Referenz',
	checkliste: 'Checkliste'
};

export const favTypeColor: Record<FavType, string> = {
	artikel: '#2563eb',
	rechner: '#0d9488',
	konverter: '#ea580c',
	referenz: '#0891b2',
	checkliste: '#7c3aed'
};

export const favTypeHref: Record<FavType, string> = {
	artikel: '/wissen',
	rechner: '/rechner',
	konverter: '/konverter',
	referenz: '/referenz',
	checkliste: '/checklisten'
};
