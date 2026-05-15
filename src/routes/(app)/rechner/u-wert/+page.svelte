<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	// Schicht-Aufbau
	type Layer = { label: string; lambda: number; thickness: number };

	const materialPresets: { label: string; lambda: number }[] = [
		{ label: 'Beton (dicht)', lambda: 2.1 },
		{ label: 'Vollziegel', lambda: 0.68 },
		{ label: 'Leichtbeton', lambda: 0.56 },
		{ label: 'Kalksandstein', lambda: 0.99 },
		{ label: 'Porenbeton (0.4)', lambda: 0.16 },
		{ label: 'Mineralwolle', lambda: 0.035 },
		{ label: 'EPS (Styropor)', lambda: 0.04 },
		{ label: 'XPS (Styrodur)', lambda: 0.035 },
		{ label: 'Holz (Fichte)', lambda: 0.13 },
		{ label: 'Holzfaserplatte', lambda: 0.05 },
		{ label: 'Gipskarton', lambda: 0.25 },
		{ label: 'Estrich / Zement', lambda: 1.4 },
		{ label: 'Parkett / Holzboden', lambda: 0.14 },
		{ label: 'Keramik / Fliesen', lambda: 1.3 },
		{ label: 'Glaswolle', lambda: 0.04 },
		{ label: 'PUR-Schaum', lambda: 0.025 },
		{ label: 'Luftspalt (ruhend)', lambda: 0.13 },
	];

	// Rsi / Rse Presets
	type Surface = { label: string; rsi: number; rse: number };
	const surfacePresets: Record<string, Surface> = {
		'wand-aussen':    { label: 'Aussenwand',        rsi: 0.13, rse: 0.04 },
		'wand-innen':     { label: 'Innenwand',          rsi: 0.13, rse: 0.13 },
		'dach-aussen':    { label: 'Dach (aussen)',      rsi: 0.10, rse: 0.04 },
		'boden-erdreich': { label: 'Boden gg. Erdreich', rsi: 0.17, rse: 0.00 },
		'boden-aussen':   { label: 'Boden gg. Aussenluft', rsi: 0.17, rse: 0.04 },
		'custom':         { label: 'Benutzerdefiniert',  rsi: 0.13, rse: 0.04 },
	};

	let surfaceKey = $state('wand-aussen');
	let rsi = $state(0.13);
	let rse = $state(0.04);

	$effect(() => {
		const p = surfacePresets[surfaceKey];
		if (surfaceKey !== 'custom') {
			rsi = p.rsi;
			rse = p.rse;
		}
	});

	let layers: Layer[] = $state([
		{ label: 'Aussenputz', lambda: 0.87, thickness: 20 },
		{ label: 'Vollziegel', lambda: 0.68, thickness: 240 },
		{ label: 'Mineralwolle', lambda: 0.035, thickness: 120 },
		{ label: 'Innenputz', lambda: 0.87, thickness: 15 },
	]);

	function addLayer() {
		layers = [...layers, { label: 'Neue Schicht', lambda: 0.04, thickness: 100 }];
	}

	function removeLayer(i: number) {
		layers = layers.filter((_, idx) => idx !== i);
	}

	function setMaterial(i: number, lambda: number) {
		layers = layers.map((l, idx) => idx === i ? { ...l, lambda } : l);
	}

	const result = $derived.by(() => {
		const rt = layers.reduce((sum, l) => sum + (l.thickness / 1000) / l.lambda, 0);
		const r_total = rsi + rt + rse;
		const u = r_total > 0 ? 1 / r_total : 0;
		const d_total = layers.reduce((sum, l) => sum + l.thickness, 0);
		return { rt, r_total, u, d_total };
	});

	// SIA 380/1 Grenzwerte
	const limits = [
		{ label: 'Aussenwand Neubau (SIA 380/1)',     u: 0.17 },
		{ label: 'Flachdach Neubau',                   u: 0.15 },
		{ label: 'Estrichboden/Kellerdecke',            u: 0.20 },
		{ label: 'Fenster (empfohlen)',                 u: 0.90 },
		{ label: 'Minergie-Standard Wand',              u: 0.12 },
	];
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
			<h1 class="calc-title">U-Wert</h1>
			<FavButton type="rechner" slug="u-wert" title="U-Wert" size={20} />
		</div>
	</header>

	<!-- Bauteiltyp -->
	<div class="calc-section">
		<h2 class="calc-section-title">Bauteiltyp (Wärmeübergangswiderstände)</h2>
		<div class="surface-grid">
			{#each Object.entries(surfacePresets) as [k, v]}
				<button
					class="surface-btn"
					class:active={surfaceKey === k}
					onclick={() => surfaceKey = k}
				>{v.label}</button>
			{/each}
		</div>
		{#if surfaceKey === 'custom'}
		<div class="rsi-row">
			<div class="calc-field" style="border: none; padding: 0">
				<label class="calc-field-label" for="rsi-in">Rsi (innen)</label>
				<div class="calc-input-wrap">
					<input id="rsi-in" type="number" step="0.01" min="0" bind:value={rsi} class="calc-input" />
					<span class="calc-input-unit">m²K/W</span>
				</div>
			</div>
			<div class="calc-field" style="border: none; padding: 0">
				<label class="calc-field-label" for="rse-in">Rse (aussen)</label>
				<div class="calc-input-wrap">
					<input id="rse-in" type="number" step="0.01" min="0" bind:value={rse} class="calc-input" />
					<span class="calc-input-unit">m²K/W</span>
				</div>
			</div>
		</div>
		{:else}
		<p class="rsi-info">Rsi = {rsi} m²K/W · Rse = {rse} m²K/W (nach SIA 180 / EN ISO 6946)</p>
		{/if}
	</div>

	<!-- Schichten -->
	<div class="calc-section">
		<h2 class="calc-section-title">Schichtaufbau (von innen nach aussen)</h2>
		{#each layers as layer, i}
		<div class="layer-row">
			<div class="layer-index">{i + 1}</div>
			<div class="layer-fields">
				<input
					type="text"
					bind:value={layer.label}
					class="layer-name"
					placeholder="Bezeichnung"
				/>
				<div class="layer-nums">
					<div class="layer-num-group">
						<span class="layer-num-label">λ</span>
						<select class="layer-lambda-sel" onchange={(e) => setMaterial(i, parseFloat((e.target as HTMLSelectElement).value))}>
							<option value="">Preset…</option>
							{#each materialPresets as m}
								<option value={m.lambda}>{m.label}</option>
							{/each}
						</select>
						<input type="number" step="0.001" min="0.001" bind:value={layer.lambda} class="layer-num-input" />
						<span class="layer-num-unit">W/(mK)</span>
					</div>
					<div class="layer-num-group">
						<span class="layer-num-label">d</span>
						<input type="number" step="10" min="1" bind:value={layer.thickness} class="layer-num-input" />
						<span class="layer-num-unit">mm</span>
					</div>
					<span class="layer-r">R = {fmt((layer.thickness / 1000) / layer.lambda, 3)}</span>
				</div>
			</div>
			<button class="layer-remove" onclick={() => removeLayer(i)} title="Schicht entfernen" aria-label="Entfernen">×</button>
		</div>
		{/each}
		<button class="add-layer-btn" onclick={addLayer}>+ Schicht hinzufügen</button>
	</div>

	<!-- Ergebnis -->
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">U-Wert</span>
			<span class="calc-result-value primary"
				style="color: {result.u < 0.20 ? '#16a34a' : result.u < 0.40 ? '#ca8a04' : '#dc2626'}">
				{fmt(result.u, 3)}<span class="calc-result-unit">W/(m²K)</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Gesamtwiderstand R<sub>T</sub></span>
			<span class="calc-result-value">{fmt(result.r_total, 3)}<span class="calc-result-unit">m²K/W</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Wandaufbau (ohne Putz)</span>
			<span class="calc-result-value">{result.d_total}<span class="calc-result-unit">mm</span></span>
		</div>
	</div>

	<!-- Vergleich SIA 380/1 -->
	<div class="calc-section">
		<h2 class="calc-section-title">Vergleich Grenzwerte (SIA 380/1 · Minergie)</h2>
		{#each limits as lim}
		<div class="limit-row">
			<span class="limit-label">{lim.label}</span>
			<span class="limit-val">{lim.u} W/(m²K)</span>
			<span class="limit-badge" class:ok={result.u <= lim.u} class:nok={result.u > lim.u}>
				{result.u <= lim.u ? '✓' : '✗'}
			</span>
		</div>
		{/each}
	</div>

	<p class="calc-info">
		U = 1 / (Rsi + Σ(d/λ) + Rse) nach SIA 180 / EN ISO 6946.
		Wärmebrücken und Befestigungen sind nicht berücksichtigt.
	</p>
</div>

<style>
	.surface-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.375rem;
		margin-bottom: 0.75rem;
	}

	.surface-btn {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.5rem;
		padding: 0.4rem 0.5rem;
		font-family: inherit;
		font-size: 0.75rem;
		color: var(--muted);
		cursor: pointer;
		text-align: center;
		transition: border-color 0.15s, color 0.15s;
	}

	.surface-btn.active {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 8%, transparent);
	}

	.rsi-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.rsi-info {
		font-size: 0.75rem;
		color: var(--muted);
		margin-top: 0.25rem;
	}

	/* Layers */
	.layer-row {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--border);
	}

	.layer-index {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background: var(--surface-hover);
		color: var(--muted);
		font-size: 0.7rem;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		margin-top: 0.25rem;
	}

	.layer-fields {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.layer-name {
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		width: 100%;
	}

	.layer-name:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.layer-nums {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	.layer-num-group {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.layer-num-label {
		font-size: 0.75rem;
		color: var(--muted);
		font-weight: 600;
		width: 1rem;
	}

	.layer-lambda-sel {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.2rem 0.3rem;
		font-size: 0.7rem;
		color: var(--muted);
		font-family: inherit;
		max-width: 7rem;
	}

	.layer-num-input {
		width: 4.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.2rem 0.4rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		text-align: right;
	}

	.layer-num-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.layer-num-unit {
		font-size: 0.7rem;
		color: var(--muted);
		white-space: nowrap;
	}

	.layer-r {
		font-size: 0.75rem;
		color: var(--muted);
		font-family: ui-monospace, monospace;
		margin-left: auto;
	}

	.layer-remove {
		background: none;
		border: none;
		color: var(--muted);
		cursor: pointer;
		font-size: 1.1rem;
		line-height: 1;
		padding: 0.2rem;
		transition: color 0.15s;
		flex-shrink: 0;
	}

	.layer-remove:hover { color: #dc2626; }

	.add-layer-btn {
		width: 100%;
		margin-top: 0.5rem;
		padding: 0.5rem;
		background: transparent;
		border: 1px dashed var(--border);
		border-radius: 0.5rem;
		color: var(--muted);
		font-family: inherit;
		font-size: 0.875rem;
		cursor: pointer;
		transition: border-color 0.15s, color 0.15s;
	}

	.add-layer-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	/* Limits */
	.limit-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--border);
		font-size: 0.8125rem;
	}

	.limit-label { flex: 1; color: var(--muted); }

	.limit-val {
		font-family: ui-monospace, monospace;
		font-size: 0.8125rem;
		color: var(--text);
	}

	.limit-badge {
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 700;
		flex-shrink: 0;
	}

	.limit-badge.ok  { background: #16a34a20; color: #16a34a; }
	.limit-badge.nok { background: #dc262620; color: #dc2626; }
</style>
