<script lang="ts">
	import { rechner } from '$lib/rechner';
	import { _ } from 'svelte-i18n';

	const slugKey: Record<string, string> = {
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
		'bus-ibn': 'busIbn',
		'gewichteter-mittelwert': 'gewichteterMittelwert',
		'polynom-fit': 'polynomFit',
		'k-faktor': 'kFaktor'
	};

	const iconPaths: Record<string, string> = {
		'trending-up': 'M23 6l-9.5 9.5-5-5L1 18M17 6h6v6',
		sliders: 'M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6',
		cylinder: 'M3 5a9 3 0 1 0 18 0a9 3 0 1 0 -18 0zM3 5v14a9 3 0 0 0 18 0V5',
		activity: 'M22 12h-4l-3 9L9 3l-3 9H2',
		wind: 'M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2',
		droplet: 'M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z',
		zap: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
		thermometer: 'M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z',
		cpu: 'M9 3H7a2 2 0 0 0-2 2v2M9 3h6M9 3V1m6 2h2a2 2 0 0 1 2 2v2M15 3V1M21 9v6M21 15h-2a2 2 0 0 1-2-2v-2M3 9v6M3 15h2a2 2 0 0 0 2-2v-2M9 21h6M9 21v2m6-2v2M15 21h2a2 2 0 0 0 2-2v-2M9 7h6v10H9z',
		'chart-line': 'M3 3v18h18M7 14l4-4 4 4 5-7'
	};
</script>

<div class="page">
	<header class="page-header">
		<h1>{$_('rechner.title')}</h1>
		<p class="subtitle">{$_('rechner.subtitle')}</p>
	</header>

	<div class="grid">
		{#each rechner as r (r)}
			<a href="/rechner/{r.slug}" class="card">
				<div class="card-icon" style="background: {r.color}20; color: {r.color}">
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
						<path d={iconPaths[r.icon] ?? 'M12 2v20M2 12h20'} />
					</svg>
				</div>
				<div class="card-body">
					<h2 class="card-title">{$_(`rechner.${slugKey[r.slug]}.name`, { default: r.name })}</h2>
					<p class="card-short">{$_(`rechner.${slugKey[r.slug]}.short`, { default: r.short })}</p>
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
		max-width: 720px;
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
		margin: 0 0 0.2rem;
	}

	.card-short {
		font-size: 0.8125rem;
		color: var(--muted);
		margin: 0;
		line-height: 1.35;
	}

	.card-arrow {
		color: var(--muted);
		flex-shrink: 0;
	}
</style>
