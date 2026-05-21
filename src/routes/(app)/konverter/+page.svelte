<script lang="ts">
	import { converters } from '$lib/converters';
	import { _ } from 'svelte-i18n';

	const iconPaths: Record<string, string> = {
		gauge:
			'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3a7 7 0 0 1 7 7 7 7 0 0 1-7 7 7 7 0 0 1-7-7 7 7 0 0 1 7-7zm0 2a1 1 0 0 0-1 1v4l-2.5 2.5a1 1 0 1 0 1.414 1.414L12.5 13.4V8a1 1 0 0 0-1-1z',
		droplets:
			'M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05zM12.56 6.6A5.72 5.72 0 0 0 14 3c-.29 1.45-1.14 2.84-2.29 3.76S9.8 8.85 9.8 10a3.53 3.53 0 0 0 3.7 3.33A3.53 3.53 0 0 0 17.2 10c0-1.15-.57-2.25-1.71-3.18zM19.36 13.72A3.53 3.53 0 0 0 21 11c-.29 1.45-1.14 2.84-2.29 3.76S16.8 16.85 16.8 18a3.53 3.53 0 0 0 3.7 3.33A3.53 3.53 0 0 0 24.2 18c0-1.15-.57-2.25-1.71-3.18z',
		'battery-charging': 'M15 7H11l-4 9h4l-1.5 7 8.5-12H14l1-4z',
		zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
		wind: 'M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2',
		droplet: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
		thermometer: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z'
	};
</script>

<div class="page">
	<header class="page-header">
		<h1>{$_('konverter.title')}</h1>
		<p class="subtitle">{$_('konverter.subtitle')}</p>
	</header>

	<div class="grid">
		{#each converters as c}
			<a href="/konverter/{c.slug}" class="card">
				<div class="card-icon" style="background: {c.color}20; color: {c.color}">
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d={iconPaths[c.icon] ?? 'M12 2v20M2 12h20'} />
					</svg>
				</div>
				<div class="card-body">
					<h2 class="card-title">{$_('konverter.' + c.slug + '.name', { default: c.name })}</h2>
					<p class="card-units">{c.units.map((u) => u.symbol).join(' · ')}</p>
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
	</div>
</div>

<style>
	.page {
		max-width: 640px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.page-header {
		margin-bottom: 1.5rem;
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

	.grid {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.card {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		text-decoration: none;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	.card:hover {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent);
	}

	.card-icon {
		width: 2.75rem;
		height: 2.75rem;
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
		margin: 0 0 0.2rem;
	}

	.card-units {
		font-size: 0.75rem;
		color: var(--muted);
		margin: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.card-arrow {
		color: var(--muted);
		flex-shrink: 0;
	}
</style>
