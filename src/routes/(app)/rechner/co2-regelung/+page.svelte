<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	type Mode = 'auslegung' | 'raumverhalten';
	let mode: Mode = $state('auslegung');

	// Shared inputs
	let volume = $state(75);       // m³
	let persons = $state(10);
	let activity = $state<'rest' | 'office' | 'physical'>('office');
	let co2Outside = $state(420);  // ppm

	// Mode 1: Auslegung
	let co2Target = $state(1000);  // ppm

	// Mode 2: Raumverhalten
	let flowRate = $state(300);    // m³/h

	const activityCO2: Record<string, { lph: number; label: string }> = {
		rest:     { lph: 12, label: 'Ruhend / Schlafen' },
		office:   { lph: 18, label: 'Büro / leichte Tätigkeit' },
		physical: { lph: 35, label: 'Körperliche Arbeit' }
	};

	const co2Presets = [
		{ label: 'Kat. I — sehr gut (EN 16798)', ppm: co2Outside + 350 },
		{ label: 'Kat. II — gut (EN 16798)',     ppm: co2Outside + 500 },
		{ label: 'Kat. III — moderat',            ppm: co2Outside + 800 },
		{ label: 'Pettenkofer-Grenz­wert',        ppm: 1000 },
		{ label: 'Kritisch (Schläfrigkeit)',       ppm: 2000 }
	];

	// Reaktive Zielwert-Presets bei Änderung von co2Outside
	$effect(() => {
		// keep presets current (they reference co2Outside)
		co2Presets[0].ppm = co2Outside + 350;
		co2Presets[1].ppm = co2Outside + 500;
		co2Presets[2].ppm = co2Outside + 800;
	});

	const result = $derived.by(() => {
		const g = activityCO2[activity].lph * persons; // l/h total CO₂ production
		const gM3 = g / 1000;                          // m³/h CO₂

		if (mode === 'auslegung') {
			if (co2Target <= co2Outside) return null;
			// q = G / (c_ziel - c_aussen)
			const q = (gM3 * 1e6) / (co2Target - co2Outside); // m³/h
			const ach = q / volume;
			const tau = volume / q; // h
			const steadyState = co2Outside + (gM3 * 1e6) / q;
			return { q, ach, tau: tau * 60, steadyState, t90: tau * 60 * 2.3 };
		} else {
			if (flowRate <= 0) return null;
			// Steady-state: c = c_aussen + G/q * 1e6
			const steadyState = co2Outside + (gM3 * 1e6) / flowRate;
			const tau = (volume / flowRate) * 60; // min
			const t90 = tau * 2.3;
			const ach = flowRate / volume;
			return { q: flowRate, ach, tau, steadyState, t90 };
		}
	});

	// CO₂-Kurve für Raumverhalten (6 Punkte, Start = co2Outside)
	const curve = $derived.by(() => {
		if (!result) return [];
		const tau = result.tau; // min
		const ss = result.steadyState;
		const start = co2Outside;
		const points = [0, 0.5, 1, 1.5, 2, 2.5, 3].map(t => ({
			t: Math.round(t * tau),
			co2: Math.round(ss - (ss - start) * Math.exp(-t))
		}));
		return points;
	});

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
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Alle Rechner
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">CO₂-Regelung</h1>
			<FavButton type="rechner" slug="co2-regelung" title="CO₂-Regelung" size={20} />
		</div>
	</header>

	<!-- Mode Switch -->
	<div class="mode-tabs">
		<button class="mode-tab" class:active={mode === 'auslegung'} onclick={() => mode = 'auslegung'}>
			Auslegung
		</button>
		<button class="mode-tab" class:active={mode === 'raumverhalten'} onclick={() => mode = 'raumverhalten'}>
			Raumverhalten
		</button>
	</div>

	<!-- Shared: Raum + Personen -->
	<div class="calc-section">
		<h2 class="calc-section-title">Raum & Belegung</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="vol-in">Raumvolumen</label>
			<div class="calc-input-wrap">
				<input id="vol-in" type="number" step="5" min="5" bind:value={volume} class="calc-input" />
				<span class="calc-input-unit">m³</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="pers-in">Personenanzahl</label>
			<div class="calc-input-wrap">
				<input id="pers-in" type="number" step="1" min="0" bind:value={persons} class="calc-input" />
				<span class="calc-input-unit">Pers.</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="act-sel">Aktivitätsniveau</label>
			<select id="act-sel" bind:value={activity} class="calc-select">
				{#each Object.entries(activityCO2) as [k, v]}
					<option value={k}>{v.label} — {v.lph} l/h·P</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="co2out-in">CO₂ Aussenluft</label>
			<div class="calc-input-wrap">
				<input id="co2out-in" type="number" step="10" min="380" max="600" bind:value={co2Outside} class="calc-input" />
				<span class="calc-input-unit">ppm</span>
			</div>
		</div>
	</div>

	<!-- Mode 1: Auslegung -->
	{#if mode === 'auslegung'}
	<div class="calc-section">
		<h2 class="calc-section-title">CO₂-Zielwert</h2>
		<div class="preset-grid">
			{#each co2Presets as p}
				<button
					class="preset-btn"
					class:active={co2Target === p.ppm}
					onclick={() => co2Target = p.ppm}
				>{p.label}<br/><span class="preset-ppm">{p.ppm} ppm</span></button>
			{/each}
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="co2t-in">Oder manuell</label>
			<div class="calc-input-wrap">
				<input id="co2t-in" type="number" step="50" min="450" max="5000" bind:value={co2Target} class="calc-input" />
				<span class="calc-input-unit">ppm</span>
			</div>
		</div>
	</div>

	{#if result}
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Mindest-Volumenstrom</span>
			<span class="calc-result-value primary">{fmt(result.q, 0)}<span class="calc-result-unit">m³/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Luftwechsel</span>
			<span class="calc-result-value">{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Zeitkonstante τ</span>
			<span class="calc-result-value">{fmt(result.tau, 0)}<span class="calc-result-unit">min</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Zeit bis 90 % der Änderung (2.3 × τ)</span>
			<span class="calc-result-value">{fmt(result.t90, 0)}<span class="calc-result-unit">min</span></span>
		</div>
	</div>
	<p class="calc-info">
		q = G / (c<sub>Ziel</sub> − c<sub>Aussen</sub>) · 10⁶ — massgebend für DDC-Auslegung bei Vollbelegung.
		Zeitkonstante τ = V / q gibt die Trägheit des Raumes an (relevant für PID-Parametrierung).
	</p>
	{/if}
	{/if}

	<!-- Mode 2: Raumverhalten -->
	{#if mode === 'raumverhalten'}
	<div class="calc-section">
		<h2 class="calc-section-title">Lüftungsanlage</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="flow-in">Volumenstrom</label>
			<div class="calc-input-wrap">
				<input id="flow-in" type="number" step="50" min="10" bind:value={flowRate} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
	</div>

	{#if result}
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Steady-State CO₂ (Vollbelegung)</span>
			<span class="calc-result-value primary" style="color: {co2Color(result.steadyState)}">
				{fmt(result.steadyState, 0)}<span class="calc-result-unit">ppm</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Zeitkonstante τ</span>
			<span class="calc-result-value">{fmt(result.tau, 0)}<span class="calc-result-unit">min</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Zeit bis 90 % der Änderung (2.3 × τ)</span>
			<span class="calc-result-value">{fmt(result.t90, 0)}<span class="calc-result-unit">min</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Luftwechsel</span>
			<span class="calc-result-value">{fmt(result.ach, 2)}<span class="calc-result-unit">1/h</span></span>
		</div>
	</div>

	<!-- CO₂-Verlauf Tabelle -->
	<div class="calc-section">
		<h2 class="calc-section-title">CO₂-Verlauf (Anstieg bei Vollbelegung, Start = {co2Outside} ppm)</h2>
		<div class="curve-table">
			{#each curve as pt}
				<div class="curve-row">
					<span class="curve-t">{pt.t} min</span>
					<div class="curve-bar-wrap">
						<div
							class="curve-bar"
							style="width: {Math.min(100, ((pt.co2 - co2Outside) / (result.steadyState - co2Outside + 1)) * 100)}%; background: {co2Color(pt.co2)}"
						></div>
					</div>
					<span class="curve-val" style="color: {co2Color(pt.co2)}">{pt.co2} ppm</span>
				</div>
			{/each}
		</div>
	</div>

	<p class="calc-info">
		c(t) = c<sub>SS</sub> − (c<sub>SS</sub> − c<sub>0</sub>) · e<sup>−t/τ</sup> — Anstieg bei konstanter Belegung und konstantem Volumenstrom.
		Für die PID-Parametrierung: Regelstrecke hat Zeitkonstante τ und kein integrierendes Verhalten (PT1-Strecke).
	</p>
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
		transition: background 0.15s, color 0.15s;
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
		transition: border-color 0.15s, color 0.15s;
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
</style>
