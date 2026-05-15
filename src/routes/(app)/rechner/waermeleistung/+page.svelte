<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	type Mode = 'q-from-flow' | 'flow-from-q' | 'dt-from-q';
	type Medium = 'wasser' | 'sole30' | 'sole40' | 'luft';

	const mediaProps: Record<Medium, { label: string; cp: number; rho: number; note: string }> = {
		wasser: { label: 'Wasser', cp: 4.182, rho: 1000, note: 'cp = 4.182 kJ/(kg·K), ρ = 1000 kg/m³' },
		sole30: { label: 'Sole 30 % Glykol', cp: 3.78, rho: 1050, note: 'Ethylenglykol 30 %, Mittelwert' },
		sole40: { label: 'Sole 40 % Glykol', cp: 3.6, rho: 1065, note: 'Ethylenglykol 40 %, Mittelwert' },
		luft: { label: 'Luft', cp: 1.006, rho: 1.2, note: 'bei 20 °C, 1 bar' }
	};

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
			const flowCalc = q / (props.rho * props.cp * dt) * 3600;
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
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Alle Rechner
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">Wärmeleistung</h1>
			<FavButton type="rechner" slug="waermeleistung" title="Wärmeleistung" size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Modus</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel">Berechnen</label>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="q-from-flow">Leistung Q aus V̇ + ΔT</option>
				<option value="flow-from-q">Volumenstrom aus Q + ΔT</option>
				<option value="dt-from-q">ΔT aus Q + V̇</option>
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="med-sel">
				Medium
				<span class="calc-field-hint">{props.note}</span>
			</label>
			<select id="med-sel" bind:value={medium} class="calc-select">
				{#each Object.entries(mediaProps) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">Eingabe</h2>
		{#if mode !== 'flow-from-q'}
			<div class="calc-field">
				<label class="calc-field-label" for="flow-in">Volumenstrom V̇</label>
				<div class="calc-input-wrap">
					<input id="flow-in" type="number" step="0.1" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'dt-from-q'}
			<div class="calc-field">
				<label class="calc-field-label" for="dt-in">Temperaturdifferenz ΔT</label>
				<div class="calc-input-wrap">
					<input id="dt-in" type="number" step="0.5" bind:value={dt} class="calc-input" />
					<span class="calc-input-unit">K</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'q-from-flow'}
			<div class="calc-field">
				<label class="calc-field-label" for="q-in">Wärmeleistung Q</label>
				<div class="calc-input-wrap">
					<input id="q-in" type="number" step="0.1" bind:value={q} class="calc-input" />
					<span class="calc-input-unit">kW</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Leistung Q</span>
			<span class="calc-result-value" class:primary={mode === 'q-from-flow'}>
				{fmt(result.Q, 2)}<span class="calc-result-unit">kW</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Volumenstrom V̇</span>
			<span class="calc-result-value" class:primary={mode === 'flow-from-q'}>
				{fmt(result.flow, 3)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Temperaturdifferenz ΔT</span>
			<span class="calc-result-value" class:primary={mode === 'dt-from-q'}>
				{fmt(result.dt, 2)}<span class="calc-result-unit">K</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Massenstrom ṁ</span>
			<span class="calc-result-value">{fmt(result.mDot, 3)}<span class="calc-result-unit">kg/s</span></span>
		</div>
	</div>

	<p class="calc-info">
		Formel: Q [kW] = ṁ [kg/s] × cp [kJ/(kg·K)] × ΔT [K] &nbsp;&nbsp; mit &nbsp; ṁ = V̇ × ρ
	</p>
</div>
