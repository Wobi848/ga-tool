<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { _ } from 'svelte-i18n';
	import { converterMap } from '$lib/converters';
	import { rechnerMap } from '$lib/rechner';
	import { articleMap } from '$lib/wissen/articles';
	import { referenceMap } from '$lib/referenz';
	import { checklistMap } from '$lib/checklisten';
	import { trackRecent } from '$lib/stores/recent';
	import { favorites, favTypeHref } from '$lib/stores/favorites';
	import SearchModal from '$lib/components/SearchModal.svelte';
	import PwaStatus from '$lib/components/PwaStatus.svelte';
	import { onMount } from 'svelte';
	import { APP_VERSION } from '$lib/version';
	import { installDevtools } from '$lib/devtools';

	let { children, data } = $props();

	let searchOpen = $state(false);
	let favsOpen = $state(false);

	const CURRENT_VERSION = APP_VERSION;
	const STORAGE_KEY = 'ga-tool-seen-version';
	let showUpdateBanner = $state(false);

	onMount(() => {
		const seen = localStorage.getItem(STORAGE_KEY);
		if (seen !== CURRENT_VERSION) showUpdateBanner = true;
		if (data.user) favorites.syncFromServer();
		installDevtools();
	});

	function dismissBanner() {
		localStorage.setItem(STORAGE_KEY, CURRENT_VERSION);
		showUpdateBanner = false;
	}

	function handleGlobalKey(e: KeyboardEvent) {
		if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			searchOpen = true;
			return;
		}
		// "/" opens search when not typing in an input
		if (e.key === '/' && !searchOpen) {
			const target = e.target as HTMLElement | null;
			const tag = target?.tagName;
			if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT' && !target?.isContentEditable) {
				e.preventDefault();
				searchOpen = true;
			}
		}
		// 1-7 navigate to nav items
		const num = parseInt(e.key);
		if (num >= 1 && num <= 7 && !e.ctrlKey && !e.metaKey && !e.altKey && !searchOpen) {
			const target = e.target as HTMLElement | null;
			const tag = target?.tagName;
			if (tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT' && !target?.isContentEditable) {
				e.preventDefault();
				goto(navItems[num - 1].href);
			}
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleGlobalKey);
		return () => window.removeEventListener('keydown', handleGlobalKey);
	});

	// Analytics — fire-and-forget on every navigation
	$effect(() => {
		const pathname = $page.url.pathname;
		fetch('/api/track', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ path: pathname }),
			keepalive: true
		}).catch(() => {});
	});

	// Central recent-items tracking — runs after each navigation
	$effect(() => {
		const pathname = $page.url.pathname;
		const konv = pathname.match(/^\/konverter\/([^/]+)$/);
		if (konv) {
			const meta = converterMap[konv[1]];
			if (meta) trackRecent({ type: 'konverter', slug: meta.slug, name: meta.name });
		}
		const rch = pathname.match(/^\/rechner\/([^/]+)$/);
		if (rch) {
			const meta = rechnerMap[rch[1]];
			if (meta) trackRecent({ type: 'rechner', slug: meta.slug, name: meta.name });
		}
		const wis = pathname.match(/^\/wissen\/([^/]+)$/);
		if (wis) {
			const meta = articleMap[wis[1]];
			if (meta) trackRecent({ type: 'wissen', slug: meta.slug, name: meta.title });
		}
		const ref = pathname.match(/^\/referenz\/([^/]+)$/);
		if (ref) {
			const meta = referenceMap[ref[1]];
			if (meta) trackRecent({ type: 'referenz', slug: meta.slug, name: meta.title });
		}
		const cl = pathname.match(/^\/checklisten\/([^/]+)$/);
		if (cl) {
			const meta = checklistMap[cl[1]];
			if (meta) trackRecent({ type: 'checkliste', slug: meta.slug, name: meta.title });
		}
	});

	const navItems = [
		{ href: '/', label: () => $_('nav.home'), icon: 'home', key: 'home' },
		{ href: '/konverter', label: () => $_('nav.converter'), icon: 'refresh-cw', key: 'konverter' },
		{ href: '/rechner', label: () => $_('nav.calculator'), icon: 'calculator', key: 'rechner' },
		{ href: '/wissen', label: () => $_('nav.knowledge'), icon: 'book-open', key: 'wissen' },
		{
			href: '/checklisten',
			label: () => $_('nav.checklists'),
			icon: 'clipboard-list',
			key: 'checklisten'
		},
		{ href: '/referenz', label: () => $_('nav.reference'), icon: 'table', key: 'referenz' },
		{
			href: '/abkuerzungen',
			label: () => $_('nav.abbreviations'),
			icon: 'type',
			key: 'abkuerzungen'
		}
	];

	const bottomItems = navItems.slice(0, 5);

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}
</script>

<div class="app-shell">
	<!-- ── Sidebar (Desktop) ──────────────────────── -->
	<aside class="sidebar">
		<div class="sidebar-header">
			<a href="/" class="logo-link">
				<div class="logo-icon">
					<svg
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2.5"
					>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
						<polyline points="9 22 9 12 15 12 15 22" />
					</svg>
				</div>
				<span class="logo-text">GA Tool</span>
			</a>
		</div>

		<nav class="sidebar-nav">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class="nav-item"
					class:active={isActive(item.href)}
					aria-label={item.label()}
				>
					{@render Icon({ name: item.icon, size: 18 })}
					<span>{item.label()}</span>
				</a>
			{/each}
		</nav>

		<!-- ── Favoriten Dropdown ── -->
		{#if $favorites.length > 0}
			<div class="fav-section">
				<button type="button" class="fav-toggle" onclick={() => (favsOpen = !favsOpen)}>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill={favsOpen ? 'currentColor' : 'none'}
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polygon
							points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
						/>
					</svg>
					<span>{$_('dashboard.favorites')}</span>
					<span class="fav-count">{$favorites.length}</span>
					<svg
						class="fav-chevron"
						class:fav-chevron--open={favsOpen}
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</button>
				{#if favsOpen}
					<div class="fav-list">
						{#each $favorites.slice().reverse() as fav, _fav_i (_fav_i)}
							<a
								href="{favTypeHref[fav.type]}/{fav.slug}"
								class="fav-item"
								class:active={isActive(`${favTypeHref[fav.type]}/${fav.slug}`)}
								title={fav.title}
							>
								<span class="fav-type-dot" data-type={fav.type}></span>
								<span class="fav-item-title">{fav.title}</span>
							</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}

		<div class="sidebar-footer">
			{#if data.user}
				<a href="/profil" class="nav-item" class:active={isActive('/profil')}>
					{@render Icon({ name: 'user', size: 18 })}
					<span>{$_('nav.profile')}</span>
				</a>
			{:else}
				<a href="/login" class="nav-item nav-item--login">
					{@render Icon({ name: 'log-in', size: 18 })}
					<span>{$_('auth.login')}</span>
				</a>
			{/if}
			<a href="/settings" class="nav-item" class:active={isActive('/settings')}>
				{@render Icon({ name: 'settings', size: 18 })}
				<span>{$_('nav.settings')}</span>
			</a>
			{#if data.user?.role === 'admin' || data.user?.role === 'systemadmin'}
				<a href="/admin" class="nav-item nav-item--admin" class:active={isActive('/admin')}>
					{@render Icon({ name: 'shield', size: 18 })}
					<span>{data.user.role === 'systemadmin' ? 'System Admin' : 'Admin'}</span>
				</a>
			{/if}
			{#if data.user}
				<button
					type="button"
					class="nav-item nav-item--btn"
					onclick={async () => {
						await fetch('/api/auth/sign-out', { method: 'POST' });
						window.location.href = '/login';
					}}
				>
					{@render Icon({ name: 'log-out', size: 18 })}
					<span>{$_('auth.logout')}</span>
				</button>
			{/if}
		</div>
	</aside>

	<!-- ── Main content ───────────────────────────── -->
	<div class="main-wrapper">
		<header class="top-bar">
			<div class="top-bar-left">
				<span class="page-title">
					{navItems.find((n) => isActive(n.href))?.label() ?? 'GA Tool'}
				</span>
			</div>
			<div class="top-bar-right">
				<button
					class="search-trigger"
					onclick={() => (searchOpen = true)}
					aria-label={$_('nav.searchOpen')}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					>
						<circle cx="11" cy="11" r="8" />
						<line x1="21" y1="21" x2="16.65" y2="16.65" />
					</svg>
					<span class="search-trigger-text">{$_('nav.search')}</span>
					<kbd class="search-kbd">⌘K</kbd>
				</button>
				<a href="/changelog" class="version-badge" title="Changelog">v{APP_VERSION}</a>
				{#if data.user}
					<a href="/profil" class="user-badge">{data.user.email}</a>
				{:else}
					<a href="/login" class="user-badge user-badge--guest">{$_('auth.login')}</a>
				{/if}
			</div>
		</header>

		{#if showUpdateBanner}
			<div class="update-banner" role="status">
				<span class="update-icon">✦</span>
				<span class="update-text">
					<strong>{$_('nav.updateNew', { values: { version: CURRENT_VERSION } })}</strong>
					{$_('nav.updateText')}
				</span>
				<a href="/changelog" class="update-link" onclick={dismissBanner}>{$_('nav.changelog')}</a>
				<button
					type="button"
					class="update-close"
					onclick={dismissBanner}
					aria-label={$_('nav.close')}>×</button
				>
			</div>
		{/if}

		<main class="main-content">
			{@render children()}
		</main>
	</div>

	<!-- ── Bottom Nav (Mobile) ────────────────────── -->
	<nav class="bottom-nav">
		{#each bottomItems as item (item.href)}
			<a href={item.href} class="bottom-nav-item" class:active={isActive(item.href)}>
				{@render Icon({ name: item.icon, size: 20 })}
				<span>{item.label()}</span>
			</a>
		{/each}
	</nav>
</div>

<!-- ── Global Search Modal ─────────────────────── -->
<SearchModal bind:open={searchOpen} />

<!-- ── PWA: offline banner, install prompt, ready toast ── -->
<PwaStatus />

<!-- Simple inline icon component -->
{#snippet Icon({ name, size = 18 }: { name: string; size?: number })}
	<svg
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if name === 'home'}
			<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		{:else if name === 'refresh-cw'}
			<polyline points="23 4 23 10 17 10" />
			<polyline points="1 20 1 14 7 14" />
			<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
		{:else if name === 'calculator'}
			<rect x="4" y="2" width="16" height="20" rx="2" />
			<line x1="8" y1="6" x2="16" y2="6" />
			<line x1="8" y1="10" x2="8" y2="10" stroke-width="3" />
			<line x1="12" y1="10" x2="12" y2="10" stroke-width="3" />
			<line x1="16" y1="10" x2="16" y2="10" stroke-width="3" />
			<line x1="8" y1="14" x2="8" y2="14" stroke-width="3" />
			<line x1="12" y1="14" x2="12" y2="14" stroke-width="3" />
			<line x1="16" y1="14" x2="16" y2="14" stroke-width="3" />
			<line x1="8" y1="18" x2="16" y2="18" stroke-width="3" />
		{:else if name === 'book-open'}
			<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
			<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
		{:else if name === 'clipboard-list'}
			<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
			<rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
			<line x1="9" y1="12" x2="15" y2="12" />
			<line x1="9" y1="16" x2="13" y2="16" />
		{:else if name === 'table'}
			<rect x="3" y="3" width="18" height="18" rx="2" />
			<line x1="3" y1="9" x2="21" y2="9" />
			<line x1="3" y1="15" x2="21" y2="15" />
			<line x1="9" y1="3" x2="9" y2="21" />
		{:else if name === 'type'}
			<polyline points="4 7 4 4 20 4 20 7" />
			<line x1="9" y1="20" x2="15" y2="20" />
			<line x1="12" y1="4" x2="12" y2="20" />
		{:else if name === 'settings'}
			<circle cx="12" cy="12" r="3" />
			<path
				d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
			/>
		{:else if name === 'log-out'}
			<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" y1="12" x2="9" y2="12" />
		{:else if name === 'user'}
			<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		{:else if name === 'log-in'}
			<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
			<polyline points="10 17 15 12 10 7" />
			<line x1="15" y1="12" x2="3" y2="12" />
		{:else if name === 'shield'}
			<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
		{/if}
	</svg>
{/snippet}

<style>
	.app-shell {
		display: flex;
		min-height: 100vh;
	}

	/* ── Sidebar ── */
	.sidebar {
		width: 220px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--sidebar-bg);
		border-right: 1px solid var(--sidebar-border);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 40;
	}

	.sidebar-header {
		padding: 1.25rem 1rem;
		border-bottom: 1px solid var(--sidebar-border);
	}

	.logo-link {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		text-decoration: none;
	}

	.logo-icon {
		width: 2rem;
		height: 2rem;
		border-radius: 0.5rem;
		background-color: var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.logo-text {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 1.4rem;
		letter-spacing: 0.04em;
		color: var(--text);
	}

	.sidebar-nav {
		flex: 1;
		padding: 0.75rem 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 2px;
		overflow-y: auto;
	}

	.sidebar-footer {
		padding: 0.75rem 0.5rem;
		border-top: 1px solid var(--sidebar-border);
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--muted);
		text-decoration: none;
		transition:
			background-color 0.15s,
			color 0.15s;
		cursor: pointer;
		width: 100%;
		border: none;
		background: none;
		text-align: left;
		font-family: var(--font-sans);
	}

	.nav-item:hover {
		background-color: var(--surface-hover);
		color: var(--text);
	}

	.nav-item.active {
		background-color: color-mix(in srgb, var(--color-primary) 12%, transparent);
		color: var(--color-primary);
	}

	.nav-item--btn {
		color: var(--muted);
	}

	/* ── Favoriten Sidebar ── */
	.fav-section {
		border-top: 1px solid var(--border);
		padding: 0.5rem 0.75rem 0.25rem;
	}

	.fav-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		background: none;
		border: none;
		cursor: pointer;
		color: #eab308;
		font-size: 0.8125rem;
		font-weight: 600;
		padding: 0.3rem 0;
		font-family: inherit;
	}

	.fav-toggle:hover {
		color: #ca8a04;
	}

	.fav-count {
		background: color-mix(in srgb, #eab308 20%, transparent);
		color: #eab308;
		border-radius: 999px;
		font-size: 0.65rem;
		font-weight: 700;
		padding: 0 0.35rem;
		line-height: 1.6;
	}

	.fav-chevron {
		margin-left: auto;
		color: var(--muted);
		transition: transform 0.2s;
	}

	.fav-chevron--open {
		transform: rotate(180deg);
	}

	.fav-list {
		display: flex;
		flex-direction: column;
		gap: 1px;
		margin-top: 0.25rem;
		padding-bottom: 0.25rem;
	}

	.fav-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem 0.4rem;
		border-radius: 0.375rem;
		text-decoration: none;
		color: var(--muted);
		font-size: 0.8rem;
		transition:
			background 0.15s,
			color 0.15s;
		overflow: hidden;
	}

	.fav-item:hover,
	.fav-item.active {
		background: var(--surface-hover);
		color: var(--text);
	}

	.fav-item-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.fav-type-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.fav-type-dot[data-type='artikel'] {
		background: #2563eb;
	}
	.fav-type-dot[data-type='rechner'] {
		background: #0d9488;
	}
	.fav-type-dot[data-type='konverter'] {
		background: #ea580c;
	}
	.fav-type-dot[data-type='referenz'] {
		background: #0891b2;
	}
	.fav-type-dot[data-type='checkliste'] {
		background: #7c3aed;
	}

	/* ── Main ── */
	.main-wrapper {
		margin-left: 220px;
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		min-width: 0;
		overflow-x: clip;
	}

	.top-bar {
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 1.5rem;
		background-color: var(--surface);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 30;
		gap: 0.5rem;
		min-width: 0;
	}

	.top-bar-left,
	.top-bar-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		min-width: 0;
	}

	@media (max-width: 640px) {
		.top-bar {
			padding: 0 0.75rem;
		}
		.page-title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.page-title {
		font-weight: 600;
		font-size: 0.9375rem;
		color: var(--text);
	}

	.version-badge {
		font-size: 0.6875rem;
		font-weight: 600;
		color: var(--muted);
		text-decoration: none;
		padding: 0.2rem 0.5rem;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: var(--surface);
		font-family: ui-monospace, monospace;
		white-space: nowrap;
		transition:
			background 0.15s,
			color 0.15s,
			border-color 0.15s;
	}
	.version-badge:hover {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.user-badge {
		font-size: 0.8125rem;
		color: var(--muted);
		text-decoration: none;
		padding: 0.3rem 0.6rem;
		border-radius: 0.375rem;
		transition:
			background 0.15s,
			color 0.15s;
		max-width: 10rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	@media (max-width: 480px) {
		.user-badge {
			max-width: 5rem;
		}
	}

	.user-badge:hover {
		background: var(--surface-hover);
		color: var(--text);
	}

	.user-badge--guest {
		color: var(--color-primary);
		font-weight: 500;
	}

	.nav-item--login {
		color: var(--color-primary);
	}

	.nav-item--admin {
		color: #7c3aed;
	}
	.nav-item--admin:hover,
	.nav-item--admin.active {
		background: color-mix(in srgb, #7c3aed 12%, transparent);
		color: #7c3aed;
	}

	.top-bar-right {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.search-trigger {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.35rem 0.6rem;
		color: var(--muted);
		font-family: inherit;
		font-size: 0.8125rem;
		cursor: pointer;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.search-trigger:hover {
		border-color: var(--color-primary);
		color: var(--text);
	}

	.search-kbd {
		font-size: 0.65rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.05rem 0.3rem;
		font-family: inherit;
		color: var(--muted);
	}

	@media (max-width: 540px) {
		.search-trigger-text,
		.search-kbd {
			display: none;
		}
	}

	.main-content {
		flex: 1;
		padding: 1.5rem;
		min-width: 0;
		max-width: 100%;
	}

	@media (max-width: 480px) {
		.main-content {
			padding: 0.875rem 0.75rem;
		}
	}

	/* ── Bottom Nav (Mobile) ── */
	.bottom-nav {
		display: none;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 60px;
		background-color: var(--surface);
		border-top: 1px solid var(--border);
		z-index: 40;
	}

	@media (max-width: 768px) {
		.sidebar {
			display: none;
		}

		.main-wrapper {
			margin-left: 0;
			padding-bottom: 60px;
		}

		.bottom-nav {
			display: flex;
			align-items: center;
			justify-content: space-around;
		}
	}

	.bottom-nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 0.375rem 0.25rem;
		color: var(--muted);
		text-decoration: none;
		font-size: 0.6875rem;
		font-weight: 500;
		border-radius: 0.5rem;
		transition: color 0.15s;
		flex: 1;
		min-width: 0;
		text-align: center;
	}

	.bottom-nav-item span {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 100%;
	}

	@media (max-width: 400px) {
		.bottom-nav-item {
			font-size: 0.625rem;
		}
	}

	.bottom-nav-item.active {
		color: var(--color-primary);
	}

	/* ── Update Banner ── */
	.update-banner {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.6rem 1.5rem;
		background: color-mix(in srgb, var(--color-primary) 10%, var(--surface));
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
		font-size: 0.8125rem;
		color: var(--text);
		flex-shrink: 0;
	}

	.update-icon {
		color: var(--color-primary);
		font-size: 0.875rem;
		flex-shrink: 0;
	}

	.update-text {
		flex: 1;
		line-height: 1.4;
	}

	.update-text strong {
		color: var(--color-primary);
	}

	.update-link {
		color: var(--color-primary);
		text-decoration: none;
		font-weight: 500;
		white-space: nowrap;
		padding: 0.2rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid color-mix(in srgb, var(--color-primary) 40%, transparent);
		transition: background 0.15s;
	}

	.update-link:hover {
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.update-close {
		background: none;
		border: none;
		cursor: pointer;
		color: var(--muted);
		font-size: 1.25rem;
		line-height: 1;
		padding: 0 0.25rem;
		flex-shrink: 0;
		transition: color 0.15s;
	}

	.update-close:hover {
		color: var(--text);
	}

	@media (max-width: 540px) {
		.update-text {
			font-size: 0.75rem;
		}
	}

	@media print {
		.sidebar,
		.top-bar,
		.bottom-nav,
		.update-banner {
			display: none !important;
		}

		.app-shell,
		.main-wrapper {
			min-height: 0 !important;
			height: auto !important;
		}

		.main-wrapper {
			margin-left: 0 !important;
			padding-bottom: 0 !important;
		}
		.main-content {
			padding: 0 !important;
		}
	}
</style>
