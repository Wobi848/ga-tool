import { browser } from '$app/environment';

interface ChecklistState {
	status: Record<string, boolean>; // itemId → checked
	notes: Record<string, string>; // itemId → notes
	context: Record<string, string>; // free-form context (Anlage, Ort, Datum, Techniker)
	updatedAt: number;
}

const PREFIX = 'ga-cl-';

function emptyState(): ChecklistState {
	return { status: {}, notes: {}, context: {}, updatedAt: Date.now() };
}

export function loadChecklistState(slug: string): ChecklistState {
	if (!browser) return emptyState();
	try {
		const raw = localStorage.getItem(PREFIX + slug);
		if (!raw) return emptyState();
		const parsed = JSON.parse(raw);
		return {
			status: parsed.status ?? {},
			notes: parsed.notes ?? {},
			context: parsed.context ?? {},
			updatedAt: parsed.updatedAt ?? Date.now()
		};
	} catch {
		return emptyState();
	}
}

export function saveChecklistState(slug: string, state: ChecklistState) {
	if (!browser) return;
	try {
		localStorage.setItem(PREFIX + slug, JSON.stringify({ ...state, updatedAt: Date.now() }));
	} catch {
		/* ignore */
	}
}

export function resetChecklistState(slug: string) {
	if (!browser) return;
	localStorage.removeItem(PREFIX + slug);
}
