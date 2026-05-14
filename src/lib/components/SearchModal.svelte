<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';
	import { search, groupByType, typeLabels, typeColors, type SearchItem, type SearchType } from '$lib/search';

	let { open = $bindable(false) }: { open?: boolean } = $props();

	let query = $state('');
	let activeIndex = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const results = $derived(search(query, 20));
	const grouped = $derived(groupByType(results));
	const orderedTypes: SearchType[] = ['wissen', 'rechner', 'konverter', 'referenz', 'checkliste', 'abkuerzung'];

	// Flat list aligned with rendering order (for keyboard navigation)
	const flatList = $derived.by(() => {
		const out: SearchItem[] = [];
		for (const t of orderedTypes) {
			for (const item of grouped[t] ?? []) out.push(item);
		}
		return out;
	});

	$effect(() => {
		query;
		activeIndex = 0;
	});

	$effect(() => {
		if (open) {
			tick().then(() => inputEl?.focus());
		} else {
			query = '';
			activeIndex = 0;
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			e.preventDefault();
			open = false;
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			activeIndex = Math.min(activeIndex + 1, flatList.length - 1);
			scrollActive();
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			activeIndex = Math.max(activeIndex - 1, 0);
			scrollActive();
			return;
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			const item = flatList[activeIndex];
			if (item) selectItem(item);
		}
	}

	function selectItem(item: SearchItem) {
		open = false;
		goto(item.url);
	}

	function scrollActive() {
		queueMicrotask(() => {
			const el = document.querySelector(`[data-search-idx="${activeIndex}"]`);
			el?.scrollIntoView({ block: 'nearest' });
		});
	}

	function indexOf(item: SearchItem): number {
		return flatList.findIndex((x) => x.type === item.type && x.slug === item.slug);
	}
</script>

{#if open}
	<div
		class="overlay"
		onclick={() => (open = false)}
		onkeydown={(e) => e.key === 'Escape' && (open = false)}
		role="button"
		tabindex="-1"
		aria-label="Suche schliessen"
	></div>
	<div class="modal" role="dialog" aria-label="Globale Suche">
		<div class="search-bar">
			<svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
				<circle cx="11" cy="11" r="8" />
				<line x1="21" y1="21" x2="16.65" y2="16.65" />
			</svg>
			<input
				bind:this={inputEl}
				bind:value={query}
				onkeydown={handleKeydown}
				placeholder="Suchen — Artikel, Rechner, Konverter…"
				class="search-input"
				type="search"
				autocomplete="off"
			/>
			<kbd class="hint">ESC</kbd>
		</div>

		<div class="results">
			{#if flatList.length === 0}
				<p class="empty">Keine Treffer für „{query}"</p>
			{:else}
				{#each orderedTypes as type}
					{@const items = grouped[type] ?? []}
					{#if items.length}
						<div class="group">
							<div class="group-header" style:color={typeColors[type]}>
								{typeLabels[type]}
								<span class="group-count">{items.length}</span>
							</div>
							{#each items as item}
								{@const idx = indexOf(item)}
								<button
									class="item"
									class:active={idx === activeIndex}
									data-search-idx={idx}
									onclick={() => selectItem(item)}
									onmouseenter={() => (activeIndex = idx)}
								>
									<span class="item-bar" style:background={typeColors[type]}></span>
									<div class="item-body">
										<div class="item-title">{item.title}</div>
										{#if item.subtitle}
											<div class="item-subtitle">{item.subtitle}</div>
										{/if}
									</div>
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="item-arrow">
										<path d="M9 18l6-6-6-6" />
									</svg>
								</button>
							{/each}
						</div>
					{/if}
				{/each}
			{/if}
		</div>

		<div class="footer">
			<span><kbd>↑</kbd><kbd>↓</kbd> Navigation</span>
			<span><kbd>↵</kbd> Öffnen</span>
			<span><kbd>ESC</kbd> Schliessen</span>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
		backdrop-filter: blur(2px);
		cursor: pointer;
	}

	.modal {
		position: fixed;
		top: 12vh;
		left: 50%;
		transform: translateX(-50%);
		width: min(600px, calc(100vw - 2rem));
		max-height: 70vh;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.75rem;
		box-shadow: 0 24px 48px rgba(0, 0, 0, 0.25);
		z-index: 1001;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.search-bar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.875rem 1rem;
		border-bottom: 1px solid var(--border);
	}

	.search-icon {
		color: var(--muted);
		flex-shrink: 0;
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		outline: none;
		font-size: 1rem;
		color: var(--text);
		font-family: inherit;
		min-width: 0;
	}

	.hint {
		font-size: 0.65rem;
		color: var(--muted);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0.1rem 0.35rem;
		font-family: inherit;
	}

	.results {
		flex: 1;
		overflow-y: auto;
		padding: 0.5rem;
	}

	.empty {
		text-align: center;
		padding: 2rem 1rem;
		color: var(--muted);
		font-size: 0.875rem;
		margin: 0;
	}

	.group + .group {
		margin-top: 0.5rem;
	}

	.group-header {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		padding: 0.5rem 0.5rem 0.25rem;
		display: flex;
		align-items: baseline;
		gap: 0.4rem;
	}

	.group-count {
		font-size: 0.65rem;
		color: var(--muted);
		font-weight: 500;
	}

	.item {
		display: flex;
		align-items: center;
		gap: 0.625rem;
		padding: 0.55rem 0.5rem;
		background: transparent;
		border: none;
		border-radius: 0.5rem;
		width: 100%;
		text-align: left;
		cursor: pointer;
		color: var(--text);
		font-family: inherit;
		transition: background 0.1s;
	}

	.item.active {
		background: color-mix(in srgb, var(--color-primary) 12%, transparent);
	}

	.item-bar {
		width: 3px;
		height: 1.75rem;
		border-radius: 2px;
		flex-shrink: 0;
	}

	.item-body {
		flex: 1;
		min-width: 0;
	}

	.item-title {
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--text);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.item-subtitle {
		font-size: 0.7rem;
		color: var(--muted);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-top: 0.1rem;
	}

	.item-arrow {
		color: var(--muted);
		opacity: 0.5;
		flex-shrink: 0;
	}

	.item.active .item-arrow {
		opacity: 1;
		color: var(--color-primary);
	}

	.footer {
		display: flex;
		gap: 1rem;
		padding: 0.5rem 1rem;
		border-top: 1px solid var(--border);
		background: var(--bg);
		font-size: 0.7rem;
		color: var(--muted);
		flex-wrap: wrap;
	}

	.footer kbd {
		display: inline-block;
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: 0.25rem;
		padding: 0 0.35rem;
		font-family: inherit;
		font-size: 0.65rem;
		margin-right: 0.2rem;
	}

	@media (max-width: 480px) {
		.modal {
			top: 0;
			left: 0;
			right: 0;
			transform: none;
			width: 100%;
			max-height: 100vh;
			border-radius: 0;
		}
	}
</style>
