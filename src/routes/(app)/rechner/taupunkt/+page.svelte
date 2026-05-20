<script lang="ts">
	import { dewPoint, absHumidity, fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	let temperature = $state(22);
	let rh = $state(50);

	const result = $derived.by(() => {
		const dp = dewPoint(temperature, rh);
		const x = absHumidity(temperature, rh);
		const spread = temperature - dp;
		return { dp, x, spread };
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
			<h1 class="calc-title">{$_('rechner.taupunkt.name')}</h1>
			<FavButton type="rechner" slug="taupunkt" title={$_('rechner.taupunkt.name')} size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ui.input')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="t-input">
				{$_('rechner.taupunktUi.airTemp')}
			</label>
			<div class="calc-input-wrap">
				<input id="t-input" type="number" step="0.5" bind:value={temperature} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="rh-input">
				{$_('rechner.taupunktUi.relHumidity')}
			</label>
			<div class="calc-input-wrap">
				<input id="rh-input" type="number" step="1" min="0" max="100" bind:value={rh} class="calc-input" />
				<span class="calc-input-unit">%</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.taupunktUi.dewpoint')}</span>
			<span class="calc-result-value primary">{fmt(result.dp, 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.taupunktUi.absHumidity')}</span>
			<span class="calc-result-value">{fmt(result.x, 2)}<span class="calc-result-unit">g/kg</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.taupunktUi.tempSpread')}</span>
			<span class="calc-result-value">{fmt(result.spread, 1)}<span class="calc-result-unit">K</span></span>
		</div>
	</div>

	{#if result.spread < 3}
		<div class="calc-warning">
			⚠ {$_('rechner.taupunktUi.warnCondensation', { values: { t: fmt(result.dp + 3, 1) } })}
		</div>
	{/if}

	<p class="calc-info">{$_('rechner.taupunktUi.formulaNote')}</p>
</div>
