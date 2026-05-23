<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import { psychroState, type PsychroMode } from '$lib/rechner/psychrometrie';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	let mode: PsychroMode = $state('t-rh');
	let temperature = $state(22); // °C
	let rh = $state(50); // %
	let x = $state(8.2); // g/kg
	let tdp = $state(11.1); // °C
	let h = $state(43); // kJ/kg
	let pressure = $state(101325); // Pa

	const result = $derived(psychroState({ mode, t: temperature, rh, x, tdp, h, pressure }));
	const saturated = $derived(result.rh > 100);
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
			<h1 class="calc-title">{$_('rechner.psychrometrie.name')}</h1>
			<FavButton
				type="rechner"
				slug="psychrometrie"
				title={$_('rechner.psychrometrie.name')}
				size={20}
			/>
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.psychrometrieUi.stateDef')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel"
				>{$_('rechner.psychrometrieUi.inputVars')}</label
			>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="t-rh">{$_('rechner.psychrometrieUi.tRelHumidity')}</option>
				<option value="t-x">{$_('rechner.psychrometrieUi.tAbsHumidity')}</option>
				<option value="t-tdp">{$_('rechner.psychrometrieUi.tDewpoint')}</option>
				<option value="t-h">{$_('rechner.psychrometrieUi.tEnthalpy')}</option>
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="t-in">{$_('rechner.psychrometrieUi.airTemp')}</label>
			<div class="calc-input-wrap">
				<input id="t-in" type="number" step="0.5" bind:value={temperature} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		{#if mode === 't-rh'}
			<div class="calc-field">
				<label class="calc-field-label" for="rh-in"
					>{$_('rechner.psychrometrieUi.relHumidity')}</label
				>
				<div class="calc-input-wrap">
					<input
						id="rh-in"
						type="number"
						step="1"
						min="0"
						max="100"
						bind:value={rh}
						class="calc-input"
					/>
					<span class="calc-input-unit">%</span>
				</div>
			</div>
		{/if}
		{#if mode === 't-x'}
			<div class="calc-field">
				<label class="calc-field-label" for="x-in"
					>{$_('rechner.psychrometrieUi.absHumidity')}</label
				>
				<div class="calc-input-wrap">
					<input id="x-in" type="number" step="0.1" min="0" bind:value={x} class="calc-input" />
					<span class="calc-input-unit">g/kg</span>
				</div>
			</div>
		{/if}
		{#if mode === 't-tdp'}
			<div class="calc-field">
				<label class="calc-field-label" for="tdp-in">{$_('rechner.psychrometrieUi.dewpoint')}</label
				>
				<div class="calc-input-wrap">
					<input id="tdp-in" type="number" step="0.5" bind:value={tdp} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
		{/if}
		{#if mode === 't-h'}
			<div class="calc-field">
				<label class="calc-field-label" for="h-in">{$_('rechner.psychrometrieUi.enthalpy')}</label>
				<div class="calc-input-wrap">
					<input id="h-in" type="number" step="1" bind:value={h} class="calc-input" />
					<span class="calc-input-unit">kJ/kg</span>
				</div>
			</div>
		{/if}
		<div class="calc-field">
			<label class="calc-field-label" for="p-in">
				{$_('rechner.psychrometrieUi.pressure')}
				<span class="calc-field-hint">{$_('rechner.psychrometrieUi.stdPressure')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="p-in" type="number" step="100" bind:value={pressure} class="calc-input" />
				<span class="calc-input-unit">Pa</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.tempT')}</span>
			<span class="calc-result-value"
				>{fmt(result.t, 1)}<span class="calc-result-unit">°C</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.relHumPhi')}</span>
			<span class="calc-result-value"
				>{fmt(result.rh, 1)}<span class="calc-result-unit">%</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.absHumX')}</span>
			<span class="calc-result-value"
				>{fmt(result.x, 2)}<span class="calc-result-unit">g/kg</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.specificEnthalpy')}</span>
			<span class="calc-result-value primary"
				>{fmt(result.h, 1)}<span class="calc-result-unit">kJ/kg</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.dewpointTd')}</span>
			<span class="calc-result-value"
				>{fmt(result.tdp, 1)}<span class="calc-result-unit">°C</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.wetBulb')}</span>
			<span class="calc-result-value"
				>{fmt(result.tWb, 1)}<span class="calc-result-unit">°C</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.satPressure')}</span>
			<span class="calc-result-value"
				>{fmt(result.pSat, 0)}<span class="calc-result-unit">Pa</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.partialPressure')}</span>
			<span class="calc-result-value"
				>{fmt(result.pw, 0)}<span class="calc-result-unit">Pa</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.density')}</span>
			<span class="calc-result-value"
				>{fmt(result.rho, 3)}<span class="calc-result-unit">kg/m³</span></span
			>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.psychrometrieUi.specVolume')}</span>
			<span class="calc-result-value"
				>{fmt(result.v, 3)}<span class="calc-result-unit">m³/kg</span></span
			>
		</div>
	</div>

	{#if saturated}
		<div class="calc-warning">
			⚠ {$_('rechner.psychrometrieUi.warnSaturated')}
		</div>
	{/if}

	<p class="calc-info">{$_('rechner.psychrometrieUi.formulaNote')}</p>
</div>
