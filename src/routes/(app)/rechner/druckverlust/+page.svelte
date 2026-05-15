<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	// Inputs
	let flow = $state(1.0); // m³/h
	let length = $state(20); // m (Rohrlänge gesamt Vor- + Rücklauf)
	let dn = $state<'DN15' | 'DN20' | 'DN25' | 'DN32' | 'DN40' | 'DN50'>('DN20');
	let zetaSum = $state(15); // Σζ Einzelwiderstände
	let medium = $state<'wasser' | 'sole30'>('wasser');

	// Innendurchmesser + Rauhigkeit
	const pipes: Record<string, { di: number; label: string }> = {
		DN15: { di: 16, label: 'DN 15 (Innen-Ø 16 mm)' },
		DN20: { di: 21.6, label: 'DN 20 (21.6 mm)' },
		DN25: { di: 27.2, label: 'DN 25 (27.2 mm)' },
		DN32: { di: 35.9, label: 'DN 32 (35.9 mm)' },
		DN40: { di: 41.8, label: 'DN 40 (41.8 mm)' },
		DN50: { di: 53, label: 'DN 50 (53 mm)' }
	};

	const mediaProps: Record<string, { rho: number; nu: number; label: string }> = {
		wasser: { rho: 998, nu: 1.0e-6, label: 'Wasser 20 °C' },
		sole30: { rho: 1050, nu: 3.5e-6, label: 'Sole 30 % @ 20 °C' }
	};

	const result = $derived.by(() => {
		const { di } = pipes[dn];
		const { rho, nu } = mediaProps[medium];
		const k = 0.045e-3; // Rauhigkeit Stahl (m)

		const A = Math.PI * Math.pow(di / 1000, 2) / 4; // m²
		const v = flow / 3600 / A; // m/s
		const Re = (v * (di / 1000)) / nu;

		// Colebrook-White, approximation by Swamee-Jain
		const term = k / (3.7 * (di / 1000)) + 5.74 / Math.pow(Re, 0.9);
		const lambda = Re < 2300
			? 64 / Re // laminar
			: 0.25 / Math.pow(Math.log10(term), 2);

		// Druckverlust pro m: R [Pa/m] = λ × (1/d) × (ρ × v²)/2
		const R = (lambda / (di / 1000)) * ((rho * v * v) / 2);
		const dpL = R * length; // Pa (Reibung)
		const dpZ = zetaSum * ((rho * v * v) / 2); // Pa (Einzelwid.)
		const dpTotal = dpL + dpZ;

		return { v, Re, lambda, R, dpL, dpZ, dpTotal };
	});

	const vTooHigh = $derived(result.v > 1.5);
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
			<h1 class="calc-title">Druckverlust Rohrnetz</h1>
			<FavButton type="rechner" slug="druckverlust" title="Druckverlust Rohrnetz" size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Strömung</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="flow-in">Volumenstrom V̇</label>
			<div class="calc-input-wrap">
				<input id="flow-in" type="number" step="0.1" min="0" bind:value={flow} class="calc-input" />
				<span class="calc-input-unit">m³/h</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="med-sel">Medium</label>
			<select id="med-sel" bind:value={medium} class="calc-select">
				{#each Object.entries(mediaProps) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">Rohrnetz</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="dn-sel">Nennweite</label>
			<select id="dn-sel" bind:value={dn} class="calc-select">
				{#each Object.entries(pipes) as [k, v]}
					<option value={k}>{v.label}</option>
				{/each}
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="l-in">
				Rohrlänge gesamt
				<span class="calc-field-hint">Vor- + Rücklauf, ungefähre Summe</span>
			</label>
			<div class="calc-input-wrap">
				<input id="l-in" type="number" step="1" min="0" bind:value={length} class="calc-input" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="z-in">
				Σζ Einzelwiderstände
				<span class="calc-field-hint">Bögen, T-Stücke, Ventile (typisch 10–25)</span>
			</label>
			<div class="calc-input-wrap">
				<input id="z-in" type="number" step="1" min="0" bind:value={zetaSum} class="calc-input" />
				<span class="calc-input-unit">—</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Gesamtdruckverlust Δp</span>
			<span class="calc-result-value primary">{fmt(result.dpTotal / 100, 1)}<span class="calc-result-unit">mbar</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">… davon Reibung Δp_L</span>
			<span class="calc-result-value">{fmt(result.dpL / 100, 1)}<span class="calc-result-unit">mbar</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">… davon Einzelwid. Δp_Z</span>
			<span class="calc-result-value">{fmt(result.dpZ / 100, 1)}<span class="calc-result-unit">mbar</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Strömungsgeschwindigkeit v</span>
			<span class="calc-result-value">{fmt(result.v, 2)}<span class="calc-result-unit">m/s</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Druckgefälle R</span>
			<span class="calc-result-value">{fmt(result.R, 0)}<span class="calc-result-unit">Pa/m</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Reynolds-Zahl Re</span>
			<span class="calc-result-value">{fmt(result.Re, 0)}</span>
		</div>
	</div>

	{#if vTooHigh}
		<div class="calc-warning">
			⚠ Geschwindigkeit {fmt(result.v, 2)} m/s über Empfehlung. Üblich für Heizung: 0.5–1.2 m/s. Risiko: Geräusche + Erosion. Grössere Nennweite wählen.
		</div>
	{/if}
	{#if result.v < 0.2 && flow > 0}
		<div class="calc-warning">
			⚠ Strömung sehr langsam ({fmt(result.v, 2)} m/s). Risiko Luftansammlung. Rohr ist evtl. überdimensioniert.
		</div>
	{/if}

	<p class="calc-info">
		Druckverlust-Formel: Δp = (λ × L/d + Σζ) × ρ × v² / 2. <br />
		Reibungsbeiwert λ: laminar (Re &lt; 2300) = 64/Re, turbulent: Swamee-Jain-Approx. mit k = 0.045 mm (Stahl).
	</p>
</div>
