<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import {
		computeKv,
		recommendKvs,
		authority as computeAuthority,
		STANDARD_KVS,
		type KvMode
	} from '$lib/rechner/kvWert';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	const stdKvs = STANDARD_KVS;

	let mode: KvMode = $state('kv-from-qdp');
	let flow = $state(1.0); // m³/h
	let dp = $state(0.2); // bar
	let kv = $state(2.5); // m³/h @ 1 bar

	const result = $derived.by(() => computeKv({ mode, flow, dp, kv }));
	const recommendedKvs = $derived(recommendKvs(result.kv));
	const authority = $derived(computeAuthority(result.dp));
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
			<h1 class="calc-title">{$_('rechner.kvWert.name')}</h1>
			<FavButton type="rechner" slug="kv-wert" title={$_('rechner.kvWert.name')} size={20} />
		</div>
	</header>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ui.mode')}</h2>
		<div class="calc-field" style="border-top: none">
			<label class="calc-field-label" for="mode-sel">{$_('rechner.ui.calculate')}</label>
			<select id="mode-sel" bind:value={mode} class="calc-select">
				<option value="kv-from-qdp">{$_('rechner.kvWertUi.kvFromQdp')}</option>
				<option value="dp-from-qkv">{$_('rechner.kvWertUi.dpFromQkv')}</option>
				<option value="q-from-kvdp">{$_('rechner.kvWertUi.qFromKvdp')}</option>
			</select>
		</div>
	</div>

	<div class="calc-section">
		<h2 class="calc-section-title">{$_('rechner.ui.input')}</h2>
		{#if mode !== 'q-from-kvdp'}
			<div class="calc-field">
				<label class="calc-field-label" for="flow-in">{$_('rechner.kvWertUi.volumeFlow')}</label>
				<div class="calc-input-wrap">
					<input id="flow-in" type="number" step="0.1" bind:value={flow} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'dp-from-qkv'}
			<div class="calc-field">
				<label class="calc-field-label" for="dp-in">{$_('rechner.kvWertUi.pressureDiff')}</label>
				<div class="calc-input-wrap">
					<input id="dp-in" type="number" step="0.05" min="0" bind:value={dp} class="calc-input" />
					<span class="calc-input-unit">bar</span>
				</div>
			</div>
		{/if}
		{#if mode !== 'kv-from-qdp'}
			<div class="calc-field">
				<label class="calc-field-label" for="kv-in">{$_('rechner.kvWertUi.kvValue')}</label>
				<div class="calc-input-wrap">
					<input id="kv-in" type="number" step="0.1" min="0" bind:value={kv} class="calc-input" />
					<span class="calc-input-unit">m³/h</span>
				</div>
			</div>
		{/if}
	</div>

	<div class="calc-result-section">
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.kvWertUi.kvValue')}</span>
			<span class="calc-result-value" class:primary={mode === 'kv-from-qdp'}>
				{fmt(result.kv, 2)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.kvWertUi.volumeFlow')}</span>
			<span class="calc-result-value" class:primary={mode === 'q-from-kvdp'}>
				{fmt(result.q, 2)}<span class="calc-result-unit">m³/h</span>
			</span>
		</div>
		<div class="calc-result">
			<span class="calc-result-label">{$_('rechner.kvWertUi.pressureDiff')}</span>
			<span class="calc-result-value" class:primary={mode === 'dp-from-qkv'}>
				{fmt(result.dp, 3)}<span class="calc-result-unit">bar</span>
			</span>
		</div>
		{#if mode === 'kv-from-qdp'}
			<div class="calc-result">
				<span class="calc-result-label">{$_('rechner.kvWertUi.recommendedKvs')}</span>
				<span class="calc-result-value"
					>{recommendedKvs}<span class="calc-result-unit">m³/h</span></span
				>
			</div>
		{/if}
	</div>

	{#if authority < 0.3}
		<div class="calc-warning">
			⚠ {$_('rechner.kvWertUi.warnLowAuthority', { values: { a: fmt(authority, 2) } })}
		</div>
	{/if}

	<p class="calc-info">
		{$_('rechner.kvWertUi.formulaNote')} <br />
		{$_('rechner.kvWertUi.stdKvsSeries')}
		{stdKvs.join(' · ')}
	</p>
</div>
