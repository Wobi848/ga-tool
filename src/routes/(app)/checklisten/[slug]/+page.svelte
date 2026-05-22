<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import {
		loadChecklistState,
		saveChecklistState,
		resetChecklistState
	} from '$lib/checklisten/stores';
	import { countItems, countCritical } from '$lib/checklisten';

	import FavButton from '$lib/components/FavButton.svelte';
	import { _, locale } from 'svelte-i18n';
	import { get } from 'svelte/store';

	const isEn = $derived($locale === 'en');
	function t(de: string, en?: string) {
		return isEn && en ? en : de;
	}
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const template = $derived(data.template);
	const totalItems = $derived(countItems(template));
	const criticalCount = $derived(countCritical(template));

	let status: Record<string, boolean> = $state({});
	let notes: Record<string, string> = $state({});
	let context: Record<string, string> = $state({});
	let expandedHints = $state<Record<string, boolean>>({});
	let editingNote = $state<string | null>(null);
	let saved = $state(false);

	// Load state on mount
	onMount(() => {
		const s = loadChecklistState(untrack(() => template.slug));
		status = s.status;
		notes = s.notes;
		context = {
			ort: '',
			anlage: '',
			techniker: '',
			datum: new Date().toISOString().slice(0, 10),
			...s.context
		};
	});

	// Auto-save on changes (debounced via effect)
	$effect(() => {
		// dep tracking
		void status;
		void notes;
		void context;
		const slug = untrack(() => template.slug);
		const handle = setTimeout(() => {
			saveChecklistState(slug, { status, notes, context, updatedAt: Date.now() });
			saved = true;
			setTimeout(() => (saved = false), 1200);
		}, 400);
		return () => clearTimeout(handle);
	});

	// Reset state when navigating to a different checklist
	$effect(() => {
		const slug = template.slug;
		const s = loadChecklistState(slug);
		untrack(() => {
			status = s.status;
			notes = s.notes;
			context = {
				ort: '',
				anlage: '',
				techniker: '',
				datum: new Date().toISOString().slice(0, 10),
				...s.context
			};
		});
	});

	const doneCount = $derived(Object.values(status).filter(Boolean).length);
	const doneCritical = $derived(
		template.sections.flatMap((s) => s.items).filter((i) => i.critical && status[i.id]).length
	);
	const progressPct = $derived(totalItems > 0 ? Math.round((doneCount / totalItems) * 100) : 0);
	const allDone = $derived(doneCount === totalItems && totalItems > 0);
	const allCriticalDone = $derived(criticalCount === 0 || doneCritical === criticalCount);

	function toggleItem(id: string) {
		status = { ...status, [id]: !status[id] };
	}

	function toggleHint(id: string) {
		expandedHints = { ...expandedHints, [id]: !expandedHints[id] };
	}

	function setNote(id: string, value: string) {
		if (value.trim() === '') {
			const { [id]: _, ...rest } = notes;
			notes = rest;
		} else {
			notes = { ...notes, [id]: value };
		}
	}

	function reset() {
		if (!confirm($_('checklisten.confirmReset'))) return;
		resetChecklistState(template.slug);
		status = {};
		notes = {};
		expandedHints = {};
	}

	function exportCSV() {
		const lines: string[] = [];
		// Header context
		lines.push(`# ${template.title}`);
		lines.push(`# ${get(_)('checklisten.anlage')}: ${context.anlage || '—'}`);
		lines.push(`# ${get(_)('checklisten.ort')}: ${context.ort || '—'}`);
		lines.push(`# ${get(_)('checklisten.techniker')}: ${context.techniker || '—'}`);
		lines.push(`# ${get(_)('checklisten.datum')}: ${context.datum || '—'}`);
		lines.push(
			`# ${get(_)('checklisten.csvProgress')}: ${doneCount}/${totalItems} (${progressPct} %)`
		);
		lines.push('');
		lines.push(get(_)('checklisten.csvHeaders'));
		for (const section of template.sections) {
			for (const item of section.items) {
				const cells = [
					csvCell(section.title),
					csvCell(item.title),
					status[item.id] ? get(_)('checklisten.csvYes') : get(_)('checklisten.csvNo'),
					item.critical ? get(_)('checklisten.csvYes') : '',
					csvCell(item.norm ?? ''),
					csvCell(notes[item.id] ?? '')
				];
				lines.push(cells.join(';'));
			}
		}
		const csv = lines.join('\n');
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${template.slug}-${context.datum || 'export'}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	}

	function csvCell(v: string): string {
		if (v.includes(';') || v.includes('"') || v.includes('\n')) {
			return '"' + v.replace(/"/g, '""') + '"';
		}
		return v;
	}
</script>

<svelte:head><title>{template.title} · Checkliste</title></svelte:head>

<div class="page">
	<header class="page-header">
		<a href="/checklisten" class="back-link">
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"><path d="M15 18l-6-6 6-6" /></svg
			>
			{$_('checklisten.backLink')}
		</a>
		<div class="title-row">
			<h1>{t(template.title, template.title_en)}</h1>
			<FavButton type="checkliste" slug={template.slug} title={template.title} size={20} />
		</div>
		{#if template.subtitle}<p class="subtitle">{t(template.subtitle, template.subtitle_en)}</p>{/if}

		<div class="meta-chips">
			<span class="cat-chip" style:background={template.color + '20'} style:color={template.color}
				>{$_('cat.' + template.category.toLowerCase(), { default: template.category })}</span
			>
			{#each template.areas as a (a)}<span class="area-chip">{$_('area.' + a)}</span>{/each}
			{#each template.norm ?? [] as n (n)}<span class="norm-chip">{n}</span>{/each}
		</div>

		{#if template.description}<p class="description">
				{t(template.description, template.description_en)}
			</p>{/if}
	</header>

	<!-- Context box -->
	<div class="context-box">
		<label class="ctx-field"
			><span>{$_('checklisten.anlage')}</span><input
				type="text"
				bind:value={context.anlage}
				placeholder={$_('checklisten.anlagePlaceholder')}
			/></label
		>
		<label class="ctx-field"
			><span>{$_('checklisten.ort')}</span><input
				type="text"
				bind:value={context.ort}
				placeholder={$_('checklisten.ortPlaceholder')}
			/></label
		>
		<label class="ctx-field"
			><span>{$_('checklisten.techniker')}</span><input
				type="text"
				bind:value={context.techniker}
				placeholder={$_('checklisten.technicianPlaceholder')}
			/></label
		>
		<label class="ctx-field"
			><span>{$_('checklisten.datum')}</span><input type="date" bind:value={context.datum} /></label
		>
	</div>

	<!-- Progress bar -->
	<div class="progress-section">
		<div class="progress-stats">
			<span class="progress-pct" style:color={template.color}>{progressPct} %</span>
			<span class="progress-counts">
				{doneCount} / {totalItems}
				{$_('checklisten.done')}
				{#if criticalCount > 0}
					· <span class:critical-ok={allCriticalDone} class:critical-warn={!allCriticalDone}>
						{doneCritical} / {criticalCount}
						{$_('checklisten.critical')}
					</span>
				{/if}
			</span>
			{#if saved}<span class="saved-flash">{$_('checklisten.savedFlash')}</span>{/if}
		</div>
		<div class="progress-bar">
			<div
				class="progress-fill"
				style:width="{progressPct}%"
				style:background={template.color}
			></div>
		</div>
	</div>

	<!-- Sections -->
	{#each template.sections as section, _sIdx (_sIdx)}
		{@const sectionDone = section.items.filter((i) => status[i.id]).length}
		<section class="section">
			<header class="section-header">
				<h2>{t(section.title, section.title_en)}</h2>
				<span class="section-count">{sectionDone}/{section.items.length}</span>
			</header>
			<ul class="items">
				{#each section.items as item (item.id)}
					<li class="item" class:done={status[item.id]} class:critical={item.critical}>
						<label class="item-main">
							<input
								type="checkbox"
								checked={status[item.id] ?? false}
								onchange={() => toggleItem(item.id)}
							/>
							<span class="item-title">{t(item.title, item.title_en)}</span>
							{#if item.critical}<span class="critical-badge" title={$_('checklisten.mustCriteria')}
									>!</span
								>{/if}
							{#if item.norm}<span class="norm-tag">{item.norm}</span>{/if}
						</label>

						<div class="item-actions">
							{#if item.hint}
								<button
									class="action-btn"
									class:active={expandedHints[item.id]}
									onclick={() => toggleHint(item.id)}
									title={$_('checklisten.showHint')}
								>
									<svg
										width="14"
										height="14"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
									>
										<circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line
											x1="12"
											y1="8"
											x2="12.01"
											y2="8"
										/>
									</svg>
								</button>
							{/if}
							<button
								class="action-btn"
								class:active={editingNote === item.id || notes[item.id]}
								onclick={() => (editingNote = editingNote === item.id ? null : item.id)}
								title={$_('checklisten.noteBtn')}
							>
								<svg
									width="14"
									height="14"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
								>
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
									<polyline points="14 2 14 8 20 8" />
								</svg>
							</button>
						</div>

						{#if expandedHints[item.id] && item.hint}
							<p class="item-hint">💡 {t(item.hint, item.hint_en)}</p>
						{/if}

						{#if editingNote === item.id || notes[item.id]}
							<textarea
								class="item-note"
								rows="2"
								value={notes[item.id] ?? ''}
								oninput={(e) => setNote(item.id, (e.target as HTMLTextAreaElement).value)}
								placeholder={$_('checklisten.notePlaceholder')}
							></textarea>
						{/if}
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	{#if allDone}
		<div class="done-banner">
			<strong>🎉 {$_('checklisten.allDoneTitle')}</strong>
			<p>{$_('checklisten.allDoneText')}</p>
		</div>
	{/if}

	<div class="action-bar">
		<button class="btn-secondary" onclick={reset}>{$_('checklisten.resetBtn')}</button>
		<button class="btn-primary" onclick={exportCSV}>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg
			>
			{$_('checklisten.exportCSV')}
		</button>
	</div>

	<p class="info">{$_('checklisten.infoText')}</p>
</div>

<style>
	.page {
		max-width: 720px;
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
	.title-row {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		margin-bottom: 0.25rem;
	}
	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin: 0;
		flex: 1;
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
	.cat-chip,
	.area-chip,
	.norm-chip {
		font-size: 0.7rem;
		font-weight: 600;
		padding: 0.18rem 0.55rem;
		border-radius: 0.3rem;
	}
	.area-chip {
		background: color-mix(in srgb, var(--color-secondary) 15%, transparent);
		color: var(--color-secondary);
	}
	.norm-chip {
		background: var(--surface-hover);
		color: var(--muted);
		font-family: ui-monospace, monospace;
	}
	.description {
		font-size: 0.875rem;
		color: var(--text);
		line-height: 1.5;
		margin: 0.75rem 0 0;
	}

	.context-box {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin: 0.75rem 0;
	}
	@media (max-width: 480px) {
		.context-box {
			grid-template-columns: 1fr;
		}
	}
	.ctx-field {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
	}
	.ctx-field span {
		font-size: 0.7rem;
		color: var(--muted);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.ctx-field input {
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.4rem;
		padding: 0.35rem 0.5rem;
		font-size: 0.85rem;
		color: var(--text);
		font-family: inherit;
	}
	.ctx-field input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.progress-section {
		margin: 1rem 0 1.25rem;
	}
	.progress-stats {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		margin-bottom: 0.4rem;
		flex-wrap: wrap;
	}
	.progress-pct {
		font-size: 1.5rem;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	.progress-counts {
		font-size: 0.8125rem;
		color: var(--muted);
	}
	.critical-ok {
		color: #16a34a;
	}
	.critical-warn {
		color: #dc2626;
	}
	.saved-flash {
		font-size: 0.7rem;
		color: #16a34a;
		margin-left: auto;
		animation: fadeOut 1.2s;
	}
	@keyframes fadeOut {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	.progress-bar {
		height: 8px;
		background: var(--border);
		border-radius: 4px;
		overflow: hidden;
	}
	.progress-fill {
		height: 100%;
		transition: width 0.3s;
	}

	.section {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin-bottom: 0.5rem;
	}
	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.4rem;
	}
	.section-header h2 {
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--color-primary);
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	.section-count {
		font-size: 0.7rem;
		color: var(--muted);
		font-variant-numeric: tabular-nums;
	}

	.items {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.item {
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--border);
		position: relative;
	}
	.item:last-child {
		border-bottom: none;
	}
	.item.done .item-title {
		color: var(--muted);
		text-decoration: line-through;
		opacity: 0.75;
	}

	.item-main {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		padding-right: 4rem;
	}
	.item-main input[type='checkbox'] {
		width: 1.05rem;
		height: 1.05rem;
		accent-color: var(--color-primary);
		cursor: pointer;
		flex-shrink: 0;
	}
	.item-title {
		font-size: 0.875rem;
		color: var(--text);
		line-height: 1.4;
	}
	.critical-badge {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 0.7rem;
		font-weight: 700;
		background: #dc2626;
		color: white;
		border-radius: 50%;
		flex-shrink: 0;
	}
	.norm-tag {
		font-size: 0.65rem;
		padding: 0.1rem 0.35rem;
		border-radius: 0.25rem;
		background: var(--surface-hover);
		color: var(--muted);
		font-family: ui-monospace, monospace;
	}

	.item-actions {
		position: absolute;
		right: 0;
		top: 0.4rem;
		display: flex;
		gap: 0.25rem;
	}
	.action-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.6rem;
		height: 1.6rem;
		background: transparent;
		border: 1px solid var(--border);
		border-radius: 0.3rem;
		color: var(--muted);
		cursor: pointer;
	}
	.action-btn:hover {
		color: var(--color-primary);
		border-color: var(--color-primary);
	}
	.action-btn.active {
		color: var(--color-primary);
		border-color: var(--color-primary);
		background: color-mix(in srgb, var(--color-primary) 10%, transparent);
	}

	.item-hint {
		font-size: 0.75rem;
		color: var(--muted);
		background: var(--bg);
		border-left: 2px solid var(--color-primary);
		padding: 0.4rem 0.6rem;
		margin: 0.4rem 0 0 1.5rem;
		border-radius: 0 0.3rem 0.3rem 0;
		line-height: 1.4;
	}
	.item-note {
		display: block;
		width: calc(100% - 1.5rem);
		margin: 0.4rem 0 0 1.5rem;
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.3rem;
		padding: 0.4rem 0.5rem;
		font-size: 0.8125rem;
		color: var(--text);
		font-family: inherit;
		resize: vertical;
	}
	.item-note:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.done-banner {
		background: color-mix(in srgb, #16a34a 12%, transparent);
		border: 1px solid #16a34a;
		border-radius: 0.75rem;
		padding: 0.75rem 1rem;
		margin: 1rem 0;
	}
	.done-banner strong {
		display: block;
		color: #16a34a;
		margin-bottom: 0.25rem;
	}
	.done-banner p {
		font-size: 0.8125rem;
		color: var(--text);
		margin: 0;
	}

	.action-bar {
		display: flex;
		gap: 0.5rem;
		justify-content: flex-end;
		margin-top: 1rem;
		padding-top: 0.75rem;
		border-top: 1px solid var(--border);
	}
	.btn-primary,
	.btn-secondary {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font-size: 0.875rem;
		font-weight: 500;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		cursor: pointer;
		font-family: inherit;
	}
	.btn-primary {
		background: var(--color-primary);
		color: white;
		border: none;
	}
	.btn-primary:hover {
		background: var(--color-primary-hover);
	}
	.btn-secondary {
		background: transparent;
		color: var(--muted);
		border: 1px solid var(--border);
	}
	.btn-secondary:hover {
		border-color: var(--muted);
		color: var(--text);
	}

	.info {
		font-size: 0.7rem;
		color: var(--muted);
		margin-top: 0.75rem;
		opacity: 0.75;
	}

	@media print {
		:global(.sidebar),
		:global(.top-bar),
		:global(.bottom-nav) {
			display: none !important;
		}
		:global(.main-wrapper) {
			margin-left: 0 !important;
		}
		:global(.main-content) {
			padding: 0 !important;
		}

		.action-bar,
		.btn-primary,
		.btn-secondary,
		.back-link {
			display: none !important;
		}
		.item-note {
			display: none;
		}
		.item-hint {
			display: block !important;
		}
		.context-box,
		.progress-bar-wrap {
			border: 1px solid #ccc;
		}
		.item.done .item-title {
			color: #555;
		}
		.item.done .item-title::after {
			content: ' ✓';
			color: #16a34a;
		}
		.page {
			max-width: 100%;
		}
		.section {
			page-break-inside: avoid;
		}
		.section-header {
			background: #f5f5f5 !important;
			color: #000 !important;
			-webkit-print-color-adjust: exact;
		}
		.critical-badge {
			background: #fee2e2 !important;
			color: #b91c1c !important;
			-webkit-print-color-adjust: exact;
		}
		a[href]::after {
			content: '';
		}
	}
</style>
