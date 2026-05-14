<script lang="ts">
	import { dewPoint, absHumidity, fmt } from '$lib/rechner/_shared';

	let temperature = $state(22);
	let rh = $state(50);

	const result = $derived.by(() => {
		const dp = dewPoint(temperature, rh);
		const x = absHumidity(temperature, rh);
		const spread = temperature - dp;
		return { dp, x, spread };
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
		<h1 class="calc-title">Taupunkt</h1>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Eingabe</h2>
		<div class="calc-field">
			<label class="calc-field-label" for="t-input">
				Lufttemperatur
			</label>
			<div class="calc-input-wrap">
				<input id="t-input" type="number" step="0.5" bind:value={temperature} class="calc-input" />
				<span class="calc-input-unit">°C</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="rh-input">
				Relative Feuchte
			</label>
			<div class="calc-input-wrap">
				<input id="rh-input" type="number" step="1" min="0" max="100" bind:value={rh} class="calc-input" />
				<span class="calc-input-unit">%</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Taupunkt</span>
			<span class="calc-result-value primary">{fmt(result.dp, 1)}<span class="calc-result-unit">°C</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Absolute Feuchte</span>
			<span class="calc-result-value">{fmt(result.x, 2)}<span class="calc-result-unit">g/kg</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Spreizung T − Taupunkt</span>
			<span class="calc-result-value">{fmt(result.spread, 1)}<span class="calc-result-unit">K</span></span>
		</div>
	</div>

	{#if result.spread < 3}
		<div class="calc-warning">
			⚠ Kondensationsgefahr: Oberflächentemperatur unter ca. {fmt(result.dp + 3, 1)} °C kann zu Tauwasser führen.
		</div>
	{/if}

	<p class="calc-info">
		Berechnet nach Magnus-Formel (Konstanten a = 17.62, b = 243.12 °C). Gültig im Bereich −45 … +60 °C über Wasser.
	</p>
</div>
