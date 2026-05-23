<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import { sizeMag, minP0 as calcMinP0 } from '$lib/rechner/ausdehnungsgefaess';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	let vA = $state(500); // Anlageninhalt [l]
	let tVorlauf = $state(70); // °C (max. Auslegungstemperatur)
	let p0 = $state(1.5); // Vordruck (statisch + 0.3 bar Reserve) [bar]
	let pE = $state(2.5); // Enddruck (Sicherheitsventil − 0.5 bar) [bar]
	let staticHeight = $state(10); // m (Gebäudehöhe statisch)

	const result = $derived(sizeMag({ vA, tVorlauf, p0, pE }));
	const minP0 = $derived(calcMinP0(staticHeight));
	const p0TooLow = $derived(p0 < minP0 - 0.05);
</script>

<div class="calc-page">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M15 18l-6-6 6-6" />
			</svg>
			{$_('common.allCalculators')}
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">{$_('rechner.ausdehnungsgefaess.name')}</h1>
			<FavButton
				type="rechner"
				slug="ausdehnungsgefaess"
				title={$_('rechner.ausdehnungsgefaess.name')}
				size={20}
			/>
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
				<input
					id="tv-in"
					type="number"
					step="5"
					min="30"
					max="110"
					bind:value={tVorlauf}
					class="calc-input"
				/>
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="h-in">
				{$_('rechner.ausdehnungsgefaessUi.staticHeight')}
				<span class="calc-field-hint">{$_('rechner.ausdehnungsgefaessUi.staticHeightHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input
					id="h-in"
					type="number"
					step="0.5"
					min="0"
					bind:value={staticHeight}
					class="calc-input"
				/>
				<span class="calc-input-unit">m</span>
			</div>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ausdehnungsgefaessUi.pressures')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="p0-in">
				{$_('rechner.ausdehnungsgefaessUi.prePressure')}
				<span class="calc-field-hint"
					>{$_('rechner.ausdehnungsgefaessUi.prePressureHint', {
						values: { p: fmt(minP0, 2) }
					})}</span
				>
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
			<span class="calc-result-value primary"
				>{result.recommended}<span class="calc-result-unit">l</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.nominalVolume')}</span>
			<span class="calc-result-value"
				>{fmt(result.vN, 1)}<span class="calc-result-unit">l</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.expansionVolume')}</span>
			<span class="calc-result-value"
				>{fmt(result.ve, 1)}<span class="calc-result-unit">l</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.waterReserve')}</span>
			<span class="calc-result-value"
				>{fmt(result.vWv, 1)}<span class="calc-result-unit">l</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.expansionCoeff')}</span>
			<span class="calc-result-value"
				>{fmt(result.ePct, 2)}<span class="calc-result-unit">%</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.ausdehnungsgefaessUi.pressureFactor')}</span>
			<span class="calc-result-value">{fmt(result.druckfaktor, 2)}</span>
		</div>
	</div>

	{#if p0TooLow}
		<div class="calc-warning">
			⚠ {$_('rechner.ausdehnungsgefaessUi.warnPrePressureDetail', {
				values: { p0, min: fmt(minP0, 2), h: staticHeight }
			})}
		</div>
	{/if}
	{#if pE - p0 < 0.5}
		<div class="calc-warning">
			⚠ {$_('rechner.ausdehnungsgefaessUi.warnSpreadDetail', {
				values: { spread: fmt(pE - p0, 2) }
			})}
		</div>
	{/if}

	<p class="calc-info">{$_('rechner.ausdehnungsgefaessUi.formulaNote')}</p>
</div>
