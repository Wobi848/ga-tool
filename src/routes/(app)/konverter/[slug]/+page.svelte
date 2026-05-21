<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount, untrack } from 'svelte';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _, locale } from 'svelte-i18n';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const converter = $derived(data.converter);
	const isEn = $derived($locale === 'en');
	function t(de: string, en?: string) {
		return isEn && en ? en : de;
	}

	// Context value (temperature for feuchte, etc.)
	let contextValue = $state(untrack(() => data.converter.contextInput?.default ?? 20));

	// One reactive value per unit, keyed by unit id
	let values: Record<string, string> = $state(
		untrack(() => Object.fromEntries(data.converter.units.map((u) => [u.id, ''])))
	);

	// Reset when navigating to a different converter
	$effect(() => {
		void converter.slug; // track
		values = Object.fromEntries(converter.units.map((u) => [u.id, '']));
		contextValue = converter.contextInput?.default ?? 20;
		activeUnit = null;
	});

	// Which field is currently being edited (to avoid feedback loops)
	let activeUnit = $state<string | null>(null);

	// Copied state for feedback
	let copiedUnit = $state<string | null>(null);

	function updateFrom(changedId: string, rawValue: string) {
		activeUnit = changedId;
		values[changedId] = rawValue;

		const num = parseFloat(rawValue.replace(',', '.'));
		if (isNaN(num) || rawValue.trim() === '') {
			// Clear all other fields
			for (const u of converter.units) {
				if (u.id !== changedId) values[u.id] = '';
			}
			syncToUrl(null, null);
			return;
		}

		const base = converter.toBase(num, changedId, contextValue);
		for (const u of converter.units) {
			if (u.id !== changedId) {
				const result = converter.fromBase(base, u.id, contextValue);
				values[u.id] = formatValue(result);
			}
		}
		syncToUrl(changedId, num);
	}

	function recalculateAll() {
		if (!activeUnit) return;
		const raw = values[activeUnit];
		const num = parseFloat(raw.replace(',', '.'));
		if (isNaN(num)) return;
		const base = converter.toBase(num, activeUnit, contextValue);
		for (const u of converter.units) {
			if (u.id !== activeUnit) {
				values[u.id] = formatValue(converter.fromBase(base, u.id, contextValue));
			}
		}
	}

	function formatValue(n: number): string {
		if (!isFinite(n)) return '';
		// Choose precision based on magnitude
		const abs = Math.abs(n);
		if (abs === 0) return '0';
		if (abs >= 10000) return n.toFixed(0);
		if (abs >= 1000) return n.toFixed(1);
		if (abs >= 100) return n.toFixed(2);
		if (abs >= 1) return n.toFixed(4).replace(/\.?0+$/, '');
		return n.toPrecision(5).replace(/\.?0+$/, '');
	}

	async function copyValue(unitId: string) {
		const val = values[unitId];
		if (!val) return;
		await navigator.clipboard.writeText(val);
		copiedUnit = unitId;
		setTimeout(() => (copiedUnit = null), 1500);
	}

	function syncToUrl(unitId: string | null, value: number | null) {
		const url = new URL($page.url);
		if (unitId && value !== null) {
			url.searchParams.set('from', unitId);
			url.searchParams.set('v', String(value));
		} else {
			url.searchParams.delete('from');
			url.searchParams.delete('v');
		}
		goto(url, { replaceState: true, noScroll: true, keepFocus: true });
	}

	// Deep link restore on mount
	onMount(() => {
		const fromUnit = $page.url.searchParams.get('from');
		const v = $page.url.searchParams.get('v');
		if (fromUnit && v && converter.units.find((u) => u.id === fromUnit)) {
			updateFrom(fromUnit, v);
		}
	});

	// Recalculate when context (temperature) changes
	$effect(() => {
		void contextValue; // track
		recalculateAll();
	});
</script>

<div class="page">
	<header class="page-header">
		<a href="/konverter" class="back-link">
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
			{$_('common.allConverters')}
		</a>
		<div class="title-row">
			<h1>{$_('konverter.' + converter.slug + '.name', { default: converter.name })}</h1>
			<FavButton
				type="konverter"
				slug={converter.slug}
				title={$_('konverter.' + converter.slug + '.name', { default: converter.name })}
				size={20}
			/>
		</div>
	</header>

	{#if converter.contextInput}
		{@const ci = converter.contextInput}
		<div class="context-row">
			<label for="ctx-input">{t(ci.label, ci.labelEn)}</label>
			<div class="context-input-wrap">
				<input
					id="ctx-input"
					type="number"
					min={ci.min}
					max={ci.max}
					step="0.5"
					bind:value={contextValue}
					class="context-input"
				/>
				<span class="context-unit">{ci.unit}</span>
			</div>
		</div>
	{/if}

	<div class="fields">
		{#each converter.units as unit}
			<div class="field">
				<div class="field-header">
					<span class="field-label">{t(unit.label, unit.labelEn)}</span>
					{#if unit.note}
						<span class="field-note">{t(unit.note ?? '', unit.noteEn)}</span>
					{/if}
				</div>
				<div class="field-input-row">
					<input
						type="text"
						inputmode="decimal"
						placeholder="0"
						value={values[unit.id]}
						oninput={(e) => updateFrom(unit.id, (e.target as HTMLInputElement).value)}
						class="field-input"
						aria-label={t(unit.label, unit.labelEn)}
					/>
					<span class="field-symbol">{unit.symbol}</span>
					<button
						class="copy-btn"
						class:copied={copiedUnit === unit.id}
						onclick={() => copyValue(unit.id)}
						title={$_('konverter.copy')}
						aria-label={$_('konverter.copyValue')}
						disabled={!values[unit.id]}
					>
						{#if copiedUnit === unit.id}
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
							>
								<path d="M20 6L9 17l-5-5" />
							</svg>
						{:else}
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
								<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
							</svg>
						{/if}
					</button>
				</div>
			</div>
		{/each}
	</div>

	<button
		class="reset-btn"
		onclick={() => {
			values = Object.fromEntries(converter.units.map((u) => [u.id, '']));
			activeUnit = null;
			syncToUrl(null, null);
		}}
	>
		{$_('konverter.resetAll')}
	</button>
</div>

<style>
	.page {
		max-width: 480px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.page-header {
		margin-bottom: 1.5rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.8125rem;
		color: var(--muted);
		text-decoration: none;
		margin-bottom: 0.5rem;
	}

	.back-link:hover {
		color: var(--color-primary);
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0;
		flex: 1;
	}

	/* Context input (temperature for humidity) */
	.context-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.context-row label {
		font-size: 0.875rem;
		color: var(--muted);
		flex-shrink: 0;
	}

	.context-input-wrap {
		display: flex;
		align-items: center;
		gap: 0.375rem;
	}

	.context-input {
		width: 5rem;
		text-align: right;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.375rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
		color: var(--text);
		font-family: inherit;
	}

	.context-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.context-unit {
		font-size: 0.875rem;
		color: var(--muted);
	}

	/* Unit fields */
	.fields {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.field {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		transition: border-color 0.15s;
	}

	.field:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.field-header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 0.375rem;
		gap: 0.5rem;
	}

	.field-label {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.field-note {
		font-size: 0.7rem;
		color: var(--muted);
		opacity: 0.75;
		text-align: right;
	}

	.field-input-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.field-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1.25rem;
		font-weight: 500;
		color: var(--text);
		font-family: inherit;
		min-width: 0;
	}

	.field-input::placeholder {
		color: var(--border);
	}

	.field-symbol {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--muted);
		flex-shrink: 0;
		min-width: 2.5rem;
		text-align: right;
	}

	.copy-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		border-radius: 0.375rem;
		border: 1px solid var(--border);
		background: transparent;
		color: var(--muted);
		cursor: pointer;
		flex-shrink: 0;
		transition:
			color 0.15s,
			border-color 0.15s,
			background 0.15s;
	}

	.copy-btn:hover:not(:disabled) {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	.copy-btn:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.copy-btn.copied {
		color: #16a34a;
		border-color: #16a34a;
		background: #16a34a15;
	}

	.reset-btn {
		width: 100%;
		padding: 0.625rem;
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		background: transparent;
		color: var(--muted);
		font-size: 0.875rem;
		font-family: inherit;
		cursor: pointer;
		transition:
			color 0.15s,
			border-color 0.15s;
	}

	.reset-btn:hover {
		color: var(--text);
		border-color: var(--muted);
	}
</style>
