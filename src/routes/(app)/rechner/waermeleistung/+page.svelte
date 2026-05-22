<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	type Mode = 'q-from-flow' | 'flow-from-q' | 'dt-from-q';
	type Medium = 'wasser' | 'sole30' | 'sole40' | 'luft';

	const mediaPropsBase: Record<
		Medium,
		{ labelKey: string; noteKey: string; cp: number; rho: number }
	> = {
		wasser: {
			labelKey: 'rechner.waermeleistungUi.water',
			noteKey: 'rechner.waermeleistungUi.waterNote',
			cp: 4.182,
			rho: 1000
		},
		sole30: {
			labelKey: 'rechner.waermeleistungUi.brine30',
			noteKey: 'rechner.waermeleistungUi.brine30Note',
			cp: 3.78,
			rho: 1050
		},
		sole40: {
			labelKey: 'rechner.waermeleistungUi.brine40',
			noteKey: 'rechner.waermeleistungUi.brine40Note',
			cp: 3.6,
			rho: 1065
		},
		luft: {
			labelKey: 'rechner.waermeleistungUi.air',
			noteKey: 'rechner.waermeleistungUi.airNote',
			cp: 1.006,
			rho: 1.2
		}
	};
	const mediaProps = $derived(
		Object.fromEntries(
			Object.entries(mediaPropsBase).map(([k, v]) => [
				k,
				{ ...v, label: $_(v.labelKey), note: $_(v.noteKey) }
			])
		) as unknown as Record<Medium, { label: string; note: string; cp: number; rho: number }>
	);

	let mode: Mode = $state('q-from-flow');
	let medium: Medium = $state('wasser');
	let flow = $state(1.0); // m³/h
	let dt = $state(10); // K
	let q = $state(11.6); // kW (for inverse modes)

	const props = $derived(mediaProps[medium]);

	const result = $derived.by(() => {
		// Q [kW] = (V̇ [m³/s] × ρ [kg/m³]) × cp [kJ/(kg·K)] × ΔT [K]
		// V̇ [m³/s] = V̇ [m³/h] / 3600
		const mDot = (flow / 3600) * props.rho; // kg/s
		if (mode === 'q-from-flow') {
			const Q = mDot * props.cp * dt;
			return { Q, flow, dt, mDot };
		}
		if (mode === 'flow-from-q') {
			// flow = Q / (ρ × cp × ΔT) × 3600
			const flowCalc = (q / (props.rho * props.cp * dt)) * 3600;
			const mDotCalc = (flowCalc / 3600) * props.rho;
			return { Q: q, flow: flowCalc, dt, mDot: mDotCalc };
		}
		// dt-from-q
		const dtCalc = q / (mDot * props.cp);
		return { Q: q, flow, dt: dtCalc, mDot };
	});
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
			<h1 class="calc-title">{$_('rechner.waermeleistung.name')}</h1>
			<FavButton
				type="rechner"
				slug="waermeleistung"
				title={$_('rechner.waermeleistung.name')}
				size={20}
			/>
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ui.mode')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel"
				>{$_('rechner.waermeleistungUi.calcMode')}</label
			>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="q-from-flow">{$_('rechner.waermeleistungUi.calcQfromVT')}</option>
				<option value="flow-from-q">{$_('rechner.waermeleistungUi.calcVfromQT')}</option>
				<option value="dt-from-q">{$_('rechner.waermeleistungUi.calcTfromQV')}</option>
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="med-sel">
				{$_('rechner.ui.medium')}
				<span class="calc-field-hint">{props.note}</span>
			</label>
			<select id="med-sel" bind:value={medium} class="calc-select">
				{#each Object.entries(mediaProps) as [k, v] (k)}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ui.input')}</h2>
		{#if mode !== 'flow-from-q'}
			<div class="calc-field">
				<label class="calc-field-label" for="flow-in"
					>{$_('rechner.waermeleistungUi.volumeFlow')}</label
				>
				<div class="calc-input-wrap">
					<input id="flow-in" type="number" step="0.1" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'dt-from-q'}
			<div class="calc-field">
				<label class="calc-field-label" for="dt-in">{$_('rechner.waermeleistungUi.tempDiff')}</label
				>
				<div class="calc-input-wrap">
					<input id="dt-in" type="number" step="0.5" bind:value={dt} class="calc-input" />
					<span class="calc-input-unit">K</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'q-from-flow'}
			<div class="calc-field">
				<label class="calc-field-label" for="q-in">{$_('rechner.waermeleistungUi.power')}</label>
				<div class="calc-input-wrap">
					<input id="q-in" type="number" step="0.1" bind:value={q} class="calc-input" />
					<span class="calc-input-unit">kW</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermeleistungUi.power')}</span>
			<span class="calc-result-value" class:primary={mode === 'q-from-flow'}>
				{fmt(result.Q, 2)}<span class="calc-result-unit">kW</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermeleistungUi.volumeFlow')}</span>
			<span class="calc-result-value" class:primary={mode === 'flow-from-q'}>
				{fmt(result.flow, 3)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermeleistungUi.tempDiff')}</span>
			<span class="calc-result-value" class:primary={mode === 'dt-from-q'}>
				{fmt(result.dt, 2)}<span class="calc-result-unit">K</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.waermeleistungUi.massFlow')}</span>
			<span class="calc-result-value"
				>{fmt(result.mDot, 3)}<span class="calc-result-unit">kg/s</span></span
			>
		</div>
	</div>

	<p class="calc-info">
		Formel: Q [kW] = ṁ [kg/s] × cp [kJ/(kg·K)] × ΔT [K] &nbsp;&nbsp; mit &nbsp; ṁ = V̇ × ρ
	</p>
</div>
