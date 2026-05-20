<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Betriebsart
	type Mode = 'authority' | 'kvs-select';
	let mode: Mode = $state('authority');

	// Eingaben
	let dpv100  = $state(3000);  // Pa — Druckverlust Ventil bei 100% Hub (Ventilkennwert)
	let dpSystem = $state(8000); // Pa — Druckverlust des restlichen Kreises (Wärmetauscher + Rohre + Fittings)
	let flow    = $state(1.2);   // m³/h — Auslegungsdurchfluss
	let dp100   = $state(0.3);   // bar — Druckverlust Ventil vollgeöffnet (für Kv-Select)

	// Für Kv-Auswahl
	let kvsOptions = [0.16,0.25,0.4,0.63,1.0,1.6,2.5,4.0,6.3,10,16,25,40,63,100];

	const result = $derived.by(() => {
		// Ventilautorität α = ΔpV,100 / (ΔpV,100 + ΔpSystem)
		const dpTotal = dpv100 + dpSystem;
		const alpha = dpv100 / dpTotal;

		// Bewertung
		let rating: string;
		let ratingColor: string;
		if (alpha >= 0.5)       { rating = 'Sehr gut (α ≥ 0.5)';  ratingColor = '#16a34a'; }
		else if (alpha >= 0.3)  { rating = 'Gut (α 0.3–0.5)';     ratingColor = '#ca8a04'; }
		else if (alpha >= 0.2)  { rating = 'Akzeptabel (α 0.2–0.3)'; ratingColor = '#ea580c'; }
		else                    { rating = 'Schlecht (α < 0.2)';   ratingColor = '#dc2626'; }

		return { alpha, dpTotal, rating, ratingColor };
	});

	const kvResult = $derived.by(() => {
		// Kv bei Auslegung: Kv = Q / sqrt(ΔpV / 1bar)  → Q in m³/h, Δp in bar
		const dpBar = dpv100 / 100000; // Pa → bar
		const kv = flow / Math.sqrt(dpBar);

		// Empfohlenes Kvs (nächste Stufe über Kv × 1.3 — Sicherheitsfaktor)
		const kvMin = kv * 1.3;
		const kvs = kvsOptions.find(v => v >= kvMin) ?? kvsOptions[kvsOptions.length - 1];
		const kvsFactor = kvs / kv;

		return { kv, kvs, kvsFactor };
	});

	// Kennlinienpunkte: Durchfluss als Funktion vom Hub (linear Ventil, α-Einfluss)
	const curve = $derived.by(() => {
		const alpha = result.alpha;
		// Relativer Durchfluss q = h / sqrt(1 - alpha + alpha*h²) — Näherung für Linearventil
		return Array.from({ length: 11 }, (_, i) => {
			const h = i / 10;
			const q = h / Math.sqrt(1 - alpha + alpha * h * h);
			return { h: Math.round(h * 100), q: Math.min(1, q) };
		});
	});
</script>

<div class="calc-page">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			{$_('common.allCalculators')}
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">{$_('rechner.ventilautoritaet.name')}</h1>
			<FavButton type="rechner" slug="ventilautoritaet" title={$_('rechner.ventilautoritaet.name')} size={20} />
		</div>
	</header>

	<div class="mode-tabs">
		<button class="mode-tab" class:active={mode === 'authority'} onclick={() => mode = 'authority'}>
			{$_('rechner.ventilautoritaetUi.tabAuthority')}
		</button>
		<button class="mode-tab" class:active={mode === 'kvs-select'} onclick={() => mode = 'kvs-select'}>
			{$_('rechner.ventilautoritaetUi.tabKvs')}
		</button>
	</div>

	{#if mode === 'authority'}
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ventilautoritaetUi.pressures')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="dpv-in">
				{$_('rechner.ventilautoritaetUi.dpValve100')}
				<span class="calc-field-hint">{$_('rechner.ventilautoritaetUi.dpValve100Hint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="dpv-in" type="number" step="100" min="100" bind:value={dpv100} class="calc-input" />
				<span class="calc-input-unit">Pa</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="dps-in">
				{$_('rechner.ventilautoritaetUi.dpSystem')}
				<span class="calc-field-hint">{$_('rechner.ventilautoritaetUi.dpSystemHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="dps-in" type="number" step="100" min="0" bind:value={dpSystem} class="calc-input" />
				<span class="calc-input-unit">Pa</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.authority')}</span>
			<span class="calc-result-value primary" style="color: {result.ratingColor}">
				{fmt(result.alpha, 2)}<span class="calc-result-unit"></span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.rating')}</span>
			<span class="calc-result-value" style="font-size: 0.9rem; color: {result.ratingColor}">{result.rating}</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.totalDp')}</span>
			<span class="calc-result-value">{fmt(result.dpTotal / 1000, 2)}<span class="calc-result-unit">kPa</span></span>
		</div>
	</div>

	<!-- Kennlinie -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ventilautoritaetUi.effectiveCurve')} (Linearventil, α = {fmt(result.alpha, 2)})</h2>
		<div class="curve-grid">
			<div class="curve-axis-y">q/q<sub>max</sub></div>
			<div class="curve-chart">
				{#each curve.slice().reverse() as pt}
				<div class="curve-row">
					<span class="curve-label">{pt.h}%</span>
					<div class="curve-bar-wrap">
						<div class="curve-bar" style="width: {pt.q * 100}%"></div>
						{#if pt.h === 100}
						<div class="curve-bar ideal" style="width: 100%; opacity: 0.25"></div>
						{/if}
					</div>
					<span class="curve-val">{fmt(pt.q * 100, 0)}%</span>
				</div>
				{/each}
			</div>
		</div>
		<p class="curve-note">{$_('rechner.ventilautoritaetUi.curveNote')}</p>
	</div>

	<p class="calc-info">{$_('rechner.ventilautoritaetUi.authorityFormulaNote')}</p>
	{/if}

	{#if mode === 'kvs-select'}
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ventilautoritaetUi.designData')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="flow-in">{$_('rechner.ventilautoritaetUi.designFlow')}</label>
			<div class="calc-input-wrap">
				<input id="flow-in" type="number" step="0.1" min="0.01" bind:value={flow} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="dp100-in">
				{$_('rechner.ventilautoritaetUi.dpAtDesign')}
				<span class="calc-field-hint">{$_('rechner.ventilautoritaetUi.dpAtDesignHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="dp100-in" type="number" step="0.05" min="0.01" bind:value={dp100} class="calc-input" />
				<span class="calc-input-unit">bar</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.calcKv')}</span>
			<span class="calc-result-value">{fmt(kvResult.kv, 2)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.recommendedKvs')}</span>
			<span class="calc-result-value primary">{kvResult.kvs}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ventilautoritaetUi.kvsOverKv')}</span>
			<span class="calc-result-value">{fmt(kvResult.kvsFactor, 2)}</span>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ventilautoritaetUi.kvsStandard')}</h2>
		<div class="kvs-grid">
			{#each kvsOptions as v}
			<div class="kvs-chip" class:kvs-selected={v === kvResult.kvs} class:kvs-too-small={v < kvResult.kv * 1.3}>
				{v}
			</div>
			{/each}
		</div>
	</div>

	<p class="calc-info">{$_('rechner.ventilautoritaetUi.formulaNote')}</p>
	{/if}
</div>

<style>
	.mode-tabs {
		display: flex;
		gap: 0.375rem;
		margin-bottom: 0.75rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.25rem;
	}

	.mode-tab {
		flex: 1;
		padding: 0.4rem 0.75rem;
		border: none;
		border-radius: 0.5rem;
		background: transparent;
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--muted);
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
	}

	.mode-tab.active {
		background: var(--color-primary);
		color: #fff;
	}

	/* Curve */
	.curve-grid {
		display: flex;
		gap: 0.25rem;
	}

	.curve-axis-y {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		font-size: 0.7rem;
		color: var(--muted);
		text-align: center;
		flex-shrink: 0;
	}

	.curve-chart {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.curve-row {
		display: grid;
		grid-template-columns: 2.5rem 1fr 2.5rem;
		align-items: center;
		gap: 0.4rem;
	}

	.curve-label {
		font-size: 0.7rem;
		color: var(--muted);
		text-align: right;
		font-family: ui-monospace, monospace;
	}

	.curve-bar-wrap {
		background: var(--bg);
		border-radius: 999px;
		height: 8px;
		position: relative;
		overflow: hidden;
	}

	.curve-bar {
		height: 100%;
		background: var(--color-primary);
		border-radius: 999px;
		position: absolute;
		left: 0;
		top: 0;
	}

	.curve-bar.ideal {
		background: var(--muted);
	}

	.curve-val {
		font-size: 0.7rem;
		color: var(--muted);
		font-family: ui-monospace, monospace;
	}

	.curve-note {
		font-size: 0.7rem;
		color: var(--muted);
		margin-top: 0.5rem;
	}

	/* Kvs grid */
	.kvs-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
	}

	.kvs-chip {
		padding: 0.3rem 0.6rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		font-size: 0.8125rem;
		font-family: ui-monospace, monospace;
		color: var(--muted);
		background: var(--bg);
	}

	.kvs-selected {
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
		color: var(--color-primary);
		font-weight: 700;
	}

	.kvs-too-small {
		opacity: 0.35;
		text-decoration: line-through;
	}
</style>
