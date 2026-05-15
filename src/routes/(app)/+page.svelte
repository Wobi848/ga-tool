<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { converters } from '$lib/converters';
	import { rechner } from '$lib/rechner';
	import { articles } from '$lib/wissen/articles';
	import { abbreviations } from '$lib/abkuerzungen/data';
	import { referenceTables } from '$lib/referenz';
	import { favorites, favTypeLabel, favTypeColor, favTypeHref } from '$lib/stores/favorites';

	const modules = [
		{
			href: '/konverter',
			icon: 'refresh-cw',
			label: 'Konverter',
			desc: `${converters.length} Einheiten-Konverter — Druck, Temperatur, Durchfluss, Feuchte`,
			color: '#ea580c'
		},
		{
			href: '/rechner',
			icon: 'calculator',
			label: 'Rechner',
			desc: `${rechner.length} Rechner — Heizkurve, Kv-Wert, Taupunkt, Psychrometrie`,
			color: '#0d9488'
		},
		{
			href: '/wissen',
			icon: 'book-open',
			label: 'Wissensbasis',
			desc: `${articles.length} Artikel zu HLK, GA, Protokollen`,
			color: '#2563eb'
		},
		{
			href: '/checklisten',
			icon: 'clipboard-list',
			label: 'Checklisten',
			desc: `${4} interaktive IBN-/Übergabe-Checklisten mit CSV-Export`,
			color: '#7c3aed'
		},
		{
			href: '/referenz',
			icon: 'table',
			label: 'Referenz',
			desc: `${referenceTables.length} Tabellen — DN, Filter, Glykol, Kältemittel`,
			color: '#0891b2'
		},
		{
			href: '/abkuerzungen',
			icon: 'type',
			label: 'Abkürzungen',
			desc: `${abbreviations.length} Kürzel — bilingual DE ↔ EN`,
			color: '#65a30d'
		}
	];
</script>

<svelte:head>
	<title>Dashboard — GA Tool</title>
</svelte:head>

<div class="dashboard">
	<div class="dashboard-header">
		<h1>Dashboard</h1>
		<p>Die GA-Referenz für den Alltag</p>
	</div>

	{#if $favorites.length > 0}
	<section>
		<h2 class="section-title">
			<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" stroke="none" style="color:#eab308;vertical-align:-2px">
				<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
			</svg>
			Favoriten
		</h2>
		<div class="fav-grid">
			{#each $favorites.slice().reverse() as fav}
			<a href="{favTypeHref[fav.type]}/{fav.slug}" class="fav-card">
				<span class="fav-card-type" style="color:{favTypeColor[fav.type]};background:{favTypeColor[fav.type]}18">
					{favTypeLabel[fav.type]}
				</span>
				<span class="fav-card-title">{fav.title}</span>
				<button
					type="button"
					class="fav-card-remove"
					onclick={(e) => { e.preventDefault(); e.stopPropagation(); favorites.remove(fav.type, fav.slug); }}
					aria-label="Aus Favoriten entfernen"
				>×</button>
			</a>
			{/each}
		</div>
	</section>
	{/if}

	<section>
		<h2 class="section-title">Schnellzugriff</h2>
		<div class="module-grid">
			{#each modules as mod}
				<a href={mod.href} class="module-card">
					<div class="module-icon" style="background-color: {mod.color}20; color: {mod.color}">
						{@render ModuleIcon({ name: mod.icon })}
					</div>
					<div class="module-info">
						<span class="module-label">{mod.label}</span>
						<span class="module-desc">{mod.desc}</span>
					</div>
					<svg class="module-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
						<polyline points="9 18 15 12 9 6" />
					</svg>
				</a>
			{/each}
		</div>
	</section>
</div>

{#snippet ModuleIcon({ name }: { name: string })}
	<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
		{#if name === 'refresh-cw'}
			<polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
			<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
		{:else if name === 'calculator'}
			<rect x="4" y="2" width="16" height="20" rx="2" />
			<line x1="8" y1="6" x2="16" y2="6" />
			<line x1="8" y1="10" x2="8" y2="10" stroke-width="3" /><line x1="12" y1="10" x2="12" y2="10" stroke-width="3" /><line x1="16" y1="10" x2="16" y2="10" stroke-width="3" />
			<line x1="8" y1="14" x2="8" y2="14" stroke-width="3" /><line x1="12" y1="14" x2="12" y2="14" stroke-width="3" /><line x1="16" y1="14" x2="16" y2="14" stroke-width="3" />
			<line x1="8" y1="18" x2="16" y2="18" stroke-width="3" />
		{:else if name === 'book-open'}
			<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
		{:else if name === 'clipboard-list'}
			<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="16" x2="13" y2="16" />
		{:else if name === 'table'}
			<rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="15" x2="21" y2="15" /><line x1="9" y1="3" x2="9" y2="21" />
		{:else if name === 'type'}
			<polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
		{/if}
	</svg>
{/snippet}

<style>
	.dashboard { max-width: 800px; }

	.dashboard-header { margin-bottom: 2rem; }
	.dashboard-header h1 {
		font-family: var(--font-display);
		font-size: 2.5rem;
		font-weight: 400;
		letter-spacing: 0.03em;
		color: var(--text);
		margin: 0 0 0.25rem;
		line-height: 1;
	}
	.dashboard-header p {
		color: var(--muted);
		margin: 0;
		font-size: 0.9375rem;
	}

	.section-title {
		font-size: 0.8125rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--muted);
		margin: 0 0 0.75rem;
	}

	.module-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 0.75rem;
	}

	.module-card {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.875rem 1rem;
		background-color: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		text-decoration: none;
		transition: border-color 0.15s, box-shadow 0.15s;
	}

	.module-card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 1px 8px color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	.module-icon {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.625rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.module-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.module-label {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text);
	}

	.module-desc {
		font-size: 0.8125rem;
		color: var(--muted);
	}

	.module-arrow {
		color: var(--muted);
		flex-shrink: 0;
	}

	.fav-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.5rem;
	}

	.fav-card {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.625rem;
		text-decoration: none;
		color: var(--text);
		font-size: 0.875rem;
		transition: border-color 0.15s, background 0.15s;
		overflow: hidden;
	}

	.fav-card:hover {
		border-color: #eab308;
		background: color-mix(in srgb, #eab308 5%, var(--surface));
	}

	.fav-card-type {
		font-size: 0.65rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.15rem 0.4rem;
		border-radius: 0.25rem;
		flex-shrink: 0;
	}

	.fav-card-title {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.8125rem;
	}

	.fav-card-remove {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		font-size: 1rem;
		line-height: 1;
		padding: 0 0.1rem;
		flex-shrink: 0;
		opacity: 0;
		transition: opacity 0.15s, color 0.15s;
	}

	.fav-card:hover .fav-card-remove { opacity: 1; }
	.fav-card-remove:hover { color: #dc2626; }
</style>
