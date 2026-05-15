<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';

	type OhmMode = 'R' | 'U' | 'I';
	let ohmMode = $state<OhmMode>('R');
	let ohmU = $state(24);
	let ohmI = $state(0.5);
	let ohmR = $state(100);

	const ohm = $derived.by(() => {
		if (ohmMode === 'R') return { R: ohmU / ohmI,  U: ohmU, I: ohmI };
		if (ohmMode === 'U') return { R: ohmR,          U: ohmR * ohmI, I: ohmI };
		                     return { R: ohmR,          U: ohmU, I: ohmU / ohmR };
	});

	type PMode = 'P' | 'U' | 'I';
	let pMode = $state<PMode>('P');
	let pU = $state(24);
	let pI = $state(2);
	let pP = $state(100);

	const power = $derived.by(() => {
		if (pMode === 'P') return { P: pU * pI,   U: pU, I: pI };
		if (pMode === 'U') return { P: pP,         U: pP / pI, I: pI };
		                   return { P: pP,         U: pU, I: pP / pU };
	});

	let acU = $state(230);
	let acI = $state(1);
	let acCos = $state(0.9);

	const ac = $derived.by(() => {
		const S = acU * acI;
		const P = S * acCos;
		const Q = Math.sqrt(Math.max(0, S * S - P * P));
		return { S, P, Q };
	});

	type IMode = 'dc' | 'ac1' | 'ac3';
	let iMode = $state<IMode>('dc');
	let iP = $state(1000);
	let iU = $state(230);
	let iCos = $state(0.9);

	const currentFromPower = $derived.by(() => {
		if (iMode === 'dc')  return iP / iU;
		if (iMode === 'ac1') return iP / (iU * iCos);
		                     return iP / (Math.sqrt(3) * iU * iCos);
	});

	const stdFuse = [6, 10, 13, 16, 20, 25, 32];
	const recommendedFuse = $derived(
		stdFuse.find(v => v >= currentFromPower * 1.25) ?? null
	);
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
			<h1 class="calc-title">Elektro-Grundrechner</h1>
			<FavButton type="rechner" slug="elektro" title="Elektro-Grundrechner" size={20} />
		</div>
	</header>

	<!-- Ohm -->
	<div class="calc-section">
		<h2 class="calc-section-title">Ohm'sches Gesetz — U = R × I</h2>
		<div class="calc-field" style="border-top:none">
			<label class="calc-field-label" for="ohm-mode">Gesucht</label>
			<select id="ohm-mode" class="calc-select" bind:value={ohmMode}>
				<option value="R">Widerstand R (Ω)</option>
				<option value="U">Spannung U (V)</option>
				<option value="I">Strom I (A)</option>
			</select>
		</div>
		{#if ohmMode !== 'U'}
		<div class="calc-field">
			<label class="calc-field-label" for="ohm-u">Spannung U</label>
			<div class="calc-input-wrap">
				<input id="ohm-u" type="number" class="calc-input" bind:value={ohmU} min="0" step="0.1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>
		{/if}
		{#if ohmMode !== 'I'}
		<div class="calc-field">
			<label class="calc-field-label" for="ohm-i">Strom I</label>
			<div class="calc-input-wrap">
				<input id="ohm-i" type="number" class="calc-input" bind:value={ohmI} min="0.001" step="0.01" />
				<span class="calc-input-unit">A</span>
			</div>
		</div>
		{/if}
		{#if ohmMode !== 'R'}
		<div class="calc-field">
			<label class="calc-field-label" for="ohm-r">Widerstand R</label>
			<div class="calc-input-wrap">
				<input id="ohm-r" type="number" class="calc-input" bind:value={ohmR} min="0.001" step="1" />
				<span class="calc-input-unit">Ω</span>
			</div>
		</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Widerstand R</span>
			<span class="calc-result-value" class:primary={ohmMode === 'R'}>{fmt(ohm.R, 3)}<span class="calc-result-unit">Ω</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Spannung U</span>
			<span class="calc-result-value" class:primary={ohmMode === 'U'}>{fmt(ohm.U, 3)}<span class="calc-result-unit">V</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Strom I</span>
			<span class="calc-result-value" class:primary={ohmMode === 'I'}>{fmt(ohm.I, 3)}<span class="calc-result-unit">A</span></span>
		</div>
	</div>

	<!-- Leistung DC -->
	<div class="calc-section">
		<h2 class="calc-section-title">Leistung DC — P = U × I</h2>
		<div class="calc-field" style="border-top:none">
			<label class="calc-field-label" for="p-mode">Gesucht</label>
			<select id="p-mode" class="calc-select" bind:value={pMode}>
				<option value="P">Leistung P (W)</option>
				<option value="U">Spannung U (V)</option>
				<option value="I">Strom I (A)</option>
			</select>
		</div>
		{#if pMode !== 'U'}
		<div class="calc-field">
			<label class="calc-field-label" for="p-u">Spannung U</label>
			<div class="calc-input-wrap">
				<input id="p-u" type="number" class="calc-input" bind:value={pU} min="0" step="0.1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>
		{/if}
		{#if pMode !== 'I'}
		<div class="calc-field">
			<label class="calc-field-label" for="p-i">Strom I</label>
			<div class="calc-input-wrap">
				<input id="p-i" type="number" class="calc-input" bind:value={pI} min="0" step="0.1" />
				<span class="calc-input-unit">A</span>
			</div>
		</div>
		{/if}
		{#if pMode !== 'P'}
		<div class="calc-field">
			<label class="calc-field-label" for="p-p">Leistung P</label>
			<div class="calc-input-wrap">
				<input id="p-p" type="number" class="calc-input" bind:value={pP} min="0" step="1" />
				<span class="calc-input-unit">W</span>
			</div>
		</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Leistung P</span>
			<span class="calc-result-value" class:primary={pMode === 'P'}>{fmt(power.P, 3)}<span class="calc-result-unit">W</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Spannung U</span>
			<span class="calc-result-value" class:primary={pMode === 'U'}>{fmt(power.U, 3)}<span class="calc-result-unit">V</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Strom I</span>
			<span class="calc-result-value" class:primary={pMode === 'I'}>{fmt(power.I, 3)}<span class="calc-result-unit">A</span></span>
		</div>
	</div>

	<!-- Leistung AC -->
	<div class="calc-section">
		<h2 class="calc-section-title">Leistung AC — Wirk / Blind / Schein</h2>
		<div class="calc-field" style="border-top:none">
			<label class="calc-field-label" for="ac-u">Spannung U</label>
			<div class="calc-input-wrap">
				<input id="ac-u" type="number" class="calc-input" bind:value={acU} min="0" step="1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="ac-i">Strom I</label>
			<div class="calc-input-wrap">
				<input id="ac-i" type="number" class="calc-input" bind:value={acI} min="0" step="0.1" />
				<span class="calc-input-unit">A</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="ac-cos">Leistungsfaktor cos φ</label>
			<div class="calc-input-wrap">
				<input id="ac-cos" type="number" class="calc-input" bind:value={acCos} min="0.1" max="1" step="0.01" />
				<span class="calc-input-unit">—</span>
			</div>
		</div>
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Wirkleistung P</span>
			<span class="calc-result-value primary">{fmt(ac.P, 3)}<span class="calc-result-unit">W</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Blindleistung Q</span>
			<span class="calc-result-value">{fmt(ac.Q, 3)}<span class="calc-result-unit">var</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Scheinleistung S</span>
			<span class="calc-result-value">{fmt(ac.S, 3)}<span class="calc-result-unit">VA</span></span>
		</div>
	</div>

	<!-- Strom aus Leistung -->
	<div class="calc-section">
		<h2 class="calc-section-title">Strom aus Leistung + Absicherung</h2>
		<div class="calc-field" style="border-top:none">
			<label class="calc-field-label" for="i-mode">Schaltung</label>
			<select id="i-mode" class="calc-select" bind:value={iMode}>
				<option value="dc">DC — I = P / U</option>
				<option value="ac1">AC 1-phasig — I = P / (U × cos φ)</option>
				<option value="ac3">AC 3-phasig — I = P / (√3 × U × cos φ)</option>
			</select>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="i-p">Leistung P</label>
			<div class="calc-input-wrap">
				<input id="i-p" type="number" class="calc-input" bind:value={iP} min="0" step="10" />
				<span class="calc-input-unit">W</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="i-u">Spannung U</label>
			<div class="calc-input-wrap">
				<input id="i-u" type="number" class="calc-input" bind:value={iU} min="1" step="1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>
		{#if iMode !== 'dc'}
		<div class="calc-field">
			<label class="calc-field-label" for="i-cos">Leistungsfaktor cos φ</label>
			<div class="calc-input-wrap">
				<input id="i-cos" type="number" class="calc-input" bind:value={iCos} min="0.1" max="1" step="0.01" />
				<span class="calc-input-unit">—</span>
			</div>
		</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">Strom I</span>
			<span class="calc-result-value primary">{fmt(currentFromPower, 3)}<span class="calc-result-unit">A</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">Empfohlene Absicherung</span>
			<span class="calc-result-value">{recommendedFuse ?? '> 32'}<span class="calc-result-unit">A</span></span>
		</div>
	</div>
	<p class="calc-info">Absicherung = nächst höherer Normwert (6–32 A) bei I × 1.25 (80%-Regel nach NIN/VDE)</p>
</div>
