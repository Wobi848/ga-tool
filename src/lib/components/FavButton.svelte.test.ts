import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import { get } from 'svelte/store';
import FavButton from './FavButton.svelte';
import { favorites } from '$lib/stores/favorites';

/** Setzt den Favoriten-Store zurueck — Toggle alle vorhandenen Eintraege entfernen. */
function resetFavorites() {
	for (const f of [...get(favorites)]) {
		favorites.toggle({ type: f.type, slug: f.slug, title: f.title });
	}
	localStorage.clear();
}

describe('FavButton', () => {
	beforeEach(() => {
		resetFavorites();
	});

	it('rendert als Button mit aria-label (nicht favorisiert)', () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		const btn = screen.getByRole('button');
		expect(btn).toBeInTheDocument();
		expect(btn.getAttribute('aria-label')).toMatch(/hinzu|add/i);
	});

	it('Klick fuegt zu Favoriten hinzu', async () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		expect(get(favorites)).toHaveLength(0);

		await fireEvent.click(screen.getByRole('button'));

		expect(get(favorites)).toHaveLength(1);
		expect(get(favorites)[0]).toMatchObject({
			type: 'rechner',
			slug: 'kv-wert',
			title: 'Kv-Wert'
		});
	});

	it('Klick auf existierenden Favoriten entfernt ihn', async () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		const btn = screen.getByRole('button');

		await fireEvent.click(btn);
		expect(get(favorites)).toHaveLength(1);

		await fireEvent.click(btn);
		expect(get(favorites)).toHaveLength(0);
	});

	it('aria-label aendert sich nach Toggle', async () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		const btn = screen.getByRole('button');
		expect(btn.getAttribute('aria-label')).toMatch(/hinzu|add/i);

		await fireEvent.click(btn);
		expect(btn.getAttribute('aria-label')).toMatch(/entfern|remov/i);
	});

	it('SVG-fill wechselt bei Favorisierung', async () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		const btn = screen.getByRole('button');
		let svg = btn.querySelector('svg');
		expect(svg?.getAttribute('fill')).toBe('none');

		await fireEvent.click(btn);
		svg = btn.querySelector('svg');
		expect(svg?.getAttribute('fill')).toBe('currentColor');
	});

	it('Klick-Event propagiert nicht (preventDefault)', async () => {
		render(FavButton, { props: { type: 'rechner', slug: 'kv-wert', title: 'Kv-Wert' } });
		const event = new MouseEvent('click', { bubbles: true, cancelable: true });
		const btn = screen.getByRole('button');
		btn.dispatchEvent(event);
		expect(event.defaultPrevented).toBe(true);
	});

	it('size-prop wirkt auf SVG-Dimensionen', () => {
		render(FavButton, {
			props: { type: 'artikel', slug: 'pid-regler', title: 'PID', size: 24 }
		});
		const svg = screen.getByRole('button').querySelector('svg');
		expect(svg?.getAttribute('width')).toBe('24');
		expect(svg?.getAttribute('height')).toBe('24');
	});
});
