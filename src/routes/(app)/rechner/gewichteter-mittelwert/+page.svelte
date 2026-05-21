<script lang="ts">
	import { fmt } from '$lib/rechner/_shared';
	import FavButton from '$lib/components/FavButton.svelte';
	import { _ } from 'svelte-i18n';

	interface Row {
		id: number;
		label: string;
		value: number | null;
		weight: number;
	}

	let nextId = $state(3);
	let rows = $state<Row[]>([
		{ id: 1, label: '', value: null, weight: 1 },
		{ id: 2, label: '', value: null, weight: 1 }
	]);

	function addRow() {
		rows = [...rows, { id: nextId++, label: '', value: null, weight: 1 }];
	}

	function removeRow(id: number) {
		if (rows.length <= 2) return;
		rows = rows.filter((r) => r.id !== id);
	}

	const validRows = $derived(
		rows.filter((r) => r.value !== null && !isNaN(r.value as number) && r.weight > 0)
	);
	const weightSum = $derived(validRows.reduce((s, r) => s + r.weight, 0));
	const result = $derived(
		weightSum > 0
			? validRows.reduce((s, r) => s + (r.value as number) * r.weight, 0) / weightSum
			: null
	);

	const contributions = $derived(
		validRows.map((r) => ({
			...r,
			share: weightSum > 0 ? (r.weight / weightSum) * 100 : 0,
			contribution: weightSum > 0 ? ((r.value as number) * r.weight) / weightSum : 0
		}))
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
			<h1 class="calc-title">{$_('rechner.gewichteterMittelwert.name')}</h1>
			<FavButton
				type="rechner"
				slug="gewichteter-mittelwert"
				title={$_('rechner.gewichteterMittelwert.name')}
				size={20}
			/>
		</div>
	</header>

	<div class="calc-section">
		<div class="row-header">
			<span class="col-label">Bezeichnung</span>
			<span class="col-value">Wert</span>
			<span class="col-weight">Gewicht</span>
			<span class="col-del"></span>
		</div>

		{#each rows as row (row.id)}
			<div class="row-input">
				<input
					type="text"
					class="calc-input col-label"
					placeholder="z.B. Raum 1"
					bind:value={row.label}
				/>
				<div class="calc-input-wrap col-value">
					<input
						type="number"
						class="calc-input"
						step="0.1"
						placeholder="—"
						bind:value={row.value}
					/>
				</div>
				<input
					type="number"
					class="calc-input col-weight"
					min="0"
					step="0.1"
					bind:value={row.weight}
				/>
				<button
					type="button"
					class="del-btn"
					onclick={() => removeRow(row.id)}
					disabled={rows.length <= 2}
					aria-label="Zeile entfernen"
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
			Zeile hinzufügen
		</button>
	</div>

	{#if result !== null}
		<div class="calc-result-section">
			<div class="calc-result">
				<span class="calc-result-label">Gewichteter Mittelwert</span>
				<span class="calc-result-value primary">{fmt(result, 2)}</span>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">Summe Gewichte</span>
				<span class="calc-result-value">{fmt(weightSum, 2)}</span>
			</div>
			<div class="calc-result">
				<span class="calc-result-label">Anzahl Werte</span>
				<span class="calc-result-value">{validRows.length}</span>
			</div>
		</div>

		{#if contributions.length > 1}
			<div class="calc-section">
				<h2 class="calc-section-title">Anteile</h2>
				{#each contributions as c}
					<div class="contrib-row">
						<span class="contrib-label">{c.label || '—'}</span>
						<div class="contrib-bar-wrap">
							<div class="contrib-bar" style="width: {c.share}%"></div>
						</div>
						<span class="contrib-pct">{fmt(c.share, 1)} %</span>
						<span class="contrib-val">{fmt(c.value as number, 2)}</span>
					</div>
				{/each}
			</div>
		{/if}

		<p class="calc-info">
			x̄ = (Σ xᵢ · wᵢ) / Σ wᵢ — Gewichte können beliebige positive Zahlen sein (Flächen, Zeiten,
			Faktoren…)
		</p>
	{/if}
</div>

<style>
	.row-header {
		display: grid;
		grid-template-columns: 1fr 6rem 5rem 1.5rem;
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
		grid-template-columns: 1fr 6rem 5rem 1.5rem;
		gap: 0.5rem;
		align-items: center;
		margin-bottom: 0.375rem;
	}

	.col-label {
		min-width: 0;
	}
	.col-value {
		min-width: 0;
	}
	.col-weight {
		min-width: 0;
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
		transition: color 0.15s;
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
		transition:
			border-color 0.15s,
			color 0.15s;
	}
	.add-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	/* Contributions */
	.contrib-row {
		display: grid;
		grid-template-columns: 1fr 1fr 3.5rem 3.5rem;
		align-items: center;
		gap: 0.5rem;
		padding: 0.3rem 0;
		border-top: 1px solid var(--border);
	}
	.contrib-row:first-of-type {
		border-top: none;
	}

	.contrib-label {
		font-size: 0.8125rem;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.contrib-bar-wrap {
		background: var(--bg);
		border-radius: 999px;
		height: 6px;
		overflow: hidden;
	}

	.contrib-bar {
		height: 100%;
		background: var(--color-primary);
		border-radius: 999px;
		transition: width 0.3s;
	}

	.contrib-pct {
		font-size: 0.75rem;
		color: var(--muted);
		font-family: ui-monospace, monospace;
		text-align: right;
	}

	.contrib-val {
		font-size: 0.75rem;
		font-weight: 600;
		font-family: ui-monospace, monospace;
		text-align: right;
		color: var(--text);
	}

	@media (max-width: 480px) {
		.row-header,
		.row-input {
			grid-template-columns: 1fr 5rem 4rem 1.5rem;
		}
		.contrib-row {
			grid-template-columns: 1fr 1fr 3rem 3rem;
		}
	}
</style>
