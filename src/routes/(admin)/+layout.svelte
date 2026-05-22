<script lang="ts">
	import { page } from '$app/stores';
	let { children } = $props();

	const adminNav = [
		{ href: '/admin', label: 'Benutzer' },
		{ href: '/admin/analytics', label: 'Analytics' }
	];

	function isActive(href: string) {
		return $page.url.pathname === href;
	}
</script>

<div class="admin-shell">
	<div class="admin-header">
		<div class="admin-header-top">
			<h1 class="admin-title">Admin</h1>
			<a href="/" class="back-link">← App</a>
		</div>
		<nav class="admin-nav">
			{#each adminNav as item (item.href)}
				<a href={item.href} class="admin-nav-item" class:active={isActive(item.href)}>
					{item.label}
				</a>
			{/each}
		</nav>
	</div>

	<div class="admin-content">
		{@render children()}
	</div>
</div>

<style>
	.admin-shell {
		min-height: 100vh;
		background: var(--bg);
		padding: 1.5rem;
	}

	.admin-header {
		max-width: 1000px;
		margin: 0 auto 2rem;
	}

	.admin-header-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1rem;
	}

	.admin-title {
		font-family: var(--font-display);
		font-size: 2.25rem;
		font-weight: 400;
		color: var(--text);
		margin: 0;
		line-height: 1;
	}

	.back-link {
		font-size: 0.875rem;
		color: var(--muted);
		text-decoration: none;
	}

	.back-link:hover {
		color: var(--text);
	}

	.admin-nav {
		display: flex;
		gap: 0.25rem;
		border-bottom: 1px solid var(--border);
		padding-bottom: 0;
	}

	.admin-nav-item {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--muted);
		text-decoration: none;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.admin-nav-item:hover {
		color: var(--text);
	}

	.admin-nav-item.active {
		color: var(--color-primary);
		border-bottom-color: var(--color-primary);
	}

	.admin-content {
		max-width: 1000px;
		margin: 0 auto;
	}
</style>
