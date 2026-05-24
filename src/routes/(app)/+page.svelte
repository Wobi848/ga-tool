<script lang="ts">
	import { _, locale } from 'svelte-i18n';
	const isEn = $derived($locale === 'en');
	import { converters, converterMap } from '$lib/converters';
	import { rechner, rechnerMap } from '$lib/rechner';
	import { articles, articleMap } from '$lib/wissen/articles';
	import { abbreviations } from '$lib/abkuerzungen/data';
	import { referenceTables, referenceMap } from '$lib/referenz';
	import { checklists } from '$lib/checklisten';
	import { favorites, favTypeColor, favTypeHref } from '$lib/stores/favorites';

	let { data } = $props();

	const moduleHref: Record<string, string> = {
		konverter: '/konverter',
		rechner: '/rechner',
		wissen: '/wissen',
		checkliste: '/checklisten',
		referenz: '/referenz',
		abkuerzungen: '/abkuerzungen'
	};
	const moduleColor: Record<string, string> = {
		konverter: '#ea580c',
		rechner: '#0d9488',
		wissen: '#2563eb',
		checkliste: '#7c3aed',
		referenz: '#0891b2',
		abkuerzungen: '#65a30d'
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
		return all.sort((a, b) => (a.updated < b.updated ? 1 : -1)).slice(0, 5);
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
			color: '#0d9488',
			count: rechner.length
		},
		{ href: '/wissen', icon: 'book-open', key: 'wissen', color: '#2563eb', count: articles.length },
		{
			href: '/konverter',
			icon: 'refresh-cw',
			key: 'konverter',
			color: '#ea580c',
			count: converters.length
		},
		{
			href: '/checklisten',
			icon: 'clipboard-list',
			key: 'checklisten',
			color: '#7c3aed',
			count: checklists.length
		},
		{
			href: '/referenz',
			icon: 'table',
			key: 'referenz',
			color: '#0891b2',
			count: referenceTables.length
		},
		{
			href: '/abkuerzungen',
			icon: 'type',
			key: 'abkuerzungen',
			color: '#65a30d',
			count: abbreviations.length
		}
	];
</script>

<svelte:head>
	<title>{$_('dashboard.title')} — GA Tool</title>
</svelte:head>

<div class="dashboard">
	<header class="dashboard-header">
		<h1>{$_('dashboard.title')}</h1>
		<p>{$_('dashboard.tagline')}</p>
	</header>

	{#if $favorites.length > 0}
		<section class="section">
			<h2 class="section-title">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="currentColor"
					stroke="none"
					class="section-icon"
					style="color:#eab308"
				>
					<polygon
						points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
					/>
				</svg>
				{$_('dashboard.favorites')}
			</h2>
			<div class="fav-strip">
				{#each $favorites.slice().reverse() as fav, _fav_i (_fav_i)}
					<a href="{favTypeHref[fav.type]}/{fav.slug}" class="fav-pill">
						<span class="fav-pill-dot" style="background:{favTypeColor[fav.type]}"></span>
						<span class="fav-pill-type" style="color:{favTypeColor[fav.type]}"
							>{$_('common.type.' + fav.type)}</span
						>
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
								><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg
							>
						</button>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if recentEntries.length > 0}
		<section class="section">
			<h2 class="section-title">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					class="section-icon"
					style="color:var(--color-secondary)"
				>
					<circle cx="12" cy="12" r="9" />
					<polyline points="12 7 12 12 15 14" />
				</svg>
				{$_('dashboard.recentEntries')}
			</h2>
			<div class="top-list">
				{#each recentEntries as item (item.type + '/' + item.slug)}
					<a href="{moduleHref[item.type]}/{item.slug}" class="top-item">
						<span class="top-accent" style="background:{moduleColor[item.type]}"></span>
						<span
							class="top-badge"
							style:color={moduleColor[item.type]}
							style:background="{moduleColor[item.type]}18"
						>
							{moduleLabel[item.type] ?? item.type}
						</span>
						<span class="top-title">{item.title}</span>
						<span class="top-cnt">{formatRelative(item.updated)}</span>
					</a>
				{/each}
			</div>
		</section>
	{/if}

	{#if data.topItems.length > 0}
		<section class="section">
			<h2 class="section-title">
				<svg
					width="13"
					height="13"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
					class="section-icon"
					style="color:var(--color-primary)"
				>
					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
				</svg>
				{$_('dashboard.recentlyUsed')}
			</h2>
			<div class="top-list">
				{#each data.topItems as item, i (i)}
					{#if moduleHref[item.module]}
						<a href="{moduleHref[item.module]}/{item.slug}" class="top-item">
							<span class="top-accent" style="background:{moduleColor[item.module]}"></span>
							<span class="top-rank">{i + 1}</span>
							<span
								class="top-badge"
								style:color={moduleColor[item.module]}
								style:background="{moduleColor[item.module]}18"
							>
								{moduleLabel[item.module] ?? item.module}
							</span>
							<span class="top-title">{resolveTitle(item.module, item.slug ?? '')}</span>
							<span class="top-cnt">{item.cnt}×</span>
						</a>
					{/if}
				{/each}
			</div>
		</section>
	{/if}

	<section class="section">
		<h2 class="section-title">{$_('dashboard.quickAccess')}</h2>
		<div class="module-grid">
			{#each moduleKeys as mod, _mod_i (_mod_i)}
				<a href={mod.href} class="module-card" style="--mod-color:{mod.color}">
					<div class="module-icon" style="background:{mod.color}18; color:{mod.color}">
						{@render ModuleIcon({ name: mod.icon })}
					</div>
					<div class="module-info">
						<span class="module-label">{$_(`dashboard.modules.${mod.key}.name`)}</span>
						<span class="module-desc">{mod.count} {$_(`dashboard.modules.${mod.key}.desc`)}</span>
					</div>
					<svg
						class="module-arrow"
						width="15"
						height="15"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</a>
			{/each}
		</div>
	</section>
</div>

{#snippet ModuleIcon({ name }: { name: string })}
	<svg
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		{#if name === 'refresh-cw'}
			<polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
			<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
		{:else if name === 'calculator'}
			<rect x="4" y="2" width="16" height="20" rx="2" />
			<line x1="8" y1="6" x2="16" y2="6" />
			<line x1="8" y1="10" x2="8" y2="10" stroke-width="3" /><line
				x1="12"
				y1="10"
				x2="12"
				y2="10"
				stroke-width="3"
			/><line x1="16" y1="10" x2="16" y2="10" stroke-width="3" />
			<line x1="8" y1="14" x2="8" y2="14" stroke-width="3" /><line
				x1="12"
				y1="14"
				x2="12"
				y2="14"
				stroke-width="3"
			/><line x1="16" y1="14" x2="16" y2="14" stroke-width="3" />
			<line x1="8" y1="18" x2="16" y2="18" stroke-width="3" />
		{:else if name === 'book-open'}
			<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path
				d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
			/>
		{:else if name === 'clipboard-list'}
			<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect
				x="8"
				y="2"
				width="8"
				height="4"
				rx="1"
			/><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
		{:else if name === 'table'}
			<rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line
				x1="3"
				y1="15"
				x2="21"
				y2="15"
			/><line x1="9" y1="3" x2="9" y2="21" />
		{:else if name === 'type'}
			<polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line
				x1="12"
				y1="4"
				x2="12"
				y2="20"
			/>
		{/if}
	</svg>
{/snippet}

<style>
	.dashboard {
		max-width: 800px;
	}

	/* ── Header ─────────────────────────────────────── */
	.dashboard-header {
		margin-bottom: 2.25rem;
		padding-bottom: 1.5rem;
		border-bottom: 1px solid var(--border);
	}

	.dashboard-header h1 {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: 0.03em;
		color: var(--text);
		margin: 0 0 0.3rem;
		line-height: 1;
	}

	.dashboard-header p {
		color: var(--muted);
		margin: 0;
		font-size: 0.9375rem;
	}

	/* ── Sections ────────────────────────────────────── */
	.section {
		margin-bottom: 2rem;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--muted);
		margin: 0 0 0.875rem;
	}

	/* ── Favourites ──────────────────────────────────── */
	.fav-strip {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.fav-pill {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.35rem 0.65rem 0.35rem 0.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 2rem;
		text-decoration: none;
		color: var(--text);
		font-size: 0.8125rem;
		transition:
			border-color 0.15s,
			background 0.15s;
		max-width: 220px;
	}

	.fav-pill:hover {
		border-color: #eab308;
		background: color-mix(in srgb, #eab308 6%, var(--surface));
	}

	.fav-pill-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.fav-pill-type {
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		flex-shrink: 0;
	}

	.fav-pill-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
	}

	.fav-pill-remove {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
		flex-shrink: 0;
		opacity: 0;
		transition:
			opacity 0.15s,
			color 0.15s;
		margin-left: 0.1rem;
	}

	.fav-pill:hover .fav-pill-remove {
		opacity: 1;
	}
	.fav-pill-remove:hover {
		color: #dc2626;
	}

	/* ── Recently Used ───────────────────────────────── */
	.top-list {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.top-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.55rem 0.875rem 0.55rem 0;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.625rem;
		text-decoration: none;
		color: var(--text);
		font-size: 0.875rem;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
		overflow: hidden;
	}

	.top-item:hover {
		border-color: var(--color-primary);
		box-shadow: 0 1px 6px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.top-accent {
		width: 3px;
		align-self: stretch;
		flex-shrink: 0;
		border-radius: 0 2px 2px 0;
	}

	.top-rank {
		font-size: 0.7rem;
		font-weight: 700;
		color: var(--muted);
		width: 1rem;
		text-align: center;
		flex-shrink: 0;
	}

	.top-badge {
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.top-title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: 500;
	}

	.top-cnt {
		font-size: 0.7rem;
		color: var(--muted);
		flex-shrink: 0;
		font-variant-numeric: tabular-nums;
	}

	/* ── Module Grid ─────────────────────────────────── */
	.module-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 0.625rem;
	}

	.module-card {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.875rem 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.875rem;
		text-decoration: none;
		transition:
			border-color 0.15s,
			box-shadow 0.15s,
			background 0.15s;
		position: relative;
		overflow: hidden;
	}

	.module-card::before {
		content: '';
		position: absolute;
		inset: 0 auto 0 0;
		width: 3px;
		background: var(--mod-color);
		opacity: 0;
		transition: opacity 0.15s;
	}

	.module-card:hover {
		border-color: var(--mod-color);
		box-shadow: 0 2px 12px color-mix(in srgb, var(--mod-color) 15%, transparent);
		background: color-mix(in srgb, var(--mod-color) 3%, var(--surface));
	}

	.module-card:hover::before {
		opacity: 1;
	}

	.module-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.625rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: transform 0.15s;
	}

	.module-card:hover .module-icon {
		transform: scale(1.08);
	}

	.module-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}

	.module-label {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
	}

	.module-desc {
		font-size: 0.78rem;
		color: var(--muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.module-arrow {
		color: var(--muted);
		flex-shrink: 0;
		transition:
			transform 0.15s,
			color 0.15s;
	}

	.module-card:hover .module-arrow {
		transform: translateX(2px);
		color: var(--mod-color);
	}
</style>
