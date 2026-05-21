<script lang="ts">
	import { page } from '$app/stores';
	import { _, locale } from 'svelte-i18n';
	import { abbreviations, letters } from '$lib/abkuerzungen/data';
	import { getEquivalents, langOf, equivalentShorts } from '$lib/abkuerzungen/groups';
	import { langLabels, type AbbrLang } from '$lib/abkuerzungen/types';
	import { type Area } from '$lib/wissen/types';
	import { untrack } from 'svelte';
	import { onMount } from 'svelte';

	const initialQuery = untrack(() => $page.url.searchParams.get('q') ?? '');

	let query = $state(initialQuery);
	let selectedAreas: Area[] = $state([]);

	function defaultLangs(): AbbrLang[] {
		return $locale === 'en' ? ['en'] : ['de'];
	}

	let selectedLangs = $state<AbbrLang[]>([]);
	onMount(() => {
		selectedLangs = defaultLangs();
	});

	function slugifyShort(s: string): string {
		return s
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function scrollToShort(s: string) {
		const tryScroll = () => {
			const el = document.getElementById(`abbr-${slugifyShort(s)}`);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'center' });
				el.classList.add('flash');
				setTimeout(() => el.classList.remove('flash'), 1200);
				return true;
			}
			return false;
		};
		if (!tryScroll()) {
			// Entry is filtered out — clear filters and retry on next tick
			query = '';
			selectedAreas = [];
			setTimeout(tryScroll, 60);
		}
	}

	const allAreas: Area[] = ['hlk', 'sanitaer', 'elektro', 'ga', 'it', 'normen'];

	function toggle<T>(arr: T[], value: T): T[] {
		return arr.includes(value) ? arr.filter((x) => x !== value) : [...arr, value];
	}

	// Pre-compute a haystack per abbreviation including equivalents
	// so searching "BMS" also matches the GLT entry (and vice versa)
	const haystackByShort = $derived.by(() => {
		const map: Record<string, string> = {};
		for (const a of abbreviations) {
			const eqShorts = equivalentShorts(a.short);
			const eqLongs = eqShorts
				.map((s) => abbreviations.find((x) => x.short === s)?.long ?? '')
				.filter(Boolean);
			map[a.short] = [
				a.short,
				a.long,
				($locale === 'en' && a.descriptionEn ? a.descriptionEn : a.description) ?? '',
				...eqShorts,
				...eqLongs
			]
				.join(' ')
				.toLowerCase();
		}
		return map;
	});

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return abbreviations.filter((a) => {
			if (selectedAreas.length && !a.areas.some((x) => selectedAreas.includes(x))) return false;
			if (
				selectedLangs.length &&
				langOf(a.short) !== 'intl' &&
				!selectedLangs.includes(langOf(a.short))
			)
				return false;
			if (!q) return true;
			return haystackByShort[a.short]?.includes(q) ?? false;
		});
	});

	const filteredByLetter = $derived.by(() => {
		const groups: Record<string, typeof abbreviations> = {};
		for (const a of filtered) {
			const letter = a.short[0].toUpperCase();
			(groups[letter] = groups[letter] ?? []).push(a);
		}
		return groups;
	});

	const visibleLetters = $derived(Object.keys(filteredByLetter).sort());

	function scrollToLetter(letter: string) {
		const el = document.getElementById(`letter-${letter}`);
		if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
</script>

<div class="page">
	<header class="page-header">
		<h1>{$_('abkuerzungen.title')}</h1>
		<p class="subtitle">
			{abbreviations.length}
			{$_('abkuerzungen.subtitle')}
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
			placeholder={$_('abkuerzungen.searchPlaceholder')}
			bind:value={query}
			class="search-input"
		/>
		{#if query || selectedAreas.length || selectedLangs.length}
			<button
				class="btn-clear"
				onclick={() => {
					query = '';
					selectedAreas = [];
					selectedLangs = defaultLangs();
				}}
				title={$_('abkuerzungen.reset')}
			>
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

	<div class="filter-row">
		{#each allAreas as a}
			<button
				class="chip"
				class:active={selectedAreas.includes(a)}
				onclick={() => (selectedAreas = toggle(selectedAreas, a))}>{$_('area.' + a)}</button
			>
		{/each}
		<span class="filter-sep">|</span>
		{#each ['de', 'en'] as AbbrLang[] as lg}
			<button
				class="chip chip-lang"
				class:active={selectedLangs.includes(lg)}
				onclick={() => (selectedLangs = toggle(selectedLangs, lg))}
				>{langLabels[lg].flag} {langLabels[lg].short}</button
			>
		{/each}
		<span class="intl-badge" title={$_('abkuerzungen.langIntl')}>🌐 INT</span>
	</div>

	<!-- A-Z quick nav -->
	<nav class="az-nav" aria-label={$_('abkuerzungen.navAZ')}>
		{#each letters as l}
			<button
				class="az-btn"
				class:disabled={!visibleLetters.includes(l)}
				disabled={!visibleLetters.includes(l)}
				onclick={() => scrollToLetter(l)}>{l}</button
			>
		{/each}
	</nav>

	<section class="results">
		{#if filtered.length === 0}
			<p class="empty">{$_('abkuerzungen.noResults')}</p>
		{:else}
			<p class="count">{filtered.length} {$_('abkuerzungen.results')}</p>
			{#each visibleLetters as letter}
				<div class="letter-group" id="letter-{letter}">
					<h2 class="letter-heading">{letter}</h2>
					<div class="list">
						{#each filteredByLetter[letter] as a}
							{@const equivalents = getEquivalents(a.short, abbreviations)}
							{@const lang = langOf(a.short)}
							<svelte:element
								this={a.wissenSlug ? 'a' : 'article'}
								id="abbr-{slugifyShort(a.short)}"
								href={a.wissenSlug ? `/wissen/${a.wissenSlug}` : undefined}
								class="abbr-card"
								class:abbr-card-linked={a.wissenSlug}
							>
								<div class="abbr-head">
									<span class="abbr-short">{a.short}</span>
									<span
										class="lang-pill"
										title={lang === 'intl'
											? $_('abkuerzungen.langIntl')
											: lang === 'en'
												? $_('abkuerzungen.langEn')
												: $_('abkuerzungen.langDe')}
									>
										{langLabels[lang].flag}
										{langLabels[lang].short}
									</span>
									<span class="abbr-long">{a.long}</span>
									{#if a.wissenSlug}
										<span class="abbr-link-hint" title={$_('abkuerzungen.hasArticle')}>
											<svg
												width="14"
												height="14"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												stroke-width="2"
												stroke-linecap="round"
												stroke-linejoin="round"
											>
												<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
												<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
											</svg>
										</span>
									{/if}
								</div>

								{#if equivalents.length}
									<div class="equivalents">
										<span class="equivalents-label">{$_('abkuerzungen.also')}</span>
										{#each equivalents as eq}
											{@const eqLang = langOf(eq.short)}
											<button
												type="button"
												class="eq-chip"
												onclick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													scrollToShort(eq.short);
												}}
												title="Zu {eq.short} — {eq.long}"
											>
												<span class="eq-flag">{langLabels[eqLang].flag}</span>
												<span class="eq-short">{eq.short}</span>
												<span class="eq-long">{eq.long}</span>
											</button>
										{/each}
									</div>
								{/if}

								{#if a.description || a.descriptionEn}
									<p class="abbr-desc">
										{$locale === 'en' && a.descriptionEn ? a.descriptionEn : a.description}
									</p>
								{/if}
								<div class="abbr-foot">
									<div class="abbr-areas">
										{#each a.areas as ar}
											<span class="area-chip">{$_('area.' + ar)}</span>
										{/each}
									</div>
									{#if a.related && a.related.length}
										<span class="abbr-related">
											{$_('abkuerzungen.related')}
											{a.related.join(' · ')}
										</span>
									{/if}
									{#if a.wissenSlug}
										<span class="abbr-link">{$_('abkuerzungen.wissensartikel')}</span>
									{/if}
								</div>
							</svelte:element>
						{/each}
					</div>
				</div>
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

	/* Search */
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

	/* Filter chips */
	.filter-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 1rem;
		align-items: center;
	}

	.filter-sep {
		color: var(--border);
		font-size: 0.875rem;
		padding: 0 0.15rem;
		user-select: none;
	}

	.intl-badge {
		font-size: 0.8125rem;
		padding: 0.25rem 0.7rem;
		border-radius: 1rem;
		border: 1px dashed var(--border);
		color: var(--muted);
		cursor: default;
		user-select: none;
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
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	/* A-Z nav */
	.az-nav {
		position: sticky;
		top: 56px;
		background: var(--bg);
		display: flex;
		flex-wrap: wrap;
		gap: 0.2rem;
		padding: 0.5rem 0;
		margin: 0 -0.25rem 1rem;
		z-index: 5;
		border-bottom: 1px solid var(--border);
	}

	.az-btn {
		min-width: 1.75rem;
		height: 1.75rem;
		padding: 0 0.4rem;
		border: 1px solid var(--border);
		border-radius: 0.4rem;
		background: var(--surface);
		color: var(--text);
		font-size: 0.75rem;
		font-weight: 600;
		font-family: inherit;
		cursor: pointer;
	}

	.az-btn:hover:not(:disabled) {
		background: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.az-btn:disabled,
	.az-btn.disabled {
		opacity: 0.25;
		cursor: default;
	}

	/* Results */
	.count {
		font-size: 0.75rem;
		color: var(--muted);
		margin: 0 0 0.5rem 0.25rem;
	}

	.letter-group {
		margin-bottom: 1.5rem;
	}

	.letter-heading {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0 0 0.5rem 0.25rem;
		scroll-margin-top: 120px;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.abbr-card {
		display: block;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.875rem 1rem;
		text-decoration: none;
		color: inherit;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.abbr-card-linked {
		cursor: pointer;
	}

	.abbr-card-linked:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.abbr-link-hint {
		display: inline-flex;
		align-items: center;
		color: var(--color-primary);
		margin-left: auto;
		opacity: 0.75;
	}

	.abbr-card-linked:hover .abbr-link-hint {
		opacity: 1;
	}

	/* Language pill */
	.lang-pill {
		font-size: 0.6rem;
		font-weight: 600;
		padding: 0.1rem 0.4rem;
		border-radius: 0.3rem;
		background: var(--surface-hover);
		color: var(--muted);
		letter-spacing: 0.02em;
		flex-shrink: 0;
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	/* Equivalents row */
	.equivalents {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		align-items: center;
		margin: 0.5rem 0 0.4rem;
		padding: 0.5rem 0.7rem;
		background: color-mix(in srgb, var(--color-primary) 6%, transparent);
		border-radius: 0.5rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
	}

	.equivalents-label {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		margin-right: 0.25rem;
	}

	.eq-chip {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		padding: 0.2rem 0.55rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.4rem;
		font-size: 0.75rem;
		color: var(--text);
		cursor: pointer;
		font-family: inherit;
		transition:
			border-color 0.15s,
			background 0.15s;
	}

	.eq-chip:hover {
		border-color: var(--color-primary);
		background: var(--surface-hover);
	}

	.eq-flag {
		font-size: 0.85rem;
		line-height: 1;
	}

	.eq-short {
		font-weight: 700;
		color: var(--color-primary);
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	.eq-long {
		color: var(--muted);
	}

	/* Flash highlight when scrolling to an entry */
	.abbr-card :global(.flash),
	:global(.flash) {
		animation: flash-bg 1.2s ease-out;
	}

	@keyframes flash-bg {
		0% {
			background-color: color-mix(in srgb, var(--color-primary) 30%, var(--surface));
			border-color: var(--color-primary);
		}
		100% {
			background-color: var(--surface);
		}
	}

	.abbr-head {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		flex-wrap: wrap;
	}

	.abbr-short {
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-primary);
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	.abbr-long {
		font-size: 0.9375rem;
		color: var(--text);
		font-weight: 500;
	}

	.abbr-desc {
		font-size: 0.8125rem;
		color: var(--muted);
		line-height: 1.5;
		margin: 0.4rem 0 0.5rem;
	}

	.abbr-foot {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1rem;
		align-items: center;
		font-size: 0.7rem;
	}

	.abbr-areas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.area-chip {
		font-size: 0.65rem;
		font-weight: 600;
		padding: 0.15rem 0.45rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.abbr-related {
		color: var(--muted);
		font-style: italic;
	}

	.abbr-link {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
	}

	.abbr-link:hover {
		text-decoration: underline;
	}

	.empty {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--muted);
	}
</style>
