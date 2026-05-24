<script lang="ts">
	import { untrack } from 'svelte';
	import { _, locale } from 'svelte-i18n';
	import { difficultyColors, type Area, type Difficulty } from '$lib/wissen/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Map profile disciplines (de, capitalized) → area keys
	const profileToArea: Record<string, Area> = {
		HLK: 'hlk',
		Sanitär: 'sanitaer',
		Elektro: 'elektro',
		GA: 'ga',
		IT: 'it',
		Normen: 'normen'
	};

	const preselectedAreas = untrack(() =>
		(data.userDisciplines ?? []).map((d) => profileToArea[d]).filter((a): a is Area => !!a)
	);

	let query = $state('');
	let selectedAreas: Area[] = $state([...preselectedAreas]);
	let selectedDifficulties: Difficulty[] = $state([]);

	const allAreas: Area[] = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];
	const allDifficulties: Difficulty[] = ['grundlagen', 'fortgeschritten', 'experte'];

	function toggle<T>(arr: T[], value: T): T[] {
		return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
	}

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return data.articles.filter((a) => {
			if (selectedAreas.length && !a.area.some((x) => selectedAreas.includes(x))) return false;
			if (selectedDifficulties.length && !selectedDifficulties.includes(a.difficulty)) return false;
			if (!q) return true;
			const haystack = (
				a.title +
				' ' +
				a.category +
				' ' +
				(a.subcategory ?? '') +
				' ' +
				a.tags.join(' ')
			).toLowerCase();
			return haystack.includes(q);
		});
	});

	function clearFilters() {
		selectedAreas = [];
		selectedDifficulties = [];
		query = '';
	}
</script>

<div class="page">
	<header class="page-header">
		<h1>{$_('wissen.title')}</h1>
		<p class="subtitle">
			{data.articles.length}
			{$_('wissen.subtitle')}
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
			placeholder={$_('wissen.searchPlaceholder')}
			bind:value={query}
			class="search-input"
		/>
		{#if query || selectedAreas.length || selectedDifficulties.length}
			<button class="btn-clear" onclick={clearFilters} title={$_('wissen.resetFilter')}>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
					<line x1="6" y1="6" x2="18" y2="18" />
				</svg>
			</button>
		{/if}
	</div>

	<section class="filters">
		<div class="filter-group">
			<span class="filter-label">{$_('wissen.fachbereich')}</span>
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
		<div class="filter-group">
			<span class="filter-label">{$_('wissen.schwierigkeit')}</span>
			<div class="chips">
				{#each allDifficulties as d (d)}
					<button
						class="chip"
						class:active={selectedDifficulties.includes(d)}
						style:--chip-active={difficultyColors[d]}
						onclick={() => (selectedDifficulties = toggle(selectedDifficulties, d))}
						>{$_('difficulty.' + d)}</button
					>
				{/each}
			</div>
		</div>
		{#if preselectedAreas.length}
			<p class="filter-hint">
				{$_('wissen.profileHint')} <a href="/profil">{$_('nav.profile')}</a>.
			</p>
		{/if}
	</section>

	<section class="results">
		{#if filtered.length === 0}
			<div class="empty">
				<p>{$_('wissen.noArticles')}</p>
				<button class="btn-clear-text" onclick={clearFilters}>{$_('wissen.clearFilters')}</button>
			</div>
		{:else}
			<p class="count">
				{filtered.length}
				{filtered.length === 1 ? $_('common.results') : $_('common.resultsPlural')}
			</p>
			<div class="list">
				{#each filtered as a (a)}
					<a href="/wissen/{a.slug}" class="article-card">
						<div class="card-main">
							<div class="card-header">
								<h2 class="card-title">{$locale === 'en' && a.title_en ? a.title_en : a.title}</h2>
								<span
									class="diff-badge"
									style:background={difficultyColors[a.difficulty] + '20'}
									style:color={difficultyColors[a.difficulty]}
								>
									{$_('difficulty.' + a.difficulty)}
								</span>
								{#if $locale === 'en' && !a.hasEnBody}
									<span class="de-badge">{$_('wissen.deOnly')}</span>
								{/if}
							</div>
							<p class="card-meta">
								{$_('cat.' + a.category, { default: a.category })}{#if a.subcategory}
									· {$_('cat.' + a.subcategory, { default: a.subcategory })}{/if}
							</p>
							<div class="card-chips">
								{#each a.area as ar (ar)}
									<span class="area-chip">{$_('area.' + ar)}</span>
								{/each}
								{#each a.tags.slice(0, 3) as t (t)}
									<span class="tag-chip">#{t}</span>
								{/each}
								{#if a.tags.length > 3}
									<span class="tag-chip tag-more">+{a.tags.length - 3}</span>
								{/if}
							</div>
						</div>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="card-arrow"
						>
							<path d="M9 18l6-6-6-6" />
						</svg>
					</a>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.page {
		max-width: 720px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
		width: 100%;
		min-width: 0;
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

	/* Search */
	.search-row {
		display: flex;
		align-items: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.5rem 0.75rem;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.search-row:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.search-icon {
		color: var(--muted);
		flex-shrink: 0;
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

	.btn-clear {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border: none;
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		border-radius: 0.25rem;
	}

	.btn-clear:hover {
		background: var(--surface-hover);
		color: var(--text);
	}

	/* Filters */
	.filters {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
	}

	.filter-group {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.375rem 0;
		flex-wrap: wrap;
		min-width: 0;
	}

	.filter-group + .filter-group {
		border-top: 1px solid var(--border);
	}

	.filter-label {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		min-width: 5.5rem;
		flex-shrink: 0;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		flex: 1 1 0;
		min-width: 0;
	}

	@media (max-width: 480px) {
		.filter-label {
			min-width: 0;
			flex-basis: 100%;
		}
	}

	.chip {
		font-size: 0.8125rem;
		padding: 0.25rem 0.7rem;
		border-radius: 1rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--text);
		cursor: pointer;
		font-family: inherit;
		transition:
			background 0.15s,
			border-color 0.15s,
			color 0.15s;
	}

	.chip:hover {
		border-color: var(--color-primary);
	}

	.chip.active {
		background: var(--chip-active, var(--color-primary));
		border-color: var(--chip-active, var(--color-primary));
		color: white;
	}

	.filter-hint {
		font-size: 0.7rem;
		color: var(--muted);
		margin: 0.5rem 0 0;
	}

	.filter-hint a {
		color: var(--color-primary);
	}

	/* Results */
	.results {
		margin-top: 0.5rem;
	}

	.count {
		font-size: 0.75rem;
		color: var(--muted);
		margin: 0 0 0.5rem 0.25rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.article-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 1rem;
		text-decoration: none;
		color: var(--text);
		max-width: 100%;
		min-width: 0;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.article-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	.card-main {
		flex: 1;
		min-width: 0;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
		flex-wrap: wrap;
		min-width: 0;
	}

	.card-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text);
		margin: 0;
		flex: 1 1 60%;
		min-width: 0;
		overflow-wrap: anywhere;
		word-break: break-word;
	}

	.diff-badge {
		font-size: 0.65rem;
		padding: 0.15rem 0.5rem;
		border-radius: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		flex-shrink: 0;
	}

	.de-badge {
		font-size: 0.6rem;
		padding: 0.12rem 0.4rem;
		border-radius: 1rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		flex-shrink: 0;
		color: #92400e;
		background: #fef3c7;
		border: 1px solid #fcd34d;
	}

	.card-meta {
		font-size: 0.75rem;
		color: var(--muted);
		margin: 0 0 0.5rem;
		text-transform: capitalize;
		overflow-wrap: anywhere;
	}

	.card-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		min-width: 0;
		max-width: 100%;
	}

	.tag-chip,
	.area-chip {
		overflow-wrap: anywhere;
		word-break: break-word;
		max-width: 100%;
	}

	.area-chip {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.15rem 0.45rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.tag-chip {
		font-size: 0.65rem;
		color: var(--muted);
		padding: 0.15rem 0.4rem;
		border-radius: 0.3rem;
		background: var(--surface-hover);
	}

	.tag-more {
		opacity: 0.7;
	}

	.card-arrow {
		color: var(--muted);
		flex-shrink: 0;
	}

	/* Empty */
	.empty {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--muted);
	}

	.btn-clear-text {
		background: none;
		border: none;
		color: var(--color-primary);
		font-size: 0.875rem;
		cursor: pointer;
		font-family: inherit;
		text-decoration: underline;
		margin-top: 0.5rem;
	}
</style>
