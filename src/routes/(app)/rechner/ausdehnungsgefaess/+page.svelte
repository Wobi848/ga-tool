<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Inputs
	let vA = $state(500); // Anlageninhalt [l]
	let tVorlauf = $state(70); // °C (max. Auslegungstemperatur)
	let p0 = $state(1.5); // Vordruck (statisch + 0.3 bar Reserve) [bar]
	let pE = $state(2.5); // Enddruck (Sicherheitsventil − 0.5 bar) [bar]
	let staticHeight = $state(10); // m (Gebäudehöhe statisch)

	// Wasser-Ausdehnungskoeffizient bei verschiedenen Temperaturen
	// Approximation nach SWKI: e [%] = 0.0008 × t² + 0.0064 × t − 0.34 (für t in °C, ab 10°C)
	function expansionPct(t: number): number {
		// More accurate table-based for t ∈ [40, 110]
		const table: Array<[number, number]> = [
			[40, 0.79],
			[50, 1.21],
			[60, 1.71],
			[70, 2.28],
			[80, 2.9],
			[90, 3.59],
			[100, 4.34],
			[110, 5.15]
		];
		if (t <= table[0][0]) return table[0][1];
		if (t >= table[table.length - 1][0]) return table[table.length - 1][1];
		for (let i = 0; i < table.length - 1; i++) {
			const [t1, e1] = table[i];
			const [t2, e2] = table[i + 1];
			if (t >= t1 && t <= t2) return e1 + ((e2 - e1) * (t - t1)) / (t2 - t1);
		}
		return 0;
	}

	const result = $derived.by(() => {
		const ePct = expansionPct(tVorlauf);
		const ve = vA * (ePct / 100); // Ausdehnungsvolumen [l]
		const vWv = Math.max(vA * 0.005, 3); // Wasservorlage min. 0.5% oder 3 l
		const vBruttoNeeded = ve + vWv;
		// Druckfaktor: f = (pE + 1) / (pE − p0)
		const druckfaktor = (pE + 1) / (pE - p0);
		const vN = vBruttoNeeded * druckfaktor; // Nennvolumen MAG [l]

		// Standard MAG sizes
		const stdSizes = [8, 12, 18, 25, 35, 50, 80, 100, 140, 200, 300, 400, 500, 600, 800, 1000];
		const recommended = stdSizes.find((s) => s >= vN) ?? stdSizes[stdSizes.length - 1];

		return { ePct, ve, vWv, druckfaktor, vN, recommended };
	});

	// Mindest-Vordruck Hinweis (statische Höhe + 0.3 bar Reserve)
	const minP0 = $derived(staticHeight / 10 + 0.3);
	const p0TooLow = $derived(p0 < minP0 - 0.05);
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
			<h1 class="calc-title">{$_('rechner.ausdehnungsgefaess.name')}</h1>
			<FavButton type="rechner" slug="ausdehnungsgefaess" title={$_('rechner.ausdehnungsgefaess.name')} size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ausdehnungsgefaessUi.plant')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="va-in">
				{$_('rechner.ausdehnungsgefaessUi.plantContent')}
				<span class="calc-field-hint">{$_('rechner.ausdehnungsgefaessUi.plantContentHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="va-in" type="number" step="10" min="0" bind:value={vA} class="calc-input" />
				<span class="calc-input-unit">l</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="tv-in">
				{$_('rechner.ausdehnungsgefaessUi.maxFlowTemp')}
			</label>
			<div class="calc-input-wrap">
				<input id="tv-in" type="number" step="5" min="30" max="110" bind:value={tVorlauf} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="h-in">
				{$_('rechner.ausdehnungsgefaessUi.staticHeight')}
				<span class="calc-field-hint">{$_('rechner.ausdehnungsgefaessUi.staticHeightHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="h-in" type="number" step="0.5" min="0" bind:value={staticHeight} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ausdehnungsgefaessUi.pressures')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="p0-in">
				{$_('rechner.ausdehnungsgefaessUi.prePressure')}
				<span class="calc-field-hint">{$_('rechner.ausdehnungsgefaessUi.prePressureHint', { values: { p: fmt(minP0, 2) } })}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="p0-in" type="number" step="0.1" min="0" bind:value={p0} class="calc-input" />
				<span class="calc-input-unit">bar</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="pe-in">
				{$_('rechner.ausdehnungsgefaessUi.finalPressure')}
				<span class="calc-field-hint">{$_('rechner.ausdehnungsgefaessUi.finalPressureHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="pe-in" type="number" step="0.1" min="0" bind:value={pE} class="calc-input" />
				<span class="calc-input-unit">bar</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.recommendedMAG')}</span>
			<span class="calc-result-value primary">{result.recommended}<span class="calc-result-unit">l</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.nominalVolume')}</span>
			<span class="calc-result-value">{fmt(result.vN, 1)}<span class="calc-result-unit">l</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.expansionVolume')}</span>
			<span class="calc-result-value">{fmt(result.ve, 1)}<span class="calc-result-unit">l</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.waterReserve')}</span>
			<span class="calc-result-value">{fmt(result.vWv, 1)}<span class="calc-result-unit">l</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.expansionCoeff')}</span>
			<span class="calc-result-value">{fmt(result.ePct, 2)}<span class="calc-result-unit">%</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.pressureFactor')}</span>
			<span class="calc-result-value">{fmt(result.druckfaktor, 2)}</span>
		</div>
	</div>

	{#if p0TooLow}
		<div class="calc-warning">
			⚠ {$_('rechner.ausdehnungsgefaessUi.warnPrePressureDetail', { values: { p0, min: fmt(minP0, 2), h: staticHeight } })}
		</div>
	{/if}
	{#if pE - p0 < 0.5}
		<div class="calc-warning">
			⚠ {$_('rechner.ausdehnungsgefaessUi.warnSpreadDetail', { values: { spread: fmt(pE - p0, 2) } })}
		</div>
	{/if}

	<p class="calc-info">{$_('rechner.ausdehnungsgefaessUi.formulaNote')}</p>
</div>
