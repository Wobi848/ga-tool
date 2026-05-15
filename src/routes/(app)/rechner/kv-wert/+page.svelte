<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	type Mode = 'kv-from-qdp' | 'dp-from-qkv' | 'q-from-kvdp';

	let mode: Mode = $state('kv-from-qdp');
	let flow = $state(1.0); // m³/h
	let dp = $state(0.2); // bar
	let kv = $state(2.5); // m³/h @ 1 bar

	// Kv [m³/h] = Q [m³/h] × √(1 / Δp [bar])  →  Q = Kv × √Δp  →  Δp = (Q/Kv)²
	const result = $derived.by(() => {
		if (mode === 'kv-from-qdp') {
			const kvCalc = flow / Math.sqrt(dp);
			return { kv: kvCalc, q: flow, dp };
		}
		if (mode === 'dp-from-qkv') {
			const dpCalc = Math.pow(flow / kv, 2);
			return { kv, q: flow, dp: dpCalc };
		}
		// q-from-kvdp
		const qCalc = kv * Math.sqrt(dp);
		return { kv, q: qCalc, dp };
	});

	// Standard Kvs sizes for valve selection
	const stdKvs = [0.25, 0.4, 0.63, 1.0, 1.6, 2.5, 4.0, 6.3, 10, 16, 25, 40, 63, 100];

	const recommendedKvs = $derived.by(() => {
		const target = result.kv;
		return stdKvs.find((k) => k >= target * 1.1) ?? stdKvs[stdKvs.length - 1];
	});

	const authority = $derived.by(() => {
		// Ventilautorität a = Δp_Ventil / Δp_gesamt (Strecke)
		// Hier: bei dpCalc und Δp_gesamt typisch 0.5 bar im Heizkreis
		const dpRef = 0.5;
		return result.dp / dpRef;
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
		<div class="calc-title-row">
			<h1 class="calc-title">Kv-Wert</h1>
			<FavButton type="rechner" slug="kv-wert" title="Kv-Wert" size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">Modus</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel">Berechnen</label>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="kv-from-qdp">Kv aus V̇ + Δp</option>
				<option value="dp-from-qkv">Δp aus V̇ + Kv</option>
				<option value="q-from-kvdp">V̇ aus Kv + Δp</option>
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">Eingabe</h2>
		{#if mode !== 'q-from-kvdp'}
			<div class="calc-field">
				<label class="calc-field-label" for="flow-in">Volumenstrom V̇</label>
				<div class="calc-input-wrap">
					<input id="flow-in" type="number" step="0.1" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'dp-from-qkv'}
			<div class="calc-field">
				<label class="calc-field-label" for="dp-in">Druckdifferenz Δp</label>
				<div class="calc-input-wrap">
					<input id="dp-in" type="number" step="0.05" min="0" bind:value={dp} class="calc-input" />
					<span class="calc-input-unit">bar</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'kv-from-qdp'}
			<div class="calc-field">
				<label class="calc-field-label" for="kv-in">Kv-Wert</label>
				<div class="calc-input-wrap">
					<input id="kv-in" type="number" step="0.1" min="0" bind:value={kv} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Kv-Wert</span>
			<span class="calc-result-value" class:primary={mode === 'kv-from-qdp'}>
				{fmt(result.kv, 2)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Volumenstrom V̇</span>
			<span class="calc-result-value" class:primary={mode === 'q-from-kvdp'}>
				{fmt(result.q, 2)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Druckdifferenz Δp</span>
			<span class="calc-result-value" class:primary={mode === 'dp-from-qkv'}>
				{fmt(result.dp, 3)}<span class="calc-result-unit">bar</span>
			</span>
		</div>
		{#if mode === 'kv-from-qdp'}
			<div class="calc-result">
				<span class="calc-result-label">Empfohlene Kvs (nächste Norm)</span>
				<span class="calc-result-value">{recommendedKvs}<span class="calc-result-unit">m³/h</span></span>
			</div>
		{/if}
	</div>

	{#if authority < 0.3}
		<div class="calc-warning">
			⚠ Geringe Ventilautorität (a ≈ {fmt(authority, 2)}). Für saubere Regelung sollte a ≥ 0.3 sein — Ventil ist evtl. zu gross gewählt.
		</div>
	{/if}

	<p class="calc-info">
		Formel: Kv = V̇ × √(1 / Δp), Wasser bei 20 °C. <br />
		Standard-Kvs nach DIN EN 1267: {stdKvs.join(' · ')}
	</p>
</div>
