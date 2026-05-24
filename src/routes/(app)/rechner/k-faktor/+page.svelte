<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import {
		computeKFaktor,
		correctKForDensity,
		airDensity,
		curve,
		type KFaktorMode
	} from '$lib/rechner/kFaktor';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	let mode = $state<KFaktorMode>('q-from-kdp');

	// Inputs (für alle Modi, jeweils relevante UI sichtbar)
	let flow = $state(500);
	let dp = $state(100);
	let k = $state(50);

	// k-from-points
	let flow1 = $state(200);
	let dp1 = $state(16);
	let flow2 = $state(500);
	let dp2 = $state(100);

	// Dichtekorrektur (optional)
	let useDensityCorrection = $state(false);
	let tempC = $state(20);
	let pressurePa = $state(101325);

	const rhoActual = $derived(airDensity(tempC, pressurePa));

	const result = $derived(
		computeKFaktor({
			mode,
			flow,
			dp,
			k,
			flow1,
			dp1,
			flow2,
			dp2
		})
	);

	const kCorrected = $derived(
		useDensityCorrection ? correctKForDensity(result.k, rhoActual) : result.k
	);

	// Chart-Daten — Kennlinie für den aktuellen k über sinnvollen ΔP-Bereich
	const chartK = $derived(mode === 'k-from-points' ? result.k : k);

	// Aktuelle ΔP für Auto-Scale: aus dem jeweiligen Modus + Operating-Point ableiten
	const currentDp = $derived.by(() => {
		if (mode === 'q-from-kdp' || mode === 'k-from-qdp') return dp;
		if (mode === 'dp-from-qk') return result.dp;
		// k-from-points → grösserer der beiden Messpunkte
		return Math.max(dp1, dp2);
	});

	// X-Achse: GA-Standard-Bereich 0–300 Pa fixiert (typisch VAV/Drall),
	// expandiert nur wenn der Arbeitspunkt rausläuft. Dadurch bewegt sich der
	// Marker sichtbar in der gleichen Kurve statt dass die Wurzelform durch
	// proportionales Mitskalieren immer gleich aussieht.
	const xMax = $derived.by(() => {
		if (currentDp * 1.2 <= 300) return 300;
		// expandieren auf rundes Vielfaches
		const raw = currentDp * 1.2;
		if (raw <= 500) return 500;
		if (raw <= 1000) return 1000;
		if (raw <= 2000) return 2000;
		return Math.ceil(raw / 1000) * 1000;
	});

	const chartCurve = $derived(chartK > 0 ? curve(chartK, 0, xMax, 60) : []);

	const CHART = { w: 320, h: 200, padL: 56, padR: 16, padT: 16, padB: 28 };
	const yMax = $derived(chartCurve.length > 0 ? chartCurve[chartCurve.length - 1].q * 1.05 : 1);

	const PLOT_W = $derived(CHART.w - CHART.padL - CHART.padR);
	const PLOT_H = $derived(CHART.h - CHART.padT - CHART.padB);

	function sx(x: number): number {
		return CHART.padL + (x / xMax) * PLOT_W;
	}
	function sy(y: number): number {
		return CHART.h - CHART.padB - (y / yMax) * PLOT_H;
	}

	const pathD = $derived(
		chartCurve
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.dp).toFixed(1)} ${sy(p.q).toFixed(1)}`)
			.join(' ')
	);

	// Arbeitspunkt — abhängig vom Modus
	const operatingPoint = $derived.by(() => {
		if (chartK <= 0) return null;
		if (mode === 'k-from-points') {
			return {
				multi: [
					{ dp: dp1, q: flow1 },
					{ dp: dp2, q: flow2 }
				]
			};
		}
		let opDp: number;
		let opQ: number;
		if (mode === 'q-from-kdp') {
			opDp = dp;
			opQ = result.q;
		} else if (mode === 'dp-from-qk') {
			opDp = result.dp;
			opQ = flow;
		} else {
			// k-from-qdp
			opDp = dp;
			opQ = flow;
		}
		if (opDp < 0 || opDp > xMax * 1.2 || opQ < 0 || opQ > yMax * 1.5) return null;
		return { multi: [{ dp: opDp, q: opQ }] };
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
			<h1 class="calc-title">{$_('rechner.kFaktor.name')}</h1>
			<FavButton type="rechner" slug="k-faktor" title={$_('rechner.kFaktor.name')} size={20} />
			<a href="/wissen/k-faktor-luft" class="wiki-link">{$_('rechner.ui.wikiLink')}</a>
		</div>
		<p class="calc-info" style="margin-top: 0.5rem">
			{$_('rechner.kFaktor.intro')}
		</p>
	</header>

	<!-- Modus-Wahl -->
	<div class="calc-section">
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel">{$_('rechner.kFaktorUi.mode')}</label>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="q-from-kdp">{$_('rechner.kFaktorUi.qFromKdp')}</option>
				<option value="dp-from-qk">{$_('rechner.kFaktorUi.dpFromQk')}</option>
				<option value="k-from-qdp">{$_('rechner.kFaktorUi.kFromQdp')}</option>
				<option value="k-from-points">{$_('rechner.kFaktorUi.kFromPoints')}</option>
			</select>
		</div>
	</div>

	<!-- Eingaben (modusabhängig) -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.kFaktorUi.inputs')}</h2>

		{#if mode === 'q-from-kdp'}
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="in-k">{$_('rechner.kFaktorUi.kFactor')}</label>
				<div class="calc-input-wrap">
					<input id="in-k" type="number" step="any" bind:value={k} class="calc-input" />
					<span class="calc-input-unit">m³/h·Pa⁻⁰·⁵</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-dp">ΔP</label>
				<div class="calc-input-wrap">
					<input id="in-dp" type="number" step="any" bind:value={dp} class="calc-input" />
					<span class="calc-input-unit">Pa</span>
				</div>
			</div>
		{:else if mode === 'dp-from-qk'}
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="in-q">Q</label>
				<div class="calc-input-wrap">
					<input id="in-q" type="number" step="any" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-k">{$_('rechner.kFaktorUi.kFactor')}</label>
				<div class="calc-input-wrap">
					<input id="in-k" type="number" step="any" bind:value={k} class="calc-input" />
					<span class="calc-input-unit">m³/h·Pa⁻⁰·⁵</span>
				</div>
			</div>
		{:else if mode === 'k-from-qdp'}
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="in-q">Q</label>
				<div class="calc-input-wrap">
					<input id="in-q" type="number" step="any" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-dp">ΔP</label>
				<div class="calc-input-wrap">
					<input id="in-dp" type="number" step="any" bind:value={dp} class="calc-input" />
					<span class="calc-input-unit">Pa</span>
				</div>
			</div>
		{:else}
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="in-q1">Q₁</label>
				<div class="calc-input-wrap">
					<input id="in-q1" type="number" step="any" bind:value={flow1} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-dp1">ΔP₁</label>
				<div class="calc-input-wrap">
					<input id="in-dp1" type="number" step="any" bind:value={dp1} class="calc-input" />
					<span class="calc-input-unit">Pa</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-q2">Q₂</label>
				<div class="calc-input-wrap">
					<input id="in-q2" type="number" step="any" bind:value={flow2} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-dp2">ΔP₂</label>
				<div class="calc-input-wrap">
					<input id="in-dp2" type="number" step="any" bind:value={dp2} class="calc-input" />
					<span class="calc-input-unit">Pa</span>
				</div>
			</div>
		{/if}
	</div>

	<!-- Dichtekorrektur (optional) -->
	<div class="calc-section">
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="dens-toggle">
				{$_('rechner.kFaktorUi.densityCorrection')}
				<span class="calc-field-hint">{$_('rechner.kFaktorUi.densityHint')}</span>
			</label>
			<input
				id="dens-toggle"
				type="checkbox"
				bind:checked={useDensityCorrection}
				class="dens-check"
			/>
		</div>
		{#if useDensityCorrection}
			<div class="calc-field">
				<label class="calc-field-label" for="in-temp">{$_('rechner.kFaktorUi.airTemp')}</label>
				<div class="calc-input-wrap">
					<input id="in-temp" type="number" step="any" bind:value={tempC} class="calc-input" />
					<span class="calc-input-unit">°C</span>
				</div>
			</div>
			<div class="calc-field">
				<label class="calc-field-label" for="in-pres">{$_('rechner.kFaktorUi.pressure')}</label>
				<div class="calc-input-wrap">
					<input id="in-pres" type="number" step="any" bind:value={pressurePa} class="calc-input" />
					<span class="calc-input-unit">Pa</span>
				</div>
			</div>
			<div class="calc-field">
				<span class="calc-field-label">ρ (aktuell)</span>
				<span class="calc-result-value">{fmt(rhoActual, 3)} kg/m³</span>
			</div>
		{/if}
	</div>

	<!-- Ergebnis -->
	<div class="calc-result-section">
		{#if mode === 'q-from-kdp'}
			<div class="calc-result">
				<span class="calc-result-label">Q</span>
				<span class="calc-result-value primary"
					>{fmt(result.q, 1)} <span class="calc-result-unit">m³/h</span></span
				>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">Q (l/s)</span>
				<span class="calc-result-value"
					>{fmt(result.qLs, 2)} <span class="calc-result-unit">l/s</span></span
				>
			</div>
		{:else if mode === 'dp-from-qk'}
			<div class="calc-result">
				<span class="calc-result-label">ΔP</span>
				<span class="calc-result-value primary"
					>{fmt(result.dp, 1)} <span class="calc-result-unit">Pa</span></span
				>
			</div>
		{:else if mode === 'k-from-qdp'}
			<div class="calc-result">
				<span class="calc-result-label">k</span>
				<span class="calc-result-value primary"
					>{fmt(result.k, 2)} <span class="calc-result-unit">m³/h·Pa⁻⁰·⁵</span></span
				>
			</div>
		{:else}
			<div class="calc-result">
				<span class="calc-result-label">k (Mittel)</span>
				<span class="calc-result-value primary"
					>{fmt(result.k, 2)} <span class="calc-result-unit">m³/h·Pa⁻⁰·⁵</span></span
				>
			</div>
		{/if}

		{#if useDensityCorrection && (mode === 'q-from-kdp' || mode === 'k-from-qdp' || mode === 'k-from-points')}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.kFaktorUi.kCorrected')}</span>
				<span class="calc-result-value">{fmt(kCorrected, 2)}</span>
			</div>
		{/if}
	</div>

	<!-- Kennlinie -->
	{#if chartK > 0}
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.kFaktorUi.curve')} (k = {fmt(chartK, 2)})</h2>
			<svg viewBox="0 0 {CHART.w} {CHART.h}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
				<!-- Achsen -->
				<line
					x1={CHART.padL}
					y1={CHART.h - CHART.padB}
					x2={CHART.w - CHART.padR}
					y2={CHART.h - CHART.padB}
					stroke="currentColor"
					stroke-width="0.5"
					opacity="0.5"
				/>
				<line
					x1={CHART.padL}
					y1={CHART.padT}
					x2={CHART.padL}
					y2={CHART.h - CHART.padB}
					stroke="currentColor"
					stroke-width="0.5"
					opacity="0.5"
				/>

				<!-- Hilfslinien horizontal (50 %) -->
				<line
					x1={CHART.padL}
					y1={sy(yMax / 2)}
					x2={CHART.w - CHART.padR}
					y2={sy(yMax / 2)}
					stroke="currentColor"
					stroke-width="0.3"
					opacity="0.25"
					stroke-dasharray="2 2"
				/>
				<line
					x1={sx(xMax / 2)}
					y1={CHART.padT}
					x2={sx(xMax / 2)}
					y2={CHART.h - CHART.padB}
					stroke="currentColor"
					stroke-width="0.3"
					opacity="0.25"
					stroke-dasharray="2 2"
				/>

				<path d={pathD} fill="none" stroke="#0d9488" stroke-width="2" />

				<!-- Arbeitspunkt(e) -->
				{#if operatingPoint?.multi}
					{#each operatingPoint.multi as p (p.dp + '_' + p.q)}
						{#if p.dp >= 0 && p.dp <= xMax && p.q >= 0 && p.q <= yMax}
							<!-- Hilfslinien Arbeitspunkt → Achsen -->
							<line
								x1={sx(p.dp)}
								y1={sy(p.q)}
								x2={sx(p.dp)}
								y2={CHART.h - CHART.padB}
								stroke="#ea580c"
								stroke-width="0.5"
								stroke-dasharray="2 2"
								opacity="0.6"
							/>
							<line
								x1={CHART.padL}
								y1={sy(p.q)}
								x2={sx(p.dp)}
								y2={sy(p.q)}
								stroke="#ea580c"
								stroke-width="0.5"
								stroke-dasharray="2 2"
								opacity="0.6"
							/>
							<circle
								cx={sx(p.dp)}
								cy={sy(p.q)}
								r="4"
								fill="#ea580c"
								stroke="white"
								stroke-width="1"
							/>
						{/if}
					{/each}
				{/if}

				<!-- Y-Achse Labels (rechtsbündig vor der Achse) -->
				<text
					x={CHART.padL - 6}
					y={sy(yMax) + 3}
					font-size="9"
					fill="currentColor"
					opacity="0.7"
					text-anchor="end">{fmt(yMax, 0)}</text
				>
				<text
					x={CHART.padL - 6}
					y={sy(yMax / 2) + 3}
					font-size="9"
					fill="currentColor"
					opacity="0.55"
					text-anchor="end">{fmt(yMax / 2, 0)}</text
				>
				<text
					x={CHART.padL - 6}
					y={sy(0) + 3}
					font-size="9"
					fill="currentColor"
					opacity="0.7"
					text-anchor="end">0</text
				>
				<text x={4} y={CHART.padT + 3} font-size="9" fill="currentColor" opacity="0.5">m³/h</text>

				<!-- X-Achse Labels -->
				<text
					x={CHART.padL}
					y={CHART.h - 8}
					font-size="9"
					fill="currentColor"
					opacity="0.7"
					text-anchor="middle">0</text
				>
				<text
					x={sx(xMax / 2)}
					y={CHART.h - 8}
					font-size="9"
					fill="currentColor"
					opacity="0.55"
					text-anchor="middle">{xMax / 2}</text
				>
				<text
					x={CHART.w - CHART.padR}
					y={CHART.h - 8}
					font-size="9"
					fill="currentColor"
					opacity="0.7"
					text-anchor="end">{xMax} Pa</text
				>
			</svg>
		</div>
	{/if}
</div>

<style>
	.calc-info {
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.dens-check {
		width: 1.25rem;
		height: 1.25rem;
		accent-color: var(--color-primary);
		cursor: pointer;
	}
	.chart-svg {
		width: 100%;
		height: auto;
		color: var(--muted);
	}
</style>
