<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import { pressureLoss, pipes, mediaProps, type DN, type Medium } from '$lib/rechner/druckverlust';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	const mediaLabelKey: Record<Medium, string> = {
		wasser: 'rechner.druckverlustUi.mediumWater',
		sole30: 'rechner.druckverlustUi.mediumBrine'
	};

	let flow = $state(1.0); // m³/h
	let length = $state(20); // m (Rohrlänge gesamt Vor- + Rücklauf)
	let dn = $state<DN>('DN20');
	let zetaSum = $state(15); // Σζ Einzelwiderstände
	let medium = $state<Medium>('wasser');

	const result = $derived.by(() =>
		pressureLoss({
			flow,
			length,
			di: pipes[dn].di,
			zetaSum,
			rho: mediaProps[medium].rho,
			nu: mediaProps[medium].nu
		})
	);

	const vTooHigh = $derived(result.v > 1.5);
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
			<h1 class="calc-title">{$_('rechner.druckverlust.name')}</h1>
			<FavButton
				type="rechner"
				slug="druckverlust"
				title={$_('rechner.druckverlust.name')}
				size={20}
			/>
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.druckverlustUi.flow')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="flow-in">{$_('rechner.druckverlustUi.volumeFlow')}</label
			>
			<div class="calc-input-wrap">
				<input id="flow-in" type="number" step="0.1" min="0" bind:value={flow} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="med-sel">{$_('rechner.ui.medium')}</label>
			<select id="med-sel" bind:value={medium} class="calc-select">
				{#each Object.entries(mediaProps) as [k] (k)}
					<option value={k}>{$_(mediaLabelKey[k as Medium])}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.druckverlustUi.pipework')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="dn-sel">{$_('rechner.druckverlustUi.nominalSize')}</label
			>
			<select id="dn-sel" bind:value={dn} class="calc-select">
				{#each Object.entries(pipes) as [k, v] (k)}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="l-in">
				{$_('rechner.druckverlustUi.pipeLength')}
				<span class="calc-field-hint">{$_('rechner.druckverlustUi.pipeLengthHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="l-in" type="number" step="1" min="0" bind:value={length} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="z-in">
				{$_('rechner.druckverlustUi.localLosses')}
				<span class="calc-field-hint">{$_('rechner.druckverlustUi.localLossesHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="z-in" type="number" step="1" min="0" bind:value={zetaSum} class="calc-input" />
				<span class="calc-input-unit">—</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.totalDp')}</span>
			<span class="calc-result-value primary"
				>{fmt(result.dpTotal / 100, 1)}<span class="calc-result-unit">mbar</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.frictionDp')}</span>
			<span class="calc-result-value"
				>{fmt(result.dpL / 100, 1)}<span class="calc-result-unit">mbar</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.localDp')}</span>
			<span class="calc-result-value"
				>{fmt(result.dpZ / 100, 1)}<span class="calc-result-unit">mbar</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.velocity')}</span>
			<span class="calc-result-value"
				>{fmt(result.v, 2)}<span class="calc-result-unit">m/s</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.pressureGradient')}</span>
			<span class="calc-result-value"
				>{fmt(result.R, 0)}<span class="calc-result-unit">Pa/m</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.druckverlustUi.reynolds')}</span>
			<span class="calc-result-value">{fmt(result.Re, 0)}</span>
		</div>
	</div>

	{#if vTooHigh}
		<div class="calc-warning">
			⚠ {$_('rechner.druckverlustUi.warnHighVelocity', { values: { v: fmt(result.v, 2) } })}
		</div>
	{/if}
	{#if result.v < 0.2 && flow > 0}
		<div class="calc-warning">
			⚠ {$_('rechner.druckverlustUi.warnLowVelocity')}
		</div>
	{/if}

	<p class="calc-info">{$_('rechner.druckverlustUi.formulaNote')}</p>
</div>
