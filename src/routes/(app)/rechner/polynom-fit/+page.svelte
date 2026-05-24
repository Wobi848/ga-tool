<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import {
		fitPolynomial,
		evaluatePoly,
		polynomialCurve,
		formatPolynomial
	} from '$lib/rechner/polynomFit';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	interface Row {
		id: number;
		x: number | null;
		y: number | null;
	}

	let nextId = $state(7);
	let rows = $state<Row[]>([
		{ id: 1, x: 0, y: 32.66 },
		{ id: 2, x: 10, y: 19.9 },
		{ id: 3, x: 20, y: 12.51 },
		{ id: 4, x: 25, y: 10.0 },
		{ id: 5, x: 30, y: 8.057 },
		{ id: 6, x: 40, y: 5.327 }
	]);
	let degree = $state(3);
	let evalX = $state(25);

	function addRow() {
		rows = [...rows, { id: nextId++, x: null, y: null }];
	}
	function removeRow(id: number) {
		if (rows.length <= 2) return;
		rows = rows.filter((r) => r.id !== id);
	}

	const validPoints = $derived(
		rows
			.filter((r) => r.x !== null && r.y !== null && !isNaN(r.x as number) && !isNaN(r.y as number))
			.map((r) => ({ x: r.x as number, y: r.y as number }))
	);

	const fitResult = $derived.by(() => {
		if (validPoints.length < 2) return null;
		try {
			return fitPolynomial(validPoints, degree);
		} catch (e) {
			return { error: (e as Error).message };
		}
	});

	const success = $derived(
		fitResult !== null &&
			!('error' in (fitResult as object)) &&
			'coefficients' in (fitResult as object)
	);

	const xRange = $derived.by(() => {
		if (validPoints.length === 0) return { min: 0, max: 1 };
		const xs = validPoints.map((p) => p.x);
		const min = Math.min(...xs);
		const max = Math.max(...xs);
		const padding = (max - min) * 0.1 || 1;
		return { min: min - padding, max: max + padding };
	});

	const yRange = $derived.by(() => {
		if (validPoints.length === 0) return { min: 0, max: 1 };
		const ys = validPoints.map((p) => p.y);
		const min = Math.min(...ys);
		const max = Math.max(...ys);
		const padding = (max - min) * 0.1 || 1;
		return { min: min - padding, max: max + padding };
	});

	const curvePoints = $derived(
		success && fitResult && 'coefficients' in fitResult
			? polynomialCurve(fitResult.coefficients, xRange.min, xRange.max, 80)
			: []
	);

	const formula = $derived(
		success && fitResult && 'coefficients' in fitResult
			? formatPolynomial(fitResult.coefficients)
			: ''
	);

	const evalY = $derived(
		success && fitResult && 'coefficients' in fitResult
			? evaluatePoly(fitResult.coefficients, evalX)
			: null
	);

	// SVG-Koordinaten-Transformation: (x,y) im Daten-Raum → (sx,sy) im SVG (300×200, padding 30)
	const CHART = { w: 300, h: 200, pad: 30 };
	function sx(x: number): number {
		const range = xRange.max - xRange.min;
		if (range === 0) return CHART.pad;
		return CHART.pad + ((x - xRange.min) / range) * (CHART.w - 2 * CHART.pad);
	}
	function sy(y: number): number {
		const range = yRange.max - yRange.min;
		if (range === 0) return CHART.pad;
		return CHART.h - CHART.pad - ((y - yRange.min) / range) * (CHART.h - 2 * CHART.pad);
	}

	const pathD = $derived.by(() => {
		if (curvePoints.length === 0) return '';
		return curvePoints
			.map((p, i) => `${i === 0 ? 'M' : 'L'} ${sx(p.x).toFixed(1)} ${sy(p.y).toFixed(1)}`)
			.join(' ');
	});

	function subscript(n: number): string {
		const map = '₀₁₂₃₄₅₆₇₈₉';
		return String(n)
			.split('')
			.map((d) => map[+d])
			.join('');
	}

	function copyCoefficients() {
		if (!success || !fitResult || !('coefficients' in fitResult)) return;
		const csv = fitResult.coefficients.map((c, i) => `a${i}\t${c}`).join('\n');
		navigator.clipboard.writeText(csv);
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
			<h1 class="calc-title">{$_('rechner.polynomFit.name')}</h1>
			<FavButton
				type="rechner"
				slug="polynom-fit"
				title={$_('rechner.polynomFit.name')}
				size={20}
			/>
			<a href="/wissen/polynom-approximation" class="wiki-link">{$_('rechner.ui.wikiLink')}</a>
		</div>
		<p class="calc-info" style="margin-top: 0.5rem">
			{$_('rechner.polynomFit.intro')}
		</p>
	</header>

	<!-- Daten-Eingabe -->
	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.polynomFitUi.dataPoints')}</h2>
		<div class="row-header">
			<span class="col-label">x</span>
			<span class="col-label">y</span>
			<span class="col-del"></span>
		</div>
		{#each rows as row (row.id)}
			<div class="row-input">
				<input type="number" class="calc-input" step="any" placeholder="x" bind:value={row.x} />
				<input type="number" class="calc-input" step="any" placeholder="y" bind:value={row.y} />
				<button
					type="button"
					class="del-btn"
					onclick={() => removeRow(row.id)}
					disabled={rows.length <= 2}
					aria-label={$_('common.delete')}
				>
					<svg
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M18 6 6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
		{/each}
		<button type="button" class="add-btn" onclick={addRow}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<path d="M12 5v14M5 12h14" />
			</svg>
			{$_('rechner.polynomFitUi.addRow')}
		</button>
	</div>

	<!-- Grad-Wahl -->
	<div class="calc-section">
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="degree-sel">
				{$_('rechner.polynomFitUi.degree')}
				<span class="calc-field-hint">{$_('rechner.polynomFitUi.degreeHint')}</span>
			</label>
			<select id="degree-sel" bind:value={degree} class="calc-select">
				<option value={1}>1 — {$_('rechner.polynomFitUi.linear')}</option>
				<option value={2}>2 — {$_('rechner.polynomFitUi.quadratic')}</option>
				<option value={3}>3 — {$_('rechner.polynomFitUi.cubic')}</option>
				<option value={4}>4</option>
				<option value={5}>5</option>
			</select>
		</div>
	</div>

	<!-- Ergebnis -->
	{#if fitResult && 'error' in fitResult}
		<div class="calc-warning">⚠ {fitResult.error}</div>
	{:else if success && fitResult && 'coefficients' in fitResult}
		<div class="calc-result-section">
			<div class="formula-row">
				<span class="formula-label">y =</span>
				<span class="formula-value">{formula}</span>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">R²</span>
				<span
					class="calc-result-value primary"
					style="color: {fitResult.r2 > 0.99
						? '#16a34a'
						: fitResult.r2 > 0.95
							? '#ca8a04'
							: '#ea580c'}"
				>
					{fmt(fitResult.r2, 5)}
				</span>
			</div>
			{#if fitResult.degree !== degree}
				<p class="calc-info" style="color: #ca8a04">
					{$_('rechner.polynomFitUi.degreeReduced', {
						values: { effective: fitResult.degree }
					})}
				</p>
			{/if}
		</div>

		<!-- Koeffizienten-Tabelle -->
		<div class="calc-section">
			<div class="coef-header">
				<h2 class="calc-section-title" style="margin: 0">
					{$_('rechner.polynomFitUi.coefficients')}
				</h2>
				<button type="button" class="copy-btn" onclick={copyCoefficients}>
					{$_('common.copy')}
				</button>
			</div>
			<div class="coef-grid">
				{#each fitResult.coefficients as c, i (i)}
					<div class="coef-row">
						<span class="coef-name">a{subscript(i)}</span>
						<span class="coef-value">{c.toPrecision(8)}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Chart -->
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.polynomFitUi.chart')}</h2>
			<svg viewBox="0 0 {CHART.w} {CHART.h}" class="chart-svg" preserveAspectRatio="xMidYMid meet">
				<!-- Achsen -->
				<line
					x1={CHART.pad}
					y1={CHART.h - CHART.pad}
					x2={CHART.w - CHART.pad}
					y2={CHART.h - CHART.pad}
					stroke="currentColor"
					stroke-width="0.5"
					opacity="0.5"
				/>
				<line
					x1={CHART.pad}
					y1={CHART.pad}
					x2={CHART.pad}
					y2={CHART.h - CHART.pad}
					stroke="currentColor"
					stroke-width="0.5"
					opacity="0.5"
				/>
				<!-- Fit-Kurve -->
				<path d={pathD} fill="none" stroke="#7c3aed" stroke-width="2" />
				<!-- Datenpunkte -->
				{#each validPoints as p, i (i)}
					<circle cx={sx(p.x)} cy={sy(p.y)} r="3.5" fill="#ea580c" />
				{/each}
				<!-- Achsen-Labels -->
				<text
					x={CHART.pad}
					y={CHART.h - CHART.pad + 14}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
				>
					{fmt(xRange.min, 2)}
				</text>
				<text
					x={CHART.w - CHART.pad}
					y={CHART.h - CHART.pad + 14}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
					text-anchor="end"
				>
					{fmt(xRange.max, 2)}
				</text>
				<text
					x={CHART.pad - 6}
					y={CHART.pad + 4}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
					text-anchor="end"
				>
					{fmt(yRange.max, 2)}
				</text>
				<text
					x={CHART.pad - 6}
					y={CHART.h - CHART.pad + 4}
					font-size="9"
					fill="currentColor"
					opacity="0.6"
					text-anchor="end"
				>
					{fmt(yRange.min, 2)}
				</text>
			</svg>
		</div>

		<!-- Auswerten -->
		<div class="calc-section">
			<h2 class="calc-section-title">{$_('rechner.polynomFitUi.evaluate')}</h2>
			<div class="calc-field" style="border-top: none">
				<label class="calc-field-label" for="eval-x">x</label>
				<div class="calc-input-wrap">
					<input id="eval-x" type="number" step="any" bind:value={evalX} class="calc-input" />
				</div>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">y</span>
				<span class="calc-result-value primary">{fmt(evalY ?? 0, 4)}</span>
			</div>
		</div>
	{:else if validPoints.length < 2}
		<p class="calc-info">{$_('rechner.polynomFitUi.needMorePoints')}</p>
	{/if}
</div>

<style>
	.calc-info {
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.row-header {
		display: grid;
		grid-template-columns: 1fr 1fr 2rem;
		gap: 0.5rem;
		padding: 0 0 0.375rem;
		border-bottom: 1px solid var(--border);
		margin-bottom: 0.5rem;
	}
	.row-header span {
		font-size: 0.7rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.row-input {
		display: grid;
		grid-template-columns: 1fr 1fr 2rem;
		gap: 0.5rem;
		align-items: center;
		margin-bottom: 0.375rem;
	}
	.row-input .calc-input {
		width: 100%;
		text-align: left;
	}
	.del-btn {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.del-btn:hover:not(:disabled) {
		color: #dc2626;
	}
	.del-btn:disabled {
		opacity: 0.25;
		cursor: not-allowed;
	}
	.add-btn {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		margin-top: 0.625rem;
		background: none;
		border: 1px dashed var(--border);
		border-radius: 0.5rem;
		padding: 0.5rem 0.875rem;
		font-size: 0.8125rem;
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
		width: 100%;
		justify-content: center;
	}
	.add-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
	.formula-row {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		padding: 0.625rem 0;
		flex-wrap: wrap;
	}
	.formula-label {
		font-size: 0.875rem;
		color: var(--muted);
		flex-shrink: 0;
	}
	.formula-value {
		font-family: ui-monospace, monospace;
		font-size: 0.875rem;
		color: var(--text);
		word-break: break-word;
		line-height: 1.5;
	}
	.coef-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.5rem;
	}
	.copy-btn {
		font-size: 0.6875rem;
		padding: 0.2rem 0.625rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: var(--bg);
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
	}
	.copy-btn:hover {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}
	.coef-grid {
		display: grid;
		gap: 0.25rem;
	}
	.coef-row {
		display: grid;
		grid-template-columns: 3rem 1fr;
		gap: 0.5rem;
		padding: 0.25rem 0;
		font-family: ui-monospace, monospace;
		font-size: 0.8125rem;
	}
	.coef-name {
		color: var(--muted);
	}
	.coef-value {
		color: var(--text);
		word-break: break-all;
	}
	.chart-svg {
		width: 100%;
		height: auto;
		color: var(--muted);
	}
</style>
