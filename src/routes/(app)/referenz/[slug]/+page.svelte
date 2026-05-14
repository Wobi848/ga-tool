<script lang="ts">
	import { areaLabels } from '$lib/wissen/types';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const table = $derived(data.table);

	let query = $state('');
	let sortKey = $state<string | null>(null);
	let sortDir = $state<'asc' | 'desc'>('asc');
	let copiedCell = $state<string | null>(null);

	function toggleSort(key: string) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'asc';
		}
	}

	const filteredRows = $derived.by(() => {
		const q = query.trim().toLowerCase();
		let rows = table.rows;
		if (q) {
			rows = rows.filter((r) =>
				Object.values(r).some((v) => String(v).toLowerCase().includes(q))
			);
		}
		if (sortKey) {
			const key = sortKey;
			const dir = sortDir === 'asc' ? 1 : -1;
			rows = [...rows].sort((a, b) => {
				const av = a[key];
				const bv = b[key];
				if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir;
				return String(av).localeCompare(String(bv), 'de', { numeric: true }) * dir;
			});
		}
		return rows;
	});

	function formatCell(v: string | number, type?: 'number' | 'text'): string {
		if (typeof v === 'number') {
			if (Number.isInteger(v)) return String(v);
			return v.toLocaleString('de-CH', { maximumFractionDigits: 4 });
		}
		return String(v);
	}

	async function copyValue(value: string | number, cellId: string) {
		await navigator.clipboard.writeText(String(value));
		copiedCell = cellId;
		setTimeout(() => (copiedCell = null), 1200);
	}

	function copyRow(row: Record<string, string | number>) {
		const tsv = table.columns.map((c) => formatCell(row[c.key], c.type)).join('\t');
		navigator.clipboard.writeText(tsv);
	}
</script>

<svelte:head>
	<title>{table.title} · Referenz</title>
</svelte:head>

<div class="page">
	<header class="page-header">
		<a href="/referenz" class="back-link">
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M15 18l-6-6 6-6" />
			</svg>
			Alle Tabellen
		</a>
		<h1>{table.title}</h1>
		{#if table.subtitle}
			<p class="subtitle">{table.subtitle}</p>
		{/if}

		<div class="meta-chips">
			<span class="cat-chip">{table.category}</span>
			{#each table.areas as a}
				<span class="area-chip">{areaLabels[a]}</span>
			{/each}
			{#each table.norm ?? [] as n}
				<span class="norm-chip">{n}</span>
			{/each}
			{#if table.updated}
				<span class="updated-chip">Stand: {table.updated}</span>
			{/if}
		</div>

		{#if table.description}
			<p class="description">{table.description}</p>
		{/if}
	</header>

	<div class="search-row">
		<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
		<input
			type="search"
			placeholder="In Tabelle suchen…"
			bind:value={query}
			class="search-input"
		/>
		<span class="row-count">
			{filteredRows.length}/{table.rows.length}
		</span>
	</div>

	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					{#each table.columns as col}
						<th
							class:sortable={true}
							class:highlight={col.highlight}
							onclick={() => toggleSort(col.key)}
							title={col.hint}
						>
							<span class="th-content">
								<span class="th-label">
									{col.label}
									{#if col.unit}<span class="th-unit">[{col.unit}]</span>{/if}
								</span>
								<span class="sort-indicator" class:active={sortKey === col.key}>
									{#if sortKey === col.key}
										{sortDir === 'asc' ? '▲' : '▼'}
									{:else}
										⇅
									{/if}
								</span>
							</span>
						</th>
					{/each}
					<th class="action-col" aria-label="Aktionen"></th>
				</tr>
			</thead>
			<tbody>
				{#each filteredRows as row, rowIdx}
					<tr>
						{#each table.columns as col}
							{@const cellId = `${rowIdx}-${col.key}`}
							{@const val = row[col.key]}
							<td
								class:mono={col.mono}
								class:num={col.type === 'number'}
								class:highlight={col.highlight}
								onclick={() => copyValue(val, cellId)}
								title="Klicken zum Kopieren"
							>
								<span class="cell-value">{formatCell(val, col.type)}</span>
								{#if copiedCell === cellId}
									<span class="copied-flash">✓</span>
								{/if}
							</td>
						{/each}
						<td class="action-col">
							<button class="copy-row-btn" onclick={() => copyRow(row)} title="Ganze Zeile kopieren (TSV)">
								<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
									<rect x="9" y="9" width="13" height="13" rx="2" />
									<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if filteredRows.length === 0}
		<p class="empty">Keine Zeile passt zur Suche „{query}".</p>
	{/if}

	{#if table.notes}
		<aside class="notes">
			<strong>Hinweis</strong>
			<p>{table.notes}</p>
		</aside>
	{/if}

	<p class="info">
		Klick auf eine Zelle kopiert den Wert. Klick auf das Symbol rechts kopiert die Zeile als TSV.
		Klick auf eine Spalten-Überschrift sortiert auf-/absteigend.
	</p>
</div>

<style>
	.page {
		max-width: 900px;
		margin: 0 auto;
		padding: 1.5rem 1rem;
	}

	.page-header {
		margin-bottom: 1rem;
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

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0 0 0.25rem;
	}

	.subtitle {
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0 0 0.5rem;
	}

	.meta-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin: 0.5rem 0;
	}

	.cat-chip {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
		color: var(--color-primary);
	}

	.area-chip {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}

	.norm-chip {
		font-size: 0.7rem;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
		background: var(--surface-hover);
		color: var(--muted);
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	.updated-chip {
		font-size: 0.7rem;
		color: var(--muted);
		opacity: 0.7;
		padding: 0.18rem 0.55rem;
	}

	.description {
		font-size: 0.875rem;
		color: var(--text);
		line-height: 1.5;
		margin: 0.75rem 0 0;
	}

	.search-row {
		display: flex;
		align-items: center;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.5rem 0.75rem;
		gap: 0.5rem;
		margin-bottom: 0.75rem;
	}

	.search-row:focus-within {
		border-color: var(--color-primary);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.search-icon {
		color: var(--muted);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 0.9375rem;
		color: var(--text);
		font-family: inherit;
		padding: 0.25rem 0;
		min-width: 0;
	}

	.row-count {
		font-size: 0.75rem;
		color: var(--muted);
		font-family: ui-monospace, SFMono-Regular, monospace;
	}

	/* Table */
	.table-wrap {
		overflow-x: auto;
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		background: var(--surface);
	}

	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.8125rem;
	}

	thead {
		background: var(--bg);
	}

	th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		font-size: 0.7rem;
		color: var(--muted);
		text-transform: uppercase;
		letter-spacing: 0.04em;
		border-bottom: 1px solid var(--border);
		white-space: nowrap;
		user-select: none;
	}

	th.sortable {
		cursor: pointer;
	}

	th.sortable:hover {
		color: var(--color-primary);
	}

	th.highlight {
		color: var(--color-primary);
	}

	.th-content {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}

	.th-unit {
		font-weight: 400;
		opacity: 0.75;
		margin-left: 0.2rem;
	}

	.sort-indicator {
		font-size: 0.7rem;
		opacity: 0.4;
	}

	.sort-indicator.active {
		opacity: 1;
		color: var(--color-primary);
	}

	td {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--border);
		color: var(--text);
		cursor: pointer;
		position: relative;
		transition: background 0.1s;
	}

	tbody tr:last-child td {
		border-bottom: none;
	}

	tbody tr:hover td {
		background: var(--surface-hover);
	}

	td.mono {
		font-family: ui-monospace, SFMono-Regular, monospace;
		font-weight: 500;
	}

	td.num {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}

	td.highlight {
		font-weight: 600;
		color: var(--color-primary);
	}

	.copied-flash {
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);
		color: #16a34a;
		font-weight: 700;
		font-size: 0.9rem;
		animation: pop 0.6s ease-out;
	}

	@keyframes pop {
		0% {
			transform: translateY(-50%) scale(0.6);
			opacity: 0;
		}
		30% {
			transform: translateY(-50%) scale(1.2);
			opacity: 1;
		}
		100% {
			transform: translateY(-50%) scale(1);
			opacity: 1;
		}
	}

	.action-col {
		width: 2rem;
		text-align: center;
		padding: 0.25rem;
	}

	.copy-row-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		color: var(--muted);
		cursor: pointer;
	}

	.copy-row-btn:hover {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}

	/* Notes */
	.notes {
		margin-top: 1rem;
		background: color-mix(in srgb, var(--color-primary) 6%, transparent);
		border: 1px solid color-mix(in srgb, var(--color-primary) 25%, var(--border));
		border-left: 3px solid var(--color-primary);
		border-radius: 0.5rem;
		padding: 0.75rem 1rem;
	}

	.notes strong {
		display: block;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		color: var(--color-primary);
		margin-bottom: 0.3rem;
	}

	.notes p {
		font-size: 0.8125rem;
		color: var(--text);
		margin: 0;
		line-height: 1.5;
	}

	.info {
		font-size: 0.7rem;
		color: var(--muted);
		margin-top: 1rem;
		opacity: 0.75;
		line-height: 1.5;
	}

	.empty {
		text-align: center;
		padding: 1.5rem;
		color: var(--muted);
	}
</style>
