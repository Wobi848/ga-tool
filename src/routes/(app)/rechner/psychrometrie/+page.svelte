<script lang="ts">
	import { fmt, absHumidity } from '$lib/rechner/_shared';
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

	// ─── h-x-Diagramm (Carrier-Style: x horizontal, T vertikal) ───────────────
	const CHART = { w: 380, h: 260, padL: 38, padR: 16, padT: 16, padB: 34 };
	const PLOT_W = CHART.w - CHART.padL - CHART.padR;
	const PLOT_H = CHART.h - CHART.padT - CHART.padB;

	const X_MIN = 0;
	const X_MAX = 25; // g/kg
	const T_MIN = -10;
	const T_MAX = 40;

	function sx(xGkg: number): number {
		return CHART.padL + ((xGkg - X_MIN) / (X_MAX - X_MIN)) * PLOT_W;
	}
	function sy(tC: number): number {
		return CHART.h - CHART.padB - ((tC - T_MIN) / (T_MAX - T_MIN)) * PLOT_H;
	}

	const RH_CURVES = [
		{ rh: 20, opacity: 0.35 },
		{ rh: 40, opacity: 0.4 },
		{ rh: 60, opacity: 0.45 },
		{ rh: 80, opacity: 0.5 },
		{ rh: 100, opacity: 0.7 } // Sättigungslinie
	];

	function curvePath(rhPct: number): string {
		const pts: string[] = [];
		for (let t = T_MIN; t <= T_MAX; t += 1) {
			const xVal = absHumidity(t, rhPct, pressure);
			if (xVal > X_MAX * 1.2) continue;
			const cx = sx(Math.min(xVal, X_MAX));
			const cy = sy(t);
			pts.push(`${pts.length === 0 ? 'M' : 'L'} ${cx.toFixed(1)} ${cy.toFixed(1)}`);
		}
		return pts.join(' ');
	}

	const opInChart = $derived(
		result.x >= X_MIN && result.x <= X_MAX && result.t >= T_MIN && result.t <= T_MAX
	);
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

	<!-- h-x-Diagramm -->
	<div class="calc-section">
		<h2 class="calc-section-title">h-x-Diagramm (Carrier)</h2>
		<svg viewBox="0 0 {CHART.w} {CHART.h}" class="hx-chart" preserveAspectRatio="xMidYMid meet">
			<!-- Achsenrahmen -->
			<rect
				x={CHART.padL}
				y={CHART.padT}
				width={PLOT_W}
				height={PLOT_H}
				fill="none"
				stroke="currentColor"
				stroke-width="0.5"
				opacity="0.4"
			/>

			<!-- Gitter horizontal (T) -->
			{#each [0, 10, 20, 30] as t (t)}
				<line
					x1={CHART.padL}
					y1={sy(t)}
					x2={CHART.w - CHART.padR}
					y2={sy(t)}
					stroke="currentColor"
					stroke-width="0.3"
					opacity="0.15"
					stroke-dasharray="2 2"
				/>
				<text
					x={CHART.padL - 4}
					y={sy(t) + 3}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
					text-anchor="end">{t}</text
				>
			{/each}
			<text
				x={CHART.padL - 4}
				y={sy(T_MIN) + 3}
				font-size="9"
				fill="currentColor"
				opacity="0.6"
				text-anchor="end">{T_MIN}</text
			>
			<text
				x={CHART.padL - 4}
				y={sy(T_MAX) + 3}
				font-size="9"
				fill="currentColor"
				opacity="0.6"
				text-anchor="end">{T_MAX}</text
			>
			<text x={6} y={CHART.padT + 4} font-size="9" fill="currentColor" opacity="0.7">°C</text>

			<!-- Gitter vertikal (x) -->
			{#each [5, 10, 15, 20] as xg (xg)}
				<line
					x1={sx(xg)}
					y1={CHART.padT}
					x2={sx(xg)}
					y2={CHART.h - CHART.padB}
					stroke="currentColor"
					stroke-width="0.3"
					opacity="0.15"
					stroke-dasharray="2 2"
				/>
				<text
					x={sx(xg)}
					y={CHART.h - CHART.padB + 12}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
					text-anchor="middle">{xg}</text
				>
			{/each}
			<text
				x={sx(0)}
				y={CHART.h - CHART.padB + 12}
				font-size="9"
				fill="currentColor"
				opacity="0.6"
				text-anchor="middle">0</text
			>
			<text
				x={sx(X_MAX)}
				y={CHART.h - CHART.padB + 12}
				font-size="9"
				fill="currentColor"
				opacity="0.6"
				text-anchor="end">g/kg</text
			>

			<!-- rF-Kurven -->
			{#each RH_CURVES as c (c.rh)}
				<path
					d={curvePath(c.rh)}
					fill="none"
					stroke="#0d9488"
					stroke-width={c.rh === 100 ? 1.5 : 0.8}
					opacity={c.opacity}
				/>
				{@const labelT = c.rh === 100 ? 32 : c.rh >= 60 ? 32 - (100 - c.rh) * 0.15 : 30}
				{@const labelX = Math.min(absHumidity(labelT, c.rh, pressure), X_MAX - 0.5)}
				<text x={sx(labelX) + 3} y={sy(labelT) - 2} font-size="8" fill="#0d9488" opacity={c.opacity}
					>{c.rh}%</text
				>
			{/each}

			<!-- Operating Point + Hilfslinien -->
			{#if opInChart}
				<line
					x1={sx(result.x)}
					y1={sy(result.t)}
					x2={sx(result.x)}
					y2={CHART.h - CHART.padB}
					stroke="#ea580c"
					stroke-width="0.5"
					stroke-dasharray="2 2"
					opacity="0.6"
				/>
				<line
					x1={CHART.padL}
					y1={sy(result.t)}
					x2={sx(result.x)}
					y2={sy(result.t)}
					stroke="#ea580c"
					stroke-width="0.5"
					stroke-dasharray="2 2"
					opacity="0.6"
				/>
				<!-- Taupunkt-Linie: vom OP nach links auf Sättigungskurve -->
				{#if result.tdp >= T_MIN && result.tdp <= T_MAX}
					<line
						x1={sx(result.x)}
						y1={sy(result.t)}
						x2={sx(result.x)}
						y2={sy(result.tdp)}
						stroke="#dc2626"
						stroke-width="0.5"
						stroke-dasharray="3 3"
						opacity="0.5"
					/>
					<circle cx={sx(result.x)} cy={sy(result.tdp)} r="2.5" fill="#dc2626" opacity="0.7" />
				{/if}
				<circle
					cx={sx(result.x)}
					cy={sy(result.t)}
					r="4.5"
					fill="#ea580c"
					stroke="white"
					stroke-width="1.2"
				/>
			{/if}
		</svg>
		<p class="chart-legend">
			<span class="lg-dot" style="background:#ea580c"></span>
			{$_('rechner.psychrometrieUi.operatingPoint')}
			&nbsp;·&nbsp;
			<span class="lg-dot" style="background:#dc2626"></span>
			{$_('rechner.psychrometrieUi.dewpointTd')}
			&nbsp;·&nbsp;
			<span class="lg-line" style="background:#0d9488"></span>
			{$_('rechner.psychrometrieUi.rhCurves')}
		</p>
	</div>

	<p class="calc-info">{$_('rechner.psychrometrieUi.formulaNote')}</p>
</div>

<style>
	.hx-chart {
		width: 100%;
		height: auto;
		color: var(--muted);
		max-width: 480px;
		display: block;
		margin: 0 auto;
	}
	.chart-legend {
		font-size: 0.7rem;
		color: var(--muted);
		margin: 0.5rem 0 0;
		text-align: center;
	}
	.lg-dot {
		display: inline-block;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 3px;
	}
	.lg-line {
		display: inline-block;
		width: 14px;
		height: 2px;
		vertical-align: middle;
		margin-right: 3px;
	}
</style>
