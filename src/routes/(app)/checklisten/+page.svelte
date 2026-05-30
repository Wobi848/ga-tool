<script lang="ts">
	import { onMount } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { checklists, countItems, countCritical } from '$lib/checklisten';
	import { loadChecklistState } from '$lib/checklisten/stores';
	import { type Area } from '$lib/wissen/types';

	let query = $state('');
	let selectedCategory = $state<string>('');
	let selectedAreas: Area[] = $state([]);

	const isEn = $derived($locale === 'en');
	function t(de: string, en?: string) {
		return isEn && en ? en : de;
	}

	const categories = [...new Set(checklists.map((c) => c.category))].sort();
	const allAreas: Area[] = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];

	// Progress per checklist (computed on mount from localStorage)
	let progressMap = $state<Record<string, number>>({});

	onMount(() => {
		const map: Record<string, number> = {};
		for (const c of checklists) {
			const state = loadChecklistState(c.slug);
			const total = countItems(c);
			const done = Object.values(state.status).filter(Boolean).length;
			map[c.slug] = total > 0 ? done / total : 0;
		}
		progressMap = map;
	});

	function toggle<T>(arr: T[], v: T): T[] {
		return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
	}

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return checklists.filter((c) => {
			if (selectedCategory && c.category !== selectedCategory) return false;
			if (selectedAreas.length && !c.areas.some((x) => selectedAreas.includes(x))) return false;
			if (!q) return true;
			const title = t(c.title, c.title_en).toLowerCase();
			const subtitle = t(c.subtitle ?? '', c.subtitle_en).toLowerCase();
			return title.includes(q) || subtitle.includes(q) || c.category.toLowerCase().includes(q);
		});
	});

	const iconPaths: Record<string, string> = {
		flame:
			'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z',
		wind: 'M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2',
		monitor: 'M3 3h18v12H3zM8 21h8M12 17v4',
		cpu: 'M4 4h16v16H4zM9 9h6v6H9zM9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3',
		sun: 'M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
		table: 'M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18',
		'check-square': 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
		droplets:
			'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05zM12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97',
		snowflake: 'M2 12h20M12 2v20M20 16l-4-4 4-4M4 8l4 4-4 4M16 4l-4 4-4-4M8 20l4-4 4 4',
		network:
			'M9 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM3 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM15 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0zM12 8v2M12 14v2M9 12H7M17 12h-2'
	};
</script>

<svelte:head><title>{$_('checklisten.title')} · GA Tool</title></svelte:head>

<div class="page">
	<header class="page-header">
		<h1>{$_('checklisten.title')}</h1>
		<p class="subtitle">{checklists.length} {$_('checklisten.subtitle')}</p>
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
			placeholder={$_('checklisten.searchPlaceholder')}
			bind:value={query}
			class="search-input"
		/>
	</div>

	<div class="filter-row">
		<select bind:value={selectedCategory} class="cat-select">
			<option value="">{$_('checklisten.allCategories')}</option>
			{#each categories as c (c)}
				<option value={c}>{c}</option>
			{/each}
		</select>
		<div class="chips">
			{#each allAreas as a (a)}
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
			<p class="empty">{$_('checklisten.noChecklists')}</p>
		{:else}
			{#each filtered as c (c)}
				{@const total = countItems(c)}
				{@const critical = countCritical(c)}
				{@const progress = progressMap[c.slug] ?? 0}
				<a href="/checklisten/{c.slug}" class="card">
					<div class="card-icon" style="background: {c.color}20; color: {c.color}">
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
							<path d={iconPaths[c.icon] ?? 'M3 3h18v18H3z'} />
						</svg>
					</div>
					<div class="card-body">
						<div class="card-title-row">
							<h2 class="card-title">{t(c.title, c.title_en)}</h2>
							<span class="cat-chip" style:background={c.color + '20'} style:color={c.color}
								>{$_('cat.' + c.category.toLowerCase(), { default: c.category })}</span
							>
						</div>
						{#if c.subtitle}
							<p class="card-subtitle">{t(c.subtitle, c.subtitle_en)}</p>
						{/if}
						<div class="card-meta">
							<span class="count">{total} {$_('checklisten.points')}</span>
							{#if critical > 0}
								<span class="critical">{critical} {$_('checklisten.critical')}</span>
							{/if}
							{#if c.sectionCount}
								<span class="sections">{c.sectionCount} {$_('checklisten.sections')}</span>
							{/if}
						</div>
						{#if progress > 0}
							<div class="progress-row">
								<div class="progress-bar">
									<div
										class="progress-fill"
										style:width="{progress * 100}%"
										style:background={c.color}
									></div>
								</div>
								<span class="progress-pct">{Math.round(progress * 100)} %</span>
							</div>
						{/if}
					</div>
					<svg
						class="card-arrow"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"><path d="M9 18l6-6-6-6" /></svg
					>
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
		align-items: flex-start;
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
	.card-title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 0.15rem;
		flex-wrap: wrap;
	}
	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
	}
	.cat-chip {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.15rem 0.5rem;
		border-radius: 0.3rem;
	}
	.card-subtitle {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0 0 0.4rem;
	}
	.card-meta {
		display: flex;
		gap: 0.65rem;
		flex-wrap: wrap;
		font-size: 0.7rem;
		color: var(--muted);
	}
	.critical {
		color: #dc2626;
		font-weight: 600;
	}

	.progress-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}
	.progress-bar {
		flex: 1;
		height: 4px;
		border-radius: 2px;
		background: var(--border);
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		transition: width 0.3s;
	}
	.progress-pct {
		font-size: 0.7rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
		min-width: 2.5rem;
		text-align: right;
	}

	.card-arrow {
		color: var(--muted);
		flex-shrink: 0;
		margin-top: 0.25rem;
	}
	.empty {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--muted);
	}
</style>
