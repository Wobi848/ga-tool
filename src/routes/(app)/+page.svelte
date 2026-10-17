<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	const isEn = $derived($locale === 'en');
	import { converters, converterMap } from '$lib/converters';
	import { rechner, rechnerMap } from '$lib/rechner';
	import { articles, articleMap } from '$lib/wissen/articles';
	import { abbreviations } from '$lib/abkuerzungen/data';
	import { referenceTables, referenceMap } from '$lib/referenz';
	import { checklists } from '$lib/checklisten';
	import { favorites, favTypeHref } from '$lib/stores/favorites';
	import { openSearch } from '$lib/stores/search';

	let { data } = $props();

	const moduleHref: Record<string, string> = {
		konverter: '/konverter',
		rechner: '/rechner',
		wissen: '/wissen',
		checkliste: '/checklisten',
		referenz: '/referenz',
		abkuerzungen: '/abkuerzungen'
	};
	// Kürzel wie in der Seitenleiste, für die Typ-Spalte der Listen.
	const moduleCode: Record<string, string> = {
		konverter: 'KO',
		rechner: 'RE',
		wissen: 'WI',
		checkliste: 'CL',
		referenz: 'RF',
		abkuerzungen: 'AB'
	};

	const moduleLabel: Record<string, string> = $derived({
		konverter: $_('common.type.konverter'),
		rechner: $_('common.type.rechner'),
		wissen: $_('common.type.artikel'),
		checkliste: $_('common.type.checkliste'),
		referenz: $_('common.type.referenz'),
		abkuerzungen: $_('nav.abbreviations')
	});

	const rechnerSlugKey: Record<string, string> = {
		heizkurve: 'heizkurve',
		'kv-wert': 'kvWert',
		ausdehnungsgefaess: 'ausdehnungsgefaess',
		druckverlust: 'druckverlust',
		luftbedarf: 'luftbedarf',
		taupunkt: 'taupunkt',
		waermeleistung: 'waermeleistung',
		psychrometrie: 'psychrometrie',
		'pid-simulator': 'pidSimulator',
		leitungslaenge: 'leitungslaenge',
		elektro: 'elektro',
		'dip-switch': 'dipSwitch',
		'co2-regelung': 'co2Regelung',
		'u-wert': 'uWert',
		ventilautoritaet: 'ventilautoritaet',
		waermerueckgewinnung: 'waermerueckgewinnung',
		pumpenkennlinie: 'pumpenkennlinie',
		heizlast: 'heizlast',
		'bus-ibn': 'busIbn'
	};

	type RecentEntry = {
		type: 'wissen' | 'referenz' | 'checkliste' | 'rechner' | 'konverter';
		slug: string;
		title: string;
		updated: string;
	};

	const recentEntries: RecentEntry[] = $derived.by(() => {
		const all: RecentEntry[] = [];
		for (const a of articles) {
			if (a.updated)
				all.push({
					type: 'wissen',
					slug: a.slug,
					title: isEn && a.title_en ? a.title_en : a.title,
					updated: a.updated
				});
		}
		for (const r of referenceTables) {
			if (r.updated)
				all.push({
					type: 'referenz',
					slug: r.slug,
					title: isEn && r.title_en ? r.title_en : r.title,
					updated: r.updated
				});
		}
		for (const c of checklists) {
			if (c.updated)
				all.push({
					type: 'checkliste',
					slug: c.slug,
					title: isEn && c.title_en ? c.title_en : c.title,
					updated: c.updated
				});
		}
		for (const r of rechner) {
			if (r.updated)
				all.push({
					type: 'rechner',
					slug: r.slug,
					title: resolveTitle('rechner', r.slug),
					updated: r.updated
				});
		}
		for (const c of converters) {
			if (c.updated)
				all.push({
					type: 'konverter',
					slug: c.slug,
					title: resolveTitle('konverter', c.slug),
					updated: c.updated
				});
		}
		// `updated` kennt nur den Tag. Kommt an einem Tag viel dazu, entschied
		// bisher der Zufall, welche fünf davon zu sehen waren. Darum: bei
		// gleichem Datum fest nach Typ und Titel, und was am selben Tag wie der
		// fünfte Eintrag kam, wird noch mitgezeigt — höchstens acht.
		const typeOrder: RecentEntry['type'][] = [
			'wissen',
			'referenz',
			'checkliste',
			'rechner',
			'konverter'
		];
		all.sort(
			(a, b) =>
				b.updated.localeCompare(a.updated) ||
				typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type) ||
				a.title.localeCompare(b.title, 'de')
		);
		const cutoff = all[4]?.updated;
		let n = Math.min(5, all.length);
		while (n < Math.min(8, all.length) && all[n].updated === cutoff) n++;
		return all.slice(0, n);
	});

	function formatRelative(dateStr: string): string {
		const date = new Date(dateStr);
		if (isNaN(date.getTime())) return dateStr;
		const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
		if (days < 0) return dateStr;
		if (days === 0) return $_('dashboard.relativeToday');
		if (days === 1) return $_('dashboard.relativeYesterday');
		if (days < 7) return $_('dashboard.relativeDaysAgo', { values: { d: days } });
		if (days < 30) {
			const w = Math.floor(days / 7);
			return $_('dashboard.relativeWeeksAgo', { values: { w } });
		}
		return dateStr;
	}

	function resolveTitle(module: string, slug: string): string {
		if (module === 'konverter')
			return $_('konverter.' + slug + '.name', { default: converterMap[slug]?.name ?? slug });
		if (module === 'rechner') {
			const key = rechnerSlugKey[slug];
			return key
				? $_('rechner.' + key + '.name', { default: rechnerMap[slug]?.name ?? slug })
				: (rechnerMap[slug]?.name ?? slug);
		}
		if (module === 'wissen') {
			const a = articleMap[slug];
			return (isEn && a?.title_en ? a.title_en : a?.title) ?? slug;
		}
		if (module === 'referenz') return referenceMap[slug]?.title ?? slug;
		return slug;
	}

	function resolveFavTitle(type: string, slug: string, fallback: string): string {
		if (type === 'konverter') return $_('konverter.' + slug + '.name', { default: fallback });
		if (type === 'rechner') {
			const key = rechnerSlugKey[slug];
			return key ? $_('rechner.' + key + '.name', { default: fallback }) : fallback;
		}
		return fallback;
	}

	const moduleKeys = [
		{
			href: '/rechner',
			icon: 'calculator',
			key: 'rechner',
			code: 'RE',
			color: '#0d9488',
			count: rechner.length
		},
		{
			href: '/wissen',
			icon: 'book-open',
			key: 'wissen',
			code: 'WI',
			color: '#2563eb',
			count: articles.length
		},
		{
			href: '/konverter',
			icon: 'refresh-cw',
			key: 'konverter',
			code: 'KO',
			color: '#ea580c',
			count: converters.length
		},
		{
			href: '/checklisten',
			icon: 'clipboard-list',
			key: 'checklisten',
			code: 'CL',
			color: '#7c3aed',
			count: checklists.length
		},
		{
			href: '/referenz',
			icon: 'table',
			key: 'referenz',
			code: 'RF',
			color: '#0891b2',
			count: referenceTables.length
		},
		{
			href: '/abkuerzungen',
			icon: 'type',
			key: 'abkuerzungen',
			code: 'AB',
			color: '#65a30d',
			count: abbreviations.length
		}
	];
</script>

<svelte:head>
	<title>{$_('dashboard.title')} — GA Tool</title>
</svelte:head>

<div class="dashboard">
	<header class="hero">
		<p class="eyebrow">{$_('dashboard.eyebrow')}</p>
		<h1>{$_('dashboard.tagline')}</h1>
		<button type="button" class="hero-search" onclick={openSearch}>
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				aria-hidden="true"
			>
				<circle cx="11" cy="11" r="7" />
				<line x1="21" y1="21" x2="16.5" y2="16.5" />
			</svg>
			<span class="hero-search-text">{$_('dashboard.searchHint')}</span>
			<kbd>⌘K</kbd>
		</button>
	</header>

	{#if $favorites.length > 0}
		<section class="section" aria-labelledby="dash-fav">
			<h2 class="section-title" id="dash-fav">{$_('dashboard.favorites')}</h2>
			<div class="fav-strip">
				{#each $favorites.slice().reverse() as fav, _fav_i (_fav_i)}
					<a href="{favTypeHref[fav.type]}/{fav.slug}" class="fav-pill">
						<span class="fav-pill-type">{$_('common.type.' + fav.type)}</span>
						<span class="fav-pill-title">{resolveFavTitle(fav.type, fav.slug, fav.title)}</span>
						<button
							type="button"
							class="fav-pill-remove"
							onclick={(e) => {
								e.preventDefault();
								e.stopPropagation();
								favorites.remove(fav.type, fav.slug);
							}}
							aria-label={$_('dashboard.removeFavorite')}
						>
							<svg
								width="11"
								height="11"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								aria-hidden="true"
								><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
							>
						</button>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	<section class="section" aria-labelledby="dash-mods">
		<h2 class="section-title" id="dash-mods">{$_('dashboard.quickAccess')}</h2>
		<div class="module-grid">
			{#each moduleKeys as mod, _mod_i (_mod_i)}
				<a href={mod.href} class="module-card">
					<span class="module-top">
						<span class="module-code">{mod.code}</span>
						<span class="module-count">{mod.count}</span>
					</span>
					<span class="module-label">{$_(`dashboard.modules.${mod.key}.name`)}</span>
					<span class="module-desc">{$_(`dashboard.modules.${mod.key}.desc`)}</span>
				</a>
			{/each}
		</div>
	</section>

	<div class="lists">
		{#if recentEntries.length > 0}
			<section class="section" aria-labelledby="dash-new">
				<div class="section-head">
					<h2 class="section-title" id="dash-new">{$_('dashboard.recentEntries')}</h2>
					<a href="/changelog" class="section-link">{$_('nav.changelog')} →</a>
				</div>
				<div class="top-list">
					{#each recentEntries as item (item.type + '/' + item.slug)}
						<a href="{moduleHref[item.type]}/{item.slug}" class="top-item">
							<span class="top-badge" title={moduleLabel[item.type] ?? item.type}>
								{moduleCode[item.type] ?? ''} · {moduleLabel[item.type] ?? item.type}
							</span>
							<span class="top-title">{item.title}</span>
							<span class="top-cnt">{formatRelative(item.updated)}</span>
						</a>
					{/each}
				</div>
			</section>
		{/if}

		{#if data.topItems.length > 0}
			<section class="section" aria-labelledby="dash-top">
				<div class="section-head">
					<h2 class="section-title" id="dash-top">{$_('dashboard.recentlyUsed')}</h2>
				</div>
				<div class="top-list">
					{#each data.topItems as item, i (i)}
						{#if moduleHref[item.module]}
							<a href="{moduleHref[item.module]}/{item.slug}" class="top-item">
								<span class="top-badge">
									<span class="top-rank">{String(i + 1).padStart(2, '0')}</span>
									{moduleCode[item.module] ?? ''}
								</span>
								<span class="top-title">{resolveTitle(item.module, item.slug ?? '')}</span>
								<span class="top-cnt">{item.cnt}×</span>
							</a>
						{/if}
					{/each}
				</div>
			</section>
		{/if}
	</div>
</div>

<style>
	.dashboard {
		max-width: 1080px;
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	/* ── Hero ───────────────────────────────────────── */
	.hero {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		padding-top: 0.5rem;
	}

	.eyebrow {
		margin: 0;
		font-family: var(--font-mono);
		font-size: 0.75rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--primary-text);
	}

	.hero h1 {
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 5vw, 3.75rem);
		font-weight: 800;
		letter-spacing: -0.025em;
		line-height: 1.02;
		color: var(--text);
		margin: 0;
		max-width: 16ch;
		overflow-wrap: anywhere;
		hyphens: auto;
	}

	.hero-search {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		width: 100%;
		max-width: 760px;
		min-height: 3.5rem;
		padding: 0 0.5rem 0 1.25rem;
		background: var(--surface);
		border: 1.5px solid var(--ink);
		border-radius: 0.625rem;
		color: var(--text);
		font-family: var(--font-sans);
		font-size: 1.0625rem;
		text-align: left;
		cursor: text;
	}

	.hero-search-text {
		flex: 1;
		min-width: 0;
		color: var(--muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hero-search kbd {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.375rem 0.625rem;
		color: var(--muted);
	}

	@media (hover: none) {
		.hero-search kbd {
			display: none;
		}
	}

	/* ── Sections ────────────────────────────────────── */
	.section {
		display: flex;
		flex-direction: column;
		gap: 0.875rem;
		min-width: 0;
	}

	.section-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 1rem;
	}

	.section-title {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted);
		margin: 0;
	}

	.section-link {
		font-size: 0.8125rem;
		font-weight: 600;
		color: var(--primary-text);
		text-decoration: none;
	}

	.section-link:hover {
		text-decoration: underline;
	}

	/* ── Favourites ──────────────────────────────────── */
	.fav-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.fav-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		min-height: 2.5rem;
		padding: 0 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		font-size: 0.875rem;
		max-width: 260px;
	}

	.fav-pill:hover {
		border-color: var(--ink);
	}

	.fav-pill-type {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		color: var(--primary-text);
		flex-shrink: 0;
	}

	.fav-pill-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}

	.fav-pill-remove {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		opacity: 0;
		transition:
			opacity 0.15s,
			color 0.15s;
	}

	.fav-pill:hover .fav-pill-remove,
	.fav-pill-remove:focus-visible {
		opacity: 1;
	}

	@media (hover: none) {
		.fav-pill-remove {
			opacity: 1;
		}
	}

	.fav-pill-remove:hover {
		color: var(--primary-text);
	}

	/* ── Module Grid ─────────────────────────────────── */
	/* Sechs Module: 3, 2 oder 1 Spalte, damit nie eine Zelle leer bleibt. */
	.module-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1px;
		background: var(--border);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		overflow: hidden;
	}

	@media (max-width: 900px) {
		.module-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 520px) {
		.module-grid {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	.module-card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1.375rem 1.5rem;
		min-height: 10rem;
		background: var(--surface);
		text-decoration: none;
		color: var(--text);
	}

	/* Im Raster liegen die Karten Kante an Kante: kein Anheben, nur Farbe. */
	.module-card:hover {
		background: var(--surface-hover);
		transform: none !important;
		box-shadow: none !important;
	}

	.module-top {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	.module-code {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--primary-text);
	}

	.module-count {
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
		font-size: 2rem;
		font-weight: 500;
		letter-spacing: -0.02em;
		line-height: 1;
	}

	.module-label {
		font-size: 1.25rem;
		font-weight: 700;
		letter-spacing: -0.01em;
	}

	.module-desc {
		font-size: 0.875rem;
		line-height: 1.45;
		color: var(--muted);
	}

	/* ── Lists ───────────────────────────────────────── */
	.lists {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
		gap: 2.5rem;
	}

	.top-list {
		display: flex;
		flex-direction: column;
		border-top: 1.5px solid var(--ink);
	}

	.top-item {
		display: grid;
		grid-template-columns: 7.5rem minmax(0, 1fr) auto;
		align-items: center;
		gap: 1rem;
		min-height: 3.25rem;
		padding: 0 0.25rem;
		border-bottom: 1px solid var(--border);
		text-decoration: none;
		color: var(--text);
		font-size: 0.9375rem;
	}

	.top-item:hover {
		background: var(--surface);
		transform: none !important;
		box-shadow: none !important;
	}

	.top-item:hover .top-title {
		color: var(--primary-text);
	}

	.top-badge {
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		text-transform: uppercase;
		color: var(--muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.top-rank {
		color: var(--text);
		font-weight: 600;
		margin-right: 0.5rem;
	}

	.top-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 600;
	}

	.top-cnt {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 480px) {
		.top-item {
			grid-template-columns: 4.5rem minmax(0, 1fr) auto;
			gap: 0.75rem;
		}
	}
</style>
