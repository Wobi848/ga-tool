<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	// Pumpen-Presets: [H0 (m), Q0 (m³/h)] — Förderhöhe bei Q=0, Nullförderstrom bei H=0
	const pumpPresets = [
		{ label: 'Grundfos UPS 25-60', h0: 6.0, q0: 3.2 },
		{ label: 'Grundfos UP 20-14', h0: 2.0, q0: 1.5 },
		{ label: 'Wilo Stratos 25/1-8', h0: 8.0, q0: 4.5 },
		{ label: 'Wilo Yonos Pico 25/1-6', h0: 6.0, q0: 3.5 },
		{ label: 'Benutzerdefiniert', h0: 6.0, q0: 3.0 }
	];

	let presetIdx = $state(0);
	let h0 = $state(pumpPresets[0].h0); // Förderhöhe bei Q=0 [m]
	let q0 = $state(pumpPresets[0].q0); // Volumenstrom bei H=0 [m³/h]

	// Rohrnetz-Kennlinie: R = ΔpNetz / QNetz²
	// Auslegungspunkt definiert R
	let qDesign = $state(1.5); // m³/h Auslegungsdurchfluss
	let hDesign = $state(3.0); // m WS Auslegungsförderhöhe (= Druckverlust Rohrnetz)

	$effect(() => {
		const p = pumpPresets[presetIdx];
		if (presetIdx < pumpPresets.length - 1) {
			h0 = p.h0;
			q0 = p.q0;
		}
	});

	// Pumpenkennlinie: H_P(Q) = H0 × (1 − (Q/Q0)²) — Parabel-Näherung
	function hPump(q: number): number {
		return h0 * (1 - Math.pow(q / q0, 2));
	}

	// Rohrnetz-Kennlinie: H_R(Q) = R × Q²  mit R = hDesign / qDesign²
	function hRohrnetz(q: number): number {
		if (qDesign <= 0) return 0;
		const r = hDesign / (qDesign * qDesign);
		return r * q * q;
	}

	// Betriebspunkt: Schnittpunkt H_P(Q) = H_R(Q)
	// H0*(1-(Q/Q0)²) = R*Q²
	// H0 - H0/Q0²*Q² = R*Q²
	// H0 = Q²*(R + H0/Q0²)
	// Q_B = sqrt(H0 / (R + H0/Q0²))
	const operatingPoint = $derived.by(() => {
		if (qDesign <= 0 || hDesign <= 0 || q0 <= 0 || h0 <= 0) return null;
		const r = hDesign / (qDesign * qDesign);
		const denominator = r + h0 / (q0 * q0);
		if (denominator <= 0) return null;
		const qB = Math.sqrt(h0 / denominator);
		const hB = hPump(qB);
		if (qB <= 0 || hB <= 0 || qB > q0 * 1.05) return null;
		return { q: qB, h: hB };
	});

	// Kurvenberechnung für Anzeige (11 Punkte)
	const chartPoints = $derived.by(() => {
		const pts = [];
		const qMax = q0 * 1.05;
		for (let i = 0; i <= 10; i++) {
			const q = (i / 10) * qMax;
			const hp = Math.max(0, hPump(q));
			const hr = hRohrnetz(q);
			pts.push({ q, hp, hr });
		}
		return pts;
	});

	// Für Balken-Normierung
	const maxH = $derived(
		Math.max(...chartPoints.map((p) => p.hp), ...chartPoints.map((p) => p.hr), 0.1)
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
			<h1 class="calc-title">{$_('rechner.pumpenkennlinie.name')}</h1>
			<FavButton
				type="rechner"
				slug="pumpenkennlinie"
				title={$_('rechner.pumpenkennlinie.name')}
				size={20}
			/>
		</div>
	</header>

	<!-- Pumpe -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.pumpenkennlinieUi.pump')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="preset-sel"
				>{$_('rechner.pumpenkennlinieUi.preset')}</label
			>
			<select id="preset-sel" bind:value={presetIdx} class="calc-select">
				{#each pumpPresets as p, i (i)}
					<option value={i}
						>{i === pumpPresets.length - 1
							? $_('rechner.pumpenkennlinieUi.customPreset')
							: p.label}</option
					>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="h0-in">
				{$_('rechner.pumpenkennlinieUi.shutoffHeadLabel')}
				<span class="calc-field-hint">{$_('rechner.pumpenkennlinieUi.shutoffHead')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="h0-in" type="number" step="0.5" min="0.5" bind:value={h0} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="q0-in">
				{$_('rechner.pumpenkennlinieUi.freeDeliveryLabel')}
				<span class="calc-field-hint">{$_('rechner.pumpenkennlinieUi.freeDelivery')}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="q0-in" type="number" step="0.1" min="0.1" bind:value={q0} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
	</div>

	<!-- Rohrnetz -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.pumpenkennlinieUi.designPoint')}</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="qd-in">
				{$_('rechner.pumpenkennlinieUi.designFlowLabel')}
			</label>
			<div class="calc-input-wrap">
				<input
					id="qd-in"
					type="number"
					step="0.1"
					min="0.01"
					bind:value={qDesign}
					class="calc-input"
				/>
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="hd-in">
				{$_('rechner.pumpenkennlinieUi.networkPressureDrop')}
				<span class="calc-field-hint">{$_('rechner.pumpenkennlinieUi.designPointHint')}</span>
			</label>
			<div class="calc-input-wrap">
				<input
					id="hd-in"
					type="number"
					step="0.5"
					min="0.1"
					bind:value={hDesign}
					class="calc-input"
				/>
				<span class="calc-input-unit">m</span>
			</div>
		</div>
	</div>

	<!-- Ergebnis Betriebspunkt -->
	{#if operatingPoint}
		<div class="calc-result-section">
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.pumpenkennlinieUi.operatingQ')}</span>
				<span class="calc-result-value primary"
					>{fmt(operatingPoint.q, 2)}<span class="calc-result-unit">m³/h</span></span
				>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.pumpenkennlinieUi.operatingH')}</span>
				<span class="calc-result-value primary"
					>{fmt(operatingPoint.h, 2)}<span class="calc-result-unit">m</span></span
				>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.pumpenkennlinieUi.operatingH')}</span>
				<span class="calc-result-value"
					>{fmt((operatingPoint.h * 9810) / 1000, 1)}<span class="calc-result-unit">kPa</span></span
				>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.pumpenkennlinieUi.operatingVsDesign')}</span>
				<span
					class="calc-result-value"
					style="color: {Math.abs(operatingPoint.q - qDesign) / qDesign < 0.05
						? '#16a34a'
						: '#ca8a04'}"
				>
					{fmt((operatingPoint.q / qDesign) * 100, 0)}<span class="calc-result-unit">%</span>
				</span>
			</div>
		</div>
	{:else}
		<div class="no-intersection">{$_('rechner.pumpenkennlinieUi.noIntersection')}</div>
	{/if}

	<!-- H-Q Diagramm (Balken-Approximation) -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.pumpenkennlinieUi.hqDiagram')}</h2>
		<div class="chart">
			<div class="chart-y-label">H [m]</div>
			<div class="chart-body">
				{#each chartPoints as pt, i (i)}
					<div class="chart-col">
						<div class="chart-bars">
							<!-- Rohrnetz bar (bottom) -->
							<div
								class="bar bar--rohrnetz"
								style="height: {(pt.hr / maxH) * 100}%"
								title="Rohrnetz: {fmt(pt.hr, 2)} m"
							></div>
							<!-- Pumpe bar -->
							<div
								class="bar bar--pumpe"
								style="height: {Math.max(0, (pt.hp - pt.hr) / maxH) * 100}%"
								title="Pumpe: {fmt(pt.hp, 2)} m"
							></div>
							<!-- Betriebspunkt Marker -->
							{#if operatingPoint && i === Math.round((operatingPoint.q / (q0 * 1.05)) * 10)}
								<div
									class="bp-marker"
									title={$_('rechner.pumpenkennlinieUi.operatingPointTooltip')}
								></div>
							{/if}
						</div>
						{#if i % 2 === 0}
							<div class="chart-label">{fmt(pt.q, 1)}</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div class="chart-legend">
			<span class="legend-dot legend-dot--pumpe"></span>
			{$_('rechner.pumpenkennlinieUi.pumpCurveLabel')}
			<span class="legend-dot legend-dot--rohrnetz" style="margin-left:1rem"></span>
			{$_('rechner.pumpenkennlinieUi.networkLabel')}
			{#if operatingPoint}<span style="margin-left:1rem"
					>● {$_('rechner.pumpenkennlinieUi.operatingPointLabel')}</span
				>{/if}
		</div>
		<p class="chart-xlabel">Q [m³/h]</p>
	</div>

	<p class="calc-info">{$_('rechner.pumpenkennlinieUi.formulaNote')}</p>
</div>

<style>
	.no-intersection {
		background: color-mix(in srgb, #dc2626 8%, transparent);
		border: 1px solid color-mix(in srgb, #dc2626 30%, transparent);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
		font-size: 0.8125rem;
		color: #dc2626;
		margin-bottom: 0.75rem;
	}

	/* Chart */
	.chart {
		display: flex;
		gap: 0.25rem;
		height: 160px;
	}

	.chart-y-label {
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		font-size: 0.7rem;
		color: var(--muted);
		text-align: center;
		flex-shrink: 0;
	}

	.chart-body {
		flex: 1;
		display: flex;
		align-items: flex-end;
		gap: 2px;
	}

	.chart-col {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
	}

	.chart-bars {
		flex: 1;
		width: 100%;
		display: flex;
		flex-direction: column-reverse;
		align-items: stretch;
		position: relative;
	}

	.bar {
		width: 100%;
		min-height: 1px;
		transition: height 0.2s;
	}

	.bar--rohrnetz {
		background: #0891b2;
		border-radius: 2px 2px 0 0;
	}
	.bar--pumpe {
		background: var(--color-primary);
		border-radius: 2px 2px 0 0;
	}

	.bp-marker {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #eab308;
		border: 2px solid var(--bg);
		z-index: 2;
	}

	.chart-label {
		font-size: 0.6rem;
		color: var(--muted);
		margin-top: 2px;
		font-family: ui-monospace, monospace;
	}

	.chart-xlabel {
		font-size: 0.7rem;
		color: var(--muted);
		text-align: center;
		margin: 0.25rem 0 0;
	}

	.chart-legend {
		font-size: 0.75rem;
		color: var(--muted);
		margin-top: 0.5rem;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem;
	}

	.legend-dot {
		display: inline-block;
		width: 10px;
		height: 10px;
		border-radius: 2px;
		margin-right: 0.25rem;
	}

	.legend-dot--pumpe {
		background: var(--color-primary);
	}
	.legend-dot--rohrnetz {
		background: #0891b2;
	}
</style>
