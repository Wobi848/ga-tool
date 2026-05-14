<script lang="ts">
	import {
		calculateFlowTemp,
		curvePoints,
		manufacturerInfo,
		swissNormOutdoor,
		type Manufacturer,
		type CurveParams
	} from '$lib/rechner/heizkurve';
	import { fmt } from '$lib/rechner/_shared';
	import { untrack } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// Map profile manufacturer pref → controller key
	const mfrMap: Record<string, Manufacturer> = {
		Siemens: 'siemens',
		Viessmann: 'viessmann',
		Buderus: 'buderus',
		Honeywell: 'honeywell',
		Sauter: 'sauter'
	};

	const initialMfr: Manufacturer = (() => {
		for (const m of data.mfrPrefs ?? []) {
			if (mfrMap[m]) return mfrMap[m];
		}
		return 'siemens';
	})();

	let manufacturer: Manufacturer = $state(initialMfr);
	let systemType: 'radiator' | 'floor' = $state('radiator');
	let roomTemp = $state(20);
	let normOutdoor = $state(-8);
	let slope = $state(1.4);
	let level = $state(0);
	let heatLimit = $state(18);
	let maxFlow = $state(70);
	let minFlow = $state(25);

	// Honeywell-specific
	let ta1 = $state(-10);
	let tv1 = $state(60);
	let ta2 = $state(15);
	let tv2 = $state(25);

	// Sauter footpoint
	let footpoint = $state(25);

	// Current outdoor for "live" readout
	let currentTA = $state(0);

	// Swiss city quick-pick — defaults to profile city if set
	let selectedCity = $state(untrack(() => data.defaultCity) ?? 'Zürich');
	$effect(() => {
		const c = swissNormOutdoor.find((s) => s.ort === selectedCity);
		if (c) normOutdoor = c.t;
	});

	const params = $derived<CurveParams>({
		manufacturer,
		systemType,
		roomTemp,
		normOutdoor,
		slope,
		level,
		heatLimit,
		maxFlow,
		minFlow,
		ta1, tv1, ta2, tv2,
		footpoint
	});

	const info = $derived(manufacturerInfo[manufacturer]);

	const currentTV = $derived(calculateFlowTemp(currentTA, params));

	const points = $derived(curvePoints(params, -15, 20, 70));

	// Design TV at norm outdoor
	const tvDesign = $derived(calculateFlowTemp(normOutdoor, params));

	// SVG plot dimensions
	const W = 440;
	const H = 240;
	const padL = 36;
	const padR = 12;
	const padT = 12;
	const padB = 28;
	const plotW = W - padL - padR;
	const plotH = H - padT - padB;

	const xMin = -15;
	const xMax = 20;
	const yMin = 15;
	const yMax = 80;

	function x(ta: number) {
		return padL + ((ta - xMin) / (xMax - xMin)) * plotW;
	}
	function y(tv: number) {
		return padT + plotH - ((tv - yMin) / (yMax - yMin)) * plotH;
	}

	const pathD = $derived(
		points.map(([ta, tv], i) => `${i === 0 ? 'M' : 'L'} ${x(ta).toFixed(1)} ${y(tv).toFixed(1)}`).join(' ')
	);

	const xTicks = [-15, -10, -5, 0, 5, 10, 15, 20];
	const yTicks = [20, 30, 40, 50, 60, 70, 80];
</script>

<div class="calc-page wide">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Alle Rechner
		</a>
		<h1 class="calc-title">Heizkurve</h1>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Hersteller / System</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="man-sel">
				Hersteller
				<span class="calc-field-hint">{info.family}</span>
			</label>
			<select id="man-sel" bind:value={manufacturer} class="calc-select">
				{#each Object.entries(manufacturerInfo) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="sys-sel">Wärmeübergabe</label>
			<select id="sys-sel" bind:value={systemType} class="calc-select">
				<option value="radiator">Radiator (n ≈ 1.3)</option>
				<option value="floor">Fussboden (n ≈ 1.1)</option>
			</select>
		</div>
	</div>

	<!-- Plot -->
	<div class="plot-section">
		<svg viewBox="0 0 {W} {H}" class="plot">
			<!-- grid -->
			{#each xTicks as t}
				<line x1={x(t)} y1={padT} x2={x(t)} y2={padT + plotH} class="grid" />
				<text x={x(t)} y={H - 8} class="tick-label" text-anchor="middle">{t}</text>
			{/each}
			{#each yTicks as t}
				<line x1={padL} y1={y(t)} x2={padL + plotW} y2={y(t)} class="grid" />
				<text x={padL - 6} y={y(t) + 3} class="tick-label" text-anchor="end">{t}</text>
			{/each}

			<!-- axes -->
			<line x1={padL} y1={padT} x2={padL} y2={padT + plotH} class="axis" />
			<line x1={padL} y1={padT + plotH} x2={padL + plotW} y2={padT + plotH} class="axis" />

			<!-- axis labels -->
			<text x={padL + plotW / 2} y={H - 2} class="axis-label" text-anchor="middle">Aussentemperatur [°C]</text>
			<text x={padL - 28} y={padT - 2} class="axis-label">TV [°C]</text>

			<!-- Heizgrenze marker -->
			{#if heatLimit !== undefined && heatLimit >= xMin && heatLimit <= xMax}
				<line x1={x(heatLimit)} y1={padT} x2={x(heatLimit)} y2={padT + plotH} class="limit" />
			{/if}

			<!-- Norm outdoor marker -->
			<line x1={x(normOutdoor)} y1={padT} x2={x(normOutdoor)} y2={padT + plotH} class="norm" />

			<!-- Curve -->
			<path d={pathD} class="curve" />

			<!-- Current point -->
			{#if currentTA >= xMin && currentTA <= xMax}
				<line x1={x(currentTA)} y1={padT} x2={x(currentTA)} y2={padT + plotH} class="current" />
				<circle cx={x(currentTA)} cy={y(currentTV)} r="4" class="current-dot" />
			{/if}
		</svg>
		<div class="plot-legend">
			<span><span class="dot curve-dot"></span> Kennlinie</span>
			<span><span class="dot norm-dot"></span> Norm-Aussentemp</span>
			<span><span class="dot limit-dot"></span> Heizgrenze</span>
			<span><span class="dot current-dot-l"></span> aktuell</span>
		</div>
	</div>

	<!-- Live readout -->
	<div class="calc-section">
		<h2 class="calc-section-title">Live-Abfrage</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="cta-in">Aktuelle Aussentemperatur</label>
			<div class="calc-input-wrap">
				<input id="cta-in" type="number" step="0.5" bind:value={currentTA} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<span class="calc-field-label">→ Vorlauf-Sollwert</span>
			<span class="calc-result-value primary">{fmt(currentTV, 1)}<span class="calc-result-unit">°C</span></span>
		</div>
	</div>

	{#if manufacturer === 'honeywell'}
		<div class="calc-section">
			<h2 class="calc-section-title">Honeywell — 2-Punkte</h2>
			<div class="calc-field">
				<label class="calc-field-label" for="ta1-in">Punkt 1: Aussentemp TA₁</label>
				<div class="calc-input-wrap">
					<input id="ta1-in" type="number" step="1" bind:value={ta1} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="tv1-in">Punkt 1: Vorlauf TV₁</label>
				<div class="calc-input-wrap">
					<input id="tv1-in" type="number" step="1" bind:value={tv1} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="ta2-in">Punkt 2: Aussentemp TA₂</label>
				<div class="calc-input-wrap">
					<input id="ta2-in" type="number" step="1" bind:value={ta2} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="tv2-in">Punkt 2: Vorlauf TV₂</label>
				<div class="calc-input-wrap">
					<input id="tv2-in" type="number" step="1" bind:value={tv2} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
		</div>
	{:else if manufacturer === 'sauter'}
		<div class="calc-section">
			<h2 class="calc-section-title">Sauter — Parameter</h2>
			<div class="calc-field">
				<label class="calc-field-label" for="fp-in">
					Fusspunkt
					<span class="calc-field-hint">TV bei Heizgrenze</span>
				</label>
				<div class="calc-input-wrap">
					<input id="fp-in" type="number" step="1" bind:value={footpoint} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="sl-sauter">Neigung</label>
				<div class="calc-input-wrap">
					<input id="sl-sauter" type="number" step="0.1" min="0.1" max="5" bind:value={slope} class="calc-input" />
					<span class="calc-input-unit">—</span>
				</div>
			</div>
		</div>
	{:else}
		<div class="calc-section">
			<h2 class="calc-section-title">Kurven-Parameter</h2>
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="sl-in">
					{manufacturer === 'buderus' ? 'Steilheit' : 'Neigung'}
					<span class="calc-field-hint">Bereich {info.slopeRange[0]}–{info.slopeRange[1]}</span>
				</label>
				<div class="calc-input-wrap">
					<input
						id="sl-in"
						type="number"
						step={info.slopeStep}
						min={info.slopeRange[0]}
						max={info.slopeRange[1]}
						bind:value={slope}
						class="calc-input"
					/>
					<span class="calc-input-unit">—</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="lvl-in">
					Niveau
					<span class="calc-field-hint">Parallelverschiebung ± K</span>
				</label>
				<div class="calc-input-wrap">
					<input id="lvl-in" type="number" step="0.5" min="-15" max="15" bind:value={level} class="calc-input" />
					<span class="calc-input-unit">K</span>
				</div>
			</div>
		</div>
	{/if}

	<div class="calc-section">
		<h2 class="calc-section-title">Standort + Anlage</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="city-sel">Ort (CH)</label>
			<select id="city-sel" bind:value={selectedCity} class="calc-select">
				{#each swissNormOutdoor as c}
					<option value={c.ort}>{c.ort} ({c.t} °C)</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="no-in">Normaussentemp</label>
			<div class="calc-input-wrap">
				<input id="no-in" type="number" step="1" bind:value={normOutdoor} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="rt-in">Soll-Raumtemperatur</label>
			<div class="calc-input-wrap">
				<input id="rt-in" type="number" step="0.5" bind:value={roomTemp} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="hl-in">
				Heizgrenze
				<span class="calc-field-hint">oberhalb keine Heizung</span>
			</label>
			<div class="calc-input-wrap">
				<input id="hl-in" type="number" step="0.5" bind:value={heatLimit} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="min-in">Min. Vorlauf</label>
			<div class="calc-input-wrap">
				<input id="min-in" type="number" step="1" bind:value={minFlow} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="max-in">Max. Vorlauf</label>
			<div class="calc-input-wrap">
				<input id="max-in" type="number" step="1" bind:value={maxFlow} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Auslegungs-Vorlauf bei {normOutdoor} °C</span>
			<span class="calc-result-value primary">{fmt(tvDesign, 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">TV bei −5 °C</span>
			<span class="calc-result-value">{fmt(calculateFlowTemp(-5, params), 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">TV bei 0 °C</span>
			<span class="calc-result-value">{fmt(calculateFlowTemp(0, params), 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">TV bei +5 °C</span>
			<span class="calc-result-value">{fmt(calculateFlowTemp(5, params), 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">TV bei +10 °C</span>
			<span class="calc-result-value">{fmt(calculateFlowTemp(10, params), 1)}<span class="calc-result-unit">°C</span></span>
		</div>
	</div>

	{#if tvDesign > maxFlow}
		<div class="calc-warning">
			⚠ Auslegungstemperatur {fmt(tvDesign, 1)} °C wird durch max. Vorlauf {maxFlow} °C begrenzt. Höhere Neigung oder Niveau ist wirkungslos. Heizfläche evtl. zu klein.
		</div>
	{/if}

	<p class="calc-info">
		Die Formeln sind Annäherungen an die jeweiligen Hersteller-Algorithmen — exakte Werte können je nach Firmware abweichen.
		Bei Fussbodenheizung Exponent n ≈ 1.1, Radiatoren n ≈ 1.3. <br />
		Quellen: SIA 384/2, Herstellerunterlagen.
	</p>
</div>

<style>
	.wide {
		max-width: 600px;
	}

	.plot-section {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem;
		margin-bottom: 0.75rem;
	}

	.plot {
		width: 100%;
		height: auto;
		display: block;
	}

	.grid {
		stroke: var(--border);
		stroke-width: 0.5;
		opacity: 0.5;
	}

	.axis {
		stroke: var(--muted);
		stroke-width: 1;
	}

	.tick-label {
		fill: var(--muted);
		font-size: 9px;
		font-family: inherit;
	}

	.axis-label {
		fill: var(--muted);
		font-size: 9px;
		font-family: inherit;
	}

	.curve {
		fill: none;
		stroke: var(--color-primary);
		stroke-width: 2;
		stroke-linejoin: round;
	}

	.norm {
		stroke: var(--color-secondary);
		stroke-width: 1;
		stroke-dasharray: 3 3;
		opacity: 0.6;
	}

	.limit {
		stroke: #ca8a04;
		stroke-width: 1;
		stroke-dasharray: 2 4;
		opacity: 0.5;
	}

	.current {
		stroke: var(--text);
		stroke-width: 1;
		stroke-dasharray: 1 3;
		opacity: 0.4;
	}

	.current-dot {
		fill: var(--color-primary);
		stroke: var(--surface);
		stroke-width: 2;
	}

	.plot-legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1rem;
		font-size: 0.7rem;
		color: var(--muted);
		margin-top: 0.5rem;
		padding: 0 0.25rem;
	}

	.dot {
		display: inline-block;
		width: 0.625rem;
		height: 0.25rem;
		border-radius: 1px;
		margin-right: 0.25rem;
		vertical-align: middle;
	}

	.curve-dot {
		background: var(--color-primary);
	}

	.norm-dot {
		background: var(--color-secondary);
		opacity: 0.6;
	}

	.limit-dot {
		background: #ca8a04;
		opacity: 0.6;
	}

	.current-dot-l {
		background: var(--text);
		opacity: 0.5;
	}
</style>
