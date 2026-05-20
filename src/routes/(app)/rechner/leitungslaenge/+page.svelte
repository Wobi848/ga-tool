<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	const RHO_CU = 0.0178; // Ω·mm²/m bei 20°C

	type Mode = 'spannungsfall' | 'max-laenge' | 'querschnitt';
	let mode = $state<Mode>('spannungsfall');

	let uSource    = $state(24);
	let uMinDevice = $state(20.4);
	let length     = $state(50);
	let current    = $state(0.5);
	let crossSection = $state(0.75);
	let powerW     = $state(0);
	let useWatt    = $state(false);

	const stdSections = [0.5, 0.75, 1.0, 1.5, 2.5, 4.0];
	const ampacity: Record<number, number> = { 0.5: 8, 0.75: 12, 1.0: 15, 1.5: 17, 2.5: 23, 4.0: 31 };

	let deviceCount = $state(1);
	// 'end' = alle am Ende (worst case), 'dist' = gleichmässig verteilt (Faktor 0.5)
	type Placement = 'end' | 'dist';
	let placement = $state<Placement>('end');

	const IperDevice = $derived(useWatt ? powerW / uSource : current);
	const I = $derived(IperDevice * deviceCount);
	// Effektiver Strom für Spannungsfall je nach Verteilung
	const Ieff = $derived(placement === 'end' ? I : I * 0.5);

	const deltaU   = $derived((2 * length * RHO_CU * Ieff) / crossSection);
	const uEnd     = $derived(uSource - deltaU);
	const dropPct  = $derived((deltaU / uSource) * 100);
	const rTotal   = $derived((2 * length * RHO_CU) / crossSection);

	const uDropMax  = $derived(uSource - uMinDevice);
	// Max Länge: Ieff abhängig von placement → löse nach L auf
	const maxLength = $derived(Ieff > 0 ? (uDropMax * crossSection) / (2 * RHO_CU * Ieff) : 0);

	const reqSection = $derived(Ieff > 0 ? (2 * length * RHO_CU * Ieff) / uDropMax : 0);
	const recSection = $derived(stdSections.find(s => s >= reqSection) ?? stdSections[stdSections.length - 1]);

	const voltOk   = $derived(uEnd >= uMinDevice);
	const currentOk = $derived(I <= (ampacity[crossSection] ?? 99));

	interface Preset { labelKey: string; uMin: number; iTyp: number; }
	const presetsData: Preset[] = [
		{ labelKey: '24V DC (85%)',                              uMin: 20.4,  iTyp: 0.5   },
		{ labelKey: '24V DC (80%)',                              uMin: 19.2,  iTyp: 0.5   },
		{ labelKey: 'rechner.leitungslaengeUi.presetKNX',       uMin: 21.0,  iTyp: 0.025 },
		{ labelKey: 'BACnet MSTP',                              uMin: 20.0,  iTyp: 0.15  },
		{ labelKey: 'rechner.leitungslaengeUi.presetRS485',     uMin: 10.0,  iTyp: 0.1   },
		{ labelKey: 'rechner.leitungslaengeUi.presetDALI',      uMin: 16.0,  iTyp: 0.25  },
		{ labelKey: 'rechner.leitungslaengeUi.presetActuator',  uMin: 19.2,  iTyp: 1.0   },
	];
	const presets = $derived(presetsData.map(p => ({
		...p,
		label: p.labelKey.startsWith('rechner.') ? $_(p.labelKey) : p.labelKey
	})));

	function applyPreset(p: Preset) {
		uMinDevice = p.uMin;
		if (!useWatt) current = p.iTyp;
	}
</script>

<div class="calc-page">
	<header class="calc-header">
		<a href="/rechner" class="calc-back">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			{$_('common.allCalculators')}
		</a>
		<div class="calc-title-row">
			<h1 class="calc-title">{$_('rechner.leitungslaenge.name')}</h1>
			<FavButton type="rechner" slug="leitungslaenge" title={$_('rechner.leitungslaenge.name')} size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.leitungslaengeUi.calculation')}</h2>
		<div class="calc-field" style="border-top:none">
			<label class="calc-field-label" for="mode-sel">{$_('rechner.leitungslaengeUi.find')}</label>
			<select id="mode-sel" class="calc-select" bind:value={mode}>
				<option value="spannungsfall">{$_('rechner.leitungslaengeUi.voltDropAtLength')}</option>
				<option value="max-laenge">{$_('rechner.leitungslaengeUi.maxLength')}</option>
				<option value="querschnitt">{$_('rechner.leitungslaengeUi.minCrossSection')}</option>
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.leitungslaengeUi.parameters')}</h2>

		<div class="calc-field" style="border-top:none">
			<span class="calc-field-label">{$_('rechner.leitungslaengeUi.devicePreset')}
				<span class="calc-field-hint">{$_('rechner.leitungslaengeUi.presetHint')}</span>
			</span>
		</div>
		<div class="preset-wrap">
			{#each presets as p}
				<button type="button" class="preset-btn" onclick={() => applyPreset(p)}>{p.label}</button>
			{/each}
		</div>

		<div class="calc-field">
			<label class="calc-field-label" for="u-source">{$_('rechner.leitungslaengeUi.sourceVoltage')}</label>
			<div class="calc-input-wrap">
				<input id="u-source" type="number" class="calc-input" bind:value={uSource} min="1" max="690" step="1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>
		<div class="calc-field">
			<label class="calc-field-label" for="u-min">{$_('rechner.leitungslaengeUi.minVoltageDevice')}</label>
			<div class="calc-input-wrap">
				<input id="u-min" type="number" class="calc-input" bind:value={uMinDevice} min="1" step="0.1" />
				<span class="calc-input-unit">V</span>
			</div>
		</div>

		<div class="calc-field">
			<span class="calc-field-label">{$_('rechner.leitungslaengeUi.inputAs')}</span>
			<div class="seg-wrap">
				<button type="button" class="seg-btn" class:seg-active={!useWatt} onclick={() => useWatt = false}>{$_('rechner.leitungslaengeUi.currentA')}</button>
				<button type="button" class="seg-btn" class:seg-active={useWatt}  onclick={() => useWatt = true}>{$_('rechner.leitungslaengeUi.powerW')}</button>
			</div>
		</div>

		{#if useWatt}
		<div class="calc-field">
			<label class="calc-field-label" for="pow-w">{$_('rechner.leitungslaengeUi.powerPerDevice')}</label>
			<div class="calc-input-wrap">
				<input id="pow-w" type="number" class="calc-input" bind:value={powerW} min="0" step="1" />
				<span class="calc-input-unit">W</span>
			</div>
		</div>
		{:else}
		<div class="calc-field">
			<label class="calc-field-label" for="curr">{$_('rechner.leitungslaengeUi.currentPerDevice')}</label>
			<div class="calc-input-wrap">
				<input id="curr" type="number" class="calc-input" bind:value={current} min="0" step="0.01" />
				<span class="calc-input-unit">A</span>
			</div>
		</div>
		{/if}

		<div class="calc-field">
			<label class="calc-field-label" for="dev-count">{$_('rechner.leitungslaengeUi.deviceCount')}
				<span class="calc-field-hint">{$_('rechner.leitungslaengeUi.totalCurrentHint', { values: { i: fmt(I, 3) } })}</span>
			</label>
			<div class="calc-input-wrap">
				<input id="dev-count" type="number" class="calc-input" bind:value={deviceCount} min="1" max="100" step="1" />
				<span class="calc-input-unit">{$_('rechner.leitungslaengeUi.pcs')}</span>
			</div>
		</div>

		<div class="calc-field">
			<span class="calc-field-label">{$_('rechner.leitungslaengeUi.devicePlacement')}
				<span class="calc-field-hint">{placement === 'end' ? $_('rechner.leitungslaengeUi.placementEndHint') : $_('rechner.leitungslaengeUi.placementDistHint')}</span>
			</span>
			<div class="seg-wrap">
				<button type="button" class="seg-btn" class:seg-active={placement === 'end'}  onclick={() => placement = 'end'}>{$_('rechner.leitungslaengeUi.atEnd')}</button>
				<button type="button" class="seg-btn" class:seg-active={placement === 'dist'} onclick={() => placement = 'dist'}>{$_('rechner.leitungslaengeUi.distributed')}</button>
			</div>
		</div>

		{#if mode !== 'max-laenge'}
		<div class="calc-field">
			<label class="calc-field-label" for="len">{$_('rechner.leitungslaengeUi.lineLength')}</label>
			<div class="calc-input-wrap">
				<input id="len" type="number" class="calc-input" bind:value={length} min="1" step="1" />
				<span class="calc-input-unit">m</span>
			</div>
		</div>
		{/if}

		{#if mode !== 'querschnitt'}
		<div class="calc-field">
			<label class="calc-field-label" for="sect">{$_('rechner.leitungslaengeUi.crossSection')}</label>
			<div class="calc-input-wrap">
				<select id="sect" class="calc-select" bind:value={crossSection}>
					{#each stdSections as s}
						<option value={s}>{s} mm²</option>
					{/each}
				</select>
			</div>
		</div>
		{/if}
	</div>

	<!-- ── Voltage drop result ── -->
	{#if mode === 'spannungsfall'}
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.voltDrop')}</span>
			<span class="calc-result-value primary">{fmt(deltaU, 3)}<span class="calc-result-unit">V</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.voltageAtDevice')}</span>
			<span class="calc-result-value" style="color:{voltOk ? 'var(--color-ok,#16a34a)' : '#dc2626'}">{fmt(uEnd, 3)}<span class="calc-result-unit">V</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.voltDropPct')}</span>
			<span class="calc-result-value">{fmt(dropPct, 2)}<span class="calc-result-unit">%</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.cableResistance')}</span>
			<span class="calc-result-value">{fmt(rTotal, 3)}<span class="calc-result-unit">Ω</span></span>
		</div>
	</div>

	{#if !voltOk}
		<div class="calc-warning">⚠ {$_('rechner.leitungslaengeUi.warnVoltageLow', { values: { u: fmt(uEnd,2), umin: uMinDevice } })}</div>
	{/if}
	{#if !currentOk}
		<div class="calc-warning">⚠ {$_('rechner.leitungslaengeUi.warnCurrentHigh', { values: { i: fmt(I,2), imax: ampacity[crossSection], cs: crossSection } })}</div>
	{/if}
	<p class="calc-info">{$_('rechner.leitungslaengeUi.infoCalc', { values: { rho: RHO_CU, l: length * 2, i: fmt(Ieff, 3), placement: placement === 'end' ? $_('rechner.leitungslaengeUi.placementEndLabel') : $_('rechner.leitungslaengeUi.placementDistLabel') } })}</p>
	{/if}

	<!-- ── Max length result ── -->
	{#if mode === 'max-laenge'}
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.maxCableLength', { values: { cs: crossSection } })}</span>
			<span class="calc-result-value primary">{fmt(maxLength, 1)}<span class="calc-result-unit">m</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.allowedDrop')}</span>
			<span class="calc-result-value">{fmt(uDropMax, 2)}<span class="calc-result-unit">V ({fmt((uDropMax/uSource)*100,1)} %)</span></span>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.leitungslaengeUi.compareAll')}</h2>
		{#each stdSections as s, idx}
			{@const lMax = I > 0 ? (uDropMax * s) / (2 * RHO_CU * I) : 0}
			{@const iOk = I <= (ampacity[s] ?? 99)}
			<div class="calc-field" style={idx === 0 ? 'border-top:none' : ''}>
				<span class="calc-field-label" class:muted={!iOk}>
					{s} mm²
					{#if !iOk}<span class="calc-field-hint">⚠ {$_('rechner.leitungslaengeUi.currentTooHigh', { values: { imax: ampacity[s] } })}</span>{/if}
				</span>
				<span class="sect-result" class:sect-ok={iOk} class:sect-warn={!iOk}>
					{fmt(lMax, 1)} m
				</span>
			</div>
		{/each}
	</div>
	<p class="calc-info">{$_('rechner.leitungslaengeUi.infoLength')}</p>
	{/if}

	<!-- ── Cross-section result ── -->
	{#if mode === 'querschnitt'}
	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.minCrossSect')}</span>
			<span class="calc-result-value">{fmt(reqSection, 3)}<span class="calc-result-unit">mm²</span></span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.leitungslaengeUi.recommendedSection')}</span>
			<span class="calc-result-value primary">{recSection}<span class="calc-result-unit">mm²</span></span>
		</div>
	</div>
	<p class="calc-info">{$_('rechner.leitungslaengeUi.stdSections')} {stdSections.join(' · ')} mm²</p>
	{/if}
</div>

<style>
	.preset-wrap {
		display: flex;
		flex-wrap: wrap;
		gap: 0.375rem;
		padding: 0 0 0.75rem;
		border-bottom: 1px solid var(--border);
		margin-bottom: 0.25rem;
	}

	.preset-btn {
		padding: 0.25rem 0.55rem;
		font-size: 0.75rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
		transition: border-color 0.15s, color 0.15s;
	}

	.preset-btn:hover {
		border-color: var(--color-primary);
		color: var(--text);
	}

	.seg-wrap {
		display: flex;
		gap: 0.25rem;
	}

	.seg-btn {
		padding: 0.3rem 0.65rem;
		font-size: 0.8rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		color: var(--muted);
		cursor: pointer;
		font-family: inherit;
		transition: all 0.15s;
	}

	.seg-btn.seg-active {
		background: var(--color-primary);
		border-color: var(--color-primary);
		color: #fff;
		font-weight: 600;
	}

	.sect-result {
		font-size: 0.9375rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.sect-ok   { color: #16a34a; }
	.sect-warn { color: #dc2626; }

	.muted { opacity: 0.5; }
</style>
