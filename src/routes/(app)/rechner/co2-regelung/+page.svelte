<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import {
		co2Design,
		co2RoomBehavior,
		co2Curve,
		ACTIVITY_CO2_LPH,
		type Co2Activity
	} from '$lib/rechner/co2Regelung';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	type Mode = 'auslegung' | 'raumverhalten';
	let mode: Mode = $state('auslegung');

	let volume = $state(75); // m³
	let persons = $state(10);
	let activity = $state<Co2Activity>('office');
	let co2Outside = $state(420); // ppm

	let co2Target = $state(1000); // ppm
	let flowRate = $state(300); // m³/h

	const activityCO2Base: Record<Co2Activity, { lph: number; labelKey: string }> = {
		rest: { lph: ACTIVITY_CO2_LPH.rest, labelKey: 'rechner.co2RegelungUi.actRest' },
		office: { lph: ACTIVITY_CO2_LPH.office, labelKey: 'rechner.co2RegelungUi.actOffice' },
		physical: { lph: ACTIVITY_CO2_LPH.physical, labelKey: 'rechner.co2RegelungUi.actPhysical' }
	};
	const activityCO2 = $derived(
		Object.fromEntries(
			Object.entries(activityCO2Base).map(([k, v]) => [k, { ...v, label: $_(v.labelKey) }])
		) as unknown as Record<Co2Activity, { lph: number; label: string }>
	);

	const co2PresetKeys = [
		{ labelKey: 'rechner.co2RegelungUi.presetCat1', ppmFn: () => co2Outside + 350 },
		{ labelKey: 'rechner.co2RegelungUi.presetCat2', ppmFn: () => co2Outside + 500 },
		{ labelKey: 'rechner.co2RegelungUi.presetCat3', ppmFn: () => co2Outside + 800 },
		{ labelKey: 'rechner.co2RegelungUi.presetPettenkofer', ppmFn: () => 1000 },
		{ labelKey: 'rechner.co2RegelungUi.presetCritical', ppmFn: () => 2000 }
	];
	const co2Presets = $derived(
		co2PresetKeys.map((p) => ({ label: $_(p.labelKey), ppm: p.ppmFn() }))
	);

	const result = $derived(
		mode === 'auslegung'
			? co2Design({ volume, persons, activity, co2Outside, co2Target })
			: co2RoomBehavior({ volume, persons, activity, co2Outside, flowRate })
	);

	const curve = $derived(result ? co2Curve(co2Outside, result.steadyState, result.tau) : []);

	function co2Color(ppm: number): string {
		if (ppm < 800) return '#16a34a';
		if (ppm < 1000) return '#ca8a04';
		if (ppm < 1500) return '#ea580c';
		return '#dc2626';
	}
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
			<h1 class="calc-title">{$_('rechner.co2Regelung.name')}</h1>
			<FavButton
				type="rechner"
				slug="co2-regelung"
				title={$_('rechner.co2Regelung.name')}
				size={20}
			/>
		</div>
	</header>

	<!-- Mode Switch -->
	<div class="mode-tabs">
		<button
			class="mode-tab"
			class:active={mode === 'auslegung'}
			onclick={() => (mode = 'auslegung')}
		>
			{$_('rechner.co2RegelungUi.modeAuslegung')}
		</button>
		<button
			class="mode-tab"
			class:active={mode === 'raumverhalten'}
			onclick={() => (mode = 'raumverhalten')}
		>
			{$_('rechner.co2RegelungUi.modeRaumverhalten')}
		</button>
	</div>

	<!-- Shared: Raum + Personen -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.co2RegelungUi.roomOccupancy')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="vol-in">{$_('rechner.co2RegelungUi.roomVolume')}</label>
			<div class="calc-input-wrap">
				<input id="vol-in" type="number" step="5" min="5" bind:value={volume} class="calc-input" />
				<span class="calc-input-unit">m³</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="pers-in">{$_('rechner.co2RegelungUi.occupants')}</label>
			<div class="calc-input-wrap">
				<input
					id="pers-in"
					type="number"
					step="1"
					min="0"
					bind:value={persons}
					class="calc-input"
				/>
				<span class="calc-input-unit">{$_('rechner.co2RegelungUi.persons')}</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="act-sel"
				>{$_('rechner.co2RegelungUi.activityLevel')}</label
			>
			<select id="act-sel" bind:value={activity} class="calc-select">
				{#each Object.entries(activityCO2) as [k, v] (k)}
					<option value={k}>{v.label} — {v.lph} l/h·P</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="co2out-in"
				>{$_('rechner.co2RegelungUi.co2Outside')}</label
			>
			<div class="calc-input-wrap">
				<input
					id="co2out-in"
					type="number"
					step="10"
					min="380"
					max="600"
					bind:value={co2Outside}
					class="calc-input"
				/>
				<span class="calc-input-unit">ppm</span>
			</div>
		</div>
	</div>

	<!-- Mode 1: Auslegung -->
	{#if mode === 'auslegung'}
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.co2RegelungUi.co2Target')}</h2>
			<div class="preset-grid">
				{#each co2Presets as p (p)}
					<button
						class="preset-btn"
						class:active={co2Target === p.ppm}
						onclick={() => (co2Target = p.ppm)}
						>{p.label}<br /><span class="preset-ppm">{p.ppm} ppm</span></button
					>
				{/each}
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="co2t-in">{$_('rechner.co2RegelungUi.orManual')}</label>
				<div class="calc-input-wrap">
					<input
						id="co2t-in"
						type="number"
						step="50"
						min="450"
						max="5000"
						bind:value={co2Target}
						class="calc-input"
					/>
					<span class="calc-input-unit">ppm</span>
				</div>
			</div>
		</div>

		{#if result}
			<div class="calc-result-section">
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.minFlow')}</span>
					<span class="calc-result-value primary"
						>{fmt(result.q, 0)}<span class="calc-result-unit">m³/h</span></span
					>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.airChange')}</span>
					<span class="calc-result-value"
						>{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span
					>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.timeConstant')}</span>
					<span class="calc-result-value"
						>{fmt(result.tau, 0)}<span class="calc-result-unit">min</span></span
					>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.time90')}</span>
					<span class="calc-result-value"
						>{fmt(result.t90, 0)}<span class="calc-result-unit">min</span></span
					>
				</div>
			</div>
			<p class="calc-info">{$_('rechner.co2RegelungUi.infoAuslegung')}</p>
		{/if}
	{/if}

	<!-- Mode 2: Raumverhalten -->
	{#if mode === 'raumverhalten'}
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.co2RegelungUi.ventilationUnit')}</h2>
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="flow-in"
					>{$_('rechner.co2RegelungUi.volumeFlow')}</label
				>
				<div class="calc-input-wrap">
					<input
						id="flow-in"
						type="number"
						step="50"
						min="10"
						bind:value={flowRate}
						class="calc-input"
					/>
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		</div>

		{#if result}
			<div class="calc-result-section">
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.steadyStateCO2')}</span>
					<span class="calc-result-value primary" style="color: {co2Color(result.steadyState)}">
						{fmt(result.steadyState, 0)}<span class="calc-result-unit">ppm</span>
					</span>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.timeConstant')}</span>
					<span class="calc-result-value"
						>{fmt(result.tau, 0)}<span class="calc-result-unit">min</span></span
					>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.time90')}</span>
					<span class="calc-result-value"
						>{fmt(result.t90, 0)}<span class="calc-result-unit">min</span></span
					>
				</div>
				<div class="calc-result">
					<span class="calc-result-label">{$_('rechner.co2RegelungUi.airChange')}</span>
					<span class="calc-result-value"
						>{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span
					>
				</div>
			</div>

			<!-- CO₂-Verlauf Tabelle -->
			<div class="calc-section">
				<h2 class="calc-section-title">
					{$_('rechner.co2RegelungUi.co2RiseTitle', { values: { co2: co2Outside } })}
				</h2>
				<div class="curve-table">
					{#each curve as pt (pt)}
						<div class="curve-row">
							<span class="curve-t">{pt.t} min</span>
							<div class="curve-bar-wrap">
								<div
									class="curve-bar"
									style="width: {Math.min(
										100,
										((pt.co2 - co2Outside) / (result.steadyState - co2Outside + 1)) * 100
									)}%; background: {co2Color(pt.co2)}"
								></div>
							</div>
							<span class="curve-val" style="color: {co2Color(pt.co2)}">{pt.co2} ppm</span>
						</div>
					{/each}
				</div>
			</div>

			<p class="calc-info">{$_('rechner.co2RegelungUi.infoRaumverhalten')}</p>
		{/if}
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
		transition:
			background 0.15s,
			color 0.15s;
	}

	.mode-tab.active {
		background: var(--color-primary);
		color: #fff;
	}

	.preset-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.4rem;
		margin-bottom: 0.75rem;
	}

	.preset-btn {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.45rem 0.6rem;
		font-family: inherit;
		font-size: 0.75rem;
		color: var(--muted);
		cursor: pointer;
		text-align: left;
		line-height: 1.4;
		transition:
			border-color 0.15s,
			color 0.15s;
	}

	.preset-btn.active {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}

	.preset-ppm {
		font-weight: 700;
		font-size: 0.8125rem;
	}

	/* CO₂ curve */
	.curve-table {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.curve-row {
		display: grid;
		grid-template-columns: 3.5rem 1fr 5rem;
		align-items: center;
		gap: 0.5rem;
	}

	.curve-t {
		font-size: 0.75rem;
		color: var(--muted);
		font-family: ui-monospace, monospace;
		text-align: right;
	}

	.curve-bar-wrap {
		background: var(--bg);
		border-radius: 999px;
		height: 6px;
		overflow: hidden;
	}

	.curve-bar {
		height: 100%;
		border-radius: 999px;
		transition: width 0.3s;
	}

	.curve-val {
		font-size: 0.8125rem;
		font-weight: 600;
		font-family: ui-monospace, monospace;
		text-align: right;
	}

	@media (max-width: 480px) {
		.preset-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
