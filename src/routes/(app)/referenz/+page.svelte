<script lang="ts">
	import { referenceTables } from '$lib/referenz';
	import { type Area } from '$lib/wissen/types';
	import { _, locale } from 'svelte-i18n';

	const isEn = $derived($locale === 'en');
	function t(de: string, en?: string) {
		return isEn && en ? en : de;
	}

	let query = $state('');
	let selectedAreas: Area[] = $state([]);
	let selectedCategory = $state<string>('');

	const categories = [...new Set(referenceTables.map((t) => t.category))].sort();
	const allAreas: Area[] = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];

	function toggle<T>(arr: T[], v: T): T[] {
		return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
	}

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return referenceTables.filter((tbl) => {
			if (selectedCategory && tbl.category !== selectedCategory) return false;
			if (selectedAreas.length && !tbl.areas.some((x) => selectedAreas.includes(x))) return false;
			if (!q) return true;
			const title = t(tbl.title, tbl.title_en).toLowerCase();
			const subtitle = t(tbl.subtitle ?? '', tbl.subtitle_en).toLowerCase();
			const desc = t(tbl.description ?? '', tbl.description_en).toLowerCase();
			return (
				title.includes(q) ||
				subtitle.includes(q) ||
				desc.includes(q) ||
				tbl.category.toLowerCase().includes(q)
			);
		});
	});

	const iconPaths: Record<string, string> = {
		pipe: 'M3 7h18v10H3zM7 7v10M11 7v10M15 7v10M19 7v10',
		filter: 'M22 3H2l8 9.46V19l4 2v-8.54L22 3z',
		droplet: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
		shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
		zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
		snowflake: 'M2 12h20M12 2v20M5 5l14 14M19 5L5 19',
		box: 'M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
		thermometer: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z'
	};
</script>

<div class="page">
	<header class="page-header">
		<h1>{$_('referenz.title')}</h1>
		<p class="subtitle">
			{referenceTables.length}
			{$_('referenz.subtitle')}
		</p>
	</header>

	<div class="search-row">
		<svg
			class="search-icon"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		>
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
		<input
			type="search"
			placeholder={$_('referenz.searchPlaceholder')}
			bind:value={query}
			class="search-input"
		/>
	</div>

	<div class="filter-row">
		<select bind:value={selectedCategory} class="cat-select">
			<option value="">{$_('referenz.allCategories')}</option>
			{#each categories as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
		<div class="chips">
			{#each allAreas as a}
				<button
					class="chip"
					class:active={selectedAreas.includes(a)}
					onclick={() => (selectedAreas = toggle(selectedAreas, a))}>{$_('area.' + a)}</button
				>
			{/each}
		</div>
	</div>

	<section class="grid">
		{#if filtered.length === 0}
			<p class="empty">{$_('referenz.noTables')}</p>
		{:else}
			{#each filtered as tbl}
				<a href="/referenz/{tbl.slug}" class="card">
					<div class="card-icon" style="background: {tbl.color}20; color: {tbl.color}">
						<svg
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d={iconPaths[tbl.icon ?? ''] ?? 'M3 3h18v18H3z'} />
						</svg>
					</div>
					<div class="card-body">
						<h2 class="card-title">{t(tbl.title, tbl.title_en)}</h2>
						{#if tbl.subtitle}
							<p class="card-subtitle">{t(tbl.subtitle, tbl.subtitle_en)}</p>
						{/if}
						<div class="card-meta">
							<span class="cat-chip"
								>{$_('cat.' + tbl.category.toLowerCase(), { default: tbl.category })}</span
							>
							<span class="row-count">{tbl.rows.length} {$_('referenz.rows')}</span>
							{#if tbl.norm && tbl.norm.length}
								<span class="norm-chip"
									>{tbl.norm[0]}{#if tbl.norm.length > 1}
										+{tbl.norm.length - 1}{/if}</span
								>
							{/if}
						</div>
					</div>
					<svg
						class="card-arrow"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M9 18l6-6-6-6" />
					</svg>
				</a>
			{/each}
		{/if}
	</section>
</div>

<style>
	.page {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.page-header {
		margin-bottom: 1.25rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.subtitle {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0;
	}

	.search-row {
		display: flex;
		align-items: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.5rem 0.75rem;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.search-row:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.search-icon {
		color: var(--muted);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.9375rem;
		color: var(--text);
		font-family: inherit;
		padding: 0.25rem 0;
		min-width: 0;
	}

	.filter-row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		align-items: center;
		margin-bottom: 1rem;
	}

	.cat-select {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.35rem 0.6rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		cursor: pointer;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.chip {
		font-size: 0.75rem;
		padding: 0.2rem 0.55rem;
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text);
		cursor: pointer;
		font-family: inherit;
	}

	.chip:hover {
		border-color: var(--color-primary);
	}

	.chip.active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	.grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		text-decoration: none;
		color: var(--text);
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	.card-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.card-body {
		flex: 1;
		min-width: 0;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
	}

	.card-subtitle {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0.15rem 0 0.4rem;
	}

	.card-meta {
		display: flex;
		gap: 0.35rem;
		flex-wrap: wrap;
		align-items: center;
	}

	.cat-chip {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.15rem 0.45rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.row-count {
		font-size: 0.7rem;
		color: var(--muted);
	}

	.norm-chip {
		font-size: 0.65rem;
		font-weight: 500;
		padding: 0.15rem 0.45rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
		color: var(--color-primary);
	}

	.card-arrow {
		color: var(--muted);
		flex-shrink: 0;
	}

	.empty {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--muted);
	}
</style>
