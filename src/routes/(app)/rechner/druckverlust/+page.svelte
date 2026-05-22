<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Inputs
	let flow = $state(1.0); // m³/h
	let length = $state(20); // m (Rohrlänge gesamt Vor- + Rücklauf)
	let dn = $state<'DN15' | 'DN20' | 'DN25' | 'DN32' | 'DN40' | 'DN50'>('DN20');
	let zetaSum = $state(15); // Σζ Einzelwiderstände
	let medium = $state<'wasser' | 'sole30'>('wasser');

	// Innendurchmesser + Rauhigkeit
	const pipes: Record<string, { di: number; label: string }> = {
		DN15: { di: 16, label: 'DN 15 (Innen-Ø 16 mm)' },
		DN20: { di: 21.6, label: 'DN 20 (21.6 mm)' },
		DN25: { di: 27.2, label: 'DN 25 (27.2 mm)' },
		DN32: { di: 35.9, label: 'DN 32 (35.9 mm)' },
		DN40: { di: 41.8, label: 'DN 40 (41.8 mm)' },
		DN50: { di: 53, label: 'DN 50 (53 mm)' }
	};

	const mediaProps: Record<string, { rho: number; nu: number; labelKey: string }> = {
		wasser: { rho: 998, nu: 1.0e-6, labelKey: 'rechner.druckverlustUi.mediumWater' },
		sole30: { rho: 1050, nu: 3.5e-6, labelKey: 'rechner.druckverlustUi.mediumBrine' }
	};

	const result = $derived.by(() => {
		const { di } = pipes[dn];
		const { rho, nu } = mediaProps[medium];
		const k = 0.045e-3; // Rauhigkeit Stahl (m)

		const A = (Math.PI * Math.pow(di / 1000, 2)) / 4; // m²
		const v = flow / 3600 / A; // m/s
		const Re = (v * (di / 1000)) / nu;

		// Colebrook-White, approximation by Swamee-Jain
		const term = k / (3.7 * (di / 1000)) + 5.74 / Math.pow(Re, 0.9);
		const lambda =
			Re < 2300
				? 64 / Re // laminar
				: 0.25 / Math.pow(Math.log10(term), 2);

		// Druckverlust pro m: R [Pa/m] = λ × (1/d) × (ρ × v²)/2
		const R = (lambda / (di / 1000)) * ((rho * v * v) / 2);
		const dpL = R * length; // Pa (Reibung)
		const dpZ = zetaSum * ((rho * v * v) / 2); // Pa (Einzelwid.)
		const dpTotal = dpL + dpZ;

		return { v, Re, lambda, R, dpL, dpZ, dpTotal };
	});

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
				{#each Object.entries(mediaProps) as [k, v] (k)}
					<option value={k}>{$_(v.labelKey)}</option>
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
