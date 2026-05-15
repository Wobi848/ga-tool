<script lang="ts">
	import { favorites } from '$lib/stores/favorites';
	import type { FavType } from '$lib/stores/favorites';

	interface Props {
		type: FavType;
		slug: string;
		title: string;
		size?: number;
	}

	let { type, slug, title, size = 18 }: Props = $props();

	const isFav = $derived(favorites.isFav(type, slug, $favorites));

	function toggle(e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation();
		favorites.toggle({ type, slug, title });
	}
</script>

<button
	type="button"
	class="fav-btn"
	class:fav-btn--active={isFav}
	onclick={toggle}
	aria-label={isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
	title={isFav ? 'Aus Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
>
	<svg width={size} height={size} viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
	</svg>
</button>

<style>
	.fav-btn {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--muted);
		padding: 0.25rem;
		border-radius: 0.375rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition: color 0.15s, background 0.15s;
		flex-shrink: 0;
	}

	.fav-btn:hover {
		color: #eab308;
		background: color-mix(in srgb, #eab308 10%, transparent);
	}

	.fav-btn--active {
		color: #eab308;
	}

	.fav-btn--active:hover {
		color: #ca8a04;
		background: color-mix(in srgb, #eab308 15%, transparent);
	}
</style>
